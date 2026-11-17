"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { WaterCanvas, type WaterParams } from "../shared/WaterCanvas";
import { svgDataUri } from "../shared/water.frag";
import { usePrefs } from "@/lib/spectra/prefs";
import type { Wash } from "@/lib/spectra/washes";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the water interface's field — the dress's living sea.
   The shared WaterCanvas (the portal hero's program) running the
   water reference's own global-backdrop preset and device-pixel
   budgets, fixed behind the WHOLE reader: the water interface's
   spec rooms are glass precisely so the field stays on stage for
   every section — there is no opaque stretch to sleep behind, so
   unlike the old lab pilot this field has no catalog gate; it runs
   whenever the reader is open and the page is visible.

   It portals to <body> because the room-transition wrapper animates
   a transform — a fixed element under a transformed ancestor would
   take that box as its containing block and lose the viewport.
   Portaled to the body's last child at z-index -1 it paints above
   the page canvas (cream + dots, which it covers) and below every
   content surface, exactly like body::before's ambient lamp does.

   The wash is the dress's colour system (lib/spectra/washes.ts):
   this component bakes the wash's gradient art into the texture the
   caustics refract and hands the shader its back/highlight pair. A
   wash change re-keys the canvas (textures bind once at init) — the
   new sea draws its first frame immediately, no blank beat.

   The lag contract (handbook §17, the discipline §twilight runs):
   one canvas per page; the OS reduced-motion setting and the panel's
   motion switch each freeze it to a single frame; WaterCanvas
   carries the visibility, page-hidden and context-loss gates, the
   30 fps accumulator and the pixel budgets.
   ═══════════════════════════════════════════════════════════════ */

/* the reference's global-water preset — the backdrop prop table
   twilight runs verbatim; layering drops to 0 on software renderers
   inside WaterCanvas */
const WATER_FIELD: WaterParams = {
  highlights: 0.52,
  layering: 0.34,
  edges: 0,
  caustic: 0.38,
  waves: 0.34,
  size: 0.72,
  speed: 0.24,
};

/* the reference's global-water budgets — the numbers twilight's
   whole-page field runs (NOT the hero's tightened 60k software
   rung: this field owns the page, and SwiftShader still clears it
   at 220k device pixels at its 11 fps accumulator cadence) */
const WATER_BUDGET = { software: 220_000, mobile: 260_000, desktop: 400_000 };

/* the wash's baked gradient art — the same four-layer structure the
   portal hero's wash uses (diagonal base, hue pocket upper right,
   secondary current lower left, light core), coloured by the wash.
   Deterministic per wash id, so re-renders reuse the string. */
const artCache = new Map<string, string>();
function washArt(wash: Wash): string {
  const hit = artCache.get(wash.id);
  if (hit) return hit;
  const a = wash.art;
  const uri = svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">` +
      `<defs>` +
      `<linearGradient id="wrBase" x1="0%" y1="0%" x2="100%" y2="100%">` +
      `<stop offset="0%" stop-color="${a.base[0]}"/><stop offset="52%" stop-color="${a.base[1]}"/><stop offset="100%" stop-color="${a.base[2]}"/>` +
      `</linearGradient>` +
      `<radialGradient id="wrPocket" cx="72%" cy="28%" r="56%">` +
      `<stop offset="0%" stop-color="${a.pocket}" stop-opacity="0.6"/><stop offset="38%" stop-color="${a.pocket}" stop-opacity="0.34"/><stop offset="72%" stop-color="${a.pocket}" stop-opacity="0.12"/><stop offset="100%" stop-color="${a.base[1]}" stop-opacity="0"/>` +
      `</radialGradient>` +
      `<radialGradient id="wrCurrent" cx="28%" cy="66%" r="58%">` +
      `<stop offset="0%" stop-color="${a.current}" stop-opacity="0.4"/><stop offset="46%" stop-color="${a.current}" stop-opacity="0.2"/><stop offset="100%" stop-color="${a.base[2]}" stop-opacity="0"/>` +
      `</radialGradient>` +
      `<radialGradient id="wrPearl" cx="50%" cy="46%" r="48%">` +
      `<stop offset="0%" stop-color="${a.pearl}" stop-opacity="0.5"/><stop offset="56%" stop-color="${a.pearl}" stop-opacity="0.22"/><stop offset="100%" stop-color="${a.base[1]}" stop-opacity="0"/>` +
      `</radialGradient>` +
      `</defs>` +
      `<rect width="1440" height="900" fill="url(#wrBase)"/>` +
      `<rect width="1440" height="900" fill="url(#wrCurrent)"/>` +
      `<rect width="1440" height="900" fill="url(#wrPocket)"/>` +
      `<rect width="1440" height="900" fill="url(#wrPearl)"/>` +
      `</svg>`,
  );
  artCache.set(wash.id, uri);
  return uri;
}

export function WaterBackdrop({ wash }: { wash: Wash }) {
  const prefs = usePrefs();
  const osReduced = useReducedMotion();
  const reducedMotion = Boolean(osReduced) || !prefs.motion;

  /* rise once, after the first paint has committed — two rAFs so the
     600ms opacity ease always has a painted 0 to start from */
  const [risen, setRisen] = useState(false);
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setRisen(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return createPortal(
    <div
      aria-hidden
      data-testid="water-theme-field"
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{ opacity: risen ? 1 : 0, transition: "opacity 600ms ease" }}
    >
      <WaterCanvas
        key={wash.id}
        art={washArt(wash)}
        imageAspect={1440 / 900}
        colorBack={wash.colorBack}
        colorHighlight={wash.colorHighlight}
        theme="light"
        params={WATER_FIELD}
        budget={WATER_BUDGET}
        active
        reducedMotion={reducedMotion}
        testId="water-theme-canvas"
        fallback={
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${wash.art.base[0]} 0%, ${wash.art.base[1]} 55%, ${wash.art.pocket} 100%)`,
            }}
          />
        }
      />
    </div>,
    document.body,
  );
}
