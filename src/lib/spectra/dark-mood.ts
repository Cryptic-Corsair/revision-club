/* ═══════════════════════════════════════════════════════════════
   Reaction Club · night moods

   The night lab keeps a small wardrobe of four night palettes
   (see html.dark in globals.css — plum night, ink night, aurora,
   ember night) and rotates them "every now and then" so the site
   doesn't wear the same sky every night. The home seams ride the
   same rotation — each mood pairs with its own two seam grounds
   (--home-band-a/b), keyed off the same html[data-mood] attribute;
   the note bands hold one fixed pair and never rotate.

   The pick is deterministic — same mood for the whole day, on
   every tab and reload — so there is no flash of a different
   shade, and mood 0 is the signature look.
   ═══════════════════════════════════════════════════════════════ */

export const DARK_MOOD_COUNT = 4;

/** One night mood per UTC day, cycling 0 → 1 → 2 → 3 → 0 … */
export function pickDarkMood(): number {
  return Math.floor(Date.now() / 86_400_000) % DARK_MOOD_COUNT;
}
