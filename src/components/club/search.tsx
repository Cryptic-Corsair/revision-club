"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Search, Sparkles } from "lucide-react";
import type { UnitCode } from "@/lib/spectra/types";
import { searchTopics, type SearchRow } from "@/lib/spectra/deck";
import { Fmt } from "./format";
import { tint, shade } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the ⌘K bubble — search every topic
   ⌘K / Ctrl+K toggles · ↑ ↓ navigate · Enter opens · Esc flees
   ═══════════════════════════════════════════════════════════════ */

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
    <AnimatePresence>{open && <PaletteBody onClose={onClose} onOpenTopic={onOpenTopic} />}</AnimatePresence>
  );
}

/* ————— the body mounts fresh on every open, so q/sel start clean ————— */

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

  const results = useMemo(() => searchTopics(q), [q]);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${sel}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const pick = (row: SearchRow) => {
    onClose();
    onOpenTopic(row.unit, row.topicId);
  };

  const onKey = (e: React.KeyboardEvent) => {
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
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
    >
          {/* overlay */}
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-cocoa/45 backdrop-blur-[6px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search topics"
            initial={{ opacity: 0, y: -26, scale: 0.94, rotate: -1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -18, scale: 0.95, rotate: 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[32px] bg-paper puff"
            style={{ boxShadow: "0 8px 0 rgb(61 43 31 / 0.05), 0 40px 90px -30px rgb(46 32 22 / 0.5)" }}
          >
            {/* input row */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-grape/15">
                <Search className="h-5 w-5 text-grape" strokeWidth={2.5} />
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={onKey}
                placeholder="Search the club… try “buffer” or “WCH14”"
                aria-label="Search topics"
                className="min-w-0 flex-1 bg-transparent font-display text-[17px] font-semibold text-ink placeholder:text-ink-faint/70 focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[11px] font-bold text-ink-soft sm:block">
                esc
              </kbd>
            </div>

            <div className="mx-5 h-[3px] rounded-full bg-[linear-gradient(90deg,#FF6B6B,#FFD43B,#12B886,#9775FA)] opacity-70" />

            {/* results */}
            <div ref={listRef} className="max-h-[46vh] overflow-y-auto px-3 py-3">
              {!q.trim() ? (
                <div className="px-3 py-5">
                  <div className="flex items-center gap-2 font-display text-[12px] font-bold tracking-[0.16em] text-ink-faint uppercase">
                    <Sparkles className="h-3.5 w-3.5 text-lemon" /> try asking for
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setQ(s);
                          setSel(0);
                          inputRef.current?.focus();
                        }}
                        className="cursor-pointer rounded-full bg-ink/5 px-3.5 py-2 text-[13px] font-extrabold text-ink-soft transition-colors hover:bg-grape/15 hover:text-grape"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="px-3 py-8 text-center">
                  <p className="font-display text-[16px] font-semibold text-ink">
                    Nothing in the jar matches “{q}”.
                  </p>
                  <p className="mt-1 text-[13.5px] font-bold text-ink-faint">
                    Try a topic name, a unit code, or a flavour.
                  </p>
                </div>
              ) : (
                results.map((r, i) => {
                  const active = i === sel;
                  return (
                    <button
                      key={`${r.unit}/${r.topicId}`}
                      data-idx={i}
                      type="button"
                      onMouseEnter={() => setSel(i)}
                      onClick={() => pick(r)}
                      className={`flex w-full cursor-pointer items-center gap-3.5 rounded-[22px] px-3.5 py-3 text-left transition-colors ${
                        active ? "bg-ink/[0.055]" : ""
                      }`}
                    >
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-[12px] font-bold text-white"
                        style={{
                          background: r.unitMain,
                          boxShadow: `0 3px 0 ${shade(r.unitMain)}`,
                        }}
                      >
                        {r.unit.replace("WCH", "")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <Highlight text={r.title} q={q} />
                          <span
                            className="hidden shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-extrabold sm:inline"
                            style={{
                              background: tint(r.unitMain, 14),
                              color: shade(r.unitMain, 62),
                            }}
                          >
                            {r.label}
                          </span>
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-[12.5px] font-bold text-ink-faint">
                          {r.summary}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[11.5px] font-extrabold text-ink-faint">
                        <Clock className="h-3.5 w-3.5" /> {r.minutes}m
                        <motion.span
                          animate={{ x: active ? 3 : 0, opacity: active ? 1 : 0.35 }}
                          className="text-ink"
                        >
                          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                        </motion.span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* footer hints */}
            <div className="flex items-center justify-between border-t-[2.5px] border-dashed border-ink/10 px-5 py-3">
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-ink-faint">
                <span className="rounded-md bg-ink/5 px-1.5 py-0.5 font-mono">↑↓</span>
                wander
                <span className="ml-2 rounded-md bg-ink/5 px-1.5 py-0.5 font-mono">↵</span>
                open
              </span>
              <span className="text-[11px] font-extrabold text-ink-faint">
                {q.trim() ? `${results.length} found` : "⌘K anywhere, anytime"}
              </span>
            </div>
          </motion.div>
    </div>
  );
}

/* ————— marker-highlight the matched bit ————— */

function Highlight({ text, q }: { text: string; q: string }) {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let target = -1;
  const lower = text.toLowerCase();
  for (const w of words) {
    const at = lower.indexOf(w);
    if (at >= 0 && (target < 0 || at < target)) target = at;
  }
  if (target < 0) {
    return (
      <span className="truncate font-display text-[15px] font-semibold text-ink">{text}</span>
    );
  }
  const w = words.find((x) => lower.startsWith(x, target))!;
  return (
    <span className="min-w-0 truncate font-display text-[15px] font-semibold text-ink">
      {text.slice(0, target)}
      <mark>{text.slice(target, target + w.length)}</mark>
      {text.slice(target + w.length)}
    </span>
  );
}
