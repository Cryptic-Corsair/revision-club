/* ═══════════════════════════════════════════════════════════════════════
   THE water shader — a faithful GLSL ES 1.0 port of the reference at
   water-shafer.vercel.app (the @paper-design "Water" program recovered
   verbatim from its bundle, .external/water-ref/shader_all_1.frag):
   the 6-iteration rotating domain-loop caustic field, the simplex wave
   distortion that warps it, the optional second layer, and the highlight
   bloom — every constant kept. The only deviations are mechanical:
   ES3→ES1 translation (varying/gl_FragColor), the vendor's box-fit
   VERTEX-stage image mapping computed here per-pixel (the cover-fit,
   the u_scale zoom and the vendor's Y flip — recovered verbatim from
   its shader mount, so a mount's `scale` prop zooms the art and the
   caustic pattern together exactly like the original), and the image
   frame's fwidth term replaced by a fixed smoothstep (same look, drops
   the derivatives-extension dependency).

   This is the shader the user meant by "these shaders" — not a lookalike.
   The uniform names carry the paper-design prop names (u_highlights,
   u_layering, u_caustic, u_waves, u_size, u_scale) so the port's call
   sites can mirror the reference's prop tables one-to-one.
   ═══════════════════════════════════════════════════════════════════════ */

export const WATER_VERTEX_SRC = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

export const WATER_FRAGMENT_SRC = `
  precision mediump float;

  varying vec2 v_uv;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_colorBack;
  uniform vec3 u_colorHighlight;
  uniform sampler2D u_image;
  uniform float u_imageAspect;
  uniform float u_size;
  uniform float u_scale;
  uniform float u_highlights;
  uniform float u_layering;
  uniform float u_edges;
  uniform float u_caustic;
  uniform float u_waves;
  /* the portal-hero extension: the club's two rooms blended in one
     field (u_themeMix 0 = light pair / 1 = dusk pair) and an optional
     bottom+top edge fade so the field dissolves into the page's own
     --bg instead of ending on a seam. Both are inert elsewhere:
     twilight binds the same texture to both units and passes 0. */
  uniform vec3 u_colorBackDusk;
  uniform vec3 u_colorHighlightDusk;
  uniform sampler2D u_imageDusk;
  uniform float u_themeMix;
  uniform float u_fade;

  mat2 rotate2D(float r) {
    return mat2(cos(r), sin(r), -sin(r), cos(r));
  }

  vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* the caustic field — verbatim from the reference: 6 rotating
     octaves, sin/cos domain accumulation, scale drift 1.1 */
  float getCausticNoise(vec2 uv, float t, float scale) {
    vec2 n = vec2(0.1);
    vec2 N = vec2(0.1);
    mat2 m = rotate2D(0.5);
    for (int j = 0; j < 6; j++) {
      uv *= m;
      n *= m;
      vec2 q = uv * scale + float(j) + n
        + (0.5 + 0.5 * float(j)) * (mod(float(j), 2.0) - 1.0) * t;
      n += sin(q);
      N += cos(q) / scale;
      scale *= 1.1;
    }
    return (N.x + N.y + 1.0);
  }

  void main() {
    /* the vendor's image mapping, vertex-stage → here: cover-fit the
       art into the canvas box (their u_fit=2 box-fit), then the mount's
       scale zoom — v_imageUV /= u_scale, art and caustic pattern
       zooming together — then their Y flip (v_imageUV.y = 1 - y),
       which stands the art upright: texture row 0 is the image's TOP,
       and v_uv.y=0 is the canvas BOTTOM */
    float screenAspect = u_resolution.x / max(1.0, u_resolution.y);
    vec2 imageUV = v_uv;
    if (screenAspect > u_imageAspect) {
      imageUV.y = (v_uv.y - 0.5) * (u_imageAspect / screenAspect) + 0.5;
    } else {
      imageUV.x = (v_uv.x - 0.5) * (screenAspect / u_imageAspect) + 0.5;
    }
    imageUV = (imageUV - 0.5) / max(0.0001, u_scale) + 0.5;
    imageUV.y = 1.0 - imageUV.y;

    vec2 patternUV = imageUV - 0.5;
    patternUV = patternUV * vec2(u_imageAspect, 1.0);
    patternUV /= (0.01 + 0.09 * u_size);

    float t = u_time;

    float wavesNoise = snoise(
      (0.3 + 0.1 * sin(t)) * 0.1 * patternUV + vec2(0.0, 0.4 * t));

    float causticNoise = getCausticNoise(
      patternUV + u_waves * vec2(1.0, -1.0) * wavesNoise, 2.0 * t, 1.5);

    if (u_layering > 0.0) {
      causticNoise += u_layering * getCausticNoise(
        patternUV + 2.0 * u_waves * vec2(1.0, -1.0) * wavesNoise,
        1.5 * t, 2.0);
    }
    causticNoise *= causticNoise;

    /* the image-edge falloff (the reference's fwidth frame, fixed-width) */
    float frame = smoothstep(0.0, 0.02, imageUV.x)
      * (1.0 - smoothstep(0.98, 1.0, imageUV.x))
      * smoothstep(0.0, 0.02, imageUV.y)
      * (1.0 - smoothstep(0.98, 1.0, imageUV.y));

    float edgesDistortion = smoothstep(0.0, 0.1, imageUV.x)
      * smoothstep(0.0, 0.1, imageUV.y)
      * (smoothstep(1.0, 1.1, imageUV.x)
        + (1.0 - smoothstep(0.8, 0.95, imageUV.x)))
      * (1.0 - smoothstep(0.9, 1.0, imageUV.y));
    edgesDistortion = mix(edgesDistortion, 1.0, u_edges);

    float wavesDistortion = 0.1 * u_waves * wavesNoise;
    vec2 sampleUV = imageUV
      + vec2(wavesDistortion, -wavesDistortion)
      + u_caustic * (0.02 * causticNoise * edgesDistortion);
    sampleUV = clamp(sampleUV, 0.002, 0.998);

    vec4 imageLight = texture2D(u_image, sampleUV);
    vec4 imageDusk = texture2D(u_imageDusk, sampleUV);
    vec4 image = mix(imageLight, imageDusk, u_themeMix);

    vec3 backColor = mix(u_colorBack, u_colorBackDusk, u_themeMix);
    vec3 highlightColor = mix(u_colorHighlight, u_colorHighlightDusk, u_themeMix);

    vec3 color = mix(backColor, image.rgb, image.a * frame);

    float cn = max(-0.2, causticNoise);
    float highlight = 0.025 * u_highlights * cn;
    color = mix(color, highlightColor, 0.05 * u_highlights * cn);
    color += highlight * (0.5 + 0.5 * wavesNoise);

    /* the portal hero's seam dissolve — the old hero shader's own
       bottom/top fade, now as output alpha (straight, the context is
       created with premultipliedAlpha: false) */
    float bottomFade = smoothstep(0.02, 0.42, v_uv.y);
    float topFade = smoothstep(1.0, 0.84, v_uv.y) * 0.35 + 0.65;
    float alpha = mix(1.0, bottomFade * topFade, u_fade);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha);
  }
`;

/* ── the baked art the water refracts — the reference ships its
   backdrop/filament art as inline gradient SVGs (recovered verbatim
   from the bundle). Opaque gradient washes; the shader does the rest. ── */

/* exported so the water interface's washes can bake their own art
   (club/water-backdrop.tsx builds one gradient wash per WashId) */
export const svgDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

/* the global backdrop art (the reference's 1440×900 lagoon wash) */
export const WATER_ART_BACKDROP = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900"><defs><linearGradient id="lagoonBase" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E2736"/><stop offset="48%" stop-color="#2B374A"/><stop offset="100%" stop-color="#18202C"/></linearGradient><radialGradient id="moonlightDrift" cx="72%" cy="28%" r="56%"><stop offset="0%" stop-color="#EBD4B4" stop-opacity="0.72"/><stop offset="34%" stop-color="#DFBC91" stop-opacity="0.46"/><stop offset="68%" stop-color="#6F6768" stop-opacity="0.22"/><stop offset="100%" stop-color="#1E2736" stop-opacity="0"/></radialGradient><radialGradient id="silverCurrent" cx="28%" cy="66%" r="58%"><stop offset="0%" stop-color="#AEC2D6" stop-opacity="0.54"/><stop offset="44%" stop-color="#6E839B" stop-opacity="0.34"/><stop offset="100%" stop-color="#1C2432" stop-opacity="0"/></radialGradient><radialGradient id="pearlCore" cx="50%" cy="46%" r="48%"><stop offset="0%" stop-color="#C8C4BC" stop-opacity="0.26"/><stop offset="56%" stop-color="#4A596E" stop-opacity="0.20"/><stop offset="100%" stop-color="#1B2330" stop-opacity="0"/></radialGradient></defs><rect width="1440" height="900" fill="url(#lagoonBase)"/><rect width="1440" height="900" fill="url(#silverCurrent)"/><rect width="1440" height="900" fill="url(#moonlightDrift)"/><rect width="1440" height="900" fill="url(#pearlCore)"/></svg>`);

/* the footer's golden-horizon art (the reference's 1200×420 wash) */
export const WATER_ART_FOOTER = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" width="1200" height="420"><defs><linearGradient id="waterSlate" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#363E4B"/><stop offset="52%" stop-color="#272F3C"/><stop offset="100%" stop-color="#1B2029"/></linearGradient><radialGradient id="amberHorizon" cx="70%" cy="24%" r="64%"><stop offset="0%" stop-color="#FAF0E2" stop-opacity="0.96"/><stop offset="30%" stop-color="#DFBC91" stop-opacity="0.84"/><stop offset="65%" stop-color="#A67F6B" stop-opacity="0.38"/><stop offset="100%" stop-color="#272F3C" stop-opacity="0"/></radialGradient><radialGradient id="mistReflection" cx="22%" cy="64%" r="58%"><stop offset="0%" stop-color="#B2C2D4" stop-opacity="0.56"/><stop offset="55%" stop-color="#596270" stop-opacity="0.24"/><stop offset="100%" stop-color="#1E242E" stop-opacity="0"/></radialGradient><linearGradient id="horizonSheen" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#B2C2D4" stop-opacity="0.14"/><stop offset="38%" stop-color="#DFBC91" stop-opacity="0.32"/><stop offset="68%" stop-color="#FAF0E2" stop-opacity="0.22"/><stop offset="100%" stop-color="#1E242E" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="420" fill="url(#waterSlate)"/><rect width="1200" height="420" fill="url(#amberHorizon)"/><rect width="1200" height="420" fill="url(#mistReflection)"/><rect width="1200" height="420" fill="url(#horizonSheen)"/></svg>`);

/* the reading-frame art — same gradient language, drawn for the bench
   dusk (800×1000, the reference's portrait box ratio) */
export const WATER_ART_FRAME = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000"><defs><linearGradient id="benchSlate" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5A6372"/><stop offset="52%" stop-color="#49525F"/><stop offset="100%" stop-color="#2B323E"/></linearGradient><radialGradient id="lampGlow" cx="46%" cy="34%" r="52%"><stop offset="0%" stop-color="#F3DEC2" stop-opacity="0.85"/><stop offset="34%" stop-color="#DFBC91" stop-opacity="0.5"/><stop offset="66%" stop-color="#B48172" stop-opacity="0.2"/><stop offset="100%" stop-color="#4C5563" stop-opacity="0"/></radialGradient><radialGradient id="glassCurrent" cx="26%" cy="70%" r="56%"><stop offset="0%" stop-color="#B2C2D4" stop-opacity="0.5"/><stop offset="50%" stop-color="#596270" stop-opacity="0.24"/><stop offset="100%" stop-color="#2C333F" stop-opacity="0"/></radialGradient><radialGradient id="pearlWash" cx="66%" cy="78%" r="46%"><stop offset="0%" stop-color="#C8C4BC" stop-opacity="0.22"/><stop offset="100%" stop-color="#1D222B" stop-opacity="0"/></radialGradient></defs><rect width="800" height="1000" fill="url(#benchSlate)"/><rect width="800" height="1000" fill="url(#glassCurrent)"/><rect width="800" height="1000" fill="url(#lampGlow)"/><rect width="800" height="1000" fill="url(#pearlWash)"/></svg>`);

export const hexToRgb = (hex: string): [number, number, number] => {
  const v = hex.replace('#', '');
  return [
    parseInt(v.slice(0, 2), 16) / 255,
    parseInt(v.slice(2, 4), 16) / 255,
    parseInt(v.slice(4, 6), 16) / 255,
  ];
};

/* the portal hero's two room washes — the reference's backdrop
   structure (base linear + two radial pockets + a pearl core). The
   dusk pair re-dressed 2026-11-17 into the portal's own SEA room —
   the deep sea-slate with the champagne moonlight drift, the same
   family the water interface's washes run (the chocolate/amber pair
   retired with the portal's dune dress). The daylight pair keeps the
   club's validated hexes straight from globals.css (cream #fff6ea /
   coral #ff6b6b / tangerine #ff922b — the old hero shader's exact
   palette). */

export const WATER_ART_PORTAL_LIGHT = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900"><defs><linearGradient id="creamBase" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff6ea"/><stop offset="52%" stop-color="#ffeeda"/><stop offset="100%" stop-color="#ffe7cc"/></linearGradient><radialGradient id="tangerineDrift" cx="72%" cy="28%" r="56%"><stop offset="0%" stop-color="#ffcf96" stop-opacity="0.95"/><stop offset="34%" stop-color="#ff922b" stop-opacity="0.55"/><stop offset="68%" stop-color="#ffab7e" stop-opacity="0.22"/><stop offset="100%" stop-color="#fff6ea" stop-opacity="0"/></radialGradient><radialGradient id="coralCurrent" cx="28%" cy="66%" r="58%"><stop offset="0%" stop-color="#ff9f88" stop-opacity="0.62"/><stop offset="44%" stop-color="#ff6b6b" stop-opacity="0.3"/><stop offset="100%" stop-color="#ffe7cc" stop-opacity="0"/></radialGradient><radialGradient id="pearlCore" cx="50%" cy="46%" r="48%"><stop offset="0%" stop-color="#fff3e0" stop-opacity="0.5"/><stop offset="56%" stop-color="#ffdfc0" stop-opacity="0.24"/><stop offset="100%" stop-color="#ffe7cc" stop-opacity="0"/></radialGradient></defs><rect width="1440" height="900" fill="url(#creamBase)"/><rect width="1440" height="900" fill="url(#coralCurrent)"/><rect width="1440" height="900" fill="url(#tangerineDrift)"/><rect width="1440" height="900" fill="url(#pearlCore)"/></svg>`);

export const WATER_ART_PORTAL_DUSK = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900"><defs><linearGradient id="seaBase" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1B2534"/><stop offset="52%" stop-color="#283450"/><stop offset="100%" stop-color="#141C29"/></linearGradient><radialGradient id="moonDrift" cx="72%" cy="28%" r="56%"><stop offset="0%" stop-color="#EFD8B6" stop-opacity="0.7"/><stop offset="34%" stop-color="#DFBC91" stop-opacity="0.46"/><stop offset="68%" stop-color="#6F6A66" stop-opacity="0.2"/><stop offset="100%" stop-color="#1B2534" stop-opacity="0"/></radialGradient><radialGradient id="silverCurrent" cx="28%" cy="66%" r="58%"><stop offset="0%" stop-color="#AEC2D6" stop-opacity="0.54"/><stop offset="44%" stop-color="#6E839B" stop-opacity="0.34"/><stop offset="100%" stop-color="#141C29" stop-opacity="0"/></radialGradient><radialGradient id="pearlCore" cx="50%" cy="46%" r="48%"><stop offset="0%" stop-color="#C8C4BC" stop-opacity="0.24"/><stop offset="56%" stop-color="#46536B" stop-opacity="0.18"/><stop offset="100%" stop-color="#141C29" stop-opacity="0"/></radialGradient></defs><rect width="1440" height="900" fill="url(#seaBase)"/><rect width="1440" height="900" fill="url(#silverCurrent)"/><rect width="1440" height="900" fill="url(#moonDrift)"/><rect width="1440" height="900" fill="url(#pearlCore)"/></svg>`);
