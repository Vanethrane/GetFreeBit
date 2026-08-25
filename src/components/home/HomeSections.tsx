import Link from "next/link";
import {
  HOME_DESK_LINKS,
  HOME_OPERATOR_PICKS,
  HOME_POPULAR_PATHS,
  type HomePath,
  type HomePathKind,
} from "@/data/home-paths";

const KIND_LABEL: Record<HomePathKind, string> = {
  earn: "Earn",
  do: "Do",
  learn: "Learn",
};

function PathKindBadge({ kind }: { kind: HomePathKind }) {
  return (
    <span
      className={`path-kind path-kind-${kind} shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide`}
    >
      {KIND_LABEL[kind]}
    </span>
  );
}

function PathTile({ path }: { path: HomePath }) {
  return (
    <Link href={path.href} className="path-tile group block rounded-xl px-4 py-3.5">
      <span className="flex items-start justify-between gap-2">
        <span className="font-semibold text-ink transition-colors group-hover:text-voice-dark">
          {path.label}
        </span>
        <PathKindBadge kind={path.kind} />
      </span>
      <span className="mt-1 block text-sm leading-snug text-ink-muted">{path.description}</span>
    </Link>
  );
}

export function HomePopularPaths() {
  return (
    <section aria-labelledby="popular-paths-heading" className="section-scene border-t border-transparent py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="popular-paths-heading" className="font-display text-2xl tracking-tight text-ink">
            Popular paths
          </h2>
          <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-muted">
            High-intent topics readers search first — earn, onboard, or learn the mechanics.
          </p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {HOME_POPULAR_PATHS.map((path) => (
          <li key={path.id}>
            <PathTile path={path} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomeEarnStrip() {
  return (
    <section aria-labelledby="earn-strip-heading" className="py-8">
      <Link
        href="/faucets"
        className="earn-strip group flex flex-col gap-2 rounded-2xl border px-5 py-4 transition sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p id="earn-strip-heading" className="text-xs font-semibold uppercase tracking-[0.22em] text-voice-dark">
            Start earning
          </p>
          <p className="mt-1 font-display text-lg tracking-tight text-ink group-hover:text-voice-dark">
            US faucet desk &amp; payout routing
          </p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
            Compare micro-earning platforms, batch payouts, and daily routines — partner links disclosed
            on the desk page.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center text-sm font-medium text-voice-dark underline-offset-4 group-hover:underline">
          Open faucet desk →
        </span>
      </Link>
    </section>
  );
}

export function HomeOperatorPicks() {
  return (
    <section aria-labelledby="operator-picks-heading" className="section-scene border-t border-transparent py-10">
      <h2 id="operator-picks-heading" className="font-display text-2xl tracking-tight text-ink">
        Operator picks
      </h2>
      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-muted">
        Step-by-step procedures for security, yield, and testnet hygiene.
      </p>
      <ul className="mt-5 divide-y divide-paper-line rounded-xl border border-paper-line bg-paper-raised/60">
        {HOME_OPERATOR_PICKS.map((path) => (
          <li key={path.id}>
            <Link
              href={path.href}
              className="pillar-row flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5"
            >
              <span>
                <span className="block font-medium text-ink">{path.label}</span>
                <span className="mt-0.5 block text-sm text-ink-muted">{path.description}</span>
              </span>
              <PathKindBadge kind={path.kind} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

type DeskCounts = Partial<Record<string, number>>;

export function HomeDeskTiles({ counts }: { counts?: DeskCounts }) {
  return (
    <section aria-labelledby="desks-heading" className="section-scene border-t border-transparent py-10">
      <h2 id="desks-heading" className="font-display text-2xl tracking-tight text-ink">
        Desks
      </h2>
      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-muted">
        Browse by format — deep guides, procedures, earnings, or news context.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {HOME_DESK_LINKS.map((desk) => {
          const count = counts?.[desk.href];
          return (
            <li key={desk.href}>
              <Link
                href={desk.href}
                className="path-tile group flex h-full flex-col rounded-xl px-4 py-4"
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-xl text-ink group-hover:text-voice-dark">
                    {desk.label}
                  </span>
                  {count != null ? (
                    <span className="text-xs font-medium text-ink-muted">{count} articles</span>
                  ) : null}
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-ink-muted">{desk.summary}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
