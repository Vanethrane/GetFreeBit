import type { MetadataRoute } from "next";
import { ALL_GUIDES } from "@/content/guides";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

/** Core pages + guides for static export. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.domain).replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["", "/guides", "/about", "/contact", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/guides" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const guide of ALL_GUIDES) {
    entries.push({
      url: `${base}/guides/${guide.slug}`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}
