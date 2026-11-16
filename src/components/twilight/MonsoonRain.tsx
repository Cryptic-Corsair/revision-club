'use client';
import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   MonsoonRain — a faithful port of the reference's hero rain machine
   (recovered from its bundle as `wm`): seeded rain streaks with
   pointer-driven wind, four drifting mist blobs (amber / cloud / mist
   tones from radial-gradient sprites), and rising motes. The pointer
   steers the rain's angle (wind), quickens the motes, and shifts the
   mist — exactly the reference's `_m`/`vm` factors.

   Lag contract (the reference's own, kept verbatim): the machine
   renders in CSS-pixel space (no DPR multiplication), pauses on
   IntersectionObserver(0.01) and document.hidden, and caps its rAF at
   the reference's 32 ms minimum gap (~30 fps).
   ═══════════════════════════════════════════════════════════════════════ */

interface MonsoonRainProps {
  reducedMotion: boolean;
  testId?: string;
}

/* seeded PRNG — the reference's hm() */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    e = e + Math.imul(e ^ (e >>> 7), 61 | e) ^ e;
    return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
  };
}

interface RainStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  depth: number;
}

interface Mote {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  speedY: number;
  speedX: number;
  depth: number;
}

interface MistBlob {
  xRatio: number;
  yRatio: number;
  radiusRatio: number;
  driftSpeedX: number;
  driftSpeedY: number;
  phase: number;
  baseAlpha: number;
  tone: 'amber' | 'cloud' | 'mist';
}

/* the reference's tone table */
const TONES: Record<MistBlob['tone'], [number, number, number]> = {
  amber: [223, 188, 145],
  cloud: [198, 190, 180],
  mist: [178, 194, 212],
};

/* the reference's ym() — four fixed mist blobs */
const MIST_BLOBS: MistBlob[] = [
  { xRatio: 0.78, yRatio: 0.24, radiusRatio: 0.46, driftSpeedX: 0.14, driftSpeedY: 0.09, phase: 0.2, baseAlpha: 0.24, tone: 'amber' },
  { xRatio: 0.66, yRatio: 0.4, radiusRatio: 0.54, driftSpeedX: -0.11, driftSpeedY: 0.08, phase: 1.7, baseAlpha: 0.24, tone: 'cloud' },
  { xRatio: 0.88, yRatio: 0.58, radiusRatio: 0.5, driftSpeedX: 0.08, driftSpeedY: -0.1, phase: 3.1, baseAlpha: 0.2, tone: 'mist' },
  { xRatio: 0.26, yRatio: 0.74, radiusRatio: 0.44, driftSpeedX: 0.07, driftSpeedY: 0.06, phase: 4.4, baseAlpha: 0.15, tone: 'mist' },
];

/* the reference's bm() — rain streaks */
function makeRain(count: number, w: number, h: number, seed = 2024): RainStreak[] {
  const rng = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const depth = rng();
    return {
      x: rng() * (w + 160) - 80,
      y: rng() * h,
      length: 38 + depth * 74,
      speed: 240 + depth * 360,
      opacity: 0.095 + depth * 0.22,
      width: 0.75 + (1 - depth) * 1.55,
      depth,
    };
  });
}

/* the reference's xm() — rising motes */
function makeMotes(count: number, w: number, h: number, seed = 1971): Mote[] {
  const rng = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const depth = rng();
    return {
      x: rng() * w,
      y: rng() * h,
      radius: 1.3 + (1 - depth) * 2.8,
      alpha: 0.22 + depth * 0.38,
      phase: rng() * Math.PI * 2,
      speedY: -8 - rng() * 14,
      speedX: (rng() - 0.5) * 10,
      depth,
    };
  });
}

/* the reference's Cm() — a radial-gradient sprite on an offscreen canvas */
function makeSprite(size: number, stops: [number, string][]): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    for (const [at, color] of stops) grad.addColorStop(at, color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

/* the reference's _m() — pointer wind */
function pointerWind(px: number, py: number) {
  const x = Math.max(-0.5, Math.min(0.5, px));
  const y = Math.max(-0.5, Math.min(0.5, py));
  const angleRad = -0.18 + x * 0.22;
  return {
    angleRad,
    windVx: Math.sin(angleRad),
    mistShiftX: x * 36,
    mistShiftY: y * 22,
  };
}

export function MonsoonRain({ reducedMotion, testId }: MonsoonRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedRef = useRef(reducedMotion);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rain: RainStreak[] = [];
    let motes: Mote[] = [];
    let visible = true;
    let rafId = 0;
    let lastTs = performance.now();
    let lastFrame = 0;
    const pointer = { x: 0, y: 0 };
    let activeMix = 0;

    const sprites = {
      amber: makeSprite(256, [
        [0, `rgba(${TONES.amber.join(',')}, 1)`],
        [0.52, `rgba(${TONES.amber.join(',')}, 0.42)`],
        [1, `rgba(${TONES.amber.join(',')}, 0)`],
      ]),
      cloud: makeSprite(256, [
        [0, `rgba(${TONES.cloud.join(',')}, 1)`],
        [0.52, `rgba(${TONES.cloud.join(',')}, 0.42)`],
        [1, `rgba(${TONES.cloud.join(',')}, 0)`],
      ]),
      mist: makeSprite(256, [
        [0, `rgba(${TONES.mist.join(',')}, 1)`],
        [0.52, `rgba(${TONES.mist.join(',')}, 0.42)`],
        [1, `rgba(${TONES.mist.join(',')}, 0)`],
      ]),
    };
    const moteSprite = makeSprite(64, [
      [0, 'rgba(246, 244, 239, 1)'],
      [0.45, 'rgba(223, 188, 145, 0.55)'],
      [1, 'rgba(223, 188, 145, 0)'],
    ]);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(320, Math.round(rect.width));
      height = Math.max(420, Math.round(rect.height));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      /* the reference's densities: 48 rain / 22 motes desktop, 28/14 mobile */
      rain = makeRain(width < 768 ? 28 : 48, width, height, 2024);
      motes = makeMotes(width < 768 ? 14 : 22, width, height, 1971);
    };

    const draw = (ts: number, animate: boolean) => {
      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) / 1000));
      lastTs = ts;
      const t = ts / 1000;
      const pt = pointerRef.current ?? { x: 0, y: 0 };
      pointer.x += (pt.x - pointer.x) * 0.06;
      pointer.y += (pt.y - pointer.y) * 0.06;
      const wind = pointerWind(pointer.x, pointer.y);
      /* the reference's vm() breathing — no sound bus here, always on */
      const mistScale = 1 + 0.14 * (0.5 + 0.5 * Math.sin(t * 1.35));
      const moteBoost = 1.18 + 0.32 * (0.5 + 0.5 * Math.sin(t * 2.1 + 0.8));
      const rainVelocity = 1.12;

      ctx.clearRect(0, 0, width, height);

      /* mist blobs */
      for (const blob of MIST_BLOBS) {
        const driftX = animate ? Math.sin(t * blob.driftSpeedX + blob.phase) * 34 : 0;
        const driftY = animate ? Math.cos(t * blob.driftSpeedY + blob.phase) * 20 : 0;
        const bx = blob.xRatio * width + driftX + wind.mistShiftX * (0.7 + blob.phase * 0.1);
        const by = blob.yRatio * height + driftY + wind.mistShiftY * (0.7 + blob.phase * 0.1);
        const br = Math.max(width, height) * blob.radiusRatio * mistScale;
        ctx.globalAlpha = Math.min(0.32, blob.baseAlpha * (1 + 0.22 * activeMix));
        ctx.drawImage(sprites[blob.tone], bx - br, by - br, br * 2, br * 2);
      }

      /* rain streaks — angled by pointer wind */
      const cosA = Math.cos(wind.angleRad);
      const sinA = Math.sin(wind.angleRad);
      ctx.lineCap = 'round';
      for (const drop of rain) {
        if (animate) {
          const travel = drop.speed * rainVelocity * dt;
          drop.y += travel * cosA;
          drop.x += travel * sinA;
          if (drop.y - drop.length > height + 20) {
            drop.y = -drop.length - 10;
            drop.x = (drop.x + width + 180) % (width + 160) - 80;
          }
          if (drop.x < -120) drop.x += width + 160;
          if (drop.x > width + 120) drop.x -= width + 160;
        }
        const x0 = drop.x - sinA * drop.length;
        const y0 = drop.y - cosA * drop.length;
        ctx.strokeStyle =
          drop.depth > 0.72 && drop.x > width * 0.45
            ? 'rgba(223, 188, 145, 1)'
            : 'rgba(246, 244, 239, 1)';
        ctx.globalAlpha = Math.min(0.42, drop.opacity * (1 + 0.24 * activeMix));
        ctx.lineWidth = drop.width;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(drop.x, drop.y);
        ctx.stroke();
      }

      /* motes */
      for (const mote of motes) {
        if (animate) {
          mote.y += mote.speedY * dt;
          mote.x += (mote.speedX + wind.mistShiftX * 0.25 * (0.4 + mote.depth)) * dt;
          if (mote.y < -12) mote.y = height + 12;
          if (mote.x < -12) mote.x = width + 12;
          if (mote.x > width + 12) mote.x = -12;
        }
        const twinkle = 0.65 + 0.35 * Math.sin(t * 1.4 + mote.phase);
        ctx.globalAlpha = Math.min(0.68, mote.alpha * twinkle * moteBoost);
        const r = mote.radius * (2.6 + 0.6 * activeMix);
        ctx.drawImage(moteSprite, mote.x - r, mote.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (ts: number) => {
      if (!visible || document.hidden || reducedRef.current) {
        lastFrame = 0;
        lastTs = ts;
        rafId = window.requestAnimationFrame(loop);
        return;
      }
      /* the reference's 32 ms gap */
      if (ts - lastFrame >= 32) {
        lastFrame = ts;
        activeMix += (1 - activeMix) * 0.04;
        draw(ts, true);
      }
      rafId = window.requestAnimationFrame(loop);
    };

    resize();
    /* reduced motion: one honest still — rain frozen mid-fall */
    draw(performance.now(), false);

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.01 },
          )
        : null;
    observer?.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      };
    };

    const onResize = () => {
      resize();
      draw(performance.now(), false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid={testId ?? 'twilight-rain-canvas'}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
