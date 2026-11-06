"use client";

import { useSyncExternalStore } from "react";
import { pickDarkMood } from "./dark-mood";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · site preferences
   The knobs behind the customize panel: lab (light/dark/dune/
   classic), the accent wheel, content scale, heading & body fonts,
   polka dots, decorative motion.

   localStorage · key "reaction-club-prefs-v1"
   Every change runs through applyPrefs() — one function that paints
   the classes and datasets onto <html>, so the whole site re-skins
   at once and the mobile address bar keeps up.
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

/* content scale — S/M/L/XL. NOT page zoom: the retired html zoom
   property scaled the whole coordinate system (layout viewport
   included), which is what kept squeezing the spec map and every
   fixed surface. Scale instead feeds --ui-scale (see globals.css):
   component sizes multiply with it, while the navbar pill and the
   spec map pin the variable back to 1 and stay pixel-identical. */
export const SCALES = ["S", "M", "L", "XL"] as const;
export type ScaleId = (typeof SCALES)[number];
export const SCALE_VALUE: Record<ScaleId, number> = {
  S: 0.9,
  M: 1,
  L: 1.15,
  XL: 1.3,
};

/* the spec-map drawer's own size knobs — deliberately OUTSIDE
   --ui-scale. The tray is frozen against the content-scale knob
   (.spec-map pins --ui-scale: 1), and these prefs are absolute
   numbers: a fraction of the visible viewport and a chip width in
   rem, reading identically on every device, page size and zoom —
   exactly what "customize it regardless of page sizes" means. */
export const SPEC_HEIGHTS = [
  { id: "peek", label: "Peek", fraction: 0.62 },
  { id: "tall", label: "Tall", fraction: 0.8 },
  { id: "full", label: "Full", fraction: 0.94 },
] as const;
export type SpecDensity = "compact" | "comfy" | "roomy";
export const SPEC_DENSITIES: { id: SpecDensity; label: string }[] = [
  { id: "compact", label: "Compact" },
  { id: "comfy", label: "Comfy" },
  { id: "roomy", label: "Roomy" },
];
/* drag limits — the tray can never fold below a usable third of the
   screen, nor swallow the last sliver of the note behind it */
export const SPEC_H_MIN = 0.35;
export const SPEC_H_MAX = 0.98;

export interface Prefs {
  theme: Lab;
  /** the accent wheel — which candies the sections rotate through */
  accents: AccentId[];
  /** content scale — S/M/L/XL (multiplies --ui-scale) */
  scale: ScaleId;
  /** the spec-map drawer's height, as a fraction of the visible
      screen — set by the panel presets and by dragging the grabber */
  specHeight: number;
  /** spec-map chip size — how many columns the tray fills with */
  specDensity: SpecDensity;
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
  scale: "M",
  specHeight: 0.94,
  specDensity: "comfy",
  headFont: "fredoka",
  bodyFont: "nunito",
  dots: true,
  motion: true,
};

const KEY = "reaction-club-prefs-v1";

let state: Prefs = DEFAULT_PREFS;
let hydrated = false;
const listeners = new Set<() => void>();

/** what sanitize reads: today's prefs, plus the retired zoom number
    that older saves carry (mapped onto scale below) */
type StoredPrefs = Partial<Prefs> & { zoom?: unknown };

function sanitize(p: StoredPrefs): Prefs {
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
  if (p.scale && SCALES.includes(p.scale)) out.scale = p.scale;
  else if (typeof p.zoom === "number") {
    /* the retired page-zoom pref rides on as scale — the saved
       0.9 / 1 / 1.15 / 1.3 read straight onto S / M / L / XL, so an
       updater never watches their chosen size jump to a random rung.
       Hand-edited off-step values fall back to M with the rest. */
    const heir = (Object.entries(SCALE_VALUE) as [ScaleId, number][]).find(
      ([, v]) => v === p.zoom,
    );
    if (heir) out.scale = heir[0];
  }
  if (typeof p.specHeight === "number" && Number.isFinite(p.specHeight))
    out.specHeight = Math.min(SPEC_H_MAX, Math.max(SPEC_H_MIN, p.specHeight));
  if (
    p.specDensity === "compact" ||
    p.specDensity === "comfy" ||
    p.specDensity === "roomy"
  )
    out.specDensity = p.specDensity;
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
  root.dataset.scale = p.scale;
  /* the spec tray's private knobs — --spec-h is an inline style
     because a continuous drag fraction can't ride a data-attribute
     ladder; density maps onto a chip width in globals.css */
  root.style.setProperty("--spec-h", String(p.specHeight));
  root.dataset.specDensity = p.specDensity;
  /* the retired page zoom rode on html.style.zoom — sweep off any
     stale inline value an earlier app version left in this tab */
  root.style.removeProperty("zoom");
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

/* ————— the theme-anim window —————
   One helper for every surface that re-dresses the site (the topbar
   cycle, the panel's lab cards, accent swatches, reset). It used to
   be four copies of add-class + setTimeout, each with its own
   unmanaged timer — so a quick second tap kept the ease running but
   the FIRST timer still fired at its original 480ms and yanked the
   class off mid-flight, snapping every colour that was halfway
   eased. The singleton timer re-arms instead: each new call cancels
   the last removal, so the window always closes a full 480ms after
   the FINAL tap. Reduced-motion users skip the window entirely —
   the theme-anim rule's !important would otherwise override their
   0.01ms policy and force a 420ms ease they asked not to get. */
let animTimer: ReturnType<typeof setTimeout> | null = null;

export function flashThemeAnim() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  root.classList.add("theme-anim");
  if (animTimer) clearTimeout(animTimer);
  animTimer = setTimeout(() => {
    root.classList.remove("theme-anim");
    animTimer = null;
  }, 480);
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

/* ————— the theme chips —————
   Each theme's signature swatch — the background the nav button,
   the lab toast and the panel's lab cards put BEHIND the glyph, so
   the current room is readable at a glance. Fixed brand values on
   purpose: they do not flip with the active lab (that's the whole
   point — the chip says which room you're in). The glyph carries
   the family (sun for the daylight themes light & classic, moon for
   the night rooms night & dune); the chip names the room. */
export const THEME_CHIP: Record<Lab, { bg: string; ink: string; side: string }> = {
  light: {
    bg: "#FFD43B", // the daylight sun
    ink: "#5F4A00", // roast ink, the pen the sun is drawn with
    side: "#E8A100",
  },
  dark: {
    bg: "#2A4FA3", // navy — night
    ink: "#F4F1FB", // the night room's own ink
    side: "#1B3578",
  },
  dune: {
    bg: "#6B4A26", // chocolate — dune
    ink: "#FFE9C7", // warm sand
    side: "#4E3417",
  },
  classic: {
    // both rooms at once — the espresso / cream pair the notes step through
    bg: "linear-gradient(90deg, #2C2013 50%, #FDF6E3 50%)",
    ink: "#FFD43B", // unused by the rimmed glyph; kept for the record
    side: "#8F7A5C", // a roast that bridges both halves
  },
};
