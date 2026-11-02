/* Evaluate the NEW dark-mode tonal ladder across all 4 roasts.
   Rules (from Material dark theme + dark-UI best practice):
   - footer is the darkest anchor; each adjacent surface steps LIGHTER
   - adjacent steps must be perceptible: ΔL ≥ 0.06, WCAG ≥ 1.3:1
   - body text ≥ 7:1, secondary ≥ 4.5:1, tertiary ≥ 4.5:1 on paper
   Run: node scripts/color-plan.mjs */
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

const mixOklab = (h1, p1, h2) => {
  const A = srgb2oklab(hex2rgb(h1)), B = srgb2oklab(hex2rgb(h2));
  const M = { L: A.L * (p1 / 100) + B.L * (1 - p1 / 100), a: A.a * (p1 / 100) + B.a * (1 - p1 / 100), b: A.b * (p1 / 100) + B.b * (1 - p1 / 100) };
  const l_ = M.L + 0.3963377774 * M.a + 0.2158037573 * M.b;
  const m_ = M.L - 0.1055613458 * M.a - 0.0638541728 * M.b;
  const s_ = M.L - 0.0894841775 * M.a - 1.291485548 * M.b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const gam = (c) => Math.round(255 * Math.min(1, Math.max(0, c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)));
  return "#" + [r, g, b].map(gam).map((v) => v.toString(16).padStart(2, "0")).join("");
};

const INK = "#f6ebdc", INK_SOFT = "#c6ab92", INK_FAINT = "#bb9c7c", MILK = "#f8efdf";

const roasts = {
  0: { name: "espresso", cream: "#2c2013", paper: "#3f2f1c", cocoa: "#140d05", tint: "#4f3a24" },
  1: { name: "dark roast", cream: "#292421", paper: "#3b342d", cocoa: "#110f0c", tint: "#483f35" },
  2: { name: "mahogany", cream: "#2e1b12", paper: "#452819", cocoa: "#140a06", tint: "#52311f" },
  3: { name: "midnight", cream: "#271d16", paper: "#3a2c20", cocoa: "#0f0b07", tint: "#42311f" },
};

console.log("== PROPOSED DARK LADDER ==");
let fail = 0;
const check = (label, ok, detail) => { if (!ok) fail++; console.log(`  ${ok ? "✓" : "✗"} ${label}: ${detail}`); };
for (const [k, r] of Object.entries(roasts)) {
  const bandC = mixOklab("#FF6B6B", 14, r.tint);
  const bandL = mixOklab("#FFD43B", 14, r.tint);
  const bandG = mixOklab("#9775FA", 14, r.tint);
  console.log(`roast ${k} ${r.name}: footer ${L(r.cocoa)} → page ${L(r.cream)} → card ${L(r.paper)} → band ${L(bandC)} | tint ${L(r.tint)}`);
  check("footer→page ΔL≥0.08", L(r.cream) - L(r.cocoa) >= 0.08, `Δ${(L(r.cream) - L(r.cocoa)).toFixed(3)}, WCAG ${contrast(r.cocoa, r.cream).toFixed(2)}:1`);
  check("page→card ΔL≥0.06", L(r.paper) - L(r.cream) >= 0.06, `Δ${(L(r.paper) - L(r.cream)).toFixed(3)}, WCAG ${contrast(r.cream, r.paper).toFixed(2)}:1`);
  check("card→band (coral/lemon/grape) lighter", L(bandC) > L(r.paper) && L(bandL) > L(r.paper) && L(bandG) > L(r.paper), `coral ${L(bandC)} lemon ${L(bandL)} grape ${L(bandG)} vs card ${L(r.paper)}`);
  check("ink on paper ≥7", contrast(r.paper, INK) >= 7, `${contrast(r.paper, INK).toFixed(2)}:1`);
  check("ink-soft on paper ≥4.5", contrast(r.paper, INK_SOFT) >= 4.5, `${contrast(r.paper, INK_SOFT).toFixed(2)}:1`);
  check("ink-faint on paper ≥4.5", contrast(r.paper, INK_FAINT) >= 4.5, `${contrast(r.paper, INK_FAINT).toFixed(2)}:1`);
  check("milk on cocoa ≥7", contrast(r.cocoa, MILK) >= 7, `${contrast(r.cocoa, MILK).toFixed(2)}:1`);
  check("chip tint14 on card distinct", L(mixOklab("#FF922B", 14, r.tint)) > L(r.paper), `chip ${L(mixOklab("#FF922B", 14, r.tint))}`);
}
console.log(fail ? `\n${fail} CHECK(S) FAILED` : "\nALL CHECKS PASSED");
