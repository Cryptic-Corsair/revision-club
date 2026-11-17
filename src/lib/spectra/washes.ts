/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the water interface's washes
   The water reader's colour system. A wash dresses the whole
   interface: the field the caustics refract (the baked gradient
   art + the shader's back/highlight pair), the content sheets that
   carry the chemistry, the one accent the reader speaks, and the
   ink that sits straight on the water.

   Every wash runs the reference site's own palette family — the
   @paper-design water's deep look: a DEEP water body (blue-slate,
   green-slate, dusk-plum, ice-slate, navy — the wash's identity is
   the body's hue), a warm MOONLIGHT drift baked into the art, and a
   champagne-family highlight for the caustic glints. The spec rooms
   have NO ground of their own — the living water shows at full
   strength behind every section — so two invariants hold:
   · the CONTENT SHEET (the dress's --color-paper: worked examples,
     key terms, figure grounds — everything that must hold still) is
     the water body lifted a step ABOVE itself (classic's espresso
     card recipe, per wash), and the ink ladder is MILK everywhere —
     figures are token-driven (INK = var(--color-ink), PAPER =
     var(--color-paper)), so they follow the flip for free.
   · the milk ink is held against the brightest caustic filament it
     crosses: the moonlight drift cores run at the reference's own
     opacities, and the abyss's gold drift stays a step dimmer than
     the factory lagoon's for exactly this reason.

   Lagoon is the factory wash — the reference's own global-backdrop
   palette, verbatim. Pure data, no React: prefs.ts owns the pref,
   the panel paints the swatches, the reader applies the tokens.
   ═══════════════════════════════════════════════════════════════ */

export type WashId = "lagoon" | "tide" | "reef" | "glacier" | "abyss";

export interface Wash {
  id: WashId;
  label: string;
  blurb: string;
  /* the field the caustics refract */
  colorBack: string;
  colorHighlight: string;
  /* the baked gradient wash: a diagonal deep base, the moonlight
     drift (bright core → warm mid → far fade, upper right), the
     silver current (bright core → cool mid, lower left), the pearl
     sheen (core → mid) — the reference's four-layer backdrop
     structure, hue-shifted per wash */
  art: {
    base: [string, string, string];
    pocket: [string, string, string];
    current: [string, string];
    pearl: [string, string];
  };
  /* the milk ink ladder that sits straight on the deep water —
      rooms are transparent, so this is the reading ink everywhere
      outside the content sheets */
  ink: string;
  inkSoft: string;
  inkFaint: string;
  /* the content-sheet base — the dress's --color-paper: the water
      body lifted a step above itself, so cards read as cards on the
      deep water */
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
    blurb: "Deep sea-slate, the factory wash",
    colorBack: "#1B222E",
    colorHighlight: "#E6C99E",
    art: {
      base: ["#1E2736", "#2B374A", "#18202C"],
      pocket: ["#EBD4B4", "#DFBC91", "#6F6768"],
      current: ["#AEC2D6", "#6E839B"],
      pearl: ["#C8C4BC", "#4A596E"],
    },
    ink: "#EAF3FA",
    inkSoft: "#B6C8D8",
    inkFaint: "#8CA4BA",
    sheet: "#2B374A",
    accent: "#5BA8CF",
    accentInk: "#0E2233",
    chip: "#E6C99E",
  },
  {
    id: "tide",
    label: "Tide",
    blurb: "Deep green shallows at dusk",
    colorBack: "#182420",
    colorHighlight: "#CFDFB9",
    art: {
      base: ["#1B2B26", "#2A3C35", "#141F1B"],
      pocket: ["#DCE8C8", "#C2D8A8", "#5E6E52"],
      current: ["#A9C9B8", "#5E8377"],
      pearl: ["#BECBC0", "#46584E"],
    },
    ink: "#EAF3FA",
    inkSoft: "#B2C9BC",
    inkFaint: "#85A694",
    sheet: "#2A3C35",
    accent: "#56B394",
    accentInk: "#0F241C",
    chip: "#CFDFB9",
  },
  {
    id: "reef",
    label: "Reef",
    blurb: "Coral dusk over deep water",
    colorBack: "#221B28",
    colorHighlight: "#F0C4A4",
    art: {
      base: ["#271F2C", "#372C40", "#1B1620"],
      pocket: ["#F5D0B0", "#E8A87C", "#8A5E48"],
      current: ["#C7A9B6", "#7E6572"],
      pearl: ["#C8B4BC", "#5A4A56"],
    },
    ink: "#F5EFF4",
    inkSoft: "#D0BCC6",
    inkFaint: "#A48E9C",
    sheet: "#372C40",
    accent: "#E98B6B",
    accentInk: "#2B1712",
    chip: "#F0C4A4",
  },
  {
    id: "glacier",
    label: "Glacier",
    blurb: "Deep ice-slate, cold moonlight",
    colorBack: "#1A2430",
    colorHighlight: "#D9E4EF",
    art: {
      base: ["#1E2836", "#2E3C50", "#161D28"],
      pocket: ["#E8EEF4", "#C2D4E4", "#6E7E90"],
      current: ["#B8C9DC", "#6E839B"],
      pearl: ["#C4CDD8", "#4E5E72"],
    },
    ink: "#EEF4F9",
    inkSoft: "#C2D2E0",
    inkFaint: "#94A9BC",
    sheet: "#2E3C50",
    accent: "#7FA8CE",
    accentInk: "#12202E",
    chip: "#D9E4EF",
  },
  {
    id: "abyss",
    label: "Abyss",
    blurb: "Deepest navy, gold moonlight",
    colorBack: "#101E30",
    /* the gold drift runs a step dimmer than the factory lagoon's:
       milk ink must hold against the brightest caustic filament it
       crosses, not just the dark water between them */
    colorHighlight: "#C9A469",
    art: {
      base: ["#16283E", "#101E30", "#0C1725"],
      pocket: ["#D9B87C", "#C9A469", "#6E5E44"],
      current: ["#8FA8C0", "#3E5B78"],
      pearl: ["#C9C4B8", "#3E5470"],
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
