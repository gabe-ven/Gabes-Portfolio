import { JetBrains_Mono, Press_Start_2P, Space_Grotesk } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Gabriel Venezia - Portfolio",
  description: "Portfolio website of Gabriel Venezia",
  metadataBase: new URL("https://gabrielv.dev"),
  other: {
    "nextjs-portal": "hidden",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${pressStart2P.variable} ${spaceGrotesk.variable} font-mono antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
