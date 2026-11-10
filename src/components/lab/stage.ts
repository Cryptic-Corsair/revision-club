/* ═══════════════════════════════════════════════════════════════
   THE LAB · shared stage state

   One plain mutable object. The scroll scrubbers write it, the
   Lenis scroll listener writes it, the pointer listeners write it,
   and the single WebGL ticker reads it. No React state rides this
   channel — the hottest per-frame path in the lab costs nothing.

   Six acts, six worlds, six ways to touch them:

     0 MATTER    — the iridescent orb; drag it, it spins with inertia
     1 THE CAST  — a wall of thirty-six real elements; hover them
     2 THE BOND  — two nuclei approach; a bridge of charge forms
     3 THE PRICE — an ember field; your scroll speed ignites it
     4 THE DANCE — an equilibrium field; your pointer warps it
     5 THE ATLAS — the syllabus as a metro line; click a station
   ═══════════════════════════════════════════════════════════════ */

export const ACT_COUNT = 6;

/** the per-act channel: the scrubber reports progress + its pin
    start; the lab records the start so the rail can glide.
    Writers must ignore refresh-time updates (isActive false) so
    scrolling never starts on someone else's act */
export type ActWriter = (self: {
  progress: number;
  start: number;
  isActive: boolean;
}) => void;

export const ACTS = [
  { key: "matter", label: "Matter" },
  { key: "cast", label: "The cast" },
  { key: "bond", label: "The bond" },
  { key: "price", label: "The price" },
  { key: "dance", label: "The dance" },
  { key: "atlas", label: "The atlas" },
] as const;

export const stage = {
  /** master motion gate — the saved knob or prefers-reduced-motion */
  motion: true,
  /** the reader is open — the canvas sleeps */
  reading: false,
  /** active act, 0…5 — written by the act scrubbers */
  act: 0,
  /** progress inside the active act, 0…1 — drives its choreography */
  actProg: 0,
  /** smoothed scroll velocity, normalised 0…1 — the fire's fuel */
  vel: 0,
  /** raw Lenis velocity, written on every scroll event */
  rawVel: 0,
  /** smoothed pointer, −1…1, for parallax and shader warps */
  pointerX: 0,
  pointerY: 0,
  /** pointer is down (dragging the orb) */
  pointerDown: false,
  /** 0 → 1 load-in: the first world condenses from the dark */
  intro: 0,
  /** which element tile is hovered, −1 none — written by the cast */
  hoverTile: -1,
};

/** pin start offsets, registered by the act scrubbers so the rail
    can glide without re-measuring anything */
export const actScroll = {
  starts: [0, 0, 0, 0, 0, 0] as number[],
};

/* ————— the palette —————
   one spectrum per act, read by the CPU and the shaders alike */
export const INK = {
  bg: "#050507",
  bone: "#F2F1EE",
  cyan: "#3ED2FF",
  amber: "#FFAA4D",
  ember: "#FF5C47",
  gold: "#FFC94D",
  emerald: "#35D08F",
  coral: "#FF6B6B",
  violet: "#C58BFF",
};

/** the thirty-six elements of the wall — Z=1…36, the ones the
    specification actually names, tinted by textbook category */
export type Element = {
  z: number;
  sym: string;
  name: string;
  cat: keyof typeof CAT_COLOR;
};

export const CAT_COLOR: Record<string, string> = {
  alkali: "#FF5C7A",
  alkaline: "#FF9A4D",
  transition: "#FFD64D",
  post: "#A8D96C",
  metalloid: "#4DDFC0",
  nonmetal: "#3ED2FF",
  halogen: "#7AB8FF",
  noble: "#C58BFF",
};

export const CAT_LABEL: Record<string, string> = {
  alkali: "Alkali metal",
  alkaline: "Alkaline earth",
  transition: "Transition metal",
  post: "Post-transition",
  metalloid: "Metalloid",
  nonmetal: "Non-metal",
  halogen: "Halogen",
  noble: "Noble gas",
};

const RAW: [string, string, string][] = [
  ["H", "Hydrogen", "nonmetal"],
  ["He", "Helium", "noble"],
  ["Li", "Lithium", "alkali"],
  ["Be", "Beryllium", "alkaline"],
  ["B", "Boron", "metalloid"],
  ["C", "Carbon", "nonmetal"],
  ["N", "Nitrogen", "nonmetal"],
  ["O", "Oxygen", "nonmetal"],
  ["F", "Fluorine", "halogen"],
  ["Ne", "Neon", "noble"],
  ["Na", "Sodium", "alkali"],
  ["Mg", "Magnesium", "alkaline"],
  ["Al", "Aluminium", "post"],
  ["Si", "Silicon", "metalloid"],
  ["P", "Phosphorus", "nonmetal"],
  ["S", "Sulfur", "nonmetal"],
  ["Cl", "Chlorine", "halogen"],
  ["Ar", "Argon", "noble"],
  ["K", "Potassium", "alkali"],
  ["Ca", "Calcium", "alkaline"],
  ["Sc", "Scandium", "transition"],
  ["Ti", "Titanium", "transition"],
  ["V", "Vanadium", "transition"],
  ["Cr", "Chromium", "transition"],
  ["Mn", "Manganese", "transition"],
  ["Fe", "Iron", "transition"],
  ["Co", "Cobalt", "transition"],
  ["Ni", "Nickel", "transition"],
  ["Cu", "Copper", "transition"],
  ["Zn", "Zinc", "transition"],
  ["Ga", "Gallium", "post"],
  ["Ge", "Germanium", "metalloid"],
  ["As", "Arsenic", "metalloid"],
  ["Se", "Selenium", "nonmetal"],
  ["Br", "Bromine", "halogen"],
  ["Kr", "Krypton", "noble"],
];

export const ELEMENTS: Element[] = RAW.map(([sym, name, cat], i) => ({
  z: i + 1,
  sym,
  name,
  cat,
}));
