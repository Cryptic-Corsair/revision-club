"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Flame,
  PieChart,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import type { Unit } from "@/lib/spectra/types";
import { UNITS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { Fmt } from "./format";
import {
  BeakerMeter,
  Chip,
  DoodleHex,
  DoodleSparkle,
  Float,
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
   Reaction Club · unit view — follow the dots
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
  const main = unit.candy.main;

  return (
    <div className="mx-auto max-w-5xl px-5 pt-24 pb-20 sm:px-8">
      {/* back */}
      <PopIn>
        <SoftButton onClick={onBack} className="min-h-[42px] px-4 py-2 text-[13.5px]">
          <ArrowLeft className="h-4 w-4" /> back to the clubhouse
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-8">
        <PopIn delay={0.05} className="flex flex-wrap items-center gap-3">
          <span
            className="inline-block rotate-[-2deg] rounded-2xl px-4 py-2 font-display text-[17px] font-bold text-white"
            style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
          >
            {unit.code}
          </span>
          <Chip main={main}>
            <span className="h-2 w-2 rounded-full" style={{ background: main }} />
            flavour: {unit.candy.name}
          </Chip>
          <Chip>
            {unit.stage} · {unit.topicRange}
          </Chip>
        </PopIn>

        <PopIn delay={0.1}>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,3.8rem)] leading-[1.05] font-semibold tracking-tight text-ink">
            {unit.candy.nick}
          </h1>
          <p className="mt-2 max-w-3xl text-[16.5px] leading-snug font-extrabold text-ink-soft">
            {unit.title}
          </p>
        </PopIn>

        <PopIn delay={0.16} className="mt-6 flex items-end gap-2 sm:gap-3">
          <div className="shrink-0 pb-1">
            <Mascot main={main} size={84} bubbles={false} />
          </div>
          <SpeechBubble bg={tint(main, 10)} className="min-w-0 flex-1">
            <p className="text-[15.5px] leading-[1.75] text-ink">
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
            className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-[13.5px] font-extrabold text-ink puff"
          >
            <f.icon className="h-4 w-4" style={{ color: main }} strokeWidth={2.5} />
            {f.label}
          </span>
        ))}
      </PopIn>

      {/* ————— sticker book progress ————— */}
      <Reveal className="mt-10">
        <div
          className="flex items-center gap-6 rounded-[32px] p-6 sm:p-7"
          style={{ background: tint(main, 10) }}
        >
          <div className="shrink-0">
            <BeakerMeter pct={pct} main={main} size={92} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-[21px] font-semibold text-ink">
              Your sticker book
            </h3>
            <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">
              {done === 0
                ? "Still empty — every sticker starts with one topic."
                : done === unit.topics.length
                  ? "Full jar! Every topic collected. Go be smug."
                  : `${done} of ${unit.topics.length} topics collected.`}
            </p>
            <div className="mt-3 h-4 w-full max-w-xs overflow-hidden rounded-full bg-white/80">
              <motion.div
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

      {/* ————— the trail ————— */}
      <section className="mt-14">
        <Reveal>
          <SectionTag main={main} tilt={-2}>
            the trail
          </SectionTag>
          <h2 className="mt-4 mb-8 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold text-ink">
            {unit.code === "WCH13" || unit.code === "WCH16"
              ? "Lab stops, in order"
              : "Follow the dots"}
          </h2>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="dot-line absolute top-2 bottom-6 left-[23px] sm:left-[27px]"
          />
          <div className="flex flex-col gap-6">
            {unit.topics.map((t, i) => {
              const isDone = revised.includes(`${unit.code}/${t.id}`);
              return (
                <Reveal key={t.id} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="flex items-start gap-4 sm:gap-6">
                    <motion.span
                      className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[16px] font-bold text-white sm:h-14 sm:w-14 sm:text-[18px]"
                      style={{
                        background: isDone ? "#12B886" : main,
                        boxShadow: `0 4px 0 ${isDone ? "#0ca678" : shade(main)}`,
                        transform: `rotate(${i % 2 ? 3 : -3}deg)`,
                      }}
                    >
                      {isDone ? <Check className="h-6 w-6" strokeWidth={3} /> : i + 1}
                    </motion.span>

                    <motion.button
                      type="button"
                      onClick={() => onOpenTopic(t.id)}
                      aria-label={`Open ${t.label}: ${t.title}`}
                      whileHover={{ y: -5, rotate: 0 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="group min-w-0 flex-1 cursor-pointer rounded-[26px] bg-paper p-5 text-left puff sm:p-6"
                      style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip main={main}>{t.label}</Chip>
                        <Chip>
                          <Clock className="h-3 w-3" /> {t.minutes} min
                        </Chip>
                        <span className="hidden font-mono text-[10.5px] font-semibold tracking-wide text-ink-faint sm:inline">
                          {t.ao.join(" · ")}
                        </span>
                        {isDone && (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-[11.5px] font-extrabold text-mint">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} /> sticker!
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2.5 font-display text-[21px] leading-snug font-semibold text-ink transition-colors group-hover:text-current">
                        {t.title}
                      </h3>
                      <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-[1.7] text-ink-soft">
                        {t.summary}
                      </p>
                    </motion.button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— flame trivia ————— */}
      <Reveal className="mt-14">
        <div
          className="relative overflow-hidden rounded-[32px] p-6 sm:p-8"
          style={{ background: tint(main, 10) }}
        >
          <DoodleHex className="absolute top-5 right-6 h-10 w-10 opacity-25" />
          <div className="flex flex-wrap items-center gap-6">
            <Float>
              <span
                className="grid h-24 w-24 place-items-center rounded-[28px] bg-paper font-display text-[44px] font-bold puff"
                style={{ color: main }}
              >
                {unit.element.symbol}
              </span>
            </Float>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-display text-[12px] font-bold tracking-[0.18em] uppercase" style={{ color: shade(main, 62) }}>
                <Flame className="h-4 w-4" /> the flame behind the flavour
              </div>
              <p className="mt-2 text-[15px] leading-[1.75] text-ink-soft">
                <strong className="font-extrabold text-ink capitalize">
                  {unit.element.name}
                </strong>{" "}
                burns {unit.element.flameName} at{" "}
                <strong className="font-extrabold text-ink">{unit.element.nm} nm</strong> —
                that is the real colour your unit flavour is based on.{" "}
                {unit.spectrumNote && <Fmt text={unit.spectrumNote} />}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ————— prev / next ————— */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {prev ? (
          <motion.button
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
              <span className="block text-[11px] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                previous flavour
              </span>
              <span className="block truncate font-display text-[15px] font-semibold text-ink">
                {prev.code} · {prev.candy.nick}
              </span>
            </span>
          </motion.button>
        ) : (
          <span aria-hidden />
        )}
        {next && (
          <motion.button
            type="button"
            onClick={() => onOpenUnit(next.code)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center justify-end gap-3 rounded-full px-5 py-4 text-right text-white sm:col-start-2"
            style={{ background: next.candy.main, boxShadow: `0 4px 0 ${shade(next.candy.main)}` }}
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-extrabold tracking-[0.14em] text-white/70 uppercase">
                next flavour
              </span>
              <span className="block truncate font-display text-[15px] font-semibold">
                {next.code} · {next.candy.nick}
              </span>
            </span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20">
              <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
