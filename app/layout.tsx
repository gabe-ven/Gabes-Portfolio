import { JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
        className={`${jetbrainsMono.variable} font-mono antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
