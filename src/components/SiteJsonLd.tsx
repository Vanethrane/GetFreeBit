import { buildSiteJsonLd } from "@/lib/site-jsonld";

export function SiteJsonLd() {
  const json = JSON.stringify(buildSiteJsonLd());
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
