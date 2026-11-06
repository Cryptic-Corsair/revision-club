import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 2 — Solutions and titrations,
   Core Practicals 3 & 4 (sections P2.1–P2.8)
   Text kept verbatim from the CHSE Unit 3 core practical reference
   notes (2020) — "Core practical 3+4: Make up a volumetric solution
   and carry out a simple acid–base titration"; page furniture
   omitted. Highlighting is kept deliberately light: one mark per
   key term, short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P02: SpecSection[] = [
  {
    spec: "P2.1",
    statement:
      "make up a volumetric solution from a solid — weigh by difference, dissolve, transfer with washings, make up to the mark, invert",
    title: "Making up a volumetric solution",
    blocks: [
      {
        k: "steps",
        caption: "Making the solution — Method",
        items: [
          {
            title: "Weigh the solid",
            text: "Weigh the sample bottle containing the required mass of solid on a 2 d.p. balance.",
          },
          {
            title: "Transfer and reweigh",
            text: "Transfer to a beaker; reweigh the empty sample bottle and record the difference — that difference is the mass actually added.",
          },
          {
            title: "Dissolve",
            text: "Add 100 cm^3^ of distilled water to the beaker and use a glass rod to stir and help dissolve the solid. If the substance dissolves badly in cold water, the beaker and its contents could be heated gently until all the solid has dissolved.",
          },
          {
            title: "Transfer with washings",
            text: "Pour the solution into a 250 cm^3^ graduated flask via a funnel. Rinse the beaker and funnel and add the washings from the beaker and glass rod to the volumetric flask.",
          },
          {
            title: "Make up to the mark",
            text: "Make up to the mark with distilled water, using a dropping pipette for the last few drops.",
          },
          {
            title: "Invert",
            text: "Invert the flask several times to ensure a uniform solution.",
          },
        ],
      },
      {
        k: "bullets",
        items: [
          "Fill so the ==bottom of the meniscus== sits on the line on the neck of the flask. With dark liquids like potassium manganate it can be difficult to see the meniscus.",
          "Do ==not== heat or put hot solutions in the volumetric flask — the heat would cause the flask to expand and the volume would then be incorrect.",
          "A graduated flask has ==one mark== on the neck: the level to fill to get the accurate volume.",
        ],
      },
      {
        k: "figure",
        kind: "std-solution",
        caption:
          "Weigh by difference, dissolve in the beaker, and carry every washing through with the sample — then the flask holds exactly the moles you weighed.",
      },
      {
        k: "h",
        text: "Measuring mass accurately",
      },
      {
        k: "p",
        text: "In many experiments the best method for measuring mass is: measure the mass, on a 2 or 3 d.p. balance, of a weighing bottle with the required quantity of solid in it; empty the mass into the reaction vessel or flask; reweigh the now-empty weighing bottle; and subtract, so the difference gives the ==exact mass actually added==.",
      },
    ],
  },
  {
    spec: "P2.2",
    statement: "dilute a solution accurately with a volumetric pipette and a volumetric flask",
    title: "Diluting a solution",
    blocks: [
      {
        k: "steps",
        caption: "Diluting — Method",
        items: [
          {
            title: "Pipette the original",
            text: "Pipette 25 cm^3^ of the original solution into a 250 cm^3^ volumetric flask.",
          },
          {
            title: "Make up to the mark",
            text: "Make up to the mark with distilled water, using a dropping pipette for the last few drops.",
          },
          {
            title: "Invert",
            text: "Invert the flask several times to ensure a uniform solution.",
          },
        ],
      },
      {
        k: "note",
        label: "Why the pipette",
        text: "A ==volumetric pipette== is more accurate than a measuring cylinder because it has a smaller uncertainty — and a teat pipette makes up the last few drops so the volume is not taken over the line.",
      },
    ],
  },
  {
    spec: "P2.3",
    statement:
      "carry out a simple acid–base titration — rinse everything correctly, pipette 25 cm^3^, fill the burette, run a rough, then repeat until two titres agree within 0.10 cm^3^",
    title: "The titration method",
    blocks: [
      {
        k: "steps",
        caption: "General titration method",
        items: [
          {
            title: "Rinse the equipment",
            text: "Rinse the burette with acid, the pipette with alkali, and the conical flask with distilled water.",
          },
          {
            title: "Pipette the alkali",
            text: "Pipette 25 cm^3^ of alkali into the conical flask; touch the surface of the alkali with the pipette tip to ensure the correct amount is added.",
          },
          {
            title: "Fill the burette",
            text: "Add the acid solution from the burette, and make sure the ==jet space== in the burette is filled with acid.",
          },
          {
            title: "Add indicator",
            text: "Add a few drops of indicator and refer to the colour change at the end point. Use a ==white tile== underneath the flask to help observe it.",
          },
          {
            title: "Titrate",
            text: "Add acid to alkali whilst swirling the mixture, and add dropwise at the end point.",
          },
          {
            title: "Read and repeat",
            text: "Note the burette reading before and after the addition of acid. Repeat until at least ==2 concordant results== are obtained — two readings within 0.1 of each other.",
          },
        ],
      },
      {
        k: "figure",
        kind: "titration-rig",
        caption:
          "The rig: burette above, conical flask below on a white tile — pipette for the 25 cm^3^, swirl throughout, dropwise at the end.",
      },
      {
        k: "bullets",
        items: [
          "Titrations are done to find the concentration of one substance by reacting it with another of ==known concentration== — most often neutralisations, but redox too.",
          "One substance (generally the one of unknown concentration) goes in the ==conical flask==, measured with a volumetric pipette; the other sits in the ==burette==.",
          "The standard phrase “titrate solution **A** with solution **B**” means ==A in the conical flask, B in the burette==.",
          "A conical flask is used in preference to a beaker because it is easier to ==swirl== the mixture without spilling.",
        ],
      },
    ],
  },
  {
    spec: "P2.4",
    statement:
      "choose the right indicator and quote its colour change — phenolphthalein for strong alkalis, methyl orange where strong acids are used",
    title: "Adding the indicator",
    blocks: [
      {
        k: "table",
        caption: "The two indicators at a glance",
        head: ["Indicator", "In alkali", "In acid", "End point", "Use"],
        rows: [
          ["Phenolphthalein", "pink", "colourless", "pink colour just disappears", "use if NaOH is used"],
          ["Methyl orange", "yellow", "red", "orange", "use if HCl is used"],
        ],
      },
      {
        k: "note",
        label: "A few drops only",
        text: "Indicators are generally ==weak acids==, so only add a few drops. If too much is added they will ==affect the titration result==.",
      },
    ],
  },
  {
    spec: "P2.5",
    statement:
      "use the burette correctly — rinse with the titrant, no funnel, no air in the jet, and read the bottom of the meniscus to 0.05 cm^3^",
    title: "Using the burette",
    blocks: [
      {
        k: "bullets",
        items: [
          "The burette should be ==rinsed with the substance that will be put in it==. If it is not rinsed out, the acid or alkali added may be diluted by residual water, or react with substances left from a previous titration — the concentration would be lowered and a ==larger titre== delivered.",
          "Don't leave the ==funnel== in the burette: small drops may fall from it during the titration, giving a false burette reading and a lower titre.",
          "Make sure the ==jet space== is filled with solution and air bubbles are removed. If the jet space is not filled properly before starting, it will fill during the titration, leading to a ==larger than expected titre==.",
          "Read the ==bottom of the meniscus== on the burette.",
        ],
      },
      {
        k: "def",
        term: "Recording burette readings",
        text: "Even though a burette is marked to 0.1 cm^3^, readings are always given to ==2 d.p.==, ending in either ==0.00 or 0.05==. A drop from a burette is 0.05 cm^3^ — the smallest difference in readings that can be measured. Meniscus on a line: end in 0.00 (e.g. 9.00 cm^3^). Meniscus between the lines marked 9.1 and 9.2: record ==9.15==.",
      },
    ],
  },
  {
    spec: "P2.6",
    statement:
      "record titration results in a full table and average only the concordant titres",
    title: "Recording results and averaging",
    blocks: [
      {
        k: "bullets",
        items: [
          "Results should be clearly recorded in a ==table==, in full — both initial and final readings — with titre volumes recorded to ==2 d.p.== (to 0.05 cm^3^).",
          "A single titration could be flawed. Repeating allows ==anomalous titres to be spotted and discounted==.",
          "If 2 or 3 values are within ==0.10 cm^3^== they are concordant: the results are accurate and repeatable and the technique is good and consistent.",
        ],
      },
      {
        k: "table",
        caption: "A results table, recorded in full",
        head: ["Titration number", "1", "2", "3"],
        rows: [
          ["Initial burette reading / cm^3^", "0.50", "2.50", "1.55"],
          ["Final burette reading / cm^3^", "24.50", "27.00", "25.95"],
          ["Titre / cm^3^", "24.00", "24.50", "24.40"],
        ],
      },
      {
        k: "figure",
        kind: "titre-targets",
        caption:
          "The rough run finds the end point; the accurate runs land within 0.10 cm^3^ of each other — only those titres enter the mean.",
      },
      {
        k: "worked",
        title: "Worked example · averaging the concordant titres",
        question:
          "Titres of 24.00, 24.50 and 24.40 cm^3^ were obtained. Which average is quoted?",
        steps: [
          "24.50 and 24.40 differ by 0.10 cm^3^ — ==concordant==.",
          "24.00 is 0.40 cm^3^ away from the others — not concordant, so it is left out of the mean.",
          "Average titre = (24.50 + 24.40) ÷ 2.",
        ],
        answer: "==24.45 cm^3^== — only the concordant titres are averaged.",
      },
      {
        k: "note",
        label: "Water in the flask is harmless",
        text: "Distilled water can be added to the conical flask during a titration to wash the sides, so all the acid on the side is washed into the reaction mixture. It does ==not== affect the titration reading — water does not react with the reagents or change the number of moles of acid added. Only ==distilled water== should be used to wash out conical flasks between titrations, because it adds no extra moles of reagent.",
      },
    ],
  },
  {
    spec: "P2.7",
    statement:
      "state the safety precautions of titration work, and know why testing batches and mixtures matters in quality control",
    title: "Safety precautions, batches and mixtures",
    blocks: [
      {
        k: "bullets",
        items: [
          "Acids and alkalis are ==corrosive== (at low concentrations acids are irritants).",
          "Wear ==eye protection and gloves==; if spilled, immediately wash the affected parts.",
          "If a substance is ==unknown==, treat it as potentially toxic and wear gloves.",
          "In ==quality control== it is necessary to titrate several samples, as the amount or concentration of the chemical being tested may vary between batches.",
          "When titrating a mixture to find the concentration of an active ingredient, consider whether the other substances present have ==acid–base properties==. If they don't, you can titrate with confidence.",
        ],
      },
    ],
  },
  {
    spec: "P2.8",
    statement:
      "write the common titration equations from memory, including the diprotic acid and the carbonate reactions",
    title: "Common titration equations",
    blocks: [
      { k: "eq", eq: "CH~3~CO~2~H + NaOH → CH~3~CO~2~^−^Na^+^ + H~2~O" },
      { k: "eq", eq: "H~2~SO~4~ + 2NaOH → Na~2~SO~4~ + 2H~2~O" },
      { k: "eq", eq: "HCl + NaOH → NaCl + H~2~O" },
      { k: "eq", eq: "NaHCO~3~ + HCl → NaCl + CO~2~ + H~2~O" },
      { k: "eq", eq: "Na~2~CO~3~ + 2HCl → 2NaCl + CO~2~ + H~2~O" },
      {
        k: "note",
        label: "Watch the ratios",
        text: "Sulfuric acid is ==diprotic== — one mole of H~2~SO~4~ needs ==two== moles of NaOH. The carbonate equation needs two moles of HCl for the same reason.",
      },
    ],
  },
];
