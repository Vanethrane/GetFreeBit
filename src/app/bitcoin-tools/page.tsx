import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteChrome";
import {
  BITCOIN_TOOLS_HUB,
  listBitcoinTools,
  type BitcoinToolDef,
  type BitcoinToolKind,
} from "@/data/bitcoin-tools";
import { buildHubMetadata } from "@/lib/site-metadata";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: BITCOIN_TOOLS_HUB.title,
    description: BITCOIN_TOOLS_HUB.metaDescription,
    path: BITCOIN_TOOLS_HUB.path,
    keyword: "bitcoin calculator",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: BITCOIN_TOOLS_HUB.title,
    keyword: "bitcoin calculators",
  }),
};

const GROUP_ORDER: { id: string; label: string; kinds: BitcoinToolKind[] }[] = [
  {
    id: "converters",
    label: "Converters",
    kinds: ["converter-multi", "converter-pair"],
  },
  {
    id: "planning",
    label: "Planning & PnL",
    kinds: ["dca", "profit", "fee"],
  },
  {
    id: "network",
    label: "Network & supply",
    kinds: ["halving", "mining", "block-reward", "inflation"],
  },
];

function groupTools(tools: BitcoinToolDef[]) {
  return GROUP_ORDER.map((group) => ({
    ...group,
    tools: tools.filter((t) => group.kinds.includes(t.kind)),
  })).filter((g) => g.tools.length > 0);
}

export default function BitcoinToolsHubPage() {
  const groups = groupTools(listBitcoinTools());

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Tools</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {BITCOIN_TOOLS_HUB.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {BITCOIN_TOOLS_HUB.lede}
        </p>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          Live USD legs use public spot feeds. Network tools use transparent assumptions—not
          investment advice. Each tool page lists{" "}
          <strong className="font-semibold">Source</strong> (primary docs) and{" "}
          <strong className="font-semibold">GetFreeBit analysis</strong> (calculator assumptions)
          separately.
        </div>

        {groups.map((group) => (
          <section key={group.id} className="mt-12">
            <h2 className="font-display text-2xl tracking-tight text-ink">{group.label}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {group.tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.path}
                    className="block h-full rounded-2xl border border-paper-line bg-paper-raised p-5 shadow-sm transition hover:border-signal/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-voice-dark">
                      {tool.primaryKeyword}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink">{tool.h1}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tool.lede}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-12 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </section>
    </SiteShell>
  );
}
