import Link from "next/link";
import type { Metadata } from "next";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { getFaucetReferrals } from "@/data/faucet-referrals";
import {
  faucetSignupCta,
  faucetSignupHref,
  isFaucetLive,
  referralStatusLabel,
} from "@/lib/faucet-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "US Crypto Faucet Referrals",
    description:
      "Compare US-accessible crypto faucets and micro-earning platforms—withdrawal minimums, FaucetPay routing, referral commissions, and risk notes before you register.",
    path: "/faucets",
    keyword: "crypto faucet referrals USA FaucetPay",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Faucet Referrals",
    keyword: "best crypto faucets USA",
  }),
};

export default function FaucetsPage() {
  const faucets = getFaucetReferrals();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Earn</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Faucet referral desk
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Legitimate micro-earning platforms that accept US users and pay lifetime referral
          commissions. We list mechanics and risks first—register only when the time-vs-reward
          math makes sense for you.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink">
          Original research (not a “best faucets” ranking):{" "}
          <Link
            href="/indexes/bitcoin-faucet-payout"
            className="font-medium text-voice-dark underline underline-offset-2"
          >
            Bitcoin Faucet Payout Index — August 2026
          </Link>
          . Sourced withdrawal floors, fees, and status — unverified cells stay blank rather than
          invented.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <strong className="font-semibold">US availability:</strong> Every platform below is
          commonly used by American earners without a site-wide geo-block. Individual surveys,
          gift cards, or offerwall tasks may still restrict by state or IP—treat those as bonus
          inventory, not guaranteed income.
        </div>

        <ul className="mt-10 space-y-8">
          {faucets.map((faucet) => (
            <li
              key={faucet.id}
              id={faucet.id}
              className="scroll-mt-24 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                    {faucet.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{faucet.name}</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isFaucetLive(faucet)
                      ? "bg-voice-glow text-voice-dark"
                      : "bg-paper text-ink-muted"
                  }`}
                >
                  {referralStatusLabel(faucet)}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-ink-muted">{faucet.description}</p>

              <p className="mt-3 rounded-lg border border-signal/25 bg-signal-glow/40 px-3 py-2 text-sm text-ink">
                <span className="font-medium text-signal-dark">Why join:</span> {faucet.whyJoin}
              </p>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Referral commission
                  </dt>
                  <dd className="mt-1 text-ink">{faucet.referralCommission}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Coins
                  </dt>
                  <dd className="mt-1 text-ink">{faucet.coins.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Min. withdrawal
                  </dt>
                  <dd className="mt-1 text-ink">{faucet.minWithdrawal}</dd>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    US notes
                  </dt>
                  <dd className="mt-1 text-ink">{faucet.usAvailability}</dd>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Payout path
                  </dt>
                  <dd className="mt-1 text-ink">
                    {faucet.payoutNotes}
                    {faucet.usesFaucetPay ? (
                      <>
                        {" "}
                        — pairs well with{" "}
                        <Link href="#faucetpay" className="text-voice-dark underline underline-offset-2">
                          FaucetPay
                        </Link>{" "}
                        routing.
                      </>
                    ) : null}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-ink-muted">
                <span className="font-medium text-ink">Risk check:</span> {faucet.riskNotes}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={faucetSignupHref(faucet)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
                >
                  {faucetSignupCta(faucet.name, isFaucetLive(faucet))}
                </a>
                <Link
                  href="/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds"
                  className="text-sm font-medium text-voice-dark underline underline-offset-4"
                >
                  Withdrawal checklist
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-12 border-t border-paper-line pt-10">
          <h2 className="font-display text-2xl text-ink">Quick comparison</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Snapshot for planning—not live APY promises. For sourced BTC withdrawal floors and
            fees, use the{" "}
            <Link href="/indexes/bitcoin-faucet-payout" className="text-voice-dark underline underline-offset-2">
              Bitcoin Faucet Payout Index — August 2026
            </Link>
            .
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-ink-muted">
                  <th className="py-3 pr-4 font-medium">Platform</th>
                  <th className="py-3 pr-4 font-medium">Referral</th>
                  <th className="py-3 pr-4 font-medium">Coins</th>
                  <th className="py-3 pr-4 font-medium">FaucetPay rail</th>
                  <th className="py-3 font-medium">US</th>
                </tr>
              </thead>
              <tbody>
                {faucets.map((faucet) => (
                  <tr key={faucet.id} className="border-b border-paper-line/80">
                    <td className="py-3 pr-4 font-medium text-ink">
                      <a href={`#${faucet.id}`} className="hover:text-voice-dark">
                        {faucet.name}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{faucet.referralCommission}</td>
                    <td className="py-3 pr-4 text-ink-muted">{faucet.coins.slice(0, 4).join(", ")}</td>
                    <td className="py-3 pr-4 text-ink-muted">
                      {faucet.usesFaucetPay ? "Yes" : "Optional / direct"}
                    </td>
                    <td className="py-3 text-ink-muted">Listed for US earners</td>
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
              Open a{" "}
              <Link href="/how-to/how-to-create-your-first-self-custody-crypto-wallet" className="text-voice-dark underline underline-offset-2">
                self-custody wallet
              </Link>{" "}
              for long-term storage—not your daily faucet login.
            </li>
            <li>
              Register on{" "}
              <Link href="#faucetpay" className="text-voice-dark underline underline-offset-2">
                FaucetPay
              </Link>{" "}
              first if you plan to run multiple faucets; route drips before paying on-chain fees.
            </li>
            <li>Claim on a schedule you can sustain—hourly rolls add up to real hours fast.</li>
            <li>
              Sweep to self-custody with a{" "}
              <Link href="/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds" className="text-voice-dark underline underline-offset-2">
                test amount
              </Link>{" "}
              before moving size.
            </li>
          </ol>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} Additional platforms appear here as partner links are
          approved. Always confirm you are on the official domain—phishing clones target faucet
          users aggressively.
        </p>
      </section>
    </SiteShell>
  );
}
