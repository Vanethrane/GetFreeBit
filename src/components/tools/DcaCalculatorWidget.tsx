"use client";

import { useEffect, useState } from "react";
import { projectDca } from "@/lib/bitcoin-calc";
import {
  formatBtcDisplay,
  formatSatsDisplay,
  formatUsd,
  parseAmountInput,
} from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

export function DcaCalculatorWidget() {
  const { ticker } = useBitcoinPrice();
  const livePrice = ticker?.price ?? null;
  const [amountRaw, setAmountRaw] = useState("50");
  const [periodsRaw, setPeriodsRaw] = useState("52");
  const [priceRaw, setPriceRaw] = useState("");

  useEffect(() => {
    if (livePrice != null && !priceRaw) {
      setPriceRaw(String(Math.round(livePrice)));
    }
  }, [livePrice, priceRaw]);

  const amount = parseAmountInput(amountRaw);
  const periods = parseAmountInput(periodsRaw);
  const price = parseAmountInput(priceRaw) ?? livePrice;
  const result =
    amount != null && periods != null && price != null
      ? projectDca({
          amountUsd: amount,
          periods: Math.floor(periods),
          priceUsd: price,
        })
      : null;

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-sm text-amber-950">
        Flat price model for planning only—not historical backtesting or investment advice.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            USD per period
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={amountRaw}
            onChange={(e) => setAmountRaw(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Periods
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={periodsRaw}
            onChange={(e) => setPeriodsRaw(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Assumed BTC price (USD)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={priceRaw}
            onChange={(e) => setPriceRaw(e.target.value)}
            placeholder={livePrice != null ? String(Math.round(livePrice)) : "…"}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard
          label="Total invested"
          value={result ? formatUsd(result.totalInvestedUsd) : "—"}
        />
        <ResultCard
          label="Total BTC"
          value={result ? formatBtcDisplay(result.totalBtc) : "—"}
        />
        <ResultCard
          label="Total sats"
          value={result ? formatSatsDisplay(result.totalSats) : "—"}
        />
        <ResultCard
          label="Avg cost / BTC"
          value={result ? formatUsd(result.avgCostPerBtc) : "—"}
        />
      </div>
    </div>
  );
}
