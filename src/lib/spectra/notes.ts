import type { NotesDoc } from "./notes-types";
import { SECTIONS_A } from "./content/notes-t02-a";
import { SECTIONS_B } from "./content/notes-t02-b";

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
    source: "CHSE revision notes · Grade 11 · Unit 1 · Topic 2 · Semester 1, 2021",
    intro: [
      {
        k: "p",
        text: "This is the actual revision note for Topic 2, kept **word for word** and re-cut into ==one section per specification point==. The official statement sits above each section, and every calculation is worked in full — no skipped lines.",
      },
    ],
    sections: [...SECTIONS_A, ...SECTIONS_B],
  },
];

export function getNotes(docId: string): NotesDoc | undefined {
  return NOTES_DOCS.find((d) => d.id === docId);
}

export function getNotesForTopic(unitCode: string, topicId: string): NotesDoc | undefined {
  return NOTES_DOCS.find((d) => d.unitCode === unitCode && d.topicId === topicId);
}
