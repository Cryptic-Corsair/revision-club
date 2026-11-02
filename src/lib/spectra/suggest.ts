import type { Topic, Unit, UnitCode } from "./types";
import type { TimeData } from "./time";
import { topicSeconds } from "./time";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · today's pick
   One topic, chosen for today: the next un-revised one in course
   order; once everything is marked, the topic with the least
   recorded time gets another pass.
   ═══════════════════════════════════════════════════════════════ */

export interface Suggestion {
  unit: Unit;
  topic: Topic;
  /** unit-pair key, "WCH11/t04" */
  key: string;
  /** short human reason shown under the title */
  reason: string;
}

export function pickSuggestion(units: Unit[], revised: string[], time: TimeData): Suggestion | null {
  const all: { unit: Unit; topic: Topic; key: string }[] = [];
  for (const u of units) for (const t of u.topics) all.push({ unit: u, topic: t, key: `${u.code}/${t.id}` });
  if (all.length === 0) return null;

  const fresh = all.find((c) => !revised.includes(c.key));
  if (fresh)
    return {
      ...fresh,
      reason: `Next up in ${fresh.unit.code} — ${fresh.unit.shortTitle.toLowerCase()}`,
    };

  let least = all[0];
  let leastS = Infinity;
  for (const c of all) {
    const s = topicSeconds(time, c.key);
    if (s < leastS) {
      least = c;
      leastS = s;
    }
  }
  return {
    ...least,
    reason: "Least time here so far — worth another pass",
  };
}

/** unit + topic lookup for a suggestion key */
export function findTopic(units: Unit[], code: UnitCode, topicId: string) {
  const unit = units.find((u) => u.code === code);
  const topic = unit?.topics.find((t) => t.id === topicId);
  return unit && topic ? { unit, topic } : undefined;
}
