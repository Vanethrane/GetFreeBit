import Link from "next/link";
import { BitcoinDonateButton } from "@/components/home/BitcoinDonateButton";
import { HOME_DESK_LINKS } from "@/data/home-paths";
import { siteConfig } from "@/site.config";

/** Compact library rail — desks without crowding the Bitcoin monitor */
export function HomeResourceRail() {
  return (
    <section
      aria-labelledby="library-rail-heading"
      className="section-scene border-t border-transparent py-10"
    >
      <h2 id="library-rail-heading" className="font-display text-2xl tracking-tight text-ink">
        Free crypto library
      </h2>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">
        Pros use the desks for quick checks. Newcomers start with guides and how-tos. Same trust
        standard everywhere—no hype, disclosed partners.
      </p>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-paper-line bg-paper-line sm:grid-cols-3 lg:grid-cols-6">
        {HOME_DESK_LINKS.map((desk) => (
          <li key={desk.href} className="bg-paper-raised">
            <Link
              href={desk.href}
              className="flex h-full flex-col px-4 py-4 transition-colors hover:bg-signal-glow/30"
            >
              <span className="font-display text-lg text-ink">{desk.label}</span>
              <span className="mt-1 text-xs leading-snug text-ink-muted">{desk.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-voice-dark">
          {d.eyebrow}
        </p>
        <h2
          id="mission-heading"
          className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {d.title}
        </h2>
        <div className="hero-rule mt-4" aria-hidden="true" />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {d.body}
        </p>

        <div className="mission-support mt-8 border-t border-paper-line/80 pt-7">
          <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
            {d.supportTitle}
          </h3>
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
