"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Search, Target } from "./icons";
import { SPEC_STATS, SPEC_TOPIC_GROUPS } from "@/lib/spectra/registry";
import { usePacks, togglePick } from "@/lib/spectra/packs";
import { Fmt } from "./format";
import { PopIn, Reveal, SoftButton } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the spec index, in the editorial dress.
   The same index — derived from the notes by the registry, the
   same search, the same filters, the same whole-topic select and
   the same ticks into the pack store — set as a document: the
   disclaimer page's hero, the pack ledger as a summary card, and
   the statements as quiet rows with square ticks and rust spec
   numerals. The classic SpecIndex's twin; the props contract is
   identical, so the shell swaps them without knowing.
   ═══════════════════════════════════════════════════════════════ */

type Filter = "all" | "picked" | "unpicked";

export function SpecEditorial({
  onHome,
  onOpenPack,
  onOpenNotes,
}: {
  onHome: () => void;
  onOpenPack: () => void;
  onOpenNotes: (docId: string, spec?: string) => void;
}) {
  const { picks } = usePacks();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const pickedSet = useMemo(() => new Set(picks), [picks]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    return SPEC_TOPIC_GROUPS.map((g) => ({
      ...g,
      points: g.points.filter((p) => {
        if (filter === "picked" && !pickedSet.has(p.spec)) return false;
        if (filter === "unpicked" && pickedSet.has(p.spec)) return false;
        if (!q) return true;
        return (
          p.spec.toLowerCase().includes(q) ||
          p.statement.toLowerCase().includes(q) ||
          p.topicLabel.toLowerCase().includes(q) ||
          p.topicTitle.toLowerCase().includes(q) ||
          p.unitCode.toLowerCase().includes(q) ||
          p.entries.some((e) => e.title.toLowerCase().includes(q))
        );
      }),
    })).filter((g) => g.points.length > 0);
  }, [q, filter, pickedSet]);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: SPEC_STATS.points },
    { id: "picked", label: "Selected", count: picks.length },
    {
      id: "unpicked",
      label: "Not selected",
      count: SPEC_STATS.points - picks.length,
    },
  ];

  return (
    <main className="legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      <PopIn>
        <SoftButton
          onClick={onHome}
          className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
          ariaLabel="Back home"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </SoftButton>
      </PopIn>

      {/* ————— hero ————— */}
      <Reveal>
        <section className="legal-hero relative mt-5 overflow-hidden rounded-[30px] px-6 py-8 sm:px-9 sm:py-10">
          <div className="legal-hero-grain" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="legal-kicker">
                <Target className="h-3.5 w-3.5" /> SPEC INDEX
              </span>
              <span className="legal-meta">
                {SPEC_STATS.points} SPEC POINTS · {SPEC_STATS.sections} NOTE SECTIONS ·{" "}
                {SPEC_STATS.topics} TOPICS
              </span>
            </div>
            <h1 className="mt-5 max-w-[18ch] font-display text-[calc(clamp(2.4rem,6vw,4.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.06] font-bold tracking-[-.05em] text-ink">
              Tick the spec points. Get one revision pack
              <span className="legal-heading-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
              Every statement below is quoted from the specification and mapped
              to the note sections that teach it — nothing hand-maintained, the
              index grows as the notes grow. Tick what you&apos;re revising and
              the pack assembles itself.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ————— the pack ledger ————— */}
      <Reveal delay={0.06}>
        <section className="legal-summary mt-8 rounded-[26px] p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-[calc(20px*var(--ui-scale))] font-semibold tracking-tight text-ink">
              Your pack
            </h2>
            <span className="legal-meta">
              {picks.length} SELECTED OF {SPEC_STATS.points}
            </span>
          </div>
          <div className="mt-4 h-[calc(5px*var(--ui-scale))] overflow-hidden rounded-full bg-ink/[0.08]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${SPEC_STATS.points ? (picks.length / SPEC_STATS.points) * 100 : 0}%`,
                background: "var(--legal-rust)",
              }}
            />
          </div>
          <p className="mt-3.5 max-w-[64ch] text-[calc(13.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
            {picks.length > 0
              ? `Your pack holds ${picks.length} spec point${picks.length === 1 ? "" : "s"} — the notes behind them are waiting.`
              : "Nothing ticked yet — tap statements below to build your pack."}
          </p>
          <div className="mt-4">
            <button type="button" onClick={onOpenPack} className="legal-back-link">
              Open your pack <ArrowLeft className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </section>
      </Reveal>

      {/* ————— search + filters ————— */}
      <Reveal delay={0.1}>
        <div className="mt-8">
          <label className="legal-card flex min-h-[calc(48px*var(--ui-scale))] items-center gap-3 rounded-[calc(14px*var(--ui-scale))] px-4 py-2.5">
            <Search className="h-4.5 w-4.5 shrink-0 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the statements — e.g. mole, halide, isomer…"
              aria-label="Search specification points"
              className="min-w-0 flex-1 bg-transparent text-[calc(14px*var(--ui-scale))] font-semibold text-ink outline-none placeholder:text-ink-faint/70"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="cursor-pointer text-[calc(12px*var(--ui-scale))] font-bold text-ink-faint hover:text-ink"
              >
                clear
              </button>
            )}
          </label>
          <div
            className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 pl-1"
            role="group"
            aria-label="Filter statements"
          >
            {filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={on}
                  className={`inline-flex min-h-[calc(34px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-[calc(6px*var(--ui-scale))] px-1 font-display text-[calc(12.5px*var(--ui-scale))] font-bold tracking-[0.04em] transition-colors ${
                    on
                      ? "text-[var(--legal-rust)]"
                      : "text-ink-faint hover:text-ink"
                  }`}
                  style={on ? { boxShadow: "inset 0 -2px 0 var(--legal-rust)" } : undefined}
                >
                  {f.label}
                  <span className="text-[calc(10.5px*var(--ui-scale))] font-bold opacity-70">
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ————— the index ————— */}
      {visible.length === 0 ? (
        <Reveal className="mt-10">
          <div className="legal-card mx-auto max-w-[56ch] rounded-[calc(18px*var(--ui-scale))] p-6 text-center sm:p-8">
            <p className="font-display text-[calc(18px*var(--ui-scale))] font-semibold text-ink">
              Nothing matches &ldquo;{query}&rdquo;.
            </p>
            <p className="mt-2 text-[calc(13.5px*var(--ui-scale))] font-bold text-ink-faint">
              Try a shorter word — or clear the filters.
            </p>
            <div className="mt-4 flex justify-center">
              <SoftButton
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                ariaLabel="Reset search and filters"
              >
                Reset the index
              </SoftButton>
            </div>
          </div>
        </Reveal>
      ) : (
        visible.map((g, gi) => (
          <TopicGroup
            key={`${g.unitCode}/${g.topicId}`}
            group={g}
            index={gi}
            pickedSet={pickedSet}
            onOpenNotes={onOpenNotes}
          />
        ))
      )}

      {/* ————— closing ————— */}
      <Reveal delay={0.08}>
        <section className="legal-closing mt-10 rounded-[26px] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <p className="legal-meta">YOUR TURN</p>
          </div>
          <p className="mt-4 max-w-[72ch] text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
            Ticks live in your browser and follow you everywhere — the pack
            page turns them into one continuous read.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
            <span className="legal-meta">END OF INDEX · DERIVED FROM THE NOTES</span>
            <button type="button" onClick={onOpenPack} className="legal-back-link">
              Open your pack <ArrowLeft className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

/* ————— one topic group ————— */

function TopicGroup({
  group: g,
  index,
  pickedSet,
  onOpenNotes,
}: {
  group: (typeof SPEC_TOPIC_GROUPS)[number];
  index: number;
  pickedSet: Set<string>;
  onOpenNotes: (docId: string, spec?: string) => void;
}) {
  const pickable = g.points;
  const allPicked = pickable.every((p) => pickedSet.has(p.spec));
  const anyPicked = pickable.some((p) => pickedSet.has(p.spec));

  const selectTopic = () => {
    for (const p of pickable) {
      /* togglePick flips each point; when clearing, only flip the picked
         ones — when filling, only the unpicked ones */
      if (allPicked ? pickedSet.has(p.spec) : !pickedSet.has(p.spec))
        togglePick(p.spec);
    }
  };

  return (
    <Reveal delay={Math.min(index * 0.03, 0.1)} className="mt-9">
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="legal-meta">
            {g.topicLabel.toUpperCase()} — {g.topicTitle} · {g.unitCode}
          </p>
          <button
            type="button"
            onClick={selectTopic}
            aria-label={
              allPicked
                ? `Clear all ${pickable.length} points of ${g.topicLabel}`
                : `Select all ${pickable.length} points of ${g.topicLabel}`
            }
            className="ml-auto inline-flex min-h-[calc(34px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-[calc(6px*var(--ui-scale))] px-1 font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.04em] text-ink-faint transition-colors hover:text-ink"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
            {allPicked ? "Clear topic" : "Select topic"}
            {anyPicked && !allPicked && (
              <span className="text-[calc(10.5px*var(--ui-scale))] text-[var(--legal-rust)]">
                {pickable.filter((p) => pickedSet.has(p.spec)).length}/{pickable.length}
              </span>
            )}
          </button>
        </div>
        <div className="mt-3 h-px w-full bg-ink/10" />

        {/* points */}
        <ul className="mt-2 flex flex-col">
          {g.points.map((p) => (
            <PointRow
              key={p.spec}
              point={p}
              picked={pickedSet.has(p.spec)}
              onOpenNotes={onOpenNotes}
            />
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ————— one statement row ————— */

function PointRow({
  point: p,
  picked,
  onOpenNotes,
}: {
  point: (typeof SPEC_TOPIC_GROUPS)[number]["points"][number];
  picked: boolean;
  onOpenNotes: (docId: string, spec?: string) => void;
}) {
  const hasNotes = p.entries.length > 0;

  return (
    <li
      className="flex items-start gap-4 border-b border-ink/[0.07] py-4 last:border-b-0"
      style={
        picked
          ? { boxShadow: "inset 3px 0 0 var(--legal-rust)", paddingLeft: "calc(14px * var(--ui-scale))" }
          : { paddingLeft: "calc(17px * var(--ui-scale))" }
      }
    >
      {/* the tick — a square in the room's print idiom; disabled when
          the notes don't reach this statement yet, as in the classic */}
      <button
        type="button"
        onClick={() => hasNotes && togglePick(p.spec)}
        disabled={!hasNotes}
        aria-pressed={picked}
        aria-label={
          hasNotes
            ? `${picked ? "Remove" : "Add"} spec point ${p.spec} ${picked ? "from" : "to"} your pack`
            : `Spec point ${p.spec} — notes coming later`
        }
        className={`mt-[calc(2px*var(--ui-scale))] grid h-[calc(26px*var(--ui-scale))] w-[calc(26px*var(--ui-scale))] shrink-0 place-items-center rounded-[calc(8px*var(--ui-scale))] ${
          hasNotes ? "cursor-pointer" : "cursor-default"
        }`}
        style={
          picked
            ? {
                background: "var(--legal-rust)",
                color: "var(--color-paper)",
              }
            : {
                border: "1.5px dashed color-mix(in oklab, var(--color-ink) 28%, transparent)",
                color: "var(--color-ink-faint)",
                opacity: hasNotes ? 1 : 0.55,
              }
        }
      >
        {picked ? (
          <Check
            className="h-[calc(13px*var(--ui-scale))] w-[calc(13px*var(--ui-scale))]"
            strokeWidth={3}
          />
        ) : (
          <span
            aria-hidden
            className="font-display text-[calc(13px*var(--ui-scale))] leading-none font-bold"
          >
            +
          </span>
        )}
      </button>

      {/* the statement */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-display text-[calc(13px*var(--ui-scale))] font-bold tracking-[0.04em] text-[var(--legal-rust)]">
            {p.spec}
          </span>
          {!hasNotes && (
            <span className="legal-meta text-[calc(9.5px*var(--ui-scale))]">
              NOTES COMING LATER
            </span>
          )}
          {picked && (
            <span className="legal-meta text-[calc(9.5px*var(--ui-scale))]">
              IN YOUR PACK
            </span>
          )}
        </div>
        <p
          className={`mt-1 max-w-[76ch] text-[calc(14px*var(--ui-scale))] leading-[1.7] ${picked ? "font-semibold text-ink" : "text-ink-soft"}`}
        >
          <Fmt text={p.statement} />
        </p>

        {/* deep links into the sections behind this statement */}
        {hasNotes && (
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
            {p.entries.map((e) => (
              <button
                key={`${e.docId}#${e.spec}#${e.sectionIndex}`}
                type="button"
                onClick={() => onOpenNotes(e.docId, e.spec)}
                className="legal-back-link text-[calc(11.5px*var(--ui-scale))]"
                aria-label={`Open section ${e.title} in the ${e.topicLabel} notes`}
              >
                {e.title} <span aria-hidden>→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
