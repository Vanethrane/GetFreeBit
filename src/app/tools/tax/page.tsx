import Link from "next/link";
import type { Metadata } from "next";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { getTaxToolReferrals } from "@/data/tax-tool-referrals";
import {
  hasPartnerReferralCode,
  partnerReferralStatusLabel,
  partnerSignupHref,
} from "@/lib/partner-referrals";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "Crypto Tax Tools",
    description:
      "Compare Koinly, CoinLedger, and CoinTracking for US crypto tax reports—pricing bands, importers, and reconciliation risks before filing season.",
    path: "/tools/tax",
    keyword: "crypto tax software Koinly CoinLedger USA",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Crypto Tax Tools",
    keyword: "best crypto tax software",
  }),
};

export default function TaxToolsPage() {
  const tools = getTaxToolReferrals();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Tools</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Crypto tax tool desk
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Portfolio importers and report generators for US earners with faucet drips, CEX buys, and
          occasional DeFi. Software helps—reconciliation still matters.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <strong className="font-semibold">Not tax advice:</strong> These tools automate imports and
          form drafts. Complex DeFi, NFTs, or entity structures still need a CPA familiar with
          digital assets.
        </div>

        <ul className="mt-10 space-y-8">
          {tools.map((tool) => (
            <li
              key={tool.id}
              id={tool.id}
              className="scroll-mt-24 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                    {tool.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{tool.name}</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    hasPartnerReferralCode(tool)
                      ? "bg-voice-glow text-voice-dark"
                      : "bg-paper text-ink-muted"
                  }`}
                >
                  {partnerReferralStatusLabel(tool)}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-ink-muted">{tool.description}</p>

              <p className="mt-3 rounded-lg border border-signal/25 bg-signal-glow/40 px-3 py-2 text-sm text-ink">
                <span className="font-medium text-signal-dark">Why join:</span> {tool.whyJoin}
              </p>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Typical partner offer
                  </dt>
                  <dd className="mt-1 text-ink">{tool.typicalOffer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Best for
                  </dt>
                  <dd className="mt-1 text-ink">{tool.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    Pricing
                  </dt>
                  <dd className="mt-1 text-ink">{tool.pricingNotes}</dd>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    US notes
                  </dt>
                  <dd className="mt-1 text-ink">{tool.usAvailability}</dd>
                </div>
              </dl>

              <p className="mt-4 rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-ink-muted">
                <span className="font-medium text-ink">Risk check:</span> {tool.riskNotes}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={partnerSignupHref(tool)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
                >
                  {hasPartnerReferralCode(tool)
                    ? `Start with our ${tool.name} link`
                    : `Visit ${tool.name}`}
                </a>
                <Link
                  href="/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes"
                  className="text-sm font-medium text-voice-dark underline underline-offset-4"
                >
                  Tax prep how-to
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-12 border-t border-paper-line pt-10">
          <h2 className="font-display text-2xl text-ink">Quick comparison</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-ink-muted">
                  <th className="py-3 pr-4 font-medium">Tool</th>
                  <th className="py-3 pr-4 font-medium">Best for</th>
                  <th className="py-3 font-medium">Pricing note</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-b border-paper-line/80">
                    <td className="py-3 pr-4 font-medium text-ink">
                      <a href={`#${tool.id}`} className="hover:text-voice-dark">
                        {tool.name}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{tool.bestFor}</td>
                    <td className="py-3 text-ink-muted">{tool.pricingNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-paper-line bg-voice-glow/30 p-5">
          <h2 className="font-display text-xl text-ink">Filing season workflow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            <li>Export CSVs from every CEX and note wallet addresses used for airdrops or faucets.</li>
            <li>Import into one tool—avoid double-counting transfers between your own wallets.</li>
            <li>
              Spot-check large disposals against explorers; then follow{" "}
              <Link
                href="/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes"
                className="text-voice-dark underline underline-offset-2"
              >
                our tax prep how-to
              </Link>
              .
            </li>
            <li>
              Keep exchange onboarding limited—see the{" "}
              <Link href="/exchanges" className="text-voice-dark underline underline-offset-2">
                exchange desk
              </Link>{" "}
              if you still need a primary US venue.
            </li>
          </ol>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} Not tax, legal, or investment advice.
        </p>
      </section>
    </SiteShell>
  );
}
