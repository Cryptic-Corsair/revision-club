import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WCH16 · Practical Skills in Chemistry II
   Written paper on the practical work of Topics 11–21.
   ═══════════════════════════════════════════════════════════════ */

export const WCH16_TOPICS: Topic[] = [
  {
    id: "q01",
    no: "01",
    label: "Practical 1",
    title: "Following reactions and finding orders",
    summary:
      "Gas syringes, colorimeters and clock reactions — how a rate becomes a number, how numbers become orders, and how orders become an activation energy.",
    minutes: 18,
    ao: ["AO3"],
    blocks: [
      {
        k: "p",
        text: "A rate needs something to ==measure over time==: gas volume from a syringe, mass loss on a balance, colour intensity in a ==colorimeter==, or a fixed visual end-point in a clock reaction. The examiner's first question is always method choice — match the technique to the reaction before doing any arithmetic.",
      },
      {
        k: "table",
        caption: "Method selection — the matching table",
        head: ["Method", "Best for", "Typical system"],
        rows: [
          ["Gas syringe", "a gas is produced", "Mg + HCl; CaCO~3~ + HCl"],
          ["Mass loss", "a gas escapes the vessel", "same systems, less precise than a syringe"],
          ["Colorimeter", "a coloured reagent or product", "iodination of propanone (I~2~ fades)"],
          ["Clock reaction", "a sharp visual end-point", "iodine clock: I~2~ + starch → blue-black"],
        ],
      },
      {
        k: "def",
        term: "Clock reaction",
        text: "A reaction run with a small fixed amount of a second reagent that “stops the clock” — in the iodine clock, thiosulfate destroys the I~2~ until it is used up, then starch snaps to blue-black. The time t to the end-point gives an ==average rate over that window==, and since the same small amount of iodine is made each run, rate ∝ 1/t.",
      },
      {
        k: "p",
        text: "From concentration–time data, the rate at any moment is the ==gradient of the tangent== — and the initial rate is the tangent at t = 0, the cleanest one you will ever draw. Orders come from comparing initial rates across experiments where one concentration changes and the rest are held constant: ×2 in concentration with ×1 in rate is zero order, ×2 is first, ×4 is second — the arithmetic of Topic 11, rehearsed in the lab.",
      },
      {
        k: "ex",
        title: "Reading orders off clock data",
        steps: [
          "Iodine clock, [H^+^] varied, others fixed: [H^+^] 0.10 → t 42 s; 0.20 → 21 s; 0.40 → 10.5 s.",
          "rate ∝ 1/t, so relative rates are 1 : 2 : 4.",
          "Doubling [H^+^] doubles the rate — first order in H^+^.",
        ],
        answer: "First order in H^+^ — and quoting the 1 : 2 : 4 chain explicitly is what earns the mark.",
      },
      {
        k: "p",
        text: "Temperature extends the same experiment: repeat the clock at several temperatures (same concentrations), compute relative rate 1/t, then plot ==ln(1/t) against 1/T==. Because rate ∝ k at fixed concentrations, the graph is the Arrhenius line of Topic 11: gradient ==−Ea/R==. This combined plot — clock times in, activation energy out — is one of WCH16's favourite full-question arcs.",
      },
      {
        k: "tips",
        items: [
          "Say why the method is precise: a gas syringe reads volume directly and avoids leaks; a mass-loss balance loses gas the moment bubbles form.",
          "State control variables when comparing runs: same total volume, same temperature, same concentration of everything except the one being varied.",
          "1/t is a ==relative== rate. Only with calibration (known iodine amount) does it become mol dm^−3^ s^−1^ — word answers carefully.",
        ],
      },
      {
        k: "recap",
        items: [
          "Pick the method from the reaction's observable: gas, mass, colour, clock.",
          "Clock: fixed end-point, rate ∝ 1/t, initial-rate territory.",
          "Initial rate = tangent at t = 0.",
          "Orders: ×2 → ×1, ×2, ×4 in rate = orders 0, 1, 2.",
          "ln(1/t) vs 1/T → gradient −Ea/R.",
        ],
      },
    ],
  },
  {
    id: "q02",
    no: "02",
    label: "Practical 2",
    title: "Organic preparation, purification and tests",
    summary:
      "Reflux or distil, wash and dry, then prove purity — plus the test-tube battery that names a functional group on sight.",
    minutes: 22,
    ao: ["AO3"],
    blocks: [
      {
        k: "p",
        text: "Preparing an organic liquid is a decision tree. ==Reflux== (vertical condenser, reactant vapours return) when the reaction needs sustained heating without losing volatile material — oxidising a primary alcohol to the acid. ==Distillation== (angled condenser, vapour escapes and is collected) when you want the product out of the flask as it forms — capturing the aldehyde before the oxidant eats it. Same apparatus family, opposite intent; the exam asks you to choose and justify.",
      },
      {
        k: "def",
        term: "Reflux",
        text: "Continuous evaporation–condensation cycling: vapour rises, meets the cold condenser surface, and drips back. The flask may be heated for hours without losing material. Anti-bumping granules prevent violent, uneven boiling (superheating); never add them to a hot liquid.",
      },
      {
        k: "p",
        text: "The work-up after reflux is a fixed sequence, and examiners mark it as one: pour into a ==separating funnel==, wash (aqueous NaHCO~3~ removes acid impurities — vent the CO~2~ pressure!), drain the organic layer, add a ==drying agent== such as anhydrous CaCl~2~ or MgSO~4~ until it stops clumping, decant or filter, then ==redistil== and collect the fraction at the product's boiling point. Each step has a purpose: neutralise, separate, dry, purify.",
      },
      {
        k: "def",
        term: "Purity",
        text: "A pure solid has a ==sharp melting point== that matches the data-book value; impurities lower and broaden it. A pure liquid distils at a single boiling point. TLC offers a third check: one spot, at a known Rf. Quote melting/boiling points ==against the data book== and quote a percentage error if asked to evaluate.",
      },
      {
        k: "table",
        caption: "The test battery — reagent, result, and what it proves",
        head: ["Test", "Positive result", "Proves"],
        rows: [
          ["2,4-DNPH", "orange-yellow precipitate", "C=O present (aldehyde or ketone)"],
          ["Tollens', warmed", "silver mirror", "aldehyde (not ketone)"],
          ["Fehling's, warmed", "brick-red precipitate", "aliphatic aldehyde"],
          ["Bromine water", "decolourised (no catalyst needed)", "C=C (or phenol)"],
          ["NaHCO~3~(aq)", "effervescence, CO~2~ limewater milky", "carboxylic acid"],
          ["I~2~/NaOH, warm", "pale yellow precipitate CHI~3~", "CH~3~CO– or CH~3~CH(OH)– group"],
          ["Warm with NaOH, then AgNO~3~", "cream ppt (Br^−^) / white (Cl^−^) / yellow (I^−^)", "haloalkane identity, by halide"],
        ],
      },
      {
        k: "p",
        text: "Safety answers earn marks by pairing hazard with precaution, named specifically: conc. H~2~SO~4~ is corrosive → wear gloves and add slowly; HBr evolved from PBr~3~ work → ==fume cupboard==; ethanol is flammable → water bath, never a naked flame; NO~x~ from nitration → fume cupboard again. “Take care with acid” is the answer that scores zero; “add the acid dropwise with cooling because the reaction is exothermic” scores.",
      },
      {
        k: "tips",
        items: [
          "Distil vs reflux is a one-mark question with a two-mark answer: name the apparatus *and* the reason (collect the volatile product vs return volatile reactants).",
          "In washing questions, name ==which layer== holds the product (usually the organic layer, but density decides) and what each wash removes.",
          "Dry until the solid stops clumping — “until the drying agent stops sticking together” is the phrase the mark scheme wants.",
        ],
      },
      {
        k: "recap",
        items: [
          "Reflux returns reactants; distillation collects the product.",
          "Work-up: separate → wash → dry (CaCl~2~/MgSO~4~) → redistil.",
          "Purity: sharp, data-book melting point; single TLC spot.",
          "Test battery: DNPH → Tollens' → iodoform → NaHCO~3~.",
          "Safety = named hazard + named precaution.",
        ],
      },
    ],
  },
  {
    id: "q03",
    no: "03",
    label: "Practical 3",
    title: "Observations, titrations and electrochemistry",
    summary:
      "The WCH16 marking language: colours with states, concordant titres, salt bridges, and evaluation answers in three beats.",
    minutes: 20,
    ao: ["AO3"],
    blocks: [
      {
        k: "p",
        text: "Unit 6 is a reading paper over Units 4 and 5, and its dialect is ==precision of observation==. “Blue solution” is not an observation; “pale blue precipitate which dissolves in excess ammonia to give a deep blue solution” is. Practise writing ion–reagent–observation triples until the colours arrive without thought.",
      },
      {
        k: "table",
        caption: "Observation bank — the WCH16 canon",
        head: ["System", "Reagent", "Observation"],
        rows: [
          ["Cu^2+^(aq)", "NaOH(aq)", "pale blue ppt Cu(OH)~2~; insoluble in excess"],
          ["Cu^2+^(aq)", "excess NH~3~(aq)", "ppt dissolves → deep blue [Cu(NH~3~)~4~(H~2~O)~2~]^2+^"],
          ["Fe^2+^(aq)", "NaOH(aq)", "green ppt, browns on standing (oxidation to Fe^3+^)"],
          ["Fe^3+^ (aq)", "NaOH(aq)", "rust-brown ppt"],
          ["MnO~4~^−^ + Fe^2+^", "dilute H~2~SO~4~", "purple → colourless, self-indicating"],
          ["Iodine clock end-point", "starch", "sudden blue-black"],
          ["Carboxylic acid", "NaHCO~3~(aq)", "effervescence; gas turns limewater milky"],
          ["Aldehyde", "Tollens', warm", "silver mirror on the tube wall"],
        ],
      },
      {
        k: "p",
        text: "Titration technique carries over from Unit 3 with new chemistry: rinse the burette with the ==solution it will deliver==, read the meniscus to 0.05 cm^3^, run a rough first, then repeat until two titres agree within ==0.10 cm^3^== and average only those. Permanganate needs dilute H~2~SO~4~ (never HCl — Cl^−^ would be oxidised) and is self-indicating: the first permanent pink is the end-point.",
      },
      {
        k: "p",
        text: "Measuring an EMF is a standard rig and a standard mark scheme: two half-cells (metal in a 1.00 mol dm^−3^ solution of its ions), a ==salt bridge== of KNO~3~ to complete the circuit without reacting, a ==high-resistance voltmeter== so negligible current flows (the reading is then the true EMF), and standard conditions — 298 K, 100 kPa for any gas electrode. Watch a question swap in non-standard concentrations: the EMF shifts, and explaining that shift (Le Chatelier on the half-equation) is the AO3 part.",
      },
      {
        k: "p",
        text: "Evaluation answers have a three-beat structure worth marks on sight: ==name the error== specifically (heat loss through the calorimeter, not “human error”), ==state its effect and direction== (measured ΔH less exothermic than the data book), ==propose a practical improvement== (lid and insulation, or a flame calorimeter). Then close with arithmetic honesty: percentage error against the data-book value, and whether the apparatus resolution could even have detected the difference.",
      },
      {
        k: "tips",
        items: [
          "In every observation answer, colour ==and== state ==and== excess behaviour — three checkboxes, and the mark scheme ticks them separately.",
          "Salt bridge ions must be spectators: KNO~3~ is safe; KCl risks AgCl precipitation and Cl^−^ oxidation — name the interference.",
          "Concordant titres: within 0.10 cm^3^. Average only the concordant set, and say which runs you excluded and why.",
        ],
      },
      {
        k: "recap",
        items: [
          "Observations = colour + state + excess behaviour.",
          "Titres: rough first, concordant within 0.10 cm^3^, average those only.",
          "MnO~4~^−^ in H~2~SO~4~, self-indicating; Cl^−^ forbidden.",
          "EMF rig: salt bridge (KNO~3~), high-resistance voltmeter, 298 K / 100 kPa / 1.00 mol dm^−3^.",
          "Evaluate: error → direction → improvement, then % error.",
        ],
      },
    ],
  },
];
