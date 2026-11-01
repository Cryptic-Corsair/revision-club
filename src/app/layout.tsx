import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, IBM_Plex_Mono } from "next/font/google";
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
  title: "Reaction Club — IAL Chemistry, but make it fun",
  description:
    "Edexcel IAL Chemistry notes (WCH11–WCH16), rebuilt spec by spec: candy-coloured units, sticker progress, worked examples and checkpoint questions. Written to the 2018 specification.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FFF6EA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${plex.variable}`}>
      <body className="min-h-screen bg-cream font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
