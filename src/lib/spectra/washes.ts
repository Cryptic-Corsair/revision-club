/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the water interface's washes
   The water reader's colour system. A wash dresses the whole
   interface: the field the caustics refract (the baked gradient
   art + the shader's back/highlight pair), the content sheets that
   carry the chemistry, the one accent the reader speaks, and the
   ink that sits straight on the water.

   The spec rooms have NO ground of their own — they are transparent,
   so the living water shows at full strength behind every section.
   That makes two invariants every wash must keep:
   · the CONTENT SHEET (the dress's --color-paper: worked examples,
     key terms, figure grounds — everything that must hold still)
     carries the reading contrast: near-white wash-tinted sheets in
     the pale washes with the dark ink ladder; over the deep abyss a
     LIFTED navy sheet (the classic espresso rooms' recipe — the card
     sits a step above the water) with the ink ladder flipped to
     milk. Figures are token-driven (INK = var(--color-ink), PAPER =
     var(--color-paper)), so they follow the flip for free.
   · the ink on the water is the wash's own: deep sea-navy over the
     pale washes, milk over the abyss — held against the brightest
     caustic filament it crosses (the abyss moonlight runs a step
     dimmer for exactly this reason).

   Lagoon is the factory wash — blueish, the sea the interface is
   named for. Pure data, no React: prefs.ts owns the pref, the panel
   paints the swatches, the reader applies the tokens.
   ═══════════════════════════════════════════════════════════════ */

export type WashId = "lagoon" | "tide" | "reef" | "glacier" | "abyss";

export interface Wash {
  id: WashId;
  label: string;
  blurb: string;
  /* the field the caustics refract */
  colorBack: string;
  colorHighlight: string;
  /* the baked gradient wash: a diagonal base, the strong hue pocket
     (upper right), the secondary current (lower left), the light
     core — the same four-layer structure the portal hero's art uses */
  art: {
    base: [string, string, string];
    pocket: string;
    current: string;
    pearl: string;
  };
  /* the ink ladder that sits straight on the water — rooms are
      transparent, so this is the reading ink everywhere outside the
      content sheets */
  ink: string;
  inkSoft: string;
  inkFaint: string;
  /* the content-sheet base — the dress's --color-paper. Near-white
      in the pale washes; the abyss lifts a navy step above the water
      (classic's card recipe) so sheets still read as cards. */
  sheet: string;
  /* the interface's one accent + the ink that reads on it */
  accent: string;
  accentInk: string;
  /* the panel swatch */
  chip: string;
}

export const WASHES: Wash[] = [
  {
    id: "lagoon",
    label: "Lagoon",
    blurb: "Pale sea-blue, the factory wash",
    colorBack: "#E4F1F7",
    colorHighlight: "#2E86AB",
    art: {
      base: ["#EAF5F9", "#DCF0F6", "#C9E7F2"],
      pocket: "#58B7E0",
      current: "#3E9BC9",
      pearl: "#F2FAFD",
    },
    ink: "#16394B",
    inkSoft: "#3D6274",
    inkFaint: "#5E8296",
    sheet: "#F7FBFD",
    accent: "#16719B",
    accentInk: "#F5FBFD",
    chip: "#58B7E0",
  },
  {
    id: "tide",
    label: "Tide",
    blurb: "Green sea-glass shallows",
    colorBack: "#E2F2EB",
    colorHighlight: "#178268",
    art: {
      base: ["#E9F5EF", "#DBF0E7", "#C5E8DB"],
      pocket: "#45B894",
      current: "#2E9E82",
      pearl: "#F1FAF5",
    },
    ink: "#14403A",
    inkSoft: "#3C645C",
    inkFaint: "#5F837B",
    sheet: "#F2FAF6",
    accent: "#147A62",
    accentInk: "#F2FBF7",
    chip: "#45B894",
  },
  {
    id: "reef",
    label: "Reef",
    blurb: "Coral dawn over warm water",
    colorBack: "#FAEFE7",
    colorHighlight: "#D96A4B",
    art: {
      base: ["#FCF1EA", "#FAE7DC", "#F6DCCA"],
      pocket: "#FF9E7A",
      current: "#F27E5F",
      pearl: "#FEF6F0",
    },
    ink: "#43241A",
    inkSoft: "#74574A",
    inkFaint: "#93776A",
    sheet: "#FEF7F3",
    accent: "#C05A3E",
    accentInk: "#FEF6F2",
    chip: "#FF9E7A",
  },
  {
    id: "glacier",
    label: "Glacier",
    blurb: "Cold pale ice-blue light",
    colorBack: "#EDF3F9",
    colorHighlight: "#4A7FA8",
    art: {
      base: ["#F3F7FB", "#E9F0F7", "#DCE9F3"],
      pocket: "#9CC3E4",
      current: "#7FAED4",
      pearl: "#FAFDFF",
    },
    ink: "#26384A",
    inkSoft: "#4E6478",
    inkFaint: "#71869A",
    sheet: "#F8FBFE",
    accent: "#3E6E96",
    accentInk: "#F7FAFD",
    chip: "#9CC3E4",
  },
  {
    id: "abyss",
    label: "Abyss",
    blurb: "Deep navy water, moonlight",
    colorBack: "#101E30",
    /* the moonlight runs a step dimmer than the other washes' glow:
       milk ink must hold against the brightest caustic filament it
       crosses, not just the dark water between them */
    colorHighlight: "#C9A469",
    art: {
      base: ["#16283E", "#101E30", "#0C1725"],
      pocket: "#2E5B8C",
      current: "#1E4266",
      pearl: "#C9A469",
    },
    ink: "#EAF3FA",
    inkSoft: "#B9CBDC",
    inkFaint: "#8FA8C0",
    sheet: "#2A3B55",
    accent: "#D9A65F",
    accentInk: "#22303F",
    chip: "#C9A469",
  },
];

export const DEFAULT_WASH: WashId = "lagoon";

export const WASH_IDS: ReadonlySet<string> = new Set(WASHES.map((w) => w.id));

export const washById = (id: WashId): Wash =>
  WASHES.find((w) => w.id === id) ?? WASHES[0];
