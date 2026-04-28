"use client";

import { motion } from "framer-motion";
import { ULTRA_BOOTCAMP_FORMATS } from "@/data/ultrabootcamps";
import { formatFCFA } from "@/lib/utils";

export type BootcampProgramSelection = {
  levelId: string;
  levelLabel: string;
  title: string;
  hours: number | null;
  priceFcfa: number | null;
};

const certificationByLevelId: Record<string, string> = {
  ecosystem: "Digital Awareness Certificate",
  applications: "Certificates of Competence — par logiciel",
  specialist: "Professional Certificate — 545 000 FCFA — 42h",
  manager: "Advanced Certification — 1 345 000 FCFA — 42h",
  director: "Executive Diploma — 1 850 000 FCFA — 42h",
  executive: "Global Executive Fellowship — 2 445 000 FCFA — 48h",
};

const scheduleSlots = [
  {
    emoji: "🌅",
    label: "Morning",
    hours: "09h - 12h",
    blurb: "Parfait pour bien démarrer la journée",
  },
  {
    emoji: "☀️",
    label: "Afternoon",
    hours: "13h - 15h",
    blurb: "Idéal après le déjeuner",
  },
  {
    emoji: "🌞",
    label: "Full Day",
    hours: "09h - 15h",
    blurb: "Immersion complète",
  },
  {
    emoji: "🌙",
    label: "Evening",
    hours: "18h - 21h",
    blurb: "Pour les professionnels actifs",
  },
] as const;

type Props = {
  program: BootcampProgramSelection;
  onClose: () => void;
  zClass?: string;
};

export function BootcampProgramDetailModal({ program, onClose, zClass = "z-50" }: Props) {
  const intro = `Découvrez le programme complet de « ${program.title} », ses objectifs, les prérequis et le calendrier des sessions.`;

  return (
    <div className={`fixed inset-0 ${zClass} flex items-center justify-center p-4 sm:p-6`}>
      <button type="button" className="absolute inset-0 bg-black/65 backdrop-blur-sm" aria-label="Fermer" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="glass-modal relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col p-0 sm:p-0"
      >
        <div className="flex max-h-[90vh] flex-col">
          <div className="shrink-0 border-b border-[rgba(201,168,76,0.12)] p-6 sm:p-8 sm:pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="badge-level" data-level={program.levelId}>
                  {program.levelLabel}
                </span>
                <h3
                  className="mt-3 text-2xl font-semibold text-[#F5F5F7]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {program.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="border-gold-hover shrink-0 rounded-lg px-2.5 py-1.5 text-sm text-[#C8C8CF] hover:text-[#D4AF37]"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#C8C8CF]">{intro}</p>
            <p className="mt-3 text-sm text-[#F5F5F7]">
              <span className="text-[#D4AF37]">Certification :</span> {certificationByLevelId[program.levelId] ?? "—"}
            </p>
            <p className="mt-4 text-sm text-[#9696A3]">
              Les conditions financières et d&apos;accompagnement sont précisées par l&apos;administration après examen de votre
              admission.
            </p>
            <p className="mt-4 text-sm text-[#F5F5F7]">
              <span className="text-[#D4AF37]">Durée :</span>{" "}
              {program.hours != null ? `${program.hours} heures` : "Selon module / parcours logiciel"}
            </p>
            <p className="mt-2 text-sm text-[#F5F5F7]">
              <span className="text-[#D4AF37]">Tarif :</span>{" "}
              {program.priceFcfa != null ? formatFCFA(program.priceFcfa) : "Nous contacter pour le tarif."}
            </p>
          </div>

          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
            <section className="mt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">🎯 Objectifs généraux du bootcamp</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#C8C8CF]">
                Renforcer vos compétences sur « {program.title} » avec une approche actionnable, des cas réels et un cadre
                UltraBoost — du niveau {program.levelLabel} jusqu&apos;à la certification.
              </p>
            </section>

            <section className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">Objectifs spécifiques du bootcamp</h4>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-[#C8C8CF]">
                <li>Appliquer les méthodes et outils du programme dans votre contexte professionnel</li>
                <li>Valider les acquis par des livrables et mises en situation encadrées</li>
                <li>Préparer la certification et votre visibilité au sein du réseau UltraBoost</li>
              </ul>
            </section>

            <section className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
                ⏰ Horaires &amp; planning
              </h4>
              <p className="mt-2 text-sm text-[#C8C8CF]">
                <span className="font-medium text-[#D4AF37]">⏰ Disponibilité 7/7 jours</span>
                <br />
                Du lundi au dimanche — Choisissez l&apos;horaire qui vous convient
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {scheduleSlots.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-4 text-sm"
                  >
                    <p className="text-lg leading-none">
                      {s.emoji} <span className="font-semibold text-[#F5F5F7]">{s.label}</span>
                    </p>
                    <p className="mt-2 text-[#D4AF37]">{s.hours}</p>
                    <p className="mt-1 text-xs text-[#9999A9]">{s.blurb}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
                🎓 Formats de bootcamp populaires
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-[#C8C8CF]">
                <li>
                  <span className="text-[#D4AF37]">💻 En ligne</span> : Cours en direct avec interaction en temps réel
                </li>
                <li>
                  <span className="text-[#D4AF37]">Premium</span> <span className="text-[#F5F5F7]">🏢</span> Présentiel +
                  à distance ou hybride
                </li>
                <li>
                  <span className="text-[#D4AF37]">⭐ VIP</span> Accompagnement personnalisé et sur-mesure
                </li>
                <li>
                  <span className="text-[#D4AF37]">👨‍👩‍👧‍👦 Famille</span> : Accompagnement personnalisé et sur-mesure
                </li>
                <li>
                  <span className="text-[#D4AF37]">Entreprise</span> : Accompagnement personnalisé et sur-mesure
                </li>
                <li>
                  <span className="text-[#D4AF37]">Association</span> : Accompagnement personnalisé et sur-mesure
                </li>
                <li>
                  <span className="text-[#D4AF37]">Autres groupes</span> : Accompagnement personnalisé et sur-mesure
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">ℹ️ Informations pratiques</h4>
              <div className="mt-3 rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">📋 Ce qui est inclus</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#C8C8CF]">
                  <li>✓ Accès à la plateforme de bootcamp</li>
                  <li>✓ Support pédagogique complet</li>
                  <li>✓ Certificat de réussite officiel</li>
                  <li>✓ Accès communauté UltraBoost</li>
                </ul>
              </div>
              <div className="mt-4 rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">🎯 Prérequis</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#C8C8CF]">
                  <li>Motivation et engagement</li>
                  <li>Ordinateur</li>
                  <li>Disponibilité selon horaires choisis</li>
                  <li>Niveau adapté au bootcamp</li>
                </ul>
              </div>
            </section>

            <div className="divider-gold my-6" />
            <p className="text-sm text-[#C8C8CF]">
              Formats disponibles : <span className="text-[#D4AF37]">{ULTRA_BOOTCAMP_FORMATS}</span>
            </p>
            <button type="button" onClick={onClose} className="btn-gold mt-6 w-full py-3 text-sm">
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
