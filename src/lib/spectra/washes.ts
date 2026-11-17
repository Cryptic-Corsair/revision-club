/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the water interface's washes
   The water reader's colour system. A wash dresses the whole
   interface: the field the caustics refract (the baked gradient
   art + the shader's back/highlight pair), the glass grounds the
   spec rooms alternate, the one accent the reader speaks, and the
   ink that sits straight on the open water (hero, contents, the
   end of the note).

   Two invariants every wash must keep:
   · the GLASS rooms stay light in every wash (near-white tints
     toward the wash's hue) — the reading surfaces inside them keep
     the site's daylight tokens and their verified contrast, in the
     pale washes and over the deep abyss alike. The wash expresses
     itself in the field, the open water and the accent, never by
     flipping the ink inside a chemistry section.
   · the ink that sits ON the open water is the wash's own (milk
     over the abyss, deep sea-navy over the lagoon) — the open zones
     re-point the daylight ink tokens locally, so the shared chip
     and toggle styles read the wash without being told.

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
  /* ink that sits straight on the open water (hero, contents, the
      end of the note — over the field itself) */
  ink: string;
  inkSoft: string;
  inkFaint: string;
  /* ink INSIDE the glass rooms — the reading surfaces. Light in
      every wash (the glass stays light), so the chemistry keeps its
      daylight contrast even over the deep abyss. */
  roomInk: string;
  roomInkSoft: string;
  roomInkFaint: string;
  /* the interface's one accent + the ink that reads on it */
  accent: string;
  accentInk: string;
  /* the two glass grounds the spec rooms alternate (rgba — the
     water shows through by design) */
  glassA: string;
  glassB: string;
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
    roomInk: "#16394B",
    roomInkSoft: "#3D6274",
    roomInkFaint: "#5E8296",
    accent: "#16719B",
    accentInk: "#F5FBFD",
    glassA: "rgba(244, 250, 252, 0.84)",
    glassB: "rgba(222, 240, 248, 0.88)",
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
    roomInk: "#14403A",
    roomInkSoft: "#3C645C",
    roomInkFaint: "#5F837B",
    accent: "#147A62",
    accentInk: "#F2FBF7",
    glassA: "rgba(243, 250, 246, 0.84)",
    glassB: "rgba(220, 240, 233, 0.88)",
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
    roomInk: "#43241A",
    roomInkSoft: "#74574A",
    roomInkFaint: "#93776A",
    accent: "#C05A3E",
    accentInk: "#FEF6F2",
    glassA: "rgba(253, 246, 241, 0.84)",
    glassB: "rgba(250, 235, 226, 0.88)",
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
    roomInk: "#26384A",
    roomInkSoft: "#4E6478",
    roomInkFaint: "#71869A",
    accent: "#3E6E96",
    accentInk: "#F7FAFD",
    glassA: "rgba(249, 252, 254, 0.82)",
    glassB: "rgba(234, 243, 250, 0.86)",
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
    roomInk: "#22303F",
    roomInkSoft: "#4E6478",
    roomInkFaint: "#71869A",
    accent: "#D9A65F",
    accentInk: "#22303F",
    glassA: "rgba(240, 246, 252, 0.9)",
    glassB: "rgba(225, 236, 246, 0.92)",
    chip: "#DFBC91",
  },
];

export const DEFAULT_WASH: WashId = "lagoon";

export const WASH_IDS: ReadonlySet<string> = new Set(WASHES.map((w) => w.id));

export const washById = (id: WashId): Wash =>
  WASHES.find((w) => w.id === id) ?? WASHES[0];
