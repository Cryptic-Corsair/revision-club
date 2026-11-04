"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { m, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Sparkles,
  Target,
} from "./icons";
import type { NotesBlock, NotesDoc } from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { togglePick, usePacks } from "@/lib/spectra/packs";
import { getNotes } from "@/lib/spectra/notes";
import { Fmt } from "./format";
import {
  PopIn,
  Reveal,
  SoftButton,
  SpeechBubble,
  Squiggle,
  Mascot,
  readableInk,
  shade,
  tint,
} from "./bits";
import { BandWave, SpecChip, accentOf, bgOf, inkMix } from "./bands";
import { useSpecMapRegister } from "./spec-map";
import { SpecSectionView } from "./note-section";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · notes reader — one enclosed room per spec point.
   Each section is a full-width tonal band borrowing one candy
   colour, walking the hue wheel so neighbours always contrast.
   By day the bands are candy tints; after dark both steps are
   flat warm roasts at matched darkness (--note-band-a/b in
   globals.css), so every section keeps the deep study-ground
   feel and the highlighter still pops. The wave rides between
   the bands, so the note reads as
   a string of connected rooms rather than one long scroll.
   ═══════════════════════════════════════════════════════════════ */

/* hop to a spec room. scrollIntoView alone proved flaky under some
   browsers (the smooth glide occasionally dies before it starts), so
   the target is computed by hand and the landing is verified — if the
   glide was silently cancelled, one instant snap finishes the trip.
   Rooms off-screen are content-visibility skipped in the reader, so
   the first measurement can ride on estimates; a short render pass —
   an instant pre-scroll to just shy of the target — materialises the
   real layout, and the glide then aims at measured ground. */
function scrollToSpec(spec: string) {
  const el = document.getElementById(`spec-${spec.replace(".", "-")}`);
  if (!el) return;
  const saTop =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--sa-top"),
    ) || 0;
  const topOf = () =>
    Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - 100 - saTop,
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

/* band helpers, waves and the shared SpecChip live in ./bands — the
   note's rooms, its contents card and the nav's Spec Map window all
   wear the exact same colours */

/* ————— the pack tick —————
   A section's banner carries one small control: is this spec point
   in your revision pack? It rides the bannerAction slot of the
   shared section renderer, so the reader can offer it while the
   pack itself — which has its own controls — passes nothing. One
   tap here and the navbar's pack badge grows; the point joins the
   assembly in syllabus order. */

function PackTick({ spec, accent }: { spec: string; accent: string }) {
  const { picks } = usePacks();
  const picked = picks.includes(spec);
  return (
    <m.button
      type="button"
      onClick={() => togglePick(spec)}
      whileTap={{ scale: 0.85 }}
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
      className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full"
      style={
        picked
          ? {
              background: accent,
              color: readableInk(accent),
              boxShadow: `0 2px 0 ${shade(accent)}`,
            }
          : {
              border: "2.5px dashed color-mix(in oklab, var(--color-ink) 32%, transparent)",
              color: "var(--color-ink-faint)",
            }
      }
    >
      {picked ? (
        <ClipboardCheck className="h-[18px] w-[18px]" strokeWidth={2.4} />
      ) : (
        <ClipboardList className="h-[18px] w-[18px]" strokeWidth={2.4} />
      )}
    </m.button>
  );
}

/* ————— main reader ————— */

export function NotesReader({
  docId,
  unit,
  onBack,
  jumpToSpec,
}: {
  /** the shell passes only the id — the full doc lives in this
      chunk, fetched by import() the first time a note is opened */
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
  return (
    <NotesReaderBody doc={doc} unit={unit} onBack={onBack} jumpToSpec={jumpToSpec} />
  );
}

function NotesReaderBody({
  doc,
  unit,
  onBack,
  jumpToSpec,
}: {
  doc: NotesDoc;
  unit: Unit;
  onBack: () => void;
  /** deep link — land scrolled to this spec section */
  jumpToSpec?: string;
}) {
  const main = unit.candy.main;
  const [active, setActive] = useState<string>(doc.sections[0]?.spec ?? "");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  /* scroll spy — after every scroll frame the position is recomputed
     from the real rects, so a fast glide (or a long map jump) can
     never leave a stale "you are here" behind. An IntersectionObserver
     was tried first, but Chrome occasionally swallows the final
     crossing of a long smooth glide, leaving the nav stuck one room
     back; eighteen rects per frame is a price too small to care. */
  const spyRaf = useRef(0);
  useEffect(() => {
    const pick = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = doc.sections[0]?.spec ?? "";
      for (const s of doc.sections) {
        const el = document.getElementById(`spec-${s.spec.replace(".", "-")}`);
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
  }, [doc]);

  /* the nav's Spec Map — sections, current stop and the hop helper,
     announced so the stop can live inside the navbar itself */
  const jump = useCallback((spec: string) => scrollToSpec(spec), []);
  useSpecMapRegister(
    useMemo(
      () => ({ id: doc.id, sections: doc.sections, main, active, jump }),
      [doc.id, doc.sections, main, active, jump],
    ),
  );

  /* deep links (spec index, packs) land on their section once the
     page has settled — the same verified hop the map uses */
  useEffect(() => {
    if (!jumpToSpec) return;
    const t = window.setTimeout(() => scrollToSpec(jumpToSpec), 420);
    return () => window.clearTimeout(t);
  }, [jumpToSpec]);

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
    `${doc.sections.length} spec sections`,
    `${count("worked")} worked examples`,
    `${count("figure")} diagrams`,
    `${count("checkpoint")} textbook checkpoints`,
    ...(spentHere >= 60 ? [`${fmtClock(spentHere)} of your time here`] : []),
  ];

  return (
    <div className="notes-flow relative">
      {/* reading progress */}
      <m.div
        aria-hidden
        className="fixed left-0 z-[70] h-[7px] w-full origin-left rounded-r-full"
        style={{
          top: "var(--sa-top)",
          scaleX,
          background: `linear-gradient(90deg, ${main}, #FFD43B)`,
        }}
      />

      {/* ————— header ————— */}
      <header className="mx-auto max-w-3xl px-4 pt-[calc(6rem+var(--sa-top))] sm:px-8">
        <PopIn>
          <SoftButton
            onClick={onBack}
            className="min-h-[42px] px-4 py-2 text-[13.5px]"
            ariaLabel={`Back to ${unit.code}`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to {unit.code}
          </SoftButton>
        </PopIn>

        <PopIn delay={0.05} className="mt-7 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[11.5px] font-bold tracking-[0.14em] text-white uppercase"
            style={{ background: main }}
          >
            <BookOpen className="h-3.5 w-3.5" /> Revision note
          </span>
          <span className="inline-flex items-center rounded-full bg-ink/5 px-3.5 py-1.5 text-[12.5px] font-bold capitalize text-ink-soft">
            {doc.source}
          </span>
        </PopIn>
        <PopIn delay={0.1}>
          <p
            className="mt-6 font-display text-[15px] font-semibold tracking-[0.06em] uppercase"
            style={{ color: inkMix(main, 52) }}
          >
            {doc.kicker}
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.2rem)] leading-[1.05] font-semibold tracking-tight text-ink">
            {doc.title}
          </h1>
        </PopIn>

        <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="shrink-0">
            <Mascot main={main} size={104} bubbles={false} />
          </div>
          <Reveal delay={0.15} className="min-w-0">
            <SpeechBubble tailClass="left-8 -top-[7px] rotate-[225deg]">
              <p className="text-[14.5px] leading-[1.75] text-ink">
                {doc.intro.map((b, i) =>
                  b.k === "p" ? (
                    <span key={i} className="block">
                      <Fmt text={b.text} />
                    </span>
                  ) : null,
                )}
              </p>
            </SpeechBubble>
          </Reveal>
        </div>

        <PopIn delay={0.18} className="mt-6 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold text-ink"
              style={{ background: tint(main, 12) }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: main }} /> {s}
            </span>
          ))}
        </PopIn>

        <Squiggle color={main} className="mt-7 h-3.5 w-full opacity-60" />
      </header>

      {/* ————— contents ————— */}
      <Reveal className="mx-auto max-w-3xl px-4 pt-4 sm:px-8">
        <div className="rounded-[30px] bg-paper p-5 puff sm:p-6">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
              style={{ background: tint(main, 16) }}
            >
              <Target className="h-5 w-5" style={{ color: inkMix(main, 60) }} />
            </span>
            <div>
              <h2 className="font-display text-[18px] font-semibold text-ink">
                Contents
              </h2>
              <p className="text-[12.5px] font-bold text-ink-faint">
                {doc.sections.length} sections · tap one to jump
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {doc.sections.map((s, i) => (
              <SpecChip
                key={s.spec}
                s={s}
                i={i}
                here={active === s.spec}
                onClick={() => scrollToSpec(s.spec)}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* ————— the string of rooms ————— */}
      <div className="mt-10">
        {/* the old sticky spec rail is gone — the map now lives inside
            the nav itself (see spec-map.tsx) */}

        <div className="mt-8">
          <BandWave from="var(--color-cream)" to={bgOf(0)} />
          {doc.sections.map((s, i) => {
            const accent = accentOf(i);
            const last = i === doc.sections.length - 1;
            return (
              <Fragment key={s.spec}>
                <section
                  id={`spec-${s.spec.replace(".", "-")}`}
                  className="spec-anchor relative"
                  style={{ background: bgOf(i) }}
                >
                  <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8 sm:py-16">
                    <SpecSectionView
                      section={s}
                      accent={accent}
                      bannerAction={<PackTick spec={s.spec} accent={accent} />}
                    />
                  </div>
                </section>
                <BandWave
                  from={bgOf(i)}
                  to={last ? "var(--color-cream)" : bgOf(i + 1)}
                />
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* ————— end of the note ————— */}
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-24 text-center sm:px-8">
        <Reveal className="flex flex-col items-center gap-5">
          <Squiggle color={main} className="h-3 w-40 opacity-70" />
          <p className="font-display text-[19px] font-semibold text-ink">
            That&apos;s the whole note — every spec point, word for word.
          </p>
          <SoftButton onClick={onBack} ariaLabel={`Back to ${unit.code}`}>
            <ArrowLeft className="h-4.5 w-4.5" /> Back to {unit.code}
          </SoftButton>
          <p className="mt-2 text-[12px] leading-relaxed font-bold text-ink-soft">
            <Fmt
              text={`==${unit.code}== · ${unit.title} · text kept verbatim from the ${doc.source}`}
            />
          </p>
        </Reveal>
      </div>
    </div>
  );
}

