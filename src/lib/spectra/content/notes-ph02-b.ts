import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Topic 2 Materials · Part B — solids (statements 27–32)
   Part A's formula-first register: the named equation stated
   first in an equation band, then unpacked in a sentence; the
   working symbols (=, ×, >, <) inside the sentences; every force
   named with its owner; each situation built up one logical step
   per bullet; rejected wordings in "Not accepted" notes. Closes
   with the marking rules that never change, after the same
   pattern as Topic 1.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_PH02_B: SpecSection[] = [
  {
    spec: "27",
    statement:
      "be able to use the Hooke's law equation, ΔF = kΔx, where k is the stiffness of the object",
    title: "Hooke's law and stiffness",
    blocks: [
      {
        k: "eq",
        eq: "ΔF = kΔx",
        note: "Hooke's law: the change in the force on a spring = the stiffness of the spring × the change in its extension. Use changes in force and length, not the total force and the total length.",
      },
      {
        k: "bullets",
        items: [
          "The symbol k = the ==stiffness constant== of the object, also called the spring constant. The unit of stiffness is **N m⁻¹** (or N cm⁻¹ when the lengths are in cm).",
          "k is a property of the **object**: the same metal made into a longer or thicker wire has a different stiffness.",
          "The Young modulus is a property of the **material**, so it does not change with the dimensions of the sample.",
          "The extension of a spring = the new length − the original length. Use the difference, never the final length on its own.",
          "With two loads on one spring, the stiffness = the change in the force ÷ the change in the extension, using the differences between the two states.",
          "Two-step spring problems use **F = kΔx** twice: first find k from a known load and its extension, then apply that k to the new load.",
        ],
      },
      { k: "h", text: "Stiffness from a graph" },
      {
        k: "bullets",
        items: [
          "On a force-extension graph, the stiffness = the gradient of the straight section.",
          "On a graph of length against force, the line does not pass through the origin: the equation of the line is **F = k(L − L₀)**, and the gradient is still k.",
          "If a force-extension graph does not start at the origin, the wire was already taut, so use the changes ΔF and Δx.",
          "On a curved force-extension graph, the stiffness at a point = the gradient of the tangent at that point.",
          "Extension is proportional to force, so doubling the force doubles the extension.",
        ],
      },
      { k: "h", text: "Springs in series and in parallel" },
      {
        k: "bullets",
        items: [
          "Springs in series: the same force passes through each spring, and the extensions add. Two identical springs in series have a combined stiffness of **k/2**.",
          "Springs in parallel: each spring extends by the same amount and the springs share the load; the spring constants add. Two identical springs in parallel have a combined stiffness of **2k**.",
          "A load resting on four identical corner springs puts **W/4** on each spring.",
        ],
      },
      { k: "h", text: "A wire's stiffness from its material" },
      {
        k: "eq",
        eq: "k = EA/x",
        note: "The stiffness of a wire = the Young modulus of the material × the cross-sectional area ÷ the original length. A longer wire has a smaller stiffness, because the extension at a given force is proportional to the length.",
      },
      {
        k: "bullets",
        items: [
          "Hooke's law holds only up to the ==limit of proportionality==: beyond it, the force is no longer proportional to the extension, and the law no longer applies.",
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
      {
        k: "eq",
        eq: "σ = F/A        ε = Δx/x        E = σ/ε",
        note: "The stress on a sample = the force ÷ the cross-sectional area; the strain of a sample = the change in length ÷ the original length; the Young modulus = the stress ÷ the strain.",
      },
      {
        k: "bullets",
        items: [
          "The unit of stress = the pascal (Pa) = **N m⁻²**; the unit of the Young modulus = Pa. The same definitions apply to compression, where the length decreases.",
          "Strain has ==no unit==; a percentage is accepted.",
          "The Young modulus is a property of the **material alone**: it is the same for a short wire and a long wire of the same material.",
          "Units to keep straight: density kg m⁻³; stress and Young modulus Pa (N m⁻²); stiffness N m⁻¹; viscosity Pa s; strain no unit.",
          "Convert MPa to Pa by multiplying by 10⁶, and GPa to Pa by multiplying by 10⁹.",
          "In compression, the length decreases, so the change in length = the original length − the final length; in tension, it = the final length − the original length.",
          "A missing or wrong unit normally loses the final calculation mark.",
        ],
      },
      {
        k: "steps",
        caption: "The usual calculation route",
        items: [
          {
            title: "Area",
            text: "A = πr², with r = d/2 — halve the diameter before squaring.",
          },
          {
            title: "Stress",
            text: "σ = F/A, with the force in newtons and the area in square metres.",
          },
          {
            title: "Strain",
            text: "ε = Δx/x, using the original length, never the new length.",
          },
          {
            title: "Young modulus",
            text: "E = σ/ε. Each step earns its own mark.",
          },
        ],
      },
      { k: "h", text: "The Young modulus from graphs" },
      {
        k: "bullets",
        items: [
          "From a stress-strain graph, the Young modulus = the gradient of the initial straight section; draw a large triangle covering ==more than half of the line==.",
          "From a force-extension graph, the gradient is k, and the Young modulus = the gradient × the original length ÷ the area.",
          "From a graph of added mass against extension, the gradient is in kg m⁻¹, so multiply it by g before multiplying by the length ÷ the area.",
        ],
      },
      { k: "h", text: "How the extension depends on the sample" },
      {
        k: "eq",
        eq: "Δx = FL/(EA)",
        note: "The extension of a wire under a force: longer and thinner gives a larger extension; shorter and thicker gives a smaller extension; E does not change.",
      },
      {
        k: "bullets",
        items: [
          "Two wires of the same material under the same force: doubling the cross-sectional area halves the extension; doubling the original length doubles the extension.",
          "The area is proportional to the square of the diameter, so halving the diameter multiplies the extension by four.",
          "A material with a larger Young modulus gives a smaller extension for the same stress.",
          "Strain from the Young modulus: **ε = σ/E**. The extension then follows from **Δx = εx**.",
        ],
      },
      { k: "h", text: "Measuring the wire" },
      {
        k: "bullets",
        items: [
          "Measure the diameter with a ==micrometer screw gauge== (or digital callipers), at several positions along the wire and in several orientations, then average before computing the area.",
          "A vernier scale has a better resolution (0.1 mm) than a millimetre rule, so the percentage uncertainty in the reading is smaller.",
          "Reduce parallax: place the rule against the wire, use a set square between the rule and the wire, and read at right angles to the scale.",
        ],
      },
    ],
  },
  {
    spec: "29",
    statement:
      "a be able to draw and interpret force-extension and force-compression graphs b understand the terms limit of proportionality, elastic limit, yield point, elastic deformation and plastic deformation and be able to apply them to these graphs",
    title: "Force-extension graphs and deformation",
    blocks: [
      {
        k: "figure",
        kind: "ph-force-extension",
        caption:
          "A force-extension graph for a ductile wire, showing the limit of proportionality, the elastic limit, the yield point and fracture.",
      },
      {
        k: "def",
        term: "Limit of proportionality",
        text: "The point beyond which the force is no longer proportional to the extension — the end of the straight-line section. ==It is not the same point as the elastic limit==.",
      },
      {
        k: "def",
        term: "Elastic limit",
        text: "The greatest force or stress up to which the object ==returns to its original length when the load is removed==. The phrase *when the load is removed* must be included in the answer. Beyond it, the deformation is permanent.",
      },
      {
        k: "def",
        term: "Yield point",
        text: "The point at which the material begins to undergo ==sudden or large plastic deformation==; on the graph, it is where the curve flattens while the strain keeps increasing.",
      },
      {
        k: "def",
        term: "Elastic deformation",
        text: "The object returns to its original size, shape and length when the force is removed.",
      },
      {
        k: "def",
        term: "Plastic deformation",
        text: "The object is ==permanently deformed== and does not return to its original length when the force is removed.",
      },
      {
        k: "bullets",
        items: [
          "The three named points are different, and they come in this order: ==limit of proportionality first, then elastic limit, then yield point==.",
          "At the elastic limit itself the material is still behaving elastically; plastic deformation starts beyond it.",
          "A spring stretched beyond its elastic limit keeps a permanent extension when the force is removed.",
          "A rubber band deformed elastically returns to zero extension when the force is removed.",
        ],
      },
      { k: "h", text: "Areas under a force-extension graph" },
      {
        k: "bullets",
        items: [
          "The work done stretching a sample = the area under the force-extension graph, and that area = the elastic strain energy stored.",
          "Loading and unloading curves drawn with different gradients mean the ==stiffness of the object== has changed.",
          "The area between the loading and unloading lines = the energy dissipated (the hysteresis loss, for example in a rubber band).",
          "If the original length was forgotten when plotting, the graph keeps the same shape but starts at a positive extension.",
          "On a force-length graph, convert to extension before using it: for a force rising from zero to R while the length goes from p to q, the work done = ½ × R × (q − p).",
          "Convert the graph axes to SI units before estimating an area.",
        ],
      },
      {
        k: "note",
        label: "Not accepted",
        text: "“A greater Young modulus” as the reason for a changed gradient: the Young modulus belongs to the ==material== and has not changed.",
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
          "A stress-strain graph for a ductile metal, with the linear section, the yield point and the breaking point.",
      },
      {
        k: "def",
        term: "Breaking stress",
        text: "The ==maximum stress a material can carry before it fractures== — also called the ultimate tensile stress or ultimate tensile strength. It is a property of the material, so a thicker cable of the same steel breaks at a larger force but the same stress.",
      },
      {
        k: "bullets",
        items: [
          "The gradient of the initial straight section of a stress-strain graph = the Young modulus; a steeper initial gradient means a stiffer material with a larger E.",
          "The stress-strain graph depends only on the material, not on the size or the shape of the sample.",
          "The area under a stress-strain graph = the work done ==per unit volume==, not the work done; the energy = the area × the volume of the sample.",
          "A large plastic region means the material is ==ductile==; a graph that fractures soon after the linear section, with little plastic deformation, means the material is ==brittle==.",
          "Compare-and-contrast marks come from: the initial gradient, the way the gradient changes, the breaking stress, the breaking strain, and the area under the graph.",
          "Concrete is stronger in compression than in tension: quote the two breaking stresses from the graph and compare them.",
        ],
      },
      { k: "h", text: "Using the breaking stress" },
      {
        k: "bullets",
        items: [
          "The force at fracture = the breaking stress × the cross-sectional area (**F = σ~break~ × A**).",
          "Reading a stress off the graph first and then multiplying by the area is the expected route for fracture-force questions.",
          "To sketch a second material, draw a straight line from the origin with the correct gradient, ending at the correct breaking stress; do not extend it far up the stress axis.",
          "To check whether a component is safe, compare the working stress with the allowed fraction of the yield stress, then state the conclusion.",
          "When processing changes a material (for example concrete drying, which increases its Young modulus), calculate the Young modulus from the gradient of each linear region, then compare the two values as a ratio.",
        ],
      },
      {
        k: "note",
        label: "Not accepted",
        text: "The Young modulus is the ==gradient== of the graph, not the area under it; and keep the two definitions apart — the yield stress sits at the top of the straight section, the breaking stress at the end of the line.",
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
          "Measure the original length of the wire with a metre rule, from the clamp to the marker.",
          "Hang a small mass on the wire first, so the wire is straight and taut before the original length is measured.",
          "Measure the diameter with a micrometer screw gauge (or digital callipers), at several positions along the wire and in several orientations, then use the mean.",
          "Add masses in steps; after each addition, read the marker position: the extension = the new length − the original length.",
          "Load and unload the wire in equal steps, and use only the straight section of the graph.",
          "Wear safety goggles: the wire could snap.",
          "Plot force against extension, or convert the readings to stress and strain and plot stress against strain.",
        ],
      },
      {
        k: "note",
        label: "Not accepted",
        text: "Writing “measure the extension” as a method point scores nothing: you measure the ==initial length and the extended length and subtract==.",
      },
      { k: "h", text: "The analysis" },
      {
        k: "bullets",
        items: [
          "The Young modulus = the gradient of the linear section of the graph; use a large triangle covering more than half of the drawn line.",
          "From a force-extension graph: the Young modulus = the gradient × the original length ÷ the area.",
          "From a graph of added mass against extension: the Young modulus = the gradient × g × the original length ÷ the area.",
          "The cross-sectional area: **A = πr² = πd²/4**. Average the diameter readings before squaring.",
        ],
      },
      { k: "h", text: "Why a long, thin wire" },
      {
        k: "bullets",
        items: [
          "The extension is proportional to the original length, so a long wire stretches more and the extension is easier to measure.",
          "The extension is inversely proportional to the cross-sectional area, so a thin wire stretches more.",
          "A larger extension carries a smaller percentage uncertainty, and a smaller load can be used.",
          "A shorter wire gives a steeper force-extension graph, but the calculated Young modulus is the same, because E is a property of the material.",
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
      {
        k: "eq",
        eq: "ΔE~el~ = ½FΔx",
        note: "The elastic strain energy stored in a sample = ½ × the final force × the extension. The half appears because the force starts at zero and rises steadily to F, so the average force during the stretch is ½F.",
      },
      {
        k: "bullets",
        items: [
          "This equation is only valid for a ==straight-line force-extension graph==.",
          "With Hooke's law (**F = kΔx**), the energy can also be written as **½kΔx²**, or as **F²/2k**.",
          "The energy stored is therefore proportional to the square of the extension, and to the square of the force.",
          "To find an extension from the energy, rearrange to **Δx = 2E~el~ ÷ F**.",
        ],
      },
      { k: "h", text: "Area under the graph" },
      {
        k: "bullets",
        items: [
          "The elastic strain energy = the area under the force-extension graph.",
          "For a straight-line graph, the area is the triangle ½FΔx.",
          "The change in energy between two loads = the trapezium area: ½ × (the sum of the two forces) × the change in extension.",
          "It is wrong to use the change in force multiplied by the change in extension.",
          "For a curved graph, estimate the area by counting squares, or by splitting it into rectangles and triangles.",
        ],
      },
      { k: "h", text: "Energy transfers" },
      {
        k: "bullets",
        items: [
          "When a spring launches an object, the elastic strain energy stored in the spring becomes the kinetic energy of the object.",
          "When the object also changes height, include the work done by gravity: the elastic strain energy = the kinetic energy gained + the gravitational potential energy gained (**ΔE~el~ = ΔE~k~ + ΔE~grav~**).",
          "The energy stored in a compressed spring can be greater than the work done by the person compressing it, because gravity has also done work on it during the compression.",
          "Springs in parallel share the force, so each stores less energy than a single spring carrying the whole force.",
          "Some questions compare the gravitational potential energy lost with the elastic strain energy stored: calculate both, compare the values, and give a conclusion.",
          "Check the sanity of a result: an extension longer than the original sample, or a force far beyond the breaking stress, means something has gone wrong.",
        ],
      },
      { k: "h", text: "The marking rules that never change" },
      {
        k: "p",
        text: "These are the standing rules printed in every WPH11 mark scheme. They apply to every calculation and every explanation in this unit, so they are worth more marks per minute of revision than any single topic point.",
      },
      {
        k: "bullets",
        items: [
          "A line beginning “Use of” earns the substitution mark for that equation, even when the final value is wrong.",
          "Every mark point ends with its own (1); the last mark of a calculation is usually the final answer with the correct unit.",
          "Error carried forward: a wrong value from an earlier part, used correctly later, still earns the later marks.",
          "Some final marks are dependent marks: they only score if an earlier point has been made.",
          "“Or” joins alternatives for the same single mark: any one of the printed wordings scores.",
          "Deduce and assess questions: calculate, compare with the given value, then state a conclusion that follows from your own numbers. An inconsistent conclusion loses the last mark.",
          "“Show that” answers need one more significant figure than the printed value; reverse working on a three-mark show-that keeps only two marks.",
          "Use **g = 9.81**; using 10 costs one mark, once per paper; 9.8 is accepted.",
          "Graph-read answers come with printed tolerance ranges; the graph mark usually depends on the reading being taken first.",
          "Six-mark starred questions award four marks for content and two for structure: write linked full sentences in a logical order, and include the named required points.",
          "Multiple choice: every wrong option has a printed physics reason; learn the reasons, because the same misconceptions are recycled as distractors every series.",
        ],
      },
    ],
  },
];
