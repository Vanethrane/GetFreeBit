import { GLOSSARY } from "@/content/glossary";
import { ALL_ARTICLES, type Article, type ArticleKind } from "@/content/guides";
import type { HeaderSearchEntry } from "@/lib/header-search";

function articleHref(kind: ArticleKind, slug: string): string {
  if (kind === "howto") return `/how-to/${slug}`;
  if (kind === "news") return `/news/${slug}`;
  return `/guides/${slug}`;
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

function articleBody(article: Article): string {
  return article.sections.flatMap((s) => [s.heading, ...s.paragraphs]).join("\n");
}

function scoreArticleForTerm(term: string, article: Article): number {
  const lower = term.toLowerCase();
  const body = articleBody(article);
  const title = article.title.toLowerCase();
  const desc = article.description.toLowerCase();
  const slug = article.slug;

  let score = 0;
  const bracket = new RegExp(`\\[\\[${lower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]\\]`, "i");
  if (bracket.test(body)) score += 60;
  if (title.includes(lower)) score += 35;
  if (slug.includes(lower.replace(/\s+/g, "-"))) score += 25;
  if (desc.includes(lower)) score += 15;

  for (const token of lower.split(/\s+/)) {
    if (token.length >= 3 && title.includes(token)) score += 8;
    if (token.length >= 3 && bracket.test(body)) score += 5;
  }

  if (article.kind === "guide") score += 4;
  if (article.kind === "howto" && /how to|setup|create|connect|revoke|transfer|stake|buy|send|mint|deposit|adjust|analyze|participate/i.test(article.title)) {
    score += 3;
  }

  return score;
}

function bestArticleForTerm(term: string): Article | undefined {
  let best: { article: Article; score: number } | undefined;

  for (const article of ALL_ARTICLES) {
    const score = scoreArticleForTerm(term, article);
    if (score <= 0) continue;
    if (!best || score > best.score) best = { article, score };
  }

  return best?.article;
}

function formatTermLabel(term: string): string {
  if (term.length <= 4 && term === term.toUpperCase()) return term;
  return term.replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(text: string, max = 72): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

/** Popular crypto terms surfaced as quick picks on the home search bar. */
export const HOME_SEARCH_QUICK_TERMS = [
  "staking",
  "gas",
  "wallet",
  "DEX",
  "airdrop",
  "bridge",
  "DeFi",
  "NFT",
] as const;

/** Glossary entries indexed for search — each term links to its best matching article. */
export function buildGlossarySearchEntries(): HeaderSearchEntry[] {
  const entries: HeaderSearchEntry[] = [];

  for (const [term, definition] of Object.entries(GLOSSARY)) {
    const article = bestArticleForTerm(term);
    if (!article) continue;

    const href = articleHref(article.kind, article.slug);
    entries.push({
      id: `term:${term.replace(/\s+/g, "-")}`,
      type: "term",
      label: formatTermLabel(term),
      hint: "Crypto term",
      detail: truncate(definition),
      href,
      staticHref: href,
      terms: collectTerms(term, definition, article.title),
    });
  }

  return entries;
}
