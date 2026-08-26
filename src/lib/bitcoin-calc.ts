/** Pure Bitcoin calculator math — shared by tool pages (no React). */

import { SATS_PER_BTC, btcToSats, satsToBtc } from "@/lib/bitcoin-units";

export { SATS_PER_BTC, btcToSats, satsToBtc };

export const BTC_BLOCK_TIME_SEC = 600;
export const HALVING_INTERVAL_BLOCKS = 210_000;
export const MAX_SUPPLY_BTC = 21_000_000;

export const BLOCK_SUBSIDY_BY_ERA: readonly number[] = [
  50, 25, 12.5, 6.25, 3.125, 1.5625, 0.78125, 0.390625,
];

export const CURRENT_ERA = 4;
export const CURRENT_SUBSIDY_BTC = BLOCK_SUBSIDY_BY_ERA[CURRENT_ERA]!;
export const NEXT_HALVING_ESTIMATE_ISO = "2028-04-17T00:00:00.000Z";
export const NEXT_HALVING_BLOCK = 1_050_000;
export const LAST_HALVING_ISO = "2024-04-20T00:00:00.000Z";
export const APPROX_CIRCULATING_BTC = 19_900_000;

export type TxTemplateId = "simple" | "segwit2in2out" | "exchange_withdraw" | "consolidation";

export const TX_TEMPLATES: Record<
  TxTemplateId,
  { label: string; vbytes: number; blurb: string }
> = {
  simple: {
    label: "Simple send (1→1)",
    vbytes: 140,
    blurb: "Typical native SegWit payment from one input to one output plus change.",
  },
  segwit2in2out: {
    label: "2 inputs → 2 outputs",
    vbytes: 220,
    blurb: "Common when spending multiple UTXOs or sending with change.",
  },
  exchange_withdraw: {
    label: "Exchange-style withdraw",
    vbytes: 180,
    blurb: "Approximate single-user withdrawal size—actual exchange batches differ.",
  },
  consolidation: {
    label: "UTXO consolidation",
    vbytes: 450,
    blurb: "Sweeping many small faucet outputs into one UTXO—fees add up.",
  },
};

export function feeSats(satsPerVbyte: number, vbytes: number): number {
  return Math.round(Math.max(0, satsPerVbyte) * Math.max(0, vbytes));
}

export function feeBtc(satsPerVbyte: number, vbytes: number): number {
  return satsToBtc(feeSats(satsPerVbyte, vbytes));
}

export function feeUsd(satsPerVbyte: number, vbytes: number, btcUsd: number): number {
  return feeBtc(satsPerVbyte, vbytes) * btcUsd;
}

export type DcaResult = {
  periods: number;
  totalInvestedUsd: number;
  totalBtc: number;
  totalSats: number;
  avgCostPerBtc: number;
};

export function projectDca(input: {
  amountUsd: number;
  periods: number;
  priceUsd: number;
}): DcaResult | null {
  const { amountUsd, periods, priceUsd } = input;
  if (!(amountUsd > 0) || !(periods > 0) || !(priceUsd > 0)) return null;
  const totalInvestedUsd = amountUsd * periods;
  const totalBtc = totalInvestedUsd / priceUsd;
  return {
    periods,
    totalInvestedUsd,
    totalBtc,
    totalSats: btcToSats(totalBtc),
    avgCostPerBtc: priceUsd,
  };
}

export type MiningResult = {
  btcPerDay: number;
  usdPerDayGross: number;
  powerCostUsdPerDay: number;
  poolFeeUsdPerDay: number;
  usdPerDayNet: number;
  breakEvenUsdPerKwh: number | null;
};

export function estimateMiningProfit(input: {
  hashrateThs: number;
  networkThs: number;
  powerWatts: number;
  electricityUsdPerKwh: number;
  poolFeePercent: number;
  priceUsd: number;
  subsidyBtc?: number;
}): MiningResult | null {
  const {
    hashrateThs,
    networkThs,
    powerWatts,
    electricityUsdPerKwh,
    poolFeePercent,
    priceUsd,
    subsidyBtc = CURRENT_SUBSIDY_BTC,
  } = input;
  if (!(hashrateThs > 0) || !(networkThs > 0) || !(priceUsd > 0)) return null;

  const blocksPerDay = (24 * 60 * 60) / BTC_BLOCK_TIME_SEC;
  const networkBtcPerDay = blocksPerDay * subsidyBtc;
  const share = hashrateThs / networkThs;
  const btcPerDay = networkBtcPerDay * share;
  const usdPerDayGross = btcPerDay * priceUsd;
  const kwhPerDay = (powerWatts / 1000) * 24;
  const powerCostUsdPerDay = kwhPerDay * Math.max(0, electricityUsdPerKwh);
  const poolFeeUsdPerDay = usdPerDayGross * (Math.max(0, poolFeePercent) / 100);
  const usdPerDayNet = usdPerDayGross - powerCostUsdPerDay - poolFeeUsdPerDay;
  const breakEvenUsdPerKwh =
    kwhPerDay > 0 ? (usdPerDayGross - poolFeeUsdPerDay) / kwhPerDay : null;

  return {
    btcPerDay,
    usdPerDayGross,
    powerCostUsdPerDay,
    poolFeeUsdPerDay,
    usdPerDayNet,
    breakEvenUsdPerKwh,
  };
}

export function subsidyForEra(era: number): number {
  if (era < 0) return BLOCK_SUBSIDY_BY_ERA[0]!;
  if (era >= BLOCK_SUBSIDY_BY_ERA.length) {
    return (
      BLOCK_SUBSIDY_BY_ERA[BLOCK_SUBSIDY_BY_ERA.length - 1]! /
      2 ** (era - BLOCK_SUBSIDY_BY_ERA.length + 1)
    );
  }
  return BLOCK_SUBSIDY_BY_ERA[era]!;
}

export function annualIssuanceBtc(subsidyBtc: number): number {
  const blocksPerYear = (365.25 * 24 * 60 * 60) / BTC_BLOCK_TIME_SEC;
  return blocksPerYear * subsidyBtc;
}

export function inflationRatePercent(subsidyBtc: number, circulatingBtc: number): number {
  if (!(circulatingBtc > 0)) return 0;
  return (annualIssuanceBtc(subsidyBtc) / circulatingBtc) * 100;
}

export type ProfitResult = {
  costUsd: number;
  valueUsd: number;
  pnlUsd: number;
  pnlPercent: number;
  btc: number;
};

export function simpleBtcProfit(input: {
  btc: number;
  costBasisUsd: number;
  priceUsd: number;
}): ProfitResult | null {
  const { btc, costBasisUsd, priceUsd } = input;
  if (!(btc > 0) || !(priceUsd > 0) || costBasisUsd < 0) return null;
  const valueUsd = btc * priceUsd;
  const pnlUsd = valueUsd - costBasisUsd;
  const pnlPercent = costBasisUsd > 0 ? (pnlUsd / costBasisUsd) * 100 : 0;
  return { costUsd: costBasisUsd, valueUsd, pnlUsd, pnlPercent, btc };
}

export function msUntil(iso: string, now = Date.now()): number {
  return new Date(iso).getTime() - now;
}
