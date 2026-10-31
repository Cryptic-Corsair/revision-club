"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { CHEMISTRY, NOTES } from "@/lib/data";
import { useHydrated, useProgress } from "@/lib/progress";
import { MarkChip, NoteBlock, Reveal, Stamp, Tick } from "./primitives";

export function Reader({
  unitSlug,
  topicSlug,
  backToUnit,
  goWallchart,
  openTopic,
}: {
  unitSlug: string;
  topicSlug: string;
  backToUnit: () => void;
  goWallchart: () => void;
  openTopic: (unit: string, topic: string) => void;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { progress, toggleRevised } = useProgress();
  const mounted = useHydrated();

  const unit = CHEMISTRY.units.find((u) => u.slug === unitSlug);
  const topicIdx = unit?.topics.findIndex((t) => t.slug === topicSlug) ?? -1;
  const topic = topicIdx >= 0 ? unit!.topics[topicIdx] : undefined;
  const note = NOTES[`${unitSlug}/${topicSlug}`];
  const prevTopic = topicIdx > 0 ? unit!.topics[topicIdx - 1] : undefined;
  const nextTopic = topicIdx >= 0 ? unit!.topics[topicIdx + 1] : undefined;
  const topicKey = `${unitSlug}/${topicSlug}`;
  const isRevised = mounted && progress.revised.includes(topicKey);

  if (!unit || !topic) {
    return (
      <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-20 pb-24">
        <p className="font-display text-3xl">Note not found.</p>
        <button type="button" onClick={backToUnit} className="balllink mt-4 inline-block">
          Back to the unit map
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* reading progress — red pen line across the top */}
      {!reduced && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-pen z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      )}

      <article className="mx-auto max-w-[1160px] px-5 md:px-10 pt-12 pb-8">
        <button
          type="button"
          onClick={backToUnit}
          className="no-print font-marks text-[11.5px] uppercase tracking-[0.16em] text-ink-faint hover:text-pen-deep transition-colors mb-10"
        >
          ◂ Unit map · {unit.code}
        </button>

        <Reveal>
          <header className="mb-10">
            <p className="font-marks text-[11px] uppercase tracking-[0.2em] text-pen-deep mb-4">
              Pearson Edexcel IAL Chemistry · Unit {unit.code.slice(-1)} · {unit.code}
              {topic.ref ? ` · Spec ${topic.ref}` : ""}
            </p>
            <h1 className="font-display font-semibold text-[2.4rem] md:text-[3.2rem] leading-[1.05] tracking-[-0.015em] mb-5">
              {topic.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Stamp graphite pressed>Spec-checked</Stamp>
              <p className="font-marks text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
                Last updated {note?.updated ?? "recently"}
                {topic.minutes ? ` · ${topic.minutes} min read` : ""}
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="no-print font-marks text-[11.5px] uppercase tracking-[0.14em] text-pen-deep underline decoration-pen/50 underline-offset-[5px] hover:text-ink transition-colors ml-auto"
              >
                Print this note
              </button>
            </div>
            <div className="double-rule mt-8" aria-hidden="true" />
          </header>
        </Reveal>

        {/* print-only handout header */}
        <div className="print-only" aria-hidden="true">
          <div className="flex items-center justify-between gap-4 mb-1">
            <p className="font-marks text-[10px] uppercase tracking-[0.16em]">
              Axiom · IAL Chemistry · {unit.code} · Spec {topic.ref ?? "—"}
            </p>
            <p className="font-marks text-[10px] uppercase tracking-[0.16em]">Name ______________  Class ______</p>
          </div>
          <div className="border-t border-dashed border-ink/60 mb-6" />
        </div>

        {/* mark scheme legend — how the chips work */}
        <Reveal>
          <div className="paper-card px-5 py-3.5 mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 max-w-[64ch]">
            <span className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
              Mark code
            </span>
            <span className="flex items-center gap-2">
              <MarkChip>M1</MarkChip>
              <span className="font-body text-[14px] text-ink-soft">method</span>
            </span>
            <span className="flex items-center gap-2">
              <MarkChip>A1</MarkChip>
              <span className="font-body text-[14px] text-ink-soft">accuracy</span>
            </span>
            <span className="flex items-center gap-2">
              <MarkChip>B1</MarkChip>
              <span className="font-body text-[14px] text-ink-soft">independent recall</span>
            </span>
          </div>
        </Reveal>

        {note ? (
          <div className="space-y-5">
            {note.sections.map((section, i) => (
              <NoteBlock
                key={i}
                section={section}
                quizId={section.type === "quiz" ? `${topicKey}#q${i}` : undefined}
                goWallchart={goWallchart}
              />
            ))}
          </div>
        ) : (
          <div className="exam-box px-6 py-10 text-center max-w-[64ch]">
            <p className="font-display italic text-xl mb-2">This note is being written.</p>
            <p className="font-body text-ink-soft">The margin will be full soon.</p>
          </div>
        )}

        {/* end of note */}
        <div className="max-w-[64ch] mt-16 no-print">
          {/* mark as revised — the tick that fills the mark sheet */}
          <div className="paper-card px-6 py-5 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={isRevised ? "shrink-0" : "shrink-0 opacity-35"} aria-hidden="true">
                <Tick size={28} animated={false} className={isRevised ? "-rotate-6" : ""} />
              </span>
              <div>
                <p className="font-display font-semibold text-[17px]">
                  {isRevised ? "Ticked — on the mark sheet" : "Revised this one?"}
                </p>
                <p className="font-body text-[14.5px] text-ink-soft">
                  {isRevised ? "The examiner has been informed. It counts on the mark sheet." : "One tick here and it appears on your candidate mark sheet."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleRevised(topicKey)}
              className={`font-marks text-[12px] uppercase tracking-[0.14em] px-4 py-2.5 border rounded-[2px] transition-colors ${
                isRevised
                  ? "border-rule text-ink-faint hover:text-ink"
                  : "border-pen/60 text-pen-deep hover:bg-hl/30"
              }`}
              aria-pressed={isRevised}
            >
              {isRevised ? "Untick ↺" : "Tick as revised ✓"}
            </button>
          </div>

          <div className="flex items-center gap-5 mb-8" aria-hidden="true">
            <span className="h-px flex-1 bg-rule" />
            <span className="font-marks text-[10.5px] uppercase tracking-[0.3em] text-ink-faint">End of note</span>
            <span className="h-px flex-1 bg-rule" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {prevTopic ? (
              <button
                type="button"
                onClick={() => openTopic(unitSlug, prevTopic.slug)}
                className={`paper-card px-5 py-4 text-left transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(191,59,43,0.2)] ${prevTopic.status === "live" ? "" : "opacity-55"}`}
              >
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint mb-1">◂ Turn back</p>
                <p className="font-body text-ink-soft group-hover:text-ink">
                  {prevTopic.title}
                  {prevTopic.status === "coming-soon" && (
                    <span className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint"> — being written</span>
                  )}
                </p>
              </button>
            ) : (
              <div className="paper-card px-5 py-4">
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint mb-1">◂ Turn back</p>
                <p className="font-body italic text-ink-soft">This is the first topic in the unit.</p>
              </div>
            )}
            {nextTopic ? (
              <button
                type="button"
                onClick={() => openTopic(unitSlug, nextTopic.slug)}
                className={`paper-card px-5 py-4 text-left transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(191,59,43,0.2)] ${nextTopic.status === "live" ? "" : "opacity-55"}`}
              >
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep mb-1">Turn over ▸</p>
                <p className="font-body text-ink-soft">
                  {nextTopic.title}
                  {nextTopic.status === "coming-soon" && (
                    <span className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint"> — being written</span>
                  )}
                </p>
              </button>
            ) : (
              <div className="paper-card px-5 py-4">
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep mb-1">Turn over ▸</p>
                <p className="font-body italic text-ink-soft">You have reached the end of this unit.</p>
              </div>
            )}
          </div>

          <button type="button" onClick={backToUnit} className="balllink mt-8 inline-block font-body text-[15.5px]">
            Back to the {unit.code} unit map
          </button>
        </div>
      </article>
    </div>
  );
}
