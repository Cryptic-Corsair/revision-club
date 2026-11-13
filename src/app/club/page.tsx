import type { Metadata } from "next";
import ClubApp from "@/components/club/club-app";

/* The shelved workspace. This client-side shell was the site's
   original homepage at /; when the showcase landing was promoted to
   the front door, the whole workspace moved here unchanged — same
   rooms, same desk, same localStorage keys — so bookmarks and
   habits keep working and every room stays reachable. It hands the
   visitor back to the showcase homepage through the footer's
   front-door pill.

   Deliberately kept out of the indexes: / is the canonical homepage
   now, and this route is the quiet back room. Deep links land
   straight in a room via ?v= (see club-app.tsx): ?v=notes&doc=<id>
   [&spec=x.y], ?v=spec, ?v=pack, ?v=WCH11..WCH16, ?v=sticker. */
export const metadata: Metadata = {
  title: "IAL CHEM — the workspace",
  description:
    "The revision workspace: six units, thirty-three topics, the notes reader, the spec index and the pack bench for Edexcel International A Level Chemistry (WCH11–WCH16).",
  robots: { index: false, follow: true },
};

export default function ClubPage() {
  return <ClubApp />;
}
