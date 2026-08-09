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
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="h-full overflow-y-auto custom-scroll py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">Manage your portfolio projects (SQLite + Drizzle ORM)</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/projects")}
            className="px-3.5 py-2 text-xs font-medium bg-white/5 border border-white/15 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            View Live Portfolio
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 text-xs font-medium bg-red-950/40 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
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
            className={`p-4 mb-6 rounded-xl border flex items-center gap-3 ${
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
            <span className="text-sm">{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl sticky top-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#e85d04]" />
              Add New Project
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Chesster"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Brief summary of what this project does..."
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  Tags (comma separated) *
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                  placeholder="React, Next.js, Solidity, Tailwind"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  GitHub Repo URL
                </label>
                <input
                  type="url"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 mt-2 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? "Saving to Database..." : "Save Project"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Projects in SQLite Database ({projectList.length})
            </h2>
          </div>

          <div className="space-y-4">
            {projectList.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-xl border border-white/15 bg-black/40 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-white/25 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#e85d04] uppercase">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                    title="Delete project"
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-500/20 rounded-lg transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs bg-white/10 text-orange-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-orange-400 flex items-center gap-1 transition-colors"
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
                        className="text-white hover:text-orange-400 flex items-center gap-1 transition-colors"
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
