import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { getAllGuides, getAllHowtos, getAllNews } from "@/content/guides";
import { siteConfig } from "@/site.config";

export default function HomePage() {
  const latestGuides = getAllGuides().slice(0, 2);
  const latestHowtos = getAllHowtos().slice(0, 2);
  const latestNews = getAllNews().slice(0, 2);

  return (
    <SiteShell>
      <section className="relative flex flex-1 flex-col justify-center py-16 sm:py-20">
        <p className="anim-rise text-xs font-semibold uppercase tracking-[0.28em] text-voice-dark">
          Operator-grade crypto education
        </p>
        <h1 className="anim-rise-delay mt-4 max-w-xl font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">
          {siteConfig.name}
        </h1>
        <div className="hero-rule mt-5" aria-hidden="true" />
        <p className="anim-rise-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-ink-muted sm:text-xl">
          {siteConfig.tagline}
        </p>
        <div className="anim-rise-delay-2 mt-9 flex flex-wrap gap-3">
          <Link
            href="/guides"
            className="cta-primary inline-flex items-center justify-center rounded-lg bg-voice px-6 py-3 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
          >
            Read guides
          </Link>
          <Link
            href="/how-to"
            className="inline-flex items-center justify-center rounded-lg border border-paper-line bg-paper-raised/80 px-6 py-3 text-sm font-medium text-ink backdrop-blur-sm hover:border-voice"
          >
            Start a how-to
          </Link>
        </div>
      </section>

      <section className="border-t border-paper-line py-12">
        <h2 className="font-display text-2xl tracking-tight text-ink">Three desks</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
          Learn the systems, execute the steps, track what institutions are doing.
        </p>
        <ul className="mt-7 space-y-3">
          {[
            {
              href: "/guides",
              label: "Guides",
              summary: "How blockchain, tokens, DeFi, and security models actually work.",
            },
            {
              href: "/how-to",
              label: "How-tos",
              summary: "Wallets, swaps, bridges, staking, taxes—procedures with risk checks.",
            },
            {
              href: "/news",
              label: "News",
              summary: "Regulation, institutions, and protocol shifts with operator context.",
            },
          ].map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="pillar-row group flex gap-4 rounded-lg border border-transparent px-3 py-3"
              >
                <span className="mt-0.5 w-7 shrink-0 font-display text-sm text-voice">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold text-ink group-hover:text-voice-dark">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {item.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-paper-line py-12">
        <h2 className="font-display text-2xl tracking-tight text-ink">Fresh from the desk</h2>
        <div className="mt-6 space-y-8">
          <DeskBlock title="Guides" href="/guides" items={latestGuides} base="/guides" />
          <DeskBlock title="How-tos" href="/how-to" items={latestHowtos} base="/how-to" />
          <DeskBlock title="News" href="/news" items={latestNews} base="/news" />
        </div>
        <p className="mt-8 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </section>
    </SiteShell>
  );
}

function DeskBlock({
  title,
  href,
  items,
  base,
}: {
  title: string;
  href: string;
  base: string;
  items: { slug: string; title: string; description: string }[];
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <Link href={href} className="text-sm font-medium text-voice-dark underline underline-offset-4">
          View all
        </Link>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`${base}/${item.slug}`}
              className="block border-b border-paper-line py-3 transition-colors hover:border-voice/40"
            >
              <span className="font-semibold text-ink">{item.title}</span>
              <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
