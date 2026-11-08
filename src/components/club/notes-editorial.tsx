"use client";

import { Fragment, useCallback, useEffect, useMemo } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  Check,
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
import { BandWave, accentOf, bgOf } from "./bands";
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

      {/* ————— note masthead ————— */}
      <Reveal>
        <section className="notes-hero relative mt-5 overflow-hidden rounded-[26px]">
          <div className="notes-hero-top">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="notes-hero-label">
                <BookOpen className="h-3.5 w-3.5" /> REVISION NOTES
              </span>
              <span className="notes-hero-meta">IAL CHEM / {unit.code}</span>
            </div>
            <span className="notes-hero-edition">TOPIC {String(topicNo).padStart(2, "0")}</span>
          </div>

          <div className="notes-hero-body">
            <div className="notes-hero-copy">
              <p className="notes-hero-overline">
                {unit.code} / TOPIC {topicNo} · SPECIFICATION GUIDE
              </p>
              <h1 className="notes-hero-title">
                {doc.title}<span>.</span>
              </h1>
              {heroPara && (
                <p className="notes-hero-description">
                  <Fmt text={heroPara} />
                </p>
              )}
            </div>

            <aside className="notes-hero-folio" aria-label={`Topic ${topicNo}, specification points ${firstSpec} to ${lastSpec}`}>
              <span className="notes-hero-folio-label">TOPIC</span>
              <span className="notes-hero-folio-number" aria-hidden="true">
                {String(topicNo).padStart(2, "0")}
              </span>
              <span className="notes-hero-folio-range">{firstSpec} — {lastSpec}</span>
              <span className="notes-hero-folio-unit">{unit.code} / IAL CHEM</span>
            </aside>
          </div>

          <div className="notes-hero-footer">
            <span className="notes-hero-footer-label">AT A GLANCE</span>
            <div className="notes-hero-stats">
              {stats.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ————— contents rail + the clauses ————— */}
      <div className="mt-9 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <aside className="legal-index h-fit lg:sticky lg:top-28">
          <p className="legal-meta mb-4">CONTENTS</p>
          <nav aria-label="Note contents" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {doc.sections.map((s, i) => (
              <a
                key={s.spec}
                href={`#spec-${s.spec.replace(".", "-")}`}
                aria-current={active === s.spec ? "true" : undefined}
                className="legal-index-link lg:min-w-0 lg:max-w-full"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSpec(s.spec);
                }}
              >
                <span>{s.spec}</span>
                <span className={active === s.spec ? "text-ink" : undefined}>
                  {s.title}
                </span>
              </a>
            ))}
          </nav>
          <p className="mt-4 hidden border-t border-ink/10 pt-4 text-[calc(11px*var(--ui-scale))] leading-[1.7] text-ink-faint lg:block">
            {firstSpec} — {lastSpec} · {unit.code} · read in order or hop
            from the contents; the map in the navbar tracks you either way.
          </p>
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
              <div className="legal-card mt-6 max-w-[76ch] rounded-[calc(18px*var(--ui-scale))] px-5 py-4">
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

            <div className="legal-clauses rooms-wave-sections">
              <BandWave from="var(--color-cream)" to={bgOf(0)} />
              {doc.sections.map((section, i) => {
                const last = i === doc.sections.length - 1;
                return (
                  <Fragment key={section.spec}>
                    <Reveal delay={Math.min(i * 0.03, 0.16)}>
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
                    <BandWave
                      from={bgOf(i)}
                      to={last ? "var(--color-cream)" : bgOf(i + 1)}
                    />
                  </Fragment>
                );
              })}
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
