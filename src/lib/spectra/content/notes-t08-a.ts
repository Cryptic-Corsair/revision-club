import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 8 revision note · Part 8A — Redox Chemistry (spec 8.1–8.10)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 8A
   class note (2021, semester 2) — Redox Chemistry; page furniture
   omitted. Each method — the basic sum, the Roman numeral, the
   formula, the agents, the
   disproportionation test, and each balancing procedure through to
   the full ionic equation — keeps exactly one worked example,
   worked in full.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only — the marker is for the words that name the
   idea, not for whole clauses.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T08_A: SpecSection[] = [
  {
    spec: "8.1",
    statement:
      "know what is meant by the term 'oxidation number' and understand the rules for assigning oxidation numbers",
    title: "Oxidation number and its rules",
    blocks: [
      {
        k: "def",
        term: "Oxidation number",
        text: "It is the charge on an atom of the element in a compound calculated assuming that all the atoms in the compound are simple monoatomic ions.",
      },
      {
        k: "p",
        text: "Oxidation numbers are assigned to elements in covalent compounds so that the oxidation number of an atom is the charge it would have if the electrons in each of its bonds belonged to the ==more electronegative atom==.",
      },
      {
        k: "p",
        text: "It is used to tell whether oxidation or reduction has taken place. In MgO the oxidation number of magnesium is +2 since the charge on the magnesium ion is 2+. Similarly the oxidation number of oxygen is −2. In SO~2~, the oxidation number of sulfur is +4 because if the compound were fully ionic the sulfur ion would have a charge of 4+. The oxidation number of oxygen is once again −2.",
      },
      { k: "h", text: "Rules for determining oxidation number" },
      { k: "p", text: "Here are some rules to help calculate the oxidation number:" },
      {
        k: "table",
        caption: "The rules of the class note, in full",
        head: ["Atom", "Oxidation number", "Example"],
        rows: [
          ["Uncombined element", "0", "O in O~2~ = 0"],
          ["Simple monoatomic ion", "charge on ion", "Na in Na^+^ = +1"],
          ["Group 1, 2 & 3 element in a compound", "+1, +2 & +3 respectively", "Na = +1 · Mg = +2"],
          ["Fluorine in a compound", "−1", "F in BF~3~ = −1"],
          ["Hydrogen in a compound (except in metal hydrides, where it is −1)", "+1", "H in HCl = +1 · H in NaH = −1"],
          ["Oxygen in a compound (except in F~2~O, peroxides and superoxides)", "−2", "O in MgO = −2 · O in F~2~O = +2 · peroxide: −1 (e.g. K~2~O~2~) · superoxide: −1/2 (e.g. KO~2~)"],
          ["Halogens", "−1", "Cl in HCl = −1"],
          ["Other halogens with fluorine", "+1", "Cl in ClF = +1"],
          ["Halogens (except fluorine) with oxygen", "+1, +3, +5 & +7", "Cl in ClO^−^ = +1 · Cl in ClO~3~^−^ = +5"],
          ["Sum of the oxidation numbers of the elements in a compound or molecule", "0", "in CO~2~: C is +4 and O is −2, i.e. +4 + (2 × −2) = 0"],
          ["Sum of the oxidation numbers of the elements in a polyatomic ion", "charge on the ion", "in SO~4~^2−^: S is +6 and O is −2, i.e. +6 + (4 × −2) = −2"],
        ],
      },
      {
        k: "wow",
        text: "Two numbers run the whole bookkeeping: the oxidation numbers of a complete compound add to ==0==, and those of a polyatomic ion add to the ==charge on the ion==. Every calculation in this topic — every worked example below — leans on one of those two sums.",
      },
    ],
  },
  {
    spec: "8.2",
    statement:
      "be able to calculate the oxidation number of elements in compounds and ions, including in peroxides and metal hydrides",
    title: "Calculating oxidation numbers",
    blocks: [
      {
        k: "p",
        text: "The unknown is always found the same way: set the sum of the oxidation numbers equal to 0 (compound) or to the ionic charge (ion), and solve. The rules table fixes everything except the element asked for.",
      },
      {
        k: "worked",
        title: "Worked example · chlorine in NaCl, NaClO and NaClO~3~",
        question: "Deduce the oxidation number of chlorine in: (a) NaCl  (b) NaClO  (c) NaClO~3~",
        steps: [
          "(a) NaCl: Na is in group 1, so it is +1. +1 + Cl = 0, so Cl = −1.",
          "(b) NaClO: +1 + Cl + (−2) = 0, so Cl = +1.",
          "(c) NaClO~3~: +1 + Cl + 3(−2) = 0, so Cl = +5.",
        ],
        answer: "(a) −1 · (b) +1 · (c) +5",
      },
      {
        k: "worked",
        title: "Worked example · oxidation numbers from the rules",
        question: "Calculate the oxidation number of the underlined element in each of the following species: (a) VO~2~^+^  (b) H~2~O~2~",
        steps: [
          "(a) VO~2~^+^ is an ion: V + 2(−2) = +1, so ==V = +5==.",
          "(b) H~2~O~2~ is a ==peroxide==, so each oxygen is −1 (rules table). Check with the sum: 2(+1) + 2(−1) = 0 — each hydrogen is +1.",
        ],
        answer: "(a) V = +5 · (b) O = −1 (peroxide rule), each H = +1",
      },
    ],
  },
  {
    spec: "8.3",
    statement:
      "be able to indicate the oxidation number of an element in a compound or an ion, using a Roman numeral",
    title: "Roman numerals in systematic names",
    blocks: [
      {
        k: "p",
        text: "Oxidation numbers are often included in naming compounds and ions that contain elements with ==varying oxidation numbers==. This name is often referred to as 'systematic name'.",
      },
      {
        k: "bullets",
        items: [
          "If the cation shows variable oxidation state, the Roman numeral is written in brackets following the name of the cation — manganese(IV) oxide shows Mn is in the +4 oxidation state.",
          "If the anion contains an element of variable oxidation state, the Roman numeral is written in brackets following the name of the anion — potassium manganate(VII) shows Mn is in the +7 oxidation state.",
          "Names of oxoanions end with the suffix −ate.",
        ],
      },
      {
        k: "table",
        caption: "From the class note — reading the Roman numeral off the formula",
        head: ["Formula of compound or ion", "Relevant oxidation number", "Systematic name"],
        rows: [
          ["FeCl~2~", "Fe +2", "Iron(II) chloride"],
          ["FeCl~3~", "Fe +3", "Iron(III) chloride"],
          ["KMnO~4~", "Mn +7", "Potassium manganate(VII)"],
          ["K~2~MnO~4~", "Mn +6", "Potassium manganate(VI)"],
          ["CrO~4~^2−^", "Cr +6", "Chromate(VI)"],
          ["Cr~2~O~7~^2−^", "Cr +6", "Chromate(VI)"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · systematic names from oxidation numbers",
        question: "Give the systematic name for each of the following compounds: (a) PCl~3~  (b) PCl~5~  (c) V~2~O~5~  (d) PbO  (e) CuSO~4~  (f) NaClO  (g) NaClO~3~",
        steps: [
          "(a) PCl~3~: P + 3(−1) = 0, so P is +3 → phosphorus(III) chloride.",
          "(b) PCl~5~: P is +5 → phosphorus(V) chloride.",
          "(c) V~2~O~5~: 2V + 5(−2) = 0, so V is +5 → vanadium(V) oxide.",
          "(d) PbO: Pb is +2 → lead(II) oxide.",
          "(e) CuSO~4~: sulfate is SO~4~^2−^, so Cu is +2 → copper(II) sulfate.",
          "(f) NaClO: +1 + Cl + (−2) = 0, so Cl is +1 → sodium chlorate(I) — an oxoanion, so the name ends in −ate.",
          "(g) NaClO~3~: +1 + Cl + 3(−2) = 0, so Cl is +5 → sodium chlorate(V).",
        ],
        answer:
          "(a) phosphorus(III) chloride · (b) phosphorus(V) chloride · (c) vanadium(V) oxide · (d) lead(II) oxide · (e) copper(II) sulfate · (f) sodium chlorate(I) · (g) sodium chlorate(V)",
      },
    ],
  },
  {
    spec: "8.4",
    statement: "be able to write formulae given oxidation numbers",
    title: "Writing formulae from names",
    blocks: [
      {
        k: "p",
        text: "It is also important to work out the formula of the compound or ion by looking at the systematic name with oxidation number: the Roman numeral fixes the charge of the variable element, and the rules table fixes every other element — the formula is the ratio that makes the sums balance.",
      },
      {
        k: "worked",
        title: "Worked example · iron(II) sulfate and iron(III) sulfate",
        question: "Deduce the formula of (a) iron(II) sulfate  (b) iron(III) sulfate",
        steps: [
          "Sulfate is SO~4~^2−^ — sulfur +6, four oxygens −8, charge 2− (the class note's own sum rule example).",
          "(a) Iron(II) carries +2: one Fe^2+^ balances one SO~4~^2−^ → FeSO~4~.",
          "(b) Iron(III) carries +3: two Fe^3+^ give +6 and three SO~4~^2−^ give −6 → Fe~2~(SO~4~)~3~.",
        ],
        answer: "(a) FeSO~4~ · (b) Fe~2~(SO~4~)~3~",
      },
    ],
  },
  {
    spec: "8.5",
    statement:
      "understand oxidation and reduction in terms of electron transfer and changes in oxidation number, and the application of these ideas to reactions of s-block and p-block elements",
    title: "Oxidation, reduction and electron transfer",
    blocks: [
      { k: "h", text: "Background to oxidation and reduction" },
      {
        k: "p",
        text: "'Oxidation' is known as addition of oxygen and 'reduction' is known as the removal of oxygen. An example of such a reaction is the reaction between iron(III) oxide and carbon monoxide that takes place in the blast furnace:",
      },
      { k: "eq", eq: "Fe~2~O~3~ + 3CO → 2Fe + 3CO~2~" },
      {
        k: "p",
        text: "Oxidation can also be described as removal of hydrogen and reduction can be described as addition of hydrogen. An example of such a reaction is the reaction between chlorine and hydrogen sulfide:",
      },
      { k: "eq", eq: "H~2~S + Cl~2~ → S + 2HCl" },
      { k: "h", text: "Oxidation and reduction in terms of electron loss and gain" },
      {
        k: "p",
        text: "Oxidation and reduction involves the ==transfer of electrons==. When magnesium burns in oxygen it forms magnesium oxide:",
      },
      { k: "eq", eq: "2Mg + O~2~ → 2MgO" },
      {
        k: "p",
        text: "The reaction results in the formation of Mg^2+^ and O^2−^ ions. Each of the two magnesium atoms has lost two electrons, and the oxygen molecule has gained four electrons to become oxide ions:",
      },
      {
        k: "eq",
        eq: "Mg → Mg^2+^ + 2e^−^        O~2~ + 4e^−^ → 2O^2−^",
        note: "The magnesium has been oxidized because it has lost electrons. Oxygen has been reduced because it has gained electrons.",
      },
      {
        k: "eq",
        eq: "Oxidation is the loss of electrons        Reduction is the gain of electrons",
        note: "These new definitions are easily remembered using the mnemonic ==OIL RIG== — Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).",
      },
      { k: "h", text: "Redox reactions" },
      {
        k: "def",
        term: "Redox reaction",
        text: "A chemical reaction in which oxidation and reduction occur at the same time. Electrons are transferred in such reactions.",
      },
      {
        k: "p",
        text: "The reaction between zinc and copper(II) sulphate solution is an example of a redox reaction. In the following reaction, zinc metal gives up electrons:",
      },
      { k: "eq", eq: "Zn(s) → Zn^2+^(aq) + 2e^−^    [Oxidation]", note: "The electrons are then taken up by the copper ions:  Cu^2+^(aq) + 2e^−^ → Cu(s)  [Reduction]." },
      {
        k: "figure",
        kind: "etransfer",
        caption:
          "The two half-reactions of one redox reaction: the electrons given up by zinc cross over to the copper(II) ions, and the overall equation is the two added together.",
      },
      { k: "h", text: "The oxidation-number definition" },
      {
        k: "p",
        text: "Consider the following ionic half-equations:  Zn(s) → Zn^2+^(aq) + 2e^−^  ·  Fe^2+^(aq) → Fe^3+^(aq) + e^−^  ·  2I^−^(aq) → I~2~(aq) + 2e^−^. Electrons have been lost so the reactions are oxidations. Also the oxidation number of the element has increased in each case: Zn has increased from 0 to +2, Fe from +2 to +3, I from −1 to 0.",
      },
      {
        k: "eq",
        eq: "Oxidation occurs when there is an increase in oxidation number        Reduction occurs when there is a decrease in oxidation number",
        note: "The second definition of oxidation and reduction — often the quicker test.",
      },
      {
        k: "p",
        text: "Consider the following ionic half-equations:  Cl~2~(aq) + 2e^−^ → 2Cl^−^(aq) — Cl changes from 0 to −1  ·  MnO~4~^−^(aq) + 8H^+^(aq) + 5e^−^ → Mn^2+^(aq) + 4H~2~O(l) — Mn changes from +7 to +2  ·  2H~2~O(l) + 2e^−^ → 2OH^−^(aq) + H~2~(g) — H changes from +1 to 0. In each case the oxidation number of one of the elements involved has decreased, so reduction has taken place.",
      },
      { k: "h", text: "Reactions of s-block elements" },
      { k: "p", text: "Reactive metals in groups 1 and 2 lose electrons when they react." },
      {
        k: "table",
        caption: "The s-block half-equations",
        head: ["Element", "Electrons lost", "Half equation", "Change in oxidation number"],
        rows: [
          ["Sodium (Na) — group 1", "1", "Na → Na^+^ + e^−^", "increase from 0 to +1"],
          ["Magnesium (Mg) — group 2", "2", "Mg → Mg^2+^ + 2e^−^", "increase from 0 to +2"],
        ],
      },
      { k: "note", label: "The s-block pattern", text: "All group 1 and 2 elements undergo oxidation." },
      { k: "h", text: "Reactions of p-block elements" },
      {
        k: "p",
        text: "Predictions about the reactions of p-block elements can be made in terms of redox reactions. However it is not as straightforward as s-block elements. This is because the p-block contains elements with different characteristics.",
      },
      {
        k: "bullets",
        items: [
          "The group 3 element aluminium is a metal with reactivity nearly as high as magnesium, so it reacts in a similar way:  Al → Al^3+^ + 3e^−^ — an increase in oxidation number from 0 to +3.",
          "Consider the group 7 element fluorine, which is the most reactive halogen:  F~2~ + 2e^−^ → 2F^−^ — a decrease in oxidation number from 0 to −1.",
        ],
      },
      {
        k: "p",
        text: "Nitrogen is a p-block element in group 5, with an electronegativity higher than aluminium but lower than fluorine. Therefore the change in oxidation number for nitrogen depends on which element it reacts with. Nitrogen reacts with the group 1 metal sodium as shown:",
      },
      {
        k: "eq",
        eq: "6Na + N~2~ → 2Na~3~N",
        note: "In this redox reaction the oxidation number of sodium increases from 0 to +1 and that of nitrogen decreases from 0 to −3.",
      },
      {
        k: "p",
        text: "Consider the reaction of nitrogen with fluorine:",
      },
      {
        k: "eq",
        eq: "N~2~ + 3F~2~ → 2NF~3~",
        note: "The oxidation number of fluorine decreases from 0 to −1, but this time the oxidation number of nitrogen increases from 0 to +3.",
      },
      {
        k: "wow",
        text: "One element, two directions: nitrogen ends at −3 against sodium but at +3 against fluorine. The partner sets the sign — which is exactly why oxidation numbers, not memorised products, are how s-block and p-block reactions get read.",
      },
    ],
  },
  {
    spec: "8.6",
    statement:
      "know that oxidising agents gain electrons and reducing agents lose electrons",
    title: "Oxidising and reducing agents",
    blocks: [
      {
        k: "def",
        term: "Oxidising agent",
        text: "A species (atom, molecule or ion) that oxidizes another species by removing one or more electrons and itself gets reduced.",
      },
      { k: "p", text: "Non-metals are oxidizing agents. E.g.: F~2~, Cl~2~, O~2~." },
      {
        k: "def",
        term: "Reducing agent",
        text: "A species that reduces another species by giving it one or more electrons and itself gets oxidized.",
      },
      { k: "p", text: "Metals are reducing agents. E.g.: Na, Fe, Zn." },
      {
        k: "table",
        caption: "The class note's side-by-side comparison",
        head: ["Oxidising agent", "Reducing agent"],
        rows: [
          ["It is an ==electron acceptor==", "It is an ==electron donor=="],
          ["It oxidizes another substance", "It reduces another substance"],
          ["Oxidation number of the element in it decreases", "Oxidation number of the element in it increases"],
        ],
      },
      {
        k: "figure",
        kind: "agents",
        caption:
          "Chlorine displaces bromine from potassium bromide: Cl~2~ is reduced (0 → −1), so it is the oxidising agent; Br^−^ is oxidised (−1 → 0), so KBr is the reducing agent.",
      },
      {
        k: "worked",
        title: "Worked example · chlorine displacing bromine",
        question: "In the reaction Cl~2~ + 2KBr → 2KCl + Br~2~, use oxidation numbers to identify the oxidising and the reducing agent.",
        steps: [
          "Oxidation numbers: Cl in Cl~2~ = 0; in KBr, K = +1 and Br = −1; in KCl, K = +1 and Cl = −1; in Br~2~, Br = 0.",
          "Chlorine: 0 → −1 — a decrease, so chlorine is reduced; it has accepted electrons.",
          "Bromine: −1 → 0 — an increase, so bromide is oxidized; it has donated electrons.",
          "The reduced species is the oxidising agent; the oxidised species is the reducing agent.",
        ],
        answer: "Cl~2~ is the oxidising agent; KBr (its bromide ion) is the reducing agent.",
      },
    ],
  },
  {
    spec: "8.7",
    statement:
      "understand that a disproportionation reaction involves an element in a single species being simultaneously oxidised and reduced",
    title: "Disproportionation",
    blocks: [
      {
        k: "def",
        term: "Disproportionation",
        text: "A disproportionation reaction takes place when ==the same element== is both oxidized and reduced simultaneously.",
      },
      {
        k: "p",
        text: "Example: when chlorine gas is passed into aqueous sodium hydroxide, a disproportionation reaction takes place. One atom of chlorine is oxidized and the other is reduced:",
      },
      {
        k: "eq",
        eq: "2NaOH + Cl~2~ → NaOCl + NaCl + H~2~O",
        note: "In NaOCl the chlorine is +1; in NaCl it is −1 — both started at 0 in Cl~2~.",
      },
      {
        k: "figure",
        kind: "disprop",
        caption:
          "Chlorine(0) splits into chlorate(I), +1, and chloride, −1 — one atom climbs, the other falls, in the same reaction.",
      },
      {
        k: "worked",
        title: "Worked example · the potassium bromate(I) decomposition",
        question: "When potassium bromate(I) is heated, it decomposes according to the equation 3KOBr → 2KBr + KBrO~3~. Using oxidation numbers of the elements involved, explain why this is a disproportionation reaction.",
        steps: [
          "In KOBr: K is +1, O is −2, so Br is +1 — one species, one oxidation number to start.",
          "In KBr: Br is −1 — a decrease, so part of the bromine is reduced.",
          "In KBrO~3~: +1 + Br + 3(−2) = 0, so Br is +5 — an increase, so part of the bromine is oxidized.",
          "The same element, starting in a single species, has moved in both directions at once.",
        ],
        answer:
          "Bromine in KOBr (+1) is simultaneously reduced to −1 (KBr) and oxidized to +5 (KBrO~3~) — a disproportionation reaction.",
      },
    ],
  },
  {
    spec: "8.8",
    statement:
      "know that oxidation number is a useful concept in terms of the classification of reactions as redox and as disproportionation",
    title: "Classifying reactions by oxidation number",
    blocks: [
      {
        k: "p",
        text: "With an oxidation number assigned to every element, a reaction classifies itself: any change means ==redox==, one element moving both up and down means disproportionation, and no change at all means the reaction is not redox.",
      },
      {
        k: "worked",
        title: "Worked example · classifying three reactions",
        question: "Use oxidation numbers to show whether the following reactions are examples of redox reactions: (a) H~2~S(g) + Cl~2~(g) → 2HCl(g) + S(s)  (b) NaOH(aq) + HCl(aq) → NaCl(aq) + H~2~O(l)  (c) 2NaOH(aq) + Cl~2~(aq) → NaCl(aq) + NaClO(aq) + H~2~O(l)",
        steps: [
          "(a) S goes −2 (H~2~S) → 0 (S) — an increase, oxidised; Cl goes 0 (Cl~2~) → −1 (HCl) — a decrease, reduced. Both change: ==redox==.",
          "(b) Na is +1, O is −2, H is +1 and Cl is −1 on both sides — no oxidation number changes: not redox (it is a neutralisation).",
          "(c) Cl goes 0 (Cl~2~) → −1 (NaCl) and 0 → +1 (NaClO): redox — and the chlorine has disproportionated.",
        ],
        answer: "(a) redox · (b) not redox — nothing changes its oxidation number · (c) redox, and a disproportionation.",
      },
    ],
  },
  {
    spec: "8.9",
    statement:
      "understand that metals, in general, form positive ions by loss of electrons with an increase in oxidation number whereas non-metals, in general, form negative ions by gain of electrons with a decrease in oxidation number",
    title: "Metals and non-metals: the two directions",
    blocks: [
      {
        k: "p",
        text: "The magnesium reaction shows the pattern in full: the metal loses electrons and climbs to a positive ion — Mg → Mg^2+^ + 2e^−^, oxidation number 0 → +2 — while the non-metal gains electrons and falls to a negative ion — O~2~ + 4e^−^ → 2O^2−^, oxidation number 0 → −2.",
      },
      {
        k: "bullets",
        items: [
          "Metals, in general, form ==positive ions== by loss of electrons with an increase in oxidation number.",
          "Non-metals, in general, form ==negative ions== by gain of electrons with a decrease in oxidation number.",
        ],
      },
      {
        k: "table",
        caption: "The two directions, side by side",
        head: ["", "Metal (Na, Mg, Al, Zn…)", "Non-metal (O~2~, F~2~, Cl~2~…)"],
        rows: [
          ["Electrons", "lost", "gained"],
          ["Ion formed", "positive", "negative"],
          ["Oxidation number", "increases", "decreases"],
          ["The species is", "oxidised — the reducing agent", "reduced — the oxidising agent"],
        ],
      },
      {
        k: "note",
        label: "In a compound",
        text: "In MgO the oxidation number of magnesium is +2 since the charge on the magnesium ion is 2+ — for a simple metal ion, the oxidation number and the ionic charge are the same number.",
      },
      {
        k: "wow",
        text: "Metals climb, non-metals fall — and every full ionic equation is just one of each movement, paired so the electrons cancel.",
      },
    ],
  },
  {
    spec: "8.10",
    statement:
      "be able to write ionic half-equations and use them to construct full ionic equations",
    title: "Half-equations and full ionic equations",
    blocks: [
      {
        k: "p",
        text: "A half equation represents either an oxidation or reduction. Oxidation half equations have electrons on the right hand side:  X → X^+^ + 1e^−^. Reduction half equations have electrons on the left hand side:  X + 1e^−^ → X^−^.",
      },
      { k: "h", text: "Balancing ionic half equations: straightforward example" },
      {
        k: "steps",
        caption: "Balancing simple half equations",
        items: [
          { title: "Step 1", text: "Write down the formula of the reactants and products." },
          { title: "Step 2", text: "Balance the atoms." },
          { title: "Step 3", text: "Add electrons to right hand side if it is oxidation and to left hand side if it is reduction." },
          { title: "Step 4", text: "Change the number of electrons to balance the charge on both sides of the equation." },
        ],
      },
      {
        k: "worked",
        title: "Worked example · the two straightforward cases",
        question: "Write the half equation for iron(II) being oxidized to iron(III), and for chlorine being reduced to chloride.",
        steps: [
          "Fe^2+^ → Fe^3+^ — the atom is already balanced.",
          "Add the electron on the right (oxidation):  Fe^2+^ → Fe^3+^ + e^−^.",
          "Cl~2~ → Cl^−^ — balance the atoms first:  Cl~2~ → 2Cl^−^.",
          "Add two electrons on the left (reduction):  Cl~2~ + 2e^−^ → 2Cl^−^.",
        ],
        answer: "Fe^2+^ → Fe^3+^ + e^−^  (oxidation)  ·  Cl~2~ + 2e^−^ → 2Cl^−^  (reduction)",
      },
      { k: "h", text: "Balancing half equations in acidic medium" },
      {
        k: "steps",
        caption: "Balancing half equations in acidic medium",
        items: [
          { title: "Step 1", text: "Write down the formula of the reactants and products." },
          { title: "Step 2", text: "Balance the atoms other than oxygen and hydrogen." },
          { title: "Step 3", text: "Balance oxygen atoms by adding H~2~O to the side which requires oxygen atoms." },
          { title: "Step 4", text: "Balance hydrogen atoms by adding H^+^ to the side which requires hydrogen atoms." },
          { title: "Step 5", text: "Add electrons to balance the charge in both sides of the equation." },
        ],
      },
      {
        k: "worked",
        title: "Worked example · MnO~4~^−^ → Mn^2+^ in acidic medium",
        question: "Balance the half equation MnO~4~^−^ → Mn^2+^ in acidic medium.",
        steps: [
          "Step 1 — MnO~4~^−^ → Mn^2+^",
          "Step 2 — MnO~4~^−^ → Mn^2+^ (Mn balanced)",
          "Step 3 — balance oxygen with water:  MnO~4~^−^ → Mn^2+^ + 4H~2~O",
          "Step 4 — balance hydrogen with H^+^:  MnO~4~^−^ + 8H^+^ → Mn^2+^ + 4H~2~O",
          "Step 5 — balance the charge:  MnO~4~^−^ + 8H^+^ + 5e^−^ → Mn^2+^ + 4H~2~O  (+7 on the left side and +2 on the right, so the charge is balanced by adding 5e^−^ to the left side)",
        ],
        answer: "MnO~4~^−^ + 8H^+^ + 5e^−^ → Mn^2+^ + 4H~2~O",
      },
      { k: "h", text: "Balancing half equations in alkaline medium" },
      {
        k: "steps",
        caption: "Balancing half equations in alkaline medium",
        items: [
          { title: "Step 1", text: "Write down the formula of the reactants and products." },
          { title: "Step 2", text: "Balance the atoms other than oxygen and hydrogen." },
          { title: "Step 3", text: "Add OH^−^ to the side which requires oxygen atoms and double the number of OH^−^ to the required number of oxygen atoms." },
          { title: "Step 4", text: "Balance hydrogen atoms by adding H~2~O to the side which requires hydrogen atoms." },
          { title: "Step 5", text: "Add electrons to balance the charge in both sides of the equation." },
        ],
      },
      {
        k: "worked",
        title: "Worked example · MnO~4~^−^ → Mn^2+^ in alkaline medium",
        question: "Balance the half equation MnO~4~^−^ → Mn^2+^ in alkaline medium.",
        steps: [
          "Step 1 — MnO~4~^−^ → Mn^2+^",
          "Step 2 — MnO~4~^−^ → Mn^2+^ (Mn balanced)",
          "Step 3 — add hydroxide to the oxygen-hungry side:  MnO~4~^−^ → Mn^2+^ + 8OH^−^  (4 oxygen atoms on the left side, so 4 × 2 = 8 OH^−^)",
          "Step 4 — balance hydrogen with water:  MnO~4~^−^ + 4H~2~O → Mn^2+^ + 8OH^−^",
          "Step 5 — balance the charge:  MnO~4~^−^ + 4H~2~O + 5e^−^ → Mn^2+^ + 8OH^−^  (−1 on the left side and −6 on the right, so the charge is balanced by adding 5e^−^ to the left side)",
        ],
        answer: "MnO~4~^−^ + 4H~2~O + 5e^−^ → Mn^2+^ + 8OH^−^",
      },
      { k: "h", text: "Writing balanced overall equations" },
      {
        k: "steps",
        caption: "Writing balanced overall equations",
        items: [
          { title: "Step 1", text: "Write the balanced half equation for oxidation and for reduction." },
          { title: "Step 2", text: "Multiply the equations so that the number of electrons in each is the same." },
          { title: "Step 3", text: "Add the equations and cancel out the electrons on either side of the equation." },
          { title: "Step 4", text: "If necessary, cancel out any other species which appear on both sides." },
        ],
      },
      {
        k: "worked",
        title: "Worked example · manganate(VII) and iron(II)",
        question: "Construct the full ionic equation for the reaction between manganate(VII) and iron(II) ions.",
        steps: [
          "Write both half equations:  Fe^2+^ → Fe^3+^ + e^−^  [oxidation]  ·  MnO~4~^−^ + 8H^+^ + 5e^−^ → Mn^2+^ + 4H~2~O  [reduction]",
          "Multiply so the electrons match:  5Fe^2+^ → 5Fe^3+^ + 5e^−^  (× 5)  ·  MnO~4~^−^ + 8H^+^ + 5e^−^ → Mn^2+^ + 4H~2~O  (× 1)",
          "Add and cancel the five electrons from each side.",
        ],
        answer: "5Fe^2+^ + MnO~4~^−^ + 8H^+^ → 5Fe^3+^ + Mn^2+^ + 4H~2~O",
      },
    ],
  },
];
