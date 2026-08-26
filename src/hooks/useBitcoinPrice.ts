"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type BitcoinTicker = {
  price: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  updatedAt: number;
  source: string;
};

type ConnectionState = "connecting" | "live" | "polling" | "error";

const POLL_MS = 12_000;

type SpotSnapshot = {
  price: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  source: string;
};

async function fetchCoinbase(): Promise<SpotSnapshot> {
  const [tickerRes, statsRes] = await Promise.all([
    fetch("https://api.exchange.coinbase.com/products/BTC-USD/ticker", { cache: "no-store" }),
    fetch("https://api.exchange.coinbase.com/products/BTC-USD/stats", { cache: "no-store" }),
  ]);
  if (!tickerRes.ok) throw new Error(`Coinbase ticker HTTP ${tickerRes.status}`);
  const ticker = (await tickerRes.json()) as { price?: string };
  const price = Number(ticker.price);
  if (!Number.isFinite(price) || price <= 0) throw new Error("Coinbase bad price");

  let open = price;
  let high24h = price;
  let low24h = price;
  if (statsRes.ok) {
    const stats = (await statsRes.json()) as { open?: string; high?: string; low?: string };
    open = Number(stats.open) || price;
    high24h = Number(stats.high) || price;
    low24h = Number(stats.low) || price;
  }
  const changePercent24h = open > 0 ? ((price - open) / open) * 100 : 0;
  return { price, changePercent24h, high24h, low24h, source: "Coinbase" };
}

async function fetchBinanceHost(host: string, symbol: string, label: string): Promise<SpotSnapshot> {
  const res = await fetch(`https://${host}/api/v3/ticker/24hr?symbol=${symbol}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${label} HTTP ${res.status}`);
  const data = (await res.json()) as {
    lastPrice: string;
    priceChangePercent: string;
    highPrice: string;
    lowPrice: string;
  };
  const price = Number(data.lastPrice);
  if (!Number.isFinite(price) || price <= 0) throw new Error(`${label} bad price`);
  return {
    price,
    changePercent24h: Number(data.priceChangePercent) || 0,
    high24h: Number(data.highPrice) || price,
    low24h: Number(data.lowPrice) || price,
    source: label,
  };
}

async function fetchCoinGecko(): Promise<SpotSnapshot> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=false",
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
  const data = (await res.json()) as {
    bitcoin?: { usd?: number; usd_24h_change?: number };
  };
  const price = Number(data.bitcoin?.usd);
  if (!Number.isFinite(price) || price <= 0) throw new Error("CoinGecko bad price");
  const change = Number(data.bitcoin?.usd_24h_change) || 0;
  return {
    price,
    changePercent24h: change,
    high24h: price,
    low24h: price,
    source: "CoinGecko",
  };
}

async function fetchSpot(): Promise<SpotSnapshot> {
  const attempts = [
    () => fetchCoinbase(),
    () => fetchBinanceHost("api.binance.us", "BTCUSD", "Binance.US"),
    () => fetchBinanceHost("api.binance.com", "BTCUSDT", "Binance"),
    () => fetchCoinGecko(),
  ];
  let lastError: unknown;
  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("All price feeds failed");
}

/**
 * Live BTC/USD spot with multi-source REST polling.
 * Prefer Coinbase / Binance.US so US browsers are not stuck on geo-blocked Binance.com.
 */
export function useBitcoinPrice() {
  const [ticker, setTicker] = useState<BitcoinTicker | null>(null);
  const [status, setStatus] = useState<ConnectionState>("connecting");
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const applySpot = useCallback((spot: SpotSnapshot) => {
    setTicker({
      price: spot.price,
      changePercent24h: spot.changePercent24h,
      high24h: spot.high24h,
      low24h: spot.low24h,
      updatedAt: Date.now(),
      source: spot.source,
    });
    setError(null);
    setStatus("live");
  }, []);

  useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      try {
        const spot = await fetchSpot();
        if (!cancelled) applySpot(spot);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Price feed unavailable");
        setStatus((prev) => (prev === "live" ? "polling" : "error"));
      }
    };

    void tick();
    pollRef.current = setInterval(() => void tick(), POLL_MS);

    return () => {
      cancelled = true;
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [applySpot]);

  return { ticker, status, error };
}
