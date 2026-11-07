import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 9 revision note · Part 9A — Kinetics (spec 9.1–9.8)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 9A
   class note (2021, semester 2); page furniture omitted. The two
   rate-calculation methods (rate =
   1/time, and the tangent gradient) each keep exactly one worked
   example, worked in full.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only — the marker is for the words that name the
   idea, not for whole clauses.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T09_A: SpecSection[] = [
  {
    spec: "9.1",
    statement:
      "understand, in terms of the collision theory, the effect of changes in concentration, temperature, pressure and surface area on the rate of a chemical reaction",
    title: "Collision theory and the rate factors",
    blocks: [
      { k: "h", text: "Rate of reaction" },
      {
        k: "bullets",
        items: [
          "Chemical kinetics is concerned with the dynamics of chemical reactions such as the way reactions take place and the rate (speed) of the process.",
        ],
      },
      {
        k: "def",
        term: "Rate of reaction",
        text: "The decrease in the concentration of any one of the reactants per unit time, OR the increase in the concentration of any one of the product per unit time.",
      },
      { k: "h", text: "Collision theory sets the rules" },
      {
        k: "bullets",
        items: [
          "According to collision theory, reactant particles must collide with sufficient energy before they can react.",
          "Hence rate of reaction can be increased by increasing the frequency of collision with sufficient energy between reacting particles.",
          "Collisions that result in a reaction are called ==successful collisions==.",
        ],
      },
      {
        k: "figure",
        kind: "rate-factors",
        caption:
          "Three ways to buy more collisions: pack more particles into the same volume (concentration), squeeze the same gas into a smaller vessel (pressure), or powder the solid so more of it is exposed (surface area).",
      },
      { k: "h", text: "The effect of concentration" },
      {
        k: "bullets",
        items: [
          "Increase in the concentration of the reactants in solution increases the rate of the reaction. This is because:",
          "Reactant particles per unit volume increases",
          "Frequency of collisions increases",
          "So frequency of ==effective collisions== increase.",
          "Decreasing the concentration of the reactants in solution decreases the rate of the reaction, because:",
          "Reactant particles per unit volume decreases",
          "Frequency of collisions decrease",
          "So frequency of effective collisions decreases.",
        ],
      },
      { k: "h", text: "Rate through the reaction" },
      {
        k: "p",
        text: "**Rate of reaction**: Reactions start off at their fastest then slow as the reactant concentration drops.",
      },
      {
        k: "p",
        text: "eg In the reaction CaCO~3~(s) + 2HCl → CaCl~2~ + CO~2~(g); change in volume of carbondioxide is measured with time when the concentration of HCl acid is increased. The following graph shows the volume of carbondioxide collected;",
      },
      {
        k: "figure",
        kind: "co2-curves",
        caption:
          "Same final volume, different journeys — curve A is steeper (greater gradient, faster rate) and levels off sooner: the faster completion.",
      },
      {
        k: "bullets",
        items: [
          "Curve A is steeper therefore rate of reaction is faster than curve B.",
          "Gradient of curve A is greater than gradient of curve B.",
          "Curve A levels off quickly compared to curve B indicating faster completion of reaction.",
        ],
      },
      { k: "h", text: "The effect of pressure (only for gases)" },
      {
        k: "p",
        text: "Increasing the pressure of gaseous reacting particles or decreasing the volume of the reaction vessel increases the rate of the reaction. This is because:",
      },
      {
        k: "bullets",
        items: [
          "Same number of gaseous molecules in smaller space, or number of gaseous molecules per unit volume increases.",
          "Increasing the pressure makes gas particles get closer together.",
          "This increases the frequency of collisions.",
          "So frequency of effective collisions increases.",
          "Changing the pressure has almost no effect on reactions in solid or liquid phase. This is because the volume of solids and liquids changes very little when pressurized, so their particles do not move close together.",
        ],
      },
      { k: "h", text: "The effect of surface area" },
      {
        k: "bullets",
        items: [
          "For heterogeneous reactions increasing surface area leads to more chances of a collision.",
          "Increasing the surface area of solid reactants increase the rate of the reaction. This is because:",
          "Greater surface area of the solid is exposed for collision.",
          "Frequency of collisions increases",
          "So frequency of effective collisions increase.",
          "Catalysts (in catalytic converters) are used in a ==finely divided form== for this reason.",
        ],
      },
      {
        k: "note",
        label: "Magnesium and dilute acid",
        text: "Only collisions between the hydrogen ions and magnesium atoms **on the surface** of magnesium result in a reaction. If magnesium is powdered, the surface area is increased and hydrogen is given off more quickly — more surface is exposed for reaction.",
      },
      { k: "h", text: "The effect of temperature" },
      {
        k: "p",
        text: "Increasing the temperature increases the rate of a reaction. This is because:",
      },
      {
        k: "bullets",
        items: [
          "Average kinetic energy of the particles increases.",
          "More particles have energy equal to or greater than **activation energy**.",
          "Speed of the particles also increases.",
          "So the frequency of effective collisions increases.",
        ],
      },
      { k: "h", text: "Collisions in solution" },
      {
        k: "bullets",
        items: [
          "In solution the molecules are much more closely packed together, so there is not much space between them.",
          "In low to medium concentrations, most of the solution is solvent, so solute particles are surrounded by solvent molecules and are said to be trapped in a ==solvent cage==.",
          "There are a number of solute molecules that get trapped in the same solvent cage. Hence increasing the collision rate between solute particles, and if collisions are sufficiently energetic they may react just as in the gas phase.",
        ],
      },
      {
        k: "steps",
        caption: "There are two distinct stages to reaction in solution",
        items: [
          {
            title: "Come together",
            text: "Molecules have to come together, by a process of diffusion, in the same solvent cage.",
          },
          {
            title: "React",
            text: "They have to react.",
          },
        ],
      },
      {
        k: "p",
        text: "For simple reactions involving two species, the chance of them meeting each other in solution is proportional to their concentrations, same as in gas phase.",
      },
      {
        k: "wow",
        text: "Every rate factor is one of two moves: concentration, pressure and surface area make collisions *more frequent*; temperature makes them *more energetic*. Either way, it is the frequency of successful collisions that decides the rate.",
      },
    ],
  },
  {
    spec: "9.2",
    statement:
      "understand that reactions take place only when collisions have sufficient energy, known as the activation energy",
    title: "Collisions, energy and orientation",
    blocks: [
      { k: "h", text: "Collision theory" },
      { k: "p", text: "According to the theory, for a reaction to occur —" },
      {
        k: "bullets",
        items: [
          "The reacting particles must **collide** before a reaction take place. However, not all collisions will lead to a reaction.",
          "During collision, the reacting particles must approach each other in the ==correct orientation==.",
          "The reacting particles must have a certain minimum amount of energy referred to as the ==activation energy (E~a~)==.",
        ],
      },
      {
        k: "note",
        label: "The effective collision",
        text: "A reaction occurs when the reactants collide each other in the correct orientation with energy equal to or greater than activation energy. Such collisions are **effective or successful collisions**.",
      },
      { k: "h", text: "Activation energy, E~a~" },
      {
        k: "def",
        term: "Activation energy",
        text: "The minimum energy that colliding particles must possess for a reaction to occur.",
      },
      {
        k: "bullets",
        items: [
          "If particles collide with less energy than activation energy then they simply bounce apart and no reaction occurs.",
          "Only those collisions that have energies equal to or greater than activation energy result in a reaction.",
          "Chemical reaction results in the breaking of some bonds (needing energy) and making new bonds (releasing energy). Activation energy is involved in breaking some of the original bonds.",
          "If collisions are relatively gentle, there is not enough energy available to break the bonds and so particles do not react.",
        ],
      },
      { k: "h", text: "Orientation (steric effect)" },
      {
        k: "p",
        text: "Collisions will result in reaction only if the molecules collide in the proper geometry.",
      },
      {
        k: "figure",
        kind: "orientation",
        caption:
          "Same molecules, same energy — only collision 1, the hydrogen end of H—Br swinging into the C=C, can lead to reaction; collisions 2 and 3 simply bounce apart.",
      },
      {
        k: "wow",
        text: "A collision has to pass two gates: enough energy to clear the activation barrier, and the right geometry to break the right bond. Miss either one, and the particles bounce apart unchanged.",
      },
    ],
  },
  {
    spec: "9.3",
    statement:
      "be able to calculate the rate of a reaction from: i the time taken for a reaction, using rate = 1/time ii the gradient of suitable graph, by drawing a tangent, either for initial rate, or at a time, t",
    title: "Measuring rate — 1/t and tangents",
    blocks: [
      { k: "h", text: "What we measure" },
      { k: "p", text: "To measure rate of a reaction, we need to find out:" },
      {
        k: "bullets",
        items: [
          "How fast one of the reactant is used up",
          "How fast one of the product is formed",
        ],
      },
      {
        k: "eq",
        eq: "rate of reaction = change in concentration / time for change to happen",
        note: "The concentration change can be a reactant falling or a product rising — both measure the same rate.",
      },
      {
        k: "bullets",
        items: [
          "In chemical reaction, the concentration of the reactants decreases or the concentration of the products increases.",
          "A graph can be drawn by concentration of the reactants or products against time; the slope of the graph measures the rate of the reaction.",
        ],
      },
      { k: "h", text: "Rate of reaction with respect to reactants" },
      {
        k: "bullets",
        items: [
          "The gradient decreases as the rate decreases and becomes zero when all reactants are used up.",
          "Rate of reaction is determined by drawing a ==tangent== at a point (eg; point A) and measuring its gradient.",
        ],
      },
      {
        k: "eq",
        eq: "gradient = y / x",
        note: "Y = change of concentration (moldm^−3^) · X = change in time (seconds)",
      },
      { k: "eq", eq: "unit of rate = moldm^−3^ s^−1^" },
      {
        k: "figure",
        kind: "rate-graphs",
        caption:
          "The class note's two graphs, redrawn: a reactant falls — draw the tangent at A and read y over x; a product rises — the opening slope is the initial rate, the tangent at t gives the rate then, and the flat tail is rate = zero.",
      },
      { k: "h", text: "Rate of reaction with respect to products" },
      {
        k: "bullets",
        items: [
          "Rate is also measured by the change in concentration of products over a period of time.",
          "The slope at the start of the reaction will give the ==initial rate==.",
          "The slope gets less (showing the rate is slowing down) as the reaction proceeds.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · rate = 1/time",
        question:
          "A strip of magnesium takes 80 s to disappear in excess dilute hydrochloric acid. Calculate the mean rate of the reaction using rate = 1/time.",
        steps: [
          "rate = 1/time — one over the time taken for the reaction to finish.",
          "rate = 1/80",
          "With the time in seconds, the rate comes out in s^−1^.",
        ],
        answer: "rate = 0.0125 s^−1^",
      },
      {
        k: "worked",
        title: "Worked example · rate from a tangent",
        question:
          "On a concentration–time graph, the tangent drawn at t = 20 s falls 1.2 mol dm^−3^ over 60 s. Calculate the rate of reaction at t = 20 s.",
        steps: [
          "Rate at a point = gradient of the tangent at that point, and gradient = y/x.",
          "y = change of concentration = 1.2 mol dm^−3^; x = change in time = 60 s.",
          "gradient = 1.2 / 60",
        ],
        answer: "rate = 0.02 moldm^−3^ s^−1^",
      },
      {
        k: "wow",
        text: "Two ways in, one answer: time the reaction and take 1/t for a mean rate, or draw the tangent and take y/x for the rate at that exact moment — both come out as concentration changing per second.",
      },
    ],
  },
  {
    spec: "9.4",
    statement:
      "understand qualitatively, in terms of the Maxwell-Boltzmann distribution of molecular energies, how changes in temperature affect the rate of a reaction",
    title: "Temperature and the Maxwell-Boltzmann distribution",
    blocks: [
      { k: "h", text: "Maxwell-Boltzmann distribution curves" },
      {
        k: "bullets",
        items: [
          "The molecules in a sample of gas have a wide range of energies. Due to the number of collisions taking place, there is a spread of molecular velocities and energies.",
          "Experiments indicated that ...",
          "no particles have zero velocity (all the particles have some amount of energy)",
          "some have very low and some have very high velocities",
          "most have intermediate velocities.",
          "Area under the curve represents the ==total number of particles== in the system.",
        ],
      },
      {
        k: "p",
        text: "This curve shows the distribution of energies of the molecules in a gas (but can also be applied for particles in a solution).",
      },
      {
        k: "figure",
        kind: "mb-curve",
        caption:
          "The class note's curve, redrawn: most probable energy at the peak, no molecule at zero energy, a tail that never quite touches the axis — and the shaded sliver beyond E~a~ is the only part that can react.",
      },
      {
        k: "bullets",
        items: [
          "E~a~ corresponds to the Activation Energy.",
          "The area under the curve beyond this E~a~ value is proportional to the number of particles with energy greater than activation energy.",
          "If the **activation energy is high**, the number of colliding particles that have this energy at room temperature is extremely small (only about 1 in 10^12^ molecule possesses this energy), so the reaction does not takes place. The system is said to be ==kinetically stable==.",
          "Such reactions occur only if the temperature is increased.",
        ],
      },
      { k: "h", text: "Effect of an increase in temperature" },
      { k: "p", text: "Increasing the temperature alters the distribution:" },
      {
        k: "bullets",
        items: [
          "curve shifts to the **RIGHT**, higher energies/velocities",
          "curve gets **broader and flatter** due to the greater spread of values",
          "area under the curve stays constant — corresponds to the total no. of particles",
        ],
      },
      {
        k: "figure",
        kind: "mb-temperature",
        caption:
          "T~2~ > T~1~: the peak drops and slides right, the area under the curve stays the same — and the shaded catch beyond E~a~ swells, which is all the rate needs.",
      },
      {
        k: "bullets",
        items: [
          "increasing the temperature gives more particles with energy greater than Activation energy (E~a~)",
          "more reactants can overcome the energy barrier associated and form products.",
          "Therefore, more effective collisions can take place, increasing the rate of reaction.",
          "a small rise in temperature can lead to a large increase in rate.",
        ],
      },
      { k: "h", text: "Points to note about the Maxwell-Boltzmann graph" },
      {
        k: "bullets",
        items: [
          "Neither curve is symmetrical.",
          "Both curves start at the origin and finish by approaching the X axis and do not touch the X axis.",
          "The area under both curves is same.",
          "The peak of the T~2~ distribution is to the right and lower than the peak of T~1~ distribution.",
        ],
      },
      {
        k: "wow",
        text: "Heating creates no new particles — it reshuffles the same total area, flattening the peak rightwards until far more of the distribution sits beyond E~a~. That is how a small rise in temperature buys a large rise in rate.",
      },
    ],
  },
  {
    spec: "9.5",
    statement:
      "understand the role of catalysts in providing alternative reaction routes of lower activation energy",
    title: "Catalysts — the alternative route",
    blocks: [
      {
        k: "p",
        text: "A catalyst alters rate of reaction by providing an ==alternative path with lower activation energy==. BUT they do not undergo any permanent chemical change.",
      },
      {
        k: "bullets",
        items: [
          "Catalysts are specific to reactions and they cause the reaction rate to increase.",
          "Using catalysts avoids the need to supply extra heat —",
          "it is more safer and cheaper.",
          "Catalysts remain chemically unchanged at the end of the reaction.",
        ],
      },
      {
        k: "wow",
        text: "A catalyst never pushes the particles harder — it builds them a lower pass over the same mountain, then comes down unchanged, ready to guide the next batch.",
      },
    ],
  },
  {
    spec: "9.6",
    statement:
      "be able to draw the reaction profiles for uncatalysed and catalysed reactions, including the energy level of the intermediate formed with the catalyst",
    title: "Reaction profiles, catalysed and uncatalysed",
    blocks: [
      { k: "h", text: "Reaction profile diagrams" },
      {
        k: "bullets",
        items: [
          "Reaction profile diagram shows the energy levels of the reactants and the products of the reaction and of the transition state that the reactants go through. The activation energy (E~a~) and the enthalpy change (ΔH~r~) also shown on the diagram.",
          "The energy changes during the course of an exothermic and endothermic reaction are shown in the reaction profile diagram.",
        ],
      },
      {
        k: "figure",
        kind: "profiles",
        caption:
          "The Topic 6 profiles, back for a cameo: E~a~ is the climb to the transition state, ΔH~r~ the drop (or climb) from reactants to products.",
      },
      {
        k: "p",
        text: "A catalyzed reaction takes place using a different route from the uncatalyzed reaction.",
      },
      {
        k: "figure",
        kind: "catalyst-profile",
        caption:
          "Left: the catalysed hump clears a lower E~a~ between the same reactants and products. Right: with an intermediate formed, the catalysed route splits into two smaller humps — one per step — as in the peroxydisulphate/iodide reaction catalysed by Fe^2+^.",
      },
      {
        k: "p",
        text: "If an ==intermediate== is formed between the reactant and the catalyst then the reaction takes place in at least two steps as shown below. Example; the reaction between peroxydisulphate ions and iodide ions, catalyzed by Fe^2+^ ions.",
      },
      {
        k: "wow",
        text: "The catalysed route never changes the destination — same reactants, same products, same ΔH — it only lowers the summit, or splits the climb in two at an intermediate resting ledge.",
      },
    ],
  },
  {
    spec: "9.7",
    statement:
      "understand the use of catalysts in industry to make processes more sustainable by using less energy and/or higher atom economy",
    title: "Catalysts in industry",
    blocks: [
      {
        k: "p",
        text: "Catalysts have been increasingly used in the chemical industry. The development of catalysts was mostly for economic reasons. But now development of catalysts has been for political and environmental reasons as well.",
      },
      { k: "p", text: "Two major economic advantages of the use of catalyst are;" },
      {
        k: "bullets",
        items: [
          "increase the rate of chemical reaction, more of the desired product can be made in a given period of time.",
          "reactions can take place at lower temperatures, resulting in a decrease in the energy costs to the manufacture.",
        ],
      },
      { k: "h", text: "Homogeneous catalyst" },
      {
        k: "def",
        term: "Homogeneous catalyst",
        text: "A catalyst that is in the same phase (physical state) as the reactants.",
      },
      {
        k: "p",
        text: "Example: Fe^2+^ ion catalyst in oxidation of iodide ions I^−^ by persulphate ions S~2~O~8~^2−^.",
      },
      {
        k: "eq",
        eq: "S~2~O~8~^2−^(aq) + I^−^(aq) —Fe^2+^(aq)→ 2SO~4~^2−^(aq) + I~2~(s)",
        note: "As printed in the class note. Balanced, two iodide ions are needed: S~2~O~8~^2−^ + 2I^−^ → 2SO~4~^2−^ + I~2~.",
      },
      { k: "p", text: "Both the reactants and Iron (II) catalyst are in aqueous phase." },
      { k: "h", text: "Heterogeneous catalyst" },
      {
        k: "bullets",
        items: [
          "Most catalysts used in industry are heterogeneous catalysts.",
          "A heterogeneous catalyst is one that is in a different phase from the reactants.",
          "Solids are commonly used as heterogeneous catalysts for reactions involving gases.",
        ],
      },
      {
        k: "p",
        text: "Example: Many reactions between gases are catalyzed using a solid catalyst.",
      },
      {
        k: "eq",
        eq: "N~2~(g) + 3H~2~(g) ⇌ 2NH~3~(g)",
        note: "Iron powder as a catalyst — the reactants are in gaseous state, but the catalyst is in solid state.",
      },
      { k: "h", text: "How heterogeneous catalysts work" },
      {
        k: "p",
        text: "Heterogeneous catalysis takes place at active sites on the surface of a solid (e.g. a metal). Gases are ==adsorbed== onto the surface and form weak bonds with metal atoms. This form of catalysis is thought to work in three stages as follows:",
      },
      {
        k: "steps",
        caption: "The three stages of heterogeneous catalysis",
        items: [
          {
            title: "1 · Adsorption",
            text: "Formation of bonds with the metal may use some of the electrons from bonds within the gas molecules thus weakening these bonds and making a subsequent reaction easier.",
          },
          {
            title: "2 · Reaction",
            text: "Adsorbed gas molecules may be held on the surface of the metal in just the right orientation for a reaction to occur. This increases the chances of favourable collisions taking place.",
          },
          {
            title: "3 · Desorption",
            text: "The products are then released from the active sites.",
          },
        ],
      },
      {
        k: "figure",
        kind: "het-catalyst",
        caption:
          "The class note's metal-surface story in three frames: H~2~ and C~2~H~4~ adsorb onto active sites, the H—H bond breaks and the H atoms migrate — one attaches to C~2~H~4~ making the C~2~H~5~ intermediate, the second completes ethane, which desorbs.",
      },
      { k: "h", text: "Catalysts and atom economy in industry" },
      {
        k: "bullets",
        items: [
          "In the manufacture of chemicals, waste is produced when products are formed.",
          "Use of catalysts can lead to reactions with little or no co-product (waste). It may also reduce side reactions producing unwanted products, making separation easier.",
        ],
      },
      {
        k: "p",
        text: "EXAMPLE; phenol can be manufactured by the oxidation of dinitrogen monoxide (N~2~O) using ==zeolite catalyst== giving nitrogen as the only by product. Manufacture of phenol using benzene via cumene has a very low ==atom economy==.",
      },
      { k: "h", text: "Advantages of using catalysts" },
      {
        k: "bullets",
        items: [
          "Fewer steps are involved in the manufacture hence the energy costs are likely to be less.",
          "The percentage yield of each step may be higher (and fewer steps).",
          "Less product is lost in the separation after each step, or separation may not be required until the end.",
          "The whole process may be quicker so that more product is obtained in a given time.",
        ],
      },
      {
        k: "wow",
        text: "Industry loves a catalyst twice over: lower temperatures cut the energy bill, and cleaner routes with fewer side products cut the waste — more of every atom fed in ends up inside the product.",
      },
    ],
  },
  {
    spec: "9.8",
    statement:
      "be able to interpret the action of a catalyst in terms of a qualitative understanding of the Maxwell-Boltzmann distribution of molecular energies",
    title: "Catalysts on the Maxwell-Boltzmann curve",
    blocks: [
      { k: "h", text: "Maxwell-Boltzmann distribution curve for catalysed reactions" },
      {
        k: "bullets",
        items: [
          "Catalysts provide an alternative pathway with lower activation energy.",
          "Since activation energy is reduced, ==more particles have sufficient energy== for effective collisions.",
          "Therefore, number of effective collisions increases, thus increases the rate of reaction.",
        ],
      },
      {
        k: "figure",
        kind: "mb-catalyst",
        caption:
          "The same distribution, two thresholds: slide E~a~ left to the catalysed line and every particle in the shaded wedge between the two lines joins the reaction — no extra heat needed.",
      },
      {
        k: "wow",
        text: "A catalyst heats nothing: it moves the finishing line leftwards along the energy axis, so the tail you already have crosses it. More effective collisions, faster rate — and the catalyst steps out unchanged.",
      },
    ],
  },
];
