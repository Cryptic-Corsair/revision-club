# IAL CHEM — Homepage Rebuild Instructions

**The current homepage is "THE LAB"** — a six-act, scroll-driven chemical world built on
React Three Fiber + GSAP ScrollTrigger + Lenis. This document is the complete blueprint:
what it is, why each technology was chosen, how every piece works, the four traps that
were found and fixed the hard way, and the recipe for extending it.

Read this before touching `src/app/page.tsx`, `src/components/lab/`, or the `THE LAB`
block in `src/app/globals.css`.

---

## 1. The concept

The homepage is **not a page of sections** — it is a film you scroll through. One fixed
WebGL canvas carries six different worlds; DOM typography (Syne / Space Grotesk / Plex
Mono) rides on top, and the syllabus itself (18 revision notes) waits at the end.

The design rule that kills repetition: **every act changes the visual medium AND the way
the user can touch it.** Never two acts in a row with the same look or the same
interaction.

| # | Act | World (WebGL) | Interaction |
|---|-----|---------------|-------------|
| 0 | **MATTER** | Iridescent fresnel orb (noise-displaced sphere) + 700 electrons on tilted elliptical shells | **Drag** the orb — it spins with inertia, fights back |
| 1 | **THE CAST** | Camera flies *through* a wall of 36 real elements (Z=1–36) on 3 receding layers | **Hover** a tile — it lifts, glows and names itself in a pointer-trailing card |
| 2 | **THE BOND** | Two fresnel nuclei close in; 2,000 charges pour from orbit swarms into a white-hot bridge | **Scrub** — the scroll itself performs the reaction |
| 3 | **THE PRICE** | 2,400 embers churn in a lattice of calm | **Scroll velocity** is the fuel — scroll fast, the room ignites |
| 4 | **THE DANCE** | Full-screen domain-warped fbm field: emerald forward current vs coral reverse current | **Pointer** drags a wake through the field |
| 5 | **THE ATLAS** | The cast dissolves into a champagne/steel nebula | **Click** a station on the metro line → the real revision note opens |

The syllabus mapping is intentional and spec-accurate:

- The cast → Topic 1–2 (atoms, the periodic table)
- The bond → Topic 3 (bonding, 2Na + Cl₂ → 2NaCl)
- The price → Topic 6 (energetics, ΔH = −184 kJ mol⁻¹ for H₂ + Cl₂ → 2HCl)
- The dance → Topic 9 (kinetics & equilibrium, N₂ + 3H₂ ⇌ 2NH₃)
- The atlas → all 18 notes (WCH11 ×5, WCH12 ×5, WCH13 ×8 practicals)

---

## 2. The stack — what was chosen and why

Research pass covered: motion.zajno.com (art direction reference), Three.js, React Three
Fiber + Drei, Babylon.js, OGL/regl, Rapier/cannon-es, GSAP (+ScrollTrigger), Lenis,
Motion (Framer), Lottie, Theatre.js, p5.js, PixiJS, Spline.

**Chosen:**

- **React Three Fiber + Drei** — Three.js as React components. Drei gives
  `PerformanceMonitor` (adaptive DPR) for free; the reconciler handles disposal.
  Chosen over vanilla Three (less plumbing), over Babylon (an engine-level framework —
  overkill and heavier), and over OGL (lean, but every premium helper would be hand-rolled).
- **GSAP + ScrollTrigger** — the narrative engine. Five pinned acts, numeric `scrub`
  (0.6–0.8 — a number, never `true`, so the animation *follows* the scroll), timelines
  per act. Chosen over Motion/Framer for scrub+pin timelines; Framer stays in the project
  only for the gallery reader it already drives.
- **Lenis** — smooth wheel scroll, native touch (`syncTouch: false`, `smoothWheel` only
  above 820 px). Its scroll velocity feeds the fire scene. Wired to ScrollTrigger the
  canonical way (see §5).
- **Custom GLSL (no post-processing)** — every look is an unlit, additive shader. Bloom
  was rejected: it costs a render target per frame. Glow is faked with additive blending
  and fresnel math instead. One noise library (`glsl.ts`, Ashima simplex + fbm) is shared
  by every scene.

**Rejected (and why, so nobody re-litigates blind):**

- **Theatre.js** — a timeline *editor*; powerful for hand-keyed camera work but adds a
  heavy runtime and an authoring workflow this project doesn't need. ScrollTrigger scrub
  already keyframes everything.
- **Lottie** — needs After Effects assets; all motion here is procedural.
- **p5.js / PixiJS** — 2D-focused; the world is 3D.
- **Spline** — no-code exports; less control, another runtime.
- **Rapier / cannon-es** — physics is decorative here (drag inertia is hand-rolled in
  ~10 lines); an engine is dead weight.
- **Postprocessing / bloom / transmission materials** — GPU policy, see §7.

---

## 3. File map

```
src/app/page.tsx                 → renders <Lab /> (5 lines; the only route)
src/components/lab/
  lab.tsx                        → orchestrator: motion gate, Lenis, veil, chrome,
                                   rail glides, element tooltip, lab ⇄ reader swap
  stage.ts                       → the shared mutable state + palette + 36 elements
  reel.tsx                       → the single <Canvas>: camera rig, six scenes,
                                   PerformanceMonitor, DPR policy, frameloop policy
  glsl.ts                        → shared simplex noise + fbm (string, inlined per shader)
  chars.tsx                      → <Split text="..." /> — per-character spans for GSAP
  cursor.tsx                     → custom cursor (dot + trailing ring, DRAG grip)
  reader.tsx                     → the gallery reader handoff (lazy-loads NotesGallery)
  scenes/                        → THE SIX WORLDS (one file each)
    orbital.tsx  cast.tsx  bond.tsx  fire.tsx  wave.tsx  starfield.tsx
  acts/                          → THE DOM COPY (one file each)
    hero.tsx  cast.tsx  bond.tsx  price.tsx  dance.tsx  atlas.tsx
src/app/globals.css              → the "THE LAB" block (search for that banner)
```

The old homepage (`src/components/film/`) was deleted in the same commit; git history
has it if a look back is ever needed.

---

## 4. The data flow (the most important idea)

**One plain mutable object** — `stage` in `stage.ts` — is the only channel between the
scroll world and the WebGL world:

```
Lenis scroll ─┬─► ScrollTrigger.update()          (per scroll event)
              └─► stage.rawVel                     (velocity channel)
gsap.ticker  ──► smooths stage.vel / pointerX/Y    (one shared ticker)
act scrubbers ─► stage.act, stage.actProg          (per pinned act, isActive-gated)
scenes (useFrame) ─► read stage, write uniforms    (every frame)
```

No React state ever rides the per-frame path. React state (`active`, `tip`, `doc`,
`motion`) exists only for chrome that changes rarely (rail highlight, tooltip mount,
reader swap).

Rules:

- Scrubbers write `stage.act` / `stage.actProg` **only when `self.isActive`** — at boot,
  every trigger fires `onUpdate` during refresh with progress 0, and without the guard
  the atlas (act 5) hijacks the stage and every world stays invisible.
- Pointer + velocity are *raw in, smoothed per frame* (`stage.pointerX` vs
  `pointerRaw.current.x`) — never smoothed in React.

---

## 5. Wiring (copy these lines exactly)

**Lenis ⇄ ScrollTrigger** (in `lab.tsx` boot effect):

```ts
const lenis = new Lenis({
  smoothWheel: window.innerWidth > 820,
  syncTouch: false,
  lerp: 0.09,
});
lenis.on("scroll", (e) => { stage.rawVel = e.velocity; ScrollTrigger.update(); });
gsap.ticker.add((time, deltaMS) => { lenis.raf(time * 1000); /* + channel smoothing */ });
gsap.ticker.lagSmoothing(0);
ScrollTrigger.addEventListener("refresh", () => lenis.resize());
```

That last line is not optional. **GSAP's pin spacers change the page height after
Lenis measures it; without re-measuring on every refresh, every animated glide clamps
at the pre-pin height.**

**Browser-level kindnesses that fight the lab** (all three required):

```ts
history.scrollRestoration = "manual";
ScrollTrigger.clearScrollMemory("manual");   // ST must never save/restore scroll
document.documentElement.style.scrollBehavior = "auto";  // smooth native ≠ pins
```

plus in CSS: `html { overflow-anchor: none; }` — Chrome's scroll anchoring
"compensates" for pin spacers and throws the scroll metres off.

**Rail glides** read pin starts from ScrollTrigger at click time (never from a channel
that fills lazily):

```ts
const st = ScrollTrigger.getAll().find((t) => t.trigger === sec);
lenis.scrollTo((st ? st.start : 0) + 2, { duration: 1.4, lock: true, force: true });
```

**A pinned act** (pattern used by all five — `hero.tsx` etc.):

```ts
gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: sec, start: "top top", end: "+=200%",
    pin: true, scrub: 0.8,
    onUpdate: onAct,          // writes stage.act / actProg (isActive-gated)
  },
});
```

Under reduced motion / the saved motion knob (`reaction-club-prefs-v1` → `motion:false`),
each act instead creates a bare `ScrollTrigger.create({ trigger, start: "top 55%",
end: "bottom 45%", onUpdate: onAct })` — no pin, no scrub, content in normal flow.

---

## 6. Scene specs (what each file must do)

Every scene component follows one shape:

1. Module-scope `uniforms` object (see trap §8.1).
2. `weight` ref — damped toward `stage.act === mine ? 1 : 0` in `useFrame`.
3. `weight < 0.015 → group.visible = false; return` — hidden worlds cost zero draw calls.
4. All choreography reads `stage` (actProg, pointer, vel, intro) — never scroll events.

- **orbital.tsx** — sphere 110×72 + simplex displacement (two octaves), fresnel
  iridescence (`0.5 + 0.5*cos(6.2831*(hue + vec3(0,.33,.67)))`), pointer-driven specular.
  Swarm: 700 points, orbit parameters derived per-particle from a single `aSeed` float —
  zero CPU per frame. Drag: window-level pointer handlers write `spin` ref velocities;
  inertia decays ×0.94^(60Δ).
- **cast.tsx** — `InstancedMesh` of 36 quads, one draw call, one `CanvasTexture` atlas
  (6×6 cells: Z, symbol, name — redrawn once real fonts land). Billboard math in the
  vertex shader (`viewMatrix` + view-space quad offset). Hover: R3F raycast
  (`onPointerMove` → `e.instanceId`) flips an `aHover` attribute and calls `onHover`
  with the element + client coords. Layers at z = −9/−18/−27; the camera rig flies
  z 5.5 → −31 through them.
- **bond.tsx** — two fresnel spheres at ±gap (gap 3.1 → 0.62 with `actProg`, saw-toothed
  so the act can be scrolled back and forth); 2,000 points whose vertex shader mixes
  swarm→bridge at `uT` 0.42–0.72, with a flowing phase and "lone pairs" that keep
  orbiting. Nucleus heat tint driven by `pow(t, 2.4)`.
- **fire.tsx** — 2,400 points; `uVel` (smoothed Lenis velocity) drives churn, size,
  whiteness and vertical streak; `uHeat` adds the act's scrub + the exothermic flash at
  actProg > 0.72. Ember palette mixes `#FF5C47 → #FFC94D`.
- **wave.tsx** — one 18.5×10.6 plane at z −4; fragment = two-level domain-warped fbm;
  `uBalance` (sin of actProg) swings emerald↔coral; pointer injects a radial wake.
  Keep it DARK (`col *= 0.10 + vig * 0.52`) — a bright field drowns the type and the rail.
- **starfield.tsx** — 1,700 points on noise-drifted orbits; reads as nebula wisps.

**Camera rig** (`reel.tsx`): per-act target blocks (hero push-in; cast flight with
lookAt running 14 units ahead; bond 8.4; price 9.4; dance 7.2; atlas 11), pointer
parallax, damped `position` + `lookAt` (k = min(Δ·3.6, 1)).

---

## 7. GPU iron laws

1. **One canvas.** All six scenes mount in one fixed `<Canvas>`. Multiple contexts = the
   quick way to a fried laptop.
2. **Unlit + additive only.** No lights, no shadows, no post-processing, no
   transmission/physical materials. Glow = fresnel + additive blending.
3. **DPR capped** `[1, 1.75]`, `PerformanceMonitor` steps it to 1 on decline and back on
   incline (`flipflops: 2`, `onFallback` → 1).
4. **Visibility gates.** Every scene's group goes `visible = false` below 1.5% weight —
   hidden worlds cost nothing.
5. **Instancing / one draw call per scene.** The wall is ONE instanced draw call; all
   point clouds are one draw call each; particle positions are computed in vertex
   shaders from a per-particle seed.
6. **frameloop policy**: `"always"` when motion is on and no reader is open; `"demand"`
   when the motion knob is off or the reader is up (`StaticKeeper` invalidates once per
   act change so each act gets one honest still).
7. **rAF hygiene**: transforms/opacity only in DOM tweens; no per-frame allocations in
   `useFrame`; no `setState` in any loop.
8. **Mobile** (< 820 px): wall recenters/shrinks behind the copy, copy gets a darkness
   pool (`::before` radial scrim), particle counts already sized for it, Lenis touch
   smoothing off, rail hidden.

---

## 8. The four traps (each cost a real debugging session — do not re-learn them)

1. **R3F v9 clones the `uniforms` prop.** `<shaderMaterial uniforms={obj}>` deep-copies
   at mount; mutating `obj.uX.value` afterwards **never reaches the GPU** (the material's
   own `uniforms !== obj`). Symptom: meshes render but every custom shader is invisible.
   **Fix**: assign through a callback ref —
   `ref={(m) => { if (m) m.uniforms = myUniforms; }}` — and mutate freely.
2. **`InstancedBufferAttribute` on plain `<points>` collapses the draw.** The instancing
   divisor reduces N vertices to ~1 visible point. Symptom: every particle scene shows a
   single dot or nothing. **Fix**: points use `<bufferAttribute>` for `position` AND
   custom attributes; `instancedBufferAttribute` is only for real `InstancedMesh`es.
3. **Refresh-time `onUpdate` hijacks the stage.** Every ScrollTrigger fires `onUpdate`
   during global refresh; the atlas (act 5) then pins `stage.act = 5` at boot and all
   damped weights target 0 forever. **Fix**: every act writer starts with
   `if (!self.isActive) return;`.
4. **Unstable act-writer props tear the pins down.** `onAct={onAct(0)}` in JSX builds a
   fresh closure every render; every act change re-renders the lab, every pinned
   ScrollTrigger is destroyed and recreated, and the pin reverts fire native scrolls
   that cancel Lenis mid-glide (symptom: every rail glide freezes at the same scroll
   offset). **Fix**: `const actWriters = useMemo(() => ACTS.map((_, i) => onAct(i)), [onAct]);`
   and pass `actWriters[i]`.

Honourable mention: **GLSL constructor discipline** — `vec3(vec3, float)` is four
components (too many), and `fbm(vec2 + float)` passes a vec2 where vec3 is required.
Both compile-time crash a scene only when it first becomes visible, so test every act.

---

## 9. Integration points (must not break)

- **Reader handoff** — a station click calls `openDoc(id)`: the lab shell hides
  (`html.lab-reading .lab-root { display: none }`), Lenis stops, the reader (lazy
  `NotesGallery`, the club's own component) takes the document; back (or ESC) →
  `ScrollTrigger.refresh()` + `lenis.resize()` + exact scroll restore.
- **Motion knob** — `reaction-club-prefs-v1` in localStorage: `motion: false` (or
  `prefers-reduced-motion`) → no veil, no Lenis, no pins, `frameloop: "demand"`, one
  still per act, counter prints its final value (−184).
- **Test seam** — `window.__lenis` (set in lab boot) exists so tooling can drive
  deterministic scroll. Keep it; it is documented and harmless.
- **The club is untouched** — `src/components/club/**` (notes, gallery, control panel)
  serves the reader; the lab only borrows `NOTES_META`, `UNITS`, `LazyMotion`.

---

## 10. Recipe: change or add an act

1. **Scene**: create `scenes/<name>.tsx` following the shape in §6 (module uniforms,
   weight gate, `stage`-driven `useFrame`). Mount it in `reel.tsx`; give the camera rig
   a block for its act index.
2. **Copy**: create `acts/<name>.tsx` — a `<section className="lab-act" data-act="N">`
   with a `.lab-pin` child; headline via `<Split>`, kicker via `.lab-kicker`, body via
   `.lab-lede`. Wire `onAct` (stable writer from `actWriters`), pin with `end: "+=N%"`,
   guard reduced motion with the bare-trigger branch.
3. **Register**: add the act to `ACTS` in `stage.ts` (label + count), extend
   `actWriters`, add a rail entry automatically (the rail maps `ACTS`).
4. **Dress**: any new CSS goes in the `THE LAB` block in `globals.css`; keep the mobile
   media query in step (heads shrink, plates wrap, scrims lose horizontal overhang).
5. **Verify** (the checklist that was actually run):
   - walk all acts at 1440×900 — every world visible, copy legible, exit animations clean
   - hover/hover-off in the cast; a station → reader → back restores the exact scroll
   - rail glides complete (they cross pin boundaries — the trap §8.4 shows here first)
   - 390×844: `document.documentElement.scrollWidth === 390`, no rail, scrims pool dark
   - motion knob off: no veil, static stills, counter final, native scroll
   - console: zero shader errors, zero GSAP "target not found"
   - `bun run lint` + `bunx tsc --noEmit` green

---

## 11. Tuning cheatsheet

| Want | Touch |
|---|---|
| Orb colour mood | `BLOB_FRAG` hue/iridescence constants (`orbital.tsx`) |
| Wall flight speed | camera rig act-1 block (`reel.tsx`) + `end: "+=230%"` (`acts/cast.tsx`) |
| Fire sensitivity | `/ 55` normaliser in `lab.tsx` ticker; `churn` factors (`fire.tsx`) |
| Wave brightness | `col *= 0.10 + vig * 0.52` (`wave.tsx` — keep it dark) |
| Act lengths | the `end: "+=N%"` per act (220/230/200/200/180) |
| Element list | `RAW` table in `stage.ts` (drives wall, legend, tooltip, atlas tint) |
| Station map | `ROWS/X1/X2/X3/LINE_PATH` in `acts/atlas.tsx` |
| Copy | the act files only — spec numbers are real (−184 kJ mol⁻¹, Kc, NaCl) |

---

*Built as "THE LAB" — commit history on `main` holds every step; the MD lives at
`docs/HOMEPAGE.md`.*
