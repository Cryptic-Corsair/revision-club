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
          "When an alkene is added to bromine, it becomes ==colourless==.",
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
        note: "The purple solution turns ==colourless== instead if the potassium manganate(VII) is dissolved in ==acid==.",
      },
      {
        k: "wow",
        text: "One shake, three colour stories: ==orange-brown → colourless== (bromine water), ==red-brown → colourless== (bromine in hexane), ==purple → green== in alkali or ==colourless== in acid (manganate). Any one of them is a positive test for unsaturation — but write the ==starting colour and the finishing colour==, not “it went clear”.",
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
        k: "steps",
        caption: "HBr approaches the π cloud — two stages",
        items: [
          { title: "Stage 1 · the attack", icon: "spark", text: "As the HBr approaches the alkene, the C=C bond breaks and the pair of electrons bonds with the ==δ^+^ hydrogen== (the **electrophile**) of HBr. A ==carbocation== is formed. At the same time, the H—Br bond breaks to form a bromide ion — ==heterolytic fission==." },
          { title: "Stage 2 · the capture", icon: "spark", text: "The bromide ion behaves as a **nucleophile** and attacks the carbocation, forming the product. Overall, hydrogen bromide is added ==across the double bond==." },
        ],
      },
      {
        k: "note",
        label: "The curly arrow rules",
        text: "The curly arrows used in this type of reaction must either ==start from a bond and move to an atom==, or ==start from a lone pair of electrons and move to an atom==.",
      },
      { k: "h", text: "Example 2 · addition of Br~2~ to ethene" },
      {
        k: "p",
        text: "Bromine is ==non-polar== but it can still act as an electrophile. This is because, as the bromine molecule approaches the alkene, the ==electrons in the π bond repel the electron pair in the bromine–bromine bond==, thus ==inducing a dipole== — the near end turns δ^+^ and invites the attack.",
      },
      { k: "h", text: "Example 3 · addition of HBr to propene" },
      {
        k: "bullets",
        items: [
          "Addition of HBr to ==unsymmetrical== alkenes results in the formation of ==two isomeric products==.",
          "The ==major product== is the one formed via the ==more stable carbocation==.",
        ],
      },
      {
        k: "figure",
        kind: "elecadd",
        caption: "All three stories side by side: the π pair reaches for the δ^+^ H and the H—Br pair leaves with bromine; Br~2~ arrives non-polar and leaves polarised; propene's two possible carbocations decide the major product.",
      },
      { k: "h", text: "Stability of carbocations" },
      {
        k: "p",
        text: "The intermediate species formed in this reaction is called a ==carbocation==. Carbocations can be **primary, secondary or tertiary**, depending on the ==number of carbon atoms directly bonded to the positively charged carbon atom==.",
      },
      {
        k: "figure",
        kind: "carbocation",
        caption: "One, two, three alkyl neighbours — primary, secondary, tertiary. Stability increases as the alkyl groups pile on.",
      },
      {
        k: "bullets",
        items: [
          "The stability is ==increased by the presence of alkyl groups== — these groups are **electron releasing** relative to hydrogen atoms, and help to ==stabilize the positive charge== on the carbocation.",
          "As the number of alkyl groups increases, the stability of the carbocation increases too: ==primary carbocations are the least stable== and ==tertiary carbocations are the most stable==.",
        ],
      },
      {
        k: "wow",
        text: "That ladder is the evidence for example 3: adding HBr to propene puts the positive charge on either the end carbon (==primary==) or the middle carbon (==secondary==). Secondary wins, so the major product is ==2-bromopropane== — the hydrogen goes to the carbon that already had more hydrogens.",
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
        text: "During polymerization, an alkene ==undergoes addition reaction with itself==: many ==monomers== are joined together to form a ==polymer==. Long ==hydrocarbon chains== are formed when alkenes are polymerized.",
      },
      {
        k: "bullets",
        items: [
          "Many polymers are prepared by a ==free-radical process== involving ==high pressure, high temperature and a catalyst==.",
          "The catalyst is usually a substance which readily breaks up to form ==radicals which initiate a chain reaction==.",
        ],
      },
      { k: "h", text: "Example · formation of polyethene from ethene" },
      {
        k: "eq",
        eq: "n CH~2~=CH~2~ → (—CH~2~—CH~2~—)~n~",
        note: "The C=C opens up, the carbons join in a line, and the ==repeat unit== is drawn inside brackets with the ==continuation bonds== poking through.",
      },
      {
        k: "figure",
        kind: "polymer",
        caption: "Monomer in, repeat unit out — ethene to polyethene, then the three exercise polymers built the same way: open the double bond, hang the substituents off the chain, carry the bonds through the brackets.",
      },
      {
        k: "worked",
        title: "Worked example · monomers and repeat units (Exercise 4)",
        question:
          "Identify the monomer units and give the repeat unit of: 1. poly(propene) 2. poly(chloroethene) 3. poly(tetrafluoroethene).",
        steps: [
          "**Poly(propene)** — read the repeat unit backwards: —(CH~2~—CH(CH~3~))~n~—. Put the double bond back between the two chain carbons → the monomer is ==propene, CH~2~=CHCH~3~==.",
          "**Poly(chloroethene)** — repeat unit —(CH~2~—CHCl)~n~—; restore the C=C → the monomer is ==chloroethene, CH~2~=CHCl== (PVC).",
          "**Poly(tetrafluoroethene)** — repeat unit —(CF~2~—CF~2~)~n~—; restore the C=C → the monomer is ==tetrafluoroethene, CF~2~=CF~2~== (PTFE).",
          "Two repeating units of poly(propene), drawn out: —CH~2~—CH(CH~3~)—CH~2~—CH(CH~3~)—. The substituents always stay ==outside the chain==.",
        ],
        answer:
          "Monomer → repeat unit: ==open the C=C== into two single bonds and carry the continuation bonds through the brackets. Repeat unit → monomer: ==put the double bond back== between the two carbons of the chain. Same two carbons, same substituents — only the bond order changes.",
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
        text: "Polymers derived from alkenes are ==very useful to modern society==. However, the ==disposal== of these polymers creates widespread problems.",
      },
      {
        k: "bullets",
        items: [
          "They are ==non-biodegradable==.",
          "If they are just discarded, they add to the ==landfill problem==.",
          "Incineration (burning of polymers) saves on landfill sites — however, if they are burned, ==toxic fumes like HCl== are formed from ==chlorinated polymers==.",
          "They can be recycled — however, it is ==very expensive== and it is ==difficult to separate all the different polymers==.",
        ],
      },
      { k: "h", text: "Incineration" },
      {
        k: "bullets",
        items: [
          "An incinerator takes in polymer waste and converts it into ==heat energy==, which can be used in factories or used to ==generate electricity==.",
          "It produces ==less solid waste==. However, ==toxic gases are formed and released to the atmosphere==.",
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
        text: "The specification's two answers are two escape routes from the same corner: make the polymer ==edible== (biodegradable — microbes finish it) or make the burning ==clean== (trap and remove the toxic waste gases instead of releasing them).",
      },
    ],
  },
];
