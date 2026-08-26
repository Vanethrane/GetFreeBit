/**
 * Ingest crypto news posted since the last search into src/data/news-wire.json.
 * Sources: public RSS feeds (no API key). Optional CRYPTOCOMPARE_API_KEY fallback.
 *
 * Usage: node scripts/ingest-crypto-news.mjs
 * Env:
 *   NEWS_INGEST_MAX=80          keep at most N wire stories (default 80)
 *   NEWS_INGEST_BATCH=15        max new stories per run (default 15)
 *   NEWS_INGEST_DRY_RUN=1       print candidates without writing
 *   CRYPTOCOMPARE_API_KEY=...   optional CryptoCompare key
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WIRE_PATH = path.join(ROOT, "src", "data", "news-wire.json");
const STATE_PATH = path.join(ROOT, "src", "data", "news-wire-state.json");

const RSS_FEEDS = [
  { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
  { name: "Cointelegraph", url: "https://cointelegraph.com/rss" },
  { name: "Decrypt", url: "https://decrypt.co/feed" },
];

const MAX_STORIES = Number(process.env.NEWS_INGEST_MAX || 80);
const MAX_BATCH = Number(process.env.NEWS_INGEST_BATCH || 15);
const DRY_RUN = process.env.NEWS_INGEST_DRY_RUN === "1";
const CC_KEY = process.env.CRYPTOCOMPARE_API_KEY || "";

/** Fallback lookback when no prior search is recorded (2 hours). */
const DEFAULT_LOOKBACK_MS = 2 * 60 * 60 * 1000;

const CRYPTO_HINT =
  /\b(bitcoin|btc|ethereum|eth|crypto|cryptocurrency|blockchain|defi|nft|stablecoin|satoshi|mining|wallet|exchange|binance|coinbase|sec|cftc|etf|halving|lightning|token|web3|on-?chain)\b/i;

/**
 * @typedef {{
 *   slug: string;
 *   title: string;
 *   description: string;
 *   publishedAt: string;
 *   readingMinutes: number;
 *   sourceUrl: string;
 *   sourceName: string;
 *   body: string;
 *   externalId?: string;
 * }} WireStory
 */

/**
 * @typedef {{
 *   title: string;
 *   url: string;
 *   body: string;
 *   publishedAt: string;
 *   publishedAtMs: number;
 *   sourceName: string;
 *   externalId: string;
 *   scoreHint?: number;
 * }} RawItem
 */

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeXmlEntities(text) {
  return String(text || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function tagText(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  return decodeXmlEntities(m[1]).trim();
}

function truncate(text, max) {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function readingMinutes(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.min(8, Math.ceil(words / 200)));
}

function loadWire() {
  if (!fs.existsSync(WIRE_PATH)) return [];
  const raw = JSON.parse(fs.readFileSync(WIRE_PATH, "utf8"));
  return Array.isArray(raw) ? raw : [];
}

function saveWire(stories) {
  const sorted = [...stories].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
  fs.writeFileSync(WIRE_PATH, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

function loadState() {
  if (!fs.existsSync(STATE_PATH)) return { lastSearchAt: null };
  try {
    const raw = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
    return {
      lastSearchAt: typeof raw.lastSearchAt === "string" ? raw.lastSearchAt : null,
    };
  } catch {
    return { lastSearchAt: null };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

function scoreTitle(title) {
  const t = title.toLowerCase();
  let score = 0;
  if (/\b(airdrop|giveaway|100x|guaranteed|free money|elon|moon)\b/.test(t)) score -= 10;
  if (/\b(sec|cftc|etf|regulation|stablecoin|hack|exploit|fed|treasury|court|lawsuit)\b/.test(t)) {
    score += 4;
  }
  if (/\b(bitcoin|btc|ethereum|eth|defi|wallet|exchange|staking)\b/.test(t)) score += 2;
  if (CRYPTO_HINT.test(title)) score += 1;
  return score;
}

function parsePublishedMs(input) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return Date.now();
  return d.getTime();
}

function toIsoDate(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function isCryptoStory(item) {
  const hay = `${item.title} ${item.body} ${item.sourceName}`;
  return CRYPTO_HINT.test(hay) || (item.scoreHint || 0) > 0;
}

/**
 * @param {string} xml
 * @param {string} sourceName
 * @returns {RawItem[]}
 */
function parseRss(xml, sourceName) {
  const items = [];
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const block of itemBlocks) {
    const title = stripHtml(tagText(block, "title"));
    const link = stripHtml(tagText(block, "link") || tagText(block, "guid"));
    const guid = stripHtml(tagText(block, "guid")) || link;
    const pubDate = tagText(block, "pubDate") || tagText(block, "dc:date");
    const description =
      tagText(block, "content:encoded") ||
      tagText(block, "description") ||
      tagText(block, "summary");
    const body = stripHtml(description);
    if (!title || !link) continue;
    const publishedAtMs = parsePublishedMs(pubDate);
    items.push({
      title,
      url: link,
      body,
      publishedAt: toIsoDate(publishedAtMs),
      publishedAtMs,
      sourceName,
      externalId: guid || link,
      scoreHint: scoreTitle(title),
    });
  }
  return items;
}

async function fetchRssFeed(feed) {
  const res = await fetch(feed.url, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml, */*",
      "User-Agent": "GetFreeBitNewsIngest/1.0 (+https://www.getfreebit.com)",
    },
  });
  if (!res.ok) {
    console.warn(`RSS skip ${feed.name}: HTTP ${res.status}`);
    return [];
  }
  const xml = await res.text();
  return parseRss(xml, feed.name);
}

async function fetchCryptoCompare() {
  const url = new URL("https://min-api.cryptocompare.com/data/v2/news/");
  url.searchParams.set("lang", "EN");
  url.searchParams.set("sortOrder", "latest");
  if (CC_KEY) url.searchParams.set("api_key", CC_KEY);

  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "GetFreeBitNewsIngest/1.0" },
  });
  if (!res.ok) {
    console.warn(`CryptoCompare skip: HTTP ${res.status}`);
    return [];
  }
  const json = await res.json();
  const data = Array.isArray(json?.Data) ? json.Data : [];
  return data.map((item) => {
    const title = stripHtml(item.title || "");
    const body = stripHtml(item.body || "");
    const sourceName = item.source_info?.name || item.source || "CryptoCompare";
    const sourceUrl = String(item.url || "").trim();
    const publishedOn = Number(item.published_on || 0);
    const publishedAtMs = publishedOn ? publishedOn * 1000 : Date.now();
    return {
      title,
      url: sourceUrl,
      body,
      publishedAt: toIsoDate(publishedAtMs),
      publishedAtMs,
      sourceName,
      externalId: String(item.id || item.guid || sourceUrl),
      scoreHint: scoreTitle(title),
    };
  });
}

/** @param {RawItem} item */
function toWireStory(item) {
  const title = item.title.trim();
  const sourceUrl = item.url.trim();
  if (!title || !sourceUrl) return null;

  const description = truncate(item.body || title, 220);
  const context = [
    item.body || description,
    `Source: ${item.sourceName}. This is a wire summary for GetFreeBit readers - verify the original report before making custody, trading, or tax decisions. Not financial advice.`,
  ].join("\n\n");

  const slug = slugify(title) || `wire-${Date.now()}`;

  return {
    slug,
    title: truncate(title, 120),
    description,
    publishedAt: item.publishedAt,
    readingMinutes: readingMinutes(context),
    sourceUrl,
    sourceName: String(item.sourceName).slice(0, 80),
    body: truncate(context, 1800),
    externalId: item.externalId,
  };
}

async function main() {
  const searchStartedAt = new Date().toISOString();
  const existing = loadWire();
  const state = loadState();
  const sinceMs = state.lastSearchAt
    ? parsePublishedMs(state.lastSearchAt)
    : Date.now() - DEFAULT_LOOKBACK_MS;

  console.log(
    `Searching crypto news since ${new Date(sinceMs).toISOString()} (last search: ${state.lastSearchAt || "none"}).`,
  );

  const seenSlugs = new Set(existing.map((s) => s.slug));
  const seenIds = new Set(
    existing.flatMap((s) => [s.externalId, s.sourceUrl].filter(Boolean)),
  );

  /** @type {RawItem[]} */
  const pool = [];
  for (const feed of RSS_FEEDS) {
    try {
      pool.push(...(await fetchRssFeed(feed)));
    } catch (err) {
      console.warn(`RSS error ${feed.name}:`, err instanceof Error ? err.message : err);
    }
  }
  try {
    pool.push(...(await fetchCryptoCompare()));
  } catch (err) {
    console.warn("CryptoCompare error:", err instanceof Error ? err.message : err);
  }

  /** @type {WireStory[]} */
  const fresh = [];
  const seenThisRun = new Set();

  const ranked = [...pool].sort((a, b) => {
    if (b.publishedAtMs !== a.publishedAtMs) return b.publishedAtMs - a.publishedAtMs;
    return (b.scoreHint || 0) - (a.scoreHint || 0);
  });

  for (const item of ranked) {
    if (fresh.length >= MAX_BATCH) break;
    if ((item.scoreHint || 0) < 0) continue;
    if (item.publishedAtMs < sinceMs) continue;
    if (!isCryptoStory(item)) continue;

    const story = toWireStory(item);
    if (!story) continue;
    if (seenSlugs.has(story.slug) || seenThisRun.has(story.slug)) continue;
    if (seenIds.has(story.externalId) || seenIds.has(story.sourceUrl)) continue;
    if (seenThisRun.has(story.externalId) || seenThisRun.has(story.sourceUrl)) continue;

    fresh.push(story);
    seenThisRun.add(story.slug);
    seenThisRun.add(story.externalId);
    seenThisRun.add(story.sourceUrl);
  }

  if (!DRY_RUN) {
    saveState({ lastSearchAt: searchStartedAt });
  }

  if (fresh.length === 0) {
    console.log("No new crypto stories since last search.");
    return;
  }

  console.log(`Ingesting ${fresh.length} stor${fresh.length === 1 ? "y" : "ies"}:`);
  for (const story of fresh) {
    console.log(`  - ${story.title} (${story.sourceName})`);
  }

  if (DRY_RUN) {
    console.log(JSON.stringify(fresh, null, 2));
    return;
  }

  const next = [...fresh, ...existing].slice(0, MAX_STORIES);
  saveWire(next);
  console.log(`Wrote ${WIRE_PATH} (${next.length} stories).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
