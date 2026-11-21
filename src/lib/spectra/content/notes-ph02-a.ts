import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part A — fluids (statements 23–26)
   REWRITTEN in the source-note style (see upload/1.Kinetics.pdf):
   every idea is built, not stated — mechanism first, in plain
   language; consequences derived; the exam layer (real questions,
   mark schemes, examiner reports) applied afterwards.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_A: SpecSection[] = [
  {
    spec: "23",
    statement: "be able to use the equation density ρ = m/V",
    title: "Density",
    blocks: [
      {
        k: "p",
        text: "Before a material can be stretched, bent or snapped, there is a simpler question to answer about it: ==how much matter is packed into a given space?== Hold a wooden block and a lead block of exactly the same size — the lead one feels heavier, not because it has *more stuff* in some vague sense, but because the same volume holds more mass. Density turns that observation into a single number.",
      },
      {
        k: "p",
        text: "The way to feel the definition is to imagine cutting each block into ==1 cm³ cubes== and weighing one cube of each. The lead cube and the wood cube have the same volume, so comparing their masses compares the *materials themselves*, free of the blocks' sizes. That per-cube mass is the density: ==mass per unit volume==, ρ = m/V. Cut either block in half and both the mass and the volume halve, so the ratio — the density — is unchanged: density belongs to the ==material==, not to the sample.",
      },
      {
        k: "def",
        term: "Density",
        text: "Mass per unit volume: ==ρ = m/V==. The unit follows from the ratio — kilograms divided by cubic metres — so density is measured in ==kg m⁻³==. In lab work you will often meet g cm⁻³; since 1 g = 10⁻³ kg and 1 cm³ = 10⁻⁶ m³, a density in g cm⁻³ is ==1000 times smaller== than the same density in kg m⁻³: water is 1.00 g cm⁻³ = 1000 kg m⁻³.",
      },
      {
        k: "p",
        text: "Two anchor numbers do most of the work in this unit. ==Water is 1000 kg m⁻³== — a one-litre bottle of water has a mass of one kilogram. And ==air is about 1.2 kg m⁻³== — which sounds like nothing until you notice that a cubic metre of air (a box the size of a washing machine, full of *nothing visible*) still weighs more than that water bottle. That surprising heft of air is exactly what makes helium balloons and weather balloons work, in the sections ahead.",
      },
      {
        k: "table",
        caption: "Densities worth carrying in your head (kg m⁻³)",
        head: ["Material", "Density", "Why it matters in WPH11"],
        rows: [
          ["air", "≈ 1.2", "balloon upthrust questions give it (or want it) every time"],
          ["water (pure)", "1000", "the flotation reference; falling-ball experiments"],
          ["seawater", "1025–1030", "hydrometer and iceberg questions"],
          ["glycerol", "1260", "the falling-ball viscometer's classic liquid"],
          ["steel", "≈ 7850", "sinking objects, cables"],
        ],
      },
      {
        k: "p",
        text: "Density almost never gets its own question. It is the ==first gear== in every fluids calculation: the mass of displaced fluid (for upthrust), the volume of a sphere (for Stokes' law), the mass of water per minute (for a hydro station). The marks it carries are algebraic: rearranging ρ = m/V fluently, and ==converting volumes== — cm³ to m³ is × 10⁻⁶, because (10⁻²)³ = 10⁻⁶. That conversion is not a rule to memorise but a consequence of volume being cubic: a cube 1 cm on a side fits a hundred of itself along each edge of a metre, and 100 × 100 × 100 = 10⁶ of itself in a cubic metre.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 January 2024 Q8 — the cube's side",
        question:
          "A solid cube of weight W is made from material of density ρ. Which expression gives the length L of each side?  A (ρg/W)³   B ∛(ρg/W)   C (W/(ρg))³   D ∛(W/(ρg))",
        steps: [
          "Build from the definition rather than hunting for a pattern: m = ρV, and for a cube V = L³",
          "The weight connects mass to the given quantity: W = mg, so m = W/g",
          "Substitute both into the density definition: ρ = W/(gL³) — one unknown, L³",
          "Rearrange: L³ = W/(ρg), then undo the cube with a cube root",
        ],
        answer:
          "D: L = ∛(W/(ρg)). The distractors are the two algebra slips — inverting the ratio, or forgetting the cube root — which is why building from ρ = m/V beats pattern-matching.",
      },
      {
        k: "note",
        label: "Examiner's report — October 2024 (introduction)",
        text: "“When calculating volumes or areas which involve use of a radius or diameter it was common to see simple errors. Candidates should be encouraged to stop for a moment to consider whether they have been given a radius or diameter.” The companion slip is cm³ to m³ (October 2024 Q19 uses 45 cm³ = 45 × 10⁻⁶ m³). Both errors are volume-shaped, and both are worth ten seconds of checking.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — why does cutting a sample in half leave its density unchanged?",
          "==Check yourself== — a density is quoted as 1.26 g cm⁻³. What is it in kg m⁻³, and how do you know without looking it up?",
          "==Check yourself== — a sphere's radius is quoted as 2.30 mm. What is it in metres, and what is its volume in m³?",
        ],
      },
    ],
  },
  {
    spec: "24",
    statement: "understand how to use the relationship upthrust = weight of fluid displaced",
    title: "Upthrust — why fluids push up, and what Archimedes really said",
    blocks: [
      {
        k: "p",
        text: "Push an empty bottle straight down into a bath and you feel an unmistakable upward shove that grows as the bottle goes deeper. That shove is ==upthrust==, and it is not some mysterious property of water — it is the fluid's own ==pressure==, acting on the object's surfaces, failing to cancel.",
      },
      {
        k: "p",
        text: "Here is the mechanism. A fluid exerts pressure on every surface it touches, always ==perpendicular== to that surface, and the pressure ==grows with depth== — because the deeper you go, the more fluid sits above you, and its weight presses down through the fluid. Now put a box underwater. The fluid pushes down on its top face and up on its bottom face; sideways pushes on the walls cancel in pairs. But the bottom face is ==deeper== than the top face, so the fluid pushes up on it ==harder== than it pushes down on the top. Down-push and up-push fail to cancel, and what survives is a net force pointing ==up==. That is upthrust.",
      },
      {
        k: "p",
        text: "How big is it? Picture the fluid that would fill the box's space if the box weren't there — the ==displaced parcel== of fluid. That parcel sits in equilibrium: the rest of the fluid holds it up with a force exactly equal to its own weight (nothing else acts on it, so its forces must balance). The surrounding fluid presses on ==whatever occupies that space== in exactly the same way — the parcel and the box have the same shape and sit at the same depths, so the pressure distribution is identical. The upthrust on the box therefore equals the weight of the displaced parcel: ==U = ρ_fluid × V_displaced × g==. Mass of displaced fluid first (from ρ = m/V), then its weight (from W = mg) — the chain runs straight through the two equations you already own.",
      },
      {
        k: "def",
        term: "Upthrust (the mark scheme's sentence)",
        text: "An ==upward force on an object in a fluid, caused by the displacement of the fluid== — equal to the ==weight of the fluid displaced==. Learn it in exactly these words: October 2023's report found that “only a small proportion of candidates managed to state what is meant by upthrust”, and October 2024's rejected “replacement” as a substitute for “displaced”.",
      },
      {
        k: "p",
        text: "The definition explains ==floating== at a stroke. A floating object sits still, so its resultant force is zero — Newton's first law. Only two forces act: weight (down) and upthrust (up), so they must be ==equal==: ρ_fluid V_displaced g = ρ_object V_total g. Divide through and a small piece of algebra falls out with real physical meaning: ==the fraction submerged equals the density of the object over the density of the fluid==. An iceberg (917 kg m⁻³) in seawater (1030 kg m⁻³) floats with 917/1030 ≈ 89% of itself below the surface — the famous tip is the other 11%. And the same equation, read the other way, kills a classic misconception: an object does *not* float because upthrust is greater than its weight. If U > W, the resultant is upward and it ==accelerates== upward, rising until less of it is submerged and the balance is restored. ==Floating means equal; more than equal means still rising== (June 2024's report calls the “floats when weight is less than upthrust” version a clear misconception, demonstrated by many candidates).",
      },
      {
        k: "p",
        text: "One more step of imagination and the whole family of exam questions collapses into one idea. ==Air is a fluid== — density 1.2 kg m⁻³. A helium balloon “floats” in air for the same reason a cube of wood floats in water: it displaces air, the displaced air's weight is the upthrust, and the balloon rises because that upthrust beats its (small) weight. A ship floats by ==shape==: steel is eight times denser than water, but a ship's hull encloses mostly air, so its *average* density is well under 1000 and it rides high with only its hull below the waterline. Shape, not substance, is why a steel bowl floats while a steel bolt sinks.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q14(a) — the lost balloon",
        question:
          "A child releases a helium balloon; the mass of balloon and string is 9.20 × 10⁻³ kg and its volume is 5.00 × 10⁻² m³. The density of air is 1.20 kg m⁻³. Calculate the resultant force immediately after release. (4)",
        steps: [
          "Identify the two vertical forces on the balloon: upthrust from the displaced air, and its own weight",
          "Upthrust = weight of air displaced: mass of displaced air = ρV = 1.20 × 0.0500 = 0.060 kg, so U = mg = 0.060 × 9.81 = 0.589 N",
          "Weight of balloon and string: W = 9.20 × 10⁻³ × 9.81 = 0.090 N",
          "The resultant is the imbalance of the two — U − W, since the balloon accelerates upwards",
        ],
        answer:
          "0.50 N upwards. The examiner's note on this question: some candidates “worked out the density of the balloon, which was not required” — a valid but pointless detour. Ask what the question wants: a resultant force, from two forces you can name.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2024 Q16 — the hydrometer",
        question:
          "A cylindrical hydrometer of weight 0.324 N floats vertically in pure water (997 kg m⁻³), then in seawater (1025 kg m⁻³). (b)(i) Explain why it floats higher in seawater. (3) (b)(ii) Calculate the change in vertical position. (5)",
        steps: [
          "(b)(i) In each liquid the hydrometer is in equilibrium, so the upthrust equals its weight — the same 0.324 N in both",
          "Upthrust = weight of displaced liquid: the same weight of liquid must be displaced in each case",
          "Seawater is denser, so that same weight is contained in a ==smaller displaced volume== — less of the hydrometer sits below the surface",
          "(b)(ii) Mass of displaced liquid = W/g = 0.324 ÷ 9.81 = 0.0330 kg; displaced volumes V = m/ρ give 3.31 × 10⁻⁵ m³ (pure) and 3.22 × 10⁻⁵ m³ (sea)",
          "Each displaced volume is a cylinder of the hydrometer's radius (1.23 × 10⁻² ÷ 2 m) and submerged depth L: V = πr²L gives depths 0.279 m and 0.271 m",
        ],
        answer:
          "ΔL = 8 mm higher in seawater. The examiner's warning on the explanation: “many referred to weight, but did not specify whether this was the weight of the hydrometer, the weight of the displaced pure water or the weight of the displaced seawater.” Name whose weight, every time.",
      },
      {
        k: "note",
        label: "If the question were asked differently — one idea, five costumes",
        text: "Every flotation question since 2019 is the force balance wearing a different story. **A rising weather balloon** (January 2023 Q18): U − W − drag = ma while accelerating, and U = W + drag at maximum velocity. **An object sinking** (October 2022 Q17): at terminal velocity drag = W − U — the drag is whatever is left of the weight after upthrust. **A Cartesian diver** (January 2024 Q13): squeeze the bottle and the trapped air compresses, so displaced volume and upthrust fall while weight is unchanged — now U < W, resultant downwards, the diver sinks. **A Galilean thermometer** (June 2022 Q15, 6 marks): each sealed bulb's weight is fixed; as the liquid warms its density falls, so upthrust on each bulb falls until a bulb's weight beats it and that bulb sinks — “the narrative is: the bulb floats, the temperature rises, the bulb sinks. A clear account of each stage in the right order is the most likely way to score all the marks.” **A submarine winched from the sea** (January 2025 Q18b): tension = W − U while fully submerged; as it breaks the surface the displaced volume falls, upthrust falls, and tension climbs to the full weight. In every costume: ==name the forces, write the balance for that moment of the story==.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — why does the fluid push harder on the bottom face of an immersed box than on the top face?",
          "==Check yourself== — an object floats with 30% of its volume above the surface. What is the ratio of its density to the fluid's, and how does the equation give it?",
          "==Check yourself== — a bottle is pushed under and released. Explain, in force words, why it accelerates upward and then bobs still.",
        ],
      },
    ],
  },
  {
    spec: "25",
    statement:
      "a be able to use the equation for viscous drag (Stokes' Law), F = 6πηrv. b understand that this equation applies only to small spherical objects moving at low speeds with laminar flow (or in the absence of turbulent flow) and that viscosity is temperature dependent",
    title: "Viscosity, laminar flow and Stokes' law",
    blocks: [
      {
        k: "p",
        text: "Pour honey and water side by side and watch them level out. The water is done in a second; the honey takes a minute. Something inside the honey ==resists its own flow== — and that something is viscosity. To see it clearly, picture a moving fluid as ==layers==: fluid in contact with a stationary surface barely moves (a thin film of honey clings to the jar even when you tip it), layers further from the surface move faster, and each layer slides along its neighbour. ==Laminar flow== is exactly this: orderly motion in layers that do not mix, each point of the fluid keeping a steady velocity.",
      },
      {
        k: "p",
        text: "==Viscosity== measures how hard those layers resist sliding past each other — the fluid's ==internal friction==. In honey, molecules cling strongly to their neighbours, so a fast layer drags the slow one along and the slow layer holds the fast one back: large η. In water the layers slip easily: small η. The unit of viscosity, the ==Pa s==, has a physical reading: it is (pressure × time) — how long a fluid takes to shear under a given stress. Honey ≈ 10 Pa s; water ≈ 0.001 Pa s; air ≈ 0.00002 Pa s. That ladder of ten-thousands is worth feeling — it is why a ball falls through glycerol in seconds but through air in a blink.",
      },
      {
        k: "p",
        text: "Now drop a ball into the fluid. For the ball to move, the fluid must make way: layers near the ball are dragged along with it, layers further out stay put, and between them the fluid is sheared — the same layer-sliding as before, but now the ==ball pays for it==. The reaction the fluid exerts on the ball is ==viscous drag==, pointing opposite the motion. In 1845 Stokes solved the flow around a ==small sphere moving slowly== through a fluid and found the drag grows in strict proportion to three things: ==F = 6πηrv== — the fluid's viscosity η, the sphere's radius r, and the speed v. Each proportionality has a physical face: a bigger sphere shears more fluid; a faster sphere shears it harder; a stickier fluid resists more. The 6π is the shape of the mathematics and comes free on the data sheet.",
      },
      {
        k: "eq",
        eq: "F = 6πηrv        η = F/(6πrv)        v = F/(6πηr)",
        note: "The same equation read three ways: v is a ==velocity== — distance ÷ time, or the gradient of a displacement–time graph. The October 2023 and January 2025 reports both record “a surprisingly high proportion of candidates interpreting v as a volume” — read the equation's letters as quantities with units, not as shapes on the page.",
      },
      {
        k: "p",
        text: "Stokes' law carries a ==contract==, and the contract is examined as often as the equation: it applies only to a ==small spherical object== moving at ==low speed== with ==laminar flow==. The physics behind each clause: a large object or a fast one throws the fluid into ==turbulence== — eddies and swirls that break the layered order — and once the flow is turbulent the drag no longer follows the gentle 6πηrv law (it grows roughly with v², and the neat proportionality is lost). Small size and low speed keep the flow in its layered regime, which is the only regime Stokes solved. That is why October 2022 Q3's answer is “small spherical objects moving at low speeds” and *not* “all spherical objects”: the sphere shape matters, but so do the size and the speed.",
      },
      {
        k: "def",
        term: "Laminar flow (learn the definition, not the label)",
        text: "Flow in which the fluid moves in ==layers that do not mix==, each layer sliding smoothly past its neighbour; the velocity at any fixed point is steady. October 2021's report: “Laminar flow has a precise definition which needs to be learned.” June 2023's: “a description of the flow was required, so simply stating ‘laminar’ was not sufficient.” October 2023's adds the sentence that should never be written: “a statement that ‘the object must be laminar’ was not sufficient” — ==laminar describes the flow, not the object==.",
      },
      {
        k: "p",
        text: "Why does a sinking ball settle at a ==terminal velocity== at all? Watch the forces race. The weight is fixed the moment the ball exists. The drag starts at zero and ==grows with speed==. So at release: weight beats drag, resultant force downwards, the ball accelerates. But every gain in speed raises the drag, shrinking the resultant — so the acceleration itself shrinks (the ==velocity is still growing==, just more slowly — the distinction the October 2023 report says candidates most often blur). The race ends when drag has grown enough that the three forces balance: ==weight = upthrust + drag==. Resultant zero, Newton's first law, constant velocity — terminal velocity. Every terminal-velocity explanation in the unit is this race, told in order.",
      },
      {
        k: "p",
        text: "Finally, the temperature clause. Warm a liquid and its viscosity ==falls==: heat hands the molecules energy to slip out of the transient bonds that make them cling, so the layers slide past each other more easily. The knock-on effects run down the chain: less viscous → less drag at any given speed → the force balance is struck ==later==, at a ==higher terminal velocity== → a ball falls the same distance in ==less time==. Cool the liquid and everything reverses (October 2022 Q17(b) runs it for forams sinking into colder, deeper water: viscosity rises, drag rises, terminal velocity falls). Gases behave the other way round — hotter gas, more viscosity — for a different reason (faster molecules collide more); the spec names the fact, and the examinable chain is the ==liquid== one.",
      },
      {
        k: "table",
        caption: "The temperature chain — as the mark schemes want it told",
        head: ["Change", "Chain of consequences", "Session"],
        rows: [
          ["Liquid warmed", "viscosity ↓ → drag ↓ at given v → terminal velocity ↑ → fall time ↓", "October 2023 Q18, June 2024 Q14(c)"],
          ["Liquid cooled", "viscosity ↑ → drag ↑ at given v → terminal velocity ↓ → fall time ↑", "October 2025 Q4, June 2025 Q16(c)"],
          ["Sinking into colder water (four marks)", "viscosity ↑ (drag ↑) AND density ↑ (upthrust ↑) while weight fixed → the balance strikes sooner → terminal velocity falls", "October 2022 Q17(b)"],
        ],
      },
      {
        k: "worked",
        title: "Past paper · WPH11 October 2022 Q17 — the foraminifera",
        question:
          "A spherical foram of mass 1.15 × 10⁻⁸ kg sinks at terminal velocity through seawater; the upthrust on it is 4.37 × 10⁻⁸ N and the flow is laminar. Its diameter is 9.2 × 10⁻⁴ m; the viscosity of seawater is 1.41 × 10⁻³ Pa s. (a)(i) Show that the viscous drag at terminal velocity is about 7 × 10⁻⁸ N. (3) (a)(ii) Calculate the terminal velocity. (2)",
        steps: [
          "(a)(i) Terminal velocity means the forces balance — write the balance before any algebra: weight = upthrust + drag",
          "Weight: W = mg = 1.15 × 10⁻⁸ × 9.81 = 1.13 × 10⁻⁷ N",
          "So drag = W − U = 1.13 × 10⁻⁷ − 4.37 × 10⁻⁸ = 6.9 × 10⁻⁸ N ≈ 7 × 10⁻⁸ N — shown, with one more s.f. than the target",
          "(a)(ii) Stokes' law turns the drag into a speed: the radius is half the given diameter, r = 4.6 × 10⁻⁴ m; v = F/(6πηr) = 6.9 × 10⁻⁸ ÷ (6π × 1.41 × 10⁻³ × 4.6 × 10⁻⁴)",
        ],
        answer:
          "v = 5.7 × 10⁻³ m s⁻¹. The MS prints “[allow diameter for radius]” as a substitution concession — but the *answer* mark needs the radius. Half it, once, at the top.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2024 Q14(b) — does Stokes' law actually apply?",
        question:
          "A grain of sand falls through water at a measured terminal velocity of 0.050 m s⁻¹. Its weight is 4.3 × 10⁻⁵ N, the upthrust is 1.5 × 10⁻⁵ N, its radius is 0.75 mm and the viscosity of water is 1.2 × 10⁻³ Pa s. Deduce whether Stokes' law applies. (3)",
        steps: [
          "The question hands you two independent routes to the drag — use both and compare them",
          "Route 1 (Stokes' prediction): D = 6πηrv = 6π × 1.2 × 10⁻³ × 0.75 × 10⁻³ × 0.050 = 8.5 × 10⁻⁷ N",
          "Route 2 (the force balance at terminal velocity): D = W − U = 4.3 × 10⁻⁵ − 1.5 × 10⁻⁵ = 2.8 × 10⁻⁵ N",
          "The two disagree by a factor of about 33 — the gentle law and the real drag tell different stories",
        ],
        answer:
          "Stokes' law does not apply: 8.5 × 10⁻⁷ N ≪ 2.8 × 10⁻⁵ N. The grain is too large and too fast for laminar flow. The MS offers six alternative comparisons (velocities, radii, viscosities…) — but every route must end in an explicit ==comparison and a conclusion==, or the final mark dies.",
      },
      {
        k: "note",
        label: "Examiner's report — January 2024, Q15(a)",
        text: "“Many students did not realise that this investigation was using small ball-bearings, and stated that a small, spherical object was needed… This did not score a mark as the information was given in the question.” The companion rule, June 2022 Q19(b)(iii): if one condition is asked for, give one — “there is no advantage in a second, and a risk that if it is wrong it will negate the mark.” State the conditions that are ==missing== from the stem, and no more.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — why does drag grow as the ball speeds up, and what ends the growth?",
          "==Check yourself== — honey's viscosity is 10 Pa s and water's is 0.001. Same-size ball, same fluid: which falls faster, and which force in the balance changes to allow it?",
          "==Check yourself== — why does “the object must be laminar” score nothing, while “the flow must be laminar” scores?",
        ],
      },
    ],
  },
  {
    spec: "26",
    statement: "CORE PRACTICAL 2: Use a falling-ball method to determine the viscosity of a liquid",
    title: "Core Practical 2 — the falling-ball viscometer, as a designed experiment",
    blocks: [
      {
        k: "p",
        text: "The viscometer is not a list of steps — it is an ==argument==, and the argument starts from one sentence: ==the viscosity is the only unknown, so every other quantity in the force balance must be measured==. At terminal velocity the three forces on the ball satisfy weight = upthrust + drag. The weight needs the ball's mass (a balance, then W = mg). The upthrust needs the volume of displaced liquid — the ball's own volume, from its diameter (a calliper, then V = (4/3)πr³) and the liquid's density (given). That fixes the drag: ==drag = weight − upthrust==. And Stokes' law converts drag into viscosity: ==η = D/(6πrv)== — which needs the terminal velocity, measured by timing the fall between two marks.",
      },
      {
        k: "figure",
        kind: "ph-falling-ball",
        caption:
          "The falling-ball viscometer: a wide tube of liquid, rubber bands as timing marks, a ball released just below the surface, a stopwatch or light gates. Only the middle section — constant velocity — is timed.",
      },
      {
        k: "p",
        text: "Every design choice in the apparatus earns its place by closing one hole in that argument. The timing marks sit ==well below the surface== because the ball must already be at terminal velocity when timed — Stokes' law is applied with a ==constant== v, the v that makes the force balance true. The tube is ==wide== partly so wall effects (fluid dragged along by the walls) cannot disturb the flow near the ball, keeping it laminar. The fall between marks is made ==as long as the tube allows==, because a longer timed distance carries a smaller percentage timing uncertainty for the same reaction-time error. And the run is ==repeated and averaged==, with the ==temperature noted== — because η is temperature dependent, and a result without its temperature is a number without its address.",
      },
      {
        k: "steps",
        caption: "The measurement plan, mapped to the force balance",
        items: [
          {
            title: "Weight — the easy force",
            text: "Weigh the ball (or many identical balls) on a balance: W = mg. The MS also allows a balance “set to read newtons”. June 2025 Q16(a) asks exactly which measurement is needed for the viscosity: the answer is ==the mass of the ball-bearing== — radius, density and temperature are already given or irrelevant.",
          },
          {
            title: "Volume — for the upthrust",
            text: "A digital calliper measures the ==diameter==; the radius is yours to halve (“callipers cannot directly measure the radius of a sphere”, says the report). Then V = (4/3)πr³ and U = ρ_liquid V g — the displaced-fluid chain from statement 24. The report calls this link “the most common mark not awarded”: the upthrust comes from the ==displaced liquid==, not from the ball.",
          },
          {
            title: "Terminal velocity — the timed force",
            text: "Release below the surface, time between the marks, v = distance ÷ time; or log displacement continuously and take the ==gradient of the straight section== of the displacement–time graph (October 2023 Q18: candidates who “selected a point and divided displacement by time” lost the mark — the straight section's gradient IS the constant velocity).",
          },
          {
            title: "Assemble η",
            text: "D = W − U at terminal velocity, then η = D/(6πrv). Quote Pa s, quote the temperature, repeat and average.",
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
          "Terminal velocity is the ==gradient of the straight section== — the constant-velocity part of the fall. The MS example reads 11.5 cm in 0.55 s: v = 0.209 m s⁻¹",
          "At terminal velocity the force balance hands over the drag: D = W − U = 1.45 × 10⁻⁴ N",
          "η = D/(6πrv) = 1.45 × 10⁻⁴ ÷ (6π × 8.0 × 10⁻⁴ × 0.209)",
        ],
        answer:
          "η = 0.046 Pa s (printed tolerance 0.044–0.048). The report's headline for this question: “a surprisingly high proportion of candidates interpreted v in the equation as a volume” — the letters of a formula are quantities with units, and v is m s⁻¹.",
      },
      {
        k: "worked",
        title: "Past paper · WPH11 June 2025 Q16 — the examinable extras",
        question:
          "In a falling-ball experiment the ball falls 0.20 m at terminal velocity in 1.3 s; the viscous drag is 5.6 × 10⁻⁵ N and the ball's radius is 0.62 mm. (a) State one other measurement needed to determine the viscosity. (b) Calculate η. (3) (c) The oil is cooled; explain how the time to fall the same 0.20 m changes. (3)",
        steps: [
          "(a) Read the force balance: drag is given, so the missing force is the ==weight== — the mass of the ball-bearing",
          "(b) v = 0.20 ÷ 1.3 = 0.154 m s⁻¹; η = F/(6πrv) = 5.6 × 10⁻⁵ ÷ (6π × 0.62 × 10⁻³ × 0.154) = 0.031 Pa s",
          "(c) Cooling raises the oil's viscosity → more drag at any given speed → the balance (weight = upthrust + drag) is struck at a lower speed",
          "→ smaller terminal velocity → the same 0.20 m takes longer (MP3 depends on MP1 or MP2 — the chain is the answer)",
        ],
        answer:
          "η = 0.031 Pa s; the fall takes longer. The report on (b): candidates “used the diameter of the ball instead of the radius, so have ended up with an answer double what it should be” — radius/diameter is *the* materials slip of the unit, and it is a slip of reading, not of physics.",
      },
      {
        k: "p",
        text: "Two extensions complete the practical's exam wardrobe, and both are reasoning questions dressed as comparisons. **A bigger sphere in the same oil** (January 2025 Q20(b)(ii)): weight and upthrust grow with the sphere's ==volume== (∝ r³) while Stokes' drag grows only with its ==radius== (∝ r) — so the big sphere's weight outruns its drag for longer, and the balance is struck at a ==higher== terminal velocity: it falls faster, in less time. The report notes most candidates reasoned from drag alone and concluded the opposite; think in ==how the balance shifts==, not one force at a time. **Blood instead of glycerol** (June 2022 Q19(c)): blood's viscosity is lower, so less drag at the same speed, so a lower terminal velocity — and since Stokes' drag at a given v also shrinks with radius, a smaller ball reaches the same gentle speed: “a simple statement that the viscosity of blood is less than that of glycerol would have scored a mark.” When the question says ==explain==, the chain in words is the answer; save the calculator for ==calculate==.",
      },
      {
        k: "bullets",
        items: [
          "==Check yourself== — which measurement exists only to get the upthrust, and which only to get the drag?",
          "==Check yourself== — why must the timing marks be below the surface, in terms of what Stokes' law assumes?",
          "==Check yourself== — a larger ball falls faster in the same oil. Which grows faster with radius: the weight, or the Stokes drag — and by what powers?",
        ],
      },
    ],
  },
];
