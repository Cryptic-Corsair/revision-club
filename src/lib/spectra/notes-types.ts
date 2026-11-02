import type { UnitCode } from "./types";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · spec-by-spec revision notes
   A full revision note (verbatim from the source document) cut
   into one section per specification point, with the official
   spec statement stated above each section.
   Inline markup: **bold** · *em* · ==highlight== · ~sub~ · ^sup^
   — rendered by <Fmt/>.
   ═══════════════════════════════════════════════════════════════ */

export type FigureKind =
  | "atom"
  | "notation"
  | "mass-spec"
  | "shielding"
  | "spectrum-neon"
  | "spectrum-boron"
  | "spectrum-bromine"
  | "spectrum-cl2"
  | "spectrum-ethanol"
  | "orbitals"
  | "fill-demo"
  | "fill-order"
  | "boxes-c"
  | "boxes-s"
  | "ie-graph"
  | "succ-ie"
  | "melting"
  | "pt-blocks"
  | "radius"
  | "sigma-pi"
  | "dotcross"
  | "carbon-lattices"
  | "shapes"
  | "dipoles"
  | "formula-types"
  | "naming"
  | "frac-col"
  | "isomers"
  | "radchain";

export type NotesBlock =
  | { k: "p"; text: string }
  | { k: "h"; text: string }
  | { k: "bullets"; items: string[] }
  | { k: "note"; label: string; text: string }
  | { k: "def"; term: string; text: string }
  | { k: "eq"; eq: string; note?: string }
  | { k: "table"; head: string[]; rows: string[][]; caption?: string }
  | { k: "worked"; title: string; question: string; steps: string[]; answer: string }
  | { k: "steps"; caption?: string; items: { title: string; text: string; icon?: string }[] }
  | { k: "checkpoint"; page: number }
  | { k: "figure"; kind: FigureKind; caption?: string }
  | { k: "wow"; text: string };

export interface SpecSection {
  /** spec number, e.g. "2.6" */
  spec: string;
  /** the official statement, verbatim — stated above the section */
  statement: string;
  /** short direct title for the section */
  title: string;
  blocks: NotesBlock[];
}

export interface NotesDoc {
  id: string;
  unitCode: UnitCode;
  topicId: string;
  kicker: string;
  title: string;
  source: string;
  intro: NotesBlock[];
  sections: SpecSection[];
  outro?: NotesBlock[];
}
