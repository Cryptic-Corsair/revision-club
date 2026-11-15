import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
/* Fonts are self-hosted (src/app/fonts/, latin woff2, variable where
   available) instead of next/font/google: the Turbopack google-font
   resolver kept corrupting its import map between dev-server restarts
   ("next/font/google queries have exactly one entry") and taking the
   whole workspace preview down with it. Same families, same weights,
   same CSS variables — nothing else in the app had to change. */
import localFont from "next/font/local";
import { DARK_MOOD_COUNT } from "@/lib/spectra/dark-mood";
import "./globals.css";

/* ————— preload strategy —————
   next/font preloads every family by default, which used to put all
   192 KB of woff2 on the critical path — including the three swap
   families the factory theme never renders (Baloo 2, Patrick Hand
   and Nunito are only downloaded once the customize panel re-points
   --font-display / --font-body) and the mono trio, whose first use
   sits in lazily-loaded rooms (spec map, worked plates). The first
   paint now belongs to the portal's house voices — Fraunces (display)
   + Figtree (body) — which keep their preload head start; Fredoka and
   Quicksand are the workspace reader's pair and load on first use,
   alongside the rest of the swap shelf. */
const fraunces = localFont({
  variable: "--font-fraunces",
  src: "./fonts/fraunces-var.woff2",
  weight: "300 700",
  display: "swap",
});

const figtree = localFont({
  variable: "--font-figtree",
  src: "./fonts/figtree-var.woff2",
  weight: "300 800",
  display: "swap",
});

const fredoka = localFont({
  variable: "--font-fredoka",
  src: "./fonts/fredoka-var.woff2",
  weight: "300 700",
  display: "swap",
  preload: false,
});

const baloo = localFont({
  variable: "--font-baloo",
  src: "./fonts/baloo2-var.woff2",
  weight: "400 800",
  display: "swap",
  preload: false,
});

const patrick = localFont({
  variable: "--font-patrick",
  src: "./fonts/patrick-hand-400.woff2",
  weight: "400",
  display: "swap",
  preload: false,
});

/* no 900 — the heaviest class anywhere is font-extrabold (800) */
const nunito = localFont({
  variable: "--font-nunito",
  src: "./fonts/nunito-var.woff2",
  weight: "400 800",
  display: "swap",
  preload: false,
});

const quicksand = localFont({
  variable: "--font-quicksand",
  src: "./fonts/quicksand-var.woff2",
  weight: "300 700",
  display: "swap",
  preload: false,
});
const plex = localFont({
  variable: "--font-plex",
  src: [
    { path: "./fonts/plex-500.woff2", weight: "500" },
    { path: "./fonts/plex-600.woff2", weight: "600" },
    { path: "./fonts/plex-700.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "IAL CHEM — Edexcel IAL Chemistry revision notes",
  description:
    "IAL CHEM provides revision notes for Edexcel IAL Chemistry (WCH11–WCH16), written to the 2018 specification. Definitions, equations and fully worked examples for every topic, with progress and reading time saved in your browser.",
  icons: { icon: "/favicon.svg" },
};

/* Puts the saved preferences on <html> before the first paint — no
   flash of the wrong lab, font size, scale or family. The factory
   lab is classic (espresso & parchment) — the Cards reader's house
   lab, so a saved Document (editorial) visitor who last stood in
   classic first-paints Light here, the same display coercion
   effectiveLab() applies in prefs.ts; the two must agree or the
   first paint re-flows after hydration. The SAVE keeps classic —
   this is display-only, so switching back to Cards restores it.
   Only the night lab wears its CACHED mood (html[data-mood]): the
   palette stamped at the visitor's last Night pick, falling back
   to today's rotation pick for saves that predate the field —
   exactly what applyPrefs() paints. Dune and classic are fixed
   signatures, so they need no mood.
   A FIRST RUN starts on the screen-aware factory rung — Medium on
   phones, Large on small tablets (≥640px), XL on tablets (≥768px)
   and every laptop/desktop — mirroring load() in prefs.ts exactly
   (same innerWidth boundaries), or the first paint would re-flow
   after hydration. A saved rung always wins.
   beforeInteractive keeps it out of React's hydration
   tree. The React side (prefs.ts) re-applies the same values once it
   hydrates, then owns every change. */
const prefsInit = `(function(){try{
var r=document.documentElement,p=null;
try{p=JSON.parse(localStorage.getItem("reaction-club-prefs-v1")||"null")}catch(e){}
if(!p){var t=localStorage.getItem("rc-theme");p={theme:t==="dark"?"dark":"classic"}}
var th=p.theme==="light"?"light":p.theme==="dark"?"dark":p.theme==="dune"?"dune":"classic";
/* classic is the Cards reader's house lab — a saved Document visitor
   DISPLAYS as Light (mirrors effectiveLab() in prefs.ts); the save
   keeps classic so the Cards reader puts it straight back */
if(p.iface==="editorial"&&th==="classic")th="light";
if(th==="dark"){r.classList.add("dark");var C=${DARK_MOOD_COUNT};var dm=(typeof p.mood==="number"&&isFinite(p.mood))?((Math.floor(p.mood)%C)+C)%C:(Math.floor(Date.now()/864e5)%C);r.dataset.mood=String(dm)}
else if(th==="dune"){r.classList.add("dark","dune")}
else if(th==="classic"){r.classList.add("classic")}
if(p.headFont)r.dataset.head=String(p.headFont);
if(p.bodyFont)r.dataset.body=String(p.bodyFont);
r.dataset.dots=p.dots===false?"off":"on";
r.dataset.motion=p.motion===false?"off":"on";
/* the screen-aware factory rung — mirrors load()'s first-run branch
   in prefs.ts boundary for boundary (≥640 L, ≥768 XL, else M) */
var fb="M";try{var w=window.innerWidth||document.documentElement.clientWidth;if(w>=768)fb="XL";else if(w>=640)fb="L"}catch(e){}
var s=p.scale==="S"||p.scale==="M"||p.scale==="L"||p.scale==="XL"?p.scale:(p.zoom===0.9?"S":p.zoom===1.15?"L":p.zoom===1.3?"XL":fb);
/* the advanced type roles — canonical absolute factors, mirrored from
   sanitize() in prefs.ts clamp for clamp (roles .8-1.6, junk or
   absent → the rung's own factor for v3 saves, 1→rung for legacy)
   and migration for migration: v3 saves carry the factors as-is;
   older saves marked untuned roles with 1 meaning "ride the rung",
   so those take the rung's factor; a save with no type field rides
   entirely. The vector is then matched against the preset vectors
   (S .9 / M 1 / L 1.2 / XL 1.5) — an exact match relights that
   rung's dataset.scale, so the first paint and hydration agree.
   --preset-k carries the rung's factor for the CSS ratios. */
var KV={S:.9,M:1,L:1.2,XL:1.5};
var k=KV[s];
var tp=p.type&&typeof p.type==="object"?p.type:null;
var rc=function(v,lo,hi,d){return typeof v==="number"&&isFinite(v)?Math.min(hi,Math.max(lo,v)):d};
var fbv=p.v===3?k:1;
var tf=tp?{h:rc(tp.headings,.8,1.6,fbv),s:rc(tp.sub,.8,1.6,fbv),b:rc(tp.body,.8,1.6,fbv),o:rc(tp.other,.8,1.6,fbv),w:rc(tp.width,.8,1.6,fbv)}:{h:k,s:k,b:k,o:k,w:k};
if(tp&&p.v!==3){if(Math.abs(tf.h-1)<=.005)tf.h=k;if(Math.abs(tf.s-1)<=.005)tf.s=k;if(Math.abs(tf.b-1)<=.005)tf.b=k;if(Math.abs(tf.o-1)<=.005)tf.o=k;if(Math.abs(tf.w-1)<=.005)tf.w=k}
var MS=["S","M","L","XL"];
for(var mi=0;mi<4;mi++){var mv=KV[MS[mi]];if(Math.abs(tf.h-mv)<=.005&&Math.abs(tf.s-mv)<=.005&&Math.abs(tf.b-mv)<=.005&&Math.abs(tf.o-mv)<=.005&&Math.abs(tf.w-mv)<=.005){s=MS[mi];k=mv;break}}
r.dataset.scale=s;
var rs=document.documentElement.style;
rs.setProperty("--type-heading",String(tf.h));
rs.setProperty("--type-sub",String(tf.s));
rs.setProperty("--type-body",String(tf.b));
rs.setProperty("--type-other",String(tf.o));
rs.setProperty("--type-width",String(tf.w));
rs.setProperty("--preset-k",String(k));
/* the interface axis: editorial | gallery. The retired "rooms" dress
   (and any unrecognisable value) reads as the gallery — the site's
   front door — so even a legacy save first-paints in the right dress
   and never re-flows after hydration. */
if(p.iface==="editorial"||p.iface==="gallery")r.dataset.iface=p.iface;
else r.dataset.iface="gallery";
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
      className={`${fraunces.variable} ${figtree.variable} ${fredoka.variable} ${baloo.variable} ${patrick.variable} ${nunito.variable} ${quicksand.variable} ${plex.variable}`}
    >
      <body className="min-h-screen bg-cream font-body text-ink antialiased">
        <Script id="rc-prefs" strategy="beforeInteractive">{prefsInit}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
