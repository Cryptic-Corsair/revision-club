import type { UnitCode } from "./types";
import { UNITS } from "./units";
import { fmtPlain } from "@/components/club/format";

/* ═══════════════════════════════════════════════════════════════
   REACTION CLUB · deck + search index
   Every checkpoint question becomes a flashcard; every topic
   becomes a search row. Both are derived
   from the same UNITS data — one source of truth, zero drift.
   ═══════════════════════════════════════════════════════════════ */

export interface Card {
  id: string;
  unit: UnitCode;
  unitMain: string;
  topicId: string;
  topicLabel: string;
  topicTitle: string;
  q: string;
  a: string;
}

export const DECK: Card[] = UNITS.flatMap((u) =>
  u.topics.flatMap((t) =>
    t.blocks.flatMap((b, bi) =>
      b.k === "check"
        ? b.qs.map((qa, qi) => ({
            id: `${u.code}/${t.id}#${bi}-${qi}`,
            unit: u.code,
            unitMain: u.candy.main,
            topicId: t.id,
            topicLabel: t.label,
            topicTitle: t.title,
            q: qa.q,
            a: qa.a,
          }))
        : []
    )
  )
);

export const DECK_BY_UNIT: Record<UnitCode, number> = UNITS.reduce(
  (acc, u) => {
    acc[u.code] = DECK.filter((c) => c.unit === u.code).length;
    return acc;
  },
  {} as Record<UnitCode, number>
);

/** Fisher–Yates, seeded by Math.random — a fresh shuffle every round */
export function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ————— search index ————— */

export interface SearchRow {
  unit: UnitCode;
  unitMain: string;
  topicId: string;
  label: string;
  title: string;
  summary: string;
  minutes: number;
  hay: string;
}

export const SEARCH_INDEX: SearchRow[] = UNITS.flatMap((u) =>
  u.topics.map((t) => {
    const title = fmtPlain(t.title);
    const summary = fmtPlain(t.summary);
    return {
      unit: u.code,
      unitMain: u.candy.main,
      topicId: t.id,
      label: t.label,
      title,
      summary,
      minutes: t.minutes,
      hay: `${u.code} ${u.title} ${u.shortTitle} ${t.label} ${title} ${summary}`.toLowerCase(),
    };
  })
);

export function searchTopics(raw: string, limit = 8): SearchRow[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);

  const scored: { row: SearchRow; score: number }[] = [];
  for (const row of SEARCH_INDEX) {
    let score = 0;
    const title = row.title.toLowerCase();

    if (title.startsWith(q)) score += 100;
    else if (title.includes(q)) score += 60;
    if (row.unit.toLowerCase().includes(q)) score += 50;
    if (row.label.toLowerCase().includes(q)) score += 30;

    let allWords = true;
    for (const w of words) {
      if (!row.hay.includes(w)) {
        allWords = false;
        break;
      }
    }
    if (allWords) score += 20;

    if (score > 0) scored.push({ row, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.row.title.length - b.row.title.length)
    .slice(0, limit)
    .map((s) => s.row);
}
