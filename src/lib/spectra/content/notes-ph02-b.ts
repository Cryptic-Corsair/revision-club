import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part B
   Spec statements 27–32: Hooke's law, stress, strain and the
   Young modulus, force-extension and stress-strain graphs,
   Core Practical 3, and elastic strain energy.

   Worked examples are real WPH11/01 questions with the official
   mark schemes' working; examiner-report excerpts are verbatim
   from the Principal Examiners' reports, 2019–2025.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_B: SpecSection[] = [
  {
    spec: "27",
    statement:
      "be able to use the Hooke's law equation, ΔF = kΔx, where k is the stiffness of the object",
    title: "Hooke's law",
    blocks: [
      {
        k: "def",
        term: "Hooke's law",
        text: "Up to the ==limit of proportionality==, the extension of an object is proportional to the force applied: ==ΔF = kΔx==, where ==k is the stiffness== of the *object*, in N m⁻¹. Stiffness belongs to the object — a spring twice as long is half as stiff — while the Young modulus (statement 28) belongs to the material.",
      },
      {
        k: "eq",
        eq: "ΔF = kΔx        k = ΔF/Δx        (use changes when the graph does not start at the origin)",
        note: "On a force–extension graph k is the gradient of the straight section. On a *length*–force graph (January 2024 Q7) it is still the gradient: F = k(L − L₀) compares with y = mx + c.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q12 — the new length",
        question:
          "A spring of unstretched length 0.18 m and stiffness 25 N m⁻¹ is stretched by a force of 7.0 N. Calculate its new length. (2)",
        steps: [
          "ΔF = kΔx → Δx = 7.0 ÷ 25 = 0.28 m — this is the *extension*",
          "New length = original + extension = 0.18 + 0.28",
        ],
        answer:
          "0.46 m. The report: “The most common error was for candidates to forget to add the original length to the extension.” Extension and length are different quantities — read which one is asked.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q17(a) — which string is it?",
        question:
          "A force–extension graph for a guitar string passes through (29 mm, 80 N) on its straight section. The string is claimed to be string Y, stiffness 2700 N m⁻¹. Deduce whether this is correct. (4)",
        steps: [
          "Read a force–extension pair from the straight section: ΔF = 80 N, Δx = 29 × 10⁻³ m",
          "k = ΔF/Δx = 80 ÷ 0.029",
          "k = 2760 N m⁻¹",
          "Compare: 2760 N m⁻¹ ≈ 2700 N m⁻¹",
        ],
        answer:
          "Yes — within tolerance (the MS allows 2650–2850), this is string Y. The report's sting: “they did not give a numerical comparison of their calculated value with the value in the question… A statement that 2727 is closest to 2700 would have been enough.”",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "Hooke's law appears in proportional-reasoning MCQs as often as in calculations. **Springs in parallel** (October 2022 Q8): three springs sharing 2F each stretch 2Δx/3, so the system stores 4/3 of one spring's energy — “twice the force for two thirds of the extension gives four thirds of the energy”. **Springs in series** (June 2023 Q10): each spring extends by the full 7.5 mm under the same 45 N. **Changed force and stiffness** (January 2025 Q6): 2F on a spring of stiffness 3k gives Δx_new = (2/3)Δx. **A calibration chain** (October 2025 Q15): from two known loadings, k = 1.962 ÷ 0.125 = 15.7 N m⁻¹, then the ball's weight = k × 0.045 = 0.71 N. In every case: changes, not absolutes, when the line does not pass through the origin.",
      },
    ],
  },
  {
    spec: "28",
    statement:
      "understand how to use the relationships (tensile or compressive) stress = force/cross-sectional area, (tensile or compressive) strain = change in length/original length, Young modulus = stress/strain",
    title: "Stress, strain and the Young modulus",
    blocks: [
      {
        k: "def",
        term: "Stress",
        text: "==σ = F/A== — force per unit cross-sectional area, in ==Pa (N m⁻²)==. The area is the true cross-section: A = πr² for a wire, and r is ==half the diameter==. January 2024 Q1 asks the unit as an MCQ; the reports record diameter-as-radius as the most common error in the whole materials block.",
      },
      {
        k: "def",
        term: "Strain",
        text: "==ε = Δx/x== — extension over ==original== length. Strain has ==no unit== (it may be given as a percentage), and “a ratio of two quantities with the same unit does not have a unit” — marks are not awarded for final answers left as fractions (June 2022).",
      },
      {
        k: "def",
        term: "Young modulus",
        text: "==E = σ/ε== — the ratio of stress to strain, a property of the ==material alone==, and the ==gradient of the linear section== of its stress–strain graph. A large Young modulus means a large stress-to-strain ratio (October 2022 Q5) — the material is ==stiff==, resisting elastic deformation; it says nothing about breaking stress, density or elasticity (October 2025 Q16(a)(i) asks exactly “which property” — stiffness).",
      },
      {
        k: "eq",
        eq: "σ = F/A        ε = Δx/x        E = σ/ε        E = Fx/(AΔx)",
        note: "The last form combines all three — but the mark schemes award the steps separately, so show them. For a force–extension graph: E = gradient × (x/A).",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q16(b)(i) — the steel cable",
        question:
          "A steel cable of cross-sectional area 5.1 × 10⁻⁴ m² and unstretched length 3.8 m hangs from a support; its stiffness is 2.8 × 10⁷ N m⁻¹. With a steel object suspended, the strain in the cable is 3.0 × 10⁻⁴. Calculate the Young modulus of the steel. (4)",
        steps: [
          "Extension from strain: Δx = εx = 3.0 × 10⁻⁴ × 3.8 = 1.14 × 10⁻³ m",
          "Force from stiffness: F = kΔx = 2.8 × 10⁷ × 1.14 × 10⁻³ = 3.19 × 10⁴ N",
          "Stress: σ = F/A = 3.19 × 10⁴ ÷ 5.1 × 10⁻⁴ = 6.26 × 10⁷ Pa",
          "E = σ/ε = 6.26 × 10⁷ ÷ 3.0 × 10⁻⁴",
        ],
        answer:
          "E = 2.1 × 10¹¹ Pa. The MS also allows the three-mark route E = kx/A directly — but the four-step chain earns four marking points where the shortcut earns three.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q18(a)(b) — spider silk",
        question:
          "A single thread of spider silk of radius 1.9 × 10⁻⁶ m carries a stress of 4.3 MPa. (a) Calculate the force on the thread. (3) (b) A 25.0 m thread has Young modulus 8.70 GPa and its limit of proportionality is at a stress of 300 MPa. Determine its length at that limit. (4)",
        steps: [
          "(a) A = πr² = π × (1.9 × 10⁻⁶)² = 1.13 × 10⁻¹¹ m²; F = σA = 4.3 × 10⁶ × 1.13 × 10⁻¹¹",
          "F = 4.9 × 10⁻⁵ N — the weight a single thread can carry is a fly's",
          "(b) Strain at the limit: ε = σ/E = 300 × 10⁶ ÷ 8.70 × 10⁹ = 3.45 × 10⁻²",
          "Δx = εx = 3.45 × 10⁻² × 25.0 = 0.86 m; length = 25.0 + 0.86",
        ],
        answer:
          "F = 4.9 × 10⁻⁵ N; length = 25.9 m. The report lists the errors: “treating the radius as the diameter, incorrectly converting 4.3 MPa to pascals, and forgetting to square the radius”.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Scaling questions** are the stress–strain version of proportion: October 2023 Q8 — same material, Δx doubles when the length halves and the diameter halves (Δx ∝ x/d²); October 2025 Q8 — halving A while doubling E leaves the extension unchanged. **From a graph** — statement 30's gradient work. **A material identified from a table** — January 2024 Q17(c)'s brass deduction, shown in statement 31 below. The conversion table is worth memorising: 1 MPa = 10⁶ Pa, 1 GPa = 10⁹ Pa, 1 mm² = 10⁻⁶ m², and a wire of diameter 0.17 mm has radius 8.5 × 10⁻⁵ m.",
      },
    ],
  },
  {
    spec: "29",
    statement:
      "a be able to draw and interpret force-extension and force-compression graphs b understand the terms limit of proportionality, elastic limit, yield point, elastic deformation and plastic deformation and be able to apply them to these graphs",
    title: "Force-extension graphs and the five named points",
    blocks: [
      {
        k: "figure",
        kind: "ph-force-extension",
        caption:
          "The full force–extension story of a ductile metal wire: a straight line to the limit of proportionality, a gently curving elastic region to the elastic limit, the yield point where it starts to flow, plastic deformation with a falling gradient, and fracture. The shaded triangle is the elastic strain energy stored at one point on the line.",
      },
      {
        k: "table",
        caption: "The five terms — the mark schemes' exact wording",
        head: ["Term", "The mark-worthy definition"],
        rows: [
          ["Limit of proportionality", "the point beyond which force is no longer proportional to extension — the end of the straight line. Not a single point where something happens: “no sense of this being a limit” (October 2021)"],
          ["Elastic limit", "the force/stress beyond which the material ==does not return to its original length when the force is removed== — October 2023 Q3's correct MCQ row"],
          ["Yield point", "the stress or strain at/beyond which the material undergoes ==a sudden or large plastic deformation== (June 2023 Q20a — “two elements: a large increase in strain, and the strain must be plastic”)"],
          ["Elastic deformation", "the material ==returns to its original size/shape/length when the force/stress is removed== — the “when removed” clause is the mark (June 2022 Q12a)"],
          ["Plastic deformation", "permanent deformation: the object ==does not return== to its original dimensions when the load is removed"],
        ],
      },
      {
        k: "p",
        text: "Two pairs are perpetually confused, and the reports know it: the ==limit of proportionality== ends the straight line, the ==elastic limit== ends full recovery — they are close together but distinct, and October 2021 records candidates who “included definitions of both thus demonstrating that they did not understand the distinction”. The ==yield point== sits beyond both, where the material suddenly flows. October 2023 Q3 puts all four in one multiple-choice item; January 2024 Q9 does the same on a stress–strain graph — every distractor is one of these definitions worn by the wrong label.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q11 — the rubber band's loop",
        question:
          "A rubber band is stretched by a force increasing to 4 N (extension ≈ 4.5 cm) and the force is then decreased; the force–extension graph traces a loop, the decreasing-force line sitting below the increasing-force line, both ending back at the origin. (a) State how the graph shows the band deformed elastically. (1) (b) The work done stretching exceeds the work recovered; the difference heats the band. Determine the energy that caused the heating. (3)",
        steps: [
          "(a) When the force is removed the extension returns to zero — the unloading line comes back to the origin",
          "(b) The heating energy is the ==area between the two curves== (the loop)",
          "Count squares: each graph square is 0.5 N × 0.005 m = 2.5 × 10⁻³ J; the loop holds about 19 squares",
          "E = 19 × 2.5 × 10⁻³",
        ],
        answer:
          "E ≈ 0.048 J (allowed 0.0425–0.053). The report's traps: candidates who “did not realise that a numerical answer was needed”, who “treated each line as a single straight line and then tried to use E = ½FΔx” (the band is non-linear — that formula is for straight lines only), and who did not convert cm to m.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**“Describe the deformation”** — name the region: elastic (returns), plastic (permanent), or beyond the yield point (large extension at roughly constant force). **A non-origin straight line** (January 2024 Q17(c)): the wire was taut before loading, so use ==changes== — ΔF and Δx — not raw readings; “a large proportion of candidates did not notice that the graph does not start at the origin”. **Loading–unloading on a spring stretched past its elastic limit** (January 2025 Q4): the unloading line is parallel but offset — the spring does not return to its original length. **Energy from a loop** — the hysteresis above; the area *under* a single loading curve is the work done *on* the sample (October 2022 Q6: Q + R, the region under the loading curve).",
      },
    ],
  },
  {
    spec: "30",
    statement:
      "be able to draw and interpret tensile or compressive stress-strain graphs, and understand the term breaking stress",
    title: "Stress-strain graphs and breaking stress",
    blocks: [
      {
        k: "figure",
        kind: "ph-stress-strain",
        caption:
          "The complete tensile stress–strain curve for a ductile metal: the straight line whose gradient is the Young modulus, the elastic limit, the yield point where the sample flows, the maximum stress (ultimate tensile), and the breaking point. Brittle materials have no plastic region — a straight line to fracture.",
      },
      {
        k: "def",
        term: "Breaking stress",
        text: "The ==maximum stress a material can withstand before it fractures== — the end of the curve. On a graph of two wires (January 2024 Q9), it is the stress at the *end of each line*, not the top of the straight section (that is the yield stress) and not the gradient (that is the Young modulus).",
      },
      {
        k: "p",
        text: "The stress–strain graph is the force–extension graph divided through by geometry — which is the whole point: it describes the ==material==, not the specimen. Gradient of the linear section = ==Young modulus== (January 2025 Q1 asks it as an MCQ: the gradient, never the area or the product of the extremes). The area under it is the ==energy per unit volume== stored (statement 32).",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2023 Q14 — is the metal suitable?",
        question:
          "A compressive stress–strain graph for a metal is a straight line through the origin. (b)(i) Show that the Young modulus is about 2 × 10¹¹ Pa. (2) (b)(ii) A machine part of length 0.84 m and cross-sectional area 4.8 × 10⁻³ m² must not compress more than 0.60 mm under a force of 9.5 × 10⁵ N. Deduce whether this metal is suitable. (4)",
        steps: [
          "(b)(i) Gradient from a large triangle spanning more than half the drawn line: e.g. 4.2 × 10⁸ Pa ÷ 2.0 × 10⁻³ = 2.1 × 10¹¹ Pa",
          "(b)(ii) σ = F/A = 9.5 × 10⁵ ÷ 4.8 × 10⁻³ = 1.98 × 10⁸ Pa",
          "ε = σ/E = 1.98 × 10⁸ ÷ 2.1 × 10¹¹ = 9.4 × 10⁻⁴ → Δx = εx = 9.4 × 10⁻⁴ × 0.84 = 0.79 mm",
          "Compare with the limit: 0.79 mm > 0.60 mm",
        ],
        answer:
          "The metal is not suitable. The report: “Too many candidates simply stopped with a value for the extension or Young modulus and just left the examiner to draw the conclusion.” The conclusion sentence *is* the fourth mark. (Alternative credited route: the modulus the part would need, 2.8 × 10¹¹ Pa, compared with 2.1 × 10¹¹.)",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q18(c) — spider silk vs steel",
        question:
          "Spider silk: E = 8.70 GPa, limit of proportionality at 300 MPa. Steel: E = 200 GPa, limit at 350 MPa. (i) Add steel's line to a stress–strain sketch of the silk. (ii) Samples of identical shape and length, both stretched to their limits of proportionality — explain which stores more elastic strain energy. (3)",
        steps: [
          "(i) Steel's line is much steeper (200 GPa vs 8.7 GPa) through the origin, ending at a slightly greater stress but a much smaller strain",
          "(ii) Route 1: the forces are similar (350 vs 300 MPa) but the silk's strain is ~25× larger (300/8.7 vs 350/200), and energy rises with both force and extension",
          "Route 2 (the MS credits either): elastic strain energy is *proportional to* the area under the graph, and the silk's triangle — long along the strain axis — has the far greater area",
        ],
        answer:
          "The spider silk stores more. The report's precise wording trap: candidates “incorrectly stated that the area under the graph is *equal to* the elastic strain energy rather than being *proportional to* the elastic strain energy” — on a stress–strain graph the area is energy per unit volume.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Two samples compared** — January 2024 Q9 wants yield stress (top of the straight section), breaking stress (end of the line) and gradient (Young modulus) kept strictly apart. **A graph to draw** — October 2024 Q18(c)(i): steeper line through the origin, “extending the line too far up the stress axis” was the common one-mark loss. **A safety deduction** — June 2023 Q20(b)(iii): a stunt cable's working stress 2.02 × 10⁷ Pa compared with 15% of its yield stress 2.5 × 10⁸ Pa (= 3.75 × 10⁷ Pa): 2.0 < 3.75, so it is safe — the comparison, again, is the mark. **A harder cable** — June 2023 Q20(c): greater area at the same breaking stress and lower Young modulus → greater extension at break → more work done to break it; “most candidates did not realise that breaking stress was unchanged” despite the question saying so.",
      },
    ],
  },
  {
    spec: "31",
    statement: "CORE PRACTICAL 3: Determine the Young modulus of a material",
    title: "Core Practical 3 — the Young modulus of a wire",
    blocks: [
      {
        k: "figure",
        kind: "ph-young-rig",
        caption:
          "The long-wire rig: test wire and reference wire hung side by side from a ceiling mount, a vernier scale linking them, a micrometer for the diameter, and a mass hanger loading the test wire. The long, thin wire is a deliberate design choice.",
      },
      {
        k: "steps",
        caption: "The method, in the June 2024 mark scheme's six indicative points",
        items: [
          {
            title: "1 · Original length",
            text: "Measure the original length of the wire ==from the clamp to the marker== (a metre rule is fine — the wire is long, so its percentage uncertainty is small).",
          },
          {
            title: "2 · Extension",
            text: "Measure the ==distance the marker moves== from its original position (or new length minus original length) — the vernier scale's 0.1 mm resolution beats a metre rule's 1 mm, giving a smaller percentage uncertainty.",
          },
          {
            title: "3 · Force",
            text: "Calculate the weight of each load with ==W = mg== (or use a newtonmeter) and add masses in equal steps, unloading as well as loading to check for a non-linear wire.",
          },
          {
            title: "4 · Diameter",
            text: "Measure with a ==micrometer at several positions along the wire and at several orientations== — checking uniformity and circular cross-section — and take a mean; A = πr².",
          },
          {
            title: "5 · The graph",
            text: "Plot force against extension (or stress against strain): a straight line through the origin confirms Hooke's law was obeyed.",
          },
          {
            title: "6 · The modulus",
            text: "E = gradient × (length ÷ area) for force–extension, or the gradient itself for stress–strain — quote to an appropriate precision and compare with data-table values.",
          },
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q17 — identify the metal",
        question:
          "A student hangs masses from a 1.80 m wire of diameter 0.17 mm; the force–extension graph is a straight line that does not pass through the origin (the line meets the force axis above zero). Given the table (aluminium 68 GPa, brass 106 GPa, steel 200 GPa), deduce which metal the wire is made from. (5)",
        steps: [
          "The line does not start at the origin — use changes: e.g. ΔF = 14 N with its Δx = 10.4 mm",
          "A = πr² = π × (0.17 × 10⁻³ ÷ 2)² = 2.27 × 10⁻⁸ m²",
          "Δσ = ΔF/A = 14 ÷ 2.27 × 10⁻⁸ = 6.17 × 10⁸ Pa; Δε = Δx/x = 0.0104 ÷ 1.80 = 5.78 × 10⁻³",
          "E = Δσ/Δε = 6.17 × 10⁸ ÷ 5.78 × 10⁻³ = 1.07 × 10¹¹ Pa",
          "Compare: 107 GPa ≈ 106 GPa",
        ],
        answer:
          "The wire is brass. The report: “a large proportion of candidates did not notice that the graph does not start at the origin. Of those who did… many did not compare the value they obtained with the 106 GPa given in the table, and therefore did not score the final mark.”",
      },
      {
        k: "note",
        label: "Examiner's report — June 2024, Q16(a)",
        text: "“Descriptions of how to measure the quantities needed had a tendency to be vague. For example, it was reasonably common for candidates to ‘measure the extension’ without making it clear what they were actually measuring.” Say what the metre rule measures (clamp to marker), what the vernier measures (marker movement), what the micrometer measures (diameter, several positions and orientations). Precision of language is precision of method.",
      },
      {
        k: "note",
        label: "Safety, resolution, and design — the small-print marks",
        text: "==Safety==: goggles, because the wire could snap under tension — “common incorrect answers included wearing a helmet, gloves or shoes” (January 2024). ==Resolution==: the vernier scale's 0.1 mm beats a metre rule's 1 mm, so the *percentage uncertainty* is smaller — the report lamented that “the proportion of students who referred to resolution and went on to link this to uncertainty was very low”. ==Design==: a long, thin wire maximises extension for a given force (extension ∝ length, ∝ 1/area), keeping loads manageable and percentage uncertainties small — June 2019 Q16(c)'s six-mark linkage asks you to argue exactly this.",
      },
    ],
  },
  {
    spec: "32",
    statement:
      "be able to calculate the elastic strain energy Eel in a deformed material sample, using the equation ΔEel = ½FΔx, and from the area under the force-extension graph. The estimation of area and hence energy change for both linear and non-linear force-extension graphs is expected",
    title: "Elastic strain energy",
    blocks: [
      {
        k: "def",
        term: "Elastic strain energy",
        text: "The energy stored in a deformed sample, recoverable when the load is removed: ==ΔEel = ½FΔx== for a ==linear== force–extension graph — the area of the triangle under the line — and ==the area under the curve== in general, ==linear or non-linear== (the specification names both, and the papers examine both).",
      },
      {
        k: "eq",
        eq: "ΔEel = ½FΔx        ΔEel = ½kΔx²        ΔEel = area under the force-extension graph",
        note: "The ½ exists because the force grows from zero to F as the sample stretches — the average force is ½F. Substitute F = kΔx into the first to get the second; both are printed-adjacent on the data sheet (ΔEel = ½FΔx is printed, ½kΔx² is one step away).",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q15(a) — the brick on the foam",
        question:
          "A force–compression graph for a foam brick rises linearly from (0, 0) to (60 nm, 85 N) and on to (97.5 nm, 140 N). Calculate the increase in elastic strain energy as the compression goes from 60 nm to 97.5 nm. (3)",
        steps: [
          "Two triangles, not a rectangle: the MS offers “Eel = ½FΔx with corresponding values… or the area under the graph between 85 N and 140 N”",
          "At 97.5 nm: E = ½ × 140 × 97.5 × 10⁻⁹ = 6.83 × 10⁻⁶ J; at 60 nm: E = ½ × 85 × 60 × 10⁻⁹ = 2.55 × 10⁻⁶ J",
          "ΔEel = 6.83 × 10⁻⁶ − 2.55 × 10⁻⁶",
        ],
        answer:
          "ΔEel = 4.3 × 10⁻⁶ J. The report: “it was relatively common for candidates to multiply the change in force by the change in compression (140 − 85) × (97.5 − 60) nm, which was incorrect physics” — changes multiply nowhere in ½FΔx.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2025 Q15(b) — show that Eel ∝ F²",
        question:
          "The graph of extension Δx against total force F for a spring is a straight line through the origin. Explain why the elastic strain energy stored is proportional to F². (3)",
        steps: [
          "Elastic strain energy = area under the force–extension graph = ½FΔx",
          "Hooke's law holds (straight line through the origin): F = kΔx, so Δx = F/k",
          "Substituting: Eel = ½F × (F/k) = F²/(2k), and k is constant",
        ],
        answer:
          "Eel ∝ F² — quadruple the force and you store sixteen times the energy. This one-line substitution is the algebra the papers keep asking for (October 2023 Q16(b)(ii) runs the same logic on a cable).",
      },
      {
        k: "note",
        label: "Examiner's report — October 2023, Q16(b)(ii)",
        text: "“This question was very challenging for candidates, and a large number of blank responses were seen… [candidates] used generic symbols such as F and x without relating them to a specific force, weight or extension — the third and fourth marking points could not be scored in these cases.” When a graph-annotation question says *add to the graph*, annotate with the question's own quantities — the weight of the electromagnet, the change in extension — not naked F and x.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**A comparison with gravity** — October 2024 Q17(b): the bungee rope's ΔEel (40.5 kJ) against the student's ΔEgrav (22.3 kJ) decides whether the river is reached; October 2023 Q16(b)(ii) runs the same race between the cable's elastic energy and the electromagnet's GPE — the cable's energy change exceeds it, because the unloading line still carries the electromagnet's weight. **Energy density** — January 2025 Q17(b)(ii): area under the stress–strain graph × volume = energy stored, since (F/A)(Δx/x) = FΔx/(Ax) = FΔx/V. **A loop between loading and unloading** — the January 2024 rubber band, statement 29's worked example: the enclosed area is the heat. **Springs combined** — October 2022 Q8: three parallel springs under 2F store (4/3)E because the force doubles while the extension falls to two-thirds.",
      },
      { k: "h", text: "The materials traps — the examiner's own list" },
      {
        k: "table",
        caption: "Every recurring materials error, 2019–2025, and its fix",
        head: ["The trap", "The fix"],
        rows: [
          ["Diameter used as radius (A = πd², or r = d)", "Halve before squaring — the June 2025 report notes sphere questions “relatively commonly” include both radius and diameter data"],
          ["cm³ or mm² not converted to m³ / m²", "cm³ → m³ is × 10⁻⁶; mm² → m² is × 10⁻⁶; nm → m is × 10⁻⁹"],
          ["MPa, GPa entered as plain numbers", "1 MPa = 1 × 10⁶ Pa; 1 GPa = 1 × 10⁹ Pa — January 2025 recorded 110 treated as 110 Pa"],
          ["v in Stokes' law read as a volume", "It is the (terminal) velocity — distance ÷ time, or the gradient of the straight section"],
          ["Stopping at a value in a deduce question", "Number, comparison (<, >, =, ≈), conclusion sentence — the last mark is always there"],
          ["Truncating instead of rounding", "417 → 420, never 410; carry guard digits, round once at the end"],
          ["“The area under the graph is the energy”", "On a stress–strain graph it is *proportional to* the energy per unit volume; the force–extension area is the energy itself"],
          ["Bare numbers with no units", "Pa for stress, Pa s for viscosity, no unit for strain, % only with its symbol"],
        ],
      },
      {
        k: "p",
        text: "One closing habit from the June 2024 report, worth a mark in every paper: ==sanity-check magnitudes== — an extension “greater than the size of a typical laboratory” or “a mass of 229 kg should send up a warning signal”. If the physics has gone wrong, the number usually knows before you do; a ten-second glance back at the substitution is the cheapest mark-saver on the paper.",
      },
    ],
  },
];
