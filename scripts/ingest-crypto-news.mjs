/**
 * Ingest one fresh crypto news story into src/data/news-wire.json.
 * Sources: public RSS feeds (no API key). Optional CRYPTOCOMPARE_API_KEY fallback.
 *
 * Usage: node scripts/ingest-crypto-news.mjs
 * Env:
 *   NEWS_INGEST_MAX=50          keep at most N wire stories (default 50)
 *   NEWS_INGEST_DRY_RUN=1       print candidate without writing
 *   CRYPTOCOMPARE_API_KEY=...   optional CryptoCompare key
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WIRE_PATH = path.join(ROOT, "src", "data", "news-wire.json");

const RSS_FEEDS = [
  { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
  { name: "Cointelegraph", url: "https://cointelegraph.com/rss" },
  { name: "Decrypt", url: "https://decrypt.co/feed" },
];

const MAX_STORIES = Number(process.env.NEWS_INGEST_MAX || 50);
const DRY_RUN = process.env.NEWS_INGEST_DRY_RUN === "1";
const CC_KEY = process.env.CRYPTOCOMPARE_API_KEY || "";

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

function scoreTitle(title) {
  const t = title.toLowerCase();
  let score = 0;
  if (/\b(airdrop|giveaway|100x|guaranteed|free money|elon|moon)\b/.test(t)) score -= 10;
  if (/\b(sec|cftc|etf|regulation|stablecoin|hack|exploit|fed|treasury|court|lawsuit)\b/.test(t)) {
    score += 4;
  }
  if (/\b(bitcoin|ethereum|defi|wallet|exchange|staking)\b/.test(t)) score += 1;
  return score;
}

function toIsoDate(input) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
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
    items.push({
      title,
      url: link,
      body,
      publishedAt: toIsoDate(pubDate),
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
    return {
      title,
      url: sourceUrl,
      body,
      publishedAt: publishedOn
        ? new Date(publishedOn * 1000).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
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
  const existing = loadWire();
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

  pool.sort((a, b) => (b.scoreHint || 0) - (a.scoreHint || 0));

  /** @type {WireStory | null} */
  let picked = null;
  for (const item of pool) {
    if ((item.scoreHint || 0) < 0) continue;
    const story = toWireStory(item);
    if (!story) continue;
    if (seenSlugs.has(story.slug)) continue;
    if (seenIds.has(story.externalId) || seenIds.has(story.sourceUrl)) continue;
    picked = story;
    break;
  }

  if (!picked) {
    console.log("No new crypto wire story to ingest.");
    return;
  }

  console.log(`Ingesting: ${picked.title} (${picked.sourceName})`);
  if (DRY_RUN) {
    console.log(JSON.stringify(picked, null, 2));
    return;
  }

  const next = [picked, ...existing].slice(0, MAX_STORIES);
  saveWire(next);
  console.log(`Wrote ${WIRE_PATH} (${next.length} stories).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
