"use client";

import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, PieChart, Sparkles, Target, Timer } from "./icons";
import type { Unit } from "@/lib/spectra/types";
import { ROOM_UNIT_ACCENTS, UNITS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { Fmt } from "./format";
import {
  BeakerMeter,
  Chip,
  DoodleSparkle,
  Mascot,
  PopIn,
  Reveal,
  SectionTag,
  SpeechBubble,
  SoftButton,
  tint,
  shade,
} from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · unit view — follow the dots
   ═══════════════════════════════════════════════════════════════ */

export function UnitView({
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
  const minutes = unit.topics.reduce((m, t) => m + t.minutes, 0);
  const prev = UNITS[unit.index - 2];
  const next = UNITS[unit.index];
  const main = ROOM_UNIT_ACCENTS[unit.code];

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8" style={{ paddingTop: "calc(6rem + var(--sa-top))" }}>
      {/* back */}
      <PopIn>
        <SoftButton onClick={onBack} className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]">
          <ArrowLeft className="h-4 w-4" /> back to all units
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-8">
        <PopIn delay={0.05} className="flex flex-wrap items-center gap-3">
          <span
            className="inline-block rounded-[calc(14px*var(--ui-scale))] px-4 py-2 font-display text-[calc(17px*var(--ui-scale))] font-bold"
            style={{ background: tint(main, 16), color: shade(main, 62) }}
          >
            {unit.code}
          </span>
          <Chip>
            {unit.stage} · {unit.topicRange}
          </Chip>
        </PopIn>

        <PopIn delay={0.1}>
          <h1 className="mt-6 font-display text-[calc(clamp(2rem,4.6vw,3.1rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.06] font-semibold tracking-tight text-ink">
            {unit.title}
          </h1>
          <p className="mt-2 max-w-3xl text-[calc(16.5px*var(--ui-scale))] leading-snug font-semibold text-ink-soft">
            {unit.code} · {unit.topicRange} · {unit.paper.duration} · {unit.paper.marks} marks
          </p>
        </PopIn>

        <PopIn delay={0.16} className="mt-6 flex items-end gap-2 sm:gap-3">
          <div className="shrink-0 pb-1">
            <Mascot main={main} size={84} bubbles={false} />
          </div>
          <SpeechBubble bg={tint(main, 8)} className="min-w-0 flex-1">
            <p className="text-[calc(15.5px*var(--ui-scale))] leading-[1.75] text-ink">
              <Fmt text={unit.blurb} />
            </p>
          </SpeechBubble>
        </PopIn>
      </header>

      {/* ————— paper facts ————— */}
      <PopIn delay={0.2} className="mt-8 flex flex-wrap gap-2.5">
        {[
          { icon: Timer, label: unit.paper.duration },
          { icon: Target, label: `${unit.paper.marks} marks` },
          { icon: PieChart, label: unit.paper.stageWeight },
          { icon: Sparkles, label: `${unit.paper.ialWeight} of the IAL` },
        ].map((f) => (
          <span
            key={f.label}
            className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink puff"
          >
            <f.icon className="h-4 w-4" style={{ color: main }} strokeWidth={2.5} />
            {f.label}
          </span>
        ))}
      </PopIn>

      {/* ————— progress ————— */}
      <Reveal className="mt-10">
        <div
          className="flex items-center gap-6 rounded-[calc(32px*var(--ui-scale))] p-6 sm:p-7"
          style={{ background: tint(main, 10) }}
        >
          <div className="shrink-0">
            <BeakerMeter pct={pct} main={main} size={92} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-[calc(21px*var(--ui-scale))] font-semibold text-ink">
              Progress
            </h3>
            <p className="mt-1 text-[calc(14.5px*var(--ui-scale))] leading-relaxed text-ink-soft">
              {done === 0
                ? "Nothing marked yet — mark a topic as revised when you finish it."
                : done === unit.topics.length
                  ? "All topics revised — well done."
                  : `${done} of ${unit.topics.length} topics revised.`}
            </p>
            <div className="mt-3 h-4 w-full max-w-xs overflow-hidden rounded-full bg-paper/80">
              <m.div
                className="h-full rounded-full"
                style={{ background: main }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(pct * 100, 3)}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ————— topics ————— */}
      <section className="mt-14">
        <Reveal>
          <SectionTag main={main} tilt={-2}>
            topics
          </SectionTag>
          <h2 className="mt-4 mb-8 font-display text-[calc(clamp(1.7rem,3.4vw,2.4rem)*(1+(var(--ui-scale)-1)*0.5))] font-semibold text-ink">
            {unit.code === "WCH13" || unit.code === "WCH16"
              ? "Practical skills, in order"
              : "Topics in this unit"}
          </h2>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="dot-line absolute top-2 bottom-6 left-[calc(23px*var(--ui-scale))] sm:left-[calc(27px*var(--ui-scale))]"
          />
          <div className="flex flex-col gap-6">
            {unit.topics.map((t, i) => {
              const isDone = revised.includes(`${unit.code}/${t.id}`);
              return (
                <Reveal key={t.id} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* the trail stone — flat now, haloed by a ring of
                        its own colour instead of a pedestal */}
                    <m.span
                      className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[calc(16px*var(--ui-scale))] font-bold text-white sm:h-14 sm:w-14 sm:text-[calc(18px*var(--ui-scale))]"
                      style={{
                        background: isDone ? "#12B886" : main,
                        boxShadow: `0 0 0 5px ${tint(isDone ? "#12B886" : main, 18)}`,
                      }}
                    >
                      {isDone ? <Check className="h-6 w-6" strokeWidth={3} /> : i + 1}
                    </m.span>

                    <m.button
                      type="button"
                      onClick={() => onOpenTopic(t.id)}
                      aria-label={`Open ${t.label}: ${t.title}`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="group min-w-0 flex-1 cursor-pointer rounded-[calc(26px*var(--ui-scale))] bg-paper p-5 text-left puff sm:p-6"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip main={main}>{t.label}</Chip>
                        <Chip>
                          <Clock className="h-3 w-3" /> {t.minutes} min
                        </Chip>
                        <span className="hidden font-mono text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-wide text-ink-faint sm:inline">
                          {t.ao.join(" · ")}
                        </span>
                        {isDone && (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-[calc(11.5px*var(--ui-scale))] font-bold text-mint">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} /> revised
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2.5 font-display text-[calc(21px*var(--ui-scale))] leading-snug font-semibold text-ink">
                        {t.title}
                      </h3>
                      <p className="mt-1.5 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.7] text-ink-soft">
                        <Fmt text={t.summary} />
                      </p>
                    </m.button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— prev / next ————— */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {prev ? (
          <m.button
            type="button"
            onClick={() => onOpenUnit(prev.code)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-paper px-5 py-4 text-left puff"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-soft">
              <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
            <span className="min-w-0">
              <span className="block text-[calc(11px*var(--ui-scale))] font-semibold tracking-[0.12em] text-ink-faint uppercase">
                previous unit
              </span>
              <span className="block truncate font-display text-[calc(15px*var(--ui-scale))] font-semibold text-ink">
                {prev.code} · {prev.shortTitle}
              </span>
            </span>
          </m.button>
        ) : (
          <span aria-hidden />
        )}
        {next && (
          <m.button
            type="button"
            onClick={() => onOpenUnit(next.code)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center justify-end gap-3 rounded-full px-5 py-4 text-right text-white sm:col-start-2"
            style={{ background: next.candy.main, boxShadow: `0 2px 0 ${shade(next.candy.main)}` }}
          >
            <span className="min-w-0">
              <span className="block text-[calc(11px*var(--ui-scale))] font-semibold tracking-[0.12em] text-white/70 uppercase">
                next unit
              </span>
              <span className="block truncate font-display text-[calc(15px*var(--ui-scale))] font-semibold">
                {next.code} · {next.shortTitle}
              </span>
            </span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20">
              <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
          </m.button>
        )}
      </div>
    </div>
  );
}
