import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClusterArticleView } from "@/components/ClusterArticleView";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import {
  FAUCET_CLUSTER_SLUGS,
  getFaucetClusterArticle,
} from "@/data/faucet-cluster-content";
import { getPageIntent } from "@/data/seo-intent-map";
import { buildHubMetadata } from "@/lib/site-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FAUCET_CLUSTER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getFaucetClusterArticle(slug);
  if (!article) return {};

  const path = `/faucets/learn/${slug}`;
  const intent = getPageIntent(path);

  return {
    ...buildHubMetadata({
      title: article.title,
      description: article.metaDescription,
      path,
      keyword: intent?.primaryKeyword ?? article.h1.toLowerCase(),
    }),
    title: dynamicTitleMetadata({
      pageType: "site",
      name: article.title,
      keyword: intent?.primaryKeyword ?? "bitcoin faucet",
    }),
  };
}

export default async function FaucetClusterArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getFaucetClusterArticle(slug);
  if (!article) notFound();

  return <ClusterArticleView article={article} path={`/faucets/learn/${slug}`} />;
}
