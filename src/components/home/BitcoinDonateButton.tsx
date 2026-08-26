"use client";

import { useState } from "react";

type BitcoinDonateButtonProps = {
  address: string;
  label: string;
};

export function BitcoinDonateButton({ address, label }: BitcoinDonateButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mission-donate-btc flex min-w-0 flex-1 flex-col gap-2">
      <button
        type="button"
        onClick={copyAddress}
        className="cta-primary inline-flex items-center justify-center rounded-lg bg-voice px-5 py-2.5 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
      >
        {copied ? "Address copied" : label}
      </button>
      <p className="break-all font-mono text-[0.7rem] leading-relaxed text-ink-muted" title={address}>
        {address}
      </p>
    </div>
  );
}
