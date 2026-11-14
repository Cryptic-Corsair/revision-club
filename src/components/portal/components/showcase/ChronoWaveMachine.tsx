'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE_EXPO } from '../../lib/motion';
import { clampDeltaTime, getCalmScale, getCappedPixelRatio, getCanvasFrameIntervalSeconds } from '../../lib/motion';

interface ChronoWaveMachineProps {
  reducedMotion: boolean;
}

export function ChronoWaveMachine({ reducedMotion }: ChronoWaveMachineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let calm = 1;
    let phase = 0;
    let isVisible = false;
    let pageVisible = !document.hidden;
    let rafId = 0;
    let lastTs = performance.now();
    let frameAccumulator = 0;
    const frameIntervalSeconds = getCanvasFrameIntervalSeconds();
    const themeRoot = canvas.closest<HTMLElement>('.portal-root') ?? document.documentElement;
    let colors = { accent: '#C4B5FD', warm: '#F2C68D', muted: '#9D94B8' };

    const refreshColors = () => {
      const styles = getComputedStyle(themeRoot);
      colors = {
        accent: styles.getPropertyValue('--accent').trim() || '#C4B5FD',
        warm: styles.getPropertyValue('--accent-warm').trim() || '#F2C68D',
        muted: styles.getPropertyValue('--ink-muted').trim() || '#9D94B8',
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = getCappedPixelRatio(window.innerWidth, window.devicePixelRatio || 1);
      calm = getCalmScale(window.innerWidth);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    const drawWaves = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const { accent, warm, muted } = colors;

      const midY = height * 0.56;
      const samples = 72;

      const curves = [
        { color: accent, freq: 2.2, amp: height * 0.22, speed: 1.0, alpha: 0.75 },
        { color: warm, freq: 3.1, amp: height * 0.14, speed: -0.75, alpha: 0.5 },
        { color: muted, freq: 1.5, amp: height * 0.18, speed: 0.55, alpha: 0.35 },
      ];

      for (const curve of curves) {
        ctx.beginPath();
        for (let i = 0; i <= samples; i++) {
          const u = i / samples;
          const x = u * width;
          const env = Math.sin(u * Math.PI);
          const y =
            midY +
            Math.sin(u * Math.PI * curve.freq + t * curve.speed) * curve.amp * env;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = curve.alpha;
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!isVisible || !pageVisible || reducedMotionRef.current) return;
      const now = performance.now();
      const dt = clampDeltaTime((now - lastTs) / 1000);
      lastTs = now;
      frameAccumulator += dt;

      if (frameIntervalSeconds === 0 || frameAccumulator >= frameIntervalSeconds) {
        const elapsed = frameIntervalSeconds > 0 ? frameAccumulator : dt;
        frameAccumulator = frameIntervalSeconds > 0
          ? frameAccumulator % frameIntervalSeconds
          : 0;
        /* the calm scale stretches the wave rhythm on desktop (see lib/motion) */
        phase += (elapsed * 1.4) / calm;
        drawWaves(phase);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const stopLoop = () => window.cancelAnimationFrame(rafId);
    const startLoop = () => {
      stopLoop();
      lastTs = performance.now();
      frameAccumulator = 0;
      if (isVisible && pageVisible && !reducedMotionRef.current) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible && isVisible) {
        drawWaves(phase);
        startLoop();
      } else {
        stopLoop();
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (pageVisible && isVisible) drawWaves(phase);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        /* hysteresis, not a naked threshold: a canvas resting at the
           viewport edge must not flap start/stopLoop every scroll
           settle — on only once genuinely in view, off only once
           genuinely gone, previous verdict held between the bands */
        const ratio = entry.intersectionRatio;
        if (ratio >= 0.1) isVisible = true;
        else if (ratio < 0.02) isVisible = false;
        if (isVisible) {
          drawWaves(phase);
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: [0.02, 0.1] },
    );
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      refreshColors();
      if (pageVisible && isVisible) drawWaves(phase);
    });
    themeObserver.observe(themeRoot, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('visibilitychange', onVisibilityChange);

    refreshColors();
    resize();
    drawWaves(0.7);
    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-xl border p-4 select-none"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.14em] uppercase"
          style={{ color: 'var(--ink-muted)' }}
        >
          CHRONO RHYTHM
        </span>
        <span
          className="font-mono text-[10px] tabular-nums"
          style={{ color: 'var(--ink)' }}
        >
          120m weekly goal
        </span>
      </div>

      {/* Concentric SVG Chrono-Rings + Harmonic Canvas */}
      <div className="relative flex flex-1 items-center gap-4 pt-2">
        <svg
          width="104"
          height="104"
          viewBox="0 0 104 104"
          className="shrink-0"
          aria-hidden="true"
        >
          <circle
            cx="52"
            cy="52"
            r="42"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2.5"
          />
          <circle
            cx="52"
            cy="52"
            r="31"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="52"
            cy="52"
            r="42"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform="rotate(-90 52 52)"
            strokeDasharray={264}
            initial={reducedMotion ? { strokeDashoffset: 58 } : { strokeDashoffset: 264 }}
            whileInView={{ strokeDashoffset: 58 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE_EXPO }}
          />
          <motion.circle
            cx="52"
            cy="52"
            r="31"
            fill="none"
            stroke="var(--accent-warm)"
            strokeWidth="2.2"
            strokeLinecap="round"
            transform="rotate(-90 52 52)"
            strokeDasharray={195}
            initial={reducedMotion ? { strokeDashoffset: 68 } : { strokeDashoffset: 195 }}
            whileInView={{ strokeDashoffset: 68 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.35, delay: 0.15, ease: EASE_EXPO }}
          />
          <text
            x="52"
            y="50"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="14"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            78%
          </text>
          <text
            x="52"
            y="63"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontSize="8.5"
            fontFamily="var(--font-mono)"
          >
            94 MIN
          </text>
        </svg>

        <div className="relative flex h-28 flex-1 flex-col justify-between overflow-hidden rounded-lg border p-2"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="h-full w-full"
          />
          <div className="flex items-center justify-between pt-1 font-mono text-[9px] tabular-nums" style={{ color: 'var(--ink-muted)' }}>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span style={{ color: 'var(--accent)' }}>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
