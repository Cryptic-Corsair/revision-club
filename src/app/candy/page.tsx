import type { Metadata } from "next";
import CandyApp from "@/components/candy/App";
import "@/components/candy/candy.css";

/* The candy lab front door — IAL CHEM's alternate homepage, the fun one,
   rebuilt from the user's correction: the first alternate (/lumen, the
   night laboratory) read too much like the dark daylight portal, and the
   ask was "fun, playful and engaging, a lot of animations, a mascot —
   keep it fun". So: warm cream grounds, Fredoka/Nunito (the workspace's
   own playful voices), the six registry candy colours worn loud, Bubbles
   the beaker mascot front and centre (blinking, waving, pupil-glide,
   boopable with confetti), a tilted two-way formula marquee, sticker
   cards, a flame stage, three canvas machines (Maxwell–Boltzmann, the
   self-computing titration, dynamic 2NO₂⇌N₂O₄), the wobbly periodic
   snack table, the marching method thread, sticker-sheet counters, and
   the after-hours footer where Bubbles sleeps.

   A leaf like its siblings (/twilight precedent): noindexed,
   self-canonical, not in the sitemap, persists nothing, exits into
   /club through the same ?v= deep links. No fonts of its own — Fredoka,
   Nunito and Plex already ride <html> from the root layout.

   The lag contract (handbook §17, the twilight/lumen extension): every
   canvas is IntersectionObserver-gated with a 30 fps accumulator and a
   1.5 DPR cap; the only CSS loops are compositor transform/opacity
   keyframes, paused unless their section is on screen (.cd-live) and
   frozen outright under prefers-reduced-motion or the club's motion-off
   pref; every entrance settles. */

export const metadata: Metadata = {
  /* absolute — the root layout's title template is for new leaf pages,
     not a front door's brand line. No openGraph here: a child
     openGraph replaces the layout's wholesale (Next merges top-level
     fields only), which would drop og:image/og:type. */
  title: { absolute: "IAL CHEM — the candy lab" },
  description:
    "The fun alternate front door for IAL CHEM: the complete Pearson Edexcel International A Level Chemistry course (WCH11–WCH16) in its candy colours — sticker cards, figures that move, a boopable beaker mascot, and serious notes underneath the silly wrapper. Progress stays in your browser.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/candy" },
};

export default function CandyPage() {
  return <CandyApp />;
}
