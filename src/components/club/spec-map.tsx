"use client";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · Spec Map — the note's contents, living inside the
   nav itself. The reader registers its sections + current stop with
   the provider; the nav then wears one candy "you are here" stop,
   same 40px rhythm as every other nav button. A tap pulls the map
   up as a DRAWER — the Firefox-menu / Gemini-tray pattern, built
   from scratch after every floating-window variant earned its
   retirement. The drawer is not a window and refuses to behave like
   one: it IS a fraction of the screen — 100% wide, edge to edge,
   docked flush to the bottom edge, the note peeking over the top.
   HOW TALL is the reader's own business: a fraction of the visible
   screen set from the customize panel (Peek / Tall / Full) or by
   dragging the grabber to any height — both remembered, both
   absolute numbers that ignore text size and page zoom (--spec-h;
   see prefs.ts and globals.css). Inside: a rainbow progress track,
   a live search over the stops, the same band-coloured chips as the
   note's own contents card at the reader's chosen density
   (--spec-chip), and prev/next hops for reading without lifting
   your eyes. The body always fills the tray and scrolls inside — it
   never shrink-wraps, so it can never read as a card again. And
   because every number is a fraction of what the eye actually sees
   (visualViewport), there is no positioning left to get wrong on
   any device, page size or zoom level. Escape, the scrim or the ✕
   all fold it away.
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
  type KeyboardEvent as RKeyboardEvent,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, ListChecks, Search, X } from "./icons";
import type { SpecSection } from "@/lib/spectra/notes-types";
import { Mascot, readableInk, shade } from "./bits";
import { accentOf, chipV, SpecChip } from "./bands";
import {
  SPEC_H_MAX,
  SPEC_H_MIN,
  setPrefs,
  usePrefs,
} from "@/lib/spectra/prefs";

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

/* where the drawer sits — pure fractions of the VISIBLE viewport,
   measured from visualViewport (offsets included) so it stays glued
   to the screen edges under pinch zoom, page zoom and keyboard
   slides alike: 100% of the width, the reader's own fraction of the
   height (--spec-h), flush to the bottom edge. No px caps anywhere —
   a fraction can't lose its meaning the way a dvh cap does on older
   browsers. */
type Geo = { top: number; left: number; w: number; h: number };

export function SpecMapTrigger() {
  const { data, open, setOpen } = useContext(SpecMapCtx);
  /* the tray's own height — the reader's saved fraction, or the
     live one while the grabber is being dragged. The ref keeps
     measure() stable (no listener churn per pointer frame). */
  const { specHeight } = usePrefs();
  const [liveH, setLiveH] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const hFrac = Math.min(SPEC_H_MAX, Math.max(SPEC_H_MIN, liveH ?? specHeight));
  const hFracRef = useRef(hFrac);
  /* synced in an effect, not during render (the refs rule): effects
     flush in declaration order, so this lands before the measure
     effect below reads it — and before any real pointer or keyboard
     event can fire, since passive effects run before the next input */
  useEffect(() => {
    hFracRef.current = hFrac;
  }, [hFrac]);
  const dragState = useRef<{ startY: number; startFrac: number; live: number } | null>(
    null,
  );
  const [geo, setGeo] = useState<Geo | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    /* the drawer IS a fraction of what the eye actually sees —
       visualViewport, offsets included. 100% of the visible width
       (both edges flush — there is no horizontal maths left at all)
       and a fixed 94% of the visible height, docked flush to the
       visible bottom edge; the note peeks over the top the way
       Gemini's tray leaves the chat visible. Tablets running browser
       page zoom (accessibility zoom, a remembered pinch) keep the
       layout viewport wide while the visible one shrinks — and
       innerWidth maths pushed earlier versions clean past the right
       edge — but a fraction of the visible rect cannot miss, on any
       device, any page size, any zoom. The min() belt covers exotic
       zoomed-out states. No px floors, no px caps: shrink-wrapping
       to its content is exactly what made every earlier version
       read as a floating card, so the body is always this tall and
       scrolls inside instead. */
    const vv = window.visualViewport;
    const offX = Math.round(vv?.offsetLeft ?? 0);
    const offY = Math.round(vv?.offsetTop ?? 0);
    const vw = Math.min(vv?.width ?? window.innerWidth, window.innerWidth);
    const vh = Math.min(
      vv?.height ?? window.innerHeight,
      window.innerHeight,
    );
    const w = vw;
    const h = Math.round(vh * hFracRef.current);
    const top = Math.round(offY + (vh - h));
    const left = offX;
    /* keep the old object when nothing moved, so opening doesn't
       ripple re-renders through the panel — every field is compared
       against its own final value, TOP AND LEFT INCLUDED: a docked
       sheet keeps w and h identical across viewport sizes, so a
       dedupe that skips them parks the panel at a stale position
       from the previous size and it sails off the screen */
    setGeo((g) =>
      g &&
      Math.abs(g.top - top) < 1 &&
      Math.abs(g.left - left) < 1 &&
      g.w === w &&
      g.h === h
        ? g
        : { top, left, w, h },
    );
  }, []);

  /* measure before the open-paint (done eagerly in the tap handler,
     so no flicker and no setState-in-effect); re-measure on resize
     (window + visual viewport — the latter catches keyboard, pinch
     zoom and orientation on tablets), on visual-viewport scroll
     (a pinch-zoomed page pans the visible rect; the sheet glides
     with it so it never drifts off the bottom edge) and once fonts
     have settled */
  useLayoutEffect(() => {
    if (!open) return;
    const t = window.setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("scroll", measure);
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

  /* keyboard users land on the drawer itself, so esc/tab read right */
  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true });
  }, [open]);

  /* walk the "you are here" chip into view — on open (instantly, so
     the list never visibly glides while the drawer itself is still
     springing up) and after every prev/next hop (smoothly, so the
     map follows the walk). offsetTop maths instead of rects: the
     entrance spring slides the drawer, and rect measurements taken
     mid-slide aim at a moving target. */
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

  /* the height fraction moved — a drag or a panel preset — so the
     tray re-docks immediately (measure reads the ref and stays
     stable, so this fires no listener churn) */
  useEffect(() => {
    if (open) measure();
  }, [open, hFrac, measure]);

  /* the finder starts clean every time the tray unfolds — reset in
    the open handler (an event, not an effect) so the state never
    lags a render behind the fold */

  /* ————— the grabber resizes the tray —————
     Pointer-captured so the drag keeps tracking past the strip;
     each move re-fractions against the layout viewport height (the
     drawer lives in fixed-position layout coords; a pinch-zoom
     mid-drag is an exotic overlap the clamps forgive). The live
     fraction flows through liveH → hFrac → the measure effect
     above; pointer-up persists it as the real pref, so the tray
     reopens exactly this tall. Arrow keys nudge by 4% for keyboard
     users. Clamped to SPEC_H_MIN/MAX: it never folds below a
     usable third of the screen, never swallows the note whole. */
  const onGrabDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragState.current = {
      startY: e.clientY,
      startFrac: hFracRef.current,
      live: hFracRef.current,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* a synthetic or already-dead pointer id can't be captured —
         the strip still receives its own moves */
    }
    setDragging(true);
  };
  const onGrabMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragState.current;
    if (!d) return;
    const raw = Math.min(
      SPEC_H_MAX,
      Math.max(SPEC_H_MIN, d.startFrac + (d.startY - e.clientY) / window.innerHeight),
    );
    d.live = raw; /* sync for the up-handler — state lags a tick */
    setLiveH(raw);
  };
  const onGrabEnd = () => {
    const d = dragState.current;
    if (!d) return;
    dragState.current = null;
    setDragging(false);
    setLiveH(null);
    setPrefs({ specHeight: d.live });
  };
  const onGrabKey = (e: RKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const next = hFracRef.current + (e.key === "ArrowUp" ? 0.04 : -0.04);
    setPrefs({ specHeight: Math.min(SPEC_H_MAX, Math.max(SPEC_H_MIN, next)) });
  };

  /* hooks above — the trigger only exists once a note registers */
  if (!data) return null;
  const { sections, main, active, jump } = data;
  const idx = Math.max(
    0,
    sections.findIndex((s) => s.spec === active),
  );
  const close = () => setOpen(false);
  /* the finder — a query filters the stops live while keeping each
     chip's ORIGINAL index, so the band colours stay anchored to the
     same stops the note's contents card shows */
  const q = query.trim().toLowerCase();
  const shown = sections
    .map((s, i) => ({ s, i }))
    .filter(
      ({ s }) =>
        q === "" ||
        s.spec.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q),
    );
  const hop = (spec: string) => {
    jump(spec);
    followHere(80);
  }; /* hop = smooth — the drawer is settled by then */

  return (
    <>
      <m.button
        type="button"
        onClick={() => {
          measure();
          if (!open) setQuery("");
          setOpen(!open);
        }}
        whileTap={{ scale: 0.88 }}
        animate={{ y: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        aria-label="Spec map — jump between sections"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Spec map — jump between sections"
        className="nav-tool grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full sm:h-11 sm:w-11"
        style={{
          background: main,
          color: readableInk(main),
          /* the same pedestal language as every candy button — it
             presses down while the map is open */
          boxShadow: open ? `0 1px 0 ${shade(main)}` : `0 2px 0 ${shade(main)}`,
        }}
      >
        {/* the stop wears the spec you're on — and trades the number
            for a map glyph while the drawer is open. The key rides on
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
            className="grid place-items-center font-display text-[calc(10.5px*var(--ui-scale))] font-bold tracking-tight"
          >
            {open ? <ListChecks className="h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]" /> : active}
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
                key="drawer"
                ref={panelRef}
                role="dialog"
                aria-label="Spec map"
                tabIndex={-1}
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                exit={{ y: "104%" }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
                className={`spec-map fixed z-[60] flex flex-col overflow-hidden rounded-t-[calc(28px*var(--ui-scale))] bg-paper outline-none ${
                  dragging ? "select-none" : ""
                }`}
                style={{
                  top: geo.top,
                  left: geo.left,
                  width: geo.w,
                  /* a FIXED fraction of the visible screen (see
                     measure) — never shrink-wrapped to the content,
                     never a px cap, so no unit-support cliff (dvh…)
                     can silently drop the height */
                  height: geo.h,
                  /* keeps the hop buttons clear of the gesture bar on
                     notched phones — env() is far older than dvh, so
                     this survives on every classroom tablet */
                  paddingBottom: "env(safe-area-inset-bottom, 0px)",
                  /* a crisp top edge like the nav pill's pedestal, and
                     a soft shadow rising off the drawer into the
                     page */
                  boxShadow:
                    "0 -4px 0 var(--edge), 0 -30px 60px -24px rgb(0 0 0 / 0.4)",
                }}
              >
                {/* the grabber — Firefox-menu language: you are holding
                    a tray, not opening a dialog. It also RESIZES the
                    tray: drag it (or press arrow keys) to any height,
                    and the fraction is remembered. The invisible strip
                    is the hit zone; the pill widens while held. */}
                <div
                  role="separator"
                  aria-orientation="horizontal"
                  aria-label="Spec map height — drag up or down, or use arrow keys"
                  aria-valuenow={Math.round(hFrac * 100)}
                  aria-valuemin={35}
                  aria-valuemax={98}
                  aria-valuetext={`${Math.round(hFrac * 100)} percent of the screen`}
                  tabIndex={0}
                  onPointerDown={onGrabDown}
                  onPointerMove={onGrabMove}
                  onPointerUp={onGrabEnd}
                  onPointerCancel={onGrabEnd}
                  onKeyDown={onGrabKey}
                  className={`flex shrink-0 touch-none justify-center py-2.5 outline-none select-none ${
                    dragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 rounded-full bg-ink/[0.16] transition-all duration-200 ${
                      dragging ? "w-20 bg-ink/[0.30]" : "w-12"
                    }`}
                  />
                </div>

                {/* the content column — full-bleed on phones and
                    tablets, centred on desktops where the drawer is
                    wider than a page of chips needs */}
                <div className="mx-auto flex min-h-0 w-full max-w-[calc(760px*var(--ui-scale))] flex-1 flex-col">
                  {/* header — the tilted badge, where you are, and the
                      way out */}
                  <div className="flex items-center gap-3 px-5 pt-3 sm:px-6">
                    <span
                      className="inline-flex shrink-0 -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.08em] uppercase"
                      style={{
                        background: main,
                        color: readableInk(main),
                        boxShadow: `0 3px 0 ${shade(main)}`,
                      }}
                    >
                      <ListChecks className="h-3.5 w-3.5" /> Spec map
                    </span>
                    <p className="min-w-0 flex-1 truncate text-[calc(12.5px*var(--ui-scale))] font-bold text-ink-faint">
                      {q !== ""
                        ? `${shown.length} of ${sections.length} match — tap one to hop`
                        : `Stop ${idx + 1} of ${sections.length} — tap one to hop`}
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close spec map"
                      className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-ink/[0.06] text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
                    >
                      <X className="h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]" strokeWidth={2.2} />
                    </button>
                  </div>

                  {/* the journey so far — one segment per stop, in its
                      own band colour; the current one stands taller */}
                  <div
                    aria-hidden
                    className="mt-3 flex items-center gap-[calc(3px*var(--ui-scale))] px-5 sm:px-6"
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

                  {/* the finder — type a spec number or a word from a
                      title and the map filters live; it starts clean
                      every time the tray folds away */}
                  <div className="px-4 pt-1.5 sm:px-5">
                    <div className="relative">
                      <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a stop — 8A, rate, equilibrium…"
                        aria-label="Filter stops by spec number or title"
                        className="h-10 w-full rounded-full bg-ink/[0.06] pr-9 pl-10 text-[calc(13.5px*var(--ui-scale))] font-bold text-ink outline-none transition-colors placeholder:font-semibold placeholder:text-ink-faint focus:bg-ink/[0.09]"
                      />
                      {query !== "" && (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          aria-label="Clear the filter"
                          className="absolute top-1/2 right-1.5 grid h-7 w-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-ink/[0.08] text-ink-soft transition-colors hover:bg-ink/[0.13] hover:text-ink"
                        >
                          <X className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* the map itself — chips flow to fill whatever
                      screen they're on, packed against the reader's
                      chosen density (--spec-chip); the body scrolls,
                      the drawer itself never shrinks */}
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
                      className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(var(--spec-chip),1fr))]"
                    >
                      {shown.map(({ s, i }) => (
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
                    {q !== "" && shown.length === 0 && (
                      <div className="px-6 py-10 text-center">
                        <p className="font-display text-[calc(15px*var(--ui-scale))] font-semibold text-ink">
                          No stop matches “{query.trim()}”
                        </p>
                        <p className="mt-1 text-[calc(12px*var(--ui-scale))] font-bold text-ink-faint">
                          Try a spec number like 8A, or a word from a
                          section title.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* footer — walk the note without opening the map
                      again */}
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
                      <span className="font-display text-[calc(12.5px*var(--ui-scale))] font-bold">
                        {idx > 0 ? sections[idx - 1].spec : "—"}
                      </span>
                      <span className="hidden max-w-[calc(130px*var(--ui-scale))] truncate text-[calc(12px*var(--ui-scale))] font-bold sm:inline">
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
                      <span className="hidden max-w-[calc(130px*var(--ui-scale))] truncate text-[calc(12px*var(--ui-scale))] font-bold sm:inline">
                        {idx < sections.length - 1 ? sections[idx + 1].title : ""}
                      </span>
                      <span className="font-display text-[calc(12.5px*var(--ui-scale))] font-bold">
                        {idx < sections.length - 1 ? sections[idx + 1].spec : "—"}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0"
                        strokeWidth={2.2}
                      />
                    </button>
                  </div>
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
