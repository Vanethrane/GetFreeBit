import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { ALL_NEWS, getNews } from "@/content/guides";
import { buildProgrammaticSocialMetadata } from "@/lib/og-meta";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = false;

export function generateStaticParams() {
  return ALL_NEWS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) return { title: "Story not found" };
  return buildProgrammaticSocialMetadata({
    slug,
    title: article.title,
    description: article.description,
    path: `/news/${article.slug}`,
    pageType: "guide",
    publishedAt: article.publishedAt,
    readingMinutes: article.readingMinutes,
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
