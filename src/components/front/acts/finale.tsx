"use client";

import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { bubbleField, useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 06 — the finale

   The primary block. "Begin." rises through its mask when the
   section arrives, then breathes forever; two halos exhale on a
   loop; cream bubbles climb; and the filled pill button is
   magnetic — it leans toward the pointer, its arrow nudges on an
   endless sine, and a tap hands the room back to the club.
   ═══════════════════════════════════════════════════════════════ */

export default function Finale({
  motion,
  onExit,
}: {
  motion: boolean;
  onExit?: () => void;
}) {
  const bubRef = useRef<HTMLDivElement>(null);
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    if (bubRef.current) bubbleField(bubRef.current, 10, "rgba(255,246,238,0.14)");

    /* the halos exhale forever, half a beat apart */
    gsap.fromTo(
      q(".m3-finale-ring"),
      { scale: 0.85, opacity: 0.55 },
      {
        scale: 1.4,
        opacity: 0,
        duration: 3.2,
        repeat: -1,
        ease: "power1.out",
        stagger: 1.6,
      },
    );

    /* the word: masked rise on arrival, then the endless breathe */
    const title = q(".m3-finale-title")[0] as HTMLElement | undefined;
    if (title) {
      const split = new SplitText(title, { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 120,
        duration: 0.95,
        ease: "m3-dec",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 62%", once: true },
      });
      gsap.to(split.chars, {
        y: "+=6",
        duration: () => gsap.utils.random(2.4, 3.8),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.12, from: "random" },
        delay: 1.6,
      });
    }

    /* the button: a slow pulse + the arrow's nudge, both endless */
    gsap.to(q(".m3-cta"), {
      scale: 1.04,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 1.4,
    });
    gsap.fromTo(
      q(".m3-cta-arrow"),
      { x: 0 },
      { x: 6, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" },
    );

    /* the magnet — the pill leans toward the pointer, springs back */
    const cta = q(".m3-cta")[0] as HTMLElement | undefined;
    if (cta) {
      const qx = gsap.quickTo(cta, "x", { duration: 0.5, ease: "power3.out" });
      const qy = gsap.quickTo(cta, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = cta.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist > 300) {
          qx(0);
          qy(0);
          return;
        }
        qx(gsap.utils.clamp(-26, 26, dx * 0.16));
        qy(gsap.utils.clamp(-18, 18, dy * 0.2));
      };
      const leave = () => {
        qx(0);
        qy(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }
  }

  return (
    <section id="m3-finale" ref={root} className="m3-finale">
      <div className="m3-bubbles" ref={bubRef} aria-hidden />
      <span className="m3-finale-ring" aria-hidden />
      <span className="m3-finale-ring" aria-hidden />
      <h2 className="m3-finale-title">Begin.</h2>
      {onExit && (
        <button type="button" className="m3-cta" onClick={onExit}>
          <span>Enter the lab</span>
          <svg className="m3-cta-arrow" viewBox="0 0 24 24" aria-hidden>
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </button>
      )}
      <p className="m3-finale-foot">WCH11 — WCH16</p>
    </section>
  );
}
