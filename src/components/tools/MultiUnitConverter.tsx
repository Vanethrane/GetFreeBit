"use client";

import { useMemo, useState } from "react";
import {
  amountToBtc,
  btcToSats,
  formatBtcDisplay,
  formatSatsDisplay,
  formatUsd,
  parseAmountInput,
  type BtcUnit,
} from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";

export function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-paper-line/80 bg-paper/50 px-4 py-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

type MultiConverterProps = {
  defaultUnit?: BtcUnit;
};

/** BTC ↔ sats with live USD — used by bitcoin-calculator & satoshi-calculator */
export function MultiUnitConverter({ defaultUnit = "btc" }: MultiConverterProps) {
  const { ticker } = useBitcoinPrice();
  const priceUsd = ticker?.price ?? null;
  const [unit, setUnit] = useState<BtcUnit>(defaultUnit);
  const [raw, setRaw] = useState(defaultUnit === "sats" ? "100000" : "1");

  const amount = parseAmountInput(raw);
  const btc = amount == null ? null : amountToBtc(amount, unit);
  const usd = btc != null && priceUsd != null ? btc * priceUsd : null;
  const otherUnit: BtcUnit = unit === "btc" ? "sats" : "btc";

  const counterpart = useMemo(() => {
    if (btc == null) return null;
    if (otherUnit === "sats") {
      return formatSatsDisplay(btcToSats(btc));
    }
    return formatBtcDisplay(btc);
  }, [btc, otherUnit]);

  function switchUnit(next: BtcUnit) {
    if (next === unit) return;
    const parsed = parseAmountInput(raw);
    if (parsed != null && Number.isFinite(parsed)) {
      if (next === "sats" && unit === "btc") {
        setRaw(String(btcToSats(parsed)));
      } else if (next === "btc" && unit === "sats") {
        setRaw(formatBtcDisplay(amountToBtc(parsed, "sats")));
      }
    }
    setUnit(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {priceUsd != null ? (
            <>
              Spot {formatUsd(priceUsd)}
              {ticker?.source ? ` · ${ticker.source}` : null}
            </>
          ) : (
            "Loading spot…"
          )}
        </p>
        <div
          className="inline-flex rounded-lg border border-paper-line bg-paper-raised p-0.5"
          role="group"
          aria-label="Amount unit"
        >
          <button
            type="button"
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              unit === "btc" ? "bg-signal text-paper-raised" : "text-ink-muted hover:text-ink"
            }`}
            onClick={() => switchUnit("btc")}
            aria-pressed={unit === "btc"}
          >
            BTC
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              unit === "sats" ? "bg-signal text-paper-raised" : "text-ink-muted hover:text-ink"
            }`}
            onClick={() => switchUnit("sats")}
            aria-pressed={unit === "sats"}
          >
            Sats
          </button>
        </div>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Amount ({unit === "btc" ? "BTC" : "sats"})
        </span>
        <div className="flex items-stretch overflow-hidden rounded-xl border border-paper-line bg-paper-raised focus-within:border-signal focus-within:ring-2 focus-within:ring-signal/25">
          <input
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 font-display text-2xl tracking-tight text-ink outline-none sm:text-3xl"
          />
          <span className="flex items-center border-l border-paper-line px-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {unit === "btc" ? "BTC" : "sats"}
          </span>
        </div>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <ResultCard
          label="USD value"
          value={usd == null ? (priceUsd == null ? "Loading…" : "—") : formatUsd(usd)}
        />
        <ResultCard
          label={otherUnit === "btc" ? "BTC" : "Sats"}
          value={counterpart ?? "—"}
        />
      </div>
    </div>
  );
}
