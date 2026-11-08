"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Check,
  Clock,
  Gauge,
  Lock,
  MoveRight,
  Sparkles,
  Target,
  Timer,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { fmtClock, fmtShort, resetTime, setGoalMin, topicSeconds, useTimeData } from "@/lib/spectra/time";
import {
  ACHIEVEMENTS,
  GOAL_CHIPS,
  achievementEarned,
  goalChipLabel,
  progressSummary,
  revisedLine,
  unitDoneOf,
} from "@/lib/spectra/progress-derive";
import { PopIn, Reveal, SoftButton, readableInk } from "./bits";
import { accentOf } from "./bands";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the progress room, in the editorial dress.
   The same two ledgers — the topics marked as revised and the
   minutes the site has banked — read through progressSummary(),
   the shared derivation, and set as a document: a summary card,
   the weekly goal as a hairline bench, today's pick as an exhibit,
   the minutes as hairline bars, the badges as stamps, and the
   revised marks as an index you tick. The props contract is
   identical to the classic StickerBook; the shell swaps them.
   ═══════════════════════════════════════════════════════════════ */

export function ProgressEditorial({
  units,
  onBack,
  onOpenUnit,
  onOpenTopic,
}: {
  units: Unit[];
  onBack: () => void;
  onOpenUnit: (code: UnitCode) => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
}) {
  const revised = useRevised();
  const time = useTimeData();
  const [confirmReset, setConfirmReset] = useState(false);

  /* the one-call summary — the same numbers the rooms dress shows */
  const s = progressSummary(units, revised, time);
  const resetTimer = (ms: number) => window.setTimeout(() => setConfirmReset(false), ms);
  const resetArm = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      resetTimer(4000);
      return;
    }
    for (const k of revised) toggleRevised(k);
    resetTime();
    setConfirmReset(false);
  };

  const timeLine = s.goalMet
    ? `Weekly goal met — ${fmtClock(s.week)} on the bench this week. Everything from here is extra credit.`
    : s.week > 0
      ? `${fmtClock(s.week)} this week against a ${goalChipLabel(time.goalMin)} goal.`
      : "The bench fills with every minute you spend reading. Open a topic to start the clock.";

  return (
    <main className="legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      <PopIn>
        <SoftButton
          onClick={onBack}
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
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="legal-kicker">
                <Clock className="h-3.5 w-3.5" /> PROGRESS
              </span>
              <span className="legal-meta">
                {s.revisedCount}/{TOTALS.topics} TOPICS MARKED REVISED
              </span>
            </div>
            <h1 className="mt-5 max-w-[18ch] font-display text-[calc(clamp(2.65rem,7vw,5.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.04] font-bold tracking-[-.065em] text-ink">
              Your bench, in numbers<span className="legal-heading-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
              {revisedLine(s.pct, s.revisedCount)} {timeLine}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-4">
              <span className="legal-meta">{s.streak > 0 ? `${s.streak}-DAY STREAK` : "NO STREAK YET"}</span>
              <span className="legal-meta">{s.goalMet ? "WEEKLY GOAL MET" : `GOAL ${goalChipLabel(time.goalMin)}`}</span>
              <span className="legal-meta">
                {Math.round(s.pct * 100)}% OF THE COURSE
              </span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ————— the ledgers ————— */}
      <div className="mt-9 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <aside className="legal-index h-fit lg:sticky lg:top-28">
          <p className="legal-meta mb-4">CONTENTS</p>
          <nav className="flex flex-col gap-0.5" aria-label="Progress contents">
            {[
              ["ledgers", "The ledgers"],
              ["goal", "The weekly goal"],
              ["minutes", "Where minutes go"],
              ["badges", "Badges"],
              ["topics", "Mark as revised"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="legal-index-link lg:min-w-0 lg:max-w-full">
                <span>·</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {/* ledgers — summary card */}
          <Reveal>
            <section id="ledgers" className="legal-summary scroll-mt-28 rounded-[26px] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-[calc(20px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  The ledgers
                </h2>
                <span className="legal-summary-stamp">
                  <Timer className="h-4 w-4" /> TIME & MARKS
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["today", fmtClock(s.today), "reading time banked today"],
                  ["this week", fmtClock(s.week), `against a ${goalChipLabel(time.goalMin)} goal`],
                  ["all time", fmtClock(s.all), "every minute the site has banked"],
                  ["revised", `${s.revisedCount}/${TOTALS.topics}`, "topics marked as revised"],
                ].map(([k, v, hint], i) => (
                  <div key={k} className="legal-summary-line">
                    <span className="legal-summary-number">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p className="font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink">
                        {v} <span className="text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.12em] text-ink-faint uppercase">{k}</span>
                      </p>
                      <p className="mt-0.5 text-[calc(12px*var(--ui-scale))] leading-[1.6] text-ink-faint">{hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* weekly goal — the bench as an exhibit */}
          <Reveal>
            <div id="goal" className="legal-card mt-6 scroll-mt-28 rounded-[calc(18px*var(--ui-scale))] p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink">
                  The weekly goal
                </h2>
                <span className="legal-meta">
                  {fmtClock(s.week)} OF {goalChipLabel(time.goalMin).toUpperCase()} {s.goalMet ? "· MET" : ""}
                </span>
              </div>
              <div className="mt-3 h-[calc(6px*var(--ui-scale))] w-full overflow-hidden rounded-full bg-ink/[0.08]">
                <m.div
                  className="h-full rounded-full"
                  style={{ background: "var(--legal-rust)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(s.weekPct * 100, s.week > 0 ? 3 : 0)}%` }}
                  transition={{ type: "spring", stiffness: 110, damping: 20 }}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {GOAL_CHIPS.map((g) => {
                  const active = time.goalMin === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoalMin(g)}
                      aria-pressed={active}
                      aria-label={`Weekly goal ${goalChipLabel(g)}`}
                      className="cursor-pointer rounded-[calc(9px*var(--ui-scale))] px-3 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold transition-colors"
                      style={
                        active
                          ? { background: "var(--legal-rust)", color: "var(--color-paper)" }
                          : {
                              background: "color-mix(in oklab, var(--color-ink) 5%, transparent)",
                              color: "var(--color-ink-soft)",
                            }
                      }
                    >
                      {goalChipLabel(g)}
                    </button>
                  );
                })}
                <span className="ml-1 inline-flex items-center gap-1.5 rounded-[calc(10px*var(--ui-scale))] border border-ink/10 bg-paper px-1.5 py-1">
                  <m.button
                    type="button"
                    onClick={() => setGoalMin(time.goalMin - 15)}
                    whileTap={{ scale: 0.88 }}
                    aria-label="Goal 15 minutes less"
                    className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-ink/[0.06] font-display text-[calc(15px*var(--ui-scale))] leading-none font-bold text-ink-soft hover:bg-ink/[0.11]"
                  >
                    −
                  </m.button>
                  <span className="min-w-[4.5ch] text-center font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink">
                    {goalChipLabel(time.goalMin)}
                  </span>
                  <m.button
                    type="button"
                    onClick={() => setGoalMin(time.goalMin + 15)}
                    whileTap={{ scale: 0.88 }}
                    aria-label="Goal 15 minutes more"
                    className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-ink/[0.06] font-display text-[calc(15px*var(--ui-scale))] leading-none font-bold text-ink-soft hover:bg-ink/[0.11]"
                  >
                    +
                  </m.button>
                </span>
              </div>
            </div>
          </Reveal>

          {/* today's pick */}
          {s.suggestion && (
            <Reveal>
              <div className="legal-card mt-6 rounded-[calc(18px*var(--ui-scale))] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="h-[calc(3px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))] shrink-0 rounded-full"
                        style={{ background: "var(--legal-rust-soft)" }}
                      />
                      <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
                        Today&apos;s pick
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 font-display text-[calc(17px*var(--ui-scale))] leading-snug font-semibold text-ink">
                      {s.suggestion.topic.label} · {s.suggestion.topic.title}
                    </p>
                    <p className="mt-1 text-[calc(12.5px*var(--ui-scale))] leading-relaxed text-ink-soft">
                      {s.suggestion.reason} · about {s.suggestion.topic.minutes} min · {s.suggestion.unit.code}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenTopic(s.suggestion!.unit.code, s.suggestion!.topic.id)}
                    className="legal-back-link shrink-0"
                    aria-label={`Read ${s.suggestion.topic.title} now`}
                  >
                    Read it now <MoveRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {/* where the minutes go */}
          <div id="minutes" className="mt-10 scroll-mt-28">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="legal-meta">THE CLOCK</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  Where your minutes go
                </h2>
              </div>
              <span className="legal-meta hidden sm:block">tap a topic to read</span>
            </div>

            <div className="flex flex-col gap-7">
              {units.map((u, ui) => {
                const busiest = Math.max(
                  ...u.topics.map((t) => topicSeconds(time, `${u.code}/${t.id}`)),
                  0,
                );
                const unitTime = u.topics.reduce(
                  (sum, t) => sum + topicSeconds(time, `${u.code}/${t.id}`),
                  0,
                );
                const done = unitDoneOf(u, revised);
                const accent = accentOf(ui);
                return (
                  <Reveal key={u.code} delay={Math.min(ui * 0.04, 0.16)}>
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenUnit(u.code)}
                        className="legal-meta cursor-pointer text-left transition-colors hover:text-ink"
                        aria-label={`Open ${u.code} — ${u.shortTitle}`}
                      >
                        {u.code} · {u.shortTitle.toUpperCase()}
                      </button>
                      <span className="legal-meta">
                        {done}/{u.topics.length} REVISED · {fmtClock(unitTime)}
                      </span>
                    </div>
                    <div className="h-px w-full bg-ink/10" />
                    <div className="mt-1 flex flex-col">
                      {u.topics.map((t) => {
                        const key = `${u.code}/${t.id}`;
                        const sec = topicSeconds(time, key);
                        const has = revised.includes(key);
                        const w =
                          busiest > 0
                            ? Math.max((sec / busiest) * 100, sec > 0 ? 5 : 0)
                            : 0;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => onOpenTopic(u.code, t.id)}
                            className="group cursor-pointer border-b border-ink/[0.06] px-1 py-3 text-left last:border-b-0 hover:bg-ink/[0.02]"
                            aria-label={`Open ${t.title} — ${fmtClock(sec)} recorded`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden
                                className="h-[calc(2.5px*var(--ui-scale))] w-[calc(11px*var(--ui-scale))] shrink-0 rounded-full"
                                style={{ background: has ? accent : "color-mix(in oklab, var(--color-ink) 18%, transparent)" }}
                              />
                              <span className="min-w-0 flex-1 truncate text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink">
                                {t.label} · {t.title}
                              </span>
                              <span
                                className="shrink-0 font-display text-[calc(12px*var(--ui-scale))] font-bold"
                                style={{ color: sec > 0 ? "var(--legal-rust)" : "var(--color-ink-faint)" }}
                              >
                                {sec > 0 ? fmtShort(sec) : "—"}
                              </span>
                            </span>
                            <span className="mt-1.5 ml-[calc(23px*var(--ui-scale))] block h-[calc(4px*var(--ui-scale))] w-[calc(100%-23px*var(--ui-scale))] overflow-hidden rounded-full bg-ink/[0.06]">
                              <m.span
                                className="block h-full rounded-full"
                                style={{ background: accent }}
                                initial={{ width: 0 }}
                                animate={{ width: `${w}%` }}
                                transition={{ type: "spring", stiffness: 110, damping: 20 }}
                              />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-4 text-[calc(12px*var(--ui-scale))] leading-relaxed text-ink-faint">
              The clock runs while a topic page or revision note is open and the
              tab is in view — step away for five minutes and it pauses itself.
            </p>
          </div>

          {/* badges — as stamps */}
          <div id="badges" className="mt-12 scroll-mt-28">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="legal-meta">MILESTONES</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  Badges
                </h2>
              </div>
              <span className="legal-meta">
                {ACHIEVEMENTS.filter((a) => achievementEarned(a.id, { units, revised, revisedCount: s.revisedCount, pct: s.pct, all: s.all, deepDive: s.deepDive })).length}/{ACHIEVEMENTS.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACHIEVEMENTS.map((a) => {
                const earned = achievementEarned(a.id, { units, revised, revisedCount: s.revisedCount, pct: s.pct, all: s.all, deepDive: s.deepDive });
                return (
                  <div
                    key={a.id}
                    title={a.hint}
                    className="flex items-center gap-3 rounded-[calc(14px*var(--ui-scale))] border px-4 py-3.5"
                    style={
                      earned
                        ? { borderColor: "color-mix(in oklab, var(--legal-rust) 35%, transparent)" }
                        : { borderColor: "color-mix(in oklab, var(--color-ink) 10%, transparent)" }
                    }
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-[calc(9px*var(--ui-scale))]"
                      style={
                        earned
                          ? {
                              background: "var(--legal-rust)",
                              color: "var(--color-paper)",
                            }
                          : {
                              border: "1.5px dashed color-mix(in oklab, var(--color-ink) 25%, transparent)",
                              color: "var(--color-ink-faint)",
                            }
                      }
                    >
                      {earned ? (
                        a.id === "first-hour" ? <Timer className="h-4 w-4" strokeWidth={2.4} /> :
                        a.id === "deep-dive" ? <Target className="h-4 w-4" strokeWidth={2.4} /> :
                        a.id === "course-complete" ? <Sparkles className="h-4 w-4" strokeWidth={2.4} /> :
                        a.id === "unit-complete" ? <Check className="h-4 w-4" strokeWidth={2.6} /> :
                        a.id === "halfway" ? <Gauge className="h-4 w-4" strokeWidth={2.4} /> :
                        <Award className="h-4 w-4" strokeWidth={2.4} />
                      ) : (
                        <Lock className="h-4 w-4" strokeWidth={2.4} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-display text-[calc(13px*var(--ui-scale))] font-bold ${earned ? "text-ink" : "text-ink-faint"}`}>
                        {a.label}
                      </span>
                      <span className="block text-[calc(10.5px*var(--ui-scale))] leading-snug text-ink-faint">
                        {a.hint}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* mark as revised — the index */}
          <div id="topics" className="mt-12 scroll-mt-28">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="legal-meta">THE INDEX</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  Mark topics as revised
                </h2>
              </div>
              <span className="legal-meta hidden sm:block">tap one to mark or unmark it</span>
            </div>
            <div className="flex flex-col gap-7">
              {units.map((u, ui) => {
                const done = unitDoneOf(u, revised);
                const accent = accentOf(ui);
                return (
                  <Reveal key={u.code} delay={Math.min(ui * 0.04, 0.16)}>
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => onOpenUnit(u.code)}
                        className="legal-meta cursor-pointer text-left transition-colors hover:text-ink"
                        aria-label={`Open ${u.code} — ${u.shortTitle}`}
                      >
                        {u.code} · {u.shortTitle.toUpperCase()} · {done}/{u.topics.length} REVISED
                      </button>
                      <div className="mt-2.5 h-px w-full bg-ink/10" />
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {u.topics.map((t) => {
                        const key = `${u.code}/${t.id}`;
                        const has = revised.includes(key);
                        return (
                          <m.button
                            key={t.id}
                            type="button"
                            onClick={() => toggleRevised(key)}
                            whileTap={{ scale: 0.97 }}
                            aria-pressed={has}
                            aria-label={has ? `Unmark as revised: ${t.title}` : `Mark as revised: ${t.title}`}
                            className="flex cursor-pointer items-center gap-3 rounded-[calc(12px*var(--ui-scale))] px-3.5 py-3 text-left transition-colors"
                            style={{
                              background: has
                                ? "color-mix(in oklab, var(--legal-rust) 9%, var(--color-paper))"
                                : "color-mix(in oklab, var(--color-ink) 3%, transparent)",
                            }}
                          >
                            <span
                              className="grid h-[calc(26px*var(--ui-scale))] w-[calc(26px*var(--ui-scale))] shrink-0 place-items-center rounded-[calc(8px*var(--ui-scale))]"
                              style={
                                has
                                  ? {
                                      background: accent,
                                      color: readableInk(accent),
                                    }
                                  : {
                                      border: "1.5px dashed color-mix(in oklab, var(--color-ink) 30%, transparent)",
                                      color: "var(--color-ink-faint)",
                                    }
                              }
                            >
                              <Check className="h-[calc(13px*var(--ui-scale))] w-[calc(13px*var(--ui-scale))]" strokeWidth={2.8} />
                            </span>
                            <span className="min-w-0">
                              <span className={`block font-display text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.1em] uppercase ${has ? "text-[var(--legal-rust)]" : "text-ink-faint"}`}>
                                {t.label}
                              </span>
                              <span className={`block truncate text-[calc(13px*var(--ui-scale))] font-semibold ${has ? "text-ink" : "text-ink-soft"}`}>
                                {t.title}
                              </span>
                            </span>
                          </m.button>
                        );
                      })}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* reset */}
          <Reveal className="mt-14">
            <div className="legal-card rounded-[calc(18px*var(--ui-scale))] p-5 text-center sm:p-6">
              <button
                type="button"
                onClick={resetArm}
                aria-label="Reset all progress"
                className="inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-[calc(10px*var(--ui-scale))] px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-bold transition-colors"
                style={
                  confirmReset
                    ? { background: "#FF6B6B", color: "#fff" }
                    : {
                        background: "color-mix(in oklab, var(--color-ink) 5%, transparent)",
                        color: "var(--color-ink-soft)",
                      }
                }
              >
                {confirmReset ? "tap again to confirm" : "Reset all progress"}
              </button>
              <p className="mt-3 text-[calc(12px*var(--ui-scale))] leading-relaxed text-ink-faint">
                {confirmReset
                  ? "This clears every revised mark and the whole time ledger — there is no undo."
                  : "Progress and reading time are saved in this browser only."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
