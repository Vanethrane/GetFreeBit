/**
 * US-accessible crypto faucets and micro-earning platforms with referral programs.
 * Set `live: true` and a full tracked `signupUrl` when approved.
 * Entries with `live: false` stay in the file but are hidden from the desk.
 */
export type FaucetReferral = {
  id: string;
  name: string;
  /** One-line operator summary */
  tagline: string;
  description: string;
  /** Full affiliate URL when live; otherwise a placeholder base URL */
  signupUrl: string;
  /**
   * Query param or path segment for referrals (used only when referralCode is set).
   * Prefer pasting the full tracked URL into signupUrl when the network gives you one.
   */
  referralStyle: "query" | "path";
  referralParam: string;
  /** Optional code if signupUrl is a base URL only */
  referralCode: string;
  /** When false, hidden from /faucets until you approve a link */
  live: boolean;
  referralCommission: string;
  coins: string[];
  minWithdrawal: string;
  usAvailability: string;
  payoutNotes: string;
  riskNotes: string;
  /** Why join — shown on the desk when live */
  whyJoin: string;
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
    signupUrl: "https://faucetpay.io/r/10121236",
    referralStyle: "path",
    referralParam: "r",
    referralCode: "",
    live: true,
    referralCommission: "Up to 50% on PTC; 15% offerwall; 10% deposits (per program terms)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "BCH", "DASH", "TRX", "USDT"],
    minWithdrawal: "No minimum for internal transfers; external varies by coin",
    usAvailability:
      "Widely used by US earners as a payout rail. No broad US block reported; individual third-party offers may still geo-restrict.",
    payoutNotes: "Instant internal transfers; external withdrawals after review",
    riskNotes:
      "Custodial micro-wallet—not self-custody. Enable 2FA. Sweep meaningful balances to your own wallet on a schedule.",
    whyJoin:
      "Join first if you run more than one faucet—batch dust here so you are not stuck under every site’s withdrawal floor.",
    usesFaucetPay: false,
    sortOrder: 1,
  },
  {
    id: "cointiply",
    name: "Cointiply",
    tagline: "Faucet + offerwall super-app",
    description:
      "Daily faucet spins, surveys, installs, and games pay out in Coins convertible to BTC, DOGE, LTC, or DASH. Strong referral math for builders who document setup honestly.",
    signupUrl: "https://cointiply.mobi/ERGWvv",
    referralStyle: "path",
    referralParam: "r",
    referralCode: "",
    live: true,
    referralCommission: "25% of referral faucet earnings; 10% of offerwall earnings (lifetime)",
    coins: ["BTC", "DOGE", "LTC", "DASH"],
    minWithdrawal: "~20,000 satoshi equivalent (check live dashboard)",
    usAvailability:
      "Marketed worldwide including the US. Surveys and some offers target US/CA/UK/AU/NZ; faucet core works regardless.",
    payoutNotes: "Direct crypto withdrawal or via FaucetPay on supported paths",
    riskNotes:
      "Offerwall reversals happen—don't count pending coins as earned. Surveys can disqualify mid-flow; track time vs reward.",
    whyJoin:
      "Best all-in-one for US users who want faucet claims plus surveys/games—and strong lifetime referrals if you publish honest setups.",
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
    live: false,
    referralCommission: "50% of referral free BTC faucet earnings (lifetime)",
    coins: ["BTC"],
    minWithdrawal: "~30,000 satoshi (verify live site)",
    usAvailability:
      "Accessible to US users historically; always confirm current terms. Multiply/lottery features are gambling-adjacent—skip if that's not your risk budget.",
    payoutNotes: "BTC to on-chain address or FaucetPay",
    riskNotes:
      "Multiply and lottery modes are negative-EV gambling for most users. Treat as a disciplined hourly claim only unless you accept loss risk.",
    whyJoin:
      "Simple hourly BTC drip if you ignore casino modes—hidden until a verified referral link is approved.",
    usesFaucetPay: true,
    sortOrder: 3,
  },
  {
    id: "coinpayu",
    name: "RewardJoy (CoinPayU)",
    tagline: "Task-first PTC and faucet",
    description:
      "Paid-to-click ads, short faucet claims, and offerwalls pay in five cryptos (CoinPayU / RewardJoy). Fits users who prefer repeatable tasks over chance-based games.",
    signupUrl: "https://www.coinpayu.com/?r=Tknvrs",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    live: true,
    referralCommission: "30% of referral earnings (lifetime)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "USDT"],
    minWithdrawal: "~30,000 sats BTC; lower on some altcoins",
    usAvailability:
      "Global registration; US users commonly complete PTC and faucet tasks. Disable ad blockers only on the official domain.",
    payoutNotes: "Manual review window (~24–72h) on withdrawals",
    riskNotes: "PTC requires viewing ads—use a dedicated browser profile. Phishing clones exist; bookmark the real URL.",
    whyJoin:
      "Prefer tasks over dice rolls—PTC + faucet + multi-coin payouts with lifetime referral share.",
    usesFaucetPay: true,
    sortOrder: 4,
  },
  {
    id: "firefaucet",
    name: "Fire Faucet",
    tagline: "Low-threshold multi-coin faucet",
    description:
      "Auto-faucet mode, PTC, videos, and offerwalls with one of the lowest BTC withdrawal floors in the category. Gift-card exits exist for some regions.",
    signupUrl: "https://firefaucet.win/ref/1591825",
    referralStyle: "path",
    referralParam: "ref",
    referralCode: "",
    live: true,
    referralCommission: "50% of referral earnings (lifetime)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "DASH", "ZEC", "XMR", "+ gift cards"],
    minWithdrawal: "~100 satoshi BTC / ~$0.50 gift cards",
    usAvailability:
      "No broad US ban reported; gift-card catalog varies by country. Crypto withdrawals generally available to US accounts.",
    payoutNotes: "Often fast once minimums are met",
    riskNotes: "Disable ad blockers only on-site. Offer completions can reverse—log CSV-style if you tax-report micro-income.",
    whyJoin:
      "Lowest withdrawal floors in the stack—cash out dust faster across many coins (and gift cards where available).",
    usesFaucetPay: true,
    sortOrder: 5,
  },
  {
    id: "faucetcrypto",
    name: "FaucetCrypto",
    tagline: "Level-gated faucet + offerwalls",
    description:
      "Short-interval faucet claims level you up to unlock offerwalls. US, Canada, UK, and AU users are commonly targeted for survey inventory once level requirements are met.",
    signupUrl: "https://faucetcrypto.com/r/11114237",
    referralStyle: "path",
    referralParam: "r",
    referralCode: "",
    live: true,
    referralCommission: "Referral share on faucet and referral activity (see live referral page)",
    coins: ["BTC", "LTC", "DOGE", "ETH", "TRX", "USDT", "+ others"],
    minWithdrawal: "Varies by coin—check dashboard",
    usAvailability:
      "Explicitly notes US/CA/UK/AU/NZ survey targeting on offerwalls. Core faucet available while leveling.",
    payoutNotes: "FaucetPay and direct paths depending on coin",
    riskNotes: "Offerwall level gate (~Level 15) means early hours are faucet-only. Survey disqualifications are normal—budget time accordingly.",
    whyJoin:
      "Worth the level grind if you want US-targeted surveys later—short-interval claims while you unlock offerwalls.",
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
    live: false,
    referralCommission: "Multi-tier: earn on faucet claims from referrals up to four levels deep",
    coins: ["ZEC", "MATIC", "BNB", "1FLR (platform)"],
    minWithdrawal: "Varies by asset—verify wallet screen",
    usAvailability:
      "No US-wide block on faucet claims reported; some game offers may region-gate. Link social accounts only if you accept their privacy trade-offs.",
    payoutNotes: "Withdraw to self-custody ZEC address or linked accounts per asset",
    riskNotes: "Game quests and social linking increase exposure—use a burn email if experimenting.",
    whyJoin: "ZEC / multi-asset daily drips—hidden until a verified referral link is approved.",
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
    live: false,
    referralCommission: "10% / 5% / 3% / 2% across four referral levels",
    coins: ["ZEC"],
    minWithdrawal: "Manual payout requests—check live limits",
    usAvailability:
      "Operated from the EU (Netherlands); US users commonly claim without VPN. Confirm current terms at signup.",
    payoutNotes: "ZEC to your submitted address after manual processing",
    riskNotes: "Linking Google/social accounts increases claim multipliers but expands your footprint—decide before connecting.",
    whyJoin: "Once-daily ZEC with deep referral tiers—hidden until a verified referral link is approved.",
    usesFaucetPay: false,
    sortOrder: 8,
  },
];

export function getFaucetReferrals(): FaucetReferral[] {
  return [...FAUCET_REFERRALS]
    .filter((f) => f.live)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFaucetReferral(id: string): FaucetReferral | undefined {
  return FAUCET_REFERRALS.find((f) => f.id === id && f.live);
}
