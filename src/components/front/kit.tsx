"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/CustomEase";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · shared kit

   One small module every act reads:
     · ensureGsap() — registers the five plugins once and casts the
       two Material 3 easings (emphasized + emphasized-decelerate)
       as CustomEase curves, so every act moves with the same hand.
     · motionGate() — the saved knob or prefers-reduced-motion,
       read once and cached. When it says still, no GSAP ever runs
       and every act keeps its CSS default: the finished poster.
     · scrollState — a plain mutable object the shell's Lenis
       listener writes and the ticker band's lean reads.
     · useActAnim — a per-act gsap.context on a ref: cleanup on
       unmount is total (tweens, ScrollTriggers, SplitText), and a
       act's setup function may return its own extra cleanup.
     · bubbleField — the looping bubble columns three acts share.
     · smoothBlob / ellipsePath — the two SVG generators behind the
       Material 3 "cookie" shape and the electron orbits.
   ═══════════════════════════════════════════════════════════════ */

let registered = false;
export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, MotionPathPlugin, CustomEase);
  /* M3 emphasized — the standard curve for anything that moves on purpose */
  CustomEase.create("m3", "0.2,0,0,1");
  /* M3 emphasized-decelerate — entrances that arrive and settle */
  CustomEase.create("m3-dec", "0.05,0.7,0.1,1");
  registered = true;
}

let gateCache: boolean | null = null;
export function motionGate(): boolean {
  if (typeof window === "undefined") return false;
  if (gateCache === null) {
    let gate = true;
    try {
      const p = JSON.parse(
        localStorage.getItem("reaction-club-prefs-v1") || "null",
      );
      if (p && p.motion === false) gate = false;
    } catch {
      /* no prefs — the poster runs */
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      gate = false;
    gateCache = gate;
  }
  return gateCache;
}

export const scrollState = {
  /** raw Lenis velocity — written on every scroll event by the shell */
  vel: 0,
};

/* Each act mounts with its own context: everything it creates inside
   the setup — tweens, timelines, ScrollTriggers, SplitText — reverts
   on unmount. A setup may return one extra cleanup of its own (the
   finale hands back its pointer listeners this way). */
export function useActAnim<T extends HTMLElement>(
  motion: boolean,
  setup: () => void | (() => void),
  deps: unknown[] = [],
) {
  const root = useRef<T>(null);
  const setupRef = useRef<() => void | (() => void)>(() => {});
  /* keep the latest setup without touching refs during render —
     this layout effect is declared first, so on any commit where
     the consumer below re-runs, it reads the fresh closure */
  useLayoutEffect(() => {
    setupRef.current = setup;
  });
  useLayoutEffect(() => {
    if (!motion || !root.current) return;
    ensureGsap();
    const ctx = gsap.context(() => setupRef.current(), root);
    return () => ctx.revert();
  }, [motion, ...deps]);
  return root;
}

/* ————— the looping bubble field —————
   Spans rise from below the fold to well above the section, each on
   its own duration and phase (negative delays pre-populate the
   column so the field is already alive on first paint), plus a slow
   sideways sine so no two paths match. repeat: -1 — always. */
export function bubbleField(
  host: HTMLElement,
  count: number,
  tint: string,
  minSize = 10,
  maxSize = 54,
) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "m3-bubble";
    const size = minSize + Math.random() * (maxSize - minSize);
    b.style.width = `${size.toFixed(1)}px`;
    b.style.height = `${size.toFixed(1)}px`;
    b.style.left = `${(Math.random() * 96).toFixed(1)}%`;
    b.style.background = tint;
    b.style.opacity = (0.22 + Math.random() * 0.45).toFixed(2);
    host.appendChild(b);
    const dur = 8 + Math.random() * 10;
    gsap.fromTo(
      b,
      { y: "14vh" },
      {
        y: "-130vh",
        duration: dur,
        repeat: -1,
        ease: "none",
        delay: -Math.random() * dur,
      },
    );
    gsap.to(b, {
      x: `+=${(16 + Math.random() * 44).toFixed(0)}`,
      duration: 2.4 + Math.random() * 2.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }
}

/* ————— SVG generators ————— */

/* A closed, smooth scallop — the M3 "cookie" — as a quadratic spline
   through alternating radii. Used by the hero field and the loop rig. */
export function smoothBlob(
  cx: number,
  cy: number,
  r: number,
  lobes: number,
  depth: number,
): string {
  const n = lobes * 2;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * (1 - depth);
    pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
  }
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  const start = mid(pts[0], pts[1]);
  let d = `M ${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n];
    const m = mid(pts[i % n], pts[(i + 1) % n]);
    d += ` Q ${p[0].toFixed(2)} ${p[1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)}`;
  }
  return d + " Z";
}

/* A closed elliptical orbit as two arcs — the electron racecourse. */
export function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx},${cy} a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 ${-rx * 2},0`;
}

/* "H2SO4" → H<sub>2</sub>SO<sub>4</sub>: every run of digits drops
   into a real <sub>, so formulas typeset without needing glyph
   coverage for Unicode subscript characters. */
export function Formula({ f }: { f: string }) {
  const parts = f.split(/(\d+)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\d+$/.test(p) ? <sub key={i}>{p}</sub> : <span key={i}>{p}</span>,
      )}
    </>
  );
}
