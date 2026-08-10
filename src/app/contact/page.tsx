"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const socials = [
  {
    name: "Whatsapp",
    url: "https://wa.me/2349127178874",
    icon: <FaWhatsapp className="text-xl sm:text-2xl" />,
  },
  {
    name: "Email",
    url: "mailto:kizuaba@gmail.com",
    icon: <MdEmail className="text-xl sm:text-2xl" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kenneth-kelechukwu-izuaba-245658294/",
    icon: <FaLinkedin className="text-xl sm:text-2xl" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/Kaycee276",
    icon: <FaGithub className="text-xl sm:text-2xl" />,
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({
          type: "success",
          text: "Message sent! I'll get back to you shortly via emails.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({
          type: "error",
          text: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "An error occurred while sending your message.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center items-center px-4 py-8 sm:py-12 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide"
        >
          Get In Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed"
        >
          Have a question, collaboration idea, or project inquiry? Send me a
          message below!
        </motion.p>
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-xl p-6 sm:p-8 rounded-sm border border-white/15 bg-black/60 backdrop-blur-md shadow-2xl space-y-6"
      >
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-sm border flex items-center gap-3 ${
                status.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-red-950/40 border-red-500/40 text-red-300"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-xs font-medium">{status.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
              Your Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Write your message or inquiry here..."
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-sm transition-colors cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Direct Social Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center gap-6 pt-2"
      >
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className="text-gray-300 hover:text-[#e85d04] transition-colors p-2 bg-white/5 border border-white/10 rounded-sm hover:border-orange-500/50"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
