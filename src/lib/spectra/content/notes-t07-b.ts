import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 7 revision note · sections 7.5, 7.3, 7.6 (Part 7B)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 7
   class note (2021, semester 2) — Intermolecular forces; page
   furniture and image-only drills omitted. Same light hand with
   the marker as Part 7A: short spans, one mark per key term.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T07_B: SpecSection[] = [
  {
    spec: "7.5",
    statement:
      "understand, in terms of intermolecular forces, physical properties shown by substances, including: i the trends in boiling temperatures of alkanes with increasing chain length ii the effect of branching in the carbon chain on the boiling temperatures of alkanes iii the relatively low volatility (higher boiling temperatures) of alcohols compared to alkanes with a similar number of electrons iv the trends in boiling temperatures of the hydrogen halides HF to HI",
    title: "Physical properties and the forces behind them",
    blocks: [
      { k: "h", text: "Boiling temperatures of alkanes and alcohols" },
      { k: "h", text: "Unbranched alkanes" },
      {
        k: "p",
        text: "The most significant intermolecular attraction between alkane molecules are London forces.",
      },
      {
        k: "p",
        text: "The boiling point of alkanes increase with increase mass because:",
      },
      {
        k: "steps",
        caption: "Why bigger means higher",
        items: [
          {
            title: "More electrons per molecule",
            text: "When molecular mass increases the number of electrons per molecule increases. Hence the instantaneous and induced dipoles also increase.",
          },
          {
            title: "More points of contact",
            text: "When the chain length increases, the number of points of contact between adjacent molecules increases. The more points of contact there are, the greater the overall London force of attraction.",
          },
        ],
      },
      {
        k: "figure",
        kind: "contact",
        caption:
          "Weaker London forces between two methane molecules as there are fewer contact points; stronger London forces between two hexane molecules as there are more contact points.",
      },
      { k: "h", text: "Branched alkanes" },
      {
        k: "bullets",
        items: [
          "Branched chain alkanes have ==lower boiling temperatures== than their unbranched isomers.",
          "Branching of the molecules lowers the melting and boiling temperature because side chains interfere with the packing together of molecules and reduce the formation of London forces, thus lowering the boiling points.",
        ],
      },
      {
        k: "table",
        caption: "Table shows the boiling temperature of pentane and its isomers",
        head: ["Name of alkane", "Structural formula", "Boiling temperature / K"],
        rows: [
          ["pentane", "CH~3~CH~2~CH~2~CH~2~CH~3~", "309"],
          ["2-methylbutane", "CH~3~CH(CH~3~)CH~2~CH~3~", "301"],
          ["2,2-dimethylpropane", "C(CH~3~)~4~", "283"],
        ],
      },
      { k: "h", text: "Alcohols" },
      {
        k: "bullets",
        items: [
          "Alcohols contain – O – H group and can therefore form intermolecular hydrogen bonds in addition to London forces.",
          "Alcohols have a higher boiling temperature (==low volatility==) than the alkanes with same number of carbons or same molecular mass. This is because in alkanes only weak London forces are present whereas alcohols can form hydrogen bonding between its molecules.",
        ],
      },
      {
        k: "table",
        caption: "Table showing boiling point of alcohol and alkane",
        head: ["Alkane", "Boiling point (°C)", "Alcohol", "Boiling point (°C)"],
        rows: [
          ["methane", "−164", "methanol", "65"],
          ["ethane", "−89", "ethanol", "79"],
          ["propane", "−42", "1-propanol", "97"],
          ["butane", "−0.5", "1-butanol", "117"],
          ["pentane", "36", "1-pentanol", "138"],
          ["hexane", "69", "1-hexanol", "156"],
        ],
      },
      {
        k: "table",
        caption: "Table showing enthalpy of vapourization of alcohol",
        head: ["Alcohol", "Enthalpy change of vapourisation / kJ mol^−1^"],
        rows: [
          ["CH~3~CH~2~OH", "38.6"],
          ["CH~3~CH~2~CH~2~OH", "47.5"],
          ["CH~3~CH~2~CH~2~CH~2~OH", "52.4"],
          ["CH~3~CH~2~CH~2~CH~2~CH~2~OH", "57.0"],
          ["CH~3~CH~2~CH~2~CH~2~CH~2~CH~2~OH", "61.6"],
        ],
      },
      {
        k: "table",
        caption: "Table showing enthalpy of vapourization of alkane",
        head: ["Alkane", "Enthalpy change of vapourisation / kJ mol^−1^"],
        rows: [
          ["CH~3~CH~2~CH~3~", "15.7"],
          ["CH~3~CH~2~CH~2~CH~3~", "21.0"],
          ["CH~3~CH~2~CH~2~CH~2~CH~3~", "26.4"],
          ["CH~3~CH~2~CH~2~CH~2~CH~2~CH~3~", "31.6"],
          ["CH~3~CH~2~CH~2~CH~2~CH~2~CH~2~CH~3~", "36.6"],
        ],
      },
      {
        k: "bullets",
        items: [
          "The enthalpy of vapourization of alcohols and alkanes shows that the predominant intermolecular force of attraction in the first few members of alcohol is hydrogen bonding. However, London forces predominate as the chain length increases.",
          "The enthalpy change of vapourization is a measure of the amount of energy that is required to completely separate the molecules of a liquid into a gas at the same temperature. The greater the enthalpy change of vapourization the greater the force of attraction between the molecules.",
          "The viscosity of alcohols also increases as the number of hydrogen bonds per molecule increases.",
        ],
      },
      {
        k: "def",
        term: "Volatility",
        text: "Volatility is a measure of how easily molecules escape from liquids. Volatile substances have a low boiling temperature.",
      },
      {
        k: "figure",
        kind: "viscosity",
        caption: "More –OH groups per molecule — more hydrogen bonds — thicker pour.",
      },
      { k: "h", text: "Noble gases" },
      {
        k: "bullets",
        items: [
          "Noble gases are monatomic.",
          "They have weak Van der Waals forces between the atoms.",
          "From helium to radon, the size of the electron cloud increases. This increases the strength of Van der Waals forces between the atoms. Therefore, the boiling temperature increases as more energy is required to overcome the forces.",
        ],
      },
      { k: "h", text: "Boiling temperatures of the hydrogen halides" },
      {
        k: "bullets",
        items: [
          "In group IV hydrides, the boiling point increases as the electron cloud of the molecule increases and relative molecular mass increases. So, the strength of the Van der Waals force increases.",
          "The ==anomalously high boiling points== of H~2~O, NH~3~ and HF are caused by the hydrogen bonding between these molecules in addition to their London forces. The additional forces require more energy to break and so have higher boiling points.",
          "After the drop to PH~3~, H~2~S and HCl, there is a steady upward trend in boiling temperatures from PH~3~ to SbH~3~, H~2~S to H~2~Te and HCl to HI.",
          "This is because despite the decrease in permanent dipole-dipole forces between the molecules there is an increase in the instantaneous dipole-induced dipole forces due to the increase in size of the atoms.",
        ],
      },
      {
        k: "figure",
        kind: "hydrides",
        caption:
          "Boiling temperatures across periods 2–5: H~2~O, NH~3~ and HF ride high on hydrogen bonding; every other hydride simply climbs with its electron cloud.",
      },
    ],
  },
  {
    spec: "7.3",
    statement:
      "understand the following anomalous properties of water resulting from hydrogen bonding: i its high melting and boiling temperature when compared with similar molecules ii the density of ice compared to that of water",
    title: "The anomalous properties of water",
    blocks: [
      { k: "p", text: "Water has some anomalous properties." },
      {
        k: "steps",
        caption: "The two anomalies",
        items: [
          {
            title: "Hot for its size",
            text: "It has a relatively high melting and boiling temperature for a molecule with so few electrons.",
          },
          {
            title: "Ice that floats",
            text: "The density of ice at 0 °C is less than that of water at 0 °C.",
          },
        ],
      },
      { k: "h", text: "Melting and boiling temperatures" },
      {
        k: "bullets",
        items: [
          "The hydrogen bonds between water molecules are ==relatively strong==.",
          "Water therefore, has a abnormally higher melting temperature (0 °C, 273 K) and boiling temperature (100 °C, 373 K) at 100 kPa pressure.",
        ],
      },
      {
        k: "table",
        caption:
          "Table showing strength of hydrogen bonding in water, ammonia and hydrogen fluoride",
        head: [
          "",
          "Boiling temperature",
          "Number of electrons per molecule",
          "Strength of hydrogen bonding / kJ mol^−1^",
        ],
        rows: [
          ["H~2~O", "373 K (100 °C)", "10", "22"],
          ["NH~3~", "240 K (−33 °C)", "10", "17"],
          ["HF", "293 K (20 °C)", "10", "29"],
        ],
      },
      {
        k: "p",
        text: "Ammonia has the lowest boiling temperature of the three compounds.",
      },
      {
        k: "bullets",
        items: [
          "The amount of hydrogen bonding in ammonia is limited as each nitrogen atom has only one lone pair of electrons. This means on average an ammonia molecule can form one hydrogen bond using the lone pair on nitrogen and form one hydrogen bond involving one of its δ+ hydrogen atoms.",
        ],
      },
      {
        k: "worked",
        title: "Stronger bonds, lower boiling point — why HF loses to water",
        question:
          "Hydrogen bond strength for HF is greater than hydrogen bond strength for H~2~O, but its boiling temperature is lower. Why?",
        steps: [
          "HF forms two hydrogen bonds per molecule whereas water can form up to four hydrogen bonds per molecule. So hydrogen bonding in water is much more extensive.",
          "Not all the hydrogen bonds in HF are broken on vapourization, since HF is substantially polymerized even in gas phase.",
        ],
        answer:
          "It is the number of hydrogen bonds you must break that sets the boiling temperature — water's four beat HF's two stronger ones.",
      },
      { k: "h", text: "Density of ice" },
      {
        k: "p",
        text: "The molecules in ice are arranged in ==rings of six==, held together by hydrogen bonds as shown in the figure below.",
      },
      {
        k: "figure",
        kind: "ice",
        caption: "Figure showing hydrogen bonding in ice and liquid water.",
      },
      {
        k: "bullets",
        items: [
          "In ice there are large area of open space inside the rings. When ice melts the ring structure is destroyed and the average distance between molecules decreases, causing an increase in density.",
        ],
      },
      {
        k: "wow",
        text: "Same molecules, same hydrogen bonds — only the arrangement changes. Ice holds its rings of six wide open, so it floats on the denser liquid it melts into; ponds freeze from the top down and life below carries on.",
      },
    ],
  },
  {
    spec: "7.6",
    statement:
      "understand factors that influence the choice of solvents, including: i water, to dissolve some ionic compounds, in terms of the hydration of the ions ii water, to dissolve simple alcohols, in terms of hydrogen bonding iii water, as a poor solvent for compounds (to include polar molecules such as halogenoalkane), in terms of inability to form hydrogen bonds iv non-aqueous solvents, for compounds that have similar intermolecular forces to those in the solvent",
    title: "Choosing suitable solvents",
    blocks: [
      { k: "h", text: "Choosing suitable solvents" },
      {
        k: "p",
        text: "For a substance to dissolve;",
      },
      {
        k: "steps",
        caption: "Two conditions",
        items: [
          {
            title: "Separate, then surround",
            text: "The solute particles must be separated from each other and then become surrounded by solvent particle.",
          },
          {
            title: "Beat the existing attractions",
            text: "The force of attraction between solute and solvent particles must be strong enough to overcome the solvent – solvent forces and solute – solute forces.",
          },
        ],
      },
      { k: "h", text: "Solubility — dissolving ionic solids" },
      {
        k: "def",
        term: "Ionic compounds",
        text: "Positive and negative ions are held in lattice structure by strong electrostatic force of attraction. Energy is required to breakdown the lattice. This is called ==Lattice energy==.",
      },
      {
        k: "bullets",
        items: [
          "Water molecules are polar, so hydrogen atoms have δ+ charge and oxygen atoms have δ− charge.",
          "Attractive forces between these molecules and ions in the lattice break up the lattice to form individual ions. These ions spread throughout the water.",
          "Water molecules arrange themselves so that positive ions are close to negative oxygen and negative ions are close to positive hydrogens.",
          "This process is known as ==hydration== and energy released during this is known as ==hydration enthalpy==.",
          "If hydration enthalpy is more than or equal to lattice enthalpy, the compound will dissolve in water. If the hydration enthalpy is less than lattice enthalpy, the compound will not dissolve in water as the energy is insufficient to break up the lattice.",
        ],
      },
      {
        k: "figure",
        kind: "hydration",
        caption: "Figure showing the process of dissolving sodium chloride.",
      },
      { k: "h", text: "Compounds that can form hydrogen bonds with water" },
      {
        k: "def",
        term: "Alcohols",
        text: "Alcohols with relatively short carbon chains dissolve in water. This is because alcohols can form hydrogen bonds with water which is stronger than the London forces between the carbon chains of alcohols.",
      },
      {
        k: "bullets",
        items: [
          "The solubility in water gradually decreases with increasing carbon chain length.",
          "This is because the non-polar group of the alcohols becomes bigger which results in an increase in the strength of London forces between carbon chains of alcohol groups.",
          "More than one –OH group in the molecule increases solubility since more hydrogen bonds can be formed between alcohol and water.",
          "Carboxylic acids dissolve in a similar way to alcohols.",
        ],
      },
      {
        k: "figure",
        kind: "ethanol-water",
        caption: "Figure showing hydrogen bonding between water and ethanol.",
      },
      {
        k: "figure",
        kind: "solubility",
        caption:
          "Methanol mixes freely; by octanol the hydrocarbon end outweighs the single –OH, and the alcohol barely dissolves.",
      },
      { k: "h", text: "Compounds that cannot form hydrogen bonds with water" },
      {
        k: "bullets",
        items: [
          "Do not dissolve in water.",
          "Forces between non-polar molecules are much weaker than hydrogen bonds in water.",
          "The attraction between the alkane molecules and water molecules is not sufficiently strong to disrupt the hydrogen bond between water molecules.",
          "Therefore, they remain as a separate layer.",
          "Many polar compounds also have limited solubility in water. Compounds like halogenoalkanes cannot disrupt the water structure even though the carbon-halogen bond is polar. This is because the bulk of the molecule (hydrocarbon chain) is not polar.",
          "Ethoxyethane (CH~3~CH~2~OCH~2~CH~3~) is polar and is almost totally immiscible with water. The force of attraction between ethoxyethane and water molecules are not large enough to replace the relatively strong hydrogen bonding between water molecules.",
        ],
      },
      {
        k: "figure",
        kind: "mixing",
        caption:
          "Water and oil hold two separate layers; hexane and octane, built the same way, mix completely.",
      },
      { k: "h", text: "Non-aqueous solvents" },
      {
        k: "bullets",
        items: [
          "Two non-polar liquids will mix completely. Example: hexane and octane",
          "Both liquids contain weak London forces that extend throughout the structure when they are mixed.",
        ],
      },
      { k: "h", text: "In general like dissolves like:" },
      {
        k: "bullets",
        items: [
          "==Non-polar== solutes dissolve in non-polar solvents",
          "==Polar== solutes dissolve in polar solvents such as water (H~2~O) or ethanol (C~2~H~5~OH)",
          "Ionic solutes such as sodium chloride (NaCl) generally dissolve in polar solvents but not in non-polar solvents.",
        ],
      },
      {
        k: "wow",
        text: "One sentence survives the whole topic: like dissolves like — a solvent only takes a solute on board when the new attractions can pay for the ones they break.",
      },
    ],
  },
];
