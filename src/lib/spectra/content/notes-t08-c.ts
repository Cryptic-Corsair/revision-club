import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 8 revision note · Part 8C — Inorganic chemistry of Group 7
   (spec 8.24–8.28)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 8C
   class note (2021, semester 2); page furniture omitted. The
   worksheet blanks the note leaves for students — the displacement
   table, the sodium-halide equations, the silver-halide equations
   and the metal-halide examples — are filled in as answers; the
   exercise drill itself is left to the book. Each method —
   predicting a displacement, writing the analogous alkali
   reactions, building an overall equation from half-equations, and
   dissolving a hydrogen halide in water — keeps exactly one worked
   example, worked in full.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only — the marker is for the words that name the
   idea, not for whole clauses.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T08_C: SpecSection[] = [
  {
    spec: "8.24",
    statement:
      "understand reasons for the trends for Group 7 elements in: i melting and boiling temperatures and physical state at room temperature ii electronegativity iii reactivity down the group",
    title: "Trends in Group 7",
    blocks: [
      { k: "h", text: "Introduction to the Group 7 elements" },
      {
        k: "bullets",
        items: [
          "The elements in group VII are known as **halogens**.",
          "The term 'halogen' is derived from Greek meaning 'salt producing'. Halogens are very reactive and readily form salts called halides.",
          "All have the electronic configuration ns^2^ np^5^.",
          "They exist as separate diatomic molecules (F~2~, Cl~2~, Br~2~ and I~2~).",
        ],
      },
      {
        k: "table",
        caption:
          "Appearance — the class note's table. (Its hydrocarbon-solvent cell for F~2~ is left blank.)",
        head: ["", "F~2~", "Cl~2~", "Br~2~", "I~2~"],
        rows: [
          ["Colour", "Pale yellow", "Green", "Red-brown", "Shiny greyish black"],
          ["State (at RTP)", "gas", "gas", "liquid", "solid"],
          ["In water", "very pale yellow", "pale green", "reddish brown", "pale brown"],
          ["In hydrocarbon solvents", "—", "pale green", "reddish brown", "violet"],
        ],
      },
      { k: "h", text: "Changes of state" },
      {
        k: "bullets",
        items: [
          "When bromine is left at room temperature it gives off brown vapour: Br~2~(l) → Br~2~(g).",
          "When iodine is left at room temperature, it gives off brown vapour without melting. This change is called ==sublimation==: I~2~(s) → I~2~(g).",
        ],
      },
      { k: "h", text: "Atomic radius" },
      {
        k: "p",
        text: "Atomic radius ==increases down the Group 7== as the outer most electrons are further away from the nuclei.",
      },
      {
        k: "table",
        caption: "Atomic radii from the class note",
        head: ["", "F", "Cl", "Br", "I"],
        rows: [["Atomic radius / nm", "0.064", "0.099", "0.111", "0.128"]],
      },
      { k: "h", text: "Melting and boiling temperature" },
      {
        k: "bullets",
        items: [
          "Melting and boiling temperatures increases down the group.",
          "This is because as the size of the halogen increases the number of electrons also increases.",
          "This increases the strength of ==London forces== or instantaneous dipole-induced dipole attraction.",
          "Therefore, more energy is required to overcome the forces between molecules.",
        ],
      },
      { k: "h", text: "Electronegativity" },
      {
        k: "def",
        term: "Electronegativity",
        text: "The ability of an atom to attract the shared pair of electrons in a covalent bond.",
      },
      {
        k: "p",
        text: "Electronegativity ==decreases down the group==. The electronegativity of fluorine is the highest of all elements.",
      },
      {
        k: "bullets",
        items: [
          "This is because as the size of the atom increases, the number of shells increases.",
          "This increases the ==shielding== of the nucleus by the inner shell electrons.",
          "As a result, the ability of the nucleus to attract electron pair is reduced.",
        ],
      },
      { k: "h", text: "Reactivity" },
      {
        k: "p",
        text: "The reactivity of halogens ==decreases down the group==. F~2~ is most reactive and I~2~ is least reactive.",
      },
      {
        k: "bullets",
        items: [
          "The decrease in reactivity can be explained with reference to the same factors used to explain the decrease in electronegativity down the group.",
          "Electron affinity also decreases down the group, therefore it is less easy to form anions.",
        ],
      },
      {
        k: "figure",
        kind: "g7-trends",
        caption:
          "Down the group the molecules stack on electrons and boil higher — while the same growing shield weakens the nucleus's grip, so electronegativity, oxidising power and reactivity all fall.",
      },
      {
        k: "wow",
        text: "One column, two opposite drifts: more electrons mean stronger London forces and higher boiling temperatures — but the same growing shield means a weaker grip on the shared pair, so electronegativity and reactivity fall.",
      },
    ],
  },
  {
    spec: "8.25",
    statement:
      "understand the trend in reactivity of Group 7 elements in terms of the redox reactions of Cl~2~, Br~2~ and I~2~ with halide ions in aqueous solution. Students are expected to know the colours of the elements in standard conditions, in aqueous solution and in a non-polar organic solvent.",
    title: "Displacement reactions and the halogen colours",
    blocks: [
      {
        k: "bullets",
        items: [
          "Halogens are ==strong oxidizing agents== (as they need an electron to complete their outer shell), as they accept electrons and get reduced.",
          "The oxidizing power of the halogen decreases as we move down the group from F to I: F~2~ > Cl~2~ > Br~2~ > I~2~.",
          "This is because as the size of the atoms increases down a group, shielding increases.",
          "Therefore, the ability of the atoms to accept electrons decreases (form −1 ions) and hence their oxidising power decreases.",
        ],
      },
      {
        k: "p",
        text: "Halogens undergo ==displacement reactions==, in which a more reactive halogen can displace a less reactive halogen from one of its compound.",
      },
      {
        k: "bullets",
        items: [
          "Chlorine will displace bromide and iodide ions from solution.",
          "Bromine will displace iodide ions from solution, but not chloride ions.",
          "Iodine cannot displace either bromide or chloride ions from solution.",
        ],
      },
      {
        k: "figure",
        kind: "halogen-colours",
        caption:
          "The three colour rows to memorise: the elements themselves, their aqueous colours, and their colours in a non-polar hydrocarbon solvent.",
      },
      {
        k: "figure",
        kind: "displacement",
        caption:
          "Read the matrix by oxidising power: a halogen takes electrons from any halide below it on the F~2~ > Cl~2~ > Br~2~ > I~2~ ladder — never from one above.",
      },
      {
        k: "table",
        caption: "The class note's displacement table, filled in",
        head: ["Halogen added", "Observation", "KCl(aq)", "KBr(aq)", "KI(aq)"],
        rows: [
          ["chlorine (aq)", "Appearance of aqueous solution", "very pale green", "reddish brown", "pale brown"],
          ["", "Appearance of cyclohexane", "very pale green", "reddish brown", "violet"],
          ["", "Displacement reaction", "no reaction", "Br^−^ displaced", "I^−^ displaced"],
          ["", "Chemical equation (ionic)", "—", "Cl~2~ + 2Br^−^ → 2Cl^−^ + Br~2~", "Cl~2~ + 2I^−^ → 2Cl^−^ + I~2~"],
          ["bromine (aq)", "Appearance of aqueous solution", "reddish brown", "reddish brown", "pale brown"],
          ["", "Appearance of cyclohexane", "reddish brown", "reddish brown", "violet"],
          ["", "Displacement reaction", "no reaction", "no reaction", "I^−^ displaced"],
          ["", "Chemical equation (ionic)", "—", "—", "Br~2~ + 2I^−^ → 2Br^−^ + I~2~"],
          ["iodine (aq)", "Appearance of aqueous solution", "pale brown", "pale brown", "pale brown"],
          ["", "Appearance of cyclohexane", "violet", "violet", "violet"],
          ["", "Displacement reaction", "no reaction", "no reaction", "no reaction"],
          ["", "Chemical equation (ionic)", "—", "—", "—"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · predicting a displacement",
        question:
          "Write an ionic equation for the reaction between bromine and sodium astatide.",
        steps: [
          "Astatine sits below iodine in Group 7, so its oxidising power is even weaker: F~2~ > Cl~2~ > Br~2~ > I~2~ > At~2~.",
          "Bromine is therefore the stronger oxidising agent: it accepts electrons from At^−^ and is reduced to Br^−^, while the astatide ion is oxidised to astatine.",
          "Half-equations: Br~2~ + 2e^−^ → 2Br^−^ and 2At^−^ → At~2~ + 2e^−^ — add them and cancel the two electrons.",
        ],
        answer: "Br~2~ + 2At^−^ → 2Br^−^ + At~2~",
      },
      {
        k: "wow",
        text: "Chlorine strips bromide and iodide from their salts; bromine can only manage iodide; iodine takes nothing from anybody — the displacement table is the oxidising-power ladder F~2~ > Cl~2~ > Br~2~ > I~2~ written in colour.",
      },
    ],
  },
  {
    spec: "8.26",
    statement:
      "understand, in terms of changes in oxidation number, the following reactions of the halogens: i oxidation reactions with Group 1 and 2 metals ii the disproportionation reaction of chlorine with water and the use of chlorine in water treatment iii the disproportionation reaction of chlorine with cold, dilute aqueous sodium hydroxide to form bleach iv the disproportionation reaction of chlorine with hot alkali v reactions analogous to those specified above",
    title: "Chlorine's reactions and disproportionation",
    blocks: [
      { k: "h", text: "Metals of Group 1 and 2" },
      {
        k: "bullets",
        items: [
          "Metals react with halogens on heating to form halides or white ionic salts.",
          "Reactions are most vigorous between elements at the bottom of Group 1 and 2, and elements at the top of Group 7. The most vigorous reaction should be between caesium (or francium) and fluorine, and the least vigorous between beryllium and iodine (or astatine).",
          "These reactions are redox reactions in which the halogen acts as an ==oxidizing agent==.",
          "The oxidation number of the halogen decreases from 0 to −1 and the oxidation number of the metal increases from 0 to +1 or +2, depending on the group.",
        ],
      },
      {
        k: "table",
        caption: "The class note's metal–halogen patterns, filled in",
        head: ["", "Group I metal", "Group II metal"],
        rows: [
          ["General equation", "2M + X~2~ → 2MX", "M + X~2~ → MX~2~"],
          ["Example 1", "2Li + Cl~2~ → 2LiCl", "Mg + Cl~2~ → MgCl~2~"],
          ["Example 2", "2Na + Br~2~ → 2NaBr", "Ca + Cl~2~ → CaCl~2~"],
          ["Example 3", "—", "Sr + Br~2~ → SrBr~2~"],
        ],
      },
      { k: "h", text: "Disproportionation reactions of chlorine" },
      {
        k: "def",
        term: "Disproportionation",
        text: "In disproportionation, one element undergoes both oxidation and reduction at the same time.",
      },
      { k: "h", text: "Chlorine with water" },
      {
        k: "bullets",
        items: [
          "When chlorine is added to water, it dissolves to form ==chlorine water==.",
          "Some of the dissolved chlorine also react to form a mixture of two acids, hydrochloric acid and chloric(I) acid (commonly called hypochlorous acid).",
        ],
      },
      { k: "eq", eq: "Cl~2~ + H~2~O → HCl + HClO" },
      {
        k: "bullets",
        items: [
          "HClO is a mild oxidising agent and effective at killing bacteria without being harmful to humans. For this reason, a small amount of chlorine dissolved in water will sterilize the water and chlorine is widely used in swimming pools and in water treatment.",
        ],
      },
      { k: "h", text: "Chlorine with COLD alkali" },
      {
        k: "bullets",
        items: [
          "When chlorine is added to COLD dilute aqueous sodium hydroxide, it reacts to form the salts of the acids.",
          "These salts are sodium chloride and ==sodium chlorate(I)==, which is also known as sodium hypochlorite.",
          "The disproportionation that occurs can be shown using the oxidation numbers.",
        ],
      },
      {
        k: "eq",
        eq: "2NaOH(aq) + Cl~2~(g) → NaCl(aq) + NaOCl(aq) + H~2~O(l)",
      },
      {
        k: "bullets",
        items: [
          "The sodium chlorate(I) formed is also a disinfectant, but it is mainly known for its bleaching action. It is used extensively in industry and is the ==active ingredient in household bleach==.",
        ],
      },
      { k: "h", text: "Chlorine with HOT alkali" },
      {
        k: "bullets",
        items: [
          "When chlorine is added to HOT concentrated sodium hydroxide solution, it reacts to form sodium chloride and a different product, ==sodium chlorate(V)==.",
          "Chlorine is oxidized to +5 state.",
          "The sodium chlorate(V) formed is also used in bleaching, and as a weed killer.",
          "Bromine and iodine react in the similar ways.",
        ],
      },
      {
        k: "eq",
        eq: "6NaOH(aq) + 3Cl~2~(aq) → 5NaCl(aq) + NaClO~3~(aq) + 3H~2~O(l)",
        note: "With the hot alkali the chlorine climbs all the way to +5 — a bigger climb than the +1 of the cold.",
      },
      {
        k: "figure",
        kind: "cl2-fates",
        caption:
          "One starting oxidation number, three landings: in every panel one chlorine atom falls to −1 while its partner climbs — to +1 in the water and cold-alkali reactions, all the way to +5 with the hot alkali.",
      },
      {
        k: "worked",
        title: "Worked example · the analogous bromine reactions",
        question:
          "Write equations and name the products of the reaction between bromine and (a) cold dilute aqueous sodium hydroxide, (b) hot concentrated sodium hydroxide solution.",
        steps: [
          "Bromine and iodine react in the similar ways (spec point v — the analogous reactions): swap every Cl for Br in the cold-alkali and hot-alkali equations.",
          "(a) 2NaOH + Br~2~ → NaBr + NaOBr + H~2~O — the products are sodium bromide and sodium bromate(I), the bromine analogue of bleach.",
          "(b) 6NaOH + 3Br~2~ → 5NaBr + NaBrO~3~ + 3H~2~O — bromine is oxidized to the +5 state in sodium bromate(V).",
        ],
        answer:
          "(a) sodium bromide + sodium bromate(I), NaOBr · (b) sodium bromide + sodium bromate(V), NaBrO~3~",
      },
      {
        k: "wow",
        text: "Chlorine cannot decide: in every one of these reactions it splits itself in two — one atom falling to −1, its partner climbing to +1 in water and cold alkali, and all the way to +5 when the alkali is hot.",
      },
    ],
  },
  {
    spec: "8.27",
    statement:
      "understand the following reactions: i solid Group 1 halides with concentrated sulfuric acid, to illustrate the trend in reducing ability of the hydrogen halides ii precipitation reactions of the aqueous anions Cl^−^, Br^−^ and I^−^ with aqueous silver nitrate solution and nitric acid, and the solubility of the precipitates in aqueous ammonia solution iii hydrogen halides with ammonia gas (to produce ammonium halides) and with water (to produce acids)",
    title: "Reactions of the halides",
    blocks: [
      { k: "h", text: "Reducing agent" },
      {
        k: "bullets",
        items: [
          "The halide ions are ==reducing agents==, as they can lose electrons and get oxidized.",
          "Reducing power of halide ions ==increases down the group==. Iodide ions are the most reducing, followed by bromide ions. Fluoride ions have no significant reducing properties.",
          "This is because as the number of shells in the ion increases, there is more shielding of the nucleus and the outer electrons become less strongly held.",
          "These electrons are thus lost more easily and the halide ion is more readily oxidised.",
        ],
      },
      {
        k: "table",
        caption: "The class note's crossover — oxidising power runs one way, reducing power the other",
        head: ["Oxidising power", "Halogen", "Halide", "Reducing power"],
        rows: [
          ["High", "fluorine F~2~", "fluoride F^−^", "Low"],
          ["", "chlorine Cl~2~", "chloride Cl^−^", ""],
          ["", "bromine Br~2~", "bromide Br^−^", ""],
          ["", "iodine I~2~", "iodide I^−^", ""],
          ["Low", "astatine At~2~", "astatide At^−^", "High"],
        ],
      },
      { k: "h", text: "Reaction of halide ions with concentrated sulphuric acid" },
      {
        k: "bullets",
        items: [
          "The variation in reducing strength of the halides can be clearly seen in the reaction of the sodium halides with concentrated sulphuric acid.",
          "Concentrated sulfuric acid can act as an oxidizing agent and as well as an acid.",
          "When it acts as an oxidizing agent, it is reduced, but the extent of its reduction and the products formed depends on the species being oxidized.",
          "The three possible reduction products are sulfur dioxide, sulfur and hydrogen sulfide.",
        ],
      },
      {
        k: "table",
        caption:
          "Observations verbatim from the class note; the equations filled in",
        head: ["NaX", "Observation", "Equation"],
        rows: [
          ["NaCl(s)", "Misty fumes (HCl)", "NaCl + H~2~SO~4~ → NaHSO~4~ + HCl"],
          ["NaBr(s)", "Misty fumes (HBr)", "NaBr + H~2~SO~4~ → NaHSO~4~ + HBr"],
          [
            "",
            "Brown fumes (Br~2~); colourless gas with choking odour (SO~2~)",
            "2HBr + H~2~SO~4~ → Br~2~ + SO~2~ + 2H~2~O",
          ],
          ["NaI(s)", "Misty fumes (HI)", "NaI + H~2~SO~4~ → NaHSO~4~ + HI"],
          [
            "",
            "Purple fumes + black ppt (I~2~); colourless gas with choking odour (SO~2~)",
            "2HI + H~2~SO~4~ → I~2~ + SO~2~ + 2H~2~O",
          ],
          ["", "Yellow ppt (S)", "6HI + H~2~SO~4~ → 3I~2~ + S + 4H~2~O"],
          ["", "Colourless gas with rotten egg smell (H~2~S)", "8HI + H~2~SO~4~ → 4I~2~ + H~2~S + 4H~2~O"],
        ],
      },
      {
        k: "figure",
        kind: "h2so4-ladder",
        caption:
          "Each extra shell hands the halide more reducing power, and the sulfur in H~2~SO~4~ is dragged further down its own ladder: +6 in the acid, +4 in SO~2~, 0 in sulfur, −2 in H~2~S.",
      },
      {
        k: "worked",
        title: "Worked example · building the overall equation from half-equations",
        question:
          "Use half-equations to construct an overall equation for the reaction between iodide ions and concentrated sulfuric acid that results in the formation of hydrogen sulfide.",
        steps: [
          "Reduction half-equation: H~2~SO~4~ + 8H^+^ + 8e^−^ → H~2~S + 4H~2~O — the sulfur falls from +6 to −2 and needs eight electrons.",
          "Oxidation half-equation: 2I^−^ → I~2~ + 2e^−^ — multiply it by 4 to supply eight electrons: 8I^−^ → 4I~2~ + 8e^−^.",
          "Add the half-equations; the eight electrons cancel from both sides.",
        ],
        answer: "H~2~SO~4~ + 8H^+^ + 8I^−^ → H~2~S + 4H~2~O + 4I~2~",
      },
      { k: "h", text: "Testing for halide ions in solutions" },
      {
        k: "bullets",
        items: [
          "The analysis of the halide ions is based on the solubilities of the silver halides.",
          "The reagent is ==silver nitrate solution==, but dilute nitric acid is added first to make sure that any other anions (especially carbonate ions) are removed, as they would also form precipitates.",
          "If a precipitate is obtained, dilute or concentrated ammonia is added to further confirm the halide ion.",
        ],
      },
      {
        k: "steps",
        caption: "The halide test",
        items: [
          {
            title: "Acidify first",
            text: "Add dilute nitric acid to make sure any other anions — especially carbonate ions — are removed, as they would also form precipitates.",
          },
          {
            title: "Add silver nitrate",
            text: "Aqueous silver nitrate drops in: chloride gives a white precipitate, bromide cream, iodide yellow.",
          },
          {
            title: "Confirm with ammonia",
            text: "Add dilute ammonia, then concentrated ammonia — how much of the precipitate dissolves pins down which halide it is.",
          },
        ],
      },
      {
        k: "table",
        caption: "The class note's silver-halide table, filled in",
        head: ["Anion", "Precipitate with AgNO~3~ / HNO~3~", "Solubility in ammonia", "Equations"],
        rows: [
          [
            "Chloride",
            "White precipitate of AgCl(s)",
            "Soluble in both dilute and concentrated ammonia",
            "Ag^+^ + Cl^−^ → AgCl(s) · AgCl + 2NH~3~ → [Ag(NH~3~)~2~]^+^ + Cl^−^",
          ],
          [
            "Bromide",
            "Cream precipitate of AgBr(s)",
            "Slightly soluble in dilute ammonia, soluble in concentrated ammonia",
            "Ag^+^ + Br^−^ → AgBr(s) · AgBr + 2NH~3~ → [Ag(NH~3~)~2~]^+^ + Br^−^",
          ],
          [
            "Iodide",
            "Yellow precipitate of AgI(s)",
            "Insoluble in both",
            "Ag^+^ + I^−^ → AgI(s)",
          ],
        ],
      },
      {
        k: "figure",
        kind: "halide-test",
        caption:
          "White, cream, yellow — and ammonia tells them apart: silver chloride dissolves in both strengths, silver bromide needs the concentrated reagent, silver iodide dissolves in neither.",
      },
      { k: "h", text: "Hydrogen halides" },
      {
        k: "bullets",
        items: [
          "Hydrogen halides are colourless gases and exist as ==polar diatomic molecules==.",
          "They are formed when hydrogen reacts with halogens.",
        ],
      },
      { k: "h", text: "Reactions with water" },
      {
        k: "bullets",
        items: [
          "The hydrogen halides readily react with water to form ==acidic solutions==, all of which are colourless.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · a hydrogen halide in water",
        question:
          "Write an equation for the reaction between hydrogen bromide and water, and explain the effect that the solution formed has on methyl orange indicator.",
        steps: [
          "Hydrogen bromide is a polar diatomic molecule that hands its proton to a water molecule — the acidic solution is hydrobromic acid.",
          "All the hydrogen-halide solutions are acids, so methyl orange turns red.",
        ],
        answer: "HBr(g) + H~2~O(l) → H~3~O^+^(aq) + Br^−^(aq) — methyl orange turns red",
      },
      { k: "h", text: "Reaction with ammonia" },
      {
        k: "bullets",
        items: [
          "Hydrogen halides react with ammonia gas to form salts, all of which are white ionic solids.",
        ],
      },
      {
        k: "eq",
        eq: "HCl(g) + NH~3~(g) → NH~4~Cl(s)",
        note: "The ammonium halides — the same white ionic solid for every hydrogen halide.",
      },
      {
        k: "wow",
        text: "The halide's extra shells cut both ways: iodide grips its own outer electrons so loosely that it drags the sulfur of H~2~SO~4~ all the way down to H~2~S — and silver iodide refuses the ammonia: even the concentrated reagent cannot pull it into solution.",
      },
    ],
  },
  {
    spec: "8.28",
    statement:
      "be able to make predictions about fluorine and astatine and their compounds, in terms of knowledge of trends in halogen chemistry",
    title: "Predictions — fluorine and astatine",
    blocks: [
      {
        k: "p",
        text: "If you are asked to predict reactions of fluorides and astatides that you are not familiar with, you can use information in this topic to help you. For example, you could write an equation to show the formation of an acid when hydrogen astatide is added to water, based on the equation for hydrogen iodide.",
      },
      {
        k: "worked",
        title: "Worked example · hydrogen astatide in water",
        question:
          "Predict the equation for the formation of an acid when hydrogen astatide is added to water, based on the equation for hydrogen iodide.",
        steps: [
          "Hydrogen iodide in water gives H~3~O^+^ + I^−^ — hydrogen astatide sits one rung lower in the group, so swap every I for At.",
          "HAt is still a polar diatomic gas that hands its proton to water, so the solution is acidic.",
        ],
        answer: "HAt(g) + H~2~O(l) → H~3~O^+^(aq) + At^−^(aq)",
      },
      {
        k: "note",
        label: "The astatine predictions",
        text: "Astatine sits below iodine, so read every trend one rung further: least electronegative and least reactive halogen, weakest oxidising agent — bromine displaces astatide from solution — its melting and boiling temperatures are the highest of the group, and astatide, At^−^, is the strongest reducing agent of the halides.",
      },
      {
        k: "wow",
        text: "Astatine is too rare for the lab bench — its chemistry is the trend sheet read aloud: every reaction iodine manages, astatine manages less eagerly, and every electron iodide gives up reluctantly, astatide hands over first.",
      },
    ],
  },
];
