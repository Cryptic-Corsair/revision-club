"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  type CSSProperties,
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
import { ROOM_UNIT_ACCENTS } from "@/lib/spectra/units";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { togglePick, usePacks } from "@/lib/spectra/packs";
import { getNotes } from "@/lib/spectra/notes";
import { scrollToSpec, useSpecSpy } from "@/lib/spectra/scroll-helpers";
import { Fmt, plural } from "./format";
import {
  PopIn,
  Reveal,
  SoftButton,
  SpeechBubble,
  Squiggle,
  Mascot,
  Kicker,
  readableInk,
  shade,
  tint,
} from "./bits";
import { BandWave, SpecChip, roomAccentOf, roomBgOf, inkMix } from "./bands";
import { useSpecMapRegister } from "./spec-map";
import { SpecSectionView } from "./note-section";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · notes reader — one enclosed room per spec point.
   Each section belongs to a considered six-colour mineral sequence.
   Accents identify the learning cues; surfaces stay tonal and calm.
   By day the bands carry a light wash; after dark both steps are
   flat neutral grounds (--note-band-a/b in
   globals.css), and in the classic lab the two steps are the
   fixed espresso/cream pair — so every section keeps contrast
   and the highlighter still pops. The wave rides between
   the bands, so the note reads as
   a string of connected rooms rather than one long scroll.
   ═══════════════════════════════════════════════════════════════ */

/* the verified hop and the scroll spy live in
   @/lib/spectra/scroll-helpers — shared with the sample room and
   any interface that comes next, so every skin lands on the same
   measured ground. The band helpers, waves and the shared SpecChip
   live in ./bands — the
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
              border: "2px dashed color-mix(in oklab, var(--color-ink) 28%, transparent)",
              color: "var(--color-ink-faint)",
            }
      }
    >
      {picked ? (
        <ClipboardCheck className="h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]" strokeWidth={2.4} />
      ) : (
        <ClipboardList className="h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]" strokeWidth={2.4} />
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
  const main = ROOM_UNIT_ACCENTS[unit.code];
  const active = useSpecSpy(doc.sections);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

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
    plural(doc.sections.length, "spec section"),
    plural(count("worked"), "worked example"),
    plural(count("figure"), "diagram"),
    ...(spentHere >= 60 ? [`${fmtClock(spentHere)} of your time here`] : []),
  ];

  return (
    <div className="notes-flow relative">
      {/* reading progress */}
      <m.div
        aria-hidden
        className="fixed left-0 z-[70] h-[calc(7px*var(--ui-scale))] w-full origin-left rounded-r-full"
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
            className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
            ariaLabel={`Back to ${unit.code}`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to {unit.code}
          </SoftButton>
        </PopIn>

        <PopIn delay={0.05} className="mt-7 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.14em] text-white uppercase"
            style={{ background: main }}
          >
            <BookOpen className="h-3.5 w-3.5" /> Revision note
          </span>
          <span className="inline-flex items-center rounded-full bg-ink/5 px-3.5 py-1.5 text-[calc(12.5px*var(--ui-scale))] font-semibold capitalize text-ink-soft">
            {doc.source}
          </span>
        </PopIn>
        <PopIn delay={0.1}>
          <Kicker color={inkMix(main, 62)} className="mt-7">
            {doc.kicker}
          </Kicker>
          <h1 className="mt-2.5 font-display text-[calc(clamp(2.1rem,5vw,3.2rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.05] font-semibold tracking-tight text-ink">
            {doc.title}
          </h1>
        </PopIn>

        <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="shrink-0">
            <Mascot main={main} size={88} bubbles={false} />
          </div>
          <Reveal delay={0.15} className="min-w-0">
            <SpeechBubble tailClass="left-8 -top-[calc(7px*var(--ui-scale))] rotate-[225deg]">
              <p className="text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink">
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
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[calc(12px*var(--ui-scale))] font-semibold text-ink"
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
        <div className="rounded-[calc(26px*var(--ui-scale))] bg-paper p-5 puff sm:p-6">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-ink/[0.08]"
              style={{ background: tint(main, 16) }}
            >
              <Target className="h-5 w-5" style={{ color: inkMix(main, 60) }} />
            </span>
            <div>
              <h2 className="font-display text-[calc(18px*var(--ui-scale))] font-semibold text-ink">
                Contents
              </h2>
              <p className="text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-faint">
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

        {/* .note-rooms scopes the classic lab's espresso/cream pair
            (html.classic .note-rooms) to the section bands only — the
            contents chips above stay on the daylight candy walk */}
        <div className="note-rooms mt-8">
          <BandWave from="var(--color-cream)" to={roomBgOf(0)} />
          {doc.sections.map((s, i) => {
            const accent = roomAccentOf(i);
            const last = i === doc.sections.length - 1;
            return (
              <Fragment key={s.spec}>
                <section
                  id={`spec-${s.spec.replace(".", "-")}`}
                  /* even rooms wear --note-band-a — in the classic lab
                     that's the espresso ground, so .room flips the ink
                     and surfaces inside (html.classic .room) */
                  className={`spec-anchor relative${i % 2 === 0 ? " room" : ""}`}
                  style={{ background: roomBgOf(i), "--room-accent": accent } as CSSProperties}
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
                  from={roomBgOf(i)}
                  to={last ? "var(--color-cream)" : roomBgOf(i + 1)}
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
          <p className="font-display text-[calc(19px*var(--ui-scale))] font-semibold text-ink">
            That&apos;s the whole note — every spec point of the topic.
          </p>
          <SoftButton onClick={onBack} ariaLabel={`Back to ${unit.code}`}>
            <ArrowLeft className="h-4.5 w-4.5" /> Back to {unit.code}
          </SoftButton>
          <p className="mt-2 text-[calc(12px*var(--ui-scale))] leading-relaxed font-semibold text-ink-soft">
            <Fmt
              text={`==${unit.code}== · ${unit.title} · from ${doc.source}`}
            />
          </p>
        </Reveal>
      </div>
    </div>
  );
}

