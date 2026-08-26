"use client";

import { useState } from "react";
import { simpleBtcProfit } from "@/lib/bitcoin-calc";
import { formatBtcDisplay, formatPct, formatUsd, parseAmountInput } from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

export function ProfitCalculatorWidget() {
  const { ticker } = useBitcoinPrice();
  const priceUsd = ticker?.price ?? null;
  const [btcRaw, setBtcRaw] = useState("0.1");
  const [costRaw, setCostRaw] = useState("4000");

  const btc = parseAmountInput(btcRaw);
  const cost = parseAmountInput(costRaw);
  const result =
    btc != null && cost != null && priceUsd != null
      ? simpleBtcProfit({ btc, costBasisUsd: cost, priceUsd })
      : null;

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-sm text-amber-950">
        Unrealized mark-to-market only — not tax advice. Use cost-basis software for lots and forms.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            BTC held
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={btcRaw}
            onChange={(e) => setBtcRaw(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Total cost basis (USD)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={costRaw}
            onChange={(e) => setCostRaw(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
      </div>

      <p className="text-sm text-ink-muted">
        {priceUsd != null ? `Spot ${formatUsd(priceUsd)}` : "Loading spot…"}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard
          label="Holdings"
          value={result ? formatBtcDisplay(result.btc) : "—"}
        />
        <ResultCard label="Value" value={result ? formatUsd(result.valueUsd) : "—"} />
        <ResultCard label="PnL (USD)" value={result ? formatUsd(result.pnlUsd) : "—"} />
        <ResultCard
          label="PnL %"
          value={result ? formatPct(result.pnlPercent) : "—"}
        />
      </div>
    </div>
  );
}
