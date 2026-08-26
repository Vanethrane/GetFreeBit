import Link from "next/link";
import type { ComparisonDeskMethodology } from "@/data/comparison-methodology";
import { getRankReason } from "@/data/comparison-methodology";
import {
  MONETIZATION_PATH,
  RANKING_INDEPENDENCE_STATEMENT,
} from "@/data/monetization";

type MethodologyProps = {
  methodology: ComparisonDeskMethodology;
};

/** Desk-level block — criteria, independence statement, link to full transparency page */
export function ComparisonMethodologyBlock({ methodology }: MethodologyProps) {
  return (
    <section
      className="mt-8 rounded-xl border border-signal/30 bg-signal-glow/30 px-4 py-5 sm:px-5"
      aria-labelledby={`methodology-${methodology.id}`}
    >
      <h2 id={`methodology-${methodology.id}`} className="font-display text-xl text-ink">
        How we order this list
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{methodology.summary}</p>

      <p className="mt-4 rounded-lg border border-voice/25 bg-voice-glow/50 px-3 py-2 text-sm font-medium text-ink">
        {RANKING_INDEPENDENCE_STATEMENT}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Sort criteria (in order)
          </h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-muted">
            {methodology.criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            What does not affect rank
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted">
            {methodology.notFactors.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        Methodology last reviewed {methodology.lastReviewed}. Full revenue disclosure:{" "}
        <Link
          href={MONETIZATION_PATH}
          className="font-medium text-voice-dark underline underline-offset-2"
        >
          How GetFreeBit makes money
        </Link>
        .
      </p>
    </section>
  );
}

type PositionProps = {
  position: number;
  total: number;
};

/** Neutral list position — not “#1 Best” trophy copy */
export function ListPositionBadge({ position, total }: PositionProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-paper-line bg-paper px-2.5 py-0.5 text-xs font-medium text-ink-muted">
      Listed #{position} of {total}
    </span>
  );
}

type WhyRankedProps = {
  name: string;
  partnerId: string;
  position: number;
  methodology: ComparisonDeskMethodology;
};

/** Per-item ranking explanation — “Why is X listed #1?” */
export function WhyRankedHere({ name, partnerId, position, methodology }: WhyRankedProps) {
  const reason = getRankReason(methodology, partnerId, position);
  const heading =
    position === 1
      ? `Why is ${name} listed first?`
      : `Why is ${name} listed #${position}?`;

  return (
    <details className="mt-4 rounded-lg border border-paper-line bg-paper/60 text-sm open:bg-paper-raised">
      <summary className="cursor-pointer list-none px-3 py-2.5 font-medium text-voice-dark [&::-webkit-details-marker]:hidden">
        <span className="underline decoration-voice/40 underline-offset-2">{heading}</span>
        <span className="ml-2 text-xs font-normal text-ink-muted">(methodology)</span>
      </summary>
      <p className="border-t border-paper-line px-3 py-3 leading-relaxed text-ink-muted">
        {reason}
      </p>
    </details>
  );
}

/** Compact strip for desk footers */
export function MonetizationTransparencyStrip() {
  return (
    <p className="mt-8 rounded-lg border border-paper-line bg-paper px-3 py-2.5 text-sm text-ink-muted">
      <span className="font-medium text-ink">Money &amp; rankings:</span>{" "}
      {RANKING_INDEPENDENCE_STATEMENT}{" "}
      <Link
        href={MONETIZATION_PATH}
        className="font-medium text-voice-dark underline underline-offset-2"
      >
        How GetFreeBit makes money
      </Link>
    </p>
  );
}
