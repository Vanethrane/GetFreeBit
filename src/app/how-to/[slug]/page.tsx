import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { ALL_HOWTOS, getHowto } from "@/content/guides";
import { buildProgrammaticSocialMetadata } from "@/lib/og-meta";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = false;

export function generateStaticParams() {
  return ALL_HOWTOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getHowto(slug);
  if (!article) return { title: "How-to not found" };
  return buildProgrammaticSocialMetadata({
    slug,
    title: article.title,
    description: article.description,
    path: `/how-to/${article.slug}`,
    pageType: "howto",
    publishedAt: article.publishedAt,
    readingMinutes: article.readingMinutes,
  });
}

export default async function HowtoPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getHowto(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
