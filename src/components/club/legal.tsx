"use client";

import { ArrowLeft, BadgeCheck, BookOpen, Copy, Info, Lock, ShieldCheck } from "./icons";
import { PopIn, Reveal, SoftButton, honeyWash, readableInk } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the small print — the disclaimer & legal room.

   One page holding the whole legal picture: what the site is,
   accuracy as-is, the honest "not Pearson" line, copyright, the
   privacy promise and the liability cap. Written in the site's
   own voice — plain words, no fog — but every paragraph carries
   real weight; this is where "educational, independent, private"
   stops being marketing and becomes a commitment.

   The room has exactly one door: the footer. It is not in the
   nav, not in search, not linked from any other view — a quiet
   page for the one moment a visitor goes looking for it.
   ═══════════════════════════════════════════════════════════════ */

type Section = {
  icon: typeof BookOpen;
  main: string;
  title: string;
  body: string[];
};

const SECTIONS: Section[] = [
  {
    icon: BookOpen,
    main: "#FF6B6B",
    title: "What this site is",
    body: [
      "Reaction Club is a free, independent revision companion for the Pearson Edexcel International A Level Chemistry (2018) specification, WCH11–WCH16. It offers original notes, worked examples and checkpoint questions to support your studying — it is not a course, a tutor, a textbook or an official Pearson resource, and it does not replace any of those.",
      "Your teacher, your class notes, the official specification and past papers remain the source of truth for your studies. Treat every page here as one helpful voice among several, not the final word.",
    ],
  },
  {
    icon: BadgeCheck,
    main: "#FF922B",
    title: "Accuracy — provided as is",
    body: [
      "Every page is written and checked carefully against the published specification, but the content is provided \u201Cas is\u201D and \u201Cas available\u201D, with no warranty or guarantee of any kind, express or implied, about its accuracy, completeness, currency or fitness for a particular purpose.",
      "Mistakes can slip through, the specification can change, and the site can be updated, corrected or taken offline at any time without notice. Before anything that matters — an exam answer, a coursework claim, a definition you will quote — verify it against official materials.",
    ],
  },
  {
    icon: ShieldCheck,
    main: "#9775FA",
    title: "Trademarks & no affiliation",
    body: [
      "Reaction Club is not affiliated with, endorsed by, sponsored by or connected to Pearson Education Ltd, Edexcel, or any examination board. \u201CPearson\u201D, \u201CEdexcel\u201D and related names and marks are trademarks of Pearson Education Ltd; they appear here only for identification — to say honestly which specification the notes follow.",
      "Specification statements are quoted briefly from the publicly available (2018) specification for teaching and reference. That quotation implies no endorsement, and it grants this site no ownership of, or official standing within, the qualification.",
    ],
  },
  {
    icon: Copy,
    main: "#F06595",
    title: "Copyright & fair use",
    body: [
      "Unless stated otherwise, the notes, worked examples, checkpoint questions, figures and code on this site are original work belonging to Reaction Club. Past-paper questions and mark schemes are not reproduced — revise from your exam board's own papers for that.",
      "You are welcome to read and revise from the site for personal study. Please don't scrape, redistribute, resell or republish its content without permission. If you believe material that belongs to you appears here in error, flag it and it will be removed promptly.",
    ],
  },
  {
    icon: Lock,
    main: "#12B886",
    title: "Your privacy",
    body: [
      "The site runs without accounts, ads, trackers or analytics, and sets no cookies of its own. Everything you do here — revised ticks, reading time, goals, your revision pack, theme and font preferences — is saved in your own browser's local storage and never leaves your device.",
      "There are no copies of that progress anywhere else. Clear your browser data and it is gone for good — which is a feature and a limitation at once: nothing is collected, so nothing can be recovered for you either.",
    ],
  },
  {
    icon: Info,
    main: "#F59F00",
    title: "No liability",
    body: [
      "To the fullest extent the law allows, Reaction Club accepts no liability for any loss or damage — including lost marks, missed deadlines or exam outcomes — claimed to follow from using the site or relying on its content. The site is a study aid, and study decisions, exam entries and final preparation belong to you and your school.",
      "Nothing on this page limits liability where doing so would be unenforceable — for anything not covered above, the law of your jurisdiction applies as usual.",
    ],
  },
];

const SHORT_VERSION = [
  "An independent study aid — original notes, no Pearson affiliation.",
  "Best-effort accuracy, provided as is — verify what matters.",
  "No accounts, no ads, no trackers — your data stays in your browser.",
  "Personal study use; nothing replaces your teacher or the official spec.",
];

export function Legal({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-[calc(6rem+var(--sa-top))] pb-24 sm:px-8">
      {/* ————— header ————— */}
      <PopIn>
        <SoftButton
          onClick={onBack}
          className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]"
          ariaLabel="Back home"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </SoftButton>
      </PopIn>

      <PopIn delay={0.05} className="mt-7">
        <span
          className="inline-flex -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.14em] text-white uppercase"
          style={{ background: "#3D2B1F" }}
        >
          <ShieldCheck className="h-3.5 w-3.5" /> Disclaimer &amp; legal
        </span>
        <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.2rem)] leading-[1.05] font-semibold tracking-tight text-ink">
          The small print,
          <br />
          in plain words.
        </h1>
        <p className="mt-4 max-w-[56ch] text-[calc(16px*var(--ui-scale))] leading-[1.8] text-ink-soft">
          Everything below is the whole legal picture for Reaction Club — what
          the site is, what it isn&apos;t, and where the line sits. It&apos;s
          short on purpose: no accounts, no ads, nothing collected, so there is
          nothing to bury.
        </p>
      </PopIn>

      {/* ————— the short version ————— */}
      <Reveal delay={0.12} className="mt-6">
        <div
          className="rounded-[calc(26px*var(--ui-scale))] px-5 py-4.5 puff"
          style={{ background: honeyWash("#FFD43B", 16) }}
        >
          <div className="font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink uppercase">
            The short version
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {SHORT_VERSION.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                  strokeWidth={2.3}
                />
                <span className="text-[calc(13.5px*var(--ui-scale))] leading-snug font-bold text-ink">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ————— the six clauses ————— */}
      <div className="mt-6 flex flex-col gap-4">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={0.04 * i}>
            <section
              className="rounded-[calc(26px*var(--ui-scale))] bg-paper p-5 sm:p-6"
              style={{ boxShadow: "0 2.5px 0 var(--edge)" }}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-[calc(13px*var(--ui-scale))] font-bold"
                  style={{ background: s.main, color: readableInk(s.main) }}
                  aria-hidden
                >
                  <s.icon className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <h2 className="font-display text-[calc(17.5px*var(--ui-scale))] font-bold text-ink">
                  {i + 1}. {s.title}
                </h2>
              </div>
              <div className="mt-3.5 flex flex-col gap-3">
                {s.body.map((p, j) => (
                  <p
                    key={j}
                    className="text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* ————— to reiterate —————
          the disclaimer & legal, said once more in one breath —
          the top strip opens the case, the clauses argue it, this
          closes it */}
      <Reveal delay={0.1} className="mt-7">
        <div
          className="rounded-[calc(26px*var(--ui-scale))] px-5 py-4.5 puff"
          style={{ background: honeyWash("#FFD43B", 16) }}
        >
          <div className="flex items-center gap-2 font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink uppercase">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.3} /> To reiterate
          </div>
          <p className="mt-3 text-[calc(13.5px*var(--ui-scale))] leading-[1.8] font-semibold text-ink">
            Reaction Club is independent — no affiliation with, and no
            endorsement or sponsorship by, Pearson Education Ltd or Edexcel.
            The notes are original study support, provided as is, with no
            warranty of accuracy or completeness; use them for personal
            revision, and please don&apos;t redistribute or republish them.
            Nothing you do here leaves your browser — no accounts, no ads, no
            trackers, no data collected. Verify anything that matters against
            the official specification and past papers, and read the clauses
            above for the full picture.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
