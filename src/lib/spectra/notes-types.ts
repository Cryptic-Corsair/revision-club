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
  | "radchain"
  | "sp2"
  | "geometric"
  | "ez"
  | "elecadd"
  | "carbocation"
  | "polymer"
  | "thermo"
  | "levels"
  | "profiles"
  | "calorimetry"
  | "hess-general"
  | "hess-co"
  | "hess-ch4"
  | "hess-caco3"
  | "hess-butane"
  | "bond-h2o"
  | "cooling-curve"
  | "london"
  | "contact"
  | "hbond-water"
  | "hbond-nh3"
  | "hbond-hf"
  | "dimer"
  | "viscosity"
  | "hydrides"
  | "ice"
  | "hydration"
  | "ethanol-water"
  | "solubility"
  | "mixing"
  | "etransfer"
  | "agents"
  | "disprop"
  | "ie-down"
  | "g2-solubility"
  | "polarise"
  | "flame-etc"
  | "flame-colours"
  | "thermal-exp"
  | "titration-rig"
  | "std-solution"
  | "titre-targets"
  | "g7-trends"
  | "halogen-colours"
  | "displacement"
  | "cl2-fates"
  | "h2so4-ladder"
  | "halide-test"
  | "rate-factors"
  | "co2-curves"
  | "orientation"
  | "rate-graphs"
  | "mb-curve"
  | "mb-temperature"
  | "catalyst-profile"
  | "mb-catalyst"
  | "het-catalyst"
  | "eq-dynamic"
  | "eq-chromate"
  | "eq-pressure"
  | "eq-temperature"
  | "eq-conflict"
  | "eq-haber"
  | "eq-contact"
  | "hx-isomers"
  | "hx-classes"
  | "hx-bond"
  | "hx-carbocation"
  | "hx-reflux"
  | "hx-scheme"
  | "hx-hydrolysis"
  | "hx-sn2-oh"
  | "hx-sn2-nh3"
  | "alc-angles"
  | "alc-classes"
  | "alc-solubility"
  | "alc-dehydration"
  | "alc-ox-flow"
  | "alc-distillation"
  | "alc-reflux"
  | "alc-fractional"
  | "alc-funnel"
  | "alc-bp"
  | "ms-butane"
  | "ms-propanal"
  | "ms-ethane-frags"
  | "ms-iso-c"
  | "ms-iso-br"
  | "ms-iso-cl"
  | "ir-vibrations"
  | "ir-axes"
  | "ir-butanone"
  | "ir-ethanol"
  | "ir-propanoic"
  | "ir-propene"
  | "ir-halides"
  | "ir-amines";

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
