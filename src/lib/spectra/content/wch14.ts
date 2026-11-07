import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WCH14 · Rates, Equilibria and Further Organic Chemistry
   Topics 11–16 of the Pearson IAL 2018 specification.
   ═══════════════════════════════════════════════════════════════ */

export const WCH14_TOPICS: Topic[] = [
  {
    id: "t11",
    no: "11",
    label: "Topic 11",
    title: "Kinetics",
    summary:
      "Rate equations, orders and the rate constant; the rate-determining step; and Arrhenius — why a 10 K rise can double a rate.",
    minutes: 24,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Unit 2 explained collisions qualitatively. Unit 4 makes it arithmetic: a ==rate equation== links rate to concentration through powers that only experiment can reveal. The stoichiometric equation tells you *what* reacts; the rate equation tells you *who is in the slow step*. They are independent pieces of information, and examiners love asking you to prove it.",
      },
      {
        k: "def",
        term: "Rate equation",
        text: "For a reaction A + B → products: rate = k[A]^m^[B]^n^. The powers m and n are the ==orders== with respect to A and B — found by experiment only, never from the balancing numbers. Their sum is the overall order.",
      },
      {
        k: "def",
        term: "Rate constant, k",
        text: "The proportionality constant in the rate equation. It is fixed by temperature (and by a catalyst) but untouched by concentration — raise [A] and the rate rises, but k does not change. Its units change to fit the equation: order 0 gives mol dm^−3^ s^−1^, order 1 gives s^−1^, order 2 gives dm^3^ mol^−1^ s^−1^.",
      },
      {
        k: "p",
        text: "Orders come from data, and the data come in two shapes. The ==initial-rates method== varies one concentration at a time and measures how the starting rate answers. The ==half-life method== reads concentration–time curves directly: constant half-life means first order. Graph shapes are the fastest shorthand — learn the table below and orders become pattern-matching.",
      },
      {
        k: "table",
        caption: "Orders at a glance — read graphs and units like a spectroscope",
        head: ["Order", "rate–[X] graph", "[X]–time graph", "Half-life", "Units of k"],
        rows: [
          ["0", "horizontal line", "straight line, falling", "decreases as [X] falls", "mol dm^−3^ s^−1^"],
          ["1", "straight line through origin", "downward curve", "constant", "s^−1^"],
          ["2", "upward curve", "steeper downward curve", "doubles as [X] halves", "dm^3^ mol^−1^ s^−1^"],
        ],
      },
      {
        k: "ex",
        title: "Initial-rates data → orders → k",
        steps: [
          "A + B → C. Expt 1: [A] 0.10, [B] 0.10, rate 1.2 × 10^−3^. Expt 2: [A] 0.20, [B] 0.10, rate 2.4 × 10^−3^. Expt 3: [A] 0.10, [B] 0.20, rate 4.8 × 10^−3^ (all mol dm^−3^ / mol dm^−3^ s^−1^).",
          "Expt 1 → 2: [A] doubles, [B] fixed, rate doubles → ==first order in A==.",
          "Expt 1 → 3: [B] doubles, [A] fixed, rate quadruples (× 2^2^) → ==second order in B==.",
          "rate = k[A][B]^2^, so k = 1.2 × 10^−3^ ÷ (0.10 × 0.10^2^) = 1.2 × 10^−3^ ÷ 1.0 × 10^−3^.",
        ],
        answer: "rate = k[A][B]^2^ with k = 1.2 dm^6^ mol^−2^ s^−1^ (overall order 3 — check the units match).",
      },
      {
        k: "p",
        text: "Multi-step mechanisms pass through intermediates, and one step is slower than the rest. The ==rate-determining step== is the bottleneck: only the reactants that appear in it (directly, or via a fast pre-equilibrium) appear in the rate equation. Tertiary halogenoalkane hydrolysis is the classic: SN1 via a carbocation, so rate = k[(CH~3~)~3~CBr] even though hydroxide is a reactant. If your proposed mechanism disagrees with the measured rate equation, the mechanism — not the data — is wrong.",
      },
      {
        k: "eq",
        title: "The Arrhenius equation",
        eq: "k = A e^(−Ea/RT)^        ln k = ln A − Ea/RT",
        note: "Plot ln k against 1/T: a straight line of gradient ==−Ea/R== and intercept ln A. Ea is in J mol^−1^, R = 8.31 J K^−1^ mol^−1^, T in kelvin.",
        ok: ["gradient −Ea/R", "T in K, Ea in J"],
      },
      {
        k: "ex",
        title: "Finding Ea from two rate constants",
        steps: [
          "k = 1.0 × 10^−3^ s^−1^ at 298 K and 1.9 × 10^−3^ s^−1^ at 308 K.",
          "ln(k~2~/k~1~) = ln(1.9) = 0.642",
          "1/T~1~ − 1/T~2~ = 1/298 − 1/308 = 1.09 × 10^−4^ K^−1^",
          "Ea = R × ln(k~2~/k~1~) ÷ (1/T~1~ − 1/T~2~) = 8.31 × 0.642 ÷ 1.09 × 10^−4^",
        ],
        answer: "Ea ≈ 49 kJ mol^−1^ — and note what the data show: a 10 K rise nearly *doubled* the rate.",
      },
      {
        k: "tips",
        items: [
          "Units of k are a one-mark gift: rearrange rate = k[A]^m^[B]^n^ and cancel. Quote them every time you calculate k.",
          "Half-life constant → first order. Half-life doubling as concentration halves → second order. Say which pattern you used.",
          "A catalyst changes k (a different route with lower Ea) but never the position of equilibrium — that distinction belongs to Topic 13.",
          "Rate–temperature: the Maxwell–Boltzmann tail grows with T, but Arrhenius is the quantitative version examiners want here.",
        ],
      },
      {
        k: "recap",
        items: [
          "rate = k[A]^m^[B]^n^ — orders from experiment, never from the equation.",
          "Units of k: order 0, 1, 2 → mol dm^−3^ s^−1^, s^−1^, dm^3^ mol^−1^ s^−1^.",
          "Constant half-life = first order.",
          "Rate-determining step: the rate equation counts only what is in it.",
          "ln k vs 1/T: gradient −Ea/R; small T rises can double k.",
        ],
      },
    ],
  },
  {
    id: "t12",
    no: "12",
    label: "Topic 12",
    title: "Entropy and energetics",
    summary:
      "Why energy spreads out, why disorder is quantified in J K^−1^ mol^−1^, and how ΔG = ΔH − TΔS decides what is feasible.",
    minutes: 20,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Enthalpy alone cannot explain why some reactions run and others do not — many feasible reactions are endothermic. The missing variable is ==entropy==: a measure of how energy and particles are dispersed. The universe drifts towards dispersal, and ΔG is the bookkeeping that prices it against ΔH.",
      },
      {
        k: "def",
        term: "Entropy, S",
        text: "A measure of the dispersal of energy and particles in a system, in J K^−1^ mol^−1^. Standard entropies are *absolute* values, always positive: S°(gas) > S°(liquid) > S°(solid), and S° rises with molecular complexity.",
      },
      {
        k: "eq",
        title: "Entropy change of reaction",
        eq: "ΔS° = ΣS°(products) − ΣS°(reactants)",
        note: "Watch the trap: enthalpies of formation are relative, but entropies are absolute — no elements-have-zero rule here.",
        ok: ["units J K−1 mol−1", "gases dominate"],
      },
      {
        k: "ex",
        title: "ΔS° for CaCO~3~(s) → CaO(s) + CO~2~(g)",
        steps: [
          "S°: CaCO~3~ = 92.9, CaO = 39.7, CO~2~ = 213.6 (all J K^−1^ mol^−1^)",
          "ΔS° = (39.7 + 213.6) − 92.9",
          "= 253.3 − 92.9",
        ],
        answer: "ΔS° = +160.4 J K^−1^ mol^−1^ — a gas appears, so the increase is large and positive.",
      },
      {
        k: "def",
        term: "Gibbs free energy, ΔG",
        text: "ΔG = ΔH − TΔS, in kJ mol^−1^ (convert ΔS to kJ K^−1^ mol^−1^ before subtracting). A reaction is ==feasible== when ΔG < 0. Feasible says nothing about rate — diamond is thermodynamically primed to become graphite, but not on any human timescale.",
      },
      {
        k: "table",
        caption: "Feasibility — the four sign combinations",
        head: ["ΔH", "ΔS", "ΔG = ΔH − TΔS", "Feasible…"],
        rows: [
          ["−", "+", "always negative", "at all temperatures"],
          ["+", "−", "always positive", "never (no temperature)"],
          ["+", "+", "negative only when TΔS > ΔH", "above a minimum temperature"],
          ["−", "−", "negative only when TΔS < ΔH", "below a maximum temperature"],
        ],
      },
      {
        k: "ex",
        title: "The temperature limestone decomposes",
        steps: [
          "CaCO~3~ → CaO + CO~2~: ΔH° = +178 kJ mol^−1^, ΔS° = +160.4 J K^−1^ mol^−1^ = +0.1604 kJ K^−1^ mol^−1^.",
          "Feasible when ΔG < 0: ΔH − TΔS < 0 → T > ΔH/ΔS",
          "T > 178 ÷ 0.1604",
        ],
        answer: "T > 1110 K (≈ 837 °C) — below that, enthalpy wins; above it, the dispersal of CO~2~ gas carries the reaction.",
      },
      {
        k: "tips",
        items: [
          "The classic lost mark: forgetting to ==divide ΔS by 1000== so that ΔH and TΔS share units of kJ.",
          "“Explain why ΔS is positive” wants the dispersal argument: a gas produced, more particles, greater disorder — name the mechanism.",
          "ΔG at higher T: substitute straight into ΔG = ΔH − TΔS with the *same* ΔH and ΔS — assuming they barely change with temperature is expected.",
        ],
      },
      {
        k: "recap",
        items: [
          "S is absolute and always positive; gases > liquids > solids.",
          "ΔS° = ΣS°(products) − ΣS°(reactants), in J K^−1^ mol^−1^.",
          "ΔG = ΔH − TΔS — convert ΔS to kJ K^−1^ mol^−1^ first.",
          "ΔG < 0 = feasible, not fast.",
          "Sign combos: +/− never; +/+ above T; −/− below T.",
        ],
      },
    ],
  },
  {
    id: "t13",
    no: "13",
    label: "Topic 13",
    title: "Chemical equilibria",
    summary:
      "Kc and Kp as the constants behind every shift; mole fractions, partial pressures, and the one disturbance that actually moves K.",
    minutes: 22,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Unit 2 treated equilibrium as a tug-of-war; Unit 4 attaches numbers to the rope. At equilibrium the forward and reverse rates are equal, and the composition settles where a single constant — K — says it must. The method is always the same: write the expression, find the equilibrium moles, convert to concentrations or partial pressures, substitute.",
      },
      {
        k: "def",
        term: "Kc",
        text: "For aA + bB ⇌ cC + dD: Kc = [C]^c^[D]^d^ ÷ [A]^a^[B]^b^, using equilibrium concentrations in mol dm^−3^. ==Solids and pure liquids are omitted== — their concentration is constant. Heterogeneous equilibria (CaCO~3~ ⇌ CaO + CO~2~) carry only the gases.",
      },
      {
        k: "def",
        term: "Kp",
        text: "The same idea for gases, in partial pressures: p(X) = mole fraction of X × total pressure. Only gases appear in Kp. Units depend on the moles balance — if Δmoles(gas) = 0, Kp is dimensionless.",
      },
      {
        k: "ex",
        title: "An ICE calculation with clean numbers",
        steps: [
          "CH~3~COOH + C~2~H~5~OH ⇌ ester + H~2~O. Start with 1.00 mol of acid and 1.00 mol of alcohol, no products, in the same volume (so moles ∝ concentration).",
          "Let x mol of each product form: equilibrium moles are (1−x) of each reactant, x of each product.",
          "Kc = x^2^ / (1−x)^2^ = 4.00 → x/(1−x) = 2 → x = 2/3",
        ],
        answer: "Kc = 4.00 (no units — two moles become two) and the mixture settles at 0.667 mol of ester.",
      },
      {
        k: "p",
        text: "Now the question that separates grades: ==what changes K?== Only temperature. Adding or removing a substance shifts *position* — the system makes Q return to K — but the value of K itself is fixed at a given temperature. A catalyst speeds both directions equally: equilibrium arrives faster and looks exactly the same.",
      },
      {
        k: "table",
        caption: "Disturbances — position vs the constant itself",
        head: ["Disturbance", "Position shifts", "Value of K"],
        rows: [
          ["Add a reactant", "towards products (consumes it)", "unchanged"],
          ["Increase pressure", "towards fewer gas moles", "unchanged"],
          ["Add a catalyst", "neither way — faster only", "unchanged"],
          ["Increase T (exothermic forward)", "towards reactants", "==falls=="],
          ["Increase T (endothermic forward)", "towards products", "==rises=="],
        ],
      },
      {
        k: "p",
        text: "This is why the Haber process is a compromise. N~2~ + 3H~2~ ⇌ 2NH~3~, ΔH negative: low temperature favours the K of the product but crawls; high pressure favours yield but costs money and steel. Industry settles near 450 °C and 200 atm with an iron catalyst — not the thermodynamic optimum, but the one that makes ammonia *this century*.",
      },
      {
        k: "tips",
        items: [
          "In Kp problems, convert moles to mole fractions ==first==, multiply by total pressure second — skipping steps is where marks die.",
          "State the units of Kc/Kp by substituting powers of mol dm^−3^ or Pa — and say “no units” when the powers cancel.",
          "“Explain the shift” answers: name Q vs K for equilibrium constants, or Le Chatelier for position — don't mix the two terms.",
        ],
      },
      {
        k: "recap",
        items: [
          "Write K from the balanced equation; omit solids and pure liquids.",
          "Kp: p(X) = mole fraction × total pressure; gases only.",
          "ICE → equilibrium moles → substitute → units.",
          "Only temperature changes the value of K; catalysts change neither.",
          "Exothermic forward: T↑ ⇒ K↓; endothermic forward: T↑ ⇒ K↑.",
        ],
      },
    ],
  },
  {
    id: "t14",
    no: "14",
    label: "Topic 14",
    title: "Acid–base equilibria",
    summary:
      "pH as logarithm, Ka and Kw as constants, buffers as reservoirs — and reading titration curves like maps to pick indicators.",
    minutes: 24,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Weak acids are equilibria wearing a disguise. Ethanoic acid in water is mostly undissociated molecules — which is exactly why it has a ==Ka== to call its own and why its pH needs the equilibrium arithmetic, not a concentration read-off. Master this topic and buffers, titration curves and indicator choice all fall into place.",
      },
      {
        k: "def",
        term: "pH, Ka and pKa",
        text: "pH = −log~10~[H^+^]. For HA ⇌ H^+^ + A^−^: Ka = [H^+^][A^−^]/[HA], and pKa = −log~10~Ka. Stronger acid ⇔ larger Ka ⇔ ==smaller== pKa. Water itself obeys Kw = [H^+^][OH^−^] = 1.00 × 10^−14^ at 298 K (pKw = 14).",
      },
      {
        k: "ex",
        title: "pH of 0.100 mol dm^−3^ ethanoic acid (Ka = 1.74 × 10^−5^)",
        steps: [
          "Assume [H^+^] = [A^−^] and [HA] ≈ 0.100 (dissociation is tiny).",
          "Ka = [H^+^]^2^ / [HA] → [H^+^] = √(Ka × c) = √(1.74 × 10^−5^ × 0.100)",
          "= √(1.74 × 10^−6^) = 1.32 × 10^−3^ mol dm^−3^",
          "pH = −log(1.32 × 10^−3^)",
        ],
        answer: "pH = 2.88 — the √(Ka·c) shortcut, and the two assumptions that justify it, is the mark scheme's own route.",
      },
      {
        k: "def",
        term: "Buffer",
        text: "A mixture of a weak acid and its conjugate base (or weak base and conjugate acid) that resists pH change. Add acid: A^−^ + H^+^ → HA. Add alkali: HA + OH^−^ → A^−^ + H~2~O. The ==ratio== [A^−^]/[HA] wobbles slightly; the pH barely moves.",
      },
      {
        k: "ex",
        title: "Buffer arithmetic, Henderson–Hasselbalch",
        steps: [
          "pH = pKa + log([A^−^]/[HA]) — from Ka, in one rearrangement.",
          "Ethanoic buffer with [A^−^] = [HA]: log(1) = 0",
        ],
        answer: "pH = pKa = 4.76 — and in general, ten times more salt than acid pushes pH a full unit above pKa.",
      },
      {
        k: "table",
        caption: "The four titration combinations — curves and indicators",
        head: ["Titration", "Start pH", "pH at equivalence", "Indicator"],
        rows: [
          ["Strong acid – strong base", "≈ 1", "7 (steep 3–11)", "methyl orange or phenolphthalein"],
          ["Strong acid – weak base", "≈ 1", "< 7 (≈ 5)", "methyl orange"],
          ["Weak acid – strong base", "≈ 3", "> 7 (≈ 9)", "phenolphthalein"],
          ["Weak acid – weak base", "≈ 3", "≈ 7, no steep jump", "none — no sharp change to catch"],
        ],
      },
      {
        k: "p",
        text: "Two coordinates on a weak-acid curve are worth memorising. At ==half-equivalence==, [A^−^] = [HA], the buffer term log(1) vanishes, and ==pH = pKa== — it is how pKa is measured in the lab. At ==equivalence== the flask holds only the salt: for ethanoic acid/NaOH the ethanoate hydrolyses, pH lands near 8.9, and the indicator must change inside the steep region, not after it.",
      },
      {
        k: "tips",
        items: [
          "Strong acid pH: [H^+^] = c directly. Weak acid: √(Ka·c). Mixing up the two routes is the single most common pH error.",
          "Dilution question: strong acid dilutes 10× → pH rises 1 unit. Weak acid rises *less*, because dissociation is pushed forward — worth a mark in AO3 questions.",
          "Indicator choice is a range question: the indicator's colour-change range must sit ==inside the vertical section== of the curve.",
        ],
      },
      {
        k: "recap",
        items: [
          "pH = −log[H^+^]; pKa = −log Ka; Kw = 1.00 × 10^−14^ at 298 K.",
          "Weak acid: [H^+^] = √(Ka·c) — two assumptions stated.",
          "Buffer: weak acid + its salt; pH = pKa + log(salt/acid).",
          "Half-equivalence: pH = pKa.",
          "Indicator range must fall inside the vertical jump.",
        ],
      },
    ],
  },
  {
    id: "t15",
    no: "15",
    label: "Topic 15",
    title: "Carbonyls, carboxylic acids and chirality",
    summary:
      "The polarised C=O, aldehyde vs ketone tests, nucleophilic addition, acyl chlorides — and how a planar group builds a racemic mixture.",
    minutes: 26,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Oxygen takes more than its share of the C=O bonding electrons, so the carbonyl carbon is ==δ+== and exposed — a target for nucleophiles, the mirror image of the alkene's electrophilic chemistry. Aldehydes and ketones share the group; what separates them is the hydrogen on the aldehyde's carbonyl carbon, and that single H is why aldehydes oxidise and ketones do not.",
      },
      {
        k: "table",
        caption: "The test battery — learn results and conditions",
        head: ["Reagent", "Aldehyde", "Ketone", "Carboxylic acid"],
        rows: [
          ["2,4-DNPH (Brady's)", "orange precipitate", "orange precipitate", "no precipitate"],
          ["Tollens' (ammoniacal AgNO~3~, warm)", "silver mirror", "no change", "no change"],
          ["Fehling's (warm)", "brick-red precipitate", "stays blue", "no change"],
          ["NaHCO~3~(aq)", "no change", "no change", "fizzing (CO~2~)"],
          ["I~2~/NaOH, warm (iodoform)", "yes if CH~3~CO–", "yes if CH~3~CO–", "no"],
        ],
      },
      {
        k: "p",
        text: "Nucleophilic addition is the mechanism of the group: HCN (with KCN catalyst) adds across C=O — the cyanide lone pair attacks the δ+ carbon, the π pair settles on oxygen, and H^+^ completes a ==hydroxynitrile==. Reduction with NaBH~4~ follows the same path with H^−^ as the nucleophile, giving a secondary alcohol from a ketone, primary from an aldehyde. Write “nucleophilic attack by CN^−^ on the δ+ carbon; π bond breaks heterolytically” and the mechanism marks follow.",
      },
      {
        k: "def",
        term: "Chiral centre and enantiomers",
        text: "A carbon with ==four different groups== attached. Its mirror images (enantiomers) are non-superimposable and rotate plane-polarised light equally in opposite directions (±). A 50 : 50 mixture is a ==racemic mixture== — optically inactive, because the two rotations cancel.",
      },
      {
        k: "p",
        text: "Planarity is where racemates are born. The C=O group and its substituents lie flat; CN^−^ can attack either face with equal probability, so a hydroxynitrile with a new chiral centre forms as a 50 : 50 racemate. The same argument explains why SN1 (planar carbocation) gives racemisation while SN2 (backside attack) gives inversion — geometry is the exam answer.",
      },
      {
        k: "eq",
        title: "Carboxylic acids and their derivatives",
        eq: "CH~3~COOH + NaHCO~3~ → CH~3~COONa + H~2~O + CO~2~        CH~3~COCl + H~2~O → CH~3~COOH + HCl        CH~3~COCl + CH~3~OH → CH~3~COOCH~3~ + HCl",
        note: "Acyl chlorides react vigorously with water, alcohols, ammonia and amines at room temperature — the δ+ carbon of the C=O bonded to an electron-withdrawing Cl is unusually inviting.",
        ok: ["states at rtp", "vigorous, no heat"],
      },
      {
        k: "table",
        caption: "Why derivative reactivity runs acyl chloride > ester > amide",
        head: ["Derivative", "Hydrolysis", "Reason"],
        rows: [
          ["Acyl chloride", "violent, cold water", "Cl withdraws electron density; Cl^−^ is an excellent leaving group"],
          ["Ester", "slow; heat with acid or alkali", "alkoxy group donates into the C=O, shielding the carbon"],
          ["Amide", "slowest", "N donates strongly into the C=O — the carbon is least δ+"],
        ],
      },
      {
        k: "ex",
        title: "A deduction chain, WCH14 style",
        steps: [
          "Compound X, C~5~H~10~O: 2,4-DNPH gives an orange precipitate; Tollens' gives a silver mirror; the pure liquid rotates plane-polarised light.",
          "Carbonyl confirmed by DNPH; aldehyde confirmed by Tollens'; optical activity demands a carbon with four different groups.",
          "Test the aldehyde isomers of C~5~H~10~O: pentanal — no chiral carbon; 3-methylbutanal — the branched carbon carries two CH~3~ groups; 2,2-dimethylpropanal — no; ==2-methylbutanal== — C-2 carries CH~3~, C~2~H~5~, CHO and H.",
        ],
        answer: "X is 2-methylbutanal, CH~3~CH~2~CH(CH~3~)CHO — the only aldehyde isomer with all four groups different on one carbon.",
      },
      {
        k: "tips",
        items: [
          "2,4-DNPH distinguishes *carbonyl from non-carbonyl*; Tollens' distinguishes *aldehyde from ketone*. Name both roles — tests are asked as pairs.",
          "“Explain optical activity” answers need: chiral centre, four different groups, non-superimposable mirror images, equal and opposite rotation.",
          "In mechanisms, start the arrow from the ==lone pair== of the nucleophile to the δ+ carbon — an arrow from H of HCN is the classic error.",
        ],
      },
      {
        k: "recap",
        items: [
          "C=O is polar: C δ+, attacked by nucleophiles.",
          "DNPH confirms carbonyl; Tollens'/Fehling's confirm aldehyde; iodoform finds CH~3~CO–.",
          "NaBH~4~ reduces; HCN/KCN adds to give hydroxynitriles.",
          "Four different groups = chiral; planar C=O or C^+^ gives racemates.",
          "Acyl chloride > ester > amide in reactivity.",
        ],
      },
    ],
  },
  {
    id: "t16",
    no: "16",
    label: "Topic 16",
    title: "Spectroscopy and chromatography",
    summary:
      "IR, mass spectrometry and 1H NMR as three probes of one structure — plus TLC and GC-MS, the separation half of analysis.",
    minutes: 26,
    ao: ["AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "No single spectrum identifies a compound; a ==combination== does. IR reports which bonds exist, mass spectrometry reports the molecular mass and how the skeleton breaks, 1H NMR reports how many hydrogen environments there are and how they neighbour each other. Treat each technique as one witness — the structure is what all three agree on.",
      },
      {
        k: "table",
        caption: "IR absorptions — the bonds the exam asks for",
        head: ["Bond", "Wavenumber / cm^−1^", "Look of the peak"],
        rows: [
          ["O–H (alcohol)", "3200–3550", "broad"],
          ["O–H (carboxylic acid)", "2500–3300", "very broad, dominates the spectrum"],
          ["C=O", "1680–1750", "strong, sharp"],
          ["C–H", "2850–3300", "medium"],
          ["Fingerprint region", "below 1500", "matched against a database, not interpreted"],
        ],
      },
      {
        k: "p",
        text: "Mass spectrometry: the ==molecular ion== M^+^ peak gives Mr (with M+1 at ≈1.1 % per carbon from ^13^C). Fragmentation is the detective work — the mass *lost* from M^+^ names the missing piece: 15 is CH~3~, 29 is C~2~H~5~^+^ or CHO^+^, 31 is CH~2~OH^+^, 45 is COOH^+^. A strong peak at m/z 45 plus a very broad IR absorption is a carboxylic acid before you read another line.",
      },
      {
        k: "p",
        text: "1H NMR counts environments, sizes them and splits them. ==Integration== (peak areas) gives the ratio of hydrogens; ==chemical shift== places them in a context; ==splitting== follows the n+1 rule — a hydrogen with n equivalent neighbours on adjacent carbons is split into n+1 lines. TMS at δ 0 calibrates the scale; CDCl~3~ is the usual solvent; shaking with D~2~O makes O–H and N–H peaks vanish (exchange), which is how you spot them.",
      },
      {
        k: "table",
        caption: "1H NMR chemical shifts — the ranges worth memorising",
        head: ["Environment", "δ / ppm", "Notes"],
        rows: [
          ["R–CH~3~, R~2~CH~2~ (alkyl)", "0.7–1.6", "the baseline"],
          ["–CH~3~CO–, allylic", "2.0–2.9", "next to C=O or C=C"],
          ["–CH next to O, N or halogen", "3.1–4.5", "electronegative neighbours pull downfield"],
          ["Aromatic H", "6.0–9.0", "the ring's deshielding"],
          ["Aldehyde H", "9.0–10.0", "rarely missed — nothing else sits here"],
          ["Carboxylic acid O–H", "10.0–12.0", "very broad singlet"],
          ["Alcohol O–H", "1.0–5.0", "broad, position variable, vanishes with D~2~O"],
        ],
      },
      {
        k: "ex",
        title: "Identify C~3~H~6~O~2~ from its spectra",
        steps: [
          "IR: very broad absorption 2500–3300 cm^−1^ and a strong peak at 1710 cm^−1^ → carboxylic acid (O–H + C=O).",
          "1H NMR: δ 1.15 triplet (3H), δ 2.35 quartet (2H), δ 11.7 broad singlet (1H).",
          "Triplet + quartet with 3:2 ratio = an ethyl group; the quartet at 2.35 sits next to C=O; the 11.7 singlet is the acid proton.",
        ],
        answer: "Propanoic acid, CH~3~CH~2~COOH. Mass spectrum check: M^+^ at 74 ✓, fragment at 45 (COOH^+^) ✓.",
      },
      {
        k: "def",
        term: "Rf value",
        text: "In thin-layer chromatography: Rf = distance moved by the substance ÷ distance moved by the solvent front. Always < 1, and constant for a substance on a given plate — spots are identified by matching Rf values against known samples run on the same plate.",
      },
      {
        k: "p",
        text: "Gas chromatography separates volatile mixtures on a long heated column: retention time identifies (against standards), peak area quantifies. Coupled to a mass spectrometer — ==GC-MS== — the separated components are identified by their fragmentation fingerprints, which is how doping tests, forensic screens and flavour analysis all work: separation first, identification second.",
      },
      {
        k: "tips",
        items: [
          "Answer structure-deduction questions in the order the evidence locks in: IR narrows the family, M^+^ sets the formula, NMR finishes the skeleton — and finish with a check that every peak is assigned.",
          "O–H acids (2500–3300) and alcohols (3200–3550) overlap — the acid's reach down to 2500 and its pairing with C=O is the discriminator.",
          "Splitting only counts neighbours on ==adjacent carbons==; equivalent hydrogens do not split each other. A CH~3~ next to no hydrogens is a singlet.",
        ],
      },
      {
        k: "recap",
        items: [
          "IR: O–H broad, C=O sharp, fingerprint confirmed by database.",
          "MS: M^+^ gives Mr; fragment losses name the pieces.",
          "NMR: integration = ratio, shift = context, splitting = n+1 on adjacent carbons.",
          "D~2~O removes O–H/N–H peaks; TMS is δ 0.",
          "Rf < 1; GC separates, MS identifies.",
        ],
      },
    ],
  },
];
