"use client";

import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Target } from "./icons";
import type { Unit } from "@/lib/spectra/types";
import { UNITS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { Fmt } from "./format";
import { PopIn, Reveal, SoftButton } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the unit walk, in the editorial dress.
   The same unit — same facts, same topics, same revised marks
   read from the same store — set as a document instead of a dot
   trail: the disclaimer page's hero, the paper facts as a stat
   row, the progress as a hairline bench, the topics as an index
   with rust numerals, and the neighbouring units as links in the
   closing card. The classic UnitView's twin; the props contract
   is identical, so the shell swaps them without knowing.
   ═══════════════════════════════════════════════════════════════ */

export function UnitEditorial({
  unit,
  onOpenTopic,
  onBack,
  onOpenUnit,
}: {
  unit: Unit;
  onOpenTopic: (topicId: string) => void;
  onBack: () => void;
  onOpenUnit: (code: string) => void;
}) {
  const revised = useRevised();
  const done = unit.topics.filter((t) => revised.includes(`${unit.code}/${t.id}`)).length;
  const pct = unit.topics.length ? done / unit.topics.length : 0;
  const prev = UNITS[unit.index - 2];
  const next = UNITS[unit.index];

  const facts = [
    unit.paper.duration,
    `${unit.paper.marks} marks`,
    unit.paper.stageWeight,
    `${unit.paper.ialWeight} of the IAL`,
  ];

  return (
    <main className="legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      <PopIn>
        <SoftButton
          onClick={onBack}
          className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
          ariaLabel="Back to all units"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all units
        </SoftButton>
      </PopIn>

      {/* ————— hero ————— */}
      <Reveal>
        <section className="legal-hero relative mt-5 overflow-hidden rounded-[30px] px-6 py-8 sm:px-9 sm:py-10">
          <div className="legal-hero-grain" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="legal-kicker">
                <Target className="h-3.5 w-3.5" /> UNIT {unit.code}
              </span>
              <span className="legal-meta">
                IAL CHEM · {unit.stage} · {unit.topicRange}
              </span>
            </div>
            <h1 className="mt-5 max-w-[24ch] font-display text-[calc(clamp(2.4rem,6vw,4.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.06] font-bold tracking-[-.05em] text-ink">
              {unit.title}
              <span className="legal-heading-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
              <Fmt text={unit.blurb} />
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-4">
              {facts.map((f) => (
                <span key={f} className="legal-meta">{f}</span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ————— the revised bench ————— */}
      <Reveal delay={0.06}>
        <section className="legal-summary mt-8 rounded-[26px] p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-[calc(20px*var(--ui-scale))] font-semibold tracking-tight text-ink">
              Revised so far
            </h2>
            <span className="legal-meta">
              {done} OF {unit.topics.length} TOPICS
            </span>
          </div>
          <div className="mt-4 h-[calc(5px*var(--ui-scale))] overflow-hidden rounded-full bg-ink/[0.08]">
            <m.div
              className="h-full rounded-full"
              style={{ background: "var(--legal-rust)" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(pct * 100, done > 0 ? 3 : 0)}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          <p className="mt-3.5 max-w-[64ch] text-[calc(13.5px*var(--ui-scale))] leading-[1.75] text-ink-soft">
            {done === 0
              ? "Nothing marked yet — mark a topic as revised when you finish it."
              : done === unit.topics.length
                ? "All topics revised — well done."
                : `${done} of ${unit.topics.length} topics revised.`}
          </p>
        </section>
      </Reveal>

      {/* ————— the topic index ————— */}
      <div className="mt-10">
        <Reveal>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="legal-meta">THE TOPICS</p>
              <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                {unit.code === "WCH13" || unit.code === "WCH16"
                  ? "Practical skills, in order"
                  : "Topics in this unit"}
              </h2>
            </div>
            <span className="legal-meta hidden sm:block">
              {unit.topicRange} · {unit.topics.length} stops
            </span>
          </div>
        </Reveal>

        <div className="legal-clauses">
          {unit.topics.map((t, i) => {
            const isDone = revised.includes(`${unit.code}/${t.id}`);
            return (
              <Reveal key={t.id} delay={Math.min(i * 0.04, 0.2)}>
                <m.button
                  type="button"
                  onClick={() => onOpenTopic(t.id)}
                  aria-label={`Open ${t.label}: ${t.title}`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group flex w-full cursor-pointer items-start gap-4 rounded-[calc(14px*var(--ui-scale))] px-4 py-5 text-left transition-colors hover:bg-ink/[0.035] sm:gap-6 sm:px-5"
                >
                  <span
                    aria-hidden
                    className="w-[calc(30px*var(--ui-scale))] shrink-0 pt-[calc(3px*var(--ui-scale))] font-display text-[calc(19px*var(--ui-scale))] leading-none font-bold text-[var(--legal-rust)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 border-b border-ink/10 pb-5 group-last:border-b-0">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      <span className="legal-meta">{t.label.toUpperCase()}</span>
                      <span className="legal-meta">{t.minutes} MIN</span>
                      <span className="legal-meta hidden sm:inline">{t.ao.join(" · ")}</span>
                      {isDone && (
                        <span className="ml-auto inline-flex items-center gap-1.5">
                          <span
                            className="grid h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))] place-items-center rounded-[calc(5px*var(--ui-scale))]"
                            style={{ background: "var(--legal-rust)", color: "var(--color-paper)" }}
                          >
                            <Check className="h-[calc(11px*var(--ui-scale))] w-[calc(11px*var(--ui-scale))]" strokeWidth={3.2} />
                          </span>
                          <span className="legal-meta">REVISED</span>
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block font-display text-[calc(20px*var(--ui-scale))] leading-snug font-semibold tracking-tight text-ink">
                      {t.title}
                    </span>
                    <span className="mt-1.5 block max-w-[64ch] text-[calc(13.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                      {t.summary}
                    </span>
                  </span>
                </m.button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ————— closing — the neighbouring units ————— */}
      <Reveal delay={0.08}>
        <section className="legal-closing mt-10 rounded-[26px] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            <p className="legal-meta">THE UNITS EITHER SIDE</p>
          </div>
          <p className="mt-4 max-w-[72ch] text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
            {prev
              ? `${prev.code} walked you through ${prev.shortTitle.toLowerCase()} — step back to warm up, or carry on to ${next ? next.code : "the units ahead"}.`
              : "This is where the course opens. The next unit builds straight on these foundations."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-current/15 pt-4">
            <span className="legal-meta">
              {unit.code} · {unit.paper.duration} · {unit.paper.marks} MARKS
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {prev && (
                <button
                  type="button"
                  onClick={() => onOpenUnit(prev.code)}
                  className="legal-back-link"
                  aria-label={`Open unit ${prev.code}: ${prev.shortTitle}`}
                >
                  <ArrowLeft className="h-4 w-4" /> {prev.code} · {prev.shortTitle}
                </button>
              )}
              {next && (
                <button
                  type="button"
                  onClick={() => onOpenUnit(next.code)}
                  className="legal-back-link"
                  aria-label={`Open unit ${next.code}: ${next.shortTitle}`}
                >
                  {next.code} · {next.shortTitle} <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
