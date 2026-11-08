"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  Check,
  ChevronDown,
  Info,
} from "./icons";
import type { NotesBlock, NotesDoc } from "@/lib/spectra/notes-types";
import type { Unit } from "@/lib/spectra/types";
import { fmtClock, topicSeconds, useTimeData } from "@/lib/spectra/time";
import { togglePick, usePacks } from "@/lib/spectra/packs";
import { getNotes } from "@/lib/spectra/notes";
import { scrollToSpec, useSpecSpy } from "@/lib/spectra/scroll-helpers";
import { Fmt, plural } from "./format";
import { PopIn, Reveal, SoftButton, readableInk, shade } from "./bits";
import { accentOf } from "./bands";
import { useSpecMapRegister } from "./spec-map";
import { EditorialSectionView, figOffsetsOf } from "./spec-section-editorial";
import { EditorialLabel, SampleBlockView } from "./sample-blocks";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the notes reader, in the editorial dress.
   The same note — same doc, same sections, same diagrams, same
   spec map registration, same pack ticks — set as a document
   instead of a band walk: the disclaimer page's hero, a sticky
   contents rail, and the note's spec sections as numbered clauses
   with their exhibits. The classic reader's twin, wearing the
   document room; the props contract is identical, so the shell
   swaps them without knowing the difference.
   ═══════════════════════════════════════════════════════════════ */

/* what every note on the site gives you — the summary card's lines,
   as true for the newest note as for the very first */
const SUMMARY = [
  "One section per specification point, in syllabus order, with the official statement quoted above the teaching.",
  "Key definitions boxed for recall — the terms the specification itself uses.",
  "Data tables, displayed equations and diagrams that turn the prose into a picture.",
  "Worked examples reasoned through line by line, so the method sticks, not just the answer.",
];

/* ————— the pack tick, editorially —————
   The reader's banner control: is this spec point in your revision
   pack? Same store, same toggle, a quieter square — a checkbox in
   print, not a candy button. */
function EditorialPackTick({ spec, accent }: { spec: string; accent: string }) {
  const { picks } = usePacks();
  const picked = picks.includes(spec);
  return (
    <m.button
      type="button"
      onClick={() => togglePick(spec)}
      whileTap={{ scale: 0.88 }}
      aria-pressed={picked}
      aria-label={
        picked
          ? `Remove spec point ${spec} from your revision pack`
          : `Add spec point ${spec} to your revision pack`
      }
      title={
        picked
          ? `${spec} is in your pack — tap to remove`
          : `Add ${spec} to your revision pack`
      }
      className="grid h-[calc(30px*var(--ui-scale))] w-[calc(30px*var(--ui-scale))] shrink-0 cursor-pointer place-items-center rounded-[calc(9px*var(--ui-scale))]"
      style={
        picked
          ? {
              background: accent,
              color: readableInk(accent),
              boxShadow: `0 2px 0 ${shade(accent)}`,
            }
          : {
              border: "1.5px dashed color-mix(in oklab, var(--color-ink) 30%, transparent)",
              color: "var(--color-ink-faint)",
            }
      }
    >
      {picked ? (
        <Check className="h-[calc(14px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))]" strokeWidth={2.6} />
      ) : (
        <span
          aria-hidden
          className="font-display text-[calc(14px*var(--ui-scale))] leading-none font-bold"
        >
          +
        </span>
      )}
    </m.button>
  );
}

export function NotesEditorial({
  docId,
  unit,
  onBack,
  jumpToSpec,
}: {
  docId: string;
  unit: Unit;
  onBack: () => void;
  /** deep link — land scrolled to this spec section */
  jumpToSpec?: string;
}) {
  const doc = getNotes(docId);
  if (!doc) {
    /* the shell only opens notes it knows from notes-meta.ts, so
       this is a belt-and-braces room — still, never a white screen */
    return (
      <div className="flex min-h-[55dvh] items-center justify-center">
        <span className="h-7 w-7 animate-spin rounded-full border-[3.5px] border-ink/10 border-t-ink/45" />
      </div>
    );
  }
  return <NotesEditorialBody doc={doc} unit={unit} onBack={onBack} jumpToSpec={jumpToSpec} />;
}

function NotesEditorialBody({
  doc,
  unit,
  onBack,
  jumpToSpec,
}: {
  doc: NotesDoc;
  unit: Unit;
  onBack: () => void;
  jumpToSpec?: string;
}) {
  const main = unit.candy.main;
  const active = useSpecSpy(doc.sections);
  const [contentsExpanded, setContentsExpanded] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  /* the nav's Spec Map — the same registration the classic reader
     makes, same id, so the drawer tracks and hops this note no
     matter which dress it wears */
  const jump = useCallback((spec: string) => scrollToSpec(spec), []);
  useSpecMapRegister(
    useMemo(
      () => ({ id: doc.id, sections: doc.sections, main, active, jump }),
      [doc.id, doc.sections, main, active, jump],
    ),
  );

  /* deep links (spec index, packs) land on their section once the
     page has settled — the same verified hop the map uses */
  useEffect(() => {
    if (!jumpToSpec) return;
    const t = window.setTimeout(() => scrollToSpec(jumpToSpec), 420);
    return () => window.clearTimeout(t);
  }, [jumpToSpec]);

  const count = (k: NotesBlock["k"]) => {
    let n = 0;
    const walk = (blocks: NotesBlock[]) =>
      blocks.forEach((b) => b.k === k && n++);
    walk(doc.intro);
    doc.sections.forEach((s) => walk(s.blocks));
    if (doc.outro) walk(doc.outro);
    return n;
  };
  const time = useTimeData();
  const spentHere = topicSeconds(time, `${unit.code}/${doc.topicId}`);
  const stats = [
    plural(doc.sections.length, "spec section"),
    plural(count("worked"), "worked example"),
    plural(count("figure"), "diagram"),
    ...(spentHere >= 60 ? [`${fmtClock(spentHere)} of your time here`] : []),
  ];

  const figOffsets = useMemo(() => figOffsetsOf(doc.sections), [doc]);
  const firstSpec = doc.sections[0]?.spec ?? "";
  const lastSpec = doc.sections[doc.sections.length - 1]?.spec ?? "";
  const topicNo = Number(doc.topicId.slice(1));
  const eyebrowFor = (spec: string) =>
    `SPEC ${spec} · ${unit.code} TOPIC ${topicNo}`;
  const introPs = doc.intro.filter((b) => b.k === "p");
  const heroPara = introPs[0]?.k === "p" ? introPs[0].text : null;
  const exhibitPs = introPs.slice(1);

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
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="legal-kicker">
                <BookOpen className="h-3.5 w-3.5" /> REVISION NOTE
              </span>
              <span className="legal-meta">IAL CHEM · {unit.code} · TOPIC {topicNo}</span>
            </div>
            <h1 className="mt-5 max-w-[16ch] font-display text-[calc(clamp(2.65rem,7vw,5.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.04] font-bold tracking-[-.065em] text-ink">
              {doc.title}<span className="legal-heading-accent">.</span>
            </h1>
            {heroPara && (
              <p className="mt-5 max-w-[58ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
                <Fmt text={heroPara} />
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-4">
              {stats.map((s) => (
                <span key={s} className="legal-meta">{s}</span>
              ))}
            </div>
          </div>
          <div className="legal-hero-mark" aria-hidden>
            <div className="legal-orbit legal-orbit-one" />
            <div className="legal-orbit legal-orbit-two" />
            <div className="legal-mark-core">
              <BookOpenCheck className="h-9 w-9" strokeWidth={1.6} />
            </div>
            <div className="legal-mark-dot legal-mark-dot-one" />
            <div className="legal-mark-dot legal-mark-dot-two" />
          </div>
        </section>
      </Reveal>

      {/* ————— contents navigation + the clauses ————— */}
      <div
        className={`editorial-reading-layout mt-9 grid min-w-0 grid-cols-1 items-start gap-5 lg:gap-8 ${contentsExpanded ? "is-expanded" : "is-collapsed"}`}
      >
        <aside className={`legal-index editorial-contents min-w-0 lg:sticky lg:top-28 ${contentsExpanded ? "is-expanded" : "is-collapsed"}`}>
          <div className="editorial-contents-heading">
            <div className="min-w-0">
              {contentsExpanded ? (
                <>
                  <p className="legal-meta">CONTENTS</p>
                  <p className="editorial-contents-count">
                    {doc.sections.length} sections <span aria-hidden>·</span> {firstSpec}–{lastSpec}
                  </p>
                </>
              ) : (
                <span className="legal-meta editorial-contents-rail-label" aria-hidden="true">SPEC</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setContentsExpanded((open) => !open)}
              aria-label={contentsExpanded ? "Collapse contents sidebar" : "Expand contents sidebar"}
              aria-expanded={contentsExpanded}
              aria-controls="editorial-note-contents"
              title={contentsExpanded ? "Collapse contents" : "Expand contents"}
              className="editorial-contents-toggle"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${contentsExpanded ? "rotate-90" : "-rotate-90"}`}
              />
            </button>
          </div>
          <nav
            id="editorial-note-contents"
            aria-label="Note contents"
            className={`editorial-contents-nav ${contentsExpanded ? "is-expanded" : "is-collapsed"}`}
          >
            {doc.sections.map((s, i) => {
              const isActive = active === s.spec;
              return (
                <a
                  key={s.spec}
                  href={`#spec-${s.spec.replace(".", "-")}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={`Go to specification ${s.spec}: ${s.title}`}
                  title={!contentsExpanded ? s.title : undefined}
                  className={`legal-index-link editorial-contents-link ${isActive ? "is-active" : ""} ${contentsExpanded ? "is-expanded" : "is-collapsed"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSpec(s.spec);
                  }}
                >
                  <span className="editorial-contents-number">{s.spec}</span>
                  {contentsExpanded && (
                    <span className="editorial-contents-title">{s.title}</span>
                  )}
                </a>
              );
            })}
          </nav>
          {contentsExpanded && (
            <p className="editorial-contents-footnote">
              Select a section to jump directly to it. The contents follows your reading position and stays in sync with the Spec Map.
            </p>
          )}
        </aside>
        <div className="min-w-0">
          <Reveal>
            <section className="legal-summary rounded-[26px] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-[calc(20px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  What every note gives you
                </h2>
                <span className="legal-summary-stamp">
                  <Info className="h-4 w-4" /> THE FORMAT
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {SUMMARY.map((line, i) => (
                  <div key={line} className="legal-summary-line">
                    <span className="legal-summary-number">{String(i + 1).padStart(2, "0")}</span>
                    <p>{line}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* the note's opening words, verbatim from the doc — the
              hero carries the first; the exhibit carries the rest */}
          {exhibitPs.length > 0 && (
            <Reveal>
              <div className="legal-card editorial-opening-card mt-6 w-full min-w-0 rounded-[calc(18px*var(--ui-scale))] px-5 py-4">
                <EditorialLabel>How the note opens</EditorialLabel>
                <div className="mt-2.5 flex flex-col gap-2">
                  {exhibitPs.map((b, i) =>
                    b.k === "p" ? (
                      <p key={i} className="text-[calc(14.5px*var(--ui-scale))] leading-[1.9] text-ink-soft">
                        <Fmt text={b.text} />
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="legal-meta">THE NOTE ITSELF</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">
                  Spec by spec
                </h2>
              </div>
              <span className="legal-meta hidden sm:block">
                {doc.sections.length} sections · {firstSpec} — {lastSpec}
              </span>
            </div>

            <div className="legal-clauses">
              {doc.sections.map((section, i) => (
                <Reveal key={section.spec} delay={Math.min(i * 0.03, 0.16)}>
                  <EditorialSectionView
                    section={section}
                    index={i}
                    total={doc.sections.length}
                    accent={accentOf(i)}
                    eyebrow={eyebrowFor(section.spec)}
                    anchorPrefix="spec-"
                    bannerAction={
                      <EditorialPackTick spec={section.spec} accent={accentOf(i)} />
                    }
                    figOffset={figOffsets[i]}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.08}>
            <section className="legal-closing mt-8 rounded-[26px] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5" />
                <p className="legal-meta">YOUR TURN</p>
              </div>
              <p className="mt-4 max-w-[72ch] text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
                Tick spec points along the way — the plus beside each clause
                adds them to your revision pack, assembled in syllabus order
                and ready to print. Mark the topic as revised from its unit
                page when you can answer the statements unaided.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
                <span className="legal-meta">END OF NOTE</span>
                <button type="button" onClick={onBack} className="legal-back-link">
                  Back to {unit.code} <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
