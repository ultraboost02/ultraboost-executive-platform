"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NetworkingDevisForm, type NetworkingServiceType } from "@/components/admission/NetworkingDevisForm";

const services: {
  key: NetworkingServiceType;
  emoji: string;
  title: string;
  description: string;
}[] = [
  {
    key: "recrutement_standard",
    emoji: "🎯",
    title: "Recrutement Standard",
    description:
      "Accédez à une base de talents certifiés par UltraBootcamps pour vos besoins de recrutement. Service gratuit pour les entreprises et organisations.",
  },
  {
    key: "matchmaking",
    emoji: "🤝",
    title: "Matchmaking Payant",
    description:
      "Service premium de mise en relation pour partenariats business, collaboration stratégique et connexions complexes.",
  },
  {
    key: "sur_mesure",
    emoji: "⚡",
    title: "Solutions Sur-Mesure",
    description:
      "Pour des besoins spécifiques ou projets d'envergure nécessitant une approche unique et des services adaptés.",
  },
];

function DevisModal({
  open,
  serviceType,
  onClose,
}: {
  open: boolean;
  serviceType: NetworkingServiceType;
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
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[rgba(201,168,76,0.18)] bg-[#111116] p-6 shadow-2xl sm:max-w-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                Demande de devis
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[#C8C8CF]"
              >
                ✕
              </button>
            </div>
            <NetworkingDevisForm serviceType={serviceType} onSuccess={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function NetworkingPage() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<NetworkingServiceType>("recrutement_standard");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />
      <DevisModal open={open} serviceType={service} onClose={() => setOpen(false)} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Hub de Mise en Relation
          </h1>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <div className="mb-14 grid gap-6 sm:grid-cols-3">
          {[
            { emoji: "🔗", label: "Talents Certifiés" },
            { emoji: "🧩", label: "Matching IA" },
            { emoji: "📡", label: "Opportunités" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card-gold flex flex-col items-center border border-[rgba(201,168,76,0.12)] px-4 py-8 text-center"
            >
              <span className="text-4xl">{item.emoji}</span>
              <p className="mt-3 text-sm font-semibold text-[#F5F5F7]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((s, idx) => (
            <motion.article
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.12)] p-7"
            >
              <p className="text-3xl">{s.emoji}</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                {s.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#C8C8CF]">{s.description}</p>
              <button
                type="button"
                onClick={() => {
                  setService(s.key);
                  setOpen(true);
                }}
                className="btn-gold mt-6 w-full py-3 text-sm"
              >
                Demander un Devis
              </button>
            </motion.article>
          ))}
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
