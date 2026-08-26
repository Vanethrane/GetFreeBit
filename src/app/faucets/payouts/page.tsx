import Link from "next/link";
import type { Metadata } from "next";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { MonetizationTransparencyStrip } from "@/components/ComparisonTransparency";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { getFaucetReferrals } from "@/data/faucet-referrals";
import { referralStatusLabel } from "@/lib/faucet-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { SiteShell } from "@/components/SiteChrome";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "Bitcoin Faucet Payout Database",
    description:
      "Compare published withdrawal minimums, coins, and FaucetPay rails for US-accessible faucets—then read cluster guides before you register.",
    path: "/faucets/payouts",
    keyword: "bitcoin faucet list",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Faucet Payout Database",
    keyword: "bitcoin faucet minimum payout",
  }),
};

export default function FaucetPayoutsPage() {
  const faucets = getFaucetReferrals().filter((f) => f.id !== "faucetpay");

  return (
    <SiteShell>
      <section className="py-12">
        <nav className="text-sm text-ink-muted">
          <Link href="/faucets" className="hover:text-voice-dark">
            Faucets
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link href="/faucets/learn" className="hover:text-voice-dark">
            Bitcoin Faucets
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-ink">Payout database</span>
        </nav>

        <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Database</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              Bitcoin faucet payout database
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Snapshot of withdrawal minimums and payout rails—part of the Bitcoin Faucets cluster.
              Verify every threshold on the live site; operators change rules without notice.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/faucets/learn/faucet-withdrawal-minimums"
                className="rounded-lg border border-paper-line bg-paper-raised px-3 py-2 font-medium text-voice-dark hover:border-voice/40"
              >
                Why minimums matter
              </Link>
              <Link
                href="/faucets/learn/how-faucet-payouts-work"
                className="rounded-lg border border-paper-line bg-paper-raised px-3 py-2 font-medium text-voice-dark hover:border-voice/40"
              >
                How payouts work
              </Link>
              <Link
                href="/faucets/learn/faucet-scams"
                className="rounded-lg border border-paper-line bg-paper-raised px-3 py-2 font-medium text-voice-dark hover:border-voice-dark/40"
              >
                Scam checklist
              </Link>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-paper-line bg-paper-raised shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-ink-muted">
                    <th className="py-3 pl-4 pr-4 font-medium">Platform</th>
                    <th className="py-3 pr-4 font-medium">Min. withdrawal</th>
                    <th className="py-3 pr-4 font-medium">Coins</th>
                    <th className="py-3 pr-4 font-medium">FaucetPay</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Desk</th>
                  </tr>
                </thead>
                <tbody>
                  {faucets.map((faucet) => (
                    <tr key={faucet.id} className="border-b border-paper-line/80">
                      <td className="py-3 pl-4 pr-4 font-medium text-ink">{faucet.name}</td>
                      <td className="py-3 pr-4 text-ink-muted">{faucet.minWithdrawal}</td>
                      <td className="py-3 pr-4 text-ink-muted">{faucet.coins.join(", ")}</td>
                      <td className="py-3 pr-4 text-ink-muted">
                        {faucet.usesFaucetPay ? "Yes" : "Optional / direct"}
                      </td>
                      <td className="py-3 pr-4 text-ink-muted">{referralStatusLabel(faucet)}</td>
                      <td className="py-3 pr-4">
                        <Link
                          href={`/faucets#${faucet.id}`}
                          className="text-voice-dark underline underline-offset-2"
                        >
                          View on desk
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              Before sizing a routine, estimate hourly return in{" "}
              <Link
                href="/faucets/learn/faucet-earning-rates"
                className="text-voice-dark underline underline-offset-2"
              >
                Faucet earning rates
              </Link>{" "}
              and route through{" "}
              <Link
                href="/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts"
                className="text-voice-dark underline underline-offset-2"
              >
                FaucetPay setup
              </Link>{" "}
              when multiple sites pay dust.
            </p>

            <p className="mt-8 text-xs leading-relaxed text-ink-muted">
              {siteConfig.affiliateDisclosure}
            </p>

            <MonetizationTransparencyStrip />
          </div>

          <div className="mt-10 lg:mt-0">
            <TopicClusterNav currentPath="/faucets/payouts" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
