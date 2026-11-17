"use client";

import { useSyncExternalStore } from "react";
import { DARK_MOOD_COUNT, pickDarkMood } from "./dark-mood";
import { DEFAULT_WASH, WASH_IDS, type WashId } from "./washes";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · site preferences
   The knobs behind the customize panel: lab (light/dark/dune/
   classic), the interface (cards/document/water — the third in
   rollout), the water interface's wash, the accent wheel, content
   scale, heading & body fonts, polka dots, decorative motion.

   localStorage · key "reaction-club-prefs-v1"
   Every change runs through applyPrefs() — one function that paints
   the classes and datasets onto <html>, so the whole site re-skins
   at once and the mobile address bar keeps up.
   ═══════════════════════════════════════════════════════════════ */

export type Lab = "light" | "dark" | "dune" | "classic" | "pistachio";
export type HeadFont = "fredoka" | "baloo" | "patrick" | "fraunces" | "figtree";
export type BodyFont = "nunito" | "quicksand" | "figtree";

/* the site's interfaces — same notes, three dresses.
   "gallery" is the white-wall dress — quiet grounds, one accent,
   oversized numerals — and the site's front door: every fresh visit
   lands here. "editorial" is the document room the disclaimer page
   wears (hero, rails, numbered clauses). "water" is the third dress,
   IN ROLLOUT: the note read over the living caustic water field,
   every spec section a glass room on the sea — ledged to Topic 1
   (WATER_DOCS below; walked one document at a time exactly like the
   gallery was). The band-walked rooms dress they both grew out of
   has been retired outright — a saved "rooms" reads as the gallery,
   its heir. The axis is almost independent of the labs: every lab
   re-tints the two settled interfaces — except classic, the
   gallery's house lab, which the document room doesn't offer (see
   labOrderFor and sanitize). The water dress is the exception to the
   axis in the other direction: it carries its OWN colour system (the
   wash, lib/spectra/washes.ts) instead of the labs' tokens — the
   chrome around the reader stays lab-dressed, the reading rooms wear
   the wash. The homepage keeps its own dress always. */
export type Iface = "editorial" | "gallery" | "water";
export const IFACE_LABEL: Record<Iface, string> = {
  gallery: "Cards",
  editorial: "Document",
  water: "Water",
};
export const IFACE_DESCRIPTION: Record<Iface, string> = {
  gallery: "Card-style reader — every note, spec by spec",
  editorial: "Document-style reader — numbered sections & rails",
  water: "Glass rooms over living water — Topic 1, in rollout",
};
/* the settled dresses the pickers always offer; the water dress is
   appended at the call sites while its rollout ledger has a doc on
   stage (waterServes) — offered exactly where it can be served */
export const IFACE_ORDER: Iface[] = ["gallery", "editorial"];

/* ————— the gallery's rollout ledger —————
   A doc id here means the gallery reader may serve it. The dress
   walked the library one note at a time — Topic 9 (wch12-t09) was
   the pilot, the proof ran doc by doc, and the ledger now carries
   the whole shelf: every class note and every practical note reads
   in the gallery. The gate stays (explicitly, not a wildcard) so a
   future doc — Topic 3's ionic half among them — lands on the
   editorial floor first and joins the gallery only when it is cut
   for the dress. */
export const GALLERY_DOCS: ReadonlySet<string> = new Set([
  /* Unit 1 · WCH11 — the class notes */
  "wch11-t01",
  "wch11-t02",
  "wch11-t03",
  "wch11-t04",
  "wch11-t05",
  /* Unit 2 · WCH12 — the class notes */
  "wch12-t06",
  "wch12-t07",
  "wch12-t08",
  "wch12-t09",
  "wch12-t10",
  /* Unit 3 · WCH13 — the practical notes */
  "wch13-p01",
  "wch13-p02",
  "wch13-p04",
  "wch13-p05",
  "wch13-p06",
  "wch13-p07",
  "wch13-p08",
  "wch13-p09",
]);

/* ————— the water interface's rollout ledger —————
   The water dress walked the library one note at a time exactly like
   the gallery did. A doc id here means the water READER may serve
   it: while the visitor wears the water interface, a ledgered doc
   opens as the transparent-rooms-over-water reader
   (club/notes-water.tsx), and the customize panel offers the Water
   interface card while a ledgered doc is on stage. Everywhere else a saved "water" displays
   as the gallery (its heir) through applyPrefs's data-iface painting
   and the panel's worn check — the save keeping Water, so returning
   to a ledgered doc puts the sea straight back. Topic 1 (wch11-t01)
   is the pilot; widening the ledger widens the interface. */
export const WATER_DOCS: ReadonlySet<string> = new Set([
  /* Unit 1 · WCH11 — the pilot */
  "wch11-t01",
]);

/* whether the water interface is SERVED for this doc — the one
   formula the shell (reader pick + panel's offer), the pickers and
   the tests read. One day the ledger widens; nothing else changes. */
export function waterServes(docId: string): boolean {
  return WATER_DOCS.has(docId);
}

/* the candy wheel the site's sections take turns wearing. The full
   shelf by default; the customize panel narrows it to your picks —
   one pick dresses every section, two alternate, three+ rotate.
   Order is fixed (hue-wheel) so alternation is predictable no
   matter which subset is on. */
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
   fixed surface. Scale instead feeds --ui-knob (see globals.css),
   which composes with a gentle viewport --ui-grow into --ui-scale:
   the interface CHROME — spacing, chips, component sizes — multiplies
   with the product. The rung's effect on TEXT runs through the
   canonical type state below: picking a rung is a PRESET WRITE (it
   replaces all five role factors with its vector), not a multiplier.
   The FACTORY default is screen-aware — M on phones, L on small
   tablets (≥640px), XL on tablets (≥768px) and every laptop/desktop —
   set in load() below and mirrored by the pre-paint script in
   layout.tsx (the two must agree or the first paint re-flows). A
   saved rung always wins over the factory default. The spec map pins
   the composed text vars back to 1 and stays pixel-identical; every
   other surface rides it. */
export const SCALES = ["S", "M", "L", "XL"] as const;
export type ScaleId = (typeof SCALES)[number];
export const SCALE_VALUE: Record<ScaleId, number> = {
  S: 0.9,
  M: 1,
  L: 1.2,
  XL: 1.5,
};

/* advanced type roles — the CANONICAL text state. prefs.type holds
   five absolute factors: each role's size as a multiple of the
   M-rung baseline (body 100% = 16.5px × the viewport grow). The
   customize panel has TWO EDITORS over this one state: the Text-size
   rung, whose pick REPLACES all five factors with its preset vector
   (so switching L→XL visibly moves the sliders to 150% — that is the
   synchronization), and the Advanced sliders, which edit single
   factors. sanitize() keeps the rung label in step with the state:
   a vector matching a preset relights that rung, anything else reads
   as a Custom mix. Rendering composes in CSS (globals.css): every
   font-size declaration answers to --ts-X = grow × factor — the
   viewport growth is the site's screen refinement, not a user
   choice — and the display headings answer to off-preset ratios
   (--tch / --tch-ed) so presets render exactly the designed values.
   Roles: headings (section titles, display words), sub (card titles,
   h3/h4), body (paragraphs, notes text), other (micro, kickers,
   chips, labels) and width (the reading measure — the gallery's
   content column and the editorial prose). Values are clamped on the
   way in — and mirrored by the pre-paint script in layout.tsx, which
   must agree with these limits or the first paint re-flows. */
export interface TypePrefs {
  headings: number;
  sub: number;
  body: number;
  other: number;
  width: number;
}

/* the M preset vector — also the "standard text" the Advanced
   section's reset chip returns to */
export const DEFAULT_TYPE_PREFS: TypePrefs = {
  headings: 1,
  sub: 1,
  body: 1,
  other: 1,
  width: 1,
};

/* the preset vectors — a rung pick writes its factor into all five
   roles at once (uniformVector), and matchPreset reads the state back
   to light the rung row (or Custom). Epsilon absorbs slider-step
   noise: the sliders land on a 0.05 grid, presets are 0.9/1/1.2/1.5,
   all on it. */
export const PRESET_EPSILON = 0.005;

export const uniformVector = (k: number): TypePrefs => ({
  headings: k,
  sub: k,
  body: k,
  other: k,
  width: k,
});

export function matchPreset(t: TypePrefs): ScaleId | null {
  const roles = Object.keys(DEFAULT_TYPE_PREFS) as (keyof TypePrefs)[];
  for (const s of SCALES) {
    const k = SCALE_VALUE[s];
    if (roles.every((r) => Math.abs(t[r] - k) <= PRESET_EPSILON)) return s;
  }
  return null;
}

/* the ceiling must hold every preset vector (XL writes 1.5) plus
   headroom above it: 80–160% is the slider's range, XL's own vector
   included. The overflow battery keeps the headroom honest. */
const TYPE_LIMITS: Record<keyof TypePrefs, [number, number]> = {
  headings: [0.8, 1.6],
  sub: [0.8, 1.6],
  body: [0.8, 1.6],
  other: [0.8, 1.6],
  width: [0.8, 1.6],
};

/* the RAW CSS vars the factors land on (globals.css composes them
   into --ts-* and the --tch / --tch-ed ratios): applyPrefs and the
   pre-paint script write plain numbers — no conditionals anywhere,
   presets and custom mixes render through the same formula. */
export const TYPE_ROLE_VARS: Record<keyof TypePrefs, string> = {
  headings: "--type-heading",
  sub: "--type-sub",
  body: "--type-body",
  other: "--type-other",
  width: "--type-width",
};

function sanitizeType(v: unknown, fallback: TypePrefs): TypePrefs {
  const out = { ...fallback };
  if (v && typeof v === "object") {
    const rec = v as Record<string, unknown>;
    for (const k of Object.keys(DEFAULT_TYPE_PREFS) as (keyof TypePrefs)[]) {
      const n = rec[k];
      if (typeof n === "number" && Number.isFinite(n)) {
        const [lo, hi] = TYPE_LIMITS[k];
        out[k] = Math.min(hi, Math.max(lo, n));
      }
    }
  }
  return out;
}

/* the retired page-zoom pref saved raw numbers. They map onto rungs
   by their OLD values — kept as an explicit list, NOT read back from
   SCALE_VALUE, so bumping a rung never orphans a save: a zoom of
   1.15 still lands on L even though L now rides 1.2. Keep in step
   with the pre-paint script in layout.tsx. */
const LEGACY_ZOOM: [number, ScaleId][] = [
  [0.9, "S"],
  [1, "M"],
  [1.15, "L"],
  [1.3, "XL"],
];

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
  /** which interface dresses the reader pages — "gallery" (the
      default, served on its rollout docs) | "editorial" | "water"
      (the transparent-rooms-over-water dress, ledged to WATER_DOCS) */
  iface: Iface;
  /** the water interface's wash — the field's colour system (see
      lib/spectra/washes.ts). Lagoon is the factory wash; the panel's
      "Water colour" section swaps it. Only meaningful while the
      water dress is worn, but kept like any pick: the wash a visitor
      chose is theirs when the dress comes back on. */
  wash: WashId;
  /** the accent wheel — which candies the sections rotate through */
  accents: AccentId[];
  /** content scale — S/M/L/XL (multiplies --ui-scale) */
  scale: ScaleId;
  /** the canonical text state — five absolute per-role factors (see
      TypePrefs above). The Text-size rung writes preset vectors into
      it; the Advanced sliders edit single factors; sanitize() keeps
      the rung label in sync with the vector. Applied as raw --type-*
      vars plus --preset-k; CSS composes the rest. */
  type: TypePrefs;
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
  /** the night lab's palette index (0–3) — CACHED, not calendared.
      Stamped into the save when the visitor picks Night (and at
      load() for older saves that predate the field), then it never
      moves on its own: the sky they last saw is the sky that keeps
      rendering until they change the theme again — a re-selection
      of Night stamps a fresh mood. Absent on brand-new saves until
      a dark pick stamps it; consumers fall back to today's pick so
      a save from before this field renders the same shade it
      always did on its stamping day. */
  mood?: number;
}

export const DEFAULT_PREFS: Prefs = {
  /* the factory setting lands new visitors in the espresso-and-
     parchment lab and the white-wall dress — classic is the house
     look, the gallery (Cards) the site's front door. Anyone who has
     picked a lab or a dress keeps theirs; this is only the factory
     setting. */
  theme: "classic",
  iface: "gallery",
  wash: DEFAULT_WASH,
  accents: [...ACCENT_IDS],
  /* the module default is Medium; load() lifts a FIRST RUN to the
     screen-aware factory rung (M phone / L small tablet / XL tablet
     and up) — see the first-run branch below */
  scale: "M",
  type: DEFAULT_TYPE_PREFS,
  specHeight: 0.8,
  specDensity: "roomy",
  headFont: "fredoka",
  bodyFont: "quicksand",
  dots: true,
  motion: true,
};

const KEY = "reaction-club-prefs-v1";

let state: Prefs = DEFAULT_PREFS;
let hydrated = false;
const listeners = new Set<() => void>();

/** what sanitize reads: today's prefs, plus the retired zoom number
    that older saves carry (mapped onto scale below), plus the storage
    schema version. */
type StoredPrefs = Partial<Prefs> & { zoom?: unknown; v?: unknown };

/* storage schema version — v3 introduced the canonical type state
   (absolute per-role factors + preset vectors). Saves without this
   marker migrate through the legacy path in sanitize(): v1 had no
   type field at all; v2 marked untuned roles with 1 meaning "ride
   the rung". Both migrate so the rung the save was riding becomes
   those roles' factor — a returning visitor's rendering is preserved
   exactly (an XL ride-along save MUST become the 1.5 vector, not be
   normalized down to M). Bumping this means updating the pre-paint
   script in layout.tsx in the same commit. */
const PREFS_VERSION = 3;

/* the night wardrobe's range guard — any finite number lands on a
   valid mood index (0–DARK_MOOD_COUNT-1) */
function clampMood(m: number): number {
  return ((Math.floor(m) % DARK_MOOD_COUNT) + DARK_MOOD_COUNT) % DARK_MOOD_COUNT;
}

function sanitize(p: StoredPrefs): Prefs {
  const out: Prefs = { ...DEFAULT_PREFS };
  if (
    p.theme === "light" ||
    p.theme === "dark" ||
    p.theme === "dune" ||
    p.theme === "classic" ||
    p.theme === "pistachio"
  )
    out.theme = p.theme;
  else if (p.theme === "hybrid")
    /* the retired third lab rides on as classic — its heir */
    out.theme = "classic";
  if (p.iface === "editorial" || p.iface === "gallery" || p.iface === "water")
    out.iface = p.iface;
  /* a saved "water" iface is the pilot dress — displayed as the
     gallery (its heir) wherever the ledger doesn't serve it; see
     applyPrefs and the panel's worn check. The save is never
     rewritten. */
  if (typeof p.wash === "string" && WASH_IDS.has(p.wash))
    out.wash = p.wash as WashId;
  /* classic is the gallery's house lab — the document room doesn't
     wear it. A saved editorial+classic DISPLAYS as Light (the
     nearest daylight lab) through effectiveLab(), but the stored
     theme is never rewritten: the lab a visitor picked is theirs
     until they pick a different one. The pre-paint script in
     layout.tsx applies the same display coercion — the two must
     agree or the first paint re-flows after hydration. Switching
     back to Cards puts their Classic straight back on, no re-pick
     needed. (This used to coerce the SAVE itself — opening the
     Document reader silently deleted a Classic pick.) */
  /* the retired rooms dress rides on as the gallery — a saved
     "rooms" (or anything unrecognisable) falls to the default,
     which is the gallery itself */
  if (p.scale && SCALES.includes(p.scale)) out.scale = p.scale;
  else if (typeof p.zoom === "number") {
    /* the retired page-zoom pref rides on as scale — see LEGACY_ZOOM
       above: an updater never watches their chosen size jump to a
       random rung. Hand-edited off-step values fall back to M. */
    const heir = LEGACY_ZOOM.find(([v]) => v === p.zoom);
    if (heir) out.scale = heir[1];
  }
  /* the type roles — canonical absolute factors, versioned. v3 saves
     carry them as-is (junk fields fall back to the rung's own
     factor); older saves migrate (see PREFS_VERSION above): a factor
     of 1 meant "ride the rung", so those roles take the rung's
     factor; a save with no type field rides entirely. The result is
     then matched against the preset vectors — an exact match
     relights that rung, so the label follows the state, never the
     other way round. */
  const k = SCALE_VALUE[out.scale];
  if (p.v === PREFS_VERSION) {
    out.type = sanitizeType(p.type, uniformVector(k));
  } else if (p.type && typeof p.type === "object") {
    const legacy = sanitizeType(p.type, uniformVector(1));
    for (const r of Object.keys(DEFAULT_TYPE_PREFS) as (keyof TypePrefs)[])
      if (Math.abs(legacy[r] - 1) <= PRESET_EPSILON) legacy[r] = k;
    out.type = legacy;
  } else {
    out.type = uniformVector(k);
  }
  const matched = matchPreset(out.type);
  if (matched) out.scale = matched;
  if (typeof p.specHeight === "number" && Number.isFinite(p.specHeight))
    out.specHeight = Math.min(SPEC_H_MAX, Math.max(SPEC_H_MIN, p.specHeight));
  if (
    p.specDensity === "compact" ||
    p.specDensity === "comfy" ||
    p.specDensity === "roomy"
  )
    out.specDensity = p.specDensity;
  if (
    p.headFont === "fredoka" ||
    p.headFont === "baloo" ||
    p.headFont === "patrick" ||
    p.headFont === "fraunces" ||
    p.headFont === "figtree"
  )
    out.headFont = p.headFont;
  if (p.bodyFont === "nunito" || p.bodyFont === "quicksand" || p.bodyFont === "figtree")
    out.bodyFont = p.bodyFont;
  if (typeof p.dots === "boolean") out.dots = p.dots;
  if (typeof p.motion === "boolean") out.motion = p.motion;
  /* the cached night mood — clamped into the wardrobe range; junk
     reads as "not stamped yet" and today's pick applies instead */
  if (typeof p.mood === "number" && Number.isFinite(p.mood))
    out.mood = clampMood(p.mood);
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

/** the screen-aware factory rung — phones keep Medium, small tablets
    (≥640px CSS) start on Large, tablets (≥768px) and every
    laptop/desktop start on XL — reading distance, not device class,
    is what the type ladder answers to. Shared by load()'s first run
    and resetPrefs(); mirrored by the pre-paint script in layout.tsx
    boundary for boundary. */
function factoryScale(): ScaleId {
  try {
    if (window.innerWidth >= 768) return "XL";
    if (window.innerWidth >= 640) return "L";
  } catch {
    /* no innerWidth — keep Medium */
  }
  return "M";
}

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      state = sanitize(JSON.parse(raw));
      /* the mood cache's migration stamp — a Night visitor whose
         save predates the field gets today's pick written in, so
         the sky they are looking at right now is the one that
         keeps rendering from here on. One write, on the first load
         that notices; every later load reads the cached mood. */
      if (state.theme === "dark" && typeof state.mood !== "number") {
        state = { ...state, mood: pickDarkMood() };
        persist();
      }
    } else {
      /* first run — honour the old theme key if it's there.
         A stored "hybrid" (the retired third lab) reads as classic,
         its direct heir; everything else starts on the default. */
      const legacy = window.localStorage.getItem("rc-theme");
      if (legacy === "dark")
        state = { ...state, theme: "dark", mood: pickDarkMood() };
      /* the screen-aware factory rung AND its type vector — the
         sliders read the preset the visitor starts on. Only a
         factory setting: the first rung you pick yourself is kept
         for keeps. Mirrored by the pre-paint script in layout.tsx —
         the two must agree or the first paint re-flows. */
      const fs = factoryScale();
      state = { ...state, scale: fs, type: uniformVector(SCALE_VALUE[fs]) };
    }
  } catch {
    /* private mode / corrupt data — defaults */
  }
}

function persist() {
  try {
    /* the schema version rides IN the payload — sanitize() routes on
       it (v3 canonical vs the legacy migration path) */
    window.localStorage.setItem(KEY, JSON.stringify({ ...state, v: PREFS_VERSION }));
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
  /* the lab the page wears — the display lab (a saved editorial+
     classic wears light here while the save keeps classic; see
     effectiveLab). The two night rooms both wear .dark — every
     dark: utility in the wardrobe keys off it — and the dune lab
     re-tints the tokens on top with .dune */
  const lab = effectiveLab(p);
  root.classList.toggle("dark", lab === "dark" || lab === "dune");
  root.classList.toggle("dune", lab === "dune");
  root.classList.toggle("classic", lab === "classic");
  root.classList.toggle("pistachio", lab === "pistachio");
  /* the interface axis — CSS may micro-dress chrome off
     html[data-iface="editorial"]; the component twins read the pref
     from the store, not the dataset. The water dress paints the
     gallery's dataset everywhere (the display coercion — its heir):
     the gallery-chrome tokens (--iface-accent etc.) stay defined on
     the library/spec rooms it falls back to, and the water reader
     carries its own wash scope (club/notes-water.tsx), so nothing
     keys off data-iface="water" — which must never appear and leave
     a token undefined. */
  root.dataset.iface = p.iface === "water" ? "gallery" : p.iface;
  /* only the night lab wears the CACHED mood — the palette the
     visitor last saw, stamped at their last Night pick; not
     stamped yet (brand-new save) it falls back to today's pick,
     which load()/setPrefs() then write in. Dune's chocolate room
     is a fixed signature, and light & classic keep their daylight
     tokens. */
  if (lab === "dark")
    root.dataset.mood = String(
      typeof p.mood === "number" ? p.mood : pickDarkMood(),
    );
  else delete root.dataset.mood;
  root.dataset.head = p.headFont;
  root.dataset.body = p.bodyFont;
  root.dataset.dots = p.dots ? "on" : "off";
  root.dataset.motion = p.motion ? "on" : "off";
  root.dataset.scale = p.scale;
  /* the advanced type roles ride as inline vars the same way --spec-h
     does — continuous factors can't sit on a data-attribute ladder.
     Five RAW factors plus the preset scalar land on <html> as plain
     numbers; globals.css composes --ts-X = grow × factor for every
     font-size declaration, and the --tch / --tch-ed display-heading
     ratios off the same inputs. No conditionals here: the rung preset
     and the sliders are two editors over one state, and the CSS is
     the same formula for both. */
  for (const [key, cssVar] of Object.entries(TYPE_ROLE_VARS)) {
    root.style.setProperty(cssVar, String(p.type[key as keyof TypePrefs]));
  }
  root.style.setProperty("--preset-k", String(SCALE_VALUE[p.scale]));
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
  /* the version marker routes THIS patch through the canonical path —
     only load()'s raw storage read can take the legacy migration */
  const next = sanitize({ ...state, ...patch, v: PREFS_VERSION });
  const themeFlip = next.theme !== state.theme;
  /* the mood stamp — picking Night writes the sky they just chose
     into the save; re-picking Night is a fresh pick, so it stamps
     a fresh mood. An already-stamped save keeps its mood no matter
     what else changes (the calendar never rotates it). */
  if (next.theme === "dark" && (themeFlip || typeof next.mood !== "number"))
    next.mood = pickDarkMood();
  state = next;
  persist();
  applyPrefs(state);
  emit();
  return themeFlip;
}

export function resetPrefs() {
  load();
  /* back to the screen-aware factory — what a fresh visitor on THIS
     screen would see: the factory rung and its type vector */
  const fs = factoryScale();
  state = { ...DEFAULT_PREFS, scale: fs, type: uniformVector(SCALE_VALUE[fs]) };
  persist();
  applyPrefs(state);
  emit();
}

/* Theme and accent changes are applied atomically by setPrefs().
   Keep this path free of document-wide animation timers: local controls
   own their own transitions, while the browser paints the new token set
   in one style update. */

/* the wheel accentOf() reads while rendering (bands, chips, dots).
   Plain state, deliberately no load() — the hydration pass must
   paint the same default wheel the server did; the store's own
   subscribe → load → re-render carries the user's picks in right
   after commit, and every pick after that re-renders ClubApp, which
   re-runs every accentOf in the tree. */
export function currentAccents(): AccentId[] {
  return state.accents;
}

/** The lab the page actually WEARS. Classic is the Cards reader's
    house lab — the Document reader doesn't offer it — so a saved
    editorial+classic displays as Light, the nearest daylight lab.
    The stored theme is untouched: this is a display coercion only,
    mirrored by the pre-paint script in layout.tsx (the two must
    agree or the first paint re-flows). Everything that colours a
    decision from the active lab — accent helpers, theme chips, the
    pickers' selected state — reads THIS, not the raw pref, so the
    chrome always agrees with the classes on <html>.
    (The water dress used to be a lab here; it is an interface now —
    prefs.iface === "water", with its own wash colour system.) */
export function effectiveLab(p: Pick<Prefs, "theme" | "iface">): Lab {
  return p.iface === "editorial" && p.theme === "classic" ? "light" : p.theme;
}

/** The active lab for render-time, interface-scoped colour decisions. */
export function currentLab(): Lab {
  return effectiveLab(state);
}

/* ————— store plumbing ————— */

let storageBound = false;

function onStorage(e: StorageEvent) {
  if (e.key !== KEY && e.key !== null) return;
  state = DEFAULT_PREFS;
  hydrated = false;
  load();
  applyPrefs(state);
  emit();
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  /* ONE module-level storage listener behind the subscriber count —
     every usePrefs() consumer used to bind its own copy, so a
     cross-tab event ran the same reload+apply once per hook on the
     page. Same semantics, one pass. */
  if (!storageBound) {
    window.addEventListener("storage", onStorage);
    storageBound = true;
  }
  return () => {
    listeners.delete(cb);
    if (storageBound && listeners.size === 0) {
      window.removeEventListener("storage", onStorage);
      storageBound = false;
    }
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
  pistachio: "Pistachio",
};

export const LAB_ORDER: Lab[] = ["light", "dark", "dune", "classic", "pistachio"];

/* the labs a given interface offers. Classic is the Cards reader's
   house lab — espresso rooms cut for the white-wall dress — so the
   Document reader doesn't offer it: its theme cards list Light,
   Night and Dune only, and effectiveLab() displays a saved
   Document+classic as Light while the save keeps Classic for the
   Cards reader. Both theme pickers (the navbar dropdown and the
   customize panel) read their order from here. */
export function labOrderFor(iface: Iface): Lab[] {
  return iface === "editorial" ? LAB_ORDER.filter((l) => l !== "classic") : LAB_ORDER;
}

export const LAB_DESCRIPTION: Record<Lab, string> = {
  light: "Warm paper & daylight",
  dark: "Velvet dusk & lilac",
  dune: "Sandstone & amber",
  classic: "Espresso & parchment",
  pistachio: "Pistachio & plum orchard",
};

/* ————— the theme chips —————
   Each theme has a fixed signature swatch shared by the navbar and
   theme controls. The swatch identifies the room independently of
   the active page palette: daylight white · velvet plum · dune
   chocolate · classic parchment. */
export const THEME_CHIP: Record<Lab, { bg: string; ink: string; side: string }> = {
  light: {
    bg: "#FFFFFF", // the bright daylight page
    ink: "#3D2B1F", // the light room's own roast ink
    side: "#D8CBB8", // a warm shadow so white still reads on cream
  },
  dark: {
    // navy — the night sky the room is named for
    bg: "#493552",
    ink: "#F7ECFB", // soft moonlight
    side: "#2C2034",
  },
  dune: {
    bg: "#6B4A26", // chocolate — dune
    ink: "#FFE9C7", // warm sand
    side: "#4E3417",
  },
  classic: {
    // antique parchment-gold: a single warm surface, not a split
    // espresso/cream disc — the Classic identity stays in the ink.
    bg: "#D6C19A",
    ink: "#2C2013",
    side: "#A58B62",
  },
  pistachio: {
    // pistachio-kernel green — the meat of the orchard lab
    bg: "#A9B665",
    ink: "#2F3417",
    side: "#7F8C4D",
  },
};
