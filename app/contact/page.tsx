"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiMapPin } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { MdMail, MdPhone } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useState, FormEvent, useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("fjqder08InzeaGQJR");
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        alert("Message sent successfully!");
      }
    } catch (error: any) {
      console.error("Error details:", error);
      alert(error.text || "Failed to send message. Please try again.");
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="max-w-xl m-3 md:m-8 z-50 w-full space-y-8 border rounded-xl border-gray-700/50 p-5 sm:p-10 backdrop-blur-xl bg-black/80">
        <Link href="/">
          <Button
            variant="ghost"
            className="hover:bg-black hover:text-white rounded-full duration-300 mb-5 cursor-pointer"
          >
            Back <BsArrowLeft className="ml-2" />
          </Button>
        </Link>
        <div className="space-y-6">
          <h1 className="text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-500">
            Get in Touch
          </h1>
          <div className="space-y-6">
            <p className="text-pretty text-neutral-200 tracking-tight">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-700/50 bg-black/40">
                <MdMail className="w-5 h-5 text-emerald-400"></MdMail>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href=""
                    className="text-neutral-500 hover:text-emerald-400 transition-colors"
                  >
                    gabrielvenezia6@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-700/50 bg-black/40">
                <MdPhone className="w-5 h-5 text-emerald-400"></MdPhone>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a
                    href=""
                    className="text-neutral-500 hover:text-emerald-400 transition-colors"
                  >
                    +1 (818) 292-5390
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-700/50 bg-black/40">
                <BiMapPin className="w-5 h-5 text-emerald-400"></BiMapPin>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-neutral-500 hover:text-emerald-400 transition-colors">
                    La Canada, CA, United States
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Send Me a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full p-2 rounded-lg flex items-center gap-3 border border-gray-700/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="w-full p-2 rounded-lg flex items-center gap-3 border border-gray-700/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    rows={5}
                    className="w-full p-2 rounded-lg flex items-center gap-3 border border-gray-700/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-black bg-emerald-400 hover:bg-emerald-500 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
