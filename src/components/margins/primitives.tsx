"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NoteSection } from "@/lib/data";
import { useProgress } from "@/lib/progress";
import { MechanismStage } from "./mechanism";

/* ————— hand-drawn primitives ————— */

export function Tick({ size = 22, animated = true, className = "" }: { size?: number; animated?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={`tick ${className}`} aria-hidden="true">
      <path className={animated ? "animated" : ""} d="M8 27 L20 38 L41 9" />
    </svg>
  );
}

export function HandX({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={`hand-x ${className}`} aria-hidden="true">
      <path d="M9 8 C 16 18, 24 26, 32 33" />
      <path d="M32 9 C 24 17, 15 25, 8 32" />
    </svg>
  );
}

export function HandArrow({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M7 5 C 16 12, 26 20, 31 31 M31 31 l-9 -1.5 M31 31 l1.5 -9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="hand-underline">
      {children}
      <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 8 C 55 11, 115 3, 168 6 S 262 10, 297 5" />
      </svg>
    </span>
  );
}

export function GradeCircle({ children }: { children: ReactNode }) {
  return (
    <span className="grade-circle">
      {children}
      <svg viewBox="0 0 120 72" preserveAspectRatio="none" aria-hidden="true">
        <path d="M62 6 C 100 4, 116 18, 114 36 C 112 58, 84 68, 52 66 C 22 64, 4 52, 6 32 C 8 12, 34 4, 74 7" />
      </svg>
    </span>
  );
}

/* ————— chemistry typesetting: _{...} → <sub>, ^{...} → <sup> ————— */

export function parseChem(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /([_^])\{([^}]*)\}/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const content = m[2];
    parts.push(
      m[1] === "_" ? (
        <sub key={key++}>{content}</sub>
      ) : (
        <sup key={key++}>{content}</sup>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function Formula({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}>{parseChem(text)}</span>;
}

export function Stamp({
  children,
  graphite = false,
  pressed = false,
  className = "",
}: {
  children: ReactNode;
  graphite?: boolean;
  pressed?: boolean;
  className?: string;
}) {
  return (
    <span className={`stamp ${graphite ? "stamp--graphite" : ""} ${pressed ? "stamp--pressed" : ""} ${className}`}>
      {children}
    </span>
  );
}

export function MarginNote({ children, arrow = false, className = "" }: { children: ReactNode; arrow?: boolean; className?: string }) {
  return (
    <span className={`margin-note inline-block ${className}`}>
      {children}
      {arrow && <HandArrow size={22} className="inline-block ml-1 -mb-1 text-pen" />}
    </span>
  );
}

export function Mcq({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className="mcq" data-active={active} onClick={onClick} aria-pressed={active}>
      <span className="bubble" aria-hidden="true" />
      {label}
    </button>
  );
}

export function MarkChip({ children }: { children: ReactNode }) {
  return <span className="mark-chip">{children}</span>;
}

/* ————— interactive: exam-question quiz with marking ————— */

export function QuizBlock({
  question,
  options,
  answer,
  explain,
  quizId,
}: {
  question: string;
  options: string[];
  answer: number;
  explain: string;
  quizId?: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const solved = picked === answer;
  const { recordQuiz } = useProgress();

  useEffect(() => {
    if (quizId && picked !== null) recordQuiz(quizId, picked === answer);
  }, [picked, quizId, answer, recordQuiz]);

  return (
    <div className="exam-box relative px-6 py-5 my-5 max-w-[64ch]">
      <span className="absolute -top-[9px] left-4 bg-paper px-2 font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep">
        Test yourself · 1 mark
      </span>
      <p className="font-body text-[16.5px] leading-[1.7] text-ink mb-4">
        <span className="font-marks text-[12px] text-pen-deep mr-2.5">Q.</span>
        {parseChem(question)}
      </p>
      <div className="grid gap-1.5" role="group" aria-label="Answer choices">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setPicked(i)}
              aria-pressed={isPicked}
              className={`group flex items-center gap-3.5 px-3.5 py-2.5 rounded-[2px] text-left border transition-all duration-150 ${
                isPicked
                  ? solved
                    ? "border-pen/60 bg-hl/40"
                    : "border-pen/45 bg-paper-deep/70"
                  : "border-transparent hover:border-rule hover:bg-paper-deep/40"
              }`}
            >
              <span
                className={`font-marks text-[11px] w-6 h-6 shrink-0 grid place-items-center border rounded-full transition-colors ${
                  isPicked ? "border-pen text-pen-deep bg-paper" : "border-rule text-ink-faint group-hover:border-ink-faint"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-body text-[15.5px] leading-snug text-ink/90 flex-1">{parseChem(opt)}</span>
              {isPicked && solved && <Tick size={20} className="shrink-0 -rotate-6" />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-4 pt-3.5 border-t border-dashed border-rule flex items-start gap-3">
          {solved ? (
            <>
              <span className="mt-0.5 shrink-0"><GradeCircle><span className="font-marks text-[11px] font-semibold text-pen-deep px-0.5">1 / 1</span></GradeCircle></span>
              <p className="font-body text-[15px] leading-[1.65] text-ink/85">{parseChem(explain)}</p>
            </>
          ) : (
            <>
              <span className="mt-1 shrink-0"><HandX size={17} /></span>
              <p className="font-body text-[15px] leading-[1.65] text-ink-soft">
                Not this one — the examiner is still waiting. Try again.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ————— scroll reveal (lightweight) ————— */

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // failsafe: never leave content invisible (no IO, print, odd embeds)
    const fallback = window.setTimeout(() => el.classList.add("is-in"), 2200);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          window.clearTimeout(fallback);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ————— exam-paper section heading ————— */

export function SectionHead({
  section,
  title,
  instruction,
}: {
  section: string;
  title: string;
  instruction?: string;
}) {
  return (
    <div className="mb-10">
      <p className="instruction mb-3 text-pen">{section}</p>
      <h2 className="font-display text-3xl md:text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.01em]">{title}</h2>
      {instruction && (
        <p className="font-marks text-[12.5px] italic uppercase tracking-[0.14em] text-ink-faint mt-3">{instruction}</p>
      )}
      <div className="double-rule mt-6" aria-hidden="true" />
    </div>
  );
}

/* ————— notes: section renderer with margin gutter ————— */

function Row({ margin, children }: { margin?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 xl:grid-cols-[186px_minmax(0,64ch)] xl:gap-0">
      <div className="order-2 xl:order-1 xl:pr-8 xl:text-right xl:pt-1">
        {margin && (
          <MarginNote arrow className="xl:float-right">
            {margin}
          </MarginNote>
        )}
      </div>
      <div className="order-1 xl:order-2">{children}</div>
    </div>
  );
}

export function NoteBlock({ section, quizId, goWallchart }: { section: NoteSection; quizId?: string; goWallchart?: () => void }) {
  switch (section.type) {
    case "p":
      return (
        <Row margin={section.margin}>
          <p className="font-body text-[17.5px] leading-[1.8] text-ink/90">{parseChem(section.text)}</p>
        </Row>
      );
    case "h2":
      return (
        <Row margin={section.margin}>
          <h2 className="font-display text-[1.7rem] font-semibold leading-tight pt-4">{section.text}</h2>
        </Row>
      );
    case "definition":
      return (
        <Row margin={section.margin}>
          <div className="border-l-[3px] border-ballpoint bg-paper-card py-4 pl-5 pr-5 my-3">
            <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ballpoint mb-1.5">Definition</p>
            <p className="font-display font-semibold text-[17px]">{section.term}</p>
            <p className="font-body text-[16.5px] leading-[1.75] text-ink/85 mt-1">{parseChem(section.text)}</p>
          </div>
        </Row>
      );
    case "formula":
      return (
        <Row margin={section.margin}>
          <div className="exam-box relative px-6 py-5 my-3">
            <span className="absolute -top-[9px] left-4 bg-paper px-2 font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
              {section.caption ?? "Learn these"}
            </span>
            <ol className="font-marks text-[15.5px] leading-[2.05] text-ink">
              {section.lines.map((l, i) => (
                <li key={i} className={section.highlight === i ? "bg-hl/60 inline-block px-2 -mx-2 rounded-[2px]" : ""}>
                  <span className="text-ink-faint mr-4 text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                  {parseChem(l)}
                </li>
              ))}
            </ol>
          </div>
        </Row>
      );
    case "table":
      return (
        <Row margin={section.margin}>
          <div className="exam-box relative px-5 py-5 my-3 overflow-x-auto">
            <span className="absolute -top-[9px] left-4 bg-paper px-2 font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
              {section.caption ?? "Data"}
            </span>
            <table className="font-marks text-[14px] border-collapse w-full min-w-[420px]">
              <thead>
                <tr>
                  {section.head.map((h, i) => (
                    <th key={i} className={`pb-2 pt-1 text-[11px] uppercase tracking-[0.12em] text-ink-faint font-medium ${i === 0 ? "text-left" : "text-right pr-1"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-dashed border-rule">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`py-2.5 pr-1 ${ci === 0 ? "text-left font-body text-[15px] text-ink/85" : "text-right tabular-nums"}`}>
                        {ci === 0 ? cell : parseChem(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      );
    case "practical":
      return (
        <Row margin={section.margin}>
          <div className="paper-card border-l-[3px] border-ink px-5 py-4.5 py-5 my-3">
            <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ink mb-3 flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 3h6M10 3v6.3L5.6 17A2.5 2.5 0 0 0 7.9 20.5h8.2A2.5 2.5 0 0 0 18.4 17L14 9.3V3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 14h9" strokeLinecap="round" />
              </svg>
              Practical · {section.title}
            </p>
            <ol className="space-y-2.5">
              {section.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="font-marks text-[10.5px] text-pen-deep border border-pen/40 rounded-[2px] px-1.5 py-0.5 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[15.5px] leading-[1.65] text-ink/90">{parseChem(s)}</span>
                </li>
              ))}
            </ol>
          </div>
        </Row>
      );
    case "examTip":
      return (
        <Row margin={"margin" in section ? section.margin : undefined}>
          <div className="paper-card border-l-[3px] border-pen px-5 py-4 my-4 flex gap-3.5 items-start">
            <svg viewBox="0 0 24 24" width="18" height="18" className="mt-1 shrink-0 text-pen" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 19v-7m0 0l-4-4m4 4l4-4M5 3h14" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep mb-1">Exam tip</p>
              <p className="font-body text-[16px] leading-[1.7] text-ink/90">{parseChem(section.text)}</p>
            </div>
          </div>
        </Row>
      );
    case "mistake":
      return (
        <div className="paper-card border-l-[3px] border-ink-faint px-5 py-4 my-4 flex gap-3.5 items-start max-w-[64ch]">
          <svg viewBox="0 0 24 24" width="18" height="18" className="mt-1 shrink-0 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-1">Common mistake</p>
            <p className="font-body text-[16px] leading-[1.7] text-ink/90">{parseChem(section.text)}</p>
          </div>
        </div>
      );
    case "worked":
      return (
        <div className="exam-box px-6 py-5 my-4 max-w-[64ch]">
          <p className="font-marks text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-3">{section.title}</p>
          {section.body.map((b, i) => (
            <p key={i} className="font-body text-[16px] leading-[1.75] text-ink/90 mb-2.5">
              {parseChem(b)}
            </p>
          ))}
          {section.marks && (
            <ul className="mt-3.5 space-y-2">
              {section.marks.map((mk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <MarkChip>{mk.chip}</MarkChip>
                  <span className="font-body text-[15px] leading-[1.6] text-ink/80">{parseChem(mk.text)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="font-body text-[16px] mt-3 pt-2.5 border-t border-dashed border-rule">
            <span className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep mr-3">Answer</span>
            <span className="font-semibold">{parseChem(section.answer)}</span>
          </p>
        </div>
      );
    case "quiz":
      return <QuizBlock {...section} quizId={quizId} />;
    case "mechanism":
      return (
        <Row margin={section.margin}>
          <div>
            {section.caption && (
              <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-2">{section.caption}</p>
            )}
            <MechanismStage figure={section.figure} />
          </div>
        </Row>
      );
    case "ref":
      return (
        <div className="my-4 max-w-[64ch]">
          <div className="paper-card border-l-[3px] border-ballpoint px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="font-body text-[16px] text-ink/90">{section.text}</p>
            {section.to === "wallchart" && (
              <button type="button" onClick={goWallchart} className="balllink font-body text-[15.5px] shrink-0">
                Open the wallchart →
              </button>
            )}
          </div>
        </div>
      );
    case "keyPoints":
      return (
        <div className="paper-card px-6 py-5 my-6 max-w-[64ch]">
          <p className="font-marks text-[11px] uppercase tracking-[0.18em] text-pen-deep mb-4">Mark scheme recap</p>
          <ul className="space-y-3">
            {section.items.map((it, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <MarkChip>{it.chip}</MarkChip>
                <span className="font-body text-[16px] leading-[1.65] text-ink/90">{parseChem(it.text)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}
