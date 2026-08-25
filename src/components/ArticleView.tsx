import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideRichText } from "@/components/GuideRichText";
import { HeadMetadata } from "@/components/HeadMetadata";
import { RelatedToolsConversions } from "@/components/RelatedToolsConversions";
import { SiteShell, Prose } from "@/components/SiteChrome";
import type { Article, ArticleKind } from "@/content/types";
import { articleWordCount } from "@/content/types";
import { getPageLanguageMeta } from "@/lib/dataset";
import { siteConfig } from "@/site.config";

const kindLabel: Record<ArticleKind, string> = {
  guide: "Guide",
  howto: "How-to",
  news: "News",
};

const kindIndex: Record<ArticleKind, { href: string; label: string; hub: string }> = {
  guide: { href: "/guides", label: "All guides", hub: "Guides" },
  howto: { href: "/how-to", label: "All how-tos", hub: "How-tos" },
  news: { href: "/news", label: "All news", hub: "News" },
};

function schemaPageType(kind: ArticleKind): "guide" | "howto" | "news" {
  return kind;
}

export function ArticleView({ article }: { article: Article }) {
  const words = articleWordCount(article);
  const pageMeta = getPageLanguageMeta(article.slug);
  const base =
    article.kind === "guide" ? "/guides" : article.kind === "howto" ? "/how-to" : "/news";
  const path = `${base}/${article.slug}`;
  const index = kindIndex[article.kind];

  return (
    <SiteShell>
      <HeadMetadata
        slug={article.slug}
        name={pageMeta?.name || article.title}
        description={article.description}
        path={path}
        pageType={schemaPageType(article.kind)}
        articleKind={article.kind}
        publishedAt={article.publishedAt}
        readingMinutes={article.readingMinutes}
      />
      <article className="pb-12 pt-1">
        <Breadcrumbs
          items={[
            { label: siteConfig.name, href: "/" },
            { label: index.hub, href: index.href },
            { label: article.title },
          ]}
        />
        <header className="mt-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">
            {kindLabel[article.kind]}
          </p>
          <h1 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink sm:mt-3 sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
            {article.description}
          </p>
          <p className="mt-2 text-xs text-ink-muted sm:text-sm">
            <time dateTime={article.publishedAt}>{article.publishedAt}</time> ·{" "}
            {article.readingMinutes} min read · {words} words
          </p>
        </header>

        <Prose>
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <GuideRichText key={paragraph.slice(0, 48)} text={paragraph} />
              ))}
            </section>
          ))}
        </Prose>

        <RelatedToolsConversions slug={article.slug} />

        <p className="mt-12 text-sm text-ink-muted">
          <Link href={index.href} className="underline underline-offset-4 hover:text-voice-dark">
            {index.label}
          </Link>
          {" · "}
          <Link href="/" className="underline underline-offset-4 hover:text-voice-dark">
            Home
          </Link>
        </p>
        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </article>
    </SiteShell>
  );
}
