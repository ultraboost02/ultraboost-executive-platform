"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UltraBootcampsStickyNav } from "@/components/ultrabootcamps/UltraBootcampsStickyNav";
import { UltraBootcampsAgendaSection } from "@/components/ultrabootcamps/UltraBootcampsAgendaSection";
import { BootcampProgramDetailModal } from "@/components/ultrabootcamps/BootcampProgramDetailModal";
import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";
import { ULTRA_BOOTCAMP_SECTIONS, ULTRA_BOOTCAMP_FORMATS } from "@/data/ultrabootcamps";
import type { UltraBootcampSection } from "@/data/ultrabootcamps";
import { formatFCFA } from "@/lib/utils";

/** Mêmes 4 programmes et montants pour chaque langue */
const LANGUAGE_SHARED_PROGRAMS = [
  { titleKey: "general" as const, hours: 48, priceFcfa: 255_000 },
  { titleKey: "advanced" as const, hours: 42, priceFcfa: 255_000 },
  { titleKey: "business" as const, hours: 42, priceFcfa: 385_000 },
  { titleKey: "specialty" as const, hours: 36, priceFcfa: 390_000 },
] as const;

const LANGUAGES = [
  { label: "Anglais", emoji: "🇬🇧" },
  { label: "Espagnol", emoji: "🇪🇸" },
  { label: "Mandarin", emoji: "🇨🇳" },
  { label: "Français", emoji: "🇫🇷" },
] as const;

function languageProgramTitle(langLabel: string, key: (typeof LANGUAGE_SHARED_PROGRAMS)[number]["titleKey"]): string {
  switch (key) {
    case "general":
      return `${langLabel} — Général`;
    case "advanced":
      return `${langLabel} — Général Avancé`;
    case "business":
      return `Business ${langLabel}`;
    case "specialty":
      return `${langLabel} — Spécialité`;
    default:
      return langLabel;
  }
}

const CLUB_BUSINESS_ADVANTAGES = [
  "Networking business exclusif",
  "Opportunités de partenariats",
  "Pratique linguistique en contexte réel (Anglais · Espagnol · Mandarin · Français)",
  "Accès à des événements VIP",
] as const;

const BUSINESS_CLUBS = [
  {
    emoji: "🌐",
    title: "Club Business International — Réseau Premium",
    subtitle: "Accès clubs pour les 4 langues : mêmes tarifs et avantages",
  },
  {
    emoji: "🌎",
    title: "Club Business International — Réseau Executive",
    subtitle: "Accès clubs pour les 4 langues : mêmes tarifs et avantages",
  },
] as const;

const CERTIFICATION_COPY: Record<string, { title: string; lines: string[] }> = {
  ecosystem: {
    title: "Certifications — Écosystèmes",
    lines: [
      "Parcours Digital Awareness et certificats par domaine (IA, E-Business, sectoriels…).",
      "Attestations alignées sur les bootcamps Écosystème : 9 h à 30 h selon modules.",
    ],
  },
  applications: {
    title: "Certifications — Applications",
    lines: [
      "Certificats de compétence sur les logiciels et outils métiers (CRM, automation, design, etc.).",
      "Validation pratique des stacks les plus demandées par les directions digitales.",
    ],
  },
  specialist: {
    title: "Certifications — Specialist",
    lines: [
      "Professional Certificate — référence 545 000 FCFA — 42 h.",
      "Certificats Elite Specialist selon filière (marketing, IA, FinTech, etc.).",
    ],
  },
  manager: {
    title: "Certifications — Manager",
    lines: [
      "Advanced Certification — 1 345 000 FCFA — 42 h — pilotage de projets digitaux et sectoriels.",
      "Distinctions Elite Manager sur les parcours management & disruption.",
    ],
  },
  director: {
    title: "Certifications — Director",
    lines: [
      "Executive Diploma — 1 285 000 FCFA — 42 h.",
      "Executive Elite Certificate & Executive Fellowship selon filière de pilotage.",
    ],
  },
  executive: {
    title: "Certifications — Executive",
    lines: [
      "Global Executive Fellowship — 1 850 000 FCFA — 48 h.",
      "Gouvernance, stratégie digitale & conformité : certification d’excellence dirigeants.",
    ],
  },
};

function LanguageAdmissionModal({
  open,
  programPreset,
  onClose,
}: {
  open: boolean;
  programPreset: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Fermer"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[rgba(201,168,76,0.18)] bg-[#111116] p-6 shadow-2xl sm:max-w-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Bootcamps Langues Business</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Demande d&apos;accès
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#C8C8CF] hover:border-[#C9A84C]/40"
              >
                ✕
              </button>
            </div>
            <AdmissionFormWizard
              key={programPreset}
              variant="language"
              languageProgramPreset={programPreset}
              onSuccess={onClose}
              showStepper
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type SelectedProgram = {
  levelId: string;
  levelLabel: string;
  title: string;
  hours: number | null;
  priceFcfa: number | null;
};

function BootcampLevelSection({
  section,
  onProgramClick,
  onAdmissionClick,
}: {
  section: UltraBootcampSection;
  onProgramClick: (p: SelectedProgram) => void;
  onAdmissionClick: (args: { domaine: string; niveau: string; programme: string }) => void;
}) {
  const domainKey =
    section.id === "ecosystem"
      ? "ecosystemes"
      : section.id === "applications"
        ? "applications"
        : "expertise";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-labelledby={`bootcamp-heading-${section.id}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span className="badge-level" data-level={section.id}>
          {section.levelLabel}
        </span>
        <h2
          id={`bootcamp-heading-${section.id}`}
          className="text-2xl font-semibold text-[#F5F5F7] sm:text-3xl"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {section.sectionTitle}
        </h2>
      </div>
      <p className="mb-6 text-sm text-[#9696A3]">{section.sectionSummary}</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item) => (
          <article
            key={item.title}
            className="glass-card-gold border border-[rgba(201,168,76,0.10)] p-6 transition duration-200 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.35)] hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]"
          >
            <div className="mb-3">
              <span className="badge-level" data-level={section.id}>
                {section.levelLabel}
              </span>
            </div>
            <h3
              className="text-lg font-semibold text-[#D4AF37] sm:text-xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-[#F5F5F7]">
              <span className="text-[#D4AF37]">{item.hours != null ? `${item.hours} h` : "—"}</span>
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
                  onProgramClick({
                    levelId: section.id,
                    levelLabel: section.levelLabel,
                    title: item.title,
                    hours: item.hours,
                    priceFcfa: item.priceFcfa,
                  })
                }
                className="btn-outline-gold inline-flex min-h-[2.75rem] w-full items-center justify-center px-3 py-2.5 text-center text-sm"
              >
                Programme
              </button>
              <button
                type="button"
                onClick={() =>
                  onAdmissionClick({
                    domaine: domainKey,
                    niveau: section.id,
                    programme: item.title,
                  })
                }
                className="btn-gold inline-flex min-h-[2.75rem] w-full items-center justify-center px-3 py-2.5 text-center text-sm"
              >
                Admission
              </button>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}

function BootcampAdmissionModal({
  open,
  onClose,
  domaine,
  niveau,
  programme,
}: {
  open: boolean;
  onClose: () => void;
  domaine: string;
  niveau: string;
  programme: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Fermer" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#111116] shadow-2xl sm:max-w-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bootcamp-admission-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A84C]/90">UltraBootcamps</p>
                <h2
                  id="bootcamp-admission-title"
                  className="mt-1.5 text-xl font-semibold text-[#F5F5F7] sm:text-2xl"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Demande d&apos;admission
                </h2>
                <p className="mt-1 text-xs text-[#9999A9]">{programme}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#C8C8CF] hover:border-[#C9A84C]/40"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[calc(92vh-5rem)] overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <AdmissionFormWizard
                variant="bootcamp"
                bootcampDomainePreset={domaine}
                bootcampNiveauPreset={niveau}
                bootcampProgrammePreset={programme}
                onSuccess={onClose}
                showStepper
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function UltraBootcampsPage() {
  const [selectedProgram, setSelectedProgram] = useState<SelectedProgram | null>(null);
  const [activeSection, setActiveSection] = useState<string>(ULTRA_BOOTCAMP_SECTIONS[0]!.id);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [languageProgramPreset, setLanguageProgramPreset] = useState("");
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [admissionPreset, setAdmissionPreset] = useState<{ domaine: string; niveau: string; programme: string }>({
    domaine: "ecosystemes",
    niveau: "ecosystem",
    programme: "",
  });

  const activeBootcampSection = useMemo(
    () => ULTRA_BOOTCAMP_SECTIONS.find((s) => s.id === activeSection) ?? ULTRA_BOOTCAMP_SECTIONS[0]!,
    [activeSection],
  );

  const certCopy = CERTIFICATION_COPY[activeSection] ?? CERTIFICATION_COPY.ecosystem;
  const skipScrollOnMount = useRef(true);

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    const el = document.getElementById("ultrabootcamp-view");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSection]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-28 h-[420px] w-[min(92vw,900px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <LanguageAdmissionModal
        open={languageModalOpen}
        programPreset={languageProgramPreset}
        onClose={() => setLanguageModalOpen(false)}
      />

      <BootcampAdmissionModal
        open={admissionOpen}
        onClose={() => setAdmissionOpen(false)}
        domaine={admissionPreset.domaine}
        niveau={admissionPreset.niveau}
        programme={admissionPreset.programme}
      />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10"
        >
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            UltraBootcamps
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]/90">
            L&apos;expérience rencontre l&apos;innovation digitale
          </p>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            UltraBoost est une plateforme internationale dédiée aux professionnels souhaitant se réinventer, maîtriser les
            outils du digital, de l&apos;intelligence artificielle, de l&apos;e-business et de la disruption, tout en
            valorisant et monétisant leur savoir.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#9999A9] sm:text-base">
            UltraBoost permet de développer des projets e-business, d&apos;acquérir des compétences du digital et IA, d&apos;accéder à
            de nouvelles opportunités économiques au niveau national et international.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#9999A9] sm:text-base">
            Notre approche unique : 80% de pratique pour un impact immédiat, combinée à une stratégie IA qui vous permet de
            monétiser votre expertise avec précision.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Digital & IA", "E-Business", "Monétisation", "Disruption"].map((b) => (
              <span
                key={b}
                className="rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] sm:text-sm"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <UltraBootcampsStickyNav mode="filter" activeId={activeSection} onSelect={setActiveSection} />

        <div id="ultrabootcamp-view" className="scroll-mt-32 space-y-16 pt-6">
          <BootcampLevelSection
            section={activeBootcampSection}
            onProgramClick={setSelectedProgram}
            onAdmissionClick={(args) => {
              setAdmissionPreset(args);
              setAdmissionOpen(true);
            }}
          />

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="border-t border-[rgba(201,168,76,0.12)] pt-12"
            aria-labelledby="certifications-heading"
          >
            <h2
              id="certifications-heading"
              className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Certifications
            </h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-[#C9A84C]/90">{certCopy.title}</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-[#C8C8CF]">
              {certCopy.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link href="/certifications" className="btn-outline-gold mt-6 inline-flex px-6 py-3 text-sm">
              Toutes les certifications
            </Link>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.65 }}
            className="border-t border-[rgba(201,168,76,0.12)] pt-12"
          >
            <h2
              className="text-3xl font-semibold text-[#D4AF37] sm:text-4xl md:text-5xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Bootcamps Langues Business
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
              Mêmes programmes et mêmes montants pour l&apos;Anglais, l&apos;Espagnol, le Mandarin et le Français.
            </p>
            <div className="divider-gold mt-8 max-w-2xl" />

            <div className="mt-10 grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
              {LANGUAGES.map((lang) => (
                <div key={lang.label}>
                  <div className="mb-4 flex items-center gap-2 border-b border-[rgba(201,168,76,0.2)] pb-3">
                    <span className="text-2xl">{lang.emoji}</span>
                    <h3 className="text-lg font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
                      {lang.label}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {LANGUAGE_SHARED_PROGRAMS.map((prog) => {
                      const title = languageProgramTitle(lang.label, prog.titleKey);
                      const preset = `${title} — ${prog.hours}h — ${formatFCFA(prog.priceFcfa)}`;
                      return (
                        <article
                          key={prog.titleKey}
                          className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.10)] p-4 transition duration-200 hover:border-[rgba(201,168,76,0.3)]"
                        >
                          <h4 className="text-sm font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {title}
                          </h4>
                          <p className="mt-2 text-xs text-[#C8C8CF]">
                            <span className="text-[#D4AF37]">{prog.hours} h</span>
                            <span className="mx-1.5 text-[#9696A3]">·</span>
                            {formatFCFA(prog.priceFcfa)}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setLanguageProgramPreset(preset);
                              setLanguageModalOpen(true);
                            }}
                            className="btn-gold mt-3 w-full py-2.5 text-xs"
                          >
                            Demande d&apos;accès
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <h3
              className="mt-14 text-2xl font-semibold text-[#F5F5F7] sm:text-3xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Clubs Business
            </h3>
            <p className="mt-2 text-sm text-[#9696A3]">
              Tarifs identiques pour les deux clubs — valables pour les quatre langues (Anglais, Espagnol, Mandarin, Français).
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {BUSINESS_CLUBS.map((club) => {
                const preset = `${club.title} — Mensuel 15 250 FCFA · Annuel 155 550 FCFA (économie 104 850 FCFA) — Langues : Anglais, Espagnol, Mandarin, Français`;
                return (
                  <article
                    key={club.title}
                    className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.12)] p-6 sm:p-8"
                  >
                    <p className="text-3xl">{club.emoji}</p>
                    <h4
                      className="mt-3 text-xl font-semibold text-[#D4AF37] sm:text-2xl"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {club.title}
                    </h4>
                    <p className="mt-2 text-xs text-[#9999A9]">{club.subtitle}</p>
                    <div className="mt-4 space-y-1 text-sm text-[#C8C8CF]">
                      <p>
                        <span className="text-[#D4AF37]">Mensuel</span> — 15 250 FCFA
                      </p>
                      <p>
                        <span className="text-[#D4AF37]">Annuel</span> — 155 550 FCFA
                      </p>
                      <p className="text-xs text-[#9999A9]">Économie : 104 850 FCFA</p>
                    </div>
                    <div className="mt-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Avantages</p>
                      <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-[#C8C8CF]">
                        {CLUB_BUSINESS_ADVANTAGES.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguageProgramPreset(preset);
                        setLanguageModalOpen(true);
                      }}
                      className="btn-gold mt-6 w-full py-3 text-sm"
                    >
                      Demande d&apos;accès
                    </button>
                  </article>
                );
              })}
            </div>

            <p className="mt-12 text-center text-sm font-medium text-[#C8C8CF] sm:text-base">
              Accès privilégié : Développez votre réseau international et propulsez vos opportunités business
            </p>
          </motion.section>

          <UltraBootcampsAgendaSection activeBootcampLevelId={activeSection} />
        </div>
      </main>

      {selectedProgram && (
        <BootcampProgramDetailModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}

      <SiteFooter />
    </div>
  );
}
