"use client";

import type { CSSProperties } from "react";
import { ArrowLeft, BadgeCheck, BookOpen, Copy, Info, Lock, ShieldCheck } from "./icons";
import { PopIn, Reveal, SoftButton } from "./bits";

type Section = {
  icon: typeof BookOpen;
  main: string;
  title: string;
  eyebrow: string;
  body: string[];
};

const SECTIONS: Section[] = [
  {
    icon: BookOpen,
    main: "#E47B61",
    eyebrow: "01 / THE PLATFORM",
    title: "What this site is",
    body: [
      "Reaction Club is a free, independent revision companion for the Pearson Edexcel International A Level Chemistry (2018) specification, WCH11–WCH16. It offers original notes and worked examples to support your studying — it is not a course, a tutor, a textbook or an official Pearson resource, and it does not replace any of those.",
      "Your teacher, your class notes, the official specification and past papers remain the source of truth for your studies. Treat every page here as one helpful voice among several, not the final word.",
    ],
  },
  {
    icon: BadgeCheck,
    main: "#D99A4B",
    eyebrow: "02 / CONTENT STANDARD",
    title: "Accuracy — provided as is",
    body: [
      "Every page is written and checked carefully against the published specification, but the content is provided “as is” and “as available”, with no warranty or guarantee of any kind, express or implied, about its accuracy, completeness, currency or fitness for a particular purpose.",
      "Mistakes can slip through, the specification can change, and the site can be updated, corrected or taken offline at any time without notice. Before anything that matters — an exam answer, a coursework claim, a definition you will quote — verify it against official materials.",
    ],
  },
  {
    icon: ShieldCheck,
    main: "#8D82B8",
    eyebrow: "03 / INDEPENDENCE",
    title: "Trademarks & no affiliation",
    body: [
      "Reaction Club is not affiliated with, endorsed by, sponsored by or connected to Pearson Education Ltd, Edexcel, or any examination board. “Pearson”, “Edexcel” and related names and marks are trademarks of Pearson Education Ltd; they appear here only for identification — to say honestly which specification the notes follow.",
      "Specification statements are quoted briefly from the publicly available (2018) specification for teaching and reference. That quotation implies no endorsement, and it grants this site no ownership of, or official standing within, the qualification.",
    ],
  },
  {
    icon: Copy,
    main: "#B87991",
    eyebrow: "04 / OWNERSHIP",
    title: "Copyright & fair use",
    body: [
      "Unless stated otherwise, the notes, worked examples, figures and code on this site are original work belonging to Reaction Club. Past-paper questions and mark schemes are not reproduced — revise from your exam board's own papers for that.",
      "You are welcome to read and revise from the site for personal study. Please don't scrape, redistribute, resell or republish its content without permission. If you believe material that belongs to you appears here in error, flag it and it will be removed promptly.",
    ],
  },
  {
    icon: Lock,
    main: "#5E9B83",
    eyebrow: "05 / YOUR DATA",
    title: "Your privacy",
    body: [
      "The site runs without accounts, ads, trackers or analytics, and sets no cookies of its own. Everything you do here — revised ticks, reading time, goals, your revision pack, theme and font preferences — is saved in your own browser's local storage and never leaves your device.",
      "There are no copies of that progress anywhere else. Clear your browser data and it is gone for good — which is a feature and a limitation at once: nothing is collected, so nothing can be recovered for you either.",
    ],
  },
  {
    icon: Info,
    main: "#C18C4C",
    eyebrow: "06 / RESPONSIBILITY",
    title: "No liability",
    body: [
      "To the fullest extent the law allows, Reaction Club accepts no liability for any loss or damage — including lost marks, missed deadlines or exam outcomes — claimed to follow from using the site or relying on its content. The site is a study aid, and study decisions, exam entries and final preparation belong to you and your school.",
      "Nothing on this page limits liability where doing so would be unenforceable — for anything not covered above, the law of your jurisdiction applies as usual.",
    ],
  },
];

const SHORT_VERSION = [
  "Independent revision support. Not affiliated with Pearson or Edexcel.",
  "Content is best-effort and provided as is. Verify what matters.",
  "No accounts, ads or trackers. Progress stays in your browser.",
  "For personal study. It does not replace teachers or official materials.",
];

export function Legal({ onBack }: { onBack: () => void }) {
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
            <span className="legal-kicker"><ShieldCheck className="h-3.5 w-3.5" /> THE FINE PRINT</span>
            <span className="legal-meta">REACTION CLUB · CHEMISTRY</span>
          </div>
          <h1 className="mt-7 max-w-[760px] font-display text-[clamp(2.65rem,7vw,5.6rem)] leading-[.98] font-semibold tracking-[-.065em] text-ink">
            Clear boundaries.
            <br />
            <span className="legal-heading-accent">No hidden clauses.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-[calc(15px*var(--ui-scale))] leading-[1.85] text-ink-soft sm:text-[calc(16px*var(--ui-scale))]">
            A straightforward guide to what Reaction Club offers, how its content should be used, and what happens to the information you save here.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
            <span className="legal-meta">INDEPENDENT STUDY RESOURCE</span>
            <span className="legal-meta">SIX KEY POINTS</span>
            <span className="legal-meta">PLAIN-LANGUAGE SUMMARY</span>
          </div>
        </div>
        <div className="legal-hero-mark" aria-hidden>
          <span className="legal-orbit legal-orbit-one" />
          <span className="legal-orbit legal-orbit-two" />
          <span className="legal-mark-core"><ShieldCheck className="h-12 w-12" strokeWidth={1.25} /></span>
          <span className="legal-mark-dot legal-mark-dot-one" />
          <span className="legal-mark-dot legal-mark-dot-two" />
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <aside className="legal-index h-fit lg:sticky lg:top-28">
          <p className="legal-meta mb-4">ON THIS PAGE</p>
          <nav aria-label="Legal sections" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {SECTIONS.map((section, i) => (
              <a key={section.title} href={`#legal-${i + 1}`} className="legal-index-link">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
          <div className="mt-7 hidden border-t border-ink/10 pt-5 lg:block">
            <p className="text-[calc(12px*var(--ui-scale))] leading-[1.7] text-ink-soft">
              Take a moment to read the full clauses below. The summary is only a starting point.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <Reveal>
            <section className="legal-summary rounded-[26px] p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="legal-meta">AT A GLANCE</p>
                  <h2 className="mt-2 font-display text-[calc(23px*var(--ui-scale))] font-semibold tracking-tight text-ink">The short version</h2>
                </div>
                <span className="legal-summary-stamp"><BadgeCheck className="h-4 w-4" /> THE ESSENTIALS</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {SHORT_VERSION.map((line, i) => (
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
                <p className="legal-meta">THE DETAILS</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">The full picture</h2>
              </div>
              <span className="legal-meta hidden sm:block">01 — 06</span>
            </div>

            <div className="legal-clauses">
              {SECTIONS.map((section, i) => (
                <Reveal key={section.title} delay={Math.min(i * 0.035, 0.16)}>
                  <section id={`legal-${i + 1}`} className="legal-clause scroll-mt-28">
                    <div className="legal-clause-rail">
                      <span className="legal-clause-number">{String(i + 1).padStart(2, "0")}</span>
                      {i < SECTIONS.length - 1 && <span className="legal-clause-line" />}
                    </div>
                    <div className="legal-clause-content">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="legal-clause-icon" style={{ "--legal-accent": section.main } as CSSProperties}>
                          <section.icon className="h-5 w-5" strokeWidth={1.9} />
                        </span>
                        <span className="legal-meta">{section.eyebrow}</span>
                      </div>
                      <h3 className="mt-4 font-display text-[calc(21px*var(--ui-scale))] font-semibold tracking-tight text-ink sm:text-[calc(24px*var(--ui-scale))]">
                        {section.title}
                      </h3>
                      <div className="mt-3 flex max-w-[68ch] flex-col gap-3">
                        {section.body.map((paragraph, j) => (
                          <p key={j} className="text-[calc(14px*var(--ui-scale))] leading-[1.9] text-ink-soft sm:text-[calc(14.5px*var(--ui-scale))]">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.08}>
            <section className="legal-closing mt-8 rounded-[26px] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <p className="legal-meta">ONE LAST THING</p>
              </div>
              <p className="mt-4 max-w-[72ch] text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
                Reaction Club is an independent study companion, not an official Pearson or Edexcel resource. Its original notes are provided as is for personal revision. No account is needed, and your saved progress remains in your browser. Use the site as a helpful supplement, and check important information against the official specification and your teachers' guidance.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
                <span className="legal-meta">THANK YOU FOR READING</span>
                <button type="button" onClick={onBack} className="legal-back-link">Return to your desk <ArrowLeft className="h-4 w-4 rotate-180" /></button>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
