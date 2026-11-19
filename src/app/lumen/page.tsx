import type { Metadata } from "next";
import LumenApp from "@/components/lumen/App";
import "@/components/lumen/lumen.css";

/* The lumen front door — IAL CHEM's second alternate homepage (/twilight
   is the first): the luminous laboratory, a night bench of glassware on
   deep aubergine where the whole course glows. One long page: the living
   flask, the two-way formula marquee, the shelf of six units, the flame
   bench, three canvas machines (Maxwell–Boltzmann breathing, a titration
   drawing its own curve, dynamic equilibrium finding its balance), the
   scroll-drawn bench protocol, the instrument readout, a fully worked
   question, the anatomy of a note, the five labs and two dresses, and
   the after-hours footer.

   A leaf like its siblings: noindexed, self-canonical, not in the
   sitemap, persists nothing, and hands visitors into the workspace at
   /club through the same ?v= deep links. No fonts of its own — the
   house voices (Fraunces / Figtree / Plex) already ride <html> from
   the root layout, so this door only re-points them.

   The lag contract (handbook §17 discipline): every canvas is
   IntersectionObserver-gated with a 30 fps accumulator and a 1.5 DPR
   cap; the only CSS loops are compositor-safe transform/opacity
   keyframes, paused unless their section is on screen (.lum-live) and
   frozen under prefers-reduced-motion or the club's motion-off pref;
   every entrance settles. */

export const metadata: Metadata = {
  /* absolute — the root layout's title template is for new leaf pages,
     not a front door's brand line. No openGraph here: a child
     openGraph replaces the layout's wholesale (Next merges top-level
     fields only), which would drop og:image/og:type. */
  title: { absolute: "IAL CHEM — the luminous laboratory" },
  description:
    "An alternate front door for IAL CHEM: the complete Pearson Edexcel International A Level Chemistry course (WCH11–WCH16) retold as a night laboratory — 33 topics of specification-keyed notes, figures that move, and a bench that never stops reacting. Progress stays in your browser.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/lumen" },
};

export default function LumenPage() {
  return <LumenApp />;
}
