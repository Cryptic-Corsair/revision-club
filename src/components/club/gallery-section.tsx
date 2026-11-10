"use client";

import type { ReactNode } from "react";
import { figureArt, isWideFigure } from "./note-section";
import { Fmt } from "./format";
import { ScrollFade } from "./bits";
import { specAnchorId } from "@/lib/spectra/scroll-helpers";
import type { NotesBlock, SpecSection } from "@/lib/spectra/notes-types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the gallery section — the white-wall dress's one true
   way a spec section looks. The sibling of SpecSectionView and
   EditorialSectionView: same data, same anchors, a different room.

   The gallery's design law, in one paragraph: WHITE WALLS, WIDE
   LIGHT, ONE ACCENT. The page is a quiet catalog, not a band walk
   and not a newspaper — sections hang in a single column separated
   by hairlines and generous air, each opened by an oversized
   numeral in the room's accent. No candy rotation, no boxed
   furniture below the section scale; the accent (one per lab —
   daylight bronze, night champagne, dune sand, classic espresso
   bronze, --iface-accent) is the only colour that speaks, and the
   diagrams keep their art. Devices, one per job:
     · a dash + caps label      for anything labelled
     · a hairline frame         for cards (def, worked, figure, table)
     · a 2px left rule          for quoted matter (statement, note, wow)
     · hairline top/bottom      for displayed equations
     · dash markers             for lists
   ═══════════════════════════════════════════════════════════════ */

/* the room's accent and its on-accent ink — tokens that travel
   with html[data-iface="gallery"], so every lab re-inks the dress
   in one hop (see globals.css). Plain var() strings, safe inside
   color-mix() and style props alike. */
export const GAL_ACCENT = "var(--iface-accent)";
export const GAL_ACCENT_INK = "var(--iface-accent-ink)";

const hair = (pct: number) =>
  `color-mix(in oklab, var(--color-ink) ${pct}%, transparent)`;

const accentSoft = (pct: number) =>
  `color-mix(in oklab, var(--iface-accent) ${pct}%, transparent)`;

const pad2 = (n: number) => String(n).padStart(2, "0");

/* the label — the room's one labeling device: a short accent dash
   and small caps, quiet at 10px */
export function GalleryLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="h-[2px] w-[14px] shrink-0 rounded-full"
        style={{ background: GAL_ACCENT }}
      />
      <span
        className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase"
        style={{ color: GAL_ACCENT }}
      >
        {children}
      </span>
    </div>
  );
}

/* ————— the block dress ————— */

export function GalleryBlockView({
  block: b,
  fig,
}: {
  block: NotesBlock;
  /** the figure's number in the document, when it is one */
  fig?: number;
}) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[66ch] text-[calc(15px*var(--ui-scale))] leading-[1.9] text-ink-soft">
          <Fmt text={b.text} />
        </p>
      );

    /* a run-in sub-heading — short accent tick, quiet display type */
    case "h":
      return (
        <div className="flex items-center gap-3 pt-1">
          <span
            aria-hidden
            className="h-[2px] w-[18px] shrink-0 rounded-full"
            style={{ background: accentSoft(75) }}
          />
          <h4 className="font-display text-[calc(17.5px*var(--ui-scale))] font-semibold tracking-[-0.01em] text-ink">
            <Fmt text={b.text} />
          </h4>
        </div>
      );

    /* lists read as fine print between en-dashes */
    case "bullets":
      return (
        <ul className="flex max-w-[66ch] flex-col gap-3">
          {b.items.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3.5 text-[calc(15px*var(--ui-scale))] leading-[1.85] text-ink-soft"
            >
              <span
                aria-hidden
                className="mt-[calc(13px*var(--ui-scale))] h-px w-[14px] shrink-0"
                style={{ background: accentSoft(60) }}
              />
              <span className="min-w-0">
                <Fmt text={t} />
              </span>
            </li>
          ))}
        </ul>
      );

    /* a note in the margin — the left rule + the faintest wash */
    case "note":
      return (
        <aside
          className="max-w-[66ch] rounded-r-[14px] border-l-2 bg-ink/[0.03] py-3.5 pl-4 pr-4 sm:pl-5"
          style={{ borderColor: GAL_ACCENT }}
        >
          <GalleryLabel>{b.label}</GalleryLabel>
          <p className="mt-2 text-[calc(14px*var(--ui-scale))] leading-[1.8] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </aside>
      );

    /* the key term — a framed plaque whose top edge is the accent:
       the one card in the room that carries colour on its border */
    case "def":
      return (
        <div
          className="max-w-[66ch] overflow-hidden rounded-[16px] border"
          style={{ borderColor: hair(10) }}
        >
          <div
            aria-hidden
            className="h-[2.5px] w-full"
            style={{
              background: `linear-gradient(90deg, ${GAL_ACCENT}, ${accentSoft(20)})`,
            }}
          />
          <div className="bg-paper px-5 py-4 sm:px-6 sm:py-5">
            <GalleryLabel>Key term</GalleryLabel>
            <h4 className="mt-2.5 font-display text-[calc(18px*var(--ui-scale))] font-semibold tracking-[-0.01em] text-ink">
              <Fmt text={b.term} />
            </h4>
            <p className="mt-1.5 text-[calc(15px*var(--ui-scale))] leading-[1.8] text-ink-soft">
              <Fmt text={b.text} />
            </p>
          </div>
        </div>
      );

    /* a displayed equation — set between straight rules, centred,
       the way a catalog prints its formulae */
    case "eq":
      return (
        <div
          className="max-w-[66ch] border-y py-6"
          style={{ borderColor: hair(10) }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-[calc(16.5px*var(--ui-scale))] font-semibold tracking-[-0.01em] text-ink">
            {b.eq.split(/\s{2,}/).map((part, i) => (
              <span key={i}>
                <Fmt text={part.trim()} />
              </span>
            ))}
          </div>
          {b.note && (
            <p className="mt-3 text-center text-[calc(13px*var(--ui-scale))] leading-[1.7] text-ink-faint">
              <Fmt text={b.note} />
            </p>
          )}
        </div>
      );

    case "table":
      return <GalleryTable head={b.head} rows={b.rows} caption={b.caption} />;

    case "worked":
      return (
        <GalleryWorked
          title={b.title}
          question={b.question}
          steps={b.steps}
          answer={b.answer}
        />
      );

    case "steps":
      return <GallerySteps caption={b.caption} items={b.items} />;

    case "figure":
      return <GalleryFigure kind={b.kind} caption={b.caption} fig={fig ?? 1} />;

    /* the key idea — a pull-quote on the left rule, display type,
       no box: the section's one loud moment */
    case "wow":
      return (
        <aside
          className="max-w-[66ch] border-l-2 py-0.5 pl-4 sm:pl-5"
          style={{ borderColor: GAL_ACCENT }}
        >
          <GalleryLabel>Key idea</GalleryLabel>
          <p className="mt-2 font-display text-[calc(18px*var(--ui-scale))] font-medium leading-[1.6] tracking-[-0.01em] text-ink">
            <Fmt text={b.text} />
          </p>
        </aside>
      );

    default:
      return null;
  }
}

/* ————— the gallery table —————
   The site's table content, re-cut as a catalog plate: one hairline
   frame, a tone-on-tone small-caps header band, zebra at 2% ink.
   No candy anywhere. */

function GalleryTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="max-w-full">
      {caption && (
        <div className="mb-3 flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-[2px] w-[14px] shrink-0 rounded-full"
            style={{ background: GAL_ACCENT }}
          />
          <div className="min-w-0 font-display text-[calc(16px*var(--ui-scale))] font-semibold tracking-[-0.01em] text-ink">
            <Fmt text={caption} />
          </div>
        </div>
      )}
      <div
        className="overflow-hidden rounded-[14px] border"
        style={{ borderColor: hair(10) }}
      >
        <ScrollFade>
          <table className="w-full min-w-[calc(480px*var(--ui-scale))] border-collapse text-left">
            <thead>
              <tr
                className="border-b"
                style={{
                  borderColor: hair(12),
                  background:
                    "color-mix(in oklab, var(--color-ink) 4%, transparent)",
                }}
              >
                {head.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.14em] whitespace-nowrap text-ink-soft uppercase sm:px-5"
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
                  className="border-t"
                  style={{
                    borderColor: hair(8),
                    background:
                      i % 2 === 1
                        ? "color-mix(in oklab, var(--color-ink) 2.5%, transparent)"
                        : undefined,
                  }}
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

/* ————— the worked example —————
   A framed plate: label, title, question; the reasoning as
   accent-numbered lines between hairlines; the answer under its
   caps label at the foot of the frame. Always in full. */

function GalleryWorked({
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
    <div
      className="max-w-[66ch] overflow-hidden rounded-[16px] border bg-paper"
      style={{ borderColor: hair(10) }}
    >
      <div className="p-5 sm:p-6">
        <GalleryLabel>Worked example</GalleryLabel>
        <h4 className="mt-2.5 font-display text-[calc(17.5px*var(--ui-scale))] font-semibold tracking-[-0.01em] text-ink">
          <Fmt text={bare} />
        </h4>
        <p className="mt-2 text-[calc(15px*var(--ui-scale))] leading-[1.8] text-ink">
          <Fmt text={question} />
        </p>
        <ol
          className="mt-4 flex flex-col border-t"
          style={{ borderColor: hair(8) }}
        >
          {steps.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3.5 border-b py-3 last:border-b-0"
              style={{ borderColor: hair(8) }}
            >
              <span
                aria-hidden
                className="w-[22px] shrink-0 pt-[calc(3px*var(--ui-scale))] font-display text-[calc(11px*var(--ui-scale))] font-semibold tabular-nums"
                style={{ color: GAL_ACCENT }}
              >
                {pad2(i + 1)}
              </span>
              <span className="min-w-0 text-[calc(14px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                <Fmt text={s} />
              </span>
            </li>
          ))}
        </ol>
        <div
          className="mt-1 flex items-start gap-3.5 border-t pt-3.5"
          style={{ borderColor: hair(10) }}
        >
          <span
            className="shrink-0 pt-[calc(4px*var(--ui-scale))] font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase"
            style={{ color: GAL_ACCENT }}
          >
            Answer
          </span>
          <p className="text-[calc(15px*var(--ui-scale))] leading-[1.75] font-semibold text-ink">
            <Fmt text={answer} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ————— the method list —————
   Steps in the open air, no frame: hairline-topped lines with
   accent numerals. Short tellings pair into two columns. */

function GallerySteps({
  caption,
  items,
}: {
  caption?: string;
  items: { title: string; text: string; icon?: string }[];
}) {
  const paired =
    items.length >= 2 && items.every((it) => it.text.length <= 140);
  return (
    <div className="max-w-[66ch]">
      {caption && (
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-[2px] w-[18px] shrink-0 rounded-full"
            style={{ background: accentSoft(75) }}
          />
          <h4 className="font-display text-[calc(16px*var(--ui-scale))] font-semibold tracking-[-0.01em] text-ink">
            <Fmt text={caption} />
          </h4>
        </div>
      )}
      <ol
        className={
          paired
            ? "mt-2 grid grid-cols-1 gap-x-9 sm:grid-cols-2"
            : "mt-2 flex flex-col"
        }
      >
        {items.map((it, i) => {
          /* titles like “1 · Count” hand their number to the rail */
          const bare = it.title.replace(/^\s*\d+\s*[·•]\s*/, "");
          return (
            <li
              key={i}
              className="flex items-start gap-3.5 border-t py-3.5"
              style={{ borderColor: hair(8) }}
            >
              <span
                aria-hidden
                className="w-[22px] shrink-0 pt-[calc(2px*var(--ui-scale))] font-display text-[calc(11px*var(--ui-scale))] font-semibold tabular-nums"
                style={{ color: GAL_ACCENT }}
              >
                {pad2(i + 1)}
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
   The reader's diagram, hung on the wall: a hairline frame on
   paper, the plate number running out on a hairline, the caption
   set centred beneath. */

function GalleryFigure({
  kind,
  caption,
  fig,
}: {
  kind: string;
  caption?: string;
  fig: number;
}) {
  const node = figureArt(kind, GAL_ACCENT);
  if (!node) return null;
  const wide = isWideFigure(kind);
  return (
    <figure
      className="max-w-full overflow-hidden rounded-[16px] border bg-paper"
      style={{ borderColor: hair(10) }}
    >
      <div className="flex items-center gap-3 px-4 pt-3.5 sm:px-5">
        <span
          className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase"
          style={{ color: GAL_ACCENT }}
        >
          Fig. {pad2(fig)}
        </span>
        <span
          aria-hidden
          className="h-px min-w-4 flex-1"
          style={{ background: hair(8) }}
        />
      </div>
      <div className="p-4 pt-3 sm:p-5 sm:pt-4">
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
          <figcaption className="mx-auto mt-3.5 max-w-[58ch] text-center text-[calc(12.5px*var(--ui-scale))] leading-[1.65] text-ink-faint">
            <Fmt text={caption} />
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/* ————— the section —————
   One wall label: the oversized numeral opens the section, the
   spec number rides above the title in small caps, the official
   statement sits on the left rule, and the blocks follow in the
   open air. The hairline between sections is the parent's job. */

export function GallerySectionView({
  section,
  index,
  bannerAction,
  figOffset = 0,
}: {
  section: SpecSection;
  /** the section's position in the document, 0-based — drives the
      oversized numeral */
  index: number;
  /** the control riding the header — the pack tick */
  bannerAction?: ReactNode;
  /** figures printed before this section, for document-wide
      plate numbering */
  figOffset?: number;
}) {
  let figCount = 0;
  return (
    <section
      id={specAnchorId("spec-", section.spec)}
      className="gal-section spec-anchor relative"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <span
          aria-hidden
          className="w-[calc(52px*var(--ui-scale))] shrink-0 font-display text-[calc(32px*var(--ui-scale))] leading-[0.95] font-medium tracking-[-0.03em] tabular-nums select-none sm:text-[calc(40px*var(--ui-scale))]"
          style={{ color: accentSoft(85) }}
        >
          {pad2(index + 1)}
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase text-ink-faint">
            Spec {section.spec}
          </span>
          <h3 className="mt-1.5 font-display text-[calc(22px*var(--ui-scale))] leading-[1.2] font-semibold tracking-[-0.02em] text-ink sm:text-[calc(25px*var(--ui-scale))]">
            {section.title}
          </h3>
        </div>
        {bannerAction && <div className="shrink-0 pt-1">{bannerAction}</div>}
      </div>

      <div
        className="mt-6 max-w-[70ch] border-l-2 py-0.5 pl-4 sm:pl-5"
        style={{ borderColor: GAL_ACCENT }}
      >
        <span
          className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase"
          style={{ color: GAL_ACCENT }}
        >
          From the specification
        </span>
        <p className="mt-1.5 text-[calc(15.5px*var(--ui-scale))] leading-[1.75] text-ink italic">
          <Fmt text={section.statement} />
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-6">
        {section.blocks.map((b, j) => {
          const fig =
            b.k === "figure" ? figOffset + ++figCount : undefined;
          return <GalleryBlockView key={j} block={b} fig={fig} />;
        })}
      </div>
    </section>
  );
}

/* ————— cumulative figure counts —————
   The parent walks the doc once and hands each section its plate
   offset (the same recipe the editorial family runs). */

export function figOffsetsOf(sections: SpecSection[]): number[] {
  const offsets: number[] = [];
  let n = 0;
  for (const s of sections) {
    offsets.push(n);
    n += s.blocks.filter((b) => b.k === "figure").length;
  }
  return offsets;
}
