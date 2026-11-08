"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { ArrowLeft, Check, ClipboardList, Search, Target } from "./icons";
import { SPEC_POINTS, SPEC_STATS, SPEC_TOPIC_GROUPS } from "@/lib/spectra/registry";
import { usePacks, togglePick } from "@/lib/spectra/packs";
import { Fmt } from "./format";
import { PopIn, Reveal, SoftButton, chipWash, honeyWash, tint, readableInk, shade, Squiggle } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · spec index — every assessment statement the
   notes cover, quoted verbatim, one tap from your pack.

   The list is *derived* from the notes by the registry: tick a
   statement and its sections join the pack; a statement the notes
   don't reach yet can't be ticked. Search it, filter it (all /
   selected / not selected), or take a whole topic in one tap —
   and hop from any statement straight into its section.
   ═══════════════════════════════════════════════════════════════ */

type Filter = "all" | "picked" | "unpicked";

export function SpecIndex({
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

  const stats = [
    `${SPEC_STATS.points} spec points`,
    `${SPEC_STATS.sections} note sections`,
    `${SPEC_STATS.topics} topics`,
  ];

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
    <div className="rooms-page rooms-spec-index-page mx-auto max-w-3xl px-4 pt-[calc(6rem+var(--sa-top))] pb-24 sm:px-8">
      {/* ————— header ————— */}
      <PopIn>
        <SoftButton onClick={onHome} className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]" ariaLabel="Back home">
          <ArrowLeft className="h-4 w-4" /> Back home
        </SoftButton>
      </PopIn>

      <PopIn delay={0.05} className="mt-7">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.14em] uppercase"
          style={{ background: "#FFD43B", color: readableInk("#FFD43B") }}
        >
          <Target className="h-3.5 w-3.5" /> Spec index
        </span>
        <h1 className="mt-5 font-display text-[calc(clamp(2.1rem,5vw,3.2rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.05] font-semibold tracking-tight text-ink">
          Tick the spec points.
          <br />
          Get one revision pack.
        </h1>
        <p className="mt-4 max-w-[56ch] text-[calc(16px*var(--ui-scale))] leading-[1.8] text-ink-soft">
          Every statement below is quoted from the specification and mapped to
          the note sections that teach it — nothing hand-maintained, the index
          grows as the notes grow. Tick what you&apos;re revising and the pack
          assembles itself.
        </p>
      </PopIn>

      <PopIn delay={0.12} className="mt-5 flex flex-wrap gap-2">
        {stats.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-full bg-ink/[0.05] px-3 py-1.5 text-[calc(12px*var(--ui-scale))] font-semibold text-ink-soft"
          >
            {s}
          </span>
        ))}
      </PopIn>

      {/* ————— your pack strip ————— */}
      <Reveal delay={0.16} className="mt-6">
        <div
          className="flex flex-col gap-3.5 rounded-[calc(26px*var(--ui-scale))] px-5 py-4 puff sm:flex-row sm:items-center"
          style={{ background: honeyWash("#FFD43B", 16) }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-ink/[0.08] bg-paper"
            >
              <ClipboardList className="h-5 w-5" style={{ color: "var(--color-lemon)" }} />
            </span>
            <p className="min-w-0 flex-1 text-[calc(14px*var(--ui-scale))] font-semibold leading-snug text-ink">
              {picks.length > 0 ? (
                <>
                  Your pack holds{" "}
                  <span style={{ color: "var(--color-lemon)" }}>
                    {picks.length} spec point{picks.length === 1 ? "" : "s"}
                  </span>{" "}
                  — the notes behind them are waiting.
                </>
              ) : (
                "Nothing ticked yet — tap statements below to build your pack."
              )}
            </p>
          </div>
          <m.button
            type="button"
            onClick={onOpenPack}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-[calc(44px*var(--ui-scale))] w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 font-display text-[calc(13px*var(--ui-scale))] font-semibold text-white sm:w-auto sm:shrink-0"
            style={{ background: "#FF922B", boxShadow: `0 3px 0 ${shade("#FF922B")}` }}
          >
            <ClipboardList className="h-4.5 w-4.5" />
            Open your pack
          </m.button>
        </div>
      </Reveal>

      {/* ————— search + filters ————— */}
      <Reveal delay={0.2} className="mt-6">
        <div className="rounded-[calc(26px*var(--ui-scale))] bg-paper p-4 puff sm:p-5">
          <label className="flex h-11 items-center gap-2.5 rounded-full bg-ink/[0.05] px-4 focus-within:bg-ink/[0.08]">
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
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter statements">
            {filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={on}
                  className={`inline-flex min-h-[calc(36px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[calc(12.5px*var(--ui-scale))] font-semibold transition-colors ${
                    on ? "text-ink" : "bg-ink/[0.05] text-ink-soft hover:bg-ink/[0.09]"
                  }`}
                  style={on ? { background: "#FFD43B" } : undefined}
                >
                  {f.label}
                  <span
                    className={`rounded-full px-1.5 text-[calc(10.5px*var(--ui-scale))] ${on ? "bg-ink/10" : "bg-ink/[0.07]"}`}
                  >
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
        <Reveal className="mt-10 text-center">
          <p className="font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink">
            Nothing matches “{query}”.
          </p>
          <p className="mt-2 text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink-faint">
            Try a shorter word — or clear the filters.
          </p>
          <SoftButton
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mx-auto mt-4"
            ariaLabel="Reset search and filters"
          >
            Reset the index
          </SoftButton>
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

      {/* ————— footer nudge ————— */}
      <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
        <Squiggle color="#FFD43B" className="h-3 w-40 opacity-80" />
        <p className="max-w-[46ch] text-[calc(13.5px*var(--ui-scale))] leading-relaxed font-semibold text-ink-soft">
          Ticks live in your browser and follow you everywhere — the pack page
          turns them into one continuous read.
        </p>
        <SoftButton onClick={onOpenPack} ariaLabel="Open your revision pack">
          <ClipboardList className="h-4.5 w-4.5" /> Open your pack
        </SoftButton>
      </Reveal>
    </div>
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
    <Reveal delay={Math.min(index * 0.03, 0.1)} className="mt-8">
      <div className="rooms-spec-group rounded-[calc(26px*var(--ui-scale))] bg-paper p-4 puff sm:p-6">
        {/* topic header */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded-full"
            style={{ background: g.candy }}
          />
          <h2 className="font-display text-[calc(19px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            {g.topicLabel} — {g.topicTitle}
          </h2>
          <span
            className="rounded-full px-2.5 py-1 font-display text-[calc(10.5px*var(--ui-scale))] font-bold tracking-[0.08em] uppercase"
            style={{ background: chipWash(g.candy, 16), color: g.candy }}
          >
            {g.unitCode}
          </span>
          <button
            type="button"
            onClick={selectTopic}
            aria-label={
              allPicked
                ? `Clear all ${pickable.length} points of ${g.topicLabel}`
                : `Select all ${pickable.length} points of ${g.topicLabel}`
            }
            className="ml-auto inline-flex min-h-[calc(36px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-full bg-ink/[0.05] px-3.5 text-[calc(12px*var(--ui-scale))] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.1] hover:text-ink"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
            {allPicked ? "Clear topic" : "Select topic"}
            {anyPicked && !allPicked && (
              <span className="rounded-full bg-ink/[0.08] px-1.5 text-[calc(10.5px*var(--ui-scale))]">
                {pickable.filter((p) => pickedSet.has(p.spec)).length}/{pickable.length}
              </span>
            )}
          </button>
        </div>

        {/* points */}
        <ul className="mt-4 flex flex-col gap-2.5">
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
  point: (typeof SPEC_POINTS)[number];
  picked: boolean;
  onOpenNotes: (docId: string, spec?: string) => void;
}) {
  const hasNotes = p.entries.length > 0;

  return (
    <li
      className="rooms-spec-point rounded-[calc(16px*var(--ui-scale))] transition-colors"
      style={{
        background: picked ? tint(p.candy, 12) : "var(--tint-base)",
        borderLeft: picked ? `3px solid ${p.candy}` : `3px solid transparent`,
      }}
    >
      <div className="flex items-start gap-3 px-3 py-3 sm:px-4">
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
          className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left disabled:cursor-default"
        >
          {/* the tick */}
          <span
            aria-hidden
            className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all"
            style={{
              background: picked ? p.candy : "var(--tint-base)",
              border: picked ? "none" : "2px dashed color-mix(in oklab, var(--color-ink) 25%, transparent)",
              color: readableInk(p.candy),
              boxShadow: picked ? `0 2px 0 ${shade(p.candy)}` : "none",
            }}
          >
            {picked && <Check className="h-4 w-4" strokeWidth={3.2} />}
          </span>

          {/* spec chip + statement */}
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 font-display text-[calc(10.5px*var(--ui-scale))] font-bold tracking-[0.06em]"
                style={{ background: chipWash(p.candy, 20), color: p.candy }}
              >
                {p.spec}
              </span>
              {!hasNotes && (
                <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.06em] text-ink-faint uppercase">
                  notes coming later
                </span>
              )}
            </span>
            <span
              className={`mt-1 block text-[calc(14px*var(--ui-scale))] leading-[1.65] ${picked ? "font-semibold text-ink" : "text-ink-soft"}`}
            >
              <Fmt text={p.statement} />
            </span>
          </span>
        </button>
      </div>

      {/* deep links into the sections behind this statement */}
      {hasNotes && (
        <div className="flex flex-wrap gap-1.5 px-3 pb-3 pl-[3.75rem] sm:px-4 sm:pl-[4.25rem]">
          {p.entries.map((e) => (
            <button
              key={`${e.docId}#${e.spec}#${e.sectionIndex}`}
              type="button"
              onClick={() => onOpenNotes(e.docId, e.spec)}
              className="inline-flex min-h-[calc(32px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-full border border-ink/[0.08] bg-paper px-3 text-[calc(11.5px*var(--ui-scale))] font-semibold text-ink-soft transition-colors hover:text-ink"
              aria-label={`Open section ${e.title} in the ${e.topicLabel} notes`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: e.candy }}
              />
              {e.title}
            </button>
          ))}
          {picked && (
            <span className="inline-flex items-center gap-1 self-center text-[calc(11px*var(--ui-scale))] font-semibold text-ink-faint">
              <ClipboardList className="h-3.5 w-3.5" /> in your pack
            </span>
          )}
        </div>
      )}
    </li>
  );
}
