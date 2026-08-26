/**
 * Copy editioned index JSON into public/ and emit a matching CSV.
 * Source of truth remains src/data/indexes/*.json.
 */
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src/data/indexes/bitcoin-faucet-payout.json");
const PUBLIC_DIR = join(ROOT, "public/indexes");

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function displayAmount(field) {
  if (field?.display) return field.display;
  if (field?.value) return field.value;
  if (field?.verification === "not_applicable") return "Not applicable";
  return "Unverified";
}

function displayBool(field) {
  if (field?.verification === "unverified" && field.value == null) return "Unverified";
  if (field?.value === true) return "Yes";
  if (field?.value === false) return "No";
  return "Unverified";
}

const index = JSON.parse(readFileSync(SRC, "utf8"));
mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(join(PUBLIC_DIR, "bitcoin-faucet-payout.json"), `${JSON.stringify(index, null, 2)}\n`);

const columns = [
  ["id", (row) => row.id],
  ["faucet", (row) => row.faucet.name],
  ["official_url", (row) => row.faucet.officialUrl],
  ["role", (row) => row.role],
  ["payout", (row) => displayAmount(row.payout)],
  ["payout_verification", (row) => row.payout.verification],
  ["payout_source", (row) => row.payout.sourceUrl || ""],
  ["minimum_withdrawal", (row) => displayAmount(row.minimumWithdrawal)],
  ["minimum_withdrawal_sats", (row) => row.minimumWithdrawal.sats ?? ""],
  ["minimum_verification", (row) => row.minimumWithdrawal.verification],
  ["minimum_source", (row) => row.minimumWithdrawal.sourceUrl || ""],
  ["withdrawal_method", (row) => displayAmount(row.withdrawalMethod)],
  ["fees", (row) => displayAmount(row.fees)],
  ["frequency", (row) => displayAmount(row.frequency)],
  ["average_earning_rate", (row) => displayAmount(row.averageEarningRate)],
  ["average_earning_rate_verification", (row) => row.averageEarningRate.verification],
  ["last_checked", (row) => row.lastChecked],
  ["status", (row) => row.status],
  ["us_users", (row) => displayAmount(row.usUsers)],
  ["pairs_with_faucetpay", (row) => displayBool(row.pairsWithFaucetPay)],
  ["notes", (row) => row.notes],
  ["risks", (row) => row.risks],
];

const header = columns.map(([name]) => csvEscape(name)).join(",");
const lines = index.rows.map((row) =>
  columns.map(([, fn]) => csvEscape(fn(row))).join(","),
);
writeFileSync(join(PUBLIC_DIR, "bitcoin-faucet-payout.csv"), [header, ...lines].join("\n") + "\n");

console.log(`Wrote public/indexes/bitcoin-faucet-payout.json and .csv (${index.rows.length} rows)`);
