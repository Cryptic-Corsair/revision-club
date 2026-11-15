/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · night moods

   The night lab keeps a small wardrobe of four night palettes
   (see html.dark in globals.css — plum night, ink night, aurora,
   ember night) and the home seams ride the same rotation — each
   mood pairs with its own two seam grounds (--home-band-a/b),
   keyed off the same html[data-mood] attribute; the note bands
   hold one fixed pair and never rotate.

   The rotation is CACHED, not calendared: the mood a visitor sees
   is stamped into their save (prefs.mood) when they pick Night,
   and it keeps rendering until they change the theme again — a
   re-selection of Night stamps a fresh pick. pickDarkMood() is
   the stamp's INK — the fallback for saves that predate the field
   and the value written on an explicit pick — so a brand-new
   visitor still lands on the day's look and nothing ever changes
   behind their back. Same mood on every tab and reload, so there
   is no flash of a different shade, and mood 0 is the signature
   look.
   ═══════════════════════════════════════════════════════════════ */

export const DARK_MOOD_COUNT = 4;

/** The stamp's ink — today's wardrobe index, cycling 0 → 1 → 2 →
    3 → 0 … Used only when a mood is not already cached: first
    contact with the night lab, and older saves on their one-time
    migration stamp. */
export function pickDarkMood(): number {
  return Math.floor(Date.now() / 86_400_000) % DARK_MOOD_COUNT;
}
