import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 6 revision note · sections 6.6 – 6.11 (Part 6B)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 6
   class note (2021, semester 2) — Energetics; page furniture and
   image-only drills omitted. The exercises that are specified in
   words are worked in full.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T06_B: SpecSection[] = [
  {
    spec: "6.6",
    statement:
      "know Hess’s Law and be able to apply it to: i constructing enthalpy cycles ii calculating enthalpy changes of reaction using data provided, or data selected from a table or obtained from experiments",
    title: "Hess's law",
    blocks: [
      {
        k: "def",
        term: "Hess's Law",
        text: "The enthalpy change of a chemical reaction is ==independent of the path taken== in converting reactants into products, provided the ==initial and final conditions are the same==.",
      },
      {
        k: "p",
        text: "For some reactions the enthalpy changes ==cannot be measured directly== due to:",
      },
      {
        k: "bullets",
        items: [
          "==High activation energy==",
          "==Slow rate of reaction==",
          "==More than one reaction occurring at the same time==",
          "==Difficult to measure temperature change==",
          "==Reaction does not stop== when the stated products are formed",
        ],
      },
      {
        k: "bullets",
        items: [
          "Hess's law allows to work out enthalpy changes that are ==not possible to measure==.",
          "Used for calculating changes which can’t be measured directly — ==Lattice Enthalpy== (the enthalpy change involved in formation of the ionic compound from gaseous ions).",
          "Used for calculating: enthalpy change of reaction from ==bond enthalpy==; enthalpy change of reaction from ==ΔH°~c~==; enthalpy change of formation from ==ΔH°~f~==.",
        ],
      },
      {
        k: "note",
        label: "Enthalpy cycles",
        text: "The ==total energy for each route is the same==: these are called ==Enthalpy cycles== or ==Hess's cycles==.",
      },
      {
        k: "figure",
        kind: "hess-general",
        caption: "The two general routes. **Combustion data**: reactants + oxygen and products + oxygen both burn to the ==same combustion products==. **Formation data**: the ==elements== build the reactants on one route and the products on the other.",
      },
      { k: "h", text: "Example 1 · Δ~f~H^θ^ of carbon monoxide from combustion data" },
      {
        k: "p",
        text: "The Standard enthalpy change of formation of carbon monoxide is difficult to measure directly as ==some amount of carbon dioxide may form==. Hence, this enthalpy can be calculated using the enthalpy changes of combustion of carbon and carbon monoxide which can be determined experimentally.",
      },
      {
        k: "eq",
        eq: "C(s, graphite) + O~2~(g) → CO~2~(g)    Δ~c~H^θ^ = −394 kJ mol^−1^",
      },
      {
        k: "eq",
        eq: "CO(g) + ½O~2~(g) → CO~2~(g)    Δ~c~H^θ^ = −283 kJ mol^−1^",
      },
      { k: "h", text: "Method 1 — subtract equations" },
      {
        k: "p",
        text: "Reverse the second equation above and then add to the first:",
      },
      {
        k: "eq",
        eq: "C(s, graphite) + O~2~(g) → CO~2~(g)    Δ~c~H^θ^ = −394 kJ mol^−1^",
      },
      {
        k: "eq",
        eq: "CO~2~(g) → CO(g) + ½O~2~(g)    Δ~c~H^θ^ = −283 kJ mol^−1^",
      },
      {
        k: "eq",
        eq: "C(s, graphite) + ½O~2~(g) → CO(g)",
        note: "Adding the two equations give: therefore Δ~f~H^θ^ [CO(g)] = ==−111 kJ mol^−1^==.",
      },
      { k: "h", text: "Method 2 — using Hess's cycle" },
      {
        k: "figure",
        kind: "hess-co",
        caption: "Both routes land on the ==same combustion product==, CO~2~(g): straight across the top, or burn the elements to CO~2~ (−394) and undo the burning of CO (−283).",
      },
      {
        k: "eq",
        eq: "Δ~f~H^θ^ + (−283) = −394 kJ mol^−1^    Δ~f~H^θ^ = −111 kJ mol^−1^",
      },
      { k: "h", text: "Example 2 · Δ~f~H^θ^ of methane from combustion data" },
      {
        k: "steps",
        caption: "Calculate the enthalpy of formation of methane, CH~4~(g), using the enthalpy of combustion data",
        items: [
          { title: "Step 1", text: "Write the equation for the formation of the compound: ==C(s, graphite) + 2H~2~(g) → CH~4~(g)==." },
          { title: "Step 2", text: "Construct an energy cycle using the enthalpies of combustion." },
          { title: "Step 3", text: "Apply Hess's law to the cycle: Δ~f~H^θ^ + (−890) = (−394) + (2 × −286)." },
        ],
      },
      {
        k: "figure",
        kind: "hess-ch4",
        caption: "The elements and the methane all burn to the ==same products== — CO~2~(g) + 2H~2~O(l). The route through the elements is −394 + 2×−286; the route through methane is Δ~f~H^θ^ + −890.",
      },
      {
        k: "eq",
        eq: "Δ~f~H^θ^ = [−394 + 2(−286)] − (−890)    = −76 kJ mol^−1^",
      },
      {
        k: "table",
        caption: "Enthalpies of combustion",
        head: ["Substance", "Enthalpy of combustion / kJ mol^−1^"],
        rows: [
          ["C(s, graphite)", "−394"],
          ["H~2~(g)", "−286"],
          ["CH~4~(g)", "−890"],
          ["C~2~H~6~(g)", "−1560"],
          ["C~3~H~8~(g)", "−2220"],
        ],
      },
      {
        k: "p",
        text: "In general, when the products are burned, the amount of ==CO~2~ and H~2~O produced is the same== as when the reactants are burned. By applying Hess's law, when combustion data is given:",
      },
      {
        k: "eq",
        eq: "ΔH[reaction] + sum Δ~c~H^θ^ [products] = sum Δ~c~H^θ^ [reactants]",
        note: "ΔH[reaction] = ==sum Δ~c~H^θ^ [reactants] − sum Δ~c~H^θ^ [products]==.",
      },
      { k: "h", text: "Example 3 · Δ~r~H^θ^ from formation data" },
      {
        k: "steps",
        caption: "Calculate the enthalpy change for CaCO₃(s) → CaO(s) + CO₂(g) using the enthalpy of formation data",
        items: [
          { title: "Step 1", text: "Write the equation for the reaction: ==CaCO~3~(s) → CaO(s) + CO~2~(g)==." },
          { title: "Step 2", text: "Construct an energy cycle using the enthalpies of formation." },
          { title: "Step 3", text: "Apply Hess's law to the cycle: Δ~r~H^θ^ + (−1207) = (−635) + (−394)." },
        ],
      },
      {
        k: "table",
        caption: "Enthalpies of formation",
        head: ["Substance", "Enthalpy of formation / kJ mol^−1^"],
        rows: [
          ["CaCO~3~(s)", "−1207"],
          ["CaO(s)", "−635"],
          ["CO~2~(g)", "−394"],
        ],
      },
      {
        k: "figure",
        kind: "hess-caco3",
        caption: "The formation route: the ==elements== build CaCO~3~ with −1207, or build the products CaO + CO~2~ with −635 and −394. The direct decomposition completes either journey.",
      },
      {
        k: "eq",
        eq: "Δ~r~H^θ^ = [(−635) + (−394)] − (−1207)    = +178 kJ mol^−1^",
      },
      {
        k: "p",
        text: "When enthalpy of formation for all the reactants and products are given, the enthalpy change of the reaction can be calculated by drawing Hess's cycle with ==elements== required to form the reactant and products. By applying Hess's Law:",
      },
      {
        k: "eq",
        eq: "sum Δ~f~H^θ^ [reactants] + ΔH[reaction] = sum Δ~f~H^θ^ [products]",
        note: "ΔH[reaction] = ==sum Δ~f~H^θ^ [products] − sum Δ~f~H^θ^ [reactants]==.",
      },
      {
        k: "wow",
        text: "The two boxed rules, side by side: with ==combustion data==, ΔH[reaction] = ==sum Δ~c~H^θ^ [reactants] − sum Δ~c~H^θ^ [products]==; with ==formation data==, ΔH[reaction] = ==sum Δ~f~H^θ^ [products] − sum Δ~f~H^θ^ [reactants]==. Same idea from opposite ends — the arrows of the cycle decide which way the subtraction runs.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 8, Question 2 — formation data and the canister",
        question:
          "(a) The standard enthalpy changes of formation are: C~4~H~10~(g) −134.5, CO~2~(g) −393.5, H~2~O(l) −285.8 kJ mol^−1^. (i) Δ~f~H^θ^ of H~2~O(g) is −241.8 kJ mol^−1^ — explain why this is less negative than for H~2~O(l). (ii) Calculate the standard enthalpy change of combustion of 2-methylpropane. (iii) A refill canister for the cordless hair-styler holds 15 g of 2-methylpropane — calculate the energy in kJ from one canister. (b) The enthalpy change can also be calculated using the atomisation cycle: C~4~H~10~(g) + 6½O~2~(g) → 4CO~2~(g) + 5H~2~O(l), arrows of +8410 kJ mol^−1^ and +11280 kJ mol^−1^ down to 4C(g) + 10H(g) + 13O(g). Calculate the enthalpy change using this cycle.",
        steps: [
          "**(a)(i)** A ==change of physical state is accompanied by an enthalpy change==. H~2~O(g) stops one state short of H~2~O(l) — the extra energy released when vapour condenses to liquid is never given out, so Δ~f~H^θ^ of H~2~O(g) is ==less negative==.",
          "**(ii)** Formation route: C~4~H~10~ + 6½O~2~ → 4CO~2~ + 5H~2~O(l). Δ~c~H^θ^ = sum Δ~f~H^θ^ [products] − sum Δ~f~H^θ^ [reactants] = [4×(−393.5) + 5×(−285.8)] − (−134.5) = (−1574 − 1429) + 134.5 = ==−2868.5 kJ mol^−1^==.",
          "**(iii)** Moles in the canister = 15 ÷ 58 = 0.2586 mol. Energy = 0.2586 × 2868.5 = ==742 kJ== (3 s.f.).",
          "**(b)(i)** Around the cycle: Δ~f~H^θ^ = +8410 − 11280 = ==−2870 kJ mol^−1^== — agreeing with (ii) within rounding.",
        ],
        answer:
          "(ii) Δ~c~H^θ^ = ==−2868.5 kJ mol^−1^== · (iii) ==742 kJ== · (b)(i) ==−2870 kJ mol^−1^== — the formation-data route and the atomisation route land on the same answer, as Hess's law promises.",
      },
      {
        k: "figure",
        kind: "hess-butane",
        caption: "The atomisation cycle of Exercise 8: both sides of the combustion equation are ==pulled apart into gaseous atoms== — +8410 kJ mol^−1^ to atomise the reactants, +11280 kJ mol^−1^ to atomise the products. The difference is the enthalpy change of the reaction.",
      },
    ],
  },
  {
    spec: "6.7",
    statement:
      "CORE PRACTICAL 2 — determination of the enthalpy change of a reaction using Hess’s Law",
    title: "Core Practical 2",
    blocks: [
      {
        k: "p",
        text: "The class note's section ==Hess's Law calculations for other reactions== is Core Practical 2 in action: for each reaction the enthalpy change cannot be measured directly, so ==two reactions that can be measured== are combined by Hess's law.",
      },
      {
        k: "worked",
        title: "Worked example · the thermal decomposition of calcium carbonate",
        question:
          "Calculate Δ~r~H^θ^ for the thermal decomposition of calcium carbonate into calcium oxide and carbon dioxide given the following data. CaCO~3~(s) + 2HCl(aq) → CaCl~2~(aq) + H~2~O(l) + CO~2~(g), Δ~r~H^θ^ = −17 kJ/mol. CaO(s) + 2HCl(aq) → CaCl~2~(aq) + H~2~O(l), Δ~r~H^θ^ = −195 kJ/mol.",
        steps: [
          "Both measured reactions share ==CaCl~2~(aq) + H~2~O(l)== — that is the common level of the cycle.",
          "==Reverse== the second equation — ==when a thermochemical equation is reversed, the sign of ΔH changes==: CaCl~2~(aq) + H~2~O(l) → CaO(s) + 2HCl(aq), Δ~r~H^θ^ = +195 kJ/mol.",
          "==Add== the reversed equation to the first — the CaCl~2~(aq) + H~2~O(l) and the 2HCl(aq) cancel on both sides: CaCO~3~(s) → CaO(s) + CO~2~(g).",
          "Δ~r~H^θ^ = (−17) + (+195) = ==+178 kJ mol^−1^== — the same value Example 3 found from formation data.",
        ],
        answer:
          "Δ~r~H^θ^ = ==+178 kJ mol^−1^== (Ans: +178 kJ mol^−1^) — endothermic, as a decomposition that needs heating should be.",
      },
      {
        k: "worked",
        title: "Worked example · the hydration of anhydrous copper(II) sulfate",
        question:
          "Calculate Δ~r~H^θ^ for the hydration of anhydrous copper(II) sulfate, given the following data. CuSO~4~·5H~2~O + aq → Cu^2+^(aq) + SO~4~^2−^(aq) + 5H~2~O(l), Δ~r~H^θ^ = +11.3 kJ/mol. CuSO~4~(s) + aq → Cu^2+^(aq) + SO~4~^2−^(aq), Δ~r~H^θ^ = −67.0 kJ/mol.",
        steps: [
          "Both measured reactions share the ==dissolved ions==, Cu^2+^(aq) + SO~4~^2−^(aq) — the common level of the cycle.",
          "==Reverse== the first equation (the sign changes): Cu^2+^(aq) + SO~4~^2−^(aq) + 5H~2~O(l) → CuSO~4~·5H~2~O + aq, Δ~r~H^θ^ = −11.3 kJ/mol.",
          "==Add== it to the second equation — the dissolved ions cancel: CuSO~4~(s) + 5H~2~O(l) → CuSO~4~·5H~2~O(s).",
          "Δ~r~H^θ^ = (−67.0) + (−11.3) = ==−78.3 kJ mol^−1^==.",
        ],
        answer:
          "Δ~r~H^θ^ = ==−78.3 kJ mol^−1^== (Ans: −78.3 kJ mol^−1^) — hydration is exothermic.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 8, Question 3 — the sodium hydrogencarbonate determination",
        question:
          "Sodium hydrogencarbonate decomposes on heating: Reaction 1, 2NaHCO~3~(s) → Na~2~CO~3~(s) + H~2~O(l) + CO~2~(g). (a) Suggest why it is difficult to measure the enthalpy change of this reaction directly. (b) Apply Hess's law to Reaction 2, NaHCO~3~(s) + HCl(aq) → NaCl(aq) + H~2~O(l) + CO~2~(g), and Reaction 3, Na~2~CO~3~(s) + 2HCl(aq) → 2NaCl(aq) + H~2~O(l) + CO~2~(g). For Reaction 2: 100 cm^3^ of 1.25 mol dm^−3^ HCl in a 200 cm^3^ polystyrene beaker, initial temperature 21.5 °C; 8.00 g of solid NaHCO~3~ added, lid on, stirred; lowest temperature 14.2 °C. (i) Explain why the beaker is large. (ii) Show by calculation that the hydrochloric acid is in excess. (iii) Calculate the energy transferred and the enthalpy change in kJ mol^−1^ using energy transferred (J) = 100 × 4.18 × temperature change. (iv) Given that Reaction 3 has Δ~r~H^θ^ = −36.3 kJ mol^−1^, calculate the enthalpy change for Reaction 1.",
        steps: [
          "**(a)** Reaction 1 ==decomposes on heating== — there is no reaction mixture whose temperature change could be measured in an insulated container.",
          "**(b)(i)** Reaction 2 ==releases CO~2~(g)== — and 8.00 g of solid is added to 100 cm^3^ of acid; the larger beaker holds the fizzing mixture.",
          "**(ii)** Moles of HCl = 0.100 × 1.25 = 0.125 mol. Moles of NaHCO~3~ = 8.00 ÷ 84 = 0.0952 mol. The reactions are 1:1, so HCl is left over: 0.125 − 0.0952 = ==0.0298 mol in excess==.",
          "**(iii)** Energy transferred = 100 × 4.18 × (21.5 − 14.2) = 100 × 4.18 × 7.3 = ==3051.4 J==. ΔH = +3051.4 J ÷ 0.0952 mol = ==+32.0 kJ mol^−1^== — the temperature ==fell==, so the sign is positive.",
          "**(iv)** Build Reaction 1 from the others: 2 × Reaction 2, then ==reverse== Reaction 3 (its sign changes to +36.3) and add: the 2NaCl, HCl, H~2~O and CO~2~ cancel to leave 2NaHCO~3~ → Na~2~CO~3~ + H~2~O + CO~2~. ΔH~1~ = 2(+32.0) − (−36.3) = ==+100.3 kJ mol^−1^==.",
        ],
        answer:
          "(ii) HCl in excess by 0.0298 mol · (iii) 3051.4 J and ΔH = ==+32.0 kJ mol^−1^== · (iv) ΔH for Reaction 1 = ==+100.3 kJ mol^−1^== — Hess's law measured a reaction that no calorimeter could touch.",
      },
      { k: "checkpoint", page: 159 },
    ],
  },
  {
    spec: "6.8",
    statement:
      "be able to evaluate the results obtained from experiments and comment on sources of error and uncertainty and any assumptions made in the experiments. Students will need to consider experiments where substances are mixed in an insulated container and combustion experiments using, for example, a spirit burner and be able to draw suitable graphs and use cooling curve corrections.",
    title: "Errors, assumptions and cooling curves",
    blocks: [
      { k: "h", text: "Combustion experiment — errors and assumptions" },
      { k: "p", text: "Errors:" },
      {
        k: "bullets",
        items: [
          "==Heat loss== to the surrounding.",
          "==Incomplete combustion== of fuel. It would cause ==black soot== to be deposited on the bottom of the beaker.",
          "The ==conditions are not standard==. Water vapour is formed instead of liquid water.",
          "Some of the heat released in burning ==heats up the air== and not the water.",
          "The ==beaker and thermometer absorb== some of the heat produced.",
        ],
      },
      { k: "p", text: "Assumptions:" },
      {
        k: "bullets",
        items: [
          "==1 cm^3^ of water is equal to 1 g==.",
          "==No heat is lost== to the surrounding.",
          "==All heat energy produced== by ethanol is ==absorbed by water==.",
        ],
      },
      { k: "h", text: "Neutralisation experiment — errors and assumptions" },
      { k: "p", text: "Errors:" },
      {
        k: "bullets",
        items: [
          "==Heat loss== to the surrounding.",
          "The ==polystyrene cup and thermometer absorb== some of the heat produced.",
          "==Uncertainties of measurements== involved with the use of pipette and thermometer.",
        ],
      },
      { k: "p", text: "Assumptions:" },
      {
        k: "bullets",
        items: [
          "==Specific heat capacity== of the resultant solution is ==equal to that of water== (4.18 J g^−1^ °C^−1^).",
          "==Density== of the resultant solution is ==equal to that of water== (1 g cm^−3^).",
          "==No heat is lost== to the surrounding.",
          "==Total volume== of the solution is ==equal to the sum== of the volume of two solutions initially taken.",
        ],
      },
      {
        k: "note",
        label: "Improvements",
        text: "Use a ==lid== on the polystyrene cup — use ==laggings==.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 4 (e)–(g) — judging the methanol experiment",
        question:
          "(e) The experimental value for the enthalpy change of combustion of methanol is ==less negative== than the Data Booklet value. Identify two improvements — to the apparatus or the procedure — that would give a value closer to the Data Booklet, and justify them (no repeats, no better measuring equipment). (f) State and explain the effect on the value if the water was not stirred. (g) If there is insufficient oxygen for complete combustion, what is observed on the underside of the beaker?",
        steps: [
          "**(e) Improvement 1** — put a ==lid== on the beaker (and add ==laggings== round it): cuts the ==heat loss to the surrounding==, so more of the heat released ends up in the water and Δ~c~H comes out ==more negative==.",
          "**(e) Improvement 2** — shield the flame from draughts (a wind shield round the spirit burner): less heat ==heats up the air and not the water==, and the flame burns steadily instead of ==incompletely==.",
          "**(f)** Without stirring the heat stays near the burner — the ==maximum temperature reached== is lower, so Q = mcΔT is smaller and the calculated Δ~c~H is ==less negative== than the true value.",
          "**(g)** ==Black soot== deposited on the bottom of the beaker — the mark of ==incomplete combustion== of the fuel.",
        ],
        answer:
          "(e) lid + laggings, and a wind shield — both attack ==heat loss to the surrounding== · (f) maximum temperature lower → Δ~c~H ==less negative== · (g) ==black soot==.",
      },
      { k: "h", text: "Graphical method — cooling curves" },
      {
        k: "bullets",
        items: [
          "The temperature is taken ==every half minute== ==before== mixing the reactants.",
          "Reactants are mixed ==after 3 minutes== — for example, at exactly ==3.0 minutes or 3.5 minutes==.",
          "Further readings are taken ==every half minute== as the reaction mixture cools.",
          "==Extrapolate the lines== as shown and calculate the value of ==ΔT==.",
          "Extrapolating the graph ==compensates for heat loss== to the surrounding.",
          "In other words, this method ==allows for cooling correction==.",
        ],
      },
      {
        k: "figure",
        kind: "cooling-curve",
        caption: "The method, drawn with the Exercise 6 readings: flat at 20.0 °C before mixing, a sharp rise when the zinc is added at exactly 3.5 minutes, then a slow fall as the mixture cools. The cooling line ==extrapolated back== and the starting line ==carried forward== meet the moment of mixing — ΔT is read between them.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 6 — the zinc / copper(II) sulfate cooling curve",
        question:
          "Zn(s) + Cu^2+^(aq) → Zn^2+^(aq) + Cu(s). 5.0 g of zinc powder is added at exactly 3.5 minutes to 50 cm^3^ of 1.0 mol dm^−3^ CuSO~4~ in a polystyrene cup held in a 250 cm^3^ beaker. Temperature every minute: 20.0, 20.0, 20.0, 20.0, then 63.0, 60.5, 59.0, 57.0, 55.5, 53.0 °C. (a) Plot the graph and use it to find the maximum temperature change ΔT; give ONE reason why a series of readings is taken instead of just the starting and maximum temperatures. (b) Calculate the heat change in joules (c = 4.18 J g^−1^ °C^−1^); state the assumption made about the solution; calculate the amount of CuSO~4~ and the enthalpy change in kJ mol^−1^. (c) Suggest TWO improvements to the procedure, with reasons.",
        steps: [
          "**(a)(i)–(ii)** Plot the points, then extrapolate: the cooling line (falling about 2 °C per minute) carried back to ==3.5 minutes== reaches ==64 °C==, and the starting line sits at 20.0 °C → ΔT = ==44 °C==.",
          "**(a)(iii)** A series of readings lets you ==extrapolate the lines== — the reading at the moment of mixing is recovered from the graph, which ==compensates for heat loss to the surrounding==.",
          "**(b)(i)** Q = 50 × 4.18 × 44 = ==9196 J==.",
          "**(b)(ii)** Assumption: the ==specific heat capacity of the solution is that of water== (4.18 J g^−1^ °C^−1^).",
          "**(b)(iii)** Moles of CuSO~4~ = (1.0 × 50) ÷ 1000 = ==0.05 mol==.",
          "**(b)(iv)** ΔH = −9196 ÷ 1000 ÷ 0.05 = ==−184 kJ mol^−1^== (exothermic — the temperature rose).",
          "**(c)** Take the temperature readings ==every half minute==, as the method describes — more points make the extrapolation of the cooling line more reliable; and use a ==lid== on the polystyrene cup — less ==heat loss to the surrounding==.",
        ],
        answer:
          "ΔT = ==44 °C== · Q = ==9196 J== · 0.05 mol · ΔH = ==−184 kJ mol^−1^== — the extrapolation is what turns a cooling, leaking cup into a fair measurement.",
      },
      { k: "checkpoint", page: 157 },
    ],
  },
  {
    spec: "6.9",
    statement:
      "understand the terms ‘bond enthalpy’ and ‘mean bond enthalpy’, and be able to use bond enthalpies to calculate enthalpy changes, understanding the limitations of this method",
    title: "Bond enthalpy and mean bond enthalpy",
    blocks: [
      {
        k: "def",
        term: "Bond enthalpy, Δ~B~H",
        text: "The enthalpy change when ==1 mol of a bond in the gaseous state== is broken.",
      },
      {
        k: "eq",
        eq: "Cl~2~(g) → 2Cl(g)    Δ~B~H = +243 kJ mol^−1^",
        note: "For diatomic molecules: HCl(g) → H(g) + Cl(g), Δ~B~H = +432 kJ mol^−1^.",
      },
      {
        k: "p",
        text: "For polyatomic molecules, ==each bond must be considered separately==. For example, the four steps of pulling methane apart:",
      },
      {
        k: "table",
        caption: "Each C—H bond in methane, considered separately",
        head: ["Step", "Δ~B~H / kJ mol^−1^"],
        rows: [
          ["CH~4~(g) → CH~3~(g) + H(g)", "+423"],
          ["CH~3~(g) → CH~2~(g) + H(g)", "+480"],
          ["CH~2~(g) → CH(g) + H(g)", "+425"],
          ["CH(g) → C(g) + H(g)", "+335"],
        ],
      },
      {
        k: "def",
        term: "Mean bond enthalpy, E",
        text: "The ==average quantity of energy== required to break ==one mole of covalent bond in a gaseous species== (at a pressure of 1 atm).",
      },
      {
        k: "p",
        text: "The mean bond enthalpy for the C—H bond in methane is approximately ==+416 kJ mol^−1^==: [423 + 480 + 425 + 335] ÷ 4 = ==415.75==. The C—H bond in different compounds would have slightly different bond enthalpy values, so an ==average value== is used.",
      },
      {
        k: "bullets",
        items: [
          "The enthalpy change calculated for a reaction using ==standard enthalpy of formation data or standard enthalpy of combustion data is more accurate== than the enthalpy change calculated for the same reaction using ==bond enthalpy values==.",
          "This is because the bond enthalpy values are ==mean values==.",
        ],
      },
      { k: "h", text: "Using bond enthalpies in a cycle" },
      {
        k: "p",
        text: "Enthalpy change for a reaction can be calculated using bond enthalpy values and ==Hess's cycle==. By applying Hess's law:",
      },
      {
        k: "eq",
        eq: "ΔH[reaction] + sum E[products] = sum E[reactants]",
        note: "ΔH[reaction] = ==sum E[reactants] − sum E[products]==.",
      },
      {
        k: "figure",
        kind: "bond-h2o",
        caption: "The cycle for gaseous water: break every bond in the reactants (E(H—H) + ½E(O=O)) down to gaseous atoms, then make every bond in the products (2E(O—H)). The difference is ΔH~r~.",
      },
      {
        k: "worked",
        title: "Worked example · the enthalpy of reaction for gaseous water",
        question:
          "What is the enthalpy of reaction for the formation of gaseous water, given E(O—H) = +462 kJ mol^−1^, E(H—H) = +436 kJ mol^−1^, E(O=O) = 498 kJ mol^−1^?",
        steps: [
          "ΔH~r~ + 2E[O—H] = E[H—H] + ½E[O=O].",
          "ΔH~r~ = E[H—H] + ½E[O=O] − 2E[O—H].",
          "ΔH~r~ = (436 kJ mol^−1^) + (½ × 498 kJ mol^−1^) − (2 × 462 kJ mol^−1^).",
          "ΔH~r~ = ==−239 kJ mol^−1^==.",
        ],
        answer:
          "ΔH~r~ = ==−239 kJ mol^−1^== — bond making (2 × 462) released more than bond breaking (436 + 249) absorbed: exothermic, as the energy level diagram demands.",
      },
      { k: "h", text: "Limitations of using bond enthalpy" },
      {
        k: "bullets",
        items: [
          "Bond enthalpies are measured in ==gaseous state==.",
          "Bond enthalpies are ==not exact values but an average value==.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · Exercise 9, Question 1 — ethanol from bond enthalpies",
        question:
          "Calculate the enthalpy of reaction for C~2~H~4~(g) + H~2~O(g) → CH~3~CH~2~OH(g), given the bond enthalpy terms: C—C +347, C=C +612, C—H +413, O—H +464, C—O +358 kJ mol^−1^.",
        steps: [
          "**Bonds broken** (the reactants): 1 × C=C (612) + 4 × C—H (4 × 413 = 1652) + 2 × O—H (2 × 464 = 928) → sum E[reactants] = ==3192 kJ mol^−1^==.",
          "**Bonds made** (the product): 1 × C—C (347) + 5 × C—H (5 × 413 = 2065) + 1 × C—O (358) + 1 × O—H (464) → sum E[products] = ==3234 kJ mol^−1^==.",
          "ΔH[reaction] = sum E[reactants] − sum E[products] = 3192 − 3234 = ==−42 kJ mol^−1^==.",
        ],
        answer:
          "ΔH = ==−42 kJ mol^−1^== — the π bond of the alkene is worth less than the two σ bonds that replace it.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 9, Question 3 — but-1-ene and liquid bromine",
        question:
          "Gaseous but-1-ene reacts with liquid bromine: C~4~H~8~ + Br~2~ → C~4~H~8~Br~2~. Bond enthalpies: C—H 413, C—C 347, C=C 612, C—Br 290, Br—Br 193 kJ mol^−1^. (i) Calculate the enthalpy change. (ii) Give one reason why the value calculated using bond enthalpies is different from the true value — do not consider experimental error, mean bond enthalpy values or non-standard conditions.",
        steps: [
          "**(i) Bonds broken**: 1 × C=C (612) + 1 × Br—Br (193) = ==805 kJ mol^−1^==. **Bonds made**: 1 × C—C (347) + 2 × C—Br (2 × 290 = 580) = ==927 kJ mol^−1^==.",
          "ΔH = 805 − 927 = ==−122 kJ mol^−1^==.",
          "**(ii)** Bond enthalpies are measured in the ==gaseous state== — but here the bromine is ==liquid==, so the Br—Br bond enthalpy does not belong to the state the reaction actually starts from.",
        ],
        answer:
          "(i) ΔH = ==−122 kJ mol^−1^== · (ii) the ==gaseous-state== limitation: the bromine is a liquid, not a gas.",
      },
      {
        k: "wow",
        text: "ΔH[reaction] = ==sum E[reactants] − sum E[products]== — break every bond in the reactants, make every bond in the products. But quote the limitations with it: the values are ==means== and everything happens ==in the gaseous state==.",
      },
    ],
  },
  {
    spec: "6.10",
    statement: "be able to calculate mean bond enthalpies from enthalpy changes of reaction",
    title: "Mean bond enthalpies from reaction data",
    blocks: [
      {
        k: "p",
        text: "The bond-enthalpy cycle runs both ways: when ΔH[reaction] is known — here from ==formation== and ==atomisation== data — the equation ΔH[reaction] = sum E[reactants] − sum E[products] can be turned inside out to find a bond enthalpy no one has measured.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 9, Question 2 — the Si—F bond",
        question:
          "Calculate the mean bond enthalpy of the SiF bond in SiF~4~(g) given: enthalpy of formation of SiF~4~(g) = −1615 kJ mol^−1^; enthalpy of atomisation of silicon = +456 kJ mol^−1^; enthalpy of atomisation of fluorine = +79 kJ mol^−1^.",
        steps: [
          "The formation equation is Si(s) + 2F~2~(g) → SiF~4~(g), Δ~f~H^θ^ = ==−1615 kJ mol^−1^==.",
          "Atomise the elements — ==one mole of gaseous atoms from the element in its standard state==: Si(s) → Si(g) costs +456, and 2F~2~(g) → 4F(g) costs 4 × +79 = +316.",
          "From the gaseous atoms, ==four Si—F bonds are made==: −4E[Si—F].",
          "Hess's law around the cycle: Δ~f~H^θ^ = (+456 + 316) − 4E[Si—F] → −1615 = 772 − 4E[Si—F].",
          "4E[Si—F] = 772 + 1615 = 2387 → E[Si—F] = 2387 ÷ 4 = ==+596.75 ≈ +597 kJ mol^−1^==.",
        ],
        answer:
          "The mean bond enthalpy of the Si—F bond = ==+597 kJ mol^−1^== — one of the strongest single bonds in the table.",
      },
    ],
  },
  {
    spec: "6.11",
    statement:
      "understand that bond enthalpy data gives some indication about which bond will break first in a reaction, how easy or difficult it is and therefore how rapidly a reaction will take place at room temperature",
    title: "Which bond breaks first",
    blocks: [
      {
        k: "note",
        label: "In the class note",
        text: "The class note carries this objective through the methane ladder: the four C—H bonds in CH~4~ break at ==+423, +480, +425 and +335 kJ mol^−1^== — every value different, because ==the strength of a bond depends on its environment==, which is exactly why ==mean== values are quoted.",
      },
      {
        k: "p",
        text: "Read the ladder as the specification asks: a bond with a ==smaller bond enthalpy== needs ==less energy== to break, so it is the ==easier== bond to break first — and the easier the bonds are to break, the ==more rapidly a reaction will take place at room temperature==. Bond enthalpy data is therefore the first guide to where a reaction starts.",
      },
      {
        k: "wow",
        text: "The weakest link leads: ==which bond will break first==, ==how easy or difficult== it is, and ==how rapidly the reaction takes place at room temperature== — all read straight off the bond enthalpies.",
      },
    ],
  },
];
