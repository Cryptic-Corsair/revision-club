"use client";

import { useCallback, useSyncExternalStore } from "react";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · reading time
   While the club is open we keep a quiet stopwatch: seconds land
   on the day they happen and, when a topic page is on the bench,
   on that topic too — so "how long did Topic 4 get vs Topic 7"
   is one lookup away.

   localStorage · key "reaction-club-time-v1"
   { days: { "YYYY-MM-DD": { total: s, topics: { "WCH11/t04": s } } },
     goalMin: minutes-per-week target }

   Honesty rules baked in:
   · a hidden tab earns nothing (visibilitychange),
   · five minutes without a tap, key or scroll stops the clock —
     an forgotten open tab never inflates the total,
   · time is flushed to localStorage every 15 s, on hide and on
     beforeunload, so a crash loses at most a few seconds.
   ═══════════════════════════════════════════════════════════════ */

const KEY = "reaction-club-time-v1";
const TICK_MS = 15_000;
const IDLE_MS = 5 * 60_000;

export interface DaySheet {
  /** seconds earned this day, whole site */
  total: number;
  /** seconds earned this day, per topic ("WCH11/t04") */
  topics: Record<string, number>;
}

export interface TimeData {
  days: Record<string, DaySheet>;
  /** weekly goal in minutes */
  goalMin: number;
}

const EMPTY: TimeData = { days: {}, goalMin: 120 };
const EMPTY_DAY: DaySheet = { total: 0, topics: {} };

let state: TimeData = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

/* ————— the live stopwatch (outside React on purpose) ————— */

let scopeKey: string | null = null;
let lastStamp: number | null = null;
let lastActive = 0;
let ticker: ReturnType<typeof setInterval> | null = null;

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      state = {
        days: parsed.days && typeof parsed.days === "object" ? parsed.days : {},
        goalMin: Number(parsed.goalMin) > 0 ? Number(parsed.goalMin) : 120,
      };
    }
  } catch {
    /* private mode / corrupt data — start clean */
  }
  lastActive = Date.now();
  armActivity();
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — the clock keeps ticking in memory */
  }
}

function emit() {
  for (const l of listeners) l();
}

/** local-date key, e.g. "2026-11-02" — the day the seconds belong to */
export function dayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** the Monday that starts the week containing d */
export function weekStart(d = new Date()): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const shift = (copy.getDay() + 6) % 7; // Mon=0 … Sun=6
  copy.setDate(copy.getDate() - shift);
  return copy;
}

function armActivity() {
  if (typeof window === "undefined") return;
  const bump = () => {
    lastActive = Date.now();
  };
  for (const ev of ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const)
    window.addEventListener(ev, bump, { passive: true, capture: true });
}

function bank(now: number) {
  if (lastStamp == null) {
    lastStamp = now;
    return;
  }
  const add = Math.min((now - lastStamp) / 1000, TICK_MS / 1000 + 5); // seconds
  lastStamp = now;
  if (add < 1) return;

  const dk = dayKey(new Date(now));
  const day = state.days[dk] ?? EMPTY_DAY;
  const nextDay: DaySheet = { total: day.total + add, topics: { ...day.topics } };
  if (scopeKey) nextDay.topics[scopeKey] = (nextDay.topics[scopeKey] ?? 0) + add;
  state = { ...state, days: { ...state.days, [dk]: nextDay } };
  persist();
  emit();
}

function tick() {
  const now = Date.now();
  if (typeof document !== "undefined" && document.visibilityState !== "visible") {
    lastStamp = null; // hidden time is never banked
    return;
  }
  if (now - lastActive > IDLE_MS) {
    lastStamp = now; // idle bench — keep the stamp fresh, bank nothing
    return;
  }
  bank(now);
}

function ensureTicker() {
  if (ticker || typeof window === "undefined") return;
  ticker = setInterval(tick, TICK_MS);
  const onHide = () => {
    if (document.visibilityState === "hidden") {
      bank(Date.now()); // flush what's on the counter
      lastStamp = null;
    } else {
      lastStamp = Date.now(); // back — start the counter fresh
      lastActive = Date.now();
    }
  };
  const onLeave = () => bank(Date.now());
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("beforeunload", onLeave);
  window.addEventListener("pagehide", onLeave);
}

/** Point the stopwatch at a topic ("WCH11/t04") or at the whole site (null). */
export function setScope(key: string | null) {
  load();
  ensureTicker();
  const now = Date.now();
  if (lastStamp != null && document.visibilityState === "visible" && now - lastActive <= IDLE_MS)
    bank(now); // bank the previous scope's last stretch
  lastStamp = now;
  scopeKey = key;
}

/* ————— actions ————— */

export function setGoalMin(min: number) {
  load();
  const goal = Math.max(15, Math.min(24 * 60, Math.round(min / 15) * 15));
  if (goal === state.goalMin) return;
  state = { ...state, goalMin: goal };
  persist();
  emit();
}

export function resetTime() {
  load();
  state = { days: {}, goalMin: state.goalMin };
  persist();
  emit();
}

/* ————— store plumbing (same recipe as progress.ts) ————— */

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return;
    state = EMPTY;
    hydrated = false;
    load();
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): TimeData {
  load();
  return state;
}

function getServerSnapshot(): TimeData {
  return EMPTY;
}

export function useTimeData(): TimeData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Bank time while this hook is mounted, attributing it to the topic
 * when both codes are given. One call site — the app shell — so two
 * views can never double-count.
 */
export function useTimeScope(unitCode?: string, topicId?: string) {
  const key = unitCode && topicId ? `${unitCode}/${topicId}` : null;
  const subscribe = useCallback(
    (cb: () => void) => {
      setScope(key);
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    [key]
  );
  return useSyncExternalStore(subscribe, () => key, () => null);
}

/* ————— read-only selectors ————— */

export function totalSeconds(d: TimeData): number {
  let s = 0;
  for (const day of Object.values(d.days)) s += day.total;
  return s;
}

export function todaySeconds(d: TimeData): number {
  return d.days[dayKey()]?.total ?? 0;
}

export function weekSeconds(d: TimeData): number {
  const start = weekStart();
  let s = 0;
  for (let i = 0; i < 7; i++) {
    const dk = dayKey(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
    s += d.days[dk]?.total ?? 0;
  }
  return s;
}

/** all-time seconds for one topic, "WCH11/t04" */
export function topicSeconds(d: TimeData, key: string): number {
  let s = 0;
  for (const day of Object.values(d.days)) s += day.topics[key] ?? 0;
  return s;
}

/* ————— formatting ————— */

/** "34 min" · "1 h 24" · "2 h 05" · "0 min" */
export function fmtClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 1) return "0 min";
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return `${h} h ${String(rest).padStart(2, "0")}`;
}

/** short pillar-box form for chips: "1:24" (h:mm) or "34m" */
export function fmtShort(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 60) return m < 1 ? "<1m" : `${m}m`;
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
}
