import Link from "next/link";
import type { Metadata } from "next";
import { CopyReferralCode } from "@/components/CopyReferralCode";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { getCardReferrals } from "@/data/card-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "Crypto Cards & Banking",
    description:
      "Bybit Card invite code and tracked banking partners—eligibility, fees, and how referrals work when a program is code-only.",
    path: "/cards",
    keyword: "Bybit Card referral code crypto debit",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Crypto Cards",
    keyword: "Bybit Card referral code",
  }),
};

export default function CardsPage() {
  const cards = getCardReferrals();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Cards</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Cards &amp; banking desk
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Crypto debit and banking partners. Prefer tracked links when available. For Bybit Card,
          Bybit only attributes via an invite code—we show that code clearly.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <strong className="font-semibold">Eligibility:</strong> Card products are heavily
          geo-restricted. Confirm you are allowed to apply in your country before KYC. Do not use a
          VPN to bypass residency rules.
        </div>

        <ul className="mt-10 space-y-8">
          {cards.map((card) => (
            <li
              key={card.id}
              id={card.id}
              className="scroll-mt-24 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                    {card.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{card.name}</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    card.codeOnly
                      ? "bg-voice-glow text-voice-dark"
                      : "bg-signal-glow text-signal-dark"
                  }`}
                >
                  {card.codeOnly ? "Invite code required" : "Our partner link"}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-ink-muted">{card.description}</p>

              <p className="mt-3 rounded-lg border border-signal/25 bg-signal-glow/40 px-3 py-2 text-sm text-ink">
                <span className="font-medium text-signal-dark">Why join:</span> {card.whyJoin}
              </p>

              {card.codeOnly && card.referralCode ? (
                <div className="mt-4 rounded-xl border border-voice/30 bg-voice-glow/40 px-4 py-3">
                  <p className="text-sm font-medium text-ink">
                    Bybit does not provide a tracked card URL. Copy the invite code, open the
                    application, and paste it when prompted (before you submit).
                  </p>
                  <div className="mt-3">
                    <CopyReferralCode code={card.referralCode} label="Bybit Card invite code" />
                  </div>
                </div>
              ) : null}

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Typical offer
                  </dt>
                  <dd className="mt-1 text-ink">{card.typicalOffer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    US / residency
                  </dt>
                  <dd className="mt-1 text-ink">{card.usAvailability}</dd>
                </div>
              </dl>

              <p className="mt-4 rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-ink-muted">
                <span className="font-medium text-ink">Risk check:</span> {card.riskNotes}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={card.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
                >
                  {card.codeOnly ? `Open ${card.name} (then enter code)` : `Open ${card.name}`}
                </a>
                <Link
                  href="/exchanges"
                  className="text-sm font-medium text-voice-dark underline underline-offset-4"
                >
                  Exchange desk
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} Not financial advice. Card terms and eligibility change—
          verify on the official site.
        </p>
      </section>
    </SiteShell>
  );
}
