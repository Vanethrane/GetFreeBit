/**
 * US-accessible exchanges with affiliate / referral programs.
 * Set `live: true` and a full tracked `signupUrl` when approved.
 * Hidden entries stay in the file until you paste an approved link.
 */
export type ExchangeReferral = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  signupUrl: string;
  referralStyle: "query" | "path";
  referralParam: string;
  referralCode: string;
  live: boolean;
  typicalOffer: string;
  fiatRails: string;
  strengths: string;
  usAvailability: string;
  riskNotes: string;
  whyJoin: string;
  sortOrder: number;
};

export const EXCHANGE_REFERRALS: ExchangeReferral[] = [
  {
    id: "binance-us",
    name: "Binance.US",
    tagline: "US-domiciled Binance venue",
    description:
      "Separate from global Binance.com. Useful for US residents who want Binance-branded liquidity without using the international product (which restricts US persons).",
    signupUrl:
      "https://www.binance.us/universal_JHHGDSKDJ/auth/registration?ref=614844993",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: true,
    typicalOffer: "Trading fee discounts via Binance.US referral when available",
    fiatRails: "ACH and other rails per account verification",
    strengths: "Spot pairs, competitive fees when referral discounts apply",
    usAvailability:
      "US only; state-level product limits apply. Do not use Binance.com if you are a US person.",
    riskNotes:
      "Confirm you are on binance.us—not the global domain. Regulatory status can change; keep balances you cannot afford to lock on-exchange temporary.",
    whyJoin:
      "US-legal Binance rails for spot buys after faucet or paycheck funding—use our ref link at registration.",
    sortOrder: 1,
  },
  {
    id: "coinbase",
    name: "Coinbase",
    tagline: "US-regulated onboarding default",
    description:
      "Fiat on-ramp, beginner UX, and deep USD pairs. Best starting point for many US earners moving faucet or paycheck capital into spot holdings before self-custody.",
    signupUrl: "https://www.coinbase.com/join",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    live: false,
    typicalOffer: "Signup / trade bonuses via Impact when available (verify live)",
    fiatRails: "ACH, debit, wire (fees vary)",
    strengths: "Compliance clarity, Coinbase One perks, institutional brand recognition",
    usAvailability: "Fully available to US residents; state restrictions can apply to some products.",
    riskNotes:
      "Custodial exchange—enable 2FA, use a unique password, and withdraw to self-custody after funding. Watch ACH hold windows before trading size.",
    whyJoin: "Hidden until a verified Coinbase partner link is approved.",
    sortOrder: 2,
  },
  {
    id: "kraken",
    name: "Kraken",
    tagline: "Pro depth with staking options",
    description:
      "Long-running US-accessible exchange with Pro order books, fiat deposits, and native staking on select assets.",
    signupUrl: "https://www.kraken.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Fee discounts / signup credits via Kraken affiliate when approved",
    fiatRails: "ACH, wire, debit (region-dependent)",
    strengths: "Liquidity, Pro trading, staking on supported assets",
    usAvailability: "Available in most US states; some features geo-restricted—confirm at signup.",
    riskNotes:
      "Staking and margin products add complexity. Start with spot + withdrawals; never skip verifying withdrawal addresses.",
    whyJoin: "Hidden until a verified Kraken partner link is approved.",
    sortOrder: 3,
  },
  {
    id: "okx",
    name: "OKX",
    tagline: "Global Tier-1 (check US eligibility)",
    description:
      "Deep derivatives and spot liquidity. US persons must confirm product eligibility—many OKX features are not available to US residents.",
    signupUrl: "https://www.okx.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Fee discounts via OKX affiliate when approved",
    fiatRails: "Varies heavily by residency",
    strengths: "Liquidity and product breadth where legally available",
    usAvailability: "Often restricted for US persons—do not register if you are ineligible.",
    riskNotes: "Never use a VPN to bypass residency rules. Prefer Binance.US or other US venues if you are a US person.",
    whyJoin: "Hidden until a verified OKX partner link is approved and US eligibility is confirmed.",
    sortOrder: 4,
  },
  {
    id: "gemini",
    name: "Gemini",
    tagline: "NY-rooted exchange with Earn products",
    description:
      "Licensed US venue with a security-forward reputation. Useful when you want regulated custody plus optional Earn products.",
    signupUrl: "https://www.gemini.com",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    live: false,
    typicalOffer: "Referral credit or fee credits via partner programs when live",
    fiatRails: "ACH, wire, debit (verify account)",
    strengths: "Security posture, ActiveTrader, Gemini Credit Card (eligibility varies)",
    usAvailability: "US-focused; product availability differs by state.",
    riskNotes: "Earn / lending products are not risk-free—read lockups and counterparty disclosures.",
    whyJoin: "Hidden until a verified Gemini partner link is approved.",
    sortOrder: 5,
  },
  {
    id: "crypto-com",
    name: "Crypto.com",
    tagline: "App + card + exchange stack",
    description:
      "Consumer crypto app with card cashback, exchange trading, and frequent deposit campaigns.",
    signupUrl: "https://crypto.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Signup / deposit bonuses and card offers via Impact when live",
    fiatRails: "Bank, card (fees and limits vary)",
    strengths: "Crypto.com Card cashback, app UX, VIP tiers",
    usAvailability: "US app available; card and Earn features vary heavily by state.",
    riskNotes: "CRO lockups for card tiers create opportunity cost and price risk.",
    whyJoin: "Hidden until a verified Crypto.com partner link is approved.",
    sortOrder: 6,
  },
  {
    id: "bitstamp",
    name: "Bitstamp",
    tagline: "Legacy venue with US rails",
    description:
      "One of the oldest exchanges still serving US customers with fiat on/off ramps.",
    signupUrl: "https://www.bitstamp.net",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate / fee share when partnered (verify program)",
    fiatRails: "ACH, SEPA, wire depending on residency",
    strengths: "Longevity, straightforward spot trading",
    usAvailability: "US customers supported on eligible products; confirm KYC requirements.",
    riskNotes: "Enable 2FA and withdraw surplus—longevity is not zero custody risk.",
    whyJoin: "Hidden until a verified Bitstamp partner link is approved.",
    sortOrder: 7,
  },
];

export function getExchangeReferrals(): ExchangeReferral[] {
  return [...EXCHANGE_REFERRALS]
    .filter((e) => e.live)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getExchangeReferral(id: string): ExchangeReferral | undefined {
  return EXCHANGE_REFERRALS.find((e) => e.id === id && e.live);
}
