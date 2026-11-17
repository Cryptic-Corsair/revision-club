'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { clampDeltaTime } from '../portal/lib/motion';
import {
  WATER_FRAGMENT_SRC,
  WATER_VERTEX_SRC,
  hexToRgb,
} from './water.frag';

/* ═══════════════════════════════════════════════════════════════════════
   WaterCanvas — the reference site's own water-mount contract, ported.

   The reference (water-shafer.vercel.app) drives its water through
   ShaderMount with: an art image refracted by the caustics, a
   paper-design prop table (highlights / layering / edges / caustic /
   waves / size / speed), a software-renderer detector that drops the
   second caustic layer and clamps `maxPixelCount` (200k–400k device
   pixels), `minPixelRatio: 1`, an IntersectionObserver, and a speed
   that drops to 0 when the backdrop isn't active. All of that is
   reproduced here on a raw WebGL1 canvas — plus the portal's 30 fps
   accumulator, so an ambient field never draws faster than perception.

   Parameter changes are TWEENED toward their targets inside the draw
   loop (the reference re-renders React props; we lerp uniforms, which
   keeps a section-driven shift to one canvas and zero re-renders).
   ═══════════════════════════════════════════════════════════════════════ */

export interface WaterParams {
  highlights: number;
  layering: number;
  edges: number;
  caustic: number;
  waves: number;
  size: number;
  /** the vendor's mount `scale` — zooms the art AND the caustic
      pattern together (the reference's global backdrop runs 1.38; its
      footer and card waters pass nothing → 1) */
  scale: number;
  /** seconds of shader-time per real second — 0 freezes the field */
  speed: number;
}

interface WaterCanvasProps {
  art: string;
  /** the dusk-room wash — its presence turns on theme blending */
  artDusk?: string;
  imageAspect: number;
  colorBack: string;
  colorHighlight: string;
  /** the dusk room's pair (defaults to the light pair) */
  colorBackDusk?: string;
  colorHighlightDusk?: string;
  /** 'light' | 'dusk' — tweens u_themeMix between the two rooms */
  theme?: 'light' | 'dusk';
  /** dissolve the field into the page at the bottom+top edges
      (output alpha; the context flips to straight-alpha compositing) */
  edgeFade?: boolean;
  /** rendered inside the wrapper if WebGL is unavailable */
  fallback?: ReactNode;
  params: WaterParams;
  /** device-pixel budgets — the reference's own numbers */
  budget: { software: number; mobile: number; desktop: number };
  active: boolean;
  reducedMotion: boolean;
  testId: string;
  className?: string;
}

interface Handle {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  program: WebGLProgram;
  buffer: WebGLBuffer;
  vs: WebGLShader;
  fs: WebGLShader;
  texture: WebGLTexture;
  textureDusk: WebGLTexture;
  uniforms: Record<string, WebGLUniformLocation | null>;
  resize: (w: number, h: number) => void;
  draw: (advanceTime: boolean) => number;
  dispose: () => void;
}

/* the hardware accumulator target — software GL widens this per
   instance (see frameIntervalSeconds in the mount effect) */
const FRAME_INTERVAL_SECONDS_HARDWARE = 1 / 30;
const TWEEN_RATE = 2.2; // 1/s — preset shifts settle in ~1.4s, like the reference's 500ms-1s fades
const THEME_TWEEN_RATE = 6; // 1/s — a room flip crossfades in ~0.5s, like the old hero's uThemeMix
const TWEEN_EPSILON = 0.0015;

const PARAM_KEYS: (keyof WaterParams)[] = [
  'highlights',
  'layering',
  'edges',
  'caustic',
  'waves',
  'size',
  'scale',
  'speed',
];

function detectSoftwareWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl = (probe.getContext('webgl2') ??
      probe.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(renderer);
  } catch {
    return true;
  }
}

export function WaterCanvas({
  art,
  artDusk,
  imageAspect,
  colorBack,
  colorHighlight,
  colorBackDusk = colorBack,
  colorHighlightDusk = colorHighlight,
  theme,
  edgeFade = false,
  fallback,
  params,
  budget,
  active,
  reducedMotion,
  testId,
  className = '',
}: WaterCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<Handle | null>(null);
  const loopControlRef = useRef<{ kick: () => void; stop: () => void } | null>(
    null,
  );
  const activeRef = useRef(active);
  const reducedRef = useRef(reducedMotion);
  const paramsRef = useRef(params);
  const themeRef = useRef(theme);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    activeRef.current = active;
    loopControlRef.current?.kick();
  }, [active]);

  useEffect(() => {
    reducedRef.current = reducedMotion;
    loopControlRef.current?.kick();
  }, [reducedMotion]);

  useEffect(() => {
    paramsRef.current = params;
    loopControlRef.current?.kick();
  }, [params]);

  useEffect(() => {
    themeRef.current = theme;
    loopControlRef.current?.kick();
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const lowCores =
      typeof navigator !== 'undefined' &&
      Number.isFinite(navigator.hardwareConcurrency) &&
      navigator.hardwareConcurrency <= 4;
    const constrained = isSoftwareGl || lowCores; // the reference's own detector
    let disposed = false;

    const resolveDpr = (w: number, h: number): number => {
      const maxPixels = isSoftwareGl
        ? budget.software
        : w < 768
          ? budget.mobile
          : budget.desktop;
      const fit = Math.sqrt(maxPixels / Math.max(1, w * h));
      if (isSoftwareGl) return Math.max(0.25, Math.min(1, fit));
      /* minPixelRatio: 1, capped for the lag contract */
      const device = window.devicePixelRatio || 1;
      return Math.max(1, Math.min(1.5, device, fit));
    };

    let simTime = 0;
    let lastTs = performance.now();
    /* current values tween toward paramsRef — start from the first set */
    const current = { ...params } as WaterParams;
    /* the room blend: 0 = light pair, 1 = dusk pair */
    let themeMix = themeRef.current === 'dusk' ? 1 : 0;
    /* the old hero's software contract: SwiftShader rasterizes off the
       main thread and stalls the next rAF, so on software GL the field
       draws at ~11 fps (a 90 ms accumulator gap) instead of 30 — a
       slow-drift caustic wash loses nothing at that cadence, and the
       page's own rAF cadence survives */
    const frameIntervalSeconds = isSoftwareGl ? 1 / 11 : 1 / 30;

    const init = () => {
      if (disposed || handleRef.current) return;
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      let gl: WebGLRenderingContext | null = null;
      try {
        gl = canvas.getContext('webgl', {
          /* the portal hero fades into the page through output alpha;
             premultipliedAlpha: false keeps the straight-alpha output
             honest when the browser composites the canvas */
          alpha: edgeFade,
          premultipliedAlpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: 'low-power',
        }) as WebGLRenderingContext | null;
      } catch {
        gl = null;
      }
      if (!gl) {
        setFailed(true);
        return;
      }

      const consoleTag = '[shared/water]';
      const compile = (type: number, source: string): WebGLShader | null => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          console.warn(consoleTag, gl!.getShaderInfoLog(shader));
          gl!.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compile(gl.VERTEX_SHADER, WATER_VERTEX_SRC);
      const fs = compile(gl.FRAGMENT_SHADER, WATER_FRAGMENT_SRC);
      const program = gl.createProgram();
      if (!vs || !fs || !program) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (program) gl.deleteProgram(program);
        setFailed(true);
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn(consoleTag, 'link', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        setFailed(true);
        return;
      }
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const posLoc = gl.getAttribLocation(program, 'a_pos');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      /* create each wash texture ON ITS OWN UNIT: WebGL's texImage2D/
         texParameteri act on whatever is bound to the ACTIVE unit, so
         a texture configured while nothing is bound is silently
         incomplete (default mipmap filter → samples black forever —
         exactly the flat-field bug this ordering killed) */
      const makeTexture = (unit: number): WebGLTexture => {
        gl.activeTexture(unit);
        const tex = gl.createTexture() as WebGLTexture;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          1,
          1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          new Uint8Array([30, 36, 48, 255]),
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return tex;
      };

      const texture = makeTexture(gl.TEXTURE0);
      const textureDusk = makeTexture(gl.TEXTURE1);

      const loadImage = (src: string, unit: number, target: WebGLTexture) => {
        const img = new Image();
        img.onload = () => {
          if (disposed || !handleRef.current) return;
          gl.activeTexture(unit);
          gl.bindTexture(gl.TEXTURE_2D, target);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img,
          );
          loopControlRef.current?.kick();
        };        img.src = src;
      };
      loadImage(art, gl.TEXTURE0, texture);
      loadImage(artDusk ?? art, gl.TEXTURE1, textureDusk);

      const uniforms = {
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_resolution: gl.getUniformLocation(program, 'u_resolution'),
        u_colorBack: gl.getUniformLocation(program, 'u_colorBack'),
        u_colorHighlight: gl.getUniformLocation(program, 'u_colorHighlight'),
        u_colorBackDusk: gl.getUniformLocation(program, 'u_colorBackDusk'),
        u_colorHighlightDusk: gl.getUniformLocation(
          program,
          'u_colorHighlightDusk',
        ),
        u_image: gl.getUniformLocation(program, 'u_image'),
        u_imageDusk: gl.getUniformLocation(program, 'u_imageDusk'),
        u_themeMix: gl.getUniformLocation(program, 'u_themeMix'),
        u_fade: gl.getUniformLocation(program, 'u_fade'),
        u_imageAspect: gl.getUniformLocation(program, 'u_imageAspect'),
        u_size: gl.getUniformLocation(program, 'u_size'),
        u_scale: gl.getUniformLocation(program, 'u_scale'),
        u_highlights: gl.getUniformLocation(program, 'u_highlights'),
        u_layering: gl.getUniformLocation(program, 'u_layering'),
        u_edges: gl.getUniformLocation(program, 'u_edges'),
        u_caustic: gl.getUniformLocation(program, 'u_caustic'),
        u_waves: gl.getUniformLocation(program, 'u_waves'),
      };
      if (uniforms.u_image) gl.uniform1i(uniforms.u_image, 0);
      if (uniforms.u_imageDusk) gl.uniform1i(uniforms.u_imageDusk, 1);
      if (uniforms.u_fade) gl.uniform1f(uniforms.u_fade, edgeFade ? 1 : 0);
      const backRgb = hexToRgb(colorBack);
      const highlightRgb = hexToRgb(colorHighlight);
      const backDuskRgb = hexToRgb(colorBackDusk);
      const highlightDuskRgb = hexToRgb(colorHighlightDusk);

      const width = Math.max(container.clientWidth, 2);
      const height = Math.max(container.clientHeight, 2);

      const resize = (w: number, h: number) => {
        const nextW = Math.max(w, 2);
        const nextH = Math.max(h, 2);
        const dpr = resolveDpr(nextW, nextH);
        canvas.width = Math.round(nextW * dpr);
        canvas.height = Math.round(nextH * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize(width, height);

      const draw = (advanceTime: boolean): number => {
        const now = performance.now();
        const dt = clampDeltaTime((now - lastTs) / 1000);
        lastTs = now;
        if (advanceTime && !reducedRef.current) {
          simTime += dt * current.speed;
        }
        /* tween params toward targets; returns the worst delta.
           On software GL the second caustic layer drops to 0 — the
           reference's own software-renderer contract (halves the
           fragment's octave loop, the dominant per-draw cost) */
        let worst = 0;
        for (const key of PARAM_KEYS) {
          const target =
            key === 'layering' && isSoftwareGl
              ? 0
              : paramsRef.current[key];
          const delta = target - current[key];
          worst = Math.max(worst, Math.abs(delta));
          const k = 1 - Math.exp(-TWEEN_RATE * dt);
          current[key] += delta * k;
        }
        /* the room blend crossfades toward the current theme */
        const themeTarget = themeRef.current === 'dusk' ? 1 : 0;
        const themeDelta = themeTarget - themeMix;
        worst = Math.max(worst, Math.abs(themeDelta));
        themeMix += themeDelta * (1 - Math.exp(-THEME_TWEEN_RATE * dt));

        if (uniforms.u_time) gl.uniform1f(uniforms.u_time, simTime);
        if (uniforms.u_resolution)
          gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
        if (uniforms.u_colorBack)
          gl.uniform3f(
            uniforms.u_colorBack,
            backRgb[0],
            backRgb[1],
            backRgb[2],
          );
        if (uniforms.u_colorHighlight)
          gl.uniform3f(
            uniforms.u_colorHighlight,
            highlightRgb[0],
            highlightRgb[1],
            highlightRgb[2],
          );
        if (uniforms.u_colorBackDusk)
          gl.uniform3f(
            uniforms.u_colorBackDusk,
            backDuskRgb[0],
            backDuskRgb[1],
            backDuskRgb[2],
          );
        if (uniforms.u_colorHighlightDusk)
          gl.uniform3f(
            uniforms.u_colorHighlightDusk,
            highlightDuskRgb[0],
            highlightDuskRgb[1],
            highlightDuskRgb[2],
          );
        if (uniforms.u_themeMix) {
          gl.uniform1f(uniforms.u_themeMix, themeMix);
          /* an observable, sparse trace of the room blend — written
             only on 0.05 steps (≈20 writes per crossfade), so the
             attribute budget stays flat while tests and debugging can
             read the field's actual blend off the DOM */
          const traced = Number(container.dataset.themeMix ?? '-1');
          if (Math.abs(traced - themeMix) >= 0.05) {
            container.dataset.themeMix = themeMix.toFixed(2);
          }
        }
        if (uniforms.u_imageAspect)
          gl.uniform1f(uniforms.u_imageAspect, imageAspect);
        if (uniforms.u_size) gl.uniform1f(uniforms.u_size, current.size);
        if (uniforms.u_scale) gl.uniform1f(uniforms.u_scale, current.scale);
        if (uniforms.u_highlights)
          gl.uniform1f(uniforms.u_highlights, current.highlights);
        if (uniforms.u_layering)
          gl.uniform1f(uniforms.u_layering, current.layering);
        if (uniforms.u_edges) gl.uniform1f(uniforms.u_edges, current.edges);
        if (uniforms.u_caustic)
          gl.uniform1f(uniforms.u_caustic, current.caustic);
        if (uniforms.u_waves) gl.uniform1f(uniforms.u_waves, current.waves);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        return worst;
      };

      container.appendChild(canvas);
      draw(false);

      handleRef.current = {
        gl,
        canvas,
        program,
        buffer,
        vs,
        fs,
        texture,
        textureDusk,
        uniforms,
        resize,
        draw,
        dispose: () => {
          gl.deleteTexture(texture);
          gl.deleteTexture(textureDusk);
          gl.deleteBuffer(buffer);
          gl.deleteProgram(program);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
          if (canvas.parentNode === container) {
            container.removeChild(canvas);
          }
        },
      };
    };

    /* ── loop control: draws while (running OR tween unsettled), then
          stops — a frozen, settled field costs nothing ── */
    let isVisible = false;
    let pageVisible = !document.hidden;
    let contextLost = false;
    let rafId = 0;
    let lastTickTs = performance.now();
    let accumulator = 0;
    let settledStop = 0;

    const stopLoop = () => {
      window.cancelAnimationFrame(rafId);
    };

    const running = () =>
      Boolean(
        handleRef.current &&
          !contextLost &&
          isVisible &&
          pageVisible &&
          activeRef.current &&
          !reducedRef.current &&
          paramsRef.current.speed > 0,
      );

    function tick() {
      const handle = handleRef.current;
      if (!handle) return;
      if (!isVisible || !pageVisible || contextLost) return;
      const run = running();
      const now = performance.now();
      accumulator += clampDeltaTime((now - lastTickTs) / 1000);
      lastTickTs = now;
      if (accumulator < frameIntervalSeconds) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      accumulator %= frameIntervalSeconds;
      const worstDelta = handle.draw(run);
      if (run) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      /* not running: keep drawing only until the tween settles */
      if (worstDelta > TWEEN_EPSILON) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      settledStop = window.setTimeout(() => {
        stopLoop();
      }, 400);
    }

    const kick = () => {
      /* re-evaluate the loop after any gate change */
      window.clearTimeout(settledStop);
      stopLoop();
      lastTickTs = performance.now();
      accumulator = 0;
      handleRef.current?.draw(false);
      rafId = window.requestAnimationFrame(tick);
    };

    loopControlRef.current = { kick, stop: stopLoop };

    /* the reference lazy-mounts nothing — its backdrop is fixed and
       always on stage; the section waters gate on proximity instead */
    const proximityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        window.setTimeout(() => {
          init();
          if (handleRef.current) kick();
        }, 60);
      },
      { rootMargin: '50% 0% 50% 0%' },
    );
    proximityObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nowVisible = entry.isIntersecting;
        if (nowVisible === isVisible) return;
        isVisible = nowVisible;
        if (nowVisible) kick();
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(container);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !handleRef.current) return;
      handleRef.current.resize(entry.contentRect.width, entry.contentRect.height);
      if (!running()) kick();
    });
    resizeObserver.observe(container);

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) kick();
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      stopLoop();
    };

    const onContextRestored = () => {
      contextLost = false;
      kick();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    container.addEventListener('webglcontextlost', onContextLost);
    container.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      disposed = true;
      stopLoop();
      window.clearTimeout(settledStop);
      proximityObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      container.removeEventListener('webglcontextlost', onContextLost);
      container.removeEventListener('webglcontextrestored', onContextRestored);
      loopControlRef.current = null;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      data-shader-failed={failed || undefined}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {failed ? fallback : null}
    </div>
  );
}
