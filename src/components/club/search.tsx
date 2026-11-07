"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Clock, Search, Sparkles, X } from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { searchTopics, type SearchRow } from "@/lib/spectra/search-index";
import { tint, shade } from "./bits";

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
  return (
    <AnimatePresence>
      {open && <PaletteBody onClose={onClose} onOpenTopic={onOpenTopic} />}
    </AnimatePresence>
  );
}

function PaletteBody({
  onClose,
  onOpenTopic,
}: {
  onClose: () => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchTopics(q, 33), [q]);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    setSel((current) => Math.min(current, Math.max(0, results.length - 1)));
  }, [results.length]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const pick = (row: SearchRow) => {
    onClose();
    onOpenTopic(row.unit, row.topicId);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = results[sel];
      if (row) pick(row);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-3 pb-8 pt-[8vh] sm:px-5 sm:pt-[11vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-cocoa/55 backdrop-blur-[7px]"
      />

      <m.div
        role="dialog"
        aria-modal="true"
        aria-label="Search the course"
        initial={{ opacity: 0, y: 18, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
        className="search-palette relative flex w-full max-w-[680px] flex-col overflow-hidden rounded-[26px] border border-ink/10 bg-paper text-ink sm:rounded-[30px]"
        style={{ maxHeight: "min( min(760px, 82dvh), calc(100dvh - 32px))", boxShadow: "0 34px 100px -32px rgb(24 17 12 / .58), 0 2px 8px rgb(24 17 12 / .12)" }}
      >
        <div className="border-b border-ink/[0.08] px-4 pb-4 pt-4 sm:px-6 sm:pt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">Reaction Club / Course index</p>
              <h2 className="mt-1 font-display text-[17px] font-bold tracking-tight text-ink sm:text-[19px]">Find something to revise</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Close search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 bg-ink/[0.035] text-ink-soft transition hover:bg-ink/[0.08] hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="search-input-shell flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/55 px-3.5 py-3 shadow-[inset_0_1px_2px_rgb(40_28_18_/_0.035)] transition focus-within:border-grape/45 focus-within:ring-4 focus-within:ring-grape/10 sm:px-4">
            <Search className="h-[19px] w-[19px] shrink-0 text-grape" strokeWidth={2.2} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => { setQ(e.target.value); setSel(0); }}
              onKeyDown={onKey}
              placeholder="Search a topic, concept or unit code…"
              aria-label="Search topics, concepts or unit codes"
              aria-controls="search-results"
              aria-activedescendant={results[sel] ? `search-result-${sel}` : undefined}
              autoComplete="off"
              className="search-field min-w-0 flex-1 bg-transparent font-display text-[14px] font-semibold text-ink placeholder:font-medium placeholder:text-ink-faint/75 focus:outline-none sm:text-[15px]"
            />
            {q && (
              <button type="button" onClick={() => { setQ(""); setSel(0); inputRef.current?.focus(); }} aria-label="Clear search" className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint transition hover:bg-ink/10 hover:text-ink">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <kbd className="hidden shrink-0 rounded-md border border-ink/10 bg-ink/[0.035] px-2 py-1 font-mono text-[10px] font-semibold text-ink-faint sm:inline">ESC</kbd>
          </div>
          {!q.trim() && (
            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                <Sparkles className="h-3.5 w-3.5 text-lemon" /> Popular starting points
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((term) => (
                  <button key={term} type="button" onClick={() => { setQ(term); setSel(0); inputRef.current?.focus(); }} className="rounded-full border border-ink/[0.09] bg-ink/[0.025] px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition hover:border-grape/25 hover:bg-grape/10 hover:text-grape">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between px-4 pb-2 pt-3 sm:px-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">{q.trim() ? "Matching topics" : "Browse the course"}</p>
            <span className="font-mono text-[10px] font-semibold tabular-nums text-ink-faint">{q.trim() ? `${results.length} results` : "6 units · 33 topics"}</span>
          </div>

          <div id="search-results" ref={listRef} role="listbox" aria-label="Search results" className="min-h-0 flex-1 overflow-y-auto px-2 pb-3 sm:px-3">
            {!q.trim() ? (
              <div className="mx-2 my-2 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.018] px-4 py-7 text-center">
                <p className="font-display text-[14px] font-semibold text-ink">Your next revision topic is a search away.</p>
                <p className="mt-1 text-[12px] text-ink-faint">Try a concept above, or enter a unit code such as WCH11.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="mx-2 my-2 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.018] px-4 py-9 text-center">
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-ink/[0.06] text-ink-faint"><Search className="h-4 w-4" /></div>
                <p className="mt-3 font-display text-[15px] font-semibold text-ink">No matches found</p>
                <p className="mt-1 text-[12px] text-ink-faint">Try a broader term, a shorter phrase or a unit code.</p>
              </div>
            ) : (
              results.map((row, i) => {
                const active = i === sel;
                return (
                  <button
                    key={`${row.unit}/${row.topicId}`}
                    id={`search-result-${i}`}
                    data-idx={i}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setSel(i)}
                    onClick={() => pick(row)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors sm:gap-3.5 sm:px-3.5 ${active ? "bg-ink/[0.065]" : "hover:bg-ink/[0.035]"}`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-[11px] font-bold text-white" style={{ background: row.unitMain, boxShadow: `inset 0 1px 0 rgb(255 255 255 / .2), 0 2px 0 ${shade(row.unitMain)}` }}>
                      {row.unit.replace("WCH", "")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex min-w-0 items-center gap-2">
                        <Highlight text={row.title} q={q} />
                        <span className="hidden shrink-0 rounded-md px-2 py-1 text-[9px] font-bold sm:inline" style={{ background: tint(row.unitMain, 13), color: shade(row.unitMain, 62) }}>{row.label}</span>
                      </span>
                      <span className="mt-1 block truncate text-[11px] font-medium text-ink-faint sm:text-[12px]">{row.summary}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tabular-nums text-ink-faint">
                      <Clock className="h-3.5 w-3.5" />{row.minutes}m
                      <ArrowRight className={`ml-1 h-4 w-4 transition-all ${active ? "translate-x-0 opacity-80" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} />
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-ink/[0.08] bg-ink/[0.018] px-4 py-3 sm:px-6">
          <div className="hidden items-center gap-2 text-[10px] font-medium text-ink-faint sm:flex">
            <kbd className="rounded border border-ink/10 bg-paper px-1.5 py-1 font-mono">↑</kbd>
            <kbd className="rounded border border-ink/10 bg-paper px-1.5 py-1 font-mono">↓</kbd>
            <span>Navigate</span>
            <kbd className="ml-1 rounded border border-ink/10 bg-paper px-1.5 py-1 font-mono">↵</kbd>
            <span>Open topic</span>
          </div>
          <span className="text-[10px] font-medium text-ink-faint sm:hidden">Tap a result to open it</span>
          <span className="ml-auto text-right text-[10px] font-medium text-ink-faint">Search all 6 units · 33 topics</span>
        </div>
      </m.div>
    </div>
  );
}

function Highlight({ text, q }: { text: string; q: string }) {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let target = -1;
  const lower = text.toLowerCase();
  for (const word of words) {
    const at = lower.indexOf(word);
    if (at >= 0 && (target < 0 || at < target)) target = at;
  }
  if (target < 0) {
    return <span className="min-w-0 truncate font-display text-[13px] font-semibold text-ink sm:text-[14px]">{text}</span>;
  }
  const word = words.find((part) => lower.startsWith(part, target))!;
  return (
    <span className="min-w-0 truncate font-display text-[13px] font-semibold text-ink sm:text-[14px]">
      {text.slice(0, target)}<mark className="rounded bg-lemon/25 px-0.5 text-inherit">{text.slice(target, target + word.length)}</mark>{text.slice(target + word.length)}
    </span>
  );
}
