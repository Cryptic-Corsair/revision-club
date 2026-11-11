"use client";

import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { bubbleField, useActAnim } from "../kit";
import AtomRig from "../../atom-rig";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 04 — the loop

   A mint tonal band holding the AtomRig — the self-contained
   Bohr atom from components/atom-rig.tsx — at full size. The act
   adds only what belongs to the room: climbing bubbles, scroll
   that breathes through the rig (drift, scale, tilt), a pointer
   lean on fine-pointer screens (the atom tilts to meet the hand,
   the orbit planes counter-sliding for depth), and one equation
   that rises character by character, then lets its arrow pulse
   forever. Nothing else said. Nothing ever stops.
   ═══════════════════════════════════════════════════════════════ */

export default function Loop({ motion }: { motion: boolean }) {
  const bubRef = useRef<HTMLDivElement>(null);
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    if (bubRef.current) bubbleField(bubRef.current, 8, "rgba(7,58,43,0.13)");

    /* scroll breathes through the rig: it arrives small and low,
       leaves large and lifted, tilting as it goes */
    gsap.fromTo(
      q(".m3-rig"),
      { scale: 0.82, rotation: -6, yPercent: 7 },
      {
        scale: 1.06,
        rotation: 6,
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    /* the equation rises once, then its arrow breathes forever */
    const eq = q(".m3-eq")[0] as HTMLElement | undefined;
    if (eq) {
      const line = eq.querySelector(".m3-eq-line") as HTMLElement | null;
      if (line) {
        const split = new SplitText(line, { type: "chars" });
        const arrow = split.chars.find((c) => (c.textContent ?? "").includes("→"));
        gsap.from(split.chars, {
          autoAlpha: 0,
          y: 16,
          duration: 0.55,
          ease: "m3-dec",
          stagger: 0.025,
          scrollTrigger: { trigger: el, start: "top 62%", once: true },
          /* the arrow only breathes once it has actually arrived —
             starting it earlier would lock in the pre-reveal opacity */
          onComplete: () => {
            if (arrow) {
              gsap.to(arrow, {
                opacity: 0.4,
                scale: 1.24,
                duration: 0.8,
                yoyo: true,
                repeat: -1,
                repeatDelay: 4.2,
                ease: "sine.inOut",
                transformOrigin: "center",
              });
            }
          },
        });
      }
      /* the equation drifts on its own slower layer */
      gsap.fromTo(
        eq,
        { y: 26 },
        {
          y: -26,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }

    /* the pointer lean — the atom tilts to meet the hand and the
       orbit planes counter-slide, a depth trick in two layers */
    if (window.matchMedia("(pointer: fine)").matches && window.innerWidth > 820) {
      const tilt = q(".m3-rig-tilt")[0] as HTMLElement | undefined;
      const svg = q(".m3-rig-svg")[0] as HTMLElement | undefined;
      if (tilt && svg) {
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.7, ease: "power3" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.7, ease: "power3" });
        const sx = gsap.quickTo(svg, "x", { duration: 0.9, ease: "power3" });
        const sy = gsap.quickTo(svg, "y", { duration: 0.9, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          ry(nx * 13);
          rx(-ny * 10);
          sx(-nx * 11);
          sy(-ny * 9);
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
      <div className="m3-bubbles" ref={bubRef} aria-hidden />
      <div className="m3-rig" aria-hidden>
        <div className="m3-rig-tilt">
          <AtomRig motion={motion} className="m3-rig-atom" />
        </div>
      </div>
      <p className="m3-eq">
        <span className="m3-eq-line">
          2Na + Cl<sub>2</sub> → 2NaCl
        </span>
      </p>
    </section>
  );
}
