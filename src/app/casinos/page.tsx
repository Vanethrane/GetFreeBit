import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import {
  ComparisonMethodologyBlock,
  ListPositionBadge,
  MonetizationTransparencyStrip,
  WhyRankedHere,
} from "@/components/ComparisonTransparency";
import { getComparisonMethodology } from "@/data/comparison-methodology";
import { getLiveCasinoReferrals, isCasinoDeskPublic } from "@/data/casino-referrals";
import {
  casinoSignupCta,
  casinoSignupHref,
  casinoStatusLabel,
  isCasinoLive,
} from "@/lib/casino-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "Bitcoin Casinos",
    description:
      "Bitcoin casino partners with referral links, risk disclaimers, and clear affiliate disclosure. Gamble only with money you can afford to lose.",
    path: "/casinos",
    keyword: "bitcoin casino referral BTC gambling",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Bitcoin Casinos",
    keyword: "bitcoin casino referrals",
  }),
  /** Stay out of search until the desk is public with live partner links */
  robots: isCasinoDeskPublic()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/**
 * Private until at least one casino has live: true + a tracked link.
 * Not linked from nav/footer/sitemap while empty.
 */
export default function CasinosPage() {
  if (!isCasinoDeskPublic()) {
    notFound();
  }

  const casinos = getLiveCasinoReferrals();
  const methodology = getComparisonMethodology("casinos")!;

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Earn</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Bitcoin casino desk
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Partner casinos that accept Bitcoin and pay affiliates via tracked referral links. This is
          not financial advice—and it is not a way to “earn free crypto” without risk.
        </p>

        <div
          className="mt-6 rounded-xl border border-red-300/80 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-950"
          role="note"
        >
          <strong className="font-semibold">Use at your own risk.</strong> Online gambling can cause
          significant financial losses. The house edge favors the operator over time. Only play with
          money you can afford to lose, never chase losses, and stop if play stops being recreational.
          {siteConfig.name} is not responsible for deposits, withdrawals, account bans, or gambling
          losses. If gambling is a problem for you, seek local help resources and do not use these
          links.
        </div>

        <div className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <strong className="font-semibold">Jurisdiction:</strong> Most crypto casinos block players
          in the US and other regulated markets. You are responsible for confirming that any site is
          legal where you live before registering or depositing.
        </div>

        <ComparisonMethodologyBlock methodology={methodology} />

        <ul className="mt-10 space-y-8">
          {casinos.map((casino, index) => (
            <li
              key={casino.id}
              id={casino.id}
              className="scroll-mt-24 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                    {casino.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{casino.name}</h2>
                  <div className="mt-2">
                    <ListPositionBadge position={index + 1} total={casinos.length} />
                  </div>
                </div>
                <span className="rounded-full bg-voice-glow px-3 py-1 text-xs font-medium text-voice-dark">
                  {casinoStatusLabel(casino)}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-ink-muted">{casino.description}</p>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-ink">Typical affiliate offer</dt>
                  <dd className="mt-1 text-ink-muted">{casino.typicalOffer}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">BTC deposits</dt>
                  <dd className="mt-1 text-ink-muted">{casino.acceptsBtc ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Strengths</dt>
                  <dd className="mt-1 text-ink-muted">{casino.strengths}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Geo / eligibility</dt>
                  <dd className="mt-1 text-ink-muted">{casino.geoNotes}</dd>
                </div>
              </dl>

              <p className="mt-4 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Risks: </span>
                {casino.riskNotes}
              </p>

              <WhyRankedHere
                name={casino.name}
                partnerId={casino.id}
                position={index + 1}
                methodology={methodology}
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={casinoSignupHref(casino)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
                >
                  {casinoSignupCta(casino.name, isCasinoLive(casino))}
                </a>
                <span className="text-xs text-ink-muted">Opens partner site · 18+ / legal age only</span>
              </div>
            </li>
          ))}
        </ul>

        <MonetizationTransparencyStrip />

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} Casino affiliates are disclosed the same way as other
          partner desks.{" "}
          <Link href="/how-we-make-money" className="underline underline-offset-2 hover:text-voice-dark">
            How we make money
          </Link>
          {" · "}
          <Link href="/about" className="underline underline-offset-2 hover:text-voice-dark">
            About
          </Link>
          {" · "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-voice-dark">
            Terms
          </Link>
          .
        </p>
      </section>
    </SiteShell>
  );
}
