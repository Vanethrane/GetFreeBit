/**
 * Public corrections log — factual fixes only, verified before publish.
 * Add entries when you correct numbers, fees, minimums, dates, or regulatory claims.
 */

export type CorrectionCategory =
  | "faucet"
  | "exchange"
  | "tool"
  | "guide"
  | "tax"
  | "news"
  | "other";

export type CorrectionEntry = {
  /** ISO date (YYYY-MM-DD) — used for sort + display */
  date: string;
  /** Past tense, specific: what was wrong → what is correct now */
  summary: string;
  category: CorrectionCategory;
  /** Page where the fix was applied */
  pagePath?: string;
  pageLabel?: string;
};

/** Newest first after sort */
export const CORRECTIONS_LOG: CorrectionEntry[] = [
  {
    date: "2026-08-26",
    category: "tool",
    summary:
      "Clarified Bitcoin halving countdown copy: wall-clock dates are estimates; block height (~1,050,000) is the authoritative trigger.",
    pagePath: "/bitcoin-halving-countdown",
    pageLabel: "Bitcoin halving countdown",
  },
  {
    date: "2026-08-26",
    category: "other",
    summary: "Launched the public corrections log and report-a-correction workflow.",
    pagePath: "/corrections",
    pageLabel: "Corrections log",
  },
];

export function listCorrections(): CorrectionEntry[] {
  return [...CORRECTIONS_LOG].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatCorrectionDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export const CORRECTIONS_PAGE = {
  path: "/corrections",
  title: "Corrections Log",
  description:
    "Verified factual corrections on GetFreeBit—fees, minimums, dates, and tool assumptions. Report an error if you spot one.",
} as const;
