/**
 * Crypto cards & banking partners.
 * Prefer full tracked URLs. Bybit Card is code-only (RA1PNLO) — show the code in UI.
 */
export type CardReferral = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Official product / apply URL */
  signupUrl: string;
  live: boolean;
  /**
   * When set with codeOnly, users must enter this during application.
   * Never invent a fake tracked URL.
   */
  referralCode: string;
  codeOnly: boolean;
  typicalOffer: string;
  usAvailability: string;
  riskNotes: string;
  whyJoin: string;
  sortOrder: number;
};

export const CARD_REFERRALS: CardReferral[] = [
  {
    id: "bybit-card",
    name: "Bybit Card",
    tagline: "Crypto debit via Bybit (invite code)",
    description:
      "Apply for the Bybit Card on Bybit’s official flow. This program attributes referrals by invite code only—there is no separate tracked affiliate URL to click.",
    signupUrl: "https://www.bybit.com/en/cards",
    live: true,
    referralCode: "RA1PNLO",
    codeOnly: true,
    typicalOffer: "Card referral rewards when eligibility and spend conditions are met (verify live terms)",
    usAvailability:
      "Card eligibility is country-restricted. Many US residents are not eligible—confirm on Bybit before applying. Do not use a VPN to fake residency.",
    riskNotes:
      "Custodial spend product—enable 2FA, read fees and FX markups, and confirm the invite code appears before you submit the application (Bybit locks it after submit).",
    whyJoin:
      "If Bybit Card is available where you live and you already use Bybit, apply with our invite code so the referral attributes correctly.",
    sortOrder: 1,
  },
  {
    id: "nexo",
    name: "Nexo",
    tagline: "Crypto credit & earn",
    description:
      "Borrow and earn products against crypto collateral—read liquidation rules carefully.",
    signupUrl: "https://nexo.com/ref/c4bhusmlq3?src=web-link",
    live: true,
    referralCode: "",
    codeOnly: false,
    typicalOffer: "Referral perks via tracked link",
    usAvailability: "Product availability varies by state—confirm at signup.",
    riskNotes: "Lending and credit products can liquidate collateral. Size conservatively.",
    whyJoin: "Register with our tracked Nexo link when the product fit is clear.",
    sortOrder: 2,
  },
  {
    id: "wirex",
    name: "Wirex",
    tagline: "Crypto card & payments",
    description: "Card and payments stack—hidden until a verified partner link is approved.",
    signupUrl: "https://wirexapp.com",
    live: false,
    referralCode: "",
    codeOnly: false,
    typicalOffer: "Signup / card promotions when partnered",
    usAvailability: "Varies by country",
    riskNotes: "Confirm fees and residency before applying.",
    whyJoin: "Hidden until a verified Wirex partner link is approved.",
    sortOrder: 3,
  },
  {
    id: "crypto-com-card",
    name: "Crypto.com Card",
    tagline: "CRO-tier cashback card",
    description: "Cashback debit with CRO lockups—hidden until a verified partner link is approved.",
    signupUrl: "https://crypto.com",
    live: false,
    referralCode: "",
    codeOnly: false,
    typicalOffer: "Card and deposit promotions via Impact when live",
    usAvailability: "US availability varies heavily by state",
    riskNotes: "CRO lockups add price and opportunity cost.",
    whyJoin: "Hidden until a verified Crypto.com partner link is approved.",
    sortOrder: 4,
  },
];

export function getCardReferrals(): CardReferral[] {
  return [...CARD_REFERRALS].filter((c) => c.live).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCardReferral(id: string): CardReferral | undefined {
  return CARD_REFERRALS.find((c) => c.id === id && c.live);
}
