'use client';

/* ═══════════════════════════════════════════════════════════════════════
   the lumen flask — this front door's resident glassware.

   Not Bubbles (the club's beaker — she keeps the daylight pages); the
   lumen door keeps its own bench spirit: a conical flask of glowing
   green liquor that blinks, waves, holds a test tube, and eventually
   falls asleep in the footer. Three moods:

   · hero  — full cast: waving left arm, test tube in the right, live
     liquid surface (two wave skins travelling under the clip), rising
     bubbles, blinking eyes
   · cheer — both arms up for the closing panel
   · sleep — eyes closed, arms at rest, the liquor dimmed, still
     breathing (the footer's sleeper)

   All motion is CSS transform/opacity (.lum-loop where ambient), so it
   rides the .lum-live gate and freezes under reduced motion. Gradient
   and clip ids are namespaced per instance via `idp`.
   ═══════════════════════════════════════════════════════════════════════ */

const INK = '#f2eefa';
const ARM_FILL = '#e9e4f4';

const BODY =
  'M118 30 L118 96 L60 190 Q52 212 74 217 L186 217 Q208 212 200 190 L142 96 L142 30';

export function LumenFlask({
  idp,
  mood = 'hero',
  className,
}: {
  idp: string;
  mood?: 'hero' | 'cheer' | 'sleep';
  className?: string;
}) {
  const asleep = mood === 'sleep';
  return (
    <svg
      viewBox="0 0 260 250"
      className={className}
      role="img"
      aria-label={
        asleep
          ? 'A conical flask character, asleep, its green liquid glowing softly'
          : 'A conical flask character with a glowing green liquid, waving and holding a test tube'
      }
    >
      <defs>
        <clipPath id={`${idp}-clip`}>
          <path d={BODY} />
        </clipPath>
        <linearGradient id={`${idp}-liq`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={asleep ? '#5cb887' : '#8df2b5'} />
          <stop offset="1" stopColor={asleep ? '#1d5c42' : '#2fa06a'} />
        </linearGradient>
        <radialGradient id={`${idp}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="130" cy="226" rx="58" ry="9" fill="#000000" opacity="0.38" />

      {/* the cork — a little stopper, slightly proud of the neck */}
      <rect x="115" y="9" width="30" height="24" rx="5" fill="#d9b98c" stroke={INK} strokeWidth="3.5" />
      <path d="M120 16 h20" stroke="#b3935f" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

      {/* arms — drawn behind the body so the shoulders tuck under glass */}
      {!asleep && (
        <>
          <g
            className="lum-loop"
            style={{ transformBox: 'view-box', transformOrigin: '66px 150px' }}
          >
            <g className={mood === 'cheer' ? '' : 'lum-wavearm'}>
              <path
                d={mood === 'cheer' ? 'M64 146 C 48 132, 38 116, 34 100' : 'M66 150 C 50 144, 38 134, 30 124'}
                stroke={INK}
                strokeWidth="15"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={mood === 'cheer' ? 'M64 146 C 48 132, 38 116, 34 100' : 'M66 150 C 50 144, 38 134, 30 124'}
                stroke={ARM_FILL}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <circle
                cx={mood === 'cheer' ? 33 : 28}
                cy={mood === 'cheer' ? 96 : 121}
                r="9.5"
                fill={ARM_FILL}
                stroke={INK}
                strokeWidth="3.5"
              />
            </g>
          </g>
          <g>
            <path
              d={mood === 'cheer' ? 'M196 146 C 212 132, 222 116, 226 100' : 'M194 150 C 210 144, 222 136, 230 127'}
              stroke={INK}
              strokeWidth="15"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={mood === 'cheer' ? 'M196 146 C 212 132, 222 116, 226 100' : 'M194 150 C 210 144, 222 136, 230 127'}
              stroke={ARM_FILL}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx={mood === 'cheer' ? 227 : 232} cy={mood === 'cheer' ? 96 : 125} r="9.5" fill={ARM_FILL} stroke={INK} strokeWidth="3.5" />
            {/* the test tube — pink precipitate, two slow bubbles */}
            <g transform={mood === 'cheer' ? 'rotate(-24 227 96)' : 'rotate(-24 232 125)'}>
              <rect x={mood === 'cheer' ? 221 : 226} y={mood === 'cheer' ? 48 : 77} width="13" height="46" rx="5.5" fill="rgba(255,255,255,0.1)" stroke={INK} strokeWidth="3.2" />
              <rect x={mood === 'cheer' ? 223.8 : 228.8} y={mood === 'cheer' ? 76 : 105} width="7.4" height="15" rx="3.2" fill="#ff8fd6" />
              <circle className="lum-loop lum-rise" style={{ transformBox: 'fill-box' }} cx={mood === 'cheer' ? 227.5 : 232.5} cy={mood === 'cheer' ? 84 : 113} r="1.7" fill="#ffd9f1" />
              <circle className="lum-loop lum-rise r2" style={{ transformBox: 'fill-box' }} cx={mood === 'cheer' ? 227.5 : 232.5} cy={mood === 'cheer' ? 88 : 117} r="1.3" fill="#ffd9f1" />
              <path
                d={mood === 'cheer' ? 'M219 48 h17' : 'M224 77 h17'}
                stroke={INK}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
        </>
      )}
      {asleep && (
        <>
          <path d="M64 170 C 50 180, 44 192, 42 204" stroke={INK} strokeWidth="15" fill="none" strokeLinecap="round" />
          <path d="M64 170 C 50 180, 44 192, 42 204" stroke={ARM_FILL} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="41" cy="207" r="9.5" fill={ARM_FILL} stroke={INK} strokeWidth="3.5" />
          <path d="M196 170 C 210 180, 216 192, 218 204" stroke={INK} strokeWidth="15" fill="none" strokeLinecap="round" />
          <path d="M196 170 C 210 180, 216 192, 218 204" stroke={ARM_FILL} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="219" cy="207" r="9.5" fill={ARM_FILL} stroke={INK} strokeWidth="3.5" />
        </>
      )}

      {/* glass body */}
      <path d={BODY} fill="rgba(255,255,255,0.06)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M106 30 H154" stroke={INK} strokeWidth="6" strokeLinecap="round" />

      {/* the liquid — two wave skins travelling under the clip */}
      <g clipPath={`url(#${idp}-clip)`}>
        <ellipse className="lum-loop" cx="130" cy="146" rx="64" ry="20" fill={`url(#${idp}-glow)`} />
        <path
          className={asleep ? '' : 'lum-loop lum-wave1'}
          d="M20 134 Q45 126 70 134 T120 134 T170 134 T220 134 T270 134 L270 226 L20 226 Z"
          fill={`url(#${idp}-liq)`}
        />
        {!asleep && (
          <path
            className="lum-loop lum-wave2"
            d="M20 139 Q45 132 70 139 T120 139 T170 139 T220 139 T270 139 L270 226 L20 226 Z"
            fill="#6fe8a3"
            opacity="0.4"
          />
        )}
        {/* measurement ticks, reading through the glass */}
        <path d="M150 158 h12 M152 178 h10 M154 198 h8" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        {/* rising bubbles in the liquor */}
        {!asleep && (
          <>
            <circle className="lum-loop lum-rise" style={{ transformBox: 'fill-box' }} cx="104" cy="196" r="4" fill="#eafff2" opacity="0.85" />
            <circle className="lum-loop lum-rise r2" style={{ transformBox: 'fill-box' }} cx="128" cy="202" r="5.5" fill="#eafff2" opacity="0.7" />
            <circle className="lum-loop lum-rise r3" style={{ transformBox: 'fill-box' }} cx="150" cy="195" r="3.4" fill="#eafff2" opacity="0.8" />
          </>
        )}
      </g>

      {/* the face */}
      {asleep ? (
        <>
          <path d="M94 112 q9 9 18 0" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M148 112 q9 9 18 0" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <ellipse cx="130" cy="133" rx="5" ry="6.5" fill={INK} opacity="0.9" />
        </>
      ) : (
        <>
          <g className="lum-loop lum-blink">
            <circle cx="104" cy="112" r="7" fill={INK} />
            <circle cx="106.6" cy="109.4" r="2.3" fill="#ffffff" />
          </g>
          <g className="lum-loop lum-blink">
            <circle cx="156" cy="112" r="7" fill={INK} />
            <circle cx="158.6" cy="109.4" r="2.3" fill="#ffffff" />
          </g>
          <ellipse cx="84" cy="131" rx="10" ry="6" fill="#ff8fd6" opacity="0.42" />
          <ellipse cx="176" cy="131" rx="10" ry="6" fill="#ff8fd6" opacity="0.42" />
          {mood === 'cheer' ? (
            <path d="M114 124 Q130 143 146 124 Z" fill={INK} />
          ) : (
            <path d="M116 126 Q130 136 144 126" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          )}
        </>
      )}
    </svg>
  );
}
