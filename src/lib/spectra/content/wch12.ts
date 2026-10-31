import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WCH12 · Energetics, Group Chemistry, Halogenoalkanes and Alcohols
   Topics 6–10 of the Pearson IAL 2018 specification.
   ═══════════════════════════════════════════════════════════════ */

export const WCH12_TOPICS: Topic[] = [
  {
    id: "t06",
    no: "06",
    label: "Topic 6",
    title: "Energetics",
    summary:
      "Enthalpy changes, Hess's law, bond enthalpies and calorimetry — energy bookkeeping for reactions you can and cannot measure directly.",
    minutes: 24,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Enthalpy change is heat energy exchanged at constant pressure: ==ΔH = H(products) − H(reactants)==, negative for exothermic (heat leaves the system) and positive for endothermic (heat enters). Definitions are worth whole marks on their own, and every one of them is fixed to ==standard conditions==: 100 kPa and 298 K, every substance in its standard state.",
      },
      {
        k: "table",
        caption: "The enthalpy definitions that get asked",
        head: ["Quantity", "Defined as", "Defining equation"],
        rows: [
          ["ΔHf — formation", "enthalpy change forming 1 mol of compound from its elements in standard states", "C(s) + O~2~(g) → CO~2~(g)"],
          ["ΔHc — combustion", "enthalpy change burning 1 mol completely in excess oxygen", "CH~4~(g) + 2O~2~(g) → CO~2~(g) + 2H~2~O(l)"],
          ["ΔHneut — neutralisation", "enthalpy change forming 1 mol of water from acid + base", "HCl(aq) + NaOH(aq) → NaCl(aq) + H~2~O(l)"],
          ["Bond enthalpy", "energy to break 1 mol of a bond, gaseous state, averaged over compounds", "Cl–Cl(g) → 2Cl•(g)"],
        ],
      },
      {
        k: "def",
        term: "Hess's law",
        text: "The enthalpy change of a reaction is independent of the route taken. If you cannot measure a reaction directly, build a cycle through reactions you *can* measure — energy is conserved either way.",
      },
      {
        k: "eq",
        title: "The two Hess routes",
        eq: "ΔH = ΣΔHf(products) − ΣΔHf(reactants)        ΔH = ΣΔHc(reactants) − ΣΔHc(products)",
        note: "Formation goes products-minus-reactants; combustion runs the other way round. One sign error here is the most common mark lost in Unit 2.",
        ok: ["routes close", "signs consistent"],
      },
      {
        k: "p",
        text: "Bond enthalpies give a third route and an important insight. Breaking bonds always ==costs== energy; making bonds always ==releases== it. If the bonds made are stronger than the bonds broken, the reaction is exothermic.",
      },
      {
        k: "eq",
        title: "Bond enthalpy route",
        eq: "ΔH = Σ(bond enthalpies broken) − Σ(bond enthalpies formed)",
        note: "Values are averages over many compounds, and everything must be gaseous — that is why this method only ever *estimates* ΔH.",
        ok: ["gaseous species only", "breaking − making"],
      },
      {
        k: "ex",
        title: "Bond enthalpy calculation",
        steps: [
          "H~2~(g) + Cl~2~(g) → 2HCl(g), with H–H 436, Cl–Cl 243, H–Cl 432 kJ mol^−1^.",
          "Broken: 436 + 243 = 679 kJ mol^−1^.",
          "Formed: 2 × 432 = 864 kJ mol^−1^.",
          "ΔH = 679 − 864",
        ],
        answer: "ΔH = −185 kJ mol^−1^ — exothermic, because H–Cl bonds are stronger than what was broken.",
      },
      {
        k: "p",
        text: "==Calorimetry== puts a number on all of this: burn or dissolve the reaction in a known mass of water and watch the temperature move. The Unit 3 practical expects the method *and* its errors.",
      },
      {
        k: "eq",
        title: "Calorimetry",
        eq: "q = mcΔT        ΔH = −q/n",
        note: "m = mass of water (g), c = 4.18 J g^−1^ K^−1^, q in joules. Convert to kJ before dividing by n — and ΔT in K equals ΔT in °C.",
        ok: ["J → kJ", "per mole"],
      },
      {
        k: "tips",
        items: [
          "Heat loss to the surroundings makes measured ΔH *less* exothermic than the true value — say which direction, not just “heat loss”.",
          "State symbols are part of every defining equation; (g), (l), (aq), (s) each earn.",
          "Bond enthalpy calculations ignore intermolecular forces — only gases qualify.",
          "Units: kJ mol^−1^. Write them even when the number is right.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "50.0 g of water rises 25.0 °C in a calorimeter. How much heat went in?",
            a: "q = mcΔT = 50.0 × 4.18 × 25.0 = 5 225 J ≈ 5.23 kJ.",
          },
          {
            q: "Why is ΔH from bond enthalpies called an estimate?",
            a: "The values are averages taken from many different compounds, and the method ignores everything but the gas-phase bonds — condensation and solution energies are left out entirely.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "ΔH < 0 exothermic; > 0 endothermic; standard state, 100 kPa, 298 K.",
          "Hess: formation products − reactants; combustion reactants − products.",
          "Bond route: broken − formed; gases only; averages → estimate.",
          "q = mcΔT, then ΔH = −q/n; watch J vs kJ.",
          "Errors: heat loss, evaporation, incomplete combustion — name the direction of the error.",
        ],
      },
    ],
  },
  {
    id: "t07",
    no: "07",
    label: "Topic 7",
    title: "Intermolecular forces",
    summary:
      "Van der Waals, permanent dipoles and hydrogen bonds — why boiling points trend the way they do, and water's strange behaviour.",
    minutes: 20,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Covalent bonds hold molecules together; ==intermolecular forces== hold molecules to each other — and it is the second kind that decides melting point, boiling point, viscosity and solubility. They come in three strengths, and every explanation question is a two-step: identify the strongest force present, then compare it.",
      },
      {
        k: "def",
        term: "Van der Waals (induced dipole–dipole)",
        text: "Electrons fluctuate, creating an instantaneous dipole in one molecule, which induces a dipole in its neighbour — a momentary attraction. Present between ==all== molecules; the only force in non-polar ones.",
      },
      {
        k: "def",
        term: "Hydrogen bonding",
        text: "The strongest intermolecular force: a hydrogen covalently bonded to N, O or F (small and very electronegative) is attracted to a lone pair on the N, O or F of a neighbouring molecule. Both halves of that requirement must be present.",
      },
      {
        k: "table",
        caption: "The three forces, weakest to strongest",
        head: ["Force", "Origin", "Where it operates"],
        rows: [
          ["Van der Waals", "instantaneous → induced dipoles", "everything, non-polar molecules' only force"],
          ["Permanent dipole–dipole", "δ^+^ and δ^−^ ends of polar molecules", "HCl, propanone, HBr"],
          ["Hydrogen bond", "H on N/O/F + lone pair on N/O/F", "H~2~O, NH~3~, HF, alcohols, DNA bases"],
        ],
      },
      {
        k: "p",
        text: "Van der Waals strength grows with ==electron count and molecular surface==: more electrons, bigger instantaneous dipoles. That is why boiling points climb down the halogens (Cl~2~ gas → Br~2~ liquid → I~2~ solid) and along any homologous series — each CH~2~ adds electrons and contact area.",
      },
      {
        k: "ex",
        title: "Explain the boiling points: HF +20 °C, HCl −85 °C, HBr −67 °C, HI −35 °C",
        steps: [
          "HF is far above the others: it is the only one with hydrogen bonding (H bonded to F, F lone pairs available).",
          "HCl < HBr < HI looks backwards for polarity — but polarity is not the strongest force here.",
          "From HCl to HI the electron count rises, so van der Waals forces strengthen, and they dominate the trend.",
        ],
        answer: "HF high by hydrogen bonding; the rest climb with electron count via van der Waals. Identify the force, then compare.",
      },
      {
        k: "p",
        text: "Hydrogen bonding explains water's catalogue of oddities: a ==boiling point far above its group's trend==, high surface tension, and ==ice less dense than water== — freezing locks molecules into an open hydrogen-bonded lattice that collapses on melting. Alcohols dissolve in water because their –OH can hydrogen-bond with it; hydrocarbons cannot, and float or separate.",
      },
      {
        k: "tips",
        items: [
          "Never say “it has strong bonds” when you mean intermolecular forces — the distinction is the mark.",
          "Draw the hydrogen bond as a dashed line from H to the lone pair, and label it — diagram questions want the lone pair shown.",
          "Boiling point questions: state the strongest force in *each* substance, then compare strengths.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Why does propan-1-ol (b.p. 97 °C) boil far higher than propane (−42 °C) despite similar size?",
            a: "Propan-1-ol has an –OH group: hydrogen bonding between molecules. Propane manages only van der Waals. Much more energy is needed to separate alcohol molecules.",
          },
          {
            q: "Which force must be broken to boil water — and which must *not* be?",
            a: "Hydrogen bonds between molecules break; the O–H covalent bonds within molecules do not. Boiling separates molecules, never atoms.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Three forces: vdW (universal) < permanent dipole < hydrogen bond.",
          "vdW scales with electron count and surface contact.",
          "Hydrogen bond needs H–N/O/F *and* a lone pair on N/O/F.",
          "Ice floats: open hydrogen-bonded lattice.",
          "–OH groups make small alcohols water-soluble.",
        ],
      },
    ],
  },
  {
    id: "t08",
    no: "08",
    label: "Topic 8",
    title: "Redox chemistry and Groups 1, 2 and 7",
    summary:
      "Oxidation numbers, half-equations, and the s-block and halogen chemistry that starts — and ends — most Unit 2 papers.",
    minutes: 26,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Redox runs on one bookkeeping device: the ==oxidation number==. Elements are 0; the sum equals the overall charge; O is usually −2, H usually +1, F always −1. The species whose oxidation number rises is ==oxidised== and loses electrons; the one that falls is ==reduced==. An oxidising agent takes electrons and is itself reduced.",
      },
      {
        k: "def",
        term: "Disproportionation",
        text: "A reaction in which the same element is simultaneously oxidised and reduced — chlorine in cold alkali is the classic: Cl~2~ + 2NaOH → NaCl + NaClO + H~2~O, chlorine going to −1 in Cl^−^ and +1 in ClO^−^.",
      },
      {
        k: "p",
        text: "Half-equations keep large redox reactions honest: write the electron transfer for each species, balance O with H~2~O and H with H^+^, then multiply so the electrons cancel. Names carry oxidation numbers in Roman numerals — ==manganate(VII)==, ==chlorate(I)== — and every number in those names is examinable.",
      },
      {
        k: "p",
        text: "==Group 1== metals are soft, low-melting and violently reactive: one outer electron, lost easily. They fizz water into hydroxides and hydrogen — 2Na + 2H~2~O → 2NaOH + H~2~ — and they give the exam its most beautiful identification technique, the ==flame test==. Heat a clean nichrome wire in concentrated HCl, dip it in the compound, and read the colour.",
      },
      {
        k: "table",
        caption: "Flame tests — the six colours this site is named after",
        head: ["Ion", "Flame", "Note"],
        rows: [
          ["Li^+^", "crimson", "WCH11's colour, 670.8 nm"],
          ["Na^+^", "golden yellow", "so bright it masks others — 589.0 nm"],
          ["K^+^", "lilac", "view through cobalt-blue glass to hide Na's glare"],
          ["Ca^2+^", "brick red", "Group 2"],
          ["Ba^2+^", "apple green", "WCH13's colour, 553.5 nm"],
          ["Cu^2+^", "blue-green", "WCH14's colour, 510.5 nm"],
        ],
      },
      {
        k: "p",
        text: "==Group 2== trends all trace to one fact: the ions get larger down the group. Reactivity with water climbs (Mg shrugs → Ba fizzes hard); hydroxides get ==more== soluble (Mg(OH)~2~ barely dissolves, Ba(OH)~2~ freely); sulfates get ==less== soluble (BaSO~4~ is insoluble — the basis of the sulfate test); and nitrates and carbonates get ==more== thermally stable down the group.",
      },
      {
        k: "ex",
        title: "Why BaCO₃ decomposes at a higher temperature than MgCO₃",
        steps: [
          "Thermal decomposition needs the cation to polarise and weaken the carbonate ion's C–O bonds.",
          "Mg^2+^ is small: high charge density, strongly polarising — the carbonate breaks apart at ~350 °C.",
          "Ba^2+^ is large: low charge density, weakly polarising — the ion survives to ~1300 °C.",
        ],
        answer: "Polarising power falls down the group as the cation grows, so thermal stability rises. Charge density is the phrase to write.",
      },
      {
        k: "p",
        text: "==Group 7==, the halogens: boiling points climb down the group (more electrons, stronger van der Waals — Topic 7 again), and oxidising power ==falls==. A halogen will oxidise any halide below it: chlorine water displaces bromine from KBr (orange solution) and iodine from KI (brown). That displacement order — and its reverse refusal — is a favourite multiple-choice stem.",
      },
      {
        k: "p",
        text: "Halide identification closes the topic: acidify with dilute HNO~3~ (to clear carbonate and sulfite interference), add AgNO~3~, and read the precipitate — ==white AgCl== (dissolves in dilute NH~3~), ==cream AgBr== (dissolves in concentrated NH~3~), ==yellow AgI== (insoluble in either). Colour words must be exact.",
      },
      {
        k: "tips",
        items: [
          "Oxidation numbers in names: manganate(VII) is MnO~4~^−^, chlorate(I) is ClO^−^. Decode before you balance.",
          "In the sulfate test, acidify with HCl *then* add BaCl~2~ — a white precipitate of BaSO~4~ confirms SO~4~^2−^.",
          "“Displacement” answers must name both half-reactions: Cl~2~ oxidises 2Br^−^ → Br~2~ while Cl~2~ itself is reduced to 2Cl^−^.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Balance and interpret: Cl~2~ + KI → ?",
            a: "Cl~2~ + 2KI → 2KCl + I~2~. Chlorine (0 → −1) is reduced; iodide (−1 → 0) is oxidised. The solution turns brown.",
          },
          {
            q: "Why is silver nitrate added *after* dilute nitric acid in halide tests?",
            a: "Nitric acid removes carbonate and sulfite ions, which would otherwise give precipitates of their own (Ag~2~CO~3~, Ag~2~SO~3~) and mask the halide result.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Oxidation number bookkeeping: O −2, H +1, sum = charge; names carry Roman numerals.",
          "Disproportionation: one element both oxidised and reduced (Cl~2~ + cold NaOH).",
          "Group 1: violent water reaction + flame tests — Li crimson, Na gold, K lilac.",
          "Group 2: solubility splits (hydroxides up, sulfates down) and thermal stability up — polarising power explains all.",
          "Group 7: oxidising power falls; AgNO~3~ gives white / cream / yellow.",
        ],
      },
    ],
  },
  {
    id: "t09",
    no: "09",
    label: "Topic 9",
    title: "Introduction to kinetics and equilibria",
    summary:
      "Collision theory, the four rate factors, dynamic equilibrium and Le Chatelier — the qualitative toolkit that Topic 11 and 13 deepen.",
    minutes: 18,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Reactions only happen when colliding particles carry at least the ==activation energy==, E~a~, and hit with the right orientation. Raise the fraction of successful collisions and the rate rises. Every rate factor in the course is one of two moves: more frequent collisions, or more energetic ones.",
      },
      {
        k: "table",
        caption: "The four rate factors — and which move each makes",
        head: ["Factor", "Effect on collisions", "Why"],
        rows: [
          ["Temperature ↑", "more frequent *and* more energetic", "faster particles, and a much larger fraction exceeds E~a~"],
          ["Concentration / pressure ↑", "more frequent", "more particles in the same volume"],
          ["Surface area ↑", "more frequent", "more solid particles exposed to attack"],
          ["Catalyst", "neither — new route", "lower E~a~, so the existing collisions succeed more often"],
        ],
      },
      {
        k: "def",
        term: "Catalyst",
        text: "A substance that increases the rate of a reaction by providing an alternative route with a lower activation energy, and is left unchanged at the end. Heterogeneous catalysts are in a different phase from the reactants (iron in the Haber process); homogeneous ones are in the same phase.",
      },
      {
        k: "p",
        text: "Now the second half of the toolkit. Many reactions are reversible; in a closed system they settle into ==dynamic equilibrium== — both directions still reacting, at equal rates, so concentrations stop changing. Not static: dynamic. The composition at equilibrium is the ==position==, and it moves predictably when you disturb it.",
      },
      {
        k: "def",
        term: "Le Chatelier's principle",
        text: "When a system at equilibrium is disturbed, the position shifts to oppose the change. Raise the concentration of a reactant → the forward reaction uses it; raise the pressure → the side with fewer gas molecules grows; raise the temperature → the endothermic direction is favoured.",
      },
      {
        k: "ex",
        title: "Predicting shifts — N₂ + 3H₂ ⇌ 2NH₃, ΔH negative",
        steps: [
          "Increase the pressure: 4 mol of gas on the left, 2 on the right — the equilibrium shifts right, towards fewer molecules.",
          "Increase the temperature: the forward reaction is exothermic, so the equilibrium shifts left, the endothermic way.",
          "Add an iron catalyst: equilibrium is reached *faster*, but the position does not move — the same composition, sooner.",
        ],
        answer: "Pressure → right; temperature → left; catalyst → no change in position. Count gas molecules first; then check the sign of ΔH.",
      },
      {
        k: "tips",
        items: [
          "“Dynamic” must appear in the definition — both reactions continue at equal rate.",
          "A catalyst changes rate, never the position — the single most-tested sentence in this topic.",
          "Pressure only matters when the two sides have different numbers of ==gas== molecules.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Why does a mixture of flour dust ignite faster than a pile of flour?",
            a: "Dust has enormous surface area — far more particles exposed to oxygen at once, so far more frequent successful collisions.",
          },
          {
            q: "For 2SO~2~ + O~2~ ⇌ 2SO~3~ (exothermic), what happens to the position if temperature is raised?",
            a: "It shifts left, favouring the endothermic reverse reaction — less SO~3~ at equilibrium. Rate rises, yield falls: the industrial compromise begins here.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Collisions need E~a~ and orientation; factors work by frequency or energy.",
          "Catalyst: alternative route, lower E~a~, unchanged at the end.",
          "Dynamic equilibrium: closed system, equal rates, constant macroscopic properties.",
          "Le Chatelier: the position opposes the disturbance — concentration, pressure, temperature.",
          "Catalysts speed arrival, never move the destination.",
        ],
      },
    ],
  },
  {
    id: "t10",
    no: "10",
    label: "Topic 10",
    title: "Halogenoalkanes, alcohols and spectra",
    summary:
      "Nucleophilic substitution and elimination, the ozone story, alcohol chemistry — and the first two analytical machines: mass spectrometer and IR.",
    minutes: 30,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "The C–X bond in a halogenoalkane is polar — carbon δ^+^, halogen δ^−^ — which invites attack by electron-pair donors. A ==nucleophile== is exactly that: a lone-pair donor such as OH^−^, CN^−^ or NH~3~ that attacks the positive carbon. Whether the halogenoalkane then ==substitutes== or ==eliminates== is decided by the reagent and solvent you choose.",
      },
      {
        k: "ex",
        title: "SN2 — primary halogenoalkane + aqueous OH⁻",
        steps: [
          "OH^−^ attacks the δ^+^ carbon from the side *opposite* the halogen (backside attack) — arrow from the OH lone pair to the carbon.",
          "A transition state forms with the carbon half-bonded to both O and Br; draw it in square brackets with a δ^−^ on each end.",
          "The C–Br pair leaves with the bromine: arrow from the C–Br bond to Br.",
        ],
        answer: "CH~3~CH~2~Br + OH^−^ → CH~3~CH~2~OH + Br^−^ — substitution, one step, inversion of configuration. Tertiary halogenoalkanes go SN1 instead: Br^−^ leaves first to form a carbocation, then the nucleophile attacks the planar intermediate.",
      },
      {
        k: "eq",
        title: "Substitution vs elimination — the solvent decides",
        eq: "C~4~H~9~Br + OH^−^ → C~4~H~9~OH + Br^−^  (aq, warm)        C~4~H~9~Br + OH^−^ → C~4~H~8~ + H~2~O + Br^−^  (ethanolic, hot)",
        note: "Aqueous hydroxide substitutes; ethanolic hydroxide eliminates an H and the halogen to form an alkene.",
        ok: ["atoms balance", "charge balance"],
      },
      {
        k: "p",
        text: "Hydrolysis rate depends on ==bond strength, not polarity==: C–I is the most polarised but also the weakest bond, so iodoalkanes hydrolyse fastest (C–I < C–Br < C–Cl in bond enthalpy → rates run the opposite way). Set this up with aqueous ethanol and silver nitrate and watch the precipitate timings — a Core Practical in spirit and a classic data question.",
      },
      {
        k: "p",
        text: "The ozone layer made halogenoalkanes famous. CFCs are so unreactive that they survive the journey to the stratosphere, where UV finally breaks the C–Cl bond homolytically. The chlorine radical then destroys ozone ==catalytically== — Cl• + O~3~ → ClO• + O~2~, then ClO• + O → Cl• + O~2~ — one chlorine atom cycling through thousands of ozone molecules. That chain is why CFCs were replaced.",
      },
      {
        k: "table",
        caption: "Alcohols — oxidation rules with acidified K₂Cr₂O₇ (orange → green)",
        head: ["Class", "Distil (limit contact)", "Reflux (prolonged)"],
        rows: [
          ["Primary R–CH~2~OH", "aldehyde R–CHO", "carboxylic acid R–COOH"],
          ["Secondary R~2~CH–OH", "ketone R~2~C=O", "ketone — no further"],
          ["Tertiary R~3~C–OH", "no reaction", "no reaction — no H on the carbinol carbon"],
        ],
      },
      {
        k: "p",
        text: "Alcohols also ==dehydrate== to alkenes (pass the vapour over heated Al~2~O~3~ or use concentrated H~2~SO~4~), ==combust== cleanly, and form ==esters== with carboxylic acids over a strong acid catalyst — CH~3~COOH + C~2~H~5~OH ⇌ CH~3~COOC~2~H~5~ + H~2~O, the equilibrium arrow doing real work here (Topic 13 explains it).",
      },
      {
        k: "p",
        text: "Two machines end the topic. The ==mass spectrometer== (Topic 2's friend) now reads *molecules*: the rightmost major peak is the ==molecular ion M^+^==, whose m/z gives the relative molecular mass, and the fragment peaks below it are a fingerprint of structure — chlorine's M and M+2 peaks in a 3 : 1 ratio is the giveaway that keeps reappearing. ==Infrared== spectroscopy identifies bonds by vibration: each bond absorbs a characteristic frequency, plotted as dips in % transmission.",
      },
      {
        k: "table",
        caption: "IR absorptions worth memorising (wavenumber / cm⁻¹)",
        head: ["Bond", "Range", "Signature"],
        rows: [
          ["O–H (alcohol)", "3200–3600", "broad, rounded dip"],
          ["O–H (acid)", "2500–3300", "very broad, spills wide"],
          ["N–H", "3300–3500", "sharp-ish, one dip per H"],
          ["C=O", "1680–1750", "strong, sharp — the easiest dip to spot"],
          ["C–H", "2850–3300", "always present, rarely diagnostic"],
        ],
      },
      {
        k: "tips",
        items: [
          "Curly arrows in SN2 start on a *lone pair or negative charge* — never on the bare atom symbol.",
          "“Aqueous” and “ethanolic” are one-word command signals for substitution vs elimination: circle them in the question.",
          "M and M+2 of equal height = one bromine; 3 : 1 = one chlorine — isotopes doing analytical work.",
          "The region below 1500 cm^−1^ is the fingerprint region: never assigned, only matched.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Why does 1-iodobutane hydrolyse faster than 1-chlorobutane?",
            a: "The C–I bond has a lower bond enthalpy than C–Cl, so it breaks more readily in the rate-determining step. Polarity runs the other way — it is bond strength that governs the rate.",
          },
          {
            q: "Propan-2-ol is refluxed with acidified potassium dichromate. Product?",
            a: "Propanone. A secondary alcohol oxidises once to a ketone and stops — no amount of reflux pushes it further.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Nucleophile = lone-pair donor attacking δ^+^ carbon.",
          "SN2 (primary, one step, backside) vs SN1 (tertiary, carbocation).",
          "aq OH^−^ substitutes; ethanolic OH^−^ eliminates. Rate order: C–I fastest.",
          "CFC radicals catalytically destroy O~3~ — two propagation equations.",
          "Oxidation table: 1° distil→aldehyde / reflux→acid; 2°→ketone; 3° resists.",
          "M^+^ gives M~r~; IR dips give bonds — C=O at ~1700 is the giveaway.",
        ],
      },
    ],
  },
];
