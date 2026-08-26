"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: Record<string, unknown>) => unknown;
    };
  }
}

type BitcoinChartProps = {
  className?: string;
};

/**
 * TradingView advanced chart for BTC — designed for “leave this tab open” monitoring.
 * Uses a stable container id + remount-safe boot so React Strict Mode does not leave
 * an empty chart shell.
 */
export function BitcoinChart({ className = "" }: BitcoinChartProps) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `gfb-btc-tv-chart-${reactId}`;
  const booted = useRef(false);

  useEffect(() => {
    let cancelled = false;
    booted.current = false;

    const container = document.getElementById(containerId);
    if (!container) return;

    const boot = () => {
      if (cancelled || !window.TradingView || booted.current) return;
      const host = document.getElementById(containerId);
      if (!host) return;
      booted.current = true;
      host.innerHTML = "";
      // eslint-disable-next-line no-new
      new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "60",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f8fafc",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        calendar: false,
        hide_volume: false,
        support_host: "https://www.tradingview.com",
        container_id: containerId,
        studies: ["STD;SMA"],
        backgroundColor: "rgba(248, 250, 252, 1)",
        gridColor: "rgba(197, 208, 220, 0.45)",
      });
    };

    if (window.TradingView) {
      boot();
      return () => {
        cancelled = true;
        booted.current = false;
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-gfb-tradingview="1"]',
    );
    if (existing) {
      existing.addEventListener("load", boot);
      if (window.TradingView) boot();
      return () => {
        cancelled = true;
        booted.current = false;
        existing.removeEventListener("load", boot);
      };
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.dataset.gfbTradingview = "1";
    script.onload = boot;
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      booted.current = false;
    };
  }, [containerId]);

  return (
    <div className={`btc-chart-shell ${className}`}>
      <div id={containerId} className="btc-chart-host" />
    </div>
  );
}
