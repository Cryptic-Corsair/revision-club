"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Flame,
  Gamepad2,
  Lightbulb,
  Magnet,
  PartyPopper,
  Sparkles,
  Sticker,
  StickyNote,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react";
import type { ExerciseBody, NotesBlock, NotesDoc, SpecSection } from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { Fmt } from "./format";
import { BeakerMeter, Confetti, PopIn, Reveal, SoftButton, SpeechBubble, Squiggle, Mascot, shade, tint } from "./bits";
import {
  BoxNotation,
  FigAtom,
  FigBoxesC,
  FigBoxesS,
  FigFillDemo,
  FigFillOrder,
  FigIeGraph,
  FigMelting,
  FigNotation,
  FigOrbitals,
  FigPtBlocks,
  FigRadius,
  FigSpectrumBoron,
  FigSpectrumBromine,
  FigSpectrumCl2,
  FigSpectrumEthanol,
  FigSpectrumNeon,
  FigSuccIe,
  buildConfig,
} from "./notes-figures";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · notes reader — a real revision note, spec by
   spec, rebuilt as an active-recall playground.
   ═══════════════════════════════════════════════════════════════ */

/* ————— progress (localStorage) ————— */

function useNailed(docId: string) {
  const [nailed, setNailed] = useState<string[]>([]);
  useEffect(() => {
    try {
      setNailed(JSON.parse(window.localStorage.getItem(`rc-notes-${docId}`) ?? "[]"));
    } catch {
      /* first visit */
    }
  }, [docId]);
  const toggle = (spec: string) =>
    setNailed((prev) => {
      const next = prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec];
      try {
        window.localStorage.setItem(`rc-notes-${docId}`, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  return { nailed, toggle };
}

function scrollToSpec(spec: string) {
  document.getElementById(`spec-${spec.replace(".", "-")}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ————— main reader ————— */

export function NotesReader({ doc, unit, onBack }: { doc: NotesDoc; unit: Unit; onBack: () => void }) {
  const main = unit.candy.main;
  const { nailed, toggle } = useNailed(doc.id);
  const [active, setActive] = useState<string>("2.1");
  const [fire, setFire] = useState(0);
  const revised = useRevised();
  const revKey = `${unit.code}/${doc.topicId}`;
  const isRevised = revised.includes(revKey);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  /* scroll spy */
  const spy = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    spy.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id.replace("spec-", "").replace("-", "."));
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const s of doc.sections) {
      const el = document.getElementById(`spec-${s.spec.replace(".", "-")}`);
      if (el) spy.current?.observe(el);
    }
    return () => spy.current?.disconnect();
  }, [doc]);

  const count = (k: NotesBlock["k"]) => {
    let n = 0;
    const walk = (blocks: NotesBlock[]) => blocks.forEach((b) => b.k === k && n++);
    walk(doc.intro);
    doc.sections.forEach((s) => walk(s.blocks));
    if (doc.outro) walk(doc.outro);
    return n;
  };
  const stats = [
    `${doc.sections.length} spec sections`,
    `${count("exercise")} interactive exercises`,
    `${count("worked")} stepped examples`,
    `${count("flip")} flip decks`,
    `${count("checkpoint")} textbook checkpoints`,
  ];

  const pct = nailed.length / doc.sections.length;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:px-8">
      {/* reading progress */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[70] h-[7px] w-full origin-left rounded-r-full"
        style={{ scaleX, background: `linear-gradient(90deg, ${main}, #FFD43B)` }}
      />

      <PopIn>
        <SoftButton onClick={onBack} className="min-h-[42px] px-4 py-2 text-[13.5px]" ariaLabel="Back to the topic page">
          <ArrowLeft className="h-4 w-4" /> Back to the topic page
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-7">
        <PopIn delay={0.05} className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[11.5px] font-bold tracking-[0.14em] text-white uppercase"
            style={{ background: main }}
          >
            <BookOpen className="h-3.5 w-3.5" /> Revision note
          </span>
          <span className="inline-flex items-center rounded-full bg-ink/5 px-3.5 py-1.5 text-[12.5px] font-bold text-ink-soft">
            {doc.source}
          </span>
        </PopIn>
        <PopIn delay={0.1}>
          <p className="mt-6 font-display text-[15px] font-semibold tracking-[0.06em] uppercase" style={{ color: shade(main, 62) }}>
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
            <SpeechBubble bg="#FFFDF7" tailClass="left-8 -top-[7px] rotate-[225deg]">
              <p className="text-[14px] leading-[1.7] text-ink">
                {doc.intro.map((b, i) =>
                  b.k === "p" ? (
                    <span key={i} className="block">
                      <Fmt text={b.text} />
                    </span>
                  ) : null
                )}
              </p>
            </SpeechBubble>
          </Reveal>
        </div>

        <PopIn delay={0.18} className="mt-6 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold text-ink" style={{ background: tint(main, 12) }}>
              <Sparkles className="h-3.5 w-3.5" style={{ color: main }} /> {s}
            </span>
          ))}
        </PopIn>

        <Squiggle color={main} className="mt-7 h-3.5 w-full opacity-60" />
      </header>

      {/* ————— the spec checklist ————— */}
      <Reveal className="mt-9">
        <div className="rounded-[30px] bg-paper p-5 puff sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl" style={{ background: tint(main, 16) }}>
              <Target className="h-5 w-5" style={{ color: shade(main, 62) }} />
            </span>
            <div>
              <h2 className="font-display text-[18px] font-semibold text-ink">The spec checklist</h2>
              <p className="text-[12.5px] font-bold text-ink-faint">
                {nailed.length}/{doc.sections.length} nailed · tap any card to jump
              </p>
            </div>
            <div className="ml-auto hidden shrink-0 sm:block">
              <BeakerMeter pct={pct} main={main} size={44} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {doc.sections.map((s) => {
              const done = nailed.includes(s.spec);
              return (
                <button
                  key={s.spec}
                  type="button"
                  onClick={() => scrollToSpec(s.spec)}
                  className="group flex cursor-pointer items-center gap-2 rounded-[18px] px-3 py-2.5 text-left transition-transform hover:-translate-y-0.5"
                  style={{ background: done ? tint("#12B886", 14) : tint(main, 8) }}
                >
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full font-display text-[10.5px] font-bold"
                    style={done ? { background: "#12B886", color: "#fff" } : { background: "#fff", color: shade(main, 62) }}
                  >
                    {done ? <Check className="h-3.5 w-3.5" strokeWidth={3.5} /> : s.spec}
                  </span>
                  <span className="truncate text-[12px] font-bold text-ink">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ————— sticky spec rail ————— */}
      <div className="sticky top-[76px] z-40 mt-8">
        <div
          className="no-scrollbar flex items-center gap-1.5 overflow-x-auto rounded-full bg-paper/95 px-3 py-2 backdrop-blur-md"
          style={{ boxShadow: "0 3px 0 rgba(61,43,31,0.05), 0 16px 34px -20px rgba(61,43,31,0.4)" }}
        >
          {doc.sections.map((s) => {
            const done = nailed.includes(s.spec);
            const isActive = active === s.spec;
            return (
              <motion.button
                key={s.spec}
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={() => scrollToSpec(s.spec)}
                className="grid h-8 min-w-8 shrink-0 cursor-pointer place-items-center rounded-full px-2 font-display text-[11px] font-bold"
                style={
                  done
                    ? { background: "#12B886", color: "#fff" }
                    : isActive
                      ? { background: main, color: "#fff", boxShadow: `0 3px 0 ${shade(main)}` }
                      : { background: "rgba(61,43,31,0.06)", color: "#8A7261" }
                }
                title={`${s.spec} — ${s.title}`}
                aria-label={`Jump to spec ${s.spec}`}
                aria-current={isActive ? "true" : undefined}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3.5} /> : s.spec}
              </motion.button>
            );
          })}
          <span aria-hidden className="mx-1 h-5 w-[3px] shrink-0 rounded-full bg-ink/10" />
          <span className="shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-extrabold text-ink-soft">
            {nailed.length}/{doc.sections.length}
          </span>
        </div>
      </div>

      {/* ————— sections ————— */}
      <div className="mt-4 flex flex-col gap-6">
        {doc.sections.map((s, idx) => (
          <SpecSectionView
            key={s.spec}
            section={s}
            main={main}
            done={nailed.includes(s.spec)}
            onToggle={() => toggle(s.spec)}
            delay={Math.min(idx * 0.02, 0.1)}
          />
        ))}
      </div>

      {/* ————— outro ————— */}
      {doc.outro && (
        <div className="mt-14 flex flex-col gap-8">
          <Squiggle color={main} className="h-3.5 w-full opacity-40" />
          {doc.outro.map((b, i) => (
            <Reveal key={i}>
              <BlockView block={b} main={main} />
            </Reveal>
          ))}
        </div>
      )}

      {/* ————— collect the sticker ————— */}
      <Reveal className="relative mt-14 flex justify-center">
        <div className="relative">
          <Confetti fire={fire} />
          <motion.button
            type="button"
            onClick={() => {
              if (!isRevised) setFire((f) => f + 1);
              toggleRevised(revKey);
            }}
            aria-pressed={isRevised}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 15 }}
            className="inline-flex min-h-[56px] cursor-pointer items-center gap-3 rounded-full px-7 py-4 font-display text-[16px] font-semibold"
            style={
              isRevised
                ? { background: main, color: "#fff", boxShadow: `0 5px 0 ${shade(main)}`, transform: "rotate(-1.5deg)" }
                : { background: "#FFFDF7", color: "#3D2B1F", boxShadow: "0 5px 0 rgba(61,43,31,0.10)" }
            }
          >
            {isRevised ? (
              <>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25">
                  <Check className="h-4.5 w-4.5" strokeWidth={3} />
                </span>
                In your sticker book!
              </>
            ) : (
              <>
                <Sticker className="h-5.5 w-5.5" style={{ color: main }} />
                Collected the whole note — stamp it
              </>
            )}
          </motion.button>
        </div>
      </Reveal>
      <p className="mt-3 text-center text-[12.5px] font-bold text-ink-faint">
        {isRevised ? "Bubbles saw every section you nailed. Show-off." : "Nail the 18 sections, then stamp the note."}
      </p>

      <p className="mt-10 text-center text-[12px] leading-relaxed font-bold text-ink-faint">
        <Fmt text={`==${unit.code}== · ${unit.title} · text kept verbatim from the ${doc.source}`} />
      </p>
    </div>
  );
}

/* ————— one specification section ————— */

function SpecSectionView({
  section,
  main,
  done,
  onToggle,
  delay,
}: {
  section: SpecSection;
  main: string;
  done: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const [fire, setFire] = useState(0);
  return (
    <section id={`spec-${section.spec.replace(".", "-")}`} className="scroll-mt-[150px]">
      <Reveal delay={delay}>
        {/* spec banner — the official wording, stated above the section */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex rotate-[-2deg] items-center gap-2 rounded-full px-4 py-2 font-display text-[14px] font-bold tracking-wide text-white"
            style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
          >
            <Target className="h-4 w-4" /> Spec {section.spec}
          </span>
          <h2 className="font-display text-[clamp(1.45rem,3.4vw,1.9rem)] font-semibold tracking-tight text-ink">
            {section.title}
          </h2>
        </div>
        <SpeechBubble bg={tint(main, 7)} className="mt-4" tailClass="left-10 -top-[7px] rotate-[225deg]">
          <div className="mb-1 font-display text-[10.5px] font-extrabold tracking-[0.2em] uppercase" style={{ color: shade(main, 62) }}>
            The official wording — what the exam asks
          </div>
          <p className="text-[14.5px] leading-[1.75] text-ink italic">
            <Fmt text={section.statement} />
          </p>
        </SpeechBubble>
      </Reveal>

      <div className="mt-7 flex flex-col gap-7">
        {section.blocks.map((b, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.15)} y={18}>
            <BlockView block={b} main={main} />
          </Reveal>
        ))}
      </div>

      {/* nailed-it stamp */}
      <div className="relative mt-6 flex justify-end">
        <Confetti fire={fire} />
        <motion.button
          type="button"
          onClick={() => {
            if (!done) setFire((f) => f + 1);
            onToggle();
          }}
          aria-pressed={done}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[13.5px] font-semibold"
          style={
            done
              ? { background: "#12B886", color: "#fff", boxShadow: "0 4px 0 #0B7A57" }
              : { background: "#FFFDF7", color: "#3D2B1F", boxShadow: "0 4px 0 rgba(61,43,31,0.10)" }
          }
        >
          {done ? <Check className="h-4.5 w-4.5" strokeWidth={3} /> : <PartyPopper className="h-4.5 w-4.5" style={{ color: main }} />}
          {done ? "Nailed it" : "Nail this spec"}
        </motion.button>
      </div>
    </section>
  );
}

/* ————— block dispatcher ————— */

function BlockView({ block: b, main }: { block: NotesBlock; main: string }) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[16px] leading-[1.85] text-ink/90">
          <Fmt text={b.text} />
        </p>
      );
    case "h":
      return (
        <div className="flex items-center gap-2.5 pt-2">
          <span className="h-3.5 w-3.5 rounded-full" style={{ background: main }} />
          <h3 className="font-display text-[20px] font-semibold tracking-tight text-ink">
            <Fmt text={b.text} />
          </h3>
        </div>
      );
    case "bullets":
      return (
        <ul className="flex max-w-[70ch] flex-col gap-2.5">
          {b.items.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-[15.5px] leading-[1.75] text-ink/90">
              <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: tint(main, 55) }} />
              <span>
                <Fmt text={t} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div className="flex max-w-[72ch] items-start gap-3 rounded-[22px] px-4 py-3.5" style={{ background: tint("#FFD43B", 18) }}>
          <StickyNote className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#B08D00]" />
          <p className="text-[14px] leading-[1.7] text-ink">
            <span className="mr-1.5 font-display text-[12px] font-extrabold tracking-[0.12em] text-[#B08D00] uppercase">{b.label}:</span>
            <Fmt text={b.text} />
          </p>
        </div>
      );
    case "def":
      return (
        <div className="puff-lift max-w-[72ch] rounded-[26px] bg-paper p-5 puff sm:p-6">
          <h4 className="font-display text-[18px] font-semibold text-ink">
            <Fmt text={b.term} />
          </h4>
          <p className="mt-2 text-[15px] leading-[1.75] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </div>
      );
    case "eq":
      return (
        <div className="rounded-[26px] p-5 sm:p-6" style={{ background: tint(main, 9) }}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
            {b.eq.split(/\s{2,}/).map((part, i) => (
              <span key={i} className="rounded-2xl bg-white px-4 py-2.5 font-mono text-[14.5px] font-semibold text-ink shadow-[0_3px_0_rgb(61_43_31/0.06)]">
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
      return <CandyTable head={b.head} rows={b.rows} caption={b.caption} main={main} />;
    case "worked":
      return <Worked title={b.title} question={b.question} steps={b.steps} answer={b.answer} main={main} />;
    case "steps":
      return <Journey caption={b.caption} items={b.items} main={main} />;
    case "flip":
      return <FlipDeck title={b.title} hint={b.hint} cards={b.cards} main={main} />;
    case "cloze":
      return <Cloze title={b.title} hint={b.hint} items={b.items} main={main} />;
    case "quiz":
      return <Quiz title={b.title} qs={b.qs} main={main} />;
    case "exercise":
      return <Exercise label={b.label} title={b.title} note={b.note} body={b.body} main={main} />;
    case "checkpoint":
      return (
        <div className="flex items-center gap-3 rounded-full bg-paper px-5 py-4 puff">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: tint("#12B886", 18) }}>
            <BookOpen className="h-5 w-5 text-mint" />
          </span>
          <p className="text-[15px] font-bold text-ink">
            Checkpoint — do the check point questions on page {b.page} from text book.
          </p>
        </div>
      );
    case "figure":
      return <Figure kind={b.kind} caption={b.caption} main={main} />;
    case "wow":
      return (
        <div className="max-w-[72ch] rotate-[-0.6deg] rounded-[26px] p-5 sm:p-6" style={{ background: tint("#9775FA", 12) }}>
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-white">
              <Lightbulb className="h-5 w-5 text-grape" />
            </span>
            <p className="text-[15px] leading-[1.75] text-ink">
              <Fmt text={b.text} />
            </p>
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
  main,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
  main: string;
}) {
  return (
    <div className="max-w-full">
      {caption && (
        <div
          className="mb-3 inline-flex rotate-[-1.2deg] items-center gap-2 rounded-full px-4 py-1.5 font-display text-[12.5px] font-semibold text-white"
          style={{ background: main }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <Fmt text={caption} />
        </div>
      )}
      <div className="overflow-hidden rounded-[26px] bg-paper puff">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr style={{ background: tint(main, 15) }}>
                {head.map((h, i) => (
                  <th key={i} className="px-4 py-3.5 font-display text-[12.5px] font-semibold tracking-[0.06em] whitespace-nowrap text-ink uppercase sm:px-5">
                    <Fmt text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t-[2.5px] border-dashed border-ink/10" style={{ background: i % 2 === 1 ? tint(main, 4) : undefined }}>
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3.5 align-top text-[14px] leading-[1.6] sm:px-5 ${j === 0 ? "font-extrabold text-ink" : "text-ink-soft"}`}>
                      <Fmt text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ————— worked example staircase ————— */

function Worked({
  title,
  question,
  steps,
  answer,
  main,
}: {
  title: string;
  question: string;
  steps: string[];
  answer: string;
  main: string;
}) {
  const [shown, setShown] = useState(0);
  const done = shown >= steps.length;
  return (
    <div className="rounded-[28px] bg-paper p-5 puff sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rotate-[-1.5deg] items-center rounded-full px-3.5 py-1.5 font-display text-[12px] font-bold tracking-[0.12em] text-white uppercase" style={{ background: main }}>
          <Gamepad2 className="mr-1.5 h-3.5 w-3.5" /> {title}
        </span>
        <p className="min-w-[16rem] flex-1 text-[15px] leading-[1.7] font-bold text-ink">
          <Fmt text={question} />
        </p>
      </div>
      <div className="mt-4 flex flex-col">
        {steps.slice(0, shown).map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ marginLeft: `min(${i * 14}px, 56px)` }}
          >
            {i > 0 && <div className="dot-line mb-1 ml-6 h-4" aria-hidden />}
            <div className="inline-flex max-w-full items-start gap-2.5 rounded-[18px] px-4 py-2.5 text-[14.5px] leading-[1.65] text-ink" style={{ background: tint(main, 9) }}>
              <span className="mt-0.5 grid shrink-0 place-items-center rounded-full font-display text-[11px] font-bold text-white" style={{ background: main, width: 22, height: 22 }}>
                {i + 1}
              </span>
              <span>
                <Fmt text={s} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 15 }}
            className="mt-4 flex items-start gap-2.5 rounded-full bg-white px-4 py-3 text-[15px] font-bold text-ink shadow-[0_4px_0_rgb(61_43_31/0.07)] sm:items-center"
            style={{ borderLeft: `6px solid ${main}` }}
          >
            <PartyPopper className="h-5 w-5 shrink-0" style={{ color: main }} />
            <span>
              <Fmt text={answer} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-4">
        {!done ? (
          <motion.button
            type="button"
            onClick={() => setShown((n) => n + 1)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[14px] font-semibold text-white"
            style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
          >
            {shown === 0 ? "Show me how" : `Next step (${shown}/${steps.length})`}
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={() => setShown(0)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-ink/5 px-4 py-2 text-[13px] font-bold text-ink-soft"
          >
            <EyeOff className="h-4 w-4" /> Climb again
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ————— journey (the 5 stages etc.) ————— */

const STEP_ICONS: Record<string, typeof Flame> = {
  flame: Flame,
  zap: Zap,
  arrow: ArrowRight,
  magnet: Magnet,
  target: Target,
  spark: Sparkles,
};

function Journey({
  caption,
  items,
  main,
}: {
  caption?: string;
  items: { title: string; text: string; icon?: string }[];
  main: string;
}) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {caption && <p className="mb-3 text-[13px] font-bold text-ink-faint">{caption}</p>}
      <div className="flex flex-col gap-2.5">
        {items.map((it, i) => {
          const Icon = STEP_ICONS[it.icon ?? "spark"] ?? Sparkles;
          const isOpen = open === i;
          return (
            <motion.div key={i} layout className="rounded-[22px] bg-paper puff" animate={isOpen ? { rotate: 0 } : {}}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left sm:px-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: isOpen ? main : tint(main, 14) }}>
                  <Icon className="h-4.5 w-4.5" style={{ color: isOpen ? "#fff" : shade(main, 62) }} strokeWidth={2.5} />
                </span>
                <span className="min-w-0 flex-1 font-display text-[15.5px] font-semibold text-ink">{it.title}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <ChevronDown className="h-4.5 w-4.5 text-ink-faint" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 pl-[68px] text-[14.5px] leading-[1.75] text-ink/90">
                      <Fmt text={it.text} />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ————— flip deck ————— */

function FlipDeck({
  title,
  hint,
  cards,
  main,
}: {
  title?: string;
  hint?: string;
  cards: { front: string; back: string }[];
  main: string;
}) {
  const [flipped, setFlipped] = useState<boolean[]>(() => cards.map(() => false));
  return (
    <div>
      {title && (
        <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
          <h4 className="font-display text-[18px] font-semibold text-ink">{title}</h4>
          {hint && <p className="text-[12.5px] font-bold text-ink-faint">{hint}</p>}
        </div>
      )}
      <div className="mt-3 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c, i) => {
          const isFlipped = flipped[i];
          return (
            <div key={i} className="grid [perspective:1400px]">
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => setFlipped((arr) => arr.map((v, j) => (j === i ? !v : v)))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlipped((arr) => arr.map((v, j) => (j === i ? !v : v)));
                  }
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="grid min-h-[190px] cursor-pointer rounded-[24px] text-left [transform-style:preserve-3d]"
                aria-pressed={isFlipped}
              >
                {/* front */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-between rounded-[24px] p-5 [backface-visibility:hidden]"
                  style={{ background: tint(main, 12), boxShadow: "0 4px 0 rgba(61,43,31,0.07)" }}
                >
                  <p className="text-[15.5px] leading-[1.65] font-bold text-ink">
                    <Fmt text={c.front} />
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-white/80 px-3 py-1 text-[11px] font-extrabold tracking-wide text-ink-soft uppercase">
                    <Eye className="h-3.5 w-3.5" /> flip
                  </span>
                </div>
                {/* back */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-between rounded-[24px] bg-cocoa p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{ boxShadow: "0 4px 0 rgba(0,0,0,0.18)" }}
                >
                  <p className="text-[14.5px] leading-[1.7] text-cream">
                    <Fmt text={c.back} />
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold tracking-wide text-cream/80 uppercase">
                    got it — flip back
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ————— cloze recall (==masked== chips) ————— */

function Cloze({
  title,
  hint,
  items,
  main,
}: {
  title?: string;
  hint?: string;
  items: string[];
  main: string;
}) {
  const parsed = useMemo(
    () =>
      items.map((text) => {
        const parts: { t: string; hidden: boolean }[] = [];
        const re = /==(.+?)==/g;
        let last = 0;
        let m: RegExpExecArray | null;
        while ((m = re.exec(text))) {
          if (m.index > last) parts.push({ t: text.slice(last, m.index), hidden: false });
          parts.push({ t: m[1], hidden: true });
          last = m.index + m[0].length;
        }
        if (last < text.length) parts.push({ t: text.slice(last), hidden: false });
        return parts;
      }),
    [items]
  );
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const key = (item: number, part: number) => `${item}-${part}`;
  const total = parsed.reduce((n, parts) => n + parts.filter((p) => p.hidden).length, 0);
  const shown = revealed.size;

  return (
    <div className="rounded-[28px] p-5 sm:p-6" style={{ background: tint(main, 8) }}>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
        <h4 className="font-display text-[18px] font-semibold text-ink">{title ?? "Recall jolt"}</h4>
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-extrabold text-ink-soft">
          {shown}/{total} revealed
        </span>
      </div>
      {hint && <p className="mb-3 text-[12.5px] font-bold text-ink-faint">{hint ?? "Say the missing words out loud — then tap to check."}</p>}
      <div className="flex flex-col gap-3.5">
        {parsed.map((parts, item) => (
          <p key={item} className="text-[15.5px] leading-[2.1] text-ink/90">
            {parts.map((p, pi) =>
              p.hidden ? (
                revealed.has(key(item, pi)) ? (
                  <motion.span
                    key={pi}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 16 }}
                    className="mx-0.5 inline-block rounded-full px-2.5 py-0.5 font-bold text-ink"
                    style={{ background: "#FFFDF7", boxShadow: `inset 0 0 0 2px ${tint(main, 55)}` }}
                  >
                    <Fmt text={p.t} />
                  </motion.span>
                ) : (
                  <motion.button
                    key={pi}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRevealed((s) => new Set(s).add(key(item, pi)))}
                    className="mx-1 inline-block cursor-pointer rounded-full border-[2.5px] border-dashed px-3 py-0.5 align-middle font-display text-[11.5px] font-bold tracking-wide uppercase"
                    style={{ borderColor: tint(main, 55), color: shade(main, 62) }}
                    aria-label="Reveal the missing words"
                  >
                    tap to recall
                  </motion.button>
                )
              ) : (
                <span key={pi}>{p.t}</span>
              )
            )}
          </p>
        ))}
      </div>
      {shown > 0 && shown < total && (
        <button
          type="button"
          onClick={() => {
            const all: string[] = [];
            parsed.forEach((parts, item) => parts.forEach((p, pi) => p.hidden && all.push(key(item, pi))));
            setRevealed(new Set(all));
          }}
          className="mt-4 cursor-pointer text-[12.5px] font-extrabold text-ink-soft underline decoration-dotted underline-offset-4"
        >
          Reveal all
        </button>
      )}
    </div>
  );
}

/* ————— quick-fire quiz ————— */

function Quiz({ title, qs, main }: { title?: string; qs: { q: string; a: string }[]; main: string }) {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen((arr) => (arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i]));
  return (
    <div className="rounded-[30px] p-5 sm:p-6" style={{ background: tint(main, 9) }}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white">
          <Gamepad2 className="h-5 w-5" style={{ color: main }} />
        </span>
        <h4 className="font-display text-[18px] font-semibold text-ink">{title ?? "Quick-fire"}</h4>
        <span className="ml-auto hidden rounded-full bg-white/70 px-3 py-1 text-[12px] font-bold text-ink-soft sm:block">
          {open.length}/{qs.length} revealed
        </span>
      </div>
      <div className="flex flex-col gap-3.5">
        {qs.map((qa, i) => {
          const isOpen = open.includes(i);
          return (
            <motion.div
              key={i}
              className="rounded-[22px] bg-paper p-4 puff sm:p-5"
              animate={isOpen ? { rotate: [0, -1, 1, 0] } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="min-w-[16rem] flex-1 text-[15px] leading-[1.65] font-bold text-ink">
                  <Fmt text={qa.q} />
                </p>
                <motion.button
                  type="button"
                  onClick={() => toggle(i)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="inline-flex min-h-[40px] shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-display text-[13px] font-semibold text-white"
                  style={{ background: isOpen ? "#8A7261" : main, boxShadow: `0 3px 0 ${isOpen ? "#6d5a4c" : shade(main)}` }}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {isOpen ? "Hide" : "Answer"}
                </motion.button>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-[18px] px-4 py-3 text-[14.5px] leading-[1.7] text-ink" style={{ background: tint("#12B886", 10) }}>
                      <span className="mr-1.5 inline-flex items-center gap-1 font-display text-[12px] font-bold tracking-[0.14em] text-mint uppercase">
                        <Check className="h-3.5 w-3.5" /> answer
                      </span>
                      <br />
                      <Fmt text={qa.a} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ————— exercises ————— */

function RevealChip({ answer, main, big, onReveal }: { answer: string; main: string; big?: boolean; onReveal?: () => void }) {
  const [on, setOn] = useState(false);
  return on ? (
    <motion.span
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 16 }}
      className={`inline-block rounded-full font-bold text-ink ${big ? "px-3.5 py-1.5 text-[14px]" : "px-3 py-1 text-[13.5px]"}`}
      style={{ background: "#FFFDF7", boxShadow: `inset 0 0 0 2.5px ${tint(main, 55)}` }}
    >
      <Fmt text={answer} />
    </motion.span>
  ) : (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setOn(true);
        onReveal?.();
      }}
      className={`inline-block cursor-pointer rounded-full border-[2.5px] border-dashed px-3 py-1 font-display text-[11px] font-bold tracking-wide uppercase ${big ? "px-3.5 py-1.5" : ""}`}
      style={{ borderColor: tint(main, 55), color: shade(main, 62) }}
      aria-label="Reveal answer"
    >
      ?
    </motion.button>
  );
}

function Exercise({
  label,
  title,
  note,
  body,
  main,
}: {
  label: string;
  title: string;
  note?: string;
  body: ExerciseBody;
  main: string;
}) {
  return (
    <div className="rounded-[30px] p-5 sm:p-6" style={{ background: tint("#12B886", 7) }}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rotate-[-1.5deg] items-center rounded-full px-4 py-1.5 font-display text-[12px] font-bold tracking-[0.14em] text-white uppercase" style={{ background: "#12B886" }}>
          {label}
        </span>
        <p className="min-w-[14rem] flex-1 text-[15.5px] leading-[1.6] font-bold text-ink">
          <Fmt text={title} />
        </p>
      </div>
      {note && <p className="mt-2.5 text-[13px] leading-relaxed font-semibold text-ink-soft">{note}</p>}
      <div className="mt-4">
        {body.kind === "particles" && <ParticlesExercise body={body} main={main} />}
        {body.kind === "questions" && <QuestionsExercise body={body} main={main} />}
        {body.kind === "ions" && <IonsExercise body={body} main={main} />}
        {body.kind === "configs" && <ConfigsExercise main={main} />}
      </div>
    </div>
  );
}

function ParticlesExercise({
  body,
  main,
}: {
  body: { head: string[]; rows: { row: string; given: (string | null)[]; answers: string[] }[] };
  main: string;
}) {
  const total = body.rows.reduce((n, r) => n + r.answers.length, 0);
  const [count, setCount] = useState(0);
  return (
    <div className="overflow-hidden rounded-[24px] bg-paper puff">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr style={{ background: tint("#12B886", 16) }}>
              {body.head.map((h, i) => (
                <th key={i} className="px-3.5 py-3 font-display text-[12px] font-semibold tracking-wide whitespace-nowrap text-ink uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.rows.map((r, ri) => (
              <tr key={r.row} className="border-t-[2.5px] border-dashed border-ink/10" style={{ background: ri % 2 === 1 ? tint("#12B886", 5) : undefined }}>
                <td className="px-3.5 py-3 font-display text-[15px] font-extrabold" style={{ color: shade("#12B886", 60) }}>
                  {r.row}
                </td>
                {r.given.map((g, ci) => (
                  <td key={ci} className="px-3.5 py-3 text-[14px] whitespace-nowrap">
                    {g !== null ? (
                      <span className="font-extrabold text-ink">
                        <Fmt text={g} />
                      </span>
                    ) : (
                      <RevealChip
                        answer={r.answers[ci]}
                        main={main}
                        onReveal={() => setCount((c) => c + 1)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-[2.5px] border-dashed border-ink/10 px-4 py-3">
        <span className="text-[12.5px] font-bold text-ink-faint">{count}/{total} cells revealed — no peeking in rows you haven't tried.</span>
        <span className="text-[12.5px] font-bold text-ink-soft">n = A − Z · e = protons − charge</span>
      </div>
    </div>
  );
}

function QuestionsExercise({
  body,
  main,
}: {
  body: { qs: { q: string; data?: string[]; answer: string }[] };
  main: string;
}) {
  const [open, setOpen] = useState<number[]>([]);
  return (
    <div className="flex flex-col gap-3.5">
      {body.qs.map((qa, i) => {
        const isOpen = open.includes(i);
        return (
          <motion.div key={i} className="rounded-[22px] bg-paper p-4 puff sm:p-5" animate={isOpen ? { rotate: [0, -0.8, 0.8, 0] } : {}}>
            <p className="text-[15px] leading-[1.65] font-bold text-ink">
              <Fmt text={qa.q} />
            </p>
            {qa.data && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {qa.data.map((d, j) => (
                  <span key={j} className="rounded-full bg-white px-3 py-1 font-mono text-[12.5px] font-semibold text-ink-soft shadow-[0_2px_0_rgb(61_43_31/0.05)]">
                    {d}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3">
              {!isOpen ? (
                <motion.button
                  type="button"
                  onClick={() => setOpen((arr) => [...arr, i])}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-display text-[13px] font-semibold text-white"
                  style={{ background: main, boxShadow: `0 3px 0 ${shade(main)}` }}
                >
                  <Eye className="h-4 w-4" /> Reveal worked answer
                </motion.button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] px-4 py-3 text-[14.5px] leading-[1.75] text-ink" style={{ background: tint("#12B886", 10) }}>
                  <span className="mr-1.5 inline-flex items-center gap-1 font-display text-[12px] font-bold tracking-[0.14em] text-mint uppercase">
                    <Check className="h-3.5 w-3.5" /> worked answer
                  </span>
                  <br />
                  <Fmt text={qa.answer} />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function IonsExercise({
  body,
  main,
}: {
  body: { items: { ion: string; answer: string }[] };
  main: string;
}) {
  const [open, setOpen] = useState<number[]>([]);
  return (
    <div className="flex flex-col gap-2.5">
      {body.items.map((it, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-[20px] bg-paper px-4 py-3 puff">
            <span className="rounded-full px-3.5 py-1.5 font-mono text-[14.5px] font-bold text-white" style={{ background: main }}>
              {it.ion}
            </span>
            {isOpen ? (
              <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-[14px] font-bold text-ink">
                {it.answer}
              </motion.span>
            ) : (
              <motion.button
                type="button"
                onClick={() => setOpen((arr) => [...arr, i])}
                whileTap={{ scale: 0.92 }}
                className="cursor-pointer rounded-full border-[2.5px] border-dashed px-3.5 py-1.5 font-display text-[11px] font-bold tracking-wide uppercase"
                style={{ borderColor: tint(main, 55), color: shade(main, 62) }}
              >
                show
              </motion.button>
            )}
          </div>
        );
      })}
    </div>
  );
}

const ELEMENTS_36: [string, string][] = [
  ["H", "hydrogen"], ["He", "helium"], ["Li", "lithium"], ["Be", "beryllium"], ["B", "boron"], ["C", "carbon"],
  ["N", "nitrogen"], ["O", "oxygen"], ["F", "fluorine"], ["Ne", "neon"], ["Na", "sodium"], ["Mg", "magnesium"],
  ["Al", "aluminium"], ["Si", "silicon"], ["P", "phosphorus"], ["S", "sulfur"], ["Cl", "chlorine"], ["Ar", "argon"],
  ["K", "potassium"], ["Ca", "calcium"], ["Sc", "scandium"], ["Ti", "titanium"], ["V", "vanadium"], ["Cr", "chromium"],
  ["Mn", "manganese"], ["Fe", "iron"], ["Co", "cobalt"], ["Ni", "nickel"], ["Cu", "copper"], ["Zn", "zinc"],
  ["Ga", "gallium"], ["Ge", "germanium"], ["As", "arsenic"], ["Se", "selenium"], ["Br", "bromine"], ["Kr", "krypton"],
];

const EXCEPTIONS: Record<number, string> = {
  24: "Chromium donates one of its 4s electrons to the 3d sub shell — half-filled d is more stable.",
  29: "Copper donates one of its 4s electrons to the 3d sub shell — completely filled d is more stable.",
};

function ConfigsExercise({ main }: { main: string }) {
  const [sel, setSel] = useState(6);
  const parts = useMemo(() => buildConfig(sel), [sel]);
  const [symbol, name] = ELEMENTS_36[sel - 1];
  const spdf = parts.map((p) => `${p.sub}${p.e}`).join(" ");
  return (
    <div>
      <div className="no-scrollbar flex flex-wrap gap-1.5">
        {ELEMENTS_36.map(([sym], i) => {
          const z = i + 1;
          const isSel = z === sel;
          const isEx = z === 24 || z === 29;
          return (
            <motion.button
              key={sym}
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => setSel(z)}
              className="relative grid h-10 w-11 cursor-pointer place-items-center rounded-[14px] font-display text-[14px] font-bold"
              style={
                isSel
                  ? { background: main, color: "#fff", boxShadow: `0 3px 0 ${shade(main)}` }
                  : { background: "#fff", color: "#3D2B1F", boxShadow: "0 2.5px 0 rgba(61,43,31,0.08)" }
              }
              title={`${sym} — Z = ${z}`}
              aria-pressed={isSel}
            >
              {sym}
              {isEx && <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[#FFD43B] text-[8px] font-extrabold text-ink">!</span>}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={sel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="mt-4 rounded-[24px] bg-paper p-5 puff"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-[16px] font-display text-[20px] font-bold text-white" style={{ background: main }}>
            {symbol}
          </span>
          <div>
            <div className="font-display text-[16px] font-semibold text-ink">
              {name} <span className="ml-1 text-[12px] font-bold text-ink-faint">Z = {sel}</span>
            </div>
            {(sel === 24 || sel === 29) && (
              <span className="mt-0.5 inline-block rounded-full bg-[#FFF3BF] px-2.5 py-0.5 text-[11px] font-extrabold text-[#B08D00]">exception!</span>
            )}
          </div>
        </div>

        <p className="mt-4 font-mono text-[16px] font-bold text-ink">{spdf}</p>

        <div className="mt-4 overflow-x-auto pb-1">
          <BoxNotation parts={parts} main={main} />
        </div>

        <AnimatePresence>
          {EXCEPTIONS[sel] && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-start gap-2 rounded-[18px] px-4 py-3 text-[13.5px] leading-[1.65] font-semibold text-ink"
              style={{ background: tint("#FFD43B", 20) }}
            >
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#B08D00]" />
              {EXCEPTIONS[sel]}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ————— figures ————— */

function Figure({ kind, caption, main }: { kind: string; caption?: string; main: string }) {
  let node: ReactNode = null;
  switch (kind) {
    case "atom": node = <FigAtom main={main} />; break;
    case "notation": node = <FigNotation main={main} />; break;
    case "spectrum-neon": node = <FigSpectrumNeon />; break;
    case "spectrum-boron": node = <FigSpectrumBoron />; break;
    case "spectrum-bromine": node = <FigSpectrumBromine />; break;
    case "spectrum-cl2": node = <FigSpectrumCl2 />; break;
    case "spectrum-ethanol": node = <FigSpectrumEthanol />; break;
    case "orbitals": node = <FigOrbitals main={main} />; break;
    case "fill-demo": node = <FigFillDemo main={main} />; break;
    case "fill-order": node = <FigFillOrder main={main} />; break;
    case "boxes-c": node = <FigBoxesC main={main} />; break;
    case "boxes-s": node = <FigBoxesS main={main} />; break;
    case "ie-graph": node = <FigIeGraph />; break;
    case "succ-ie": node = <FigSuccIe />; break;
    case "melting": node = <FigMelting />; break;
    case "pt-blocks": node = <FigPtBlocks />; break;
    case "radius": node = <FigRadius main={main} />; break;
  }
  if (!node) return null;
  return (
    <div className="rounded-[28px] bg-paper p-4 puff sm:p-6">
      <div className="flex justify-center">{node}</div>
      {caption && (
        <p className="mx-auto mt-3 max-w-[58ch] text-center text-[12.5px] leading-[1.65] font-semibold text-ink-faint">
          <Fmt text={caption} />
        </p>
      )}
    </div>
  );
}
