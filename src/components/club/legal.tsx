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
    title: "Purpose and scope",
    body: [
      "IAL CHEM is an independent revision resource for the Pearson Edexcel International Advanced Level Chemistry specification (2018), units WCH11–WCH16. The site provides revision notes and worked examples for educational use. It is not a course, tutoring service, textbook or official Pearson resource.",
      "Use this material alongside instruction from your teachers, your course materials, the current specification and official past papers. It is intended to supplement, not replace, those resources.",
    ],
  },
  {
    icon: BadgeCheck,
    main: "#D99A4B",
    eyebrow: "02 / CONTENT STANDARD",
    title: "Accuracy and availability",
    body: [
      "We take care to prepare and review the material against the published specification. However, the content is provided “as is” and “as available”. We make no warranty, express or implied, that it is accurate, complete, up to date or suitable for a particular purpose.",
      "Errors or omissions may occur, and examination specifications may be revised. Content and site availability may also change without notice. Check important information against the official Pearson specification and other authoritative course materials before relying on it.",
    ],
  },
  {
    icon: ShieldCheck,
    main: "#8D82B8",
    eyebrow: "03 / INDEPENDENCE",
    title: "Affiliation and trademarks",
    body: [
      "IAL CHEM is independent and is not affiliated with, endorsed by, sponsored by or otherwise associated with Pearson Education Limited, Edexcel or any examination board. The names “Pearson” and “Edexcel”, and their associated marks, are used only to identify the qualification and specification to which this resource relates. Those names and marks remain the property of their respective owners.",
      "Any brief extracts from the 2018 specification are included for educational reference. Their use does not imply approval or endorsement by Pearson, and does not give IAL CHEM any official status in relation to the qualification.",
    ],
  },
  {
    icon: Copy,
    main: "#B87991",
    eyebrow: "04 / OWNERSHIP",
    title: "Copyright and permitted use",
    body: [
      "Unless otherwise indicated, the notes, worked examples, illustrations and software on this site are original materials created for IAL CHEM. They may not be copied or reused except as permitted by applicable law or with prior written permission. Official examination papers and mark schemes should be obtained from the relevant examination board.",
      "You may access and use the materials for your own personal study. You must not reproduce, distribute, sell, publish or systematically extract site content without prior permission, unless applicable law permits that use. If you believe material on the site infringes your rights, contact the site operator with details of the material and the basis of your claim.",
    ],
  },
  {
    icon: Lock,
    main: "#5E9B83",
    eyebrow: "05 / YOUR DATA",
    title: "Data and local storage",
    body: [
      "IAL CHEM does not require an account. Your revision progress, goals, reading information, saved revision-pack items and display preferences are stored in your browser’s local storage. This information is held in that browser on that device and is not available to us through the site.",
      "Local storage is specific to the browser and device in which the information was saved. Clearing that browser’s site data, using a different browser or changing devices may remove or make the information unavailable. We cannot restore locally stored progress if it is lost.",
    ],
  },
  {
    icon: Info,
    main: "#C18C4C",
    eyebrow: "06 / RESPONSIBILITY",
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by applicable law, IAL CHEM and its contributors exclude liability for loss or damage arising from, or in connection with, use of the site or reliance on its content. This includes, without limitation, indirect or consequential loss, loss of data, and academic or examination outcomes. You remain responsible for checking information and decisions relating to your studies with your teachers and the relevant examination board.",
      "Nothing in this disclaimer excludes or limits liability where such exclusion or limitation is prohibited by law. Any rights that cannot lawfully be excluded remain unaffected.",
    ],
  },
];

const SHORT_VERSION = [
  "An independent revision resource. Not affiliated with Pearson or Edexcel.",
  "Content is provided as is. Check important information against official materials.",
  "No account is required. Revision data is stored locally in your browser.",
  "For personal study; it does not replace teaching or official course materials.",
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
            <span className="legal-kicker"><ShieldCheck className="h-3.5 w-3.5" /> DISCLAIMER</span>
            <span className="legal-meta">IAL CHEM · CHEMISTRY</span>
          </div>
          <h1 className="mt-7 max-w-[760px] font-display text-[clamp(2.65rem,7vw,5.6rem)] leading-[.98] font-semibold tracking-[-.065em] text-ink">
            Disclaimer and
            <br />
            <span className="legal-heading-accent">terms of use.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-[calc(15px*var(--ui-scale))] leading-[1.85] text-ink-soft sm:text-[calc(16px*var(--ui-scale))]">
            Please read the following information before using IAL CHEM. It explains the scope of this resource, permitted use of its content, and how information saved by the site is stored.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
            <span className="legal-meta">INDEPENDENT STUDY RESOURCE</span>
            <span className="legal-meta">SIX SECTIONS</span>
            <span className="legal-meta">SUMMARY AND TERMS</span>
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
          <p className="legal-meta mb-4">CONTENTS</p>
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
              The summary is provided for convenience. The sections below contain the full disclaimer.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <Reveal>
            <section className="legal-summary rounded-[26px] p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="legal-meta">SUMMARY</p>
                  <h2 className="mt-2 font-display text-[calc(23px*var(--ui-scale))] font-semibold tracking-tight text-ink">Summary</h2>
                </div>
                <span className="legal-summary-stamp"><BadgeCheck className="h-4 w-4" /> KEY POINTS</span>
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
                <p className="legal-meta">DISCLAIMER</p>
                <h2 className="mt-1 font-display text-[calc(25px*var(--ui-scale))] font-semibold tracking-tight text-ink">Full terms</h2>
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
                <p className="legal-meta">IMPORTANT</p>
              </div>
              <p className="mt-4 max-w-[72ch] text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
                IAL CHEM is an independent study companion, not an official Pearson or Edexcel resource. Its original notes are provided as is for personal revision. No account is needed, and your saved progress remains in your browser. Use the site as a helpful supplement, and check important information against the official specification and your teachers' guidance.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
                <span className="legal-meta">END OF DISCLAIMER</span>
                <button type="button" onClick={onBack} className="legal-back-link">Back to home <ArrowLeft className="h-4 w-4 rotate-180" /></button>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
