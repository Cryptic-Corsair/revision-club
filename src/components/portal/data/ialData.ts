/* The portal's two dresses are the club's own labs, renamed honestly:
   'dune' is the workspace's chocolate room (html.dune in globals.css —
   the factory dress) and 'light' is the daylight cream lab. The toggle
   in the portal navbar re-dresses the page between the two rooms. */
import { UNITS as CLUB_UNITS } from '@/lib/spectra/units';

export type SiteTheme = 'dune' | 'light';
/* The hero's workbench preview dots try the club's four labs on the
   stage — same ids as the workspace's lab names, same palettes. */
export type PreviewThemeId = 'night' | 'light' | 'dune' | 'classic';

export interface GlobalMetrics {
  units: number;
  topics: number;
  hoursLabel: string;
  totalMinutes: number;
  workedExamples: number;
}

export interface IalUnit {
  code: 'WCH11' | 'WCH12' | 'WCH13' | 'WCH14' | 'WCH15' | 'WCH16';
  shortLabel: string;
  levelTag: string;
  title: string;
  topicsCount: number;
  minutes: number;
  scope: string;
  sampleTopics: string[];
}

export interface SpecChip {
  id: string;
  code: string;
  label: string;
  unitCode: IalUnit['code'];
  minutes: number;
  pages: number;
}

/* The code-to-colour pairing is the club's signature and lives in the
   workspace's units.ts and nowhere else — so the portal looks the unit
   colours up there instead of carrying a second copy of the pairing. */
export function unitCandy(code: string): string {
  return CLUB_UNITS.find((u) => u.code === code)?.candy.main ?? '#ff6b6b';
}

export interface SearchEntry {
  id: string;
  kind: 'unit' | 'topic';
  code: string;
  title: string;
  unitCode: IalUnit['code'];
  unitTitle: string;
  category: string;
  minutes: number;
  targetAnchor: string;
  keywords: string[];
}

export interface PreviewThemeTokens {
  id: PreviewThemeId;
  label: string;
  bg: string;
  surface: string;
  surfaceElevated: string;
  ink: string;
  inkMuted: string;
  border: string;
  accent: string;
}

/* ————— the hero's notes-reader preview —————
   The workbench stage no longer shows an invented app mock: it
   reproduces the real notes reader, clause by clause, with the
   club's actual revision notes — real spec numbers, the official
   statements verbatim, and the notes' own key definitions,
   displayed equations and worked examples. Inline markup rides the
   club's Fmt dialect (**bold** · ==highlight== · ~sub~ · ^sup^);
   the hero renders it with a tiny local formatter. */
export type NotePreviewBlock =
  | { kind: 'def'; term: string; text: string }
  | { kind: 'eq'; eq: string }
  | {
      kind: 'worked';
      title: string;
      question: string;
      steps: number;
      answer: string;
    };

export interface NotePreviewClause {
  spec: string;
  title: string;
  /** the official statement, verbatim */
  statement: string;
  blocks: NotePreviewBlock[];
}

export interface NotePreviewDoc {
  id: string;
  unitCode: IalUnit['code'];
  topicLabel: string;
  title: string;
  specRange: string;
  sectionsTotal: number;
  readMinutes: number;
  clauses: NotePreviewClause[];
}

export interface WorkflowChapter {
  id: 'pinpoint' | 'assemble' | 'retain';
  index: string;
  label: string;
  summary: string;
  detail: string;
}

export const GLOBAL_METRICS: GlobalMetrics = {
  units: 6,
  topics: 33,
  hoursLabel: '~13 Hours',
  totalMinutes: 756,
  workedExamples: 30,
};

export const IAL_UNITS: readonly IalUnit[] = [
  {
    code: 'WCH11',
    shortLabel: 'Unit 1 · IAS',
    levelTag: 'IAS',
    title: 'Structure, Bonding and Introduction to Organic Chemistry',
    topicsCount: 5,
    minutes: 120,
    scope: 'Topics 1–5: Formulae, atomic structure, bonding, periodicity, and alkanes/alkenes.',
    sampleTopics: [
      'Topic 1 · Formulae, equations and amounts',
      'Topic 2 · Atomic structure and periodicity',
      'Topic 3 · Bonding and structure',
      'Topic 4 · Introductory organic chemistry',
      'Topic 5 · Alkenes and reaction pathways',
    ],
  },
  {
    code: 'WCH12',
    shortLabel: 'Unit 2 · IAS',
    levelTag: 'IAS',
    title: 'Energetics, Group Chemistry, Halogenoalkanes and Alcohols',
    topicsCount: 5,
    minutes: 130,
    scope: 'Topics 6–10: Enthalpy, kinetics, equilibria, Group 1/2/7, and organic mechanisms.',
    sampleTopics: [
      'Topic 6 · Energetics and Hess cycles',
      'Topic 7 · Intermolecular forces',
      'Topic 8 · Redox and Group 1, 2 & 7',
      'Topic 9 · Kinetics and equilibria',
      'Topic 10 · Halogenoalkanes, alcohols and spectra',
    ],
  },
  {
    code: 'WCH13',
    shortLabel: 'Unit 3 · IAS · Practical',
    levelTag: 'Practical',
    title: 'Practical Skills in Chemistry I',
    topicsCount: 9,
    minutes: 182,
    scope: 'Qualitative ion and gas tests, core practicals, apparatus rigs, and uncertainty.',
    sampleTopics: [
      'Qualitative anion and cation analysis',
      'Gas identification procedures',
      'Titration accuracy and burette precision',
      'Percentage uncertainty propagation',
    ],
  },
  {
    code: 'WCH14',
    shortLabel: 'Unit 4 · IA2',
    levelTag: 'IA2',
    title: 'Rates, Equilibria and Further Organic Chemistry',
    topicsCount: 6,
    minutes: 142,
    scope: 'Topics 11–16: Rate equations, entropy, acid–base equilibria, carbonyls, and chirality.',
    sampleTopics: [
      'Topic 11 · Kinetics and rate equations',
      'Topic 12 · Entropy and energetics',
      'Topic 13 · Chemical equilibria',
      'Topic 14 · Acid–base equilibria and buffers',
      'Topic 15 · Chirality, carbonyls and carboxylic acids',
    ],
  },
  {
    code: 'WCH15',
    shortLabel: 'Unit 5 · IA2',
    levelTag: 'IA2',
    title: 'Transition Metals and Organic Nitrogen Chemistry',
    topicsCount: 5,
    minutes: 122,
    scope: 'Topics 17–21: Electrode potentials, transition complexes, arenes, and nitrogen synthesis.',
    sampleTopics: [
      'Topic 17 · Redox equilibria and electrode potentials',
      'Topic 18 · Transition metals and ligand exchange',
      'Topic 19 · Arenes and electrophilic substitution',
      'Topic 20 · Organic nitrogen compounds',
      'Topic 21 · Multi-stage organic synthesis',
    ],
  },
  {
    code: 'WCH16',
    shortLabel: 'Unit 6 · IA2 · Practical',
    levelTag: 'Practical',
    title: 'Practical Skills in Chemistry II',
    topicsCount: 3,
    minutes: 60,
    scope: 'A2 kinetics experiments, organic synthesis techniques, and practical exam method.',
    sampleTopics: [
      'Continuous and initial-rate kinetics rigs',
      'Reflux, distillation and recrystallisation',
      'Planning and evaluation method',
    ],
  },
];

export const SPEC_CHIPS: readonly SpecChip[] = [
  {
    id: 'spec-1.4c',
    code: '1.4c',
    label: '1.4c · Ionisation energy trends',
    unitCode: 'WCH11',
    minutes: 14,
    pages: 4,
  },
  {
    id: 'spec-2.7a',
    code: '2.7a',
    label: '2.7a · Hess cycle calculations',
    unitCode: 'WCH12',
    minutes: 12,
    pages: 5,
  },
  {
    id: 'spec-4.3b',
    code: '4.3b',
    label: '4.3b · Buffer calculations',
    unitCode: 'WCH14',
    minutes: 16,
    pages: 6,
  },
  {
    id: 'spec-5.2e',
    code: '5.2e',
    label: '5.2e · Electrophilic substitution',
    unitCode: 'WCH15',
    minutes: 14,
    pages: 5,
  },
];

export const SEARCH_ITEMS: readonly SearchEntry[] = [
  ...IAL_UNITS.map((unit) => ({
    id: `unit-${unit.code}`,
    kind: 'unit' as const,
    code: unit.code,
    title: unit.title,
    unitCode: unit.code,
    unitTitle: unit.shortLabel,
    category: unit.levelTag,
    minutes: unit.minutes,
    targetAnchor: '#units',
    keywords: [unit.scope, ...unit.sampleTopics],
  })),
  {
    id: 'topic-1',
    kind: 'topic',
    code: 'Topic 1',
    title: 'Topic 1 · Amount of substance',
    unitCode: 'WCH11',
    unitTitle: 'WCH11 · Unit 1',
    category: 'IAS Topic',
    minutes: 24,
    targetAnchor: '#units',
    keywords: ['moles', 'titration', 'empirical formula', 'ideal gas'],
  },
  {
    id: 'topic-atomic',
    kind: 'topic',
    code: '1.4c',
    title: 'Atomic Structure & Ionisation Energy',
    unitCode: 'WCH11',
    unitTitle: 'WCH11 · Unit 1',
    category: 'Spec 1.4c',
    minutes: 22,
    targetAnchor: '#units',
    keywords: ['orbitals', 'subshells', 'successive ionisation', 'periodicity'],
  },
  {
    id: 'topic-6',
    kind: 'topic',
    code: 'Topic 6',
    title: 'Topic 6 · Energetics',
    unitCode: 'WCH12',
    unitTitle: 'WCH12 · Unit 2',
    category: 'IAS Topic',
    minutes: 26,
    targetAnchor: '#units',
    keywords: ['enthalpy', 'combustion', 'formation', 'bond enthalpy'],
  },
  {
    id: 'topic-hess',
    kind: 'topic',
    code: '2.7a',
    title: "Enthalpy Cycles & Hess's Law",
    unitCode: 'WCH12',
    unitTitle: 'WCH12 · Unit 2',
    category: 'Spec 2.7a',
    minutes: 25,
    targetAnchor: '#units',
    keywords: ['hess cycle', 'calorimetry', 'mean bond enthalpy'],
  },
  {
    id: 'topic-maxwell',
    kind: 'topic',
    code: '2.9b',
    title: 'Maxwell–Boltzmann & Equilibria',
    unitCode: 'WCH12',
    unitTitle: 'WCH12 · Unit 2',
    category: 'Spec 2.9b',
    minutes: 24,
    targetAnchor: '#units',
    keywords: ['activation energy', 'catalyst', 'le chatelier', 'yield'],
  },
  {
    id: 'topic-practical-1',
    kind: 'topic',
    code: '3.2a',
    title: 'Core Practicals & Uncertainty',
    unitCode: 'WCH13',
    unitTitle: 'WCH13 · Unit 3',
    category: 'IAS Practical',
    minutes: 28,
    targetAnchor: '#units',
    keywords: ['burette', 'pipette', 'percentage error', 'ion test'],
  },
  {
    id: 'topic-titration',
    kind: 'topic',
    code: 'CP 02',
    title: 'Core Practical · Titration & uncertainty',
    unitCode: 'WCH13',
    unitTitle: 'WCH13 · Unit 3',
    category: 'IAS Practical',
    minutes: 20,
    targetAnchor: '#units',
    keywords: ['standard solution', 'concordant titres', 'apparatus uncertainty'],
  },
  {
    id: 'topic-13',
    kind: 'topic',
    code: 'Topic 13',
    title: 'Topic 13 · Acid–base equilibria',
    unitCode: 'WCH14',
    unitTitle: 'WCH14 · Unit 4',
    category: 'IA2 Topic',
    minutes: 28,
    targetAnchor: '#units',
    keywords: ['pH', 'Ka', 'pKa', 'buffer', 'titration curve'],
  },
  {
    id: 'topic-buffers',
    kind: 'topic',
    code: '4.3b',
    title: 'Buffer Calculations & Titration Curves',
    unitCode: 'WCH14',
    unitTitle: 'WCH14 · Unit 4',
    category: 'Spec 4.3b',
    minutes: 22,
    targetAnchor: '#units',
    keywords: ['henderson', 'weak acid', 'equivalence point', 'indicator'],
  },
  {
    id: 'topic-18',
    kind: 'topic',
    code: 'Topic 18',
    title: 'Topic 18 · Transition metals',
    unitCode: 'WCH15',
    unitTitle: 'WCH15 · Unit 5',
    category: 'IA2 Topic',
    minutes: 26,
    targetAnchor: '#units',
    keywords: ['d-block', 'ligands', 'coordination', 'redox catalyst'],
  },
  {
    id: 'topic-arenes',
    kind: 'topic',
    code: '5.2e',
    title: 'Transition Metal Complexes & Arenes',
    unitCode: 'WCH15',
    unitTitle: 'WCH15 · Unit 5',
    category: 'Spec 5.2e',
    minutes: 24,
    targetAnchor: '#units',
    keywords: ['benzene', 'nitration', 'friedel-crafts', 'ligand exchange'],
  },
  {
    id: 'topic-a2-kinetics',
    kind: 'topic',
    code: '6.1c',
    title: 'A2 Kinetics & Organic Analysis',
    unitCode: 'WCH16',
    unitTitle: 'WCH16 · Unit 6',
    category: 'IA2 Practical',
    minutes: 20,
    targetAnchor: '#units',
    keywords: ['iodine clock', 'recrystallisation', 'melting point', 'synthesis'],
  },
];

/* The workbench preview tries the club's four labs on its stage — the
   palettes are the workspace's own token values (globals.css), not an
   homage: Night is the plum-charcoal dusk, Light the daylight cream,
   Dune the chocolate room, Classic the espresso-room signature. */
export const PREVIEW_THEMES: Record<PreviewThemeId, PreviewThemeTokens> = {
  night: {
    id: 'night',
    label: 'Night',
    bg: '#17131d',
    surface: '#30263d',
    surfaceElevated: '#40344f',
    ink: '#f5eff7',
    inkMuted: '#c7bacd',
    border: 'rgba(245, 239, 247, 0.14)',
    accent: '#d7b5e7',
  },
  light: {
    id: 'light',
    label: 'Light',
    bg: '#fff6ea',
    surface: '#fffdf7',
    surfaceElevated: '#fdf3e0',
    ink: '#3d2b1f',
    inkMuted: '#7c6454',
    border: 'rgba(61, 43, 31, 0.14)',
    accent: '#ff6b6b',
  },
  dune: {
    id: 'dune',
    label: 'Dune',
    bg: '#1e1b16',
    surface: '#2e2820',
    surfaceElevated: '#38322a',
    ink: '#f6f0e6',
    inkMuted: '#c9bfb0',
    border: 'rgba(246, 240, 230, 0.16)',
    accent: '#d9a05e',
  },
  classic: {
    id: 'classic',
    label: 'Classic',
    bg: '#2c2013',
    surface: '#4a3c2b',
    surfaceElevated: '#574834',
    ink: '#fff6ea',
    inkMuted: '#cdb894',
    border: 'rgba(255, 246, 234, 0.2)',
    accent: '#f59f00',
  },
};

/* Three real notes from the workspace's own corpus (NOTES_META in
   src/lib/spectra/notes-meta.ts — same ids, same titles, same spec
   ranges, the real per-topic reading minutes), each cut down to a
   handful of its actual specification sections. Every statement,
   definition, equation and worked example below is lifted verbatim
   from the notes docs in src/lib/spectra/notes.ts. */
export const NOTE_PREVIEW_DOCS: readonly NotePreviewDoc[] = [
  {
    id: 'wch11-t02',
    unitCode: 'WCH11',
    topicLabel: 'Topic 2',
    title: 'Atomic structure & the periodic table',
    specRange: '2.1 → 2.18',
    sectionsTotal: 18,
    readMinutes: 26,
    clauses: [
      {
        spec: '2.3',
        title: 'Atomic number and mass number',
        statement:
          'know what is meant by the terms ‘atomic (proton) number’ and ‘mass number’',
        blocks: [
          {
            kind: 'def',
            term: 'Atomic (proton) number, Z',
            text: 'The number of ==protons== in the nucleus. The Periodic Table is arranged in order of it.',
          },
          {
            kind: 'eq',
            eq: 'number of neutrons = A − Z    protons = Z    electrons = Z − charge',
          },
        ],
      },
      {
        spec: '2.4',
        title: 'Counting subatomic particles',
        statement:
          'be able to use the atomic number and the mass number to determine the number of each type of subatomic particle in an atom or ion',
        blocks: [
          {
            kind: 'worked',
            title: 'Worked example · the aluminium ion',
            question:
              'Determine the number of protons, neutrons and electrons in ^27^~13~Al^3+^.',
            steps: 3,
            answer: '^27^~13~Al^3+^: **13 protons, 14 neutrons, 10 electrons**.',
          },
        ],
      },
      {
        spec: '2.5',
        title: 'Isotopes',
        statement: 'understand the term ‘isotope’',
        blocks: [
          {
            kind: 'def',
            term: 'Isotopes',
            text: 'Isotopes are atoms of the ==same element== having the ==same number of protons== but ==different number of neutrons==.',
          },
        ],
      },
    ],
  },
  {
    id: 'wch12-t06',
    unitCode: 'WCH12',
    topicLabel: 'Topic 6',
    title: 'Energetics',
    specRange: '6.1 → 6.11',
    sectionsTotal: 11,
    readMinutes: 24,
    clauses: [
      {
        spec: '6.2',
        title: 'Exothermic and endothermic reactions',
        statement:
          'know that, by convention, exothermic reactions have a negative enthalpy change and endothermic reactions have a positive enthalpy change',
        blocks: [
          {
            kind: 'def',
            term: 'Exothermic reactions',
            text: 'Reactions which ==liberate heat energy== to the surrounding. Enthalpy of reactants ==> enthalpy of products==. The sign on ΔH = ==− ve==.',
          },
          {
            kind: 'def',
            term: 'Endothermic reactions',
            text: 'Reactions which ==absorb heat energy== from the surrounding. Enthalpy of reactants ==< enthalpy of products==. The sign on ΔH = ==+ ve==.',
          },
        ],
      },
      {
        spec: '6.5',
        title: 'Measuring enthalpy changes',
        statement:
          'be able to use experimental data to calculate: i energy transferred in a reaction recalling and using the expression: energy transferred (J) = mass (g) × specific heat capacity (J g−1 °C−1) × temperature change (°C)…',
        blocks: [
          { kind: 'eq', eq: 'Q = m × c × ΔT' },
          {
            kind: 'worked',
            title: 'Worked example · calculating enthalpy change of combustion',
            question:
              'From the results above, calculate the enthalpy change of combustion of ethanol, Δ~c~H^θ^, in kJ mol^−1^. The specific heat capacity of water is 4.18 J g^−1^ °C^−1^.',
            steps: 3,
            answer:
              'Δ~c~H^θ^ of ethanol = ==−1213.7 kJ mol^−1^== — [negative sign because it is exothermic].',
          },
        ],
      },
      {
        spec: '6.6',
        title: "Hess's law",
        statement:
          'know Hess’s Law and be able to apply it to: i constructing enthalpy cycles ii calculating enthalpy changes of reaction using data provided, or data selected from a table or obtained from experiments',
        blocks: [
          {
            kind: 'def',
            term: "Hess's Law",
            text: 'The enthalpy change of a chemical reaction is independent of the path taken in converting reactants into products, provided the initial and final conditions are the same.',
          },
        ],
      },
      {
        spec: '6.7',
        title: 'Core Practical 2',
        statement:
          'CORE PRACTICAL 2 — determination of the enthalpy change of a reaction using Hess’s Law',
        blocks: [
          {
            kind: 'worked',
            title: 'Worked example · the thermal decomposition of calcium carbonate',
            question:
              'Calculate Δ~r~H^θ^ for the thermal decomposition of calcium carbonate into calcium oxide and carbon dioxide given the following data. CaCO~3~(s) + 2HCl(aq) → CaCl~2~(aq) + H~2~O(l) + CO~2~(g), Δ~r~H^θ^ = −17 kJ/mol. CaO(s) + 2HCl(aq) → CaCl~2~(aq) + H~2~O(l), Δ~r~H^θ^ = −195 kJ/mol.',
            steps: 4,
            answer:
              'Δ~r~H^θ^ = ==+178 kJ mol^−1^== — endothermic, as a decomposition that needs heating should be.',
          },
        ],
      },
    ],
  },
  {
    id: 'wch12-t10',
    unitCode: 'WCH12',
    topicLabel: 'Topic 10',
    title: 'Halogenoalkanes, alcohols and spectra',
    specRange: '10.6 → 10.22',
    sectionsTotal: 14,
    readMinutes: 30,
    clauses: [
      {
        spec: '10.7',
        title: 'Primary, secondary or tertiary',
        statement:
          'understand the distinction between primary, secondary and tertiary halogenoalkanes',
        blocks: [],
      },
      {
        spec: '10.10',
        title: 'Comparing the rates of hydrolysis',
        statement:
          'understand that experimental observations and data can be used to compare the relative rates of hydrolysis of: i primary, secondary and tertiary structural isomers of a halogenoalkane ii primary chloro-, bromo- and iodoalkanes using aqueous silver nitrate in ethanol',
        blocks: [
          {
            kind: 'def',
            term: 'Hydrolysis',
            text: 'Hydrolysis reaction is a reaction in which water or hydroxide ions ==replace an atom in a molecule with an -OH group==.',
          },
          { kind: 'eq', eq: 'RX + H~2~O → ROH + HX' },
        ],
      },
      {
        spec: '10.13',
        title: 'The nature of the halogen',
        statement:
          'understand, in terms of bond enthalpy, the trend in reactivity of chloro-, bromo- and iodoalkanes',
        blocks: [],
      },
      {
        spec: '10.21',
        title: 'Mass spectra — the molecular ion and its fragments',
        statement:
          'be able to interpret data from mass spectra to suggest possible structures of simple organic compounds using the m/z of the molecular ion and fragmentation patterns',
        blocks: [
          {
            kind: 'worked',
            title: 'Worked example · the M+1 height',
            question:
              'The relative height of the M peak for benzoic acid (contains 7 carbon atoms) is 85%. Find the height of its M+1 peak.',
            steps: 3,
            answer: 'M+1 is 7% of 85 = 5.95',
          },
        ],
      },
    ],
  },
];

export const WORKFLOW_CHAPTERS: readonly WorkflowChapter[] = [
  {
    id: 'pinpoint',
    index: '01',
    label: 'Pinpoint',
    summary: 'Start from the exact specification index.',
    detail: 'Filter by unit code, core practical, or statement number without digging through bloated PDFs.',
  },
  {
    id: 'assemble',
    index: '02',
    label: 'Assemble',
    summary: 'Merge selected notes into one continuous read.',
    detail: 'Toggle individual specification statements to compile a focused, timed revision pack in seconds.',
  },
  {
    id: 'retain',
    index: '03',
    label: 'Retain',
    summary: 'Track completion and time spent across every unit.',
    detail: 'Private local progress logs keep topic readiness, worked examples, and weekly pace in view.',
  },
];
