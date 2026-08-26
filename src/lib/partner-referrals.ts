/** Shared referral URL helpers for desks (exchanges, tax tools, etc.). */

export type ReferralLinkFields = {
  /** Prefer a full tracked affiliate URL here — users never see codes. */
  signupUrl: string;
  referralStyle: "query" | "path";
  referralParam: string;
  /**
   * Optional code used only to *build* signupUrl when the network does not give a full link.
   * Never display this to readers.
   */
  referralCode: string;
  live?: boolean;
};

/** Outbound href: full affiliate URL, or base URL + silent code append. */
export function partnerSignupHref(partner: ReferralLinkFields): string {
  const code = partner.referralCode.trim();
  const baseUrl = partner.signupUrl.trim();
  if (!code) return baseUrl;

  // If signupUrl already carries tracking (query/path ref), do not double-append.
  if (/[?&](ref|r|via|referral|rfsn)=/i.test(baseUrl) || /\/r\/|\/ref\//i.test(baseUrl)) {
    return baseUrl;
  }

  const base = baseUrl.replace(/\/$/, "");

  if (partner.referralStyle === "path") {
    return `${base}/${partner.referralParam}/${encodeURIComponent(code)}`;
  }

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${encodeURIComponent(partner.referralParam)}=${encodeURIComponent(code)}`;
}

export function isPartnerLive(partner: ReferralLinkFields): boolean {
  if (partner.live === false) return false;
  if (partner.live === true) return true;
  return partner.signupUrl.trim().length > 0 && partner.referralCode.trim().length > 0;
}

/** @deprecated Use isPartnerLive — kept for call sites that meant “has a live outbound link”. */
export function hasPartnerReferralCode(partner: ReferralLinkFields): boolean {
  return isPartnerLive(partner);
}

/** User-facing badge — never surfaces raw referral codes. */
export function partnerReferralStatusLabel(partner: ReferralLinkFields): string {
  return isPartnerLive(partner) ? "Our partner link" : "Coming after approval";
}

/** CTA copy for live desks — always implies clicking the affiliate URL. */
export function partnerSignupCta(name: string, live: boolean): string {
  return live ? `Open ${name}` : `Visit ${name}`;
}
