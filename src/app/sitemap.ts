import type { MetadataRoute } from "next";
import { ALL_GUIDES, ALL_HOWTOS, ALL_NEWS } from "@/content/guides";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.domain).replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/guides",
    "/how-to",
    "/news",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency:
      path === "" || path === "/guides" || path === "/news" ? "daily" : "monthly",
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
  for (const item of ALL_HOWTOS) {
    entries.push({
      url: `${base}/how-to/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }
  for (const item of ALL_NEWS) {
    entries.push({
      url: `${base}/news/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
