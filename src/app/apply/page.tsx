"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";

const prestigePoints = [
  "Sélection humaine — chaque dossier est étudié par l’équipe UltraBoost.",
  "Standards d’exécution — confidentialité, exigence et résultats.",
  "Réseau international — connexions avec des leaders et experts.",
  "Parcours sur mesure — bootcamps, Hub et expériences Travel.",
  "Accompagnement — réponse sous 24h ouvrées pour les candidatures complètes.",
];

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-10 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A84C]">UltraBoost · Candidature</p>
          <h1
            className="mt-4 text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-6xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Rejoindre UltraBoost
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Accès réservé aux professionnels exigeants. Sélectionnez votre programme, complétez votre profil et soumettez
            votre candidature.
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-6 sm:p-8"
          >
            <h2 className="text-2xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Formulaire de candidature
            </h2>
            <p className="mt-2 text-sm text-[#9999A9]">
              Trois étapes : programme & formule, informations personnelles, finalisation.
            </p>
            <div className="mt-6">
              <AdmissionFormWizard variant="bootcamp" showStepper />
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-6 sm:p-8 lg:sticky lg:top-28"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A84C]">Executive Access</p>
            <h2
              className="mt-4 text-2xl font-semibold text-[#F5F5F7]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Une sélection, pas une simple inscription.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[#C8C8CF]">
              {prestigePoints.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-[rgba(201,168,76,0.18)] bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-[#D4AF37]">Besoin d&apos;aide ?</p>
              <p className="mt-2 text-sm text-[#C8C8CF]">
                WhatsApp :{" "}
                <a href="https://wa.me/2250501195555" className="text-[#D4AF37] underline underline-offset-4">
                  +225 05 01 19 55 55
                </a>
              </p>
              <p className="mt-1 text-sm text-[#C8C8CF]">
                Email :{" "}
                <a href="mailto:admission@ultraboost.pro" className="text-[#D4AF37] underline underline-offset-4">
                  admission@ultraboost.pro
                </a>
              </p>
            </div>
          </motion.aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
