import { absoluteCanonicalUrl } from "@/lib/canonical";
import { siteConfig } from "@/site.config";

/** Sitewide Organization + WebSite (+ SearchAction) for the home page */
export function buildSiteJsonLd(): Record<string, unknown> {
  const domain = siteConfig.domain;
  const home = absoluteCanonicalUrl("/", domain);
  const orgId = `${home}#organization`;
  const websiteId = `${home}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: home,
        description: siteConfig.description,
        logo: absoluteCanonicalUrl("/assets/icon.svg", domain),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: home,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": orgId },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${home}?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${home}#webpage`,
        url: home,
        name: `${siteConfig.heroTitleLead} ${siteConfig.heroTitleAccent}`.trim(),
        description: siteConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        inLanguage: "en-US",
      },
    ],
  };
}
