import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 8 revision note · Part 8B — The elements of Groups 1 and 2
   (spec 8.11–8.23)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 8B
   class note (2021, semester 2); page furniture omitted. Each
   method — neutralising with an oxide or hydroxide, applying the
   decomposition patterns,
   the mean titre, the titration sum, the mol dm⁻³ → g dm⁻³ switch,
   each uncertainty estimate, and the standard-solution sum — keeps
   exactly one worked example, worked in full.
   Highlighting is kept deliberately light: one mark per key term,
   short spans only — the marker is for the words that name the
   idea, not for whole clauses.
   A few source equations left unbalanced by the note are carried
   in balanced form (2Li, 2H₂O, Mg + 2H₂O); everything else is the
   note's own words and numbers.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T08_B: SpecSection[] = [
  {
    spec: "8.11",
    statement:
      "understand reasons for the trend in ionisation energy down Groups 1 and 2",
    title: "Ionisation energy down Groups 1 and 2",
    blocks: [
      { k: "h", text: "Introduction to the Group 1 and 2 elements" },
      {
        k: "bullets",
        items: [
          "The alkali metals and alkaline-earth metals are members of Group I and Group II, respectively, in the periodic table.",
          "They are solids at room temperature.",
          "The pure elements in these groups (except Francium and Radium) appear as bright silvery solids. However, when exposed to air, they combine with oxygen to form oxides as surface layers, which makes them appear dull.",
          "They are ==s-block elements== since their valence electrons are in s orbitals.",
        ],
      },
      {
        k: "p",
        text: "All group I metals have one outermost s-electron, whereas group II metals have two outermost s-electrons. These electrons are situated much further from the nucleus than all other electrons in the metals, so they are only weakly held by the positive nucleus. As a result, Group I and II elements readily lose their outermost s-electrons to form stable ions with ==noble gas structures==.",
      },
      { k: "h", text: "Atomic radius" },
      {
        k: "p",
        text: "Atomic radius ==increases down the group== as the outer most electrons are further away from the nuclei. The atomic radius of group II < group I.",
      },
      {
        k: "table",
        caption: "Atomic radii from the class note",
        head: ["Group 1 element", "Atomic radius / nm", "Group 2 element", "Atomic radius / nm"],
        rows: [
          ["Li", "0.152", "Be", "0.112"],
          ["Na", "0.186", "Mg", "0.160"],
          ["K", "0.231", "Ca", "0.197"],
          ["Rb", "0.244", "Sr", "0.215"],
          ["Cs", "0.262", "Ba", "0.224"],
        ],
      },
      { k: "h", text: "Ionization energy" },
      {
        k: "p",
        text: "Ionization energy decreases down the Group I and II.",
      },
      {
        k: "bullets",
        items: [
          "Down the group, the atomic size increases and the number of shells increases.",
          "Distance between the nucleus and the outer electrons increases.",
          "The outer electrons are ==more shielded== by the electrons in the inner shells.",
          "The effect of the increase in nuclear charge is outweighed by the increase in shielding.",
          "Therefore, the outer electrons are less attracted by the nucleus.",
          "Hence, less energy is required to remove the electrons.",
        ],
      },
      {
        k: "table",
        caption: "Group I — the outer electron gets cheaper to remove",
        head: ["Group I element", "1st IE / kJ mol^−1^", "2nd IE / kJ mol^−1^"],
        rows: [
          ["Li", "519", "7 300"],
          ["Na", "494", "4 560"],
          ["K", "418", "3 070"],
          ["Rb", "402", "2 370"],
          ["Cs", "376", "2 420"],
        ],
      },
      {
        k: "table",
        caption: "Group II — same story, one electron more",
        head: ["Group II element", "1st IE / kJ mol^−1^", "2nd IE / kJ mol^−1^", "1st and 2nd IE / kJ mol^−1^"],
        rows: [
          ["Be", "900", "1 757", "2 657"],
          ["Mg", "738", "1 451", "2 189"],
          ["Ca", "590", "1 145", "1 735"],
          ["Sr", "550", "1 064", "1 614"],
          ["Ba", "503", "965", "1 468"],
        ],
      },
      {
        k: "figure",
        kind: "ie-down",
        caption:
          "Down group 1 the atoms stack on shells: the outer electron sits further out, more inner shells shield it, and the first ionisation energy falls at every step — 519, 494, 418 kJ mol^−1^.",
      },
      {
        k: "wow",
        text: "Lithium and caesium both lose exactly one outer s-electron — yet caesium pays 376 kJ mol^−1^ where lithium pays 519. Nothing about the charge changed; the distance and the shielding did all the work.",
      },
    ],
  },
  {
    spec: "8.12",
    statement:
      "understand reasons for the trend in reactivity of the elements down Group 1 (Li to K) and Group 2 (Mg to Ba)",
    title: "Reactivity down the groups",
    blocks: [
      {
        k: "bullets",
        items: [
          "The reactivity of elements ==increases down the group== because of the tendency of elements to lose electron increases down the group. This is because ionization energy decreases, meaning less energy is required to form the cations.",
          "Group I elements are more reactive than Group II because Group I elements can lose electrons easily and are more metallic.",
        ],
      },
      {
        k: "note",
        label: "The chain to quote",
        text: "bigger atom → more shielding → lower ionisation energy → the outer electron is lost more readily → reactivity increases.",
      },
    ],
  },
  {
    spec: "8.13",
    statement:
      "know the reactions of the elements of Group 1 (Li to K) and Group 2 (Mg to Ba) with oxygen, chlorine and water",
    title: "Reactions with oxygen, chlorine and water",
    blocks: [
      { k: "h", text: "Oxygen" },
      {
        k: "p",
        text: "S-block elements react readily with oxygen to form solid metal oxides.",
      },
      {
        k: "table",
        caption: "With oxygen — the class note's general equations",
        head: ["", "Group I metal with oxygen", "Group II metal with oxygen"],
        rows: [
          ["General equation", "4M(s) + O~2~(g) → 2M~2~O(s)", "M(s) + O~2~(g) → MO(s)"],
          [
            "Products",
            "products are oxides containing M^+^ and O^2−^ ions",
            "products are oxides containing M^2+^ and O^2−^ ions",
          ],
        ],
      },
      { k: "h", text: "Chlorine" },
      {
        k: "p",
        text: "All s-block elements react with chlorine to form ==ionic chlorides== except beryllium. The ionic chlorides of Group I and II are soluble in water.",
      },
      {
        k: "table",
        caption: "With chlorine — same pattern, one chloride more",
        head: ["", "Group I metal with chlorine", "Group II metal with chlorine"],
        rows: [
          ["General equation", "2M(s) + Cl~2~(g) → 2MCl(s)", "M(s) + Cl~2~(g) → MCl~2~(s)"],
          [
            "Products",
            "products are chlorides containing M^+^ and Cl^−^ ions",
            "products are chlorides containing M^2+^ and Cl^−^ ions",
          ],
        ],
      },
      { k: "h", text: "Water" },
      {
        k: "p",
        text: "S-block elements react with water to produce ==alkaline metal hydroxide== and hydrogen.",
      },
      {
        k: "p",
        text: "Group 1: the general equation is",
      },
      { k: "eq", eq: "2M(s) + 2H~2~O(l) → 2MOH(aq) + H~2~(g)" },
      {
        k: "bullets",
        items: [
          "Lithium — when a small piece of lithium is added to a beaker or trough of water, it floats on the surface of the water (density is half of that of water), gently fizzing and giving off hydrogen. It gradually reacts and disappears forming a colorless solution of lithium hydroxide.",
          "Sodium — when sodium is added to water, the sodium melts to form a ball that moves around on the surface. It fizzes rapidly, and the hydrogen produced may burn with an orange flame (the colour is due to the contamination of hydrogen flame with sodium compounds) before the sodium disappears. The flame is caused by the heat of the reaction igniting the hydrogen.",
          "Potassium — potassium behaves rather like sodium except that the reaction is faster and enough heat is given off to set light to the hydrogen. When potassium is added to water, the metal melts and floats. It moves around very quickly on the surface of the water. The hydrogen ignites instantly. The metal is also set on fire, with sparks and a ==lilac flame==.",
        ],
      },
      {
        k: "eq",
        eq: "2Li(s) + 2H~2~O(l) → 2LiOH(aq) + H~2~(g)",
        note: "Lithium — floats, fizzes gently, disappears into a colourless solution.",
      },
      {
        k: "eq",
        eq: "2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)",
        note: "Sodium — melts into a ball, fizzes rapidly, the hydrogen may burn with an orange flame.",
      },
      {
        k: "eq",
        eq: "2K(s) + 2H~2~O(l) → 2KOH(aq) + H~2~(g)",
        note: "Potassium — faster again; the hydrogen ignites instantly and the metal burns with a lilac flame.",
      },
      {
        k: "p",
        text: "Group II: the general equation for all these reactions is",
      },
      { k: "eq", eq: "M(s) + 2H~2~O(l) → M(OH)~2~ + H~2~(g)" },
      {
        k: "bullets",
        items: [
          "Magnesium reacts very slowly with cold water to form magnesium hydroxide and hydrogen gas.",
        ],
      },
      { k: "eq", eq: "Mg(s) + 2H~2~O(l) → Mg(OH)~2~(s) + H~2~(g)" },
      { k: "h", text: "Magnesium and steam" },
      {
        k: "bullets",
        items: [
          "Magnesium reacts differently when heated in steam.",
          "It rapidly forms magnesium oxide (a white solid) and hydrogen gas in a vigorous reaction.",
        ],
      },
      {
        k: "eq",
        eq: "Mg(s) + H~2~O(g) → MgO(s) + H~2~(g)",
        note: "The hydrogen formed is burned as it leaves the tube. This is for safety reasons to prevent the escape of highly flammable gas into the laboratory.",
      },
      {
        k: "p",
        text: "Calcium, strontium and barium react rapidly with cold water to form the metal hydroxide and hydrogen gas:",
      },
      {
        k: "eq",
        eq: "Ca(s) + 2H~2~O(l) → Ca(OH)~2~(s) + H~2~(g)        Sr(s) + 2H~2~O(l) → Sr(OH)~2~(aq) + H~2~(g)        Ba(s) + 2H~2~O(l) → Ba(OH)~2~(aq) + H~2~(g)",
      },
      {
        k: "wow",
        text: "One trend, three stages of drama: lithium fizzes politely, sodium ignites its hydrogen orange, potassium catches fire with a lilac flame — the reactivity ladder and the falling ionisation energies are the same ladder.",
      },
    ],
  },
  {
    spec: "8.14",
    statement:
      "know the reactions of: i oxides of Group 1 and 2 elements with water and dilute acid ii hydroxides of Group 1 and 2 elements with dilute acid",
    title: "Oxides and hydroxides with water and acids",
    blocks: [
      { k: "h", text: "Oxides with water" },
      {
        k: "p",
        text: "Group one and two oxides are classified as ==basic oxides== (beryllium oxide/hydroxide is ==amphoteric==). They react with water to form alkaline hydroxides.",
      },
      {
        k: "table",
        caption: "Group I oxides with water",
        head: ["Group I oxide", "Nature of oxide", "Reaction with water"],
        rows: [
          ["M~2~O (Li~2~O, Na~2~O, K~2~O…)", "Basic", "M~2~O(s) + H~2~O(l) → 2MOH(aq)"],
        ],
      },
      {
        k: "table",
        caption: "Group II oxides with water",
        head: ["Group II oxide", "Nature of oxide", "Reaction with water"],
        rows: [
          ["MO (in general)", "Basic", "MO(s) + H~2~O(l) → M(OH)~2~(aq)"],
          [
            "MgO(s)",
            "Basic",
            "reacts very slowly and incompletely to form a slightly alkaline suspension of Mg(OH)~2~ — MgO(s) + H~2~O(l) → Mg(OH)~2~(s), a white ppt",
          ],
          ["CaO(s)", "Basic", "CaO(s) + H~2~O(l) → Ca(OH)~2~(s) — a cloudy suspension"],
        ],
      },
      { k: "h", text: "Oxides and hydroxides with acids" },
      {
        k: "bullets",
        items: [
          "All of the Group 1 and 2 oxides and hydroxides behave as bases and react with acids to form salts and water.",
          "These reactions can be described as neutralization reactions.",
          "During the reactions, the only observations to be made are that a white solid reacts to form a colourless solution.",
          "The reactions are ==highly exothermic==.",
        ],
      },
      {
        k: "worked",
        title: "Worked example · oxides and hydroxides with acids",
        question:
          "Write balanced equations for the reaction between: (a) sodium oxide and dilute sulfuric acid  (b) barium hydroxide and hydrochloric acid",
        steps: [
          "(a) Sodium oxide is a basic oxide: one Na~2~O neutralises one H~2~SO~4~, and the sulfate needs two Na^+^ → Na~2~O + H~2~SO~4~ → Na~2~SO~4~ + H~2~O.",
          "(b) Ba(OH)~2~ carries two OH^−^, so it takes two HCl to make two water molecules → Ba(OH)~2~ + 2HCl → BaCl~2~ + 2H~2~O.",
        ],
        answer:
          "(a) Na~2~O + H~2~SO~4~ → Na~2~SO~4~ + H~2~O  ·  (b) Ba(OH)~2~ + 2HCl → BaCl~2~ + 2H~2~O",
      },
    ],
  },
  {
    spec: "8.15",
    statement:
      "know the trends in solubility of the hydroxides and sulfates of Group 2 elements",
    title: "Solubility of Group 2 hydroxides and sulfates",
    blocks: [
      {
        k: "bullets",
        items: [
          "Solubility of group 2 hydroxides ==increases down the group==.",
          "Solubility of group 2 sulfates ==decreases down the group==.",
        ],
      },
      {
        k: "table",
        caption: "The two ladders, rung by rung",
        head: ["Group 2 hydroxide", "Solubility", "Group 2 sulfate", "Solubility"],
        rows: [
          ["Be(OH)~2~", "insoluble", "BeSO~4~", "very soluble"],
          ["Mg(OH)~2~", "sparingly soluble", "MgSO~4~", "quite soluble"],
          ["Ca(OH)~2~", "slightly soluble", "CaSO~4~", "slightly soluble"],
          ["Sr(OH)~2~", "quite soluble", "SrSO~4~", "sparingly soluble"],
          ["Ba(OH)~2~", "very soluble", "BaSO~4~", "insoluble"],
        ],
      },
      {
        k: "figure",
        kind: "g2-solubility",
        caption:
          "The two solubility ladders run opposite ways: barium hydroxide dissolves freely while barium sulfate will not dissolve at all — which is exactly why BaSO~4~ makes such a clean test for sulfate ions.",
      },
      {
        k: "note",
        label: "From the class note's discussion",
        text: "Why is milk of magnesia used as an antacid? Why is it called milk of Magnesia? Is it safe to use?",
      },
    ],
  },
  {
    spec: "8.16",
    statement:
      "understand the reasons for the trends in thermal stability of the nitrates and the carbonates of the elements in Groups 1 and 2 in terms of the size and charge of the cations involved",
    title: "Thermal stability and polarising power",
    blocks: [
      {
        k: "def",
        term: "Thermal stability",
        text: "Thermal stability is a term that indicates how stable a compound is when it is heated. If it does not decompose at all, it is very thermally stable. If it decomposes as much as possible then it is not thermally stable.",
      },
      {
        k: "p",
        text: "The stabilities of the nitrate and carbonate anions are influenced by the ==size and charge of the cations== present. Smaller and more highly charged cations affect these anions more.",
      },
      {
        k: "bullets",
        items: [
          "Cations with small size and high charge have a higher ==polarizing power==.",
          "So they can polarize the anion more effectively, which weakens the bonds in anions.",
          "This assists decomposition and makes the compound less stable to heat.",
        ],
      },
      { k: "h", text: "Down the group" },
      {
        k: "bullets",
        items: [
          "Size of the cation increases and charge density decreases.",
          "So polarizing power decreases.",
          "The cation cannot polarize the anion effectively.",
          "So the bonds in the anion are not weakened.",
          "As the degree of covalency decreases, the strength of the ionic lattice increases.",
          "Therefore, more energy is required to break the lattice structure.",
        ],
      },
      { k: "h", text: "Across the period, from Group I to II" },
      {
        k: "bullets",
        items: [
          "Group 2 cations are smaller in size than group 1 cations.",
          "Charge on group 2 cations are higher.",
          "So, polarizing power of group 2 cations are larger.",
          "They can polarize the anion more effectively, weakening the bonds in it.",
          "So less energy is required to break the bonds.",
        ],
      },
      {
        k: "p",
        text: "The cation with the greatest influence (biggest charge and smaller size) on an anion is ==Be^2+^==, and the one with the least influence (smallest charge and largest size) is ==Cs^+^==.",
      },
      {
        k: "figure",
        kind: "polarise",
        caption:
          "A small, highly charged cation pulls hardest on the anion's electron cloud: the O–C bonds inside the carbonate weaken and the compound decomposes more easily. A large, lowly charged cation barely distorts the anion — the lattice survives heating.",
      },
      {
        k: "wow",
        text: "One idea runs this whole topic: small and highly charged means polarising, and polarising means decomposing. It explains the nitrates, the carbonates, the lithium exceptions — and why the trend flips again between Group 1 and Group 2.",
      },
    ],
  },
  {
    spec: "8.17",
    statement:
      "understand the formation of characteristic flame colours by Group 1 and 2 compounds in terms of electron transitions",
    title: "Flame colours and electron transitions",
    blocks: [
      {
        k: "p",
        text: "The flame test is an important test to identify the metal cation present in a compound.",
      },
      { k: "h", text: "Origin of flame colours" },
      {
        k: "bullets",
        items: [
          "Metal cations of the metals in Groups I and II give characteristic colours.",
          "This arises due to ==electronic transitions== within the cation.",
          "When a compound is heated, electrons gain energy and move to higher energy levels. This is commonly referred as ==excitation== of electrons.",
          "Excited electrons in higher energy levels are not stable. So, they fall back to the ground state, emitting energy in the form of light.",
          "The light emitted is of a characteristic frequency and hence colour depends on the energy level difference between the two shells.",
        ],
      },
      {
        k: "figure",
        kind: "flame-etc",
        caption:
          "Heat lifts an electron to a higher energy level (excitation); the excited electron is unstable and falls back to the ground state, emitting light whose frequency — and therefore colour — is fixed by the energy gap between the two shells.",
      },
    ],
  },
  {
    spec: "8.18",
    statement:
      "know experimental procedures to show: i patterns in the thermal decomposition of Group 1 and 2 nitrates and carbonates ii flame colours in compounds of Group 1 and 2 elements. Students will be expected to know tests for carbon dioxide and oxygen; and to recognize nitrogen dioxide by its colour and acidic pH.",
    title: "Experimental procedures: decomposition patterns and flame tests",
    blocks: [
      { k: "h", text: "i · Patterns in thermal decomposition" },
      { k: "h", text: "Decomposition of Group I and II nitrates" },
      {
        k: "p",
        text: "All Group I nitrates, except LiNO~3~, decompose to form metal nitrites, XNO~2~ (pale yellow solid) and oxygen gas. LiNO~3~ decomposes to form lithium oxide, nitrogen dioxide and oxygen — the greater decomposition.",
      },
      {
        k: "eq",
        eq: "2XNO~3~(s) → 2XNO~2~(s) + O~2~(g)",
        note: "2NaNO~3~(s) → 2NaNO~2~(s) + O~2~(g) — the lesser decomposition  ·  4LiNO~3~(s) → 2Li~2~O(s) + 4NO~2~(g) + O~2~(g) — the greater decomposition",
      },
      {
        k: "p",
        text: "All Group II nitrates decompose to form metal oxide, nitrogen dioxide (a ==brown gas==) and oxygen. Group I and II nitrates are white solids.",
      },
      { k: "eq", eq: "2X(NO~3~)~2~(s) → 2XO(s) + 4NO~2~(g) + O~2~(g)" },
      {
        k: "table",
        caption: "Observations on heating the nitrates",
        head: ["Nitrate", "Observation"],
        rows: [
          ["4LiNO~3~(s)", "brown fumes"],
          ["2NaNO~3~(s)", "no brown fumes"],
          ["2KNO~3~(s)", "no brown fumes"],
          ["2RbNO~3~(s)", "no brown fumes"],
          ["2CsNO~3~(s)", "no brown fumes"],
          ["2Be(NO~3~)~2~(s)", "brown fumes"],
          ["2Mg(NO~3~)~2~(s)", "brown fumes"],
          ["2Ca(NO~3~)~2~(s)", "brown fumes"],
          ["2Sr(NO~3~)~2~(s)", "brown fumes"],
          ["2Ba(NO~3~)~2~(s)", "brown fumes"],
        ],
      },
      { k: "h", text: "Decomposition of Group I and II carbonates" },
      {
        k: "p",
        text: "Group 1 carbonates are stable to heat except lithium carbonate, which decomposes in a similar manner to group 2 carbonates. Lithium carbonate decomposes when heated because the ==Li^+^ cation is very small== and polarizes the O–C bond in the CO~3~^2−^ ion sufficiently for it to break and form an O^2−^ ion.",
      },
      {
        k: "eq",
        eq: "X~2~CO~3~(s) → X~2~O(s) + CO~2~(g)        XCO~3~(s) → XO(s) + CO~2~(g)",
        note: "Li~2~CO~3~(s) → Li~2~O(s) + CO~2~(g) — decomposes on heating; Na~2~CO~3~, K~2~CO~3~, Rb~2~CO~3~ and Cs~2~CO~3~ do not decompose at Bunsen temperatures.",
      },
      {
        k: "p",
        text: "All Group II carbonates except barium carbonate decompose to give metal oxide and carbon dioxide. Barium carbonate does not decompose at Bunsen temperatures.",
      },
      {
        k: "worked",
        title: "Worked example · applying the decomposition patterns",
        question: "Complete the equations: (a) 2KNO~3~(s) →   (b) SrCO~3~(s) →",
        steps: [
          "(a) Potassium sits beyond lithium in Group 1 — its nitrate takes the nitrite path: nitrate → nitrite + oxygen.",
          "(a) 2KNO~3~(s) → 2KNO~2~(s) + O~2~(g) — no brown fumes, just like sodium.",
          "(b) Strontium is a Group 2 carbonate that still decomposes: carbonate → oxide + carbon dioxide.",
          "(b) SrCO~3~(s) → SrO(s) + CO~2~(g).",
        ],
        answer: "(a) 2KNO~3~ → 2KNO~2~ + O~2~  ·  (b) SrCO~3~ → SrO + CO~2~",
      },
      { k: "h", text: "The experiment" },
      {
        k: "p",
        text: "The relative ease of decomposition of group 2 carbonates and nitrates can be studied by the following experiment.",
      },
      {
        k: "steps",
        caption: "Studying thermal decomposition",
        items: [
          { title: "Same amounts", text: "Place the same amount of each of the salts in a series of hard glass test tubes." },
          { title: "Delivery tube", text: "Fix a delivery tube to the test tube and clamp in a stand." },
          { title: "Heat and time", text: "Light the burner and measure the time taken for the gas evolved to reach the mark on the test tube in the water bath." },
          { title: "Repeat", text: "Repeat the experiments by changing the salts." },
        ],
      },
      {
        k: "figure",
        kind: "thermal-exp",
        caption:
          "The gas evolved is collected over water in a test tube carrying a mark: the faster the carbonate or nitrate decomposes, the sooner the gas reaches the mark.",
      },
      { k: "h", text: "ii · Flame colours" },
      {
        k: "steps",
        caption: "Flame test procedure",
        items: [
          {
            title: "Safety first",
            text: "Wear safety glasses and a lab coat. Within a fume cupboard light a Bunsen burner.",
          },
          {
            title: "Make a chloride",
            text: "Using a dropper, add a few drops of concentrated hydrochloric acid to the solid and mix together so that the metal compound begins to dissolve. One reason for using hydrochloric acid is to convert any metal compound to a chloride — ==chlorides are more volatile== than other salts so are more likely to give better results.",
          },
          {
            title: "Dip the wire",
            text: "Dip a clean metal wire (platinum or nichrome) or silica rod into the mixture to obtain a sample of the compound.",
          },
          {
            title: "Read the colour",
            text: "Hold the end of wire or rod in the flame and observe the colour.",
          },
        ],
      },
      {
        k: "figure",
        kind: "flame-colours",
        caption:
          "The characteristic flame colours of the Group 1 and 2 cations — each colour is the photon energy of that cation's electron transitions. Magnesium compounds give no colour at all.",
      },
    ],
  },
  {
    spec: "8.19",
    statement:
      "know reactions, including ionic equations where appropriate, for identifying: i carbonate ions, CO~3~^2−^, and hydrogencarbonate ions, HCO~3~^−^, using an aqueous acid to form carbon dioxide (and testing the gas with limewater) ii sulfate ions, SO~4~^2−^, using acidified barium chloride solution iii ammonium ions, NH~4~^+^, using sodium hydroxide solution and warming to form ammonia (and testing with litmus and HCl fumes)",
    title: "Tests for ions",
    blocks: [
      {
        k: "table",
        caption: "The class note's ion tests, in full",
        head: ["Ion", "Test", "Observations", "Equations"],
        rows: [
          [
            "Ammonium — NH~4~^+^",
            "Add aqueous sodium hydroxide and warm",
            "pungent smell (NH~3~); damp litmus paper turns blue; or dense white smoke is formed (NH~4~Cl) when passed over hydrogen chloride gas",
            "NH~4~^+^(aq) + OH^−^(aq) → NH~3~(g) + H~2~O(l)  ·  NH~3~(g) + HCl(g) → NH~4~Cl(s)",
          ],
          [
            "Carbonate CO~3~^2−^ or hydrogencarbonate HCO~3~^−^",
            "Add dilute acid (HCl, H~2~SO~4~ or HNO~3~)",
            "effervescence (CO~2~); the gas turns limewater (Ca(OH)~2~) milky (CaCO~3~)",
            "CO~3~^2−^(aq) + 2H^+^(aq) → CO~2~(g) + H~2~O(l)  ·  CO~2~(g) + Ca(OH)~2~(aq) → CaCO~3~(s) + H~2~O(l)",
          ],
          [
            "Sulfate — SO~4~^2−^",
            "To a solution of a compound, add aqueous barium chloride followed by dilute hydrochloric acid or nitric acid",
            "white ppt (BaSO~4~), insoluble in hydrochloric acid",
            "Ba^2+^(aq) + SO~4~^2−^(aq) → BaSO~4~(s)",
          ],
        ],
      },
      {
        k: "note",
        label: "Why the acid in the sulfate test",
        text: "There are other ions that could form white precipitate with barium ions, especially carbonate ions, so in the test there must be H^+^ ions present to prevent barium carbonate from forming as a white precipitate. Dilute nitric acid or dilute hydrochloric acid is therefore added as part of the test.",
      },
    ],
  },
  {
    spec: "8.20",
    statement:
      "be able to calculate solution concentrations, in mol dm^−3^ and g dm^−3^, including simple acid-base titrations using the indicators methyl orange and phenolphthalein",
    title: "Calculating solution concentrations",
    blocks: [
      {
        k: "def",
        term: "Volumetric analysis",
        text: "The quantitative investigation of chemical reactions by comparing reacting volumes is known as volumetric analysis. The procedure by which reacting volumes are determined is known as a ==titration==. One substance needed in a titration is a standard solution.",
      },
      {
        k: "p",
        text: "Volumetric analysis can be used to determine:",
      },
      {
        k: "bullets",
        items: [
          "concentration of a solution",
          "formula of a compound",
          "number of moles of a substance",
          "percentage yield of a substance",
          "percentage purity of a substance",
          "water of crystallization of a substance",
        ],
      },
      {
        k: "table",
        caption: "The apparatus and what each piece is for",
        head: ["Apparatus", "Use"],
        rows: [
          ["Pipette", "designed to deliver a fixed volume accurately"],
          ["Pipette filler", "used to fill the pipette"],
          ["Burette", "designed to deliver definite but variable volumes of liquid"],
          ["Conical flask", "used to mix solutions"],
          ["Volumetric flask", "used to prepare standard solutions"],
          ["Beaker", "used to measure solutions approximately"],
          ["Funnel", "used to transfer solutions without spilling"],
          ["Dropper", "used to deliver small volumes of solution"],
          ["White tile", "used to show the colour changes clearly at the end point"],
          ["Stand", "used to attach the burette"],
        ],
      },
      {
        k: "figure",
        kind: "titration-rig",
        caption:
          "The titration set-up: the burette delivers variable volumes, the pipette fixed ones, and the white tile makes the indicator's end-point colour jump visible.",
      },
      {
        k: "steps",
        caption: "Calculations in titration",
        items: [
          { title: "Step 1", text: "Write a balanced chemical equation." },
          {
            title: "Step 2",
            text: "Calculate the amount/moles of the reagent of known concentration. Amount of substance = concentration × volume — n = c × v.",
          },
          {
            title: "Step 3",
            text: "Calculate the number of moles of the unknown substance, using the ratio given in the balanced chemical equation.",
          },
          {
            title: "Step 4",
            text: "Calculate the concentration of the unknown solution. Concentration = moles / volume — c = n / v.",
          },
        ],
      },
      {
        k: "worked",
        title: "Worked example · the mean titre from concordant titres",
        question:
          "A titration gave titres of 22.60 cm^3^, 22.70 cm^3^ and 22.65 cm^3^. Titres 2, 3 and 4 are all within 0.20 cm^3^ of each other, so are concordant. Calculate the mean titre.",
        steps: [
          "Only concordant values must be selected to calculate the mean titre — titre 1, the rough first run, is left out.",
          "Mean = (22.60 + 22.70 + 22.65) / 3 = 22.65 cm^3^.",
        ],
        answer: "Mean titre = 22.65 cm^3^",
      },
      {
        k: "worked",
        title: "Worked example · the titration calculation",
        question:
          "Calculate the concentration of sodium hydroxide solution using the information: volume of sodium hydroxide used = 25.0 cm^3^; volume of sulfamic acid used = 22.65 cm^3^; concentration of the sulfamic acid solution = 0.0985 mol dm^−3^. The equation for the reaction is NaOH(aq) + NH~2~SO~3~H(aq) → NH~2~SO~3~Na(aq) + H~2~O(l).",
        steps: [
          "Step 1 — calculate the amount of the reagent of known concentration: n = c × v = 0.0985 × 22.65 / 1000 = 2.231 × 10^−3^ mol.",
          "Step 2 — the ratio in the balanced equation is 1 : 1, so n(NaOH) = 2.231 × 10^−3^ mol.",
          "Step 3 — calculate the concentration of the unknown solution: c = n / v = 2.231 × 10^−3^ / 0.0250 = 0.0892 mol dm^−3^.",
        ],
        answer: "c(NaOH) = 0.0892 mol dm^−3^",
      },
      {
        k: "worked",
        title: "Worked example · mol dm^−3^ into g dm^−3^",
        question: "Calculate the concentration in g dm^−3^ of a 0.152 mol dm^−3^ solution of NaOH.",
        steps: [
          "Molar mass of NaOH = 23.0 + 16.0 + 1.0 = 40.0 g mol^−1^.",
          "Multiply by the molar mass to switch units: 0.152 × 40.0 = 6.08 g dm^−3^.",
        ],
        answer: "6.08 g dm^−3^",
      },
    ],
  },
  {
    spec: "8.21",
    statement: "CORE PRACTICAL 3: Finding the concentration of a solution of hydrochloric acid.",
    title: "Core Practical 3 — the titration method",
    blocks: [
      {
        k: "p",
        text: "A titration is a practical method with the aim of measuring the volumes of two solutions that react together, and using the results to calculate the concentration of one of the solutions. It involves having one solution in a burette and pipetting a known volume of the other solution (standard solution) into a conical flask. An indicator is then added to the solution in the conical flask and is titrated from the burette until the indicator changes colour.",
      },
      {
        k: "table",
        caption: "Key vocabulary",
        head: ["Term", "Meaning"],
        rows: [
          [
            "Equivalence point",
            "the point at which there are exactly the right amounts of substances to complete the reaction",
          ],
          [
            "End point",
            "the point at which the indicator just changes colour; ideally the end point should coincide with the equivalence point",
          ],
          [
            "Meniscus",
            "the curving of the upper surface of the liquid in a container — the lowest (horizontal) part of the meniscus should be read",
          ],
          ["Titre", "the volume added from the burette during a titration"],
          [
            "Concordant titres",
            "titres that are close together (usually within 0.20 cm^3^ of each other)",
          ],
        ],
      },
      {
        k: "bullets",
        items: [
          "Add the acid to the alkali or vice versa until the equivalence point of the titration and the end point of the indicator is reached.",
          "Record the burette reading using the lowest part of the meniscus.",
          "Calculate the titre.",
          "Repeat the titration until concordant titres are obtained.",
        ],
      },
      {
        k: "steps",
        caption: "Titration method (sulfamic acid and sodium hydroxide)",
        items: [
          { title: "Rinse the flask", text: "Rinse the conical flask with deionized water and place it on a white tile." },
          {
            title: "Rinse the pipette",
            text: "Using a pipette filler, rinse the pipette with deionized water and then with some of the sodium hydroxide solution.",
          },
          {
            title: "Transfer 25.0 cm^3^",
            text: "Use the pipette to transfer 25.0 cm^3^ of the sodium hydroxide solution to the conical flask.",
          },
          { title: "Add the indicator", text: "Add about 3 drops of methyl orange indicator." },
          {
            title: "Rinse the burette",
            text: "Rinse the burette with deionized water and then with sulfamic acid solution.",
          },
          {
            title: "Fill and record",
            text: "Fill the burette with sulfamic acid solution and set it up in the stand above the conical flask. Record the burette reading.",
          },
          {
            title: "Titrate",
            text: "Add the sulfamic acid solution to the conical flask until the indicator just changes colour, and again record the burette reading.",
          },
          {
            title: "Repeat to concordance",
            text: "Empty and rinse the conical flask with deionized water, and repeat the titration until concordant titres have been obtained.",
          },
        ],
      },
      {
        k: "p",
        text: "Indicators are substances whose solutions change color due to changes in pH (by adding acid or alkali). Two common indicators are methyl orange and phenolphthalein.",
      },
    ],
  },
  {
    spec: "8.22",
    statement:
      "understand how to minimize the sources of measurement uncertainty in volumetric analysis and estimate the overall uncertainty in the calculated result",
    title: "Mistakes, errors and measurement uncertainty",
    blocks: [
      {
        k: "def",
        term: "Mistake",
        text: "A mistake is something that a skilled operator can avoid by being careful.",
      },
      {
        k: "bullets",
        items: [
          "A chemist weighs a beaker on a balance without making sure the balance is tared (set to zero) beforehand. The reading on the balance could be very different from the actual mass of the beaker.",
          "A student sees a burette reading of 27.35 cm^3^ but writes it down as 23.75 cm^3^. This is the student's mistake, and nothing to do with the apparatus.",
        ],
      },
      {
        k: "def",
        term: "Error",
        text: "Error is something that even a skilled operator would find difficult to avoid, and is a consequence of the way the apparatus has been constructed and how readings can be made using it.",
      },
      {
        k: "p",
        text: "Measurement errors can be divided into random errors and systematic errors:",
      },
      {
        k: "table",
        caption: "The two error families",
        head: ["Term", "Meaning"],
        rows: [
          [
            "Random error",
            "this is an error caused by unpredictable changes in conditions such as temperature or pressure, or by a difference in recording that is difficult to get exactly right",
          ],
          [
            "Systematic error",
            "this is an error caused by the apparatus, and leads to the recorded value being either too low or too high",
          ],
        ],
      },
      {
        k: "def",
        term: "Accuracy",
        text: "Accuracy is a measure of how close values are to the accepted or correct value.",
      },
      {
        k: "bullets",
        items: [
          "If the pipette is wrongly calibrated, it is not accurate even if it is precise. It delivers the same amount of liquid but not the amount it claims to have delivered.",
        ],
      },
      {
        k: "def",
        term: "Precision",
        text: "Precision is a measure of how close values are to each other.",
      },
      {
        k: "bullets",
        items: [
          "Burette is a precise device to deliver variable amounts of a liquid measured to the nearest 0.05 cm^3^.",
          "Pipette is a precise device to deliver a fixed amount of a liquid, usually 25.0 cm^3^ or 10.0 cm^3^.",
        ],
      },
      {
        k: "figure",
        kind: "titre-targets",
        caption:
          "Titre values as an archery competition: student A is precise but not accurate (a systematic error sits in the apparatus), student B is neither — yet a lucky mean lands close — and student C is both accurate and precise.",
      },
      {
        k: "table",
        caption: "The three students, in the class note's words",
        head: ["Student", "What the titres show"],
        rows: [
          [
            "Student A",
            "titres that are all concordant, but the mean is 0.57 cm^3^ higher than the correct value. This suggests that the titrations have been carefully carried out, but there is probably something about the apparatus (a systematic error) that is responsible for the large difference from the correct titre value. Therefore, the titre values are precise but not accurate.",
          ],
          [
            "Student B",
            "no concordant titres but the mean is within 0.07 cm^3^ of the correct value. This suggests that the titrations have been carelessly done. But the student has been lucky because the mean happens to be close to the correct value. This is called random error. This means, even though each individual titre is not accurate, and all of them are not precise, the mean titre is accurate.",
          ],
          [
            "Student C",
            "titres that are all concordant, and the mean is within 0.03 cm^3^ of the correct value. This suggests that the titrations have been carefully done and that the apparatus used is of the same standard as the apparatus used by the teacher to obtain the correct value. Hence, the titre values are both accurate and precise.",
          ],
        ],
      },
      { k: "h", text: "Measurement uncertainty" },
      {
        k: "def",
        term: "Measurement uncertainty",
        text: "It is the potential error involved when using a piece of apparatus to make a measurement. The size of measurement uncertainty is determined by the ==precision of the apparatus==.",
      },
      {
        k: "bullets",
        items: [
          "Digital balances can have various degree of precision. A balance that measures to three decimal places is more precise than one that measures to only one decimal place.",
          "The greater the degree of precision of the balance, the smaller the measurement uncertainty in the recorded mass.",
        ],
      },
      {
        k: "eq",
        eq: "% uncertainty = (actual measurement uncertainty ÷ value recorded) × 100",
      },
      {
        k: "worked",
        title: "Worked example · percentage uncertainty on a balance",
        question:
          "Mass of marble chips = 3.57 g. The measurement uncertainty in a two decimal place balance is ±0.005 g. Calculate the percentage uncertainty.",
        steps: [
          "The ±0.005 g uncertainty has to be counted twice — there is a ±0.005 g uncertainty when calibrating the balance to zero, as well as a ±0.005 g uncertainty when measuring mass.",
          "So the percentage uncertainty is ± (2 × 0.005 × 100) / 3.57 = ±0.28%.",
        ],
        answer: "±0.28%",
      },
      {
        k: "worked",
        title: "Worked example · the overall uncertainty",
        question:
          "A concentration of 0.118 mol dm^−3^ has been calculated from a titration that has involved balance and glassware uncertainties: balance ±0.09%, volumetric flask ±0.12%, pipette ±0.24%, burette ±0.47%. Quote the final value.",
        steps: [
          "Total measurement uncertainty is obtained by adding together the individual uncertainties: 0.09 + 0.12 + 0.24 + 0.47 = ±0.92%.",
          "There is an overall uncertainty in the concentration of 0.92% of 0.118, which is about ±0.001 — so the final value is quoted as 0.118 ± 0.001 mol dm^−3^ (the exact value is in the range 0.117–0.119 mol dm^−3^).",
        ],
        answer: "Concentration = 0.118 ± 0.001 mol dm^−3^",
      },
      { k: "h", text: "Minimizing uncertainty and errors" },
      {
        k: "bullets",
        items: [
          "Percentage uncertainty can be minimized by using a higher value rather than a lower one. For example, in using a balance, weighing a sample of 5 g will lead to a much lower percentage uncertainty than weighing a 0.5 g sample.",
          "Minimizing random errors: for example, in a thermochemistry experiment, minimizing heat loss will reduce random errors in the measurement of temperature change.",
        ],
      },
      {
        k: "wow",
        text: "A mistake is yours to make and yours to avoid; an error belongs to the apparatus. Concordant titres average the random error away — only a properly calibrated burette can touch the systematic kind.",
      },
    ],
  },
  {
    spec: "8.23",
    statement:
      "CORE PRACTICAL 4: Preparation of a standard solution from a solid acid and use it to find the concentration of a solution of sodium hydroxide.",
    title: "Core Practical 4 — preparing a standard solution",
    blocks: [
      {
        k: "def",
        term: "Standard solution",
        text: "A standard solution is a solution whose concentration is ==accurately known==. One way to prepare a standard solution is to take a known mass of a substance (primary standards) and dissolve it in water to make a known volume of solution.",
      },
      {
        k: "p",
        text: "These substances are known as ==primary standards==. Ideally primary standards should:",
      },
      {
        k: "bullets",
        items: [
          "be solids with high molar masses",
          "be available in a high degree of purity",
          "be chemically stable",
          "not absorb water from the atmosphere",
          "be soluble in water",
          "react rapidly and completely with other substances when used in titrations",
        ],
      },
      {
        k: "steps",
        caption: "Preparation of a standard solution",
        items: [
          {
            title: "Weigh by difference",
            text: "Weigh the bottle with the solid, then the empty bottle — the difference is the mass that went into the flask.",
          },
          {
            title: "Dissolve completely",
            text: "Dissolve the solid in deionized water in a beaker, stirring until no crystals remain.",
          },
          {
            title: "Transfer and rinse",
            text: "Pour the solution through a funnel into the volumetric flask, and rinse the beaker and funnel into the flask with deionized water so every trace transfers.",
          },
          {
            title: "Make up to the mark",
            text: "Add deionized water until the bottom of the meniscus sits on the graduation mark, stopper, and shake thoroughly to homogenize.",
          },
        ],
      },
      {
        k: "figure",
        kind: "std-solution",
        caption:
          "From weighed solid to known concentration: dissolve, transfer through a funnel, and make up to the graduation mark of the volumetric flask.",
      },
      {
        k: "worked",
        title: "Worked example · the concentration of a standard solution",
        question:
          "A student used the method to make 500 cm^3^ of a solution of sodium carbonate (M = 106.0 g mol^−1^). These are her weighings: mass of weighing bottle + sodium carbonate = 23.382 g; mass of weighing bottle = 18.21 g. Calculate the concentration of solution made.",
        steps: [
          "Mass of sodium carbonate = 23.382 − 18.21 = 5.172 g — weighing by difference cancels the bottle.",
          "Amount = mass ÷ molar mass = 5.172 / 106.0 = 0.0488 mol.",
          "Concentration = amount ÷ volume = 0.0488 mol / 0.500 dm^3^ = 0.0976 mol dm^−3^.",
        ],
        answer: "c(Na~2~CO~3~) = 0.0976 mol dm^−3^",
      },
    ],
  },
];
