"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  ArrowLeft,
  Atom,
  BookOpenCheck,
  Droplets,
  FlaskConical,
  Gauge,
  Magnet,
  PieChart,
  Sparkles,
  Target,
  TestTubes,
  Zap,
} from "./icons";
import { PopIn, Reveal, SoftButton, tint } from "./bits";
import { accentOf, inkMix } from "./bands";
import { BlockView } from "./note-section";
import { useSpecMapRegister } from "./spec-map";
import { Fmt } from "./format";
import { getNotes } from "@/lib/spectra/notes";
import { getUnit } from "@/lib/spectra/units";
import type { NotesDoc } from "@/lib/spectra/notes-types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the sample note — an entire revision note, opened up.
   The disclaimer page's editorial dress (hero, sticky contents,
   numbered clause rails, closing card) wrapped around the complete
   WCH11 Topic 3 note — every spec section, every diagram — pulled
   through the very same getNotes() registry and BlockView renderer
   the reader uses, so this page always shows the notes exactly as
   they actually look. It also registers itself with the Spec Map,
   so the nav wears the note's stops and the drawer hops between
   sections just like it does inside a real topic note.
   Reached from the customize panel's Navigate grid.
   ═══════════════════════════════════════════════════════════════ */

const DOC_ID = "wch11-t03";

/* one friendly icon per clause, walked in order */
const SECTION_ICONS = [
  Atom,
  Magnet,
  Droplets,
  FlaskConical,
  Zap,
  Gauge,
  Target,
  TestTubes,
  PieChart,
  Sparkles,
  BookOpenCheck,
];

const SUMMARY = [
  "One section per specification point, in syllabus order, with the official statement quoted above the teaching.",
  "Key definitions boxed for recall — the terms the specification itself uses.",
  "Data tables, equation cards and diagrams that turn the prose into a picture.",
  "Worked examples that unfold step by step, so the method sticks, not just the answer.",
];

const elId = (spec: string) => `sample-${spec.replace(".", "-")}`;

export function SampleNotes({
  onBack,
  onOpenSpec,
}: {
  onBack: () => void;
  onOpenSpec: () => void;
}) {
  const doc = getNotes(DOC_ID);
  if (!doc) {
    /* the doc ships in the registry this chunk already imports — this
       room exists only as belt and braces, same as the reader's */
    return (
      <div className="flex min-h-[55dvh] items-center justify-center">
        <span className="h-7 w-7 animate-spin rounded-full border-[3.5px] border-ink/10 border-t-ink/45" />
      </div>
    );
  }
  return <SampleNotesBody doc={doc} onBack={onBack} onOpenSpec={onOpenSpec} />;
}

function SampleNotesBody({
  doc,
  onBack,
  onOpenSpec,
}: {
  doc: NotesDoc;
  onBack: () => void;
  onOpenSpec: () => void;
}) {
  const main = getUnit("WCH11")?.candy.main ?? accentOf(0);
  const [active, setActive] = useState<string>(doc.sections[0]?.spec ?? "");

  /* ————— scroll spy ————— the reader's recipe: after every scroll
     frame the position is recomputed from the real rects, so a fast
     glide can never leave a stale "you are here" behind */
  const spyRaf = useRef(0);
  useEffect(() => {
    const pick = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = doc.sections[0]?.spec ?? "";
      for (const s of doc.sections) {
        const el = document.getElementById(elId(s.spec));
        if (el && el.getBoundingClientRect().top + window.scrollY <= y)
          current = s.spec;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(spyRaf.current);
      spyRaf.current = requestAnimationFrame(pick);
    };
    const first = requestAnimationFrame(pick);
    const settle = window.setTimeout(pick, 350); /* once fonts have settled */
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(spyRaf.current);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [doc]);

  /* ————— the verified hop ————— the reader's glide, re-aimed at the
     sample's clause rails: smooth scroll with a landing check, one
     instant snap if the glide was silently cancelled */
  const jump = useCallback((spec: string) => {
    const el = document.getElementById(elId(spec));
    if (!el) return;
    const saTop =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--sa-top"),
      ) || 0;
    const topOf = () =>
      Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - 100 - saTop,
      );
    const landed = (top: number) => Math.abs(window.scrollY - top) < 2;
    const glide = () => {
      const top = topOf();
      window.scrollTo({ top, behavior: "smooth" });
      window.setTimeout(() => {
        if (landed(top)) return;
        const y1 = window.scrollY;
        window.setTimeout(() => {
          if (!landed(top) && Math.abs(window.scrollY - y1) < 1)
            window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
        }, 450);
      }, 450);
    };
    const estimate = topOf();
    if (estimate > window.innerHeight * 2) {
      window.scrollTo({
        top: estimate - window.innerHeight * 1.5,
        behavior: "instant" as ScrollBehavior,
      });
      requestAnimationFrame(() => requestAnimationFrame(glide));
    } else {
      glide();
    }
  }, []);

  /* ————— the nav wears this note ————— same registration the reader
     makes, so the Spec Map stop appears in the navbar and the drawer
     lists, tracks and hops these sections like any real note */
  useSpecMapRegister(
    useMemo(
      () => ({
        id: `sample-${doc.id}`,
        sections: doc.sections,
        main,
        active,
        jump,
      }),
      [doc.id, doc.sections, main, active, jump],
    ),
  );

  const figureCount = useMemo(() => {
    let n = 0;
    const walk = (blocks: NotesDoc["intro"]) =>
      blocks.forEach((b) => b.k === "figure" && n++);
    walk(doc.intro);
    doc.sections.forEach((s) => walk(s.blocks));
    return n;
  }, [doc]);

  const firstSpec = doc.sections[0]?.spec ?? "";
  const lastSpec = doc.sections[doc.sections.length - 1]?.spec ?? "";

  return (
    <main className="legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      <PopIn>
        <SoftButton
          onClick={onBack}
          className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
          ariaLabel="Back home"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </SoftButton>
      </PopIn>

      <section className="legal-hero relative mt-7 overflow-hidden rounded-[30px] px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
        <div className="legal-hero-grain" aria-hidden />
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="legal-kicker"><Atom className="h-3.5 w-3.5" /> SAMPLE NOTE</span>
            <span className="legal-meta">IAL CHEM · CHEMISTRY</span>
          </div>
          <h1 className="mt-7 max-w-[760px] font-display text-[calc(clamp(2.65rem,7vw,5.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[.98] font-semibold tracking-[-.065em] text-ink">
            Inside a revision note,
            <br />
            <span className="legal-heading-accent">spec by spec.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-[calc(15px*var(--ui-scale))] leading-[1.85] text-ink-soft sm:text-[calc(16px*var(--ui-scale))]">
            Every topic on IAL CHEM is a single note cut into sections — one per specification point, each opened by the official statement. This page is the complete note for Topic 3 of WCH11, bonding and structure — every section and every diagram, exactly as the reader shows them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
            <span className="legal-meta">WCH11 · TOPIC 3</span>
            <span className="legal-meta">SPEC {firstSpec} → {lastSpec}</span>
            <span className="legal-meta">{doc.sections.length} SECTIONS · {figureCount} DIAGRAMS</span>
          </div>
        </div>
        <div className="legal-hero-mark" aria-hidden>
          <span className="legal-orbit legal-orbit-one" />
          <span className="legal-orbit legal-orbit-two" />
          <span className="legal-mark-core"><Atom className="h-12 w-12" strokeWidth={1.25} /></span>
          <span className="legal-mark-dot legal-mark-dot-one" />
          <span className="legal-mark-dot legal-mark-dot-two" />
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <aside className="legal-index h-fit lg:sticky lg:top-28">
          <p className="legal-meta mb-4">CONTENTS</p>
          <nav aria-label="Sample note sections" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {doc.sections.map((section, i) => (
              <a
                key={section.spec}
                href={`#${elId(section.spec)}`}
                onClick={(e) => {
                  e.preventDefault();
                  jump(section.spec);
                }}
                className="legal-index-link lg:min-w-0 lg:max-w-full"
              >
                <span>{section.spec}</span>
                <span className="min-w-0 lg:truncate">{section.title}</span>
              </a>
            ))}
          </nav>
          <div className="mt-7 hidden border-t border-ink/10 pt-5 lg:block">
            <p className="text-[calc(12px*var(--ui-scale))] leading-[1.7] text-ink-soft">
              Section numbers are specification points from the Pearson Edexcel International Advanced Level Chemistry (2018) specification.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <Reveal>
            <section className="legal-summary rounded-[26px] p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="legal-meta">SUMMARY</p>
                  <h2 className="mt-2 font-display text-[calc(23px*var(--ui-scale))] font-semibold tracking-tight text-ink">What every note gives you</h2>
                </div>
                <span className="legal-summary-stamp"><BookOpenCheck className="h-4 w-4" /> THE FORMAT</span>
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

          <div className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="legal-meta">SAMPLE NOTE</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">The note itself</h2>
              </div>
              <span className="legal-meta hidden sm:block">{firstSpec} — {lastSpec}</span>
            </div>

            {/* the note's own opening words, verbatim from the doc */}
            <Reveal>
              <div className="mb-7 max-w-[76ch] rounded-[24px] bg-paper px-5 py-4 puff">
                <p className="legal-meta">HOW THE NOTE OPENS</p>
                <div className="mt-2 flex flex-col gap-2">
                  {doc.intro.map((b, i) =>
                    b.k === "p" ? (
                      <p key={i} className="text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                        <Fmt text={b.text} />
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            </Reveal>

            <div className="legal-clauses">
              {doc.sections.map((section, i) => {
                const accent = accentOf(i);
                const Icon = SECTION_ICONS[i % SECTION_ICONS.length];
                return (
                  <Reveal key={section.spec} delay={Math.min(i * 0.03, 0.16)}>
                    <section id={elId(section.spec)} className="legal-clause scroll-mt-28">
                      <div className="legal-clause-rail">
                        <span className="legal-clause-number">{String(i + 1).padStart(2, "0")}</span>
                        {i < doc.sections.length - 1 && <span className="legal-clause-line" />}
                      </div>
                      <div className="legal-clause-content">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="legal-clause-icon" style={{ "--legal-accent": accent } as CSSProperties}>
                            <Icon className="h-5 w-5" strokeWidth={1.9} />
                          </span>
                          <span className="legal-meta">SPEC {section.spec} · WCH11 TOPIC 3</span>
                        </div>
                        <h3 className="mt-4 font-display text-[calc(21px*var(--ui-scale))] font-semibold tracking-tight text-ink sm:text-[calc(24px*var(--ui-scale))]">
                          {section.title}
                        </h3>
                        <div
                          className="mt-4 max-w-[72ch] rounded-[calc(22px*var(--ui-scale))] bg-paper/85 px-5 py-4"
                          style={{ borderLeft: `5px solid ${tint(accent, 45)}` }}
                        >
                          <div
                            className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase"
                            style={{ color: inkMix(accent, 62) }}
                          >
                            From the specification
                          </div>
                          <p className="mt-1.5 text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink italic">
                            <Fmt text={section.statement} />
                          </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-6">
                          {section.blocks.map((b, j) => (
                            <BlockView key={j} block={b} accent={accent} />
                          ))}
                        </div>
                      </div>
                    </section>
                  </Reveal>
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
                That is the shape of every note on the site — the official statement first, then the teaching: definitions boxed, diagrams drawn, equations on cards and the maths worked through one step at a time. Open the specification to pick a unit and read the real thing.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
                <span className="legal-meta">END OF SAMPLE</span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <SoftButton
                    onClick={onOpenSpec}
                    className="min-h-[calc(40px*var(--ui-scale))] px-4 py-2 text-[calc(13px*var(--ui-scale))]"
                    ariaLabel="Open the specification browser"
                  >
                    <BookOpenCheck className="h-4 w-4" /> Open the specification
                  </SoftButton>
                  <button type="button" onClick={onBack} className="legal-back-link">Back to home <ArrowLeft className="h-4 w-4 rotate-180" /></button>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
