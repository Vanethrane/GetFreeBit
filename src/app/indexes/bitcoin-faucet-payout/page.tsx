import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PayoutIndexTable } from "@/components/indexes/PayoutIndexTable";
import { QuickCopyButton } from "@/components/QuickCopyButton";
import { SiteShell } from "@/components/SiteChrome";
import {
  buildIndexDatasetJsonLd,
  getBitcoinFaucetPayoutIndex,
} from "@/lib/indexes";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

const INDEX = getBitcoinFaucetPayoutIndex();

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: INDEX.title,
    description: INDEX.summary,
    path: INDEX.path,
    keyword: "Bitcoin faucet payout index August 2026",
  }),
  title: { absolute: INDEX.title },
};

export default function BitcoinFaucetPayoutIndexPage() {
  const jsonLd = buildIndexDatasetJsonLd(INDEX);
  const onlineCount = INDEX.rows.filter((row) => row.status === "online").length;
  const unverifiedRates = INDEX.rows.filter(
    (row) => row.averageEarningRate.verification !== "verified",
  ).length;

  return (
    <SiteShell indexLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Indexes", href: "/indexes" },
            { label: "BTC faucet payout" },
          ]}
        />

        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">
            Dataset · {INDEX.edition}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {INDEX.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">{INDEX.summary}</p>
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
            <div>
              <dt className="inline text-ink-muted">Last checked: </dt>
              <dd className="inline">
                <time dateTime={INDEX.checkedAt}>{INDEX.checkedAt}</time> {INDEX.timezone}
              </dd>
            </div>
            <div>
              <dt className="inline text-ink-muted">Rows: </dt>
              <dd className="inline">
                {INDEX.rows.length} ({onlineCount} online)
              </dd>
            </div>
            <div>
              <dt className="inline text-ink-muted">Sats/hour trials: </dt>
              <dd className="inline">
                {unverifiedRates === INDEX.rows.length ? "none this edition" : `${INDEX.rows.length - unverifiedRates} measured`}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={INDEX.downloadJsonPath}
              download
              className="inline-flex items-center rounded-lg border border-paper-line bg-paper-raised px-4 py-2 text-sm font-medium text-ink hover:border-voice"
            >
              Download JSON
            </a>
            <a
              href={INDEX.downloadCsvPath}
              download
              className="inline-flex items-center rounded-lg border border-paper-line bg-paper-raised px-4 py-2 text-sm font-medium text-ink hover:border-voice"
            >
              Download CSV
            </a>
            <QuickCopyButton text={INDEX.citation.text} label="Copy citation" />
          </div>
        </header>

        <section className="mt-10" aria-labelledby="index-table-heading">
          <h2 id="index-table-heading" className="sr-only">
            Payout index table
          </h2>
          <PayoutIndexTable rows={INDEX.rows} />
          <p className="mt-3 text-xs text-ink-muted">
            Click a faucet name for sources, US notes, FaucetPay pairing, and risks. Sort any column
            header. Partner signup links use existing GetFreeBit referrals — official URLs are
            untracked.
          </p>
        </section>

        <section className="mt-12 border-t border-paper-line pt-10" aria-labelledby="methodology-heading">
          <h2 id="methodology-heading" className="font-display text-2xl text-ink">
            Methodology
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Edition {INDEX.methodology.edition}, checked{" "}
            <time dateTime={INDEX.methodology.checkedAt}>{INDEX.methodology.checkedAt}</time> ({INDEX.timezone}).
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink">
            What was checked
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-muted">
            {INDEX.methodology.whatWasChecked.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink">How</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-muted">
            {INDEX.methodology.how.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink">
            What was not measured
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-muted">
            {INDEX.methodology.notMeasured.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink">
            Limitations
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-muted">
            {INDEX.methodology.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border-t border-paper-line pt-10" aria-labelledby="cite-heading">
          <h2 id="cite-heading" className="font-display text-2xl text-ink">
            Cite this index
          </h2>
          <blockquote className="mt-3 rounded-xl border border-paper-line bg-paper-raised px-4 py-3 text-sm leading-relaxed text-ink">
            {INDEX.citation.apa}
          </blockquote>
          <p className="mt-3 text-sm text-ink-muted">
            Machine-readable copies:{" "}
            <a href={INDEX.downloadJsonPath} className="text-voice-dark underline underline-offset-2">
              JSON
            </a>{" "}
            ·{" "}
            <a href={INDEX.downloadCsvPath} className="text-voice-dark underline underline-offset-2">
              CSV
            </a>
            . Related operator desk:{" "}
            <Link href="/faucets" className="text-voice-dark underline underline-offset-2">
              faucet referrals
            </Link>
            .
          </p>
        </section>

        <section className="mt-12 border-t border-paper-line pt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-2xl text-ink">
            FAQ
          </h2>
          <dl className="mt-5 space-y-6">
            {INDEX.faqs.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-ink">{item.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure} This page is a dataset, not a sales ranking. Partner
          links appear only on rows that already have a verified GetFreeBit referral.
        </p>
      </article>
    </SiteShell>
  );
}
