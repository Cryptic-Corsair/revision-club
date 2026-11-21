import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part A — fluids (statements 23–26)
   Mark-scheme-wise notes in the plain register: one bullet = one
   sentence that could earn a mark, cause before effect, no
   symbols-as-prose, no session citations, spread over short
   headed groups.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_A: SpecSection[] = [
  {
    spec: "23",
    statement: "be able to use the equation density ρ = m/V",
    title: "Density",
    blocks: [
      { k: "h", text: "Density" },
      {
        k: "bullets",
        items: [
          "Density is the mass per unit volume of a material (**ρ = m/V**).",
          "The unit of density is kg m⁻³.",
          "Water has a density of 1000 kg m⁻³.",
          "To convert from g cm⁻³ to kg m⁻³, multiply by 1000.",
        ],
      },
      { k: "h", text: "Using density in questions" },
      {
        k: "bullets",
        items: [
          "The mass of fluid displaced by an object is the density of the fluid times the volume displaced (**m = ρV**).",
          "The volume of a sphere is **(4/3)πr³**, where r is the radius of the sphere.",
          "The volume of a cylinder is **πr²L**.",
          "A cube of side L has volume L³, so its weight is **ρL³g**.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "Check whether the question gives the radius or the diameter. The radius is half the diameter.",
          "Convert cm³ to m³ by multiplying by 10⁻⁶.",
          "Do not calculate quantities the question did not ask for.",
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
        term: "Upthrust",
        text: "The upward force a fluid exerts on an object placed in it. The ==upthrust equals the weight of the fluid displaced== by the object.",
      },
      { k: "h", text: "Finding the upthrust" },
      {
        k: "bullets",
        items: [
          "The weight of displaced fluid is the density of the fluid times the displaced volume times g (**U = ρVg**).",
          "The displaced volume is the volume of the object that is below the surface of the fluid.",
        ],
      },
      { k: "h", text: "Floating" },
      {
        k: "bullets",
        items: [
          "A floating object is in equilibrium, so the resultant force on it is zero.",
          "For a floating object, the upthrust equals the weight of the object.",
          "A floating object therefore displaces a weight of fluid equal to its own weight.",
          "In a denser liquid a smaller volume has to be displaced to balance the same weight, so the object floats higher.",
        ],
      },
      { k: "h", text: "Sinking at terminal velocity" },
      {
        k: "bullets",
        items: [
          "A sinking object at terminal velocity has zero resultant force.",
          "The weight downwards is balanced by the upthrust and the drag upwards (**W = U + D**).",
          "The drag is therefore the difference between the weight and the upthrust (**D = W − U**).",
        ],
      },
      { k: "h", text: "Rising at terminal velocity" },
      {
        k: "bullets",
        items: [
          "A rising object meets drag acting downwards, in the same direction as its weight.",
          "At terminal velocity the upthrust balances the weight and the drag together (**U = W + D**).",
          "The upthrust on a rising object is therefore greater than its weight.",
        ],
      },
      { k: "h", text: "The same balance in other situations" },
      {
        k: "bullets",
        items: [
          "**A balloon** rises while the upthrust is greater than its weight. As it climbs, the air becomes less dense, so the upthrust falls. It stops rising when the upthrust has fallen below its weight.",
          "**A Cartesian diver** sinks because squeezing the bottle forces water into it, the trapped air becomes smaller, so the upthrust falls. The weight is then greater than the upthrust, so there is a resultant force downwards.",
          "**A submarine lifted from the sea** displaces less water as it emerges, so the upthrust falls and the tension in the cable rises until it equals the weight.",
          "**An iceberg** floats with its weight equal to the weight of the displaced seawater. In less dense water a greater volume must be displaced.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "Use the word ==displaced==, not replaced.",
          "Make clear whose weight you mean: the weight of the object, or the weight of the displaced fluid.",
          "An object does not float because the upthrust is greater than its weight. Upthrust greater than weight means the object is accelerating upwards. Floating means the two forces are equal.",
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
      { k: "h", text: "The equation" },
      {
        k: "bullets",
        items: [
          "Stokes' law gives the viscous drag on a small sphere moving slowly through a fluid (**F = 6πηrv**).",
          "η is the viscosity of the fluid, measured in Pa s.",
          "v is the velocity of the sphere and r is its radius.",
        ],
      },
      { k: "h", text: "Conditions for Stokes' law" },
      {
        k: "bullets",
        items: [
          "The object must be small and spherical.",
          "The object must move at low speed.",
          "The flow of the fluid must be laminar.",
        ],
      },
      {
        k: "def",
        term: "Laminar flow",
        text: "Flow in which the fluid moves in ==layers that do not mix==. Laminar flow is flow that is not turbulent.",
      },
      {
        k: "bullets",
        items: [
          "Laminar describes the flow of the fluid, not the object.",
          "Stokes' law works at any viscosity; there is no low-viscosity condition.",
        ],
      },
      { k: "h", text: "How a falling sphere reaches terminal velocity" },
      {
        k: "bullets",
        items: [
          "At first the weight is greater than the upthrust plus the drag, so there is a resultant force downwards.",
          "The sphere accelerates, so its speed increases.",
          "As the speed increases, the viscous drag increases.",
          "The upthrust stays constant, because it depends only on the displaced volume.",
          "Eventually the drag plus the upthrust equals the weight, so the resultant force is zero.",
          "The sphere then falls at a constant velocity, called the ==terminal velocity==.",
        ],
      },
      { k: "h", text: "Viscosity and temperature" },
      {
        k: "bullets",
        items: [
          "For a liquid, the viscosity decreases as the temperature increases.",
          "A less viscous liquid gives less drag at a given speed.",
          "With less drag, the forces balance at a higher speed, so the terminal velocity is greater.",
          "The ball therefore falls a given distance in less time.",
          "When a liquid cools the viscosity rises, so the terminal velocity falls and the fall takes longer.",
        ],
      },
      { k: "h", text: "A sphere sinking into colder, deeper water" },
      {
        k: "bullets",
        items: [
          "Deeper water is colder, so its viscosity is greater and the drag at any given speed is larger.",
          "Deeper water is also denser, so the upthrust is larger.",
          "The weight of the sphere does not change.",
          "The forces therefore balance at a lower speed, so the terminal velocity decreases as the sphere sinks.",
        ],
      },
      { k: "h", text: "Comparing spheres of different sizes" },
      {
        k: "bullets",
        items: [
          "The weight and the upthrust are both proportional to r³, because they depend on the volume.",
          "The viscous drag is proportional only to r.",
          "The weight and upthrust therefore grow faster than the drag as the sphere gets bigger.",
          "A larger sphere falls at a greater terminal velocity and takes less time to fall the same distance.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "The v in Stokes' law is a velocity, not a volume.",
          "Say that the sphere speeds up before you say that the drag increases.",
          "If the question already describes the objects as small spheres, do not repeat that as an answer.",
          "Give only as many conditions as the question asks for; a wrong extra statement can lose the mark.",
          "To test whether Stokes' law applies, compare the drag from F = 6πηrv with the weight minus the upthrust, then state a conclusion.",
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
      { k: "h", text: "The principle of the experiment" },
      {
        k: "bullets",
        items: [
          "A small ball is released into a tall tube of liquid and falls until it reaches terminal velocity.",
          "At terminal velocity the weight equals the upthrust plus the viscous drag (**W = U + D**).",
          "The drag is given by Stokes' law (**D = 6πηrv**), so the viscosity follows from **η = (W − U)/(6πrv)**.",
          "Each quantity on the right is measured in the experiment.",
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
      { k: "h", text: "Design choices" },
      {
        k: "bullets",
        items: [
          "The timing marks are well below the surface, so the ball has reached terminal velocity before the timing starts.",
          "The tube is wide, so the flow around the ball stays laminar.",
          "The fall is timed over a long distance, which reduces the percentage uncertainty in the velocity.",
          "The measurement is repeated and an average is taken.",
        ],
      },
      { k: "h", text: "Free-body diagram of the falling ball" },
      {
        k: "bullets",
        items: [
          "Draw weight downwards, upthrust upwards and drag upwards, all starting from the centre of the ball.",
          "The arrow for the weight is equal in length to the arrows for the upthrust and the drag combined.",
          "Label the forces clearly: W or mg for the weight and U for the upthrust.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "The upthrust comes from the displaced liquid, so use the density of the liquid, not of the ball.",
          "Halve the diameter to get the radius before finding the volume.",
          "Read the terminal velocity from the gradient of the straight part of a displacement–time graph, not from a single point.",
          "Convert mm and cm³ to SI units before substituting into the equations.",
        ],
      },
    ],
  },
];
