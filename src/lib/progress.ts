"use client";

/* ————————————————————————————————————————————————
   PROGRESS · localStorage store
   Topics ticked as revised, quiz marks, candidate name.
   Read via useSyncExternalStore; write via helpers.
   ———————————————————————————————————————————————— */

import { useCallback, useSyncExternalStore } from "react";

export interface QuizRecord {
  correct: boolean;
  attempts: number;
}

export interface ProgressState {
  name: string;
  revised: string[]; // topic keys "unit-1/the-mole-titrations"
  quiz: Record<string, QuizRecord>;
}

const KEY = "axiom-progress-v1";
const DEFAULT: ProgressState = { name: "", revised: [], quiz: {} };

let cache: ProgressState = DEFAULT;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): ProgressState {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) cache = { ...DEFAULT, ...(JSON.parse(raw) as ProgressState) };
    } catch {
      /* private mode / quota — run in-memory */
    }
  }
  return cache;
}

function write(next: ProgressState) {
  cache = next;
  hydrated = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      hydrated = false;
      read();
      listeners.forEach((l) => l());
    }
  });
}

const serverSnapshot = () => DEFAULT;

const noopSubscribe = () => () => {};

/** false during SSR + hydration, true after — safe guard for localStorage reads */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, serverSnapshot);

  const toggleRevised = useCallback((id: string) => {
    const has = read().revised.includes(id);
    const cur = read();
    write({
      ...cur,
      revised: has ? cur.revised.filter((x) => x !== id) : [...cur.revised, id],
    });
  }, []);

  const setName = useCallback((name: string) => {
    write({ ...read(), name });
  }, []);

  /** record one quiz attempt; a correct answer is terminal (1 mark) */
  const recordQuiz = useCallback((id: string, correct: boolean) => {
    const cur = read();
    const prev = cur.quiz[id];
    if (prev?.correct) return; // already awarded
    write({
      ...cur,
      quiz: {
        ...cur.quiz,
        [id]: { correct, attempts: (prev?.attempts ?? 0) + 1 },
      },
    });
  }, []);

  const reset = useCallback(() => {
    write(DEFAULT);
  }, []);

  return { progress, toggleRevised, setName, recordQuiz, reset };
}
