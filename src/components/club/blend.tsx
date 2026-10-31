"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Flame,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import type { UnitCode } from "@/lib/spectra/types";
import { DECK, DECK_BY_UNIT, shuffle, type Card } from "@/lib/spectra/deck";
import { UNITS } from "@/lib/spectra/units";
import { recordRun, useBlendStats } from "@/lib/spectra/blend-stats";
import { useRevised } from "@/lib/spectra/progress";
import { Fmt } from "./format";
import {
  Blob,
  Chip,
  Confetti,
  DoodleSparkle,
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
   Reaction Club · BLEND MODE
   Every checkpoint question on the site, thrown into a blender.
   Flip → self-judge → streaks grow → confetti at combos.
   Keyboard: Space flip · → got it · ← not yet
   ═══════════════════════════════════════════════════════════════ */

type Phase = "idle" | "playing" | "done";

const MILESTONES = [3, 5, 8, 12, 16, 20];

const COMBO_QUIPS: Record<number, string> = {
  3: "Three in a row! The blend is warming up.",
  5: "FIVE! Somewhere, an enthalpy diagram just smiled.",
  8: "Eight?! Are you a catalyst? Because things are happening faster now.",
  12: "Twelve. This is a runaway reaction and we are here for it.",
  16: "Sixteen! Honestly, revise me harder.",
  20: "TWENTY. Bubbles has fainted. Passionately.",
};

export function Blend({
  onBack,
  onOpenTopic,
}: {
  onBack: () => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
}) {
  const stats = useBlendStats();
  const revised = useRevised();

  const [phase, setPhase] = useState<Phase>("idle");
  const [filter, setFilter] = useState<UnitCode | "all">("all");
  const [run, setRun] = useState<{ cards: Card[]; picks: ("hit" | "miss")[] } | null>(null);

  const pile = useMemo(
    () => (filter === "all" ? DECK : DECK.filter((c) => c.unit === filter)),
    [filter]
  );

  const start = (size: number) => {
    const picked = shuffle(pile).slice(0, size);
    setFiredMilestone(0);
    setRun({ cards: picked, picks: [] });
    setPhase("playing");
    window.setTimeout(
      () => stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80
    );
  };

  const [firedMilestone, setFiredMilestone] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [quip, setQuip] = useState<string | null>(null);
  const quipTimer = useRef<number | undefined>(undefined);

  /* ————— derived run state ————— */
  const idx = run ? run.picks.length : 0;
  const card = run && idx < run.cards.length ? run.cards[idx] : null;
  const hits = run ? run.picks.filter((p) => p === "hit").length : 0;

  let streak = 0;
  let bestStreak = 0;
  for (const p of run?.picks ?? []) {
    if (p === "hit") {
      streak++;
      bestStreak = Math.max(bestStreak, streak);
    } else streak = 0;
  }

  const judge = (verdict: "hit" | "miss") => {
    if (!run || run.picks.length >= run.cards.length) return;
    const picks = [...run.picks, verdict];
    setRun({ ...run, picks });

    // streak bookkeeping (event-driven — no effects, no cascades)
    let s = 0;
    let bs = 0;
    for (const p of picks) {
      if (p === "hit") bs = Math.max(bs, ++s);
      else s = 0;
    }
    if (bs >= 3) {
      const m = MILESTONES.reduce((acc, x) => (bs >= x ? x : acc), 0);
      if (m > firedMilestone) {
        setFiredMilestone(m);
        setConfetti((c) => c + 1);
        setQuip(COMBO_QUIPS[m] ?? "Unstoppable.");
        window.clearTimeout(quipTimer.current);
        quipTimer.current = window.setTimeout(() => setQuip(null), 3200);
      }
    }

    // last card → record the run and show results
    if (picks.length === run.cards.length) {
      const h = picks.filter((p) => p === "hit").length;
      recordRun(h, picks.length, bs);
      if (picks.length > 0 && h / picks.length >= 0.7) setConfetti((c) => c + 1);
      setPhase("done");
    }
  };

  const flipRef = useRef<(() => void) | null>(null);

  /* ————— keyboard ————— */
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        flipRef.current?.();
      } else if (e.key === "ArrowRight") judge("hit");
      else if (e.key === "ArrowLeft") judge("miss");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const stageRef = useRef<HTMLElement | null>(null);

  return (
    <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-20 sm:px-8">
      {/* back */}
      <PopIn>
        <SoftButton onClick={onBack} className="min-h-[42px] px-4 py-2 text-[13.5px]">
          <ArrowLeft className="h-4 w-4" /> back to the clubhouse
        </SoftButton>
      </PopIn>

      {/* ————— header ————— */}
      <header className="mt-8">
        <PopIn delay={0.05}>
          <SectionTag main="#9775FA" tilt={-2}>
            the arcade · blend mode
          </SectionTag>
        </PopIn>
        <PopIn delay={0.1}>
          <h1 className="mt-5 font-display text-[clamp(2.3rem,5vw,3.4rem)] leading-[1.05] font-semibold tracking-tight text-ink">
            Flashcards that{" "}
            <span className="relative inline-block -rotate-2 rounded-[0.35em] bg-grape/15 px-[0.18em]">
              fight back.
            </span>
          </h1>
          <p className="mt-3.5 max-w-[58ch] text-[16.5px] leading-[1.8] text-ink-soft">
            Every checkpoint question on the site, blended into one deck. Flip a card, judge
            yourself honestly (Bubbles will know), and chase your streak.{" "}
            <strong className="font-extrabold text-ink">Space</strong> flips,{" "}
            <strong className="font-extrabold text-ink">← →</strong> judges.
          </p>
        </PopIn>
      </header>

      {/* ————— scoreboard ————— */}
      <PopIn delay={0.16} className="mt-8 flex flex-wrap gap-2.5">
        <span className="inline-flex items-center gap-2 rounded-full bg-grape/15 px-4 py-2.5 text-[13.5px] font-extrabold text-ink">
          <Trophy className="h-4 w-4 text-grape" /> best streak: {stats.best}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-mint/15 px-4 py-2.5 text-[13.5px] font-extrabold text-ink">
          <Zap className="h-4 w-4 text-mint" /> {stats.blends} blends played
        </span>
        {stats.tries > 0 && (
          <span className="inline-flex items-center gap-2 rounded-full bg-lemon/20 px-4 py-2.5 text-[13.5px] font-extrabold text-ink">
            <Sparkles className="h-4 w-4 text-lemon" />
            {Math.round((stats.hits / stats.tries) * 100)}% all-time hit rate
          </span>
        )}
      </PopIn>

      {/* ————— IDLE: pick a pile ————— */}
      {phase === "idle" && (
        <section className="mt-10">
          <Reveal>
            <div className="mb-3 flex items-center gap-2 font-display text-[13px] font-bold tracking-[0.16em] text-ink-faint uppercase">
              pick your pile <DoodleSparkle className="h-4 w-4 text-lemon" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("all")}
                className="cursor-pointer rounded-full px-4 py-2.5 font-display text-[13.5px] font-bold"
                style={
                  filter === "all"
                    ? { background: "#3d2b1f", color: "#fff", boxShadow: "0 3px 0 #1f150e" }
                    : { background: "rgb(61 43 31 / 0.07)", color: "#8a7261" }
                }
              >
                the whole shelf · {DECK.length}
              </motion.button>
              {UNITS.map((u) => (
                <motion.button
                  key={u.code}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(u.code)}
                  disabled={DECK_BY_UNIT[u.code] === 0}
                  className="cursor-pointer rounded-full px-4 py-2.5 font-display text-[13.5px] font-bold disabled:cursor-not-allowed disabled:opacity-40"
                  style={
                    filter === u.code
                      ? { background: u.candy.main, color: "#fff", boxShadow: `0 3px 0 ${shade(u.candy.main)}` }
                      : { background: tint(u.candy.main, 14), color: shade(u.candy.main, 62) }
                  }
                >
                  {u.code.replace("WCH", "")} · {u.candy.name} · {DECK_BY_UNIT[u.code]}
                </motion.button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div
              className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[40px] p-7 text-center sm:p-10"
              style={{ background: tint("#9775FA", 9) }}
            >
              <Blob color={tint("#9775FA", 20)} className="top-[-20%] right-[-10%] h-[60%] w-[45%]" />
              <Float>
                <Mascot main="#9775FA" mood="cheer" size={150} />
              </Float>
              <div className="relative z-10">
                <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-semibold text-ink">
                  {pile.length} cards ready to blend
                </h2>
                <p className="mx-auto mt-2 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">
                  Ten cards per blend — quick enough for the bus stop, mean enough to matter.
                  Judged by you, remembered by the jar.
                </p>
                <motion.button
                  type="button"
                  onClick={() => start(Math.min(10, pile.length))}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95, y: 2 }}
                  className="candy mt-6 inline-flex min-h-[56px] cursor-pointer items-center gap-2.5 rounded-full px-8 py-4 font-display text-[17px] font-semibold text-white select-none"
                  style={{ "--candy-bg": "#9775FA", "--candy-side": shade("#9775FA") } as React.CSSProperties}
                >
                  <Zap className="h-5 w-5" /> Blend {Math.min(10, pile.length)} cards
                </motion.button>
                {pile.length > 10 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {[15, 25].filter((n) => n <= pile.length).map((n) => (
                      <motion.button
                        key={n}
                        type="button"
                        onClick={() => start(n)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer rounded-full bg-white/80 px-4 py-2 text-[12.5px] font-extrabold text-ink-soft"
                      >
                        go big · {n}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ————— PLAYING: the card ————— */}
      {phase === "playing" && run && card && (
        <section ref={stageRef} className="mt-10 scroll-mt-24">
          {/* progress dots */}
          <div className="mb-5 flex items-center justify-center gap-1.5">
            {run.cards.map((_, i) => (
              <motion.span
                key={i}
                aria-hidden
                animate={{
                  scale: i === idx ? 1.5 : 1,
                  backgroundColor:
                    i < idx
                      ? run.picks[i] === "hit"
                        ? "#12b886"
                        : "#ff6b6b"
                      : i === idx
                        ? "#3d2b1f"
                        : "rgb(61 43 31 / 0.15)",
                }}
                className="h-2.5 w-2.5 rounded-full"
              />
            ))}
          </div>

          {/* streak meter */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <motion.span
              key={streak}
              initial={{ scale: 0.6, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[14px] font-bold ${
                streak >= 3 ? "text-white" : "bg-ink/5 text-ink-soft"
              }`}
              style={streak >= 3 ? { background: "#ff6b6b", boxShadow: "0 3px 0 #e8590c" } : undefined}
            >
              <Flame className="h-4 w-4" strokeWidth={2.5} />
              streak {streak}
              {bestStreak >= 3 && streak === bestStreak && streak > 0 && (
                <span className="ml-0.5 text-[11px] opacity-80">· on fire!</span>
              )}
            </motion.span>
            <span className="rounded-full bg-ink/5 px-4 py-2 font-display text-[14px] font-bold text-ink-soft">
              {hits} hit · {run.picks.length - hits} missed
            </span>
          </div>

          <Flashcard
            key={card.id}
            card={card}
            onFlipRef={flipRef}
            onJudge={judge}
            onOpenTopic={onOpenTopic}
          />

          {/* combo quip */}
          <AnimatePresence>
            {quip && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 flex items-end justify-center gap-2"
              >
                <Mascot main="#FFD43B" mood="cheer" size={72} bubbles={false} />
                <SpeechBubble bg="#FFFDF7" className="mb-3" tailClass="left-[-9px] rotate-[135deg]">
                  <span className="font-display text-[13.5px] font-semibold text-ink">{quip}</span>
                </SpeechBubble>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex justify-center">
            <Confetti fire={confetti} />
          </div>

          <p className="mt-8 text-center text-[12.5px] font-bold text-ink-faint">
            Space to flip · → got it · ← not yet
          </p>
        </section>
      )}

      {/* ————— DONE: results ————— */}
      {phase === "done" && run && (
        <section className="relative mt-10">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[40px] p-7 text-center sm:p-10"
              style={{ background: tint("#12B886", 9) }}
            >
              <Blob color={tint("#12B886", 18)} className="bottom-[-25%] left-[-10%] h-[65%] w-[50%]" />
              <div className="relative z-10">
                <Float>
                  <Mascot
                    main="#12B886"
                    mood={hits / run.cards.length >= 0.7 ? "cheer" : "idle"}
                    size={150}
                  />
                </Float>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,3.8vw,2.4rem)] font-semibold text-ink">
                  {hits === run.cards.length
                    ? "A perfect blend!"
                    : hits / run.cards.length >= 0.7
                      ? "Smooth operator."
                      : hits / run.cards.length >= 0.4
                        ? "Chunky, but drinkable."
                        : "That one needed sieving."}
                </h2>
                <p className="mt-2 text-[15px] text-ink-soft">
                  {hits} of {run.cards.length} cards hit · best streak {bestStreak}
                  {bestStreak >= stats.best && bestStreak > 0 && (
                    <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-lemon/25 px-2.5 py-0.5 text-[11.5px] font-extrabold text-lemon">
                      <Trophy className="h-3 w-3" /> new record
                    </span>
                  )}
                </p>

                {/* mini bars */}
                <div className="mx-auto mt-6 flex max-w-sm items-center gap-3">
                  <div className="h-5 flex-1 overflow-hidden rounded-full bg-white/80">
                    <motion.div
                      className="h-full rounded-full bg-mint"
                      initial={{ width: 0 }}
                      animate={{ width: `${(hits / run.cards.length) * 100}%` }}
                      transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.2 }}
                    />
                  </div>
                  <span className="font-display text-[15px] font-bold text-ink">
                    {Math.round((hits / run.cards.length) * 100)}%
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setFiredMilestone(0);
                      setPhase("idle");
                      setRun(null);
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95, y: 2 }}
                    className="candy inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 font-display text-[16px] font-semibold text-white select-none"
                    style={{ "--candy-bg": "#12B886", "--candy-side": shade("#12B886") } as React.CSSProperties}
                  >
                    <RotateCcw className="h-4.5 w-4.5" /> Blend again
                  </motion.button>
                  <SoftButton
                    onClick={() => {
                      setPhase("idle");
                      setRun(null);
                    }}
                  >
                    Change the pile
                  </SoftButton>
                </div>
              </div>
            </div>
          </Reveal>

          {/* the cards you missed */}
          {run.picks.some((p) => p === "miss") && (
            <Reveal delay={0.1} className="mt-8">
              <div className="mb-3 font-display text-[13px] font-bold tracking-[0.16em] text-ink-faint uppercase">
                cards that escaped · chase them down
              </div>
              <div className="flex flex-col gap-3">
                {run.cards.map((c, i) =>
                  run.picks[i] === "miss" ? (
                    <motion.button
                      key={c.id}
                      type="button"
                      onClick={() => onOpenTopic(c.unit, c.topicId)}
                      whileHover={{ y: -3, rotate: 0 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex cursor-pointer items-start gap-3.5 rounded-[26px] bg-paper p-4.5 text-left puff sm:items-center sm:p-5"
                      style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
                    >
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
                        style={{ background: tint(c.unitMain, 16) }}
                      >
                        <X className="h-5 w-5" style={{ color: shade(c.unitMain, 62) }} strokeWidth={3} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <Chip main={c.unitMain}>{c.topicLabel}</Chip>
                          <span className="text-[11.5px] font-extrabold text-ink-faint">
                            {c.unit}
                          </span>
                        </span>
                        <span className="mt-1 block text-[14.5px] leading-snug font-bold text-ink">
                          <Fmt text={c.q} />
                        </span>
                      </span>
                    </motion.button>
                  ) : null
                )}
              </div>
            </Reveal>
          )}

          {/* revised topics hint */}
          <p className="mt-8 text-center text-[12.5px] font-bold text-ink-faint">
            {revised.length === 0
              ? "Tip: topics you mark revised get their own stickers — the jar is watching."
              : `${revised.length} sticker${revised.length === 1 ? "" : "s"} in the jar so far.`}
          </p>
        </section>
      )}
    </div>
  );
}

/* ————— the flashcard itself: a fat 3D flip ————— */

function Flashcard({
  card,
  onFlipRef,
  onJudge,
  onOpenTopic,
}: {
  card: Card;
  onFlipRef: React.MutableRefObject<(() => void) | null>;
  onJudge: (v: "hit" | "miss") => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [nudge, setNudge] = useState(0);

  const flip = useCallback(() => {
    setFlipped((f) => {
      if (!f) setNudge((n) => n + 1);
      return !f;
    });
  }, []);

  useEffect(() => {
    onFlipRef.current = flip;
    return () => {
      onFlipRef.current = null;
    };
  }, [flip, onFlipRef]);

  return (
    <div className="[perspective:1400px]">
      <motion.div
        className="relative mx-auto w-full max-w-xl [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0, x: nudge ? [0, -6, 6, -3, 0] : 0 }}
        transition={{
          rotateY: { type: "spring", stiffness: 260, damping: 22 },
          x: { duration: 0.4 },
        }}
        style={{ minHeight: 340 }}
      >
        {/* front — the question */}
        <CardFace>
          <div className="flex flex-wrap items-center gap-2">
            <Chip main={card.unitMain}>{card.unit}</Chip>
            <Chip>{card.topicLabel}</Chip>
            <span className="ml-auto font-display text-[12px] font-bold tracking-[0.14em] text-ink-faint uppercase">
              tap to flip
            </span>
          </div>
          <p className="mt-7 font-display text-[clamp(1.3rem,3vw,1.7rem)] leading-[1.4] font-semibold text-ink">
            <Fmt text={card.q} />
          </p>
          <div className="mt-auto pt-7">
            <motion.button
              type="button"
              onClick={flip}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95, y: 2 }}
              className="candy inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-display text-[15px] font-semibold text-white select-none"
              style={
                {
                  "--candy-bg": card.unitMain,
                  "--candy-side": shade(card.unitMain),
                } as React.CSSProperties
              }
            >
              <Sparkles className="h-4.5 w-4.5" /> Reveal the answer
            </motion.button>
          </div>
        </CardFace>

        {/* back — the answer */}
        <CardFace back>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-display text-[12px] font-bold text-ink">
              <Check className="h-3.5 w-3.5 text-mint" strokeWidth={3} /> answer
            </span>
            <span className="text-[12px] font-extrabold text-ink-faint">
              {card.topicTitle}
            </span>
          </div>
          <p className="mt-6 text-[15.5px] leading-[1.8] text-ink">
            <Fmt text={card.a} />
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-7">
            <div className="flex flex-wrap gap-3">
              <motion.button
                type="button"
                onClick={() => onJudge("hit")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95, y: 2 }}
                className="candy inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-[15px] font-semibold text-white select-none"
                style={{ "--candy-bg": "#12B886", "--candy-side": "#0ca678" } as React.CSSProperties}
              >
                <Check className="h-4.5 w-4.5" strokeWidth={3} /> Got it
              </motion.button>
              <motion.button
                type="button"
                onClick={() => onJudge("miss")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95, y: 2 }}
                className="candy inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-[15px] font-semibold text-white select-none"
                style={{ "--candy-bg": "#FF6B6B", "--candy-side": "#e8590c" } as React.CSSProperties}
              >
                <X className="h-4.5 w-4.5" strokeWidth={3} /> Not yet
              </motion.button>
            </div>
            <button
              type="button"
              onClick={() => onOpenTopic(card.unit, card.topicId)}
              className="cursor-pointer text-[12.5px] font-extrabold text-ink-faint underline decoration-dotted underline-offset-4 hover:text-ink-soft"
            >
              reread {card.topicLabel.toLowerCase()} · {card.topicTitle}
            </button>
          </div>
        </CardFace>
      </motion.div>

      {/* the whole card is clickable on the front */}
      {!flipped && (
        <button
          type="button"
          aria-label="Flip card"
          onClick={flip}
          className="absolute inset-0 cursor-pointer rounded-[36px]"
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  );
}

function CardFace({ children, back = false }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex flex-col rounded-[36px] p-6 sm:p-8"
      style={{
        background: back ? "#FFFDF7" : "#fffdf7",
        boxShadow: "0 4px 0 rgb(61 43 31 / 0.05), 0 26px 60px -26px rgb(61 43 31 / 0.35)",
        transform: back ? "rotateY(180deg)" : undefined,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
