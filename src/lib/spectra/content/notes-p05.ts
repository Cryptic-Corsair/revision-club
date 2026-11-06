import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 5 — Tests for gases and anions
   (sections P5.1–P5.6)
   Text kept verbatim from the CHSE Grade 11 "Unit 3: Laboratory
   Chemistry" practical notes (action of heat on solids, recognition
   of common gases, tests for anions) and the CHSE Unit 3 core
   practical reference notes (2020) — the sulfate, carbonate,
   hydroxide and precipitation pages; page furniture omitted.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P05: SpecSection[] = [
  {
    spec: "P5.1",
    statement:
      "know the gases or vapours that may be evolved when a solid compound is heated, and their possible sources",
    title: "Action of heat on solids",
    blocks: [
      {
        k: "p",
        text: "Gases or vapour may be evolved when a solid compound is heated — and ==which gas comes off names the compound== that released it.",
      },
      {
        k: "table",
        caption: "The practical note's table of gases and their sources",
        head: ["Gas or vapour", "Possible source"],
        rows: [
          ["Carbon dioxide", "Carbonates of metals other than Group 1"],
          ["Oxygen", "Group 1 nitrates (other than lithium)"],
          ["Oxygen and nitrogen dioxide", "Nitrates (other than sodium and potassium)"],
          ["Water", "Hydrated salts"],
        ],
      },
      {
        k: "note",
        label: "The Group 1 exception",
        text: "Group 1 nitrates decompose to give ==oxygen and a nitrite== — only ==lithium==, the exception at the top of the group, behaves like the Group 2 nitrates and gives brown nitrogen dioxide as well.",
      },
    ],
  },
  {
    spec: "P5.2",
    statement:
      "recognise and identify the common gases — oxygen, carbon dioxide, ammonia, nitrogen dioxide, hydrogen, hydrogen chloride, chlorine, bromine, iodine, water vapour and sulfur dioxide",
    title: "Recognition and identification of common gases",
    blocks: [
      {
        k: "table",
        caption: "The practical note's gas table, in full",
        head: ["Gas", "Test", "Observation"],
        rows: [
          ["Oxygen (O~2~)", "Insert a glowing splint into the gas", "The splint ==relights / rekindles=="],
          ["Carbon dioxide (CO~2~)", "Bubble gas through lime water", "The lime water turns ==milky== / forms a white precipitate"],
          ["Ammonia (NH~3~)", "Insert a piece of moist red litmus paper into the gas", "The moist red litmus paper ==turns blue=="],
          ["Ammonia (NH~3~)", "Dip a glass rod in dilute hydrochloric acid and insert it into the gas", "==Dense white fumes== are formed"],
          ["Nitrogen dioxide (NO~2~)", "Appearance or colour of gas", "==Brown== gas (insoluble in organic solvents)"],
          ["Nitrogen dioxide (NO~2~)", "Add starch–iodide paper", "Gas turns starch–iodide paper ==blue-black=="],
          ["Hydrogen (H~2~)", "Insert a lighted / burning splint into the gas", "Colourless gas which ignites with a ==“pop”==; or the burning splint goes off with a pop sound"],
          ["Hydrogen chloride (HCl)", "Dip a glass rod in aqueous ammonia and insert into the gas", "==Dense white fumes/smoke== formed"],
          ["Hydrogen chloride (HCl)", "Test with blue litmus paper", "The steamy fumes produced change blue litmus to ==red=="],
          ["Chlorine (Cl~2~)", "Insert a piece of moist blue litmus paper into the gas", "The ==pale green== gas turns moist blue litmus paper to red and then ==bleaches== it"],
          ["Bromine (Br~2~)", "Appearance or colour of gas", "==Brown== gas that dissolves in organic solvents"],
          ["Iodine (I~2~)", "Appearance or colour of gas", "==Purple== vapour"],
          ["Water vapour (H~2~O)", "Insert a piece of blue anhydrous cobalt(II) chloride paper into the gas", "The blue cobalt chloride paper turns ==pink=="],
          ["Sulfur dioxide (SO~2~)", "Pass the gas through acidified potassium dichromate(VI) solution", "==Orange colour turns to green=="],
        ],
      },
      {
        k: "note",
        label: "The mirrored pair",
        text: "Ammonia and hydrogen chloride are detected with ==each other==: ammonia gives dense white fumes with hydrochloric acid on a rod, and hydrogen chloride gives dense white fumes with aqueous ammonia on a rod.",
      },
    ],
  },
  {
    spec: "P5.3",
    statement:
      "test for carbonate and hydrogencarbonate ions — effervescence with acid, limewater, and the magnesium sulfate distinction at room temperature and on heating",
    title: "Carbonate and hydrogencarbonate tests",
    blocks: [
      {
        k: "table",
        caption: "The practical note's carbonate and hydrogencarbonate rows",
        head: ["Anion", "Test", "Observation"],
        rows: [
          ["Carbonate, CO~3~^2−^", "Add aqueous acid to the solid carbonate or aqueous carbonate solution (e.g. HCl or H~2~SO~4~)", "Effervescence observed; a colourless gas which ==turns lime water milky== is given off"],
          ["Carbonate, CO~3~^2−^", "Heat the solid carbonate", "Carbonates other than Na, K and Ba give off carbon dioxide"],
          ["Carbonate, CO~3~^2−^", "Add magnesium sulfate (MgSO~4~)", "A ==white precipitate is formed at room temperature=="],
          ["Hydrogencarbonate, HCO~3~^−^", "Add solid HCO~3~^−^ to almost boiling water", "Effervescence observed; colourless gas given off turns lime water milky"],
          ["Hydrogencarbonate, HCO~3~^−^", "Add magnesium sulfate (MgSO~4~)", "==No precipitate at room temperature==; a white precipitate is formed ==on heating=="],
        ],
      },
      {
        k: "note",
        label: "The magnesium sulfate distinction",
        text: "Both ions fizz with acid, so the discriminator is magnesium sulfate: the carbonate throws its white precipitate down ==in the cold==, while the hydrogencarbonate only precipitates once the mixture is heated.",
      },
    ],
  },
  {
    spec: "P5.4",
    statement:
      "test for sulfate and sulfite ions with barium chloride and dilute hydrochloric acid — the precipitate's solubility in excess acid separates them",
    title: "Sulfate and sulfite tests",
    blocks: [
      {
        k: "bullets",
        items: [
          "==Sulfate, SO~4~^2−^==: add barium chloride (BaCl~2~) followed by dilute HCl — a white precipitate (BaSO~4~) is formed which is ==insoluble in excess dilute HCl acid==.",
          "==Sulfite, SO~3~^2−^==: add barium chloride (BaCl~2~) followed by dilute HCl — a white precipitate (BaSO~3~) is formed which is ==soluble in excess dilute HCl acid==.",
          "Sulfite also gives the gas test: add dilute H~2~SO~4~ to the solid or solution and warm, then pass the gas into acidified K~2~Cr~2~O~7~ solution — the ==orange solution turns green==.",
        ],
      },
      {
        k: "h",
        text: "Why the barium chloride is acidified with hydrochloric acid",
      },
      {
        k: "p",
        text: "BaCl~2~ solution acidified with hydrochloric acid is the reagent: if acidified barium chloride is added to a solution containing sulfate ions, a white precipitate of barium sulfate forms — and other anions give a negative result, no precipitate.",
      },
      {
        k: "eq",
        eq: "Ba^2+^(aq) + SO~4~^2−^(aq) → BaSO~4~(s)",
      },
      {
        k: "note",
        label: "The acid's job",
        text: "The hydrochloric acid reacts with ==carbonate impurities== often found in salts, which would otherwise form a white barium carbonate precipitate and give a ==false result==. You could not use sulfuric acid for this — it contains sulfate ions and would give a ==false positive==. Fizzing due to CO~2~ would be observed if a carbonate was present: 2HCl + Na~2~CO~3~ → 2NaCl + H~2~O + CO~2~.",
      },
    ],
  },
  {
    spec: "P5.5",
    statement:
      "test for nitrate ions by reduction with aluminium (or zinc) in sodium hydroxide, warming, and detecting the ammonia released",
    title: "The nitrate test",
    blocks: [
      {
        k: "bullets",
        items: [
          "Add aqueous sodium hydroxide (NaOH) and ==Al (or zinc powder)==, then warm.",
          "Test the gas given off using ==damp red litmus paper==.",
          "A ==pungent smelling gas== that turns red litmus paper to blue is given off — ammonia.",
        ],
      },
      {
        k: "note",
        label: "What the aluminium is doing",
        text: "The aluminium is a ==reducing agent==: in alkaline solution it reduces the nitrate ion all the way down to ammonia, and the litmus test is then the ammonium test of Practical 4 running on the gas it releases.",
      },
    ],
  },
  {
    spec: "P5.6",
    statement:
      "make insoluble salts by precipitation, write the ionic equation, and know which salts are soluble",
    title: "Precipitation reactions and ionic equations",
    blocks: [
      {
        k: "p",
        text: "Insoluble salts can be made by mixing appropriate solutions of ions so that a precipitate is formed — barium nitrate(aq) + sodium sulfate(aq) → barium sulfate(s) + sodium nitrate(aq). These are called ==precipitation reactions==: a precipitate is a solid.",
      },
      {
        k: "eq",
        eq: "Ba(NO~3~)~2~(aq) + Na~2~SO~4~(aq) → BaSO~4~(s) + 2NaNO~3~(aq)",
      },
      {
        k: "table",
        caption: "Solubility rules for salts — no syllabus requires these to be learnt, but a good chemist does know them",
        head: ["Soluble salts", "Insoluble salts"],
        rows: [
          ["All sodium, potassium and ammonium salts", "—"],
          ["All nitrates", "—"],
          ["Most chlorides, bromides, iodides", "Silver and lead chlorides, bromides, iodides"],
          ["Most sulfates", "Lead, strontium and barium sulfate"],
          ["Sodium, potassium and ammonium carbonates", "Most other carbonates"],
          ["Sodium, potassium and ammonium hydroxides", "Most other hydroxides"],
        ],
      },
      {
        k: "p",
        text: "When making an insoluble salt, the salt is normally removed by ==filtration==, washed with distilled water to remove soluble impurities, and then ==dried on filter paper==. This is gravitational filtration — use it if ==small amounts== of solid are formed: the ==residue== sits on the filter paper, the ==filtrate== drips through.",
      },
      {
        k: "def",
        term: "Spectator ions",
        text: "Ions that are ==not changing state== and ==not changing oxidation number==. Ionic equations only show the ions that are reacting and leave the spectators out.",
      },
      {
        k: "steps",
        caption: "Writing the ionic equation for a precipitation",
        items: [
          {
            title: "Take the full equation",
            text: "Ba(NO~3~)~2~(aq) + Na~2~SO~4~(aq) → BaSO~4~(s) + 2NaNO~3~(aq)",
          },
          {
            title: "Separate the (aq) solutions into ions",
            text: "Ba^2+^(aq) + 2NO~3~^−^(aq) + 2Na^+^(aq) + SO~4~^2−^(aq) → BaSO~4~(s) + 2Na^+^(aq) + 2NO~3~^−^(aq)",
          },
          {
            title: "Cancel the spectators",
            text: "The Na^+^ and NO~3~^−^ ions appear unchanged on both sides — leaving the simplest ionic equation.",
          },
        ],
      },
      {
        k: "eq",
        eq: "Ba^2+^(aq) + SO~4~^2−^(aq) → BaSO~4~(s)",
      },
    ],
  },
];
