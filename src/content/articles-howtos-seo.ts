import type { Article } from "./types";

/**
 * Pillar SEO how-tos — procedural content for faucets, airdrops, yield, exchange onboarding.
 */
export const HOWTOS_SEO: Article[] = [
  {
    kind: "howto",
    slug: "how-to-set-up-faucetpay-and-route-faucet-payouts",
    title: "How to Set Up FaucetPay and Route Faucet Payouts",
    description:
      "Create a FaucetPay micro-wallet, secure it with 2FA, connect US faucet sites, and sweep aggregated balances to self-custody without losing dust to fees.",
    publishedAt: "2026-08-12",
    readingMinutes: 6,
    sections: [
      {
        heading: "Create and secure the account",
        paragraphs: [
          "1. Visit FaucetPay from our [Faucet referral desk](/faucets)—bookmark the official domain; phishing clones are common in micro-earning niches. Register with a unique email and strong password not reused on exchanges.",
          "2. Enable two-factor authentication immediately (authenticator app preferred over SMS). FaucetPay is custodial: treat it like a hot checking account, not a vault. Background: [How FaucetPay Routing Works for Micro-Earnings](/guides/how-faucetpay-routing-works-for-micro-earnings).",
          "3. Copy your deposit addresses per coin from the dashboard. You will paste these into external faucets as payout destinations. Double-check asset type—BTC address for BTC drips, not a random alt field.",
        ],
      },
      {
        heading: "Connect US faucet platforms",
        paragraphs: [
          "4. Open each platform you plan to use from the [US faucet desk](/faucets) (Cointiply, CoinPayU, Fire Faucet, etc.). In payout settings, choose FaucetPay and paste the matching address or linked email per their UI.",
          "5. Run a **test claim** on one site; confirm credit inside FaucetPay before scaling routine. If credit fails, verify you selected the correct coin and that the external site shows FaucetPay as an allowed rail.",
          "6. Avoid entering your [[seed phrase]] anywhere during setup—legitimate faucets never need self-custody keys for payouts. Scam patterns: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Daily routine and sweeps",
        paragraphs: [
          "7. Schedule claims you can sustain—see [Evaluating Crypto Faucets: Time vs Reward](/guides/evaluating-crypto-faucets-time-vs-reward). Batch attention twice daily instead of hourly distraction unless ROI proves out.",
          "8. When internal balance justifies it, withdraw to a [[self-custody]] [[hot wallet]] you control—[How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet). Send a [[test amount]] first: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "9. Move meaningful sums to [[cold storage]] on a calendar (weekly/monthly). Micro-wallets are for routing, not life savings.",
        ],
      },
      {
        heading: "Referrals and disclosure",
        paragraphs: [
          "10. If you promote FaucetPay, use your referral link from the dashboard once added to our [desk config](/faucets). Disclose commissions per [GetFreeBit policy](/about)—never promise guaranteed income.",
          "11. Log withdrawals with dates and amounts for tax records—micro-income may still matter—[How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "12. If the account is compromised, rotate passwords, revoke sessions, and pause external faucet links until you understand the breach. Custodial risk is platform risk—size exposure accordingly.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-run-a-daily-crypto-faucet-routine-in-the-us",
    title: "How to Run a Daily Crypto Faucet Routine in the US",
    description:
      "A repeatable US-friendly schedule—FaucetPay routing, timer discipline, offerwall hygiene, and exit checks—without multi-account Sybil traps.",
    publishedAt: "2026-08-14",
    readingMinutes: 6,
    sections: [
      {
        heading: "Design the routine before you click",
        paragraphs: [
          "1. Pick 3–5 platforms from our [Faucet referral desk](/faucets) that passed your [time-vs-reward](/guides/evaluating-crypto-faucets-time-vs-reward) scorecard. Prefer sites with FaucetPay rails to avoid per-site dust traps.",
          "2. Block two fixed windows per day (for example morning and evening) instead of hourly notification chasing. Set a **30-minute cap** per window so micro-earning does not become an unpaid second job.",
          "3. Use one browser profile dedicated to earning; disable unnecessary extensions except when a site requires turning off ad blockers for PTC—then re-enable after.",
        ],
      },
      {
        heading: "Execution checklist per session",
        paragraphs: [
          "4. Log in via bookmarked URLs only—never sponsored search results. Complete hourly/daily faucet claims first (lowest friction), then one offerwall task if time remains and payout history is good.",
          "5. Skip tasks that require installing unknown APKs, sideloaded certs, or sharing SMS codes. US offerwalls sometimes disqualify mid-survey; abandon gracefully rather than arguing with support bots.",
          "6. Note pending vs credited balances. Offerwall reversals are normal—do not count pending coins in your ROI spreadsheet.",
        ],
      },
      {
        heading: "Weekly hygiene",
        paragraphs: [
          "7. Confirm FaucetPay (or direct) credits match external dashboards. Investigate missing payouts before adding new sites.",
          "8. Sweep aggregated balances to self-custody when above your personal threshold; pay attention to [[gas]] if exiting to L1—[What Gas Fees Are and Why They Change](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion).",
          "9. Review whether hourly USD still beats minimum wage at your actual logged time—stop or shrink the stack if not.",
        ],
      },
      {
        heading: "Rules that keep US accounts safe",
        paragraphs: [
          "10. **One person, one account per platform**—multi-accounting violates terms and triggers Sybil-style bans. VPN hopping to fake geography is not a durable US strategy.",
          "11. Never reuse your main [[seed phrase]] on faucet login forms; custodial sites use email/password, not BIP-39 seeds.",
          "12. Disclose referral links if you publish routines publicly. Honest education outperforms hype for long-term SEO and trust.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-farm-testnets-for-potential-airdrops-safely",
    title: "How to Farm Testnets for Potential Airdrops Safely",
    description:
      "Use an isolated burn wallet, official faucets, documented txs, and Sybil-aware behavior when pursuing testnet-based allocation rumors.",
    publishedAt: "2026-08-16",
    readingMinutes: 6,
    sections: [
      {
        heading: "Wallet and environment setup",
        paragraphs: [
          "1. Create a **burn wallet** separate from savings—[Testnet Farming Without Contaminating Your Main Wallet](/guides/testnet-farming-without-contaminating-your-main-wallet). Never import your main [[seed phrase]] into testnet tooling.",
          "2. Install the wallet’s testnet network from official docs; verify [[chain ID]] before any transaction. Wrong-network sends on mainnet are irreversible—[How to Send and Receive Crypto](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "3. Fund gas from the protocol’s official faucet link only. Ignore Discord “send mainnet ETH for test tokens” messages.",
        ],
      },
      {
        heading: "Protocol interaction sequence",
        paragraphs: [
          "4. Pick one thesis protocol per month—bridge, swap, lend, vote—so activity looks organic. Read [Airdrop Eligibility: What Protocols Actually Measure](/guides/airdrop-eligibility-what-protocols-actually-measure).",
          "5. Execute core flows end-to-end: deploy or mint test asset, swap on official UI, optionally provide small test liquidity, submit one governance vote if available. Save txids in a spreadsheet with dates.",
          "6. Repeat lightly across weeks—not fifty txs in one hour. Sybil clustering algorithms flag synchronized bursts.",
        ],
      },
      {
        heading: "Mainnet bridge when required",
        paragraphs: [
          "7. Some campaigns require a mainnet registration tx or snapshot of a funded wallet. Use minimal size and a dedicated address—never your cold storage.",
          "8. If bridging test assets, triple-check you are on testnet contracts—[How to Transfer Tokens Across Blockchains](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge) for mainnet bridge discipline applies when you touch real value.",
          "9. Track cumulative gas spend in USD; halt if spend exceeds your speculative budget for uncertain allocation.",
        ],
      },
      {
        heading: "Claim phase discipline",
        paragraphs: [
          "10. When (if) a claim opens, verify the claim site URL from official Twitter/docs, simulate the transaction, and reject unlimited [[approval]]s—[How to Connect a Wallet to dApps Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
          "11. US persons: confirm legal eligibility before KYC claim portals—some tokens restrict jurisdictions.",
          "12. Rotate or retire burn wallets after suspicious signatures. Farming is optional; key safety is not.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-track-airdrop-eligibility-with-on-chain-tools",
    title: "How to Track Airdrop Eligibility with On-Chain Tools",
    description:
      "Use explorers, Dune dashboards, and wallet labels to audit your farming history, spot gaps, and avoid fake eligibility checkers.",
    publishedAt: "2026-08-18",
    readingMinutes: 6,
    sections: [
      {
        heading: "Start from primary sources",
        paragraphs: [
          "1. Official project docs beat rumor tweets. Note snapshot dates, contract addresses, and eligible chains before you trust third-party “checker” sites—many are [[phishing]].",
          "2. Open your burn/farm wallet in a [[block explorer]] for each chain you used—[How to Read a Blockchain Explorer](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "3. Export or bookmark txs that match required actions (swap, LP deposit, bridge, vote). You are building evidence, not vibes.",
        ],
      },
      {
        heading: "Dune and analytics dashboards",
        paragraphs: [
          "4. Search Dune for the protocol name plus “eligibility” or “snapshot”—use dashboards with cited SQL, not anonymous reposts. Cross-check wallet counts and criteria against official posts.",
          "5. Compare your wallet’s activity timestamps to rumored snapshot blocks. Missing interactions (for example no bridge tx before cutoff) are cheaper to learn pre-announcement than post-denial.",
          "6. Extend skills from [How to Analyze On-Chain Wallet Data](/how-to/how-to-analyze-on-chain-wallet-data-and-metrics-using-tools-like-dune-or-etherscan)—read-only analysis never requires your [[seed phrase]].",
        ],
      },
      {
        heading: "Sybil and privacy hygiene",
        paragraphs: [
          "7. Avoid uploading private keys to “batch checkers.” Legitimate tools query public addresses only.",
          "8. If you used multiple wallets, assess whether clustering might link them—see [Sybil attacks guide](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are). Sometimes consolidating narrative to one clean wallet beats ten mediocre ones **before** snapshot—project-dependent, never guaranteed.",
          "9. Label addresses in your spreadsheet (TESTNET, MAIN BURN, COLD)—mislabeling causes false strategy conclusions.",
        ],
      },
      {
        heading: "Turn gaps into a plan",
        paragraphs: [
          "10. List missing criteria (volume, holding period, governance vote). Estimate gas to complete genuinely—not spam.",
          "11. Set a stop-loss on further gas if criteria costs exceed plausible allocation value at conservative FDV assumptions.",
          "12. When claim time arrives, verify claim contract on explorer, use simulation, and document claim txid for taxes—[How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-compare-staking-and-savings-apy-without-chasing-headlines",
    title: "How to Compare Staking and Savings APY Without Chasing Headlines",
    description:
      "Normalize APY vs APR, strip reward-token emissions, and score lockups, smart-contract, and depeg risk before you deposit for yield.",
    publishedAt: "2026-08-20",
    readingMinutes: 6,
    sections: [
      {
        heading: "Decode the headline number",
        paragraphs: [
          "1. Ask whether the rate is [[APY]] (compounded) or [[APR]] (simple). A 20% APR quoted as APY marketing is smaller than it sounds—definitions in our glossary and [Staking Yield guide](/guides/what-crypto-staking-is-and-how-yield-is-generated).",
          "2. Identify **denomination**: are rewards paid in the same asset you stake, a governance token, or points? Token-denominated yield inherits token volatility—down 50% price wipes a 15% APY quickly.",
          "3. Check whether displayed yield includes auto-compounding loops you must manually enable—static screenshots lie.",
        ],
      },
      {
        heading: "Risk-adjust mentally",
        paragraphs: [
          "4. Native stake: operator/slashing, lockups, liquidity delay. LSD: add smart-contract + depeg risk—[Liquid Staking vs Native Staking](/guides/liquid-staking-vs-native-staking-trade-offs-for-earners). Lending: [[liquidation]] if collateralized—[How to Deposit into DeFi Lending](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest).",
          "5. LP “yield” subtract [impermanent loss](/guides/impermanent-loss-explained-for-liquidity-providers) mentally for volatile pairs. Stablecoin yield often pays credit/peg risk—[Stablecoin Peg guide](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies).",
          "6. Centralized savings on [[CEX]]: counterparty risk + freeze risk; not on-chain transparency.",
        ],
      },
      {
        heading: "Build a comparison table",
        paragraphs: [
          "7. Columns: product, gross APY, lock/unbond days, slash/IL/credit risk, exit path, tax notes. Fill with **live dashboard** numbers, not blog screenshots.",
          "8. Stress-test: “If asset −30% and I need cash tomorrow, what do I lose?” [[Withdrawal lock]]s turn paper yield into trapping.",
          "9. Prefer two boring options over five exotic farms—you cannot monitor everything.",
        ],
      },
      {
        heading: "Execution and monitoring",
        paragraphs: [
          "10. Start with size you can lose entirely on smart-contract products. Use dedicated wallets—[Connect dApps Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
          "11. Calendar monthly reviews: did APY drop, did emissions change, any governance upgrade? Revoke stale approvals when exiting.",
          "12. Never stake or lend based on Telegram APY pics. Compare, disclose partner links if applicable, and accept that real yield is usually lower than headlines after risk.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-enable-2fa-and-withdrawal-allowlists-on-a-centralized-exchange",
    title: "How to Enable 2FA and Withdrawal Allowlists on a Centralized Exchange",
    description:
      "Harden a Tier-1 CEX account with authenticator 2FA, anti-phishing codes, withdrawal allowlists, and a first self-custody test withdrawal.",
    publishedAt: "2026-08-22",
    readingMinutes: 6,
    sections: [
      {
        heading: "Baseline account hygiene",
        paragraphs: [
          "1. Open your exchange via bookmarked URL after [How to Buy Crypto on a Centralized Exchange](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency)—never from email or Discord ads.",
          "2. Use a unique strong password stored in a password manager. Complete [[KYC]] accurately; mismatched names delay fiat and crypto withdrawals later.",
          "3. Enable email login alerts if offered. Review active sessions and revoke unknown devices.",
        ],
      },
      {
        heading: "Two-factor authentication",
        paragraphs: [
          "4. Prefer **authenticator app** (TOTP) over SMS—SIM-swap risk is real in crypto. Save backup codes offline on paper, not in cloud notes synced everywhere.",
          "5. Add an **anti-phishing phrase** if the exchange supports it—helps spot fake login pages in emails.",
          "6. Never give 2FA codes to “support” in chat. Real support does not ask for TOTP live codes or your [[seed phrase]].",
        ],
      },
      {
        heading: "Withdrawal allowlists and address books",
        paragraphs: [
          "7. Enable withdrawal **allowlist / whitelist** mode if available—new addresses require a timelock or email confirmation. This slows attackers even if password leaks.",
          "8. Pre-add your self-custody receive address after verifying it on a [[block explorer]]—[Create Your First Self-Custody Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet).",
          "9. For first withdrawal, send a [[test amount]], wait for confirmations, then send remainder—[Send and Receive Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
        ],
      },
      {
        heading: "Ongoing operator habits",
        paragraphs: [
          "10. Separate exchange login browser profile from faucet or DeFi experimentation to reduce cookie-stealer blast radius.",
          "11. Export trade history periodically for taxes—[How to Calculate Capital Gains](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "12. If you rotate phones, migrate authenticator seeds carefully before wiping old devices. Losing 2FA without backup codes locks you into painful recovery flows—prepare before upgrades.",
        ],
      },
    ],
  },
];
