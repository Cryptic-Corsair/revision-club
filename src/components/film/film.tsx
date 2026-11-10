"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AtomCanvas from "./atom-canvas";
import { Story } from "./story";
import Reader from "./reader";
import { stage, filmScroll } from "./stage";

/* ═══════════════════════════════════════════════════════════════
   THE FILM · the projection booth

   Owns the four things the film needs to run as one piece:
     · the motion gate (the saved knob, or prefers-reduced-motion)
     · the load-in veil and the hand-off to the story's intro
     · the fixed chrome — wordmark, atlas hop, chapter rail, and
       the little scroll-o-meter in the corner
     · the view swap: a station opens → the film shell hides, the
       reader takes the document scroll → back → ScrollTrigger
       re-measures and the film resumes exactly where it was
   ═══════════════════════════════════════════════════════════════ */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const RAIL = [
  { n: "I", label: "Atoms" },
  { n: "II", label: "Bonds" },
  { n: "III", label: "Energy" },
  { n: "IV", label: "Life" },
  { n: "✦", label: "The atlas" },
];

export default function Film() {
  const [ready, setReady] = useState(false);
  const [veilOn, setVeilOn] = useState(true);
  const [active, setActive] = useState(0);
  const [doc, setDoc] = useState<string | null>(null);
  const savedY = useRef(0);
  const veilRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  /* ————— boot: motion gate + the veil ————— */
  useEffect(() => {
    let motion = true;
    try {
      const p = JSON.parse(
        localStorage.getItem("reaction-club-prefs-v1") || "null",
      );
      if (p && p.motion === false) motion = false;
    } catch {
      /* no prefs — the film rolls */
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      motion = false;
    stage.motion = motion;
    document.documentElement.dataset.filmMotion = motion ? "on" : "off";

    if (!motion) {
      /* the knob says still: no veil, no condensation, one honest sky */
      queueMicrotask(() => {
        stage.intro = 1;
        setVeilOn(false);
        setReady(true);
      });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* fonts are optional; the film is not */
      }
      if (cancelled) return;
      requestAnimationFrame(() => {
        const veil = veilRef.current;
        if (!veil) return;
        /* measurements were taken with fallback metrics — re-measure
           once the real faces are in */
        ScrollTrigger.refresh();
        gsap
          .timeline({ onComplete: () => setVeilOn(false) })
          .fromTo(
            ".veil-word",
            { opacity: 0 },
            { opacity: 1, duration: 0.55, ease: "power2.out" },
            0,
          )
          .fromTo(
            ".veil-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.75, ease: "power2.inOut" },
            0.12,
          )
          .fromTo(
            ".veil-sub",
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            0.4,
          )
          /* the story's intro starts while the veil is still lifting */
          .add(() => setReady(true), 0.62)
          .to(veil, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, 0.95);
        gsap.to(stage, { intro: 1, duration: 2.6, ease: "expo.out", delay: 1.0 });
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ————— the corner scroll-o-meter ————— */
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

  /* ————— the view swap: film ⇄ reader ————— */
  useEffect(() => {
    if (doc) {
      document.documentElement.classList.add("film-reading");
      window.scrollTo(0, 0);
    } else {
      document.documentElement.classList.remove("film-reading");
    }
  }, [doc]);

  const openDoc = useCallback((id: string) => {
    savedY.current = window.scrollY;
    stage.reading = true;
    setDoc(id);
  }, []);

  const closeDoc = useCallback(() => {
    setDoc(null);
    stage.reading = false;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, savedY.current);
      }),
    );
  }, []);

  /* ————— the rail's glide ————— */
  const goTo = useCallback((i: number) => {
    const y = i < 4 ? filmScroll.starts[i] : filmScroll.atlas;
    if (stage.motion)
      gsap.to(window, { duration: 1.2, scrollTo: y, ease: "power2.inOut" });
    else window.scrollTo(0, y);
  }, []);

  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <>
      {veilOn && (
        <div ref={veilRef} className="film-veil" aria-hidden>
          <div className="flex flex-col items-center gap-5">
            <span className="veil-word f-mono text-[11px] text-white/85">
              IAL·CHEM
            </span>
            <span className="veil-line w-44" />
            <span className="veil-sub f-mono text-[9px] text-white/40">
              A revision film
            </span>
          </div>
        </div>
      )}

      <div className="film-root min-h-screen">
        <div className="film-shell">
          <AtomCanvas />
          <div className="f-vignette" aria-hidden />

          {/* ————— fixed chrome ————— */}
          <header className="film-chrome pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-9 sm:py-5">
            <button
              type="button"
              onClick={() => {
                if (stage.motion)
                  gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power2.inOut" });
                else window.scrollTo(0, 0);
              }}
              className="f-display pointer-events-auto cursor-pointer text-[15px] font-bold tracking-[0.1em]"
            >
              IAL·CHEM
            </button>
            <button
              type="button"
              onClick={() => goTo(4)}
              className="f-mono pointer-events-auto cursor-pointer rounded-full border border-white/30 px-4 py-2 text-[9px] transition-colors hover:border-white/75"
            >
              The atlas · 18 chapters
            </button>
          </header>

          <nav
            aria-label="Chapters"
            className="film-rail film-chrome fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 sm:left-7 sm:block"
          >
            <ul className="flex flex-col gap-5">
              {RAIL.map((it, i) => (
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

          <div className="film-chrome pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-center justify-between px-5 py-4 sm:px-9">
            <span className="f-mono text-[9px] text-white/50">
              An IAL Chemistry film
            </span>
            <span className="f-mono text-[9px] text-white/50">
              <span ref={pctRef}>00</span> / 100
            </span>
          </div>

          {/* ————— the reel ————— */}
          <Story ready={ready} onActive={onActive} onOpenDoc={openDoc} />
        </div>
      </div>

      {doc && <Reader docId={doc} onBack={closeDoc} />}
    </>
  );
}
