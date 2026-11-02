"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  EyeOff,
  Footprints,
  Lightbulb,
  ListChecks,
  PenLine,
  Sparkles,
  StickyNote,
  Target,
} from "./icons";
import type {
  NotesBlock,
  NotesDoc,
  SpecSection,
} from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
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
  ScrollFade,
} from "./bits";
import { BandWave, SpecChip, accentOf, bgOf, inkMix, isRoom } from "./bands";
import { useSpecMapRegister } from "./spec-map";
import {
  FigAtom,
  FigBoxesC,
  FigBoxesS,
  FigCarbonLattices,
  FigDipoles,
  FigDotCross,
  FigFillDemo,
  FigFillOrder,
  FigFormulaTypes,
  FigFracCol,
  FigIeGraph,
  FigIsomers,
  FigMassSpec,
  FigMelting,
  FigNotation,
  FigOrbitals,
  FigPtBlocks,
  FigNaming,
  FigRadius,
  FigRadChain,
  FigShapes,
  FigShielding,
  FigSigmaPi,
  FigSpectrumBoron,
  FigSpectrumBromine,
  FigSpectrumCl2,
  FigSpectrumEthanol,
  FigSpectrumNeon,
  FigSuccIe,
} from "./notes-figures";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · notes reader — one enclosed room per spec point.
   Each section is a full-width tonal band borrowing one candy
   colour, walking the hue wheel so neighbours always contrast.
   In the hybrid lab every third band is a deep cocoa room with
   milk-toned fonts (see html.hybrid .room in globals.css); in the
   other two labs the same bands stay candy — the class is inert.
   The footer's wave rides between the bands, so the note reads as
   a string of connected rooms rather than one long scroll.
   ═══════════════════════════════════════════════════════════════ */

/* hop to a spec room. scrollIntoView alone proved flaky under some
   browsers (the smooth glide occasionally dies before it starts), so
   the target is computed by hand and the landing is verified — if the
   glide was silently cancelled, one instant snap finishes the trip */
function scrollToSpec(spec: string) {
  const el = document.getElementById(`spec-${spec.replace(".", "-")}`);
  if (!el) return;
  const saTop =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--sa-top"),
    ) || 0;
  const top = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - 100 - saTop,
  );
  const landed = () => Math.abs(window.scrollY - top) < 2;
  window.scrollTo({ top, behavior: "smooth" });
  /* two heartbeats: if the glide is still moving, leave it be; if it
     stalled mid-trip, snap the rest of the way so the hop always lands */
  window.setTimeout(() => {
    if (landed()) return;
    const y1 = window.scrollY;
    window.setTimeout(() => {
      if (!landed() && Math.abs(window.scrollY - y1) < 1)
        window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
    }, 450);
  }, 450);
}

/* band helpers, waves and the shared SpecChip live in ./bands — the
   note's rooms, its contents card and the nav's Spec Map window all
   wear the exact same colours */

/* ————— main reader ————— */

export function NotesReader({
  doc,
  unit,
  onBack,
}: {
  doc: NotesDoc;
  unit: Unit;
  onBack: () => void;
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
    <div className="relative">
      {/* reading progress */}
      <motion.div
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
            ariaLabel="Back to the topic page"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the topic page
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
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
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
            const room = isRoom(i);
            const last = i === doc.sections.length - 1;
            return (
              <Fragment key={s.spec}>
                <section
                  id={`spec-${s.spec.replace(".", "-")}`}
                  className={`relative scroll-mt-[calc(100px+var(--sa-top))]${room ? " room" : ""}`}
                  style={{ background: bgOf(i) }}
                >
                  <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8 sm:py-16">
                    <SpecSectionView section={s} accent={accent} />
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
          <SoftButton onClick={onBack} ariaLabel="Back to the topic page">
            <ArrowLeft className="h-4.5 w-4.5" /> Back to the topic page
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

/* ————— one specification section — a room with its own colour ————— */

function SpecSectionView({
  section,
  accent,
}: {
  section: SpecSection;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-7">
      {/* spec banner — the official wording, stated above the section */}
      <div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex shrink-0 rotate-[-1.5deg] items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[12px] font-bold tracking-[0.08em] uppercase"
            style={{
              background: accent,
              color: readableInk(accent),
              boxShadow: `0 3px 0 ${shade(accent)}`,
            }}
          >
            <Target className="h-3.5 w-3.5" /> Spec {section.spec}
          </span>
          <span
            aria-hidden
            className="h-[3px] flex-1 rounded-full"
            style={{ background: tint(accent, 32) }}
          />
        </div>
        <h2 className="mt-3.5 font-display text-[clamp(1.55rem,3.4vw,1.95rem)] font-semibold tracking-tight text-ink">
          {section.title}
        </h2>
        <div
          className="mt-4 rounded-[22px] bg-paper/85 px-5 py-4"
          style={{ borderLeft: `5px solid ${tint(accent, 45)}` }}
        >
          <div
            className="font-display text-[10.5px] font-extrabold tracking-[0.2em] uppercase"
            style={{ color: inkMix(accent, 62) }}
          >
            From the specification
          </div>
          <p className="mt-1.5 text-[14.5px] leading-[1.75] text-ink italic">
            <Fmt text={section.statement} />
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {section.blocks.map((b, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.12)} y={18}>
            <BlockView block={b} accent={accent} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ————— block dispatcher ————— */

function BlockView({
  block: b,
  accent,
}: {
  block: NotesBlock;
  accent: string;
}) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[16.5px] leading-[1.8] text-ink/90">
          <Fmt text={b.text} />
        </p>
      );
    case "h":
      return (
        <div className="flex items-center gap-2.5 pt-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <h3 className="font-display text-[21px] font-semibold tracking-tight text-ink">
            <Fmt text={b.text} />
          </h3>
        </div>
      );
    case "bullets":
      return (
        <ul className="flex max-w-[70ch] flex-col gap-2.5">
          {b.items.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[16px] leading-[1.8] text-ink/90"
            >
              <span
                className="mt-[11px] h-2 w-2 shrink-0 rounded-full"
                style={{ background: tint(accent, 55) }}
              />
              <span>
                <Fmt text={t} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div
          className="max-w-[72ch] rounded-[20px] px-4 py-3.5"
          style={{ background: tint("#FFD43B", 18) }}
        >
          <div className="flex items-start gap-3">
            <StickyNote
              className="mt-0.5 h-4.5 w-4.5 shrink-0"
              style={{ color: inkMix("#B08D00", 62) }}
            />
            <p className="text-[14.5px] leading-[1.7] text-ink">
              <span
                className="mr-1.5 font-display text-[11.5px] font-extrabold tracking-[0.12em] uppercase"
                style={{ color: inkMix("#B08D00", 58) }}
              >
                {b.label}:
              </span>
              <Fmt text={b.text} />
            </p>
          </div>
        </div>
      );
    case "def":
      return (
        <div
          className="max-w-[72ch] rounded-[20px] bg-paper px-5 py-4 puff"
          style={{ borderLeft: `5px solid ${tint(accent, 40)}` }}
        >
          <h4 className="font-display text-[16.5px] font-semibold text-ink">
            <Fmt text={b.term} />
          </h4>
          <p className="mt-1.5 text-[15.5px] leading-[1.75] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </div>
      );
    case "eq":
      return (
        <div
          className="max-w-[72ch] rounded-[22px] p-5"
          style={{ background: tint(accent, 9) }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
            {b.eq.split(/\s{2,}/).map((part, i) => (
              <span
                key={i}
                className="rounded-2xl bg-paper px-4 py-2.5 font-mono text-[14.5px] font-semibold text-ink shadow-[0_3px_0_color-mix(in_oklab,var(--color-ink)_7%,transparent)]"
              >
                <Fmt text={part.trim()} />
              </span>
            ))}
          </div>
          {b.note && (
            <p className="mt-3 text-[13px] leading-relaxed font-bold text-ink-soft">
              <Fmt text={b.note} />
            </p>
          )}
        </div>
      );
    case "table":
      return (
        <CandyTable
          head={b.head}
          rows={b.rows}
          caption={b.caption}
          accent={accent}
        />
      );
    case "worked":
      return (
        <Worked
          title={b.title}
          question={b.question}
          steps={b.steps}
          answer={b.answer}
          accent={accent}
        />
      );
    case "steps":
      return <StepsPanel caption={b.caption} items={b.items} accent={accent} />;
    case "checkpoint":
      return (
        <div className="flex items-center gap-3 rounded-full bg-paper px-5 py-4 puff">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
            style={{ background: tint("#12B886", 18) }}
          >
            <BookOpen className="h-5 w-5 text-mint" />
          </span>
          <p className="text-[15px] font-bold text-ink">
            Checkpoint — the checkpoint questions for this section are on page{" "}
            {b.page} of the textbook.
          </p>
        </div>
      );
    case "figure":
      return <Figure kind={b.kind} caption={b.caption} accent={accent} />;
    case "wow":
      return (
        <div
          className="max-w-[72ch] rounded-[22px] p-5 sm:p-6"
          style={{ background: tint("#9775FA", 12) }}
        >
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-paper">
              <Lightbulb
                className="h-5 w-5"
                style={{ color: inkMix("#9775FA", 72) }}
              />
            </span>
            <div>
              <div
                className="font-display text-[11px] font-extrabold tracking-[0.18em] uppercase"
                style={{ color: inkMix("#9775FA", 62) }}
              >
                Key idea
              </div>
              <p className="mt-1 text-[15px] leading-[1.75] text-ink">
                <Fmt text={b.text} />
              </p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* ————— candy table ————— */

function CandyTable({
  head,
  rows,
  caption,
  accent,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
  accent: string;
}) {
  return (
    <div className="max-w-full">
      {caption && (
        <div className="mb-2 text-[12px] font-extrabold tracking-[0.08em] text-ink-faint uppercase">
          <Fmt text={caption} />
        </div>
      )}
      <div className="overflow-hidden rounded-[24px] bg-paper puff">
        <ScrollFade>
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr style={{ background: tint(accent, 15) }}>
                {head.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3.5 font-display text-[12px] font-semibold tracking-[0.06em] whitespace-nowrap text-ink uppercase sm:px-5"
                  >
                    <Fmt text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t-[2.5px] border-dashed border-ink/10"
                  style={{
                    background: i % 2 === 1 ? tint(accent, 4) : undefined,
                  }}
                >
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3.5 align-top text-[14px] leading-[1.65] sm:px-5 ${j === 0 ? "font-extrabold text-ink" : "text-ink-soft"}`}
                    >
                      <Fmt text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollFade>
      </div>
    </div>
  );
}

/* ————— worked example — a drop-down that guards its space —————
   Collapsed: just the title pill, the question and one button.
   "Show steps" unfurls the staircase and the answer; "Hide steps"
   folds it all away again. The only drop-down on the site. */

function Worked({
  title,
  question,
  steps,
  answer,
  accent,
}: {
  title: string;
  question: string;
  steps: string[];
  answer: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[28px] bg-paper p-5 puff sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="inline-flex min-w-0 max-w-full shrink-0 rotate-[-1.5deg] items-center rounded-full px-3.5 py-1.5 font-display text-[12px] leading-snug font-bold tracking-[0.1em] uppercase"
          style={{ background: accent, color: readableInk(accent) }}
        >
          <PenLine className="mr-1.5 h-3.5 w-3.5 shrink-0" /> {title}
        </span>
        <p className="min-w-[16rem] flex-1 text-[15.5px] leading-[1.7] font-bold text-ink">
          <Fmt text={question} />
        </p>
      </div>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[14px] font-semibold text-white"
        style={{ background: accent, boxShadow: `0 4px 0 ${shade(accent)}` }}
      >
        {open ? (
          <EyeOff className="h-4.5 w-4.5" />
        ) : (
          <Footprints className="h-4.5 w-4.5" />
        )}
        {open ? "Hide steps" : "Show steps"}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                    delay: 0.05 + i * 0.06,
                  }}
                  style={{ marginLeft: `min(${i * 14}px, 56px)` }}
                >
                  {i > 0 && (
                    <div className="dot-line mb-1 ml-6 h-4" aria-hidden />
                  )}
                  <div
                    className="inline-flex max-w-full items-start gap-2.5 rounded-[18px] px-4 py-2.5 text-[15px] leading-[1.7] text-ink"
                    style={{ background: tint(accent, 9) }}
                  >
                    <span
                      className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full font-display text-[11px] font-bold"
                      style={{ background: accent, color: readableInk(accent) }}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <Fmt text={s} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: 0.1 + steps.length * 0.06,
              }}
              className="mt-4 flex items-start gap-2.5 rounded-[20px] bg-paper px-4 py-3 text-[15px] font-bold text-ink shadow-[0_4px_0_color-mix(in_oklab,var(--color-ink)_7%,transparent)]"
              style={{ borderLeft: `6px solid ${accent}` }}
            >
              <Check
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: accent }}
                strokeWidth={3}
              />
              <span>
                <Fmt text={answer} />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ————— steps — the candy stage strip —————
   One tinted panel, same recipe as the equation block: the caption
   as a header beside a little icon square, and every step as a
   paper mini-card in a loose grid. The accent number chips echo
   the contents grid and the worked-example staircase, so the order
   reads at a glance — no rail, no icons, just tidy cards. */

function StepsPanel({
  caption,
  items,
  accent,
}: {
  caption?: string;
  items: { title: string; text: string; icon?: string }[];
  accent: string;
}) {
  const n = items.length;
  /* short trios sit side by side; longer tellings wrap into two
     columns, and an odd one out gets the full-width finale */
  const roomy = n >= 4 || items.some((it) => it.text.length > 170);
  const grid = [
    "grid grid-cols-1 gap-2.5 sm:gap-3",
    roomy
      ? "sm:grid-cols-2"
      : n === 3
        ? "sm:grid-cols-3"
        : n === 2
          ? "sm:grid-cols-2"
          : "",
    roomy && n % 2 === 1 ? "sm:[&>li:last-child]:col-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="rounded-[26px] p-4 sm:p-5"
      style={{ background: tint(accent, 9) }}
    >
      {caption && (
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-paper shadow-[0_2px_0_color-mix(in_oklab,var(--color-ink)_6%,transparent)]">
            <ListChecks
              className="h-4.5 w-4.5"
              style={{ color: inkMix(accent, 62) }}
              strokeWidth={2.2}
            />
          </span>
          <h4 className="font-display text-[15.5px] font-semibold tracking-tight text-ink">
            <Fmt text={caption} />
          </h4>
        </div>
      )}
      <ol className={grid}>
        {items.map((it, i) => {
          /* titles like “1 · Vapourisation” hand their number to the chip */
          const bare = it.title.replace(/^\s*\d+\s*[·•]\s*/, "");
          return (
            <li
              key={i}
              className="rounded-[18px] bg-paper px-4 py-3.5 shadow-[0_3px_0_color-mix(in_oklab,var(--color-ink)_7%,transparent)]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full font-display text-[11px] font-bold"
                  style={{ background: accent, color: readableInk(accent) }}
                >
                  {i + 1}
                </span>
                <span className="font-display text-[15px] font-semibold text-ink">
                  <Fmt text={bare} />
                </span>
              </div>
              <p className="mt-1.5 text-[14.5px] leading-[1.7] text-ink-soft">
                <Fmt text={it.text} />
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ————— figures ————— */

/* wide plots scroll sideways on phones instead of shrinking to mush */
const WIDE_FIGS = new Set([
  "mass-spec",
  "ie-graph",
  "succ-ie",
  "pt-blocks",
  "spectrum-bromine",
  "radius",
  "fill-order",
  "melting",
  "sigma-pi",
  "dotcross",
  "carbon-lattices",
  "shapes",
  "dipoles",
  "formula-types",
  "naming",
  "frac-col",
  "isomers",
  "radchain",
]);

function Figure({
  kind,
  caption,
  accent,
}: {
  kind: string;
  caption?: string;
  accent: string;
}) {
  let node: ReactNode = null;
  switch (kind) {
    case "atom":
      node = <FigAtom accent={accent} />;
      break;
    case "notation":
      node = <FigNotation accent={accent} />;
      break;
    case "mass-spec":
      node = <FigMassSpec />;
      break;
    case "shielding":
      node = <FigShielding accent={accent} />;
      break;
    case "spectrum-neon":
      node = <FigSpectrumNeon />;
      break;
    case "spectrum-boron":
      node = <FigSpectrumBoron />;
      break;
    case "spectrum-bromine":
      node = <FigSpectrumBromine />;
      break;
    case "spectrum-cl2":
      node = <FigSpectrumCl2 />;
      break;
    case "spectrum-ethanol":
      node = <FigSpectrumEthanol />;
      break;
    case "orbitals":
      node = <FigOrbitals accent={accent} />;
      break;
    case "fill-demo":
      node = <FigFillDemo accent={accent} />;
      break;
    case "fill-order":
      node = <FigFillOrder accent={accent} />;
      break;
    case "boxes-c":
      node = <FigBoxesC accent={accent} />;
      break;
    case "boxes-s":
      node = <FigBoxesS accent={accent} />;
      break;
    case "ie-graph":
      node = <FigIeGraph />;
      break;
    case "succ-ie":
      node = <FigSuccIe />;
      break;
    case "melting":
      node = <FigMelting />;
      break;
    case "pt-blocks":
      node = <FigPtBlocks />;
      break;
    case "radius":
      node = <FigRadius accent={accent} />;
      break;
    case "sigma-pi":
      node = <FigSigmaPi accent={accent} />;
      break;
    case "dotcross":
      node = <FigDotCross accent={accent} />;
      break;
    case "carbon-lattices":
      node = <FigCarbonLattices accent={accent} />;
      break;
    case "shapes":
      node = <FigShapes accent={accent} />;
      break;
    case "dipoles":
      node = <FigDipoles accent={accent} />;
      break;
    case "formula-types":
      node = <FigFormulaTypes accent={accent} />;
      break;
    case "naming":
      node = <FigNaming accent={accent} />;
      break;
    case "frac-col":
      node = <FigFracCol accent={accent} />;
      break;
    case "isomers":
      node = <FigIsomers accent={accent} />;
      break;
    case "radchain":
      node = <FigRadChain accent={accent} />;
      break;
  }
  if (!node) return null;
  const wide = WIDE_FIGS.has(kind);
  return (
    <div className="rounded-[28px] bg-paper p-4 puff sm:p-6">
      {wide ? (
        <ScrollFade>
          <div className="min-w-[620px]">{node}</div>
        </ScrollFade>
      ) : (
        <div className="flex justify-center">
          <div className="flex w-full justify-center">{node}</div>
        </div>
      )}
      {caption && (
        <p className="mx-auto mt-3 max-w-[58ch] text-center text-[12.5px] leading-[1.65] font-semibold text-ink-faint">
          <Fmt text={caption} />
        </p>
      )}
    </div>
  );
}
