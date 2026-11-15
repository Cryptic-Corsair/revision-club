import type { Metadata } from "next";
import ClubApp from "@/components/club/club-app";

/* The shelved workspace — an OPTIONAL catch-all: /club and every
   /club/… path serve this one client-side shell. The component owns
   the address bar (see club-app.tsx's URL↔room bridge): the room
   writes its path (/club/notes/wch11-t02/2.3, /club/spec,
   /club/wch12 …) and a path or legacy ?v= deep link lands in its
   room, so every room has an accurate, shareable, back-button
   friendly URL. Same rooms, same desk, same localStorage keys. It
   hands the visitor back to the showcase homepage through the
   footer's front-door pill.

   Deliberately kept out of the indexes for ALL path variants: / is
   the canonical homepage now, and this route's rooms render
   client-side from localStorage — the meta noindex below covers
   every /club/… address. Deep links still land straight in a room. */
export const metadata: Metadata = {
  /* absolute — the root layout's title template is for new leaf
     pages, not the workspace's own brand line */
  title: { absolute: "IAL CHEM — the workspace" },
  description:
    "The revision workspace: six units, thirty-three topics, the notes reader, the spec index and the pack bench for Edexcel International A Level Chemistry (WCH11–WCH16).",
  robots: { index: false, follow: true },
  /* a noindexed page still owes the crawlers a self-canonical —
     inheriting the layout's canonical ("/") would point the
     workspace at the homepage */
  alternates: { canonical: "/club" },
};

export default function ClubPage() {
  return <ClubApp />;
}
