import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 3 revision note · sections 3.13 – 3.20
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 3
   class note (2020, semester 1); page furniture omitted.
   Exercises from the note are presented as fully worked examples.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T03_B: SpecSection[] = [
  {
    spec: "3.13",
    statement: "understand the meaning of the term ‘electronegativity’ as applied to atoms in a covalent bond",
    title: "Electronegativity",
    blocks: [
      {
        k: "def",
        term: "Electronegativity",
        text: "The ability of an atom to ==attract the bonding pair of electrons== in a covalent bond to itself.",
      },
      {
        k: "bullets",
        items: [
          "Electronegativity is usually measured using the **Pauling scale**.",
          "**Fluorine** is the most electronegative element on the scale — it is given a value of **4.0**.",
          "**Caesium** has the lowest value, **0.7**.",
        ],
      },
      { k: "h", text: "Trends in electronegativity" },
      {
        k: "table",
        caption: "The two trends, with the reasons the mark scheme wants",
        head: ["Direction", "Trend", "Why"],
        rows: [
          ["Across a period", "increases", "nuclear charge increases · the outer electrons are in the same shell · there is no extra shielding → more attraction between the nucleus and the shared pair of electrons"],
          ["Down a group", "decreases", "the outer electrons are further away from the nucleus · there is increased shielding → less attraction between the nucleus and the shared pair of electrons"],
        ],
      },
      {
        k: "wow",
        text: "Electronegativity is a ==tug-of-war over one shared pair==. Fluorine (4.0) pulls hardest, caesium (0.7) barely pulls at all — and the *difference* between the two contestants decides everything in 3.14 and 3.15.",
      },
      { k: "checkpoint", page: 77 },
    ],
  },
  {
    spec: "3.14",
    statement:
      "know that ionic and covalent bonding are the extremes of a continuum of bonding type and be able to explain this in terms of electronegativity differences, leading to bond polarity in bonds and molecules, and to ionic bonding if the electronegativity difference is large enough",
    title: "The bonding continuum",
    blocks: [
      {
        k: "p",
        text: "Most bonds aren't purely ionic or purely covalent but somewhere in between (**intermediate bonding**). Electronegativity is the main factor which leads to these intermediate bondings. ==Ionic and covalent bonding are the two extremes== of one continuum, and the electronegativity difference ΔEN between the two atoms decides where a bond sits on it.",
      },
      {
        k: "table",
        caption: "Classifying a bond from its electronegativity difference",
        head: ["ΔEN", "Bond type", "Charges"],
        rows: [
          ["ΔEN = 0", "Pure covalent (no charges) — electrons shared equally", "none"],
          ["1.7 > ΔEN > 0", "Polar covalent — predominantly covalent with some ionic character", "partial charges: A^δ+^ and Z^δ−^"],
          ["ΔEN ≥ 1.7", "Ionic — predominantly ionic with some covalent character", "full charges: A^+^ and Z^−^"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · classify the bond",
        question: "Using Pauling values, classify each bond: Na—Cl, Cs—F, Sr—Br, H—O, C—H, Mg—H, Cl—Cl, C—O. (H 2.1 · Li 1.0 · Na 0.9 · Mg 1.2 · Sr 1.0 · Cs 0.7 · C 2.5 · O 3.5 · F 4.0 · Cl 3.0 · Br 2.8)",
        steps: [
          "Na—Cl: 3.0 − 0.9 = **2.1** → ≥ 1.7 → **ionic**",
          "Cs—F: 4.0 − 0.7 = **3.3** → ≥ 1.7 → **ionic**",
          "Sr—Br: 2.8 − 1.0 = **1.8** → ≥ 1.7 → **ionic**",
          "H—O: 3.5 − 2.1 = **0.9** → polar covalent (water's bonds)",
          "C—H: 2.5 − 2.1 = **0.4** → polar covalent, but so small it is usually treated as non-polar",
          "Mg—H: 2.1 − 1.2 = **0.9** → polar covalent",
          "Cl—Cl: 3.0 − 3.0 = **0** → pure covalent — identical atoms share equally",
          "C—O: 3.5 − 2.5 = **1.0** → polar covalent",
        ],
        answer: "Ionic: Na—Cl, Cs—F, Sr—Br · polar covalent: H—O, C—H, Mg—H, C—O · pure covalent: Cl—Cl.",
      },
      {
        k: "p",
        text: "Water shows the intermediate case perfectly: oxygen 3.0 (on the class-note scale) and hydrogen 2.1 give ΔEN = 0.9. Water is neither purely ionic nor purely covalent — it contains no positive and negative ions, yet the electrons are not shared equally. It is best described as a **polar compound**: one end of the molecule is partially positive (δ^+^), the other partially negative (δ^−^).",
      },
      {
        k: "note",
        label: "The ends of the continuum",
        text: "Pure covalent (ΔEN = 0) at one end, ionic (ΔEN ≥ 1.7) at the other — and ==every real bond lives somewhere between==. The greater the electronegativity difference, the greater the bond polarity, until the pair tips over into a full transfer: ionic bonding.",
      },
      { k: "checkpoint", page: 77 },
    ],
  },
  {
    spec: "3.15",
    statement:
      "be able to distinguish between polar bonds and polar molecules and predict whether or not a given molecule is likely to be polar",
    title: "Polarity of molecules",
    blocks: [
      { k: "h", text: "Non-polar and polar covalent bonds" },
      {
        k: "bullets",
        items: [
          "**Non-polar bond** — similar atoms have the same electronegativity, both pull on the electrons to the same extent, so the electrons are ==equally shared== and the electron density is symmetrical: a pure covalent bond.",
          "**Polar covalent bond** — the bonded atoms differ in electronegativity and share the electron pair ==unequally==: partial negative charge (δ^−^) on the more electronegative atom, partial positive charge (δ^+^) on the less electronegative one.",
          "A **dipole** is induced and the bond is said to be polar — the greater the electronegativity difference, the greater the bond polarity.",
          "A polar covalent bond can be represented using an **arrow** to show the direction of electron drift (pointing towards the δ^−^ end).",
        ],
      },
      { k: "h", text: "From bond dipoles to molecular polarity" },
      {
        k: "bullets",
        items: [
          "Polarity is a ==vector== quantity — it has both magnitude and direction.",
          "Some molecules that contain polar bonds are **polar** (they have a permanent dipole); some are **not**, despite every bond being polar.",
          "A molecule is polar only if it has a ==net dipole moment== — it is a bit like balanced forces.",
          "In **symmetrical** molecules the dipoles from each bond cancel out, resulting in no overall polarity: these molecules are **non-polar**.",
          "So ==linear, trigonal planar, tetrahedral, trigonal bipyramidal and octahedral== molecules are non-polar — *provided similar atoms are bonded to the central atom* (e.g. PCl~5~, SF~6~).",
          "Molecules are polar if the bond polarities **do not cancel** — ==angular and pyramidal molecules are polar==.",
        ],
      },
      { k: "figure", kind: "dipoles", caption: "The cancellation test: CO~2~ and CCl~4~ are symmetrical, so their bond dipoles cancel; in CHCl~3~ the H breaks the symmetry and a net dipole remains." },
      {
        k: "worked",
        title: "Worked example · CCl~4~ vs CHCl~3~",
        question: "Tetrachloromethane, CCl~4~, and trichloromethane, CHCl~3~, contain the same polar C—Cl bonds. Why is one molecule non-polar and the other polar?",
        steps: [
          "In CCl~4~ each C—Cl bond is polar — but the molecule is **symmetrical**: four identical dipoles point evenly outwards and ==cancel==.",
          "There is no end (or side) which is slightly negative and one which is slightly positive — no overall separation of charge from top to bottom or left to right. CCl~4~ is **non-polar**.",
          "In CHCl~3~ the hydrogen at the top is *less* electronegative than carbon, so it is slightly positive: the molecule has a slightly positive ‘top’ and a slightly negative ‘bottom’.",
          "The electrons are attracted towards one end of the molecule — the centres of positive and negative charge no longer coincide. CHCl~3~ is **polar**.",
        ],
        answer: "CCl~4~: dipoles cancel → non-polar · CHCl~3~: unsymmetrical → net dipole → polar.",
      },
      {
        k: "worked",
        title: "Worked example · shape and polarity",
        question: "Complete the table: shape, polarity of bond and polarity of molecule for N~2~, NH~3~, OCl~2~ and SiCl~4~.",
        steps: [
          "N~2~ — linear; identical atoms, ΔEN = 0 → bond non-polar → molecule **non-polar**.",
          "NH~3~ — pyramidal (lone pair); N more electronegative than H → polar bonds that do **not** cancel → **polar**.",
          "OCl~2~ — angular (two lone pairs on O); polar bonds, unsymmetrical → **polar**.",
          "SiCl~4~ — tetrahedral; four identical polar Si—Cl bonds cancel by symmetry → **non-polar**.",
        ],
        answer: "N~2~ non-polar · NH~3~ polar · OCl~2~ polar · SiCl~4~ non-polar — bond polarity alone never decides; ==symmetry does==.",
      },
      {
        k: "note",
        label: "The exception: NF~3~",
        text: "NF~3~ has the same geometry as NH~3~, but the molecule has very little polarity (often treated as non-polar) — the lone pair's dipole ==cancels== the polarity of the N—F bonds, which point the other way.",
      },
      {
        k: "steps",
        caption: "Practical: deflected jets of liquid",
        items: [
          { title: "Set up", icon: "target", text: "Place a liquid in a **burette** and allow a narrow stream to run out." },
          { title: "Bring a charge near", icon: "zap", text: "Place a **charged rod** next to the flow of liquid." },
          { title: "Watch the jet", icon: "spark", text: "**Polar** molecules are attracted and deflected towards the charged rod — water's jet bends; **non-polar** molecules (cyclohexane) run straight." },
        ],
      },
      { k: "checkpoint", page: 85 },
    ],
  },
  {
    spec: "3.16",
    statement:
      "understand the principles of the electron pair-repulsion theory, used to interpret and predict the shapes of simple molecules and ions",
    title: "Electron-pair repulsion theory",
    blocks: [
      {
        k: "bullets",
        items: [
          "The shape of a molecule or ion is largely determined by the **total number of electron pairs in the valence shell of the central atom**.",
          "The electron pairs arrange themselves ==as far apart as possible== to minimise repulsion (maximum separation).",
          "Repulsion strength: ==lone pair–lone pair > lone pair–bond pair > bond pair–bond pair==.",
        ],
      },
      {
        k: "eq",
        eq: "lone pair – lone pair  >  lone pair – bond pair  >  bond pair – bond pair",
        note: "“The shape adopted is the one which keeps repulsive forces to a minimum.”",
      },
      {
        k: "steps",
        caption: "The counting method",
        items: [
          { title: "1 · Count", icon: "spark", text: "Count the number of **covalent bond pairs** and **lone pairs** around the central atom. For repulsion purposes, a ==double bond acts like a single bond==." },
          { title: "2 · Arrange", icon: "arrow", text: "Adopt the arrangement which keeps the electron pairs (and so the bonds) **as far apart as possible**." },
          { title: "3 · Name", icon: "target", text: "Name the shape from the *atoms only* — the lone pairs are “invisible” in the final shape, but they still squeeze the angles." },
        ],
      },
      { k: "figure", kind: "shapes", caption: "The complete shape set: electron pairs spread for maximum separation, and every lone pair squeezes the remaining angles by about 2.5°." },
      { k: "h", text: "Species without lone pairs" },
      {
        k: "p",
        text: "Only bond pair–bond pair repulsions occur, so the basic shapes are **regular** — the shape depends purely on the number of bond pairs around the central atom: two → linear (180°), three → trigonal planar (120°), four → tetrahedral (109.5°), five → trigonal bipyramidal (120° and 90°), six → octahedral (90°).",
      },
      { k: "h", text: "Species with lone pairs" },
      {
        k: "bullets",
        items: [
          "Lone pairs have **greater repulsive power** than bond pairs, so they push the bonding pairs away and reduce the bond angles.",
          "The resulting arrangement is based on the total number of electron pairs, but the **actual shape does not include the lone pairs** — they are “invisible”.",
          "Each lone pair decreases the bond angle by about **2.5°**: 109.5° → 107° (one lone pair) → 104.5° (two lone pairs).",
        ],
      },
      {
        k: "wow",
        text: "A water molecule is **angular** even though oxygen has 4 electron pairs — two of them are lone pairs and are “invisible” in the shape. Lone pairs are ==shape-shapers but shape-hiders==.",
      },
    ],
  },
  {
    spec: "3.17",
    statement: "understand the terms ‘bond length’ and ‘bond angle’",
    title: "Bond length and bond angle",
    blocks: [
      {
        k: "def",
        term: "Bond length",
        text: "The ==average distance== between the **centres of the nuclei** of two bonded atoms in a molecule.",
      },
      {
        k: "def",
        term: "Bond angle",
        text: "In molecules made up of three or more atoms, the ==average angle between the bonded orbitals== (i.e. between the two covalent bonds) at the central atom — written θ.",
      },
      {
        k: "p",
        text: "The two terms are the vocabulary of every shape answer: name the shape, then quote the **bond angle** — and remember from 3.10 that shorter bonds are stronger bonds, because the two nuclei and the shared electrons attract each other more strongly over the shorter distance.",
      },
    ],
  },
  {
    spec: "3.18",
    statement:
      "know and be able to explain the shapes of, and bond angles in, BeCl~2~, BCl~3~, CH~4~, NH~3~, NH~4~^+^, H~2~O, CO~2~, gaseous PCl~5~, SF~6~ and C~2~H~4~",
    title: "The shapes and their angles",
    blocks: [
      {
        k: "table",
        caption: "The full WCH11 set — learn the pair counts, the rest follows",
        head: ["Species", "Bond pairs", "Lone pairs", "Shape", "Bond angle"],
        rows: [
          ["BeCl~2~", "2", "0", "Linear", "180°"],
          ["BCl~3~", "3", "0", "Trigonal planar", "120°"],
          ["CH~4~", "4", "0", "Tetrahedral", "109.5°"],
          ["NH~3~", "3", "1", "Trigonal pyramidal", "107°"],
          ["NH~4~^+^", "4", "0", "Tetrahedral", "109.5°"],
          ["H~2~O", "2", "2", "Non-linear (bent)", "104.5°"],
          ["CO~2~", "2 (double)", "0", "Linear", "180°"],
          ["PCl~5~ (gaseous)", "5", "0", "Trigonal bipyramidal", "120° and 90°"],
          ["SF~6~", "6", "0", "Octahedral", "90°"],
          ["C~2~H~4~ (each C)", "3 (one is double)", "0", "Trigonal planar", "≈120°"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · ammonia, NH~3~",
        question: "Explain the shape and bond angle of ammonia.",
        steps: [
          "Nitrogen has five outer electrons: **three** form bonding pairs with hydrogen, **one** remains a lone pair — 3 bond pairs + 1 lone pair (total = 4 pairs).",
          "Four pairs arrange as a **tetrahedron**.",
          "Lone pair–bond pair repulsions are greater than bond pair–bond pair repulsions, so the H—N—H angle is squeezed from 109.5° to 107°.",
        ],
        answer: "Trigonal **pyramidal**, 107° — a tetrahedral arrangement with one invisible lone pair on top.",
      },
      {
        k: "worked",
        title: "Worked example · water, H~2~O",
        question: "Explain the shape and bond angle of water.",
        steps: [
          "Oxygen: **2 bond pairs + 2 lone pairs** (total = 4 pairs) — a tetrahedral arrangement.",
          "The extra lone pair–lone pair repulsion pushes the H—O—H angle down further, to 104.5°.",
          "Only the atoms count in the shape name: two bonds, no more — **angular/bent**.",
        ],
        answer: "**Angular (bent)**, 104.5° — two lone pairs squeezing a tetrahedron.",
      },
      {
        k: "worked",
        title: "Worked example · CO~2~ and SO~2~ — double bonds count as one region",
        question: "Predict the shapes and bond angles of carbon dioxide and sulfur dioxide.",
        steps: [
          "For repulsion purposes, ==double bonds act like single bonds== — each double bond is one bonding region.",
          "CO~2~: 2 double-bond regions, **no lone pairs** → two regions repel to maximum separation → **linear**, 180°.",
          "SO~2~: 2 double-bond regions + **1 lone pair** → three regions, one invisible → **angular/bent**, squeezed to ≈117.5°.",
        ],
        answer: "CO~2~ linear 180° · SO~2~ bent ≈117.5° — count regions, not bonds.",
      },
      { k: "checkpoint", page: 83 },
    ],
  },
  {
    spec: "3.19",
    statement:
      "be able to apply the electron-pair repulsion theory to predict the shapes of, and bond angles in, molecules and ions analogous to those in 3.18",
    title: "Predicting shapes of new species",
    blocks: [
      {
        k: "p",
        text: "The same counting method predicts shapes for any analogous molecule or ion. For **ions**, adjust the electron count for the charge before counting lone pairs. The method predicts the shape of the electron arrangement — in some cases it predicts the shape but ==not the true nature of the bonding==.",
      },
      {
        k: "table",
        caption: "Molecules — from Exercise 4",
        head: ["Molecule", "Bond pairs", "Lone pairs", "Shape", "Bond angle"],
        rows: [
          ["BF~3~", "3", "0", "Trigonal planar", "120°"],
          ["BeI~2~", "2", "0", "Linear", "180°"],
          ["CH~2~Cl~2~", "4", "0", "Tetrahedral", "109.5°"],
          ["PH~3~", "3", "1", "Trigonal pyramidal", "≈107°"],
          ["H~2~S", "2", "2", "Angular/bent", "≈104.5°"],
          ["PCl~3~", "3", "1", "Trigonal pyramidal", "≈107°"],
          ["OF~2~", "2", "2", "Angular/bent", "≈104.5°"],
          ["PBr~5~", "5", "0", "Trigonal bipyramidal", "120° and 90°"],
          ["SCl~6~", "6", "0", "Octahedral", "90°"],
        ],
      },
      {
        k: "table",
        caption: "Ions — from Exercise 5",
        head: ["Ion", "Bond pairs", "Lone pairs", "Shape", "Bond angle"],
        rows: [
          ["AlH~4~^−^", "4", "0", "Tetrahedral", "109.5°"],
          ["ICl~2~^+^", "2", "2", "Angular/bent", "≈104.5°"],
          ["PF~6~^−^", "6", "0", "Octahedral", "90°"],
          ["H~3~O^+^", "3", "1", "Trigonal pyramidal", "≈107°"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · the iodine(I) cation, ICl~2~^+^",
        question: "Predict the shape and bond angle of ICl~2~^+^.",
        steps: [
          "Iodine has **7** outer electrons; the **1+ charge removes one** → 6 electrons.",
          "Two I—Cl bonds use 2 electrons → **2 lone pairs** remain: 2 bond pairs + 2 lone pairs (total = 4).",
          "Tetrahedral arrangement; the two lone pairs are invisible in the shape.",
        ],
        answer: "**Angular/bent**, ≈104.5° — VSEPR works for cations exactly as for molecules.",
      },
      {
        k: "table",
        caption: "Organic molecules — from Exercise 6 (angles at the atoms shown)",
        head: ["Molecule", "Bond angles"],
        rows: [
          ["Ethane, C~2~H~6~", "H—C—H = 109.5° · C—C—H = 109.5°"],
          ["Methanol, CH~3~OH", "H—C—H = 109.5° · H—C—O = 109.5° · C—O—H = ≈104.5° (2 lone pairs on O)"],
          ["Chloromethane, CH~3~Cl", "H—C—H = 109.5° · H—C—Cl = 109.5°"],
          ["Ethene, C~2~H~4~", "H—C—H = ≈120° · C=C—H = ≈120° (trigonal planar at each C)"],
          ["Propene, CH~3~—CH=CH~2~", "H—C—H (methyl) = 109.5° · C—C=C = ≈120° · H—C—H (alkene) = ≈120°"],
          ["Ethanoic acid, CH~3~COOH", "H—C—H = 109.5° · H—C—C = 109.5° · C—C=O = ≈120° (trigonal planar at the C=O) · C—O—H = ≈104.5° (2 lone pairs on O)"],
        ],
      },
      {
        k: "wow",
        text: "One rule of thumb carries the whole table: ==carbon with 4 regions → 109.5° · carbon with 3 regions (any double bond) → 120° · oxygen with 2 lone pairs → 104.5°==. Spot the regions, quote the angle.",
      },
      { k: "checkpoint", page: 83 },
    ],
  },
  {
    spec: "3.20",
    statement:
      "know the four types of solid structure — giant metallic, giant ionic, giant covalent and simple molecular — and be able to relate the physical properties of each type to its structure",
    title: "Structure and properties",
    blocks: [
      {
        k: "p",
        text: "The four types of solid structures covered in this topic are **1 · giant metallic lattices**, **2 · giant ionic lattices**, **3 · giant covalent lattices** and **4 · discrete (simple) molecular lattices**. Every property question is answered by asking what particles are present and what has to be broken or moved.",
      },
      {
        k: "bullets",
        items: [
          "**Giant metallic lattices** — a regular arrangement of positive metal ions (cations) surrounded by a sea of mobile electrons. Fairly high to high melting and boiling temperatures; good thermal and electrical conductivity; malleable and ductile.",
          "**Giant ionic lattices** — a regular arrangement of positive ions (cations) and negative ions (anions). Fairly high melting and boiling temperatures; brittle; poor conductor when solid but conducts when molten or aqueous; often soluble in water.",
          "**Giant covalent lattices** (network covalent lattices) — a giant network of atoms linked by strong covalent bonds. Very high melting temperatures; non-conductors (graphite excepted); insoluble.",
          "**Molecular solids** — collections of molecules held together by **intermolecular forces (IMFs)**. The solid structure is maintained by intermolecular forces, ==not== by bonds. Generally low melting and boiling temperatures, because melting needs only the weak IMFs — far less than the energy to break covalent bonds.",
        ],
      },
      {
        k: "table",
        caption: "The master table — major properties of each structure type",
        head: ["", "Giant metallic", "Giant ionic", "Giant covalent", "Simple molecular"],
        rows: [
          ["Particles present", "positive ions and delocalised electrons", "positive and negative ions", "atoms", "molecules"],
          ["Type of bonding", "metallic", "ionic", "covalent", "covalent"],
          ["Intermolecular forces?", "no", "no", "no", "yes"],
          ["Melting / boiling", "fairly high to high", "fairly high to high", "high to very high", "generally low"],
          ["Electrical conductivity", "good when solid and molten", "non-conductor when solid; conducts when molten and aqueous", "non-conductor", "non-conductor"],
          ["Solubility in water", "insoluble unless the metal reacts with water (e.g. Na, Li)", "generally soluble — exceptions AgCl, AgBr, AgI and BaSO~4~", "insoluble", "generally insoluble, but may dissolve if hydrogen bonding is possible (e.g. sucrose) or if the substance reacts with water (e.g. Cl~2~)"],
        ],
      },
      {
        k: "table",
        caption: "Bonding → structure → examples",
        head: ["Bonding", "Structure", "Examples"],
        rows: [
          ["Metallic", "giant lattice", "Mg, Al, Cu, Zn, Na"],
          ["Ionic", "giant lattice", "NaCl, MgO, CsF"],
          ["Covalent (including polar covalent)", "giant lattice (macromolecular)", "C (diamond), C (graphite), Si, SiO~2~ (sand), BN"],
          ["Covalent", "molecular", "H~2~O, I~2~, P~4~, S~8~, C~60~, C~12~H~22~O~11~ (sucrose)"],
          ["Covalent", "polymers", "polythene, proteins, DNA"],
        ],
      },
      {
        k: "wow",
        text: "Why doesn't water decompose when it boils? Because ==melting and boiling break only the intermolecular forces== — the covalent O—H bonds inside each molecule survive intact. Low boiling point never means weak bonds.",
      },
      { k: "checkpoint", page: 93 },
    ],
  },
];
