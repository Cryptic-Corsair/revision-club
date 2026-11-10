"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "../chars";
import { CAT_COLOR, CAT_LABEL, stage, type ActWriter } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 1 · THE CAST — the wall of thirty-six

   Copy stands on the left while the camera flies the wall on the
   right. Hovering a tile names it in a tooltip that trails the
   pointer (the tooltip itself lives in lab.tsx, fed by callback).
   ═══════════════════════════════════════════════════════════════ */

const LEGEND = [
  "alkali",
  "alkaline",
  "transition",
  "post",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble",
] as const;

export default function Cast({ onAct }: { onAct: ActWriter }) {
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
            end: "+=230%",
            pin: true,
            scrub: 0.8,
            onUpdate: onAct,
          },
        })
        .fromTo(
          q(".cast-copy > *"),
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.16, stagger: 0.03, ease: "power2.out" },
          0.04,
        )
        .fromTo(
          q(".cast-legend li"),
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.02, stagger: 0.008 },
          0.2,
        )
        .to({}, { duration: 0.42 }) /* hold while the flight runs */
        .to(
          q(".cast-copy > *"),
          { opacity: 0, y: -34, duration: 0.1, stagger: 0.015, ease: "power2.in" },
          0.86,
        );
    }, sec);
    return () => ctx.revert();
  }, [onAct]);

  return (
    <section ref={ref} className="lab-act cast" data-act="1">
      <div className="lab-pin flex items-center">
        <div className="cast-copy max-w-[520px] px-6 sm:px-14">
          <p className="lab-kicker f-mono">01 · The cast</p>
          <h2 className="lab-head f-display mt-5">
            <span className="block">
              <Split text="EVERYTHING" />
            </span>
            <span className="block">
              <Split text="IS 118" />
            </span>
            <span className="block">
              <Split text="THINGS." outline />
            </span>
          </h2>
          <p className="lab-lede mt-7 max-w-[44ch]">
            The periodic table is not a list to memorise — it is a
            casting sheet. By the exam you will know three dozen of
            these by symbol, by name, by how they behave.
          </p>
          <p className="f-mono mt-6 text-[9px] text-white/45">
            hover the wall — the elements introduce themselves
          </p>
          <ul className="cast-legend mt-8 grid max-w-[300px] grid-cols-2 gap-x-6 gap-y-2.5">
            {LEGEND.map((c) => (
              <li key={c} className="flex items-center gap-2.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: CAT_COLOR[c], boxShadow: `0 0 8px ${CAT_COLOR[c]}` }}
                  aria-hidden
                />
                <span className="f-mono text-[9px] text-white/60">
                  {CAT_LABEL[c]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
