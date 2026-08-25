import type { Guide } from "./types";

export const GUIDES_C: Guide[] = [
  {
    slug: "spot-vs-perps-funding-and-liquidation",
    title: "Spot vs Perps: Funding Rates and Liquidation Math",
    description:
      "How spot ownership differs from perpetual futures, what funding actually pays, and how liquidation works with concrete position examples.",
    publishedAt: "2026-06-10",
    readingMinutes: 6,
    sections: [
      {
        heading: "Spot is ownership; perps are a bet with a clock",
        paragraphs: [
          "[[spot]] trading means you buy or sell the asset itself—or a claim on it held by a [[CEX]]. If you buy 0.1 BTC on an exchange and withdraw it to [[self-custody]], you hold bitcoin. Price can fall, but nobody liquidates you for being “wrong.” You can wait years. That patience is the main educational advantage of spot for most GetFreeBit readers who are still building habits around faucets, [[DCA]], and withdrawals.",
          "A [[perp]] (perpetual futures contract) has no expiry. You post [[collateral]], pick leverage, and the exchange marks your position to a price index. If the market moves against you enough that your maintenance margin is breached, the venue liquidates the position. You can be right about the long-term thesis and still get wiped by a weekend wick. That is not a bug in your psychology—it is how leveraged products are designed.",
          "Risk: treat perps as a separate product from “holding crypto.” If your goal is stacking sats from [micro-earning without scams](/guides/offerwalls-and-micro-earning-without-scams) or moving profits into cold storage via a [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist), spot is usually the matching tool. Perps are for traders who size risk in dollars of max loss, not in “I believe in the asset.”",
        ],
      },
      {
        heading: "Funding rates: the hidden rent on open interest",
        paragraphs: [
          "Because perps never expire, venues need a mechanism to keep the contract near spot. That mechanism is the [[funding rate]]: periodic payments between longs and shorts. When funding is positive, longs pay shorts; when negative, shorts pay longs. Intervals are often every eight hours on major venues, though some products use one-hour funding. Always read the product page—quoting “APY from funding” without the interval is marketing noise.",
          "Concrete example: you are long 1 BTC-perp at $60,000 notional with 5× leverage, so you posted about $12,000 margin (ignoring fees). If the eight-hour funding rate is +0.01%, you pay roughly $6 that interval (0.0001 × $60,000). Over three intervals per day that is about $18/day, or roughly $6,570 annualized if the rate stayed constant—which it never does. Crowded long markets in bull legs often print elevated positive funding; crowded shorts in fear legs flip negative.",
          "Funding is not free yield for the other side without risk. Collecting funding as a short still exposes you to a squeeze upward. Collecting as a long in negative funding still exposes you to dumps. Compare this to [stablecoin yield](/guides/stablecoin-yield-what-youre-actually-paid-for): lending [[APY]] pays you for credit and smart-contract risk; funding pays you for taking the unpopular side of a leveraged market.",
        ],
      },
      {
        heading: "Liquidation: distance, fees, and the insurance fund",
        paragraphs: [
          "[[liquidation]] on perps is a forced close when your equity falls below maintenance margin. Rough intuition for isolated margin: liquidation price ≈ entry × (1 ± 1/leverage), adjusted for fees and maintenance. At 10× long, a ~10% drop toward your entry already threatens you before fees; at 2× you have much more room. Cross margin pools balances across positions—convenient until one bad trade drains the account.",
          "Worked numbers: long ETH-perp at $3,000 with 5× isolated, $600 margin on $3,000 notional. A move to roughly $2,400–$2,500 (exact formula depends on maintenance rate, usually a few percent) puts you near liquidation. Add taker fees, funding paid while underwater, and possible mark-price divergence from the last trade, and the “safe” distance shrinks. Exchanges publish mark price and index price—learn which one triggers liquidations on your venue.",
          "Risk: stop-losses are not magic. In fast markets, stops can slip; liquidations can cascade. If you would not be okay realizing the full margin loss in an hour, your leverage is too high. For onboarding context see [first CEX account setup](/guides/first-cex-account-kyc-2fa-withdrawals)—enable withdraw allowlists and 2FA before you ever touch perps.",
        ],
      },
      {
        heading: "When spot is enough—and when perps are a deliberate tool",
        paragraphs: [
          "Use spot when you are converting faucet or offerwall payouts, executing [practical bitcoin DCA](/guides/dca-bitcoin-practically), or building a long-term bag you intend to withdraw. Spot also maps cleanly to tax lots: you bought an asset; basis is clearer than a chain of leveraged PnL, funding, and partial closes (still keep records—see [crypto records for taxes](/guides/crypto-records-for-taxes-without-panic)).",
          "Use perps only with a written max-loss, a reason the trade is time-bounded, and funding monitored like a fee. Hedge examples: you hold spot ETH you will not sell for tax reasons, and short a small perp notional to reduce beta for a month. That is a defined risk overlay—not “free insurance.” Basis and funding can still bleed you.",
          "GetFreeBit’s bias is educational: most readers earn more lifetime value from avoiding a single liquidation than from catching one leveraged bounce. Master spot withdrawals, [[KYC]] hygiene, and [[self-custody]] first. Add perps later with size so small that being wrong is boring.",
        ],
      },
      {
        heading: "Operator checklist before you click Buy/Long",
        paragraphs: [
          "Confirm product type (spot pair vs perpetual), settlement asset, and whether you are in isolated or cross margin. Confirm leverage is what you typed—UI defaults are often aggressive. Confirm you understand the funding interval and the current rate sign.",
          "Size the position from max loss backward: “I can lose $100” at 5× means notional around a few hundred dollars, not your whole deposit. Set alerts on mark price and funding. If the venue offers demo/testnet mode, practice liquidation distance there before mainnet capital.",
          "After any profitable perp trade, withdraw a portion to spot or [[self-custody]] on a schedule. Leaving “house money” on a derivatives wallet is how temporary skill becomes permanent giveback. Pair this discipline with [DEX swap hygiene](/guides/dex-swaps-slippage-mev-and-approvals) if you later bridge PnL on-chain.",
        ],
      },
    ],
  },
  {
    slug: "layer-2-fees-blobs-and-when-to-bridge",
    title: "Layer 2 Fees, Blobs, and When to Bridge",
    description:
      "Why L2 fees fell after blobs, how to read a fee breakdown, and when bridging to Ethereum L1 or another L2 is worth the risk and delay.",
    publishedAt: "2026-06-18",
    readingMinutes: 5,
    sections: [
      {
        heading: "What you actually pay on an L2",
        paragraphs: [
          "A [[layer 2]] (or [[L2]]) inherits security assumptions from Ethereum while executing cheaper. Your wallet still shows a [[gas]] fee in ETH (or the chain’s gas token), but the fee has two big pieces: L2 execution gas and the cost of posting data to [[mainnet]]. After Ethereum’s Dencun upgrade, many rollups post compressed data as [[blob]]s instead of expensive calldata—this is the main reason simple swaps on Arbitrum, Base, or Optimism often cost cents instead of dollars.",
          "Fee UIs can still confuse. A “network fee” of $0.04 on a [[DEX]] swap may hide a separate bridge quote if you arrived from another chain. Always separate: (1) swap fee to LPs ([[AMM fee tier]]), (2) L2 gas, (3) bridge fee and time. Mixing them makes farming math look better than it is—pair this with [gas optimization for farming](/guides/gas-optimization-for-farming).",
          "Risk: cheap fees invite spam and phishing UIs. Low gas does not mean low risk. A malicious [[approval]] on Base can drain you as thoroughly as one on mainnet. Keep a burn [[browser wallet]] for experiments and read [RPC phishing and simulation](/guides/rpc-phishing-and-transaction-simulation) before farming new apps.",
        ],
      },
      {
        heading: "Blobs in plain language",
        paragraphs: [
          "Think of a [[blob]] as temporary bulk storage Ethereum sells to rollups. Rollups stuff many user transactions’ data into blobs, post them cheaply, and keep execution off L1. Users feel this as lower L2 fees when blob markets are not congested. When everyone posts large blobs during a mania, blob prices spike and L2 fees rise again—cheap is cyclical, not permanent.",
          "You do not buy blobs directly as a normal user. You feel them indirectly. If your [[optimistic rollup]] or [[ZK rollup]] dashboard mentions “L1 data fee,” that line is related to how the sequencer posts batches. Comparing two L2s on fee alone without comparing exit rules and bridge risk is incomplete.",
          "For airdrop farmers, fee history matters: activity during high-fee months may weight differently in [[points]] systems than spam during near-zero fee months. See [points programs and TGE expectations](/guides/points-programs-and-tge-expectations) and [Sybil resistance](/guides/sybil-resistance-what-farmers-miss).",
        ],
      },
      {
        heading: "Canonical bridges vs fast bridges",
        paragraphs: [
          "The [[canonical bridge]] is the rollup’s official path. On many optimistic designs, withdrawing to L1 takes on the order of seven days because of the fraud-proof window. That delay is a feature for security assumptions, not a bug in your wallet. ZK-style exits can be faster but still have their own proof and finality cadence—read the docs for the chain you use.",
          "Third-party “fast bridges” and intent solvers give minutes instead of days by taking inventory risk or using liquidity pools. You pay a spread and accept extra [[smart contract]] risk. For $50 of farming capital, a fast bridge can be rational. For a five-figure move, prefer canonical paths and the patience checklist in [bridging without losing funds](/guides/bridging-without-losing-funds).",
          "Concrete habit: bridge a [[test amount]] first, verify the asset’s [[token contract]] on the destination [[block explorer]], then send the rest. Tickers collide—“USDC” on the wrong chain or a fake clone is a classic loss path. Confirm [[chain ID]] in the wallet before signing.",
        ],
      },
      {
        heading: "When to stay on L2 vs when to go to L1",
        paragraphs: [
          "Stay on L2 for routine swaps, NFT mints you actually want, perpetuals on L2 venues, and most [[airdrop farming]] interactions. Batch chores: claim, swap, provide liquidity in one session so you do not pay setup gas repeatedly. Prefer native USDC/ETH routes over exotic wrappers when possible.",
          "Move to L1 when you need deep mainnet liquidity, a protocol that never deployed elsewhere, or long-term [[cold storage]] workflows that you standardize on Ethereum addresses. Also move value off a single L2 if that sequencer or bridge becomes your concentrated risk—diversify chains the way you diversify venues.",
          "Risk: bridging “because fees are low right now” without a destination plan creates stranded dust and extra approvals. Decide the end state first: farm → consolidate → withdraw to [hardware wallet](/guides/hardware-wallet-setup-and-passphrase) or [[CEX]] off-ramp. Fees are a line item, not a strategy.",
        ],
      },
      {
        heading: "A simple fee decision tree",
        paragraphs: [
          "If the action costs less than ~1% of the economic value and the contract is known-good, do it on the L2 where your capital already sits. If bridging costs more than the expected edge (points, yield, arb), skip it. If you need L1 finality for a large withdrawal, pay the canonical wait.",
          "Track weekly: average swap fee, average bridge cost, failed txs. Farmers who ignore failed-transaction gas bleed quietly. Use [reading Etherscan like an operator](/guides/reading-etherscan-like-an-operator) to verify batch posts and your own nonce health.",
          "GetFreeBit takeaway: blobs made L2 usable for ordinary sizes; they did not remove bridge risk, sequencer assumptions, or phishing. Cheap execution is an invitation to be careful more often—not less.",
        ],
      },
    ],
  },
  {
    slug: "spotting-honeypots-and-rug-pulls",
    title: "Spotting Honeypots and Rug Pulls",
    description:
      "Practical checks for fake tokens, unsellable honeypots, soft rugs, and liquidity traps—before you approve a spend.",
    publishedAt: "2026-06-26",
    readingMinutes: 4,
    sections: [
      {
        heading: "Honeypot vs rug: different failure modes",
        paragraphs: [
          "A [[honeypot]] is a [[token contract]] designed so buyers can purchase but cannot sell—or can sell only into tiny limits that never clear. Chart looks euphoric; wallets that “hold” are traps. A [[rug pull]] is broader: team removes liquidity, dumps allocations, upgrades a proxy to steal, or abandons the project after marketing. You can lose money to either without the other.",
          "Both thrive where tickers are not unique. Anyone can deploy “PEPE2” or “USDC.e fake.” Always verify the contract address from a primary source (official docs, verified aggregator listings you trust), not from a Telegram screenshot. Cross-check on a [[block explorer]] the way operators do in [reading Etherscan](/guides/reading-etherscan-like-an-operator).",
          "Risk: if someone DMs you a “guaranteed” launch or airdrop claim site, assume [[phishing]] until proven otherwise. Never paste a [[seed phrase]]. Simulate the tx—see [RPC phishing and transaction simulation](/guides/rpc-phishing-and-transaction-simulation).",
        ],
      },
      {
        heading: "Pre-trade checks that catch most honeypots",
        paragraphs: [
          "On the explorer: is the contract verified? Unverified bytecode is a hard no for speculative buys. Does the holder list show a few wallets owning most supply? Are trading taxes or max-tx limits encoded? Many honeypot scanners automate sell simulations—use more than one, and still treat them as hints, not insurance.",
          "Liquidity: where is the pool? Who owns the LP tokens? If LP is not locked or burned, the deployer can pull liquidity (classic rug). On Uniswap-style [[AMM]]s, inspect the pair contract and LP token holders. Tiny liquidity with huge market-cap screenshots is theater.",
          "Approvals: never grant unlimited [[allowance]] to an unknown spender. Buy with a fresh burn wallet funded with only what you can lose. After any experimental trade, [[revoke]] approvals. Pair this with [DEX swaps, slippage, MEV, and approvals](/guides/dex-swaps-slippage-mev-and-approvals).",
        ],
      },
      {
        heading: "Soft rugs and “almost legitimate” failures",
        paragraphs: [
          "Not every loss is a cartoon villain. Soft rugs include teams that slowly drain treasury, inflate unlocks, or change fees via admin keys. Proxy contracts with upgrade rights can become malicious later even if day-one code looked fine. Read whether ownership is renounced, timelocked, or held by a [[multisig]] with known participants—see [multisig basics](/guides/multisig-basics-for-shared-funds).",
          "Marketing red flags: guaranteed returns, fake celebrity endorsements, pressure to buy in under ten minutes, and “DEX only because CEX listings are coming tomorrow.” Compare claims against [evaluating faucets time vs reward](/guides/evaluating-crypto-faucets-time-vs-reward)—the same skepticism about too-good payouts applies to tokens.",
          "Concrete example: a token advertises 5% buy / 5% sell tax “for marketing.” Taxes alone are not a honeypot, but combined with a blacklist function, pause trading, or wallet-limiting code, they become one. If you cannot independently sell a dust amount back to the pool, stop adding size.",
        ],
      },
      {
        heading: "Process when you already bought something sketchy",
        paragraphs: [
          "Do not approve additional spenders “to claim rewards.” Do not follow “support admins” who ask you to seed a recovery wallet. Try a small sell via a reputable [[DEX]] UI; if it reverts with obscure errors, you may be stuck. Document the contract address and tx hashes for your records and for any platform report.",
          "Move unaffected funds off the burned wallet if the same seed holds real assets—actually, better practice: experimental wallets should never share a seed with life-changing funds. Use separate seeds or accounts. Review [testnet wallet hygiene](/guides/testnet-wallet-hygiene-for-airdrop-farming) for isolation habits that also apply on mainnet burners.",
          "Risk: revenge-trading into the next ticker to “make it back” is how honeypot victims become serial victims. Cap speculative buys as entertainment budget, not as income plans alongside [FreeBitcoin-style risk math](/guides/freebitcoin-style-faucets-risk-math).",
        ],
      },
      {
        heading: "A short Go / No-Go card",
        paragraphs: [
          "Go only if: verified contract, known liquidity venue, LP locked or credibly controlled, you simulated a sell, size is lose-able, and the narrative does not require secrecy. No-Go if: unverified code, anonymous team with mint authority, DM-driven urgency, or approvals requested beyond the swap router.",
          "GetFreeBit does not tip “gem calls.” We teach filters. The market will keep producing honeypots because attention is scarce and verification takes minutes. Those minutes are cheaper than learning on a drained account.",
          "When in doubt, stick to major assets, [native vs liquid staking](/guides/native-eth-staking-vs-liquid-staking) for ETH yield, and transparent [[CEX]]/[[DEX]] majors. Boredom is underrated alpha.",
        ],
      },
    ],
  },
  {
    slug: "crypto-records-for-taxes-without-panic",
    title: "Crypto Records for Taxes Without Panic",
    description:
      "A practical bookkeeping system for spot buys, swaps, faucets, airdrops, and perps so tax season is reconciliation—not archaeology.",
    publishedAt: "2026-07-05",
    readingMinutes: 4,
    sections: [
      {
        heading: "You need a story per lot, not a vibe",
        paragraphs: [
          "Tax rules vary by country, but the operational truth is universal: every disposal needs a cost basis story. Buying 0.01 BTC on a [[CEX]], receiving a [[faucet]] payout to [[FaucetPay]], swapping on a [[DEX]], or getting an [[airdrop]] all create events. Panic starts when February arrives and your history is twelve wallets, three chains, and Discord screenshots.",
          "Start a single ledger—spreadsheet or portfolio tool—with columns: date (UTC), asset, amount in, amount out, fees, venue, tx hash or trade id, notes. Export CSV from every [[CEX]] monthly. For on-chain, archive explorer links. This pairs cleanly with [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist) habits: every withdrawal is a labeled row.",
          "Risk: this guide is operational education, not tax advice. Your filing position depends on local law (income vs capital gains, faucet treatment, etc.). Use the records so a qualified preparer is not guessing.",
        ],
      },
      {
        heading: "Faucets, offerwalls, and micro-payouts",
        paragraphs: [
          "Micro-earnings create many tiny lots. If you claim to [[FaucetPay]] then convert to BTC and withdraw, capture: claim timestamps if available, conversion trades, and the withdrawal tx. Thresholds and routing are covered in [FaucetPay setup and payout routing](/guides/faucetpay-setup-and-payout-routing). Skipping conversion rows makes BTC look like it appeared from nowhere.",
          "Offerwall rewards can be “income-like” in some jurisdictions even before you sell. Keep the platform statements. If geo or scam risk made you skip a wall, good—see [offerwalls without scams](/guides/offerwalls-and-micro-earning-without-scams). Do not invent numbers; missing data is better marked “unknown basis” than fabricated.",
          "Example: 30 days of faucets yield $12 equivalent, converted to 20,000 sats, withdrawn for a $1.50 fee. Your ledger should show income/receipt events totaling $12 (or local currency), then a BTC acquisition at that day’s rate, then fee as cost or disposal per local rules.",
        ],
      },
      {
        heading: "Swaps, bridges, and airdrops",
        paragraphs: [
          "A [[DEX]] swap typically disposes token A and acquires token B. Record both sides and [[gas fees]]. Bridges may be non-taxable transfers in some places and taxable swaps in others—especially when you receive a wrapped asset. Tag bridge txs explicitly and keep the source/destination chain names. See [bridging without losing funds](/guides/bridging-without-losing-funds).",
          "[[airdrop]] tokens: note the date you gained control, fair-market value if required locally, and later sale. Farming costs ([[gas]]) should be tracked even if deductibility differs by country. Eligibility process lives in [airdrop eligibility checklist](/guides/airdrop-eligibility-checklist).",
          "[[points]] that are not tokens yet usually are not disposal events—until a [[TGE]] delivers tradable assets. Track points off-ledger with screenshots so you can explain a sudden wallet credit later ([points and TGE expectations](/guides/points-programs-and-tge-expectations)).",
        ],
      },
      {
        heading: "Perps, funding, and liquidations",
        paragraphs: [
          "Derivatives accounting is messy: realized PnL, [[funding rate]] payments, and [[liquidation]] fees. Export the derivatives ledger separately from spot. Do not merge a perp gain into “BTC sold” if you never held spot BTC. Review mechanics in [spot vs perps](/guides/spot-vs-perps-funding-and-liquidation).",
          "If you got liquidated, the closed PnL and remaining balance still need rows. Missing liquidation events is how people under-report losses or misstate gains. Keep the venue’s official statement PDF annually.",
          "Risk: transferring between your own wallets is usually not a taxable sale—but document it so it does not look like income. Use memo fields: “transfer self custody Ledger.”",
        ],
      },
      {
        heading: "A calm monthly ritual",
        paragraphs: [
          "Calendar one hour monthly: download exchange CSVs, append wallet tx exports, reconcile stablecoin balances, and note open [[approval]]s to revoke. Quarterly, freeze a backup of the spreadsheet in cloud + offline storage. After major events (big airdrop, first hardware withdrawal), record the same day.",
          "Tools help, but garbage in still produces garbage. Tag spam tokens received as airdrop dust so they do not pollute cost-basis matching. Your future self is the customer.",
          "GetFreeBit angle: good records reduce fear, which reduces impulsive trading. Clarity is part of security culture alongside [hardware wallet setup](/guides/hardware-wallet-setup-and-passphrase).",
        ],
      },
    ],
  },
  {
    slug: "multisig-basics-for-shared-funds",
    title: "Multisig Basics for Shared Funds",
    description:
      "How M-of-N wallets reduce single-key failure for teams, clubs, and families—with setup pitfalls, signer hygiene, and recovery drills.",
    publishedAt: "2026-07-14",
    readingMinutes: 4,
    sections: [
      {
        heading: "Why shared money should not live on one seed",
        paragraphs: [
          "A [[multisig]] requires M signatures out of N keys before a spend clears—for example 2-of-3. One compromised laptop cannot unilaterally drain the treasury. One lost key does not brick the funds if you still reach M. That is the point: remove single points of failure without pretending human coordination is free.",
          "Use cases on GetFreeBit’s map: creator collectives splitting offerwall surplus, a small desk sharing farming capital, or a family holding long-term BTC/ETH. For personal funds you alone control, a [[hardware wallet]] may be enough—see [hardware wallet setup and passphrase](/guides/hardware-wallet-setup-and-passphrase). Multisig shines when people and roles multiply.",
          "Risk: a badly designed multisig (all keys on the same cloud account, or 1-of-1 dressed up as process) is theater. Treat policy design as seriously as [[seed phrase]] storage.",
        ],
      },
      {
        heading: "M-of-N choices with real trade-offs",
        paragraphs: [
          "2-of-3 is the teaching default: any two can spend; one key can be lost. 3-of-5 fits larger teams but slows every payment. 2-of-2 is dangerous if one signer disappears—consider it only with strong recovery lawyering and backups. On Bitcoin, multisig is often native [[UTXO]] scripts or descriptor wallets; on Ethereum, popular patterns include Safe (formerly Gnosis Safe) contract accounts rather than raw EOAs.",
          "Decide where keys live before you deposit. Ideal: each signer uses a dedicated [[hardware wallet]], geographically separate, with documented ownership. Avoid “three MetaMask seeds in one password manager.” Browser hot keys are fine for tiny ops wallets, not for the main treasury.",
          "Concrete example: a three-person farming club keeps 0.5 ETH working capital in a hot 2-of-3 for weekly [[gas]], and long-term profits in a cold 2-of-3 that requires two Ledgers in different cities. They rebalance monthly using the [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist).",
        ],
      },
      {
        heading: "Operational pitfalls that drain treasuries",
        paragraphs: [
          "Signer phishing: attackers socially engineer one key, then pressure a second signer with urgency. Require a second channel (phone call with passphrase challenge) for transfers above a threshold. Simulate transactions—habits from [RPC phishing and simulation](/guides/rpc-phishing-and-transaction-simulation) apply to Safe UIs too.",
          "Recovery kits: store the policy (M, N, addresses, derivation paths, which device holds what) offline. If you lose the config file and one hardware device, you may still have keys but not know how to reconstruct the wallet. Test a recovery on [[testnet]] or with dust before you need it.",
          "Module sprawl on Ethereum Safes: each added module or allowance is attack surface. Prefer minimal modules, explicit spending limits, and regular [[revoke]] reviews for token [[approval]]s the Safe granted to [[DEX]] routers while farming.",
        ],
      },
      {
        heading: "Governance without slowing everything forever",
        paragraphs: [
          "Write a one-page policy: who can propose, what amounts need dual approval, how to onboard/offboard a signer, and what happens if a signer is unresponsive for 30 days. Rehearse a signer rotation once a year. Rotation is when people accidentally leave funds on the old address.",
          "For yield, do not grant a multisig infinite trust to a new [[LRT]] or farm contract because “the team voted on Telegram.” Run the same risk stack thinking as [restaking and LRT risk](/guides/restaking-and-lrt-risk-stack) and [lending liquidation risk](/guides/lending-yield-and-liquidation-risk).",
          "Risk: social consensus is not a signature. Until M on-chain approvals exist, assume the payment can still fail. Chat messages are not execution.",
        ],
      },
      {
        heading: "Checklist before first deposit",
        paragraphs: [
          "Confirm M and N, verify each signer’s address on-device, send a [[test amount]], execute a test spend that requires the real M threshold, and back up the recovery documentation in two secure places. Only then move size.",
          "Keep personal spending money out of the shared wallet. Mixing rent money with club funds creates pressure to bypass policy. Pair treasury discipline with clear personal [DCA](/guides/dca-bitcoin-practically) so individuals are not raiding the multisig for lifestyle volatility.",
          "GetFreeBit takeaway: multisig is shared responsibility technology. It rewards teams who like checklists and punishes groups who treat crypto like a group chat with a balance.",
        ],
      },
    ],
  },
  {
    slug: "dca-bitcoin-practically",
    title: "DCA Bitcoin Practically",
    description:
      "Build a bitcoin buy routine with real fee math, venue choice, withdrawal cadence, and rules that survive volatility without hype.",
    publishedAt: "2026-07-22",
    readingMinutes: 4,
    sections: [
      {
        heading: "DCA is a schedule, not a personality",
        paragraphs: [
          "[[DCA]] (dollar-cost averaging) means buying a fixed notional on a fixed calendar—for example $50 of BTC every Friday—regardless of headlines. It does not guarantee profit. It reduces the chance that one emotional market-timing decision defines your cost basis. For GetFreeBit readers converting micro-earnings upward, DCA is how faucet leftovers become a plan instead of a lottery ticket.",
          "Pick the notional from cash-flow reality: an amount that still lets you pay rent if BTC drops 50% the next day. If you fund DCA from unstable offerwall income, use a rolling average of last month’s cleared earnings, not a best-case week—see [offerwalls without scams](/guides/offerwalls-and-micro-earning-without-scams) and [faucet time vs reward](/guides/evaluating-crypto-faucets-time-vs-reward).",
          "Risk: leveraged “DCA” on [[perp]]s is not DCA. It is repeated liquidation fodder. Keep the habit on [[spot]] ([spot vs perps](/guides/spot-vs-perps-funding-and-liquidation)).",
        ],
      },
      {
        heading: "Fee math that changes the schedule",
        paragraphs: [
          "If your exchange charges a $1.49 flat wire-like crypto fee equivalent or high spread on tiny buys, purchasing $10 weekly may burn 10%+ in friction. Either raise the notional or lower frequency: $40 every four weeks can beat $10 weekly on fees. Compare maker/taker schedules and whether your venue supports recurring buys at the mid-market price.",
          "On-chain DCA via [[DEX]] on [[L2]] can be cheap post-[[blob]]s, but you still pay spreads and must secure [[approval]]s. Automations that request perpetual allowances deserve skepticism. Prefer limit-style or scheduled buys on a reputable [[CEX]] for beginners, then withdraw—see [first CEX account](/guides/first-cex-account-kyc-2fa-withdrawals).",
          "Concrete example: $50 weekly, 0.6% effective fee all-in → $0.30 friction. Same $50 as four $12.50 buys with 1.5% friction → worse. Measure your actual fills for a month; adjust. Record each lot for taxes ([crypto records](/guides/crypto-records-for-taxes-without-panic)).",
        ],
      },
      {
        heading: "Where the coins sleep",
        paragraphs: [
          "Leaving DCA piles on an exchange recreates custodial risk you already accepted for convenience. Choose a withdrawal cadence: every month, or every time balance exceeds a threshold (for example 0.005 BTC). Always send a [[test amount]] to your [[hardware wallet]] first. Follow [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist).",
          "If you accumulate via [[FaucetPay]] or similar [[micro-wallet]]s, route: faucets → threshold → BTC withdraw to exchange or non-custodial wallet per [FaucetPay payout routing](/guides/faucetpay-setup-and-payout-routing). Do not let five platforms hold five forgotten balances.",
          "Passphrase and backup drills matter more after six months of DCA than on day one—your future balance is larger. Revisit [hardware wallet setup](/guides/hardware-wallet-setup-and-passphrase).",
        ],
      },
      {
        heading: "Rules for ugly months",
        paragraphs: [
          "Write rules when calm: continue buys during −30% drawdowns unless income collapsed; never double size after a green candle week “to catch up”; never pause solely because Twitter is euphoric. Review rules quarterly, not during liquidations on someone else’s screen.",
          "If you need fiat, sell via a planned slice (for example 5% of stack) rather than deleting the DCA job. Panic sells plus stopped buy schedules are how people buy high and vanish low. For spending, learn [crypto debit card cashback math](/guides/crypto-debit-cards-cashback-math) so you do not invent ad-hoc conversions.",
          "Risk: “DCA then 20× perp the bag” cancels the strategy. Keep speculation in a tiny separate bucket—ideally a burn wallet—so the DCA stack stays boring.",
        ],
      },
      {
        heading: "A minimal practical setup",
        paragraphs: [
          "One exchange account with [[KYC]] complete, 2FA on, recurring buy enabled, calendar reminder to withdraw monthly, hardware wallet receive address bookmarked as QR offline, spreadsheet logging date/amount/fee/tx. That is enough.",
          "Optional: lightning or L2 rails when your notional and skills justify them; otherwise stay simple. Complexity is a fee paid in mistakes.",
          "GetFreeBit framing: DCA is how free-bit accumulation graduates into ownership. The education is patience plus withdrawal hygiene—not predicting next week’s candle.",
        ],
      },
    ],
  },
  {
    slug: "rpc-phishing-and-transaction-simulation",
    title: "RPC Phishing and Transaction Simulation",
    description:
      "How malicious RPCs and blind signing drain wallets—and how simulation, allowlists, and burn accounts stop most of it.",
    publishedAt: "2026-08-01",
    readingMinutes: 4,
    sections: [
      {
        heading: "Your wallet believes the RPC",
        paragraphs: [
          "A wallet does not magically see the blockchain; it asks an [[RPC]] endpoint for balances, bytecode, and gas estimates, and it broadcasts signed txs through that gateway. A malicious or “helpful” custom RPC can lie about state—showing fake balances, hiding a spender, or returning distorted simulation results—while still getting you to sign something real on [[mainnet]].",
          "Phishing kits pair fake dapp UIs with instructions to “add our faster RPC” or to sign an “airdrop claim.” The claim is often setApprovalForAll on NFTs or an unlimited ERC-20 [[approval]]. Once signed, bots drain when liquidity appears. This overlaps [spotting honeypots](/guides/spotting-honeypots-and-rug-pulls) but attacks the plumbing instead of the token chart.",
          "Risk: hardware wallets stop key extraction; they do not stop you from signing a malicious payload you did not understand. Blind signing is still blind.",
        ],
      },
      {
        heading: "Transaction simulation as a seatbelt",
        paragraphs: [
          "Modern wallets and add-ons offer [[simulation]]: a dry-run showing token diffs—“You lose 2 ETH and gain nothing,” or “You grant Spender 0xabc unlimited USDC.” Read every line. If simulation fails or is unavailable, that is information—slow down. Compare with an independent simulator when size is non-trivial.",
          "Simulation is only as honest as the node and the decoded ABI. Verified contracts help decoding. Obscure proxies may show cryptic internal calls. When unclear, abort. For farming, prefer known routers and the habits in [DEX swaps and approvals](/guides/dex-swaps-slippage-mev-and-approvals).",
          "Concrete habit: on any new site from an [airdrop checklist](/guides/airdrop-eligibility-checklist) campaign, use a burn [[browser wallet]] with only claim gas. If simulation shows unexpected [[approval]]s, disconnect and [[revoke]] from a known UI later.",
        ],
      },
      {
        heading: "RPC hygiene that actually helps",
        paragraphs: [
          "Stick to default reputable endpoints or your own node when you can. Treat random GitHub READMEs that demand custom RPCs as hostile. If you must use a community RPC for a niche [[L2]], fund a throwaway account first. Verify [[chain ID]] matches the official docs.",
          "Watch for signature types beyond simple transfers: typed data permits, bulk allowances, and “security updates.” Phishers love urgency around [[TGE]] claims and [[points]] dashboards—see [points programs and TGE expectations](/guides/points-programs-and-tge-expectations).",
          "Pair wallet security with endpoint skepticism the same way you pair [bridging checklists](/guides/bridging-without-losing-funds) with address verification. Two saved official URLs beat search ads for “claim portal.”",
        ],
      },
      {
        heading: "MEV, public mempools, and what simulation cannot fix",
        paragraphs: [
          "Even with a honest RPC, public [[mempool]] broadcast exposes swaps to [[MEV]] sandwiching. Simulation shows your intended path; it may not show the adversarial path that lands on-chain. Use reputable routers, sensible [[slippage]], and private transaction options when your venue supports them for large swaps.",
          "Stuck transactions and [[nonce]] issues invite “support” scammers who DM fixing scripts. Clear nonces yourself with a trusted wallet’s speed-up/cancel, or a known explorer toolkit. Never install a “nonce fixer” browser extension from a stranger.",
          "Risk: screen-sharing with “support” is a classic drain. End the call. Official support does not need your seed or remote desktop.",
        ],
      },
      {
        heading: "A pre-sign checklist",
        paragraphs: [
          "URL matches bookmark, RPC is default/trusted, simulation shows expected asset deltas only, spender addresses match known routers, amount is limited not unlimited, and the signing device displays the same summary. If any check fails, walk away.",
          "After experiments, review allowances and revoke. Keep life savings on [[cold storage]] that never connects to claim sites. Practice on [[testnet]] with [testnet wallet hygiene](/guides/testnet-wallet-hygiene-for-airdrop-farming).",
          "GetFreeBit bottom line: most drains are user-authorized. Simulation and RPC discipline turn authorization back into a conscious choice.",
        ],
      },
    ],
  },
  {
    slug: "points-programs-and-tge-expectations",
    title: "Points Programs and TGE Expectations",
    description:
      "How points campaigns work, what Sybil filters do, and how to budget gas and time without assuming a magical token multiple.",
    publishedAt: "2026-08-10",
    readingMinutes: 4,
    sections: [
      {
        heading: "Points are IOUs with no public strike price",
        paragraphs: [
          "A [[points program]] scores wallet activity—swaps, provides liquidity, bridges, invites—before a [[TGE]] (token generation event). Points are usually non-transferable and off-chain or non-tradable on-chain scoreboards. They are not tokens. Treating 10,000 points as “$10,000” is fan fiction until a conversion rule exists.",
          "Projects use points to bootstrap usage and to delay legal/token design. Farmers use them to speculate on future airdrops. Both sides know the game. Your edge is cost control and eligibility hygiene, not spreadsheet hopium. Anchor expectations with [airdrop eligibility checklist](/guides/airdrop-eligibility-checklist) and [Sybil resistance realities](/guides/sybil-resistance-what-farmers-miss).",
          "Risk: markets for “point derivatives” or OTC side deals can be scams or insider traps. If it requires depositing your farming wallet’s [[seed phrase]], it is already over.",
        ],
      },
      {
        heading: "What usually earns points—and what gets zeroed",
        paragraphs: [
          "Typical scoring: volume on a native [[DEX]], time-weighted liquidity, bridging via official routes, using the project’s perps or lending market, and holding partner [[LSD]]/[[LRT]] assets. Read the season rules; they change mid-campaign. Wash trading against yourself often fails filters or wastes [[gas]].",
          "[[Sybil]] patterns—hundreds of empty wallets mirroring the same path—get clustered. Funding from the same [[CEX]] withdrawal wave, identical timings, and shared [[RPC]] infrastructure are obvious. One well-funded authentic wallet often beats twenty dusty clones after filters. Review [testnet hygiene](/guides/testnet-wallet-hygiene-for-airdrop-farming) if you practice flows separately from mainnet capital.",
          "Concrete budgeting: if season rules imply you need $5,000 volume and historical rumors say prior seasons paid $200 median to similar users, your expected value is uncertain and possibly negative after fees. Cap spend at an amount you can emotionally write off—same discipline as [FreeBitcoin-style risk math](/guides/freebitcoin-style-faucets-risk-math).",
        ],
      },
      {
        heading: "Gas, bridges, and L2 seasons",
        paragraphs: [
          "Many seasons live on [[L2]] where [[blob]]-era fees are low, inviting overtrading. Still track cumulative gas, bridge spreads, and opportunity cost. Use [L2 fees and when to bridge](/guides/layer-2-fees-blobs-and-when-to-bridge) and [gas optimization for farming](/guides/gas-optimization-for-farming) so you are not farming points at a guaranteed loss.",
          "Bridge only when the season weights it. Random bridging to look “multi-chain native” can add risk without points. Prefer [[canonical bridge]] routes when large value moves; see [bridging without losing funds](/guides/bridging-without-losing-funds).",
          "Risk: fake season dashboards clone real domains. Bookmark official links. Simulate claims at TGE with [RPC phishing defenses](/guides/rpc-phishing-and-transaction-simulation).",
        ],
      },
      {
        heading: "TGE day is when phishing peaks",
        paragraphs: [
          "When tokens generate, claim portals, checker sites, and “support” DMs explode. Verify contract addresses from primary announcements, not from reply guys. Claim from a burn wallet if the UI looks novel; transfer value out after. Watch for honeypot “reward tokens” tied to the brand name ([spotting honeypots](/guides/spotting-honeypots-and-rug-pulls)).",
          "Liquidity at TGE is often thin; selling into a 15% [[slippage]] hole can erase the airdrop. Limit orders on a reputable venue, or staged exits, beat market-dumping the entire bag in one block. Remember [[MEV]] on public swaps.",
          "Tax and records: log FMV at claim if required locally ([crypto records without panic](/guides/crypto-records-for-taxes-without-panic)). Points themselves rarely need a form until tokens hit the wallet.",
        ],
      },
      {
        heading: "A sane farmer’s policy",
        paragraphs: [
          "Enter only seasons where you understand the product enough to use it without scripts. Cap total farming budget per quarter. Prefer authentic usage you might continue post-TGE. Do not borrow stablecoins to farm points—[[liquidation]] risk stacked on airdrop risk is how accounts die ([lending yield and liquidation](/guides/lending-yield-and-liquidation-risk)).",
          "After TGE, decide with a rule: sell a fixed percent to reclaim costs, keep a percent only if you like the protocol’s risk, and move proceeds toward [[self-custody]] or your [BTC DCA](/guides/dca-bitcoin-practically) plan.",
          "GetFreeBit stance: points are optional speculative labor. They are not a salary. Educate first, size small, assume Sybil filters are smarter than your copy-paste farm, and never let a scoreboard talk you into unsafe approvals.",
        ],
      },
    ],
  },
];
