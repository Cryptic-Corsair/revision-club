import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 5 revision note · sections 5.5 – 5.8 (Part 5B)
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 5
   class note (2020, semester 1) — Alkenes; page furniture and
   image-only drills omitted. The exercises that are specified in
   words are worked in full.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T05_B: SpecSection[] = [
  {
    spec: "5.5",
    statement: "know the qualitative test for a C=C double bond using bromine or bromine water",
    title: "Testing for the double bond",
    blocks: [
      { k: "h", text: "1 · Reaction with bromine water" },
      {
        k: "bullets",
        items: [
          "Bromine water is ==reddish brown== in colour.",
          "When an alkene is added to bromine water, it becomes ==colourless== — in other words, alkenes ==decolorize bromine water==.",
          "The double bond in the alkene is broken and **Br & OH** are added across the double bond.",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~4~ + Br~2~ + H~2~O → CH~2~BrCH~2~OH + HBr",
      },
      { k: "h", text: "2 · Reaction with bromine in hexane" },
      {
        k: "bullets",
        items: [
          "Bromine in hexane is ==reddish brown== in colour.",
          "When an alkene is added to bromine, it becomes colourless.",
          "The double bond in the alkene is broken and the ==two Br atoms== are added across the double bond.",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~4~ + Br~2~ → CH~2~BrCH~2~Br",
      },
      { k: "h", text: "3 · Reaction with potassium manganate(VII)" },
      {
        k: "bullets",
        items: [
          "Potassium manganate(VII) is a ==purple== solution.",
          "When an alkene is added, the purple solution turns ==green== — if the potassium manganate(VII) is dissolved in ==alkali==.",
        ],
      },
      {
        k: "eq",
        eq: "C~2~H~4~ + H~2~O + [O] → CH~2~OHCH~2~OH",
        note: "The purple solution turns colourless instead if the potassium manganate(VII) is dissolved in ==acid==.",
      },
      {
        k: "wow",
        text: "Three colour changes to know: ==reddish brown → colourless== (bromine water), ==reddish brown → colourless== (bromine in hexane), ==purple → green== in alkali or colourless in acid (potassium manganate(VII)). Any one of them is a positive test for the C=C double bond — always quote the starting colour and the finishing colour.",
      },
    ],
  },
  {
    spec: "5.6",
    statement:
      "be able to describe the mechanism (including diagrams), giving evidence where possible, of: i the electrophilic addition of bromine and hydrogen bromide to ethene ii the electrophilic addition of hydrogen bromide to propene. Use of the curly arrow notation is expected – the curly arrows should start from either a bond or from a lone pair of electrons. Knowledge of the relative stability of primary, secondary and tertiary carbocation intermediates is expected.",
    title: "Electrophilic addition — the mechanisms",
    blocks: [
      { k: "h", text: "Example 1 · addition of HBr to ethene" },
      {
        k: "bullets",
        items: [
          "As the HBr approaches the alkene, the ==C=C bond breaks== and the pair of electrons bonds with the ==δ^+^ hydrogen== (the **electrophile**) of HBr.",
          "A ==carbocation== is formed.",
          "At the same time, the H—Br bond breaks to form a bromide ion — ==heterolytic fission==.",
          "The bromide ion behaves as a **nucleophile** and attacks the carbocation, forming the product.",
          "Overall, hydrogen bromide is added ==across the double bond==.",
        ],
      },
      {
        k: "note",
        label: "The curly arrow rules",
        text: "The curly arrows used in this type of reaction must either start from a bond and move to an atom, or start from a lone pair of electrons and move to an atom.",
      },
      { k: "h", text: "Example 2 · addition of Br~2~ to ethene" },
      {
        k: "p",
        text: "Bromine is ==non-polar== but it can act as an **electrophile**. This is because, as the bromine molecule approaches the alkene, the electrons in the π bond of the alkene repel the electron pair in the bromine–bromine bond, thus ==inducing a dipole==.",
      },
      { k: "h", text: "Example 3 · addition of HBr to propene" },
      {
        k: "bullets",
        items: [
          "Addition of HBr to ==unsymmetrical== alkenes results in formation of ==two isomeric products==.",
          "Major product is formed via the ==more stable carbocation==.",
        ],
      },
      {
        k: "figure",
        kind: "elecadd",
        caption: "The three mechanisms side by side: addition of HBr to ethene (heterolytic fission of the H—Br bond, then the bromide ion attacks the carbocation), addition of Br~2~ to ethene (the π bond induces a dipole in the non-polar bromine) and addition of HBr to propene (the major product forms via the more stable carbocation).",
      },
      { k: "h", text: "Stability of carbocations" },
      {
        k: "p",
        text: "The intermediate species formed in this reaction is called a ==carbocation==. Carbocations can be **primary, secondary or tertiary**, depending on the number of carbon atoms directly bonded to the positively charged carbon atom.",
      },
      {
        k: "figure",
        kind: "carbocation",
        caption: "Primary, secondary and tertiary carbocations — one, two and three alkyl groups directly bonded to the positively charged carbon atom. As the number of alkyl groups increases, the stability of the carbocation increases.",
      },
      {
        k: "bullets",
        items: [
          "The stability is increased by the presence of alkyl groups — these groups are **electron releasing** relative to hydrogen atoms, and help to ==stabilize the positive charge== on the carbocation.",
          "As the number of alkyl groups increases, the stability of the carbocation increases too: primary carbocations are the least stable and tertiary carbocations are the most stable.",
        ],
      },
      {
        k: "wow",
        text: "This is the evidence for example 3: adding HBr to propene can give a carbocation with the positive charge on the end carbon (==primary==) or on the middle carbon (==secondary==). The ==secondary carbocation== is the more stable one, so the major product is ==2-bromopropane==.",
      },
    ],
  },
  {
    spec: "5.7",
    statement:
      "be able to describe the addition polymerisation of alkenes and draw the repeat unit given the monomer, and vice versa",
    title: "Addition polymerisation",
    blocks: [
      {
        k: "p",
        text: "During polymerization, an alkene undergoes addition reaction with itself: many ==monomers== are joined together to form a ==polymer==. Long ==hydrocarbon chains== are formed when alkenes are polymerized.",
      },
      {
        k: "bullets",
        items: [
          "Many polymers are prepared by a ==free-radical process== involving high pressure, high temperature and a catalyst.",
          "The catalyst is usually a substance which readily breaks up to form radicals which initiate a chain reaction.",
        ],
      },
      { k: "h", text: "Example · formation of polyethene from ethene" },
      {
        k: "eq",
        eq: "n CH~2~=CH~2~ → (—CH~2~—CH~2~—)~n~",
        note: "The ==C=C bond opens up== and the ==repeat unit== is drawn inside brackets with the ==continuation bonds== extending through them.",
      },
      {
        k: "figure",
        kind: "polymer",
        caption: "Formation of polyethene from ethene, then the three Exercise 4 polymers: the double bond opens up, the substituents stay outside the chain, and the continuation bonds extend through the brackets.",
      },
      {
        k: "worked",
        title: "Worked example · monomers and repeat units (Exercise 4)",
        question:
          "Identify the monomer units and give the repeat unit of: 1. poly(propene) 2. poly(chloroethene) 3. poly(tetrafluoroethene).",
        steps: [
          "**Poly(propene)** — repeat unit —(CH~2~—CH(CH~3~))~n~—; restore the C=C → the monomer is ==propene, CH~2~=CHCH~3~==.",
          "**Poly(chloroethene)** — repeat unit —(CH~2~—CHCl)~n~—; restore the C=C → the monomer is ==chloroethene, CH~2~=CHCl== (PVC).",
          "**Poly(tetrafluoroethene)** — repeat unit —(CF~2~—CF~2~)~n~—; restore the C=C → the monomer is ==tetrafluoroethene, CF~2~=CF~2~== (PTFE).",
          "Two repeating units of poly(propene), drawn out: —CH~2~—CH(CH~3~)—CH~2~—CH(CH~3~)—. The substituents always stay ==outside the chain==.",
        ],
        answer:
          "Monomer → repeat unit: ==open the C=C== into two single bonds and carry the ==continuation bonds== through the brackets. Repeat unit → monomer: ==restore the C=C== between the two carbons of the chain.",
      },
      { k: "checkpoint", page: 15 },
    ],
  },
  {
    spec: "5.8",
    statement:
      "understand how chemists limit the problems caused by polymer disposal by: i developing biodegradable polymers ii removing toxic waste gases produced by the incineration of polymers",
    title: "Polymer disposal",
    blocks: [
      {
        k: "p",
        text: "Polymers derived from alkenes are very useful to modern society. However, the ==disposal== of these polymers creates widespread problems.",
      },
      {
        k: "bullets",
        items: [
          "They are ==non-biodegradable==.",
          "If they are just discarded, they add to the ==landfill problem==.",
          "Incineration (burning of polymers) saves on landfill sites — however, if they are burned, ==toxic fumes like HCl== are formed from ==chlorinated polymers==.",
          "They can be recycled — however, it is ==very expensive== and it is difficult to separate all the different polymers.",
        ],
      },
      { k: "h", text: "Incineration" },
      {
        k: "bullets",
        items: [
          "An incinerator takes in polymer waste and converts it into ==heat energy==, which can be used in factories or used to ==generate electricity==.",
          "It produces ==less solid waste==. However, toxic gases are formed and released to the atmosphere.",
          "Over the years, chemists have made progress in finding better ways to ==remove the toxic gases==.",
        ],
      },
      { k: "h", text: "Biodegradable polymers" },
      {
        k: "bullets",
        items: [
          "They can be ==broken down by microbes== in the environment.",
          "They are usually made from ==plant material== — hence ==more land is needed== to grow the plants.",
        ],
      },
      {
        k: "wow",
        text: "The specification's two ways to limit the problems of polymer disposal: ==developing biodegradable polymers==, which can be ==broken down by microbes== in the environment, and removing the toxic waste gases produced by the incineration of polymers.",
      },
    ],
  },
];
