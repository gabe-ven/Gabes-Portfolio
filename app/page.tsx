"use client";

import { useState, FormEvent, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import projectsData from "./data/projects.json";
import skillsData from "./data/skills.json";
import emailjs from "@emailjs/browser";
import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";

export default function Home() {
  const { projects } = projectsData;
  const { scrollYProgress } = useScroll();
  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    emailjs.init("fjqder08InzeaGQJR");
  }, []);

  // Prevent body scroll when modal is open (but not menu)
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      to_name: "Gabriel Venezia",
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    };

    try {
      const response = await emailjs.send(
        "service_xbfyqa9",
        "template_cd7g6wl",
        templateParams,
        "fjqder08InzeaGQJR"
      );

      if (response.status === 200) {
        setFormData({ name: "", email: "", message: "" });
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error: unknown) {
      console.error("Error details:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getIcon = (iconName: string) => {
    const iconComponents: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = { ...Si, ...Fa };
    const Icon = iconComponents[iconName];
    return Icon ? <Icon className="w-full h-full" /> : null;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 z-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Custom Scroll Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
        <div className="relative w-1 h-40 bg-white/20 rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-orange-500 rounded-full"
            style={{
              height: scrollHeight,
            }}
          />
        </div>
      </div>

      {/* Hamburger Menu Button */}
      <motion.div
        className="fixed top-6 right-6 z-[60] w-12 h-12 flex flex-col items-center justify-center gap-2 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="w-6 h-0.5 rounded-full"
          animate={{
            rotate: isMenuOpen ? 45 : 0,
            y: isMenuOpen ? 5 : 0,
            backgroundColor: isMenuOpen ? "#ffffff" : "#ffffff",
          }}
          variants={{
            hover: { x: isMenuOpen ? 0 : 3 },
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 rounded-full"
          animate={{
            rotate: isMenuOpen ? -45 : 0,
            y: isMenuOpen ? -5 : 0,
            backgroundColor: isMenuOpen ? "#ffffff" : "#ffffff",
          }}
          variants={{
            hover: { x: isMenuOpen ? 0 : -3 },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Side Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dimmed overlay - clickable to close menu */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-md h-full bg-orange-500 p-12 overflow-y-auto z-50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col h-full">
                {/* Social Section */}
                <div className="mb-16">
                  <h3 className="text-white/60 uppercase tracking-wider text-sm mb-6">
                    Social
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="https://github.com/gabe-ven"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white text-xl hover:translate-x-2 transition-transform"
                    >
                      Github
                    </a>
                    <a
                      href="https://www.linkedin.com/in/gabriel-venezia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white text-xl hover:translate-x-2 transition-transform"
                    >
                      Linkedin
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white text-xl hover:translate-x-2 transition-transform"
                    >
                      RESUME
                    </a>
                  </div>
                </div>

                {/* Menu Section */}
                <div className="mb-auto">
                  <h3 className="text-white/60 uppercase tracking-wider text-sm mb-6">
                    Menu
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "Home", id: "hero", color: "bg-yellow-400" },
                      { name: "About Me", id: "about", color: "bg-blue-500" },
                      {
                        name: "Experience",
                        id: "experience",
                        color: "bg-cyan-400",
                      },
                      {
                        name: "Projects",
                        id: "projects",
                        color: "bg-blue-600",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 text-white text-xl hover:translate-x-2 transition-transform w-full text-left"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${item.color}`}
                        />
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="mt-16">
                  <h3 className="text-white/60 uppercase tracking-wider text-sm mb-4">
                    Get in Touch
                  </h3>
                  <a
                    href="mailto:gabrielvenezia6@gmail.com"
                    className="text-white text-lg hover:underline"
                  >
                    gabrielvenezia6@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-orange-500">SOFTWARE</span>
                <br />
                DEVELOPER
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Hi! I'm Gabriel. I'm a{" "}
                <span className="text-orange-500 font-semibold">
                  passionate Computer Science student at UC Davis
                </span>
                , minoring in Technology Management, with{" "}
                <span className="text-orange-500 font-semibold">
                  hands-on experience
                </span>{" "}
                building thoughtful,{" "}
                <span className="text-orange-500 font-semibold">
                  responsive software
                </span>
                .
              </motion.p>

              <motion.a
                href="https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-orange-500 text-white font-semibold rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Button text */}
                <span className="relative z-10">RESUME</span>

                {/* Animated glow */}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 30px rgba(249, 115, 22, 0.6)" }}
                />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <h3 className="text-orange-500 font-semibold mb-4 text-sm uppercase tracking-wider">
                  This is me.
                </h3>
                <h4 className="text-3xl font-bold mb-6">Hi, I'm Gabriel.</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I enjoy turning ideas into well-crafted software through
                  hands-on projects. I focus on creating clean, intuitive user
                  experiences that feel simple and intentional.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My approach emphasizes thoughtful design, performance
                  awareness, accessibility, and responsiveness. I care about
                  building software that works well across devices and feels
                  reliable to use.
                </p>
              </motion.div>
              <motion.div
                className="relative aspect-square overflow-hidden"
                style={{
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Animated gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-500/30 to-purple-600/40 z-10 mix-blend-hard-light animate-pulse"
                  style={{ animationDuration: "3s" }}
                />

                {/* Additional gradient layer */}
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-transparent to-yellow-500/20 z-10 mix-blend-overlay" />

                <Image
                  src="/headshot.JPG"
                  alt="Gabriel Venezia"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex items-center gap-4 mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="text-orange-500 text-4xl spin-slow">✦</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
                My Stack
              </h2>
            </motion.div>

            <div className="space-y-20">
              {skillsData.categories.map((category, catIdx) => (
                <div key={category.name}>
                  <motion.h3
                    className="text-3xl md:text-4xl text-white font-bold mb-10 uppercase tracking-wider"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {category.name}
                  </motion.h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        className="group flex items-center gap-4 cursor-pointer will-change-transform"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          delay: idx * 0.02,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        whileHover={{
                          x: 6,
                          transition: {
                            duration: 0.2,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          },
                        }}
                      >
                        <div
                          className="w-12 h-12 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{
                            color: skill.color,
                            background: "transparent",
                            backgroundColor: "transparent",
                          }}
                        >
                          {getIcon(skill.icon)}
                        </div>
                        <span className="text-xl font-medium text-white group-hover:text-orange-500 transition-colors duration-200">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex items-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="text-orange-500 text-4xl spin-slow">✦</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
                My Experience
              </h2>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: "Software Engineer Associate",
                  company: "AI Student Collective",
                  period: "Dec 2024 - Present",
                },
                {
                  title: "Frontend Developer",
                  company: "#include at Davis",
                  period: "Oct 2023 - Nov 2024",
                },
                {
                  title: "Software Engineer Intern",
                  company: "NASA Jet Propulsion Laboratory",
                  period: "Jun 2025 - Sep 2025",
                },
                {
                  title: "Software Engineer Intern",
                  company: "NASA Jet Propulsion Laboratory",
                  period: "Feb 2025 - Jun 2025",
                },
                {
                  title: "Math Instructor",
                  company: "Mathnasium",
                  period: "Aug 2022 - Aug 2024",
                },
              ].map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="group p-6 rounded-xl border border-white/5 cursor-pointer will-change-transform"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    x: 4,
                    borderColor: "rgba(249, 115, 22, 0.5)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    transition: {
                      duration: 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-orange-500 transition-colors duration-250">
                        {exp.company}
                      </h3>
                      <p className="text-gray-400">{exp.title}</p>
                    </div>
                    <span className="text-sm text-orange-500 font-medium whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex items-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="text-orange-500 text-4xl spin-slow">✦</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
                Selected <span className="text-orange-500">Projects</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group cursor-pointer will-change-transform"
                  onClick={() => setSelectedProject(project)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    y: -6,
                    transition: {
                      duration: 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-5 bg-gradient-to-br from-white/5 to-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded-md transition-transform duration-250 group-hover:scale-105">
                      _{String(index + 1).padStart(2, "0")}.
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-250">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10 group-hover:border-orange-500/30 transition-colors duration-250"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500 transition-all z-10"
              >
                <span className="text-xl text-white">×</span>
              </button>

              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-white/5 to-white/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Title */}
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white pr-8">
                {selectedProject.title}
              </h2>

              {/* Project Description */}
              <p className="text-sm md:text-base text-gray-300 mb-5 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-5">
                <h3 className="text-lg font-bold mb-3 text-orange-500 uppercase tracking-wider">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 text-white rounded-md border border-white/10 hover:border-orange-500/50 transition-colors text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500 rounded-lg transition-all font-semibold text-sm"
                  >
                    <Fa.FaGithub className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-semibold text-sm"
                  >
                    <Fa.FaExternalLinkAlt className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Contact */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                You know how to find me
              </h2>

              <motion.a
                href="mailto:gabrielvenezia6@gmail.com"
                className="text-3xl md:text-4xl text-orange-500 hover:text-orange-400 font-bold inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                gabrielvenezia6@gmail.com
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
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
      </div>
    </div>
  );
}
