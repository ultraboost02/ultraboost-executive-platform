"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const nav = [
  { href: "/membre/dashboard", label: "Tableau de bord" },
  { href: "/membre/mon-lien", label: "Mon lien" },
  { href: "/membre/mes-commissions", label: "Commissions" },
  { href: "/membre/mon-reseau", label: "Mon réseau" },
  { href: "/membre/retraits", label: "Retraits" },
  { href: "/membre/profil", label: "Profil" },
] as const;

export default function MembreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/membre/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <SiteHeader />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:flex-row sm:px-6 lg:px-8">
        <aside className="shrink-0 sm:w-52">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A84C]/90">Espace membre</p>
          <nav className="mt-4 flex flex-wrap gap-2 sm:flex-col sm:gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] text-[#D4AF37]"
                      : "border border-transparent text-[#C8C8CF] hover:border-[rgba(212,175,55,0.2)] hover:text-[#F5F5F7]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="mt-6 text-left text-xs text-[#9999A9] underline-offset-4 hover:text-[#D4AF37] hover:underline"
            onClick={async () => {
              await fetch("/api/membre/logout", { method: "POST" });
              window.location.href = "/membre/login";
            }}
          >
            Déconnexion
          </button>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
