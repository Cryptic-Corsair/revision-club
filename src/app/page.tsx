import type { Metadata } from "next";
import PortalApp from "@/components/portal/App";
import "@/components/portal/portal.css";
import "@/components/portal/navbar.css";

/* The portal wears the club's own typeset: the root layout's font
   loaders put --font-display / --font-body / --font-plex on <html>,
   and portal.css re-points the three Tailwind tokens at them, so the
   showcase reads Fredoka + Quicksand + IBM Plex Mono (or whatever the
   customize panel swapped in) exactly like every workspace page. It
   declares no faces of its own. */

/* THE homepage. The showcase landing — ported from the landingiaL-
   clone — was promoted from /portal to the front door, and the
   workspace shell it once handed visitors over to moved to /club
   (see src/app/club/page.tsx). It is its own room — theme tokens
   scoped to .portal-root in portal.css (the club's dune lab is the
   factory dress, the daylight cream lab one toggle away), its own
   Lenis smooth scroll — so nothing here can leak into the workspace
   routes at /club. Unlike the shelved workspace, this page is the
   canonical homepage and is indexed. Old /portal links redirect
   here (next.config.ts). */
export const metadata: Metadata = {
  title: "IAL CHEM — revision notes, written the way they're taught",
  description:
    "Complete class notes for every topic in the Pearson Edexcel International A Level Chemistry spec (WCH11–WCH16) — six units, thirty-three topics, thirty worked examples, and revision packs built from the spec points you tick.",
};

export default function HomePage() {
  return <PortalApp />;
}
