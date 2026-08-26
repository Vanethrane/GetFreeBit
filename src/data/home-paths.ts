/**
 * Curated home-page paths — high-intent SEO entries and soft routing to monetized desks.
 * Edit here to reorder what appears above the fold.
 */
export type HomePathKind = "earn" | "do" | "learn";

export type HomePath = {
  id: string;
  label: string;
  description: string;
  href: string;
  kind: HomePathKind;
};

/** Above-the-fold grid — mix earn + top procedural/educational intents */
export const HOME_POPULAR_PATHS: HomePath[] = [
  {
    id: "faucet-desk",
    label: "Faucet desk",
    description: "US micro-earning platforms",
    href: "/faucets",
    kind: "earn",
  },
  {
    id: "first-wallet",
    label: "First wallet",
    description: "Self-custody setup",
    href: "/how-to/how-to-create-your-first-self-custody-crypto-wallet",
    kind: "do",
  },
  {
    id: "faucetpay",
    label: "FaucetPay routing",
    description: "Batch faucet payouts",
    href: "/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts",
    kind: "earn",
  },
  {
    id: "staking",
    label: "Staking yield",
    description: "How rewards are paid",
    href: "/guides/what-crypto-staking-is-and-how-yield-is-generated",
    kind: "learn",
  },
  {
    id: "airdrops",
    label: "Airdrop eligibility",
    description: "What protocols measure",
    href: "/guides/airdrop-eligibility-what-protocols-actually-measure",
    kind: "learn",
  },
  {
    id: "points-tge",
    label: "Points & TGE",
    description: "Leaderboard expectations",
    href: "/guides/points-programs-and-tge-expectations",
    kind: "learn",
  },
  {
    id: "exchange-desk",
    label: "Exchange desk",
    description: "US CEX referrals",
    href: "/exchanges",
    kind: "earn",
  },
  {
    id: "buy-crypto",
    label: "Buy with fiat",
    description: "CEX onboarding",
    href: "/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency",
    kind: "do",
  },
  {
    id: "tax-desk",
    label: "Tax tools",
    description: "Koinly & CoinLedger",
    href: "/tools/tax",
    kind: "do",
  },
  {
    id: "dex-swap",
    label: "DEX swaps",
    description: "Swap tokens safely",
    href: "/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens",
    kind: "do",
  },
  {
    id: "gas-fees",
    label: "Gas fees",
    description: "Congestion & priority",
    href: "/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion",
    kind: "learn",
  },
];

/** Procedural picks — “most searched” operator tasks */
export const HOME_OPERATOR_PICKS: HomePath[] = [
  {
    id: "seed-backup",
    label: "Back up a seed phrase",
    description: "Offline redundancy",
    href: "/how-to/how-to-safely-store-and-back-up-your-seed-phrase",
    kind: "do",
  },
  {
    id: "faucet-routine",
    label: "Daily faucet routine (US)",
    description: "Timer discipline",
    href: "/how-to/how-to-run-a-daily-crypto-faucet-routine-in-the-us",
    kind: "earn",
  },
  {
    id: "phishing",
    label: "Avoid phishing & scams",
    description: "Wallet drain patterns",
    href: "/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams",
    kind: "do",
  },
  {
    id: "revoke",
    label: "Revoke token approvals",
    description: "Clean allowances",
    href: "/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits",
    kind: "do",
  },
  {
    id: "compare-apy",
    label: "Compare staking APY",
    description: "Risk-adjust yields",
    href: "/how-to/how-to-compare-staking-and-savings-apy-without-chasing-headlines",
    kind: "learn",
  },
  {
    id: "testnet-farm",
    label: "Farm testnets safely",
    description: "Burn wallet hygiene",
    href: "/how-to/how-to-farm-testnets-for-potential-airdrops-safely",
    kind: "learn",
  },
];

export type HomeDeskLink = {
  href: string;
  label: string;
  summary: string;
  count?: string;
};

export const HOME_DESK_LINKS: HomeDeskLink[] = [
  {
    href: "/guides",
    label: "Guides",
    summary: "How crypto systems work",
  },
  {
    href: "/how-to",
    label: "How-tos",
    summary: "Step-by-step procedures",
  },
  {
    href: "/faucets",
    label: "Faucets",
    summary: "US referral desk",
  },
  {
    href: "/exchanges",
    label: "Exchanges",
    summary: "US onboarding desk",
  },
  {
    href: "/cards",
    label: "Cards",
    summary: "Bybit Card code & more",
  },
  {
    href: "/tools/tax",
    label: "Tax tools",
    summary: "Importers & reports",
  },
  {
    href: "/news",
    label: "News",
    summary: "Institutions & policy",
  },
];
