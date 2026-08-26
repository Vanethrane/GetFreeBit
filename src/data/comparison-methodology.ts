/**
 * Comparison desk ranking methodology — criteria and per-item “why here” copy.
 * Sort order in referral data files must align with documented criteria.
 */

export type ComparisonDeskId =
  | "exchanges"
  | "faucets"
  | "cards"
  | "tax-tools"
  | "casinos"
  | "stocks";

export type ComparisonDeskMethodology = {
  id: ComparisonDeskId;
  deskPath: string;
  deskTitle: string;
  /** One paragraph — what this desk compares */
  summary: string;
  /** Ordered criteria — first criterion is the primary sort key */
  criteria: string[];
  /** Explicit non-factors */
  notFactors: string[];
  /** Partner id → why it appears at this position (write for current live sortOrder) */
  rankReasons: Record<string, string>;
  lastReviewed: string;
};

export const COMPARISON_METHODOLOGIES: ComparisonDeskMethodology[] = [
  {
    id: "exchanges",
    deskPath: "/exchanges",
    deskTitle: "Exchange referral desk",
    summary:
      "US-accessible centralized exchanges for fiat onboarding and spot buys—not a derivatives leaderboard.",
    criteria: [
      "US residency fit (US-domiciled or clearly US-accessible products first)",
      "Live, verified partner link on GetFreeBit (hidden/unverified entries are omitted, not ranked)",
      "Fiat rail clarity for ACH/bank onboarding",
      "Documented custody and state-eligibility risk notes",
    ],
    notFactors: [
      "Affiliate commission rate or CPA amount",
      "Which exchange pays fastest",
      "Promotional bonus headline size",
      "Alphabetical order",
    ],
    rankReasons: {
      "binance-us":
        "Listed first because it is the only live US-domiciled Binance product with a verified partner link on this desk—appropriate for US persons who want Binance-branded spot rails without using global Binance.com.",
    },
    lastReviewed: "2026-08-26",
  },
  {
    id: "faucets",
    deskPath: "/faucets",
    deskTitle: "Faucet referral desk",
    summary:
      "US-accessible micro-earning platforms and the payout infrastructure earners need before comparing individual faucets.",
    criteria: [
      "Payout infrastructure that unlocks other faucets (micro-wallet routing first)",
      "US availability without site-wide geo-block",
      "Documented withdrawal path and minimums",
      "Referral program transparency in our notes",
      "Live verified partner link",
    ],
    notFactors: [
      "Referral commission percentage alone",
      "Claim rate marketing claims from operators",
      "Whether we earn more on one faucet vs another",
    ],
    rankReasons: {
      faucetpay:
        "Listed first because most multi-faucet US stacks route through FaucetPay before self-custody—it is infrastructure, not a single claim site. We prioritize the rail earners need before individual faucet apps.",
      cointiply:
        "Listed second as a documented US-friendly faucet + offerwall stack with a live partner link and FaucetPay-compatible payout paths.",
      freebitco:
        "Listed for legacy hourly BTC claims with long US usage history; position reflects product familiarity, not commission tier.",
      coinpayu:
        "Listed for multi-coin faucet + PTC inventory with FaucetPay support—after core wallet routing and primary super-apps.",
      firefaucet:
        "Listed for short-interval claims and FaucetPay routing; sorted by documented US usage and payout path clarity.",
      faucetcrypto:
        "Listed as an additional FaucetPay-compatible faucet hub—position reflects breadth, not payout size promises.",
      trustdice:
        "Listed after core US-friendly faucet apps as a casino-adjacent multi-coin faucet with a live verified partner link—position reflects product type (casino + faucet), not commission rate.",
      pipeflare:
        "Listed for multi-game + faucet model with ZEC/BTC paths; later in stack because offer mix is narrower for pure BTC earners.",
      globalhive:
        "Listed for ZEC faucet niche; lower position reflects narrower coin focus vs BTC-first earners on this desk.",
    },
    lastReviewed: "2026-08-26",
  },
  {
    id: "cards",
    deskPath: "/cards",
    deskTitle: "Cards & banking desk",
    summary: "Crypto debit and banking products—eligibility and fee transparency before referral codes or links.",
    criteria: [
      "Documented apply path (tracked link or honest code-only flow)",
      "Eligibility and geo-restriction notes upfront",
      "Live verified partner attribution (link or invite code)",
      "Risk disclosure for credit, FX, and custodial spend products",
    ],
    notFactors: [
      "Card cashback marketing percentages alone",
      "Affiliate CPA",
      "Brand marketing spend",
    ],
    rankReasons: {
      "bybit-card":
        "Listed first because it is the most-requested code-only card flow we document—Bybit attributes only via invite code, so we show RA1PNLO explicitly rather than hiding behind a fake URL.",
      nexo:
        "Listed second for crypto credit/earn with a live tracked referral link—after the code-only card entry readers search for most often.",
    },
    lastReviewed: "2026-08-26",
  },
  {
    id: "tax-tools",
    deskPath: "/tools/tax",
    deskTitle: "Crypto tax tool desk",
    summary:
      "Portfolio importers and US tax report generators for earners with CEX, faucet, and wallet activity.",
    criteria: [
      "Importer breadth for CEX + wallet CSV/API paths",
      "US tax form support documented at checkout",
      "Fit for micro-earner → moderate transaction counts",
      "Live verified partner link",
      "Reconciliation risk notes quality",
    ],
    notFactors: [
      "Affiliate subscription bounty size",
      "Vendor marketing awards",
      "Alphabetical name order",
    ],
    rankReasons: {
      koinly:
        "Listed first as the default importer-first tool for mixed faucet + CEX activity at moderate transaction counts, with a live partner checkout link.",
      cointracking:
        "Listed second for power users who want deeper portfolio journaling alongside tax exports—different complexity tier, not a commission-driven swap.",
    },
    lastReviewed: "2026-08-26",
  },
  {
    id: "casinos",
    deskPath: "/casinos",
    deskTitle: "Bitcoin casino desk",
    summary: "Gambling partners—listed only when live with verified links; not an endorsement of expected returns.",
    criteria: [
      "Live verified referral link",
      "BTC deposit/withdraw documentation in our notes",
      "Jurisdiction warnings present",
      "Responsible gambling risk block on desk",
    ],
    notFactors: [
      "House edge or bonus headline size",
      "Affiliate revenue share percentage",
      "Operator marketing spend",
    ],
    rankReasons: {},
    lastReviewed: "2026-08-26",
  },
  {
    id: "stocks",
    deskPath: "/stocks",
    deskTitle: "US stock app desk",
    summary: "US brokerage apps with referral programs—not investment recommendations.",
    criteria: [
      "US resident eligibility documented",
      "Live verified referral link",
      "Funding and bonus terms described honestly",
      "Investing risk disclosure on desk",
    ],
    notFactors: [
      "Referral stock bonus amount",
      "Affiliate CPA",
      "App store ranking",
    ],
    rankReasons: {},
    lastReviewed: "2026-08-26",
  },
];

export function getComparisonMethodology(
  id: ComparisonDeskId,
): ComparisonDeskMethodology | undefined {
  return COMPARISON_METHODOLOGIES.find((m) => m.id === id);
}

export function getRankReason(
  methodology: ComparisonDeskMethodology,
  partnerId: string,
  position: number,
): string {
  const explicit = methodology.rankReasons[partnerId];
  if (explicit) return explicit;
  return `Listed #${position} on this desk under our published criteria (${methodology.criteria[0].toLowerCase()}). Position is not a “best overall” award—compare fit for your state, product needs, and risk tolerance.`;
}
