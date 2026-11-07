import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WCH15 · Transition Metals and Organic Nitrogen Chemistry
   Topics 17–21 of the Pearson IAL 2018 specification.
   ═══════════════════════════════════════════════════════════════ */

export const WCH15_TOPICS: Topic[] = [
  {
    id: "t17",
    no: "17",
    label: "Topic 17",
    title: "Redox equilibria and electrochemistry",
    summary:
      "Electrode potentials as the league table of oxidising power, EMF as the verdict on feasibility — and why feasible still may not happen.",
    minutes: 24,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Every redox reaction is two half-equations, and each half-equation has an ==equilibrium== position: the electrons want to flow from the species that holds them loosely to the one that holds them tightly. An electrochemical cell measures that preference as a voltage. This topic is the entire logic of redox, compressed into one number per half-equation.",
      },
      {
        k: "def",
        term: "Standard electrode potential, E°",
        text: "The voltage of a half-cell measured against the ==standard hydrogen electrode== (assigned 0.00 V) under standard conditions: 298 K, 100 kPa for gases, 1.00 mol dm^−3^ solutions. By convention E° is written as a ==reduction==: Cu^2+^ + 2e^−^ ⇌ Cu, E° = +0.34 V.",
      },
      {
        k: "def",
        term: "EMF of a cell, E°cell",
        text: "E°cell = E°(more positive half-cell) − E°(more negative half-cell) — the right-hand side minus the left-hand side as drawn. The more positive electrode is the cathode (reduction); the more negative is the anode (oxidation).",
      },
      {
        k: "p",
        text: "Read E° as a league table: the ==more positive== the value, the stronger the species on the left (the oxidised form) is as an ==oxidising agent== — it pulls electrons hardest. More negative means the reduced form is the stronger ==reducing agent==. A reaction is feasible when the couple with the more positive E° runs as reduction and the other as oxidation, making E°cell > 0.",
      },
      {
        k: "ex",
        title: "The Daniell cell, end to end",
        steps: [
          "Zn^2+^ + 2e^−^ ⇌ Zn, E° = −0.76 V;  Cu^2+^ + 2e^−^ ⇌ Cu, E° = +0.34 V",
          "Cu has the more positive E° → Cu^2+^ is reduced; Zn is oxidised.",
          "E°cell = +0.34 − (−0.76) = +1.10 V",
          "Overall: Zn + Cu^2+^ → Zn^2+^ + Cu (check: electrons balance, no charge left over)",
        ],
        answer: "E°cell = +1.10 V, positive — feasible, and the voltage a high-resistance voltmeter would read.",
      },
      {
        k: "p",
        text: "E° is a thermodynamic verdict only. A positive EMF says the reaction *can* run; it says nothing about rate — a mixture of H~2~ and O~2~ can sit for years despite a huge ΔE. It also assumes standard conditions: change the concentrations and you shift the half-cell equilibria (Le Chatelier again). Dilute the Cu^2+^ in the Daniell cell and the reduction is less favoured — E° falls, and the EMF drops below 1.10 V.",
      },
      {
        k: "ex",
        title: "Disproportionation, judged by numbers",
        steps: [
          "Copper(I): Cu^2+^ + e^−^ ⇌ Cu^+^, E° = +0.15 V;  Cu^+^ + e^−^ ⇌ Cu, E° = +0.52 V",
          "For 2Cu^+^ → Cu^2+^ + Cu: Cu^+^ is both oxidised (to Cu^2+^) and reduced (to Cu).",
          "E°cell = E°(reduction) − E°(oxidation) = +0.52 − (+0.15) = +0.37 V",
        ],
        answer: "E°cell = +0.37 V > 0, so Cu^+^ disproportionates in aqueous solution — unstable between its neighbours.",
      },
      {
        k: "tips",
        items: [
          "Always subtract ==reduction − oxidation== in the standard directions; mixing up the order flips the sign and every conclusion with it.",
          "“Feasible” answers should quote E°cell > 0, then — for the top marks — note that kinetics (activation energy) decides whether it happens.",
          "Non-standard conditions: name which half-equation is pushed and which way. More of the oxidised form → the reduction is favoured → E° rises.",
        ],
      },
      {
        k: "recap",
        items: [
          "E°: voltage vs SHE at 298 K, 100 kPa, 1.00 mol dm^−3^.",
          "Written as reductions; more positive = stronger oxidising agent.",
          "E°cell = E°(reduction) − E°(oxidation); positive = feasible.",
          "Feasible ≠ fast — kinetics is a separate verdict.",
          "Non-standard concentrations shift E° by Le Chatelier.",
        ],
      },
    ],
  },
  {
    id: "t18",
    no: "18",
    label: "Topic 18",
    title: "Transition metals and their chemistry",
    summary:
      "Partially filled d sub-shells explain everything: variable oxidation states, coloured complexes, ligand substitution, and catalysis.",
    minutes: 26,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "One definition powers the whole topic: a ==transition metal== forms at least one stable ion with a ==partially filled d sub-shell==. That half-filled d set is why iron swings between +2 and +3, why aqueous Cu^2+^ is blue, why the same ion can catalyse two reactions — and why scandium (only Sc^3+^, empty d) and zinc (only Zn^2+^, full d) are excluded from the definition.",
      },
      {
        k: "def",
        term: "Complex ion and ligand",
        text: "A central metal ion bonded to surrounding ==ligands== — molecules or ions with a lone pair that forms a ==dative covalent== bond to the metal. The ==coordination number== counts the dative bonds: 6 (octahedral, e.g. [Cu(H~2~O)~6~]^2+^), 4 (tetrahedral, e.g. [CuCl~4~]^2−^), or 2 (linear, e.g. [Ag(NH~3~)~2~]^+^).",
      },
      {
        k: "p",
        text: "Colour is a consequence of geometry. Ligands split the five d orbitals into two energy sets; the gap absorbs one visible wavelength and the complex shows the rest — [Cu(H~2~O)~6~]^2+^ absorbs red-orange and glows blue. Change the ligands and you change the gap: add concentrated HCl to a blue Cu^2+^ solution and the colour walks to ==yellow [CuCl~4~]^2−^== through a green mixture on the way.",
      },
      {
        k: "table",
        caption: "The observation bank — NaOH and aqueous ammonia on three cations",
        head: ["Ion", "NaOH(aq), few drops", "NH~3~(aq), few drops", "Excess NH~3~"],
        rows: [
          ["Cu^2+^ (blue)", "pale blue ppt Cu(OH)~2~", "pale blue ppt", "ppt dissolves → deep blue solution [Cu(NH~3~)~4~(H~2~O)~2~]^2+^"],
          ["Fe^2+^ (pale green)", "green ppt Fe(OH)~2~, browns in air", "green ppt, browns", "insoluble — ppt stays"],
          ["Fe^3+^ (yellow-brown)", "rust-brown ppt Fe(OH)~3~", "rust-brown ppt", "insoluble — ppt stays"],
        ],
      },
      {
        k: "p",
        text: "The Cu^2+^ row is ligand substitution written in colour: NH~3~ first acts as a base (the precipitate), then in excess as a ligand, replacing four waters. Chromium completes the set if your teacher covered it: green Cr^3+^ → grey-green ppt → deep green solution in excess, oxidised by H~2~O~2~ to yellow CrO~4~^2−^. Learn your school's exact palette — but learn it as ==ion / reagent / observation== triples, because that is precisely how WCH16 marks it.",
      },
      {
        k: "eq",
        title: "Permanganate titration — the workhorse of Unit 5",
        eq: "MnO~4~^−^ + 8H^+^ + 5Fe^2+^ → Mn^2+^ + 4H~2~O + 5Fe^3+^",
        note: "Purple → colourless at the end-point: MnO~4~^−^ is self-indicating. Use dilute H~2~SO~4~, never HCl — Cl^−^ would be oxidised and inflate the titre.",
        ok: ["1 : 5 ratio", "H2SO4 only"],
      },
      {
        k: "ex",
        title: "Iron in a tablet, by titration",
        steps: [
          "25.0 cm^3^ of a solution made from one tablet needs 24.30 cm^3^ of 0.0200 mol dm^−3^ KMnO~4~.",
          "n(MnO~4~^−^) = 0.0200 × 24.30/1000 = 4.86 × 10^−4^ mol",
          "n(Fe^2+^) = 5 × 4.86 × 10^−4^ = 2.43 × 10^−3^ mol (the 1 : 5 ratio)",
          "c(Fe^2+^) = 2.43 × 10^−3^ ÷ 0.0250",
        ],
        answer: "c = 0.0972 mol dm^−3^ — quote the ratio multiplication explicitly; it is where M1 sits.",
      },
      {
        k: "p",
        text: "Catalysis comes in two architectures. ==Heterogeneous== catalysts are a different phase from the reactants — iron in the Haber process, V~2~O~5~ in the Contact process — and work by adsorbing reactants onto the surface, weakening bonds, then releasing product: adsorb, react, desorb. ==Homogeneous== catalysts share the reactants' phase and work through an oxidation-state shuttle: Fe^2+^ reduces S~2~O~8~^2−^ to SO~4~^2−^, becoming Fe^3+^, which then oxidises I^−^ — and returns to Fe^2+^. The catalyst's trick is that both steps have lower activation energy than the impossible direct collision of two anions.",
      },
      {
        k: "tips",
        items: [
          "Observation answers must carry ==colour and state==: “pale blue precipitate, dissolves in excess ammonia to a deep blue solution” — one or the other alone is half an answer.",
          "In MnO~4~^−^ titrations the acidic medium is a named mark: dilute sulfuric acid; explain why with the Cl^−^ oxidation argument.",
          "Define transition metal with the ==ion== wording — “partially filled d sub-shell in an ion”, not in the atom; that wording is what excludes Sc and Zn.",
        ],
      },
      {
        k: "recap",
        items: [
          "Transition metal: an ion with a partially filled d sub-shell.",
          "Ligands donate lone pairs; CN 6 octahedral, 4 tetrahedral, 2 linear.",
          "d orbitals split → specific wavelengths absorbed → colour.",
          "Cu^2+^/Fe^2+^/Fe^3+^ vs NaOH and NH~3~ — the observation bank.",
          "MnO~4~^−^/Fe^2+^ is 1 : 5 in H~2~SO~4~; adsorb–react–desorb vs the Fe shuttle.",
        ],
      },
    ],
  },
  {
    id: "t19",
    no: "19",
    label: "Topic 19",
    title: "Arenes — benzene and aromatic chemistry",
    summary:
      "The evidence for delocalisation, electrophilic substitution that protects the ring, and phenol — the ring that activates itself.",
    minutes: 24,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Benzene refused every classical structure, and the evidence is the exam. All six C–C bonds measure ==139 pm== — between a single bond (154 pm) and a double (134 pm). Hydrogenating one C=C in cyclohexene releases 120 kJ mol^−1^, so a “cyclohexatriene” should release 360; benzene releases only ==208 kJ mol^−1^==. The missing 152 kJ mol^−1^ is the ==delocalisation energy== — six electrons spread evenly above and below the ring, a structure no Kekulé drawing can represent.",
      },
      {
        k: "def",
        term: "Electrophilic substitution",
        text: "Benzene's π cloud attacks strong electrophiles — but the product ==substitutes== a ring H rather than adding, because addition would destroy the delocalised system and cost the 152 kJ mol^−1^. The mechanism: electrophile attacks → ring loses aromaticity temporarily → H^+^ leaves and aromaticity is restored.",
      },
      {
        k: "eq",
        title: "Making the electrophiles",
        eq: "HNO~3~ + 2H~2~SO~4~ → NO~2~^+^ + 2HSO~4~^−^ + H~3~O^+^        Cl~2~ + AlCl~3~ → Cl^+^ + AlCl~4~^−^",
        note: "Nitration: conc. HNO~3~ + conc. H~2~SO~4~ at 50 °C. Halogenation: a halogen carrier (AlCl~3~ or FeBr~3~) — benzene will not react with dry halogens alone, unlike alkenes.",
        ok: ["NO2+ is the electrophile", "carrier regenerates"],
      },
      {
        k: "p",
        text: "Compare the two π systems and the whole of Unit 5 organic chemistry clicks. An ==alkene== reacts instantly with bromine water: the localised C=C polarises Br~2~ and addition follows. ==Benzene== needs a catalyst to build the electrophile at all — its delocalised electrons are lower in energy, less available. The same difference explains the conditions: phenol, whose ring is activated by the O–H's donated electrons, decolourises bromine water in the cold with no catalyst, giving a white precipitate of tribromophenol.",
      },
      {
        k: "ex",
        title: "Ranking acid strength — ethanol, water, phenol, ethanoic acid",
        steps: [
          "Ethanol: C~2~H~5~O^−^ is destabilised — the ethyl group pushes electrons onto the charged O. Weakest acid.",
          "Water: plain O–H, no stabilisation either way.",
          "Phenol: the phenoxide lone pair ==delocalises into the ring==, spreading the negative charge over four carbons. Stronger than water — but not enough to fizz with NaHCO~3~.",
          "Ethanoic acid: the carboxylate spreads charge over ==two oxygens==. Strongest — and the only one that fizzes with sodium hydrogencarbonate.",
        ],
        answer: "ethanol < water < phenol < ethanoic acid — the test: only the carboxylic acid gives CO~2~ with NaHCO~3~.",
      },
      {
        k: "p",
        text: "Substituents edit the ring's behaviour. A methyl group donates electrons, so ==methylbenzene nitrates more easily== than benzene (and 2,4,6-trinitromethylbenzene — TNT — needs nothing gentler than the fact). Nitrobenzene, by contrast, is deactivated and resists further substitution. “Compare the ease of nitration” questions are answered with exactly this electron-donation/withdrawal language.",
      },
      {
        k: "tips",
        items: [
          "The hydrogenation numbers are an essay question: quote 120, 360 (3 × 120) and 208, then name the 152 kJ mol^−1^ delocalisation energy.",
          "State symbols and conditions in electrophile-generation equations — H~2~SO~4~ twice in the nitration equation is the mark students drop.",
          "Phenol vs carboxylic acid: both react with NaOH; ==only the carboxylic acid reacts with NaHCO~3~==. That single test settles the classic comparison question.",
        ],
      },
      {
        k: "recap",
        items: [
          "Bonds 139 pm; hydrogenation 208 vs 360 predicted; 152 kJ mol^−1^ delocalisation energy.",
          "Electrophilic substitution protects the ring's aromaticity.",
          "NO~2~^+^ from HNO~3~/H~2~SO~4~; Cl^+^ from Cl~2~/AlCl~3~.",
          "Benzene needs carriers; alkenes don't; phenol needs neither.",
          "Acidity: ethanol < water < phenol < ethanoic acid.",
        ],
      },
    ],
  },
  {
    id: "t20",
    no: "20",
    label: "Topic 20",
    title: "Amines, amino acids, proteins and DNA",
    summary:
      "Nitrogen's lone pair runs the show: bases and their salts, zwitterions, peptide bonds, the double helix — and cis-platin's interference.",
    minutes: 26,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Amines are ammonia with alkyl or aryl groups standing in for hydrogens, and everything about them follows from one feature: the ==lone pair on nitrogen==. It accepts protons (basicity), attacks δ+ carbons (nucleophilicity) and coordinates to metals (ligand chemistry). Rank basicities by asking how available that lone pair is.",
      },
      {
        k: "p",
        text: "The basicity order the exam loves: ==aliphatic amine > ammonia > aromatic amine==. Ethylamine beats ammonia because the ethyl group pushes electrons onto N, fattening the lone pair. Phenylamine loses to ammonia because its lone pair is dragged into the benzene ring's delocalised system — half-spent on the ring, weakly offered to H^+^. All three still form salts with acids: (CH~3~)~2~NH + HCl → (CH~3~)~2~NH~2~^+^Cl^−^.",
      },
      {
        k: "def",
        term: "Amino acid and zwitterion",
        text: "A 2-amino carboxylic acid, H~2~N–CH(R)–COOH. In the solid state and near-neutral solution it exists as a ==zwitterion==: H~3~N^+^–CH(R)–COO^−^, with both charges internal. In strong acid the amine end is protonated; in strong base the carboxyl end is deprotonated — amino acids are their own buffers.",
      },
      {
        k: "p",
        text: "Two amino acids join when one carboxyl group condenses with another's amine, losing water and forming the ==amide (peptide) bond==. Chains of them are proteins, and their shape is chemistry, not decoration: the ==primary structure== is the amino-acid sequence; ==secondary== is H-bonding into α-helices and β-sheets; ==tertiary== folds the whole chain with ionic bonds, disulfide bridges (between two cysteines), more H-bonds and hydrophobic clustering. Heat or pH change disrupts those bonds — denaturation — which is why egg white sets and never unsets.",
      },
      {
        k: "p",
        text: "Condensation polymers generalise the peptide bond. ==Polyamides== (nylon-6,6; Kevlar) link diacids with diamines; ==polyesters== link diacids with diols. Both carry the amide or ester linkage that ==hydrolysis can cut== — which is what separates them from addition polymers like polyethene, whose C–C backbone laughs at water. Draw the repeating unit by opening both functional groups and losing the small molecule between them.",
      },
      {
        k: "p",
        text: "DNA is a condensation polymer with information architecture. Each ==nucleotide== = phosphate + deoxyribose + base; the sugar–phosphate chain is the backbone, and the bases pair across the middle: ==A–T with two hydrogen bonds, C–G with three== — the three-bond pair is stronger, so GC-rich DNA denatures at higher temperature. Replication unzips the strands and each acts as a template, giving two semi-conservative daughters.",
      },
      {
        k: "p",
        text: "Cis-platin is Topic 17 and Topic 20 shaking hands. The square-planar Pt(II) complex [Pt(NH~3~)~2~Cl~2~] undergoes ==ligand substitution== inside the nucleus: water replaces a chloride, and the platinum bonds to a nitrogen on guanine — eventually cross-linking two guanines on one strand. The kinked, cross-linked DNA cannot replicate; the cell self-destructs. The same action on healthy cells causes the side effects, and the ==trans== isomer is ineffective — geometry is the drug.",
      },
      {
        k: "tips",
        items: [
          "Basicity explanations must name where the lone pair ==is==: pushed onto N by alkyl (more basic) or delocalised into the ring by phenyl (less basic).",
          "Draw peptide-bond formation with the water molecule explicitly lost — and be able to spot the bond's C=O and N–H when asked where hydrolysis attacks.",
          "A–T two H-bonds, C–G three: if a question says “explain why GC-rich DNA is more stable”, that asymmetry is the whole answer.",
        ],
      },
      {
        k: "recap",
        items: [
          "Basicity: aliphatic amine > NH~3~ > phenylamine — lone-pair availability.",
          "Amino acids: zwitterions; buffers in acid and base.",
          "Peptide bond = amide link from condensation; proteins fold in 3 levels.",
          "Polyamides/polyesters hydrolyse; addition polymers don't.",
          "DNA: A–T (2), C–G (3); cis-platin cross-links guanine.",
        ],
      },
    ],
  },
  {
    id: "t21",
    no: "21",
    label: "Topic 21",
    title: "Organic synthesis",
    summary:
      "Choosing the right arrow: multi-step routes, the carbon-counting trick of the nitrile route, and yield thinking across a sequence.",
    minutes: 22,
    ao: ["AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Synthesis questions hand you a target and ask for the road. The exam only ever asks for routes of ==one or two steps== (three for the bravest), so the game is memory organised into a map: every family and every arrow from Units 1, 2, 4 and 5, held in one table you can reproduce under time pressure.",
      },
      {
        k: "table",
        caption: "The route table — cover it and recite it",
        head: ["Transformation", "Reagents and conditions", "Watch for"],
        rows: [
          ["alkene → haloalkane", "HX, room temperature", "Markownikoff — which isomer dominates"],
          ["haloalkane → alcohol", "NaOH(aq), warm, reflux", "aqueous = substitution"],
          ["haloalkane → alkene", "NaOH in ethanol, heat", "ethanolic = elimination"],
          ["haloalkane → nitrile", "KCN in ethanol, reflux", "==adds one carbon=="],
          ["nitrile → amine", "LiAlH~4~, then dilute acid", "reduction, same carbon count"],
          ["nitrile → acid", "dilute H~2~SO~4~, reflux", "hydrolysis, same carbon count"],
          ["primary alcohol → aldehyde", "acidified K~2~Cr~2~O~7~, ==distil==", "remove it before over-oxidation"],
          ["primary alcohol → acid", "acidified K~2~Cr~2~O~7~, ==reflux==", "excess oxidant, full oxidation"],
          ["secondary alcohol → ketone", "acidified K~2~Cr~2~O~7~, reflux", "ketone resists further oxidation"],
          ["alcohol → alkene", "conc. H~2~SO~4~, 170 °C (or Al~2~O~3~, heat)", "elimination of water"],
          ["acid + alcohol → ester", "warm with a few drops of conc. H~2~SO~4~", "reversible — name the equilibrium"],
          ["acid → acyl chloride", "SOCl~2~, anhydrous", "the gateway to ester/amide synthesis"],
        ],
      },
      {
        k: "ex",
        title: "The carbon-counting trick, demonstrated",
        steps: [
          "Target: propylamine, CH~3~CH~2~CH~2~NH~2~, from bromoethane.",
          "Direct substitution (excess NH~3~, ethanol, sealed tube, heat) works — but notice the carbon count: target has 3, start has 2.",
          "KCN in ethanol, reflux: CH~3~CH~2~Br → CH~3~CH~2~CN (the CN carbon joins the chain → 3 carbons).",
          "LiAlH~4~, then dilute acid: CH~3~CH~2~CN → CH~3~CH~2~CH~2~NH~2~",
        ],
        answer: "Bromoethane → propanenitrile → propylamine: two steps, +1 carbon, and every intermediate named with its reagents.",
      },
      {
        k: "p",
        text: "Chirality now enters planning. Route through a planar carbonyl (reduction of a ketone, HCN addition) gives a ==racemic== product — fine for fuels, fatal for drugs: one enantiomer of thalidomide's successor molecules treats nausea while another does harm, so modern syntheses either build the centre asymmetrically or resolve the mixture. Mention this in any synthesis question that passes through a planar intermediate — it is an AO3 staple.",
      },
      {
        k: "p",
        text: "Yield multiplies across steps: two 80 % steps deliver only 64 % overall, which is why industrial chemists chase shorter routes and why atom economy (Unit 1) still appears in final-unit questions. Between steps, the product must be ==purified== — recrystallisation for solids, distillation for liquids — and WCH16 will ask you to describe that work-up in detail.",
      },
      {
        k: "tips",
        items: [
          "Write routes as a ==chain of named intermediates== with reagents and conditions on the arrows — full marks need all three layers, not just the products.",
          "Aqueous vs ethanolic NaOH is the most-asked condition distinction in the paper: same reagent, two different products.",
          "If the carbon count changes, the nitrile route (KCN then hydrolyse or reduce) is almost always the intended path.",
        ],
      },
      {
        k: "recap",
        items: [
          "One- and two-step routes only — but every reagent and condition named.",
          "Aqueous NaOH substitutes; ethanolic eliminates.",
          "KCN adds exactly one carbon; hydrolysis or reduction finishes the job.",
          "Distil the aldehyde, reflux the acid.",
          "Planar intermediates racemise — a planning constraint, not a footnote.",
        ],
      },
    ],
  },
];
