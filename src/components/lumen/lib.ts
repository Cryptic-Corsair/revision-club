'use client';

import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   the lumen runtime — the motion machinery every section shares.

   The lag contract (handbook §17, extended the way /twilight extends
   it for a front-door leaf): a page may glow, but nothing may spin
   for nobody. So:

   · useCanvasScene — every canvas is IntersectionObserver-gated, draws
     on a 30 fps accumulator, caps devicePixelRatio at 1.5, renders one
     static first frame immediately (which doubles as the reduced-motion
     frame), re-fits on resize, and never runs off-screen. The club's
     own motion switch (html[data-motion="off"]) is honoured alongside
     prefers-reduced-motion.
   · useLive — toggles .lum-live on a section while it is on screen,
     which is what lets the CSS loops (.lum-loop) run: paused by
     default, running only for visible sections, frozen outright under
     reduced motion.
   · useCountUp — instrument counters that animate once, on arrival.
   · useRotator — the flask's rotating quip line.
   ═══════════════════════════════════════════════════════════════════════ */

export interface SceneState {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** seconds since the scene started */
  t: number;
}

/** motion is off when the OS asks for it, or the club's own switch says so */
export function motionAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (document.documentElement.dataset.motion === 'off') return false;
  return true;
}

/** the house mono voice, resolved from the root layout's next/font
 *  variable — canvas text matches the page's instruments */
export function monoFont(weight = 600, size = 11): string {
  const fam =
    typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement).getPropertyValue('--font-plex').trim()
      : '';
  return `${weight} ${size}px ${fam || 'ui-monospace'}, ui-monospace, SFMono-Regular, monospace`;
}

/**
 * Mounts a gated canvas scene. The factory runs once when the canvas
 * mounts and returns the draw closure, so per-scene state (particles,
 * molecules) lives in the closure and survives re-renders untouched.
 */
export function useCanvasScene(factory: () => (s: SceneState) => void) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const factoryRef = useRef(factory);
  factoryRef.current = factory;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = factoryRef.current();
    const GAP = 1000 / 30; // the 30 fps budget
    let raf = 0;
    let running = false;
    let disposed = false;
    let last = 0;
    const t0 = performance.now();
    let w = 0;
    let h = 0;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (now: number) => {
      draw({ ctx, w, h, t: (now - t0) / 1000 });
    };

    const frame = (now: number) => {
      if (!running || disposed) return;
      if (now - last >= GAP) {
        last = now - ((now - last) % GAP);
        render(now);
      }
      raf = requestAnimationFrame(frame);
    };

    fit();
    render(performance.now());

    let io: IntersectionObserver | null = null;
    if (motionAllowed() && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !running && !disposed) {
              running = true;
              last = 0;
              raf = requestAnimationFrame(frame);
            } else if (!e.isIntersecting && running) {
              running = false;
              cancelAnimationFrame(raf);
            }
          }
        },
        { threshold: 0.05 },
      );
      io.observe(canvas);
    }

    const ro =
      'ResizeObserver' in window
        ? new ResizeObserver(() => {
            fit();
            render(performance.now());
          })
        : null;
    ro?.observe(canvas);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
    };
    /* the factory ref is read once at mount: the scene is intentionally
       a mount-time object whose draw closure owns its state for life */
  }, []);

  return canvasRef;
}

/** adds .lum-live while the element is on screen — the CSS loop gate */
export function useLive<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('lum-live');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) el.classList.toggle('lum-live', e.isIntersecting);
      },
      { threshold: 0.04 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** counts 0 → target once, when the element arrives in view */
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = (v: number) => {
      el.textContent = String(v);
    };
    if (!motionAllowed()) {
      set(target);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            const begin = performance.now();
            const DUR = 1500;
            const step = (now: number) => {
              const p = Math.min((now - begin) / DUR, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              set(Math.round(target * eased));
              if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);
  return ref;
}

/** rotates 0..length-1 on an interval — the flask's quip machine */
export function useRotator(length: number, interval = 5200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (length < 2 || !motionAllowed()) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval]);
  return i;
}
