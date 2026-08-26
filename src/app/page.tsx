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

      <section className="hero-scene relative pb-3 pt-4 sm:pb-4 sm:pt-5">
        <h1 className="anim-rise font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
          <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-voice-dark sm:text-base">
            {siteConfig.name}
          </span>
          <span className="mt-1.5 block">
            {siteConfig.heroTitleLead}{" "}
            <span className="text-signal">{siteConfig.heroTitleAccent}</span>
          </span>
        </h1>
        <p className="anim-rise-delay mt-2 max-w-2xl text-sm leading-snug text-ink-muted sm:text-[0.95rem]">
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
                  {item.base === "/guides" ? "Do" : item.base === "/how-to" ? "Learn" : "News"}
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
