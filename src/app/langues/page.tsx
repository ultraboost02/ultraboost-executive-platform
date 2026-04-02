"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";
import { formatFCFA } from "@/lib/utils";

const englishPrograms = [
  { emoji: "🇬🇧", title: "Anglais Général", hours: 48, price: 255_000 },
  { emoji: "🌍", title: "Anglais Général Avancé", hours: 42, price: 255_000 },
  { emoji: "💼", title: "Business English", hours: 42, price: 385_000 },
  { emoji: "🎯", title: "Anglais de Spécialité", hours: 36, price: 390_000 },
];

const spanishPrograms = [
  { emoji: "🇪🇸", title: "Espagnol Général", hours: 42, price: 255_000 },
  { emoji: "🌎", title: "Espagnol Général Avancé", hours: 42, price: 255_000 },
  { emoji: "💼", title: "Espagnol Professionnel", hours: 48, price: 385_000 },
  { emoji: "🎯", title: "Espagnol de Spécialité", hours: 36, price: 390_000 },
];

const clubAdvantages = [
  "Networking business exclusif",
  "Opportunités de partenariats",
  "Pratique linguistique en contexte réel",
  "Accès à des événements VIP",
];

function LangueModal({ open, preset, onClose }: { open: boolean; preset: string; onClose: () => void }) {
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
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Bootcamps Langues</p>
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
            <AdmissionFormWizard key={preset} variant="language" languageProgramPreset={preset} onSuccess={onClose} showStepper />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LanguesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preset, setPreset] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />
      <LangueModal open={modalOpen} preset={preset} onClose={() => setModalOpen(false)} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Bootcamps Langues Business
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Maîtrisez les langues internationales et rejoignez nos clubs d&apos;affaires exclusifs
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Bootcamps Anglais
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {englishPrograms.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-6"
              >
                <p className="text-2xl">{p.emoji}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[#C8C8CF]">
                  {p.hours} h · {formatFCFA(p.price)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPreset(`${p.title} — Anglais — ${p.hours}h — ${formatFCFA(p.price)}`);
                    setModalOpen(true);
                  }}
                  className="btn-gold mt-6 w-full py-3 text-sm"
                >
                  Demande d&apos;accès
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Bootcamps Espagnol
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {spanishPrograms.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-6"
              >
                <p className="text-2xl">{p.emoji}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[#C8C8CF]">
                  {p.hours} h · {formatFCFA(p.price)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPreset(`${p.title} — Espagnol — ${p.hours}h — ${formatFCFA(p.price)}`);
                    setModalOpen(true);
                  }}
                  className="btn-gold mt-6 w-full py-3 text-sm"
                >
                  Demande d&apos;accès
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Clubs Business — Espaces de Réseautage
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {[
              {
                emoji: "🌐",
                title: "Club d'Anglais Business",
                desc: "Rencontres business anglophones exclusives",
              },
              {
                emoji: "🌎",
                title: "Club d'Espagnol Business",
                desc: "Rencontres business hispanophones exclusives",
              },
            ].map((club) => (
              <motion.article
                key={club.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7"
              >
                <p className="text-3xl">{club.emoji}</p>
                <h3 className="mt-3 text-2xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {club.title}
                </h3>
                <p className="mt-2 text-sm text-[#C8C8CF]">{club.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#C8C8CF]">
                  <li>
                    <span className="text-[#D4AF37]">Accès Mensuel :</span> {formatFCFA(15_250)}
                  </li>
                  <li>
                    <span className="text-[#D4AF37]">Accès Annuel :</span> {formatFCFA(155_550)}
                  </li>
                  <li className="text-[#9999A9]">Économie annuelle : {formatFCFA(104_850)}</li>
                </ul>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Avantages</p>
                <ul className="mt-2 list-inside list-disc text-sm text-[#C8C8CF]">
                  {clubAdvantages.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setPreset(`${club.title} — Abonnement club — Mensuel ${formatFCFA(15_250)} / Annuel ${formatFCFA(155_550)}`);
                    setModalOpen(true);
                  }}
                  className="btn-gold mt-6 w-full py-3 text-sm"
                >
                  Demande d&apos;accès
                </button>
              </motion.article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[#C8C8CF]">
            Accès privilégié : Développez votre réseau international et propulsez vos opportunités business
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
