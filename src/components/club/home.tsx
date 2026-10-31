"use client";

import { motion } from "framer-motion";
import {
  Atom,
  ClipboardCheck,
  Clock,
  Flame,
  Gamepad2,
  Gauge,
  ListChecks,
  MoveRight,
  NotebookPen,
  Palette,
  PencilRuler,
  Play,
  Sticker,
  TestTubes,
} from "lucide-react";
import type { Unit } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import {
  BeakerMeter,
  Blob,
  CandyButton,
  Chip,
  DoodleAtom,
  DoodleHex,
  DoodleMolecule,
  DoodlePlus,
  DoodleSparkle,
  Float,
  Mascot,
  PopIn,
  Reveal,
  SectionTag,
  SoftButton,
  Squiggle,
  tint,
  shade,
} from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · home — welcome to the playground
   ═══════════════════════════════════════════════════════════════ */

const UNIT_ICONS = {
  WCH11: Atom,
  WCH12: Flame,
  WCH13: TestTubes,
  WCH14: Gauge,
  WCH15: Palette,
  WCH16: ClipboardCheck,
} as const;

const MARQUEE_A = [
  "ENTHALPY",
  "HESS'S LAW",
  "TITRATIONS",
  "CHIRALITY",
  "BUFFER SOLUTIONS",
  "FLAME TESTS",
  "MOLE MATHS",
  "EQUILIBRIA",
];

const MARQUEE_B = [
  "CURLY ARROWS",
  "ENTROPY",
  "TRANSITION METALS",
  "ELECTRODE POTENTIALS",
  "HALOGENOALKANES",
  "CARBONYLS",
  "Kp & Kc",
  "RECRYSTALLISATION",
];

export function Home({ units, onOpenUnit }: { units: Unit[]; onOpenUnit: (code: string) => void }) {
  const hours = Math.round(TOTALS.minutes / 60);
  const revised = useRevised();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div>
      {/* ————— hero ————— */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pt-36 lg:pb-24">
          {/* left: words */}
          <div className="relative z-10">
            <PopIn>
              <SectionTag main="#12B886" tilt={-2}>
                Pearson Edexcel IAL · Chemistry · 2018 spec
              </SectionTag>
            </PopIn>

            <PopIn delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.7rem,6.4vw,4.6rem)] leading-[1.04] font-semibold tracking-tight text-ink">
                Chemistry that{" "}
                <span className="relative inline-block">
                  actually
                  <Squiggle
                    color="#FF6B6B"
                    className="absolute -bottom-2 left-0 h-[12px] w-full"
                  />
                </span>{" "}
                <span className="relative inline-block -rotate-2 rounded-[0.35em] bg-lemon/60 px-[0.18em]">
                  sticks.
                </span>
              </h1>
            </PopIn>

            <PopIn delay={0.16}>
              <p className="mt-6 max-w-[54ch] text-[16.5px] leading-[1.8] text-ink-soft">
                Welcome to <strong className="font-extrabold text-ink">Reaction Club</strong> —
                Edexcel IAL Chemistry (WCH11–WCH16) rebuilt as a playground. Candy-coloured
                units, quizzes that high-five back, worked examples you climb like stairs, and
                progress you can literally sip. Zero boring tables. Zero yawns.
              </p>
            </PopIn>

            <PopIn delay={0.24} className="mt-8 flex flex-wrap items-center gap-3.5">
              <CandyButton main="#FF6B6B" onClick={() => scrollTo("units")}>
                Join the club <MoveRight className="h-5 w-5" />
              </CandyButton>
              <SoftButton onClick={() => onOpenUnit("WCH12")}>
                <Play className="h-4 w-4 text-coral" /> Peek inside WCH12
              </SoftButton>
            </PopIn>

            <PopIn delay={0.32} className="mt-9 flex flex-wrap gap-2.5">
              {[
                { icon: Atom, label: `${units.length} units` },
                { icon: ListChecks, label: `${TOTALS.topics} topics` },
                { icon: Clock, label: `≈${hours} h of reading` },
                { icon: PencilRuler, label: `${TOTALS.examples} worked stairs` },
                { icon: Gamepad2, label: `${TOTALS.checks} checkpoint Qs` },
              ].map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-[13px] font-extrabold text-ink puff"
                >
                  <s.icon className="h-4 w-4 text-coral" strokeWidth={2.5} />
                  {s.label}
                </span>
              ))}
            </PopIn>
          </div>

          {/* right: mascot scene */}
          <div className="relative mx-auto flex h-[340px] w-full max-w-[440px] items-center justify-center sm:h-[420px]">
            <Blob color={tint("#FF6B6B", 18)} className="h-[86%] w-[86%]" />
            <Blob
              color={tint("#FFD43B", 30)}
              className="top-[2%] right-[2%] h-[34%] w-[34%] opacity-80"
              style={{ animationDuration: "9s" }}
            />

            <Float>
              <Mascot main="#FF6B6B" size={280} boop onBoop={() => {}} className="relative z-10" />
            </Float>

            <Float delay={0.8} className="absolute top-[8%] left-[4%] z-20">
              <span className="inline-block rotate-[-7deg] rounded-full bg-paper px-4 py-2 font-display text-[13px] font-bold text-ink puff">
                spec-mapped 2018
              </span>
            </Float>
            <Float delay={1.6} slow className="absolute right-[2%] bottom-[14%] z-20">
              <span
                className="inline-block rotate-[6deg] rounded-full px-4 py-2 font-display text-[13px] font-bold text-white puff"
                style={{ background: "#9775FA" }}
              >
                0% boring
              </span>
            </Float>

            <DoodleAtom className="animate-float-slow absolute top-[6%] right-[12%] h-12 w-12 text-coral/50" />
            <DoodleHex className="animate-float absolute bottom-[6%] left-[8%] h-11 w-11 text-grape/40" />
            <DoodleMolecule className="animate-float absolute top-[42%] right-[0%] h-10 w-14 text-mint/50" />
          </div>
        </div>
      </section>

      {/* ————— marquee ribbons ————— */}
      <section aria-hidden className="relative z-10 -my-2 overflow-x-clip py-8">
        <Ribbon words={MARQUEE_A} bg="#FF6B6B" rotate={-1.6} />
        <Ribbon words={MARQUEE_B} bg="#2E2016" rotate={1.2} reverse className="-mt-7" />
      </section>

      {/* ————— pick your flavour ————— */}
      <section id="units" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-20 pb-6 sm:px-8">
        <Reveal className="text-center">
          <SectionTag main="#FF922B" tilt={2}>
            pick your flavour
          </SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight font-semibold text-ink">
            Six units. Six flavours.
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
            Every unit gets its own colour, nickname and beaker to fill. Tap one to hit the
            trail — the sticker book remembers what you have revised.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {units.map((u, i) => {
            const Icon = UNIT_ICONS[u.code];
            const done = revised.filter((k) => k.startsWith(`${u.code}/`)).length;
            const pct = u.topics.length ? done / u.topics.length : 0;
            const minutes = u.topics.reduce((m, t) => m + t.minutes, 0);
            const tilt = [-1.6, 1.2, -0.9, 1.5, -1.2, 0.9][i % 6];
            return (
              <Reveal key={u.code} delay={i * 0.06}>
                <motion.button
                  type="button"
                  onClick={() => onOpenUnit(u.code)}
                  aria-label={`Open ${u.code} — ${u.title}`}
                  whileHover={{ y: -8, rotate: 0, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-[32px] bg-paper p-6 text-left puff"
                  style={{ transform: `rotate(${tilt}deg)` }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-4 right-3 font-display text-[92px] leading-none font-bold text-ink/[0.05] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-[18px]"
                      style={{ background: tint(u.candy.main, 15) }}
                    >
                      <Icon className="h-6 w-6" style={{ color: shade(u.candy.main, 62) }} />
                    </span>
                    <div>
                      <div
                        className="font-display text-[13px] font-bold tracking-[0.14em]"
                        style={{ color: u.candy.main }}
                      >
                        {u.code}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-ink-faint">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: u.candy.main }}
                        />
                        {u.candy.name}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-[23px] leading-tight font-semibold text-ink">
                    {u.candy.nick}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-snug font-extrabold text-ink-soft">
                    {u.title}
                  </p>
                  <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
                    {u.blurb}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Chip main={u.candy.main}>
                        {u.topics.length} stops
                      </Chip>
                      <Chip>
                        <Clock className="h-3 w-3" /> {minutes} min
                      </Chip>
                    </div>
                    <div className="flex items-end gap-2">
                      <BeakerMeter pct={pct} main={u.candy.main} size={40} />
                      <span
                        className="grid h-9 w-9 place-items-center rounded-full transition-transform group-hover:translate-x-1"
                        style={{ background: tint(u.candy.main, 15), color: shade(u.candy.main, 62) }}
                      >
                        <MoveRight className="h-4.5 w-4.5" strokeWidth={2.5} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ————— how the club works ————— */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="text-center">
          <SectionTag main="#9775FA" tilt={-1.5}>
            how the club works
          </SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold text-ink">
            Revision that plays like a game
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {[
            {
              n: "1",
              color: "#FF6B6B",
              icon: NotebookPen,
              title: "Read sticky-sweet notes",
              body: "Definitions as word-wall stickers, equations as candy pills, calculations as staircases you climb one step at a time — chunked and coloured, never a wall of text.",
            },
            {
              n: "2",
              color: "#FF922B",
              icon: Gamepad2,
              title: "Play the checkpoints",
              body: "Every topic ends with quick-fire checks. Reveal answers with a tap, feel the wiggle when you were right, and lock the idea in before moving on.",
            },
            {
              n: "3",
              color: "#9775FA",
              icon: Sticker,
              title: "Fill your sticker book",
              body: "Mark a topic done and watch that unit's beaker fill up. Collect all six flavours and the whole A level is in your jar. Effort still required — sorry.",
            },
          ].map((s, i) => (
            <div key={s.n} className="contents">
              <Reveal delay={i * 0.1} className="h-full">
                <div
                  className={`h-full rounded-[30px] bg-paper p-6 puff ${i % 2 ? "rotate-[0.8deg]" : "rotate-[-0.8deg]"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-full font-display text-[20px] font-bold text-white"
                      style={{ background: s.color, boxShadow: `0 4px 0 ${shade(s.color)}` }}
                    >
                      {s.n}
                    </span>
                    <s.icon className="h-6 w-6" style={{ color: s.color }} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 font-display text-[20px] font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.75] text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
              {i < 2 && (
                <Reveal delay={i * 0.1 + 0.05} className="hidden items-center self-center lg:flex">
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="grid h-12 w-12 place-items-center rounded-full bg-lemon/25 text-lemon"
                  >
                    <MoveRight className="h-6 w-6" strokeWidth={2.5} />
                  </motion.span>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ————— CTA band ————— */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[44px] bg-cocoa px-7 py-12 text-center sm:px-12 sm:py-16">
            <Blob color="rgba(255,107,107,0.16)" className="top-[-30%] left-[-10%] h-[70%] w-[45%]" />
            <Blob
              color="rgba(151,117,250,0.16)"
              className="right-[-12%] bottom-[-35%] h-[75%] w-[45%]"
              style={{ animationDuration: "15s" }}
            />
            <DoodlePlus className="absolute top-8 left-[12%] h-6 w-6 text-cream/25" />
            <DoodleSparkle className="absolute right-[16%] bottom-10 h-7 w-7 text-lemon/50" />

            <div className="relative z-10 mx-auto max-w-xl">
              <Float slow className="mx-auto w-fit">
                <Mascot main="#FFD43B" mood="cheer" size={150} bubbles={false} className="mx-auto" />
              </Float>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold text-cream">
                Ready when you are.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-cream/70">
                Pick a flavour, hit the trail, and let the beaker fill itself — one revised
                topic at a time.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <CandyButton main="#FFD43B" onClick={() => scrollTo("units")}>
                  Back to the flavours <MoveRight className="h-5 w-5" />
                </CandyButton>
                <SoftButton onClick={() => onOpenUnit("WCH11")}>
                  Start from the top <DoodleSparkle className="h-4 w-4 text-lemon" />
                </SoftButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ————— marquee ribbon ————— */

function Ribbon({
  words,
  bg,
  rotate,
  reverse = false,
  className,
}: {
  words: string[];
  bg: string;
  rotate: number;
  reverse?: boolean;
  className?: string;
}) {
  const list = [...words, ...words];
  return (
    <div
      className={`relative -mx-[4%] w-[108%] ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="overflow-hidden py-3" style={{ background: bg }}>
        <div
          className="animate-marquee flex w-max items-center gap-10"
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {list.map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-[15px] font-bold tracking-[0.22em] whitespace-nowrap text-white uppercase"
            >
              {w}
              <DoodleSparkle className="h-4 w-4 shrink-0 text-white/80" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
