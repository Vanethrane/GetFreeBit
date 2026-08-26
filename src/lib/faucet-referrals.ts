import type { FaucetReferral } from "@/data/faucet-referrals";

/**
 * Outbound signup href. Prefer a full tracked `signupUrl`.
 * `referralCode` is only used silently to append params when needed — never shown to users.
 */
export function faucetSignupHref(faucet: FaucetReferral): string {
  const code = faucet.referralCode.trim();
  const baseUrl = faucet.signupUrl.trim();
  if (!code) return baseUrl;

  if (/[?&](ref|r|via|referral)=/i.test(baseUrl) || /\/r\/|\/ref\//i.test(baseUrl)) {
    return baseUrl;
  }

  const base = baseUrl.replace(/\/$/, "");

  if (faucet.referralStyle === "path") {
    return `${base}/${faucet.referralParam}/${encodeURIComponent(code)}`;
  }

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${encodeURIComponent(faucet.referralParam)}=${encodeURIComponent(code)}`;
}

export function isFaucetLive(faucet: FaucetReferral): boolean {
  return faucet.live === true;
}

/** @deprecated Use isFaucetLive */
export function hasReferralCode(faucet: FaucetReferral): boolean {
  return isFaucetLive(faucet);
}

/** User-facing badge — never surfaces raw referral codes. */
export function referralStatusLabel(faucet: FaucetReferral): string {
  return faucet.live ? "Our partner link" : "Coming after approval";
}

export function faucetSignupCta(name: string, live: boolean): string {
  return live ? `Open ${name}` : `Visit ${name}`;
}
