import type { Article } from "./types";
import wireRaw from "@/data/news-wire.json";

type WireStory = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes?: number;
  sourceUrl: string;
  sourceName: string;
  body: string;
};

function toArticle(story: WireStory): Article {
  const body = story.body.trim();
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    kind: "news",
    slug: story.slug,
    title: story.title,
    description: story.description,
    publishedAt: story.publishedAt,
    readingMinutes: story.readingMinutes ?? 2,
    sourceUrl: story.sourceUrl,
    sourceName: story.sourceName,
    sections: [
      {
        heading: "Wire briefing",
        paragraphs:
          paragraphs.length > 0
            ? paragraphs
            : [
                story.description,
                `Primary coverage: ${story.sourceName}. Always verify the original report before acting on market or protocol claims.`,
              ],
      },
    ],
  };
}

export const WIRE_NEWS: Article[] = (wireRaw as WireStory[]).map(toArticle);
