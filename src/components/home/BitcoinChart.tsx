"use client";

import { useEffect, useRef } from "react";

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

const CONTAINER_ID = "gfb-btc-tv-chart";

/**
 * TradingView advanced chart for BTC — designed for “leave this tab open” monitoring.
 */
export function BitcoinChart({ className = "" }: BitcoinChartProps) {
  const booted = useRef(false);

  useEffect(() => {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    const boot = () => {
      if (!window.TradingView || booted.current) return;
      booted.current = true;
      container.innerHTML = "";
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
        container_id: CONTAINER_ID,
        studies: ["STD;SMA"],
        backgroundColor: "rgba(248, 250, 252, 1)",
        gridColor: "rgba(197, 208, 220, 0.45)",
      });
    };

    if (window.TradingView) {
      boot();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-gfb-tradingview="1"]',
    );
    if (existing) {
      existing.addEventListener("load", boot);
      return () => existing.removeEventListener("load", boot);
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.dataset.gfbTradingview = "1";
    script.onload = boot;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={`btc-chart-shell ${className}`}>
      <div id={CONTAINER_ID} className="btc-chart-host" />
    </div>
  );
}
