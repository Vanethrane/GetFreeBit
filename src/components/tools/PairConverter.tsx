"use client";

import { useState } from "react";
import {
  btcToSats,
  formatBtcDisplay,
  formatSatsDisplay,
  formatUsd,
  parseAmountInput,
  satsToBtc,
} from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import type { ConverterPair } from "@/data/bitcoin-tools";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

const DEFAULTS: Record<string, string> = {
  "btc-usd": "1",
  "usd-btc": "100",
  "btc-sats": "1",
  "sats-btc": "100000000",
  "sats-usd": "1000",
  "usd-sats": "1",
};

type Props = { pair: ConverterPair };

/** One-direction converter — primary input → primary output only */
export function PairConverter({ pair }: Props) {
  const key = `${pair.from}-${pair.to}`;
  const needsPrice = pair.from === "usd" || pair.to === "usd";
  const { ticker } = useBitcoinPrice();
  const priceUsd = ticker?.price ?? null;
  const [raw, setRaw] = useState(DEFAULTS[key] ?? "1");

  const amount = parseAmountInput(raw);
  let outLabel = "";
  let outValue = "—";
  let secondaryLabel: string | null = null;
  let secondaryValue: string | null = null;

  if (amount != null) {
    if (pair.from === "btc" && pair.to === "usd") {
      outLabel = "USD";
      outValue = priceUsd != null ? formatUsd(amount * priceUsd) : "Loading…";
      secondaryLabel = "Sats";
      secondaryValue = formatSatsDisplay(btcToSats(amount));
    } else if (pair.from === "usd" && pair.to === "btc") {
      outLabel = "BTC";
      if (priceUsd != null && priceUsd > 0) {
        const btc = amount / priceUsd;
        outValue = formatBtcDisplay(btc);
        secondaryLabel = "Sats";
        secondaryValue = formatSatsDisplay(btcToSats(btc));
      } else outValue = "Loading…";
    } else if (pair.from === "btc" && pair.to === "sats") {
      outLabel = "Sats";
      outValue = formatSatsDisplay(btcToSats(amount));
    } else if (pair.from === "sats" && pair.to === "btc") {
      outLabel = "BTC";
      outValue = formatBtcDisplay(satsToBtc(amount));
    } else if (pair.from === "sats" && pair.to === "usd") {
      outLabel = "USD";
      const btc = satsToBtc(amount);
      outValue = priceUsd != null ? formatUsd(btc * priceUsd) : "Loading…";
      secondaryLabel = "BTC";
      secondaryValue = formatBtcDisplay(btc);
    } else if (pair.from === "usd" && pair.to === "sats") {
      outLabel = "Sats";
      if (priceUsd != null && priceUsd > 0) {
        const btc = amount / priceUsd;
        outValue = formatSatsDisplay(btcToSats(btc));
        secondaryLabel = "BTC";
        secondaryValue = formatBtcDisplay(btc);
      } else outValue = "Loading…";
    }
  }

  const fromLabel =
    pair.from === "btc" ? "BTC" : pair.from === "sats" ? "sats" : "USD";

  return (
    <div className="space-y-4">
      {needsPrice ? (
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
      ) : (
        <p className="text-sm text-ink-muted">
          Fixed unit math — 1 BTC = 100,000,000 sats. No price feed required.
        </p>
      )}

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
          From ({fromLabel})
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
            {fromLabel}
          </span>
        </div>
      </label>

      <div className={`grid gap-3 ${secondaryLabel ? "sm:grid-cols-2" : ""}`}>
        <ResultCard label={outLabel || "Result"} value={outValue} />
        {secondaryLabel && secondaryValue != null ? (
          <ResultCard label={secondaryLabel} value={secondaryValue} />
        ) : null}
      </div>
    </div>
  );
}
