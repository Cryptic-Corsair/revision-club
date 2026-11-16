'use client';
import { useId } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════
   PondSculpture — a verbatim port of the reference's hero art panel
   (recovered from its bundle as `Em`, the "twilight sculpture"): the
   arch-shaped pane holding a layered SVG dusk scene — sky gradient,
   blurred cloud glow, the sun smear refracted through an feTurbulence
   displacement (the "rain glass"), the water plane with glow pools,
   three concentric ripple rings, ink reed stems with an amber bud, and
   rain ticks — plus the breathing halo and the two-layer pointer
   parallax. The sound-reactive pulse is dropped (no audio bus here);
   the breathing halo and ring pulse run as compositor CSS keyframes
   (twilight.css), which the still-contract allows to stay smooth.
   ═══════════════════════════════════════════════════════════════════════ */

interface PondSculptureProps {
  reducedMotion: boolean;
}

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PondSculpture({ reducedMotion }: PondSculptureProps) {
  const uid = useId().replace(/:/g, '');
  const blurId = `twilight-soft-blur-${uid}`;
  const rainGlassId = `twilight-rain-glass-${uid}`;
  const skyId = `twilight-sky-${uid}`;
  const sunSmearId = `twilight-sun-smear-${uid}`;
  const cloudGlowId = `twilight-cloud-glow-${uid}`;
  const waterGlowId = `twilight-water-glow-${uid}`;
  const waterDeepId = `twilight-water-deep-${uid}`;
  const paneClipId = `twilight-pane-clip-${uid}`;

  /* pointer parallax — the reference feeds pointerX/Y motion values
     through two counter-moving layers ([-18%,18%]/[10,-10]) */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 55, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 55, damping: 18 });
  const paneX = useTransform(springX, [-0.5, 0.5], ['-18%', '18%']);
  const paneY = useTransform(springY, [-0.5, 0.5], ['-14%', '14%']);
  const glowX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const glowY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <motion.div
      data-testid="twilight-sculpture"
      aria-hidden="true"
      onPointerMove={onPointerMove}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.25, ease: EASE_EXPO }}
      className="relative mx-auto w-full max-w-[20.5rem] select-none sm:max-w-[23.5rem] lg:max-w-[26.5rem]"
    >
      {/* the breathing halo */}
      <div className="twilight-halo pointer-events-none absolute -inset-12 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 52% 48%, rgba(223, 188, 145, 0.24) 0%, rgba(178, 194, 212, 0.12) 45%, transparent 72%)',
        }}
      />
      {/* the arch pane */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[110px] border shadow-[0_32px_90px_rgba(20,25,34,0.34)] will-change-transform"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.24)',
          background:
            'linear-gradient(168deg, rgba(246, 244, 239, 0.12) 0%, rgba(178, 194, 212, 0.08) 46%, rgba(44, 51, 63, 0.36) 100%)',
        }}
      >
        <div className="absolute -inset-2 will-change-transform">
          <svg viewBox="0 0 400 500" fill="none" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <clipPath id={paneClipId}>
                <path d="M 0 200 C 0 89.54 89.54 0 200 0 C 310.46 0 400 89.54 400 200 L 400 390 C 400 450.75 350.75 500 290 500 L 110 500 C 49.25 500 0 450.75 0 390 Z" />
              </clipPath>
              <filter id={blurId} x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="20" />
              </filter>
              <filter id={rainGlassId} x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.015 0.042" numOctaves="1" seed="23" result="rainNoise" />
                <feDisplacementMap in="SourceGraphic" in2="rainNoise" scale="11" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <linearGradient id={skyId} x1="0.15" y1="0" x2="0.85" y2="1">
                <stop offset="0%" stopColor="#465060" stopOpacity="0.85" />
                <stop offset="46%" stopColor="#5C6676" stopOpacity="0.62" />
                <stop offset="68%" stopColor="#7C7778" stopOpacity="0.54" />
                <stop offset="100%" stopColor="#2B323E" stopOpacity="0.94" />
              </linearGradient>
              <radialGradient id={cloudGlowId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EFEAE2" stopOpacity="0.34" />
                <stop offset="48%" stopColor="#C6BEB4" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#5A6372" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={sunSmearId} cx="52%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F3DEC2" stopOpacity="0.85" />
                <stop offset="32%" stopColor="#DFBC91" stopOpacity="0.52" />
                <stop offset="65%" stopColor="#B48172" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#4C5563" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={waterGlowId} cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#DFBC91" stopOpacity="0.56" />
                <stop offset="48%" stopColor="#B88774" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#2C333F" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={waterDeepId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2C333F" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#1D222B" stopOpacity="0.92" />
              </linearGradient>
            </defs>
            <g clipPath={`url(#${paneClipId})`}>
              <rect x="0" y="0" width="400" height="500" fill={`url(#${skyId})`} />
              <g filter={`url(#${blurId})`}>
                <ellipse cx="230" cy="142" rx="145" ry="86" fill={`url(#${cloudGlowId})`} />
                <ellipse cx="145" cy="198" rx="125" ry="64" fill="#B2C2D4" fillOpacity="0.16" />
              </g>
              <g filter={`url(#${rainGlassId})`}>
                <ellipse cx="222" cy="278" rx="135" ry="96" fill={`url(#${sunSmearId})`} />
                <path d="M -20 314 Q 95 298 205 310 T 420 302 L 420 520 L -20 520 Z" fill={`url(#${waterDeepId})`} />
                <ellipse cx="218" cy="348" rx="88" ry="26" fill={`url(#${waterGlowId})`} />
                <ellipse cx="218" cy="396" rx="52" ry="44" fill={`url(#${waterGlowId})`} opacity="0.55" />
              </g>
              {/* the three ripple rings */}
              <g>
                <ellipse cx="216" cy="354" rx="44" ry="8" stroke="#F6F4EF" strokeOpacity="0.34" strokeWidth="0.95" />
                <ellipse cx="216" cy="354" rx="82" ry="14" stroke="#DFBC91" strokeOpacity="0.28" strokeWidth="0.85" />
                <ellipse cx="216" cy="354" rx="126" ry="20" stroke="#F6F4EF" strokeOpacity="0.14" strokeWidth="0.7" />
              </g>
              {/* the reeds */}
              <g>
                <path d="M 118 505 C 128 415 148 334 176 248 C 186 218 198 192 214 168" stroke="#1E242E" strokeOpacity="0.72" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M 155 336 C 128 312 104 300 84 294" stroke="#1E242E" strokeOpacity="0.62" strokeWidth="1.35" strokeLinecap="round" />
                <path d="M 172 280 C 202 260 226 246 248 238" stroke="#1E242E" strokeOpacity="0.56" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M 142 384 C 166 364 188 352 210 344" stroke="#1E242E" strokeOpacity="0.48" strokeWidth="1.1" strokeLinecap="round" />
                <path d="M 146 505 C 154 440 144 396 124 352" stroke="#1E242E" strokeOpacity="0.52" strokeWidth="1.15" strokeLinecap="round" />
                <circle cx="215" cy="166" r="4.5" fill="#DFBC91" fillOpacity="0.72" />
                <circle cx="213.8" cy="164.6" r="1.6" fill="#F6F4EF" fillOpacity="0.9" />
              </g>
              {/* the falling rain ticks */}
              <g opacity="0.72">
                <line x1="142" y1="62" x2="128" y2="164" stroke="#F6F4EF" strokeOpacity="0.34" strokeWidth="0.85" />
                <line x1="286" y1="88" x2="266" y2="216" stroke="#DFBC91" strokeOpacity="0.42" strokeWidth="0.9" />
                <line x1="322" y1="146" x2="306" y2="254" stroke="#F6F4EF" strokeOpacity="0.26" strokeWidth="0.7" />
                <line x1="92" y1="186" x2="80" y2="268" stroke="#F6F4EF" strokeOpacity="0.22" strokeWidth="0.65" />
                <circle cx="128" cy="167" r="1.7" fill="#F6F4EF" fillOpacity="0.74" />
                <circle cx="266" cy="219" r="2.0" fill="#DFBC91" fillOpacity="0.82" />
                <circle cx="232" cy="122" r="1.4" fill="#F6F4EF" fillOpacity="0.56" />
                <circle cx="306" cy="257" r="1.4" fill="#F6F4EF" fillOpacity="0.48" />
              </g>
              {/* the pane's inner frame + gold ticks */}
              <path d="M 16 202 C 16 100.38 98.38 18 200 18 C 301.62 18 384 100.38 384 202 L 384 388 C 384 440.47 341.47 483 289 483 L 111 483 C 58.53 483 16 440.47 16 388 Z" stroke="rgba(246, 244, 239, 0.16)" strokeWidth="0.85" />
              <line x1="200" y1="10" x2="200" y2="26" stroke="rgba(223, 188, 145, 0.7)" strokeWidth="1" />
              <line x1="10" y1="308" x2="26" y2="308" stroke="rgba(223, 188, 145, 0.45)" strokeWidth="0.9" />
              <line x1="374" y1="308" x2="390" y2="308" stroke="rgba(223, 188, 145, 0.45)" strokeWidth="0.9" />
            </g>
          </svg>
        </div>
      </div>

      {/* the two-layer pointer parallax glow */}
      <motion.div
        style={reducedMotion ? undefined : { x: paneX, y: paneY }}
        className="pointer-events-none absolute -inset-8 opacity-80 will-change-transform"
      >
        <motion.div
          style={reducedMotion ? undefined : { x: glowX, y: glowY }}
          className="h-full w-full"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(52% 46% at 46% 36%, rgba(246, 244, 239, 0.22) 0%, rgba(223, 188, 145, 0.14) 40%, transparent 72%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* the breathing ring (compositor CSS, twilight.css) */}
      <div className="twilight-ring-pulse pointer-events-none absolute inset-[16%] rounded-full" />
    </motion.div>
  );
}
