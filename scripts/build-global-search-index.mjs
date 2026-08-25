/**
 * Builds public/global-search-index.json — compact index for client-side Cmd+K search.
 * Merges editorial articles (guides, how-tos, news) + dataset.json hubs.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadArticleSearchEntries } from "./lib/article-index.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataset = JSON.parse(readFileSync(join(ROOT, "src/data/dataset.json"), "utf8"));

const DATASET_CATEGORY_LABEL = {
  "faucets-micro": "Faucets & micro-earnings",
  "airdrop-testnet": "Airdrops & testnets",
  "staking-yield": "Staking & yield",
  "exchange-onboarding": "Exchange onboarding",
  "speech-tech": "Speech tech",
  "accents-localization": "Accents & localization",
  "learning-teaching": "Learning & teaching",
  "publishing-ops": "Publishing & ops",
};

function collectTerms(...parts) {
  const out = new Set();
  for (const part of parts) {
    if (!part) continue;
    const lower = String(part).toLowerCase().trim();
    if (lower) out.add(lower);
    for (const token of lower.split(/[\s/–—-]+/)) {
      if (token.length >= 2) out.add(token);
    }
  }
  return [...out];
}

function buildMeta() {
  const meta = [];

  for (const article of loadArticleSearchEntries(ROOT)) {
    meta.push({
      id: `${article.kind}:${article.slug}`,
      type: article.kind,
      label: article.title,
      hint: article.hint,
      href: article.href,
      staticHref: article.href,
      terms: article.terms,
    });
  }

  for (const [slug, page] of Object.entries(dataset.pages)) {
    meta.push({
      id: `guide:${slug}`,
      type: "guide",
      label: page.name || slug.replace(/-/g, " "),
      hint: page.primaryKeyword || page.parentCategory?.replace(/-/g, " ") || "Guide",
      href: page.path || `/guides/${slug}`,
      staticHref: `/guide.html?slug=${encodeURIComponent(slug)}`,
      terms: collectTerms(
        slug,
        page.name,
        page.primaryKeyword,
        page.parentCategory,
        page.language,
        page.accent,
        ...(page.tags || []),
      ),
    });
  }

  for (const [language, tool] of Object.entries(dataset.toolAffiliates ?? {})) {
    if (language === "default") continue;
    const external = /^https?:\/\//i.test(tool.href);
    meta.push({
      id: `tool:${tool.id}`,
      type: "tool",
      label: tool.title,
      hint: tool.label || language,
      href: tool.href,
      staticHref: external ? tool.href : tool.href.startsWith("/") ? tool.href : `/${tool.href}`,
      terms: collectTerms(language, tool.title, tool.label, tool.description, tool.cta),
    });
  }

  const seen = new Set();
  for (const [slug, page] of Object.entries(dataset.pages)) {
    const cat = page.parentCategory;
    if (!cat || seen.has(cat)) continue;
    seen.add(cat);
    meta.push({
      id: `category:${cat}`,
      type: "category",
      label: DATASET_CATEGORY_LABEL[cat] || cat.replace(/-/g, " "),
      hint: "Topic",
      href: page.path || `/guides/${slug}`,
      staticHref: `/guide.html?slug=${encodeURIComponent(slug)}`,
      terms: collectTerms(cat, DATASET_CATEGORY_LABEL[cat], ...(page.tags || [])),
    });
  }

  return meta;
}

const payload = {
  v: 2,
  builtAt: new Date().toISOString(),
  metaCount: 0,
  meta: buildMeta(),
};
payload.metaCount = payload.meta.length;

const outDir = join(ROOT, "public");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "global-search-index.json"), JSON.stringify(payload));
writeFileSync(join(ROOT, "assets/global-search-index.json"), JSON.stringify(payload));

console.log(
  `Wrote public/global-search-index.json — ${payload.meta.length} guides, how-tos & news entries`,
);
