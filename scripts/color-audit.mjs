/* Audit: OKLCH lightness (L) of every dark-mode surface + contrast steps.
   Run: node scripts/color-audit.mjs */
const hex2rgb = (h) => {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
};
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const srgb2oklab = ([r, g, b]) => {
  [r, g, b] = [lin(r), lin(g), lin(b)];
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
};
const relLum = (h) => {
  const [r, g, b] = hex2rgb(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const la = relLum(a), lb = relLum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};
const L = (h) => +srgb2oklab(hex2rgb(h)).L.toFixed(3);

const roasts = {
  0: { cream: "#201810", paper: "#342818", cocoa: "#1a1009", tint: "#443220", room: "#2e2016" },
  1: { cream: "#1e1b17", paper: "#302b24", cocoa: "#16130f", tint: "#3e372e", room: "#2a2119" },
  2: { cream: "#221511", paper: "#38241a", cocoa: "#190e08", tint: "#47301e", room: "#31180f" },
  3: { cream: "#191412", paper: "#2c231c", cocoa: "#130e0b", tint: "#3a2e24", room: "#261c15" },
};

const bandMix = (accent, tint, pct) => {
  // color-mix in oklab, approximated in oklab
  const A = srgb2oklab(hex2rgb(accent)), T = srgb2oklab(hex2rgb(tint));
  const mix = {
    L: A.L * (pct / 100) + T.L * (1 - pct / 100),
    a: A.a * (pct / 100) + T.a * (1 - pct / 100),
    b: A.b * (pct / 100) + T.b * (1 - pct / 100),
  };
  // oklab -> srgb (rough, for L display only)
  const l_ = mix.L + 0.3963377774 * mix.a + 0.2158037573 * mix.b;
  const m_ = mix.L - 0.1055613458 * mix.a - 0.0638541728 * mix.b;
  const s_ = mix.L - 0.0894841775 * mix.a - 1.291485548 * mix.b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const gam = (c) => Math.round(255 * Math.min(1, Math.max(0, c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)));
  const hex = "#" + [r, g, b].map(gam).map((v) => v.toString(16).padStart(2, "0")).join("");
  return hex;
};

const CORAL = "#FF6B6B";
console.log("== CURRENT DARK ROASTS (OKLCH L) ==");
for (const [k, r] of Object.entries(roasts)) {
  const bandCoral = bandMix(CORAL, r.tint, k === "0" ? 14 : 14);
  console.log(
    `roast ${k}: footer ${L(r.cocoa)} | page ${L(r.cream)} | card ${L(r.paper)} | tint-base ${L(r.tint)} | band(coral14) ${L(bandCoral)} (${bandCoral}) | room ${L(r.room)}`
  );
  console.log(
    `   steps: footer→page Δ${+(L(r.cream) - L(r.cocoa)).toFixed(3)} | page→card Δ${+(L(r.paper) - L(r.cream)).toFixed(3)} | page→band Δ${+(L(bandCoral) - L(r.cream)).toFixed(3)} | WCAG footer:page ${contrast(r.cocoa, r.cream).toFixed(2)}:1 page:card ${contrast(r.cream, r.paper).toFixed(2)}:1`
  );
}
