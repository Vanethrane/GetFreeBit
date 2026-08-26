# GetFreeBit.com

Next.js site for free-crypto earnings, yield, and Web3 onboarding. Brand, affiliates, and disclosure live in:

```
src/site.config.ts
```

AI voice, pillars, and monetization rules: `.cursor/rules/getfreebit-engine.mdc` + `.cursorrules`.

## What lives in `site.config.ts`

| Field | Purpose |
| --- | --- |
| `name` / `slug` / `domain` | Brand shown in chrome, metadata, PWA |
| `tagline` / `description` / `footerBlurb` | Default copy |
| `affiliateDisclosure` | Required disclosure on monetized surfaces |
| `pillars` | Four content pillars (faucets, airdrops, yield, onboarding) |
| `partners` | Affiliate catalog — replace `href` with live referral URLs |
| `googleSearchConsoleId` | Search Console HTML-tag verification |
| `primaryNav` / footer navs | Header and footer links |
| `colors` | Brand palette → CSS variables, Tailwind, theme-color, OG |
| `ads` | Ad network keys / affiliate fallbacks |

## Quick start

1. Move this folder wherever you keep site starters (e.g. one level up from a live site).
2. Copy it for a new project, then edit `src/site.config.ts`.
3. Align `public/manifest.json` theme/background colors with `colors`.
4. Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
5. `npm install` then `npm run dev`.

## Cursor: `.cursorrules`

The repo root includes `.cursorrules` so Cursor keeps the template contract in context:

- Brand / affiliates / colors come from `src/site.config.ts`
- Do not casually rewrite programmatic engines (`guides/[slug]`, `w/[word]`, `dataset.ts`)
- Pages stay on schema.org (`SoftwareApplication`, `FAQPage`, `HowTo`)

## Dataset generation (don’t paste 50k lines into chat)

Generate `src/data/dataset.json` with the Python script instead of hand-writing payloads in Cursor:

```bash
# Brand-aware shell from site.config.ts + seed file
python scripts/generate_dataset.py --mode template --seed data/seeds/pages.example.json

# Crypto demo pages from CoinGecko (public API)
python scripts/generate_dataset.py --mode coingecko --limit 25

# Optional LLM FAQ expansion
python scripts/generate_dataset.py --mode openai --seed data/seeds/pages.example.json
python scripts/generate_dataset.py --mode anthropic --seed data/seeds/pages.example.json
```

Output defaults to `src/data/dataset.json` (the path the app imports). Copy a seed into `data/seeds/` for each niche clone.

## Deploy on Cloudflare Pages

Connect the GitHub repo in Cloudflare Pages; builds run on every push with SSL + global edge routing (no Hostinger/GitHub Pages manual SSL dance).

Suggested Pages settings:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Build command | `npm run build` |
| Root directory | `/` (repo root) |
| Env vars | `NEXT_PUBLIC_SITE_URL` = your live origin (match `siteConfig.domain`) |

Notes:

- API routes (TTS / audio) need a Node-compatible Pages/Workers setup (e.g. OpenNext for Cloudflare) or keep those features on a Node host.
- For fully static marketing clones without Node APIs, set `output: "export"` in `next.config.ts` and point Pages at the `out/` directory.
- After DNS cutover, set `siteConfig.domain` and `NEXT_PUBLIC_SITE_URL` to the Cloudflare custom domain.

## Included

- Next.js App Router (`src/app`)
- Shared chrome, search, ads slots, guides sample content
- SEO helpers, OG image route, robots/sitemap
- Tailwind + PostCSS wired to `siteConfig.colors`
- Minimal `public/` assets (no word indexes or category HTML)
- `.cursorrules` + `scripts/generate_dataset.py` for clone workflows

## Not included (intentionally)

- `words/`, category folders (`animals/`, `food/`, …)
- Static generated word HTML
- Large search indexes / multi-part sitemaps
- Legacy `client/` + `server/` apps
- Word-generation scripts

Sample guide/editorial content under `src/content/` is example payload — replace for each new site. 

