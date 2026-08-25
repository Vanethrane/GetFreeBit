import { ALL_ARTICLES, type Article, type ArticleKind } from "@/content/guides";
import type { PageLanguageMeta, RelatedLink } from "@/lib/dataset";

const PILLAR_TAGS = [
  "faucets",
  "airdrop",
  "staking",
  "yield",
  "wallet",
  "defi",
  "exchange",
  "security",
  "tax",
  "nft",
  "gas",
  "testnet",
] as const;

function articlePath(article: Article): string {
  const base =
    article.kind === "guide" ? "/guides" : article.kind === "howto" ? "/how-to" : "/news";
  return `${base}/${article.slug}`;
}

function inferTags(article: Article): string[] {
  const blob = `${article.title} ${article.description} ${article.slug}`.toLowerCase();
  const tags = new Set<string>([article.kind]);
  for (const tag of PILLAR_TAGS) {
    if (blob.includes(tag)) tags.add(tag);
  }
  return [...tags];
}

function parentCategory(kind: ArticleKind): string {
  if (kind === "howto") return "crypto-procedures";
  if (kind === "news") return "crypto-news";
  return "crypto-education";
}

/** Dataset fallback for pillar SEO articles and any slug missing from dataset.json */
export function getArticlePageMeta(slug: string): PageLanguageMeta | null {
  const article = ALL_ARTICLES.find((row) => row.slug === slug);
  if (!article) return null;

  return {
    name: article.title,
    primaryKeyword: article.title,
    path: articlePath(article),
    parentCategory: parentCategory(article.kind),
    tags: inferTags(article),
    language: "English",
    accent: "neutral",
    inLanguage: "en",
  };
}

function relatedScore(a: PageLanguageMeta, b: PageLanguageMeta): number {
  let score = 0;
  if (a.parentCategory && a.parentCategory === b.parentCategory) score += 10;
  const tagsA = new Set((a.tags || []).map((t) => t.toLowerCase()));
  for (const tag of b.tags || []) {
    if (tagsA.has(tag.toLowerCase())) score += 3;
  }
  return score;
}

function sharedTags(a: PageLanguageMeta, b: PageLanguageMeta): string[] {
  const tagsA = new Set((a.tags || []).map((t) => t.toLowerCase()));
  return (b.tags || []).filter((t) => tagsA.has(t.toLowerCase()));
}

function naturalAnchor(meta: PageLanguageMeta, slug: string): string {
  return (meta.primaryKeyword || meta.name || slug).trim();
}

/** Related internal links when slug is absent from dataset.json graph */
export function getArticleRelatedLinks(slug: string, limit = 6): RelatedLink[] {
  const self = getArticlePageMeta(slug);
  if (!self) return [];

  return ALL_ARTICLES.filter((article) => article.slug !== slug)
    .map((article) => {
      const meta = getArticlePageMeta(article.slug)!;
      return {
        slug: article.slug,
        href: meta.path || articlePath(article),
        anchorText: naturalAnchor(meta, article.slug),
        name: meta.name || article.title,
        parentCategory: meta.parentCategory || "general",
        sharedTags: sharedTags(self, meta),
        score: relatedScore(self, meta),
      };
    })
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}
