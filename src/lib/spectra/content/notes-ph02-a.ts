import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part A — fluids (statements 23–26)
   Mark-scheme-wise notes: each spec statement followed by the
   marking points the WPH11/01 mark schemes actually award, in
   their own wording, mined from the 2019–2025 papers, mark
   schemes and Principal Examiners' reports (research/wph11/
   digest-A…D). One bullet = one scorable point.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_A: SpecSection[] = [
  {
    spec: "23",
    statement: "be able to use the equation density ρ = m/V",
    title: "Density",
    blocks: [
      { k: "h", text: "Density — ρ = m/V" },
      {
        k: "bullets",
        items: [
          "Density is the ==mass per unit volume==: **ρ = m/V**.",
          "Unit: ==kg m⁻³== (from kg ÷ m³).",
          "==g cm⁻³ → kg m⁻³: multiply by 1000== (1 g cm⁻³ = 1000 kg m⁻³; water = 1.00 g cm⁻³ = 1000 kg m⁻³).",
          "Anchors: water **1000**, seawater **1025–1030**, glycerol **1260**, air **≈ 1.2** (balloon questions give it or want it).",
        ],
      },
      { k: "h", text: "Where density earns the marks — the chains it starts" },
      {
        k: "bullets",
        items: [
          "Mass of displaced fluid (→ upthrust, statement 24): **m = ρV**, then upthrust = **mg**.",
          "Volume of a sphere: **V = (4/3)πr³** — from the diameter, radius = d/2 (CP2, Oct24 Q19).",
          "Volume of a cylinder: **V = πr²L** with r = d/2 (hydrometer, Oct24 Q16).",
          "Cube side from weight and density: m = W/g = ρL³, so ==L = ∛(W/(ρg))== (Jan24 Q8 — the distractors invert the ratio or drop the cube root).",
          "Water flow through a pipe: mass per second = ρ × volume per second, then ΔEgrav = mgΔh (Jan25 Q15).",
        ],
      },
      { k: "h", text: "Mark-scheme warnings" },
      {
        k: "bullets",
        items: [
          "==Radius or diameter?== — the examiners' standing warning: “stop for a moment to consider whether they have been given a radius or diameter” (Oct24 introduction). Using the diameter as the radius gives an answer 2× too big (Jun25 Q16 ER).",
          "==cm³ → m³: × 10⁻⁶== (Oct24 Q19: 45 cm³ = 45 × 10⁻⁶ m³; common error).",
          "Don't calculate quantities the question never asked for — e.g. the balloon's own density when the air's is given (Oct22 Q14 ER: “which was not required”).",
        ],
      },
    ],
  },
  {
    spec: "24",
    statement: "understand how to use the relationship upthrust = weight of fluid displaced",
    title: "Upthrust",
    blocks: [
      {
        k: "def",
        term: "Upthrust — the definition mark (learn the sentence)",
        text: "“An ==upward force caused by the displacement of fluid== (by an object)”, equal to “the ==weight of the fluid displaced==”. — Oct23 Q17(a) MS. Use the word ==displaced==: “replacement was not sufficient” (Oct24 ER).",
      },
      { k: "h", text: "The mark-scheme sentences" },
      {
        k: "bullets",
        items: [
          "Upthrust = weight of fluid displaced = ==ρ_fluid × V_displaced × g== — mass of displaced fluid from ρ = m/V, then its weight from W = mg.",
          "Floating (equilibrium): ==upthrust = weight== — equal, not greater. “Floats if weight is less than upthrust” is named as ==a clear misconception== (Jun24 Q12(b) ER): if U > W the resultant is upward and the object is still accelerating/rising.",
          "Sinking at terminal velocity: ==weight = upthrust + drag== → drag = W − U (Jun24 Q14(a), Oct22 Q17(a)(i)).",
          "Rising at terminal velocity: ==upthrust = weight + drag== → U > W and U > D (Oct25 Q5).",
          "Hydrometer floating higher in seawater — any two of: “the upthrust is ==equal to the weight of water displaced==”; “the upthrust equals the ==weight of the hydrometer==”; “the weight of displaced water equals the weight of the hydrometer”; then “so a ==smaller volume of seawater== needs to be displaced (because seawater has a greater density)” (Oct24 Q16(b)(i)).",
          "==Say whose weight== — “many referred to weight, but did not specify whether this was the weight of the hydrometer, the weight of the displaced pure water or the weight of the displaced seawater” (Oct24 ER).",
        ],
      },
      { k: "h", text: "The same balance in every costume — scenario chains" },
      {
        k: "bullets",
        items: [
          "**Balloon released** — accelerating upward: U − W = ma, with U = ρ_air V g (Oct22 Q14: U = 0.589 N, W = 0.090 N, resultant 0.50 N up).",
          "**Balloon rising, max height ICs** (Jan23 Q17(c)): at release upthrust > weight → resultant upward → velocity increases; as height increases the air density decreases → upthrust decreases; until upthrust < weight → resultant downward → balloon decelerates to rest.",
          "**Balloon volume needed** — to float at 25 km: set upthrust = weight, solve V = W/(ρ_air g); compare with the burst volume and conclude (Jan23 Q17(b)(ii): 27 m³ < 50 m³ → survives).",
          "**Cartesian diver** (Jan24 Q13 MPs): the volume of trapped air decreases → ==upthrust decreases== (or water enters, weight increases) → ==weight greater than upthrust== → ==resultant force downwards== (so it accelerates down).",
          "**Galilean thermometer ICs** (Jun22 Q15): upthrust on a bulb = weight of liquid displaced; when upthrust ≥ weight the bulb floats; weight of a bulb is constant; as temperature increases the density of the liquid decreases → upthrust on the bulb decreases; until the weight exceeds the upthrust; there is a resultant (downward) force and the bulb sinks.",
          "**Submarine winched out of the sea** (Jan25 Q18(b) ICs): resultant force zero → tension = weight − upthrust; as it leaves the water the volume/mass/weight of water displaced decreases → upthrust decreases → tension increases; when fully out, tension = weight.",
          "**Iceberg** (Jun24 Q12(b)): at equilibrium the weight of the block = the weight of water displaced; in lower-density water a ==greater volume== must be displaced.",
          "**Lifting bags on a seabed box** (Oct25 Q17(a)): total displaced volume = bags + the submerged box itself; U = ρVg; compare U with the total weight and conclude.",
        ],
      },
    ],
  },
  {
    spec: "25",
    statement:
      "a be able to use the equation for viscous drag (Stokes' Law), F = 6πηrv. b understand that this equation applies only to small spherical objects moving at low speeds with laminar flow (or in the absence of turbulent flow) and that viscosity is temperature dependent",
    title: "Viscous drag — Stokes' law",
    blocks: [
      {
        k: "def",
        term: "Laminar flow — the definition mark (learn the sentence)",
        text: "Flow in which the fluid moves in ==layers that do not mix== / flow that is ==not turbulent==. “Laminar flow has a precise definition which needs to be learned” (Oct21 ER). Laminar describes the ==flow== — “the object must be laminar” scores nothing (Oct23 ER).",
      },
      { k: "h", text: "Stokes' law and its conditions" },
      {
        k: "bullets",
        items: [
          "Viscous drag on a small sphere: **F = 6πηrv**, with η in ==Pa s==.",
          "==v is a velocity== (m s⁻¹) — distance ÷ time, or the gradient of a displacement–time graph. “A surprisingly high proportion of candidates interpreted v as a volume” (Oct23 and Jan25 ERs).",
          "Conditions — the two marking points, verbatim: “==small spherical object== OR ==spherical object moving at low speed==” (1) + “==laminar flow== / flow is not turbulent” (1) (Oct24 Q19(a)(i), Oct23 Q18(a), Jun23 Q16(a)).",
          "Stokes' law does NOT need a low-viscosity fluid — it “applies at all viscosities” (Oct22 Q3 MS).",
          "==State only conditions not already given in the stem==: Jan24 Q15(a) — the ball-bearings were already small; “small, spherical object was needed … did not score a mark as the information was given in the question”.",
          "If one condition is asked for, give one — “there is no advantage in a second, and a risk that if it is wrong it will negate the mark” (Jun22 Q19(b)(iii) ER).",
        ],
      },
      { k: "h", text: "Terminal velocity — the four-mark chain (Jan25 Q20(a), verbatim order)" },
      {
        k: "bullets",
        items: [
          "Initially ==weight is greater than upthrust (+ drag)== → there is a resultant force downwards.",
          "So the sphere ==accelerates== / its speed increases — state this BEFORE the drag point: “general statements that drag increases when speed increases, without actually stating that the sphere would increase in speed, did not score” (Jan25 ER).",
          "==Drag increases== as speed increases (and upthrust remains constant).",
          "Until the ==resultant force becomes zero== → the sphere moves at constant (terminal) velocity.",
          "The same chain, sinking version: W = U + D at terminal velocity (Jun24 Q14(a): “the weight of the grain is equal to the sum of the drag and upthrust” / “resultant force = 0”).",
          "Constant speed does NOT require Stokes' law — “mentions of small spheres, laminar flow and temperature were all irrelevant” if the question is only about constant speed (Oct21 Q17 ER).",
        ],
      },
      { k: "h", text: "Viscosity and temperature" },
      {
        k: "bullets",
        items: [
          "Liquids: temperature ↑ → ==viscosity decreases== (Jun22 Q19(a), Oct25 Q4).",
          "The warmed-liquid chain: viscosity ↓ → drag ↓ at a given speed → terminal velocity ↑ → the ball takes ==less time== to fall the same distance (Oct23 Q18(b)(iii), Jun24 Q14(c), Jun25 Q16(c)).",
          "The cooled-liquid chain: viscosity ↑ → drag ↑ at a given speed → terminal velocity ↓ → time taken is greater (Jun25 Q16(c): MP3 dependent on MP1 or MP2).",
          "Sinking into colder, deeper water (Oct22 Q17(b), four marks): ==viscosity increases== → drag increases for a given velocity; ==density increases== → upthrust increases; ==weight remains constant== (not “mass”); so terminal velocity decreases.",
          "The drag at terminal velocity is fixed by the force balance — “many candidates did not realise that the drag force at terminal velocity remains the same, and that the velocity can decrease to provide sufficient drag if the viscosity becomes greater” (Oct22 ER).",
        ],
      },
      { k: "h", text: "“Does Stokes' law apply?” — the deduction questions" },
      {
        k: "bullets",
        items: [
          "Route: terminal-velocity drag from the balance = **W − U**; Stokes prediction = **6πηrv**; ==compare the two and conclude== (Jun24 Q14(b): 1.65 m s⁻¹ ≠ 0.050 m s⁻¹ → does not apply; Oct24 Q19(a)(ii): 0.035 N ≪ 4.6 N → does not apply; Jun23 Q16(b)(ii); Jun22 Q19(b)(ii): 2.54 × 10⁻³ N = W − U → it does apply).",
          "Any valid comparison route scores — compare forces, or the required velocity / radius / viscosity — but every route needs an ==explicit comparison and a consistent conclusion==.",
        ],
      },
      { k: "h", text: "Size and material comparisons" },
      {
        k: "bullets",
        items: [
          "Larger sphere, same oil (Jan25 Q20(b)(ii)): drag ∝ r, but weight and upthrust ∝ r³ — the downward forces grow by a greater factor → balance struck at a ==greater terminal velocity== → ==less time==. Consider ALL the forces: “most answers did not consider all of the forces … This led to incorrect conclusions” (Jan25 ER).",
          "Blood instead of glycerol (Jun22 Q19(c)): viscosity of blood is much lower → drag lower for a given velocity → terminal velocity lower; smaller ball → smaller weight (∝ d³) while drag ∝ d.",
          "A rising bubble: drag acts ==downwards== (opposite to the motion), so 6πηrv = U − W (Oct25 Q17(b)(i)).",
          "Why a real bubble may differ from Stokes' prediction (Oct25 Q17(b)(ii)): the predicted speed is high → flow likely turbulent; the bubble deforms / is not a rigid sphere; it expands as it rises.",
        ],
      },
    ],
  },
  {
    spec: "26",
    statement: "CORE PRACTICAL 2: Use a falling-ball method to determine the viscosity of a liquid",
    title: "Core Practical 2 — falling-ball viscometer",
    blocks: [
      {
        k: "figure",
        kind: "ph-falling-ball",
        caption:
          "The falling-ball viscometer: a wide tube of liquid, timing marks well below the surface, a ball released just under the surface, stopwatch or light gates.",
      },
      { k: "h", text: "The force balance the experiment is built on" },
      {
        k: "bullets",
        items: [
          "At terminal velocity: ==weight = upthrust + viscous drag== → drag = W − U → **η = (W − U)/(6πrv)** (Jan24 Q15(b)(ii), the glycerol deduction).",
          "==The upthrust comes from the displaced LIQUID==: U = ρ_liquid V_ball g — using the ball's density here is “the most common mark not awarded” (Jan24 Q15(b)(ii) ER).",
          "Full chain (Jan24 Q15(b)(ii), six marks): V = (4/3)πr³ → m_liquid = ρV → U = m_liquid g → D = W − U → η = D/(6πrv) → compare with the given value and conclude.",
        ],
      },
      { k: "h", text: "The measurements — and what each one is FOR" },
      {
        k: "bullets",
        items: [
          "==Mass of the ball-bearing== (→ W = mg). Jun25 Q16(a): the one other measurement needed — radius, density and temperature given in the stem are ignored: “ignore radius / diameter / volume; ignore density; ignore temperature”.",
          "Diameter with (digital) callipers → radius = ==d/2== → V = (4/3)πr³. “Callipers cannot directly measure the radius of a sphere” (Jan24 ER); treating the radius as a diameter, or r² instead of r³, and power-of-ten errors are all recorded (Jan24, Jun25 ERs).",
          "Terminal velocity: time the fall between two marks, v = s/t (Jun25 Q16(b): 0.20 m ÷ 1.3 s), or take the ==gradient of the straight section== of the displacement–time graph (Oct23 Q18(b)(ii)).",
          "==Not one point's s ÷ t==: “many candidates … selected a point on the graph and divided the displacement by the time” — the straight section's gradient IS the constant velocity (Oct23 ER).",
          "The marks sit ==well below the surface==: the ball must have reached terminal velocity before the timing begins — Stokes' law is applied at constant v.",
          "Repeat and average; record the ==temperature== (η is temperature dependent).",
          "==Wide tube== / low speed keeps the flow laminar — “accept reference to wide cylinder” (Jun22 Q19(b)(iii)).",
        ],
      },
      { k: "h", text: "Free-body diagram marking points (Jan24 Q15(b)(i))" },
      {
        k: "bullets",
        items: [
          "Ball at terminal velocity: ==drag up, upthrust up, weight down== — all arrows starting from the dot.",
          "==Length of the weight arrow ≈ drag + upthrust arrow lengths== — arrow length represents the size of the force.",
          "Label it W / weight / mg — “G is not acceptable as an abbreviation for weight” (Jan24, Oct24 ERs); extra forces (e.g. drag on a floating hydrometer) void the marks (Oct24 Q16(a) ER).",
        ],
      },
    ],
  },
];
