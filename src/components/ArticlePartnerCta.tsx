import Link from "next/link";

export type ArticleCtaDesk = "faucets" | "exchanges" | "tax";

type DeskCta = {
  desk: ArticleCtaDesk;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const DESKS: Record<ArticleCtaDesk, DeskCta> = {
  faucets: {
    desk: "faucets",
    eyebrow: "Earn desk",
    title: "Compare US faucet referrals",
    body: "Withdrawal floors, FaucetPay routing, and lifetime referral terms—mechanics before you register.",
    href: "/faucets",
    cta: "Open faucet desk",
  },
  exchanges: {
    desk: "exchanges",
    eyebrow: "Onboard desk",
    title: "Compare US exchange referrals",
    body: "Coinbase, Gemini, Kraken, and other US-accessible venues—fiat rails and custody risks first.",
    href: "/exchanges",
    cta: "Open exchange desk",
  },
  tax: {
    desk: "tax",
    eyebrow: "Tax tools",
    title: "Prep crypto taxes with a verified importer",
    body: "Koinly, CoinLedger, and CoinTracking—pick a plan tier after you know your transaction count.",
    href: "/tools/tax",
    cta: "Open tax tool desk",
  },
};

/** Map high-intent article slugs → monetized desk CTA. */
const SLUG_DESK: Record<string, ArticleCtaDesk> = {
  "how-to-set-up-faucetpay-and-route-faucet-payouts": "faucets",
  "how-to-run-a-daily-crypto-faucet-routine-in-the-us": "faucets",
  "how-faucetpay-routing-works-for-micro-earnings": "faucets",
  "how-to-buy-crypto-on-a-centralized-exchange-using-fiat-currency": "exchanges",
  "how-to-create-your-first-self-custody-crypto-wallet": "exchanges",
  "what-crypto-staking-is-and-how-yield-is-generated": "exchanges",
  "how-to-compare-staking-and-savings-apy-without-chasing-headlines": "exchanges",
  "liquid-staking-vs-native-staking-trade-offs-for-earners": "exchanges",
  "how-to-calculate-capital-gains-and-prepare-crypto-taxes": "tax",
  "points-programs-and-tge-expectations": "exchanges",
};

function deskForSlug(slug: string): ArticleCtaDesk | null {
  if (SLUG_DESK[slug]) return SLUG_DESK[slug];
  if (/faucet|faucetpay|cointiply|micro-earn/i.test(slug)) return "faucets";
  if (/tax|capital-gains|8949|koinly/i.test(slug)) return "tax";
  if (/exchange|buy-crypto|fiat|staking|wallet|onboard|cex/i.test(slug)) return "exchanges";
  return null;
}

/**
 * Contextual partner desk CTA for high-intent articles.
 * Links to internal desks (live affiliate URLs live on those pages).
 */
export function ArticlePartnerCta({ slug }: { slug: string }) {
  const deskKey = deskForSlug(slug);
  if (!deskKey) return null;
  const desk = DESKS[deskKey];

  return (
    <aside className="mt-10 rounded-2xl border border-paper-line bg-paper-raised px-5 py-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-voice">{desk.eyebrow}</p>
      <h2 className="mt-2 font-display text-xl text-ink sm:text-2xl">{desk.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{desk.body}</p>
      <Link
        href={desk.href}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
      >
        {desk.cta}
      </Link>
    </aside>
  );
}
