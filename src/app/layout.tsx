import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Baloo_2, Fredoka, Nunito, Patrick_Hand, Quicksand, IBM_Plex_Mono } from "next/font/google";
import { DARK_MOOD_COUNT } from "@/lib/spectra/dark-mood";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const patrick = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Reaction Club — Edexcel IAL Chemistry revision notes",
  description:
    "Revision notes for Edexcel IAL Chemistry (WCH11–WCH16), written to the 2018 specification. Definitions, equations, worked examples and checkpoint questions for every topic, with progress and reading time saved in your browser.",
  icons: { icon: "/favicon.svg" },
};

/* Puts the saved preferences on <html> before the first paint — no
   flash of the wrong lab, font size or family. The dark lab also
   picks today's roast (html[data-mood]). beforeInteractive keeps it
   out of React's hydration tree. The React side (prefs.ts) re-applies
   the same values once it hydrates, then owns every change. */
const prefsInit = `(function(){try{
var r=document.documentElement,p=null;
try{p=JSON.parse(localStorage.getItem("reaction-club-prefs-v1")||"null")}catch(e){}
if(!p){var t=localStorage.getItem("rc-theme");p={theme:t==="dark"?"dark":"light"}}
var th=p.theme==="dark"?"dark":"light";
if(th!=="light"){r.classList.add(th);r.dataset.mood=String(Math.floor(Date.now()/864e5)%${DARK_MOOD_COUNT})}
if(p.headFont)r.dataset.head=String(p.headFont);
if(p.bodyFont)r.dataset.body=String(p.bodyFont);
r.dataset.dots=p.dots===false?"off":"on";
r.dataset.motion=p.motion===false?"off":"on";
var z=[0.9,1,1.15,1.3].indexOf(Number(p.zoom))>=0?Number(p.zoom):1;
r.style.zoom=String(z);
}catch(e){}})();`;

export const viewport: Viewport = {
  /* viewport-fit=cover + the --sa-* vars in globals.css let fixed chrome
     (pill nav, toast, drawers, footer) respect the notch and the home
     indicator instead of being buried under them; interactiveWidget
     keeps the search field visible above the on-screen keyboard. */
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF6EA" },
    { media: "(prefers-color-scheme: dark)", color: "#201810" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fredoka.variable} ${baloo.variable} ${patrick.variable} ${nunito.variable} ${quicksand.variable} ${plex.variable}`}
    >
      <body className="min-h-screen bg-cream font-body text-ink antialiased">
        <Script id="rc-prefs" strategy="beforeInteractive">{prefsInit}</Script>
        {children}
      </body>
    </html>
  );
}
