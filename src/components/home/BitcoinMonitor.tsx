"use client";

import { BitcoinChart } from "@/components/home/BitcoinChart";
import { BitcoinConverter } from "@/components/home/BitcoinConverter";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { formatPct, formatSpotPrice } from "@/lib/bitcoin-units";

function statusLabel(status: string): string {
  if (status === "live") return "Live";
  if (status === "polling") return "Updating";
  if (status === "error") return "Reconnect";
  return "Connecting";
}

/**
 * Homepage Bitcoin monitor — chart + live spot + sats/BTC converter.
 * Built to stay open as a desk companion; leave ad slots light around this region.
 */
export function BitcoinMonitor() {
  const { ticker, status, error } = useBitcoinPrice();
  const up = (ticker?.changePercent24h ?? 0) >= 0;

  return (
    <section aria-labelledby="btc-desk-heading" className="btc-monitor">
      <div className="btc-monitor-frame">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-paper-line/80 px-4 py-4 sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-voice-dark">
              Bitcoin desk
            </p>
            <h2 id="btc-desk-heading" className="mt-1 font-display text-2xl tracking-tight text-ink sm:text-3xl">
              Live BTC / USD
            </h2>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl tracking-tight text-ink tabular-nums sm:text-4xl">
              {ticker ? formatSpotPrice(ticker.price) : "—"}
            </p>
            <p className="mt-1 flex flex-wrap items-center justify-end gap-2 text-sm">
              <span
                className={`font-semibold tabular-nums ${
                  up ? "text-signal-dark" : "text-voice-dark"
                }`}
              >
                {ticker ? formatPct(ticker.changePercent24h) : "—"}
                <span className="ml-1 font-normal text-ink-muted">24h</span>
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${
                  status === "live"
                    ? "bg-signal-glow text-signal-dark"
                    : status === "error"
                      ? "bg-voice-glow text-voice-dark"
                      : "bg-paper text-ink-muted"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "live" ? "btc-live-dot bg-signal" : "bg-ink-muted/50"
                  }`}
                  aria-hidden
                />
                {statusLabel(status)}
              </span>
            </p>
            {ticker ? (
              <p className="mt-1 text-xs text-ink-muted tabular-nums">
                24h H {formatSpotPrice(ticker.high24h)} · L {formatSpotPrice(ticker.low24h)}
              </p>
            ) : null}
            {error && status === "error" ? (
              <p className="mt-1 text-xs text-voice-dark">{error}</p>
            ) : null}
          </div>
        </header>

        <BitcoinChart />

        <div className="border-t border-paper-line/80 px-4 py-5 sm:px-5">
          <BitcoinConverter priceUsd={ticker?.price ?? null} />
        </div>

        <p className="border-t border-paper-line/60 px-4 py-3 text-[0.7rem] leading-relaxed text-ink-muted sm:px-5">
          Spot via {ticker?.source ?? "live feed"} · Chart by TradingView. Not financial
          advice—prices can move between updates. Keep this tab open to monitor; converter uses the
          live spot above.
        </p>
      </div>
    </section>
  );
}
