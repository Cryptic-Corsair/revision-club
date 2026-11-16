'use client';
import { useEffect, useRef, useState } from 'react';
import { clampDeltaTime, getCappedPixelRatio } from '../portal/lib/motion';
import {
  TWILIGHT_ENGINE_CONFIGS,
  TWILIGHT_FRAGMENT_SHADERS,
  VERTEX_SHADER_SRC,
  type TwilightEngineId,
} from './shader-engines';

interface ShaderCanvasProps {
  engine: TwilightEngineId;
  /** the room referee's verdict — only the room under the viewport's
      centre line may animate (portal/lib/still contract, reused) */
  live: boolean;
  /** couple the shader to the pointer (hero only; backdrop rooms
     stay still under the text) */
  interactive?: boolean;
  reducedMotion: boolean;
  testId: string;
}

/* the software-GL buffer budget in device pixels — SwiftShader's
   per-draw cost is the buffer's pixel count, so an absolute budget
   keeps the main-thread block flat at every viewport and type rung.
   These are ambient backdrops, not games: 200k pixels is plenty. */
const SOFTWARE_PIXEL_BUDGET = 200_000;

/* the frame cap — 30 draws/s is past the threshold of perception for
   drift this gentle and halves the GPU/thermal cost (same budget the
   portal's hero shader runs at) */
const FRAME_INTERVAL_SECONDS = 1 / 30;

/* software GL draws synchronously inside the draw call, so a plain
   timeout between draws is enough — no rAF queue to drain (the same
   finding the portal's hero shader recorded) */
const SOFTWARE_DRAW_GAP_MS = 90;

const HARDWARE_DPR_CAP = 1.5;

interface Handle {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  program: WebGLProgram;
  buffer: WebGLBuffer;
  vs: WebGLShader;
  fs: WebGLShader;
  uniforms: Record<string, WebGLUniformLocation | null>;
  resize: (w: number, h: number) => void;
  draw: (advanceTime: boolean) => void;
  dispose: () => void;
}

function detectSoftwareWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl =
      probe.getContext('webgl2') ?? probe.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererInfo = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
      rendererInfo,
    );
  } catch {
    return true;
  }
}

/* ───────── the lag contract ─────────
   Every optimization this canvas makes exists because a specific
   failure mode was measured somewhere on this site or in the
   Shader-water-v2 exploration:
   • lazy context — WebGL context creation is expensive and browsers
     cap live contexts (~16, oldest silently lost). The context is
     created only when the room is within a viewport of the stage and
     kept afterwards; three rooms ⇒ at most three contexts ever.
   • referee gating — exactly one room's shader animates at any scroll
     position (useRoomLive), everything else freezes to an honest
     still; the frozen rooms draw nothing at all.
   • frame cap — a 30 fps accumulator halves the GPU cost of an
     ambient field nobody can consciously perceive at 60.
   • pixel budget — hardware GL caps DPR at 1.5 (a retina panel never
     shades 2× the pixels for a blurred backdrop); software GL gets an
     absolute device-pixel budget so the main-thread block stays flat.
   • reduced motion — one static frame is drawn, then the loop never
     starts. No half-measures.
   • visibility + pageVisible + contextlost — the loop stops, and a
     lost context stops drawing instead of thrashing a dead pipeline. */
export function ShaderCanvas({
  engine,
  live,
  interactive = false,
  reducedMotion,
  testId,
}: ShaderCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<Handle | null>(null);
  const loopControlRef = useRef<{ start: () => void; stop: () => void } | null>(
    null,
  );
  const liveRef = useRef<boolean>(live);
  const reducedMotionRef = useRef<boolean>(reducedMotion);
  const interactiveRef = useRef<boolean>(interactive);
  const nearRef = useRef<boolean>(false);
  const initTimerRef = useRef<number>(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    liveRef.current = live;
    const control = loopControlRef.current;
    if (!control) return;
    if (live) control.start();
    else control.stop();
  }, [live]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  /* ── one effect owns the WebGL lifecycle ──
     init() runs at most once, when the room first comes near the
     stage; everything (observers, loop, pointer, cleanup) hangs off
     the handle it produces. */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const engineConfig = TWILIGHT_ENGINE_CONFIGS[engine];
    let disposed = false;

    const resolveDpr = (w: number, h: number): number => {
      if (isSoftwareGl) {
        const fit = Math.sqrt(SOFTWARE_PIXEL_BUDGET / Math.max(1, w * h));
        return Math.min(0.5, Math.max(0.25, fit));
      }
      return Math.min(
        getCappedPixelRatio(window.innerWidth, window.devicePixelRatio || 1),
        HARDWARE_DPR_CAP,
      );
    };

    const pointerTarget = { x: 0.5, y: 0.44 };
    const pointerCurrent = { x: 0.5, y: 0.44 };
    let pointerActiveTarget = 0;
    let pointerActiveCurrent = 0;

    const init = () => {
      if (disposed || handleRef.current) return;
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      let gl: WebGLRenderingContext | null = null;
      try {
        gl = canvas.getContext('webgl', {
          alpha: false,
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

      const compile = (type: number, source: string): WebGLShader | null => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          /* surface the real GLSL error in dev; the UI still falls
             back to the CSS dress below */
          console.warn(`[twilight/${engine}]`, gl!.getShaderInfoLog(shader));
          gl!.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fs = compile(
        gl.FRAGMENT_SHADER,
        TWILIGHT_FRAGMENT_SHADERS[engine],
      );
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
        console.warn(`[twilight/${engine}] link`, gl.getProgramInfoLog(program));
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

      const uniforms = {
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_resolution: gl.getUniformLocation(program, 'u_resolution'),
        u_mouse: gl.getUniformLocation(program, 'u_mouse'),
        u_intensity: gl.getUniformLocation(program, 'u_intensity'),
      };

      const width = Math.max(container.clientWidth, 2);
      const height = Math.max(container.clientHeight, 2);
      let dpr = resolveDpr(width, height);
      let simTime = 1.8;
      let lastTs = performance.now();

      const resize = (w: number, h: number) => {
        const nextW = Math.max(w, 2);
        const nextH = Math.max(h, 2);
        dpr = resolveDpr(nextW, nextH);
        canvas.width = Math.round(nextW * dpr);
        canvas.height = Math.round(nextH * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize(width, height);

      const draw = (advanceTime: boolean) => {
        const now = performance.now();
        const dt = clampDeltaTime((now - lastTs) / 1000);
        lastTs = now;
        if (advanceTime && !reducedMotionRef.current) {
          simTime += dt * engineConfig.speed;
        }
        const damp = 1 - Math.exp(-5.5 * dt);
        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * damp;
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * damp;
        pointerActiveCurrent +=
          (pointerActiveTarget - pointerActiveCurrent) * damp;

        if (uniforms.u_time) gl.uniform1f(uniforms.u_time, simTime);
        if (uniforms.u_resolution)
          gl.uniform2f(
            uniforms.u_resolution,
            canvas.width,
            canvas.height,
          );
        if (uniforms.u_mouse)
          gl.uniform2f(
            uniforms.u_mouse,
            pointerCurrent.x,
            1 - pointerCurrent.y,
          );
        if (uniforms.u_intensity)
          gl.uniform1f(
            uniforms.u_intensity,
            interactiveRef.current
              ? engineConfig.intensity * (0.7 + 0.5 * pointerActiveCurrent)
              : engineConfig.intensity,
          );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
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
        uniforms,
        resize,
        draw,
        dispose: () => {
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

    /* ── loop control, following the portal hero's start/stop pattern ── */
    let isVisible = false;
    let pageVisible = !document.hidden;
    let contextLost = false;
    let rafId = 0;
    let timeoutId = 0;
    let lastTickTs = performance.now();
    let frameAccumulator = 0;

    const stopLoop = () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };

    const schedule = () => {
      if (isSoftwareGl) {
        timeoutId = window.setTimeout(tick, SOFTWARE_DRAW_GAP_MS);
      } else {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const shouldRun = () =>
      Boolean(
        handleRef.current &&
          !contextLost &&
          isVisible &&
          pageVisible &&
          liveRef.current &&
          !reducedMotionRef.current,
      );

    function tick() {
      if (!shouldRun()) return;
      const now = performance.now();
      frameAccumulator += clampDeltaTime((now - lastTickTs) / 1000);
      lastTickTs = now;
      if (frameAccumulator < FRAME_INTERVAL_SECONDS) {
        schedule();
        return;
      }
      frameAccumulator %= FRAME_INTERVAL_SECONDS;
      handleRef.current?.draw(true);
      schedule();
    }

    const startLoop = () => {
      stopLoop();
      lastTickTs = performance.now();
      frameAccumulator = 0;
      /* always paint one honest frame on (re)start — frozen rooms keep
         their last frame, so a resumed room must refresh it */
      handleRef.current?.draw(false);
      if (shouldRun()) schedule();
    };

    loopControlRef.current = { start: startLoop, stop: stopLoop };

    /* lazy context: init only when the room is within a viewport of
       the stage (rootMargin 100%), so above-the-fold rooms init
       immediately and everything else waits its turn */
    const proximityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        nearRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          window.clearTimeout(initTimerRef.current);
          initTimerRef.current = window.setTimeout(() => {
            init();
            if (handleRef.current) {
              startLoop();
            }
          }, 120);
        }
      },
      { rootMargin: '100% 0% 100% 0%' },
    );
    proximityObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nowVisible = entry.isIntersecting;
        if (nowVisible === isVisible) return;
        isVisible = nowVisible;
        if (nowVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(container);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const handle = handleRef.current;
      if (!handle) return;
      handle.resize(entry.contentRect.width, entry.contentRect.height);
      /* a paused/still canvas must follow its CSS box */
      if (!shouldRun()) handle.draw(false);
    });
    resizeObserver.observe(container);

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startLoop();
      else stopLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactiveRef.current || e.pointerType === 'touch') return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerTarget.x = Math.min(
        1,
        Math.max(0, (e.clientX - rect.left) / rect.width),
      );
      pointerTarget.y = Math.min(
        1,
        Math.max(0, 1 - (e.clientY - rect.top) / rect.height),
      );
      pointerActiveTarget = 1;
    };

    const onPointerLeave = () => {
      pointerActiveTarget = 0;
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      stopLoop();
    };

    const onContextRestored = () => {
      contextLost = false;
      startLoop();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    container.addEventListener('webglcontextlost', onContextLost);
    container.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      disposed = true;
      stopLoop();
      window.clearTimeout(initTimerRef.current);
      proximityObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('webglcontextlost', onContextLost);
      container.removeEventListener('webglcontextrestored', onContextRestored);
      loopControlRef.current = null;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
    // engine never changes for a mounted room; reducedMotion/interactive
    // reach the closures through refs
  }, [engine]);

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      data-shader-failed={failed || undefined}
      aria-hidden="true"
      className="twilight-shader pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
