"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE_NAV_LINKS } from "@/components/layout/site-nav";
import { SiteBrandedLogo } from "@/components/layout/SiteBrandedLogo";

const linkClass =
  "whitespace-nowrap text-xs text-[#C8C8CF] transition hover:text-[#C9A84C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]/60 lg:text-sm";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [mobileOpen]);

  return (
    <header className="glass-header relative w-full border-b border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-3 sm:gap-4 sm:px-8 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center justify-start p-4"
          aria-label="UltraBoost Executive — accueil"
        >
          <SiteBrandedLogo imgClassName="size-12 shrink-0 object-contain" gradientIdSuffix="header" />
        </Link>

        <nav
          className="mx-2 hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1 md:flex lg:gap-x-3 xl:gap-x-4"
          aria-label="Navigation principale"
        >
          {SITE_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/apply"
            className="btn-gold hidden px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#0A0A0F] md:inline-flex md:px-5 md:text-xs"
          >
            REJOINDRE L&apos;ÉLITE
          </Link>
          <Link
            href="/apply"
            className="btn-gold inline-flex px-3 py-2 text-center text-[9px] font-bold uppercase tracking-wide md:hidden"
          >
            ÉLITE
          </Link>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-white/15 p-2 text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100vw,20rem)] flex-col border-l border-[rgba(201,168,76,0.25)] bg-[#0E0E14] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">Menu</span>
              <button type="button" className="rounded-lg p-2 text-white" onClick={() => setMobileOpen(false)} aria-label="Fermer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto p-4" aria-label="Navigation mobile">
              {SITE_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-white/[0.06] py-3.5 text-sm text-[#F5F5F7] hover:text-[#D4AF37]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-white/10 p-4">
              <Link
                href="/apply"
                className="btn-gold block w-full py-3 text-center text-xs font-bold uppercase tracking-wider"
                onClick={() => setMobileOpen(false)}
              >
                REJOINDRE L&apos;ÉLITE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
