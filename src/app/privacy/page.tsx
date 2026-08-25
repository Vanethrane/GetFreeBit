import type { Metadata } from "next";
import Link from "next/link";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { siteConfig } from "@/site.config";

const host = siteConfig.domain.replace(/^https?:\/\//i, "").replace(/\/$/, "");

export const metadata: Metadata = {
  title: dynamicTitleMetadata({
    pageType: "site",
    name: "Privacy Policy",
    keyword: `${siteConfig.name} privacy`,
  }),
  description: `${siteConfig.name} privacy policy covering cookies, analytics, and third-party services.`,
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <article className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">Legal</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Customize this page for {siteConfig.name}. Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink">
          <p>
            This Privacy Policy explains how {siteConfig.name} (“we,” “us,” or “our”) collects, uses,
            and shares information when you use {host} and related services. By using the site, you
            agree to this policy. For contractual terms, see our{" "}
            <Link href="/terms" className="text-voice-dark underline underline-offset-4">
              Terms of Service
            </Link>
            .
          </p>

          <h2 className="pt-2 font-display text-2xl">Information we collect</h2>
          <p>
            We may collect information you submit (such as contact-form contents and email address),
            technical data (IP address, browser type, device, referring URL, timestamps), and usage
            data (pages viewed, searches performed). Replace this section with your actual practices.
          </p>

          <h2 className="pt-2 font-display text-2xl">How we use information</h2>
          <p>
            We use information to operate and improve the site, respond to requests, measure
            performance, and comply with law. Do not claim practices you do not follow.
          </p>

          <h2 className="pt-2 font-display text-2xl">Contact</h2>
          <p>
            Privacy questions:{" "}
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
