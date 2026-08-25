import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { getAllGuides } from "@/content/guides";
import { siteConfig } from "@/site.config";

export default function HomePage() {
  const latestGuides = getAllGuides().slice(0, 3);

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
            Enter the guides
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-lg border border-paper-line bg-paper-raised/80 px-6 py-3 text-sm font-medium text-ink backdrop-blur-sm hover:border-voice"
          >
            How we earn trust
          </Link>
        </div>
      </section>

      <section className="border-t border-paper-line py-12">
        <h2 className="font-display text-2xl tracking-tight text-ink">Four pillars. Zero fluff.</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
          Every article maps to a lane—so you always know what problem you are solving.
        </p>
        <ul className="mt-7 space-y-3">
          {siteConfig.pillars.map((pillar, i) => (
            <li key={pillar.id}>
              <Link
                href={pillar.href}
                className="pillar-row group flex gap-4 rounded-lg border border-transparent px-3 py-3"
              >
                <span className="mt-0.5 w-7 shrink-0 font-display text-sm text-voice">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold text-ink group-hover:text-voice-dark">
                    {pillar.label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {pillar.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-paper-line py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl tracking-tight text-ink">Fresh from the desk</h2>
          <Link href="/guides" className="text-sm font-medium text-voice-dark underline underline-offset-4">
            All guides
          </Link>
        </div>
        <ul className="mt-5 space-y-1">
          {latestGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block border-b border-paper-line py-4 transition-colors hover:border-voice/40"
              >
                <span className="font-semibold text-ink hover:text-voice-dark">{guide.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {guide.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </section>
    </SiteShell>
  );
}
