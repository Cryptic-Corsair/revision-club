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
  Trophy,
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
} from "@/lib/spectra/progress-derive";
import { weekBarsOf, lastNDays, activeDaysOf } from "@/lib/spectra/dashboard";
import { PopIn, Reveal, readableInk, shade, tint } from "./bits";
import { DashCard, FilledButton, Heatmap, Ring, StatTile, WeekBars } from "./dashboard";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the progress room, in the Material 3 dress.
   The same two ledgers — the topics marked as revised and the
   minutes the site has banked — read through progressSummary(),
   the shared derivation, then set as a Material You surface:
   aurora hero cards that bloom the unit candies through paper,
   gradient rings and bars, tonal chips, stat tiles, and the
   honest ink on top. All the widgets come from the dashboard
   system (dashboard.tsx), so this room and the desk's dashboard
   are one kit wearing two rooms.
   The props contract is unchanged: units, onBack, onOpenUnit,
   onOpenTopic.
   ═══════════════════════════════════════════════════════════════ */

/* the candy wheel — every section takes its own two inks */
const C = {
  mint: "#12B886",
  violet: "#9775FA",
  coral: "#FF6B6B",
  tangerine: "#FF922B",
  pink: "#F06595",
  lemon: "#F59F00",
} as const;

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

  /* the one-call summary — the same numbers the desk's dashboard reads */
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

  const week = weekBarsOf(time);
  const fortnight = lastNDays(time, 14);
  const goalPct = s.weekPct;

  return (
    <main className="mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      <PopIn>
        <button
          type="button"
          onClick={onBack}
          aria-label="Back home"
          className="m3-press inline-flex min-h-[calc(42px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full border border-ink/[0.09] bg-paper px-4 py-2 text-[calc(13.5px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </button>
      </PopIn>

      {/* ————— the hero ————— */}
      <Reveal>
        <DashCard
          className="mt-5 rounded-[calc(32px*var(--ui-scale))] p-6 sm:p-9"
          a1={C.mint}
          a2={C.violet}
          a3={C.coral}
          a4={C.lemon}
        >
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/70 px-3 py-1.5 text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.16em] text-ink-soft uppercase backdrop-blur-sm">
                  <Timer className="h-3.5 w-3.5" /> Progress · time &amp; marks
                </span>
              </div>
              <h1 className="mt-5 max-w-[16ch] font-display text-[calc(clamp(2.4rem,6vw,4.4rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.04] font-bold tracking-[-.04em] text-ink">
                Your bench, in numbers<span className="text-[var(--color-coral)]">.</span>
              </h1>
              <p className="mt-4 max-w-[58ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                {revisedLine(s.pct, s.revisedCount)} {timeLine}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {s.streak > 0 && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[calc(11.5px*var(--ui-scale))] font-extrabold text-white"
                    style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.tangerine})` }}
                  >
                    <Trophy className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {s.streak}-day streak
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/70 px-3.5 py-2 text-[calc(11.5px*var(--ui-scale))] font-extrabold text-ink-soft backdrop-blur-sm">
                  <Target className="h-3.5 w-3.5 text-mint" strokeWidth={2.4} />
                  {s.goalMet ? "weekly goal met" : `goal ${goalChipLabel(time.goalMin)}`}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/70 px-3.5 py-2 text-[calc(11.5px*var(--ui-scale))] font-extrabold text-ink-soft backdrop-blur-sm">
                  <Gauge className="h-3.5 w-3.5 text-violet" strokeWidth={2.4} />
                  {Math.round(s.pct * 100)}% of the course
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Ring pct={s.pct} size={148} stroke={13} c1={C.mint} c2={C.violet} track="color-mix(in oklab, var(--color-ink) 10%, transparent)">
                <span className="font-display text-[calc(32px*var(--ui-scale))] leading-none font-bold text-ink tabular-nums">
                  {Math.round(s.pct * 100)}%
                </span>
                <span className="mt-1 text-[calc(10px*var(--ui-scale))] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  revised
                </span>
              </Ring>
              <p className="text-[calc(12px*var(--ui-scale))] font-bold text-ink-soft tabular-nums">
                {s.revisedCount} of {TOTALS.topics} topics
              </p>
            </div>
          </div>
        </DashCard>
      </Reveal>

      {/* ————— the stat tiles ————— */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={0.02} className="min-w-0">
          <StatTile icon={Clock} main={C.mint} value={fmtClock(s.today)} label="today" hint="banked so far" />
        </Reveal>
        <Reveal delay={0.05} className="min-w-0">
          <StatTile icon={Timer} main={C.violet} value={fmtClock(s.week)} label="this week" hint={`goal ${goalChipLabel(s.goalMin)}`} />
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <StatTile icon={Trophy} main={C.lemon} value={fmtClock(s.all)} label="all time" hint="every minute on the site" />
        </Reveal>
        <Reveal delay={0.11} className="min-w-0">
          <StatTile icon={Check} main={C.coral} value={`${s.revisedCount}/${TOTALS.topics}`} label="revised" hint="topics marked" />
        </Reveal>
      </div>

      {/* ————— the week + the goal ————— */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <div id="week" className="dash-aurora relative h-full overflow-hidden rounded-[calc(28px*var(--ui-scale))] p-6 sm:p-7"
            style={{ "--a1": C.mint, "--a2": C.violet, "--a4": C.lemon } as React.CSSProperties}>
            <div className="dash-grain" aria-hidden />
            <div className="relative z-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink">
                  The week, day by day
                </h2>
                <span className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                  {activeDaysOf(fortnight)}/14 active days
                </span>
              </div>
              <div className="mt-5">
                <WeekBars bars={week} c1={C.mint} c2={C.violet} height={92} />
              </div>
              <div className="mt-4 border-t border-ink/[0.07] pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                    the last fortnight
                  </span>
                  <span className="text-[calc(11px*var(--ui-scale))] font-bold text-ink-soft tabular-nums">
                    {fmtClock(s.week)} this week
                  </span>
                </div>
                <div className="mt-3">
                  <WeekBars bars={fortnight} c1={C.violet} c2={C.coral} height={64} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="min-w-0">
          <div id="goal" className="scroll-mt-28">
            <div className="flex h-full flex-col rounded-[calc(28px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Ring pct={goalPct} size={72} stroke={8} c1={C.mint} c2={C.violet}>
                    <span className="text-[calc(11px*var(--ui-scale))] font-extrabold text-ink tabular-nums">
                      {Math.round(goalPct * 100)}%
                    </span>
                  </Ring>
                  <div>
                    <h2 className="font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink">
                      The weekly goal
                    </h2>
                    <p className="mt-0.5 text-[calc(12px*var(--ui-scale))] font-semibold text-ink-soft tabular-nums">
                      {fmtClock(s.week)} of {goalChipLabel(time.goalMin)} {s.goalMet ? "· met" : ""}
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[calc(10.5px*var(--ui-scale))] font-extrabold"
                  style={
                    s.goalMet
                      ? { background: `linear-gradient(135deg, ${C.mint}, ${C.violet})`, color: "#fff" }
                      : { background: "color-mix(in oklab, var(--color-ink) 6%, transparent)", color: "var(--color-ink-soft)" }
                  }
                >
                  {s.goalMet ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Target className="h-3.5 w-3.5" strokeWidth={2.4} />}
                  {s.goalMet ? "MET" : "IN PROGRESS"}
                </span>
              </div>

              {/* the M3 linear progress — gradient fill on the hairline track */}
              <div className="mt-5 h-[calc(8px*var(--ui-scale))] w-full overflow-hidden rounded-full bg-ink/[0.08]">
                <m.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${C.mint}, ${C.violet})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(goalPct * 100, s.week > 0 ? 3 : 0)}%` }}
                  transition={{ type: "spring", stiffness: 110, damping: 20 }}
                />
              </div>

              <p className="mt-5 text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                pick a weekly target
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {GOAL_CHIPS.map((g) => {
                  const active = time.goalMin === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoalMin(g)}
                      aria-pressed={active}
                      aria-label={`Weekly goal ${goalChipLabel(g)}`}
                      className="m3-press cursor-pointer rounded-full border px-3.5 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold transition-colors"
                      style={
                        active
                          ? { background: `linear-gradient(135deg, ${C.mint}, ${C.violet})`, borderColor: "transparent", color: "#fff" }
                          : { borderColor: "color-mix(in oklab, var(--color-ink) 12%, transparent)", color: "var(--color-ink-soft)" }
                      }
                    >
                      {goalChipLabel(g)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/10 bg-cream px-1.5 py-1">
                <m.button
                  type="button"
                  onClick={() => setGoalMin(time.goalMin - 15)}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Goal 15 minutes less"
                  className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-ink/[0.06] font-display text-[calc(15px*var(--ui-scale))] leading-none font-bold text-ink-soft hover:bg-ink/[0.11]"
                >
                  −
                </m.button>
                <span className="min-w-[4.5ch] text-center font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink tabular-nums">
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
              </div>

              <p className="mt-auto pt-5 text-[calc(11.5px*var(--ui-scale))] leading-relaxed text-ink-faint">
                The clock runs while a topic page or revision note is open and the
                tab is in view — step away for five minutes and it pauses itself.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ————— today's pick ————— */}
      {s.suggestion && (
        <Reveal>
          <div
            className="m3-tonal mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[calc(24px*var(--ui-scale))] p-5 sm:p-6"
            style={{ "--tone": s.suggestion.unit.candy.main } as React.CSSProperties}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-[calc(4px*var(--ui-scale))] w-[calc(16px*var(--ui-scale))] shrink-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${s.suggestion.unit.candy.main}, ${shade(s.suggestion.unit.candy.main, 30)})` }}
                />
                <span
                  className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase"
                  style={{ color: shade(s.suggestion.unit.candy.main, 40) }}
                >
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
            <FilledButton
              c1={s.suggestion.unit.candy.main}
              c2={shade(s.suggestion.unit.candy.main, 30)}
              onClick={() => onOpenTopic(s.suggestion!.unit.code, s.suggestion!.topic.id)}
              className="shrink-0"
            >
              Read it now <MoveRight className="h-4 w-4" />
            </FilledButton>
          </div>
        </Reveal>
      )}

      {/* ————— where the minutes go ————— */}
      <div id="minutes" className="mt-12 scroll-mt-28">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              The clock
            </p>
            <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
              Where your minutes go
            </h2>
          </div>
          <span className="hidden text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint sm:block">
            tap a topic to read
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {units.map((u, ui) => {
            const busiest = Math.max(
              ...u.topics.map((t) => topicSeconds(time, `${u.code}/${t.id}`)),
              0,
            );
            const unitTime = u.topics.reduce(
              (sum, t) => sum + topicSeconds(time, `${u.code}/${t.id}`),
              0,
            );
            const done = u.topics.filter((t) => revised.includes(`${u.code}/${t.id}`)).length;
            return (
              <Reveal key={u.code} delay={Math.min(ui * 0.03, 0.15)} className="min-w-0">
                <div className="h-full rounded-[calc(24px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenUnit(u.code)}
                      className="group flex cursor-pointer items-center gap-3 text-left"
                      aria-label={`Open ${u.code} — ${u.shortTitle}`}
                    >
                      <span
                        className="grid h-9 w-9 place-items-center rounded-[calc(12px*var(--ui-scale))] font-display text-[calc(15px*var(--ui-scale))] font-bold"
                        style={{
                          background: `linear-gradient(135deg, ${tint(u.candy.main, 22)}, ${tint(u.candy.main, 6)})`,
                          color: shade(u.candy.main, 55),
                        }}
                      >
                        {u.index}
                      </span>
                      <span>
                        <span className="block font-display text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.14em]" style={{ color: u.candy.main }}>
                          {u.code}
                        </span>
                        <span className="block font-display text-[calc(15px*var(--ui-scale))] font-semibold text-ink group-hover:underline">
                          {u.shortTitle}
                        </span>
                      </span>
                    </button>
                    <span className="text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint tabular-nums">
                      {done}/{u.topics.length} revised · {fmtClock(unitTime)}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col">
                    {u.topics.map((t) => {
                      const key = `${u.code}/${t.id}`;
                      const sec = topicSeconds(time, key);
                      const has = revised.includes(key);
                      const w = busiest > 0 ? Math.max((sec / busiest) * 100, sec > 0 ? 5 : 0) : 0;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onOpenTopic(u.code, t.id)}
                          className="group -mx-2 cursor-pointer rounded-2xl px-2 py-2.5 text-left transition-colors hover:bg-ink/[0.03]"
                          aria-label={`Open ${t.title} — ${fmtClock(sec)} recorded`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="h-[calc(5px*var(--ui-scale))] w-[calc(5px*var(--ui-scale))] shrink-0 rounded-full"
                              style={{
                                background: has
                                  ? `linear-gradient(135deg, ${u.candy.main}, ${shade(u.candy.main, 30)})`
                                  : "color-mix(in oklab, var(--color-ink) 18%, transparent)",
                              }}
                            />
                            <span className="min-w-0 flex-1 truncate text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink">
                              {t.label} · {t.title}
                            </span>
                            <span
                              className="shrink-0 font-display text-[calc(12px*var(--ui-scale))] font-bold tabular-nums"
                              style={{ color: sec > 0 ? shade(u.candy.main, 35) : "var(--color-ink-faint)" }}
                            >
                              {sec > 0 ? fmtShort(sec) : "—"}
                            </span>
                          </span>
                          <span className="mt-1.5 ml-[calc(17px*var(--ui-scale))] block h-[calc(4px*var(--ui-scale))] w-[calc(100%-17px*var(--ui-scale))] overflow-hidden rounded-full bg-ink/[0.06]">
                            <m.span
                              className="block h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${tint(u.candy.main, 15)}, ${u.candy.main})` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${w}%` }}
                              transition={{ type: "spring", stiffness: 110, damping: 20 }}
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ————— the activity grid ————— */}
      <Reveal className="mt-12 block">
        <div className="rounded-[calc(28px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-6 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
                Every day you showed up
              </p>
              <h2 className="mt-1 font-display text-[calc(20px*var(--ui-scale))] font-semibold text-ink">
                The activity grid
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[calc(11px*var(--ui-scale))] font-bold text-ink-soft">
              <Trophy className="h-3.5 w-3.5 text-coral" /> {s.streak}-day streak
            </span>
          </div>
          <div className="mt-5">
            <Heatmap main={C.mint} weeks={20} />
          </div>
        </div>
      </Reveal>

      {/* ————— badges ————— */}
      <div id="badges" className="mt-12 scroll-mt-28">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              Milestones
            </p>
            <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
              Badges
            </h2>
          </div>
          <span className="text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint">
            {ACHIEVEMENTS.filter((a) => achievementEarned(a.id, { units, revised, revisedCount: s.revisedCount, pct: s.pct, all: s.all, deepDive: s.deepDive })).length}/{ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => {
            const earned = achievementEarned(a.id, { units, revised, revisedCount: s.revisedCount, pct: s.pct, all: s.all, deepDive: s.deepDive });
            const c1 = [C.mint, C.violet, C.coral, C.lemon, C.pink, C.tangerine][i % 6];
            const c2 = [C.violet, C.coral, C.tangerine, C.pink, C.lemon, C.mint][i % 6];
            return (
              <div
                key={a.id}
                title={a.hint}
                className={`flex min-w-0 items-center gap-3.5 rounded-[calc(20px*var(--ui-scale))] border px-4 py-4 ${
                  earned ? "border-transparent" : "border-dashed border-ink/[0.13]"
                }`}
                style={
                  earned
                    ? {
                        background: `linear-gradient(135deg, color-mix(in oklab, ${c1} 12%, var(--color-paper)), color-mix(in oklab, ${c2} 12%, var(--color-paper)))`,
                      }
                    : undefined
                }
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[calc(13px*var(--ui-scale))]"
                  style={
                    earned
                      ? { background: `linear-gradient(135deg, ${c1}, ${c2})`, color: "#fff" }
                      : { color: "var(--color-ink-faint)" }
                  }
                >
                  {earned ? (
                    a.id === "first-hour" ? <Timer className="h-4.5 w-4.5" strokeWidth={2.4} /> :
                    a.id === "deep-dive" ? <Target className="h-4.5 w-4.5" strokeWidth={2.4} /> :
                    a.id === "course-complete" ? <Sparkles className="h-4.5 w-4.5" strokeWidth={2.4} /> :
                    a.id === "unit-complete" ? <Check className="h-4.5 w-4.5" strokeWidth={2.8} /> :
                    a.id === "halfway" ? <Gauge className="h-4.5 w-4.5" strokeWidth={2.4} /> :
                    <Award className="h-4.5 w-4.5" strokeWidth={2.4} />
                  ) : (
                    <Lock className="h-4.5 w-4.5" strokeWidth={2.4} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className={`block font-display text-[calc(13.5px*var(--ui-scale))] font-bold ${earned ? "text-ink" : "text-ink-faint"}`}>
                    {a.label}
                  </span>
                  <span className="block text-[calc(10.5px*var(--ui-scale))] leading-snug font-semibold text-ink-faint">
                    {a.hint}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ————— mark as revised — the index ————— */}
      <div id="topics" className="mt-12 scroll-mt-28">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              The index
            </p>
            <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
              Mark topics as revised
            </h2>
          </div>
          <span className="hidden text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint sm:block">
            tap one to mark or unmark it
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {units.map((u, ui) => {
            const done = u.topics.filter((t) => revised.includes(`${u.code}/${t.id}`)).length;
            return (
              <Reveal key={u.code} delay={Math.min(ui * 0.03, 0.15)} className="min-w-0">
                <div className="rounded-[calc(24px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-4 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
                    <button
                      type="button"
                      onClick={() => onOpenUnit(u.code)}
                      className="flex cursor-pointer items-center gap-2.5 text-left"
                      aria-label={`Open ${u.code} — ${u.shortTitle}`}
                    >
                      <span
                        className="h-[calc(6px*var(--ui-scale))] w-[calc(22px*var(--ui-scale))] rounded-full"
                        style={{ background: `linear-gradient(135deg, ${u.candy.main}, ${shade(u.candy.main, 30)})` }}
                      />
                      <span className="font-display text-[calc(13px*var(--ui-scale))] font-bold text-ink">
                        {u.code} · {u.shortTitle}
                      </span>
                    </button>
                    <span className="text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint tabular-nums">
                      {done}/{u.topics.length} revised
                    </span>
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
                          className="flex cursor-pointer items-center gap-3 rounded-[calc(14px*var(--ui-scale))] px-3.5 py-3 text-left transition-colors"
                          style={{
                            background: has
                              ? `color-mix(in oklab, ${u.candy.main} 10%, var(--color-paper))`
                              : "color-mix(in oklab, var(--color-ink) 3%, transparent)",
                          }}
                        >
                          <span
                            className="grid h-[calc(26px*var(--ui-scale))] w-[calc(26px*var(--ui-scale))] shrink-0 place-items-center rounded-[calc(9px*var(--ui-scale))]"
                            style={
                              has
                                ? {
                                    background: `linear-gradient(135deg, ${u.candy.main}, ${shade(u.candy.main, 30)})`,
                                    color: readableInk(u.candy.main),
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
                            <span
                              className={`block font-display text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.1em] uppercase ${has ? "" : "text-ink-faint"}`}
                              style={has ? { color: shade(u.candy.main, 35) } : undefined}
                            >
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
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ————— reset ————— */}
      <Reveal className="mt-14">
        <div className="rounded-[calc(24px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 text-center sm:p-6">
          <button
            type="button"
            onClick={resetArm}
            aria-label="Reset all progress"
            className="m3-press inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-bold transition-colors"
            style={
              confirmReset
                ? { background: `linear-gradient(135deg, ${C.coral}, ${C.tangerine})`, color: "#fff" }
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
    </main>
  );
}
