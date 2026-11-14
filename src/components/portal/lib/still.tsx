'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { useInView } from 'framer-motion';

/* ————— the still-when-unseen contract (v2: exactly one room lives) —————
   The homepage's decorative loops — the hero's caustic shader and
   auto-cycle, the lab's eight motion graphics, the units' six motifs,
   the interlude lattice — used to run forever no matter where they sat
   on the page: dozens of framer loops burning the main thread while
   the visitor read the footer, and the marquee drift stuttering under
   the load. v1 froze each room on its own proximity; v2 adds the
   referee below so that AT MOST ONE room animates at any scroll
   position — the room under the viewport's centre line. Everything
   else is frozen, even in the boundary bands where two sections are
   both partly visible. A section declares itself by attaching
   useRoomLive()'s ref to its root and wrapping its content in
   StillProvider; descendants compose the room's liveness with their
   own self-visibility through useLive() + useInheritedLive(), then
   call useStill() and freeze to an honest still. It is the same
   contract reduced motion already follows, extended from "the visitor
   asked for quiet" to "nobody is looking — and only one room is".
   Resuming a loop picks it up from its first keyframe; the room at
   the centre is fully on screen, so the restart is never seen. */

/** Detect touch-first hardware so decorative JS/Canvas motion can step aside
    without disabling the CSS marquee that remains smooth on the compositor. */
export function useCoarsePointer(): boolean {
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)');
    const sync = () => setCoarsePointer(query.matches);
    sync();

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', sync);
      return () => query.removeEventListener('change', sync);
    }

    query.addListener(sync);
    return () => query.removeListener(sync);
  }, []);

  return coarsePointer;
}

const LiveContext = createContext(true);

/** Read the nearest StillProvider's liveness without re-wrapping —
    lets a descendant compose the room's liveness with its own
    visibility before handing the combined verdict back down. */
export function useInheritedLive(): boolean {
  return useContext(LiveContext);
}

/* ————— the room referee —————
   One shared scroll/resize evaluator replaces per-room proximity
   margins. On every scroll frame it reads each registered room's
   rect (a handful of getBoundingClientRect calls — reads only, no
   thrash), picks the single room whose bounds contain the viewport's
   centre line, and notifies every room of its verdict. State updates
   that don't change the verdict are bail-outs in React, so a scroll
   past a long room costs one rAF of reads and zero re-renders. */

type RoomNotify = (live: boolean) => void;
const rooms = new Map<HTMLElement, RoomNotify>();
let evaluateScheduled = false;

function evaluateRooms(): void {
  evaluateScheduled = false;
  if (rooms.size === 0) return;

  const viewportH = Math.max(window.innerHeight, 1);
  const centerY = viewportH / 2;
  let winner: HTMLElement | null = null;

  for (const [el] of rooms) {
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0 || rect.width <= 0) continue;
    if (rect.top <= centerY && rect.bottom >= centerY) {
      winner = el;
      break;
    }
  }

  for (const [el, notify] of rooms) {
    notify(el === winner);
  }
}

function scheduleEvaluate(): void {
  if (evaluateScheduled) return;
  evaluateScheduled = true;
  requestAnimationFrame(evaluateRooms);
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', scheduleEvaluate, { passive: true });
  window.addEventListener('resize', scheduleEvaluate, { passive: true });
}

/** Register a section as a motion room. Exactly one registered room
    is live at a time — the one under the viewport's centre line; when
    the centre falls between rooms (the footer, a gap), no room lives.
    Pass an existing ref to share one element with useScroll etc. */
export function useRoomLive<T extends HTMLElement>(
  externalRef?: RefObject<T | null>,
): { ref: RefObject<T | null>; live: boolean } {
  const ownRef = useRef<T | null>(null);
  const ref = externalRef ?? ownRef;
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const firstRoom = rooms.size === 0;
    rooms.set(el, setLive as RoomNotify);
    scheduleEvaluate();
    // one delayed re-read for late layout (web fonts, images)
    if (firstRoom) window.setTimeout(scheduleEvaluate, 400);
    return () => {
      rooms.delete(el);
      scheduleEvaluate();
    };
  }, [ref]);

  return { ref, live };
}

/** Self-visibility inside a room: true while this element intersects
    the viewport at all (no prewarm — the referee already decides
    which room may animate; this only trims a room's own offscreen
    pieces, like the lab's drifting cards). */
export function useLive<T extends HTMLElement>(prewarm = 0): {
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
    asked for reduced motion, or the owning room isn't the one on
    stage (or this piece sits outside the viewport inside it). */
export function useStill(reducedMotion: boolean): boolean {
  const live = useContext(LiveContext);
  return reducedMotion || !live;
}
