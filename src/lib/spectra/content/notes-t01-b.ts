import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 1 revision note · Part B — spec 1.2, 1.4–1.10
   Text kept verbatim from the CHSE Grade 11 / Unit 1.3 / Topic 1
   class note (2020, semester 1) — Formulae, Equations and Amount
   of Substance; page furniture omitted. The class note prints the
   questions of its worked examples and leaves their solutions as
   worked spaces — every solution here is worked in full and
   arithmetic-checked.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T01_B: SpecSection[] = [
  {
    spec: "1.4",
    statement:
      "understand the terms: i ‘relative atomic mass’ based on the ^12^C scale ii ‘relative molecular mass’ and ‘relative formula mass’, including calculating these values from relative atomic masses — the term ‘relative formula mass’ should be used for compounds with giant structures iii ‘molar mass’ as the mass per mole of a substance in g mol^−1^ iv parts per million (ppm), including gases in the atmosphere",
    title: "Comparing masses of substances",
    blocks: [
      {
        k: "bullets",
        items: [
          "Measuring the mass of an atom or compound using a balance would be very difficult as they are very small.",
          "Hence, to measure the mass of an atom or a compound the **atomic mass unit (amu)** is used as a standard reference.",
          "The relative atomic mass ==does not have any units==. They are measured compared to amu.",
          "Atomic mass unit is the mass of a ==carbon-12 atom divided by 12==. This is used as the standard reference scale to measure mass of atoms and molecules.",
        ],
      },
      {
        k: "eq",
        eq: "A~r~ = (mean mass of an atom of an element) ÷ (1/12 × mass of an atom of ^12^C)",
      },
      {
        k: "def",
        term: "Relative molecular mass",
        text: "The relative molecular mass of a molecule or compound is the ==sum of the relative atomic masses== of all the atoms in the chemical formula.",
      },
      {
        k: "note",
        label: "Giant structures",
        text: "The term **relative formula mass** should be used for compounds with giant structures — ionic lattices and covalent networks have no molecules to weigh.",
      },
      {
        k: "def",
        term: "Relative isotopic mass",
        text: "The relative isotopic mass is the mass of an atom of that isotope divided by ==1/12th the mass of a carbon-12 atom==.",
      },
      {
        k: "note",
        label: "Also in this objective",
        text: "**Molar mass** is defined with the mole in section 1.2 below, and **parts per million** is worked in full in section 1.5.",
      },
    ],
  },
  {
    spec: "1.2",
    statement:
      "know that the mole (mol) is the unit for the amount of a substance and be able to perform calculations using the Avogadro constant L (6.02 × 10^23^ mol^−1^)",
    title: "The mole: amount of substance",
    blocks: [
      {
        k: "bullets",
        items: [
          "When chemists measure how much of a particular chemical reacts they measure the amount in grams or the volume of a gas. However, chemists find it convenient to use a unit called **mole**.",
          "The mole is the amount of substance which contains the ==same number of particles== (atoms, ions, molecules, formulae or electrons) as there are carbon atoms in **12 g of carbon-12**.",
          "The number of particles in a mole is known as **Avogadro's constant** which is equal to **6.02 × 10^23^ mol^−1^**.",
        ],
      },
      { k: "eq", eq: "1 mole = 6.02 × 10^23^ particles (it can be atoms, ions, molecules)" },
      {
        k: "bullets",
        items: [
          "6.02 × 10^23^ helium atoms in 4 g of He",
          "6.02 × 10^23^ carbon dioxide molecules in 44 g of CO~2~",
          "6.02 × 10^23^ nitrate ions in 62 g of NO~3~^−^",
        ],
      },
      {
        k: "worked",
        title: "Worked example · counting particles",
        question: "How many water molecules are there in 1.25 g of water?",
        steps: [
          "Moles of water = 1.25 ÷ 18 = **0.0694 mol**",
          "1 mol of water → 6.02 × 10^23^ molecules, so 0.0694 mol → x",
          "x = 0.0694 × 6.02 × 10^23^",
        ],
        answer: "x = **4.18 × 10^22^** water molecules",
      },
      {
        k: "def",
        term: "Molar mass",
        text: "The molar mass of a substance is the ==mass, in grams, of one mole==.",
      },
      {
        k: "p",
        text: "The **molar volume** of a gas is the volume occupied by one mole at room temperature and pressure. It is equal to ==24 dm^3^== at room temperature and pressure (r.t.p).",
      },
      {
        k: "eq",
        eq: "number of moles = mass in grams ÷ molar mass        number of moles of gas = volume of gas (dm^3^) ÷ molar volume (24 dm^3^)",
        note: "The molar-volume route is exercised in section 1.8.",
      },
    ],
  },
  {
    spec: "1.7",
    statement:
      "be able to use chemical equations to calculate reacting masses and vice versa, using the concepts of amount of substance and molar mass",
    title: "Calculations using reacting masses",
    blocks: [
      {
        k: "p",
        text: "Every reacting-mass question is the same three moves: convert the mass you know into moles, ride the equation's ==stoichiometry== across, and convert back with the molar mass of the species the question asks for.",
      },
      {
        k: "worked",
        title: "Worked example 1",
        question:
          "The equation for the reaction is SO~3~ + H~2~O → H~2~SO~4~. What mass of sulfur trioxide is needed to form 75 g of sulfuric acid?",
        steps: [
          "M(H~2~SO~4~) = 98 g mol^−1^, so n(H~2~SO~4~) = 75 ÷ 98 = **0.765 mol**",
          "The equation is 1 : 1, so n(SO~3~) = **0.765 mol**",
          "M(SO~3~) = 80 g mol^−1^, so m(SO~3~) = n × M = 0.765 × 80",
        ],
        answer: "**61.2 g** of sulfur trioxide",
      },
      {
        k: "worked",
        title: "Worked example 2",
        question:
          "The equation for the reaction is 2NH~3~ + H~2~SO~4~ → (NH~4~)~2~SO~4~. What mass of ammonia is needed to form 100 g of ammonium sulfate?",
        steps: [
          "M((NH~4~)~2~SO~4~) = 132 g mol^−1^, so n((NH~4~)~2~SO~4~) = 100 ÷ 132 = **0.758 mol**",
          "The equation needs 2 NH~3~ per (NH~4~)~2~SO~4~, so n(NH~3~) = 2 × 0.758 = **1.515 mol**",
          "M(NH~3~) = 17 g mol^−1^, so m(NH~3~) = 1.515 × 17",
        ],
        answer: "**25.8 g** of ammonia",
      },
      {
        k: "worked",
        title: "Worked example 3 · finding the equation from the data",
        question:
          "A 16.7 g of sodium carbonate (Na~2~CO~3~.10H~2~O) is heated at a constant temperature for a specified time until the reaction is complete. A mass of 3.15 g of water is obtained. What is the equation for the reaction occurring?",
        steps: [
          "M(Na~2~CO~3~.10H~2~O) = 286 g mol^−1^, so n(hydrate) = 16.7 ÷ 286 = **0.0584 mol**",
          "n(H~2~O) = 3.15 ÷ 18 = **0.175 mol**",
          "Waters driven off per formula unit = 0.175 ÷ 0.0584 = **3** — the balance says only three of the ten waters of crystallisation were lost in this heating",
          "Write the equation with the number the data gives: Na~2~CO~3~.10H~2~O → Na~2~CO~3~.7H~2~O + 3H~2~O",
        ],
        answer: "**Na~2~CO~3~.10H~2~O → Na~2~CO~3~.7H~2~O + 3H~2~O**",
      },
      {
        k: "worked",
        title: "Worked example 4 · finding the equation from the data",
        question:
          "An oxide of copper is heated in a stream of hydrogen to constant mass. The masses of copper and water formed are 17.6 g and 2.56 g respectively. Write the equation for the reaction.",
        steps: [
          "n(Cu) = 17.6 ÷ 63.5 = **0.277 mol**",
          "n(H~2~O) = 2.56 ÷ 18 = **0.142 mol**",
          "Ratio Cu : H~2~O = 0.277 : 0.142 ≈ **2 : 1** — two copper atoms per water, so the oxide is Cu~2~O",
          "Write the equation: Cu~2~O(s) + H~2~(g) → 2Cu(s) + H~2~O(l)",
        ],
        answer: "**Cu~2~O(s) + H~2~(g) → 2Cu(s) + H~2~O(l)**",
      },
    ],
  },
  {
    spec: "1.9",
    statement:
      "be able to calculate percentage yields and percentage atom economies (by mass) in laboratory and industrial processes, using chemical equations and experimental results",
    title: "Yield of a reaction",
    blocks: [
      { k: "h", text: "Percentage yield" },
      {
        k: "p",
        text: "The efficiency of a reaction can be measured by the ==percentage yield==. This gives the amount of product loss and how wasteful the process is.",
      },
      {
        k: "eq",
        eq: "Percentage yield = (actual (experimental) yield ÷ theoretical yield) × 100",
      },
      {
        k: "bullets",
        items: [
          "**Theoretical yield** — the mass of the product that should be formed. It can be calculated using the mass of reactants and balanced chemical equation.",
          "For any reaction the actual mass of product formed (actual yield) will always be ==less than== the theoretical yield.",
          "This is because: all the reactants do not undergo complete reaction; some product is lost during handling; solution loss during filtration or during transfer between containers.",
        ],
      },
      {
        k: "worked",
        title: "Worked example 1",
        question:
          "Copper(II) carbonate is decomposed to obtain copper(II) oxide. The equation for the reaction is CuCO~3~ → CuO + CO~2~. What is the theoretical yield of copper(II) oxide obtainable from 5.78 g of copper(II) carbonate?",
        steps: [
          "M(CuCO~3~) = 123.5 g mol^−1^, so n(CuCO~3~) = 5.78 ÷ 123.5 = **0.0468 mol**",
          "The equation is 1 : 1, so n(CuO) = **0.0468 mol**",
          "M(CuO) = 79.5 g mol^−1^, so m(CuO) = 0.0468 × 79.5",
        ],
        answer: "Theoretical yield = **3.72 g** of copper(II) oxide",
      },
      {
        k: "worked",
        title: "Worked example 2",
        question:
          "Magnesium phosphate can be prepared from magnesium by reacting it with phosphoric acid. The equation for the reaction: 3Mg + 2H~3~PO~4~ → Mg~3~(PO~4~)~2~ + 3H~2~. What is the theoretical yield of magnesium phosphate obtainable from 5.62 g of magnesium?",
        steps: [
          "M(Mg) = 24.3 g mol^−1^, so n(Mg) = 5.62 ÷ 24.3 = **0.231 mol**",
          "The equation gives 1 Mg~3~(PO~4~)~2~ per 3 Mg, so n(Mg~3~(PO~4~)~2~) = 0.231 ÷ 3 = **0.0771 mol**",
          "M(Mg~3~(PO~4~)~2~) = 262.9 g mol^−1^, so m = 0.0771 × 262.9",
        ],
        answer: "Theoretical yield = **20.3 g** of magnesium phosphate",
      },
      {
        k: "worked",
        title: "Worked example 3 · industrial scale",
        question:
          "A manufacturer uses this reaction to obtain methanol from carbon monoxide and hydrogen: CO + 2H~2~ → CH~3~OH. The manufacturer obtains 4.07 tonnes of methanol starting from 4.32 tonnes of carbon monoxide. What is the percentage yield?",
        steps: [
          "M(CO) = 28, M(CH~3~OH) = 32 — the tonnage converts to moles with the same numbers as grams",
          "n(CO) = 4.32 ÷ 28 = **0.1543**; the 1 : 1 equation gives n(CH~3~OH) = 0.1543",
          "Theoretical yield = 0.1543 × 32 = **4.94 tonnes**",
          "Percentage yield = 4.07 ÷ 4.94 × 100",
        ],
        answer: "Percentage yield = **82.4 %**",
      },
      { k: "h", text: "Atom economy" },
      {
        k: "p",
        text: "It is also a method used to measure the efficiency of a reaction. The ==atom economy== of a chemical reaction is a measure of the ==proportion of reactant atoms that become part of the desired products== rather than by-products. A reaction that has a very high yield could still be very wasteful if a lot of the atoms from the reactants end up in by-products.",
      },
      {
        k: "eq",
        eq: "% Atom economy = (molecular mass of the desired product ÷ sum of the molecular masses of all products) × 100",
      },
      {
        k: "bullets",
        items: [
          "Inefficient, wasteful processes have low atom economies.",
          "Efficient processes have high atom economies, and are important for ==sustainable development==, as they use fewer natural resources and create less waste.",
          "**Addition reactions** have 100% atom economy since only one product will be formed and no atoms are wasted as by-products.",
          "**Substitution reactions** have a lower atom economy than addition reactions. These reactions would form at least two products, where only one would be the desired product.",
          "Companies in the chemical industry will often choose reactions with higher atom economies. Keeping high atom economy (==greener== chemical processes) has environmental and economic benefits.",
          "Low atom economy leads to more waste. This makes separation of desired product and disposal of waste products costly.",
          "Also the process itself becomes more costly and less efficient if most of the reactants end up as waste as more raw materials would be required to get sufficient amount of product.",
        ],
      },
      {
        k: "worked",
        title: "Worked example 1",
        question:
          "What is the atom economy for making hydrogen by reacting coal with steam? C(s) + 2H~2~O(g) → CO~2~(g) + 2H~2~(g)",
        steps: [
          "Desired product: H~2~, M = 2 × 1 = **2 g mol^−1^**",
          "Sum of all products: CO~2~ (44) + 2H~2~ (2 × 2 = 4) = **48 g mol^−1^**",
          "Atom economy = 2 ÷ 48 × 100",
        ],
        answer: "Atom economy = **4.17 %**",
      },
      {
        k: "worked",
        title: "Worked example 2",
        question:
          "Hydrazine can be used as a rocket fuel and is manufactured using the reaction: 2NH~3~ + NaOCl → N~2~H~4~ + NaCl + H~2~O. What is the atom economy for this reaction?",
        steps: [
          "Desired product: N~2~H~4~, M = **32 g mol^−1^**",
          "Sum of all products: N~2~H~4~ (32) + NaCl (58.5) + H~2~O (18) = **108.5 g mol^−1^**",
          "Atom economy = 32 ÷ 108.5 × 100",
        ],
        answer: "Atom economy = **29.5 %**",
      },
    ],
  },
  {
    spec: "1.6",
    statement: "be able to use experimental data to calculate empirical and molecular formulae",
    title: "Empirical and molecular formula",
    blocks: [
      {
        k: "def",
        term: "Empirical formula",
        text: "Empirical formula gives the ==smallest whole number ratio== of atoms in a compound.",
      },
      {
        k: "def",
        term: "Molecular formula",
        text: "Molecular formula gives the ==actual number of atoms== in a molecule.",
      },
      {
        k: "p",
        text: "Sometimes, empirical and molecular formula are the same.",
      },
      {
        k: "worked",
        title: "Worked example 1 · from masses",
        question:
          "Calculate the empirical formula of a compound with C (1.8 g), O (0.48 g), H (0.3 g)",
        steps: [
          "Write out ratios by mass: C 1.8 · H 0.3 · O 0.48",
          "Divide by relative atomic mass (this gives the molar ratio): 1.8 ÷ 12 = 0.15 · 0.3 ÷ 1 = 0.3 · 0.48 ÷ 16 = 0.03",
          "If not whole numbers then scale up — try dividing by smallest value (0.03): C 5 · H 10 · O 1",
          "Express as a formula",
        ],
        answer: "**C~5~H~10~O**",
      },
      {
        k: "worked",
        title: "Worked example 2 · from the relative molecular mass",
        question:
          "Calculate the molecular formula of a compound of empirical formula CH~2~ and relative molecular mass 84.",
        steps: [
          "Calculate empirical formula mass (CH~2~ unit) = **14**",
          "Divide molecular mass (84) by empirical formula mass = 84 ÷ 14 = **6**",
          "Molecular formula = empirical formula (CH~2~) × 6",
        ],
        answer: "**C~6~H~12~**",
      },
    ],
  },
  {
    spec: "1.10",
    statement:
      "be able to determine a formula or confirm an equation by experiment, including evaluation of the data",
    title: "Determining formulae by experiment",
    blocks: [
      {
        k: "p",
        text: "The mole arithmetic becomes real chemistry when a balance and a flame replace printed numbers: ==heat a hydrate== and weigh the water it loses, ==burn an alcohol== and weigh the oxides, ==pass hydrogen over a heated oxide== and weigh the metal. Every one of these experiments is the same three-line calculation — moles of each product, divide by the smallest, read the ratio. Evaluating the data means asking whether the ratio lands on sensible whole numbers, and what the numbers say the reaction actually did.",
      },
      {
        k: "note",
        label: "Already worked",
        text: "The two determination experiments of the class note are worked in full in **section 1.7** — the sodium carbonate hydrate that lost only three of its ten waters, and the copper oxide the hydrogen reduction revealed as Cu~2~O.",
      },
      {
        k: "worked",
        title: "Worked example · combustion data",
        question:
          "4.6 g of an alcohol, with molar mass 46 g mol^−1^, is burnt in excess oxygen. It produces 8.8 g of carbon dioxide and 5.4 g of water. What is the empirical formula and the molecular formula of the alcohol?",
        steps: [
          "n(CO~2~) = 8.8 ÷ 44 = **0.2 mol**, so n(C) = 0.2 mol — every CO~2~ carries one carbon atom",
          "n(H~2~O) = 5.4 ÷ 18 = **0.3 mol**, so n(H) = 0.6 mol — every H~2~O carries two hydrogen atoms",
          "Mass of C + H = (0.2 × 12) + (0.6 × 1) = 3.0 g, so the oxygen in the alcohol = 4.6 − 3.0 = 1.6 g, n(O) = 1.6 ÷ 16 = **0.1 mol**",
          "Divide by the smallest (0.1): C 2 · H 6 · O 1 — empirical formula C~2~H~6~O, empirical mass 46",
          "Molecular mass ÷ empirical mass = 46 ÷ 46 = 1 — the molecular formula is the empirical formula",
        ],
        answer: "Empirical formula **C~2~H~6~O**; molecular formula **C~2~H~6~O** — the alcohol is ethanol",
      },
    ],
  },
  {
    spec: "1.8",
    statement:
      "be able to use chemical equations to calculate volumes of gases and vice versa, using: i the concepts of amount of substance ii the molar volume of gases iii the expression pV = nRT for gases and volatile liquids",
    title: "Gas volumes and the ideal gas equation",
    blocks: [
      { k: "h", text: "Ideal gas equation pV = nRT" },
      {
        k: "p",
        text: "**pV = nRT** is the ideal gas equation and can be used for gases (or ==volatile liquids above their boiling points==) to find the amount of substance in moles.",
      },
      {
        k: "bullets",
        items: [
          "If the mass of the substance is known, then the ==molar mass== of the compound can be calculated.",
          "This gives extra information needed to workout the empirical and molecular formula of the compound.",
        ],
      },
      {
        k: "table",
        caption: "SI units used in the ideal gas calculations",
        head: ["Symbol", "Quantity", "Unit"],
        rows: [
          ["p", "pressure", "pascals (Pa)"],
          ["V", "volume", "cubic meters (m^3^)"],
          ["T", "temperature", "kelvin (K)"],
          ["n", "amount of substance", "moles (mol)"],
          ["R", "the gas constant", "8.31 J mol^−1^ K^−1^"],
        ],
      },
      {
        k: "table",
        caption: "Conversion tips when doing questions",
        head: ["Conversion", "How to do it"],
        rows: [
          ["kPa → Pa", "Multiply by 10^3^"],
          ["cm^3^ → m^3^", "Divide by 10^6^"],
          ["dm^3^ → m^3^", "Divide by 10^3^"],
          ["°C → K", "Add 273"],
        ],
      },
      {
        k: "worked",
        title: "Worked example 1 · molar mass of a gas",
        question:
          "A 0.280 g sample of a gas has a volume of 58.5 cm^3^, measured at a pressure of 120 kPa and temperature of 70 °C. Calculate the molar mass of the gas.",
        steps: [
          "Convert everything: p = 120 kPa = 120 000 Pa · V = 58.5 cm^3^ = 58.5 × 10^−6^ m^3^ · T = 70 + 273 = 343 K",
          "n = pV ÷ (RT) = (120 000 × 58.5 × 10^−6^) ÷ (8.31 × 343)",
          "n = 7.02 ÷ 2850 = **2.46 × 10^−3^ mol**",
          "M = m ÷ n = 0.280 ÷ 2.46 × 10^−3^",
        ],
        answer: "M = **114 g mol^−1^**",
      },
      {
        k: "worked",
        title: "Worked example 2 · molecular formula from gas data",
        question:
          "A compound has the percentage composition by mass C = 52.2 %, H = 13.0 %, O = 34.8 %. A sample containing 0.173 g of the compound had a volume of 95.0 cm^3^ when measured at 105 kPa and 45 °C. What is the molecular formula of the compound?",
        steps: [
          "Empirical formula first: C 52.2 ÷ 12 = 4.35 · H 13.0 ÷ 1 = 13.0 · O 34.8 ÷ 16 = 2.175 — divide by the smallest (2.175): C 2 · H 6 · O 1, so the empirical formula is C~2~H~6~O (empirical mass 46)",
          "Convert: p = 105 000 Pa · V = 95.0 cm^3^ = 95.0 × 10^−6^ m^3^ · T = 45 + 273 = 318 K",
          "n = pV ÷ (RT) = (105 000 × 95.0 × 10^−6^) ÷ (8.31 × 318) = 9.98 ÷ 2643 = **3.78 × 10^−3^ mol**",
          "M = 0.173 ÷ 3.78 × 10^−3^ = **45.8 ≈ 46 g mol^−1^**",
          "46 ÷ 46 = 1 — the molecular formula is the empirical formula",
        ],
        answer: "Molecular formula = **C~2~H~6~O**",
      },
    ],
  },
  {
    spec: "1.5",
    statement:
      "calculate the concentration of a solution in mol dm^−3^ and g dm^−3^",
    title: "Solutions: molarity and parts per million",
    blocks: [
      {
        k: "p",
        text: "Many chemical reactions occur in solution. Concentration of a solution is measured in **moles per cubic decimeter (mol dm^−3^)**.",
      },
      {
        k: "p",
        text: "Example: Sodium chloride can be labeled as **1M NaCl**. This means that each dm^3^ (1000 cm^3^) of the solution contains 1 mole (58.5 g) of NaCl, or its concentration is 1 mol dm^−3^.",
      },
      {
        k: "note",
        label: "Why “made up to”",
        text: "It doesn't mean that 58.5 g of NaCl have been added to 1000 cm^3^ of water as the volume of the mixture may no longer be 1000 cm^3^. The solution is made by dissolving 58.5 g of the solid in about 500 cm^3^ and then adding more water to ==make it up to== 1000 cm^3^.",
      },
      { k: "eq", eq: "1 litre = 1 dm^3^ = 1000 cm^3^" },
      { k: "h", text: "Molarity" },
      {
        k: "p",
        text: "Concentration in mol dm^−3^ is called **molarity**.",
      },
      {
        k: "eq",
        eq: "Molarity = moles of solute ÷ volume of solution (dm^3^)        concentration in g dm^−3^ = Molarity × Molar mass of the solute",
      },
      {
        k: "note",
        label: "Not required at this stage",
        text: "==Titration calculations== are not required at this stage.",
      },
      { k: "h", text: "Concentrations in ppm (parts per million)" },
      {
        k: "bullets",
        items: [
          "This unit is used when describing ==very low concentrations==.",
          "Percent means out of hundred, Parts per million means ==out of a million==.",
          "It usually describes something dissolved in water.",
          "Parts per million (ppm) is often used for levels of pollutants in air or water.",
          "One ppm is equivalent to one milligram of a solute per liter of water (mg/l) or one milligram of something per kg of solvent (mg/kg).",
        ],
      },
      {
        k: "note",
        label: "Beyond ppm",
        text: "Parts per billion and parts per trillion are also widely used when measuring polluting chemicals present in very low concentrations.",
      },
      { k: "eq", eq: "Concentration in ppm = (mass of solute (g) ÷ mass of solution (g)) × 1 000 000" },
      {
        k: "worked",
        title: "Worked example 1",
        question:
          "A solution contains 0.176 g of solute dissolved in 750 g of solvent. What is the concentration in ppm?",
        steps: [
          "Mass of solution = mass of solute + mass of solvent = 0.176 + 750 = **750.176 g**",
          "Concentration in ppm = (0.176 ÷ 750.176) × 1 000 000",
        ],
        answer: "**235 ppm**",
      },
      {
        k: "worked",
        title: "Worked example 2",
        question:
          "A mass of 23 mg of sodium chloride is dissolved in 900 g of water. What is the concentration of sodium chloride in the solution in ppm?",
        steps: [
          "23 mg = **0.023 g**; mass of solution = 0.023 + 900 = **900.023 g**",
          "Concentration in ppm = (0.023 ÷ 900.023) × 1 000 000",
        ],
        answer: "**25.6 ppm**",
      },
      {
        k: "worked",
        title: "Worked example 3",
        question:
          "A sample of river water contains phosphate ions with a concentration of 17 ppm. What is the mass of the phosphate ions in 500 g of water?",
        steps: [
          "Rearrange the ppm expression: mass of solute = ppm × mass of solution ÷ 1 000 000",
          "Mass = 17 × 500 ÷ 1 000 000 g",
        ],
        answer: "**0.0085 g** (8.5 mg) of phosphate ions",
      },
      { k: "h", text: "Gases in ppm" },
      {
        k: "eq",
        eq: "Concentration in ppm = (volume of gas ÷ volume of air) × 1 000 000",
      },
      {
        k: "worked",
        title: "Worked example 4",
        question:
          "Some nitrogen dioxide gas, with a volume of 1.5 dm^3^, mixes with 10 000 dm^3^ of air. What is the concentration of nitrogen dioxide, in ppm, in air?",
        steps: ["Concentration in ppm = (1.5 ÷ 10 000) × 1 000 000"],
        answer: "**150 ppm**",
      },
      {
        k: "worked",
        title: "Worked example 5",
        question:
          "5000 dm^3^ of air is found to contain ozone with a concentration of 87 ppm. What volume of ozone is in the sample of air?",
        steps: [
          "Rearrange: volume of gas = ppm × volume of air ÷ 1 000 000",
          "Volume = 87 × 5000 ÷ 1 000 000 dm^3^",
        ],
        answer: "**0.435 dm^3^** of ozone",
      },
      {
        k: "worked",
        title: "Worked example 6",
        question:
          "Two samples of air containing sulfur dioxide was analysed. The results for sample 1 showed that 500 dm^3^ of air contained 37 cm^3^ of sulfur dioxide. The results of sample 2 showed that there were 1.4 dm^3^ of sulfur dioxide in 4000 dm^3^ of air. Show, by calculation, which sample has the higher concentration, in ppm, of sulfur dioxide.",
        steps: [
          "Sample 1: 37 cm^3^ = 0.037 dm^3^, so ppm = (0.037 ÷ 500) × 1 000 000 = **74 ppm**",
          "Sample 2: ppm = (1.4 ÷ 4000) × 1 000 000 = **350 ppm**",
          "Compare: 350 ppm against 74 ppm",
        ],
        answer: "**Sample 2** has the higher concentration — 350 ppm",
      },
    ],
  },
];
