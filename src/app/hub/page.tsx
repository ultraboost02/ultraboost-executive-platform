"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";
import { UltraBoostCommunitySection } from "@/components/community/UltraBoostCommunitySection";

const hubCards = [
  {
    id: "specialist",
    badge: "SPECIALIST",
    tagline: "Bootcamp | Business | Monétisation",
    monthly: "58 250 FCFA/mois",
    yearly: "594 150 FCFA/an",
    savings: "104 850 FCFA",
    certificates: ["Certificate of Competence", "Professional Certification", "Elite Specialist Certificate"],
    commission: "10%",
    minRate: "10 000 FCFA/h",
    dayGoal: "20 000 FCFA/jour",
    roles: [
      "Business Developer",
      "Trainer",
      "Domain Specialist",
      "Consultant/Advisor",
      "Speaker/Panelist",
      "Mentor",
    ],
    dataLevel: "specialist" as const,
  },
  {
    id: "manager",
    badge: "MANAGER",
    tagline: "Bootcamp | Business | Recherche | Monétisation",
    monthly: "83 250 FCFA/mois",
    yearly: "849 150 FCFA/an",
    savings: "149 850 FCFA",
    certificates: ["Certificate of Competence", "Professional Certification", "Elite Manager Distinction"],
    commission: "12%",
    minRate: "15 000 FCFA/h",
    dayGoal: "30 000 FCFA/jour",
    roles: [
      "Business Developer",
      "Trainer/Coach",
      "Project Manager",
      "Consultant/Advisor",
      "Speaker/Panelist",
      "Mentor",
    ],
    dataLevel: "manager" as const,
  },
  {
    id: "director",
    badge: "DIRECTOR",
    tagline: "Bootcamp | Business | Recherche | Conseils | Monétisation",
    monthly: "133 250 FCFA/mois",
    yearly: "1 359 150 FCFA/an",
    savings: "239 850 FCFA",
    certificates: ["Executive Certificate", "Executive Elite Certificate", "Executive Fellowship"],
    commission: "14%",
    minRate: "25 000 FCFA/h",
    dayGoal: "50 000 FCFA/jour",
    roles: [
      "Business Developer",
      "Trainer/Coach",
      "Project Manager",
      "Consultant/Advisor",
      "Speaker/Panelist",
      "Mentor",
      "Board Member",
      "Institutional Leader",
      "Think Tank Member",
      "Strategic Advisor",
    ],
    dataLevel: "director" as const,
  },
  {
    id: "executive",
    badge: "EXECUTIVE",
    tagline: "Bootcamp | Business | Recherche | Conseil | Gouvernance | Monétisation",
    monthly: "245 250 FCFA/mois",
    yearly: "2 502 550 FCFA/an",
    savings: "440 450 FCFA",
    certificates: ["Executive Certificate", "Executive Elite Certificate", "Executive Fellowship"],
    commission: "25%",
    minRate: "50 000 FCFA/h",
    dayGoal: "150 000 FCFA/jour",
    roles: [
      "Business Developer",
      "Trainer/Coach",
      "Project Manager",
      "CEO",
      "Consultant/Advisor",
      "Speaker/Panelist",
      "Mentor",
      "Board Member",
      "Institutional Leader",
      "Think Tank Member",
      "Strategic Advisor",
    ],
    dataLevel: "executive" as const,
  },
];

function HubAdmissionModal({
  open,
  presetLevel,
  onClose,
}: {
  open: boolean;
  presetLevel: string;
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
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">UltraBoost Hub</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Demande d&apos;admission
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
              key={presetLevel}
              variant="hub"
              hubLevelPreset={presetLevel}
              onSuccess={onClose}
              showStepper
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HubPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetHub, setPresetHub] = useState("specialist");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <HubAdmissionModal open={modalOpen} presetLevel={presetHub} onClose={() => setModalOpen(false)} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            UltraBoost Hub
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            L&apos;écosystème professionnel pour digitaliser, monétiser et développer votre activité.
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <div className="grid gap-8 md:grid-cols-2">
          {hubCards.map((card, idx) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.12)] p-6 sm:p-7"
            >
              <span className="badge-level w-fit" data-level={card.dataLevel}>
                {card.badge}
              </span>
              <p className="mt-3 text-xs uppercase tracking-wider text-[#9999A9]">{card.tagline}</p>
              <h2
                className="mt-2 text-2xl font-semibold text-[#D4AF37]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Hub {card.badge.charAt(0) + card.badge.slice(1).toLowerCase()}
              </h2>

              <div className="mt-4 space-y-1 text-sm text-[#C8C8CF]">
                <p>
                  <span className="text-[#D4AF37]">{card.monthly}</span>
                  {" — "}
                  <span>{card.yearly}</span>
                </p>
                <p className="text-xs text-[#9999A9]">Économie : {card.savings}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Certificats</p>
                <ul className="mt-2 list-inside list-disc text-sm text-[#C8C8CF]">
                  {card.certificates.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm text-[#C8C8CF]">
                <span className="text-[#D4AF37]">Commission :</span> {card.commission}
                <span className="mx-2 text-[#555]">|</span>
                <span className="text-[#D4AF37]">Honoraire min :</span> {card.minRate}
                <span className="mx-2 text-[#555]">|</span>
                <span className="text-[#D4AF37]">Objectif :</span> {card.dayGoal}
              </p>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Rôles possibles</p>
                <p className="mt-2 text-sm leading-relaxed text-[#C8C8CF]">{card.roles.join(" · ")}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPresetHub(card.id);
                  setModalOpen(true);
                }}
                className="btn-gold mt-6 w-full py-3 text-sm"
              >
                Demande d&apos;admission
              </button>
            </motion.article>
          ))}
        </div>

        <UltraBoostCommunitySection />
      </main>

      <SiteFooter />
    </div>
  );
}
