import dataset from "@/data/dataset.json";
import { ALL_ARTICLES, type ArticleKind } from "@/content/guides";
import { buildGlossarySearchEntries } from "@/lib/glossary-search";
import { getIndexCatalog } from "@/lib/indexes";

export type HeaderSearchEntry = {
  id: string;
  type: "guide" | "howto" | "news" | "tool" | "category" | "term";
  label: string;
  hint: string;
  /** Optional subtitle — glossary definition snippet for term rows */
  detail?: string;
  /** App-router path (Next.js) */
  href: string;
  /** Static GitHub Pages path (relative to site root) */
  staticHref: string;
  terms: string[];
};

type DatasetPage = {
  language?: string;
  accent?: string;
  name?: string;
  parentCategory?: string;
  tags?: string[];
  primaryKeyword?: string;
  path?: string;
};

type DatasetFile = {
  pages: Record<string, DatasetPage>;
  toolAffiliates?: Record<
    string,
    { id: string; label: string; title: string; description: string; href: string; cta: string }
  >;
};

const data = {
  pages: (dataset as DatasetFile).pages ?? {},
  toolAffiliates: (dataset as DatasetFile).toolAffiliates ?? {},
};

const DATASET_CATEGORY_LABEL: Record<string, string> = {
  "faucets-micro": "Faucets & micro-earnings",
  "airdrop-testnet": "Airdrops & testnets",
  "staking-yield": "Staking & yield",
  "exchange-onboarding": "Exchange onboarding",
  "speech-tech": "Speech tech",
  "accents-localization": "Accents & localization",
  "learning-teaching": "Learning & teaching",
  "publishing-ops": "Publishing & ops",
};

function articleBasePath(kind: ArticleKind): string {
  if (kind === "howto") return "/how-to";
  if (kind === "news") return "/news";
  return "/guides";
}

function articleHint(kind: ArticleKind): string {
  if (kind === "howto") return "Learn";
  if (kind === "news") return "News";
  return "Do";
}

function slugifyGuidePath(slug: string, meta: DatasetPage): string {
  return meta.path || `/guides/${slug}`;
}

function staticGuideHref(slug: string): string {
  return `/guide.html?slug=${encodeURIComponent(slug)}`;
}

function collectTerms(...parts: (string | undefined)[]): string[] {
  const out = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    const lower = part.toLowerCase().trim();
    if (lower) out.add(lower);
    for (const token of lower.split(/[\s/–—-]+/)) {
      if (token.length >= 2) out.add(token);
    }
  }
  return [...out];
}

/** Build a client-side search index from glossary terms + editorial articles + dataset hubs. */
export function buildHeaderSearchIndex(): HeaderSearchEntry[] {
  const entries: HeaderSearchEntry[] = [...buildGlossarySearchEntries()];

  const indexCatalog = getIndexCatalog();
  entries.push({
    id: "hub:indexes",
    type: "category",
    label: indexCatalog.title,
    hint: "Research",
    href: "/indexes",
    staticHref: "/indexes",
    terms: collectTerms("indexes", "dataset", "research", "payout index"),
  });
  for (const item of indexCatalog.indexes) {
    if (item.status !== "published" || !item.path) continue;
    entries.push({
      id: `index:${item.id}`,
      type: "tool",
      label: item.title,
      hint: item.edition || "Index",
      href: item.path,
      staticHref: item.path,
      terms: collectTerms(
        item.id,
        item.title,
        item.summary,
        "bitcoin",
        "faucet",
        "payout",
        "satoshi",
        "index",
        "dataset",
      ),
    });
  }

  for (const article of ALL_ARTICLES) {
    const base = articleBasePath(article.kind);
    entries.push({
      id: `${article.kind}:${article.slug}`,
      type: article.kind,
      label: article.title,
      hint: articleHint(article.kind),
      href: `${base}/${article.slug}`,
      staticHref: `${base}/${article.slug}`,
      terms: collectTerms(
        article.slug,
        article.title,
        article.description,
        article.kind,
      ),
    });
  }

  for (const [slug, meta] of Object.entries(data.pages)) {
    const href = slugifyGuidePath(slug, meta);
    entries.push({
      id: `guide:${slug}`,
      type: "guide",
      label: meta.name || slug.replace(/-/g, " "),
      hint: meta.primaryKeyword || meta.parentCategory?.replace(/-/g, " ") || "Do",
      href,
      staticHref: staticGuideHref(slug),
      terms: collectTerms(
        slug,
        meta.name,
        meta.primaryKeyword,
        meta.parentCategory,
        meta.language,
        meta.accent,
        ...(meta.tags || []),
      ),
    });
  }

  for (const [language, tool] of Object.entries(data.toolAffiliates)) {
    if (language === "default") continue;
    const external = /^https?:\/\//i.test(tool.href);
    entries.push({
      id: `tool:${tool.id}`,
      type: "tool",
      label: tool.title,
      hint: tool.label || language,
      href: external ? tool.href : tool.href,
      staticHref: external ? tool.href : tool.href.startsWith("/") ? tool.href : `/${tool.href}`,
      terms: collectTerms(language, tool.title, tool.label, tool.description, tool.cta),
    });
  }

  const seenCategories = new Set<string>();
  for (const [slug, meta] of Object.entries(data.pages)) {
    const cat = meta.parentCategory;
    if (!cat || seenCategories.has(cat)) continue;
    seenCategories.add(cat);
    const href = slugifyGuidePath(slug, meta);
    entries.push({
      id: `category:${cat}`,
      type: "category",
      label: DATASET_CATEGORY_LABEL[cat] || cat.replace(/-/g, " "),
      hint: "Topic",
      href,
      staticHref: staticGuideHref(slug),
      terms: collectTerms(cat, DATASET_CATEGORY_LABEL[cat], ...(meta.tags || [])),
    });
  }

  return entries;
}

export function normalizeSearchQuery(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

function scoreEntry(query: string, entry: HeaderSearchEntry): number {
  if (!query) return 0;
  let score = 0;
  const label = entry.label.toLowerCase();

  if (label === query) score += 120;
  if (entry.id.endsWith(`:${query.replace(/\s+/g, "-")}`)) score += 110;

  if (entry.type === "term") {
    if (label === query) score += 40;
    else if (label.startsWith(query)) score += 25;
  }

  for (const term of entry.terms) {
    if (term === query) score += entry.type === "term" ? 100 : 90;
    else if (term.startsWith(query)) score += entry.type === "term" ? 65 : 55;
    else if (query.startsWith(term) && term.length >= 3) score += 40;
    else if (term.includes(query)) score += entry.type === "term" ? 35 : 28;
  }

  const tokens = query.split(/\s+/).filter((t) => t.length >= 2);
  for (const token of tokens) {
    if (label.includes(token)) score += 12;
    for (const term of entry.terms) {
      if (term.includes(token)) score += 8;
    }
  }

  return score;
}

export function searchHeaderIndex(
  query: string,
  index: HeaderSearchEntry[],
  limit = 8,
): HeaderSearchEntry[] {
  const q = normalizeSearchQuery(query);
  if (q.length < 1) return [];

  const ranked = index
    .map((entry) => ({ entry, score: scoreEntry(q, entry) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label));

  const picked: HeaderSearchEntry[] = [];
  const seenId = new Set<string>();

  for (const row of ranked) {
    if (picked.length >= limit) break;
    if (seenId.has(row.entry.id)) continue;
    seenId.add(row.entry.id);
    picked.push(row.entry);
  }

  return picked;
}

export type ResolveSearchOptions = {
  /** When true, emit root-relative static-site URLs */
  staticSite?: boolean;
};

/**
 * Resolve a query to the best destination — never returns a bare 404 target when a hub fits.
 */
export function resolveHeaderSearch(
  query: string,
  index: HeaderSearchEntry[],
  options: ResolveSearchOptions = {},
): string {
  const q = normalizeSearchQuery(query);
  if (!q) return options.staticSite ? "/index.html" : "/";

  const results = searchHeaderIndex(q, index, 12);
  const exact =
    results.find((r) => r.type === "term" && r.label.toLowerCase() === q) ||
    results.find((r) => r.label.toLowerCase() === q) ||
    results.find((r) => r.id === `term:${q.replace(/\s+/g, "-")}`) ||
    results.find((r) => r.id === `guide:${q.replace(/\s+/g, "-")}`) ||
    results.find((r) => r.terms.includes(q));

  if (exact) {
    return options.staticSite ? exact.staticHref : exact.href;
  }

  if (results.length > 0) {
    return options.staticSite ? results[0].staticHref : results[0].href;
  }

  const categoryFallback = index.find((e) => e.type === "category");
  if (categoryFallback) {
    return options.staticSite ? categoryFallback.staticHref : categoryFallback.href;
  }

  return options.staticSite ? "/guides.html" : "/guides";
}

/** Singleton index for client components (dataset is small). */
let cachedIndex: HeaderSearchEntry[] | null = null;

export function getHeaderSearchIndex(): HeaderSearchEntry[] {
  if (!cachedIndex) cachedIndex = buildHeaderSearchIndex();
  return cachedIndex;
}
