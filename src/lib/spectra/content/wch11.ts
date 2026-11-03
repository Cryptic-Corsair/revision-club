import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WCH11 · Structure, Bonding and Introduction to Organic Chemistry
   Topics 1–5 of the Pearson IAL 2018 specification.
   ═══════════════════════════════════════════════════════════════ */

export const WCH11_TOPICS: Topic[] = [
  {
    id: "t01",
    no: "01",
    label: "Topic 1",
    title: "Formulae, equations and amount of substance",
    summary:
      "The arithmetic of chemistry. Every calculation in the whole A level — energetics, kinetics, titrations, synthesis — runs through the mole.",
    minutes: 24,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Chemistry is a counting game played with particles far too small to see. A single grain of salt holds more ions than there are people who have ever lived, so chemists count by ==mass== and by ==volume== instead — and the bridge between the counted world and the measured world is the mole. Fluency here pays for the entire A level.",
      },
      {
        k: "def",
        term: "The mole",
        text: "One mole is the amount of substance that contains as many elementary particles — atoms, molecules, ions or electrons — as there are atoms in exactly 12 g of carbon-12. That number is the Avogadro constant, N~A~ = 6.02 × 10^23^ mol^−1^.",
      },
      {
        k: "def",
        term: "Molar mass, M",
        text: "The mass of one mole of a substance, in g mol^−1^. Numerically equal to the relative atomic or molecular mass: water is 18.0 on the relative scale and 18.0 g per mole on the balance.",
      },
      {
        k: "p",
        text: "Three bridges connect n to something you can measure, and the units in the question tell you which one to take: grams means **n = m/M**, cm^3^ or dm^3^ of solution means **n = cV**, and a gas at known pressure and temperature means **pV = nRT**.",
      },
      {
        k: "eq",
        title: "The three bridges",
        eq: "n = m / M        n = cV / 1000        pV = nRT",
        note: "R = 8.31 J K^−1^ mol^−1^ — and R only works with p in Pa, V in m^3^ and T in K. Divide cm^3^ by 10^6^ for m^3^.",
        ok: ["units convert", "R in J K−1 mol−1"],
      },
      {
        k: "p",
        text: "For gases at room temperature and pressure the data booklet shortcut applies: ==molar volume ≈ 24 dm^3^ mol^−1^==, so n = V/24 when V is in dm^3^. Use it when the question says *rtp*; use pV = nRT when the question gives you pressure or a strange temperature.",
      },
      {
        k: "ex",
        title: "Titration, WCH11 style",
        steps: [
          "25.00 cm^3^ portions of sodium hydroxide are titrated with 0.100 mol dm^−3^ hydrochloric acid. Mean concordant titre: 22.30 cm^3^. Find c(NaOH).",
          "n(HCl) = c × V/1000 = 0.100 × 22.30/1000 = 2.23 × 10^−3^ mol",
          "HCl + NaOH → NaCl + H~2~O is 1 : 1, so n(NaOH) = 2.23 × 10^−3^ mol in each 25.00 cm^3^ portion",
          "c(NaOH) = n ÷ V = 2.23 × 10^−3^ ÷ 0.02500",
        ],
        answer: "c(NaOH) = 0.0892 mol dm^−3^ (3 s.f.)",
      },
      {
        k: "p",
        text: "Two efficiency measures close the topic. ==Percentage yield== compares what you got with what you should have got; ==atom economy== compares the mass of atoms in the product with the mass of every atom that went in. A reaction can have a 100 % yield and a terrible atom economy — atom economy matters for ==sustainability==: fewer wasted raw materials, less to dispose of.",
      },
      {
        k: "eq",
        title: "Yield and atom economy",
        eq: "% yield = actual ÷ theoretical × 100        atom economy = M(desired) ÷ ΣM(all products) × 100",
        note: "Atom economy uses the balanced equation only — it never depends on how well the experiment went.",
        ok: ["both from equation", "yield needs data"],
      },
      {
        k: "tips",
        items: [
          "Quote answers to 3 significant figures **and** attach the unit — a bare “0.0892” drops the final mark.",
          "Write the ÷1000 for cm^3^ before touching the calculator. Forgetting it inflates the answer a thousand-fold, every single exam series.",
          "“State” needs no working; “calculate” can earn method marks for every step shown.",
          "Name the particle when you use the mole: *atoms* of iron, *molecules* of water, *ions* of sodium — the wording carries marks.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "What mass of calcium carbonate, CaCO~3~ (M = 100.1), contains 0.250 mol?",
            a: "m = nM = 0.250 × 100.1 = 25.0 g (3 s.f.).",
          },
          {
            q: "5.85 g of NaCl (M = 58.5) is dissolved and made up to 250 cm^3^. What is the concentration?",
            a: "n = 5.85/58.5 = 0.100 mol; c = 0.100/0.250 = 0.400 mol dm^−3^.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "The mole: as many particles as atoms in 12 g of carbon-12; N~A~ = 6.02 × 10^23^ mol^−1^.",
          "Three bridges: n = m/M, n = cV, pV = nRT (24 dm^3^ mol^−1^ at rtp).",
          "÷1000 whenever volume arrives in cm^3^.",
          "Yield measures the experiment; atom economy measures the equation.",
          "3 s.f. and units, always.",
        ],
      },
    ],
  },
  {
    id: "t02",
    no: "02",
    label: "Topic 2",
    title: "Atomic structure and the periodic table",
    summary:
      "Isotopes, mass spectra, electron configurations and ionisation energy — the evidence for how electrons are actually arranged.",
    minutes: 26,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "First ionisation energy is the periodic table's X-ray. Because it depends only on the attraction between the nucleus and the outermost electron, its trends are pure evidence for ==quantum shells and sub-shells==. Examiners ask *why* far more often than *what*, so this page is built around the explanations.",
      },
      {
        k: "def",
        term: "Isotopes",
        text: "Atoms of the same element with the same number of protons but different numbers of neutrons — same atomic number, different mass number. They react identically (same electrons) but have different masses.",
      },
      {
        k: "def",
        term: "First ionisation energy",
        text: "The energy required to remove one mole of electrons from one mole of gaseous atoms, forming one mole of gaseous 1+ ions:  M(g) → M^+^(g) + e^−^.",
      },
      {
        k: "p",
        text: "The ==mass spectrometer== turns isotopes into data: it sorts ions by mass-to-charge ratio, and the relative heights of the peaks give isotopic abundances. Multiply each mass by its abundance, sum, and divide by 100 — that is the relative atomic mass. Diatomic chlorine is the classic: ^35^Cl and ^37^Cl in a 3 : 1 ratio gives A~r~ = (35 × 3 + 37 × 1)/4 = 35.5, and its mass spectrum shows molecular-ion peaks at m/z 70, 72 and 74 in the ratio 9 : 6 : 1.",
      },
      {
        k: "ex",
        title: "A~r~ from a mass spectrum",
        steps: [
          "Magnesium: peaks at m/z 24 (79 %), 25 (10 %), 26 (11 %).",
          "A~r~ = (24 × 79 + 25 × 10 + 26 × 11) ÷ 100",
          "= (1896 + 250 + 286) ÷ 100 = 2432 ÷ 100",
        ],
        answer: "A~r~(Mg) = 24.3",
      },
      {
        k: "p",
        text: "Electrons fill shells, then sub-shells, then orbitals: two electrons per orbital, lowest energy first — 1s, 2s, 2p, 3s, 3p, then ==4s before 3d==. Configurations run to Z = 36 on this course, with two exceptions: chromium (…3d^5^4s^1^) and copper (…3d^10^4s^1^), where a half-filled or filled d sub-shell is more stable. When ions form, the 4s electrons leave *first* — they went in first, they come out first.",
      },
      {
        k: "p",
        text: "Ionisation energy depends on three factors: ==nuclear charge== (more protons, greater attraction), ==distance== (outer shells further out are held more weakly) and ==shielding== (inner shells screen the outer electron). Across Period 3 the outer electron stays in n = 3 while nuclear charge increases, so the trend is upward — with two dips.",
      },
      {
        k: "table",
        caption: "The two dips across Period 3",
        head: ["Dip", "Configuration change", "Reason"],
        rows: [
          ["Mg → Al", "3s^2^ → 3s^2^3p^1^", "3p is higher in energy than 3s — a new sub-shell opens"],
          ["P → S", "3p^3^ → 3p^4^", "the fourth 3p electron must pair up; pair repulsion makes it easier to remove"],
        ],
      },
      {
        k: "p",
        text: "Down a group, ionisation energy falls: each element adds a whole new shell, so distance and shielding increase together and outweigh the increasing nuclear charge. And ==successive== ionisation energies increase within an atom, rising sharply when an electron is removed from a new inner shell — sodium's jump between the first and second electron is evidence for quantum shells.",
      },
      {
        k: "tips",
        items: [
          "The definition of first ionisation energy must include **gaseous** atoms and **gaseous** ions — both states, or the mark is gone.",
          "“Explain why” means full sentences naming the factor. “The paired 3p electron in sulfur experiences electron–electron repulsion, so it is removed more easily” scores; the lone word “shielding” does not.",
          "Periodicity: atomic radius falls across a period (same shell, more protons) and rises down a group (more shells).",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Write the full electron configuration of an Fe atom (Z = 26).",
            a: "1s^2^2s^2^2p^6^3s^2^3p^6^3d^6^4s^2^ — 4s fills before 3d, but is written after it.",
          },
          {
            q: "Why is the second ionisation energy of sodium (4 562 kJ mol^−1^) far larger than the first (496 kJ mol^−1^)?",
            a: "Na^+^ is 1s^2^2s^2^2p^6^: the second electron comes from the full n = 2 shell — much closer to the nucleus and far less shielded. The sharp jump is evidence for shell structure.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Isotopes: same protons, different neutrons — same chemistry, different mass.",
          "Mass spectra → isotopic abundances → A~r~ (Cl: 3 : 1 gives 35.5).",
          "4s fills before 3d; ions lose 4s first. Cr and Cu are the exceptions.",
          "IE factors: nuclear charge, distance, shielding.",
          "Dips at Groups 3 and 6; sharp jumps in successive IEs mark new shells.",
        ],
      },
    ],
  },
  {
    id: "t03",
    no: "03",
    label: "Topic 3",
    title: "Bonding and structure",
    summary:
      "Ionic, covalent, dative and metallic bonding; molecular shapes by electron-pair repulsion; polarity; and how structure explains properties.",
    minutes: 26,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "Three bond types, four structure types, one idea: ==opposite charges attract==. An ionic bond is the electrostatic attraction between oppositely charged ions; a covalent bond is the attraction of two nuclei for a shared pair of electrons; a metallic bond is a lattice of positive ions in a sea of delocalised electrons.",
      },
      {
        k: "def",
        term: "Dative covalent (coordinate) bond",
        text: "A shared pair of electrons in which both electrons come from the same atom — the ammonium ion, NH~4~^+^, is the standard example, formed when the lone pair on NH~3~ donates into H^+^. Once formed it is indistinguishable from an ordinary covalent bond.",
      },
      {
        k: "def",
        term: "Electronegativity",
        text: "The tendency of an atom to attract the bonding pair of electrons in a covalent bond. It rises across a period (nuclear charge up, same shielding) and falls down a group (distance and shielding up). Fluorine is the most electronegative element.",
      },
      {
        k: "p",
        text: "==Shapes== come from electron-pair repulsion: pairs of electrons — bonding or lone — arrange themselves as far apart as possible, and ==lone pairs repel more strongly than bonding pairs==, reducing bond angles a little below the ideal.",
      },
      {
        k: "table",
        caption: "Shapes and angles — the complete WCH11 set",
        head: ["Shape", "Bonding pairs", "Lone pairs", "Angle", "Example"],
        rows: [
          ["Linear", "2", "0", "180°", "CO~2~"],
          ["Trigonal planar", "3", "0", "120°", "BF~3~"],
          ["Tetrahedral", "4", "0", "109.5°", "CH~4~"],
          ["Trigonal pyramidal", "3", "1", "107°", "NH~3~"],
          ["Non-linear (bent)", "2", "2", "104.5°", "H~2~O"],
          ["Octahedral", "6", "0", "90°", "SF~6~"],
        ],
      },
      {
        k: "p",
        text: "==Polarity== needs care. A polar *bond* just needs an electronegativity difference; a polar *molecule* needs the bond dipoles to be unsymmetrical. CO~2~ has two very polar C=O bonds that cancel — the molecule is non-polar. H~2~O's two lone pairs bend the molecule, so the dipoles do not cancel — it is polar.",
      },
      {
        k: "table",
        caption: "Structure → properties",
        head: ["Structure", "Melting point", "Conduction", "Example"],
        rows: [
          ["Giant ionic lattice", "high — strong attractions to break", "solid: no; molten/aqueous: yes (mobile ions)", "NaCl"],
          ["Giant covalent lattice", "very high — many covalent bonds", "generally none (graphite: delocalised electrons)", "diamond, SiO~2~"],
          ["Simple molecular", "low — only weak forces between molecules", "none", "I~2~, H~2~O"],
          ["Giant metallic lattice", "variable, often high", "yes — delocalised electrons", "Mg, Cu"],
        ],
      },
      {
        k: "ex",
        title: "Explain the shape of ammonia",
        steps: [
          "Nitrogen has five outer electrons: three form bonding pairs with H, one remains a lone pair.",
          "Four electron pairs in total → tetrahedral electron arrangement.",
          "The lone pair repels more strongly than the bonding pairs, compressing the H–N–H angle.",
        ],
        answer: "Trigonal pyramidal, 107° — a tetrahedral arrangement with one lone pair.",
      },
      {
        k: "tips",
        items: [
          "In dot-and-cross diagrams show *which electron came from which atom* — dots, crosses, and the outer shell brackets with the charge for ions.",
          "“Describe the bonding in magnesium” wants: lattice of Mg^2+^ ions, sea of delocalised electrons, electrostatic attraction — all three phrases.",
          "Molten ionic compounds conduct; solid ones do not — melting frees the ions to move.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Why is water non-linear while carbon dioxide is linear?",
            a: "Carbon's two bonding regions have no lone pairs → 180°. Oxygen in H~2~O has two lone pairs; four regions arrange tetrahedrally, giving a bent molecule at 104.5°.",
          },
          {
            q: "Solid sodium chloride does not conduct electricity, but the molten liquid does. Why?",
            a: "The ions are fixed in the lattice when solid. Melting frees them to move — mobile charged particles carry the current.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Bonding = electrostatics: ion–ion, nucleus–shared pair, ion–electron sea.",
          "Dative bond: both electrons from one atom (NH~4~^+^).",
          "Lone pairs repel more: 109.5° → 107° → 104.5° as lone pairs accumulate.",
          "Polar bond ≠ polar molecule — symmetry decides.",
          "Structure explains the properties: which forces break, which particles move.",
        ],
      },
    ],
  },
  {
    id: "t04",
    no: "04",
    label: "Topic 4",
    title: "Introductory organic chemistry and alkanes",
    summary:
      "Nomenclature, isomerism, crude oil, combustion pollutants — and the free-radical substitution mechanism that opens organic chemistry.",
    minutes: 22,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "A ==homologous series== is a family with the same functional group and the same general formula, differing by CH~2~ each step; the ==functional group== is the group responsible for the characteristic reactions of the compound.",
      },
      {
        k: "def",
        term: "Structural isomers",
        text: "Molecules with the same molecular formula but different structural formulae — the same atoms, connected differently. In this unit: ==chain== isomerism (butane vs 2-methylpropane) and ==position== isomerism (1-bromobutane vs 2-bromobutane).",
      },
      {
        k: "p",
        text: "Naming is a four-step algorithm: find the **longest** carbon chain containing the functional group → number it from the end giving the functional group and substituents the **lowest** numbers → list substituents alphabetically → end with the family suffix (-ane, -ene, -ol, -al, -one, -oic acid). Skeletal formulae count carbons at line ends and bends, and hydrogens are implied.",
      },
      {
        k: "p",
        text: "Alkanes are saturated hydrocarbons from ==crude oil==, separated by ==fractional distillation== (boiling point rises with chain length, so fractions condense at different heights), then broken by ==cracking== (long chains → short alkenes + alkanes, thermally or over a zeolite catalyst) and ==reforming== (chains → ring structures with higher octane rating).",
      },
      {
        k: "eq",
        title: "Combustion — complete and incomplete",
        eq: "CH~4~ + 2O~2~ → CO~2~ + 2H~2~O        2CH~4~ + 3O~2~ → 2CO + 4H~2~O",
        note: "Limited oxygen gives CO (toxic); engine temperatures give NO~x~; sulfur impurities give SO~2~; unburnt fuel gives particulates and hydrocarbons.",
        ok: ["balanced", "states optional here"],
      },
      {
        k: "p",
        text: "The first mechanism of the course: ==free-radical substitution== of alkanes by halogens in ultraviolet light. A radical is a species with an unpaired electron; homolytic fission (each atom takes one electron, drawn with ==half-headed arrows==) makes the radicals for the three-step chain.",
      },
      {
        k: "ex",
        title: "CH₄ + Cl₂ in UV light — the chain",
        steps: [
          "Initiation — the bond splits homolytically:  Cl~2~ → 2Cl•  (UV supplies the energy)",
          "Propagation — the radical is regenerated:  Cl• + CH~4~ → HCl + •CH~3~",
          "…and again:  •CH~3~ + Cl~2~ → CH~3~Cl + Cl•  (the Cl• is ==regenerated==)",
          "Termination — two radicals combine:  Cl• + Cl• → Cl~2~  •CH~3~ + Cl• → CH~3~Cl  •CH~3~ + •CH~3~ → C~2~H~6~",
        ],
        answer: "Overall: CH~4~ + Cl~2~ → CH~3~Cl + HCl — with further substitution to CH~2~Cl~2~, CHCl~3~ and CCl~4~ possible.",
      },
      {
        k: "tips",
        items: [
          "Half-headed arrows belong to radicals — ==one arrow per electron==. A full-headed curly arrow (Topic 5) represents the movement of a pair of electrons.",
          "Each propagation step ==regenerates the radical== the next step needs.",
          "Termination produces trace ethane — two •CH~3~ radicals combining.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Name CH~3~–CH(CH~3~)–CH(CH~3~)–CH~3~.",
            a: "2,3-dimethylbutane — four-carbon parent chain, two methyl groups on C-2 and C-3.",
          },
          {
            q: "Why does a mixture of substitution products form in radical substitution?",
            a: "Once CH~3~Cl forms, a Cl• can abstract another H, giving CH~2~Cl• and leading to CH~2~Cl~2~, CHCl~3~ and CCl~4~. The chain continues while radicals and reagent remain.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Homologous series: same functional group, general formula, differ by CH~2~.",
          "Isomers here: chain and position.",
          "Fractional distillation separates; cracking shortens; reforming cyclises.",
          "Pollutants: CO, NO~x~, SO~2~, particulates — each has a cause and a fix.",
          "Radical chain: initiation → propagation → termination, half-headed arrows.",
        ],
      },
    ],
  },
  {
    id: "t05",
    no: "05",
    label: "Topic 5",
    title: "Alkenes",
    summary:
      "The π bond makes alkenes reactive: electrophilic addition, E/Z isomerism and addition polymers.",
    minutes: 22,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "A carbon–carbon double bond is not twice a single bond. It is one strong σ bond plus one weak ==π bond== — the ==π bond== is the ==region of high electron density== that electrophiles attack.",
      },
      {
        k: "def",
        term: "Electrophilic addition",
        text: "An unsymmetrical reagent H–X adds across C=C: the ==electron pair in the π bond== bonds with the δ^+^ end of the polarised reagent, forming a carbocation intermediate, which the negative ion then attacks. Both new bonds form on the two carbons of the original double bond.",
      },
      {
        k: "def",
        term: "E/Z isomerism",
        text: "A type of stereoisomerism: molecules with the same structural formula but a different arrangement in space, possible when ==each== double-bond carbon carries two different groups. Assign priorities by atomic number on each carbon: highest-priority groups on the same side = Z (zusammen); opposite sides = E (entgegen).",
      },
      {
        k: "p",
        text: "But-2-ene shows both faces: CH~3~ and H on each carbon → ==cis== (Z, groups same side) and ==trans== (E, opposite). But-1-ene cannot show E/Z at all — one carbon carries two identical hydrogens. Check the two-different-groups condition before writing anything.",
      },
      {
        k: "ex",
        title: "The mechanism — propene + HBr, Markownikoff's way",
        steps: [
          "HBr is polar: H^δ+^–Br^δ−^. The π electrons attack the δ^+^ hydrogen; the H–Br pair goes to bromine. Draw the arrow from the *centre of the π bond* to the H.",
          "H adds to the carbon already richer in hydrogens (C-1), leaving the positive charge on C-2 — a **secondary** carbocation, stabilised by two alkyl groups donating electron density towards the gap.",
          "Br^−^ attacks the planar carbocation from either side.",
        ],
        answer: "Major product: 2-bromopropane (via the more stable secondary carbocation) — Markownikoff's rule: the rich get richer.",
      },
      {
        k: "p",
        text: "The standard test for unsaturation: shake with ==bromine water== — an alkene decolourises the orange almost instantly (the bromine adds across the double bond); an alkane does not, in the dark. Write “decolourises” — “goes clear” is not the mark-scheme word.",
      },
      {
        k: "p",
        text: "Alkenes also ==polymerise==: many molecules of an alkene join under heat and pressure with a catalyst to form a saturated polyalkene. Draw the repeating unit as the monomer with the double bond opened out, brackets around it, and the continuation bond n outside — poly(propene)'s unit is −[CH(CH~3~)–CH~2~]~n~−. Addition polymers are unreactive and non-biodegradable (useful, and a disposal problem — both sides appear in exams).",
      },
      {
        k: "tips",
        items: [
          "Curly arrows start where the electrons **are** (π bond, lone pair) and end where they **go** (δ^+^ atom). An arrow from the H of H–Br is the classic lost mark.",
          "Show δ^+^ and δ^−^ on the H–X before drawing the first arrow — the whole mechanism depends on that polarity.",
          "Repeating unit: brackets, continuation bonds through the brackets, and the small n. No double bonds survive polymerisation.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "But-1-ene + HBr — what forms, and why that isomer?",
            a: "2-bromobutane dominates: H adds to C-1 (more hydrogens), giving a secondary carbocation on C-2; Br^−^ then attacks. The primary route is disfavoured.",
          },
          {
            q: "Which of but-1-ene and but-2-ene shows E/Z isomerism, and why?",
            a: "But-2-ene: each double-bond carbon carries CH~3~ and H — two different groups. But-1-ene has a carbon with two identical H atoms, so no E/Z pair exists.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "C=C = σ + π; the π bond is the reactive part.",
          "Electrophilic addition: π attacks δ^+^ H, carbocation, anion attacks.",
          "Addition of HBr to an unsymmetrical alkene: the major product is formed via the more stable carbocation.",
          "E/Z needs two different groups on each double-bond carbon.",
          "Bromine water: reddish brown → colourless for unsaturation.",
        ],
      },
    ],
  },
];
