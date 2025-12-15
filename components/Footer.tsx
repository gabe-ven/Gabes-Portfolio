"use client";

import * as Fa from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <div className="text-lg font-bold">GABRIEL VENEZIA</div>
          <a
            href="mailto:gabrielvenezia6@gmail.com"
            className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
          >
            gabrielvenezia6@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gabe-ven"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-orange-500 hover:bg-orange-500/10 transition-all"
          >
            <Fa.FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-venezia/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-orange-500 hover:bg-orange-500/10 transition-all"
          >
            <Fa.FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}



