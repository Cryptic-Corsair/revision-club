"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";
import { GLSL_NOISE } from "../glsl";

/* ═══════════════════════════════════════════════════════════════
   ACT 0 · MATTER — the orb

   One displaced, iridescent body wearing a thin shell of seven
   hundred electrons on tilted elliptical orbits. Grab it and it
   spins with inertia; leave it and it turns on its own; the
   pointer slides a highlight across its skin. Two draw calls.
   ═══════════════════════════════════════════════════════════════ */

const BLOB_VERT = /* glsl */ `
uniform float uTime;
uniform float uIntro;
varying vec3 vN;
varying vec3 vP;
varying float vD;
${GLSL_NOISE}
void main(){
  float n = snoise(normal * 1.7 + uTime * 0.22) * 0.24;
  n += snoise(normal * 4.3 - uTime * 0.35) * 0.055;
  vD = n;
  vec3 p = position + normal * n * (0.25 + 0.75 * uIntro);
  vN = normalMatrix * normal;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vP = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const BLOB_FRAG = /* glsl */ `
uniform float uTime;
uniform float uOpacity;
uniform vec2 uPointer;
varying vec3 vN;
varying vec3 vP;
varying float vD;
void main(){
  vec3 V = normalize(-vP);
  vec3 N = normalize(vN);
  float fr = pow(1.0 - abs(dot(N, V)), 1.55);
  float hue = fr * 1.35 + vD * 2.4 + uTime * 0.05;
  vec3 irid = 0.5 + 0.5 * cos(6.2831 * (hue + vec3(0.0, 0.33, 0.67)));
  vec3 deep = vec3(0.075, 0.045, 0.16);
  vec3 col = mix(deep, irid * 1.15, clamp(fr * 1.1, 0.0, 1.0));
  vec3 L = normalize(vec3(uPointer.x * 2.2, uPointer.y * 2.2, 1.6));
  float spec = pow(max(dot(reflect(-L, N), V), 0.0), 26.0);
  col += vec3(1.0) * spec * 0.55;
  col += vec3(0.16, 0.10, 0.32) * pow(max(dot(N, V), 0.0), 2.0);
  gl_FragColor = vec4(col, uOpacity);
}
`;

const SWARM_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uIntro;
uniform float uDpr;
varying float vS;
void main(){
  float s = aSeed;
  float shell = 2.55 + fract(s * 7.31) * 2.1;
  float dir = fract(s * 5.71) > 0.5 ? 1.0 : -1.0;
  float speed = (0.10 + fract(s * 3.17) * 0.20) * dir;
  float tilt = s * 6.2831;
  float a = uTime * speed + s * 41.0;
  vec3 p = vec3(cos(a) * shell, sin(a) * shell * 0.58, sin(a * 0.7) * 0.4);
  float ct = cos(tilt), st = sin(tilt);
  p = vec3(p.x, p.y * ct - p.z * st, p.y * st + p.z * ct);
  float ct2 = cos(tilt * 1.7), st2 = sin(tilt * 1.7);
  p = vec3(p.x * ct2 - p.z * st2, p.y, p.x * st2 + p.z * ct2);
  vS = s;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.5 + fract(s * 9.3) * 2.4) * uDpr * (46.0 / -mv.z) * (0.2 + 0.8 * uIntro);
  gl_Position = projectionMatrix * mv;
}
`;

const SWARM_FRAG = /* glsl */ `
uniform float uOpacity;
varying float vS;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.08, d);
  vec3 col = mix(vec3(0.24, 0.82, 1.0), vec3(0.77, 0.55, 1.0), fract(vS * 13.7));
  gl_FragColor = vec4(col, a * 0.85 * uOpacity);
}
`;

/* module-scope uniforms — the scene mounts once inside the single
   canvas, and every value is overwritten by the ticker each frame */
const blobU = {
  uTime: { value: 0 },
  uIntro: { value: 0 },
  uOpacity: { value: 0 },
  uPointer: { value: new THREE.Vector2() },
};
const swarmU = {
  uTime: { value: 0 },
  uIntro: { value: 0 },
  uOpacity: { value: 0 },
  uDpr: { value: 1 },
};

export default function Orbital() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef({ rx: 0.2, ry: 0, vx: 0, vy: 0.0016, drag: false, lx: 0, ly: 0 });
  const weight = useRef(0);
  const dpr = useThree((s) => s.viewport.dpr);

  /* ————— drag to spin, with inertia ————— */
  useEffect(() => {
    const canvas = () => document.querySelector(".lab-stage canvas");
    const down = (e: PointerEvent) => {
      if (stage.act !== 0 || stage.reading) return;
      const t = e.target as HTMLElement;
      if (!(t instanceof HTMLCanvasElement)) return;
      const s = spin.current;
      s.drag = true;
      s.lx = e.clientX;
      s.ly = e.clientY;
      s.vx = 0;
      s.vy = 0;
    };
    const move = (e: PointerEvent) => {
      const s = spin.current;
      if (!s.drag) return;
      s.vy = (e.clientX - s.lx) * 0.0042;
      s.vx = (e.clientY - s.ly) * 0.0042;
      s.ry += s.vy;
      s.rx += s.vx;
      s.lx = e.clientX;
      s.ly = e.clientY;
    };
    const up = () => (spin.current.drag = false);
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const w = weight.current;
    const target = stage.act === 0 ? 1 : 0;
    weight.current += (target - w) * Math.min(delta * 3.2, 1);
    if (weight.current < 0.015) {
      if (g.visible) g.visible = false;
      return;
    }
    g.visible = true;

    const s = spin.current;
    if (!s.drag) {
      /* inertia decays toward the idle turn */
      s.vx *= Math.pow(0.94, delta * 60);
      s.vy *= Math.pow(0.94, delta * 60);
      s.vy += (0.0016 - s.vy) * Math.min(delta * 0.8, 1) * 0.02;
      s.rx += s.vx;
      s.ry += s.vy;
    }
    g.rotation.x = s.rx;
    g.rotation.y = s.ry;

    const t = state.clock.elapsedTime;
    const o = weight.current;
    blobU.uTime.value = t;
    blobU.uIntro.value = stage.intro;
    blobU.uOpacity.value = o;
    blobU.uPointer.value.set(stage.pointerX, stage.pointerY);
    swarmU.uTime.value = t * (1 + stage.vel * 1.5);
    swarmU.uIntro.value = stage.intro;
    swarmU.uOpacity.value = o;
    swarmU.uDpr.value = dpr;

    /* the load-in: the orb condenses and breathes once */
    const sc = (0.55 + 0.45 * stage.intro) * (1 + Math.sin(t * 0.6) * 0.012);
    g.scale.setScalar(sc);
  });

  return (
    <group ref={group} visible={false}>
      <mesh>
        <sphereGeometry args={[1.85, 110, 72]} />
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = blobU;
          }}
          vertexShader={BLOB_VERT}
          fragmentShader={BLOB_FRAG}
          uniforms={blobU}
          transparent
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(700 * 3), 3]}
          />
          <bufferAttribute
            attach="attributes-aSeed"
            args={[
              new Float32Array(700).map(() => Math.random()),
              1,
            ]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = swarmU;
          }}
          vertexShader={SWARM_VERT}
          fragmentShader={SWARM_FRAG}
          uniforms={swarmU}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
