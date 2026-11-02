import type { NotesDoc } from "./notes-types";
import { SECTIONS_A } from "./content/notes-t02-a";
import { SECTIONS_B } from "./content/notes-t02-b";
import { SECTIONS_T03_A } from "./content/notes-t03-a";
import { SECTIONS_T03_B } from "./content/notes-t03-b";

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
];

export function getNotes(docId: string): NotesDoc | undefined {
  return NOTES_DOCS.find((d) => d.id === docId);
}

export function getNotesForTopic(unitCode: string, topicId: string): NotesDoc | undefined {
  return NOTES_DOCS.find((d) => d.unitCode === unitCode && d.topicId === topicId);
}
