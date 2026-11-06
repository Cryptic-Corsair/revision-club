"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ClipboardList,
  Copy,
  Eye,
  EyeOff,
  Printer,
  Target,
  X,
} from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import {
  getSpecPoint,
  packToText,
  type SpecPoint,
} from "@/lib/spectra/registry";
import { clearPicks, togglePick, toggleRead, usePacks } from "@/lib/spectra/packs";
import { BandWave, accentOf, bgOf } from "./bands";
import { SpecSectionView } from "./note-section";
import { PackSetsDialog } from "./pack-sets";
import { Confetti, Mascot, PopIn, Reveal, ScrollFade, SoftButton, readableInk, shade } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the revision pack — the notes behind your ticked
   spec points, assembled in syllabus order.

   The sections you see here are not copies: the registry resolves
   each tick to its SpecSection and the pack renders the very same
   <SpecSectionView/> the note reader uses, walking the same band
   colours across topics. Mark sections read, fold the official
   statements away, copy the pack as a plain-text skeleton, print
   it clean, or save the whole tick-list as a named set.
   ═══════════════════════════════════════════════════════════════ */

interface PackGroup {
  key: string;
  unitCode: UnitCode;
  candy: string;
  topicLabel: string;
  topicTitle: string;
  sections: { point: SpecPoint; entryIndex: number }[];
}

export function PackView({
  onHome,
  onOpenSpec,
  onOpenNotes,
}: {
  onHome: () => void;
  onOpenSpec: () => void;
  onOpenNotes: (docId: string, spec?: string) => void;
}) {
  const { picks, read, sets } = usePacks();
  const [hideStatements, setHideStatements] = useState(false);
  const [setsOpen, setSetsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* the pack-completion burst — fires once, the moment the last
     point is marked read (and again only after you leave and return) */
  const [fire, setFire] = useState(0);

  /* picks → registry points (syllabus order), grouped by topic */
  const { points, groups, sectionCount } = useMemo(() => {
    const pts = picks
      .map((s) => getSpecPoint(s))
      .filter((p): p is SpecPoint => Boolean(p));
    const gs: PackGroup[] = [];
    for (const p of pts) {
      p.entries.forEach((e, entryIndex) => {
        const key = `${e.unitCode}/${e.topicId}`;
        let g = gs.find((x) => x.key === key);
        if (!g) {
          g = {
            key,
            unitCode: e.unitCode,
            candy: e.candy,
            topicLabel: p.topicLabel,
            topicTitle: p.topicTitle,
            sections: [],
          };
          gs.push(g);
        }
        g.sections.push({ point: p, entryIndex });
      });
    }
    return { points: pts, groups: gs, sectionCount: pts.reduce((n, p) => n + p.entries.length, 0) };
  }, [picks]);

  const readCount = useMemo(
    () => points.filter((p) => read.includes(p.spec)).length,
    [points, read],
  );
  const allRead = points.length > 0 && readCount === points.length;

  /* the completion burst — fired the moment the walk turns fully
     read, wherever the last mark came from. Render-time adjust
     (the React-recommended way to react to a derived crossing). */
  const [prevAllRead, setPrevAllRead] = useState(allRead);
  if (allRead !== prevAllRead) {
    setPrevAllRead(allRead);
    if (allRead) setFire((f) => f + 1);
  }

  useEffect(() => {
    if (!confirmClear) return;
    clearTimer.current = setTimeout(() => setConfirmClear(false), 2600);
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current);
    };
  }, [confirmClear]);

  const copyPack = useCallback(async () => {
    const text = packToText(picks);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard API unavailable (http / permission) — the old ways */
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* give up quietly — the text is still on screen */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [picks]);

  const removePoint = useCallback((spec: string) => {
    togglePick(spec);
  }, []);

  /* ————— the empty pack ————— */
  if (points.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-[calc(6rem+var(--sa-top))] pb-24 sm:px-8">
        <PopIn>
          <SoftButton onClick={onHome} className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]" ariaLabel="Back home">
            <ArrowLeft className="h-4 w-4" /> Back home
          </SoftButton>
        </PopIn>
        <Reveal delay={0.08} className="mt-14 flex flex-col items-center text-center">
          <Mascot main="#FFD43B" size={150} bubbles={false} />
          <h1 className="mt-6 font-display text-[clamp(1.9rem,4.6vw,2.7rem)] font-semibold tracking-tight text-ink">
            The pack is empty.
          </h1>
          <p className="mt-3 max-w-[46ch] text-[calc(15.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
            Head to the spec index and tick, say, <strong>2.1</strong> and{" "}
            <strong>3.6</strong> — the notes covering those statements assemble
            here automatically, in syllabus order.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <m.button
              type="button"
              onClick={onOpenSpec}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-h-[calc(48px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-5 py-3 font-display text-[calc(14.5px*var(--ui-scale))] font-semibold text-white"
              style={{ background: "#FF922B", boxShadow: `0 4px 0 ${shade("#FF922B")}` }}
            >
              <Target className="h-5 w-5" /> Browse the spec index
            </m.button>
            {sets.length > 0 && (
              <SoftButton onClick={() => setSetsOpen(true)} ariaLabel="Open your saved revision sets">
                <Bookmark className="h-4 w-4 text-mint" /> Load a saved set ({sets.length})
              </SoftButton>
            )}
          </div>
        </Reveal>
        <PackSetsDialog open={setsOpen} onClose={() => setSetsOpen(false)} />
      </div>
    );
  }

  /* ————— the assembled pack ————— */
  return (
    <div className="pack-sheet relative">
      {/* ————— header card + toolbar ————— */}
      <header className="mx-auto max-w-3xl px-4 pt-[calc(6rem+var(--sa-top))] sm:px-8">
        <PopIn>
          <SoftButton onClick={onHome} className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]" ariaLabel="Back home">
            <ArrowLeft className="h-4 w-4" /> Back home
          </SoftButton>
        </PopIn>

        <PopIn delay={0.05} className="mt-6">
          <span
            className="inline-flex -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.14em] uppercase"
            style={{ background: "#FFD43B", color: "#5f4a00" }}
          >
            <ClipboardList className="h-3.5 w-3.5" /> Your pack
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.1rem)] leading-[1.05] font-semibold tracking-tight text-ink">
            One pack. Your spec points.
          </h1>
          <p className="mt-3 text-[calc(15px*var(--ui-scale))] leading-[1.75] text-ink-soft">
            {points.length} spec point{points.length === 1 ? "" : "s"} ·{" "}
            {sectionCount} section{sectionCount === 1 ? "" : "s"} of notes,
            pulled together in syllabus order. Every section below is your
            normal note — assembled around what you ticked.
          </p>
        </PopIn>

        {/* picked chips — one swipeable line; tap one to let it go */}
        <PopIn delay={0.1} className="mt-4">
          <div className="flex items-center gap-3">
            <span className="shrink-0 font-display text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.14em] text-ink-faint uppercase">
              Picked
            </span>
            <ScrollFade className="min-w-0 flex-1">
              <div className="flex w-max items-center gap-1.5 py-0.5 pr-1">
                {points.map((p) => (
                  <button
                    key={p.spec}
                    type="button"
                    onClick={() => removePoint(p.spec)}
                    aria-label={`Remove ${p.spec} from your pack`}
                    title={`Remove ${p.spec} — ${p.topicLabel}`}
                    className="group inline-flex h-[calc(34px*var(--ui-scale))] shrink-0 cursor-pointer items-center gap-2 rounded-full bg-paper px-3 font-display text-[calc(12px*var(--ui-scale))] font-bold transition-transform hover:-translate-y-0.5"
                    style={{ color: p.candy, boxShadow: "0 2px 0 var(--edge)" }}
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: p.candy }}
                    />
                    {p.spec}
                    <X
                      className="h-3 w-3 opacity-35 transition-opacity group-hover:opacity-90"
                      strokeWidth={3}
                    />
                  </button>
                ))}
              </div>
            </ScrollFade>
          </div>
        </PopIn>

        {/* read progress for this pack */}
        <PopIn delay={0.14} className="mt-5">
          <div className="flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
              <m.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #12B886, #FFD43B)" }}
                initial={false}
                animate={{ width: `${points.length ? (readCount / points.length) * 100 : 0}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <span className="shrink-0 font-display text-[calc(12.5px*var(--ui-scale))] font-bold text-ink-soft">
              {readCount}/{points.length} read{allRead ? " ✓" : ""}
            </span>
          </div>
        </PopIn>

        {/* ————— toolbar ————— */}
        <Reveal delay={0.18} className="no-print mt-5">
          <div className="rounded-[calc(26px*var(--ui-scale))] bg-paper p-2.5 puff sm:p-3.5">
            {/* one steady line at every width — the same swipe the
                picked strip uses above; nothing wraps, nothing
                orphans, and the fade says there's more */}
            <ScrollFade>
              <div className="flex w-max items-center gap-1">
                <ToolButton onClick={onOpenSpec} label="Edit selection">
                  <Target className="h-4 w-4" /> Edit selection
                </ToolButton>
                <ToolButton onClick={() => setSetsOpen(true)} label="Saved revision sets" badge={sets.length}>
                  <Bookmark className="h-4 w-4" /> Sets
                </ToolButton>
                <ToolButton
                  onClick={() => setHideStatements((v) => !v)}
                  label={hideStatements ? "Show the verbatim statements" : "Hide the verbatim statements"}
                >
                  {hideStatements ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  Statements
                </ToolButton>
                <ToolButton onClick={copyPack} label="Copy the pack as plain text" highlight={copied}>
                  {copied ? <Check className="h-4 w-4" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy pack"}
                </ToolButton>
                <ToolButton onClick={() => window.print()} label="Print this revision pack">
                  <Printer className="h-4 w-4" /> Print pack
                </ToolButton>
                <ToolButton
                  onClick={() => {
                    if (confirmClear) {
                      clearPicks();
                      setConfirmClear(false);
                    } else {
                      setConfirmClear(true);
                    }
                  }}
                  label="Clear the selection"
                  danger={confirmClear}
                >
                  <X className="h-4 w-4" strokeWidth={2.6} />
                  {confirmClear ? "Sure? Tap again" : "Clear"}
                </ToolButton>
              </div>
            </ScrollFade>
          </div>
        </Reveal>
      </header>

      {/* ————— the string of rooms ————— */}
      <div className="pack-sections note-rooms mt-10">
        <BandWave from="var(--color-cream)" to={bgOf(0)} />
        {groups.map((g, gi) => {
          const groupStart = groups
            .slice(0, gi)
            .reduce((n, x) => n + x.sections.length, 0);
          return (
            <Fragment key={g.key}>
              {g.sections.map((s, si) => {
                const band = groupStart + si;
                const accent = accentOf(band);
                const isRead = read.includes(s.point.spec);
                const firstEntry = s.entryIndex === 0;
                return (
                  <Fragment
                    key={`${s.point.spec}#${s.entryIndex}`}
                  >
                    <section
                      id={`spec-${s.point.spec.replace(".", "-")}`}
                      /* even rooms wear --note-band-a — in the classic
                         lab that's the espresso ground, so .room flips
                         the ink and surfaces inside */
                      className={`spec-anchor relative${band % 2 === 0 ? " room" : ""}`}
                      style={{ background: bgOf(band) }}
                    >
                      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-14">
                        {/* topic banner rides on the group's first section */}
                        {si === 0 && (
                          <TopicBanner
                            group={g}
                            sections={g.sections.length}
                            hideStatements={hideStatements}
                          />
                        )}

                        {/* pack controls for this section */}
                        <div className="no-print mb-6 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleRead(s.point.spec)}
                            aria-pressed={isRead}
                            className={`inline-flex min-h-[calc(38px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-[calc(12px*var(--ui-scale))] font-bold transition-colors ${
                              isRead ? "text-white" : "bg-paper text-ink-soft hover:text-ink"
                            }`}
                            style={
                              isRead
                                ? {
                                    background: "#12B886",
                                    boxShadow: `0 3px 0 ${shade("#12B886")}`,
                                  }
                                : { boxShadow: "0 2px 0 var(--edge)" }
                            }
                            aria-label={
                              isRead
                                ? `Mark ${s.point.spec} as not read`
                                : `Mark ${s.point.spec} as read`
                            }
                          >
                            <Check
                              className="h-4 w-4"
                              strokeWidth={isRead ? 3 : 2.4}
                            />
                            {isRead ? "Read" : "Mark read"}
                          </button>
                          {firstEntry && (
                            <button
                              type="button"
                              onClick={() => onOpenNotes(s.point.entries[0].docId, s.point.spec)}
                              className="inline-flex min-h-[calc(38px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-full bg-paper px-3.5 py-2 text-[calc(12px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:text-ink"
                              style={{ boxShadow: "0 2px 0 var(--edge)" }}
                              aria-label={`Open ${s.point.entries[0].title} in the ${g.topicLabel} notes`}
                            >
                              {g.topicLabel} notes
                              <span aria-hidden>→</span>
                            </button>
                          )}
                        </div>

                        <SpecSectionView
                          section={s.point.entries[s.entryIndex].section}
                          accent={accent}
                          hideStatement={hideStatements}
                        />
                      </div>
                    </section>
                    <BandWave
                      from={bgOf(band)}
                      to={
                        si === g.sections.length - 1 && gi === groups.length - 1
                          ? "var(--color-cream)"
                          : bgOf(band + 1)
                      }
                    />
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      {/* ————— end of the pack ————— */}
      <div className="relative mx-auto max-w-3xl px-4 pt-10 pb-24 text-center sm:px-8">
        <Confetti fire={fire} />
        <Reveal className="flex flex-col items-center gap-5">
          {allRead ? (
            <>
              <Mascot main="#12B886" size={120} bubbles={false} />
              <p className="font-display text-[clamp(1.4rem,3.6vw,1.75rem)] leading-snug font-semibold text-ink">
                Pack read — every point, marked off.
              </p>
              <p className="-mt-2 max-w-[46ch] text-[calc(13.5px*var(--ui-scale))] leading-relaxed font-bold text-ink-soft">
                {points.length} spec point{points.length === 1 ? "" : "s"} of
                revision, done. Tick the next batch, or load a saved set and
                walk it again.
              </p>
            </>
          ) : (
            <>
              <span
                aria-hidden
                className="h-3 w-40 rounded-full"
                style={{ background: "linear-gradient(90deg, #FFD43B, #12B886)" }}
              />
              <p className="font-display text-[calc(19px*var(--ui-scale))] font-semibold text-ink">
                That&apos;s your pack — {points.length} point{points.length === 1 ? "" : "s"}, read at your pace.
              </p>
            </>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SoftButton onClick={onOpenSpec} ariaLabel="Edit the selection in the spec index">
              <Target className="h-4.5 w-4.5" /> Edit the selection
            </SoftButton>
            <SoftButton onClick={() => setSetsOpen(true)} ariaLabel="Open your saved revision sets">
              <Bookmark className="h-4.5 w-4.5" /> Saved sets{sets.length > 0 ? ` (${sets.length})` : ""}
            </SoftButton>
          </div>
          <p className="mt-2 text-[calc(12px*var(--ui-scale))] leading-relaxed font-bold text-ink-soft">
            Assembled from the revision notes · ticks live in your browser
          </p>
        </Reveal>
      </div>

      <PackSetsDialog open={setsOpen} onClose={() => setSetsOpen(false)} />
    </div>
  );
}

/* ————— topic banner — where one topic's stretch begins ————— */

function TopicBanner({
  group: g,
  sections,
  hideStatements,
}: {
  group: PackGroup;
  sections: number;
  hideStatements: boolean;
}) {
  return (
    <div className="no-print mb-8">
      <div
        className="inline-flex max-w-full -rotate-1 items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5"
        style={{
          background: g.candy,
          color: readableInk(g.candy),
          boxShadow: `0 3px 0 ${shade(g.candy)}`,
        }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/25 font-display text-[calc(11px*var(--ui-scale))] font-bold">
          {g.unitCode.replace("WCH", "")}
        </span>
        <span className="min-w-0 truncate font-display text-[calc(13.5px*var(--ui-scale))] font-bold tracking-[0.04em]">
          {g.topicLabel} — {g.topicTitle}
        </span>
      </div>
      <p className="mt-2.5 pl-1 text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.1em] text-ink-faint uppercase">
        {sections} section{sections === 1 ? "" : "s"} from this topic
        {!hideStatements && " · statements quoted above each note"}
      </p>
    </div>
  );
}

/* ————— toolbar button ————— */

function ToolButton({
  onClick,
  label,
  badge,
  highlight,
  danger,
  children,
}: {
  onClick: () => void;
  label: string;
  badge?: number;
  highlight?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      title={label}
      className={`inline-flex h-[calc(40px*var(--ui-scale))] shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 font-display text-[calc(12.5px*var(--ui-scale))] font-bold tracking-[0.02em] transition-colors ${
        !highlight && !danger
          ? "bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
          : ""
      }`}
      style={
        highlight
          ? {
              background: "#12B886",
              color: readableInk("#12B886"),
              boxShadow: `0 3px 0 ${shade("#12B886")}`,
            }
          : danger
            ? {
                background: "#FF6B6B",
                color: "#fff",
                boxShadow: `0 3px 0 ${shade("#FF6B6B")}`,
              }
            : undefined
      }
    >
      {children}
      {typeof badge === "number" && badge > 0 && (
        <span className="grid h-[calc(18px*var(--ui-scale))] min-w-[calc(18px*var(--ui-scale))] place-items-center rounded-full bg-ink/10 px-1 text-[calc(10.5px*var(--ui-scale))] font-bold">
          {badge}
        </span>
      )}
    </m.button>
  );
}
