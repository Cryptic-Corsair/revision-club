import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 1 Forces, motion and energy · Part A
   Spec statements 1–7: the equations of motion, motion graphs,
   scalars and vectors, components, resultants, projectiles.

   Worked examples are real WPH11/01 questions with the official
   mark schemes' working; examiner-report excerpts are verbatim
   from the Principal Examiners' reports, 2019–2025.
   Highlighting kept deliberately light: one mark per key term.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH01_A: SpecSection[] = [
  {
    spec: "1",
    statement:
      "be able to use the equations for uniformly accelerated motion in one dimension: s = (u + v)t/2, v = u + at, s = ut + ½at², v² = u² + 2as",
    title: "The equations of uniformly accelerated motion",
    blocks: [
      {
        k: "p",
        text: "All four equations are printed on the WPH11 data sheet, so no mark is ever awarded for recalling them. Every mark lives in three skills: ==choosing== the right equation for what you know, ==converting== units before substituting, and finishing with the unit and the right significant figures. Each equation links four of the five quantities s, u, v, a, t — so list what you are given, note which one is missing, and pick the equation that does not contain it.",
      },
      {
        k: "eq",
        eq: "v = u + at        s = ut + ½at²        v² = u² + 2as        s = ½(u + v)t",
        note: "v = u + at has no s · s = ut + ½at² has no v · v² = u² + 2as has no t · s = ½(u + v)t has no a. The missing quantity names your equation.",
      },
      {
        k: "table",
        caption: "Choosing the equation — what the question gives you",
        head: ["You know", "You want", "Use"],
        rows: [
          ["u, a, t", "v", "v = u + at"],
          ["u, a, t", "s", "s = ut + ½at²"],
          ["u, v, s (no time)", "a or v²", "v² = u² + 2as"],
          ["u, v, t (no acceleration)", "s", "s = ½(u + v)t"],
          ["starts from rest", "—", "set u = 0 and the equations simplify"],
        ],
      },
      { k: "h", text: "Real questions, worked in full" },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q12 — the dart",
        question:
          "A dart is thrown with a velocity of 15.6 m s⁻¹ at an angle of 5.0° to the horizontal. Just before the dart hits the board, the vertical component of its velocity is zero. Air resistance is negligible. (a) Show that the time taken to reach the dartboard is about 0.14 s. (3) (b) Calculate the horizontal distance D to the board. (2)",
        steps: [
          "(a) Resolve the initial velocity into its vertical component: u_V = 15.6 × sin 5.0° = 1.36 m s⁻¹",
          "The vertical velocity ends at zero, and a = −9.81 m s⁻² (taking up as positive): v = u + at → 0 = 1.36 − 9.81t",
          "t = 1.36 ÷ 9.81 = **0.139 s** — one more significant figure than the “about 0.14 s” in the question, exactly as the mark scheme demands",
          "(b) Horizontal motion has a = 0, so s = ut: D = 15.6 × cos 5.0° × 0.139",
        ],
        answer:
          "D = 2.2 m (ecf allowed from your time — a wrong (a) does not have to sink (b))",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2024 Q13(a) — the racing cars",
        question:
          "Two cars approach the finish line. Car A moves at a constant 93 m s⁻¹ with 100 m left. Car B, 9.0 m behind A's position, moves at the same 93 m s⁻¹ and accelerates at 14 m s⁻². Show that B draws level with A about 1.1 s later. (3)",
        steps: [
          "Both cars cover the same 93 m s⁻¹ of “shared” distance — what closes the gap is B's *extra* accelerating motion",
          "Extra distance B gains: s = ut + ½at² with u = 0 and a = 14 m s⁻² → s = 7t²",
          "Level when the extra distance equals the gap: 9.0 = 7t²",
        ],
        answer:
          "t = √(9.0 ÷ 7.0) = 1.13 s ≈ 1.1 s (the MS credits “any valid suvat method”; quoting 1.13 shows the “about 1.1 s”)",
      },
      {
        k: "note",
        label: "Examiner's report — January 2023, Q11",
        text: "“Teaching students to set calculations out in two columns would help them to keep horizontal and vertical components clearly separated.” In that series candidates “used a = g in the horizontal plane, or u = 3.8 m s⁻¹ in the vertical plane”. Two labelled columns cost nothing and prevent the most common projectile error there is.",
      },
      {
        k: "note",
        label: "The 'show that' contract",
        text: "The mark schemes print the same three rules in every series. **One:** quote your answer to at least one more significant figure than the given value — for “show that t ≈ 0.14 s” you write 0.139 s; 0.14 s exactly scores nothing for that marking point. **Two:** reverse working (starting from the given answer) earns both marks on a 2-mark show-that but only 2 of 3 marks on a 3-mark one. **Three:** once shown, you may use the rounded given value in later parts — the October 2021 report penalised candidates who “persisted in using a = 9.81 m s⁻² in subsequent parts despite having a ‘show that’ value that they could use”.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "SUVAT appears in disguise as often as in the open. **A dropped ball with air resistance** (January 2024 Q5): the real time is *greater* and the real landing speed *less* than the SUVAT prediction, because drag opposes motion. **A curved slide** (January 2024 Q14): SUVAT is rejected outright — the gradient of the slide varies, so the acceleration is not constant; you must use energy conservation, and the mark scheme prints “Do not accept use of equations of motion”. **An unknown on Mars** (June 2023 Q11): substitute a = 0.38g into v² = u² + 2as and take a ratio of the two equations.",
      },
      {
        k: "p",
        text: "One habit protects every calculation mark at once: **substitute first, calculate once, round at the end**. The October 2021 report puts it as a standing instruction — “Final answers must be correctly rounded, not truncated, and truncated values in multi-stage calculations will not generally yield the required value for the final mark.” Keep every guard digit in the calculator; write the rounded value only on the final line.",
      },
    ],
  },
  {
    spec: "2",
    statement:
      "be able to draw and interpret displacement-time, velocity-time and acceleration-time graphs",
    title: "Reading and drawing motion graphs",
    blocks: [
      {
        k: "p",
        text: "Three graphs describe the same journey, each one hand-span away from the others: the ==gradient== of a displacement–time graph is velocity, the gradient of a velocity–time graph is acceleration, and the ==area== under a velocity–time graph is displacement. Graph questions are cheap marks if you describe what the *graph* shows — and the October 2023 report records that when candidates “did not often refer to the graph”, most scored nothing at all.",
      },
      {
        k: "figure",
        kind: "ph-motion-graphs",
        caption:
          "One journey, three graphs: uniform acceleration from rest. The s–t curve steepens, the v–t line climbs at a constant gradient, the a–t graph sits still. Read across the dotted time lines to move between them.",
      },
      {
        k: "table",
        caption: "The shape dictionary — what each feature means",
        head: ["Graph feature", "Means"],
        rows: [
          ["s–t: straight line", "constant velocity (gradient = v)"],
          ["s–t: curve steepening", "velocity increasing (accelerating) — e.g. a falling ball (Oct 2023 Q4)"],
          ["s–t: curve flattening", "velocity decreasing towards zero"],
          ["v–t: straight line", "constant acceleration (gradient = a)"],
          ["v–t: horizontal line", "constant velocity, a = 0 — terminal velocity"],
          ["v–t: curve levelling to horizontal", "acceleration falling to zero — approaching terminal velocity"],
          ["a–t: any value above zero", "velocity still increasing — even while acceleration itself falls"],
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2023 Q12 — the cliff diver (interpretation)",
        question:
          "A diver leaves a platform and falls. The graph of velocity against time shows a curve starting at zero whose gradient decreases, becoming a straight line. Explain the shape of the graph. (3)",
        steps: [
          "Gradient of a v–t graph = acceleration. At the start the only force is weight (drag ≈ 0), so the gradient is steep — close to g",
          "As velocity increases, the drag force increases, so the resultant force and hence the acceleration decrease — the curve flattens",
          "When drag + upthrust = weight the resultant force is zero: acceleration is zero and the graph becomes a horizontal straight line — terminal velocity",
        ],
        answer:
          "The mark scheme allows the points in any order; the June 2025 skydiver sketch (Q20b) wants exactly this: “curved line starting at zero with negative gradient decreasing in magnitude”, then a horizontal line — not along the axis.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2023, Q18(b)(i)",
        text: "“Most candidates scored no marks on this question. The most common reason for this was that the answers did not often refer to the graph.” The creditable answers name the feature — “the gradient starts at zero because the ball starts from rest” — before explaining the physics behind it. A graph answer that never mentions gradient, area, intercept or shape is a general-physics answer, and scores as one.",
      },
      {
        k: "note",
        label: "Drawing graphs — the four printed rules",
        text: "The mark schemes carry graph-drawing rules identical in every series: axes ==labelled with quantity and unit==; a scale that spreads the plotted points ==over more than half of each axis== and is not awkward (never multiples of 3 or 7); points plotted ==to within 1 mm==; and the best-fit line “a thin continuous line”. Sketch graphs earn shape marks: a curve through the origin with increasing gradient for constant acceleration from rest, a straight line joining it smoothly once the acceleration reaches zero (October 2025 Q18(a)).",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "The same graph can be turned inside out. Given a *displacement–time* graph of a ball thrown up and caught, the matching *acceleration–time* graph is a constant negative line (January 2023 Q7) — the inverted parabola's gradient never stops being −g. Given a *deceleration–time* graph, the shaded area is the ==change in velocity==, not the velocity itself (January 2025 Q5). Given an *acceleration–time* graph that drops to zero, the s–t graph is a parabola that smooths into a straight line — the gradient must be continuous where the acceleration changes (October 2025 Q9).",
      },
    ],
  },
  {
    spec: "3",
    statement:
      "know the physical quantities derived from the slopes and areas of displacement-time, velocity-time and acceleration-time graphs, including cases of non-uniform acceleration and understand how to use the quantities",
    title: "Slopes and areas — including when the acceleration is not uniform",
    blocks: [
      {
        k: "p",
        text: "Statement 2's rules have a second life in non-uniform motion. When the graph is a curve, the gradient of a ==tangent== gives the instantaneous quantity, and the area under the curve — counted square by square or by trapezium strips — still gives the accumulated one. This is the specification's own wording: “drawing and using the slope of a tangent to a curve as a measure of rate of change… the area between a curve and the x-axis and realising the physical significance of the area determined.”",
      },
      {
        k: "table",
        caption: "The complete slope-and-area table",
        head: ["Graph", "Slope gives", "Area gives"],
        rows: [
          ["displacement–time", "velocity (tangent = instantaneous velocity)", "no physical quantity — the October 2024 Q3 distractor"],
          ["velocity–time", "acceleration (tangent = instantaneous acceleration)", "displacement (areas below the axis count negative)"],
          ["acceleration–time", "rate of change of acceleration (not examined)", "change in velocity — not the final velocity unless u = 0"],
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q19(b)(ii) — the diver's acceleration from a tangent",
        question:
          "The graph of the diver's vertical velocity against time is a curve. Determine the vertical acceleration at t = 70 s. (3)",
        steps: [
          "Draw a tangent to the curve at t = 70 s — the mark scheme's first marking point is literally “Draws tangent at 70 s”",
          "Read two well-separated points on your tangent and find its gradient: Δv ÷ Δt (the MS example reads about −0.50 m s⁻¹ across 65 s)",
          "a = −0.50 ÷ 65 = −0.0077 m s⁻²",
        ],
        answer:
          "a ≈ −0.008 m s⁻² (allowed range −0.007 to −0.010 m s⁻² — the tolerance is printed for drawn tangents)",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2025 Q8 — area of a two-stage v–t graph",
        question:
          "On a velocity–time graph, velocity falls linearly from 2v to v between times 0 and t, then stays constant at v from t to 2t. What is the distance travelled in time 2t? (1)",
        steps: [
          "Distance = total area. First stage: a trapezium of parallel sides 2v and v, width t → area ½(2v + v)t = 3vt/2",
          "Second stage: a rectangle of height v and width t → area vt",
          "Total: 3vt/2 + vt",
        ],
        answer: "5vt/2 — option D. Count the trapezium, or split it into a rectangle plus a triangle; both are credited.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2024, Q19(b)(ii)",
        text: "“Most candidates who drew a tangent scored well. However, many candidates just read a value of velocity at 70 s and divided one by the other. This approach scored no marks.” v/t at a point is not a gradient — a tangent is. The same report says flatly that “explaining how a graph of the results should be used to determine a value is a skill which candidates need to practice”.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "Areas appear in three costumes. **Counting squares** on a printed grid (each square worth its width × height in unit quantities). **Trapezium strips** for velocity changing in straight segments (January 2025 Q8). **Equality of areas** as a physics statement: October 2024 Q19(b)(i) proves a diver returns to the surface because the area below the time axis equals the area above — total displacement zero — and the report notes that candidates who answered “final velocity is zero” or “the gradient is zero” scored nothing.",
      },
    ],
  },
  {
    spec: "4",
    statement:
      "understand scalar and vector quantities and know examples of each type of quantity and recognise vector notation",
    title: "Scalars and vectors",
    blocks: [
      {
        k: "p",
        text: "A scalar has magnitude only; a vector has magnitude ==and direction==. That single word decides the multiple-choice item that opens almost every WPH11 paper — and the same dozen quantities are recycled year after year, so learn the lists once and the mark is yours for the rest of the course.",
      },
      {
        k: "table",
        caption: "The quantities WPH11 has actually asked about, 2019–2025",
        head: ["Vectors (magnitude *and* direction)", "Scalars (magnitude only)"],
        rows: [
          ["displacement", "distance"],
          ["velocity, acceleration", "speed"],
          ["force, weight, tension, thrust", "mass"],
          ["momentum (October 2022 Q2)", "energy, work done, kinetic energy"],
          ["moment of a force (January 2023 Q1 — it has a direction of turning)", "power (January 2023 Q1)"],
          ["gravitational field strength", "density, time, temperature"],
          ["—", "strain, stress, Young modulus (October 2024 Q2)"],
        ],
      },
      {
        k: "p",
        text: "==Vector notation==: in print, a vector is written in bold (**F**) or with an arrow above it (F⃗), while its magnitude is plain italic (F). Edexcel uses the arrow form in questions about equilibrium — January 2025 Q5 writes the whole condition as one vector sentence: **W**⃗ + **T**⃗₁ + **T**⃗₂ = **0**⃗. An equation like that is a statement about arrows: three vectors of different lengths, added nose-to-tail, close back on themselves.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q9 — the vector equation for equilibrium",
        question:
          "A box of weight W hangs in equilibrium from two ropes with tensions T₁ and T₂. Which is a vector expression relating the forces on the box? (1)  A  W + T₁ = T₂   B  W + T₂ = T₁   C  W = T₁ + T₂   D  W + T₁ + T₂ = 0",
        steps: [
          "Equilibrium means the vector sum of all forces on the box is zero — a statement about direction as well as size",
          "Options A, B and C add the forces as if they were numbers, ignoring that W, T₁ and T₂ point in different directions",
          "Only D is written as a vector equation, and its meaning is correct: drawn nose-to-tail, the three arrows close a triangle",
        ],
        answer:
          "D — the June 2025 paper (Q5) asks the identical question with a submarine, and the answer is the identical sentence.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "The pairs most often confused: **moment of a force** is a vector (it has a turning direction — clockwise or anticlockwise), **work done** is not; **momentum** is a vector, **kinetic energy** is not; **weight** is a vector, **mass** is not. The unit test is a giveaway: a unit containing a direction-bearing quantity (N, N s, N m) suggests a vector — but October 2025 Q1 asks it the hard way, offering J, kg, N and W and wanting the newton, the unit of a vector.",
      },
    ],
  },
  {
    spec: "5",
    statement:
      "be able to resolve a vector into two components at right angles to each other by drawing and by calculation",
    title: "Resolving a vector into components",
    blocks: [
      {
        k: "p",
        text: "Any vector can be split into two perpendicular components that add to give it back. For a force F at angle θ to a reference direction, the component ==along== that direction is F cos θ and the component ==at right angles== to it is F sin θ. Which is which depends entirely on where θ is measured from — the January 2024 paper measures from the vertical and wants cos where the October papers measure from the horizontal and want sin.",
      },
      {
        k: "eq",
        eq: "F_parallel = F cos θ        F_perpendicular = F sin θ",
        note: "Check with a special case: at θ = 0° the vector lies entirely along the reference direction, so the parallel component must be the full F — and cos 0° = 1. That single sanity check tells you which function is which, whatever the diagram measures θ from.",
      },
      {
        k: "figure",
        kind: "ph-vectors",
        caption:
          "Left: resolving a force at 35° into horizontal and vertical components. Right: the same forces added nose-to-tail to find a resultant — the two skills are inverses of each other.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2025 Q10 — the traffic lights",
        question:
          "Traffic lights of weight W hang from a wire passing over two supports, each side of the wire making an angle θ with the horizontal. Write an expression for the tension T in each side of the wire. (1)",
        steps: [
          "The vertical component of each tension is T sin θ (θ is measured from the horizontal)",
          "Two sides of the wire pull up, and together they support the weight: 2T sin θ = W",
        ],
        answer:
          "T = W/(2 sin θ) — option B. The distractors are the two classic slips: 2W sin θ (multiplying instead of dividing) and the cos versions (measuring θ from the wrong direction).",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q6 — the bird on the string",
        question:
          "A bird of weight W stands at the middle of a string between two posts; the string makes 80° with each post (i.e. 10° below the horizontal on each side). Which expression gives the tension T in each side? (1)",
        steps: [
          "Here the angle given is with the *vertical* posts, so the vertical component of each tension is T cos 80° — not sin",
          "Equilibrium vertically: 2T cos 80° = W",
        ],
        answer:
          "T = W/(2 cos 80°) — option C. Same physics as the traffic lights, one different measured angle — and the report notes candidates who reached for sin “should be cos and should form the denominator”.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "Components are the engine inside half the syllabus. **On a slope** (January 2025 Q12): the component of g along a 14° incline is g sin 14° = 2.37 m s⁻², fed straight into v² = u² + 2as; October 2021 Q13(b) asks you to *show that* a = g sin θ when friction is absent. **At an angle to the motion** (October 2023 Q10): work done = F cos θ × d, giving 30 × cos 40° × 5 = 115 J. **In a v–t graph** the same trigonometry appears as velocity components of a projectile (statement 7). The two-question pair above — sin measured from the horizontal, cos measured from the vertical — is deliberately the same trap twice.",
      },
    ],
  },
  {
    spec: "6",
    statement:
      "be able to find the resultant of two coplanar vectors at any angle to each other by drawing, and at right angles to each other by calculation",
    title: "Finding a resultant",
    blocks: [
      {
        k: "p",
        text: "Two skills, and the question tells you which one it wants: *at any angle* → a ==scaled vector drawing==; *at right angles* → ==calculation== with Pythagoras. Since 2022 every paper has carried one scale-diagram question (October 2024: 2 marks; January 2025: 5; October 2025: 4), and both reports say the same thing — many candidates drew a free-body diagram instead of a vector triangle, and scored for one mark at most.",
      },
      {
        k: "steps",
        caption: "The scaled vector diagram, step by step (the examiners' own rules)",
        items: [
          {
            title: "Choose a scale",
            text: "Big enough that the smallest force is still a long line — the mark schemes demand arrows “at least 6 cm” (October 2023) or “at least 8 cm” (June 2024) representing the longest force, so a scale like 1 cm : 100 N. State it.",
          },
          {
            title: "Draw tip-to-tail",
            text: "First vector as an arrow; second vector starting from the *tip* of the first, at the true angle between them. Label each arrow with the force it represents (F, or 70 N, or “wind 350 N”) — never with its drawn length in cm.",
          },
          {
            title: "Close the triangle",
            text: "The resultant runs from the *tail of the first* vector to the *tip of the last*. Its arrow points that way round. Measure its length and convert back through the scale; measure the angle with a protractor and state the direction (“30° above the horizontal”, “68° from north towards the east”).",
          },
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2025 Q18(a) — the submarine",
        question:
          "A submarine's engine produces a horizontal force of 70 N forwards. The drag force is 43 N, directed backwards and downwards at 25° to the horizontal. Determine the resultant force using a scaled vector diagram. (5)",
        steps: [
          "Draw the 70 N forward arrow to scale (MS: “at least 3.5 cm long”, labelled)",
          "From its tip, draw the 43 N drag arrow at 25° below the backwards direction, tip-to-tail",
          "The resultant closes the triangle from the start of the first arrow to the tip of the second; measure it and the angle it makes",
          "Check by calculation: horizontally 70 − 43 cos 25° = 31.0 N; vertically 43 sin 25° = 18.2 N downwards; magnitude √(31.0² + 18.2²) = 36.0 N at tan⁻¹(18.2/31.0) = 30.4° below the forward direction",
        ],
        answer:
          "R ≈ 36 N at about 30° below the horizontal (printed tolerances: 34–38 N and ± 2° — your drawing is judged against them, so use a sharp pencil, a ruler, and measure to the nearest millimetre and degree).",
      },
      {
        k: "note",
        label: "Examiner's report — January 2025, Q18(a)",
        text: "“Many candidates drew a free-body force diagram rather than a scaled vector diagram… Many candidates labelled their vectors with the length of the arrow they had drawn, rather than with the size or description of the force that each arrow represented… It was not uncommon for candidates who drew an appropriate triangle to draw the resultant force vector pointing in the wrong direction.” A free-body diagram shows all forces on one object from one point; a vector triangle chains them tip-to-tail. Read the command: “by drawing a scaled vector diagram” means the triangle.",
      },
      {
        k: "p",
        text: "For perpendicular vectors, calculate. October 2024 Q11 gives 2300 N horizontally and 1200 N vertically: the resultant is √(2300² + 1200²) = 2594 N ≈ 2600 N, with the printed tolerance 2550–2650 N. If you do the calculation on a *drawing* question, the mark schemes still award the answer mark (“whichever method candidates used… marking point 2 was scored”, October 2024) — but the construction marks are only for the triangle, so draw it anyway.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "Resultants come back as **momentum**: June 2025 Q7 combines 15 000 kg m s⁻¹ east with 14 500 kg m s⁻¹ west and 200 kg m s⁻¹ north — the answer is √((15 000 − 14 500)² + 200²), treating the east–west pair first. They come back as **displacements** (June 2019 Q9: a 20 km/12 km journey resolved by scale drawing). And they come back reversed — January 2023 Q6 gives you the resultant and wants the vector triangle that produced it. In every costume the rule is the same: tip-to-tail, label the arrows, state magnitude *and* direction.",
      },
    ],
  },
  {
    spec: "7",
    statement:
      "understand how to make use of the independence of vertical and horizontal motion of a projectile moving freely under gravity",
    title: "Projectiles — the two independent motions",
    blocks: [
      {
        k: "p",
        text: "A projectile is any object moving freely under gravity — the only force on it is its weight. Its two motions run on separate clocks that share one reading: ==horizontal== motion has constant velocity (a = 0, no air resistance), ==vertical== motion has constant acceleration (a = g downwards). Time is the bridge: the flight time computed from the vertical column is the same time the horizontal column must use.",
      },
      {
        k: "figure",
        kind: "ph-projectile",
        caption:
          "The path of a projectile launched at 40°: the horizontal velocity never changes, the vertical velocity loses g every second, and only time belongs to both columns.",
      },
      {
        k: "eq",
        eq: "Horizontal: a = 0, s = v_H t        Vertical: a = −9.81 m s⁻², s = u_V t + ½at²        v_H = v cos θ, u_V = v sin θ",
        note: "Set up the columns before touching the calculator — the January 2023 report credits exactly this discipline.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q15 — the ball and the wall",
        question:
          "A boy throws a ball at 9.70 m s⁻¹ and 49.0° to the horizontal, from ground level, at a wall 5.00 m away whose top is 3.00 m above the release point. (a) Show that the ball reaches the wall in about 0.8 s. (3) (b) Deduce whether the ball goes over the wall. (4)",
        steps: [
          "(a) v_H = 9.70 cos 49.0° = 6.36 m s⁻¹; horizontally a = 0 so s = v_H t → t = 5.00 ÷ 6.36",
          "t = **0.786 s** (one more s.f. than “about 0.8 s”)",
          "(b) Vertical column: u_V = 9.70 sin 49.0° = 7.32 m s⁻¹; s = u_V t + ½at² = 7.32 × 0.786 − 4.905 × 0.786²",
          "s = 5.75 − 3.03 = 2.72 m at the wall",
          "The deduce mark: 2.72 m < 3.00 m",
        ],
        answer:
          "The ball does not clear the wall — and the final mark is for writing that comparison, not for stopping at 2.72.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2023 Q11 — the stone off the cliff",
        question:
          "A stone is projected horizontally at 3.8 m s⁻¹ from a cliff top 12 m above the sea. Calculate the horizontal distance to where it hits the water. (3)",
        steps: [
          "Vertical column first (u_V = 0): 12 = ½ × 9.81 × t² → t = √(12 ÷ 4.905) = 1.56 s",
          "Horizontal column (a = 0): s = v_H t = 3.8 × 1.56",
        ],
        answer:
          "s = 5.9 m. The report's verdict on this question: candidates “used a = g in the horizontal plane, or u = 3.8 m s⁻¹ in the vertical plane” — two columns prevent both.",
      },
      {
        k: "p",
        text: "Angled launches add one twist: the vertical velocity at the top is zero, the horizontal velocity never changes, and at any instant the two recombine by Pythagoras. October 2024 Q15(b) drops an athlete 1.4 m past the bar while he carries 3.44 m s⁻¹ horizontally: v_V = √(2 × 9.81 × 1.4) = 5.24 m s⁻¹, so the landing speed is √(5.24² + 3.44²) = 6.3 m s⁻¹ at tan⁻¹(5.24/3.44) = 57° to the horizontal. The report's warning: candidates who treated the vertical component as the final velocity “used incorrect trigonometry to determine the angle… so tended to score no further marks”.",
      },
      {
        k: "note",
        label: "Examiner's report — June 2022, Q18(b)",
        text: "“The most common incorrect approach was to find the time to maximum height and double it, giving a time that is too long.” Doubling works only when the projectile lands at its launch height. The June 2022 golfer lands 11 m *below* the launch point, so the full quadratic is needed: 11 = 34.1t − 4.91t² → t = 6.62 s (the other root, 0.34 s, is the pass through height 11 m on the way up).",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "The papers' favourite variants: **add the launch height** — January 2025 Q19 lands a projectile 2.0 km above sea level and the report says candidates “forgot to add the initial height of the projectile”; the answer is 961 m + 2000 m = 3.0 × 10³ m. **Angle of impact** — October 2023 Q13(b): a larger launch speed leaves v_V unchanged and grows v_H, so tan(impact angle) = v_V/v_H falls — the ball meets the ground at a *shallower* angle. **Why SUVAT is valid at all** — October 2025 Q19(a): the shot is dense and massive, so drag is negligible against its weight and the only acceleration is the constant g. **Range reasoning** — January 2025 Q19(b): raising the launch angle grows v_V (longer flight) but shrinks v_H (slower across); range = v_H × t, and the maximum sits where those competing effects balance — mentioning “45°” earns nothing.",
      },
    ],
  },
];
