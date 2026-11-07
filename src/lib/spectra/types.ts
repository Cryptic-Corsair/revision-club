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
}

export interface PaperInfo {
  duration: string;
  marks: number;
  stageWeight: string;
  ialWeight: string;
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
  candy: Candy;
  blurb: string;
  marksData?: { label: string; pct: number }[];
  marksSource?: string;
  topics: Topic[];
}
