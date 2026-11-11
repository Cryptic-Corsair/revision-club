/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the gate and the shared channels

   One tiny module every act reads:
     · motionGate() — the saved knob or prefers-reduced-motion.
       The verdict is read once (localStorage + matchMedia) and
       cached at module scope: children's effects run before the
       shell's boot effect can stamp data-front-motion on <html>,
       so the gate must be able to answer for itself on first call.
       When it says still, every act keeps its CSS default (the
       final resting state) and no GSAP ever runs.
     · scrollState — a plain mutable object the shell's Lenis
       listener writes and quiet mechanisms (the velocity marquee)
       read. No React state rides this channel.
   ═══════════════════════════════════════════════════════════════ */

let cached: boolean | null = null;

export function motionGate(): boolean {
  if (typeof window === "undefined") return false;
  if (cached === null) {
    let gate = true;
    try {
      const p = JSON.parse(
        localStorage.getItem("reaction-club-prefs-v1") || "null",
      );
      if (p && p.motion === false) gate = false;
    } catch {
      /* no prefs — the front runs */
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      gate = false;
    cached = gate;
  }
  return cached;
}

export const scrollState = {
  /** raw Lenis velocity — written on every scroll event */
  vel: 0,
};
