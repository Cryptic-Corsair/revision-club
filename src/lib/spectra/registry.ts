import type { UnitCode } from "./types";
import type { SpecSection } from "./notes-types";
import { UNITS } from "./units";
import { NOTES_DOCS } from "./notes";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the spec registry — the single source of truth
   for "which spec point is covered where".

   Nothing here is hand-written: the registry is *derived* from the
   revision notes themselves (each SpecSection already carries its
   spec number and the official statement) and dressed with topic /
   unit labels from UNITS. Write a new note doc — or add a section
   to one — and the map, the spec index and every revision pack
   pick it up automatically. Content never needs to change for a
   section to appear somewhere else.

   Two levels:
   · SpecPoint  — one assessment statement ("2.6"), with every note
                  section that covers it (usually one; more when two
                  docs teach the same point).
   · SpecEntry  — one covering section, bound to its doc / topic /
                  unit for deep links.
   ═══════════════════════════════════════════════════════════════ */

export interface SpecEntry {
  /** the note doc the section lives in, e.g. "wch11-t02" */
  docId: string;
  /** spec number, e.g. "2.6" */
  spec: string;
  /** the official statement, verbatim */
  statement: string;
  /** the section's short title */
  title: string;
  /** the section itself — rendered as-is, wherever it appears */
  section: SpecSection;
  /** the section's position inside its doc */
  sectionIndex: number;
  unitCode: UnitCode;
  /** topic id inside the unit, e.g. "t02" */
  topicId: string;
  /** spec-facing label, e.g. "Topic 2" */
  topicLabel: string;
  /** the topic's full title, from UNITS */
  topicTitle: string;
  /** the note doc's display title */
  docTitle: string;
  /** the unit's candy colour */
  candy: string;
}

export interface SpecPoint {
  /** spec number, e.g. "2.6" — the pick key */
  spec: string;
  /** the official statement, verbatim (from the first covering section) */
  statement: string;
  /** every note section covering this point, in syllabus order */
  entries: SpecEntry[];
  /** display context of the first covering section */
  unitCode: UnitCode;
  topicId: string;
  topicLabel: string;
  topicTitle: string;
  candy: string;
}

/* ————— derivation ————— */

const topicNoOf = (topicId: string) => {
  const n = parseInt(topicId.replace(/^t0*/, ""), 10);
  return Number.isFinite(n) ? n : 999;
};

const unitIndex = new Map<string, number>(UNITS.map((u) => [u.code, u.index]));
const topicIndex = new Map<string, number>(
  UNITS.flatMap((u) => u.topics.map((t, i) => [`${u.code}/${t.id}`, i] as const)),
);

function buildEntries(): SpecEntry[] {
  const out: SpecEntry[] = [];
  for (const doc of NOTES_DOCS) {
    const unit = UNITS.find((u) => u.code === doc.unitCode);
    const topic = unit?.topics.find((t) => t.id === doc.topicId);
    if (!unit || !topic) continue;
    doc.sections.forEach((s, i) => {
      /* a doc may carry framing sections (intros, summaries) with no
         spec number — they read in the note but never enter the map */
      if (!s.spec) return;
      out.push({
        docId: doc.id,
        spec: s.spec,
        statement: s.statement,
        title: s.title,
        section: s,
        sectionIndex: i,
        unitCode: doc.unitCode,
        topicId: doc.topicId,
        topicLabel: topic.label,
        topicTitle: topic.title,
        docTitle: doc.title,
        candy: unit.candy.main,
      });
    });
  }
  /* syllabus order: unit → topic → the order the sections were written */
  return out.sort(
    (a, b) =>
      (unitIndex.get(a.unitCode) ?? 99) - (unitIndex.get(b.unitCode) ?? 99) ||
      topicNoOf(a.topicId) - topicNoOf(b.topicId) ||
      (topicIndex.get(`${a.unitCode}/${a.topicId}`) ?? 99) -
        (topicIndex.get(`${b.unitCode}/${b.topicId}`) ?? 99) ||
      a.sectionIndex - b.sectionIndex,
  );
}

const ENTRIES = buildEntries();

export const SPEC_POINTS: SpecPoint[] = (() => {
  const bySpec = new Map<string, SpecPoint>();
  for (const e of ENTRIES) {
    const point = bySpec.get(e.spec);
    if (point) {
      point.entries.push(e);
      continue;
    }
    bySpec.set(e.spec, {
      spec: e.spec,
      statement: e.statement,
      entries: [e],
      unitCode: e.unitCode,
      topicId: e.topicId,
      topicLabel: e.topicLabel,
      topicTitle: e.topicTitle,
      candy: e.candy,
    });
  }
  return [...bySpec.values()];
})();

const POINTS_BY_SPEC = new Map(SPEC_POINTS.map((p) => [p.spec, p]));

export function getSpecPoint(spec: string): SpecPoint | undefined {
  return POINTS_BY_SPEC.get(spec);
}

/** every point inside one unit topic, syllabus-ordered */
export interface SpecTopicGroup {
  unitCode: UnitCode;
  unitIndex: number;
  unitShort: string;
  unitTitle: string;
  candy: string;
  topicId: string;
  topicLabel: string;
  topicTitle: string;
  points: SpecPoint[];
}

export const SPEC_TOPIC_GROUPS: SpecTopicGroup[] = UNITS.flatMap((u) =>
  u.topics.map((t, i) => ({
    unitCode: u.code,
    unitIndex: u.index,
    unitShort: u.shortTitle,
    unitTitle: u.title,
    candy: u.candy.main,
    topicId: t.id,
    topicLabel: t.label,
    topicTitle: t.title,
    points: SPEC_POINTS.filter((p) => p.unitCode === u.code && p.topicId === t.id),
  })),
).filter((g) => g.points.length > 0);

/** site-wide coverage numbers, for badges and empty states */
export const SPEC_STATS = {
  points: SPEC_POINTS.length,
  sections: ENTRIES.length,
  topics: SPEC_TOPIC_GROUPS.length,
  units: new Set(SPEC_POINTS.map((p) => p.unitCode)).size,
} as const;

/* ————— the assembled pack —————
   Picks resolved to their registry points (syllabus order) and
   grouped by topic — the one derivation both pack interfaces read,
   so the rooms dress and the document dress always assemble the
   very same pages. */

export interface PackGroup {
  key: string;
  unitCode: UnitCode;
  candy: string;
  topicLabel: string;
  topicTitle: string;
  sections: { point: SpecPoint; entryIndex: number }[];
}

export function packGroupsOf(picks: string[]): {
  points: SpecPoint[];
  groups: PackGroup[];
  sectionCount: number;
} {
  const points = picks
    .map((s) => getSpecPoint(s))
    .filter((p): p is SpecPoint => Boolean(p));
  const groups: PackGroup[] = [];
  for (const p of points) {
    p.entries.forEach((e, entryIndex) => {
      const key = `${e.unitCode}/${e.topicId}`;
      let g = groups.find((x) => x.key === key);
      if (!g) {
        g = {
          key,
          unitCode: e.unitCode,
          candy: e.candy,
          topicLabel: p.topicLabel,
          topicTitle: p.topicTitle,
          sections: [],
        };
        groups.push(g);
      }
      g.sections.push({ point: p, entryIndex });
    });
  }
  return {
    points,
    groups,
    sectionCount: points.reduce((n, p) => n + p.entries.length, 0),
  };
}

/** pack copy/print text — one plain-text skeleton of a set of picks */
export function packToText(picks: string[]): string {
  const points = picks
    .map((s) => getSpecPoint(s))
    .filter((p): p is SpecPoint => Boolean(p));
  if (points.length === 0) return "IAL CHEM — empty revision pack";
  const lines: string[] = [
    "IAL CHEM — revision pack",
    `${points.length} spec point${points.length === 1 ? "" : "s"} · ${points.reduce((n, p) => n + p.entries.length, 0)} section${points.reduce((n, p) => n + p.entries.length, 0) === 1 ? "" : "s"}`,
  ];
  let lastTopic = "";
  for (const p of points) {
    const topic = `${p.topicLabel} · ${p.topicTitle} (${p.unitCode})`;
    if (topic !== lastTopic) {
      lines.push("", `— ${topic} —`);
      lastTopic = topic;
    }
    lines.push("");
    for (const e of p.entries) {
      lines.push(`[${e.spec}] ${e.title} — ${p.topicLabel}`);
      if (e === p.entries[0]) lines.push(`  ${p.statement}`);
    }
  }
  return lines.join("\n");
}
