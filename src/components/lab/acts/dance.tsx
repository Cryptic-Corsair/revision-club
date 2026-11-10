"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "../chars";
import { stage, type ActWriter } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 4 · THE DANCE — both ways at once

   The quietest act: a full-screen equilibrium field, minimal
   copy, the Haber equation caught mid-negotiation. The field's
   balance swings forward and back with the scrub; the pointer
   drags a wake through it.
   ═══════════════════════════════════════════════════════════════ */

export default function Dance({ onAct }: { onAct: ActWriter }) {
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
            end: "+=180%",
            pin: true,
            scrub: 0.8,
            onUpdate: onAct,
          },
        })
        .fromTo(
          q(".dance-copy > *"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.15, stagger: 0.03, ease: "power2.out" },
          0.05,
        )
        .fromTo(
          q(".dance-arrow-l"),
          { scaleX: 0, transformOrigin: "right" },
          { scaleX: 1, duration: 0.1, ease: "power2.inOut" },
          0.26,
        )
        .fromTo(
          q(".dance-arrow-r"),
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.1, ease: "power2.inOut" },
          0.34,
        )
        .fromTo(
          q(".dance-kc"),
          { opacity: 0 },
          { opacity: 1, duration: 0.06 },
          0.46,
        )
        .to({}, { duration: 0.3 })
        .to(
          q(".dance-copy > *"),
          { opacity: 0, y: -28, duration: 0.09, stagger: 0.015, ease: "power2.in" },
          0.88,
        );
    }, sec);
    return () => ctx.revert();
  }, [onAct]);

  return (
    <section ref={ref} className="lab-act dance" data-act="4">
      <div className="lab-pin flex flex-col items-center justify-center text-center">
        <div className="dance-copy flex flex-col items-center px-6">
          <p className="lab-kicker f-mono">04 · The dance</p>
          <h2 className="lab-head f-display mt-5">
            <span className="block">
              <Split text="BOTH WAYS" />
            </span>
            <span className="block">
              <Split text="AT ONCE." outline />
            </span>
          </h2>
          <div className="lab-plate mt-10 flex items-center gap-4 sm:gap-6" aria-label="N2 plus 3 H2 in equilibrium with 2 NH3">
            <span className="dance-arrow-l block h-px w-12 bg-emerald/80 sm:w-20" style={{ background: "#35D08F" }} aria-hidden />
            <span className="f-display text-lg font-semibold text-white sm:text-2xl">
              N<sub>2</sub> + 3H<sub>2</sub>
            </span>
            <span className="f-display text-base text-white/60 sm:text-xl">⇌</span>
            <span className="f-display text-lg font-semibold text-white sm:text-2xl">
              2NH<sub>3</sub>
            </span>
          </div>
          <p className="dance-kc f-mono mt-5 text-[9px] text-white/50">
            forward runs · reverse runs · the mixture holds — K<sub>c</sub> watches
          </p>
          <p className="lab-lede mt-7 max-w-[44ch]">
            Reactions do not stop when they look finished. Forward
            and reverse run at the same rate and the composition
            holds — equilibrium is not rest, it is a dance. Change
            the temperature or the pressure and the dance shifts to
            a new balance.
          </p>
        </div>
      </div>
    </section>
  );
}
