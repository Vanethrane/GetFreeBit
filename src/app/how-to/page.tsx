import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { getAllHowtos, articleWordCount } from "@/content/guides";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildHubMetadata({
  title: "Learn",
  description: `Step-by-step crypto how-tos from ${siteConfig.name}—wallets, faucets, swaps, bridges, staking, and security procedures.`,
  path: "/how-to",
  keyword: "crypto how to wallet staking",
});

export default function HowtosIndexPage() {
  const items = getAllHowtos();

  return (
    <SiteShell>
      <section className="py-12">
        <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">Learn</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {items.length} how-tos with security checkpoints.
        </p>
        <ul className="mt-10 space-y-1">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/how-to/${item.slug}`}
                className="block border-b border-paper-line py-5 hover:border-voice/40"
              >
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  {item.publishedAt} · {item.readingMinutes} min · {articleWordCount(item)} words
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
