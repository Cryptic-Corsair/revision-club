'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Meniscus, Reveal, SectionHead } from './bits';
import { useCountUp, useLive } from './lib';
import { GLOBAL_METRICS } from '../portal/data/ialData';

/* ═══════════════════════════════════════════════════════════════════════
   the bench protocol — the study method as a scroll-drawn thread with
   four stations, then the readout: five instruments counting the
   course's own totals (registry numbers, never invented).
   ═══════════════════════════════════════════════════════════════════════ */

const INK70 = 'rgba(242,238,250,0.7)';
const INK40 = 'rgba(242,238,250,0.4)';

/* ————— the four stations' instruments ————— */

function IcoOpen() {
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <rect x="9" y="6" width="24" height="32" rx="4" stroke={INK70} strokeWidth="2.4" fill="rgba(255,255,255,0.04)" />
      <path d="M14 14 h11 M14 20 h14 M14 26 h9" stroke={INK40} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="24" y="24" width="16" height="15" rx="3" fill="#181228" stroke="#6fe8a3" strokeWidth="2.2" />
      <text x="32" y="34.5" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-plex), monospace" fill="#6fe8a3">
        1.4
      </text>
    </svg>
  );
}

function IcoWatch() {
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <circle cx="21" cy="25" r="13" stroke={INK70} strokeWidth="2.4" fill="rgba(255,255,255,0.04)" />
      <path d="M10 31 C 15 34, 27 34, 32 31" stroke="#74d7ff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle className="lum-loop lum-orbit" style={{ transformOrigin: '21px 25px', transformBox: 'view-box' }} cx="34" cy="25" r="3" fill="#6fe8a3" />
      <path d="M32 10 l7 -5 M36 14 l7 -2" stroke={INK40} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IcoPack() {
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <rect x="7" y="9" width="32" height="28" rx="5" stroke={INK70} strokeWidth="2.4" fill="rgba(255,255,255,0.04)" />
      <path d="M7 17 h32" stroke={INK40} strokeWidth="2" />
      <path d="M13 24 l3 3 5 -6" stroke="#ffc46b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 31 h12" stroke={INK40} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoKeep() {
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <path d="M8 34 h30" stroke={INK40} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="10" y="26" width="7" height="8" rx="1.6" fill="#6fe8a3" opacity="0.85" />
      <rect x="20" y="21" width="7" height="13" rx="1.6" fill="#74d7ff" opacity="0.85" />
      <rect x="30" y="15" width="7" height="19" rx="1.6" fill="#b8a3ff" opacity="0.85" />
      <path d="M12 12 l1.6 3.2 3.4.5 -2.5 2.4.6 3.4 -3.1-1.7 -3.1 1.7.6 -3.4 -2.5 -2.4 3.4 -.5 z" fill="#ffc46b" opacity="0.9" />
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
    body: 'Reading time, revised marks and the sticker book — kept privately in your browser, never on a server. Come back tomorrow and the bench remembers where you stood.',
  },
];

export function ProtocolBand() {
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
    <section id="method" ref={liveRef} className="lum-sec">
      <div className="lum-wrap">
        <SectionHead
          dot="#ffc46b"
          eyebrow="the bench protocol"
          title="How the bench works."
          lead="Four stations between opening the door and knowing the specification by heart. The thread draws itself as you scroll — this is the whole method, end to end."
        />
        <div className="lum-protocol" ref={wrapRef}>
          <svg className="lum-thread" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="lum-thread-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#6fe8a3" />
                <stop offset="0.5" stopColor="#74d7ff" />
                <stop offset="1" stopColor="#b8a3ff" />
              </linearGradient>
            </defs>
            <path d={thread} fill="none" stroke="rgba(242,238,250,0.08)" strokeWidth="2.5" />
            <motion.path
              d={thread}
              fill="none"
              stroke="url(#lum-thread-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: reduced ? 1 : pathLength }}
            />
          </svg>
          <div className="lum-stations">
            {STATIONS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <div className="lum-station">
                  <div className="lum-snode">{s.n}</div>
                  <div className="lum-sticon" aria-hidden="true">
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

/* ————— the readout ————— */

function Meter({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="lum-meter">
      <div className="val">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export function ReadoutBand() {
  const liveRef = useLive<HTMLElement>();
  const hours = Math.round(GLOBAL_METRICS.totalMinutes / 60);
  /* four counters, each animated once on arrival — the registry's own
     totals, the same numbers the workspace navigates by */
  const cUnits = useCountUp(GLOBAL_METRICS.units);
  const cTopics = useCountUp(GLOBAL_METRICS.topics);
  const cHours = useCountUp(hours);
  const cWorked = useCountUp(GLOBAL_METRICS.workedExamples);

  return (
    <section ref={liveRef} className="lum-sec lum-band-readout">
      <Meniscus />
      <div className="lum-wrap">
        <SectionHead
          dot="#b8a3ff"
          eyebrow="the bench, measured"
          title={<>Counted like a titration.</>}
          lead="No invented numbers on this bench. Every figure below is the registry’s own count — the same totals the workspace’s navigation derives from, measured to the unit."
        />
        <div className="lum-readout">
          <Reveal>
            <div className="lum-meter">
              <div className="val">
                <span ref={cUnits}>0</span>
              </div>
              <div className="lbl">
                units
                <br />
                WCH11–WCH16
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="lum-meter">
              <div className="val">
                <span ref={cTopics}>0</span>
              </div>
              <div className="lbl">
                topics
                <br />
                spec-aligned
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="lum-meter">
              <div className="val">
                <span ref={cHours}>0</span>
                <span className="unit">h</span>
              </div>
              <div className="lbl">
                of notes
                <br />
                to read
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="lum-meter">
              <div className="val">
                <span ref={cWorked}>0</span>
              </div>
              <div className="lbl">
                worked
                <br />
                examples
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <Meter value="100" unit="%" label="yours — kept in your browser" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
