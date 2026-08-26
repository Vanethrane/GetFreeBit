"use client";

import { Fragment, useMemo, useState } from "react";
import {
  displayBoolean,
  displaySourcedText,
  resolveFaucetLinks,
  statusLabel,
  verificationLabel,
  type FieldVerification,
  type IndexRow,
  type IndexRowStatus,
} from "@/lib/indexes";

type SortKey =
  | "faucet"
  | "payout"
  | "minimumWithdrawal"
  | "withdrawalMethod"
  | "fees"
  | "frequency"
  | "averageEarningRate"
  | "lastChecked"
  | "status";

type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "faucet", label: "Faucet" },
  { key: "payout", label: "Typical BTC payout" },
  { key: "minimumWithdrawal", label: "Minimum withdrawal" },
  { key: "withdrawalMethod", label: "Withdrawal method" },
  { key: "fees", label: "Fees" },
  { key: "frequency", label: "Frequency" },
  { key: "averageEarningRate", label: "Avg. earning rate" },
  { key: "lastChecked", label: "Last checked" },
  { key: "status", label: "Status" },
];

const STATUS_RANK: Record<IndexRowStatus, number> = {
  online: 0,
  degraded: 1,
  unverified: 2,
  offline: 3,
};

function sortValue(row: IndexRow, key: SortKey): string | number {
  if (key === "faucet") return row.faucet.name.toLowerCase();
  if (key === "lastChecked") return row.lastChecked;
  if (key === "status") return STATUS_RANK[row.status];
  if (key === "minimumWithdrawal") {
    if (row.minimumWithdrawal.sats != null) return row.minimumWithdrawal.sats;
    if (row.minimumWithdrawal.amount != null) return row.minimumWithdrawal.amount;
    return Number.POSITIVE_INFINITY;
  }
  if (key === "payout") return displaySourcedText(row.payout).toLowerCase();
  if (key === "withdrawalMethod") return displaySourcedText(row.withdrawalMethod).toLowerCase();
  if (key === "fees") return displaySourcedText(row.fees).toLowerCase();
  if (key === "frequency") return displaySourcedText(row.frequency).toLowerCase();
  return displaySourcedText(row.averageEarningRate).toLowerCase();
}

function verifyClass(verification: FieldVerification): string {
  if (verification === "verified") return "text-signal-dark";
  if (verification === "not_applicable") return "text-ink-muted";
  return "text-amber-800";
}

function statusClass(status: IndexRowStatus): string {
  if (status === "online") return "bg-signal-glow/70 text-signal-dark";
  if (status === "degraded") return "bg-voice-glow text-voice-dark";
  if (status === "offline") return "bg-red-100 text-red-800";
  return "bg-paper text-ink-muted";
}

function CellNote({
  verification,
  sourceUrl,
}: {
  verification: FieldVerification;
  sourceUrl: string | null;
}) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] leading-snug">
      <span className={verifyClass(verification)}>{verificationLabel(verification)}</span>
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-voice-dark underline-offset-2 hover:underline"
        >
          Source
        </a>
      ) : null}
    </div>
  );
}

export function PayoutIndexTable({ rows }: { rows: IndexRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("faucet");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [openId, setOpenId] = useState<string | null>(rows[0]?.id ?? null);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  function onSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "status" || key === "lastChecked" ? "desc" : "asc");
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-paper-line bg-paper-raised shadow-sm">
      <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Bitcoin faucet payout fields, sortable by column. Expand a row for sources, US notes, and
          risks.
        </caption>
        <thead>
          <tr className="border-b border-paper-line bg-paper/80 text-[11px] uppercase tracking-wide text-ink-muted">
            {COLUMNS.map((col) => {
              const active = sortKey === col.key;
              return (
                <th key={col.key} scope="col" className="px-3 py-3 font-medium first:sticky first:left-0 first:z-[1] first:bg-paper/95">
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className="inline-flex items-center gap-1 text-left hover:text-ink"
                    aria-pressed={active}
                  >
                    {col.label}
                    <span aria-hidden="true" className="text-[10px] text-ink-muted">
                      {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const links = resolveFaucetLinks(row);
            const expanded = openId === row.id;
            return (
              <Fragment key={row.id}>
                <tr className="border-b border-paper-line/80 align-top hover:bg-paper/50">
                  <th
                    scope="row"
                    className="sticky left-0 z-[1] bg-paper-raised px-3 py-3 font-medium text-ink"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(expanded ? null : row.id)}
                      className="text-left hover:text-voice-dark"
                      aria-expanded={expanded}
                    >
                      {row.faucet.name}
                    </button>
                    <div className="mt-1 text-[11px] font-normal text-ink-muted">
                      {row.role === "payout-rail" ? "Payout rail" : "Claim faucet"}
                    </div>
                  </th>
                  <td className="px-3 py-3 text-ink">
                    {displaySourcedText(row.payout)}
                    <CellNote verification={row.payout.verification} sourceUrl={row.payout.sourceUrl} />
                  </td>
                  <td className="px-3 py-3 text-ink">
                    {displaySourcedText(row.minimumWithdrawal)}
                    <CellNote
                      verification={row.minimumWithdrawal.verification}
                      sourceUrl={row.minimumWithdrawal.sourceUrl}
                    />
                  </td>
                  <td className="px-3 py-3 text-ink">
                    {displaySourcedText(row.withdrawalMethod)}
                    <CellNote
                      verification={row.withdrawalMethod.verification}
                      sourceUrl={row.withdrawalMethod.sourceUrl}
                    />
                  </td>
                  <td className="px-3 py-3 text-ink">
                    {displaySourcedText(row.fees)}
                    <CellNote verification={row.fees.verification} sourceUrl={row.fees.sourceUrl} />
                  </td>
                  <td className="px-3 py-3 text-ink">
                    {displaySourcedText(row.frequency)}
                    <CellNote
                      verification={row.frequency.verification}
                      sourceUrl={row.frequency.sourceUrl}
                    />
                  </td>
                  <td className="px-3 py-3 text-ink">
                    {displaySourcedText(row.averageEarningRate)}
                    <CellNote
                      verification={row.averageEarningRate.verification}
                      sourceUrl={row.averageEarningRate.sourceUrl}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-ink-muted">
                    <time dateTime={row.lastChecked}>{row.lastChecked}</time>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(row.status)}`}
                    >
                      {statusLabel(row.status)}
                    </span>
                  </td>
                </tr>
                {expanded ? (
                  <tr className="border-b border-paper-line bg-paper/40">
                    <td colSpan={COLUMNS.length} className="px-3 py-4">
                      <div className="grid gap-4 text-sm md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                            Official URL
                          </p>
                          <a
                            href={links.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-voice-dark underline underline-offset-2"
                          >
                            {links.officialUrl.replace(/^https?:\/\//, "")}
                          </a>
                          {links.partnerHref ? (
                            <p className="mt-2">
                              <a
                                href={links.partnerHref}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="font-medium text-voice-dark underline underline-offset-2"
                              >
                                Open via GetFreeBit partner link
                              </a>
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                            US users
                          </p>
                          <p className="mt-1 text-ink">{displaySourcedText(row.usUsers)}</p>
                          <CellNote verification={row.usUsers.verification} sourceUrl={row.usUsers.sourceUrl} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                            Pairs with FaucetPay
                          </p>
                          <p className="mt-1 text-ink">{displayBoolean(row.pairsWithFaucetPay)}</p>
                          <CellNote
                            verification={row.pairsWithFaucetPay.verification}
                            sourceUrl={row.pairsWithFaucetPay.sourceUrl}
                          />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                            Notes
                          </p>
                          <p className="mt-1 text-ink-muted">{row.notes}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                            Risks
                          </p>
                          <p className="mt-1 rounded-lg border border-paper-line bg-paper-raised px-3 py-2 text-ink-muted">
                            {row.risks}
                          </p>
                        </div>
                        {row.payout.notes ? (
                          <p className="md:col-span-2 text-xs text-ink-muted">
                            <span className="font-medium text-ink">Payout notes: </span>
                            {row.payout.notes}
                          </p>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
