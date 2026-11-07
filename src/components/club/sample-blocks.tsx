"use client";

import type { ReactNode } from "react";
import { Sparkles } from "./icons";
import { ScrollFade } from "./bits";
import { Fmt } from "./format";
import { figureArt, isWideFigure } from "./note-section";
import type { NotesBlock } from "@/lib/spectra/notes-types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the sample note's editorial blocks.
   The reader renders note blocks in its own candy dress — chips,
   washes, drop-downs. This room is the disclaimer's document
   aesthetic, so the very same blocks (same text, same diagrams,
   same order) are re-set as an editorial document instead.

   The room's rule of colour: a section's band-walk accent speaks
   only through its clause icon chip, its statement rule, its table
   signature and its diagram art. Every label, dash and numeral in
   the body speaks the room's rust (--legal-rust), the summary
   numeral's ink-family tone. One device per job —
     · a dash + caps label   for anything boxed
     · a left rule           for noted matter
     · hairline rules above  and below displayed equations
   ═══════════════════════════════════════════════════════════════ */

/* the label — the room's one labeling device for boxed matter */
export function EditorialLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="h-[calc(3px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))] shrink-0 rounded-full"
        style={{ background: "var(--legal-rust-soft)" }}
      />
      <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
        {children}
      </span>
    </div>
  );
}

export function SampleBlockView({
  block: b,
  accent,
  fig,
}: {
  block: NotesBlock;
  accent: string;
  /** the figure's number in the document, when it is one */
  fig?: number;
}) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.9] text-ink-soft">
          <Fmt text={b.text} />
        </p>
      );

    case "h":
      return (
        <div className="flex items-center gap-2.5 pt-1">
          <span
            aria-hidden
            className="h-[calc(3px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))] shrink-0 rounded-full"
            style={{ background: "var(--legal-rust-soft)" }}
          />
          <h4 className="font-display text-[calc(18px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={b.text} />
          </h4>
        </div>
      );

    case "bullets":
      return (
        <ul className="flex max-w-[68ch] flex-col gap-2.5">
          {b.items.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft"
            >
              <span
                aria-hidden
                className="mt-[calc(12px*var(--ui-scale))] h-[calc(2.5px*var(--ui-scale))] w-[calc(11px*var(--ui-scale))] shrink-0 rounded-full"
                style={{ background: "var(--legal-rust-soft)" }}
              />
              <span className="min-w-0">
                <Fmt text={t} />
              </span>
            </li>
          ))}
        </ul>
      );

    /* a note in the margin — the left rule stands in for a box */
    case "note":
      return (
        <aside
          className="max-w-[68ch] border-l-2 pl-4 sm:pl-5"
          style={{ borderColor: "var(--legal-rust-soft)" }}
        >
          <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
            {b.label}
          </span>
          <p className="mt-1.5 text-[calc(13.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </aside>
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

    /* a displayed equation — set between rules, centred, like print */
    case "eq":
      return (
        <div className="max-w-[68ch] border-y border-ink/10 py-5">
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
      );

    case "table":
      return (
        <EditorialTable
          head={b.head}
          rows={b.rows}
          caption={b.caption}
          accent={accent}
        />
      );

    case "worked":
      return (
        <EditorialWorked
          title={b.title}
          question={b.question}
          steps={b.steps}
          answer={b.answer}
        />
      );

    case "steps":
      return <EditorialSteps caption={b.caption} items={b.items} />;

    case "figure":
      return (
        <EditorialFigure
          kind={b.kind}
          caption={b.caption}
          accent={accent}
          fig={fig ?? 1}
        />
      );

    /* the key idea — a pull-quote between hairlines */
    case "wow":
      return (
        <aside className="max-w-[68ch] border-y border-ink/10 py-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--legal-rust)]" />
            <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
              Key idea
            </span>
          </div>
          <p className="mt-2 text-[calc(14.5px*var(--ui-scale))] italic leading-[1.8] text-ink">
            <Fmt text={b.text} />
          </p>
        </aside>
      );

    default:
      return null;
  }
}

/* ————— the editorial table —————
   The site's table signature — the accent dash and 20px semibold
   title, flush with a flat top-left corner — exactly as the reader
   tunes it; the table itself is re-cut as print: hairline rules,
   a tone-on-tone header band, no candy. */

function EditorialTable({
  head,
  rows,
  caption,
  accent,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
  accent: string;
}) {
  return (
    <div className="max-w-full">
      {caption && (
        <div className="mb-2.5 flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-[calc(12px*var(--ui-scale))] h-[calc(4px*var(--ui-scale))] w-[calc(22px*var(--ui-scale))] shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <div className="min-w-0 font-display text-[calc(20px*var(--ui-scale))] leading-snug font-semibold text-ink">
            <Fmt text={caption} />
          </div>
        </div>
      )}
      <div className="legal-card overflow-hidden rounded-[calc(10px*var(--ui-scale))] rounded-tl-none">
        <ScrollFade>
          <table className="w-full min-w-[calc(480px*var(--ui-scale))] border-collapse text-left">
            <thead>
              <tr
                className="border-b border-ink/15"
                style={{
                  background:
                    "color-mix(in oklab, var(--color-ink) 4%, transparent)",
                }}
              >
                {head.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-display text-[calc(11px*var(--ui-scale))] font-semibold tracking-[0.12em] whitespace-nowrap text-ink-soft uppercase sm:px-5"
                  >
                    <Fmt text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-ink/10"
                  style={
                    i % 2 === 1
                      ? {
                          background:
                            "color-mix(in oklab, var(--color-ink) 2.5%, transparent)",
                        }
                      : undefined
                  }
                >
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 align-top text-[calc(13.5px*var(--ui-scale))] leading-[1.65] sm:px-5 ${j === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}
                    >
                      <Fmt text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollFade>
      </div>
    </div>
  );
}

/* ————— the worked example, as an exhibit —————
   Label, title, question; then the reasoning as a numbered
   editorial list — always in full, the way a set document reads —
   and the answer under its own caps label. */

function EditorialWorked({
  title,
  question,
  steps,
  answer,
}: {
  title: string;
  question: string;
  steps: string[];
  answer: string;
}) {
  /* “Worked example · counting σ and π” — the label already says it */
  const bare = title.replace(/^Worked example\s*·\s*/i, "");
  return (
    <div className="legal-card max-w-[68ch] rounded-[calc(18px*var(--ui-scale))] p-5 sm:p-6">
      <EditorialLabel>Worked example</EditorialLabel>
      <h4 className="mt-2 font-display text-[calc(17px*var(--ui-scale))] font-semibold tracking-tight text-ink">
        <Fmt text={bare} />
      </h4>
      <p className="mt-2 text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink">
        <Fmt text={question} />
      </p>
      <ol className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-4">
        {steps.map((s, i) => (
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
          <Fmt text={answer} />
        </p>
      </div>
    </div>
  );
}

/* ————— the method list —————
   The summary card's own device — hairline-topped lines with
   small rust numerals — borrowed for step-by-step methods. */

function EditorialSteps({
  caption,
  items,
}: {
  caption?: string;
  items: { title: string; text: string; icon?: string }[];
}) {
  /* short steps pair up like the summary lines; long tellings
     keep the full measure to themselves */
  const paired =
    items.length >= 2 && items.every((it) => it.text.length <= 140);
  return (
    <div className="legal-card max-w-[68ch] rounded-[calc(18px*var(--ui-scale))] px-5 py-4">
      {caption && (
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-[calc(3px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))] shrink-0 rounded-full"
            style={{ background: "var(--legal-rust-soft)" }}
          />
          <h4 className="font-display text-[calc(16px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={caption} />
          </h4>
        </div>
      )}
      <ol
        className={
          paired
            ? "mt-1 grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2"
            : "mt-1 flex flex-col"
        }
      >
        {items.map((it, i) => {
          /* titles like “1 · Count” hand their number to the rail */
          const bare = it.title.replace(/^\s*\d+\s*[·•]\s*/, "");
          return (
            <li
              key={i}
              className="flex items-start gap-3 border-t border-ink/10 py-3"
            >
              <span
                aria-hidden
                className="w-[calc(18px*var(--ui-scale))] shrink-0 pt-[calc(2px*var(--ui-scale))] font-display text-[calc(11px*var(--ui-scale))] font-bold text-[var(--legal-rust)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="font-display text-[calc(14.5px*var(--ui-scale))] font-semibold text-ink">
                  <Fmt text={bare} />
                </p>
                <p className="mt-1 text-[calc(13.5px*var(--ui-scale))] leading-[1.7] text-ink-soft">
                  <Fmt text={it.text} />
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ————— the exhibit —————
   The reader's diagram, framed in the room's paper card with a
   figure number and the caption set beneath, like a plate. */

function EditorialFigure({
  kind,
  caption,
  accent,
  fig,
}: {
  kind: string;
  caption?: string;
  accent: string;
  fig: number;
}) {
  const node = figureArt(kind, accent);
  if (!node) return null;
  const wide = isWideFigure(kind);
  return (
    <figure className="legal-card rounded-[calc(18px*var(--ui-scale))] p-4 sm:p-6">
      <div className="mb-3 px-1">
        <EditorialLabel>Fig. {String(fig).padStart(2, "0")}</EditorialLabel>
      </div>
      {wide ? (
        <ScrollFade>
          <div className="min-w-[calc(620px*var(--ui-scale))]">{node}</div>
        </ScrollFade>
      ) : (
        <div className="flex justify-center">
          <div className="flex w-full justify-center">{node}</div>
        </div>
      )}
      {caption && (
        <figcaption className="mx-auto mt-3 max-w-[58ch] text-center text-[calc(12.5px*var(--ui-scale))] leading-[1.65] text-ink-faint">
          <Fmt text={caption} />
        </figcaption>
      )}
    </figure>
  );
}
