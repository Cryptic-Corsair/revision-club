"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";
import { GLSL_NOISE } from "../glsl";

/* ═══════════════════════════════════════════════════════════════
   ACT 3 · THE PRICE — the ember field

   Two and a half thousand embers hover in a lattice of calm. The
   fuel is you: scroll fast and the field ignites — embers rise,
   stretch and whiten with your velocity; slow down and the room
   cools back to ember-red. The exothermic flash is written into
   the scrub as the act's own ΔH counter lands. One draw call.
   ═══════════════════════════════════════════════════════════════ */

const EMBER_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uVel;      /* smoothed scroll speed 0…1 */
uniform float uHeat;     /* scrub heat 0…1 */
uniform float uIntro;
uniform float uDpr;
varying float vS;
varying float vFire;
varying float vStreak;
${GLSL_NOISE}
void main(){
  float s = aSeed;
  vS = s;
  float rad = 1.1 + fract(s * 7.31) * 3.6;
  float ang = fract(s * 3.17) * 6.2831;
  vec3 home = vec3(cos(ang) * rad, (fract(s * 5.71) - 0.5) * 5.6, sin(ang) * rad * 0.6);

  /* the burn: rise and churn with heat */
  float churn = uVel * 1.6 + uHeat * 0.8;
  vec3 p = home;
  p.y = mod(home.y + 2.8 + uTime * (0.06 + churn * 0.55) * (0.5 + fract(s * 9.3)), 5.6) - 2.8;
  p.x += snoise(vec3(home.xy * 0.55, uTime * 0.35)) * (0.1 + churn * 0.7);
  p.z += snoise(vec3(home.yz * 0.55, uTime * 0.3 + 9.0)) * (0.1 + churn * 0.5);

  vFire = clamp(churn * 0.75 + snoise(vec3(home.xy * 0.3, uTime * 0.5)) * 0.2, 0.0, 1.0);
  vStreak = clamp(uVel * 1.4 - 0.25, 0.0, 1.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float size = (1.9 + fract(s * 13.7) * 2.9) * (1.0 + vFire * 1.3);
  gl_PointSize = size * uDpr * (42.0 / -mv.z) * (0.2 + 0.8 * uIntro);
  gl_Position = projectionMatrix * mv;
}
`;

const EMBER_FRAG = /* glsl */ `
uniform float uOpacity;
varying float vS;
varying float vFire;
varying float vStreak;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  uv.y /= (1.0 + vStreak * 2.6);
  float d = length(uv);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d);
  vec3 ember = mix(vec3(1.0, 0.30, 0.20), vec3(1.0, 0.62, 0.18), fract(vS * 7.9));
  vec3 hot = vec3(1.0, 0.86, 0.45);
  vec3 col = mix(ember, hot, vFire);
  gl_FragColor = vec4(col, a * (0.52 + vFire * 0.48) * uOpacity);
}
`;

/* module-scope uniforms — the scene mounts once inside the single
   canvas, and every value is overwritten by the ticker each frame */
const uniforms = {
  uTime: { value: 0 },
  uVel: { value: 0 },
  uHeat: { value: 0 },
  uIntro: { value: 0 },
  uOpacity: { value: 0 },
  uDpr: { value: 1 },
};

export default function Fire() {
  const group = useRef<THREE.Group>(null);
  const weight = useRef(0);
  const dpr = useThree((s) => s.viewport.dpr);

  const seeds = useMemo(
    () => new Float32Array(2400).map(() => Math.random()),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const w = weight.current;
    const target = stage.act === 3 ? 1 : 0;
    weight.current += (target - w) * Math.min(delta * 3.2, 1);
    if (weight.current < 0.015) {
      if (g.visible) g.visible = false;
      return;
    }
    g.visible = true;

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uVel.value = stage.vel;
    /* the flash: the act's last quarter is the reaction landing */
    const flash = stage.actProg > 0.72
      ? Math.sin(((stage.actProg - 0.72) / 0.28) * Math.PI)
      : 0;
    uniforms.uHeat.value = Math.min(stage.actProg * 0.5 + flash * 0.9, 1);
    uniforms.uIntro.value = stage.intro;
    uniforms.uOpacity.value = weight.current;
    uniforms.uDpr.value = dpr;
    g.rotation.y = stage.pointerX * 0.12;
    g.rotation.x = -stage.pointerY * 0.08;
  });

  return (
    <group ref={group} visible={false}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(2400 * 3), 3]}
          />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = uniforms;
          }}
          vertexShader={EMBER_VERT}
          fragmentShader={EMBER_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
