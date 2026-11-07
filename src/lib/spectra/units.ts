import type { Unit, Topic } from "./types";
import { WCH11_TOPICS } from "./content/wch11";
import { WCH12_TOPICS } from "./content/wch12";
import { WCH13_TOPICS } from "./content/wch13";
import { WCH14_TOPICS } from "./content/wch14";
import { WCH15_TOPICS } from "./content/wch15";
import { WCH16_TOPICS } from "./content/wch16";

/* ═══════════════════════════════════════════════════════════════
   The six units of the IAL chemistry course — each wearing its
   own candy colour across the site, and each with a glyph that
   tells its chemistry story (see UNIT_GLYPH in components/club).
   ═══════════════════════════════════════════════════════════════ */

export const UNITS: Unit[] = [
  {
    code: "WCH11",
    index: 1,
    stage: "IAS",
    title: "Structure, Bonding and Introduction to Organic Chemistry",
    shortTitle: "Structure & bonding",
    topicRange: "Topics 1–5",
    paper: {
      duration: "1 h 30 m",
      marks: 80,
      stageWeight: "AS 40%",
      ialWeight: "IAL 20%",
    },
    candy: { main: "#FF6B6B" },
    blurb:
      "Covers Topics 1–5: formulae, equations and the mole, atomic structure, bonding, and an introduction to organic chemistry.",
    topics: WCH11_TOPICS,
  },
  {
    code: "WCH12",
    index: 2,
    stage: "IAS",
    title: "Energetics, Group Chemistry, Halogenoalkanes and Alcohols",
    shortTitle: "Energetics & groups",
    topicRange: "Topics 6–10",
    paper: {
      duration: "1 h 30 m",
      marks: 80,
      stageWeight: "AS 40%",
      ialWeight: "IAL 20%",
    },
    candy: { main: "#FF922B" },
    blurb:
      "Covers Topics 6–10: energetics, intermolecular forces, redox and group chemistry, halogenoalkanes and alcohols.",
    topics: WCH12_TOPICS,
  },
  {
    code: "WCH13",
    index: 3,
    stage: "IAS",
    title: "Practical Skills in Chemistry I",
    shortTitle: "Practical skills I",
    topicRange: "Practical skills · AS",
    paper: {
      duration: "1 h 20 m",
      marks: 50,
      stageWeight: "AS 20%",
      ialWeight: "IAL 10%",
    },
    candy: { main: "#12B886" },
    blurb:
      "The AS practical skills: qualitative analysis — flame tests and the gas, ion and halide tests — plus the core practicals from molar volume to organic oxidation, the distillation and reflux rigs, and measurement uncertainty.",
    topics: WCH13_TOPICS,
  },
  {
    code: "WCH14",
    index: 4,
    stage: "IA2",
    title: "Rates, Equilibria and Further Organic Chemistry",
    shortTitle: "Rates & equilibria",
    topicRange: "Topics 11–16",
    paper: {
      duration: "1 h 45 m",
      marks: 90,
      stageWeight: "A2 40%",
      ialWeight: "IAL 20%",
    },
    candy: { main: "#9775FA" },
    blurb:
      "Covers Topics 11–16: reaction rates, chemical equilibrium, acid–base equilibria, and further organic chemistry including carbonyls and chirality.",
    topics: WCH14_TOPICS,
  },
  {
    code: "WCH15",
    index: 5,
    stage: "IA2",
    title: "Transition Metals and Organic Nitrogen Chemistry",
    shortTitle: "Transition metals & nitrogen",
    topicRange: "Topics 17–21",
    paper: {
      duration: "1 h 45 m",
      marks: 90,
      stageWeight: "A2 40%",
      ialWeight: "IAL 20%",
    },
    candy: { main: "#F06595" },
    blurb:
      "Covers Topics 17–21: redox and electrode potentials, transition metals, benzene and aromatic compounds, and nitrogen chemistry.",
    topics: WCH15_TOPICS,
  },
  {
    code: "WCH16",
    index: 6,
    stage: "IA2",
    title: "Practical Skills in Chemistry II",
    shortTitle: "Practical skills II",
    topicRange: "Practical skills · A2",
    paper: {
      duration: "1 h 20 m",
      marks: 50,
      stageWeight: "A2 20%",
      ialWeight: "IAL 10%",
    },
    candy: { main: "#F59F00" },
    blurb:
      "The A2 practical skills: kinetics experiments, organic techniques and tests, and how to write practical exam answers.",
    topics: WCH16_TOPICS,
  },
];

/* ————— helpers ————— */

export function getUnit(code: string): Unit | undefined {
  return UNITS.find((u) => u.code === code);
}

export function getTopic(code: string, topicId: string): Topic | undefined {
  return getUnit(code)?.topics.find((t) => t.id === topicId);
}

export const TOTALS = (() => {
  const topics = UNITS.reduce((n, u) => n + u.topics.length, 0);
  const minutes = UNITS.reduce(
    (n, u) => n + u.topics.reduce((m, t) => m + t.minutes, 0),
    0
  );
  let checks = 0;
  let examples = 0;
  let tables = 0;
  for (const u of UNITS)
    for (const t of u.topics)
      for (const b of t.blocks) {
        if (b.k === "check") checks += b.qs.length;
        if (b.k === "ex") examples += 1;
        if (b.k === "table") tables += 1;
      }
  return { topics, minutes, checks, examples, tables };
})();
