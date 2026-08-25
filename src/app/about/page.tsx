import type { Metadata } from "next";
import Link from "next/link";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: dynamicTitleMetadata({
    pageType: "site",
    name: `About ${siteConfig.name}`,
    keyword: `About ${siteConfig.tagline}`,
  }),
  description: siteConfig.description,
};

export default function AboutPage() {
  return (
    <SiteShell>
      <article className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">About Us</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          About {siteConfig.name}
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink">
          <p>
            {siteConfig.name} — {siteConfig.description}
          </p>
          <p>
            Replace this page with your own mission, product story, and audience. Keep trust pages
            linked from the footer so reviewers and users can find them quickly.
          </p>
          <h2 className="pt-4 font-display text-2xl text-ink">Contact</h2>
          <p>
            Questions about the product, partnerships, privacy, or accessibility barriers are
            welcome on our{" "}
            <Link href="/contact" className="text-voice-dark underline underline-offset-4">
              Contact
            </Link>{" "}
            page. Legal terms live in{" "}
            <Link href="/terms" className="text-voice-dark underline underline-offset-4">
              Terms of Service
            </Link>
            ; data practices are described in our{" "}
            <Link href="/privacy" className="text-voice-dark underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
