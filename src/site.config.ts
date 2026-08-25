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

/** Brand palette — wired into CSS variables, Tailwind, OG, and PWA theme. */
export type BrandColors = {
  ink: string;
  inkMuted: string;
  paper: string;
  paperRaised: string;
  paperLine: string;
  voice: string;
  voiceDark: string;
  voiceGlow: string;
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
    id: "binance",
    category: "exchanges" as const,
    title: "Binance",
    description: "Tier-1 exchange onboarding with deep liquidity and frequent promotions.",
    href: "/guides",
    cta: "Compare exchange bonuses",
    eyebrow: "Exchanges",
    benefit: "Welcome bonuses and trading-fee perks via verified partner links",
  },
  {
    id: "bybit",
    category: "exchanges" as const,
    title: "Bybit",
    description: "Derivatives-friendly Tier-1 with card and deposit campaigns.",
    href: "/guides",
    cta: "See Bybit offers",
    eyebrow: "Exchanges",
    benefit: "Signup and deposit bonuses when available",
  },
  {
    id: "faucetpay",
    category: "faucets" as const,
    title: "FaucetPay",
    description: "Micro-wallet routing for faucet and micro-earning payouts.",
    href: "/faucets",
    cta: "Browse US faucet referrals",
    eyebrow: "Faucets",
    benefit: "Lifetime referral share on claims when you register via our link",
  },
  {
    id: "ledger",
    category: "hardware" as const,
    title: "Ledger",
    description: "Hardware wallet security for self-custody after exchange onboarding.",
    href: "/guides",
    cta: "Review hardware wallets",
    eyebrow: "Security",
    benefit: "Partner pricing when you buy through our verified link",
  },
  {
    id: "crypto-com-card",
    category: "cards" as const,
    title: "Crypto.com Card",
    description: "Crypto debit / cashback cards for everyday spend.",
    href: "/guides",
    cta: "Compare crypto cards",
    eyebrow: "Cards",
    benefit: "Card and deposit promotions when offered",
  },
  {
    id: "koinly",
    category: "web3-tools" as const,
    title: "Koinly",
    description: "Tax and portfolio tracking for airdrop and DeFi activity.",
    href: "/guides",
    cta: "Track Web3 activity",
    eyebrow: "Tools",
    benefit: "Subscription discounts via partner checkout when available",
  },
] as const satisfies readonly AffiliateOffer[];

export const siteConfig = {
  /** Display name (header, footer, metadata, PWA) */
  name: "GetFreeBit",

  /** Short slug for storage keys, cache prefixes, download filenames */
  slug: "getfreebit",

  /** Canonical origin — no trailing slash */
  domain: "https://www.getfreebit.com",

  /** One-line product pitch */
  tagline: "Free crypto, yield, and Web3—explained like an operator, not a hype reel.",

  /** Default meta description */
  description:
    "Straight talk on faucets, airdrops, staking, and exchange onboarding. Real mechanics, risk callouts, and disclosed partner links—no get-rich-quick theater.",

  /** Longer footer blurb */
  footerBlurb:
    "Operator-grade playbooks for micro-earnings, testnet farming, yield, and Web3 onboarding. Educate first. Disclose always. Hype never.",

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

  /** Cool slate + bullion amber — sharp, not neon */
  colors: {
    ink: "#0b1016",
    inkMuted: "#5c6775",
    paper: "#eef1f5",
    paperRaised: "#ffffff",
    paperLine: "#d0d7e0",
    voice: "#d4922a",
    voiceDark: "#a66b12",
    voiceGlow: "#f4e6c8",
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
        href: "/faucets",
        cta: "Open faucet referrals",
        benefit: "Lifetime referral share on claims via our link",
        category: "faucets",
      },
      sidebar: {
        id: "exchange-sidebar",
        eyebrow: "Onboarding",
        title: "Tier-1 exchange bonuses",
        description:
          "Compare signup and fee perks from verified partners—always with risk notes.",
        href: "/guides",
        cta: "Compare exchanges",
        benefit: "Welcome bonuses when you register via verified links",
        category: "exchanges",
      },
      inline: {
        id: "yield-inline",
        eyebrow: "Yield",
        title: "Risk-adjusted staking & savings",
        description:
          "Native staking, LSDs, and lending—with lockups, smart-contract risk, and APY context.",
        href: "/guides",
        cta: "Browse yield guides",
        benefit: "Partner tools for tracking and tax when needed",
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
