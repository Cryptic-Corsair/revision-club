"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapHead } from "../chap";
import { motionGate } from "../gate";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · chapter 02 — the bond

   A meet-cute scrubbed by the scrollbar: sodium walks in from the
   west, chlorine from the east, one electron changes hands, the
   bond line draws, and the equation assembles itself in the plate.
   CSS sticky holds the stage while a 240vh runway feeds progress —
   no GSAP pins, nothing to fight Lenis. CSS defaults are the final
   resting state; GSAP only takes control when motion is on.
   ═══════════════════════════════════════════════════════════════ */

const CARDS = [
  {
    key: "ionic",
    tint: "var(--color-grape)",
    title: "Ionic",
    copy: "Electrons handed over. Opposite charges hold the lattice.",
    diagram: (
      <svg viewBox="0 0 64 32" aria-hidden>
        <circle cx="20" cy="16" r="9" />
        <path d="M17 16h6M20 13v6" className="d-ink" />
        <circle cx="44" cy="16" r="9" />
        <path d="M41 16h6" className="d-ink" />
        <path d="M30 16h4" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    key: "covalent",
    tint: "var(--color-coral)",
    title: "Covalent",
    copy: "Electrons shared in pairs. Molecules, not lattices.",
    diagram: (
      <svg viewBox="0 0 64 32" aria-hidden>
        <circle cx="24" cy="16" r="10" />
        <circle cx="40" cy="16" r="10" />
        <circle cx="32" cy="16" r="3" className="d-fill" />
      </svg>
    ),
  },
  {
    key: "metallic",
    tint: "var(--color-tangerine)",
    title: "Metallic",
    copy: "Cations in a sea of loose electrons. Conducts, bends.",
    diagram: (
      <svg viewBox="0 0 64 32" aria-hidden>
        {[
          [14, 8],
          [32, 8],
          [50, 8],
          [23, 20],
          [41, 20],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" />
        ))}
        <path d="M6 27c6-3 12 3 18 0s12 3 18 0 12 3 16 0" strokeDasharray="3 4" />
      </svg>
    ),
  },
  {
    key: "imf",
    tint: "var(--color-mint)",
    title: "Intermolecular",
    copy: "Not bonds — attractions between neighbours. Weakest, everywhere.",
    diagram: (
      <svg viewBox="0 0 64 32" aria-hidden>
        <rect x="6" y="10" width="14" height="12" rx="2" />
        <path d="M10 16h6" className="d-ink" />
        <rect x="44" y="10" width="14" height="12" rx="2" />
        <path d="M48 16h6" className="d-ink" />
        <path d="M22 16h20" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

export default function Bond() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionGate()) return;
    const el = root.current;
    if (!el) return;

    /* the electron must fly exactly chip-centre to chip-centre at any
       viewport — measure the chips live and let invalidateOnRefresh
       re-invoke the function-based values on every resize */
    const spreadX = () => {
      const na = el.querySelector(".fr-ion-na");
      const stage = el.querySelector(".fr-bond-stage");
      if (!na || !stage) return 0;
      const nr = na.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      return nr.left + nr.width / 2 - (sr.left + sr.width / 2);
    };

    const ctx = gsap.context(() => {
      /* pre-state everything explicitly — staggered fromTo tweens only
         immediate-render their first element, so the rest would show
         before their cue; set + to survives every refresh intact */
      gsap.set(".fr-ion-na", { x: () => -innerWidth * 0.3, opacity: 0, scale: 0.85 });
      gsap.set(".fr-ion-cl", { x: () => innerWidth * 0.3, opacity: 0, scale: 0.85 });
      gsap.set(".fr-bond-label", { opacity: 0, y: 10 });
      gsap.set(".fr-electron", { opacity: 0, scale: 0.4, x: () => -spreadX() });
      gsap.set([".fr-badge-na", ".fr-badge-cl"], { scale: 0, opacity: 0 });
      gsap.set(".fr-bond-bar", { scaleX: 0 });
      gsap.set(".fr-eq-t", { yPercent: 130, opacity: 0 });
      gsap.set([".fr-cap-1", ".fr-cap-2", ".fr-cap-3"], { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".fr-bond-window",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      /* — the approach — */
      tl.to(".fr-ion-na", { x: "0vw", opacity: 1, scale: 1, duration: 2 }, 0)
        .to(".fr-ion-cl", { x: "0vw", opacity: 1, scale: 1, duration: 2 }, 0.4)
        .to(".fr-bond-label", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, 1.4)

      /* — the hand-off — */
        .to(".fr-electron", { opacity: 1, scale: 1, duration: 0.4 }, 3.0)
        .to(".fr-electron", { x: () => -spreadX(), y: () => -innerHeight * 0.05, duration: 1.1 }, 3.4)
        .to(".fr-electron", { x: () => spreadX(), y: 0, duration: 1.1 }, 4.5)
        .to(".fr-electron", { opacity: 0, scale: 0.4, duration: 0.5 }, 5.6)
        .to(".fr-badge-na", { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" }, 5.6)
        .to(".fr-badge-cl", { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" }, 5.8)

      /* — the bridge — */
        .to(".fr-bond-bar", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 5.7)

      /* — the equation assembles — */
        .to(".fr-eq-t", { yPercent: 0, opacity: 1, duration: 0.5, ease: "back.out(1.8)", stagger: 0.18 }, 6.4);

      /* — captions trade places — */
      gsap.timeline({
        scrollTrigger: {
          trigger: ".fr-bond-window",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(".fr-cap-1", { opacity: 1, duration: 0.6 }, 0.4)
        .to(".fr-cap-1", { opacity: 0, duration: 0.6 }, 2.9)
        .to(".fr-cap-2", { opacity: 1, duration: 0.6 }, 3.5)
        .to(".fr-cap-2", { opacity: 0, duration: 0.6 }, 5.7)
        .to(".fr-cap-3", { opacity: 1, duration: 0.8 }, 6.6);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="fr-chap fr-bond" data-act="2" id="fr-bond">
      <ChapHead
        n="02"
        kicker="THE BOND · BONDING & STRUCTURE"
        accent="var(--color-coral)"
        title={
          <>
            Nothing stands alone.
            <em> Everything holds on to something.</em>
          </>
        }
        lede="Chemistry is the trading of electrons. Scroll — the page makes salt while you watch."
      />

      {/* ————— the runway: scroll drives the choreography ————— */}
      <div className="fr-bond-window">
        <div className="fr-bond-stage">
          <div className="fr-ion fr-ion-na" style={{ ["--tint" as string]: "#FF5C7A" }}>
            <span className="fr-ion-sym">Na</span>
            <span className="fr-ion-name f-mono">sodium · metal</span>
            <span className="fr-ion-badge fr-badge-na">+</span>
          </div>

          <div className="fr-ion fr-ion-cl" style={{ ["--tint" as string]: "#3B7DE0" }}>
            <span className="fr-ion-sym">Cl</span>
            <span className="fr-ion-name f-mono">chlorine · non-metal</span>
            <span className="fr-ion-badge fr-badge-cl">−</span>
          </div>

          <span className="fr-bond-bar" aria-hidden />
          <span className="fr-electron" aria-hidden />

          <div className="fr-bond-caps" aria-hidden>
            <p className="fr-bond-cap fr-cap-1">one electron changes hands…</p>
            <p className="fr-bond-cap fr-cap-2">the charges pull the ions together</p>
            <p className="fr-bond-cap fr-cap-3">sodium chloride — an ionic bond, the lattice grows</p>
          </div>

          <p className="fr-bond-eq" aria-label="2 Na + Cl2 gives 2 NaCl">
            {["2", "Na", "+", "Cl", <sub key="s">2</sub>, "→", "2", "Na", "Cl"].map(
              (t, i) => (
                <span key={i} className="fr-eq-t">
                  {t}
                </span>
              ),
            )}
          </p>
        </div>
      </div>

      {/* ————— the four ways things hold ————— */}
      <div className="fr-bond-cards">
        {CARDS.map((c) => (
          <article key={c.key} className="fr-struct" style={{ ["--tint" as string]: c.tint }}>
            <div className="fr-struct-d">{c.diagram}</div>
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

