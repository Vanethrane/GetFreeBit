/** Shared referral URL helpers for desks (exchanges, tax tools, etc.). */

export type ReferralLinkFields = {
  signupUrl: string;
  referralStyle: "query" | "path";
  referralParam: string;
  referralCode: string;
  live?: boolean;
};

export function partnerSignupHref(partner: ReferralLinkFields): string {
  const code = partner.referralCode.trim();
  if (!code) return partner.signupUrl;

  const base = partner.signupUrl.replace(/\/$/, "");

  if (partner.referralStyle === "path") {
    return `${base}/${partner.referralParam}/${encodeURIComponent(code)}`;
  }

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${encodeURIComponent(partner.referralParam)}=${encodeURIComponent(code)}`;
}

/** Live when flagged, or when a referral code / tracked URL is present. */
export function isPartnerLive(partner: ReferralLinkFields): boolean {
  if (partner.live === false) return false;
  if (partner.live === true) return true;
  return partner.referralCode.trim().length > 0;
}

export function hasPartnerReferralCode(partner: ReferralLinkFields): boolean {
  return isPartnerLive(partner);
}

export function partnerReferralStatusLabel(partner: ReferralLinkFields): string {
  if (!isPartnerLive(partner)) return "Coming after approval";
  const code = partner.referralCode.trim();
  return code ? `Code: ${code}` : "Partner link live";
}
