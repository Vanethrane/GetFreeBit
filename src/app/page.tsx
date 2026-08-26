import Link from "next/link";
import type { Metadata } from "next";
import {
  HomeDeskTiles,
  HomeEarnStrip,
  HomeMissionSupport,
  HomeOperatorPicks,
  HomePopularPaths,
} from "@/components/home/HomeSections";
import { HomeSearch } from "@/components/HomeSearch";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { SiteShell } from "@/components/SiteChrome";
import { getAllGuides, getAllHowtos, getAllNews } from "@/content/guides";
import { buildHomeMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildHomeMetadata();

export default function HomePage() {
  const latestGuides = getAllGuides().slice(0, 2);
  const latestHowtos = getAllHowtos().slice(0, 2);
  const latestNews = getAllNews().slice(0, 2);

  const deskCounts = {
    "/guides": getAllGuides().length,
    "/how-to": getAllHowtos().length,
    "/news": getAllNews().length,
  };

  return (
    <SiteShell homeLayout>
      <SiteJsonLd />
      <section className="hero-scene relative py-10 sm:py-12">
        <p className="anim-rise text-xs font-semibold uppercase tracking-[0.28em] text-voice-dark">
          {siteConfig.heroEyebrow}
        </p>
        <h1 className="anim-rise-delay mt-3 font-display text-4xl leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
          <span className="block">{siteConfig.heroTitleLead}</span>
          <span className="block text-signal">{siteConfig.heroTitleAccent}</span>
        </h1>
        <div className="hero-rule mt-4" aria-hidden="true" />
        <p className="anim-rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
          {siteConfig.tagline}
        </p>
        <div className="anim-rise-delay-2 mt-7">
          <HomeSearch className="max-w-2xl" />
        </div>
      </section>

      <HomePopularPaths />
      <HomeMissionSupport />
      <HomeEarnStrip />
      <HomeOperatorPicks />
      <HomeDeskTiles counts={deskCounts} />

      <section aria-labelledby="fresh-heading" className="section-scene border-t border-transparent py-10">
        <h2 id="fresh-heading" className="font-display text-2xl tracking-tight text-ink">
          Fresh from the desk
        </h2>
        <div className="mt-6 space-y-8">
          <DeskBlock title="Guides" href="/guides" items={latestGuides} base="/guides" />
          <DeskBlock title="How-tos" href="/how-to" items={latestHowtos} base="/how-to" />
          <DeskBlock title="News" href="/news" items={latestNews} base="/news" />
        </div>
        <p className="mt-8 text-center text-sm text-ink-muted">
          <Link href="/guides" className="font-medium text-voice-dark underline-offset-4 hover:underline">
            Browse all content
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}

function DeskBlock({
  title,
  href,
  items,
  base,
}: {
  title: string;
  href: string;
  base: string;
  items: { slug: string; title: string; description: string }[];
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <Link href={href} className="text-sm font-medium text-voice-dark underline underline-offset-4">
          View all
        </Link>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`${base}/${item.slug}`}
              className="block border-b border-paper-line py-3 transition-colors hover:border-voice/40"
            >
              <span className="font-semibold text-ink">{item.title}</span>
              <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
