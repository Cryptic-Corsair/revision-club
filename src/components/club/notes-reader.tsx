"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Flame,
  Lightbulb,
  Magnet,
  PartyPopper,
  PenLine,
  Sparkles,
  Sticker,
  StickyNote,
  Target,
  Zap,
} from "lucide-react";
import type { NotesBlock, NotesDoc, SpecSection } from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { Fmt } from "./format";
import { BeakerMeter, Confetti, PopIn, Reveal, SoftButton, SpeechBubble, Squiggle, Mascot, shade, tint } from "./bits";
import {
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
} from "./notes-figures";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · notes reader — a real revision note, one section
   per specification point, spec wording stated above each section.
   ═══════════════════════════════════════════════════════════════ */

/* ————— progress (localStorage) ————— */

function useRevisedSpecs(docId: string) {
  const [specs, setSpecs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem(`rc-notes-${docId}`) ?? "[]");
    } catch {
      /* first visit */
      return [];
    }
  });
  const toggle = (spec: string) =>
    setSpecs((prev) => {
      const next = prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec];
      try {
        window.localStorage.setItem(`rc-notes-${docId}`, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  return { specs, toggle };
}

function scrollToSpec(spec: string) {
  document.getElementById(`spec-${spec.replace(".", "-")}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ————— main reader ————— */

export function NotesReader({ doc, unit, onBack }: { doc: NotesDoc; unit: Unit; onBack: () => void }) {
  const main = unit.candy.main;
  const { specs: revisedSpecs, toggle } = useRevisedSpecs(doc.id);
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
    `${count("worked")} worked examples`,
    `${count("figure")} diagrams`,
    `${count("checkpoint")} textbook checkpoints`,
  ];

  const activeSection = doc.sections.find((s) => s.spec === active);
  const pct = revisedSpecs.length / doc.sections.length;

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
              <p className="text-[14.5px] leading-[1.75] text-ink">
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

      {/* ————— contents ————— */}
      <Reveal className="mt-9">
        <div className="rounded-[30px] bg-paper p-5 puff sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl" style={{ background: tint(main, 16) }}>
              <Target className="h-5 w-5" style={{ color: shade(main, 62) }} />
            </span>
            <div>
              <h2 className="font-display text-[18px] font-semibold text-ink">Contents</h2>
              <p className="text-[12.5px] font-bold text-ink-faint">
                {revisedSpecs.length}/{doc.sections.length} revised · tap to jump
              </p>
            </div>
            <div className="ml-auto hidden shrink-0 sm:block">
              <BeakerMeter pct={pct} main={main} size={44} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {doc.sections.map((s) => {
              const done = revisedSpecs.includes(s.spec);
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
          className="rounded-[24px] bg-paper/95 px-3.5 py-2.5 backdrop-blur-md"
          style={{ boxShadow: "0 3px 0 rgba(61,43,31,0.05), 0 16px 34px -20px rgba(61,43,31,0.4)" }}
        >
          <div className="flex items-center gap-3">
            {activeSection ? (
              <span className="min-w-0 flex-1 truncate font-display text-[13.5px] font-semibold text-ink">
                <span style={{ color: shade(main, 45) }}>{activeSection.spec}</span> · {activeSection.title}
              </span>
            ) : (
              <span className="min-w-0 flex-1 truncate font-display text-[13.5px] font-semibold text-ink">{doc.title}</span>
            )}
            <span className="shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-extrabold text-ink-soft">
              {revisedSpecs.length}/{doc.sections.length}
            </span>
          </div>
          <div className="no-scrollbar mt-2 flex items-center gap-1.5 overflow-x-auto">
            {doc.sections.map((s) => {
              const done = revisedSpecs.includes(s.spec);
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
          </div>
        </div>
      </div>

      {/* ————— sections ————— */}
      <div className="mt-6 flex flex-col gap-14">
        {doc.sections.map((s, idx) => (
          <SpecSectionView
            key={s.spec}
            section={s}
            main={main}
            done={revisedSpecs.includes(s.spec)}
            onToggle={() => toggle(s.spec)}
            delay={Math.min(idx * 0.02, 0.1)}
          />
        ))}
      </div>

      {/* ————— collect the sticker ————— */}
      <Reveal className="relative mt-16 flex justify-center">
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
                Revised the whole note — stamp it
              </>
            )}
          </motion.button>
        </div>
      </Reveal>
      <p className="mt-3 text-center text-[12.5px] font-bold text-ink-faint">
        {isRevised ? `All ${doc.sections.length} sections revised — the note is stamped.` : `Revise all ${doc.sections.length} sections, then stamp the note.`}
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
    <section id={`spec-${section.spec.replace(".", "-")}`} className="scroll-mt-[176px]">
      <Reveal delay={delay}>
        {/* spec banner — the official wording, stated above the section */}
        <div className="flex items-center gap-3">
          <span
            className="inline-flex shrink-0 rotate-[-1.5deg] items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[12px] font-bold tracking-[0.08em] text-white uppercase"
            style={{ background: main, boxShadow: `0 3px 0 ${shade(main)}` }}
          >
            <Target className="h-3.5 w-3.5" /> Spec {section.spec}
          </span>
          <span aria-hidden className="h-[3px] flex-1 rounded-full" style={{ background: tint(main, 18) }} />
        </div>
        <h2 className="mt-3.5 font-display text-[clamp(1.55rem,3.4vw,1.95rem)] font-semibold tracking-tight text-ink">
          {section.title}
        </h2>
        <div className="mt-4 rounded-[22px] px-5 py-4" style={{ background: tint(main, 7), borderLeft: `5px solid ${tint(main, 45)}` }}>
          <div className="font-display text-[10.5px] font-extrabold tracking-[0.2em] uppercase" style={{ color: shade(main, 62) }}>
            From the specification
          </div>
          <p className="mt-1.5 text-[14.5px] leading-[1.75] text-ink italic">
            <Fmt text={section.statement} />
          </p>
        </div>
      </Reveal>

      <div className="mt-7 flex flex-col gap-6">
        {section.blocks.map((b, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.12)} y={18}>
            <BlockView block={b} main={main} />
          </Reveal>
        ))}
      </div>

      {/* mark as revised */}
      <div className="relative mt-8 flex items-center gap-4">
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
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[13.5px] font-semibold"
          style={
            done
              ? { background: "#12B886", color: "#fff", boxShadow: "0 4px 0 #0B7A57" }
              : { background: "#FFFDF7", color: "#3D2B1F", boxShadow: "0 4px 0 rgba(61,43,31,0.10)" }
          }
        >
          {done ? <Check className="h-4.5 w-4.5" strokeWidth={3} /> : <PartyPopper className="h-4.5 w-4.5" style={{ color: main }} />}
          {done ? "Revised" : "Mark as revised"}
        </motion.button>
        <span aria-hidden className="h-[3px] flex-1 rounded-full bg-ink/5" />
      </div>
    </section>
  );
}

/* ————— block dispatcher ————— */

function BlockView({ block: b, main }: { block: NotesBlock; main: string }) {
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
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: main }} />
          <h3 className="font-display text-[21px] font-semibold tracking-tight text-ink">
            <Fmt text={b.text} />
          </h3>
        </div>
      );
    case "bullets":
      return (
        <ul className="flex max-w-[70ch] flex-col gap-2.5">
          {b.items.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.8] text-ink/90">
              <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full" style={{ background: tint(main, 55) }} />
              <span>
                <Fmt text={t} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div className="max-w-[72ch] rounded-[20px] px-4 py-3.5" style={{ background: tint("#FFD43B", 18) }}>
          <div className="flex items-start gap-3">
            <StickyNote className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#B08D00]" />
            <p className="text-[14.5px] leading-[1.7] text-ink">
              <span className="mr-1.5 font-display text-[11.5px] font-extrabold tracking-[0.12em] text-[#B08D00] uppercase">{b.label}:</span>
              <Fmt text={b.text} />
            </p>
          </div>
        </div>
      );
    case "def":
      return (
        <div className="max-w-[72ch] rounded-[20px] bg-paper px-5 py-4 puff" style={{ borderLeft: `5px solid ${tint(main, 40)}` }}>
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
        <div className="max-w-[72ch] rounded-[22px] p-5" style={{ background: tint(main, 9) }}>
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
    case "checkpoint":
      return (
        <div className="flex items-center gap-3 rounded-full bg-paper px-5 py-4 puff">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: tint("#12B886", 18) }}>
            <BookOpen className="h-5 w-5 text-mint" />
          </span>
          <p className="text-[15px] font-bold text-ink">
            Checkpoint — the check point questions for this section are on page {b.page} of the textbook.
          </p>
        </div>
      );
    case "figure":
      return <Figure kind={b.kind} caption={b.caption} main={main} />;
    case "wow":
      return (
        <div className="max-w-[72ch] rounded-[22px] p-5 sm:p-6" style={{ background: tint("#9775FA", 12) }}>
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-white">
              <Lightbulb className="h-5 w-5 text-grape" />
            </span>
            <div>
              <div className="font-display text-[11px] font-extrabold tracking-[0.18em] text-grape uppercase">Key idea</div>
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
        <div className="mb-2 text-[12px] font-extrabold tracking-[0.08em] text-ink-faint uppercase">
          <Fmt text={caption} />
        </div>
      )}
      <div className="overflow-hidden rounded-[24px] bg-paper puff">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr style={{ background: tint(main, 15) }}>
                {head.map((h, i) => (
                  <th key={i} className="px-4 py-3.5 font-display text-[12px] font-semibold tracking-[0.06em] whitespace-nowrap text-ink uppercase sm:px-5">
                    <Fmt text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t-[2.5px] border-dashed border-ink/10" style={{ background: i % 2 === 1 ? tint(main, 4) : undefined }}>
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3.5 align-top text-[14px] leading-[1.65] sm:px-5 ${j === 0 ? "font-extrabold text-ink" : "text-ink-soft"}`}>
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

/* ————— worked example ————— */

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
  return (
    <div className="rounded-[28px] bg-paper p-5 puff sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="inline-flex shrink-0 rotate-[-1.5deg] items-center rounded-full px-3.5 py-1.5 font-display text-[12px] font-bold tracking-[0.1em] text-white uppercase"
          style={{ background: main }}
        >
          <PenLine className="mr-1.5 h-3.5 w-3.5" /> {title}
        </span>
        <p className="min-w-[16rem] flex-1 text-[15.5px] leading-[1.7] font-bold text-ink">
          <Fmt text={question} />
        </p>
      </div>
      <div className="mt-4 flex flex-col">
        {steps.map((s, i) => (
          <div key={i} style={{ marginLeft: `min(${i * 14}px, 56px)` }}>
            {i > 0 && <div className="dot-line mb-1 ml-6 h-4" aria-hidden />}
            <div className="inline-flex max-w-full items-start gap-2.5 rounded-[18px] px-4 py-2.5 text-[15px] leading-[1.7] text-ink" style={{ background: tint(main, 9) }}>
              <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full font-display text-[11px] font-bold text-white" style={{ background: main }}>
                {i + 1}
              </span>
              <span>
                <Fmt text={s} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-4 flex items-start gap-2.5 rounded-[20px] bg-white px-4 py-3 text-[15px] font-bold text-ink shadow-[0_4px_0_rgb(61_43_31/0.07)]"
        style={{ borderLeft: `6px solid ${main}` }}
      >
        <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: main }} strokeWidth={3} />
        <span>
          <Fmt text={answer} />
        </span>
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
      {caption && <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-ink-faint uppercase">{caption}</p>}
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
                    <p className="px-5 pb-4 pl-[68px] text-[15px] leading-[1.75] text-ink/90">
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
