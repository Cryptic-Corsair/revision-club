'use client';
import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';
import { useInView } from 'framer-motion';

/* ————— the still-when-unseen contract —————
   The homepage's decorative loops — the lab's eight motion graphics,
   the units' six motifs, the two drifting marquee rows, the hero's
   auto-cycle — used to run forever no matter where they sat on the
   page: dozens of framer loops burning the main thread while the
   visitor read the footer, and the marquee drift stuttering under
   the load. A section declares itself by attaching useLive()'s ref
   to its root and wrapping its content in StillProvider; everything
   inside can then call useStill() and freeze to an honest still
   whenever the room is more than a prewarm margin away from the
   viewport. It is the same contract reduced motion already follows,
   extended from "the visitor asked for quiet" to "nobody is
   looking". Resuming a loop picks it up from its first keyframe —
   the pause happens ~600px before the room is even visible, so the
   restart is never seen. */

const LiveContext = createContext(true);

/** Observe a section root: live is true while any part of it sits
    within `prewarm` px of the viewport (default 600 — roughly one
    screen of lead so loops are already turning when the room
    scrolls in). */
export function useLive<T extends HTMLElement>(prewarm = 600): {
  ref: RefObject<T | null>;
  live: boolean;
} {
  const ref = useRef<T | null>(null);
  const live = useInView(ref, {
    margin: `${prewarm}px 0px ${prewarm}px 0px`,
    initial: false,
  });
  return { ref, live };
}

/** Hand the section's liveness down to its graphics. */
export function StillProvider({
  live,
  children,
}: {
  live: boolean;
  children: ReactNode;
}) {
  return (
    <LiveContext.Provider value={live}>{children}</LiveContext.Provider>
  );
}

/** True when this component's loops should be still: the visitor
    asked for reduced motion, or the owning section is offscreen. */
export function useStill(reducedMotion: boolean): boolean {
  const live = useContext(LiveContext);
  return reducedMotion || !live;
}
