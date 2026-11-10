"use client";

import { useEffect, useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import {
  Atom,
  ChevronDown,
  ClipboardCheck,
  Clock,
  ListChecks,
  MoveRight,
  NotebookPen,
  PencilRuler,
  RotateCcw,
  Sticker,
  Target,
  Timer,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { usePacks } from "@/lib/spectra/packs";
import { useTimeData } from "@/lib/spectra/time";
import { pickSuggestion } from "@/lib/spectra/suggest";
import { usePrefs } from "@/lib/spectra/prefs";
import {
  Blob,
  CandyButton,
  Chip,
  Confetti,
  DoodleAtom,
  DoodleFlask,
  DoodleHex,
  DoodlePlus,
  DoodleSparkle,
  DoodleTube,
  Float,
  Mascot,
  Reveal,
  SectionTag,
  StickerButton,
  shade,
  tint,
} from "./bits";
import { BandWave, homeBandOf } from "./bands";
import { HeroLattice, MoleculeStage } from "./home-canvas";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · home v3 — "the reaction"
   The front door rebuilt as a moving picture: a living lattice of
   drifting atoms behind the headline, caffeine spinning in 3D on a
   hand-rolled canvas, the periodic table drifting past as a river,
   the six units as specimen plates that tilt to meet the pointer,
   the method written as a reaction equation, and a flask that
   fills as you arrive at the invitation.

   Motion discipline (so it never fries a GPU):
   · every infinite loop is transform/opacity only — CSS marquees,
     orbits, bobbles; canvases draw circles and lines;
   · the two canvases cap device-pixel-ratio at 1.75, and their
     rAF loops tear down the moment they leave the viewport, the
     tab hides, the motion knob turns off, or the visitor prefers
     reduced motion (one static frame is painted instead);
   · one IntersectionObserver pauses every ambient CSS loop that
     scrolls offscreen (data-freeze), scroll reveals fire once,
     count-ups run once, tilt handlers only mount on hover-capable
     pointers.
   ═══════════════════════════════════════════════════════════════ */

/* ————— the element river's cargo —————
   The first four periods of the table, tiled like a periodic
   table and tinted by category — the standard textbook grouping.
   Noble gases ride the paper tile (no tint), the way they sit
   apart in every printed table. */

type Cat = "nonmetal" | "noble" | "alkali" | "alkaline" | "metalloid" | "transition" | "post";

const CAT_COLOR: Record<Cat, string | null> = {
  nonmetal: "#12B886",
  noble: null,
  alkali: "#FF6B6B",
  alkaline: "#FF922B",
  metalloid: "#F59F00",
  transition: "#9775FA",
  post: "#F06595",
};

const CAT_ORDER: Cat[] = ["nonmetal", "noble", "alkali", "alkaline", "metalloid", "transition", "post"];

type Elem = { n: number; s: string; name: string; cat: Cat };

const ROW_A: Elem[] = [
  { n: 1, s: "H", name: "Hydrogen", cat: "nonmetal" },
  { n: 2, s: "He", name: "Helium", cat: "noble" },
  { n: 3, s: "Li", name: "Lithium", cat: "alkali" },
  { n: 4, s: "Be", name: "Beryllium", cat: "alkaline" },
  { n: 5, s: "B", name: "Boron", cat: "metalloid" },
  { n: 6, s: "C", name: "Carbon", cat: "nonmetal" },
  { n: 7, s: "N", name: "Nitrogen", cat: "nonmetal" },
  { n: 8, s: "O", name: "Oxygen", cat: "nonmetal" },
  { n: 9, s: "F", name: "Fluorine", cat: "nonmetal" },
  { n: 10, s: "Ne", name: "Neon", cat: "noble" },
  { n: 11, s: "Na", name: "Sodium", cat: "alkali" },
  { n: 12, s: "Mg", name: "Magnesium", cat: "alkaline" },
  { n: 13, s: "Al", name: "Aluminium", cat: "post" },
  { n: 14, s: "Si", name: "Silicon", cat: "metalloid" },
  { n: 15, s: "P", name: "Phosphorus", cat: "nonmetal" },
  { n: 16, s: "S", name: "Sulfur", cat: "nonmetal" },
  { n: 17, s: "Cl", name: "Chlorine", cat: "nonmetal" },
  { n: 18, s: "Ar", name: "Argon", cat: "noble" },
];

const ROW_B: Elem[] = [
  { n: 19, s: "K", name: "Potassium", cat: "alkali" },
  { n: 20, s: "Ca", name: "Calcium", cat: "alkaline" },
  { n: 21, s: "Sc", name: "Scandium", cat: "transition" },
  { n: 22, s: "Ti", name: "Titanium", cat: "transition" },
  { n: 23, s: "V", name: "Vanadium", cat: "transition" },
  { n: 24, s: "Cr", name: "Chromium", cat: "transition" },
  { n: 25, s: "Mn", name: "Manganese", cat: "transition" },
  { n: 26, s: "Fe", name: "Iron", cat: "transition" },
  { n: 27, s: "Co", name: "Cobalt", cat: "transition" },
  { n: 28, s: "Ni", name: "Nickel", cat: "transition" },
  { n: 29, s: "Cu", name: "Copper", cat: "transition" },
  { n: 30, s: "Zn", name: "Zinc", cat: "transition" },
  { n: 31, s: "Ga", name: "Gallium", cat: "post" },
  { n: 32, s: "Ge", name: "Germanium", cat: "metalloid" },
  { n: 33, s: "As", name: "Arsenic", cat: "metalloid" },
  { n: 34, s: "Se", name: "Selenium", cat: "nonmetal" },
  { n: 35, s: "Br", name: "Bromine", cat: "nonmetal" },
  { n: 36, s: "Kr", name: "Krypton", cat: "noble" },
];

/* ————— motion helpers ————— */

/* tilt + hover feedback only exist for real pointers */
function useHoverCapable() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setOk(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return ok;
}

/* fires once when the element scrolls into view — the count-ups and
   the flask fill key off it */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

/* one count-up per number, one rAF, cancelled on unmount; frozen
   solid when motion is off */
function CountUp({ to, go, dur = 950 }: { to: number; go: boolean; dur?: number }) {
  const prefs = usePrefs();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go || !prefs.motion) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, to, dur, prefs.motion]);
  /* motion off or not yet triggered → the number simply stands at
     its final value; no state, no loop */
  if (!go || !prefs.motion) return <>{to}</>;
  return <>{val}</>;
}

/* words spring up out of their own baseline — the kinetic headline */
function KineticWords({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <m.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", rotate: 5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 21, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/* a card that leans toward the pointer — desktop pointers only, and
   the inner button keeps its own hover skin */
function Tilt({
  children,
  className,
  max = 4.5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hover = useHoverCapable();
  const onMove = (e: React.PointerEvent) => {
    if (!hover || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(950px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`transition-transform duration-150 ease-out ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ————— the element river ————— */

function ElementTile({ el }: { el: Elem }) {
  const c = CAT_COLOR[el.cat];
  return (
    <div
      aria-hidden
      className="river-tile sticker relative me-[calc(8px*var(--ui-scale))] flex h-[calc(80px*var(--ui-scale))] w-[calc(66px*var(--ui-scale))] shrink-0 flex-col items-center justify-center rounded-[calc(14px*var(--ui-scale))] bg-paper"
    >
      {c && (
        <span
          className="absolute inset-x-[calc(10px*var(--ui-scale))] top-[calc(8px*var(--ui-scale))] h-[calc(3px*var(--ui-scale))] rounded-full"
          style={{ background: tint(c, 52) }}
        />
      )}
      <span className="absolute top-[calc(5px*var(--ui-scale))] left-[calc(8px*var(--ui-scale))] font-display text-[calc(8.5px*var(--ui-scale))] font-bold text-ink-faint">
        {el.n}
      </span>
      <span className="mt-[calc(4px*var(--ui-scale))] font-display text-[calc(21px*var(--ui-scale))] leading-none font-bold text-ink">
        {el.s}
      </span>
      <span className="mt-[calc(3px*var(--ui-scale))] max-w-full truncate px-[calc(3px*var(--ui-scale))] text-[calc(8.5px*var(--ui-scale))] font-bold text-ink-faint">
        {el.name}
      </span>
    </div>
  );
}

function RiverRow({ dir, elements }: { dir: 1 | -1; elements: Elem[] }) {
  /* one half of the loop = the row's cargo three times over, so the
     seam never shows even on ultra-wide screens; the track renders
     two identical halves and translates by exactly one */
  const half = (
    <div className="flex shrink-0 items-center pe-[calc(8px*var(--ui-scale))]">
      {[0, 1, 2].map((rep) => elements.map((el) => <ElementTile key={`${rep}-${el.n}`} el={el} />))}
    </div>
  );
  return (
    <div className="river-row" data-dir={dir === -1 ? "rtl" : undefined}>
      <div className="river-track will-change-transform">
        {half}
        <div aria-hidden className="flex shrink-0 items-center pe-[calc(8px*var(--ui-scale))]">
          {[0, 1, 2].map((rep) => elements.map((el) => <ElementTile key={`e${rep}-${el.n}`} el={el} />))}
        </div>
      </div>
    </div>
  );
}

function ElementRiver() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y py-[calc(18px*var(--ui-scale))]"
      style={{
        background: tint("#F59F00", 7),
        borderColor: "color-mix(in oklab, var(--color-ink) 8%, transparent)",
      }}
    >
      <p className="mb-[calc(12px*var(--ui-scale))] text-center font-display text-[calc(10px*var(--ui-scale))] font-extrabold tracking-[0.24em] text-ink-faint uppercase">
        the building blocks · H → Kr
      </p>
      <div data-freeze className="space-y-[calc(10px*var(--ui-scale))]">
        <RiverRow dir={1} elements={ROW_A} />
        <RiverRow dir={-1} elements={ROW_B} />
      </div>
      <div className="mt-[calc(12px*var(--ui-scale))] hidden flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 sm:flex">
        {CAT_ORDER.map((cat) => {
          const c = CAT_COLOR[cat];
          return (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 text-[calc(9.5px*var(--ui-scale))] font-bold text-ink-faint"
            >
              <span
                className="h-[calc(7px*var(--ui-scale))] w-[calc(7px*var(--ui-scale))] rounded-full"
                style={c ? { background: tint(c, 62) } : { background: "var(--color-ink-faint)" }}
              />
              {cat === "post" ? "post-transition" : cat}
            </span>
          );
        })}
      </div>
    </section>
  );
}

/* ————— the unit plates ————— */

function Ring({ pct, color }: { pct: number; color: string }) {
  const R = 20;
  const C = 2 * Math.PI * R;
  return (
    <span aria-hidden className="relative grid h-[52px] w-[52px] shrink-0 place-items-center">
      <svg viewBox="0 0 48 48" className="h-[52px] w-[52px] -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="color-mix(in oklab, var(--color-ink) 10%, transparent)"
          strokeWidth="5"
        />
        <m.circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - pct) }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <span className="absolute font-display text-[11px] font-bold" style={{ color: shade(color, 55) }}>
        {Math.round(pct * 100)}%
      </span>
    </span>
  );
}

function UnitPlate({
  u,
  i,
  pct,
  minutes,
  onOpen,
}: {
  u: Unit;
  i: number;
  pct: number;
  minutes: number;
  onOpen: () => void;
}) {
  return (
    <Reveal delay={i * 0.05} className="h-full">
      <Tilt className="h-full">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${u.code} — ${u.title}`}
          className="sticker sticker-pop group relative block h-full w-full cursor-pointer overflow-hidden rounded-[calc(28px*var(--ui-scale))] p-6 text-left"
          style={{ background: tint(u.candy.main, 9) }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-4 right-3 font-display text-[calc(88px*var(--ui-scale))] leading-none font-bold text-ink/[0.06] select-none"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="grid h-12 w-12 place-items-center rounded-[calc(16px*var(--ui-scale))] font-display text-[calc(20px*var(--ui-scale))] font-bold"
                style={{
                  background: u.candy.main,
                  color: "#fff",
                  boxShadow: `0 3px 0 ${shade(u.candy.main)}`,
                }}
              >
                {u.index}
              </span>
              <div>
                <div
                  className="font-display text-[calc(13px*var(--ui-scale))] font-bold tracking-[0.14em]"
                  style={{ color: shade(u.candy.main, 68) }}
                >
                  {u.code}
                </div>
                <div className="flex items-center gap-1.5 text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint">
                  <span className="h-2 w-2 rounded-full" style={{ background: u.candy.main }} />
                  {u.stage} · unit {u.index}
                </div>
              </div>
            </div>
            <Ring pct={pct} color={u.candy.main} />
          </div>

          <h3 className="mt-4 font-display text-[calc(21px*var(--ui-scale))] leading-tight font-semibold text-ink">
            {u.title}
          </h3>
          <p className="mt-1 text-[calc(13.5px*var(--ui-scale))] leading-snug font-extrabold text-ink-soft">
            {u.topicRange}
          </p>
          <p className="mt-2.5 line-clamp-3 text-[calc(14px*var(--ui-scale))] leading-relaxed text-ink-soft">
            {u.blurb}
          </p>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <Chip main={u.candy.main}>{u.topics.length} topics</Chip>
              <Chip>
                <Clock className="h-3 w-3" /> {minutes} min
              </Chip>
            </div>
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition-transform group-hover:translate-x-1 group-hover:-rotate-6"
              style={{ background: u.candy.main, boxShadow: `0 2px 0 ${shade(u.candy.main)}` }}
            >
              <MoveRight className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
          </div>
        </button>
      </Tilt>
    </Reveal>
  );
}

/* ————— the finale flask ————— */

function FlaskFill({ className }: { className?: string }) {
  const body =
    "M64 14 h42 M68 14 v44 L28 150 a11 11 0 0 0 10 15 h58 a11 11 0 0 0 10 -15 L82 58 V14";
  return (
    <svg viewBox="0 0 174 196" aria-hidden className={className} fill="none">
      <defs>
        <linearGradient id="flask-lq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF922B" />
        </linearGradient>
        <clipPath id="flask-clip">
          <path d="M68 14 v44 L28 150 a11 11 0 0 0 10 15 h58 a11 11 0 0 0 10 -15 L82 58 V14 Z" />
        </clipPath>
      </defs>

      {/* the liquid rises when the finale scrolls into view */}
      <m.g
        clipPath="url(#flask-clip)"
        initial={{ y: 62 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M20 100 C 54 92, 96 108, 154 96 L154 200 L20 200 Z" fill="url(#flask-lq)" />
        <circle className="flask-bubble" cx="66" cy="176" r="4" fill="#FFFFFF" opacity="0.5" />
        <circle
          className="flask-bubble"
          cx="88"
          cy="184"
          r="2.6"
          fill="#FFFFFF"
          opacity="0.45"
          style={{ animationDelay: "1.1s" }}
        />
        <circle
          className="flask-bubble"
          cx="106"
          cy="178"
          r="3.4"
          fill="#FFFFFF"
          opacity="0.5"
          style={{ animationDelay: "2s" }}
        />
      </m.g>

      {/* glass */}
      <path
        d={body}
        stroke="var(--color-milk)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* measurement ticks + a shine */}
      <path
        d="M46 132 h14 M54 112 h11"
        stroke="var(--color-milk)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path d="M62 70 L44 116" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Home
   ═══════════════════════════════════════════════════════════════ */

export function Home({
  units,
  onOpenUnit,
  onOpenSticker,
  onOpenTopic,
  onOpenPack,
  onOpenSpec,
  onBackToDesk,
}: {
  units: Unit[];
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
  onOpenPack: () => void;
  onOpenSpec: () => void;
  onBackToDesk?: () => void;
}) {
  const hours = Math.round(TOTALS.minutes / 60);
  const revised = useRevised();
  const { picks } = usePacks();
  const time = useTimeData();
  const suggestion = pickSuggestion(units, revised, time);
  const [statsRef, statsSeen] = useInViewOnce<HTMLDivElement>();
  const [packRef, packSeen] = useInViewOnce<HTMLDivElement>();

  /* the finale's mascot keeps his boop */
  const [boops, setBoops] = useState(0);
  const [cheer, setCheer] = useState(false);
  const cheerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boop = () => {
    setBoops((b) => b + 1);
    setCheer(true);
    if (cheerTimer.current) clearTimeout(cheerTimer.current);
    cheerTimer.current = setTimeout(() => setCheer(false), 1400);
  };
  useEffect(
    () => () => {
      if (cheerTimer.current) clearTimeout(cheerTimer.current);
    },
    [],
  );

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ————— pause what you can't see —————
     One observer flips animation-play-state on every ambient CSS
     loop (river, orbits, cue, bobbles) while it sits offscreen. */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-freeze]"));
    if (els.length === 0) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const state = entry.isIntersecting ? "running" : "paused";
        for (const el of [
          entry.target as HTMLElement,
          ...Array.from(entry.target.querySelectorAll<HTMLElement>("*")),
        ]) {
          el.style.animationPlayState = state;
        }
      }
    });
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [suggestion]);

  /* hero parallax — the lattice and the molecule drift at different
     rates as the hero scrolls away, transform-only */
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yLattice = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const latticeOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  const yMolecule = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div>
      {/* ————— hero: the reaction begins ————— */}
      <section
        ref={heroRef}
        className="hero-stage relative flex min-h-svh items-center overflow-hidden bg-paper"
        style={{ paddingTop: "calc(5.25rem + var(--sa-top))" }}
      >
        {/* the living lattice — candy atoms drifting, bonds forming.
            A paper wash pools over the reading side so the drift stays
            scenery behind the words, never noise through them. */}
        <m.div aria-hidden className="absolute inset-0" style={{ y: yLattice, opacity: latticeOpacity }}>
          <HeroLattice className="h-full w-full" />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--color-paper) 82%, transparent) 0%, transparent 58%), linear-gradient(to top, color-mix(in oklab, var(--color-paper) 72%, transparent) 0%, transparent 16%)",
            }}
          />
        </m.div>

        <div className="relative z-10 w-full">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-6 lg:px-10">
            {/* left: the words */}
            <div>
              <m.div
                initial={{ opacity: 0, scale: 0.85, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 17 }}
              >
                <SectionTag main="#12B886" tilt={-2}>
                  Edexcel IAL Chemistry · 2018 spec
                </SectionTag>
              </m.div>

              <h1 className="mt-6 font-display text-[calc(clamp(2.75rem,6.5vw,4.5rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.05] font-semibold tracking-tight text-ink">
                <KineticWords text="Every spec point," delay={0.1} className="block" />
                <span className="relative mt-1 inline-block -rotate-2 rounded-[0.35em] px-[0.18em]">
                  <m.span
                    aria-hidden
                    className="hero-glow absolute inset-0 origin-left rounded-[0.35em]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
                  />
                  <KineticWords text="made to stick." delay={0.32} className="relative" />
                </span>
              </h1>

              <m.p
                className="mt-6 max-w-[50ch] text-[calc(15.5px*var(--ui-scale))] leading-[1.78] text-ink-soft sm:text-[calc(16.5px*var(--ui-scale))] sm:leading-[1.8]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.5 }}
              >
                Welcome to <strong className="font-extrabold text-ink">IAL CHEM</strong> —
                revision notes for Pearson Edexcel IAL Chemistry (WCH11–WCH16). Every unit runs
                the 2018 spec in order: definitions, equations and fully worked examples. Your
                progress saves itself in your browser.
              </m.p>

              <m.div
                className="mt-8 flex flex-wrap items-center gap-3.5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.62 }}
              >
                <CandyButton main="#FF6B6B" onClick={() => scrollTo("units")}>
                  Browse the units <MoveRight className="h-5 w-5" />
                </CandyButton>
                <StickerButton onClick={() => scrollTo("how")}>
                  <NotebookPen className="h-4 w-4 text-grape" /> How it works
                </StickerButton>
                {onBackToDesk && (
                  <StickerButton
                    onClick={onBackToDesk}
                    className="min-h-[calc(44px*var(--ui-scale))] px-5 py-2.5 text-[calc(14px*var(--ui-scale))]"
                  >
                    Back to your desk
                  </StickerButton>
                )}
              </m.div>

              {/* the numbers count themselves up */}
              <m.div
                className="mt-9"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 230, damping: 22, delay: 0.74 }}
              >
                <div ref={statsRef} className="hero-stats rounded-[calc(26px*var(--ui-scale))] bg-cream px-4 py-4 sm:px-5">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4">
                    {[
                      { icon: Atom, value: <CountUp to={units.length} go={statsSeen} />, label: "units" },
                      { icon: ListChecks, value: <CountUp to={TOTALS.topics} go={statsSeen} />, label: "topics" },
                      { icon: Clock, value: <><span aria-hidden>≈</span><CountUp to={hours} go={statsSeen} /> h</>, label: "reading" },
                      { icon: PencilRuler, value: <CountUp to={TOTALS.examples} go={statsSeen} />, label: "examples" },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <s.icon className="h-4 w-4 shrink-0 text-coral" strokeWidth={2.5} />
                        <div className="min-w-0">
                          <div className="font-display text-[calc(19px*var(--ui-scale))] leading-none font-bold text-ink">
                            {s.value}
                          </div>
                          <div className="mt-1 truncate text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint">
                            {s.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </m.div>
            </div>

            {/* right: caffeine, spinning in the light */}
            <m.div
              style={{ y: yMolecule }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.3 }}
              className="relative mx-auto aspect-square w-full max-w-[calc(320px*var(--ui-scale))] sm:max-w-[calc(400px*var(--ui-scale))] lg:max-w-[calc(460px*var(--ui-scale))]"
            >
              {/* the halo the model floats in */}
              <span
                aria-hidden
                className="absolute inset-[4%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 36% 28%, ${tint("#FFD43B", 24)}, transparent 60%), radial-gradient(circle at 70% 74%, ${tint("#FF922B", 14)}, transparent 56%)`,
                }}
              />

              {/* two orbiting electron rings */}
              <span data-freeze className="orbit-a absolute inset-0" aria-hidden>
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" fill="none">
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="48"
                    ry="16.5"
                    stroke="var(--color-ink)"
                    strokeOpacity="0.22"
                    strokeWidth="0.7"
                    transform="rotate(16 50 50)"
                  />
                  <circle cx="98" cy="50" r="1.7" fill="var(--color-coral)" transform="rotate(16 50 50)" />
                </svg>
              </span>
              <span
                data-freeze
                className="orbit-b absolute inset-0"
                aria-hidden
                style={{ animationDelay: "-9s" }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" fill="none">
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="44.5"
                    ry="13"
                    stroke="var(--color-ink)"
                    strokeOpacity="0.17"
                    strokeWidth="0.7"
                    transform="rotate(-23 50 50)"
                  />
                  <circle cx="94.5" cy="50" r="1.5" fill="var(--color-grape)" transform="rotate(-23 50 50)" />
                </svg>
              </span>

              <MoleculeStage className="mol-stage absolute inset-[9%] h-[82%] w-[82%]" />

              {/* framing doodles, adrift */}
              <span data-freeze className="animate-float absolute top-[2%] right-[4%] block" aria-hidden>
                <DoodleAtom className="h-9 w-9 text-coral/45" />
              </span>
              <span
                data-freeze
                className="animate-float-slow absolute bottom-[4%] left-[2%] block"
                aria-hidden
                style={{ animationDelay: "1.2s" }}
              >
                <DoodleHex className="h-8 w-8 text-grape/40" />
              </span>
              <span
                data-freeze
                className="animate-float absolute top-[16%] left-[8%] hidden lg:block"
                aria-hidden
                style={{ animationDelay: "0.8s" }}
              >
                <DoodleFlask className="h-9 w-9 rotate-6 text-tangerine/40" />
              </span>
              <span
                data-freeze
                className="animate-float-slow absolute right-[10%] bottom-[16%] hidden lg:block"
                aria-hidden
                style={{ animationDelay: "2s" }}
              >
                <DoodleTube className="h-10 w-10 -rotate-12 text-mint/40" />
              </span>

              {/* a note and an equation drift past the model, kept
                  clear of the orbit rings so the model breathes */}
              <Float delay={0.9} className="absolute -top-[7%] -left-[4%] z-20 hidden sm:block">
                <div
                  aria-hidden
                  className="hero-float-card sticker w-[calc(146px*var(--ui-scale))] -rotate-[4deg] rounded-[calc(22px*var(--ui-scale))] bg-paper px-4 py-3.5"
                >
                  <span
                    className="rounded-full px-2.5 py-1 font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.08em] text-white uppercase"
                    style={{ background: "#12B886", boxShadow: "0 2px 0 #0B7A57" }}
                  >
                    definition
                  </span>
                  <div className="mt-2 font-display text-[calc(13.5px*var(--ui-scale))] font-bold text-ink">
                    Enthalpy change
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <span className="block h-[calc(7px*var(--ui-scale))] w-[92%] rounded-full bg-ink/[0.09]" />
                    <span className="block h-[calc(7px*var(--ui-scale))] w-[68%] rounded-full bg-ink/[0.09]" />
                    <span className="block h-[calc(7px*var(--ui-scale))] w-[82%] rounded-full bg-ink/[0.09]" />
                  </div>
                </div>
              </Float>
              <Float delay={1.5} slow className="absolute -right-[4%] -bottom-[7%] z-20 hidden sm:block">
                <div
                  aria-hidden
                  className="hero-float-card sticker rotate-[3deg] rounded-[calc(22px*var(--ui-scale))] bg-paper px-5 py-4 sm:px-6"
                >
                  <span
                    className="rounded-full px-2.5 py-1 font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.08em] text-white uppercase"
                    style={{ background: "#FF922B", boxShadow: "0 2px 0 #D46A08" }}
                  >
                    equation
                  </span>
                  <div className="mt-1.5 font-display text-[calc(20px*var(--ui-scale))] font-bold tracking-tight text-ink sm:text-[calc(22px*var(--ui-scale))]">
                    pV = nRT
                  </div>
                </div>
              </Float>
            </m.div>
          </div>
        </div>

        {/* the molecule's nameplate */}
        <div className="absolute inset-x-0 bottom-[calc(14px+var(--sa-bottom))] z-10 flex flex-wrap items-center justify-center gap-2 px-4">
          <span className="sticker inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink">
            <Atom className="h-3.5 w-3.5 text-coral" />
            caffeine · C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>
          </span>
          <span className="sticker inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink-faint">
            <RotateCcw className="h-3.5 w-3.5" /> drag to spin
          </span>
        </div>

        {/* the scroll cue */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[calc(92px+var(--sa-bottom))] z-10 hidden justify-center sm:flex">
          <span
            data-freeze
            className="cue-bob sticker flex flex-col items-center gap-0.5 rounded-full bg-paper/85 px-4 py-2"
          >
            <span className="font-display text-[calc(9.5px*var(--ui-scale))] font-bold tracking-[0.22em] text-ink-faint uppercase">
              scroll
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-ink-soft" strokeWidth={2.5} />
          </span>
        </div>
      </section>

      {/* ————— the element river ————— */}
      <ElementRiver />

      {/* ————— seam: the river pours into the first band ————— */}
      <BandWave
        from={tint("#F59F00", 7)}
        to={`var(--home-band-b, ${homeBandOf(0)})`}
        wave={1}
        className="h-[calc(30px*var(--ui-scale))] sm:h-[calc(40px*var(--ui-scale))]"
      />

      {/* ————— the six units ————— */}
      <div style={{ background: `var(--home-band-b, ${homeBandOf(0)})` }}>
        <section
          id="units"
          className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 pt-4 pb-8 sm:px-8"
        >
          <Reveal className="text-center">
            <SectionTag main="#FF922B" tilt={2}>
              the course
            </SectionTag>
            <h2 className="mt-5 font-display text-[calc(clamp(1.9rem,4vw,2.8rem)*(1+(var(--ui-scale)-1)*0.5))] leading-tight font-semibold text-ink">
              The six units
            </h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[calc(15.5px*var(--ui-scale))] leading-relaxed text-ink-soft">
              Tap a unit to see its topics in specification order. Topics you mark as revised
              are saved in your browser.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {units.map((u, i) => {
              const done = revised.filter((k) => k.startsWith(`${u.code}/`)).length;
              const pct = u.topics.length ? done / u.topics.length : 0;
              const minutes = u.topics.reduce((m, t) => m + t.minutes, 0);
              return (
                <UnitPlate
                  key={u.code}
                  u={u}
                  i={i}
                  pct={pct}
                  minutes={minutes}
                  onOpen={() => onOpenUnit(u.code)}
                />
              );
            })}
          </div>
        </section>
      </div>

      <BandWave
        from={`var(--home-band-b, ${homeBandOf(0)})`}
        to={`var(--home-band-a, ${homeBandOf(1)})`}
        wave={2}
      />

      {/* ————— the method, written as a reaction ————— */}
      <div style={{ background: `var(--home-band-a, ${homeBandOf(1)})` }}>
        <section
          id="how"
          className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 pt-12 pb-14 sm:px-8"
        >
          <Reveal className="text-center">
            <SectionTag main="#9775FA" tilt={-1.5}>
              how it works
            </SectionTag>
            <h2 className="mt-5 font-display text-[calc(clamp(1.9rem,4vw,2.8rem)*(1+(var(--ui-scale)-1)*0.5))] font-semibold text-ink">
              Read, practise, then mark it as revised
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-3 lg:gap-4">
            {[
              {
                n: "1",
                color: "#FF6B6B",
                icon: NotebookPen,
                title: "Read the notes",
                body: "Each topic is written in full — definitions, equations, tables and worked examples — following the specification point by point.",
              },
              {
                n: "2",
                color: "#FF922B",
                icon: ClipboardCheck,
                title: "Work the examples",
                body: "Every exercise the notes set is worked line by line. Cover the answer, try it yourself, then compare your working.",
              },
              {
                n: "3",
                color: "#9775FA",
                icon: Sticker,
                title: "Track your progress",
                body: "Mark a topic as revised when you finish it. The progress page keeps count — and clocks the minutes you give each topic.",
              },
            ].map((s, i) => (
              <div key={s.n} className="contents">
                <Reveal delay={i * 0.1} className="min-w-0 flex-1">
                  <Tilt className="h-full">
                    <div className="sticker h-full rounded-[calc(28px*var(--ui-scale))] bg-paper p-5 sm:p-6">
                      <div className="flex items-center gap-3.5">
                        <span
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[calc(19px*var(--ui-scale))] font-bold"
                          style={{ background: s.color, color: "#fff", boxShadow: `0 4px 0 ${shade(s.color)}` }}
                        >
                          {s.n}
                        </span>
                        <span
                          className="wiggle-hover grid h-11 w-11 place-items-center rounded-[calc(14px*var(--ui-scale))]"
                          style={{ background: tint(s.color, 14) }}
                        >
                          <s.icon className="h-5.5 w-5.5" style={{ color: shade(s.color, 62) }} strokeWidth={2.2} />
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-[calc(20px*var(--ui-scale))] font-semibold text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
                        {s.body}
                      </p>
                    </div>
                  </Tilt>
                </Reveal>
                {i < 3 && (
                  <div
                    className={`flex items-center justify-center py-1 ${i === 2 ? "rotate-90 md:rotate-0" : "rotate-90 md:rotate-0"}`}
                  >
                    <m.span
                      initial={{ scale: 0, rotate: -100 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.25 + i * 0.1 }}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                      style={
                        i === 2
                          ? { background: "#FF6B6B", color: "#fff", boxShadow: "0 3px 0 #C92A2A" }
                          : { background: tint("#F59F00", 16), color: shade("#F59F00", 62) }
                      }
                      aria-hidden
                    >
                      {i === 2 ? (
                        <MoveRight className="h-5.5 w-5.5" strokeWidth={2.5} />
                      ) : (
                        <DoodlePlus className="h-5 w-5" />
                      )}
                    </m.span>
                  </div>
                )}
              </div>
            ))}

            {/* the product of the reaction */}
            <Reveal delay={0.35} className="min-w-0 flex-1">
              <Tilt className="h-full">
                <div
                  className="sticker h-full rounded-[calc(28px*var(--ui-scale))] p-5 sm:p-6"
                  style={{ background: tint("#FF6B6B", 10) }}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-[calc(16px*var(--ui-scale))] text-white"
                      style={{ background: "#FF6B6B", boxShadow: "0 4px 0 #C92A2A" }}
                    >
                      <Target className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <span className="font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink-faint uppercase">
                      yields
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[calc(22px*var(--ui-scale))] font-semibold text-ink">
                    Exam-ready
                  </h3>
                  <p className="mt-2 text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
                    Six units, every spec point, the worked method on record — walk in knowing
                    the map, because you drew it yourself.
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </section>
      </div>

      <BandWave
        from={`var(--home-band-a, ${homeBandOf(1)})`}
        to={`var(--home-band-b, ${homeBandOf(2)})`}
        wave={3}
      />

      {/* ————— the revision pack ————— */}
      <div style={{ background: `var(--home-band-b, ${homeBandOf(2)})` }}>
        <section
          id="pack"
          className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 py-12 sm:px-8"
        >
          <Reveal>
            <div
              className="sticker relative overflow-hidden rounded-[calc(36px*var(--ui-scale))] px-6 py-8 sm:rounded-[calc(44px*var(--ui-scale))] sm:px-10 sm:py-10"
              style={{ background: "var(--tint-base)" }}
            >
              <Blob color={tint("#FFD43B", 20)} shape="b" still className="top-[-40%] right-[-8%] h-[70%] w-[38%]" />
              <DoodleHex className="absolute bottom-[8%] left-[3%] hidden h-8 w-8 text-lemon/40 sm:block" />
              <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
                <div className="min-w-0 flex-1">
                  <SectionTag main="#FFD43B" tilt={-1.5}>
                    your revision pack
                  </SectionTag>
                  <h2 className="mt-4 font-display text-[calc(clamp(1.8rem,3.6vw,2.5rem)*(1+(var(--ui-scale)-1)*0.5))] leading-tight font-semibold text-ink">
                    Tick spec points.
                    <span className="hero-glow relative ml-2 inline-block -rotate-1 rounded-[0.3em] px-[0.2em]">
                      Get one pack.
                    </span>
                  </h2>
                  <p className="mt-3 max-w-[54ch] text-[calc(15.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                    The spec index lists every statement the notes cover. Tick what
                    you&apos;re revising — before a class test, a mock, the real
                    thing — and the notes behind those points assemble into one
                    continuous read you can mark off, print or copy.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <CandyButton main="#FF922B" onClick={onOpenPack}>
                      {picks.length > 0 ? (
                        <>
                          Open your pack · {picks.length} point{picks.length === 1 ? "" : "s"}{" "}
                          <MoveRight className="h-5 w-5" />
                        </>
                      ) : (
                        <>
                          Build your pack <MoveRight className="h-5 w-5" />
                        </>
                      )}
                    </CandyButton>
                    <StickerButton onClick={onOpenSpec}>
                      <Target className="h-4 w-4 text-coral" /> Browse the spec index
                    </StickerButton>
                  </div>
                </div>

                {/* the tick, drawing itself */}
                <div ref={packRef} className="flex shrink-0 items-center justify-center md:pl-6">
                  <div
                    className="sticker relative rotate-[2.5deg] rounded-[calc(26px*var(--ui-scale))] bg-paper px-6 py-5"
                    aria-hidden
                  >
                    <span
                      className="rounded-full px-2.5 py-1 font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.08em] text-white uppercase"
                      style={{ background: "#12B886", boxShadow: "0 2px 0 #0B7A57" }}
                    >
                      spec point
                    </span>
                    <div className="mt-3 space-y-2">
                      <span className="block h-[calc(8px*var(--ui-scale))] w-[190px*var(--ui-scale)] rounded-full bg-ink/[0.09]" />
                      <span className="block h-[calc(8px*var(--ui-scale))] w-[150px*var(--ui-scale)] rounded-full bg-ink/[0.09]" />
                      <span className="block h-[calc(8px*var(--ui-scale))] w-[172px*var(--ui-scale)] rounded-full bg-ink/[0.09]" />
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <m.svg
                        viewBox="0 0 44 44"
                        className="h-11 w-11 shrink-0"
                        fill="none"
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.3 }}
                      >
                        <circle cx="22" cy="22" r="19" stroke="#12B886" strokeOpacity="0.25" strokeWidth="4" />
                        <m.path
                          d="M13 22.5 L19 28.5 L31 15.5"
                          stroke="#12B886"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </m.svg>
                      <div>
                        <div className="font-display text-[calc(26px*var(--ui-scale))] leading-none font-bold text-ink">
                          <CountUp to={picks.length} go={packSeen} />
                        </div>
                        <div className="mt-1 text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.1em] text-ink-faint uppercase">
                          points ticked
                        </div>
                      </div>
                    </div>
                    <DoodleSparkle className="absolute -top-2 -right-2 h-5 w-5 text-lemon/60" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <BandWave
        from={`var(--home-band-b, ${homeBandOf(2)})`}
        to={`var(--home-band-a, ${homeBandOf(3)})`}
        wave={4}
      />

      {/* ————— the bench: time, goals and today's pick ————— */}
      <div style={{ background: `var(--home-band-a, ${homeBandOf(3)})` }}>
        <section
          id="arcade"
          className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 pt-12 pb-20 sm:px-8"
        >
          <Reveal className="text-center">
            <SectionTag main="#FF6B6B" tilt={1.5}>
              stay on track
            </SectionTag>
            <h2 className="mt-5 font-display text-[calc(clamp(1.9rem,4vw,2.8rem)*(1+(var(--ui-scale)-1)*0.5))] font-semibold text-ink">
              Your bench, your pace
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Tilt className="h-full">
                <button
                  type="button"
                  onClick={onOpenSticker}
                  className="sticker sticker-pop group relative block h-full w-full cursor-pointer overflow-hidden rounded-[calc(32px*var(--ui-scale))] p-7 text-left sm:p-8"
                  style={{ background: tint("#12B886", 10) }}
                >
                  <Blob color={tint("#12B886", 22)} shape="c" still className="bottom-[-30%] left-[-15%] h-[75%] w-[55%]" />
                  <div className="relative z-10 flex h-full flex-col">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-[calc(20px*var(--ui-scale))] text-white"
                      style={{ background: "#12B886", boxShadow: "0 5px 0 #0B7A57" }}
                    >
                      <Timer className="h-7 w-7" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-5 font-display text-[calc(26px*var(--ui-scale))] font-semibold text-ink">
                      Time &amp; goals
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
                      The site quietly clocks your reading — today, this week and topic by topic.
                      Set a weekly goal, then watch the beaker fill. Currently{" "}
                      {revised.length}/{TOTALS.topics} topics marked as revised.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                      <span className="sticker rounded-full bg-paper/85 px-3.5 py-1.5 text-[calc(12px*var(--ui-scale))] font-extrabold text-ink">
                        weekly goals
                      </span>
                      <span className="sticker rounded-full bg-paper/85 px-3.5 py-1.5 text-[calc(12px*var(--ui-scale))] font-extrabold text-ink">
                        minutes per topic
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 font-display text-[calc(14px*var(--ui-scale))] font-bold text-mint">
                        open <MoveRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                      </span>
                    </div>
                  </div>
                </button>
              </Tilt>
            </Reveal>

            {suggestion ? (
              <Reveal delay={0.12}>
                <Tilt className="h-full">
                  <button
                    type="button"
                    onClick={() => onOpenTopic(suggestion.unit.code, suggestion.topic.id)}
                    className="sticker sticker-pop group relative block h-full w-full cursor-pointer overflow-hidden rounded-[calc(32px*var(--ui-scale))] p-7 text-left sm:p-8"
                    style={{ background: tint(suggestion.unit.candy.main, 10) }}
                  >
                    <Blob
                      color={tint(suggestion.unit.candy.main, 22)}
                      shape="b"
                      still
                      className="top-[-30%] right-[-15%] h-[75%] w-[55%]"
                    />
                    <div className="relative z-10 flex h-full flex-col">
                      <span
                        className="grid h-14 w-14 place-items-center rounded-[calc(20px*var(--ui-scale))] text-white"
                        style={{
                          background: suggestion.unit.candy.main,
                          boxShadow: `0 5px 0 ${shade(suggestion.unit.candy.main)}`,
                        }}
                      >
                        <Target className="h-7 w-7" strokeWidth={2.2} />
                      </span>
                      <h3 className="mt-5 font-display text-[calc(26px*var(--ui-scale))] font-semibold text-ink">
                        Today&apos;s pick
                      </h3>
                      <p className="mt-2 font-display text-[calc(15px*var(--ui-scale))] font-semibold text-ink">
                        {suggestion.topic.label} · {suggestion.topic.title}
                      </p>
                      <p className="mt-1 max-w-[46ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
                        {suggestion.reason} — about {suggestion.topic.minutes} minutes of reading.
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                        <span className="sticker rounded-full bg-paper/85 px-3.5 py-1.5 text-[calc(12px*var(--ui-scale))] font-extrabold text-ink">
                          picked fresh daily
                        </span>
                        <span
                          className="ml-auto inline-flex items-center gap-1.5 font-display text-[calc(14px*var(--ui-scale))] font-bold"
                          style={{ color: suggestion.unit.candy.main }}
                        >
                          read it <MoveRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </button>
                </Tilt>
              </Reveal>
            ) : (
              <Reveal delay={0.12}>
                <button
                  type="button"
                  onClick={onOpenSticker}
                  className="sticker sticker-pop block h-full w-full cursor-pointer rounded-[calc(32px*var(--ui-scale))] p-7 text-left sm:p-8"
                  style={{ background: tint("#12B886", 10) }}
                >
                  <h3 className="font-display text-[calc(26px*var(--ui-scale))] font-semibold text-ink">All done</h3>
                  <p className="mt-2 text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
                    Every topic is marked as revised. Respect.
                  </p>
                </button>
              </Reveal>
            )}
          </div>
        </section>
      </div>

      {/* last seam: the band drains toward the footer */}
      <BandWave
        from={`var(--home-band-a, ${homeBandOf(3)})`}
        to={`var(--home-band-b, var(--color-cream))`}
        wave={0}
      />

      {/* ————— the finale: flask filling, Bubbles cheering ————— */}
      <section
        className="px-3 pb-24 sm:px-5 sm:pb-28 lg:px-8"
        style={{ background: `var(--home-band-b, transparent)` }}
      >
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[calc(36px*var(--ui-scale))] bg-cocoa px-6 py-12 text-center sm:rounded-[calc(44px*var(--ui-scale))] sm:px-12 sm:py-16">
            <Blob color="rgba(255,107,107,0.16)" shape="b" still className="top-[-30%] left-[-10%] h-[70%] w-[45%]" />
            <Blob
              color="rgba(151,117,250,0.16)"
              shape="c"
              still
              className="right-[-12%] bottom-[-35%] h-[75%] w-[45%]"
            />
            <DoodlePlus className="absolute top-8 left-[12%] h-6 w-6 text-milk/25" />
            <DoodleSparkle className="absolute right-[16%] bottom-10 h-7 w-7 text-lemon/50" />

            <div className="relative z-10 mx-auto max-w-xl">
              <div className="flex items-end justify-center gap-1 md:gap-3">
                <FlaskFill className="h-[calc(168px*var(--ui-scale))] w-auto -rotate-2" />
                <div className="bobble relative">
                  <Confetti fire={boops} className="-translate-y-1/4" />
                  <Mascot
                    main="#FFD43B"
                    mood={cheer ? "cheer" : "idle"}
                    size={150}
                    boop
                    onBoop={boop}
                    bubbles={false}
                    className="relative z-10"
                  />
                </div>
              </div>
              <h2 className="mt-2 font-display text-[calc(clamp(1.8rem,3.6vw,2.6rem)*(1+(var(--ui-scale)-1)*0.5))] font-semibold text-milk">
                Pick a unit and dive in.
              </h2>
              <p className="mt-3 text-[calc(15.5px*var(--ui-scale))] leading-relaxed text-milk/75">
                Begin with Unit 1, or jump straight to the topic you are revising.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <CandyButton main="#FFD43B" onClick={() => scrollTo("units")}>
                  Browse the units <MoveRight className="h-5 w-5" />
                </CandyButton>
                <button
                  type="button"
                  onClick={() => onOpenUnit("WCH11")}
                  className="sticker inline-flex min-h-[calc(48px*var(--ui-scale))] cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[calc(15.5px*var(--ui-scale))] font-semibold select-none"
                  style={{ background: "rgb(255 255 255 / 0.94)", color: "#4a2f18", boxShadow: "0 4px 0 rgb(0 0 0 / 0.32)" }}
                >
                  Open Unit 1 <DoodleSparkle className="h-4 w-4 text-lemon" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
