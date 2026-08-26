/**
 * Bitcoin / sats tool registry — one primary search intent per URL.
 * Shared widgets; unique copy, FAQs, and examples per slug (anti thin-clone).
 */

import type { SourceAttributionBlock } from "@/data/crypto-sources";

export type BitcoinToolKind =
  | "converter-multi"
  | "converter-pair"
  | "fee"
  | "dca"
  | "halving"
  | "mining"
  | "block-reward"
  | "inflation"
  | "profit";

export type ConverterPair = {
  from: "btc" | "sats" | "usd";
  to: "btc" | "sats" | "usd";
};

export type BitcoinToolFaq = { question: string; answer: string };

export type BitcoinToolSection = { heading: string; body: string };

export type BitcoinToolDef = {
  slug: string;
  path: string;
  kind: BitcoinToolKind;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  h1: string;
  metaDescription: string;
  /** One-line differentiator shown under H1 */
  lede: string;
  /** Why this URL exists vs siblings (internal SEO note) */
  intentNote: string;
  sections: BitcoinToolSection[];
  faqs: BitcoinToolFaq[];
  examples: string[];
  relatedSlugs: string[];
  cluster: string;
  pair?: ConverterPair;
  defaultUnit?: "btc" | "sats";
  /** Primary-source attribution for factual claims on this page */
  sources?: SourceAttributionBlock[];
};

export const BITCOIN_TOOLS_HUB = {
  path: "/bitcoin-tools",
  title: "Bitcoin Calculators & Converters",
  h1: "Bitcoin calculators",
  metaDescription:
    "Free Bitcoin calculators—BTC/USD, sats converters, fees, DCA, mining, block subsidy, and halving countdown. Live spot where USD is involved.",
  lede: "Pick the tool that matches your question. Each page owns one search intent—no thin clones.",
} as const;

export const BITCOIN_TOOL_SLUGS = [
  "bitcoin-calculator",
  "satoshi-calculator",
  "btc-to-usd",
  "usd-to-btc",
  "btc-to-sats",
  "sats-to-btc",
  "sats-to-usd",
  "usd-to-sats",
  "bitcoin-fee-calculator",
  "bitcoin-dca-calculator",
  "bitcoin-halving-countdown",
  "bitcoin-mining-calculator",
  "bitcoin-block-reward-calculator",
  "bitcoin-inflation-calculator",
  "bitcoin-profit-calculator",
] as const;

export type BitcoinToolSlug = (typeof BITCOIN_TOOL_SLUGS)[number];

export const BITCOIN_TOOLS: Record<BitcoinToolSlug, BitcoinToolDef> = {
  "bitcoin-calculator": {
    slug: "bitcoin-calculator",
    path: "/bitcoin-calculator",
    kind: "converter-multi",
    defaultUnit: "btc",
    primaryKeyword: "bitcoin calculator",
    secondaryKeywords: [
      "bitcoin price calculator",
      "btc to usd calculator",
      "bitcoin converter",
    ],
    title: "Bitcoin Calculator — BTC, Sats & USD",
    h1: "Bitcoin calculator",
    metaDescription:
      "Convert Bitcoin to USD and sats with live spot. Flip units for faucet balances, withdrawals, and portfolio snapshots—no account required.",
    lede: "One amount field. BTC or sats in; USD and the other unit out. Built for operators who leave a tab open.",
    intentNote:
      "Umbrella converter intent. Pair pages (btc-to-usd, etc.) own directional queries; this page owns multi-unit workflow.",
    sections: [
      {
        heading: "Why a multi-unit Bitcoin calculator",
        body: "Most people bounce between BTC, sats, and dollars in the same session—especially when a faucet pays sats and an exchange quotes BTC. This calculator keeps both unit conversions and USD mark-to-market in one place so you do not open three tabs.",
      },
      {
        heading: "How the USD leg works",
        body: "USD values use a live BTC/USD spot feed. Unit math between BTC and sats is fixed (100,000,000 sats = 1 BTC) and never waits on the price. Treat the dollar figure as a snapshot, not a trade quote.",
      },
      {
        heading: "When to use a directional page instead",
        body: "If you landed from a query like “btc to usd” or “1000 sats to usd,” the dedicated pair converters match that intent more tightly. Use this page when you need to toggle units while you work.",
      },
    ],
    faqs: [
      {
        question: "Is this Bitcoin calculator free?",
        answer:
          "Yes. GetFreeBit calculators are free to use in the browser. Live USD conversion needs a network price feed; BTC ↔ sats works offline once the page is loaded.",
      },
      {
        question: "Does the calculator store my balances?",
        answer:
          "No. Amounts stay in your browser session. We do not sync holdings to an account.",
      },
      {
        question: "How accurate is the USD price?",
        answer:
          "Spot comes from public exchange tickers with failover. Prices move; refresh if you need a fresher mark. This is not a trading venue.",
      },
    ],
    examples: [
      "Convert 0.05 BTC to USD and sats before an exchange withdrawal.",
      "Flip a faucet balance from sats to BTC to compare with a CEX quote.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/wallets.html",
        sourceNote:
          "Bitcoin amounts use 8 decimal places; one satoshi is 0.00000001 BTC (the smallest standard unit).",
        analysis:
          "We fix 1 BTC = 100,000,000 sats in all unit converters. USD values use a live BTC/USD spot feed from public exchange APIs—not a trade execution quote.",
      },
    ],
    relatedSlugs: ["satoshi-calculator", "btc-to-usd", "sats-to-usd", "bitcoin-fee-calculator"],
    cluster: "bitcoin-calculator",
  },

  "satoshi-calculator": {
    slug: "satoshi-calculator",
    path: "/satoshi-calculator",
    kind: "converter-multi",
    defaultUnit: "sats",
    primaryKeyword: "satoshi calculator",
    secondaryKeywords: [
      "sats calculator",
      "satoshi to usd",
      "satoshi converter",
      "sats to btc",
    ],
    title: "Satoshi Calculator — Sats ↔ BTC ↔ USD",
    h1: "Satoshi calculator",
    metaDescription:
      "Convert satoshis to Bitcoin and USD instantly. Built for faucet claims, Lightning amounts, and micro-earnings math with live spot.",
    lede: "Start in sats. See BTC and dollars without rewriting scientific notation.",
    intentNote:
      "Sats-first multi converter. Distinct from sats-to-usd (pair-only) and bitcoin-calculator (BTC-default).",
    sections: [
      {
        heading: "Why start in sats",
        body: "Faucets, Lightning invoices, and tip bots quote satoshis. Entering “2032 sats” is clearer than 0.00002032 BTC. This page defaults to sats so micro amounts stay readable.",
      },
      {
        heading: "Fixed scale, live dollars",
        body: "1 BTC always equals 100,000,000 sats. The USD column multiplies your BTC-equivalent by live spot. If the feed is slow, unit conversion still works.",
      },
      {
        heading: "Micro-earnings context",
        body: "When claim sizes are tiny, convert to USD to decide whether a withdrawal fee eats the stack. Pair this with the fee calculator before you push on-chain.",
      },
    ],
    faqs: [
      {
        question: "How many sats are in 1 Bitcoin?",
        answer:
          "Exactly 100,000,000 satoshis. That ratio never changes with price.",
      },
      {
        question: "What is a satoshi?",
        answer:
          "A satoshi (sat) is the smallest whole unit of Bitcoin commonly used today—one hundred-millionth of a BTC.",
      },
      {
        question: "Can I convert Lightning amounts here?",
        answer:
          "Yes for unit math. Lightning invoices are often denominated in sats; convert for budgeting. Routing and channel liquidity are separate.",
      },
    ],
    examples: [
      "Turn 50,000 faucet sats into BTC and a USD snapshot.",
      "Check whether 10,000 sats covers a typical on-chain fee today.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/wallets.html",
        sourceNote: "Satoshis are the smallest commonly quoted Bitcoin sub-unit (1e-8 BTC).",
        analysis:
          "This page defaults to sats because faucets and Lightning invoices usually quote sats, not eight-decimal BTC strings.",
      },
      {
        sourceId: "lightning",
        sourceNote: "Lightning amounts are typically denominated in millisatoshi or satoshi units on invoices.",
        analysis:
          "Unit conversion here does not estimate routing fees or channel liquidity—only sats ↔ BTC ↔ USD math.",
      },
    ],
    relatedSlugs: ["sats-to-usd", "sats-to-btc", "bitcoin-calculator", "usd-to-sats"],
    cluster: "bitcoin-calculator",
  },

  "btc-to-usd": {
    slug: "btc-to-usd",
    path: "/btc-to-usd",
    kind: "converter-pair",
    pair: { from: "btc", to: "usd" },
    primaryKeyword: "btc to usd",
    secondaryKeywords: ["bitcoin to usd", "btc usd converter", "convert bitcoin to dollars"],
    title: "BTC to USD Converter — Live Bitcoin to Dollars",
    h1: "BTC to USD",
    metaDescription:
      "Convert Bitcoin to US dollars with live spot. Enter any BTC amount and see USD plus the sats equivalent.",
    lede: "Directional converter: Bitcoin in, dollars out—plus sats as a secondary read.",
    intentNote: "Owns the classic “btc to usd” query. Sibling of usd-to-btc.",
    sections: [
      {
        heading: "Spot, not a bid/ask",
        body: "We mark your BTC against a public spot ticker. Spreads on exchanges and on-ramps differ. Use this for sizing and sanity checks, not as an execution quote.",
      },
      {
        heading: "Why we also show sats",
        body: "Seeing the sat equivalent helps when you later move the same stack to a Lightning or faucet context without retyping the amount.",
      },
    ],
    faqs: [
      {
        question: "How do I convert BTC to USD?",
        answer:
          "Enter your Bitcoin amount. The converter multiplies by live BTC/USD spot and shows dollars. Optionally note the sats line for micro-unit work.",
      },
      {
        question: "Why does my exchange show a different USD value?",
        answer:
          "Venues use their own books, fees, and sometimes delayed indexes. Small gaps are normal.",
      },
    ],
    examples: [
      "Convert 1 BTC to USD using today’s spot.",
      "Price 0.0025 BTC before a CEX sell.",
    ],
    relatedSlugs: ["usd-to-btc", "bitcoin-calculator", "sats-to-usd", "bitcoin-profit-calculator"],
    cluster: "bitcoin-calculator",
  },

  "usd-to-btc": {
    slug: "usd-to-btc",
    path: "/usd-to-btc",
    kind: "converter-pair",
    pair: { from: "usd", to: "btc" },
    primaryKeyword: "usd to btc",
    secondaryKeywords: ["dollars to bitcoin", "how much bitcoin can i buy", "usd to bitcoin"],
    title: "USD to BTC Converter — Dollars to Bitcoin",
    h1: "USD to BTC",
    metaDescription:
      "Convert US dollars to Bitcoin with live spot. See how much BTC and sats a dollar amount buys at the current mark.",
    lede: "Budget in dollars, see BTC and sats before you hit buy.",
    intentNote: "Inverse of btc-to-usd. Purchase-sizing intent, not DCA modeling.",
    sections: [
      {
        heading: "Purchase sizing without a cart",
        body: "Enter the fiat you plan to spend. We divide by spot to estimate BTC. Your exchange will still charge spread, fees, and possibly a deposit rail cost.",
      },
      {
        heading: "Sats for small buys",
        body: "Sub-$50 buys look clearer in sats. We show both so you can compare with faucet-scale stacks.",
      },
    ],
    faqs: [
      {
        question: "How much Bitcoin is $100?",
        answer:
          "Divide 100 by the live BTC/USD price. The converter does that and also shows sats. The result updates as spot moves.",
      },
      {
        question: "Is this a buy button?",
        answer:
          "No. It is a sizing tool. To purchase BTC, use a licensed exchange that serves your jurisdiction—then withdraw to self-custody when ready.",
      },
    ],
    examples: [
      "See how much BTC $250 buys at current spot.",
      "Convert a paycheck slice to sats before setting a recurring buy.",
    ],
    relatedSlugs: ["btc-to-usd", "usd-to-sats", "bitcoin-dca-calculator", "bitcoin-calculator"],
    cluster: "bitcoin-calculator",
  },

  "btc-to-sats": {
    slug: "btc-to-sats",
    path: "/btc-to-sats",
    kind: "converter-pair",
    pair: { from: "btc", to: "sats" },
    primaryKeyword: "btc to sats",
    secondaryKeywords: ["1 btc to sats", "bitcoin to satoshi", "how many sats in a bitcoin"],
    title: "BTC to Sats — Convert Bitcoin to Satoshis",
    h1: "BTC to sats",
    metaDescription:
      "Convert Bitcoin to satoshis. 1 BTC = 100,000,000 sats—fixed unit math, no price feed required.",
    lede: "Pure unit conversion. Price is irrelevant; the scale is protocol-fixed.",
    intentNote: "Educational / unit intent. No USD. Complements sats-to-btc.",
    sections: [
      {
        heading: "The fixed ratio",
        body: "Bitcoin’s consensus treats 1 BTC as 100,000,000 base units (sats). Converting BTC → sats is multiply by 1e8 and round to a whole sat for display.",
      },
      {
        heading: "When you need this",
        body: "Wallets and explorers often show BTC with eight decimals. Faucets and Lightning UX prefer integer sats. Convert before you copy an amount into the wrong field.",
      },
    ],
    faqs: [
      {
        question: "How many sats in 1 BTC?",
        answer: "100,000,000. Always.",
      },
      {
        question: "Do I need a live price?",
        answer:
          "No. BTC ↔ sats is unit math only. Use sats-to-usd or the Bitcoin calculator when you need dollars.",
      },
    ],
    examples: [
      "Convert 0.01 BTC → 1,000,000 sats.",
      "Express 1.5 BTC as sats for a Lightning channel budget.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/wallets.html",
        sourceNote: "One bitcoin equals 100,000,000 base units (satoshis) in standard wallet notation.",
        analysis: "Fixed unit math only—halvings change issuance, not the sats-per-BTC ratio.",
      },
    ],
    relatedSlugs: ["sats-to-btc", "satoshi-calculator", "btc-to-usd", "sats-to-usd"],
    cluster: "bitcoin-calculator",
  },

  "sats-to-btc": {
    slug: "sats-to-btc",
    path: "/sats-to-btc",
    kind: "converter-pair",
    pair: { from: "sats", to: "btc" },
    primaryKeyword: "sats to btc",
    secondaryKeywords: ["satoshi to bitcoin", "convert sats to btc", "sats in bitcoin"],
    title: "Sats to BTC — Convert Satoshis to Bitcoin",
    h1: "Sats to BTC",
    metaDescription:
      "Convert satoshis to Bitcoin. Divide by 100,000,000—fixed scale for faucet and Lightning amounts.",
    lede: "Integer sats in, BTC with up to eight decimals out.",
    intentNote: "Inverse of btc-to-sats. Common after faucet claim totals.",
    sections: [
      {
        heading: "From claim totals to BTC",
        body: "After weeks of faucet claims you may hold millions of sats in a micro-wallet. Convert to BTC to compare with exchange minimums and withdrawal fees.",
      },
      {
        heading: "Rounding",
        body: "We display BTC trimmed of trailing zeros where safe. On-chain amounts are still whole sats under the hood.",
      },
    ],
    faqs: [
      {
        question: "How do I convert sats to BTC?",
        answer: "Divide satoshis by 100,000,000. Example: 50,000,000 sats = 0.5 BTC.",
      },
      {
        question: "Will this change after a Bitcoin halving?",
        answer:
          "No. Halvings cut the block subsidy, not the number of sats in a bitcoin.",
      },
    ],
    examples: [
      "Convert 21,000,000 sats to BTC.",
      "Express a 100,000-sat Lightning invoice as BTC.",
    ],
    relatedSlugs: ["btc-to-sats", "sats-to-usd", "satoshi-calculator", "bitcoin-fee-calculator"],
    cluster: "bitcoin-calculator",
  },

  "sats-to-usd": {
    slug: "sats-to-usd",
    path: "/sats-to-usd",
    kind: "converter-pair",
    pair: { from: "sats", to: "usd" },
    primaryKeyword: "sats to usd",
    secondaryKeywords: ["1000 sats to usd", "satoshi to usd", "convert sats to dollars"],
    title: "Sats to USD — Convert Satoshis to Dollars",
    h1: "Sats to USD",
    metaDescription:
      "Convert 1,000 sats, 10,000 sats, or any amount to USD with live Bitcoin spot. Built for micro-earnings and Lightning amounts.",
    lede: "Micro amounts in, dollar snapshot out—plus BTC as a secondary line.",
    intentNote: "High-volume micro query. Distinct from satoshi-calculator (multi-unit).",
    sections: [
      {
        heading: "Why “1000 sats to usd” matters",
        body: "Searchers often check a round sat figure before tipping or claiming. Live spot turns that into a dollar sense-check so fees and captcha time have context.",
      },
      {
        heading: "Fee awareness",
        body: "If USD value is smaller than a typical on-chain fee, batch via a micro-wallet or wait. Open the fee calculator with a realistic vbyte size next.",
      },
    ],
    faqs: [
      {
        question: "How much is 1000 sats in USD?",
        answer:
          "Convert 1000 sats to BTC (0.00001 BTC), then multiply by live BTC/USD. The converter updates as spot moves.",
      },
      {
        question: "Why is my sats-to-USD value tiny?",
        answer:
          "Sats are designed for small payments. Compare against network fees before withdrawing on-chain.",
      },
    ],
    examples: [
      "Price 1,000 sats in USD.",
      "Convert a 25,000-sat faucet balance before withdrawal.",
    ],
    relatedSlugs: ["usd-to-sats", "satoshi-calculator", "bitcoin-fee-calculator", "sats-to-btc"],
    cluster: "bitcoin-calculator",
  },

  "usd-to-sats": {
    slug: "usd-to-sats",
    path: "/usd-to-sats",
    kind: "converter-pair",
    pair: { from: "usd", to: "sats" },
    primaryKeyword: "usd to sats",
    secondaryKeywords: ["dollars to satoshis", "how many sats for a dollar", "usd to satoshi"],
    title: "USD to Sats — Dollars to Satoshis",
    h1: "USD to sats",
    metaDescription:
      "Convert US dollars to satoshis with live Bitcoin spot. Useful for Lightning tips, faucet goals, and micro-budgets.",
    lede: "Dollar budget in; sats (and BTC) out at today’s mark.",
    intentNote: "Inverse of sats-to-usd. Tip and micro-budget intent.",
    sections: [
      {
        heading: "Budgeting tips and claims",
        body: "Want to tip $2 on Lightning or set a faucet goal equivalent to $5? Convert dollars → sats so wallet UIs that only show sats match your plan.",
      },
      {
        heading: "Spot sensitivity",
        body: "As BTC/USD moves, the same dollar buys a different sat count. Recheck before large Lightning invoices.",
      },
    ],
    faqs: [
      {
        question: "How many sats is $1?",
        answer:
          "Divide 1 by BTC/USD, then multiply by 100,000,000. The converter does both steps.",
      },
      {
        question: "Can I use this for DCA planning?",
        answer:
          "For a single purchase size, yes. For recurring buys over many periods, use the Bitcoin DCA calculator.",
      },
    ],
    examples: [
      "Convert $5 into sats for a Lightning tip.",
      "See sats equivalent of a $20 weekly buy.",
    ],
    relatedSlugs: ["sats-to-usd", "usd-to-btc", "bitcoin-dca-calculator", "satoshi-calculator"],
    cluster: "bitcoin-calculator",
  },

  "bitcoin-fee-calculator": {
    slug: "bitcoin-fee-calculator",
    path: "/bitcoin-fee-calculator",
    kind: "fee",
    primaryKeyword: "bitcoin fee calculator",
    secondaryKeywords: [
      "btc transaction fee",
      "bitcoin fee estimator",
      "sats per vbyte calculator",
    ],
    title: "Bitcoin Fee Calculator — Sats/vB to USD",
    h1: "Bitcoin fee calculator",
    metaDescription:
      "Estimate Bitcoin transaction fees from sats/vByte and template size. See sats, BTC, and USD cost before you broadcast.",
    lede: "Fee = rate × virtual size. Pick a template, set sats/vB, see the bill.",
    intentNote: "Ops tool. Not a mempool oracle—user supplies rate and size assumptions.",
    sections: [
      {
        heading: "What you are calculating",
        body: "Miner fees are priced in sats per virtual byte. Multiply by your transaction’s vbytes to get total fee sats, then convert to BTC/USD. Templates approximate common shapes (simple send, consolidation, exchange-style withdraw).",
      },
      {
        heading: "Faucet and dust reality",
        body: "Sweeping many tiny UTXOs inflates vbytes. If fee USD exceeds claim value, wait for lower sats/vB or keep funds in a batched micro-wallet.",
      },
      {
        heading: "Not a live mempool feed",
        body: "Enter the rate you see on a mempool explorer or wallet. We do not scrape fee estimates; we do the arithmetic clearly.",
      },
    ],
    faqs: [
      {
        question: "How do I estimate a Bitcoin fee?",
        answer:
          "Choose an approximate vbyte size, multiply by your target sats/vByte, then convert to USD if needed. Templates help when you do not know exact size.",
      },
      {
        question: "Why do exchange withdrawals cost more?",
        answer:
          "Batching, input count, and address types change vbytes. Exchanges also add their own withdrawal fee on top of network fees.",
      },
      {
        question: "What is sats/vByte?",
        answer:
          "The fee rate: satoshis paid per virtual byte of transaction weight. Higher rates usually confirm faster when the mempool is busy.",
      },
    ],
    examples: [
      "Estimate a 140 vB simple send at 12 sats/vB.",
      "Compare consolidation (450 vB) vs a simple withdrawal.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/transactions.html",
        sourceNote:
          "Transaction fees are paid to miners and measured against transaction size (weight/vbytes), not the BTC amount sent.",
        analysis:
          "Templates on this page are illustrative vbyte sizes. Your wallet’s coin selection changes the real size—always confirm in the signing UI.",
      },
      {
        sourceId: "mempool-space",
        url: "https://mempool.space/docs/faq#what-are-sat-vbyte",
        sourceNote: "Recommended fee rates depend on mempool congestion and target confirmation time.",
        analysis:
          "We do not scrape live fee estimates. Copy a sats/vB target from a mempool explorer, then use this calculator to price your specific transaction shape.",
      },
    ],
    relatedSlugs: ["sats-to-usd", "bitcoin-calculator", "bitcoin-mining-calculator", "btc-to-usd"],
    cluster: "bitcoin-ops",
  },

  "bitcoin-dca-calculator": {
    slug: "bitcoin-dca-calculator",
    path: "/bitcoin-dca-calculator",
    kind: "dca",
    primaryKeyword: "bitcoin dca calculator",
    secondaryKeywords: ["btc dca", "dollar cost average bitcoin", "bitcoin recurring buy calculator"],
    title: "Bitcoin DCA Calculator — Recurring Buy Model",
    h1: "Bitcoin DCA calculator",
    metaDescription:
      "Model dollar-cost averaging into BTC—periodic buys, total invested, average cost, and sats accumulated at a chosen price assumption.",
    lede: "Simple projection: same USD each period at a flat price assumption. Not backtesting.",
    intentNote: "Planning tool. Flat price model by design—honest about limits vs historical DCA charts.",
    sections: [
      {
        heading: "What this model does",
        body: "You pick a USD amount, number of periods, and a BTC price assumption (defaults to live spot). We multiply to total cash outlaid and divide for total BTC/sats. Average cost equals your assumed price in this flat model.",
      },
      {
        heading: "What it does not do",
        body: "It does not replay historical candles or promise returns. Real DCA experiences varying prices, skipped buys, and fees. Use this for goal sizing, then execute on an exchange you trust.",
      },
      {
        heading: "Fees and rails",
        body: "Subtract bank and trading fees mentally—or lower the amount field. Withdrawals to self-custody add network fees later.",
      },
    ],
    faqs: [
      {
        question: "What is Bitcoin DCA?",
        answer:
          "Dollar-cost averaging means buying a fixed USD amount of BTC on a schedule, reducing timing stress versus a single lump sum.",
      },
      {
        question: "Why is average cost equal to the price I entered?",
        answer:
          "This calculator uses one price for every period. That keeps the math transparent. Historical DCA tools use many prices and will differ.",
      },
      {
        question: "Is DCA investment advice?",
        answer:
          "No. It is a planning aid. Bitcoin is volatile; only allocate what you can afford to risk.",
      },
    ],
    examples: [
      "Model $50 weekly for 52 weeks at current spot.",
      "Compare 26 vs 52 periods for the same monthly budget.",
    ],
    relatedSlugs: ["usd-to-btc", "bitcoin-profit-calculator", "bitcoin-calculator", "usd-to-sats"],
    cluster: "bitcoin-tools",
  },

  "bitcoin-halving-countdown": {
    slug: "bitcoin-halving-countdown",
    path: "/bitcoin-halving-countdown",
    kind: "halving",
    primaryKeyword: "bitcoin halving countdown",
    secondaryKeywords: ["btc halving date", "next bitcoin halving", "bitcoin halving schedule"],
    title: "Bitcoin Halving Countdown — Next Subsidy Drop",
    h1: "Bitcoin halving countdown",
    metaDescription:
      "Countdown to the next Bitcoin halving, current block subsidy, and what issuance changes mean—without price prophecy.",
    lede: "Track the next subsidy cut. Understand issuance, not hopium.",
    intentNote:
      "Time/schedule intent. Block-reward and inflation calculators cover math details; this page owns the countdown narrative.",
    sections: [
      {
        heading: "What a halving does",
        body: "Every 210,000 blocks (~4 years), the block subsidy halves. Fees still exist; new issuance drops. That is a supply schedule event—not a guaranteed price event.",
      },
      {
        heading: "Why the date is an estimate",
        body: "Blocks average ~10 minutes but vary. Countdown clocks use an estimated timestamp and target height. Actual wall-clock time drifts with hashrate and luck.",
      },
      {
        heading: "After the cut",
        body: "Miners earn fewer new BTC per block. Security budget shifts toward fees over decades. Pair this page with the block-reward and inflation tools for the numbers.",
      },
    ],
    faqs: [
      {
        question: "When is the next Bitcoin halving?",
        answer:
          "The next subsidy cut is targeted near block 1,050,000, often estimated around April 2028. Exact UTC time depends on block intervals.",
      },
      {
        question: "Does a Bitcoin halving guarantee a higher price?",
        answer:
          "No. Issuance falls; demand is independent. Historical price paths are not promises.",
      },
      {
        question: "What is the current block subsidy?",
        answer:
          "After the 2024 halving, the subsidy is 3.125 BTC per block until the next halving.",
      },
    ],
    examples: [
      "Check days remaining until the estimated next halving.",
      "Confirm current subsidy (3.125 BTC) before reading mining projections.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/mining.html",
        sourceNote:
          "The block subsidy (new bitcoins issued per block) halves every 210,000 blocks as part of Bitcoin’s controlled supply schedule.",
        analysis:
          "Wall-clock countdown dates are estimates (~10 minute target block interval). Block height is the authoritative trigger—verify on a block explorer near the event.",
      },
    ],
    relatedSlugs: [
      "bitcoin-block-reward-calculator",
      "bitcoin-inflation-calculator",
      "bitcoin-mining-calculator",
      "bitcoin-calculator",
    ],
    cluster: "bitcoin-ops",
  },

  "bitcoin-mining-calculator": {
    slug: "bitcoin-mining-calculator",
    path: "/bitcoin-mining-calculator",
    kind: "mining",
    primaryKeyword: "bitcoin mining calculator",
    secondaryKeywords: [
      "btc mining profitability",
      "asic profit calculator",
      "bitcoin miner electricity cost",
    ],
    title: "Bitcoin Mining Calculator — Hashrate & Power Cost",
    h1: "Bitcoin mining calculator",
    metaDescription:
      "Estimate Bitcoin mining revenue vs electricity and pool fees. Enter hashrate, network hashrate, watts, and kWh price for a net USD/day sketch.",
    lede: "Gross share of subsidy, minus power and pool fees. Hardware cost and difficulty change are on you.",
    intentNote: "Profitability sketch for educational comparison—not a hosting contract quote.",
    sections: [
      {
        heading: "How the estimate works",
        body: "Your hashrate divided by network hashrate approximates share of block subsidies (fees ignored for simplicity). Multiply by price for gross USD/day, then subtract power and pool fee.",
      },
      {
        heading: "What breaks the model",
        body: "Difficulty adjusts, hardware fails, pool luck varies, and fee revenue spikes. Home mining rarely beats buying spot for beginners—run the numbers honestly.",
      },
      {
        heading: "Faucets vs mining",
        body: "If your goal is learning micro-earnings, faucets and time-vs-reward math are usually cheaper than ASICs. Use this calculator to stress-test hype, not chase it.",
      },
    ],
    faqs: [
      {
        question: "Is Bitcoin mining profitable at home?",
        answer:
          "Often no after power, noise, heat, and hardware amortization. Enter your real kWh rate and hashrate—many setups show negative net USD/day.",
      },
      {
        question: "Does this include transaction fees paid to miners?",
        answer:
          "The simple model uses subsidy only. Fees can add revenue but are volatile; treat results as a lower-bound sketch on quiet fee days.",
      },
      {
        question: "What network hashrate should I enter?",
        answer:
          "Use a recent public estimate (EH/s or TH/s). Wrong network hashrate skews your share dramatically.",
      },
    ],
    examples: [
      "Test a 100 TH/s rig at $0.12/kWh against current network hashrate.",
      "Find break-even electricity price for your watt draw.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/mining.html",
        sourceNote:
          "Miners compete to produce blocks; the block subsidy plus transaction fees compensate successful miners.",
        analysis:
          "This calculator approximates subsidy share from hashrate ratio and ignores difficulty adjustments, luck, and fee spikes. Treat output as an educational sketch, not a hosting quote.",
      },
    ],
    relatedSlugs: [
      "bitcoin-block-reward-calculator",
      "bitcoin-halving-countdown",
      "bitcoin-fee-calculator",
      "bitcoin-profit-calculator",
    ],
    cluster: "bitcoin-ops",
  },

  "bitcoin-block-reward-calculator": {
    slug: "bitcoin-block-reward-calculator",
    path: "/bitcoin-block-reward-calculator",
    kind: "block-reward",
    primaryKeyword: "bitcoin block reward",
    secondaryKeywords: [
      "bitcoin block subsidy",
      "btc block reward calculator",
      "bitcoin issuance per block",
    ],
    title: "Bitcoin Block Reward Calculator — Subsidy by Era",
    h1: "Bitcoin block reward calculator",
    metaDescription:
      "See Bitcoin block subsidy by era, annual issuance, and USD value of a block at live spot. Understand the reward schedule without price myths.",
    lede: "Subsidy table + live USD mark on today’s block reward.",
    intentNote: "Schedule math page. Halving countdown owns timing; inflation owns % rate.",
    sections: [
      {
        heading: "Subsidy eras",
        body: "Era 0 paid 50 BTC; each 210,000 blocks halves the subsidy. Era 4 (post-2024) pays 3.125 BTC until the next cut. Fees are extra and not shown in the base subsidy.",
      },
      {
        heading: "Annual issuance sketch",
        body: "Blocks average every 10 minutes. Annual BTC ≈ subsidy × blocks per year. Circulating supply approaches 21 million asymptotically.",
      },
    ],
    faqs: [
      {
        question: "What is the current Bitcoin block reward?",
        answer:
          "The block subsidy is 3.125 BTC after the 2024 halving. Miners also collect transaction fees.",
      },
      {
        question: "When does the subsidy hit zero?",
        answer:
          "After many halvings, subsidy rounds toward zero; fees remain the long-term incentive. That is decades away.",
      },
    ],
    examples: [
      "Mark 3.125 BTC subsidy in USD at live spot.",
      "Compare era-3 (6.25) vs era-4 (3.125) annual issuance.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/mining.html",
        sourceNote:
          "New bitcoins enter circulation as the block subsidy when a miner successfully mines a block; the subsidy halves every 210,000 blocks.",
        analysis:
          "Era table on this page follows the standard halving schedule. Transaction fees are additional miner revenue and vary block to block.",
      },
    ],
    relatedSlugs: [
      "bitcoin-inflation-calculator",
      "bitcoin-halving-countdown",
      "bitcoin-mining-calculator",
      "btc-to-usd",
    ],
    cluster: "bitcoin-ops",
  },

  "bitcoin-inflation-calculator": {
    slug: "bitcoin-inflation-calculator",
    path: "/bitcoin-inflation-calculator",
    kind: "inflation",
    primaryKeyword: "bitcoin inflation rate",
    secondaryKeywords: [
      "btc inflation calculator",
      "bitcoin issuance rate",
      "bitcoin supply inflation",
    ],
    title: "Bitcoin Inflation Calculator — Issuance vs Supply",
    h1: "Bitcoin inflation calculator",
    metaDescription:
      "Estimate Bitcoin’s annualized issuance rate from block subsidy and circulating supply. Compare eras without confusing inflation with price.",
    lede: "Issuance ÷ circulating supply. A supply metric—not CPI and not a price forecast.",
    intentNote:
      "Macro supply math—not price prediction and not a converter. Pairs with the block-reward and halving tools using a percent framing.",
    sections: [
      {
        heading: "Defining “inflation” here",
        body: "We mean new BTC issued per year divided by approximate circulating supply, as a percent. It is not consumer-price inflation and does not predict BTC/USD.",
      },
      {
        heading: "Why the rate falls",
        body: "Each halving cuts subsidy while supply only rises slowly toward 21 million. The percentage issuance rate trends down over time.",
      },
    ],
    faqs: [
      {
        question: "What is Bitcoin’s inflation rate?",
        answer:
          "Roughly annual subsidy issuance divided by circulating supply. After the 2024 halving it sits in the low single digits and declines at the next halving.",
      },
      {
        question: "Is lower inflation always bullish?",
        answer:
          "No. Price depends on demand, liquidity, and risk appetite. Issuance is only one variable.",
      },
    ],
    examples: [
      "Compute % issuance using 3.125 BTC subsidy and ~19.9M circulating.",
      "Compare issuance % before vs after a halving era change.",
    ],
    sources: [
      {
        sourceId: "bitcoin-dev",
        url: "https://developer.bitcoin.org/devguide/mining.html",
        sourceNote:
          "Bitcoin’s supply schedule reduces the block subsidy over time; total supply is capped at 21 million BTC.",
        analysis:
          "Circulating supply is an approximation (lost coins are unknowable). Issuance % here is subsidy-based only—not CPI and not a price forecast.",
      },
    ],
    relatedSlugs: [
      "bitcoin-block-reward-calculator",
      "bitcoin-halving-countdown",
      "bitcoin-mining-calculator",
      "bitcoin-calculator",
    ],
    cluster: "bitcoin-ops",
  },

  "bitcoin-profit-calculator": {
    slug: "bitcoin-profit-calculator",
    path: "/bitcoin-profit-calculator",
    kind: "profit",
    primaryKeyword: "bitcoin profit calculator",
    secondaryKeywords: [
      "btc profit loss",
      "bitcoin unrealized gain",
      "bitcoin pnl calculator",
    ],
    title: "Bitcoin Profit Calculator — Cost Basis vs Spot",
    h1: "Bitcoin profit calculator",
    metaDescription:
      "Estimate unrealized Bitcoin profit or loss from holdings and cost basis vs live spot. Not tax advice—pair with proper lot tracking software.",
    lede: "Mark-to-market PnL: holdings × spot − cost basis.",
    intentNote: "Simple PnL sketch. Tax lot methods live under /tools/tax partners.",
    sections: [
      {
        heading: "Unrealized vs realized",
        body: "This tool marks your stack to spot. Gains become taxable events when you dispose of crypto under common US rules—confirm with a professional.",
      },
      {
        heading: "Cost basis hygiene",
        body: "Enter total USD spent (or basis) for the BTC amount shown. Mixed lots, gifts, and transfers need software like Koinly or CoinTracking—see our tax desk.",
      },
    ],
    faqs: [
      {
        question: "How do I calculate Bitcoin profit?",
        answer:
          "Multiply BTC held by live USD spot, subtract your cost basis. Positive is unrealized gain; negative is unrealized loss.",
      },
      {
        question: "Is this a tax calculator?",
        answer:
          "No. It ignores lot methods, fees, and income classifications. Use dedicated crypto tax tools for filing.",
      },
    ],
    examples: [
      "Mark 0.1 BTC bought for $4,000 against today’s spot.",
      "Sanity-check PnL % before exporting trades to tax software.",
    ],
    sources: [
      {
        sourceId: "irs",
        url: "https://www.irs.gov/filing/digital-assets",
        sourceNote:
          "The IRS treats digital assets as property for federal tax purposes; selling, exchanging, or otherwise disposing of crypto can be a taxable event.",
        analysis:
          "This calculator shows unrealized mark-to-market only. It does not apply lot methods (FIFO/HIFO), income classifications, or form mappings—use tax software and a qualified preparer for filing.",
      },
    ],
    relatedSlugs: ["btc-to-usd", "bitcoin-dca-calculator", "bitcoin-calculator", "usd-to-btc"],
    cluster: "bitcoin-tools",
  },
};

export function getBitcoinTool(slug: string): BitcoinToolDef | undefined {
  if ((BITCOIN_TOOL_SLUGS as readonly string[]).includes(slug)) {
    return BITCOIN_TOOLS[slug as BitcoinToolSlug];
  }
  return undefined;
}

export function listBitcoinTools(): BitcoinToolDef[] {
  return BITCOIN_TOOL_SLUGS.map((slug) => BITCOIN_TOOLS[slug]);
}

export function getRelatedBitcoinTools(slug: string, limit = 4): BitcoinToolDef[] {
  const tool = getBitcoinTool(slug);
  if (!tool) return [];
  const related = tool.relatedSlugs
    .map((s) => getBitcoinTool(s))
    .filter((t): t is BitcoinToolDef => Boolean(t));
  if (related.length >= limit) return related.slice(0, limit);
  const extras = listBitcoinTools().filter(
    (t) => t.slug !== slug && !related.some((r) => r.slug === t.slug),
  );
  return [...related, ...extras].slice(0, limit);
}
