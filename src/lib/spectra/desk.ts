"use client";

import { useSyncExternalStore } from "react";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the desk
   The site remembers whether you've actually started studying.
   First visit lands on the introduction; the first tap into a
   unit or topic flips a flag, and every visit after that opens
   the desk — the simplified homepage built around your progress.

   No account, no sign-in: the "membership" is a localStorage
   flag, exactly like the revised marks and the reading clock.

   localStorage · key "reaction-club-desk-v1"
   { engaged: boolean            — has opened a unit or topic
     lastUnit: string | null     — last unit code tapped
     lastTopic: string | null    — last topic id tapped
     lastAt: number | null }     — when that happened (epoch ms)
   ═══════════════════════════════════════════════════════════════ */

const KEY = "reaction-club-desk-v1";

export interface DeskState {
  engaged: boolean;
  lastUnit: string | null;
  lastTopic: string | null;
  lastAt: number | null;
}

const EMPTY: DeskState = {
  engaged: false,
  lastUnit: null,
  lastTopic: null,
  lastAt: null,
};

let state: DeskState = EMPTY;
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
        engaged: parsed.engaged === true,
        lastUnit:
          typeof parsed.lastUnit === "string" ? parsed.lastUnit : null,
        lastTopic:
          typeof parsed.lastTopic === "string" ? parsed.lastTopic : null,
        lastAt: typeof parsed.lastAt === "number" ? parsed.lastAt : null,
      };
    }
  } catch {
    /* private mode / corrupt data — first visit it is */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — memory only for this tab */
  }
}

function emit() {
  for (const l of listeners) l();
}

function set(next: DeskState) {
  state = next;
  persist();
  emit();
}

/** the member moment: a unit page was opened */
export function markUnit(code: string) {
  load();
  set({ ...state, engaged: true, lastUnit: code, lastTopic: null, lastAt: Date.now() });
}

/** a topic (or its note) was opened — the strongest "continue here" signal */
export function markTopic(code: string, topicId: string) {
  load();
  set({ ...state, engaged: true, lastUnit: code, lastTopic: topicId, lastAt: Date.now() });
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

function getSnapshot(): DeskState {
  load();
  return state;
}

function getServerSnapshot(): DeskState {
  return EMPTY;
}

export function useDesk(): DeskState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
