"use client";

import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { bubbleField, smoothBlob, useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 01 — the cover

   One brand, one range of codes, one word of instruction. The
   Material 3 shape field (arch, disc, pill, ring, cookie) sits in
   its own parallax layers — each wrap carries a scrubbed scroll
   speed, the shape itself carries an endless drift — and the title
   rises through SplitText masks, then breathes character by
   character forever. Bubbles climb the whole time. Nothing stops.
   ═══════════════════════════════════════════════════════════════ */

export default function Hero({ motion, ready }: { motion: boolean; ready: boolean }) {
  const bubRef = useRef<HTMLDivElement>(null);
  const root = useActAnim<HTMLElement>(motion, run, [ready]);

  function run() {
    /* the cover waits for the curtain: ready flips true as the first
       panel lifts, and only then does the whole setup run — once */
    if (!ready) return;
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    /* the field pops in, then every shape drifts forever */
    gsap.from(q(".m3-shape"), {
      scale: 0,
      duration: 0.9,
      ease: "back.out(1.5)",
      stagger: { each: 0.06, from: "random" },
      delay: 0.1,
    });
    (q(".m3-shape") as HTMLElement[]).forEach((s) => {
      gsap.to(s, {
        x: () => gsap.utils.random(-26, 26),
        y: () => gsap.utils.random(-22, 22),
        rotation: () => gsap.utils.random(-14, 14),
        duration: () => gsap.utils.random(3.5, 6.5),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    /* the title: masked rise, then a per-character float that never ends */
    const title = q(".m3-hero-title")[0] as HTMLElement | undefined;
    if (title) {
      const split = new SplitText(title, { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 118,
        duration: 1.05,
        ease: "m3-dec",
        stagger: 0.05,
        delay: 0.25,
      });
      gsap.to(split.chars, {
        y: "+=5",
        rotation: "+=1.3",
        duration: () => gsap.utils.random(2.2, 3.6),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.1, from: "random" },
        delay: 1.5,
      });
    }

    /* the code range scrambles into place */
    const kicker = q(".m3-kicker")[0] as HTMLElement | undefined;
    if (kicker) {
      const text = kicker.textContent ?? "";
      gsap.fromTo(
        kicker,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, delay: 0.7 },
      );
      gsap.to(kicker, {
        duration: 1.1,
        delay: 0.75,
        scrambleText: { text, chars: "upperCase", speed: 1.2 },
      });
    }

    if (bubRef.current) bubbleField(bubRef.current, 9, "rgba(194,43,74,0.15)");

    /* the cue's dot drops forever */
    gsap.fromTo(
      q(".m3-cue-dot"),
      { y: 0, opacity: 1 },
      { y: 12, opacity: 0, duration: 1.1, repeat: -1, ease: "power1.in", delay: 2 },
    );

    /* the parallax handoff: the core leaves faster than the field */
    gsap.to(q(".m3-hero-core"), {
      yPercent: -24,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
    (q("[data-par]") as HTMLElement[]).forEach((wrap) => {
      const speed = parseFloat(wrap.dataset.par || "0.2");
      gsap.fromTo(
        wrap,
        { y: 0 },
        {
          y: () => -speed * window.innerHeight,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        },
      );
    });
  }

  return (
    <section id="m3-hero" ref={root} className="m3-hero">
      <div className="m3-hero-field" aria-hidden>
        <span className="m3-sh-wrap m3-shw-arch" data-par="0.16">
          <span className="m3-shape m3-sh-arch" />
        </span>
        <span className="m3-sh-wrap m3-shw-circle" data-par="0.3">
          <span className="m3-shape m3-sh-circle" />
        </span>
        <span className="m3-sh-wrap m3-shw-pill" data-par="0.1">
          <span className="m3-shape m3-sh-pill" />
        </span>
        <span className="m3-sh-wrap m3-shw-ring" data-par="0.24">
          <span className="m3-shape m3-sh-ring" />
        </span>
        <span className="m3-sh-wrap m3-shw-cookie" data-par="0.38">
          <span className="m3-shape m3-sh-cookie">
            <svg viewBox="0 0 100 100">
              <path d={smoothBlob(50, 50, 44, 9, 0.13)} />
            </svg>
          </span>
        </span>
        <span className="m3-sh-wrap m3-shw-dot-a" data-par="0.2">
          <span className="m3-shape m3-sh-dot m3-dot-a" />
        </span>
        <span className="m3-sh-wrap m3-shw-dot-b" data-par="0.34">
          <span className="m3-shape m3-sh-dot m3-dot-b" />
        </span>
        <span className="m3-sh-wrap m3-shw-dot-c" data-par="0.14">
          <span className="m3-shape m3-sh-dot m3-dot-c" />
        </span>
        <div className="m3-bubbles" ref={bubRef} />
      </div>

      <div className="m3-hero-core">
        <p className="m3-kicker">WCH11 — WCH16</p>
        <h1 className="m3-hero-title">IAL CHEM</h1>
      </div>

      <button type="button" className="m3-cue" data-goto="2" aria-label="Scroll to the course">
        <span>scroll</span>
        <span className="m3-cue-dot" />
      </button>
    </section>
  );
}
