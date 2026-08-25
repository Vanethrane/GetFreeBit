import type { Article } from "./types";

/**
 * Pillar SEO guides — faucets, airdrops, yield, onboarding gaps not covered by foundation corpus.
 */
export const GUIDES_SEO: Article[] = [
  {
    slug: "evaluating-crypto-faucets-time-vs-reward",
    kind: "guide",
    title: "Evaluating Crypto Faucets: Time vs Reward Math",
    description:
      "A practical framework for measuring faucet and offerwall payouts against captchas, timers, and withdrawal minimums—so micro-earning stays worth the hour.",
    publishedAt: "2026-08-01",
    readingMinutes: 6,
    sections: [
      {
        heading: "Why hourly claims hide bad economics",
        paragraphs: [
          "Crypto [[faucet]]s pay tiny amounts per action—hourly rolls, short timers, or paid-to-click ads. The headline “free bitcoin” ignores your time, electricity, attention, and the probability that an offer reverses. GetFreeBit treats faucets as a **micro-earnings** pillar, not magic wealth. Before you register anywhere, estimate dollars per hour at realistic claim frequency, not best-case streaks.",
          "Start with **gross coins per day** at a sustainable schedule (for example, four hourly claims while you work, not twenty-four). Convert to USD using a conservative price—not the peak of a meme pump. Subtract expected offerwall chargebacks if you rely on surveys. Compare that net to minimum wage in your region; many stacks fail honestly at this step, and that is useful information.",
          "Our [Faucet referral desk](/faucets) lists US-accessible platforms with referral commissions, but referrals do not fix negative hourly math for you—they only help if your audience actually earns. Pair this guide with [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage) so you separate burner claim wallets from long-term [[self-custody]].",
        ],
      },
      {
        heading: "Variables that change the equation",
        paragraphs: [
          "**Withdrawal floors** dominate small earners. A site that pays well per click but requires 30,000 satoshi before exit can trap months of effort if you quit early. Prefer low-threshold exits or route through [[FaucetPay]] when supported—see [How FaucetPay Routing Works for Micro-Earnings](/guides/how-faucetpay-routing-works-for-micro-earnings).",
          "**Gas and routing fees** apply when you finally move to your own wallet. On-chain BTC micro-withdrawals can cost more than the drip unless you batch via a micro-wallet. On EVM chains, a single bad [[gas]] spike can erase a week of faucet coins. Track fees as part of ROI, not as a surprise at the end.",
          "**Captcha friction and account bans** are operational risks. VPN hopping, multi-accounting, or ad-blocker conflicts can zero your balance. US users should assume some [[offerwall]] tasks geo-restrict while core faucet claims still work—budget time accordingly.",
        ],
      },
      {
        heading: "A simple scorecard before you commit",
        paragraphs: [
          "Rate each platform 1–5 on: (1) sustainable hourly USD at your schedule, (2) withdrawal path clarity, (3) US access without VPN theater, (4) phishing/respectability of the domain, (5) referral ethics if you promote it. Anything below 3 on respectability is a hard skip regardless of advertised APR.",
          "Log a two-week trial: dates, minutes spent, coins credited, pending vs paid, and fees on exit. Spreadsheets beat memory when you later compare Cointiply-style offerwalls against pure hourly BTC rolls. Tax-wise, micro-income may still be reportable—see [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "Bottom line: faucets are worth it when net hourly return beats your next-best use of time **and** you can exit without trapped dust. Otherwise, treat them as education with optional tips, not a job.",
        ],
      },
      {
        heading: "When faucets still make sense",
        paragraphs: [
          "Faucets shine as **on-ramp education**: learning [[block explorer]] reads, wallet sends, and [[test amount]] discipline with low stakes. They also stack for patient earners who already use a daily routine and route to [[FaucetPay]] before self-custody sweeps.",
          "Referral builders with honest audiences can earn passively if referrals stay active—but only after you have verified the platform pays you reliably. Promote from the [faucet desk](/faucets) with disclosure, never with guaranteed income language.",
          "Risk: gambling multiply modes on legacy BTC sites are negative expected value for most users. If you faucet, claim; do not confuse entertainment loss with earning strategy. Phishing clones target faucet keywords aggressively—bookmark official URLs from our desk, not search ads.",
        ],
      },
    ],
  },
  {
    slug: "how-faucetpay-routing-works-for-micro-earnings",
    kind: "guide",
    title: "How FaucetPay Routing Works for Micro-Earnings",
    description:
      "Why micro-wallets sit between faucets and self-custody, how internal transfers and multi-coin balances work, and when to sweep to your own keys.",
    publishedAt: "2026-08-03",
    readingMinutes: 6,
    sections: [
      {
        heading: "The problem faucets create",
        paragraphs: [
          "Individual [[faucet]] sites pay fractions of a cent per claim. Withdrawing each drip directly to your own [[blockchain]] address often fails minimums or gets eaten by [[gas]] and mining fees—especially on Bitcoin’s [[UTXO]] model. Operators solved this by batching user balances inside custodial **micro-wallets** before users exit to self-custody.",
          "[[FaucetPay]] is the most common rail: a single account receives payouts from dozens of faucets, PTC sites, and offerwalls in multiple coins. You swap internally, stake small balances if you accept that risk, or withdraw when aggregated value clears external thresholds. It is **not** [[self-custody]]—it is a convenience layer you should sweep on a schedule.",
          "US earners widely use FaucetPay without a reported site-wide geo-block, though individual third-party offers may still restrict. Start from our [Faucet referral desk](/faucets) and the how-to [Set Up FaucetPay and Route Faucet Payouts](/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts).",
        ],
      },
      {
        heading: "Internal transfers vs external withdrawals",
        paragraphs: [
          "Internal transfers between FaucetPay users or supported sites are often instant and cheap—sometimes with **no minimum**. That is ideal for consolidating dust before one outbound transaction. External withdrawals to your wallet trigger network fees and review windows; thresholds vary by asset.",
          "Treat FaucetPay like a **checking account for micro-income**, not a vault. Enable two-factor authentication, use a unique password, and never share the account with strangers running “faucet teams.” Credential stuffing hits high-traffic earners.",
          "When you withdraw externally, follow the same discipline as [[CEX withdrawal]]s: correct asset, correct network, [[test amount]] first—[How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
        ],
      },
      {
        heading: "Multi-faucet workflow for US operators",
        paragraphs: [
          "Register FaucetPay once, then connect it as the payout address on Cointiply, FreeBitco.in, CoinPayU, Fire Faucet, and similar US-listed platforms on our [desk](/faucets). Run a **daily or twice-daily** claim routine rather than obsessive hourly checks unless ROI justifies it—[Evaluating Crypto Faucets: Time vs Reward](/guides/evaluating-crypto-faucets-time-vs-reward).",
          "Weekly or monthly, sweep aggregated balances to a [[hot wallet]] you control, then move meaningful sums to [[cold storage]]. Keeping life-changing value on a micro-wallet defeats the purpose of learning self-custody.",
          "Referral programs on FaucetPay can supplement claims if you document honestly. Empty referral slots on our desk are placeholders—add your codes in `faucet-referrals.ts` when partner links verify.",
        ],
      },
      {
        heading: "Risks and failure modes",
        paragraphs: [
          "Custodial freeze, hack, or policy change can lock balances—size exposure accordingly. Smart-contract risk does not apply to the ledger inside FaucetPay the same way as DeFi, but **platform risk** is real.",
          "Swaps inside custodial interfaces may have spread costs hidden in the rate. Compare against a [[DEX]] quote when size matters—[How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
          "Bottom line: FaucetPay routing amortizes fees and simplifies multi-site earning. Use it as a pipe, not a destination—and keep keys you actually own downstream.",
        ],
      },
    ],
  },
  {
    slug: "airdrop-eligibility-what-protocols-actually-measure",
    kind: "guide",
    title: "Airdrop Eligibility: What Protocols Actually Measure",
    description:
      "On-chain usage, holding periods, testnet participation, and Sybil filters—how projects score wallets before a token generation event.",
    publishedAt: "2026-08-05",
    readingMinutes: 6,
    sections: [
      {
        heading: "Airdrops are allocation policies, not gifts",
        paragraphs: [
          "An [[airdrop]] distributes tokens to wallets that meet criteria defined by a team or DAO—often retroactively. Marketing calls it “free money”; economically it is **customer acquisition** or decentralization theater priced in dilution. Protocols measure behavior they want to repeat: bridging, swapping, providing liquidity, voting, or testing features on [[testnet]].",
          "Post-2024 farming matured: teams use clustering, exchange deposit patterns, and graph analysis to filter [[Sybil]] farms. One person with fifty similar wallets may earn less than one organic wallet with coherent history. Read [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are) for the adversarial lens.",
          "Points programs complicate timing—off-chain scores may convert at a [[TGE]] with uncertain exchange rates. Treat points as **call options with unknown strike**, not bank balances.",
        ],
      },
      {
        heading: "Signals teams commonly score",
        paragraphs: [
          "**Temporal consistency**: repeated interaction across weeks, not one burst the day before snapshot rumors. **Fee-paid actions** suggest real users—though whales can Sybil too. **Diversity of contracts** (swap, lend, bridge) beats single-function spam on some scoring models.",
          "**Testnet participation** with unique, sustained activity can matter for infrastructure plays—pair with [Testnet Farming Without Contaminating Your Main Wallet](/guides/testnet-farming-without-contaminating-your-main-wallet). **Governance participation** and Gitcoin-style donation history appear in some retro lists.",
          "**Geography and compliance** occasionally exclude US persons from claims or require KYC at claim time—read terms before spending gas farming a token you cannot legally receive.",
        ],
      },
      {
        heading: "What usually does not help",
        paragraphs: [
          "Buying a “farmer wallet” with history is a scam vector—you do not know what liabilities that key carries. Random NFT mints from spam airdrops do not substitute for protocol usage. Telegram “guaranteed allocation” sales are fraud.",
          "Dusting attacks and unsolicited tokens in your wallet are not eligibility; they are noise or phishing setup. Never sign unknown claim contracts linked from DMs.",
          "Chasing every rumour spreads gas across chains with no thesis. Budget gas like any investment—[What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion).",
        ],
      },
      {
        heading: "Operator checklist before you farm",
        paragraphs: [
          "Pick protocols you would use if no token existed—product-market fit reduces wasted gas. Use a **burn wallet** separate from savings; never reuse your main [[seed phrase]] on testnets or sketchy mint sites.",
          "Track actions in a simple log: date, chain, contract, txid, USD gas spent. Compare cumulative gas to plausible allocation scenarios—if break-even requires fantasy FDV, pass.",
          "Bottom line: eligibility is a weighted scorecard, not a checkbox quest. Organic, documented usage beats copy-paste farms—and Sybil filters are designed to prove that.",
        ],
      },
    ],
  },
  {
    slug: "testnet-farming-without-contaminating-your-main-wallet",
    kind: "guide",
    title: "Testnet Farming Without Contaminating Your Main Wallet",
    description:
      "Separate burn wallets, faucet hygiene, and key isolation so testnet and mainnet experiments do not merge into one recoverable disaster.",
    publishedAt: "2026-08-07",
    readingMinutes: 6,
    sections: [
      {
        heading: "Why testnet keys still matter",
        paragraphs: [
          "[[Testnet]] tokens are worthless by design, but **wallet hygiene** is not. Browser extensions and mobile apps often reuse the same [[seed phrase]] across networks if you import carelessly. A seed typed into a fake “testnet faucet” page is indistinguishable from mainnet compromise—attackers harvest phrases from low-stakes contexts.",
          "Successful [[airdrop farming]] sometimes rewards testnet usage tied to later mainnet addresses. Teams may snapshot linked identities. You want coherent history on a **dedicated farming wallet**, not accidental linkage that merges your cold storage with experimental contracts.",
          "Start with [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet) for mainnet, then create a second wallet labeled TESTNET/BURN only.",
        ],
      },
      {
        heading: "Wallet separation playbook",
        paragraphs: [
          "Use a distinct seed or hardware-derived account never funded with meaningful mainnet value. Label it in your password manager as burn-only. Do not install the same browser profile that holds your savings extension.",
          "Fund testnet gas from official faucets listed in protocol docs—never “send 0.1 ETH to unlock test tokens” DMs. On EVM testnets, use chain-specific faucets and verify [[chain ID]] in the wallet before signing.",
          "When a project asks you to bridge test assets, confirm you are not accidentally on [[mainnet]]. Red network badges exist for a reason.",
        ],
      },
      {
        heading: "Behavior that reads organic to Sybil filters",
        paragraphs: [
          "Spread actions over weeks: deploy, swap, provide small liquidity, vote once. Avoid identical transactions from ten wallets on the same block—that is clustering bait. One wallet, one narrative beats ten clones.",
          "Interact with official contracts linked from docs, not random addresses in Discord. [[Smart contract]] phishing on testnets trains bad habits that transfer to mainnet.",
          "Document txids for later eligibility checks—[How to Track Airdrop Eligibility with On-Chain Tools](/how-to/how-to-track-airdrop-eligibility-with-on-chain-tools).",
        ],
      },
      {
        heading: "When to stop or rotate",
        paragraphs: [
          "Rotate burn wallets if you signed suspicious permissions or connected to unverified dApps. Revoke patterns from mainnet apply—[How to Revoke Token Approvals](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "If cumulative testnet gas (converted from mainnet faucet earnings) exceeds your budget, pause. Testnet farming is speculative labor, not guaranteed allocation.",
          "Bottom line: treat testnets as a sandbox with real key-management consequences. Isolate seeds, fund honestly, behave like one user—not a warehouse of bots.",
        ],
      },
    ],
  },
  {
    slug: "liquid-staking-vs-native-staking-trade-offs-for-earners",
    kind: "guide",
    title: "Liquid Staking vs Native Staking: Trade-offs for Earners",
    description:
      "Compare solo validators, delegated native stake, and liquid staking tokens (LSDs)—liquidity, slashing, smart-contract, and tax complexity for yield seekers.",
    publishedAt: "2026-08-09",
    readingMinutes: 6,
    sections: [
      {
        heading: "Three ways to stake ETH and beyond",
        paragraphs: [
          "**Native staking** locks assets with the protocol (solo 32 ETH validators, or delegated stake to an operator). Rewards come from issuance and tips; [[slash]]ing punishes downtime or double-signing. **Liquid staking** deposits into a protocol that issues a receipt token ([[LSD]] like stETH, rETH) tradable while underlying stake remains locked.",
          "Receipt tokens let you use stake in DeFi—collateral, [[liquidity pool]]s, loops—at the cost of smart-contract, oracle, and liquidity risk on the LSD itself. APY headlines often ignore these layers.",
          "Foundation: [What Crypto Staking Is and How Yield Is Generated](/guides/what-crypto-staking-is-and-how-yield-is-generated) and [The Difference Between Proof of Work and Proof of Stake](/guides/the-difference-between-proof-of-work-and-proof-of-stake).",
        ],
      },
      {
        heading: "Liquidity and exit timelines",
        paragraphs: [
          "Native delegated stake may face [[unbonding period]]s—days to weeks before tokens move. Solo validators have operational duties. LSDs trade on secondary markets, but can **depeg** under stress (discount to underlying ETH), turning “liquid” into costly.",
          "Redemption queues on popular LSD protocols can lengthen during volatility—liquidity is not instant guaranteed. Plan exits before you need cash, not during a bank-run headline.",
          "Centralized staking-as-a-service on [[CEX]]es offers simple UI but is custodial—compare with [How to Buy Crypto on a Centralized Exchange](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency) and withdrawal discipline.",
        ],
      },
      {
        heading: "Risk stack comparison",
        paragraphs: [
          "Native: operator/slashing + key risk if solo. LSD: all native risks **plus** contract bugs, governance upgrades, and DeFi composability blow-ups. [[Restaking]] and [[LRT]] tokens add another layer—receipt on receipt.",
          "Tax treatment may differ when swapping LSDs vs holding native rewards—jurisdiction-specific; keep logs—[crypto taxes how-to](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "Never stake assets you need for near-term expenses. [[Withdrawal lock]]s are real even when marketing says “liquid.”",
        ],
      },
      {
        heading: "Choosing for GetFreeBit readers",
        paragraphs: [
          "Beginners with small balances: delegated native or simple LSD on reputable protocols, small size, read slashing policy. DeFi natives: LSD only if you can monitor depeg and contract news.",
          "Compare headline APY with [How to Compare Staking and Savings APY](/how-to/how-to-compare-staking-and-savings-apy-without-chasing-headlines)—subtract estimated smart-contract and depeg tail risk mentally.",
          "Bottom line: native stake optimizes protocol security participation; LSD optimizes capital mobility at the price of stacked dependencies. Pick the risk you can actually monitor.",
        ],
      },
    ],
  },
  {
    slug: "impermanent-loss-explained-for-liquidity-providers",
    kind: "guide",
    title: "Impermanent Loss Explained for Liquidity Providers",
    description:
      "Why AMM pool inventory drifts versus holding, how fees partially compensate, and when LP “yield” is still a losing bet.",
    publishedAt: "2026-08-11",
    readingMinutes: 6,
    sections: [
      {
        heading: "Hold vs pool: two different bets",
        paragraphs: [
          "When you deposit into an [[AMM]] [[liquidity pool]], you supply two assets (for example ETH and USDC). The pool enforces a pricing curve—classically x·y=k—so reserves rebalance as traders swap. If one asset moons relative to the other, your inventory ends up heavier in the lagging asset versus simply **holding** the same starting amounts. That divergence is [[impermanent loss]] (IL)—“impermanent” until you withdraw and crystallize the difference.",
          "Trading fees paid to LPs can offset IL when volume is high and price moves are modest. Marketing APY often counts fees without showing IL under realistic volatility—especially on correlated pairs vs exotic alts.",
          "Mechanics primer: [Explaining Liquidity Pools and Automated Market Makers](/guides/explaining-liquidity-pools-and-automated-market-makers-amms). Practical entry: [How to Provide Liquidity to an AMM Pool](/how-to/how-to-provide-liquidity-to-an-automated-market-maker-pool).",
        ],
      },
      {
        heading: "Numeric intuition without hype",
        paragraphs: [
          "If ETH doubles in price vs USDC while you LP ETH/USDC in a constant-product pool, your ETH share shrinks as arbitrageurs buy cheap ETH from the pool. You participated in upside, but less than hold. If ETH reverts to the entry price, IL “disappears” before fees—you are back near hold plus accumulated fees.",
          "One-way trends hurt LP inventory the most. Stable-stable pools lower IL but carry peg/smart-contract risk—[How Stablecoins Maintain Their Peg](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies).",
          "Concentrated liquidity designs (Uniswap v3-style) amplify fee capture **and** IL if price exits your range—you can end up 100% in one token sitting idle.",
        ],
      },
      {
        heading: "MEV, gas, and reward tokens",
        paragraphs: [
          "Entering and exiting pools costs [[gas]]; small LPs lose to fixed costs. [[MEV]] and toxic flow can extract value from passive pools during volatility. Some farms emit reward tokens that temporarily mask IL—when emissions drop, reality appears.",
          "Calculate **net**: fees + rewards + IL + gas. If you cannot estimate IL for a 2× move in either asset, you are not ready to size the position.",
          "Revoke token approvals when exiting—[How to Revoke Token Approvals](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
        ],
      },
      {
        heading: "When LP still makes sense",
        paragraphs: [
          "High-volume pairs you want to hold long-term anyway, stable pairs you understand, or professional market-making with hedges off-chain. Not “100% APY” screenshots on thin pairs.",
          "Micro-earners routing faucet proceeds should usually **swap or hold**, not LP exotic alts—fee income rarely beats IL on random offerwall tokens.",
          "Bottom line: IL is inventory drift, not a bug. Fees may pay you to provide liquidity, but they do not delete directional risk—model both before you deposit.",
        ],
      },
    ],
  },
];
