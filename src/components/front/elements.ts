/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the cast data

   The thirty-six elements the specification names before AS is
   over — Z=1…36, tinted by textbook category. Pure data; every
   chapter reads the theme's own ink from CSS vars at render time,
   so the four labs re-ink the front without a re-mount.
   ═══════════════════════════════════════════════════════════════ */

export type Element = {
  z: number;
  sym: string;
  name: string;
  cat: keyof typeof CAT_COLOR;
};

export const CAT_COLOR: Record<string, string> = {
  alkali: "#FF5C7A",
  alkaline: "#FF9A4D",
  transition: "#D9A514",
  post: "#5C9E30",
  metalloid: "#0FA48A",
  nonmetal: "#0E9BD8",
  halogen: "#3B7DE0",
  noble: "#8B5CF6",
};

export const CAT_LABEL: Record<string, string> = {
  alkali: "Alkali metal",
  alkaline: "Alkaline earth",
  transition: "Transition metal",
  post: "Post-transition",
  metalloid: "Metalloid",
  nonmetal: "Non-metal",
  halogen: "Halogen",
  noble: "Noble gas",
};

const RAW: [string, string, string][] = [
  ["H", "Hydrogen", "nonmetal"],
  ["He", "Helium", "noble"],
  ["Li", "Lithium", "alkali"],
  ["Be", "Beryllium", "alkaline"],
  ["B", "Boron", "metalloid"],
  ["C", "Carbon", "nonmetal"],
  ["N", "Nitrogen", "nonmetal"],
  ["O", "Oxygen", "nonmetal"],
  ["F", "Fluorine", "halogen"],
  ["Ne", "Neon", "noble"],
  ["Na", "Sodium", "alkali"],
  ["Mg", "Magnesium", "alkaline"],
  ["Al", "Aluminium", "post"],
  ["Si", "Silicon", "metalloid"],
  ["P", "Phosphorus", "nonmetal"],
  ["S", "Sulfur", "nonmetal"],
  ["Cl", "Chlorine", "halogen"],
  ["Ar", "Argon", "noble"],
  ["K", "Potassium", "alkali"],
  ["Ca", "Calcium", "alkaline"],
  ["Sc", "Scandium", "transition"],
  ["Ti", "Titanium", "transition"],
  ["V", "Vanadium", "transition"],
  ["Cr", "Chromium", "transition"],
  ["Mn", "Manganese", "transition"],
  ["Fe", "Iron", "transition"],
  ["Co", "Cobalt", "transition"],
  ["Ni", "Nickel", "transition"],
  ["Cu", "Copper", "transition"],
  ["Zn", "Zinc", "transition"],
  ["Ga", "Gallium", "post"],
  ["Ge", "Germanium", "metalloid"],
  ["As", "Arsenic", "metalloid"],
  ["Se", "Selenium", "nonmetal"],
  ["Br", "Bromine", "halogen"],
  ["Kr", "Krypton", "noble"],
];

export const ELEMENTS: Element[] = RAW.map(([sym, name, cat], i) => ({
  z: i + 1,
  sym,
  name,
  cat,
}));

/* the marquee rows: 18 tiles per row, two counter-drifting rows */
export const ROW_A = ELEMENTS.slice(0, 18);
export const ROW_B = ELEMENTS.slice(18);
