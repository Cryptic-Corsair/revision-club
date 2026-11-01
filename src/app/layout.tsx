import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fredoka, Nunito, IBM_Plex_Mono } from "next/font/google";
import { DARK_MOOD_COUNT } from "@/lib/spectra/dark-mood";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Reaction Club — Edexcel IAL Chemistry revision notes",
  description:
    "Revision notes for Edexcel IAL Chemistry (WCH11–WCH16), written to the 2018 specification. Definitions, equations, worked examples and checkpoint questions for every topic, with progress saved in your browser.",
  icons: { icon: "/favicon.svg" },
};

/* Sets the saved mood (or none) before first paint — no flash of the wrong lab.
   The dark lab also picks today's roast (html.dark[data-mood]) so the darker
   shade set is on before the first pixel. beforeInteractive keeps it out of
   React's hydration tree. */
const themeInit = `(function(){try{if(localStorage.getItem("rc-theme")==="dark"){var r=document.documentElement;r.classList.add("dark");r.dataset.mood=String(Math.floor(Date.now()/864e5)%${DARK_MOOD_COUNT})}}catch(e){}})();`;

export const viewport: Viewport = {
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
    <html lang="en" suppressHydrationWarning className={`${fredoka.variable} ${nunito.variable} ${plex.variable}`}>
      <body className="min-h-screen bg-cream font-body text-ink antialiased">
        <Script id="rc-theme" strategy="beforeInteractive">{themeInit}</Script>
        {children}
      </body>
    </html>
  );
}
