"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import dynamic from "next/dynamic";
import { m, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown } from "./icons";
import type { NotesBlock, NotesDoc } from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { togglePick, usePacks } from "@/lib/spectra/packs";
import { getNotes } from "@/lib/spectra/notes";
import { scrollToSpec, useSpecSpy } from "@/lib/spectra/scroll-helpers";
import { usePrefs } from "@/lib/spectra/prefs";
import { washById } from "@/lib/spectra/washes";
import { Fmt, plural } from "./format";
import { PopIn, Reveal, Mascot } from "./bits";
import { BandWave, WAVES } from "./bands";
import { useSpecMapRegister } from "./spec-map";
import {
  GalleryLabel,
  GallerySectionView,
  GAL_ACCENT,
  figOffsetsOf,
} from "./gallery-section";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the notes reader, in the water dress.
   The third interface — the note read over the living caustic
   water: ONE field (shared/WaterCanvas, the reference's own
   global-backdrop preset and budgets, portaled behind everything
   by water-backdrop.tsx) and every spec section a GLASS room hung
   on it — translucent washes of the dress's colour, never opaque,
   so the sea shows through for every section, all the way down.
   The rooms hand you onwards through the wave kit's seams whose
   shores are transparent: the glass parts, the water shows, the
   next room begins. The hero, the contents ledger and the end of
   the note sit straight on the open water.

   The dress carries its OWN colour system — the wash
   (lib/spectra/washes.ts), not the labs' tokens: the root re-points
   the reader's ink/paper/accent tokens from the wash, and the two
   open-water zones re-point the ink again to the field's own (milk
   over the abyss, deep sea-navy over the lagoon). The glass stays
   light in every wash, so the chemistry inside keeps its daylight
   contrast everywhere. The chrome around the reader (nav, drawers,
   footer) stays lab-dressed, exactly as the interface axis always
   has. The rollout is ledged: WATER_DOCS in prefs.ts — Topic 1 is
   the pilot; the props contract is identical to the other twins,
   so the shell swaps it without knowing the difference.
   ═══════════════════════════════════════════════════════════════ */

const hair = (pct: number) =>
  `color-mix(in oklab, var(--color-ink) ${pct}%, transparent)`;
const pad2 = (n: number) => String(n).padStart(2, "0");

/* the contents ledger's remembered posture — the same tiny key the
   gallery twin uses, so a reader who folded one folds both */
const TOC_KEY = "gallery-contents-expanded";
const readTocPosture = () => {
  try {
    return localStorage.getItem(TOC_KEY) !== "collapsed";
  } catch {
    return true;
  }
};

/* the wave seams run catalog-tall, like the gallery's */
const galWaveH =
  "h-[calc(52px*var(--ui-scale))] sm:h-[calc(80px*var(--ui-scale))]";

/* ————— the water dress's verified hop —————
   The shared scrollToSpec recipe plus the honest re-measure, the
   gallery twin's own police: content-visibility rooms keep growing
   after the glide's captured target, so once the page stops moving
   the anchor is re-measured and drift snapped off until it stays.
   The reader's own scroll stands the hop down. */
function useWaterHop() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const detachRef = useRef<() => void>(() => {});
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      detachRef.current();
    },
    [],
  );
  return useCallback((spec: string) => {
    scrollToSpec(spec);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    detachRef.current();
    let prev = -1;
    let checks = 0;
    let readerMoved = false;
    const markMoved = () => {
      readerMoved = true;
    };
    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(
          e.key,
        )
      )
        markMoved();
    };
    window.addEventListener("wheel", markMoved, { passive: true });
    window.addEventListener("touchmove", markMoved, { passive: true });
    window.addEventListener("keydown", onKey);
    const detach = () => {
      window.removeEventListener("wheel", markMoved);
      window.removeEventListener("touchmove", markMoved);
      window.removeEventListener("keydown", onKey);
    };
    detachRef.current = detach;
    const anchorId = `spec-${spec.replace(".", "-")}`;
    const settle = () => {
      const y = window.scrollY;
      const stopped = y === prev;
      prev = y;
      if (!stopped) {
        schedule(); /* still gliding — look again once it rests */
        return;
      }
      const el = document.getElementById(anchorId);
      if (!el) {
        detach();
        return;
      }
      const saTop =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--sa-top"),
        ) || 0;
      const target = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - 100 - saTop,
      );
      const drift = y - target;
      if (Math.abs(drift) >= 4) {
        if (readerMoved && Math.abs(drift) > 800) {
          detach(); /* the reader scrolled on — their scroll wins */
          return;
        }
        window.scrollTo({ top: target, behavior: "instant" as ScrollBehavior });
        schedule(); /* verify the snap survived the glide's last frame */
        return;
      }
      detach(); /* landed — the landing is now the reader's own */
    };
    const schedule = () => {
      if (checks++ < 8) timers.current.push(setTimeout(settle, 420));
      else detach();
    };
    schedule();
  }, []);
}

/* ————— the pack tick, water-quiet —————
   The gallery's hairline square, reading the wash accent through
   the re-pointed --iface-accent. */
function WaterPackTick({ spec }: { spec: string }) {
  const { picks } = usePacks();
  const picked = picks.includes(spec);
  return (
    <m.button
      type="button"
      onClick={() => togglePick(spec)}
      whileTap={{ scale: 0.88 }}
      whileHover={{ y: -1 }}
      aria-pressed={picked}
      aria-label={
        picked
          ? `Remove spec point ${spec} from your revision pack`
          : `Add spec point ${spec} to your revision pack`
      }
      title={
        picked
          ? `${spec} is in your pack — tap to remove`
          : `Add ${spec} to your revision pack`
      }
      className="grid h-[calc(32px*var(--ui-scale))] w-[calc(32px*var(--ui-scale))] shrink-0 cursor-pointer place-items-center rounded-[10px] transition-all hover:opacity-85"
      style={
        picked
          ? {
              background: GAL_ACCENT,
              color: "var(--iface-accent-ink)",
            }
          : {
              border: `1.5px solid ${hair(18)}`,
              color: "var(--color-ink-faint)",
            }
      }
    >
      {picked ? (
        <Check
          className="h-[calc(15px*var(--ui-scale))] w-[calc(15px*var(--ui-scale))]"
          strokeWidth={2.6}
        />
      ) : (
        <span
          aria-hidden
          className="font-display text-[calc(15px*var(--ts-body))] leading-none font-medium"
        >
          +
        </span>
      )}
    </m.button>
  );
}

/* the field the reader mounts — fetched only when the dress is
   actually worn, so the WebGL module never joins anyone else's
   chunk */
const WaterBackdrop = dynamic(
  () => import("./water-backdrop").then((m) => m.WaterBackdrop),
  { ssr: false },
);

export function NotesWater({
  docId,
  unit,
  onBack,
  jumpToSpec,
}: {
  docId: string;
  unit: Unit;
  onBack: () => void;
  /** deep link — land scrolled to this spec section */
  jumpToSpec?: string;
}) {
  const doc = getNotes(docId);
  if (!doc) {
    /* the shell only opens notes it knows from notes-meta.ts, so
       this is a belt-and-braces room — still, never a white screen */
    return (
      <div className="flex min-h-[55dvh] items-center justify-center">
        <span className="h-7 w-7 animate-spin rounded-full border-[3.5px] border-ink/10 border-t-ink/45" />
      </div>
    );
  }
  return <NotesWaterBody doc={doc} unit={unit} onBack={onBack} jumpToSpec={jumpToSpec} />;
}

function NotesWaterBody({
  doc,
  unit,
  onBack,
  jumpToSpec,
}: {
  doc: NotesDoc;
  unit: Unit;
  onBack: () => void;
  jumpToSpec?: string;
}) {
  const active = useSpecSpy(doc.sections);
  const prefs = usePrefs();
  const wash = washById(prefs.wash);

  /* the dress's tokens. The ROOT wears the rooms' palette (dark
     inks on light glass, in every wash) and re-points the accent —
     the gallery furniture this dress borrows (the section view, the
     pack tick, the chip rail) reads the wash through it. The sheet
     is pinned white: the water dress is lab-independent, and white
     sheets hold on glass in every wash. */
  const dress = {
    "--iface-accent": wash.accent,
    "--iface-accent-ink": wash.accentInk,
    "--color-ink": wash.roomInk,
    "--color-ink-soft": wash.roomInkSoft,
    "--color-ink-faint": wash.roomInkFaint,
    "--color-paper": "#FFFFFF",
  } as CSSProperties;
  /* the open-water zones (back + hero + contents, and the end of
     the note) re-point the ink again to the field's own — milk over
     the abyss, deep sea-navy over the lagoon */
  const openWater = {
    ...dress,
    "--color-ink": wash.ink,
    "--color-ink-soft": wash.inkSoft,
    "--color-ink-faint": wash.inkFaint,
  } as CSSProperties;

  /* the contents ledger's posture — expanded by default, remembered
     across notes the way the gallery twin's is */
  const [contentsExpanded, setContentsExpanded] = useState(readTocPosture);
  useEffect(() => {
    try {
      localStorage.setItem(
        TOC_KEY,
        contentsExpanded ? "expanded" : "collapsed",
      );
    } catch {
      /* private mode etc. — the ledger simply forgets */
    }
  }, [contentsExpanded]);

  /* the minimized rail keeps your place in view — the gallery twin's
     keep-in-view recipe, spoken horizontally */
  const tocChipsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (contentsExpanded) return;
    const nav = tocChipsRef.current;
    if (!nav) return;
    const chip = nav.querySelector<HTMLElement>("[data-active]");
    if (!chip) return;
    if (nav.scrollWidth <= nav.clientWidth + 1) return;
    const margin = 12;
    const lo = nav.scrollLeft;
    const hi = nav.scrollLeft + nav.clientWidth;
    const target =
      chip.offsetLeft < lo
        ? chip.offsetLeft - margin
        : chip.offsetLeft + chip.offsetWidth > hi
          ? chip.offsetLeft + chip.offsetWidth - nav.clientWidth + margin
          : null;
    if (target !== null)
      nav.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active, contentsExpanded]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  const hop = useWaterHop();
  const topicNo = Number(doc.topicId.slice(1));
  const topicLabel =
    unit.topics.find((t) => t.id === doc.topicId)?.label ??
    `Topic ${topicNo}`;
  useSpecMapRegister(
    useMemo(
      () => ({
        id: doc.id,
        label: `${unit.code} · ${topicLabel.toUpperCase()}`,
        sections: doc.sections,
        active,
        jump: hop,
      }),
      [doc.id, unit.code, topicLabel, doc.sections, active, hop],
    ),
  );

  useEffect(() => {
    if (!jumpToSpec) return;
    const t = window.setTimeout(() => hop(jumpToSpec), 420);
    return () => window.clearTimeout(t);
  }, [jumpToSpec, hop]);

  const count = (k: NotesBlock["k"]) => {
    let n = 0;
    const walk = (blocks: NotesBlock[]) =>
      blocks.forEach((b) => b.k === k && n++);
    walk(doc.intro);
    doc.sections.forEach((s) => walk(s.blocks));
    if (doc.outro) walk(doc.outro);
    return n;
  };
  const time = useTimeData();
  const spentHere = topicSeconds(time, `${unit.code}/${doc.topicId}`);
  const stats = [
    plural(doc.sections.length, "spec section"),
    plural(count("worked"), "worked example"),
    plural(count("figure"), "diagram"),
    ...(spentHere >= 60 ? [`${fmtClock(spentHere)} of your time here`] : []),
  ];

  const figOffsets = useMemo(() => figOffsetsOf(doc.sections), [doc.sections]);
  const firstSpec = doc.sections[0]?.spec ?? "";
  const lastSpec = doc.sections[doc.sections.length - 1]?.spec ?? "";
  const introPs = doc.intro.filter((b) => b.k === "p");
  const lede = introPs[0]?.k === "p" ? introPs[0].text : null;
  const overture = introPs[1]?.k === "p" ? introPs[1].text : null;

  const roomGround = (i: number) => (i % 2 === 0 ? wash.glassA : wash.glassB);

  return (
    <main
      className="notes-flow water-reader relative mx-auto max-w-[calc(var(--gal-measure)_+_calc(var(--spacing)_*_16))] px-5 pt-[calc(6.5rem+var(--sa-top))] pb-28 sm:px-8"
      style={dress}
      data-wash={wash.id}
      data-testid="water-reader"
    >
      {/* the living field — portaled to <body> behind everything;
          the glass rooms keep it on stage for every section */}
      <WaterBackdrop wash={wash} />

      {/* reading progress — the reader's hairline, in the wash accent */}
      <m.div
        aria-hidden
        className="fixed left-0 z-[70] h-[calc(2.5px*var(--ui-scale))] w-full origin-left"
        style={{
          top: "var(--sa-top)",
          scaleX,
          background: GAL_ACCENT,
        }}
      />

      {/* ————— open water: back, hero, contents ————— */}
      <div style={openWater}>
        <PopIn>
          <button
            type="button"
            onClick={onBack}
            aria-label={`Back to ${unit.code}`}
            className="group inline-flex min-h-[calc(42px*var(--ui-scale))] cursor-pointer items-center gap-2.5 rounded-full pr-2 pl-1 font-display text-[calc(13px*var(--ts-body))] font-semibold text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span
              className="grid h-[calc(30px*var(--ui-scale))] w-[calc(30px*var(--ui-scale))] place-items-center rounded-full border transition-colors group-hover:border-ink/30"
              style={{ borderColor: hair(16) }}
            >
              <ArrowLeft className="h-[14px] w-[14px]" strokeWidth={2.1} />
            </span>
            Back to {unit.code}
          </button>
        </PopIn>

        {/* ————— the hero, on the open water ————— */}
        <header className="mt-10 sm:mt-14">
          <PopIn delay={0.04}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden
                className="h-[2px] w-[26px] rounded-full"
                style={{ background: GAL_ACCENT }}
              />
              <span className="font-display text-[calc(10.5px*var(--ts-other))] font-semibold tracking-[0.24em] uppercase text-ink-faint">
                IAL CHEM · {unit.code} · {topicLabel}
              </span>
            </div>
            <h1 className="mt-5 max-w-[15ch] font-display text-[calc(clamp(2.7rem,6.4vw,4.9rem)*var(--tch-ed))] leading-[1.03] font-medium tracking-[-0.045em] text-ink">
              {doc.title}
              <span style={{ color: GAL_ACCENT }}>.</span>
            </h1>
            {lede && (
              <p className="mt-6 max-w-[62ch] text-[calc(16.5px*var(--ts-body))] leading-[1.85] text-ink-soft">
                <Fmt text={lede} />
              </p>
            )}
            {overture && (
              <p className="mt-4 max-w-[62ch] text-[calc(14.5px*var(--ts-body))] leading-[1.85] text-ink-faint">
                <Fmt text={overture} />
              </p>
            )}
          </PopIn>

          <PopIn delay={0.08}>
            <div
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 border-y py-4"
              style={{ borderColor: hair(12) }}
            >
              {stats.map((s) => (
                <span
                  key={s}
                  className="font-display text-[calc(10.5px*var(--ts-other))] font-semibold tracking-[0.18em] uppercase text-ink-faint"
                >
                  {s}
                </span>
              ))}
            </div>
          </PopIn>
        </header>

        {/* ————— the index — a glass ledger on the water ————— */}
        <section
          aria-label="Contents"
          className={`gal-toc mt-12 ${contentsExpanded ? "" : "gal-toc-min"}`}
        >
          {contentsExpanded ? (
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-display text-[calc(10.5px*var(--ts-other))] font-semibold tracking-[0.24em] uppercase text-ink-faint">
                  Contents
                </span>
                <span
                  aria-hidden
                  className="h-px min-w-6 flex-1"
                  style={{ background: hair(12) }}
                />
                <span
                  className="font-display text-[calc(10.5px*var(--ts-other))] font-semibold tracking-[0.18em] uppercase tabular-nums"
                  style={{ color: GAL_ACCENT }}
                >
                  {firstSpec} — {lastSpec}
                </span>
                <button
                  type="button"
                  onClick={() => setContentsExpanded(false)}
                  aria-expanded={true}
                  aria-controls="water-toc"
                  aria-label="Collapse contents"
                  title="Collapse contents"
                  className="etoc-toggle"
                >
                  <ChevronDown className="h-4 w-4 rotate-90 transition-transform duration-200" />
                </button>
              </div>
              <div
                id="water-toc"
                className="mt-2 grid gap-x-10 border-b sm:grid-cols-2"
                style={{ borderColor: hair(12) }}
              >
                {doc.sections.map((s, i) => {
                  const isActive = active === s.spec;
                  return (
                    <button
                      key={s.spec}
                      type="button"
                      onClick={() => hop(s.spec)}
                      aria-current={isActive ? "location" : undefined}
                      aria-label={`Go to specification ${s.spec}: ${s.title}`}
                      className="group -mx-3 flex min-w-0 cursor-pointer items-center gap-3 rounded-[10px] border-t px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        borderColor: hair(10),
                        background: isActive
                          ? "color-mix(in oklab, var(--iface-accent) 10%, transparent)"
                          : undefined,
                      }}
                    >
                      <span
                        className="w-[26px] shrink-0 font-display text-[calc(12px*var(--ts-other))] font-semibold tabular-nums"
                        style={{
                          color: isActive
                            ? GAL_ACCENT
                            : "var(--color-ink-faint)",
                        }}
                      >
                        {pad2(i + 1)}
                      </span>
                      <span
                        className={`min-w-0 flex-1 truncate text-[calc(14px*var(--ts-body))] font-semibold leading-snug transition-colors ${
                          isActive
                            ? "text-ink"
                            : "text-ink-soft group-hover:text-ink"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="shrink-0 font-display text-[calc(10.5px*var(--ts-other))] font-semibold tracking-[0.08em] tabular-nums text-ink-faint">
                        {s.spec}
                      </span>
                      <ArrowUpRight
                        className={`h-3.5 w-3.5 shrink-0 transition-all duration-200 ${
                          isActive
                            ? ""
                            : "-translate-x-0.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                        }`}
                        style={{ color: GAL_ACCENT }}
                      />
                    </button>
                  );
                })}
              </div>
            </Reveal>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setContentsExpanded(true)}
                aria-expanded={false}
                aria-controls="water-toc"
                aria-label="Expand contents"
                title="Expand contents"
                className="etoc-toggle shrink-0"
              >
                <ChevronDown className="h-4 w-4 -rotate-90 transition-transform duration-200" />
              </button>
              <nav
                id="water-toc"
                ref={tocChipsRef}
                aria-label="Note contents"
                className="gal-toc-chips"
              >
                {doc.sections.map((s) => {
                  const isActive = active === s.spec;
                  return (
                    <button
                      key={s.spec}
                      type="button"
                      onClick={() => hop(s.spec)}
                      aria-current={isActive ? "location" : undefined}
                      aria-label={`Go to specification ${s.spec}: ${s.title}`}
                      title={s.title}
                      data-active={isActive || undefined}
                      className="gal-toc-chip"
                    >
                      {s.spec}
                    </button>
                  );
                })}
              </nav>
            </>
          )}
        </section>
      </div>

      {/* ————— the catalog — glass rooms over the living sea —————
          every spec section hangs on a translucent wash of the dress
          (the two glass grounds alternating, the water showing
          through by design), and the wave kit's seams part them with
          transparent shores: glass, open water, glass. The rooms
          wear no lab wardrobe — the dress is wash-owned end to end. */}
      <div className="mt-12 sm:mt-16">
        <div
          aria-hidden
          className="relative left-1/2 w-[100vw] -translate-x-1/2"
        >
          <BandWave from="transparent" to={wash.glassA} className={galWaveH} />
        </div>
        {doc.sections.map((section, i) => {
          const last = i === doc.sections.length - 1;
          return (
            <Fragment key={section.spec}>
              <div
                className="relative left-1/2 w-[100vw] -translate-x-1/2"
                style={{ background: roomGround(i) }}
              >
                <div className="mx-auto max-w-[calc(var(--gal-measure)_+_calc(var(--spacing)_*_16))] px-5 py-16 sm:px-8 sm:py-20">
                  <Reveal y={18}>
                    <GallerySectionView
                      section={section}
                      index={i}
                      figOffset={figOffsets[i]}
                      bannerAction={<WaterPackTick spec={section.spec} />}
                    />
                  </Reveal>
                </div>
              </div>
              <div
                aria-hidden
                className="relative left-1/2 w-[100vw] -translate-x-1/2"
              >
                <BandWave
                  from={roomGround(i)}
                  to={last ? "transparent" : roomGround(i + 1)}
                  wave={(i + 1) % WAVES.length}
                  className={galWaveH}
                />
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* ————— open water again: the end of the note ————— */}
      <div style={openWater}>
        <Reveal>
          <section
            className="mt-10 border-t pt-10"
            style={{ borderColor: hair(12) }}
          >
            <GalleryLabel>End of the note</GalleryLabel>
            <div className="mt-5 flex items-end gap-4">
              <p className="max-w-[60ch] flex-1 text-[calc(14.5px*var(--ts-body))] leading-[1.9] text-ink-soft">
                Every spec point of {topicLabel}, walked once over the
                water. Tick spec points along the way — the quiet square
                beside each section adds them to your revision pack,
                assembled in syllabus order and ready to print. Mark{" "}
                {topicLabel} as revised from its unit page when you can
                answer the statements unaided.
              </p>
              <Mascot
                main={GAL_ACCENT}
                mood="idle"
                size={64}
                bubbles={false}
                className="shrink-0"
              />
            </div>
            <button
              type="button"
              onClick={onBack}
              aria-label={`Back to ${unit.code}`}
              className="mt-7 inline-flex min-h-[calc(42px*var(--ui-scale))] cursor-pointer items-center gap-2.5 rounded-full border px-5 font-display text-[calc(13px*var(--ts-body))] font-semibold text-ink transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ borderColor: hair(16) }}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.1} /> Back to{" "}
              {unit.code}
            </button>
            <p className="mt-9 font-display text-[calc(10.5px*var(--ts-other))] font-semibold tracking-[0.18em] uppercase text-ink-faint">
              {unit.code} · {unit.title}
            </p>
            <p className="mt-2 max-w-[70ch] text-[calc(12px*var(--ts-other))] leading-[1.7] text-ink-faint">
              from {doc.source}
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
