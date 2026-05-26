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
        {/* Apply saved theme before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
