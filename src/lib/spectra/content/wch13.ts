import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WCH13 · Practical Skills in Chemistry I
   Written paper on the practical work of Topics 1–10.
   ═══════════════════════════════════════════════════════════════ */

export const WCH13_TOPICS: Topic[] = [
  {
    id: "p01",
    no: "01",
    label: "Practical 1",
    title: "Measurement, apparatus and uncertainty",
    summary:
      "Every instrument lies a little. Reading instruments properly, quoting uncertainty, and keeping precision honest.",
    minutes: 18,
    ao: ["AO1", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Practical marks are won in the decimals. Each instrument has a ==resolution== — the smallest change it can show — and each reading you take carries an ==uncertainty==. For analogue scales the uncertainty is ± half the smallest division; for digital displays, ± one in the last digit. A burette read to 0.05 cm^3^ is honest; the same burette quoted to 0.01 cm^3^ is fiction.",
      },
      {
        k: "table",
        caption: "Instrumental honesty, at a glance",
        head: ["Instrument", "Typical resolution", "How to quote"],
        rows: [
          ["Burette (50 cm^3^)", "0.1 cm^3^ scale, read to", "± 0.05 cm^3^ per reading — end in 0 or 5"],
          ["Volumetric pipette (25 cm^3^)", "fixed volume", "quote as 25.00 cm^3^"],
          ["Measuring cylinder (100 cm^3^)", "1 cm^3^ scale", "± 0.5 cm^3^ — use only when precision doesn't matter"],
          ["Balance (2 d.p.)", "0.01 g", "± 0.01 g; quote both decimals"],
        ],
      },
      {
        k: "def",
        term: "Percentage uncertainty",
        text: "uncertainty ÷ measured value × 100. A titre of 22.30 cm^3^ carries ± 0.10 cm^3^ (two readings of ± 0.05) — a percentage uncertainty of 0.45 %; a 5.10 cm^3^ titre would carry 2.0 % on the same apparatus. Bigger measurements dilute the same absolute doubt.",
      },
      {
        k: "p",
        text: "Uncertainty ==propagates==: when you add or subtract quantities, their absolute uncertainties add; when you multiply or divide, the ==percentage== uncertainties add. And there are only three ways to shrink it — take a ==larger measurement== (a bigger titre, a bigger mass), ==repeat and average== (random error, not systematic), or ==change the instrument== (a pipette instead of a cylinder).",
      },
      {
        k: "tips",
        items: [
          "A burette titre = final − initial, so it inherits *two* readings' worth of uncertainty. Examiners ask this directly.",
          "Quote data to the resolution of the instrument, not beyond: 22.30 cm^3^ yes, 22.3 cm^3^ sloppy, 22.307 invented.",
          "Repeating removes random error only. A zero error in the balance survives every repeat you do — it is systematic.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "A titre of 22.30 cm^3^ is calculated from two burette readings. What is its absolute uncertainty?",
            a: "± 0.10 cm^3^ — each reading carries ± 0.05 cm^3^, and uncertainties add when readings are subtracted.",
          },
          {
            q: "Why does using a 250 cm^3^ volumetric flask beat a 250 cm^3^ measuring cylinder for a standard solution?",
            a: "The flask is calibrated to contain exactly 250.0 cm^3^ with far tighter tolerance; a measuring cylinder's uncertainty is orders of magnitude larger, and the concentration would inherit it.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Analogue: ± half smallest division. Digital: ± 1 last digit.",
          "% uncertainty = uncertainty ÷ value × 100.",
          "Add/subtract → absolute uncertainties add; multiply/divide → percentage uncertainties add.",
          "Reduce it: measure bigger, repeat and mean, or upgrade the instrument.",
        ],
      },
    ],
  },
  {
    id: "p02",
    no: "02",
    label: "Practical 2",
    title: "Preparing solutions and titrating",
    summary:
      "Standard solutions, burette technique, concordant titres — and the calculation chain that converts pink-to-colourless into a concentration.",
    minutes: 22,
    ao: ["AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "A ==standard solution== is one whose concentration you know exactly, prepared by dissolving a precisely weighed mass and making the volume up to the calibration mark — never by adding “about” 250 cm^3^ of water. The whole edifice of titration stands on it.",
      },
      {
        k: "ex",
        title: "Making 250.0 cm³ of a standard solution",
        steps: [
          "Weigh the sample by difference: mass of weighing bottle before, then after — the difference is your mass, quoted to the balance's resolution.",
          "Dissolve in a beaker with a little distilled water; stir until no solid remains.",
          "Transfer with washings: rinse the beaker and glass rod into the flask repeatedly — every rinsed-through drop carries dissolved sample.",
          "Make up to the mark so the bottom of the meniscus sits on the line at eye level; stopper and invert a dozen times to mix.",
        ],
        answer: "Only now is the concentration exact: mass ÷ 0.2500 dm^3^. The washing steps and the final inversion are the marks people forget.",
      },
      {
        k: "p",
        text: "The titration itself is a ritual, and the ritual *is* the mark scheme: rinse the burette with the solution it will hold (water would dilute it), fill below the tap and clear the jet of air, read to the bottom of the meniscus, run a ==rough== titration first to find the end-point, then repeat accurately until two titres agree ==within 0.10 cm^3^== — those are the ==concordant== results, and only they are averaged.",
      },
      {
        k: "table",
        caption: "A results table, done properly",
        head: ["", "Rough", "1", "2", "3"],
        rows: [
          ["Final reading / cm^3^", "22.60", "22.45", "22.30", "22.30"],
          ["Initial reading / cm^3^", "0.00", "0.10", "0.00", "0.05"],
          ["Titre / cm^3^", "22.60", "22.35", "22.30", "22.25"],
        ],
      },
      {
        k: "p",
        text: "Mean titre = (22.35 + 22.30 + 22.25) ÷ 3 = ==22.30 cm^3^== — the rough run and nothing non-concordant enters the mean. Then the calculation chain from Topic 1: n = cV on the known side, the ratio from the equation, then c = n/V on the unknown side. ==Back-titrations== add one twist: react the excess with a known amount of a second reagent, then subtract — the classic route for insoluble or impure samples like calcium carbonate in limestone.",
      },
      {
        k: "tips",
        items: [
          "Indicators: phenolphthalein (colourless → pink) for weak acid–strong base; methyl orange (red → yellow) for strong acid–weak base. One to two drops, no more.",
          "Rinse burette with the titrant, pipette with the solution it will deliver, flask with distilled water only — the flask's residual water carries no solute.",
          "Swirl constantly and drop the last ~1 cm^3^ dropwise — the end-point is the first permanent colour change.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Titres of 22.35, 22.30, 22.90 and 22.25 cm^3^ are recorded. Which mean is quoted?",
            a: "22.30 cm^3^ — from 22.35, 22.30 and 22.25 (concordant within 0.10). The 22.90 overshot and is discarded; the rough run never enters.",
          },
          {
            q: "Why is the conical flask rinsed with distilled water but the burette with titrant?",
            a: "Water left in the flask dilutes nothing that matters — the moles of solute delivered are unchanged. Water in the burette would dilute the titrant itself and corrupt its concentration.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Standard solution: weigh by difference, dissolve, transfer with washings, make to the mark, invert.",
          "Ritual: rinse right, rough first, dropwise finish, concordant within 0.10 cm^3^.",
          "Average concordant titres only.",
          "Back-titration: known excess in, titrate what remains, subtract.",
        ],
      },
    ],
  },
  {
    id: "p03",
    no: "03",
    label: "Practical 3",
    title: "Recording, graphing and evaluating",
    summary:
      "Tables that audit themselves, graphs that earn marks on sight, and the error vocabulary that turns a bad result into a good answer.",
    minutes: 16,
    ao: ["AO3"],
    blocks: [
      {
        k: "p",
        text: "A results table is marked before anyone reads a number of it. ==Units belong in the headings== (“Titre / cm^3^”), not beside every value; every entry carries the same decimal places; raw data and calculated data live in different columns. An examiner should be able to reconstruct your experiment from the table alone.",
      },
      {
        k: "p",
        text: "Graphs have a checklist, and it is free marks: axes labelled ==quantity / unit==, sensible scales (multiples of 1, 2, 5 — never 3s), points plotted to better than half a small square, then a ==line of best fit== — smooth curve or straight rule, drawn to pass through or near the points, not through them point-to-point like a dot-to-dot.",
      },
      {
        k: "def",
        term: "Anomaly",
        text: "A result that does not follow the pattern of the rest — usually a specific, identifiable mistake (misreading a volume, overshooting an end-point). Anomalies are omitted from means and from best-fit lines, ==with a reason stated==, never silently deleted.",
      },
      {
        k: "table",
        caption: "The error vocabulary — use the right word",
        head: ["Term", "Meaning", "Signature", "Cure"],
        rows: [
          ["Random error", "scatter either side of the true value", "readings wobble", "repeat and average; larger measurements"],
          ["Systematic error", "same-size deviation every time", "readings all shifted one way", "calibrate or change the instrument"],
          ["Accuracy", "close to the true value", "—", "better method, better apparatus"],
          ["Precision", "close to each other", "—", "higher-resolution instruments"],
        ],
      },
      {
        k: "p",
        text: "Evaluation answers have a three-beat structure that examiners can tick line by line: ==name the error==, ==state its effect on the result and its direction== (a heat loss makes ΔH *less* exothermic), then ==propose the improvement==. “Human error” is banned vocabulary — name the actual mistake.",
      },
      {
        k: "tips",
        items: [
          "A result can be precise and wrong: a mis-calibrated balance repeats beautifully, all of it shifted. Precision is not accuracy.",
          "When asked to “comment on the data”, quote numbers — compare the spread to the size of the values, as a percentage.",
          "Improvements must be *practical* — “do it more carefully” earns nothing; “insulate the calorimeter and use a lid” earns.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Five repeats give 24.8, 24.9, 24.8, 30.1, 24.9 cm^3^. How do you report the value?",
            a: "Mean of the concordant set only: (24.8 + 24.9 + 24.8 + 24.9) ÷ 4 = 24.85 cm^3^ — the 30.1 is an anomaly (overshoot), identified and excluded with a stated reason.",
          },
          {
            q: "A student's titre is consistently 0.50 cm^3^ above everyone else's. Random or systematic?",
            a: "Systematic — the deviation is one-signed. Likely a rinsing fault or an air bubble in the jet; repeating would reproduce it exactly.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Units in headings, consistent decimals, raw ≠ calculated columns.",
          "Scales in 1s, 2s, 5s; points finer than half a square; best fit, not join-the-dots.",
          "Anomalies: exclude, explain.",
          "Random vs systematic; accuracy vs precision — the two axes of doubt.",
          "Evaluate in three beats: error → direction of effect → improvement.",
        ],
      },
    ],
  },
  {
    id: "p04",
    no: "04",
    label: "Practical 4",
    title: "Flame tests and cation tests",
    summary:
      "Flame colours and precipitate tests that name the metal — sodium's yellow to ammonia's litmus turn, and the Group 2 hydroxide ladder.",
    minutes: 18,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "A ==flame test== asks one clean question: what colour does the compound paint a non-luminous flame? Clean nichrome or platinum wire, dipped in ==concentrated hydrochloric acid== then into the salt, walked into progressively hotter parts of the flame. Yellow names sodium; lilac names potassium; the pale green is barium — and the ==three reds== (lithium, strontium, calcium) need further tests to pull apart.",
      },
      {
        k: "table",
        caption: "The flame colours",
        head: ["Flame colour", "Ion"],
        rows: [
          ["Yellow", "Na^+^"],
          ["Lilac", "K^+^"],
          ["Yellow-red", "Ca^2+^"],
          ["Red / crimson", "Li^+^"],
          ["Red", "Sr^2+^"],
          ["Pale green", "Ba^2+^"],
        ],
      },
      {
        k: "p",
        text: "The ions with no flame voice are caught by precipitation instead. Sodium hydroxide added ==dropwise to excess== pulls down the ==Group 2 hydroxides== in order of their solubility: magnesium hydroxide insoluble (white precipitate, pH 9), calcium partially soluble (pH 11, needs more NaOH), strontium and barium so soluble ==no precipitate forms at all==. Ammonium ions are the warm-water test: with NaOH they release ==ammonia==, pungent enough to turn damp red litmus blue.",
      },
      {
        k: "ex",
        title: "Identifying an unknown cation",
        steps: [
          "Flame test first — it is fast and non-destructive: yellow → Na^+^, lilac → K^+^, pale green → Ba^2+^, any red → Li^+^, Sr^2+^ or Ca^2+^.",
          "Red flame? Add ==concentrated NaOH==: a white precipitate confirms ==Ca^2+^== (magnesium would also give white, but it shows no flame colour).",
          "No flame colour at all? Add ==dilute aqueous ammonia==: a white precipitate of Mg(OH)~2~ names ==Mg^2+^==.",
          "Ammonia from NaOH + warmth? ==NH~4~^+^== — damp red litmus turns blue.",
        ],
        answer: "Flame colour narrows the field, one precipitation finishes it — no single test is trusted alone.",
      },
      {
        k: "tips",
        items: [
          "The wire is cleaned by dipping in concentrated HCl and heating ==before== the test — leftover ions lie about the sample.",
          "Group 2 hydroxide solubility ==increases down the group== — that trend *is* the NaOH test's result table.",
          "Magnesium's electrons emit outside the ==visible spectrum==: no flame colour, ever.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "A solid gives a red flame and a white precipitate with concentrated NaOH. Which ion?",
            a: "Ca^2+^ — the red flame plus the white Ca(OH)~2~ precipitate (which needs more NaOH to appear, being partially soluble). Lithium and strontium flame red but do not precipitate.",
          },
          {
            q: "Why does a suspension of Mg(OH)~2~ read pH 9 while Ca(OH)~2~ reads pH 11?",
            a: "Calcium hydroxide is ==more soluble==, so more hydroxide ions reach the solution — the solubility ladder down Group 2 in action.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Clean wire + conc HCl + non-luminous flame; walk into the hotter zones.",
          "Yellow Na, lilac K, pale green Ba; Li/Sr/Ca all red — confirm with NaOH.",
          "NaOH to excess: Mg^2+^ white ppt, Ca^2+^ white ppt (partial), Sr/Ba nothing.",
          "NH~4~^+^: warm with NaOH, ammonia turns damp red litmus blue.",
        ],
      },
    ],
  },
  {
    id: "p05",
    no: "05",
    label: "Practical 5",
    title: "Tests for gases and anions",
    summary:
      "Eleven gases by splint, litmus and paper; carbonate, hydrogencarbonate, sulfate, sulfite and nitrate by precipitates and colour changes.",
    minutes: 20,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Heating a solid can be a test in itself: carbonates (except Group 1) breathe out ==carbon dioxide==, Group 1 nitrates give ==oxygen==, other nitrates give ==brown nitrogen dioxide==, hydrated salts give ==water==. And the gases each carry a signature — the glowing splint that ==relights==, the ==milky== limewater, the damp red litmus that ==ammonia== turns blue, the dense white fumes where NH~3~ meets HCl.",
      },
      {
        k: "table",
        caption: "Four anion tests that carry marks every year",
        head: ["Anion", "Test", "Positive result"],
        rows: [
          ["CO~3~^2−^", "add dilute acid; bubble gas into limewater", "effervescence; limewater milky"],
          ["SO~4~^2−^", "BaCl~2~ then dilute HCl", "white BaSO~4~, ==insoluble in excess acid=="],
          ["SO~3~^2−^", "BaCl~2~ then dilute HCl", "white BaSO~3~, ==soluble in excess acid=="],
          ["NO~3~^−^", "NaOH + Al, warm; damp red litmus", "pungent ammonia, litmus blue"],
        ],
      },
      {
        k: "p",
        text: "The sulfate and sulfite pair is decided by ==solubility in excess acid==; the carbonate and hydrogencarbonate pair by ==magnesium sulfate== — the carbonate precipitates white in the cold, the hydrogencarbonate only on heating. And the acid you choose matters: BaCl~2~ is acidified with ==hydrochloric== acid, never sulfuric — the sulfate ions would give a ==false positive==.",
      },
      {
        k: "ex",
        title: "Separating sulfate from sulfite",
        steps: [
          "Add BaCl~2~ followed by dilute HCl to solution A: white precipitate.",
          "Add ==excess== dilute HCl: the precipitate dissolves.",
          "BaSO~4~ would never dissolve — so the precipitate was BaSO~3~.",
        ],
        answer: "Solution A contains ==sulfite, SO~3~^2−^==. Confirm by warming with dilute H~2~SO~4~ and passing the gas into acidified K~2~Cr~2~O~7~: orange → green.",
      },
      {
        k: "tips",
        items: [
          "Nitric acid (not hydrochloric) acidifies the ==silver nitrate== halide test — chloride ions would add their own precipitate.",
          "Ammonia and hydrogen chloride detect ==each other==: dense white fumes on a glass rod, either direction.",
          "Sulfur dioxide turns acidified dichromate ==orange to green== — the same observation that flags aldehyde oxidations.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "A gas bleaches moist blue litmus after turning it red. Which gas, and why the two stages?",
            a: "Cl~2~ — it is acidic (turns the litmus red) and an oxidising agent (bleaches it). Bromine bleaches more slowly; iodine does neither.",
          },
          {
            q: "Why is the nitrate test really two tests in one?",
            a: "The aluminium first ==reduces== NO~3~^−^ to ammonia in the alkaline solution; the damp red litmus then identifies that ammonia — the ammonium ion test running on a gas the reduction made.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Heat solids: CO~2~ from carbonates, O~2~ from Group 1 nitrates, NO~2~ + O~2~ from the rest, H~2~O from hydrates.",
          "O~2~ relights a splint; CO~2~ milks limewater; H~2~ pops; NH~3~ blues red litmus.",
          "BaSO~4~ insoluble in excess HCl, BaSO~3~ soluble — the pair's divider.",
          "Ionic equations for precipitations show only the reacting ions; spectators go.",
        ],
      },
    ],
  },
  {
    id: "p06",
    no: "06",
    label: "Practical 6",
    title: "Tests for halides and halogens",
    summary:
      "Silver nitrate and ammonia, lead nitrate crystals, chlorine water layers — and the halide staircase with concentrated sulfuric acid.",
    minutes: 18,
    ao: ["AO1", "AO2"],
    blocks: [
      {
        k: "p",
        text: "The halide test is a staircase of colours: with nitric acid then ==silver nitrate==, chloride falls ==white==, bromide ==cream==, iodide ==pale yellow== — and when the colours look too close, ==aqueous ammonia== sorts them: AgCl dissolves in the dilute, AgBr only in the concentrated, AgI in neither.",
      },
      {
        k: "table",
        caption: "Two confirmations, one staircase",
        head: ["Ion", "AgNO~3~ then NH~3~", "Pb(NO~3~)~2~, heat then cool"],
        rows: [
          ["Cl^−^", "white ppt; soluble in dilute NH~3~", "white crystals reappear on cooling"],
          ["Br^−^", "cream ppt; soluble only in conc. NH~3~", "white crystals reappear on cooling"],
          ["I^−^", "pale yellow ppt; insoluble in both", "golden crystals reappear on cooling"],
        ],
      },
      {
        k: "p",
        text: "The halogens themselves are caught by displacement: ==chlorine== displaces bromide and iodide (organic layer reddish-brown, then violet), ==bromine== displaces only iodide, and ==iodine== — which displaces nothing — signs itself with ==starch==, blue-black. Down the group the halides climb the reducing ladder with concentrated sulfuric acid: chloride stops at ==steamy HCl== fumes; bromide adds ==SO~2~==; iodide keeps going to ==SO~2~==, ==S== and ==H~2~S==, with purple iodine fumes and a yellow sulfur solid.",
      },
      {
        k: "eq",
        title: "The bromide redox step",
        eq: "2HBr + H~2~SO~4~ → Br~2~(g) + SO~2~(g) + 2H~2~O(l)",
        note: "H~2~SO~4~ is the acid in step one (making HBr) and the oxidising agent in step two — sulfur reduced from +6 to +4.",
      },
      {
        k: "tips",
        items: [
          "The nitric acid's job: kill ==carbonate impurities== that would precipitate Ag~2~CO~3~ and mask the halide colours.",
          "Reducing power ==increases down Group 7== — bigger ions give up their outer electrons more easily.",
          "Fluoride gives ==no precipitate== with silver nitrate at all.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "A cream precipitate dissolves in concentrated ammonia but not in dilute. Which ion?",
            a: "Br^−^ — AgBr. AgCl dissolves in ==dilute== ammonia too; AgI dissolves in neither.",
          },
          {
            q: "Solid sodium iodide + concentrated H~2~SO~4~ gives a bad-egg smell and a yellow solid. Explain both.",
            a: "I^−^ is the strongest halide reducing agent: it reduces sulfur from +6 to ==−2== (H~2~S, bad eggs) and to ==0== (S, yellow solid), as well as to +4 (SO~2~) — three redox steps after the initial acid–base step.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "AgNO~3~ + HNO~3~: white / cream / pale yellow; ammonia differentiates.",
          "Pb(NO~3~)~2~: precipitates dissolve on heating, crystals return on cooling.",
          "Chlorine water + hexane: Br^−^ reddish-brown organic layer, I^−^ violet.",
          "Conc. H~2~SO~4~ ladder: HCl only → +SO~2~ → +S and H~2~S.",
        ],
      },
    ],
  },
  {
    id: "p07",
    no: "07",
    label: "Practical 7",
    title: "Distillation, reflux and separation",
    summary:
      "The four rigs every preparation leans on — distillation, reflux, the separating funnel and the fractionating column — plus drying and boiling point.",
    minutes: 20,
    ao: ["AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Organic work is rig work. ==Distillation== separates the most volatile liquid: it evaporates first, condenses in the ==Liebig condenser== — cold water through the outer pipe — and drips into the beaker. ==Reflux== holds a volatile mixture boiling for a long time ==without loss of solvent==: vapours condense high in the upright condenser and fall back.",
      },
      {
        k: "tips",
        items: [
          "Thermometer bulb at the ==T-junction== in distillation — it must read the vapour's temperature, the boiling point itself.",
          "Water enters at the ==bottom== of every condenser — against gravity, for efficient cooling.",
          "Never ==seal== reflux or distillation apparatus: pressure build-up could ==explode== it.",
          "==Electric heaters== heat flammable organics — no naked flames.",
          "==Anti-bumping granules== make small bubbles instead of large, preventing vigorous, uneven boiling.",
        ],
      },
      {
        k: "p",
        text: "After the reaction, ==purification== takes over: wash the crude product in a ==separating funnel== with sodium hydrogencarbonate (neutralises leftover acid — vent the CO~2~) or saturated brine (helps the layers split); run off the aqueous layer; dry the organic liquid with an ==anhydrous salt== until it runs ==clear==; ==decant==; and redistil, collecting only the fraction at the product's boiling range. A pure liquid boils ==at== its data-book value; an impure one boils ==higher==.",
      },
      {
        k: "ex",
        title: "Ordering a purification",
        steps: [
          "Reaction mixture cooled; apparatus rearranged from reflux to ==distillation==.",
          "Distillate into a separating funnel; wash with sodium hydrogencarbonate solution, ==releasing pressure== between shakes.",
          "Layers separate — the ==upper== layer is organic (lower density); run off and discard the aqueous layer.",
          "Three spatulas of ==anhydrous sodium sulfate==; stand until clear; ==decant== off the liquid.",
          "Redistil, collecting the fraction over the product's boiling range.",
        ],
        answer: "Wash → separate → dry → decant → redistil. Every step named is a mark.",
      },
      {
        k: "tips",
        items: [
          "No stopper and no thermometer in the ==top== of a reflux condenser — the vapour never gets that far, and the apparatus must breathe.",
          "Filtration: fold the paper in ==quarters==; ==residue== on the paper, ==filtrate== through it.",
          "Fractionating column: the ==lowest-boiling== vapour reaches the top first; high boilers keep condensing back.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "Why must a reflux condenser never be sealed at the top?",
            a: "Heating volatile liquids builds gas pressure; a sealed apparatus ==explodes==. The open top lets the vapour condense and return while pressure stays equalised.",
          },
          {
            q: "A distillate still smells of acid. Which wash fixes it, and what must you do while shaking?",
            a: "Sodium hydrogencarbonate solution — it ==neutralises the remaining acid==, releasing CO~2~, so you ==open the tap at intervals== to release the pressure.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "Distillation = most volatile leaves first; thermometer at the T-junction.",
          "Reflux = heat volatile mixtures long without loss; never sealed.",
          "Separating funnel = immiscible layers; denser liquid leaves first.",
          "Purify: wash (NaHCO~3~ / brine) → dry (anhydrous salt) → decant → redistil.",
          "Pure liquids boil sharp at the data-book value; impure boil higher.",
        ],
      },
    ],
  },
  {
    id: "p08",
    no: "08",
    label: "Practical 8",
    title: "Core practicals: molar volume, crucible and calorimetry",
    summary:
      "Core Practicals 1 and 2 — collecting CO~2~ to measure a molar volume, crucibles to find x in ·xH~2~O, and q = mcΔT with Hess's law.",
    minutes: 24,
    ao: ["AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "==Core Practical 1== measures the ==molar volume of a gas==: 30 cm^3^ of 1 mol dm^−3^ ethanoic acid on calcium carbonate, bung sealed ==fast== so no CO~2~ escapes, gas syringe read, and the whole run repeated with the carbonate mass stepped up by 0.05 g. From the graph, the volume at ==0.25 g== divides by the moles — 0.25 ÷ 100.1 = 2.5 × 10^−3^ — and the molar volume falls out.",
      },
      {
        k: "p",
        text: "The ==crucible== practical finds x in ==CaSO~4~·xH~2~O== or ==ZnSO~4~·xH~2~O==: weigh dry crucible and lid, heat strongly, cool, reweigh — and reheat to a ==constant mass== so the decomposition is complete. The lid stays ==loose-fitting==: it stops solid spitting out but lets the water vapour escape. Then the mass loss is water, and the mole ratio does the rest: 3.51 g → 1.97 g of anhydrous zinc sulfate gives x = ==7==.",
      },
      {
        k: "eq",
        eq: "q (J) = m (g) × c~p~ (J g^−1^ K^−1^) × ΔT (K)",
        note: "c~p~ = 4.18 for water — and for every dilute aqueous solution, because the method assumes solution ≈ water in heat capacity and density (25 cm^3^ weighs 25 g).",
      },
      {
        k: "p",
        text: "==Core Practical 2== puts q = mcΔT to work on a reaction that ==cannot be measured directly== — hydrating copper(II) sulfate. Both salts are dissolved in excess water instead, the temperature–time graph is ==extrapolated back== to the moment of mixing, and Hess's law closes the cycle: ΔH(reaction) = −66.1 − 11 = ==−77.1 kJ mol^−1^==. Then the arithmetic ritual: q, moles of the reactant ==not in excess==, divide, and ==sign, unit, 3 s.f.==",
      },
      {
        k: "ex",
        title: "The calculation chain, end to end",
        steps: [
          "Q = m × c~p~ × ΔT — the mass is the ==solution== only: 25 × 4.18 × 7.0 = 731.5 J for copper sulfate + excess zinc.",
          "Moles of the reactant ==not in excess==: 0.2 × 25/1000 = 0.005 mol CuSO~4~.",
          "ΔH = 731.5 ÷ 0.005 = 146 300 J mol^−1^.",
          "Temperature rose → exothermic → minus sign, kJ mol^−1^, 3 s.f.",
        ],
        answer: "==−146 kJ mol^−1^== — sign, unit, significant figures, every time.",
      },
      {
        k: "tips",
        items: [
          "Wet crucible = mass loss ==too large== (the water boils off too). 50 g = incomplete decomposition; 0.1 g = percentage uncertainties too high.",
          "Slow reaction? ==Extrapolate== both best-fit lines back to the addition time — never just read the peak.",
          "Combustion calorimetry always reads ==less exothermic== than data books: heat losses, incomplete combustion, evaporation of fuel, H~2~O as gas.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "In Example 3, why is the zinc's mass left out of q = mcΔT?",
            a: "The equation measures the ==solution== absorbing the heat — the zinc is a solid in excess; its heat capacity is not part of the assumed-water model.",
          },
          {
            q: "Why can't ΔH for CuSO~4~(s) + 5H~2~O(l) → CuSO~4~·5H~2~O(s) be measured directly?",
            a: "You cannot add ==exactly== the right amount of water without some solid dissolving, and measuring a temperature change of a solid is impractical — so both salts are dissolved in excess water and Hess's law combines the two ΔH of solution values.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "CP1: graph of V(CO~2~) against mass; molar volume = V ÷ n at 0.25 g.",
          "Crucible: dry, lid loose, constant mass; mass loss = water; ratio gives x.",
          "q = mcΔT → moles of limiting reactant → sign, unit, 3 s.f.",
          "Hess closes cycles the bench cannot measure directly.",
        ],
      },
    ],
  },
  {
    id: "p09",
    no: "09",
    label: "Practical 9",
    title: "Core practicals: organic reactions and tests",
    summary:
      "Core Practicals 5, 6 and 7 — the hydrolysis race, a tertiary chloroalkane made and purified, an alcohol oxidised twice — plus the functional-group tests.",
    minutes: 26,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "==Core Practical 5== races the halogenoalkanes: three tubes, three drops each of 1-chloro-, 1-bromo- and 1-iodobutane, 4 cm^3^ of ==0.02 M silver nitrate==, into the water bath ==simultaneously==. The first precipitate is the winner — and it is always the iodoalkane, because the ==C–I bond is the weakest==: AgI yellow first, AgBr cream, AgCl white last. Quicker precipitate, faster hydrolysis, more reactive haloalkane.",
      },
      {
        k: "p",
        text: "==Core Practical 6== builds a chloroalkane from a tertiary alcohol: 2-methylpropan-2-ol and concentrated HCl in a ==separating funnel==, added in 3 cm^3^ portions with ==pressure released== at every inversion, stood twenty minutes. Then the whole purification stack — sodium hydrogencarbonate wash until the CO~2~ stops, ==anhydrous sodium sulfate== until the liquid runs clear, ==decant==, and distil the fraction at ==47–53 °C==.",
      },
      {
        k: "p",
        text: "==Core Practical 7== runs the dichromate oxidation twice. ==Limited== oxidant, distil as it forms → ==aldehyde== (propanal). ==Excess== oxidant, ==reflux== ten minutes, distil afterwards → ==carboxylic acid== (propanoic acid). Both share the observation: the ==orange dichromate ion reduces to green Cr^3+^== — and solid dichromate needs ==gloves==: toxic, category 2 carcinogen.",
      },
      {
        k: "eq",
        eq: "CH~3~CH~2~CH~2~OH + [O] → CH~3~CH~2~CHO + H~2~O        versus        CH~3~CH~2~CH~2~OH + 2[O] → CH~3~CH~2~COOH + H~2~O",
      },
      {
        k: "table",
        caption: "The organic unknown tests — Core Practical 8+15's test-tube summary",
        head: ["Functional group", "Reagent", "Result"],
        rows: [
          ["Alkene", "Bromine water", "Orange decolourises"],
          ["Alcohols", "PCl~5~", "Misty fumes of HCl"],
          ["Alcohols", "Sodium metal", "Effervescence of H~2~"],
          ["Aldehyde", "Fehling's solution", "Blue solution → red precipitate of Cu~2~O"],
          ["1°, 2° alcohol and aldehyde", "Sodium dichromate + H~2~SO~4~", "Orange to green"],
          ["Chloroalkane", "Warm with AgNO~3~", "Slow white precipitate of AgCl"],
        ],
      },
      {
        k: "tips",
        items: [
          "Water is a ==poor nucleophile== — that is why the hydrolysis race needs a hot bath and patience.",
          "The ester prep: H~2~SO~4~ added ==drop by drop in ice== (exothermic), reflux ==30 minutes==, sodium carbonate wash ==vented==, fraction collected at ==100–103 °C==.",
          "Ketones do ==not== react with Fehling's — the blue stays blue.",
        ],
      },
      {
        k: "check",
        qs: [
          {
            q: "In the hydrolysis race, why must all three tubes enter the bath at the same moment?",
            a: "The comparison is the ==time== each precipitate takes — staggered starts would corrupt the only variable the experiment reads.",
          },
          {
            q: "Why is the aldehyde distilled off immediately but the acid only after reflux?",
            a: "The aldehyde is the ==partial== oxidation product: distilling it out as it forms removes it from the oxidant before the reaction goes further. Under ==reflux with excess== dichromate, everything — aldehyde included — stays in the oxidising mixture until only the acid remains.",
          },
        ],
      },
      {
        k: "recap",
        items: [
          "CP5: simultaneous bath; AgI yellow first — C–I weakest.",
          "CP6: portions with pressure release, NaHCO~3~ wash, dry, distil 47–53 °C.",
          "CP7: distil → aldehyde; reflux → acid; orange → green either way.",
          "Unknowns: bromine water, PCl~5~, Na, Fehling's, dichromate, AgNO~3~.",
        ],
      },
    ],
  },
];
