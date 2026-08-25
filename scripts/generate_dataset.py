#!/usr/bin/env python3
"""
Generate src/data/dataset.json without stuffing Cursor's context window.

Modes:
  1. template  — brand-aware schema shell + pages from a seed CSV/JSON (no API key)
  2. openai    — expand seed rows into FAQ + metadata via OpenAI
  3. anthropic — same via Anthropic Claude
  4. coingecko — sample crypto niche pages from CoinGecko public API (demo)

Examples:
  python scripts/generate_dataset.py --mode template --brand "Get Free Bit" --domain https://www.getfreebit.com
  python scripts/generate_dataset.py --mode coingecko --out src/data/dataset.json
  python scripts/generate_dataset.py --mode openai --seed data/seeds/pages.json --api-key $OPENAI_API_KEY
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT = ROOT / "src" / "data" / "dataset.json"


def slugify(text: str) -> str:
    s = text.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-") or "page"


def load_site_brand() -> dict[str, str]:
    """Best-effort parse of display name/domain/tagline from site.config.ts."""
    cfg = ROOT / "src" / "site.config.ts"
    brand = {
        "name": "Your Site",
        "domain": "https://www.example.com",
        "tagline": "Your site tagline goes here",
        "voice": "#0d6e66",
        "voiceDark": "#0a524c",
        "voiceGlow": "#e8f4f2",
        "paperRaised": "#fffaf3",
    }
    if not cfg.exists():
        return brand
    text = cfg.read_text(encoding="utf-8")
    for key, pattern in [
        ("name", r'name:\s*"([^"]+)"'),
        ("domain", r'domain:\s*"([^"]+)"'),
        ("tagline", r'tagline:\s*"([^"]+)"'),
        ("voice", r'voice:\s*"([^"]+)"'),
        ("voiceDark", r'voiceDark:\s*"([^"]+)"'),
        ("voiceGlow", r'voiceGlow:\s*"([^"]+)"'),
        ("paperRaised", r'paperRaised:\s*"([^"]+)"'),
    ]:
        m = re.search(pattern, text)
        if m:
            brand[key] = m.group(1)
    return brand


def base_schema(brand: dict[str, str], niche: str) -> dict[str, Any]:
    name = brand["name"]
    domain = brand["domain"].rstrip("/")
    return {
        "softwareApplication": {
            "applicationCategory": "WebApplication",
            "applicationSubCategory": niche.title(),
            "operatingSystem": "Web",
            "softwareVersion": "1.0",
            "offers": {"price": "0", "priceCurrency": "USD"},
            "publisher": {"name": name, "url": domain},
            "featureList": [
                f"{niche} tools and calculators",
                "Free reference pages",
                "FAQ and HowTo structured data",
            ],
            "parameterDescriptions": {
                "name": "App or page name shown on the programmatic page",
                "operatingSystem": "Deployment surface — always Web",
                "applicationCategory": "Schema.org SoftwareApplication category",
                "inLanguage": "BCP-47 language of the page content",
            },
        },
        "webPage": {
            "isPartOf": {"name": name, "url": domain},
            "parameterDescriptions": {
                "name": "WebPage name matching the guide or tool title",
                "description": "Meta description used for search snippets",
                "breadcrumb": "BreadcrumbList id referenced from this WebPage",
            },
        },
        "breadcrumb": {
            "homeName": name,
            "homePath": "/",
            "guidesName": "Guides",
            "guidesPath": "/guides",
            "wordsName": "Tools",
            "wordsPath": "/tools",
        },
        "howTo": {
            "totalTime": "PT2M",
            "estimatedCost": {"currency": "USD", "value": "0"},
            "tool": f"{name} {niche} tools",
            "stepTemplates": [
                {
                    "name": "Open the page",
                    "text": f"Open the {name} page for “{{{{name}}}}” on {{{{url}}}}.",
                },
                {
                    "name": "Review the data",
                    "text": "Read the key figures, definitions, or steps shown for “{{name}}”.",
                },
                {
                    "name": "Apply the result",
                    "text": "Use the output or checklist for “{{name}}” in your workflow.",
                },
            ],
        },
        "defaults": {
            "language": "English",
            "accent": "neutral",
            "inLanguage": "en",
        },
        "internalLinks": {"relatedLimit": 6, "minInbound": 3},
        "socialCard": {
            "width": 1200,
            "height": 630,
            "brandName": name,
            "tagline": brand["tagline"],
            "background": brand["voiceDark"],
            "surface": brand["voice"],
            "accent": brand["voiceGlow"],
            "ink": brand["paperRaised"],
            "muted": "#b7d4cf",
            "twitterCard": "summary_large_image",
            "endpointPath": "/og",
        },
        "titleGenerator": {
            "maxLength": 60,
            "brand": name,
            "brandSeparator": " · ",
            "actionVerbs": {
                "word": ["Try Free", "Instant", "Free Tool"],
                "guide": ["Free Guide", "Try Free", "Instant Tips"],
                "site": ["Try Free", "Instant Search"],
            },
            "templates": {
                "word": [
                    "{name} · {hook} · {yearShort}",
                    "{keyword} · {hook} · {price}",
                ],
                "guide": [
                    "{keyword} · {hook} {yearShort}",
                    "{name} · {hook} · {readMin}min",
                ],
                "site": [
                    "{name} · {hook} {yearShort}",
                    "{keyword} · {hook} · {price}",
                ],
            },
        },
        "faqPage": {
            "minQuestions": 2,
            "maxQuestions": 3,
            "categoryLabels": {
                "tools": "tools and calculators",
                "guides": "guides",
                "crypto": "crypto and markets",
            },
            "word": [
                {
                    "question": "What is {{name}}?",
                    "answer": f"Open the {name} page for “{{{{name}}}}” at {{{{url}}}} for a free overview and related tools.",
                },
                {
                    "question": f"Is {{{{name}}}} free on {name}?",
                    "answer": f"Yes. {name} provides free reference pages for “{{{{name}}}}” with structured FAQ markup.",
                },
            ],
            "guide": [
                {
                    "question": "What is {{primaryKeyword}}?",
                    "answer": f"“{{{{primaryKeyword}}}}” is covered in {name}’s guide “{{{{name}}}}.”",
                },
                {
                    "question": "Who should read the {{name}} guide?",
                    "answer": "This guide suits readers exploring {{parentCategoryLabel}} topics and practical next steps.",
                },
            ],
        },
    }


def load_seed(path: Path | None) -> list[dict[str, Any]]:
    if path is None:
        return [
            {
                "name": "Getting Started",
                "primaryKeyword": "getting started",
                "parentCategory": "guides",
                "tags": ["intro", "basics"],
                "kind": "guide",
            },
            {
                "name": "Core Calculator",
                "primaryKeyword": "core calculator",
                "parentCategory": "tools",
                "tags": ["calculator", "tools"],
                "kind": "tool",
            },
        ]
    if not path.exists():
        raise SystemExit(f"Seed file not found: {path}")

    if path.suffix.lower() == ".csv":
        with path.open(encoding="utf-8", newline="") as f:
            return list(csv.DictReader(f))

    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        return data
    if isinstance(data, dict) and "pages" in data:
        return data["pages"]
    raise SystemExit("Seed must be a JSON array, {pages:[...]}, or CSV.")


def row_to_page(row: dict[str, Any], brand: dict[str, str]) -> tuple[str, dict[str, Any]]:
    name = str(row.get("name") or row.get("title") or "Untitled").strip()
    slug = str(row.get("slug") or slugify(name))
    kind = str(row.get("kind") or "guide").lower()
    prefix = "/guides" if kind == "guide" else "/tools"
    path = str(row.get("path") or f"{prefix}/{slug}")
    tags = row.get("tags") or []
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split("|") if t.strip()]
    page: dict[str, Any] = {
        "language": row.get("language") or "English",
        "accent": row.get("accent") or "neutral",
        "name": name,
        "applicationCategory": row.get("applicationCategory") or "WebApplication",
        "inLanguage": row.get("inLanguage") or "en",
        "parentCategory": row.get("parentCategory") or "guides",
        "tags": tags,
        "primaryKeyword": row.get("primaryKeyword") or name.lower(),
        "path": path,
    }
    if row.get("faq"):
        page["faq"] = row["faq"]
    elif row.get("description"):
        page["faq"] = [
            {
                "question": f"What is {name}?",
                "answer": str(row["description"]),
            },
            {
                "question": f"Is {name} free on {brand['name']}?",
                "answer": f"Yes. {brand['name']} hosts a free page for “{name}” at {brand['domain'].rstrip('/')}{path}.",
            },
        ]
    return slug, page


def llm_expand_pages(
    pages: dict[str, dict[str, Any]],
    provider: str,
    api_key: str,
    brand: dict[str, str],
    niche: str,
) -> dict[str, dict[str, Any]]:
    """Optional FAQ enrichment. Requires network + API key."""
    batch = [
        {"slug": slug, "name": p["name"], "primaryKeyword": p["primaryKeyword"]}
        for slug, p in list(pages.items())[:40]
    ]
    prompt = (
        f"You write concise FAQ pairs for a {niche} site named {brand['name']}. "
        "Return JSON object mapping slug -> {faq:[{question,answer},...]} with 2 FAQs each. "
        f"Input: {json.dumps(batch)}"
    )

    if provider == "openai":
        body = {
            "model": os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
            "messages": [
                {"role": "system", "content": "Reply with JSON only."},
                {"role": "user", "content": prompt},
            ],
            "response_format": {"type": "json_object"},
        }
        req = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=json.dumps(body).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        content = payload["choices"][0]["message"]["content"]
        enrichment = json.loads(content)
    else:
        body = {
            "model": os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-20250514"),
            "max_tokens": 4096,
            "messages": [{"role": "user", "content": prompt + "\nJSON only."}],
        }
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=json.dumps(body).encode("utf-8"),
            headers={
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        text = payload["content"][0]["text"]
        text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip())
        enrichment = json.loads(text)

    for slug, extra in enrichment.items():
        if slug in pages and isinstance(extra, dict) and extra.get("faq"):
            pages[slug]["faq"] = extra["faq"]
    return pages


def fetch_coingecko_pages(limit: int = 25) -> list[dict[str, Any]]:
    url = (
        "https://api.coingecko.com/api/v3/coins/markets"
        f"?vs_currency=usd&order=market_cap_desc&per_page={limit}&page=1&sparkline=false"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "dataset-generator/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        coins = json.loads(resp.read().decode("utf-8"))
    rows: list[dict[str, Any]] = []
    for c in coins:
        symbol = (c.get("symbol") or "").upper()
        name = c.get("name") or symbol
        price = c.get("current_price")
        rows.append(
            {
                "name": f"{name} ({symbol}) Price Overview",
                "slug": slugify(f"{symbol}-price-overview"),
                "primaryKeyword": f"{name} price",
                "parentCategory": "crypto",
                "tags": ["crypto", "price", symbol.lower()],
                "kind": "tool",
                "description": (
                    f"{name} ({symbol}) last traded near ${price} USD on CoinGecko market data. "
                    "Use this page as a free reference hub for market context—not financial advice."
                ),
            }
        )
    return rows


def build_dataset(
    brand: dict[str, str],
    niche: str,
    rows: list[dict[str, Any]],
) -> dict[str, Any]:
    pages: dict[str, dict[str, Any]] = {}
    for row in rows:
        slug, page = row_to_page(row, brand)
        pages[slug] = page
    return {
        "version": 2,
        "schema": base_schema(brand, niche),
        "pages": pages,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate dataset.json for the site template")
    parser.add_argument(
        "--mode",
        choices=["template", "openai", "anthropic", "coingecko"],
        default="template",
    )
    parser.add_argument("--seed", type=Path, default=None, help="CSV or JSON seed of pages")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--brand", default=None)
    parser.add_argument("--domain", default=None)
    parser.add_argument("--tagline", default=None)
    parser.add_argument("--niche", default="tools")
    parser.add_argument("--limit", type=int, default=25, help="CoinGecko page count")
    parser.add_argument("--api-key", default=None)
    args = parser.parse_args()

    brand = load_site_brand()
    if args.brand:
        brand["name"] = args.brand
    if args.domain:
        brand["domain"] = args.domain
    if args.tagline:
        brand["tagline"] = args.tagline

    if args.mode == "coingecko":
        rows = fetch_coingecko_pages(args.limit)
        niche = "crypto"
    else:
        rows = load_seed(args.seed)
        niche = args.niche

    dataset = build_dataset(brand, niche, rows)

    if args.mode in ("openai", "anthropic"):
        key = args.api_key or os.environ.get(
            "OPENAI_API_KEY" if args.mode == "openai" else "ANTHROPIC_API_KEY", ""
        )
        if not key:
            raise SystemExit(f"--mode {args.mode} requires --api-key or env API key")
        dataset["pages"] = llm_expand_pages(
            dataset["pages"], args.mode, key, brand, niche
        )

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(dataset, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(dataset['pages'])} pages -> {args.out}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001 — CLI surface
        print(f"error: {exc}", file=sys.stderr)
        sys.exit(1)
