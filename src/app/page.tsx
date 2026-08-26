import Link from "next/link";
import type { Metadata } from "next";
import { BitcoinMonitor } from "@/components/home/BitcoinMonitor";
import { HomeMissionSupport, HomeResourceRail } from "@/components/home/HomeSections";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { SiteShell } from "@/components/SiteChrome";
import { getAllGuides, getAllHowtos, getAllNews } from "@/content/guides";
import { buildHomeMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildHomeMetadata();

export default function HomePage() {
  const latest = [
    ...getAllGuides().slice(0, 1).map((a) => ({ ...a, base: "/guides" as const })),
    ...getAllHowtos().slice(0, 1).map((a) => ({ ...a, base: "/how-to" as const })),
    ...getAllNews().slice(0, 1).map((a) => ({ ...a, base: "/news" as const })),
  ];

  return (
    <SiteShell homeLayout>
      <SiteJsonLd />

      <section className="hero-scene relative pb-6 pt-8 sm:pb-8 sm:pt-10">
        <p className="anim-rise text-xs font-semibold uppercase tracking-[0.28em] text-voice-dark">
          {siteConfig.heroEyebrow}
        </p>
        <h1 className="anim-rise-delay mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.15rem]">
          <span className="block">{siteConfig.heroTitleLead}</span>
          <span className="block text-signal">{siteConfig.heroTitleAccent}</span>
        </h1>
        <div className="hero-rule mt-4" aria-hidden="true" />
        <p className="anim-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {siteConfig.tagline}
        </p>
      </section>

      <div className="anim-rise-delay-2 pb-4">
        <BitcoinMonitor />
      </div>

      <HomeResourceRail />

      <HomeMissionSupport />

      <section
        aria-labelledby="latest-heading"
        className="section-scene border-t border-transparent py-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="latest-heading" className="font-display text-2xl tracking-tight text-ink">
              From the library
            </h2>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-muted">
              Deep guides for newcomers, operator how-tos for pros—always free.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-sm font-medium text-voice-dark underline-offset-4 hover:underline"
          >
            Browse all →
          </Link>
        </div>
        <ul className="mt-6 divide-y divide-paper-line border-y border-paper-line">
          {latest.map((item) => (
            <li key={`${item.base}-${item.slug}`}>
              <Link
                href={`${item.base}/${item.slug}`}
                className="block py-4 transition-colors hover:bg-paper-raised/40"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {item.base === "/guides" ? "Guide" : item.base === "/how-to" ? "How-to" : "News"}
                </span>
                <span className="mt-1 block font-semibold text-ink">{item.title}</span>
                <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
