import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { ALL_GUIDES, getGuide } from "@/content/guides";
import { buildProgrammaticSocialMetadata } from "@/lib/og-meta";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = false;

export function generateStaticParams() {
  return ALL_GUIDES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuide(slug);
  if (!article) return { title: "Guide not found" };
  return buildProgrammaticSocialMetadata({
    slug,
    title: article.title,
    description: article.description,
    path: `/guides/${article.slug}`,
    pageType: "guide",
    publishedAt: article.publishedAt,
    readingMinutes: article.readingMinutes,
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getGuide(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
