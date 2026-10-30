/* ————————————————————————————————————————————————
   AXIOM · IAL CHEMISTRY · content data
   Single source of truth. The UI renders from this —
   adding notes later requires zero UI changes.

   Formula markup: use _{...} for subscripts and ^{...}
   for superscripts, e.g. "H_{2}O", "6.02 × 10^{23}".
   The <Formula> component renders them properly.
   ———————————————————————————————————————————————— */

export type Status = "live" | "partial" | "coming-soon";

export interface Topic {
  slug: string;
  title: string;
  ref?: string; // spec reference range, e.g. "1.3–1.9"
  status: "live" | "coming-soon";
  minutes?: number;
}

export interface Unit {
  slug: string;
  code: string; // WCH11 …
  name: string;
  period: "AS" | "A2";
  weight: string;
  points?: string; // spec points summary
  status: Status;
  practical?: string[]; // for Units 3 & 6: what the paper actually tests
  topics: Topic[];
}

export type NoteSection =
  | { type: "p"; text: string; margin?: string }
  | { type: "h2"; text: string; margin?: string }
  | { type: "definition"; term: string; text: string; margin?: string }
  | { type: "formula"; caption?: string; lines: string[]; highlight?: number; margin?: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][]; margin?: string }
  | { type: "practical"; title: string; steps: string[]; margin?: string }
  | { type: "examTip"; text: string; margin?: string }
  | { type: "mistake"; text: string }
  | { type: "worked"; title: string; body: string[]; marks?: { chip: string; text: string }[]; answer: string }
  | { type: "quiz"; question: string; options: string[]; answer: number; explain: string }
  | { type: "keyPoints"; items: { chip: string; text: string }[] };

export interface Note {
  updated: string;
  sections: NoteSection[];
}

/* ————— the subject: Pearson Edexcel IAL Chemistry (2018 spec, WCH11–WCH16) ————— */

export const CHEMISTRY = {
  name: "Chemistry",
  code: "WCH",
  blurb:
    "One subject, done properly: every unit from the mole to transition metals, mapped line-by-line to the Pearson specification and annotated the way a great tutor marks your paper.",
  examStructure: [
    { label: "AS", value: "U1 40% · U2 40% · U3 20%" },
    { label: "A level", value: "U4 40% · U5 40% · U6 20%" },
    { label: "Practicals", value: "U3 & U6 — written papers, no coursework" },
  ],
  units: [
    {
      slug: "unit-1",
      code: "WCH11",
      name: "Structure, Bonding and Introduction to Organic Chemistry",
      period: "AS",
      weight: "40% of AS",
      points: "42 spec points",
      status: "partial",
      topics: [
        { slug: "the-mole-titrations", title: "The mole and titration calculations", ref: "1.3–1.9", status: "live", minutes: 16 },
        { slug: "ionisation-energy", title: "First ionisation energy and periodicity", ref: "2.5–2.6", status: "live", minutes: 12 },
        { slug: "amount-of-substance", title: "Formulae, equations and ideal gases", ref: "1.1–1.2, 1.5", status: "coming-soon" },
        { slug: "bonding-structure", title: "Bonding, shapes and polarity", ref: "3.1–3.9", status: "coming-soon" },
        { slug: "organic-intro-alkanes", title: "Introductory organic chemistry and alkanes", ref: "4.1–4.7", status: "coming-soon" },
        { slug: "alkenes", title: "Alkenes and electrophilic addition", ref: "5.1–5.7", status: "coming-soon" },
      ],
    },
    {
      slug: "unit-2",
      code: "WCH12",
      name: "Energetics, Group Chemistry, Halogenoalkanes and Alcohols",
      period: "AS",
      weight: "40% of AS",
      points: "43 spec points",
      status: "coming-soon",
      topics: [
        { slug: "energetics", title: "Enthalpy changes and Hess's law", ref: "6", status: "coming-soon" },
        { slug: "intermolecular-forces", title: "Intermolecular forces", ref: "7", status: "coming-soon" },
        { slug: "redox-groups", title: "Redox, Groups 1 & 2 and Group 7", ref: "8A–8C", status: "coming-soon" },
        { slug: "kinetics-equilibria-intro", title: "Introduction to kinetics and equilibria", ref: "9", status: "coming-soon" },
        { slug: "halogenoalkanes-alcohols", title: "Halogenoalkanes and alcohols", ref: "10A–10B", status: "coming-soon" },
        { slug: "ms-ir", title: "Mass spectrometry and infrared", ref: "10C–10D", status: "coming-soon" },
      ],
    },
    {
      slug: "unit-3",
      code: "WCH13",
      name: "Practical Skills in Chemistry I",
      period: "AS",
      weight: "20% of AS",
      status: "coming-soon",
      practical: [
        "Titrations and volumetric analysis",
        "Calorimetry and enthalpy changes",
        "Rates and qualitative tests",
        "Organic preparation techniques",
      ],
      topics: [],
    },
    {
      slug: "unit-4",
      code: "WCH14",
      name: "Rates, Equilibria and Further Organic Chemistry",
      period: "A2",
      weight: "40% of A level",
      points: "29 spec points",
      status: "coming-soon",
      topics: [
        { slug: "kinetics", title: "Kinetics: rate equations and orders", ref: "11", status: "coming-soon" },
        { slug: "entropy", title: "Entropy and energetics", ref: "12", status: "coming-soon" },
        { slug: "equilibria", title: "Chemical equilibria", ref: "13", status: "coming-soon" },
        { slug: "acid-base", title: "Acid–base equilibria and buffers", ref: "14", status: "coming-soon" },
        { slug: "carbonyls-chirality", title: "Carbonyls, carboxylic acids and chirality", ref: "15", status: "coming-soon" },
      ],
    },
    {
      slug: "unit-5",
      code: "WCH15",
      name: "Transition Metals and Organic Nitrogen Chemistry",
      period: "A2",
      weight: "40% of A level",
      points: "25 spec points",
      status: "coming-soon",
      topics: [
        { slug: "redox-equilibria", title: "Redox equilibria and electrode potentials", ref: "16", status: "coming-soon" },
        { slug: "transition-metals", title: "Transition metals and complexes", ref: "17", status: "coming-soon" },
        { slug: "arenes", title: "Arenes: benzene and electrophilic substitution", ref: "18", status: "coming-soon" },
        { slug: "organic-nitrogen", title: "Organic nitrogen compounds", ref: "19", status: "coming-soon" },
        { slug: "synthesis-analysis", title: "Organic synthesis and analysis", ref: "20", status: "coming-soon" },
      ],
    },
    {
      slug: "unit-6",
      code: "WCH16",
      name: "Practical Skills in Chemistry II",
      period: "A2",
      weight: "20% of A level",
      status: "coming-soon",
      practical: [
        "Rates, quenching and clock reactions",
        "Electrode potentials and redox titrations",
        "Transition metal tests",
        "Multi-step organic preparation",
      ],
      topics: [],
    },
  ] as Unit[],
};

export const UNIT_COUNT = CHEMISTRY.units.length;
export const TOPIC_COUNT = CHEMISTRY.units.reduce((n, u) => n + u.topics.length, 0);

/* ————— sample notes (real teaching content) ————— */

export const NOTES: Record<string, Note> = {
  "unit-1/the-mole-titrations": {
    updated: "Oct 2026",
    sections: [
      {
        type: "p",
        text: "Chemistry is a counting game played with particles far too small to see. A single grain of salt holds more ions than there are people on Earth, so chemists count by mass and by volume instead — and the bridge between those two worlds is the mole. Get this topic fluent and every calculation in Units 1, 2, 4 and 5 gets easier at once.",
        margin: "fluency here pays for the whole A level",
      },
      {
        type: "definition",
        term: "The mole (mol)",
        text: "One mole is the amount of substance that contains as many elementary particles — atoms, molecules, ions or electrons — as there are atoms in exactly 12 g of carbon-12. That number is the Avogadro constant, N_{A} = 6.02 × 10^{23} mol^{-1}.",
        margin: "always name the particle: atoms? molecules? ions?",
      },
      {
        type: "definition",
        term: "Molar mass, M",
        text: "The mass of one mole of a substance, in g mol^{-1}. It is numerically equal to the relative atomic or molecular mass — water is 18.0 on the relative scale and 18.0 g mol^{-1} per mole.",
      },
      {
        type: "h2",
        text: "The three bridges",
        margin: "the units in the question tell you which one",
      },
      {
        type: "p",
        text: "Each formula connects n to something you can measure: mass on a balance, volume of solution in a pipette, or gas conditions. Choose by the units you are handed — grams means n = m/M, cm³ of solution means n = cV/1000, and a gas with pressure data means pV = nRT.",
      },
      {
        type: "formula",
        caption: "Learn these",
        lines: [
          "n = m / M   — mass in g",
          "n = cV / 1000   — V in cm³",
          "pV = nRT   — R = 8.31 J K^{-1} mol^{-1}",
        ],
        highlight: 1,
        margin: "R only works with p in Pa, V in m³, T in K",
      },
      {
        type: "h2",
        text: "Titration technique — Unit 3 will ask",
      },
      {
        type: "p",
        text: "The maths of a titration belongs to Topic 1, but the technique is examined too, and it is worth easy marks. Do these in order, every time.",
      },
      {
        type: "practical",
        title: "Rinse · fill · read",
        steps: [
          "Rinse the burette with the solution it will hold, then fill it below the tap — no air bubble left in the jet.",
          "Take the initial reading at eye level, to the nearest 0.05 cm³, at the bottom of the meniscus.",
          "Run a rough titration first to find the end-point colour, then repeat accurately.",
          "Stop when two titres agree within 0.10 cm³ — these are concordant, and only concordant titres get averaged.",
        ],
        margin: "rinse with what goes IN it — water would dilute your solution",
      },
      {
        type: "table",
        caption: "Results from a real-style run",
        head: ["", "Rough", "1", "2", "3"],
        rows: [
          ["Final reading / cm³", "22.60", "22.45", "22.30", "22.30"],
          ["Initial reading / cm³", "0.00", "0.10", "0.00", "0.05"],
          ["Titre / cm³", "22.60", "22.35", "22.30", "22.25"],
        ],
        margin: "concordant: 22.35 · 22.30 · 22.25 → mean 22.30",
      },
      {
        type: "worked",
        title: "Worked example — WCH11 style",
        body: [
          "25.00 cm³ portions of sodium hydroxide are titrated with 0.100 mol dm^{-3} hydrochloric acid. The mean concordant titre is 22.30 cm³. Calculate the concentration of the sodium hydroxide.",
          "Equation: HCl + NaOH → NaCl + H_{2}O",
        ],
        marks: [
          { chip: "M1", text: "n(HCl) = c × V/1000 = 0.100 × 22.30/1000 = 2.23 × 10^{-3} mol" },
          { chip: "M1", text: "The equation is 1 : 1, so n(NaOH) = 2.23 × 10^{-3} mol in each 25.00 cm³ portion" },
          { chip: "A1", text: "c(NaOH) = n ÷ V = (2.23 × 10^{-3}) / 0.02500 = 0.0892 mol dm^{-3}" },
        ],
        answer: "c(NaOH) = 0.0892 mol dm^{-3} (3 s.f.)",
      },
      {
        type: "examTip",
        text: "Quote answers to 3 significant figures and attach the unit — a bare \u201c0.0892\u201d drops the A1. And if a question says \u201cstate\u201d, no working is needed; if it says \u201ccalculate\u201d, every step can earn.",
        margin: "unit + s.f. = free marks, every paper",
      },
      {
        type: "mistake",
        text: "Forgetting ÷1000 when the volume is in cm³. It inflates the answer by a factor of 1000 and it happens in every exam series. Write the ÷1000 before you key anything into the calculator.",
      },
      {
        type: "mistake",
        text: "Averaging all the titres — including the rough run, or readings that are not concordant. The rough titration exists only to locate the end-point colour; it never enters the mean.",
      },
      {
        type: "quiz",
        question: "A student records titres of 22.35, 22.30, 22.90 and 22.25 cm³. Which mean should be used?",
        options: [
          "22.45 cm³ — average all four",
          "22.30 cm³ — use 22.35, 22.30 and 22.25",
          "22.48 cm³ — use the last three",
          "22.90 cm³ — the largest titre",
        ],
        answer: 1,
        explain:
          "22.35, 22.30 and 22.25 lie within 0.10 cm³ of one another — concordant. The 22.90 is off the set (the end-point was overshot), so it is discarded: (22.35 + 22.30 + 22.25) ÷ 3 = 22.30 cm³.",
      },
      {
        type: "keyPoints",
        items: [
          { chip: "B1", text: "Define the mole in terms of the Avogadro constant, 6.02 × 10^{23} mol^{-1}, and name the particle." },
          { chip: "M1", text: "Convert cm³ → dm³ before using n = cV — the ÷1000 is itself a method mark." },
          { chip: "A1", text: "Concentration to 3 s.f. with units: 0.0892 mol dm^{-3}." },
          { chip: "B1", text: "Concordant titres agree within 0.10 cm³; average only those." },
        ],
      },
    ],
  },
  "unit-1/ionisation-energy": {
    updated: "Oct 2026",
    sections: [
      {
        type: "p",
        text: "First ionisation energy is the periodic table's X-ray. Because it depends only on the attraction between the nucleus and the outermost electron, its trends across and down the table are pure evidence for how electrons are actually arranged — shells, sub-shells and all. Examiners ask \u201cwhy\u201d far more often than \u201cwhat\u201d, so this note is built around the explanations.",
        margin: "the definition is 3 marks — learn it word-perfect",
      },
      {
        type: "definition",
        term: "First ionisation energy",
        text: "The energy required to remove one mole of electrons from one mole of gaseous atoms to form one mole of gaseous singly-charged positive ions.",
        margin: "gaseous … gaseous — both states or the mark is gone",
      },
      {
        type: "formula",
        caption: "The equations that score",
        lines: ["M(g) → M^{+}(g) + e^{-}", "Na(g) → Na^{+}(g) + e^{-}"],
        margin: "state symbols are part of the answer",
      },
      {
        type: "h2",
        text: "What the value depends on",
        margin: "three levers — quote them all in \u201cexplain\u201d answers",
      },
      {
        type: "p",
        text: "Three levers, no more: nuclear charge (more protons pull harder), distance (an outer shell further from the nucleus is held more weakly) and shielding (inner shells screen the outer electron from the nucleus). Every trend in this topic is one or two of those levers moving — so every explanation you write should name them.",
      },
      {
        type: "h2",
        text: "Across Period 3: up, with two dips",
      },
      {
        type: "p",
        text: "From sodium to argon the outer electron stays in shell n = 3 while nuclear charge climbs from +11 to +18, so first ionisation energy rises overall. The two dips are the examiners' favourite question. At aluminium the outer electron opens the 3p sub-shell, which is higher in energy than 3s. At sulfur the fourth 3p electron must pair up, and the repulsion between the paired electrons makes it easier to remove.",
        margin: "dip 1: Al, 3p^{1} · dip 2: S, 3p^{4}",
      },
      {
        type: "formula",
        caption: "Evidence for sub-shells",
        lines: [
          "Na: 1s^{2} 2s^{2} 2p^{6} 3s^{1}",
          "Al: 1s^{2} 2s^{2} 2p^{6} 3s^{2} 3p^{1}  ← dip",
          "S: 1s^{2} 2s^{2} 2p^{6} 3s^{2} 3p^{4}  ← dip",
        ],
        margin: "the dips ARE the evidence for sub-shells",
      },
      {
        type: "p",
        text: "Down a group, first ionisation energy falls: each element adds a whole new shell, so distance and shielding both increase — and together they beat the rise in nuclear charge. Magnesium holds its outer electron far more tightly than barium does.",
      },
      {
        type: "examTip",
        text: "\u201cExplain why\u201d means full sentences that name the lever. \u201cThe outer electron in sulfur is paired in a 3p orbital, so electron–electron repulsion raises its energy\u201d scores two; the single word \u201cshielding\u201d usually scores one.",
        margin: "one word = one mark. sentences = full marks",
      },
      {
        type: "mistake",
        text: "Writing that ionisation energy \u201cincreases across a period\u201d and stopping there. The statement alone is B1 at best — the marks live in the reason: same shell, rising nuclear charge, shielding unchanged.",
      },
      {
        type: "worked",
        title: "Worked example — WCH11 style",
        body: [
          "Explain why the first ionisation energy of sulfur is lower than that of phosphorus.",
          "Phosphorus is 3p^{3}: every 3p electron occupies its own orbital. Sulfur is 3p^{4}: the fourth electron must share an orbital with a partner.",
          "The paired electrons repel each other, so that electron is already higher in energy and is removed more easily — despite sulfur's greater nuclear charge.",
        ],
        marks: [
          { chip: "M1", text: "Identifies pairing in the 3p orbital of sulfur (3p^{4} vs 3p^{3})" },
          { chip: "A1", text: "States that electron–electron repulsion makes the paired electron easier to remove" },
        ],
        answer: "Pairing repulsion in 3p^{4} outweighs the extra nuclear charge.",
      },
      {
        type: "quiz",
        question: "Why is sodium's second ionisation energy so much larger than its first?",
        options: [
          "The ion has lost mass, so electrons are harder to remove",
          "The second electron is pulled from the full 2p shell — much closer to the nucleus",
          "The nuclear charge increases once the first electron leaves",
          "Sodium becomes a noble gas",
        ],
        answer: 1,
        explain:
          "Na^{+} is 1s^{2}2s^{2}2p^{6} — the next electron comes from a full inner shell, far closer to the nucleus with far less shielding than 3s^{1}. The nuclear charge does not change when an electron leaves; distance and shielding do.",
      },
      {
        type: "keyPoints",
        items: [
          { chip: "B1", text: "Definition: one mole of gaseous atoms → one mole of gaseous 1+ ions." },
          { chip: "B1", text: "Trends: across a period ↑ (dips at Groups 3 and 6); down a group ↓." },
          { chip: "M1", text: "Link every trend to nuclear charge, distance or shielding — name the lever." },
          { chip: "A1", text: "A sharp jump in successive ionisation energies marks a new shell — evidence for quantum shells." },
        ],
      },
    ],
  },
};
