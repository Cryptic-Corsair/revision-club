"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BookMarked,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Footprints,
  Gamepad2,
  Info,
  Lightbulb,
  PartyPopper,
  Sparkles,
  Timer,
} from "./icons";
import type { Block } from "@/lib/spectra/types";
import { Fmt } from "./format";
import { Mascot, SpeechBubble, tint, shade, Reveal, readableInk } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · blocks — topic content blocks
   p · def (term cards) · eq (equation pills) ·
   ex (worked examples) · tips · table · check (checkpoint) · recap
   ═══════════════════════════════════════════════════════════════ */

export function TopicBlocks({ blocks, main }: { blocks: Block[]; main: string }) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((b, i) => (
        <Reveal key={i} delay={Math.min(i * 0.04, 0.24)} y={20}>
          <BlockView block={b} main={main} flip={i % 2 === 1} />
        </Reveal>
      ))}
    </div>
  );
}

function BlockView({ block: b, main, flip }: { block: Block; main: string; flip: boolean }) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[16.5px] leading-[1.85] text-ink/90">
          <Fmt text={b.text} />
        </p>
      );

    case "def":
      return (
        <div
          className={`puff-lift relative rounded-[26px] bg-paper p-5 pr-6 puff sm:p-6 ${
            flip ? "rotate-[0.7deg]" : "rotate-[-0.7deg]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
              style={{ background: tint(main, 16) }}
            >
              <BookMarked className="h-5 w-5" style={{ color: shade(main, 62) }} />
            </span>
            <h4 className="font-display text-[19px] font-semibold text-ink">
              <Fmt text={b.term} />
            </h4>
          </div>
          <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </div>
      );

    case "eq":
      return (
        <div
          className="rounded-[26px] p-5 sm:p-6"
          style={{ background: tint(main, 10) }}
        >
          {b.title && (
            <div
              className="mb-3 inline-flex -rotate-1 items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[12px] font-semibold tracking-[0.14em] text-white uppercase"
              style={{ background: main }}
            >
              <Lightbulb className="h-3.5 w-3.5" /> {b.title}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
            {b.eq.split(/\s{2,}/).map((part, i) => (
              <span
                key={i}
                className="rounded-2xl bg-paper px-4 py-2.5 font-mono text-[15px] font-semibold text-ink shadow-[0_3px_0_rgb(61_43_31/0.06)]"
              >
                <Fmt text={part.trim()} />
              </span>
            ))}
          </div>
          {b.ok && b.ok.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-2">
              {b.ok.map((o, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper/70 px-3 py-1 text-[12.5px] font-bold text-ink"
                >
                  <BadgeCheck className="h-4 w-4" style={{ color: main }} />
                  <Fmt text={o} />
                </span>
              ))}
            </div>
          )}
          {b.note && (
            <p className="mt-3 flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: shade(main, 62) }} />
              <span>
                <Fmt text={b.note} />
              </span>
            </p>
          )}
        </div>
      );

    case "ex":
      return <WorkedExample title={b.title} steps={b.steps} answer={b.answer} main={main} />;

    case "tips":
      return (
        <div className="flex items-end gap-2 sm:gap-3">
          <div className="shrink-0 pb-1">
            <Mascot main={main} size={86} bubbles={false} />
          </div>
          <SpeechBubble
            bg={tint("#FF922B", 12)}
            className="min-w-0 flex-1"
            tailClass="left-[-9px] rotate-[135deg]"
          >
            <div className="mb-1.5 font-display text-[12px] font-bold tracking-[0.18em] text-tangerine uppercase">
              Tips
            </div>
            <ul className="flex flex-col gap-1.5">
              {b.items.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-[14.5px] leading-[1.65] text-ink">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-tangerine" />
                  <span>
                    <Fmt text={t} />
                  </span>
                </li>
              ))}
            </ul>
          </SpeechBubble>
        </div>
      );

    case "table":
      return <CandyTable head={b.head} rows={b.rows} caption={b.caption} main={main} />;

    case "check":
      return <Checkpoint qs={b.qs} main={main} />;

    case "recap":
      return (
        <div className="rotate-[-0.5deg] rounded-[30px] bg-cocoa p-6 text-milk sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
              <Timer className="h-5 w-5 text-lemon" />
            </span>
            <h4 className="font-display text-[19px] font-semibold text-milk">
              Quick recap
            </h4>
          </div>
          <ol className="flex flex-col gap-3">
            {b.items.map((t, i) => {
              const dots = ["#FF6B6B", "#FF922B", "#FFD43B", "#12B886", "#9775FA", "#F59F00"];
              return (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-[13px] font-bold"
                    style={{ background: dots[i % dots.length], color: readableInk(dots[i % dots.length]) }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-[1.7] text-milk/90">
                    <Fmt text={t} />
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      );

    default:
      return null;
  }
}

/* ————— worked example: a drop-down staircase —————
   The question stands alone; "Show steps" unfurls the climb and
   the answer, "Hide steps" folds it back to one tidy card. */

function WorkedExample({
  title,
  steps,
  answer,
  main,
}: {
  title: string;
  steps: string[];
  answer: string;
  main: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[28px] bg-paper p-5 puff sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
          style={{ background: tint(main, 16) }}
        >
          <Footprints className="h-5 w-5" style={{ color: shade(main, 62) }} />
        </span>
        <h4 className="min-w-0 flex-1 font-display text-[19px] font-semibold text-ink">
          <Fmt text={title} />
        </h4>
      </div>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[14px] font-semibold text-white"
        style={{ background: main, boxShadow: `0 4px 0 ${shade(main)}` }}
      >
        {open ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        {open ? "Hide steps" : "Show steps"}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                    delay: 0.05 + i * 0.06,
                  }}
                  style={{ marginLeft: `min(${i * 14}px, 56px)` }}
                >
                  {i > 0 && <div className="dot-line mb-1 ml-6 h-4" aria-hidden />}
                  <div
                    className="inline-flex max-w-full items-start gap-2.5 rounded-[18px] px-4 py-2.5 text-[14.5px] leading-[1.6] text-ink"
                    style={{ background: tint(main, 9) }}
                  >
                    <span
                      className="mt-0.5 grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full font-display text-[11px] font-bold text-white"
                      style={{ background: main, width: 22, height: 22 }}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <Fmt text={s} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 16,
                delay: 0.1 + steps.length * 0.06,
              }}
              className="mt-4 flex items-start gap-2.5 rounded-full bg-paper px-4 py-3 text-[15px] font-bold text-ink shadow-[0_4px_0_rgb(61_43_31/0.07)] sm:items-center"
              style={{ borderLeft: `6px solid ${main}` }}
            >
              <PartyPopper className="h-5 w-5 shrink-0" style={{ color: main }} />
              <span>
                <Fmt text={answer} />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ————— candy table: soft, rounded, no gridline torture ————— */

function CandyTable({
  head,
  rows,
  caption,
  main,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
  main: string;
}) {
  return (
    <div>
      {caption && (
        <div className="mb-3 inline-flex rotate-[-1.2deg] items-center gap-2 rounded-full px-4 py-1.5 font-display text-[12.5px] font-semibold text-white" style={{ background: main }}>
          <Sparkles className="h-3.5 w-3.5" />
          <Fmt text={caption} />
        </div>
      )}
      <div className="overflow-hidden rounded-[26px] bg-paper puff">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr style={{ background: tint(main, 15) }}>
                {head.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3.5 font-display text-[13px] font-semibold tracking-[0.08em] whitespace-nowrap text-ink uppercase sm:px-5"
                  >
                    <Fmt text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t-[2.5px] border-dashed border-ink/10"
                  style={{ background: i % 2 === 1 ? tint(main, 4) : undefined }}
                >
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3.5 align-top text-[14.5px] leading-[1.6] sm:px-5 ${
                        j === 0 ? "font-extrabold text-ink" : "text-ink-soft"
                      }`}
                    >
                      <Fmt text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ————— checkpoint quiz: flip cards —————
   Question on the front, answer on the back, one fat 3D flip
   between them — a card, not a fold. Tap the card or the button. */

function Checkpoint({ qs, main }: { qs: { q: string; a: string }[]; main: string }) {
  const [flipped, setFlipped] = useState<number[]>([]);

  const flip = (i: number) =>
    setFlipped((arr) => (arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i]));

  return (
    <div className="rounded-[30px] p-5 sm:p-6" style={{ background: tint(main, 9) }}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-paper">
          <Gamepad2 className="h-5 w-5" style={{ color: main }} />
        </span>
        <h4 className="font-display text-[19px] font-semibold text-ink">Checkpoint</h4>
        <span className="ml-auto hidden rounded-full bg-paper/70 px-3 py-1 text-[12px] font-bold text-ink-soft sm:block">
          {flipped.length}/{qs.length} revealed
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {qs.map((qa, i) => (
          <CheckCard
            key={i}
            q={qa.q}
            a={qa.a}
            main={main}
            index={i}
            isFlipped={flipped.includes(i)}
            onFlip={() => flip(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* one flip card: front = the question, back = the answer.
   Both faces share one grid cell, so the card always fits the
   taller of the two — long answers never spill out. */

function CheckCard({
  q,
  a,
  main,
  index,
  isFlipped,
  onFlip,
}: {
  q: string;
  a: string;
  main: string;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div className="[perspective:1400px]">
      <motion.div
        className="relative grid [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* front — the question */}
        <div
          className="flex min-h-[148px] flex-col rounded-[22px] bg-paper p-4 [grid-area:1/1] sm:p-5"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "0 3px 0 color-mix(in oklab, var(--color-ink) 6%, transparent)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full font-display text-[11px] font-bold"
              style={{ background: main, color: readableInk(main) }}
            >
              {index + 1}
            </span>
            <span className="ml-auto text-[11px] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
              tap to flip
            </span>
          </div>
          <p className="mt-3 flex-1 text-[15.5px] leading-[1.65] font-bold text-ink">
            <Fmt text={q} />
          </p>
          <div className="pt-3">
            <motion.button
              type="button"
              onClick={onFlip}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-display text-[13px] font-semibold text-white"
              style={{ background: main, boxShadow: `0 3px 0 ${shade(main)}` }}
            >
              <Eye className="h-4 w-4" /> Reveal answer
            </motion.button>
          </div>
        </div>

        {/* back — the answer */}
        <div
          className="flex min-h-[148px] flex-col rounded-[22px] bg-paper p-4 [grid-area:1/1] sm:p-5"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "0 3px 0 color-mix(in oklab, var(--color-ink) 6%, transparent)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 font-display text-[11px] font-bold tracking-[0.12em] text-mint uppercase">
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> answer
            </span>
          </div>
          <p
            className="mt-3 flex-1 rounded-[16px] px-3.5 py-2.5 text-[14.5px] leading-[1.7] text-ink"
            style={{ background: tint("#12B886", 10) }}
          >
            <Fmt text={a} />
          </p>
          <div className="pt-3">
            <motion.button
              type="button"
              onClick={onFlip}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-h-[36px] cursor-pointer items-center gap-2 rounded-full bg-ink/5 px-4 py-2 text-[12.5px] font-bold text-ink-soft"
            >
              <EyeOff className="h-4 w-4" /> Flip back
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* the whole card is clickable while it shows the question */}
      {!isFlipped && (
        <button
          type="button"
          aria-label={`Reveal answer ${index + 1}`}
          onClick={onFlip}
          className="absolute inset-0 cursor-pointer rounded-[22px]"
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  );
}
