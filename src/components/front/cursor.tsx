"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the cursor

   A small dot with a lagging ring. Hovering anything marked
   [data-cursor] grows the ring; a value ("view", "open") prints
   inside it and the ring fills. Mouse only — touch never sees it,
   and the motion gate leaves the native cursor untouched.
   ═══════════════════════════════════════════════════════════════ */

export default function Cursor({ motion }: { motion: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!motion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const root = document.documentElement;
    root.dataset.frontCursor = "on";

    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      const val = t?.dataset.cursor ?? "";
      ring.dataset.mode = val === "" ? "tick" : val;
      label.textContent = val;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      delete root.dataset.frontCursor;
      gsap.killTweensOf([dot, ring]);
    };
  }, [motion]);

  if (!motion) return null;

  return (
    <div className="fr-cursor" aria-hidden>
      <div ref={dotRef} className="fr-cursor-dot" />
      <div ref={ringRef} className="fr-cursor-ring">
        <span ref={labelRef} className="f-mono" />
      </div>
    </div>
  );
}
