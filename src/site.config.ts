/**
 * Central site configuration — GetFreeBit.com
 * Brand, domain, colors, affiliates, Search Console, and primary nav live here.
 */

export type NavLink = {
  href: string;
  label: string;
};

export type AdSlotType = "banner" | "sidebar" | "inline";

export type AdNetworkConfig = {
  /** Unique key / placement id from the network */
  key: string;
  /** External invoke script URL */
  scriptSrc: string;
  /** iframe | container — how the network paints into the slot */
  format?: "iframe" | "container";
  width?: number;
  height?: number;
  /** DOM id the network expects (e.g. container-* divs) */
  containerId?: string;
  /** Extra params passed to atOptions-style configs */
  params?: Record<string, unknown>;
  /** Load script with async + data-cfasync="false" when true */
  async?: boolean;
  cfAsyncFalse?: boolean;
  minHeight?: number;
};

export type AffiliateOffer = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  eyebrow?: string;
  /** User-facing perk when using our referral link */
  benefit?: string;
  /** Partner category for comparison tables */
  category?: AffiliateCategory;
};

export type AffiliateCategory =
  | "exchanges"
  | "faucets"
  | "hardware"
  | "cards"
  | "web3-tools";

export type ContentPillar =
  | "faucets-micro"
  | "airdrop-testnet"
  | "staking-yield"
  | "exchange-onboarding";

/** Brand palette — cool slate + teal complement, warm amber accent dash */
export type BrandColors = {
  ink: string;
  inkMuted: string;
  paper: string;
  paperRaised: string;
  paperLine: string;
  voice: string;
  voiceDark: string;
  voiceGlow: string;
  signal: string;
  signalDark: string;
  signalGlow: string;
};

/** Desktop ad network slots (leave keys empty until you have placements). */
const desktopNetworks = {
  banner: {
    key: "",
    scriptSrc: "",
    format: "iframe" as const,
    width: 468,
    height: 60,
    minHeight: 60,
    params: {},
  },
  sidebar: {
    key: "",
    scriptSrc: "",
    format: "container" as const,
    containerId: "",
    minHeight: 90,
    async: true,
    cfAsyncFalse: true,
  },
  inline: {
    key: "",
    scriptSrc: "",
    format: "container" as const,
    containerId: "",
    minHeight: 90,
    async: true,
    cfAsyncFalse: true,
  },
} satisfies Record<AdSlotType, AdNetworkConfig>;

/** Mobile ad network slots */
const mobileNetworks = {
  banner: {
    key: "",
    scriptSrc: "",
    format: "iframe" as const,
    width: 160,
    height: 300,
    minHeight: 300,
    params: {},
    cfAsyncFalse: true,
  },
  sidebar: {
    key: "",
    scriptSrc: "",
    format: "iframe" as const,
    width: 160,
    height: 600,
    minHeight: 600,
    params: {},
    cfAsyncFalse: true,
  },
  inline: {
    key: "",
    scriptSrc: "",
    format: "iframe" as const,
    width: 160,
    height: 600,
    minHeight: 600,
    params: {},
    cfAsyncFalse: true,
  },
} satisfies Record<AdSlotType, AdNetworkConfig>;

/**
 * Verified partner slots — replace href with live referral URLs before publish.
 * Keep benefits honest; never invent unverified token claims.
 */
const partners = [
  {
    id: "binance-us",
    category: "exchanges" as const,
    title: "Binance.US",
    description: "US-domiciled Binance venue for spot onboarding after micro-earnings or fiat deposits.",
    href: "https://www.binance.us/universal_JHHGDSKDJ/auth/registration?ref=614844993",
    cta: "Sign up on Binance.US",
    eyebrow: "Exchanges",
    benefit: "Referral fee discounts when you register via our link",
  },
  {
    id: "faucetpay",
    category: "faucets" as const,
    title: "FaucetPay",
    description: "Micro-wallet routing for faucet and micro-earning payouts.",
    href: "https://faucetpay.io/r/10121236",
    cta: "Open FaucetPay",
    eyebrow: "Faucets",
    benefit: "Lifetime referral share on claims when you register via our link",
  },
  {
    id: "cointiply",
    category: "faucets" as const,
    title: "Cointiply",
    description: "Faucet + offerwall super-app for US micro-earners.",
    href: "https://cointiply.mobi/ERGWvv",
    cta: "Join Cointiply",
    eyebrow: "Faucets",
    benefit: "Lifetime referral share on faucet and offerwall earnings",
  },
  {
    id: "trezor",
    category: "hardware" as const,
    title: "Trezor",
    description: "Hardware wallet security for self-custody after exchange onboarding.",
    href: "http://trezorio.refr.cc/default/u/nickmancuso",
    cta: "Shop Trezor",
    eyebrow: "Security",
    benefit: "Partner pricing when you buy through our verified link",
  },
  {
    id: "keystone",
    category: "hardware" as const,
    title: "Keystone",
    description: "Air-gapped hardware wallet option for operators who prefer QR signing flows.",
    href: "https://keyst.one/?rfsn=9299839.3a7209&utm_source=refersion&utm_medium=affiliate&utm_campaign=9299839.3a7209",
    cta: "Shop Keystone",
    eyebrow: "Security",
    benefit: "Affiliate pricing via Refersion when you purchase through our link",
  },
  {
    id: "nexo",
    category: "cards" as const,
    title: "Nexo",
    description: "Crypto credit and earn products—read lockups and liquidation rules before sizing.",
    href: "https://nexo.com/ref/c4bhusmlq3?src=web-link",
    cta: "Join Nexo",
    eyebrow: "Cards & banking",
    benefit: "Referral perks when you register via our link",
  },
  {
    id: "tradingview",
    category: "web3-tools" as const,
    title: "TradingView",
    description: "Charts and alerts for operators tracking markets around earn and yield decisions.",
    href: "https://www.tradingview.com/pricing/?share_your_love=vanethrane",
    cta: "Try TradingView",
    eyebrow: "Tools",
    benefit: "Support GetFreeBit when you upgrade via our share link",
  },
  {
    id: "koinly",
    category: "web3-tools" as const,
    title: "Koinly",
    description: "Tax and portfolio tracking for airdrop and DeFi activity.",
    href: "https://koinly.io/?via=C721A606&utm_source=affiliate",
    cta: "Start with Koinly",
    eyebrow: "Tools",
    benefit: "Subscription discounts via partner checkout when available",
  },
  {
    id: "cointracking",
    category: "web3-tools" as const,
    title: "CoinTracking",
    description: "Power-user portfolio journal and tax exports.",
    href: "https://cointracking.info?ref=V482449",
    cta: "Open CoinTracking",
    eyebrow: "Tools",
    benefit: "Affiliate plan perks when you register via our link",
  },
] as const satisfies readonly AffiliateOffer[];

export const siteConfig = {
  /** Display name (header, footer, metadata, PWA) */
  name: "GetFreeBit",

  /** Short slug for storage keys, cache prefixes, download filenames */
  slug: "getfreebit",

  /** Canonical origin — no trailing slash */
  domain: "https://www.getfreebit.com",

  /** Public contact email (contact page, mailto forms, PayPal donate fallback) */
  contactEmail: "vanethrane@gmail.com",

  /** One-line product pitch */
  tagline: "Faucets, yield, and Web3—explained like an operator, not a hype reel.",

  /** Home hero — brand kicker + two-line headline */
  heroEyebrow: "GetFreeBit",
  heroTitleLead: "Free crypto,",
  heroTitleAccent: "zero theater.",

  /** Default meta description */
  description:
    "Straight talk on faucets, airdrops, staking, and exchange onboarding. Real mechanics, risk callouts, and disclosed partner links—no get-rich-quick theater.",

  /** Mission — footer and brand surfaces */
  footerBlurb:
    "A free resource for the crypto community—plain-English guides so anyone can earn, secure, and navigate Web3 without the hype.",

  /**
   * Home mission + optional donations. Leave bitcoinAddress empty until you have a receive address.
   * PayPal uses a donate link to the public contact email when paypalUrl is empty.
   */
  donations: {
    eyebrow: "Our mission",
    title: "Free for the community. Built for operators.",
    body:
      "GetFreeBit is a free public resource for the crypto community—guides, how-tos, and desks that explain faucets, yield, and Web3 in plain English. No membership wall. No get-rich-quick theater. Just mechanics, risk callouts, and paths you can actually follow.",
    supportTitle: "Keep the desk online",
    supportBody:
      "If a guide saved you time, fees, or a costly mistake, chip in. Donations help cover hosting, research, and writing so the library stays free for the next reader.",
    /** On-chain BTC receive address — paste when ready */
    bitcoinAddress: "",
    /** Full PayPal donate / paypal.me URL. Empty → donate link to siteConfig.contactEmail */
    paypalUrl: "https://paypal.me/technivorous",
    bitcoinLabel: "Donate Bitcoin",
    paypalLabel: "Donate with PayPal",
  },

  /**
   * Required on monetized pages and tool outputs.
   */
  affiliateDisclosure:
    "GetFreeBit earns a referral commission when you register via our verified partner links at no additional cost to you.",

  /** Content pillars — every guide/tool should map to one */
  pillars: [
    {
      id: "faucets-micro" as const satisfies ContentPillar,
      label: "Guides",
      href: "/guides",
      summary: "How blockchain, tokens, DeFi, and security models actually work.",
    },
    {
      id: "airdrop-testnet" as const satisfies ContentPillar,
      label: "How-tos",
      href: "/how-to",
      summary: "Wallets, swaps, bridges, staking, and security procedures.",
    },
    {
      id: "staking-yield" as const satisfies ContentPillar,
      label: "News",
      href: "/news",
      summary: "Regulation, institutions, and protocol shifts with operator context.",
    },
    {
      id: "exchange-onboarding" as const satisfies ContentPillar,
      label: "Start here",
      href: "/how-to/how-to-create-your-first-self-custody-crypto-wallet",
      summary: "Create a self-custody wallet the careful way—then explore the rest.",
    },
  ],

  /** Partner catalog for guides, tables, and CTAs */
  partners,

  /**
   * Google Search Console HTML tag verification content.
   * Leave empty until you have a property; layout emits the meta when set.
   */
  googleSearchConsoleId: "",

  /** Impact.com site verification (meta name=impact-site-verification). */
  impactSiteVerification: "c48ddf07-85cc-4f1e-9e7a-3f91dcb64410",

  /** Primary header navigation */
  primaryNav: [
    { href: "/guides", label: "Guides" },
    { href: "/how-to", label: "How-tos" },
    { href: "/faucets", label: "Faucets" },
    { href: "/exchanges", label: "Exchanges" },
    { href: "/news", label: "News" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const satisfies readonly NavLink[],

  /** Footer product column */
  footerProductNav: [
    { href: "/", label: "Home" },
    { href: "/guides", label: "Guides" },
    { href: "/how-to", label: "How-tos" },
    { href: "/faucets", label: "Faucet referrals" },
    { href: "/exchanges", label: "Exchange referrals" },
    { href: "/tools/tax", label: "Tax tools" },
    { href: "/news", label: "News" },
    { href: "/about", label: "About" },
  ] as const satisfies readonly NavLink[],

  /** Footer trust / legal column */
  footerTrustNav: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ] as const satisfies readonly NavLink[],

  /** Cool slate + teal complement — warm amber accent */
  colors: {
    ink: "#0a1018",
    inkMuted: "#526070",
    paper: "#e4eaf2",
    paperRaised: "#f8fafc",
    paperLine: "#c5d0dc",
    voice: "#c9842a",
    voiceDark: "#9a6410",
    voiceGlow: "#f2e6cc",
    signal: "#1a6b5c",
    signalDark: "#124a42",
    signalGlow: "#d6ebe6",
  } satisfies BrandColors,

  /**
   * Approximate monthly visits used by AdSlot’s minTrafficRequired gate.
   */
  estimatedMonthlyVisits: 0,

  /** When true, AdSlot always prefers network scripts over affiliate fallbacks. */
  forceNetworkAds: false,

  ads: {
    networks: desktopNetworks,
    networksMobile: mobileNetworks,

    reservedHeight: {
      banner: 60,
      sidebar: 250,
      inline: 90,
    } satisfies Record<AdSlotType, number>,

    reservedHeightMobile: {
      banner: 300,
      sidebar: 600,
      inline: 600,
    } satisfies Record<AdSlotType, number>,

    affiliateFallback: {
      banner: {
        id: "faucetpay-banner",
        eyebrow: "Micro-earnings",
        title: "Route faucet payouts with FaucetPay",
        description:
          "Set up a micro-wallet once, then compare time-vs-reward across legitimate faucets.",
        href: "https://faucetpay.io/r/10121236",
        cta: "Open FaucetPay",
        benefit: "Lifetime referral share on claims via our link",
        category: "faucets",
      },
      sidebar: {
        id: "exchange-sidebar",
        eyebrow: "Onboarding",
        title: "Binance.US registration",
        description:
          "US-domiciled venue for spot buys—confirm state eligibility and withdraw to self-custody.",
        href: "https://www.binance.us/universal_JHHGDSKDJ/auth/registration?ref=614844993",
        cta: "Sign up on Binance.US",
        benefit: "Referral fee discounts when you register via our link",
        category: "exchanges",
      },
      inline: {
        id: "tax-inline",
        eyebrow: "Tax tools",
        title: "Prep crypto taxes with Koinly",
        description:
          "Import exchanges and wallets, then draft reports—reconcile large txs before filing.",
        href: "https://koinly.io/?via=C721A606&utm_source=affiliate",
        cta: "Start with Koinly",
        benefit: "Partner discounts when available",
        category: "web3-tools",
      },
    } satisfies Record<AdSlotType, AffiliateOffer>,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL helper */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.domain.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** CSS custom properties string for :root (inline critical + globals). */
export function brandCssVariables(): string {
  const c = siteConfig.colors;
  return [
    `--ink:${c.ink}`,
    `--ink-muted:${c.inkMuted}`,
    `--paper:${c.paper}`,
    `--paper-raised:${c.paperRaised}`,
    `--paper-line:${c.paperLine}`,
    `--voice:${c.voice}`,
    `--voice-dark:${c.voiceDark}`,
    `--voice-glow:${c.voiceGlow}`,
    `--signal:${c.signal}`,
    `--signal-dark:${c.signalDark}`,
    `--signal-glow:${c.signalGlow}`,
  ].join(";");
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function getAdNetwork(slotType: AdSlotType, mobile?: boolean): AdNetworkConfig {
  const useMobile = mobile ?? isMobileViewport();
  return useMobile
    ? siteConfig.ads.networksMobile[slotType]
    : siteConfig.ads.networks[slotType];
}

export function getReservedHeight(slotType: AdSlotType, mobile?: boolean): number {
  const useMobile = mobile ?? isMobileViewport();
  return useMobile
    ? siteConfig.ads.reservedHeightMobile[slotType]
    : siteConfig.ads.reservedHeight[slotType];
}

/** True when a slot has a usable network script in site.config. */
export function hasAdNetworkScript(slotType: AdSlotType): boolean {
  const network = getAdNetwork(slotType);
  return Boolean(network?.scriptSrc && network?.key);
}

export function getPartnersByCategory(category: AffiliateCategory): AffiliateOffer[] {
  return siteConfig.partners.filter((p) => p.category === category);
}
