/**
 * US stock / brokerage apps with referral programs.
 * Keep `live: false` until you paste a tracked signup URL or referral code.
 * The /stocks desk stays private (404) until at least one entry is live.
 */
export type StockReferral = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Full tracked affiliate / invite URL when live; otherwise official homepage */
  signupUrl: string;
  referralStyle: "query" | "path";
  referralParam: string;
  referralCode: string;
  /** When false, hidden — desk stays private until any app is live */
  live: boolean;
  typicalOffer: string;
  assetTypes: string;
  strengths: string;
  usAvailability: string;
  riskNotes: string;
  whyJoin: string;
  sortOrder: number;
};

export const STOCK_REFERRALS: StockReferral[] = [
  {
    id: "robinhood",
    name: "Robinhood",
    tagline: "Commission-free US brokerage app",
    description:
      "Popular US retail brokerage for stocks, ETFs, and options. Referral / invite programs periodically reward new accounts and the referrer when requirements are met.",
    signupUrl: "https://robinhood.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Stock reward or credit for qualified referrals (terms change often)",
    assetTypes: "US stocks, ETFs, options; crypto product is separate and optional",
    strengths: "Simple mobile UX, fractional shares, wide retail adoption",
    usAvailability: "US residents; state and product eligibility still apply.",
    riskNotes:
      "Investing can lose principal. Options and margin add risk. Custodial brokerage—enable 2FA and understand settlement before withdrawing.",
    whyJoin: "Hidden until a verified Robinhood invite / partner link is approved.",
    sortOrder: 1,
  },
  {
    id: "webull",
    name: "Webull",
    tagline: "Charts-first US brokerage",
    description:
      "US brokerage with stronger charting tools and frequent deposit / referral promotions. Affiliate or invite links attribute funded accounts when your program is approved.",
    signupUrl: "https://www.webull.com",
    referralStyle: "query",
    referralParam: "inviteCode",
    referralCode: "",
    live: false,
    typicalOffer: "Shares or credits for qualified invites / deposits (promo-dependent)",
    assetTypes: "US stocks, ETFs, options; some crypto availability by product",
    strengths: "Desktop + mobile charts, extended hours, paper trading",
    usAvailability: "US-focused; confirm state support for options and other products.",
    riskNotes:
      "Promotional shares often have holding or funding requirements. Trading losses are your own.",
    whyJoin: "Hidden until a verified Webull invite / partner link is approved.",
    sortOrder: 2,
  },
  {
    id: "public",
    name: "Public",
    tagline: "Social-style US investing app",
    description:
      "US investing app with stocks/ETFs and periodic referral bonuses. Use only tracked invite links for attribution.",
    signupUrl: "https://public.com",
    referralStyle: "query",
    referralParam: "invite",
    referralCode: "",
    live: false,
    typicalOffer: "Referral stock or credit when both sides qualify",
    assetTypes: "US stocks, ETFs; treasury / alternative products vary",
    strengths: "Clean onboarding, thematic investing UX",
    usAvailability: "US residents; product availability can vary by state.",
    riskNotes:
      "Social feeds are not investment advice. Verify fees and order types before sizing up.",
    whyJoin: "Hidden until a verified Public invite link is approved.",
    sortOrder: 3,
  },
  {
    id: "sofi-invest",
    name: "SoFi Invest",
    tagline: "Brokerage inside a broader fintech app",
    description:
      "SoFi’s investing product sits alongside banking and lending. Referral programs typically credit both parties after qualifying activity.",
    signupUrl: "https://www.sofi.com/invest",
    referralStyle: "query",
    referralParam: "referralCode",
    referralCode: "",
    live: false,
    typicalOffer: "Cash or credit for qualified SoFi referrals (program-dependent)",
    assetTypes: "US stocks, ETFs; crypto and other products depend on account type",
    strengths: "One app for banking + investing, member discounts when eligible",
    usAvailability: "US; banking and invest products have separate eligibility rules.",
    riskNotes:
      "Do not confuse cash-management yields with investment returns. Brokerage balances are still market risk.",
    whyJoin: "Hidden until a verified SoFi referral link is approved.",
    sortOrder: 4,
  },
  {
    id: "fidelity",
    name: "Fidelity",
    tagline: "Full-service US brokerage",
    description:
      "Major US brokerage with stocks, ETFs, mutual funds, and retirement accounts. Referral / advocate programs exist periodically—prefer a tracked invite URL when you have one.",
    signupUrl: "https://www.fidelity.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Advocate / referral credit when Fidelity’s live program allows it",
    assetTypes: "Stocks, ETFs, mutual funds, bonds, retirement accounts",
    strengths: "Deep research tools, strong brand, no account minimums on many accounts",
    usAvailability: "US residents and citizens; product set is broad.",
    riskNotes:
      "Mutual funds and complex products need their own fee and risk review. Not a get-rich-quick venue.",
    whyJoin: "Hidden until a verified Fidelity advocate / referral link is approved.",
    sortOrder: 5,
  },
  {
    id: "tastytrade",
    name: "tastytrade",
    tagline: "Options-focused US brokerage",
    description:
      "Brokerage oriented toward options and futures education. Affiliate or referral attribution is available when you are in their partner program.",
    signupUrl: "https://www.tastytrade.com",
    referralStyle: "query",
    referralParam: "referralCode",
    referralCode: "",
    live: false,
    typicalOffer: "Affiliate / referral payouts per tastytrade partner terms",
    assetTypes: "Stocks, options, futures (eligibility-dependent)",
    strengths: "Options tooling and education-first branding",
    usAvailability: "US; futures/options need approvals and may be state-limited.",
    riskNotes:
      "Options can expire worthless. Never size derivatives like cash-settled hobbies.",
    whyJoin: "Hidden until a verified tastytrade partner link is approved.",
    sortOrder: 6,
  },
  {
    id: "moomoo",
    name: "moomoo",
    tagline: "US brokerage with promo-heavy onboarding",
    description:
      "US investing app (Futu-related) that often runs deposit and referral promotions. Tracked invite links are required for credit.",
    signupUrl: "https://www.moomoo.com",
    referralStyle: "query",
    referralParam: "invite",
    referralCode: "",
    live: false,
    typicalOffer: "Shares or credits for qualified invites / deposits",
    assetTypes: "US stocks, ETFs, options (where approved)",
    strengths: "Competitive promotions, multi-market tooling",
    usAvailability: "US accounts available; confirm options eligibility.",
    riskNotes:
      "Promo stock often has lockups or deposit thresholds—read the fine print.",
    whyJoin: "Hidden until a verified moomoo invite link is approved.",
    sortOrder: 7,
  },
  {
    id: "etrade",
    name: "E*TRADE",
    tagline: "Morgan Stanley retail brokerage",
    description:
      "Established US brokerage under Morgan Stanley. Referral or advocate offers appear periodically—use only an official tracked link.",
    signupUrl: "https://us.etrade.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Referral / welcome credit when a live E*TRADE program is active",
    assetTypes: "Stocks, ETFs, options, mutual funds, retirement",
    strengths: "Mature platform, Power E*TRADE for active traders",
    usAvailability: "US; standard brokerage eligibility.",
    riskNotes:
      "Platform fees and margin rates matter for active traders. Investing is still loss-capable.",
    whyJoin: "Hidden until a verified E*TRADE referral link is approved.",
    sortOrder: 8,
  },
  {
    id: "charles-schwab",
    name: "Charles Schwab",
    tagline: "Full-service US brokerage & banking",
    description:
      "Large US brokerage with banking rails and retirement products. Referral programs exist in limited forms—prefer Schwab’s official tracked invite when available.",
    signupUrl: "https://www.schwab.com",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: false,
    typicalOffer: "Referral credit when Schwab’s current advocate program pays",
    assetTypes: "Stocks, ETFs, funds, banking, retirement",
    strengths: "Branch + digital support, thinkorswim for active trading",
    usAvailability: "US; broad product availability.",
    riskNotes:
      "Bank products and brokerage products have different protections—know which bucket holds cash.",
    whyJoin: "Hidden until a verified Schwab referral link is approved.",
    sortOrder: 9,
  },
  {
    id: "firstrade",
    name: "Firstrade",
    tagline: "Low-cost US brokerage",
    description:
      "US online brokerage with commission-free US stock/ETF trading and occasional referral promotions.",
    signupUrl: "https://www.firstrade.com",
    referralStyle: "query",
    referralParam: "referral",
    referralCode: "",
    live: false,
    typicalOffer: "Referral rewards when Firstrade’s live promo allows it",
    assetTypes: "US stocks, ETFs, options, mutual funds",
    strengths: "Simple fee story, fractional shares on many names",
    usAvailability: "US residents; confirm options approval path.",
    riskNotes:
      "Thinner research tooling than mega-brokers—do your own homework.",
    whyJoin: "Hidden until a verified Firstrade referral link is approved.",
    sortOrder: 10,
  },
];

/** Live partners only — empty keeps /stocks private. */
export function getLiveStockReferrals(): StockReferral[] {
  return STOCK_REFERRALS.filter((s) => s.live)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllStockReferrals(): StockReferral[] {
  return STOCK_REFERRALS.slice().sort((a, b) => a.sortOrder - b.sortOrder);
}

export function isStockDeskPublic(): boolean {
  return getLiveStockReferrals().length > 0;
}
