"use client";

import type { CSSProperties, ReactNode } from "react";
import {
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
import { tint } from "./bits";
import { Fmt } from "./format";
import { SampleBlockView } from "./sample-blocks";
import { specAnchorId } from "@/lib/spectra/scroll-helpers";
import type { SpecSection } from "@/lib/spectra/notes-types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the editorial section — the document room's one true
   way a spec section looks. The sibling of SpecSectionView: same
   idea, same data, the disclaimer page's dress — a numbered clause
   rail, the accent icon chip, the official statement under its
   five-point rule, and the note's blocks re-set editorially by
   SampleBlockView.

   Served to every editorial notes surface — the real notes reader
   and the pack's assembled clauses alike. One furniture set,
   so every page that wears the document room ages together.
   ═══════════════════════════════════════════════════════════════ */

/* one friendly icon per clause, walked in order — the shared
   shelf every editorial page rotates through */
export const CLAUSE_ICONS = [
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

export function EditorialSectionView({
  section,
  index,
  total,
  accent,
  eyebrow,
  anchorPrefix = "spec-",
  hideStatement = false,
  bannerAction,
  figOffset = 0,
}: {
  section: SpecSection;
  /** the section's position in the document, 0-based — drives the
      clause numeral and the rail connector */
  index: number;
  total: number;
  /** the band-walk accent — speaks through the icon chip and the
      statement rule only; the body speaks the room's rust */
  accent: string;
  /** the small caps line beside the icon chip —
      "SPEC 2.6 · WCH11 TOPIC 3" */
  eyebrow?: string;
  /** the DOM id prefix of this document's anchors — "spec-" on the
      real notes, matching each room's anchor prefix */
  anchorPrefix?: string;
  hideStatement?: boolean;
  /** the control riding the clause header — the pack tick, as in
      the classic reader */
  bannerAction?: ReactNode;
  /** figures printed before this section, for document-wide
      plate numbering */
  figOffset?: number;
}) {
  const Icon = CLAUSE_ICONS[index % CLAUSE_ICONS.length];
  let figCount = 0;
  return (
    <section
      id={specAnchorId(anchorPrefix, section.spec)}
      className="legal-clause spec-anchor"
    >
      <div className="legal-clause-rail">
        <span className="legal-clause-number">{String(index + 1).padStart(2, "0")}</span>
        {index < total - 1 && <span className="legal-clause-line" />}
      </div>
      <div className="legal-clause-content">
        <div className="flex flex-wrap items-center gap-3">
          <span className="legal-clause-icon" style={{ "--legal-accent": accent } as CSSProperties}>
            <Icon className="h-5 w-5" strokeWidth={1.9} />
          </span>
          {eyebrow && <span className="legal-meta">{eyebrow}</span>}
          {bannerAction && <span className="ml-auto">{bannerAction}</span>}
        </div>
        <h3 className="mt-4 font-display text-[calc(21px*var(--ui-scale))] font-semibold tracking-tight text-ink sm:text-[calc(24px*var(--ui-scale))]">
          {section.title}
        </h3>
        {!hideStatement && (
          <div
            className="mt-4 max-w-[72ch] rounded-[calc(18px*var(--ui-scale))] bg-paper/90 px-5 py-4"
            style={{ borderLeft: `5px solid ${tint(accent, 45)}` }}
          >
            <div className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase text-[var(--legal-rust)]">
              From the specification
            </div>
            <p className="mt-1.5 text-[calc(14.5px*var(--ui-scale))] leading-[1.75] text-ink italic">
              <Fmt text={section.statement} />
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-col gap-5">
          {section.blocks.map((b, j) => {
            const fig =
              b.k === "figure" ? figOffset + ++figCount : undefined;
            return (
              <SampleBlockView key={j} block={b} accent={accent} fig={fig} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** cumulative figure counts — the parent walks the doc once and
    hands each section its plate offset */
export function figOffsetsOf(sections: SpecSection[]): number[] {
  const offsets: number[] = [];
  let n = 0;
  for (const s of sections) {
    offsets.push(n);
    n += s.blocks.filter((b) => b.k === "figure").length;
  }
  return offsets;
}
