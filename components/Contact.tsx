"use client";

import { motion } from "motion/react";
import { RESUME_URL } from "@/lib/data";
import { Dock, DockIcon } from "@/components/ui/dock";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconFileText } from "@tabler/icons-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between px-6 pt-24 pb-10"
      style={{ background: "var(--color-bg)", transition: "background 0.3s ease" }}
    >
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

      <div>

        <div className="mt-10 flex justify-center">
          <Dock className="border-black/10 dark:border-white/15 bg-[var(--color-surface)] dark:bg-black backdrop-blur-md">
            <DockIcon>
              <a href="https://github.com/gabe-ven" target="_blank" rel="noreferrer" aria-label="GitHub">
                <IconBrandGithub className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors" size={30} />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="https://linkedin.com/in/gabriel-venezia" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IconBrandLinkedin className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors" size={30} />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="mailto:gabrielvenezia6@gmail.com" aria-label="Email">
                <IconMail className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors" size={30} />
              </a>
            </DockIcon>
            <DockIcon>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" aria-label="Resume">
                <IconFileText className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors" size={30} />
              </a>
            </DockIcon>
          </Dock>
        </div>

        <p className="mt-6 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
          © 2026 Gabriel Venezia
        </p>
      </div>
    </section>
  );
}
