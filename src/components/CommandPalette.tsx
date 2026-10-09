"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Home,
  FolderGit2,
  User,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Copy,
  Check,
  X,
  Search,
} from "lucide-react";

interface PaletteItem {
  id: string;
  category: "Navigation" | "Social & Links" | "Quick Action";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const EMAIL = "kizuaba@gmail.com";
  const CV_URL =
    "https://docs.google.com/document/d/1c0acDeoCnhHPdQUknvOdlBjG2Ka4uGTjT3YnJuJdGQg/edit?usp=sharing";

  const items: PaletteItem[] = [
    {
      id: "nav-home",
      category: "Navigation",
      title: "Go to /home",
      subtitle: "Overview and dynamic hero",
      icon: <Home className="w-4 h-4 text-[#e85d04]" />,
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Go to /projects",
      subtitle: "Explore 12+ dapps, AI agents & systems",
      icon: <FolderGit2 className="w-4 h-4 text-[#e85d04]" />,
      action: () => {
        router.push("/projects");
        setIsOpen(false);
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "Go to /about",
      subtitle: "Bio, experience timeline & tech stack",
      icon: <User className="w-4 h-4 text-[#e85d04]" />,
      action: () => {
        router.push("/about");
        setIsOpen(false);
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Go to /contact",
      subtitle: "Send a direct message or inquiry",
      icon: <Mail className="w-4 h-4 text-[#e85d04]" />,
      action: () => {
        router.push("/contact");
        setIsOpen(false);
      },
    },
    {
      id: "act-copy-email",
      category: "Quick Action",
      title: "Copy Email Address",
      subtitle: EMAIL,
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4 text-orange-300" />
      ),
      action: () => {
        navigator.clipboard.writeText(EMAIL);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      },
    },
    {
      id: "link-cv",
      category: "Social & Links",
      title: "Open CV / Resume",
      subtitle: "Google Docs formal resume",
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(CV_URL, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "link-github",
      category: "Social & Links",
      title: "GitHub Profile",
      subtitle: "github.com/Kaycee276",
      icon: <Github className="w-4 h-4 text-gray-300" />,
      action: () => {
        window.open("https://github.com/Kaycee276", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "link-twitter",
      category: "Social & Links",
      title: "Twitter / X Profile",
      subtitle: "@kc_deblocksmith",
      icon: <Twitter className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.open("https://x.com/kc_deblocksmith", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "link-linkedin",
      category: "Social & Links",
      title: "LinkedIn Profile",
      subtitle: "Kenneth Kelechukwu Izuaba",
      icon: <Linkedin className="w-4 h-4 text-blue-500" />,
      action: () => {
        window.open(
          "https://www.linkedin.com/in/kenneth-kelechukwu-izuaba-245658294/",
          "_blank"
        );
        setIsOpen(false);
      },
    },
  ];

  const filteredItems = items.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Arrow key navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 px-3 py-1.5 bg-black/80 hover:bg-black/95 border border-white/20 hover:border-[#e85d04]/60 text-white rounded-full text-[11px] sm:text-xs flex items-center gap-2 backdrop-blur-md transition-all shadow-xl cursor-pointer group"
        title="Open Command Palette (Ctrl+K)"
      >
        <Terminal className="w-3.5 h-3.5 text-[#e85d04] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-mono text-gray-300">Command Menu</span>
        <kbd className="px-1.5 py-0.5 text-[9px] bg-white/10 rounded-xs border border-white/15 text-gray-300 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop & Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-xl bg-zinc-950 border border-white/20 rounded-sm shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/50">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command or search (e.g. projects, contact, resume)..."
                  className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none font-mono"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-[340px] overflow-y-auto p-2 space-y-1 custom-scroll">
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-400">
                    No commands matching "{search}"
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-3 py-2 rounded-xs flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#e85d04]/20 border border-[#e85d04]/50 text-white"
                            : "hover:bg-white/5 border border-transparent text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="shrink-0">{item.icon}</span>
                          <div className="truncate">
                            <div className="font-medium text-white flex items-center gap-2">
                              <span>{item.title}</span>
                              <span className="text-[10px] text-gray-400 font-mono">
                                [{item.category}]
                              </span>
                            </div>
                            {item.subtitle && (
                              <div className="text-[11px] text-gray-400 truncate">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[10px] text-[#e85d04] font-mono shrink-0">
                            ↵ Enter
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Bottom Footer Hint */}
              <div className="px-4 py-2 border-t border-white/10 bg-black/60 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
                <div className="text-[#e85d04]">kaycee-cli v1.0</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
