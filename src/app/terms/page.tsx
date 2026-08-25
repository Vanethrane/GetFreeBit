import type { Metadata } from "next";
import Link from "next/link";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Terms of Service",
    keyword: `${siteConfig.name} terms`,
  }),
  description: `Terms of Service governing use of ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <SiteShell>
      <article className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Legal</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Customize this page for {siteConfig.name}. Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of {siteConfig.name}{" "}
            websites and services. By using {siteConfig.name}, you agree to these Terms and our{" "}
            <Link href="/privacy" className="text-voice-dark underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="pt-2 font-display text-2xl">The service</h2>
          <p>
            {siteConfig.name} provides {siteConfig.tagline.toLowerCase()} and related content.
            Features may change without notice. Replace this section with your product description
            and limitations.
          </p>

          <h2 className="pt-2 font-display text-2xl">Acceptable use</h2>
          <p>
            You agree not to misuse the service, including by attempting to scrape in ways that
            degrade availability, or by using the site for unlawful purposes.
          </p>

          <h2 className="pt-2 font-display text-2xl">Contact</h2>
          <p>
            Questions about these Terms:{" "}
            <Link href="/contact" className="text-voice-dark underline underline-offset-4">
              Contact
            </Link>
            .
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
