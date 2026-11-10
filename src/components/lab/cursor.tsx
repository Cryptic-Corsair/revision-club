"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   THE LAB · the pointer's own instrument

   A dot that leads and a ring that trails. Anything carrying
   [data-cursor] grows the ring; anything [data-cursor="drag"]
   shows the grip. Transform-only, one rAF, never on touch,
   never under reduced motion.
   ═══════════════════════════════════════════════════════════════ */

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const grip = gripRef.current!;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let target = 1;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (t) {
        const kind = t.getAttribute("data-cursor");
        target = kind === "drag" ? 2.4 : 1.7;
        grip.style.opacity = kind === "drag" ? "1" : "0";
      } else {
        target = 1;
        grip.style.opacity = "0";
      }
    };
    const down = () => (target = Math.max(0.7, target * 0.65));
    const up = () => (target = target < 1 ? 1 : target);

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (target - scale) * 0.18;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.classList.add("cursor-on");
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <div className="lab-cursor" aria-hidden>
      <div ref={ringRef} className="lab-cursor-ring">
        <span ref={gripRef} className="lab-cursor-grip">
          DRAG
        </span>
      </div>
      <div ref={dotRef} className="lab-cursor-dot" />
    </div>
  );
}
