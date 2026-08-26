/**
 * Cluster-native faucet articles — unique intent per slug; cross-link siblings in copy.
 */

import type { SourceAttributionBlock } from "@/data/crypto-sources";

export type ClusterArticleSection = { heading: string; body: string };

export type ClusterArticle = {
  slug: string;
  clusterId: "bitcoin-faucets";
  title: string;
  h1: string;
  metaDescription: string;
  lede: string;
  sections: ClusterArticleSection[];
  relatedNodeIds: string[];
  sources?: SourceAttributionBlock[];
};

export const FAUCET_CLUSTER_SLUGS = [
  "what-is-a-bitcoin-faucet",
  "how-bitcoin-faucets-work",
  "how-faucet-payouts-work",
  "faucet-withdrawal-minimums",
  "faucet-earning-rates",
  "faucet-scams",
  "faucet-taxes",
  "faucet-vs-staking",
  "lightning-faucets",
] as const;

export type FaucetClusterSlug = (typeof FAUCET_CLUSTER_SLUGS)[number];

export const FAUCET_CLUSTER_ARTICLES: Record<FaucetClusterSlug, ClusterArticle> = {
  "what-is-a-bitcoin-faucet": {
    slug: "what-is-a-bitcoin-faucet",
    clusterId: "bitcoin-faucets",
    title: "What Is a Bitcoin Faucet?",
    h1: "What is a Bitcoin faucet?",
    metaDescription:
      "Bitcoin faucets pay tiny sats for captchas, ads, or timers—funded by ad revenue and referrals. How they work, what they are not, and where to go next.",
    lede: "A Bitcoin faucet is a site or app that drips satoshis to users in exchange for attention—usually ads, captchas, or short tasks. It is micro-income, not free money.",
    sections: [
      {
        heading: "The basic model",
        body: "Operators fund claims from advertising, affiliate revenue, and sometimes gambling-style side games. You complete an action; the platform credits an internal balance in sats or BTC-equivalent. Most US earners never touch on-chain Bitcoin until balances batch through a micro-wallet like FaucetPay or clear a withdrawal minimum. Read how that exit path works in [How faucet payouts work](/faucets/learn/how-faucet-payouts-work) and compare platforms in the [payout database](/faucets/payouts).",
      },
      {
        heading: "What faucets are not",
        body: "They are not mining, not staking, and not a substitute for employment. Headline “free bitcoin” ignores your time, reversal risk on offerwalls, and network fees at cash-out. Before you register anywhere, run the profitability scorecard in [Faucet vs mining](/guides/evaluating-crypto-faucets-time-vs-reward) and check withdrawal floors in [Faucet withdrawal minimums](/faucets/learn/faucet-withdrawal-minimums).",
      },
      {
        heading: "Where to go next in this cluster",
        body: "Understand mechanics ([How Bitcoin faucets work](/faucets/learn/how-bitcoin-faucets-work)), protect yourself ([Bitcoin faucet scams](/faucets/learn/faucet-scams)), and route payouts efficiently ([FaucetPay routing](/guides/how-faucetpay-routing-works-for-micro-earnings) + [Set up FaucetPay](/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts)). When you are ready to compare live thresholds, use the [referral desk](/faucets) and [payout database](/faucets/payouts)—always verify numbers on the official site before you size a routine.",
      },
    ],
    relatedNodeIds: [
      "how-bitcoin-faucets-work",
      "how-faucet-payouts-work",
      "faucet-withdrawal-minimums",
      "faucet-scams",
      "payout-database",
      "referral-desk",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/wallets.html",
        sourceNote: "Bitcoin amounts are denominated in BTC with satoshi-level precision (1e-8 BTC).",
        analysis:
          "Faucet UIs usually quote sats because whole numbers are easier for micro-payments than long BTC decimals.",
      },
    ],
  },

  "how-bitcoin-faucets-work": {
    slug: "how-bitcoin-faucets-work",
    clusterId: "bitcoin-faucets",
    title: "How Bitcoin Faucets Work",
    h1: "How Bitcoin faucets work",
    metaDescription:
      "Timers, captchas, ad slots, and referral loops—how Bitcoin faucets fund sats claims and credit your balance.",
    lede: "Every faucet is a small ad business with a ledger. Claims are cheap for the operator; your job is to see if the drip beats your time after fees.",
    sections: [
      {
        heading: "Claim loop",
        body: "You authenticate (email or account), pass a captcha or watch an ad, and receive a credited amount—often hourly or on a cooldown timer. Some sites add offerwalls (surveys, installs) with higher payouts and higher reversal risk. Log sustainable schedules using [Daily faucet routine (US)](/how-to/how-to-run-a-daily-crypto-faucet-routine-in-the-us); do not optimize for 24/7 clicking unless the math proves out in [Faucet earning rates](/faucets/learn/faucet-earning-rates).",
      },
      {
        heading: "Where the Bitcoin comes from",
        body: "Revenue pays the float: display ads, CPA offers, and house-edge games on legacy BTC sites. The operator maintains a hot wallet or custodial pool; your balance is IOU until withdrawal. That is why routing through FaucetPay often beats dozens of tiny on-chain exits—see [How faucet payouts work](/faucets/learn/how-faucet-payouts-work).",
      },
      {
        heading: "Failure modes",
        body: "Accounts ban for VPN abuse, multi-accounting, or ad-block conflicts. Balances stall below withdrawal minimums. Phishing clones steal credentials—bookmark from the [referral desk](/faucets), not search ads. Study red flags in [Bitcoin faucet scams](/faucets/learn/faucet-scams) before you connect payout addresses.",
      },
    ],
    relatedNodeIds: [
      "what-is-a-bitcoin-faucet",
      "how-faucet-payouts-work",
      "faucet-earning-rates",
      "faucet-scams",
      "daily-faucet-routine",
    ],
  },

  "how-faucet-payouts-work": {
    slug: "how-faucet-payouts-work",
    clusterId: "bitcoin-faucets",
    title: "How Faucet Payouts Work",
    h1: "How faucet payouts work",
    metaDescription:
      "Internal balances, FaucetPay batching, and on-chain Bitcoin withdrawals—how faucet payouts actually reach your wallet.",
    lede: "A “payout” can mean an internal credit, a FaucetPay deposit, or an on-chain TX. Each step has different fees and custody risk.",
    sections: [
      {
        heading: "Three exit paths",
        body: "1) Internal balance only until you hit a site minimum. 2) Micro-wallet routing (usually FaucetPay)—faucets push sats to your FaucetPay account; you batch before self-custody. 3) Direct on-chain BTC address—simple but often uneconomical for dust. Deep dive: [FaucetPay routing](/guides/how-faucetpay-routing-works-for-micro-earnings). Setup: [Set up FaucetPay](/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts).",
      },
      {
        heading: "Fees eat micro-balances",
        body: "Bitcoin miner fees are priced in sats per vbyte, not as a percent of amount sent. A 2,000-sat claim can cost more to withdraw on-chain than it is worth. Use the [Bitcoin fee calculator](/bitcoin-fee-calculator) with a realistic template before you broadcast. Minimums matter—see [Faucet withdrawal minimums](/faucets/learn/faucet-withdrawal-minimums).",
      },
      {
        heading: "Verify before you scale",
        body: "Run a two-week trial: log pending vs paid credits. Compare desk minimums in the [payout database](/faucets/payouts) against your live dashboard. If payouts stall, capture screenshots before opening tickets—wrong coin type is the usual culprit.",
      },
    ],
    relatedNodeIds: [
      "faucet-withdrawal-minimums",
      "faucetpay-routing",
      "setup-faucetpay",
      "payout-database",
      "referral-desk",
    ],
  },

  "faucet-withdrawal-minimums": {
    slug: "faucet-withdrawal-minimums",
    clusterId: "bitcoin-faucets",
    title: "Faucet Withdrawal Minimums",
    h1: "Faucet withdrawal minimums",
    metaDescription:
      "Why Bitcoin faucet withdrawal minimums trap dust, how FaucetPay lowers effective floors, and when waiting beats claiming.",
    lede: "Minimums are the silent killer of faucet ROI. A great hourly rate means nothing if you cannot exit without paying more in fees than you earned.",
    sections: [
      {
        heading: "Site minimum vs network minimum",
        body: "Every faucet sets its own withdrawal floor (often quoted in sats or BTC). Even after you clear that, the Bitcoin network requires a fee that makes tiny outputs uneconomical—dust rules may apply. Routing through FaucetPay aggregates drips so you exit once, not fifty times.",
      },
      {
        heading: "Compare before you commit",
        body: "Use the [payout database](/faucets/payouts) for published floors, then confirm on the live dashboard—operators change thresholds. Pair with [Faucet earning rates](/faucets/learn/faucet-earning-rates) so you know how many days of claims a minimum actually requires at your schedule.",
      },
      {
        heading: "When to walk away",
        body: "If projected days-to-minimum exceeds your patience and the site has no FaucetPay rail, skip it. Trapped dust is a lesson, not a failure—log it and shrink your stack. Profitability framing: [Faucet vs mining](/guides/evaluating-crypto-faucets-time-vs-reward).",
      },
    ],
    relatedNodeIds: ["how-faucet-payouts-work", "payout-database", "faucet-earning-rates", "setup-faucetpay"],
  },

  "faucet-earning-rates": {
    slug: "faucet-earning-rates",
    clusterId: "bitcoin-faucets",
    title: "Faucet Earning Rates",
    h1: "Faucet earning rates",
    metaDescription:
      "Realistic Bitcoin faucet sats per hour—how to estimate USD return without believing headline claim amounts.",
    lede: "Advertised “500 sats per roll” means little without cooldown length, captcha time, and withdrawal path. Measure dollars per hour, not coins per click.",
    sections: [
      {
        heading: "Build an honest hourly estimate",
        body: "Pick a sustainable schedule (e.g., 4 claims/day). Multiply sats per claim × claims × days, convert to USD with live spot, divide by minutes spent. Subtract expected offerwall chargebacks if you use surveys. Use the [sats-to-USD converter](/sats-to-usd) for spot checks.",
      },
      {
        heading: "Variables that move the rate",
        body: "BTC price changes USD value without changing sats earned. Promotional boosts expire. US geo may block high-paying offers while core faucet claims still work. Log a two-week trial—spreadsheet beats memory.",
      },
      {
        heading: "Compare to alternatives",
        body: "If hourly return loses to your next-best use of time, cut the stack. Read [Faucet vs mining](/guides/evaluating-crypto-faucets-time-vs-reward) and [Faucet vs staking](/faucets/learn/faucet-vs-staking) for framing—not as hype, but as time allocation. When math works, automate with [Daily faucet routine (US)](/how-to/how-to-run-a-daily-crypto-faucet-routine-in-the-us).",
      },
    ],
    relatedNodeIds: ["faucet-profitability", "faucet-vs-mining", "daily-faucet-routine", "what-is-a-bitcoin-faucet"],
  },

  "faucet-scams": {
    slug: "faucet-scams",
    clusterId: "bitcoin-faucets",
    title: "Bitcoin Faucet Scams",
    h1: "Bitcoin faucet scams",
    metaDescription:
      "Phishing faucets, fake multiply modes, and seed-phrase traps targeting micro-earners—red flags before you connect a payout address.",
    lede: "Scammers love faucet keywords because newcomers expect small amounts and click quickly. The scam is rarely the drip—it is the credential or key you hand over.",
    sections: [
      {
        heading: "Common patterns",
        body: "Typosquat domains that mimic Cointiply or FreeBitco.in. “Verify wallet” forms asking for a seed phrase. Telegram bots promising 10× multiply if you deposit first. Fake FaucetPay login pages linked from Discord. Bookmark only from the [referral desk](/faucets) and [payout database](/faucets/payouts).",
      },
      {
        heading: "Safe habits",
        body: "Faucets use email/password—never a BIP-39 seed on a claim form. Enable 2FA on FaucetPay and exchanges. Send a test amount before sizing withdrawals. Broader checklist: [How to spot crypto phishing](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
      },
      {
        heading: "If you already clicked",
        body: "Rotate passwords, revoke sessions, and pause payout addresses on external faucets until you confirm control. Report phishing domains when possible. Log corrections if our desk linked outdated info—see the [corrections log](/corrections).",
      },
    ],
    relatedNodeIds: ["what-is-a-bitcoin-faucet", "referral-desk", "setup-faucetpay", "how-faucet-payouts-work"],
  },

  "faucet-taxes": {
    slug: "faucet-taxes",
    clusterId: "bitcoin-faucets",
    title: "Bitcoin Faucet Taxes (US)",
    h1: "Faucet taxes (US)",
    metaDescription:
      "US tax basics for Bitcoin faucet micro-income—tracking sats received, cost basis, and when drips may be taxable events.",
    lede: "Micro-income is still income in many jurisdictions. Faucets are a recordkeeping problem long before they are a wealth strategy.",
    sections: [
      {
        heading: "What the IRS treats as taxable",
        body: "The IRS generally treats convertible virtual currency as property. Receiving crypto for services or rewards can be income at fair market value when received. Selling or swapping later triggers gain/loss on disposition. This is overview only—not tax advice.",
      },
      {
        heading: "Recordkeeping for drips",
        body: "Log date, platform, sats/BTC credited, USD spot at receipt, and fees on withdrawal. Spreadsheets work at faucet scale; tax software helps when you also use exchanges. See [How to prepare crypto taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes) for export habits.",
      },
      {
        heading: "GetFreeBit analysis",
        body: "Most faucet earners underestimate paperwork cost. If hourly USD is pennies, tax complexity may exceed benefit—factor that into Faucet earning rates and profitability guides honestly.",
      },
    ],
    relatedNodeIds: ["faucet-earning-rates", "faucet-profitability", "referral-desk"],
    sources: [
      {
        sourceId: "irs",
        url: "https://www.irs.gov/filing/digital-assets",
        sourceNote:
          "Digital assets may be reported on tax returns; receiving property in exchange for services can have tax consequences.",
        analysis:
          "We do not provide individualized tax advice. Consult a CPA and use software like partners listed on our tax tools desk when you file.",
      },
    ],
  },

  "faucet-vs-staking": {
    slug: "faucet-vs-staking",
    clusterId: "bitcoin-faucets",
    title: "Faucet vs Staking",
    h1: "Faucet vs staking",
    metaDescription:
      "Compare Bitcoin faucet time-and-attention earnings to crypto staking yield—different risks, lockups, and hourly math.",
    lede: "Faucets pay for active attention; staking pays for locked capital and protocol risk. They solve different problems.",
    sections: [
      {
        heading: "Time vs capital",
        body: "Faucets convert your hours into sats with captcha friction and custodial payout paths. Staking converts idle coins into yield with smart-contract or exchange counterparty risk and often lockups. Neither is “free”—compare risk-adjusted return, not headline APY.",
      },
      {
        heading: "Bitcoin-specific note",
        body: "Native BTC staking products are not the same as Ethereum-style staking; many “BTC yield” offers are wrapped or custodial. Faucets at least label themselves as micro-payments. Read [What is crypto staking](/guides/what-crypto-staking-is-and-how-yield-is-generated) for native vs marketing yield.",
      },
      {
        heading: "When each fits",
        body: "Faucets: learning wallets, micro-onboarding, referral builders with honest audiences. Staking: capital you can lock and monitor. If faucet hourly math fails, staking is not the automatic fix—often it is simply stop and buy spot on an exchange.",
      },
    ],
    relatedNodeIds: ["faucet-vs-mining", "faucet-earning-rates", "what-is-a-bitcoin-faucet"],
  },

  "lightning-faucets": {
    slug: "lightning-faucets",
    clusterId: "bitcoin-faucets",
    title: "Lightning Faucets",
    h1: "Lightning faucets",
    metaDescription:
      "Bitcoin Lightning faucets pay sats over LN—instant micro-payments with different custody and routing trade-offs.",
    lede: "Lightning faucets pay invoices in sats without waiting for on-chain confirmations—ideal for tiny amounts if you already run a Lightning wallet.",
    sections: [
      {
        heading: "How LN faucets differ",
        body: "Instead of crediting a custodial site balance, you paste a Lightning invoice (or connect a wallet) and receive sats over the Lightning Network. Fees are often lower than on-chain dust withdrawals, but you need channel liquidity and a compatible wallet.",
      },
      {
        heading: "Custody and limits",
        body: "Some LN faucets are custodial web wallets; others pay to your own node or app. Channel inbound liquidity can block receives if your wallet is not configured. Convert received sats with the [sats-to-USD tool](/sats-to-usd) for budgeting.",
      },
      {
        heading: "Cluster links",
        body: "On-chain faucet stacks still dominate US referral desks today—compare both paths in [How faucet payouts work](/faucets/learn/how-faucet-payouts-work). For unit math, start at [What is a Bitcoin faucet?](/faucets/learn/what-is-a-bitcoin-faucet)",
      },
    ],
    relatedNodeIds: ["how-faucet-payouts-work", "what-is-a-bitcoin-faucet"],
    sources: [
      {
        sourceId: "lightning",
        url: "https://docs.lightning.engineering/the-lightning-network/overview",
        sourceNote: "Lightning enables off-chain Bitcoin payments secured by on-chain Bitcoin.",
        analysis:
          "LN faucet UX varies widely; we link protocol docs—not individual LN faucet operators—until we list verified partners on the desk.",
      },
    ],
  },
};

export function getFaucetClusterArticle(slug: string): ClusterArticle | undefined {
  if ((FAUCET_CLUSTER_SLUGS as readonly string[]).includes(slug)) {
    return FAUCET_CLUSTER_ARTICLES[slug as FaucetClusterSlug];
  }
  return undefined;
}

export function listFaucetClusterArticles(): ClusterArticle[] {
  return FAUCET_CLUSTER_SLUGS.map((s) => FAUCET_CLUSTER_ARTICLES[s]);
}
