import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part A — fluids (statements 23–26)
   The formula-first register, approved in the draft review: the
   named equation is stated first in an equation band, then
   unpacked in a sentence; the working symbols (=, ×, >, <) sit
   inside the sentences; every force carries its owner and its
   direction; each situation is built up as its own short section,
   one logical step per bullet. Rejected wordings live in
   "Not accepted" notes. This supersedes the earlier plain-register
   version (no symbols-as-prose) at the owner's direction.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_A: SpecSection[] = [
  {
    spec: "23",
    statement: "be able to use the equation density ρ = m/V",
    title: "Density",
    blocks: [
      {
        k: "eq",
        eq: "ρ = m/V",
        note: "The density of a sample = the mass of the sample ÷ the volume of the sample.",
      },
      {
        k: "bullets",
        items: [
          "The unit of density is **kg m⁻³**.",
          "Density is a property of the **material**: the density does not change when the size or the shape of the sample changes.",
          "Stiffness is different: stiffness is a property of the **object**, so the stiffness of an object does change when the dimensions of the object change.",
          "Water has a density of 1000 kg m⁻³; convert g cm⁻³ to kg m⁻³ by multiplying by 1000.",
          "In multiple choice questions, check the ==units of every option==: the wrong options usually carry the wrong units.",
        ],
      },
      { k: "h", text: "Volumes you are asked for" },
      {
        k: "eq",
        eq: "V = (4/3)πr³",
        note: "The volume of a sphere = (4/3) × π × the radius cubed. Use the radius: if the question gives the diameter, halve it first (**r = d/2**).",
      },
      {
        k: "bullets",
        items: [
          "The volume of a cylinder = π × the radius squared × the length (**V = πr²L**).",
          "The volume of a rectangular block = length × width × height.",
          "If the question gives the **weight** W of the sample, find the mass first: **m = W/g**.",
          "For a floating object, the displaced volume = the ==submerged volume only==, not the whole volume of the object.",
        ],
      },
      { k: "h", text: "Conversions and flow" },
      {
        k: "bullets",
        items: [
          "Convert cm³ to m³ by dividing by 1 000 000; convert mm to m by dividing by 1 000.",
          "Volume per second = mass per second ÷ the density of the fluid.",
          "Volume per second also = the cross-sectional area × the speed of the flow (**Q = Av**).",
        ],
      },
    ],
  },
  {
    spec: "24",
    statement: "understand how to use the relationship upthrust = weight of fluid displaced",
    title: "Upthrust and flotation",
    blocks: [
      {
        k: "def",
        term: "Upthrust",
        text: "The upward force a fluid exerts on an object placed in the fluid. Upthrust is caused by the ==displacement of the fluid==: the upthrust on an object = the weight of the fluid the object displaces.",
      },
      {
        k: "eq",
        eq: "U = ρ~fluid~ × V~disp~ × g",
        note: "The weight of displaced fluid = the density of the fluid × the displaced volume × g. For a fully submerged object, the displaced volume = the whole volume of the object (**V~disp~ = V~object~**).",
      },
      { k: "h", text: "Floating" },
      {
        k: "bullets",
        items: [
          "A floating object is in equilibrium, so the resultant force on it = zero.",
          "For a floating object, the upthrust on the object = the weight of the object (**U = W**).",
          "A floating object therefore displaces a weight of fluid equal to its own weight.",
          "The fraction of a floating object that is submerged = the density of the object ÷ the density of the fluid.",
          "In a denser liquid, a smaller displaced volume is enough to balance the same weight, so the object floats higher.",
          "If the fluid is less dense, a floating object must displace a larger volume, so that the weight of the displaced fluid still = the weight of the object.",
          "A hollow object floats because its overall (average) density is less than the density of the liquid.",
        ],
      },
      { k: "h", text: "The free-body diagram of a floating object" },
      {
        k: "bullets",
        items: [
          "One upward arrow labelled upthrust (or U), one downward arrow labelled weight (or W or mg).",
          "Both arrows start from the same point on the object, and the two arrows are drawn the same length.",
          "Draw only the forces acting on the object: every extra force arrow loses one mark.",
          "The apparent weight of an object under water = the weight of the object − the upthrust on it (**W~app~ = W − U**).",
        ],
      },
      { k: "h", text: "An object lowered into a liquid standing on a balance" },
      {
        k: "bullets",
        items: [
          "The liquid exerts an upthrust on the object, upwards.",
          "By Newton's third law, the object exerts a force on the liquid that is equal in size and opposite in direction, downwards.",
          "That extra downward force on the liquid increases the reading on the balance.",
          "The increase in the balance reading = the weight of the displaced liquid.",
          "The mass of the displaced liquid = the increase in the balance reading; then **V = m ÷ ρ~liquid~**; then the mass of the object = **ρ~object~ × V**.",
          "If the water is replaced by a lower-density liquid, the upthrust on the object is less, so the downward force of the object on the liquid is less, so the increase in the balance reading is less. The second mark depends on the first.",
        ],
      },
      { k: "h", text: "A hydrometer" },
      {
        k: "bullets",
        items: [
          "A hydrometer floating in a liquid is in equilibrium, so the upthrust on it = its weight (**U = W**).",
          "The weight of the hydrometer is the same in every liquid.",
          "In a denser liquid, each unit of displaced volume provides a greater weight of displaced liquid, so a smaller displaced volume is enough: the hydrometer floats higher.",
        ],
      },
      { k: "h", text: "A submarine moving into less dense water" },
      {
        k: "bullets",
        items: [
          "A submarine underwater is in equilibrium: the upthrust of the seawater on the submarine = the weight of the submarine.",
          "When the submarine moves into less dense water, the upthrust on it decreases, while the weight of the submarine does not change.",
          "The resultant force on the submarine now acts downwards, so the submarine begins to sink.",
          "To hold its depth, the submarine must reduce its weight by pumping water out.",
        ],
      },
      { k: "h", text: "A submarine lifted from the water" },
      {
        k: "bullets",
        items: [
          "While the submarine is fully underwater, the tension in the crane cable = the weight of the submarine − the upthrust on it (**T = W − U**).",
          "As the submarine emerges from the water, the submerged volume decreases, so the upthrust on it decreases (**U = ρ~water~ × V~sub~ × g**).",
          "The weight of the submarine does not change.",
          "The tension in the cable therefore increases, until the submarine hangs clear of the water and the tension in the cable = the full weight of the submarine (**T = W**).",
        ],
      },
      { k: "h", text: "A Cartesian diver" },
      {
        k: "bullets",
        items: [
          "Squeezing the bottle raises the pressure of the water, which forces water into the diver, so the volume of the trapped air decreases.",
          "The diver now displaces less water, so the upthrust on the diver decreases.",
          "The weight of the diver does not change.",
          "When the weight of the diver > the upthrust on the diver, the resultant force on the diver acts downwards.",
          "The diver therefore accelerates downwards and sinks.",
        ],
      },
      { k: "h", text: "A Galilean thermometer" },
      {
        k: "bullets",
        items: [
          "When the temperature of the liquid rises, the liquid expands, so the density of the liquid falls.",
          "The upthrust on each bulb = the density of the liquid × the volume of the bulb × g, so the upthrust on each bulb falls.",
          "The weight of each bulb does not change.",
          "A bulb for which the weight of the bulb > the upthrust on the bulb now has a resultant force downwards, so that bulb sinks.",
        ],
      },
      { k: "h", text: "Ballast tanks" },
      {
        k: "bullets",
        items: [
          "Filling the ballast tanks increases the weight of the boat.",
          "The boat must displace more water so that the upthrust on it still = the weight of the boat (**U = W**), so the boat sits lower.",
          "The centre of gravity of the displaced water moves lower, which makes the boat more stable.",
        ],
      },
      { k: "h", text: "An iceberg" },
      {
        k: "bullets",
        items: [
          "An iceberg floats in equilibrium: the weight of the iceberg = the weight of the displaced seawater.",
          "So the submerged fraction of the iceberg = the density of ice ÷ the density of seawater.",
          "In less dense water, a greater volume must be displaced to balance the same weight, so the iceberg sits deeper.",
        ],
      },
      {
        k: "note",
        label: "Not accepted",
        text: "==Displaced==, not *replaced* — the mark schemes print the word *displaced*. And an object does not float *because the upthrust on it is greater than its weight*: upthrust greater than weight means the object is accelerating upwards. Floating means the two forces are equal.",
      },
    ],
  },
  {
    spec: "25",
    statement:
      "a be able to use the equation for viscous drag (Stokes' Law), F = 6πηrv. b understand that this equation applies only to small spherical objects moving at low speeds with laminar flow (or in the absence of turbulent flow) and that viscosity is temperature dependent",
    title: "Viscosity, Stokes' law and terminal velocity",
    blocks: [
      {
        k: "def",
        term: "Laminar flow",
        text: "Flow in which the layers of the fluid slide past each other ==without mixing==, and the velocity of the fluid at a fixed point stays constant. Laminar describes the ==flow of the fluid==, not the object.",
      },
      {
        k: "def",
        term: "Turbulent flow",
        text: "Flow in which the layers of the fluid mix and the flow is chaotic.",
      },
      {
        k: "def",
        term: "Viscosity",
        text: "A fluid's resistance to flow, measured in **Pa s**. As the temperature of a liquid increases, the viscosity of the liquid decreases; as the temperature decreases, the viscosity increases.",
      },
      {
        k: "bullets",
        items: [
          "A warmer liquid is less viscous, so the drag on a sphere at any given speed is smaller, so the forces balance at a higher speed: the terminal velocity is greater.",
          "When a liquid cools, the viscosity rises, so the terminal velocity falls and the fall takes longer.",
        ],
      },
      {
        k: "eq",
        eq: "D = 6πηrv",
        note: "Stokes' law: the viscous drag on a sphere = 6 × π × the viscosity of the fluid × the radius of the sphere × the speed of the sphere. The specification prints this drag as F; these notes call it D, so the force balances read W = U + D. The v is a ==velocity==, not a volume.",
      },
      { k: "h", text: "When Stokes' law applies" },
      {
        k: "bullets",
        items: [
          "Stokes' law applies only when all of these hold: the object is small, the object is spherical, the speed is low, and the flow is laminar (there is no turbulent flow).",
          "Stokes' law works at any viscosity; there is no low-viscosity condition.",
          "List questions often cap the answer at two conditions: the safest pair = ==a small spherical object==, and ==laminar flow== (or a low speed).",
          "When a question asks for “one other condition”, look at what the stem already gives and state a different one.",
          "Give only as many conditions as the question asks for: a wrong extra statement can lose the mark.",
        ],
      },
      {
        k: "note",
        label: "Not accepted",
        text: "“Small” on its own when the stem already states the sphere is small; “the flow around the sphere was turbulent” offered as a measurement error; “the densities used were incorrect”; “mass” written where the mark scheme wants the weight.",
      },
      {
        k: "def",
        term: "Terminal velocity",
        text: "The constant maximum velocity reached by an object falling through a fluid.",
      },
      { k: "h", text: "Sinking at terminal velocity" },
      {
        k: "bullets",
        items: [
          "Three forces act on a sphere sinking through a fluid: the weight of the sphere downwards, the upthrust of the fluid on the sphere upwards, and the drag of the fluid on the sphere upwards.",
          "A sinking object at terminal velocity has zero resultant force.",
          "The weight of the sphere downwards is balanced by the upthrust plus the drag upwards (**W = U + D**).",
          "The drag on the sphere is therefore the difference between the weight and the upthrust (**D = W − U**).",
          "To calculate the terminal velocity: **D = W − U** first, then **v = D ÷ (6πηr)**.",
        ],
      },
      { k: "h", text: "Reaching terminal velocity" },
      {
        k: "bullets",
        items: [
          "At the moment of release, the speed of the sphere is zero, so the drag on it is zero.",
          "At first the weight of the sphere is greater than the upthrust plus the drag, so the resultant force on the sphere acts downwards, and the sphere accelerates.",
          "As the speed of the sphere increases, the drag on it increases (**D = 6πηrv**), while the weight and the upthrust on it stay the same.",
          "The resultant force downwards becomes smaller, so the acceleration becomes smaller.",
          "The velocity stops changing when the drag has grown enough that the upthrust plus the drag = the weight (**U + D = W**).",
          "On a velocity-time graph, the gradient = the acceleration: the curve starts steep, becomes less steep as the drag builds up, and levels off horizontal at the terminal velocity.",
          "In a vacuum there is no drag and no upthrust on the object, so the resultant force on it = its weight, and the gradient of the velocity-time graph stays constant.",
        ],
      },
      { k: "h", text: "Deducing whether Stokes' law applies" },
      {
        k: "bullets",
        items: [
          "Calculate the real drag from the force balance: **D = W − U**, with **U = ρ~fluid~ × (4/3)πr³ × g**.",
          "Calculate the drag Stokes' law predicts at the measured speed: **D = 6πηrv**, with r = d/2.",
          "Compare the two values, then finish with a conclusion that follows from your numbers.",
          "The same method works in reverse: calculate the speed Stokes' law predicts and compare it with the measured speed.",
          "Every “deduce” and “assess” answer ends the same way: ==a comparison of two calculated values followed by a conclusion in words==.",
        ],
      },
      { k: "h", text: "Comparing spheres of different sizes" },
      {
        k: "bullets",
        items: [
          "The weight of a sphere is proportional to r³ and the upthrust on it is proportional to r³, because both depend on the volume.",
          "The drag on a sphere at a given speed is proportional to r only.",
          "The weight and the upthrust therefore grow faster than the drag as the sphere gets bigger, so the forces balance at a higher speed: a larger sphere falls faster.",
          "The terminal velocity of a sphere is proportional to the square of its radius.",
          "When terminal velocity is measured for spheres of different diameters, a graph of v against d² is a straight line through the origin.",
        ],
      },
      { k: "h", text: "Rising objects" },
      {
        k: "bullets",
        items: [
          "The drag on an object always acts in the direction opposite to its motion: downwards on a falling object, upwards on a rising object.",
          "A rising object at terminal velocity has zero resultant force: the upthrust on it = the weight of the object + the drag on it (**U = W + D**).",
          "The upthrust on a rising object is therefore greater than its weight.",
          "A rising bubble has the upthrust acting upwards and the drag acting downwards on it; the weight of the bubble is negligible.",
          "A rising bubble that grows: the upthrust on it grows with r³ while the drag on it grows with r, so the bubble speeds up.",
        ],
      },
      { k: "h", text: "A balloon rising through the atmosphere" },
      {
        k: "bullets",
        items: [
          "On the ground, the upthrust of the air on the balloon is greater than the weight of the balloon, so the resultant force on it acts upwards, and it accelerates.",
          "The balloon expands as it rises, until it reaches its full volume.",
          "Above that point, the volume of the balloon is fixed while the air gets less dense, so the upthrust on the balloon falls (**U = ρ~air~ × V × g**).",
          "When the upthrust on the balloon < the weight of the balloon, the resultant force on it acts downwards, so the balloon slows down.",
          "The balloon stops rising when the upthrust on it has fallen to equal its weight (**U = W**).",
        ],
      },
      { k: "h", text: "A sphere sinking into colder, deeper water" },
      {
        k: "bullets",
        items: [
          "Start: a sphere sinking through seawater at terminal velocity, so the weight of the sphere = the upthrust on it + the drag on it (**W = U + D**).",
          "Deeper water is colder, and the viscosity of water increases as its temperature falls, so the viscosity of the water around the sphere is greater.",
          "So the drag on the sphere at any given speed is larger: a larger η gives a larger D at the same v.",
          "Deeper water is also denser, so the upthrust on the sphere is larger: a larger ρ gives a larger U.",
          "The weight of the sphere does not change.",
          "At the old terminal velocity, the upthrust plus the drag on the sphere is now greater than the weight of the sphere, so the resultant force on the sphere acts upwards.",
          "The sphere slows down until the forces balance again, at a lower speed: the terminal velocity of the sphere is lower in the deeper water.",
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
        caption: "The falling-ball method for measuring the viscosity of a liquid.",
      },
      { k: "h", text: "The principle" },
      {
        k: "bullets",
        items: [
          "A small ball is released into a tall tube of liquid and falls until it reaches terminal velocity.",
          "At terminal velocity, the weight of the ball = the upthrust on it + the drag on it (**W = U + D**).",
          "The drag is given by Stokes' law (**D = 6πηrv**), so the viscosity follows from **η = (W − U) ÷ (6πrv)**.",
          "Each quantity on the right is measured in the experiment.",
          "The upthrust comes from the ==displaced liquid==, so use the density of the liquid, not the density of the ball.",
        ],
      },
      { k: "h", text: "The measurements" },
      {
        k: "bullets",
        items: [
          "The mass of the ball, to find its weight (**W = mg**).",
          "The diameter of the ball, with a micrometer, to find the radius and the volume (**V = (4/3)πr³**).",
          "The density of the liquid, to find the upthrust (**U = ρVg**).",
          "The time to fall between two fixed marks, to find the terminal velocity (**v = s/t**).",
          "The temperature of the liquid, because the viscosity depends on it.",
        ],
      },
      { k: "h", text: "The method" },
      {
        k: "bullets",
        items: [
          "Fill a tall measuring cylinder with the liquid and wrap two or more rubber bands around the cylinder to act as markers.",
          "The top marker sits far enough below the surface that the ball has already reached terminal velocity when the timing begins.",
          "Measure the distance between the markers with a metre rule, and the time between them with a stopwatch.",
          "Repeat the timing and use the mean.",
          "Alternative: time different distances and take the gradient of a distance-time graph.",
          "A data logger or motion sensor can record the fall automatically: on a displacement-time graph, the terminal velocity = ==the gradient of the straight section==, not a single point.",
        ],
      },
      { k: "h", text: "Design choices" },
      {
        k: "bullets",
        items: [
          "The tube is wide, so the flow around the ball stays laminar and the ball never falls near the walls.",
          "The fall is timed over a long distance, which reduces the percentage uncertainty in the velocity.",
        ],
      },
      { k: "h", text: "The free-body diagram of the falling ball" },
      {
        k: "bullets",
        items: [
          "Draw the weight of the ball downwards, the upthrust of the liquid on it upwards and the drag of the liquid on it upwards, all starting from the centre of the ball.",
          "The arrow for the weight is equal in length to the arrows for the upthrust and the drag combined.",
          "Label the forces clearly: W or mg for the weight, U for the upthrust.",
        ],
      },
      { k: "h", text: "Errors and validity" },
      {
        k: "bullets",
        items: [
          "A larger sphere has a greater terminal velocity, so the time between the markers is shorter; the stopwatch uncertainty stays the same, so the percentage uncertainty is greater.",
          "A measured viscosity lower than the accepted value can come from: the liquid being warmer than stated, the diameter measured too small, the time measured too short, or the marker distance measured too large.",
          "Keep the temperature of the liquid constant during the measurement, because the viscosity of a liquid depends on its temperature.",
        ],
      },
      {
        k: "note",
        label: "Not accepted",
        text: "“The flow around the sphere was turbulent”, “the densities used were incorrect”, “the temperature of the room”.",
      },
    ],
  },
];
