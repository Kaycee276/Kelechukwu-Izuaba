"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SecretAdminLoginPage() {
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
        router.push("/sys-x92-vault");
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
    <div className="h-full flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 md:p-10 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl space-y-6"
      >
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-wide">Vault Access</h1>
          <p className="text-sm text-gray-400 leading-relaxed px-2">
            Enter master key to access administrative dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 pt-2">
          {error && (
            <div className="p-4 text-xs text-red-400 bg-red-950/50 border border-red-500/40 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium px-1">
              Master Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-50 text-sm tracking-wide"
          >
            {loading ? "Authenticating..." : "Unlock Vault"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
