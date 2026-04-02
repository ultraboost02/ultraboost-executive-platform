"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function MembreLoginContent() {
  const search = useSearchParams();
  const from = search.get("from") || "/membre/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/membre/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Connexion impossible.");
        return;
      }
      window.location.href = from.startsWith("/membre") ? from : "/membre/dashboard";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-md px-6 py-16 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]/90">UltraBoost</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Connexion espace membre
        </h1>
        <p className="mt-3 text-sm text-[#9999A9]">
          Connexion réelle : le serveur appelle votre route Xano (<code className="text-[10px] text-[#C9A84C]">XANO_MEMBRE_AUTH_LOGIN_PATH</code>),
          reçoit le JWT et le pose en cookie httpOnly. Mode démo : <code className="text-[10px]">MEMBRE_LOGIN_STUB=true</code> (email uniquement).
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-[rgba(201,168,76,0.15)] bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-sm"
              placeholder="vous@entreprise.com"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Mot de passe</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-sm"
              placeholder="••••••••"
            />
            <span className="mt-1 block text-[10px] text-[#777]">
              Requis pour le login Xano (stub désactivé). Avec MEMBRE_LOGIN_STUB=true, ce champ est ignoré.
            </span>
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-sm">
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
        <Link href="/" className="mt-6 inline-block text-sm text-[#C9A84C] hover:text-[#D4AF37]">
          ← Retour au site
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
