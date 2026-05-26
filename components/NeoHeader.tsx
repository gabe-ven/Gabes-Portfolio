"use client";

import { useState, useEffect } from "react";

const NAV = [
  { label: "GITHUB",   href: "https://github.com/gabe-ven",                                                           ext: true  },
  { label: "LINKEDIN", href: "https://linkedin.com/in/gabriel-venezia",                                                ext: true  },
  { label: "RESUME",   href: "https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing",  ext: true  },
  { label: "EMAIL",    href: "mailto:gabrielvenezia6@gmail.com",                                                        ext: false },
];

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

export default function NeoHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F5F3] border-b-2 border-black">

      {/* Micro status strip */}
      <div className="flex items-center gap-4 px-6 sm:px-10 py-1 border-b border-black text-[0.5rem] font-mono tracking-widest">
        <span className="text-black/30 shrink-0">// CS + FRONTEND · UC DAVIS</span>
        <div className="flex-1 border-t border-black/10" />
        <span className="text-black/22 shrink-0 hidden sm:block"><LiveClock /></span>
      </div>

      {/* Main nav row */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-3 gap-6">

        {/* Logo mark */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold select-none group"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="flex gap-[3px] items-end">
            <span className="inline-block w-2.5 h-2.5 bg-black group-hover:bg-[#fee21e] transition-colors duration-75" />
            <span className="inline-block w-2.5 h-2.5 bg-black group-hover:bg-[#ff2d87] transition-colors duration-75" />
          </span>
          <span className="text-[0.82rem] tracking-tight">GV</span>
          <span className="font-mono text-[0.48rem] text-black/28 tracking-widest">// L</span>
        </a>

        {/* Pipe-separated nav links */}
        <div className="hidden md:flex items-center">
          {NAV.map(({ label, href, ext }, i) => (
            <span key={label} className="flex items-center">
              {i > 0 && (
                <span className="font-mono text-[0.56rem] text-black/22 px-1" aria-hidden>|</span>
              )}
              <a
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noreferrer" : undefined}
                className="px-2.5 py-1.5 font-mono text-[0.54rem] tracking-widest
                           hover:bg-[#fee21e] hover:text-black transition-colors duration-75"
              >
                {label}
              </a>
            </span>
          ))}
        </div>

        {/* CTA — black fill, hot-pink burst on hover */}
        <a
          href="mailto:gabrielvenezia6@gmail.com"
          className="border-2 border-black px-4 py-2 font-mono text-[0.54rem] tracking-widest font-bold
                     bg-black text-[#F5F5F3]
                     hover:bg-[#ff2d87] hover:border-[#ff2d87] hover:text-white
                     transition-colors duration-75 shrink-0"
        >
          HIRE ME →
        </a>
      </nav>
    </header>
  );
}
