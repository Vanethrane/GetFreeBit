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

type BitcoinConverterProps = {
  priceUsd: number | null;
};

export function BitcoinConverter({ priceUsd }: BitcoinConverterProps) {
  const [unit, setUnit] = useState<BtcUnit>("btc");
  const [raw, setRaw] = useState("1");

  const amount = parseAmountInput(raw);
  const btc = amount == null || priceUsd == null ? null : amountToBtc(amount, unit);
  const usd = btc != null && priceUsd != null ? btc * priceUsd : null;

  const counterpart = useMemo(() => {
    if (btc == null) return null;
    if (unit === "btc") {
      return `${formatSatsDisplay(btcToSats(btc))} sats`;
    }
    return `${formatBtcDisplay(btc)} BTC`;
  }, [btc, unit]);

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
    <div className="btc-converter">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-voice-dark">
            Convert
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Enter an amount in BTC or sats — USD updates with the live spot.
          </p>
        </div>
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

      <label className="mt-4 block">
        <span className="sr-only">Amount in {unit === "btc" ? "bitcoin" : "satoshis"}</span>
        <div className="flex items-stretch overflow-hidden rounded-xl border border-paper-line bg-paper-raised focus-within:border-signal focus-within:ring-2 focus-within:ring-signal/25">
          <input
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={unit === "btc" ? "1.53" : "2032"}
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 font-display text-2xl tracking-tight text-ink outline-none sm:text-3xl"
            aria-describedby="btc-convert-result"
          />
          <span className="flex items-center border-l border-paper-line px-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {unit === "btc" ? "BTC" : "sats"}
          </span>
        </div>
      </label>

      <div id="btc-convert-result" className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-paper-line/80 bg-paper/50 px-4 py-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            USD value
          </p>
          <p className="mt-1 font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
            {usd == null ? "—" : formatUsd(usd)}
          </p>
        </div>
        <div className="rounded-xl border border-paper-line/80 bg-paper/50 px-4 py-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Also equals
          </p>
          <p className="mt-1 font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
            {counterpart ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
