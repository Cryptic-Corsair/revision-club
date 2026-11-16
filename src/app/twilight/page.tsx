import type { Metadata } from "next";
import localFont from "next/font/local";
import TwilightApp from "@/components/twilight/App";
import "@/components/twilight/twilight.css";

/* The twilight front door — an ALTERNATE landing page for IAL CHEM,
   rebuilt faithfully on the water reference (water-shafer.vercel.app):
   one continuous caustic water field, the monsoon rain, the pond
   sculpture, the refracted reading frame, two-tone serif quotes, the
   collections carousel, the spec marquee and the drawn chronology
   thread. A sibling of the daylight showcase at /, not a replacement:
   its own leaf, theme tokens scoped under .twilight-root, persists
   nothing, and hands visitors into the workspace at /club through the
   same ?v= deep links.

   The reference's typeset is self-hosted here (latin variable woff2,
   ~97 KB total, preload:false — the critical path still belongs to
   the daylight front door's Fraunces/Figtree):
   Cormorant (the display serif), Plus Jakarta Sans (body), Syne
   (small-headings voice). Fonts stay out of Google's CDN per §6. */

const cormorant = localFont({
  variable: "--font-cormorant",
  src: "../fonts/cormorant-var.woff2",
  weight: "300 700",
  display: "swap",
  preload: false,
});

const syne = localFont({
  variable: "--font-syne",
  src: "../fonts/syne-var.woff2",
  weight: "400 800",
  display: "swap",
  preload: false,
});

const jakarta = localFont({
  variable: "--font-jakarta",
  src: "../fonts/plus-jakarta-sans-var.woff2",
  weight: "200 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  /* absolute — the root layout's title template is for new leaf
     pages, not a front door's brand line. No openGraph here: a child
     openGraph replaces the layout's wholesale (Next merges top-level
     fields only), which would drop og:image/og:type. */
  title: { absolute: "IAL CHEM — the twilight showcase" },
  description:
    "An alternate front door for IAL CHEM: revision notes for every topic in the Pearson Edexcel International A Level Chemistry spec (WCH11–WCH16), written over living water. Progress and reading time stay in your browser.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/twilight" },
};

export default function TwilightPage() {
  return (
    <div
      className={`${cormorant.variable} ${syne.variable} ${jakarta.variable}`}
    >
      <TwilightApp />
    </div>
  );
}
