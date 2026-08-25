/**
 * Extract article metadata from TypeScript content files for build-time indexes.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const ARTICLE_FILES = [
  { kind: "guide", path: "src/content/articles-guides.ts" },
  { kind: "howto", path: "src/content/articles-howtos.ts" },
  { kind: "news", path: "src/content/articles-news.ts" },
];

function unescape(str) {
  return str.replace(/\\"/g, '"').replace(/\\n/g, "\n");
}

function articleHref(kind, slug) {
  if (kind === "howto") return `/how-to/${slug}`;
  if (kind === "news") return `/news/${slug}`;
  return `/guides/${slug}`;
}

function articleHint(kind) {
  if (kind === "howto") return "How-to";
  if (kind === "news") return "News";
  return "Guide";
}

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

function parseArticleBlocks(raw) {
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("];");
  if (start < 0 || end < 0) return [];

  const body = raw.slice(start + 1, end);
  return body
    .split(/\n  \},\n  \{/)
    .map((chunk, index, all) => {
      if (index === 0) return chunk.replace(/^\s*\{\s*/, "");
      if (index === all.length - 1) return chunk.replace(/\}\s*$/, "");
      return chunk;
    });
}

function parseArticleBlock(block, defaultKind) {
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const kind = block.match(/kind:\s*"(guide|howto|news)"/)?.[1] || defaultKind;
  const title = block.match(/title:\s*"((?:\\.|[^"\\])*)"/)?.[1];
  const description = block.match(/description:\s*\n?\s*"((?:\\.|[^"\\])*)"/)?.[1];

  if (!slug || !title || !description) return null;

  return {
    slug,
    kind,
    title: unescape(title),
    description: unescape(description),
  };
}

/** @returns {{ slug: string, kind: string, title: string, description: string, href: string, hint: string, terms: string[] }[]} */
export function loadArticleSearchEntries(root = ROOT) {
  const entries = [];

  for (const file of ARTICLE_FILES) {
    const raw = readFileSync(join(root, file.path), "utf8");
    for (const block of parseArticleBlocks(raw)) {
      const article = parseArticleBlock(block, file.kind);
      if (!article) continue;
      entries.push({
        ...article,
        href: articleHref(article.kind, article.slug),
        hint: articleHint(article.kind),
        terms: collectTerms(
          article.slug,
          article.title,
          article.description,
          article.kind,
        ),
      });
    }
  }

  return entries;
}
