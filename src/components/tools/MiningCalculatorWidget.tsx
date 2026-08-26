"use client";

import { useState } from "react";
import { estimateMiningProfit } from "@/lib/bitcoin-calc";
import {
  formatBtcDisplay,
  formatUsd,
  parseAmountInput,
} from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

export function MiningCalculatorWidget() {
  const { ticker } = useBitcoinPrice();
  const priceUsd = ticker?.price ?? null;
  const [hashrate, setHashrate] = useState("100");
  const [network, setNetwork] = useState("800000000");
  const [watts, setWatts] = useState("3500");
  const [kwh, setKwh] = useState("0.12");
  const [poolFee, setPoolFee] = useState("1");

  const result =
    priceUsd != null
      ? estimateMiningProfit({
          hashrateThs: parseAmountInput(hashrate) ?? 0,
          networkThs: parseAmountInput(network) ?? 0,
          powerWatts: parseAmountInput(watts) ?? 0,
          electricityUsdPerKwh: parseAmountInput(kwh) ?? 0,
          poolFeePercent: parseAmountInput(poolFee) ?? 0,
          priceUsd,
        })
      : null;

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-sm text-amber-950">
        Educational sketch using subsidy share only. Difficulty, downtime, and hardware cost are not
        amortized here.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(
          [
            ["Your hashrate (TH/s)", hashrate, setHashrate],
            ["Network hashrate (TH/s)", network, setNetwork],
            ["Power draw (W)", watts, setWatts],
            ["Electricity ($/kWh)", kwh, setKwh],
            ["Pool fee (%)", poolFee, setPoolFee],
          ] as const
        ).map(([label, value, setter]) => (
          <label key={label} className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {label}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
            />
          </label>
        ))}
      </div>

      <p className="text-sm text-ink-muted">
        {priceUsd != null ? `Spot ${formatUsd(priceUsd)}` : "Loading spot…"}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard
          label="BTC / day"
          value={result ? formatBtcDisplay(result.btcPerDay) : "—"}
        />
        <ResultCard
          label="Gross USD / day"
          value={result ? formatUsd(result.usdPerDayGross) : "—"}
        />
        <ResultCard
          label="Power cost / day"
          value={result ? formatUsd(result.powerCostUsdPerDay) : "—"}
        />
        <ResultCard
          label="Pool fee / day"
          value={result ? formatUsd(result.poolFeeUsdPerDay) : "—"}
        />
        <ResultCard
          label="Net USD / day"
          value={result ? formatUsd(result.usdPerDayNet) : "—"}
        />
        <ResultCard
          label="Break-even $/kWh"
          value={
            result?.breakEvenUsdPerKwh != null
              ? formatUsd(result.breakEvenUsdPerKwh)
              : "—"
          }
        />
      </div>
    </div>
  );
}
