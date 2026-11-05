"use client";

import { useSyncExternalStore } from "react";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · revision packs
   Tick spec points anywhere on the site; the pack assembles the
   notes behind them. This store holds the ticks, the read marks
   and the named sets you save along the way.

   localStorage · key "reaction-club-packs-v1"
   { picks: ["2.1", …]            — ticked spec points
     read:   ["2.1", …]           — "mark read" inside a pack
     sets:   [{ id, name, picks, savedAt }]
     activeSetId: string | null } — the set currently loaded

   Picks are plain spec numbers, not doc paths: if a second note
   ever covers the same statement, the pack grows with it — the
   registry (./registry.ts) resolves picks to sections at render.
   Same shape rules as progress.ts: private-mode safe, cross-tab.
   ═══════════════════════════════════════════════════════════════ */

export interface PackSet {
  id: string;
  name: string;
  picks: string[];
  savedAt: string; /* ISO date */
}

export interface PacksState {
  picks: string[];
  read: string[];
  sets: PackSet[];
  activeSetId: string | null;
}

const KEY = "reaction-club-packs-v1";
const EMPTY: PacksState = { picks: [], read: [], sets: [], activeSetId: null };

let state: PacksState = EMPTY;
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
        picks: Array.isArray(parsed.picks)
          ? parsed.picks.filter((s: unknown) => typeof s === "string")
          : [],
        read: Array.isArray(parsed.read)
          ? parsed.read.filter((s: unknown) => typeof s === "string")
          : [],
        sets: Array.isArray(parsed.sets)
          ? parsed.sets.filter(
              (s: unknown): s is PackSet =>
                !!s &&
                typeof s === "object" &&
                typeof (s as PackSet).id === "string" &&
                typeof (s as PackSet).name === "string" &&
                Array.isArray((s as PackSet).picks),
            )
          : [],
        activeSetId:
          typeof parsed.activeSetId === "string" ? parsed.activeSetId : null,
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
    /* storage unavailable — packs stay in memory for this tab */
  }
}

function emit() {
  for (const l of listeners) l();
}

function set(next: PacksState) {
  state = next;
  persist();
  emit();
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

function getSnapshot(): PacksState {
  load();
  return state;
}

function getServerSnapshot(): PacksState {
  return EMPTY;
}

export function usePacks(): PacksState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ————— ticks ————— */

export function togglePick(spec: string) {
  load();
  const picks = state.picks.includes(spec)
    ? state.picks.filter((s) => s !== spec)
    : [...state.picks, spec];
  /* unloading a point unloads its read mark too — the two travel together */
  const read = state.read.includes(spec)
    ? picks.includes(spec)
      ? state.read
      : state.read.filter((s) => s !== spec)
    : state.read;
  /* activeSetId survives tick changes on purpose: a drifted loaded set
     offers "overwrite with current" instead of silently detaching */
  set({ ...state, picks, read });
}

export function clearPicks() {
  load();
  if (state.picks.length === 0 && state.read.length === 0) return;
  set({ ...state, picks: [], read: [], activeSetId: null });
}

/* ————— read marks (inside a pack) ————— */

export function toggleRead(spec: string) {
  load();
  const read = state.read.includes(spec)
    ? state.read.filter((s) => s !== spec)
    : [...state.read, spec];
  set({ ...state, read });
}

/* ————— named sets ————— */

export function saveSet(name: string, picks: string[]): string {
  load();
  const id = `pack-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const setRecord: PackSet = {
    id,
    name: name.trim() || "Untitled set",
    picks: [...picks],
    savedAt: new Date().toISOString(),
  };
  set({
    ...state,
    sets: [...state.sets, setRecord],
    activeSetId: id,
  });
  return id;
}

/** load a set: replaces the ticks with the set's picks */
export function loadSet(id: string) {
  load();
  const record = state.sets.find((s) => s.id === id);
  if (!record) return;
  set({ ...state, picks: [...record.picks], activeSetId: id });
}

export function overwriteSet(id: string, picks: string[]) {
  load();
  set({
    ...state,
    sets: state.sets.map((s) =>
      s.id === id
        ? { ...s, picks: [...picks], savedAt: new Date().toISOString() }
        : s,
    ),
    activeSetId: id,
  });
}

export function renameSet(id: string, name: string) {
  load();
  const clean = name.trim();
  if (!clean) return;
  set({
    ...state,
    sets: state.sets.map((s) => (s.id === id ? { ...s, name: clean } : s)),
  });
}

export function deleteSet(id: string) {
  load();
  set({
    ...state,
    sets: state.sets.filter((s) => s.id !== id),
    activeSetId: state.activeSetId === id ? null : state.activeSetId,
  });
}
