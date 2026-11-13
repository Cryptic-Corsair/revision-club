import type { Metadata } from "next";
import localFont from "next/font/local";
import PortalApp from "@/components/portal/App";
import "./portal.css";

/* ————— the portal's own typeset, self-hosted like the rest of the app —————
   next/font/google is broken under Turbopack in this workspace (see the
   note in src/app/layout.tsx), so the three families the showcase landing
   was designed with arrive as local woff2 files: Plus Jakarta Sans (body),
   Instrument Serif (the italic display voice) and JetBrains Mono (the
   labelling voice). */
const jakarta = localFont({
  variable: "--font-pjs",
  src: "../fonts/portal-pjs-var.woff2",
  weight: "200 800",
  display: "swap",
});

const instrument = localFont({
  variable: "--font-instrument",
  src: [
    { path: "../fonts/portal-instrument-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/portal-instrument-italic-400.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const jbmono = localFont({
  variable: "--font-jbmono",
  src: "../fonts/portal-jbmono-var.woff2",
  weight: "100 800",
  display: "swap",
  preload: false,
});

/* The alternative front door: a showcase landing that sells the workspace
   before it hands the visitor over. It is its own product — own theme
   tokens (scoped to .portal-root in portal.css), own typeset, own Lenis
   smooth scroll — so nothing here can leak into the workspace routes.
   Deliberately kept out of the indexes: the workspace home at / is the
   canonical homepage. */
export const metadata: Metadata = {
  title: "IAL CHEM — revision notes, built like software",
  description:
    "Six units. Thirty-three topics. Custom revision packs for Edexcel International A Level Chemistry (WCH11–WCH16), engineered for uninterrupted focus.",
  robots: { index: false, follow: true },
};

export default function PortalPage() {
  return (
    <div className={`${jakarta.variable} ${instrument.variable} ${jbmono.variable}`}>
      <PortalApp />
    </div>
  );
}
