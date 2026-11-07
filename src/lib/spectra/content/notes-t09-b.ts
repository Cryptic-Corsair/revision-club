import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 9 revision note · Part 9B — Equilibria (spec 9.9–9.11)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 9B
   class note (2021, semester 2); page furniture omitted. The
   topic is purely
   qualitative, so it carries no worked examples: the summary
   tables from the class note are kept, and the three source
   graphs (fig A, ammonia-vs-pressure, Haber yield, Contact
   yield) are redrawn as figures.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only — the marker is for the words that name the
   idea, not for whole clauses.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T09_B: SpecSection[] = [
  {
    spec: "9.9",
    statement:
      "know that many reactions are readily reversible and that they can reach a state of dynamic equilibrium in which: i the rate of the forward reaction is equal to the rate of the backward reaction ii the concentrations of the reactants and the products remain constant",
    title: "Reversible reactions and dynamic equilibrium",
    blocks: [
      { k: "h", text: "Irreversible and reversible reactions" },
      {
        k: "bullets",
        items: [
          "When a mixture of hydrogen and oxygen in a 2 : 1 ratio is ignited with a spark, water is produced and no uncombined hydrogen and oxygen is left. This is an example of a complete or irreversible reaction",
        ],
      },
      { k: "eq", eq: "2H~2~(g) + O~2~(g) → 2H~2~O(l)" },
      {
        k: "bullets",
        items: [
          "But many reactions do not go completion. For example, a mixture of hydrogen and iodine in a 1 : 1 molar ratio is heated to 300 °C in a closed vessel, only about 90% of hydrogen and iodine reacts. This is an example for a reversible reaction.",
        ],
      },
      { k: "eq", eq: "H~2~(g) + I~2~(g) ⇌ 2HI(g)" },
      {
        k: "def",
        term: "Reversible reaction",
        text: "A reversible reaction is one that goes in both directions at the same temperature.",
      },
      {
        k: "bullets",
        items: [
          "The symbol ⇌ is used to indicate reactions that are reversible.",
          "Many reactions go to completion if they are performed in an open container.",
          "Example: CaCO~3~(s) would completely decompose into CaO(s) and CO~2~(g) on heating at 900 °C in an open container according to the equation;",
        ],
      },
      { k: "eq", eq: "CaCO~3~(s) → CaO(s) + CO~2~(g)" },
      {
        k: "bullets",
        items: [
          "However, if the above reaction was performed in a closed container, only a small portion of CaCO~3~ decomposes, no matter how long the temperature was maintained at 900 °C.",
          "The reason of this is that the products CaO and CO~2~ can also react together at this temperature to form the reactants CaCO~3~. The reaction is reversible",
        ],
      },
      { k: "eq", eq: "CaCO~3~(s) ⇌ CaO(s) + CO~2~(g)" },
      {
        k: "p",
        text: "In a reversible reaction actually, there are two reactions one from reactant side to the product side (left hand side to right hand side), is known as ==forward reaction== and the other one from the right-hand side to the left-hand side, is the reverse (**backward reaction**).",
      },
      { k: "h", text: "How is equilibrium established?" },
      {
        k: "bullets",
        items: [
          "In a reversible reaction, as the reaction continues the concentration of the reactants decreases and the rate of the forward reaction also decreases.",
          "The following reaction proceeds in the forward direction because no products are yet present.",
        ],
      },
      { k: "eq", eq: "A + B → C + D" },
      {
        k: "bullets",
        items: [
          "As the reaction proceeds, the products formed react together to re-form the reactants. The rate of forward reaction decreases with time.",
          "Since the concentration of the product is initially low, the rate of the backward reaction is also slow. As the concentration of the product increases the rate of the backward reaction increases.",
        ],
      },
      { k: "eq", eq: "A + B ⇌ C + D" },
      {
        k: "p",
        text: "Eventually the rates of the forward reaction and backward reaction become equal. At this point a ==dynamic equilibrium== has been reached",
      },
      {
        k: "figure",
        kind: "eq-dynamic",
        caption:
          "The class note's fig A, redrawn: the forward rate falls as the reactants thin out, the backward rate climbs as products pile up — where the two curves meet, both keep running at one common rate and the composition holds steady.",
      },
      { k: "h", text: "Dynamic equilibrium" },
      {
        k: "steps",
        caption: "Two conditions must be met for dynamic equilibrium to be established",
        items: [
          {
            title: "Reversible",
            text: "The reaction must be reversible",
          },
          {
            title: "Closed container",
            text: "The reaction mixture must be in a closed container.",
          },
        ],
      },
      {
        k: "p",
        text: "Three important features of a system in dynamic equilibrium:",
      },
      {
        k: "bullets",
        items: [
          "The reactions continue to occur in both directions.",
          "The concentration of the reactants and products remain constant",
          "Rate of the forward reaction is equal to the rate of the backward reaction",
        ],
      },
      {
        k: "wow",
        text: "Dynamic is the operative word. At equilibrium neither reaction has stopped: particles are still swapping sides in both directions at equal rates, so the concentrations stop changing — the traffic never stops, the level just stops moving. And the whole state depends on two conditions: a reversible reaction and a closed container.",
      },
    ],
  },
  {
    spec: "9.10",
    statement:
      "be able to predict and justify the qualitative effects of changes of temperature, pressure and concentration on the position of equilibrium in a homogeneous system",
    title: "Shifting the position of equilibrium",
    blocks: [
      { k: "h", text: "Types of equilibria" },
      {
        k: "def",
        term: "Homogeneous equilibrium",
        text: "All reactants and products are in the same physical state (Eg: all gases or all liquids)",
      },
      {
        k: "eq",
        eq: "2SO~2~(g) + O~2~(g) ⇌ 2SO~3~(g)",
        note: "All reactants and products in gaseous state.",
      },
      {
        k: "eq",
        eq: "CH~3~COOH(l) + CH~3~CH~2~OH(l) ⇌ CH~3~COOCH~2~CH~3~(l)",
        note: "All reactants and products in liquid state.",
      },
      {
        k: "def",
        term: "Heterogeneous equilibrium",
        text: "All reactants and products are in different physical state.",
      },
      { k: "eq", eq: "H~2~O(g) + C(s) ⇌ H~2~(g) + CO(g)" },
      {
        k: "eq",
        eq: "Cu(s) + Ag^+^(aq) ⇌ Cu^2+^(aq) + 2Ag(s)",
        note: "All reactants and products in solid and aqueous state.",
      },
      { k: "h", text: "Changing the composition of an equilibrium mixture" },
      {
        k: "bullets",
        items: [
          "When reaction is mixture reaches a position of equilibrium, the concentration of each component will not alter as long as the conditions remain constant.",
          "However, if a condition is changed by adding more of or removing one of the reactants or products, then the composition of the components may change.",
          "This is referred to a “changing the ==position of equilibrium==” and we can refer to the position being moved to the right, to the left or unchanged.",
        ],
      },
      {
        k: "p",
        text: "For example: Reaction between chromate(VI), CrO~4~^2−^ ions with acid turns orange. This is because of an increase of dichromate (VI) ions, Cr~2~O~7~^2−^",
      },
      {
        k: "figure",
        kind: "eq-chromate",
        caption:
          "The chromate–dichromate see-saw: acid (H^+^) pushes the position to the right and the solution turns orange; alkali (OH^−^) pulls it back to the left and the yellow returns.",
      },
      {
        k: "bullets",
        items: [
          "If acid (H^+^) is added to the system, equilibrium moves to the right and solution becomes orange.",
          "If alkali (OH^−^) is added to the system, equilibrium moves to the left and solution becomes yellow.",
        ],
      },
      { k: "h", text: "Four factors that may affect the position of equilibrium" },
      {
        k: "bullets",
        items: [
          "1) Concentration of component",
          "2) Pressure of the system",
          "3) Temperature of the system",
          "4) Addition of a catalyst",
        ],
      },
      { k: "h", text: "Effect of changes in concentration on the position of equilibrium" },
      {
        k: "bullets",
        items: [
          "Increasing concentration of reactants drives the forward reaction. Therefore, the equilibrium shifts to the right.",
          "Increasing concentration of products drives the backward reaction. Therefore, the equilibrium shifts to the left.",
          "As the concentration of the products increases, the rate of backward reaction increases and a new equilibrium is established.",
          "The position of equilibrium has moved to the right, with slightly more products than at the original position of equilibrium.",
        ],
      },
      {
        k: "table",
        caption: "Summary",
        head: ["Concentration change", "Effect on equilibrium"],
        rows: [
          ["Reactants increase", "Moves to right (rate of forward reaction increases to decrease the concentration of reactants)"],
          ["Reactants decrease", "Moves to left (rate of backward reaction increases to increase the concentration of the reactants)"],
          ["Products increase", "Moves to left (rate of backward reaction increases to decrease the concentration of the products)"],
          ["Products decrease", "Moves to right (rate of forward reaction increases to increase the concentration of the products)"],
        ],
      },
      { k: "h", text: "Effect of changes of pressure on the position of equilibrium" },
      {
        k: "bullets",
        items: [
          "Effect of pressure only applies to equilibrium reactions involving gases.",
          "If there is no change in the number of moles of gas in a gaseous reaction, changes of pressure have no effect on the composition of equilibrium mixture.",
        ],
      },
      { k: "eq", eq: "H~2~(g) + I~2~(g) ⇌ 2HI(g)    2 moles    2 moles" },
      {
        k: "bullets",
        items: [
          "Applies only to systems where the total number of moles of gas on the reactant side is different from that on the product side. This is because the number of moles of a gas is proportional to the pressure.",
        ],
      },
      { k: "eq", eq: "2SO~2~(g) + O~2~(g) ⇌ 2SO~3~(g)    3 moles    2 moles" },
      {
        k: "bullets",
        items: [
          "If the pressure of an equilibrium mixture is increased at constant temperature, the position of the equilibrium will shift towards the side with ==fewer number of gas molecules==, so that the total pressure is decreased.",
          "The pressure of an equilibrium system can be increased by",
          "Reducing the volume",
          "Adding more gas into the same volume.",
          "If the pressure of an equilibrium mixture decreased at constant temperature, the position of equilibrium will shift towards the side with greater number of gas molecule, so that the total pressure is increased.",
          "Position of equilibrium moves to restore equilibrium.",
        ],
      },
      {
        k: "table",
        caption: "Summary",
        head: ["Pressure change", "Effect on equilibrium"],
        rows: [
          ["INCREASE", "Moves to side with *fewer gaseous molecules*"],
          ["DECREASE", "Moves to side with *more gaseous molecules*"],
        ],
      },
      {
        k: "p",
        text: "Consider the reaction between nitrogen and hydrogen to form ammonia; The following graph shows the effect of pressure changes using different amounts of nitrogen and hydrogen to form ammonia",
      },
      {
        k: "figure",
        kind: "eq-pressure",
        caption:
          "The class note's curve, redrawn: squeeze the same equilibrium mixture harder and it keeps paying out ammonia — at high pressure the side with fewer moles of gas wins.",
      },
      {
        k: "bullets",
        items: [
          "Graph shows that;",
          "At high pressure more ammonia is produced at equilibrium",
          "This is because at high pressure shifts equilibrium to the side having fewer moles of gas.",
        ],
      },
      { k: "eq", eq: "N~2~(g) + 3H~2~(g) ⇌ 2NH~3~(g)    4 moles    2 moles" },
      { k: "h", text: "Effect of changes of temperature on the position of equilibrium" },
      {
        k: "figure",
        kind: "eq-temperature",
        caption:
          "The class note's direction map: the forward reaction carries ΔH = −ve, the backward ΔH = +ve — so heating and cooling always push the position in opposite directions.",
      },
      {
        k: "bullets",
        items: [
          "The direction of change in equilibrium position depends upon whether the reaction is exothermic or endothermic.",
          "If the temperature of an equilibrium system is increased, the position of equilibrium shifts towards the ==endothermic direction==.",
          "If the temperature of an equilibrium system is decreased, the position of equilibrium shifts towards the ==exothermic direction==.",
          "Position of equilibrium moves to establish a new equilibrium.",
        ],
      },
      {
        k: "table",
        caption: "Summary",
        head: ["Type of forward reaction", "Increase temperature", "Decrease temperature"],
        rows: [
          ["Exothermic (ΔH = −ve)", "Moves to LEFT", "Moves to RIGHT"],
          ["Endothermic (ΔH = +ve)", "Moves to RIGHT", "Moves to LEFT"],
        ],
      },
      { k: "h", text: "Effect of the addition of a catalyst" },
      {
        k: "bullets",
        items: [
          "A catalyst works by providing an alternative route that has lower activation energy than that of uncatalysed reaction.",
          "Therefore rate of a reaction with a catalyst is much faster than the rate without the catalyst.",
          "A catalyst has ==NO EFFECT== on the position of equilibrium of a reversible reaction.",
          "Catalyst speeds up the forward and backward reactions equally, so equilibrium is reached sooner than without catalyst.",
        ],
      },
      { k: "h", text: "Limitations of making qualitative predictions" },
      {
        k: "bullets",
        items: [
          "The qualitative predictions made about the effect of concentration, pressure and temperature on the position of equilibrium are just predictions. The arguments are not explanations of why changes sometimes occur.",
          "There are occasions when it is impossible to predict the direction of change or indeed when predictions turn out to be incorrect.",
        ],
      },
      {
        k: "p",
        text: "Example; The equilibrium mixture of NO~2~(g) (brown) and N~2~O~4~(g) (colourless) in a closed container is placed into a beaker of hot water at room temperature, both the temperature and the pressure of the gaseous mixture will rise.",
      },
      {
        k: "eq",
        eq: "2NO~2~(g) ⇌ N~2~O~4~(g)    ΔH = −57.2 kJ mol^−1^    Brown    Colourless",
      },
      {
        k: "figure",
        kind: "eq-conflict",
        caption:
          "One disturbance, two competing predictions: heating says left, the pressure rise says right — and the tube answers by going darker, so here the temperature effect is the one in charge.",
      },
      {
        k: "bullets",
        items: [
          "Forward reaction is exothermic so we would predict an increase in temperature would shift equilibrium to the left. But since there are fewer moles on the right-hand side, we would predict that an increase in pressure would shift the equilibrium to the right.",
          "We do not know which effect is greater, so we cannot make a prediction of which way equilibrium will shift.",
          "In practice the mixture becomes darker in colour, so the temperature effect must be greater than the pressure effect. The equilibrium must have shifted to the left to produce more NO~2~(g).",
        ],
      },
      {
        k: "wow",
        text: "Every shift is the same reflex — the position moves to restore what was changed. Extra reactant gets consumed, extra pressure escapes towards the side with fewer gas molecules, extra heat is swallowed by the endothermic direction. A catalyst is the one disturbance that changes nothing: it hurries both directions equally, so equilibrium simply arrives sooner — at the very same position.",
      },
    ],
  },
  {
    spec: "9.11",
    statement:
      "evaluate data to explain the necessity, for many industrial processes, to reach a compromise between the yield and the rate of reaction",
    title: "Reversible reactions in industry",
    blocks: [
      {
        k: "h",
        text: "Applying the principles of reaction rates and reversibility to industrial processes",
      },
      {
        k: "bullets",
        items: [
          "The principles of reaction rates and reversibility are important in the design and conditions of many industrial processes.",
          "To maximize profits, it is important to convert reactants to products",
          "as quickly as possible and",
          "as completely as possible.",
          "The first one relates to the kinetics (rate of reaction) and the second is related to reversibility.",
          "The solution to the problem is to choose a careful choice of reaction conditions.",
          "The best conditions in an industry are known as ==compromise conditions==.",
        ],
      },
      { k: "h", text: "The Haber process" },
      {
        k: "p",
        text: "Ammonia is manufactured in industry by direct synthesis from nitrogen and hydrogen.",
      },
      { k: "eq", eq: "N~2~(g) + 3H~2~(g) ⇌ 2NH~3~(g)    ΔH = −92.4 kJ mol^−1^" },
      {
        k: "bullets",
        items: [
          "If the reaction mixture were to reach equilibrium, maximum yield is obtained by low temperature (forward reaction is exothermic) and high pressure (4 mol of gas on the left; 2 mol of gas on the right).",
          "However, the reaction mixture does not reach equilibrium in the reaction chamber.",
        ],
      },
      {
        k: "figure",
        kind: "eq-haber",
        caption:
          "The class note's yield graph, redrawn: at any pressure the cooler curves sit higher — but cold is slow. The dashed guides read the working point, 250 atm on the 450 °C curve.",
      },
      { k: "p", text: "Why are conditions of 450 °C and 250 atm used?" },
      {
        k: "bullets",
        items: [
          "Reaction between nitrogen and hydrogen are very slow at room temperature mainly due to the very strong nitrogen to nitrogen triple bond [E(N≡N) = 945 kJ mol^−1^] producing a high activation energy for the reaction.",
          "Even at high temperature the reaction is slow in the absence of a suitable catalyst.",
          "Many metals including tungsten and platinum catalyses this reaction. However, they are very expensive, so iron is used in industrial process.",
          "Catalysts require high temperatures to function efficiently. But high temperatures are not economical because of the extra energy costs involved.",
          "Increasing temperature might also result in a decrease in yield as the forward reaction is exothermic, leading to an increase in the rate of backward reaction.",
          "In reality these industrial processes are not in equilibrium because the ==products are removed== from the system as they are formed.",
          "Hence a compromised temperature of 450 °C is used.",
          "The higher the pressure the larger is the yield but the larger costs for compressing gases makes the process less economical.",
          "Hence a compromise is reached between yield and cost pressure of 250 atm is used.",
        ],
      },
      {
        k: "note",
        label: "Conditions used in Haber process",
        text: "Temperature — 450 °C · Pressure — 250 atm",
      },
      {
        k: "wow",
        text: "Yield wants it cold and squeezed; rate wants it hot; the accountants want it cheap. 450 °C and 250 atm is where all three shake hands — and because the ammonia is piped off as it forms, the reaction never actually reaches equilibrium. It spends its whole working life chasing a position it is never allowed to settle on.",
      },
      { k: "h", text: "The Contact process" },
      { k: "p", text: "Sulpuric acid is manufactured by Contact process." },
      { k: "eq", eq: "SO~2~(g) + ½O~2~(g) ⇌ SO~3~(g)    ΔH = −96 kJ mol^−1^" },
      {
        k: "bullets",
        items: [
          "Since forward reaction is exothermic, low temperature would result in a high yield of SO~3~(g).",
          "The catalyst vanadium(V)oxide requires high temperature to be effective. So, a moderately high temperature of 450 °C and 1 atm pressure is used.",
          "At 1 atm pressure the yield is already very high at 97%. Higher pressures would increase the yield as there are fewer molecules on the right hand side.",
        ],
      },
      { k: "eq", eq: "2SO~2~(g) + O~2~(g) ⇌ 2SO~3~(g)    3 moles    2 moles" },
      {
        k: "figure",
        kind: "eq-contact",
        caption:
          "The class note's yield curve, redrawn: hot-side losses are tiny while the catalyst is in its comfort zone — at 450 °C and 1 atm the yield already reads 97%.",
      },
      {
        k: "bullets",
        items: [
          "Pressures above 2 atm are unnecessary since the yield is already very high.",
          "The mechanism of action of the vanadium(V)oxide is different from iron in Haber process.",
          "The vanadium changes its oxidation state during the reaction but converts back to its original oxidation state.",
        ],
      },
      { k: "p", text: "The mechanism for the reaction is" },
      { k: "eq", eq: "SO~2~(g) + V~2~O~5~(s) → SO~3~(g) + V~2~O~4~(s)" },
      { k: "eq", eq: "V~2~O~4~(s) + ½O~2~(g) ⇌ V~2~O~5~(s)" },
      {
        k: "note",
        label: "Conditions used in Contact process",
        text: "Temperature — 450 °C · Pressure — 2 atm",
      },
      {
        k: "wow",
        text: "Vanadium(V)oxide plays give-and-take: it hands an oxygen atom to SO~2~ and drops down to vanadium(IV), then the air hands the oxygen back and vanadium(V) rises again. Changed twice, changed not at all overall — exactly what a catalyst must be.",
      },
    ],
  },
];
