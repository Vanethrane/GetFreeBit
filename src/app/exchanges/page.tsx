import Link from "next/link";
import type { Metadata } from "next";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { getExchangeReferrals } from "@/data/exchange-referrals";
import {
  hasPartnerReferralCode,
  partnerReferralStatusLabel,
  partnerSignupHref,
} from "@/lib/partner-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "US Crypto Exchange Referrals",
    description:
      "Compare US-accessible Tier-1 exchanges—fiat rails, typical partner offers, strengths, and custody risks before you KYC.",
    path: "/exchanges",
    keyword: "best crypto exchange USA Coinbase Kraken Gemini",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Exchange Referrals",
    keyword: "best crypto exchange USA",
  }),
};

export default function ExchangesPage() {
  const exchanges = getExchangeReferrals();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Onboard</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Exchange referral desk
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          US-accessible Tier-1 venues for fiat onboarding, spot buys, and optional staking. We list
          rails and risks first—use partner links only after the product fits your state and KYC
          comfort.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <strong className="font-semibold">US focus:</strong> Live partner links appear below as
          programs are approved. Prefer US-domiciled venues (e.g. Binance.US)—not global Binance.com
          if you are a US person. State-level product bans still apply; confirm at signup.
        </div>

        <ul className="mt-10 space-y-8">
          {exchanges.map((exchange) => (
            <li
              key={exchange.id}
              id={exchange.id}
              className="scroll-mt-24 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                    {exchange.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{exchange.name}</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    hasPartnerReferralCode(exchange)
                      ? "bg-voice-glow text-voice-dark"
                      : "bg-paper text-ink-muted"
                  }`}
                >
                  {partnerReferralStatusLabel(exchange)}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-ink-muted">{exchange.description}</p>

              <p className="mt-3 rounded-lg border border-signal/25 bg-signal-glow/40 px-3 py-2 text-sm text-ink">
                <span className="font-medium text-signal-dark">Why join:</span> {exchange.whyJoin}
              </p>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Typical partner offer
                  </dt>
                  <dd className="mt-1 text-ink">{exchange.typicalOffer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Fiat rails
                  </dt>
                  <dd className="mt-1 text-ink">{exchange.fiatRails}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Strengths
                  </dt>
                  <dd className="mt-1 text-ink">{exchange.strengths}</dd>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    US notes
                  </dt>
                  <dd className="mt-1 text-ink">{exchange.usAvailability}</dd>
                </div>
              </dl>

              <p className="mt-4 rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-ink-muted">
                <span className="font-medium text-ink">Risk check:</span> {exchange.riskNotes}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={partnerSignupHref(exchange)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
                >
                  {hasPartnerReferralCode(exchange)
                    ? `Sign up with our ${exchange.name} link`
                    : `Visit ${exchange.name}`}
                </a>
                <Link
                  href="/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency"
                  className="text-sm font-medium text-voice-dark underline underline-offset-4"
                >
                  Fiat buy how-to
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-12 border-t border-paper-line pt-10">
          <h2 className="font-display text-2xl text-ink">Quick comparison</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Planning snapshot—verify live fees, state eligibility, and bonus terms before KYC.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-ink-muted">
                  <th className="py-3 pr-4 font-medium">Exchange</th>
                  <th className="py-3 pr-4 font-medium">Offer (typical)</th>
                  <th className="py-3 pr-4 font-medium">Fiat</th>
                  <th className="py-3 font-medium">Best next step</th>
                </tr>
              </thead>
              <tbody>
                {exchanges.map((exchange) => (
                  <tr key={exchange.id} className="border-b border-paper-line/80">
                    <td className="py-3 pr-4 font-medium text-ink">
                      <a href={`#${exchange.id}`} className="hover:text-voice-dark">
                        {exchange.name}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{exchange.typicalOffer}</td>
                    <td className="py-3 pr-4 text-ink-muted">{exchange.fiatRails}</td>
                    <td className="py-3 text-ink-muted">{exchange.strengths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-paper-line bg-voice-glow/30 p-5">
          <h2 className="font-display text-xl text-ink">Operator workflow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            <li>
              Create a{" "}
              <Link
                href="/how-to/how-to-create-your-first-self-custody-crypto-wallet"
                className="text-voice-dark underline underline-offset-2"
              >
                self-custody wallet
              </Link>{" "}
              before large on-exchange balances accumulate.
            </li>
            <li>KYC on one primary US venue—avoid scattering identity across five apps on day one.</li>
            <li>
              Buy spot only; skip leverage until you understand{" "}
              <Link
                href="/guides/what-crypto-staking-is-and-how-yield-is-generated"
                className="text-voice-dark underline underline-offset-2"
              >
                yield mechanics
              </Link>{" "}
              and custody trade-offs.
            </li>
            <li>
              Export CSVs annually and prep with a{" "}
              <Link href="/tools/tax" className="text-voice-dark underline underline-offset-2">
                tax tool
              </Link>
              —don&apos;t wait until April.
            </li>
          </ol>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} More exchanges appear here as Impact/Awin links are
          approved. This is education—not investment, tax, or legal advice.
        </p>
      </section>
    </SiteShell>
  );
}
