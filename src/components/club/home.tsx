"use client";

import { motion } from "framer-motion";
import {
  Atom,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Flame,
  Gauge,
  ListChecks,
  MoveRight,
  NotebookPen,
  Palette,
  PencilRuler,
  Sticker,
  Target,
  TestTubes,
  Timer,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { usePacks } from "@/lib/spectra/packs";
import { useTimeData } from "@/lib/spectra/time";
import { pickSuggestion } from "@/lib/spectra/suggest";
import {
  BeakerMeter,
  Blob,
  CandyButton,
  Chip,
  DoodleAtom,
  DoodleHex,
  DoodlePlus,
  DoodleSparkle,
  Float,
  Mascot,
  PopIn,
  Reveal,
  SectionTag,
  SoftButton,
  tint,
  shade,
} from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · home — Material You surfaces, candy personality
   Tonal layers, big soft radii, pill buttons; mascot and blobs
   keep the club spirit. No edged boxes anywhere.
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

export function Home({ units, onOpenUnit, onOpenSticker, onOpenTopic, onOpenPack, onOpenSpec }: { units: Unit[]; onOpenUnit: (code: string) => void; onOpenSticker: () => void; onOpenTopic: (code: UnitCode, topicId: string) => void; onOpenPack: () => void; onOpenSpec: () => void }) {
  const hours = Math.round(TOTALS.minutes / 60);
  const revised = useRevised();
  const { picks } = usePacks();
  const time = useTimeData();
  const suggestion = pickSuggestion(units, revised, time);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div>
      {/* ————— hero: full-bleed tonal stage, edge to edge ————— */}
      <section className="relative overflow-hidden bg-paper" style={{ paddingTop: "calc(5.25rem + var(--sa-top))" }}>
        <Blob color={tint("#FF922B", 14)} className="top-[-30%] right-[-16%] h-[85%] w-[54%]" />
        <Blob
          color={tint("#FFD43B", 22)}
          className="top-[36%] right-[-9%] h-[42%] w-[26%] opacity-80"
          style={{ animationDuration: "12s" }}
        />
        <Blob
          color={tint("#FFD43B", 16)}
          className="bottom-[-36%] left-[-14%] h-[58%] w-[36%]"
          style={{ animationDuration: "16s" }}
        />
        <DoodlePlus className="absolute top-[calc(1.4rem+var(--sa-top))] left-6 hidden h-5 w-5 text-mint/40 sm:block lg:left-10" />
        <DoodleAtom className="absolute right-[3%] bottom-[12%] hidden h-9 w-9 text-coral/30 xl:block" />

        <div className="relative z-10">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-3 sm:px-8 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10 lg:pb-24 lg:pt-4">
            {/* left: words */}
            <div>
              <PopIn>
                <SectionTag main="#12B886" tilt={-2}>
                  Edexcel IAL Chemistry · 2018 spec
                </SectionTag>
              </PopIn>

              <PopIn delay={0.08}>
                <h1 className="mt-6 font-display text-[clamp(2.75rem,6.5vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-ink">
                  Every spec point,{" "}
                  <span className="relative inline-block -rotate-2 rounded-[0.35em] bg-lemon/60 px-[0.18em]">
                    made to stick.
                  </span>
                </h1>
              </PopIn>

              <PopIn delay={0.16}>
                <p className="mt-6 max-w-[50ch] text-[15.5px] leading-[1.78] text-ink-soft sm:text-[16.5px] sm:leading-[1.8]">
                  Welcome to <strong className="font-extrabold text-ink">Reaction Club</strong> —
                  revision notes for Pearson Edexcel IAL Chemistry (WCH11–WCH16). Every unit runs
                  the 2018 spec in order: definitions, equations, worked examples and checkpoint
                  questions. Your progress saves itself in your browser.
                </p>
              </PopIn>

              <PopIn delay={0.24} className="mt-8 flex flex-wrap items-center gap-3.5">
                <CandyButton main="#FF6B6B" onClick={() => scrollTo("units")}>
                  Browse the units <MoveRight className="h-5 w-5" />
                </CandyButton>
                <SoftButton onClick={() => scrollTo("how")}>
                  <NotebookPen className="h-4 w-4 text-grape" /> How it works
                </SoftButton>
              </PopIn>

              {/* the numbers, as one tidy strip */}
              <PopIn delay={0.32} className="mt-9">
                <div className="rounded-[26px] bg-cream px-4 py-4 sm:px-5">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
                    {[
                      { icon: Atom, value: String(units.length), label: "units" },
                      { icon: ListChecks, value: String(TOTALS.topics), label: "topics" },
                      { icon: Clock, value: `≈${hours} h`, label: "reading" },
                      { icon: PencilRuler, value: String(TOTALS.examples), label: "examples" },
                      { icon: ClipboardCheck, value: String(TOTALS.checks), label: "checkpoints" },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <s.icon className="h-4 w-4 shrink-0 text-coral" strokeWidth={2.5} />
                        <div className="min-w-0">
                          <div className="font-display text-[19px] leading-none font-bold text-ink">
                            {s.value}
                          </div>
                          <div className="mt-1 truncate text-[11px] font-bold text-ink-faint">
                            {s.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopIn>
            </div>

            {/* right: a taste of what's inside — notes and equations
                drift around Bubbles, so the scene sells the product */}
            <div className="relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[400px] md:h-[440px] md:max-w-[480px]">
              {/* soft peach wash — pink stays reserved for WCH15 and the mascot blush */}
              <Blob color={tint("#FF922B", 18)} className="h-[86%] w-[86%]" />
              <Blob
                color={tint("#FFD43B", 30)}
                className="top-[2%] right-[2%] h-[34%] w-[34%] opacity-80"
                style={{ animationDuration: "9s" }}
              />

              {/* a note, mid-read */}
              <Float delay={0.35} className="absolute top-[9%] left-0 z-20 sm:left-[1%]">
                <div
                  aria-hidden
                  className="w-[150px] -rotate-[4deg] rounded-[22px] bg-paper px-4 py-3.5 puff sm:w-[178px]"
                >
                  <span
                    className="rounded-full px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.08em] text-white uppercase"
                    style={{ background: "#12B886" }}
                  >
                    definition
                  </span>
                  <div className="mt-2 font-display text-[13.5px] font-bold text-ink">
                    Enthalpy change
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <span className="block h-[7px] w-[92%] rounded-full bg-ink/[0.09]" />
                    <span className="block h-[7px] w-[68%] rounded-full bg-ink/[0.09]" />
                    <span className="block h-[7px] w-[82%] rounded-full bg-ink/[0.09]" />
                  </div>
                </div>
              </Float>

              {/* an equation, done */}
              <Float delay={1.2} slow className="absolute right-0 bottom-[7%] z-20 sm:right-[1%]">
                <div
                  aria-hidden
                  className="rotate-[3deg] rounded-[22px] bg-paper px-5 py-4 puff sm:px-6"
                >
                  <span
                    className="rounded-full px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.08em] text-white uppercase"
                    style={{ background: "#FF922B" }}
                  >
                    equation
                  </span>
                  <div className="mt-1.5 font-display text-[20px] font-bold tracking-tight text-ink sm:text-[22px]">
                    pV = nRT
                  </div>
                </div>
              </Float>

              {/* Bubbles, dead centre — eased smaller on phones so the
                  cards frame him instead of covering his face */}
              <Float className="relative z-10">
                <div className="origin-center scale-[0.8] translate-x-4 sm:scale-100 sm:translate-x-0">
                  <Mascot main="#FF6B6B" size={250} boop onBoop={() => {}} className="relative z-10" />
                </div>
              </Float>

              <Float delay={0.8} className="absolute top-[1%] right-[1%] z-30">
                <span className="inline-block rotate-[-7deg] rounded-full bg-paper px-4 py-2 font-display text-[12.5px] font-bold whitespace-nowrap text-ink puff">
                  read → practise → done
                </span>
              </Float>
              <Float delay={1.6} slow className="absolute bottom-[1%] left-[3%] z-30">
                <span
                  className="inline-block rotate-[6deg] rounded-full px-4 py-2 font-display text-[12.5px] font-bold text-white puff"
                  style={{ background: "#9775FA" }}
                >
                  WCH11–WCH16
                </span>
              </Float>

              <DoodleAtom className="animate-float-slow absolute top-[32%] right-[7%] h-9 w-9 text-coral/50" />
              <DoodleHex className="animate-float absolute bottom-[26%] left-[7%] h-8 w-8 text-grape/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ————— marquee ribbons ————— */}
      <section aria-hidden className="relative z-10 -my-2 overflow-x-clip py-8">
        <Ribbon words={MARQUEE_A} bg="#FF6B6B" rotate={-1.6} />
        <Ribbon words={MARQUEE_B} bg="var(--color-cocoa)" rotate={1.2} reverse className="-mt-7" />
      </section>

      {/* ————— units: M3 elevated cards ————— */}
      <section id="units" className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 pt-20 pb-6 sm:px-8">
        <Reveal className="text-center">
          <SectionTag main="#FF922B" tilt={2}>
            the course
          </SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight font-semibold text-ink">
            The six units
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
            Tap a unit to see its topics in specification order. Topics you mark as revised
            are saved in your browser.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {units.map((u, i) => {
            const Icon = UNIT_ICONS[u.code];
            const done = revised.filter((k) => k.startsWith(`${u.code}/`)).length;
            const pct = u.topics.length ? done / u.topics.length : 0;
            const minutes = u.topics.reduce((m, t) => m + t.minutes, 0);
            const tilt = [-1.2, 1, -0.8, 1.1, -1, 0.8][i % 6];
            return (
              <Reveal key={u.code} delay={i * 0.06}>
                <motion.button
                  type="button"
                  onClick={() => onOpenUnit(u.code)}
                  aria-label={`Open ${u.code} — ${u.title}`}
                  whileHover={{ y: -8, rotate: 0, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[28px] bg-paper p-6 text-left puff"
                  style={{ transform: `rotate(${tilt}deg)` }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-4 right-3 font-display text-[88px] leading-none font-bold text-ink/[0.05] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-[16px]"
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

                  <h3 className="mt-4 font-display text-[21px] leading-tight font-semibold text-ink">
                    {u.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-snug font-extrabold text-ink-soft">
                    {u.topicRange}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-soft">
                    {u.blurb}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Chip main={u.candy.main}>
                        {u.topics.length} topics
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

      {/* ————— the revision pack: tick points, get one read ————— */}
      <section id="pack" className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 py-10 sm:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[36px] px-6 py-8 puff sm:rounded-[44px] sm:px-10 sm:py-10"
            style={{ background: "var(--tint-base)" }}
          >
            <Blob color={tint("#FFD43B", 20)} className="top-[-40%] right-[-8%] h-[70%] w-[38%]" />
            <DoodleHex className="absolute bottom-[8%] left-[3%] hidden h-8 w-8 text-lemon/40 sm:block" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center">
              <div className="min-w-0 flex-1">
                <SectionTag main="#FFD43B" tilt={-1.5}>
                  your revision pack
                </SectionTag>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.5rem)] leading-tight font-semibold text-ink">
                  Tick spec points.
                  <span className="relative ml-2 inline-block -rotate-1 rounded-[0.3em] bg-lemon/50 px-[0.2em]">
                    Get one pack.
                  </span>
                </h2>
                <p className="mt-3 max-w-[54ch] text-[15.5px] leading-[1.8] text-ink-soft">
                  The spec index lists every statement the notes cover. Tick what
                  you&apos;re revising — before a class test, a mock, the real
                  thing — and the notes behind those points assemble into one
                  continuous read you can mark off, print or copy.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <CandyButton main="#FF922B" onClick={onOpenPack}>
                    {picks.length > 0 ? (
                      <>
                        Open your pack · {picks.length} point{picks.length === 1 ? "" : "s"}{" "}
                        <MoveRight className="h-5 w-5" />
                      </>
                    ) : (
                      <>
                        Build your pack <MoveRight className="h-5 w-5" />
                      </>
                    )}
                  </CandyButton>
                  <SoftButton onClick={onOpenSpec}>
                    <Target className="h-4 w-4 text-coral" /> Browse the spec index
                  </SoftButton>
                </div>
              </div>
              <div className="flex shrink-0 items-center justify-center md:pl-6">
                <div
                  className="flex items-center gap-4 rounded-[30px] px-6 py-5"
                  style={{ background: tint("#FFD43B", 14) }}
                >
                  <span
                    className="grid h-14 w-14 place-items-center rounded-[20px] bg-paper"
                    style={{ boxShadow: "0 4px 0 var(--edge)" }}
                  >
                    <ClipboardList className="h-7 w-7" style={{ color: "#E8A100" }} />
                  </span>
                  <div>
                    <div className="font-display text-[26px] font-bold leading-none text-ink">
                      {picks.length}
                    </div>
                    <div className="mt-1 text-[11.5px] font-bold tracking-[0.1em] text-ink-faint uppercase">
                      points ticked
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ————— how it works: M3 stepper ————— */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 py-20 sm:px-8">
        <Reveal className="text-center">
          <SectionTag main="#9775FA" tilt={-1.5}>
            how it works
          </SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold text-ink">
            Read, practise, then mark it as revised
          </h2>
        </Reveal>

        {/* three-up as soon as there's room for it — on a tablet in
            portrait the stack would burn three screens of scrolling */}
        <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-stretch md:gap-4 lg:items-center lg:gap-5">
          {[
            {
              n: "1",
              color: "#FF6B6B",
              icon: NotebookPen,
              title: "Read the notes",
              body: "Each topic is written in full — definitions, equations, tables and worked examples — following the specification point by point.",
            },
            {
              n: "2",
              color: "#FF922B",
              icon: ClipboardCheck,
              title: "Check your answers",
              body: "Every topic ends with checkpoint questions. Try each one first, then reveal the answer and compare your working.",
            },
            {
              n: "3",
              color: "#9775FA",
              icon: Sticker,
              title: "Track your progress",
              body: "Mark a topic as revised when you finish it. The progress page keeps count — and clocks the minutes you give each topic.",
            },
          ].map((s, i) => (
            <div key={s.n} className="contents">
              <Reveal delay={i * 0.1} className="min-w-0 flex-1">
                <div
                  className={`h-full rounded-[28px] bg-paper p-5 puff sm:p-6 md:p-5 lg:p-6 ${i % 2 ? "rotate-[0.6deg]" : "rotate-[-0.6deg]"}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[19px] font-bold"
                      style={{ background: s.color, color: "#fff", boxShadow: `0 4px 0 ${shade(s.color)}` }}
                    >
                      {s.n}
                    </span>
                    <span
                      className="grid h-11 w-11 place-items-center rounded-[14px]"
                      style={{ background: tint(s.color, 14) }}
                    >
                      <s.icon className="h-5.5 w-5.5" style={{ color: shade(s.color, 62) }} strokeWidth={2.2} />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[20px] font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.75] text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
              {i < 2 && (
                <Reveal delay={i * 0.1 + 0.05} className="flex flex-col items-center justify-center py-1 lg:py-0">
                  <span aria-hidden className="dot-line h-8 w-[3px] md:hidden" />
                  <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lemon/25 text-lemon md:hidden"
                  >
                    <MoveRight className="h-5.5 w-5.5 rotate-90" strokeWidth={2.5} />
                  </motion.span>
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-lemon/25 text-lemon md:grid"
                  >
                    <MoveRight className="h-6 w-6" strokeWidth={2.5} />
                  </motion.span>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ————— practice tools ————— */}
      <section id="arcade" className="mx-auto max-w-6xl scroll-mt-[calc(6rem+var(--sa-top))] px-5 pb-20 sm:px-8">
        <Reveal className="text-center">
          <SectionTag main="#FF6B6B" tilt={1.5}>
            stay on track
          </SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold text-ink">
            Your bench, your pace
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.05}>
            <motion.button
              type="button"
              onClick={onOpenSticker}
              whileHover={{ y: -8, rotate: 0, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[32px] p-7 text-left puff sm:p-8"
              style={{ background: tint("#12B886", 10), transform: "rotate(-0.8deg)" }}
            >
              <Blob color={tint("#12B886", 22)} className="bottom-[-30%] left-[-15%] h-[75%] w-[55%]" />
              <div className="relative z-10 flex h-full flex-col">
                <span
                  className="grid h-14 w-14 place-items-center rounded-[20px] text-white"
                  style={{ background: "#12B886", boxShadow: `0 5px 0 ${shade("#12B886")}` }}
                >
                  <Timer className="h-7 w-7" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-display text-[26px] font-semibold text-ink">
                  Time &amp; goals
                </h3>
                <p className="mt-2 max-w-[46ch] text-[14.5px] leading-[1.75] text-ink-soft">
                  The site quietly clocks your reading — today, this week and topic by topic.
                  Set a weekly goal, then watch the beaker fill. Currently{" "}
                  {revised.length}/{TOTALS.topics} topics marked as revised.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                  <span className="rounded-full bg-paper/85 px-3.5 py-1.5 text-[12px] font-extrabold text-ink">
                    weekly goals
                  </span>
                  <span className="rounded-full bg-paper/85 px-3.5 py-1.5 text-[12px] font-extrabold text-ink">
                    minutes per topic
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-mint">
                    open <MoveRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </motion.button>
          </Reveal>

          {suggestion ? (
            <Reveal delay={0.12}>
              <motion.button
                type="button"
                onClick={() => onOpenTopic(suggestion.unit.code, suggestion.topic.id)}
                whileHover={{ y: -8, rotate: 0, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[32px] p-7 text-left puff sm:p-8"
                style={{
                  background: tint(suggestion.unit.candy.main, 10),
                  transform: "rotate(0.8deg)",
                }}
              >
                <Blob
                  color={tint(suggestion.unit.candy.main, 22)}
                  className="top-[-30%] right-[-15%] h-[75%] w-[55%]"
                />
                <div className="relative z-10 flex h-full flex-col">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-[20px] text-white"
                    style={{
                      background: suggestion.unit.candy.main,
                      boxShadow: `0 5px 0 ${shade(suggestion.unit.candy.main)}`,
                    }}
                  >
                    <Target className="h-7 w-7" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 font-display text-[26px] font-semibold text-ink">
                    Today&apos;s pick
                  </h3>
                  <p className="mt-2 font-display text-[15px] font-semibold text-ink">
                    {suggestion.topic.label} · {suggestion.topic.title}
                  </p>
                  <p className="mt-1 max-w-[46ch] text-[14.5px] leading-[1.75] text-ink-soft">
                    {suggestion.reason} — about {suggestion.topic.minutes} minutes of reading.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                    <span className="rounded-full bg-paper/85 px-3.5 py-1.5 text-[12px] font-extrabold text-ink">
                      picked fresh daily
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 font-display text-[14px] font-bold" style={{ color: suggestion.unit.candy.main }}>
                      read it <MoveRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ) : (
            <Reveal delay={0.12}>
              <button
                type="button"
                onClick={onOpenSticker}
                className="block h-full w-full cursor-pointer rounded-[32px] p-7 text-left puff sm:p-8"
                style={{ background: tint("#12B886", 10), transform: "rotate(0.8deg)" }}
              >
                <h3 className="font-display text-[26px] font-semibold text-ink">All done</h3>
                <p className="mt-2 text-[14.5px] leading-[1.75] text-ink-soft">
                  Every topic is marked as revised. Respect.
                </p>
              </button>
            </Reveal>
          )}
        </div>
      </section>

      {/* ————— CTA band: the cocoa card from the moodboard ————— */}
      <section className="px-3 pb-24 sm:px-5 sm:pb-28 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-cocoa px-6 py-12 text-center sm:rounded-[44px] sm:px-12 sm:py-16">
            <Blob color="rgba(255,107,107,0.16)" className="top-[-30%] left-[-10%] h-[70%] w-[45%]" />
            <Blob
              color="rgba(151,117,250,0.16)"
              className="right-[-12%] bottom-[-35%] h-[75%] w-[45%]"
              style={{ animationDuration: "15s" }}
            />
            <DoodlePlus className="absolute top-8 left-[12%] h-6 w-6 text-milk/25" />
            <DoodleSparkle className="absolute right-[16%] bottom-10 h-7 w-7 text-lemon/50" />

            <div className="relative z-10 mx-auto max-w-xl">
              <Float slow className="mx-auto w-fit">
                <Mascot main="#FFD43B" mood="cheer" size={150} bubbles={false} className="mx-auto" />
              </Float>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold text-milk">
                Pick a unit and dive in.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-milk/75">
                Begin with Unit 1, or jump straight to the topic you are revising.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <CandyButton main="#FFD43B" onClick={() => scrollTo("units")}>
                  Browse the units <MoveRight className="h-5 w-5" />
                </CandyButton>
                <SoftButton onClick={() => onOpenUnit("WCH11")}>
                  Open Unit 1 <DoodleSparkle className="h-4 w-4 text-lemon" />
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
