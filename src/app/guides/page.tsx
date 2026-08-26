import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { getAllGuides, articleWordCount } from "@/content/guides";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildHubMetadata({
  title: "Do",
  description: `Actionable crypto guides from ${siteConfig.name}—blockchain, DeFi, wallets, staking, and security fundamentals with risk callouts.`,
  path: "/guides",
  keyword: "crypto guides blockchain DeFi",
});

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <SiteShell>
      <section className="py-12">
        <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">Do</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {guides.length} guides on how crypto systems work.
        </p>
        <ul className="mt-10 space-y-1">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block border-b border-paper-line py-5 hover:border-voice/40"
              >
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  {guide.publishedAt} · {guide.readingMinutes} min · {articleWordCount(guide)} words
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink">{guide.title}</h2>
                <p className="mt-2 text-ink-muted">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-ink-muted">{siteConfig.affiliateDisclosure}</p>
      </section>
    </SiteShell>
  );
}
