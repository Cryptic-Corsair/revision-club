import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 9 — Organic reactions and tests,
   Core Practicals 5, 6 & 7 (sections P9.1–P9.7)
   Text kept verbatim from the CHSE Unit 3 core practical reference
   notes (2020) — "Core practical 5", "Purifying an organic liquid",
   "CORE PRACTICAL 6", the cyclohexene and ester preparations, "Core
   practical 7" and "CORE PRACTICAL 8+15: Analysis of some organic
   unknowns"; page furniture omitted. Highlighting is kept
   deliberately light: one mark per key term, short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P09: SpecSection[] = [
  {
    spec: "P9.1",
    statement:
      "investigate the rate of hydrolysis of some halogenoalkanes — the order the silver halide precipitates appear ranks the reactivity",
    title: "Core Practical 5 — the hydrolysis race",
    blocks: [
      {
        k: "def",
        term: "Hydrolysis",
        text: "The ==splitting of a molecule== — in this case a haloalkane — ==by a reaction with water==.",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~X + H~2~O → CH~3~CH~2~OH + X^−^ + H^+^",
      },
      {
        k: "p",
        text: "==Aqueous silver nitrate== is added to a haloalkane, and the halide leaving group combines with a silver ion to form a ==silver halide precipitate==. The precipitate only forms when the halide ion has ==left== the haloalkane — so the rate of formation of the precipitate can be used to ==compare the reactivity== of the different haloalkanes. The quicker the precipitate is formed, the ==faster the substitution== and the ==more reactive== the haloalkane.",
      },
      {
        k: "p",
        text: "The rate of these substitution reactions depends on the ==strength of the C–X bond==: the ==weaker== the bond, the easier it is to break and the ==faster== the reaction. Water is a ==poor nucleophile==, but it can react slowly with haloalkanes in a substitution reaction:",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~I + H~2~O → CH~3~CH~2~OH + I^−^ + H^+^        then        Ag^+^(aq) + I^−^(aq) → AgI(s)",
      },
      {
        k: "steps",
        caption: "Method — testing for halogenoalkanes",
        items: [
          {
            title: "Line up three tubes",
            text: "Arrange three test tubes in a row and add three drops of halogenoalkane in the sequence ==1-chlorobutane, 1-bromobutane, 1-iodobutane==.",
          },
          {
            title: "Add the silver nitrate",
            text: "Add 4 cm^3^ of ==0.02 M silver nitrate== to each halogenoalkane.",
          },
          {
            title: "Into the bath together",
            text: "==Without delay==, put all three test tubes ==simultaneously== into a hot water bath.",
          },
          {
            title: "Watch the order",
            text: "Note the ==order in which precipitates appear==.",
          },
        ],
      },
      {
        k: "bullets",
        items: [
          "The ==iodoalkane== forms a precipitate with the silver nitrate ==first== — the C–I bond is ==weakest== and so it hydrolyses the quickest.",
          "AgI(s) — ==yellow== precipitate.",
          "AgBr(s) — ==cream== precipitate, forms faster than AgCl.",
          "AgCl(s) — ==white== precipitate, last of the three.",
        ],
      },
      {
        k: "figure",
        kind: "hx-hydrolysis",
        caption:
          "The race in one frame: same conditions, three halogenoalkanes — the yellow of AgI appears first because C–I is the bond that gives up first.",
      },
    ],
  },
  {
    spec: "P9.2",
    statement:
      "prepare a halogenoalkane from an alcohol — chlorination of 2-methylpropan-2-ol with concentrated hydrochloric acid, then wash, dry and distil",
    title: "Core Practical 6 — preparing and purifying a halogenoalkane",
    blocks: [
      {
        k: "steps",
        caption: "Detailed method",
        items: [
          {
            title: "Measure the alcohol",
            text: "Measure 8 cm^3^ of ==2-methylpropan-2-ol== in a measuring cylinder and measure its mass.",
          },
          {
            title: "Into the funnel",
            text: "Pour the alcohol into a ==separating funnel==, and reweigh the measuring cylinder to find the mass of alcohol used.",
          },
          {
            title: "Add the acid in portions",
            text: "In a ==fume cupboard==, add 20 cm^3^ of ==concentrated hydrochloric acid== in portions of 3 cm^3^. After each portion, stopper the flask and ==invert it several times== — and ==open the tap== when doing this to release the pressure.",
          },
          {
            title: "Stand",
            text: "Allow the separating funnel to stand in the fume cupboard for about ==20 minutes==, gently shaking it at intervals.",
          },
          {
            title: "Remove the aqueous layer",
            text: "Allow the layers to separate, then open the tap and remove the ==lower aqueous layer==. Dispose of this layer.",
          },
          {
            title: "Neutralise the acid",
            text: "Add ==sodium hydrogencarbonate solution== in 2 cm^3^ portions — this ==neutralises any remaining acid==. Shake the funnel after each addition and release the pressure. Continue until ==no more bubbles of CO~2~== are seen.",
          },
          {
            title: "Separate and dry",
            text: "Allow the layers to separate; again remove the lower aqueous layer. Run the ==organic layer== into a clean conical flask and add ==two spatulas of anhydrous sodium sulfate==. Stopper, shake, and allow to stand until the liquid becomes ==clear== — this step ==dries the organic liquid==.",
          },
          {
            title: "Decant and distil",
            text: "Decant the liquid into a ==weighed clean distillation flask==. Distil, holding a 250 cm^3^ beaker half-full of ==boiled water== around the flask in a standard distillation set up.",
          },
          {
            title: "Collect the fraction",
            text: "Collect the liquid that distils in the range ==47–53 °C==.",
          },
          {
            title: "Weigh the product",
            text: "Measure the mass of the ==2-chloro-2-methylpropane== collected.",
          },
        ],
      },
      {
        k: "note",
        label: "The technique stack",
        text: "This one preparation chains the whole of Practical 7: a ==separating funnel== wash with releases of pressure, ==drying with an anhydrous salt==, ==decanting==, and a ==distillation== to a boiling range — every step is a mark.",
      },
    ],
  },
  {
    spec: "P9.3",
    statement:
      "prepare cyclohexene from cyclohexanol with concentrated phosphoric acid, then purify by washing, drying and reweighing",
    title: "Preparing cyclohexene from cyclohexanol",
    blocks: [
      {
        k: "eq",
        eq: "cyclohexanol —(conc H~3~PO~4~)→ cyclohexene + H~2~O",
      },
      {
        k: "steps",
        caption: "Detailed method",
        items: [
          {
            title: "Weigh the alcohol",
            text: "Pour about 20 cm^3^ of ==cyclohexanol== into a ==weighed 50 cm^3^ pear-shaped flask==; reweigh the flask and record the mass of cyclohexanol.",
          },
          {
            title: "Add the acid",
            text: "Using a plastic graduated dropping pipette, carefully and with ==frequent shaking==, add approximately 8 cm^3^ of ==concentrated phosphoric acid==.",
          },
          {
            title: "Assemble for distillation",
            text: "Add a few ==anti-bumping granules== and assemble the distillation apparatus. Heat the flask gently, ==distilling over any liquid which boils below 100 °C==.",
          },
          {
            title: "Wash the distillate",
            text: "Pour the distillate into a separating funnel and add ==50 cm^3^ of saturated sodium chloride solution==. Shake the mixture and allow the two layers to separate.",
          },
          {
            title: "Keep the upper layer",
            text: "Run off the ==lower layer== into a beaker, then transfer the ==upper layer== — which contains the crude cyclohexene — into a small conical flask.",
          },
          {
            title: "Dry",
            text: "Add a few lumps of ==anhydrous calcium chloride== (or anhydrous sodium sulfate(VI), or anhydrous magnesium sulfate) to the crude cyclohexene to ==remove water==. Stopper the flask, shake, and allow to stand until the liquid becomes ==clear==.",
          },
          {
            title: "Decant and weigh",
            text: "Decant the liquid into a clean, dry, weighed sample container. Reweigh the container and ==calculate the mass of dry cyclohexene produced==.",
          },
        ],
      },
    ],
  },
  {
    spec: "P9.4",
    statement:
      "prepare an ester — propyl ethanoate from propan-1-ol and ethanoic acid, refluxed with concentrated sulfuric acid and purified by washing, drying and distillation",
    title: "Preparing and purifying an ester",
    blocks: [
      {
        k: "p",
        text: "Propyl ethanoate can be made in the laboratory from propan-1-ol and ethanoic acid:",
      },
      {
        k: "eq",
        eq: "CH~3~COOH + CH~3~CH~2~CH~2~OH → CH~3~COOCH~2~CH~2~CH~3~ + H~2~O",
      },
      {
        k: "steps",
        caption: "Procedure",
        items: [
          {
            title: "Mix the reagents",
            text: "Propan-1-ol (50 cm^3^) and ethanoic acid (50 cm^3^) are mixed thoroughly in a 250 cm^3^ round-bottomed flask.",
          },
          {
            title: "Add the catalyst slowly",
            text: "Concentrated sulfuric acid (10 cm^3^) is added ==drop by drop==, keeping the contents of the flask ==well-shaken and cooled in an ice-water bath==.",
          },
          {
            title: "Reflux",
            text: "When the acid has all been added, fit a ==reflux condenser== and gently boil over an ==electric heating mantle== for about ==30 minutes==.",
          },
          {
            title: "Distil the crude ester",
            text: "Cool, and rearrange the apparatus for distillation. The crude ester (about 60 cm^3^) is distilled off.",
          },
          {
            title: "Wash with carbonate",
            text: "Place the distillate in a separating funnel and shake with about ==half its volume of 30% sodium carbonate solution==, releasing the pressure at intervals. The ==lower aqueous layer== is discarded.",
          },
          {
            title: "Wash with calcium chloride",
            text: "Shake the crude ester with about ==half its volume of 50% calcium chloride solution==, which ==removes unreacted alcohol==. The lower layer is discarded.",
          },
          {
            title: "Dry",
            text: "Run the ester into a clean, dry flask containing some ==anhydrous calcium chloride== and swirl.",
          },
          {
            title: "Redistil",
            text: "Filter the ester into a clean, dry flask with a few ==anti-bumping granules==, and distil. Collect the fraction boiling between ==100 °C and 103 °C==.",
          },
        ],
      },
      {
        k: "bullets",
        items: [
          "Sulfuric acid is a ==catalyst== — and adding concentrated H~2~SO~4~ is an ==exothermic reaction==: to prevent uncontrolled boiling over, add ==drop by drop== and cool.",
          "In reflux the reactant vapours of the volatile compound are ==condensed and returned== to the reaction mixture. The reaction is ==slow==, so it is heated for 30 minutes.",
          "The ==electric heating mantle== allows controlled heating and stops flammable vapour lighting.",
          "Sodium carbonate reacts with ==unreacted acid== and remaining catalyst still present after distillation; the reaction produces CO~2~, so the pressure of gas must be released.",
          "The ==upper layer is organic== because it has a lower density than water.",
          "Calcium chloride is a ==drying agent== — the liquid will appear ==clear== when dry.",
          "==Anti-bumping granules== are added to prevent vigorous, uneven boiling by making small bubbles form instead of large bubbles.",
        ],
      },
    ],
  },
  {
    spec: "P9.5",
    statement:
      "oxidise a primary alcohol partially — a limited amount of dichromate, and distil the aldehyde out as it forms",
    title: "Core Practical 7 — partial oxidation to an aldehyde",
    blocks: [
      {
        k: "p",
        text: "Reaction: primary alcohol → ==aldehyde==. Reagent: ==potassium dichromate(VI) solution and dilute sulfuric acid==. Conditions: use a ==limited amount of dichromate==, warm gently and ==distil out the aldehyde as it forms==.",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH~2~OH + [O] → CH~3~CH~2~CHO + H~2~O",
        note: "propan-1-ol → propanal",
      },
      {
        k: "p",
        text: "Observation: the ==orange dichromate ion (Cr~2~O~7~^2−^) reduces to the green Cr^3+^ ion==.",
      },
      {
        k: "note",
        label: "Safety",
        text: "You must wear ==gloves== when handling solid potassium dichromate(VI) — it is highly toxic and a ==category 2 carcinogen==; it is also an irritant. Avoid inhaling any dust. Concentrated sulfuric acid is ==corrosive==.",
      },
      {
        k: "steps",
        caption: "Detailed method — the partial oxidation of propan-1-ol",
        items: [
          {
            title: "Make the oxidising mixture",
            text: "Place about 10 cm^3^ of ==dilute sulfuric acid== in a flask and add about ==3 g of potassium dichromate(VI)== and 2 or 3 anti-bumping granules. Shake until solution is complete — ==do not warm==.",
          },
          {
            title: "Add the alcohol",
            text: "Add ==1.5 cm^3^ of propan-1-ol== in drops from a dropping pipette, shaking the flask to mix the contents.",
          },
          {
            title: "Assemble for distillation",
            text: "Assemble the distillation apparatus.",
          },
          {
            title: "Distil slowly",
            text: "Gently heat and slowly distil ==2 cm^3^ of liquid== into a test tube, taking care that none of the reaction mixture ==splashes over==.",
          },
        ],
      },
      {
        k: "p",
        text: "This experiment uses a ==limited quantity of oxidising agent== (0.01 mol) and the product is ==distilled from the reaction mixture immediately it is formed== — in this way a partial oxidation is achieved. The distillation rig rules from Practical 7 all apply: thermometer bulb at the ==T-junction==, water in at the ==bottom== of the condenser, and ==electric heaters== for flammable organics.",
      },
    ],
  },
  {
    spec: "P9.6",
    statement:
      "oxidise a primary alcohol fully — an excess of dichromate heated under reflux, and the carboxylic acid distilled off afterwards",
    title: "Core Practical 7 — full oxidation under reflux",
    blocks: [
      {
        k: "p",
        text: "Reaction: primary alcohol → ==carboxylic acid==. Reagent: ==potassium/sodium dichromate(VI) solution and sulfuric acid==. Conditions: use an ==excess of dichromate==, and ==heat under reflux== — distil off the product only ==after the reaction has finished==.",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH~2~OH + 2[O] → CH~3~CH~2~COOH + H~2~O",
        note: "propan-1-ol → propanoic acid. Observation again: the orange dichromate ion (Cr~2~O~7~^2−^) reduces to the green Cr^3+^ ion.",
      },
      {
        k: "steps",
        caption: "Detailed method",
        items: [
          {
            title: "Dissolve the dichromate",
            text: "Measure 5 cm^3^ of water into a boiling tube. Add ==6 g of sodium dichromate(VI)==, shake and set aside to dissolve.",
          },
          {
            title: "Charge the flask",
            text: "Put about 1.5 cm^3^ of propan-1-ol into a 50 cm^3^ round-bottomed flask with about 5 cm^3^ of water and two or three anti-bumping granules. Put a condenser on the flask for ==reflux==.",
          },
          {
            title: "Add the acid down the condenser",
            text: "Add 2 cm^3^ of ==concentrated sulfuric acid== down the condenser ==in drops== from a dropping pipette.",
          },
          {
            title: "Add the oxidant down the condenser",
            text: "While the mixture is still warm, start to add the sodium dichromate(VI) solution ==down the condenser in drops==. The energy released from the reaction should make the mixture ==boil without any external heating== — add the solution a drop at a time so that the mixture continues to boil.",
          },
          {
            title: "Boil it out",
            text: "When all the sodium dichromate(VI) solution has been added, use a ==low Bunsen burner flame== to keep the mixture boiling for ==10 minutes==, not allowing any vapour to escape.",
          },
          {
            title: "Rearrange and distil",
            text: "Remove the Bunsen burner and arrange the apparatus for distillation. Gently distil ==2–3 cm^3^ of liquid== into a test tube.",
          },
        ],
      },
      {
        k: "figure",
        kind: "alc-ox-flow",
        caption:
          "One oxidant, two destinations: distil as it forms for the aldehyde, reflux with excess for the carboxylic acid — the rig decides the product.",
      },
    ],
  },
  {
    spec: "P9.7",
    statement:
      "identify the functional group of an organic unknown with test-tube reactions — bromine water, PCl~5~, sodium, Fehling's solution and dichromate",
    title: "Analysis of some organic unknowns",
    blocks: [
      {
        k: "p",
        text: "Functional group test for an ==alkene==: to 0.5 cm^3^ of ==bromine water== in a test tube add a few drops of the unknown and shake. Observation: alkenes should ==decolourise bromine water==.",
      },
      {
        k: "p",
        text: "==Fehling's solution== for the aldehyde: the reagent contains blue Cu^2+^ ions, heated gently. ==Aldehydes only== are oxidised by Fehling's solution into a carboxylic acid, and the copper(II) ions are reduced to copper(I) oxide. Observation: the blue Cu^2+^ ions in solution change to a ==red precipitate of Cu~2~O==. Ketones ==do not react==.",
      },
      {
        k: "eq",
        eq: "CH~3~CHO + 2Cu^2+^ + 2H~2~O → CH~3~COOH + Cu~2~O + 4H^+^",
      },
      {
        k: "steps",
        caption: "Fehling's solution method",
        items: [
          {
            title: "Mix A and B",
            text: "Place 1 cm^3^ of ==Fehling's A== into each of two boiling tubes, then add ==Fehling's B== until the blue precipitate ==redissolves==.",
          },
          {
            title: "Add the unknown",
            text: "Add a few drops of the unknown.",
          },
          {
            title: "Warm",
            text: "Leave in a ==water bath== for a few minutes.",
          },
        ],
      },
      {
        k: "table",
        caption: "Summary of identification of functional groups by test-tube reactions",
        head: ["Functional group", "Reagent", "Result"],
        rows: [
          ["Alkene", "Bromine water", "Orange colour decolourises"],
          ["Alcohols", "PCl~5~", "==Misty fumes of HCl== produced"],
          ["Alcohols", "Sodium metal", "Effervescence due to H~2~ gas"],
          ["Aldehyde", "Fehling's solution", "Blue solution to red precipitate"],
          ["1°, 2° alcohol and aldehyde", "Sodium dichromate and sulfuric acid", "==Orange to green== colour change"],
          ["Chloroalkane", "Warm with silver nitrate", "Slow formation of white precipitate of AgCl"],
        ],
      },
      {
        k: "wow",
        text: "Six tubes, one unknown: bromine water catches the alkene, PCl~5~ and sodium catch the alcohol, Fehling's separates the aldehyde, dichromate tells primary and secondary from tertiary, and the slow AgCl fingers the chloroalkane.",
      },
    ],
  },
];
