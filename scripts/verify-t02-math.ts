/* Verify every number that will appear on the Topic 2 notes reader */
const r = (x: number, dp: number) => Number(x.toFixed(dp));

// Worked Example 1 — neon
const ne = (20 * 90.92 + 21 * 0.26 + 22 * 8.82) / 100;
console.log("WE1 neon RAM =", ne, "→", r(ne, 2));

// Worked Example 2 — chlorine
const cl = (35 * 75 + 37 * 25) / 100;
console.log("WE2 chlorine RAM =", cl, "→", r(cl, 1));

// Exercise 2
const s = (32 * 95 + 33 * 1 + 34 * 4) / 100;
console.log("Ex2 Q1 sulfur =", s, "→", r(s, 2));
console.log("Ex2 Q2 neon = same as WE1:", r(ne, 2));
const b = (10 * 18.7 + 11 * 81.3) / 100;
console.log("Ex2 Q3 boron =", b, "→", r(b, 2));
const zr = (90 * 51.5 + 91 * 11.2 + 92 * 17.1 + 94 * 17.4 + 96 * 2.8) / 100;
console.log("Ex2 Q4 zirconium =", zr, "→", r(zr, 2));
// Q5 potassium: 39x + 41(1-x) = 39.1
const frac39 = (41 - 39.1) / (41 - 39);
console.log("Ex2 Q5 K-39 =", frac39 * 100, "% · K-41 =", (1 - frac39) * 100, "%");
// Q6 bromine: 1:1 isotopes → pair chances
console.log("Ex2 Q6 Br pair chances 79-79 = 1/4, mixed = 2/4, 81-81 = 1/4 → 1:2:1");

// Exercise 1 particle table — verify every cell
type Row = { id: string; p: number; n: number; e: number; A: number; Z: number; charge: number; sym: string };
const Zof = (p: number) => p;
const rows: Row[] = [
  { id: "A", p: 19, n: 21, e: 19, A: 19 + 21, Z: 19, charge: 0, sym: "K" },
  { id: "B", p: 20, n: 40 - 20, e: 20, A: 40, Z: 20, charge: 0, sym: "Ca" },
  { id: "C", p: 11, n: 23 - 11, e: 11 - 1, A: 23, Z: 11, charge: +1, sym: "Na+" },
  { id: "D", p: 6, n: 6, e: 6, A: 12, Z: 6, charge: 0, sym: "C" },
  { id: "E", p: 92, n: 235 - 92, e: 92, A: 235, Z: 92, charge: 0, sym: "U" },
  { id: "F", p: 6, n: 13 - 6, e: 6, A: 13, Z: 6, charge: 0, sym: "C" },
  { id: "G", p: 16, n: 16, e: 16 + 2, A: 16 + 16, Z: 16, charge: -2, sym: "S2-" },
  { id: "H", p: 13, n: 27 - 13, e: 13 - 3, A: 27, Z: 13, charge: +3, sym: "Al3+" },
];
for (const t of rows) {
  const okA = t.A === t.p + t.n;
  const okZ = t.Z === t.p;
  const okE = t.e === t.p - t.charge;
  const okC = t.charge === t.p - t.e;
  console.log(
    `${t.id}: A=${t.A} Z=${t.Z} p=${t.p} n=${t.n} e=${t.e} q=${t.charge > 0 ? "+" + t.charge : t.charge} ${t.sym}`,
    okA && okZ && okE && okC ? "OK" : "MISMATCH!"
  );
}

// Exercise 4 ion configurations via Aufbau (with Cr/Cu exceptions)
const order = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"];
const cap: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };
function cfg(z: number): [string, number][] {
  const parts: [string, number][] = [];
  let left = z;
  for (const sub of order) {
    if (left <= 0) break;
    const e = Math.min(cap[sub[1]], left);
    parts.push([sub, e]);
    left -= e;
  }
  return parts;
}
function fmt(parts: [string, number][]) {
  return parts.map(([s2, e]) => `${s2}${sup(e)}`).join(" ");
}
function sup(n: number) {
  const m: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  return String(n).split("").map((c) => m[c]).join("");
}
function ion(zAfter: number) {
  return fmt(cfg(zAfter));
}
console.log("Mg²⁺ (12-2=10):", ion(10));
console.log("Ca²⁺ (20-2=18):", ion(18));
console.log("Al³⁺ (13-3=10):", ion(10));
console.log("O²⁻ (8+2=10):", ion(10));
console.log("Br⁻ (35+1=36):", ion(36));
console.log("P³⁻ (15+3=18):", ion(18));
// Exercise 3 / examples
console.log("C (6):", fmt(cfg(6)));
console.log("S (16):", fmt(cfg(16)), "· noble-gas short: [Ne] 3s²3p⁴");
for (const z of [24, 29]) {
  console.log(`z=${z} standard:`, fmt(cfg(z)));
}
console.log("Cr (24) exception: 1s²2s²2p⁶3s²3p⁶3d⁵4s¹");
console.log("Cu (29) exception: 1s²2s²2p⁶3s²3p⁶3d¹⁰4s¹");
// spot-check a few Exercise 3 elements
for (const z of [1, 2, 5, 11, 19, 20, 26, 36]) console.log(`z=${z}:`, fmt(cfg(z)));

// Cl2 peak chances 9:6:1
console.log("Cl2: (3/4)² = 9/16 · 2×(3/4)(1/4) = 6/16 · (1/4)² = 1/16 → 9:6:1");
