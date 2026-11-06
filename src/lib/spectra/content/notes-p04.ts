import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 4 — Flame tests and cation tests
   (sections P4.1–P4.6)
   Text kept verbatim from the CHSE Grade 11 "Unit 3: Laboratory
   Chemistry" practical notes (flame test, tests for cations) and the
   CHSE Unit 3 core practical reference notes (2020) — "CORE
   PRACTICAL 8 + 15: Analysis of some inorganic unknowns"; page
   furniture omitted. Highlighting is kept deliberately light: one
   mark per key term, short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P04: SpecSection[] = [
  {
    spec: "P4.1",
    statement:
      "carry out a flame test with a clean nichrome or platinum wire dipped in concentrated hydrochloric acid, held in a non-luminous Bunsen flame",
    title: "Carrying out a flame test",
    blocks: [
      {
        k: "bullets",
        items: [
          "Use a ==clean nichrome wire or platinum wire==.",
          "Dip the nichrome wire into ==concentrated hydrochloric acid== and then into the salt.",
          "The wire is held in ==progressively hotter parts== of a ==non-luminous== Bunsen flame.",
        ],
      },
      {
        k: "note",
        label: "Why the acid and the cleaning",
        text: "Nichrome is an ==unreactive== metal and will not give out any flame colour of its own. The wire is cleaned by dipping in concentrated hydrochloric acid and then heating in the Bunsen flame, and if the sample is not powdered it should be ==ground up== before the test.",
      },
      {
        k: "figure",
        kind: "flame-etc",
        caption:
          "The rig: concentrated HCl on the wire, the salt on the tip, and the wire walked into the hotter parts of a blue, non-luminous flame.",
      },
    ],
  },
  {
    spec: "P4.2",
    statement:
      "know the flame colours — yellow for sodium, lilac for potassium, reds for lithium, strontium and calcium, pale green for barium",
    title: "The flame colours",
    blocks: [
      {
        k: "table",
        caption: "The practical note's flame test table",
        head: ["Flame colour", "Inference"],
        rows: [
          ["Yellow", "Sodium ion"],
          ["Lilac", "Potassium ion"],
          ["Yellow-red", "Calcium ion"],
          ["Red", "Lithium"],
          ["Red", "Strontium"],
          ["Pale green", "Barium"],
        ],
      },
      {
        k: "note",
        label: "Three reds",
        text: "Further tests would be needed to distinguish between ==Li, Sr and Ca== — all three flame red (lithium is often quoted as the ==crimson== red of the cation table below).",
      },
      {
        k: "figure",
        kind: "flame-colours",
        caption:
          "Each ion paints the flame with its own lines — sodium's yellow is so intense that a trace of contamination yellows every flame.",
      },
    ],
  },
  {
    spec: "P4.3",
    statement:
      "explain the formation of characteristic flame colours in terms of electron transitions, and know the full flame list including the silent ions",
    title: "Why flames colour — and which ions stay dark",
    blocks: [
      {
        k: "p",
        text: "The theory sits in the Unit 2 note (spec 8.17): heat ==excites electrons== into higher energy levels, and as they fall back the ==energy is emitted as light== of the wavelengths characteristic of that element — the flame colour. The practical reference sheet extends the list well beyond the exam's core six.",
      },
      {
        k: "table",
        caption: "The reference sheet's full flame list",
        head: ["Ion", "Flame colour"],
        rows: [
          ["Lithium", "Scarlet red"],
          ["Sodium", "Yellow"],
          ["Potassium", "Lilac"],
          ["Rubidium", "Red"],
          ["Caesium", "Blue"],
          ["Magnesium", "==No flame colour=="],
          ["Calcium", "Brick red"],
          ["Strontium", "Red"],
          ["Barium", "Apple green"],
        ],
      },
      {
        k: "note",
        label: "Why magnesium stays dark",
        text: "Magnesium emits energy of a wavelength ==outside the visible spectrum== — the flame stays colourless even though the electrons are falling back.",
      },
    ],
  },
  {
    spec: "P4.4",
    statement:
      "test for metal cations by adding sodium hydroxide solution dropwise to excess, and read the Group 2 results off the hydroxide-solubility trend",
    title: "Testing for cations with sodium hydroxide",
    blocks: [
      {
        k: "steps",
        caption: "Method — adding dilute sodium hydroxide",
        items: [
          {
            title: "Load the tube",
            text: "Place about 10 drops of 0.1 mol dm^−3^ metal ion solution in a test tube.",
          },
          {
            title: "Add the hydroxide",
            text: "Add about 10 drops of 0.6 mol dm^−3^ sodium hydroxide solution, mixing well.",
          },
          {
            title: "Add to excess",
            text: "Continue to add sodium hydroxide solution, ==dropwise with gentle shaking==, until it is in excess.",
          },
        ],
      },
      {
        k: "note",
        label: "Where it applies",
        text: "This test can be used on ==Group 2 metal ions and transition metal ions==. The results are an application of the trend that ==Group 2 hydroxides become more soluble down the group==.",
      },
      {
        k: "bullets",
        items: [
          "==Magnesium hydroxide== is classed as insoluble in water and appears as a ==white precipitate==: Mg^2+^(aq) + 2OH^−^(aq) → Mg(OH)~2~(s).",
          "==Calcium hydroxide== is classed as partially soluble: a white precipitate appears, but it may need ==more sodium hydroxide== before it appears compared with a magnesium solution. Ca^2+^(aq) + 2OH^−^(aq) → Ca(OH)~2~(s).",
          "A suspension of magnesium hydroxide appears slightly alkaline (==pH 9==) — some hydroxide ions must have been produced by a very slight dissolving.",
          "A suspension of calcium hydroxide is more alkaline (==pH 11==) because it is more soluble, so there are more hydroxide ions present in solution.",
          "==Strontium and barium== salts will not form a hydroxide precipitate — their hydroxides are so soluble the solutions are ==highly alkaline== instead.",
        ],
      },
      {
        k: "figure",
        kind: "g2-solubility",
        caption:
          "Down Group 2 the hydroxides dissolve more readily: magnesium precipitates, calcium half does, strontium and barium dissolve outright.",
      },
    ],
  },
  {
    spec: "P4.5",
    statement:
      "test for ammonium ions by warming with sodium hydroxide and holding damp red litmus paper at the mouth of the tube",
    title: "Testing for ammonium ions",
    blocks: [
      {
        k: "steps",
        caption: "Method — the ammonium ion test",
        items: [
          {
            title: "Load the tube",
            text: "Place about 10 drops of 0.1 mol dm^−3^ ammonium chloride in a test tube.",
          },
          {
            title: "Add alkali",
            text: "Add about 10 drops of 0.4 mol dm^−3^ sodium hydroxide solution and shake the mixture.",
          },
          {
            title: "Warm",
            text: "Warm the mixture gently using a ==water bath==.",
          },
          {
            title: "Test the fumes",
            text: "Test the fumes released by holding a piece of ==damp red litmus paper== in the mouth of the test tube.",
          },
        ],
      },
      {
        k: "bullets",
        items: [
          "A ==pungent smelling gas== (ammonia) is given off which turns the damp red litmus paper ==blue==.",
          "The same reaction identifies the nitrate ion on the anion side — reduce the nitrate first, then run this test on the ammonia it releases.",
        ],
      },
      { k: "eq", eq: "NH~4~^+^(aq) + OH^−^(aq) → NH~3~(g) + H~2~O(l)" },
    ],
  },
  {
    spec: "P4.6",
    statement:
      "identify Na^+^, K^+^, Mg^2+^, Ca^2+^, Ba^2+^, Li^+^, Sr^2+^ and NH~4~^+^ from the combined flame and precipitation evidence",
    title: "The cation summary table",
    blocks: [
      {
        k: "table",
        caption: "The practical note's tests for cations",
        head: ["Cation", "Test", "Observation"],
        rows: [
          ["NH~4~^+^, ammonium ion", "Add aqueous sodium hydroxide to solid or aqueous solution and warm; test gas with damp red litmus paper", "Pungent smelling gas (ammonia) given off which turns damp red litmus paper blue"],
          ["Na^+^", "Flame test", "Yellow"],
          ["K^+^", "Flame test", "Lilac"],
          ["Mg^2+^", "Add dilute aqueous ammonia to a solution containing magnesium ions", "A white precipitate is formed"],
          ["Mg^2+^", "Add ammonium carbonate solution", "A white precipitate (of magnesium carbonate) is formed"],
          ["Ca^2+^", "Flame test", "Red"],
          ["Ca^2+^", "Add concentrated NaOH", "A white precipitate is formed"],
          ["Ba^2+^", "Flame test", "Pale green"],
          ["Li^+^", "Flame test", "Crimson red"],
          ["Sr^2+^", "Flame test", "Red"],
        ],
      },
      {
        k: "wow",
        text: "Magnesium has no flame colour at all, so it is caught by precipitation instead — dilute ammonia or ammonium carbonate pull down its white solid while the alkali metals stay dissolved.",
      },
    ],
  },
];
