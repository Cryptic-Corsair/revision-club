"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CHEMISTRY } from "@/lib/data";
import { Formula, GradeCircle, HandUnderline, MarginNote, MarkChip, Reveal, SectionHead, Stamp, Tick } from "./primitives";
import { UnitCard } from "./library";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.2, 0.7, 0.3, 1] as const },
});

export function Home({
  goLibrary,
  openUnit,
  openSampleNote,
}: {
  goLibrary: () => void;
  openUnit: (slug: string) => void;
  openSampleNote: () => void;
}) {
  const reduced = useReducedMotion();
  const anim = <T extends object>(cfg: T) => (reduced ? {} : cfg);

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10">
      {/* ————— hero ————— */}
      <section className="pt-14 md:pt-20 pb-16 md:pb-24 grid gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:gap-10 items-center">
        <div>
          <motion.div {...anim(fadeUp(0))} className="flex flex-wrap items-center gap-4 mb-7">
            <Stamp pressed>Spec-aligned · WCH11–WCH16</Stamp>
            <Stamp graphite pressed>Free · no ads</Stamp>
          </motion.div>

          <motion.h1
            {...anim(fadeUp(0.08))}
            className="font-display font-semibold text-[2.6rem] md:text-[3.6rem] xl:text-[4.05rem] leading-[1.04] tracking-[-0.015em] mb-4"
          >
            Chemistry notes your teacher would write{" "}
            <HandUnderline>if they had the time.</HandUnderline>
            <span className="hidden md:inline-block align-middle">
              <MarginNote arrow className="ml-6 text-[16.5px]">
                better, honestly
              </MarginNote>
            </span>
          </motion.h1>

          <motion.p
            {...anim(fadeUp(0.18))}
            className="font-body text-[19px] leading-[1.7] text-ink-soft max-w-[56ch] mb-9"
          >
            Axiom is built for one subject and takes it seriously: Pearson Edexcel International A Level Chemistry.
            Every unit from the mole to transition metals, mapped line-by-line to the specification and annotated
            the way a great tutor marks your paper —{" "}
            <span className="hl-swipe font-medium text-ink">in the margins, where it counts.</span>
          </motion.p>

          <motion.div {...anim(fadeUp(0.28))} className="flex flex-wrap items-center gap-6">
            <button type="button" onClick={goLibrary} className="btn-ink">
              Open the unit map
            </button>
            <button
              type="button"
              onClick={openSampleNote}
              className="font-marks text-[12.5px] uppercase tracking-[0.14em] text-pen-deep underline decoration-pen/50 underline-offset-[5px] hover:text-ink hover:decoration-ink transition-colors"
            >
              Read a sample note →
            </button>
          </motion.div>

          <motion.p
            {...anim(fadeUp(0.4))}
            className="font-marks text-[11.5px] uppercase tracking-[0.16em] text-ink-faint mt-12 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span>6 units</span>
            <span className="text-pen" aria-hidden="true">·</span>
            <span>20 topics mapped</span>
            <span className="text-pen" aria-hidden="true">·</span>
            <span>150+ spec points</span>
            <span className="text-pen" aria-hidden="true">·</span>
            <span>Mark-scheme fluent</span>
          </motion.p>
        </div>

        {/* the marked titration paper — artifact */}
        <motion.div
          {...anim(fadeUp(0.3))}
          className="relative max-w-[470px] w-full mx-auto xl:mx-0 xl:justify-self-end"
        >
          <div className="paper-card paper-card--stacked rotate-[0.8deg] p-6 md:p-7">
            <div className="flex items-center justify-between gap-3 mb-1">
              <p className="font-marks text-[11px] uppercase tracking-[0.18em] text-pen-deep">Chemistry — Unit 1</p>
              <span className="font-marks text-[11px] tracking-[0.14em] text-ink-faint border border-rule rounded-[2px] px-2 py-0.5">
                WCH11
              </span>
            </div>
            <div className="double-rule my-4" aria-hidden="true" />
            <p className="font-display font-semibold text-[21px] leading-snug mb-4">
              The mole and titration calculations
            </p>

            <div className="exam-box relative px-5 py-4">
              <span className="absolute -top-[8px] left-3 bg-paper-card px-2 font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                Learn these
              </span>
              <ol className="font-marks text-[14.5px] leading-[2]">
                <li>
                  <span className="text-ink-faint mr-4 text-[11px]">01</span>
                  n = m / M
                </li>
                <li className="inline-block bg-hl/60 px-2 -mx-2 rounded-[2px]">
                  <span className="text-ink-faint mr-4 text-[11px]">02</span>
                  n = cV / 1000
                </li>
                <li>
                  <span className="text-ink-faint mr-4 text-[11px]">03</span>
                  pV = nRT
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-between gap-3 mt-5">
              <MarginNote className="text-[15.5px]">
                ÷1000 — before you forget
              </MarginNote>
              <Tick size={26} className="shrink-0 -rotate-6" />
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-rule flex items-center justify-between gap-3">
              <p className="font-body text-[15px] text-ink-soft">
                Mean concordant titre <span className="font-marks text-ink">22.30 cm³</span>
              </p>
              <p className="font-body text-[15.5px]">
                <MarkChip>A1</MarkChip>{" "}
                <GradeCircle>
                  <Formula text="0.0892 mol dm^{-3}" className="font-semibold" />
                </GradeCircle>
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-dashed border-rule">
              <button
                type="button"
                onClick={openSampleNote}
                className="balllink font-body text-[15.5px] bg-transparent border-0 p-0 cursor-pointer"
              >
                From the full note — read it in the reader →
              </button>
            </div>
          </div>

          <div className="absolute -top-6 right-0 md:-right-5 z-10" aria-hidden="true">
            <GradeCircle>
              <span className="font-display font-bold text-[26px] text-pen-deep px-1.5">A*</span>
            </GradeCircle>
          </div>
          <div className="absolute -top-4 -left-10 rotate-[-7deg] hidden xl:block" aria-hidden="true">
            <MarginNote className="text-[15px] px-1">start here ↘</MarginNote>
          </div>
        </motion.div>
      </section>

      {/* ————— Section A: the six papers ————— */}
      <section className="pb-20">
        <Reveal>
          <SectionHead
            section="Section A"
            title="The six papers"
            instruction="Answer all questions. Every unit, in specification order."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHEMISTRY.units.map((u, i) => (
            <UnitCard key={u.slug} unit={u} onOpen={() => openUnit(u.slug)} delay={(i % 3) * 70} />
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8">
            <button
              type="button"
              onClick={goLibrary}
              className="font-marks text-[12.5px] uppercase tracking-[0.14em] text-pen-deep underline decoration-pen/50 underline-offset-[5px] hover:text-ink transition-colors"
            >
              Open the full unit map →
            </button>
          </div>
        </Reveal>
      </section>

      {/* ————— Section B: how it works ————— */}
      <section className="pb-20">
        <Reveal>
          <SectionHead section="Section B" title="How every note is built" instruction="Answer ALL questions. Show your reasoning." />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Pick your unit",
              b: "Six papers, WCH11 to WCH16 — exactly the codes Pearson prints on the front cover, practicals included.",
              m: "even Units 3 & 6 — they're written papers too",
            },
            {
              n: "02",
              t: "Follow the spec line",
              b: "Topics sit in specification order and carry their exact reference — 1.3–1.9, 2.5–2.6 — so revision lines up with what the exam will ask.",
              m: "no textbook detours",
            },
            {
              n: "03",
              t: "Revise in the margins",
              b: "Red-pen exam tips, formula boxes and mark-scheme chips beside the line that earns them — then a marked quiz to finish.",
              m: "the fun part",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="relative">
                <p className="font-marks text-[13px] text-pen-deep tracking-[0.2em] mb-3">{step.n}</p>
                <h3 className="font-display text-[1.5rem] font-semibold mb-3">{step.t}</h3>
                <p className="font-body text-[16px] leading-[1.7] text-ink-soft">{step.b}</p>
                <p className="margin-note text-[15.5px] mt-3">{step.m}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— Section C: the examiner's voice ————— */}
      <section className="pb-20">
        <Reveal>
          <SectionHead
            section="Section C"
            title="The examiner's voice"
            instruction="Fig. 1 — what every note looks like on the inside."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3 items-start">
          <Reveal delay={0}>
            <div className="paper-card border-l-[3px] border-pen px-5 py-4 -rotate-[0.6deg]">
              <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep mb-1">Exam tip</p>
              <p className="font-body text-[15.5px] leading-[1.65] text-ink/90">
                Quote answers to 3 significant figures and attach the unit — a bare “0.0892” drops the A1.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="exam-box px-5 py-4 rotate-[0.5deg]">
              <p className="font-marks text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-2">Learn these</p>
              <p className="font-marks text-[14.5px] leading-[2]">
                <span className="bg-hl/60 px-1.5 -mx-1.5 rounded-[2px]">n = cV / 1000</span>
                <br />
                pV = nRT
              </p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="paper-card border-l-[3px] border-ink-faint px-5 py-4 rotate-[0.9deg]">
              <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-1">Common mistake</p>
              <p className="font-body text-[15.5px] leading-[1.65] text-ink/90">
                Forgetting ÷1000 when the volume is in cm³ — it inflates the answer a thousandfold, in every exam series.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="mt-8">
            <button
              type="button"
              onClick={openSampleNote}
              className="font-marks text-[12.5px] uppercase tracking-[0.14em] text-pen-deep underline decoration-pen/50 underline-offset-[5px] hover:text-ink transition-colors"
            >
              Read a full note in the reader →
            </button>
          </div>
        </Reveal>
      </section>

      {/* ————— quote band ————— */}
      <section className="py-16 border-t border-rule">
        <Reveal>
          <blockquote className="font-display italic font-medium text-[1.55rem] md:text-[1.9rem] leading-[1.35] text-center max-w-[30ch] md:max-w-[44ch] mx-auto">
            “Notes that read like a <span className="hl-swipe not-italic font-semibold">great teacher</span> explained
            it — not like a textbook dumped it.”
          </blockquote>
        </Reveal>
      </section>

      {/* ————— CTA band ————— */}
      <section className="pb-20">
        <Reveal>
          <div className="double-rule mb-14" aria-hidden="true" />
          <div className="text-center">
            <h2 className="font-display font-semibold text-[2.1rem] md:text-[2.7rem] leading-[1.1] tracking-[-0.01em] mb-8">
              Start with your weakest unit.
            </h2>
            <button type="button" onClick={goLibrary} className="btn-ink">
              Open the unit map
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
