import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 4 revision note · sections 4.9 – 4.18 (Part 4B)
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 4
   class note (2020, semester 1) — Alkanes; page furniture and
   image-only drills omitted. The worded exercises (isomers of
   C₅H₁₂/C₆H₁₄, combustion equations, the ICl mechanism) are
   worked in full; all equations balance-checked.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T04_B: SpecSection[] = [
  {
    spec: "4.9",
    statement:
      "know the general formula of alkanes and cycloalkanes, and understand that they are hydrocarbons (compounds of carbon and hydrogen only) which are saturated (contain single bonds only)",
    title: "Alkanes and cycloalkanes",
    blocks: [
      {
        k: "def",
        term: "Alkane",
        text: "A ==hydrocarbon== (a compound of carbon and hydrogen **only**) belonging to the homologous series with general formula ==C~n~H~2n+2~== (non-cyclic only). Alkanes are ==saturated==: every bond in the chain is a single bond. They are highly flammable, and their carbon atoms are ==sp^3^ hybridised==.",
      },
      { k: "h", text: "Why tetrahedral — sp^3^ hybridisation" },
      {
        k: "steps",
        caption: "From ground-state carbon to four equal bonds",
        items: [
          { title: "Ground state", icon: "spark", text: "The electronic configuration of a carbon atom is 1s^2^2s^2^2p^2^ — only **two unpaired electrons**, yet carbon forms four bonds." },
          { title: "Promotion", icon: "spark", text: "It is energetically stable to ==promote one electron from the 2s orbital to the empty p orbital==: the configuration becomes 1s^2^2s^1^2p^3^. Four unpaired means ==less repulsion and more stability==." },
          { title: "Hybridisation", icon: "spark", text: "The one s and three p orbitals combine — ==hybridise== — to give **four new, equivalent sp^3^ orbitals**." },
          { title: "The shape", icon: "spark", text: "In alkanes the four sp^3^ orbitals ==repel each other into a tetrahedral arrangement==, so bonds are spaced tetrahedrally (109.5°) around each carbon — and carbon forms **sigma bonds** with other carbons and with hydrogens." },
        ],
      },
      { k: "h", text: "Naming the alkanes, C₁ → C₁₀" },
      {
        k: "table",
        caption: "Prefixes for compounds up to C₁₀ — the first four keep trivial names, the rest are Greek",
        head: ["Name", "C atoms", "Condensed structure"],
        rows: [
          ["Methane", "1", "CH~4~"],
          ["Ethane", "2", "CH~3~CH~3~"],
          ["Propane", "3", "CH~3~CH~2~CH~3~"],
          ["Butane", "4", "CH~3~CH~2~CH~2~CH~3~"],
          ["Pentane", "5", "CH~3~(CH~2~)~3~CH~3~"],
          ["Hexane", "6", "CH~3~(CH~2~)~4~CH~3~"],
          ["Heptane", "7", "CH~3~(CH~2~)~5~CH~3~"],
          ["Octane", "8", "CH~3~(CH~2~)~6~CH~3~"],
          ["Nonane", "9", "CH~3~(CH~2~)~7~CH~3~"],
          ["Decane", "10", "CH~3~(CH~2~)~8~CH~3~"],
        ],
      },
      { k: "h", text: "Side chains and branches" },
      {
        k: "bullets",
        items: [
          "Carbon-based substituents are named **before** the chain name, with **-yl** added to the basic stem: CH~3~– is *methyl*, CH~3~CH~2~– is *ethyl*, then *propyl*, *butyl*.",
          "Number the principal chain from one end so the side chain is attached to a carbon with ==the lowest possible number==: 2-methylhexane, not 5-methylhexane.",
          "More than one side-chain? Names run in ==alphabetical order== (butyl, ethyl, methyl, propyl); **each side-chain gets its own number**; identical side-chains take **di-, tri-, tetra-** prefixes.",
          "Numbering direction matters: count from whichever end gives the ==lowest set of locants== — the note's worked example takes **3,4,6**, not 3,5,6.",
          "Punctuation: numbers from names by a ==hyphen== (2-methylheptane); numbers from numbers by a ==comma== (2,3-dimethylbutane).",
        ],
      },
      { k: "h", text: "Cycloalkanes" },
      {
        k: "p",
        text: "Cyclic alkanes are alkanes in which ==the ends of the carbon chain have been linked to form a ring==. Their general formula is **not** the same as simple alkanes: it is the same as the alkenes', ==C~n~H~2n~== — because ==two hydrogens are lost== when the ends of the chain link. In the IUPAC system the prefix **cyclo-** is used with the usual rules: cyclopropane, cyclohexane, 1,3-dimethylcyclopentane.",
      },
      {
        k: "wow",
        text: "One ring costs two hydrogens: C~6~H~14~ is hexane, C~6~H~12~ is cyclohexane — the same formula as an alkene, but with ==no double bond anywhere==.",
      },
      { k: "checkpoint", page: 20 },
    ],
  },
  {
    spec: "4.10",
    statement:
      "understand the term ‘structural isomerism’ and be able to draw the structural isomers of organic molecules, given their molecular formula",
    title: "Structural isomerism",
    blocks: [
      {
        k: "def",
        term: "Isomerism",
        text: "Isomerism occurs when two or more compounds have the ==same molecular formula== but have a ==different structural formula==, or a different arrangement of atoms in space.",
      },
      {
        k: "table",
        caption: "Types of isomerism",
        head: ["Isomerism", "Types", "Cause"],
        rows: [
          ["Structural isomerism", "chain · position · functional group", "same molecular formula, ==different structural formulae=="],
          ["Stereoisomerism", "geometrical · optical", "same structural formula, different arrangement ==in space=="],
        ],
      },
      {
        k: "bullets",
        items: [
          "**Chain isomerism** — occurs due to ==branching in the carbon chains==: butane against 2-methylpropane, or the branched giants 2,2,4-trimethylpentane and 4-ethyl-2,5-dimethylheptane.",
          "**Position isomerism** — occurs due to the ==position in which the functional group sits==: the same group on different carbons of the same skeleton.",
          "**Functional group isomerism** — occurs due to the ==presence of different functional groups==: the same atoms re-organised into a different family altogether (the standard case: the aldehyde propanal, CH~3~CH~2~CHO, against the ketone propanone, CH~3~COCH~3~ — both C~3~H~6~O).",
        ],
      },
      {
        k: "wow",
        text: "Every isomer check starts from the ==molecular formula==: same atoms, but a ==different structural formula== — chain (branching), position (where the functional group sits) or functional group (a different family).",
      },
    ],
  },
  {
    spec: "4.11",
    statement: "be able to draw and name the structural isomers of alkanes and cycloalkanes with up to six carbon atoms",
    title: "Isomers of the small alkanes",
    blocks: [
      {
        k: "p",
        text: "Alkanes exhibit ==structural isomerism== — the chain type, caused by branching. ==C~4~H~10~== has exactly two isomers: the straight-chain **butane** and the branched **2-methylpropane**.",
      },
      { k: "figure", kind: "isomers", caption: "The three isomers of C₅H₁₂ — pentane, 2-methylbutane and 2,2-dimethylpropane." },
      {
        k: "worked",
        title: "Worked example · Exercise 2(a) — all the isomers of C~5~H~12~",
        question: "Draw and name all the isomers of C~5~H~12~.",
        steps: [
          "**Longest chain = 5**: pentane, CH~3~CH~2~CH~2~CH~2~CH~3~ — the straight chain.",
          "**Longest chain = 4**, the spare carbon as one methyl branch: 2-methylbutane, CH~3~CH(CH~3~)CH~2~CH~3~ (branch on C-2; on C-3 would be the same molecule numbered backwards).",
          "**Longest chain = 3**, two methyl branches — and they must share one carbon: 2,2-dimethylpropane, CH~3~C(CH~3~)~2~CH~3~. (2,3-dimethylpropane would have a four-carbon longest chain — it *is* 2-methylbutane.)",
        ],
        answer: "**Three** isomers: pentane · 2-methylbutane · 2,2-dimethylpropane.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 2(b) — all the isomers of C~6~H~14~",
        question: "Draw and name all the isomers of C~6~H~14~.",
        steps: [
          "**Longest chain = 6**: hexane, CH~3~(CH~2~)~4~CH~3~.",
          "**Longest chain = 5**, one methyl branch: on C-2 → 2-methylpentane, CH~3~CH(CH~3~)CH~2~CH~2~CH~3~; on C-3 → 3-methylpentane, CH~3~CH~2~CH(CH~3~)CH~2~CH~3~ (C-4 is C-3 numbered backwards).",
          "**Longest chain = 5**, one ==ethyl== branch: impossible here — an ethyl on a five-chain makes a six-chain straight chain (that *is* hexane).",
          "**Longest chain = 4**, two methyl branches: together on one carbon → 2,2-dimethylbutane, CH~3~C(CH~3~)~2~CH~2~CH~3~; split across the chain → 2,3-dimethylbutane, CH~3~CH(CH~3~)CH(CH~3~)CH~3~.",
        ],
        answer: "**Five** isomers: hexane · 2-methylpentane · 3-methylpentane · 2,2-dimethylbutane · 2,3-dimethylbutane.",
      },
      {
        k: "bullets",
        items: [
          "Work ==down the longest chain==: 6 → 5 → 4, deciding at each step where the spare carbons can go without creating a longer chain than you counted.",
          "Beware **duplicates in disguise**: a “different” numbering that just re-reads the same molecule is not a new isomer — 3-methylpentane numbered from the other end is still 3-methylpentane.",
          "For cycloalkanes the same rule holds: cyclopentane and methylcyclobutane are both C~5~H~10~ — same molecular formula, different structural formula.",
        ],
      },
      { k: "checkpoint", page: 22 },
    ],
  },
  {
    spec: "4.12",
    statement:
      "know that alkanes are used as fuels and obtained from the fractional distillation, cracking and reforming of crude oil, and be able to write equations for these reactions",
    title: "Crude oil — distillation, cracking, reforming",
    blocks: [
      {
        k: "p",
        text: "The most important source of alkanes is ==fossil fuels== like crude oil (petroleum). The composition of crude petroleum ==varies according to its source==: it is a dark-coloured, viscous liquid consisting mostly of ==alkanes with up to 40 carbon atoms==, along with some alkenes, alkynes, water, sulfur and sand.",
      },
      {
        k: "p",
        text: "It can be split into useful fractions by ==fractional distillation==: distillation separates compounds according to their ==boiling point==, and at each level of the column a mixture of compounds in a ==similar boiling range== is taken off — a **fraction**. Rough fractions can be distilled further to obtain narrower boiling ranges. The lower-boiling fractions are usually the most important ones.",
      },
      { k: "figure", kind: "frac-col", caption: "The fractionating column: compounds condense at the height where the temperature matches their boiling range." },
      {
        k: "table",
        caption: "The main fractions and their uses",
        head: ["Fraction", "What is in it", "Used for"],
        rows: [
          ["Refinery gas", "gaseous alkanes C~1~–C~4~, a large proportion of methane", "fuel, and a starting point for other organic synthesis"],
          ["Gasoline", "liquid hydrocarbons C~5~–C~10~, straight and branched chains", "petrol for internal-combustion engines — ==the more branched molecules, the more useful the fuel=="],
          ["Kerosene", "mainly the C~11~ and C~12~ fraction", "aircraft fuel; can be cracked to form gasoline"],
          ["Diesel / gas oil", "longer chains still", "diesel engines and industrial boilers"],
          ["Residue", "a complex mixture of hydrocarbons", "further fractionated into lubricating oil, fuel oil, waxes and bitumen"],
        ],
      },
      { k: "h", text: "Cracking" },
      {
        k: "p",
        text: "The demand for the ==lighter== fractions is higher than for the heavier ones — but the heavy, long-chain fractions make up ==more than 50 %== of the products from distillation. So the longer chains are broken down into simpler, more useful molecules by **cracking**. There are two types: ==thermal cracking== and ==catalytic cracking==.",
      },
      {
        k: "bullets",
        items: [
          "**Thermal cracking** — heating long-chain alkanes at very high temperatures (==400 – 900 °C==) causes the molecules to split into shorter chains. Bonds can break anywhere, by ==C–C bond fission or C–H bond fission==.",
          "A long chain cracks to give either ==an alkane and an alkene==, or ==an alkene and hydrogen==:",
        ],
      },
      {
        k: "eq",
        eq: "C~10~H~22~ → C~8~H~18~ + C~2~H~4~        C~4~H~10~ → C~4~H~8~ + H~2~",
        note: "Thermal cracking, both patterns: decane → octane + ethene (alkane + alkene); butane → butene + hydrogen (alkene + H~2~). Every equation must balance.",
      },
      {
        k: "bullets",
        items: [
          "**Catalytic cracking** — producing the high temperatures for thermal cracking is ==very expensive==; using a catalyst lets the process run at a ==lower temperature==. The catalysts commonly used are ==zeolites== (crystalline aluminosilicates).",
          "Unlike thermal cracking, ==branched and cyclic alkanes can be formed== — this is ==catalytic reforming==. Branched alkanes are the more useful fuels: their boiling points are ==lower== than the straight-chain isomers'.",
        ],
      },
      {
        k: "note",
        label: "In the lab",
        text: "The note's suggested practical: ==cracking liquid paraffin by thermal decomposition== over an ==aluminium oxide catalyst==.",
      },
    ],
  },
  {
    spec: "4.13",
    statement:
      "know that pollutants, including carbon monoxide, oxides of nitrogen and sulfur, carbon particulates and unburned hydrocarbons, are emitted during the combustion of alkane fuels",
    title: "Combustion and its pollutants",
    blocks: [
      {
        k: "p",
        text: "Alkanes are useful fuels because they ==burn easily in oxygen==, releasing energy in an ==exothermic== reaction. But alkanes only burn when they are in the ==gaseous state== — liquid and solid alkanes are less flammable because they must be vaporised first. Methane (natural gas), propane and butane are the commonly used fuels; propane and butane can be liquefied under ==high pressure at low temperature== to form ==LPG== (liquefied petroleum gas) — an advantage over methane, because LPG is easy to transport and a large quantity of gas stores in a small space.",
      },
      {
        k: "eq",
        eq: "CH~4~(g) + 2O~2~(g) → CO~2~(g) + 2H~2~O(l)        CH~4~(g) + 1½O~2~(g) → CO(g) + 2H~2~O(l)",
        note: "Complete combustion needs plenty of oxygen; limited oxygen gives ==carbon monoxide== instead of carbon dioxide.",
      },
      {
        k: "bullets",
        items: [
          "==Carbon dioxide== from complete combustion is a ==greenhouse gas== which leads to global warming and climate change.",
          "==Carbon monoxide== from incomplete combustion is a ==poisonous gas==.",
        ],
      },
      { k: "h", text: "Oxides of sulfur" },
      {
        k: "p",
        text: "Some molecules in crude oil ==contain atoms of sulfur== which fractional distillation ==may not remove==. During combustion the sulfur forms sulfur dioxide, which reacts further in the atmosphere; when the oxides dissolve in water in the atmosphere they form ==sulfurous acid and sulfuric acid== — contributing to the formation of ==acid rain==.",
      },
      {
        k: "eq",
        eq: "S + O~2~ → SO~2~        2SO~2~ + O~2~ → 2SO~3~        SO~2~ + H~2~O → H~2~SO~3~        SO~3~ + H~2~O → H~2~SO~4~",
      },
      { k: "h", text: "Oxides of nitrogen" },
      {
        k: "p",
        text: "Very few alkane-fuel molecules contain nitrogen — but combustion happens at ==very high temperatures==, hot enough for the nitrogen molecules of the air to react with oxygen. The main oxide formed is ==NO==, which can take up more oxygen in the atmosphere. Nitrogen oxide is acidic and dissolves in water in the atmosphere, forming ==nitrous acid and nitric acid== — both acids contribute to environmental damage.",
      },
      {
        k: "eq",
        eq: "N~2~ + O~2~ → 2NO        2NO + O~2~ → 2NO~2~        2NO~2~ + H~2~O → HNO~2~ + HNO~3~",
      },
      {
        k: "table",
        caption: "The pollutants from alkane-fuel combustion",
        head: ["Pollutant", "Where it comes from", "The problem"],
        rows: [
          ["CO", "incomplete combustion", "==toxic== — see 4.14 for why"],
          ["CO~2~", "complete combustion", "greenhouse gas → global warming, climate change"],
          ["SO~2~ / SO~3~", "sulfur impurities in the fuel", "dissolve to H~2~SO~3~ / H~2~SO~4~ → ==acid rain=="],
          ["NO / NO~2~", "N~2~ + O~2~ at engine temperatures", "dissolve to HNO~2~ / HNO~3~ → acidic, environmental damage"],
          ["Carbon particulates", "incomplete combustion (soot)", "particles emitted with the exhaust"],
          ["Unburned hydrocarbons", "fuel that escapes combustion", "wasted fuel, part of the exhaust mixture"],
        ],
      },
      {
        k: "wow",
        text: "Every pollutant traces back to either ==what the fuel carries== (sulfur) or ==how completely it burned== (CO, particulates, unburned hydrocarbons) or ==how hot the engine runs== (NO~x~).",
      },
    ],
  },
  {
    spec: "4.14",
    statement:
      "understand the problems arising from pollutants from the combustion of alkane fuels, limited to the toxicity of carbon monoxide and why it is toxic, and the acidity of oxides of nitrogen and sulfur",
    title: "Catalytic converters to the rescue",
    blocks: [
      {
        k: "p",
        text: "Cars and other road vehicles are responsible for ==a lot of air pollution==. The widespread use of ==catalytic converters== fitted to exhaust systems has made pollution less of a problem.",
      },
      {
        k: "bullets",
        items: [
          "Converters use small quantities of ==precious metals== — **platinum, rhodium, palladium**.",
          "The metals are ==spread thinly over a honeycomb mesh== to ==increase the surface area== for reaction.",
          "One common type is the ==three-way catalyst==, named because it removes **three** different pollutants: ==carbon monoxide, unburned hydrocarbons, and oxides of nitrogen==.",
        ],
      },
      {
        k: "note",
        label: "CO is toxic",
        text: "Carbon monoxide is a ==poisonous gas== formed when combustion is ==incomplete== (4.13) — which is why the converter's oxidation of CO to CO~2~ matters.",
      },
      {
        k: "note",
        label: "The acidity link",
        text: "The spec's “problems arising” are ==toxicity== (CO, a ==poisonous gas== from incomplete combustion) and ==acidity== (the oxides of nitrogen and sulfur dissolving to HNO~2~/HNO~3~ and H~2~SO~3~/H~2~SO~4~).",
      },
    ],
  },
  {
    spec: "4.15",
    statement:
      "be able to discuss the reasons for developing alternative fuels in terms of sustainability and reducing emissions, including the emission of CO~2~ and its relationship to climate change",
    title: "Alternative fuels",
    blocks: [
      {
        k: "p",
        text: "Recently there have been attempts to produce new fuels as ==alternatives to fossil fuels== — most can be described as ==biofuels==, meaning they are obtained from ==living matter that has died recently==, rather than matter that died many millions of years ago.",
      },
      {
        k: "p",
        text: "A wide definition of biofuels would even include ==wood== — used as a fuel for many centuries, and a ==renewable== source. The driving reasons are ==sustainability== (fossil reserves do not renew) and ==reducing emissions==, above all the ==CO~2~== whose emission is linked to climate change.",
      },
      {
        k: "wow",
        text: "A biofuel returns to the atmosphere carbon that was ==drawn from it recently==; a fossil fuel returns carbon that was absorbed ==millions of years ago==.",
      },
    ],
  },
  {
    spec: "4.16",
    statement:
      "be able to apply the concept of carbon neutrality to different fuels, such as petrol, bioethanol and hydrogen",
    title: "Carbon neutrality",
    blocks: [
      {
        k: "def",
        term: "Carbon neutral",
        text: "A term used to represent the idea of ==carbon dioxide neutrality==: if the amount of CO~2~ formed when a fuel burns is ==the same as the amount absorbed== while it grew, the fuel is described as carbon neutral — over the time period, the combustion ==has not altered the CO~2~ in the atmosphere==.",
      },
      {
        k: "p",
        text: "The note's picture: a growing tree ==absorbs carbon dioxide== from the atmosphere and the carbon atoms become ==part of the structure of the tree==. Cut the tree down and burn the wood, and CO~2~ forms during combustion. If the amount formed on burning ==equals== the amount absorbed during growth, the wood is carbon neutral.",
      },
      {
        k: "note",
        label: "The awkward case",
        text: "By the same logic, ==fossil fuels formed from trees could be described as carbon neutral== — they too absorbed CO~2~ during growth and form the same amount when burned. The difference is the ==time period== over which the CO~2~ is returned.",
      },
      { k: "h", text: "Bioalcohols" },
      {
        k: "p",
        text: "Bioalcohols are fuels made from ==recently-grown plants== that have absorbed CO~2~ from the atmosphere — so they are close to carbon neutral. Using them does involve ==forming more carbon dioxide than is absorbed== (growing, processing and transport all cost energy), but even so bioalcohols are ==closer to being carbon neutral than fossil fuels==.",
      },
      { k: "h", text: "Bioethanol" },
      {
        k: "bullets",
        items: [
          "Currently the commonest bioalcohol is ==bioethanol== — and it is ==identical to ethanol==: the “bio” refers only to the ==method of production==.",
          "For centuries ethanol has been produced by the ==fermentation of sugars==; the ethanol must then be ==separated from the much larger amount of water== before use as a fuel — and that separation ==requires energy==.",
          "It is now possible to use a ==wide range of plants, and plant waste==, to produce ethanol; the upper limit obtainable from a given amount of starting material is ==increasing==, and is much higher than in traditional fermentation.",
          "In the ==United States, corn== is the main source of ethanol used in cars.",
        ],
      },
      { k: "h", text: "Comparing fuels — the four questions" },
      {
        k: "table",
        caption: "The note's comparison for any proposed fuel",
        head: ["Question", "What it asks"],
        rows: [
          ["Land use", "how much land is used to grow the crop? Should the land grow ==food== to feed people instead?"],
          ["Yield", "how much crop per piece of land, how fast does it grow — and what percentage of the carbon and hydrogen in the crop ==ends up in the fuel==?"],
          ["Manufacture and transport", "how much energy is used in ==growing, processing and transporting== the crop?"],
          ["Carbon neutrality", "==how close is the fuel to being carbon neutral==?"],
        ],
      },
      { k: "h", text: "Hydrogen" },
      {
        k: "p",
        text: "For a long time ==hydrogen== has been considered an ideal alternative fuel — and it is ==not a biofuel==. There are two main ways to use it in cars: it can be ==burned== instead of fossil fuels such as petrol or natural gas, or it can be used in a ==fuel cell== to generate electricity that powers an electric motor. Whether burned or fed to a fuel cell, ==no carbon dioxide is produced== — which suggests ==no increase in the greenhouse effect==.",
      },
      {
        k: "wow",
        text: "Petrol: carbon absorbed ==millions of years ago== is released and not re-absorbed. Bioethanol: recently absorbed carbon, though ==more CO~2~ is formed than absorbed== overall. Hydrogen: ==no carbon dioxide is produced== at all.",
      },
    ],
  },
  {
    spec: "4.17",
    statement: "understand the reactions of alkanes with: i oxygen in the air (combustion) ii halogens",
    title: "Reactions with oxygen and halogens",
    blocks: [
      { k: "h", text: "i · With oxygen in the air — combustion" },
      {
        k: "p",
        text: "Alkanes ==burn easily in the presence of oxygen== to release energy in an ==exothermic== reaction — but only in the ==gaseous state==, so liquid and solid alkanes must be vaporised before they can burn. Methane (natural gas), propane and butane are the everyday fuels. Complete combustion gives ==CO~2~ and H~2~O==; incomplete combustion gives ==CO and H~2~O== (see 4.13).",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 3(a) — complete combustion",
        question: "Write equations for the complete combustion of butane, hexane and decane.",
        steps: [
          "**Butane** C~4~H~10~: C first — 4CO~2~; H next — 5H~2~O; count O — 8 + 5 = 13, so 13/2 O~2~; double everything to clear the fraction.",
          "**Hexane** C~6~H~14~: 6CO~2~ + 7H~2~O needs 12 + 7 = 19 oxygens → 19/2 O~2~; doubled.",
          "**Decane** C~10~H~22~: 10CO~2~ + 11H~2~O needs 20 + 11 = 31 oxygens → 31/2 O~2~; doubled.",
        ],
        answer:
          "2C~4~H~10~ + 13O~2~ → 8CO~2~ + 10H~2~O  ·  2C~6~H~14~ + 19O~2~ → 12CO~2~ + 14H~2~O  ·  2C~10~H~22~ + 31O~2~ → 20CO~2~ + 22H~2~O — pattern: ==O~2~ coefficient = C + H/4== per one molecule, then double if odd.",
      },
      {
        k: "worked",
        title: "Worked example · Exercise 3(b) — incomplete combustion (to CO)",
        question: "Write equations for the incomplete combustion of propane, heptane and octane.",
        steps: [
          "Same order — C to CO, H to H~2~O — but only ==half the oxygen== of the complete case: O~2~ coefficient = C + H/4 with the CO~2~ halved to CO, i.e. ==C + H/4, all over 2== per one molecule.",
          "**Propane** C~3~H~8~: 3CO + 4H~2~O needs 3 + 4 = 7 O → 7/2 O~2~; doubled.",
          "**Heptane** C~7~H~16~: 7CO + 8H~2~O needs 7 + 8 = 15 O → 15/2 O~2~; doubled.",
          "**Octane** C~8~H~18~: 8CO + 9H~2~O per molecule needs 8 + 9 = 17 O → 17/2 O~2~ per molecule; doubled.",
        ],
        answer:
          "2C~3~H~8~ + 7O~2~ → 6CO + 8H~2~O  ·  2C~7~H~16~ + 15O~2~ → 14CO + 16H~2~O  ·  2C~8~H~18~ + 17O~2~ → 16CO + 18H~2~O — and ==CO is toxic== (4.14).",
      },
      { k: "h", text: "ii · With halogens — halogenation" },
      {
        k: "def",
        term: "Halogenation",
        text: "The ==introduction of a halogen atom== into an alkane. Alkanes react with chlorine ==with an input of energy in the form of sunlight or ultraviolet light==, and it is a ==substitution== reaction — hydrogen atoms are substituted by chlorine atoms. The chlorination of alkanes proceeds via the mechanism ==homolytic free radical substitution== (4.18).",
      },
      {
        k: "eq",
        eq: "CH~4~ + Cl~2~ → HCl + CH~3~Cl        CH~3~Cl + Cl~2~ → HCl + CH~2~Cl~2~        CH~2~Cl~2~ + Cl~2~ → HCl + CHCl~3~        CHCl~3~ + Cl~2~ → HCl + CCl~4~",
        note: "Reagents: chlorine and methane. Conditions: ==UV light or sunlight== — heat could be used as an alternative energy source. Products, step by step: chloromethane · dichloromethane · trichloromethane · tetrachloromethane.",
      },
      { k: "checkpoint", page: 29 },
    ],
  },
  {
    spec: "4.18",
    statement:
      "understand the mechanism of the free radical substitution reaction between an alkane and a halogen: i using free radicals, which are species with an unpaired electron, represented by a single dot ii showing the initiation step of the mechanism, with curly half-arrows for free radical formation iii showing the propagation and termination steps of the mechanism iv having limited use in synthesis because of further substitution reactions",
    title: "Homolytic free-radical substitution",
    blocks: [
      {
        k: "p",
        text: "Alkanes undergo ==homolytic free radical substitution== when they react with a halogen — the chlorination of methane is the model reaction, and the mechanism runs in exactly ==three steps==.",
      },
      { k: "figure", kind: "radchain", caption: "The chain: initiation makes radicals (half-headed arrows), propagation regenerates them, termination combines two radicals into a neutral product — the trace of ethane is the evidence." },
      {
        k: "steps",
        caption: "The three steps, methane + chlorine",
        items: [
          { title: "1 · Initiation", icon: "flame", text: "In the presence of ==sunlight (UV rays)==, chlorine molecules undergo ==homolytic fission== to form chlorine free radicals: Cl~2~ → 2Cl• — drawn with ==curly half-arrows==, one electron going each way." },
          { title: "2 · Propagation", icon: "spark", text: "Chlorine free radicals attack methane molecules, resulting in a hydrogen atom being substituted by a chlorine atom: Cl• + CH~4~ → •CH~3~ + HCl, then •CH~3~ + Cl~2~ → CH~3~Cl + Cl•. The radical is ==regenerated==, so the process continues in a ==chain reaction==." },
          { title: "3 · Termination", icon: "flame", text: "Two free radicals in the system ==combine together to form a neutral product==: Cl• + Cl• → Cl~2~, •CH~3~ + Cl• → CH~3~Cl, •CH~3~ + •CH~3~ → C~2~H~6~." },
        ],
      },
      {
        k: "bullets",
        items: [
          "The mechanism shows the possibility of forming ==hydrocarbons with more carbon atoms== than the reactant used — the trace of **ethane**, C~2~H~6~, from two methyl radicals ==combining together==.",
          "Halogenation of alkanes has ==limited use in synthesis== because the reaction ==cannot be controlled==: many substitution reactions (side reactions) occur at the same time, so a ==mixture of several products== is obtained.",
          "That is 4.17: once CH~3~Cl exists, further substitution carries on to CH~2~Cl~2~, CHCl~3~ and CCl~4~ — each substitution running through the same chain reaction.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · Exercise 4 — ethane + iodine monochloride",
        question:
          "Write the complete mechanism for the reaction of ethane with I–Cl to form iodoethane.",
        steps: [
          "**Initiation** — UV light splits the I–Cl bond homolytically (half-headed arrows, one electron each way):  I–Cl → I• + Cl•.",
          "**Propagation 1** — the chlorine radical removes a hydrogen:  Cl• + CH~3~CH~3~ → •CH~2~CH~3~ + HCl.",
          "**Propagation 2** — the ethyl radical attacks the ==δ^+^ iodine== end of I–Cl (chlorine is the more electronegative atom, so iodine is the electron-poor end):  •CH~2~CH~3~ + I–Cl → CH~3~CH~2~I + Cl•. The Cl• is ==regenerated==.",
          "**Termination** — two free radicals ==combine together to form a neutral product==: I• + Cl• → ICl, I• + I• → I~2~, Cl• + Cl• → Cl~2~, •CH~2~CH~3~ + Cl• → CH~3~CH~2~Cl, •CH~2~CH~3~ + I• → CH~3~CH~2~I, •CH~2~CH~3~ + •CH~2~CH~3~ → C~4~H~10~.",
        ],
        answer:
          "Overall: ==CH~3~CH~3~ + I–Cl → CH~3~CH~2~I + HCl==. The two propagation steps are the chain pair — each one ==regenerates the radical the other needs==.",
      },
      {
        k: "bullets",
        items: [
          "Radicals are drawn with a ==single dot== for the unpaired electron — no charge anywhere in this mechanism.",
          "==Half-headed curly arrows== belong to initiation and radical steps: ==one arrow per electron==. A ==full-headed curly arrow== represents the movement of a pair of electrons (the heterolytic mechanisms).",
          "A propagation step must ==regenerate the radical== the next step needs.",
          "==Ethane in the products== means two •CH~3~ radicals ==combined together== in a termination step.",
        ],
      },
      { k: "checkpoint", page: 30 },
    ],
  },
];
