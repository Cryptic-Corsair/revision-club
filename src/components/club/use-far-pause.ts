"use client";

import { useEffect } from "react";

/* ————— far pause —————
   Spec sections inside the content-visibility render margin but a
   viewport or more away keep painting and keep ticking their idle
   keyframes — pure main-thread work the scroll doesn't need. One
   IntersectionObserver per reader (the sections are static per
   document): sections beyond one viewport either way wear [data-far]
   and the stylesheet pauses every animation inside; scroll back and
   each resumes mid-step, never restarting. No-op without an
   IntersectionObserver (SSR, old engines). */
export function useFarPause(scopeSelector: string) {
  useEffect(() => {
    const root = document.querySelector(scopeSelector);
    if (!root || typeof IntersectionObserver === "undefined") return;
    const anchors = Array.from(
      root.querySelectorAll<HTMLElement>(".spec-anchor"),
    );
    if (!anchors.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-far", !entry.isIntersecting);
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    anchors.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [scopeSelector]);
}
