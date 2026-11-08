"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · verified hops & the scroll spy
   Shared by every notes surface — the classic reader and the
   editorial document dress alike. Lifted verbatim from
   notes-reader.tsx (where the recipe was hand-measured and
   debugged) so all skins land on the same ground.

   A spec anchor's DOM id: sections name themselves
   `{prefix}{spec with the dot dashed}`, e.g. "spec-2-6".
   ═══════════════════════════════════════════════════════════════ */

export const specAnchorId = (prefix: string, spec: string) =>
  `${prefix}${spec.replace(".", "-")}`;

export interface HopOptions {
  /** the DOM id prefix of the section anchors — "spec-" for real
      notes, matching each room's anchor prefix */
  prefix?: string;
  /** fixed clearance kept above the anchor — the pill nav's
      standing room, in px */
  clearance?: number;
}

/* hop to a spec room. scrollIntoView alone proved flaky under some
   browsers (the smooth glide occasionally dies before it starts), so
   the target is computed by hand and the landing is verified — if the
   glide was silently cancelled, one instant snap finishes the trip.
   Rooms off-screen are content-visibility skipped in the reader, so
   the first measurement can ride on estimates; a short render pass —
   an instant pre-scroll to just shy of the target — materialises the
   real layout, and the glide then aims at measured ground. */
export function scrollToSpec(spec: string, opts: HopOptions = {}) {
  const { prefix = "spec-", clearance = 100 } = opts;
  const el = document.getElementById(specAnchorId(prefix, spec));
  if (!el) return;
  const saTop =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--sa-top"),
    ) || 0;
  const topOf = () =>
    Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - clearance - saTop,
    );
  const landed = (top: number) => Math.abs(window.scrollY - top) < 2;
  const glide = () => {
    const top = topOf();
    window.scrollTo({ top, behavior: "smooth" });
    /* two heartbeats: if the glide is still moving, leave it be; if it
       stalled mid-trip, snap the rest of the way so the hop always lands */
    window.setTimeout(() => {
      if (landed(top)) return;
      const y1 = window.scrollY;
      window.setTimeout(() => {
        if (!landed(top) && Math.abs(window.scrollY - y1) < 1)
          window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
      }, 450);
    }, 450);
  };
  /* the render pass: park one-and-a-half viewports shy of the
     estimate, let the browser lay the target out for real, then glide */
  const estimate = topOf();
  if (estimate > window.innerHeight * 2) {
    window.scrollTo({
      top: estimate - window.innerHeight * 1.5,
      behavior: "instant" as ScrollBehavior,
    });
    requestAnimationFrame(() => requestAnimationFrame(glide));
  } else {
    glide();
  }
}

/* the scroll spy — after every scroll frame the position is recomputed
   from the real rects, so a fast glide (or a long map jump) can never
   leave a stale "you are here" behind. An IntersectionObserver was
   tried first, but Chrome occasionally swallows the final crossing of
   a long smooth glide, leaving the nav stuck one room back; eighteen
   rects per frame is a price too small to care. */
export function useSpecSpy(
  sections: { spec: string }[],
  opts: HopOptions = {},
): string {
  const { prefix = "spec-" } = opts;
  const [active, setActive] = useState<string>(sections[0]?.spec ?? "");
  const spyRaf = useRef(0);
  useEffect(() => {
    const pick = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]?.spec ?? "";
      for (const s of sections) {
        const el = document.getElementById(specAnchorId(prefix, s.spec));
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) current = s.spec;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(spyRaf.current);
      spyRaf.current = requestAnimationFrame(pick);
    };
    const first = requestAnimationFrame(pick);
    const settle = window.setTimeout(pick, 350); /* once fonts have settled */
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(spyRaf.current);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, prefix]);
  return active;
}
