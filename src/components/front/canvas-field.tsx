"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the particle field

   The hero's backdrop: a shallow 2D canvas of drifting ink dots —
   the particulate nature of matter, drawn quietly behind the type.
   One rAF, transform-free draws, DPR clamped at 1.75, and it
   sleeps the moment the hero leaves the viewport, the tab hides,
   a reader opens or the motion knob says still (one honest frame).
   ═══════════════════════════════════════════════════════════════ */

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

export default function CanvasField({
  motion,
  sleeping,
}: {
  motion: boolean;
  sleeping: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sleepRef = useRef(sleeping);

  useEffect(() => {
    sleepRef.current = sleeping;
  }, [sleeping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      !motion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const inkOf = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-ink")
        .trim();
      return v || "#3d2b1f";
    };
    let ink = inkOf();

    /* the theme re-inks without a re-mount — watch the html attrs */
    const mo = new MutationObserver(() => {
      ink = inkOf();
      paint();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-mood"],
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = window.innerWidth > 820 ? 110 : 55;
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: 0.9 + Math.random() * 1.7,
      }));
      paint();
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ink;
      for (const d of dots) {
        ctx.globalAlpha = 0.06 + (d.r / 2.6) * 0.12;
        ctx.beginPath();
        ctx.arc(d.x + pointer.x, d.y + pointer.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -4) d.x = w + 4;
        else if (d.x > w + 4) d.x = -4;
        if (d.y < -4) d.y = h + 4;
        else if (d.y > h + 4) d.y = -4;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      paint();
    };

    const wake = () => {
      if (running || reduced || sleepRef.current || !inView) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const sleep = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };
    const loop = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 22;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 22;
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([en]) => {
        inView = en.isIntersecting;
        if (inView) wake();
        else sleep();
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? sleep() : wake());
    document.addEventListener("visibilitychange", onVis);
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    resize();
    if (reduced) {
      /* the still: one honest frame, then silence */
      pointer.x = 0;
      pointer.y = 0;
      paint();
    } else {
      wake();
    }

    return () => {
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      running = false;
    };
  }, [motion]);

  return (
    <canvas
      ref={canvasRef}
      className="fr-field"
      aria-hidden
      style={{ pointerEvents: "none" }}
    />
  );
}
