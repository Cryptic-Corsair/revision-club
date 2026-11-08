"use client";

import { useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  Check,
  Sparkles,
} from "./icons";
import type { Block, Topic, Unit } from "@/lib/spectra/types";
import { toggleRevised, useRevised } from "@/lib/spectra/progress";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { Fmt } from "./format";
import { PopIn, Reveal, SoftButton } from "./bits";
import { accentOf } from "./bands";
import { EditorialLabel, EditorialTable } from "./sample-blocks";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the topic reader, in the editorial dress.
   The same stop on the trail — same blocks, same revised toggle,
   same deep link into the full note — set as a document: the
   disclaimer page's hero, the note CTA as an exhibit, the blocks
   re-set editorially (TopicBlockView below, the topic Block
   vocabulary's counterpart of SampleBlockView), and the mark as
   revised as a quiet checkbox row writing the same store key.
   The classic TopicView's twin; the props contract is identical,
   so the shell swaps them without knowing.
   ═══════════════════════════════════════════════════════════════ */

export function TopicEditorial({
  unit,
  topic,
  onBack,
  onOpenTopic,
  onOpenNotes,
  notesSpecRange,
}: {
  unit: Unit;
  topic: Topic;
  onBack: () => void;
  onOpenTopic: (topicId: string) => void;
  onOpenNotes?: () => void;
  /** "2.1 → 2.18" — the spec points the full note covers, from the doc itself */
  notesSpecRange?: string;
}) {
  const revised = useRevised();
  const time = useTimeData();
  const key = `${unit.code}/${topic.id}`;
  const isRevised = revised.includes(key);
  const spent = topicSeconds(time, key);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const idx = unit.topics.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? unit.topics[idx - 1] : undefined;
  const next = idx < unit.topics.length - 1 ? unit.topics[idx + 1] : undefined;
  const accent = accentOf(idx);

  const collect = () => toggleRevised(key);

  return (
    <main className="legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      {/* reading progress — the room's own hairline, in rust */}
      <m.div
        aria-hidden
        className="fixed left-0 z-[70] h-[calc(4px*var(--ui-scale))] w-full origin-left rounded-r-full"
        style={{
          top: "var(--sa-top)",
          scaleX,
          background: "var(--legal-rust)",
        }}
      />

      <PopIn>
        <SoftButton
          onClick={onBack}
          className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
          ariaLabel={`Back to ${unit.code}`}
        >
          <ArrowLeft className="h-4 w-4" /> Back to {unit.code}
        </SoftButton>
      </PopIn>

      {/* ————— hero ————— */}
      <Reveal>
        <section className="legal-hero relative mt-5 overflow-hidden rounded-[30px] px-6 py-8 sm:px-9 sm:py-10">
          <div className="legal-hero-grain" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="legal-kicker">
                <BookOpen className="h-3.5 w-3.5" /> {topic.label.toUpperCase()}
              </span>
              <span className="legal-meta">
                {unit.code} · {topic.minutes} MIN READ · {topic.ao.join(" · ")}
                {spent >= 60 ? ` · ${fmtClock(spent)} OF YOURS` : ""}
              </span>
            </div>
            <h1 className="mt-5 max-w-[20ch] font-display text-[calc(clamp(2.4rem,6vw,4.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.06] font-bold tracking-[-.05em] text-ink">
              {topic.title}
              <span className="legal-heading-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
              <Fmt text={topic.summary} />
            </p>
          </div>
        </section>
      </Reveal>

      <div className="mt-9 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        {/* ————— the margin rail ————— */}
        <aside className="legal-index h-fit lg:sticky lg:top-28">
          <p className="legal-meta mb-4">THIS STOP</p>
          <nav aria-label="On this page" className="flex gap-2 pb-2 lg:flex-col lg:gap-1 lg:pb-0">
            {onOpenNotes && (
              <a
                href="#the-full-note"
                className="legal-index-link"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("the-full-note")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <span>—</span>
                <span>The full note</span>
              </a>
            )}
            <a
              href="#revised"
              className="legal-index-link"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("revised")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <span>—</span>
              <span>Mark as revised</span>
            </a>
            {prev && (
              <button
                type="button"
                onClick={() => onOpenTopic(prev.id)}
                className="legal-index-link mt-2 cursor-pointer text-left"
                aria-label={`Previous topic: ${prev.title}`}
              >
                <span>←</span>
                <span className="truncate">{prev.title}</span>
              </button>
            )}
            {next && (
              <button
                type="button"
                onClick={() => onOpenTopic(next.id)}
                className="legal-index-link cursor-pointer text-left"
                aria-label={`Next topic: ${next.title}`}
              >
                <span>→</span>
                <span className="truncate">{next.title}</span>
              </button>
            )}
          </nav>
          <p className="mt-4 hidden border-t border-ink/10 pt-4 text-[calc(11px*var(--ui-scale))] leading-[1.7] text-ink-faint lg:block">
            {notesSpecRange
              ? `The full note covers ${notesSpecRange} of the specification.`
              : `Written to the 2018 specification — the full note covers it spec by spec.`}
          </p>
        </aside>

        <div className="min-w-0">
          {/* ————— the full revision note CTA ————— */}
          {onOpenNotes && (
            <Reveal>
              <div
                id="the-full-note"
                className="legal-card scroll-mt-32 rounded-[calc(18px*var(--ui-scale))] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <EditorialLabel>The full revision note</EditorialLabel>
                  {notesSpecRange && <span className="legal-meta">{notesSpecRange}</span>}
                </div>
                <h2 className="mt-3 font-display text-[calc(20px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  Spec by spec, the complete class note
                </h2>
                <p className="mt-2.5 max-w-[64ch] text-[calc(14px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                  Cut into one section per specification point
                  {notesSpecRange ? ` (${notesSpecRange})` : ""} — the official
                  wording above each, and every calculation worked in full.
                </p>
                <div className="mt-4">
                  <button type="button" onClick={onOpenNotes} className="legal-back-link">
                    Open the note <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {/* ————— the content ————— */}
          <div className="mt-8">
            <p className="legal-meta mb-5">THE TEACHING</p>
            <div className="legal-clauses">
              {topic.blocks.map((b, i) => (
                <Reveal key={i} delay={Math.min(i * 0.03, 0.16)}>
                  <TopicBlockView block={b} accent={accent} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* ————— mark as revised ————— */}
          <Reveal delay={0.05}>
            <div
              id="revised"
              className="legal-card mt-10 scroll-mt-32 rounded-[calc(18px*var(--ui-scale))] px-5 py-4 sm:px-6"
            >
              <div className="flex items-center gap-4">
                <m.button
                  type="button"
                  onClick={collect}
                  aria-pressed={isRevised}
                  aria-label={
                    isRevised
                      ? `Remove ${topic.label} from your revised topics`
                      : `Mark ${topic.label} as revised`
                  }
                  whileTap={{ scale: 0.88 }}
                  className="grid h-[calc(30px*var(--ui-scale))] w-[calc(30px*var(--ui-scale))] shrink-0 cursor-pointer place-items-center rounded-[calc(9px*var(--ui-scale))]"
                  style={
                    isRevised
                      ? {
                          background: "var(--legal-rust)",
                          color: "var(--color-paper)",
                        }
                      : {
                          border:
                            "1.5px dashed color-mix(in oklab, var(--color-ink) 30%, transparent)",
                          color: "var(--color-ink-faint)",
                        }
                  }
                >
                  {isRevised && (
                    <Check
                      className="h-[calc(14px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))]"
                      strokeWidth={2.8}
                    />
                  )}
                </m.button>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[calc(15.5px*var(--ui-scale))] font-semibold text-ink">
                    {isRevised ? "Marked as revised" : "Mark as revised"}
                  </p>
                  <p className="mt-0.5 text-[calc(12.5px*var(--ui-scale))] leading-snug text-ink-faint">
                    {isRevised
                      ? "Saved in this browser. Tap again to unmark it."
                      : "One tap marks it done — progress is saved in this browser."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ————— closing — the trail either side ————— */}
          <Reveal delay={0.08}>
            <section className="legal-closing mt-8 rounded-[26px] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5" />
                <p className="legal-meta">THE TRAIL EITHER SIDE</p>
              </div>
              <p className="mt-4 max-w-[72ch] text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
                {next
                  ? `Next along the trail: ${next.title.toLowerCase()}. Or step back and re-read ${prev ? prev.title.toLowerCase() : `the start of ${unit.code}`}.`
                  : prev
                    ? `That's the last stop of ${unit.code}. Step back to ${prev.title.toLowerCase()}, or return to the unit page.`
                    : `That's ${unit.code}'s trail. Return to the unit page to keep walking.`}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-current/15 pt-4">
                <span className="legal-meta">
                  {unit.code} · {unit.title.toUpperCase()} · WRITTEN TO THE 2018 SPECIFICATION
                </span>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {prev && (
                    <button
                      type="button"
                      onClick={() => onOpenTopic(prev.id)}
                      className="legal-back-link"
                      aria-label={`Previous topic: ${prev.title}`}
                    >
                      <ArrowLeft className="h-4 w-4" /> {prev.label} · {prev.title}
                    </button>
                  )}
                  {next ? (
                    <button
                      type="button"
                      onClick={() => onOpenTopic(next.id)}
                      className="legal-back-link"
                      aria-label={`Next topic: ${next.title}`}
                    >
                      {next.label} · {next.title} <ArrowLeft className="h-4 w-4 rotate-180" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onBack}
                      className="legal-back-link"
                      aria-label={`Back to ${unit.code}`}
                    >
                      Back to {unit.code} <ArrowLeft className="h-4 w-4 rotate-180" />
                    </button>
                  )}
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The topic Block vocabulary, editorially.
   Topic pages speak the site's informal teaching dialect —
   p · def · eq · ex · tips · table · recap — while note sections
   speak the NotesBlock dialect that SampleBlockView sets. This
   room sets the topic dialect through the very same furniture:
   the EditorialLabel dash, the left rule, the hairline-framed
   equation, the numbered exhibit steps. Same text, same order,
   the document dress.
   ═══════════════════════════════════════════════════════════════ */

function TopicBlockView({
  block: b,
  accent,
}: {
  block: Block;
  accent: string;
}) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.9] text-ink-soft">
          <Fmt text={b.text} />
        </p>
      );

    case "def":
      return (
        <div className="legal-card max-w-[68ch] rounded-[calc(18px*var(--ui-scale))] px-5 py-4">
          <EditorialLabel>Key term</EditorialLabel>
          <h4 className="mt-2 font-display text-[calc(17px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={b.term} />
          </h4>
          <p className="mt-1.5 text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </div>
      );

    /* a displayed equation — set between rules, centred, like print;
       the topic dialect's optional title rides the caps label, and
       its "ok" checks become a quiet tick list beneath */
    case "eq":
      return (
        <div className="max-w-[68ch]">
          {b.title && (
            <div className="mb-3">
              <EditorialLabel>{b.title}</EditorialLabel>
            </div>
          )}
          <div className="border-y border-ink/10 py-5">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-[calc(16px*var(--ui-scale))] font-semibold tracking-tight text-ink">
              {b.eq.split(/\s{2,}/).map((part, i) => (
                <span key={i}>
                  <Fmt text={part.trim()} />
                </span>
              ))}
            </div>
            {b.note && (
              <p className="mt-2.5 text-center text-[calc(13px*var(--ui-scale))] italic leading-[1.7] text-ink-soft">
                <Fmt text={b.note} />
              </p>
            )}
          </div>
          {b.ok && b.ok.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {b.ok.map((o, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[calc(12.5px*var(--ui-scale))] leading-[1.6] text-ink-soft"
                >
                  <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.8} style={{ color: accent }} />
                  <Fmt text={o} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    /* the worked example — the exhibit card, minus the question
       line the note dialect carries: here the title IS the ask */
    case "ex":
      return (
        <div className="legal-card max-w-[68ch] rounded-[calc(18px*var(--ui-scale))] p-5 sm:p-6">
          <EditorialLabel>Worked example</EditorialLabel>
          <h4 className="mt-2 font-display text-[calc(17px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={b.title} />
          </h4>
          <ol className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-4">
            {b.steps.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[calc(14px*var(--ui-scale))] leading-[1.8] text-ink-soft"
              >
                <span
                  aria-hidden
                  className="w-[calc(18px*var(--ui-scale))] shrink-0 pt-[calc(3px*var(--ui-scale))] font-display text-[calc(11px*var(--ui-scale))] font-bold text-[var(--legal-rust)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <Fmt text={s} />
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex items-start gap-3.5 border-t border-ink/10 pt-4">
            <span className="shrink-0 pt-[calc(4px*var(--ui-scale))] font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
              Answer
            </span>
            <p className="text-[calc(14.5px*var(--ui-scale))] leading-[1.75] font-semibold text-ink">
              <Fmt text={b.answer} />
            </p>
          </div>
        </div>
      );

    /* tips — the classic's mascot bubble becomes a left-rule aside,
       the room's device for noted matter */
    case "tips":
      return (
        <aside
          className="max-w-[68ch] border-l-2 pl-4 sm:pl-5"
          style={{ borderColor: "var(--legal-rust-soft)" }}
        >
          <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
            Tips
          </span>
          <ul className="mt-2 flex flex-col gap-2">
            {b.items.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[calc(14px*var(--ui-scale))] leading-[1.8] text-ink-soft"
              >
                <Sparkles className="mt-[calc(4px*var(--ui-scale))] h-3.5 w-3.5 shrink-0 text-[var(--legal-rust)]" />
                <span className="min-w-0">
                  <Fmt text={t} />
                </span>
              </li>
            ))}
          </ul>
        </aside>
      );

    case "table":
      return (
        <EditorialTable head={b.head} rows={b.rows} caption={b.caption} accent={accent} />
      );

    /* recap — the numbered checklist, the summary card's device */
    case "recap":
      return (
        <div className="legal-card max-w-[68ch] rounded-[calc(18px*var(--ui-scale))] px-5 py-4">
          <EditorialLabel>Quick recap</EditorialLabel>
          <ol className="mt-1 flex flex-col">
            {b.items.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 border-t border-ink/10 py-3 first:border-t-0"
              >
                <span
                  aria-hidden
                  className="w-[calc(18px*var(--ui-scale))] shrink-0 pt-[calc(3px*var(--ui-scale))] font-display text-[calc(11px*var(--ui-scale))] font-bold text-[var(--legal-rust)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="min-w-0 text-[calc(14px*var(--ui-scale))] leading-[1.75] text-ink-soft">
                  <Fmt text={t} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      );

    default:
      return null;
  }
}
