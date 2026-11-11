"use client";

import gsap from "gsap";
import { Formula, scrollState, useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 02 — the ticker

   Two tonal bands cross at a slight tilt and never stop walking:
   formulas on the raspberry band, elements with their atomic
   numbers on the cocoa one, each segment doubled so the -50% loop
   is seamless. Lenis's velocity (via scrollState) leans both bands
   as you scroll — the page skews, then settles. repeat: -1, always.
   ═══════════════════════════════════════════════════════════════ */

const FORMULAS = [
  "H2O", "CO2", "NaCl", "CH4", "NH3", "H2SO4",
  "C2H5OH", "NaOH", "HCl", "O2", "NO2", "KMnO4",
];

const ELEMENTS: Array<[string, number]> = [
  ["Li", 3], ["C", 6], ["N", 7], ["O", 8], ["Na", 11], ["Mg", 12],
  ["Si", 14], ["S", 16], ["Cl", 17], ["K", 19], ["Fe", 26], ["Cu", 29],
  ["Zn", 30], ["Ag", 47],
];

export default function Marquee({ motion }: { motion: boolean }) {
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    /* the walk — opposite directions, different paces */
    (q(".m3-band-track") as HTMLElement[]).forEach((track, i) => {
      const back = track.dataset.dir === "-1";
      gsap.fromTo(
        track,
        { xPercent: back ? -50 : 0 },
        {
          xPercent: back ? 0 : -50,
          duration: i === 0 ? 30 : 40,
          repeat: -1,
          ease: "none",
        },
      );
    });

    /* the lean — scroll velocity skews the bands, decay settles them */
    const bands = q(".m3-band") as HTMLElement[];
    const leans = bands.map((b) =>
      gsap.quickTo(b, "skewX", { duration: 0.45, ease: "power2.out" }),
    );
    const tick = () => {
      const lean = gsap.utils.clamp(-9, 9, scrollState.vel * 0.5);
      leans[0]?.(lean);
      leans[1]?.(-lean);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }

  return (
    <section id="m3-marquee" ref={root} className="m3-marquee" aria-label="Formulas and elements">
      <div className="m3-band m3-band-a">
        <div className="m3-band-track" data-dir="1">
          {[0, 1].map((k) => (
            <span className="m3-band-seg" key={k} aria-hidden={k === 1}>
              {FORMULAS.map((f) => (
                <span className="m3-band-item" key={f}>
                  <Formula f={f} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="m3-band m3-band-b">
        <div className="m3-band-track" data-dir="-1">
          {[0, 1].map((k) => (
            <span className="m3-band-seg" key={k} aria-hidden={k === 1}>
              {ELEMENTS.map(([sym, z]) => (
                <span className="m3-band-item m3-el" key={sym}>
                  <b>{sym}</b>
                  <i>{z}</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
