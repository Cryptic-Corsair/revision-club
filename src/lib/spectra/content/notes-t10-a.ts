import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 10 revision note · Part 10A — Halogenoalkanes (spec 10.6–10.13)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 10
   class note (2021, semester 2); page furniture omitted. The class
   note opens with 10A general principles and refers objectives
   10.1–10.5 to the introductory organic chemistry notes — on the
   bench that is the Topic 4 note, so this file picks the topic up
   at 10B. The exercise drill (Exercises 1–4) is left to the book;
   the one Check point keeps its card and points at its page. The
   topic is purely qualitative, so it carries no worked examples.
   Nine figures are redrawn: the isomer pairs, the three classes,
   the C–X bond ladder, the carbocation chain, the reflux rig, the
   two substitution mechanisms and the hydrolysis experiment, plus
   the reactions crossroads.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T10_A: SpecSection[] = [
  {
    spec: "10.6",
    statement:
      "understand the nomenclature of halogenoalkanes and be able to draw their structural, displayed and skeletal formulae",
    title: "Halogenoalkanes and their names",
    blocks: [
      { k: "h", text: "The family" },
      {
        k: "bullets",
        items: [
          "Halogenoalkanes (also called ==haloalkanes==) have a halogen atom attached to a hydrocarbon chain.",
          "Halogenoalkanes have the general formula C~n~H~2n+1~X, where X is a halogen atom (F, Cl, Br or I)",
          "The halogen atom may be at the end of the chain or on any of the carbons.",
          "Halogenoalkanes have only single bonds in the molecule.",
        ],
      },
      { k: "h", text: "Nomenclature — in the IUPAC system" },
      {
        k: "bullets",
        items: [
          "Identify the longest chain of carbon atoms containing the halogen.",
          "Halogen substituents are indicated by the prefixes fluoro, chloro, bromo and iodo, and are ==listed in alphabetical order== with other substituents",
          "The carbon number is also added to show the location of the halogen.",
          "No locant is needed with only two carbons.",
          "With longer chains, a locant is needed to tell us where on the chain the halogen atom is situated.",
        ],
      },
      {
        k: "table",
        caption: "The class note's naming table",
        head: ["Compound", "Name"],
        rows: [
          ["CH~3~Cl", "Chloromethane"],
          ["CH~3~CH~2~Br", "Bromoethane"],
          ["CH~3~CH~2~CH~2~I", "1-iodopropane"],
          ["CH~3~CH(I)CH~3~", "2-iodopropane"],
        ],
      },
      {
        k: "bullets",
        items: [
          "If the carbon chain is branched, the longest continuous carbon chain containing the halogen atom is given the parent name and the side chains are named as alkyl groups.",
          "If there are more than one halogen atoms, ==di-, tri-, tetra-==, etc. are used. In this case locants are used to say where they are.",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH(Cl)CH(Cl)CH~3~        2,3-dichlorobutane",
        note: "Eg. — two chlorines, so di- plus locants to say where they sit",
      },
      { k: "h", text: "Isomers of halogenoalkanes" },
      {
        k: "bullets",
        items: [
          "Isomers are the organic compounds, which have the ==same molecular formula== but different structural formula and properties. The phenomenon is called isomerism.",
          "Haloalkanes can exhibit following type of isomerism.",
          "==Chain isomerism==: occurs due to branching in carbon chains.",
          "==Position isomerism==: occurs due to the position in which the functional group is present.",
        ],
      },
      {
        k: "figure",
        kind: "hx-isomers",
        caption:
          "The class note's isomer pairs, redrawn as skeletons: the chain isomers share the formula but one backbone is branched; the position isomers keep the same backbone and simply move the halogen along it.",
      },
      {
        k: "wow",
        text: "The halogen never changes the counting — C~n~H~2n+1~X fits chloromethane and 1-iodopropane alike, because swapping Cl for Br for I changes the mass, not the formula pattern. What does change the formula is the carbon skeleton: every extra carbon buys one more H, so the chain can branch or slide the halogen around while C~4~H~9~Br stays C~4~H~9~Br.",
      },
    ],
  },
  {
    spec: "10.7",
    statement:
      "understand the distinction between primary, secondary and tertiary halogenoalkanes",
    title: "Primary, secondary or tertiary",
    blocks: [
      {
        k: "bullets",
        items: [
          "Halogenoalkanes may be classified as ==primary==, ==secondary== or ==tertiary==, depending on the number of carbon atoms attached to the carbon holding the halogen (C-X group).",
        ],
      },
      {
        k: "table",
        head: ["Class", "How to count"],
        rows: [
          ["Primary halogenoalkanes", "The carbon which carries the halogen atom is only attached to one alkyl group."],
          ["Secondary halogenoalkanes", "The carbon which carries the halogen atom is joined directly to two alkyl groups."],
          ["Tertiary halogenoalkanes", "The carbon which carries the halogen atom is joined directly to three alkyl groups."],
        ],
      },
      {
        k: "figure",
        kind: "hx-classes",
        caption:
          "The class note's three classes, redrawn: count the alkyl groups joined to the carbon that carries the halogen — one, two or three. The examples are the note's own: 1-chloroethane, 2-bromopropane and 2-iodo-2-methylpropane.",
      },
      {
        k: "p",
        text: "The same types of reaction are open to all three types of halogenolkanes but there is a ==difference in the rate== at which they react.",
      },
      { k: "checkpoint", page: 4 },
      {
        k: "wow",
        text: "One carbon does all the deciding. Find the carbon wearing the halogen, count the alkyl groups holding its other hands — one, two or three — and the halogenoalkane is primary, secondary or tertiary. Nothing else about the molecule matters for the label; the rate differences that follow come later, from what that carbon does when the halogen leaves.",
      },
    ],
  },
  {
    spec: "10.13",
    statement:
      "understand, in terms of bond enthalpy, the trend in reactivity of chloro-, bromo- and iodoalkanes",
    title: "The nature of the halogen",
    blocks: [
      {
        k: "bullets",
        items: [
          "Halogens have a ==greater electronegativity than carbon==. A dipole is induced in the C-X bond and it becomes ==polar==, carbon is always δ^+^ and X is always δ^−^.",
        ],
      },
      {
        k: "p",
        text: "The polarity produces an ==electron deficient carbon atom==, C δ^+^ which is important in the reactions of halogenoalkanes. Thus δ^+^ carbon can be ==attacked by nucleophiles==.",
      },
      {
        k: "p",
        text: "All halogenoalkanes react with same reagent and undergo same type of reactions but the rate of reaction varies with two factors;",
      },
      { k: "h", text: "1. Nature of halogen" },
      {
        k: "p",
        text: "Rate of the reaction increases because the carbon halogen bond becomes ==longer and hence weaker==, so less energy required to break it.",
      },
      {
        k: "figure",
        kind: "hx-bond",
        caption:
          "The class note's bond ladder, redrawn with the dipole marked: going down the halogens the C–X bond stretches longer, so it snaps more easily — the iodoalkane needs the least energy, the chloroalkane the most.",
      },
      {
        k: "wow",
        text: "Two rival effects live in one bond. Polarity says carbon–chlorine should react fastest: the C–Cl bond is the most polarised, so the δ+ carbon pulls nucleophiles hardest. Bond enthalpy outvotes it — C–I is the weakest bond, so it breaks first. Watch which one the markschemes reward: when the question says rate, answer with bond strength, not polarity.",
      },
    ],
  },
  {
    spec: "10.12",
    statement:
      "know the trend in reactivity of primary, secondary and tertiary halogenoalkanes",
    title: "The type of halogenoalkane",
    blocks: [
      { k: "h", text: "2. Type of halogenoalkane" },
      {
        k: "eq",
        eq: "1° Halogenoalkane → 2° Halogenoalkane → 3° Halogenoalkane",
        note: "Rate of the reaction increases",
      },
      {
        k: "bullets",
        items: [
          "Rate of reaction increases due to the increase in stability of the ==carbocations==.",
          "Tertiary carbocations are more stable than secondary carbocations which are more stable than primary carbocations.",
        ],
      },
      { k: "eq", eq: "Tertiary > Secondary > Primary > methyl" },
      {
        k: "figure",
        kind: "hx-carbocation",
        caption:
          "The class note's stability chain, redrawn structure by structure: every extra alkyl group pushing electron density towards the positive carbon steadies the carbocation — so the tertiary ion leads and methyl trails.",
      },
      {
        k: "wow",
        text: "The class decides the pace for the same reason the halogen does: what happens after the bond breaks. A tertiary halogenoalkane has three alkyl groups ready to prop up the positive carbon the moment the halogen departs, so that route costs the least energy — and the fastest reaction is the one whose halfway house is the most comfortable.",
      },
    ],
  },
  {
    spec: "10.8",
    statement:
      "understand the reactions of halogenoalkanes with: i aqueous alkali, including KOH(aq) to produce alcohols (where the hydroxide ion acts as a nucleophile) ii ethanolic potassium hydroxide to produce alkenes by an elimination reaction (where the hydroxide ion acts as a base) iii aqueous silver nitrate in ethanol (where water acts as a nucleophile) iv alcoholic ammonia under pressure to produce amines (where the ammonia acts as a nucleophile) v alcoholic potassium cyanide to produce nitriles (where the cyanide ion acts as a nucleophile). Students should know this is an example of increasing the length of the carbon chain.",
    title: "Reactions of halogenoalkanes",
    blocks: [
      { k: "h", text: "Heating under reflux" },
      {
        k: "bullets",
        items: [
          "Many organic reactions are very slow and the reagents used are volatile. For such reactions a process known as ==heating under reflux== is used.",
          "This technique involves boiling the reaction mixture and condensing the vapour produced back into the flask continuously, so that the heating process can be carried out for a longer period of time.",
        ],
      },
      {
        k: "figure",
        kind: "hx-reflux",
        caption:
          "The class note's reflux rig, redrawn: the mixture boils, vapour climbs into the cold condenser jacket and drips back to the flask — water enters low and leaves high, so the jacket always fills. Nothing escapes, so the heating can run for hours.",
      },
      { k: "h", text: "Reaction with aqueous alkali" },
      {
        k: "bullets",
        items: [
          "Reagent: Aqueous Sodium hydroxide/ Aqueous potassium hydroxide",
          "Condition: Heat under reflux in aqueous solution",
          "Type of reaction: ==Nucleophilic Substitution==",
          "Products: Alcohol",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~Br + :OH^−^(aq) → CH~3~CH~2~OH + :Br^−^(aq)",
        note: "Ionic equation with bromoethane",
      },
      {
        k: "eq",
        eq: "CH~3~CH(Cl)CH~3~ + :OH^−^(aq) → CH~3~CH(OH)CH~3~ + :Cl^−^(aq)",
        note: "Ionic equation with 2-chloropropane",
      },
      { k: "h", text: "Reaction with alcoholic potassium hydroxide" },
      {
        k: "bullets",
        items: [
          "Reagent: Concentrated potassium hydroxide",
          "Condition: Heat under reflux in alcoholic solution (ethanolic solution)",
          "Type of reaction: ==Elimination==",
          "Products: Alkene",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~Br + OH^−^ → CH~2~=CH~2~ + Br^−^ + H~2~O",
        note: "Ionic equation with bromoethane",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH~2~Cl + OH^−^ → CH~3~CH=CH~2~ + H~2~O + Cl^−^",
        note: "Ionic equation with 1-chloropropane",
      },
      {
        k: "p",
        text: "For unsymmetrical haloalkanes containing more than three C atoms, a mixture of isomeric products can be formed. Example: 2-chlorobutane",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH(Cl)CH~3~ + OH^−^ → CH~3~CH=CHCH~3~ + CH~3~CH~2~CH=CH~2~ + H~2~O + Cl^−^",
      },
      { k: "h", text: "Reaction with alcoholic ammonia" },
      {
        k: "bullets",
        items: [
          "Reagent: Concentrated ammonia",
          "Condition: Heat under high pressure in a sealed tube",
          "Type of reaction: Nucleophilic Substitution",
          "Products: Amino alkanes",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH~2~Cl + 2NH~3~ → CH~3~CH~2~CH~2~NH~2~ + NH~4~Cl",
        note: "Equation with 1-chloropropane — propylamine",
      },
      {
        k: "p",
        text: "Amino propane can further react with 1-chloropropane.",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH~2~NH~2~ + CH~3~CH~2~CH~2~Cl → (CH~3~CH~2~CH~2~)~2~NH + HCl",
        note: "Dipropylamine",
      },
      {
        k: "eq",
        eq: "(CH~3~CH~2~CH~2~)~2~NH + CH~3~CH~2~CH~2~Cl → (CH~3~CH~2~CH~2~)~3~N + HCl",
        note: "Tripropylamine",
      },
      {
        k: "note",
        label: "Why a sealed tube",
        text: "This reaction should be done in a sealed tube because ammonia does not condense in heat under reflux apparatus. So, ammonia escapes if it is not sealed.",
      },
      { k: "h", text: "Reaction with potassium cyanide (KCN)" },
      {
        k: "bullets",
        items: [
          "Reagent: Aqueous, alcoholic potassium (or sodium) cyanide",
          "Conditions: Reflux in aqueous, alcoholic solution",
          "Product: Nitrile (cyanide)",
          "Nucleophile: cyanide ion (CN^−^)",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~5~Br + KCN (aq/alc) → C~2~H~5~CN + KBr(aq)",
      },
      {
        k: "p",
        text: "Students should know this is an example of ==increasing the length of the carbon chain==.",
      },
      {
        k: "figure",
        kind: "hx-scheme",
        caption:
          "The crossroads, redrawn from the class note's reaction map: one halogenoalkane, four exits. The reagent and the solvent choose — aqueous hydroxide substitutes, ethanolic hydroxide eliminates, ammonia and cyanide bring their own nucleophiles.",
      },
      {
        k: "note",
        label: "The fifth reagent",
        text: "Reaction iii — aqueous silver nitrate in ethanol, where water itself acts as the nucleophile — is the hydrolysis experiment, built in full under spec 10.10 below.",
      },
      {
        k: "wow",
        text: "Same molecule, three destinations, one decision. The halogenoalkane never changes its mind — the solvent does. Dissolve the hydroxide in water and it arrives as a lone-pair donor; dissolve it in ethanol and it arrives as a proton remover. Everything else on this page is that one choice wearing different reagents: ammonia and cyanide simply bring nucleophiles of their own.",
      },
    ],
  },
  {
    spec: "10.10",
    statement:
      "understand that experimental observations and data can be used to compare the relative rates of hydrolysis of: i primary, secondary and tertiary structural isomers of a halogenoalkane ii primary chloro-, bromo- and iodoalkanes using aqueous silver nitrate in ethanol",
    title: "Comparing the rates of hydrolysis",
    blocks: [
      {
        k: "def",
        term: "Hydrolysis",
        text: "Hydrolysis reaction is a reaction in which water or hydroxide ions ==replace an atom in a molecule with an -OH group==.",
      },
      {
        k: "eq",
        eq: "RX + H~2~O → ROH + HX",
        note: "R- represents an alkyl group and X is a halogen",
      },
      { k: "eq", eq: "RX + H~2~O → ROH + H^+^ + X^−^", note: "or" },
      {
        k: "eq",
        eq: "CH~3~CH~2~Cl + H~2~O → CH~3~CH~2~OH + H^+^ + Cl^−^",
        note: "Example",
      },
      { k: "h", text: "Reaction with water containing silver nitrate solution" },
      {
        k: "p",
        text: "Experiment: To study the effect of different halogen atoms on the rate of hydrolysis",
      },
      {
        k: "steps",
        caption: "Method",
        items: [
          {
            title: "Set up",
            text: "To three test tubes, add aqueous silver nitrate (1 cm^3^) and ethanol (2 cm^3^) and place in a water bath at 60 °C. (Ethanol is added as a solvent to dissolve the halogenoalkane as it is insoluble in water.)",
          },
          {
            title: "Add the halogenoalkanes",
            text: "After five minutes, add 2 drops of chlorobutane to first tube, add 2 drops of bromobutane to the second tube and add 2 drops of Iodobutane to third tube.",
          },
          {
            title: "Watch",
            text: "Each test tube is shaken, loosely corked and observed at 60 °C for ten minutes.",
          },
        ],
      },
      {
        k: "bullets",
        items: [
          "The halogen reacts with the water to form an alcohol and a solution that contains the halide ion.",
          "This halide ion then reacts with silver ions from the silver nitrate to form a precipitate of silver halide;",
        ],
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~X(aq) + H~2~O(l) → CH~3~CH~2~OH(aq) + H^+^(aq) + X^−^(aq)",
      },
      { k: "eq", eq: "X^−^(aq) + Ag^+^(aq) → AgX(s)" },
      {
        k: "bullets",
        items: [
          "Reagent: Water, Silver nitrate solution",
          "Condition: Room temperature and pressure",
          "Type of reaction: ==Hydrolysis==",
          "Products: Alcohol",
          "Observation: White ppt (AgCl) – chloroalkane · Cream ppt (AgBr) – bromoalkane · Yellow ppt (AgI) – iodoalkane",
        ],
      },
      {
        k: "figure",
        kind: "hx-hydrolysis",
        caption:
          "The class note's experiment, redrawn: three tubes warm in the 60 °C water bath, each holding silver nitrate and ethanol plus two drops of a different butan-1-yl halide. The colour of the precipitate names the halogen; how fast it appears times the reaction.",
      },
      { k: "h", text: "Rates of hydrolysis for different halogenoalkanes" },
      {
        k: "bullets",
        items: [
          "Rate of hydrolysis can be compared by noting the ==time taken for the precipitate to appear==;",
          "Primary halogenoalkanes hardly react with water.",
          "Secondary halogenoalkane reacts slowly to form a secondary alcohol and ppt is soon observed.",
          "Tertiary halogenoakanes react rapidly to produce a tertiary alcohol. A precipitate is seen as soon as silver nitrate is added.",
          "This can be used ==as a test to identify the halogen== in the halogenoalkane.",
        ],
      },
      {
        k: "p",
        text: "The following table shows the trend in reactivity when the halogen is different.",
      },
      {
        k: "table",
        head: ["Same structure but different halogen", "Result"],
        rows: [
          ["1-iodobutane", "fastest"],
          ["1-bromobutane", "in between"],
          ["1-chlorobutane", "slowest"],
        ],
      },
      {
        k: "p",
        text: "The rate of these substitution reactions depends on the strength of the C-X bond. The weaker the bond, the easier it is to break and the faster the reaction. Table below shows the mean bond enthalpies of C-X bonds.",
      },
      {
        k: "table",
        head: ["Bond", "Bond enthalpy/kJ mol^−1^"],
        rows: [
          ["C—F", "+467"],
          ["C—Cl", "+346"],
          ["C—Br", "+290"],
          ["C—I", "+228"],
        ],
      },
      {
        k: "note",
        label: "Read the ladder",
        text: "Strong bond requires more energy to break the bond — weaker bond requires less energy to break the bond.",
      },
      {
        k: "wow",
        text: "The experiment smuggles the rate into plain sight: the halide ion is caught the moment it appears as a coloured silver halide, so the clock is really timing the C–X bond snapping. Iodine, lowest of the four bond enthalpies, pays out its precipitate first; fluorine's +467 kJ mol^−1^ grip is why fluoroalkanes are hardly worth watching.",
      },
    ],
  },
  {
    spec: "10.9",
    statement:
      "understand the mechanisms of the nucleophilic substitution reactions between primary halogenoalkanes and: i aqueous potassium hydroxide ii ammonia",
    title: "Nucleophilic substitution mechanisms",
    blocks: [
      {
        k: "bullets",
        items: [
          "In these reactions the attacking species is a ==nucleophile== such as OH^−^ ions and ammonia molecules.",
        ],
      },
      {
        k: "h",
        text: "1. Nucleophilic substitution reaction between bromoethane and aqueous potassium hydroxide ions",
      },
      {
        k: "figure",
        kind: "hx-sn2-oh",
        caption:
          "The class note's first mechanism, redrawn: the hydroxide's lone pair curls into the δ+ carbon while the C–Br pair curls out onto bromine — both arrows fire in the same instant, and bromide leaves carrying both electrons.",
      },
      {
        k: "bullets",
        items: [
          "Reaction starts by donating a ==lone pair of electrons== from the oxygen of the hydroxide to the electron deficient carbon atom.",
          "A C-O bond is formed and at the same time the electrons in C-Br move to Br atom and the C-Br bond breaks.",
          "This type of bond breaking, where both electrons of the shared pair of electrons in a covalent bond are kept by one atom is called ==heterolytic fission==.",
        ],
      },
      {
        k: "h",
        text: "2. Nucleophilic substitution reaction between bromopropane and ammonia",
      },
      {
        k: "note",
        label: "Read the heading carefully",
        text: "The class note's heading repeats the hydroxide wording, but the mechanism it draws is ammonia — the attacking lone pair sits on nitrogen and the second product is NH~4~Br.",
      },
      {
        k: "figure",
        kind: "hx-sn2-nh3",
        caption:
          "The two-step ammonia mechanism, redrawn: ammonia attacks and is left carrying the positive charge, then a second ammonia molecule strips off a proton — out come the amine and ammonium bromide.",
      },
      {
        k: "bullets",
        items: [
          "First step - Reaction starts by donating a lone pair of electrons from nitrogen of the ammonia molecule to the electron deficient carbon atom.",
          "A C-N bond is formed and at the same time the electrons in C-Br move to Br atom and the C-Br bond breaks.",
          "Second step – Another ammonia molecule ==acting as a base==, removes a hydrogen from the ion formed.",
        ],
      },
      {
        k: "note",
        label: "From the specification note",
        text: "SN1 and SN2 substitution mechanisms will be tested in Unit 4.",
      },
      {
        k: "wow",
        text: "Two nucleophiles, one difference. Hydroxide is an anion, so the moment it bonds the story is over — one step and out. Ammonia is a neutral molecule, so after donating its lone pair it stands positive, and the reaction owes a refund: a second ammonia must collect the spare proton before the amine can walk free. That is why the equation needs 2NH~3~.",
      },
    ],
  },
];
