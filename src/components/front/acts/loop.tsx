"use client";

import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { bubbleField, ellipsePath, smoothBlob, useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 04 — the loop

   The pure motion interlude: a mint tonal band holding one rig —
   the cookie spinning forever, a dashed ring counter-rotating,
   the core pulsing, a halo exhaling, and three electrons running
   their elliptical orbits on MotionPath, staggered so a passing
   is always happening. Scroll scrubs the whole rig's scale and
   tilt; bubbles climb behind it. One equation, nothing else said.
   ═══════════════════════════════════════════════════════════════ */

export default function Loop({ motion }: { motion: boolean }) {
  const bubRef = useRef<HTMLDivElement>(null);
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    /* the machinery — every part on its own endless clock */
    gsap.to(q(".m3-rig-cookie"), {
      rotation: 360, duration: 44, repeat: -1, ease: "none", svgOrigin: "100 100",
    });
    gsap.to(q(".m3-rig-ring"), {
      rotation: -360, duration: 66, repeat: -1, ease: "none", svgOrigin: "100 100",
    });
    gsap.to(q(".m3-rig-core"), {
      scale: 1.08, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut", svgOrigin: "100 100",
    });
    gsap.to(q(".m3-rig-pulse"), {
      scale: 1.55, opacity: 0, duration: 2.6, repeat: -1, ease: "power1.out", svgOrigin: "100 100",
    });

    /* the electrons — two on the wide orbit, one on the tilted one */
    const electrons: Array<{ sel: string; path: string; dur: number; delay?: number }> = [
      { sel: ".m3-el-a", path: "#m3-orbit-a", dur: 7 },
      { sel: ".m3-el-a2", path: "#m3-orbit-a", dur: 7, delay: -3.5 },
      { sel: ".m3-el-b", path: "#m3-orbit-b", dur: 9.5 },
    ];
    electrons.forEach((e) => {
      gsap.to(q(e.sel), {
        motionPath: { path: e.path, align: e.path, alignOrigin: [0.5, 0.5] },
        duration: e.dur,
        repeat: -1,
        ease: "none",
        delay: e.delay ?? 0,
      });
    });

    if (bubRef.current) bubbleField(bubRef.current, 8, "rgba(7,58,43,0.13)");

    /* scroll breathes into the rig */
    gsap.fromTo(
      q(".m3-rig"),
      { scale: 0.82, rotation: -6 },
      {
        scale: 1.06,
        rotation: 6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    /* the equation rises, character by character, once */
    const eq = q(".m3-eq")[0] as HTMLElement | undefined;
    if (eq) {
      const split = eq.querySelector(".m3-eq-line") as HTMLElement | null;
      if (split) {
        const parts = new SplitText(split, { type: "chars" });
        gsap.from(parts.chars, {
          autoAlpha: 0,
          y: 16,
          duration: 0.55,
          ease: "m3-dec",
          stagger: 0.025,
          scrollTrigger: { trigger: el, start: "top 62%", once: true },
        });
      }
    }
  }

  return (
    <section id="m3-loop" ref={root} className="m3-loop">
      <div className="m3-bubbles" ref={bubRef} aria-hidden />
      <div className="m3-rig" aria-hidden>
        <svg viewBox="0 0 200 200" className="m3-rig-svg">
          <path id="m3-orbit-a" className="m3-orbit" d={ellipsePath(100, 100, 84, 50)} />
          <path
            id="m3-orbit-b"
            className="m3-orbit"
            d={ellipsePath(100, 100, 58, 76)}
            transform="rotate(-24 100 100)"
          />
          <circle className="m3-rig-pulse" cx="100" cy="100" r="32" />
          <path className="m3-rig-cookie" d={smoothBlob(100, 100, 42, 9, 0.16)} />
          <circle className="m3-rig-ring" cx="100" cy="100" r="92" />
          <circle className="m3-rig-core" cx="100" cy="100" r="24" />
          <circle className="m3-electron m3-el-a" cx="16" cy="100" r="7" />
          <circle className="m3-electron m3-el-a2" cx="184" cy="100" r="4.5" />
          <circle className="m3-electron m3-el-b" cx="100" cy="24" r="5.5" />
        </svg>
      </div>
      <p className="m3-eq">
        <span className="m3-eq-line">
          2Na + Cl<sub>2</sub> → 2NaCl
        </span>
      </p>
    </section>
  );
}
