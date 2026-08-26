import type { StockReferral } from "@/data/stock-referrals";

export function stockSignupHref(app: StockReferral): string {
  const code = app.referralCode.trim();
  const baseUrl = app.signupUrl.trim();
  if (!code) return baseUrl;

  if (
    /[?&](ref|r|invite|inviteCode|referral|referralCode|via)=/i.test(baseUrl) ||
    /\/r\/|\/ref\/|\/invite\//i.test(baseUrl)
  ) {
    return baseUrl;
  }

  const base = baseUrl.replace(/\/$/, "");
  if (app.referralStyle === "path") {
    return `${base}/${app.referralParam}/${encodeURIComponent(code)}`;
  }

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${encodeURIComponent(app.referralParam)}=${encodeURIComponent(code)}`;
}

export function isStockLive(app: StockReferral): boolean {
  return app.live === true;
}

export function stockStatusLabel(app: StockReferral): string {
  return app.live ? "Our partner link" : "Coming after approval";
}

export function stockSignupCta(name: string, live: boolean): string {
  return live ? `Open ${name}` : `Visit ${name}`;
}
