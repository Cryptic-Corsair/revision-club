/* sanity-check the bench pH model against hand calculations */
const CA = 0.1, CB = 0.1, VA = 25.0, VEQ = 25.0, PKA = 4.76, KA = 1.74e-5;

function pHAt(v, acid) {
  const nH = (CA * VA) / 1000;
  const nB = (CB * v) / 1000;
  const Vt = (VA + v) / 1000;
  if (acid === "hcl") {
    if (v < VEQ - 1e-9) return -Math.log10((nH - nB) / Vt);
    if (Math.abs(v - VEQ) < 1e-9) return 7;
    return 14 + Math.log10((nB - nH) / Vt);
  }
  if (v <= 1e-9) return 0.5 * (PKA - Math.log10(CA));
  if (v < 2) {
    const ph0 = 0.5 * (PKA - Math.log10(CA));
    const n2 = (CB * 2) / 1000;
    const ph2 = PKA + Math.log10(n2 / (nH - n2));
    return ph0 + (ph2 - ph0) * (v / 2);
  }
  if (v < VEQ - 1e-9) return PKA + Math.log10(nB / (nH - nB));
  if (Math.abs(v - VEQ) < 1e-9) {
    const cSalt = nH / Vt;
    return 14 + Math.log10(Math.sqrt((1e-14 / KA) * cSalt));
  }
  return 14 + Math.log10((nB - nH) / Vt);
}

const checks = [
  [0, "hcl", 1.00, "HCl start: pH 1.00"],
  [12.5, "hcl", 1.37, "HCl mid: (2.5e-3-1.25e-3)/0.0375"],
  [24.9, "hcl", 3.30, "HCl just before eq"],
  [25, "hcl", 7.00, "HCl equivalence: 7"],
  [25.1, "hcl", 10.70, "HCl just after eq"],
  [30, "hcl", 12.00, "HCl +5 over"],
  [0, "ethanoic", 2.88, "weak start: 0.5(4.76+1)"],
  [2, "ethanoic", 3.70, "HH at 2"],
  [12.5, "ethanoic", 4.76, "half-eq: pH=pKa"],
  [24, "ethanoic", 6.14, "HH at 24"],
  [25, "ethanoic", 8.72, "salt hydrolysis at eq"],
  [30, "ethanoic", 11.96, "excess OH"],
];

let ok = true;
for (const [v, a, exp, label] of checks) {
  const got = pHAt(v, a);
  const pass = Math.abs(got - exp) < 0.15;
  if (!pass) ok = false;
  console.log(`${pass ? "PASS" : "FAIL"} ${a.padEnd(9)} v=${String(v).padStart(5)}  pH=${got.toFixed(2)}  (expect ~${exp.toFixed(2)})  ${label}`);
}
let mono = true, prev = -Infinity;
for (let v = 0; v <= 50; v += 0.05) {
  const p = pHAt(v, "ethanoic");
  if (p < prev - 1e-9) { mono = false; console.log(`FAIL weak curve NOT monotonic at v=${v.toFixed(2)}: ${prev.toFixed(3)} -> ${p.toFixed(3)}`); }
  prev = p;
}
console.log(mono ? "PASS weak curve non-decreasing" : "FAIL weak curve has a dip");
console.log(ok && mono ? "ALL CHECKS PASS" : "SOME CHECKS FAILED");
