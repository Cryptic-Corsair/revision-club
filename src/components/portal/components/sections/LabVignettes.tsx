'use client';
import { motion } from 'framer-motion';
import {
  FlaskVignette,
  HillVignette,
  RingVignette,
  ShellsVignette,
} from '../motion/LabGraphics';
import {
  DistillVignette,
  DropVignette,
  EquilibriumVignette,
  IonsVignette,
} from '../motion/LabGraphicsExtra';
import { EASE_EXPO, VIEWPORT_ONCE } from '../../lib/motion';
import { SectionBackdrop } from '../motion/SectionBackdrop';

interface LabVignettesProps {
  reducedMotion: boolean;
}

/* ————— the living laboratory —————
   A room that is nothing but motion graphics, running as an
   endless two-row carousel: the top row drifts left, the bottom
   row drifts right, both loops seamless (each track is its own
   sequence played twice, translated exactly half its width).
   Eight pieces of the subject ride the loop — electron shells,
   the delocalised ring, a bubbling reaction, the activation hill,
   the titration drop, an electrolysis cell, dynamic equilibrium
   and a fractional distillation. Cards carry no descriptions —
   the piece and its number are all the room says. Hovering a row
   pauses it; under reduced motion the rows freeze into an honest,
   scrollable shelf of stills. */

interface LabTile {
  id: string;
  index: string;
  title: string;
  render: (reducedMotion: boolean) => React.ReactNode;
}

const TILES: readonly LabTile[] = [
  {
    id: 'shells',
    index: '01',
    title: 'Shells in orbit',
    render: (reducedMotion) => <ShellsVignette reducedMotion={reducedMotion} />,
  },
  {
    id: 'ring',
    index: '02',
    title: 'The delocalised ring',
    render: (reducedMotion) => <RingVignette reducedMotion={reducedMotion} />,
  },
  {
    id: 'flask',
    index: '03',
    title: 'A bubbling reaction',
    render: (reducedMotion) => <FlaskVignette reducedMotion={reducedMotion} />,
  },
  {
    id: 'hill',
    index: '04',
    title: 'Over the activation hill',
    render: (reducedMotion) => <HillVignette reducedMotion={reducedMotion} />,
  },
  {
    id: 'drop',
    index: '05',
    title: 'The falling drop',
    render: (reducedMotion) => <DropVignette reducedMotion={reducedMotion} />,
  },
  {
    id: 'ions',
    index: '06',
    title: 'Ions on the move',
    render: (reducedMotion) => <IonsVignette reducedMotion={reducedMotion} />,
  },
  {
    id: 'equilibrium',
    index: '07',
    title: 'The exchange at equilibrium',
    render: (reducedMotion) => (
      <EquilibriumVignette reducedMotion={reducedMotion} />
    ),
  },
  {
    id: 'distill',
    index: '08',
    title: 'The distillation column',
    render: (reducedMotion) => <DistillVignette reducedMotion={reducedMotion} />,
  },
];

/* row one drifts left, row two drifts right — interleaved so both
   directions carry a mix of the whole shelf */
const ROW_ONE = [0, 2, 4, 6].map((i) => TILES[i]);
const ROW_TWO = [1, 3, 5, 7].map((i) => TILES[i]);

function LabCard({
  tile,
  reducedMotion,
  hidden,
}: {
  tile: LabTile;
  reducedMotion: boolean;
  hidden?: boolean;
}) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className="mr-5 w-[300px] shrink-0 rounded-3xl p-4 sm:w-[352px] sm:p-5"
      style={{
        backgroundColor: 'var(--surface)',
        boxShadow: 'var(--card-shadow)',
      }}
      data-testid={`lab-tile-${tile.id}`}
    >
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        {tile.render(reducedMotion)}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-4 px-1">
        <h3 className="font-display text-base font-bold tracking-tight">
          {tile.title}
        </h3>
        <span
          className="font-mono text-[11px] tabular-nums"
          style={{ color: 'var(--ink-muted)' }}
        >
          {tile.index}
        </span>
      </div>
    </article>
  );
}

function MarqueeRow({
  tiles,
  direction,
  duration,
  reducedMotion,
  rowId,
}: {
  tiles: readonly LabTile[];
  direction: 'left' | 'right';
  duration: string;
  reducedMotion: boolean;
  rowId: string;
}) {
  return (
    <div
      className="portal-marquee-row"
      data-static={reducedMotion || undefined}
      data-testid={rowId}
    >
      <div
        className="portal-marquee-track"
        data-direction={direction}
        style={{ animationDuration: duration }}
      >
        {[...tiles, ...tiles].map((tile, i) => (
          <LabCard
            key={`${tile.id}-${i}`}
            tile={tile}
            reducedMotion={reducedMotion}
            hidden={i >= tiles.length}
          />
        ))}
      </div>
    </div>
  );
}

export function LabVignettes({ reducedMotion }: LabVignettesProps) {
  return (
    <section id="lab" className="relative py-20 sm:py-28" data-testid="lab-vignettes">
      {/* the hero's ring language, tuned for this room */}
      <SectionBackdrop variant="lab" reducedMotion={reducedMotion} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="space-y-6"
        >
          <MarqueeRow
            rowId="lab-row-1"
            tiles={ROW_ONE}
            direction="left"
            duration="56s"
            reducedMotion={reducedMotion}
          />
          <MarqueeRow
            rowId="lab-row-2"
            tiles={ROW_TWO}
            direction="right"
            duration="72s"
            reducedMotion={reducedMotion}
          />
        </motion.div>
      </div>
    </section>
  );
}
