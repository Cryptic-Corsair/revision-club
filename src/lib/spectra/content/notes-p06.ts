import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 6 — Tests for halides and
   halogens (sections P6.1–P6.5)
   Text kept verbatim from the CHSE Grade 11 "Unit 3: Laboratory
   Chemistry" practical notes (tests for halide ions, tests for
   halide salts in solid state, tests for halogens) and the CHSE
   Unit 3 core practical reference notes (2020) — the halide-ion and
   concentrated-sulfuric-acid pages; page furniture omitted.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P06: SpecSection[] = [
  {
    spec: "P6.1",
    statement:
      "test for halide ions in aqueous solution with nitric acid followed by silver nitrate, and differentiate the precipitates with aqueous ammonia",
    title: "The silver nitrate test",
    blocks: [
      {
        k: "p",
        text: "To the test solution add ==dilute nitric acid== followed by ==silver nitrate solution==. Test the solubility of the precipitate formed by adding ==dilute aqueous ammonia== and ==concentrated aqueous ammonia==.",
      },
      {
        k: "table",
        caption: "The practical note's silver nitrate table",
        head: ["Halide ion", "Observation"],
        rows: [
          ["Cl^−^", "White precipitate formed, which is ==soluble in dilute and concentrated== aq. ammonia"],
          ["Br^−^", "Cream precipitate formed, which is ==insoluble in dilute== aq. ammonia ==but soluble in concentrated=="],
          ["I^−^", "Pale yellow precipitate formed, which is ==insoluble in dilute and concentrated== aq. ammonia"],
        ],
      },
      {
        k: "bullets",
        items: [
          "Fluorides produce ==no precipitate==.",
          "Chlorides produce a white precipitate: Ag^+^(aq) + Cl^−^(aq) → AgCl(s).",
          "Bromides produce a cream precipitate: Ag^+^(aq) + Br^−^(aq) → AgBr(s).",
          "Iodides produce a pale yellow precipitate: Ag^+^(aq) + I^−^(aq) → AgI(s).",
        ],
      },
      {
        k: "note",
        label: "Why nitric acid",
        text: "The role of nitric acid is to react with any ==carbonates== present, to prevent formation of the precipitate Ag~2~CO~3~ — this would ==mask the desired observations==. 2HNO~3~ + Na~2~CO~3~ → 2NaNO~3~ + H~2~O + CO~2~.",
      },
      {
        k: "p",
        text: "The silver halide precipitates can be treated with ammonia solution to help differentiate between them if the colours look similar:",
      },
      {
        k: "eq",
        eq: "AgCl(s) + 2NH~3~(aq) → [Ag(NH~3~)~2~]^+^(aq) + Cl^−^(aq)",
        note: "Silver chloride dissolves in dilute ammonia to form a complex ion — a colourless solution.",
      },
      {
        k: "eq",
        eq: "AgBr(s) + 2NH~3~(aq) → [Ag(NH~3~)~2~]^+^(aq) + Br^−^(aq)",
        note: "Silver bromide dissolves in concentrated ammonia to form a complex ion — a colourless solution.",
      },
      {
        k: "note",
        label: "Silver iodide",
        text: "Silver iodide ==does not react with ammonia== — it is too insoluble.",
      },
      {
        k: "figure",
        kind: "halide-test",
        caption:
          "White, cream, pale yellow — and the ammonia staircase that sorts them when the colours look too close to call.",
      },
    ],
  },
  {
    spec: "P6.2",
    statement:
      "confirm the halide ion with lead(II) nitrate — the precipitate that dissolves on heating and recrystallises on cooling",
    title: "The lead nitrate test",
    blocks: [
      {
        k: "p",
        text: "To the test solution add a few drops of ==lead(II) nitrate== solution. ==Heat the precipitate== and allow the liquid to cool.",
      },
      {
        k: "table",
        caption: "The practical note's lead nitrate table",
        head: ["Halide ion", "Observation"],
        rows: [
          ["Cl^−^", "White precipitate formed; ==dissolves on heating==. White crystals reappear on cooling"],
          ["Br^−^", "White precipitate formed; ==dissolves on heating==. White crystals reappear on cooling"],
          ["I^−^", "Yellow precipitate formed; dissolves on heating. ==Golden or yellow crystals== reappear on cooling"],
        ],
      },
    ],
  },
  {
    spec: "P6.3",
    statement:
      "confirm the halide ion with chlorine water and an organic solvent — the displacement colours in the organic layer",
    title: "The chlorine water test",
    blocks: [
      {
        k: "p",
        text: "To the test solution add a few drops of ==chlorine water== followed by about 2.00 cm^3^ of organic solvent (e.g. hexane, CCl~4~, CHCl~3~). ==Shake the mixture well==.",
      },
      {
        k: "table",
        caption: "The practical note's chlorine water table",
        head: ["Halide ion", "Observation"],
        rows: [
          ["Cl^−^", "No change when shaken with organic solvent — Cl~2~(aq) + Cl^−^(aq) → no reaction"],
          ["Br^−^", "The organic layer turns ==reddish brown== — Cl~2~(aq) + 2Br^−^(aq) → Br~2~(aq) + 2Cl^−^(aq)"],
          ["I^−^", "The organic layer turns ==purple or violet==; the aqueous layer turns brown — Cl~2~(aq) + 2I^−^(aq) → I~2~(aq) + 2Cl^−^(aq)"],
        ],
      },
      {
        k: "note",
        label: "Reading the layers",
        text: "Chlorine displaces both bromide and iodide because it is the ==more reactive halogen==; the displaced halogen dissolves in the ==organic layer==, where its colour is unmistakable.",
      },
    ],
  },
  {
    spec: "P6.4",
    statement:
      "know the equations and observations for the reactions of solid sodium halides with concentrated sulfuric acid, and the trend in reducing power they reveal",
    title: "Solid halides with concentrated sulfuric acid",
    blocks: [
      {
        k: "p",
        text: "To the solid halide add ==concentrated sulfuric acid==. The halides show ==increasing power as reducing agents== as one goes down the group, and the observations of these reactions demonstrate it. Know the equations and observations of these reactions very well.",
      },
      {
        k: "def",
        term: "Why the reducing power increases down Group 7",
        text: "A reducing agent ==donates electrons==. The reducing power of the halides increases down the group — they have a greater tendency to donate electrons, because as the ions get bigger it is ==easier for the outer electrons to be given away== as the pull from the nucleus on them becomes smaller.",
      },
      { k: "h", text: "Fluoride and chloride — acid–base only" },
      {
        k: "bullets",
        items: [
          "F^−^ and Cl^−^ ions are ==not strong enough reducing agents== to reduce the S in H~2~SO~4~. ==No redox reactions occur== — only acid–base reactions.",
          "NaF(s) + H~2~SO~4~(l) → NaHSO~4~(s) + HF(g) — white steamy fumes of HF are evolved.",
          "NaCl(s) + H~2~SO~4~(l) → NaHSO~4~(s) + HCl(g) — white steamy fumes of HCl are evolved.",
          "H~2~SO~4~ plays the role of an ==acid== (proton donor) — nothing is oxidised or reduced.",
        ],
      },
      { k: "h", text: "Bromide — one redox step" },
      {
        k: "bullets",
        items: [
          "Br^−^ ions are stronger reducing agents than Cl^−^ and F^−^: after the initial acid–base reaction they reduce the sulfur in H~2~SO~4~ from ==+6 to +4== in SO~2~.",
          "Acid–base step: NaBr(s) + H~2~SO~4~(l) → NaHSO~4~(s) + HBr(g) — white steamy fumes of HBr.",
          "Redox step: 2HBr + H~2~SO~4~ → Br~2~(g) + SO~2~(g) + 2H~2~O(l) — red fumes of bromine and a colourless, acidic gas, SO~2~. Reduction product = ==sulfur dioxide==.",
          "Oxidation ½-equation: 2Br^−^ → Br~2~ + 2e^−^. Reduction ½-equation: H~2~SO~4~ + 2H^+^ + 2e^−^ → SO~2~ + 2H~2~O.",
          "H~2~SO~4~ plays the role of ==acid in the first step==, producing HBr, then acts as an ==oxidising agent in the second redox step==.",
        ],
      },
      { k: "h", text: "Iodide — three redox steps" },
      {
        k: "bullets",
        items: [
          "I^−^ ions are the ==strongest halide reducing agents==: they reduce the sulfur from +6 in H~2~SO~4~ to ==+4 in SO~2~, 0 in S and −2 in H~2~S==.",
          "NaI(s) + H~2~SO~4~(l) → NaHSO~4~(s) + HI(g) — white steamy fumes of HI.",
          "2HI + H~2~SO~4~ → I~2~(s) + SO~2~(g) + 2H~2~O(l)",
          "6HI + H~2~SO~4~ → 3I~2~ + S(s) + 4H~2~O(l)",
          "8HI + H~2~SO~4~ → 4I~2~(s) + H~2~S(g) + 4H~2~O(l)",
          "Observations: black solid and ==purple fumes of iodine==; a colourless, acidic gas (SO~2~); a ==yellow solid of sulfur==; and H~2~S, hydrogen sulfide, a gas with a ==bad egg smell==.",
          "Reduction products = ==sulfur dioxide, sulfur and hydrogen sulfide==. H~2~SO~4~ acts as acid in the first step, then as an oxidising agent in all three redox steps.",
        ],
      },
      {
        k: "table",
        caption: "The practical note's summary table — what the fumes and solids name",
        head: ["Solid sodium halide", "Observation", "Inference"],
        rows: [
          ["NaCl", "White misty fumes", "HCl"],
          ["NaBr", "White misty fumes", "HBr"],
          ["NaBr", "Brown fumes or vapour", "Br~2~"],
          ["NaBr", "Colourless gas with choking odour", "SO~2~"],
          ["NaI", "White misty fumes", "HI"],
          ["NaI", "Purple vapour and a black precipitate", "I~2~"],
          ["NaI", "Rotten egg smelling colourless gas", "H~2~S"],
          ["NaI", "Colourless gas with choking smell", "SO~2~"],
          ["NaI", "Yellow precipitate", "S"],
        ],
      },
      {
        k: "note",
        label: "Exam technique",
        text: "Often in exam questions these redox reactions are worked out ==after first making the half-equations== — build the oxidation half-equation for the halide, pick the reduction half-equation for the sulfur product, and add them.",
      },
      {
        k: "figure",
        kind: "h2so4-ladder",
        caption:
          "The halide staircase: chloride stops at steamy fumes, bromide adds sulfur dioxide, iodide keeps going — SO~2~, then sulfur, then hydrogen sulfide.",
      },
    ],
  },
  {
    spec: "P6.5",
    statement:
      "test for the halogens themselves — litmus bleaching speeds, displacement colours with KBr and KI, and the starch test",
    title: "Tests for the halogens",
    blocks: [
      {
        k: "table",
        caption: "The practical note's halogen test table",
        head: ["Test", "Cl~2~", "Br~2~", "I~2~"],
        rows: [
          ["Effect on damp red litmus paper", "==Bleach rapidly==", "Bleach more slowly than chlorine", "==No effect=="],
          ["Effect on damp blue litmus paper", "Turns red and bleaches it", "Turns red and bleaches it, slower than with Cl~2~", "==No effect=="],
          ["Add KBr followed by an organic solvent (such as hexane) and shake well", "A brown solution is formed; on adding hexane the organic layer turns ==reddish brown==", "No effect", "No effect"],
          ["Add KI followed by hexane; shake the mixture", "A brown solution is formed; on shaking with hexane the organic layer turns ==violet==", "A brown solution is formed; on shaking with hexane the organic layer turns ==violet==", "No effect"],
          ["Add starch solution", "No effect", "No effect", "Turns ==blue-black== colour"],
        ],
      },
      {
        k: "note",
        label: "Reading the table",
        text: "Chlorine displaces ==both== bromide and iodide; bromine displaces ==only iodide==; iodine displaces ==nothing== — reactivity falls down the group, and iodine's own signature is the ==starch== blue-black.",
      },
      {
        k: "figure",
        kind: "halogen-colours",
        caption:
          "The halogens in water and in organic solvent — the colours that make the displacement tables legible.",
      },
    ],
  },
];
