import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part A
   Spec statements 23–26: density, upthrust, viscous drag and
   Stokes' law, and Core Practical 2 — the falling-ball
   viscometer.

   Worked examples are real WPH11/01 questions with the official
   mark schemes' working; examiner-report excerpts are verbatim
   from the Principal Examiners' reports, 2019–2025.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_A: SpecSection[] = [
  {
    spec: "23",
    statement: "be able to use the equation density ρ = m/V",
    title: "Density",
    blocks: [
      {
        k: "def",
        term: "Density",
        text: "Mass per unit volume: ==ρ = m/V==, measured in ==kg m⁻³==. Water is 1000 kg m⁻³, seawater about 1025–1030, air about 1.2 — three numbers that anchor almost every fluids question on the paper.",
      },
      {
        k: "p",
        text: "Density is a ==scalar== (June 2019 Q1 asks its unit as an MCQ) and is almost never examined alone: it is the first step of the upthrust chain (statement 24), the falling-ball method (26) and the floating-question family. The marks it carries are the ==unit conversions== that feed it: cm³ → m³ is ==× 10⁻⁶==, mm³ → m³ is × 10⁻⁹, and litres → m³ is × 10⁻³.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q8 — the cube's side",
        question:
          "A solid cube of weight W is made from material of density ρ. Which expression gives the length L of each side? (1)  A (ρg/W)³  B ∛(ρg/W)  C (W/(ρg))³  D ∛(W/(ρg))",
        steps: [
          "m = ρV and V = L³ for a cube; W = mg = ρL³g",
          "Solve for L³: L³ = W/(ρg)",
          "Cube root both sides",
        ],
        answer:
          "D: L = ∛(W/(ρg)). The distractors invert the ratio or forget the cube root — algebra with the volume formula is the whole question.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2024 (introduction)",
        text: "“When calculating volumes or areas which involve use of a radius or diameter it was common to see simple errors. Candidates should be encouraged to stop for a moment to consider whether they have been given a radius or diameter.” The same report's companion slip: cm³ to m³ (October 2024 Q19 uses 45 cm³ = 45 × 10⁻⁶ m³). Before substituting any volume, ask: metres? and radius or diameter?",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**Mass of displaced fluid** — the ρV in upthrust = ρVg is a *mass*, and multiplying by g gives the weight: October 2022 Q14(a) computes the air displaced by a 0.050 m³ balloon as 0.060 kg before the force chain. **Volume from a shape** — sphere (4/3)πr³ (June 2025 Q18: “omitting the factor of 4/3 or squaring the radius rather than cubing it”), cylinder πr²L (October 2024 Q16: the hydrometer). **Average density** — a floating object's submerged fraction *is* its density ratio: an iceberg at 917 kg m⁻³ in seawater at 1030 floats 89% down, which is how June 2024 Q12 expects you to think.",
      },
    ],
  },
  {
    spec: "24",
    statement: "understand how to use the relationship upthrust = weight of fluid displaced",
    title: "Upthrust — Archimedes' principle",
    blocks: [
      {
        k: "def",
        term: "Upthrust",
        text: "An ==upward force on an object in a fluid, caused by the displacement of the fluid== — equal to the ==weight of the fluid displaced==. The mark scheme's exact sentence (October 2023 Q17a): “an upwards force caused by the displacement of fluid (by an object)”, and the report says “only a small proportion of candidates managed to state what is meant by upthrust”. Learn it verbatim; it is a free mark that most candidates miss.",
      },
      {
        k: "eq",
        eq: "U = weight of fluid displaced = m displaced × g = ρ fluid × V displaced × g",
        note: "V displaced is the submerged volume — the whole object only if it is fully underwater. For a floating object, upthrust = weight exactly.",
      },
      {
        k: "p",
        text: "The one conceptual sentence that decides the flotation questions: an object ==floats when upthrust equals weight== — not when upthrust is *greater*. The June 2024 report calls the “floats if weight is less than upthrust” version “a clear misconception demonstrated by many candidates”. At equilibrium the two are equal; if upthrust exceeds weight the object accelerates *upwards* until enough of it leaves the surface to restore equality.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q14(a) — the lost balloon",
        question:
          "A child releases a helium balloon; the mass of balloon and string is 9.20 × 10⁻³ kg and its volume is 5.00 × 10⁻² m³. The density of air is 1.20 kg m⁻³. Calculate the resultant force immediately after release. (4)",
        steps: [
          "Upthrust = weight of air displaced = ρVg = 1.20 × 0.0500 × 9.81 = 0.589 N",
          "Weight of balloon and string: W = mg = 9.20 × 10⁻³ × 9.81 = 0.090 N",
          "Resultant force = U − W (both vertical, up positive)",
          "= 0.589 − 0.090",
        ],
        answer:
          "0.50 N upwards. Four marking points: the upthrust relationship, ρ = m/V (or ρVg directly), W = mg, then the difference. The report notes some candidates “worked out the density of the balloon, which was not required” — a valid but pointless detour.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q16 — the hydrometer",
        question:
          "A cylindrical hydrometer of weight 0.324 N and diameter 1.23 cm floats vertically in pure water (density 997 kg m⁻³), then in seawater (1025 kg m⁻³). (b)(i) Explain why it floats higher in seawater. (3) (b)(ii) Calculate the change in vertical position. (5)",
        steps: [
          "(b)(i) In both liquids the upthrust equals the hydrometer's weight — so the *weight of displaced liquid* is the same in both",
          "Seawater is denser, so the same weight needs a *smaller displaced volume* — the hydrometer sits higher",
          "(b)(ii) Mass displaced = W/g = 0.324 ÷ 9.81 = 0.0330 kg; volumes: V = m/ρ → 3.31 × 10⁻⁵ m³ (pure) and 3.22 × 10⁻⁵ m³ (sea)",
          "Cylinder: V = πr²L with r = 1.23 × 10⁻² ÷ 2 = 6.15 × 10⁻³ m → depths 0.279 m and 0.271 m",
          "ΔL = 0.279 − 0.271",
        ],
        answer:
          "ΔL = 8 mm higher in seawater. The report: “many referred to weight, but did not specify whether this was the weight of the hydrometer, the weight of the displaced pure water or the weight of the displaced seawater.” Say whose weight.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2024, Q16(b)(i)",
        text: "“Many did not use the term displacement at all, and alternatives such as replacement were not sufficient.” The technical vocabulary is the marking point: *displaced*, *upthrust*, *weight of the hydrometer*, *weight of the displaced seawater*. This note's worked example is written in exactly that register deliberately.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "Upthrust questions come in five costumes, all the same physics. **A rising balloon**: U − W − drag = ma, and at maximum velocity U = W + D (January 2023 Q18b). **An object sinking**: at terminal velocity, D = W − U — the drag is what is *left over* after upthrust (October 2022 Q17a, January 2023 Q18a). **A Cartesian diver** (January 2024 Q13): squeeze the bottle, the trapped air's volume falls, upthrust falls, weight grows — weight exceeds upthrust, resultant force downwards, it accelerates down. **A Galilean thermometer** (June 2022 Q15, 6 marks): each bulb floats while upthrust ≥ weight; warmer liquid is less dense, so upthrust falls until the bulb sinks — “the narrative is: the bulb floats, the temperature rises, the bulb sinks. A clear account of each stage in the right order is the most likely way to score all the marks.” **A submarine winched from the water** (January 2025 Q18b, 6 marks): tension = weight − upthrust while submerged; as it emerges the displaced volume falls, upthrust falls, tension rises to the full weight. **Lifting bags on a seabed box** (October 2025 Q17a): the *box's* volume displaces water too — bags alone give 1310 N, with the box 2686 N > 2500 N, so it lifts.",
      },
    ],
  },
  {
    spec: "25",
    statement:
      "a be able to use the equation for viscous drag (Stokes' Law), F = 6πηrv. b understand that this equation applies only to small spherical objects moving at low speeds with laminar flow (or in the absence of turbulent flow) and that viscosity is temperature dependent",
    title: "Viscous drag and Stokes' law",
    blocks: [
      {
        k: "def",
        term: "Viscous drag (Stokes' law)",
        text: "For a small sphere moving slowly through a fluid, the drag force is ==F = 6πηrv== — proportional to the fluid's ==viscosity η== (Pa s), the sphere's ==radius== and its ==speed==. The equation is printed on the data sheet; everything else about it is examined.",
      },
      {
        k: "def",
        term: "The conditions (the two marks that appear almost every paper)",
        text: "Stokes' law applies only to a ==small spherical object== moving at ==low speed== with ==laminar flow== — flow in smooth layers, without turbulence. Two marks: “small spherical object / spherical object moving at low speed” + “laminar flow (allow: flow is not turbulent)”.",
      },
      {
        k: "def",
        term: "Laminar flow",
        text: "Flow in which the fluid moves in ==layers that do not mix==, each layer sliding past its neighbours; the velocity at any point is steady. October 2021's report: “Laminar flow has a precise definition which needs to be learned.” June 2023's: “a description of the flow was required, so simply stating ‘laminar’ was not sufficient”, and October 2023's: “the word laminar was often used, but not always applied to the flow of the liquid. A statement that ‘the object must be laminar’ was not sufficient.”",
      },
      {
        k: "eq",
        eq: "F = 6πηrv        η = F/(6πrv)        v = F/(6πηr)",
        note: "v is a *velocity* — the October 2023 and January 2025 reports both record “a surprisingly high proportion of candidates interpreting v as a volume”. It is the terminal velocity in every falling-ball question.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q17 — the foraminifera",
        question:
          "A spherical foram of mass 1.15 × 10⁻⁸ kg sinks at terminal velocity through seawater; the upthrust on it is 4.37 × 10⁻⁸ N and the flow is laminar. Its diameter is 9.2 × 10⁻⁴ m; the viscosity of seawater is 1.41 × 10⁻³ Pa s. (a)(i) Show that the viscous drag at terminal velocity is about 7 × 10⁻⁸ N. (3) (a)(ii) Calculate the terminal velocity. (2)",
        steps: [
          "(a)(i) Weight: W = mg = 1.15 × 10⁻⁸ × 9.81 = 1.13 × 10⁻⁷ N",
          "At terminal velocity the forces balance (Newton's first law): D = W − U = 1.13 × 10⁻⁷ − 4.37 × 10⁻⁸",
          "D = 6.9 × 10⁻⁸ N ≈ 7 × 10⁻⁸ N — shown",
          "(a)(ii) Radius r = 9.2 × 10⁻⁴ ÷ 2 = 4.6 × 10⁻⁴ m (diameter given — halve it); F = 6πηrv → v = D/(6πηr)",
          "v = 6.9 × 10⁻⁸ ÷ (6π × 1.41 × 10⁻³ × 4.6 × 10⁻⁴)",
        ],
        answer:
          "v = 5.7 × 10⁻³ m s⁻¹ (ecf from (a)(i); the “show that” value 7 × 10⁻⁸ gives 5.7 × 10⁻³ too). The MS prints “[allow diameter for radius]” as a *substitution* concession — but the answer mark needs the radius.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2024 Q14(b) — does Stokes' law apply?",
        question:
          "A grain of sand falls through water at a measured terminal velocity of 0.050 m s⁻¹. Its weight is 4.3 × 10⁻⁵ N and the upthrust on it is 1.5 × 10⁻⁵ N; its radius is 0.75 mm and the viscosity of water is 1.2 × 10⁻³ Pa s. Deduce whether Stokes' law applies. (3)",
        steps: [
          "If Stokes' law held, the drag at 0.050 m s⁻¹ would be D = 6πηrv = 6π × 1.2 × 10⁻³ × 0.75 × 10⁻³ × 0.050",
          "D = 8.5 × 10⁻⁷ N",
          "The drag actually needed at terminal velocity: W − U = 4.3 × 10⁻⁵ − 1.5 × 10⁻⁵ = 2.8 × 10⁻⁵ N",
        ],
        answer:
          "8.5 × 10⁻⁷ N ≪ 2.8 × 10⁻⁵ N, so Stokes' law does not apply — the grain is too big and too fast for laminar flow. The MS offers six alternative routes (compare velocities, radii, viscosities…) — any consistent comparison with a conclusion scores.",
      },
      {
        k: "p",
        text: "==Viscosity is temperature dependent== — for ==liquids, viscosity falls as temperature rises== (gas is the other way round, and outside this unit). The chain the mark schemes want: hotter → less viscous → less drag at any given speed → a *higher* terminal velocity to rebuild the force balance. October 2022 Q17(b) runs it in reverse for forams sinking into colder water: viscosity rises, drag rises for the same speed, so terminal velocity falls — and the report praises candidates who saw “that the velocity can decrease to provide sufficient drag if the viscosity becomes greater”.",
      },
      {
        k: "table",
        caption: "The temperature chain, in the mark schemes' own words",
        head: ["Change", "Chain", "Session"],
        rows: [
          ["Liquid cooled", "viscosity increases → drag greater at given v → terminal velocity smaller", "October 2025 Q4 (MCQ), June 2025 Q16(c)"],
          ["Liquid heated", "viscosity decreases → drag less at given v → terminal velocity greater → fall time shorter", "October 2023 Q18(b)(iii), June 2024 Q14(c)"],
          ["Sinking into colder water", "viscosity rises AND density rises (upthrust rises) → weight unchanged → terminal velocity falls", "October 2022 Q17(b) — the four-mark version"],
        ],
      },
      {
        k: "note",
        label: "Examiner's report — January 2024, Q15(a)",
        text: "“Many students did not realise that this investigation was using small ball-bearings, and stated that a small, spherical object was needed… This did not score a mark as the information was given in the question.” Read the stem before reciting the conditions: only state what is *not* already given. The companion rule from June 2022 Q19(b)(iii): if one condition is asked for, give one — “there is no advantage in a second, and a risk that if it is wrong it will negate the mark.”",
      },
    ],
  },
  {
    spec: "26",
    statement: "CORE PRACTICAL 2: Use a falling-ball method to determine the viscosity of a liquid",
    title: "Core Practical 2 — the falling-ball viscometer",
    blocks: [
      {
        k: "p",
        text: "The method: time a small sphere falling through a deep column of liquid, ==between marks placed well below the surface== so the ball has reached terminal velocity before timing starts; measure the terminal velocity from distance ÷ time, then close the force balance. Every structured version of this practical since 2019 asks the same four moves, and January 2023 Q12(a) makes you *describe* them for four marks.",
      },
      {
        k: "figure",
        kind: "ph-falling-ball",
        caption:
          "The falling-ball viscometer: a wide tube of liquid, rubber bands as timing marks, a ball released just below the surface, a stopwatch or light gates. Only the middle section — constant velocity — is timed.",
      },
      {
        k: "steps",
        caption: "The method, in the mark scheme's four moves (January 2023 Q12a)",
        items: [
          {
            title: "1 · Weight",
            text: "Measure the ball's mass on a balance and convert: W = mg. (The MS also allows “use the balance set to read newtons”.)",
          },
          {
            title: "2 · Volume",
            text: "Measure the ball's ==diameter== with the digital calliper and compute V = (4/3)πr³ — “calipers cannot directly measure the radius of a sphere”, the report says; halving is your job.",
          },
          {
            title: "3 · Upthrust",
            text: "The ball displaces its own volume of liquid, so upthrust = ==weight of fluid displaced== = ρ_liquid × V × g — the link the report calls “the most common mark not awarded”.",
          },
          {
            title: "4 · Drag, then Stokes",
            text: "At terminal velocity, drag = weight − upthrust; equate to 6πηrv with v = distance between marks ÷ time, and solve for η. Repeat and average.",
          },
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2023 Q18(b) — from graph to viscosity",
        question:
          "A data logger records a ball-bearing of diameter 1.6 mm falling through a liquid; the displacement–time graph curves, then becomes a straight line. The difference between the ball's weight and the upthrust on it is 1.45 × 10⁻⁴ N. Assuming Stokes' law applies, calculate the viscosity. (4)",
        steps: [
          "Radius: r = 1.6 × 10⁻³ ÷ 2 = 8.0 × 10⁻⁴ m",
          "Terminal velocity from the *straight* section's gradient — the MS example reads 11.5 cm in 0.55 s: v = 0.209 m s⁻¹ (not “a point divided by its time”)",
          "At terminal velocity drag = W − U = 1.45 × 10⁻⁴ N = 6πηrv",
          "η = 1.45 × 10⁻⁴ ÷ (6π × 8.0 × 10⁻⁴ × 0.209)",
        ],
        answer:
          "η = 0.046 Pa s (printed tolerance 0.044–0.048). The report's headline: “a surprisingly high proportion of candidates interpreted v in the equation as a volume” — and many “selected a point on the graph and divided the displacement by the time” instead of using the gradient.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q16 — the examinable extras",
        question:
          "In a falling-ball experiment the ball falls 0.20 m at terminal velocity in 1.3 s; the viscous drag is 5.6 × 10⁻⁵ N and the ball's radius is 0.62 mm. (a) State one other measurement needed to determine the viscosity. (b) Calculate η. (3) (c) The oil is cooled; explain how the time to fall the same 0.20 m changes. (3)",
        steps: [
          "(a) The ==mass of the ball-bearing== — needed for its weight (the MS ignores radius, density and temperature: given or irrelevant)",
          "(b) v = 0.20 ÷ 1.3 = 0.154 m s⁻¹; η = F/(6πrv) = 5.6 × 10⁻⁵ ÷ (6π × 0.62 × 10⁻³ × 0.154)",
          "η = 0.031 Pa s",
          "(c) Cooler oil → greater viscosity → greater drag at any speed → smaller terminal velocity → longer fall time (MP3 dependent on MP1 or MP2)",
        ],
        answer:
          "η = 0.031 Pa s; and the fall takes longer. The report on (b): candidates “used the diameter of the ball instead of the radius, so have ended up with an answer double what it should be” — radius/diameter is *the* materials slip of the unit.",
      },
      {
        k: "note",
        label: "If the question were asked differently",
        text: "**A bigger sphere in the same oil** (January 2025 Q20(b)(ii)): weight and upthrust grow as r³, drag only as r — so the balance is struck at a *higher* terminal velocity: “the larger sphere would fall faster and take less time”, says the report, which notes most candidates reasoned from drag alone and concluded the opposite. **Why the tube is wide** (June 2022 Q19(b)(iii)): wall effects disturb the flow; a wide cylinder keeps it laminar. **Why the marks sit deep** (implied in every method question): the ball must be *at* terminal velocity when timed. **Blood instead of glycerol** (June 2022 Q19(c)): lower viscosity → lower drag per speed → lower terminal velocity → smaller ball, and “a simple statement that the viscosity of blood is less than that of glycerol would have scored a mark” — no calculation demanded when the question says *explain*.",
      },
    ],
  },
];
