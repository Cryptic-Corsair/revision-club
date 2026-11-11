"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Search, X } from "./icons";
import { Mascot } from "./bits";
import type { UnitCode } from "@/lib/spectra/types";
import { SEARCH_INDEX, searchTopics, type SearchRow } from "@/lib/spectra/search-index";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the course search — one palette, both interfaces.
   The palette is shared chrome like the spec map and the customize
   panel, so it speaks the ACTIVE interface's own ink: the whole
   sheet reads var(--search-accent), resolved per dress in
   globals.css (the gallery's bronze wherever the white-wall dress
   is on, the document room's rust otherwise). One design, no
   per-dress twin: the masthead and the hairline finder speak the
   spec map's language, the rows speak the spec index's ledger, and
   every lab re-inks the token in one hop.
   ═══════════════════════════════════════════════════════════════ */

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
            className="search-palette fixed inset-0 z-[89] cursor-default bg-cocoa/30 backdrop-blur-[2px]"
          />
          <m.section
            key="search-drawer"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="IAL CHEM course search"
            tabIndex={-1}
            initial={{ y: "104%" }}
            animate={{ y: 0 }}
            exit={{ y: "104%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="search-palette fixed inset-x-0 bottom-0 z-[90] flex h-[min(86dvh,780px)] flex-col overflow-hidden rounded-t-[24px] border-t-2 border-[var(--edge)] bg-paper text-ink shadow-[0_-30px_60px_-24px_rgb(0_0_0/0.4)] outline-none md:bottom-[14px] md:mx-auto md:w-[min(calc(100vw-44px),720px)] md:rounded-[24px] md:border md:border-t md:border-ink/[0.12] md:shadow-[0_-24px_70px_-30px_rgb(0_0_0/0.42)] xl:bottom-[22px] xl:w-[min(calc(100vw-72px),1080px)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex shrink-0 justify-center py-2.5" aria-hidden>
              <span className="h-1.5 w-12 rounded-full bg-ink/15" />
            </div>

            <div className="mx-auto flex min-h-0 w-full max-w-[920px] flex-1 flex-col md:max-w-none">
              {/* the masthead — the spec map's language: the dress's
                  dash and small caps name the room, the ledger line
                  underneath says what the shelf holds right now */}
              <header className="flex shrink-0 items-start gap-3 px-4 pb-3 sm:px-6">
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden
                      className="h-[2.5px] w-4 shrink-0 rounded-full"
                      style={{ background: "var(--search-accent)" }}
                    />
                    <span
                      className="shrink-0 font-display text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "var(--search-accent)" }}
                    >
                      Course search
                    </span>
                    <span className="min-w-0 truncate font-display text-[12px] font-bold uppercase tracking-[0.08em] text-ink">
                      IAL CHEM · PEARSON EDEXCEL
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-[12.5px] font-semibold text-ink-soft">
                    {q.trim() !== ""
                      ? `${results.length} of ${SEARCH_INDEX.length} topics match — Enter opens the highlighted one`
                      : `${SEARCH_INDEX.length} topics across 6 units — type to cut the shelf down`}
                  </p>
                </div>
                <span className="mt-1 hidden font-mono text-[10px] text-ink-faint sm:inline">
                  ESC TO CLOSE
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="mt-0.5 grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/[0.12] bg-paper text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </button>
              </header>

              {/* the finder — the spec map's hairline field, not a
                  filled pill; focus leans into the dress's ink */}
              <div className="shrink-0 px-4 pb-2 sm:px-6">
                <div className="search-field flex h-[52px] items-center gap-3 rounded-[14px] border border-ink/[0.13] bg-paper px-3.5 transition-colors">
                  <Search className="h-[17px] w-[17px] shrink-0 text-ink-faint" strokeWidth={2.2} />
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
                    className="min-w-0 flex-1 bg-transparent text-[14.5px] font-semibold tracking-[-0.01em] text-ink placeholder:font-medium placeholder:text-ink-faint focus:outline-none sm:text-[15px]"
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
              </div>

              <div
                id="search-results"
                ref={listRef}
                className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-3 sm:px-6"
                aria-label="Course topics"
                style={{ overscrollBehavior: "contain" }}
              >
                {results.length === 0 ? (
                  <div className="mx-auto max-w-md rounded-[22px] border border-dashed border-ink/15 bg-ink/[0.025] px-6 py-12 text-center">
                    <Mascot main="var(--search-accent)" mood="wow" size={64} bubbles={false} className="mx-auto" />
                    <p className="mt-4 font-display text-[16px] font-semibold text-ink">No topics found</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink-faint">Try another term, a shorter phrase or a unit code.</p>
                    <button type="button" onClick={() => setQ("")} className="mt-5 rounded-full bg-ink px-4 py-2.5 text-[11px] font-bold text-paper transition-opacity hover:opacity-85">Clear search</button>
                  </div>
                ) : Object.entries(groups).map(([unit, rows]) => (
                  <section key={unit} className="space-y-1.5">
                    <div className="flex items-center gap-2.5 px-1 pb-0.5 pt-1">
                      <span className="h-4 w-[3px] rounded-full" style={{ background: rows[0].unitMain }} />
                      <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">{unit}</h3>
                      <span className="font-mono text-[9px] tabular-nums text-ink-faint">{rows.length}</span>
                      <span className="h-px flex-1 bg-ink/[0.08]" />
                    </div>
                    {/* the ledger — one framed card per unit, its rows
                        divided like the spec index's statements; the
                        highlighted row floods with the dress's ink
                        (.search-row[data-active] in globals.css) */}
                    <div className="overflow-hidden rounded-[16px] border border-ink/[0.08] bg-paper">
                      {rows.map((row) => {
                        const index = ++rowIndex;
                        const active = index === sel;
                        return (
                          <button
                            key={`${row.unit}/${row.topicId}`}
                            id={`search-result-${index}`}
                            data-idx={index}
                            data-active={active ? "true" : undefined}
                            type="button"
                            aria-current={active ? "true" : undefined}
                            onMouseEnter={() => setSel(index)}
                            onClick={() => pick(row)}
                            className="search-row group flex w-full min-w-0 cursor-pointer items-center gap-3.5 border-b border-ink/[0.07] px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-ink/[0.03]"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                                {row.label}
                              </span>
                              <span className="mt-0.5 block truncate text-[13px] font-semibold leading-snug text-ink sm:text-[13.5px]">
                                {row.title}
                              </span>
                              <span className="mt-0.5 hidden truncate text-[11px] leading-snug text-ink-faint sm:block">
                                {row.summary}
                              </span>
                            </span>
                            <span className="flex shrink-0 items-center gap-2.5 text-[10px] font-semibold tabular-nums text-ink-faint">
                              <span className="rounded-full bg-ink/[0.05] px-2 py-0.5">
                                {row.minutes} min
                              </span>
                              <ArrowRight className="search-row-goto h-3.5 w-3.5 text-ink-faint/50" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-ink/10 px-4 py-2.5 text-[10px] font-medium text-ink-faint sm:px-6">
                <span>6 units · {SEARCH_INDEX.length} topics · WCH11–WCH16</span>
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
