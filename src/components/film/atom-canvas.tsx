"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { stage, PALETTE, WOBBLE } from "./stage";

/* ═══════════════════════════════════════════════════════════════
   THE FILM · the particle universe

   ONE canvas, ONE scene, ONE draw call. Every particle carries six
   positions — nebula, atom, benzene, reaction coordinate, helix,
   starfield — baked into vertex attributes once at startup. After
   that the CPU never touches geometry again: scrolling only moves
   a float (uStage) and the vertex shader blends between formations
   on the GPU. Per frame the whole film costs:

     · 2 uniform writes for the morph (stage chase + palette lerp)
     · 1 draw call of N points, additive, no depth, no post
     · a camera lerp toward the pointer

   GPU hygiene, the whole checklist:
     · transform-free, layout-free — pure WebGL, zero DOM animation
     · DPR capped at 1.75, and an EMA of frame time steps it down
       to 1.15 if a machine struggles (and back up if it doesn't)
     · additive points with depth test/write OFF — the cheapest
       honest blend there is
     · the ticker sleeps while the reader is open (display:none)
     · rAF itself is GSAP's one shared loop — no parallel loops
     · context-loss is caught and the scene quietly rebuilds
     · the motion knob / prefers-reduced-motion freezes time: the
       film then only ever moves under the user's own scroll
   ═══════════════════════════════════════════════════════════════ */

const TAU = Math.PI * 2;

/* deterministic RNG — the sky is the same sky on every visit */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ————— the six formations —————
   Each generator receives the particle's u ∈ [0,1] (its "role") and
   the seeded RNG, and returns where that particle stands when the
   film is on this stage. Roles persist across stages, so the morphs
   read as matter rearranging — nucleus dust becomes a π cloud
   becomes a helix strand — not random teleporting. */
type Gen = (u: number, i: number, rnd: () => number, g: () => number) => [number, number, number];

const rotX = (x: number, y: number, z: number, a: number): [number, number, number] => {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
};
const rotZ = (x: number, y: number, z: number, a: number): [number, number, number] => {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c - y * s, x * s + y * c, z];
};

const gens: Gen[] = [
  // 0 · nebula — a 3-arm spiral, tilted, thicker at the core
  (_u, i, rnd, g) => {
    const r = Math.pow(rnd(), 0.68) * 7.6;
    const arm = (i % 3) * (TAU / 3);
    const ang = arm + r * 0.52 + g() * 0.3;
    const x = Math.cos(ang) * r;
    const z = Math.sin(ang) * r;
    const y = g() * 0.55 * (1.1 - r / 8.5);
    return rotX(x, y, z, 0.55);
  },

  // 1 · atom — nucleus ball + three tilted orbitals + faint haze
  (u, _i, rnd, g) => {
    if (u < 0.16) {
      const r = Math.pow(rnd(), 2.4) * 0.6;
      let x = g(), y = g(), z = g();
      const l = Math.hypot(x, y, z) || 1;
      return [x / l * r, y / l * r, z / l * r];
    }
    if (u < 0.8) {
      const v = (u - 0.16) / 0.64;
      const ring = Math.min(2, Math.floor(v * 3));
      const t = (v * 3 - ring) * TAU;
      const R = [1.55, 2.35, 3.15][ring];
      let p: [number, number, number] = [
        Math.cos(t) * (R + g() * 0.055),
        Math.sin(t) * (R + g() * 0.055) * 0.98,
        g() * 0.12,
      ];
      if (ring === 0) p = rotX(p[0], p[1], p[2], 0.95);
      if (ring === 1) { p = rotX(p[0], p[1], p[2], -0.55); p = rotZ(p[0], p[1], p[2], 0.5); }
      if (ring === 2) { p = rotX(p[0], p[1], p[2], 0.22); p = rotZ(p[0], p[1], p[2], -0.9); }
      return p;
    }
    let x = g(), y = g(), z = g();
    const l = Math.hypot(x, y, z) || 1;
    const r = 2.3 + Math.abs(g()) * 1.2;
    return [x / l * r, y / l * r, z / l * r];
  },

  // 2 · benzene — the ring, six C–H spokes, two π clouds, dust
  (u, i, rnd, g) => {
    let p: [number, number, number];
    if (u < 0.4) {
      const v = u / 0.4;
      const seg = Math.floor(v * 6);
      const f = v * 6 - seg;
      const a0 = (seg * TAU) / 6, a1 = ((seg + 1) * TAU) / 6;
      p = [lerp(Math.cos(a0), Math.cos(a1), f) * 2.25, lerp(Math.sin(a0), Math.sin(a1), f) * 2.25, g() * 0.045];
    } else if (u < 0.62) {
      const v = (u - 0.4) / 0.22;
      const k = Math.floor(v * 6);
      const f = v * 6 - k;
      const a = (k * TAU) / 6;
      const r = 2.25 + f * 1.25;
      p = [Math.cos(a) * r, Math.sin(a) * r, g() * 0.045];
    } else if (u < 0.86) {
      const top = i % 2 === 0;
      const ang = rnd() * TAU;
      const r = 1.7 + g() * 0.22;
      p = [Math.cos(ang) * r, Math.sin(ang) * r, (top ? 0.55 : -0.55) + g() * 0.09];
    } else {
      const ang = rnd() * TAU;
      const r = 1 + Math.pow(rnd(), 0.7) * 3.8;
      p = [Math.cos(ang) * r, g() * 0.35, Math.sin(ang) * r];
    }
    return rotX(p[0], p[1], p[2], -0.55);
  },

  // 3 · energy — an exothermic reaction coordinate + axis + sparks
  (u, _i, rnd, g) => {
    if (u < 0.74) {
      const x = ((u / 0.74) * 2 - 1) * 4.6;
      const base = lerp(0.85, -0.75, smooth(-2.1, 2.1, x));
      const peak = 2.7 * Math.exp(-(x * x) / 1.12);
      return [x + g() * 0.06, base + peak + g() * 0.12, g() * 0.3];
    }
    if (u < 0.86) {
      return [(rnd() * 2 - 1) * 4.9, -2.05 + g() * 0.05, g() * 0.15];
    }
    return [3.1 + g() * 0.55, -0.85 + g() * 0.5, g() * 0.5];
  },

  // 4 · helix — two strands 2.2 turns long, fifteen rungs between
  (u, _i, _rnd, g) => {
    const R = 1.4, H = 6.6, TURNS = 2.2;
    if (u < 0.35) {
      const t = u / 0.35;
      const ang = t * TAU * TURNS;
      return [Math.cos(ang) * R + g() * 0.09, (t - 0.5) * H, Math.sin(ang) * R + g() * 0.09];
    }
    if (u < 0.7) {
      const t = (u - 0.35) / 0.35;
      const ang = t * TAU * TURNS + Math.PI;
      return [Math.cos(ang) * R + g() * 0.09, (t - 0.5) * H, Math.sin(ang) * R + g() * 0.09];
    }
    const v = (u - 0.7) / 0.3;
    const j = Math.floor(v * 15);
    const f = v * 15 - j;
    const yj = ((j + 0.5) / 15 - 0.5) * H;
    const ang = ((j + 0.5) / 15) * TAU * TURNS;
    const ax = Math.cos(ang) * R, az = Math.sin(ang) * R;
    return [lerp(ax, -ax, f) + g() * 0.04, yj + g() * 0.04, lerp(az, -az, f) + g() * 0.04];
  },

  // 5 · starfield — the cast disperses into a wide shell
  (_u, _i, rnd, g) => {
    let x = g(), y = g(), z = g();
    const l = Math.hypot(x, y, z) || 1;
    const r = 10.5 + Math.pow(rnd(), 1.5) * 7.5;
    return [x / l * r, y / l * r, z / l * r];
  },
];

const VERT = /* glsl */ `
attribute vec3 aP0;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec3 aP5;
attribute vec2 aSeed; // x: size/twinkle seed · y: colour-mix seat
uniform float uTime;
uniform float uStage;
uniform float uScale;   // drawing-buffer height / 2 (px)
uniform float uWorld;   // base point size, world units
uniform float uWobble;
uniform float uEnergy;
uniform float uMotion;  // 1 = alive, 0 = frozen (user-driven only)
uniform float uIntro;   // 0 → 1 load-in: the cloud condenses
uniform vec3 uColA;
uniform vec3 uColB;
varying vec3 vColor;
varying float vAlpha;

float wgt(float s, float k) {
  return clamp(1.0 - abs(s - k), 0.0, 1.0);
}

void main() {
  float s = clamp(uStage, 0.0, 5.0);
  // only the helix earns a rotation — one mat-op for its share
  float c = cos(uTime * 0.22), sn = sin(uTime * 0.22);
  vec3 p4 = vec3(c * aP4.x + sn * aP4.z, aP4.y, -sn * aP4.x + c * aP4.z);
  vec3 p = aP0 * wgt(s, 0.0)
         + aP1 * wgt(s, 1.0)
         + aP2 * wgt(s, 2.0)
         + aP3 * wgt(s, 3.0)
         + p4  * wgt(s, 4.0)
         + aP5 * wgt(s, 5.0);
  // load-in: the sky condenses out of a wide scatter
  p *= mix(2.4, 1.0, uIntro);
  // the breath — a tiny private orbit per particle
  float t = uTime * (0.55 + aSeed.x * 0.65);
  p += uWobble * uMotion * vec3(
    sin(t * 1.31 + aSeed.x * 397.0),
    cos(t * 1.07 + aSeed.x * 571.0),
    sin(t * 0.83 + aSeed.x * 233.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float tw = 1.0 - uMotion * 0.3 * (0.5 + 0.5 * sin(uTime * 2.2 + aSeed.x * 619.0));
  float fade = 1.0 - smoothstep(7.0, 30.0, -mv.z);
  vAlpha = (0.85 + 0.55 * aSeed.y) * tw * (0.2 + 0.8 * fade);
  vColor = mix(uColA, uColB, aSeed.y * 0.65);
  vColor = mix(vColor, vec3(1.0, 0.96, 0.88), uEnergy * 0.45 * aSeed.y);
  float size = uWorld * (0.55 + 0.9 * aSeed.x) * (1.0 + uEnergy * 0.55) * mix(0.55, 1.0, uIntro);
  gl_PointSize = size * uScale / -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv) * 2.0;
  if (d > 1.0) discard;
  float glow = smoothstep(1.0, 0.0, d);
  float core = smoothstep(0.42, 0.0, d);
  vec3 col = vColor * (0.52 + 1.08 * core);
  gl_FragColor = vec4(col * glow, glow * vAlpha);
}
`;

export default function AtomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ————— casting ————— */
    const compact = window.matchMedia("(max-width: 820px)").matches;
    const N = compact ? 9000 : 17000;
    const basePr = Math.min(window.devicePixelRatio || 1, 1.75);
    let quality = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      stencil: false,
      depth: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
    camera.position.set(0, 0, 10.2);

    /* ————— geometry: six baked formations ————— */
    const rnd = mulberry32(0x1a1c74);
    const g = () => (rnd() + rnd() + rnd() - 1.5) * 2; // ~N(0,1)
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3); // attribute "position" (the shader ignores it)
    const seeds = new Float32Array(N * 2);
    const targets: Float32Array[] = gens.map(() => new Float32Array(N * 3));

    for (let i = 0; i < N; i++) {
      const u = i / N;
      seeds[i * 2] = rnd();
      seeds[i * 2 + 1] = rnd();
      for (let s = 0; s < gens.length; s++) {
        const [x, y, z] = gens[s](u, i, rnd, g);
        targets[s][i * 3] = x;
        targets[s][i * 3 + 1] = y;
        targets[s][i * 3 + 2] = z;
      }
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    targets.forEach((t, s) => geo.setAttribute(`aP${s}`, new THREE.BufferAttribute(t, 3)));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 2));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);

    const uniforms = {
      uTime: { value: 0 },
      uStage: { value: 0 },
      uScale: { value: 600 },
      uWorld: { value: compact ? 0.09 : 0.08 },
      uWobble: { value: WOBBLE[0] },
      uEnergy: { value: 0 },
      uMotion: { value: stage.motion ? 1 : 0 },
      uIntro: { value: stage.motion ? 0 : 1 },
      uColA: { value: new THREE.Color(PALETTE[0][0]) },
      uColB: { value: new THREE.Color(PALETTE[0][1]) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    /* ————— palette lerp helpers ————— */
    const cA = [new THREE.Color(), new THREE.Color()];
    const cB = [new THREE.Color(), new THREE.Color()];
    const PAL = PALETTE.map(([a, b]) => [new THREE.Color(a), new THREE.Color(b)] as const);
    /* chapters push their formation off the text column — but only
       where there is width to push into (phones stay centred) */
    const SCENE_X = [0, 1.0, 1.0, 1.0, 1.0, 0];
    let sceneX = 0;

    /* ————— sizing —————
        the canvas is sized from the live viewport and re-measured by
        a ResizeObserver — emulator viewport changes, mobile URL-bar
        resizes and rotation all land without a window resize event */
    const size = new THREE.Vector2();
    let lastW = 0, lastH = 0;
    const applySize = (force = false) => {
      const w = window.innerWidth, h = window.innerHeight;
      if (!force && w === lastW && h === lastH) return;
      lastW = w; lastH = h;
      renderer.setPixelRatio(basePr * quality);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.getDrawingBufferSize(size);
      uniforms.uScale.value = size.y * 0.5;
      // narrow viewports pull the whole sky closer so no formation clips
      scene.scale.setScalar(Math.min(1, (7.42 * camera.aspect) / 10.4));
    };
    applySize(true);
    const ro = new ResizeObserver(() => applySize());
    ro.observe(document.documentElement);

    /* ————— the one frame loop ————— */
    let ema = 16;
    let frames = 0;
    let px = 0, py = 0;

    const tick = (_time: number, deltaMS: number) => {
      if (stage.reading) return;
      const dt = Math.min(deltaMS / 16.667, 4);
      const k = 1 - Math.exp(-dt * 0.085);

      stage.current += (stage.target - stage.current) * k;
      px += (stage.pointerX - px) * (1 - Math.exp(-dt * 0.06));
      py += (stage.pointerY - py) * (1 - Math.exp(-dt * 0.06));

      const cur = Math.min(stage.current, 4.9999);
      const i = Math.floor(cur);
      const f = cur - i;
      uniforms.uStage.value = stage.current;
      uniforms.uTime.value = stage.motion ? performance.now() / 1000 : 0;
      uniforms.uIntro.value = stage.intro;
      uniforms.uEnergy.value = stage.energy;
      uniforms.uWobble.value = lerp(WOBBLE[i], WOBBLE[Math.min(i + 1, 5)], f);
      cA[0].copy(PAL[i][0]); cA[1].copy(PAL[Math.min(i + 1, 5)][0]);
      cB[0].copy(PAL[i][1]); cB[1].copy(PAL[Math.min(i + 1, 5)][1]);
      uniforms.uColA.value.lerpColors(cA[0], cA[1], f);
      uniforms.uColB.value.lerpColors(cB[0], cB[1], f);

      const wide = Math.min(1, Math.max(0, (camera.aspect - 0.95) / 0.3));
      sceneX += ((SCENE_X[i] + (SCENE_X[Math.min(i + 1, 5)] - SCENE_X[i]) * f) * wide - sceneX) * k;
      scene.position.x = sceneX;

      if (stage.pointerOn) {
        camera.position.x = px * 0.55;
        camera.position.y = -py * 0.34;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);

      /* adaptive quality — the promise that the GPU never fries */
      ema = ema * 0.94 + Math.min(deltaMS, 80) * 0.06;
      if (++frames % 180 === 0) {
        if (ema > 26 && quality > 0.55) {
          quality -= 0.2;
          applySize(true);
        } else if (ema < 11 && quality < 1) {
          quality += 0.2;
          applySize(true);
        }
      }
    };
    gsap.ticker.add(tick);

    /* ————— listeners ————— */
    const onResize = () => applySize();
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      stage.pointerOn = true;
      stage.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLost = (e: Event) => e.preventDefault();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);

    /* ————— cleanup ————— */
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="film-canvas"
    />
  );
}
