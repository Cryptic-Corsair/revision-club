"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Clock, Search, X } from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { SEARCH_INDEX, searchTopics, type SearchRow } from "@/lib/spectra/search-index";
import { shade } from "./bits";

const SUGGESTIONS = ["moles", "enthalpy", "chirality", "buffers", "titration", "entropy"];

export function SearchPalette({
  open,
  onClose,
  onOpenTopic,
}: {
  open: boolean;
  onClose: () => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const results = useMemo(
    () => q.trim() ? searchTopics(q, SEARCH_INDEX.length) : SEARCH_INDEX,
    [q],
  );

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setSel(0);
  }, [q]);

  useEffect(() => {
    setSel((current) => Math.min(current, Math.max(0, results.length - 1)));
  }, [results.length]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, sel]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  if (!open) return null;

  const pick = (row: SearchRow) => {
    onClose();
    onOpenTopic(row.unit, row.topicId);
  };

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSel((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSel((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const row = results[sel];
      if (row) pick(row);
    }
  };

  const groups = results.reduce<Record<string, SearchRow[]>>((all, row) => {
    (all[row.unit] ??= []).push(row);
    return all;
  }, {});
  let rowIndex = -1;

  return (
    <main className="fixed inset-0 z-[90] overflow-y-auto bg-paper text-ink" aria-label="IAL CHEM search">
      <div className="sticky top-0 z-20 border-b border-ink/[0.09] bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 sm:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/[0.055] text-grape">
              <Search className="h-[18px] w-[18px]" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-[14px] font-bold text-ink">Course search</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-faint">IAL CHEM  /  PEARSON EDEXCEL</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.035] px-3.5 text-[12px] font-semibold text-ink-soft transition hover:bg-ink/[0.08] hover:text-ink" aria-label="Close search">
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Close</span>
            <kbd className="hidden rounded border border-ink/10 px-1.5 py-0.5 font-mono text-[9px] text-ink-faint sm:inline">ESC</kbd>
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 pb-16 pt-8 sm:px-7 sm:pt-11 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:px-10 lg:pt-14">
        <section className="min-w-0">
          <div className="max-w-[760px]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-grape">THE COURSE INDEX · WCH11–WCH16</p>
            <h1 className="mt-2 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-tight text-ink">Find the topic.<br className="hidden sm:block" /> Get back to learning.</h1>
            <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-ink-soft">Search concepts, topic titles, specification points or unit codes. Or browse the complete course index.</p>

            <div className="search-input-shell mt-7 flex items-center gap-3 rounded-2xl border border-ink/15 bg-paper px-4 py-4 shadow-[0_8px_28px_-22px_rgb(40_28_18_/_0.32)] transition focus-within:border-grape/50 focus-within:ring-4 focus-within:ring-grape/10 sm:px-5">
              <Search className="h-5 w-5 shrink-0 text-grape" strokeWidth={2.2} />
              <input
                ref={inputRef}
                value={q}
                onChange={(event) => setQ(event.target.value)}
                onKeyDown={onKey}
                placeholder="Try “equilibrium”, “WCH14” or “2.3”…"
                aria-label="Search topics, concepts or unit codes"
                aria-controls="search-results"
                aria-activedescendant={results[sel] ? `search-result-${sel}` : undefined}
                autoComplete="off"
                className="search-field min-w-0 flex-1 bg-transparent font-display text-[15px] font-semibold text-ink placeholder:font-medium placeholder:text-ink-faint/75 focus:outline-none sm:text-[16px]"
              />
              {q && <button type="button" onClick={() => { setQ(""); inputRef.current?.focus(); }} aria-label="Clear search" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-faint transition hover:bg-ink/10 hover:text-ink"><X className="h-4 w-4" /></button>}
              <span className="hidden shrink-0 font-mono text-[10px] text-ink-faint sm:inline">↵ OPEN</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">Popular searches</span>
              {SUGGESTIONS.map((term) => (
                <button key={term} type="button" onClick={() => { setQ(term); inputRef.current?.focus(); }} className="rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition hover:border-grape/30 hover:bg-grape/10 hover:text-grape">{term}</button>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-ink-faint">{q.trim() ? "Search results" : "Course directory"}</p>
                <h2 className="mt-1 font-display text-[20px] font-bold tracking-tight text-ink">{q.trim() ? "Matching topics" : "View all topics"}</h2>
              </div>
              <span aria-live="polite" className="rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1.5 font-mono text-[10px] font-semibold tabular-nums text-ink-faint">{results.length} of {SEARCH_INDEX.length} topics</span>
            </div>

            <div id="search-results" ref={listRef} className="space-y-7" aria-label="Course topics">
              {results.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-ink/15 bg-ink/[0.02] px-5 py-12 text-center">
                  <p className="font-display text-[16px] font-semibold text-ink">No matching topics</p>
                  <p className="mt-2 text-[12px] text-ink-faint">Try a different keyword, a shorter phrase or a unit code.</p>
                  <button type="button" onClick={() => setQ("")} className="mt-4 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold text-paper transition hover:opacity-85">Browse all topics</button>
                </div>
              ) : Object.entries(groups).map(([unit, rows]) => (
                <section key={unit}>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-5 w-1 rounded-full" style={{ background: rows[0].unitMain }} />
                    <h3 className="font-mono text-[11px] font-bold tracking-[0.12em] text-ink-soft">{unit}</h3>
                    <span className="text-[10px] text-ink-faint">{rows.length} {rows.length === 1 ? "topic" : "topics"}</span>
                    <span className="h-px flex-1 bg-ink/[0.08]" />
                  </div>
                  <div className="space-y-1.5">
                    {rows.map((row) => {
                      const index = ++rowIndex;
                      const active = index === sel;
                      return (
                        <button
                          key={`${row.unit}/${row.topicId}`}
                          id={`search-result-${index}`}
                          data-idx={index}
                          type="button"
                          aria-current={active ? "true" : undefined}
                          onMouseEnter={() => setSel(index)}
                          onClick={() => pick(row)}
                          className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-3.5 text-left transition-colors sm:px-3 ${active ? "bg-ink/[0.055]" : "hover:bg-ink/[0.03]"}`}
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-[10px] font-bold text-white" style={{ background: row.unitMain, boxShadow: `inset 0 1px 0 rgb(255 255 255 / .2), 0 2px 0 ${shade(row.unitMain)}` }}>{row.label}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-[13px] font-semibold text-ink sm:text-[14px]">{row.title}</span>
                            <span className="mt-1 block truncate text-[11px] font-medium text-ink-faint sm:text-[12px]">{row.summary}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tabular-nums text-ink-faint"><Clock className="h-3.5 w-3.5" />{row.minutes}m</span>
                          <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${active ? "translate-x-0 text-grape" : "-translate-x-1 text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-70"}`} />
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <aside className="order-last lg:order-none">
          <div className="lg:sticky lg:top-[88px]">
            <div className="rounded-2xl border border-ink/10 bg-ink/[0.025] p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">COURSE OVERVIEW</p>
              <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-1">
                <div><p className="font-display text-[25px] font-bold tabular-nums text-ink">6</p><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink-faint">Units</p></div>
                <div><p className="font-display text-[25px] font-bold tabular-nums text-ink">33</p><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink-faint">Topics</p></div>
                <div><p className="font-display text-[25px] font-bold tabular-nums text-ink">13h</p><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink-faint">Reading time</p></div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-ink/10 p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">SEARCH BY</p>
              <ul className="mt-3 space-y-3 text-[11px] leading-5 text-ink-soft">
                <li><strong className="text-ink">Topic title</strong><br />Try “rates of reaction” or “redox”.</li>
                <li><strong className="text-ink">Unit code</strong><br />Enter WCH11 through WCH16.</li>
                <li><strong className="text-ink">Specification label</strong><br />Search for a point such as 2.3.</li>
              </ul>
            </div>
            <p className="mt-4 px-1 text-[10px] leading-5 text-ink-faint">Navigate results with ↑ and ↓. Press Enter to open a topic, or Escape to return to the course.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
