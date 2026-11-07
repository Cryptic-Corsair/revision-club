import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 10 revision note · Part 10B — Alcohols (spec 10.15–10.19)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 10C
   class note (Alcohols, 2021, semester 2); page furniture omitted.
   The topic is purely qualitative, so it carries no worked
   examples. The physical
   properties page carries no objective badge in the class note,
   so it rides inside the 10.16 section in book order.
   Ten figures are redrawn: the bond angles, the four classes,
   the solubility trio, the dehydration equation with its
   butan-2-ol fork, the oxidation flow, the distillation rig,
   the reflux rig, the fractionating column, the separating
   funnel and the boiling-point apparatus.
   Highlighting is kept deliberately light: one mark per key
   term, short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T10_B: SpecSection[] = [
  {
    spec: "10.15",
    statement:
      "understand the nomenclature of alcohols and be able to draw their structural, displayed and skeletal formulae",
    title: "Alcohols and their names",
    blocks: [
      { k: "h", text: "The family" },
      {
        k: "bullets",
        items: [
          "Alcohols have the general formula C~n~H~2n+1~OH",
          "The ==functional group== is –OH.",
          "They are good organic solvents.",
          "They are also used as raw materials in organic synthesis.",
        ],
      },
      { k: "h", text: "Bond angles in alcohols" },
      {
        k: "figure",
        kind: "alc-angles",
        caption:
          "The class note's angle drawing, redrawn on ethanol: every carbon sits in a tetrahedron, but the oxygen keeps two lone pairs of its own — they squeeze the H–O–C angle down to 104.5°.",
      },
      {
        k: "bullets",
        items: [
          "The H-O-C bond is ==104.5°== (bent line shape), because there are 2 bond pairs of electrons and 2 lone pairs repelling to a position of minimum repulsion. Lone pairs repel more than bond pairs so the bond angle is reduced.",
          "All the H-C-H bonds and C-C-O are ==109.5°== (tetrahedral shape), because there are 4 bond pairs of electrons repelling to a position of minimum repulsion.",
        ],
      },
      { k: "h", text: "Nomenclature — in the IUPAC system" },
      {
        k: "bullets",
        items: [
          "Identify the longest chain of carbon atoms containing the –OH group",
          "To show that the compound is an alcohol, suffix –e of the parent alkane is changed to ==-ol==.",
          "The carbon number is also added to show the location of the -OH group.",
          "No ==locant== is needed with only two carbons.",
          "With longer chains, a locant is needed to tell us where on the chain the –OH group is situated.",
        ],
      },
      {
        k: "table",
        caption: "The class note's naming table",
        head: ["Compound", "Name"],
        rows: [
          ["CH~3~OH", "Methanol"],
          ["CH~3~CH~2~OH", "Ethanol"],
          ["CH~3~CH~2~CH~2~OH", "Propan-1-ol"],
          ["CH~3~CH(OH)CH~3~", "Propan-2-ol"],
        ],
      },
      {
        k: "bullets",
        items: [
          "If the carbon chain is branched, the longest continuous carbon chain containing the –OH group is given the parent name and the side chains are named as alkyl groups.",
          "If there are more than one –OH groups, ==di-, tri-, tetra-==, etc. are used. In this case locants are used to say where they are. In addition, the root word ends with 'ane'",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH(OH)CH(OH)CH~3~        Butane-2,3-diol",
        note: "Eg. — two –OH groups, so di- plus locants to say where they sit",
      },
      {
        k: "wow",
        text: "Three fixes rename any alcohol. Count the longest chain that owns the –OH, swap the alkane's -e for -ol, then spend the smallest numbers you can — one locant for the carbon wearing the oxygen, more for the branches. Two oxygens on one chain? The root keeps its 'ane' and di- carries the news.",
      },
    ],
  },
  {
    spec: "10.16",
    statement: "understand the distinction between primary, secondary and tertiary alcohols",
    title: "Primary, secondary or tertiary",
    blocks: [
      {
        k: "bullets",
        items: [
          "Alcohols are classified into different classes depending on how the –OH group is positioned on chain of carbon atoms.",
          "The chemical behaviour, especially oxidation, often depends on the structural type.",
        ],
      },
      {
        k: "table",
        head: ["Class", "How to count"],
        rows: [
          ["Primary alcohols", "The carbon which carries the –OH group is only attached to one alkyl group."],
          ["Secondary alcohols", "The carbon which carries the –OH group is joined directly to two alkyl groups."],
          ["Tertiary alcohols", "The carbon which carries the –OH group is joined directly to three alkyl groups."],
        ],
      },
      {
        k: "figure",
        kind: "alc-classes",
        caption:
          "The class note's four classes, redrawn: the methyl alcohol has no alkyl group at all, and then it is one, two or three — with the note's own examples, the –OH group picked out in colour. The table also shows ethanol, propan-1-ol and 2-methylpropan-1-ol as primaries, butan-2-ol and pentan-3-ol as secondaries and 2-methylbutan-2-ol as a tertiary.",
      },
      { k: "h", text: "Physical properties of alcohols" },
      { k: "h", text: "Melting and boiling temperatures" },
      {
        k: "bullets",
        items: [
          "Alcohols have melting and boiling temperatures much higher than those of alkanes and haloalkanes of comparable relative molecular mass.",
          "This is because alcohols can form ==hydrogen bonding== between molecules while weak London forces present between alkanes and dipole-dipole forces exist between haloalkanes.",
          "Since hydrogen bonding is stronger, it requires more energy to break the bonds.",
        ],
      },
      { k: "h", text: "Solubility" },
      {
        k: "bullets",
        items: [
          "Alcohols with relatively short carbon chains dissolve in water.",
          "This is because alcohols can form hydrogen bonds with water which is stronger than the London forces between the carbon chains of alcohols.",
          "The solubility in water gradually ==decreases== with increasing carbon chain length.",
          "This is because the non-polar group of the alcohols becomes bigger which results in increasing the strength of London forces between carbon chains of alcohol groups.",
          "More than one –OH groups in the molecules increases solubility since more hydrogen bonds can be formed between alcohol and water.",
        ],
      },
      {
        k: "figure",
        kind: "alc-solubility",
        caption:
          "The class note's solubility trio, redrawn: the –OH end hydrogen-bonds happily with water, but the hydrocarbon tail only stacks London forces — grow the tail and the water loses the tug-of-war.",
      },
      {
        k: "wow",
        text: "One carbon does all the deciding — again. Find the carbon wearing the –OH, count the alkyl groups holding its other hands: none makes it methyl, one primary, two secondary, three tertiary. Nothing else about the molecule matters for the label, yet the label runs the show — it decides how the alcohol oxidises and even how it burns.",
      },
    ],
  },
  {
    spec: "10.17",
    statement:
      "understand the reactions of alcohols with: i oxygen in air (combustion) ii halogenating agents • PCl~5~ to produce chloroalkanes (including its use as a qualitative test for the presence of the –OH group) • 50% concentrated sulfuric acid and potassium bromide to produce bromoalkanes • red phosphorus and iodine to produce iodoalkanes iii concentrated phosphoric acid to form alkenes by elimination",
    title: "Reactions of alcohols",
    blocks: [
      { k: "h", text: "Combustion" },
      {
        k: "bullets",
        items: [
          "Alcohols make useful fuels.",
          "Alcohols, like almost all organic chemicals burn in oxygen to form carbondioxide and water",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~5~OH(l) + 3O~2~(g) → 2CO~2~(g) + 3H~2~O(l)",
        note: "e.g. — ethanol",
      },
      {
        k: "p",
        text: "Halogenation: In halogenation reactions, -OH group of alcohol molecule is ==replaced by a halogen atom==.",
      },
      { k: "h", text: "a) (i) Chlorination — for primary and secondary alcohols" },
      {
        k: "bullets",
        items: [
          "Reagent: Phosphorous (V) chloride (PCl~5~)",
          "Condition: Room temperature",
          "Reaction type: ==Substitution==",
          "Observation: ==Misty fumes== (HCl)",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~OH + PCl~5~ → CH~3~CH~2~Cl + POCl~3~ + HCl",
        note: "Equation with ethanol",
      },
      {
        k: "note",
        label: "The qualitative test",
        text: "This reaction (reaction with PCl~5~) is used as a test for the presence of –OH group in a molecule",
      },
      { k: "h", text: "(ii) Chlorination — for tertiary alcohols" },
      {
        k: "bullets",
        items: [
          "Reagent: Concentrated Hydrochloric acid (HCl)",
          "Condition: Room temperature",
          "Reaction type: Substitution",
        ],
      },
      {
        k: "eq",
        eq: "(CH~3~)~3~COH + HCl → (CH~3~)~3~CCl + H~2~O",
        note: "Equation with ethanol",
      },
      {
        k: "note",
        label: "The alcohol is mixed (by shaking) with concentrated hydrochloric acid",
        text: "Read the book's label with care: the equation sits under the words 'Equation with ethanol', but the alcohol in it is the tertiary (CH~3~)~3~COH — 2-methylpropan-2-ol. Ethanol is primary, so it takes the PCl~5~ route above.",
      },
      { k: "h", text: "b) Bromination" },
      {
        k: "bullets",
        items: [
          "Reagents: Sodium (or potassium) bromide and 50% concentrated sulphuric acid",
          "Conditions: ==Heat under reflux==",
          "Reaction type: Substitution",
          "Product: Bromoalkane",
        ],
      },
      {
        k: "eq",
        eq: "KBr + H~2~SO~4~ → KHSO~4~ + HBr",
        note: "Equations — in two stages: first make the HBr",
      },
      { k: "eq", eq: "2KBr + H~2~SO~4~ → K~2~SO~4~ + 2HBr", note: "Or" },
      {
        k: "eq",
        eq: "C~2~H~5~OH(l) + HBr(aq) → C~2~H~5~Br(l) + H~2~O(l)",
        note: "Equation with ethanol",
      },
      {
        k: "note",
        label: "Why 50% concentrated H2SO4?",
        text: "Because 100% concentrated sulphuric acid oxidises bromide ions to bromine and no hydrogen bromide is produced for the reaction.",
      },
      { k: "h", text: "c) Iodination" },
      {
        k: "bullets",
        items: [
          "Reagents: Iodine and moist red Phosphorous",
          "Conditions: warm",
          "Reaction type: Substitution",
          "Product: Iodoalkane",
        ],
      },
      {
        k: "eq",
        eq: "2P(s) + 3I~2~(s) → 2PI~3~(s)",
        note: "Equation — again in two stages",
      },
      {
        k: "eq",
        eq: "3C~2~H~5~OH(l) + PI~3~(aq) → 3C~2~H~5~I(l) + H~3~PO~3~(l)",
      },
      { k: "h", text: "Dehydration" },
      {
        k: "bullets",
        items: [
          "Reagents: Excess Conc. H~2~SO~4~ or Conc. H~3~PO~4~",
          "Conditions: Heat under reflux at 170 °C",
          "Reaction type: ==Elimination/ dehydration==",
          "Product: Alkene",
        ],
      },
      {
        k: "figure",
        kind: "alc-dehydration",
        caption:
          "The class note's displayed equation, redrawn: ethanol loses water — an H from one carbon and the –OH from the other — and the two left-over carbons join in a double bond. Below it, the note's warning case: butan-2-ol can drop either neighbour's hydrogen, so two alkenes form.",
      },
      {
        k: "bullets",
        items: [
          "For unsymmetrical alcohols containing more than three C atoms, a mixture of isomeric products can be formed. Example: dehydration of butan-2-ol.",
        ],
      },
      {
        k: "eq",
        eq: "2CH~3~CH~2~CH(OH)CH~3~ → CH~3~CH=CHCH~3~ + CH~3~CH~2~CH=CH~2~ + 2 H~2~O",
        note: "butan-2-ol → but-2-ene and but-1-ene",
      },
      {
        k: "wow",
        text: "Every route off this page starts the same way: the –OH group leaves. Choose the reagent and you choose what replaces it — chlorine from PCl~5~ or concentrated HCl, bromine via HBr made in the flask from KBr and 50% acid, iodine via PI~3~ from red phosphorus — or, with hot concentrated acid and no halogen at all, the group leaves with a neighbour's hydrogen and the alkene stays behind.",
      },
    ],
  },
  {
    spec: "10.18",
    statement:
      "understand that potassium dichromate(VI) in dilute sulfuric acid can oxidise: i primary alcohols to produce aldehydes (which give a positive result with Benedict's or Fehling's solution) if the product is distilled as it form ii primary alcohols to produce carboxylic acids (which give a positive result with sodium carbonate or sodium hydrogencarbonate) if the reagents are heated under reflux iii secondary alcohols to produce ketones",
    title: "Oxidation reactions of alcohols",
    blocks: [
      {
        k: "bullets",
        items: [
          "Oxidation of alcohols using acidified potassium dichromate(VI) or potassium manganate(VII) solution leads to the formation of aldehydes, ketones and carboxylic acids.",
          "This reaction provides a way of ==differentiating== between primary, secondary and tertiary alcohols.",
          "Oxidation can be brought about by a number of oxidizing agents. The two most common ones are given in the table below",
        ],
      },
      {
        k: "table",
        head: ["Reagent", "Observation"],
        rows: [["Potassium dichromate(VI) + dil.sulphuric acid", "==Orange to green=="]],
      },
      { k: "h", text: "a) Primary alcohols" },
      {
        k: "bullets",
        items: [
          "Primary alcohols can be oxidized to either aldehydes or carboxylic acids depending on reaction conditions.",
          "First the primary alcohol is oxidized to an aldehyde which is then oxidized further to a carboxylic acid.",
        ],
      },
      {
        k: "def",
        term: "Aldehyde",
        text: "Aldehyde is a homologous series of organic compounds with R-CHO functional group.",
      },
      {
        k: "figure",
        kind: "alc-ox-flow",
        caption:
          "The class note's oxidation map, redrawn: distil the aldehyde out as it forms and the story stops there; leave it under reflux and the aldehyde condenses back into the mixture and gets oxidised to the acid. Secondary stops at the ketone; tertiary refuses altogether.",
      },
      {
        k: "p",
        text: "The class note draws the two rigs side by side here — distillation for the aldehyde, heat under reflux for the acid — and both are redrawn, fully labelled, under spec 10.19 below.",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~OH + [O] → CH~3~CHO + H~2~O",
        note: "Equation for the oxidation of ethanol to ethanal — [O] means 'oxygen from an oxidising agent'",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~OH + 2[O] → CH~3~COOH + H~2~O",
        note: "Equation for the oxidation of ethanol to ethanoic acid",
      },
      { k: "h", text: "b) Secondary alcohols" },
      {
        k: "bullets",
        items: [
          "Secondary alcohols can be only oxidized to ketones.",
          "Ketones ==cannot be further oxidized==.",
        ],
      },
      { k: "eq", eq: "Secondary alcohol → ketones → cannot be oxidized" },
      {
        k: "def",
        term: "Ketone",
        text: "Ketone is a homologous series of organic compounds with R-C=O functional group.",
      },
      {
        k: "eq",
        eq: "CH~3~CH(OH)CH~3~ + [O] → CH~3~COCH~3~ + H~2~O",
        note: "Equation for the oxidation of propan-2-ol to propanone",
      },
      { k: "h", text: "c) Tertiary alcohols" },
      {
        k: "bullets",
        items: ["Tertiary alcohols cannot be oxidized."],
      },
      { k: "eq", eq: "Tertiary alcohols + [O] → No reaction" },
      { k: "h", text: "Test for aldehydes" },
      { k: "p", text: "Reaction with Benedict's reagent or Fehling's solution" },
      {
        k: "bullets",
        items: [
          "Reagent: Fehling's solution is blue in colour due to Cu^2+^ ions.",
          "Conditions: Gently heat",
          "Type of reaction: oxidation (only Aldehydes are oxidized to carboxylic acid) – Cu^2+^ ions are reduced to Cu^+^ ions.",
        ],
      },
      {
        k: "table",
        head: ["Observation:", "ALDEHYDE", "KETONE"],
        rows: [
          [
            "Colour change",
            "Blue solution (Cu^2+^) changes to a ==brick red precipitate== (CuO).",
            "Blue solution remains unchanged.",
          ],
        ],
      },
      { k: "h", text: "Test for acids" },
      { k: "p", text: "Reaction with Sodium Hydrogen Carbonate or sodium carbonate." },
      {
        k: "bullets",
        items: [
          "Reagent: sodium hydrogen carbonate or Sodium carbonate",
          "Observation: effervescence/ colourless gas bubbles that turn lime water milky.",
        ],
      },
      {
        k: "eq",
        eq: "2CH~3~CO~2~H + Na~2~CO~3~ → 2CH~3~CO~2~^−^Na^+^ + H~2~O + CO~2~",
      },
      {
        k: "wow",
        text: "The aldehyde never gets a say. It is the obligatory middle step — but whether it survives to become the acid is decided entirely by the glassware: distil and it leaves the mixture the moment it forms, too fast for the oxidising agent to catch it; reflux and it drips straight back into the orange solution, which keeps oxidising until only the acid remains.",
      },
    ],
  },
  {
    spec: "10.19",
    statement:
      "understand, the following techniques in the preparation and purification of a liquid organic compound: i heating under reflux ii extraction with a solvent using a separating funnel iii distillation iv drying with an anhydrous salt v boiling temperature determination",
    title: "Purifying an organic liquid",
    blocks: [
      {
        k: "bullets",
        items: [
          "Different types of reactions can be used in the preparation of organic compounds.",
          "The organic products obtained from these reactions are not pure. It could be contaminated with unreacted starting materials, other organic products, the inorganic reagents used or products formed from them, and water.",
        ],
      },
      { k: "h", text: "Techniques used to purify the organic product" },
      {
        k: "p",
        text: "The techniques used are based on the physical state (solid, liquid or gas) of the product. Common techniques include;",
      },
      {
        k: "bullets",
        items: [
          "Simple distillation",
          "Heat under reflux",
          "Fractional distillation",
          "Solvent extraction",
          "Drying",
          "Boiling point determination",
        ],
      },
      { k: "h", text: "Distillation" },
      {
        k: "bullets",
        items: [
          "Distillation is the process of separating the components or substances from a liquid mixture by using ==selective boiling and condensation==.",
          "Need to collect the distillate of the approximate boiling point range of the desired product.",
        ],
      },
      {
        k: "figure",
        kind: "alc-distillation",
        caption:
          "The class note's distillation rig, redrawn: the mixture boils, the vapour turns to liquid in the cold Liebig condenser and the distillate collects in the receiver. It's important to be able to draw and label this apparatus accurately.",
      },
      {
        k: "note",
        label: "The thermometer bulb",
        text: "The bulb of the thermometer should be at the T junction connecting to the condenser to measure the correct boiling point.",
      },
      {
        k: "note",
        label: "Water goes in the bottom of the condenser",
        text: "Water goes in the bottom of the condenser to go against gravity. This allows more efficient cooling and prevents back flow of water.",
      },
      { k: "h", text: "Heat under reflux" },
      {
        k: "bullets",
        items: [
          "Heat under reflux is used when heating organic reaction mixtures for long periods.",
          "The condenser prevents organic vapours from escaping by condensing them back to liquids.",
        ],
      },
      {
        k: "figure",
        kind: "alc-reflux",
        caption:
          "The class note's reflux rig, redrawn: a pear-shaped flask boils under a vertical Liebig condenser — vapour rises, condenses on the cold jacket and drips back, so nothing escapes while the heating runs for hours.",
      },
      {
        k: "note",
        label: "Never seal the end of the condenser",
        text: "Never seal the end of the condenser as the build up of gas pressure could cause the apparatus to explode.",
      },
      {
        k: "note",
        label: "Anti-bumping granules",
        text: "Anti-bumping granules are added to the flask in both distillation and reflux to prevent vigorous, uneven boiling by making small bubbles form instead of large bubbles.",
      },
      {
        k: "note",
        label: "NOTE: Electric heaters",
        text: "Electric heaters are often used to heat organic chemicals. This is because organic chemicals are normally highly flammable and could set on fire with a naked flame.",
      },
      { k: "h", text: "Fractional distillation" },
      {
        k: "p",
        text: "Fractional distillation is the separation of a liquid mixture into fractions differing in boiling point by means of distillation, typically using a fractionating column.",
      },
      {
        k: "figure",
        kind: "alc-fractional",
        caption:
          "The fractionating column, redrawn: packed with glass beads, it gives the rising vapour many condense-and-revaporise cycles — the low-boiling fraction wins the race to the top and over into the condenser.",
      },
      { k: "h", text: "Separating funnel" },
      {
        k: "bullets",
        items: [
          "A mixture of two immiscible liquids can be separated by using a separating funnel.",
          "A separating funnel is a special type of funnel which has a stop-cock in its stem to allow the flow of a liquid from it, or to stop the flow of liquid from it.",
          "When two immiscible liquids are placed in a separatory funnel, ==two layers== are seen.",
        ],
      },
      {
        k: "figure",
        kind: "alc-funnel",
        caption:
          "The class note's funnel, redrawn on its stand: the oil floats on the water, the stop-cock meters the run-off, and the lower layer drains into the conical flask. Denser solvent will be the bottom layer.",
      },
      {
        k: "note",
        label: "Denser solvent will be the bottom layer",
        text: "Most halogenated solvents are denser than water, most non halogenated solvents are less dense than water.",
      },
      {
        k: "steps",
        caption: "Solvent extraction — Method",
        items: [
          {
            title: "Load the funnel",
            text: "Place reaction mixture in separating funnel and add the solvent. (it should form two separate layers)",
          },
          {
            title: "Shake and vent",
            text: "Place stopper in the neck of the funnel and gently shake the contents, releasing pressure by opening the tap from time to time.",
          },
          {
            title: "Settle",
            text: "Allow contents to settle into two layers.",
          },
          {
            title: "Run off",
            text: "Remove the stopper and open the tap and collect the desired organic layer into a flask and discard the unwanted aqueous layer.",
          },
        ],
      },
      { k: "h", text: "Drying" },
      {
        k: "bullets",
        items: [
          "Final traces of water are removed by treating the organic solution with a drying agent.",
          "A drying agent is an inorganic salt which readily takes up water to ==become hydrated==.",
        ],
      },
      {
        k: "steps",
        caption: "Drying an organic liquid — Method",
        items: [
          {
            title: "Add the agent",
            text: "Add three spatula loads of drying agent (e.g. anhydrous sodium sulphate, calcium chloride) into organic liquid.",
          },
          {
            title: "Dry",
            text: "Dry the organic liquid. When dry the organic liquid should appear clear.",
          },
          {
            title: "Remove the agent",
            text: "Drying agent is removed by either decanting or filtration.",
          },
        ],
      },
      {
        k: "note",
        label: "The drying agent should",
        text: "be insoluble in the organic liquid · should not react with the organic liquid.",
      },
      { k: "p", text: "Most commonly used solid drying agents include;" },
      {
        k: "table",
        head: ["Drying Agent", "Applications"],
        rows: [
          ["Anhydrous Calcium chloride, CaCl~2~", "Used for hydrocarbons"],
          ["Anhydrous Calcium sulfate, CaSO~4~", "Generally useful"],
          ["Anhydrous Magnesium sulfate, MgSO~4~", "Not used for very acid-sensitive compounds"],
          ["Anhydrous Potassium carbonate, K~2~CO~3~", "Not for acidic compounds"],
          ["Anhydrous Sodium sulfate, Na~2~SO~4~", "Generally useful"],
        ],
      },
      { k: "h", text: "Testing for purity — boiling point determination" },
      {
        k: "bullets",
        items: [
          "Purity of liquid can be determined by measuring a boiling point.",
          "This can be done in a distillation set up or by simply boiling a tube of the sample in an heating oil bath.",
          "Once the boiling point is found the value is compared with the data booklet values and the purity of the compound is determined.",
        ],
      },
      {
        k: "figure",
        kind: "alc-bp",
        caption:
          "The class note's boiling-point tube, redrawn: a capillary tube stands in the sample inside glass tubing, warmed in an oil bath — the moment a steady stream of bubbles leaves the capillary and the vapour temperature holds, that is the boiling point.",
      },
      {
        k: "note",
        label: "A correct measure of boiling point",
        text: "To get a correct measure of boiling point the thermometer should be above the level of the surface of the boiling liquid and be measuring the temperature of the ==saturated vapour==.",
      },
      {
        k: "note",
        label: "Note the pressure",
        text: "Pressure should be noted as changing pressure can change the boiling point of a liquid",
      },
      {
        k: "wow",
        text: "Purification is a relay of handoffs, each runner removing one impurity: reflux or distillation separates by boiling point, the fractionating column only stretches the same idea into many stages, the separating funnel pulls out the layer that will not mix, the anhydrous salt drinks the last traces of water — and the boiling point at the end is the receipt, checked against the data booklet.",
      },
    ],
  },
];
