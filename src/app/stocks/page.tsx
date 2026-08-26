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
import { getLiveStockReferrals, isStockDeskPublic } from "@/data/stock-referrals";
import {
  isStockLive,
  stockSignupCta,
  stockSignupHref,
  stockStatusLabel,
} from "@/lib/stock-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "US Stock App Referrals",
    description:
      "US brokerage and stock-app partners with referral links—Robinhood, Webull, and similar—plus risk notes before you open an account.",
    path: "/stocks",
    keyword: "Robinhood Webull referral stock app USA",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Stock App Referrals",
    keyword: "stock app referrals USA",
  }),
  robots: isStockDeskPublic()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/**
 * Private until at least one app has live: true + a tracked link.
 * Not linked from nav/footer/sitemap while empty.
 */
export default function StocksPage() {
  if (!isStockDeskPublic()) {
    notFound();
  }

  const apps = getLiveStockReferrals();
  const methodology = getComparisonMethodology("stocks")!;

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Invest</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          US stock app desk
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Brokerages and investing apps that work for US residents and run referral or invite
          programs. Educate first—promotional stock is not free money.
        </p>

        <div
          className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950"
          role="note"
        >
          <strong className="font-semibold">Investing risk:</strong> Securities can lose value,
          including all of your principal. Referral bonuses usually require funding, trades, or
          holding periods. This is not investment advice. {siteConfig.name} earns a referral
          commission when you open an account via our partner links when those links are live.
        </div>

        <ComparisonMethodologyBlock methodology={methodology} />

        <ul className="mt-10 space-y-8">
          {apps.map((app, index) => (
            <li
              key={app.id}
              id={app.id}
              className="scroll-mt-24 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                    {app.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{app.name}</h2>
                  <div className="mt-2">
                    <ListPositionBadge position={index + 1} total={apps.length} />
                  </div>
                </div>
                <span className="rounded-full bg-voice-glow px-3 py-1 text-xs font-medium text-voice-dark">
                  {stockStatusLabel(app)}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-ink-muted">{app.description}</p>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-ink">Typical referral offer</dt>
                  <dd className="mt-1 text-ink-muted">{app.typicalOffer}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Assets</dt>
                  <dd className="mt-1 text-ink-muted">{app.assetTypes}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Strengths</dt>
                  <dd className="mt-1 text-ink-muted">{app.strengths}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">US availability</dt>
                  <dd className="mt-1 text-ink-muted">{app.usAvailability}</dd>
                </div>
              </dl>

              <p className="mt-4 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Risks: </span>
                {app.riskNotes}
              </p>

              <WhyRankedHere
                name={app.name}
                partnerId={app.id}
                position={index + 1}
                methodology={methodology}
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={stockSignupHref(app)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
                >
                  {stockSignupCta(app.name, isStockLive(app))}
                </a>
                <span className="text-xs text-ink-muted">Opens partner site · US eligibility varies</span>
              </div>
            </li>
          ))}
        </ul>

        <MonetizationTransparencyStrip />

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}{" "}
          <Link href="/how-we-make-money" className="underline underline-offset-2 hover:text-voice-dark">
            How we make money
          </Link>
          {" · "}
          <Link href="/about" className="underline underline-offset-2 hover:text-voice-dark">
            About
          </Link>
          {" · "}
          <Link href="/exchanges" className="underline underline-offset-2 hover:text-voice-dark">
            Crypto exchanges
          </Link>
          .
        </p>
      </section>
    </SiteShell>
  );
}
