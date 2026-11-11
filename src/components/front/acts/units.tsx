"use client";

import type { CSSProperties } from "react";
import gsap from "gsap";
import { UNITS } from "@/lib/spectra/units";
import { smoothBlob, useActAnim } from "../kit";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · 03 — the course

   The one dark movement: the inverse-surface ground, six unit
   cards on a three-across grid that shears apart as the section
   transits — every third card rides its own scrubbed speed, so
   the grid reads as three parallax columns. Every card is a tonal
   container mixed from its own candy colour, breathing on a slow
   yoyo; codes scramble in when the section arrives. A card tap is
   an exit: the poster hands the room back and the club opens that
   unit.
   ═══════════════════════════════════════════════════════════════ */

export default function Units({
  motion,
  onOpenUnit,
}: {
  motion: boolean;
  onOpenUnit?: (code: string) => void;
}) {
  const root = useActAnim<HTMLElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const arrive = { trigger: el, start: "top 72%", once: true } as const;

    /* cards rise in */
    gsap.from(q(".m3-ucard"), {
      y: 72,
      autoAlpha: 0,
      duration: 0.9,
      ease: "m3-dec",
      stagger: 0.09,
      scrollTrigger: arrive,
    });

    /* codes and the eyebrow decode */
    (q(".m3-scramble") as HTMLElement[]).forEach((c, i) => {
      const text = c.dataset.text ?? c.textContent ?? "";
      gsap.to(c, {
        duration: 1.5,
        delay: i * 0.12,
        scrambleText: { text, chars: "lowerCase", speed: 1.4 },
        scrollTrigger: arrive,
      });
    });

    /* the breathe — delayed until the rise has landed, then forever */
    (q(".m3-ucard") as HTMLElement[]).forEach((c) => {
      gsap.to(c, {
        y: "+=6",
        duration: gsap.utils.random(2.8, 4.4),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2,
      });
    });

    /* the column shear — every third card shares a speed, so the
       grid moves as three columns. Desktop only. */
    if (window.innerWidth >= 820) {
      (q(".m3-ucard") as HTMLElement[]).forEach((card, i) => {
        const lane = i % 3;
        gsap.fromTo(
          card,
          { y: (1 - lane) * 80 },
          {
            y: (lane - 1) * 80,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }

    /* the outline cookie drifts against the flow */
    gsap.fromTo(
      q(".m3-units-deco"),
      { y: 90 },
      {
        y: -130,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  return (
    <section id="m3-units" ref={root} className="m3-units">
      <div className="m3-units-inner">
        <p className="m3-eyebrow m3-scramble" data-text="the course">
          the course
        </p>
        <div className="m3-cols">
          {UNITS.map((u) => (
            <button
              type="button"
              key={u.code}
              className="m3-ucard"
              style={{ "--u": u.candy.main } as CSSProperties}
              onClick={() => onOpenUnit?.(u.code)}
              aria-label={`Unit ${u.index} — ${u.shortTitle}. Opens in the club.`}
            >
              <span className="m3-ucard-num">{String(u.index).padStart(2, "0")}</span>
              <span className="m3-ucard-meta">
                <span className="m3-ucard-code m3-scramble" data-text={u.code}>
                  {u.code}
                </span>
                <span className="m3-ucard-name">{u.shortTitle}</span>
              </span>
              <svg className="m3-ucard-arrow" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <svg className="m3-units-deco" viewBox="0 0 100 100" aria-hidden>
        <path d={smoothBlob(50, 50, 46, 10, 0.1)} />
      </svg>
    </section>
  );
}
