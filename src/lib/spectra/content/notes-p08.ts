import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Unit 3 revision note · Practical 8 — Molar volume, crucible and
   calorimetry, Core Practicals 1 & 2 (sections P8.1–P8.6)
   Text kept verbatim from the CHSE Unit 3 core practical reference
   notes (2020) — "Core Practical 1: Measure the molar volume of a
   gas", "Heating in a crucible", "CORE PRACTICAL 2" and the
   combustion calorimetry pages, with each of the sheet's five
   worked examples carried in full; page furniture omitted.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_P08: SpecSection[] = [
  {
    spec: "P8.1",
    statement:
      "measure the molar volume of a gas by reacting calcium carbonate with ethanoic acid and collecting the carbon dioxide",
    title: "Core Practical 1 — the molar volume of a gas",
    blocks: [
      {
        k: "steps",
        caption: "Detailed method",
        items: [
          {
            title: "Measure the acid",
            text: "Measure 30 cm^3^ of 1 mol dm^−3^ ==ethanoic acid== and transfer to a conical flask.",
          },
          {
            title: "Attach the syringe",
            text: "Attach the conical flask to a gas syringe, or use the collection over water method.",
          },
          {
            title: "Weigh the carbonate",
            text: "Measure the mass of a weighing bottle with approximately 0.05 g of ==calcium carbonate==.",
          },
          {
            title: "Add and seal fast",
            text: "Add the calcium carbonate to the conical flask, ==quickly resealing the bung== so no gas escapes.",
          },
          {
            title: "Read the volume",
            text: "Measure the final total volume of gas.",
          },
          {
            title: "Reweigh",
            text: "Reweigh the empty weighing bottle from step 3.",
          },
          {
            title: "Repeat",
            text: "Repeat the experiment several more times, ==increasing the mass of calcium carbonate by about 0.05 g== each time.",
          },
        ],
      },
      {
        k: "p",
        text: "Plot a graph of ==volume of CO~2~ in cm^3^== (y-axis) against ==mass of CaCO~3~ in g== (x-axis). From the graph, read the volume of CO~2~ given off with ==0.25 g== CaCO~3~. Work out the moles of CaCO~3~ in 0.25 g, assume the moles of CO~2~ ==equal the moles of CaCO~3~==, and the molar volume of CO~2~ is the volume divided by the moles.",
      },
      {
        k: "eq",
        eq: "moles of CaCO~3~ = 0.25 ÷ 100.1 = 2.5 × 10^−3^ mol",
      },
      {
        k: "eq",
        eq: "molar volume of CO~2~ = volume of CO~2~ ÷ moles of CO~2~",
      },
      {
        k: "h",
        text: "Extension — the M~r~ of propanone with a gas syringe",
      },
      {
        k: "bullets",
        items: [
          "Extract 0.20 cm^3^ of propanone into a hypodermic syringe and measure the ==mass of this syringe==.",
          "Using hand protection, remove a gas syringe from the oven and note the volume of air already in the barrel — about 5 cm^3^.",
          "Inject the propanone through the ==self-seal cap== into the barrel; the plunger will move straight away.",
          "Put the gas syringe back into the oven.",
          "Measure the mass of the ==empty hypodermic syringe immediately== (the difference is the mass of propanone).",
          "After a few minutes, measure the volume of gas in the gas syringe, and record the ==temperature of the oven shelf and the pressure of the room==.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · Example 1 — the M~r~ of a volatile liquid",
        question:
          "0.150 g of a volatile liquid was injected into a sealed gas syringe. The gas syringe was placed in an oven at 70 °C at a pressure of 100 kPa and a volume of 80 cm^3^ was measured. Calculate the M~r~ of the volatile liquid (R = 8.31).",
        steps: [
          "Convert: 100 kPa = 100 000 Pa; 80 cm^3^ = 0.00008 m^3^; 70 °C = 343 K.",
          "moles = PV/RT = (100 000 × 0.00008) ÷ (8.31 × 343).",
          "= 8 ÷ 2850.33 = ==0.00281 mol==.",
          "M~r~ = mass ÷ moles = 0.15 ÷ 0.00281.",
        ],
        answer: "==53.4 g mol^−1^==",
      },
    ],
  },
  {
    spec: "P8.2",
    statement:
      "heat a hydrated salt in a crucible to constant mass, and use the mass loss to find x in the formula",
    title: "Heating in a crucible",
    blocks: [
      {
        k: "p",
        text: "This method could be used for measuring ==mass loss== in various thermal decomposition reactions, and also ==mass gain== when reacting magnesium in oxygen. The water of crystallisation in calcium sulfate crystals can be removed as water vapour by heating:",
      },
      { k: "eq", eq: "CaSO~4~·xH~2~O(s) → CaSO~4~(s) + xH~2~O(g)" },
      {
        k: "steps",
        caption: "Method",
        items: [
          {
            title: "Weigh the empty crucible",
            text: "Weigh an ==empty clean dry== crucible and lid.",
          },
          {
            title: "Add the solid",
            text: "Add 2 g of hydrated calcium sulfate to the crucible and weigh again.",
          },
          {
            title: "Heat strongly",
            text: "Heat strongly with a Bunsen for a couple of minutes.",
          },
          {
            title: "Cool and weigh",
            text: "Allow to cool, then weigh the crucible and contents again.",
          },
          {
            title: "To constant mass",
            text: "Heat the crucible again and reweigh until you reach a ==constant mass== — this ensures the reaction is complete.",
          },
        ],
      },
      {
        k: "bullets",
        items: [
          "The crucible needs to be ==dry== — a wet crucible would give an inaccurate result: it would cause the mass loss to be ==too large==, as the water would be lost when heating.",
          "The ==lid== improves the accuracy as it prevents loss of solid from the crucible, but should be ==loose fitting== to allow gas to escape.",
          "Large amounts of hydrated calcium sulfate, such as 50 g, should ==not== be used — the decomposition is likely to be ==incomplete==.",
          "Small amounts, such as 0.100 g, should ==not== be used — the ==percentage uncertainties in weighing== would be too high.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · Example 2 — finding x in ZnSO~4~·xH~2~O",
        question:
          "3.51 g of hydrated zinc sulfate were heated and 1.97 g of anhydrous zinc sulfate were obtained. Use these data to calculate the value of the integer x in ZnSO~4~·xH~2~O.",
        steps: [
          "Mass of H~2~O lost = 3.51 − 1.97 = ==1.54 g==.",
          "Moles of ZnSO~4~ = 1.97 ÷ 161.5 = ==0.0122 mol==.",
          "Moles of H~2~O = 1.54 ÷ 18 = ==0.085 mol==.",
          "Ratio of moles of ZnSO~4~ to H~2~O = 0.085 ÷ 0.0122 ≈ 7.",
        ],
        answer: "==x = 7== — the crystals are ZnSO~4~·7H~2~O.",
      },
    ],
  },
  {
    spec: "P8.3",
    statement:
      "measure the enthalpy change of a reaction in solution with the calorimetric method — insulated cup, temperature–time graph, extrapolation",
    title: "Core Practical 2 — the calorimetric method",
    blocks: [
      {
        k: "def",
        term: "The energy equation",
        text: "energy change = mass of solution × heat capacity × temperature change: ==q (J) = m (g) × c~p~ (J g^−1^ K^−1^) × ΔT (K)==. This equation only gives the energy for the ==actual quantities used== — normally the value is converted into the energy change ==per mole== of one of the reactants: the enthalpy change of reaction, ΔH.",
      },
      {
        k: "p",
        text: "One type of experiment is one in which substances are ==mixed in an insulated container== and the temperature rise measured. This could be a solid dissolving or reacting in a solution, or two solutions reacting together.",
      },
      {
        k: "steps",
        caption: "General method",
        items: [
          {
            title: "Wash and dry",
            text: "Wash the equipment (cup and pipettes etc.) with the solutions to be used, and dry the cup after washing.",
          },
          {
            title: "Insulate",
            text: "Put the ==polystyrene cup in a beaker== for insulation and support.",
          },
          {
            title: "Measure the solutions",
            text: "Measure out desired volumes with ==volumetric pipettes== and transfer to the insulated cup.",
          },
          {
            title: "Clamp the thermometer",
            text: "Make sure the thermometer bulb is ==immersed in the solution==.",
          },
          {
            title: "Take the starting temperatures",
            text: "Measure the initial temperatures of the solution — or both solutions if two are used — ==every minute for 2–3 minutes==.",
          },
          {
            title: "Mix",
            text: "At minute 3 transfer the second reagent to the cup. If a solid reagent is used, add the solution to the cup first and then add the solid, ==weighed out on a balance== by the “before and after” method.",
          },
          {
            title: "Stir and record",
            text: "Stir the mixture — so all of the solution is at the same temperature — and record the temperature ==every minute after addition for several minutes==.",
          },
        ],
      },
      {
        k: "note",
        label: "When the reaction is slow",
        text: "If the reaction is slow, the exact temperature rise can be difficult to obtain, as ==cooling occurs simultaneously== with the reaction. To counteract this, take readings at regular time intervals and ==extrapolate the temperature curve/line back== to the time the reactants were added together. Taking the temperature of the reactants for a few minutes before they are added gives a better average — if the two reactants are solutions, ==measure the temperature of both and average== them.",
      },
      {
        k: "bullets",
        items: [
          "Errors in this method: ==energy transfer from surroundings== (usually loss).",
          "Approximation in the specific heat capacity of solution — the method assumes ==all solutions have the heat capacity of water==.",
          "Neglecting the specific heat capacity of the calorimeter — energy absorbed by the apparatus is ignored.",
          "The reaction or dissolving may be ==incomplete or slow==.",
          "The density of solution is taken to be the ==same as water==.",
        ],
      },
      {
        k: "figure",
        kind: "calorimetry",
        caption:
          "The two calorimetries: the flame heats water for combustion, the polystyrene cup holds the mixing experiment — both read q = mcΔT.",
      },
      {
        k: "figure",
        kind: "cooling-curve",
        caption:
          "The cooling correction: both best-fit lines extrapolated back to the moment of mixing recover the temperature rise the cooling stole.",
      },
    ],
  },
  {
    spec: "P8.4",
    statement:
      "calculate the enthalpy change of reaction from experimental data — q, then moles of the reactant not in excess, then the sign and unit",
    title: "Calculating ΔH~r~ from the data",
    blocks: [
      {
        k: "steps",
        caption: "General method",
        items: [
          {
            title: "Energy change",
            text: "Using q = m × c~p~ × ΔT, calculate the energy change for the quantities used.",
          },
          {
            title: "Moles",
            text: "Work out the moles of the reactants used.",
          },
          {
            title: "Divide by the limiting reactant",
            text: "Divide q by the number of moles of the reactant ==not in excess== to give ΔH.",
          },
          {
            title: "Sign and unit",
            text: "Add a sign and unit — divide by a thousand to convert J mol^−1^ to kJ mol^−1^. If the temperature increased, the reaction is ==exothermic== and is given a ==minus sign==. Remember: ==sign, unit==.",
          },
        ],
      },
      {
        k: "note",
        label: "The constants the method assumes",
        text: "The heat capacity of water is ==4.18 J g^−1^ K^−1^==. In any reaction where the reactants are dissolved in water we assume the heat capacity is the same as pure water, and that the solutions have the ==density of water==, 1 g cm^−3^ — so 25 cm^3^ will weigh 25 g. If you are not told what is in excess, work out the moles of ==both== reactants and use the balanced equation to decide.",
      },
      {
        k: "worked",
        title: "Worked example · Example 3 — copper sulfate and excess zinc",
        question:
          "Calculate the enthalpy change of reaction for the reaction where 25.0 cm^3^ of 0.20 M copper sulfate was reacted with 0.01 mol (excess) of zinc. The temperature increased 7.0 °C.",
        steps: [
          "Q = m × c~p~ × ΔT. The mass is the mass of the ==copper sulfate solution only== — do not include the zinc powder: Q = 25 × 4.18 × 7.0 = ==731.5 J==.",
          "Moles of CuSO~4~ = concentration × volume = 0.2 × 25/1000 = ==0.005 mol== (the reactant not in excess).",
          "ΔH = Q ÷ moles = 731.5 ÷ 0.005 = ==146 300 J mol^−1^== = 146 kJ mol^−1^ to 3 s.f.",
          "The temperature rose, so the reaction is exothermic: add the minus sign.",
        ],
        answer: "==−146 kJ mol^−1^==",
      },
      {
        k: "worked",
        title: "Worked example · Example 4 — a neutralisation",
        question:
          "25.0 cm^3^ of 2.0 mol dm^−3^ HCl was neutralised by 25.0 cm^3^ of 2.0 mol dm^−3^ NaOH. The temperature increased 13.5 °C. Calculate the enthalpy change per mole of HCl.",
        steps: [
          "Q = m × c~p~ × ΔT. The mass equals the mass of acid ==plus== the mass of alkali, as they are both solutions: Q = 50 × 4.18 × 13.5 = ==2821.5 J==.",
          "Moles of HCl = concentration × volume = 2 × 25/1000 = ==0.05 mol==.",
          "ΔH = Q ÷ moles = 2821.5 ÷ 0.05 = ==56 430 J mol^−1^== — the enthalpy change of neutralisation.",
          "Exothermic, so the sign is minus.",
        ],
        answer: "==−56.4 kJ mol^−1^== (to 3 s.f.)",
      },
    ],
  },
  {
    spec: "P8.5",
    statement:
      "build the Hess's law cycle for anhydrous copper(II) sulfate hydrating to its pentahydrate, and measure both ΔH solutions to find the enthalpy change that cannot be measured directly",
    title: "The Hess cycle — anhydrous to hydrated copper sulfate",
    blocks: [
      {
        k: "p",
        text: "Often ==Hess's law cycles== are used to measure the enthalpy change for a reaction that ==cannot be measured directly== by experiments. Instead, alternative reactions are carried out that can be measured experimentally. This is used to work out the enthalpy change to form a ==hydrated salt from an anhydrous salt==: it cannot be done experimentally because it is impossible to add the ==exact amount of water== without the solid dissolving, and it is not easy to measure the temperature change of a solid. Instead both salts are dissolved in ==excess water== to form a solution of copper sulfate — and the temperature changes of these two reactions can be measured.",
      },
      {
        k: "eq",
        eq: "ΔH(reaction) + 11 kJ mol^−1^ = −66.1 kJ mol^−1^",
        note: "CuSO~4~(s) + 5H~2~O(l) → CuSO~4~·5H~2~O(s) is the direct route (ΔH reaction); both salts dissolving in water pass through CuSO~4~(aq) — ΔH of solution +11 kJ mol^−1^ for the anhydrous salt, −66.1 kJ mol^−1^ for the pentahydrate.",
      },
      {
        k: "worked",
        title: "Worked example · around the cycle",
        question:
          "Dissolving anhydrous CuSO~4~ in water gives ΔH of solution = +11 kJ mol^−1^; dissolving CuSO~4~·5H~2~O gives −66.1 kJ mol^−1^. Find the enthalpy change of CuSO~4~(s) + 5H~2~O(l) → CuSO~4~·5H~2~O(s).",
        steps: [
          "The cycle: ΔH(reaction) takes the solid straight to the pentahydrate; the solution route goes via CuSO~4~(aq).",
          "Hess's law: ΔH(reaction) + 11 = −66.1.",
          "ΔH(reaction) = −66.1 − 11.",
        ],
        answer: "==−77.1 kJ mol^−1^==",
      },
      {
        k: "h",
        text: "Detailed method — ΔH of solution of anhydrous copper(II) sulfate",
      },
      {
        k: "steps",
        caption: "Method",
        items: [
          {
            title: "Weigh",
            text: "Weigh out between 3.90 g and 4.10 g of ==anhydrous== copper(II) sulfate in a ==dry weighing bottle==; record the precise mass.",
          },
          {
            title: "Start the temperature clock",
            text: "Using a volumetric pipette, place 25 cm^3^ of deionised water into a polystyrene cup; record its temperature at the beginning (t = 0), start the timer, then record the temperature ==every minute==, stirring continuously.",
          },
          {
            title: "Add at minute four",
            text: "At the fourth minute, add the powdered anhydrous copper(II) sulfate ==rapidly== to the water and continue to stir — but ==do not record the temperature==.",
          },
          {
            title: "Reweigh the bottle",
            text: "Reweigh the empty weighing bottle (the difference is the exact mass added).",
          },
          {
            title: "Record the cooling",
            text: "At the fifth minute, and every minute up to ==15 minutes==, stir and record the temperature of the solution.",
          },
          {
            title: "Graph and extrapolate",
            text: "Plot temperature against time. Draw ==two separate best-fit lines== — one joining the points before addition, one joining the points after — and ==extrapolate both lines to the fourth minute==.",
          },
          {
            title: "Read ΔT",
            text: "Use the graph to determine the temperature change at the fourth minute — the rise that theoretically occurred ==immediately on addition== of the solid.",
          },
          {
            title: "Calculate",
            text: "Using q = m × c~p~ × ΔT, calculate the energy change, then divide by the ==number of moles of anhydrous copper(II) sulfate== in the mass added to get ΔH of solution.",
          },
        ],
      },
      {
        k: "note",
        label: "The reference sheet's arithmetic",
        text: "The reference sheet prints this line as ==q = 20 × 4.18 × ΔT==, even though step 2 measured ==25 cm^3^ of water== — on the exam, use the mass of solution the question actually gives you.",
      },
      {
        k: "p",
        text: "The method is then ==repeated using hydrated copper sulfate==. The two ΔH of solution values are used to calculate the ΔH for the enthalpy change of forming a hydrated salt, as in the cycle above.",
      },
    ],
  },
  {
    spec: "P8.6",
    statement:
      "measure an enthalpy change of combustion with flame calorimetry, and list the errors that make the value less exothermic than the data book",
    title: "Flame calorimetry — enthalpies of combustion",
    blocks: [
      {
        k: "p",
        text: "Enthalpies of combustion can be calculated using ==calorimetry==. Generally the fuel is burnt and the flame is used to heat up water in a ==metal cup==.",
      },
      {
        k: "bullets",
        items: [
          "Need to measure: the ==mass of the spirit burner before and after==.",
          "The ==temperature change== of the water.",
          "The ==volume of water== in the cup.",
        ],
      },
      {
        k: "bullets",
        items: [
          "Errors in this method: ==energy losses from the calorimeter==.",
          "==Incomplete combustion== of the fuel.",
          "Incomplete ==transfer of energy==.",
          "==Evaporation of fuel== after weighing.",
          "The ==heat capacity of the calorimeter== is not included.",
          "Measurements are not carried out under ==standard conditions== — H~2~O is a gas, not a liquid, in this experiment.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · Example 5 — combustion of propan-1-ol",
        question:
          "Calculate the enthalpy change of combustion where 0.65 g of propan-1-ol was completely combusted and used to heat up 150 g of water from 20.1 to 45.5 °C.",
        steps: [
          "Q = m × c~p~ × ΔT. The mass in this equation is the ==mass of water in the calorimeter, not the alcohol==: ΔT = 45.5 − 20.1 = 25.4 °C, so Q = 150 × 4.18 × 25.4 = ==15 925.8 J==.",
          "Moles of propan-1-ol = mass ÷ M~r~ = 0.65 ÷ 60 = ==0.01083 mol==.",
          "ΔH = Q ÷ moles = 15 925.8 ÷ 0.01083 = ==1 470 073 J mol^−1^== = 1470 kJ mol^−1^ to 3 s.f.",
          "The temperature rose, so the combustion is exothermic: add the minus sign.",
        ],
        answer: "==−1470 kJ mol^−1^==",
      },
    ],
  },
];
