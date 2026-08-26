import type { SourceAttributionBlock } from "@/data/crypto-sources";
import { getSourceDef } from "@/data/crypto-sources";

type Props = {
  blocks: SourceAttributionBlock[];
  className?: string;
  title?: string;
};

/**
 * Renders primary-source attribution separate from GetFreeBit analysis.
 * Use on tool pages and factual sections — not for opinion or affiliate copy.
 */
export function SourceAttribution({
  blocks,
  className = "",
  title = "Sources & methodology",
}: Props) {
  if (blocks.length === 0) return null;

  return (
    <section
      className={`mt-10 rounded-xl border border-paper-line bg-paper/40 px-4 py-5 sm:px-5 ${className}`}
      aria-labelledby="source-attribution-heading"
    >
      <h2
        id="source-attribution-heading"
        className="font-display text-xl tracking-tight text-ink sm:text-2xl"
      >
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
        Factual claims cite primary documentation. Interpretation and calculator assumptions are
        labeled separately so you can verify the source yourself.
      </p>
      <ul className="mt-5 space-y-5">
        {blocks.map((block, i) => {
          const def = getSourceDef(block.sourceId);
          const href = block.url ?? def.url;
          return (
            <li key={`${block.sourceId}-${i}`} className="border-t border-paper-line/80 pt-4 first:border-0 first:pt-0">
              <p className="text-sm leading-relaxed text-ink">
                <span className="font-semibold text-ink">Source:</span>{" "}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal-dark underline underline-offset-2 hover:text-signal"
                >
                  {def.label}
                </a>
                {block.sourceNote ? (
                  <span className="text-ink-muted"> — {block.sourceNote}</span>
                ) : null}
              </p>
              {block.analysis ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">GetFreeBit analysis:</span>{" "}
                  {block.analysis}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
