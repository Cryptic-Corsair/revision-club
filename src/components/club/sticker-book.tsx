"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  Check,
  Droplets,
  Lock,
  Sparkles,
  Sticker,
  Trophy,
  Zap,
} from "lucide-react";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { useBlendStats } from "@/lib/spectra/blend-stats";
import {
  BeakerMeter,
  Confetti,
  Float,
  Mascot,
  PopIn,
  Reveal,
  SectionTag,
  SoftButton,
  SpeechBubble,
  tint,
  shade,
} from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the sticker book — where the jar lives
   Every revised topic is a sticker; every sticker raises the beaker.
   ═══════════════════════════════════════════════════════════════ */

interface Achievement {
  id: string;
  label: string;
  hint: string;
  color: string;
  earned: boolean;
}

function jarQuip(pct: number, count: number): string {
  if (count === 0)
    return "An empty jar! Hurray — that means every sticker is still out there waiting.";
  if (pct >= 1) return "FULL JAR. Every topic collected. Frame it. Tweet it. Tell your teacher.";
  if (pct >= 0.75) return "Three quarters full! The A level is starting to worry about you.";
  if (pct >= 0.5) return "Halfway! The liquid level says you are officially dangerous.";
  if (pct >= 0.25) return "A proper splash! Keep pulling topics off the shelf.";
  return "First sips! Every beaker starts with one drop. Or in your case, stickers.";
}

export function StickerBook({
  units,
  onBack,
  onOpenUnit,
}: {
  units: Unit[];
  onBack: () => void;
  onOpenUnit: (code: UnitCode) => void;
}) {
  const revised = useRevised();
  const stats = useBlendStats();
  const [confirmPour, setConfirmPour] = useState(false);
  const [confetti, setConfetti] = useState(0);

  const count = revised.length;
  const pct = TOTALS.topics ? count / TOTALS.topics : 0;

  const unitDone = (u: Unit) =>
    u.topics.filter((t) => revised.includes(`${u.code}/${t.id}`)).length;

  const achievements: Achievement[] = [
    {
      id: "first-dip",
      label: "First dip",
      hint: "Collect 1 sticker",
      color: "#FF6B6B",
      earned: count >= 1,
    },
    {
      id: "flavour-fan",
      label: "Flavour fan",
      hint: "Finish any one unit",
      color: "#FF922B",
      earned: units.some((u) => unitDone(u) === u.topics.length && u.topics.length > 0),
    },
    {
      id: "half-pint",
      label: "Half pint",
      hint: "Fill the jar to 50%",
      color: "#FFD43B",
      earned: pct >= 0.5,
    },
    {
      id: "blend-rookie",
      label: "Blend rookie",
      hint: "Play one blend",
      color: "#9775FA",
      earned: stats.blends >= 1,
    },
    {
      id: "streak-5",
      label: "On a streak",
      hint: "Streak of 5 in Blend Mode",
      color: "#F06595",
      earned: stats.best >= 5,
    },
    {
      id: "full-jar",
      label: "Full jar",
      hint: "Collect every sticker",
      color: "#12B886",
      earned: pct >= 1,
    },
  ];

  const pour = () => {
    if (!confirmPour) {
      setConfirmPour(true);
      window.setTimeout(() => setConfirmPour(false), 4000);
      return;
    }
    for (const k of revised) toggleRevised(k);
    setConfirmPour(false);
    setConfetti((c) => c + 1); // yes, emptying the jar also gets confetti. Bubbles insists.
  };

  return (
    <div className="mx-auto max-w-4xl px-5 pt-24 pb-20 sm:px-8">
      {/* back */}
      <PopIn>
        <SoftButton onClick={onBack} className="min-h-[42px] px-4 py-2 text-[13.5px]">
          <ArrowLeft className="h-4 w-4" /> back to the clubhouse
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-8">
        <PopIn delay={0.05}>
          <SectionTag main="#12B886" tilt={-2}>
            the sticker book
          </SectionTag>
        </PopIn>
        <PopIn delay={0.1}>
          <h1 className="mt-5 font-display text-[clamp(2.3rem,5vw,3.4rem)] leading-[1.05] font-semibold tracking-tight text-ink">
            Your jar,{" "}
            <span className="relative inline-block -rotate-2 rounded-[0.35em] bg-mint/15 px-[0.18em]">
              so far.
            </span>
          </h1>
        </PopIn>
      </header>

      {/* ————— the jar panel ————— */}
      <Reveal className="relative mt-8">
        <div className="flex flex-wrap items-center gap-7 rounded-[40px] bg-paper p-7 puff sm:p-9">
          <Confetti fire={confetti} />
          <Float className="shrink-0">
            <BeakerMeter pct={pct} main="#12B886" size={130} />
          </Float>
          <div className="min-w-0 flex-1">
            <div className="font-display text-[12px] font-bold tracking-[0.18em] text-ink-faint uppercase">
              jar fill level
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-[clamp(2.4rem,6vw,3.6rem)] leading-none font-semibold text-ink">
                {Math.round(pct * 100)}%
              </span>
              <span className="text-[14px] font-extrabold text-ink-soft">
                {count} of {TOTALS.topics} stickers
              </span>
            </div>
            <div className="mt-4 h-5 w-full max-w-sm overflow-hidden rounded-full bg-ink/5">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#12B886,#FFD43B)]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(pct * 100, count > 0 ? 4 : 0)}%` }}
                transition={{ type: "spring", stiffness: 110, damping: 20 }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {units.map((u) => {
                const done = unitDone(u);
                const full = u.topics.length > 0 && done === u.topics.length;
                return (
                  <span
                    key={u.code}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-extrabold"
                    style={{
                      background: done > 0 ? tint(u.candy.main, full ? 90 : 16) : "rgb(61 43 31 / 0.05)",
                      color: done > 0 ? shade(u.candy.main, 62) : "var(--color-ink-faint)",
                    }}
                  >
                    {full && <Check className="h-3 w-3" strokeWidth={3.5} />}
                    {u.code.replace("WCH", "")} · {done}/{u.topics.length}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ————— Bubbles reacts ————— */}
      <PopIn delay={0.15} className="mt-6 flex items-end gap-2 sm:gap-3">
        <div className="shrink-0 pb-1">
          <Mascot main="#12B886" mood={pct >= 0.5 ? "cheer" : "idle"} size={88} bubbles={false} />
        </div>
        <SpeechBubble bg={tint("#12B886", 10)} className="min-w-0 flex-1" tailClass="left-[-9px] rotate-[135deg]">
          <p className="text-[15px] leading-[1.75] text-ink">{jarQuip(pct, count)}</p>
        </SpeechBubble>
      </PopIn>

      {/* ————— achievements ————— */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-display text-[13px] font-bold tracking-[0.16em] text-ink-faint uppercase">
            <Award className="h-4 w-4 text-lemon" /> badge shelf · {achievements.filter((a) => a.earned).length}/{achievements.length}
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-3">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -5, rotate: 0, scale: 1.04 }}
                className={`relative flex cursor-default flex-col items-center rounded-[26px] px-2 py-5 text-center ${
                  a.earned ? "puff" : ""
                }`}
                style={{
                  transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1][i % 6]}deg)`,
                  background: a.earned ? tint(a.color, 14) : "rgb(61 43 31 / 0.035)",
                }}
                title={a.hint}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full"
                  style={
                    a.earned
                      ? { background: a.color, boxShadow: `0 4px 0 ${shade(a.color)}`, color: "#fff" }
                      : { background: "rgb(61 43 31 / 0.06)", color: "var(--color-ink-faint)" }
                  }
                >
                  {a.earned ? (
                    a.id === "streak-5" ? <Zap className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "blend-rookie" ? <Sparkles className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "full-jar" ? <Droplets className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "flavour-fan" ? <BookOpenCheck className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    a.id === "half-pint" ? <Droplets className="h-5.5 w-5.5" strokeWidth={2.5} /> :
                    <Sticker className="h-5.5 w-5.5" strokeWidth={2.5} />
                  ) : (
                    <Lock className="h-5 w-5" strokeWidth={2.5} />
                  )}
                </span>
                <span
                  className={`mt-2.5 font-display text-[12.5px] leading-tight font-bold ${
                    a.earned ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  {a.label}
                </span>
                <span className="mt-0.5 hidden text-[10.5px] leading-tight font-bold text-ink-faint sm:block">
                  {a.hint}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— the sheets ————— */}
      <section className="mt-14 flex flex-col gap-8">
        <Reveal>
          <div className="flex items-center gap-2 font-display text-[13px] font-bold tracking-[0.16em] text-ink-faint uppercase">
            <Trophy className="h-4 w-4 text-tangerine" /> the six sheets · tap a sticker to peel it off
          </div>
        </Reveal>

        {units.map((u, ui) => {
          const done = unitDone(u);
          const unitPct = u.topics.length ? done / u.topics.length : 0;
          const main = u.candy.main;
          return (
            <Reveal key={u.code} delay={Math.min(ui * 0.04, 0.2)}>
              <div
                className="rounded-[36px] p-5 sm:p-6"
                style={{ background: tint(main, 8) }}
              >
                <button
                  type="button"
                  onClick={() => onOpenUnit(u.code)}
                  className="group mb-5 flex w-full cursor-pointer flex-wrap items-center gap-3 text-left"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-[15px] font-bold text-white"
                    style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
                  >
                    {u.code.replace("WCH", "")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[17px] font-semibold text-ink group-hover:underline">
                      {u.candy.nick}
                    </span>
                    <span className="block text-[12px] font-extrabold text-ink-soft">
                      {done}/{u.topics.length} collected · {u.candy.name}
                    </span>
                  </span>
                  <span className="ml-auto flex items-center gap-3">
                    <BeakerMeter pct={unitPct} main={main} size={34} />
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {u.topics.map((t, ti) => {
                    const has = revised.includes(`${u.code}/${t.id}`);
                    return (
                      <motion.button
                        key={t.id}
                        type="button"
                        onClick={() => toggleRevised(`${u.code}/${t.id}`)}
                        whileHover={{ y: -4, rotate: 0, scale: 1.02 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 320, damping: 16 }}
                        aria-pressed={has}
                        aria-label={
                          has
                            ? `Remove sticker: ${t.title}`
                            : `Mark revised (add sticker): ${t.title}`
                        }
                        className="relative cursor-pointer rounded-[22px] p-3.5 text-left"
                        style={
                          has
                            ? {
                                background: main,
                                color: "#fff",
                                boxShadow: `0 4px 0 ${shade(main)}`,
                                transform: `rotate(${ti % 2 ? 1.4 : -1.4}deg)`,
                              }
                            : {
                                background: "rgba(255,253,247,0.75)",
                                border: "2.5px dashed rgb(61 43 31 / 0.16)",
                                color: "var(--color-ink-faint)",
                                transform: `rotate(${ti % 2 ? -0.7 : 0.7}deg)`,
                              }
                        }
                      >
                        {has && (
                          <span className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-white/30">
                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
                          </span>
                        )}
                        <span
                          className={`font-display text-[11px] font-bold tracking-[0.12em] uppercase ${
                            has ? "text-white/75" : ""
                          }`}
                        >
                          {t.label}
                        </span>
                        <span
                          className={`mt-1 line-clamp-2 block text-[13px] leading-snug font-extrabold ${
                            has ? "text-white" : "text-ink-soft"
                          }`}
                        >
                          {t.title}
                        </span>
                        {!has && (
                          <span className="mt-1.5 block text-[10.5px] font-bold text-ink-faint">
                            empty slot — go collect it
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ————— the pour ritual ————— */}
      <Reveal className="mt-14 flex justify-center">
        <motion.button
          type="button"
          onClick={pour}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95, y: 2 }}
          aria-label="Reset all sticker progress"
          className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-display text-[14.5px] font-semibold"
          style={
            confirmPour
              ? { background: "#FF6B6B", color: "#fff", boxShadow: "0 4px 0 #e8590c" }
              : { background: "rgb(61 43 31 / 0.06)", color: "#8a7261" }
          }
        >
          <Droplets className="h-4.5 w-4.5" />
          {confirmPour ? "really pour it all out?" : "pour out the jar (start fresh)"}
        </motion.button>
      </Reveal>
      <p className="mt-3 text-center text-[12px] font-bold text-ink-faint">
        {confirmPour
          ? "tap again to confirm — there is no undo, only regret"
          : "your jar lives in this browser only. no accounts, no clouds, no judgement."}
      </p>
    </div>
  );
}
