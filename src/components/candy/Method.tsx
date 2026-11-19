'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BlobDivider, Reveal, SectionHead } from './bits';
import { useCountUp, useLive } from './lib';
import { GLOBAL_METRICS } from '../portal/data/ialData';

/* ═══════════════════════════════════════════════════════════════════════
   how Bubbles helps — the study method as a marching-dash thread with
   four stations; then the sticker sheet: five badges counting the
   course's own registry totals (never invented).
   ═══════════════════════════════════════════════════════════════════════ */

const INK = '#3D2B1F';
const INK70 = 'rgba(61, 43, 31, 0.7)';
const INK40 = 'rgba(61, 43, 31, 0.42)';

/* ————— the four stations' toys ————— */

function IcoOpen() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="9" y="6" width="26" height="34" rx="5" stroke={INK70} strokeWidth="2.6" fill="rgba(255, 198, 75, 0.14)" />
      <path d="M15 15 h11 M15 21 h13 M15 27 h9" stroke={INK40} strokeWidth="2.4" strokeLinecap="round" />
      <rect x="24" y="26" width="17" height="16" rx="4" fill="#FFFDF9" stroke="#12B886" strokeWidth="2.4" />
      <text x="32.5" y="37.5" textAnchor="middle" fontSize="9" fontFamily="var(--font-plex), monospace" fill="#12B886">
        1.4
      </text>
    </svg>
  );
}

function IcoWatch() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="22" cy="26" r="13.5" stroke={INK70} strokeWidth="2.6" fill="rgba(91, 180, 232, 0.12)" />
      <path d="M10 32 C 15 35, 28 35, 34 32" stroke="#5BB4E8" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <circle className="cd-loop cd-orbit" style={{ transformOrigin: '22px 26px' }} cx="35.5" cy="26" r="3.2" fill="#12B886" stroke={INK} strokeWidth="1.2" />
      <path d="M33 10 l7 -5 M37 14 l7 -2" stroke={INK40} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoPack() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="7" y="9" width="34" height="30" rx="6" stroke={INK70} strokeWidth="2.6" fill="rgba(255, 107, 107, 0.1)" />
      <path d="M7 18 h34" stroke={INK40} strokeWidth="2.2" />
      <path d="M13 26 l3.2 3.2 5.4 -6.4" stroke="#FF922B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 33 h13" stroke={INK40} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function IcoKeep() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 36 h32" stroke={INK40} strokeWidth="2.4" strokeLinecap="round" />
      <rect x="10" y="27" width="7.5" height="9" rx="2" fill="#FF6B6B" stroke={INK} strokeWidth="1.4" />
      <rect x="20.5" y="22" width="7.5" height="14" rx="2" fill="#5BB4E8" stroke={INK} strokeWidth="1.4" />
      <rect x="31" y="16" width="7.5" height="20" rx="2" fill="#9775FA" stroke={INK} strokeWidth="1.4" />
      <path d="M13 12 l1.7 3.4 3.6.5 -2.6 2.6.6 3.6 -3.3-1.8 -3.3 1.8.6 -3.6 -2.6 -2.6 3.6 -.5 z" fill="#FFC64B" stroke={INK} strokeWidth="1.2" />
    </svg>
  );
}

const STATIONS = [
  {
    n: '1',
    icon: IcoOpen,
    title: 'Open a topic',
    body: 'Every note is keyed to the official specification — the statement leads at the top of its clause, and the teaching follows it line by line, never drifting from what the exam asks.',
  },
  {
    n: '2',
    icon: IcoWatch,
    title: 'Watch it move',
    body: 'The figure library animates the physics: bonding currents, titration drops, rate curves drawing on, electrons in orbit. Understanding arrives before notation does.',
  },
  {
    n: '3',
    icon: IcoPack,
    title: 'Build a pack',
    body: 'Tick the spec points you want and they assemble into one continuous revision read — the timings already worked out, the order already the syllabus\u2019s own.',
  },
  {
    n: '4',
    icon: IcoKeep,
    title: 'Keep the light on',
    body: 'Reading time, revised marks and the sticker book — kept privately in your browser, never on a server. Come back tomorrow and the lab remembers where you stood.',
  },
];

export function MethodBand() {
  const liveRef = useLive<HTMLElement>();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduced = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 0.82', 'end 0.6'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const thread = 'M0 45 C 120 12, 260 78, 375 45 S 620 14, 750 45 S 930 80, 1000 45';

  return (
    <section id="method" ref={liveRef} className="cd-sec cd-band-method">
      <BlobDivider kind="drips" at="top" color="var(--cd-butter-soft)" />
      <div className="cd-wrap">
        <SectionHead
          dot="var(--cd-green)"
          eyebrow="how Bubbles helps"
          title="Four steps. That's the whole trick."
          lead="Between opening the door and knowing the specification by heart, there are only four stations. The thread marches along as you scroll — this is the whole method, end to end."
        />
        <div className="cd-protocol" ref={wrapRef}>
          <svg className="cd-thread" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="cd-thread-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#FF6B6B" />
                <stop offset="0.5" stopColor="#5BB4E8" />
                <stop offset="1" stopColor="#9775FA" />
              </linearGradient>
            </defs>
            <path d={thread} fill="none" stroke="rgba(61, 43, 31, 0.12)" strokeWidth="3" strokeLinecap="round" />
            <motion.path
              className="cd-march"
              d={thread}
              fill="none"
              stroke="url(#cd-thread-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ pathLength: reduced ? 1 : pathLength }}
            />
          </svg>
          <div className="cd-stations">
            {STATIONS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <div className="cd-station">
                  <div className="cd-snode">{s.n}</div>
                  <div className="cd-sticon" aria-hidden="true">
                    <s.icon />
                  </div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— the sticker sheet ————— */

function Sticker({
  value,
  unit,
  label,
  color,
  tilt,
  countRef,
}: {
  value: string;
  unit?: string;
  label: string;
  color: string;
  tilt: string;
  countRef?: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="cd-sticker" style={{ ['--cc' as string]: color, ['--tilt' as string]: tilt }}>
      <div className="val">
        {countRef ? <span ref={countRef}>0</span> : value}
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export function StickerBand() {
  const liveRef = useLive<HTMLElement>();
  const hours = Math.round(GLOBAL_METRICS.totalMinutes / 60);
  /* four counters, each animated once on arrival — the registry's own
     totals, the same numbers the workspace navigates by */
  const cUnits = useCountUp(GLOBAL_METRICS.units);
  const cTopics = useCountUp(GLOBAL_METRICS.topics);
  const cHours = useCountUp(hours);
  const cWorked = useCountUp(GLOBAL_METRICS.workedExamples);

  return (
    <section ref={liveRef} className="cd-sec">
      <div className="cd-wrap">
        <SectionHead
          dot="var(--cd-amber)"
          eyebrow="the sticker sheet"
          title={<>Counted honestly, like a titration.</>}
          lead="No invented numbers on this bench. Every badge below is the registry's own count — the same totals the workspace's navigation derives from, measured to the unit."
        />
        <div className="cd-stickers">
          <Reveal>
            <Sticker value="6" label={'units\nWCH11–WCH16'} color="#FF6B6B" tilt="-1.6deg" countRef={cUnits} />
          </Reveal>
          <Reveal delay={0.06}>
            <Sticker value="33" label={'topics\nspec-aligned'} color="#5BB4E8" tilt="1.1deg" countRef={cTopics} />
          </Reveal>
          <Reveal delay={0.12}>
            <Sticker value="13" unit="h" label={'of notes\nto read'} color="#12B886" tilt="-0.8deg" countRef={cHours} />
          </Reveal>
          <Reveal delay={0.18}>
            <Sticker value="30" label={'worked\nexamples'} color="#9775FA" tilt="1.4deg" countRef={cWorked} />
          </Reveal>
          <Reveal delay={0.24}>
            <Sticker value="100" unit="%" label={'yours — kept\nin your browser'} color="#FF922B" tilt="-1.2deg" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
