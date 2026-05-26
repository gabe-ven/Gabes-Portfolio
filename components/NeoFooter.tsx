const LINKS = [
  { label: "GITHUB",   href: "https://github.com/gabe-ven",                                                           ext: true  },
  { label: "LINKEDIN", href: "https://linkedin.com/in/gabriel-venezia",                                                ext: true  },
  { label: "RESUME",   href: "https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing",  ext: true  },
  { label: "EMAIL",    href: "mailto:gabrielvenezia6@gmail.com",                                                        ext: false },
];

function HatchRule() {
  return (
    <div className="flex items-stretch border-b-2 border-black overflow-hidden">
      <span className="font-mono text-[0.65rem] px-5 sm:px-8 py-2.5 border-r border-black shrink-0 flex items-center text-black/40">
        +
      </span>
      <span
        className="font-mono text-[0.58rem] flex-1 overflow-hidden whitespace-nowrap py-2.5 px-4 leading-none text-black/16 tracking-[0.2em] flex items-center"
        aria-hidden
      >
        {"/ ".repeat(500)}
      </span>
      <span className="font-mono text-[0.65rem] px-5 sm:px-8 py-2.5 border-l border-black shrink-0 flex items-center text-black/40">
        +
      </span>
    </div>
  );
}

export default function NeoFooter() {
  return (
    <footer>
      <HatchRule />

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">

        {/* Identity block */}
        <div className="px-6 sm:px-10 py-10">
          <p
            className="font-black text-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Gabriel Lin Venezia.
          </p>
          <p className="font-mono text-[0.52rem] tracking-widest mt-2.5 text-black/34">
            // COMPUTER SCIENCE & FRONTEND ENGINEERING
          </p>
          <p className="font-mono text-[0.48rem] tracking-widest mt-1 text-black/20">
            UC DAVIS · 2026 · REV.01
          </p>

          <div className="mt-6 border border-black/13 px-3 py-2 inline-block">
            <p className="font-mono text-[0.44rem] tracking-widest text-black/20">38.5382° N · 121.7617° W</p>
            <p className="font-mono text-[0.44rem] tracking-widest text-black/16 mt-0.5">DAVIS, CALIFORNIA</p>
          </div>
        </div>

        {/* Links */}
        <div className="px-6 sm:px-10 py-10 flex flex-col justify-between">
          <p className="font-mono text-[0.5rem] tracking-widest text-black/28">// LINKS</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-0">
            {LINKS.map(({ label, href, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noreferrer" : undefined}
                className="font-mono text-[0.6rem] tracking-widest py-2.5 border-b border-black/10
                           flex items-center justify-between gap-2 group
                           hover:bg-[#fee21e] hover:border-black hover:px-2
                           transition-[padding,background-color,border-color] duration-75"
              >
                <span>{label}</span>
                <span className="opacity-35 group-hover:opacity-100">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t-2 border-black grid grid-cols-3 divide-x divide-black">
        <div className="px-5 sm:px-8 py-2.5 flex items-center">
          <span className="font-mono text-[0.46rem] tracking-widest text-black/22">
            © 2026 GABRIEL VENEZIA
          </span>
        </div>
        <div className="px-5 sm:px-8 py-2.5 flex items-center justify-center">
          <span className="font-mono text-[0.46rem] tracking-widest text-black/18">
            gabriel-venezia.com
          </span>
        </div>
        <div className="px-5 sm:px-8 py-2.5 flex items-center justify-end">
          <span className="font-mono text-[0.46rem] tracking-widest text-black/18">V2.0.0 // DEPLOYED</span>
        </div>
      </div>
    </footer>
  );
}
