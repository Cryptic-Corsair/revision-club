'use client';

import { BlobDivider, Reveal, SectionHead } from './bits';
import { monoFont, useCanvasScene, useLive } from './lib';

/* ═══════════════════════════════════════════════════════════════════════
   the candy lab's machines — four canvas scenes on the shared gated
   runner in lib.ts (IntersectionObserver + 30 fps accumulator + 1.5
   DPR cap + one static frame for reduced motion).

   Same physics as the syllabus demands, dressed for the workshop:
   · HeroField        — pastel motes bonding as they drift, bubbles
                        rising through the cream, slow sparks
   · SceneMaxwell     — the Maxwell–Boltzmann distribution breathing
                        between two temperatures (properly normalised —
                        the area never changes), the tail past Ea
                        fattening with heat
   · SceneTitration   — 25.0 cm³ of 0.100 mol dm⁻³ NaOH against 0.125
                        mol dm⁻³ HCl, the pH curve computed from real
                        points, plunging exactly at 20.0 cm³
   · SceneEquilibrium — 2NO₂ ⇌ N₂O₄ in one sealed bulb, pairs merging
                        and splitting with the temperature cycle
   ═══════════════════════════════════════════════════════════════════════ */

const INK = 'rgba(61, 43, 31,';

function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** rich mono text: plain strings, {sub} and {sup} segments — real
 *  subscripts in canvas labels instead of hoping the font has ₂ */
type Seg = string | { sub: string } | { sup: string };

function segText(p: Seg): string {
  return typeof p === 'string' ? p : 'sub' in p ? p.sub : p.sup;
}

function richWidth(ctx: CanvasRenderingContext2D, parts: Seg[]): number {
  let w = 0;
  for (const p of parts) {
    const small = typeof p !== 'string';
    ctx.font = monoFont(600, small ? 8 : 11);
    w += ctx.measureText(segText(p)).width;
  }
  return w;
}

function drawRich(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  parts: Seg[],
  color: string,
): number {
  let cx = x;
  for (const p of parts) {
    if (typeof p === 'string') {
      ctx.font = monoFont(600, 11);
      ctx.fillStyle = color;
      ctx.fillText(p, cx, y);
      cx += ctx.measureText(p).width;
    } else if ('sub' in p) {
      ctx.font = monoFont(600, 8);
      ctx.fillStyle = color;
      ctx.fillText(p.sub, cx, y + 3.2);
      cx += ctx.measureText(p.sub).width;
    } else {
      ctx.font = monoFont(600, 8);
      ctx.fillStyle = color;
      ctx.fillText(p.sup, cx, y - 3.6);
      cx += ctx.measureText(p.sup).width;
    }
  }
  return cx - x;
}

/** a mono chip — the machine readout voice, cream pill with ink border */
function chip(
  ctx: CanvasRenderingContext2D,
  anchorX: number,
  y: number,
  parts: Seg[],
  color: string,
  align: 'left' | 'right' = 'right',
) {
  const pad = 9;
  const w = richWidth(ctx, parts) + pad * 2;
  const x = align === 'right' ? anchorX - w : anchorX;
  rrect(ctx, x, y, w, 22, 11);
  ctx.fillStyle = 'rgba(255, 253, 249, 0.94)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(61, 43, 31, 0.4)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  drawRich(ctx, x + pad, y + 15, parts, color);
}

/* ————————————————————— the hero drift field ————————————————————— */

export function HeroField() {
  const ref = useCanvasScene(() => {
    const COLORS = ['#FF6B6B', '#FFC64B', '#12B886', '#5BB4E8', '#9775FA', '#F06595'];
    const parts = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.016,
      vy: (Math.random() - 0.5) * 0.012,
      r: 2 + Math.random() * 2.4,
      c: COLORS[i % COLORS.length],
      tw: Math.random() * Math.PI * 2,
    }));
    const bubs = Array.from({ length: 10 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 3 + Math.random() * 5,
      s: 0.022 + Math.random() * 0.02,
      wob: Math.random() * Math.PI * 2,
    }));
    const sparks = Array.from({ length: 5 }, (_, i) => ({
      x: 0.06 + Math.random() * 0.88,
      y: 0.06 + Math.random() * 0.8,
      s: 5 + Math.random() * 7,
      ph: Math.random() * Math.PI * 2,
      c: COLORS[(i + 2) % COLORS.length],
    }));
    let last = 0;

    return ({ ctx, w, h, t }) => {
      const dt = Math.min(last ? t - last : 0.033, 0.1);
      last = t;
      ctx.clearRect(0, 0, w, h);

      /* bonds — soft ink lines wherever two motes pass close */
      ctx.lineWidth = 1.2;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = (parts[i].x - parts[j].x) * w;
          const dy = (parts[i].y - parts[j].y) * h;
          const d = Math.hypot(dx, dy);
          const R = 115;
          if (d < R) {
            ctx.globalAlpha = (1 - d / R) * 0.16;
            ctx.strokeStyle = 'rgba(61, 43, 31, 0.9)';
            ctx.beginPath();
            ctx.moveTo(parts[i].x * w, parts[i].y * h);
            ctx.lineTo(parts[j].x * w, parts[j].y * h);
            ctx.stroke();
          }
        }
      }

      /* the candy motes */
      for (const p of parts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -0.02) p.x = 1.02;
        else if (p.x > 1.02) p.x = -0.02;
        if (p.y < -0.02) p.y = 1.02;
        else if (p.y > 1.02) p.y = -0.02;
        ctx.globalAlpha = Math.max(0.25, 0.55 + 0.3 * Math.sin(t * 1.3 + p.tw));
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha *= 0.8;
        ctx.strokeStyle = 'rgba(61, 43, 31, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* bubbles wobbling up through the cream */
      for (const b of bubs) {
        b.y -= b.s * dt;
        if (b.y < -0.04) {
          b.y = 1.04;
          b.x = Math.random();
        }
        const bx = b.x * w + Math.sin(t * 1.4 + b.wob) * 9;
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = 'rgba(61, 43, 31, 0.65)';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(bx, b.y * h, b.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = 'rgba(91, 180, 232, 0.8)';
        ctx.fill();
      }

      /* turning sparks */
      for (const s of sparks) {
        ctx.save();
        ctx.translate(s.x * w, s.y * h);
        ctx.rotate(t * 0.3 + s.ph);
        ctx.globalAlpha = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.9 + s.ph));
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.moveTo(0, -s.s);
        ctx.quadraticCurveTo(s.s * 0.18, -s.s * 0.18, s.s, 0);
        ctx.quadraticCurveTo(s.s * 0.18, s.s * 0.18, 0, s.s);
        ctx.quadraticCurveTo(-s.s * 0.18, s.s * 0.18, -s.s, 0);
        ctx.quadraticCurveTo(-s.s * 0.18, -s.s * 0.18, 0, -s.s);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };
  });

  return <canvas ref={ref} className="cd-hero-canvas" aria-hidden="true" />;
}

/* ————————————————————— Maxwell–Boltzmann ————————————————————— */

export function SceneMaxwell() {
  const ref = useCanvasScene(() => {
    const mols = Array.from({ length: 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5,
      f: 0.45 + Math.random() * 0.75,
    }));
    let last = 0;

    return ({ ctx, w, h, t }) => {
      const dt = Math.min(last ? t - last : 0.033, 0.1);
      last = t;
      ctx.clearRect(0, 0, w, h);

      /* the temperature cycle — 300 K ↔ 520 K */
      const cyc = 0.5 - 0.5 * Math.cos(t * 0.5);
      const kT = 1 + cyc * 1.1;
      const TK = Math.round(300 + cyc * 220);

      const padL = 46;
      const padR = 20;
      const padT = 40;
      const plotH = h * 0.52;
      const baseY = padT + plotH;
      const plotW = w - padL - padR;
      const Emax = 9;
      const Ea = 3.1;
      const X = (E: number) => padL + (E / Emax) * plotW;

      /* f(E) = N·(2/√π)·√E·e^(−E/kT)/(kT)^{3/2} — the area stays
         constant, so the hot curve is lower, wider, longer-tailed */
      const norm = 2 / Math.sqrt(Math.PI);
      const peakLow = norm * Math.sqrt(0.5) * Math.exp(-0.5);
      const SCALE = (plotH * 0.86) / peakLow;
      const f = (E: number) =>
        (norm * Math.sqrt(E) * Math.exp(-E / kT)) / Math.pow(kT, 1.5);

      /* axis */
      ctx.strokeStyle = `${INK}0.2)`;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([2, 6]);
      line(ctx, padL - 10, baseY, w - padR, baseY);
      ctx.setLineDash([]);

      /* the reacting fraction — the tail past Ea, filling with heat */
      ctx.beginPath();
      ctx.moveTo(X(Ea), baseY);
      for (let E = Ea; E <= Emax; E += 0.06) ctx.lineTo(X(E), baseY - f(E) * SCALE);
      ctx.lineTo(X(Emax), baseY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 146, 43, 0.2)';
      ctx.fill();

      /* the whole distribution */
      ctx.beginPath();
      ctx.moveTo(X(0), baseY);
      for (let E = 0; E <= Emax; E += 0.06) ctx.lineTo(X(E), baseY - f(E) * SCALE);
      ctx.lineTo(X(Emax), baseY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 107, 107, 0.12)';
      ctx.fill();

      ctx.beginPath();
      let first = true;
      for (let E = 0; E <= Emax; E += 0.06) {
        const px = X(E);
        const py = baseY - f(E) * SCALE;
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = '#FF6B6B';
      ctx.lineWidth = 3.4;
      ctx.lineJoin = 'round';
      ctx.stroke();

      /* the activation energy marker */
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(245, 159, 0, 0.85)';
      ctx.lineWidth = 1.8;
      line(ctx, X(Ea), padT - 8, X(Ea), baseY);
      ctx.setLineDash([]);

      ctx.font = monoFont(600, 11);
      ctx.textAlign = 'center';
      ctx.fillStyle = `${INK}0.55)`;
      ctx.fillText('kinetic energy →', padL + plotW / 2, baseY + 18);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(245, 159, 0, 0.95)';
      ctx.fillText('Ea', X(Ea) + 5, padT - 12);

      chip(ctx, w - 14, 14, [`T = ${TK} K`], '#B25E00');

      /* the molecules — faster when hot, orange once past Ea */
      const molTop = baseY + 30;
      const molH = h - molTop - 18;
      ctx.strokeStyle = `${INK}0.18)`;
      ctx.lineWidth = 1.4;
      rrect(ctx, padL - 10, molTop, plotW + 10, molH, 12);
      ctx.stroke();
      const speed = Math.sqrt(kT);
      for (const m of mols) {
        m.x += m.vx * m.f * speed * dt * 0.22;
        m.y += m.vy * m.f * speed * dt * 0.16;
        if (m.x < 0) m.x += 1;
        else if (m.x > 1) m.x -= 1;
        if (m.y < 0) m.y += 1;
        else if (m.y > 1) m.y -= 1;
        const px = padL - 4 + m.x * plotW;
        const py = molTop + 7 + m.y * (molH - 14);
        const fast = m.f * speed > 1.12;
        ctx.fillStyle = fast ? 'rgba(255, 146, 43, 0.95)' : 'rgba(18, 184, 134, 0.8)';
        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  });

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Animation: the Maxwell–Boltzmann distribution breathing as temperature cycles, the shaded tail of molecules beyond the activation energy growing as the mixture warms"
    />
  );
}

/* ————————————————————— the self-computing titration ————————————————————— */

export function SceneTitration() {
  const ref = useCanvasScene(() => {
    /* the worked example's own numbers — computed, not sketched */
    const cAcid = 0.125;
    const vBase = 0.025;
    const cBase = 0.1;
    const pHof = (vcm: number) => {
      const nH = (cAcid * vcm) / 1000;
      const nOH = cBase * vBase;
      const V = (vcm + 25) / 1000;
      const d = nH - nOH;
      if (Math.abs(d) < 1e-12) return 7;
      if (d < 0) return 14 + Math.log10(-d / V);
      return -Math.log10(d / V);
    };
    const samples: Array<[number, number]> = [];
    for (let v = 0; v <= 40.0001; v += 0.1) samples.push([v, pHof(v)]);
    for (let v = 19.6; v <= 20.4; v += 0.02) samples.push([v, pHof(v)]);
    samples.sort((a, b) => a[0] - b[0]);

    return ({ ctx, w, h, t }) => {
      ctx.clearRect(0, 0, w, h);
      const vNow = (t * 4.4) % 40;
      const curPH = pHof(vNow);

      /* ——— left: the apparatus ——— */
      const ax = 64;
      ctx.strokeStyle = `${INK}0.75)`;
      ctx.lineWidth = 2.2;
      const tubeTop = 20;
      const tubeBot = 116;
      line(ctx, ax - 9, tubeTop, ax - 9, tubeBot);
      line(ctx, ax + 9, tubeTop, ax + 9, tubeBot);
      const level = tubeTop + 6 + (vNow / 40) * (tubeBot - tubeTop - 14);
      ctx.fillStyle = 'rgba(91, 180, 232, 0.35)';
      ctx.fillRect(ax - 8, level, 16, tubeBot - level);
      ctx.strokeStyle = 'rgba(91, 180, 232, 0.9)';
      ctx.lineWidth = 1.8;
      line(ctx, ax - 8, level, ax + 8, level);
      ctx.strokeStyle = `${INK}0.5)`;
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= 4; i++) line(ctx, ax + 9, tubeTop + 8 + i * 22, ax + 15, tubeTop + 8 + i * 22);
      ctx.strokeStyle = `${INK}0.75)`;
      ctx.lineWidth = 2.2;
      line(ctx, ax - 12, tubeBot + 4, ax + 12, tubeBot + 4);
      line(ctx, ax - 4, tubeBot, ax - 2, tubeBot + 12);
      line(ctx, ax + 4, tubeBot, ax + 2, tubeBot + 12);
      line(ctx, ax - 2, tubeBot + 12, ax + 2, tubeBot + 12);
      /* the falling drop */
      const dropPhase = (t * 2.2) % 1;
      ctx.globalAlpha = dropPhase < 0.12 ? dropPhase / 0.12 : Math.max(0, 1 - (dropPhase - 0.8) / 0.2);
      ctx.fillStyle = '#5BB4E8';
      ctx.beginPath();
      ctx.ellipse(ax, tubeBot + 18 + dropPhase * 22, 2.7, 4.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      /* the flask — pink while alkaline, drained past the endpoint */
      ctx.strokeStyle = `${INK}0.75)`;
      ctx.lineWidth = 2.4;
      line(ctx, ax - 7, tubeBot + 48, ax - 7, tubeBot + 58);
      line(ctx, ax + 7, tubeBot + 48, ax + 7, tubeBot + 58);
      ctx.beginPath();
      ctx.moveTo(ax - 7, tubeBot + 58);
      ctx.lineTo(ax - 26, tubeBot + 92);
      ctx.arcTo(ax - 28, tubeBot + 96, ax - 22, tubeBot + 96, 5);
      ctx.lineTo(ax + 22, tubeBot + 96);
      ctx.arcTo(ax + 28, tubeBot + 96, ax + 26, tubeBot + 92, 5);
      ctx.lineTo(ax + 7, tubeBot + 58);
      ctx.stroke();
      const pink = curPH > 8.2 ? Math.min(1, (curPH - 8.2) / 1.2) : 0;
      ctx.beginPath();
      ctx.moveTo(ax - 20, tubeBot + 78);
      ctx.lineTo(ax - 24, tubeBot + 92);
      ctx.lineTo(ax + 24, tubeBot + 92);
      ctx.lineTo(ax + 20, tubeBot + 78);
      ctx.closePath();
      ctx.fillStyle = `rgba(240, 101, 149, ${0.1 + 0.55 * pink})`;
      ctx.fill();

      /* ——— right: the curve, drawn from real points ——— */
      const plotL = 150;
      const plotR = w - 18;
      const plotT = 26;
      const plotB = h - 40;
      const plotW = plotR - plotL;
      const plotH = plotB - plotT;
      const VX = (v: number) => plotL + (v / 40) * plotW;
      const PY = (p: number) => plotB - (Math.min(Math.max(p, 0), 14) / 14) * plotH;

      ctx.strokeStyle = `${INK}0.2)`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 6]);
      line(ctx, plotL - 8, plotB, plotR, plotB);
      line(ctx, plotL - 8, plotT, plotL - 8, plotB);
      line(ctx, plotL - 8, PY(7), plotR, PY(7));
      ctx.setLineDash([]);

      ctx.font = monoFont(600, 10.5);
      ctx.fillStyle = `${INK}0.5)`;
      ctx.textAlign = 'right';
      ctx.fillText('14', plotL - 12, plotT + 4);
      ctx.fillText('7', plotL - 12, PY(7) + 4);
      ctx.fillText('0', plotL - 12, plotB + 4);
      ctx.textAlign = 'center';
      ctx.fillText('acid added / cm³', (plotL + plotR) / 2, h - 12);
      for (const vt of [10, 20, 30]) {
        ctx.fillText(String(vt), VX(vt), plotB + 16);
        ctx.strokeStyle = `${INK}0.12)`;
        ctx.lineWidth = 1.2;
        line(ctx, VX(vt), plotT, VX(vt), plotB);
      }
      ctx.save();
      ctx.translate(16, (plotT + plotB) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('pH', 0, 0);
      ctx.restore();

      /* the equivalence marker */
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(245, 159, 0, 0.75)';
      ctx.lineWidth = 1.8;
      line(ctx, VX(20), plotT, VX(20), plotB);
      ctx.setLineDash([]);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(178, 94, 0, 0.95)';
      ctx.fillText('equivalence · 20.0', VX(20) + 6, plotT + 14);

      /* the curve so far */
      ctx.beginPath();
      let started = false;
      for (const [v, p] of samples) {
        if (v > vNow) break;
        const px = VX(v);
        const py = PY(p);
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = '#9775FA';
      ctx.lineWidth = 3.4;
      ctx.lineJoin = 'round';
      ctx.stroke();

      /* the leading dot — glowing amber at the endpoint */
      const dotX = VX(vNow);
      const dotY = PY(curPH);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = Math.abs(vNow - 20) < 2 ? '#F59F00' : '#9775FA';
      ctx.fill();
      ctx.strokeStyle = '#FFFDF9';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      chip(ctx, w - 14, 14, [`pH ${curPH.toFixed(1)}`], curPH > 8.2 ? '#C2255C' : '#12B886');
    };
  });

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Animation: a burette drips hydrochloric acid into 25 cubic centimetres of sodium hydroxide while the pH curve draws itself, plunging at the 20 cubic centimetre equivalence point"
    />
  );
}

/* ————————————————————— dynamic equilibrium ————————————————————— */

export function SceneEquilibrium() {
  const ref = useCanvasScene(() => {
    /* each unit is a pair of NO₂ — split (two orange dots) or merged
       into one N₂O₄ (one pale blue dot). Cold folds them into N₂O₄;
       warmth pushes the balance back to brown NO₂. */
    const units = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.024,
      split: Math.random() < 0.5,
      jx: Math.random() * Math.PI * 2,
    }));
    let last = 0;

    return ({ ctx, w, h, t }) => {
      const dt = Math.min(last ? t - last : 0.033, 0.1);
      last = t;
      ctx.clearRect(0, 0, w, h);

      const cyc = 0.5 - 0.5 * Math.cos(t * 0.42); // the warming cycle
      const TK = Math.round(280 + cyc * 120);

      const bx = 18;
      const by = 44;
      const bw = w - 36;
      const bh = h - 118;

      /* conversions — merge when cool, split when warm */
      const pMerge = (0.62 * (1 - cyc) + 0.05) * dt;
      const pSplit = (0.62 * cyc + 0.05) * dt;
      for (const u of units) {
        if (u.split && Math.random() < pMerge) u.split = false;
        else if (!u.split && Math.random() < pSplit) u.split = true;
      }
      const nSplit = units.reduce((n, u) => n + (u.split ? 1 : 0), 0);

      /* the sealed bulb, tinted by the NO₂ fraction */
      rrect(ctx, bx, by, bw, bh, 28);
      const brown = nSplit / units.length;
      ctx.fillStyle = `rgba(255, 146, 43, ${0.05 + 0.17 * brown})`;
      ctx.fill();
      ctx.strokeStyle = `${INK}0.45)`;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      /* the population */
      for (const u of units) {
        u.x += u.vx * dt;
        u.y += u.vy * dt;
        if (u.x < 0) u.x += 1;
        else if (u.x > 1) u.x -= 1;
        if (u.y < 0) u.y += 1;
        else if (u.y > 1) u.y -= 1;
        const px = bx + 12 + u.x * (bw - 24) + Math.sin(t * 2 + u.jx) * 2;
        const py = by + 12 + u.y * (bh - 24) + Math.cos(t * 1.7 + u.jx) * 2;
        if (u.split) {
          /* two brown NO₂ dots, circling each other */
          const a = t * 2.4 + u.jx;
          ctx.fillStyle = 'rgba(255, 146, 43, 0.22)';
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FF922B';
          ctx.beginPath();
          ctx.arc(px + Math.cos(a) * 3.8, py + Math.sin(a) * 3.8, 3.1, 0, Math.PI * 2);
          ctx.arc(px - Math.cos(a) * 3.8, py - Math.sin(a) * 3.8, 3.1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          /* one pale N₂O₄ dot */
          ctx.fillStyle = 'rgba(91, 180, 232, 0.18)';
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(91, 180, 232, 0.95)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, 4.6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(91, 180, 232, 0.55)';
          ctx.beginPath();
          ctx.arc(px, py, 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* the flame underneath — bigger as the bath warms */
      const fx = w / 2;
      const fy = by + bh + 8;
      const fh = 10 + 20 * cyc + Math.sin(t * 9) * 2.2;
      ctx.strokeStyle = `${INK}0.45)`;
      ctx.lineWidth = 2.2;
      line(ctx, fx - 5, fy + 30, fx - 5, fy + 6);
      line(ctx, fx + 5, fy + 30, fx + 5, fy + 6);
      ctx.beginPath();
      ctx.moveTo(fx - 6, fy + 5);
      ctx.quadraticCurveTo(fx, fy - fh, fx + 6, fy + 5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 146, 43, 0.8)';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(fx - 3, fy + 5);
      ctx.quadraticCurveTo(fx, fy - fh * 0.55, fx + 3, fy + 5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 224, 130, 0.9)';
      ctx.fill();

      /* the census bars */
      const barY = h - 34;
      drawRich(ctx, 22, barY - 8, ['NO', { sub: '2' }, `  ${nSplit}`], '#C25E00');
      const rightParts: Seg[] = ['N', { sub: '2' }, 'O', { sub: '4' }, `  ${units.length - nSplit}`];
      const rightW = richWidth(ctx, rightParts);
      drawRich(ctx, w - 22 - rightW, barY - 8, rightParts, '#1C7ED6');
      ctx.fillStyle = 'rgba(255, 146, 43, 0.8)';
      ctx.fillRect(22, barY, (bw / 2 - 12) * (nSplit / units.length), 5);
      ctx.fillStyle = 'rgba(91, 180, 232, 0.65)';
      const bw2 = (bw / 2 - 12) * ((units.length - nSplit) / units.length);
      ctx.fillRect(w - 22 - bw2, barY, bw2, 5);

      chip(
        ctx,
        20,
        14,
        ['2NO', { sub: '2' }, '(g) ⇌ N', { sub: '2' }, 'O', { sub: '4' }, '(g)  ·  ΔH = −57 kJ mol', { sup: '−1' }],
        '#3D2B1F',
        'left',
      );
      chip(ctx, w - 14, 14, [`T = ${TK} K`], cyc > 0.55 ? '#C25E00' : '#1C7ED6');
    };
  });

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Animation: a sealed bulb of nitrogen dioxide in equilibrium with dinitrogen tetroxide — pairs merge and split as the mixture is warmed and cooled, the orange tint following the balance"
    />
  );
}

/* ————————————————————— the section ————————————————————— */

export function MotionBand() {
  const liveRef = useLive<HTMLElement>();
  return (
    <section id="motion" ref={liveRef} className="cd-sec cd-band-motion">
      <BlobDivider kind="melt" at="top" color="var(--cd-cream)" />
      <div className="cd-wrap">
        <SectionHead
          dot="var(--cd-sky)"
          eyebrow="chemistry in motion"
          title={
            <>
              The syllabus, <em>running live.</em>
            </>
          }
          lead="Three of the course's own ideas, kept as moving machines — no controls, no sliders, just the physics looping the way it loops in the notes. Every figure in the library moves like this; these are the door's demonstrations."
        />
        <div className="cd-stages">
          <Reveal className="cd-stagecell">
            <div className="cd-stage">
              <h3>
                the distribution breathes <span className="cd-spec-chip">kinetics</span>
              </h3>
              <SceneMaxwell />
              <p className="cd-stage-cap">
                Maxwell–Boltzmann, warm and cool. The area under the curve never changes — but
                the tail past E<sub>a</sub> fattens as T rises, which is the whole reason heat
                speeds a reaction up.
              </p>
            </div>
          </Reveal>
          <Reveal className="cd-stagecell" delay={0.08}>
            <div className="cd-stage">
              <h3>
                the titration draws itself <span className="cd-spec-chip">amount of substance</span>
              </h3>
              <SceneTitration />
              <p className="cd-stage-cap">
                25.0 cm<sup>3</sup> of 0.100 mol dm<sup>−3</sup> NaOH against the HCl from the
                worked example below — the curve is computed, not sketched, and it plunges
                exactly at 20.0 cm<sup>3</sup>.
              </p>
            </div>
          </Reveal>
          <Reveal className="cd-stagecell wide" delay={0.05}>
            <div className="cd-stage">
              <h3>
                the balance finds itself <span className="cd-spec-chip">equilibria</span>
              </h3>
              <SceneEquilibrium />
              <p className="cd-stage-cap">
                2NO<sub>2</sub>(g) ⇌ N<sub>2</sub>O<sub>4</sub>(g) in one sealed bulb. Warming
                pushes the balance toward brown NO<sub>2</sub>; cooling folds it back into pale
                N<sub>2</sub>O<sub>4</sub> — Le Chatelier, watched live.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="cd-motion-note" delay={0.1}>
          <span className="pulse cd-loop" aria-hidden="true" />
          every machine idles only while you can see it — the rest of the time, the lab naps
        </Reveal>
      </div>
    </section>
  );
}
