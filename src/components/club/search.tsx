"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const results = useMemo(
    () => q.trim() ? searchTopics(q, SEARCH_INDEX.length) : SEARCH_INDEX,
    [q],
  );

  useEffect(() => setSel(0), [q]);

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

  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true });
  }, [open]);

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

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <m.button
            key="search-scrim"
            type="button"
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-[89] cursor-default bg-cocoa/30 backdrop-blur-[2px]"
          />
          <m.section
            key="search-drawer"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="IAL CHEM course search"
            tabIndex={-1}
            initial={{ y: "102%" }}
            animate={{ y: 0 }}
            exit={{ y: "102%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-[90] flex h-[min(86dvh,780px)] flex-col overflow-hidden rounded-t-[28px] border-t-2 border-[var(--edge)] bg-paper text-ink shadow-[0_-30px_60px_-24px_rgb(0_0_0/0.4)] outline-none"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex shrink-0 justify-center py-2.5" aria-hidden>
              <span className="h-1.5 w-12 rounded-full bg-ink/15" />
            </div>

            <div className="mx-auto flex min-h-0 w-full max-w-[920px] flex-1 flex-col">
              <header className="flex shrink-0 items-center gap-3 px-4 pb-3 sm:px-6">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/[0.055] text-grape">
                  <Search className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[14px] font-bold text-ink">Course search</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-faint">IAL CHEM / PEARSON EDEXCEL</p>
                </div>
                <span className="hidden font-mono text-[10px] text-ink-faint sm:inline">ESC TO CLOSE</span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </header>

              <div className="shrink-0 px-4 pb-2 sm:px-6">
                <div className="group flex h-[54px] items-center gap-3 rounded-full border border-ink/[0.09] bg-ink/[0.055] px-3 pl-3.5 transition-colors focus-within:border-grape/35 focus-within:bg-ink/[0.075]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-grape shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
                    <Search className="h-[15px] w-[15px]" strokeWidth={2.3} />
                  </span>
                  <input
                    ref={inputRef}
                    value={q}
                    onChange={(event) => setQ(event.target.value)}
                    onKeyDown={onKey}
                    placeholder="Find a topic, concept or unit…"
                    aria-label="Search topics, concepts or unit codes"
                    aria-controls="search-results"
                    aria-activedescendant={results[sel] ? `search-result-${sel}` : undefined}
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent font-display text-[14px] font-semibold tracking-[-0.01em] text-ink placeholder:font-medium placeholder:text-ink-faint focus:outline-none sm:text-[15px]"
                  />
                  {q ? (
                    <button
                      type="button"
                      onClick={() => { setQ(""); inputRef.current?.focus(); }}
                      aria-label="Clear search"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/[0.07] text-ink-soft transition-colors hover:bg-ink/[0.12] hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <kbd className="hidden shrink-0 rounded-full border border-ink/10 bg-paper/75 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wide text-ink-faint sm:inline">⌘ K</kbd>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <span className="shrink-0 pr-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-faint">Popular</span>
                  {SUGGESTIONS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => { setQ(term); }}
                      className="shrink-0 rounded-full border border-ink/[0.09] bg-paper/70 px-3 py-1.5 text-[10px] font-semibold text-ink-soft transition-colors hover:border-grape/25 hover:bg-grape/[0.07] hover:text-grape"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-y border-ink/10 px-4 py-2.5 sm:px-6">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink-faint">
                    {q.trim() ? "SEARCH RESULTS" : "COURSE DIRECTORY"}
                  </p>
                  <p className="mt-0.5 truncate font-display text-[13px] font-bold text-ink">
                    {q.trim() ? "Matching topics" : "Browse all topics"}
                  </p>
                </div>
                <span aria-live="polite" className="shrink-0 rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1.5 font-mono text-[10px] font-semibold tabular-nums text-ink-faint">
                  {results.length} / {SEARCH_INDEX.length}
                </span>
              </div>

              <div
                id="search-results"
                ref={listRef}
                className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6"
                aria-label="Course topics"
                style={{ overscrollBehavior: "contain" }}
              >
                {results.length === 0 ? (
                  <div className="mx-auto max-w-md rounded-[24px] border border-dashed border-ink/15 bg-ink/[0.025] px-6 py-12 text-center">
                    <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-ink/[0.06] text-ink-faint">
                      <Search className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-display text-[16px] font-semibold text-ink">No topics found</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink-faint">Try another term, a shorter phrase or a unit code.</p>
                    <button type="button" onClick={() => setQ("")} className="mt-5 rounded-full bg-ink px-4 py-2.5 text-[11px] font-bold text-paper transition-opacity hover:opacity-85">Clear search</button>
                  </div>
                ) : Object.entries(groups).map(([unit, rows]) => (
                  <section key={unit} className="overflow-hidden rounded-[22px] border border-ink/[0.085] bg-paper shadow-[0_8px_24px_-22px_rgb(40_28_18/0.28)]">
                    <div className="flex items-center gap-3 border-b border-ink/[0.07] px-4 py-3 sm:px-5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-[10px] font-bold text-white" style={{ background: rows[0].unitMain, boxShadow: `0 2px 0 ${shade(rows[0].unitMain)}` }}>
                        {unit.replace("UNIT ", "")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[13px] font-bold tracking-tight text-ink">{unit}</h3>
                        <p className="mt-0.5 text-[10px] font-medium text-ink-faint">{rows.length} {rows.length === 1 ? "topic" : "topics"} in this unit</p>
                      </div>
                      <span className="h-1.5 w-12 overflow-hidden rounded-full bg-ink/[0.07]">
                        <span className="block h-full rounded-full" style={{ width: `${Math.min(100, rows.length / 8 * 100)}%`, background: rows[0].unitMain }} />
                      </span>
                    </div>
                    <div className="grid gap-1.5 p-2 sm:grid-cols-2 sm:gap-2 sm:p-3">
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
                            className={`group flex min-h-[76px] min-w-0 items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition-colors ${active ? "border-grape/25 bg-grape/[0.065]" : "border-transparent hover:border-ink/[0.09] hover:bg-ink/[0.025]"}`}
                          >
                            <span
                              aria-hidden="true"
                              className="h-9 w-[3px] shrink-0 rounded-full"
                              style={{ background: row.unitMain }}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="mb-1 block whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink-faint">{row.label}</span>
                              <span className="block text-[12px] font-bold leading-snug text-ink sm:text-[12.5px]">{row.title}</span>
                              <span className="mt-1 block line-clamp-1 text-[10px] font-medium text-ink-faint">{row.summary}</span>
                            </span>
                            <span className="flex shrink-0 flex-col items-end gap-1 text-[9px] font-semibold tabular-nums text-ink-faint">
                              <span>{row.minutes} min</span>
                              <ArrowRight className={`h-3.5 w-3.5 transition-transform ${active ? "translate-x-0.5 text-grape" : "text-ink-faint/50 group-hover:translate-x-0.5"}`} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-ink/10 px-4 py-2.5 text-[10px] font-medium text-ink-faint sm:px-6">
                <span>6 units · 33 topics · WCH11–WCH16</span>
                <span className="hidden sm:inline">↑ ↓ navigate · Enter open · Esc close</span>
              </footer>
            </div>
          </m.section>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
