/**
 * Crypto tax / portfolio tools with affiliate programs.
 * Set `live: true` and a full tracked `signupUrl` when approved.
 */
export type TaxToolReferral = {
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
  bestFor: string;
  pricingNotes: string;
  usAvailability: string;
  riskNotes: string;
  whyJoin: string;
  sortOrder: number;
};

export const TAX_TOOL_REFERRALS: TaxToolReferral[] = [
  {
    id: "koinly",
    name: "Koinly",
    tagline: "Importer-first tax reports",
    description:
      "Connect exchanges and wallets, review cost-basis methods, and export IRS-ready reports. Strong default for earners with faucet + CEX + occasional DeFi activity.",
    signupUrl: "https://koinly.io/?via=C721A606&utm_source=affiliate",
    referralStyle: "query",
    referralParam: "via",
    referralCode: "",
    live: true,
    typicalOffer: "Subscription discount via partner checkout when available",
    bestFor: "Mixed CEX / wallet / airdrop activity under a few thousand txs",
    pricingNotes: "Plans scale by transaction count—audit your year before buying a tier",
    usAvailability: "Supports US tax forms; confirm current form coverage at checkout.",
    riskNotes:
      "Imports can mis-classify transfers as taxable sales. Always reconcile large txs against explorers before filing.",
    whyJoin:
      "Fastest path from exchange CSVs + wallets to draft US reports—use our affiliate link at signup.",
    sortOrder: 1,
  },
  {
    id: "cointracking",
    name: "CoinTracking",
    tagline: "Power-user portfolio + tax",
    description:
      "Long-running tracker with detailed trade journals and tax exports. Fits operators who want audit trails beyond a once-a-year filing season.",
    signupUrl: "https://cointracking.info?ref=V482449",
    referralStyle: "query",
    referralParam: "ref",
    referralCode: "",
    live: true,
    typicalOffer: "Affiliate share / plan perk when partnered",
    bestFor: "High trade volume and traders who already keep CSV discipline",
    pricingNotes: "Free tier limited; paid unlocks higher trade caps",
    usAvailability: "Tax report templates for multiple jurisdictions including US.",
    riskNotes:
      "CSV hygiene matters—garbage imports produce garbage cost basis. Spot-check FIFO/HIFO settings against your method.",
    whyJoin:
      "Deep trade journals and multi-jurisdiction reports—strong when you already export CSVs habitually.",
    sortOrder: 2,
  },
  {
    id: "coinledger",
    name: "CoinLedger",
    tagline: "Guided crypto tax software",
    description:
      "Step-by-step import wizard with exchange and wallet connectors.",
    signupUrl: "https://coinledger.io",
    referralStyle: "query",
    referralParam: "via",
    referralCode: "",
    live: false,
    typicalOffer: "Plan discounts via affiliate link when approved",
    bestFor: "Users who want a wizard UX and clearer plan tiers",
    pricingNotes: "Transaction-band pricing; free preview before upgrade",
    usAvailability: "US Form 8949 / Schedule D oriented reports—verify current year support.",
    riskNotes:
      "DeFi and NFT paths still need manual review. Software is not a CPA substitute for complex situations.",
    whyJoin: "Hidden until a verified CoinLedger partner link is approved.",
    sortOrder: 3,
  },
];

export function getTaxToolReferrals(): TaxToolReferral[] {
  return [...TAX_TOOL_REFERRALS]
    .filter((t) => t.live)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTaxToolReferral(id: string): TaxToolReferral | undefined {
  return TAX_TOOL_REFERRALS.find((t) => t.id === id && t.live);
}
