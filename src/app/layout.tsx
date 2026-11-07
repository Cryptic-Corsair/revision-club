import type { Metadata, Viewport } from "next";
import Script from "next/script";
/* Fonts are self-hosted (src/app/fonts/, latin woff2, variable where
   available) instead of next/font/google: the Turbopack google-font
   resolver kept corrupting its import map between dev-server restarts
   ("next/font/google queries have exactly one entry") and taking the
   whole workspace preview down with it. Same families, same weights,
   same CSS variables — nothing else in the app had to change. */
import localFont from "next/font/local";
import { DARK_MOOD_COUNT } from "@/lib/spectra/dark-mood";
import "./globals.css";

const fredoka = localFont({
  variable: "--font-fredoka",
  src: "./fonts/fredoka-var.woff2",
  weight: "300 700",
  display: "swap",
});

const baloo = localFont({
  variable: "--font-baloo",
  src: "./fonts/baloo2-var.woff2",
  weight: "400 800",
  display: "swap",
});

const patrick = localFont({
  variable: "--font-patrick",
  src: "./fonts/patrick-hand-400.woff2",
  weight: "400",
  display: "swap",
});

/* no 900 — the heaviest class anywhere is font-extrabold (800) */
const nunito = localFont({
  variable: "--font-nunito",
  src: "./fonts/nunito-var.woff2",
  weight: "400 800",
  display: "swap",
});

const quicksand = localFont({
  variable: "--font-quicksand",
  src: "./fonts/quicksand-var.woff2",
  weight: "300 700",
  display: "swap",
});

const plex = localFont({
  variable: "--font-plex",
  src: [
    { path: "./fonts/plex-500.woff2", weight: "500" },
    { path: "./fonts/plex-600.woff2", weight: "600" },
    { path: "./fonts/plex-700.woff2", weight: "700" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reaction Club — Edexcel IAL Chemistry revision notes",
  description:
    "Revision notes for Edexcel IAL Chemistry (WCH11–WCH16), written to the 2018 specification. Definitions, equations and fully worked examples for every topic, with progress and reading time saved in your browser.",
  icons: { icon: "/favicon.svg" },
};

/* Puts the saved preferences on <html> before the first paint — no
   flash of the wrong lab, font size, scale or family. Only the night
   lab picks tonight's mood (html[data-mood]); dune, sage and classic
   are fixed signatures, so they need no mood.
   A FIRST RUN on a big screen (≥1024px) starts on Large — mirroring
   load() in prefs.ts exactly, or the first paint would re-flow after
   hydration. beforeInteractive keeps it out of React's hydration
   tree. The React side (prefs.ts) re-applies the same values once it
   hydrates, then owns every change. */
const prefsInit = `(function(){try{
var r=document.documentElement,p=null;
try{p=JSON.parse(localStorage.getItem("reaction-club-prefs-v1")||"null")}catch(e){}
if(!p){var t=localStorage.getItem("rc-theme");p={theme:t==="dark"?"dark":"classic"}}
var th=p.theme==="dark"?"dark":p.theme==="dune"?"dune":p.theme==="sage"?"sage":p.theme==="classic"?"classic":"light";
if(th==="dark"){r.classList.add("dark");r.dataset.mood=String(Math.floor(Date.now()/864e5)%${DARK_MOOD_COUNT})}
else if(th==="dune"){r.classList.add("dark","dune")}
else if(th==="sage"){r.classList.add("dark","sage")}
else if(th==="classic"){r.classList.add("classic")}
if(p.headFont)r.dataset.head=String(p.headFont);
if(p.bodyFont)r.dataset.body=String(p.bodyFont);
r.dataset.dots=p.dots===false?"off":"on";
r.dataset.motion=p.motion===false?"off":"on";
var fb="M";try{if(!localStorage.getItem("reaction-club-prefs-v1")&&window.matchMedia("(min-width:1024px)").matches)fb="L"}catch(e){}
var s=p.scale==="S"||p.scale==="M"||p.scale==="L"||p.scale==="XL"?p.scale:(p.zoom===0.9?"S":p.zoom===1.15?"L":p.zoom===1.3?"XL":fb);
r.dataset.scale=s;
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
    { media: "(prefers-color-scheme: dark)", color: "#1E1A26" },
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
