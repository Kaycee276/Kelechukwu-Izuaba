"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  ExternalLink,
  Github,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Mail,
  FolderGit2,
  MailCheck,
  MailOpen,
  Reply,
} from "lucide-react";

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
  createdAt?: string | null;
}

export interface MessageData {
  id: number;
  name: string;
  email: string;
  message: string;
  read: number | null;
  createdAt?: string | null;
}

export default function AdminDashboardClient({
  initialProjects,
  initialMessages = [],
}: {
  initialProjects: ProjectData[];
  initialMessages?: MessageData[];
}) {
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [projectList, setProjectList] = useState<ProjectData[]>(initialProjects);
  const [messageList, setMessageList] = useState<MessageData[]>(initialMessages);

  // Form states for project creation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  const unreadCount = messageList.filter((m) => !m.read).length;

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          tags,
          link: link.trim() ? link.trim() : null,
          repo: repo.trim() ? repo.trim() : null,
        }),
      });

      const data = await res.json();
      if (data.success && data.project) {
        let parsedTags: string[] = [];
        try {
          parsedTags = JSON.parse(data.project.tags);
        } catch {
          parsedTags = data.project.tags.split(",").map((t: string) => t.trim());
        }

        setProjectList([
          {
            ...data.project,
            tags: parsedTags,
          },
          ...projectList,
        ]);

        setTitle("");
        setDescription("");
        setTags("");
        setLink("");
        setRepo("");

        setStatusMessage({ type: "success", text: "Project added successfully to SQLite DB!" });
        router.refresh();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to create project" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "An error occurred while adding the project" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setProjectList((prev) => prev.filter((p) => p.id !== id));
        setStatusMessage({ type: "success", text: "Project deleted successfully!" });
        router.refresh();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to delete project" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "An error occurred while deleting project" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleMessageRead = async (id: number, currentRead: number | null) => {
    const newReadStatus = currentRead ? 0 : 1;
    setMessageList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: newReadStatus } : m))
    );

    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: newReadStatus }),
      });
    } catch (err) {
      console.error("Failed to toggle read status", err);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Delete this contact message permanently?")) return;

    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessageList((prev) => prev.filter((m) => m.id !== id));
        setStatusMessage({ type: "success", text: "Message deleted from SQLite DB!" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to delete message" });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/sys-x92-vault/login");
    router.refresh();
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Admin Top Header Bar */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/15 gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5 tracking-wide">
            Admin Vault
          </h1>
          <p className="text-xs text-gray-400">Manage projects & view contact messages (SQLite DB)</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/projects")}
            className="px-3.5 py-2 text-xs font-medium bg-white/5 border border-white/15 rounded-sm text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            Live Portfolio
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 text-xs font-medium bg-red-950/40 border border-red-500/30 rounded-sm text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 text-xs font-semibold rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "projects"
              ? "bg-[#e85d04] text-white shadow-md"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          Projects ({projectList.length})
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 text-xs font-semibold rounded-sm transition-all flex items-center gap-2 cursor-pointer relative ${
            activeTab === "messages"
              ? "bg-[#e85d04] text-white shadow-md"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          <Mail className="w-4 h-4" />
          Contact Messages ({messageList.length})
          {unreadCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-red-500 text-white font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Status Notification Banner */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-sm border flex items-center gap-3 ${
              statusMessage.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/40 border-red-500/40 text-red-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="text-xs font-medium">{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Content: Projects */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-sm border border-white/15 bg-black/70 backdrop-blur-xl sticky top-4 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#e85d04]" />
                Add New Project
              </h2>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Chesster"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Brief summary of what this project does..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Tags (comma separated) *
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                    placeholder="React, Next.js, Solidity, Tailwind"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://my-app.vercel.app"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-sm text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 mt-2 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-sm transition-colors cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 text-xs"
                >
                  {submitting ? "Saving to Database..." : "Save Project"}
                </button>
              </form>
            </div>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-lg font-bold text-white">
              Projects in Database ({projectList.length})
            </h2>

            <div className="space-y-4">
              {projectList.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 rounded-sm border border-white/15 bg-black/50 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-white/25 transition-all shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-[#e85d04] uppercase tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={deletingId === project.id}
                      title="Delete project"
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-500/20 rounded-sm transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 text-[10px] bg-white/10 text-orange-300 rounded-sm border border-white/5 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-orange-400 flex items-center gap-1 transition-colors px-1.5 py-0.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-orange-400 flex items-center gap-1 transition-colors px-1.5 py-0.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Repo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Messages */}
      {activeTab === "messages" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Incoming Contact Messages ({messageList.length})
            </h2>
          </div>

          {messageList.length === 0 ? (
            <div className="p-12 text-center border border-white/10 bg-black/40 rounded-sm space-y-2">
              <Mail className="w-8 h-8 text-gray-500 mx-auto" />
              <p className="text-sm text-gray-400">No contact messages received yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messageList.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-6 rounded-sm border transition-all ${
                    msg.read
                      ? "bg-black/40 border-white/10 text-gray-300"
                      : "bg-black/70 border-orange-500/40 text-white shadow-lg"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <span className="text-xs text-orange-400 font-mono">&lt;{msg.email}&gt;</span>
                        <span
                          className={`px-2 py-0.5 text-[9px] rounded-sm font-semibold uppercase ${
                            msg.read
                              ? "bg-gray-800 text-gray-400"
                              : "bg-orange-950 text-orange-400 border border-orange-500/30"
                          }`}
                        >
                          {msg.read ? "Read" : "Unread"}
                        </span>
                      </div>
                      {msg.createdAt && (
                        <p className="text-[10px] text-gray-500 mt-1">
                          Received: {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${msg.email}?subject=RE: Portfolio Contact Inquiry`}
                        className="px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/15 rounded-sm text-white transition-colors flex items-center gap-1.5"
                      >
                        <Reply className="w-3.5 h-3.5 text-orange-400" />
                        Reply
                      </a>

                      <button
                        onClick={() => handleToggleMessageRead(msg.id, msg.read)}
                        className="px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/15 rounded-sm text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {msg.read ? (
                          <>
                            <MailOpen className="w-3.5 h-3.5 text-gray-400" />
                            Mark Unread
                          </>
                        ) : (
                          <>
                            <MailCheck className="w-3.5 h-3.5 text-emerald-400" />
                            Mark Read
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-500/20 rounded-sm transition-colors cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-gray-200">
                    {msg.message}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
