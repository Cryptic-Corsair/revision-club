"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ChapHead } from "../chap";
import { motionGate } from "../gate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · chapter 03 — the price

   Energetics, scrubbed. H₂ + Cl₂ → 2HCl: the reaction coordinate
   draws itself while an energy packet rides the hump, the ΔH meter
   falls to −184 kJ mol⁻¹, and the heat bar fills to prove the room
   got warmer. Same sticky-runway pattern as the bond — the scrollbar
   is the timeline, nothing moves without the user's own hand.
   ═══════════════════════════════════════════════════════════════ */

export default function Price() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionGate()) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const numEl = el.querySelector(".fr-price-val");
      /* pre-state everything explicitly — set + to survives every
         refresh intact, and nothing shows before its cue */
      gsap.set(".fr-price-graph", { opacity: 0, y: 24 });
      gsap.set(".fr-price-path", { strokeDashoffset: 1180 });
      gsap.set(".fr-price-dot", { opacity: 0 });
      gsap.set(
        [".fr-price-reactants", ".fr-price-products", ".fr-price-ea"],
        { opacity: 0 },
      );
      gsap.set(".fr-price-dh-arrow", { opacity: 0, scaleY: 0 });
      gsap.set(".fr-price-heat-fill", { scaleX: 0 });
      gsap.set(".fr-price-final", { opacity: 0, y: 14 });
      if (numEl) numEl.textContent = "0"; /* the meter counts down live */
      gsap.set([".fr-pcap-1", ".fr-pcap-2", ".fr-pcap-3"], { opacity: 0 });

      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".fr-price-window",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".fr-price-graph", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0)

      /* the coordinate draws itself */
        .to(".fr-price-path", { strokeDashoffset: 0, duration: 6, ease: "power1.inOut" }, 0.3)

      /* the energy packet rides the hump */
        .to(".fr-price-dot", { opacity: 1, duration: 0.4 }, 0.8)
        .to(".fr-price-dot", {
          motionPath: {
            path: ".fr-price-path",
            align: ".fr-price-path",
            alignOrigin: [0.5, 0.5],
          },
          duration: 5.6,
        }, 0.9)
        .to(".fr-price-dot", { opacity: 0, scale: 0.4, duration: 0.6 }, 6.6)
        .to(".fr-price-reactants", { opacity: 1, duration: 0.5 }, 0.8)
        .to(".fr-price-ea", { opacity: 1, duration: 0.6 }, 1.6)
        .to(".fr-price-products", { opacity: 1, duration: 0.5 }, 5.2)

      /* ΔH arrow between the plateaus */
        .to(".fr-price-dh-arrow", { opacity: 1, scaleY: 1, duration: 1, ease: "power2.out" }, 6.0)

      /* the meter falls */
        .to(counter, {
          v: -184,
          duration: 3.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (numEl) numEl.textContent = String(Math.round(counter.v));
          },
        }, 3.2)

      /* the room warms */
        .to(".fr-price-heat-fill", { scaleX: 1, duration: 4.4, ease: "power1.in" }, 3.0)
        .to(".fr-price-final", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 7.6);

      /* captions trade places */
      gsap.timeline({
        scrollTrigger: {
          trigger: ".fr-price-window",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(".fr-pcap-1", { opacity: 1, duration: 0.6 }, 0.5)
        .to(".fr-pcap-1", { opacity: 0, duration: 0.6 }, 2.9)
        .to(".fr-pcap-2", { opacity: 1, duration: 0.6 }, 3.5)
        .to(".fr-pcap-2", { opacity: 0, duration: 0.6 }, 5.9)
        .to(".fr-pcap-3", { opacity: 1, duration: 0.8 }, 6.4);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="fr-chap fr-price" data-act="3" id="fr-price">
      <ChapHead
        n="03"
        kicker="THE PRICE · ENERGETICS"
        accent="var(--color-tangerine)"
        title={
          <>
            Every change has a price.
            <em> Some pay you back.</em>
          </>
        }
        lede="Bond breaking costs energy; bond making refunds it. Whether you pocket the difference decides if the flask warms or chills. Scroll — this one pays."
      />

      <div className="fr-price-window">
        <div className="fr-price-stage">
          <div className="fr-price-graph-wrap">
            <svg className="fr-price-graph" viewBox="0 0 600 250" preserveAspectRatio="none" aria-hidden>
              {/* axes */}
              <path d="M50 20V230M50 230H580" className="d-axis" />
              {/* the reaction coordinate: reactants → hump → lower products */}
              <path
                className="fr-price-path"
                d="M50 130 C 150 130, 170 42, 300 42 C 430 42, 450 168, 580 168"
                fill="none"
              />
              {/* ΔH double arrow between the two plateaus */}
              <g className="fr-price-dh-arrow">
                <path d="M545 130v38M541 134l4-4 4 4M541 164l4 4 4-4" />
                <path d="M492 149h50" strokeDasharray="2 4" className="d-thin" />
              </g>
            </svg>

            <span className="fr-price-dot" aria-hidden />
            <span className="fr-price-reactants f-mono">reactants · H<sub>2</sub> + Cl<sub>2</sub></span>
            <span className="fr-price-products f-mono">products · 2HCl</span>
            <span className="fr-price-ea f-mono">E<sup>a</sup> — the hump you pay first</span>
          </div>

          <div className="fr-price-readout">
            <div className="fr-price-meter">
              <span className="f-mono">ΔH</span>
              <span className="fr-price-num">
                <span className="fr-price-val">&minus;184</span>
                <span className="f-mono">kJ mol<sup>−1</sup></span>
              </span>
            </div>
            <div className="fr-price-heat">
              <span className="fr-price-heat-fill" />
            </div>
            <p className="fr-price-final f-mono">exothermic — energy leaves the system as heat</p>
          </div>

          <div className="fr-bond-caps" aria-hidden>
            <p className="fr-bond-cap fr-pcap-1">first you pay: bonds break…</p>
            <p className="fr-bond-cap fr-pcap-2">…then you're repaid: bonds form</p>
            <p className="fr-bond-cap fr-pcap-3">the net: −184 kJ mol<sup>−1</sup> — the room is warmer</p>
          </div>
        </div>
      </div>

      <p className="fr-price-foot f-mono">
        H<sub>2</sub> + Cl<sub>2</sub> → 2HCl · ΔH = −184 kJ mol<sup>−1</sup> · spec WCH12 Topic 6 (6.1 → 6.11) — the syllabus makes you do this arithmetic backwards and forwards.
      </p>
    </section>
  );
}
