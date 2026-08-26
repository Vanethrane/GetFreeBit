import type { Article } from "./types";

export const HOWTOS: Article[] = [
  {
    kind: "howto",
    slug: "how-to-create-your-first-self-custody-crypto-wallet",
    title: "Create a self-custody wallet",
    description:
      "Install a reputable browser or mobile wallet, create a new seed phrase offline from strangers, fund with a test amount, and verify your address on a block explorer before treating it as home base.",
    publishedAt: "2026-07-02",
    readingMinutes: 5,
    sections: [
      {
        heading: "Choose the right wallet type before you install anything",
        paragraphs: [
          "1. Decide what this wallet is for. A first [[self-custody]] wallet for learning swaps and small holds is different from a long-term vault. Most beginners start with a [[browser wallet]] or mobile [[hot wallet]] for daily use, then graduate larger balances to a [[hardware wallet]] later—see [How to Set Up a Hardware Wallet for Maximum Cold-Storage Security](/how-to/how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security). Do not download “wallet apps” from search ads or Telegram links; those are a primary [[phishing]] channel. Background on custody models: [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage).",
          "2. Pick software with a clear open-source or audited track record and official download paths only (vendor site or official store listing you verify by publisher name). Note which networks it supports—Ethereum and common [[L2]]s, Bitcoin [[UTXO]] wallets, Solana, and so on. Wrong-network assumptions cause later send mistakes. Prefer wallets that show transaction [[simulation]] before you sign, and that make network switching explicit rather than silent.",
          "3. Prepare a clean device session. Update your OS, close unnecessary extensions, and avoid creating a wallet on a shared or workplace machine. If you already suspect malware, stop and use a different device. Risk: a keylogger present at creation can steal your [[seed phrase]] the moment it appears on screen. Key concepts: [What Public and Private Keys Are in Digital Cryptography](/guides/what-public-and-private-keys-are-in-digital-cryptography).",
        ],
      },
      {
        heading: "Create the wallet and secure the seed phrase",
        paragraphs: [
          "4. Install only from the official source, open the app, and choose Create new wallet—not “import” unless you already have a phrase. The wallet will display a 12- or 24-word [[seed phrase]]. Write it by hand on paper (or stamped metal for larger sums). Never screenshot it, never store it in email, cloud notes, password managers synced to the cloud, or chat apps.",
          "5. Confirm the phrase in the app’s quiz screens carefully. Then store the paper offline following [How to Safely Store and Back Up Your Seed Phrase](/how-to/how-to-safely-store-and-back-up-your-seed-phrase). Anyone with those words has full control—no support desk can reverse a drain. GetFreeBit’s rule: the phrase never leaves offline media you control.",
          "6. Set a strong app password or biometrics for local unlock. That password encrypts keys on the device; it is not a recovery method. If you lose the device but keep the seed, you can restore elsewhere. If you lose both, funds are gone. Enable any optional transaction warnings the wallet offers for unlimited [[approval]]s and unknown contracts.",
        ],
      },
      {
        heading: "Fund carefully and verify you control the address",
        paragraphs: [
          "7. Copy your [[public address]] from the receive screen. Cross-check the first and last characters after paste. Send a small [[test amount]] from a [[CEX]] or another wallet you already trust, matching the correct network and any required [[memo]] if the destination were an exchange (your self-custody address usually has no memo). Fiat-to-crypto on-ramps are covered in [How to Buy Crypto on a Centralized Exchange Using Fiat Currency](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency).",
          "8. Confirm the credit on a [[block explorer]] for that chain. Bookmark the explorer result. This proves you control the address and that you can read pending vs confirmed status—skills expanded in [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "9. Only after the test arrives, send larger amounts. Keep a written inventory: wallet name, networks used, approximate balances, and where the seed backup lives (not the words themselves in the same note). Pair ongoing withdrawals with careful send habits from [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "10. Separate roles early. Use this wallet for learning; create a second burn wallet for experimental [[dApp]] connections later via [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely). Never type your seed into a website that claims to “validate,” “sync,” or “upgrade” your wallet. Legitimate wallets never ask for the phrase outside official recovery flows you initiate offline. Risk: fake recovery pages are among the highest-loss scams—review [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams) before you browse wallet “support” results.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-safely-store-and-back-up-your-seed-phrase",
    title: "Back up your seed phrase",
    description:
      "Back up a 12- or 24-word seed with offline redundancy, verify restores on a throwaway device, and avoid the digital and social failure modes that empty wallets.",
    publishedAt: "2026-07-05",
    readingMinutes: 5,
    sections: [
      {
        heading: "Treat the seed as cash, not as a password",
        paragraphs: [
          "1. Understand what you are protecting. A [[seed phrase]] regenerates every [[private key]] in the wallet. There is no “forgot password” with [[self-custody]]. If someone copies the words, they can wait months and drain you when you are offline. If you lose every copy, you lose the funds. Backup design is about surviving fire, theft, and your own forgetfulness—without creating easy-to-steal digital copies. Cryptography context: [What Public and Private Keys Are in Digital Cryptography](/guides/what-public-and-private-keys-are-in-digital-cryptography).",
          "2. Immediately after wallet creation, confirm you wrote the words in order with correct spelling. BIP-39 wordlists are fixed; a single wrong word can make restore fail or, rarely, open a different empty wallet that fools you into thinking you backed up correctly. Number the lines 1–12 or 1–24.",
          "3. Risk: Never photograph the phrase, never paste it into Google Docs, Notion, iCloud Notes, email drafts, or “encrypted” chat. Cloud accounts get phished. Also reject any site, extension, or support agent asking you to “verify seed” online—that is [[phishing]], covered in [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Build offline redundancy without concentrating risk",
        paragraphs: [
          "4. Primary backup: ink on paper stored in a place you control (home safe, locked drawer). Use permanent ink; pencil fades. Do not label the paper “Bitcoin seed” in large letters—use a boring label only you understand, and keep a separate private map of what the label means. Prefer this workflow after creating the wallet in [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet).",
          "5. Secondary backup for meaningful balances: metal plate or stamped backup designed for seed words, stored in a second physical location (trusted relative’s safe, bank safe deposit box where legal and accessible). Geographic separation protects against single-building fire or theft. Do not store both copies in the same backpack.",
          "6. Optional passphrase (25th word) adds security if your seed paper is found, but it also creates a second secret you must back up correctly—losing the passphrase loses funds even with the 24 words. Only enable this after you understand cold-storage trade-offs in [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage) and hardware flows in [How to Set Up a Hardware Wallet for Maximum Cold-Storage Security](/how-to/how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security). Practice the full restore with passphrase on a device holding zero funds before you rely on it.",
        ],
      },
      {
        heading: "Verify restores and plan for life events",
        paragraphs: [
          "7. On a clean spare phone or freshly installed wallet app that will never hold large balances, choose Import / Restore, enter the seed (and passphrase if any), and confirm the same [[public address]] appears. Then wipe that test wallet. A backup you have never restored is an unverified hope.",
          "8. Document recovery procedure for yourself without writing the words in digital form: which metal/paper locations, which wallet software to reinstall, which networks you used, and who (if anyone) knows a sealed envelope exists—without giving them the words unless you intend shared custody via [[multisig]] instead (see [How to Set Up a Multisig Wallet for Shared Funds and DAO Treasuries](/how-to/how-to-set-up-a-multisig-wallet-for-shared-funds-and-dao-treasuries)).",
          "9. Review annually. Ink bleeds, metal moves houses, relationships change. When you move coins to [[cold storage]], re-check that the seed still restores the address holding funds. Pair seed hygiene with careful withdrawal habits in [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "10. If you ever suspect the phrase was photographed, emailed, or entered on a phishing site, treat it as burned: create a brand-new wallet on a clean device, transfer remaining funds to the new address after verifying the destination, and destroy old backups only after the move confirms. Speed matters more than pride. Risk: delaying migration after a suspected leak is how partial drains become total losses.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency",
    title: "Buy crypto with fiat",
    description:
      "Complete KYC on a reputable CEX, deposit fiat, place a spot order, withdraw a test amount to self-custody, and keep records without treating the exchange as a bank forever.",
    publishedAt: "2026-07-08",
    readingMinutes: 5,
    sections: [
      {
        heading: "Pick a venue and finish identity controls",
        paragraphs: [
          "1. Choose a regulated [[CEX]] that supports your country’s fiat rails and the assets you actually want. Prefer [[spot]] markets you understand over leveraged [[perp]] products on day one. Read fee schedules for deposits, trading, and withdrawals—not just the “zero fee” promo banner. GetFreeBit partner links, when you use them, should come from site config disclosure surfaces, not random DMs. Asset vocabulary: [Understanding Cryptocurrencies, Tokens, and Altcoins](/guides/understanding-cryptocurrencies-tokens-and-altcoins).",
          "2. Create the account with a unique password and enable app-based 2FA immediately. Store backup codes offline. Avoid SMS-only 2FA when authenticator apps are available. Complete [[KYC]] with accurate documents; mismatched names delay fiat deposits and withdrawals. Use a password manager for the exchange login only—never reuse that password elsewhere.",
          "3. Risk: Bookmark the real domain. Fake exchange login pages are common [[phishing]]. Never enter exchange passwords into links from email or Telegram “support.” Exchange staff will not ask for your 2FA codes or seed phrases (exchanges should not have your self-custody seed at all). Pattern library: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Deposit fiat and execute a spot purchase",
        paragraphs: [
          "4. Deposit fiat via the method you verified (ACH, SEPA, wire, debit). Confirm currency, minimums, and hold times. Some methods allow buys before funds fully settle but restrict withdrawals—plan liquidity accordingly. If you are buying a [[stablecoin]] first, understand peg and issuer risk via [How Stablecoins Maintain Their Peg to Fiat Currencies](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies).",
          "5. Navigate to [[spot]] trading for the pair you want (for example BTC/USD or ETH/EUR). Prefer limit orders when spreads are wide; market orders are fine for small sizes on liquid pairs. Double-check you are not on a derivatives tab. Buy only what you can afford to hold through volatility—no leverage required for a first purchase. Recurring [[DCA]] schedules are optional once fees and settlement timing are clear.",
          "6. After fill, verify the balance under Spot / Funding (naming varies). Note fees deducted. If your goal is long-term holding, do not leave large balances on the [[CEX]] indefinitely: exchange [[custody]] adds platform and freeze risk even when the brand is reputable. Create your self-custody destination before you feel pressure to withdraw in a rush—see [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet).",
        ],
      },
      {
        heading: "Withdraw to self-custody and keep records",
        paragraphs: [
          "7. Open your [[self-custody]] wallet first. Copy the receive address, select the matching network on the exchange withdrawal form, and paste carefully. Add any required [[memo]]/tag only when the destination exchange or custodial platform requires it—not for a normal personal wallet. Confirm the network name matches what your wallet expects (Ethereum vs an [[L2]], for example).",
          "8. Send a [[test amount]] first. Confirm on a [[block explorer]], then withdraw the remainder. This habit prevents total loss from wrong [[chain ID]] or truncated addresses. Full send discipline: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds). Risk: skipping the test send to “save fees” is how people lose the entire stack on a wrong-network withdrawal.",
          "9. Export CSV trade history and record date, asset, quantity, fiat spent, fees, and txids for withdrawals. Tax rules vary by jurisdiction; start organized with [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "10. Recurring buys are fine on the exchange if fees are acceptable, but schedule periodic sweeps to [[self-custody]]. Treat the CEX as an on-ramp and liquidity venue, not as your primary vault. When you later want on-chain swaps instead of CEX markets, graduate carefully with [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-send-and-receive-crypto-transactions-without-losing-funds",
    title: "Send & receive crypto",
    description:
      "Verify network, address, memo, and test amounts before every transfer; confirm inclusion on a block explorer; and recover from stuck nonces without panic signing.",
    publishedAt: "2026-07-11",
    readingMinutes: 5,
    sections: [
      {
        heading: "Receiving: make yourself hard to mis-pay",
        paragraphs: [
          "1. When someone sends you crypto, share the correct [[public address]] for the correct network. Ethereum-looking 0x addresses exist on many chains—specify “ETH on Arbitrum” or “USDC on Base,” not just “my USDC address.” If you use [[ENS]], confirm the resolver still points where you expect before publishing it widely. Wallet basics: [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage).",
          "2. Prefer QR codes generated inside your wallet for in-person receives. For remote receives, paste address into a plaintext channel and ask the sender to read back the first and last four characters. Never ask senders to “verify” by returning funds to a different address a stranger provides—that is a classic scam pattern.",
          "3. Watch your wallet and a [[block explorer]] until the transaction leaves the [[mempool]] and reaches the confirmation count you trust for that asset’s value. Small amounts may be fine at 1–3 confirmations; large amounts deserve more patience. How pending state works: [What Mempools Are and How Transactions Get Validated](/guides/what-mempools-are-and-how-transactions-get-validated).",
        ],
      },
      {
        heading: "Sending: the pre-flight checklist every time",
        paragraphs: [
          "4. Select asset and network explicitly. Sending USDT on the wrong chain to an exchange deposit address is one of the most common permanent losses. If the destination is a [[CEX]], copy the deposit address and [[memo]] from the deposit page for that exact coin and network—see [How to Buy Crypto on a Centralized Exchange Using Fiat Currency](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency) for on-ramp context.",
          "5. Paste the destination address, then compare characters against the source—not against your memory. Hardware wallets that show the address on-device should be verified on the device screen. Send a [[test amount]] first whenever the destination is new, the amount is material, or a memo is involved.",
          "6. Review [[gas fees]] before confirming. On Ethereum-style chains, ensure you hold enough native token for gas. Fee markets move with congestion—see [What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion). If a transaction stalls, do not spam identical sends; learn replacement with the same [[nonce]] in [How to Adjust Gas Fees and Priority Gas Rules Manually to Speed Up Transactions](/how-to/how-to-adjust-gas-fees-and-priority-gas-rules-manually-to-speed-up-transactions).",
          "7. Risk: Clipboard malware can swap addresses after you copy. Always re-check the address on screen (and on a hardware device if used) immediately before hitting send. If the UI suddenly shows a different address, abort. Address-poisoning lookalikes are covered in [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "After you click send",
        paragraphs: [
          "8. Save the transaction hash. Look it up on the appropriate [[block explorer]]. Pending means not yet included; failed/reverted means gas may be spent but value not transferred; success means state updated. Learn the UI in [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "9. If you sent to the wrong address you control on another wallet, you may recover by unlocking that wallet. If you sent to an irreversible wrong address or wrong chain with no recovery path, assume the funds are lost—support cannot reverse decentralized transfers. Bridges and multi-chain confusion belong in [How to Transfer Tokens Across Different Blockchains via a Cross-Chain Bridge](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge) and [What Cross-Chain Bridges Are and How They Transfer Data Between Blockchains](/guides/what-cross-chain-bridges-are-and-how-they-transfer-data-between-blockchains).",
          "10. Log every material transfer for taxes and your own sanity: date, asset, amount, from, to, network, txid, purpose. Habit stacks with [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes). Discipline beats speed—especially when moving size between hot wallets and [[cold storage]].",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-use-a-decentralized-exchange-dex-to-swap-tokens",
    title: "Swap tokens on a DEX",
    description:
      "Connect a burn-capable wallet, verify token contracts, set slippage consciously, approve minimally, swap on a liquid pool, and revoke leftover allowances when done.",
    publishedAt: "2026-07-14",
    readingMinutes: 5,
    sections: [
      {
        heading: "Prepare wallet, network, and token contracts",
        paragraphs: [
          "1. Use a [[browser wallet]] funded with the token you will sell plus native gas on the target chain. Prefer a dedicated trading address for [[DEX]] activity—not your cold vault. Connection hygiene is covered in [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely). DeFi context: [How Decentralized Finance (DeFi) Replaces Traditional Intermediaries](/guides/how-decentralized-finance-defi-replaces-traditional-intermediaries).",
          "2. Open the official [[DEX]] URL from a bookmark you typed yourself. Confirm you are on the intended network ([[mainnet]] or a specific [[L2]]). Wrong network swaps fail or route to unexpected contracts. Scaling trade-offs: [Explaining Layer 1 vs Layer 2 Scaling Solutions](/guides/explaining-layer-1-vs-layer-2-scaling-solutions).",
          "3. When swapping to an unfamiliar token, paste the [[token contract]] from a trusted explorer or project docs—never trust ticker symbols alone. Fake tokens with the same name are routine [[honeypot]] setups. Also learn how pools price assets in [Explaining Liquidity Pools and Automated Market Makers (AMMs)](/guides/explaining-liquidity-pools-and-automated-market-makers-amms). Risk: interacting with scam tokens to “sell dust” can trigger malicious approvals.",
        ],
      },
      {
        heading: "Approvals, slippage, and the swap itself",
        paragraphs: [
          "4. Enter the sell amount. Read the quoted output, price impact, and route. Illiquid pairs can move against you; large market sells on thin pools are how traders donate to [[MEV]] searchers. For liquid majors, default routes are usually fine; for microcaps, reconsider whether you should trade at all.",
          "5. Set [[slippage]] deliberately. Too low and the swap reverts (you still pay gas). Too high and a sandwich can worsen your fill. Start tight on stable pairs; widen only as needed. Understand fee markets in [What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion) so you do not confuse a failed quote with a network outage.",
          "6. If the DEX needs an [[approval]], prefer exact or limited [[allowance]] over unlimited when the wallet UI allows. Confirm the spender address matches the router you intend. Read the wallet [[simulation]] before signing. Risk: unlimited approvals to malicious spenders are a leading drain vector—see [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "7. Sign the swap transaction, wait for confirmation on a [[block explorer]], and verify balances of both tokens. If the tx reverts, read the error, adjust slippage or gas, and avoid blindly retrying into a moving market without a new quote. Explorer skills: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
        ],
      },
      {
        heading: "After the trade",
        paragraphs: [
          "8. Hide scam airdrop tokens from your wallet UI without interacting with them. Do not “claim” mystery NFTs or tokens that require signing odd messages. Phishing patterns: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
          "9. Revoke approvals you no longer need, especially unlimited ones to experimental routers. Keep gas reserved for revoke transactions. If you plan to become a liquidity provider instead of a one-off swapper, continue with [How to Provide Liquidity to an Automated Market Maker Pool](/how-to/how-to-provide-liquidity-to-an-automated-market-maker-pool) and understand [[impermanent loss]] first.",
          "10. Record the swap for taxes (crypto-to-crypto is often taxable). Pair with [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes). Treat [[DEX]] use as a skill: verify contracts, minimize allowances, and never chase illiquid tickers that promise impossible upside.",
          "11. Build a reusable pre-swap checklist: bookmarked official URL, correct network, [[token contract]] verified on a [[block explorer]], [[slippage]] set intentionally, limited [[approval]] when possible, full wallet [[simulation]] read, and a plan to [[revoke]] leftovers. If any line fails, abort—there is always another block. Threat-model detail: [DEX Swaps: Slippage, MEV, and Approvals](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge",
    title: "Bridge tokens cross-chain",
    description:
      "Prefer canonical bridges when practical, verify chain IDs and asset representations, send test amounts, track both legs on explorers, and budget time for optimistic withdrawal delays.",
    publishedAt: "2026-07-17",
    readingMinutes: 6,
    sections: [
      {
        heading: "Decide whether bridging is necessary",
        paragraphs: [
          "1. Ask if you can complete the task on one chain. Bridging adds [[smart contract]] risk, time delay, and fee layers. Many farming and yield goals work entirely on a single [[L2]]—see [Explaining Layer 1 vs Layer 2 Scaling Solutions](/guides/explaining-layer-1-vs-layer-2-scaling-solutions). Conceptual overview: [What Cross-Chain Bridges Are and How They Transfer Data Between Blockchains](/guides/what-cross-chain-bridges-are-and-how-they-transfer-data-between-blockchains).",
          "2. If you must move value, prefer the [[canonical bridge]] of the destination rollup when delay is acceptable. Third-party fast bridges trade speed for extra contract and liquidity risk. Compare fee cost against the value moved—bridging dust can cost more than the asset.",
          "3. Confirm what asset you will receive. Bridged USDC is not always native USDC; wrapped representations can fragment liquidity. Know the [[token contract]] you expect on the destination chain before you start. Stablecoin nuances: [How Stablecoins Maintain Their Peg to Fiat Currencies](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies).",
        ],
      },
      {
        heading: "Execute with test amounts and explorer discipline",
        paragraphs: [
          "4. Connect the correct wallet on the official bridge UI (bookmark the URL). Select source chain, destination chain, token, and amount. Verify [[chain ID]]s in your wallet match the UI. Risk: fake bridge sites are high-value [[phishing]] targets—see [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
          "5. Ensure you hold native gas on the source chain for the deposit transaction, and eventually native gas on the destination so you can move funds after arrival. Arriving with tokens but zero gas can trap you until you acquire gas via a faucet, CEX withdrawal, or friend send. Fee intuition: [What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion).",
          "6. Bridge a [[test amount]] first. Note the source tx hash on a [[block explorer]], then track the destination credit. For [[optimistic rollup]] withdrawals to L1, budget roughly seven days for the challenge window unless you use a third-party exit with an explicit fee.",
          "7. For [[ZK rollup]] and other designs, follow the bridge’s documented finality—do not assume optimistic timing. Never close the wallet mid-flow without saving hashes; support tickets without txids go nowhere. Explorer habits: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
        ],
      },
      {
        heading: "Settle, verify, and avoid common traps",
        paragraphs: [
          "8. After destination confirmation, verify the token contract and balance. If a “bridge” credited a random IOU token you cannot sell, stop interacting and investigate—do not approve random claim contracts. Contract risk background: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "9. Move received funds to your intended address roles (spend vs vault). Do not leave large balances in hot bridging wallets. Operational send habits: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "10. Log both legs for accounting. Bridging can create taxable events depending on jurisdiction and asset wrapping mechanics—keep hashes with [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes). If fees dominate the move, reconsider whether the bridge was worth it. Risk: rushing a second bridge attempt while the first is still finalizing can create duplicate exposure or confusion about which representation you hold.",
          "11. Write the bridge plan before you click: source chain, destination chain, asset in, expected asset out, bridge name, delay, gas on both sides, and [[test amount]] size. Execute only that plan. Mid-flow UI changes to a different asset or chain are a stop condition. Timing trade-offs: [Layer 2 Fees, Blobs, and When to Bridge](/guides/explaining-layer-1-vs-layer-2-scaling-solutions) and [Bridging Without Losing Funds](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge).",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-stake-tokens-to-earn-network-rewards",
    title: "Stake for network rewards",
    description:
      "Choose native staking versus liquid staking, understand unbonding and slash risk, stake through official flows, and track rewards without chasing unsustainable APY screenshots.",
    publishedAt: "2026-07-20",
    readingMinutes: 5,
    sections: [
      {
        heading: "Pick a staking model that matches your constraints",
        paragraphs: [
          "1. Clarify whether you mean [[native staking]] (protocol validators), delegated staking to an operator, or holding an [[LSD]] receipt token. These are not identical risk stacks. Start with [What Crypto Staking Is and How Yield Is Generated](/guides/what-crypto-staking-is-and-how-yield-is-generated) and consensus basics in [The Difference Between Proof of Work and Proof of Stake](/guides/the-difference-between-proof-of-work-and-proof-of-stake).",
          "2. Check minimums, [[unbonding period]] / [[withdrawal lock]], reward frequency, and [[slash]] conditions. A high advertised [[APY]] with opaque validator set and admin keys is a marketing page, not a bond. Restaking and [[LRT]] products add further layers—understand operator and contract risk before you stack.",
          "3. Decide custody: exchange “earn” products keep [[CEX]] [[custody]]; on-chain staking with your keys is [[self-custody]] of the position (still subject to protocol rules). GetFreeBit favors understanding exit paths before entry. Wallet roles: [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage).",
        ],
      },
      {
        heading: "Stake step by step",
        paragraphs: [
          "4. Fund a wallet on the correct network with the stake asset plus gas. For Ethereum solo validation you need 32 ETH and operational expertise; most readers will delegate or use an LSD. Prefer official staking UIs or well-known protocols you can verify on a [[block explorer]].",
          "5. For liquid staking, review the minting contract, fee percentage, and whether the receipt token is widely liquid. Stake a modest amount first. Confirm you received the correct receipt [[token contract]]. If you later swap that receipt on a [[DEX]], follow [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
          "6. For native or delegated staking dashboards, choose validators with transparent performance—not only the highest commission discount. Diversify across operators if size warrants it. Confirm the stake transaction succeeds and the explorer shows the expected locked or delegated balance.",
          "7. Risk: Never stake through a site that asks for your [[seed phrase]]. Signing a stake transaction is normal; typing recovery words is not. Phishing “staking portals” drain wallets—see [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams). Also read exploit categories in [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
        ],
      },
      {
        heading: "Monitor rewards and plan exits",
        paragraphs: [
          "8. Track rewards and principal separately in your notes. Rewards may be taxable on receipt in many places—coordinate with [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "9. Before you need liquidity, initiate unstake and calendar the [[unbonding period]]. Do not assume instant exit. If you used an LSD, exiting may mean selling the receipt on a [[DEX]] (price can depeg slightly) or waiting through protocol redemption.",
          "10. Revisit risk if you later use staked assets as [[collateral]] in lending markets—liquidation risk stacks on staking risk. Read [How to Deposit Crypto Assets into DeFi Lending Platforms to Earn Interest](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest) before looping. Staking is a security contribution with opportunity cost—not a guaranteed paycheck.",
          "11. After the first stake confirms, calendar the earliest exit date given [[unbonding period]] or redemption rules. On that date, re-check validator performance, [[LSD]] peg if relevant, and whether rewards still justify the load. Keep the exit date as visible as the entry [[APY]]—staking is a multi-week process, not a one-click earn button.",
          "12. Before you commit size, write down your maximum acceptable [[unbonding period]], your plan if the receipt token trades below peg for a week, and whether you would still hold the underlying asset if rewards fell by half. That written plan is more useful than any [[APY]] screenshot. Re-read [What Crypto Staking Is and How Yield Is Generated](/guides/what-crypto-staking-is-and-how-yield-is-generated) whenever a new product promises restaking upside without explaining [[slash]] paths.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security",
    title: "Set up a hardware wallet",
    description:
      "Buy from trusted channels, initialize offline with a verified seed backup, enable PIN and optional passphrase, and practice verifying addresses on-device before moving long-term funds.",
    publishedAt: "2026-07-23",
    readingMinutes: 6,
    sections: [
      {
        heading: "Acquire and unwrap safely",
        paragraphs: [
          "1. Buy the [[hardware wallet]] from the manufacturer or an authorized reseller. Avoid “pre-seeded” devices from marketplaces. Inspect packaging for tamper evidence. If anything feels resealed, do not use it for real funds—contact the vendor. Custody concepts: [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage).",
          "2. Install only official companion apps from vendor documentation. Update device firmware via official flows before generating a seed when the vendor recommends that order. Key material background: [What Public and Private Keys Are in Digital Cryptography](/guides/what-public-and-private-keys-are-in-digital-cryptography).",
          "3. Perform setup on a clean computer. Prefer initializing the seed on the device itself so words appear on the hardware screen—not generated by a random website. Risk: fake “firmware update” sites are [[phishing]]. Verify domains character by character and never enter a [[seed phrase]] into a browser “setup wizard.”",
        ],
      },
      {
        heading: "Initialize keys and backups",
        paragraphs: [
          "4. Create a new wallet on-device. Write the [[seed phrase]] on the cards provided, then upgrade storage using practices in [How to Safely Store and Back Up Your Seed Phrase](/how-to/how-to-safely-store-and-back-up-your-seed-phrase). Set a PIN you will not reuse from other accounts.",
          "5. Decide on a passphrase only if you understand that it creates a hidden wallet: wrong passphrase silently opens a different empty account. Test restore on a second device or wipe-and-restore drill with dust amounts before depositing savings.",
          "6. Confirm receive addresses on the device screen when the companion app displays them. Never trust an address that appears only on the computer if malware is a concern—the device screen is the source of truth. If you are migrating from a software wallet created in [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet), move funds in stages rather than one blind transfer.",
        ],
      },
      {
        heading: "Fund, operate, and keep it cold",
        paragraphs: [
          "7. Send a [[test amount]] from your hot wallet or [[CEX]] to the hardware receive address. Verify on a [[block explorer]], then transfer larger [[cold storage]] amounts. Send discipline: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "8. For spending, connect via WalletConnect or vendor USB/Bluetooth flows, verify every destination and amount on-device, then approve. Reject blind signing when the device cannot show clear details for unfamiliar contracts—use a hot wallet for experimental [[dApp]]s instead ([How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely)).",
          "9. Keep daily spending balances in a [[hot wallet]]; keep savings offline. Do not plug the device into untrusted machines. Do not enter the seed into any computer “recovery tool.” Risk: “support” that asks you to share the screen while entering the seed is social engineering.",
          "10. Store the device and seed backups in separate locations. If the device fails, the seed restores funds into a replacement unit. Practice that story once with tiny value so muscle memory exists before an emergency. For shared treasuries, graduate to [How to Set Up a Multisig Wallet for Shared Funds and DAO Treasuries](/how-to/how-to-set-up-a-multisig-wallet-for-shared-funds-and-dao-treasuries) rather than sharing one seed among people.",
          "11. Keep a one-page ops note with no seed words: device model, firmware date, companion app version, networks used, backup location codes, and the last successful dust restore. Update it after every firmware change. Passphrase and cold-storage discipline: [How to Set Up a Hardware Wallet for Maximum Cold Storage Security](/how-to/how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security).",
          "12. Treat the first week as a rehearsal: practice one receive, one send of dust, and one disconnect of companion software so you know the full loop before life-changing balances arrive. Keep the seed backups geographically separate from the device itself.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions",
    title: "Read a blockchain explorer",
    description:
      "Look up tx hashes and addresses on the correct explorer, interpret pending, success, and failure states, decode token transfers, and spot red flags in approvals and counterparties.",
    publishedAt: "2026-07-26",
    readingMinutes: 5,
    sections: [
      {
        heading: "Pick the correct explorer and search target",
        paragraphs: [
          "1. Use the explorer that matches the network: Ethereum mainnet explorers differ from Arbitrum, Base, Bitcoin, Solana, and others. Wrong explorer shows “not found” and causes panic. Mempool context: [What Mempools Are and How Transactions Get Validated](/guides/what-mempools-are-and-how-transactions-get-validated). Chain architecture: [What Blockchain Technology Is and How It Works](/guides/what-blockchain-technology-is-and-how-it-works).",
          "2. Search by transaction hash when you just sent or received a payment. Search by address when you want a history of balances, ERC-20 transfers, and internal transactions. Search by [[token contract]] when verifying you hold the real asset.",
          "3. Confirm the URL is the real explorer domain. Phishing explorers exist; bookmark official links. Never download “explorer apps” from ads that ask for a [[seed phrase]]. Risk: lookalike domains that wrap a real explorer iframe while injecting wallet connect prompts.",
        ],
      },
      {
        heading: "Interpret transaction status fields",
        paragraphs: [
          "4. Pending / in [[mempool]]: not yet included. Check gas price versus current network conditions. A stuck low-fee tx may need speed-up or cancel via [[nonce]] replacement—see [How to Adjust Gas Fees and Priority Gas Rules Manually to Speed Up Transactions](/how-to/how-to-adjust-gas-fees-and-priority-gas-rules-manually-to-speed-up-transactions) and [What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion).",
          "5. Success: included with status success. Read from, to, value, gas used, and token transfer tabs. For contract calls, value may be zero ETH while ERC-20 amounts move in the token transfer section—do not stop at the top-line ETH value. Contract mechanics: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "6. Failed / reverted: state changes for the intended action did not apply, but gas is often still consumed. Read the error message. Blindly resending the same calldata without fixing slippage, allowance, or gas can waste more fees.",
          "7. Dropped / replaced: another transaction with the same nonce superseded this one. Look for the replacement hash. This is normal after speed-ups. If you intended only one send, confirm you did not accidentally create a second spend with a new nonce.",
        ],
      },
      {
        heading: "Use explorers for security and reconciliation",
        paragraphs: [
          "8. On address pages, review Approval / ERC-20 approvals tabs when available. Unexpected spenders are a signal to [[revoke]]—follow [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "9. Verify counterparties for large receives: contract creators, known labels, and whether a token can be sold. Combine with exploit awareness from [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are) and send hygiene in [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "10. Export or screenshot critical txids for accounting. Explorers are the ground truth when a [[CEX]] UI lags. For analytics beyond single txs, continue with [How to Analyze On-Chain Wallet Data and Metrics Using Tools like Dune or Etherscan](/how-to/how-to-analyze-on-chain-wallet-data-and-metrics-using-tools-like-dune-or-etherscan). Treat labels as hints, not gospel—verify contracts yourself.",
          "11. Practice on a recent personal transaction: open the hash, identify status, gas used, token transfers, and any [[approval]] events, then match it on your address page. That drill builds muscle memory so the next stuck send does not become panic. Operator habits: [How to Read a Blockchain Explorer](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "12. Build a personal checklist you reuse: correct network explorer, hash or address search, status field, token transfer tab, gas used, and whether any unexpected [[approval]] events appeared in the same block window. Run that checklist on every material send until it is automatic.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-revoke-token-approvals-to-protect-wallet-allowance-limits",
    title: "Revoke token approvals",
    description:
      "Inventory ERC-20 allowances, revoke unused or unlimited spenders, verify on a block explorer, and rebuild safer approve-then-swap habits for future DEX use.",
    publishedAt: "2026-07-29",
    readingMinutes: 5,
    sections: [
      {
        heading: "Understand why approvals matter",
        paragraphs: [
          "1. An ERC-20 [[approval]] lets a spender contract pull tokens up to an [[allowance]] without asking again each time. Convenient for [[DEX]] routers—dangerous when the spender is malicious, hacked, or forgotten. Unlimited allowances are especially risky because a later exploit can drain the full balance. Contract primer: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "2. Approvals do not move funds by themselves; a compromised or hostile spender does. Revoking sets allowance to zero so future pulls fail. You will pay [[gas fees]] to revoke—budget native token accordingly. Fee timing: [What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion).",
          "3. Risk: Fake “revoke” sites are [[phishing]]. Use well-known revoke tools or your wallet’s built-in approval manager, opened from bookmarks. Never enter a [[seed phrase]] into a revoke website. Scam patterns: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Inventory and revoke",
        paragraphs: [
          "4. Connect the wallet you actually use for [[dApp]]s (not your cold vault) on the correct network. List approvals: token, spender, allowance amount. Cross-check spenders you do not recognize against a [[block explorer]] and project docs. Connection safety: [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
          "5. Prioritize: unlimited allowances, spenders related to old farms, abandoned NFT markets, and anything you do not actively use. Keep allowances only for protocols you trust this week. Exploit taxonomy: [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
          "6. Revoke one at a time if you are learning; confirm each transaction succeeds on the explorer. If a revoke fails, you may lack gas or be on the wrong chain. Reading status fields: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "7. After incidents or phishing scares, revoke broadly, transfer remaining funds to a fresh wallet created per [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet), and retire the burned address for future deposits.",
        ],
      },
      {
        heading: "Prevent the next mess",
        paragraphs: [
          "8. On future swaps, approve limited amounts when UI allows. Re-approve as needed beats one unlimited approval living forever. Pair with [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens) and pool mechanics in [Explaining Liquidity Pools and Automated Market Makers (AMMs)](/guides/explaining-liquidity-pools-and-automated-market-makers-amms).",
          "9. Separate wallets by role so a gaming or minting allowance cannot reach savings. NFT marketplace operator approvals deserve the same scrutiny—see [How to Mint, Buy, and Transfer an NFT Using a Decentralized Marketplace](/how-to/how-to-mint-buy-and-transfer-an-nft-using-a-decentralized-marketplace).",
          "10. Calendar a quarterly approval review. Treat revoke hygiene like password changes—boring, preventive, and cheaper than post-drain forensics. If you use DeFi lending, re-check allowances after you exit markets in [How to Deposit Crypto Assets into DeFi Lending Platforms to Earn Interest](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest).",
          "11. After each revoke, confirm on a [[block explorer]] that the spender [[allowance]] is zero. Note what you revoked and why. Next swap, approve only what that session needs—if a protocol demands unlimited allowance forever, treat that as a risk signal. Habit design: [DEX Swaps: Slippage, MEV, and Approvals](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
          "12. After a revoke batch, screenshot the explorer confirmation page and store it with the date. If a protocol later claims you still authorized a spender, you have evidence of the zero [[allowance]] transaction hash. Prefer quiet network hours so [[gas fees]] for cleanup stay modest.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-mint-buy-and-transfer-an-nft-using-a-decentralized-marketplace",
    title: "Mint, buy & transfer NFTs",
    description:
      "Verify collections and contracts, mint or buy with simulation-aware signing, transfer only to known addresses, and avoid signature phishing disguised as NFT claims.",
    publishedAt: "2026-08-01",
    readingMinutes: 5,
    sections: [
      {
        heading: "Prepare a spending wallet and verify the collection",
        paragraphs: [
          "1. Use a [[hot wallet]] funded with native gas and purchase currency on the correct chain—not your [[hardware wallet]] vault. Marketplace browsing has high [[phishing]] density. Ownership model: [What Non-Fungible Tokens (NFTs) Are and How On-Chain Ownership Works](/guides/what-non-fungible-tokens-nfts-are-and-how-on-chain-ownership-works).",
          "2. Open the marketplace from a bookmark. Navigate to the collection via official project links. Verify the [[token contract]] / collection address on a [[block explorer]] against docs or a trusted announcement—not against a Discord username with a nearly identical spelling.",
          "3. Risk: “Support” staff offering free mints that require seed entry or blind signatures are scams. Review [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams) and connect only with [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
        ],
      },
      {
        heading: "Mint or buy with deliberate signing",
        paragraphs: [
          "4. For primary mints, read mint price, supply, and wallet limits. Confirm the mint contract address. Run wallet [[simulation]] when available; reject transactions that drain unexpected ERC-20 balances or set odd operator approvals. Smart-contract behavior: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "5. For secondary buys, check rarity traits you care about, last sales, and royalty settings. Set price consciously; floor sniping bots are normal. Prefer deliberate limit-style decisions over FOMO market clicks. Budget [[gas fees]] separately from the item price.",
          "6. Approve the marketplace to move the NFT or payment token only as required. After purchase, confirm the NFT appears under your address on the explorer and in the marketplace profile tied to that address. Explorer checks: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "7. If a listing looks far below floor, assume stolen-item or contract risk. Marketplaces can reverse UI listings; chain transfers may still complete—know the difference. Exploit awareness: [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
        ],
      },
      {
        heading: "Transfer and post-trade hygiene",
        paragraphs: [
          "8. To send an NFT, use the marketplace transfer or wallet send NFT flow. Paste the recipient [[public address]], verify on-device if using hardware for a rare piece, and send a screenshot of the explorer confirmation to the recipient. General send rules: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "9. Revoke unused marketplace operator approvals periodically via [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits). Old operator approvals have been abused historically.",
          "10. Record cost basis for taxes when you buy, sell, or swap NFTs. Guidance: [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes). Treat NFTs as illiquid collectibles with smart-contract risk—not guaranteed returns. Risk: “free mint” pages that request setApprovalForAll across unrelated collections are classic drains.",
          "11. Before any mint or buy over dust size, write the collection contract, marketplace URL, max price, and wallet you will use. Discord urgency that skips verification is the attack. Afterward, disconnect the site and revoke leftover operator approvals via [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "12. Before mint day, rehearse the exact URL, the collection contract on the explorer, and your max gas willingness so you are not improvising under time pressure when bots and fake mirrors spike. Fund only the mint wallet, not your vault, and disconnect the marketplace when the session ends. Risk: last-minute Discord “official mirror” links are a common drain vector—if the URL is not already in your bookmarks, do not mint from it.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-provide-liquidity-to-an-automated-market-maker-pool",
    title: "Provide AMM liquidity",
    description:
      "Choose a pool and fee tier, deposit balanced assets, track fees versus impermanent loss, and withdraw deliberately without treating LP tokens as risk-free yield.",
    publishedAt: "2026-08-04",
    readingMinutes: 6,
    sections: [
      {
        heading: "Understand the trade before you deposit",
        paragraphs: [
          "1. Providing liquidity to an [[AMM]] [[liquidity pool]] means you supply tokens so traders can swap; you earn a share of [[AMM fee tier]] revenue and take inventory risk known as [[impermanent loss]]. Read [Explaining Liquidity Pools and Automated Market Makers (AMMs)](/guides/explaining-liquidity-pools-and-automated-market-makers-amms) before depositing size. DeFi framing: [How Decentralized Finance (DeFi) Replaces Traditional Intermediaries](/guides/how-decentralized-finance-defi-replaces-traditional-intermediaries).",
          "2. Pick pairs you are willing to hold anyway. Stable-stable pools have different risk than volatile-volatile or volatile-stable pools. High [[APR]] farms often pay emissions that can inflate away—separate fee APY from temporary incentives. Tokenomics caution: [Understanding Crypto Tokenomics: Supply Caps, Inflation, and Token Burns](/guides/understanding-crypto-tokenomics-supply-caps-inflation-and-token-burns).",
          "3. Prefer deep, audited venues on chains where you already understand gas. Thin pools magnify price impact for LPs as well as traders. Risk: UI screenshots of triple-digit APY without disclosing emissions duration are marketing, not a plan.",
        ],
      },
      {
        heading: "Deposit step by step",
        paragraphs: [
          "4. Connect a dedicated LP wallet with both assets plus gas. Acquire the correct ratio via a [[DEX]] swap first if needed—see [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens). Connection hygiene: [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
          "5. On the official pool UI, select the pair and fee tier. For concentrated liquidity AMMs, choose a price range you understand; out-of-range positions earn no fees until price returns. Wide ranges behave closer to classic x·y=k.",
          "6. Approve each token (limited allowances when possible), then confirm the supply transaction. Verify LP tokens or NFT position receipts on a [[block explorer]]. Risk: fake “pool” UIs request unlimited approvals to drainers—verify URLs and revoke later with [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "7. Note entry inventory: quantities of each asset and USD mark. Without a starting snapshot you cannot evaluate IL later. Explorer confirmation: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
        ],
      },
      {
        heading: "Monitor and exit",
        paragraphs: [
          "8. Track fees earned versus what a simple hold would have produced. If emissions dominate, plan an exit before incentives end. Gas costs for rebalancing on [[mainnet]] can erase fee income—[[L2]] is often more practical for active ranges ([Explaining Layer 1 vs Layer 2 Scaling Solutions](/guides/explaining-layer-1-vs-layer-2-scaling-solutions)).",
          "9. Withdraw by removing liquidity, then decide whether to hold, swap, or restake elsewhere. Confirm balances on the explorer. Revoke allowances you no longer need.",
          "10. Compare LP results against alternatives like [[staking]] ([How to Stake Tokens to Earn Network Rewards](/how-to/how-to-stake-tokens-to-earn-network-rewards)) or lending ([How to Deposit Crypto Assets into DeFi Lending Platforms to Earn Interest](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest)). LP is a market-making business, not a savings account. Record disposals for taxes via [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "11. One week after depositing, compare LP inventory value to a simple hold of the same starting assets, net of fees earned and gas spent. If the hold would have won, shrink or exit rather than averaging in emotionally. Score with [Impermanent Loss with Real Numbers](/guides/explaining-liquidity-pools-and-automated-market-makers-amms)—not the pool’s APR banner.",
          "12. Size the first LP deposit as an experiment you can afford to mismanage: enough to learn fee accrual and range management, small enough that [[impermanent loss]] cannot ruin your month. Recheck the pool [[token contract]] addresses after any UI redesign before you top up. Risk: depositing into a brand-new incentive pool without an exit plan is how temporary emissions become permanent inventory you did not want.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams",
    title: "Spot phishing & wallet scams",
    description:
      "Recognize fake support, airdrop claim sites, malicious approvals, and address-poisoning patterns, and build verification habits that keep seed phrases and signatures offline from attackers.",
    publishedAt: "2026-08-07",
    readingMinutes: 5,
    sections: [
      {
        heading: "Know the attacker’s goals",
        paragraphs: [
          "1. Scammers want either your [[seed phrase]] / [[private key]], or a signature that grants [[approval]]s, transfers, or malicious contract calls. They do not need your password if they get the seed. They do not need the seed if you sign a drain transaction. Defend both surfaces. Key model: [What Public and Private Keys Are in Digital Cryptography](/guides/what-public-and-private-keys-are-in-digital-cryptography).",
          "2. Common channels: search ads to fake [[DEX]]/bridge sites, Discord/Telegram “support,” hijacked Twitter accounts, email “KYC resubmission,” and dust NFT airdrops. Technical companions: [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are) and wallet roles in [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage).",
          "3. Rule: no legitimate product needs your seed phrase to “fix,” “validate,” or “sync” a wallet. Close those tabs immediately. Risk: urgency language (“funds at risk—verify in 10 minutes”) is a reliable social-engineering tell.",
        ],
      },
      {
        heading: "Verify before you connect or sign",
        paragraphs: [
          "4. Type URLs yourself or use bookmarks. Check SSL is not enough—phishing sites have HTTPS too. Compare domains character by character (rn vs m tricks). Prefer official docs over pinned Discord messages that change overnight.",
          "5. On connect, confirm the site name in the wallet prompt. On sign, read [[simulation]] outputs: which assets leave, which spenders gain allowance, which [[chain ID]] is targeted. Reject blind signing for unknown contracts from a savings wallet. Secure connect workflow: [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
          "6. Address poisoning: attackers send zero-value txs from lookalike addresses so you copy the wrong recent address. Always copy from your own trusted contacts book or explorer labels—not from recent transfers. Habits in [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "7. Risk: “Security team” screen shares are social engineering. Do not install remote access tools for strangers. Do not reveal 2FA codes. Exchange login phishing pairs with CEX habits in [How to Buy Crypto on a Centralized Exchange Using Fiat Currency](/how-to/how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency).",
        ],
      },
      {
        heading: "Contain damage and harden defaults",
        paragraphs: [
          "8. If you signed something suspicious, revoke approvals immediately ([How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits)), move funds to a new wallet created offline from a clean seed ([How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet)), and abandon the old address.",
          "9. Segment wallets: vault, spending, minting/experimental. Keep large balances on a [[hardware wallet]] ([How to Set Up a Hardware Wallet for Maximum Cold-Storage Security](/how-to/how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security)).",
          "10. Maintain skepticism toward guaranteed returns, fake celebrity giveaways, and honeypot tokens. Slow verification beats fast regret. When researching a contract after a scare, use [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions) and keep your seed offline forever.",
          "11. Once a quarter, red-team yourself: search your wallet brand plus “support,” notice the ads, and close them without clicking. Review connected sites and approvals the same day. Phishing defense is a habit loop—bookmark [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
          "12. Practice a thirty-second pause before every signature: read the domain, read the [[simulation]], and ask whether a legitimate product would ever need this permission. That pause is the cheapest security control you have, and it beats any after-the-fact forensics. If anything feels rushed, close the tab, re-open from a bookmark, and start the connect flow again from a known-good URL.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-calculate-capital-gains-and-prepare-crypto-taxes",
    title: "Crypto taxes & capital gains",
    description:
      "Export exchange and wallet histories, establish cost basis per disposal, separate income-like rewards, and prepare filings with jurisdiction-aware caution—not tax advice.",
    publishedAt: "2026-08-10",
    readingMinutes: 6,
    sections: [
      {
        heading: "Gather raw data before you calculate anything",
        paragraphs: [
          "1. This how-to is educational, not tax advice—rules differ by country and change. Start by exporting CSVs from every [[CEX]] you used and listing self-custody addresses. Include [[DEX]] swaps, bridges, NFT trades, and transfers. Asset vocabulary: [Understanding Cryptocurrencies, Tokens, and Altcoins](/guides/understanding-cryptocurrencies-tokens-and-altcoins).",
          "2. Pull txids from [[block explorer]]s where CSV gaps exist. Note timestamps in UTC and local time consistently. Missing fees distort gains. Explorer workflow: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "3. Identify accounts you forgot: old mobile wallets, [[FaucetPay]] withdrawals, airdrop claim addresses. Incomplete histories create under/over reporting risk. On-chain inventory skills: [How to Analyze On-Chain Wallet Data and Metrics Using Tools like Dune or Etherscan](/how-to/how-to-analyze-on-chain-wallet-data-and-metrics-using-tools-like-dune-or-etherscan).",
        ],
      },
      {
        heading: "Classify events and compute gains",
        paragraphs: [
          "4. Separate transfers (you still own the asset) from disposals (sell for fiat, crypto-to-crypto trade, spending). Many jurisdictions treat crypto-to-crypto as a taxable disposal—confirm locally. DEX trades from [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens) are common disposals.",
          "5. Establish cost basis for each lot (what you paid including fees). Apply your jurisdiction’s allowed method if specified (FIFO, specific identification, etc.). When you dispose, proceeds minus basis (and allowed costs) yield capital gain or loss. Tokenomics and supply events can affect valuation narratives but do not replace your lot accounting—see [Understanding Crypto Tokenomics: Supply Caps, Inflation, and Token Burns](/guides/understanding-crypto-tokenomics-supply-caps-inflation-and-token-burns).",
          "6. Track income-like items separately when required: staking rewards, some airdrops, mining, referral bonuses. Fair-market value at receipt may matter. Staking context: [How to Stake Tokens to Earn Network Rewards](/how-to/how-to-stake-tokens-to-earn-network-rewards) and [What Crypto Staking Is and How Yield Is Generated](/guides/what-crypto-staking-is-and-how-yield-is-generated).",
          "7. Risk: “Tax loss” schemes that require giving a stranger custody of coins are often scams. Do not share seeds with anyone claiming to optimize taxes. Phishing variants: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Reconcile, software, and filing posture",
        paragraphs: [
          "8. Use reputable crypto tax software if volume is high, but reconcile totals against your own exports. Software mislabels bridges and internal transfers—fix those rows manually. Bridge legs from [How to Transfer Tokens Across Different Blockchains via a Cross-Chain Bridge](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge) are frequent mislabels.",
          "9. Keep a folder per year: CSVs, explorer PDFs for large txs, notes on methodology. If you used partner tools like portfolio trackers, verify their prices on disposal dates. NFT sales need the same discipline as tokens ([How to Mint, Buy, and Transfer an NFT Using a Decentralized Marketplace](/how-to/how-to-mint-buy-and-transfer-an-nft-using-a-decentralized-marketplace)).",
          "10. File according to local deadlines or hire a crypto-aware professional for complex DeFi. Going forward, log disposals weekly so next year is quieter. Lending interest and LP exits also create events—track them alongside [How to Deposit Crypto Assets into DeFi Lending Platforms to Earn Interest](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest) and [How to Provide Liquidity to an Automated Market Maker Pool](/how-to/how-to-provide-liquidity-to-an-automated-market-maker-pool).",
          "11. Create a monthly ritual: export new exchange CSVs, append new self-custody txids, and tag each disposal with purpose (sell, spend, trade). Fifteen minutes a month beats a frantic year-end reconstruction. When DeFi complexity explodes, pause new strategies until records catch up—see [Crypto Records for Taxes Without Panic](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "11. Create a simple spreadsheet template once—date, asset, quantity, proceeds, basis, fees, txid, notes—and fill it the same week a disposal happens so year-end is reconciliation rather than archaeology. Include [[CEX]] withdrawals and [[DEX]] swaps in the same habit.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-set-up-a-multisig-wallet-for-shared-funds-and-dao-treasuries",
    title: "Set up a multisig wallet",
    description:
      "Choose an M-of-N threshold, onboard signer devices safely, deploy or create the multisig, run a test transaction, and document policies that prevent single-key failure without freezing funds forever.",
    publishedAt: "2026-08-13",
    readingMinutes: 6,
    sections: [
      {
        heading: "Design the policy before you deploy",
        paragraphs: [
          "1. A [[multisig]] requires M signatures out of N keys to move funds (for example 2-of-3). It reduces single-laptop failure and insider unilateral theft, but bad threshold design can brick the treasury if too many keys are lost. DAO context: [How Decentralized Autonomous Organizations (DAOs) Manage Governance](/guides/how-decentralized-autonomous-organizations-daos-manage-governance).",
          "2. Choose signers who can reliably respond and keep keys offline. Prefer [[hardware wallet]] signers for treasuries ([How to Set Up a Hardware Wallet for Maximum Cold-Storage Security](/how-to/how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security)). Avoid making every DAO member a signer on the main vault—use roles and spending limits where the tooling supports them.",
          "3. Document replacement procedures: what happens if a signer loses a device, leaves the org, or goes silent. Practice social recovery of roles without ever sharing raw [[seed phrase]]s in group chat. Seed hygiene: [How to Safely Store and Back Up Your Seed Phrase](/how-to/how-to-safely-store-and-back-up-your-seed-phrase).",
        ],
      },
      {
        heading: "Create and test the multisig",
        paragraphs: [
          "4. Each signer creates or designates an address they control, ideally on hardware, with backups already verified. Individual wallet creation habits still apply: [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet).",
          "5. Using a reputable multisig factory UI on the correct network, input owner addresses and the M-of-N threshold. Verify every owner address on-device screens. Deploy/create the multisig and record the contract address from a [[block explorer]]. Contract basics: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "6. Fund with a [[test amount]]. Propose a small outgoing transfer to a known address. Collect M signatures from separate devices/locations. Execute and confirm on the explorer ([How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions)). Do not deposit payroll-sized funds before a successful round trip.",
          "7. Risk: Fake multisig UIs are [[phishing]]. Bookmark official domains. Never “re-import” the treasury by typing a seed—multisigs are contracts with owners, not a shared 12-word phrase you all hold (unless you deliberately chose a different shared-custody model). Scam patterns: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Operate as a treasury",
        paragraphs: [
          "8. Define policies: who can propose, spending caps, required time delays if available, and when the DAO must vote first—see [How to Participate in DAO Governance Proposals and On-Chain Voting](/how-to/how-to-participate-in-dao-governance-proposals-and-on-chain-voting).",
          "9. Keep signer firmware updated, revoke unused [[dApp]] connections on owner wallets ([How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely)), and periodically verify owners list on-chain still matches your policy.",
          "10. For exchanges or service providers that cannot deposit to multisigs easily, use intermediary hot wallets with strict limits rather than weakening the vault threshold. Self-custody discipline still applies for sweeps: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds). Multisig is process design as much as cryptography.",
          "11. Schedule a quarterly signer drill: propose a tiny transfer, collect M signatures from real devices, execute, and confirm on a [[block explorer]]. Drills surface lost devices and stale owner lists before a payroll crisis. Keep policies aligned with [Multisig Basics for Shared Funds](/how-to/how-to-set-up-a-multisig-wallet-for-shared-funds-and-dao-treasuries).",
          "11. Schedule a quarterly dry-run where signers propose and reject a dust transfer so the team remembers tooling, [[nonce]] quirks, and who holds which device before an emergency spend. Update the written owner list whenever a signer rotates hardware.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest",
    title: "Earn interest in DeFi lending",
    description:
      "Evaluate protocol risk and oracles, supply assets from a dedicated wallet, monitor health if borrowing, and withdraw with gas reserved—without treating variable APY as guaranteed income.",
    publishedAt: "2026-08-16",
    readingMinutes: 5,
    sections: [
      {
        heading: "Evaluate the venue",
        paragraphs: [
          "1. DeFi lending pays you for supplying assets borrowers want. Yield comes with [[smart contract]] risk, [[oracle]] risk, and potential bad-debt socializations. Frame the category with [How Decentralized Finance (DeFi) Replaces Traditional Intermediaries](/guides/how-decentralized-finance-defi-replaces-traditional-intermediaries) and contract execution in [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "2. Check audits, incident history, governance control, and whether the asset you supply is a standard [[stablecoin]] or a volatile token. High [[APY]] on obscure collateral markets is usually compensation for risk—not a free lunch. Stablecoin issuer risk: [How Stablecoins Maintain Their Peg to Fiat Currencies](/guides/how-stablecoins-maintain-their-peg-to-fiat-currencies).",
          "3. Prefer supplying from a wallet that is not your cold vault. Connection safety: [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely). Compare yield alternatives like [[staking]] in [How to Stake Tokens to Earn Network Rewards](/how-to/how-to-stake-tokens-to-earn-network-rewards) before you decide lending is worth the operational load.",
        ],
      },
      {
        heading: "Supply assets",
        paragraphs: [
          "4. Open the official protocol app on the correct network. Select Supply for your asset. Verify the market and [[token contract]]. Approve a limited [[allowance]] when possible, then confirm the supply transaction. Allowance hygiene: [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "5. Confirm receipt tokens or on-chain supplied balance via a [[block explorer]]. Note the starting [[APR]]/[[APY]] as informational—rates change with utilization. Explorer checks: [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "6. If you only supply and never borrow, you avoid [[liquidation]] from your own loan, but you still face protocol risk. If you borrow against [[collateral]], track [[health factor]] continuously and understand that volatile collateral can liquidate quickly.",
          "7. Risk: Fake lending UIs drain via approvals. Bookmark domains. Never sign “permission” messages that transfer ownership of your supply position unexpectedly—read simulations. Phishing library: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Monitor and withdraw",
        paragraphs: [
          "8. Set alerts for rate changes and, if borrowing, for health factor thresholds. Do not loop leverage until you can explain the failure mode out loud. Exploit history context: [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
          "9. To exit, withdraw to your wallet when liquidity allows—some markets pause withdrawals during stress. Keep gas reserved. Revoke unused allowances afterward. Send proceeds carefully with [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "10. Record interest and disposals for taxes via [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes). Variable rates are not fixed deposits—size positions for smart-contract failure, not screenshot APY.",
          "11. Cap how much of your net crypto you will supply to any single lending market, and write that cap down before rates look tempting. Variable [[APY]] is not a reason to breach it. If you borrow, add a written minimum [[health factor]] rule. Re-read [Lending Yield and Liquidation Risk](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest) whenever you feel pressure to loop.",
          "11. Write your personal rules before depositing: maximum share of liquid net worth in any one protocol, whether you will borrow at all, and the [[health factor]] at which you repay or add [[collateral]] without debating in the moment. Keep native gas on the same chain so you can withdraw during volatility instead of watching a position while unable to pay [[gas fees]]. Prefer mature markets with deep liquidity over brand-new incentive programs that can reverse overnight when emissions end. Compare expected yield against simpler [[staking]] before you accept layered [[oracle]] risk.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-adjust-gas-fees-and-priority-gas-rules-manually-to-speed-up-transactions",
    title: "Adjust gas fees",
    description:
      "Read EIP-1559 base fee and tips, set priority fees intentionally, speed up or cancel stuck nonces, and avoid overpaying during congestion without spamming duplicate transactions.",
    publishedAt: "2026-08-19",
    readingMinutes: 5,
    sections: [
      {
        heading: "Learn what you are paying",
        paragraphs: [
          "1. On Ethereum-style networks under [[EIP-1559]], you pay a base fee (burned) plus a priority tip to validators, within a max fee cap. [[gas fees]] total roughly gas used × effective gas price, plus [[L2]] data components where relevant. Deep dive: [What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion). Mempool behavior: [What Mempools Are and How Transactions Get Validated](/guides/what-mempools-are-and-how-transactions-get-validated).",
          "2. Check a current gas oracle or explorer gas tracker before urgent sends. Quoted [[gwei]] during congestion can be several times quiet-hour levels. If the action is not time-critical, wait. Scaling options: [Explaining Layer 1 vs Layer 2 Scaling Solutions](/guides/explaining-layer-1-vs-layer-2-scaling-solutions).",
          "3. Ensure your wallet has enough native token for the max fee. Underfunded max caps cause underpriced pending txs that sit in the [[mempool]]. Risk: panic-raising fees far above market wastes capital without improving inclusion odds once you already clear the competitive tip range.",
        ],
      },
      {
        heading: "Set fees on new transactions",
        paragraphs: [
          "4. In your [[browser wallet]], open advanced gas controls. Set max priority fee based on urgency and max fee above expected base fee + tip. Too-low max fee and the tx stalls when base fee rises. Everyday send checklist: [How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds).",
          "5. For [[L2]]s, follow that chain’s fee UI—do not paste mainnet gwei assumptions. After [[blob]]-driven fee drops, L2 user fees are often low, but spikes still happen. Bridging to an L2 for cheaper activity: [How to Transfer Tokens Across Different Blockchains via a Cross-Chain Bridge](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge).",
          "6. Avoid sending a second independent transaction for the same intent while the first is pending; you may execute twice. Use speed-up/replace flows instead. DEX swaps that fail on slippage still cost gas—quote carefully via [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
        ],
      },
      {
        heading: "Unstick pending transactions",
        paragraphs: [
          "7. Note the pending [[nonce]] from a [[block explorer]] or wallet activity. To speed up, send a replacement transaction with the same nonce and higher tip/max fee (wallet “Speed up”). To cancel, send a 0-value tx to yourself with that nonce and higher fees (wallet “Cancel”).",
          "8. Wait for the replacement to confirm. Confirm status interpretation with [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "9. Risk: Some phishing “accelerators” ask you to sign drainers. Only use your wallet’s built-in replace tools or reputable documentation—not Telegram bots. Scam patterns: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
          "10. Afterward, return gas settings to normal so routine txs do not overpay. Batch non-urgent actions, and prefer L2 execution when bridging costs do not dominate. Secure dApp sessions while testing fee settings: [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely).",
          "11. Keep a personal fee log for a month: time of day, network, max fee set, and whether the tx landed quickly or stalled. Patterns beat folklore. Use that log before urgent bridges or mints. Farming-scale fee discipline: [Gas Optimization for Farming](/how-to/how-to-adjust-gas-fees-and-priority-gas-rules-manually-to-speed-up-transactions).",
          "11. Keep a short note of what tip ranges usually confirm for your common actions on each chain you use, so you are not guessing under pressure when the [[mempool]] is crowded. Revisit those notes after major fee-market upgrades or [[blob]] parameter changes.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-connect-a-wallet-to-decentralized-applications-dapps-securely",
    title: "Connect a wallet to dApps",
    description:
      "Use role-separated wallets, verify URLs and chain IDs, read connection and signature prompts, disconnect after sessions, and keep vault keys away from experimental contracts.",
    publishedAt: "2026-08-22",
    readingMinutes: 5,
    sections: [
      {
        heading: "Separate wallets by job",
        paragraphs: [
          "1. Maintain at least two addresses: a vault (ideally [[hardware wallet]] / [[cold storage]]) that never connects to random [[dApp]]s, and a hot spending wallet for experiments. Optional third: a mint/burn wallet for NFTs and trial protocols. Creation basics: [How to Create Your First Self-Custody Crypto Wallet](/how-to/how-to-create-your-first-self-custody-crypto-wallet). Custody models: [Understanding Crypto Wallets: Hot Wallets vs Cold Storage](/guides/understanding-crypto-wallets-hot-wallets-vs-cold-storage).",
          "2. Fund the hot wallet with only what you can lose to a bad approval or buggy UI. Sweep profits back to the vault via verified sends ([How to Send and Receive Crypto Transactions Without Losing Funds](/how-to/how-to-send-and-receive-crypto-transactions-without-losing-funds)). Hardware vault setup: [How to Set Up a Hardware Wallet for Maximum Cold-Storage Security](/how-to/how-to-set-up-a-hardware-wallet-for-maximum-cold-storage-security).",
          "3. Risk: Connecting your vault to a fake site can still be disastrous if you sign a malicious message. Connection alone is lower risk than signing—but treat both seriously. Phishing catalog: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Connect with verification",
        paragraphs: [
          "4. Navigate via bookmark. Click Connect Wallet, choose the correct account and network, and confirm the [[chain ID]] matches the dApp’s intended chain. DeFi landscape: [How Decentralized Finance (DeFi) Replaces Traditional Intermediaries](/guides/how-decentralized-finance-defi-replaces-traditional-intermediaries).",
          "5. Read the connection prompt. Prefer wallets that show site origin clearly. If using WalletConnect, verify the pairing details and reject unknown sessions that appear spontaneously.",
          "6. Before any transaction signature, read [[simulation]] results. Reject unlimited [[approval]]s unless you intentionally accept them for a trusted router—and plan to [[revoke]] later ([How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits)). DEX example flow: [How to Use a Decentralized Exchange (DEX) to Swap Tokens](/how-to/how-to-use-a-decentralized-exchange-dex-to-swap-tokens).",
          "7. Beware signature types that look like “login” but authorize transfers (poisoned typed data). When unsure, abort. Contract risk background: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically) and [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
        ],
      },
      {
        heading: "Session end and ongoing hygiene",
        paragraphs: [
          "8. Disconnect the site from the wallet’s connected-sites menu when finished. On shared computers, do not leave extensions unlocked. Confirm outcomes on a [[block explorer]] when value moved ([How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions)).",
          "9. Periodically review approvals and drop unknown WalletConnect sessions. NFT mints and lending UIs deserve the same post-session revoke habit ([How to Mint, Buy, and Transfer an NFT Using a Decentralized Marketplace](/how-to/how-to-mint-buy-and-transfer-an-nft-using-a-decentralized-marketplace), [How to Deposit Crypto Assets into DeFi Lending Platforms to Earn Interest](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest)).",
          "10. If a dApp requires a custom [[RPC]], understand that malicious RPCs can lie about balances and craft deceptive prompts—prefer reputable defaults. Stay skeptical, move slowly, and keep the vault offline from curiosity.",
          "11. After every new dApp session, disconnect the site, confirm you did not grant an unlimited [[approval]] by accident, and sweep surplus balances back to the vault. Connection is not the finish line—session cleanup is. If [[simulation]] looked odd, revoke first via [How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits).",
          "11. Before connecting, ask whether the same task can be done with a read-only explorer view or a smaller funded burner. Curiosity is not a reason to expose a funded address. After any experimental session, revoke fresh [[approval]]s the same day while you still remember which routers you touched, and move leftover value back to the vault with a verified send.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-analyze-on-chain-wallet-data-and-metrics-using-tools-like-dune-or-etherscan",
    title: "Analyze on-chain wallet data",
    description:
      "Build an explorer-first workflow for a single address, then escalate to Dune-style dashboards for protocol metrics—while treating labels and third-party charts as hypotheses to verify.",
    publishedAt: "2026-08-25",
    readingMinutes: 5,
    sections: [
      {
        heading: "Start with primary sources on explorers",
        paragraphs: [
          "1. Pick a network and open its [[block explorer]]. Paste the address. Review native balance, token holdings, and recent transactions. Operator checklist habits pair with [How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions) and ledger basics in [What Blockchain Technology Is and How It Works](/guides/what-blockchain-technology-is-and-how-it-works).",
          "2. Verify each material [[token contract]] rather than trusting display names. Hide scam airdrops from analysis unless you are studying them. Cross-check approvals tabs for spender risk ([How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits)).",
          "3. For a transaction of interest, open internal txs and event logs if you need to understand contract behavior beyond the summary UI. Save tx hashes into your notes for reproducible research. Contract model: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically). Mempool timing: [What Mempools Are and How Transactions Get Validated](/guides/what-mempools-are-and-how-transactions-get-validated).",
        ],
      },
      {
        heading: "Escalate to aggregated analytics carefully",
        paragraphs: [
          "4. Use dashboard tools (for example Dune-style SQL dashboards) to study protocol [[TVL]], volume, or cohort behavior. Treat community dashboards as unverified until you read the query logic and underlying tables. DeFi metric skepticism: [How Decentralized Finance (DeFi) Replaces Traditional Intermediaries](/guides/how-decentralized-finance-defi-replaces-traditional-intermediaries).",
          "5. When analyzing your own wallets for taxes or strategy, export curated CSVs rather than screenshotting charts. Charts are for intuition; exports are for accounting—see [How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes).",
          "6. Compare multiple addresses only with clear labeling (vault vs hot vs multisig). Mislabeling leads to false Sybil or profitability conclusions. Attack taxonomy: [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
          "7. Risk: “Portfolio tracker” browser extensions can request dangerous permissions. Prefer read-only approaches that never ask for a [[seed phrase]]. Phishing awareness: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Turn analysis into decisions",
        paragraphs: [
          "8. Translate metrics into actions: revoke stale allowances, bridge less often ([How to Transfer Tokens Across Different Blockchains via a Cross-Chain Bridge](/how-to/how-to-transfer-tokens-across-different-blockchains-via-a-cross-chain-bridge)), stop providing liquidity when IL dominates fees ([How to Provide Liquidity to an Automated Market Maker Pool](/how-to/how-to-provide-liquidity-to-an-automated-market-maker-pool)), or exit lending when utilization and oracle risk rise ([How to Deposit Crypto Assets into DeFi Lending Platforms to Earn Interest](/how-to/how-to-deposit-crypto-assets-into-defi-lending-platforms-to-earn-interest)).",
          "9. For DAO or treasury monitoring, track signer activity and proposal outcomes alongside balances—governance how-to: [How to Participate in DAO Governance Proposals and On-Chain Voting](/how-to/how-to-participate-in-dao-governance-proposals-and-on-chain-voting) and [How Decentralized Autonomous Organizations (DAOs) Manage Governance](/guides/how-decentralized-autonomous-organizations-daos-manage-governance).",
          "10. Re-run analyses after major protocol upgrades. On-chain truth changes; cached dashboards lag. Bookmark queries you trust, and keep explorer skills sharper than any single third-party UI. Secure the wallets you study with [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely) so research does not become a signing session.",
          "11. End each analysis with one written decision (“revoke X,” “stop LP on Y,” “bridge less,” or “no action”). Metrics without decisions are entertainment. Store the decision next to the explorer links you used. Operator reading: [How to Read a Blockchain Explorer](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions).",
          "11. Keep a research log with the address, chain, date, questions you asked, and hashes you inspected so tomorrow-you can reproduce the conclusion without relying on memory or a stale dashboard screenshot. Prefer primary explorer data over third-party labels when the two disagree.",
        ],
      },
    ],
  },
  {
    kind: "howto",
    slug: "how-to-participate-in-dao-governance-proposals-and-on-chain-voting",
    title: "Vote in DAO governance",
    description:
      "Obtain voting power honestly, research proposals on official forums, cast on-chain or delegated votes with simulation-aware signing, and document conflicts without treating governance as free money.",
    publishedAt: "2026-08-28",
    readingMinutes: 5,
    sections: [
      {
        heading: "Understand voting power and venues",
        paragraphs: [
          "1. DAO voting power usually comes from holding a governance token, locking tokens, or receiving delegation. Snapshot-style off-chain votes and on-chain Governor votes differ in binding force—read the DAO’s docs before assuming a forum poll moves the treasury. Primer: [How Decentralized Autonomous Organizations (DAOs) Manage Governance](/guides/how-decentralized-autonomous-organizations-daos-manage-governance).",
          "2. Acquire tokens through transparent markets if you intend to vote, not through shady OTC DMs. Holding governance tokens is financial risk; votes can affect token value. Treasury movements may involve a [[multisig]]—see [How to Set Up a Multisig Wallet for Shared Funds and DAO Treasuries](/how-to/how-to-set-up-a-multisig-wallet-for-shared-funds-and-dao-treasuries). Token context: [Understanding Cryptocurrencies, Tokens, and Altcoins](/guides/understanding-cryptocurrencies-tokens-and-altcoins).",
          "3. Risk: Fake “governance portals” phish signatures. Use official links from documentation you typed yourself. Never enter a [[seed phrase]] to “register voter status.” Scam patterns: [How to Identify and Avoid Common Crypto Phishing and Wallet Scams](/how-to/how-to-identify-and-avoid-common-crypto-phishing-and-wallet-scams).",
        ],
      },
      {
        heading: "Research, then vote",
        paragraphs: [
          "4. Read the proposal text, forum discussion, and parameter changes. Check whether funds leave a treasury, whether contracts upgrade, and who benefits. Look up prior votes by prolific delegates when you consider delegation. Smart-contract upgrade risk: [What Ethereum Smart Contracts Are and How They Execute Automatically](/guides/what-ethereum-smart-contracts-are-and-how-they-execute-automatically).",
          "5. Connect a dedicated voting wallet with [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely). Confirm network and voting contract addresses on a [[block explorer]] ([How to Read a Blockchain Explorer to Track Pending and Completed Transactions](/how-to/how-to-read-a-blockchain-explorer-to-track-pending-and-completed-transactions)).",
          "6. Cast the vote or create a delegation transaction. Read [[simulation]] carefully—malicious “vote” payloads have been used in phishing. Pay [[gas fees]] when on-chain voting requires them; if gas is high, wait or use the DAO’s supported [[L2]]/relay if documented ([What Gas Fees Are and Why They Change Based on Network Congestion](/guides/what-gas-fees-are-and-why-they-change-based-on-network-congestion)).",
          "7. Save the vote txid. Confirm your choice appears in the official tally UI and on-chain events when applicable. If you acquired tokens on a [[DEX]] solely to vote, remember that purchase may be a taxable disposal later ([How to Calculate Capital Gains and Prepare Crypto Taxes](/how-to/how-to-calculate-capital-gains-and-prepare-crypto-taxes)).",
        ],
      },
      {
        heading: "Delegates, conflicts, and follow-through",
        paragraphs: [
          "8. If you delegate, periodically revoke or re-delegate when a delegate’s interests diverge from yours. Delegation is not set-and-forget political capital. Exploit and capture risks: [What Sybil Attacks, 51% Attacks, and Smart Contract Exploits Are](/guides/what-sybil-attacks-51-percent-attacks-and-smart-contract-exploits-are).",
          "9. Disclose conflicts when you publicly argue for proposals that enrich your other positions. GetFreeBit’s transparency standard applies to governance commentary as much as affiliate links.",
          "10. After passage, monitor execution: multisig queues, timelocks, and parameter changes. Analytics habits from [How to Analyze On-Chain Wallet Data and Metrics Using Tools like Dune or Etherscan](/how-to/how-to-analyze-on-chain-wallet-data-and-metrics-using-tools-like-dune-or-etherscan) help you verify that what passed is what executed. Governance is stewardship—not a points farm. Keep voting wallets separate from savings vaults and revoke unused approvals after contentious votes ([How to Revoke Token Approvals to Protect Wallet Allowance Limits](/how-to/how-to-revoke-token-approvals-to-protect-wallet-allowance-limits)).",
          "11. Before voting, summarize the proposal in one sentence that states who gets money or power if it passes; if you cannot write that sentence, you are not ready to sign. After you vote, calendar a check on execution so passed proposals do not disappear into an unread timelock.",
        ],
      },
      {
        heading: "After you vote: execution monitoring and key hygiene",
        paragraphs: [
          "12. Once a proposal passes, switch from voter to operator. Note the timelock end, the execution transaction, and any [[multisig]] queue that still must sign. Compare executed calldata to the forum summary—parameter diffs and treasury recipients are where silent changes hide. If the DAO uses a dual off-chain vote plus on-chain execution path, confirm both legs rather than trusting a UI badge. Save proposal IDs, vote txids, and execution hashes in the same place you keep tax-adjacent records so disputes and retrospectives stay factual.",
          "13. Revisit delegation on a calendar, not only after drama. Delegates accumulate soft power; check their recent votes against your risk tolerance for emissions, grants, and upgrades. Revoke or rotate when incentives diverge. Keep a dedicated voting wallet with limited balances so a poisoned “governance” signature cannot drain primary funds—connection hygiene belongs with [How to Connect a Wallet to Decentralized Applications (dApps) Securely](/how-to/how-to-connect-a-wallet-to-decentralized-applications-dapps-securely). Never paste a [[seed phrase]] into a “voter registration” form.",
          "14. Treat treasury-moving proposals like financial transactions you personally underwrite. Read audits for new contracts, reject urgency theater, and size any governance-token exposure as volatile equity—not a points farm. Fake portals remain a primary loss path; type official URLs from docs you already trust and cross-check contracts on an explorer. For shared treasuries you help administer, align voting with multisig runbooks in [How to Set Up a Multisig Wallet for Shared Funds and DAO Treasuries](/how-to/how-to-set-up-a-multisig-wallet-for-shared-funds-and-dao-treasuries). Governance is stewardship: verify execution, protect keys, and document conflicts when you argue in public.",
        ],
      },
    ],
  },
];
