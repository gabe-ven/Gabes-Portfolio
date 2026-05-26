"use client";

import { motion } from "motion/react";
import { RESUME_URL } from "@/lib/data";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconFileText, IconArrowUpRight } from "@tabler/icons-react";

const LINKS = [
  { label: "GitHub",   href: "https://github.com/gabe-ven",            icon: IconBrandGithub,   external: true  },
  { label: "LinkedIn", href: "https://linkedin.com/in/gabriel-venezia", icon: IconBrandLinkedin, external: true  },
  { label: "Resume",   href: RESUME_URL,                                icon: IconFileText,      external: true  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col px-6 sm:px-14 lg:px-20 pt-24 pb-12"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Heading */}
      <motion.p
        className="font-bold leading-[1.05]"
        style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", color: "var(--color-text)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        and I&apos;d love to{" "}
        <em className="not-italic" style={{ color: "#e07b54" }}>connect.</em>
      </motion.p>

      {/* Email CTA — fills the empty middle */}
      <motion.div
        className="flex-1 flex flex-col justify-center gap-6 py-20"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="max-w-md leading-relaxed"
          style={{ color: "var(--color-text-muted)", fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
        >
          Whether it&apos;s about a role, a project, or just to say hi — my inbox
          is always open.
        </p>

        <a
          href="mailto:gabrielvenezia6@gmail.com"
          className="group inline-flex items-end gap-3 w-fit"
          style={{ color: "var(--color-text)" }}
        >
          <span
            className="font-semibold border-b-2 border-current pb-0.5 group-hover:opacity-60 transition-opacity duration-200"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.6rem)" }}
          >
            gabrielvenezia6@gmail.com
          </span>
          <IconMail size={28} className="mb-1 opacity-40 group-hover:opacity-60 transition-opacity duration-200" />
        </a>
      </motion.div>

      {/* Bottom row — text links + copyright */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Text links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200 hover:opacity-60"
              style={{ color: "var(--color-text)" }}
            >
              <Icon size={15} className="opacity-50" />
              {label}
              <IconArrowUpRight size={11} className="opacity-30 group-hover:opacity-60 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs font-mono shrink-0" style={{ color: "var(--color-text-muted)" }}>
          © 2026 Gabriel Venezia
        </p>
      </motion.div>
    </section>
  );
}
