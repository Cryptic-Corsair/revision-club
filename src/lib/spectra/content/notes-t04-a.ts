import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 4 revision note · sections 4.1 – 4.8 (Part 4A)
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 4
   class note (2020, semester 1) — Introductory organic chemistry;
   page furniture and image-only drills omitted. The exercises
   that are specified in words are worked in full.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T04_A: SpecSection[] = [
  {
    spec: "4.1",
    statement: "understand the difference between hazard and risk",
    title: "Hazard and risk",
    blocks: [
      {
        k: "def",
        term: "Hazard",
        text: "The ==potential of a substance to do harm==. Some chemicals are **flammable** and some are **toxic** — and a hazard associated with a chemical will ==always be the same==.",
      },
      {
        k: "def",
        term: "Risk",
        text: "The ==chance that a particular hazardous substance will actually cause harm==. The risk of harm depends on the ==environment== in which the substance is used and ==how it is handled==.",
      },
      {
        k: "p",
        text: "Petrol is the note's own example. Petrol is flammable — that is its hazard, and the hazard never changes. But the ==risk== of catching fire while filling a car is very small, while the risk of harm if the petrol is exposed to fire is very high. Same substance, same hazard, completely different risk.",
      },
      {
        k: "wow",
        text: "Hazard is a ==property==; risk is a ==probability==. The hazard of a chemical is written on the bottle and never moves — the risk travels with what you are doing, where you are doing it, and how much you are using.",
      },
    ],
  },
  {
    spec: "4.2",
    statement:
      "understand the hazards associated with organic compounds and why it is necessary to carry out risk assessments when dealing with potentially hazardous materials",
    title: "Hazards of organic compounds",
    blocks: [
      {
        k: "p",
        text: "Many organic chemicals are:",
      },
      {
        k: "bullets",
        items: [
          "**Poisonous**",
          "**Carcinogenic**",
          "**Flammable**",
        ],
      },
      {
        k: "p",
        text: "As a result, it is very important to carry out a ==full risk assessment== before working with them: the assessment identifies the risk of using these hazardous chemicals and works out how to ==reduce the risks as far as possible==.",
      },
      {
        k: "note",
        label: "Why the assessment comes first",
        text: "You cannot choose sensible precautions for a hazard you have not named. The risk assessment is the step where flammable, toxic or carcinogenic are matched to the planned quantities, temperatures and apparatus — the reducing-risk playbook of 4.3 then follows from it.",
      },
    ],
  },
  {
    spec: "4.3",
    statement:
      "be able to suggest ways in which risks can be reduced and reactions carried out safely, for example: i working on a smaller scale ii taking precautions specific to the hazard iii using an alternative method that involves less hazardous substances",
    title: "Reducing risk",
    blocks: [
      {
        k: "p",
        text: "The class note gives five levers. The specification highlights three; the note adds two more that everyday laboratory work leans on.",
      },
      {
        k: "table",
        caption: "The risk-reduction playbook",
        head: ["Lever", "How it works", "The note's example"],
        rows: [
          ["Work on a smaller scale", "less of the hazard is present at any moment", "there is less risk of inhaling fumes with a smaller amount of chemicals"],
          ["Take precautions specific to the hazard", "barriers between you and the hazard", "use the lowest possible concentration; use ==fume cupboards== to remove toxic fumes; wear gloves and safety goggles"],
          ["Use an alternative method with less hazardous substances", "swap the danger out of the reaction", "use a ==less hazardous substitute== to study the same basic reaction"],
          ["Change the conditions", "a gentler reaction is a safer reaction", "lower the temperature of the reaction mixture so the rate falls — this in turn reduces the risks"],
          ["Careful use of safety measures", "general protective habit", "fume cupboards, gloves and goggles used deliberately, every time"],
        ],
      },
      {
        k: "worked",
        title: "Worked example · matching levers to a reaction",
        question:
          "A student is about to heat a toxic, flammable liquid with a Bunsen flame. Suggest, with a reason for each, three ways the risk could be reduced.",
        steps: [
          "**Smaller scale** — use a few cm^3^ instead of a large volume: less flammable vapour can form, and less toxic fume can escape.",
          "**Precaution specific to the hazard** — heat the apparatus in a ==fume cupboard== so toxic fumes are removed, and keep the flame away from the vapour (flammable).",
          "**Change the conditions** — use a hot water bath or lower flame temperature so the reaction rate falls and the liquid is less likely to boil violently.",
        ],
        answer:
          "Three levers, each tied to a named hazard — smaller scale, fume cupboard (toxicity), gentler heating (flammability). The examiner wants the ==reason attached to the measure==.",
      },
    ],
  },
  {
    spec: "4.4",
    statement: "understand the concepts of homologous series and functional group",
    title: "Homologous series and functional groups",
    blocks: [
      {
        k: "def",
        term: "Homologous series",
        text: "A series of compounds with the ==same functional group==, the ==same general formula==, and each member differing from the next by a ==CH~2~ group==.",
      },
      {
        k: "bullets",
        items: [
          "All members share the **same general formula** — the formula differs from their neighbours by CH~2~: CH~4~, C~2~H~6~, C~3~H~8~ …",
          "They contain the **same functional group(s)**.",
          "They have **similar chemical properties**.",
          "They show a ==gradual change in physical properties== as molar mass increases.",
          "They can usually be prepared by the **same methods**.",
        ],
      },
      {
        k: "def",
        term: "Functional group",
        text: "The group of atoms responsible for the ==characteristic reactions== of a compound. A functional group can consist of **one atom** (—Br), **a group of atoms** (—OH), or **multiple bonds between carbon atoms** (C=C). Each functional group has its own distinctive properties.",
      },
      {
        k: "table",
        caption: "Some common functional groups",
        head: ["Series", "Group ending", "General formula", "Example"],
        rows: [
          ["Alkane", "-ane", "RH", "C~2~H~6~ · ethane"],
          ["Alkene", "-ene", "—", "C~2~H~4~ · ethene"],
          ["Halogenoalkane", "halo-", "RX", "C~2~H~5~Cl · chloroethane"],
          ["Alcohol", "-ol", "ROH", "C~2~H~5~OH · ethanol"],
          ["Carboxylic acid", "-oic acid", "RCOOH", "CH~3~COOH · ethanoic acid"],
          ["Ester", "-yl -oate", "RCOOR", "CH~3~COOCH~3~ · methylethanoate"],
          ["Aldehyde", "-al", "RCHO", "CH~3~CHO · ethanal"],
          ["Ketone", "-one", "RCOR", "CH~3~COCH~3~ · propanone"],
        ],
      },
      {
        k: "note",
        label: "What R means",
        text: "The symbol ==R== stands for the groups of carbon and hydrogen atoms in the rest of the molecule — a placeholder for any alkyl chain that does not take part in the characteristic reaction.",
      },
      {
        k: "wow",
        text: "The ==ending of the name tells you the family== before you draw a single bond: -ane, -ene, -ol, -oic acid, -al, -one. The vast number of organic compounds sorts itself into a relatively small number of families — that is what makes the subject learnable.",
      },
    ],
  },
  {
    spec: "4.5",
    statement:
      "be able to apply the rules of International Union of Pure and Applied Chemistry (IUPAC) nomenclature to: i name compounds relevant to this specification ii draw these compounds, as they are encountered in the specification, using structural, displayed and skeletal formulae (students will be expected to know prefixes for compounds up to C~10~)",
    title: "Naming and drawing — the IUPAC toolkit",
    blocks: [
      { k: "h", text: "Classifying organic compounds" },
      {
        k: "table",
        caption: "The families behind the families",
        head: ["Class", "Structure"],
        rows: [
          ["Aliphatic", "molecules contain **straight- or branched-chain** skeletons"],
          ["Alicyclic", "molecules consist of **closed rings** of carbon atoms, which may contain single or multiple C–C bonds"],
          ["Aromatic (arenes)", "compounds containing **at least one benzene ring**"],
          ["Saturated", "molecules containing **only single bonds**"],
          ["Unsaturated", "molecules containing **double or triple bonds**"],
        ],
      },
      { k: "h", text: "The different formulae" },
      {
        k: "table",
        caption: "Six ways to say “butane”",
        head: ["Formula", "What it shows", "Butane"],
        rows: [
          ["General", "the simplest algebraic formula for a member of a homologous series", "C~n~H~2n+2~ for an alkane · C~n~H~2n~ for an alkene"],
          ["Molecular", "the exact number of atoms of each element in a molecule", "C~4~H~10~"],
          ["Empirical", "the simplest whole-number ratio of atoms of each element", "C~2~H~5~"],
          ["Structural", "the minimal detail that shows the arrangement of atoms", "CH~3~CH~2~CH~2~CH~3~ · propan-2-ol: CH~3~CHOHCH~3~"],
          ["Displayed", "the relative positioning of atoms and the number of bonds between them", "every bond drawn, C–C and C–H"],
          ["Skeletal", "a simplified formula: H removed from alkyl chains, leaving the carbon skeleton and functional groups", "see the figure below"],
        ],
      },
      { k: "figure", kind: "formula-types", caption: "Butane all five ways at once — molecular, empirical, structural, displayed and skeletal. One molecule, five levels of detail." },
      {
        k: "bullets",
        items: [
          "In a skeletal formula ==each covalent bond is shown by a line==.",
          "A ==carbon atom sits at the join of lines==, and functional groups are shown.",
          "The number of hydrogen atoms on each carbon is the ==difference between the number of lines and 4==.",
          "Skeletal formulae tend to be used with ==larger== organic molecules — the note's own illustrations are the folic acid and thalidomide molecules.",
          "**Space-filling models** are used to show a molecule in three dimensions.",
        ],
      },
      { k: "h", text: "Trivial names vs systematic names" },
      {
        k: "p",
        text: "A naming system must tell you ==everything about a structure without ambiguity==. Two systems are commonly met: **trivial** names, based on some property or historical aspect, which tell you little about the structure; and **systematic** names, based on the agreed IUPAC rules (the ==International Union of Pure and Applied Chemistry==), from which the exact structure can be found — and vice versa.",
      },
      {
        k: "table",
        caption: "Trivial → systematic",
        head: ["Trivial name", "Systematic name", "Example(s)"],
        rows: [
          ["Paraffin", "alkane", "methane, butane"],
          ["Olefin", "alkene", "ethene"],
          ["Fatty acid", "alkanoic (carboxylic) acid", "ethanoic acid"],
          ["Acetic acid", "ethanoic acid", "CH~3~COOH"],
        ],
      },
      { k: "h", text: "Stem · prefix · suffix · locant" },
      {
        k: "def",
        term: "Stem",
        text: "Shows the number of carbon atoms in the ==longest chain bearing the functional group==. Apart from the first four, which keep trivial stems (meth-, eth-, prop-, but-), the count comes from the Greek numbering: pent-, hex-, hept-, oct-, non-, dec-.",
      },
      {
        k: "def",
        term: "Suffix",
        text: "The ending that tells you ==which functional group is present==: -ane (alkane), -ene (alkene), -ol (alcohol), -oic acid (carboxylic acid), -al (aldehyde), -one (ketone). If any functional group is present, the relevant ending is added to the basic stem — and ==the position of the group must be given== to avoid ambiguity.",
      },
      {
        k: "def",
        term: "Locant",
        text: "The number that indicates ==where a side chain or functional group is attached==: 2-chlorobutane, but-2-ene.",
      },
      {
        k: "figure", kind: "naming", caption: "Every part of a systematic name has one job — stem, locant, multiplier, side-chain and suffix. Read a name the way you would read an address."
      },
      { k: "h", text: "The general rules" },
      {
        k: "bullets",
        items: [
          "Look for the ==longest chain of carbon atoms containing the functional group== — the carbons must be in a **continuous row**.",
          "Carbon-based substituents are named **before** the chain name, with **-yl** added to their stem: CH~3~ is *methyl*.",
          "Number the principal chain from the end that gives the side chain ==the lowest possible number==.",
          "With more than one side-chain: names appear in ==alphabetical order== (butyl, ethyl, methyl, propyl — *di-, tri- and tetra- do not count* in the alphabetising).",
          "Each side-chain gets **its own number**; identical side-chains take a multiplier prefix (di, tri, tetra).",
          "Numbers are separated from names by a ==hyphen== (2-methylheptane); numbers from numbers by a ==comma== (2,3-dimethylbutane).",
        ],
      },
      {
        k: "worked",
        title: "Worked example · the checklist in action",
        question: "Name CH~3~CH(CH~3~)CH(C~2~H~5~)CH~2~CH~2~CH~3~.",
        steps: [
          "Longest continuous chain: trace it — six carbons (the ethyl branch does not lengthen it) → stem **hex-**.",
          "Number from the end nearest a branch: locants **2** (methyl) and **3** (ethyl); from the other end they would be 5 and 4, so this direction wins.",
          "Side-chains named before the chain name, in alphabetical order — ==ethyl before methyl== even though ethyl carries the larger locant.",
          "Assemble: ethyl + locant 3, methyl + locant 2, hexane.",
        ],
        answer: "**3-ethyl-2-methylhexane** — the alphabet runs the substituents, the lowest set of locants runs the numbering.",
      },
      { k: "h", text: "Family-specific naming" },
      {
        k: "bullets",
        items: [
          "**Halogenoalkanes** — identify the longest chain containing the halogen; halogens are named as the prefixes ==fluoro, chloro, bromo, iodo==, listed alphabetically with the other substituents; a locant shows where the halogen sits.",
          "**Alkenes** — the principal chain must contain the C=C; it is ==not always the longest chain==. The position of the double bond takes the ==lower-numbered carbon== of the two it spans, and side-chain positions are numbered from the end that gives the C=C the lowest number.",
          "**Alcohols** — same principle: longest chain containing the O—H, with the ==lowest possible locant== for the —OH, and side-chains numbered from the end nearest the —OH.",
        ],
      },
      {
        k: "p",
        text: "One more rule from the note: when a molecule carries more than one type of functional group, a ==priority order== decides which group is the *principal* one — its suffix names the molecule, and every other group is demoted to a prefix (a branch).",
      },
      { k: "h", text: "Drawing from names — the drills, worked" },
      {
        k: "worked",
        title: "Worked example · structures from names (Exercise 5)",
        question:
          "Draw the structural formula of each: 3-bromopentane · 2,3-dimethyloctane · 3-methylhept-2-ene · 2-chlorohex-3-ene.",
        steps: [
          "**3-bromopentane** — five-chain, Br on C-3: CH~3~CH~2~CHBrCH~2~CH~3~. (C-3 is the middle carbon, so numbering from either end agrees.)",
          "**2,3-dimethyloctane** — eight-chain, methyls on C-2 and C-3: CH~3~CH(CH~3~)CH(CH~3~)(CH~2~)~4~CH~3~.",
          "**3-methylhept-2-ene** — seven-chain, C=C between C-2 and C-3, methyl on C-3: CH~3~CH=C(CH~3~)CH~2~CH~2~CH~2~CH~3~.",
          "**2-chlorohex-3-ene** — six-chain, C=C between C-3 and C-4, Cl on C-2: CH~3~CHClCH=CHCH~2~CH~3~.",
        ],
        answer:
          "Locant first, stem second, suffix last — then transcribe left to right. For the skeletal version, draw only the C–C skeleton (a zig-zag with the C=C as a double line) and show the Cl/Br on the right carbon.",
      },
      {
        k: "worked",
        title: "Worked example · alcohols from names (Exercise 5, continued)",
        question: "Draw the structural formula of each: butan-2-ol · propanol · 2-methylpropan-2-ol · 3-chloro-2-methylpentan-3-ol.",
        steps: [
          "**Butan-2-ol** — four-chain, —OH on C-2: CH~3~CHOHCH~2~CH~3~.",
          "**Propanol** — as written the name is ambiguous: three carbons and an —OH could sit on C-1 or C-2. The locant-less name is usually taken as **propan-1-ol**, CH~3~CH~2~CH~2~OH — a good example of why the note insists the ==position of the functional group must be stated==.",
          "**2-methylpropan-2-ol** — three-chain with —OH *and* a methyl both on C-2: (CH~3~)~3~COH.",
          "**3-chloro-2-methylpentan-3-ol** — five-chain; C-2 carries a methyl, C-3 carries both Cl and OH: CH~3~CH(CH~3~)C(Cl)(OH)CH~2~CH~3~.",
        ],
        answer:
          "Four alcohols, zero ambiguity once the locants are read — the —OH always lands on the numbered carbon, and every remaining valence is a hydrogen.",
      },
      {
        k: "note",
        label: "Spot the trick",
        text: "Exercise 5 also asks for **4-ethylpentane**. Draw it as named — CH~3~CH~2~CH~2~CH(C~2~H~5~)CH~3~ — and then trace the longest chain: it runs *through* the ethyl branch and holds six carbons, so the molecule is really ==3-methylhexane==. A correct IUPAC name can never hide a longer chain than the one it names — if your drawing finds one, the name was wrong, not the drawing.",
      },
      { k: "checkpoint", page: 13 },
    ],
  },
  {
    spec: "4.6",
    statement: "be able to classify reactions as addition, substitution, oxidation, reduction or polymerization",
    title: "Types of organic reactions",
    blocks: [
      {
        k: "def",
        term: "Addition",
        text: "Two substances react together to form a ==single== substance. Most of the reactions of alkenes are additions: ethene + bromine → CH~2~BrCH~2~Br.",
      },
      {
        k: "def",
        term: "Substitution",
        text: "One atom or group of atoms is ==replaced== by another atom or group. Saturated organic molecules usually undergo substitutions: methane + chlorine in sunlight → CH~3~Cl + HCl.",
      },
      {
        k: "def",
        term: "Polymerization",
        text: "Thousands of monomer molecules join together to form one ==long polymeric chain== — the polymer. Ethene polymerises to poly(ethene): (C~2~H~4~)~n~ → (CH~2~–CH~2~)~n~.",
      },
      {
        k: "def",
        term: "Reduction",
        text: "For organic molecules, ==the addition of hydrogen==: propanone, CH~3~COCH~3~, is reduced to propan-2-ol, CH~3~CH(OH)CH~3~.",
      },
      {
        k: "def",
        term: "Combustion",
        text: "A reaction with oxygen. ==Complete== combustion of a hydrocarbon gives carbon dioxide and water; ==incomplete== combustion gives carbon monoxide and water, with soot particles also formed.",
      },
      {
        k: "eq",
        eq: "C~3~H~8~ + 5O~2~ → 3CO~2~ + 4H~2~O        C~3~H~8~ + 7/2 O~2~ → 3CO + 4H~2~O",
        note: "Propane burning completely (left) and incompletely (right) — same fuel, limited oxygen, poison instead of CO~2~.",
      },
      {
        k: "note",
        label: "Where is oxidation?",
        text: "The specification's list is addition, substitution, ==oxidation==, reduction, polymerization — and combustion is the oxidation the note develops: burning in oxygen is the ultimate oxidation of a hydrocarbon.",
      },
      {
        k: "wow",
        text: "Classification is a ==counting== question: how many reactants and products (addition merges them, elimination splits them); did anything swap places (substitution); did hydrogen or oxygen arrive (reduction / oxidation); did small become huge (polymerization).",
      },
    ],
  },
  {
    spec: "4.7",
    statement:
      "understand that bond breaking can be: i homolytic, to produce free radicals ii heterolytic, to produce ions",
    title: "Homolytic and heterolytic fission",
    blocks: [
      {
        k: "p",
        text: "Chemical reactions involve ==breaking and making bonds== between atoms. A covalent bond in an organic molecule holds a *pair* of electrons, and there are exactly two fair ways to split a pair.",
      },
      {
        k: "def",
        term: "Homolytic fission",
        text: "Splitting a covalent bond into ==two equal halves== so that each species gets ==one electron==. It usually happens when the two bonded atoms have the ==same electronegativity==, so both attract the electrons equally. Homolytic fission produces **free radicals** — and a ==half-headed curly arrow== represents the movement of a single electron.",
      },
      {
        k: "def",
        term: "Heterolytic fission",
        text: "The ==unequal== fission of the covalent bond, when there is an ==electronegativity difference== between the bonded atoms: the more electronegative atom attracts the pair more strongly and ==takes both electrons==, leaving the other atom with none. Heterolytic fission produces **ions** — positively charged species (*electrophiles*) and negatively charged species (*nucleophiles*) — and a ==full-headed curly arrow== represents the movement of the electron pair.",
      },
      {
        k: "table",
        caption: "Splitting X—Y, two ways",
        head: ["", "Homolytic fission", "Heterolytic fission"],
        rows: [
          ["When", "electronegativities of X and Y are equal (or nearly)", "electronegativities of X and Y differ"],
          ["Who gets the electrons", "one each", "the more electronegative atom gets the pair"],
          ["Products", "**free radicals** — X• and Y•", "**ions** — a cation and an anion"],
          ["Arrow drawn", "half-headed (fish-hook) curly arrow", "full-headed curly arrow"],
          ["Used by", "alkane + halogen chains (4.18)", "electrophilic addition, nucleophilic substitution"],
        ],
      },
      {
        k: "bullets",
        items: [
          "If the electronegativity of Y is greater than that of X, ==Y keeps the pair==: the fission gives X^+^ and Y^−^ — ==X^+^ is the electrophile==, ==Y^−^ is the nucleophile==.",
          "If X is the more electronegative, the roles reverse: ==Y^+^ is the electrophile== and ==X^−^ the nucleophile==.",
        ],
      },
      {
        k: "wow",
        text: "The whole of organic mechanism bookkeeping hangs on one question asked at the moment of fission: ==who pulls harder?== Equal pull → radicals. Unequal pull → ions, with the stronger puller taking the pair and becoming negative.",
      },
    ],
  },
  {
    spec: "4.8",
    statement: "know definitions of the terms ‘free radical’ and ‘electrophile’",
    title: "Radicals, nucleophiles and electrophiles",
    blocks: [
      {
        k: "def",
        term: "Free radical",
        text: "An ==uncharged species with a single unpaired electron==, used to form a covalent bond. Radicals are ==very reactive==. Example: Cl• — drawn with the single dot standing for the unpaired electron.",
      },
      {
        k: "def",
        term: "Nucleophile",
        text: "A species with a ==lone pair of electrons== that it uses to form a covalent bond with a ==δ^+^ atom== in another molecule — nucleophiles ==attack electron-deficient areas==: they seek out positive charge.",
      },
      {
        k: "def",
        term: "Electrophile",
        text: "A ==positively charged or neutral species== that bonds to an ==electron-rich site== in a molecule, ==accepting a pair of electrons== from that site to form a new covalent bond. Electrophiles are ==attracted to areas of high electron density==.",
      },
      {
        k: "note",
        label: "Standard examples",
        text: "The class note illustrates these with structures; the examples to carry forward are: radicals **Cl•**, **•CH~3~**; nucleophiles **OH^−^**, **CN^−^**, **H~2~O**, **NH~3~** (all with a lone pair to donate); electrophiles **H^+^**, **NO~2~^+^** — and the neutral halogens **Br~2~**, **Cl~2~**, which can be ==polarised== so that they act as electrophiles.",
      },
      {
        k: "p",
        text: "That last line matters: these ==neutral species can be polarised== so that they act as electrophiles — an electron-rich site pushes the shared pair towards one atom of the neutral molecule, opening a δ^+^ end for the attack.",
      },
      { k: "h", text: "Reaction mechanisms — naming them from three coordinates" },
      {
        k: "p",
        text: "A reaction type (or ==mechanism==) describes the way in which the electron cloud of the covalent bond shifts during the reaction. Mechanisms are classified according to three things: the **type of bond fission** (homolytic or heterolytic), the **nature of the reagent** (free radical, electrophile or nucleophile), and the **type of structural change** (addition, substitution, elimination). Hence names like ==heterolytic electrophilic addition==, ==heterolytic nucleophilic substitution== or ==homolytic free radical substitution==.",
      },
      {
        k: "table",
        caption: "Which reagent does what",
        head: ["Type of reagent", "Addition", "Substitution", "Elimination"],
        rows: [
          ["Nucleophile", "✓", "✓", "✓"],
          ["Electrophile", "✓", "✓", "—"],
          ["Free radical", "✓", "✓", "—"],
        ],
      },
      {
        k: "wow",
        text: "Any mechanism in this course can be ==named from its three coordinates== — fission, reagent, structural change. The radical chain of 4.18 is *homolytic + free radical + substitution*; the alkene reactions coming next are *heterolytic + electrophilic + addition*.",
      },
    ],
  },
];
