import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Static HTML for GitHub Pages / Cloudflare Pages (index.html at export root). */
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
