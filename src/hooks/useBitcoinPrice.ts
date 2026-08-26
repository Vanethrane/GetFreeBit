"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type BitcoinTicker = {
  price: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  updatedAt: number;
};

type ConnectionState = "connecting" | "live" | "polling" | "error";

const REST_URL = "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT";
const WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@ticker";
const POLL_MS = 15_000;

async function fetchTicker(): Promise<BitcoinTicker> {
  const res = await fetch(REST_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Ticker HTTP ${res.status}`);
  const data = (await res.json()) as {
    lastPrice: string;
    priceChangePercent: string;
    highPrice: string;
    lowPrice: string;
  };
  return {
    price: Number(data.lastPrice),
    changePercent24h: Number(data.priceChangePercent),
    high24h: Number(data.highPrice),
    low24h: Number(data.lowPrice),
    updatedAt: Date.now(),
  };
}

/**
 * Live BTC/USDT spot via Binance WebSocket, with REST fallback polling.
 * Client-only — safe for static Cloudflare Pages export.
 */
export function useBitcoinPrice() {
  const [ticker, setTicker] = useState<BitcoinTicker | null>(null);
  const [status, setStatus] = useState<ConnectionState>("connecting");
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const applyTicker = useCallback((next: BitcoinTicker) => {
    setTicker(next);
    setError(null);
  }, []);

  const startPolling = useCallback(() => {
    if (pollRef.current) return;
    setStatus("polling");
    const tick = async () => {
      try {
        applyTicker(await fetchTicker());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Price feed unavailable");
        setStatus("error");
      }
    };
    void tick();
    pollRef.current = setInterval(() => void tick(), POLL_MS);
  }, [applyTicker]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const initial = await fetchTicker();
        if (!cancelled) applyTicker(initial);
      } catch {
        /* WS / poll may still recover */
      }
    })();

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (cancelled) return;
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
        setStatus("live");
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(String(event.data)) as {
            c?: string;
            P?: string;
            h?: string;
            l?: string;
          };
          const price = Number(msg.c);
          if (!Number.isFinite(price)) return;
          applyTicker({
            price,
            changePercent24h: Number(msg.P) || 0,
            high24h: Number(msg.h) || 0,
            low24h: Number(msg.l) || 0,
            updatedAt: Date.now(),
          });
          setStatus("live");
        } catch {
          /* ignore malformed frames */
        }
      };

      ws.onerror = () => {
        ws.close();
      };

      ws.onclose = () => {
        if (cancelled) return;
        wsRef.current = null;
        startPolling();
      };
    } catch {
      startPolling();
    }

    return () => {
      cancelled = true;
      wsRef.current?.close();
      wsRef.current = null;
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [applyTicker, startPolling]);

  return { ticker, status, error };
}
