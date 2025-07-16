import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <div className="fixed inset-0 w-full h-full z-10">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover object-center"
          >
            <source src="/bgvid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 backdrop-blur-md"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
