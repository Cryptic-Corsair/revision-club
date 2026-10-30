"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NoteSection } from "@/lib/data";

/* ————— hand-drawn primitives ————— */

export function Tick({ size = 22, animated = true, className = "" }: { size?: number; animated?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={`tick ${className}`} aria-hidden="true">
      <path className={animated ? "animated" : ""} d="M8 27 L20 38 L41 9" />
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

export function NoteBlock({ section }: { section: NoteSection }) {
  switch (section.type) {
    case "p":
      return (
        <Row margin={"margin" in section ? section.margin : undefined}>
          <p className="font-body text-[17.5px] leading-[1.8] text-ink/90">{section.text}</p>
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
        <Row margin={"margin" in section ? section.margin : undefined}>
          <div className="border-l-[3px] border-ballpoint bg-paper-card py-4 pl-5 pr-5 my-3">
            <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ballpoint mb-1.5">Definition</p>
            <p className="font-display font-semibold text-[17px]">{section.term}</p>
            <p className="font-body text-[16.5px] leading-[1.75] text-ink/85 mt-1">{section.text}</p>
          </div>
        </Row>
      );
    case "formula":
      return (
        <Row margin={section.margin}>
          <div className="exam-box relative px-6 py-5 my-3">
            <span className="absolute -top-[9px] left-4 bg-paper px-2 font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
              Learn these
            </span>
            <ol className="font-marks text-[15.5px] leading-[2.05] text-ink">
              {section.lines.map((l, i) => (
                <li key={i} className={section.highlight === i ? "bg-hl/60 inline-block px-2 -mx-2 rounded-[2px]" : ""}>
                  <span className="text-ink-faint mr-4 text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                  {l}
                </li>
              ))}
            </ol>
          </div>
        </Row>
      );
    case "examTip":
      return (
        <div className="paper-card border-l-[3px] border-pen px-5 py-4 my-4 flex gap-3.5 items-start max-w-[64ch]">
          <svg viewBox="0 0 24 24" width="18" height="18" className="mt-1 shrink-0 text-pen" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19v-7m0 0l-4-4m4 4l4-4M5 3h14" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep mb-1">Exam tip</p>
            <p className="font-body text-[16px] leading-[1.7] text-ink/90">{section.text}</p>
          </div>
        </div>
      );
    case "mistake":
      return (
        <div className="paper-card border-l-[3px] border-ink-faint px-5 py-4 my-4 flex gap-3.5 items-start max-w-[64ch]">
          <svg viewBox="0 0 24 24" width="18" height="18" className="mt-1 shrink-0 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-1">Common mistake</p>
            <p className="font-body text-[16px] leading-[1.7] text-ink/90">{section.text}</p>
          </div>
        </div>
      );
    case "worked":
      return (
        <div className="exam-box px-6 py-5 my-4 max-w-[64ch]">
          <p className="font-marks text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-3">{section.title}</p>
          {section.body.map((b, i) => (
            <p key={i} className="font-body text-[16px] leading-[1.75] text-ink/90 mb-2.5">
              {b}
            </p>
          ))}
          <p className="font-body text-[16px] mt-3 pt-2.5 border-t border-dashed border-rule">
            <span className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep mr-3">Answer</span>
            <span className="font-semibold">{section.answer}</span>
          </p>
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
                <span className="font-body text-[16px] leading-[1.65] text-ink/90">{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}
