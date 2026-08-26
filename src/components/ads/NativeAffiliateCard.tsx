import Link from "next/link";
import type { AffiliateOffer } from "@/site.config";
import type { AdSlotType } from "@/site.config";

type NativeAffiliateCardProps = {
  offer: AffiliateOffer;
  slotType: AdSlotType;
  /** Keep the same footprint as the ad unit to avoid CLS */
  minHeight: number;
  className?: string;
};

const widthHint: Record<AdSlotType, string> = {
  banner: "max-w-[468px]",
  sidebar: "max-w-xs",
  inline: "max-w-xl",
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Subtle in-house promo used when an ad network isn’t configured (or traffic
 * is below the slot’s gate). Sized to match the ad footprint so layout doesn’t jump.
 */
export function NativeAffiliateCard({
  offer,
  slotType,
  minHeight,
  className = "",
}: NativeAffiliateCardProps) {
  const classNameLink =
    "group flex h-full min-h-[inherit] flex-col justify-center rounded-xl border border-paper-line bg-paper-raised px-4 py-3 transition hover:border-voice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-voice";

  const body = (
    <>
      {offer.eyebrow ? (
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-voice">
          {offer.eyebrow}
        </p>
      ) : null}
      <p className="mt-1 font-display text-lg leading-snug tracking-tight text-ink group-hover:text-voice-dark">
        {offer.title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{offer.description}</p>
      <span className="mt-2 inline-flex text-sm font-medium text-voice-dark underline-offset-4 group-hover:underline">
        {offer.cta}
      </span>
    </>
  );

  return (
    <aside
      className={`native-affiliate w-full ${widthHint[slotType]} ${className}`}
      style={{ minHeight }}
      aria-label="Sponsored recommendation"
      data-slot={slotType}
      data-affiliate={offer.id}
    >
      {isExternalHref(offer.href) ? (
        <a
          href={offer.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={classNameLink}
        >
          {body}
        </a>
      ) : (
        <Link href={offer.href} className={classNameLink}>
          {body}
        </Link>
      )}
    </aside>
  );
}
