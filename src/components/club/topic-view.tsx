"use client";

import { useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, PartyPopper, Sticker } from "./icons";
import type { Topic, Unit } from "@/lib/spectra/types";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { TopicBlocks } from "./blocks";
import { Fmt } from "./format";
import {
  Chip,
  Confetti,
  PopIn,
  Reveal,
  SoftButton,
  Squiggle,
  shade,
} from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · topic reader — one stop on the trail
   ═══════════════════════════════════════════════════════════════ */

export function TopicView({
  unit,
  topic,
  onBack,
  onOpenTopic,
  onOpenNotes,
  notesSpecRange,
}: {
  unit: Unit;
  topic: Topic;
  onBack: () => void;
  onOpenTopic: (topicId: string) => void;
  onOpenNotes?: () => void;
  /* "2.1 → 2.18" — the spec points the full note covers, from the doc itself */
  notesSpecRange?: string;
}) {
  const revised = useRevised();
  const time = useTimeData();
  const key = `${unit.code}/${topic.id}`;
  const isRevised = revised.includes(key);
  const spent = topicSeconds(time, key);
  const [fire, setFire] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const idx = unit.topics.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? unit.topics[idx - 1] : undefined;
  const next = idx < unit.topics.length - 1 ? unit.topics[idx + 1] : undefined;
  const main = unit.candy.main;

  const collect = () => {
    if (!isRevised) setFire((f) => f + 1);
    toggleRevised(key);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8" style={{ paddingTop: "calc(6rem + var(--sa-top))" }}>
      {/* reading progress — a candy strip filling up top */}
      <m.div
        aria-hidden
        className="fixed left-0 z-[70] h-[calc(7px*var(--ui-scale))] w-full origin-left rounded-r-full"
        style={{
          top: "var(--sa-top)",
          scaleX,
          background: `linear-gradient(90deg, ${main}, #FFD43B)`,
        }}
      />

      <PopIn>
        <SoftButton
          onClick={onBack}
          className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
          ariaLabel={`Back to ${unit.code}`}
        >
          <ArrowLeft className="h-4 w-4" /> Back to {unit.code}
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-8">
        <PopIn delay={0.05} className="flex flex-wrap items-center gap-2">
          <Chip main={main}>{topic.label}</Chip>
          <Chip>{topic.minutes} min read</Chip>
          <Chip>{topic.ao.join(" · ")}</Chip>
          {spent >= 60 && (
            <Chip>
              <Clock className="h-3 w-3" /> {fmtClock(spent)} of yours
            </Chip>
          )}
        </PopIn>

        <PopIn delay={0.1}>
          <h1 className="mt-5 font-display text-[clamp(2rem,4.6vw,3rem)] leading-[1.08] font-semibold tracking-tight text-ink">
            {topic.title}
          </h1>
          <p className="mt-3.5 max-w-[60ch] text-[calc(16.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
            {topic.summary}
          </p>
        </PopIn>

        <Squiggle color={main} className="mt-8 h-3.5 w-full opacity-60" />
      </header>

      {/* ————— full revision note CTA ————— */}
      {onOpenNotes && (
        <Reveal className="mt-8">
          <m.button
            type="button"
            onClick={onOpenNotes}
            whileHover={{ y: -4, rotate: -0.4 }}
            whileTap={{ scale: 0.97 }}
            className="group flex w-full cursor-pointer items-center gap-4 rounded-[calc(28px*var(--ui-scale))] p-5 text-left sm:p-6"
            style={{ background: main, boxShadow: `0 6px 0 ${shade(main)}` }}
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[calc(20px*var(--ui-scale))] bg-white/20">
              <BookOpen className="h-7 w-7 text-white" strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[calc(18px*var(--ui-scale))] font-semibold text-white">
                The full revision note — spec by spec
              </span>
              <span className="mt-1 block text-[calc(13.5px*var(--ui-scale))] leading-[1.6] font-bold text-white/80">
                The complete class note, cut into one section per specification
                point{notesSpecRange ? ` (${notesSpecRange})` : ""} — the official wording above
                each, and every calculation worked in full.
              </span>
            </span>
            <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1 sm:grid">
              <ArrowRight className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
          </m.button>
        </Reveal>
      )}

      {/* ————— content ————— */}
      <div className="mt-10">
        <TopicBlocks blocks={topic.blocks} main={main} />
      </div>

      {/* ————— mark as revised ————— */}
      <Reveal className="relative mt-14 flex justify-center">
        <div className="relative">
          <Confetti fire={fire} />
          <m.button
            type="button"
            onClick={collect}
            aria-pressed={isRevised}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 15 }}
            className="inline-flex min-h-[calc(56px*var(--ui-scale))] cursor-pointer items-center gap-3 rounded-full px-7 py-4 font-display text-[calc(16px*var(--ui-scale))] font-semibold"
            style={
              isRevised
                ? {
                    background: main,
                    color: "#fff",
                    boxShadow: `0 5px 0 ${shade(main)}`,
                    transform: "rotate(-1.5deg)",
                  }
                : {
                    background: "var(--color-paper)",
                    color: "var(--color-ink)",
                    boxShadow: "0 5px 0 color-mix(in oklab, var(--color-ink) 10%, transparent)",
                  }
            }
          >
            {isRevised ? (
              <>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25">
                  <Check className="h-4.5 w-4.5" strokeWidth={3} />
                </span>
                Marked as revised
              </>
            ) : (
              <>
                <Sticker className="h-5.5 w-5.5" style={{ color: main }} />
                Mark as revised
              </>
            )}
          </m.button>
        </div>
      </Reveal>
      <p className="mt-3 text-center text-[calc(12.5px*var(--ui-scale))] font-bold text-ink-faint">
        {isRevised
          ? "Saved in this browser. Tap again to unmark it."
          : "One tap marks it done — progress is saved in this browser."}
      </p>

      {/* ————— prev / next ————— */}
      <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Topic navigation">
        {prev ? (
          <m.button
            type="button"
            onClick={() => onOpenTopic(prev.id)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-paper px-5 py-4 text-left puff"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-soft">
              <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
            <span className="min-w-0">
              <span className="block text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                previous · {prev.label}
              </span>
              <span className="block truncate font-display text-[calc(15px*var(--ui-scale))] font-semibold text-ink">
                {prev.title}
              </span>
            </span>
          </m.button>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
        {next ? (
          <m.button
            type="button"
            onClick={() => onOpenTopic(next.id)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center justify-end gap-3 rounded-full px-5 py-4 text-right text-white sm:col-start-2"
            style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
          >
            <span className="min-w-0">
              <span className="block text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-white/70 uppercase">
                next · {next.label}
              </span>
              <span className="block truncate font-display text-[calc(15px*var(--ui-scale))] font-semibold">
                {next.title}
              </span>
            </span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20">
              <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
          </m.button>
        ) : (
          <m.button
            type="button"
            onClick={onBack}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center justify-end gap-3 rounded-full px-5 py-4 text-right text-white sm:col-start-2"
            style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
          >
            <span className="min-w-0">
              <span className="block text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-white/70 uppercase">
                end of unit
              </span>
              <span className="block truncate font-display text-[calc(15px*var(--ui-scale))] font-semibold">
                Back to {unit.code}
              </span>
            </span>
            <PartyPopper className="h-5 w-5 shrink-0" />
          </m.button>
        )}
      </nav>

      <p className="mt-10 text-center text-[calc(12px*var(--ui-scale))] leading-relaxed font-bold text-ink-faint">
        <Fmt
          text={`==${unit.code}== · ${unit.title} · written to the 2018 specification`}
        />
      </p>
    </div>
  );
}
