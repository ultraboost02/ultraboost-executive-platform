"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";

const levelCards = [
  {
    id: "specialist" as const,
    level: "SPECIALIST",
    description: "Marketing Digital & IA",
  },
  {
    id: "manager" as const,
    level: "MANAGER",
    description: "Management de projet Digital & Stratégie IA",
  },
  {
    id: "director" as const,
    level: "DIRECTOR",
    description: "Transformation Digital & Stratégie IA",
  },
  {
    id: "executive" as const,
    level: "EXECUTIVE",
    description: "Gouvernance Digital & Stratégie IA",
  },
];

const conceptBlocks = [
  { title: "Bootcamp", text: "Un bootcamp qui combine expertise, mise en pratique et standards d'exécution UltraBoost." },
  { title: "Networking stratégique", text: "Rencontres guidées entre décideurs, leaders et experts pour créer des opportunités durables." },
  { title: "Immersion culturelle", text: "Une immersion au coeur de la capitale d'accueil pour aligner mentalité, réseau et inspiration." },
  { title: "Ouverture internationale", text: "Une perspective globale pour développer votre activité à l'échelle internationale." },
];

function TravelAdmissionModal({
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
          <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Fermer" onClick={onClose} />
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
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">TravelBootcamps</p>
                <h2
                  className="mt-2 text-2xl font-semibold text-[#F5F5F7]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
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
              variant="travel"
              travelLevelPreset={presetLevel}
              onSuccess={onClose}
              showStepper
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function TravelBootcampsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [travelPreset, setTravelPreset] = useState("specialist");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <TravelAdmissionModal open={modalOpen} presetLevel={travelPreset} onClose={() => setModalOpen(false)} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14"
        >
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            TravelBootcamps
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Chaque année, un bootcamp dans une nouvelle capitale. Bootcamp, networking et immersion
            culturelle.
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {levelCards.map((card, idx) => (
              <motion.article
                key={card.level}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: "easeOut" }}
                className="glass-card-gold border border-[rgba(201,168,76,0.10)] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="badge-level" data-level={card.level.toLowerCase()}>
                    {card.level}
                  </span>
                </div>

                <h2
                  className="mt-4 text-2xl font-semibold text-[#D4AF37]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {card.description}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">
                  Chaque session est conçue pour renforcer votre trajectoire, votre réseau et votre capacité
                  à exécuter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setTravelPreset(card.id);
                    setModalOpen(true);
                  }}
                  className="btn-gold mt-6 w-full py-3 text-sm"
                >
                  Contactez-nous pour les dates et le pays d&apos;accueil
                </button>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="text-3xl font-semibold text-[#D4AF37]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Le concept
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {conceptBlocks.map((block) => (
              <article
                key={block.title}
                className="glass-card border border-[rgba(201,168,76,0.12)] bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <h3 className="text-lg font-semibold text-[#D4AF37]">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">{block.text}</p>
              </article>
            ))}
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}

