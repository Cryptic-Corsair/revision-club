"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Cursor from "./cursor";
import Reader from "./reader";
import Hero from "./acts/hero";
import Cast from "./acts/cast";
import Bond from "./acts/bond";
import Price from "./acts/price";
import Balance from "./acts/balance";
import Atlas from "./acts/atlas";
import Foot from "./acts/foot";
import { motionGate, scrollState } from "./gate";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the front desk

   The site's ALTERNATE front door — the club's candy shop stays
   the default; this one is reached from the club footer and runs
   as its own piece while mounted. Owns the four things it needs:
     · the motion gate (the saved knob, or prefers-reduced-motion)
     · Lenis — smooth scroll on the wheel, native on touch — and
       its marriage to ScrollTrigger, plus the velocity channel
       the balance marquee drinks from
     · the fixed chrome: progress hairline, header, the chapter
       rail, the meters — and the load-in curtain
     · the view swap: a station opens → the front hides, the reader
       takes the document scroll → back → ScrollTrigger re-measures
       and the front resumes exactly where it was — and Escape (or
       the header pill, or the finale's second button) hands the
       room back to the club shell, which restores the visitor's
       exact view and scroll
   ═══════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  { id: "fr-hero", n: "00", label: "Intro" },
  { id: "fr-cast", n: "01", label: "The cast" },
  { id: "fr-bond", n: "02", label: "The bond" },
  { id: "fr-price", n: "03", label: "The price" },
  { id: "fr-bal", n: "04", label: "The balance" },
  { id: "fr-atlas", n: "✦", label: "The atlas" },
];

export default function Front({ onExit }: { onExit?: () => void }) {
  const [ready, setReady] = useState(false);
  const [motion, setMotion] = useState(true);
  const [veilOn, setVeilOn] = useState(true);
  const [active, setActive] = useState(0);
  const [doc, setDoc] = useState<string | null>(null);
  const savedY = useRef(0);
  const veilRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  /* ————— boot: motion gate, Lenis, shared channels, curtain ————— */
  useEffect(() => {
    /* one gate, read once — the acts read the same cached verdict */
    const gate = motionGate();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    /* ScrollTrigger must never save/restore scroll behind our back */
    ScrollTrigger.clearScrollMemory("manual");
    /* kill the club's smooth-behavior BEFORE the jump to the top:
       with html { scroll-behavior: smooth } still live, scrollTo(0,0)
       would ease its way there and Lenis — constructed a beat later —
       would capture the old offset as its target and yank the room
       straight back to wherever the footer stood. */
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.dataset.frontMotion = gate ? "on" : "off";
    queueMicrotask(() => setMotion(gate));

    let lenis: Lenis | null = null;
    if (gate) {
      lenis = new Lenis({
        smoothWheel: window.innerWidth > 820,
        syncTouch: false,
        lerp: 0.09,
      });
      /* the front always opens at the top — pin Lenis's own target
         there too, whatever offset the club page was carried in on */
      lenis.scrollTo(0, { immediate: true, force: true });
      lenisRef.current = lenis;
      /* test seam — lets tooling drive deterministic scroll */
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      (window as unknown as Record<string, unknown>).__ST = ScrollTrigger;
      lenis.on("scroll", (e: { velocity: number }) => {
        scrollState.vel = e.velocity;
        ScrollTrigger.update();
      });
      /* sticky stages and reveals reshuffle page height — Lenis's
         internal limit must re-measure with every refresh */
      const onSTRefresh = () => lenisRef.current?.resize();
      ScrollTrigger.addEventListener("refresh", onSTRefresh);
      cleanupRef.current = () =>
        ScrollTrigger.removeEventListener("refresh", onSTRefresh);
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
          gsap
            .timeline({ onComplete: () => setVeilOn(false) })
            .fromTo(
              veil.querySelector(".fr-veil-brand"),
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              0,
            )
            .fromTo(
              veil.querySelector(".fr-veil-line"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
              0.1,
            )
            .add(() => setReady(true), 0.45)
            .to(veil, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 0.75);
        });
      })();
    }
    return () => {
      cancelled = true;
      cleanupRef.current?.();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
      /* hand the document back to the club exactly as it was found:
         native scroll behavior, no front-motion stamp, no reading
         class, the browser's own scroll restoration */
      document.documentElement.style.scrollBehavior = "";
      delete document.documentElement.dataset.frontMotion;
      document.documentElement.classList.remove("fr-reading");
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
      delete (window as unknown as Record<string, unknown>).__lenis;
      delete (window as unknown as Record<string, unknown>).__ST;
    };
  }, []);

  /* ————— the chapter trackers + the progress hairline ————— */
  useEffect(() => {
    if (!ready) return;
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
        if (pctRef.current)
          pctRef.current.textContent = String(
            Math.round(self.progress * 100),
          ).padStart(2, "0");
        if (barRef.current)
          barRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => {
      ts.forEach((t) => t.kill());
      meter.kill();
    };
  }, [ready, doc]);

  /* ————— the view swap: front ⇄ reader ————— */
  useEffect(() => {
    if (doc) {
      document.documentElement.classList.add("fr-reading");
      lenisRef.current?.stop();
      window.scrollTo(0, 0);
    } else {
      document.documentElement.classList.remove("fr-reading");
      lenisRef.current?.start();
    }
  }, [doc]);

  const openDoc = useCallback((id: string) => {
    savedY.current = window.scrollY;
    setDoc(id);
  }, []);

  const closeDoc = useCallback(() => {
    setDoc(null);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lenisRef.current?.resize();
        const y = savedY.current;
        if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      }),
    );
  }, []);

  /* ————— leaving the front —————
     Escape (with no reader open) hands the room back to the club
     shell, same as the header pill and the finale's second button. */
  useEffect(() => {
    if (!onExit) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !doc) onExit();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onExit, doc]);

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

  /* the hero's CTA buttons ride the same glide */
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
        <div ref={veilRef} className="fr-veil" aria-hidden>
          <div className="flex flex-col items-center gap-4">
            <span className="fr-veil-brand f-display text-[15px] font-bold tracking-[0.1em]">
              IAL·CHEM
            </span>
            <span className="fr-veil-line w-44" />
            <span className="f-mono text-[9px] text-ink-faint">
              the front door is opening
            </span>
          </div>
        </div>
      )}

      <div className="fr-root min-h-screen">
        {/* ————— fixed chrome ————— */}
        <span className="fr-progress" aria-hidden>
          <span ref={barRef} />
        </span>

        <header className="fr-header">
          <button
            type="button"
            data-cursor
            onClick={() => goTo(0)}
            className="f-display cursor-pointer text-[15px] font-bold tracking-[0.08em]"
          >
            IAL·CHEM
          </button>
          <span className="f-mono hidden text-[9px] text-ink-faint sm:block">
            a revision club · the alternate front door
          </span>
          <span className="flex items-center gap-2">
            {onExit && (
              <button
                type="button"
                data-cursor
                onClick={onExit}
                className="f-mono fr-pill"
                title="Back to the club (Escape)"
              >
                The club ↗
              </button>
            )}
            <button
              type="button"
              data-cursor
              onClick={() => goTo(5)}
              className="f-mono fr-pill"
            >
              The atlas · 18 stations
            </button>
          </span>
        </header>

        <nav aria-label="Chapters" className="fr-rail" data-hide={active === 0}>
          <ul>
            {CHAPTERS.map((c, i) => (
              <li key={c.id} data-on={active === i}>
                <button
                  type="button"
                  data-cursor
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${c.label}`}
                  className="fr-rail-tick cursor-pointer"
                />
                <span className="f-mono">
                  {c.n} · {c.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="fr-meter">
          <span className="f-mono block text-[10px]">
            {CHAPTERS[active]?.n} · {CHAPTERS[active]?.label.toUpperCase()}
          </span>
          <span className="f-mono text-[9px] text-ink-faint">
            <span ref={pctRef}>00</span> / 100
          </span>
        </div>

        {/* ————— the chapters ————— */}
        <main>
          <Hero motion={motion} ready={ready} sleeping={!!doc} />
          <Cast />
          <Bond />
          <Price />
          <Balance />
          <Atlas onOpenDoc={openDoc} />
          <Foot onOpenDoc={openDoc} onExit={onExit} />
        </main>

        <Cursor motion={motion} />
      </div>

      {doc && <Reader docId={doc} onBack={closeDoc} />}
    </>
  );
}
