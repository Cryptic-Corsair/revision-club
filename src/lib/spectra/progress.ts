"use client";

import { useSyncExternalStore } from "react";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · revision progress — localStorage, cross-tab
   key "spectra-progress-v1" · { revised: string[] }
   ═══════════════════════════════════════════════════════════════ */

const KEY = "spectra-progress-v1";
const EMPTY: string[] = [];

let state: string[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.revised)) state = parsed.revised;
  } catch {
    /* private mode / corrupt data — start clean */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ revised: state }));
  } catch {
    /* storage unavailable — progress stays in memory for this tab */
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
    const prev = state;
    state = EMPTY;
    hydrated = false;
    load();
    if (state !== prev) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string[] {
  load();
  return state;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

export function toggleRevised(id: string) {
  load();
  const next = state.includes(id) ? state.filter((x) => x !== id) : [...state, id];
  state = next;
  persist();
  emit();
}

export function useRevised(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
