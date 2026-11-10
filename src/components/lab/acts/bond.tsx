"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "../chars";
import { stage, type ActWriter } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 2 · THE BOND — nothing stands alone

   Centered copy while the nuclei close in behind it. The
   equation assembles itself as the act scrubs: reactants in,
   arrow draws, the salt lands with the flash.
   ═══════════════════════════════════════════════════════════════ */

export default function Bond({ onAct }: { onAct: ActWriter }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current!;
    if (!stage.motion) {
      const st = ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 45%",
        onUpdate: onAct,
      });
      return () => st.kill();
    }
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sec);
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.8,
            onUpdate: onAct,
          },
        })
        .fromTo(
          q(".bond-head .l-char"),
          { yPercent: 118, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.14, stagger: 0.008, ease: "power2.out" },
          0.03,
        )
        .fromTo(
          q(".bond-lede"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power1.out" },
          0.14,
        )
        /* the equation assembles with the bond itself */
        .fromTo(q(".eq-chip-a"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" }, 0.3)
        .fromTo(q(".eq-plus"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.04, ease: "back.out(2)" }, 0.36)
        .fromTo(q(".eq-chip-b"), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" }, 0.4)
        .fromTo(q(".eq-arrow-line"), { scaleX: 0 }, { scaleX: 1, duration: 0.07, ease: "power2.inOut" }, 0.5)
        .fromTo(q(".eq-arrow-head"), { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.56)
        .fromTo(q(".eq-chip-c"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.06, ease: "back.out(1.8)" }, 0.62)
        .fromTo(q(".eq-sub"), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.68)
        .to({}, { duration: 0.14 })
        .to(
          q(".bond-copy > *"),
          { opacity: 0, y: -30, duration: 0.09, stagger: 0.012, ease: "power2.in" },
          0.88,
        );
    }, sec);
    return () => ctx.revert();
  }, [onAct]);

  return (
    <section ref={ref} className="lab-act bond" data-act="2">
      <div className="lab-pin flex flex-col items-center justify-center text-center">
        <div className="bond-copy flex flex-col items-center px-6">
          <p className="lab-kicker f-mono">02 · The bond</p>
          <h2 className="bond-head lab-head f-display mt-5">
            <span className="block">
              <Split text="NOTHING" />
            </span>
            <span className="block">
              <Split text="STANDS ALONE." outline />
            </span>
          </h2>
          <p className="bond-lede lab-lede mt-7 max-w-[46ch]">
            Two electrons change hands and a salt falls out of the
            air. Every compound you will ever meet is this same
            negotiation — giving, taking, or sharing until both
            shells are satisfied.
          </p>
          <div className="lab-plate mt-10 flex items-center gap-3 sm:gap-5" aria-label="2 Na plus Cl 2 gives 2 NaCl">
            <span className="eq-chip-a lab-chip" data-cursor>
              2Na
              <small>sodium gives</small>
            </span>
            <span className="eq-plus f-display text-2xl text-white/70 sm:text-4xl">+</span>
            <span className="eq-chip-b lab-chip" data-cursor>
              Cl<sub>2</sub>
              <small>chlorine takes</small>
            </span>
            <span className="eq-arrow relative mx-1 h-px w-10 bg-white/60 sm:w-16" aria-hidden>
              <span className="eq-arrow-line absolute inset-0 origin-left bg-white/80" />
              <span className="eq-arrow-head absolute -right-1 -top-[3.5px] h-2 w-2 rotate-45 border-r border-t border-white/80" />
            </span>
            <span className="eq-chip-c lab-chip lab-chip-hot" data-cursor>
              2NaCl
              <small>the salt lands</small>
            </span>
          </div>
          <p className="eq-sub f-mono mt-5 text-[9px] text-white/50">
            one electron transferred · Na⁺ + Cl⁻ · lattice energy holds it shut
          </p>
        </div>
      </div>
    </section>
  );
}
