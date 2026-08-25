/**
 * US-accessible crypto faucets and micro-earning platforms with referral programs.
 * Fill in `referralCode` when your partner links are live — signup URLs update automatically.
 */
export type FaucetReferral = {
  id: string;
  name: string;
  /** One-line operator summary */
  tagline: string;
  description: string;
  /** Base signup URL (no referral param) */
  signupUrl: string;
  /**
   * Query param or path segment for referrals.
   * - query: append ?referralParam=code (or & if signupUrl already has ?)
   * - path: append /referralCode to signupUrl (trailing slash normalized)
   */
  referralStyle: "query" | "path";
  referralParam: string;
  /** Your referral code — leave empty until partner links are verified */
  referralCode: string;
  referralCommission: string;
  coins: string[];
  minWithdrawal: string;
  /** Why we list it for US readers */
  usAvailability: string;
  payoutNotes: string;
  /** Honest risk / behavior notes (gambling, ads, time cost) */
  riskNotes: string;
  /** Optional: route FaucetPay withdrawals here first */
  usesFaucetPay?: boolean;
  sortOrder: number;
};

export const FAUCET_REFERRALS: FaucetReferral[] = [
  {
    id: "faucetpay",
    name: "FaucetPay",
    tagline: "Micro-wallet hub for 100+ faucet payouts",
    description:
      "Receive drips from faucets and PTC sites in one account, swap between coins, stake small balances, or withdraw when thresholds clear. Most US-friendly faucet stacks route here before self-custody.",
    signupUrl: "https://faucetpay.io",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    referralCommission: "Up to 50% on PTC; 15% offerwall; 10% deposits (per program terms)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "BCH", "DASH", "TRX", "USDT"],
    minWithdrawal: "No minimum for internal transfers; external varies by coin",
    usAvailability:
      "Widely used by US earners as a payout rail. No broad US block reported; individual third-party offers may still geo-restrict.",
    payoutNotes: "Instant internal transfers; external withdrawals after review",
    riskNotes:
      "Custodial micro-wallet—not self-custody. Enable 2FA. Sweep meaningful balances to your own wallet on a schedule.",
    usesFaucetPay: false,
    sortOrder: 1,
  },
  {
    id: "cointiply",
    name: "Cointiply",
    tagline: "Faucet + offerwall super-app",
    description:
      "Daily faucet spins, surveys, installs, and games pay out in Coins convertible to BTC, DOGE, LTC, or DASH. Strong referral math for builders who document setup honestly.",
    signupUrl: "https://cointiply.com",
    referralStyle: "path",
    referralParam: "r",
    referralCode: "",
    referralCommission: "25% of referral faucet earnings; 10% of offerwall earnings (lifetime)",
    coins: ["BTC", "DOGE", "LTC", "DASH"],
    minWithdrawal: "~20,000 satoshi equivalent (check live dashboard)",
    usAvailability:
      "Marketed worldwide including the US. Surveys and some offers target US/CA/UK/AU/NZ; faucet core works regardless.",
    payoutNotes: "Direct crypto withdrawal or via FaucetPay on supported paths",
    riskNotes:
      "Offerwall reversals happen—don't count pending coins as earned. Surveys can disqualify mid-flow; track time vs reward.",
    usesFaucetPay: true,
    sortOrder: 2,
  },
  {
    id: "freebitco",
    name: "FreeBitco.in",
    tagline: "Legacy hourly BTC faucet",
    description:
      "Hourly roll claims, interest on balance, and lottery-style multiply games. Referrals pay a lifetime share of faucet earnings—not a beginner-only bonus.",
    signupUrl: "https://freebitco.in",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    referralCommission: "50% of referral free BTC faucet earnings (lifetime)",
    coins: ["BTC"],
    minWithdrawal: "~30,000 satoshi (verify live site)",
    usAvailability:
      "Accessible to US users historically; always confirm current terms. Multiply/lottery features are gambling-adjacent—skip if that's not your risk budget.",
    payoutNotes: "BTC to on-chain address or FaucetPay",
    riskNotes:
      "Multiply and lottery modes are negative-EV gambling for most users. Treat as a disciplined hourly claim only unless you accept loss risk.",
    usesFaucetPay: true,
    sortOrder: 3,
  },
  {
    id: "coinpayu",
    name: "CoinPayU",
    tagline: "Task-first PTC and faucet",
    description:
      "Paid-to-click ads, short faucet claims, and offerwalls pay in five cryptos. Fits users who prefer repeatable tasks over chance-based games.",
    signupUrl: "https://www.coinpayu.com",
    referralStyle: "path",
    referralParam: "r",
    referralCode: "",
    referralCommission: "30% of referral earnings (lifetime)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "USDT"],
    minWithdrawal: "~30,000 sats BTC; lower on some altcoins",
    usAvailability:
      "Global registration; US users commonly complete PTC and faucet tasks. Disable ad blockers only on the official domain.",
    payoutNotes: "Manual review window (~24–72h) on withdrawals",
    riskNotes: "PTC requires viewing ads—use a dedicated browser profile. Phishing clones exist; bookmark the real URL.",
    usesFaucetPay: true,
    sortOrder: 4,
  },
  {
    id: "firefaucet",
    name: "Fire Faucet",
    tagline: "Low-threshold multi-coin faucet",
    description:
      "Auto-faucet mode, PTC, videos, and offerwalls with one of the lowest BTC withdrawal floors in the category. Gift-card exits exist for some regions.",
    signupUrl: "https://firefaucet.win",
    referralStyle: "path",
    referralParam: "ref",
    referralCode: "",
    referralCommission: "50% of referral earnings (lifetime)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "DASH", "ZEC", "XMR", "+ gift cards"],
    minWithdrawal: "~100 satoshi BTC / ~$0.50 gift cards",
    usAvailability:
      "No broad US ban reported; gift-card catalog varies by country. Crypto withdrawals generally available to US accounts.",
    payoutNotes: "Often fast once minimums are met",
    riskNotes: "Disable ad blockers only on-site. Offer completions can reverse—log CSV-style if you tax-report micro-income.",
    usesFaucetPay: true,
    sortOrder: 5,
  },
  {
    id: "faucetcrypto",
    name: "FaucetCrypto",
    tagline: "Level-gated faucet + offerwalls",
    description:
      "Short-interval faucet claims level you up to unlock offerwalls. US, Canada, UK, and AU users are commonly targeted for survey inventory once level requirements are met.",
    signupUrl: "https://faucetcrypto.com",
    referralStyle: "query",
    referralParam: "referral",
    referralCode: "",
    referralCommission: "Referral share on faucet and referral activity (see live referral page)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "TRX", "USDT", "+ others"],
    minWithdrawal: "Varies by coin—check dashboard",
    usAvailability:
      "Explicitly notes US/CA/UK/AU/NZ survey targeting on offerwalls. Core faucet available while leveling.",
    payoutNotes: "FaucetPay and direct paths depending on coin",
    riskNotes: "Offerwall level gate (~Level 15) means early hours are faucet-only. Survey disqualifications are normal—budget time accordingly.",
    usesFaucetPay: true,
    sortOrder: 6,
  },
  {
    id: "pipeflare",
    name: "PipeFlare",
    tagline: "ZEC faucet + casual games",
    description:
      "Daily ZEC faucet claims, optional game quests, and a multi-tier referral tree. Good for users already stacking privacy-coin drips alongside majors.",
    signupUrl: "https://pipeflare.io",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    referralCommission: "Multi-tier: earn on faucet claims from referrals up to four levels deep",
    coins: ["ZEC", "MATIC", "BNB", "1FLR (platform)"],
    minWithdrawal: "Varies by asset—verify wallet screen",
    usAvailability:
      "No US-wide block on faucet claims reported; some game offers may region-gate. Link social accounts only if you accept their privacy trade-offs.",
    payoutNotes: "Withdraw to self-custody ZEC address or linked accounts per asset",
    riskNotes: "Game quests and social linking increase exposure—use a burn email if experimenting.",
    usesFaucetPay: false,
    sortOrder: 7,
  },
  {
    id: "globalhive",
    name: "GlobalHive",
    tagline: "Daily Zcash faucet with tiered refs",
    description:
      "Once-per-day ZEC faucet with boost multipliers when you link optional accounts (Brave, social). Four-level referral commissions suit long-horizon micro-earners.",
    signupUrl: "https://globalhive.io",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    referralCommission: "10% / 5% / 3% / 2% across four referral levels",
    coins: ["ZEC"],
    minWithdrawal: "Manual payout requests—check live limits",
    usAvailability:
      "Operated from the EU (Netherlands); US users commonly claim without VPN. Confirm current terms at signup.",
    payoutNotes: "ZEC to your submitted address after manual processing",
    riskNotes: "Linking Google/social accounts increases claim multipliers but expands your footprint—decide before connecting.",
    usesFaucetPay: false,
    sortOrder: 8,
  },
];

export function getFaucetReferrals(): FaucetReferral[] {
  return [...FAUCET_REFERRALS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFaucetReferral(id: string): FaucetReferral | undefined {
  return FAUCET_REFERRALS.find((f) => f.id === id);
}
