"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";
import { formatFCFA } from "@/lib/utils";

const levels = [
  {
    id: "ecosystem" as const,
    emoji: "🌐",
    title: "Écosystème",
    price: 25_000,
    perks: ["Accès au réseau professionnel", "Veille technologique hebdomadaire", "Événements networking", "Opportunités business"],
  },
  {
    id: "specialist" as const,
    emoji: "⚡",
    title: "Specialist",
    price: 35_000,
    perks: [
      "Tous les avantages Écosystème",
      "Projets collaboratifs",
      "Mentorat communautaire",
      "Accès prioritaire aux événements",
    ],
  },
  {
    id: "manager" as const,
    emoji: "📊",
    title: "Manager",
    price: 45_000,
    perks: [
      "Tous les avantages Specialist",
      "Opportunités de leadership",
      "Partenariats stratégiques",
      "Visibilité premium",
    ],
  },
  {
    id: "director" as const,
    emoji: "🎯",
    title: "Director",
    price: 55_000,
    perks: [
      "Tous les avantages Manager",
      "Conseil stratégique",
      "Networking C-Level",
      "Opportunités d'investissement",
    ],
  },
  {
    id: "executive" as const,
    emoji: "👑",
    title: "Executive",
    price: 75_000,
    perks: [
      "Tous les avantages Director",
      "Comité consultatif",
      "Speaking opportunities",
      "Accès VIP exclusif",
    ],
  },
];

function CommunityAdmissionModal({
  open,
  levelId,
  onClose,
}: {
  open: boolean;
  levelId: string;
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
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">UltraBoost Community</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Demande d&apos;accès
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#C8C8CF]"
              >
                ✕
              </button>
            </div>
            <AdmissionFormWizard
              key={levelId}
              variant="community"
              communityLevelPreset={levelId}
              onSuccess={onClose}
              showStepper
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type UltraBoostCommunitySectionProps = {
  /** Sur /hub : titre + chapô ; sur /community la page fournit déjà le h1 */
  showSectionLead?: boolean;
};

export function UltraBoostCommunitySection({ showSectionLead = true }: UltraBoostCommunitySectionProps) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState("ecosystem");

  return (
    <>
      <CommunityAdmissionModal open={open} levelId={level} onClose={() => setOpen(false)} />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.65 }}
        className={
          showSectionLead ? "mt-20 border-t border-[rgba(201,168,76,0.12)] pt-16" : ""
        }
      >
        {showSectionLead && (
          <>
            <h2
              className="text-4xl font-semibold text-[#D4AF37] md:text-5xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              UltraBoost Community
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
              Rejoignez une communauté de professionnels. Développez votre réseau, accédez à des opportunités.
            </p>
            <div className="divider-gold mt-8 max-w-2xl" />
          </>
        )}

        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${showSectionLead ? "mt-10" : "mt-0"}`}>
          {levels.map((lv, idx) => (
            <motion.article
              key={lv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.12)] p-6"
            >
              <p className="text-3xl">{lv.emoji}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                {lv.title}
              </h3>
              <p className="mt-2 text-lg text-[#F5F5F7]">{formatFCFA(lv.price)}/an</p>
              <ul className="mt-4 flex-1 list-inside list-disc space-y-2 text-sm text-[#C8C8CF]">
                {lv.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setLevel(lv.id);
                  setOpen(true);
                }}
                className="btn-gold mt-6 w-full py-3 text-sm"
              >
                Demande d&apos;accès
              </button>
            </motion.article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-[#9999A9]">
          Accès communauté : Réservé aux professionnels certifiés et validés
        </p>
      </motion.section>
    </>
  );
}
