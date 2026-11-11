"use client";

import type { TimeData } from "./time";
import { dayKey, topicSeconds, weekStart } from "./time";
import { unitDoneOf } from "./progress-derive";
import type { Unit } from "./types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · dashboard derivations
   The maths behind the desk's dashboard and the progress room's
   charts — day bars, the activity grid, per-unit canvases and the
   small records (best day, average, topics started). Same rule as
   progress-derive.ts: pure functions in, plain numbers out, no
   DOM and no stores — the presentation dresses them however it
   likes.

   Time math: the site banks seconds on local days ("YYYY-MM-DD"),
   weeks start Monday (weekStart in time.ts), and a day with zero
   seconds simply doesn't appear in the ledger — every function
   here fills those gaps with honest zeros.
   ═══════════════════════════════════════════════════════════════ */

/* ————— day bars ————— */

export interface DayBar {
  /** "2026-11-12" — the local day the seconds belong to */
  key: string;
  /** short weekday label, "Mon"… */
  day: string;
  /** day-of-month, 1…31 */
  date: number;
  /** total seconds banked that day */
  total: number;
  /** true for today's bar */
  today: boolean;
  /** true if the bar sits after today (the open week ahead) */
  future: boolean;
}

/** the n days ending today (or ending the week — see weekBarsOf) */
export function lastNDays(time: TimeData, n: number): DayBar[] {
  const out: DayBar[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = dayKey(d);
    out.push({
      key,
      day: d.toLocaleDateString("en-GB", { weekday: "short" }),
      date: d.getDate(),
      total: time.days[key]?.total ?? 0,
      today: i === 0,
      future: false,
    });
  }
  return out;
}

/** this calendar week, Monday to Sunday — the open days after
    today render as hollow slots so the week reads as a week */
export function weekBarsOf(time: TimeData): DayBar[] {
  const start = weekStart();
  const todayKey = dayKey();
  const out: DayBar[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const key = dayKey(d);
    out.push({
      key,
      day: d.toLocaleDateString("en-GB", { weekday: "short" }),
      date: d.getDate(),
      total: time.days[key]?.total ?? 0,
      today: key === todayKey,
      future: key > todayKey,
    });
  }
  return out;
}

/** the tallest bar in a set, with a small floor so one quiet day
    still leaves room to draw */
export function barMaxOf(bars: DayBar[]): number {
  return Math.max(...bars.map((b) => b.total), 0, 10 * 60);
}

/* ————— the activity grid ————— */

export interface HeatDay {
  key: string;
  total: number;
  /** 0–4, drawn as five mixes of one candy hue */
  level: number;
  today: boolean;
}

export interface HeatWeek {
  /** monday's key — the column's identity */
  key: string;
  days: HeatDay[];
}

const HEAT_LEVELS = [0, 15 * 60, 45 * 60, 90 * 60, 180 * 60] as const;

function heatLevel(total: number): number {
  let lvl = 0;
  for (let i = HEAT_LEVELS.length - 1; i >= 0; i--) {
    if (total >= HEAT_LEVELS[i]) {
      lvl = i;
      break;
    }
  }
  return lvl;
}

/** the last `weeks` whole weeks (Monday-anchored columns of 7),
    ending with the current week — future days inside it level 0 */
export function heatWeeksOf(time: TimeData, weeks = 16): HeatWeek[] {
  const todayKey = dayKey();
  const first = weekStart();
  first.setDate(first.getDate() - (weeks - 1) * 7);
  const out: HeatWeek[] = [];
  for (let w = 0; w < weeks; w++) {
    const days: HeatDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + w * 7 + d);
      const key = dayKey(date);
      const total = time.days[key]?.total ?? 0;
      days.push({ key, total, level: heatLevel(total), today: key === todayKey });
    }
    out.push({ key: days[0].key, days });
  }
  return out;
}

/** days with real reading time inside a span */
export function activeDaysOf(bars: DayBar[]): number {
  return bars.filter((b) => b.total >= 60).length;
}

/* ————— records ————— */

export interface DayRecord {
  key: string;
  total: number;
}

/** the strongest day in the whole ledger */
export function bestDayOf(time: TimeData): DayRecord | null {
  let best: DayRecord | null = null;
  for (const [key, sheet] of Object.entries(time.days)) {
    if (!best || sheet.total > best.total) best = { key, total: sheet.total };
  }
  return best;
}

/** mean seconds across the last n days, counting quiet days —
    the honest daily average, not the active-day flatterer */
export function avgDayOf(time: TimeData, n = 14): number {
  const bars = lastNDays(time, n);
  return bars.reduce((s, b) => s + b.total, 0) / n;
}

/* ————— per-unit canvases ————— */

export interface UnitStat {
  code: string;
  /** topics marked revised */
  done: number;
  topics: number;
  pct: number;
  /** all-time seconds across the unit's topics */
  seconds: number;
  /** the topic key with the most banked time ("WCH11/t04") */
  busiestKey: string | null;
}

export function unitStatOf(u: Unit, revised: string[], time: TimeData): UnitStat {
  const keys = u.topics.map((t) => `${u.code}/${t.id}`);
  let seconds = 0;
  let busiestKey: string | null = null;
  let busiest = -1;
  for (const k of keys) {
    const s = topicSeconds(time, k);
    seconds += s;
    if (s > busiest) {
      busiest = s;
      busiestKey = k;
    }
  }
  const done = unitDoneOf(u, revised);
  return {
    code: u.code,
    done,
    topics: u.topics.length,
    pct: u.topics.length ? done / u.topics.length : 0,
    seconds,
    busiestKey,
  };
}

/* ————— recent topics ————— */

export interface RecentTopic {
  key: string;
  /** local date the session happened, e.g. "Tue 11 Nov" */
  when: string;
  /** seconds banked that day on that topic */
  seconds: number;
}

/** the last few topic sessions the ledger knows about, newest
    first — walked from today backwards, topics within a day by
    time spent, so the list reads like a history */
export function recentTopicsOf(time: TimeData, n = 5): RecentTopic[] {
  const out: RecentTopic[] = [];
  const keys = Object.keys(time.days).sort().reverse();
  for (const k of keys) {
    const sheet = time.days[k];
    const entries = Object.entries(sheet.topics)
      .filter(([, s]) => s >= 60)
      .sort((a, b) => b[1] - a[1]);
    for (const [topicKey, s] of entries) {
      out.push({
        key: topicKey,
        when: new Date(`${k}T12:00:00`).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        seconds: s,
      });
      if (out.length >= n) return out;
    }
    if (out.length >= n) break;
  }
  return out;
}
