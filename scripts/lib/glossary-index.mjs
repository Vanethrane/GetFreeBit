/**
 * Build-time glossary search entries (mirrors src/lib/glossary-search.ts).
 */
import { readFileSync } from "fs";
import { join } from "path";
import { loadArticleSearchEntries } from "./article-index.mjs";

const ARTICLE_FILES = [
  { kind: "guide", path: "src/content/articles-guides.ts" },
  { kind: "howto", path: "src/content/articles-howtos.ts" },
  { kind: "news", path: "src/content/articles-news.ts" },
];

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

function articleHref(kind, slug) {
  if (kind === "howto") return `/how-to/${slug}`;
  if (kind === "news") return `/news/${slug}`;
  return `/guides/${slug}`;
}

function loadGlossary(root) {
  const raw = readFileSync(join(root, "src/content/glossary.ts"), "utf8");
  const entries = [];
  const re =
    /^\s+(?:"((?:\\.|[^"\\])*)"|([A-Za-z0-9][\w\s/-]*?))\s*:\s*\n\s+"((?:\\.|[^"\\])*)"/gm;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const term = (m[1] || m[2] || "").trim();
    if (!term) continue;
    entries.push({
      term: term.replace(/\\"/g, '"'),
      definition: m[3].replace(/\\"/g, '"'),
    });
  }
  return entries;
}

function loadArticleBodies(root) {
  const articles = [];
  for (const file of ARTICLE_FILES) {
    const raw = readFileSync(join(root, file.path), "utf8");
    const blocks = raw.split(/\n  \},\n  \{/);
    for (const block of blocks) {
      const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
      const kind = block.match(/kind:\s*"(guide|howto|news)"/)?.[1] || file.kind;
      const title = block.match(/title:\s*"((?:\\.|[^"\\])*)"/)?.[1]?.replace(/\\"/g, '"');
      if (!slug) continue;
      articles.push({
        slug,
        kind,
        title: title || slug,
        body: block,
      });
    }
  }
  return articles;
}

function scoreArticleForTerm(term, article) {
  const lower = term.toLowerCase();
  let score = 0;
  const bracket = new RegExp(`\\[\\[${lower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]\\]`, "i");
  if (bracket.test(article.body)) score += 60;
  if (article.title.toLowerCase().includes(lower)) score += 35;
  if (article.slug.includes(lower.replace(/\s+/g, "-"))) score += 25;
  if (article.kind === "guide") score += 4;
  return score;
}

function bestArticleForTerm(term, articles) {
  let best;
  for (const article of articles) {
    const score = scoreArticleForTerm(term, article);
    if (score <= 0) continue;
    if (!best || score > best.score) best = { article, score };
  }
  return best?.article;
}

function formatTermLabel(term) {
  if (term.length <= 4 && term === term.toUpperCase()) return term;
  return term.replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(text, max = 72) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

/** @param {string} [root] */
export function loadGlossarySearchEntries(root) {
  const glossary = loadGlossary(root);
  const articles = loadArticleBodies(root);
  const entries = [];

  for (const { term, definition } of glossary) {
    const article = bestArticleForTerm(term, articles);
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
