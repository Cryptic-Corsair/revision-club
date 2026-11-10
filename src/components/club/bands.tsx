"use client";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · band kit — the rotating section palette and the
   hand-drawn seam waves. Shared by the home page, the desk, the
   editorial twins and the gallery reader, so a section is dressed
   identically wherever it appears.
   ═══════════════════════════════════════════════════════════════ */

import { ACCENTS, ACCENT_IDS, currentAccents, currentLab } from "@/lib/spectra/prefs";

/* the candy wheel, hue-wheel order: red → orange → sun →
   green → purple → amber, so adjacent sections always differ. This
   is the whole shelf — the customize panel narrows it to your
   picks, and the helpers below rotate whatever's on: one pick
   dresses every section, two alternate, three+ cycle. */

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

/* A candy accent pulled toward the current ink: deep brick by day,
   warm salmon after dark, pale gold inside a cocoa room — one
   helper, readable in every lab, no dark: variants needed. */
export const inkMix = (main: string, pct = 45) =>
  `color-mix(in oklab, ${main} ${pct}%, var(--color-ink))`;

/* band helpers — pure, so every page dresses a section with the
   exact same colours */
/* every section borrows the next colour on the user's shelf (the
   customize panel's picks, full shelf by default), so a note is a
   walk around the hue wheel and no two neighbours ever dress alike.
   Dune keeps its scoped sand/sea-glass pair, and the mineral amber
   stays the chrome accent wherever a page wants one fixed brand
   tone. */
const DUNE_ACCENTS = ["#EFC98A", "#9DB9B0"] as const;
export const wheelAccentOf = (i: number) => {
  if (currentLab() === "dune") return DUNE_ACCENTS[i % DUNE_ACCENTS.length];
  const selected = currentAccents();
  const id = selected[i % selected.length] ?? ACCENT_IDS[0];
  return ACCENTS.find((a) => a.id === id)?.hex ?? ACCENTS[0].hex;
};
export const accentOf = (i: number) => wheelAccentOf(i);
/* The homepage keeps its existing independent mineral treatment;
   Dune's paired note accents belong only to its own walk. */
export const homeBandOf = (_pos: number) =>
  `color-mix(in oklab, #B8874B var(--band-mix, 10%), var(--tint-base))`;
