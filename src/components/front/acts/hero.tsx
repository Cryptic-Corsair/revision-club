"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitLine } from "../chars";
import CanvasField from "../canvas-field";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · chapter 00 — the hero

   Bikebear's device, distilled: one phrase looping over four rows —
   "EVERYTHING IS / PARTICLES." — solid and outline alternating,
   each row scrubbing its own way, every row spanning the viewport
   so the crop at the edges is a decision, not an accident. Behind
   the type, a shallow field of ink particles drifts (the
   particulate nature of matter, quietly).
   ═══════════════════════════════════════════════════════════════ */

const ROWS: {
  text: string;
  size: string;
  outline: boolean;
  dir: number;
}[] = [
  { text: "EVERYTHING IS", size: "fr-row-a", outline: false, dir: -1 },
  { text: "PARTICLES.", size: "fr-row-b", outline: true, dir: 1 },
  { text: "EVERYTHING IS", size: "fr-row-a", outline: true, dir: -1 },
  { text: "PARTICLES.", size: "fr-row-b", outline: false, dir: 1 },
];

export default function Hero({
  motion,
  ready,
  sleeping,
}: {
  motion: boolean;
  ready: boolean;
  sleeping: boolean;
}) {
  const root = useRef<HTMLElement>(null);

  /* ————— pre-hide the cast on mount, condense on ready ————— */
  useEffect(() => {
    if (!motion) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".l-char");
      gsap.set(chars, { yPercent: 112 });
      gsap.set([".fr-hero-kicker", ".fr-hero-side", ".fr-hero-cue"], {
        y: 18,
        opacity: 0,
      });
      if (!ready) return; /* the veil is still up — hold the cast */
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".fr-hero-kicker", { y: 0, opacity: 1, duration: 0.7 }, 0)
        .to(chars, {
          yPercent: 0,
          duration: 1.15,
          stagger: { each: 0.014, from: 0 },
        }, 0.08)
        .to(".fr-hero-side", { y: 0, opacity: 1, duration: 0.9 }, 0.55)
        .to(".fr-hero-cue", { opacity: 1, duration: 0.7 }, 0.9);
    }, el);
    return () => ctx.revert();
  }, [motion, ready]);

  /* ————— the rows drift apart as you scroll away ————— */
  useEffect(() => {
    if (!motion) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll<HTMLElement>(".fr-row-inner");
      rows.forEach((row, i) => {
        const dir = ROWS[i]?.dir ?? 1;
        gsap.fromTo(
          row,
          { xPercent: 0 },
          {
            xPercent: dir * 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, [motion]);

  return (
    <section ref={root} className="fr-hero" data-act="0" id="fr-hero">
      <CanvasField motion={motion} sleeping={sleeping} />

      <div className="fr-hero-body">
        <p className="fr-hero-kicker f-mono">
          IAL CHEM — a revision club for Edexcel IAL chemistry
        </p>

        <h1 className="fr-hero-stack" aria-label="Everything is particles.">
          {ROWS.map((r, i) => (
            <span key={i} className="fr-row">
              <span
                className={`fr-row-inner ${r.size} ${r.outline ? "l-outline" : ""}`}
              >
                <SplitLine text={r.text} />
              </span>
            </span>
          ))}
        </h1>

        <div className="fr-hero-side">
          <p className="fr-hero-lede">
            Five ideas, eighteen stations, the whole WCH11&nbsp;→&nbsp;WCH16
            spec written as class notes — and a front door that does the
            chemistry as you scroll.
          </p>
          <div className="fr-hero-ctas">
            <button
              type="button"
              data-cursor
              className="fr-btn fr-btn-solid"
              data-goto="1"
            >
              The five ideas
              <svg viewBox="0 0 12 12" aria-hidden>
                <path d="M6 1v10M2 7l4 4 4-4" />
              </svg>
            </button>
            <button
              type="button"
              data-cursor
              className="fr-btn fr-btn-line"
              data-goto="5"
            >
              The 18 stations
            </button>
          </div>
        </div>
      </div>

      <div className="fr-hero-cue" aria-hidden>
        <span className="f-mono">scroll — the page reacts</span>
        <span className="fr-cue-line" />
      </div>

      <div className="fr-hero-strip" aria-hidden>
        <div className="fr-marquee-track fr-strip-track">
          {[0, 1].map((k) => (
            <span key={k} className="fr-strip-seq f-mono">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i}>
                  EDEXCEL IAL&nbsp;·&nbsp;WCH11&nbsp;→&nbsp;WCH16&nbsp;·&nbsp;THE
                  2018 SPEC&nbsp;·&nbsp;READ IT ONCE, OWN IT&nbsp;·&nbsp;
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
