"use client";

import { useSyncExternalStore } from "react";
import { pickDarkMood } from "./dark-mood";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · site preferences
   The knobs behind the customize panel: lab (light/dark),
   page zoom, heading & body fonts, polka dots, decorative motion.

   localStorage · key "reaction-club-prefs-v1"
   Every change runs through applyPrefs() — one function that paints
   the classes, datasets and zoom onto <html>, so the whole site
   re-skins at once and the mobile address bar keeps up.
   ═══════════════════════════════════════════════════════════════ */

export type Lab = "light" | "dark";
export type HeadFont = "fredoka" | "baloo" | "patrick";
export type BodyFont = "nunito" | "quicksand";

export interface Prefs {
  theme: Lab;
  /** page zoom — 0.9 to 1.3 */
  zoom: number;
  headFont: HeadFont;
  bodyFont: BodyFont;
  /** polka-dot paper background */
  dots: boolean;
  /** floating blobs, marquees, wiggles */
  motion: boolean;
}

export const DEFAULT_PREFS: Prefs = {
  theme: "light",
  zoom: 1,
  headFont: "fredoka",
  bodyFont: "nunito",
  dots: true,
  motion: true,
};

export const ZOOM_STEPS = [0.9, 1, 1.15, 1.3] as const;
export const ZOOM_LABEL: Record<string, string> = {
  "0.9": "S",
  "1": "M",
  "1.15": "L",
  "1.3": "XL",
};

const KEY = "reaction-club-prefs-v1";

let state: Prefs = DEFAULT_PREFS;
let hydrated = false;
const listeners = new Set<() => void>();

function sanitize(p: Partial<Prefs>): Prefs {
  const out: Prefs = { ...DEFAULT_PREFS };
  if (p.theme === "light" || p.theme === "dark") out.theme = p.theme;
  if (typeof p.zoom === "number" && ZOOM_STEPS.includes(p.zoom as (typeof ZOOM_STEPS)[number]))
    out.zoom = p.zoom;
  if (p.headFont === "fredoka" || p.headFont === "baloo" || p.headFont === "patrick")
    out.headFont = p.headFont;
  if (p.bodyFont === "nunito" || p.bodyFont === "quicksand") out.bodyFont = p.bodyFont;
  if (typeof p.dots === "boolean") out.dots = p.dots;
  if (typeof p.motion === "boolean") out.motion = p.motion;
  return out;
}

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      state = sanitize(JSON.parse(raw));
    } else {
      /* first run — honour the old theme key if it's there.
         A stored "hybrid" (the retired third lab) reads as light. */
      const legacy = window.localStorage.getItem("rc-theme");
      if (legacy === "dark") state = { ...state, theme: "dark" };
    }
  } catch {
    /* private mode / corrupt data — defaults */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — prefs stay in memory for this tab */
  }
}

function emit() {
  for (const l of listeners) l();
}

/* ————— the one applier — every knob lands on <html> here ————— */

/** keep the mobile address bar in the lab's cream */
function paintChrome(root: HTMLElement) {
  const cream = getComputedStyle(root).getPropertyValue("--color-cream").trim();
  if (!cream) return;
  let m = document.querySelector('meta[name="theme-color"]:not([media])');
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute("name", "theme-color");
    document.head.appendChild(m);
  }
  m.setAttribute("content", cream);
}

export function applyPrefs(p: Prefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", p.theme === "dark");
  /* the dark lab wears today's roast; the daylight lab needs none */
  if (p.theme !== "light") root.dataset.mood = String(pickDarkMood());
  else delete root.dataset.mood;
  root.dataset.head = p.headFont;
  root.dataset.body = p.bodyFont;
  root.dataset.dots = p.dots ? "on" : "off";
  root.dataset.motion = p.motion ? "on" : "off";
  root.style.zoom = String(p.zoom);
  paintChrome(root);
}

export function setPrefs(patch: Partial<Prefs>) {
  load();
  const next = sanitize({ ...state, ...patch });
  const themeFlip = next.theme !== state.theme;
  state = next;
  persist();
  applyPrefs(state);
  emit();
  return themeFlip;
}

export function resetPrefs() {
  load();
  state = DEFAULT_PREFS;
  persist();
  applyPrefs(state);
  emit();
}

/* ————— store plumbing ————— */

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return;
    state = DEFAULT_PREFS;
    hydrated = false;
    load();
    applyPrefs(state);
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Prefs {
  load();
  return state;
}

function getServerSnapshot(): Prefs {
  return DEFAULT_PREFS;
}

export function usePrefs(): Prefs {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const LAB_LABEL: Record<Lab, string> = {
  light: "Daylight lab",
  dark: "After-dark lab",
};
