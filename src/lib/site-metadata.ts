import type { Metadata } from "next";
import { buildProgrammaticSocialMetadata } from "@/lib/og-meta";
import { siteConfig } from "@/site.config";

/** Shared Open Graph + canonical metadata for index and trust pages */
export function buildHubMetadata(input: {
  title: string;
  description: string;
  path: string;
  keyword: string;
}): Metadata {
  return buildProgrammaticSocialMetadata({
    title: input.title,
    description: input.description,
    path: input.path,
    pageType: "site",
    slug: undefined,
  });
}

export function buildHomeMetadata(): Metadata {
  return buildProgrammaticSocialMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
    pageType: "site",
  });
}
