/**
 * Generate data/seeds/getfreebit-articles.json from editorial TS modules.
 * Run: npx tsx scripts/generate-article-seed.mts
 */
import { writeFileSync } from "fs";
import { ALL_ARTICLES } from "../src/content/guides.ts";

function href(kind, slug) {
  if (kind === "howto") return `/how-to/${slug}`;
  if (kind === "news") return `/news/${slug}`;
  return `/guides/${slug}`;
}

function pillar(article) {
  const hay = `${article.slug} ${article.title} ${article.description}`.toLowerCase();
  if (/faucet|micro-earn|offerwall|cointiply|freebitco/.test(hay)) {
    return "faucets-micro";
  }
  if (
    /airdrop|testnet|sybil|bridge|cross-chain|mempool|51%|consensus beyond|ai agent/.test(hay)
  ) {
    return "airdrop-testnet";
  }
  if (
    /staking|defi|yield|amm|liquidity|stablecoin|tokenomics|mining|rwa|fee-sharing|regulation crypto|bvnk|clarity|tokenized/.test(
      hay,
    )
  ) {
    return "staking-yield";
  }
  return "exchange-onboarding";
}

function tags(article) {
  const base =
    article.kind === "howto" ? ["how-to"] : article.kind === "news" ? ["news"] : ["guide"];
  const hay = article.title.toLowerCase();
  const extras = [];
  if (/wallet|seed|custody|hardware/.test(hay)) extras.push("wallet", "self-custody");
  if (/defi|lending|liquidity|amm|dex/.test(hay)) extras.push("DeFi");
  if (/staking/.test(hay)) extras.push("staking");
  if (/tax/.test(hay)) extras.push("taxes");
  if (/nft/.test(hay)) extras.push("NFT");
  if (/dao/.test(hay)) extras.push("DAO");
  if (/bridge/.test(hay)) extras.push("bridge");
  if (/gas/.test(hay)) extras.push("gas");
  if (/sec|mastercard|clarity|rwa|defi protocol/.test(hay)) extras.push("institutional");
  return [...new Set([...base, ...extras])].slice(0, 6);
}

const seed = ALL_ARTICLES.map((article) => ({
  name: article.title,
  slug: article.slug,
  primaryKeyword: article.title.split(":")[0].slice(0, 80).trim(),
  parentCategory: pillar(article),
  tags: tags(article),
  kind: article.kind,
  description: article.description,
  path: href(article.kind, article.slug),
}));

writeFileSync(
  "data/seeds/getfreebit-articles.json",
  `${JSON.stringify(seed, null, 2)}\n`,
  "utf8",
);

console.log(`Wrote ${seed.length} seed rows to data/seeds/getfreebit-articles.json`);
