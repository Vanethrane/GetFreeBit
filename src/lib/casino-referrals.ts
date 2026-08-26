import type { CasinoReferral } from "@/data/casino-referrals";

export function casinoSignupHref(casino: CasinoReferral): string {
  const code = casino.referralCode.trim();
  const baseUrl = casino.signupUrl.trim();
  if (!code) return baseUrl;

  if (/[?&](ref|r|c|i|aff|affiliate|via|referral)=/i.test(baseUrl) || /\/r\/|\/ref\//i.test(baseUrl)) {
    return baseUrl;
  }

  const base = baseUrl.replace(/\/$/, "");
  if (casino.referralStyle === "path") {
    return `${base}/${casino.referralParam}/${encodeURIComponent(code)}`;
  }

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${encodeURIComponent(casino.referralParam)}=${encodeURIComponent(code)}`;
}

export function isCasinoLive(casino: CasinoReferral): boolean {
  return casino.live === true;
}

export function casinoStatusLabel(casino: CasinoReferral): string {
  return casino.live ? "Our partner link" : "Coming after approval";
}

export function casinoSignupCta(name: string, live: boolean): string {
  return live ? `Open ${name}` : `Visit ${name}`;
}
