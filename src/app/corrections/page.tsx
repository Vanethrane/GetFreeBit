import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import {
  CORRECTIONS_PAGE,
  formatCorrectionDate,
  listCorrections,
  type CorrectionEntry,
} from "@/data/corrections";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: CORRECTIONS_PAGE.title,
    description: CORRECTIONS_PAGE.description,
    path: CORRECTIONS_PAGE.path,
    keyword: "getfreebit corrections",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: CORRECTIONS_PAGE.title,
    keyword: "corrections log",
  }),
};

function CorrectionRow({ entry }: { entry: CorrectionEntry }) {
  return (
    <li className="border-t border-paper-line/80 py-5 first:border-t-0 first:pt-0">
      <p className="text-sm font-medium text-ink-muted">
        <time dateTime={entry.date}>{formatCorrectionDate(entry.date)}</time>
        <span className="mx-2 text-paper-line" aria-hidden>
          ·
        </span>
        <span className="uppercase tracking-[0.12em] text-[0.65rem]">{entry.category}</span>
      </p>
      <p className="mt-2 leading-relaxed text-ink">
        <span className="font-medium">Corrected:</span> {entry.summary}
      </p>
      {entry.pagePath && entry.pageLabel ? (
        <p className="mt-2 text-sm text-ink-muted">
          Page:{" "}
          <Link
            href={entry.pagePath}
            className="text-signal-dark underline underline-offset-2 hover:text-signal"
          >
            {entry.pageLabel}
          </Link>
        </p>
      ) : null}
    </li>
  );
}

export default function CorrectionsPage() {
  const entries = listCorrections();

  return (
    <SiteShell>
      <article className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Trust</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Corrections log
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          When we get a number, fee, minimum, or date wrong, we fix it and record the change here.
          This log is part of how {siteConfig.name} stays accountable—not a content farm that
          quietly rewrites pages.
        </p>

        <div className="mt-6 rounded-xl border border-signal/25 bg-signal-glow/30 px-4 py-3 text-sm leading-relaxed text-ink">
          <strong className="font-semibold">What belongs here:</strong> verified factual corrections
          (payout minimums, withdrawal fees, halving dates, tax wording, broken tool assumptions).
          Opinion changes and SEO title tweaks do not get logged.
        </div>

        <section className="mt-12" aria-labelledby="corrections-log-heading">
          <h2 id="corrections-log-heading" className="font-display text-2xl tracking-tight text-ink">
            Published corrections
          </h2>
          {entries.length === 0 ? (
            <p className="mt-4 text-ink-muted">No published corrections yet.</p>
          ) : (
            <ol className="mt-6 list-none">
              {entries.map((entry, i) => (
                <CorrectionRow key={`${entry.date}-${i}`} entry={entry} />
              ))}
            </ol>
          )}
        </section>

        <section id="report" className="mt-14 scroll-mt-8" aria-labelledby="report-heading">
          <h2 id="report-heading" className="font-display text-2xl tracking-tight text-ink">
            Report a correction
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
            Found an error on a calculator, faucet desk, guide, or tool page? Tell us the page URL,
            what we got wrong, and what the correct value or source is (exchange fee schedule, faucet
            FAQ, IRS page, etc.). We verify before publishing a log entry.
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`[${siteConfig.name}] Correction report`)}`}
              className="text-signal-dark underline underline-offset-2"
            >
              {siteConfig.contactEmail}
            </a>{" "}
            or use the form below.
          </p>
          <div className="mt-8">
            <ContactForm defaultTopic="correction" />
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
