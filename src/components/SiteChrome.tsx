"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdSlot } from "@/components/ads";
import { GlobalSearchProvider } from "@/components/GlobalSearchProvider";
import { GlobalSearchTrigger } from "@/components/GlobalSearchModal";
import { HistoryProvider } from "@/components/HistoryDrawer";
import { StableSlot } from "@/components/StableSlot";
import { siteConfig } from "@/site.config";

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10.4 6.8h1.1V5.6h1.2v1.2h.4c2 0 3.3.9 3.3 2.4 0 1.1-.6 1.9-1.7 2.2 1.2.3 2 1.2 2 2.5 0 1.7-1.4 2.8-3.6 2.8h-.4v1.3h-1.2v-1.3h-1.1v-1.3h1.1V8.1h-1.1V6.8zm2.3 4.1h.5c1 0 1.5-.4 1.5-1.1s-.5-1.1-1.5-1.1h-.5v2.2zm0 4.2h.6c1.1 0 1.7-.5 1.7-1.3s-.6-1.2-1.7-1.2h-.6v2.5z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header relative z-[1] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-display text-2xl tracking-tight text-ink"
        >
          <BrandMark />
          <span className="transition-colors group-hover:text-voice-dark">{siteConfig.name}</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-4 text-sm font-medium text-ink-muted sm:gap-5"
        >
          {siteConfig.primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition-colors hover:text-signal-dark after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-signal after:to-voice after:transition-[width] hover:after:w-full ${
                item.href === "/faucets" ? "font-medium text-voice-dark" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {!isHome ? <GlobalSearchTrigger className="w-full max-w-xl" /> : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer relative z-[1] mt-auto border-t border-transparent pt-10">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <p className="inline-flex items-center gap-2 font-display text-xl text-ink">
            <BrandMark className="!h-7 !w-7" />
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            {siteConfig.footerBlurb}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.footerProductNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink hover:text-voice-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Trust &amp; legal
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.footerTrustNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink hover:text-voice-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-muted">
        {siteConfig.affiliateDisclosure}
      </p>
      <p className="mt-4 pb-2 text-xs text-ink-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Guides emphasize risks, payout math, and
        disclosed partner links.
      </p>
    </footer>
  );
}

type SiteShellProps = {
  children: React.ReactNode;
  /** Home uses in-page search; skip top banner so hero stays clean */
  homeLayout?: boolean;
};

export function SiteShell({ children, homeLayout = false }: SiteShellProps) {
  return (
    <GlobalSearchProvider>
      <HistoryProvider>
        <div className="site-shell mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-8">
          <SiteHeader />
          {!homeLayout ? (
            <StableSlot
              minHeight="90px"
              className="ad-slot-top relative z-[1] mt-4 border-b border-paper-line pb-4"
              aria-label="Advertisement"
            >
              <AdSlot slotType="banner" />
            </StableSlot>
          ) : null}
          <div className="site-content relative z-[1] flex-1" style={{ minHeight: "20rem", contain: "layout" }}>
            {children}
          </div>
          <StableSlot
            minHeight="90px"
            className="ad-slot-bottom relative z-[1] mt-8 border-t border-paper-line pt-4"
            aria-label="Advertisement"
          >
            <AdSlot slotType="inline" />
          </StableSlot>
          <SiteFooter />
        </div>
      </HistoryProvider>
    </GlobalSearchProvider>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-site mt-8 space-y-5 text-base leading-relaxed text-ink [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_li]:ml-5 [&_li]:list-disc [&_p]:text-ink [&_ul]:space-y-2">
      {children}
    </div>
  );
}
