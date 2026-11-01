"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import {
  Atom,
  ChevronDown,
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
   Reaction Club · home — a scroll-driven playground
   1. candy scroll-progress bar   2. parallax hero exit
   3. velocity-reactive ribbons   4. sticky stacking deck
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

const CARD_TILT = [-1.1, 0.9, -0.8, 1.1];

export function Home({
  units,
  onOpenUnit,
  onOpenBlend,
  onOpenSticker,
}: {
  units: Unit[];
  onOpenUnit: (code: string) => void;
  onOpenBlend: () => void;
  onOpenSticker: () => void;
}) {
  const hours = Math.round(TOTALS.minutes / 60);
  const revised = useRevised();
  const reduce = useReducedMotion();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* — page progress bar (candy gradient + sparkle tip) — */
  const { scrollYProgress } = useScroll();
  const barScale = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.4 });
  const barPct = useTransform(barScale, [0, 1], [0, 100]);
  const barTipX = useMotionTemplate`${barPct}vw`;

  /* ————— render ————— */
  return (
    <div>
      {/* candy scroll progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[5px] origin-left rounded-r-full"
        style={{
          scaleX: barScale,
          background:
            "linear-gradient(90deg,#FF6B6B,#FF922B,#FFD43B,#12B886,#9775FA,#F06595)",
        }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none fixed top-[-4px] left-0 z-[60] block"
        style={{ x: barTipX }}
      >
        <DoodleSparkle className="h-3.5 w-3.5 -translate-x-1/2 text-lemon drop-shadow-[0_1px_0_rgba(61,43,31,0.35)]" />
      </motion.span>

      <Hero
        units={units}
        hours={hours}
        reduce={!!reduce}
        onJoin={() => scrollTo("units")}
        onPeek={() => onOpenUnit("WCH12")}
      />

      {/* ————— velocity ribbons ————— */}
      <Ribbons reduce={!!reduce} />

      {/* ————— the sticky stack deck ————— */}
      <span id="units" aria-hidden className="block h-0" />

      <StackDeck reduce={!!reduce}>
        {/* card 1 · the flavours */}
        <Card>
          <div className="relative z-10 flex h-full flex-col justify-center">
            <DoodleSparkle className="absolute top-7 right-8 h-6 w-6 text-coral/40" />
            <DoodleHex className="absolute bottom-8 left-7 h-9 w-9 text-lemon/30" />
            <div className="text-center">
              <Reveal y={18}>
                <SectionTag main="#FF6B6B" tilt={-2}>
                  pick your flavour
                </SectionTag>
              </Reveal>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.7rem)] leading-tight font-semibold text-ink">
                <WordsReveal text="Six units. Six flavours." />
              </h2>
              <p className="mt-2 hidden text-[15px] font-semibold text-ink-soft sm:block">
                Tap one to hit the trail — the sticker book keeps score.
              </p>
            </div>

            <div className="mx-auto mt-5 grid w-full max-w-4xl grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {units.map((u, i) => {
                const Icon = UNIT_ICONS[u.code];
                const done = revised.filter((k) => k.startsWith(`${u.code}/`)).length;
                const pct = u.topics.length ? done / u.topics.length : 0;
                const minutes = u.topics.reduce((m, t) => m + t.minutes, 0);
                const tilt = [-1.4, 1.1, -0.8, 1.3, -1, 0.8][i % 6];
                return (
                  <Reveal key={u.code} delay={0.06 * i} y={22}>
                    <motion.button
                      type="button"
                      onClick={() => onOpenUnit(u.code)}
                      aria-label={`Open ${u.code} — ${u.title}`}
                      style={{ rotate: tilt }}
                      whileHover={{ y: -5, rotate: 0, scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 320, damping: 17 }}
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-[26px] bg-paper p-2.5 pr-3 text-left puff sm:p-3"
                    >
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] sm:h-11 sm:w-11 sm:rounded-[16px]"
                        style={{ background: tint(u.candy.main, 15) }}
                      >
                        <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" style={{ color: shade(u.candy.main, 62) }} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block font-display text-[10.5px] font-bold tracking-[0.16em]"
                          style={{ color: u.candy.main }}
                        >
                          {u.code}
                        </span>
                        <span className="block truncate font-display text-[15.5px] leading-tight font-semibold text-ink">
                          {u.candy.nick}
                        </span>
                        <span className="hidden text-[11px] font-extrabold text-ink-faint sm:block">
                          {u.topics.length} stops · {minutes} min
                        </span>
                      </span>
                      <span className="hidden shrink-0 sm:block">
                        <BeakerMeter pct={pct} main={u.candy.main} size={26} />
                      </span>
                      <MoveRight
                        className="hidden h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink-soft sm:block"
                        strokeWidth={2.5}
                      />
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Card>

        {/* card 2 · how the club works */}
        <Card>
          <div className="relative z-10 flex h-full flex-col justify-center">
            <DoodleAtom className="absolute top-8 left-8 h-10 w-10 text-grape/30" />
            <DoodlePlus className="absolute right-10 bottom-9 h-5 w-5 text-bubble/40" />
            <div className="text-center">
              <Reveal y={18}>
                <SectionTag main="#9775FA" tilt={2}>
                  how the club works
                </SectionTag>
              </Reveal>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.7rem)] leading-tight font-semibold text-ink">
                <WordsReveal text="Revision that plays like a game." />
              </h2>
            </div>

            <div className="mx-auto mt-6 grid w-full max-w-5xl gap-3 sm:mt-9 sm:gap-5 lg:grid-cols-3">
              {[
                {
                  n: "1",
                  color: "#FF6B6B",
                  icon: NotebookPen,
                  title: "Read sticky-sweet notes",
                  body: "Definitions as word-wall stickers, equations as candy pills, calculations as staircases — chunked and coloured, never a wall of text.",
                },
                {
                  n: "2",
                  color: "#FF922B",
                  icon: Gamepad2,
                  title: "Play the checkpoints",
                  body: "Quick-fire checks end every topic. Tap to reveal, feel the wiggle when you're right, lock it in before moving on.",
                },
                {
                  n: "3",
                  color: "#9775FA",
                  icon: Sticker,
                  title: "Fill your sticker book",
                  body: "Mark a topic done and its beaker fills. Collect all six flavours and the whole A level sits in your jar.",
                },
              ].map((s, i) => (
                <Reveal key={s.n} delay={0.08 * i} y={26} className="h-full">
                  <div
                    className={`flex h-full items-start gap-3 rounded-[24px] bg-paper p-3.5 puff sm:gap-4 sm:p-5 lg:block lg:p-6 ${i % 2 ? "lg:rotate-[0.7deg]" : "lg:rotate-[-0.7deg]"}`}
                  >
                    <div className="flex shrink-0 items-center lg:mb-4">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-full font-display text-[16px] font-bold text-white sm:h-12 sm:w-12 sm:text-[20px]"
                        style={{ background: s.color, boxShadow: `0 4px 0 ${shade(s.color)}` }}
                      >
                        {s.n}
                      </span>
                      <s.icon
                        className="hidden h-6 w-6 lg:ml-3 lg:block"
                        style={{ color: s.color }}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-[15.5px] font-semibold text-ink sm:text-[17px] lg:text-[20px]">
                          {s.title}
                        </h3>
                        <s.icon
                          className="h-4 w-4 shrink-0 lg:hidden"
                          style={{ color: s.color }}
                          strokeWidth={2.4}
                        />
                      </div>
                      <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.6] text-ink-soft sm:text-[13.5px] sm:leading-[1.7] lg:mt-2 lg:line-clamp-none lg:text-[14.5px]">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Card>

        {/* card 3 · the arcade */}
        <Card>
          <div className="relative z-10 flex h-full flex-col justify-center">
            <DoodleMolecule className="absolute top-9 right-9 h-9 w-12 text-bubble/30" />
            <div className="text-center">
              <Reveal y={18}>
                <SectionTag main="#F06595" tilt={-1.5}>
                  the arcade
                </SectionTag>
              </Reveal>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.7rem)] leading-tight font-semibold text-ink">
                <WordsReveal text="Not feeling like reading?" />
              </h2>
            </div>

            <div className="mx-auto mt-6 grid w-full max-w-5xl gap-3 sm:mt-9 sm:gap-5 md:grid-cols-2">
              <Reveal delay={0.05} y={26}>
                <motion.button
                  type="button"
                  onClick={onOpenBlend}
                  whileHover={{ y: -6, rotate: 0, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[32px] p-5 text-left puff sm:p-7"
                  style={{ background: tint("#9775FA", 10), rotate: -1 }}
                >
                  <Blob color={tint("#9775FA", 22)} className="top-[-35%] right-[-12%] h-[70%] w-[50%]" />
                  <div className="relative z-10">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-[20px] text-white sm:h-14 sm:w-14"
                      style={{ background: "#9775FA", boxShadow: `0 5px 0 ${shade("#9775FA")}` }}
                    >
                      <Gamepad2 className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-3 font-display text-[21px] font-semibold text-ink sm:mt-4 sm:text-[25px]">
                      Blend Mode
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-[1.7] text-ink-soft sm:mt-2 sm:line-clamp-none sm:text-[14.5px]">
                      Every checkpoint question on the site, shuffled into a flashcard blender.
                      Flip, judge yourself, chase streaks.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-grape sm:mt-4 sm:text-[14px]">
                      play{" "}
                      <MoveRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-4.5 sm:w-4.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </motion.button>
              </Reveal>

              <Reveal delay={0.12} y={26}>
                <motion.button
                  type="button"
                  onClick={onOpenSticker}
                  whileHover={{ y: -6, rotate: 0, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[32px] p-5 text-left puff sm:p-7"
                  style={{ background: tint("#12B886", 10), rotate: 1 }}
                >
                  <Blob color={tint("#12B886", 22)} className="bottom-[-35%] left-[-12%] h-[70%] w-[50%]" />
                  <div className="relative z-10">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-[20px] text-white sm:h-14 sm:w-14"
                      style={{ background: "#12B886", boxShadow: `0 5px 0 ${shade("#12B886")}` }}
                    >
                      <Sticker className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-3 font-display text-[21px] font-semibold text-ink sm:mt-4 sm:text-[25px]">
                      The Sticker Book
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-[1.7] text-ink-soft sm:mt-2 sm:line-clamp-none sm:text-[14.5px]">
                      Your jar, your sheets, your badges — currently {revised.length}/
                      {TOTALS.topics} collected.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-mint sm:mt-4 sm:text-[14px]">
                      open{" "}
                      <MoveRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-4.5 sm:w-4.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </motion.button>
              </Reveal>
            </div>
          </div>
        </Card>

        {/* card 4 · last call */}
        <Card>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <Blob color="rgba(255,107,107,0.16)" className="top-[-30%] left-[-10%] h-[70%] w-[45%]" />
            <Blob
              color="rgba(151,117,250,0.16)"
              className="right-[-12%] bottom-[-35%] h-[75%] w-[45%]"
              style={{ animationDuration: "15s" }}
            />
            <DoodlePlus className="absolute top-9 left-[12%] h-5 w-5 text-cream/25" />
            <DoodleSparkle className="absolute right-[16%] bottom-10 h-6 w-6 text-lemon/50" />

            <Float slow>
              <Mascot main="#FFD43B" mood="cheer" size={118} bubbles={false} className="mx-auto" />
            </Float>
            <h2 className="mt-1 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-semibold text-cream">
              <WordsReveal text="Ready when you are." />
            </h2>
            <p className="mx-auto mt-2.5 max-w-[44ch] text-[14.5px] leading-relaxed text-cream/70 sm:mt-3 sm:text-[15.5px]">
              Pick a flavour, hit the trail, and let the beaker fill itself — one revised
              topic at a time.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <CandyButton main="#FFD43B" onClick={() => scrollTo("units")}>
                Back to the flavours <MoveRight className="h-5 w-5" />
              </CandyButton>
              <SoftButton onClick={() => onOpenUnit("WCH11")}>
                Start from the top <DoodleSparkle className="h-4 w-4 text-lemon" />
              </SoftButton>
            </div>
          </div>
        </Card>
      </StackDeck>
    </div>
  );
}

/* a thin semantic label for each deck card */
function Card({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/* ═══════════════════════════════════════════════════════════════
   Hero — layered parallax exit
   ═══════════════════════════════════════════════════════════════ */

function Hero({
  units,
  hours,
  reduce,
  onJoin,
  onPeek,
}: {
  units: Unit[];
  hours: number;
  reduce: boolean;
  onJoin: () => void;
  onPeek: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const z = (a: number, b: number) => (reduce ? [0, 0] : [a, b]);

  const tagY = useTransform(scrollYProgress, [0, 1], z(0, -70));
  const titleY = useTransform(scrollYProgress, [0, 1], z(0, -165));
  const titleR = useTransform(scrollYProgress, [0, 1], z(0, -1.6));
  const bodyY = useTransform(scrollYProgress, [0, 1], z(0, -100));
  const ctaY = useTransform(scrollYProgress, [0, 1], z(0, -55));
  const chipsY = useTransform(scrollYProgress, [0, 1], z(0, -26));
  const chipsO = useTransform(scrollYProgress, [0, reduce ? 0 : 0.62], [1, reduce ? 1 : 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], z(0, 84));
  const sceneO = useTransform(scrollYProgress, [0, reduce ? 0 : 0.88], [1, reduce ? 1 : 0.1]);
  const mascotR = useTransform(scrollYProgress, [0, 1], z(0, 8));
  const cueO = useTransform(scrollYProgress, [0, reduce ? 0 : 0.16], [1, reduce ? 1 : 0]);
  const cueY = useTransform(scrollYProgress, [0, 1], z(0, 42));

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-28 pb-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pt-36 lg:pb-28">
        {/* left: words — each block exits at its own speed */}
        <motion.div className="relative z-10" style={{ y: tagY, opacity: sceneO }}>
          <PopIn>
            <SectionTag main="#12B886" tilt={-2}>
              Pearson Edexcel IAL · Chemistry · 2018 spec
            </SectionTag>
          </PopIn>

          <PopIn delay={0.08}>
            <motion.h1
              className="mt-6 font-display text-[clamp(2.7rem,6.4vw,4.6rem)] leading-[1.04] font-semibold tracking-tight text-ink"
              style={{ y: titleY, rotate: titleR }}
            >
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
            </motion.h1>
          </PopIn>

          <PopIn delay={0.16}>
            <motion.p
              className="mt-6 max-w-[54ch] text-[16.5px] leading-[1.8] text-ink-soft"
              style={{ y: bodyY }}
            >
              Welcome to <strong className="font-extrabold text-ink">Reaction Club</strong> —
              Edexcel IAL Chemistry (WCH11–WCH16) rebuilt as a playground. Candy-coloured
              units, quizzes that high-five back, worked examples you climb like stairs, and
              progress you can literally sip. Zero boring tables. Zero yawns.
            </motion.p>
          </PopIn>

          <PopIn delay={0.24} className="mt-8 flex flex-wrap items-center gap-3.5">
            <motion.div className="flex flex-wrap items-center gap-3.5" style={{ y: ctaY }}>
              <CandyButton main="#FF6B6B" onClick={onJoin}>
                Join the club <MoveRight className="h-5 w-5" />
              </CandyButton>
              <SoftButton onClick={onPeek}>
                <Play className="h-4 w-4 text-coral" /> Peek inside WCH12
              </SoftButton>
            </motion.div>
          </PopIn>

          <PopIn delay={0.32} className="mt-9">
            <motion.div className="flex flex-wrap gap-2.5" style={{ y: chipsY, opacity: chipsO }}>
              {[
                { icon: Atom, label: `${units.length} units`, count: units.length },
                { icon: ListChecks, label: "topics", count: TOTALS.topics },
                { icon: Clock, label: "h of reading", count: hours, approx: true },
                { icon: PencilRuler, label: "worked stairs", count: TOTALS.examples },
                { icon: Gamepad2, label: "checkpoint Qs", count: TOTALS.checks },
              ].map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-[13px] font-extrabold text-ink puff"
                >
                  <s.icon className="h-4 w-4 text-coral" strokeWidth={2.5} />
                  {s.approx ? "≈" : ""}
                  <CountUp to={s.count} /> {s.label}
                </span>
              ))}
            </motion.div>
          </PopIn>
        </motion.div>

        {/* right: mascot scene — lags behind for depth */}
        <motion.div
          className="relative mx-auto flex h-[340px] w-full max-w-[440px] items-center justify-center sm:h-[420px]"
          style={{ y: sceneY, opacity: sceneO }}
        >
          <Blob color={tint("#FF6B6B", 18)} className="h-[86%] w-[86%]" />
          <Blob
            color={tint("#FFD43B", 30)}
            className="top-[2%] right-[2%] h-[34%] w-[34%] opacity-80"
            style={{ animationDuration: "9s" }}
          />

          <motion.div style={{ rotate: mascotR }}>
            <Float>
              <Mascot main="#FF6B6B" size={280} boop onBoop={() => {}} className="relative z-10" />
            </Float>
          </motion.div>

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
        </motion.div>
      </div>

      {/* scroll cue — nested so entrance + parallax don't fight */}
      <motion.div
        className="absolute bottom-5 left-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <motion.div className="-translate-x-1/2" style={{ y: cueY, opacity: cueO }}>
        <span className="flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 puff">
          <motion.span
            aria-hidden
            animate={reduce ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-coral" strokeWidth={3} />
          </motion.span>
          <span className="font-display text-[12.5px] font-bold whitespace-nowrap text-ink-soft">
            scroll — the good stuff stacks up below
          </span>
        </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Velocity ribbons — marquee strips that react to scroll speed
   ═══════════════════════════════════════════════════════════════ */

function Ribbons({ reduce }: { reduce: boolean }) {
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { stiffness: 140, damping: 42, mass: 0.7 });

  const xA = useTransform(smooth, [-2600, 0, 2600], reduce ? [0, 0, 0] : [-150, 0, 150]);
  const skewA = useTransform(smooth, [-2600, 0, 2600], reduce ? [0, 0, 0] : [-6, 0, 6]);
  const xB = useTransform(smooth, [-2600, 0, 2600], reduce ? [0, 0, 0] : [150, 0, -150]);
  const skewB = useTransform(smooth, [-2600, 0, 2600], reduce ? [0, 0, 0] : [6, 0, -6]);

  return (
    <section aria-hidden className="relative z-10 -my-2 overflow-x-clip py-8">
      <Ribbon words={MARQUEE_A} bg="#FF6B6B" rotate={-1.6} x={xA} skew={skewA} />
      <Ribbon words={MARQUEE_B} bg="#2E2016" rotate={1.2} reverse className="-mt-7" x={xB} skew={skewB} />
    </section>
  );
}

function Ribbon({
  words,
  bg,
  rotate,
  reverse = false,
  x,
  skew,
  className,
}: {
  words: string[];
  bg: string;
  rotate: number;
  reverse?: boolean;
  x?: MotionValue<number>;
  skew?: MotionValue<number>;
  className?: string;
}) {
  const list = [...words, ...words];
  return (
    <div
      className={`relative -mx-[4%] w-[108%] ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <motion.div style={{ x, skewX: skew }}>
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
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The stack deck — sticky sections that pile up as you scroll
   ═══════════════════════════════════════════════════════════════ */

function StackDeck({ reduce, children }: { reduce: boolean; children: ReactNode[] }) {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  const doodleY1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -330]);
  const doodleY2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -190]);
  const doodleY3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -260]);
  const doodleR1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 55]);
  const doodleR2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -48]);

  const count = children.length;

  return (
    <div ref={deckRef} className="relative">
      {/* parallax doodles drifting behind the deck */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <motion.div className="absolute top-[16%] left-[1.5%]" style={{ y: doodleY1, rotate: doodleR1 }}>
          <DoodleAtom className="h-16 w-16 text-coral/35" />
        </motion.div>
        <motion.div className="absolute top-[42%] right-[1.8%]" style={{ y: doodleY2, rotate: doodleR2 }}>
          <DoodleMolecule className="h-12 w-20 text-mint/40" />
        </motion.div>
        <motion.div className="absolute bottom-[10%] left-[3%]" style={{ y: doodleY3 }}>
          <DoodleHex className="h-12 w-12 text-grape/30" />
        </motion.div>
      </div>

      {children.map((child, i) => (
        <DeckCardShell key={i} deckIndex={i} count={count} progress={scrollYProgress} reduce={reduce}>
          {child}
        </DeckCardShell>
      ))}
    </div>
  );
}

function DeckCardShell({
  deckIndex,
  count,
  progress,
  reduce,
  children,
}: {
  deckIndex: number;
  count: number;
  progress: MotionValue<number>;
  reduce: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* entry: from the moment this card starts entering until it fully covers */
  const { scrollYProgress: entryP } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const step = 1 / count;
  const range = [deckIndex * step, 1];
  const targetScale = 1 - (count - 1 - deckIndex) * 0.05;
  const dimTarget = (count - 1 - deckIndex) * 0.13;

  const deckScale = useTransform(progress, range, [1, targetScale]);
  const enterScale = useTransform(entryP, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  const scale = useTransform<number, number>(
    [deckScale, enterScale],
    ([a, b]) => (a ?? 1) * (b ?? 1)
  );

  const tilt = CARD_TILT[deckIndex % CARD_TILT.length];
  const rotate = useTransform(entryP, [0, 1], reduce ? [tilt, tilt] : [tilt * 2.6, tilt]);
  const dim = useTransform(progress, range, [0, dimTarget]);

  return (
    <div
      ref={ref}
      className={
        reduce
          ? "relative flex items-center justify-center px-3 py-6 sm:px-6"
          : "sticky top-0 flex h-[106svh] items-center justify-center px-3 sm:px-6"
      }
      style={{ zIndex: deckIndex + 1 }}
    >
      <motion.div
        className="relative h-[88svh] max-h-[940px] w-full max-w-6xl sm:h-[90svh]"
        style={{ scale }}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-[40px] sm:rounded-[52px]"
          style={{
            rotate,
            backgroundColor: CARD_BG[deckIndex % CARD_BG.length],
            boxShadow:
              "0 30px 70px -34px rgba(46,32,22,0.5), 0 6px 0 rgba(46,32,22,0.05)",
          }}
        >
          {/* giant index number */}
          <span
            aria-hidden
            className={`pointer-events-none absolute -top-6 right-5 font-display text-[clamp(6rem,16vw,11rem)] leading-none font-bold select-none ${
              deckIndex === 3 ? "text-cream/[0.05]" : "text-ink/[0.045]"
            }`}
          >
            {String(deckIndex + 1).padStart(2, "0")}
          </span>

          {children}

          {/* dim as the next card covers this one */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[40px] bg-cocoa sm:rounded-[52px]"
            style={{ opacity: dim }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

const CARD_BG = [
  "color-mix(in oklab, #FF6B6B 8%, #FFF6EA)",
  "color-mix(in oklab, #9775FA 8%, #FFF6EA)",
  "color-mix(in oklab, #F06595 8%, #FFF6EA)",
  "#2E2016",
];

/* ═══════════════════════════════════════════════════════════════
   Word-by-word spring reveal for section titles
   ═══════════════════════════════════════════════════════════════ */

function WordsReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className="inline-block"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          variants={{
            hidden: { y: "0.9em", opacity: 0, rotate: 5, scale: 0.9 },
            show: {
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 330, damping: 19 },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Count-up numbers for the hero chips
   ═══════════════════════════════════════════════════════════════ */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val}</span>;
}
