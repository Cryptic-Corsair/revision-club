import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 7 — Distillation, reflux and
   separation (sections P7.1–P7.7)
   Text kept verbatim from the CHSE Grade 11 "Unit 3: Laboratory
   Chemistry" practical notes ("Lab apparatus for unit 3": distillation,
   heat under reflux, separating funnel, filtration, fractional
   distillation) and the CHSE Unit 3 core practical reference notes
   (2020) — the distillation, reflux, purification and boiling-point
   pages; page furniture omitted. Highlighting is kept deliberately
   light: one mark per key term, short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P07: SpecSection[] = [
  {
    spec: "P7.1",
    statement:
      "carry out a simple distillation — separate the most volatile liquid from a mixture and collect it through a Liebig condenser",
    title: "Distillation",
    blocks: [
      {
        k: "def",
        term: "Distillation",
        text: "The process used to separate the substances composing a mixture of ==miscible liquids of varying boiling points==.",
      },
      {
        k: "steps",
        caption: "Method",
        items: [
          {
            title: "Heat the flask",
            text: "Pour your solution into a flask, then place the flask on a Bunsen burner and heat.",
          },
          {
            title: "The lowest boiling point leaves first",
            text: "The liquid with the ==lowest boiling point== will evaporate.",
          },
          {
            title: "Through the condenser",
            text: "The vapour will then pass through the ==Liebig condenser==.",
          },
          {
            title: "Two pipes",
            text: "The condenser has 2 pipes — the vapour passes through the ==centre== one.",
          },
          {
            title: "Water in the outer pipe",
            text: "The outer pipe has ==water== running through it.",
          },
          {
            title: "Collect",
            text: "The vapour will condense and then drip into a beaker.",
          },
        ],
      },
      {
        k: "note",
        label: "Exam question, answered",
        text: "Explain how the Liebig condenser works and its purpose in distillation: ==cold water passing through the condenser cools and condenses the vapours== or gases rising from the reaction mixture, and it ==prevents the escape of reactants and products== so that the reaction can continue to completion.",
      },
      {
        k: "bullets",
        items: [
          "The bulb of the thermometer should be ==at the T-junction== connecting to the condenser, to measure the correct boiling point.",
          "The water goes in at the ==bottom== of the condenser, to go against gravity — this allows more efficient cooling and prevents back flow of water.",
          "==Electric heaters== are often used to heat organic chemicals, because organic chemicals are normally ==highly flammable== and could set on fire with a naked flame.",
          "The collection flask can be cooled in ==ice== to help improve the yield of distillate.",
          "Collect the distillate of the ==approximate boiling point range== of the desired liquid.",
          "It's important to be able to draw and label this apparatus accurately: ==don't draw lines between flask, adaptor and condenser==.",
        ],
      },
      {
        k: "figure",
        kind: "alc-distillation",
        caption:
          "The distillation rig — thermometer bulb at the T-junction, water in low and out high, and no drawn joints between the glassware.",
      },
    ],
  },
  {
    spec: "P7.2",
    statement:
      "heat under reflux — boil a volatile mixture for a long time without losing solvent, and never seal the apparatus",
    title: "Heat under reflux",
    blocks: [
      {
        k: "def",
        term: "Heating under reflux",
        text: "Enables a mixture ==including volatile materials== to be heated for a ==long time without loss of solvent==.",
      },
      {
        k: "bullets",
        items: [
          "The water goes in at the ==bottom== of the condenser.",
          "There must ==not== be a stopper in the top of the condenser — the apparatus ==must not be sealed==.",
          "There must ==not== be a thermometer in the top of the condenser — partly for the same reason, but also because it wouldn't measure the temperature of anything that mattered. ==The vapour doesn't get that far==.",
          "==Never seal the end of the condenser== — the build up of gas pressure could cause the apparatus to explode. This is true of any apparatus where volatile liquids are heated, ==including the distillation set up==.",
          "==Anti-bumping granules== are added to the flask, in both distillation and reflux, to prevent vigorous, uneven boiling by making ==small bubbles form instead of large== ones.",
        ],
      },
      {
        k: "figure",
        kind: "alc-reflux",
        caption:
          "The reflux rig — condenser upright, water in at the bottom, open at the top: vapours condense and fall back, nothing escapes, nothing is sealed.",
      },
    ],
  },
  {
    spec: "P7.3",
    statement:
      "separate two immiscible liquids of different density with a separating funnel",
    title: "The separating funnel",
    blocks: [
      {
        k: "p",
        text: "A separating funnel is used to separate ==two liquids with different densities== — an ==immiscible== solution, e.g. oil and water.",
      },
      {
        k: "steps",
        caption: "Method",
        items: [
          {
            title: "Get an immiscible mixture",
            text: "e.g. oil and water.",
          },
          {
            title: "Let the layers form",
            text: "The liquids are placed in the separating funnel; they form ==two layers==.",
          },
          {
            title: "Run off the denser liquid",
            text: "Slowly turn the tap so that all the water — ==which is denser than oil== — trickles out.",
          },
          {
            title: "Close the tap",
            text: "When all the water is gone, close the tap.",
          },
        ],
      },
      {
        k: "note",
        label: "Its limit",
        text: "It is not perfect: you can never be quite sure ==where one liquid ends and the other begins==.",
      },
      {
        k: "figure",
        kind: "alc-funnel",
        caption:
          "Two layers, tap at the bottom — the denser liquid leaves first, and the boundary is watched all the way down.",
      },
    ],
  },
  {
    spec: "P7.4",
    statement:
      "separate an insoluble solid from a liquid by filtration — residue on the paper, filtrate through it",
    title: "Filtration",
    blocks: [
      {
        k: "p",
        text: "A method to separate an ==insoluble solid== is to pour the mixture onto filter paper in a filter funnel. The filter paper will absorb the liquid, which then drips through the funnel; the ==solid sediment is left behind==.",
      },
      {
        k: "steps",
        caption: "Method",
        items: [
          {
            title: "Fold the paper",
            text: "Fold the filter paper into ==quarters==.",
          },
          {
            title: "Fit it",
            text: "Fit it into the funnel.",
          },
          {
            title: "Pour slowly",
            text: "Slowly pour the liquid and sediment.",
          },
          {
            title: "Collect the liquid",
            text: "Liquid will drip through the funnel — the ==filtrate==.",
          },
          {
            title: "The solid stays",
            text: "Sediment will be left behind — the ==residue== — and you are left with a pure liquid.",
          },
        ],
      },
    ],
  },
  {
    spec: "P7.5",
    statement:
      "separate liquids with different boiling points using a fractionating column",
    title: "Fractional distillation",
    blocks: [
      {
        k: "def",
        term: "Fractional distillation",
        text: "The separation of a liquid mixture into ==fractions differing in boiling point== by means of distillation, typically using a ==fractionating column==.",
      },
      {
        k: "bullets",
        items: [
          "Heat the flask, with a Bunsen burner or electric mantle — this causes ==vapours of all the components== in the mixture to be produced.",
          "Vapours pass up the ==fractionating column==.",
          "The vapour of the substance with the ==lower boiling point== reaches the top of the fractionating column first.",
          "The thermometer should be at or ==below the boiling point== of the most volatile substance.",
          "The vapours with ==higher boiling points condense== back into the flask.",
          "Only the ==most volatile vapour== passes into the condenser.",
          "The condenser cools the vapours, which condense to a liquid and are collected.",
        ],
      },
      {
        k: "figure",
        kind: "alc-fractional",
        caption:
          "The column does the sorting: high boilers keep condensing back, the most volatile vapour climbs out and is collected.",
      },
    ],
  },
  {
    spec: "P7.6",
    statement:
      "purify a liquid organic compound — wash, separate the layers, dry with an anhydrous salt, decant and redistil",
    title: "Purifying an organic liquid",
    blocks: [
      {
        k: "steps",
        caption: "General method",
        items: [
          {
            title: "Load the funnel",
            text: "Put the distillate of impure product into a ==separating funnel==.",
          },
          {
            title: "Wash the product",
            text: "Add either ==sodium hydrogencarbonate solution== — shaking and releasing the pressure from the CO~2~ produced — or ==saturated sodium chloride solution==.",
          },
          {
            title: "Separate the layers",
            text: "Allow the layers to separate in the funnel, then ==run off and discard the aqueous layer==.",
          },
          {
            title: "Dry the organic layer",
            text: "Run the organic layer into a clean, dry conical flask and add ==three spatula loads of drying agent== (e.g. anhydrous sodium sulfate, calcium chloride). When dry, the organic liquid should appear ==clear==.",
          },
          {
            title: "Decant",
            text: "Carefully ==decant== the liquid into the distillation flask.",
          },
          {
            title: "Redistil",
            text: "Distil to collect the ==pure product==.",
          },
        ],
      },
      {
        k: "def",
        term: "Decant",
        text: "Carefully ==pour off== the organic liquid, ==leaving the drying agent== behind in the conical flask.",
      },
      {
        k: "bullets",
        items: [
          "Sodium hydrogencarbonate will ==neutralise any remaining reactant acid==.",
          "Sodium chloride will help ==separate the organic layer== from the aqueous layer.",
          "The layer with the ==lower density will be the upper layer== — this is usually the organic layer.",
          "The drying agent should be ==insoluble== in the organic liquid and ==not react== with it.",
        ],
      },
    ],
  },
  {
    spec: "P7.7",
    statement:
      "measure the boiling temperature of a liquid as a test of purity — and know why it is not the most accurate identification",
    title: "Measuring boiling point",
    blocks: [
      {
        k: "bullets",
        items: [
          "Purity of a liquid can be determined by measuring a ==boiling point== — in a distillation set up, or by simply boiling a tube of the sample in a heating oil bath.",
          "If the liquid is ==pure== it will have the boiling point referred to in data books. If impure, the boiling point tends to be ==higher== than the pure liquid.",
          "==Pressure== should be noted, as changing pressure can change the boiling point of a liquid.",
          "Measuring boiling point is ==not the most accurate method== of identifying a substance — several substances may have the same boiling point.",
        ],
      },
      {
        k: "note",
        label: "The correct measure",
        text: "To get a correct measure of boiling point, the thermometer should be ==above the level of the surface of the boiling liquid==, measuring the temperature of the ==saturated vapour==.",
      },
      {
        k: "figure",
        kind: "alc-bp",
        caption:
          "The thermometer reads the vapour, not the liquid — a pure compound holds its boiling point, an impure one drifts above it.",
      },
    ],
  },
];
