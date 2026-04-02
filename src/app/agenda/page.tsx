"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EventAdmissionForm } from "@/components/admission/EventAdmissionForm";

type AgendaEvent = {
  month: string;
  title: string;
  datetime: string;
  description: string;
  type: string;
};

const events: AgendaEvent[] = [
  {
    month: "Avril",
    title: 'Apéro "SIP & MEET"',
    datetime: "Jeudi 09 Avril 2026 | 18h00 - 21h00",
    description: "Rencontre conviviale entre professionnels du digital et de l'IA.",
    type: "SIP & MEET",
  },
  {
    month: "Mai",
    title: "RENCONTRE D'INTELLIGENCE",
    datetime: "Jeudi 14 mai 2026 | 18h00 - 21h00",
    description:
      "Forum d'échange entre leaders, managers et experts sur les enjeux stratégiques du digital.",
    type: "Rencontre",
  },
  {
    month: "Juin",
    title: "MASTERCLASS GOUVERNANCE DIGITAL & IA",
    datetime: "Jeudi 18 juin 2026 | 18h00 - 21h00",
    description: "Découverte d'UltraBoost, de ses programmes et de sa communauté.",
    type: "Masterclass",
  },
  {
    month: "Juillet",
    title: "AFTERWORK NETWORKING",
    datetime: "Jeudi 16 juillet 2026 | 18h00 - 21h00",
    description: "Soirée networking premium pour connecter entrepreneurs et décideurs.",
    type: "Afterwork",
  },
  {
    month: "Août",
    title: 'Apéro "SIP & MEET"',
    datetime: "Jeudi 27 août 2026 | 18h00 - 21h00",
    description: "Rencontre conviviale entre professionnels du digital et de l'IA.",
    type: "SIP & MEET",
  },
  {
    month: "Septembre",
    title: "MASTERCLASS IA & VENTE",
    datetime: "Jeudi 24 septembre 2026 | 18h00 - 21h00",
    description: "Masterclass avancée sur les stratégies commerciales augmentées par l'IA.",
    type: "Masterclass",
  },
  {
    month: "Octobre",
    title: "RENCONTRE D'INTELLIGENCE",
    datetime: "Jeudi 22 octobre 2026 | 18h00 - 21h00",
    description: "Forum stratégique destiné aux leaders et décideurs.",
    type: "Rencontre",
  },
  {
    month: "Novembre",
    title: "JOURNÉE PORTE OUVERTE",
    datetime: "Jeudi 12 novembre 2026 | 18h00 - 21h00",
    description: "Présentation des programmes et découverte de l'écosystème UltraBoost.",
    type: "Portes ouvertes",
  },
  {
    month: "Décembre",
    title: "AFTERWORK NETWORKING",
    datetime: "Jeudi 10 décembre 2026 | 18h00 - 21h00",
    description: "Soirée de fin d'année dédiée au networking professionnel.",
    type: "Afterwork",
  },
];

export default function AgendaPage() {
  const [eventModal, setEventModal] = useState<AgendaEvent | null>(null);

  useEffect(() => {
    if (!eventModal) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEventModal(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [eventModal]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <AnimatePresence>
        {eventModal && (
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
              onClick={() => setEventModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-[rgba(201,168,76,0.18)] bg-[#111116] p-6 shadow-2xl sm:max-w-xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Inscription événement
                </h2>
                <button
                  type="button"
                  onClick={() => setEventModal(null)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#C8C8CF]"
                >
                  ✕
                </button>
              </div>
              <EventAdmissionForm
                eventTitle={eventModal.title}
                eventDatetime={eventModal.datetime}
                eventType={eventModal.type}
                onClose={() => setEventModal(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Agenda
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Événements, rencontres et masterclass UltraBoost.
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>
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
            Agenda 2026
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Les Jeudis UltraBoost - Événements exclusifs pour notre communauté
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <section className="relative pl-6 sm:pl-10">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-[rgba(201,168,76,0.65)] to-transparent sm:left-3" />

          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.article
                key={`${event.month}-${event.title}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: index * 0.02 }}
                className="relative rounded-2xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-6 pl-8 sm:pl-10"
              >
                <div className="absolute left-0 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_0_6px_rgba(212,175,55,0.14)] sm:left-3" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    {event.type}
                  </span>
                  <span className="text-sm uppercase tracking-[0.1em] text-[#C8C8CF]">{event.month}</span>
                </div>

                <h2
                  className="mt-4 text-2xl font-semibold text-[#D4AF37]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {event.title}
                </h2>

                <p className="mt-3 text-lg font-medium text-[#F5F5F7]">{event.datetime}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">&quot;{event.description}&quot;</p>

                <button
                  type="button"
                  onClick={() => setEventModal(event)}
                  className="btn-gold mt-6 px-6 py-3 text-sm"
                >
                  S&apos;inscrire
                </button>
              </motion.article>
            ))}
          </div>
        </section>
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
            Agenda 2026
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Les Jeudis UltraBoost - Événements exclusifs pour notre communauté
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <section className="relative pl-6 sm:pl-10">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-[rgba(201,168,76,0.65)] to-transparent sm:left-3" />

          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.article
                key={`${event.month}-${event.title}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.04, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute -left-[29px] top-8 h-3 w-3 rounded-full border border-[rgba(201,168,76,0.5)] bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.55)] sm:-left-[31px]" />
                <div className="glass-card-gold border border-[rgba(201,168,76,0.14)] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="badge-level" data-level="executive">
                      {event.type}
                    </span>
                    <span className="text-sm uppercase tracking-[0.1em] text-[#C8C8CF]">{event.month}</span>
                  </div>

                  <h2
                    className="mt-4 text-2xl font-semibold text-[#D4AF37]"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {event.title}
                  </h2>

                  <p className="mt-3 text-lg font-medium text-[#F5F5F7]">{event.datetime}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">&quot;{event.description}&quot;</p>

                  <button
                    type="button"
                    onClick={() => setEventModal(event)}
                    className="btn-gold mt-6 px-6 py-3 text-sm"
                  >
                    S&apos;inscrire
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
