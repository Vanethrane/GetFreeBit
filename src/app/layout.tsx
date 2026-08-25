import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { PwaInstall } from "@/components/PwaInstall";
import { dynamicTitleMetadata } from "@/components/SEOHead";
import { brandCssVariables, siteConfig } from "@/site.config";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-fraunces",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: dynamicTitleMetadata({
    pageType: "site",
    name: siteConfig.name,
    keyword: siteConfig.tagline,
  }),
  description: siteConfig.description,
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/assets/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/icon.svg", type: "image/svg+xml" }],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  ...(siteConfig.googleSearchConsoleId
    ? { verification: { google: siteConfig.googleSearchConsoleId } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.voice,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandVars = brandCssVariables();

  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <head>
        {siteConfig.impactSiteVerification ? (
          <meta
            // Exact Impact format: name + value (not content)
            {...({
              name: "impact-site-verification",
              value: siteConfig.impactSiteVerification,
            } as Record<string, string>)}
          />
        ) : null}
        {/* Critical CSS inlined for sub-500ms first paint */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root{color-scheme:light;${brandVars};--ad-banner-h:90px;--ad-inline-h:90px}
@media(max-width:767px){:root{--ad-banner-h:90px;--ad-inline-h:90px}}
html{scroll-behavior:smooth}
body{margin:0;min-height:100vh;background:var(--paper);color:var(--ink);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
.stable-slot{contain:layout;width:100%}
.ad-slot{display:flex;justify-content:center;align-items:center;overflow:hidden;contain:layout style}
.ad-slot-top{min-height:var(--ad-banner-h)}.ad-slot-bottom{min-height:var(--ad-inline-h)}
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SITE_CONFIG__=${JSON.stringify({
              name: siteConfig.name,
              slug: siteConfig.slug,
              domain: siteConfig.domain,
              colors: siteConfig.colors,
            })};`,
          }}
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        {children}
        <PwaInstall />
      </body>
    </html>
  );
}
