"use client";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · Spec Map — the note's contents, living inside the
   nav itself. The reader registers its sections + current stop with
   the provider; the nav then wears one candy "you are here" stop,
   same 40px rhythm as every other nav button. A tap unfolds the
   map: a floating window centred under the nav pill, fitted to the
   screen in JS (92vw on phones, a 560px centred dialog on larger
   screens; height measured between the pill and the screen bottom
   so it never runs off a tablet), with a
   paper tail stitched to
   the stop that opened it, a rainbow progress track showing how far
   you've walked, the same band-coloured chips as the note's own
   contents card, and prev/next hops for reading without lifting
   your eyes. Escape, the scrim or the ✕ all fold it away.
   ═══════════════════════════════════════════════════════════════ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, ListChecks, X } from "./icons";
import type { SpecSection } from "@/lib/spectra/notes-types";
import { Mascot, readableInk, shade } from "./bits";
import { accentOf, chipV, SpecChip } from "./bands";

export type SpecMapData = {
  id: string; /* the note's id — the map folds only when this changes */
  sections: SpecSection[];
  main: string; /* the unit's candy colour */
  active: string; /* spec currently on screen */
  jump: (spec: string) => void;
};

const SpecMapCtx = createContext<{
  data: SpecMapData | null;
  open: boolean;
  setOpen: (v: boolean) => void;
  register: (d: SpecMapData | null) => void;
}>({ data: null, open: false, setOpen: () => {}, register: () => {} });

export function SpecMapProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SpecMapData | null>(null);
  const [open, setOpen] = useState(false);
  const prevIdRef = useRef<string | null>(null);
  const nullTimerRef = useRef(0);
  /* Every active change cycles the register effect: cleanup fires
     register(null) right before the new data re-registers. So a null
     is deferred by one macrotask — if the same note re-registers
     (the normal blip) it cancels; if nothing does, the note really
     left and the map folds. A different note re-registering folds it
     too, so hopping between notes never inherits an open map. */
  const register = useCallback((d: SpecMapData | null) => {
    if (d === null) {
      window.clearTimeout(nullTimerRef.current);
      nullTimerRef.current = window.setTimeout(() => {
        prevIdRef.current = null;
        setData(null);
        setOpen(false);
      }, 0);
      return;
    }
    window.clearTimeout(nullTimerRef.current);
    const prev = prevIdRef.current;
    prevIdRef.current = d.id;
    setData(d);
    if (prev !== null && prev !== d.id) setOpen(false);
  }, []);
  const value = useMemo(
    () => ({ data, open, setOpen, register }),
    [data, open, register],
  );
  return <SpecMapCtx.Provider value={value}>{children}</SpecMapCtx.Provider>;
}

/* the note reader announces its map (and unregisters on the way
   out) — the nav picks it up and shows the stop */
export function useSpecMapRegister(data: SpecMapData | null) {
  const { register } = useContext(SpecMapCtx);
  useEffect(() => {
    register(data);
    return () => register(null);
  }, [register, data]);
}

/* where the window hangs — measured from the real nav pill and the
   stop inside it, so the tail always points home. h rides along so
   the window is fitted to the screen in JS, not in CSS. */
type Geo = { top: number; left: number; w: number; h: number; tail: number };

export function SpecMapTrigger() {
  const { data, open, setOpen } = useContext(SpecMapCtx);
  const [geo, setGeo] = useState<Geo | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const nav = document
      .querySelector('nav[aria-label="Main"]')
      ?.getBoundingClientRect();
    const btn = btnRef.current?.getBoundingClientRect();
    if (!nav || !btn || btn.width === 0) return;
    /* size and centre the window against what the eye actually sees —
       visualViewport, not innerWidth. Tablets running browser page
       zoom (accessibility zoom, a remembered pinch) keep the layout
       viewport wide while the visible one shrinks, and innerWidth
       maths then pushed the window clean past the right edge of the
       screen. The min() belt also covers exotic zoomed-out states.
       The width itself graduates with the page: 92% of the visible
       viewport on phones, easing into a 560px centred dialog on
       tablets and desktops — the same floating-window width as the
       search bubble — so a 768px portrait tablet reads as a dialog,
       not a slab, and every zoom level in between lands smoothly
       because a narrower viewport simply drifts toward the phone fit. */
    const vv = window.visualViewport;
    const vw = Math.min(vv?.width ?? window.innerWidth, window.innerWidth);
    const vh = Math.min(
      vv?.height ?? window.innerHeight,
      window.innerHeight,
    );
    const w = Math.min(vw * 0.92, 560);
    const left = Math.max((vw - w) / 2, 8);
    /* the window must always fit between the nav pill and the bottom
       of the screen — computed here in JS, never in CSS: the old
       min(72dvh, 640px) cap silently vanished on browsers without
       dvh units (iOS < 15.4 — plenty of classroom tablets), and long
       notes then ran the window clean off the screen. The home-
       indicator inset is honoured so landscape tablets keep the
       footer buttons clear of the gesture bar. */
    const saBottom =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--sa-bottom",
        ),
      ) || 0;
    const rawTop = nav.bottom + 10;
    const h = Math.max(240, Math.min(vh - rawTop - 14 - saBottom, 640));
    const top = Math.min(rawTop, Math.max(10, vh - h - 8));
    const tail = Math.min(
      Math.max(btn.left + btn.width / 2 - left, 26),
      w - 26,
    );
    /* keep the old object when nothing moved, so opening doesn't
       ripple re-renders through the panel — every field is compared
       against its own final value, LEFT INCLUDED: a centred window
       keeps w, h and tail identical across viewport sizes, so a
       dedupe that skips left parks the panel at a stale position
       from the previous size and it sails off the screen */
    setGeo((g) =>
      g &&
      Math.abs(g.top - top) < 1 &&
      Math.abs(g.left - left) < 1 &&
      g.w === w &&
      g.h === h &&
      Math.abs(g.tail - tail) < 1
        ? g
        : { top, left, w, h, tail },
    );
  }, []);

  /* measure before the open-paint (done eagerly in the tap handler,
     so no flicker and no setState-in-effect); re-measure on resize
     (window + visual viewport — the latter catches keyboard, pinch
     zoom and orientation on tablets) and once fonts have settled */
  useLayoutEffect(() => {
    if (!open) return;
    const t = window.setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [open, measure]);

  /* the dimmed area must eat gestures: on tablets a drag on the
     scrim used to scroll the whole note behind the window, and the
     fixed panel swimming over moving content read as a glitch.
     Native non-passive listeners (React's synthetic wheel is
     passive-by-default on the root, so preventDefault would no-op).
     The grid keeps its own scroll — only the scrim blocks. */
  const scrimRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const scrim = scrimRef.current;
    if (!scrim) return;
    const stop = (e: Event) => e.preventDefault();
    scrim.addEventListener("wheel", stop, { passive: false });
    scrim.addEventListener("touchmove", stop, { passive: false });
    return () => {
      scrim.removeEventListener("wheel", stop);
      scrim.removeEventListener("touchmove", stop);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* keyboard users land on the window itself, so esc/tab read right */
  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true });
  }, [open]);

  /* walk the "you are here" chip into view — on open (instantly, so
     the list never visibly glides while the window itself is still
     springing in) and after every prev/next hop (smoothly, so the
     map follows the walk). offsetTop maths instead of rects: the
     entrance spring scales the panel, and rect measurements taken
     mid-scale aim at a moving target. */
  const followHere = useCallback((delay: number, smooth = true) => {
    window.setTimeout(() => {
      const sc = gridRef.current;
      const el = sc?.querySelector<HTMLElement>('[data-here="1"]');
      if (!sc || !el) return;
      const top = Math.max(0, el.offsetTop - sc.offsetTop - 24);
      if (smooth) sc.scrollTo({ top, behavior: "smooth" });
      else sc.scrollTop = top;
    }, delay);
  }, []);

  useEffect(() => {
    if (open) followHere(60, false);
  }, [open, followHere]);

  /* hooks above — the trigger only exists once a note registers */
  if (!data) return null;
  const { sections, main, active, jump } = data;
  const idx = Math.max(
    0,
    sections.findIndex((s) => s.spec === active),
  );
  const close = () => setOpen(false);
  const hop = (spec: string) => {
    jump(spec);
    followHere(80);
  }; /* hop = smooth — the window is settled by then */

  return (
    <>
      <m.button
        ref={btnRef}
        type="button"
        onClick={() => {
          measure();
          setOpen(!open);
        }}
        whileTap={{ scale: 0.88 }}
        animate={{ y: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        aria-label="Spec map — jump between sections"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Spec map — jump between sections"
        className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full sm:h-11 sm:w-11"
        style={{
          background: main,
          color: readableInk(main),
          /* the same pedestal language as every candy button — it
             presses down while the map is open */
          boxShadow: open ? `0 1px 0 ${shade(main)}` : `0 2px 0 ${shade(main)}`,
        }}
      >
        {/* the stop wears the spec you're on — and trades the number
            for a map glyph while the window is open. The key rides on
            the open state alone, so the number updates in place as you
            scroll (keying on the spec itself stalled mid-flip during
            fast glides, leaving a stale room on the badge) */}
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={open ? "map" : "spec"}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="grid place-items-center font-display text-[10.5px] font-bold tracking-tight"
          >
            {open ? <ListChecks className="h-[18px] w-[18px]" /> : active}
          </m.span>
        </AnimatePresence>
      </m.button>

      {createPortal(
        <AnimatePresence>
          {open && geo && (
            <>
              <m.div
                key="scrim"
                ref={scrimRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={close}
                className="fixed inset-0 z-[59] bg-cocoa/30 backdrop-blur-[2px]"
                style={{ touchAction: "none" }}
              />
              <m.div
                key="panel"
                ref={panelRef}
                role="dialog"
                aria-label="Spec map"
                tabIndex={-1}
                initial={{ opacity: 0, y: -14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                className="spec-map fixed z-[60] flex flex-col rounded-[28px] bg-paper outline-none"
                style={{
                  top: geo.top,
                  left: geo.left,
                  width: geo.w,
                  /* fitted in JS (see measure) — a bare px number, so
                     browsers without dvh can't drop the cap */
                  maxHeight: geo.h,
                  /* the window blooms out of the tail, not its middle */
                  transformOrigin: `${geo.tail}px 0`,
                  /* same pedestal language as the nav pill itself */
                  boxShadow:
                    "0 4px 0 var(--edge), 0 30px 60px -24px rgb(0 0 0 / 0.45)",
                }}
              >
                {/* the paper tail stitches the window to the stop above */}
                <span
                  aria-hidden
                  className="absolute top-[-6px] h-3.5 w-3.5 rotate-45 rounded-[3px] bg-paper"
                  style={{ left: geo.tail - 7 }}
                />

                {/* header — the tilted badge, where you are, and the way out */}
                <div className="flex items-center gap-3 px-5 pt-4 sm:px-6">
                  <span
                    className="inline-flex shrink-0 -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[12px] font-bold tracking-[0.08em] uppercase"
                    style={{
                      background: main,
                      color: readableInk(main),
                      boxShadow: `0 3px 0 ${shade(main)}`,
                    }}
                  >
                    <ListChecks className="h-3.5 w-3.5" /> Spec map
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[12.5px] font-bold text-ink-faint">
                    Stop {idx + 1} of {sections.length} — tap one to hop
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close spec map"
                    className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-ink/[0.06] text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
                  >
                    <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  </button>
                </div>

                {/* the journey so far — one segment per stop, in its
                    own band colour; the current one stands taller */}
                <div
                  aria-hidden
                  className="mt-3 flex items-center gap-[3px] px-5 sm:px-6"
                >
                  {sections.map((s, i) => (
                    <span
                      key={s.spec}
                      className={`flex-1 rounded-full transition-colors duration-300 ${
                        i === idx ? "h-2.5" : "h-1.5"
                      }`}
                      style={{
                        background: i <= idx ? accentOf(i) : "var(--edge)",
                      }}
                    />
                  ))}
                </div>

                {/* the map itself — chips flow to fill whatever screen
                    they're on: two-up on phones, four-up on wide ones */}
                <div
                  ref={gridRef}
                  className="mt-1 min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5"
                  style={{ overscrollBehavior: "contain" }}
                >
                  <m.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: {
                        transition: {
                          staggerChildren: 0.024,
                          delayChildren: 0.05,
                        },
                      },
                    }}
                    className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(8.5rem,1fr))]"
                  >
                    {sections.map((s, i) => (
                      <SpecChip
                        key={s.spec}
                        s={s}
                        i={i}
                        here={s.spec === active}
                        variants={chipV}
                        onClick={() => {
                          jump(s.spec);
                          close();
                        }}
                      />
                    ))}
                  </m.div>
                </div>

                {/* footer — walk the note without opening the map again */}
                <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed border-ink/10 px-4 py-3 sm:px-5">
                  <button
                    type="button"
                    onClick={() => idx > 0 && hop(sections[idx - 1].spec)}
                    disabled={idx <= 0}
                    aria-label={
                      idx > 0
                        ? `Previous stop — ${sections[idx - 1].spec} ${sections[idx - 1].title}`
                        : "No previous stop"
                    }
                    className="flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full bg-ink/[0.06] px-3.5 text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink disabled:cursor-default disabled:opacity-35 disabled:hover:bg-ink/[0.06]"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                    <span className="font-display text-[12.5px] font-bold">
                      {idx > 0 ? sections[idx - 1].spec : "—"}
                    </span>
                    <span className="hidden max-w-[130px] truncate text-[12px] font-bold sm:inline">
                      {idx > 0 ? sections[idx - 1].title : ""}
                    </span>
                  </button>
                  <Mascot
                    main={main}
                    size={40}
                    bubbles={false}
                    className="hidden h-9 w-9 shrink-0 sm:block"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      idx < sections.length - 1 && hop(sections[idx + 1].spec)
                    }
                    disabled={idx >= sections.length - 1}
                    aria-label={
                      idx < sections.length - 1
                        ? `Next stop — ${sections[idx + 1].spec} ${sections[idx + 1].title}`
                        : "No next stop"
                    }
                    className="flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full bg-ink/[0.06] px-3.5 text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink disabled:cursor-default disabled:opacity-35 disabled:hover:bg-ink/[0.06]"
                  >
                    <span className="hidden max-w-[130px] truncate text-[12px] font-bold sm:inline">
                      {idx < sections.length - 1 ? sections[idx + 1].title : ""}
                    </span>
                    <span className="font-display text-[12.5px] font-bold">
                      {idx < sections.length - 1 ? sections[idx + 1].spec : "—"}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0"
                      strokeWidth={2.2}
                    />
                  </button>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
