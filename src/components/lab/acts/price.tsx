"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "../chars";
import { stage, type ActWriter } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 3 · THE PRICE — every change has a price

   Right-aligned copy over the ember field. The counter is the
   act: ΔH runs down to the real spec figure for hydrogen
   chloride formation as the scrub advances, and the ember room
   flashes white-hot when it lands. Scroll speed is the fuel.
   ═══════════════════════════════════════════════════════════════ */

export default function Price({ onAct }: { onAct: ActWriter }) {
  const ref = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  /* under reduced motion the receipt prints in full, at rest */
  useEffect(() => {
    if (!stage.motion && numRef.current)
      numRef.current.textContent = "-184";
  }, []);

  useEffect(() => {
    if (!stage.motion) {
      const st = ScrollTrigger.create({
        trigger: ref.current!,
        start: "top 55%",
        end: "bottom 45%",
        onUpdate: onAct,
      });
      return () => st.kill();
    }
    const sec = ref.current!;
    const num = numRef.current!;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sec);
      const counter = { v: 0 };
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
          q(".price-copy > *"),
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.14, stagger: 0.025, ease: "power2.out" },
          0.04,
        )
        .to(
          counter,
          {
            v: -184,
            duration: 0.62,
            ease: "power1.in",
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v));
            },
          },
          0.2,
        )
        .fromTo(
          q(".price-flash"),
          { opacity: 0 },
          { opacity: 0.9, duration: 0.025, yoyo: true, repeat: 1, ease: "power2.in" },
          0.82,
        )
        .to({}, { duration: 0.06 })
        .to(
          q(".price-copy > *"),
          { opacity: 0, y: -30, duration: 0.08, stagger: 0.012, ease: "power2.in" },
          0.9,
        );
    }, sec);
    return () => ctx.revert();
  }, [onAct]);

  return (
    <section ref={ref} className="lab-act price" data-act="3">
      <div className="lab-pin flex items-center justify-end">
        <div className="price-copy max-w-[620px] px-6 text-right sm:px-14">
          <p className="lab-kicker f-mono">03 · The price</p>
          <h2 className="lab-head f-display mt-5">
            <span className="block">
              <Split text="EVERY CHANGE" />
            </span>
            <span className="block">
              <Split text="HAS A PRICE." outline />
            </span>
          </h2>
          <div className="mt-9" aria-label="Delta H equals minus 184 kilojoules per mole">
            <span className="price-num f-display block font-extrabold leading-none tracking-[-0.02em] text-white">
              ΔH&nbsp;=&nbsp;<span ref={numRef}>0</span>
              <span className="ml-2 align-top font-mono text-[clamp(0.7rem,1.6vw,1.1rem)] font-normal text-white/55">
                kJ mol<sup>−1</sup>
              </span>
            </span>
          </div>
          <p className="f-mono mt-4 text-[10px] text-white/55">
            H₂(g) + Cl₂(g) → 2HCl(g) · exothermic
          </p>
          <p className="lab-lede mt-6 ml-auto max-w-[42ch]">
            Chemistry is accounting. Bonds broken cost energy, bonds
            made pay it back, and the receipt is the enthalpy change.
            The products sit lower; the difference leaves as heat.
          </p>
          <p className="f-mono mt-6 text-[9px] text-white/45">
            scroll faster — the room ignites
          </p>
        </div>
        <div className="price-flash pointer-events-none absolute inset-0 bg-white" style={{ opacity: 0 }} aria-hidden />
      </div>
    </section>
  );
}
