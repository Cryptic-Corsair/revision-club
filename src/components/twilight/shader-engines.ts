/* ═══════════════════════════════════════════════════════════════════════
   the twilight front door's shader engines.

   Three fragment shaders ported (with permission of spirit) from the
   Shader-water-v2 exploration, re-tuned for the twilight dress and cut
   for cost: 4-octave fbm (not 5), a 30-step torus march with no AO
   pass, and no material-ID bookkeeping. Every engine renders into the
   same fullscreen-quad pipeline owned by ShaderCanvas.tsx, which
   budgets the pixels, caps the frame rate and freezes offstage rooms —
   see that file for the lag contract. Pure string constants here: no
   React, no WebGL calls.

   The palette is the twilight-amber dress: deep slate blue-slate
   grounds (#1E2532 → #485569), warm stone (#8E827B) and ONE amber
   accent (#DFBC91) — single-accent discipline, mirroring
   twilight.css's tokens so the canvas and the CSS agree.
   ═══════════════════════════════════════════════════════════════════════ */

export type TwilightEngineId = 'wet-ink' | 'silk' | 'torus';

export const VERTEX_SHADER_SRC = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

/* Shared helpers + the twilight palette as uniforms. 4 octaves only —
   the 5th octave's detail is invisible under the scrim and motion. */
const COMMON_GLSL = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += a * noise2(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  vec3 paletteA() { return vec3(0.118, 0.145, 0.196); }  // #1E2532
  vec3 paletteB() { return vec3(0.282, 0.333, 0.412); }  // #485569
  vec3 paletteC() { return vec3(0.557, 0.510, 0.482); }  // #8E827B
  vec3 paletteAccent() { return vec3(0.875, 0.737, 0.569); }  // #DFBC91
`;

const WET_INK_GLSL = `
  ${COMMON_GLSL}
  /* Interactive wet-ink ripple: a pointer-driven displacement wave over
     a double domain warp (iq-style), re-tuned amber-on-slate. The hero's
     one ambient loop — cheap enough at the canvas' budgeted resolution. */
  void main() {
    float aspect = u_resolution.x / max(1.0, u_resolution.y);
    vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * 1.75;
    vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0) * 1.75;
    float t = u_time * 0.58;

    /* pointer ripple — a damped sine ring displacing the sample field */
    float distM = length(p - m);
    vec2 dirM = distM > 0.001 ? (p - m) / distM : vec2(0.0);
    float rippleWave = sin(distM * 16.0 - t * 4.4) * exp(-distM * 2.9);
    vec2 pDisplaced = p + dirM * rippleWave * (0.09 * u_intensity);

    vec2 q = vec2(
      fbm(pDisplaced + vec2(0.4, t * 0.22)),
      fbm(pDisplaced + vec2(5.2, 1.3 - t * 0.18))
    );
    vec2 r = vec2(
      fbm(pDisplaced + 2.35 * q + vec2(1.7, 9.2) + 0.16 * t),
      fbm(pDisplaced + 2.35 * q + vec2(8.3, 2.8) - 0.13 * t)
    );

    float ink = fbm(pDisplaced + 1.95 * r);
    float inkEdge = smoothstep(0.42, 0.56, ink) - smoothstep(0.56, 0.72, ink);
    float caustic = pow(clamp(0.5 + 0.5 * sin(pDisplaced.x * 5.2 + q.y * 6.5 - t * 1.4), 0.0, 1.0), 4.0);

    vec3 col = mix(paletteA(), paletteB(), smoothstep(0.18, 0.74, ink));
    col = mix(col, paletteC(), smoothstep(0.45, 0.92, dot(q, r)) * 0.6);
    col += paletteAccent() * (inkEdge * (0.35 + 0.4 * u_intensity) + caustic * 0.16 * u_intensity + max(0.0, rippleWave) * 0.4);

    /* darken the left column so the hero's serif always wins */
    float leftMask = smoothstep(-0.72, 0.55, (v_uv.x - 0.5) * vec2(aspect, 1.0).x);
    col *= mix(0.62, 1.0, leftMask * 0.72 + 0.28);

    float vig = 1.0 - smoothstep(0.48, 1.32, length(v_uv - 0.5) * 1.35);
    col *= (0.82 + 0.18 * vig);
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

const SILK_GLSL = `
  ${COMMON_GLSL}
  /* Domain-warped monsoon silk — the method room's backdrop. No pointer
     coupling (it sits under scrolling text); a slower, calmer cadence. */
  void main() {
    float aspect = u_resolution.x / max(1.0, u_resolution.y);
    vec2 uv = (v_uv - 0.5) * vec2(aspect, 1.0) * 1.45;
    float t = u_time * 0.35;

    vec2 warpA = vec2(fbm(uv + t), fbm(uv + vec2(3.1, 1.4) - t * 0.6));
    vec2 warpB = vec2(
      fbm(uv + 2.5 * warpA + vec2(t * 0.4, -t * 0.2)),
      fbm(uv + 2.2 * warpA)
    );
    float silk = fbm(uv + (1.6 + u_intensity * 1.1) * warpB);

    float folds = smoothstep(0.15, 0.88, silk);
    float rim = pow(clamp(1.0 - abs(warpB.x - warpB.y) * 2.6, 0.0, 1.0), 2.5);

    vec3 col = mix(paletteA(), paletteB(), folds);
    col = mix(col, paletteC(), smoothstep(0.35, 0.85, warpA.y) * 0.5);
    col += paletteAccent() * rim * (0.14 + u_intensity * 0.2);

    /* fade top and bottom so the room's ground shows through the scrim */
    float vfade = smoothstep(0.0, 0.22, v_uv.y) * smoothstep(1.0, 0.78, v_uv.y);
    col = mix(paletteA() * 0.9, col, 0.35 + 0.65 * vfade);
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

const TORUS_GLSL = `
  ${COMMON_GLSL}
  /* A lightened port of the raymarched orbital torus: 30 march steps
     (was 36), no AO pass, 6-tap normal, Fresnel + single key light.
     Deliberately the ORBITAL rings — chemistry's electron shells —
     re-dressed in the twilight palette. */
  mat2 rot2(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
  }

  float mapScene(vec3 p) {
    float t = u_time * 0.55;
    p.xz *= rot2(t * 0.48 + (u_mouse.x - 0.5) * 1.4);
    p.xy *= rot2(t * 0.31 + (u_mouse.y - 0.5) * 0.9);

    float d1 = sdTorus(p, vec2(0.82, 0.16 + 0.04 * u_intensity));
    vec3 p2 = p;
    p2.yz *= rot2(1.5708 + t * 0.25);
    float d2 = sdTorus(p2, vec2(1.18, 0.055));
    float d3 = length(p) - (0.24 + 0.05 * sin(t * 1.4));
    return min(d1, min(d2, d3));
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0025, 0.0);
    return normalize(vec3(
      mapScene(p + e.xyy) - mapScene(p - e.xyy),
      mapScene(p + e.yxy) - mapScene(p - e.yxy),
      mapScene(p + e.yyx) - mapScene(p - e.yyx)
    ));
  }

  void main() {
    float aspect = u_resolution.x / max(1.0, u_resolution.y);
    vec2 uv = (v_uv - 0.5) * vec2(aspect, 1.0);
    vec3 ro = vec3(0.0, 0.0, 2.75);
    vec3 rd = normalize(vec3(uv, -1.45));

    float tDist = 0.0;
    float hit = 0.0;
    float glow = 0.0;
    for (int i = 0; i < 30; i++) {
      vec3 pos = ro + rd * tDist;
      float d = mapScene(pos);
      glow += exp(-abs(d) * 7.0) * 0.032;
      if (d < 0.004) {
        hit = 1.0;
        break;
      }
      if (tDist > 6.5) break;
      tDist += d * 0.85;
    }

    vec3 bg = mix(paletteA(), paletteB(), smoothstep(-0.6, 0.7, uv.y + 0.2) * 0.8);
    vec3 col = bg + paletteAccent() * glow * (0.35 + u_intensity * 0.5);

    if (hit > 0.5) {
      vec3 p = ro + rd * tDist;
      vec3 n = calcNormal(p);
      vec3 keyDir = normalize(vec3(0.7, 0.85, 0.9));
      float diff = max(dot(n, keyDir), 0.0);
      float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      float spec = pow(max(dot(reflect(-keyDir, n), -rd), 0.0), 22.0);
      vec3 matCol = mix(paletteB(), paletteC(), diff * 0.85);
      matCol += paletteAccent() * (fresnel * 0.6 + spec * 0.5);
      float fog = exp(-tDist * 0.18);
      col = mix(bg, matCol, fog * 0.9);
    }

    /* ground the marcher into the room: fade the lower third away */
    float vfade = smoothstep(0.0, 0.3, v_uv.y);
    col = mix(paletteA() * 0.92, col, vfade);
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export const TWILIGHT_FRAGMENT_SHADERS: Record<TwilightEngineId, string> = {
  'wet-ink': WET_INK_GLSL,
  silk: SILK_GLSL,
  torus: TORUS_GLSL,
};

/* Per-room cadence + subtlety, mirroring Shader-water-v2's choreography
   idea: the shader serves the reading, never competes with it. */
export interface TwilightEngineConfig {
  speed: number;
  intensity: number;
}

export const TWILIGHT_ENGINE_CONFIGS: Record<TwilightEngineId, TwilightEngineConfig> = {
  'wet-ink': { speed: 0.55, intensity: 0.72 },
  silk: { speed: 0.42, intensity: 0.6 },
  torus: { speed: 0.42, intensity: 0.5 },
};
