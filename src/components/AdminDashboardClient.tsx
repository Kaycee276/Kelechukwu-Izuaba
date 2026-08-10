"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ExternalLink, Github, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
  createdAt?: string | null;
}

export default function AdminDashboardClient({ initialProjects }: { initialProjects: ProjectData[] }) {
  const [projectList, setProjectList] = useState<ProjectData[]>(initialProjects);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
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

  const handleDelete = async (id: number) => {
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
      setStatusMessage({ type: "error", text: "An error occurred while deleting" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/sys-x92-vault/login");
    router.refresh();
  };

  return (
    <div className="h-full overflow-y-auto custom-scroll py-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-6 border-b border-white/10 gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            Admin Vault
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">Manage your portfolio projects (SQLite + Drizzle ORM)</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/projects")}
            className="px-4 py-2.5 text-xs font-medium bg-white/5 border border-white/15 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-orange-400" />
            View Live Portfolio
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 text-xs font-medium bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Notification Banner */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-2xl border flex items-center gap-4 ${
              statusMessage.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/40 border-red-500/40 text-red-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="p-8 rounded-2xl border border-white/15 bg-black/70 backdrop-blur-xl sticky top-4 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Plus className="w-5 h-5 text-[#e85d04]" />
              Add New Project
            </h2>

            <form onSubmit={handleCreate} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium px-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Chesster"
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium px-1">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Brief summary of what this project does..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium px-1">
                  Tags (comma separated) *
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                  placeholder="React, Next.js, Solidity, Tailwind"
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium px-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium px-1">
                  GitHub Repo URL
                </label>
                <input
                  type="url"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 mt-4 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-xl transition-colors cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? "Saving to Database..." : "Save Project"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white">
              Projects in SQLite Database ({projectList.length})
            </h2>
          </div>

          <div className="space-y-5">
            {projectList.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 md:p-8 rounded-2xl border border-white/15 bg-black/50 backdrop-blur-md flex flex-col justify-between gap-6 hover:border-white/25 transition-all shadow-lg"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#e85d04] uppercase tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                    title="Delete project"
                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-500/20 rounded-xl transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs bg-white/10 text-orange-300 rounded-lg border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-orange-400 flex items-center gap-1.5 transition-colors px-2 py-1"
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
                        className="text-white hover:text-orange-400 flex items-center gap-1.5 transition-colors px-2 py-1"
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
    </div>
  );
}
