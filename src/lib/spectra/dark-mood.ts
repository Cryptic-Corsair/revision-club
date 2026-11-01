/* ═══════════════════════════════════════════════════════════════
   Reaction Club · dark-lab roasts

   The after-dark lab keeps a small wardrobe of darker shade sets
   (see html.dark in globals.css) and rotates them "every now and
   then" so the site doesn't wear the same brown every day.

   The pick is deterministic — same roast for the whole day, on
   every tab and reload — so there is no flash of a different
   shade, and mood 0 is the reference look from the design shot.
   ═══════════════════════════════════════════════════════════════ */

export const DARK_MOOD_COUNT = 4;

/** One roast per UTC day, cycling 0 → 1 → 2 → 3 → 0 … */
export function pickDarkMood(): number {
  return Math.floor(Date.now() / 86_400_000) % DARK_MOOD_COUNT;
}
