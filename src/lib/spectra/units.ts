import type { Unit, Topic } from "./types";
import { WCH11_TOPICS } from "./content/wch11";
import { WCH12_TOPICS } from "./content/wch12";
import { WCH13_TOPICS } from "./content/wch13";
import { WCH14_TOPICS } from "./content/wch14";
import { WCH15_TOPICS } from "./content/wch15";
import { WCH16_TOPICS } from "./content/wch16";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · the six units, each carrying the colour of its flame
   Li 670.8 · Na 589.0 · Ba 553.5 · Cu 510.5 · Cs 455.5 · K 404.4 nm
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
    element: { symbol: "Li", name: "lithium", flameName: "crimson", nm: 670.8 },
    color: "#ff4d5e",
    cssVar: "--flame-11",
    lines: [
      { nm: 670.8, rel: 3 },
      { nm: 610.4, rel: 1 },
      { nm: 460.3, rel: 1 },
    ],
    spectrumNote:
      "Lithium's crimson line at 670.8 nm is among the strongest colours any flame makes — the rest of its visible spectrum is sparse.",
    story:
      "Every measurement passes through the mole, every structure through electrostatics, every mechanism through the π bond. Unit 1 is the instrument you calibrate once and use for two years — fluency here is why later units feel like observation instead of memorisation.",
    blurb: "The calibrating unit: moles, atoms, bonds and the first mechanisms.",
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
    element: { symbol: "Na", name: "sodium", flameName: "gold", nm: 589.0 },
    color: "#ffb224",
    cssVar: "--flame-12",
    lines: [
      { nm: 589.0, rel: 3 },
      { nm: 589.6, rel: 2 },
      { nm: 615.4, rel: 1 },
    ],
    spectrumNote:
      "Sodium's golden doublet at 589.0 / 589.6 nm is so intense that a trace of contamination yellows every flame — and every street lamp.",
    story:
      "Energy in, energy out; groups that behave as families; and the first mechanisms where the solvent decides the product. Unit 2 turns Unit 1's vocabulary into explanations — the trend, the displacement, the curly arrow.",
    blurb: "Unit 1's vocabulary becomes explanations: heat, families, and the first choices.",
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
    element: { symbol: "Ba", name: "barium", flameName: "apple-green", nm: 553.5 },
    color: "#43e08c",
    cssVar: "--flame-13",
    lines: [
      { nm: 553.5, rel: 3 },
      { nm: 614.2, rel: 2 },
      { nm: 649.7, rel: 1 },
    ],
    spectrumNote:
      "Barium burns apple-green, its lines clustered across the green-yellow of the spectrum with the strongest at 553.5 nm.",
    story:
      "The first practical paper rewards honesty: uncertainties quoted, titres concordant, graphs drawn to the rules. Unit 3 is marked on how you look — not on what you know.",
    blurb: "Marked on how you look: uncertainty, titration ritual, honest graphs.",
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
    element: { symbol: "Cu", name: "copper", flameName: "blue-green", nm: 510.5 },
    color: "#2cd9c7",
    cssVar: "--flame-14",
    lines: [
      { nm: 510.5, rel: 3 },
      { nm: 515.3, rel: 2 },
      { nm: 521.8, rel: 2 },
      { nm: 570.0, rel: 1 },
    ],
    spectrumNote:
      "Copper(II) colours the flame blue-green — the 510.5 / 515.3 / 521.8 nm triplet is its unmistakable signature.",
    story:
      "Rates, equilibrium and organic chemistry all go quantitative: rate equations and Arrhenius, Kc and Kp, ΔG, and the carbonyl family with its chiral centres. Unit 4 is where the AS toolkit starts paying interest.",
    blurb: "Everything goes quantitative: orders, constants, free energy, chirality.",
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
    element: { symbol: "Cs", name: "caesium", flameName: "deep blue", nm: 455.5 },
    color: "#5e8bff",
    cssVar: "--flame-15",
    lines: [
      { nm: 455.5, rel: 3 },
      { nm: 459.3, rel: 2 },
    ],
    spectrumNote:
      "Caesium's blue lines at 455.5 / 459.3 nm sit deep in the violet-blue — the element whose microwave transition now defines the second itself.",
    story:
      "Electrode potentials predict the future of redox reactions; transition metals paint the d-block with their complexes; benzene and nitrogen chemistry close the organic story. Unit 5 is the summit the whole course has been climbing.",
    blurb: "The summit: cells, colour, the ring, and nitrogen's lone pair.",
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
    element: { symbol: "K", name: "potassium", flameName: "lilac", nm: 404.4 },
    color: "#a06bff",
    cssVar: "--flame-16",
    lines: [
      { nm: 404.4, rel: 3 },
      { nm: 404.7, rel: 2 },
    ],
    spectrumNote:
      "Potassium's lilac is faint: the violet doublet at 404.4 / 404.7 nm is easily masked by sodium's yellow, so cobalt glass filters it out. (Its strongest lines, 766.5 and 769.9 nm, sit just outside the visible band.)",
    story:
      "The final practical paper audits everything from Units 4 and 5 — rates, organic work-ups, electrochemistry and the observation bank — marked on method as much as on result. Close it and the course closes with it.",
    blurb: "The audit: methods, observations and honest evaluation, one last time.",
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
