"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 5 · THE ATLAS — the dispersal

   The cast dissolves into a slow, champagne-and-steel starfield.
   It holds still enough to read a map against, drifting only a
   breath, tilting a hair with the pointer. One points draw call.
   ═══════════════════════════════════════════════════════════════ */

const STAR_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uDpr;
varying float vS;
varying float vTw;
void main(){
  float s = aSeed;
  vS = s;
  float rad = 4.0 + fract(s * 7.31) * 11.0;
  float ang = fract(s * 3.17) * 6.2831;
  vec3 p = vec3(cos(ang) * rad, (fract(s * 5.71) - 0.5) * 13.0, sin(ang) * rad * 0.7 - 4.0);
  p.x += sin(uTime * 0.05 + s * 40.0) * 0.35;
  p.y += cos(uTime * 0.04 + s * 21.0) * 0.28;
  vTw = 0.55 + 0.45 * sin(uTime * (0.6 + fract(s * 9.3)) + s * 30.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (0.9 + fract(s * 13.7) * 2.1) * uDpr * (36.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const STAR_FRAG = /* glsl */ `
uniform float uOpacity;
varying float vS;
varying float vTw;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d);
  vec3 col = mix(vec3(0.79, 0.75, 0.66), vec3(0.56, 0.66, 0.75), fract(vS * 11.3));
  gl_FragColor = vec4(col, a * (0.22 + 0.5 * vTw) * uOpacity);
}
`;

/* module-scope uniforms — the scene mounts once inside the single
   canvas, and every value is overwritten by the ticker each frame */
const uniforms = {
  uTime: { value: 0 },
  uOpacity: { value: 0 },
  uDpr: { value: 1 },
};

export default function Starfield() {
  const points = useRef<THREE.Points>(null);
  const weight = useRef(0);
  const dpr = useThree((s) => s.viewport.dpr);

  const seeds = useMemo(
    () => new Float32Array(1700).map(() => Math.random()),
    [],
  );

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const w = weight.current;
    const target = stage.act === 5 ? 1 : 0;
    weight.current += (target - w) * Math.min(delta * 2.6, 1);
    if (weight.current < 0.015) {
      if (p.visible) p.visible = false;
      return;
    }
    p.visible = true;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uOpacity.value = weight.current;
    uniforms.uDpr.value = dpr;
    p.rotation.y = stage.pointerX * 0.045;
    p.rotation.x = -stage.pointerY * 0.03;
  });

  return (
    <points ref={points} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(1700 * 3), 3]}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          args={[seeds, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={(m) => {
          if (m) m.uniforms = uniforms;
        }}
        vertexShader={STAR_VERT}
        fragmentShader={STAR_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
