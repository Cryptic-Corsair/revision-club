"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { stage } from "./stage";
import Orbital from "./scenes/orbital";
import Cast from "./scenes/cast";
import Bond from "./scenes/bond";
import Fire from "./scenes/fire";
import Wave from "./scenes/wave";
import Starfield from "./scenes/starfield";
import type { Element } from "./stage";

/* ═══════════════════════════════════════════════════════════════
   THE LAB · the reel — one canvas, six worlds

   A single fixed WebGL context carries every act. Each scene
   holds its own visibility weight (damped, so worlds cross-fade
   over ~0.3 s of wall time, not scroll distance) and switches
   its group off below 1.5 % so hidden worlds cost no draw call.
   The camera rig reads the same stage state and eases between
   per-act blocks: a push-in for the orb, a thirty-unit flight
   down the wall of elements, then a slow retreat for the rest.
   ═══════════════════════════════════════════════════════════════ */

const easeInOut = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

function Rig() {
  const look = useRef(new THREE.Vector3(0, 0, 0));
  useFrame((state, delta) => {
    const cam = state.camera;
    const a = stage.act;
    const p = stage.actProg;
    let tx = 0;
    let ty = 0;
    let tz = 7.4;
    let lx = 0;
    let ly = 0;
    let lz = 0;
    if (a === 0) {
      tz = 7.4 - p * 1.0;
    } else if (a === 1) {
      const e = easeInOut(p);
      tz = 5.5 - e * 36.5;
      lz = tz - 14;
    } else if (a === 2) {
      tz = 8.4;
    } else if (a === 3) {
      tz = 9.4;
    } else if (a === 4) {
      tz = 7.2;
    } else {
      tz = 11;
    }
    tx += stage.pointerX * 0.55;
    ty += -stage.pointerY * 0.38;

    const k = Math.min(delta * 3.6, 1);
    cam.position.x += (tx - cam.position.x) * k;
    cam.position.y += (ty - cam.position.y) * k;
    cam.position.z += (tz - cam.position.z) * k;
    look.current.x += (lx - look.current.x) * k;
    look.current.y += (ly - look.current.y) * k;
    look.current.z += (lz - look.current.z) * k;
    cam.lookAt(look.current);
  });
  return null;
}

/* under reduced motion the canvas renders on demand only — one
   honest still per act, refreshed when the act changes */
function StaticKeeper({ actKey }: { actKey: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [actKey, invalidate]);
  return null;
}

export default function Reel({
  motion,
  reading,
  onHover,
  actKey,
}: {
  motion: boolean;
  reading: boolean;
  onHover: (el: Element | null, x: number, y: number) => void;
  actKey: number;
}) {
  const [dpr, setDpr] = useState<number | [number, number]>([1, 1.75]);

  return (
    <Canvas
      className="lab-stage"
      dpr={dpr}
      camera={{ fov: 46, near: 0.1, far: 90, position: [0, 0, 7.4] }}
      frameloop={motion && !reading ? "always" : "demand"}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ position: "fixed", inset: 0 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#050507", 1);
      }}
    >
      <PerformanceMonitor
        flipflops={2}
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr([1, 1.75])}
        onFallback={() => setDpr(1)}
      />
      <Rig />
      <StaticKeeper actKey={actKey} />
      <Orbital />
      <Cast onHover={onHover} />
      <Bond />
      <Fire />
      <Wave />
      <Starfield />
    </Canvas>
  );
}
