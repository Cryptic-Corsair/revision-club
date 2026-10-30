import type { Metadata } from "next";
import { Caveat, Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Axiom — IAL Chemistry, marked by hand",
  description:
    "A free, exam-obsessed revision-notes library built for one subject: Pearson Edexcel International A Level Chemistry (WCH11–WCH16). Mapped line-by-line to the spec and annotated the way a great tutor marks your paper.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable} ${caveat.variable} antialiased`}
      >
        <div className="margin-line" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
