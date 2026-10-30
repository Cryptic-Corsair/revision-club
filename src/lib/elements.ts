/* ————————————————————————————————————————————————
   THE WALLCHART · element dataset
   118 elements. First ionisation energies are the
   standard data-booklet values, kJ mol⁻¹ (rounded);
   blank = not measured / predicted only.
   ———————————————————————————————————————————————— */

export type ElState = "solid" | "liquid" | "gas" | "?";
export type ElCategory =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide"
  | "unknown";

export interface Element {
  z: number;
  sym: string;
  name: string;
  group: number; // 0 = f-block (detached rows)
  period: number; // main-table period (f-block rendered in rows 8–9)
  cat: ElCategory;
  state: ElState;
  ie?: number; // first ionisation energy, kJ mol⁻¹
  quip?: string; // the teacher's margin note
}

/* [Z, sym, name, group, period, cat, state, ie?, quip?] */
type Row = [number, string, string, number, number, ElCategory, ElState, number?, string?];

const RAW: Row[] = [
  [1, "H", "Hydrogen", 1, 1, "nonmetal", "gas", 1312, "the lightest — and ~90% of all atoms"],
  [2, "He", "Helium", 18, 1, "noble", "gas", 2372, "full shell, happiest of all"],
  [3, "Li", "Lithium", 1, 2, "alkali", "solid", 520, "floats on oil, fizzes in water"],
  [4, "Be", "Beryllium", 2, 2, "alkaline", "solid", 900],
  [5, "B", "Boron", 13, 2, "metalloid", "solid", 801],
  [6, "C", "Carbon", 14, 2, "nonmetal", "solid", 1086, "the backbone of the whole organic half"],
  [7, "N", "Nitrogen", 15, 2, "nonmetal", "gas", 1402, "78% of every breath you take"],
  [8, "O", "Oxygen", 16, 2, "nonmetal", "gas", 1314, "learn O²⁻ and the oxides tables early"],
  [9, "F", "Fluorine", 17, 2, "halogen", "gas", 1681, "the most electronegative element"],
  [10, "Ne", "Neon", 18, 2, "noble", "gas", 2081],
  [11, "Na", "Sodium", 1, 3, "alkali", "solid", 496, "the street-lamp metal — learn its tests"],
  [12, "Mg", "Magnesium", 2, 3, "alkaline", "solid", 738, "bright white flame — do not stare"],
  [13, "Al", "Aluminium", 13, 3, "post", "solid", 578, "dip no. 1 — first electron in 3p"],
  [14, "Si", "Silicon", 14, 3, "metalloid", "solid", 789],
  [15, "P", "Phosphorus", 15, 3, "nonmetal", "solid", 1012],
  [16, "S", "Sulfur", 16, 3, "nonmetal", "solid", 1000, "dip no. 2 — 3p⁴, the paired electron"],
  [17, "Cl", "Chlorine", 17, 3, "halogen", "gas", 1251, "bleach, pools and every displacement question"],
  [18, "Ar", "Argon", 18, 3, "noble", "gas", 1521],
  [19, "K", "Potassium", 1, 4, "alkali", "solid", 419, "lilac flame — Group 1's showman"],
  [20, "Ca", "Calcium", 2, 4, "alkaline", "solid", 590, "brick-red flame; limestone's core"],
  [21, "Sc", "Scandium", 3, 4, "transition", "solid", 633],
  [22, "Ti", "Titanium", 4, 4, "transition", "solid", 658],
  [23, "V", "Vanadium", 5, 4, "transition", "solid", 651, "four oxidation states, four colours — a Unit 5 favourite"],
  [24, "Cr", "Chromium", 6, 4, "transition", "solid", 653, "3d⁵4s¹ — the exception worth knowing"],
  [25, "Mn", "Manganese", 7, 4, "transition", "solid", 717],
  [26, "Fe", "Iron", 8, 4, "transition", "solid", 763, "the most-examined metal in the paper"],
  [27, "Co", "Cobalt", 9, 4, "transition", "solid", 760],
  [28, "Ni", "Nickel", 10, 4, "transition", "solid", 737],
  [29, "Cu", "Copper", 11, 4, "transition", "solid", 745, "blue complexes, red-brown metal — and 3d¹⁰4s¹"],
  [30, "Zn", "Zinc", 12, 4, "transition", "solid", 906, "a d-block element that isn't a transition metal — why?"],
  [31, "Ga", "Gallium", 13, 4, "post", "solid", 579],
  [32, "Ge", "Germanium", 14, 4, "metalloid", "solid", 762],
  [33, "As", "Arsenic", 15, 4, "metalloid", "solid", 947],
  [34, "Se", "Selenium", 16, 4, "nonmetal", "solid", 941],
  [35, "Br", "Bromine", 17, 4, "halogen", "liquid", 1140, "the only liquid nonmetal — orange, volatile"],
  [36, "Kr", "Krypton", 18, 4, "noble", "gas", 1351],
  [37, "Rb", "Rubidium", 1, 5, "alkali", "solid", 403],
  [38, "Sr", "Strontium", 2, 5, "alkaline", "solid", 550, "crimson flame"],
  [39, "Y", "Yttrium", 3, 5, "transition", "solid", 600],
  [40, "Zr", "Zirconium", 4, 5, "transition", "solid", 640],
  [41, "Nb", "Niobium", 5, 5, "transition", "solid", 652],
  [42, "Mo", "Molybdenum", 6, 5, "transition", "solid", 684],
  [43, "Tc", "Technetium", 7, 5, "transition", "solid", 702, "the synthetic one — no stable isotopes at all"],
  [44, "Ru", "Ruthenium", 8, 5, "transition", "solid", 710],
  [45, "Rh", "Rhodium", 9, 5, "transition", "solid", 703],
  [46, "Pd", "Palladium", 10, 5, "transition", "solid", 804],
  [47, "Ag", "Silver", 11, 5, "transition", "solid", 731, "the halide-test metal — white, cream, yellow"],
  [48, "Cd", "Cadmium", 12, 5, "transition", "solid", 868],
  [49, "In", "Indium", 13, 5, "post", "solid", 558],
  [50, "Sn", "Tin", 14, 5, "post", "solid", 709, "SnCl₂ — the reducing agent to remember"],
  [51, "Sb", "Antimony", 15, 5, "metalloid", "solid", 834],
  [52, "Te", "Tellurium", 16, 5, "metalloid", "solid", 869],
  [53, "I", "Iodine", 17, 5, "halogen", "solid", 1008, "grey solid, purple vapour — quote both"],
  [54, "Xe", "Xenon", 18, 5, "noble", "gas", 1170],
  [55, "Cs", "Caesium", 1, 6, "alkali", "solid", 376, "melts in your hand — the most reactive stable alkali"],
  [56, "Ba", "Barium", 2, 6, "alkaline", "solid", 503, "apple-green flame; BaSO₄ is the swallowed one"],
  [57, "La", "Lanthanum", 0, 6, "lanthanide", "solid", 538],
  [58, "Ce", "Cerium", 0, 6, "lanthanide", "solid", 534],
  [59, "Pr", "Praseodymium", 0, 6, "lanthanide", "solid", 527],
  [60, "Nd", "Neodymium", 0, 6, "lanthanide", "solid", 533],
  [61, "Pm", "Promethium", 0, 6, "lanthanide", "solid", 552],
  [62, "Sm", "Samarium", 0, 6, "lanthanide", "solid", 545],
  [63, "Eu", "Europium", 0, 6, "lanthanide", "solid", 547],
  [64, "Gd", "Gadolinium", 0, 6, "lanthanide", "solid", 593],
  [65, "Tb", "Terbium", 0, 6, "lanthanide", "solid", 566],
  [66, "Dy", "Dysprosium", 0, 6, "lanthanide", "solid", 573],
  [67, "Ho", "Holmium", 0, 6, "lanthanide", "solid", 581],
  [68, "Er", "Erbium", 0, 6, "lanthanide", "solid", 589],
  [69, "Tm", "Thulium", 0, 6, "lanthanide", "solid", 597],
  [70, "Yb", "Ytterbium", 0, 6, "lanthanide", "solid", 603],
  [71, "Lu", "Lutetium", 0, 6, "lanthanide", "solid", 524],
  [72, "Hf", "Hafnium", 4, 6, "transition", "solid", 659],
  [73, "Ta", "Tantalum", 5, 6, "transition", "solid", 761],
  [74, "W", "Tungsten", 6, 6, "transition", "solid", 770, "filaments — highest melting point of all metals"],
  [75, "Re", "Rhenium", 7, 6, "transition", "solid", 760],
  [76, "Os", "Osmium", 8, 6, "transition", "solid", 840, "densest element on the table"],
  [77, "Ir", "Iridium", 9, 6, "transition", "solid", 880],
  [78, "Pt", "Platinum", 10, 6, "transition", "solid", 860],
  [79, "Au", "Gold", 11, 6, "transition", "solid", 890, "keeps its shine — check its electrode potential"],
  [80, "Hg", "Mercury", 12, 6, "transition", "liquid", 1007, "liquid metal — gone from labs, still in questions"],
  [81, "Tl", "Thallium", 13, 6, "post", "solid", 589],
  [82, "Pb", "Lead", 14, 6, "post", "solid", 716, "the plumb in plumbing — and in PbO₂ electrodes"],
  [83, "Bi", "Bismuth", 15, 6, "post", "solid", 703],
  [84, "Po", "Polonium", 16, 6, "metalloid", "solid", 812],
  [85, "At", "Astatine", 17, 6, "halogen", "solid", 890, "rarest naturally-occurring element — under 30 g on Earth"],
  [86, "Rn", "Radon", 18, 6, "noble", "gas", 1037],
  [87, "Fr", "Francium", 1, 7, "alkali", "solid", 380],
  [88, "Ra", "Radium", 2, 7, "alkaline", "solid", 509],
  [89, "Ac", "Actinium", 0, 7, "actinide", "solid", 499],
  [90, "Th", "Thorium", 0, 7, "actinide", "solid", 587],
  [91, "Pa", "Protactinium", 0, 7, "actinide", "solid", 568],
  [92, "U", "Uranium", 0, 7, "actinide", "solid", 598, "fuel rods — and the ¹⁴C dating questions"],
  [93, "Np", "Neptunium", 0, 7, "actinide", "solid", 604],
  [94, "Pu", "Plutonium", 0, 7, "actinide", "solid", 585],
  [95, "Am", "Americium", 0, 7, "actinide", "solid", 578],
  [96, "Cm", "Curium", 0, 7, "actinide", "solid", 581],
  [97, "Bk", "Berkelium", 0, 7, "actinide", "solid", 601],
  [98, "Cf", "Californium", 0, 7, "actinide", "solid", 608],
  [99, "Es", "Einsteinium", 0, 7, "actinide", "solid", 619],
  [100, "Fm", "Fermium", 0, 7, "actinide", "solid", 627],
  [101, "Md", "Mendelevium", 0, 7, "actinide", "solid", 635],
  [102, "No", "Nobelium", 0, 7, "actinide", "solid", 642],
  [103, "Lr", "Lawrencium", 0, 7, "actinide", "solid", 470],
  [104, "Rf", "Rutherfordium", 4, 7, "transition", "?"],
  [105, "Db", "Dubnium", 5, 7, "transition", "?"],
  [106, "Sg", "Seaborgium", 6, 7, "transition", "?"],
  [107, "Bh", "Bohrium", 7, 7, "transition", "?"],
  [108, "Hs", "Hassium", 8, 7, "transition", "?"],
  [109, "Mt", "Meitnerium", 9, 7, "unknown", "?"],
  [110, "Ds", "Darmstadtium", 10, 7, "unknown", "?"],
  [111, "Rg", "Roentgenium", 11, 7, "unknown", "?"],
  [112, "Cn", "Copernicium", 12, 7, "unknown", "?", undefined, "predicted liquid — physics says yes"],
  [113, "Nh", "Nihonium", 13, 7, "unknown", "?"],
  [114, "Fl", "Flerovium", 14, 7, "unknown", "?"],
  [115, "Mc", "Moscovium", 15, 7, "unknown", "?"],
  [116, "Lv", "Livermorium", 16, 7, "unknown", "?"],
  [117, "Ts", "Tennessine", 17, 7, "halogen", "?", undefined, "a halogen in name only"],
  [118, "Og", "Oganesson", 18, 7, "noble", "?", undefined, "heaviest atom ever made — a few atoms, ever"],
];

export const ELEMENTS: Element[] = RAW.map(([z, sym, name, group, period, cat, state, ie, quip]) => ({
  z,
  sym,
  name,
  group,
  period,
  cat,
  state,
  ie,
  quip,
}));

export const BY_Z = new Map(ELEMENTS.map((e) => [e.z, e]));

/* grid geometry: main table rows 1–7, detached f-block rows 8–9 */
export function gridPos(el: Element): { row: number; col: number } {
  if (el.group === 0) {
    const row = el.z <= 71 ? 8 : 9;
    const col = 3 + (el.z <= 71 ? el.z - 57 : el.z - 89);
    return { row, col };
  }
  return { row: el.period, col: el.group };
}

export const BLOCKS: Record<string, { label: string; hint: string }> = {
  s: { label: "s-block", hint: "Groups 1–2 + He — outer electron in an s sub-shell" },
  p: { label: "p-block", hint: "Groups 13–18 — outer electron in a p sub-shell" },
  d: { label: "d-block", hint: "Groups 3–12 — the transition metals" },
  f: { label: "f-block", hint: "the lanthanides and actinides" },
};

export function blockOf(el: Element): "s" | "p" | "d" | "f" {
  if (el.group === 0) return "f";
  if (el.group <= 2 || el.z === 2) return "s";
  if (el.group >= 13) return "p";
  return "d";
}
