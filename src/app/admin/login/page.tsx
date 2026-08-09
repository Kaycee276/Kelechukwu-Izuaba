"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid password");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 rounded-2xl border border-white/20 bg-black/70 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-400">Enter your master password to manage portfolio projects</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 text-xs text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-lg disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
