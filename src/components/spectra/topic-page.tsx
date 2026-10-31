"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import type { Topic, Unit } from "@/lib/spectra/types";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { TopicBlocks } from "./blocks";
import { Fmt } from "./format";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · topic reader — the observation deck
   ═══════════════════════════════════════════════════════════════ */

export function TopicPage({
  unit,
  topic,
  onBack,
  onOpenTopic,
}: {
  unit: Unit;
  topic: Topic;
  onBack: () => void;
  onOpenTopic: (topicId: string) => void;
}) {
  const revised = useRevised();
  const key = `${unit.code}/${topic.id}`;
  const isRevised = revised.includes(key);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const idx = unit.topics.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? unit.topics[idx - 1] : undefined;
  const next = idx < unit.topics.length - 1 ? unit.topics[idx + 1] : undefined;

  return (
    <div
      className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8"
      style={{ "--flame": unit.color } as React.CSSProperties}
    >
      {/* reading progress */}
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent" aria-hidden>
        <div
          className="h-full transition-[width] duration-150"
          style={{ width: `${progress * 100}%`, background: unit.color, boxShadow: `0 0 8px ${unit.color}` }}
        />
      </div>

      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {unit.code}
      </button>

      {/* ————— header ————— */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span style={{ color: unit.color }}>{topic.label}</span>
          <span className="text-ink-3">·</span>
          <span className="text-ink-3">{topic.minutes} min</span>
          <span className="text-ink-3">·</span>
          <span className="text-ink-3">{topic.ao.join(" / ")}</span>
        </div>
        <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          {topic.title}
        </h1>
        <p className="mt-3 max-w-[62ch] font-serif text-[17.5px] italic leading-relaxed text-ink-2">
          {topic.summary}
        </p>
        <div className="tick-rule mt-8 h-[6px] w-full opacity-60" aria-hidden />
      </header>

      {/* ————— content ————— */}
      <div className="mt-10">
        <TopicBlocks blocks={topic.blocks} idPrefix={`${unit.code}-${topic.id}`} />
      </div>

      {/* ————— revised? ————— */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={() => toggleRevised(key)}
          aria-pressed={isRevised}
          className={`group inline-flex items-center gap-3 rounded-[4px] border px-6 py-3.5 transition-all ${
            isRevised
              ? "border-transparent"
              : "border-line bg-bg-raise hover:border-flame"
          }`}
          style={isRevised ? { background: `color-mix(in oklab, ${unit.color} 14%, var(--bg))`, borderColor: unit.color } : undefined}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: isRevised ? unit.color : "var(--line)",
              background: isRevised ? unit.color : "transparent",
            }}
          >
            {isRevised && <Check className="h-3 w-3 text-bg" strokeWidth={3} />}
          </span>
          <span className="text-[14px] text-ink">
            {isRevised ? "Revised — noted in your progress" : "Mark this topic as revised"}
          </span>
        </button>
      </div>

      {/* ————— turn back / turn over ————— */}
      <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Topic navigation">
        {prev ? (
          <button
            onClick={() => onOpenTopic(prev.id)}
            className="turn-card rounded-[4px] border border-line bg-bg-raise px-5 py-4 text-left"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
              ← turn back
            </span>
            <span className="mt-1 block font-mono text-[10px] text-ink-3">{prev.label}</span>
            <span className="mt-0.5 block text-[14.5px] font-medium text-ink">{prev.title}</span>
          </button>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
        {next ? (
          <button
            onClick={() => onOpenTopic(next.id)}
            className="turn-card rounded-[4px] border border-line bg-bg-raise px-5 py-4 text-right sm:col-start-2"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
              turn over →
            </span>
            <span className="mt-1 block font-mono text-[10px] text-ink-3">{next.label}</span>
            <span className="mt-0.5 block text-[14.5px] font-medium text-ink">{next.title}</span>
          </button>
        ) : (
          <button
            onClick={onBack}
            className="turn-card rounded-[4px] border border-line bg-bg-raise px-5 py-4 text-right sm:col-start-2"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
              end of unit →
            </span>
            <span className="mt-0.5 block text-[14.5px] font-medium text-ink">
              Back to {unit.code}
            </span>
          </button>
        )}
      </nav>

      <p className="mt-10 text-center font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3">
        <Fmt text={`==${unit.code}== · ${unit.title} · written to the 2018 specification`} />
      </p>
    </div>
  );
}
