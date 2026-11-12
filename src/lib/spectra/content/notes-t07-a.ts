import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 7 revision note · sections 7.1, 7.2, 7.4 (Part 7A)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 7
   class note (2021, semester 2) — Intermolecular forces; page
   furniture and image-only drills omitted. The exercises that are
   specified in words are worked in full.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only — the marker is for the words that name the
   idea, not for whole clauses.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T07_A: SpecSection[] = [
  {
    spec: "7.1",
    statement:
      "understand the nature of the following intermolecular forces: i London forces (instantaneous dipole-induced dipole) ii permanent dipole-permanent dipole interactions iii hydrogen bonds",
    title: "The three intermolecular forces",
    blocks: [
      { k: "h", text: "Background to non-bonded intermolecular interactions" },
      {
        k: "p",
        text: "A number of interactions between molecules are considerably weaker than typical covalent and polar covalent bonds. These interactions are usually described as:",
      },
      {
        k: "bullets",
        items: [
          "'Non-bonded interactions', or",
          "'intermolecular' — because they occur **between** molecules.",
        ],
      },
      { k: "h", text: "Types of intermolecular forces" },
      {
        k: "bullets",
        items: [
          "Instantaneous dipole – induced dipole interactions (London forces / temporary dipole – dipole interactions / dispersion forces)",
          "Permanent dipole – dipole interactions",
          "Hydrogen bonding",
        ],
      },
      { k: "h", text: "London forces" },
      {
        k: "def",
        term: "London forces",
        text: "London forces occur between all molecular substances and noble gases. They do not occur in ionic substances.",
      },
      {
        k: "bullets",
        items: [
          "London forces are also called instantaneous, induced dipole-dipole interactions. They occur between all simple covalent molecules and the separate atoms in noble gases.",
          "In any molecule the electrons are moving constantly and randomly. As this happens the electron density can fluctuate and parts of the molecule become more or less negative i.e. small ==temporary or transient dipoles== form.",
          "These temporary dipoles can cause dipoles to form in neighbouring molecules. These are called ==induced dipoles==. The induced dipole is always the opposite sign to the original one.",
          "The two dipoles between molecules are arranged so that they will interact favourably with one another. This favourable interaction is responsible for London force of attraction between two molecules.",
        ],
      },
      {
        k: "figure",
        kind: "london",
        caption:
          "Many molecules held together by instantaneous dipole – induced dipole interactions: the flickering dipole in one molecule induces the opposite dipole in its neighbour.",
      },
      { k: "h", text: "Features of London force" },
      { k: "h", text: "1. Size of the electron cloud" },
      {
        k: "bullets",
        items: [
          "The more electrons there are in a molecule, the greater the fluctuations in electron density and the larger the instantaneous and induced dipoles created.",
          "This makes the London forces stronger between the molecules and more energy is needed to break them so boiling points will be greater.",
          "This can be demonstrated by observing the boiling temperatures of the noble gases.",
        ],
      },
      {
        k: "table",
        caption: "Boiling temperatures of the noble gases",
        head: ["Gas", "Helium", "Neon", "Argon", "Krypton", "Xenon", "Radon"],
        rows: [
          ["Boiling temperature / K", "4.3", "27.1", "87.4", "121", "165", "211"],
        ],
      },
      {
        k: "bullets",
        items: [
          "The noble gases are monoatomic (consists of single atoms). London force is the only force of attraction between the molecules.",
          "The increasing boiling points of the noble gases down the group 8 series can be explained by the increasing number of electrons in the bigger atoms causing an increase in the size of the London forces between the atoms.",
          "The stronger the force of attraction, the more energy is required to separate the molecules and hence boiling temperature increases.",
        ],
      },
      {
        k: "note",
        label: "The rule of the electron cloud",
        text: "As the size of the electron cloud increases the strength of London forces increases.",
      },
      { k: "h", text: "2. Area or point of contact between the molecules" },
      {
        k: "p",
        text: "Shape of the molecule can also have an effect on the size of the London forces. The more ==points of contact== there are between the molecules, the greater the overall London force.",
      },
      { k: "h", text: "Permanent dipole – dipole interactions" },
      {
        k: "bullets",
        items: [
          "Polar molecules have a permanent dipole, meaning that there is a permanent separation of charge.",
          "As a result, these molecules are attracted towards one another by ==permanent dipole – dipole interactions==, in which the negative end of one molecule is attracted to the positive end of another molecule.",
          "These interactions occur between molecules containing permanent dipoles but **cannot form hydrogen bonds**.",
          "These dipole forces are weaker than hydrogen bonding but stronger than Van der Waals forces.",
          "The problem here is that, for example, in a liquid, the random movement of the molecules is such that the dipoles are not always aligned to produce a favourable interaction.",
          "As a result, when averaged out, the interaction between permanent dipoles is usually less than the interaction between instantaneous and induced dipoles. **The London force is usually more significant interaction between molecules.**",
        ],
      },
      {
        k: "figure",
        kind: "dipoles-permanent",
        caption:
          "The aligned encounter drawn out: the δ− end of one polar molecule pulls the δ+ end of the next — but the liquid keeps tumbling, most encounters align nothing, and averaged out the pull is usually weaker than the London force.",
      },
      { k: "h", text: "Relative strengths of intermolecular forces" },
      {
        k: "bullets",
        items: [
          "Intermolecular forces are much weaker than intramolecular forces. For example, covalent bond strengths are typically between ==200 to 500 kJ mol^−1^==.",
          "In comparison, the strength of Hydrogen bonds is about ==5 to 40 kJ mol^−1^==.",
          "Permanent dipole-dipole interactions are weaker than hydrogen bonds and London forces are still weaker.",
        ],
      },
      {
        k: "eq",
        eq: "Hydrogen bonding  >  Permanent dipole-dipole interactions  >  London forces",
        note: "Intermolecular forces are not strong enough to influence chemical properties, but they can affect physical properties.",
      },
      {
        k: "wow",
        text: "Three forces, one ladder: hydrogen bonding on top, permanent dipole – dipole in the middle, London forces at the bottom — yet the humble London force is usually the most significant one in a real liquid, because dipoles that flicker in and out of existence still add up over every point of contact.",
      },
    ],
  },
  {
    spec: "7.2",
    statement:
      "understand the interactions in molecules, such as H2O, liquid NH3 and liquid HF, which give rise to hydrogen bonding",
    title: "Hydrogen bonding",
    blocks: [
      {
        k: "def",
        term: "The hydrogen bond",
        text: "It occurs in compounds that have a hydrogen atom covalently attached to one of the three most electronegative atoms of nitrogen, oxygen and fluorine only, which has a lone pair of electrons.",
      },
      {
        k: "bullets",
        items: [
          "For example: a –O–H, –N–H, F–H bond. There is a large electronegativity difference between the H and the O, N, F.",
          "Example: Hydrogen fluoride HF · Water H~2~O · Ammonia NH~3~.",
          "Bonds between hydrogen and these three elements are ==extremely polar==.",
          "Due to the big difference between electronegativity of hydrogen and the elements (F, O, N), a substantial amount of electron density is drawn away from hydrogen atom, leaving it with a δ+ charge.",
          "Hydrogen atom does not have an inner shell of electrons. As a result, the nucleus of the hydrogen atom is exposed by the shift in electron density.",
          "The ==lone pair of electrons== in F, O or N in another molecule is attracted to the positive hydrogen, leading to the formation of hydrogen bond.",
        ],
      },
      { k: "h", text: "Hydrogen bonding through oxygen" },
      {
        k: "p",
        text: "All compounds containing an – O – H group form intermolecular hydrogen bonds.",
      },
      {
        k: "p",
        text: "Example in water, the hydrogen bond forms between the oxygen atom of one water molecule and the hydrogen atom of second water molecule.",
      },
      {
        k: "p",
        text: "The interaction is not just that of an extreme dipole – dipole interaction. There is some ==partial bond formation== using a lone pair of electrons on the oxygen atom.",
      },
      {
        k: "p",
        text: "Hydrogen bonds are ==directional in nature==. The bond angle between the three atoms involved is often 180° or close to it.",
      },
      {
        k: "p",
        text: "Alcohols also form intermolecular hydrogen bonds.",
      },
      {
        k: "figure",
        kind: "hbond-water",
        caption:
          "Water can form two hydrogen bonds per molecule, because the electronegative oxygen atom has two lone pairs of electrons on it. It can therefore form stronger hydrogen bonding and needs more energy to break the bonds, leading to a higher boiling point.",
      },
      { k: "h", text: "Hydrogen bonding through nitrogen" },
      {
        k: "p",
        text: "All compounds containing – N – H group can form intermolecular hydrogen bonds. Example; Ammonia and organic compounds such as primary amines, which have the general formula RNH~2~ form hydrogen bonding.",
      },
      { k: "figure", kind: "hbond-nh3" },
      { k: "h", text: "Hydrogen bonding through fluorine" },
      {
        k: "p",
        text: "The only fluorine compound with intermolecular hydrogen bonding is hydrogen fluoride.",
      },
      {
        k: "figure",
        kind: "hbond-hf",
        caption: "Hydrogen bonding (HF)~n~ in HF solid state — a zig-zag chain.",
      },
    ],
  },
  {
    spec: "7.4",
    statement:
      "be able to predict the presence of hydrogen bonding in molecules analogous to those mentioned in 7.2",
    title: "Predicting hydrogen bonding",
    blocks: [
      {
        k: "worked",
        title: "Ethanoic acid dimerises",
        question:
          "Molecules of ethanoic acid dimerise through hydrogen bonding when dissolved in certain organic solvent. The structure and shape of ethanoic acid molecule is CH~3~COOH. Draw a diagram to show how hydrogen bonds are formed between two molecules of ethanoic acid.",
        steps: [
          "Each ethanoic acid molecule carries two oxygen atoms: the –O–H hydroxyl oxygen and the C=O carbonyl oxygen — both carry lone pairs, so both can accept a hydrogen bond.",
          "Point the O–H hydrogen of molecule 1 at the C=O oxygen of molecule 2, and mirror it: the O–H hydrogen of molecule 2 aims at the C=O oxygen of molecule 1.",
          "The two dashed O···H hydrogen bonds close a ring — the pair of molecules walks around as one ==dimer==.",
        ],
        answer:
          "Two hydrogen bonds, each running from an O–H hydrogen to the carbonyl oxygen of the other molecule — a cyclic dimer.",
      },
      {
        k: "figure",
        kind: "dimer",
        caption:
          "The ethanoic acid dimer: two hydrogen bonds close a ring between the two molecules.",
      },
      {
        k: "worked",
        title: "Ethanol 78.5 °C vs methoxymethane −24.8 °C",
        question:
          "The boiling temperature of ethanol (CH~3~CH~2~OH, 78.5 °C) is considerably higher than the boiling temperature of methoxymethane (CH~3~OCH~3~, −24.8 °C). The structures and shapes of the molecules are drawn above. In terms of intermolecular interactions involved, explain the difference in boiling temperatures.",
        steps: [
          "Both molecules are C~2~H~6~O — same electrons, so their London forces are essentially the same.",
          "Ethanol has an –O–H group: its molecules form ==hydrogen bonds== with each other, on top of the London forces.",
          "Methoxymethane has no O–H: its molecules manage only permanent dipole – dipole interactions plus London forces.",
          "Hydrogen bonds are stronger than dipole – dipole interactions, so extra energy is needed to separate ethanol molecules.",
        ],
        answer:
          "Ethanol hydrogen-bonds; methoxymethane cannot — that extra bond to break is worth over 100 °C of boiling temperature.",
      },
      {
        k: "wow",
        text: "To predict hydrogen bonding, run the two-part test on the molecule in front of you: a hydrogen attached to N, O or F — and a lone pair on the N, O or F of a neighbouring molecule. Both halves must be present. Alcohols, primary amines, carboxylic acids, water, ammonia and HF pass; anything else, however polar, stops short of a hydrogen bond.",
      },
    ],
  },
];
