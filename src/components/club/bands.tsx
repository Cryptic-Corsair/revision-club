"use client";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · band kit — the rotating room palette and the one
   spec chip that wears it. Shared by the note reader (waves, room
   backgrounds, in-page contents card) and the nav's Spec Map
   window, so a stop is dressed identically wherever it appears.
   ═══════════════════════════════════════════════════════════════ */

import { m, type HTMLMotionProps, type Variants } from "framer-motion";
import { Footprints } from "./icons";
import type { SpecSection } from "@/lib/spectra/notes-types";
import { readableInk, shade } from "./bits";
import { ACCENTS, ACCENT_IDS, currentAccents, currentIface } from "@/lib/spectra/prefs";

/* The canonical mineral palette. Customize narrows the sequence
   to the user's selected colours; helpers rotate those picks in
   fixed palette order. */
export const BANDS = ACCENTS.map((a) => a.hex);

/* the wave shelf — a shelf of hand-drawn seam curves, so a page can
   put a differently-shaped wave at every section boundary and never
   repeat itself twice in a row. Wave 0 is the original reader curve;
   the footer's cream→cocoa seam and every note band still wear it. */
export const WAVES = [
  "M0,52 C160,92 340,8 540,30 C740,52 900,96 1100,68 C1260,46 1370,22 1440,40 L1440,90 L0,90 Z",
  "M0,34 C220,72 460,76 720,50 C980,24 1220,20 1440,46 L1440,90 L0,90 Z",
  "M0,48 C160,10 320,10 480,42 C640,74 800,74 960,42 C1120,10 1280,10 1440,38 L1440,90 L0,90 Z",
  "M0,60 C190,82 350,26 560,30 C770,34 870,86 1080,72 C1250,60 1350,32 1440,40 L1440,90 L0,90 Z",
  "M0,40 C130,62 250,68 410,58 C570,48 650,16 830,22 C1010,28 1090,72 1250,68 C1330,64 1395,50 1440,44 L1440,90 L0,90 Z",
];

export const WAVE_D = WAVES[0];

export function BandWave({
  from,
  to,
  wave = 0,
  className,
}: {
  from: string;
  to: string;
  wave?: number;
  className?: string;
}) {
  return (
    /* pulled 1px into both neighbours: every junction here is a
       same-colour handshake, and on high-DPI phones the rounding
       between two stacked solids can open a sub-pixel sliver that
       lets the page background shine through as a bright hairline.
       The overlap paints solid-on-solid, so no seam can ever open. */
    <div aria-hidden className="relative -mt-px -mb-px" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block w-full ${className ?? "h-[calc(46px*var(--ui-scale))] sm:h-[calc(68px*var(--ui-scale))]"}`}
      >
        {/* fill rides on style so var() strings with fallbacks resolve */}
        <path d={WAVES[wave % WAVES.length]} style={{ fill: to }} />
      </svg>
    </div>
  );
}

/* Pull an accent toward the current ink for small labels and rules. */
export const inkMix = (main: string, pct = 45) =>
  `color-mix(in oklab, ${main} ${pct}%, var(--color-ink))`;

/* Editorial keeps its restrained mineral marker. Rooms has its own
   six-colour sequence, driven by the existing Customize selection. */
export const accentOf = (_i: number) => "#B8874B";

export const roomAccentOf = (i: number) => {
  const selected = currentAccents();
  const id = selected[i % selected.length] ?? ACCENT_IDS[0];
  return ACCENTS.find((a) => a.id === id)?.hex ?? ACCENTS[0].hex;
};

/* Daylight bands carry only a low-strength wash of their accent.
   Dark, Dune and Classic keep their established neutral surface
   ladders; colour remains in labels and learning details. */
export const roomBandOf = (i: number) =>
  `color-mix(in oklab, ${roomAccentOf(i)} var(--band-mix, 9%), var(--tint-base))`;
export const roomBgOf = (i: number) =>
  i % 2 === 1
    ? `var(--note-band-b, ${roomBandOf(i)})`
    : `var(--note-band-a, ${roomBandOf(i)})`;

export const bandOf = (i: number) =>
  `color-mix(in oklab, ${accentOf(i)} var(--band-mix, 10%), var(--tint-base))`;
export const bgOf = (i: number) =>
  i % 2 === 1
    ? `var(--note-band-b, ${bandOf(i)})`
    : `var(--note-band-a, ${bandOf(i)})`;

/* home's ladder keeps its own four stops on the full wheel
   (tangerine → sun → grape → coral) so the default daylight walk
   stays exactly as designed; a narrowed wheel rotates consecutively
   instead, so even two picks still alternate step over step */
const HOME_STOPS = [1, 2, 4, 0];
export const homeBandOf = (pos: number) =>
  bandOf(
    currentAccents().length === ACCENT_IDS.length
      ? HOME_STOPS[pos % HOME_STOPS.length]
      : pos,
  );

/* stagger choreography for the Spec Map window's chips */
export const chipV: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
};

/* one spec chip — shared by the note's own contents card and the
   floating Spec Map window, so both wear the exact same colours:
   band-tinted by default, candy-splashed + footprints when it's
   the section you're standing in */
export function SpecChip({
  s,
  i,
  here,
  ...rest
}: { s: SpecSection; i: number; here: boolean } & HTMLMotionProps<"button">) {
  const rooms = currentIface() === "rooms";
  const accent = rooms ? roomAccentOf(i) : accentOf(i);
  const band = rooms ? roomBgOf(i) : bgOf(i);
  return (
    <m.button
      type="button"
      data-here={here ? "1" : undefined}
      aria-current={here ? "true" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex cursor-pointer items-center gap-2 rounded-[calc(18px*var(--ui-scale))] px-3 py-2.5 text-left"
      style={
        here
          ? {
              background: accent,
              color: readableInk(accent),
              boxShadow: `0 3px 0 ${shade(accent)}`,
              rotate: "-1deg",
            }
          : { background: band, boxShadow: "0 2px 0 var(--edge)" }
      }
      {...rest}
    >
      <span
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full font-display text-[calc(10.5px*var(--ui-scale))] font-bold"
        style={
          here
            ? {
                background: "rgb(255 255 255 / 0.28)",
                color: readableInk(accent),
              }
            : { background: accent, color: readableInk(accent) }
        }
      >
        {s.spec}
      </span>
      <span
        className={`line-clamp-2 text-[calc(12px*var(--ui-scale))] font-bold leading-[1.35]${here ? "" : " text-ink"}`}
      >
        {s.title}
      </span>
      {here && (
        <Footprints className="ml-auto h-3.5 w-3.5 shrink-0 opacity-80" />
      )}
    </m.button>
  );
}
