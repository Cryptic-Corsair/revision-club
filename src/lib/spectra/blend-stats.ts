"use client";

import { useSyncExternalStore } from "react";

/* ═══════════════════════════════════════════════════════════════
   REACTION CLUB · flashcard round stats
   localStorage · key "reaction-club-blend-v1"
   { best: streak record, blends: games played, hits, tries }
   ═══════════════════════════════════════════════════════════════ */

const KEY = "reaction-club-blend-v1";

export interface BlendStats {
  best: number;
  blends: number;
  hits: number;
  tries: number;
}

const EMPTY: BlendStats = { best: 0, blends: 0, hits: 0, tries: 0 };

let state: BlendStats = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      state = {
        best: Number(parsed.best) || 0,
        blends: Number(parsed.blends) || 0,
        hits: Number(parsed.hits) || 0,
        tries: Number(parsed.tries) || 0,
      };
    }
  } catch {
    /* private mode / corrupt data — start clean */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — stats stay in memory for this tab */
  }
}

function emit() {
  for (const l of listeners) l();
}

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

function getSnapshot(): BlendStats {
  load();
  return state;
}

function getServerSnapshot(): BlendStats {
  return EMPTY;
}

export function useBlendStats(): BlendStats {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Called once at the end of a blend run */
export function recordRun(correct: number, answered: number, bestStreak: number) {
  load();
  state = {
    best: Math.max(state.best, bestStreak),
    blends: state.blends + 1,
    hits: state.hits + correct,
    tries: state.tries + answered,
  };
  persist();
  emit();
}

export function resetBlendStats() {
  state = EMPTY;
  persist();
  emit();
}
