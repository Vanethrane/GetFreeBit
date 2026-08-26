import type { MetadataRoute } from "next";
import { ALL_GUIDES, ALL_HOWTOS, ALL_NEWS } from "@/content/guides";
import { canonicalPath } from "@/lib/canonical";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

function sitemapUrl(base: string, path: string): string {
  const canonical = canonicalPath(path);
  return `${base}${canonical === "/" ? "/" : canonical}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.domain).replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/guides",
    "/how-to",
    "/faucets",
    "/exchanges",
    "/cards",
    "/tools/tax",
    "/news",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const moneyDesks = new Set(["/faucets", "/exchanges", "/cards", "/tools/tax"]);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: sitemapUrl(base, path),
    lastModified: now,
    changeFrequency:
      path === "" || path === "/guides" || path === "/news" ? "daily" : "weekly",
    priority: path === "" ? 1 : moneyDesks.has(path) ? 0.9 : 0.8,
  }));

  for (const guide of ALL_GUIDES) {
    entries.push({
      url: sitemapUrl(base, `/guides/${guide.slug}`),
      lastModified: new Date(guide.publishedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }
  for (const item of ALL_HOWTOS) {
    entries.push({
      url: sitemapUrl(base, `/how-to/${item.slug}`),
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }
  for (const item of ALL_NEWS) {
    entries.push({
      url: sitemapUrl(base, `/news/${item.slug}`),
      lastModified: new Date(item.publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
