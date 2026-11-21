import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part B — solids (statements 27–32)
   Part A's plain register: one bullet = one sentence that could
   earn a mark, no symbols-as-prose, no session citations, spread
   over short headed groups.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_B: SpecSection[] = [
  {
    spec: "27",
    statement:
      "be able to use the Hooke's law equation, ΔF = kΔx, where k is the stiffness of the object",
    title: "Hooke's law",
    blocks: [
      { k: "h", text: "The equation" },
      {
        k: "bullets",
        items: [
          "For a spring or wire stretched within its limit of proportionality, the change in force is proportional to the change in length (**ΔF = kΔx**).",
          "k is the stiffness of the object, measured in N m⁻¹.",
          "Use changes in force and length, not the total force and the total length.",
          "The new length of the spring is the original length plus the extension.",
        ],
      },
      { k: "h", text: "Stiffness from a graph" },
      {
        k: "bullets",
        items: [
          "On a force–extension graph, k is the gradient of the straight section.",
          "On a graph of length against force, the line does not pass through the origin. The equation of the line is F = k(L − L₀), and the gradient is still k.",
          "If a force–extension graph does not start at the origin, the wire was already taut, so use the changes ΔF and Δx.",
        ],
      },
      { k: "h", text: "Using the proportionality" },
      {
        k: "bullets",
        items: [
          "Extension is proportional to force, so doubling the force doubles the extension.",
          "A force 2F applied to a spring of stiffness 3k gives an extension of (2/3)Δx.",
          "With a spring of known stiffness, an unknown weight can be found from the extension it produces (**W = kΔx**).",
          "Several identical springs side by side share the force between them, so each one extends less than a single spring would.",
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
      { k: "h", text: "Definitions" },
      {
        k: "bullets",
        items: [
          "Tensile stress is the force per unit cross-sectional area (**σ = F/A**), measured in Pa, which is the same as N m⁻².",
          "Tensile strain is the extension divided by the original length (**ε = Δx/x**). Strain has no unit.",
          "The Young modulus is the ratio of stress to strain (**E = σ/ε**), measured in Pa.",
          "The same definitions apply to compression, where the length decreases.",
        ],
      },
      { k: "h", text: "What the Young modulus tells you" },
      {
        k: "bullets",
        items: [
          "The Young modulus is a property of the material, not of the shape of the sample.",
          "It measures the stiffness of the material: a material with a large Young modulus needs a large stress to produce even a small strain.",
          "It is not the breaking stress and it is not the density.",
        ],
      },
      { k: "h", text: "The Young modulus from graphs" },
      {
        k: "bullets",
        items: [
          "On a stress–strain graph, the Young modulus is the gradient of the initial straight section.",
          "On a force–extension graph, find the gradient and multiply by the original length divided by the cross-sectional area (**E = gradient × x/A**).",
          "Use most of the drawn line when taking a gradient, not two nearby points.",
        ],
      },
      { k: "h", text: "How the extension depends on the sample" },
      {
        k: "bullets",
        items: [
          "For the same material and the same force, the extension is proportional to the original length (**Δx = FL/(EA)**).",
          "The extension is inversely proportional to the cross-sectional area.",
          "The area is proportional to the square of the diameter, so halving the diameter multiplies the extension by four.",
          "A material with a larger Young modulus gives a smaller extension for the same stress.",
        ],
      },
      { k: "h", text: "Calculation steps" },
      {
        k: "bullets",
        items: [
          "For a circular wire the cross-sectional area is **A = πr²**, with r = d/2.",
          "Convert MPa to Pa by multiplying by 10⁶, and GPa to Pa by 10⁹.",
          "Strain from the Young modulus: ε = σ/E. The extension then follows from Δx = εx.",
          "For compression the length decreases, so subtract the change from the original length.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "Use the original length, not the new length, when calculating strain.",
          "Halve the diameter to get the radius, and square the radius to get the area.",
          "Check the prefixes: 110 MPa means 110 × 10⁶ Pa, not 110 Pa.",
        ],
      },
    ],
  },
  {
    spec: "29",
    statement:
      "a be able to draw and interpret force-extension and force-compression graphs b understand the terms limit of proportionality, elastic limit, yield point, elastic deformation and plastic deformation and be able to apply them to these graphs",
    title: "Force-extension graphs and the named terms",
    blocks: [
      {
        k: "def",
        term: "Limit of proportionality",
        text: "The ==limit== up to which force is proportional to extension. Below it the graph is a straight line through the origin. It is not the same point as the elastic limit.",
      },
      {
        k: "def",
        term: "Elastic limit",
        text: "The force beyond which the material ==does not return to its original length when the force is removed==. The phrase ==when the force is removed== must be included in the answer.",
      },
      {
        k: "def",
        term: "Yield point",
        text: "The point at which the material suddenly shows a ==large increase in extension==, and the extra strain is ==plastic==.",
      },
      {
        k: "def",
        term: "Elastic deformation",
        text: "The material ==returns to its original length== when the force is removed.",
      },
      {
        k: "def",
        term: "Plastic deformation",
        text: "The material is ==permanently deformed== and does not return to its original length when the force is removed.",
      },
      {
        k: "figure",
        kind: "ph-force-extension",
        caption:
          "A force–extension graph for a ductile wire, showing the limit of proportionality, the elastic limit, the yield point and fracture.",
      },
      { k: "h", text: "Applying the terms" },
      {
        k: "bullets",
        items: [
          "At the elastic limit itself the material is still behaving elastically. Plastic deformation starts beyond it.",
          "A spring stretched beyond its elastic limit keeps a permanent extension when the force is removed.",
          "A rubber band deformed elastically returns to zero extension when the force is removed.",
          "Limit of proportionality and elastic limit are two different points: the first is where the straight line ends, the second is where permanent deformation begins.",
        ],
      },
      { k: "h", text: "Areas under a force–extension graph" },
      {
        k: "bullets",
        items: [
          "The work done to stretch the material is the area under the loading curve.",
          "On a straight-line graph this area is the triangle **½FΔx**.",
          "On a curved graph the area is estimated by counting squares.",
          "When a material is loaded and then unloaded, the area of the loop between the two curves is the energy converted to heat.",
          "Convert the graph axes to SI units before estimating an area.",
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
          "A stress–strain graph for a ductile metal, with the linear section, the yield point and the breaking point.",
      },
      { k: "h", text: "Features of a stress–strain graph" },
      {
        k: "bullets",
        items: [
          "The initial straight section has a gradient equal to the Young modulus.",
          "The stress at the top of the initial straight section is the yield stress.",
          "The stress at the end of the line is the ==breaking stress==: the maximum stress the material can withstand before it fractures.",
          "The stress–strain graph depends only on the material, not on the size or shape of the sample.",
        ],
      },
      {
        k: "def",
        term: "Breaking stress",
        text: "The ==maximum stress a material can withstand before fracture==. It is a property of the material, so a thicker cable of the same steel breaks at a larger force but the same stress.",
      },
      { k: "h", text: "Comparing materials on the graph" },
      {
        k: "bullets",
        items: [
          "A steeper straight section means a larger Young modulus, so the material is stiffer.",
          "A material that extends a great deal before it breaks is ductile; a material that breaks at a small strain is brittle.",
          "To sketch a second material, draw a straight line from the origin with the correct gradient, ending at the correct breaking stress. Do not extend it far up the stress axis.",
        ],
      },
      { k: "h", text: "Energy from the graph" },
      {
        k: "bullets",
        items: [
          "The area under a stress–strain line is the energy stored ==per unit volume== of the sample.",
          "Multiplying this area by the volume of the sample gives the energy stored.",
          "This works because stress times strain is (F/A) × (Δx/x), which is FΔx divided by the volume.",
          "For two samples of the same size, the material with the larger area under its line stores more energy.",
        ],
      },
      { k: "h", text: "Using breaking stress" },
      {
        k: "bullets",
        items: [
          "The breaking force is the breaking stress times the cross-sectional area (**F = σA**).",
          "Changing the size of the sample does not change the breaking stress, only the breaking force.",
          "To check whether a component is safe, compare the working stress with the allowed fraction of the yield stress, then state the conclusion.",
          "To identify an unknown material, calculate the breaking stress and compare it with the values in a table.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "The Young modulus is the gradient of the graph, not the area under it.",
          "Keep the two definitions apart: the yield stress sits at the top of the straight section, the breaking stress at the end of the line.",
          "The area under a stress–strain graph is proportional to the energy stored; multiply by the volume to get the energy.",
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
          "The Young modulus apparatus: the test wire and an unloaded reference wire hang side by side, joined by a vernier scale.",
      },
      { k: "h", text: "The method" },
      {
        k: "bullets",
        items: [
          "Measure the original length of the wire from the clamp to the marker, with a metre rule.",
          "Load the wire with known masses; the force on the wire is the weight of the masses (**W = mg**).",
          "Measure the extension as the distance the marker moves, or as the new length minus the original length.",
          "Measure the diameter with a micrometer at several positions and in two directions, take an average, and find the cross-sectional area (**A = πr²**).",
          "Calculate the stress (F/A), the strain (Δx/x) and then the Young modulus (**E = σ/ε**).",
          "Alternatively plot force against extension and find the Young modulus from the gradient (**E = gradient × x/A**).",
          "Load and unload the wire in equal steps, and use only the straight section of the graph.",
        ],
      },
      { k: "h", text: "Why a long, thin wire is used" },
      {
        k: "bullets",
        items: [
          "The extension is proportional to the original length, so a long wire stretches more and the extension is easier to measure.",
          "The extension is inversely proportional to the cross-sectional area, so a thin wire stretches more.",
          "A larger extension carries a smaller percentage uncertainty, and a smaller load can be used.",
        ],
      },
      { k: "h", text: "Accuracy" },
      {
        k: "bullets",
        items: [
          "A vernier scale reads to 0.1 mm, which gives a smaller percentage uncertainty in the extension than a metre rule.",
          "Averaging several diameter readings reduces the uncertainty in the area.",
          "Take the gradient using most of the drawn line.",
        ],
      },
      { k: "h", text: "Safety" },
      {
        k: "bullets",
        items: [
          "Wear eye protection.",
          "A stretched wire stores elastic energy; if it snaps it whips back and can injure the face or eyes.",
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
      { k: "h", text: "The equations" },
      {
        k: "bullets",
        items: [
          "Elastic strain energy is the energy stored in a stretched material (**ΔEel = ½FΔx**).",
          "The half appears because the force starts at zero and rises steadily to F, so the average force during the stretch is ½F.",
          "This equation is only valid for a straight-line force–extension graph.",
          "With Hooke's law (**F = kΔx**) the energy can also be written as **½kΔx²**, or as **F²/2k**.",
          "The energy stored is therefore proportional to the square of the extension, and to the square of the force.",
          "To find an extension from the energy, rearrange to **Δx = 2Eel/F**.",
        ],
      },
      { k: "h", text: "Area under the graph" },
      {
        k: "bullets",
        items: [
          "The elastic strain energy equals the area under the force–extension graph.",
          "For a straight-line graph the area is the triangle ½FΔx.",
          "For a curved graph the area is estimated by counting squares.",
          "The increase in energy between two forces is the difference between the two triangle areas (**½F₂Δx₂ − ½F₁Δx₁**).",
          "It is wrong to use the change in force multiplied by the change in extension.",
        ],
      },
      { k: "h", text: "Loading and unloading" },
      {
        k: "bullets",
        items: [
          "When a material is loaded and unloaded, the area of the loop between the two curves is the energy converted to heat.",
          "The area under a stress–strain graph gives the energy per unit volume; multiply by the volume of the sample for the total energy.",
        ],
      },
      { k: "h", text: "Comparing energies" },
      {
        k: "bullets",
        items: [
          "To decide whether a rope or spring can absorb an energy, calculate the energy it can store and compare it with the energy that will be transferred to it.",
          "State the conclusion clearly: which energy is larger, and what that means for the situation.",
          "Springs side by side share the force, so each stores less than a single spring carrying the whole force.",
        ],
      },
      { k: "h", text: "Common mistakes" },
      {
        k: "bullets",
        items: [
          "Do not use ½FΔx on a curved force–extension graph.",
          "An increase in energy is the difference of two areas, not a change in force times a change in extension.",
          "Check the sanity of a result: an extension longer than the original sample, or a force far beyond the breaking stress, means something has gone wrong.",
        ],
      },
    ],
  },
];
