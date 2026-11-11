"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionGate } from "./gate";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the chapter header

   One shape every chapter wears: a mono kicker with a rule, a big
   Syne title, a quiet lede — and a huge ghost numeral standing
   behind the whole room. The head's children rise in staggered
   order the first time the chapter enters.
   ═══════════════════════════════════════════════════════════════ */

export function ChapHead({
  n,
  kicker,
  title,
  lede,
  accent,
}: {
  n: string;
  kicker: string;
  title: React.ReactNode;
  lede: string;
  /** candy colour for the kicker rule and the ghost numeral stroke */
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!motionGate()) return;

    const ctx = gsap.context(() => {
      /* pre-hide the whole cast explicitly — staggered fromTo tweens
         only immediate-render their first element, and everything
         else would flash visible before its cue */
      const risers = el.querySelectorAll("[data-rise]");
      gsap.set(risers, { y: 30, opacity: 0 });
      gsap.set(el.querySelector(".fr-ghost"), { xPercent: -6, opacity: 0 });

      gsap.to(risers, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
      gsap.to(el.querySelector(".fr-ghost"), {
        xPercent: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="fr-chap-head">
      <span className="fr-ghost" style={{ WebkitTextStrokeColor: accent }}>
        {n}
      </span>
      <p data-rise className="fr-kicker f-mono">
        <span className="fr-kicker-rule" style={{ background: accent }} />
        {kicker}
      </p>
      <h2 data-rise className="fr-title">
        {title}
      </h2>
      <p data-rise className="fr-lede">
        {lede}
      </p>
    </div>
  );
}
