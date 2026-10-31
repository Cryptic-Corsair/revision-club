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
];
