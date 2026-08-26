import Link from "next/link";
import { BitcoinDonateButton } from "@/components/home/BitcoinDonateButton";
import {
  HOME_DESK_LINKS,
  HOME_OPERATOR_PICKS,
  HOME_POPULAR_PATHS,
  type HomePath,
  type HomePathKind,
} from "@/data/home-paths";
import { siteConfig } from "@/site.config";

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
      <div className="earn-strip rounded-2xl border px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              id="earn-strip-heading"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-voice-dark"
            >
              Money desks
            </p>
            <p className="mt-1 font-display text-lg tracking-tight text-ink">
              Faucets, exchanges, and tax tools
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
              Compare US-accessible platforms with mechanics and risk notes first—partner links
              disclosed on each desk.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/faucets" className="text-voice-dark underline-offset-4 hover:underline">
            Faucet desk →
          </Link>
          <Link href="/exchanges" className="text-voice-dark underline-offset-4 hover:underline">
            Exchange desk →
          </Link>
          <Link href="/tools/tax" className="text-voice-dark underline-offset-4 hover:underline">
            Tax tools →
          </Link>
        </div>
      </div>
    </section>
  );
}

function paypalDonateHref(): string {
  const configured = siteConfig.donations.paypalUrl.trim();
  if (configured) return configured;
  const email = siteConfig.contactEmail;
  return `https://www.paypal.com/donate/?business=${encodeURIComponent(email)}&currency_code=USD&item_name=${encodeURIComponent(`${siteConfig.name} — keep the desk free`)}`;
}

export function HomeMissionSupport() {
  const d = siteConfig.donations;
  const btc = d.bitcoinAddress.trim();
  const paypalHref = paypalDonateHref();

  return (
    <section aria-labelledby="mission-heading" className="mission-scene py-10 sm:py-12">
      <div className="mission-panel relative overflow-hidden rounded-2xl border px-6 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-voice-dark">{d.eyebrow}</p>
        <h2
          id="mission-heading"
          className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {d.title}
        </h2>
        <div className="hero-rule mt-4" aria-hidden="true" />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{d.body}</p>

        <div className="mission-support mt-8 border-t border-paper-line/80 pt-7">
          <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">{d.supportTitle}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {d.supportBody}
          </p>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
            {btc ? (
              <BitcoinDonateButton address={btc} label={d.bitcoinLabel} />
            ) : (
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="inline-flex cursor-default items-center justify-center rounded-lg border border-paper-line bg-paper-raised/80 px-5 py-2.5 text-sm font-semibold text-ink-muted">
                  {d.bitcoinLabel}
                </span>
                <p className="text-xs leading-relaxed text-ink-muted">
                  BTC address coming soon—{" "}
                  <Link href="/contact" className="text-voice-dark underline underline-offset-2">
                    contact us
                  </Link>{" "}
                  if you want to send on-chain now.
                </p>
              </div>
            )}

            <a
              href={paypalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary inline-flex shrink-0 items-center justify-center rounded-lg border border-signal/40 bg-signal px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-signal-dark"
            >
              {d.paypalLabel}
            </a>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            Voluntary support only—never required to read the guides. Thank you for helping keep{" "}
            {siteConfig.name} free.
          </p>
        </div>
      </div>
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
