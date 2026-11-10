/* ═══════════════════════════════════════════════════════════════
   THE FILM · shared stage state

   One plain mutable object, imported by the ScrollTrigger scrub
   (which writes it) and by the WebGL ticker (which reads it).
   No React state, no re-renders, no event buses — the hottest
   per-frame channel in the whole film is a couple of number
   writes that cost nothing.

   STAGES (uStage drives the particle morphs):
     0 nebula     — the prologue: a slow spiral of raw matter
     1 atom       — chapter I: nucleus + three tilted orbitals
     2 benzene    — chapter II: the ring, C₆H₆, π clouds above/below
     3 energy     — chapter III: the reaction coordinate, exothermic
     4 helix      — chapter IV: carbon chains braided into life
     5 starfield  — the atlas: the cast disperses, the map rises
   ═══════════════════════════════════════════════════════════════ */

export const LAST_STAGE = 5;

export const stage = {
  /** written by the scrubbed chapter timelines (0 → 5) */
  target: 0,
  /** critically-damped chase of target — eased in the ticker */
  current: 0,
  /** chapter III's exothermic flash, 0 → 1 → 0, scrub-driven */
  energy: 0,
  /** smoothed pointer, −1…1, for camera parallax */
  pointerX: 0,
  pointerY: 0,
  /** true once the pointer has moved (mouse-only parallax) */
  pointerOn: false,
  /** master motion gate — the saved motion knob or reduced-motion */
  motion: true,
  /** the reader is open — the canvas sleeps */
  reading: false,
  /** 0 → 1 load-in: the whole cloud condenses from a scatter */
  intro: 0,
};

/** pin starts, registered by the story's ScrollTriggers so the rail
    can glide to chapters without re-measuring anything */
export const filmScroll = {
  starts: [0, 0, 0, 0] as number[],
  atlas: 0,
};

/** palette per stage — [deep tone, bright tone] pairs the CPU lerps
    by stage fraction; per-particle aSeed.y mixes between the two */
export const PALETTE: [string, string][] = [
  ["#6A5BFF", "#FF7AD9"], // nebula — violet / magenta
  ["#3ED2FF", "#9DB4FF"], // atom — cyan / periwinkle
  ["#FFAA4D", "#FFE08A"], // benzene — amber / gold
  ["#FF5C47", "#FFC94D"], // energy — ember / hot gold
  ["#35D08F", "#6BE8D2"], // helix — emerald / sea-glass
  ["#C9BFA8", "#8FA8BE"], // starfield — champagne / steel
];

/** per-stage wobble amplitude (world units) — molecules hold their
    shape almost still, the nebula and the starfield drift more */
export const WOBBLE = [0.055, 0.03, 0.022, 0.022, 0.028, 0.05];

export const CHAPTERS = [
  { n: "I", key: "atoms", label: "Atoms" },
  { n: "II", key: "bonds", label: "Bonds" },
  { n: "III", key: "energy", label: "Energy" },
  { n: "IV", key: "life", label: "Life" },
] as const;
