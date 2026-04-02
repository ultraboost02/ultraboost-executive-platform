"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function AdminLoginPage() {
  const search = useSearchParams();
  const from = search.get("from") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Connexion impossible.");
        return;
      }
      window.location.href = from.startsWith("/admin") ? from : "/admin";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-md px-6 py-16 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]/90">UltraBoost · Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Connexion admin
        </h1>
        <form
          onSubmit={submit}
          className="mt-8 space-y-4 rounded-2xl border border-[rgba(201,168,76,0.15)] bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-sm"
              placeholder="admin@ultraboost.pro"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Mot de passe</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-sm"
              placeholder="••••••••"
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-sm">
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

