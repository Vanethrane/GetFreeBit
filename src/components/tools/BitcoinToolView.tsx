import Link from "next/link";
import type { BitcoinToolDef } from "@/data/bitcoin-tools";
import { getRelatedBitcoinTools } from "@/data/bitcoin-tools";
import { SourceAttribution } from "@/components/SourceAttribution";
import { SiteShell } from "@/components/SiteChrome";
import { MultiUnitConverter } from "@/components/tools/MultiUnitConverter";
import { PairConverter } from "@/components/tools/PairConverter";
import { FeeCalculatorWidget } from "@/components/tools/FeeCalculatorWidget";
import { DcaCalculatorWidget } from "@/components/tools/DcaCalculatorWidget";
import { HalvingCountdownWidget } from "@/components/tools/HalvingCountdownWidget";
import { MiningCalculatorWidget } from "@/components/tools/MiningCalculatorWidget";
import {
  BlockRewardWidget,
  InflationCalculatorWidget,
} from "@/components/tools/BlockRewardWidgets";
import { ProfitCalculatorWidget } from "@/components/tools/ProfitCalculatorWidget";
import { siteConfig } from "@/site.config";

function ToolWidget({ tool }: { tool: BitcoinToolDef }) {
  switch (tool.kind) {
    case "converter-multi":
      return <MultiUnitConverter defaultUnit={tool.defaultUnit ?? "btc"} />;
    case "converter-pair":
      return tool.pair ? <PairConverter pair={tool.pair} /> : null;
    case "fee":
      return <FeeCalculatorWidget />;
    case "dca":
      return <DcaCalculatorWidget />;
    case "halving":
      return <HalvingCountdownWidget />;
    case "mining":
      return <MiningCalculatorWidget />;
    case "block-reward":
      return <BlockRewardWidget />;
    case "inflation":
      return <InflationCalculatorWidget />;
    case "profit":
      return <ProfitCalculatorWidget />;
    default:
      return null;
  }
}

type Props = { tool: BitcoinToolDef };

export function BitcoinToolView({ tool }: Props) {
  const related = getRelatedBitcoinTools(tool.slug, 4);

  return (
    <SiteShell>
      <article className="py-12">
        <nav className="text-sm text-ink-muted">
          <Link href="/bitcoin-tools" className="hover:text-voice-dark">
            Bitcoin tools
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-ink">{tool.h1}</span>
        </nav>

        <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-voice">
          Calculator
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {tool.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{tool.lede}</p>

        <div className="mt-8 rounded-2xl border border-paper-line bg-paper-raised p-5 shadow-sm sm:p-6">
          <ToolWidget tool={tool} />
        </div>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm leading-relaxed text-amber-950">
          Educational estimates only—not financial, tax, or investment advice. Spot prices and
          network conditions change.
        </div>

        {tool.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-2xl tracking-tight text-ink">{section.heading}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">{section.body}</p>
          </section>
        ))}

        {tool.sources && tool.sources.length > 0 ? (
          <SourceAttribution blocks={tool.sources} />
        ) : null}

        <section className="mt-10">
          <h2 className="font-display text-2xl tracking-tight text-ink">Examples</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            {tool.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl tracking-tight text-ink">FAQ</h2>
          <dl className="mt-4 space-y-5">
            {tool.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-ink">{faq.question}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 ? (
          <section className="mt-12 border-t border-paper-line pt-10">
            <h2 className="font-display text-2xl tracking-tight text-ink">Related tools</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.path}
                    className="block rounded-xl border border-paper-line bg-paper-raised px-4 py-3 hover:border-signal/40"
                  >
                    <span className="font-display text-lg text-ink">{r.h1}</span>
                    <span className="mt-1 block text-sm text-ink-muted line-clamp-2">
                      {r.lede}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} Not financial advice.
        </p>
      </article>
    </SiteShell>
  );
}
