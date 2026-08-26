import Link from "next/link";
import { GuideRichText } from "@/components/GuideRichText";
import { SourceAttribution } from "@/components/SourceAttribution";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import type { ClusterArticle } from "@/data/faucet-cluster-content";
import { getBitcoinFaucetsCluster, resolveClusterNodes } from "@/lib/topic-clusters";
import { SiteShell, Prose } from "@/components/SiteChrome";
import { siteConfig } from "@/site.config";

type Props = {
  article: ClusterArticle;
  path: string;
};

export function ClusterArticleView({ article, path }: Props) {
  const cluster = getBitcoinFaucetsCluster();
  const related = resolveClusterNodes(cluster, article.relatedNodeIds);

  return (
    <SiteShell>
      <article className="py-12">
        <nav className="text-sm text-ink-muted">
          <Link href="/faucets" className="hover:text-voice-dark">
            Faucets
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link href={cluster.hubPath} className="hover:text-voice-dark">
            Bitcoin Faucets
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-ink">{article.h1}</span>
        </nav>

        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Learn</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {article.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{article.lede}</p>

            <Prose>
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <GuideRichText text={section.body} />
                </section>
              ))}
            </Prose>

            {article.sources && article.sources.length > 0 ? (
              <SourceAttribution blocks={article.sources} />
            ) : null}

            <section className="mt-10 rounded-xl border border-paper-line bg-paper-raised p-5">
              <h2 className="font-display text-xl text-ink">Related in this cluster</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {related.map((node) => (
                  <li key={node.id}>
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

            <p className="mt-10 text-xs leading-relaxed text-ink-muted">
              {siteConfig.affiliateDisclosure}
            </p>
          </div>

          <div className="mt-10 lg:mt-0">
            <TopicClusterNav currentPath={path} variant="compact" />
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
