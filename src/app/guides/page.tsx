import type { Metadata } from "next";
import Link from "next/link";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { getAllGuides, guideWordCount } from "@/content/guides";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Guides",
    keyword: `${siteConfig.name} crypto guides`,
  }),
  description: `${siteConfig.name} how-to guides for faucets, airdrops, staking yield, and exchange onboarding—with risks called out plainly.`,
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">How-to library</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Guides
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {guides.length} operator-style walkthroughs—faucets, testnets, yield, and onboarding.
          Hover gold terms for definitions; follow in-article links between playbooks.
        </p>

        <ul className="mt-10 space-y-4">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block border-b border-paper-line py-5 transition hover:text-voice-dark"
              >
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  {guide.publishedAt} · {guide.readingMinutes} min · {guideWordCount(guide)} words
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink">{guide.title}</h2>
                <p className="mt-2 text-ink-muted">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </section>
    </SiteShell>
  );
}
