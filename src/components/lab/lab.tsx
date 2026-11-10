"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import Dance from "./acts/dance";
import Atlas from "./acts/atlas";
import { ACTS, CAT_COLOR, CAT_LABEL, stage, type Element } from "./stage";

/* ═══════════════════════════════════════════════════════════════
   THE LAB · the projection booth

   Owns the four things the lab needs to run as one piece:
     · the motion gate (the saved knob, or prefers-reduced-motion)
     · Lenis — smooth scroll on the wheel, native on touch — and
       its marriage to ScrollTrigger, plus the velocity and
       pointer channels the WebGL worlds drink from
     · the load-in veil and the condensation of the first world
     · the view swap: a station opens → the lab hides, the reader
       takes the document scroll → back → ScrollTrigger
       re-measures and the lab resumes exactly where it was
   ═══════════════════════════════════════════════════════════════ */

const Reel = dynamic(() => import("./reel"), {
  ssr: false,
  loading: () => <div className="lab-stage-fallback" aria-hidden />,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const RAIL_LABEL = ACTS.map((a, i) => ({
  n: i === 5 ? "✦" : `0${i}`,
  label: a.label,
}));

export default function Lab() {
  const [ready, setReady] = useState(false);
  const [motion, setMotion] = useState(true);
  const [veilOn, setVeilOn] = useState(true);
  const [active, setActive] = useState(0);
  const [doc, setDoc] = useState<string | null>(null);
  const [tip, setTip] = useState<{
    sym: string;
    name: string;
    z: number;
    tint: string;
    catLabel: string;
    x: number;
    y: number;
  } | null>(null);
  const savedY = useRef(0);
  const veilRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const actNumRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const pointerRaw = useRef({ x: 0, y: 0, seen: false });
  const cleanupRef = useRef<(() => void) | null>(null);

  /* ————— boot: motion gate, Lenis, the shared channels, veil ————— */
  useEffect(() => {
    let gate = true;
    try {
      const p = JSON.parse(
        localStorage.getItem("reaction-club-prefs-v1") || "null",
      );
      if (p && p.motion === false) gate = false;
    } catch {
      /* no prefs — the lab runs */
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      gate = false;
    stage.motion = gate;
    stage.act = 0;
    stage.actProg = 0;
    /* the lab always opens on act zero, whatever the browser remembers */
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    /* …and ScrollTrigger must never save/restore scroll positions
       behind our back — its refresh-time restore would fight the
       glides the moment a pin engages or releases */
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);
    /* smooth native scrolling fights the pins and Lenis — the lab
       does its own gliding */
    document.documentElement.style.scrollBehavior = "auto";
    queueMicrotask(() => setMotion(gate));
    document.documentElement.dataset.labMotion = gate ? "on" : "off";

    let lenis: Lenis | null = null;
    if (gate) {
      lenis = new Lenis({
        smoothWheel: window.innerWidth > 820,
        syncTouch: false,
        lerp: 0.09,
      });
      lenisRef.current = lenis;
      /* test seam — lets tooling drive deterministic scroll */
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      lenis.on("scroll", (e: { velocity: number }) => {
        stage.rawVel = e.velocity;
        ScrollTrigger.update();
      });
      /* the pins reshuffle the page's height when they engage —
         Lenis's internal limit must re-measure with every refresh,
         or every glide clamps at the pre-pin height */
      const onSTRefresh = () => lenisRef.current?.resize();
      ScrollTrigger.addEventListener("refresh", onSTRefresh);
      cleanupRef.current = () =>
        ScrollTrigger.removeEventListener("refresh", onSTRefresh);
    }

    /* one shared ticker: feeds Lenis, smooths the velocity and
       pointer channels — the only per-frame CPU the DOM pays */
    const tick = (time: number, deltaMS: number) => {
      lenis?.raf(time * 1000);
      const dt = Math.min(deltaMS / 1000, 0.05);
      const vt = Math.min(Math.abs(stage.rawVel) / 55, 1);
      stage.vel += (vt - stage.vel) * Math.min(dt * 5, 1);
      stage.rawVel *= Math.pow(0.9, dt * 60);
      const k = Math.min(dt * 6, 1);
      stage.pointerX += (pointerRaw.current.x - stage.pointerX) * k;
      stage.pointerY += (pointerRaw.current.y - stage.pointerY) * k;
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerRaw.current.seen = true;
      pointerRaw.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRaw.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let cancelled = false;
    if (!gate) {
      /* the knob says still: no veil, one honest still per act */
      queueMicrotask(() => {
        stage.intro = 1;
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
          /* the veil may have already been lifted by a fast remount —
             only roll the countdown when the curtain is really there */
          const veil = veilRef.current;
          const word = veil?.querySelector(".veil-word");
          if (!veil || !word) {
            setVeilOn(false);
            setReady(true);
            stage.intro = 1;
            return;
          }
          const counter = { v: 0 };
          const numEl = veil.querySelector(".veil-num");
          gsap
            .timeline({ onComplete: () => setVeilOn(false) })
            .fromTo(
              word,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: "power2.out" },
              0,
            )
            .fromTo(
              veil.querySelector(".veil-line"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
              0.05,
            )
            .to(
              counter,
              {
                v: 100,
                duration: 0.85,
                ease: "power1.inOut",
                onUpdate: () => {
                  if (numEl)
                    numEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
                },
              },
              0.05,
            )
            .add(() => setReady(true), 0.55)
            .to(veil, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 0.95);
          gsap.to(stage, { intro: 1, duration: 2.4, ease: "expo.out", delay: 0.9 });
        });
      })();
    }
    return () => {
      cancelled = true;
      cleanupRef.current?.();
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ————— the corner meters ————— */
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (pctRef.current)
          pctRef.current.textContent = String(
            Math.round(self.progress * 100),
          ).padStart(2, "0");
      },
    });
    return () => st.kill();
  }, [ready, doc]);

  /* ————— the view swap: lab ⇄ reader ————— */
  useEffect(() => {
    if (doc) {
      document.documentElement.classList.add("lab-reading");
      stage.reading = true;
      lenisRef.current?.stop();
      window.scrollTo(0, 0);
    } else {
      document.documentElement.classList.remove("lab-reading");
      stage.reading = false;
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

  /* ————— the rail's glide —————
     each pinned act's ScrollTrigger knows its own start; find it
     by the section element at click time instead of trusting a
     channel that only fills while an act is active */
  const goTo = useCallback((i: number) => {
    let y = 0;
    if (i === 5) {
      const atlas = document.getElementById("lab-atlas");
      const st = ScrollTrigger.getAll().find((t) => t.trigger === atlas);
      y = (st ? st.start : 0) + window.innerHeight * 0.55;
    } else {
      const sec = document.querySelector(`.lab-act[data-act="${i}"]`);
      const st = ScrollTrigger.getAll().find((t) => t.trigger === sec);
      y = (st ? st.start : 0) + 2;
    }
    /* lock: no input interrupts the glide; force: glide even if a
       previous animation was stopped mid-way */
    if (lenisRef.current)
      lenisRef.current.scrollTo(y, { duration: 1.4, lock: true, force: true });
    else window.scrollTo(0, y);
  }, []);

  const setActiveSafe = useCallback((i: number) => {
    if (activeRef.current !== i) {
      activeRef.current = i;
      setActive(i);
    }
  }, []);

  /* the acts register themselves on the shared channels; the lab
     only needs to know which one is live, for the chrome */
  const onAct = useCallback(
    (i: number) => (self: {
      progress: number;
      start: number;
      isActive: boolean;
    }) => {
      if (!self.isActive) return; /* refreshes must not hijack the stage */
      stage.act = i;
      stage.actProg = self.progress;
      setActiveSafe(i);
    },
    [setActiveSafe],
  );

  /* the act writers must hold STABLE identities — a fresh closure
     per render would tear down and rebuild every pinned
     ScrollTrigger on each act change, and the pin reverts fire
     native scrolls that kill Lenis mid-glide */
  const actWriters = useMemo(() => ACTS.map((_, i) => onAct(i)), [onAct]);

  /* ————— the element tooltip trails the pointer ————— */
  useEffect(() => {
    if (!tip) return;
    const move = (e: PointerEvent) => {
      const t = tipRef.current;
      if (!t) return;
      const flip = e.clientX > window.innerWidth - 280;
      t.style.transform = `translate3d(${e.clientX + (flip ? -266 : 18)}px, ${e.clientY - 18}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [tip]);

  const onHover = useCallback((el: Element | null, hx = 0, hy = 0) => {
    setTip(
      el
        ? {
            sym: el.sym,
            name: el.name,
            z: el.z,
            tint: CAT_COLOR[el.cat],
            catLabel: CAT_LABEL[el.cat],
            x: hx,
            y: hy,
          }
        : null,
    );
  }, []);

  return (
    <>
      {veilOn && (
        <div ref={veilRef} className="lab-veil" aria-hidden>
          <div className="flex flex-col items-center gap-5">
            <span className="veil-word f-display text-[15px] font-bold tracking-[0.1em] text-white/90">
              IAL·CHEM
            </span>
            <span className="veil-line w-44" />
            <span className="f-mono flex w-44 items-baseline justify-between text-[9px] text-white/40">
              <span>the lab is warming up</span>
              <span className="veil-num">000</span>
            </span>
          </div>
        </div>
      )}

      <div className="lab-root min-h-screen">
        <div className="lab-shell">
          <Reel
            motion={motion}
            reading={!!doc}
            onHover={onHover}
            actKey={active}
          />
          <div className="lab-vignette" aria-hidden />
          <div className="lab-grain" aria-hidden />

          {/* ————— fixed chrome ————— */}
          <header className="lab-chrome pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-9 sm:py-5">
            <button
              type="button"
              onClick={() => goTo(0)}
              data-cursor
              className="f-display pointer-events-auto cursor-pointer text-[15px] font-bold tracking-[0.1em]"
            >
              IAL·CHEM
            </button>
            <span className="f-mono hidden text-[9px] text-white/40 sm:block">
              a visual syllabus
            </span>
            <button
              type="button"
              onClick={() => goTo(5)}
              data-cursor
              className="f-mono pointer-events-auto cursor-pointer rounded-full border border-white/30 px-4 py-2 text-[9px] transition-colors hover:border-white/75"
            >
              The atlas · 18 chapters
            </button>
          </header>

          <nav
            aria-label="Acts"
            className="lab-rail lab-chrome fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 sm:left-7 sm:block"
          >
            <ul className="flex flex-col gap-5">
              {RAIL_LABEL.map((it, i) => (
                <li key={i} className="flex items-center gap-3">
                  <button
                    type="button"
                    data-on={active === i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${it.label}`}
                    className="rail-tick cursor-pointer"
                  />
                  <span className="rail-num f-mono whitespace-nowrap text-[9px]">
                    {it.n} · {it.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lab-chrome pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between px-5 py-4 sm:px-9">
            <span className="f-mono text-[9px] text-white/50">
              An IAL Chemistry lab
            </span>
            <span className="f-mono text-right text-[9px] text-white/50">
              <span className="block text-[11px] text-white/85">
                {`0${active}`} · {ACTS[active].label.toUpperCase()}
              </span>
              <span>
                <span ref={pctRef}>00</span> / 100
              </span>
            </span>
          </div>

          {/* ————— the acts ————— */}
          <main>
            <Hero ready={ready} onAct={actWriters[0]} />
            <Cast onAct={actWriters[1]} />
            <Bond onAct={actWriters[2]} />
            <Price onAct={actWriters[3]} />
            <Dance onAct={actWriters[4]} />
            <Atlas onOpenDoc={openDoc} onAct={actWriters[5]} />
            <footer className="lab-foot relative z-10 flex items-center justify-between px-6 pb-8 pt-2 sm:px-14">
              <span className="f-mono text-[9px] text-white/35">
                IAL CHEM · a revision club
              </span>
              <span className="f-mono text-[9px] text-white/35">
                WCH11 — WCH13 · built for the wall
              </span>
            </footer>
          </main>

          {/* ————— the element tooltip ————— */}
          {tip && (
            <div
              ref={tipRef}
              className="lab-tip"
              aria-hidden
              style={{
                transform: `translate3d(${tip.x + (tip.x > window.innerWidth - 280 ? -266 : 18)}px, ${tip.y - 18}px, 0)`,
              }}
            >
              <span
                className="f-display text-3xl font-extrabold"
                style={{ color: tip.tint }}
              >
                {tip.sym}
              </span>
              <span className="f-mono mt-1 block text-[10px] text-white/85">
                {tip.name} · {tip.z}
              </span>
              <span
                className="f-mono mt-0.5 block text-[8px]"
                style={{ color: tip.tint }}
              >
                {tip.catLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      {doc && <Reader docId={doc} onBack={closeDoc} />}
    </>
  );
}
