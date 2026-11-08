"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  Check,
  Clock,
  Droplets,
  Gauge,
  Lock,
  MoveRight,
  Sparkles,
  Sticker,
  Target,
  Timer,
  Trophy,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import {
  fmtClock,
  fmtShort,
  resetTime,
  setGoalMin,
  todaySeconds,
  topicSeconds,
  totalSeconds,
  useTimeData,
  weekSeconds,
} from "@/lib/spectra/time";
import { pickSuggestion } from "@/lib/spectra/suggest";
import {
  ACHIEVEMENTS,
  GOAL_CHIPS,
  achievementEarned,
  deepDiveOf,
  goalChipLabel,
  oneTopicMaxOf,
  revisedLine,
  unitDoneOf,
} from "@/lib/spectra/progress-derive";
import {
  BeakerMeter,
  Confetti,
  Float,
  Kicker,
  Mascot,
  PopIn,
  Reveal,
  SectionTag,
  SoftButton,
  SpeechBubble,
  tint,
  shade,
  readableInk,
} from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · progress page
   Two ledgers in one room: the topics you've marked as revised,
   and the minutes the site has quietly banked — today, this week
   against your goal, and topic by topic, so "how long did Topic 4
   get vs Topic 7" is a glance, not a guess. A daily pick suggests
   what to read next.
   ═══════════════════════════════════════════════════════════════ */

interface Achievement {
  id: string;
  label: string;
  hint: string;
  color: string;
  earned: boolean;
}

/* the sticker grid's own candy per badge — presentation maps onto
   the achievement ids; the maths lives in progress-derive.ts */
const ACH_COLORS: Record<string, string> = {
  "first-topic": "#FF6B6B",
  "unit-complete": "#FF922B",
  halfway: "#FFD43B",
  "first-hour": "#F59F00",
  "deep-dive": "#9775FA",
  "course-complete": "#12B886",
};

export function StickerBook({
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
  const [confirmPour, setConfirmPour] = useState(false);
  const [confetti, setConfetti] = useState(0);

  /* — time ledger — */
  const today = todaySeconds(time);
  const week = weekSeconds(time);
  const all = totalSeconds(time);
  const goalS = time.goalMin * 60;
  const weekPct = goalS > 0 ? Math.min(1, week / goalS) : 0;
  const goalMet = goalS > 0 && week >= goalS;

  /* — revised ledger — */
  const count = revised.length;
  const pct = TOTALS.topics ? count / TOTALS.topics : 0;

  const unitDone = (u: Unit) => unitDoneOf(u, revised);

  const oneTopicMax = oneTopicMaxOf(units, time);
  const deepDive = deepDiveOf(oneTopicMax);

  const suggestion = pickSuggestion(units, revised, time);

  const earnedArgs = { units, revised, revisedCount: count, pct, all, deepDive };
  const achievements: Achievement[] = ACHIEVEMENTS.map((def) => ({
    ...def,
    color: ACH_COLORS[def.id] ?? "#FF6B6B",
    earned: achievementEarned(def.id, earnedArgs),
  }));

  const pour = () => {
    if (!confirmPour) {
      setConfirmPour(true);
      window.setTimeout(() => setConfirmPour(false), 4000);
      return;
    }
    for (const k of revised) toggleRevised(k);
    resetTime();
    setConfirmPour(false);
    setConfetti((c) => c + 1);
  };

  const timeLine = goalMet
    ? `Weekly goal met — ${fmtClock(week)} on the bench this week. Everything from here is extra credit.`
    : week > 0
      ? `${fmtClock(week)} this week against a ${goalChipLabel(time.goalMin)} goal — the beaker fills as you read.`
      : "The beaker fills with every minute you spend reading. Open a topic to start the clock.";

  return (
    <div className="rooms-page rooms-progress-page mx-auto max-w-4xl px-5 pb-20 sm:px-8" style={{ paddingTop: "calc(6rem + var(--sa-top))" }}>
      {/* back */}
      <PopIn>
        <SoftButton onClick={onBack} className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]">
          <ArrowLeft className="h-4 w-4" /> back to home
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-8">
        <PopIn delay={0.05}>
          <SectionTag main="#12B886" tilt={-2}>
            progress
          </SectionTag>
        </PopIn>
        <PopIn delay={0.1}>
          <h1 className="mt-5 font-display text-[calc(clamp(2.3rem,5vw,3.4rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.05] font-semibold tracking-tight text-ink">
            Your revision,{" "}
            <span className="relative inline-block -rotate-2 rounded-[0.35em] bg-mint/15 px-[0.18em]">
              so far.
            </span>
          </h1>
        </PopIn>
      </header>

      {/* ————— the time ledger ————— */}
      <Reveal className="relative mt-8">
        <div className="rounded-[calc(32px*var(--ui-scale))] bg-paper p-6 puff sm:p-8">
          <div className="grid gap-5 sm:grid-cols-3">
            <StatPillar icon={Clock} label="today" value={fmtClock(today)} color="#FF922B" />
            <StatPillar icon={Timer} label="this week" value={fmtClock(week)} color="#12B886" />
            <StatPillar icon={Sparkles} label="all time" value={fmtClock(all)} color="#9775FA" />
          </div>

          {/* weekly goal bench */}
          <div
            className="mt-6 flex flex-col gap-5 rounded-[calc(26px*var(--ui-scale))] p-5 sm:flex-row sm:items-center sm:gap-7"
            style={{ background: tint("#12B886", 8) }}
          >
            <Float className="mx-auto shrink-0 sm:mx-0">
              <BeakerMeter pct={weekPct} main="#12B886" size={96} />
            </Float>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink">weekly goal</span>
                <span className="text-[calc(13px*var(--ui-scale))] font-semibold text-ink-soft">
                  {fmtClock(week)} of {goalChipLabel(time.goalMin)} {goalMet ? "· goal met" : ""}
                </span>
              </div>
              <div className="mt-2.5 h-4 w-full max-w-md overflow-hidden rounded-full bg-ink/[0.07]">
                <m.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#12B886,#FFD43B)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(weekPct * 100, week > 0 ? 4 : 0)}%` }}
                  transition={{ type: "spring", stiffness: 110, damping: 20 }}
                />
              </div>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {GOAL_CHIPS.map((g) => {
                  const active = time.goalMin === g;
                  return (
                    <m.button
                      key={g}
                      type="button"
                      onClick={() => setGoalMin(g)}
                      whileTap={{ scale: 0.92 }}
                      aria-pressed={active}
                      aria-label={`Weekly goal ${goalChipLabel(g)}`}
                      className="cursor-pointer rounded-full px-3.5 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold transition-colors"
                      style={
                        active
                          ? { background: "#12B886", color: readableInk("#12B886"), boxShadow: `0 2px 0 ${shade("#12B886")}` }
                          : { background: "color-mix(in oklab, var(--color-ink) 6%, transparent)", color: "var(--color-ink-soft)" }
                      }
                    >
                      {goalChipLabel(g)}
                    </m.button>
                  );
                })}
                <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-paper px-2 py-1">
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
          </div>
        </div>
      </Reveal>

      {/* ————— mascot line ————— */}
      <PopIn delay={0.15} className="mt-6 flex items-end gap-2 sm:gap-3">
        <div className="shrink-0 pb-1">
          <Mascot main="#12B886" mood={goalMet || pct >= 0.5 ? "cheer" : "idle"} size={88} bubbles={false} />
        </div>
        <SpeechBubble bg={tint("#12B886", 10)} className="min-w-0 flex-1" tailClass="left-[-9px] rotate-[135deg]">
          <p className="text-[calc(15px*var(--ui-scale))] leading-[1.75] text-ink">{timeLine}</p>
        </SpeechBubble>
      </PopIn>

      {/* ————— today's pick ————— */}
      {suggestion && (
        <Reveal className="mt-6">
          <div
            className="relative overflow-hidden rounded-[calc(32px*var(--ui-scale))] p-5 sm:p-6"
            style={{ background: tint(suggestion.unit.candy.main, 9) }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-[calc(18px*var(--ui-scale))] font-display text-[calc(15px*var(--ui-scale))] font-bold text-white"
                style={{
                  background: suggestion.unit.candy.main,
                  boxShadow: `0 0 0 5px ${tint(suggestion.unit.candy.main, 18)}`,
                }}
              >
                {suggestion.unit.code.replace("WCH", "")}
              </span>
              <div className="min-w-[calc(230px*var(--ui-scale))] flex-1">
                <Kicker color={suggestion.unit.candy.main}>
                  <Target className="h-3.5 w-3.5" /> today&apos;s pick
                </Kicker>
                <p className="mt-1 line-clamp-2 font-display text-[calc(17px*var(--ui-scale))] leading-snug font-semibold text-ink">
                  {suggestion.topic.label} · {suggestion.topic.title}
                </p>
                <p className="text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-soft">
                  {suggestion.reason} · about {suggestion.topic.minutes} min
                </p>
              </div>
              <m.button
                type="button"
                onClick={() => onOpenTopic(suggestion.unit.code, suggestion.topic.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex min-h-[calc(46px*var(--ui-scale))] w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 font-display text-[calc(14px*var(--ui-scale))] font-semibold text-white sm:w-auto"
                style={{
                  background: suggestion.unit.candy.main,
                  boxShadow: `0 3px 0 ${shade(suggestion.unit.candy.main)}`,
                }}
              >
                Read it now <MoveRight className="h-4.5 w-4.5" />
              </m.button>
            </div>
          </div>
        </Reveal>
      )}

      {/* ————— where the minutes go ————— */}
      <section className="mt-14">
        <Reveal>
          <Kicker className="mb-5">
            <Timer className="h-4 w-4" style={{ color: "var(--color-tangerine)" }} /> where your minutes go · tap a topic to read
          </Kicker>
        </Reveal>

        <div className="flex flex-col gap-5">
          {units.map((u, ui) => {
            const main = u.candy.main;
            const busiest = Math.max(...u.topics.map((t) => topicSeconds(time, `${u.code}/${t.id}`)), 0);
            const unitTime = u.topics.reduce((s, t) => s + topicSeconds(time, `${u.code}/${t.id}`), 0);
            const done = unitDone(u);
            return (
              <Reveal key={u.code} delay={Math.min(ui * 0.04, 0.2)}>
                <div className="rounded-[calc(32px*var(--ui-scale))] bg-paper p-5 puff sm:p-6">
                  <button
                    type="button"
                    onClick={() => onOpenUnit(u.code)}
                    className="group mb-4 flex w-full cursor-pointer flex-wrap items-center gap-3 text-left"
                  >
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-[calc(16px*var(--ui-scale))] font-display text-[calc(15px*var(--ui-scale))] font-bold text-white"
                      style={{ background: main, boxShadow: `0 0 0 5px ${tint(main, 18)}` }}
                    >
                      {u.code.replace("WCH", "")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[calc(16.5px*var(--ui-scale))] font-semibold text-ink group-hover:underline">
                        {u.code} · {u.shortTitle}
                      </span>
                      <span className="block text-[calc(12px*var(--ui-scale))] font-semibold text-ink-soft">
                        {done}/{u.topics.length} revised · {fmtClock(unitTime)} this course
                      </span>
                    </span>
                    <BeakerMeter pct={u.topics.length ? done / u.topics.length : 0} main={main} size={34} />
                  </button>

                  <div className="flex flex-col gap-2">
                    {u.topics.map((t) => {
                      const key = `${u.code}/${t.id}`;
                      const s = topicSeconds(time, key);
                      const has = revised.includes(key);
                      const w = busiest > 0 ? Math.max((s / busiest) * 100, s > 0 ? 6 : 0) : 0;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onOpenTopic(u.code, t.id)}
                          className="group cursor-pointer rounded-[calc(16px*var(--ui-scale))] px-4 py-3 text-left transition-colors"
                          style={{
                            background:
                              s > 0 ? tint(main, 7) : "color-mix(in oklab, var(--color-ink) 4%, transparent)",
                          }}
                          aria-label={`Open ${t.title} — ${fmtClock(s)} recorded`}
                        >
                          <div className="flex items-center gap-3">
                            {has ? (
                              <span
                                className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                                style={{ background: main }}
                              >
                                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
                              </span>
                            ) : (
                              <span
                                className="h-6 w-6 shrink-0 rounded-full"
                                style={{ boxShadow: `inset 0 0 0 2px ${tint(main, 45)}` }}
                              />
                            )}
                            <span className="min-w-0 flex-1 truncate text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink">
                              {t.label} · {t.title}
                            </span>
                            <span
                              className="shrink-0 font-display text-[calc(12.5px*var(--ui-scale))] font-bold"
                              style={{ color: s > 0 ? shade(main, 62) : "var(--color-ink-faint)" }}
                            >
                              {s > 0 ? fmtShort(s) : "—"}
                            </span>
                          </div>
                          <div className="mt-2 ml-9 h-[calc(7px*var(--ui-scale))] overflow-hidden rounded-full bg-ink/[0.05]">
                            <m.div
                              className="h-full rounded-full"
                              style={{ background: main }}
                              initial={{ width: 0 }}
                              animate={{ width: `${w}%` }}
                              transition={{ type: "spring", stiffness: 110, damping: 20 }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-3 text-[calc(12px*var(--ui-scale))] font-semibold text-ink-faint">
          the clock runs while a topic page or revision note is open and the tab is in view —
          step away for five minutes and it pauses itself.
        </p>
      </section>

      {/* ————— badges ————— */}
      <section className="mt-14">
        <Reveal>
          <Kicker className="mb-4">
            <Award className="h-4 w-4" style={{ color: "var(--color-lemon)" }} /> badges · {achievements.filter((a) => a.earned).length}/{achievements.length}
          </Kicker>
        </Reveal>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-3">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <m.div
                whileHover={{ y: -4, scale: 1.03 }}
                className={`relative flex cursor-default flex-col items-center rounded-[calc(24px*var(--ui-scale))] px-2 py-5 text-center ${
                  a.earned ? "puff" : ""
                }`}
                style={{
                  background: a.earned ? tint(a.color, 14) : "color-mix(in oklab, var(--color-ink) 4%, transparent)",
                }}
                title={a.hint}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full"
                  style={
                    a.earned
                      ? { background: a.color, boxShadow: `0 2px 0 ${shade(a.color)}`, color: readableInk(a.color) }
                      : { background: "color-mix(in oklab, var(--color-ink) 7%, transparent)", color: "var(--color-ink-faint)" }
                  }
                >
                  {a.earned ? (
                    a.id === "first-hour" ? <Timer className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "deep-dive" ? <Target className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "course-complete" ? <Droplets className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "unit-complete" ? <BookOpenCheck className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "halfway" ? <Gauge className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    <Sticker className="h-5.5 w-5.5" strokeWidth={2.5} />
                  ) : (
                    <Lock className="h-5 w-5" strokeWidth={2.5} />
                  )}
                </span>
                <span
                  className={`mt-2.5 font-display text-[calc(12.5px*var(--ui-scale))] leading-tight font-bold ${
                    a.earned ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  {a.label}
                </span>
                <span className="mt-0.5 hidden text-[calc(10.5px*var(--ui-scale))] leading-tight font-semibold text-ink-faint md:block">
                  {a.hint}
                </span>
              </m.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— the sheets: revised topics ————— */}
      <section className="mt-14 flex flex-col gap-8">
        <Reveal>
          <Kicker>
            <Trophy className="h-4 w-4" style={{ color: "var(--color-tangerine)" }} /> all topics · tap one to mark or unmark it
          </Kicker>
        </Reveal>

        {units.map((u, ui) => {
          const done = unitDone(u);
          const unitPct = u.topics.length ? done / u.topics.length : 0;
          const main = u.candy.main;
          return (
            <Reveal key={u.code} delay={Math.min(ui * 0.04, 0.2)}>
              <div
                className="rounded-[calc(32px*var(--ui-scale))] p-5 sm:p-6"
                style={{ background: tint(main, 8) }}
              >
                <button
                  type="button"
                  onClick={() => onOpenUnit(u.code)}
                  className="group mb-5 flex w-full cursor-pointer flex-wrap items-center gap-3 text-left"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[calc(16px*var(--ui-scale))] font-display text-[calc(15px*var(--ui-scale))] font-bold text-white"
                    style={{ background: main, boxShadow: `0 0 0 5px ${tint(main, 18)}` }}
                  >
                    {u.code.replace("WCH", "")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[calc(17px*var(--ui-scale))] font-semibold text-ink group-hover:underline">
                      {u.code} · {u.shortTitle}
                    </span>
                    <span className="block text-[calc(12px*var(--ui-scale))] font-semibold text-ink-soft">
                      {done}/{u.topics.length} revised
                    </span>
                  </span>
                  <span className="ml-auto flex items-center gap-3">
                    <BeakerMeter pct={unitPct} main={main} size={34} />
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {u.topics.map((t) => {
                    const has = revised.includes(`${u.code}/${t.id}`);
                    return (
                      <m.button
                        key={t.id}
                        type="button"
                        onClick={() => toggleRevised(`${u.code}/${t.id}`)}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 320, damping: 16 }}
                        aria-pressed={has}
                        aria-label={
                          has
                            ? `Unmark as revised: ${t.title}`
                            : `Mark as revised: ${t.title}`
                        }
                        className="relative cursor-pointer rounded-[calc(18px*var(--ui-scale))] p-3.5 text-left"
                        style={
                          has
                            ? {
                                background: main,
                                color: "#fff",
                                boxShadow: `0 2px 0 ${shade(main)}`,
                              }
                            : {
                                background: "color-mix(in oklab, var(--color-paper) 75%, transparent)",
                                border: "2px dashed color-mix(in oklab, var(--color-ink) 18%, transparent)",
                                color: "var(--color-ink-faint)",
                              }
                        }
                      >
                        {has && (
                          <span className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-white/30">
                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
                          </span>
                        )}
                        <span
                          className={`font-display text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.12em] uppercase ${
                            has ? "text-white/75" : ""
                          }`}
                        >
                          {t.label}
                        </span>
                        <span
                          className={`mt-1 line-clamp-2 block text-[calc(13px*var(--ui-scale))] leading-snug font-semibold ${
                            has ? "text-white" : "text-ink-soft"
                          }`}
                        >
                          {t.title}
                        </span>
                        {!has && (
                          <span className="mt-1.5 block text-[calc(10.5px*var(--ui-scale))] font-semibold text-ink-faint">
                            not marked yet
                          </span>
                        )}
                      </m.button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ————— reset ————— */}
      <Reveal className="mt-14 flex justify-center">
        <m.button
          type="button"
          onClick={pour}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95, y: 2 }}
          aria-label="Reset all progress"
          className="inline-flex min-h-[calc(48px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-display text-[calc(14.5px*var(--ui-scale))] font-semibold"
          style={
            confirmPour
              ? { background: "#FF6B6B", color: "#fff", boxShadow: `0 3px 0 ${shade("#FF6B6B")}` }
              : { background: "color-mix(in oklab, var(--color-ink) 7%, transparent)", color: "var(--color-ink-soft)" }
          }
        >
          <Droplets className="h-4.5 w-4.5" />
          {confirmPour ? "tap again to confirm" : "Reset all progress"}
        </m.button>
      </Reveal>
      <p className="mt-3 text-center text-[calc(12px*var(--ui-scale))] font-semibold text-ink-faint">
        {confirmPour
          ? "this clears every revised mark and the whole time ledger — there is no undo"
          : "progress and reading time are saved in this browser only"}
      </p>
    </div>
  );
}

/* ————— stat pillar ————— */

function StatPillar({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center rounded-[calc(26px*var(--ui-scale))] px-3 py-5 text-center"
      style={{ background: tint(color, 8) }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-full"
        style={{ background: tint(color, 22), color: shade(color, 62) }}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="mt-2 font-display text-[calc(clamp(1.35rem,3.2vw,1.8rem)*(1+(var(--ui-scale)-1)*0.5))] leading-none font-semibold text-ink">
        {value}
      </span>
      <span className="mt-1.5 font-display text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink-faint uppercase">
        {label}
      </span>
    </div>
  );
}
