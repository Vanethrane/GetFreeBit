"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HOME_SEARCH_QUICK_TERMS } from "@/lib/glossary-search";
import {
  getHeaderSearchIndex,
  normalizeSearchQuery,
  resolveHeaderSearch,
  searchHeaderIndex,
  type HeaderSearchEntry,
} from "@/lib/header-search";

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function hintBadge(entry: HeaderSearchEntry): string {
  if (entry.type === "term") return "Term";
  if (entry.type === "howto") return "Learn";
  if (entry.type === "news") return "News";
  if (entry.type === "guide") return "Do";
  return entry.hint;
}

type HomeSearchProps = {
  className?: string;
};

/** Hero search — crypto glossary terms plus guides, how-tos, and news. */
export function HomeSearch({ className = "" }: HomeSearchProps) {
  const router = useRouter();
  const index = useMemo(() => getHeaderSearchIndex(), []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLFormElement>(null);

  const results = useMemo(() => {
    const q = normalizeSearchQuery(query);
    if (q.length < 1) return [];
    return searchHeaderIndex(q, index, 10);
  }, [query, index]);

  useEffect(() => {
    setActive(0);
    setOpen(results.length > 0 && query.trim().length > 0);
  }, [results.length, query]);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function navigate(entry?: HeaderSearchEntry) {
    const raw = query.trim();
    if (!raw && !entry) return;

    let href: string;
    if (entry) {
      href = entry.href;
    } else {
      href = resolveHeaderSearch(raw, index, { staticSite: false });
    }

    setOpen(false);
    setQuery("");
    if (/^https?:\/\//i.test(href)) {
      window.location.href = href;
      return;
    }
    router.push(href);
  }

  function applyQuickTerm(term: string) {
    setQuery(term);
    const matches = searchHeaderIndex(normalizeSearchQuery(term), index, 1);
    if (matches[0]) {
      navigate(matches[0]);
      return;
    }
    setOpen(true);
  }

  const visible = open ? results : [];

  return (
    <div className={className}>
      <form
        ref={wrapRef}
        role="search"
        className="relative"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(visible[active]);
        }}
      >
        <label className="sr-only" htmlFor="home-crypto-search">
          Search crypto terms, guides, how-tos, and news
        </label>
        <div className="search-panel flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card backdrop-blur-sm transition focus-within:border-voice focus-within:ring-2 focus-within:ring-voice/20">
          <SearchIcon className="shrink-0 text-voice-dark" />
          <input
            id="home-crypto-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            onKeyDown={(event) => {
              if (!visible.length) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => (i + 1) % visible.length);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => (i - 1 + visible.length) % visible.length);
              } else if (event.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder="Search crypto terms — staking, gas, wallet, DeFi…"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted/80"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-voice px-4 py-2 text-sm font-semibold text-paper-raised hover:bg-voice-dark"
          >
            Search
          </button>
        </div>

        {visible.length > 0 ? (
          <ul
            className="absolute z-50 mt-2 max-h-[min(22rem,50vh)] w-full overflow-auto rounded-xl border border-paper-line bg-paper-raised py-1 shadow-card"
            role="listbox"
            aria-label="Search suggestions"
          >
            {visible.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => navigate(item)}
                  className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition ${
                    index === active ? "bg-voice-glow" : "hover:bg-paper"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`truncate font-medium ${
                        index === active ? "text-voice-dark" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="shrink-0 rounded-full border border-paper-line px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-muted">
                      {hintBadge(item)}
                    </span>
                  </span>
                  {item.detail ? (
                    <span className="line-clamp-2 text-xs leading-relaxed text-ink-muted">
                      {item.detail}
                    </span>
                  ) : item.type !== "term" ? (
                    <span className="truncate text-xs text-ink-muted">{item.hint}</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </form>

      <p className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-ink-muted">
        <span className="mr-1">Try:</span>
        {HOME_SEARCH_QUICK_TERMS.map((term, i) => (
          <span key={term} className="inline-flex items-center">
            <button
              type="button"
              onClick={() => applyQuickTerm(term)}
              className="rounded-md px-1.5 py-0.5 font-medium text-voice-dark underline-offset-2 hover:bg-voice-glow hover:underline"
            >
              {term}
            </button>
            {i < HOME_SEARCH_QUICK_TERMS.length - 1 ? (
              <span className="mx-1 text-paper-line" aria-hidden="true">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>
    </div>
  );
}

export default HomeSearch;
