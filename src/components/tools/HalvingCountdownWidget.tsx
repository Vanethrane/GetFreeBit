"use client";

import { useEffect, useState } from "react";
import {
  CURRENT_SUBSIDY_BTC,
  LAST_HALVING_ISO,
  NEXT_HALVING_BLOCK,
  NEXT_HALVING_ESTIMATE_ISO,
  msUntil,
} from "@/lib/bitcoin-calc";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function HalvingCountdownWidget() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = msUntil(NEXT_HALVING_ESTIMATE_ISO, now);
  const past = ms <= 0;
  const abs = Math.abs(ms);
  const days = Math.floor(abs / 86_400_000);
  const hours = Math.floor((abs % 86_400_000) / 3_600_000);
  const mins = Math.floor((abs % 3_600_000) / 60_000);
  const secs = Math.floor((abs % 60_000) / 1000);

  const countdown = past
    ? "Estimate passed — check live chain height"
    : `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-sm text-amber-950">
        Wall-clock estimate only. Actual timing drifts with block intervals. Not a price forecast.
      </p>

      <div className="rounded-xl border border-paper-line bg-paper-raised px-4 py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Next Bitcoin halving (estimate)
        </p>
        <p className="mt-3 font-display text-3xl tracking-tight text-ink tabular-nums sm:text-4xl">
          {countdown}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          Target ~block {NEXT_HALVING_BLOCK.toLocaleString("en-US")} ·{" "}
          {new Date(NEXT_HALVING_ESTIMATE_ISO).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ResultCard label="Current subsidy" value={`${CURRENT_SUBSIDY_BTC} BTC / block`} />
        <ResultCard
          label="Last halving"
          value={new Date(LAST_HALVING_ISO).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        />
      </div>
    </div>
  );
}
