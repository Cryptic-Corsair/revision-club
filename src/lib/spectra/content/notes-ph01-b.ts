import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 1 Forces, motion and energy · Part B
   Spec statements 8–14: free-body diagrams, Newton's laws and
   terminal velocity, weight and g, Core Practical 1, momentum
   and its conservation.

   Worked examples are real WPH11/01 questions with the official
   mark schemes' working; examiner-report excerpts are verbatim
   from the Principal Examiners' reports, 2019–2025.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH01_B: SpecSection[] = [
  {
    spec: "8",
    statement:
      "be able to draw and interpret free-body force diagrams to represent forces on a particle or on an extended but rigid body using the concept of centre of gravity of an extended body",
    title: "Free-body diagrams and centre of gravity",
    blocks: [
      {
        k: "p",
        text: "A free-body diagram shows ==only the forces acting on one chosen object== — never the forces it exerts on anything else. Four rules decide every mark: every arrow starts on the body; each is labelled with the ==force it represents== (weight, tension, normal contact force, friction, drag — never “G”); arrows have ==lengths proportional to the magnitudes==; and for an extended body the weight is drawn acting at the ==centre of gravity==.",
      },
      {
        k: "figure",
        kind: "ph-freebody",
        caption:
          "A block held stationary on a slope: weight from the centre of gravity, normal contact force perpendicular to the surface, friction along it. Three forces, three directions, no others.",
      },
      {
        k: "def",
        term: "Centre of gravity",
        text: "The point through which the ==weight of an object may be taken to act==. Every examiner report since 2019 has caught candidates writing “the point where the weight acts” — the mark scheme wording is *may be taken to act* (or *is considered to act*), because the mass is spread through the whole body, not concentrated there.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q18(a) — the shunting engine",
        question:
          "An engine pushes a truck along horizontal rails at constant velocity. The engine exerts a forward force of 1.2 × 10⁵ N on the truck, and experiences a net backwards force of 1.5 × 10⁵ N from the rails. The normal contact force and weight are already drawn. Complete the free-body diagram for the engine. (4)",
        steps: [
          "Constant velocity → resultant force zero → the horizontal forces must balance: 1.5 × 10⁵ N forwards from the rails",
          "The engine pushes the truck forwards, so by Newton's third law the truck pushes the engine *backwards* with 1.2 × 10⁵ N",
          "The forces so far leave 0.3 × 10⁵ N unaccounted forwards — a backwards air-resistance arrow of 3.0 × 10⁴ N completes the balance",
          "Draw the three horizontal arrows with the leftward pair together as long as the rightward arrow (the MS measures them “to within 2 mm”)",
        ],
        answer:
          "Force from truck (left), air resistance (left), force from rails (right) — with arrow lengths that balance. “Do not accept ‘viscous drag’”, the MS notes; and drawing extra forces withholds a mark.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q15(b)(i) — the ball at terminal velocity",
        question:
          "A ball-bearing falls through a liquid at terminal velocity. The drag force is already drawn upwards. Complete the free-body diagram. (2)",
        steps: [
          "Add the upthrust arrow upwards and the weight arrow downwards — both starting from the ball's centre",
          "At terminal velocity the forces balance, so the weight arrow's length = drag length + upthrust length",
        ],
        answer:
          "Two arrows, correctly labelled and sized. The report adds two cautions: some candidates “labelled weight as G, which is incorrect”, and some “appeared not to appreciate that the length of the arrow represents the size of the force”.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2022, Q18(a)",
        text: "“The arrows in a free-body force diagram should have lengths proportional to the magnitudes of the forces. This was very rarely seen.” And from October 2024 Q16(a): “Some candidates drew three arrows, including an arrow representing drag. This prevented any marks from being scored” — a floating hydrometer has exactly two forces on it. More arrows is not more physics: draw what acts, size what you draw.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "The same diagram is asked of a ==floating== object (equal-length upthrust and weight — October 2024 Q16(a)), a ==towed== object (tension at the angle of the rope, weight, normal contact force), and an object ==accelerating== (arrows deliberately unequal, with the difference equal to ma — January 2025 Q9 gives upthrust 90 N, weight 49 N, mass 5 kg accelerating up at 4 m s⁻², and wants drag = 90 − 49 − (5 × 4) = 21 N). When the question gives an acceleration, the diagram is *not* in equilibrium — size the arrows to show it.",
      },
    ],
  },
  {
    spec: "9",
    statement:
      "be able to use the equation ΣF = ma, and understand how to use this equation in situations where m is constant (Newton's second law of motion), including Newton's first law of motion where a = 0, objects at rest or travelling at constant velocity. Use of the term 'terminal velocity' is expected",
    title: "ΣF = ma — Newton's second law, the first law, and terminal velocity",
    blocks: [
      {
        k: "p",
        text: "This is the most examined statement in the unit — every session since 2019 gives it 15–30 marks, including the paper's one 6-mark linked-answer question. The equation is printed; the marks are for using the ==resultant== force. The October 2023 report opens its rocket question with the warning: “A common mistake was to treat the thrust from the rocket's engines as the resultant force.” Thrust, weight, drag and tension are ingredients; ΣF is the sum, and only the sum gets multiplied by a.",
      },
      {
        k: "def",
        term: "Newton's first law",
        text: "An object at rest stays at rest, and an object moving with constant velocity keeps that velocity, ==unless a resultant force acts on it==. Constant velocity (including terminal velocity) always means ΣF = 0 — forces may be present, but they cancel.",
      },
      {
        k: "def",
        term: "Newton's second law",
        text: "For constant mass, the resultant force equals mass × acceleration, ==ΣF = ma==, with the acceleration in the direction of the resultant force. The June 2025 report's standing complaint: answers that “discuss a force instead of discussing the resultant force on an object”.",
      },
      {
        k: "eq",
        eq: "ΣF = ma        a = 0 → ΣF = 0 (rest or constant velocity)        P − W = ma (lift, thrust up)        W − D − U = ma (falling through fluid)",
        note: "Write the force balance for the actual direction of motion before substituting. The WPH11 data sheet prints ΣF = ma — the arrow work is yours.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2023 Q15(a) — the trampolinist",
        question:
          "A gymnast of mass 58 kg is in contact with a trampoline, which gives her a maximum upward acceleration of 14.2 m s⁻². Calculate the maximum upward force of the trampoline on her. (4)",
        steps: [
          "Forces on the gymnast: trampoline push P upwards, weight W = mg = 58 × 9.81 = 569 N downwards",
          "Newton's second law with up positive: P − W = ma",
          "P = ma + W = 58 × 14.2 + 569 = 824 + 569",
        ],
        answer:
          "P = 1.4 × 10³ N. The report: “many candidates subtracted the weight from the resultant force instead of adding it to find the upward force, scoring only two of the four available marks.” The push must both cancel gravity *and* accelerate her.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q11 — the rocket",
        question:
          "A rocket of mass 5.0 × 10⁶ kg lifts off vertically with total engine thrust 7.3 × 10⁷ N. (a) Calculate the initial acceleration. (3) (b) Explain why the acceleration increases as the rocket rises. (1)",
        steps: [
          "(a) W = mg = 5.0 × 10⁶ × 9.81 = 4.91 × 10⁷ N — the thrust is *not* the resultant force",
          "ΣF = 7.3 × 10⁷ − 4.91 × 10⁷ = 2.39 × 10⁷ N; a = ΣF/m = 2.39 × 10⁷ ÷ 5.0 × 10⁶",
          "(b) Fuel burns, so the mass (and the weight) decreases while the thrust is unchanged — the resultant force per kilogram grows",
        ],
        answer:
          "a = 4.8 m s⁻²; and (b) needs the *increase* of a, not a restatement that thrust beats weight — the report explicitly distinguishes the two.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2025 Q11 — the car and its passengers",
        question:
          "A car of mass 1850 kg accelerates at 0.230 m s⁻² when the resultant force on it is 460 N. Calculate the total mass of the people in the car. (3)",
        steps: [
          "ΣF = ma applies to the *whole* car: 460 = m_total × 0.230",
          "m_total = 460 ÷ 0.230 = 2000 kg",
          "The people's mass is the total minus the car: 2000 − 1850",
        ],
        answer:
          "150 kg. The report's trap list: adding instead of subtracting the car's mass, or never subtracting at all — read what the question actually asks for.",
      },
      { k: "h", text: "Terminal velocity — the six-mark story" },
      {
        k: "p",
        text: "Every paper's extended answer is built from the same chain, and the mark schemes print the same indicative content each time — for a rising balloon (October 2022), a balloon rocket (June 2023), a bungee jump (October 2024), a submarine rising on a crane's cable (January 2025), a skydiver (June 2025). Learn the chain once as six sentences; deploy it in whatever costume the paper provides.",
      },
      {
        k: "steps",
        caption: "The terminal-velocity chain (the mark scheme's own sentences, October 2022 Q14b)",
        items: [
          {
            title: "1 · Start",
            text: "“Initially there is a resultant upward force” (or downward, for a falling object) — name the forces and which wins. “Upthrust is greater than weight and initially there is no air resistance.”",
          },
          {
            title: "2 · Accelerate",
            text: "The object accelerates — its velocity increases. (U and W are constant for a balloon; for a skydiver the weight is constant.)",
          },
          {
            title: "3 · Drag grows",
            text: "As velocity increases, the drag force increases — this is the engine of the whole story.",
          },
          {
            title: "4 · Resultant falls",
            text: "The resultant force decreases, so the acceleration decreases — and the report's favourite distinction: the *velocity is still increasing*, just more slowly.",
          },
          {
            title: "5 · Balance",
            text: "Eventually the resultant force is zero — upthrust = weight + drag (rising) or weight = drag + upthrust (falling). Say it as an equation of the actual forces.",
          },
          {
            title: "6 · Terminal",
            text: "The object continues to move at constant velocity — its terminal velocity. Newton's first law, named.",
          },
        ],
      },
      {
        k: "figure",
        kind: "ph-terminal",
        caption:
          "The v–t signature of terminal velocity: gradient g at the start (drag negligible), the gradient decaying as drag grows, then a horizontal line when the forces balance.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2023, Q17(c)",
        text: "“Many responses… demonstrated confusion that when acceleration decreases, the velocity is still increasing, but is just increasing at a lower rate.” And October 2022 Q14(b): “In many responses, it wasn't clear whether comments were referring to the initial stage or the terminal velocity stage.” Stage-by-stage sentences — exactly the six above — fix both faults at once.",
      },
      {
        k: "note",
        label: "Examiner's report — January 2023, Q15(c)",
        text: "“There was a marked tendency, in common with previous series, to answer in terms of energy transformations as if this were a GCSE question. The question clearly asks students to answer in terms of forces.” October 2021 Q15 says the same with the door closed: “There were no marks available for discussions of energy.” When the stem says *forces*, every sentence of your answer must contain one.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**A falling object in a fluid**: weight − upthrust − drag = ma, and at terminal velocity drag = W − U (January 2023 Q18, October 2022 Q17). **On a slope**: the component of gravity along the slope is g sin θ, so a = g sin θ when friction is absent (October 2021 Q13b asks you to *show* this). **A rising crane load**: tension = weight − upthrust while submerged, growing to the full weight as the object leaves the water (January 2025 Q18b). **Two masses over a pulley**: treat the system whole — a = (m₂ − m₁)g/(m₁ + m₂) (October 2025 Q7). **A bungee jump from taut to lowest point**: weight vs tension, zero acceleration at the equilibrium point, *upward* resultant below it (October 2024 Q17a — the report records candidates putting maximum acceleration at the equilibrium point and zero at the bottom: it is the reverse).",
      },
    ],
  },
  {
    spec: "10",
    statement: "be able to use the equations for gravitational field strength g = F/m and weight W = mg",
    title: "Weight and gravitational field strength",
    blocks: [
      {
        k: "def",
        term: "Gravitational field strength",
        text: "The ==weight per unit mass==, g = F/m, measured in N kg⁻¹. Near the Earth's surface g = 9.81 N kg⁻¹ — the same number, and the same physics, as the acceleration of free fall 9.81 m s⁻². January 2023 Q2 asks the definition as a multiple-choice item: *weight per unit mass* is the only row that survives.",
      },
      {
        k: "eq",
        eq: "W = mg        g = F/m        g = 9.81 N kg⁻¹ = 9.81 m s⁻²",
        note: "W = mg is used in almost every structured question on the paper — it is the quiet first marking point of rocket, balloon, crane, lift and terminal-velocity questions alike. g = 10 loses a mark (9.8 is accepted); quote 9.81.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q11 — the boat",
        question:
          "A boat accelerates at 0.31 m s⁻² when the resultant horizontal force on it is 4800 N. Calculate (a) the mass of the boat, (b) its weight. (3)",
        steps: [
          "(a) ΣF = ma → m = 4800 ÷ 0.31",
          "m = 15 500 kg",
          "(b) W = mg = 15 500 × 9.81",
        ],
        answer:
          "W = 1.5 × 10⁵ N. The report's recorded slips: the unit given as kg instead of N, or the weight omitted entirely — “stopping at mass instead of weight” is one of the four most common unfinished answers in this unit.",
      },
      {
        k: "p",
        text: "Weight appears as the *first step* of longer chains more often than as its own question. October 2024 Q15(b): an athlete of weight 680 N jumps — m = 680/9.81 = 69.3 kg — and that mass then feeds Ek = ½mv² to give the speed over the bar, 3.4 m s⁻¹. When a question gives a weight and asks for anything involving mass, the conversion is a marking point; write it.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**On another planet** (June 2023 Q11): substitute a = 0.38g into v² = u² + 2as; the ratio of landing speeds is √0.38 = 0.62 — g appears through the acceleration, not as 9.81. **As a definition recall**: g is weight per unit mass, *not* “acceleration per unit mass” or “energy per unit mass”. **As a field statement**: g = F/m means a 1 kg mass is pulled with 9.81 N — the two units are one quantity wearing two coats, and either earns credit.",
      },
    ],
  },
  {
    spec: "11",
    statement: "CORE PRACTICAL 1: Determine the acceleration of a freely-falling object",
    title: "Core Practical 1 — the acceleration of free fall",
    blocks: [
      {
        k: "p",
        text: "The examiner's report says of the 2024 paper that “explaining how a graph of the results should be used to determine a value is a skill which candidates need to practice” — and this core practical is where that skill is examined. Three methods appear across the papers: ==strobe photography== (October 2024), ==timing a fall with light gates== (October 2025), and ==plotting the data as s against t²== (January 2025). All three end in the same place: g from a gradient.",
      },
      {
        k: "steps",
        caption: "The strobe-photograph method (October 2024 Q14)",
        items: [
          {
            title: "Drop and flash",
            text: "A ball falls from rest beside a metre rule while a strobe flashes at a constant known interval; each flash photographs the ball at its instantaneous position. Measure the fall distances s₁, s₂, s₃… between successive images.",
          },
          {
            title: "Why s against t² is straight",
            text: "s = ½gt² (u = 0) — compare with y = mx: s is proportional to t², so the graph is a straight line through the origin whose gradient is ½g. The MS credits the comparison to y = mx + c as its own marking point.",
          },
          {
            title: "Double the gradient",
            text: "Gradient of the s–t² line = ½g, so g = 2 × gradient. The 2024 report: “It was pleasing to see the number of candidates correctly determining the gradient. Some candidates did not then double this value.”",
          },
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q14(b) — g from the graph",
        question:
          "The graph of s against t² is a straight line through the origin, passing through (0.060 s², 0.30 m). Determine g. (2)",
        steps: [
          "Gradient = 0.30 m ÷ 0.060 s² = 5.0 m s⁻² per s² — using a large triangle spanning more than half the drawn line",
          "s = ½gt² → gradient = g/2, so g = 2 × 5.0",
        ],
        answer:
          "g = 10.0 m s⁻² (printed tolerance 9.8–10.1 m s⁻²). “A small proportion of candidates gave an answer of g = 9.81 m s⁻² but showed no evidence of any working… These candidates gained no credit.”",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2025 Q13(b) — g from light gates",
        question:
          "A metal cylinder is dropped through a vertical tube with a light gate near the top and another near the bottom. The times for the cylinder to pass through each gate are logged, and the distance between the gates is 355 mm. The cylinder's speeds at the gates are 1.39 m s⁻¹ and 2.96 m s⁻¹. (i) State one other measurement needed. (ii) Calculate the acceleration. (3)",
        steps: [
          "(i) The length of the cylinder — each gate times the cylinder passing, so speed = length ÷ time through the gate",
          "(ii) Uniform acceleration, no time needed: v² = u² + 2as → a = (v² − u²)/(2s)",
          "a = (2.96² − 1.39²)/(2 × 0.355) = (8.76 − 1.93)/0.710",
        ],
        answer:
          "a = 9.6 m s⁻². Note the conversion 355 mm → 0.355 m before substituting — and that the gradient of v² against s would give 2a.",
      },
      {
        k: "table",
        caption: "Error sources — and which way they push g",
        head: ["Error", "Effect on measured g", "Session"],
        rows: [
          ["Ball already moving when the timer starts", "g too large (u > 0 assumed 0)", "June 2024 Q8"],
          ["Distance overestimated (measured to the wrong mark)", "g too large (s ↑ with t unchanged)", "June 2022 Q5"],
          ["Human reaction time on a stopwatch", "t too large → g = 2s/t² too small; and the % uncertainty in t is doubled", "October 2025 Q13(a)"],
          ["Air resistance and upthrust present", "g too small (a < g)", "January 2023 Q4 — the MCQ wants both negligible"],
          ["Flash duration blurs the image", "uncertainty in s; a shorter flash gives less blur", "October 2024 Q14(a)"],
        ],
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "The January 2025 paper asks it as a multiple-choice row (Q7): drop from *different* heights, time each fall, plot height against ==t²==, and the gradient is ==g/2==. The October 2025 paper asks why the stopwatch version has a large uncertainty: the fall is short, so reaction time is a large fraction of the measured t — and since a = 2s/t², the percentage uncertainty in t is *doubled* in the answer. Same practical, three costumes: choose the graph, read the gradient, or defend the method.",
      },
    ],
  },
  {
    spec: "12",
    statement:
      "know and understand Newton's third law of motion and know the properties of pairs of forces in an interaction between two bodies",
    title: "Newton's third law — the force-pair rules",
    blocks: [
      {
        k: "def",
        term: "Newton's third law pair",
        text: "When body A exerts a force on body B, body B exerts a force on body A that is ==equal in magnitude, opposite in direction, of the same type==, and — the property everyone forgets — ==acts on the other body==. All five properties, every time: two forces failing any one of them are not a pair.",
      },
      {
        k: "table",
        caption: "The five properties, with the report's own reject notes",
        head: ["Property", "The reject that costs the mark"],
        rows: [
          ["Equal magnitude", "“equal and opposite reaction” — name the magnitudes, not the slogan"],
          ["Opposite directions", "“The same but opposite force” is ambiguous (same type? same size?) — January 2025"],
          ["Same type of force", "weight (gravitational) vs normal contact force are different types — October 2022 Q18(b)"],
          ["Act on different bodies", "both acting on the same object disqualifies the pair instantly"],
          ["Act for the same time", "implied by “interaction”; stating it can rescue a two-property answer"],
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q18(b) — is weight paired with the normal force?",
        question:
          "A student suggests the weight of the engine and the normal reaction force from the rails form a Newton's third law pair. Explain why this is incorrect, referring to the features of such a pair. (5)",
        steps: [
          "True pairs are equal in magnitude and opposite in direction — these two are, so far, so good",
          "True pairs act on different bodies — these two both act on the engine: disqualified",
          "True pairs are of the same type — the weight is gravitational, the normal force is a contact force: disqualified again",
        ],
        answer:
          "Not a pair: same body, different types. The report adds: “Details of why the forces are not of the same nature required an account of what the natures of the forces are.”",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q4 — the cable car's true pair",
        question:
          "A cable car hangs in equilibrium from a cable. Which force forms a Newton's third law pair with the weight of the cable car? (1)  A air resistance on the cable car  B gravitational pull of the cable car on the Earth  C upthrust of displaced air on the cable car  D normal contact force of the cable car on the cable",
        steps: [
          "The weight is the Earth pulling the car down, gravitationally",
          "Its pair must be the equal, opposite, *gravitational* force on the *other* body: the car pulling the Earth up",
        ],
        answer:
          "B. The distractors fail the same-type test: air resistance, upthrust and normal contact are not gravitational forces.",
      },
      {
        k: "note",
        label: "Examiner's report — June 2024, Q15(c)",
        text: "“It was reasonably common for candidates to just state that ‘every action has an equal and opposite reaction’ which was not enough to score marking point 1.” October 2023 Q12(b)(ii) makes the same complaint about forces “cancelling out, rather than stating that the forces were equal in size and opposite in direction”. The slogan never scores; the properties always do.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "The papers like N3 as the engine of an *explanation*, named. **Rocket** (January 2023 Q16(b)(i), 3 marks): the motor exerts a force on the gases → by N3 the gases exert an equal and opposite force on the motor → there is a resultant force, so by N2 the module accelerates. The report: “without mention of the names of the laws only one mark could be scored at best.” **Magnetic gliders** (October 2023 Q12(b)(ii)): the magnetic forces are equal and opposite on the two gliders — a third-law pair — so the *system's* momentum is unaffected; the answer must say “on the system”. **Ball and skittle** (January 2024 Q16(b), 6 marks): IC1–IC6 chain naming both laws. **A person jumping** (October 2024 Q15(a)): the athlete exerts 890 N on the ground → N3 gives 890 N up on him → 890 N > 680 N weight → resultant force upwards.",
      },
    ],
  },
  {
    spec: "13",
    statement: "understand that momentum is defined as p = mv",
    title: "Momentum",
    blocks: [
      {
        k: "def",
        term: "Momentum",
        text: "The product of mass and velocity, ==p = mv== — a ==vector== in the direction of the velocity, measured in ==kg m s⁻¹== (equivalently N s). October 2023 Q2 asks the unit as an MCQ; October 2022 Q2 uses momentum as its example of a vector; January 2025 Q3 pairs it with work done to make you sort vector from scalar.",
      },
      {
        k: "eq",
        eq: "p = mv        1 N s = 1 kg m s⁻¹",
        note: "Because p is a vector, opposite directions carry opposite signs — the convention that makes statement 14's calculations work.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2025 Q10 — falling objects and Δp",
        question:
          "Objects R (mass m) and S (mass 2m) fall from rest. After a time t, R's momentum has grown from p to 2p. What is the momentum of S after the same time? (1)  A 2p  B 3p  C 4p  D 5p",
        steps: [
          "In free fall the only force is the weight, so the momentum change is Δp = W × t = mgt",
          "For R: Δp = mgt = p (taking it from p to 2p)",
          "For S: Δp = (2m)gt = 2p, starting from the same initial p",
        ],
        answer:
          "B: 3p. The heavier object gains momentum twice as fast *because the force on it is larger* — the equal accelerations of free fall hide unequal forces.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "Momentum is nearly always examined *with* statement 14, but it appears alone as: **a unit question** (October 2023 Q2); **a change question** — October 2024 Q8: a bat's momentum falls by Δp while a stationary ball of mass m leaves at v, so Δp = mv; hitting a 3m ball with 2Δp lost gives 2mv = 3mv′, v′ = (2/3)v; **a resultant question** — June 2025 Q7 combines momenta at right angles exactly like forces, √((15 000 − 14 500)² + 200²). The mark schemes also credit Δp = FΔt as an alternative statement of Newton's second law (June 2022 Q17), but the syllabus equation is p = mv — meet the papers on their terms.",
      },
    ],
  },
  {
    spec: "14",
    statement:
      "know the principle of conservation of linear momentum, understand how to relate this to Newton's laws of motion and understand how to apply this to problems in one dimension",
    title: "Conservation of momentum",
    blocks: [
      {
        k: "def",
        term: "The principle of conservation of linear momentum",
        text: "==Total momentum before a collision = total momentum after it==, ==provided no external resultant force acts on the system== (equivalently: in a closed system). Both halves earn a mark each — the October 2022 report: “Candidates typically failed to score the second mark by neglecting to state the condition for momentum conservation. Students should be encouraged to learn good forms of words for standard answers.”",
      },
      {
        k: "eq",
        eq: "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂        (one direction positive, the other negative)",
        note: "Assign + and − before substituting, and state your positive direction. The June 2025 report catches candidates “using positive values of momentum for both gliders”.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2023 Q16(a) — the separating spaceship",
        question:
          "A spaceship's modules separate. Before separation the total momentum along the axis is zero. After separation the orbital module (1350 kg) moves off at 0.82 m s⁻¹ and the service module (2100 kg) at 0.58 m s⁻¹ in the opposite direction. Determine the velocity of the descent module (2950 kg). (4)",
        steps: [
          "Take the orbital module's direction as positive; total momentum stays zero",
          "1350 × 0.82 + 2950 × v − 2100 × 0.58 = 0",
          "1107 + 2950v − 1218 = 0 → 2950v = 111",
          "v = 111 ÷ 2950 = 0.0376 m s⁻¹",
        ],
        answer:
          "v = 0.038 m s⁻¹ towards the orbital module. The fourth mark is the *direction*, dependent on the value — and the report notes “the idea of initial momentum being zero seemed to be a new concept to many candidates”.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q16 — the skaters, all three parts",
        question:
          "Skater B (60 kg, 7.5 m s⁻¹) catches up with skater A (65 kg, 5.5 m s⁻¹) and they lock arms, moving on together at 6.2 m s⁻¹. (a) State the principle of conservation of momentum. (2) (b) Deduce whether momentum was conserved in this collision. (3) (c) The collision is inelastic; explain the decrease in kinetic energy. (2)",
        steps: [
          "(a) Total momentum before = total momentum after, provided no external resultant force acts (on the system)",
          "(b) Before: 65 × 5.5 + 60 × 7.5 = 807.5 kg m s⁻¹. After: (65 + 60) × 6.2 = 775.0 kg m s⁻¹",
          "(b) 775.0 ≠ 807.5, so momentum was *not* conserved — the comparison is the mark",
          "(c) Forces acted between the skaters during the collision, and *work was done* by those forces — energy was transferred to thermal energy, not lost",
        ],
        answer:
          "The (c) wording is the report's centrepiece: “no marks can be easily awarded without mentioning work being done. Candidates overall simply stated that energy was transformed without telling us how.”",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2025 Q14(b) — test the prediction",
        question:
          "Glider A (0.15 kg) moves right at 0.32 m s⁻¹; glider B (0.20 kg) moves left at 0.11 m s⁻¹. They stick together. A student predicts they move left after the collision. Deduce whether this is correct. (3)",
        steps: [
          "Right positive: total momentum = 0.15 × 0.32 − 0.20 × 0.11 = 0.048 − 0.022",
          "= 0.026 kg m s⁻¹ — positive, i.e. to the right",
        ],
        answer:
          "0.026 kg m s⁻¹ > 0, so the gliders move right and the prediction is not correct. The final mark is “dependent on a valid calculation” — state the direction *and* the verdict on the prediction.",
      },
      {
        k: "note",
        label: "Examiner's report — June 2023, Q15(a)",
        text: "“Common errors included the usual absence of the word ‘sum’ or ‘total’ regarding the momentum of a system, rather than of an individual component. Many candidates gave a very good explanation in terms of Newton's laws but gained no credit as the question specifically asked for an explanation in terms of momentum.” Answer the question that was asked, in the currency it asks for.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Recoil from rest**: total momentum starts at zero, so the two parts leave with equal and opposite momenta — June 2023 Q15(b): 2.9 kg launcher and 56 g ball, v = −0.087 m s⁻¹. **Find the mass**: January 2024 Q16(c) — m × 7.2 = m × 1.6 + 1.4 × 3.1 → m = 0.78 kg (the report warns against “assuming that the ball and skittle stuck together, and adding the masses”). **KE given instead of speed**: October 2025 Q14 — recover v_B = √(2Ek/m) first, then conserve. **Where did the energy go**: always “work done by forces between the bodies, transferred to thermal/other stores” — the energy version is never “lost”.",
      },
    ],
  },
];
