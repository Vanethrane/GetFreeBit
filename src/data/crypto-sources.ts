/**
 * Primary-source registry for crypto factual claims.
 * Prefer these over secondary blogs. Link to the specific doc when possible.
 */

export type CryptoSourceId =
  | "bitcoin-core"
  | "bitcoin-dev"
  | "bip"
  | "lightning"
  | "irs"
  | "sec"
  | "cftc"
  | "fincen"
  | "mempool-space"
  | "getfreebit";

export type CryptoSourceDef = {
  id: CryptoSourceId;
  /** Display label for "Source: …" */
  label: string;
  /** Canonical org/doc landing page */
  url: string;
};

export const CRYPTO_SOURCES: Record<CryptoSourceId, CryptoSourceDef> = {
  "bitcoin-core": {
    id: "bitcoin-core",
    label: "Bitcoin Core documentation",
    url: "https://bitcoin.org/en/developer-documentation",
  },
  "bitcoin-dev": {
    id: "bitcoin-dev",
    label: "Bitcoin Developer Documentation",
    url: "https://developer.bitcoin.org/devguide/index.html",
  },
  bip: {
    id: "bip",
    label: "Bitcoin Improvement Proposals (BIP-141 SegWit, BIP-125 RBF)",
    url: "https://github.com/bitcoin/bips",
  },
  lightning: {
    id: "lightning",
    label: "Lightning Network documentation",
    url: "https://docs.lightning.engineering/",
  },
  irs: {
    id: "irs",
    label: "IRS — Digital assets",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets",
  },
  sec: {
    id: "sec",
    label: "SEC — Investor.gov (crypto assets)",
    url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-alert-sec-staff-issues-statement-crypto-asset-securities",
  },
  cftc: {
    id: "cftc",
    label: "CFTC — Digital assets",
    url: "https://www.cftc.gov/digitalassets/index.htm",
  },
  fincen: {
    id: "fincen",
    label: "FinCEN — Virtual currency guidance",
    url: "https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering",
  },
  "mempool-space": {
    id: "mempool-space",
    label: "Mempool.space (fee estimates & block data)",
    url: "https://mempool.space/docs/faq",
  },
  getfreebit: {
    id: "getfreebit",
    label: "GetFreeBit",
    url: "https://www.getfreebit.com/about",
  },
};

/** One attributed block: primary source fact + optional GetFreeBit interpretation */
export type SourceAttributionBlock = {
  sourceId: CryptoSourceId;
  /** Override default registry URL (specific fee schedule, form, BIP, etc.) */
  url?: string;
  /** What the primary source states — paraphrase with link, do not imply endorsement */
  sourceNote?: string;
  /** Editorial framing, calculator assumptions, or risk context */
  analysis?: string;
};

export function getSourceDef(id: CryptoSourceId): CryptoSourceDef {
  return CRYPTO_SOURCES[id];
}
