"use client";

import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { WaterCanvas, type WaterParams } from "../shared/WaterCanvas";
import { WATER_ART_PORTAL_LIGHT } from "../shared/water.frag";
import { usePrefs } from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the water lab's page field — the fifth lab's signature.
   The daylight room's paper is the living caustic water: the shared
   WaterCanvas (the portal hero's program) running the water
   reference's own global-backdrop preset and device-pixel budgets,
   fixed behind the whole reader.

   It portals to <body> because the room-transition wrapper animates
   a transform — a fixed element under a transformed ancestor would
   take that box as its containing block and lose the viewport.
   Portaled to the body's last child at z-index -1 it paints above
   the page canvas (cream + dots) and below every content surface,
   exactly like body::before's ambient lamp does.

   The lag contract (handbook §17, the discipline §twilight runs):
   one canvas per page; it SLEEPS — shader-time tweens to 0 and the
   draw loop stops — while the reader's room walk (the opaque catalog
   between the wave shores) spans the whole viewport, and wakes when
   open water is back on stage. The OS reduced-motion setting and the
   panel's motion switch each freeze it to a single frame.
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

export function WaterBackdrop({
  gate,
}: {
  /** the reader's catalog walk — while this element's box spans the
      viewport, every painted pixel of the field is hidden behind
      opaque rooms and the field may sleep */
  gate: RefObject<HTMLDivElement | null>;
}) {
  const prefs = usePrefs();
  const osReduced = useReducedMotion();
  const reducedMotion = Boolean(osReduced) || !prefs.motion;
  const [covered, setCovered] = useState(false);
  const [risen, setRisen] = useState(false);

  /* the sleep gate — one observer on the catalog walk. Entries fire
     at the threshold crossings as it enters and leaves the viewport;
     each one re-reads the box: fully spanning the viewport (top past
     the top edge, bottom past the bottom edge) means the rooms have
     taken the whole stage. */
  useEffect(() => {
    const el = gate.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const r = entries[0]?.boundingClientRect;
        setCovered(
          Boolean(r && r.top <= 0 && r.bottom >= window.innerHeight),
        );
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [gate]);

  /* rise once, after the first paint has committed — two rAFs so the
     600ms opacity ease always has a painted 0 to start from */
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
        art={WATER_ART_PORTAL_LIGHT}
        imageAspect={1440 / 900}
        colorBack="#fff6ea"
        colorHighlight="#ff922b"
        theme="light"
        params={WATER_FIELD}
        budget={WATER_BUDGET}
        active={!covered}
        reducedMotion={reducedMotion}
        testId="water-theme-canvas"
        fallback={
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #fff6ea 0%, #ffeeda 55%, #ffcf96 100%)",
            }}
          />
        }
      />
    </div>,
    document.body,
  );
}
