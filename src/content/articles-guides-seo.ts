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
    readingMinutes: 7,
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
      {
        heading: "Operational cadence that keeps routing honest",
        paragraphs: [
          "Treat the micro-wallet as a **throughput meter**, not a scoreboard. Once a week, export or screenshot balances by coin, note pending external withdrawals, and compare against the claim log from your faucet sites. Discrepancies usually mean a wrong coin address, a delayed PTC credit, or a site that changed rails without updating its UI—catch those before you scale the stack. Pair this habit with [How to Set Up FaucetPay and Route Faucet Payouts](/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts) so the first week of routing is documented, not improvised.",
          "Decide in advance what “enough to sweep” means in USD at a conservative price. Below that floor, leave dust alone rather than paying network fees that erase the week’s work. Above it, prefer one outbound transfer on a quiet [[gas]] window over drip withdrawals that multiply fixed costs. If you hold multiple coins inside FaucetPay, convert only what you understand: a dusty alt with thin liquidity can lose more to spread than you gained on the faucet that paid it.",
          "Security ops matter as much as fee math. Keep recovery email access hardened, rotate the password if you ever typed it on a borrowed device, and never approve browser extensions that promise “auto-claim” automation for FaucetPay sessions. Credential thieves target micro-earning accounts because users underestimate the balance after months of quiet claims. If you suspect compromise, freeze external faucet payouts first, then change credentials and rebuild the payout address map from bookmarked official URLs only.",
          "Finally, keep self-custody downstream scheduled. A micro-wallet that always “almost” hits your sweep threshold is a psychological trap: balances grow until a freeze or hack hurts. Calendar the sweep the same way you calendar claims—routing works when both ends of the pipe are intentional.",
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
    readingMinutes: 7,
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
      {
        heading: "Translating scorecards into a gas budget",
        paragraphs: [
          "Before you farm another rumor, write a one-page thesis: which behaviors the protocol publicly rewards, which chains matter, and what a *conservative* circulating-supply scenario implies for a mid-tier wallet. If break-even requires fantasy [[TGE]] valuations or assumes you sit in the top percentile of a leaderboard you cannot verify, the thesis fails on paper—stop there. Use [How to Track Airdrop Eligibility with On-Chain Tools](/how-to/how-to-track-airdrop-eligibility-with-on-chain-tools) to audit gaps against real txs instead of Discord screenshots.",
          "Cap cumulative [[gas]] as a hard stop-loss, denominated in USD at today’s prices—not “points needed.” When spend hits the cap, pause even if quests remain unfinished. Teams change criteria; your fees do not refund. Prefer fewer protocols with coherent histories over spraying identical swaps across every new L2 that tweets a points dashboard.",
          "Separate identity risk from capital risk. A burn wallet with documented usage can still be linked to you via KYC claim portals, exchange deposits, or ENS reuse. Plan claim hygiene early: which address will claim, whether you will bridge rewards to a CEX, and how you will avoid signing unlimited [[approval]]s on lookalike claim sites. Phishing spikes hardest in the week after an [[airdrop]] announcement—bookmark official URLs now, not when FOMO peaks.",
          "Revisit eligibility monthly. If your log shows volume without retention, or retention without diversity, adjust behavior deliberately—or exit. Eligibility farming is optional labor; treating it like a job without a payroll is how operators burn gas and morale.",
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
    readingMinutes: 7,
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
      {
        heading: "Mainnet touchpoints without merging identities",
        paragraphs: [
          "Some campaigns eventually require a mainnet registration transaction, a funded address, or a bridge that links test history to production. When that happens, fund a **dedicated mainnet burn address**—still separate from cold storage—with only the minimum needed. Never top up that address from an exchange withdrawal that also funds your savings wallet if you care about graph clustering; use fresh withdrawals or carefully planned hops you accept as linked.",
          "Before any mainnet signature, re-verify [[chain ID]], contract address from official docs, and simulation output. Testnet muscle memory is dangerous: the same UI can flip to mainnet after a wallet reconnect. Reject unlimited [[approval]]s on experimental dApps; if a flow demands them, size the wallet so a drain is survivable. After suspicious connections, revoke and rotate—habits from [How to Revoke Token Approvals](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits) apply even when amounts feel “small.”",
          "Keep the burn wallet’s [[seed phrase]] offline and never typed into faucet forms, Discord bots, or “eligibility checkers.” Phishing operators specifically target testnet farmers who lower their guard because tokens are worthless. Worthless assets; valuable keys.",
          "Document which identities you intentionally linked (email for faucet, Discord for roles, mainnet burn for claims). Unplanned linkage is how a sandbox becomes a map of your entire stack. When in doubt, stop farming rather than “just this once” importing a main seed into a test profile.",
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
    readingMinutes: 7,
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
      {
        heading: "Monitoring cadence after you choose a path",
        paragraphs: [
          "Whichever staking path you pick, schedule a monthly review instead of chasing APY screenshots. For native stake, check validator performance, commission changes, and unbonding timelines before you need liquidity. For LSDs, watch secondary-market peg, redemption queue length, and protocol incident channels—depegs often start as “temporary discounts” that widen under stress. Write the review outcome in the same log you use for tax lots so yield decisions stay auditable.",
          "Size positions by **attention budget**, not max imaginable APY. An LSD looped as collateral across three protocols can produce headline yield while concentrating smart-contract and liquidation risk you cannot monitor at work. Prefer one transparent position you understand over a restaking stack you only saw in a thread. Pair this discipline with [How to Compare Staking and Savings APY Without Chasing Headlines](/how-to/how-to-compare-staking-and-savings-apy-without-chasing-headlines).",
          "Exit planning belongs in the entry checklist. Know how long native unbonding takes, whether LSD redemption is queue-based, and what [[gas]] you need to unwind. If a position cannot be exited within your personal emergency window without heavy slippage, it is not “liquid” for your life—regardless of the token ticker.",
          "Finally, separate staking experiments from long-term cold storage. Keep meaningful savings on keys you rarely connect to DeFi; stake only capital you accept as operationally hot. Yield that requires constant wallet signatures is a job with variable pay—budget time and risk accordingly.",
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
    readingMinutes: 7,
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
      {
        heading: "A pre-deposit checklist for GetFreeBit operators",
        paragraphs: [
          "Before you deposit, write the pair, fee tier, expected hold horizon, and the IL you would accept if one asset doubles while the other is flat. If you cannot state that number, you are guessing. Cross-check current volume and fee APR from the pool UI—not a farm aggregator screenshot that mixes emissions with trading fees. Emissions can vanish overnight; IL does not wait for your exit.",
          "Prefer pools where you already want both assets for non-LP reasons (for example ETH you hold long-term plus a stablecoin buffer). That framing turns residual inventory drift into a cost of earning fees on holdings you keep anyway—not a leveraged bet on a random alt. Micro-earners sweeping faucet coins should usually swap to a destination asset, not LP thin pairs that look high-APY because nobody trades them.",
          "Operational hygiene: use a dedicated hot wallet, verify the pool contract from official docs, and reject unlimited [[approval]]s when a finite allowance works. After exit, revoke leftover allowances and record entry/exit prices for tax lots. [[Gas]] to enter, rebalance, and exit belongs in the ROI line—small LPs often lose to fixed costs before IL even matters.",
          "If price leaves a concentrated range, treat the position as idle inventory plus opportunity cost—not “set and forget yield.” Either widen/re-enter with eyes open or withdraw. Passive LP without monitoring is how fee income quietly turns into a worse bag than holding.",
        ],
      },
    ],
  },
  {
    slug: "points-programs-and-tge-expectations",
    kind: "guide",
    title: "Points Programs and TGE Expectations",
    description:
      "How pre-token points scoring works, what protocols measure, why TGE unlocks disappoint leaderboard chasers, and a practical checklist to farm without wrecking wallets.",
    publishedAt: "2026-08-24",
    readingMinutes: 7,
    sections: [
      {
        heading: "What points programs actually are",
        paragraphs: [
          "A [[points]] program is a pre-token incentive scoreboard: protocols track wallet behavior off-chain or on-chain, assign opaque units, and hint that those units may convert into tokens at a later [[TGE]]. Marketing frames points as progress; economically they are provisional IOUs with unknown exchange rates, unknown circulating supply, and optional anti-[[Sybil]] discounts. GetFreeBit treats them as speculative labor—closer to unpaid product testing than to a balance sheet asset.",
          "Points differ from a confirmed [[airdrop]] snapshot. An airdrop (when published) states criteria and often a claim contract; points dashboards can change weights weekly, wipe seasons, or never convert. Teams use points to bootstrap usage, gather feedback, and delay token design decisions. You are paying [[gas]] and attention for a call option the issuer can reprice.",
          "That does not make every program worthless. Some seasons convert with clear formulas; others reward genuine users who would have used the product anyway. The operator’s job is to separate “I want this product” from “I need leaderboard rank.” The first can justify modest fees; the second often fails math once unlock schedules and float appear.",
        ],
      },
      {
        heading: "What protocols typically measure",
        paragraphs: [
          "Expect scoring across **volume** (swaps, bridges, notional lent), **retention** (active weeks, not a one-day burst), and **diversity** (multiple contract interactions rather than a single spam loop). Fee-paid actions usually weigh more than free faucet clicks because they are costlier to Sybil—though whales can still manufacture volume. Governance votes, liquidity provision, and referrals appear in some models; copy-paste quest lists from anonymous threads do not guarantee inclusion.",
          "[[Sybil]] filters sit underneath the pretty UI. Clustering algorithms look for funded-from-same-CEX patterns, identical tx graphs, shared browsers, and synchronized timestamps. Fifty thin wallets often underperform one coherent address with months of organic history. Read [Airdrop Eligibility: What Protocols Actually Measure](/guides/airdrop-eligibility-what-protocols-actually-measure) and [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are) before you industrialize accounts.",
          "Testnet seasons may feed the same CRM as mainnet points. Isolate keys so experiments never touch cold storage—[Testnet Farming Without Contaminating Your Main Wallet](/guides/testnet-farming-without-contaminating-your-main-wallet) and [How to Farm Testnets for Potential Airdrops Safely](/how-to/how-to-farm-testnets-for-potential-airdrops-safely). Document txs early with [How to Track Airdrop Eligibility with On-Chain Tools](/how-to/how-to-track-airdrop-eligibility-with-on-chain-tools) so you are not reconstructing history from memory at claim time.",
        ],
      },
      {
        heading: "Why TGE math disappoints leaderboard chasers",
        paragraphs: [
          "A high points rank is not a USD balance. At [[TGE]], teams choose total supply, community allocation percentage, unlock cliffs, and market-making float. A “top 1%” farmer can still receive tokens worth less than cumulative gas if float is thin, unlocks drip over years, or the market prices the fully diluted valuation far below Discord hopium. Circulating supply on day one is often a small slice; paper FDV headlines do not equal spendable liquidity.",
          "Secondary markets add insult: claim dumps, locked investor tranches, and emissions overhang compress price just as farmers unlock. Leaderboard screenshots freeze a relative ranking; markets clear in absolute dollars. Model three scenarios—bear, base, bull—using *circulating* tokens available to the community season you farmed, not the entire max supply meme.",
          "Opportunity cost matters. Capital parked for points could have earned staking yield or simply stayed in self-custody without smart-contract risk. If your break-even requires perfect vesting and a perpetual bull market, you are not investing—you are wishing. Cap gas and time like any speculative budget; walk away when the option premium (fees + hours) exceeds plausible payoff.",
        ],
      },
      {
        heading: "Risk callouts operators ignore at their peril",
        paragraphs: [
          "**Farming cost versus uncertain allocation** is the core risk. You spend real [[gas]] and sometimes bridging fees for a score that can be reweighted, delayed, or voided for policy reasons. Treat spend as a sunk educational cost unless the product itself is useful.",
          "**Phishing claim sites** explode around TGE announcements. Clones ask for your [[seed phrase]], blind signatures, or unlimited [[approval]]s. Bookmark official docs and socials *before* the announcement week. Never search “project name claim” and click the first ad.",
          "**Multi-account bans** destroy months of work. Terms usually forbid industrial Sybil farming; filters and KYC portals enforce that. One person, one coherent narrative beats a warehouse of wallets that share funding trails. If a guide promises “guaranteed allocation with 20 wallets,” it is selling risk, not alpha.",
        ],
      },
      {
        heading: "Practical operator checklist",
        paragraphs: [
          "1) Thesis first: use the product if no token existed. 2) Burn wallet only—never main [[seed phrase]] on points dashboards or testnets. 3) Log date, chain, action, txid, gas USD weekly. 4) Hard-cap cumulative fees; stop at the cap. 5) Prefer retention and diversity over last-minute volume spikes. 6) Pre-write a claim runbook with official URLs; reject unlimited approvals. 7) Model circulating unlocks, not FDV cosplay. 8) Skip multi-accounting and paid “farmer wallets.”",
          "Deepen each step with existing GetFreeBit material: eligibility mechanics in [Airdrop Eligibility](/guides/airdrop-eligibility-what-protocols-actually-measure), key isolation in [Testnet Farming Without Contaminating Your Main Wallet](/guides/testnet-farming-without-contaminating-your-main-wallet), adversarial context in [Sybil / exploits guide](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are), procedural farming in [Farm Testnets Safely](/how-to/how-to-farm-testnets-for-potential-airdrops-safely), and evidence gathering in [Track Eligibility On-Chain](/how-to/how-to-track-airdrop-eligibility-with-on-chain-tools).",
          "Bottom line: [[points]] are provisional scores, not paychecks. Farm only what you can explain, afford, and secure—and assume [[TGE]] day will be noisier, thinner, and less generous than the leaderboard made it feel.",
        ],
      },
    ],
  },
];
