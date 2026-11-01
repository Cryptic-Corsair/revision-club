import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 2 revision note · sections 2.1 – 2.9
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 2
   revision note (2021, semester 1); page furniture omitted.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_A: SpecSection[] = [
  {
    spec: "2.1",
    statement: "know the structure of an atom in terms of electrons, protons and neutrons",
    title: "Inside the atom",
    blocks: [
      {
        k: "p",
        text: "Our current understanding of the structure of atoms is influenced by the theories put forward by scientists such as **J.J Thomson** (discovered electrons in 1897), **Ernest Rutherford** (discovered proton in 1917) and **James Chadwick** (discovered the neutron in 1932).",
      },
      { k: "h", text: "Structure of an atom" },
      {
        k: "bullets",
        items: [
          "An atom is the smallest, ==electrically neutral== particle of an element that can take part in a chemical change.",
          "An atom comprises of subatomic particles **protons, neutrons and electrons**.",
          "Protons and neutrons, together known as **nucleons**, are found in the **nucleus** which is the center of the atom.",
          "Electrons exist in energy levels surrounding the nuclei. The energy levels are called **quantum shells**.",
          "An atom gets its chemical properties from the **number of electrons and arrangement of electrons** in the atom.",
        ],
      },
      { k: "figure", kind: "atom", caption: "The nucleus (protons + neutrons) sits at the center; electrons occupy the quantum shells around it." },
      {
        k: "flip",
        title: "Say it, then flip",
        hint: "Answer out loud first — the flip is only for checking.",
        cards: [
          { front: "Who discovered the electron — and when?", back: "**J.J Thomson**, in **1897**." },
          { front: "Protons and neutrons are together known as…", back: "**Nucleons** — found in the nucleus, the center of the atom." },
          { front: "Where does an atom get its chemical properties from?", back: "From the **number of electrons** and **arrangement of electrons** in the atom." },
        ],
      },
    ],
  },
  {
    spec: "2.2",
    statement: "know the relative mass and charge of protons, neutrons and electrons",
    title: "The particle line-up",
    blocks: [
      {
        k: "table",
        caption: "The structure of the atom in terms of the three sub atomic particles",
        head: ["Particle", "Symbol", "Charge / C", "Relative charge", "Mass / g", "Relative mass"],
        rows: [
          ["Proton", "p", "+1.60 × 10^−19^", "+1", "1.67 × 10^−24^", "1"],
          ["Neutron", "n", "0", "0", "1.67 × 10^−24^", "1"],
          ["Electron", "e^−^", "−1.60 × 10^−19^", "−1", "9.11 × 10^−28^", "1 / 1840"],
        ],
      },
      {
        k: "p",
        text: "The mass of electrons are ==negligible==, hence the mass of the atoms are determined by the mass of **nucleons**.",
      },
      {
        k: "cloze",
        title: "Recall jolt",
        hint: "Tap the dashed chips only after you have said the missing bit out loud.",
        items: [
          "A proton carries a charge of ==+1.60 × 10^−19^ C== and a relative charge of ==+1==.",
          "The neutron is the only one of the three with ==no charge at all==.",
          "The electron's relative mass is ==1/1840== — effectively ==negligible== next to a nucleon.",
        ],
      },
      {
        k: "quiz",
        title: "Quick-fire",
        qs: [
          {
            q: "Which two particles make up almost all of an atom's mass?",
            a: "The **nucleons** — protons and neutrons, 1.67 × 10^−24^ g each. The electron's 9.11 × 10^−28^ g barely registers.",
          },
          {
            q: "Protons and electrons carry equal but opposite relative charges (+1 and −1). So why is an atom neutral?",
            a: "Because a neutral atom contains ==equal numbers== of protons and electrons — the charges cancel exactly.",
          },
        ],
      },
    ],
  },
  {
    spec: "2.3",
    statement: "know what is meant by the terms ‘atomic (proton) number’ and ‘mass number’",
    title: "The atom's ID numbers",
    blocks: [
      { k: "p", text: "Every atom carries two ID numbers, written beside its symbol:" },
      { k: "figure", kind: "notation", caption: "Mass number on top, atomic number underneath — here for carbon-12." },
      {
        k: "def",
        term: "Atomic (proton) number, Z",
        text: "The number of ==protons== in the nucleus. The Periodic Table is arranged in order of it — and it is what makes an element that element.",
      },
      {
        k: "def",
        term: "Mass number, A",
        text: "The total number of ==protons and neutrons== (the nucleons) in the nucleus.",
      },
      { k: "eq", eq: "number of neutrons = A − Z        protons = Z        electrons = Z − charge", note: "The two ID numbers unlock every particle count — that is exactly what Exercise 1 makes you practise." },
      {
        k: "cloze",
        title: "Recall jolt",
        items: [
          "The ==atomic (proton) number== counts the ==protons==; the ==mass number== counts the ==protons and neutrons==.",
          "Subtract the two ID numbers and you are left with the ==neutrons==.",
        ],
      },
    ],
  },
  {
    spec: "2.4",
    statement:
      "be able to use the atomic number and the mass number to determine the number of each type of subatomic particle in an atom or ion",
    title: "Particle arithmetic",
    blocks: [
      {
        k: "bullets",
        items: [
          "**Protons** = atomic number, Z",
          "**Neutrons** = mass number − atomic number (A − Z)",
          "**Electrons** = protons − charge — for a neutral atom, electrons = protons",
          "A **positive ion** has *lost* electrons; a **negative ion** has *gained* them. The nucleus never changes.",
        ],
      },
      {
        k: "exercise",
        label: "Exercise 1",
        title: "Complete the following table",
        note: "Tap a dashed chip only when you have worked the cell out. Every answer is two lines of arithmetic: n = A − Z and e = protons − charge.",
        body: {
          kind: "particles",
          head: ["", "Protons", "Neutrons", "Electrons", "Charge", "Atomic No.", "Mass No.", "Symbol"],
          rows: [
            { row: "A", given: ["19", "21", "19", null, null, null, null], answers: ["Neutral", "19", "40", "^40^^19^K"] },
            { row: "B", given: ["20", null, null, "Neutral", null, "40", null], answers: ["20", "20", "20", "^40^^20^Ca"] },
            { row: "C", given: [null, null, null, "+", "11", "23", null], answers: ["11", "12", "10", "^23^^11^Na^+^"] },
            { row: "D", given: ["6", "6", null, "Neutral", null, null, null], answers: ["6", "6", "12", "^12^^6^C"] },
            { row: "E", given: ["92", null, null, "Neutral", null, "235", null], answers: ["143", "92", "92", "^235^^92^U"] },
            { row: "F", given: ["6", null, "6", null, null, "13", null], answers: ["7", "Neutral", "6", "^13^^6^C"] },
            { row: "G", given: [null, "16", null, "2−", "16", null, null], answers: ["16", "18", "32", "^32^^16^S^2−^"] },
            { row: "H", given: [null, null, null, null, null, null, "^27^^13^Al^3+^"], answers: ["13", "14", "10", "3+"] },
          ],
        },
      },
      { k: "checkpoint", page: 43 },
    ],
  },
  {
    spec: "2.5",
    statement: "understand the term ‘isotope’",
    title: "Same element, different weight",
    blocks: [
      {
        k: "def",
        term: "Isotopes",
        text: "Isotopes are atoms of the ==same element== having the ==same number of protons== but ==different number of neutrons==.",
      },
      {
        k: "p",
        text: "*Example:* Carbon has three isotopes, ^12^C, ^13^C and ^14^C. They all have the same number of protons but different number of neutrons.",
      },
      {
        k: "table",
        head: ["", "Protons", "Neutrons", "Mass number"],
        rows: [
          ["Carbon − 12", "6", "6", "12"],
          ["Carbon − 13", "6", "7", "13"],
          ["Carbon − 14", "6", "8", "14"],
        ],
      },
      {
        k: "bullets",
        items: [
          "Isotopes always have the **same chemical properties** because the **number of electrons is the same**.",
          "They have slightly different **physical properties** as they have different number of neutrons. *Example:* Isotopes with fewer neutrons will have lower masses, lower densities, faster rate of diffusion, lower melting and boiling points.",
          "Relative atomic masses measured by chemical methods rarely produce whole numbers. This is because isotopes of the same element exist in different proportions in nature.",
        ],
      },
      {
        k: "cloze",
        title: "Recall jolt",
        items: [
          "Isotopes always have the ==same chemical properties== because the ==number of electrons is the same==.",
          "Isotopes with fewer neutrons have ==lower masses, lower densities, faster rate of diffusion, lower melting and boiling points==.",
        ],
      },
      {
        k: "quiz",
        title: "Quick-fire",
        qs: [
          {
            q: "^14^C has 8 neutrons. How many protons and electrons does a neutral atom have?",
            a: "**6 protons** — every carbon isotope has Z = 6 — and **6 electrons**. Only the neutron count (8) separates it from carbon-12.",
          },
          {
            q: "Why do chemically-measured relative atomic masses rarely come out as whole numbers?",
            a: "Because isotopes of the same element exist in ==different proportions in nature== — you are weighing a mixture, not one isotope.",
          },
        ],
      },
    ],
  },
  {
    spec: "2.6",
    statement:
      "understand the basic principles of a mass spectrometer and be able to analyse and interpret mass spectra to: i deduce the isotopic composition of a sample of an element ii calculate the relative atomic mass of an element from relative abundances of isotopes and vice versa iii determine the relative molecular mass of a molecule, and hence identify molecules in a sample iv understand that ions in a mass spectrometer may have a 2+ charge",
    title: "Weighing the invisible",
    blocks: [
      { k: "h", text: "Relative masses of elements or compounds" },
      {
        k: "bullets",
        items: [
          "Measuring the mass of an atom or compound using a balance would be very difficult as they are very small.",
          "Hence, to measure the mass of an atom or a compound the *atomic mass unit* (amu) is used as a standard reference.",
          "The relative atomic mass does not have any units. They are measured compare to amu.",
        ],
      },
      {
        k: "def",
        term: "Atomic mass unit",
        text: "The mass of a ==carbon-12 atom divided by 12==. This is used as the standard reference scale to measure mass of atoms and molecules.",
      },
      {
        k: "def",
        term: "Relative atomic mass",
        text: "The ==weighted average mass of an atom== of that element divided by 1/12^th^ the mass of a carbon-12 atom.",
      },
      {
        k: "def",
        term: "Relative molecular mass",
        text: "The ==sum of the relative atomic masses== of all the atoms in the chemical formula.",
      },
      {
        k: "def",
        term: "Relative isotopic mass",
        text: "The mass of ==an atom of that isotope== divided by 1/12^th^ the mass of a carbon-12 atom.",
      },
      { k: "h", text: "Using data obtained from a mass spectrometer — what is a mass spectrometer?" },
      {
        k: "bullets",
        items: [
          "A mass spectrometer is an instrument that was invented by **F.W. Aston in 1919**. It can be used to find the relative masses of isotopes of atoms, molecules or fragments of molecules. This gave chemists an accurate method of comparing the relative masses of atoms and molecules. And to find the relative abundance of the isotopes in a sample of an element.",
          "The mass spectrometer consists of an **ion source**, an **analyser** and a **detector**.",
          "Inside the spectrometer there is a **high vacuum** which allows ionized atoms and molecules from the chemical being tested to be studied without interference from atoms and molecules in the air.",
          "Mass spectrometry can be used for:",
        ],
      },
      {
        k: "bullets",
        items: [
          "**Carbon dating** — to measure the amount of C-14 in a substance and hence to determine the age of the substance",
          "**Pharmaceutical industry** — to identify the new compounds in possibly new drugs and to identify how long they would stay in the body",
          "**Testing athletes' urine** for drugs or banned substances such as anabolic steroids",
          "**Studying the composition of the surface of Mars** and to look for molecules that might suggest that life existed on the planet by sending probes to Mars",
        ],
      },
      { k: "h", text: "How does a mass spectrometer work?" },
      { k: "p", text: "There are five main processes occurring in a mass spectrometer. They are:" },
      {
        k: "steps",
        caption: "The ride every sample takes — tap each stage to walk the machine.",
        items: [
          { title: "1 · Vapourisation", icon: "flame", text: "The sample is turned into gas or vapourised using an electrical heater.  X(s) → X(g)   ·   X(l) → X(g)" },
          { title: "2 · Ionization", icon: "zap", text: "Gas particles are bombarded with a stream of high energy electrons from an **electron gun**, to ionize them. Electrons are knocked off the particles, producing uni-positively charged ions.  X(g) → X^+^(g) + e^−^" },
          { title: "3 · Acceleration", icon: "arrow", text: "The positive ions are accelerated by an **electric field** towards the magnetic field, which provides the energy for the particles to accelerate." },
          { title: "4 · Deflection", icon: "magnet", text: "The positive ions' path is altered with a **magnetic field**. For a given magnetic field, only ions with a particular **mass/charge ratio** will be detected. Lighter ions have less momentum and are deflected more than heavier ions. Ions with a large m/z ratio deflected less than ions with a smaller m/z ratio." },
          { title: "5 · Detection", icon: "target", text: "The ions are detected by the detector, which is linked to an **amplifier** and then to a **recorder**. This converts the current to a peak which is shown in a **mass spectrum**." },
        ],
      },
      {
        k: "wow",
        text: "Spec point iv says ions may carry a **2+** charge. Knock *two* electrons off and the m/z ratio halves — X²⁺ behaves like a particle of half the mass, so watch for peaks sitting at ==half the expected mass==.",
      },
      { k: "figure", kind: "spectrum-neon", caption: "Mass spectrum of neon — an early application was the demonstration by Aston, (Nobel Prize, 1922), that naturally occurring neon consisted of three isotopes; ²⁰Ne, ²¹Ne and ²²Ne." },
      {
        k: "bullets",
        items: [
          "position of peaks give **atomic mass**",
          "peak intensity gives **relative abundance**",
          "The tallest peak represents the **most abundant isotope**.",
        ],
      },
      { k: "h", text: "Determining relative isotopic and atomic masses" },
      { k: "p", text: "The mass spectrum could be used to calculate the relative atomic mass of an element." },
      {
        k: "worked",
        title: "Worked example 1",
        question:
          "Calculate the average relative atomic mass of neon using the above information. Out of every 100 atoms 90.92 are ²⁰Ne, 0.26 are ²¹Ne and 8.82 are ²²Ne.",
        steps: [
          "Out of every 100 atoms: 90.92 are ²⁰Ne, 0.26 are ²¹Ne, 8.82 are ²²Ne.",
          "RAM = Σ (isotopic mass × abundance) ÷ 100 = (20 × 90.92 + 21 × 0.26 + 22 × 8.82) ÷ 100",
          "= (1818.4 + 5.46 + 194.04) ÷ 100",
          "= 2017.9 ÷ 100",
        ],
        answer: "Relative atomic mass of neon = **20.18**",
      },
      {
        k: "worked",
        title: "Worked example 2",
        question: "What is the relative atomic mass of chlorine, if it exists in two isotopic forms: ³⁵Cl (relative isotopic mass 35, abundance 75) and ³⁷Cl (relative isotopic mass 37, abundance 25)?",
        steps: [
          "RAM = Σ (isotopic mass × abundance) ÷ 100 = (35 × 75 + 37 × 25) ÷ 100",
          "= (2625 + 925) ÷ 100",
          "= 3550 ÷ 100",
        ],
        answer: "Relative atomic mass of chlorine = **35.5**",
      },
      {
        k: "exercise",
        label: "Exercise 2",
        title: "Your turn — reveal only after committing to an answer",
        note: "Same recipe every time: multiply each isotopic mass by its abundance, add them up, divide by 100.",
        body: {
          kind: "questions",
          qs: [
            {
              q: "Question 1: Calculate the relative atomic mass of sulfur from the following isotopic percentages.",
              data: ["³²S 95%", "³³S 1%", "³⁴S 4%"],
              answer: "RAM = (32 × 95 + 33 × 1 + 34 × 4) ÷ 100 = (3040 + 33 + 136) ÷ 100 = 3209 ÷ 100 = **32.09**",
            },
            {
              q: "Question 2: The neon element has three isotopes. They are 90.92% of ²⁰Ne, 0.26% of ²¹Ne and 8.82% of ²²Ne. Calculate relative atomic mass.",
              answer: "RAM = (20 × 90.92 + 21 × 0.26 + 22 × 8.82) ÷ 100 = 2017.9 ÷ 100 = **20.18** — the same data as Worked Example 1.",
            },
            {
              q: "Question 3: Calculate the relative atomic mass of boron using the mass spectrum.",
              data: ["m/z 10 → abundance 18.7", "m/z 11 → abundance 81.3"],
              answer: "RAM = (10 × 18.7 + 11 × 81.3) ÷ 100 = (187 + 894.3) ÷ 100 = 1081.3 ÷ 100 = **10.81**",
            },
            {
              q: "Question 4: Calculate the relative atomic mass of Zirconium using the mass spectrum.",
              data: ["zirconium-90: 51.5", "zirconium-91: 11.2", "zirconium-92: 17.1", "zirconium-94: 17.4", "zirconium-96: 2.8"],
              answer:
                "RAM = (90 × 51.5 + 91 × 11.2 + 92 × 17.1 + 94 × 17.4 + 96 × 2.8) ÷ 100 = (4635 + 1019.2 + 1573.2 + 1635.6 + 268.8) ÷ 100 = 9131.8 ÷ 100 = **91.32**",
            },
            {
              q: "Question 5: Naturally occurring potassium consists of potassium-39 and potassium-41. Calculate the percentage of each isotope present if the average is 39.1.",
              answer:
                "Let x be the fraction of ³⁹K: 39x + 41(1 − x) = 39.1 → 41 − 2x = 39.1 → 2x = 1.9 → x = 0.95 → **95% potassium-39 and 5% potassium-41**.",
            },
            {
              q: "Question 6: The mass spectrum of bromine vapour is shown below (peaks at 79 and 81 of equal height; molecular peaks at 158, 160, 162 with heights ≈ 1 : 2 : 1). (a) What are the relative isotopic masses of the two isotopes present in bromine? (b) Identify the particles responsible for the peaks at m/z 158, 160 and 162. (c) Deduce the relative abundance of the two isotopes and explain the relative heights of the three peaks.",
              data: ["atomic-ion peaks: m/z 79 and m/z 81, equal heights", "molecular-ion peaks: m/z 158, 160, 162 ≈ 1 : 2 : 1"],
              answer:
                "(a) **79 and 81**. (b) The **molecular ions**: m/z 158 = ⁷⁹Br₂⁺, m/z 160 = ⁷⁹Br⁸¹Br⁺, m/z 162 = ⁸¹Br₂⁺. (c) The two atomic-ion peaks are equal, so the isotopes are present **1 : 1**. Heights come from pair chances: ⁷⁹Br + ⁷⁹Br = ½ × ½ = ¼, mixed = 2 × (½ × ½) = ½, ⁸¹Br + ⁸¹Br = ¼ → **1 : 2 : 1**.",
            },
          ],
        },
      },
      { k: "checkpoint", page: 47 },
    ],
  },
  {
    spec: "2.7",
    statement:
      "be able to predict mass spectra, including relative peak heights, for diatomic molecules, including chlorine, given the isotopic abundances",
    title: "Predicting diatomic peaks",
    blocks: [
      {
        k: "p",
        text: "If an element exists as diatomic molecules, like chlorine, then the spectrum would contain peaks for the separate **atomic ions** as well as for the **molecular ions**.",
      },
      {
        k: "p",
        text: "If diatomic substances are analysed by mass spectrometry, you can obtain the relative molecular mass of the element or compound by observing the peaks with the **largest m/z ratios** (assuming a value of z=1). Molecular ions are formed by the removal of an electron from the **whole molecule**. Atomic ions are formed when the **Cl—Cl bond is broken** by a high energy beam of electron.",
      },
      {
        k: "table",
        caption: "The two-peak atomic pattern and the three-peak molecular pattern of Cl₂",
        head: ["Peak", "Peak height ratio", "m/z ratio", "Species"],
        rows: [
          ["A", "3", "35", "³⁵Cl⁺"],
          ["B", "1", "37", "³⁷Cl⁺"],
          ["C", "9", "70", "³⁵Cl—³⁵Cl⁺"],
          ["D", "6", "72", "³⁵Cl—³⁷Cl⁺"],
          ["E", "1", "74", "³⁷Cl—³⁷Cl⁺"],
        ],
      },
      { k: "figure", kind: "spectrum-cl2", caption: "There are two naturally occurring isotopes of chlorine. Hence 3 different combinations of Cl₂ molecules can be obtained. This is shown by the peaks C, D and E." },
      { k: "h", text: "Explanation of peak height ratio" },
      {
        k: "steps",
        caption: "The probability cascade — tap through it.",
        items: [
          { title: "The starting chances", icon: "spark", text: "There are two isotopes of chlorine, ³⁵Cl which is 75% abundant and ³⁷Cl which is 25% abundant. The chance of picking each isotope: 75/100 = **3/4** and 25/100 = **1/4**." },
          { title: "Two ³⁵Cl together", icon: "spark", text: "There is 3 in 4 chance of selecting a ³⁵Cl from a sample of chlorine atom. This means total chance of two ³⁵Cl atoms combining together is 3/4 × 3/4 = **9/16**." },
          { title: "A mixed pair", icon: "spark", text: "There is 1 in 4 chance of selecting a ³⁷Cl atom. This means that the chance of ³⁷Cl combining with a ³⁵Cl atom is 1/4 × 3/4 = **3/16** — and the chance of a ³⁵Cl atom combining with a ³⁷Cl atom is also 3/16." },
          { title: "Both orders count", icon: "spark", text: "This means that the total chance of ³⁷Cl and ³⁵Cl combining together in any order is 2 × 3/16 = **6/16**." },
          { title: "Two ³⁷Cl together", icon: "spark", text: "The chance of two ³⁷Cl atoms combining together is 1/4 × 1/4 = **1/16**." },
          { title: "The ratio", icon: "spark", text: "9/16 : 6/16 : 1/16 in whole number ratio is **9 : 6 : 1**." },
        ],
      },
      {
        k: "wow",
        text: "The peak-ratio is a fingerprint: chlorine (75 : 25) always marches **9 : 6 : 1**; a 50 : 50 element like bromine gives **1 : 2 : 1**; a single-isotope element shows just one molecular peak.",
      },
      { k: "h", text: "Determining relative molecular mass of a polyatomic molecule" },
      { k: "figure", kind: "spectrum-ethanol", caption: "Mass spectrum of ethanol (C₂H₅OH)." },
      {
        k: "p",
        text: "The peak with the **highest m/z ratio is the molecular ion peak** which gives the RMM of the compound. RMM for ethanol = ==46==.",
      },
    ],
  },
  {
    spec: "2.8",
    statement:
      "be able to define first, second and third ionisation energies and understand that all ionisation energies are endothermic",
    title: "The energy toll of losing electrons",
    blocks: [
      { k: "h", text: "Ionization energy" },
      {
        k: "bullets",
        items: [
          "It is a measure of the energy required to **remove electrons** from an atom.",
          "There are as many ionization energies as there are electrons in the atom.",
          "The value of ionization energy depends on:",
        ],
      },
      {
        k: "bullets",
        items: [
          "the **distance of the electron from the nucleus**, and",
          "the **effective nuclear charge** (not the nuclear charge) of the atom.",
        ],
      },
      {
        k: "note",
        label: "Nuclear Charge (NC)",
        text: "The actual charge (relative) due to the protons in the nucleus.",
      },
      {
        k: "note",
        label: "Effective Nuclear Charge (ENC)",
        text: "The effectiveness of nuclear charge after passing through filled shells.",
      },
      {
        k: "note",
        label: "Always gaseous",
        text: "A simple way to compare effective nuclear charges is to knock off a + for every electron in a filled inner level — and every ionisation equation starts and ends in the **gaseous state**: the (g) is not optional.",
      },
      {
        k: "def",
        term: "First ionization energy",
        text: "The energy required to remove ==one mole of electrons== from ==one mole of gaseous atoms== to form ==one mole of gaseous uni-positive ions==.",
      },
      { k: "eq", eq: "Na(g) → Na^+^(g) + e^−^        Mg(g) → Mg^+^(g) + e^−^" },
      {
        k: "p",
        text: "Its value gives an idea of how strongly the nucleus pulls on the electron being removed. The stronger the pull, the more energy needed to remove the electron.",
      },
      {
        k: "def",
        term: "Second ionization energy",
        text: "The energy required to remove ==1 mole of electrons== from ==1 mole of the gaseous uni-positive ions== to form one mole of gaseous di-positive ions.",
      },
      { k: "eq", eq: "Na^+^(g) → Na^2+^(g) + e^−^        Mg^+^(g) → Mg^2+^(g) + e^−^" },
      {
        k: "def",
        term: "Third ionization energy",
        text: "The energy required to remove ==1 mole of electrons== from ==1 mole of the gaseous di-positive ions== to form one mole of gaseous tri-positive ions.",
      },
      { k: "eq", eq: "Na^2+^(g) → Na^3+^(g) + e^−^        Mg^2+^(g) → Mg^3+^(g) + e^−^" },
      {
        k: "wow",
        text: "All ionisation energies are **endothermic** — energy must go *in* to pull an electron away from the nucleus's attraction. That is why every definition says “energy required”, never “energy released”.",
      },
      {
        k: "flip",
        title: "Definitions you must produce on demand",
        hint: "Exam gold: the four pillars are *energy · one mole · gaseous · ions*.",
        cards: [
          { front: "Define the **first** ionisation energy.", back: "The energy required to remove **one mole of electrons** from **one mole of gaseous atoms** to form **one mole of gaseous uni-positive ions**." },
          { front: "Define the **second** ionisation energy.", back: "The energy required to remove 1 mole of electrons from 1 mole of the **gaseous uni-positive ions** to form one mole of **gaseous di-positive ions**." },
          { front: "Define the **third** ionisation energy.", back: "The energy required to remove 1 mole of electrons from 1 mole of the **gaseous di-positive ions** to form one mole of **gaseous tri-positive ions**." },
        ],
      },
    ],
  },
  {
    spec: "2.9",
    statement: "know that an orbital is a region within an atom that can hold up to two electrons with opposite spins",
    title: "Shells, sub-shells and orbitals",
    blocks: [
      { k: "h", text: "Quantum shells" },
      {
        k: "p",
        text: "Atoms can be identified by its mass of their nucleons; however, it is their **electronic structure** which determines the behavior and chemical properties. **Max Planck** first presented the quantum theory in **1900**. We can use this theory to describe the arrangement of electrons around the nuclei.",
      },
      {
        k: "p",
        text: "According to this theory electrons exist around the nucleus in certain regions of the atom called **shells or energy levels**. These well-defined energy levels are called **quantum shells**.",
      },
      {
        k: "p",
        text: "Each shell is described by a number known as **principle quantum number (n)**. The larger the value of n, the further the electron is from the nucleus.",
      },
      { k: "h", text: "Electrons in the first four quantum shells" },
      {
        k: "bullets",
        items: [
          "The energy levels or quantum shells (apart from the first one) are divided into **sub-shells** of slightly different energy levels. Each subshell is described by a letter **s, p, d and f**.",
          "The energy of each sub-shell increases from **s to p to d to f**.",
        ],
      },
      {
        k: "table",
        head: ["Quantum shell or Energy level", "Sub-shell"],
        rows: [
          ["1", "1s"],
          ["2", "2s   2p"],
          ["3", "3s   3p   3d"],
          ["4", "4s   4p   4d   4f"],
        ],
      },
      {
        k: "bullets",
        items: [
          "Each sub-shell is made up of **orbitals**.",
          "**Orbital** is the region where the electrons are most likely to be found — 3-dimensional statistical maps showing the likeliest places to find electrons; they come in different shapes and sizes.",
          "The orbitals in different sub-levels have different shapes.",
        ],
      },
      {
        k: "cloze",
        title: "Recall jolt",
        items: [
          "An orbital can hold ==up to two electrons==, and they must have ==opposite spins== — one spins ==clockwise==, the other ==anti-clockwise==.",
          "The energy of sub-shells climbs in the order ==s → p → d → f==.",
        ],
      },
      {
        k: "flip",
        title: "The spec wording",
        cards: [
          { front: "Describe an orbital.", back: "A region within an atom that can hold **up to two electrons** with **opposite spins**." },
          { front: "What does the principle quantum number (n) tell you?", back: "Which shell the electron occupies — **the larger n is, the further the electron is from the nucleus**." },
        ],
      },
    ],
  },
];
