import type { Metadata } from "next";
import { getPageIntent } from "@/data/seo-intent-map";
import { buildProgrammaticSocialMetadata } from "@/lib/og-meta";
import { siteConfig } from "@/site.config";

/** Shared Open Graph + canonical metadata for index and trust pages */
export function buildHubMetadata(input: {
  title: string;
  description: string;
  path: string;
  keyword: string;
}): Metadata {
  const intent = getPageIntent(input.path);
  const title = intent?.title ?? input.title;
  const description = intent?.metaDescription ?? input.description;
  const keyword = intent?.primaryKeyword ?? input.keyword;

  return {
    ...buildProgrammaticSocialMetadata({
      title,
      description,
      path: input.path,
      pageType: "site",
      slug: undefined,
    }),
    keywords: [keyword, ...(intent?.secondaryKeywords ?? [])].join(", "),
  };
}

export function buildHomeMetadata(): Metadata {
  const intent = getPageIntent("/");
  return {
    ...buildProgrammaticSocialMetadata({
      title: intent?.title ?? siteConfig.name,
      description: intent?.metaDescription ?? siteConfig.description,
      path: "/",
      pageType: "site",
    }),
    keywords: intent
      ? [intent.primaryKeyword, ...intent.secondaryKeywords].join(", ")
      : undefined,
  };
}
