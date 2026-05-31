import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets:  ["latin"],
  variable: "--font-space-grotesk",
  display:  "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets:  ["latin"],
  variable: "--font-jetbrains-mono",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "Gabriel Venezia",
  description: "Software Engineer · UC Davis",
  other:       { "nextjs-portal": "hidden" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Always start in light mode */}
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
