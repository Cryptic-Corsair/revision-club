import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part B — solids (statements 27–32)
   Mark-scheme-wise notes, Part A's recipe: one bullet = one
   scorable marking point, in the mark schemes' own wording,
   mined from the 2019–2025 papers, mark schemes and Principal
   Examiners' reports.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_B: SpecSection[] = [
  {
    spec: "27",
    statement:
      "be able to use the Hooke's law equation, ΔF = kΔx, where k is the stiffness of the object",
    title: "Hooke's law",
    blocks: [
      { k: "h", text: "ΔF = kΔx — the law and the gradient" },
      {
        k: "bullets",
        items: [
          "Up to the limit of proportionality: ==the change in force is proportional to the change in length==, **ΔF = kΔx**.",
          "==k is the stiffness of the OBJECT==, unit ==N m⁻¹== — the gradient of the straight section of the force–extension graph.",
          "Length–force graph: F = k(L − L₀) = kL − kL₀; compare with y = mx + c → ==the gradient is still k== (Jan24 Q7 ER).",
          "Graph not through the origin → the wire was ==already taut== → use ==changes==, ΔF and Δx, never raw readings: “a large proportion of candidates did not notice that the graph does not start at the origin” (Jan24 Q17 ER).",
          "==New length = original length + extension== — “the most common error was for candidates to forget to add the original length” (Oct24 Q12 ER).",
          "k belongs to the object, not the material: a longer wire of the same steel has a smaller k, a thicker one a larger k — which is exactly why statement 28 exists.",
        ],
      },
      { k: "h", text: "Proportionality — how the MCQs are built" },
      {
        k: "bullets",
        items: [
          "Rearrangement: Δx = ΔF/k — a force 2F on a spring of stiffness 3k gives ==Δx_new = (2/3)Δx== (Jan25 Q6).",
          "Calibration chain (Oct25 Q15(a)): known mass → its weight and its extension → k = ΔF/Δx → unknown weight = kΔx (200 g mass: k = 1.962/0.125 = 15.7 N m⁻¹; ball: W = 15.7 × 0.045 = 0.71 N).",
          "Identifying a spring (Jun25 Q17(a)): read a corresponding (force, extension) pair from the straight section (±½ small square) → k = ΔF/Δx → ==compare with the claimed value and conclude== — “2760 N m⁻¹ ≈ 2700 N m⁻¹ so this is string Y”.",
          "Springs in parallel share the force (Oct22 Q8): three identical springs under 2F → each carries 2F/3 and stretches 2Δx/3 → each stores ½(2F/3)(2Δx/3) = (4/9)E → the system stores ==(4/3)E==.",
        ],
      },
    ],
  },
  {
    spec: "28",
    statement:
      "understand how to use the relationships (tensile or compressive) stress = force/cross-sectional area, (tensile or compressive) strain = change in length/original length, Young modulus = stress/strain",
    title: "Stress, strain and the Young modulus",
    blocks: [
      { k: "h", text: "The three definitions" },
      {
        k: "bullets",
        items: [
          "==Stress: σ = F/A==, unit ==Pa = N m⁻²== (Jan24 Q1) — the cross-section A = ==πr² = π(d/2)²==.",
          "==Strain: ε = Δx/x== — the ==change in length over the ORIGINAL length==, not the new length (Jan25 Q17(a) ER: “the most common error was to use the new length”). Strain has ==no unit==.",
          "==Young modulus: E = σ/ε== — a ==material== property; the property it describes is the material's ==stiffness== (Oct22 Q5, Oct25 Q16(a)(i)). It is NOT the breaking stress, NOT the density, NOT “elasticity”.",
        ],
      },
      { k: "h", text: "Reading E from graphs" },
      {
        k: "bullets",
        items: [
          "Stress–strain graph: ==E = gradient of the linear section== — not the area, not σ_max × ε_max, not the inverse (Jan25 Q1).",
          "Force–extension graph: ==E = gradient × x/A==, or E = Fx/(AΔx) (Jun19 Q16(b), Jun25 Q17(b)).",
          "Take the gradient over ==more than half the drawn line== — “if the points encompassed less than half the drawn line only one mark could be awarded” (Oct21 Q14(b) ER).",
          "From raw readings: the three-step chain σ = F/A → ε = Δx/x → E = σ/ε (Oct24 Q18(b) via ε = σ/E for the limit of proportionality).",
        ],
      },
      { k: "h", text: "The scaling law — one line generates every MCQ" },
      {
        k: "bullets",
        items: [
          "**Δx = FL/(EA)** → Δx ∝ F, ∝ L, ∝ 1/A, ∝ 1/E; and A ∝ d², so ==halving the diameter quadruples the extension==.",
          "Oct23 Q8: same force, same material, 2Δx required → 0.5x and 0.5d, because 0.5x/(0.5d)² = 2(x/d²).",
          "Oct25 Q8: area A/2 and modulus 2E → EA unchanged → ==Δx unchanged==.",
          "MS wording for these: “stress ∝ strain or F/A ∝ Δx/x or ==Δx ∝ x/d²==”.",
        ],
      },
      { k: "h", text: "Calculation chains and their traps" },
      {
        k: "bullets",
        items: [
          "Force from stress: F = σA, with A = πr² (Oct24 Q18(a): 4.3 MPa × 1.13 × 10⁻¹¹ m² = 4.9 × 10⁻⁵ N).",
          "Strain at the limit of proportionality: ε = σ/E; then Δx = εx; then the ==new length = x + Δx== (tensile, Oct24 Q18(b): 25.9 m) or ==x − Δx== (compressive, Oct25 Q16(a)(ii): 0.446 m).",
          "==Prefix conversions==: 1 MPa = 10⁶ Pa, 1 GPa = 10⁹ Pa — “a noticeable proportion of candidates who used a value of 110, but treated this value as 110 Pa rather than 110 MPa” (Jan25 Q17(b)(i) ER).",
          "==Radius vs diameter, and square it==: “common errors included treating the radius as the diameter … or forgetting to square the radius or diameter” (Oct24 Q18(a), Jan25 Q17(b)(i) ERs).",
        ],
      },
    ],
  },
  {
    spec: "29",
    statement:
      "a be able to draw and interpret force-extension and force-compression graphs b understand the terms limit of proportionality, elastic limit, yield point, elastic deformation and plastic deformation and be able to apply them to these graphs",
    title: "Force-extension graphs and the five named terms",
    blocks: [
      { k: "h", text: "The five terms — the exact mark-scheme sentences" },
      {
        k: "def",
        term: "Limit of proportionality",
        text: "The ==limit== beyond which force is no longer proportional to extension — the end of the straight line. “There was no sense of this being a limit, not a single point” and it is regularly confused with the elastic limit (Oct21 Q14(a) ER).",
      },
      {
        k: "def",
        term: "Elastic limit",
        text: "The force/stress ==beyond which the material does not return to its original length when the force is removed== (Jun22 Q12(a), Oct23 Q3). The phrase ==“when the force is removed”== is itself a marking point: “many candidates neglected to mention that for elastic behaviour, the return to original length occurs after the load is removed” (Jun22 ER).",
      },
      {
        k: "def",
        term: "Yield point",
        text: "The stress (or strain) ==at/beyond which the material undergoes a sudden or LARGE PLASTIC deformation== (Jun23 Q20(a)) — both elements needed: “very few candidates had learned this definition which needed to include … the idea of a large increase in strain and that the strain must be plastic”.",
      },
      {
        k: "def",
        term: "Elastic deformation",
        text: "The material ==returns to its original size/shape/length when the force is removed== (Jun25 Q15(b)).",
      },
      {
        k: "def",
        term: "Plastic deformation",
        text: "The deformation is ==permanent== — the object ==does not return to its original length== when the force is removed (Oct24 Q7, Jan25 Q4).",
      },
      {
        k: "figure",
        kind: "ph-force-extension",
        caption:
          "The force–extension biography of a ductile wire: straight line (Hooke's law) to the limit of proportionality, elastic limit, yield point where it flows, the plastic region, and fracture.",
      },
      { k: "h", text: "Applying the terms — the MCQ subtleties" },
      {
        k: "bullets",
        items: [
          "==At the elastic limit the wire is still elastically deformed== — plastic deformation begins only ==beyond== it (Oct24 Q7: correct answer “elastically deformed”).",
          "A spring stretched beyond its elastic limit, then unloaded: it ==does not return to its original length== (Jan25 Q4) — the unloading line is parallel to the loading line but offset, leaving a permanent extension.",
          "Distinguish the two limits when asked: don't define both and blur them — “a number included definitions of both, thus demonstrating that they did not understand the distinction” (Oct21 ER).",
          "All four graph terms in one MCQ (Oct23 Q3): A = limit of proportionality (Hooke's law ends), B = elastic limit (the answer — deformation on removal), C = yield point (sudden increase in extension), D = breaking stress (it breaks).",
        ],
      },
      { k: "h", text: "Areas on the graph — work and energy" },
      {
        k: "bullets",
        items: [
          "Work done in stretching = ==area under the LOADING line== (Oct22 Q6: Q + R, not the region above it).",
          "Loading–unloading loop: the band deformed ==elastically== because ==when the force was removed== it returned to its original length — the unloading line returns to the origin (Jan24 Q11(a); “it was very common to fail to state that this occurs when the force is removed”).",
          "==Loop area = the energy converted to heat== (Jan24 Q11(b): 0.048 J by counting squares — each square 0.5 N × 0.005 m = 2.5 × 10⁻³ J).",
          "Curved (non-linear) graph → ==count squares==; the ½FΔx triangle is for ==straight lines only== — “some candidates incorrectly treated each line as a single straight line and then tried to use E = ½FΔx” (Jan24 Q11(b) ER).",
          "Convert the graph units first: cm of extension → m before any energy (Jan24 Q11(b) ER).",
        ],
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
          "The stress–strain curve of a ductile metal: linear section (gradient = Young modulus), elastic limit, yield point, plastic region, and the breaking point at the end of the line.",
      },
      { k: "h", text: "Reading the graph — which feature answers which question" },
      {
        k: "bullets",
        items: [
          "The stress–strain curve belongs to the ==material== — every sample of it, any shape, gives the same curve.",
          "==Gradient of the initial straight section = Young modulus== (Jan25 Q1).",
          "==Yield stress = the top of the initial straight section==; ==breaking stress = the stress at the end of the line== (Jan24 Q9 ER — each distractor is another feature's definition).",
          "Ductile vs brittle on the axes: steep-and-short line (stiff, small breaking strain) against shallow-and-long (lower E, huge strain at break) — Jan25 Q17 asks exactly this comparison.",
          "Sketch comparison (Oct24 Q18(c)(i)): steel beside spider silk = ==steeper straight line from the origin, ending at a slightly greater stress== — the one-mark loss was “extending the line too far up the stress axis”.",
        ],
      },
      {
        k: "def",
        term: "Breaking stress",
        text: "The ==maximum stress a material can withstand before it fractures== — a material property: a bigger cable of the same steel has the ==same== breaking stress, only a bigger breaking force (Jun23 Q20(c): “most candidates did not realise that breaking stress was unchanged, and often stated that greater stress was required … despite this being clearly contradicted by the question”).",
      },
      { k: "h", text: "Energy from the stress-strain graph" },
      {
        k: "bullets",
        items: [
          "==Area under the stress–strain line = energy per unit volume== — “energy stored = area under graph × volume of rope” (Jan25 Q17(b)(ii) MP1).",
          "Say ==proportional to==, not equal, when the volume has not been multiplied in: “some candidates … incorrectly stated that the area under the graph is ==equal to== the elastic strain energy rather than being ==proportional to== it” (Oct24 Q18(c)(ii) ER).",
          "Why: stress × strain = (F/A)(Δx/x) = ==FΔx/V== (Jan25 Q17(b)(ii) remaining MPs — the derivation is the answer).",
          "Same-shape samples (Oct24 Q18(c)(ii)): equal volumes → compare the areas directly — silk's limit sits at a similar stress but a much greater strain, so its triangle is far larger → silk stores more energy.",
        ],
      },
      { k: "h", text: "Deduction questions — compare, then conclude" },
      {
        k: "bullets",
        items: [
          "Identify the material: breaking stress = F/A → compare with each candidate in the table → conclude (Oct25 Q16(b): 388 MPa ≈ carbon fibre's 400 MPa).",
          "Safe working load: working stress vs the stated fraction of the yield stress → ==compare and conclude== (Jun23 Q20(b)(iii): 2.02 × 10⁷ Pa < 0.15 × 2.5 × 10⁸ Pa → safe).",
          "Cable comparison, verbatim MPs (Jun23 Q20(c)): greater cross-sectional area at the same breaking stress → ==a greater force is required== to break it; smaller Young modulus → ==greater strain for the same stress== → ==greater extension== at break; force and extension both greater → ==more work done to break it==.",
          "Suitability (Jan23 Q14(b)(ii)): compute the strain/extension the part would suffer → compare with the allowed limit → conclude — “too many candidates simply stopped with a value … and just left the examiner to draw the conclusion”.",
        ],
      },
    ],
  },
  {
    spec: "31",
    statement: "CORE PRACTICAL 3: Determine the Young modulus of a material",
    title: "Core Practical 3 — Young modulus of a wire",
    blocks: [
      {
        k: "figure",
        kind: "ph-young-rig",
        caption:
          "The long-wire rig: test wire and unloaded reference wire hang side by side, joined by a vernier scale; masses load the test wire; a micrometer sizes the diameter.",
      },
      { k: "h", text: "The method — the indicative-content list (Jun24 Q16(a))" },
      {
        k: "bullets",
        items: [
          "Original length: ==clamp to marker==, with a metre rule.",
          "Extension: the ==distance the marker moves== from its original position (or new length − original length) — vague answers like “measure the extension” score nothing: “it was reasonably common for candidates to ‘measure the extension’ without making it clear what they were actually measuring” (Jun24 ER).",
          "Force: ==W = mg== for the masses (or a newtonmeter).",
          "Diameter: micrometer or digital callipers, ==at several positions and orientations==, take the mean → A = π(d/2)² (Jun19 Q16(a)).",
          "Then either: σ = F/A and ε = Δx/x → ==E = σ/ε==; or plot force–extension / stress–strain and use the ==gradient== (E = gradient × x/A) (Jun24 Q16(a) IC5–6).",
          "Load AND unload in equal steps: a straight line through the origin confirms Hooke's law held — only the linear region gives E.",
        ],
      },
      { k: "h", text: "Why each choice — the reasoning marks" },
      {
        k: "bullets",
        items: [
          "==Long wire== → greater extension (extension is proportional to original length) — a larger measured Δx means a ==smaller percentage uncertainty== (Jun19 Q16(c) ICs).",
          "==Thin wire== → greater extension (extension is inversely proportional to cross-sectional area) → also ==a smaller load can be used==.",
          "==Vernier scale== (0.1 mm) rather than a metre rule (1 mm): better ==resolution== → smaller percentage uncertainty in Δx — “the proportion of students who referred to resolution and went on to link this to uncertainty was very low” (Jan24 ER).",
          "==Reference wire== (unloaded, beside the test wire): cancels any movement of the support and thermal expansion of the wire — the vernier reads the pure extension.",
          "==Several diameters, averaged==: wires are not uniform; the diameter is squared in A = πr², so its uncertainty is doubled.",
        ],
      },
      { k: "h", text: "Safety" },
      {
        k: "bullets",
        items: [
          "==Goggles== — the stretched wire stores elastic energy and whips when it snaps. Give the ==hazard and the consequence==: “common incorrect answers included wearing a helmet, gloves or shoes” (Jan24 ER).",
        ],
      },
    ],
  },
  {
    spec: "32",
    statement:
      "be able to calculate the elastic strain energy Eel in a deformed material sample, using the equation ΔEel = ½FΔx, and from the area under the force-extension graph. The estimation of area and hence energy change for both linear and non-linear force-extension graphs is expected",
    title: "Elastic strain energy",
    blocks: [
      { k: "h", text: "ΔEel = ½FΔx — and when it may be used" },
      {
        k: "bullets",
        items: [
          "==ΔEel = ½FΔx== — valid only for a ==straight-line (linear)== force–extension graph (the force grows from 0 to F; average force ½F).",
          "Always valid: ==ΔEel = area under the force–extension graph== — for linear AND non-linear graphs; for curves, ==count squares== and scale them (Jan24 Q11(b)).",
          "With F = kΔx: ΔEel = ==½kΔx²== → Eel ∝ Δx²; substituting Δx = F/k gives ΔEel = ==F²/2k== → ==Eel ∝ F²== (Oct25 Q15(b) MPs: area/½FΔx statement + F = kΔx + substitution with k constant).",
          "Extension from energy: ==Δx = 2Eel/F== (Jan24 Q3 — don't square-root, don't invert).",
        ],
      },
      { k: "h", text: "Energy changes on a graph — the recurring questions" },
      {
        k: "bullets",
        items: [
          "==Increase in energy between two points = the difference of the two triangle areas== (½F₂x₂ − ½F₁x₁), or the trapezium between them (Jun25 Q15(a): 6.83 × 10⁻⁶ − 2.55 × 10⁻⁶ = 4.3 × 10⁻⁶ J).",
          "==NEVER (ΔF)(Δx)==: “relatively common for candidates to multiply the change in force by the change in compression … which was incorrect physics” (Jun25 Q15(a) ER).",
          "Loading–unloading loop: the ==loop area is the energy dissipated== — heating the sample (Jan24 Q11(b)).",
          "Energy per unit volume = area under the ==stress–strain== graph; multiply by the sample's volume for the energy (see statement 30).",
          "Two ropes compared by graph areas: count the area under each loading curve → the old rope stores ==less== energy → “the old rope is not as stiff … would break at a smaller applied force” (Jun19 Q17(b)).",
        ],
      },
      { k: "h", text: "Energy races — the 'deduce' questions" },
      {
        k: "bullets",
        items: [
          "Bungee rope vs the river (Oct24 Q17(b)): ΔEel = ½FΔx with F = kΔx (40.5 kJ) against ΔEgrav = mgΔh (22.3 kJ) → ==compare and conclude== (rope's capacity > the energy to be absorbed → the student does not reach the river).",
          "Parallel springs share the load (Oct22 Q8): each of three springs under 2F carries 2F/3, stretches 2Δx/3 → system stores ==(4/3)E==.",
          "Every energy deduction ends the same way: ==calculated value, explicit comparison, conclusion sentence==.",
        ],
      },
      { k: "h", text: "The materials traps — the examiners' own list" },
      {
        k: "table",
        caption: "Every recurring Materials error 2019–2025, with its source",
        head: ["Trap", "The examiner's words", "Session"],
        rows: [
          ["diameter used as radius", "“used the diameter of the ball instead of the radius, so have ended up with an answer double what it should be”", "Jun25 Q16, Oct24 Q18, Jan25 Q17"],
          ["prefix ignored", "“treated this value as 110 Pa rather than 110 MPa”", "Jan25 Q17"],
          ["cm³ / mm not converted", "“mistakes when converting cm³ to m³”", "Oct24 Q19, Jan24 Q11"],
          ["v read as a volume in Stokes' law", "“a surprisingly high proportion of candidates interpreted v as a volume”", "Oct23 Q18, Jan25 Q20"],
          ["stopping before the conclusion", "“did not compare their calculated value … and therefore did not score the final mark”", "Jan24 Q17, Jan23 Q14, Oct21"],
          ["truncated not rounded", "“truncated their calculated answer from 417 × 10⁶ to 410 × 10⁶ instead of correctly rounding it to 420 × 10⁶”", "Jun24 Q11"],
          ["(ΔF)(Δx) for an energy change", "“multiply the change in force by the change in compression, which was incorrect physics”", "Jun25 Q15"],
          ["area “equals” energy on σ–ε axes", "“the area under the graph is equal to the elastic strain energy rather than being proportional to”", "Oct24 Q18"],
          ["floats when U > W", "“a clear misconception … that the iceberg would float if weight is less than upthrust”", "Jun24 Q12"],
          ["breaking stress changed by shape", "“did not realise that breaking stress was unchanged”", "Jun23 Q20"],
        ],
      },
      {
        k: "bullets",
        items: [
          "Closing habit (Jun24 ER): ==sanity-check magnitudes== — an extension larger than the lab, or a 229 kg ball-bearing, “should send up a warning signal”.",
        ],
      },
    ],
  },
];
