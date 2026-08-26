"use client";

import { useState } from "react";
import {
  TX_TEMPLATES,
  feeBtc,
  feeSats,
  feeUsd,
  type TxTemplateId,
} from "@/lib/bitcoin-calc";
import { formatBtcDisplay, formatSatsDisplay, formatUsd } from "@/lib/bitcoin-units";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { ResultCard } from "@/components/tools/MultiUnitConverter";

export function FeeCalculatorWidget() {
  const { ticker } = useBitcoinPrice();
  const priceUsd = ticker?.price ?? null;
  const [rate, setRate] = useState("12");
  const [template, setTemplate] = useState<TxTemplateId>("simple");

  const satsPerVbyte = Number(rate);
  const tpl = TX_TEMPLATES[template];
  const valid = Number.isFinite(satsPerVbyte) && satsPerVbyte >= 0;
  const sats = valid ? feeSats(satsPerVbyte, tpl.vbytes) : null;
  const btc = valid ? feeBtc(satsPerVbyte, tpl.vbytes) : null;
  const usd =
    valid && priceUsd != null ? feeUsd(satsPerVbyte, tpl.vbytes, priceUsd) : null;

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-sm text-amber-950">
        Enter the sats/vB you see on a mempool explorer. Templates approximate size—your wallet may
        differ.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Fee rate (sats/vB)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 font-display text-xl text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Transaction template
          </span>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as TxTemplateId)}
            className="w-full rounded-xl border border-paper-line bg-paper-raised px-4 py-3 text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/25"
          >
            {(Object.keys(TX_TEMPLATES) as TxTemplateId[]).map((id) => (
              <option key={id} value={id}>
                {TX_TEMPLATES[id].label} (~{TX_TEMPLATES[id].vbytes} vB)
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-ink-muted">{tpl.blurb}</p>

      <div className="grid gap-3 sm:grid-cols-3">
        <ResultCard label="Fee (sats)" value={sats != null ? formatSatsDisplay(sats) : "—"} />
        <ResultCard label="Fee (BTC)" value={btc != null ? formatBtcDisplay(btc) : "—"} />
        <ResultCard
          label="Fee (USD)"
          value={
            usd != null ? formatUsd(usd) : priceUsd == null && valid ? "Loading…" : "—"
          }
        />
      </div>
    </div>
  );
}
