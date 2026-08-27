import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { getIndexCatalog, getPublishedIndexes } from "@/lib/indexes";
import { buildHubMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: "GetFreeBit Indexes",
    description:
      "Original, citable GetFreeBit datasets: faucet payouts, fees, and other rails operators can cite. First edition: Bitcoin Faucet Payout Index — August 2026.",
    path: "/indexes",
    keyword: "Bitcoin faucet payout index",
  }),
  title: { absolute: "Indexes · GetFreeBit" },
};

export default function IndexesHubPage() {
  const catalog = getIndexCatalog();
  const published = getPublishedIndexes();

  return (
    <SiteShell indexLayout>
      <section className="py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Indexes" },
          ]}
        />
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Research</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {catalog.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{catalog.description}</p>

        <ul className="mt-10 space-y-4">
          {published.map((entry) => (
            <li
              key={entry.id}
              className="rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                {entry.edition} · published
              </p>
              <h2 className="mt-1 font-display text-2xl text-ink">
                <Link href={entry.path!} className="hover:text-voice-dark">
                  {entry.title}
                </Link>
              </h2>
              <p className="mt-2 text-ink-muted">{entry.summary}</p>
              <Link
                href={entry.path!}
                className="mt-4 inline-flex text-sm font-medium text-voice-dark underline underline-offset-4"
              >
                Open the dataset
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-12 border-t border-paper-line pt-10">
          <h2 className="font-display text-2xl text-ink">Planned indexes</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            Same data-file pattern as this edition. Titles below are placeholders — they ship only
            when we can fetch real sources.
          </p>
          <ul className="mt-5 divide-y divide-paper-line rounded-xl border border-paper-line bg-paper-raised">
            {catalog.indexes
              .filter((entry) => entry.status === "planned")
              .map((entry) => (
                <li key={entry.id} className="px-4 py-3">
                  <p className="font-medium text-ink">{entry.title}</p>
                  <p className="text-sm text-ink-muted">{entry.summary}</p>
                </li>
              ))}
          </ul>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </section>
    </SiteShell>
  );
}
