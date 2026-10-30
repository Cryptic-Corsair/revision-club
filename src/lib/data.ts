/* ————————————————————————————————————————————————
   AXIOM · content data
   Single source of truth. The UI renders from this —
   adding notes later requires zero UI changes.
   ———————————————————————————————————————————————— */

export type SubjectGroup =
  | "Mathematics"
  | "Sciences"
  | "Business & Economics"
  | "Humanities & English";

export type Status = "live" | "partial" | "coming-soon";

export interface Topic {
  slug: string;
  title: string;
  status: "live" | "coming-soon";
  minutes?: number;
}

export interface Unit {
  slug: string;
  code: string;
  name: string;
  weight?: string;
  topics: Topic[];
}

export interface Subject {
  slug: string;
  name: string;
  code: string;
  group: SubjectGroup;
  blurb: string;
  status: Status;
  examStructure?: { label: string; value: string }[];
  units: Unit[];
}

export type NoteSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; margin?: string }
  | { type: "definition"; term: string; text: string; margin?: string }
  | { type: "formula"; lines: string[]; highlight?: number; margin?: string }
  | { type: "examTip"; text: string }
  | { type: "mistake"; text: string }
  | { type: "worked"; title: string; body: string[]; answer: string }
  | { type: "keyPoints"; items: { chip: string; text: string }[] };

export interface Note {
  updated: string;
  sections: NoteSection[];
}

export const SUBJECTS: Subject[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    code: "WMA",
    group: "Mathematics",
    blurb:
      "Pure, Mechanics and Statistics — every module broken into the exact methods the mark scheme rewards.",
    status: "partial",
    examStructure: [
      { label: "AS", value: "P1 + P2 + one applied (M1 / S1 / D1)" },
      { label: "A level", value: "P1–P4 + two applied" },
      { label: "Papers", value: "1h 30m · 75 marks each" },
    ],
    units: [
      {
        slug: "p1",
        code: "WMA11",
        name: "Pure Mathematics 1",
        weight: "16⅔%",
        topics: [
          { slug: "algebraic-expressions", title: "Algebraic expressions", status: "coming-soon" },
          { slug: "quadratics", title: "Quadratics and the discriminant", status: "coming-soon" },
          { slug: "equations-inequalities", title: "Equations and inequalities", status: "coming-soon" },
          { slug: "graphs-transformations", title: "Graphs and transformations", status: "coming-soon" },
          { slug: "straight-lines", title: "Straight line graphs", status: "coming-soon" },
          { slug: "calculus-intro", title: "Introduction to differentiation", status: "coming-soon" },
        ],
      },
      { slug: "p2", code: "WMA12", name: "Pure Mathematics 2", weight: "16⅔%", topics: [] },
      { slug: "p3", code: "WMA13", name: "Pure Mathematics 3", weight: "16⅔%", topics: [] },
      { slug: "p4", code: "WMA14", name: "Pure Mathematics 4", weight: "16⅔%", topics: [] },
      { slug: "m1", code: "WME01", name: "Mechanics 1", weight: "16⅔%", topics: [] },
      { slug: "s1", code: "WST01", name: "Statistics 1", weight: "16⅔%", topics: [] },
      { slug: "d1", code: "WDM11", name: "Decision 1", weight: "16⅔%", topics: [] },
    ],
  },
  {
    slug: "further-mathematics",
    name: "Further Mathematics",
    code: "WFM",
    group: "Mathematics",
    blurb:
      "For the ones who finish the paper early. Further Pure and the deeper applied options.",
    status: "coming-soon",
    units: [
      { slug: "fp1", code: "WFM11", name: "Further Pure Mathematics 1", topics: [] },
      { slug: "fp2", code: "WFM12", name: "Further Pure Mathematics 2", topics: [] },
      { slug: "fp3", code: "WFM13", name: "Further Pure Mathematics 3", topics: [] },
    ],
  },
  {
    slug: "physics",
    name: "Physics",
    code: "WPH",
    group: "Sciences",
    blurb:
      "From SUVAT to capacitors — mechanics-first notes with the examiner's voice in the margin.",
    status: "partial",
    examStructure: [
      { label: "AS", value: "U1 40% · U2 40% · U3 20%" },
      { label: "A level", value: "U1–U3 20% each · U4 20% · U5 20% · U6 10%" },
      { label: "Practical", value: "U3 & U6 — 50 marks · 1h 20m" },
    ],
    units: [
      {
        slug: "unit-1",
        code: "WPH11",
        name: "Mechanics and Materials",
        weight: "40% of AS",
        topics: [
          { slug: "motion-suvat", title: "Motion: SUVAT and graphs", status: "live", minutes: 14 },
          { slug: "forces-newtons-laws", title: "Forces and Newton's laws", status: "coming-soon" },
          { slug: "work-energy-power", title: "Work, energy and power", status: "coming-soon" },
          { slug: "momentum", title: "Momentum", status: "coming-soon" },
          { slug: "materials-hooke", title: "Materials: Hooke's law, stress and strain", status: "coming-soon" },
          { slug: "fluids-stokes", title: "Fluids and Stokes' law", status: "coming-soon" },
        ],
      },
      {
        slug: "unit-2",
        code: "WPH12",
        name: "Waves and Electricity",
        weight: "40% of AS",
        topics: [
          { slug: "wave-basics", title: "Wave basics and the EM spectrum", status: "coming-soon" },
          { slug: "refraction-diffraction", title: "Refraction, diffraction and interference", status: "coming-soon" },
          { slug: "dc-electricity", title: "DC electricity", status: "coming-soon" },
          { slug: "nature-of-light", title: "The nature of light", status: "coming-soon" },
        ],
      },
      { slug: "unit-3", code: "WPH13", name: "Practical Skills in Physics I", weight: "20% of AS", topics: [] },
      { slug: "unit-4", code: "WPH14", name: "Further Mechanics, Fields and Particles", weight: "20% of A level", topics: [] },
      { slug: "unit-5", code: "WPH15", name: "Thermodynamics, Radiation and Oscillations", weight: "20% of A level", topics: [] },
      { slug: "unit-6", code: "WPH16", name: "Practical Skills in Physics II", weight: "10% of A level", topics: [] },
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    code: "WCH",
    group: "Sciences",
    blurb:
      "Moles to transition metals — mechanisms drawn out, definitions marked word-perfect.",
    status: "coming-soon",
    examStructure: [
      { label: "AS", value: "U1 40% · U2 40% · U3 20%" },
      { label: "A level", value: "U4 40% · U5 40% · U6 20% of A2" },
    ],
    units: [
      { slug: "unit-1", code: "WCH11", name: "Structure, Bonding and Introduction to Organic Chemistry", topics: [] },
      { slug: "unit-2", code: "WCH12", name: "Energetics, Group Chemistry, Halogenoalkanes and Alcohols", topics: [] },
      { slug: "unit-3", code: "WCH13", name: "Practical Skills in Chemistry I", topics: [] },
      { slug: "unit-4", code: "WCH14", name: "Rates, Equilibria and Further Organic Chemistry", topics: [] },
      { slug: "unit-5", code: "WCH15", name: "Transition Metals and Organic Nitrogen Chemistry", topics: [] },
      { slug: "unit-6", code: "WCH16", name: "Practical Skills in Chemistry II", topics: [] },
    ],
  },
  {
    slug: "biology",
    name: "Biology",
    code: "WBI",
    group: "Sciences",
    blurb:
      "The mark scheme is a language — these notes teach you to speak it fluently.",
    status: "coming-soon",
    units: [
      { slug: "unit-1", code: "WBI11", name: "Molecules, Diet, Transport and Health", topics: [] },
      { slug: "unit-2", code: "WBI12", name: "Membranes, Proteins, DNA and Gene Expression", topics: [] },
      { slug: "unit-3", code: "WBI13", name: "Practical Skills in Biology I", topics: [] },
      { slug: "unit-4", code: "WBI14", name: "Energy, Environment, Microbiology and Immunity", topics: [] },
      { slug: "unit-5", code: "WBI15", name: "Respiration, Coordination and Homeostasis", topics: [] },
      { slug: "unit-6", code: "WBI16", name: "Practical Skills in Biology II", topics: [] },
    ],
  },
  {
    slug: "economics",
    name: "Economics",
    code: "WEC",
    group: "Business & Economics",
    blurb:
      "Diagrams, chains of reasoning and evaluation — the three things every econ essay is marked on.",
    status: "partial",
    examStructure: [
      { label: "AS", value: "U1 + U2" },
      { label: "A level", value: "U1–U4 · 2h papers, 80 marks" },
    ],
    units: [
      {
        slug: "unit-1",
        code: "WEC11",
        name: "Markets in Action",
        weight: "50% of AS",
        topics: [
          { slug: "demand-curve", title: "Demand and the demand curve", status: "live", minutes: 11 },
          { slug: "supply", title: "Supply", status: "coming-soon" },
          { slug: "ped", title: "Price elasticity of demand", status: "coming-soon" },
          { slug: "equilibrium", title: "Market equilibrium", status: "coming-soon" },
          { slug: "market-failure", title: "Market failure", status: "coming-soon" },
          { slug: "intervention", title: "Government intervention", status: "coming-soon" },
        ],
      },
      { slug: "unit-2", code: "WEC12", name: "Macroeconomic Performance and Policy", weight: "50% of AS", topics: [] },
      { slug: "unit-3", code: "WEC13", name: "Business Behaviour", topics: [] },
      { slug: "unit-4", code: "WEC14", name: "Developments in the Global Economy", topics: [] },
    ],
  },
  {
    slug: "business",
    name: "Business",
    code: "WBS",
    group: "Business & Economics",
    blurb: "Case-study technique, formulas you can't fake, and the 4-unit map done properly.",
    status: "coming-soon",
    units: [
      { slug: "unit-1", code: "WBS11", name: "Marketing and People", topics: [] },
      { slug: "unit-2", code: "WBS12", name: "Managing Business Activities", topics: [] },
      { slug: "unit-3", code: "WBS13", name: "Business Decisions and Strategy", topics: [] },
      { slug: "unit-4", code: "WBS14", name: "Global Business", topics: [] },
    ],
  },
  {
    slug: "accounting",
    name: "Accounting",
    code: "WAC",
    group: "Business & Economics",
    blurb: "Ledgers that balance, statements that make sense, and the formats examiners expect.",
    status: "coming-soon",
    units: [
      { slug: "unit-1", code: "WAC11", name: "The Accounting System and Costing", topics: [] },
      { slug: "unit-2", code: "WAC12", name: "Corporate and Management Accounting", topics: [] },
    ],
  },
  {
    slug: "psychology",
    name: "Psychology",
    code: "WPS",
    group: "Humanities & English",
    blurb: "Studies, evaluations and the issues-and-debates toolkit — organised unit by unit.",
    status: "coming-soon",
    units: [],
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    code: "WIT",
    group: "Humanities & English",
    blurb: "From hardware to global information systems — theory notes that survive the exam.",
    status: "coming-soon",
    units: [],
  },
  {
    slug: "english-literature",
    name: "English Literature",
    code: "WET",
    group: "Humanities & English",
    blurb: "Close-reading frameworks and essay architecture for post-2000 poetry, prose and drama.",
    status: "coming-soon",
    units: [],
  },
  {
    slug: "history",
    name: "History",
    code: "WHI",
    group: "Humanities & English",
    blurb: "Cause, consequence and the source skills that separate a B from an A*.",
    status: "coming-soon",
    units: [],
  },
];

export const GROUPS: SubjectGroup[] = [
  "Mathematics",
  "Sciences",
  "Business & Economics",
  "Humanities & English",
];

/* ————— sample notes (real teaching content) ————— */

export const NOTES: Record<string, Note> = {
  "physics/unit-1/motion-suvat": {
    updated: "Oct 2026",
    sections: [
      {
        type: "p",
        text: "Kinematics is the geometry of motion: it describes how things move without asking why. Every SUVAT question is the same game — you are given some of the five quantities (s, u, v, a, t) and asked for the rest. The skill is choosing the one equation that connects what you know to what you want, with nothing spare.",
      },
      {
        type: "definition",
        term: "Displacement vs distance",
        text: "Displacement (s) is the straight-line change in position from start to finish, with direction. Distance is the total path travelled, and it can never be smaller than the magnitude of displacement.",
        margin: "vectors are exam gold — always state direction ↘",
      },
      {
        type: "definition",
        term: "Velocity vs speed",
        text: "Velocity is the rate of change of displacement (a vector, m s⁻¹); speed is the rate of change of distance (a scalar). Acceleration is the rate of change of velocity, in m s⁻².",
      },
      {
        type: "h2",
        text: "The five SUVAT equations",
        margin: "the money box — memorise all five ✏",
      },
      {
        type: "p",
        text: "These hold only for constant acceleration. If acceleration varies, SUVAT is illegal — go back to graphs or calculus.",
      },
      {
        type: "formula",
        lines: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = vt − ½at²", "s = ½(u + v)t"],
        highlight: 2,
        margin: "no t? this is your equation",
      },
      {
        type: "p",
        text: "Each equation leaves out exactly one variable — that is how you choose. Missing t? Use v² = u² + 2as. Missing v? Use s = ut + ½at². Missing s? Use v = u + at. Missing a? Use s = ½(u + v)t.",
      },
      { type: "examTip", text: "Write down which SUVAT equation you are using before substituting. Method marks (M1) are awarded for the correct selection, not just the final answer." },
      {
        type: "h2",
        text: "Reading motion graphs",
      },
      {
        type: "p",
        text: "On a displacement–time graph, the gradient is velocity. On a velocity–time graph, the gradient is acceleration and the area under the graph is displacement. Examiners love asking for 'the acceleration between t = 2 and t = 5' — that is a gradient, so draw the rise and run on the graph itself.",
      },
      { type: "mistake", text: "Mixing units is the single most common lost mark: a speed given in km h⁻¹ must be divided by 3.6 before it touches a SUVAT equation." },
      {
        type: "worked",
        title: "Worked example — WPH11 style",
        body: [
          "A cyclist accelerates uniformly from rest to 12 m s⁻¹ in 8.0 s. Calculate the acceleration and the distance travelled.",
          "Known: u = 0, v = 12, t = 8.0. Unknown a → no s needed: v = u + at → 12 = 0 + a(8.0) → a = 1.5 m s⁻².",
          "Distance: s = ½(u + v)t = ½(0 + 12)(8.0) = 48 m.",
        ],
        answer: "a = 1.5 m s⁻², s = 48 m",
      },
      {
        type: "keyPoints",
        items: [
          { chip: "B1", text: "Recall: displacement, velocity and acceleration are vectors; distance and speed are scalars." },
          { chip: "M1", text: "Select the SUVAT equation that omits exactly the variable you don't need." },
          { chip: "A1", text: "Convert km h⁻¹ → m s⁻¹ by dividing by 3.6 before any substitution." },
        ],
      },
    ],
  },
  "economics/unit-1/demand-curve": {
    updated: "Oct 2026",
    sections: [
      {
        type: "p",
        text: "Demand is not the same as want. You may want a yacht; you demand one only if you are willing and able to pay for it. That distinction is worth a mark on its own in almost every Unit 1 paper.",
      },
      {
        type: "definition",
        term: "Effective demand",
        text: "The quantity of a good consumers are willing and able to buy at a given price over a given period of time.",
        margin: "willing AND able — quote both words",
      },
      { type: "examTip", text: "When drawing the demand curve, label both axes (Price, Quantity) and give the curve a label like D₁. Unlabelled diagrams lose the easiest marks in the paper." },
      {
        type: "h2",
        text: "The law of demand",
      },
      {
        type: "p",
        text: "As price rises, quantity demanded falls — ceteris paribus. The demand curve slopes downward for two reasons: the substitution effect (the good becomes relatively dearer than alternatives) and the income effect (a higher price reduces real purchasing power).",
      },
      {
        type: "keyPoints",
        items: [
          { chip: "B1", text: "Define demand as willingness and ability to pay, at a price, over time." },
          { chip: "M1", text: "Distinguish movements along the curve (price changes) from shifts of the curve (non-price factors)." },
          { chip: "A1", text: "Non-price shifter: income, tastes, substitutes' prices, complements' prices, population, expectations." },
        ],
      },
    ],
  },
};
