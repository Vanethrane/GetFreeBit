import type { Article, ArticleKind } from "./types";
import { articleWordCount } from "./types";
import { GUIDES } from "./articles-guides";
import { GUIDES_SEO } from "./articles-guides-seo";
import { HOWTOS } from "./articles-howtos";
import { HOWTOS_SEO } from "./articles-howtos-seo";
import { NEWS } from "./articles-news";

export type { Article, ArticleKind, Guide, GuideSection } from "./types";
export { articleWordCount, guideWordCount } from "./types";

export const ALL_GUIDES: Article[] = [...GUIDES, ...GUIDES_SEO];
export const ALL_HOWTOS: Article[] = [...HOWTOS, ...HOWTOS_SEO];
export const ALL_NEWS: Article[] = NEWS;

export const ALL_ARTICLES: Article[] = [...ALL_GUIDES, ...ALL_HOWTOS, ...ALL_NEWS];

export function findArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticle(kind: ArticleKind, slug: string): Article | undefined {
  const pool =
    kind === "guide" ? ALL_GUIDES : kind === "howto" ? ALL_HOWTOS : ALL_NEWS;
  return pool.find((a) => a.slug === slug);
}

export function getGuide(slug: string): Article | undefined {
  return getArticle("guide", slug);
}

export function getHowto(slug: string): Article | undefined {
  return getArticle("howto", slug);
}

export function getNews(slug: string): Article | undefined {
  return getArticle("news", slug);
}

export function getAllGuides(): Article[] {
  return [...ALL_GUIDES].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllHowtos(): Article[] {
  return [...ALL_HOWTOS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllNews(): Article[] {
  return [...ALL_NEWS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function assertArticleLengths(minWords = 500): { slug: string; kind: ArticleKind; words: number }[] {
  return ALL_ARTICLES.map((a) => ({
    slug: a.slug,
    kind: a.kind,
    words: articleWordCount(a),
  })).filter((row) => row.words < minWords);
}

/** @deprecated */
export function assertGuideLengths(minWords = 500) {
  return assertArticleLengths(minWords).map(({ slug, words }) => ({ slug, words }));
}
