import Link from "next/link";
import { SITE_NAV_LINKS } from "@/components/layout/site-nav";

/** @deprecated Utilisez SITE_NAV_LINKS — conservé pour imports historiques */
export const FOOTER_NAV_PRIMARY = SITE_NAV_LINKS;

export const FOOTER_NAV_LINKS = SITE_NAV_LINKS;

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-8 border-t border-[rgba(201,168,76,0.10)] bg-black/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#C8C8CF]" aria-label="Liens du site">
          {SITE_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#D4AF37]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#C8C8CF]">
          <a
            href="https://www.linkedin.com/company/ultraboost"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#D4AF37]"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/UltraBoostHub"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#D4AF37]"
          >
            Facebook
          </a>
          <a
            href="https://www.youtube.com/@UltraBoostDigital"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#D4AF37]"
          >
            YouTube
          </a>
        </div>
        <div className="text-sm leading-relaxed text-[#C8C8CF]">
          <p>Abidjan — Côte d&apos;Ivoire</p>
          <p className="mt-1">
            <a href="https://wa.me/2250501195555" className="hover:text-[#D4AF37]">
              +225 05 01 19 55 55 (WhatsApp)
            </a>
          </p>
          <p>
            <a href="https://wa.me/2250708190791" className="hover:text-[#D4AF37]">
              +225 07 08 19 07 91 (WhatsApp)
            </a>
          </p>
          <p className="mt-1">
            <a href="mailto:hubs@ultraboost.pro" className="hover:text-[#D4AF37]">
              hubs@ultraboost.pro
            </a>
            {" · "}
            <a href="mailto:admission@ultraboost.pro" className="hover:text-[#D4AF37]">
              admission@ultraboost.pro
            </a>
          </p>
        </div>
        <p className="text-xs text-[#9696A3]">© 2026 UltraBoost. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
