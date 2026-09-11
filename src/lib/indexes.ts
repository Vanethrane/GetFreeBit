import catalogJson from "@/data/indexes/catalog.json";
import payoutIndexJson from "@/data/indexes/bitcoin-faucet-payout.json";
import { FAUCET_REFERRALS } from "@/data/faucet-referrals";
import { faucetSignupHref } from "@/lib/faucet-referrals";
import { absoluteCanonicalUrl } from "@/lib/canonical";
import { siteConfig } from "@/site.config";

export type IndexPublicationStatus = "published" | "planned";
export type IndexRowStatus = "online" | "degraded" | "offline" | "unverified";
export type FieldVerification = "verified" | "unverified" | "not_applicable";
export type IndexRowRole = "claim-faucet" | "payout-rail";

export type IndexCatalogEntry = {
  id: string;
  status: IndexPublicationStatus;
  title: string;
  edition: string | null;
  path: string | null;
  dataFile: string | null;
  pillar: string;
  summary: string;
};

export type IndexCatalog = {
  schemaVersion: number;
  id: string;
  title: string;
  description: string;
  pillar: string;
  indexes: IndexCatalogEntry[];
};

export type FieldCatalogItem = {
  id: string;
  label: string;
  description: string;
};

export type SourcedText = {
  value: string | null;
  verification: FieldVerification;
  sourceUrl: string | null;
  notes: string | null;
};

export type SourcedBoolean = {
  value: boolean | null;
  verification: FieldVerification;
  sourceUrl: string | null;
  notes: string | null;
};

export type SourcedAmount = {
  amount: number | null;
  unit: string | null;
  sats?: number | null;
  interval?: string | null;
  display: string | null;
  verification: FieldVerification;
  sourceUrl: string | null;
  notes: string | null;
};

export type IndexRow = {
  id: string;
  role: IndexRowRole;
  partnerId: string | null;
  faucetReferralId: string | null;
  faucet: {
    name: string;
    officialUrl: string;
  };
  payout: SourcedAmount;
  minimumWithdrawal: SourcedAmount;
  withdrawalMethod: SourcedText;
  fees: SourcedText;
  frequency: SourcedText;
  averageEarningRate: SourcedAmount;
  lastChecked: string;
  status: IndexRowStatus;
  usUsers: SourcedText;
  pairsWithFaucetPay: SourcedBoolean;
  notes: string;
  risks: string;
};

export type PublishedIndex = {
  schemaVersion: number;
  indexId: string;
  family: string;
  pillar: string;
  asset: string;
  edition: string;
  title: string;
  path: string;
  downloadJsonPath: string;
  downloadCsvPath: string;
  publishedAt: string;
  checkedAt: string;
  timezone: string;
  summary: string;
  citation: { text: string; apa: string };
  fieldCatalog: FieldCatalogItem[];
  methodology: {
    checkedAt: string;
    edition: string;
    whatWasChecked: string[];
    how: string[];
    notMeasured: string[];
    limitations: string[];
  };
  faqs: { question: string; answer: string }[];
  rows: IndexRow[];
};

const catalog = catalogJson as IndexCatalog;
const payoutIndex = payoutIndexJson as PublishedIndex;

export function getIndexCatalog(): IndexCatalog {
  return catalog;
}

export function getPublishedIndexes(): IndexCatalogEntry[] {
  return catalog.indexes.filter((entry) => entry.status === "published" && entry.path);
}

export function getBitcoinFaucetPayoutIndex(): PublishedIndex {
  return payoutIndex;
}

export function verificationLabel(value: FieldVerification): string {
  if (value === "verified") return "Verified";
  if (value === "not_applicable") return "n/a";
  return "Unverified";
}

export function statusLabel(status: IndexRowStatus): string {
  if (status === "online") return "Online";
  if (status === "degraded") return "Degraded";
  if (status === "offline") return "Offline";
  return "Unverified";
}

export function displaySourcedText(field: SourcedText | SourcedAmount): string {
  if ("display" in field && field.display) return field.display;
  if ("value" in field && typeof field.value === "string" && field.value) return field.value;
  if (field.verification === "not_applicable") return "Not applicable";
  return "Unverified";
}

export function displayBoolean(field: SourcedBoolean): string {
  if (field.verification === "unverified" && field.value === null) return "Unverified";
  if (field.value === true) return "Yes";
  if (field.value === false) return "No";
  return "Unverified";
}

export type ResolvedFaucetLinks = {
  officialUrl: string;
  partnerHref: string | null;
  partnerLive: boolean;
};

/** Affiliate href only from site.config partners or existing faucet-referrals — never invented. */
export function resolveFaucetLinks(row: IndexRow): ResolvedFaucetLinks {
  const officialUrl = row.faucet.officialUrl;
  if (row.partnerId) {
    const partner = siteConfig.partners.find((item) => item.id === row.partnerId);
    if (partner?.href) {
      return { officialUrl, partnerHref: partner.href, partnerLive: true };
    }
  }
  if (row.faucetReferralId) {
    const referral = FAUCET_REFERRALS.find((item) => item.id === row.faucetReferralId);
    if (referral?.live) {
      return { officialUrl, partnerHref: faucetSignupHref(referral), partnerLive: true };
    }
  }
  return { officialUrl, partnerHref: null, partnerLive: false };
}

const CSV_COLUMNS: { header: string; value: (row: IndexRow) => string }[] = [
  { header: "id", value: (row) => row.id },
  { header: "faucet", value: (row) => row.faucet.name },
  { header: "official_url", value: (row) => row.faucet.officialUrl },
  { header: "role", value: (row) => row.role },
  { header: "payout", value: (row) => displaySourcedText(row.payout) },
  { header: "payout_verification", value: (row) => row.payout.verification },
  { header: "payout_source", value: (row) => row.payout.sourceUrl ?? "" },
  { header: "minimum_withdrawal", value: (row) => displaySourcedText(row.minimumWithdrawal) },
  { header: "minimum_withdrawal_sats", value: (row) => row.minimumWithdrawal.sats == null ? "" : String(row.minimumWithdrawal.sats) },
  { header: "minimum_verification", value: (row) => row.minimumWithdrawal.verification },
  { header: "minimum_source", value: (row) => row.minimumWithdrawal.sourceUrl ?? "" },
  { header: "withdrawal_method", value: (row) => displaySourcedText(row.withdrawalMethod) },
  { header: "fees", value: (row) => displaySourcedText(row.fees) },
  { header: "frequency", value: (row) => displaySourcedText(row.frequency) },
  { header: "average_earning_rate", value: (row) => displaySourcedText(row.averageEarningRate) },
  { header: "average_earning_rate_verification", value: (row) => row.averageEarningRate.verification },
  { header: "last_checked", value: (row) => row.lastChecked },
  { header: "status", value: (row) => row.status },
  { header: "us_users", value: (row) => displaySourcedText(row.usUsers) },
  { header: "pairs_with_faucetpay", value: (row) => displayBoolean(row.pairsWithFaucetPay) },
  { header: "notes", value: (row) => row.notes },
  { header: "risks", value: (row) => row.risks },
];

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function payoutIndexToCsv(index: PublishedIndex = payoutIndex): string {
  const header = CSV_COLUMNS.map((col) => csvEscape(col.header)).join(",");
  const lines = index.rows.map((row) =>
    CSV_COLUMNS.map((col) => csvEscape(col.value(row))).join(","),
  );
  return [header, ...lines].join("\n") + "\n";
}

export function buildIndexDatasetJsonLd(index: PublishedIndex): Record<string, unknown> {
  const domain = siteConfig.domain;
  const pageUrl = absoluteCanonicalUrl(index.path, domain);
  const home = absoluteCanonicalUrl("/", domain);
  const orgId = `${home}#organization`;
  const datasetId = `${pageUrl}#dataset`;
  const faqId = `${pageUrl}#faq`;
  const jsonUrl = `${domain.replace(/\/$/, "")}${index.downloadJsonPath}`;
  const csvUrl = `${domain.replace(/\/$/, "")}${index.downloadCsvPath}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: siteConfig.name,
      url: home,
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: index.title,
      description: index.summary,
      datePublished: index.publishedAt,
      dateModified: index.checkedAt,
      isPartOf: { "@id": `${home}#website` },
      about: { "@id": datasetId },
      hasPart: [{ "@id": faqId }],
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: home,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Indexes",
          item: absoluteCanonicalUrl("/indexes", domain),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: index.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Dataset",
      "@id": datasetId,
      name: index.title,
      description: index.summary,
      url: pageUrl,
      identifier: index.indexId,
      version: index.edition,
      datePublished: index.publishedAt,
      dateModified: index.checkedAt,
      temporalCoverage: "2026-08",
      isAccessibleForFree: true,
      creator: { "@id": orgId },
      publisher: { "@id": orgId },
      keywords: [
        "Bitcoin",
        "BTC",
        "faucet",
        "payout",
        "satoshi",
        "FaucetPay",
        "withdrawal minimum",
      ],
      variableMeasured: index.fieldCatalog.map((field) => ({
        "@type": "PropertyValue",
        name: field.label,
        description: field.description,
      })),
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: jsonUrl,
        },
        {
          "@type": "DataDownload",
          encodingFormat: "text/csv",
          contentUrl: csvUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      url: pageUrl,
      inLanguage: "en-US",
      mainEntity: index.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
