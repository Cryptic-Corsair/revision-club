'use client';

/* ═══════════════════════════════════════════════════════════════════════
   Bubbles — the club's beaker mascot, in her biggest role yet.

   The daylight portal gives her a perch on the footer wave; the candy
   lab gives her the whole stage. Same character DNA as the workspace's
   Mascot (bits.tsx): cream beaker body, candy liquid, warm ink outlines,
   measurement ticks, a face with moods. This door's cut adds what the
   small club cut can't carry: arms (one always waving), a stirring rod,
   a proper liquid surface (two wave skins under the clip), and four
   moods — idle (blinking, waving), cheer (both arms up, big smile, the
   closing panel), wow (the boop reaction — wide eyes, popped mouth),
   sleep (eyes shut, arms at rest, the footer).

   All motion is CSS transform/opacity (.cd-loop where ambient), so it
   rides the .cd-live gate and freezes under reduced motion. Gradient,
   clip and pupil ids are namespaced per instance via `idp`; pupils glide
   toward the cursor through the hero's --px/--py variables.
   ═══════════════════════════════════════════════════════════════════════ */

const INK = '#3D2B1F';
const BODY = '#FFFDF7';

const BODY_PATH =
  'M85 40 L175 40 L175 175 Q175 208 138 208 L122 208 Q85 208 85 175 Z';

/* one 60 px period of the liquid surface, repeated — the CSS wave
   keyframes travel exactly -60 px, so the loop is seamless */
const WAVE1 = 'M0 122 ' + 'q15 -7 30 0 q15 7 30 0 '.repeat(6) + 'L300 214 L0 214 Z';
const WAVE2 = 'M0 128 ' + 'q15 -6 30 0 q15 6 30 0 '.repeat(6) + 'L300 214 L0 214 Z';

export function Bubbles({
  idp,
  mood = 'idle',
  liquid = '#FF6B6B',
  className,
  onBoop,
}: {
  idp: string;
  mood?: 'idle' | 'cheer' | 'wow' | 'sleep';
  liquid?: string;
  className?: string;
  onBoop?: () => void;
}) {
  const asleep = mood === 'sleep';
  const awake = !asleep;

  const leftArm =
    mood === 'cheer'
      ? 'M86 142 C 68 128, 58 112, 54 96'
      : asleep
        ? 'M87 150 C 72 162, 64 178, 60 196'
        : 'M86 142 C 68 136, 56 126, 48 114';
  const rightArm =
    mood === 'cheer'
      ? 'M174 142 C 192 128, 202 112, 206 96'
      : asleep
        ? 'M173 150 C 188 162, 196 178, 200 196'
        : 'M174 142 C 192 136, 204 126, 212 114';
  const hand = {
    x: mood === 'cheer' ? 53 : asleep ? 59 : 46,
    y: mood === 'cheer' ? 92 : asleep ? 200 : 110,
  };
  const handR = {
    x: mood === 'cheer' ? 207 : asleep ? 201 : 214,
    y: mood === 'cheer' ? 92 : asleep ? 200 : 110,
  };

  return (
    <svg
      viewBox="0 0 260 250"
      className={className}
      role="img"
      aria-label={
        asleep
          ? 'Bubbles the beaker mascot, asleep, her candy liquid glowing softly'
          : 'Bubbles the beaker mascot with coral liquid, waving and holding a stirring rod'
      }
      onClick={onBoop}
      style={onBoop ? { cursor: 'pointer' } : undefined}
    >
      <defs>
        <clipPath id={`${idp}-clip`}>
          <path d={BODY_PATH} />
        </clipPath>
        <linearGradient id={`${idp}-liq`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={asleep ? '#f2b3b3' : '#FF9D9D'} />
          <stop offset="1" stopColor={asleep ? '#e37f7f' : liquid} />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="130" cy="220" rx="62" ry="10" fill={INK} opacity="0.12" />

      {/* arms — behind the body so the shoulders tuck under glass */}
      <g>
        <g
          className={awake ? 'cd-loop cd-wavearm' : undefined}
          style={awake ? { transformBox: 'view-box', transformOrigin: '86px 142px' } : undefined}
        >
          <path d={leftArm} stroke={INK} strokeWidth="13" fill="none" strokeLinecap="round" />
          <path d={leftArm} stroke={BODY} strokeWidth="6.5" fill="none" strokeLinecap="round" />
          <circle cx={hand.x} cy={hand.y} r="10.5" fill={BODY} stroke={INK} strokeWidth="4" />
        </g>
        <g>
          <path d={rightArm} stroke={INK} strokeWidth="13" fill="none" strokeLinecap="round" />
          <path d={rightArm} stroke={BODY} strokeWidth="6.5" fill="none" strokeLinecap="round" />
          <circle cx={handR.x} cy={handR.y} r="10.5" fill={BODY} stroke={INK} strokeWidth="4" />
          {/* the stirring rod, angled up from the right hand */}
          {!asleep && (
            <g transform={`rotate(-18 ${handR.x} ${handR.y})`}>
              <line
                x1={handR.x}
                y1={handR.y + 6}
                x2={handR.x}
                y2={handR.y - 34}
                stroke={INK}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <line
                x1={handR.x}
                y1={handR.y + 5}
                x2={handR.x}
                y2={handR.y - 32}
                stroke="#FFD9B8"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </g>

      {/* beaker body */}
      <path d={BODY_PATH} fill={BODY} stroke={INK} strokeWidth="6.5" strokeLinejoin="round" />
      <path d="M71 40 H189" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />

      {/* the liquid — two wave skins travelling under the clip */}
      <g clipPath={`url(#${idp}-clip)`}>
        <path className={asleep ? undefined : 'cd-loop cd-wave1'} d={WAVE1} fill={`url(#${idp}-liq)`} />
        {!asleep && <path className="cd-loop cd-wave2" d={WAVE2} fill={liquid} opacity="0.45" />}
        {/* measurement ticks, reading through the glass */}
        <path
          d="M168 152 h11 M166 172 h11 M164 192 h9"
          stroke={INK}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.28"
        />
        {/* rising bubbles in the liquor */}
        {awake && (
          <>
            <circle className="cd-loop cd-rise" style={{ transformBox: 'fill-box' }} cx="112" cy="192" r="4.5" fill="#ffffff" opacity="0.6" />
            <circle className="cd-loop cd-rise r2" style={{ transformBox: 'fill-box' }} cx="136" cy="198" r="6" fill="#ffffff" opacity="0.5" />
            <circle className="cd-loop cd-rise r3" style={{ transformBox: 'fill-box' }} cx="158" cy="190" r="3.6" fill="#ffffff" opacity="0.65" />
          </>
        )}
      </g>

      {/* the face */}
      {asleep ? (
        <>
          <path d="M101 102 q9 9 18 0" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M141 102 q9 9 18 0" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="130" cy="122" rx="5" ry="6.5" fill={INK} opacity="0.9" />
        </>
      ) : (
        <>
          <g className="cd-loop cd-blink">
            <g className="cd-pupils">
              <circle cx="110" cy="101" r={mood === 'wow' ? 8 : 7} fill={INK} />
              <circle cx="112.8" cy="98.2" r="2.4" fill="#ffffff" />
            </g>
          </g>
          <g className="cd-loop cd-blink">
            <g className="cd-pupils">
              <circle cx="150" cy="101" r={mood === 'wow' ? 8 : 7} fill={INK} />
              <circle cx="152.8" cy="98.2" r="2.4" fill="#ffffff" />
            </g>
          </g>
          <ellipse cx="94" cy="118" rx="10" ry="6" fill={liquid} opacity="0.45" />
          <ellipse cx="166" cy="118" rx="10" ry="6" fill={liquid} opacity="0.45" />
          {mood === 'wow' ? (
            <ellipse cx="130" cy="121" rx="7" ry="9" fill={INK} />
          ) : mood === 'cheer' ? (
            <path d="M112 116 Q130 136 148 116 Z" fill={INK} />
          ) : (
            <path d="M116 117 Q130 128 144 117" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          )}
        </>
      )}

      {/* the boop moment — a little shock-star over the head */}
      {mood === 'wow' && (
        <path
          d="M212 34 l3.4 8.6 8.6 3.4 -8.6 3.4 -3.4 8.6 -3.4 -8.6 -8.6 -3.4 8.6 -3.4 Z"
          fill="#FFC64B"
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
