import type { NotesDoc } from "./notes-types";
import { SECTIONS_A } from "./content/notes-t02-a";
import { SECTIONS_B } from "./content/notes-t02-b";
import { SECTIONS_T03_A } from "./content/notes-t03-a";
import { SECTIONS_T03_B } from "./content/notes-t03-b";
import { SECTIONS_T04_A } from "./content/notes-t04-a";
import { SECTIONS_T04_B } from "./content/notes-t04-b";
import { SECTIONS_T05_A } from "./content/notes-t05-a";
import { SECTIONS_T05_B } from "./content/notes-t05-b";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the revision-note library
   ═══════════════════════════════════════════════════════════════ */

export const NOTES_DOCS: NotesDoc[] = [
  {
    id: "wch11-t02",
    unitCode: "WCH11",
    topicId: "t02",
    kicker: "Unit 1 · Topic 2 — the complete class note, spec by spec",
    title: "Atomic structure & the periodic table",
    source: "the complete class note (CHSE Grade 11, Unit 1 · Topic 2 · 2021)",
    intro: [
      {
        k: "p",
        text: "This is the actual revision note for Topic 2, kept **word for word** and re-cut into ==one section per specification point==. The official statement sits above each section, and every calculation is worked in full — no skipped lines.",
      },
    ],
    sections: [...SECTIONS_A, ...SECTIONS_B],
  },
  {
    id: "wch11-t03",
    unitCode: "WCH11",
    topicId: "t03",
    kicker: "Unit 1 · Topic 3 — the complete class note, spec by spec",
    title: "Bonding & structure — covalent, shapes and polarity",
    source:
      "the complete class note (CHSE Grade 11, Unit 1 · Topic 3 · 2020) — Part II: covalent bonding and shapes. The ionic part (Part I) joins later.",
    intro: [
      {
        k: "p",
        text: "This is the actual revision note for Topic 3 — **Part II**, kept **word for word** and re-cut into ==one section per specification point==. The official statement sits above each section, and every exercise from the class note is worked in full.",
      },
      {
        k: "p",
        text: "The ionic-bonding half of the topic (Part I of the class note) is not in yet — this note covers everything covalent: the shared pair and σ/π bonds, dot-and-cross diagrams, the carbon lattices, electronegativity and polarity, and the complete set of molecular shapes.",
      },
    ],
    sections: [...SECTIONS_T03_A, ...SECTIONS_T03_B],
  },
  {
    id: "wch11-t04",
    unitCode: "WCH11",
    topicId: "t04",
    kicker: "Unit 1 · Topic 4 — the complete class note, spec by spec",
    title: "Introductory organic chemistry & alkanes",
    source: "the complete class note (CHSE Grade 11, Unit 1 · Topic 4 · 2020)",
    intro: [
      {
        k: "p",
        text: "This is the actual revision note for Topic 4, kept **word for word** and re-cut into ==one section per specification point==. The official statement sits above each section, and every exercise the class note sets in words is worked in full — no skipped lines.",
      },
      {
        k: "p",
        text: "Part **4A** teaches the language of organic chemistry: hazard and risk, the homologous series and functional groups, the full IUPAC naming and drawing toolkit, the reaction types, and the two ways a covalent bond splits. Part **4B** is the alkanes: sp^3^ shapes and cycloalkanes, the isomer drills, crude oil from fractionating column to cracker, combustion and its pollutants, alternative fuels and carbon neutrality — finishing with the ==free-radical substitution chain==, the first mechanism of the course.",
      },
    ],
    sections: [...SECTIONS_T04_A, ...SECTIONS_T04_B],
  },
  {
    id: "wch11-t05",
    unitCode: "WCH11",
    topicId: "t05",
    kicker: "Unit 1 · Topic 5 — the complete class note, spec by spec",
    title: "Alkenes",
    source: "the complete class note (CHSE Grade 11, Unit 1 · Topic 5 · 2020)",
    intro: [
      {
        k: "p",
        text: "This is the actual revision note for Topic 5, kept **word for word** and re-cut into ==one section per specification point==. The official statement sits above each section, and every exercise from the class note that is specified in words is worked in full — no skipped lines.",
      },
      {
        k: "p",
        text: "Part **5A** builds the double bond itself — σ plus π, the sp^2^ hybrids and the 120° plan — then the alkene naming rules, the ==isomer drills== (chain, positional and geometric) and the five addition reactions with their conditions and colour changes. Part **5B** is the mechanisms: ==electrophilic addition== of HBr and Br~2~ drawn with curly arrows, the carbocation stability ladder, the bromine-water test, and addition polymerisation from repeat unit to polymer disposal.",
      },
    ],
    sections: [...SECTIONS_T05_A, ...SECTIONS_T05_B],
  },
];

export function getNotes(docId: string): NotesDoc | undefined {
  return NOTES_DOCS.find((d) => d.id === docId);
}

export function getNotesForTopic(unitCode: string, topicId: string): NotesDoc | undefined {
  return NOTES_DOCS.find((d) => d.unitCode === unitCode && d.topicId === topicId);
}
