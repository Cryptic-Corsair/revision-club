import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 6 revision note · sections 6.1 – 6.5 (Part 6A)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 6
   class note (2021, semester 2) — Energetics; page furniture and
   image-only drills omitted. The exercises that are specified in
   words are worked in full.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T06_A: SpecSection[] = [
  {
    spec: "6.1",
    statement:
      "know that the enthalpy change, ΔH, is the heat energy change measured at constant pressure and that standard conditions are 100 kPa and a specified temperature, usually 298 K",
    title: "Enthalpy and the standard conditions",
    blocks: [
      {
        k: "def",
        term: "Energetics",
        text: "==Energetics== is the study of ==energy transfers between reacting chemicals and their surroundings==. The study of these energy transfers is also known as ==thermodynamics==. Energetics deals with the energy changes in reactions and how these energy changes reflect changes at a molecular level — and in chemical systems the ==major transfer of energy is by heating==.",
      },
      { k: "h", text: "First Law of Thermodynamics" },
      {
        k: "bullets",
        items: [
          "==Energy can be neither created nor destroyed== but it can be ==converted from one form to another==.",
          "Chemical reactions are accompanied by some form of energy change — changes can be obvious but in many cases it goes unnoticed.",
          "The energy that is transferred to the surroundings is ==not lost to the universe== – it is ==dissipated or spread through the surroundings==.",
          "This is an important principle in behavior of the universe which is known as the ==principle of conservation of energy==.",
          "The ==total energy content of the universe is constant==.",
          "Two of the most important forms of energy are: ==chemical energy== and ==heat energy==.",
        ],
      },
      {
        k: "def",
        term: "Chemical energy",
        text: "Chemical energy is made up of two components; ==kinetic== and ==potential energy==. **Kinetic energy** is a measure of the ==motion of particles== in a substance. **Potential energy** is a measure of ==how strong the particles interact with one another==.",
      },
      {
        k: "def",
        term: "Heat energy",
        text: "Heat energy is the portion of the potential energy and kinetic energy of a substance that is ==responsible for the temperature== of the substance. The heat energy of the substance is ==directly proportional to its absolute temperature==.",
      },
      { k: "h", text: "Enthalpy and enthalpy changes" },
      {
        k: "def",
        term: "Enthalpy",
        text: "Enthalpy is a measure of the ==heat content of a substance at constant pressure==. Enthalpy of a system ==cannot be measured directly==. However, the ==enthalpy change at constant pressure== can be measured.",
      },
      {
        k: "bullets",
        items: [
          "Enthalpy change is denoted by the symbol, ==ΔH==, “delta H”, and is expressed in ==kJ/mol==.",
          "Enthalpy change is the ==amount of heat energy taken in or given out== during any change in a system provided the ==pressure is constant==.",
          "The enthalpy of a substance depends on the; ==physical state== of the substance (solid, liquid or gas), ==amount of substance==, ==temperature and pressure==.",
        ],
      },
      { k: "h", text: "Standard enthalpy changes" },
      {
        k: "p",
        text: "Enthalpy changes for reactions will ==vary slightly== depending upon the conditions under which the reaction is carried out. Chemists use ==standard conditions== to ensure that all reactions and corresponding enthalpy changes are carried out ==under the same conditions==. They are as close to normal lab conditions as possible.",
      },
      {
        k: "table",
        caption: "Standard conditions",
        head: ["Condition", "Value"],
        rows: [
          ["Pressure", "1 atm"],
          ["Temperature", "298 K (25 °C)"],
          ["Solutions", "concentration 1 mol dm^−3^"],
          ["Physical states", "normal physical states at standard temperature and pressure"],
        ],
      },
      {
        k: "note",
        label: "The symbol",
        text: "Standard enthalpy change is shown by ==ΔH^θ^== or ΔH^θ^^298K^ — **H** for enthalpy, **Δ** for change in, and the ==θ symbol represents standard conditions==.",
      },
      {
        k: "wow",
        text: "ΔH is the ==heat energy change measured at constant pressure== — you can never measure the enthalpy of a system directly, only the ==change==. The θ on ΔH^θ^ is the badge that says the reaction was carried out under ==standard conditions==, so every value in the data book is measured on the same ruler.",
      },
    ],
  },
  {
    spec: "6.2",
    statement:
      "know that, by convention, exothermic reactions have a negative enthalpy change and endothermic reactions have a positive enthalpy change",
    title: "Exothermic and endothermic reactions",
    blocks: [
      {
        k: "def",
        term: "Exothermic reactions",
        text: "Reactions which ==liberate heat energy== to the surrounding. Enthalpy of reactants ==> enthalpy of products==. The sign on ΔH = ==− ve==.",
      },
      {
        k: "bullets",
        items: [
          "The enthalpy of reaction shows that the ==energy content of the system has decreased== – some energy has left the system and entered the surroundings as heat. Hence there is a ==net decrease in the potential energy== of the system.",
          "Therefore, reactants are ==thermodynamically unstable== than the products.",
          "Many exothermic reactions are ==spontaneous==. However, despite being thermodynamically unstable, some exothermic reactions might not occur due to ==kinetic stability==, meaning ==high activation energy== is required to start the reaction.",
          "Example: ==combustion of petrol== is highly exothermic but occurs ==only when ignited==.",
        ],
      },
      {
        k: "def",
        term: "Endothermic reactions",
        text: "Reactions which ==absorb heat energy== from the surrounding. Enthalpy of reactants ==< enthalpy of products==. The sign on ΔH = ==+ ve==.",
      },
      {
        k: "bullets",
        items: [
          "The enthalpy of reaction shows that the ==energy content of the system has increased== as it has gained energy from its surroundings. Hence there is a ==net increase in the potential energy== of the system.",
          "Therefore, reactants are ==thermodynamically stable== than the products.",
        ],
      },
      {
        k: "figure",
        kind: "thermo",
        caption: "Exothermic: heat flows out of the ==chemical system== to the ==surroundings== — the chemicals **lose** energy, ΔH is negative, the temperature rises (ΔT+ve). Endothermic: heat flows in from the surroundings — the chemicals **gain** energy, ΔH is positive, the temperature falls (ΔT−ve).",
      },
      {
        k: "note",
        label: "Overall",
        text: "A reaction is overall **exothermic** if the ==energy released for bond making is greater than energy absorbed for bond breaking== — and overall **endothermic** if the energy released for bond making is ==less than energy absorbed for bond breaking==.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 1 — classify the changes",
        question:
          "Classify the following changes into exothermic reactions and endothermic reactions: freezing water · evaporating water · photosynthesis · combustion of petrol · acid/base reactions · dissolving sodium hydroxide in water · dissolving ammonium nitrate in water.",
        steps: [
          "**Freezing water** — liquid water must ==give out== heat to solidify → **exothermic**.",
          "**Evaporating water** — the liquid must ==take in== heat to break the particles apart → **endothermic**.",
          "**Photosynthesis** — the plant takes energy in (from light) to build glucose → **endothermic**.",
          "**Combustion of petrol** — the class note's own example: ==highly exothermic== but occurs only when ignited.",
          "**Acid/base reactions** — neutralisation gives out heat (Δ~neut~H^θ^ = −57.9 kJ mol^−1^, section 6.4) → **exothermic**.",
          "**Dissolving sodium hydroxide in water** — the class note labels it ==exothermic reaction==.",
          "**Dissolving ammonium nitrate in water** — the class note labels it ==endothermic reaction== — the temperature of the mixture falls.",
        ],
        answer:
          "**Exothermic**: freezing water · combustion of petrol · acid/base reactions · dissolving sodium hydroxide in water. **Endothermic**: evaporating water · photosynthesis · dissolving ammonium nitrate in water.",
      },
    ],
  },
  {
    spec: "6.3",
    statement:
      "be able to construct and interpret enthalpy level diagrams, showing exothermic and endothermic enthalpy changes",
    title: "Enthalpy level and profile diagrams",
    blocks: [
      {
        k: "p",
        text: "The class note draws each change twice — as an **energy level diagram** and as an **energy profile diagram**. In both, the y-axis is ==Enthalpy, H== and the x-axis is ==Progress of reaction==.",
      },
      {
        k: "figure",
        kind: "levels",
        caption: "Energy level diagrams. **Exothermic**: enthalpy of reactants > enthalpy of products, the arrow runs ==down== and ΔH = − ve. **Endothermic**: enthalpy of reactants < enthalpy of products, the arrow runs ==up== and ΔH = + ve.",
      },
      {
        k: "figure",
        kind: "profiles",
        caption: "Energy profile diagrams. The hump adds the ==activation energy== — the climb from the reactants up to the top of the curve. ΔH is still measured ==from the reactants' level to the products' level==: − ve when the products sit below, + ve when they sit above.",
      },
      {
        k: "wow",
        text: "Read the two diagrams differently: the ==level diagram== only compares the ==enthalpy of reactants with the enthalpy of products==, while the ==profile diagram== also shows the ==activation energy== — the high starting hurdle that gives exothermic reactions their ==kinetic stability==.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 2 — an enthalpy level diagram",
        question:
          "2 mol of H~2~ gas reacts with 1 mol of O~2~ gas to produce 2 mol of H~2~O(l). At 25 °C and 1 atm of pressure this reaction releases 571.8 kJ of heat. Draw an enthalpy level diagram for the reaction. Label the axis and enthalpy change for the reaction.",
        steps: [
          "The reaction ==releases== heat → it is **exothermic** → the products' level sits ==below== the reactants' level and ΔH is ==negative==.",
          "Per mole of equation, 2H~2~(g) + O~2~(g) → 2H~2~O(l) releases ==571.8 kJ== → ΔH = ==−571.8 kJ mol^−1^== (per mol refers to one mole of equation — section 6.4).",
          "Draw the axes: ==Enthalpy, H== up the side, ==Progress of reaction== along the bottom. Left level: 2H~2~(g) + O~2~(g), labelled **reactants**.",
          "Right level, lower: 2H~2~O(l), labelled **products**. A downward arrow between the two levels carries the label ==ΔH = −571.8 kJ mol^−1^==.",
        ],
        answer:
          "An exothermic level diagram: reactants (2H~2~(g) + O~2~(g)) on the higher level, products (2H~2~O(l)) below, arrow down labelled ΔH = ==−571.8 kJ mol^−1^==, axes labelled Enthalpy, H and Progress of reaction.",
      },
    ],
  },
  {
    spec: "6.4",
    statement:
      "know the definition of standard enthalpy change of: i reaction, ΔrH ii formation, ΔfH iii combustion, ΔcH iv neutralisation, ΔneutH v atomisation, ΔatH",
    title: "The standard enthalpy changes",
    blocks: [
      { k: "h", text: "1 · Reaction, Δ~r~H^θ^" },
      {
        k: "def",
        term: "Standard enthalpy change of reaction, Δ~r~H^θ^",
        text: "The enthalpy change when the ==number of moles of reactants as specified in the balanced equation== react together.",
      },
      {
        k: "eq",
        eq: "N~2~ + 3H~2~ → 2NH~3~    Δ~r~H^θ^ = −92 kJ mol^−1^",
        note: "But for the reaction when written as ½N~2~ + 3/2H~2~ → NH~3~, Δ~r~H^θ^ = −46 kJ mol^−1^.",
      },
      {
        k: "note",
        label: "Per mol",
        text: "Per mol refers to ==one mole of equation== and ==not to one mole of any reactant or product==.",
      },
      { k: "h", text: "2 · Combustion, Δ~c~H^θ^" },
      {
        k: "def",
        term: "Standard enthalpy change of combustion, Δ~c~H^θ^",
        text: "The enthalpy change that occurs when ==ONE MOLE== of a substance is ==completely burnt in excess oxygen== under standard conditions. All reactants and products must be in their ==standard states==. It is ==always exothermic==.",
      },
      {
        k: "eq",
        eq: "C~2~H~5~OH(l) + 3O~2~(g) → 2CO~2~(g) + 3H~2~O(l)",
        note: "Standard enthalpy of combustion for ethanol.",
      },
      { k: "h", text: "3 · Neutralisation, Δ~neut~H^θ^" },
      {
        k: "def",
        term: "Standard enthalpy change of neutralisation, Δ~neut~H^θ^",
        text: "The enthalpy change that occurs when ==ONE MOLE of water== is formed in a reaction between an acid and an alkali under standard conditions.",
      },
      {
        k: "eq",
        eq: "H^+^(aq) + OH^−^(aq) → H~2~O(l)    Δ~neut~H^θ^ = −57.9 kJ mol^−1^",
        note: "A value of ==−57 kJ mol^−1^== is obtained when ==strong acids react with strong alkalis==. This is because strong acids and alkalis are ==fully ionized==, so the reaction is the same in every case.",
      },
      { k: "h", text: "4 · Formation, Δ~f~H^θ^" },
      {
        k: "def",
        term: "Standard enthalpy change of formation, Δ~f~H^θ^",
        text: "The enthalpy change that occurs when ==ONE MOLE== of a substance is ==formed from its elements in their standard states== under standard conditions.",
      },
      {
        k: "eq",
        eq: "2C(s, graphite) + ½O~2~(g) + 3H~2~(g) → C~2~H~5~OH(l)",
        note: "Standard enthalpy of formation for ethanol.",
      },
      {
        k: "bullets",
        items: [
          "Elements in their standard states have ==zero enthalpy of formation==: Δ~f~H^θ^ of H~2~(g) = 0, Δ~f~H^θ^ of O~2~(g) = 0.",
          "Carbon is usually taken as the ==graphite== allotrope.",
        ],
      },
      { k: "h", text: "5 · Atomisation, Δ~at~H^θ^" },
      {
        k: "def",
        term: "Standard enthalpy change of atomisation, Δ~at~H^θ^",
        text: "The enthalpy change that occurs when ==one mole of gaseous atoms== is formed from the ==element in its standard state== under standard conditions.",
      },
      {
        k: "eq",
        eq: "Na(s) → Na(g)    ½Cl~2~(g) → Cl(g)",
        note: "It is ==always endothermic== as ==energy is required to break bonds==.",
      },
      {
        k: "bullets",
        items: [
          "For diatomic molecules, ==bond enthalpy is twice the enthalpy of atomization==.",
          "Enthalpy of atomization: ½Cl~2~(g) → Cl(g), ΔH = +121 kJ mol^−1^ — bond enthalpy: Cl~2~(g) → 2Cl(g), ΔH = +242 kJ mol^−1^.",
        ],
      },
      { k: "h", text: "Thermochemical equations" },
      {
        k: "def",
        term: "Thermochemical equation",
        text: "A ==chemical equation that includes the value of ΔH==.",
      },
      {
        k: "p",
        text: "Burning one mole of carbon releases 393 kJ of heat energy. This could be written as C(s) + O~2~(g) → CO~2~(g) + 393 kJ mol^−1^ — however, the **correct way** of writing a thermochemical equation is:",
      },
      {
        k: "eq",
        eq: "C(s) + O~2~(g) → CO~2~(g)    ΔH = −393 kJ mol^−1^",
        note: "When 1 mole of carbon reacts with 1 mole of oxygen, 1 mole of carbon dioxide is formed, releasing 393 kJ of energy under standard conditions.",
      },
      {
        k: "bullets",
        items: [
          "In writing thermochemical equations, it is essential that ==state symbols are shown==, since a ==change of physical state is accompanied by an enthalpy change==.",
          "When you ==multiply== a thermochemical equation, ==ΔH is also multiplied==: burning one mole of wax releases 20,000 kJ, so 2C~40~H~82~ + 121O~2~ → 80CO~2~ + 82H~2~O carries ΔH = −40,000 kJ.",
          "When a thermochemical equation is ==reversed==, the ==sign of ΔH changes== (law of conservation of energy).",
        ],
      },
      {
        k: "worked",
        title: "Worked example · Exercise 2, Question 1 — write the thermochemical equation",
        question:
          "a. C(s) + 2H~2~(g) → CH~4~(g) + 74.8 kJ · b. (i) H~2~ and I~2~ react to form 2HI. This reaction requires 53.2 kJ · (ii) The reaction that forms one mole of HI.",
        steps: [
          "**a.** The heat sits on the ==right-hand side== — it is given out → exothermic, so ΔH is negative: C(s) + 2H~2~(g) → CH~4~(g), ==ΔH = −74.8 kJ mol^−1^==.",
          "**b. (i)** The reaction ==requires== energy → endothermic, so ΔH is positive: H~2~ + I~2~ → 2HI, ==ΔH = +53.2 kJ mol^−1^==.",
          "**(ii)** One mole of HI is ==half== the equation as written — ==when you multiply a thermochemical equation, ΔH is multiplied== (here, halved): ½H~2~ + ½I~2~ → HI, ==ΔH = +26.6 kJ mol^−1^==.",
        ],
        answer:
          "**a.** C(s) + 2H~2~(g) → CH~4~(g)  ΔH = −74.8 kJ mol^−1^ · **b. (i)** H~2~ + I~2~ → 2HI  ΔH = +53.2 kJ mol^−1^ · **(ii)** ½H~2~ + ½I~2~ → HI  ΔH = +26.6 kJ mol^−1^.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 3 — construct the combustion equations",
        question:
          "Construct equations representing the standard enthalpy of combustion of a. hydrogen · b. carbon · c. methane · d. methanol.",
        steps: [
          "The recipe: ==ONE MOLE== of the substance, ==completely burnt in excess oxygen==, everything in its ==standard state== — then balance the oxygen, carbon dioxide and water.",
          "**a. Hydrogen** — one mole of H~2~ burns to water: H~2~(g) + ½O~2~(g) → H~2~O(l).",
          "**b. Carbon** — carbon as graphite: C(s, graphite) + O~2~(g) → CO~2~(g).",
          "**c. Methane** — CH~4~(g) + 2O~2~(g) → CO~2~(g) + 2H~2~O(l).",
          "**d. Methanol** — CH~3~OH(l) + 1½O~2~(g) → CO~2~(g) + 2H~2~O(l).",
        ],
        answer:
          "a. H~2~(g) + ½O~2~(g) → H~2~O(l) · b. C(s, graphite) + O~2~(g) → CO~2~(g) · c. CH~4~(g) + 2O~2~(g) → CO~2~(g) + 2H~2~O(l) · d. CH~3~OH(l) + 1½O~2~(g) → CO~2~(g) + 2H~2~O(l) — each burns ==exactly one mole== of the substance.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 7 — construct the formation equations",
        question:
          "Construct equations representing the standard enthalpy of formation of methane · water · propanol.",
        steps: [
          "The recipe: ==ONE MOLE== of the substance formed ==from its elements in their standard states== — carbon as ==graphite==, hydrogen and oxygen as H~2~(g) and O~2~(g).",
          "**Methane** — C(s, graphite) + 2H~2~(g) → CH~4~(g).",
          "**Water** — H~2~(g) + ½O~2~(g) → H~2~O(l).",
          "**Propanol** — three carbons, eight hydrogens, one oxygen: 3C(s, graphite) + 4H~2~(g) + ½O~2~(g) → C~3~H~7~OH(l).",
        ],
        answer:
          "C(s, graphite) + 2H~2~(g) → CH~4~(g) · H~2~(g) + ½O~2~(g) → H~2~O(l) · 3C(s, graphite) + 4H~2~(g) + ½O~2~(g) → C~3~H~7~OH(l) — ==one mole== of product each time, ==elements only== on the left.",
      },
      {
        k: "wow",
        text: "Five definitions, five Δs: Δ~r~H^θ^, Δ~f~H^θ~, Δ~c~H^θ~, Δ~neut~H^θ^ and Δ~at~H^θ^. Every one is measured under ==standard conditions== and every one is ==per mole== — one mole of equation, one mole of substance formed, one mole completely burnt, one mole of water formed, one mole of gaseous atoms. Quote the definition word for word and the marks follow.",
      },
    ],
  },
  {
    spec: "6.5",
    statement:
      "be able to use experimental data to calculate: i energy transferred in a reaction recalling and using the expression: energy transferred (J) = mass (g) × specific heat capacity (J g−1 °C−1) × temperature change (°C) ii enthalpy change of the reaction in kJ mol−1. This will be limited to experiments where substances are mixed in an insulated container and combustion experiments using a suitable calorimeter.",
    title: "Measuring enthalpy changes",
    blocks: [
      {
        k: "p",
        text: "The enthalpy change of reactions can be measured using a ==calorimeter==. A calorimeter is an ==insulated reaction vessel== which ==minimizes heat exchange== to the air and the surroundings. The simplest calorimeter is a ==polystyrene cup== but there are quite complex calorimeters.",
      },
      {
        k: "eq",
        eq: "Q = m × c × ΔT",
        note: "Q = heat energy in J · m = mass of the substance to which energy is transferred, in g · c = specific heat capacity in J g^−1^ °C^−1^ [water is 4.18 J g^−1^ °C^−1^] · ΔT = change in temperature. The specification writes the same expression as: energy transferred (J) = mass (g) × specific heat capacity (J g^−1^ °C^−1^) × temperature change (°C).",
      },
      {
        k: "figure",
        kind: "calorimetry",
        caption: "The two calorimetries of the class note: a ==spirit burner== below a ==beaker== of water for combustion, and substances ==mixed== in an insulated ==polystyrene cup== — stirring with the thermometer.",
      },
      { k: "h", text: "Experiment 1 · enthalpy change of combustion of a liquid" },
      {
        k: "steps",
        caption: "Experimental determination of enthalpy change of combustion of a liquid",
        items: [
          { title: "Step 1", text: "Weigh a ==spirit burner== containing the fuel." },
          { title: "Step 2", text: "Place the spirit burner below a ==beaker (or calorimeter)== containing a ==known mass (volume) of water==." },
          { title: "Step 3", text: "Measure the temperature of water." },
          { title: "Step 4", text: "Light the burner." },
          { title: "Step 5", text: "Stir the water at regular intervals." },
          { title: "Step 6", text: "When the temperature of water has reached approximately ==20 °C above its initial temperature==, put out the flame." },
          { title: "Step 7", text: "Reweigh the burner." },
        ],
      },
      {
        k: "table",
        caption: "Results",
        head: ["Measurement", "Value"],
        rows: [
          ["Initial mass of spirit burner + lamp", "52.76 g"],
          ["Volume of water", "100 cm^3^"],
          ["Initial temperature of water", "23.0 °C"],
          ["Final temperature of water", "47.6 °C"],
          ["Final mass of spirit lamp + ethanol", "52.37 g"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · calculating enthalpy change of combustion",
        question:
          "From the results above, calculate the enthalpy change of combustion of ethanol, Δ~c~H^θ^, in kJ mol^−1^. The specific heat capacity of water is 4.18 J g^−1^ °C^−1^.",
        steps: [
          "**Step 1 — the energy taken in by the water.** Q = mcΔT = 100 × 4.18 × (47.6 − 23.0) = 10,282 J ÷ 1000 = ==10.28 kJ==.",
          "**Step 2 — the moles of ethanol burnt.** Mass of ethanol = 52.76 − 52.37 = ==0.39 g==; number of moles = mass/molar mass = 0.39 ÷ 46 = ==0.00847 mol==.",
          "**Step 3 — the heat produced per mol.** Heat produced per mol = energy ÷ no of moles = 10.28 ÷ 0.00847 = ==1213.7 kJ mol^−1^==.",
        ],
        answer:
          "Δ~c~H^θ^ of ethanol = ==−1213.7 kJ mol^−1^== — [negative sign because it is exothermic].",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 4 — the methanol experiment",
        question:
          "150 cm^3^ of water was heated by burning methanol in a spirit burner. The mass of spirit burner and methanol ==before== burning was 186.87 g and ==after== burning 185.27 g; the water ran from 21.5 °C to a maximum of 72.0 °C. Density of water = 1.0 g cm^−3^, specific heat capacity of water = 4.18 J g^−1^ °C^−1^. (a) Complete the table to show the mass of methanol burned and the temperature change. (b) Calculate the energy transferred, in joules. (c) Calculate the number of moles of methanol, CH~3~OH, burned. (d) Calculate the enthalpy change of combustion, Δ~c~H, in kJ mol^−1^, to the nearest whole number and with a sign.",
        steps: [
          "**(a)** Mass of methanol burned = 186.87 − 185.27 = ==1.60 g==; temperature change = 72.0 − 21.5 = ==50.5 °C==.",
          "**(b)** Mass of water = 150 cm^3^ × 1.0 g cm^−3^ = 150 g. Energy transferred = 150 × 4.18 × 50.5 = ==31,663.5 J==.",
          "**(c)** Molar mass of CH~3~OH = 32 g mol^−1^ → moles = 1.60 ÷ 32 = ==0.05 mol==.",
          "**(d)** Δ~c~H = −31.6635 kJ ÷ 0.05 mol = −633.27 → ==−633 kJ mol^−1^== (exothermic, so negative).",
        ],
        answer:
          "(a) 1.60 g and 50.5 °C · (b) 31,663.5 J · (c) 0.05 mol · (d) Δ~c~H = ==−633 kJ mol^−1^==.",
      },
      { k: "checkpoint", page: 155 },
      { k: "h", text: "Experiment 2 · enthalpy change of neutralisation" },
      {
        k: "steps",
        caption: "Experimental determination of enthalpy change of neutralisation",
        items: [
          { title: "Step 1", text: "Wear ==safety glasses== and lab coat." },
          { title: "Step 2", text: "Using a ==pipette fitted with a safety filler==, place ==25.0 cm^3^ of 1.00 mol dm^−3^ acid== into an ==expanded polystyrene cup==." },
          { title: "Step 3", text: "Measure the temperature of the acid." },
          { title: "Step 4", text: "Place 25.0 cm^3^ of the ==alkali== (dilute sodium hydroxide of concentration ==slightly greater than 1 mol dm^−3^== – to ensure ==all acid has neutralized==) into a beaker." },
          { title: "Step 5", text: "Measure the temperature of the alkali." },
          { title: "Step 6", text: "Add the alkali to the acid, ==stir with the thermometer== and measure the ==maximum temperature reached==." },
        ],
      },
      {
        k: "table",
        caption: "Results",
        head: ["Measurement", "Value"],
        rows: [
          ["Volume of 1.00 mol dm^−3^ acid", "25.0 cm^3^"],
          ["Volume of 1.20 mol dm^−3^ alkali", "25.0 cm^3^"],
          ["Initial temperature of acid", "18.6 °C"],
          ["Initial temperature of alkali", "18.8 °C"],
          ["Maximum temperature reached", "25.4 °C (298.5 K)"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · calculating enthalpy change of neutralisation",
        question:
          "From the results above, calculate Δ~neut~H^θ^. Assume the density of the solution is 1 g cm^−3^ and its specific heat capacity is 4.18 J g^−1^ K^−1^.",
        steps: [
          "Mean starting temperature = (18.6 + 18.8) ÷ 2 = ==18.7 °C (291.7 K)==; temperature change = (298.5 − 291.7) = ==+6.7 K==.",
          "Total volume of solution heated = (25 + 25) = ==50 cm^3^==; mass of solution heated = ==50.0 g== (assuming that density of solution is 1 g cm^−3^).",
          "Q = mcΔT = 50 × 4.18 × 6.7 = 1400.3 J ÷ 1000 = ==1.4003 kJ==.",
          "Amount of acid neutralized = amount of water formed = (1 × 25) ÷ 1000 = ==0.025 mol==.",
          "Δ~neut~H^θ^ = −1.4003 ÷ 0.025 = ==−56 kJ mol^−1^==.",
        ],
        answer:
          "Δ~neut~H^θ^ = ==−56 kJ mol^−1^== — one mole of water formed per mole of acid neutralized.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 5 — three more calorimetry calculations",
        question:
          "1. 50 cm^3^ of 1 M HCl + 50 cm^3^ of 2 M NaOH (in excess), maximum temperature rise 6.75 °C — find the enthalpy of neutralization. 2. 25.0 cm^3^ of 1.0 M HCl mixed with 25.0 cm^3^ of 1.0 M NaOH, both at 22.5 °C; final temperature 29.2 °C; c = 4.2 J g^−1^ K^−1^, densities 1.00 g cm^−3^ — find the enthalpy change per mole of HCl. 3. 3.71 g of NaHCO~3~ added to 30 cm^3^ of 1 M HCl (an excess) in a polystyrene cup; the temperature fell by 8.5 °C — find the enthalpy of reaction.",
        steps: [
          "**1.** Q = 100 × 4.18 × 6.75 = 2821.5 J. Moles of HCl = 0.05 mol. Δ~neut~H = −2821.5 ÷ 1000 ÷ 0.05 = ==−56.4 kJ mol^−1^== — close to the ==−57 kJ mol^−1^== strong acid + strong alkali value.",
          "**2.** Q = 50 × 4.2 × (29.2 − 22.5) = 1407 J. Moles of HCl = 0.025 mol. ΔH = −1407 ÷ 1000 ÷ 0.025 = ==−56.3 kJ mol^−1^== per mole of HCl.",
          "**3.** Q = 30 × 4.18 × 8.5 = 1065.9 J. Moles of NaHCO~3~ = 3.71 ÷ 84 = 0.0442 mol. The temperature ==fell==, so the mixture took heat in → ΔH = +1065.9 ÷ 1000 ÷ 0.0442 = ==+24.1 kJ mol^−1^==.",
        ],
        answer:
          "1. −56.4 kJ mol^−1^ · 2. −56.3 kJ mol^−1^ · 3. +24.1 kJ mol^−1^ — a ==temperature fall== means the sign is ==positive==: the reaction is endothermic.",
      },
    ],
  },
];
