import type { Guide } from "./types";

/**
 * GetFreeBit Part A guides — faucets, micro-earnings, airdrop farming, staking & lending.
 * Each guide targets 800–1200 words of original long-form educational text.
 */
export const GUIDES: Guide[] = [
  {
    slug: "faucetpay-setup-and-payout-routing",
    title: "FaucetPay Setup and Payout Routing",
    description:
      "Create a FaucetPay micro-wallet, understand coin thresholds and fees, and route faucet payouts into self-custody without leaking value to unnecessary hops.",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    sections: [
      {
        heading: "Why a micro-wallet sits between faucets and real custody",
        paragraphs: [
          "Most [[faucet]] sites pay in fractions of a cent per claim. Sending every drip straight to a [[CEX]] deposit address or a cold [[hardware wallet]] is usually a losing move: withdrawal minimums, network [[gas fees]], and deposit tags turn dust into stranded balances. A [[micro-wallet]] such as [[FaucetPay]] exists to aggregate those drips across dozens of coins until a single withdrawal clears the platform’s threshold and still leaves you with something worth sweeping.",
          "Think of [[FaucetPay]] as a clearing account, not a savings account. Balances sit with a third party. That is useful for automation and multi-coin claims, but it is not [[self-custody]]. Your operating rule should be: accumulate on [[FaucetPay]] until a coin hits a sensible exit size, then move to an address you control—or to a [[CEX]] only when you need fiat off-ramps or liquidity that on-chain routes cannot match.",
          "Before you create an account, decide which coins you will actually claim. Bitcoin, Litecoin, Dogecoin, Tron, and Ethereum-family tokens dominate faucet catalogs. Listing every ticker on your dashboard without a withdrawal plan creates mental noise and increases the chance you leave dust forever. Prefer two or three coins with reliable faucet supply and clear thresholds over a long tail you never exit.",
        ],
      },
      {
        heading: "Account setup, security hygiene, and faucet wiring",
        paragraphs: [
          "Register with a unique password and enable every security option the platform offers (email confirmation, 2FA if available). Do not reuse passwords from exchanges. Treat the login like any custodial crypto account: if someone resets your email, they can drain the balance. Store recovery codes offline.",
          "Inside the dashboard you will see deposit addresses per coin. Those are the addresses you paste into faucet claim forms. Never paste a [[FaucetPay]] address into a form that asks for a [[seed phrase]], private key, or wallet connect signature. Legitimate faucets only need a public receive address. If a site asks you to “verify ownership” by signing a message that transfers tokens or sets an unlimited [[approval]], close the tab—that is [[phishing]], not a faucet.",
          "Wire faucets carefully. Start with one reputable claim site, confirm a few successful credits, then expand. Keep a private note of which faucet pays which coin and typical claim intervals (every 5, 20, or 60 minutes). That note becomes your time budget when you later compare faucets in [Evaluating Crypto Faucets: Time vs Reward](/guides/evaluating-crypto-faucets-time-vs-reward). Automators and browser extensions can speed claims, but they also raise account-ban and malware risk—prefer official timers and manual claims until you understand the economics.",
          "Risk: Never fund a [[FaucetPay]] account from a long-term cold wallet “just to test.” Deposit only what you are prepared to lose if the platform has an outage, and never import a [[seed phrase]] into any faucet-related software.",
        ],
      },
      {
        heading: "Thresholds, fees, and realistic payout math",
        paragraphs: [
          "Each coin on [[FaucetPay]] has a minimum withdrawal and a fee schedule that changes over time. As a planning example (always re-check the live dashboard before you rely on numbers): Bitcoin withdrawals often sit in the low tens of thousands of [[satoshi]] with a fee of a few thousand satoshi; Litecoin and Dogecoin thresholds are usually easier to hit in fiat terms; Tron withdrawals can clear quickly because TRX fees are low on-chain. Ethereum withdrawals may look attractive in USD until you realize the on-chain transfer fee can erase a week of faucet income if [[gwei]] is elevated.",
          "Work the math backward. Suppose a BTC faucet pays 20 satoshi every 20 minutes when you solve a captcha. That is 60 satoshi per hour of attentive work, or about 1,440 satoshi in an eight-hour “work day” if you never miss a claim—optimistic. At 100,000 satoshi minimum withdrawal and a 5,000 satoshi fee, you need roughly seventy such days of perfect claiming before one net withdrawal of 95,000 satoshi. If your time is worth more than a few dollars an hour, the faucet is entertainment or learning—not income. That framing keeps GetFreeBit readers honest.",
          "Route by fee, not by hype. If LTC clears the threshold faster than BTC for the same effort, withdraw LTC, convert on a liquid venue if needed, then move value to [[self-custody]]. Avoid cascading hops (faucet → [[FaucetPay]] → random DEX bridge → obscure chain → [[CEX]]) unless each hop has a documented fee and a reason. Extra hops are where people lose coins to wrong [[chain ID]], missing [[memo]] tags, or fake token contracts.",
        ],
      },
      {
        heading: "Exit paths: CEX, self-custody, and what to log",
        paragraphs: [
          "When a balance clears the minimum, pick an exit. Path A: withdraw to a [[CEX]] deposit address for the matching network, then sell or hold. Always send a [[test amount]] first, especially for coins that require a destination [[memo]] or tag. Path B: withdraw to a [[hot wallet]] you control, then sweep larger stacks to a [[hardware wallet]]. Path B preserves [[self-custody]] but means you pay network fees twice if you later move to an exchange.",
          "Document every withdrawal: date, coin, amount, destination address, txid from the [[block explorer]], and purpose (sell, hold, DCA). Tiny faucet income still matters for tax records in many jurisdictions—see the companion approach in [Crypto Records for Taxes Without Panic](/guides/crypto-records-for-taxes-without-panic). Screenshots of the [[FaucetPay]] history page help when explorers are slow to index micro amounts.",
          "If you also run [[offerwall]] tasks, keep those earnings in the same routing plan so you are not managing five custodial silos. Pair this guide with [Offerwalls and Micro-Earning Without Scams](/guides/offerwalls-and-micro-earning-without-scams) for task hygiene, and use [Self-Custody Withdrawal Checklist](/guides/self-custody-withdrawal-checklist) whenever you leave any platform for an address you control.",
          "Bottom line: [[FaucetPay]] is a funnel. Fill it with verified faucet addresses, watch thresholds and fees like an operator, and empty it on a schedule into custody you understand. The edge is discipline and routing—not claiming faster than everyone else.",
        ],
      },
    ],
  },
  {
    slug: "evaluating-crypto-faucets-time-vs-reward",
    title: "Evaluating Crypto Faucets: Time vs Reward",
    description:
      "A practical framework for measuring faucet payouts against captcha time, withdrawal fees, and opportunity cost—so micro-earnings stay intentional.",
    publishedAt: "2026-02-01",
    readingMinutes: 5,
    sections: [
      {
        heading: "Define the unit of work before you trust a payout number",
        paragraphs: [
          "Faucet landing pages advertise “up to X satoshi every Y minutes.” That headline is almost never your realized rate. Captchas fail, timers reset after errors, bonuses require referrals, and some sites throttle IPs. Before you bookmark a [[faucet]], define a unit of work: one successful claim cycle from page load to credited balance. Time that cycle with a stopwatch for ten trials. Average seconds per success is your denominator; average credited amount is your numerator.",
          "Convert both into a common unit. If a claim credits 15 [[satoshi]] and takes 90 seconds of attention (including captcha retries), you earn 600 satoshi per attentive hour before any withdrawal fee. At a notional BTC price of $60,000, 600 satoshi is $0.36 per hour—fine for background learning, terrible as a job. Publishing that number for yourself removes the “maybe it adds up” fog that keeps people clicking for months.",
          "Separate passive-eligible work from active work. Some faucets let a tab run with periodic captchas; others demand full attention. If you must watch the screen, price your time at a personal minimum wage. If claims run beside another task, price only the interrupt cost. Different prices change which faucets survive your shortlist.",
        ],
      },
      {
        heading: "Score reliability, not just headline APY-style claims",
        paragraphs: [
          "Treat faucet “multipliers” and “VIP APY” language with skepticism. A [[faucet]] is not a DeFi pool; there is no on-chain [[TVL]] you can verify. Reliability signals include: consistent credits over a week, clear ownership or long domain history, payouts that actually arrive in [[FaucetPay]] or your wallet, and an absence of forced downloads. Red flags include guaranteed returns, requests for [[seed phrase]] backup “verification,” and tokens you can buy but not sell—classic [[honeypot]] patterns dressed as bonus coins.",
          "Build a simple scorecard: (1) satoshi or token per successful minute, (2) withdrawal fee as a percent of minimum cash-out, (3) days to threshold at your realistic claim rate, (4) custody risk (site wallet vs direct to [[micro-wallet]]), (5) abuse surface (malware, [[phishing]] clones). Drop any site that fails (4) or (5) regardless of payout.",
          "Compare against offerwalls and staking only after normalizing for risk. An [[offerwall]] that pays $2 for a verified bank signup may beat a month of faucet clicking—but it has different privacy and chargeback risk. Native [[staking]] on ETH is a different pillar entirely; do not mix “free crypto” marketing with validator economics. Keep faucet evaluation inside the micro-earnings pillar, then decide whether leftover capital belongs in [Native ETH Staking vs Liquid Staking](/guides/native-eth-staking-vs-liquid-staking).",
        ],
      },
      {
        heading: "Withdrawal friction often dominates claim math",
        paragraphs: [
          "A faucet that pays well but withdraws only at 0.001 BTC with a high fee can be worse than a smaller faucet with a low Litecoin threshold. Always include the exit leg. If you route through [[FaucetPay]], use the live minimums and fees from [FaucetPay Setup and Payout Routing](/guides/faucetpay-setup-and-payout-routing). If the faucet pays on-chain directly, estimate [[gas fees]] at a realistic [[gwei]] level for that network—not the best-case screenshot from a quiet Sunday.",
          "Example: a site pays 500 DOGE per day of diligent claims. Withdrawal minimum is 50 DOGE with a 2 DOGE fee. You clear a withdrawal every few hours and keep most of the value. Another site pays “higher” BTC but needs three months to hit minimum while BTC network fees spike. The DOGE site wins on time-to-cash even if the marketing page looks less impressive.",
          "Risk: “Instant withdrawal” banners on unknown domains are a common lure. Prefer delayed but documented payouts you can match on a [[block explorer]] over instant credits inside a closed balance you cannot export.",
        ],
      },
      {
        heading: "Build a personal rotation and kill list",
        paragraphs: [
          "Maintain a rotation of three to five faucets that cleared your scorecard. Cap daily time—for example, two 20-minute sessions—so micro-earning cannot expand to fill the evening. Re-measure one faucet per week; payouts decay as sites adjust economics. When realized hourly rate falls below your floor, add the domain to a kill list and stop visiting. Kill lists prevent nostalgia clicking.",
          "Track referrals honestly. Referral commissions can dominate personal claims, but they also create spam incentives and ToS risk. If you publish referral links, disclose them and never promise income. GetFreeBit’s standard applies: educate first, monetize with disclosed partner links only where they sit naturally in setup steps.",
          "For freebitcoin-style roll games and variable reward curves, use the specialized risk framing in [FreeBitcoin-Style Faucets: Risk Math](/guides/freebitcoin-style-faucets-risk-math). For task-based earning that competes for the same hour, read [Offerwalls and Micro-Earning Without Scams](/guides/offerwalls-and-micro-earning-without-scams). Time is the scarce asset; satoshi are just the unit you are buying with it.",
        ],
      },
    ],
  },
  {
    slug: "offerwalls-and-micro-earning-without-scams",
    title: "Offerwalls and Micro-Earning Without Scams",
    description:
      "How to use survey and offerwall platforms for crypto micro-earnings without falling for fake tasks, malware installs, or unpaid completions.",
    publishedAt: "2026-02-18",
    readingMinutes: 4,
    sections: [
      {
        heading: "What an offerwall actually is",
        paragraphs: [
          "An [[offerwall]] is a marketplace: advertisers pay for installs, leads, surveys, and purchases; the wall takes a cut; you receive points that convert to crypto or gift cards. The crypto angle is usually a withdrawal to a [[micro-wallet]] like [[FaucetPay]], a partner balance, or sometimes a [[CEX]] voucher. Understanding who pays whom clarifies why so many offers “pending” forever—advertisers reverse chargebacks and attribute fraud aggressively.",
          "Offerwalls sit in the same pillar as faucets but with lumpier payoffs. A single credit-card signup might pay several dollars; a survey might pay $0.20 after fifteen minutes. Your job is to filter for completable offers in your country, device, and credit profile—not to chase every tile on the wall.",
          "Start with established walls embedded in known earning sites rather than random Telegram bots posting “task links.” Bots are a primary [[phishing]] channel: they collect emails, push APK sideloads, or send victims to fake KYC pages. If an offer requires installing software outside official app stores, skip it unless you are using a disposable device you are willing to wipe.",
        ],
      },
      {
        heading: "Qualification, chargebacks, and unpaid completions",
        paragraphs: [
          "Read the fine print on each offer: new users only, specific OS version, complete within 24 hours, reach level 10 in a game, keep a subscription past the trial. Screenshot the requirements before you start. When credit fails, support tickets without evidence go nowhere. Note the offer ID, time started, account email used, and any confirmation emails from the advertiser.",
          "Survey walls route you through third-party panels that disqualify aggressively. Disqualification after demographic questions is normal; it is not always a scam. What is abusive is walls that repeatedly push the same disqualifying surveys to burn your time. Track complete-to-paid ratio for a week. If you spend two hours for $1 of credit, the wall fails the same time-vs-reward test used for faucets in [Evaluating Crypto Faucets: Time vs Reward](/guides/evaluating-crypto-faucets-time-vs-reward).",
          "Risk: Never use stolen cards, fake identity documents, or VPN jumps that violate offer geo rules to “force” qualification. That is fraud, gets accounts banned, and can create legal exposure. Micro-earning only works inside the advertiser’s rules—even when those rules feel unfair.",
        ],
      },
      {
        heading: "Device hygiene and wallet routing",
        paragraphs: [
          "Keep earning activity off your primary banking phone if possible. Use a separate browser profile for offerwalls so tracking pixels and sketchy landing pages do not sit beside your [[hardware wallet]] extension. Disable password autofill on that profile. Do not paste [[seed phrase]] material anywhere near this workflow.",
          "When the wall pays crypto, withdraw on a schedule to [[FaucetPay]] or a [[self-custody]] address using the same discipline as faucet routing—see [FaucetPay Setup and Payout Routing](/guides/faucetpay-setup-and-payout-routing). Convert unstable altcoin rewards to BTC, ETH, or a major [[stablecoin]] quickly if the wall’s ticker is illiquid. Verify the [[token contract]] on a [[block explorer]] before you trade anything that appears as a random ERC-20 in a [[browser wallet]].",
          "If an offer requires connecting a wallet to a dapp, treat it like [[airdrop farming]]: use a burn [[hot wallet]], read the [[simulation]], and never approve unlimited [[allowance]] to unknown contracts. Many “play to earn” offer tiles are simply lead-gen skins over aggressive on-chain approvals.",
        ],
      },
      {
        heading: "A sane weekly system",
        paragraphs: [
          "Pick one primary wall and one backup. Cap weekly hours. Prefer offers with clear, short completion criteria over open-ended game grinds. Log credited amounts and pending amounts separately so you do not mentally spend pending balance. When pending ages past the stated review window, file one ticket with evidence, then move on—do not refresh the page for days.",
          "Combine offerwalls with faucet sessions only if the combined hourly rate still clears your floor. Otherwise choose one lane. Readers who also chase airdrops should keep offerwall emails and wallets separate from farming identities to avoid messy [[Sybil]] heuristics later—more on that in [Sybil Resistance: What Farmers Miss](/guides/sybil-resistance-what-farmers-miss).",
          "Micro-earning without scams is mostly subtraction: remove malware offers, remove fake KYC, remove unpaid time sinks, remove custodial balances you never withdraw. What remains is modest, documented, and optional—exactly how free-crypto side income should look.",
        ],
      },
    ],
  },
  {
    slug: "freebitcoin-style-faucets-risk-math",
    title: "FreeBitcoin-Style Faucets: Risk Math",
    description:
      "How to model multiply-your-BTC games, faucet bonuses, and interest-like balances without confusing gambling variance for yield.",
    publishedAt: "2026-03-05",
    readingMinutes: 4,
    sections: [
      {
        heading: "Separate the faucet drip from the casino layer",
        paragraphs: [
          "Sites in the FreeBitco.in style usually combine three products: a timed [[faucet]] claim, a “multiply” game with house edge, and sometimes a custodial balance that advertises interest-like rewards. Educationally, you must unbundle them. The faucet is a small expected-value drip paid for attention and ads. The multiply game is gambling. The interest-like balance is unsecured credit risk to the platform—not [[staking]] and not on-chain [[APY]].",
          "Start with the faucet alone. Measure satoshi per hour as in [Evaluating Crypto Faucets: Time vs Reward](/guides/evaluating-crypto-faucets-time-vs-reward). Ignore multiply banners while you establish a baseline. If the drip alone is below your time floor, adding a negative-EV game will not fix it. Gambling does not “unlock” faucet value; it usually destroys it.",
          "When platforms show “reward points,” “VIP,” or “bonus BTC,” read the withdrawal constraints. Bonuses that cannot be withdrawn until you wager 20× or more are casino mechanics. Model them as marketing liability, not portfolio return.",
        ],
      },
      {
        heading: "House edge, variance, and the illusion of streaks",
        paragraphs: [
          "A typical multiply-BTC game lets you pick win chance—for example 49% chance to win ~2× after the fee, or 10% chance to win ~9×. The expected value is negative by design: the site’s edge might be 1–5% per bet depending on settings. Over thousands of bets, the edge dominates; over ten bets, variance can make you feel like a genius or a victim. Neither feeling is information.",
          "Work a concrete example. You bet 1,000 [[satoshi]] at 49% win chance with a payout of 1,960 satoshi on win (implying roughly 4% edge against you including fees). Expected value ≈ 0.49 × 1960 + 0.51 × 0 = 960.4 satoshi returned per 1,000 wagered—an average loss of ~40 satoshi per bet. Winning three times in a row does not change the next bet’s EV. “Martingale” strategies that double after losses fail when a streak hits your balance or the site max bet.",
          "Risk: Depositing exchange withdrawals into multiply games to “boost faucet income” is how small earners turn a hobby into a loss. If you choose to play, hard-cap a session bankroll you can afford to lose in full, and never replenish it from long-term holdings or [[hardware wallet]] cold storage.",
        ],
      },
      {
        heading: "Custodial “interest” is credit risk, not DeFi yield",
        paragraphs: [
          "Some faucet sites display daily interest on deposited BTC. That rate is not comparable to [[APY]] on Aave or to Ethereum [[native staking]]. There is no transparent [[collateral]], no public [[auditor]]-style proof you can rely on by default, and withdrawal gates can appear during stress. Historically, high advertised rates on custodial earning sites have coincided with insolvency risk. Treat any balance left on the site as unsecured exposure to that company.",
          "If your goal is yield with clearer risk labels, move value off the faucet casino and into frameworks covered by [Lending Yield and Liquidation Risk](/guides/lending-yield-and-liquidation-risk) or [Native ETH Staking vs Liquid Staking](/guides/native-eth-staking-vs-liquid-staking). Those paths have different failure modes (liquidation, [[slash]], smart-contract bugs), but they are analyzable. Opaque site interest is mostly trust.",
          "Routing still matters. When you do withdraw faucet winnings, prefer a known path through [[FaucetPay]] or direct on-chain withdrawal you can verify on a [[block explorer]], then into [[self-custody]]. Revisit [FaucetPay Setup and Payout Routing](/guides/faucetpay-setup-and-payout-routing) for thresholds so you are not stuck below minimums after a losing multiply session.",
        ],
      },
      {
        heading: "A decision rule you can stick to",
        paragraphs: [
          "Use freebitcoin-style sites only if three conditions hold: (1) faucet EV after time cost is acceptable as entertainment, (2) multiply bankroll is capped and prepaid from fun money, (3) no long-term storage of meaningful balances on the site. Violate any condition and close the tab.",
          "Write the rule down. Session limits beat willpower. Disable auto-bet features that remove the friction of clicking. Auto-bet is how negative EV compounds while you watch a movie.",
          "Finally, do not confuse community screenshots of big wins with strategy. Selection bias guarantees you see winners. The house edge does not care about Discord anecdotes. Keep micro-earning educational, measured, and optional—and keep casino variance in its own mental bucket so it never contaminates how you evaluate real [[staking]] or lending yield.",
        ],
      },
    ],
  },
  {
    slug: "testnet-wallet-hygiene-for-airdrop-farming",
    title: "Testnet Wallet Hygiene for Airdrop Farming",
    description:
      "Isolate testnet keys, fund throwaway wallets safely, and avoid contaminating mainnet custody while practicing airdrop and points workflows.",
    publishedAt: "2026-03-22",
    readingMinutes: 4,
    sections: [
      {
        heading: "Testnet tokens are worthless—your mainnet habits are not",
        paragraphs: [
          "[[testnet]] networks exist so developers and users can exercise contracts without risking real funds. Tokens from faucets on Sepolia, Base Sepolia, or other test chains have no reliable market value. The danger in [[airdrop farming]] practice is behavioral: people reuse the same [[browser wallet]] profile, import a funded [[mainnet]] [[seed phrase]] into a sketchy test dapp, or approve malicious contracts that later appear in the same extension on mainnet.",
          "Hygiene rule one: create a brand-new seed exclusively for testnet and early farming experiments. Write it down if you must, but assume it will be burned. Never type a production [[seed phrase]] into a testnet workflow. Hygiene rule two: use a separate browser profile or a dedicated [[hot wallet]] install so RPC endpoints, bookmarks, and extensions do not mix with your cold storage tools.",
          "When official [[faucet]] pages for test ETH require social login or anti-Sybil checks, prefer documented public faucets over Discord DMs offering “instant test ETH.” DM faucets are a top [[phishing]] pattern: they send you to sites that request wallet signatures draining mainnet assets via cleverly worded messages.",
        ],
      },
      {
        heading: "RPC, chain ID, and simulation discipline",
        paragraphs: [
          "Add test networks carefully. Verify [[chain ID]] against official docs (for example, Sepolia’s chain ID is 11155111). A wrong network entry that points at a malicious [[RPC]] can lie about balances and craft misleading [[simulation]] results. If your wallet supports transaction simulation, read every line before signing—even on testnet—so the habit transfers to mainnet.",
          "Disable eth_sign / dangerous legacy signing methods where wallets allow it. Prefer typed data you can parse. On testnet you will click faster; that speed is exactly when muscle memory gets sloppy. Practice slow signing now.",
          "Risk: Some “testnet bridges” and mirror UIs are phishing clones of real [[layer 2]] bridges. Bookmark official URLs. If a site asks for an [[approval]] of mainnet USDC “to get test tokens,” stop—that is not how testnets work.",
        ],
      },
      {
        heading: "Linking activity to eligibility without merging identities",
        paragraphs: [
          "Farmers often practice bridging, swapping, and providing liquidity on test deployments that resemble mainnet apps. That practice is useful for learning [[gas]] patterns and UI flows, but eligibility for real [[airdrop]] campaigns usually cares about mainnet or specific [[L2]] activity. Do not assume testnet clicks qualify you for a token. Read each project’s docs.",
          "When you move to mainnet farming, keep a clean mental map: burn wallets for experimental contracts, mid-tier wallets for [[points program]] activity, and vault wallets for savings never connected to farm dapps. Cross-linking all of them through the same ENS profile, same NFT PFP, and same Twitter handle can undermine Sybil defenses you thought you had—or conversely cluster you with farm wallets you wanted separated. Study [Sybil Resistance: What Farmers Miss](/guides/sybil-resistance-what-farmers-miss) before you optimize volume.",
          "Fund farming wallets from privacy-aware paths only to the extent you understand exchange rules and tax records. A simple path—[[CEX]] withdrawal of a [[test amount]] then full amount to the farm wallet—beats convoluted mixer folklore that creates compliance problems. Pair with [Airdrop Eligibility Checklist](/guides/airdrop-eligibility-checklist) so practice activity maps to real criteria.",
        ],
      },
      {
        heading: "Cleanup and graduation to mainnet",
        paragraphs: [
          "When a testnet season ends, revoke lingering [[allowance]]s on that chain if tools support it, discard the profile if it became cluttered with unknown networks, and archive notes about which UIs were trustworthy. Graduation means repeating the same checklist on mainnet with real [[gas fees]]: official URLs only, simulation on, burn wallet first, size positions knowing fees on Ethereum may be 10–100× testnet costs.",
          "Budget mainnet experiments explicitly. A week of learning swaps on an [[L2]] with [[blob]]-era fees might cost a few dollars; the same curiosity on Ethereum mainnet during 40 [[gwei]] congestion can cost more than the lesson is worth. Use [Gas Optimization for Farming](/guides/gas-optimization-for-farming) before you spam transactions “for points.”",
          "Testnet hygiene is not about being paranoid—it is about keeping worthless tokens from teaching expensive mainnet mistakes. Isolate keys, verify RPCs, and promote only the wallets that earned trust through careful signing.",
        ],
      },
    ],
  },
  {
    slug: "airdrop-eligibility-checklist",
    title: "Airdrop Eligibility Checklist",
    description:
      "A step-by-step checklist for documenting on-chain activity, avoiding disqualifiers, and estimating whether farming costs can beat uncertain airdrop upside.",
    publishedAt: "2026-04-10",
    readingMinutes: 4,
    sections: [
      {
        heading: "Eligibility is a rubric, not a vibe",
        paragraphs: [
          "Serious [[airdrop]] programs publish or leak criteria after the fact: minimum transactions, distinct months of activity, [[bridge]] usage, liquidity provided, governance votes, NFT mints, or [[points]] thresholds. Amateurs farm by spraying random swaps. Operators farm by maintaining a checklist aligned to the rubric they expect—and by accepting that the rubric can change.",
          "Before you spend [[gas]], write down the hypothesis: which behaviors might matter, which chain, what minimum size looks non-wash, and what your maximum budget is if the [[TGE]] never favors you. Cap the budget as a prepaid tuition fee. If you cannot afford the tuition to be zeroed out, you are not farming—you are gambling with rent money.",
          "Use a spreadsheet with columns: date, wallet, chain, action, tx hash, fee paid in USD, notes. This becomes your eligibility evidence and your tax input. It also stops double-counting psychological “volume” that never hit the chain.",
        ],
      },
      {
        heading: "The positive checklist",
        paragraphs: [
          "1) Wallet hygiene: farming wallet funded cleanly; not your vault; [[seed phrase]] backed up offline; no browser malware. 2) Official surfaces only: verify URLs, [[token contract]]s, and [[canonical bridge]] frontends. 3) Core actions: swap on the native [[DEX]], provide a small [[liquidity pool]] position if relevant, bridge via the official route, use the product’s hallmark feature (perps, stable swap, domain, etc.). 4) Time distribution: activity across multiple weeks beats one frantic evening of 40 transfers that look scripted.",
          "5) Size sanity: dust swaps of $0.30 may be filtered; oversized wash pairs from the same two wallets are also filtered. Aim for boring, human-looking amounts. 6) Identity overlays: if the project rewards Discord or GitHub, use accounts you control long-term—but do not bind your vault doxxing trail to every experimental wallet. 7) Exit plan: know how you will claim, whether claims need a new [[approval]], and how you will avoid claim-day [[phishing]] sites.",
          "Cross-check technical readiness with [Testnet Wallet Hygiene for Airdrop Farming](/guides/testnet-wallet-hygiene-for-airdrop-farming) and fee control with [Gas Optimization for Farming](/guides/gas-optimization-for-farming). Eligibility without fee discipline is how farmers spend more than they ever receive.",
        ],
      },
      {
        heading: "The disqualifier checklist",
        paragraphs: [
          "Projects and analytics firms score [[Sybil]] patterns: dozens of wallets funded from one exchange withdrawal in a linear tree, identical transaction graphs, shared [[RPC]] fingerprints in some tooling, and rapid drain-to-CEX after claim. You cannot fully know the model, but you can avoid cartoonish patterns. If you use multiple wallets, give them independent funding paths and independent timing—or accept that they may be collapsed into one identity.",
          "Other disqualifiers: using stolen accounts, botting against ToS, wash trading against yourself in a closed loop, and interacting with mixer services in ways that get the wallet flagged by compliance partners. Marketplaces that buy “aged wallets” are often useless or toxic.",
          "Risk: Claim portals are peak [[phishing]] season. Bookmark the official claim URL from the project’s signed blog or known domain. Fake claim sites request [[seed phrase]] entry or draining [[approval]]s. Always read [[simulation]] output; a claim should not require unlimited USDC allowance.",
        ],
      },
      {
        heading: "Costing the farm against uncertain upside",
        paragraphs: [
          "Sum all [[gas fees]], bridge fees, trading fees, and the opportunity cost of capital stuck in pools. Compare to a sober outcome range—not a friend’s screenshot of a six-figure claim. Many [[points program]] seasons end with thin allocations diluted across millions of addresses. Price in zero as a real scenario.",
          "If your expected value after honest probabilities is negative, stop early. Rotating into measured [[staking]] or [[stablecoin]] lending may be the better use of capital—see [Lending Yield and Liquidation Risk](/guides/lending-yield-and-liquidation-risk). Farming is optional; solvency is not.",
          "When a TGE approaches, re-read the checklist, revoke unused [[allowance]]s, and separate claim wallets from vault wallets. Eligibility is earned by boring consistency and surviving disqualifiers—not by last-minute volume spikes that scream automation.",
        ],
      },
    ],
  },
  {
    slug: "gas-optimization-for-farming",
    title: "Gas Optimization for Farming",
    description:
      "Practical tactics to cut Ethereum and L2 farming costs: gwei timing, batching, fee tiers, blobs, and knowing when activity is not worth the burn.",
    publishedAt: "2026-05-01",
    readingMinutes: 4,
    sections: [
      {
        heading: "Know what you are paying for",
        paragraphs: [
          "On Ethereum, transaction cost ≈ gas used × (base fee + priority tip), with base fee burned under [[EIP-1559]]. Wallets quote this in [[gwei]]. A simple ETH transfer might use 21,000 gas; a DEX swap might use 150,000–300,000+ depending on routing; an NFT mint or complex farm contract can exceed that. At 30 gwei, a 200,000 gas swap costs 0.006 ETH—tens of dollars depending on ETH price. At 8 gwei, the same swap is a fraction of that. Farming without watching the gas oracle is how “points” become a fee donation to validators.",
          "On [[layer 2]] networks, you pay L2 execution gas plus data availability costs. After Ethereum’s proto-danksharding upgrade, many rollups post [[blob]] data that made typical swaps far cheaper than 2023-era L2 fees. Still, congested L2s and complex routes add up when you repeat them daily. Always check the wallet estimate on the target chain—not a mainnet habit applied blindly.",
          "Optimization starts with a budget. Cap weekly gas in USD. When the cap is hit, farming stops—even if Discord is screaming about a snapshot. Discipline beats folklore.",
        ],
      },
      {
        heading: "Timing, tips, and replacement transactions",
        paragraphs: [
          "Base fees fluctuate by block. Use a gas tracker and prefer off-peak hours for non-urgent actions. Set a max fee you can live with; if the chain is spiking, wait. Priority tips only need to be competitive for your urgency—over-tipping on routine swaps wastes money.",
          "If a transaction is stuck, replace it with the same [[nonce]] and a higher tip rather than sending a duplicate that could both land. Understand nonce sequencing before you spam parallel farm actions from one [[EOA]]; stuck nonces freeze the queue.",
          "Batch when protocols support it. Some UIs let you multicall claims or combine approve+deposit. An [[approval]] set to an exact amount (or a modest buffer) can be safer than unlimited, though it may cost an extra tx later—trade carefully. Revoke unused allowances in batches during low [[gwei]] windows using reputable [[revoke]] tools.",
        ],
      },
      {
        heading: "DEX routes, fee tiers, and bridges",
        paragraphs: [
          "On Uniswap-style [[AMM]]s, pools exist at different [[AMM fee tier]] levels such as 0.01%, 0.05%, 0.3%, and 1%. Routers usually pick the best path, but manually forcing a shallow pool can increase price impact and cause reverts—wasting gas. Favor liquid pairs for farming tasks that only need “a swap occurred.” For learning [[slippage]] and [[MEV]] defenses, read [DEX Swaps: Slippage, MEV, and Approvals](/guides/dex-swaps-slippage-mev-and-approvals).",
          "Bridging is a major fee and time sink. Canonical [[optimistic rollup]] withdrawals to L1 can take ~7 days; fast bridges charge a spread. Prefer doing a sequence of farm actions entirely on one [[L2]] when the eligibility rubric allows it. When you must bridge, follow [Bridging Without Losing Funds](/guides/bridging-without-losing-funds) and [Layer 2 Fees, Blobs, and When to Bridge](/guides/layer-2-fees-blobs-and-when-to-bridge).",
          "Risk: “Gasless” farming UIs sometimes sponsor fees in exchange for sweeping [[approval]]s or session keys. Read [[simulation]] carefully. Gasless is not riskless.",
        ],
      },
      {
        heading: "Activity quality beats transaction count",
        paragraphs: [
          "Sybil models increasingly discount raw tx counts. Fifty identical $1 swaps may score worse than five varied product uses across a month—and cost more gas. Align with [Airdrop Eligibility Checklist](/guides/airdrop-eligibility-checklist): fewer, meaningful actions at low gwei beat spam.",
          "Estimate break-even. If you expect a median [[airdrop]] of $200 for your tier and you already spent $180 on gas, additional farming needs a clear thesis. Sunk cost is not a thesis. Rotate remaining capital to measured [[staking]] or simply stop.",
          "Practical weekly routine: check gas outlook Monday, execute planned actions in one or two low-fee windows, document fees, revoke stale spenders monthly. Optimization is an operating rhythm—not a single clever trick.",
        ],
      },
    ],
  },
  {
    slug: "sybil-resistance-what-farmers-miss",
    title: "Sybil Resistance: What Farmers Miss",
    description:
      "Why multi-wallet farming fails against modern Sybil filters, what clusters look like on-chain, and how to farm with one credible identity instead.",
    publishedAt: "2026-05-20",
    readingMinutes: 4,
    sections: [
      {
        heading: "Sybil is an economics problem for protocols",
        paragraphs: [
          "A [[Sybil]] attack in airdrop context means one person operates many wallets to claim many rewards. Protocols fight this because unearned dilution harms real users and treasuries. Filters combine on-chain graph analysis, off-chain account linkage, and sometimes third-party score providers. Farmers who optimize only for volume miss that the adversary is a clustering algorithm, not a human scrolling Etherscan casually.",
          "If two hundred wallets receive funds from one [[CEX]] withdrawal in a star pattern, then perform identical swap→bridge→provide-liquidity sequences within minutes, the graph is loud. Timing entropy, amount entropy, and funding diversity matter as much as raw activity. Copy-paste farm scripts produce copy-paste clusters.",
          "Honest takeaway: running twenty weak wallets often underperforms one strong wallet that looks like a real user—and the twenty wallets can poison each other if the project collapses the cluster and excludes all of them.",
        ],
      },
      {
        heading: "Linkage surfaces farmers forget",
        paragraphs: [
          "On-chain: shared funding parents, shared destination consolidation, identical contract call selectors in the same order, round-number amounts repeating across addresses. Off-chain: same email domain patterns, same phone for multiple Discord accounts, same IP ranges from home ISP without residential proxy folklore, same browser fingerprints when connecting WalletConnect from one machine. You may not control the model weights, but you can avoid obvious linkage.",
          "Social farming adds more glue. One Twitter account shilling twenty wallet addresses, or one ENS name reverse-resolving to a farm hub, is a gift to analysts. If you need multiple wallets for legitimate separation (vault vs hot), keep their public identities separate and do not role-play them as unrelated strangers in the same Discord ticket.",
          "Risk: Buying “aged wallets” or KYC’d accounts markets you into fraud ecosystems. Those wallets may already be flagged, previously used for abuse, or subject to reclaim dramas. They are not a Sybil strategy; they are a liability.",
        ],
      },
      {
        heading: "Design activity that looks like product use",
        paragraphs: [
          "Real users bridge when they need funds, swap when they want an asset, and leave balances idle. Farmers over-optimize for daily check-ins that create robotic cadence. Prefer irregular schedules, varied sizes, and actual use of distinctive features. Hold some inventory instead of emptying every wallet to zero after each session—empty wallets that only exist for quests are a pattern.",
          "Align actions to the checklist in [Airdrop Eligibility Checklist](/guides/airdrop-eligibility-checklist). Spend gas where the product’s unique value shows up, not only on the cheapest generic router swap. Use [Gas Optimization for Farming](/guides/gas-optimization-for-farming) so quality actions remain affordable on [[L2]] and, when needed, on mainnet during sane [[gwei]].",
          "If you previously practiced on [[testnet]], do not assume those addresses help mainnet eligibility—but do reuse the hygiene habits from [Testnet Wallet Hygiene for Airdrop Farming](/guides/testnet-wallet-hygiene-for-airdrop-farming).",
        ],
      },
      {
        heading: "One-wallet excellence as a default strategy",
        paragraphs: [
          "Default to a single farming [[hot wallet]] with a documented history: months of activity, varied protocols, some NFT or governance participation if organic, and never a vault-sized balance. Keep life-changing assets in [[self-custody]] that never signs farm dapps. This separation is both Sybil-smart and security-smart.",
          "When protocols announce linear scoring by volume alone, the meta may temporarily reward spam—but post-filters and retroactive clawbacks exist. Building a credible identity compounds across seasons; building a Sybil farm compounds ban risk.",
          "Measure success by expected allocation after filters, not by wallet count. If your edge requires industrial Sybil operations, you are in an arms race against the protocol’s survival incentives. Most readers of GetFreeBit are better served by learning products deeply, minimizing [[phishing]] risk, and accepting that airdrops are uncertain bonuses—not a business plan.",
        ],
      },
    ],
  },
  {
    slug: "native-eth-staking-vs-liquid-staking",
    title: "Native ETH Staking vs Liquid Staking",
    description:
      "Compare running a 32 ETH validator with holding LSDs like stETH: yields, liquidity, slash risk, smart-contract layers, and who each path fits.",
    publishedAt: "2026-06-15",
    readingMinutes: 4,
    sections: [
      {
        heading: "What native staking actually requires",
        paragraphs: [
          "[[native staking]] on Ethereum means operating (or exclusively staking through) a [[validator]] that bonds 32 ETH. You participate in [[proof of stake]] consensus: attest, propose when selected, stay online, and avoid double-signing. Rewards fluctuate with network conditions; penalties and [[slash]] events punish serious misbehavior or correlated outages. Capital is large, operations are real, and liquidity is constrained by exit queue dynamics and protocol rules—not by a simple “withdraw now” button like a [[CEX]] earn product.",
          "Home staking demands reliable uptime, secure key management (especially withdrawal credentials), and maintenance through client updates. Staking-as-a-service providers reduce ops burden but introduce counterparty and fee layers. Either way, you are securing Ethereum—not claiming a fixed [[APY]] billboard rate.",
          "Risk: If you cannot tolerate 32 ETH of correlated crypto risk plus operational complexity, native solo staking is the wrong tool. There is no shame in choosing a different path; there is harm in underestimating keys and downtime.",
        ],
      },
      {
        heading: "Liquid staking derivatives in plain terms",
        paragraphs: [
          "An [[LSD]] (liquid staking derivative) such as stETH or rETH represents staked ETH plus rewards accounting, packaged as a transferable token. You deposit ETH into a protocol, receive the [[LSD]], and can often sell it on a [[DEX]], use it as [[collateral]] in lending markets, or hold it in a wallet while validators run in the background. You gain liquidity and fractional entry below 32 ETH; you add [[smart contract]] risk, governance risk, and possible basis divergence between the LSD and ETH during stress.",
          "Advertised [[APY]] on LSDs tracks staking rewards minus protocol fees, sometimes with incentives layered on. Compare net rates after fees, and ask what happens if secondary market liquidity thins. A temporary depeg on a [[DEX]] is not the same as a [[slash]], but it can still mark-to-market hurt if you must sell into the dip.",
          "Using LSDs as collateral loops (stake → lend → borrow ETH → stake again) amplifies both yield and [[liquidation]] risk. If you go there, study [Lending Yield and Liquidation Risk](/guides/lending-yield-and-liquidation-risk) before you loop.",
        ],
      },
      {
        heading: "Side-by-side decision factors",
        paragraphs: [
          "Capital: native solo needs 32 ETH per validator; LSDs allow smaller tickets. Liquidity: LSD transferable; native exits depend on protocol exit mechanics and queues. Ops: native needs clients and monitoring; LSD holders outsource ops to node operators. Risk surface: native emphasizes key and slash operational risk; LSD emphasizes contract, oracle, and operator-set risk. Fees: native pays execution/infra costs; LSD takes a protocol cut of rewards.",
          "Decentralization ethics matter to some holders: concentrating stake in a few LSD providers has consensus implications. Diversifying across providers or choosing solo/distributed validator technology is a values-and-risk choice, not only a yield choice.",
          "Tax and accounting differ by jurisdiction: rewards may be income when received; LSD rebase vs reward-token models change paperwork. Keep records as you would for any yield—see [Crypto Records for Taxes Without Panic](/guides/crypto-records-for-taxes-without-panic).",
        ],
      },
      {
        heading: "Practical recommendations",
        paragraphs: [
          "Choose native staking if you have ≥32 ETH, can secure withdrawal keys (ideally with a [[hardware wallet]] workflow), and want direct protocol exposure with minimal extra contract layers. Choose an LSD if you need liquidity, smaller size, or simpler ops—and you accept layered risk. Avoid chasing the highest temporary incentive [[APY]] on unknown restaking wrappers until you understand the stack in [Restaking and LRT Risk Stack](/guides/restaking-and-lrt-risk-stack).",
          "Regardless of path, separate vault ETH from farming wallets. Do not connect your staking withdrawal address to random [[airdrop]] claim sites. [[phishing]] against stakers is constant because balances are large.",
          "Staking is a security-sensitive yield path, not a faucet. Measure real net rewards over months, not a single dashboard screenshot. If you need fiat flexibility, plan unstaking or LSD exit routes before you deposit—not during a market panic when everyone shares the same exit door.",
        ],
      },
    ],
  },
  {
    slug: "lending-yield-and-liquidation-risk",
    title: "Lending Yield and Liquidation Risk",
    description:
      "How DeFi lending APYs are produced, what health factors mean, and how to size collateral so borrowed yield strategies do not end in forced sales.",
    publishedAt: "2026-07-01",
    readingMinutes: 4,
    sections: [
      {
        heading: "Where lending yield comes from",
        paragraphs: [
          "In protocols like Aave-style money markets, suppliers deposit assets into a pool; borrowers post [[collateral]] and pay interest. Supplier [[APY]] rises when utilization is high and falls when the pool is flush with cash. The rate is variable. It is not a guaranteed bond. Protocol fees, incentives (temporary reward tokens), and [[stablecoin]] vs volatile asset mixes all change the headline number.",
          "Ask what you are being paid for. Supplying USDC during calm markets may yield a low single-digit [[APR]]/[[APY]] for credit risk to borrowers plus smart-contract risk. Supplying a volatile asset while farming incentives may look like high APY until incentives end. Separate base interest from temporary rewards the way you separated faucet drips from casino games in earlier guides.",
          "Compare on-chain lending to custodial [[CEX]] earn products carefully. CEX yield adds platform credit risk and freeze risk; DeFi lending adds contract and oracle risk. Neither is “risk-free yield.” For stablecoin-focused framing, also read [Stablecoin Yield: What You’re Actually Paid For](/guides/stablecoin-yield-what-youre-actually-paid-for).",
        ],
      },
      {
        heading: "Collateral, health factor, and liquidation mechanics",
        paragraphs: [
          "When you borrow, each collateral type has a loan-to-value ceiling. Your [[health factor]] summarizes how close you are to [[liquidation]]. If prices move against your collateral (or your debt asset rises, as with borrowed ETH in a short squeeze scenario), health falls. Below the threshold, liquidators repay debt and seize collateral at a discount—your position is forcibly reduced.",
          "Concrete sketch: you supply $10,000 of ETH as collateral and borrow $4,000 USDC against it with a liquidation threshold that implies trouble if ETH drops sharply. A 30% ETH drawdown can erase your buffer depending on protocol parameters. Liquidation bonuses might hand liquidators 5–10% of seized value—value that comes from you. This is not a theoretical fee; it is how the system stays solvent.",
          "Risk: Looping strategies (deposit [[LSD]] → borrow ETH → buy more LSD) multiply liquidation odds. A depeg of the LSD versus ETH plus market volatility can cascade. If you use LSDs as collateral, revisit [Native ETH Staking vs Liquid Staking](/guides/native-eth-staking-vs-liquid-staking) so you understand both layers.",
        ],
      },
      {
        heading: "Oracle, contract, and operational risks",
        paragraphs: [
          "Lending markets depend on [[oracle]] price feeds. Delayed or manipulated oracles can cause wrongful liquidations or bad debt. Prefer markets with battle-tested oracles and transparent parameter governance. Brand-new forks with 20% incentive APY are often compensating you for unverified risk.",
          "Smart-contract bugs and admin keys matter. Diversify across protocols only if you can monitor both; diversification is not an excuse to deposit into five unaudited clones. Track [[TVL]] as context, not as proof of safety.",
          "Operationally: use a dedicated [[hot wallet]] for lending positions, verify [[token contract]] addresses, and read [[simulation]] before increasing [[allowance]]. Unlimited approvals to a lending UI you opened from a search ad are a classic drain path—bookmark official domains.",
        ],
      },
      {
        heading: "Sizing rules that keep you solvent",
        paragraphs: [
          "Pick a maximum loan-to-value well below protocol maximums—many operators stay at 30–50% of the theoretical ceiling so normal volatility does not liquidate them. Set price alerts on collateral. Keep a reserve of the debt asset to repay quickly during spikes. Avoid borrowing assets you cannot easily source during stress.",
          "Recompute yield after incentives. If base supply APY is 2% and rewards are 12%, your sustainable rate is closer to 2% when rewards taper. Do not spend reward tokens blindly; they may be illiquid or inflationary.",
          "Pair lending with broader portfolio hygiene: self-custody checklists when withdrawing to cold storage ([Self-Custody Withdrawal Checklist](/guides/self-custody-withdrawal-checklist)), and fee awareness if you rebalance on a [[DEX]] during volatile [[gwei]]. Yield is what remains after liquidations, missed alerts, and panic clicks—not what a dashboard flashes on day one.",
        ],
      },
    ],
  },
];
