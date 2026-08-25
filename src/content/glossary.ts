/** Shared crypto glossary — terms marked [[like this]] in guide paragraphs. */
export const GLOSSARY: Record<string, string> = {
  "seed phrase":
    "Usually 12 or 24 words that recreate your wallet. Anyone with the phrase controls the funds—never type it into a website.",
  "private key":
    "The secret that signs transactions for an address. Seed phrases derive many private keys; treat both as cash in cleartext.",
  "public address":
    "The shareable destination for deposits (e.g. 0x… on Ethereum). Safe to publish; it cannot spend funds by itself.",
  "gas":
    "Network fee paid to validators/miners to include your transaction. Priced in the chain’s native token (ETH, MATIC, etc.).",
  "gas fees":
    "The total cost of a transaction: gas used × gas price (plus L2 data fees on some networks).",
  "gwei":
    "A billionth of one ETH. Gas prices on Ethereum are commonly quoted in gwei.",
  "slippage":
    "How much worse your fill can be versus the quoted price on a DEX before the swap reverts or adjusts.",
  "MEV":
    "Maximal extractable value—bots reordering or sandwiching trades for profit. Affects DEX users on public mempools.",
  "DEX":
    "Decentralized exchange—smart contracts that swap tokens without a custodial order book (e.g. Uniswap).",
  "CEX":
    "Centralized exchange (Binance, Coinbase, Kraken) that holds custody until you withdraw.",
  "KYC":
    "Know Your Customer identity checks required by most regulated exchanges before fiat or higher limits.",
  "self-custody":
    "You hold the keys (hardware or software wallet). No exchange can freeze the funds—but recovery is your job.",
  "hardware wallet":
    "A device (Ledger, Trezor, Keystone) that signs transactions offline so keys never leave the secure element.",
  "hot wallet":
    "Software wallet on a phone/browser that’s convenient but more exposed to malware and phishing.",
  "cold storage":
    "Keys kept offline for long-term holdings—hardware wallets or air-gapped setups.",
  "phishing":
    "Fake sites, DMs, or airdrops that trick you into signing malicious approvals or revealing a seed phrase.",
  "approval":
    "ERC-20 permit allowing a contract to move your tokens. Unlimited approvals are a common drain vector—revoke unused ones.",
  "allowance":
    "How many tokens a spender is approved to move. Check and revoke on revoke.cash or your wallet’s built-in tools.",
  "smart contract":
    "On-chain program that holds logic and often funds. Bugs and admin keys create risk beyond price volatility.",
  "TVL":
    "Total value locked—assets deposited in a protocol. High TVL is not a security guarantee.",
  "APY":
    "Annual percentage yield assuming compounding. Compare APY vs APR and ask what risk produces the rate.",
  "APR":
    "Annual percentage rate without compounding. Useful for comparing simple lending interest.",
  "impermanent loss":
    "When providing AMM liquidity, token price moves can leave you with fewer assets in value terms than holding both.",
  "AMM":
    "Automated market maker—pools priced by formulas (x·y=k) instead of order books.",
  "liquidity pool":
    "Tokens locked in an AMM so traders can swap against them. LPs earn fees and take inventory risk.",
  "LSD":
    "Liquid staking derivative (stETH, rETH)—a token representing staked ETH that stays tradable.",
  "restaking":
    "Reusing staked assets (often via EigenLayer-style systems) to secure extra services—extra yield, extra slash risk.",
  "LRT":
    "Liquid restaking token—receipt for restaked positions. Layered smart-contract and operator risk.",
  "slash":
    "Penalty that destroys part of a validator’s stake for downtime or equivocation.",
  "validator":
    "Node that proposes/attests blocks in proof-of-stake. Requires capital, uptime, and correct keys.",
  "proof of stake":
    "Consensus where validators lock capital instead of burning electricity (as in proof of work).",
  "layer 2":
    "Scaling network that settles to Ethereum (or another L1)—e.g. Arbitrum, Base, Optimism—usually cheaper gas.",
  "L2":
    "Shorthand for layer 2. Always confirm which bridge and canonical bridge you are using.",
  "bridge":
    "Moves assets between chains. Canonical bridges are slower/safer; third-party bridges add contract risk.",
  "testnet":
    "Practice network with worthless tokens. Use a throwaway wallet—never your main seed.",
  "mainnet":
    "Production network with real value. Double-check chain IDs before signing.",
  "airdrop":
    "Token distribution to users who met criteria (usage, holding, points). Often gamed; Sybil filters apply.",
  "Sybil":
    "One person running many wallets to farm rewards. Protocols ban or dilute Sybil farms.",
  "points program":
    "Off-chain score for activity that may (or may not) convert to a future token.",
  "faucet":
    "Site or contract that drips small amounts of crypto—often for testnets or micro-earning.",
  "micro-wallet":
    "Low-friction wallet (e.g. FaucetPay) for tiny faucet payouts before sweeping to self-custody.",
  "satoshi":
    "One hundred-millionth of a bitcoin (0.00000001 BTC).",
  "UTXO":
    "Bitcoin’s unspent transaction output model—coins are discrete “notes,” not account balances.",
  "account model":
    "Ethereum-style balances per address, updated by smart contracts and EOAs.",
  "EOA":
    "Externally owned account—a normal wallet controlled by keys, not a contract.",
  "multisig":
    "Wallet needing M-of-N signatures (e.g. 2-of-3) before spending—reduces single-key failure.",
  "RPC":
    "Remote endpoint your wallet uses to read/write the chain. Malicious RPCs can lie about state.",
  "mempool":
    "Waiting room of pending transactions before inclusion in a block.",
  "nonce":
    "Per-address transaction counter on account-based chains. Stuck txs often need a replacement nonce.",
  "stablecoin":
    "Token targeting a stable value (usually USD). Backing and redemption rules differ (USDC, USDT, DAI).",
  "perp":
    "Perpetual futures—leveraged derivative with no expiry, funded by periodic funding rates.",
  "funding rate":
    "Periodic payment between longs and shorts on perps to keep the contract near spot.",
  "spot":
    "Buying/selling the actual asset (or claim on it) without leverage.",
  "DCA":
    "Dollar-cost averaging—buying fixed notional on a schedule to reduce timing luck.",
  "rug pull":
    "Team drains liquidity or abandons a project after raising funds—common in unverified tokens.",
  "honeypot":
    "Token you can buy but not sell due to malicious contract logic.",
  "revoke":
    "Cancel a token approval so a contract can no longer move your funds.",
  "block explorer":
    "Site like Etherscan for inspecting txs, contracts, and token holdings.",
  "ENS":
    "Ethereum Name Service—human-readable names (vitalik.eth) that resolve to addresses.",
  "custody":
    "Who holds the keys. Exchange custody ≠ self-custody.",
  "withdrawal lock":
    "Time delay before you can exit staking or a platform—plan liquidity around it.",
  "unbonding period":
    "Mandatory wait after unstaking on many PoS chains before tokens are transferable.",
  "oracle":
    "Service that feeds off-chain prices on-chain. Bad oracles break lending and perps.",
  "collateral":
    "Assets locked to borrow against. Price drops can trigger liquidation.",
  "liquidation":
    "Forced sale of collateral when your loan health factor falls too low.",
  "health factor":
    "Lending ratio of collateral value to debt. Below 1 typically means liquidatable.",
  "AMM fee tier":
    "Uniswap-style pool fee (0.01%, 0.05%, 0.3%, 1%) paid to LPs on each swap.",
  "FaucetPay":
    "Popular micro-wallet that aggregates faucet balances across many coins for later withdrawal.",
  "offerwall":
    "Task marketplace (surveys, installs) that pays crypto—high variance, lots of geo restrictions.",
  "P2P":
    "Peer-to-peer trading—often used for local currency on/off ramps with escrow risk.",
  "travel rule":
    "AML requirement for VASPs to share sender/receiver info above thresholds on transfers.",
  "VASP":
    "Virtual Asset Service Provider—regulated crypto business such as an exchange.",
  "cold wallet":
    "Same idea as cold storage—keys offline. Prefer hardware over printed paper alone.",
  "browser wallet":
    "Extension wallet (MetaMask, Rabby). Convenient; high phishing surface—use a separate burn address for experiments.",
  "simulation":
    "Wallet preview of what a transaction will do. Always read it before signing.",
  "EIP-1559":
    "Ethereum fee market with base fee burned and tip to validators—improves fee predictability.",
  "blob":
    "Post-Dencun data space used by many L2s to post cheaply—major reason L2 fees fell.",
  "canonical bridge":
    "Official bridge of an L2. Withdrawals can take ~7 days on optimistic rollups.",
  "optimistic rollup":
    "L2 that assumes txs are valid unless challenged during a fraud-proof window.",
  "ZK rollup":
    "L2 that posts validity proofs. Withdrawal UX differs from optimistic designs.",
  "staking":
    "Locking assets to help secure a network (or a protocol) in exchange for rewards—and slash/risk exposure.",
  "native staking":
    "Staking directly with the protocol (e.g. 32 ETH validator) rather than via a liquid receipt token.",
  "CEX withdrawal":
    "Moving coins from an exchange to an address you control. Always send a test amount first.",
  "test amount":
    "Small first transfer to verify address, network, and memo/tag before sending the full balance.",
  "memo":
    "Destination tag/memo required by some exchanges (XRP, XLM, ATOM deposits). Missing it can lose funds.",
  "chain ID":
    "Numeric network identifier. Signing the wrong chain ID is a classic bridge/wallet mistake.",
  "token contract":
    "The smart contract address of an ERC-20/BEP-20 asset. Always verify on the explorer—tickers are not unique.",
  "airdrop farming":
    "Deliberate activity to qualify for anticipated distributions. Costs gas and can fail Sybil checks.",
  "points":
    "Non-transferable scoreboards used by many protocols before a TGE—no guaranteed conversion rate.",
  "TGE":
    "Token generation event—when a project’s token first becomes transferable.",
};

export function glossaryDefinition(term: string): string | undefined {
  const key = term.trim().toLowerCase();
  if (GLOSSARY[key]) return GLOSSARY[key];
  // try without trailing s
  if (key.endsWith("s") && GLOSSARY[key.slice(0, -1)]) return GLOSSARY[key.slice(0, -1)];
  return undefined;
}
