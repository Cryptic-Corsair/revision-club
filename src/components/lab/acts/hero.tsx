"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "../chars";
import { stage, type ActWriter } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 0 · MATTER — the door

   Giant editorial type over the orb. The reveal is time-based
   (it plays once the veil lifts); the scroll only carries the
   copy away as act one takes over.
   ═══════════════════════════════════════════════════════════════ */

export default function Hero({
  ready,
  onAct,
}: {
  ready: boolean;
  onAct: ActWriter;
}) {
  const ref = useRef<HTMLElement>(null);

  /* the reveal — plays on the clock, not the scrollbar */
  useEffect(() => {
    if (!ready || !stage.motion) return;
    const sec = ref.current!;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sec);
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          q(".hero-kicker"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.05,
        )
        .fromTo(
          q(".l-char"),
          { yPercent: 118, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.016 },
          0.12,
        )
        .fromTo(
          q(".hero-lede"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.7,
        )
        .fromTo(
          q(".hero-hint, .hero-cue"),
          { opacity: 0 },
          { opacity: 1, duration: 0.9 },
          0.95,
        );
    }, sec);
    return () => ctx.revert();
  }, [ready]);

  /* the hand-over — the act pins for 220 % of the viewport while
     the scroll carries the copy up and out */
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
      gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.6,
          onUpdate: onAct,
        },
      })
        .to(".hero-kicker, .hero-hint", { opacity: 0, ease: "none", duration: 0.12 }, 0.7)
        .to(".hero-lede", { opacity: 0, y: -30, ease: "none", duration: 0.12 }, 0.72)
        .to(".hero-cue", { opacity: 0, ease: "none", duration: 0.1 }, 0.7)
        .to(
          ".hero-head .l-cell",
          { yPercent: -118, stagger: 0.006, ease: "power2.in", duration: 0.16 },
          0.76,
        );
    }, sec);
    return () => ctx.revert();
  }, [onAct]);

  return (
    <section ref={ref} className="lab-act hero" data-act="0">
      <div className="lab-pin flex flex-col items-center justify-center text-center">
        <p className="hero-kicker lab-kicker f-mono">
          Edexcel IAL · Chemistry · WCH11 — WCH13
        </p>
        <h1 className="hero-head lab-head f-display mt-6">
          <span className="block">
            <Split text="MATTER," />
          </span>
          <span className="block">
            <Split text="ENERGY," />
          </span>
          <span className="block">
            <Split text="CHANGE." outline />
          </span>
        </h1>
        <p className="hero-lede lab-lede mt-8 max-w-[46ch]">
          The whole specification behaves like a story — particles,
          bonds, price tags, and a dance that never quite stops.
          Scroll, and it happens to you.
        </p>
        <p className="hero-hint f-mono mt-10 text-[9px] text-white/45">
          <span data-cursor="drag" className="inline-block cursor-grab px-2 py-1">
            ◦ drag the orb — it fights back
          </span>
        </p>
        <div className="hero-cue lab-cue" aria-hidden>
          <span className="f-mono text-[9px]">scroll</span>
          <span className="lab-cue-line" />
        </div>
      </div>
    </section>
  );
}
