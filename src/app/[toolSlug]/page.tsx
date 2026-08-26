import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BitcoinToolView } from "@/components/tools/BitcoinToolView";
import {
  BITCOIN_TOOL_SLUGS,
  getBitcoinTool,
  type BitcoinToolSlug,
} from "@/data/bitcoin-tools";
import { buildProgrammaticSocialMetadata } from "@/lib/og-meta";
import { siteConfig } from "@/site.config";

type PageProps = { params: Promise<{ toolSlug: string }> };

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return BITCOIN_TOOL_SLUGS.map((toolSlug) => ({ toolSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = getBitcoinTool(toolSlug);
  if (!tool) return { title: "Tool not found" };

  const social = buildProgrammaticSocialMetadata({
    title: tool.title,
    description: tool.metaDescription,
    path: tool.path,
    pageType: "site",
    slug: tool.slug,
  });

  return {
    ...social,
    title: `${tool.title} · ${siteConfig.name}`,
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords].join(", "),
    alternates: {
      canonical: `${siteConfig.domain}${tool.path}`,
    },
  };
}

function buildToolJsonLd(tool: NonNullable<ReturnType<typeof getBitcoinTool>>) {
  const url = `${siteConfig.domain}${tool.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.title,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url,
        description: tool.metaDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.domain,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "WebPage",
        name: tool.h1,
        description: tool.metaDescription,
        url,
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.domain,
        },
      },
    ],
  };
}

export default async function BitcoinToolPage({ params }: PageProps) {
  const { toolSlug } = await params;
  if (!(BITCOIN_TOOL_SLUGS as readonly string[]).includes(toolSlug)) {
    notFound();
  }
  const tool = getBitcoinTool(toolSlug as BitcoinToolSlug);
  if (!tool) notFound();

  const jsonLd = buildToolJsonLd(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BitcoinToolView tool={tool} />
    </>
  );
}
