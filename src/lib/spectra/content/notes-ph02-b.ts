import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part B — solids (statements 27–32)
   REWRITTEN in the source-note style: mechanism and reasoning
   first, definitions as they are needed, the exam layer applied
   after understanding is in place.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_B: SpecSection[] = [
  {
    spec: "27",
    statement:
      "be able to use the Hooke's law equation, ΔF = kΔx, where k is the stiffness of the object",
    title: "Hooke's law — the object's own resistance",
    blocks: [
      {
        k: "p",
        text: "Hang masses, one at a time, on the same spring and watch the pointer: each extra newton stretches it by ==the same extra amount==. That pattern — equal steps of force producing equal steps of extension — is ==Hooke's law==, and the constant that links them is the spring's ==stiffness k==: how many newtons of extra force each extra metre of stretch costs. A stiffness of 25 N m⁻¹ means each additional millimetre needs 0.025 N more — a soft spring. A guitar-string bridge block at 2700 N m⁻¹ is a hundred times stiffer: each millimetre costs 2.7 N.",
      },
      {
        k: "p",
        text: "Why should the graph be straight at all, rather than some curve? For small stretches, the material's internal structure deforms ==uniformly== — pull twice as far and every part of it is strained twice as much, so it fights back twice as hard. The linearity is the signature of a structure responding proportionally, and it holds right up to the ==limit of proportionality==, beyond which extra force buys extra extension at a changing rate. (What physically changes there is the story of statement 29.)",
      },
      {
        k: "def",
        term: "Hooke's law",
        text: "Up to the limit of proportionality, ==ΔF = kΔx==: the change in force is proportional to the change in length. ==k is the stiffness of the object==, in N m⁻¹ — the gradient of the straight section of its force–extension graph. Use ==changes== when the graph does not start at the origin (a pre-tensioned wire still obeys the law for changes of force).",
      },
      {
        k: "p",
        text: "One phrase in the definition deserves its own sentence: ==the stiffness belongs to the object, not the material==. Take the same steel and make the wire ==longer==: the same force now stretches it further (each centimetre of wire shares the load, and there are more of them), so its k is ==smaller==. Make it ==thicker==: more of it carries the load, so it stretches less — k is ==bigger==. Two wires of the same steel can have wildly different stiffnesses; what they share is something deeper, which is exactly what statement 28 isolates with stress and strain. When the January 2024 paper shows a length–force graph and asks for k, the answer is still ==the gradient== — F = k(L − L₀) compares with y = mx + c, and the gradient never cares where the intercept sits.",
      },
      {
        k: "p",
        text: "Springs in ==combination== obey the same law, and their combined stiffness can be reasoned out rather than memorised. ==In series== (end to end): the same force passes through both, so each stretches by its own Δx — the total extension is the ==sum==, 2Δx for two identical springs, so the pair is ==softer==: k_pair = k/2. ==In parallel== (side by side): both stretch by the ==same== Δx, and the force ==shares== between them — each carries F/2, so the pair is ==stiffer==: k_pair = 2k. Those two pictures (force shared, or extension shared) generate every multiple-choice variant the papers have asked since 2019.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q12 — the new length",
        question:
          "A spring of unstretched length 0.18 m and stiffness 25 N m⁻¹ is stretched by a force of 7.0 N. Calculate its new length. (2)",
        steps: [
          "Rearrange the law for the extension: Δx = ΔF/k = 7.0 ÷ 25 = 0.28 m",
          "The question asks for the ==new length==, not the extension — two different quantities with one bridge between them",
          "new length = original + extension = 0.18 + 0.28",
        ],
        answer:
          "0.46 m. The report: “The most common error was for candidates to forget to add the original length to the extension.” Read the quantity being asked for before reaching for the equation.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q17(a) — which string is it?",
        question:
          "A force–extension graph for a guitar string passes through (29 mm, 80 N) on its straight section. The string is claimed to be string Y, stiffness 2700 N m⁻¹. Deduce whether this is correct. (4)",
        steps: [
          "Take a force–extension pair from the straight section: ΔF = 80 N, Δx = 29 × 10⁻³ m",
          "k = ΔF/Δx = 80 ÷ 0.029 = 2760 N m⁻¹",
          "Compare with the claim: 2760 N m⁻¹ ≈ 2700 N m⁻¹ (the MS allows 2650–2850)",
        ],
        answer:
          "Yes — this is string Y. The report's sting: candidates “did not give a numerical comparison of their calculated value with the value in the question… A statement that 2727 is closest to 2700 would have been enough.” *Deduce* always ends in a number, a comparison and a verdict.",
      },
      {
        k: "note",
        label: "If the question were asked differently — proportional reasoning",
        text: "The MCQs rarely ask for a number; they ask what ==doubles==. October 2025 Q15: from two known loadings, k = 1.962 N ÷ 0.125 m = 15.7 N m⁻¹, then the ball's weight = k × 0.045 m = 0.71 N — a calibration chain. January 2025 Q6: 2F on a spring of stiffness 3k gives Δx_new = (2/3)Δx — the law with the new numbers. October 2022 Q8: three identical springs ==in parallel== share a 2F pull, so each carries 2F/3 and stretches 2Δx/3; each stores ½ · (2F/3) · (2Δx/3) = (4/9)E, and three of them store (4/3)E — the answer falls out of the sharing picture, not a formula for combinations.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — two identical springs in series: which quantity (force or extension) is shared, and which adds?",
          "==Check yourself== — why is a longer wire of the same steel less stiff than a short one?",
          "==Check yourself== — a force–length graph has a positive intercept on the force axis. What was true of the wire before the first reading, and what does the gradient still give?",
        ],
      },
    ],
  },
  {
    spec: "28",
    statement:
      "understand how to use the relationships (tensile or compressive) stress = force/cross-sectional area, (tensile or compressive) strain = change in length/original length, Young modulus = stress/strain",
    title: "Stress, strain and the Young modulus — dividing the shape out",
    blocks: [
      {
        k: "p",
        text: "Statement 27 ended on a puzzle: stiffness k describes an ==object== — two wires of the same steel, one long and thin, one short and thick, disagree about k while agreeing about everything that matters. The fix is to ==divide the shape out==, and the division happens in two moves.",
      },
      {
        k: "p",
        text: "==Move one: divide the force by the cross-section== — stress, σ = F/A. A thick wire stretches less than a thin one under the same pull precisely because the pull is ==spread over more material==: what each square metre of cross-section actually feels is the force divided by the area. Stress is the ==intensity== of the loading — newtons per square metre — and its unit is the pascal, the same N m⁻² as pressure. Feel the scale: 1 Pa is about the weight of an apple spread over a square metre, which is why real stresses live in ==MPa (10⁶ Pa)== and ==GPa (10⁹ Pa)==.",
      },
      {
        k: "p",
        text: "==Move two: divide the extension by the original length== — strain, ε = Δx/x. A long wire stretches further than a short one under the same stress because there is ==more of it to stretch==: the fair comparison is the ==fractional== extension — how much it grew *relative to what it was*. Strain is a ratio of two lengths, so it has ==no unit== (a percentage is allowed), and quoting a spurious unit for it is a documented mark-loser (June 2022).",
      },
      {
        k: "p",
        text: "Now the payoff. Divide stress by strain and ==both geometry effects cancel==: what remains depends only on the material itself. That ratio is the ==Young modulus E== — the material's own stiffness, the stress needed per unit of strain. Steel's E ≈ 200 GPa whether the sample is a hair-thin wire or a bridge girder; spider silk's ≈ 9 GPa whatever the spider's mood. On a stress–strain graph, E is ==the gradient of the linear section== — and since the axes are normalised, that gradient is a ==material constant==, which is the whole reason statement 30's graphs describe materials and not specimens.",
      },
      {
        k: "eq",
        eq: "σ = F/A        ε = Δx/x        E = σ/ε        E = Fx/(AΔx)",
        note: "The chain, and its one-line shortcut: the last form combines all three — but the mark schemes award the steps separately, so show σ, then ε, then the ratio. For a force–extension graph: E = gradient × (original length ÷ area).",
      },
      {
        k: "p",
        text: "The examinable algebra is proportional reasoning, and it becomes easy once the definitions are felt rather than recalled. Since Δx = (F/A)·(x/E): double the wire's ==length== and it stretches ==twice as much== (more to stretch); halve the ==diameter== and the area quarters — so it stretches ==four times as much== (the same force through four times less area); a ==stiffer== material stretches ==less==, in direct proportion to E. That single line generates October 2023 Q8 (Δx doubles when length halves and diameter halves: ½ length → ½, ½ diameter → 4×, net ×2), October 2025 Q8 (halve A, double E → net unchanged), and every “same material, different shape” item the papers have set.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q16(b)(i) — the steel cable",
        question:
          "A steel cable of cross-sectional area 5.1 × 10⁻⁴ m² and unstretched length 3.8 m hangs from a support; its stiffness is 2.8 × 10⁷ N m⁻¹. With a steel object suspended, the strain in the cable is 3.0 × 10⁻⁴. Calculate the Young modulus of the steel. (4)",
        steps: [
          "Strain is given, so build stress: first the extension, ε = Δx/x → Δx = 3.0 × 10⁻⁴ × 3.8 = 1.14 × 10⁻³ m",
          "Then the force, from the cable's stiffness: F = kΔx = 2.8 × 10⁷ × 1.14 × 10⁻³ = 3.19 × 10⁴ N",
          "Stress: σ = F/A = 3.19 × 10⁴ ÷ 5.1 × 10⁻⁴ = 6.26 × 10⁷ Pa",
          "Young modulus: E = σ/ε = 6.26 × 10⁷ ÷ 3.0 × 10⁻⁴",
        ],
        answer:
          "E = 2.1 × 10¹¹ Pa. The MS also credits the three-mark shortcut E = kx/A — but the four-step chain earns four marking points where the shortcut earns three.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q18(a)(b) — spider silk",
        question:
          "A single thread of spider silk of radius 1.9 × 10⁻⁶ m carries a stress of 4.3 MPa. (a) Calculate the force on the thread. (3) (b) A 25.0 m thread has Young modulus 8.70 GPa and its limit of proportionality is at a stress of 300 MPa. Determine its length at that limit. (4)",
        steps: [
          "(a) The area is a circle of the ==radius==: A = πr² = π × (1.9 × 10⁻⁶)² = 1.13 × 10⁻¹¹ m²",
          "F = σA = 4.3 × 10⁶ × 1.13 × 10⁻¹¹ = 4.9 × 10⁻⁵ N — about the weight of a gnat, which is what a real thread carries",
          "(b) E = σ/ε rearranged gives the strain at the limit: ε = σ/E = 300 × 10⁶ ÷ 8.70 × 10⁹ = 3.45 × 10⁻² — a 3.45% fractional stretch",
          "Δx = εx = 3.45 × 10⁻² × 25.0 = 0.86 m; length at the limit = original + extension = 25.0 + 0.86",
        ],
        answer:
          "F = 4.9 × 10⁻⁵ N; length = 25.9 m. The report's error list: “treating the radius as the diameter, incorrectly converting 4.3 MPa to pascals, and forgetting to square the radius.” Radius is squared *and* halved, MPa is × 10⁶ — both are reading skills.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**A material identified from a table** — January 2024 Q17(c)'s brass deduction, worked in statement 31 below. **The meaning of a large E** — October 2022 Q5 and October 2025 Q16(a)(i) both ask which property a large Young modulus describes: the answer is ==stiffness== (a large stress-to-strain ratio, a material that resists elastic deformation) — never breaking stress, density or elasticity. **Recall of the unit** — January 2024 Q1 wants N m⁻² for stress. **A tension from a strain** — June 2025 Q17(b) hands over the strain and the geometry and wants the force the string exerts: the same chain, run backwards.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — why does dividing force by area make two wires of different thickness comparable?",
          "==Check yourself== — a wire is replaced by another of the same material, twice as long and twice the diameter. How does its extension under the same force change?",
          "==Check yourself== — why does strain have no unit, and stress have the same unit as pressure?",
        ],
      },
    ],
  },
  {
    spec: "29",
    statement:
      "a be able to draw and interpret force-extension and force-compression graphs b understand the terms limit of proportionality, elastic limit, yield point, elastic deformation and plastic deformation and be able to apply them to these graphs",
    title: "Force-extension graphs — the biography of a sample under load",
    blocks: [
      {
        k: "p",
        text: "A force–extension graph is not a shape to memorise — it is a ==story with chapters==, and each named point is an event in the life of the sample. Pull gently and the atoms of the material are all nudged a little further from their comfortable spacing; they pull back in proportion, the graph is a ==straight line==, and release everything to its original size. This is the ==elastic== chapter, and it ends at the ==limit of proportionality==, where equal steps of force stop buying equal steps of extension.",
      },
      {
        k: "p",
        text: "Pull further and the structure starts to ==slip internally==: some bonds give way and small patches of the material rearrange. The graph curves, and the critical threshold arrives at the ==elastic limit== — the last point from which the sample can still return to its original length when the load is removed. Past it, the material has ==learned a new shape==: this is ==plastic deformation==, and it is permanent not because the material is tired but because whole regions have ==slid== into new positions that no elastic pull can undo.",
      },
      {
        k: "p",
        text: "Keep pulling and many ductile metals hit the ==yield point==: a sudden, large increase in extension for little extra force — the sample ==flows==, like cold honey under a firm hand. Beyond the yield point the graph often flattens or falls: the material stretches enormously while the force barely grows. This is the ==plastic chapter==, and it ends at fracture. ==Elastic== and ==plastic== are therefore not just labels on a graph — they are the difference between a shape that is ==remembered by stretched bonds== (recoverable, energy stored and returned) and a shape that is ==remembered by slid layers== (permanent, energy spent as heat).",
      },
      {
        k: "figure",
        kind: "ph-force-extension",
        caption:
          "The full force–extension biography of a ductile metal wire: a straight elastic line to the limit of proportionality, the elastic limit where recovery stops being complete, the yield point where it flows, the plastic region, and fracture. The shaded triangle is the energy stored at one point on the line (statement 32).",
      },
      {
        k: "table",
        caption: "The five terms — what each one MEANS, then the mark scheme's wording",
        head: ["Term", "What physically happens", "The mark-worthy definition"],
        rows: [
          ["Limit of proportionality", "end of uniform, proportional response — the straight line ends", "the point beyond which force is no longer proportional to extension"],
          ["Elastic limit", "last point of full recovery; beyond it the sample keeps a new length", "the stress/force beyond which the material ==does not return to its original length when the load is removed=="],
          ["Yield point", "sudden internal slip: the sample flows", "the point at/beyond which the material undergoes ==a sudden or large plastic deformation=="],
          ["Elastic deformation", "bonds stretched, all recovered on unloading", "the material ==returns to its original size/length when the force is removed=="],
          ["Plastic deformation", "layers slid into new positions; permanent", "permanent deformation — the object ==does not return== to its original dimensions"],
        ],
      },
      {
        k: "p",
        text: "The two classic confusions are dissolved by the story. ==Limit of proportionality vs elastic limit==: the first is where the ==straight line== ends (a statement about the graph's shape); the second is where ==full recovery== ends (a statement about what unloading does). They sit close together but they answer different questions — October 2021's report noted candidates who “included definitions of both, thus demonstrating that they did not understand the distinction”. ==Yield point vs elastic limit==: October 2023 Q3 put all four terms in one MCQ, and the correct row for “elastic limit” was the *deformation on removal* wording — the yield point is the *sudden flow*, a different event. January 2024 Q9 asks the same sorting on stress–strain axes.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q11 — the rubber band's loop",
        question:
          "A rubber band is stretched by a force increasing to 4 N (extension ≈ 4.5 cm) and the force is then decreased; the force–extension graph traces a loop, the decreasing-force line sitting below the increasing-force line, both ending back at the origin. (a) State how the graph shows the band deformed elastically. (1) (b) The work done stretching exceeds the work recovered; the difference heats the band. Determine the energy that caused the heating. (3)",
        steps: [
          "(a) Elastic means ==full recovery==: when the force returns to zero the extension returns to zero — the unloading line comes back to the origin",
          "(b) Work done stretching = area under the ==loading== line; work recovered = area under the ==unloading== line; the heating energy is the difference — the ==area of the loop==",
          "Count squares inside the loop: each square is 0.5 N × 0.005 m = 2.5 × 10⁻³ J; the loop holds about 19 squares",
          "E = 19 × 2.5 × 10⁻³",
        ],
        answer:
          "E ≈ 0.048 J (allowed 0.0425–0.053). The report's traps: candidates who “did not realise that a numerical answer was needed”; who “treated each line as a single straight line and then tried to use E = ½FΔx” — the band is non-linear, so that triangle formula is for straight lines only; and who did not convert cm to m.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**“Describe the deformation”** — name the chapter the sample is in, from the graph's shape: linear elastic, curving (still elastic or just past the limit), flowing (plastic). **A non-origin straight line** (January 2024 Q17(c)): the wire was already taut before loading — the law still holds, but for ==changes==: “a large proportion of candidates did not notice that the graph does not start at the origin”, and the raw readings are worthless; ΔF and Δx are the quantities. **A spring stretched past its elastic limit and released** (January 2025 Q4): the unloading line is ==parallel== to the loading line but ==offset== — the spring keeps a permanent extra length: plastic deformation of a spring is still a spring. **Energy from a loop** — the hysteresis above; the area *under* the loading curve alone is the work done *on* the sample (October 2022 Q6: Q + R, the region under the loading line).",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — a wire is loaded to just past its elastic limit and unloaded. Why can no elastic pull return it to its original length?",
          "==Check yourself== — which point marks the end of the straight line, and which the end of full recovery — and why are they different questions?",
          "==Check yourself== — why does the loading–unloading loop of a rubber band heat it up?",
        ],
      },
    ],
  },
  {
    spec: "30",
    statement:
      "be able to draw and interpret tensile or compressive stress-strain graphs, and understand the term breaking stress",
    title: "Stress-strain graphs and breaking stress — the biography of a MATERIAL",
    blocks: [
      {
        k: "p",
        text: "Statement 29's biography belonged to ==one sample==. Divide both axes by geometry — force per area, extension per length — and the same story is retold in a way that belongs to ==the material itself==: every steel wire, whatever its length or thickness, produces the ==same== stress–strain curve. That is the entire point of the normalisation, and it is why the graph's features now name ==material properties==: the gradient of the linear section is the ==Young modulus== (January 2025 Q1 asks exactly this as an MCQ — the gradient, never the area or the product of the axis extremes); the end of the curve is the ==breaking stress==, the maximum stress the material survives before it fractures.",
      },
      {
        k: "def",
        term: "Breaking stress",
        text: "The ==maximum stress a material can withstand before it breaks== — the stress at the very end of the curve. On a two-wire comparison (January 2024 Q9) it is the stress at the ==end of each line==: not the top of the straight section (that is the yield stress) and not the gradient (that is the Young modulus). Three features, three different questions about strength and stiffness.",
      },
      {
        k: "p",
        text: "The shape of the curve ==is== the material's personality. A ==ductile== metal shows a long plastic chapter — it yields, flows and stretches far before fracture, which is what makes it drawable into wire. A ==brittle== material (glass, ceramic, carbon-fibre at low strain) shows almost no plastic chapter: the line stays straight until it snaps — the whole story is the elastic chapter plus a full stop. January 2025 Q17 uses exactly this: two lines on stress–strain axes, one steep and short (high E, small strain at break), one shallow and long, and the question is which material each behaviour belongs to. Reading ==personality from shape== turns every comparison question from recall into observation.",
      },
      {
        k: "figure",
        kind: "ph-stress-strain",
        caption:
          "The complete tensile stress–strain curve for a ductile metal: the straight line whose gradient is the Young modulus, the elastic limit, the yield point where the sample flows, the maximum stress (ultimate tensile), and the breaking point. A brittle material would be a straight line to fracture with none of the flow.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2023 Q14 — is the metal suitable?",
        question:
          "A compressive stress–strain graph for a metal is a straight line through the origin. (b)(i) Show that the Young modulus is about 2 × 10¹¹ Pa. (2) (b)(ii) A machine part of length 0.84 m and cross-sectional area 4.8 × 10⁻³ m² must not compress more than 0.60 mm under a force of 9.5 × 10⁵ N. Deduce whether this metal is suitable. (4)",
        steps: [
          "(b)(i) Gradient from a large triangle spanning more than half the drawn line: e.g. 4.2 × 10⁸ Pa ÷ 2.0 × 10⁻³ = 2.1 × 10¹¹ Pa",
          "(b)(ii) The stress the part would suffer: σ = F/A = 9.5 × 10⁵ ÷ 4.8 × 10⁻³ = 1.98 × 10⁸ Pa",
          "The strain that stress would cause, via the material's own E: ε = σ/E = 1.98 × 10⁸ ÷ 2.1 × 10¹¹ = 9.4 × 10⁻⁴",
          "Extension: Δx = εx = 9.4 × 10⁻⁴ × 0.84 = 0.79 mm — against the 0.60 mm limit",
        ],
        answer:
          "0.79 mm > 0.60 mm, so the metal is not suitable. The report: “Too many candidates simply stopped with a value for the extension or Young modulus and just left the examiner to draw the conclusion.” The conclusion sentence *is* the fourth mark. (The MS also credits the reverse route: the modulus the part would need, 2.8 × 10¹¹ Pa, compared with the metal's 2.1 × 10¹¹.)",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q18(c) — spider silk vs steel, and WHERE the energy lives",
        question:
          "Spider silk: E = 8.70 GPa, limit of proportionality at 300 MPa. Steel: E = 200 GPa, limit at 350 MPa. (i) Add steel's line to a stress–strain sketch of the silk's. (ii) Samples of identical shape and length, both stretched to their limits of proportionality — explain which stores more elastic strain energy. (3)",
        steps: [
          "(i) Steel's line is far ==steeper== (200 GPa vs 8.7 GPa) through the origin, reaching a slightly greater stress but at a ==much smaller strain== — a short, steep line beside a long, shallow one",
          "(ii) Identical samples, so equal volume: compare energy ==per unit volume==, which is the ==area under the stress–strain line== (½ × stress × strain at the limit)",
          "The forces (stresses) at the two limits are similar — 300 vs 350 MPa — but the strains differ enormously: 300/8.7 ≈ 3.4% for silk vs 350/200 ≈ 0.18% for steel",
          "The silk's triangle is ~25 times longer along the strain axis at a similar height — vastly more area",
        ],
        answer:
          "The spider silk stores far more. The report's precise wording trap: candidates “incorrectly stated that the area under the graph is *equal to* the elastic strain energy rather than being *proportional to* the elastic strain energy” — on stress–strain axes the area is energy ==per unit volume==; multiply by the sample's volume to get the energy itself.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Three features, three questions** — January 2024 Q9: identify yield stress (top of the straight section), breaking stress (end of the line) and Young modulus (gradient) on one pair of axes; every distractor is one feature's definition worn by another's name. **A line to draw** — October 2024 Q18(c)(i): steeper line through the origin, ending at a slightly higher stress; the one-mark loss was “extending the line too far up the stress axis”. **A safety deduction** — June 2023 Q20(b)(iii): the cable's working stress 2.02 × 10⁷ Pa against 15% of its yield stress 2.5 × 10⁸ Pa (= 3.75 × 10⁷ Pa): 2.0 < 3.75, so it is safe — the working margin, compared numerically, then concluded. **A harder cable** — June 2023 Q20(c): greater cross-section at the ==same breaking stress== (a material property, unchanged by shape) and a lower E → more extension at break → ==more work done to break it==; “most candidates did not realise that breaking stress was unchanged” despite the question saying so.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — why do all wires of the same steel share one stress–strain curve but not one force–extension curve?",
          "==Check yourself== — name the graph feature for: (a) stiffness of the material, (b) where flow begins, (c) the strength ceiling.",
          "==Check yourself== — a ductile metal and a glassy ceramic are pulled to breaking. How do their curves differ, and what does the difference mean physically?",
        ],
      },
    ],
  },
  {
    spec: "31",
    statement: "CORE PRACTICAL 3: Determine the Young modulus of a material",
    title: "Core Practical 3 — the Young modulus of a wire, as a designed experiment",
    blocks: [
      {
        k: "p",
        text: "The Young modulus experiment is an ==uncertainty-budgeting exercise== wearing a lab coat. The target is E = FL/(AΔx), and every letter carries an uncertainty you can shrink by design. That is why the rig looks the way it does — and why the examiners keep asking not “what did we measure” but “==why did we measure it that way==”.",
      },
      {
        k: "figure",
        kind: "ph-young-rig",
        caption:
          "The long-wire rig: test wire and reference wire hang side by side from a ceiling clamp, joined by a vernier scale; masses load the test wire; a micrometer sizes the diameter. The long, thin wire is a deliberate design choice.",
      },
      {
        k: "p",
        text: "==Why a long, thin wire?== Extension follows Δx = FL/(AE): for a given force, a ==long== wire stretches ==more== (large Δx — and percentage uncertainty shrinks as the measured quantity grows), and a ==thin== wire stretches more still (small A). A long thin wire turns a sub-millimetre stretch into something a vernier can read — with modest, safe loads. ==Why a vernier scale rather than a metre rule?== Resolution: the vernier reads to 0.1 mm against the rule's 1 mm, so the ==percentage uncertainty== in the all-important extension is ten times smaller — the January 2024 report lamented that “the proportion of students who referred to resolution and went on to link this to uncertainty was very low”. ==Why measure the diameter at several positions and orientations?== Because wires are not perfectly uniform or perfectly round; the cross-sectional area A carries a ==squared== dependence (A = πr²), so a 2% diameter error becomes a 4% area error — the diameter deserves the best instrument (a micrometer) and several readings, averaged.",
      },
      {
        k: "p",
        text: "==Why two wires, one loaded and one not?== The reference wire carries ==no load== and hangs beside the test wire. Whatever happens to ==both== — the support settling, the room warming and expanding both wires — happens to the reference too, and the vernier reads the ==difference== between them: pure extension, with the drifts cancelled. It is the same trick as a null measurement, and it is why the mark schemes' indicative content lists “use of a second/reference wire” as a design point worth naming. ==Why load and unload in equal steps?== To confirm the wire is still in its ==linear, elastic== chapter — if unloading retraces loading, Hooke's law held and the gradient is legitimate; if it does not, the wire has been plastically deformed and E from that graph is fiction.",
      },
      {
        k: "steps",
        caption: "The measurement plan, mapped to E = FL/(AΔx)",
        items: [
          {
            title: "F — the loading",
            text: "Add masses in equal steps; the force is ==calculated== as W = mg (or read from a newtonmeter). Loading and unloading both logged; plot force against extension.",
          },
          {
            title: "L — the original length",
            text: "Metre rule, ==clamp to marker==: the length that actually stretches. Long is good — big L, big Δx, small percentage uncertainty. (A rule is fine here: L is large, so its relative uncertainty is small even at 1 mm resolution.)",
          },
          {
            title: "Δx — the extension",
            text: "The ==marker's movement==, read on the vernier (0.1 mm resolution) against the reference wire. Vague answers like “measure the extension” score nothing — the June 2024 report: “it was reasonably common for candidates to ‘measure the extension’ without making it clear what they were actually measuring.”",
          },
          {
            title: "A — the cross-section",
            text: "Micrometer: diameter at ==several positions along the wire and several orientations==, mean taken, radius = half the diameter, A = πr².",
          },
          {
            title: "E — the extraction",
            text: "Straight line through the origin confirms Hooke's law held. From a force–extension graph: ==E = gradient × (L/A)==. From stress–strain axes: E is the gradient itself. Compare the result with data-book values and ==conclude==.",
          },
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q17 — identify the metal",
        question:
          "A student hangs masses from a 1.80 m wire of diameter 0.17 mm; the force–extension graph is a straight line that does not pass through the origin (it meets the force axis above zero). Given the table (aluminium 68 GPa, brass 106 GPa, steel 200 GPa), deduce which metal the wire is made from. (5)",
        steps: [
          "The line does not start at the origin — the wire was ==already taut== at the first reading, so use changes: e.g. ΔF = 14 N with its Δx = 10.4 mm",
          "A = πr² = π × (0.17 × 10⁻³ ÷ 2)² = 2.27 × 10⁻⁸ m²",
          "Δσ = ΔF/A = 14 ÷ 2.27 × 10⁻⁸ = 6.17 × 10⁸ Pa; Δε = Δx/x = 0.0104 ÷ 1.80 = 5.78 × 10⁻³",
          "E = Δσ/Δε = 6.17 × 10⁸ ÷ 5.78 × 10⁻³ = 1.07 × 10¹¹ Pa",
          "Compare with the table: 107 GPa ≈ 106 GPa → brass",
        ],
        answer:
          "The wire is brass. The report: “a large proportion of candidates did not notice that the graph does not start at the origin. Of those who did… many did not compare the value they obtained with the 106 GPa given in the table, and therefore did not score the final mark.” Changes, then the comparison — both are marks.",
      },
      {
        k: "note",
        label: "Safety and the small-print marks",
        text: "==Safety==: goggles — the wire stores elastic energy, and if it snaps that energy flies with the broken end; “common incorrect answers included wearing a helmet, gloves or shoes” (January 2024). Say the ==hazard== and the ==mechanism==, not a costume. ==Why a thin wire must not be overloaded==: past the elastic limit the gradient is no longer E — the whole experiment silently invalidates itself, which is why loading in equal steps with an unload check is part of the method, not decoration.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — why does a long thin wire give a smaller percentage uncertainty in E than a short thick one?",
          "==Check yourself== — what exactly does the reference wire cancel, and how?",
          "==Check yourself== — a 2% error in the diameter becomes what error in the area, and why?",
        ],
      },
    ],
  },
  {
    spec: "32",
    statement:
      "be able to calculate the elastic strain energy Eel in a deformed material sample, using the equation ΔEel = ½FΔx, and from the area under the force-extension graph. The estimation of area and hence energy change for both linear and non-linear force-extension graphs is expected",
    title: "Elastic strain energy — where the work goes",
    blocks: [
      {
        k: "p",
        text: "Stretch something and you do ==work on it== — force times distance moved. But which force? While you pull, the resisting force ==is not constant==: it starts at zero and ==grows== as the sample stretches (that is Hooke's law, statement 27). The work done is therefore the sum of many tiny contributions — force × little bit of distance — which is exactly the ==area under the force–extension graph==. For the straight, linear region that area is a ==triangle==: base Δx, height F, so ==ΔEel = ½FΔx==. The mysterious ½ is just the average force (½F) acting over the whole extension — the sample never felt the full F for the whole distance; it felt it growing.",
      },
      {
        k: "eq",
        eq: "ΔEel = ½FΔx        ΔEel = ½kΔx²        ΔEel = area under the force-extension graph",
        note: "One idea, three faces: the second face is one substitution away: F = kΔx into the first gives ½(kΔx)Δx = ½kΔx² — energy grows with the ==square== of the extension, which is why stretching twice as far costs four times the energy. The third face is the master statement: it works for ==linear and non-linear graphs alike==, which is what the specification's own words demand (“estimation of area… for both linear and non-linear force-extension graphs”).",
      },
      {
        k: "p",
        text: "Where does the energy ==end up==? In the elastic chapter, the stretched bonds hold it — release the load and the sample ==hands it back==, doing work on whatever let it go (that is what launching a projectile from a catapult ==is==). But if the loading and unloading curves form a ==loop== (statement 29's rubber band), the energy returned is ==less== than the energy invested: the ==area of the loop== has been spent inside the material, warming it — internal friction between slipping layers. Elastic recovery returns stored energy; plastic slip and hysteresis ==dissipate== it. One graph, two fates, and the reading of which is which is whether the unloading line ==retraces==.",
      },
      {
        k: "p",
        text: "Statement 30's normalisation gives the energy a third costume: divide the force–extension area by the sample's ==volume== and you get the ==energy per unit volume== — the area under the ==stress–strain== graph (check the algebra: (F/A)·(Δx/x) = FΔx/(Ax) = FΔx/V). Multiply that density back by any sample's volume and its stored energy returns. That is why the October 2024 report insists the stress–strain area is ==proportional to== the elastic strain energy, not equal to it — equal only for a sample whose volume you have already divided out.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q15(a) — the brick on the foam",
        question:
          "A force–compression graph for a foam brick rises linearly from (0, 0) to (60 nm, 85 N) and on to (97.5 nm, 140 N). Calculate the increase in elastic strain energy as the compression goes from 60 nm to 97.5 nm. (3)",
        steps: [
          "The energy at 97.5 nm is a triangle of base 97.5 nm and height 140 N; the energy already stored at 60 nm is a triangle of base 60 nm and height 85 N",
          "E(97.5) = ½ × 140 × 97.5 × 10⁻⁹ = 6.83 × 10⁻⁶ J; E(60) = ½ × 85 × 60 × 10⁻⁹ = 2.55 × 10⁻⁶ J",
          "The increase is the difference — equivalently, the trapezium between the two compressions",
          "ΔEel = 6.83 × 10⁻⁶ − 2.55 × 10⁻⁶",
        ],
        answer:
          "ΔEel = 4.3 × 10⁻⁶ J. The report: “it was relatively common for candidates to multiply the change in force by the change in compression (140 − 85) × (97.5 − 60) nm, which was incorrect physics” — changes multiply nowhere in ½FΔx; the energy is an ==area==, and areas need their full bases and heights.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2025 Q15(b) — show that Eel ∝ F²",
        question:
          "The graph of extension Δx against total force F for a spring is a straight line through the origin. Explain why the elastic strain energy stored is proportional to F². (3)",
        steps: [
          "Start from the definition of stored energy as the area under the force–extension graph: Eel = ½FΔx",
          "The straight line through the origin is Hooke's law: F = kΔx, so Δx = F/k",
          "Substitute: Eel = ½F × (F/k) = F²/(2k), and k is a constant for the spring",
        ],
        answer:
          "Eel ∝ F² — quadruple the force and sixteen times the energy. Three marking points: the area/energy statement, the proportionality Δx ∝ F, and the substitution with k constant.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**A race with gravity** — October 2024 Q17(b): the bungee rope's stored energy (½FΔx = 40.5 kJ at the stretched length) against the student's lost gravitational energy (mgΔh = 22.3 kJ) decides whether the river is reached — 40.5 > 22.3, so the rope wins and the student stops short. October 2023 Q16(b)(ii) runs the same race between a cable's elastic energy and an electromagnet's GPE, annotated ==on the graph== with the question's own quantities. **A comparison of materials** — October 2024 Q18(c)(ii), worked in statement 30: same-shape samples, energy per unit volume from the stress–strain areas. **Springs combined** — October 2022 Q8: three parallel springs under 2F store (4/3)E, because each carries 2F/3 and stretches 2Δx/3. **The catapult question** — how much energy is available to a launched mass: the area under the loading curve up to the release point, then ½mv² = ΔEel if all of it transfers.",
      },
      { k: "h", text: "The materials traps — the examiner's own list, now with reasons" },
      {
        k: "table",
        caption: "Every recurring materials error, 2019–2025 — and the understanding that dissolves it",
        head: ["The trap", "Why it happens", "The fix"],
        rows: [
          ["Diameter used as radius (A = πd², or r = d)", "the stem says diameter and the formula wants radius — reading, not physics", "halve once, at the top, then square: June 2025's sphere questions “relatively commonly” include both"],
          ["cm³ or mm² not converted to m³ / m²", "volume is cubic; the exponent feels optional", "(10⁻²)³ = 10⁻⁶ — cubes carry cubes"],
          ["MPa, GPa entered as plain numbers", "the prefix is invisible in the stem's typography", "1 MPa = 1 × 10⁶ Pa; 1 GPa = 1 × 10⁹ Pa — January 2025 recorded 110 treated as 110 Pa"],
          ["v in Stokes' law read as a volume", "letters read as shapes, not quantities", "v is m s⁻¹ — distance ÷ time, or a graph gradient"],
          ["Stopping at a value in a deduce question", "the calculation feels finished", "number, comparison (<, >, =, ≈), conclusion sentence — the last mark is always there"],
          ["Truncating instead of rounding", "417 looks like 410 and 420 both “round to 400”", "417 → 420, never 410; carry guard digits, round once at the end"],
          ["“The area under the graph is the energy”", "true on force–extension axes, false on stress–strain axes", "stress–strain area = energy ==per unit volume== — proportional, not equal"],
          ["Bare numbers with no units", "the calculation feels finished", "Pa for stress, Pa s for viscosity, no unit for strain, % only with its symbol"],
        ],
      },
      {
        k: "p",
        text: "One closing habit from the June 2024 report, worth a mark in every paper: ==sanity-check magnitudes== — an extension “greater than the size of a typical laboratory” or “a mass of 229 kg should send up a warning signal”. If the physics has gone wrong, the number usually knows before you do; a ten-second glance back at the substitution is the cheapest mark-saver on the paper.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — where does the ½ in ½FΔx come from, physically?",
          "==Check yourself== — a loading–unloading loop encloses an area. Where has that energy gone, and why couldn't the sample return it?",
          "==Check yourself== — why is the area under a stress–strain graph only *proportional to* the stored energy, and what do you multiply it by to get the energy?",
        ],
      },
    ],
  },
];
