import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { getAllNews, articleWordCount } from "@/content/guides";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildHubMetadata({
  title: "Crypto News",
  description: `Crypto regulation, institutions, and protocol news with operator context from ${siteConfig.name}.`,
  path: "/news",
  keyword: "crypto news regulation DeFi",
});

export default function NewsIndexPage() {
  const items = getAllNews();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Watch</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">News</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Editorial briefings on regulation, institutions, and protocol shifts—with source links,
          not ticker spam.
        </p>
        <ul className="mt-10 space-y-1">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="block border-b border-paper-line py-5 hover:border-voice/40"
              >
                <p className="mt-2 text-xs uppercase tracking-wide text-ink-muted">
                  {item.publishedAt} · {item.readingMinutes} min
                  {item.sourceName ? ` · ${item.sourceName}` : ""} · {articleWordCount(item)} words
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink">{item.title}</h2>
                <p className="mt-2 text-ink-muted">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-ink-muted">{siteConfig.affiliateDisclosure}</p>
      </section>
    </SiteShell>
  );
}
