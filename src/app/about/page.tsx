import type { Metadata } from "next";
import Link from "next/link";
import { HomeMissionSupport } from "@/components/home/HomeSections";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { SiteShell } from "@/components/SiteChrome";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: dynamicTitleMetadata({
    pageType: "site",
    name: `About ${siteConfig.name}`,
    keyword: `About ${siteConfig.name} mission`,
  }),
  description: siteConfig.donations.body,
};

export default function AboutPage() {
  return (
    <SiteShell>
      <article className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-voice">About Us</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          About {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {siteConfig.tagline}
        </p>

        <div className="mt-10">
          <HomeMissionSupport />
        </div>

        <div className="mt-12 space-y-5 text-base leading-relaxed text-ink">
          <h2 className="font-display text-2xl text-ink">Contact &amp; trust</h2>
          <p>
            Questions about the product, partnerships, privacy, or accessibility are welcome on our{" "}
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
          <p className="text-sm text-ink-muted">{siteConfig.affiliateDisclosure}</p>
        </div>
      </article>
    </SiteShell>
  );
}
