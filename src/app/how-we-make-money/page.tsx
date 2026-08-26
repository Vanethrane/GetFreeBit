import Link from "next/link";
import type { Metadata } from "next";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell, Prose } from "@/components/SiteChrome";
import { COMPARISON_METHODOLOGIES } from "@/data/comparison-methodology";
import {
  MONETIZATION_PAGE,
  MONETIZATION_PATH,
  REVENUE_STREAMS,
  TRANSPARENCY_FAQ,
} from "@/data/monetization";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: MONETIZATION_PAGE.title,
    description: MONETIZATION_PAGE.metaDescription,
    path: MONETIZATION_PATH,
    keyword: "how getfreebit makes money affiliate disclosure",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "How We Make Money",
    keyword: "affiliate disclosure crypto",
  }),
};

export default function HowWeMakeMoneyPage() {
  return (
    <SiteShell>
      <article className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Trust</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {MONETIZATION_PAGE.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {MONETIZATION_PAGE.lede}
        </p>

        <div className="mt-8 rounded-xl border-2 border-signal/35 bg-signal-glow/40 px-4 py-4 sm:px-5">
          <p className="font-display text-xl text-ink">{MONETIZATION_PAGE.independenceStatement}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {MONETIZATION_PAGE.independenceDetail}
          </p>
        </div>

        <Prose>
          <section>
            <h2>Revenue streams</h2>
            <p>
              {siteConfig.name} is free to read. We earn when the product helps you—and when you
              choose to support the site directly. Here is every channel we use today or may use in
              the future:
            </p>
            <ul className="mt-4 space-y-6">
              {REVENUE_STREAMS.map((stream) => (
                <li key={stream.id} className="list-none rounded-xl border border-paper-line bg-paper-raised p-4">
                  <h3 className="font-display text-lg text-ink">{stream.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{stream.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>How comparison desks work</h2>
            <p>
              Referral desks (exchanges, faucets, cards, tax tools) show products in a numbered list.
              The number is list order under documented criteria—not a trophy. Each live entry
              includes a “Why is X listed #N?” explanation you can expand.
            </p>
            <ul className="mt-4 space-y-3">
              {COMPARISON_METHODOLOGIES.filter((m) =>
                ["exchanges", "faucets", "cards", "tax-tools"].includes(m.id),
              ).map((desk) => (
                <li key={desk.id}>
                  <Link
                    href={desk.deskPath}
                    className="font-medium text-voice-dark underline underline-offset-2"
                  >
                    {desk.deskTitle}
                  </Link>
                  <span className="text-ink-muted"> — {desk.summary}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>What we disclose on every monetized page</h2>
            <p className="rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm">
              {siteConfig.affiliateDisclosure}
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Partner links use <code className="text-xs">rel=&quot;sponsored&quot;</code> where
              applicable. Code-only programs show the invite code instead of a fabricated tracking
              URL.
            </p>
          </section>

          <section>
            <h2>Donations</h2>
            <p>
              {siteConfig.donations.supportBody} Donations do not affect rankings or editorial
              coverage. Support options live on our{" "}
              <Link href="/about" className="text-voice-dark underline underline-offset-2">
                About
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2>FAQ</h2>
            <dl className="space-y-4">
              {TRANSPARENCY_FAQ.map((item) => (
                <div key={item.q}>
                  <dt className="font-medium text-ink">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2>Corrections &amp; contact</h2>
            <p>
              Factual errors about fees, minimums, or partner terms belong in the{" "}
              <Link href="/corrections" className="text-voice-dark underline underline-offset-2">
                corrections log
              </Link>
              . Questions about partnerships or transparency:{" "}
              <Link href="/contact" className="text-voice-dark underline underline-offset-2">
                Contact
              </Link>
              .
            </p>
            <p className="mt-3 text-xs text-ink-muted">
              Page last updated {MONETIZATION_PAGE.lastUpdated}. Not financial, tax, or legal advice.
            </p>
          </section>
        </Prose>
      </article>
    </SiteShell>
  );
}
