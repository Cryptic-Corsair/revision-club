import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 1 revision note · Part A — spec 1.1, 1.3, 1.12
   Text kept verbatim from the CHSE Grade 11 / Unit 1.3 / Topic 1
   class note (2020, semester 1) — Formulae, Equations and Amount
   of Substance; page furniture omitted. The exercise drill
   (Exercises 1–4) is left to the book; Checkpoint cards point at
   its pages. Each balancing procedure keeps the class note's own
   worked example, worked in full.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T01_A: SpecSection[] = [
  {
    spec: "1.1",
    statement:
      "know the terms ‘atom’, ‘element’, ‘ion’, ‘molecule’, ‘compound’, ‘empirical formula’ and ‘molecular formula’",
    title: "Atoms, elements and molecules",
    blocks: [
      { k: "h", text: "Atom" },
      {
        k: "bullets",
        items: [
          "An atom is the smallest, ==electrically neutral== particle of an element that can take part in a chemical change.",
          "An atom comprises of subatomic particles **protons, neutrons and electrons**.",
          "Protons and neutrons, together known as **nucleons**, are found in the nucleus which is the center of the atom.",
          "Electrons orbit around the nucleus in definite energy levels called **shells**.",
          "An atom gets its chemical properties from the number of electrons and arrangement of electrons in the atom.",
        ],
      },
      { k: "p", text: "The masses and charges of the three sub atomic particles:" },
      {
        k: "table",
        caption: "The three sub-atomic particles",
        head: ["Particle", "Symbol", "Charge / C", "Relative charge", "Mass / g", "Relative mass"],
        rows: [
          ["Proton", "p", "+1.60 × 10^−19^", "+1", "1.67 × 10^−24^", "1"],
          ["Neutron", "n", "0", "0", "1.67 × 10^−24^", "1"],
          ["Electron", "e^−^", "−1.60 × 10^−19^", "−1", "9.11 × 10^−28^", "1 / 1840"],
        ],
      },
      {
        k: "p",
        text: "The mass of electrons are ==negligible==, hence the mass of the atoms are determined by the mass of **nucleons**.",
      },
      { k: "p", text: "Atoms in an element are represented by using the following notation." },
      { k: "figure", kind: "notation", caption: "Mass number on top, atomic number underneath." },
      {
        k: "def",
        term: "Atomic number",
        text: "The number of ==protons== in the nucleus of an atom.",
      },
      {
        k: "def",
        term: "Mass number",
        text: "The sum of ==protons and neutrons== in the nucleus of an atom.",
      },
      { k: "h", text: "Element" },
      {
        k: "bullets",
        items: [
          "Elements are made up of ==only one type of atoms==.",
          "Elements are chemically the simplest substance, so they cannot be broken down using physical/ chemical means.",
          "The atoms of an element all contain the same number of protons.",
          "Can exist as either atoms (eg: sodium, argon) or molecules (eg: oxygen (O~2~), nitrogen (N~2~)).",
          "Each element has its own characteristic properties.",
          "Chemists use symbols to represent elements.",
        ],
      },
      { k: "h", text: "Molecule" },
      {
        k: "def",
        term: "Molecule",
        text: "A molecule is the smallest, electrically neutral particle, of an element or compound that can ==exist on its own==.",
      },
      {
        k: "bullets",
        items: [
          "Example: Oxygen molecules (O~2~) — element; Water (H~2~O) — compound.",
          "It is also the name given to the smallest part of those elements which do not exist as atoms in the free state i.e. hydrogen H~2~, oxygen O~2~, nitrogen N~2~, fluorine F~2~, chlorine Cl~2~, bromine Br~2~ and iodine I~2~.",
          "A molecule consists of **two or more atoms** of the same element or different elements, chemically combined.",
          "Ionic compounds (e.g. sodium chloride) ==do not exist as molecules==.",
        ],
      },
      { k: "h", text: "Compound" },
      {
        k: "def",
        term: "Compound",
        text: "A compound is a substance formed when **two or more elements chemically combined**.",
      },
      {
        k: "bullets",
        items: [
          "Example: water, sugar, sodium chloride.",
          "Have properties that are different from its component elements.",
          "Can be broken down into simpler substances by chemical methods.",
          "Chemical formulas are used to show the composition of compounds. Example: NaCl, H~2~O.",
        ],
      },
      { k: "h", text: "Ion" },
      {
        k: "def",
        term: "Ion",
        text: "An ion is an atom or a group of atoms (molecule) which carries an ==electrical charge==.",
      },
      {
        k: "bullets",
        items: [
          "A **negative ion** has more electrons than protons. Example: Cl^−^ ion has 17 protons and 18 electrons.",
          "A negative ion is obtained by **adding** electrons to a neutral atom.",
          "A **positive ion** has fewer electrons than protons. Example: Na^+^ ion has 11 protons and 10 electrons.",
          "A positive ion is obtained by **removing** electrons from a neutral atom.",
        ],
      },
      {
        k: "note",
        label: "Also in this objective",
        text: "The last two terms of 1.1 — **empirical formula** and **molecular formula** — are defined and worked in full in section 1.6 below.",
      },
      { k: "checkpoint", page: 4 },
    ],
  },
  {
    spec: "1.3",
    statement:
      "write balanced full and ionic equations, including state symbols, for chemical reactions",
    title: "Writing chemical equations",
    blocks: [
      {
        k: "bullets",
        items: [
          "Shows the ==formulae== of the reactants and the products.",
          "Shows the ==physical state== in which it exists.",
          "Shows the relationship between the numbers of each substance involved; this is known as the **stoichiometry** of the reaction.",
        ],
      },
      {
        k: "p",
        text: "Equations can be written in words or using chemical formula. Chemical equations could be either **molecular equations** or **ionic equations**.",
      },
      { k: "eq", eq: "hydrogen + oxygen → water        H~2~ + O~2~ → H~2~O" },
      { k: "h", text: "Balancing molecular equations" },
      {
        k: "bullets",
        items: [
          "A balanced chemical equation must have the same number of each kind of atoms on the **left-hand side (LHS)** of the equation as on the **right-hand side (RHS)**.",
          "Net charge on both reactants and products side should be 0.",
          "Simplest ==whole number ratios== should be used to balance the equations.",
        ],
      },
      { k: "p", text: "Steps to follow in writing chemical equations:" },
      {
        k: "steps",
        items: [
          {
            title: "Step 1",
            text: "Work out what has reacted and what has been formed. Write a **word equation**.",
          },
          {
            title: "Step 2",
            text: "Get the correct **formula** for each species. Include the **state symbols** where necessary. When the correct formula of a species has been obtained, ==do not change the formula== to balance the equation.",
          },
          {
            title: "Step 3",
            text: "Having written out the initial equation, check to see if it is balanced. An equation balances if the same number of each type of atom appears on either side of the arrow.",
          },
          {
            title: "Step 4",
            text: "Place whole numbers in front of any formula to indicate if more than one of it is required. This multiplies everything in the formula immediately behind it. Continue until the equation balances.",
          },
          {
            title: "Step 5",
            text: "Finally, check the equation to see that you have balanced it correctly.",
          },
        ],
      },
      {
        k: "worked",
        title: "Worked example · balancing a molecular equation",
        question:
          "Balance: sodium + water → sodium hydroxide + hydrogen",
        steps: [
          "**Step 1** — word equation: sodium + water → sodium hydroxide + hydrogen",
          "**Step 2** — formulae with state symbols: Na(s) + H~2~O(l) → NaOH(aq) + H~2~(g)",
          "**Step 3** — count up the atoms. LHS … 1 × Na, 2 × H, 1 × O. RHS … 1 × Na, 3 × H, 1 × O. The equation doesn't balance; an extra H is needed on the LHS. However formulae should not be changed — one can only get extra H's by having two waters; multiply H~2~O by two: Na(s) + 2H~2~O(l) → NaOH(aq) + H~2~(g)",
          "**Step 4** — now there are too many O's (2) and H's (4) on the LHS; multiplying the NaOH by two will solve this problem: Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g). However this creates yet another problem because it has introduced an extra Na on the RHS; multiply the Na on the LHS by two: 2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)",
          "**Step 5** — check the equation. LHS … 2 × Na, 4 × H, 2 × O. RHS … 2 × Na, 4 × H, 2 × O. It is balanced.",
        ],
        answer: "2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)",
      },
      { k: "h", text: "Balancing ionic equations" },
      {
        k: "bullets",
        items: [
          "Many reactions involve **ions in solution**.",
          "When substances react in this way an ionic equation is useful.",
          "In ionic equations, ==only the reacting particles are included==.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · balancing an ionic equation",
        question:
          "Write down a balanced ionic equation for the following reaction. CaCO~3~(s) + HCl(aq) → CaCl~2~(aq) + CO~2~(g) + H~2~O(l)",
        steps: [
          "**Step 1** — balance the molecular equation first: CaCO~3~(s) + 2HCl(aq) → CaCl~2~(aq) + CO~2~(g) + H~2~O(l)",
          "**Step 2** — separate the ions in solution (write full molecular formula for solids, liquids and gases) and cancel out the ==spectator ions==: CaCO~3~(s) + 2H^+^(aq) + 2Cl^−^(aq) → Ca^2+^(aq) + 2Cl^−^(aq) + CO~2~(g) + H~2~O(l)",
          "**Step 3** — then write down the final ionic equation with state symbols: CaCO~3~(s) + 2H^+^(aq) → Ca^2+^(aq) + CO~2~(g) + H~2~O(l)",
        ],
        answer: "CaCO~3~(s) + 2H^+^(aq) → Ca^2+^(aq) + CO~2~(g) + H~2~O(l)",
      },
      {
        k: "note",
        label: "In the book",
        text: "**Exercise 1** drills the balancing steps on ten equations, from Ca(OH)~2~ + HNO~3~ through to KOH + Cl~2~ — it stays in the book.",
      },
      { k: "checkpoint", page: 7 },
    ],
  },
  {
    spec: "1.12",
    statement:
      "be able to relate ionic and full equations, with state symbols, to observations from simple test-tube experiments, to include: i displacement reactions ii typical reactions of acids iii precipitation reactions",
    title: "Test-tube reactions: acids, displacement, precipitation",
    blocks: [
      { k: "h", text: "Typical reactions of acids" },
      { k: "p", text: "Three general equations carry every acid reaction at this level:" },
      { k: "eq", eq: "Acid + Metal → Salt + Hydrogen", note: "objective 1.12(ii)" },
      { k: "eq", eq: "Acid + Metal oxide / Metal hydroxide → Salt + Water" },
      { k: "eq", eq: "Acid + Metal carbonate → Salt + Water + Carbon dioxide" },
      {
        k: "note",
        label: "In the book",
        text: "**Exercise 2** and **Exercise 3** set four balanced equations each against these general forms — aluminium with sulfuric acid, copper(II) oxide with hydrochloric acid, sodium hydroxide with phosphoric acid, lithium carbonate with nitric acid, and more. They stay in the book.",
      },
      { k: "h", text: "Displacement reactions" },
      {
        k: "def",
        term: "Displacement",
        text: "In simple, it is a reaction in which ==one element replaces another element== in a compound.",
      },
      { k: "eq", eq: "Mg(s) + CuSO~4~(aq) → Cu(s) + MgSO~4~(aq)", note: "objective 1.12(i)" },
      { k: "eq", eq: "2Al(s) + Fe~2~O~3~(s) → 2Fe(s) + Al~2~O~3~(s)" },
      {
        k: "p",
        text: "Remember a ==more reactive metal displaces the less reactive metal== from its compound.",
      },
      { k: "h", text: "Precipitation reactions" },
      {
        k: "def",
        term: "Precipitation reaction",
        text: "A precipitation reaction refers to the formation of an ==insoluble salt== when two solutions containing soluble salts are combined.",
      },
      {
        k: "p",
        text: "The insoluble salt that falls out of solution is known as the **precipitate**. (objective 1.12(iii))",
      },
      { k: "eq", eq: "Na~2~SO~4~(aq) + BaCl~2~(aq) → BaSO~4~(s) + 2NaCl(aq)" },
      { k: "eq", eq: "NaCl(aq) + AgNO~3~(aq) → AgCl(s) + NaNO~3~(aq)" },
      { k: "eq", eq: "Ca(OH)~2~(aq) + CO~2~ → CaCO~3~(s) + H~2~O(l)" },
      { k: "h", text: "Solubility rules" },
      {
        k: "table",
        caption: "Solubility rules — the table that decides what precipitates",
        head: ["Soluble", "Insoluble"],
        rows: [
          ["All nitrates", "None"],
          ["Most sulfates", "Lead sulfate, barium sulfate and calcium sulfate"],
          [
            "Most chlorides, bromides and iodides",
            "Silver chloride, silver bromide, silver iodide, lead chloride, lead bromide, lead iodide",
          ],
          [
            "Sodium carbonate, potassium carbonate, ammonium carbonate",
            "Most other carbonates",
          ],
          [
            "Sodium hydroxide, potassium hydroxide, ammonium hydroxide",
            "Most other hydroxides",
          ],
        ],
      },
      {
        k: "note",
        label: "In the book",
        text: "**Exercise 4** completes five displacement and precipitation equations — Cl~2~ into NaBr, copper into silver nitrate, and so on. It stays in the book.",
      },
      { k: "checkpoint", page: 8 },
    ],
  },
];
