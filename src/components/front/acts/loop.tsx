"use client";

import gsap from "gsap";
import { useRef } from "react";
import AtomRig from "../../atom-rig";
import { useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 04 — the plate

   The loop act, typeset as an editorial journal figure. Paper,
   black ink, one red. A running head draws its hairline, the
   serif headline lands word by word, and the AtomRig — the Bohr
   atom from components/atom-rig.tsx, printed in two inks — sits
   in the figure field annotating itself: fixed leaders for
   nucleus and orbit, one live hairline that chases an electron
   forever. A micro legend reads proton · neutron · electron;
   the reaction sets in the serif, its arrow drawn once and then
   breathing forever; the attribution closes the caption. Scroll
   breathes through the plate (drift, scale, tilt), a pointer
   lean on fine-pointer screens meets the hand. Nothing said
   twice. Nothing ever stops.
   ═══════════════════════════════════════════════════════════════ */

export default function Loop({ motion }: { motion: boolean }) {
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    /* — the plate arrives: hairlines draw, type lands — */
    gsap.from(q(".ed-rule"), {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.1,
      ease: "m3-dec",
      stagger: 0.14,
      scrollTrigger: { trigger: el, start: "top 58%", once: true },
    });
    gsap.from(q(".ed-head > *"), {
      autoAlpha: 0,
      y: 8,
      duration: 0.6,
      ease: "m3-dec",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 58%", once: true },
    });
    gsap.from(q(".ed-title .ed-w"), {
      autoAlpha: 0,
      y: 26,
      duration: 0.8,
      ease: "m3-dec",
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: "top 52%", once: true },
    });
    gsap.from(q(".ed-legend .ed-lg"), {
      autoAlpha: 0,
      y: 10,
      duration: 0.55,
      ease: "m3-dec",
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: "top 40%", once: true },
    });
    gsap.from(q(".ed-after"), {
      autoAlpha: 0,
      duration: 1,
      ease: "m3-dec",
      scrollTrigger: { trigger: el, start: "top 30%", once: true },
    });

    /* — the figure's own annotations draw themselves in, the way a
         plate's labels are inked last — */
    const lines = q(".ed-notes .ed-note-line") as unknown as SVGLineElement[];
    lines.forEach((line, i) => {
      const L = line.getTotalLength();
      gsap.set(line, { strokeDasharray: `${L} ${L}`, strokeDashoffset: L });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 0.7,
        delay: 0.5 + i * 0.22,
        ease: "power1.inOut",
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
    });
    gsap.from(q(".ed-notes .ed-note-text, .ed-notes .ed-note-dot"), {
      autoAlpha: 0,
      duration: 0.6,
      delay: 0.55,
      ease: "m3-dec",
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 55%", once: true },
    });

    /* — scroll breathes through the figure: it arrives small and
         low, leaves large and lifted, tilting as it goes — */
    gsap.fromTo(
      q(".ed-rig"),
      { scale: 0.9, rotation: -3.5, yPercent: 5 },
      {
        scale: 1.04,
        rotation: 3.5,
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    /* — the caption drifts on its own slower layer — */
    gsap.fromTo(
      q(".ed-foot"),
      { y: 18 },
      {
        y: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    /* — the equation rises once, then its arrow breathes forever — */
    gsap.from(q(".ed-eq-part"), {
      autoAlpha: 0,
      y: 18,
      duration: 0.7,
      ease: "m3-dec",
      stagger: 0.16,
      scrollTrigger: { trigger: el, start: "top 38%", once: true },
      onComplete: () => {
        const arrow = q(".ed-eq-arrow")[0] as HTMLElement | undefined;
        if (arrow) {
          gsap.to(arrow, {
            scale: 1.1,
            opacity: 0.55,
            duration: 0.9,
            yoyo: true,
            repeat: -1,
            repeatDelay: 3.4,
            ease: "sine.inOut",
            transformOrigin: "left center",
          });
        }
      },
    });
    const draw = q(".ed-eq-arrow-draw")[0] as unknown as SVGPathElement | undefined;
    if (draw) {
      const L = draw.getTotalLength();
      gsap.set(draw, { strokeDasharray: `${L} ${L}`, strokeDashoffset: L });
      gsap.to(draw, {
        strokeDashoffset: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "power1.inOut",
        scrollTrigger: { trigger: el, start: "top 38%", once: true },
      });
    }

    /* — the pointer lean — the plate tilts to meet the hand and the
         figure counter-slides, a depth trick in two layers — */
    if (window.matchMedia("(pointer: fine)").matches && window.innerWidth > 820) {
      const tilt = q(".ed-tilt")[0] as HTMLElement | undefined;
      const svg = q(".ed-svg")[0] as HTMLElement | undefined;
      if (tilt && svg) {
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.7, ease: "power3" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.7, ease: "power3" });
        const sx = gsap.quickTo(svg, "x", { duration: 0.9, ease: "power3" });
        const sy = gsap.quickTo(svg, "y", { duration: 0.9, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          ry(nx * 11);
          rx(-ny * 8);
          sx(-nx * 9);
          sy(-ny * 7);
        };
        const leave = () => {
          rx(0);
          ry(0);
          sx(0);
          sy(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      }
    }
  }

  return (
    <section id="m3-loop" ref={root} className="m3-loop">
      <div className="ed-plate">
        <span className="ed-crop ed-crop-tl" aria-hidden />
        <span className="ed-crop ed-crop-tr" aria-hidden />
        <span className="ed-crop ed-crop-bl" aria-hidden />
        <span className="ed-crop ed-crop-br" aria-hidden />

        <header className="ed-head">
          <span className="ed-head-no">Fig. 04 · The shell model</span>
          <span className="ed-head-tag">IAL CHEM</span>
        </header>
        <span className="ed-rule" aria-hidden />

        <h2 className="ed-title">
          <span className="ed-w">The</span> <span className="ed-w">atom</span>{" "}
          <em className="ed-w">never</em> <em className="ed-w">rests</em>
          <span className="ed-fs">.</span>
        </h2>

        <div className="ed-rig" aria-hidden>
          <div className="ed-tilt">
            <AtomRig motion={motion} className="ed-atom" />
          </div>
        </div>

        <p className="ed-legend" aria-hidden>
          <span className="ed-lg">
            <i className="ed-sw ed-sw-p" /> proton
          </span>
          <span className="ed-lg">
            <i className="ed-sw ed-sw-n" /> neutron
          </span>
          <span className="ed-lg">
            <i className="ed-sw ed-sw-e" /> electron
          </span>
        </p>

        <footer className="ed-foot">
          <span className="ed-rule" aria-hidden />
          <p className="ed-eq">
            <span className="ed-eq-part">2Na + Cl<sub>2</sub></span>
            <svg className="ed-eq-arrow" viewBox="0 0 34 14" aria-hidden>
              <path
                className="ed-eq-arrow-draw"
                d="M1 7 H29 M29 7 L23 2.8 M29 7 L23 11.2"
                fill="none"
              />
            </svg>
            <span className="ed-eq-part">2NaCl</span>
          </p>
          <p className="ed-after">after N. Bohr, 1913</p>
        </footer>
      </div>
    </section>
  );
}
