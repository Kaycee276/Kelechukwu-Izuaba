"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SecretAdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="h-full min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-6 md:p-8 rounded-sm border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Vault Access
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed px-2">
            Enter master key to access administrative dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 pt-2">
          {error && (
            <div className="p-3 text-xs text-red-400 bg-red-950/50 border border-red-500/40 rounded-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium px-0.5">
              Master Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-3 pr-10 bg-white/5 border border-white/15 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#e85d04] hover:bg-[#d05303] text-white font-semibold rounded-sm transition-all cursor-pointer shadow-md disabled:opacity-50 text-xs tracking-wide"
          >
            {loading ? "Authenticating..." : "Unlock Vault"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
