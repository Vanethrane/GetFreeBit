import type { Article } from "./types";

export const NEWS: Article[] = [
  {
    kind: "news",
    slug: "sec-proposes-regulation-crypto-assets-framework",
    title:
      "SEC Proposes 'Regulation Crypto Assets' Framework to Standardize Digital Securities Rules",
    description:
      "Analysis of the SEC’s August 2026 Regulation Crypto Assets proposal—what tailored offering exemptions, disclosures, and investment-contract safe harbors would mean for builders and investors, and what to watch as comments close.",
    publishedAt: "2026-08-20",
    readingMinutes: 5,
    sections: [
      {
        heading: "What the Commission put on the table",
        paragraphs: [
          "On August 18, 2026, the U.S. Securities and Exchange Commission issued a proposing release titled Regulation Crypto Assets (File No. S7-2026-27; Release Nos. 33-11434 and 34-106150). The package is framed as a tailored offering regime for certain investment contracts that involve crypto assets—not a rewrite of every digital-asset rule at once. Federal Register publication followed on August 21, with public comments due October 20, 2026. That comment window is the immediate operational fact for counsel and product teams: proposals change between issuance and final adoption, and nothing in a proposing release is enforceable law until the Commission adopts a final rule after considering comments.",
          "GetFreeBit’s read is deliberately cautious. Regulatory titles travel faster than rule text. “Regulation Crypto Assets” sits inside the Commission’s broader effort to standardize how digital securities and crypto-related investment contracts are offered, disclosed, and eventually treated when managerial efforts wind down. Readers should treat social-media summaries as incomplete until they check the SEC’s own release and the Federal Register version. Vote tallies, committee drama, and influencer “certainty” claims are not a substitute for the proposing release.",
          "At a high level, the proposal describes two exemptions from Securities Act registration requirements, principles-based disclosures, continued antifraud and antimanipulation coverage, and a conditional safe harbor from the term “investment contract” in the definition of “security.” Those pillars matter more than branding. They are the levers that would typically address registration pathways, ongoing disclosure expectations, and the boundary between a fundraising instrument and a later digital commodity—subjects long tangled in Howey analysis and enforcement-first practice.",
        ],
      },
      {
        heading: "Registration, disclosures, and the investment-contract boundary",
        paragraphs: [
          "A Regulation Crypto Assets–style framework typically starts with capital formation: how teams raise money without forcing every token sale into a full Form S-1–style registration that was designed for equity issuers with quarterly earnings calls. The August 2026 proposal outlines a smaller “startup” exemption (offerings up to $5 million over a four-year period) and a larger “fundraising” exemption (up to $75 million in each 12-month period), with principles-based disclosures and ongoing reporting conditions that tighten as offering size grows. Issuers would remain under antifraud rules even when registration is not required—an important investor-protection residual that marketing decks often omit.",
          "Disclosures are the second standardization vector. Principles-based regimes ask for material information about the project, token mechanics, risks, conflicts, and use of proceeds rather than copying industrial-company line items that do not map to protocol roadmaps. That does not mean lighter scrutiny; it means the fight shifts to whether disclosures are adequate, current, and not misleading. Secondary-market participants should assume that stale whitepapers and Telegram AMAs will not satisfy a principles-based standard if the Commission finalizes along these lines.",
          "The conditional safe harbor from “investment contract” language is the third vector. In practice, frameworks like this try to describe when essential managerial efforts have been completed or permanently ceased, so the underlying crypto asset can be analyzed apart from the original fundraising contract. That distinction—exchange-traded digital commodity versus security sold as part of an investment contract—is exactly where builders, exchanges, and market-structure bills have collided for years. Custody, broker-dealer, and exchange registration questions often follow from that classification rather than from the ticker’s marketing category. Related operational hygiene for retail users still lives in guides such as [First CEX Account: KYC, 2FA, and Withdrawals](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency) and [Self-Custody Withdrawal Checklist](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
        ],
      },
      {
        heading: "What investors and builders should watch next",
        paragraphs: [
          "First, comment-letter themes. Expect issuers to push for clearer off-ramps and workable disclosure calendars; investor advocates to demand more specificity on conflicts, insider allocations, and secondary trading; and platforms to ask how preemption of state “blue sky” registration interacts with listing and custody diligence. Second, interaction with market-structure legislation such as the CLARITY Act debate—statutes and SEC rules can reinforce or contradict each other on SEC versus CFTC lanes. Third, implementation risk: even a well-drafted exemption can strand projects if transition reports, financial-statement conditions, or resale preemption lapse requirements are operationally heavy.",
          "Builders should map products now: Is the token sold as part of an investment contract? Who performs essential managerial efforts? Which disclosures can be maintained on a cadence investors can verify? Investors should separate speculative narratives from process: a proposal is not a guarantee of listing, liquidity, or legal clarity for any specific asset. Security-conscious practice still applies—verify contracts, avoid phishing “compliance portals,” and keep tax-ready records as covered in [Crypto Records for Taxes Without Panic](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "Bottom line: Regulation Crypto Assets is a consequential attempt to standardize digital-securities offering pathways. Treat August 2026 as the start of a comment-and-revision cycle, not as finished law. Watch the comment deadline, final-rule text if and when adopted, and how custody and exchange distinctions are handled in practice—then verify primary sources before changing capital-raising or trading plans.",
        ],
      },
    ],
  },
  {
    kind: "news",
    slug: "mastercard-acquires-crypto-infrastructure-provider-bvnk",
    title:
      "Mastercard Acquires Crypto Infrastructure Provider BVNK in Major Institutional Expansion",
    description:
      "Mastercard completed its BVNK acquisition on August 3, 2026, in a deal valued at up to about $1.8 billion. What the stablecoin and fiat-on-chain rails mean for B2B payments and Visa competition—without the hype.",
    publishedAt: "2026-08-04",
    readingMinutes: 5,
    sections: [
      {
        heading: "The deal that closed, not the rumor cycle",
        paragraphs: [
          "On August 3, 2026, Mastercard completed its acquisition of BVNK, the London-based crypto payments infrastructure company known for connecting fiat accounts with on-chain stablecoin settlement. Reporting and company statements describe a transaction valued at up to roughly $1.8 billion, including contingent consideration—commonly summarized as a base purchase price near $1.5 billion plus up to about $300 million in earnout payments tied to performance. Those figures are corporate deal terms, not a valuation signal for any token and not investment advice.",
          "BVNK’s product surface is infrastructure rather than a consumer wallet brand: tooling for businesses to hold, convert, and move value across fiat and digital currencies under compliance and interoperability constraints. Industry coverage has highlighted multi-jurisdiction reach—on the order of 130-plus jurisdictions in BVNK’s operating footprint, with payment volume and country/territory counts varying by source. The strategic point is breadth of regulated rails, not a single chain narrative.",
          "Mastercard’s public framing emphasizes interoperability: enabling banks, fintechs, and enterprises to expand stablecoin payments, payouts, settlement, and treasury flows while keeping security and compliance inside a network already familiar to card acquirers. For GetFreeBit readers, the story is institutional plumbing catching up with on-chain dollars—not a promise that retail “free crypto” economics suddenly improve.",
        ],
      },
      {
        heading: "Stablecoin payments and B2B rails get an incumbent owner",
        paragraphs: [
          "Stablecoins already move across borders faster than many correspondent-banking paths, but enterprises still need KYC, sanctions screening, fiat off-ramps, reconciliation, and dispute handling. BVNK-style infrastructure sits in that gap: convert bank money to on-chain dollars (or reverse), settle suppliers, and keep audit trails that finance teams can stomach. Bringing that stack inside Mastercard reduces reliance on rented middleware and lets the network productize stablecoin settlement alongside existing card and account rails.",
          "B2B is the near-term battleground. Cross-border invoices, marketplace payouts, payroll for distributed teams, and treasury sweeps are where latency and FX spreads hurt. If Mastercard can offer “fiat in, stablecoin settle, fiat out” as a managed service, corporates may adopt on-chain settlement without touching self-custody or DeFi interfaces. That pattern mirrors how card networks historically abstracted merchant complexity—except the settlement asset can now be a dollar-referenced token on a public or permissioned ledger.",
          "Consumers will feel secondary effects first: faster merchant settlement experiments, crypto-linked card funding options, and more bank apps that hide the chain. Operational risks remain classic—wrong network sends, phishing “support” redirects, and custodial account takeovers. Habits from [Self-Custody Withdrawal Checklist](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds) and yield skepticism in [Stablecoin Yield: What You’re Actually Paid For](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies) still apply when dollars move on-chain.",
        ],
      },
      {
        heading: "Competition with Visa and what to watch",
        paragraphs: [
          "Visa has pursued stablecoin and crypto settlement partnerships and network experiments of its own. Mastercard’s BVNK close is a vertical-integration answer: own more of the conversion and compliance layer instead of assembling it deal by deal. Competition will show up in bank and fintech RFPs—who can clear stablecoin payouts across more corridors with fewer operational exceptions—not in meme-coin volume. Stripe’s earlier Bridge acquisition and other payments-tech deals sit in the same category of “buy the pipes.”",
          "Watch three practical signals after close. First, product packaging: will Mastercard-branded APIs expose BVNK capabilities to issuers and acquirers under existing contracts? Second, corridor coverage and which stablecoin issuers are prioritized under bank risk policies. Third, regulatory overlays—payment stablecoin statutes, travel-rule expectations, and bank-permissioned experiments such as network-linked USD initiatives discussed in industry coverage. None of these are reasons to reallocate a portfolio; they are infrastructure milestones.",
          "This is not financial advice. Card-network M&A does not validate any token price, faucet scheme, or “guaranteed yield” pitch. If you use crypto debit products, evaluate cashback math and lockups with the same discipline as [Crypto Debit Cards: Cashback Math That Survives Fees](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency). Institutional expansion of stablecoin rails is real as of August 2026; treat it as payments modernization, verify primary company statements, and keep custody and phishing defenses first.",
        ],
      },
    ],
  },
  {
    kind: "news",
    slug: "us-lawmakers-push-forward-market-structure-reform-clarity-act",
    title:
      "U.S. Lawmakers Push Forward on Broader Market Structure Reform via CLARITY Act",
    description:
      "The Digital Asset Market Clarity Act remains a central U.S. market-structure fight in 2026. What SEC–CFTC lane-drawing tries to fix for spot crypto and registration—and why legislative status can still stall.",
    publishedAt: "2026-08-12",
    readingMinutes: 5,
    sections: [
      {
        heading: "Where CLARITY sits in the 2025–2026 timeline",
        paragraphs: [
          "The Digital Asset Market Clarity Act—widely branded CLARITY—is Congress’s leading attempt to write a comprehensive U.S. market-structure statute for digital assets. The House advanced and passed a CLARITY vehicle in 2025 (H.R. 3633 in that cycle). Through 2026, Senate Banking and Agriculture workstreams carried related drafts, including committee advancement of Clarity-style text in May and continued negotiation over a merged Senate package into the summer. As of mid-August 2026, the bill remains a live legislative priority rather than enacted law: floor timing, bipartisan amendments, ethics titles, and House–Senate reconciliation can still delay or reshape the final product.",
          "GetFreeBit’s standing advice on legislation is blunt: status changes week to week. Readers should verify the current Congress.gov status, committee statements, and any enrolled text before assuming exchange listings, DeFi interfaces, or token classifications are “solved.” Social posts that declare CLARITY “passed” without a presidential signature and chaptered public law are usually wrong or premature.",
          "Market-structure bills exist because enforcement actions and agency interpretations alone left issuers, platforms, and users without durable rules of the road. CLARITY-type proposals try to replace that fog with statutory definitions, registration categories, and supervisory lanes—while still leaving room for SEC rulemakings such as Regulation Crypto Assets on the securities-offering side.",
        ],
      },
      {
        heading: "What market-structure bills usually try to do",
        paragraphs: [
          "The core design problem is SEC versus CFTC jurisdiction. Securities regulators police investment contracts and capital formation; commodities regulators traditionally oversee futures and, under expanded statutes, spot digital commodity markets and intermediaries. Clarity-style drafts attempt a taxonomy: which tokens are digital commodities, which remain securities or investment-contract packages, and how “ancillary” or network tokens graduate as decentralization milestones are met. Spot crypto trading venues would face registration and customer-protection regimes closer to familiar market intermediaries rather than living in a perpetual gray zone.",
          "Registration and disclosure follow the lanes. Expect frameworks for digital commodity exchanges, brokers, dealers, and advisors under a CFTC-facing title, alongside SEC-facing offering and intermediary rules for securities-adjacent activity. Stablecoin yield limits, illicit-finance controls, developer liability carve-outs, and bankruptcy treatment of customer property have all been contested drafting topics in 2026 Senate texts. DeFi sits near the hardest edge: how far “decentralized” front ends and non-custodial software can remain outside intermediary registration without becoming a loophole for custodial look-alikes.",
          "For retail operators, the practical translation is platform diligence. Know whether you are using a registered venue, a foreign exchange, or a non-custodial interface—and what recovery looks like if something fails. Pair policy reading with operational guides such as [First CEX Account: KYC, 2FA, and Withdrawals](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency) and [DEX Swaps: Slippage, MEV, and Approvals](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
        ],
      },
      {
        heading: "Stakes for exchanges, DeFi, and readers who must verify status",
        paragraphs: [
          "Centralized exchanges care about listing standards, custody segregation, examination authority, and whether dual registration becomes the cost of U.S. access. Clearer lanes can reduce “regulation by lawsuit,” but compliance build-outs are expensive and may consolidate the industry toward larger, well-capitalized venues. International platforms will watch safe-harbor and extraterritorial hooks closely.",
          "DeFi teams care about definitions of control, fee routing, front-end liability, and whether DAO governance looks like an intermediary. Market-structure statutes that over-index on “anyone who touches a UI must register” can chill open-source interfaces; statutes that ignore real custody and solicitation can invite abuse. Token issuers care about secondary trading permission after fundraising—especially where SEC offering rules and CFTC spot regimes must interlock without trapping assets in permanent limbo.",
          "None of this is a trade signal. Legislative momentum in 2026 is meaningful, but stall risk is structural: bicameral differences, ethics provisions, stablecoin-yield politics, and calendar pressure. Verify current status on primary legislative sources, read reconciliation drafts when they appear, and keep personal security habits unchanged—self-custody checklists and phishing defenses do not wait on Congress. For how policy noise intersects with farming incentives, see also [Points Programs and TGE Expectations](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
        ],
      },
    ],
  },
  {
    kind: "news",
    slug: "tokenized-real-world-financial-assets-surge-past-19-billion",
    title:
      "Tokenized Real-World Financial Assets Surge Past $19 Billion Target as Banks Onboard",
    description:
      "Industry trackers show tokenized RWAs clearing earlier $19B milestones and moving into the low tens of billions by mid-2026. Methodology caveats, bank onboarding, and oracle–legal–redemption risks explained.",
    publishedAt: "2026-08-10",
    readingMinutes: 5,
    sections: [
      {
        heading: "A milestone narrative that needs a calculator",
        paragraphs: [
          "Through 2025 and into 2026, tokenized real-world assets (RWAs)—especially U.S. Treasuries, funds, private credit, and deposit-like instruments represented on-chain—became one of crypto’s few growth stories driven more by institutions than by retail leverage. Industry dashboards and research notes widely used a roughly $19 billion on-chain RWA figure as an earlier milestone claim; by spring and early summer 2026, several trackers citing sources such as RWA.xyz described distributed tokenized RWA value (typically excluding stablecoins) in a higher band, often cited around the low-to-mid $30 billions depending on date and methodology. Treat “past $19 billion” as a passed waypoint in that reporting arc, not as a single audited NAV stamped by a regulator.",
          "Banks and asset managers experimenting with tokenization—permissioned fund shares, treasury products, and deposit tokens—are the demand side of the narrative. Public-chain distribution (Ethereum remaining a major host in many dashboards) coexists with permissioned ledgers. The headline number is less important than composition: short-duration government paper and cash-management products dominate quality-weighted growth, while flashier “everything tokenized” claims still outrun operational reality.",
          "GetFreeBit’s framing: RWA growth is real enough to analyze, and fragile enough to misread. Always ask what the denominator includes before repeating a TVL screenshot.",
        ],
      },
      {
        heading: "Methodology caveats: what counts as RWA TVL",
        paragraphs: [
          "Trackers often split “distributed” value—where the blockchain is the distribution rail for issuance and transfer—from “represented” value, which can count much larger off-chain pools mirrored or attested on-chain. Stablecoins are usually reported separately even though they are dollar instruments; mixing them into RWA TVL inflates the story. Market-cap views that bake in speculative token prices diverge again from asset-value views tied to underlying Treasuries or fund NAV.",
          "Double-counting is a recurring trap: the same treasury sleeve can appear in a fund token, a wrapping protocol, and a lending market. Bridged representations across chains can multiply explorer balances without multiplying economic claims. When a dashboard says “$19B” or “$32B,” read the footnote—as-of date, inclusion of private credit, commodities, equities, and whether permissioned bank chains are in scope.",
          "For users comparing “yield,” remember that a tokenized T-bill fund return is mostly the underlying bill yield minus fees and operational frictions—not DeFi points. Contrast that with lending APYs explained in [Lending Yield and Liquidation Risk](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest) and [Stablecoin Yield: What You’re Actually Paid For](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies).",
        ],
      },
      {
        heading: "Oracle, legal-wrapper, and redemption risks",
        paragraphs: [
          "Oracle and NAV risk: if secondary markets trade the token away from official NAV, or if price feeds used in DeFi lending mis-mark the asset, liquidations and insolvency cascades can appear even when the off-chain portfolio is fine. Legal-wrapper risk: the token is usually a claim on a fund, note, or deposit arrangement governed by off-chain documents—jurisdiction, transfer restrictions, and KYC gates matter more than the ERC-20 interface. Redemption risk: gates, notice periods, banking hours, and stablecoin off-ramp congestion can delay exit when everyone runs for the door simultaneously.",
          "Smart-contract and admin-key risk still apply. A tokenized fund can be impeccably collateralized in traditional terms and still pause transfers, upgrade contracts, or blacklist addresses under compliance policies. That is often a feature for institutions and a surprise for DeFi users who assumed censorship resistance. Bridge risk appears whenever the “same” RWA is wrapped across domains.",
          "Banks onboarding is constructive for settlement experiments and for bringing audited issuers on-chain, but it is not a blanket endorsement of every RWA ticker on a DEX. Prefer issuers with clear prospectuses, attested reserves or holdings, and redemption policies you can actually use. Verify dashboard methodology before citing size milestones, size positions for operational and legal risk—not for social-media TVL bragging—and keep how-to discipline around approvals and bridges via resources such as [Bridging Without Losing Funds](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge) when moving any on-chain representation of off-chain value.",
        ],
      },
    ],
  },
  {
    kind: "news",
    slug: "major-defi-protocols-move-toward-fee-sharing-and-value-accrual",
    title:
      "Major DeFi Protocols Move Toward Fee-Sharing Initiatives and Direct Value Accrual Models",
    description:
      "Fee switches, buybacks, burns, and builder codes are reshaping DeFi token economics in 2026. How the mechanics work, what governance trades off, and why “yield” promises still deserve skepticism.",
    publishedAt: "2026-08-15",
    readingMinutes: 5,
    sections: [
      {
        heading: "From governance theater to cash-flow linkage",
        paragraphs: [
          "For years, many blue-chip DeFi tokens conferred governance rights and narrative leverage while protocol fees accrued to liquidity providers, lenders, or off-chain entities. In late 2025 and through 2026, that equilibrium cracked. Uniswap’s UNIfication path activated protocol fees and routed value into buy-and-burn style mechanisms; Aave’s Aavenomics track moved from discretionary buyback programs toward more automatic revenue routing into AAVE market purchases; other venues experimented with builder codes, growth shares, and treasury fee splits. The common theme is direct value accrual: make token float respond to real protocol usage rather than emissions alone.",
          "GetFreeBit covers this as mechanism design and risk analysis—not as a forecast of token prices or a promise of yield. Fee-sharing can reduce supply or fund treasuries; it does not create a legal dividend claim for holders in most designs, and governance can reverse course. Anyone advertising “risk-free protocol yield” after a fee switch is selling a story the mechanics do not support.",
          "The trend also collides with regulation. Direct fee distribution to passive holders can look closer to investment-contract economics than burns or treasury retention. That is one reason several protocols prefer buybacks, burns, or builder incentives over wallet-by-wallet “dividends.”",
        ],
      },
      {
        heading: "Mechanics: fee switches, buybacks, burns, and builder codes",
        paragraphs: [
          "A fee switch redirects a portion of trading or protocol fees to a protocol-controlled destination. On a DEX, that may mean carving basis points from the swap fee stack into a collector contract. Liquidity providers and traders feel the change through tighter or wider effective spreads and through competition with rival venues. On a lending protocol, value accrual more often comes from interest margins, liquidation penalties, or stablecoin revenues rather than a literal AMM fee toggle.",
          "Buybacks use accumulated fees or treasury assets to purchase the governance token in the market. Automation matters: committee-directed programs can pause when revenues dip; hardwired routing reduces discretion but also reduces flexibility in a crisis. Burns permanently remove purchased or allocated tokens from supply, translating fees into a stock-reduction story rather than a cash distribution. Builder codes and referral-style fee shares pay integrators who originate volume—aligning distribution partners with protocol growth, while raising questions about who captures surplus when incentives get cut.",
          "Users still need ordinary DeFi hygiene. Approvals, MEV, and routing remain the loss vectors that matter day to day—see [DEX Swaps: Slippage, MEV, and Approvals](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens). Lending-side accrual does not remove liquidation math covered in [Lending Yield and Liquidation Risk](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest).",
        ],
      },
      {
        heading: "Governance tradeoffs without yield promises",
        paragraphs: [
          "Turning on fees redistributes surplus among LPs, traders, token holders, builders, and the DAO treasury. Push fees too high and volume migrates; push buybacks too aggressively and the treasury loses dry powder for audits, contributors, and incident response. Governance attacks, low turnout, and concentrated voting power mean “the protocol decided” can be a thin committee with a marketing wrapper. Transparent dashboards of fee intake and sink transactions help; they do not eliminate principal-agent problems.",
          "Security-conscious readers should separate three layers: (1) protocol solvency and smart-contract risk, (2) economic policy risk when governance changes fee parameters, and (3) market risk if participants price tokens as if burn rates were guaranteed coupons. None of those layers is fixed by a successful snapshot vote. Competitors can copy mechanisms; regulators can reinterpret distributions; and fee income is cyclical with trading and borrowing demand.",
          "Practical stance for August 2026: study primary governance proposals and on-chain fee collectors before believing thread summaries; size exposure as speculative governance-asset risk, not as a bond substitute; and ignore APY stickers that convert buyback notionals into personal yield. For LP inventory risk that fee debates often gloss over, read [Impermanent Loss With Real Numbers](/guides/explaining-liquidity-pools-and-automated-market-makers-amms). Value accrual is a maturing design pattern in DeFi—not a shortcut around market, contract, or governance risk.",
        ],
      },
    ],
  },
];
