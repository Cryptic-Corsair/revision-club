"use client";

import type { CSSProperties } from "react";
import {
  ArrowLeft,
  Atom,
  BookOpenCheck,
  PenLine,
  TestTubes,
} from "./icons";
import { PopIn, Reveal, SoftButton, tint } from "./bits";
import { accentOf, inkMix } from "./bands";
import { BlockView } from "./note-section";
import { Fmt } from "./format";
import type { NotesBlock } from "@/lib/spectra/notes-types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the sample note — a look inside a full revision note.
   The disclaimer page's editorial dress (hero, sticky contents,
   numbered clauses, closing card) wrapped around a real slice of
   WCH11 Topic 1. The spec statements and note blocks below are
   verbatim from the site's own note for that topic, and they are
   rendered by the very same BlockView the reader uses — so this
   page always shows the notes as they actually look.
   Reached from the customize panel's Navigate grid.
   ═══════════════════════════════════════════════════════════════ */

type SampleSection = {
  icon: typeof BookOpenCheck;
  spec: string;
  title: string;
  /** short form for the 210px contents rail */
  short: string;
  statement: string;
  blocks: NotesBlock[];
};

const SECTIONS: SampleSection[] = [
  {
    icon: Atom,
    spec: "1.1",
    title: "Atoms, elements and molecules",
    short: "Atoms and molecules",
    statement:
      "know the terms ‘atom’, ‘element’, ‘ion’, ‘molecule’, ‘compound’, ‘empirical formula’ and ‘molecular formula’",
    blocks: [
      {
        k: "p",
        text: "Chemistry starts with the particle. Before any calculation, the vocabulary has to be exact — what counts as an atom, an element, a molecule or a compound, and which of these particles carry a charge.",
      },
      {
        k: "def",
        term: "Molecule",
        text: "A molecule is the smallest, electrically neutral particle, of an element or compound that can ==exist on its own==.",
      },
      {
        k: "table",
        caption: "The three sub-atomic particles",
        head: ["Particle", "Symbol", "Charge / C", "Relative charge", "Mass / g", "Relative mass"],
        rows: [
          ["Proton", "p", "+1.60 × 10^−19^", "+1", "1.67 × 10^−24^", "1"],
          ["Neutron", "n", "0", "0", "1.67 × 10^−24^", "1"],
          ["Electron", "e^−^", "−1.60 × 10^−19^", "−1", "9.11 × 10^−28^", "1 / 1840"],
        ],
      },
      {
        k: "def",
        term: "Atomic number",
        text: "The number of ==protons== in the nucleus of an atom.",
      },
      {
        k: "def",
        term: "Mass number",
        text: "The sum of ==protons and neutrons== in the nucleus of an atom.",
      },
    ],
  },
  {
    icon: PenLine,
    spec: "1.3",
    title: "Writing chemical equations",
    short: "Writing equations",
    statement:
      "write balanced full and ionic equations, including state symbols, for chemical reactions",
    blocks: [
      {
        k: "p",
        text: "Equations can be written in words or using chemical formula. Chemical equations could be either **molecular equations** or **ionic equations**.",
      },
      { k: "eq", eq: "hydrogen + oxygen → water        H~2~ + O~2~ → H~2~O" },
      {
        k: "bullets",
        items: [
          "A balanced chemical equation must have the same number of each kind of atoms on the **left-hand side (LHS)** of the equation as on the **right-hand side (RHS)**.",
          "Net charge on both reactants and products side should be 0.",
          "Simplest ==whole number ratios== should be used to balance the equations.",
        ],
      },
      {
        k: "steps",
        items: [
          {
            title: "Step 1",
            text: "Work out what has reacted and what has been formed. Write a **word equation**.",
          },
          {
            title: "Step 2",
            text: "Get the correct **formula** for each species. Include the **state symbols** where necessary. When the correct formula of a species has been obtained, ==do not change the formula== to balance the equation.",
          },
          {
            title: "Step 3",
            text: "Having written out the initial equation, check to see if it is balanced. An equation balances if the same number of each type of atom appears on either side of the arrow.",
          },
          {
            title: "Step 4",
            text: "Place whole numbers in front of any formula to indicate if more than one of it is required. This multiplies everything in the formula immediately behind it. Continue until the equation balances.",
          },
          {
            title: "Step 5",
            text: "Finally, check the equation to see that you have balanced it correctly.",
          },
        ],
      },
      {
        k: "worked",
        title: "Worked example · balancing a molecular equation",
        question: "Balance: sodium + water → sodium hydroxide + hydrogen",
        steps: [
          "**Step 1** — word equation: sodium + water → sodium hydroxide + hydrogen",
          "**Step 2** — formulae with state symbols: Na(s) + H~2~O(l) → NaOH(aq) + H~2~(g)",
          "**Step 3** — count up the atoms. LHS … 1 × Na, 2 × H, 1 × O. RHS … 1 × Na, 3 × H, 1 × O. The equation doesn't balance; an extra H is needed on the LHS. However formulae should not be changed — one can only get extra H's by having two waters; multiply H~2~O by two: Na(s) + 2H~2~O(l) → NaOH(aq) + H~2~(g)",
          "**Step 4** — now there are too many O's (2) and H's (4) on the LHS; multiplying the NaOH by two will solve this problem: Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g). However this creates yet another problem because it has introduced an extra Na on the RHS; multiply the Na on the LHS by two: 2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)",
          "**Step 5** — check the equation. LHS … 2 × Na, 4 × H, 2 × O. RHS … 2 × Na, 4 × H, 2 × O. It is balanced.",
        ],
        answer: "2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)",
      },
    ],
  },
  {
    icon: TestTubes,
    spec: "1.12",
    title: "Test-tube reactions: acids, displacement, precipitation",
    short: "Test-tube reactions",
    statement:
      "be able to relate ionic and full equations, with state symbols, to observations from simple test-tube experiments, to include: i displacement reactions ii typical reactions of acids iii precipitation reactions",
    blocks: [
      { k: "h", text: "Typical reactions of acids" },
      { k: "p", text: "Three general equations carry every acid reaction at this level:" },
      { k: "eq", eq: "Acid + Metal carbonate → Salt + Water + Carbon dioxide" },
      {
        k: "def",
        term: "Displacement",
        text: "In simple, it is a reaction in which ==one element replaces another element== in a compound.",
      },
      { k: "eq", eq: "Mg(s) + CuSO~4~(aq) → Cu(s) + MgSO~4~(aq)" },
      {
        k: "p",
        text: "Remember a ==more reactive metal displaces the less reactive metal== from its compound.",
      },
      {
        k: "wow",
        text: "Only the particles that actually react appear in an ==ionic equation== — the spectator ions cancel from both sides and are written out of the equation.",
      },
    ],
  },
];

const SUMMARY = [
  "One section per specification point, in syllabus order, with the official statement quoted above the teaching.",
  "Key definitions boxed for recall — the terms the specification itself uses.",
  "Data tables, equation cards and diagrams that turn the prose into a picture.",
  "Worked examples that unfold step by step, so the method sticks, not just the answer.",
];

export function SampleNotes({
  onBack,
  onOpenSpec,
}: {
  onBack: () => void;
  onOpenSpec: () => void;
}) {
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
            Every topic on IAL CHEM is a single note cut into sections — one per specification point, each opened by the official statement. This page is a real slice of that: Topic 1 of WCH11, shown with the site&apos;s own definition boxes, data tables, equation cards and worked examples.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
            <span className="legal-meta">WCH11 · TOPIC 1</span>
            <span className="legal-meta">THREE SPEC SECTIONS</span>
            <span className="legal-meta">DEFS · TABLES · WORKED EXAMPLES</span>
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
            {SECTIONS.map((section, i) => (
              <a key={section.spec} href={`#sample-${i + 1}`} className="legal-index-link lg:min-w-0 lg:max-w-full">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 lg:truncate">{section.short}</span>
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
              <span className="legal-meta hidden sm:block">01 — 03</span>
            </div>

            <div className="legal-clauses">
              {SECTIONS.map((section, i) => {
                const accent = accentOf(i);
                return (
                  <Reveal key={section.spec} delay={Math.min(i * 0.035, 0.16)}>
                    <section id={`sample-${i + 1}`} className="legal-clause scroll-mt-28">
                      <div className="legal-clause-rail">
                        <span className="legal-clause-number">{String(i + 1).padStart(2, "0")}</span>
                        {i < SECTIONS.length - 1 && <span className="legal-clause-line" />}
                      </div>
                      <div className="legal-clause-content">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="legal-clause-icon" style={{ "--legal-accent": accent } as CSSProperties}>
                            <section.icon className="h-5 w-5" strokeWidth={1.9} />
                          </span>
                          <span className="legal-meta">SPEC {section.spec} · WCH11 TOPIC 1</span>
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
                        <div className="mt-6 flex max-w-[76ch] flex-col gap-6">
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
                That is the shape of every note on the site — the official statement first, then the teaching: definitions boxed, equations on cards and the maths worked through one step at a time. Open the specification to pick a unit and read the real thing.
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
