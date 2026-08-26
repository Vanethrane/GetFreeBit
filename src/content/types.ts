export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleKind = "guide" | "howto" | "news";

export type Article = {
  slug: string;
  kind: ArticleKind;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  sections: ArticleSection[];
  /** Optional primary-source link for automated wire stories */
  sourceUrl?: string;
  sourceName?: string;
};

/** @deprecated Prefer Article — kept for gradual migration */
export type GuideSection = ArticleSection;
export type Guide = Article;

export function articleWordCount(article: Article): number {
  const text = [
    article.title,
    article.description,
    ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
  ].join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const guideWordCount = articleWordCount;
