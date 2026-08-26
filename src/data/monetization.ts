/**
 * How GetFreeBit earns — single source for the transparency page and desk footers.
 * Rankings are documented separately in comparison-methodology.ts.
 */

export type RevenueStream = {
  id: string;
  title: string;
  body: string;
};

export const MONETIZATION_PATH = "/how-we-make-money";

/** Required independence statement — shown on transparency page and comparison desks */
export const RANKING_INDEPENDENCE_STATEMENT =
  "Our revenue relationships do not determine our rankings.";

export const MONETIZATION_PAGE = {
  path: MONETIZATION_PATH,
  title: "How GetFreeBit Makes Money",
  h1: "How GetFreeBit makes money",
  metaDescription:
    "Affiliate commissions, advertising, sponsorships, and donations—how GetFreeBit earns and why rankings are not for sale.",
  lede:
    "Crypto sites hide incentives behind “best of” lists. We publish ours. You should know how we earn before you click a partner link.",
  independenceStatement: RANKING_INDEPENDENCE_STATEMENT,
  independenceDetail:
    "List order on comparison desks follows published criteria—US accessibility, product fit for our readers, link verification status, and editorial risk notes—not who pays the highest commission. A partner can rank lower than a non-partner if we have no verified link or the product is a poor fit for US earners. We do not accept payment for placement.",
  lastUpdated: "2026-08-26",
};

export const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: "affiliate",
    title: "Affiliate & referral commissions",
    body: "When you register, buy, or subscribe through our verified partner links (exchanges, faucets, hardware wallets, tax tools, cards), we may earn a referral fee or revenue share at no extra cost to you. Links are marked sponsored where applicable. Some programs are code-only (e.g. Bybit Card invite codes)—we show the code instead of inventing a fake tracked URL.",
  },
  {
    id: "advertising",
    title: "Display advertising",
    body: "Banner and inline ad slots may run third-party ad networks when configured. Ad inventory is separate from editorial rankings. When a network script is not loaded, slots may show a disclosed partner fallback—not a paid ranking.",
  },
  {
    id: "sponsorships",
    title: "Sponsorships",
    body: "We may publish sponsored guides or desk placements when a brand pays for defined coverage. Sponsored content will be labeled clearly at the top of the page. Sponsorship does not change sort order on unrelated comparison desks.",
  },
  {
    id: "donations",
    title: "Donations",
    body: "Readers can support hosting and writing via Bitcoin or PayPal on our About page. Donations do not unlock placement, higher rankings, or editorial favors.",
  },
  {
    id: "referral-relationships",
    title: "Referral relationships",
    body: "We maintain accounts with affiliate networks (e.g. Impact) and direct partner programs. Approval status affects whether a link is live on a desk—not where a product ranks when multiple live links exist. Hidden entries stay in our data files until a link is verified; they are not shown to readers.",
  },
];

export const TRANSPARENCY_FAQ = [
  {
    q: "Do you rank partners higher because they pay more?",
    a: "No. " + RANKING_INDEPENDENCE_STATEMENT + " See each desk’s methodology block for the exact sort criteria.",
  },
  {
    q: "Why is the first item not labeled “#1 Best”?",
    a: "Position numbers describe list order under our criteria—not a quality trophy. We explain why each item appears where it does.",
  },
  {
    q: "What if a partner link is broken or outdated?",
    a: "Report it on our corrections log. We log factual fixes publicly after verification.",
  },
  {
    q: "Can brands pay to be added?",
    a: "We add products that fit our pillars and US-earner audience. Payment for placement is not offered. Sponsored pages are labeled separately.",
  },
];
