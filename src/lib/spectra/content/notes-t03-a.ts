import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 3 revision note · sections 3.10 – 3.12
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 3
   class note (2020, semester 1) — Part II: covalent bonding;
   page furniture omitted. Exercises from the note are presented
   as fully worked examples. The ionic part (Part I) joins later.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T03_A: SpecSection[] = [
  {
    spec: "3.10",
    statement:
      "understand that covalent bonding is the strong electrostatic attraction between two nuclei and the shared pair of electrons between them, based on the evidence: i the physical properties of giant atomic structures ii electron density maps of simple molecules",
    title: "The covalent bond",
    blocks: [
      {
        k: "def",
        term: "The covalent bond",
        text: "The ==strong electrostatic attraction== between the **two nuclei** of the bonded atoms and the **shared pair of electrons**.",
      },
      {
        k: "bullets",
        items: [
          "When a covalent bond is formed, two atomic orbitals overlap and a **molecular orbital** is formed.",
          "Like atomic orbitals, a molecular orbital can only contain **two electrons**.",
          "Overlap is only possible if both orbitals contain one electron (**normal covalent bond**), or if one is full and the other is empty (**dative covalent bond**).",
          "Atoms can share more than one pair of electrons and form double or triple covalent bonds.",
        ],
      },
      {
        k: "table",
        caption: "One, two or three shared pairs",
        head: ["Bond", "Shared pairs", "Example"],
        rows: [
          ["Single", "one shared pair of electrons", "chlorine, Cl~2~ · Cl—Cl"],
          ["Double", "two shared pairs of electrons", "oxygen, O~2~ · O=O"],
          ["Triple", "three shared pairs of electrons", "nitrogen, N~2~ · N≡N"],
        ],
      },
      { k: "h", text: "Sigma (σ) bonds — the single bond" },
      {
        k: "bullets",
        items: [
          "For a single covalent bond, an orbital with one electron **linearly overlaps** an orbital with one electron of the other atom.",
          "There can only be ==one sigma bond between two atoms==.",
        ],
      },
      {
        k: "steps",
        caption: "The three head-on overlaps",
        items: [
          { title: "s + s", icon: "spark", text: "Linear overlap of two **s orbitals** — the hydrogen molecule, H~2~." },
          { title: "s + p", icon: "spark", text: "Linear overlap of an **s orbital** and a **p orbital** — hydrogen bromide, HBr (and HF)." },
          { title: "p + p", icon: "spark", text: "Linear overlap of two **p orbitals** — the fluorine molecule, F~2~." },
        ],
      },
      { k: "figure", kind: "sigma-pi", caption: "σ bonds are head-on overlaps (s+s, s+p, p+p); a π bond is the sideways overlap of two p orbitals — the bonding region sits above and below the bond axis." },
      { k: "h", text: "Pi (π) bonds — the second and third bonds of a multiple bond" },
      {
        k: "bullets",
        items: [
          "When a double bond is formed between two atoms, one bond is a **sigma bond** and the other is a **pi bond**.",
          "A π bond is formed when two p orbitals overlap **laterally** (sideways).",
          "Each p orbital has two lobes, one above and one below the plane — so the bonding region is **above and below the two nuclei**, not directly between them.",
          "The sideways overlap is less effective, so a π bond is ==weaker than a σ bond==.",
          "A triple bond is one σ bond together with **two** π bonds — e.g. ethyne, H—C≡C—H.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · counting σ and π",
        question: "How many sigma and pi bonds are there in ethene, C~2~H~4~, and in ethyne, H—C≡C—H?",
        steps: [
          "Ethene: four C—H single bonds (4 σ) + the C=C, which is one σ and one π.",
          "Total for ethene: **5 σ and 1 π**.",
          "Ethyne: two C—H single bonds (2 σ) + the C≡C, which is one σ and two π.",
          "Total for ethyne: **3 σ and 2 π**.",
        ],
        answer: "Ethene: **5 σ + 1 π** · ethyne: **3 σ + 2 π** — every multiple bond is exactly one σ, the rest are π.",
      },
      { k: "h", text: "Bond length and bond strength" },
      {
        k: "def",
        term: "Bond length",
        text: "The distance between the nuclei of two atoms that are covalently bonded together.",
      },
      {
        k: "def",
        term: "Bond strength",
        text: "Measured by the amount of energy required to break ==one mole== of the bond in the **gaseous state**.",
      },
      {
        k: "p",
        text: "**Shorter bonds have greater bond strength**, due to the increased electrostatic attraction between the two nuclei and the electrons in the overlapping atomic orbitals. More shared pairs pull the nuclei closer together — so a triple bond is shorter *and* stronger than the double bond between the same two atoms, which in turn beats the single bond.",
      },
      {
        k: "wow",
        text: "One number to hold on to: there can only ever be ==one σ bond between two atoms==. Every extra shared pair is a π — that is why “double bond = σ + π” and “triple bond = σ + 2π” never has an exception.",
      },
      { k: "checkpoint", page: 74 },
    ],
  },
  {
    spec: "3.11",
    statement:
      "be able to draw dot and cross diagrams to show electrons in covalent substances including: i molecules with single, double and triple bonds ii species with dative covalent (co-ordinate) bonds, including Al~2~Cl~6~ and the ammonium ion",
    title: "Dot-and-cross diagrams",
    blocks: [
      {
        k: "def",
        term: "Discrete molecule",
        text: "An ==electrically neutral== group of two or more atoms held together by covalent bonds.",
      },
      {
        k: "bullets",
        items: [
          "Use **dots** for the electrons from one of the atoms and a **cross** for the electrons from the other atom.",
          "If there are more than two types of atom, use additional symbols such as a small circle or a small triangle.",
          "Draw the outer electrons **in pairs** to emphasise the number of bond pairs and the number of lone pairs (non-bonded).",
        ],
      },
      {
        k: "def",
        term: "Lone pair",
        text: "An electron pair that is part of an atom's valence electron shell but ==not involved in bonding==.",
      },
      {
        k: "def",
        term: "Displayed formula (full structural formula)",
        text: "Shows each bonding pair with a ==line== between the two atoms.",
      },
      { k: "figure", kind: "dotcross", caption: "Dot-and-cross essentials: one shared pair (HCl), two shared pairs per bond (CO~2~), and the dative bond of NH~4~^+^ — both electrons donated by nitrogen." },
      {
        k: "worked",
        title: "Worked example · HCl and CO~2~",
        question: "Draw the dot-and-cross diagrams for HCl and CO~2~.",
        steps: [
          "HCl: hydrogen brings **one** electron (cross); chlorine brings **seven** (dots). One cross + one dot form the shared pair between them; three lone pairs sit on the chlorine.",
          "CO~2~: carbon brings **four** electrons (crosses), each oxygen brings **six** (dots).",
          "Carbon forms **two double bonds** — two shared pairs with each oxygen, i.e. two crosses and two dots in each bonding region.",
          "Each oxygen keeps two lone pairs; carbon has none. Every atom reaches a noble-gas arrangement.",
        ],
        answer: "HCl: one shared pair, three lone pairs on Cl. CO~2~: O=C=O with two shared pairs per C=O bond.",
      },
      { k: "h", text: "The octet rule — and when it breaks" },
      {
        k: "p",
        text: "In most cases, covalently bonded molecules end up with the same number of electrons as the outer shell of a noble gas — mostly that is **8 electrons**, the ==octet rule==. But this is not always true: beryllium chloride, boron trichloride, phosphorus(V) chloride and sulfur hexafluoride all break it.",
      },
      {
        k: "table",
        caption: "Electrons around the central atom",
        head: ["Compound", "Electrons around the central atom"],
        rows: [
          ["Beryllium chloride, BeCl~2~", "4"],
          ["Boron trichloride, BCl~3~", "6"],
          ["Phosphorus(V) chloride, PCl~5~", "10"],
          ["Sulfur hexafluoride, SF~6~", "12"],
        ],
      },
      {
        k: "wow",
        text: "Four, six, ten, twelve — ==incomplete octets before boron, expanded octets from phosphorus==. If a dot-and-cross “doesn't fit” eight, count the central atom's electrons before assuming you drew it wrong.",
      },
      { k: "h", text: "Dative covalent (coordinate) bonds" },
      {
        k: "def",
        term: "Dative covalent bond",
        text: "A covalent bond in which ==both of the shared electrons come from just one of the atoms==. It forms when an orbital containing two electrons overlaps an **empty** orbital of the other atom.",
      },
      {
        k: "p",
        text: "The basic requirement is an atom with a **lone pair** of electrons, and the other atom having an orbital with **no electrons**. Once formed, the dative bond is identical to any ordinary covalent bond — only the drawing remembers where the electrons came from.",
      },
      {
        k: "worked",
        title: "Worked example · the ammonium ion, NH~4~^+^",
        question: "Show the formation of the dative covalent bond in the ammonium ion.",
        steps: [
          "NH~3~ has a **lone pair** on the nitrogen; the H^+^ ion has an **empty 1s orbital**.",
          "The lone pair donates into the empty orbital: N→H, with ==both electrons supplied by nitrogen==.",
          "The ion now carries four N—H bonds, all identical, and one positive charge.",
        ],
        answer: "NH~3~ + H^+^ → NH~4~^+^ — a coordinate bond drawn with both electrons as dots (from N).",
      },
      {
        k: "bullets",
        items: [
          "**The hydroxonium ion, H~3~O^+^** — water's two lone pairs: one donates into H^+^'s empty orbital, giving O→H.",
          "**Aluminium chloride dimer, Al~2~Cl~6~** — two AlCl~3~ molecules pair up: a chlorine lone pair from each AlCl~3~ donates into the empty orbital of the *other* aluminium, closing a four-membered ring of alternating Al and Cl atoms with ==two dative bonds==.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · carbon monoxide and friends",
        question: "Draw dot-and-cross diagrams for CO (two covalent bonds and one dative bond), AlCl~4~^−^ and NH~3~·BF~3~, identifying the dative bond in each.",
        steps: [
          "CO: carbon and oxygen share **two ordinary pairs**; oxygen donates its remaining lone pair into carbon's empty orbital — the third, dative bond.",
          "AlCl~4~^−^: the chloride ion donates a **lone pair** into the empty orbital of AlCl~3~ (which has only 6 electrons around aluminium) — the fourth bond is dative.",
          "NH~3~·BF~3~: nitrogen's lone pair donates into boron's empty orbital — N→B, the classic adduct.",
        ],
        answer: "Dative bonds: O→C in CO · Cl→Al in AlCl~4~^−^ · N→B in NH~3~·BF~3~ — every one needs a lone pair meeting an empty orbital.",
      },
      { k: "checkpoint", page: 79 },
    ],
  },
  {
    spec: "3.12",
    statement:
      "be able to describe the different structures formed by giant lattices of carbon atoms, including graphite, diamond and graphene, and discuss the applications of each",
    title: "Giant covalent lattices of carbon",
    blocks: [
      { k: "h", text: "The evidence for covalent bonds" },
      {
        k: "bullets",
        items: [
          "The **physical properties of giant atomic structures** (giant molecular structures) such as diamond and graphite provide evidence for the strong electrostatic attraction in covalent bonding: they are very **hard** and have very **high melting temperatures**, because a large number of strong covalent bonds must all be broken to separate the atoms.",
          "They do **not** conduct electricity — no mobile ions or electrons — ==but graphite conducts==: each carbon uses only three of its outer electrons for bonding, and the remaining electron can move through the layers.",
          "They are **insoluble** in water and other solvents.",
          "**Electron density maps** show high electron density ==between== atoms that are covalently bonded — direct experimental evidence for the shared pair.",
        ],
      },
      { k: "figure", kind: "carbon-lattices", caption: "The three carbon lattices: diamond's 3-D tetrahedral network, graphite's sliding honeycomb layers, and graphene — a single one-atom-thick sheet." },
      { k: "h", text: "Diamond" },
      {
        k: "bullets",
        items: [
          "Composed of **interlocking tetrahedral** carbon atoms.",
          "Each carbon atom forms **four sigma bonds** to four other carbon atoms in a giant three-dimensional tetrahedral arrangement.",
          "**Extremely hard** because of the very strong C—C bonding throughout the structure.",
          "**Very high melting temperature** — a great number of strong C—C bonds must be broken to melt it, requiring a large amount of energy.",
          "Uses are based on its exceptional hardness: **drilling, cutting and grinding**, and as **bearings**.",
          "Can be made artificially by subjecting graphite to **high temperatures and pressures**.",
        ],
      },
      { k: "h", text: "Graphite" },
      {
        k: "bullets",
        items: [
          "Composed of **planes of trigonal carbon atoms** joined in a honeycomb pattern.",
          "Each carbon atom is bonded to **three** other carbon atoms at **120°**.",
          "Weak **London forces** (van der Waals forces) exist between the layers.",
          "Used as a **lubricant** — it is slippery because the layers slide over each other.",
          "Used as the **‘lead’ in pencils**, as an **electrical conductor** and **electrode material** in dry cells, and in **nuclear reactors**.",
          "**Conducts electricity** — there is one free (delocalised) electron per atom.",
        ],
      },
      { k: "h", text: "Graphene" },
      {
        k: "bullets",
        items: [
          "Pure carbon in the form of a very thin sheet, ==one atom thick==.",
          "The carbon atoms are arranged in a **honeycomb-like pattern**, bonded exactly as in graphite — graphene can be described as a **one-atom-thick layer of graphite**.",
          "**Transparent, flexible, highly conductive.**",
          "A sheet can be rolled into a **ball** to produce **fullerene** molecules, or rolled into a **cylinder** to produce **carbon nanotubes**.",
          "**Very strong**: adding even a trace amount of graphene to plastics, metals or other materials can make them much stronger.",
          "**Highly conductive**, so it could be useful in microelectronics (for example, more efficient and longer-lasting LED lighting) and in larger applications — for example **thermal foils for mobile devices**.",
        ],
      },
      {
        k: "wow",
        text: "Same element, same bonds, three different lattices — and the properties could not be more different: ==the hardest natural material==, a lubricant that conducts, and a one-atom sheet stronger than steel. Structure decides everything.",
      },
      { k: "checkpoint", page: 91 },
    ],
  },
];
