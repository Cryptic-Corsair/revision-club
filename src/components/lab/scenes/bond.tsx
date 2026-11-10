"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";
import { GLSL_NOISE } from "../glsl";

/* ═══════════════════════════════════════════════════════════════
   ACT 2 · THE BOND — nothing stands alone

   Two nuclei drift toward each other under your scroll. Around
   them, two thousand charges wait in a swarm; as the gap closes
   they pour into the bridge between the pair and light it. One
   points draw call, all choreography in the vertex shader.
   ═══════════════════════════════════════════════════════════════ */

const GAP_START = 3.1;
const GAP_END = 0.62;

const NUCLEUS_VERT = /* glsl */ `
uniform float uOpacity;
varying vec3 vN;
varying vec3 vP;
void main(){
  vN = normalMatrix * normal;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const NUCLEUS_FRAG = /* glsl */ `
uniform float uOpacity;
uniform float uHeat;
uniform vec3 uTint;
varying vec3 vN;
varying vec3 vP;
void main(){
  vec3 V = normalize(-vP);
  vec3 N = normalize(vN);
  float fr = pow(1.0 - abs(dot(N, V)), 1.9);
  vec3 col = uTint * (0.16 + fr * 1.5 + uHeat * 0.8);
  col += uTint * pow(max(dot(N, V), 0.0), 3.0) * 0.55;
  gl_FragColor = vec4(col, uOpacity * (0.35 + fr * 0.9));
}
`;

const CHARGE_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uT;        /* 0…1 the approach */
uniform float uDpr;
varying float vS;
varying float vGlow;
${GLSL_NOISE}
void main(){
  float s = aSeed;
  vS = s;
  bool side = s < 0.5;
  float dir = side ? -1.0 : 1.0;
  float gap = mix(${GAP_START.toFixed(1)}, ${GAP_END.toFixed(2)}, uT);

  /* swarm phase: charges orbit their own nucleus */
  float shell = 0.55 + fract(s * 7.31) * 1.35;
  float a = uTime * (0.3 + fract(s * 3.7) * 0.5) + s * 41.0;
  float tilt = s * 6.2831;
  vec3 orbit = vec3(cos(a) * shell, sin(a) * shell * 0.7, sin(a * 0.8) * shell * 0.5);
  float ct = cos(tilt), st = sin(tilt);
  orbit = vec3(orbit.x, orbit.y * ct - orbit.z * st, orbit.y * st + orbit.z * ct);

  /* bridge phase: a river of charge between the pair */
  float flow = fract(s * 13.7 + uTime * (0.22 + uT * 0.3));
  vec3 bp = mix(vec3(-dir * gap, 0.0, 0.0), vec3(dir * gap, 0.0, 0.0), flow);
  float amp = sin(flow * 3.14159) * (0.32 + 0.5 * uT);
  bp.x += snoise(vec3(s * 40.0, flow * 3.0, uTime * 0.3)) * amp;
  bp.y += snoise(vec3(s * 21.0, flow * 4.0 + 7.0, uTime * 0.25)) * amp * 1.4;
  bp.z += snoise(vec3(s * 17.0, flow * 5.0 + 13.0, uTime * 0.2)) * amp;

  /* the hand-over: swarm dissolves into the bridge as uT passes 0.45 */
  float mixT = smoothstep(0.42, 0.72, uT);
  vec3 swarmPos = vec3(dir * gap, 0.0, 0.0) + orbit;
  vec3 p = mix(swarmPos, bp, mixT);
  /* half the charges keep orbiting even in the bond — the lone pairs */
  float keepOrbit = step(0.78, fract(s * 29.3));
  p = mix(p, swarmPos, keepOrbit);

  vGlow = mixT * (1.0 - keepOrbit) * smoothstep(0.0, 0.15, flow) * smoothstep(1.0, 0.85, flow);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.3 + fract(s * 9.3) * 2.1) * uDpr * (40.0 / -mv.z) * (1.0 + vGlow * 1.6);
  gl_Position = projectionMatrix * mv;
}
`;

const CHARGE_FRAG = /* glsl */ `
uniform float uOpacity;
varying float vS;
varying float vGlow;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.06, d);
  vec3 cold = vS < 0.5 ? vec3(1.0, 0.36, 0.48) : vec3(0.48, 0.72, 1.0);
  vec3 hot = vec3(1.0, 0.84, 0.42);
  vec3 col = mix(cold, hot, vGlow);
  gl_FragColor = vec4(col, a * (0.5 + vGlow * 0.7) * uOpacity);
}
`;

/* module-scope uniforms — the scene mounts once inside the single
   canvas, and every value is overwritten by the ticker each frame */
const nucU = {
  uOpacity: { value: 0 },
  uHeat: { value: 0 },
  uTint: { value: new THREE.Color("#FF5C7A") },
};
const nucUB = {
  uOpacity: { value: 0 },
  uHeat: { value: 0 },
  uTint: { value: new THREE.Color("#3ED2FF") },
};
const chargeU = {
  uTime: { value: 0 },
  uT: { value: 0 },
  uOpacity: { value: 0 },
  uDpr: { value: 1 },
};

export default function Bond() {
  const group = useRef<THREE.Group>(null);
  const nA = useRef<THREE.Mesh>(null);
  const nB = useRef<THREE.Mesh>(null);
  const weight = useRef(0);
  const dpr = useThree((s) => s.viewport.dpr);

  const seeds = useMemo(
    () => new Float32Array(2000).map(() => Math.random()),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const w = weight.current;
    const target = stage.act === 2 ? 1 : 0;
    weight.current += (target - w) * Math.min(delta * 3.2, 1);
    if (weight.current < 0.015) {
      if (g.visible) g.visible = false;
      return;
    }
    g.visible = true;

    const t = state.clock.elapsedTime;
    /* the approach runs twice through the act: near, apart, near again */
    const saw = stage.actProg < 0.5
      ? stage.actProg * 2
      : (1 - stage.actProg) * 2;
    const tt = Math.pow(saw, 0.85);
    const gap = THREE.MathUtils.lerp(GAP_START, GAP_END, tt);

    nA.current?.position.set(-gap, 0, 0);
    nB.current?.position.set(gap, 0, 0);
    const heat = Math.pow(tt, 2.4) * weight.current;
    nucU.uHeat.value = heat;
    nucUB.uHeat.value = heat;
    nucU.uOpacity.value = weight.current;
    nucUB.uOpacity.value = weight.current;
    chargeU.uTime.value = t;
    chargeU.uT.value = tt;
    chargeU.uOpacity.value = weight.current * Math.min(stage.intro + 0.3, 1);
    chargeU.uDpr.value = dpr;
    g.rotation.y = Math.sin(t * 0.14) * 0.22 + stage.pointerX * 0.1;
    g.rotation.x = Math.cos(t * 0.11) * 0.08 + stage.pointerY * 0.06;
  });

  return (
    <group ref={group} visible={false}>
      <mesh ref={nA}>
        <sphereGeometry args={[0.52, 48, 32]} />
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = nucU;
          }}
          vertexShader={NUCLEUS_VERT}
          fragmentShader={NUCLEUS_FRAG}
          uniforms={nucU}
          transparent
        />
      </mesh>
      <mesh ref={nB}>
        <sphereGeometry args={[0.52, 48, 32]} />
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = nucUB;
          }}
          vertexShader={NUCLEUS_VERT}
          fragmentShader={NUCLEUS_FRAG}
          uniforms={nucUB}
          transparent
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(2000 * 3), 3]}
          />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = chargeU;
          }}
          vertexShader={CHARGE_VERT}
          fragmentShader={CHARGE_FRAG}
          uniforms={chargeU}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
