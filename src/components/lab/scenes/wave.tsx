"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";
import { GLSL_NOISE } from "../glsl";

/* ═══════════════════════════════════════════════════════════════
   ACT 4 · THE DANCE — the equilibrium field

   One full-screen sheet of domain-warped noise: two currents, a
   forward one and a reverse one, woven through the same cloth.
   Your scroll sets the balance between them; your pointer drags
   a slow wake through the field. One quad, one fragment shader.
   ═══════════════════════════════════════════════════════════════ */

const WAVE_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const WAVE_FRAG = /* glsl */ `
uniform float uTime;
uniform float uBalance;   /* 0 forward-dominant → 1 reverse-dominant */
uniform vec2 uPointer;
uniform float uOpacity;
varying vec2 vUv;
${GLSL_NOISE}
void main(){
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(2.4, 1.5);

  /* the pointer drags a slow wake through the field */
  vec2 mp = (uPointer * vec2(1.2, 0.75));
  float md = length(p - mp);
  p += normalize(p - mp + 0.0001) * 0.28 * exp(-md * 1.8);

  float t = uTime * 0.09;
  vec2 q = vec2(fbm(vec3(p, t)), fbm(vec3(p + vec2(5.2, 1.3), -t)));
  vec2 r = vec2(
    fbm(vec3(p + 2.6 * q + vec2(1.7, 9.2), t * 1.4)),
    fbm(vec3(p + 2.6 * q + vec2(8.3, 2.8), -t * 1.1))
  );
  float f = fbm(vec3(p + 2.4 * r, t));

  /* two currents — emerald forward, coral reverse — woven by f */
  float weave = smoothstep(0.28, 0.72, f + (uBalance - 0.5) * 0.55);
  vec3 fwd = vec3(0.10, 0.78, 0.55);
  vec3 rev = vec3(1.0, 0.40, 0.38);
  vec3 col = mix(fwd, rev, weave);

  /* the loom: thin bright filaments where the currents meet */
  float filament = smoothstep(0.012, 0.0, abs(f - 0.5))
    * smoothstep(0.35, 0.65, f);
  col += vec3(0.9) * filament * 0.55;

  /* depth vignette — the field stays moody, never floods the room */
  float vig = smoothstep(1.05, 0.25, length(uv - 0.5) * 1.5);
  col *= 0.10 + vig * 0.52;

  float a = uOpacity * (0.42 + vig * 0.42);
  gl_FragColor = vec4(col, a);
}
`;

/* module-scope uniforms — the scene mounts once inside the single
   canvas, and every value is overwritten by the ticker each frame */
const uniforms = {
  uTime: { value: 0 },
  uBalance: { value: 0.5 },
  uPointer: { value: new THREE.Vector2() },
  uOpacity: { value: 0 },
};

export default function Wave() {
  const mesh = useRef<THREE.Mesh>(null);
  const weight = useRef(0);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const w = weight.current;
    const target = stage.act === 4 ? 1 : 0;
    weight.current += (target - w) * Math.min(delta * 3.0, 1);
    if (weight.current < 0.015) {
      if (m.visible) m.visible = false;
      return;
    }
    m.visible = true;
    uniforms.uTime.value = state.clock.elapsedTime;
    /* the balance swings forward and back across the act */
    uniforms.uBalance.value = 0.5 + Math.sin(stage.actProg * Math.PI * 2) * 0.42;
    uniforms.uPointer.value.set(stage.pointerX, stage.pointerY);
    uniforms.uOpacity.value = weight.current * Math.min(stage.intro + 0.3, 1);
    m.scale.setScalar(1 + (1 - weight.current) * 0.12);
  });

  return (
    <mesh ref={mesh} visible={false} position={[0, 0, -4]}>
      <planeGeometry args={[18.5, 10.6]} />
      <shaderMaterial
        ref={(m) => {
          if (m) m.uniforms = uniforms;
        }}
        vertexShader={WAVE_VERT}
        fragmentShader={WAVE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
