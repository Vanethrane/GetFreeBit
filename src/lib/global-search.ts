import {
  normalizeSearchQuery,
  type HeaderSearchEntry,
} from "@/lib/header-search";

export type GlobalMetaEntry = HeaderSearchEntry;

export type GlobalSearchIndex = {
  v: number;
  meta: GlobalMetaEntry[];
  metaCount?: number;
  builtAt?: string;
};

export type GlobalSearchResult = {
  id: string;
  type: GlobalMetaEntry["type"];
  label: string;
  hint: string;
  href: string;
  score: number;
};

export type GlobalSearchResponse = {
  results: GlobalSearchResult[];
  /** True when no query matches — showing closest items instead */
  isFallback: boolean;
  elapsedMs: number;
};

let cachedIndex: GlobalSearchIndex | null = null;
let loadPromise: Promise<GlobalSearchIndex> | null = null;

export function clearGlobalSearchCache(): void {
  cachedIndex = null;
  loadPromise = null;
}

/** Fetch and cache the generated index (lazy, once per session). */
export async function loadGlobalSearchIndex(): Promise<GlobalSearchIndex> {
  if (cachedIndex) return cachedIndex;
  if (!loadPromise) {
    loadPromise = fetch("/global-search-index.json", { cache: "force-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`Search index HTTP ${res.status}`);
        return res.json() as Promise<GlobalSearchIndex>;
      })
      .then((data) => {
        cachedIndex = data;
        return data;
      });
  }
  return loadPromise;
}

function metaToResult(entry: GlobalMetaEntry, score: number): GlobalSearchResult {
  return {
    id: entry.id,
    type: entry.type,
    label: entry.label,
    hint: entry.hint,
    href: entry.href,
    score,
  };
}

function scoreMeta(query: string, entry: GlobalMetaEntry): number {
  if (!query) return 0;
  let score = 0;
  const label = entry.label.toLowerCase();

  if (label === query) score += 120;
  if (entry.id.endsWith(`:${query.replace(/\s+/g, "-")}`)) score += 110;

  for (const term of entry.terms) {
    if (term === query) score += 90;
    else if (term.startsWith(query)) score += 55;
    else if (query.startsWith(term) && term.length >= 3) score += 40;
    else if (term.includes(query)) score += 28;
  }

  const tokens = query.split(/\s+/).filter((t) => t.length >= 2);
  for (const token of tokens) {
    if (label.includes(token)) score += 12;
    for (const term of entry.terms) {
      if (term.includes(token)) score += 8;
    }
  }

  return score;
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

function findClosestResults(
  query: string,
  index: GlobalSearchIndex,
  limit: number,
): GlobalSearchResult[] {
  const q = query;
  const scored: GlobalSearchResult[] = [];

  for (const entry of index.meta) {
    const label = entry.label.toLowerCase();
    const dist = levenshtein(q, label);
    scored.push(metaToResult(entry, 500 - dist));
  }

  scored.sort(
    (a, b) => b.score - a.score || a.label.localeCompare(b.label),
  );

  return scored.slice(0, limit);
}

/** Filter editorial + dataset entries client-side. Target <10ms on warm index. */
export function searchGlobalIndex(
  query: string,
  index: GlobalSearchIndex,
  limit = 12,
): GlobalSearchResponse {
  const started = typeof performance !== "undefined" ? performance.now() : 0;
  const q = normalizeSearchQuery(query);

  if (!q) {
    return { results: [], isFallback: false, elapsedMs: 0 };
  }

  const merged: GlobalSearchResult[] = [];

  for (const entry of index.meta) {
    const score = scoreMeta(q, entry);
    if (score > 0) merged.push(metaToResult(entry, score));
  }

  merged.sort(
    (a, b) => b.score - a.score || a.label.localeCompare(b.label),
  );

  const unique = new Map<string, GlobalSearchResult>();
  for (const row of merged) {
    if (!unique.has(row.id)) unique.set(row.id, row);
  }

  let results = [...unique.values()].slice(0, limit);
  let isFallback = false;

  if (results.length === 0) {
    results = findClosestResults(q, index, 3);
    isFallback = true;
  }

  const elapsedMs =
    typeof performance !== "undefined" ? performance.now() - started : 0;

  return { results, isFallback, elapsedMs };
}

/** Resolve navigation for Enter with no selection — never dead-end. */
export function resolveGlobalSearchHref(
  query: string,
  index: GlobalSearchIndex,
  picked?: GlobalSearchResult | null,
): string {
  if (picked) return picked.href;

  const { results } = searchGlobalIndex(query, index, 8);
  if (results.length > 0) return results[0].href;

  const categoryFallback = index.meta.find((e) => e.type === "category");
  return categoryFallback?.href || "/guides";
}
