"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "./icons";
import type { NotesBlock, NotesDoc } from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { togglePick, usePacks } from "@/lib/spectra/packs";
import { getNotes } from "@/lib/spectra/notes";
import { scrollToSpec, useSpecSpy } from "@/lib/spectra/scroll-helpers";
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
   IAL CHEM · the notes reader, in the gallery dress.
   The same note — same doc, same sections, same diagrams, same
   spec map registration, same pack ticks — hung on white walls
   instead of set as a document: a quiet hero, a ledger-style
   contents index, and the spec sections as a string of rooms
   parted by the rooms wave kit's own seams (BandWave, read
   only) — the page steps off the wall through one calm swell,
   every room hangs on a ground the lab tunes (the two
   --gal-room-a/b tokens in globals.css: a tonal walk in the
   dress's accent by day, wider glows after dark, and the classic
   lab's own espresso/cream signature pair), and every room hands
   you to the next through a seam that never repeats the previous
   curve — the wave kit's shelf, rotated the way home rotates it.
   Each room is opened by an oversized numeral in the accent. The
   classic and editorial readers' youngest twin; the props contract is
   identical, so the shell swaps them without knowing the
   difference. The rollout is complete: every note in the library
   (GALLERY_DOCS in prefs.ts) reads in the gallery — the class
   notes and the practicals alike, the practicals named by their
   own label (Practical 1, not Topic 1).
   ═══════════════════════════════════════════════════════════════ */

const hair = (pct: number) =>
  `color-mix(in oklab, var(--color-ink) ${pct}%, transparent)`;
const pad2 = (n: number) => String(n).padStart(2, "0");

/* ————— the rooms' grounds —————
   The walk alternates two lab-tuned grounds — the --gal-room-a/b
   tokens set per lab in globals.css. Daylight mixes the dress's
   one accent over the page's own cream (a half-step and a full
   step); night and dune widen the steps until the glows read on
   their dark grounds; classic stands the mixing down and walks
   its signature espresso/cream pair, the even rooms carrying the
   shared .room class so the classic wardrobe flips ink and
   surfaces inside — no two neighbours ever dress alike, and any
   room count keeps both end waves visible. */
const galRoom = (i: number) =>
  i % 2 === 0 ? "var(--gal-room-a)" : "var(--gal-room-b)";

/* ————— the seams —————
   The wave kit hangs a shelf of five hand-drawn curves so a page
   can put a differently-shaped wave at every boundary and never
   repeat itself twice in a row (the home page already walks the
   shelf that way). The gallery does the same: the lead-in uses
   the original reader curve, then each room hands you onwards
   around the shelf. The seams run taller than the kit's default
   — catalog proportions, a calm wide swell rather than a ripple. */
const galWaveH =
  "h-[calc(52px*var(--ui-scale))] sm:h-[calc(80px*var(--ui-scale))]";

/* ————— the gallery's verified hop —————
   The shared scrollToSpec recipe, plus an honest re-measure. The
   gallery's rooms are content-visibility-skipped like every other
   reader, and their real heights run well past the 880px estimate
   (Topic 9's long equilibrium sections), so the glide's captured
   target can be measured against layout that is still growing —
   the landing settles short, occasionally far short. The glide's
   own final animation frame can also land a moment AFTER a
   correcting snap and overwrite it. So the landing is policed:
   once the page stops moving, the anchor is re-measured and drift
   is snapped off, re-checked until it stays. If the READER has
   scrolled (wheel / touch / keys), the hop stands down — their
   scroll wins; if the page merely drifted on its own, any distance
   of drift is the hop's own business and gets corrected. */
function useGalleryHop() {
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

/* ————— the pack tick, gallery-quiet —————
   The reader's header control: is this spec point in your revision
   pack? Same store, same toggle — a hairline square that floods
   with the room's accent when it's yours. */
function GalleryPackTick({ spec }: { spec: string }) {
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
          className="font-display text-[calc(15px*var(--ui-scale))] leading-none font-medium"
        >
          +
        </span>
      )}
    </m.button>
  );
}

export function NotesGallery({
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
  return <NotesGalleryBody doc={doc} unit={unit} onBack={onBack} jumpToSpec={jumpToSpec} />;
}

function NotesGalleryBody({
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  /* the nav's Spec Map — the same registration every reader makes,
     same id, so the drawer tracks and hops this note no matter which
     dress it wears. The hop is the gallery's own verified recipe
     (see useGalleryHop). */
  const hop = useGalleryHop();
  /* the note's own name for itself — "Topic 9" on the class notes,
     "Practical 1" on WCH13, straight from the unit's topic list
     (the same label the unit page and the desk serve). The number
     is only the fallback for a doc whose topic never joined. The
     editorial reader derives the identical line. */
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

  /* deep links (spec index, packs) land on their section once the
     page has settled — the same verified hop the index uses */
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

  return (
    <main className="notes-flow gal relative mx-auto max-w-4xl px-5 pt-[calc(6.5rem+var(--sa-top))] pb-28 sm:px-8">
      {/* reading progress — the room's own hairline, in the accent */}
      <m.div
        aria-hidden
        className="fixed left-0 z-[70] h-[calc(2.5px*var(--ui-scale))] w-full origin-left"
        style={{
          top: "var(--sa-top)",
          scaleX,
          background: GAL_ACCENT,
        }}
      />

      {/* ————— back ————— */}
      <PopIn>
        <button
          type="button"
          onClick={onBack}
          aria-label={`Back to ${unit.code}`}
          className="group inline-flex min-h-[calc(42px*var(--ui-scale))] cursor-pointer items-center gap-2.5 rounded-full pr-2 pl-1 font-display text-[calc(13px*var(--ui-scale))] font-semibold text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
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

      {/* ————— the hero ————— */}
      <header className="mt-10 sm:mt-14">
        <PopIn delay={0.04}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              aria-hidden
              className="h-[2px] w-[26px] rounded-full"
              style={{ background: GAL_ACCENT }}
            />
            <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.24em] uppercase text-ink-faint">
              IAL CHEM · {unit.code} · {topicLabel}
            </span>
          </div>
          <h1 className="mt-5 max-w-[15ch] font-display text-[calc(clamp(2.7rem,6.4vw,4.9rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.03] font-medium tracking-[-0.045em] text-ink">
            {doc.title}
            <span style={{ color: GAL_ACCENT }}>.</span>
          </h1>
          {lede && (
            <p className="mt-6 max-w-[62ch] text-[calc(16.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
              <Fmt text={lede} />
            </p>
          )}
          {overture && (
            <p className="mt-4 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-faint">
              <Fmt text={overture} />
            </p>
          )}
        </PopIn>

        {/* the meta band — the hero's quiet ledger line */}
        <PopIn delay={0.08}>
          <div
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 border-y py-4"
            style={{ borderColor: hair(10) }}
          >
            {stats.map((s) => (
              <span
                key={s}
                className="font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase text-ink-faint"
              >
                {s}
              </span>
            ))}
          </div>
        </PopIn>
      </header>

      {/* ————— the index —————
          a two-column ledger: accent numeral, title, spec number —
          tap to hop; the section you're standing in wears the wash */}
      <section aria-label="Contents" className="mt-12">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.24em] uppercase text-ink-faint">
              Contents
            </span>
            <span
              aria-hidden
              className="h-px min-w-6 flex-1"
              style={{ background: hair(10) }}
            />
            <span
              className="font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase tabular-nums"
              style={{ color: GAL_ACCENT }}
            >
              {firstSpec} — {lastSpec}
            </span>
          </div>
          <div
            className="mt-2 grid gap-x-10 border-b sm:grid-cols-2"
            style={{ borderColor: hair(10) }}
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
                      ? "color-mix(in oklab, var(--iface-accent) 8%, transparent)"
                      : undefined,
                  }}
                >
                  <span
                    className="w-[26px] shrink-0 font-display text-[calc(12px*var(--ui-scale))] font-semibold tabular-nums"
                    style={{
                      color: isActive
                        ? GAL_ACCENT
                        : "var(--color-ink-faint)",
                    }}
                  >
                    {pad2(i + 1)}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-[calc(14px*var(--ui-scale))] font-semibold leading-snug transition-colors ${
                      isActive
                        ? "text-ink"
                        : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="shrink-0 font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.08em] tabular-nums text-ink-faint">
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
      </section>

      {/* ————— the catalog — the string of rooms —————
          the rooms reader's own wave walk, spoken in the gallery's
          register: the page steps off the wall through the kit's
          calm swell, every spec room hangs on a lab-tuned ground
          (the --gal-room-a/b tokens — tonal accent steps by day,
          wider glows after dark, classic's espresso/cream pair in
          that lab, whose even rooms also wear the shared .room
          class so its wardrobe flips ink and surfaces inside) and
          hands you to the next through a seam that never repeats
          the previous curve. BandWave is the shared wave kit —
          read only; the rooms' shelf and the exempt paths stay
          byte-untouched. */
      }
      <div className="mt-12 sm:mt-16">
        <div
          aria-hidden
          className="relative left-1/2 w-[100vw] -translate-x-1/2"
        >
          <BandWave
            from="var(--color-cream)"
            to={galRoom(0)}
            className={galWaveH}
          />
        </div>
        {doc.sections.map((section, i) => {
          const last = i === doc.sections.length - 1;
          return (
            <Fragment key={section.spec}>
              <div
                className={`relative left-1/2 w-[100vw] -translate-x-1/2${
                  i % 2 === 0 ? " room" : ""
                }`}
                style={{ background: galRoom(i) }}
              >
                <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
                  <Reveal y={18}>
                    <GallerySectionView
                      section={section}
                      index={i}
                      figOffset={figOffsets[i]}
                      bannerAction={<GalleryPackTick spec={section.spec} />}
                    />
                  </Reveal>
                </div>
              </div>
              <div
                aria-hidden
                className="relative left-1/2 w-[100vw] -translate-x-1/2"
              >
                <BandWave
                  from={galRoom(i)}
                  to={last ? "var(--color-cream)" : galRoom(i + 1)}
                  wave={(i + 1) % WAVES.length}
                  className={galWaveH}
                />
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* ————— end of the note ————— */}
      <Reveal>
        <section
          className="mt-10 border-t pt-10"
          style={{ borderColor: hair(10) }}
        >
          <GalleryLabel>End of the note</GalleryLabel>
          {/* Bubbles sees you out — the candy lab's one loan to the
              white wall, in the dress's own bronze, standing at the
              end of the note like a quiet exhibit label come alive */}
          <div className="mt-5 flex items-end gap-4">
            <p className="max-w-[60ch] flex-1 text-[calc(14.5px*var(--ui-scale))] leading-[1.9] text-ink-soft">
              Every spec point of {topicLabel}, walked once. Tick spec
              points along the way — the quiet square beside each section
              adds them to your revision pack, assembled in syllabus order
              and ready to print. Mark {topicLabel} as revised from its
              unit page when you can answer the statements unaided.
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
            className="mt-7 inline-flex min-h-[calc(42px*var(--ui-scale))] cursor-pointer items-center gap-2.5 rounded-full border px-5 font-display text-[calc(13px*var(--ui-scale))] font-semibold text-ink transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ borderColor: hair(16) }}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.1} /> Back to{" "}
            {unit.code}
          </button>
          <p className="mt-9 font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase text-ink-faint">
            {unit.code} · {unit.title}
          </p>
          <p className="mt-2 max-w-[70ch] text-[calc(12px*var(--ui-scale))] leading-[1.7] text-ink-faint">
            from {doc.source}
          </p>
        </section>
      </Reveal>
    </main>
  );
}
