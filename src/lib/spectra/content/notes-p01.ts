import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 1 — Measurements, gas volumes
   and uncertainty (sections P1.1–P1.5)
   Text kept verbatim from the CHSE Unit 3 core practical reference
   notes (2020) — the safety and hazards page, "Measuring gas
   volumes" and the Uncertainty pages; page furniture omitted.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P01: SpecSection[] = [
  {
    spec: "P1.1",
    statement:
      "recognise the hazards of laboratory reagents — irritant, corrosive, flammable, toxic and oxidising — and name the precaution each one demands",
    title: "Safety and hazards",
    blocks: [
      {
        k: "p",
        text: "The practical guide opens with the hazard vocabulary, because every risk assessment in the exam is written with it. Match the hazard to the precaution and the marks follow.",
      },
      {
        k: "table",
        caption: "The five hazard labels and their precautions",
        head: ["Hazard", "Typically", "Precaution"],
        rows: [
          ["Irritant", "dilute acids and alkalis", "wear goggles"],
          ["Corrosive", "stronger acids and alkalis", "wear goggles"],
          ["Flammable", "organic liquids and fuels", "keep away from naked flames"],
          ["Toxic", "heavy-metal salts, dichromates", "wear gloves, avoid skin contact, wash hands after use"],
          ["Oxidising", "dichromates, peroxides, nitrates", "keep away from flammable / easily oxidised materials"],
        ],
      },
      {
        k: "note",
        label: "Concentration matters",
        text: "Hazardous substances in ==low concentrations or amounts== will not pose the same risks as the pure substance — dilute hydrochloric acid is an irritant, concentrated hydrochloric acid is corrosive.",
      },
    ],
  },
  {
    spec: "P1.2",
    statement:
      "measure the volume of a gas with a gas syringe or by collection over water, recording room temperature and pressure alongside the volume",
    title: "Measuring gas volumes",
    blocks: [
      {
        k: "p",
        text: "==Gas syringes== can be used for a variety of experiments where the volume of a gas is measured — possibly to work out moles of gas, or to follow reaction rates.",
      },
      {
        k: "bullets",
        items: [
          "Make sure you don't leave ==gaps in your diagram== where gas could escape.",
          "If drawing a gas syringe, draw it with some ==measurement markings== on the barrel, to show measurements can be made.",
          "Alternatively, gas volumes can be measured ==over water==, with an up-turned measuring cylinder in a trough of water.",
          "The volume of a gas depends on ==pressure and temperature==, so when recording a volume it is important to note down the temperature and pressure of the room.",
        ],
      },
      {
        k: "def",
        term: "Potential errors in using a gas syringe",
        text: "gas escapes before the bung is inserted; the syringe sticks; and some gases — like carbon dioxide or sulfur dioxide — are soluble in water, so with collection over water the ==true amount of gas is not measured==.",
      },
      {
        k: "eq",
        eq: "PV = nRT        (1 mol gas = 24 dm^3^ at room temperature and pressure)",
        note: "Moles of gas can be calculated from gas volume (and temperature and pressure) using the ideal gas equation, or using the molar gas volume.",
      },
    ],
  },
  {
    spec: "P1.3",
    statement:
      "distinguish readings from measurements and quote the uncertainty each piece of apparatus carries",
    title: "Readings, measurements and apparatus uncertainty",
    blocks: [
      {
        k: "def",
        term: "Reading",
        text: "the values found from ==a single judgement== when using a piece of equipment — e.g. one reading of a burette.",
      },
      {
        k: "def",
        term: "Measurement",
        text: "the values taken as the ==difference between the judgements of two values== — e.g. using a burette in a titration, where the titre is final reading minus initial reading.",
      },
      {
        k: "bullets",
        items: [
          "In general, if uncertainty is not indicated on apparatus, assumptions are made. For an ==analogue scale==, the uncertainty of a reading (one judgement) is at least ==± 0.5== of the smallest scale reading.",
          "The uncertainty of a measurement (two judgements) is at least ==± 1== of the smallest scale reading.",
          "If the apparatus has a ==digital scale==, the uncertainty is ==± the resolution== of the apparatus in each measurement.",
        ],
      },
      {
        k: "table",
        caption: "The apparatus uncertainty list, as the reference sheet prints it",
        head: ["Apparatus", "Uncertainty"],
        rows: [
          ["Balance", "± 0.001 g (if using a 3 d.p. balance)"],
          ["Volumetric flask", "± 0.1 cm^3^"],
          ["25 cm^3^ pipette", "± 0.1 cm^3^"],
          ["Burette (start & end readings and end point)", "± 0.15 cm^3^"],
        ],
      },
      {
        k: "note",
        label: "The burette's two readings",
        text: "If the burette used in a titration has an uncertainty for each reading of ± 0.05 cm^3^, then during a titration two readings are taken — so the uncertainty on the titre volume is ==± 0.10 cm^3^==.",
      },
    ],
  },
  {
    spec: "P1.4",
    statement:
      "calculate the percentage uncertainty of each measurement, add them for the maximum total apparatus uncertainty, and shrink them by measuring bigger, repeating or upgrading the instrument",
    title: "Percentage uncertainty",
    blocks: [
      {
        k: "eq",
        eq: "% uncertainty = (uncertainty ÷ measured value) × 100",
      },
      {
        k: "worked",
        title: "Worked example · the burette's percentage uncertainty",
        question:
          "A titration's average titre is delivered by a burette whose uncertainty per reading is ± 0.05 cm^3^. Calculate the percentage uncertainty of the titre.",
        steps: [
          "The titre is a **measurement** — two readings — so its uncertainty is 0.05 + 0.05 = ± 0.10 cm^3^.",
          "% uncertainty = 0.15/average titre × 100 (the reference sheet's formula for a burette, which also allows for judging the end point).",
          "The bigger the titre, the smaller the percentage — a 22.30 cm^3^ titre carries far less percentage doubt than a 5.10 cm^3^ one.",
        ],
        answer:
          "Divide the total uncertainty by the titre and multiply by 100. To calculate the ==maximum total percentage apparatus uncertainty== in the final result, ==add all the individual equipment uncertainties together==.",
      },
      {
        k: "h",
        text: "Reducing uncertainties in a titration",
      },
      {
        k: "bullets",
        items: [
          "To decrease apparatus uncertainties you can either ==decrease the sensitivity uncertainty== by using apparatus with greater resolution (finer scale divisions), or ==increase the size of the measurement==.",
          "To reduce the % uncertainty in a burette reading, make the ==titre a larger volume==: increase the volume and concentration of the substance in the conical flask, or decrease the concentration of the substance in the burette.",
          "Replacing measuring cylinders with ==pipettes or burettes==, which have a lower apparatus uncertainty, will lower the % uncertainty.",
          "If looking at a series of measurements in an investigation, the experiments with the ==smallest readings== will have the highest experimental uncertainties.",
        ],
      },
      {
        k: "h",
        text: "Reducing uncertainties in measuring mass",
      },
      {
        k: "bullets",
        items: [
          "Using a balance that measures to ==more decimal places==, or using a ==larger mass==, will reduce the % uncertainty in weighing a solid.",
          "Weighing the sample ==before and after== addition, then calculating the difference, ensures a more accurate measurement of the mass actually added.",
        ],
      },
    ],
  },
  {
    spec: "P1.5",
    statement:
      "compare the percentage difference between the actual and calculated values with the apparatus uncertainty to decide whether a discrepancy exists",
    title: "The discrepancy test",
    blocks: [
      {
        k: "p",
        text: "The reference sheet ends the uncertainty toolkit with a decision rule that examiners love. It compares two numbers: the ==percentage uncertainty due to the apparatus== and the ==percentage difference between the actual value and the calculated value==.",
      },
      {
        k: "bullets",
        items: [
          "If the % uncertainty due to the apparatus ==<== the percentage difference between the actual value and the calculated value, then there is a ==discrepancy== in the result due to other errors.",
          "If the % uncertainty due to the apparatus ==>== the percentage difference, then there is ==no discrepancy==, and all the errors in the results can be explained by the sensitivity of the equipment.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · calculated M~r~ of 203 against an actual value of 214",
        question:
          "A student's experiment calculates an M~r~ of 203. The actual value is 214. The apparatus uncertainty totals 4.8 %. Is there a discrepancy?",
        steps: [
          "Calculate the difference: 214 − 203 = 11.",
          "Calculate the percentage difference: 11/214 × 100 = ==5.14 %==. (The reference sheet prints 5.41 % — the digits are transposed; the arithmetic gives 5.14 %.)",
          "Compare: the apparatus can only explain 4.8 % of doubt, and 4.8 % < 5.14 %.",
        ],
        answer:
          "The apparatus uncertainty is *smaller* than the percentage difference, so there ==is a discrepancy== in the result — something other than the equipment's sensitivity went wrong.",
      },
    ],
  },
];
