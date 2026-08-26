import type { FaucetReferral } from "@/data/faucet-referrals";

/** Build the signup URL, appending referral param when `referralCode` is set. */
export function faucetSignupHref(faucet: FaucetReferral): string {
  const code = faucet.referralCode.trim();
  if (!code) return faucet.signupUrl;

  const base = faucet.signupUrl.replace(/\/$/, "");

  if (faucet.referralStyle === "path") {
    return `${base}/${faucet.referralParam}/${encodeURIComponent(code)}`;
  }

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${encodeURIComponent(faucet.referralParam)}=${encodeURIComponent(code)}`;
}

export function hasReferralCode(faucet: FaucetReferral): boolean {
  return faucet.live === true;
}

export function referralStatusLabel(faucet: FaucetReferral): string {
  return faucet.live ? "Partner link live" : "Coming after approval";
}
