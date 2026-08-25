import type { Guide } from "./types";

export const GUIDES_B: Guide[] = [
  {
    slug: "impermanent-loss-with-real-numbers",
    title: "Impermanent Loss With Real Numbers",
    description:
      "Work through concrete AMM examples so you see how price moves, fees, and pool choice change outcomes versus simply holding.",
    publishedAt: "2026-02-12",
    readingMinutes: 6,
    sections: [
      {
        heading: "What impermanent loss actually measures",
        paragraphs: [
          "[[Impermanent loss]] is not a fee someone deducts from your wallet. It is the gap between the value of assets sitting in a [[liquidity pool]] and the value those same assets would have if you had simply held them outside the pool. Automated market makers rebalance your inventory as traders swap. When prices move, you end up holding more of the asset that fell and less of the asset that rose—exactly the opposite of what a directional holder wants.",
          "The loss is called “impermanent” because if prices return to the original ratio, the inventory gap shrinks. In practice many pairs never mean-revert cleanly, so the gap becomes a realized underperformance when you withdraw. Fees earned from the [[AMM]] can offset that gap, but only if volume and [[AMM fee tier]] choice are strong enough relative to volatility.",
          "Treat IL as inventory risk, not as a mysterious DeFi tax. If you understand the numbers, you can decide when providing liquidity is a fee business with acceptable inventory swing—and when you are better off holding, staking, or lending instead. Pair this mental model with [lending yield and liquidation risk](/guides/lending-yield-and-liquidation-risk) so you do not confuse pool risk with borrow risk.",
        ],
      },
      {
        heading: "A worked 50/50 constant-product example",
        paragraphs: [
          "Suppose you deposit 1 ETH and 3,000 USDC into a classic x·y=k pool when ETH is $3,000. Your position is worth $6,000. Later ETH trades at $4,500. In a constant-product pool without fees, the pool’s reserves adjust so the product stays constant and the marginal price matches the market. Roughly, you would withdraw about 0.816 ETH and about 3,674 USDC—still near $6,000 of pool value at the new price, while simply holding 1 ETH + 3,000 USDC would be worth $7,500. The difference (~$1,500) is the classic IL illustration.",
          "Double the move the other way. If ETH falls to $2,000 from the same starting point, the pool again leaves you overweight ETH and underweight USDC relative to HODL. The formula for a 50/50 pool is well known: value relative to holding scales with the square root of the price ratio. A 2× price move implies about 5.7% IL before fees; a 5× move is far worse. Write the ratio down before you deposit so you are not surprised on withdrawal day.",
          "Fees change the story. If that pool earned 0.3% on $2,000,000 of volume while you owned 1% of the pool, your fee share is $60—nowhere near enough to offset a large ETH run. High-volume stablecoin pairs with tiny fee tiers can still pay if daily turnover is enormous. Volatile meme pairs rarely do. Always compare fee income against a hold baseline, not against zero.",
        ],
      },
      {
        heading: "Concentrated liquidity changes the math",
        paragraphs: [
          "Uniswap v3-style ranges amplify both fees and IL inside the active tick range. If you concentrate around the current price, your capital works harder—until price exits the range and you sit entirely in one asset, earning nothing until you rebalance. Out-of-range positions are a common way beginners “earn fees for a week” and then realize they became involuntary directional holders.",
          "Example: you set a tight ETH/USDC range just above and below $3,000. A 8% move can push you fully into USDC while ETH keeps rallying. You collected dense fees for a few days, then underperformed a wide-range LP and underperformed HODL. Wide ranges behave closer to v2; narrow ranges behave like a short-volatility position you must manage.",
          "Operational cost matters. Rebalancing burns [[gas]], invites [[MEV]] on crowded chains, and creates taxable events in many jurisdictions. If you re-range weekly on mainnet without batching, fee income can be eaten by [[gas fees]] alone. Prefer [[L2]] venues when actively managing ranges, and read [layer 2 fees, blobs, and when to bridge](/guides/layer-2-fees-blobs-and-when-to-bridge) before moving size.",
        ],
      },
      {
        heading: "Stable pairs, correlated assets, and honest expectations",
        paragraphs: [
          "USDC/USDT pools have tiny IL when both stay near $1, but depeg events are the real risk—inventory risk shows up as credit/redemption risk rather than chart volatility. ETH/stETH or similar correlated pairs usually show lower IL than ETH/USDC until the liquid staking token discounts or premiums widen. Correlate carefully: “both are ETH-like” is not the same as “prices cannot diverge.”",
          "If your goal is ETH exposure with yield, compare LP fees-minus-IL against [native ETH staking vs liquid staking](/guides/native-eth-staking-vs-liquid-staking) and against simple [[stablecoin]] lending. Many users discover that a boring [[APY]] on blue-chip lending beats an exciting LP APR after IL. For what yield actually pays you for, see [stablecoin yield: what you’re actually paid for](/guides/stablecoin-yield-what-youre-actually-paid-for).",
          "Risk callout: pool tokens and NFT positions are still smart-contract exposures. A bug, admin key, or oracle failure can dominate IL. Size positions as if the contract can fail, verify the [[token contract]] on a [[block explorer]], and never treat past fee charts as a guarantee of future volume.",
        ],
      },
      {
        heading: "A practical decision checklist",
        paragraphs: [
          "Before depositing, estimate a plausible price range over your intended hold period and compute rough IL from a 50/50 formula or a trusted simulator. Subtract expected fees using conservative volume assumptions—not the pool’s best week. Add gas and your time. If the residual edge is thin, do not provide liquidity just to “be in DeFi.”",
          "Prefer fee tiers that match asset volatility: stable pairs often use 0.01%–0.05%; volatile majors 0.3%; exotic pairs higher. Wrong tiers starve LPs of volume or overpay traders. After entry, track position value versus a hold spreadsheet monthly so IL stays visible instead of emotional.",
          "Exit with intent. When you withdraw, you crystallize inventory. Swap back to your target portfolio deliberately using the habits in [DEX swaps: slippage, MEV, and approvals](/guides/dex-swaps-slippage-mev-and-approvals). Impermanent loss stops being abstract the day you reconcile the spreadsheet—do that math before you click supply.",
        ],
      },
    ],
  },
  {
    slug: "restaking-and-lrt-risk-stack",
    title: "Restaking and the LRT Risk Stack",
    description:
      "Map the layered risks behind restaking and liquid restaking tokens so extra yield is weighed against slash, operator, and contract failure.",
    publishedAt: "2026-02-26",
    readingMinutes: 5,
    sections: [
      {
        heading: "What restaking adds on top of staking",
        paragraphs: [
          "[[Native staking]] on Ethereum already exposes you to [[validator]] performance, client bugs, and [[slash]] for severe misbehavior. [[Restaking]] reuses that economic security—often via an [[LSD]] or natively restaked ETH—so additional services (AVSs) can slash or penalize the same capital if their rules are broken. Extra reward streams exist because extra obligations exist.",
          "A [[LRT]] is a receipt for a restaked position packaged by a third-party protocol. You gain liquidity and simpler UX; you also inherit that protocol’s contracts, operator set, withdrawal pipeline, and governance. The token price can trade at a premium or discount to underlying value when exits congest or confidence wobbles.",
          "Start from the base layer. If you do not already understand [native ETH staking vs liquid staking](/guides/native-eth-staking-vs-liquid-staking), restaking will feel like free yield. It is not. It is stacked obligation. GetFreeBit’s stance is simple: map every layer that can take your principal before you chase points or headline [[APY]].",
          "Concrete framing helps. If vanilla staking yields roughly low-single-digit percent and an LRT dashboard shows mid-teens, the spread is not “alpha you discovered.” It is compensation (or temporary subsidy) for accepting AVS penalties, issuer contracts, and secondary-market liquidity risk on top of Ethereum consensus risk.",
        ],
      },
      {
        heading: "The risk stack, layer by layer",
        paragraphs: [
          "Layer one is consensus risk: Ethereum [[slash]] conditions and downtime penalties. Layer two is restaking middleware risk—bugs in the restaking contracts, incorrect accounting, or governance capture. Layer three is AVS risk: each service you opt into can define penalties; more services usually means more ways to lose stake for someone else’s operational failure.",
          "Layer four is operator risk. Many users delegate to node operators. An operator that double-signs, runs misconfigured software, or keys get compromised can harm restakers who chose them. Diversifying operators reduces single-shop failure but does not remove correlated client bugs.",
          "Layer five is LRT issuer risk: mint/redeem design, oracle or rate providers, pause guardians, and upgrade keys. Layer six is market/liquidity risk: secondary markets for LRTs can gap during stress, exactly when you want to exit. Count six layers before calling the product “just staking with bonus.”",
          "Correlation is easy to miss. One client bug can hit many operators at once. One popular AVS outage can trigger correlated exits across LRTs. Stress tests that assume independent failures understate how “diversified” restaking portfolios behave in practice.",
        ],
      },
      {
        heading: "Yield sources and what they imply",
        paragraphs: [
          "Rewards may include Ethereum issuance, AVS payments in various tokens, and points that might convert at a [[TGE]]. Points are not cash. Treat [points programs and TGE expectations](/guides/points-programs-and-tge-expectations) as speculative marketing overlays, not as a bond coupon.",
          "When an LRT shows double-digit [[APY]] while vanilla staking is low-single-digit, ask which layer is paying you. Is it real AVS cash flow, temporary incentives, leverage elsewhere, or emissions that dilute later holders? If the answer is unclear, size as speculation.",
          "Compare opportunity cost honestly. Sometimes lending a [[stablecoin]] or holding stETH without restaking is enough. Extra basis points that require three new admin-key trusts are often not worth a meaningful fraction of net worth. See also [lending yield and liquidation risk](/guides/lending-yield-and-liquidation-risk) for a different yield shape with clearer failure modes.",
          "Worked example: $20,000 of ETH earning an extra 3% from restaking incentives is $600/year before taxes and before any slash or depeg. A 5% temporary LRT discount on exit costs $1,000—more than a year of that “extra.” Size positions so a bad exit week does not erase years of incremental yield.",
        ],
      },
      {
        heading: "Operational hygiene for restakers",
        paragraphs: [
          "Use a dedicated [[hot wallet]] or [[hardware wallet]] address for restaking experiments—not the cold store that holds multi-year savings. Verify every [[token contract]] on a [[block explorer]] before bridging or swapping into an LRT. Prefer [[canonical bridge]] paths when moving collateral across [[L2]] networks.",
          "Read withdrawal and [[unbonding period]] docs before depositing. Restaked positions can have longer or more complex exits than vanilla staking. Plan cash needs around those delays so you are not forced to sell the LRT at a discount on secondary markets.",
          "Risk callout: restaking concentrates smart-contract surface area. A single compromised upgrade key or flawed AVS penalty module can dominate years of incremental yield. Cap exposure, document which operators and AVSs you opted into, and revisit that list when parameters change—not only when Twitter is excited.",
          "Keep a simple ops log: date entered, LRT contract, operator set, AVSs opted in, and intended exit path. When a protocol announces parameter changes, update the log the same day. Memory is a weak control surface during incidents.",
        ],
      },
      {
        heading: "A sober allocation framework",
        paragraphs: [
          "Bucket capital: (1) long-term ETH you are willing to lock under consensus rules only, (2) a smaller sleeve for liquid staking without restaking, (3) an even smaller sleeve for LRTs if you accept the full stack. Never invert the pyramid because a dashboard shows green APY.",
          "Write down kill criteria in advance: depeg beyond X%, pause on deposits, unexplained operator exits, or AVS penalties you do not understand. Pre-commitment beats panic clicking during an incident.",
          "Restaking can be a rational tool for sophisticated operators who underwrite each AVS. For most individuals, the educational win is recognizing stacked risk—and choosing deliberate simplicity more often than not.",
        ],
      },
    ],
  },
  {
    slug: "stablecoin-yield-what-youre-actually-paid-for",
    title: "Stablecoin Yield: What You’re Actually Paid For",
    description:
      "Separate funding rates, lending demand, incentives, and credit risk so a dollar-denominated APY stops looking like free money.",
    publishedAt: "2026-03-12",
    readingMinutes: 4,
    sections: [
      {
        heading: "A stable unit of account is not a risk-free asset",
        paragraphs: [
          "A [[stablecoin]] aims to track a reference—usually the US dollar—but the mechanisms differ. Fiat-backed coins depend on reserves, attestations, banking rails, and redemption policy. Crypto-collateralized designs depend on overcollateralization, [[oracle]] quality, and liquidation engines. Algorithmic experiments have failed publicly; treat unverified “dollar” tokens as speculative, not cash.",
          "Yield on stablecoins is payment for risk transfer or for temporary incentives. Someone borrows, shorts, market-makes, or subsidizes growth. If you cannot name the payer, you do not understand the product. GetFreeBit covers this under staking, savings, and yield: clarity first, then allocation.",
          "Before chasing the highest [[APY]], read [lending yield and liquidation risk](/guides/lending-yield-and-liquidation-risk) and [spot vs perps: funding and liquidation](/guides/spot-vs-perps-funding-and-liquidation). Those guides explain two common engines behind “earn 8% on USDC” dashboards.",
        ],
      },
      {
        heading: "Common yield engines, decoded",
        paragraphs: [
          "Money markets (Aave-style) pay lenders from borrower interest. Rates rise when utilization is high—often when leverage demand spikes. Your risk is protocol insolvency, bad debt socialization, [[oracle]] failure, and the stablecoin’s own depeg—not just “smart contract risk” as a slogan.",
          "Perp-basis and funding strategies earn when [[funding rate]]s are persistently positive and hedged inventory is managed well. Retail products that wrap this may hide liquidation cascades, custody, or rebalancing lag. Ask whether you are a lender, an LP, or the customer of a trading desk.",
          "Incentive farms pay emissions or [[points]] on top of thin real yield. Emissions end; points may disappoint at [[TGE]]. Compare base rate versus incentivized rate on day one and assume incentives go to zero. If the base rate alone would not attract you, walk away.",
        ],
      },
      {
        heading: "Worked comparison: three “8%” offers",
        paragraphs: [
          "Offer A: on-chain USDC lending at 5% base plus 3% temporary rewards. Real credit demand is 5%; the rest is marketing runway. Offer B: a centralized platform advertising 8% with vague “strategy.” You add custody risk, withdrawal gates, and opacity—see patterns from past platform failures without needing drama.",
          "Offer C: LP in a stable/stable pool earning fees. Headline APR may look calm until a depeg forces IL-like inventory damage and redemption queues. Fees do not fix credit events. Cross-check issuer transparency and redemption history rather than pool [[TVL]] alone.",
          "Run a one-page sheet: base yield, incentive yield, custody model, withdrawal constraints, historical depegs, and max acceptable loss. If you cannot fill the sheet, you are not evaluating yield—you are gambling on UI polish.",
        ],
      },
      {
        heading: "Depeg, redemption, and operational reality",
        paragraphs: [
          "During stress, secondary market price can disconnect from redemption value. Holding on a [[CEX]] may freeze withdrawals; holding on-chain may leave you able to sell only at a discount. Diversify issuers if stablecoins are your dry powder, and keep some true cash off-crypto for living expenses.",
          "Watch [[memo]] and network mistakes when moving stables between venues—sending USDC on the wrong chain to an exchange deposit address is a classic loss. Use the habits in [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist) even for “boring” dollars.",
          "Risk callout: high [[APY]] on obscure dollar-branded tokens is a common lure into [[honeypot]] and [[rug pull]] territory. Prefer established issuers you can research, and use [spotting honeypots and rug pulls](/guides/spotting-honeypots-and-rug-pulls) before approving any new [[token contract]].",
        ],
      },
      {
        heading: "How to choose a rate you can defend",
        paragraphs: [
          "Match yield product to purpose. Emergency funds need liquidity and low complexity—often short-duration T-bill-like products off-chain or the most boring on-chain blue chips with modest rates. Speculative sleeves can take incentive risk knowingly, sized small.",
          "Revisit monthly. Utilization, funding, and emissions change. A rate that made sense in February can be adverse selection by August if only desperate borrowers remain. Set calendar reminders; do not rely on memory.",
          "Stablecoin yield is a lens into who needs your dollars and why. When you can answer that in one sentence, the [[APR]] versus [[APY]] debate becomes secondary—and you stop confusing compensation for risk with a free lunch.",
        ],
      },
    ],
  },
  {
    slug: "first-cex-account-kyc-2fa-withdrawals",
    title: "First CEX Account: KYC, 2FA, and Withdrawals",
    description:
      "Set up a centralized exchange account the operator way—identity checks, strong 2FA, allowlists, and safe first withdrawals.",
    publishedAt: "2026-03-28",
    readingMinutes: 4,
    sections: [
      {
        heading: "Pick a venue that matches your jurisdiction",
        paragraphs: [
          "A [[CEX]] is a regulated or semi-regulated [[VASP]] that custodied your assets until you withdraw. Availability, fee schedules, supported pairs, and fiat rails vary by country. Prefer well-known tier-1 venues with clear support docs over random “bonus” exchanges that cold-email you. GetFreeBit lists partners in site config when relevant; always verify the live URL yourself.",
          "Account setup usually starts with email, then [[KYC]]: government ID, selfie, sometimes proof of address. Expect delays and retries if lighting is poor or documents are expired. Do not outsource KYC to strangers offering to “verify for you”—that is account-takeover bait.",
          "Understand what the account is for. Many users need a fiat on-ramp and liquidity, then move coins to [[self-custody]]. Others trade [[spot]] only. Define the job before you optimize referral perks. For the custody handoff, keep [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist) open in another tab.",
        ],
      },
      {
        heading: "Lock down authentication before you deposit",
        paragraphs: [
          "Enable an authenticator app (TOTP) for 2FA immediately. Prefer authenticator apps over SMS when the exchange allows it—SIM-swap attacks still happen. Store backup codes offline. If the exchange offers passkeys or hardware-key 2FA (security keys), use them for the highest-value accounts.",
          "Create a unique password in a password manager. Never reuse the password from email. Review anti-phishing codes if the venue provides them so forged emails are easier to spot. Phishing sites clone login pages; bookmark the real domain and type from that bookmark only.",
          "Set withdrawal allowlists / address whitelists when available, with a time lock on changes. That single setting blocks many account-drain scenarios after email compromise. Pair it with withdrawal password or fund password features if offered.",
        ],
      },
      {
        heading: "Deposits, networks, and the test amount ritual",
        paragraphs: [
          "When buying crypto, confirm you are purchasing the asset you intend—tickers collide. When depositing from elsewhere, select the correct network and copy the [[public address]] carefully. Some assets require a [[memo]] or destination tag; missing it can mean a painful support ticket or permanent loss.",
          "Before sending size, withdraw a [[test amount]] to your wallet. Verify the tx on a [[block explorer]], confirm the balance, then send the remainder. This habit matters more than any fee coupon. Details live in the self-custody checklist and in [hardware wallet setup and passphrase](/guides/hardware-wallet-setup-and-passphrase) if cold storage is the destination.",
          "Watch for [[travel rule]] prompts on larger transfers between VASPs. Have your receiving exchange or wallet details ready so withdrawals are not stuck pending compliance questionnaires.",
        ],
      },
      {
        heading: "Fees, limits, and operational gotchas",
        paragraphs: [
          "CEX fee schedules differ for maker/taker, payment method, and VIP tiers. Spreads on “zero fee” pairs can still be wide. For learning accounts, prioritize clarity over shaving 0.01%. Record every trade if you will need [crypto records for taxes without panic](/guides/crypto-records-for-taxes-without-panic).",
          "Withdrawal limits often rise after KYC levels and cooldown periods. New accounts may face 24–72 hour holds on fiat or crypto outs. Plan around that instead of discovering it when you need funds same-day.",
          "Risk callout: support scams impersonate exchange staff in Telegram and email. Real support does not ask for 2FA codes, seed phrases, or remote desktop access. If an “urgent withdrawal freeze” message appears, navigate from the bookmarked site—not from the message link.",
        ],
      },
      {
        heading: "A first-week checklist",
        paragraphs: [
          "Day one: KYC submitted, TOTP on, backup codes stored, anti-phishing code set. Day two: small fiat deposit, tiny buy, tiny withdrawal test to your wallet. Day three: enable allowlist, review API key settings (disable withdrawals on keys you create for bots), and confirm notification emails are correct.",
          "Keep exchange balances limited to what you need for active trading or near-term spending. Long-term holdings belong in [[self-custody]] with a [[hardware wallet]] when amounts hurt to lose. Exchange insolvency and account compromise are different failures with the same outcome if everything sits hot.",
          "Your first CEX account is infrastructure, not a personality. Configure it like an operator: boring authentication, tested withdrawals, documented addresses—and only then scale deposits.",
        ],
      },
    ],
  },
  {
    slug: "self-custody-withdrawal-checklist",
    title: "Self-Custody Withdrawal Checklist",
    description:
      "A repeatable checklist for moving coins off exchanges into wallets you control without wrong-network, memo, or phishing mistakes.",
    publishedAt: "2026-04-09",
    readingMinutes: 4,
    sections: [
      {
        heading: "Why withdrawals deserve a ritual",
        paragraphs: [
          "[[CEX withdrawal]] mistakes are rarely exotic hacks. They are wrong network, wrong address, missing [[memo]], or a pasted address replaced by malware. A written checklist beats adrenaline. Print it or keep a notes template you reuse every time balances move.",
          "[[Self-custody]] means you hold the keys. That removes exchange freezes and platform insolvency from your threat model—and adds personal key management, backup discipline, and irreversible typos. Both sides of that trade are real.",
          "This guide assumes you already created an exchange account safely via [first CEX account: KYC, 2FA, and withdrawals](/guides/first-cex-account-kyc-2fa-withdrawals) and have a destination wallet—ideally following [hardware wallet setup and passphrase](/guides/hardware-wallet-setup-and-passphrase) for meaningful sums.",
        ],
      },
      {
        heading: "Before you click withdraw",
        paragraphs: [
          "Confirm asset and network on both sides. USDC on Ethereum is not USDC on an [[L2]] or an alternate EVM chain unless the receiving wallet and exchange both support that exact rail. Check the [[chain ID]] in your wallet when connecting to dapps after the funds arrive.",
          "Verify the receiving [[public address]] with a character-by-character check of the first and last six characters, preferably from a hardware device screen—not only from a browser extension popup. If your exchange supports address books / allowlists, add the address ahead of time during a calm moment.",
          "For XRP, XLM, ATOM, and similar, confirm whether a [[memo]]/tag is required. Sending without it to a custodial deposit can lose funds. When moving to self-custody, memos are usually empty—know which case you are in.",
        ],
      },
      {
        heading: "The test amount sequence",
        paragraphs: [
          "Send a [[test amount]] first. Wait for the exchange to mark it complete. Open a [[block explorer]], paste the tx hash, and confirm the to-address and token contract. Only then send the remainder. If anything looks off, stop—do not “fix it” with a larger second try until you understand the first.",
          "On congested networks, withdrawals can sit pending; do not re-broadcast duplicates from a confused UI. If you control the sending wallet yourself, learn how [[nonce]] replacement works before you speed up stuck transactions.",
          "After arrival, consider sweeping from a [[browser wallet]] to cold storage if the first receive address was a hot convenience wallet. Minimize the time large balances sit on internet-connected devices.",
        ],
      },
      {
        heading: "Security checks that catch real drains",
        paragraphs: [
          "Malware that rewrites clipboard addresses is common. Hardware wallets defeat that class of attack when you verify on-device. Also watch for fake support telling you to “re-authorize” a withdrawal—exchanges do not need your seed.",
          "If you will interact with DeFi after withdrawing, learn to read approvals and [[simulation]] results. [Reading Etherscan like an operator](/guides/reading-etherscan-like-an-operator) and [RPC phishing and transaction simulation](/guides/rpc-phishing-and-transaction-simulation) pair naturally with this checklist.",
          "Risk callout: screenshots of seed phrases, cloud photo backups, and “wallet support” DM links are still leading loss causes. Self-custody fails socially more often than cryptographically. Protect the human process.",
        ],
      },
      {
        heading: "Reusable checklist (copy this)",
        paragraphs: [
          "1) Asset + network match on exchange and wallet. 2) Address allowlisted / verified on device. 3) Memo requirement known. 4) Test amount sent and confirmed on explorer. 5) Remainder sent. 6) Balances recorded for tax lots. 7) Exchange balance reduced to working capital only.",
          "Add personal rules: maximum daily withdrawal, cool-down after allowlist changes, and a second-person readback for very large moves if you use a [[multisig]]. Shared funds procedures belong in [multisig basics for shared funds](/guides/multisig-basics-for-shared-funds).",
          "Run the ritual every time—even when you are “sure.” Certainty is when clipboard malware wins. Operators are boring on purpose.",
        ],
      },
    ],
  },
  {
    slug: "hardware-wallet-setup-and-passphrase",
    title: "Hardware Wallet Setup and Passphrase",
    description:
      "Initialize a hardware wallet correctly, back up the seed, understand optional passphrases, and avoid the setup mistakes that permanently lose funds.",
    publishedAt: "2026-04-23",
    readingMinutes: 4,
    sections: [
      {
        heading: "What a hardware wallet does—and does not do",
        paragraphs: [
          "A [[hardware wallet]] keeps [[private key]] material in a secure element or similarly isolated environment and signs transactions you approve on the device screen. Your laptop can be malware-ridden and still fail to extract the keys—if you never type the [[seed phrase]] into that laptop and you verify destination details on-device.",
          "It does not make every dapp safe. Blind signing, malicious [[approval]]s, and fake device firmware still exist. The device reduces key-extraction risk; you still must understand what you sign. Combine with [RPC phishing and transaction simulation](/guides/rpc-phishing-and-transaction-simulation).",
          "Buy from the manufacturer or authorized resellers. “Prepaid” devices from random marketplaces are a known supply-chain scam. On first boot, the device should ask you to generate a new seed—not present one already written in the box.",
        ],
      },
      {
        heading: "Initialization and seed backup",
        paragraphs: [
          "Generate the wallet on-device. Write the 12 or 24 words on the cards provided—or on metal backups if you are storing meaningful value. Record the words in order, check them twice, and store offline. Never photo the cards. Never enter the seed into a website “verifier.”",
          "Perform the official seed-check / recovery quiz the vendor recommends before depositing. Then send a tiny [[test amount]], confirm receive, and practice a recovery on a spare device or after a wipe only if you fully understand the procedure—many users skip practice and discover backup errors years later.",
          "Plan geography: two sealed locations beat one laptop drawer. Tell a trusted inheritance plan enough to recover without putting the full seed in email. For shared treasuries, prefer [multisig basics for shared funds](/guides/multisig-basics-for-shared-funds) over photocopying one seed for three people.",
        ],
      },
      {
        heading: "Passphrases: optional second factor, sharp edges",
        paragraphs: [
          "Many devices support an optional BIP39 passphrase (sometimes marketed as a “25th word”). Each passphrase derives a different wallet from the same seed. An attacker who finds your seed words but not the passphrase cannot spend the hidden wallet—unless you used a weak passphrase or stored it beside the seed.",
          "Passphrases are unforgiving: a typo creates a valid empty wallet. There is no reset email. If you use one, document it with the same seriousness as the seed, and practice unlocking the intended account before funding it. Consider whether a simpler seed + strong physical security is enough for your threat model.",
          "Do not confuse device PIN with passphrase. The PIN unlocks the device; the passphrase selects the wallet. Brute-force protections on PINs do not save you from a forgotten passphrase.",
        ],
      },
      {
        heading: "Day-to-day use without undoing the benefits",
        paragraphs: [
          "Verify every destination address and amount on the hardware screen. If a dapp asks you to blind-sign opaque data, stop. Prefer wallets and connectors that show clear asset movements. Keep firmware updated from official vendor tools only.",
          "Use separate accounts/addresses for long-term holdings versus DeFi experiments. A compartmentalized [[hot wallet]] for farm approvals limits blast radius if an [[allowance]] goes wrong—then [[revoke]] regularly.",
          "When moving funds off a [[CEX]], follow [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist). The hardware wallet is the destination; the checklist is the process. Skipping either reintroduces avoidable loss modes.",
        ],
      },
      {
        heading: "Threat models and honest limits",
        paragraphs: [
          "Hardware wallets help against remote malware and casual theft. They help less against $5 wrench attacks, sophisticated supply-chain compromise, or you approving a malicious spend. Diversify storage, avoid advertising balances, and size online positions modestly.",
          "If you lose the device but have seed (and passphrase if used), you can recover on a replacement. If you lose seed and device, funds are gone. If an attacker gets seed and passphrase, funds are gone. Design backups so no single burglary yields both seed and passphrase.",
          "Setup done right is boring: official device, verified seed, optional passphrase only if you accept the sharpness, tiny test receive, then real funds. That boredom is the product working.",
        ],
      },
    ],
  },
  {
    slug: "crypto-debit-cards-cashback-math",
    title: "Crypto Debit Cards: Cashback Math That Survives Fees",
    description:
      "Model real returns on crypto cards—FX fees, spreads, staking locks, and tax lots—so cashback percentages stop misleading you.",
    publishedAt: "2026-05-07",
    readingMinutes: 4,
    sections: [
      {
        heading: "What these cards actually are",
        paragraphs: [
          "Crypto debit cards typically spend from a custodial balance of fiat or [[stablecoin]]s, sometimes with automatic crypto conversion at payment time. Cashback may arrive as exchange credits, native platform tokens, or fiat rebates. You are usually still inside a [[CEX]] or fintech [[custody]] model—not [[self-custody]]—while the card network settles with merchants.",
          "That can be useful for everyday spending without a separate bank wire each time. It can also concentrate KYC’d balances on a platform subject to freezes, geographic restrictions, and changing reward schedules. Read the live terms; marketing pages lag product managers.",
          "GetFreeBit treats cards under exchange and Web3 onboarding: convenient rails, not yield magic. Compare them to simply using a normal debit card and buying crypto on a schedule via [[DCA]]—see [DCA bitcoin practically](/guides/dca-bitcoin-practically)—if your only goal is accumulation.",
        ],
      },
      {
        heading: "Build a one-month spreadsheet",
        paragraphs: [
          "List: cashback percent by category, monthly caps, crypto-to-fiat spread when you spend, FX fees abroad, ATM fees, staking or tier requirements, and token reward vesting. Example: 3% cashback in a volatile platform token with a 10% spread on spend and a $50 monthly cap is not 3% in economic reality.",
          "Suppose you spend $2,000/month. At a headline 2% in USDC, gross rebate is $40. If conversion spread costs 0.5% on the same $2,000 ($10) and foreign FX adds another $8 on travel spend, net may be ~$22 before tax complexity. Caps and excluded merchants can erase the rest.",
          "If rewards pay in a platform token, mark-to-market the token the day you receive it and again when you sell. “3% in TOKEN” with TOKEN down 40% after unlock is negative real cashback. Prefer stable rebates unless you independently want TOKEN exposure.",
        ],
      },
      {
        heading: "Tier locks, staking, and opportunity cost",
        paragraphs: [
          "Higher cashback tiers often require locking platform tokens or keeping large balances. Lockups add price risk and [[withdrawal lock]] constraints. Compare the extra 1% cashback against what that locked capital could earn in [stablecoin yield: what you’re actually paid for](/guides/stablecoin-yield-what-youre-actually-paid-for) or simple indexed investing outside crypto.",
          "Example: locking $5,000 of TOKEN to upgrade from 1% to 3% cashback on $1,000 monthly spend nets +$20/month before TOKEN volatility. A 20% TOKEN drawdown costs $1,000—dozens of months of “upgrade.” Only lock what you would hold anyway.",
          "Watch subscription fees for metal cards. A $10–$30 monthly fee needs substantial qualified spend to break even. Idle premium cards are a lifestyle purchase, not an arbitrage.",
        ],
      },
      {
        heading: "Operational and compliance details",
        paragraphs: [
          "Card issuance still sits on [[KYC]]. Chargebacks, merchant category codes, and regional blocks apply. Keep the card’s funding account secured like any [[CEX]] balance—TOTP, allowlists where relevant—per [first CEX account: KYC, 2FA, and withdrawals](/guides/first-cex-account-kyc-2fa-withdrawals).",
          "Spending crypto can be a taxable disposal in many countries even when you “just bought coffee.” Track lots. [Crypto records for taxes without panic](/guides/crypto-records-for-taxes-without-panic) matters more once card volume rises.",
          "Risk callout: screenshot APYs and forever-2% banners change. Recalculate quarterly. If the card becomes the reason you keep large balances on an exchange, revisit [[self-custody]] for the surplus.",
        ],
      },
      {
        heading: "When a crypto card is worth it",
        paragraphs: [
          "Good fit: you already use the platform, rewards are in fiat or quality stables, fees are low in your region, and you spend enough to clear any fee without chasing categories artificially. Poor fit: you open five cards for sign-up bonuses you will not use, or you stake volatile tokens solely for a cashback tier.",
          "Net cashback after spreads, caps, and lock risk should beat your next-best everyday card by a margin that justifies custody concentration. If it does not, skip the plastic.",
          "Cashback math is deliberately unromantic. Run the numbers once, save the sheet, and update when terms change—then spend your attention on security and allocation instead of reward theater.",
        ],
      },
    ],
  },
  {
    slug: "reading-etherscan-like-an-operator",
    title: "Reading Etherscan Like an Operator",
    description:
      "Use a block explorer to verify contracts, trace transfers, decode approvals, and catch red flags before you sign or bridge.",
    publishedAt: "2026-05-21",
    readingMinutes: 4,
    sections: [
      {
        heading: "The explorer is your ground truth",
        paragraphs: [
          "A [[block explorer]] indexes chain data so you can inspect transactions, internal calls, token transfers, and contract code. Etherscan-style UIs exist for many networks; the habits transfer. Wallet UIs can lag or be spoofed; the explorer entry for a tx hash is what settled.",
          "Operators open the explorer before bridging, after every test withdrawal, and whenever a dapp asks for an unusual [[approval]]. Combined with [DEX swaps: slippage, MEV, and approvals](/guides/dex-swaps-slippage-mev-and-approvals), explorer literacy prevents a large class of unforced errors.",
          "Bookmarks should point to official explorer domains. Phishing clones exist. Verify SSL and URL carefully—same discipline as exchange logins.",
        ],
      },
      {
        heading: "Address pages: holdings, tags, and creation",
        paragraphs: [
          "On an address page, review ETH balance, token holdings, and recent txs. Contract addresses differ from [[EOA]]s; know which you are dealing with. Label your own addresses in a private notes file so you recognize them quickly.",
          "Token holders tabs and “similar contracts” hints can reveal freshly cloned scams. For any new asset, paste the [[token contract]] from a trusted source—not from a random Telegram screenshot—then confirm the name and decimals on the explorer match expectations.",
          "Age and funding source matter for counterparty checks. A contract deployed minutes ago asking for unlimited [[allowance]] is a different risk than a battle-tested venue. Pair with [spotting honeypots and rug pulls](/guides/spotting-honeypots-and-rug-pulls).",
        ],
      },
      {
        heading: "Transaction pages: what actually moved",
        paragraphs: [
          "A transaction page shows status, [[gas]] used, from/to, and often token transfers. Complex DeFi actions may include internal transactions—expand them. Confirm the assets leaving your address match what the wallet [[simulation]] promised.",
          "Failed txs still cost gas. Read the error if present. For stuck pending txs, note the [[nonce]] and whether you need a replacement with a higher tip under [[EIP-1559]] fee markets.",
          "When bridging, keep both source and destination explorer tabs open. Match amounts, minus fees, across chains. [Bridging without losing funds](/guides/bridging-without-losing-funds) depends on this dual-check habit.",
        ],
      },
      {
        heading: "Contracts, approvals, and read/write tabs",
        paragraphs: [
          "Verified source code is a positive signal, not a guarantee of safety. Unverified contracts demand extra skepticism. Read proxy patterns: implementation addresses can change if upgradeable—inspect admin events when relevant.",
          "On your address, review approved spenders. Unlimited allowances to forgotten routers are drain inventory. [[Revoke]] what you do not use. Prefer exact allowances when a dapp allows it.",
          "Risk callout: fake “support” agents may send you explorer links to unrelated txs claiming a refund is ready—then ask you to sign a counter-tx. Independently navigate to your address page; do not trust DMs.",
        ],
      },
      {
        heading: "Operator drills to practice",
        paragraphs: [
          "Drill 1: find your last [[CEX withdrawal]] on the explorer and verify destination. Drill 2: look up a popular [[DEX]] router contract and identify it in an approval list. Drill 3: decode a swap’s token transfers without looking at the wallet UI summary.",
          "Drill 4: given a suspicious token, check liquidity locks (where shown), holder concentration, and whether you can find a sell path. Drill 5: compare a transaction’s gas price to current conditions so you recognize anomalies.",
          "When explorer reading feels automatic, you will catch wrong-network deposits, approval scams, and bridge mismatches earlier—usually before they become irreversible stories.",
        ],
      },
    ],
  },
  {
    slug: "bridging-without-losing-funds",
    title: "Bridging Without Losing Funds",
    description:
      "Choose bridges deliberately, verify chain IDs and contracts, and use test amounts so cross-chain moves do not become permanent losses.",
    publishedAt: "2026-06-11",
    readingMinutes: 4,
    sections: [
      {
        heading: "Bridges move risk as well as assets",
        paragraphs: [
          "A [[bridge]] locks or burns assets on one chain and mints or releases representation on another—or uses liquidity networks to swap representations. Design differences matter: a [[canonical bridge]] to an [[optimistic rollup]] may impose multi-day withdrawals; a third-party bridge may be faster with added smart-contract and liquidity risk.",
          "Most retail losses are operational: wrong destination network, wrong asset selected, spoofed UI, or impatient duplicate sends. Protocol hacks also happen—size transfers as if the bridge contract can fail, especially for exotic routes.",
          "Before moving size, understand fee regimes on the destination via [layer 2 fees, blobs, and when to bridge](/guides/layer-2-fees-blobs-and-when-to-bridge). Bridging to save gas only works if you will actually use the [[L2]].",
        ],
      },
      {
        heading: "Canonical vs third-party routes",
        paragraphs: [
          "Canonical bridges are usually documented by the L2 team. They prioritize security assumptions of the rollup. Withdrawals to L1 on optimistic systems often wait out a challenge window—plan capital around that delay instead of using unsafe “instant exit” shortcuts you do not understand.",
          "Third-party bridges and intent-based routers can improve UX with competing solvers. You inherit their contracts, operators, and downtime. Prefer routes with clear documentation, battle history, and recoverable support paths. Avoid Discord characters offering “manual bridge assistance.”",
          "[[ZK rollup]] withdrawal UX differs from optimistic designs; read the specific chain’s docs rather than generalizing from one L2 experience. Confirm [[chain ID]] in your wallet every time you switch networks.",
        ],
      },
      {
        heading: "The pre-flight and test amount process",
        paragraphs: [
          "Pre-flight: destination wallet supports the asset; you are on the correct network; you pasted the address from a verified source; you understand whether you receive a canonical token or a wrapped representation. Check the [[token contract]] on the destination explorer after arrival.",
          "Send a [[test amount]] first—especially the first time you use a route. Confirm receipt on the destination [[block explorer]] before the main transfer. This mirrors [self-custody withdrawal checklist](/guides/self-custody-withdrawal-checklist) discipline applied cross-chain.",
          "Keep both explorers open and save tx hashes. If a transfer is slow, wait recommended finality times; do not immediately retry with a different bridge unless the first tx failed conclusively.",
        ],
      },
      {
        heading: "Common failure modes",
        paragraphs: [
          "Gas on the destination: arriving on an L2 without native gas token leaves you unable to move funds. Bridge a little gas asset first or use documented faucet-less onboarding options carefully.",
          "Wrapped asset confusion: “USDC” brands can map to different contracts (native vs bridged). DEX liquidity may exist for one and not the other. Verify before you need to swap out in a hurry—[reading Etherscan like an operator](/guides/reading-etherscan-like-an-operator) helps.",
          "Risk callout: phishing front-ends clone popular bridges. Bookmark official links, prefer wallet-verified URLs, and run [[simulation]] before signing. If the UI asks for seed import, it is not a bridge—it is theft.",
        ],
      },
      {
        heading: "A practical bridging policy",
        paragraphs: [
          "Default to canonical bridges for large, infrequent moves. Use reputable third-party routes for small, time-sensitive amounts you can afford to lose to contract risk. Never bridge your entire net worth in one shot.",
          "Maintain a personal allowlist of routes you have tested. New chains and new bridges start at near-zero trust until you complete a round-trip test with dust amounts.",
          "Bridging without losing funds is mostly patience and verification. The chain will not pity a hurried paste—operators build rituals so hurry never gets a vote.",
        ],
      },
    ],
  },
  {
    slug: "dex-swaps-slippage-mev-and-approvals",
    title: "DEX Swaps: Slippage, MEV, and Approvals",
    description:
      "Execute decentralized swaps with deliberate slippage, MEV awareness, and tight token approvals so a routine trade does not become a drain.",
    publishedAt: "2026-07-16",
    readingMinutes: 4,
    sections: [
      {
        heading: "What a DEX swap really does",
        paragraphs: [
          "A [[DEX]] swap routes your tokens through [[AMM]] pools or aggregators. You pay pool fees, possibly multiple hops, and network [[gas]]. Price impact grows when your trade is large relative to pool liquidity. Quote screens assume a path; the chain executes whatever your signed calldata allows within deadline and [[slippage]] bounds.",
          "Unlike a [[CEX]] [[spot]] order book, you co-exist with public [[mempool]] observers. That environment enables [[MEV]] strategies—including sandwiches—especially on chains without private orderflow protections.",
          "Educational baseline: verify the [[token contract]], understand approvals, set slippage consciously, and read [[simulation]] output. For scam tokens, stop before the swap—use [spotting honeypots and rug pulls](/guides/spotting-honeypots-and-rug-pulls).",
        ],
      },
      {
        heading: "Slippage settings with examples",
        paragraphs: [
          "[[Slippage]] tolerance is the worst acceptable execution versus quote. Stable-to-stable on deep pools might use 0.05%–0.1%. Volatile majors might need 0.5%–1% in choppy moments. Illiquid pairs may demand more—but high tolerance also gives sandwich bots room to move the price against you.",
          "Example: swapping $5,000 of ETH to USDC on a deep pool with 0.5% tolerance should rarely fill near the edge. The same 3% tolerance on a thin alt pair can legally execute at a disastrous price while still “succeeding.” If a swap only works with extreme slippage, that is information—often a [[honeypot]] or empty pool.",
          "Deadline settings matter too. Very long deadlines leave signatures valid while markets move. Use defaults from reputable UIs unless you know why you are changing them.",
        ],
      },
      {
        heading: "MEV awareness without superstition",
        paragraphs: [
          "Sandwiches buy ahead of you and sell into your slippage. Mitigations include tighter slippage, avoiding peak mempool chaos, using private RPC/orderflow when available from trusted providers, and breaking huge trades into smaller clips across time—trading off extra gas.",
          "Aggregators may route through quirky intermediate tokens. Check the route preview. Unusual intermediates increase token risk and approval surface. Prefer transparent routes for size.",
          "On some [[L2]]s, MEV dynamics differ from mainnet Ethereum. Still verify quotes and avoid broadcasting huge illiquid swaps casually. Fee context sits in [layer 2 fees, blobs, and when to bridge](/guides/layer-2-fees-blobs-and-when-to-bridge).",
        ],
      },
      {
        heading: "Approvals: the lingering permission",
        paragraphs: [
          "Most ERC-20 swaps require an [[approval]] so the router can pull tokens. Unlimited allowances are convenient and dangerous—any exploit or malicious upgrade in the spender can drain the allowance. Prefer exact or slightly buffered allowances; [[revoke]] when done farming.",
          "Malicious sites request approvals unrelated to the swap amount—or request ETH signatures that set operators. Read the wallet [[simulation]]. If it shows unexpected spenders or setApprovalForAll on NFTs you did not intend, reject.",
          "Track allowances periodically via explorer tools as in [reading Etherscan like an operator](/guides/reading-etherscan-like-an-operator). Combine with [RPC phishing and transaction simulation](/guides/rpc-phishing-and-transaction-simulation) so your RPC and UI are not lying about state.",
        ],
      },
      {
        heading: "A clean swap runbook",
        paragraphs: [
          "1) Verify token contracts. 2) Confirm network and gas balances. 3) Set slippage appropriate to liquidity. 4) Approve minimal allowance. 5) Simulate. 6) Swap. 7) Verify transfers on the explorer. 8) Revoke if you will not reuse the venue soon.",
          "If you provide liquidity later, remember inventory risk covered in [impermanent loss with real numbers](/guides/impermanent-loss-with-real-numbers). Swapping into a pool token is not the same as holding the underlying assets.",
          "DEX trading is empowering when treated like industrial equipment: powerful, indifferent, and unforgiving of skipped checklists. The runbook is the edge most individuals can actually control.",
        ],
      },
    ],
  },
];
