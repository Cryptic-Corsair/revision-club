import type { UnitCode } from "./types";
import { UNITS } from "./units";
import { fmtPlain } from "@/components/club/format";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · search index
   Every topic becomes a search row, derived from the UNITS data —
   one source of truth, zero drift.
   ═══════════════════════════════════════════════════════════════ */

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
