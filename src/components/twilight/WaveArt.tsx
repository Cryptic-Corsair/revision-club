'use client';
import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   WaveArt — the collection cards' horizon-line art machine, ported from
   the reference's carousel slides (its `Rn` renderer): three drifting
   sine horizons over a slate wash with a pale sun disc and a dashed
   shore line, each slide wearing its own horizon colors, amplitude and
   phase. The phase advances in a rAF loop gated twice — the room
   referee's verdict (live) and an IntersectionObserver — and renders
   in CSS-pixel space with the reference's 32 ms gap, so the carousel's
   art costs nothing unless its room is the one on stage.
   ═══════════════════════════════════════════════════════════════════════ */

interface WaveArtProps {
  colors: [string, string, string];
  amplitude: number;
  phase: number;
  live: boolean;
  testId?: string;
}

export function WaveArt({ colors, amplitude, phase, live, testId }: WaveArtProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveRef = useRef(live);
  const phaseRef = useRef(phase);

  useEffect(() => {
    liveRef.current = live;
  }, [live]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let visible = false;
    let rafId = 0;
    let lastFrame = 0;
    let t = phaseRef.current;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(120, Math.round(rect.width));
      h = Math.max(80, Math.round(rect.height));
      canvas.width = w;
      canvas.height = h;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      /* the slate wash */
      const wash = ctx.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0, '#39424F');
      wash.addColorStop(0.55, '#2A323E');
      wash.addColorStop(1, '#1D242E');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);
      /* the pale sun disc */
      const sunX = w * 0.66;
      const sunY = h * 0.34;
      const sun = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, w * 0.14);
      sun.addColorStop(0, 'rgba(246, 241, 231, 0.5)');
      sun.addColorStop(0.55, 'rgba(223, 188, 145, 0.18)');
      sun.addColorStop(1, 'rgba(223, 188, 145, 0)');
      ctx.fillStyle = sun;
      ctx.fillRect(0, 0, w, h);
      /* the three drifting horizons — the reference's 84/104/124 rows */
      const rows: { base: number; drift: number; amp: number; offset: number }[] = [
        { base: 0.62, drift: Math.sin(t) * amplitude * 0.4, amp: amplitude * 0.34, offset: 0 },
        { base: 0.76, drift: Math.cos(t + 0.8) * amplitude * 0.45, amp: amplitude * 0.4, offset: 1.4 },
        { base: 0.9, drift: Math.sin(t + 1.6) * amplitude * 0.35, amp: amplitude * 0.3, offset: 2.8 },
      ];
      rows.forEach((row, i) => {
        const yBase = row.base * h + row.drift;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y = yBase + Math.sin(x / w * Math.PI * 2 + row.offset + t * 0.9) * row.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
      /* the dashed shore */
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(0, h * 0.83);
      ctx.lineTo(w, h * 0.83);
      ctx.strokeStyle = 'rgba(223, 188, 145, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const loop = (ts: number) => {
      if (visible && liveRef.current && !document.hidden && ts - lastFrame >= 32) {
        lastFrame = ts;
        t += 0.016 * 2.2;
        draw();
      }
      rafId = window.requestAnimationFrame(loop);
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, [colors, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      data-testid={testId ?? 'twilight-wave-art'}
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}
