import type { SpecSection, NotesBlock } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 2 revision note · sections 2.10 – 2.18
   Text kept verbatim from the CHSE Grade 11 / Unit 1 / Topic 2
   revision note (2021, semester 1); page furniture omitted.
   Exercises from the note are presented as fully worked examples.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_B: SpecSection[] = [
  {
    spec: "2.10",
    statement:
      "understand how ionisation energies are influenced by the number of protons in the nucleus, the electron shielding and the sub-shell from which the electron is removed",
    title: "Factors affecting ionisation energies",
    blocks: [
      { k: "h", text: "The three factors" },
      { k: "p", text: "The amount of energy required to remove the first electron depends on the following factors:" },
      {
        k: "def",
        term: "Distance between the nucleus and the outermost electrons",
        text: "As the atoms get larger, the distance between the outer most electrons and the nucleus increases. The outer electrons are held less strongly so easier to remove. Less energy is required to remove the electron (==lower ionization energy==).",
      },
      {
        k: "def",
        term: "Effective nuclear force of attraction",
        text: "As the effective nuclear charge increases, force of attraction between the electrons and outer electrons increases. Electrons are harder to remove (==higher ionization energy==).",
      },
      {
        k: "def",
        term: "Shielding effect",
        text: "The electron in the outermost energy level experiences more inter-electron repulsion known as ==shielding==. The greater the number of the inner shell electrons the greater is the shielding effect (screening effect). The force of attraction becomes weaker. Less energy is required to remove the electron (==lower ionization energy==).",
      },
      { k: "figure", kind: "shielding", caption: "Shielding in sodium — the ten inner-shell electrons sit between the +11 nucleus and the outer 3s electron, so the outer electron experiences less than the full nuclear charge." },
      {
        k: "p",
        text: "Across a period, the increasing **nuclear charge** raises the ionization energy; down a group, the increase in **distance and shielding** lowers it. Both trends are explained in full at **2.18**.",
      },
    ],
  },
  {
    spec: "2.11",
    statement:
      "know that ideas about electronic structure developed from: i an understanding that successive ionisation energies provide evidence for the existence of quantum shells and the group to which the element belongs ii an understanding that the first ionisation energy of successive elements provides evidence for electron sub-shells",
    title: "Evidence from ionisation energies",
    blocks: [
      { k: "h", text: "Successive ionization energies of an element" },
      {
        k: "p",
        text: "The patterns in successive ionisation energies for an element give us important information about the electronic structure for that element.",
      },
      {
        k: "p",
        text: "When successive ionization energies of an element are listed, there are steady increases and big jumps occuring at defined places. This is one piece of evidence for the existence of **quantum shells**.",
      },
      {
        k: "bullets",
        items: [
          "A sodium atom has 11 electrons. Its successive ionization energies are shown in the table below.",
          "The places where the ionization energy has jumped significantly are underlined in the table.",
        ],
      },
      {
        k: "table",
        caption: "Successive ionization energies of sodium in kJ mol^−1^",
        head: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"],
        rows: [["496", "==4563==", "6913", "9544", "13352", "16611", "20115", "25491", "28934", "==141367==", "159079"]],
      },
      {
        k: "p",
        text: "When a graph is plotted between the **log** of ionization energy values of an element against the number of electrons removed, the trends in successive ionization energies can be seen. There are two types of increases that can be observed. They are:",
      },
      {
        k: "bullets",
        items: [
          "**Successive ionization energies are always greater than the previous one.** This is due to increasing attraction of the nucleus on the remaining electrons because the electrons are being removed from an increasingly positive ion.",
          "**Large increases occur when there is a change of shell.** This is due to removal of electron from an inner main shell, which is closer to the nucleus on which the nuclear attraction is greater.",
          "This can be used to predict the **group** of an unknown element. The group number would be given by *counting the number of electrons removed before the first big jump*. Electronic structure can also be found using successive ionization energies.",
        ],
      },
      { k: "figure", kind: "succ-ie", caption: "Graph showing successive ionization energies for Sodium — plotted as log(IE) against electrons removed." },
      { k: "h", text: "Why do the successive ionization energies of sodium increase?" },
      {
        k: "bullets",
        items: [
          "The first electron to be removed is in the **3s orbital**, which is the third quantum shell. So less energy is needed to remove the electron. Therefore the first ionization energy is the lowest.",
          "There is a **large jump from 1st to the 2nd** ionization energy. This is because the second electron to be removed is in the **2nd quantum shell** which is lower in energy than the 3rd quantum shell.",
          "There is steady increase in ionization energy from the 2nd to the 9th electron. This shows that the eight electrons exist within the **same quantum shell**. As each successive electron is removed from the same shell, the electron–electron repulsion within the shell decreases. As a result, there is steady increase in ionization energy from 2nd to 9th electron.",
          "The **large jump from 9th to 10th** electron indicates that the electron is removed from first quantum shell (1s orbital).",
        ],
      },
    ],
  },
  {
    spec: "2.12",
    statement: "be able to describe the shapes of s and p orbitals",
    title: "Shapes of s and p orbitals",
    blocks: [
      { k: "figure", kind: "orbitals", caption: "The orbitals in different sub-levels have different shapes. (The picture shows a cross section through an s-orbital.)" },
      {
        k: "bullets",
        items: [
          "An **s** orbital is ==spherical== — a cross section through it is a circle.",
          "A **p** orbital is ==dumbbell-shaped== — two lobes on opposite sides of the nucleus.",
        ],
      },
    ],
  },
  {
    spec: "2.13",
    statement:
      "know that orbitals in sub-shells: i each take a single electron before pairing up ii pair up with two electrons of opposite spin",
    title: "Rules for filling orbitals",
    blocks: [
      {
        k: "table",
        caption: "The number of electrons that fit in each type of sub-shell",
        head: ["Sub-shell", "Number of orbitals", "Total number of electrons"],
        rows: [
          ["s", "1", "1 × 2 = 2"],
          ["p", "3", "3 × 2 = 6"],
          ["d", "5", "5 × 2 = 10"],
          ["f", "7", "7 × 2 = 14"],
        ],
      },
      {
        k: "bullets",
        items: [
          "Each orbital can accommodate a maximum of **two electrons** in which one electron spins **clockwise** and the other spins **anti-clockwise**.",
        ],
      },
      {
        k: "def",
        term: "Aufbau principle",
        text: "Electrons fill up the ==lowest energy orbital first==.",
      },
      {
        k: "def",
        term: "Hund's rule",
        text: "Electrons fill orbitals ==singly== before they start pairing up.",
      },
      {
        k: "def",
        term: "Pauli Exclusion Principle",
        text: "Two electrons cannot occupy the same orbital unless they have ==opposite spin==. This is due to the repulsion between electron pairs.",
      },
      { k: "figure", kind: "fill-demo", caption: "Add electrons to a 2p sub-shell and watch the filling rules in action." },
    ],
  },
  {
    spec: "2.14",
    statement:
      "be able to predict the electronic configuration of atoms of the elements from hydrogen to krypton inclusive and their ions, using s, p, d notation and electron-in-boxes notation",
    title: "Writing electronic configurations",
    blocks: [
      { k: "h", text: "Rules for writing configurations" },
      {
        k: "bullets",
        items: [
          "Electrons are added to the sub shells according to the **Aufbau Principle**. The following rules must be applied when writing electronic configuration.",
          "The sub shells which are **half filled or completely filled** with electrons are more stable. Orbitals are not filled in numerical order.",
        ],
      },
      {
        k: "note",
        label: "Why 4s before 3d",
        text: "For example, 4s is filled before 3d. This is because the 4s orbital is at a ==lower energy level== than a 3d orbital.",
      },
      { k: "eq", eq: "the filling order: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → ………" },
      { k: "figure", kind: "fill-order", caption: "Fill the orbitals in this exact order." },
      { k: "h", text: "spdf notation and box notation" },
      {
        k: "p",
        text: "When writing electronic configuration, the electronic structure of an atom can be represented in two ways: **1. s p d f notation** and **2. electron box notation**.",
      },
      {
        k: "worked",
        title: "Worked example · carbon",
        question: "Write down the electronic configuration of ₆C using spdf notation and box notation.",
        steps: [
          "Carbon has **6 electrons** to place.",
          "1s is the lowest energy orbital — it takes two (↑↓).",
          "2s takes the next two (↑↓).",
          "The last two go **singly** into two separate 2p orbitals — Hund's rule.",
        ],
        answer: "spdf: **1s² 2s² 2p²** — see the boxes below.",
      },
      { k: "figure", kind: "boxes-c", caption: "Carbon in electron-in-boxes notation." },
      {
        k: "worked",
        title: "Worked example · sulfur",
        question: "Write down the electronic configuration of ₁₆S using spdf notation and box notation.",
        steps: [
          "Sulfur has **16 electrons**.",
          "1s² 2s² 2p⁶ fills the first two shells completely — 10 electrons placed.",
          "3s² takes two more (12 placed).",
          "The last four enter 3p: **three singly first**, then one pairing up.",
        ],
        answer: "spdf: **1s² 2s² 2p⁶ 3s² 3p⁴** — noble-gas shortcut: **[Ne] 3s² 3p⁴**",
      },
      { k: "figure", kind: "boxes-s", caption: "Sulfur in electron-in-boxes notation." },
      {
        k: "table",
        caption: "Electronic configurations from hydrogen (H) to krypton (Kr), in spdf notation",
        head: ["Z", "Element", "Electronic configuration"],
        rows: [
          ["1", "**H** hydrogen", "1s^1^"],
          ["2", "**He** helium", "1s^2^"],
          ["3", "**Li** lithium", "1s^2^ 2s^1^"],
          ["4", "**Be** beryllium", "1s^2^ 2s^2^"],
          ["5", "**B** boron", "1s^2^ 2s^2^ 2p^1^"],
          ["6", "**C** carbon", "1s^2^ 2s^2^ 2p^2^"],
          ["7", "**N** nitrogen", "1s^2^ 2s^2^ 2p^3^"],
          ["8", "**O** oxygen", "1s^2^ 2s^2^ 2p^4^"],
          ["9", "**F** fluorine", "1s^2^ 2s^2^ 2p^5^"],
          ["10", "**Ne** neon", "1s^2^ 2s^2^ 2p^6^"],
          ["11", "**Na** sodium", "1s^2^ 2s^2^ 2p^6^ 3s^1^"],
          ["12", "**Mg** magnesium", "1s^2^ 2s^2^ 2p^6^ 3s^2^"],
          ["13", "**Al** aluminium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^1^"],
          ["14", "**Si** silicon", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^2^"],
          ["15", "**P** phosphorus", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^3^"],
          ["16", "**S** sulfur", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^4^"],
          ["17", "**Cl** chlorine", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^5^"],
          ["18", "**Ar** argon", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^"],
          ["19", "**K** potassium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^1^"],
          ["20", "**Ca** calcium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^"],
          ["21", "**Sc** scandium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^1^"],
          ["22", "**Ti** titanium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^2^"],
          ["23", "**V** vanadium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^3^"],
          ["24", "**Cr** chromium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^1^ 3d^5^ *(exception)*"],
          ["25", "**Mn** manganese", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^5^"],
          ["26", "**Fe** iron", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^6^"],
          ["27", "**Co** cobalt", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^7^"],
          ["28", "**Ni** nickel", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^8^"],
          ["29", "**Cu** copper", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^1^ 3d^10^ *(exception)*"],
          ["30", "**Zn** zinc", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^"],
          ["31", "**Ga** gallium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^1^"],
          ["32", "**Ge** germanium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^2^"],
          ["33", "**As** arsenic", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^3^"],
          ["34", "**Se** selenium", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^4^"],
          ["35", "**Br** bromine", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^5^"],
          ["36", "**Kr** krypton", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^6^"],
        ],
      },
      {
        k: "wow",
        text: "The electronic structure of **Cr and Cu are exceptional**. In both cases the outer subshells are either **completely full or half full**. This is achieved by **donating one of their 4s electrons to the 3d sub shell** as this makes the d-sub shell to be half filled or completely filled. ==Completely filled or half filled-sub shell is a more stable electronic configuration.==",
      },
      { k: "h", text: "Electronic configuration of ions" },
      {
        k: "bullets",
        items: [
          "When an atom loses or gains an electron to form ions, the electronic structure changes.",
          "**Cations (positive ions)** – formed by **loss** of electrons",
          "**Anions (negative ions)** – formed by **gain** of electrons",
        ],
      },
      {
        k: "worked",
        title: "Worked example · from atom to ion",
        question: "Write down the electronic configuration of the sodium atom and sodium ion; then the chlorine atom and chloride ion.",
        steps: [
          "Sodium atom, ₁₁Na: 1s² 2s² 2p⁶ 3s¹.",
          "Na⁺ **loses** its single 3s electron → 1s² 2s² 2p⁶ (the neon arrangement).",
          "Chlorine atom, ₁₇Cl: 1s² 2s² 2p⁶ 3s² 3p⁵.",
          "Cl⁻ **gains** one electron into 3p → 1s² 2s² 2p⁶ 3s² 3p⁶ (the argon arrangement).",
        ],
        answer: "Na⁺: **1s² 2s² 2p⁶** · Cl⁻: **1s² 2s² 2p⁶ 3s² 3p⁶**",
      },
      {
        k: "table",
        caption: "Full electronic structures of ions",
        head: ["Ion", "Full electronic structure"],
        rows: [
          ["Mg^2+^", "1s^2^ 2s^2^ 2p^6^"],
          ["Ca^2+^", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^"],
          ["Al^3+^", "1s^2^ 2s^2^ 2p^6^"],
          ["O^2−^", "1s^2^ 2s^2^ 2p^6^"],
          ["Br^−^", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^ 4s^2^ 3d^10^ 4p^6^"],
          ["P^3−^", "1s^2^ 2s^2^ 2p^6^ 3s^2^ 3p^6^"],
        ],
      },
      { k: "checkpoint", page: 51 },
    ],
  },
  {
    spec: "2.15",
    statement: "understand that electronic configuration determines the chemical properties of an element",
    title: "Configuration and chemical properties",
    blocks: [
      {
        k: "p",
        text: "Atoms can be identified by its mass of their nucleons; however, it is their ==electronic structure== which determines the behavior and chemical properties.",
      },
      {
        k: "p",
        text: "Position of an element in the periodic table is determined by its **electronic structure**. The physical and chemical properties depend on the **electronic configuration**.",
      },
      {
        k: "bullets",
        items: [
          "All the elements within the **period** have the same number of **electron shells**. *Example:* Elements in period 2 have 2 electron shells.",
          "All the elements within a **group** have the same number of **electrons in their outer shell** and they have **similar properties**.",
        ],
      },
    ],
  },
  {
    spec: "2.16",
    statement:
      "know that the Periodic Table is divided into blocks, such as s, p and d, and know the number of electrons that can occupy s, p and d sub-shells in the first four quantum shells",
    title: "The s, p and d blocks",
    blocks: [
      {
        k: "bullets",
        items: [
          "In the modern periodic table the elements are arranged in order of their **atomic number**.",
          "Vertical columns in the periodic table are called **groups** and the horizontal rows are called **periods**.",
        ],
      },
      { k: "p", text: "The periodic table can be split into four blocks, based on the **orbital in which the last electron gets filled**." },
      {
        k: "table",
        caption: "The four blocks",
        head: ["Block", "Elements", "Outermost electrons in"],
        rows: [
          ["**s**-Block", "elements of group 1 and 2", "the s sub-shell"],
          ["**p**-Block", "elements in groups 3 to 8", "the p sub-shell"],
          ["**d**-Block", "transition elements, found between group 2 and 3", "the d sub-shell"],
          ["**f**-Block", "lanthanides and actinides", "the f sub-shell"],
        ],
      },
      { k: "figure", kind: "pt-blocks", caption: "The Periodic Table colour-coded by which sub-shell receives the last electron." },
      {
        k: "table",
        caption: "Sub-shells and electrons in the first four energy levels",
        head: ["Shell", "Principle Quantum number (n)", "Sub-shells", "Total number of electrons"],
        rows: [
          ["1st", "1", "1s", "2"],
          ["2nd", "2", "2s 2p", "8"],
          ["3rd", "3", "3s 3p 3d", "18"],
          ["4th", "4", "4s 4p 4d 4f", "32"],
        ],
      },
    ],
  },
  {
    spec: "2.17",
    statement:
      "be able to represent data, in a graphical form (including the use of logarithms of first ionisation energies on a graph) for elements 1 to 36 and hence explain the meaning of the term ‘periodic property’",
    title: "Periodic properties",
    blocks: [
      {
        k: "p",
        text: "Plot first ionisation energy against atomic number and the same pattern repeats each period: it rises to a maximum at each noble gas and drops to a minimum at the next Group 1 element. A property that repeats in this regular way across the periods is a ==periodic property==.",
      },
      { k: "figure", kind: "ie-graph", caption: "First Ionisation Energies / kJ mol⁻¹ — the values from the note's table, elements 1–28, plotted against atomic number." },
      {
        k: "note",
        label: "Reading the graph",
        text: "The peaks are the **noble gases** (He, Ne, Ar…), the minima are the **Group 1 metals** (Li, Na, K…), and the dips at B/Al and O/S are the deviations explained at **2.18(ii)**.",
      },
      { k: "h", text: "Atomic radius" },
      {
        k: "p",
        text: "Atomic radius of an element is the measurement of the size of its atom. It is the distance from the **center of the nucleus to the boundary of electron cloud**. Since atoms does not have a well defined boundary, we can find the atomic radius by determining the distance between the two nuclei and **dividing by 2**.",
      },
      { k: "h", text: "The atomic radius generally decreases across a period" },
      {
        k: "bullets",
        items: [
          "Nuclear charge (proton number) increases across the period",
          "Shielding effect remains constant as the electrons are added to the same shell.",
          "Therefore, attraction between the nucleus and the electrons increases.",
          "Electrons are pulled closer to nucleus.",
        ],
      },
      { k: "h", text: "The atomic radius generally increases down the group" },
      {
        k: "bullets",
        items: [
          "Electrons are added to new energy levels down the group",
          "Shielding effect increases",
          "The attraction between the electrons and the nucleus decreases.",
        ],
      },
      { k: "h", text: "Ionic radius" },
      {
        k: "p",
        text: "The radius of a **positive ion is smaller** than the element's atomic radius. This is because as the electrons are removed the remaining electrons are more strongly attracted to the positive nucleus.",
      },
      {
        k: "p",
        text: "The radius of a **negative ion is larger** than the element's atomic radius. This is because as the electrons are gained, the number of electrons increases and therefore are bound less tightly to the nucleus.",
      },
      { k: "figure", kind: "radius", caption: "Na → Na⁺ and Cl → Cl⁻ — same nucleus, different electron count." },
    ],
  },
  {
    spec: "2.18",
    statement:
      "be able to explain: i the trends in melting and boiling temperatures of the elements of Periods 2 and 3 of the Periodic Table in terms of the structure of the element and the bonding between its atoms or molecules ii the general increase and the specific trends in ionisation energy of the elements across Periods 2 and 3 of the Periodic Table iii the decrease in first ionisation energy down a group",
    title: "Melting points and ionisation energies",
    blocks: [
      { k: "h", text: "(i) Melting and boiling temperatures" },
      {
        k: "p",
        text: "Elements – As you move from left to right the elements go from highly electropositive metals through metalloids with giant structures to the simple molecular structure of non-metals.",
      },
      {
        k: "p",
        text: "Both periods 2 and 3 show similar trends in their melting points and boiling points, which are linked to changes in **structure** and **bond strength** of these elements.",
      },
      { k: "p", text: "The table below illustrates the changes in melting and boiling points of elements in Periods 2 and 3" },
      {
        k: "table",
        caption: "Period 2",
        head: ["", "Li", "Be", "B", "C (diamond)", "N", "O", "F"],
        rows: [
          ["melting temperature / °C", "181", "1278", "2300", "3550", "−210", "−218", "−220"],
          ["boiling temperature / °C", "1342", "2970", "3927", "4827", "−196", "−183", "−188"],
          ["type of bonding", "metallic", "metallic", "covalent", "covalent", "covalent", "covalent", "covalent"],
          ["structure", "giant lattice", "giant lattice", "giant lattice", "giant lattice", "simple molecular", "simple molecular", "simple molecular"],
        ],
      },
      {
        k: "table",
        caption: "Period 3",
        head: ["", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
        rows: [
          ["melting temperature / °C", "98", "649", "660", "1440", "44", "113", "−101"],
          ["boiling temperature / °C", "883", "1107", "2467", "2355", "280", "445", "−35"],
          ["type of bonding", "metallic", "metallic", "metallic", "covalent", "covalent", "covalent", "covalent"],
          ["structure", "giant lattice", "giant lattice", "giant lattice", "giant lattice", "simple molecular", "simple molecular", "simple molecular"],
        ],
      },
      { k: "p", text: "The graph below shows the melting points of the elements in Period 3" },
      { k: "figure", kind: "melting", caption: "Melting points across Period 3, in K." },
      {
        k: "table",
        caption: "Why the melting points behave the way they do",
        head: ["Element(s)", "Structure and type of bonding", "Trend in melting point"],
        rows: [
          [
            "**Metals** (Eg: Na, Mg, Al)",
            "Metallic bonding — giant lattice structure",
            "Melting point increases across the period: ionic size decreases; more electrons in the 'sea'; therefore strength of metallic bonding increases.",
          ],
          [
            "**Macromolecules** (Eg: Si)",
            "Covalent bonding — giant covalent structure",
            "Melting point is very high: strong covalent bonds link all the atoms together, so a lot of energy is needed to break them.",
          ],
          [
            "**Simple molecules** (Eg: P₄, S₈, Cl₂)",
            "Covalent bonding — simple molecular structure",
            "Melting point is low: it depends on the intermolecular forces (London forces) between molecules, which are weak. London forces are stronger in S₈ as more electrons are present; P₄ contains more electrons than Cl₂, so London forces are stronger in P₄ than Cl₂.",
          ],
          [
            "**Noble Gases** (Eg: Ar)",
            "Simple atomic structure",
            "The lowest melting and boiling points: they exist as individual atoms, resulting in very weak London forces between atoms.",
          ],
        ],
      },
      { k: "checkpoint", page: 59 },
      { k: "h", text: "(ii) Ionisation energy across Periods 2 and 3" },
      {
        k: "p",
        text: "In general the 1st ionization energy of the elements across the period ==increases gradually==, because:",
      },
      {
        k: "bullets",
        items: [
          "As the atomic size decreases, distance between the nucleus and the outer shell electrons decreases",
          "Nuclear attraction increases",
          "Shielding effect remains the same",
          "Therefore, the attraction between the outer electrons and the nucleus increases. Hence, more energy is required to remove the electrons.",
        ],
      },
      { k: "figure", kind: "ie-graph", caption: "First ionization energies for periods 1 – 3." },
      {
        k: "bullets",
        items: [
          "**First ionization energy of Helium is greater than Hydrogen [He > H]:** nuclear charge is greater — one extra proton in Helium; the extra electron has gone into the same energy level; increased attraction makes the electron harder to remove.",
        ],
      },
      { k: "h", text: "Deviation between group 2 & 3" },
      {
        k: "bullets",
        items: [
          "**First ionization energy of Boron is less than Beryllium [B < Be].** Beryllium [4]: 1s² 2s² — Boron [5]: 1s² 2s² 2p¹.",
          "Despite the increased nuclear charge, the outer electron is held less strongly.",
          "The outermost electron of boron is in a **2p orbital**, which is higher in energy than the 2s orbital of beryllium.",
          "Nuclear attraction is less in boron because the 2p electrons in boron experiences greater electron-electron repulsion (greater shielding) than that in beryllium.",
          "Less energy is required to remove an electron from boron.",
        ],
      },
      {
        k: "bullets",
        items: [
          "**First ionization energy of Aluminium is less than Magnesium [Al < Mg].** Magnesium [12]: 1s² 2s² 2p⁶3s² — Aluminium [13]: 1s² 2s² 2p⁶3s²3p¹.",
          "Despite the increased nuclear charge, the outer electron is held less strongly.",
          "The outermost electron of Aluminium is in a **3p orbital**, which is higher in energy than the 3s orbital of Magnesium.",
          "Nuclear attraction is less in aluminium because the 3p electrons in aluminium experiences greater electron-electron repulsion (greater shielding) than that in magnesium.",
          "Less energy is required to remove an electron from aluminium.",
        ],
      },
      { k: "h", text: "Deviation between group 5 & 6" },
      {
        k: "bullets",
        items: [
          "**First ionization energy of Oxygen is less than Nitrogen [O < N].** Nitrogen [7]: 1s² 2s² 2p³ — Oxygen [8]: 1s² 2s² 2p⁴.",
          "Despite the increased nuclear charge the electron is easier to remove.",
          "The 2p electron removed from oxygen is a **paired electron**, whereas the 2p electron from nitrogen is an **unpaired electron**.",
          "When electrons are paired, the extra mutual repulsion results in less energy being required to remove an electron.",
          "Hence less energy is required to remove an electron from oxygen.",
        ],
      },
      {
        k: "bullets",
        items: [
          "**First ionization energy of Sulfur is less than Phosphorous [S < P].** Phosphorous [15]: 1s² 2s²2p⁶ 3s²3p³ — Sulfur [16]: 1s² 2s² 2p⁶3s²3p⁴.",
          "Despite the increased nuclear charge the electron is easier to remove.",
          "The 3p electron removed from sulfur is a **paired electron**, whereas the 3p electron from phosphorous is an **unpaired electron**.",
          "When electrons are paired, the extra mutual repulsion results in less energy being required to remove an electron.",
          "Hence less energy is required to remove an electron from sulfur.",
        ],
      },
      { k: "checkpoint", page: 55 },
      { k: "h", text: "(iii) Ionisation energy down a group" },
      { k: "p", text: "Ionization energy ==decreases== down the group. This is because:" },
      {
        k: "bullets",
        items: [
          "Down the group, the atomic size increases and the number of shells increases.",
          "Distance between the nucleus and the outer electrons increases.",
          "The outer electrons are more shielded by the electrons in the inner shells.",
          "The effect of the increase in nuclear charge is outweighed by the increase in shielding.",
          "Therefore, the outer electrons are less attracted by the nucleus. Hence, less energy is required to remove the electrons.",
        ],
      },
      {
        k: "note",
        label: "The four deviations",
        text: "**B < Be and Al < Mg:** the outer electron sits in a ==p orbital, higher in energy== than the s orbital below it, with greater electron–electron repulsion (greater shielding) — so less energy removes it, despite the higher nuclear charge. **O < N and S < P:** the electron removed is ==paired==; the extra mutual repulsion inside the paired orbital makes it easier to remove than an unpaired electron.",
      },
    ],
  },
];
