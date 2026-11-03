import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 5 revision note · sections 5.1 – 5.4 (Part 5A)
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 5
   class note (2020, semester 1) — Alkenes; page furniture and
   image-only drills omitted. The exercises that are specified in
   words are worked in full.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T05_A: SpecSection[] = [
  {
    spec: "5.1",
    statement:
      "know the general formula of alkenes and understand that alkenes and cycloalkenes are hydrocarbons which are unsaturated (have a carbon-carbon double bond which consists of a σ bond and a π bond)",
    title: "The C=C double bond",
    blocks: [
      {
        k: "def",
        term: "Unsaturated hydrocarbons",
        text: "Alkenes and cycloalkenes are hydrocarbons which are ==unsaturated== — they ==contain at least one C=C bond==, and that carbon–carbon double bond consists of ==one sigma (σ) bond and one pi (π) bond==.",
      },
      {
        k: "bullets",
        items: [
          "**General formula** — C~n~H~2n~ (==non-cyclic== alkenes only).",
          "The bonds are arranged at ==120°== around the carbon atoms of the C=C bond.",
        ],
      },
      { k: "h", text: "Hybridization in the two carbons of C=C" },
      {
        k: "bullets",
        items: [
          "The three orbitals (an s and two p's) combine or **HYBRIDIZE** to give three new orbitals.",
          "Therefore, the two carbons in C=C have ==three sp^2^ hybrid orbitals== and ==one normal p orbital==.",
        ],
      },
      {
        k: "figure",
        kind: "sp2",
        caption: "One s and two p orbitals hybridise into three sp^2^ hybrids set 120° apart in a trigonal plane — leaving one unhybridized p orbital sticking up and down. That leftover p is the one that makes the π bond.",
      },
      {
        k: "wow",
        text: "One C=C is really ==two bonds doing two jobs==: head-on sp^2^ overlap gives the strong σ bond along the axis, and the sideways overlap of the leftover p orbitals adds the weak π bond — the exposed, electron-rich part that electrophiles attack.",
      },
      { k: "h", text: "Nomenclature" },
      {
        k: "p",
        text: "In the IUPAC system, identify the longest chain of carbon atoms **containing the functional group, the C=C** — and remember that the ==principal chain is not always the longest chain==.",
      },
      {
        k: "bullets",
        items: [
          "Use the suffix **-ene**.",
          "The position of the C=C is indicated by the ==lower-numbered carbon atom== on one end of the double bond — count from one end to give the ==lowest number==.",
          "The position of a side chain is based on the number allocated to the C=C bond.",
        ],
      },
      {
        k: "table",
        caption: "The first members",
        head: ["Structural formula", "Name"],
        rows: [
          ["CH~2~=CH~2~", "ethene"],
          ["CH~2~=CHCH~3~", "propene"],
          ["CH~2~=CHCH~2~CH~3~", "but-1-ene"],
          ["CH~3~CH=CHCH~3~", "but-2-ene"],
        ],
      },
      {
        k: "note",
        label: "Multiple bonds",
        text: "Multiple bonds are named by adding an **'a' to the root word** — e.g. ==buta-1,3-diene==, whose chain carries two double bonds.",
      },
      { k: "checkpoint", page: 4 },
    ],
  },
  {
    spec: "5.2",
    statement:
      "be able to explain geometric isomerism in terms of restricted rotation around a C=C double bond and the nature of the substituents on the carbon atoms",
    title: "Isomerism in alkenes",
    blocks: [
      {
        k: "def",
        term: "Stereoisomers",
        text: "Compounds that have the ==same structural formula== but whose bonds are ==arranged differently in 3D==.",
      },
      {
        k: "p",
        text: "Alkenes exhibit **structural isomerism** and **stereoisomerism** (==geometric isomerism==).",
      },
      { k: "h", text: "Structural isomerism" },
      {
        k: "bullets",
        items: [
          "**Chain isomerism** — branching of the carbon chain: for C~5~H~10~, pent-1-ene and ==3-methylbut-1-ene==.",
          "**Positional isomerism** — moving the carbon–carbon double bond to a different position in the chain: pent-1-ene and ==pent-2-ene==.",
        ],
      },
      {
        k: "table",
        caption: "The isomerism family tree",
        head: ["Isomerism", "Its types"],
        rows: [
          ["Structural", "functional group isomerism · chain isomerism · position isomerism"],
          ["Stereoisomerism", "geometric isomerism · optical isomerism"],
        ],
      },
      { k: "h", text: "Geometric isomerism" },
      {
        k: "bullets",
        items: [
          "It occurs due to ==restricted rotation around the carbon–carbon double bond== — the C=C ==would be broken== if it were rotated.",
          "To exhibit geometric isomerism, the carbons in the double bond should have ==different atoms or groups of atoms attached to each carbon==.",
        ],
      },
      {
        k: "def",
        term: "The cis–trans system",
        text: "It can be used when there are ==two H's and two non-hydrogen groups== attached to the two carbons — or when ==two similar groups== are attached to the two carbons in C=C. **CIS**: similar groups on the ==same side== of the double bond. **TRANS**: similar groups ==across== the double bond.",
      },
      {
        k: "worked",
        title: "Worked example · the two stereoisomers of but-2-ene",
        question:
          "But-2-ene, CH~3~CH=CHCH~3~, exists as two geometric isomers. Explain why, and name each one.",
        steps: [
          "The C=C ==cannot rotate== — rotating it would break the double bond — so the two ends are locked in place.",
          "In the first isomer the two hydrogens sit on the ==same side== and the two methyl groups sit on the ==same side== of the double bond → the name is **cis-but-2-ene**.",
          "In the second isomer the two hydrogens are on ==opposite sides== and the two methyl groups are on ==opposite sides== of the double bond → the name is **trans-but-2-ene**.",
        ],
        answer:
          "**cis-but-2-ene** and **trans-but-2-ene** — similar groups same side = cis, similar groups across = trans. Each carbon of the C=C carries one H and one CH~3~, which is exactly the two-identical-groups condition the cis–trans system needs.",
      },
      {
        k: "figure",
        kind: "geometric",
        caption: "cis-but-2-ene and trans-but-2-ene — same bonds, locked into two different 3D shapes by the restricted rotation of the π bond.",
      },
      { k: "checkpoint", page: 6 },
    ],
  },
  {
    spec: "5.3",
    statement:
      "understand the E–Z naming system for geometric isomers and why it is necessary to use this when the cis- and trans- naming system breaks down",
    title: "The E–Z naming system",
    blocks: [
      { k: "h", text: "Why cis–trans doesn't work always" },
      {
        k: "p",
        text: "For the cis–trans system to work, ==two identical groups or atoms attached to the two carbons== in C=C are needed. It doesn't work for compounds like the ones in the exercise where there are ==four different atoms attached== to the C=C — the E–Z system takes over.",
      },
      { k: "h", text: "The priority rules" },
      {
        k: "bullets",
        items: [
          "In the E–Z system, the groups attached around the carbons in C=C are ==ranked based on the atomic number==.",
          "The atom with the ==highest atomic number has highest priority== — carbon (atomic number 6) has priority over hydrogen (atomic number 1).",
          "If the two higher-priority groups are on the ==same side== of the C=C, they are **zusammen** (together) and this is the **Z-isomer**.",
          "If the two higher-priority groups are on ==opposite sides== of the C=C, they are **entgegen** (opposite) and this is the **E-isomer**.",
        ],
      },
      {
        k: "steps",
        caption: "Naming an E–Z isomer, three steps",
        items: [
          { title: "Step 1", icon: "spark", text: "Work out the ==common name== for both isomers using **IUPAC nomenclature**." },
          { title: "Step 2", icon: "spark", text: "Use the priority rules to decide which of the two atoms attached to the carbon on ==each side== of the C=C bond has the higher priority." },
          { title: "Step 3", icon: "spark", text: "Decide where the higher-priority groups sit: both above or both below the C=C → name it as the **Z-isomer**; one above and one below → name it as the **E-isomer**." },
        ],
      },
      {
        k: "note",
        label: "When the priorities tie",
        text: "If the atoms attached to the carbons in C=C are the same, then ==look at the atoms attached to those atoms== — the tie is broken one shell further out.",
      },
      {
        k: "figure",
        kind: "ez",
        caption: "The tie-break worked through: Cl wins the right-hand carbon outright (17 vs 1); on the left-hand carbon the first shell is a tie (C vs C), so the next shell decides — the ethyl group's extra carbon beats the methyl's third hydrogen. Higher-priority groups opposite sides → E.",
      },
      {
        k: "worked",
        title: "Worked example · the tie-break rule in action",
        question:
          "A haloalkene has CH~3~ and C~2~H~5~ attached to the left-hand carbon of the C=C, and H and Cl attached to the right-hand carbon. The Cl and the C~2~H~5~ sit on opposite sides of the double bond. Name the compound.",
        steps: [
          "Apply the priority rules to the ==right-hand C== of C=C: Cl (atomic number 17) has the higher priority over H.",
          "Now look at the ==left-hand C== of C=C: it has **2 carbon atoms** attached to it — a tie at the first shell.",
          "Then check the atoms attached to *them*: in the CH~3~ group — H(1), H(1), H(1); in the C~2~H~5~ group — **C(6)**, H(1), H(1).",
          "The bottom group (C~2~H~5~) has another C attached to it, which has a higher priority than the H in the upper group.",
          "The higher-priority groups are ==above== on one carbon and ==below== on the other → it is the **E-isomer**.",
        ],
        answer:
          "**E-1-chloro-2-methylbut-1-ene** — Cl wins the right-hand carbon outright, the ethyl wins the left-hand carbon on the tie-break, and opposite sides means entgegen.",
      },
      { k: "checkpoint", page: 8 },
    ],
  },
  {
    spec: "5.4",
    statement:
      "be able to describe the reactions of alkenes, limited to: i the addition of hydrogen, using a nickel catalyst, to form an alkane ii the addition of halogens to produce a di-substituted halogenoalkane iii the addition of hydrogen halides to produce mono-substituted halogenoalkanes iv the addition of steam, in the presence of an acid catalyst, to produce alcohols v oxidation of the double bond by acidified potassium manganate(VII) to produce a diol",
    title: "Reactions of alkenes",
    blocks: [
      {
        k: "p",
        text: "Alkenes are ==much more reactive than alkanes== because:",
      },
      {
        k: "bullets",
        items: [
          "the ==π bond== in alkenes is a ==region of high electron density==, which can be readily attacked by **electrophiles**;",
          "the π bond is ==weaker than the sigma bonds== — therefore ==less energy is required to break the π bond==.",
        ],
      },
      {
        k: "p",
        text: "As a result, the most typical reaction of alkenes is **addition**, in which the π bond breaks to release electrons to form bonds with the reactant molecule. In the presence of electrophiles, alkenes undergo ==heterolytic electrophilic addition== reactions.",
      },
      {
        k: "table",
        caption: "The five reactions at a glance",
        head: ["Reaction", "Reagent", "Condition", "Product"],
        rows: [
          ["**1 · Hydrogenation**", "hydrogen gas", "==nickel catalyst== and heat (140–180 °C) — reduction of the alkene", "alkane"],
          ["**2 · Halogenation**", "halogen (bromine dissolved in hexane)", "room temperature", "==di-substituted== halogenoalkane"],
          ["**3 · Hydration**", "steam", "==phosphoric acid catalyst== and heat (300 °C)", "alcohol"],
          ["**4 · Addition of hydrogen halide**", "hydrogen halide", "room temperature", "==mono-substituted== halogenoalkane"],
          ["**5 · Oxidation by KMnO~4~**", "potassium manganate(VII) in dilute sodium hydroxide", "room temperature — oxidation of the alkene", "diol"],
        ],
      },
      { k: "h", text: "1 · Hydrogenation" },
      {
        k: "eq",
        eq: "C~2~H~4~ + H~2~ → C~2~H~6~",
        note: "Hydrogenation with a ==nickel catalyst== and heat (140–180 °C) — the alkene is **reduced** to an alkane.",
      },
      { k: "h", text: "2 · Halogenation" },
      {
        k: "eq",
        eq: "C~2~H~4~ + Cl~2~ → CH~2~ClCH~2~Cl",
        note: "With chlorine at room temperature — a ==di-substituted halogenoalkane==, one halogen on each carbon.",
      },
      {
        k: "bullets",
        items: [
          "**With bromine** — reagent: bromine dissolved in ==hexane==; condition: room temperature.",
          "**Observation**: the ==brown bromine solution turns colourless==.",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~4~ + Br~2~ → CH~2~BrCH~2~Br",
      },
      { k: "h", text: "3 · Hydration" },
      {
        k: "eq",
        eq: "C~2~H~4~ + H~2~O → CH~3~CH~2~OH",
        note: "Steam adds in the presence of a ==phosphoric acid catalyst== and heat (300 °C) — the product is an ==alcohol==.",
      },
      { k: "h", text: "4 · Addition of hydrogen halide" },
      {
        k: "eq",
        eq: "C~2~H~4~ + HBr → CH~3~CH~2~Br",
        note: "Room temperature — a ==mono-substituted halogenoalkane==, since only one atom is added to the chain.",
      },
      { k: "h", text: "5 · Oxidation by potassium manganate(VII), KMnO~4~" },
      {
        k: "bullets",
        items: [
          "Reagent: potassium manganate(VII) in ==dilute sodium hydroxide==; condition: room temperature — an ==oxidation== of the alkene.",
          "**Observation**: the ==purple solution (MnO~4~^−^) turns green (MnO~4~^2−^)==.",
          "Product: a ==diol== — two —OH groups, one on each carbon.",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~4~ + H~2~O + [O] → CH~2~(OH)CH~2~(OH)",
        note: "The purple solution turns ==colourless== instead if the potassium manganate(VII) is dissolved in ==acid==.",
      },
      {
        k: "wow",
        text: "Five reagents, one move: ==H~2~, Cl~2~, HBr, H~2~O and [O] all add across the same π bond==. Learn the ==condition== with each one — the nickel catalyst, the phosphoric acid catalyst and the two colour changes are the parts examiners ask for by name.",
      },
    ],
  },
];
