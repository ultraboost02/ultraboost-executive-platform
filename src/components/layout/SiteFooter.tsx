import Link from "next/link";
import { SITE_NAV_LINKS } from "@/components/layout/site-nav";
import { SiteBrandedLogo } from "@/components/layout/SiteBrandedLogo";

/** @deprecated Utilisez SITE_NAV_LINKS — conservé pour imports historiques */
export const FOOTER_NAV_PRIMARY = SITE_NAV_LINKS;

export const FOOTER_NAV_LINKS = SITE_NAV_LINKS;

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-12 border-t border-[rgba(201,168,76,0.14)] bg-gradient-to-b from-black/25 to-black/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Colonne 1 — marque */}
          <div className="flex flex-col items-start border-b border-white/[0.06] pb-8 md:border-b-0 md:pb-0">
            <Link href="/" className="group flex items-center gap-3" aria-label="UltraBoost — accueil">
              <SiteBrandedLogo imgClassName="size-14 shrink-0 object-contain sm:size-16" gradientIdSuffix="footer" />
              <div>
                <p
                  className="text-lg font-semibold tracking-tight text-[#D4AF37] sm:text-xl"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  UltraBoost
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]/85">
                  Executive
                </p>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#A8A8B3]">
              Précision. Réinvention. Stratégie. — programmes exécutifs, bootcamps et réseau.
            </p>
          </div>

          {/* Colonne 2 — navigation */}
          <div className="border-b border-white/[0.06] pb-8 md:border-b-0 md:border-l md:border-white/[0.06] md:pb-0 md:pl-8 lg:pl-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]/90">Navigation</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#C8C8CF]" aria-label="Liens du site">
              {SITE_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit border-b border-transparent transition hover:border-[rgba(212,175,55,0.35)] hover:text-[#D4AF37]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 3 — contact & réseaux */}
          <div className="md:border-l md:border-white/[0.06] md:pl-8 lg:pl-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]/90">Contact</p>
            <div className="mt-4 space-y-2 text-sm text-[#C8C8CF]">
              <p>Abidjan — Côte d&apos;Ivoire</p>
              <p>
                <a href="https://wa.me/2250501195555" className="transition hover:text-[#D4AF37]">
                  +225 05 01 19 55 55 (WhatsApp)
                </a>
              </p>
              <p>
                <a href="https://wa.me/2250708190791" className="transition hover:text-[#D4AF37]">
                  +225 07 08 19 07 91 (WhatsApp)
                </a>
              </p>
              <p className="pt-1">
                <a href="mailto:infos@ultraboost.pro" className="text-[#D4AF37] underline decoration-[rgba(212,175,55,0.35)] underline-offset-4 hover:text-[#E8D5A3]">
                  infos@ultraboost.pro
                </a>
              </p>
            </div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]/90">Réseaux</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#C8C8CF]">
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
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center">
          <p className="text-xs text-[#9696A3]">© 2026 UltraBoost. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
