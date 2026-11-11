"use client";

import gsap from "gsap";
import { TOTALS, UNITS } from "@/lib/spectra/units";

import { useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 05 — the facts

   Four numerals, four tonal containers, nothing else to read.
   Each chip pops in with its own settle rotation, the number
   counts up on entry, and then every chip breathes forever on a
   staggered yoyo. The whole row drifts slower than the scroll.
   The numbers are the live course totals, not copy.
   ═══════════════════════════════════════════════════════════════ */

const FACTS = [
  { n: UNITS.length, cap: "units", tone: "a" },
  { n: TOTALS.topics, cap: "topics", tone: "b" },
  { n: Math.round(TOTALS.minutes / 60), cap: "hours", tone: "c" },
  { n: TOTALS.examples, cap: "examples", tone: "d" },
];

export default function Stats({ motion }: { motion: boolean }) {
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    (q(".m3-stat") as HTMLElement[]).forEach((s, i) => {
      const num = s.querySelector<HTMLElement>(".m3-stat-num");
      const arrive = { trigger: s, start: "top 82%", once: true } as const;

      gsap.fromTo(
        s,
        { autoAlpha: 0, y: 52, scale: 0.92, rotation: i % 2 ? 4 : -4 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: i % 2 ? 1.5 : -1.5,
          duration: 0.85,
          ease: "m3-dec",
          delay: i * 0.08,
          scrollTrigger: arrive,
        },
      );

      if (num) {
        const to = Number(num.dataset.to || "0");
        const counter = { v: 0 };
        gsap.to(counter, {
          v: to,
          duration: 1.5,
          ease: "m3",
          delay: 0.25 + i * 0.08,
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v));
          },
          scrollTrigger: arrive,
        });
      }

      /* the breathe — after the landing, forever */
      gsap.to(s, {
        y: "+=8",
        duration: gsap.utils.random(3, 4.6),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.2 + i * 0.3,
      });
    });

    /* the row trails the scroll */
    gsap.fromTo(
      q(".m3-stats-grid"),
      { y: 0 },
      {
        y: -64,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  return (
    <section id="m3-stats" ref={root} className="m3-stats">
      <div className="m3-stats-grid">
        {FACTS.map((f) => (
          <div className={`m3-stat m3-tone-${f.tone}`} key={f.cap}>
            <span className="m3-stat-num" data-to={f.n}>
              {f.n}
            </span>
            <span className="m3-stat-cap">{f.cap}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
