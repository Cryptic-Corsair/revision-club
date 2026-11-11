"use client";

import "./front.css";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ensureGsap, motionGate, scrollState } from "./kit";
import Hero from "./acts/hero";
import Marquee from "./acts/marquee";
import Units from "./acts/units";
import Loop from "./acts/loop";
import Stats from "./acts/stats";
import Finale from "./acts/finale";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the alternate front door, Material 3 edition

   The site's second homepage — a word-minimal motion poster in
   six movements. Reached from the club footer; runs as its own
   piece while mounted and owns the four things it needs:

     · the motion gate (the saved knob, or prefers-reduced-motion)
       — when it says still, no curtain, no Lenis, no GSAP: the
       finished poster, at rest.
     · Lenis — smooth scroll on the wheel, native on touch — married
       to ScrollTrigger, with the velocity channel the ticker's
       lean drinks from.
     · the load-in curtain: three tonal panels lift, the poster
       starts while the last one is still moving.
     · the fixed chrome: progress hairline, floating app bar, the
       wordless dot rail, the chapter meter — and Escape (or the
       app bar's FAB, or the finale's button) hands the room back
       to the club shell, which restores the visitor's exact view
       and scroll.
   ═══════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  { id: "m3-hero", label: "Cover" },
  { id: "m3-marquee", label: "Ticker" },
  { id: "m3-units", label: "The course" },
  { id: "m3-loop", label: "The loop" },
  { id: "m3-stats", label: "The facts" },
  { id: "m3-finale", label: "Begin" },
];

export default function Front({
  onExit,
  onOpenUnit,
}: {
  onExit?: () => void;
  onOpenUnit?: (code: string) => void;
}) {
  const [motion, setMotion] = useState(true);
  const [veilOn, setVeilOn] = useState(true);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const veilRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  /* ————— boot: gate, Lenis, ticker, curtain ————— */
  useEffect(() => {
    const gate = motionGate();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory("manual");
    /* kill the club's smooth-behavior BEFORE the jump to the top:
       with html { scroll-behavior: smooth } still live, scrollTo(0,0)
       would ease its way there and Lenis — constructed a beat later —
       would capture the old offset as its target */
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.dataset.frontMotion = gate ? "on" : "off";
    queueMicrotask(() => setMotion(gate));

    let lenis: Lenis | null = null;
    let unlisten: (() => void) | null = null;
    if (gate) {
      ensureGsap();
      lenis = new Lenis({
        smoothWheel: window.innerWidth > 820,
        syncTouch: false,
        lerp: 0.09,
      });
      /* the poster always opens at the top — pin Lenis's own target
         there, whatever offset the club page was carried in on */
      lenis.scrollTo(0, { immediate: true, force: true });
      lenisRef.current = lenis;
      /* test seams — let tooling drive deterministic scroll */
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      (window as unknown as Record<string, unknown>).__ST = ScrollTrigger;
      lenis.on("scroll", (e: { velocity: number }) => {
        scrollState.vel = e.velocity;
        ScrollTrigger.update();
      });
      /* reveals reshuffle page height — Lenis's internal limit must
         re-measure with every ScrollTrigger refresh */
      const onSTRefresh = () => lenisRef.current?.resize();
      ScrollTrigger.addEventListener("refresh", onSTRefresh);
      unlisten = () => ScrollTrigger.removeEventListener("refresh", onSTRefresh);
    }

    /* one shared ticker: feeds Lenis and decays the velocity channel */
    const tick = (time: number, deltaMS: number) => {
      lenis?.raf(time * 1000);
      const dt = Math.min(deltaMS / 1000, 0.05);
      scrollState.vel *= Math.pow(0.9, dt * 60);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;
    let veilTl: gsap.core.Timeline | null = null;
    if (!gate) {
      /* the knob says still: no curtain, everything at rest */
      queueMicrotask(() => {
        setVeilOn(false);
        setReady(true);
      });
    } else {
      (async () => {
        try {
          await document.fonts.ready;
        } catch {
          /* fonts are optional */
        }
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          const veil = veilRef.current;
          if (!veil) {
            setVeilOn(false);
            setReady(true);
            return;
          }
          /* the panels hold the door, then lift one after another —
             the poster is already moving as the last one clears */
          veilTl = gsap
            .timeline({ onComplete: () => setVeilOn(false) })
            .fromTo(
              veil.querySelector(".m3-veil-brand"),
              { opacity: 1 },
              { opacity: 0, duration: 0.3, ease: "power1.in" },
              0.45,
            )
            .to(
              veil.querySelectorAll(".m3-veil-panel"),
              { yPercent: -101, duration: 0.85, ease: "expo.inOut", stagger: 0.07 },
              0.55,
            )
            .add(() => setReady(true), 0.68);
        });
      })();
    }
    return () => {
      cancelled = true;
      veilTl?.kill();
      unlisten?.();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
      /* hand the document back to the club exactly as it was found */
      document.documentElement.style.scrollBehavior = "";
      delete document.documentElement.dataset.frontMotion;
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
      delete (window as unknown as Record<string, unknown>).__lenis;
      delete (window as unknown as Record<string, unknown>).__ST;
    };
  }, []);

  /* ————— the chapter trackers + the progress hairline ————— */
  useEffect(() => {
    if (!ready) return;
    ensureGsap();
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const ts = els.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      }),
    );
    const meter = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current)
          barRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => {
      ts.forEach((t) => t.kill());
      meter.kill();
    };
  }, [ready]);

  /* ————— leaving the poster ————— */
  useEffect(() => {
    if (!onExit) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onExit]);

  /* ————— the rail's glide ————— */
  const goTo = useCallback((i: number) => {
    const id = CHAPTERS[i]?.id;
    if (!id) return;
    const el = document.getElementById(id);
    const y = el ? el.getBoundingClientRect().top + window.scrollY + 2 : 0;
    if (lenisRef.current)
      lenisRef.current.scrollTo(y, { duration: 1.4, lock: true, force: true });
    else window.scrollTo(0, y);
  }, []);

  /* any element with data-goto rides the same glide (the cover cue) */
  useEffect(() => {
    const h = (e: Event) => {
      const t = (e.target as HTMLElement).closest("[data-goto]");
      if (!t) return;
      goTo(Number((t as HTMLElement).dataset.goto));
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [goTo]);

  return (
    <>
      {veilOn && (
        <div ref={veilRef} className="m3-veil" aria-hidden>
          <div className="m3-veil-panels">
            <span className="m3-veil-panel m3-vp-a" />
            <span className="m3-veil-panel m3-vp-b" />
            <span className="m3-veil-panel m3-vp-c" />
          </div>
          <span className="m3-veil-brand">IAL CHEM</span>
        </div>
      )}

      <div className="m3-root">
        {/* ————— fixed chrome ————— */}
        <span className="m3-progress" aria-hidden>
          <span ref={barRef} />
        </span>

        <header className="m3-bar">
          <button type="button" className="m3-bar-brand" onClick={() => goTo(0)}>
            IAL CHEM
          </button>
          <span className="m3-bar-tag">WCH11 — WCH16</span>
          {onExit && (
            <button
              type="button"
              className="m3-fab"
              onClick={onExit}
              aria-label="Back to the club"
              title="Back to the club (Escape)"
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M20 12H4m6-6-6 6 6 6" />
              </svg>
            </button>
          )}
        </header>

        <nav aria-label="Sections" className="m3-rail">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className="m3-rail-dot"
              data-on={active === i}
              onClick={() => goTo(i)}
              aria-label={c.label}
            />
          ))}
        </nav>

        <span className="m3-meter" aria-hidden>
          {String(active).padStart(2, "0")} / 05
        </span>

        {/* ————— the movements ————— */}
        <main>
          <Hero motion={motion} ready={ready} />
          <Marquee motion={motion} />
          <Units motion={motion} onOpenUnit={onOpenUnit} />
          <Loop motion={motion} />
          <Stats motion={motion} />
          <Finale motion={motion} onExit={onExit} />
        </main>
      </div>
    </>
  );
}
