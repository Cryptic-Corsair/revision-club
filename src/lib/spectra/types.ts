/* ═══════════════════════════════════════════════════════════════
   SPECTRA · data types
   Inline markup: **bold** · *em* · ==highlight== · ~subscript~
   · ^superscript^ — rendered by <Fmt/> in format.tsx.
   ═══════════════════════════════════════════════════════════════ */

export type Stage = "IAS" | "IA2";

export type UnitCode = "WCH11" | "WCH12" | "WCH13" | "WCH14" | "WCH15" | "WCH16";

/** The colour a unit wears across the site */
export interface Candy {
  /** main colour (hex) */
  main: string;
  /** plain colour name, e.g. "red" */
  name: string;
}

/** rel: relative intensity of an emission line — 3 is the dominant line */
export interface SpectralLine {
  nm: number;
  rel: 1 | 2 | 3;
}

export interface PaperInfo {
  duration: string;
  marks: number;
  stageWeight: string;
  ialWeight: string;
}

export interface ElementId {
  symbol: string;
  name: string;
  flameName: string;
  nm: number;
}

export type Block =
  | { k: "p"; text: string }
  | { k: "def"; term: string; text: string }
  | { k: "eq"; title?: string; eq: string; note?: string; ok?: string[] }
  | { k: "ex"; title: string; steps: string[]; answer: string }
  | { k: "tips"; items: string[] }
  | { k: "table"; head: string[]; rows: string[][]; caption?: string }
  | { k: "check"; qs: { q: string; a: string }[] }
  | { k: "recap"; items: string[] };

export interface Topic {
  id: string;
  no: string;
  /** spec-facing label, e.g. "Topic 1" or "Practical 1" */
  label: string;
  title: string;
  summary: string;
  minutes: number;
  ao: ("AO1" | "AO2" | "AO3")[];
  blocks: Block[];
}

export interface Unit {
  code: UnitCode;
  index: number;
  stage: Stage;
  title: string;
  shortTitle: string;
  topicRange: string;
  paper: PaperInfo;
  element: ElementId;
  color: string;
  cssVar: string;
  candy: Candy;
  lines: SpectralLine[];
  /** annotation shown under the unit's spectrum strip */
  spectrumNote?: string;
  blurb: string;
  marksData?: { label: string; pct: number }[];
  marksSource?: string;
  topics: Topic[];
}
