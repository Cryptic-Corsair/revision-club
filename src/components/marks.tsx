"use client";

import { useEffect, useId, useState } from "react";
import { CHEMISTRY, NOTES } from "@/lib/data";
import { useProgress } from "@/lib/progress";
import { GradeCircle, Reveal, Stamp } from "./margins/primitives";

/* ————— test-tube progress meter ————— */
function TestTube({ frac }: { frac: number }) {
  const id = useId().replace(/[:]/g, "");
  const TUBE = "M 5 4 H 17 V 40 A 6 6 0 0 1 5 40 Z";
  const top = 46 - Math.max(0, Math.min(1, frac)) * 38;
  return (
    <svg width="22" height="52" viewBox="0 0 22 52" aria-hidden="true" className="shrink-0 overflow-visible">
      <defs>
        <clipPath id={`tube-${id}`}>
          <path d={TUBE} />
        </clipPath>
      </defs>
      <g clipPath={`url(#tube-${id})`}>
        {frac > 0 && (
          <>
            <rect x="0" y={top} width="22" height="52" fill="rgba(191,59,43,0.72)" />
            <circle className="bubble b1" cx="9" cy={top + 5} r="1.5" fill="var(--paper-card)" />
            <circle className="bubble b2" cx="13" cy={top + 12} r="1.1" fill="var(--paper-card)" />
          </>
        )}
      </g>
      <path d={TUBE} fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
      <line x1="2" y1="4" x2="20" y2="4" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ————— examiner's tally marks ————— */
function Tally({ n }: { n: number }) {
  if (n === 0) return <span className="font-marks text-[12px] text-ink-faint">—</span>;
  const groups = Math.floor(n / 5);
  const rest = n % 5;
  return (
    <span className="inline-flex items-center gap-2.5 flex-wrap">
      {Array.from({ length: groups }, (_, i) => (
        <span key={i} className="tally-group" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <b />
        </span>
      ))}
      {rest > 0 && (
        <span className="inline-flex gap-[3.5px]" aria-hidden="true">
          {Array.from({ length: rest }, (_, i) => (
            <i key={i} className="tally-bar" />
          ))}
        </span>
      )}
      <span className="sr-only">{n}</span>
    </span>
  );
}

function quizStats(unitSlug: string) {
  let total = 0;
  const ids: string[] = [];
  Object.entries(NOTES).forEach(([key, note]) => {
    if (!key.startsWith(`${unitSlug}/`)) return;
    note.sections.forEach((s, i) => {
      if (s.type === "quiz") {
        total += 1;
        ids.push(`${key}#q${i}`);
      }
    });
  });
  return { total, ids };
}

export function MarkSheet({ openTopic }: { openTopic: (unit: string, topic: string) => void }) {
  const { progress, setName, reset } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const liveTopics = CHEMISTRY.units.flatMap((u) =>
    u.topics.filter((t) => t.status === "live").map((t) => ({ unit: u.slug, ...t }))
  );
  const totalLive = liveTopics.length;
  const revisedCount = mounted ? liveTopics.filter((t) => progress.revised.includes(`${t.unit}/${t.slug}`)).length : 0;

  const allQuizIds = CHEMISTRY.units.flatMap((u) => quizStats(u.slug).ids);
  const quizTotal = allQuizIds.length;
  const quizSolved = mounted ? allQuizIds.filter((id) => progress.quiz[id]?.correct).length : 0;

  const frac = totalLive ? revisedCount / totalLive : 0;
  const comment =
    revisedCount === 0
      ? "A blank paper. Begin at Unit 1 — the mole opens every door."
      : frac < 0.34
        ? "A careful start. Tick as you go — the sheet fills faster than you think."
        : frac < 0.67
          ? "Steady progress. Now attack the unit you keep avoiding."
          : frac < 1
            ? "Strong paper. The last topics are the cheapest marks left on this sheet."
            : "Full marks for effort. On to past papers — timed, then marked.";

  const nextTopic = liveTopics.find((t) => !mounted || !progress.revised.includes(`${t.unit}/${t.slug}`));

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-14 pb-8">
      <Reveal>
        <div className="mb-10">
          <p className="instruction mb-3 text-pen">Section D · The mark sheet</p>
          <h1 className="font-display font-semibold text-[2.4rem] md:text-[3rem] leading-[1.05] tracking-[-0.015em] mb-4">
            Your progress, marked by hand
          </h1>
          <p className="font-body text-[18px] leading-[1.7] text-ink-soft max-w-[62ch]">
            Tick topics as you revise them and the quizzes mark themselves — this cover sheet fills in
            like a real one. Everything stays on this device; nothing is sent anywhere.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="paper-card paper-card--stacked rotate-[0.4deg] px-6 md:px-9 py-7 md:py-9 max-w-[820px]">
          {/* cover head */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
            <div>
              <p className="font-marks text-[11px] uppercase tracking-[0.2em] text-pen-deep">Axiom · IAL Chemistry</p>
              <p className="font-display font-semibold text-[22px] mt-1">Candidate mark sheet</p>
            </div>
            <div className="flex flex-col items-end gap-2.5">
              <Stamp pressed>Marked by hand</Stamp>
              <p className="font-marks text-[11px] tracking-[0.12em] text-ink-faint">
                {mounted ? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "· · ·"}
              </p>
            </div>
          </div>

          {/* candidate fields */}
          <div className="grid sm:grid-cols-[1fr_auto_auto] gap-5 sm:gap-8 mb-2">
            <label className="block">
              <span className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint block mb-1">
                Candidate name
              </span>
              <input
                value={mounted ? progress.name : ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="sign here"
                className="candidate-input w-full"
                aria-label="Candidate name"
              />
            </label>
            <div>
              <span className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint block mb-1">Centre no.</span>
              <p className="font-marks text-[15px] text-ink tracking-[0.1em] border-b border-dashed border-rule pb-1.5 px-2">AX·01</p>
            </div>
            <div>
              <span className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint block mb-1">Paper</span>
              <p className="font-marks text-[15px] text-ink tracking-[0.1em] border-b border-dashed border-rule pb-1.5 px-2">WCH/24</p>
            </div>
          </div>

          <div className="double-rule mt-6 mb-2" aria-hidden="true" />

          {/* per-unit rows */}
          <div className="divide-y divide-dashed divide-rule">
            {CHEMISTRY.units.map((u) => {
              const live = u.topics.filter((t) => t.status === "live");
              const revised = mounted ? live.filter((t) => progress.revised.includes(`${u.slug}/${t.slug}`)).length : 0;
              const q = quizStats(u.slug);
              const qSolved = mounted ? q.ids.filter((id) => progress.quiz[id]?.correct).length : 0;
              const f = live.length ? revised / live.length : 0;
              return (
                <div key={u.slug} className="py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <TestTube frac={f} />
                  <div className="min-w-[190px] flex-1">
                    <p className="font-display font-semibold text-[17px] leading-snug">{u.name}</p>
                    <p className="font-marks text-[10.5px] uppercase tracking-[0.12em] text-ink-faint mt-0.5">
                      {u.code} · {live.length} live {u.practical ? "· practical paper" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tally n={revised} />
                    <span className="font-marks text-[12px] text-ink-soft tabular-nums">
                      {revised}/{live.length}
                    </span>
                  </div>
                  <div className="font-marks text-[12px] text-ink-soft tabular-nums whitespace-nowrap">
                    quiz {qSolved}/{q.total}
                  </div>
                  {live.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        openTopic(
                          u.slug,
                          (live.find((t) => !progress.revised.includes(`${u.slug}/${t.slug}`)) ?? live[0]).slug
                        )
                      }
                      className="font-marks text-[11px] uppercase tracking-[0.12em] text-pen-deep hover:text-ink transition-colors"
                    >
                      next ▸
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* totals */}
          <div className="double-rule mt-4" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <div>
                <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-1">Topics revised</p>
                <p className="font-marks text-[18px] text-ink tabular-nums">
                  {revisedCount}
                  <span className="text-ink-faint"> / {totalLive}</span>
                </p>
              </div>
              <div>
                <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-1">Quiz marks</p>
                <p className="font-marks text-[18px] text-ink tabular-nums">
                  {quizSolved}
                  <span className="text-ink-faint"> / {quizTotal}</span>
                </p>
              </div>
              <div>
                <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-1">Up next</p>
                <button
                  type="button"
                  disabled={!nextTopic}
                  onClick={() => nextTopic && openTopic(nextTopic.unit, nextTopic.slug)}
                  className="font-body text-[16px] balllink disabled:opacity-50 disabled:no-underline text-left"
                >
                  {nextTopic ? `${nextTopic.title} ▸` : "everything ticked ✓"}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint">Total</p>
              <GradeCircle>
                <span className="font-marks text-[19px] font-semibold text-pen-deep tabular-nums px-1">
                  {revisedCount}/{totalLive}
                </span>
              </GradeCircle>
            </div>
          </div>

          {/* teacher comment + signature */}
          <div className="mt-7 pt-5 border-t border-dashed border-rule">
            <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-2">Examiner's comment</p>
            <div className="flex items-end justify-between gap-6">
              <p className="margin-note text-[19px] max-w-[46ch]">{comment}</p>
              <svg width="92" height="30" viewBox="0 0 92 30" className="shrink-0" aria-label="signature">
                <path
                  d="M4 22 C 10 8, 16 8, 20 18 C 24 28, 30 26, 33 14 C 36 4, 42 6, 44 16 C 46 26, 52 24, 56 12 C 59 5, 63 8, 64 15 C 65 22, 70 20, 76 13 C 80 9, 85 10, 89 12"
                  fill="none"
                  stroke="var(--blue)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 max-w-[820px]">
          <button
            type="button"
            onClick={reset}
            className="font-marks text-[11.5px] uppercase tracking-[0.14em] text-ink-faint hover:text-pen-deep transition-colors"
          >
            start a fresh paper ↺
          </button>
          <p className="font-marks text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            saved on this device only · {mounted ? progress.revised.length : 0} ticks recorded
          </p>
        </div>
      </Reveal>
    </div>
  );
}
