"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Unit } from "@/lib/spectra/types";
import { UNITS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { SpectrumStrip } from "./spectrum";
import { Reveal } from "./blocks";
import { Fmt } from "./format";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · unit page — one flame, examined
   ═══════════════════════════════════════════════════════════════ */

export function UnitPage({
  unit,
  onOpenTopic,
  onBack,
  onOpenUnit,
}: {
  unit: Unit;
  onOpenTopic: (topicId: string) => void;
  onBack: () => void;
  onOpenUnit: (code: string) => void;
}) {
  const revised = useRevised();
  const done = unit.topics.filter((t) => revised.includes(`${unit.code}/${t.id}`)).length;
  const prev = UNITS[unit.index - 2];
  const next = UNITS[unit.index];

  const maxMinutes = Math.max(...unit.topics.map((t) => t.minutes));

  return (
    <div
      className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8"
      style={{ "--flame": unit.color } as React.CSSProperties}
    >
      <Reveal>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Overview
        </button>
      </Reveal>

      {/* ————— header ————— */}
      <Reveal delay={40}>
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-[2px] border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.16em]"
              style={{
                color: unit.color,
                borderColor: `color-mix(in oklab, ${unit.color} 45%, transparent)`,
              }}
            >
              {unit.code}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              {unit.stage} · {unit.topicRange}
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
            {unit.title}
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-[19px] italic leading-relaxed text-ink-2">
            {unit.blurb}
          </p>
        </header>
      </Reveal>

      {/* ————— paper facts ————— */}
      <Reveal delay={80}>
        <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-4">
          {[
            ["Duration", unit.paper.duration],
            ["Paper marks", String(unit.paper.marks)],
            ["Stage weight", unit.paper.stageWeight],
            ["IAL weight", unit.paper.ialWeight],
          ].map(([k, v]) => (
            <div key={k} className="bg-bg-raise px-4 py-3.5">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">{k}</div>
              <div className="mt-1.5 font-mono text-[16px] font-medium text-ink">{v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ————— the element ————— */}
      <Reveal delay={110}>
        <section className="mt-6 rounded-[4px] border border-line bg-bg-raise p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="shrink-0">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3">
                The flame of this unit
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span
                  className="flame-glow text-[64px] font-bold leading-none tracking-tight"
                  style={{ color: unit.color }}
                >
                  {unit.element.symbol}
                </span>
                <div className="pb-1">
                  <div className="text-[15px] text-ink">{unit.element.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: unit.color }}>
                    {unit.element.flameName}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
                    λ {unit.element.nm} nm
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <SpectrumStrip unit={unit} />
              {unit.spectrumNote && (
                <p className="mt-3 max-w-[60ch] text-[12.5px] leading-relaxed text-ink-3">
                  <Fmt text={unit.spectrumNote} />
                </p>
              )}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ————— story ————— */}
      <Reveal delay={130}>
        <p className="mt-9 max-w-[70ch] text-[16px] leading-[1.85] text-ink-2">
          <Fmt text={unit.story} />
        </p>
      </Reveal>

      {/* ————— reading time ————— */}
      <Reveal delay={150}>
        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-3">
              Where the reading time goes
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              {done}/{unit.topics.length} revised
            </span>
          </div>
          <div className="space-y-2.5">
            {unit.topics.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <span className="w-8 shrink-0 font-mono text-[10px] text-ink-3">{t.no}</span>
                <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-panel">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{
                      width: `${(t.minutes / maxMinutes) * 100}%`,
                      background: `linear-gradient(90deg, color-mix(in oklab, ${unit.color} 55%, transparent), ${unit.color})`,
                    }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right font-mono text-[10px] text-ink-3">
                  {t.minutes} min
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ————— topic list ————— */}
      <section className="mt-12">
        <Reveal>
          <h2 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-3">
            {unit.code === "WCH13" || unit.code === "WCH16" ? "The practicals" : "The topics"}
          </h2>
        </Reveal>
        <div className="divide-y divide-line-soft overflow-hidden rounded-[4px] border border-line">
          {unit.topics.map((t, i) => {
            const isRevised = revised.includes(`${unit.code}/${t.id}`);
            return (
              <Reveal key={t.id} delay={Math.min(i, 6) * 40}>
                <button
                  onClick={() => onOpenTopic(t.id)}
                  className="topic-row group flex w-full items-start gap-4 bg-bg px-4 py-4 text-left transition-colors sm:gap-6 sm:px-6"
                  aria-label={`Open ${t.label}: ${t.title}`}
                >
                  <span
                    className="mt-0.5 w-9 shrink-0 font-mono text-[15px] font-semibold"
                    style={{ color: unit.color }}
                  >
                    {t.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
                        {t.label}
                      </span>
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
                        {t.minutes} min · {t.ao.join(" ")}
                      </span>
                    </span>
                    <span className="mt-1 block text-[16px] font-medium leading-snug text-ink transition-colors group-hover:text-flame">
                      {t.title}
                    </span>
                    <span className="mt-1 block max-w-[64ch] text-[13.5px] leading-relaxed text-ink-2">
                      {t.summary}
                    </span>
                  </span>
                  <span className="mt-1 flex shrink-0 items-center gap-3">
                    {isRevised && (
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full border"
                        style={{ borderColor: unit.color, color: unit.color }}
                        title="Revised"
                      >
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                    )}
                    <ArrowRight className="h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-flame" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ————— prev / next unit ————— */}
      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <button
            onClick={() => onOpenUnit(prev.code)}
            className="rounded-[4px] border border-line bg-bg-raise px-5 py-4 text-left transition-colors hover:border-flame"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
              ← previous unit
            </span>
            <span className="mt-1 block text-[14.5px] font-medium text-ink">
              {prev.code} · {prev.shortTitle}
            </span>
          </button>
        ) : (
          <span aria-hidden />
        )}
        {next && (
          <button
            onClick={() => onOpenUnit(next.code)}
            className="rounded-[4px] border border-line bg-bg-raise px-5 py-4 text-right transition-colors hover:border-flame sm:text-right"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
              next unit →
            </span>
            <span className="mt-1 block text-[14.5px] font-medium text-ink">
              {next.code} · {next.shortTitle}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
