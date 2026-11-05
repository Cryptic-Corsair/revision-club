"use client";

import { useSyncExternalStore } from "react";
import { pickDarkMood } from "./dark-mood";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · site preferences
   The knobs behind the customize panel: lab (light/dark/dune/
   classic), the accent wheel, page zoom, heading & body fonts,
   polka dots, decorative motion.

   localStorage · key "reaction-club-prefs-v1"
   Every change runs through applyPrefs() — one function that paints
   the classes, datasets and zoom onto <html>, so the whole site
   re-skins at once and the mobile address bar keeps up.
   ═══════════════════════════════════════════════════════════════ */

export type Lab = "light" | "dark" | "dune" | "classic";
export type HeadFont = "fredoka" | "baloo" | "patrick";
export type BodyFont = "nunito" | "quicksand";

/* the candy wheel the site's sections take turns wearing. The full
   shelf by default; the customize panel narrows it to your picks —
   one pick dresses every section, two alternate, three+ rotate.
   Order is fixed (hue-wheel, pink reserved for WCH15's identity) so
   alternation is predictable no matter which subset is on. */
export type AccentId = "coral" | "tangerine" | "sun" | "mint" | "grape" | "amber";

export const ACCENTS: { id: AccentId; hex: string; label: string }[] = [
  { id: "coral", hex: "#FF6B6B", label: "Coral" },
  { id: "tangerine", hex: "#FF922B", label: "Tangerine" },
  { id: "sun", hex: "#FFD43B", label: "Sun" },
  { id: "mint", hex: "#12B886", label: "Mint" },
  { id: "grape", hex: "#9775FA", label: "Grape" },
  { id: "amber", hex: "#F59F00", label: "Amber" },
];

export const ACCENT_IDS: AccentId[] = ACCENTS.map((a) => a.id);

export interface Prefs {
  theme: Lab;
  /** the accent wheel — which candies the sections rotate through */
  accents: AccentId[];
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
  theme: "classic",
  accents: [...ACCENT_IDS],
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
  if (
    p.theme === "light" ||
    p.theme === "dark" ||
    p.theme === "dune" ||
    p.theme === "classic"
  )
    out.theme = p.theme;
  else if (p.theme === "hybrid")
    /* the retired third lab rides on as classic — its heir */
    out.theme = "classic";
  if (typeof p.zoom === "number" && ZOOM_STEPS.includes(p.zoom as (typeof ZOOM_STEPS)[number]))
    out.zoom = p.zoom;
  if (p.headFont === "fredoka" || p.headFont === "baloo" || p.headFont === "patrick")
    out.headFont = p.headFont;
  if (p.bodyFont === "nunito" || p.bodyFont === "quicksand") out.bodyFont = p.bodyFont;
  if (typeof p.dots === "boolean") out.dots = p.dots;
  if (typeof p.motion === "boolean") out.motion = p.motion;
  if (Array.isArray(p.accents)) {
    const picked = new Set<AccentId>();
    for (const a of p.accents) if (ACCENT_IDS.includes(a)) picked.add(a);
    /* wheel order, never empty — the panel blocks deselecting the
       last swatch, and a hand-edited empty array falls back to the
       full shelf */
    out.accents = picked.size
      ? ACCENT_IDS.filter((id) => picked.has(id))
      : [...ACCENT_IDS];
  }
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
         A stored "hybrid" (the retired third lab) reads as classic,
         its direct heir; everything else starts on the default. */
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
  /* the two night rooms both wear .dark — every dark: utility in the
     wardrobe keys off it — and the dune lab re-tints the tokens on
     top with .dune */
  root.classList.toggle("dark", p.theme === "dark" || p.theme === "dune");
  root.classList.toggle("dune", p.theme === "dune");
  root.classList.toggle("classic", p.theme === "classic");
  /* only the night lab wears today's roast; dune's chocolate room is
     a fixed signature, and light & classic keep their daylight tokens */
  if (p.theme === "dark") root.dataset.mood = String(pickDarkMood());
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

/* the wheel accentOf() reads while rendering (bands, chips, dots).
   Plain state, deliberately no load() — the hydration pass must
   paint the same default wheel the server did; the store's own
   subscribe → load → re-render carries the user's picks in right
   after commit, and every pick after that re-renders ClubApp, which
   re-runs every accentOf in the tree. */
export function currentAccents(): AccentId[] {
  return state.accents;
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
  light: "Light",
  dark: "Night",
  dune: "Dune",
  classic: "Classic",
};
