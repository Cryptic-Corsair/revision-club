import type { Metadata } from "next";
import PortalApp from "@/components/portal/App";
import "./portal.css";

/* The portal wears the club's own typeset: the root layout's font
   loaders put --font-display / --font-body / --font-plex on <html>,
   and portal.css re-points the three Tailwind tokens at them, so the
   showcase reads Fredoka + Quicksand + IBM Plex Mono (or whatever the
   customize panel swapped in) exactly like every workspace page. It
   declares no faces of its own. */

/* The alternative front door: a showcase landing that sells the workspace
   before it hands the visitor over. It is its own room — theme tokens
   scoped to .portal-root in portal.css (the club's dune lab is the
   factory dress, the daylight cream lab one toggle away), the club's
   wave seam walk between sections, its own Lenis smooth scroll — so
   nothing here can leak into the workspace routes. Deliberately kept out
   of the indexes: the workspace home at / is the canonical homepage. */
export const metadata: Metadata = {
  title: "IAL CHEM — revision notes, built like software",
  description:
    "Six units. Thirty-three topics. Custom revision packs for Edexcel International A Level Chemistry (WCH11–WCH16), engineered for uninterrupted focus.",
  robots: { index: false, follow: true },
};

export default function PortalPage() {
  return <PortalApp />;
}
