import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { SearchBox } from "@/components/SearchBox";
import { getAllGuides } from "@/content/guides";
import { siteConfig } from "@/site.config";

export default function HomePage() {
  const latestGuides = getAllGuides().slice(0, 3);

  return (
    <SiteShell>
      <section className="flex flex-1 flex-col justify-center py-14">
        <h1 className="max-w-xl font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-muted">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-medium text-paper-raised hover:bg-voice-dark"
          >
            Browse guides
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-lg border border-paper-line bg-paper-raised px-5 py-2.5 text-sm font-medium text-ink hover:border-voice"
          >
            How we work
          </Link>
        </div>
        <div className="mt-10">
          <SearchBox />
        </div>
      </section>

      <section className="border-t border-paper-line py-12">
        <h2 className="font-display text-2xl text-ink">Resource pillars</h2>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Every guide maps to one focus area—educate first, then disclosed partner offers.
        </p>
        <ul className="mt-6 space-y-5">
          {siteConfig.pillars.map((pillar) => (
            <li key={pillar.id}>
              <Link href={pillar.href} className="group block">
                <span className="font-medium text-ink group-hover:text-voice-dark">
                  {pillar.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {pillar.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-paper-line py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-ink">From the guides</h2>
          <Link href="/guides" className="text-sm text-voice-dark underline underline-offset-4">
            View all
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {latestGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block border-b border-paper-line py-3 hover:text-voice-dark"
              >
                <span className="font-medium text-ink">{guide.title}</span>
                <span className="mt-1 block text-sm text-ink-muted">{guide.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          {siteConfig.affiliateDisclosure}
        </p>
      </section>
    </SiteShell>
  );
}
