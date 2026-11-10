"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { stage, ELEMENTS, CAT_COLOR, type Element } from "../stage";

/* ═══════════════════════════════════════════════════════════════
   ACT 1 · THE CAST — the wall of thirty-six

   The first thirty-six elements, Z=1…36, as real tiles on three
   receding layers. The camera flies straight through them while
   the copy stands aside. Hover a tile and it lifts, glows and
   names itself. Everything is one instanced draw call wearing a
   single canvas atlas.
   ═══════════════════════════════════════════════════════════════ */

const TILE_VERT = /* glsl */ `
attribute vec2 aTile;
attribute vec3 aTint;
attribute float aSeed;
attribute float aHover;
uniform float uTime;
uniform float uSize;
varying vec2 vUv;
varying vec2 vTile;
varying vec3 vTint;
varying float vHover;
void main(){
  vUv = uv;
  vTile = aTile;
  vTint = aTint;
  vHover = aHover;
  vec3 c = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  c.y += sin(uTime * 0.55 + aSeed * 6.2831) * 0.16;
  c.x += cos(uTime * 0.4 + aSeed * 12.9) * 0.1;
  vec4 mv = viewMatrix * vec4(c, 1.0);
  mv.xy += position.xy * uSize * (1.0 + aHover * 0.3);
  gl_Position = projectionMatrix * mv;
}
`;

const TILE_FRAG = /* glsl */ `
uniform sampler2D uAtlas;
uniform float uOpacity;
varying vec2 vUv;
varying vec2 vTile;
varying vec3 vTint;
varying float vHover;
void main(){
  vec2 auv = (vec2(vTile.x, 5.0 - vTile.y) + vUv) / 6.0;
  vec4 tex = texture2D(uAtlas, auv);
  /* hairline frame with softly rounded corners */
  vec2 q = abs(vUv - 0.5) - 0.435;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.035;
  float frame = 1.0 - smoothstep(0.0, 0.012, abs(d));
  float plate = 1.0 - smoothstep(-0.012, 0.01, d);
  vec3 col = vTint * (0.35 + 0.65 * vHover);
  col = mix(col * 0.55, col, frame + plate * tex.a);
  col += vTint * tex.a * plate * (0.75 + 0.85 * vHover);
  col += vTint * frame * (0.5 + 0.9 * vHover);
  float a = (frame * 0.85 + plate * tex.a * 0.95 + plate * 0.10) * uOpacity;
  if (a < 0.012) discard;
  gl_FragColor = vec4(col, a);
}
`;

/* the atlas: six by six cells, each a tile's face — number, symbol, name */
function buildAtlas(): HTMLCanvasElement {
  const cell = 256;
  const cv = document.createElement("canvas");
  cv.width = cell * 6;
  cv.height = cell * 6;
  const ctx = cv.getContext("2d")!;
  ELEMENTS.forEach((el, i) => {
    const cx = (i % 6) * cell;
    const cy = Math.floor(i / 6) * cell;
    ctx.clearRect(cx, cy, cell, cell);
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "top";
    ctx.font = `500 30px "Space Grotesk", system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(String(el.z), cx + 24, cy + 22);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 118px "Syne", system-ui, sans-serif`;
    ctx.fillText(el.sym, cx + cell / 2, cy + cell / 2 - 6);
    ctx.font = `400 26px "Space Grotesk", system-ui, sans-serif`;
    ctx.fillText(el.name.toUpperCase(), cx + cell / 2, cy + cell - 52);
  });
  return cv;
}

const COLS = 4;
const ROWS = 3;
const LAYERS = 3;
const PER_LAYER = COLS * ROWS; /* 12 × 3 = 36 */

/* module-scope uniforms — the scene mounts once inside the single
   canvas, and every value is overwritten by the ticker each frame */
const uniforms = {
  uTime: { value: 0 },
  uSize: { value: 1.8 },
  uOpacity: { value: 0 },
  uAtlas: { value: null as THREE.Texture | null },
};

export default function Cast({
  onHover,
}: {
  onHover: (el: Element | null, x: number, y: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const weight = useRef(0);
  const hoverAttr = useRef<THREE.InstancedBufferAttribute | null>(null);
  const hovered = useRef(-1);

  const attrs = useMemo(() => {
    const n = ELEMENTS.length;
    const tiles = new Float32Array(n * 2);
    const tints = new Float32Array(n * 3);
    const seeds = new Float32Array(n);
    const hovers = new Float32Array(n);
    const c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      tiles[i * 2] = i % 6;
      tiles[i * 2 + 1] = Math.floor(i / 6);
      c.set(CAT_COLOR[ELEMENTS[i].cat]);
      tints[i * 3] = c.r;
      tints[i * 3 + 1] = c.g;
      tints[i * 3 + 2] = c.b;
      seeds[i] = Math.random();
    }
    return { tiles, tints, seeds, hovers };
  }, []);

  /* ————— instance matrices, laid once ————— */
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    let i = 0;
    for (let L = 0; L < LAYERS; L++) {
      for (let r = 0; r < ROWS; r++) {
        for (let cIdx = 0; cIdx < COLS; cIdx++) {
          const x = (cIdx - (COLS - 1) / 2) * 2.75;
          const y = (r - (ROWS - 1) / 2) * 2.15;
          const z = -9 - L * 9;
          m.compose(
            new THREE.Vector3(x, y, z),
            new THREE.Quaternion(),
            new THREE.Vector3(1.8, 1.8, 1.8),
          );
          mesh.setMatrixAt(i++, m);
        }
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  /* ————— the atlas texture, redrawn once the real fonts land ————— */
  useEffect(() => {
    const tex = new THREE.CanvasTexture(buildAtlas());
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    uniforms.uAtlas.value = tex;
    let live = true;
    document.fonts?.ready.then(() => {
      if (!live) return;
      tex.image = buildAtlas();
      tex.needsUpdate = true;
    });
    return () => {
      live = false;
      tex.dispose();
    };
  }, [uniforms]);

  /* ————— hover: one raycast per move, one attribute flip ————— */
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (stage.act !== 1 || stage.reading) return;
    const id = e.instanceId ?? -1;
    if (id === hovered.current) return;
    const attr = hoverAttr.current;
    if (attr && hovered.current >= 0) attr.array[hovered.current] = 0;
    hovered.current = id;
    if (attr && id >= 0) {
      attr.array[id] = 1;
      attr.needsUpdate = true;
    }
    if (id >= 0) onHover(ELEMENTS[id], e.clientX ?? 0, e.clientY ?? 0);
    else onHover(null, 0, 0);
  };
  const onOut = () => {
    const attr = hoverAttr.current;
    if (attr && hovered.current >= 0) {
      attr.array[hovered.current] = 0;
      attr.needsUpdate = true;
    }
    hovered.current = -1;
    onHover(null, 0, 0);
  };

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const w = weight.current;
    const target = stage.act === 1 ? 1 : 0;
    weight.current += (target - w) * Math.min(delta * 3.2, 1);
    if (weight.current < 0.015) {
      if (g.visible) {
        g.visible = false;
        onOut();
      }
      return;
    }
    g.visible = true;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uOpacity.value = weight.current * Math.min(stage.intro + 0.35, 1);
    /* on phones the wall centers and shrinks behind the copy */
    const narrow = state.size.width < 820;
    g.position.x = narrow ? 0 : 3.1;
    g.position.y = narrow ? 1.15 : 0;
    g.scale.setScalar(narrow ? 0.6 : 1);
    /* the wall breathes on arrival */
    const rise = 1 - Math.pow(1 - Math.min(stage.actProg * 4, 1), 2);
    g.position.y += (1 - rise) * -1.4;
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.16) * 0.018;
  });

  return (
    <group ref={group} visible={false} position={[2.3, 0, 0]}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, ELEMENTS.length]}
        onPointerMove={onMove}
        onPointerOut={onOut}
      >
        <planeGeometry args={[1, 1]}>
          <instancedBufferAttribute
            attach="attributes-aTile"
            args={[attrs.tiles, 2]}
          />
          <instancedBufferAttribute
            attach="attributes-aTint"
            args={[attrs.tints, 3]}
          />
          <instancedBufferAttribute
            attach="attributes-aSeed"
            args={[attrs.seeds, 1]}
          />
          <instancedBufferAttribute
            attach="attributes-aHover"
            args={[attrs.hovers, 1]}
            ref={hoverAttr}
          />
        </planeGeometry>
        <shaderMaterial
          ref={(m) => {
            if (m) m.uniforms = uniforms;
          }}
          vertexShader={TILE_VERT}
          fragmentShader={TILE_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}
