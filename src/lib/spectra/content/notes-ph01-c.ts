import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 1 Forces, motion and energy · Part C
   Spec statements 15–22: moments, centre of gravity and
   equilibrium, work, kinetic energy, gravitational potential
   energy, conservation of energy, power, efficiency.

   Worked examples are real WPH11/01 questions with the official
   mark schemes' working; examiner-report excerpts are verbatim
   from the Principal Examiners' reports, 2019–2025.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH01_C: SpecSection[] = [
  {
    spec: "15",
    statement:
      "be able to use the equation for the moment of a force, moment of force = Fx where x is the perpendicular distance between the line of action of the force and the axis of rotation",
    title: "The moment of a force",
    blocks: [
      {
        k: "def",
        term: "Moment of a force",
        text: "The turning effect of a force about an axis: ==moment = Fx==, where x is the ==perpendicular distance== from the axis of rotation to the line of action of the force. Unit: ==N m== — the October 2024 report records answers given in “Nm⁻¹ or N instead of Nm”.",
      },
      {
        k: "figure",
        kind: "ph-moments",
        caption:
          "A beam pivoted at one end: each force turns the beam about the pivot, and each moment is force × perpendicular distance. The weight's moment acts through the centre of gravity, at the beam's midpoint.",
      },
      {
        k: "p",
        text: "The one subtlety is ==x==. When the force acts at an angle, x is the perpendicular distance from the pivot to the force's *line of action* — equivalently, use the component of the force perpendicular to the lever: moment = F cos θ × d when θ is the angle between force and lever. Two geometries, same answer; pick whichever the question's diagram makes natural.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q13 — the pedal",
        question:
          "A cyclist of weight 580 N stands on a pedal attached to a chain-ring by a lever 0.21 m long, at 24° to the horizontal. Determine the moment of the weight about the pedal's pivot. (3)",
        steps: [
          "The weight acts vertically; the perpendicular component of the weight on the lever is W cos 24° (the lever makes 24° with the horizontal, the weight 90° with it)",
          "Moment = Fx = 580 × cos 24° × 0.21",
          "= 580 × 0.9136 × 0.21",
        ],
        answer:
          "Moment = 110 N m (2 s.f.). The report: “The most common error was to use incorrect trigonometry. Candidates who used sin instead of cos could still score marking point 2” — the equation mark survives, the value does not. One candidate in a hundred had a calculator in radians: check degrees.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2023 Q13(b)(ii) — the stone on the step",
        question:
          "A uniform rectangular stone of weight 415 N and length 0.90 m rests on a step, with 0.50 m of its length overhanging the edge. A builder applies the minimum downward force P at the overhanging end. Calculate P. (3)",
        steps: [
          "The stone is uniform, so its centre of gravity sits at its midpoint: 0.45 m from either end — which is 0.05 m beyond the step's edge",
          "At the point of lifting, the stone pivots on the edge: take moments about the edge",
          "Anticlockwise (the weight): 415 × 0.05 = 20.8 N m. Clockwise (P): P × 0.40",
          "P × 0.40 = 20.8",
        ],
        answer:
          "P = 52 N. The geometry is the whole question — the report: “many candidates struggled with this. Students should be encouraged to annotate figures so that distances between the points of action of forces are clearly seen.”",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Direction matters**: state which way each moment turns (clockwise / anticlockwise) — October 2025 Q20(b)(i) asks for the *direction* of the motor's moment on a bascule bridge, which reverses as the bridge's centre of gravity passes over the pivot. **A force applied at a new angle**: June 2025 Q19(b)(ii) — pushing vertically on a rail instead of perpendicular means the perpendicular component is smaller, so “the force needed is greater” for the same moment. **Minimum force**: the force is smallest where its perpendicular distance from the pivot is largest — at the far end, perpendicular to the lever.",
      },
    ],
  },
  {
    spec: "16",
    statement:
      "be able to use the concept of centre of gravity of an extended body and apply the principle of moments to an extended body in equilibrium",
    title: "Centre of gravity and the principle of moments",
    blocks: [
      {
        k: "def",
        term: "Equilibrium",
        text: "An object is in equilibrium when there is ==no resultant force== on it ==and no resultant moment== (about any point). Two marks, two sentences — and the January 2024 report insists “clockwise moment = anticlockwise moment” alone “was not sufficient”, because it omits the forces half.",
      },
      {
        k: "def",
        term: "The principle of moments",
        text: "For an object in equilibrium, the ==total clockwise moment about any point equals the total anticlockwise moment== about that point. June 2025's preferred wording: “total clockwise moment = total anticlockwise moment” or “sum of all moments = zero”.",
      },
      {
        k: "steps",
        caption: "The moments method — the five moves every question wants",
        items: [
          {
            title: "1 · Choose a pivot",
            text: "Any point works in equilibrium, so choose the one that kills the most unknowns — usually where an unknown force acts. The October 2022 MS prints it: “accept pivot point clearly indicated on diagram”. Not stating it is the most-documented lost mark in the whole topic.",
          },
          {
            title: "2 · Mark the centre of gravity",
            text: "For a uniform body the weight acts at its geometric centre — the midpoint of a beam, the centre of a disc. Annotate the distance from the pivot to the CG before writing any equation.",
          },
          {
            title: "3 · List the forces and their turning directions",
            text: "Each force either turns clockwise or anticlockwise about your pivot — or acts through it (moment zero, which is why you chose it).",
          },
          {
            title: "4 · Write moment = Fx for each",
            text: "Perpendicular distances only. Resolve or use the angle, as in statement 15.",
          },
          {
            title: "5 · Balance and conclude",
            text: "Σ clockwise = Σ anticlockwise; solve; and if the command word is *deduce*, finish with the explicit comparison and a sentence.",
          },
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q15 — the loft ladder",
        question:
          "A board hinged to the ceiling covers a roof-space opening; a ladder hangs from a rail on it. Weight of board and rail 50 N acting 0.45 m from the hinge; ladder weight 54 N, uniform, 2.70 m long with 0.85 m to the left of the hinge. A small block stops the board rotating. (b)(i) Explain, with calculations, why the board stays put. (5) (b)(ii) A downward force applied 0.80 m from the hinge just rotates the board away from the block — find its magnitude. (2)",
        steps: [
          "Ladder CG is at its centre: 2.70/2 = 1.35 m from its left end, which is 0.85 m left of the hinge — so the CG is 0.50 m to the *right* of the hinge",
          "Clockwise (about the hinge): ladder's weight 54 × 0.50 = 27 N m. Anticlockwise: board's weight 50 × 0.45 = 22.5 N m",
          "27 N m > 22.5 N m clockwise, so the assembly presses on the block, and the block supplies the balancing moment — equilibrium",
          "(b)(ii) The extra force must overcome the imbalance: F × 0.80 = 27 − 22.5 = 4.5 N m",
        ],
        answer:
          "F = 5.6 N. The report: “It was rare for candidates to appreciate that the block would also cause a moment about the hinge, so only a small fraction of candidates scored all 5 marks” — and “it was rare… to see relevant calculations” in an *explain* question: explanation here *requires* the numbers.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2024 Q18 — the bridge",
        question:
          "A uniform bridge deck of weight 9.8 × 10⁵ N spans 120 m between supports X and P. A load of 4.2 × 10⁵ N sits 35 m from X. The deck is in equilibrium. (a) Determine the force Q from support P on the deck and the force P_x from support X. (5)",
        steps: [
          "Take moments about X — P_x acts through X, so it drops out",
          "Clockwise: 9.8 × 10⁵ × 60 (the deck's CG at its midpoint) + 4.2 × 10⁵ × 35 = 5.88 × 10⁷ + 1.47 × 10⁷ = 7.35 × 10⁷ N m",
          "Anticlockwise: Q × 120 → Q = 7.35 × 10⁷ ÷ 120",
          "Q = 6.1 × 10⁵ N. Then no resultant force: P_x = 9.8 × 10⁵ + 4.2 × 10⁵ − 6.1 × 10⁵",
        ],
        answer:
          "Q = 6.1 × 10⁵ N, P_x = 7.9 × 10⁵ N. The MS prints “Maximum 4 marks if incorrect / no unit with answers” — the harshest unit penalty on any recent paper.",
      },
      {
        k: "note",
        label: "Examiner's report — June 2023, Q19(b)(ii)",
        text: "“Candidates who annotate their diagrams tend to do better with moment problems than those who do not… Common errors included assuming that the load was 30 m from the pivot… or the omitting of the CoG moment.” The October 2022 report adds the pivot rule: “A majority of candidates were able to calculate the distance correctly, but a large number missed a mark by not specifying a pivot point.”",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**A uniform body with a counterweight** — October 2025 Q20(b)(iii): a 45 m bascule section pivoted 12 m from one end (weight 1.2 × 10⁷ N at its midpoint, 10.5 m from the pivot), a bus of weight 71 kN with CG 28 m from the pivot, and a counterweight of 4.0 × 10⁶ N whose CG is 11 m on the other side. Motor moment = (1.2 × 10⁷ × 10.5 + 7.1 × 10⁴ × 28) − 4.0 × 10⁶ × 11 = 8.4 × 10⁷ N m. **Testing a claim** — January 2025 Q16(b): a rice balance “must contain 3 portions”; compute the weight of one portion from the first equilibrium, then the number that the new geometry supports (8.2), and conclude. **Vector equilibrium** — October 2023 Q9 and October 2025 Q6 both write the force condition as a vector equation, W⃗ + T⃗₁ + T⃗₂ = 0⃗; two rope tensions sharing a weight also need 2T sin θ = W (January 2025 Q10). **A ladder or crane tipping** — June 2023 Q19(b)(ii): compute where the load would have to sit for the counterweight to balance (15.2 m), compare with the beam's 22.0 m, conclude it topples.",
      },
    ],
  },
  {
    spec: "17",
    statement:
      "be able to use the equation for work ΔW = FΔs, including calculations when the force is not along the line of motion",
    title: "Work done",
    blocks: [
      {
        k: "def",
        term: "Work done by a force",
        text: "==ΔW = FΔs== — force × the distance moved *in the direction of the force*. When the force is not along the motion, use the component along it: ==ΔW = FΔs cos θ==, with θ between force and displacement. Unit: the joule, 1 J = 1 N m.",
      },
      {
        k: "eq",
        eq: "ΔW = FΔs        ΔW = FΔs cos θ        work done against gravity = mgΔh",
        note: "The cosine version is NOT printed on the data sheet — ΔW = FΔs is. The angle handling is a skill the papers test explicitly (October 2023 Q10).",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q10 — the dragged box",
        question:
          "A box is pulled 5 m along the ground by a rope inclined at 40° to the horizontal; the rope's tension is 30 N. How much work is done on the box by the tension? (1)  A 150 J  B 115 J  C 96 J  D 23 J",
        steps: [
          "Only the component of the tension along the motion does work: F cos 40° = 30 × 0.766 = 23.0 N",
          "W = F cos θ × d = 23.0 × 5",
        ],
        answer:
          "B: 115 J. A is the no-cos trap (150 J); C is sin 40°; D is the *force component* (23 N) mistaken for the work.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q19 — the cyclist on the hill",
        question:
          "A cyclist rides up a 4.0° slope at constant speed, exerting a constant force of 150 N along the slope for 215 m; the mass of cyclist and bicycle is 90 kg. (a) Show that the work done by the cyclist is about 3 × 10⁴ J. (2) (b) Calculate the work done against air resistance. (4)",
        steps: [
          "(a) The force is *along* the slope and so is the motion — no cosine needed: ΔW = FΔs = 150 × 215 = 3.23 × 10⁴ J",
          "(b) Height gained: Δh = 215 × sin 4.0° = 15.0 m → work against gravity = mgΔh = 90 × 9.81 × 15.0 = 1.32 × 10⁴ J",
          "Total work = work against gravity + work against air resistance",
          "W_air = 3.23 × 10⁴ − 1.32 × 10⁴",
        ],
        answer:
          "W_air = 1.9 × 10⁴ J (the “show that” value 3 × 10⁴ gives 1.7 × 10⁴ — both accepted via ecf). The report's two catches: “a common mistake was to multiply the distance by a cosine or a sine of the angle” in (a) — the force is already along the slope — and “some candidates calculated the change in g.p.e. and left that as a final answer” in (b).",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**GPE as work** — October 2023 Q5: the increase in gravitational potential energy of a rising helicopter is “work done *by* the helicopter *against* the force of gravity” (option C). **Work from a graph** — the area under a force–extension graph (statement 32) and under a force–displacement curve generally. **Work by an unseen force** — January 2025 Q13(a): a truck's kinetic energy (8.0 × 10⁶ J) is removed by a resistive force of 3.5 × 10⁵ N, so Δs = W/F = 23 m — the *work–energy equivalence* the January 2025 report says “the majority did not pick up on”. **In an explanation**: October 2022 Q16(c) awards its energy-loss marks only when the answer says *work was done* — the word is the marking point.",
      },
    ],
  },
  {
    spec: "18",
    statement: "be able to use the equation Ek = ½mv² for the kinetic energy of a body",
    title: "Kinetic energy",
    blocks: [
      {
        k: "def",
        term: "Kinetic energy",
        text: "The energy a body has because it is moving: ==Ek = ½mv²==, in joules. Kinetic energy is a ==scalar== — direction counts for nothing — and it is proportional to the ==square== of the speed.",
      },
      {
        k: "p",
        text: "The square is the physics examiners love to probe. January 2023 Q17(c): double the hammer's landing speed and the kinetic energy quadruples, so the struck cylinder could rise four times as far — “the height gained does not double”. October 2023 Q6: double the kinetic energy and the new velocity is √2 × v. October 2022 Q9: a proton and an electron with equal kinetic energies have speeds in the inverse ratio of the square roots of their masses — the electron (1/2000 the mass) moves at √2000 × v.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q15(b)(i) — the high jump",
        question:
          "An athlete of weight 680 N crosses the bar with 409 J of kinetic energy. Show that his speed is about 3.4 m s⁻¹. (3)",
        steps: [
          "Mass from weight: m = W/g = 680 ÷ 9.81 = 69.3 kg",
          "Ek = ½mv² → v = √(2Ek/m) = √(2 × 409 ÷ 69.3)",
          "v = √11.8 = 3.44 m s⁻¹",
        ],
        answer:
          "v = 3.4 m s⁻¹ (3.44 shows the “about 3.4”). The W = mg → ½mv² chain is two marking points before the value — write both substitutions.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**KE change in a collision** — October 2022 Q16(c): the skaters' lost kinetic energy went as work done by forces between them, transferred to thermal energy. **KE given, speed wanted** — October 2025 Q14: a 56 kg rock with kinetic energy 4.1 × 10³ J moves at √(2 × 4100 ÷ 56) = 12.1 m s⁻¹, and *that* speed feeds the momentum equation. **KE per unit mass** — June 2019 Q7 computes the power of a water jet from the kinetic energy delivered each second. In every costume the trap is the same: the ½ and the square.",
      },
    ],
  },
  {
    spec: "19",
    statement:
      "be able to use the equation ΔEgrav = mgΔh for the difference in gravitational potential energy near the Earth's surface",
    title: "Gravitational potential energy",
    blocks: [
      {
        k: "def",
        term: "Gravitational potential energy (near the Earth's surface)",
        text: "The energy stored by a mass at height: ==ΔEgrav = mgΔh==, where Δh is the ==change in vertical height== — the height difference, never the distance along a slope. Near the Earth's surface, g is constant, which is what makes the equation linear.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2025 Q15(a) — the Cruachan pipes",
        question:
          "Water flows down straight pipes of length 350 m inclined at 55° to the horizontal, from a lake to a generator 1700 m³ of water (density 1100 kg m⁻³) per minute per pipe. Show that the power transferred by the water in each pipe is about 88 MW. (5)",
        steps: [
          "Mass per minute: m = ρV = 1100 × 1700 = 1.87 × 10⁶ kg",
          "Vertical drop: Δh = 350 × sin 55° = 287 m — the *vertical* height, not the pipe length",
          "Energy per minute: ΔEgrav = mgΔh = 1.87 × 10⁶ × 9.81 × 287 = 5.26 × 10⁹ J",
          "Power: P = E/t = 5.26 × 10⁹ ÷ 60",
        ],
        answer:
          "P = 8.77 × 10⁷ W ≈ 88 MW. Four marking points before the value: ρ = m/V, the sin 55°, mgΔh, then P = E/t. The MS also credits a route through the exit velocity and ½mv².",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2024 Q11 — the train on the incline",
        question:
          "A train of mass 1.7 × 10⁶ kg climbs at constant speed through a height of 25 m in 35 s; the engine's output power is 20 MW. (a) Show the gain in gravitational potential energy is about 420 MJ. (3) (b) Calculate the work done against resistive forces. (2)",
        steps: [
          "(a) ΔEgrav = mgΔh = 1.7 × 10⁶ × 9.81 × 25 = 4.17 × 10⁸ J — quote 417 MJ, not the truncated 410 MJ",
          "(b) Total energy supplied in 35 s: W = Pt = 20 × 10⁶ × 35 = 7.00 × 10⁸ J",
          "Work against resistances = total − ΔEgrav = 7.00 × 10⁸ − 4.17 × 10⁸",
        ],
        answer:
          "2.8 × 10⁸ J (ecf from (a)). The report on (a): “A small proportion of candidates truncated their calculated answer from 417 × 10⁶ to 410 × 10⁶ instead of correctly rounding it to 420 × 10⁶.” Round, never truncate.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Slopes**: Δh = L sin θ appears in the cyclist (October 2022), the hydro pipes (January 2025) and the zip-line (June 2024: R = 2 × 1200 × cos 72° for the force, mgΔh for the energy). **With kinetic energy** — statement 20's chain, where ½mv² = mgΔh cancels the mass entirely. **Per unit mass** — October 2023 Q5 defines the GPE increase as work done against gravity, which is what mgΔh *is*. **Show-that discipline**: the January 2025 report praises candidates who carried the “about 88 MW” forward — use the printed value in the next part when it helps.",
      },
    ],
  },
  {
    spec: "20",
    statement:
      "know, and understand how to apply, the principle of conservation of energy including use of work done, gravitational potential energy and kinetic energy",
    title: "Conservation of energy",
    blocks: [
      {
        k: "def",
        term: "The principle of conservation of energy",
        text: "Energy cannot be created or destroyed — only ==transferred between stores== (kinetic, gravitational, elastic, thermal…). In any real situation some energy is dissipated, usually as work done against resistive forces; the bookkeeping must still balance.",
      },
      {
        k: "eq",
        eq: "mgΔh = ½mv²        ΔEgrav = ΔEel        Ek lost = work done by resistive forces        total in = useful out + dissipated",
        note: "When the mass appears on both sides of a chain, it cancels — the speed at the bottom of a frictionless drop is √(2gΔh), whatever the mass. Three papers have asked exactly that.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q14 — the slide",
        question:
          "A child's slide has a vertical height of 1.7 m; a child of mass 24 kg starts from rest at the top; resistive forces are ignored. (a)(i) Explain why the equations of motion cannot be used to find the speed at the bottom. (3) (a)(ii) Determine the maximum speed. (3) (b) Slide Y is the same height but shorter; the child on Y has a greater mass. Compare the two maximum speeds. (3)",
        steps: [
          "(a)(i) The slide is curved: its gradient varies, so the acceleration varies — and the equations of motion require constant acceleration",
          "(a)(ii) All the gravitational potential energy becomes kinetic: mgΔh = ½mv² → v = √(2gΔh) = √(2 × 9.81 × 1.7)",
          "v = 5.8 m s⁻¹ — the MS prints “Do not accept use of equations of motion”",
          "(b) v = √(2gΔh) contains no mass: the mass cancels from both sides of mgΔh = ½mv²",
        ],
        answer:
          "v(X) = v(Y) — the same speed, whatever the mass and whatever the path length; only Δh matters. The report: “Some students discussed drag and friction in their answers, despite the question stating that resistive forces should be ignored.”",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q17(b) — the bungee jump",
        question:
          "A student of mass 65 kg bungee-jumps from a bridge on a rope of original length 17 m and stiffness 250 N m⁻¹. The river is reached if the rope stretches to a total length of 35 m. Deduce whether the student reaches the river. (4)",
        steps: [
          "Energy at 35 m below the bridge: ΔEgrav = mgΔh = 65 × 9.81 × 35 = 22 300 J",
          "Energy the rope can store by then: F = kΔx = 250 × 18 = 4500 N → ΔEel = ½FΔx = ½ × 4500 × 18 = 40 500 J",
          "The rope can store far more than the gravitational energy released",
        ],
        answer:
          "40 500 J > 22 300 J, so the student stops short of the river. The report notes the common wrong route — using F = kΔx with the *weight* to find the equilibrium position — which still earned the second marking point for using Hooke's law.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2022, Q16(c) and June 2025, Q20(c)",
        text: "October 2022: “Candidates overall simply stated that energy was transformed without telling us how. Consequently, only a very few of the most well-prepared students were able to score marks in this question.” The how is the marking point: *work is done by forces*, and the energy goes to a named store. June 2025, skydiver: “Egrav decreases throughout; while accelerating, Ek increases; and work is done against air resistance… At terminal velocity (Ek is constant and) all ΔEgrav is dissipated” — that is a complete energy-chain answer, and it is quoted from the mark scheme itself.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Escape lane** (January 2025 Q13a): the truck's 8.0 × 10⁶ J of kinetic energy is removed by a 3.5 × 10⁵ N resistive force — Δs = 23 m; the report says most candidates missed that “the change in kinetic energy is equivalent to the work done by the resistive force”. **Hammer and striker** (January 2023 Q17): the hammer's work input × efficiency = the cylinder's mgΔh; deduce whether it reaches the bell. **Zip-line** (June 2024 Q19c): √(2gΔh) again, with the assumption named — “work done against resistive forces is negligible” is the third marking point, and “very few candidates” wrote it. **Charging a battery** (June 2025 Q14): the input is the KE loss *minus* the GPE gain — careful accounting, next section's efficiency twist.",
      },
    ],
  },
  {
    spec: "21",
    statement: "be able to use the equations relating power, time and energy transferred or work done P = E/t and P = W/t",
    title: "Power",
    blocks: [
      {
        k: "def",
        term: "Power",
        text: "The ==rate of energy transfer== or of doing work: ==P = E/t = W/t==, measured in watts, ==1 W = 1 J s⁻¹==. October 2024 Q1 asks the unit as an MCQ — the joule per second, not N m (a joule), N m⁻¹ (stiffness) or J s (energy × time).",
      },
      {
        k: "eq",
        eq: "P = W/t        P = E/t        P = Fv  (from W = FΔs)",
        note: "P = Fv is not printed on the data sheet, but the mark schemes “allow P = Fv” whenever it fits (October 2022 Q11c). Derive it in one line from W = FΔs divided by t.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q11(c) — the motorboat at terminal velocity",
        question:
          "A motorboat's engine provides a constant forward force of 5.5 kN. The boat travels at a terminal velocity of 4.8 m s⁻¹. Calculate the output power of the engine. (2)",
        steps: [
          "At 4.8 m s⁻¹ the drag equals the engine force, so the boat's kinetic energy is constant — the work done by the engine goes into pushing water aside",
          "P = W/t = FΔx/t = Fv = 5500 × 4.8",
        ],
        answer:
          "P = 2.6 × 10⁴ W. The report: “Many candidates attempted to calculate the kinetic energy of the boat, which is irrelevant, and a significant few did not state, or gave an incorrect, unit.” At constant speed the *rate of working* is the point, not the stored energy.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q14(b) — is the display honest?",
        question:
          "An exercise machine's cable lifts a 150 N weight by 0.25 m on each pull; the user pulls and releases 90 times in 120 s. The machine displays an average power of 35 W. Deduce whether the displayed value is consistent. (3)",
        steps: [
          "Work per pull: ΔW = FΔs = 150 × 0.25 = 37.5 J",
          "Total work: 90 pulls × 37.5 J = 3375 J in 120 s → P = 3375 ÷ 120",
          "P = 28 W",
        ],
        answer:
          "28 W ≠ 35 W, so the display is not consistent. The MS also allows working backwards from 35 W to the time, count, force or distance — any valid comparison. The report's trap: candidates who “used the force of 121 N from part (a) instead of the weight of 150 N given in this question”.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Time from power** — January 2023 Q8: a 700 kW motor lifts 50 000 kg through 25 m; t = mgΔh/P = (50 000 × 9.81 × 25)/700 000 = 18 s (the MCQ's distractors omit g or the kilo-). **A power–time graph** — January 2024 Q4: constant speed on the flat needs a constant lower power; the same speed up a constant gradient adds a constant rate of working against gravity — a step, not a ramp. **Efficiency in the chain** — October 2024 Q6: the escalator raises your GPE by 5000 J in 42 s at efficiency 0.63, so the *input* power = 5000/(42 × 0.63) = 189 W. **An athlete's useful power** (October 2025 Q18b, 6 marks): accelerating on the flat (P = Fv grows with v), climbing at constant speed (P = mgv, constant), airborne (zero) — one question, three regimes.",
      },
    ],
  },
  {
    spec: "22",
    statement:
      "be able to use the equations efficiency = useful energy output / total energy input and efficiency = useful power output / total power input",
    title: "Efficiency",
    blocks: [
      {
        k: "eq",
        eq: "efficiency = useful energy output ÷ total energy input        efficiency = useful power output ÷ total power input",
        note: "The data sheet prints both, with the words — the marks are in deciding *which* number is the useful output and which the total input. An efficiency above 1 (100%) means the accounting is wrong: “students are encouraged to be suspicious” (October 2021).",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q6 — the escalator's input",
        question:
          "A moving staircase raises a person's gravitational potential energy by 5000 J in 42 s; its efficiency is 0.63. Which expression gives the power input? (1)  A 42/(5000×0.63)  B (42×0.63)/5000  C 5000/(42×0.63)  D (5000×0.63)/42",
        steps: [
          "Useful *output* power = 5000 J ÷ 42 s ≈ 119 W",
          "efficiency = output ÷ input → input = output ÷ 0.63",
        ],
        answer:
          "C. The distractors invert the ratio (A), multiply instead of divide (D), or jumble the units (B). Every efficiency MCQ ever set on this unit is one of those three mistakes in costume.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q14 — the hard variant",
        question:
          "A regenerative-braking system charges a battery with 45 kJ of energy while a car of mass 1800 kg slows from 14 m s⁻¹ and rises through 0.76 m. Calculate the efficiency of the charging system. (4)",
        steps: [
          "Kinetic energy lost: ΔEk = ½ × 1800 × 14² = 176 000 J",
          "Gravitational energy gained (it was rising while braking): ΔEgrav = 1800 × 9.81 × 0.76 = 13 400 J",
          "The energy *available* to the battery = ΔEk − ΔEgrav = 176 000 − 13 400 = 162 600 J — this is the total input",
          "efficiency = 45 000 ÷ 162 600",
        ],
        answer:
          "0.28 (or 28% — the % symbol is required if you use the percentage form). The report: “only about a quarter of all students managed to gain full credit”; the input is a *net*, not the bare kinetic energy.",
      },
      {
        k: "table",
        caption: "Efficiency costumes and their traps, 2019–2025",
        head: ["Costume", "The trap", "Session"],
        rows: [
          ["Dissipated power = (1 − efficiency) × total input", "using the output instead of the input", "October 2022 Q10"],
          ["Input from output: input = output ÷ efficiency", "multiplying by the efficiency", "October 2024 Q6"],
          ["Total input = useful output + waste (a power station)", "putting the waste in the numerator", "October 2023 Q7"],
          ["Hydro station: output = 4 × 88 MW − 256 MW wasted", "treating 4 × 88 as the useful output", "January 2025 Q15(b)"],
          ["Net input = ΔEk − ΔEgrav", "forgetting the height gain", "June 2025 Q14"],
          ["Efficiency < 1 always", "an answer over 100% is an accounting error", "October 2021, standing advice"],
        ],
      },
      { k: "h", text: "The marking rules that never change" },
      {
        k: "p",
        text: "These are the standing rules printed in every WPH11 mark scheme since 2019. They are worth more marks per minute of revision than anything else in this unit, because they apply to every calculation you will ever be asked.",
      },
      {
        k: "table",
        caption: "The WPH11 calculation contract",
        head: ["Rule", "Exact terms"],
        rows: [
          ["“Use of …” marks", "The correct equation with physically correct values substituted earns the method mark — even with a power-of-ten slip afterwards. Show the substitution, always."],
          ["ecf — error carried forward", "A wrong earlier answer does not sink later parts; the marks are re-marked with your value. Never abandon a part because the last one went wrong."],
          ["Significant figures", "Quote “show that” answers to ≥ 1 more s.f. than the given value. Carry all digits through; round only on the final line. Rounding, never truncating (417 → 420, not 410)."],
          ["Units", "A missing or wrong unit on a final answer normally loses that answer's mark (once per question; never in show-that). Strain has no unit."],
          ["g", "Use 9.81 (9.8 accepted); g = 10 costs one mark per question."],
          ["Deduce questions", "Calculate, compare with the question's value (<, >, =, ≈), and state the conclusion in words. The bare number never earns the final mark."],
          ["Reverse working", "Full credit on 2-mark show-thats; capped at 2 of 3 on 3-mark ones."],
          ["Bald correct answers", "Full marks — except in show-that and extended calculations, where working is the marks."],
        ],
      },
      {
        k: "p",
        text: "And the examiners' own revision advice, repeated across every report: practice in ==varied contexts== (“new or more unfamiliar contexts” is how each report describes the paper); read the command word — *state*, *calculate*, *explain*, *deduce* each demand a different shape of answer; and when a 3-mark explanation is set, “==a 3-mark explanation is likely to need 3 different points==” (June 2025). Leave nothing blank — the schemes are written to reward simple, correct statements wherever they can be found.",
      },
    ],
  },
];
