/**
 * Bitcoin casino partners with affiliate / referral programs.
 * Keep `live: false` until you paste a tracked signup URL or referral code.
 * The /casinos desk stays private (404) until at least one entry is live.
 */
export type CasinoReferral = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Full tracked affiliate URL when live; otherwise official homepage */
  signupUrl: string;
  referralStyle: "query" | "path";
  referralParam: string;
  referralCode: string;
  /** When false, hidden — desk stays private until any casino is live */
  live: boolean;
  typicalOffer: string;
  acceptsBtc: boolean;
  strengths: string;
  geoNotes: string;
  riskNotes: string;
  whyJoin: string;
  sortOrder: number;
};

export const CASINO_REFERRALS: CasinoReferral[] = [
  {
    id: "stake",
    name: "Stake",
    tagline: "Crypto-first sportsbook & casino",
    description:
      "Large crypto gambling brand with sports, originals, and casino. Affiliate program pays on referred player activity when you are approved.",
    signupUrl: "https://stake.com",
    referralStyle: "query",
    referralParam: "c",
    referralCode: "",
    live: false,
    typicalOffer: "Revenue share / CPA via Stake affiliate (terms vary by deal)",
    acceptsBtc: true,
    strengths: "Liquidity, brand recognition, crypto deposits including BTC",
    geoNotes:
      "Restricted in many regions including most of the US. Confirm eligibility before promoting.",
    riskNotes:
      "Gambling losses are expected over time. Never deposit money you cannot afford to lose. Verify the URL and enable account security.",
    whyJoin: "Hidden until a verified Stake partner link is approved.",
    sortOrder: 1,
  },
  {
    id: "roobet",
    name: "Roobet",
    tagline: "Crash, slots, and live casino",
    description:
      "Crypto casino known for crash-style games and streamer partnerships. Affiliate program supports tracked referral links.",
    signupUrl: "https://roobet.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate rev-share / CPA when approved",
    acceptsBtc: true,
    strengths: "Simple crypto onboarding, popular originals",
    geoNotes: "Geo-blocked in regulated markets including the US—verify before traffic.",
    riskNotes:
      "High-volatility games can drain balances quickly. Treat bonuses as marketing, not edge.",
    whyJoin: "Hidden until a verified Roobet partner link is approved.",
    sortOrder: 2,
  },
  {
    id: "bc-game",
    name: "BC.Game",
    tagline: "Casino, sports, and lottery in crypto",
    description:
      "Multi-product crypto gambling site with an established affiliate dashboard and BTC deposits.",
    signupUrl: "https://bc.game",
    referralStyle: "query",
    referralParam: "i",
    referralCode: "",
    live: false,
    typicalOffer: "Multi-tier affiliate commissions when approved",
    acceptsBtc: true,
    strengths: "Broad game catalog, crypto rails, affiliate tooling",
    geoNotes: "Availability varies by country; US persons are typically restricted.",
    riskNotes:
      "Complex VIP and bonus rules. Read wagering requirements before depositing.",
    whyJoin: "Hidden until a verified BC.Game partner link is approved.",
    sortOrder: 3,
  },
  {
    id: "cloudbet",
    name: "Cloudbet",
    tagline: "Long-running BTC sportsbook & casino",
    description:
      "Crypto sportsbook/casino with Bitcoin roots and an affiliate program for tracked player signups.",
    signupUrl: "https://www.cloudbet.com",
    referralStyle: "query",
    referralParam: "af_token_id",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate revenue share when approved",
    acceptsBtc: true,
    strengths: "BTC focus, sports + casino, established operator history",
    geoNotes: "Restricted jurisdictions apply; confirm local law and site T&Cs.",
    riskNotes:
      "Odds and house edge favor the operator. Withdrawal KYC can apply at cash-out.",
    whyJoin: "Hidden until a verified Cloudbet partner link is approved.",
    sortOrder: 4,
  },
  {
    id: "bitstarz",
    name: "Bitstarz",
    tagline: "Slots-heavy crypto casino",
    description:
      "Bitcoin casino focused on slots and table games. Affiliate links are available through their partner program.",
    signupUrl: "https://www.bitstarz.com",
    referralStyle: "query",
    referralParam: "affiliate",
    referralCode: "",
    live: false,
    typicalOffer: "Casino affiliate rev-share / hybrid deals",
    acceptsBtc: true,
    strengths: "Crypto deposits, large slot library",
    geoNotes: "Blocked in multiple countries; US traffic is usually not accepted.",
    riskNotes:
      "Bonus abuse rules are strict. Never chase losses with larger deposits.",
    whyJoin: "Hidden until a verified Bitstarz partner link is approved.",
    sortOrder: 5,
  },
  {
    id: "fortunejack",
    name: "FortuneJack",
    tagline: "Crypto casino & sportsbook",
    description:
      "Long-standing crypto gambling brand with BTC support and an affiliate program for referrals.",
    signupUrl: "https://fortunejack.com",
    referralStyle: "query",
    referralParam: "aff",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate commissions on referred play",
    acceptsBtc: true,
    strengths: "Crypto-native branding, sports + casino mix",
    geoNotes: "Jurisdiction limits apply—check before sending traffic.",
    riskNotes:
      "Verify deposit addresses on-site only. Phishing clones are common in this niche.",
    whyJoin: "Hidden until a verified FortuneJack partner link is approved.",
    sortOrder: 6,
  },
  {
    id: "mega-dice",
    name: "Mega Dice",
    tagline: "Telegram-friendly crypto casino",
    description:
      "Crypto casino with affiliate/referral acquisition. Accepts Bitcoin among other coins.",
    signupUrl: "https://megadice.com",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate rev-share when approved",
    acceptsBtc: true,
    strengths: "Crypto deposits, marketing-heavy brand",
    geoNotes: "Not available everywhere; confirm geo rules.",
    riskNotes:
      "Newer brands can change terms quickly—re-check affiliate and player T&Cs often.",
    whyJoin: "Hidden until a verified Mega Dice partner link is approved.",
    sortOrder: 7,
  },
  {
    id: "shuffle",
    name: "Shuffle",
    tagline: "Provably fair crypto casino",
    description:
      "Crypto casino with an affiliate program and BTC deposits. Tracked links required for attribution.",
    signupUrl: "https://shuffle.com",
    referralStyle: "query",
    referralParam: "r",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate revenue share / CPA (deal-dependent)",
    acceptsBtc: true,
    strengths: "Provably fair messaging, crypto rails",
    geoNotes: "Restricted regions apply; verify before promoting.",
    riskNotes:
      "Provably fair does not remove house edge or loss risk.",
    whyJoin: "Hidden until a verified Shuffle partner link is approved.",
    sortOrder: 8,
  },
  {
    id: "duelbits",
    name: "Duelbits",
    tagline: "Esports-leaning crypto casino",
    description:
      "Casino and sports product with crypto deposits and an affiliate program for partner links.",
    signupUrl: "https://duelbits.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate commissions when approved",
    acceptsBtc: true,
    strengths: "Esports angle, crypto payments",
    geoNotes: "Geo-blocks are common; US users are typically excluded.",
    riskNotes:
      "Esports and casino products are still gambling—bankroll rules still apply.",
    whyJoin: "Hidden until a verified Duelbits partner link is approved.",
    sortOrder: 9,
  },
  {
    id: "betplay",
    name: "Betplay",
    tagline: "Crypto casino with VIP focus",
    description:
      "Bitcoin-friendly casino with an affiliate program. Use only tracked links once approved.",
    signupUrl: "https://betplay.io",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate rev-share when approved",
    acceptsBtc: true,
    strengths: "Crypto focus, VIP-style marketing",
    geoNotes: "Availability depends on IP/jurisdiction—confirm before traffic.",
    riskNotes:
      "VIP perks do not change expected long-run losses.",
    whyJoin: "Hidden until a verified Betplay partner link is approved.",
    sortOrder: 10,
  },
];

/** Live partners only — empty keeps /casinos private. */
export function getLiveCasinoReferrals(): CasinoReferral[] {
  return CASINO_REFERRALS.filter((c) => c.live && c.acceptsBtc)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllCasinoReferrals(): CasinoReferral[] {
  return CASINO_REFERRALS.slice().sort((a, b) => a.sortOrder - b.sortOrder);
}

export function isCasinoDeskPublic(): boolean {
  return getLiveCasinoReferrals().length > 0;
}
