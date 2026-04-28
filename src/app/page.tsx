"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Globe, GraduationCap, Plane } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomeAnchorSection } from "@/components/landing/HomeAnchorSection";
import { UltraBootcampsStickyNav } from "@/components/ultrabootcamps/UltraBootcampsStickyNav";
import { RegistrationModal } from "@/components/registration/RegistrationModal";
import { ULTRA_BOOTCAMP_TABS, ULTRA_BOOTCAMP_FORMATS } from "@/data/ultrabootcamps";
import { formatFCFA } from "@/lib/utils";
import { BootcampProgramDetailModal } from "@/components/ultrabootcamps/BootcampProgramDetailModal";

const pillars = [
  {
    title: "UltraBoost Hub",
    description: "Recherche, Business, Innovation & Monétisation",
    icon: Globe,
  },
  {
    title: "UltraBootcamps",
    description: "Bootcamps Online, Premium et VIP",
    icon: GraduationCap,
  },
  {
    title: "TravelBootcamps",
    description: "Bootcamps immersifs dans une nouvelle capitale chaque année",
    icon: Plane,
  },
];

const whyStats = [
  { value: "6", label: "niveaux" },
  { value: "4", label: "Hubs" },
  { value: "9+", label: "événements/an" },
  { value: "12+", label: "pays" },
];

const revealOnScroll = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>(ULTRA_BOOTCAMP_TABS[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{
    levelId: string;
    levelLabel: string;
    title: string;
    hours: number | null;
    priceFcfa: number | null;
  } | null>(null);

  const activeBootcampTab = useMemo(
    () => ULTRA_BOOTCAMP_TABS.find((tab) => tab.id === activeTab) ?? ULTRA_BOOTCAMP_TABS[0],
    [activeTab],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-40 h-[560px] w-[min(94vw,980px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, rgba(201,168,76,0) 72%)" }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(212, 175, 55, 0.06)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(255, 255, 255, 0.03)" }}
      />
      <SiteHeader />

      <motion.section
        id="accueil"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl scroll-mt-28 items-center px-6 py-20 sm:scroll-mt-32 sm:px-8"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full rounded-[2rem] border border-[rgba(201,168,76,0.10)] bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Colonne texte */}
            <div className="lg:order-1">
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]/90">L&apos;expérience rencontre l&apos;innovation digitale</p>
              <h1
                className="mt-6 text-4xl font-semibold leading-[1.1] text-[#F5F5F7] sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                UltraBoost
              </h1>
              <p className="mt-4 text-base font-medium tracking-[0.08em] text-[#D4AF37]">
                Précision.&nbsp; Réinvention.&nbsp; Stratégie.
              </p>
              <p className="mt-7 text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
                UltraBoost est une plateforme internationale dédiée aux professionnels souhaitant se réinventer, maîtriser
                les outils du digital, de l&apos;intelligence artificielle, de l&apos;e-business et de la disruption, tout en
                valorisant et monétisant leur savoir.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#9999A9] sm:text-base">
                Notre approche unique : 80% de pratique pour un impact immédiat, combinée à une stratégie IA qui vous permet
                de monétiser votre expertise avec précision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Digital & IA", "E-Business", "Monétisation", "Disruption"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] sm:text-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[rgba(201,168,76,0.15)] pt-8">
                <div>
                  <p className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                    80%
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#C8C8CF] sm:text-sm">Pratique</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                    5
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#C8C8CF] sm:text-sm">Niveaux</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                    100%
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#C8C8CF] sm:text-sm">Pro</p>
                </div>
              </div>
              <div className="divider-gold mt-8" />
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn-gold mt-10 px-8 py-4 text-sm uppercase tracking-[0.18em] hover:shadow-[0_12px_30px_rgba(212,175,55,0.26)]"
              >
                REJOINDRE ULTRABOOST
              </button>
            </div>

            {/* Colonne image */}
            <div className="relative order-first flex items-center justify-center lg:order-2">
              {/* Halo doré derrière l'image */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl blur-2xl"
                style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.18) 0%, transparent 70%)" }}
              />
              {/* Cadre de l'image */}
              <div className="relative w-full overflow-hidden rounded-3xl border border-[rgba(201,168,76,0.25)] shadow-[0_0_60px_rgba(212,175,55,0.10)]">
                <Image
                  src="/ultraboost-Imageacceuil.png"
                  alt="UltraBoost — Précision, Réinvention, Stratégie"
                  width={680}
                  height={780}
                  priority
                  className="h-[280px] w-full object-cover object-top sm:h-[340px] lg:h-auto lg:max-h-[70vh]"
                />
                {/* Dégradé bas pour fondre avec le fond */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
                  style={{ background: "linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 100%)" }}
                />
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      <HomeAnchorSection id="a-propos" title="À propos" href="/about">
        UltraBoost accompagne les professionnels qui veulent maîtriser le digital, l&apos;IA et la monétisation de leur
        expertise — avec une méthode orientée terrain et une communauté internationale exigeante.
      </HomeAnchorSection>

      <motion.section
        {...revealOnScroll}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 pt-2 sm:px-8"
      >
        <h2
          className="text-2xl font-semibold text-[#F5F5F7] sm:text-3xl"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Les 3 piliers
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
            <article
              key={pillar.title}
              className="glass-card-gold border border-[rgba(201,168,76,0.18)] p-6 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.35)] hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]"
            >
              <Icon className="h-7 w-7 text-[#D4AF37]" strokeWidth={1.7} />
              <h3
                className="mt-4 text-xl font-semibold text-[#D4AF37]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">{pillar.description}</p>
            </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        {...revealOnScroll}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10 sm:px-8"
      >
        <div className="glass-card-gold border border-[rgba(201,168,76,0.14)] p-7 sm:p-8">
          <h2
            className="text-2xl font-semibold text-[#F5F5F7] sm:text-3xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Pourquoi UltraBoost
          </h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-5">
                <p className="text-4xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {stat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.1em] text-[#C8C8CF]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="ultrabootcamps"
        {...revealOnScroll}
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 sm:scroll-mt-32 sm:px-8"
      >
        {/* Banner image UltraBootcamps */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.20)] shadow-[0_0_50px_rgba(212,175,55,0.08)]">
          <Image
            src="/ultraboost-ia1.png"
            alt="UltraBootcamps — Bootcamps immersifs UltraBoost"
            width={1200}
            height={420}
            className="h-[220px] w-full object-cover sm:h-[300px] lg:h-[360px]"
          />
          {/* Overlay gradient pour lisibilité du texte */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.40) 55%, rgba(10,10,15,0.10) 100%)" }}
          />
          {/* Contenu texte sur l'image */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">Bootcamp · Expertise · Impact</p>
            <h2
              className="mt-3 text-3xl font-semibold text-[#F5F5F7] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              UltraBootcamps
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#C8C8CF] sm:text-base">
              Bootcamps Online, Premium et VIP — 80% de pratique pour un impact immédiat.
            </p>
          </div>
          {/* Bord doré décoratif gauche */}
          <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl" style={{ background: "linear-gradient(to bottom, transparent, #D4AF37, transparent)" }} />
        </div>

        <div className="glass-card mt-6 rounded-2xl border border-[rgba(201,168,76,0.12)] p-0">
          <UltraBootcampsStickyNav mode="filter" activeId={activeTab} onSelect={setActiveTab} />

          <motion.div
            key={activeBootcampTab.id}
            className="mt-6 p-5 sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-[#C8C8CF] sm:text-base">
              <span className="text-[#D4AF37]">{activeBootcampTab.label}</span>
              {" — "}
              <span style={{ fontFamily: '"Playfair Display", serif' }}>{activeBootcampTab.sectionTitle}</span>
            </p>
            <p className="mt-2 text-xs text-[#9696A3]">{activeBootcampTab.sectionSummary}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activeBootcampTab.items.map((item) => (
                <article
                  key={item.title}
                  className="glass-card-gold border border-[rgba(201,168,76,0.10)] p-6 transition duration-200 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.35)] hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]"
                >
                  <div className="mb-3">
                    <span className="badge-level" data-level={activeBootcampTab.id}>
                      {activeBootcampTab.label}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#D4AF37] sm:text-xl"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#F5F5F7]">
                    <span className="text-[#D4AF37]">
                      {item.hours != null ? `${item.hours} h` : "—"}
                    </span>
                    <span className="mx-2 text-[#9696A3]">·</span>
                    <span className="text-[#C8C8CF]">
                      {item.priceFcfa != null ? formatFCFA(item.priceFcfa) : "Tarif sur demande"}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-[#C8C8CF]">{ULTRA_BOOTCAMP_FORMATS}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProgram({
                          levelId: activeBootcampTab.id,
                          levelLabel: activeBootcampTab.label,
                          title: item.title,
                          hours: item.hours,
                          priceFcfa: item.priceFcfa,
                        })
                      }
                      className="btn-outline-gold inline-flex min-h-[2.75rem] w-full items-center justify-center px-3 py-2.5 text-center text-sm"
                    >
                      Programme
                    </button>
                    <Link
                      href="/contact"
                      className="btn-gold inline-flex min-h-[2.75rem] w-full items-center justify-center px-3 py-2.5 text-center text-sm"
                    >
                      Admission
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section écosystème — Hub, TravelBootcamps, Agenda, Partenaires, Contact regroupés avec l'image */}
      <section className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 sm:scroll-mt-32 sm:px-8">
        <div className="glass-card-gold overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.12)]">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">

            {/* Image — visible mobile ET desktop */}
            <div className="relative h-[200px] w-full lg:h-full">
              <Image
                src="/ultraboost-imagesbusiness.png"
                alt="UltraBoost — Écosystème Business & Innovation"
                width={600}
                height={700}
                className="h-full w-full object-cover"
              />
              {/* Fondu bas sur mobile, droite sur desktop */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0) 50%, rgba(10,10,15,0.75) 100%)" }}
              />
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to right, rgba(10,10,15,0) 40%, rgba(10,10,15,0.85) 100%)" }}
              />
              {/* Vignette haut/bas desktop */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.35) 0%, transparent 20%, transparent 80%, rgba(10,10,15,0.35) 100%)" }}
              />
              {/* Label sur l'image */}
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/70">Écosystème UltraBoost</p>
              </div>
            </div>

            {/* Sections à droite */}
            <div className="divide-y divide-[rgba(201,168,76,0.10)]">
              {[
                { id: "hub", title: "UltraBoost Hub", href: "/hub", desc: "Espace premium dédié à la recherche, au business et à l'innovation : accédez aux ressources, modules et parcours pour accélérer vos projets." },
                { id: "travelbootcamps", title: "TravelBootcamps", href: "/travelbootcamps", desc: "Vivez un bootcamp immersif dans une capitale stratégique chaque année : networking, expertises locales et expérience UltraBoost hors des sentiers battus." },
                { id: "agenda", title: "Agenda", href: "/agenda", desc: "Dates de sessions, événements exclusifs et temps forts du calendrier UltraBoost — planifiez votre prochaine montée en puissance." },
                { id: "partenaires", title: "Partenaires", href: "/networking", desc: "Écosystème d'institutions, entreprises et leaders alignés avec la vision UltraBoost : synergies, visibilité et opportunités pour les membres." },
                { id: "contact", title: "Contact", href: "/contact", desc: "Une question sur l'admission, un programme ou un partenariat ? Notre équipe répond aux professionnels éligibles avec la discrétion attendue." },
              ].map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="group flex items-start justify-between gap-4 px-6 py-5 transition-colors hover:bg-[rgba(201,168,76,0.04)] sm:px-8 sm:py-6"
                >
                  <div className="flex-1">
                    <h2
                      className="text-lg font-semibold text-[#D4AF37] sm:text-xl"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#C8C8CF]">{item.desc}</p>
                  </div>
                  <Link
                    href={item.href}
                    className="btn-outline-gold mt-1 shrink-0 px-5 py-2.5 text-xs"
                  >
                    Découvrir
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <motion.section
        id="candidature-elite"
        {...revealOnScroll}
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-6 pb-10 pt-2 sm:scroll-mt-32 sm:px-8"
      >
        <div className="glass-card-gold overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.14)]">
          <div className="grid lg:grid-cols-2">

            {/* Image gauche — visible mobile ET desktop */}
            <div className="relative h-[200px] w-full lg:h-full">
              <Image
                src="/UltraBoost-imageuntrabootcamps.png"
                alt="Rejoignez UltraBoost"
                width={600}
                height={420}
                className="h-full w-full object-cover"
              />
              {/* Overlay bas → droite sur desktop, bas sur mobile */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0) 50%, rgba(10,10,15,0.75) 100%)" }}
              />
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to right, rgba(10,10,15,0) 40%, rgba(10,10,15,0.85) 100%)" }}
              />
            </div>

            {/* Contenu droit */}
            <div className="flex flex-col items-center justify-center p-8 text-center sm:p-12 lg:items-start lg:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">Candidature exclusive</p>
              <p
                className="mt-4 text-2xl font-semibold text-[#F5F5F7] sm:text-3xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Rejoignez UltraBoost
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#C8C8CF]">
                Candidature réservée aux professionnels éligibles. Un conseiller vous recontacte sous 48h.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-px w-8 bg-[#D4AF37]/40" />
                <span className="text-xs text-[#9696A3]">Sélection rigoureuse · Standards irréprochables</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn-gold mt-8 px-10 py-4 text-sm uppercase tracking-[0.18em]"
              >
                REJOINDRE ULTRABOOST
              </button>
            </div>

          </div>
        </div>
      </motion.section>

      <SiteFooter />
      {selectedProgram && (
        <BootcampProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          zClass="z-[60]"
        />
      )}

      <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
