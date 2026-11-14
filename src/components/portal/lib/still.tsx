'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { useInView } from 'framer-motion';
import { getCalmScale } from './motion';

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

/** The calm scale as a reactive hook: 1 on small screens, 1.3 from
    1024px, 1.5 from 1536px — the machine cadence multiplier decided by
    {@link getCalmScale} in lib/motion. Machines multiply their own
    rhythm by it; a breakpoint crossing re-runs their loop once, which
    the hysteresis gate and the designed stills make invisible. */
export function useCalmScale(): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const q1024 = window.matchMedia('(min-width: 1024px)');
    const q1536 = window.matchMedia('(min-width: 1536px)');
    const sync = () => setScale(getCalmScale(window.innerWidth));
    sync();
    q1024.addEventListener('change', sync);
    q1536.addEventListener('change', sync);
    return () => {
      q1024.removeEventListener('change', sync);
      q1536.removeEventListener('change', sync);
    };
  }, []);

  return scale;
}

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
   past a long room costs one rAF of reads and zero re-renders.
   v2.1: when the centre line falls in a gap between rooms (footer,
   section spacing), the NEAREST room stays live instead of all rooms
   going dark — the old dead band froze every machine mid-frame while
   still on screen and snapped them back on re-entry, which read as
   the page glitching while scrolling between sections. Exactly one
   room is live at any scroll position, as before.
   v2.2: fling hardening, from a tablet recording of the freeze:
   on a touch fling the compositor applies the final resting position
   AFTER the last scroll event's rAF has run, so the verdict was
   computed mid-flight and nothing re-evaluated — the page landed at
   the hero with the hero dead and sat frozen until the next gesture
   (measured: ~2 s of zero motion on screen). Three layers fix it:
   a winner change is only committed once a later evaluation agrees
   (≥90 ms apart — no live/dead flashing while flying past sections),
   every event burst is followed by one trailing evaluation once
   scrolling has truly settled, and scrollend / pageshow /
   visibilitychange each re-evaluate directly. */

type RoomNotify = (live: boolean) => void;
const rooms = new Map<HTMLElement, RoomNotify>();
let evaluateScheduled = false;
let trailingTimer: number | undefined;
let currentWinner: HTMLElement | null = null;
let candidateWinner: HTMLElement | null = null;
let candidateAt = 0;
const WINNER_CONFIRM_MS = 90;
const SETTLE_REEVAL_MS = 150;

function evaluateRooms(): void {
  evaluateScheduled = false;
  if (rooms.size === 0) return;

  const viewportH = Math.max(window.innerHeight, 1);
  const centerY = viewportH / 2;
  let winner: HTMLElement | null = null;
  let nearestDist = Infinity;

  for (const [el] of rooms) {
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0 || rect.width <= 0) continue;
    if (rect.top <= centerY && rect.bottom >= centerY) {
      winner = el;
      break;
    }
    /* distance from the centre line to the room's nearest edge */
    const dist =
      rect.top > centerY ? rect.top - centerY : centerY - rect.bottom;
    if (dist < nearestDist) {
      nearestDist = dist;
      winner = el;
    }
  }

  /* commit only a confirmed winner: an immediate commit for the very
     first election, otherwise the same winner must be computed again
     WINNER_CONFIRM_MS later. A fling passing through a room in under
     that window never flips the verdict, so sections no longer flash
     dark mid-flight; the trailing settle evaluation confirms the room
     the fling actually landed in. */
  const now = performance.now();
  const changed = winner !== currentWinner;
  if (changed) {
    const confirmed =
      currentWinner === null ||
      (candidateWinner === winner && now - candidateAt >= WINNER_CONFIRM_MS);
    if (confirmed) {
      currentWinner = winner;
      candidateWinner = null;
    } else if (candidateWinner !== winner) {
      candidateWinner = winner;
      candidateAt = now;
    }
  } else {
    candidateWinner = null;
  }

  for (const [el, notify] of rooms) {
    notify(el === currentWinner);
  }
}

function scheduleEvaluate(): void {
  if (!evaluateScheduled) {
    evaluateScheduled = true;
    requestAnimationFrame(evaluateRooms);
  }
  /* the fling race: the last scroll event can fire while the
     compositor still owes us the final position/URL-bar geometry.
     Once the burst goes quiet, evaluate once more against the
     settled truth. */
  if (trailingTimer !== undefined) window.clearTimeout(trailingTimer);
  trailingTimer = window.setTimeout(() => {
    trailingTimer = undefined;
    evaluateRooms();
  }, SETTLE_REEVAL_MS);
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', scheduleEvaluate, { passive: true });
  window.addEventListener('resize', scheduleEvaluate, { passive: true });
  /* Chrome/Android fire scrollend exactly when scrolling settles —
     the authoritative answer to "did the last rAF see the truth?" */
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', evaluateRooms, { passive: true });
  }
  /* returning from a background tab or the bfcache can restore an
     outdated verdict; re-run the election on the way back in. */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) evaluateRooms();
  });
  window.addEventListener('pageshow', evaluateRooms);
}

/** Register a section as a motion room. Exactly one registered room
    is live at a time — the one under the viewport's centre line, or
    the nearest room when the centre falls in a gap (footer, section
    spacing) — so scrolling never passes through an all-frozen band.
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

/** Hysteresis visibility gate for the state-tick machines (showcase
    cards and friends). A naked `threshold: 0.1` observer flaps when a
    card rests near the viewport edge — scroll settle, URL-bar resize,
    rubber-banding — and every flap hard-resets the machine's loop
    (the KeystrokeMachine replays from 'cmd', the PackFlow restarts
    its counter), which reads on screen as the card blinking. This
    hook turns a machine on only once it is genuinely in view
    (ratio >= on) and off only once it is genuinely gone (ratio < off);
    between the two bands the previous verdict holds, so boundary
    hover can never toggle the loop. */
export function useStableInView<T extends HTMLElement>(
  on = 0.15,
  off = 0.02,
): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;
        if (ratio >= on) setInView(true);
        else if (ratio < off) setInView(false);
        /* between the bands: hold the previous verdict */
      },
      { threshold: [off, on] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [on, off]);

  return { ref, inView };
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
