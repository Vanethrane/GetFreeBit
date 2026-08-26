/** Bitcoin unit helpers — 1 BTC = 100_000_000 sats */

export const SATS_PER_BTC = 100_000_000;

export type BtcUnit = "btc" | "sats";

export function btcToSats(btc: number): number {
  return Math.round(btc * SATS_PER_BTC);
}

export function satsToBtc(sats: number): number {
  return sats / SATS_PER_BTC;
}

/** Parse user input; empty / invalid → null */
export function parseAmountInput(raw: string): number | null {
  const cleaned = raw.replace(/,/g, "").trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export function amountToBtc(amount: number, unit: BtcUnit): number {
  return unit === "sats" ? satsToBtc(amount) : amount;
}

export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1000 ? 2 : value >= 1 ? 2 : 4,
  }).format(value);
}

export function formatSpotPrice(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(change: number): string {
  if (!Number.isFinite(change)) return "—";
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

export function formatBtcDisplay(btc: number): string {
  if (!Number.isFinite(btc)) return "—";
  if (btc === 0) return "0";
  if (btc >= 1) return btc.toFixed(8).replace(/\.?0+$/, "");
  return btc.toFixed(8).replace(/0+$/, "").replace(/\.$/, "") || "0";
}

export function formatSatsDisplay(sats: number): string {
  if (!Number.isFinite(sats)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(sats));
}
