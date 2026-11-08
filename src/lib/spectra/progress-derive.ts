"use client";

import type { TimeData } from "./time";
import { dayKey, todaySeconds, topicSeconds, totalSeconds, weekSeconds } from "./time";
import { pickSuggestion, type Suggestion } from "./suggest";
import type { Unit } from "./types";
import { TOTALS } from "./units";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · progress derivations
   The pure maths behind the progress room and the desk — what was
   once computed inline inside sticker-book.tsx and desk.tsx. Lifted
   so any presentation (today's rooms, tomorrow's second interface)
   reads the same ledger without copying a single formula.

   Nothing here touches the DOM or the stores: it takes the store
   snapshots (revised keys, TimeData) and returns plain numbers.
   ═══════════════════════════════════════════════════════════════ */

/* ————— weekly goal bench ————— */

export const GOAL_CHIPS = [30, 60, 90, 120, 180];

export const goalChipLabel = (m: number) =>
  m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60}` : ""}`;

/** how much of this week's goal the banked minutes fill, 0…1 */
export const weekPctOf = (week: number, goalMin: number) => {
  const goalS = goalMin * 60;
  return goalS > 0 ? Math.min(1, week / goalS) : 0;
};

export const goalMetOf = (week: number, goalMin: number) =>
  goalMin * 60 > 0 && week >= goalMin * 60;

/* ————— revised ledger ————— */

/** share of the course marked as revised, 0…1 */
export const coursePct = (revisedCount: number) =>
  TOTALS.topics ? revisedCount / TOTALS.topics : 0;

/** topics of one unit marked as revised */
export const unitDoneOf = (u: Unit, revised: string[]) =>
  u.topics.filter((t) => revised.includes(`${u.code}/${t.id}`)).length;

/** the encouragement line under the revised count */
export function revisedLine(pct: number, count: number): string {
  if (count === 0)
    return "Nothing marked yet. Open any unit, finish a topic, then mark it as revised.";
  if (pct >= 1) return "Every topic revised — well done. The minutes keep the rust off.";
  if (pct >= 0.75) return "Three quarters of the course revised.";
  if (pct >= 0.5) return "Halfway through the course.";
  if (pct >= 0.25) return "A quarter of the course revised.";
  return "Good start — keep going.";
}

/* ————— time ledger ————— */

/** the busiest single topic's banked seconds */
export function oneTopicMaxOf(units: Unit[], time: TimeData): number {
  return Math.max(
    ...units.flatMap((u) => u.topics.map((t) => topicSeconds(time, `${u.code}/${t.id}`))),
    0,
  );
}

/** the deep-dive bar: one topic given half an hour */
export const DEEP_DIVE_SECONDS = 30 * 60;
export const deepDiveOf = (oneTopicMax: number) => oneTopicMax >= DEEP_DIVE_SECONDS;

/** consecutive days with real reading time, counting back from
    today — with a one-day grace: this morning's session may not
    have started yet, and a streak shouldn't die while you sleep */
export function streakOf(days: TimeData["days"]): number {
  const d = new Date();
  if (!days[dayKey(d)]?.total) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days[dayKey(d)]?.total) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/* ————— achievements —————
   Six fixed badges, earned by the ledger. The metadata is static;
   only `earned` is computed. Presentation (the candy colours the
   sticker grid wears, the stamps another interface might) maps
   onto the ids however it likes. */

export interface AchievementDef {
  id: string;
  label: string;
  hint: string;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-topic", label: "First topic", hint: "Mark 1 topic as revised" },
  { id: "unit-complete", label: "Unit complete", hint: "Finish every topic in one unit" },
  { id: "halfway", label: "Halfway", hint: "Revise half of the topics" },
  { id: "first-hour", label: "First hour", hint: "Spend 1 hour reading here" },
  { id: "deep-dive", label: "Deep dive", hint: "Give one topic 30 minutes" },
  { id: "course-complete", label: "Course complete", hint: "Revise every topic" },
];

export const achievementEarned = (
  id: string,
  args: {
    units: Unit[];
    revised: string[];
    revisedCount: number;
    pct: number;
    all: number;
    deepDive: boolean;
  },
): boolean => {
  switch (id) {
    case "first-topic":
      return args.revisedCount >= 1;
    case "unit-complete":
      return args.units.some(
        (u) => unitDoneOf(u, args.revised) === u.topics.length && u.topics.length > 0,
      );
    case "halfway":
      return args.pct >= 0.5;
    case "first-hour":
      return args.all >= 60 * 60;
    case "deep-dive":
      return args.deepDive;
    case "course-complete":
      return args.pct >= 1;
    default:
      return false;
  }
};

/* ————— the one-call summary —————
   Everything a progress surface needs, computed once per render
   from the store snapshots. */
export interface ProgressSummary {
  revisedCount: number;
  pct: number;
  today: number;
  week: number;
  all: number;
  goalMin: number;
  weekPct: number;
  goalMet: boolean;
  oneTopicMax: number;
  deepDive: boolean;
  streak: number;
  suggestion: Suggestion | null;
}

export function progressSummary(
  units: Unit[],
  revised: string[],
  time: TimeData,
): ProgressSummary {
  const week = weekSeconds(time);
  const goalS = time.goalMin * 60;
  const oneTopicMax = oneTopicMaxOf(units, time);
  return {
    revisedCount: revised.length,
    pct: coursePct(revised.length),
    today: todaySeconds(time),
    week,
    all: totalSeconds(time),
    goalMin: time.goalMin,
    weekPct: goalS > 0 ? Math.min(1, week / goalS) : 0,
    goalMet: goalS > 0 && week >= goalS,
    oneTopicMax,
    deepDive: deepDiveOf(oneTopicMax),
    streak: streakOf(time.days),
    suggestion: pickSuggestion(units, revised, time),
  };
}
