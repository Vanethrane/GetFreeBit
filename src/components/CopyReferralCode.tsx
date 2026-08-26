"use client";

import { useState } from "react";

type CopyReferralCodeProps = {
  code: string;
  label?: string;
};

/** Copyable invite code for programs that have no tracked affiliate URL. */
export function CopyReferralCode({ code, label = "Invite code" }: CopyReferralCodeProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
      <code className="rounded-md border border-paper-line bg-paper px-2.5 py-1 font-mono text-sm font-semibold tracking-wide text-ink">
        {code}
      </code>
      <button
        type="button"
        onClick={onCopy}
        className="rounded-md border border-paper-line bg-paper-raised px-2.5 py-1 text-xs font-semibold text-voice-dark hover:border-voice"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
