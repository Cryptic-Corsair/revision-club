"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapHead } from "../chap";
import { motionGate, scrollState } from "../gate";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · chapter 04 — the balance

   Equilibrium as two bars meeting: start the Haber mixture and the
   forward rate is all you have; as you scroll, the reverse rate
   climbs until both run at the same pace. Underneath, a marquee
   that literally runs with your scroll — its speed and direction
   follow the wheel, stress and shift. Two mechanisms, neither of
   which the chapters above or below use.
   ═══════════════════════════════════════════════════════════════ */

const STRIP = "STRESS THE SYSTEM — THE SYSTEM SHIFTS — ";

export default function Balance() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionGate()) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* pre-state explicitly — nothing shows before its cue */
      gsap.set(".fr-rate-fwd-fill", { scaleX: 0.92 });
      gsap.set(".fr-rate-rev-fill", { scaleX: 0.04 });
      gsap.set([".fr-rate-fwd-val", ".fr-rate-rev-val"], { opacity: 0 });
      gsap.set(".fr-bal-stamp", { opacity: 0, scale: 0.82, rotate: -4 });
      gsap.set(".fr-bal-note", { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".fr-bal-window",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      /* forward rate sags, reverse rate climbs, they meet at 50% */
      tl.to(".fr-rate-fwd-fill", { scaleX: 0.5, duration: 7, ease: "power1.inOut" }, 0)
        .to(".fr-rate-rev-fill", { scaleX: 0.5, duration: 7, ease: "power1.inOut" }, 0)
        .to(".fr-rate-fwd-val", { opacity: 1, duration: 0.5 }, 0.4)
        .to(".fr-rate-rev-val", { opacity: 1, duration: 0.5 }, 1.2)
        .to(".fr-bal-stamp", { opacity: 1, scale: 1, rotate: -2, duration: 1.2, ease: "back.out(1.9)" }, 6.6)
        .to(".fr-bal-note", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 7.4);
    }, el);
    return () => ctx.revert();
  }, []);

  /* the marquee runs with your scroll: speed and direction follow
     the wheel through a smoothed velocity channel */
  useEffect(() => {
    if (!motionGate()) return;
    const track = trackRef.current;
    if (!track) return;
    const seq = track.querySelector<HTMLElement>(".fr-bal-seq");
    if (!seq) return;

    let pos = 0;
    let vel = 0;
    const tick = (_t: number, dms: number) => {
      const dt = Math.min(dms / 1000, 0.05);
      vel += (scrollState.vel - vel) * Math.min(dt * 6, 1);
      const speed = 26 + vel * 300;
      pos += speed * dt;
      const half = seq.offsetWidth;
      if (half > 0) pos = ((pos % half) + half) % half;
      track.style.transform = `translate3d(${-pos}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <section ref={root} className="fr-chap fr-bal" data-act="4" id="fr-bal">
      <ChapHead
        n="04"
        kicker="THE BALANCE · KINETICS & EQUILIBRIA"
        accent="var(--color-mint)"
        title={
          <>
            Everything balances.
            <em> Nothing ever stops moving.</em>
          </>
        }
        lede="Start the Haber mixture and only the forward reaction runs. As ammonia builds, the way back opens — until both directions run at exactly the same pace. Scroll and watch them meet."
      />

      <div className="fr-bal-window">
        <div className="fr-bal-stage">
          <div className="fr-rate" style={{ ["--tint" as string]: "var(--color-mint)" }}>
            <div className="fr-rate-head f-mono">
              <span>forward rate</span>
              <span>N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub></span>
            </div>
            <div className="fr-rate-bar">
              <span className="fr-rate-fill fr-rate-fwd-fill" />
              <span className="fr-rate-val fr-rate-fwd-val">falling as the nitrogen runs out</span>
            </div>
          </div>

          <div className="fr-rate" style={{ ["--tint" as string]: "var(--color-grape)" }}>
            <div className="fr-rate-head f-mono">
              <span>reverse rate</span>
              <span>2NH<sub>3</sub> → N<sub>2</sub> + 3H<sub>2</sub></span>
            </div>
            <div className="fr-rate-bar">
              <span className="fr-rate-fill fr-rate-rev-fill" />
              <span className="fr-rate-val fr-rate-rev-val">rising as the ammonia gathers</span>
            </div>
          </div>

          <div className="fr-bal-stamp" aria-hidden>
            <span className="f-mono">rate forward = rate reverse</span>
            <strong>EQUILIBRIUM</strong>
          </div>

          <p className="fr-bal-note">
            Both reactions are still running at the balance point — just as
            fast in one direction as the other. Dynamic, not dead.
          </p>
        </div>
      </div>

      <div className="fr-bal-strip" aria-hidden>
        <div ref={trackRef} className="fr-bal-track">
          {[0, 1].map((k) => (
            <span key={k} className="fr-bal-seq">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i}>
                  <svg viewBox="0 0 28 16" className="fr-bal-arrows" aria-hidden>
                    <path d="M4 5h16m0 0-4-3m4 3-4 3M24 11H8m0 0 4-3m-4 3 4 3" />
                  </svg>
                  {STRIP}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
