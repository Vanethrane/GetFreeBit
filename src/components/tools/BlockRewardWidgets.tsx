"use client";

import { useState } from "react";
import {
  APPROX_CIRCULATING_BTC,
  BLOCK_SUBSIDY_BY_ERA,
  CURRENT_ERA,
  CURRENT_SUBSIDY_BTC,
  MAX_SUPPLY_BTC,
  annualIssuanceBtc,
  inflationRatePercent,
  subsidyForEra,
} from "@/lib/bitcoin-calc";
import { formatBtcDisplay, formatPct, formatUsd, parseAmountInput } from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

export function BlockRewardWidget() {
  const { ticker } = useBitcoinPrice();
  const priceUsd = ticker?.price ?? null;
  const [era, setEra] = useState(String(CURRENT_ERA));
  const eraNum = Math.max(0, Math.floor(parseAmountInput(era) ?? CURRENT_ERA));
  const subsidy = subsidyForEra(eraNum);
  const annual = annualIssuanceBtc(subsidy);
  const usdBlock = priceUsd != null ? subsidy * priceUsd : null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        Current era {CURRENT_ERA}: {CURRENT_SUBSIDY_BTC} BTC subsidy. Max supply{" "}
        {MAX_SUPPLY_BTC.toLocaleString("en-US")} BTC.
      </p>

      <label className="block max-w-xs">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Subsidy era (0 = 50 BTC)
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={era}
          onChange={(e) => setEra(e.target.value)}
          className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="py-2 pr-4 font-medium">Era</th>
              <th className="py-2 font-medium">Subsidy (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {BLOCK_SUBSIDY_BY_ERA.map((s, i) => (
              <tr
                key={i}
                className={`border-b border-paper-line/80 ${i === eraNum ? "bg-signal-glow/40" : ""}`}
              >
                <td className="py-2 pr-4 text-ink">{i}</td>
                <td className="py-2 text-ink">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ResultCard label="Subsidy / block" value={`${formatBtcDisplay(subsidy)} BTC`} />
        <ResultCard label="≈ Annual issuance" value={`${formatBtcDisplay(annual)} BTC`} />
        <ResultCard
          label="Subsidy USD"
          value={usdBlock != null ? formatUsd(usdBlock) : priceUsd == null ? "Loading…" : "—"}
        />
      </div>
    </div>
  );
}

export function InflationCalculatorWidget() {
  const [subsidyRaw, setSubsidyRaw] = useState(String(CURRENT_SUBSIDY_BTC));
  const [circRaw, setCircRaw] = useState(String(APPROX_CIRCULATING_BTC));

  const subsidy = parseAmountInput(subsidyRaw);
  const circ = parseAmountInput(circRaw);
  const rate =
    subsidy != null && circ != null ? inflationRatePercent(subsidy, circ) : null;
  const annual = subsidy != null ? annualIssuanceBtc(subsidy) : null;

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-sm text-amber-950">
        Supply issuance rate only—not CPI and not a price prediction. Circulating supply is
        approximate.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Block subsidy (BTC)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={subsidyRaw}
            onChange={(e) => setSubsidyRaw(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Circulating supply (BTC)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={circRaw}
            onChange={(e) => setCircRaw(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ResultCard
          label="Annual issuance"
          value={annual != null ? `${formatBtcDisplay(annual)} BTC` : "—"}
        />
        <ResultCard
          label="Issuance rate"
          value={rate != null ? formatPct(rate).replace("+", "") : "—"}
        />
      </div>
    </div>
  );
}
