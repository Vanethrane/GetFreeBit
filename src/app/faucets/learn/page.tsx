import Link from "next/link";
import type { Metadata } from "next";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { listFaucetClusterArticles } from "@/data/faucet-cluster-content";
import {
  clusterHowtoNodes,
  clusterLearnNodes,
  clusterToolNodes,
  getBitcoinFaucetsCluster,
} from "@/lib/topic-clusters";
import { buildHubMetadata } from "@/lib/site-metadata";
import { SiteShell } from "@/components/SiteChrome";

const cluster = getBitcoinFaucetsCluster();

export const metadata: Metadata = {
  ...buildHubMetadata({
    title: cluster.hubTitle,
    description: cluster.hubDescription,
    path: cluster.hubPath,
    keyword: "bitcoin faucet guide",
  }),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Bitcoin Faucets",
    keyword: "bitcoin faucet cluster",
  }),
};

export default function FaucetLearnHubPage() {
  const pillar = clusterLearnNodes(cluster).find((n) => n.role === "pillar");
  const spokes = clusterLearnNodes(cluster).filter((n) => n.role === "spoke");
  const howtos = clusterHowtoNodes(cluster);
  const tools = clusterToolNodes(cluster);
  const clusterArticles = listFaucetClusterArticles();

  return (
    <SiteShell>
      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Learn</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Bitcoin Faucets — topical cluster
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          One pillar, linked spokes, and tools that point back to education—not isolated blog posts.
          Start with the definition, follow payout mechanics, then use the database when you are
          ready to compare live minimums.
        </p>

        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
          <div className="space-y-10">
            {pillar ? (
              <section className="rounded-2xl border-2 border-voice/30 bg-voice-glow/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
                  Pillar
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink">
                  <Link href={pillar.path} className="hover:text-voice-dark">
                    {pillar.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pillar.blurb}</p>
                <Link
                  href={pillar.path}
                  className="mt-4 inline-flex text-sm font-semibold text-voice-dark underline underline-offset-4"
                >
                  Read the pillar guide →
                </Link>
              </section>
            ) : null}

            <section>
              <h2 className="font-display text-2xl text-ink">Spoke guides</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Each page targets one search intent and links to siblings in this cluster.
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {spokes.map((node) => (
                  <li
                    key={node.id}
                    className="rounded-xl border border-paper-line bg-paper-raised p-4 shadow-sm"
                  >
                    <h3 className="font-display text-lg text-ink">
                      <Link href={node.path} className="hover:text-voice-dark">
                        {node.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{node.blurb}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">Cluster-native articles</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {clusterArticles.length} guides live under{" "}
                <code className="text-xs">/faucets/learn/</code> with cross-links baked in.
              </p>
            </section>

            {howtos.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl text-ink">Setup how-tos</h2>
                <ul className="mt-4 space-y-3">
                  {howtos.map((node) => (
                    <li key={node.id} className="text-sm">
                      <Link
                        href={node.path}
                        className="font-medium text-voice-dark underline underline-offset-2"
                      >
                        {node.title}
                      </Link>
                      <span className="text-ink-muted"> — {node.blurb}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-xl border border-paper-line bg-paper p-5">
              <h2 className="font-display text-xl text-ink">Tools link back here</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The referral desk and payout database are part of this cluster—not separate
                monetization silos. Read minimums and scams before you register.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {tools.map((node) => (
                  <Link
                    key={node.id}
                    href={node.path}
                    className="inline-flex rounded-lg border border-paper-line bg-paper-raised px-4 py-2 text-sm font-medium text-voice-dark hover:border-voice/40"
                  >
                    {node.title}
                  </Link>
                ))}
              </div>
            </section>

            <p className="text-sm text-ink-muted">
              <Link href="/faucets" className="underline underline-offset-4 hover:text-voice-dark">
                ← Faucet referral desk
              </Link>
            </p>
          </div>

          <div className="mt-8 lg:mt-0">
            <TopicClusterNav currentPath={cluster.hubPath} variant="full" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
