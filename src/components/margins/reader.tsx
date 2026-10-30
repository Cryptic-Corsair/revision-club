"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { NOTES, SUBJECTS } from "@/lib/data";
import { NoteBlock, Reveal, Stamp } from "./primitives";

export function Reader({
  subjectSlug,
  unitSlug,
  topicSlug,
  backToUnit,
}: {
  subjectSlug: string;
  unitSlug: string;
  topicSlug: string;
  backToUnit: () => void;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const subject = SUBJECTS.find((s) => s.slug === subjectSlug);
  const unit = subject?.units.find((u) => u.slug === unitSlug);
  const topicIdx = unit?.topics.findIndex((t) => t.slug === topicSlug) ?? -1;
  const topic = topicIdx >= 0 ? unit!.topics[topicIdx] : undefined;
  const note = NOTES[`${subjectSlug}/${unitSlug}/${topicSlug}`];
  const nextTopic = topicIdx >= 0 ? unit!.topics[topicIdx + 1] : undefined;

  if (!subject || !unit || !topic) {
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
          className="font-marks text-[11.5px] uppercase tracking-[0.16em] text-ink-faint hover:text-pen-deep transition-colors mb-10"
        >
          ◂ {subject.name} · {unit.code}
        </button>

        <Reveal>
          <header className="mb-12">
            <p className="font-marks text-[11px] uppercase tracking-[0.2em] text-pen-deep mb-4">
              {subject.name} · Unit: {unit.name} · {unit.code}
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
            </div>
            <div className="double-rule mt-8" aria-hidden="true" />
          </header>
        </Reveal>

        {note ? (
          <div className="space-y-5">
            {note.sections.map((section, i) => (
              <NoteBlock key={i} section={section} />
            ))}
          </div>
        ) : (
          <div className="exam-box px-6 py-10 text-center max-w-[64ch]">
            <p className="font-display italic text-xl mb-2">This note is being written.</p>
            <p className="font-body text-ink-soft">The margin will be full soon.</p>
          </div>
        )}

        {/* end of note */}
        <div className="max-w-[64ch] mt-16">
          <div className="flex items-center gap-5 mb-8" aria-hidden="true">
            <span className="h-px flex-1 bg-rule" />
            <span className="font-marks text-[10.5px] uppercase tracking-[0.3em] text-ink-faint">End of note</span>
            <span className="h-px flex-1 bg-rule" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="paper-card px-5 py-4 opacity-55">
              <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint mb-1">◂ Turn back</p>
              <p className="font-body italic text-ink-soft">This is the first topic in the unit.</p>
            </div>
            {nextTopic ? (
              <div className="paper-card px-5 py-4">
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep mb-1">Turn over ▸</p>
                <p className="font-body text-ink-soft">
                  Next: {nextTopic.title}
                  {nextTopic.status === "coming-soon" && (
                    <span className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint"> — being written</span>
                  )}
                </p>
              </div>
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
