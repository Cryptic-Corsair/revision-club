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
  title: "Reaction Club — Edexcel IAL Chemistry revision notes",
  description:
    "Revision notes for Edexcel IAL Chemistry (WCH11–WCH16), written to the 2018 specification. Definitions, equations, worked examples and checkpoint questions for every topic, with progress saved in your browser.",
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
