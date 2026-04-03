"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EventAdmissionForm } from "@/components/admission/EventAdmissionForm";
import type { AgendaTrackKey } from "@/data/ultrabootcamps-agenda";
import {
  AGENDA_PUBLIC_STRUCTURE,
  AGENDA_TRACK_META,
  ULTRA_BOOTCAMP_AGENDA_MONTHS,
  agendaAccessMode,
  agendaDayForTrack,
  agendaEventFormat,
  agendaThemeLine,
} from "@/data/ultrabootcamps-agenda";

type AgendaEvent = {
  month: string;
  title: string;
  datetime: string;
  description: string;
  type: string;
};

const TRACK_ORDER: AgendaTrackKey[] = ["general", "specialist", "manager", "director", "executive"];

const TAB_LABEL: Record<AgendaTrackKey, string> = {
  general: "Agenda General",
  specialist: "Agenda SPECIALIST",
  manager: "Agenda MANAGER",
  director: "Agenda DIRECTOR",
  executive: "Agenda EXECUTIVE",
};

const events: AgendaEvent[] = [
  {
    month: "Avril",
    title: 'SIP & MEET Avril — Apéro « SIP & MEET »',
    datetime: "Jeudi 09 avril 2026 | 18h00 - 21h00",
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
    title: 'Apéro « SIP & MEET »',
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
  const [activeTrack, setActiveTrack] = useState<AgendaTrackKey>("general");
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
            className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6"
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
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Agenda
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Événements, rencontres et masterclass UltraBoost — sélectionnez votre filière pour afficher le calendrier dédié.
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <div className="sticky top-16 z-[100] -mx-6 mb-10 border-b border-[rgba(201,168,76,0.18)] bg-[#0A0A0F]/92 px-4 py-4 backdrop-blur-md sm:-mx-8 sm:px-6 sm:top-[4.5rem]">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]/90">
            Filières
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TRACK_ORDER.map((key) => {
              const active = activeTrack === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTrack(key)}
                  className={`min-h-[44px] rounded-xl border px-3 py-2.5 text-center text-[10px] font-bold uppercase leading-tight tracking-wide transition sm:min-h-0 sm:px-4 sm:text-xs ${
                    active
                      ? "border-[#D4AF37] bg-[rgba(212,175,55,0.14)] text-[#F5F5F7] shadow-[0_0_24px_rgba(212,175,55,0.12)]"
                      : "border-white/10 bg-white/[0.03] text-[#C8C8CF] hover:border-[rgba(212,175,55,0.35)] hover:text-[#D4AF37]"
                  }`}
                >
                  {TAB_LABEL[key]}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {activeTrack === "general" ? (
              <section className="relative pl-6 sm:pl-10">
                <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-[rgba(201,168,76,0.65)] to-transparent sm:left-3" />
                <div className="mb-8 rounded-2xl border border-[rgba(201,168,76,0.14)] bg-gradient-to-br from-[rgba(212,175,55,0.06)] to-transparent p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-[#D4AF37] sm:text-2xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Les Jeudis UltraBoost
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#C8C8CF]">
                    Événements ouverts à la communauté — networking, apéros SIP &amp; MEET, masterclass et rencontres
                    d&apos;intelligence.
                  </p>
                </div>
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
                      <h3
                        className="mt-4 text-2xl font-semibold text-[#D4AF37]"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                      >
                        {event.title}
                      </h3>
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
            ) : (
              <section>
                {(() => {
                  const meta = AGENDA_TRACK_META[activeTrack];
                  const pub = AGENDA_PUBLIC_STRUCTURE[activeTrack];
                  const access = agendaAccessMode(activeTrack);
                  return (
                    <>
                      <div className="mb-10 rounded-2xl border border-[rgba(201,168,76,0.16)] bg-gradient-to-br from-[rgba(212,175,55,0.08)] via-transparent to-transparent p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {meta.label}
                        </h2>
                        <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-[#C9A84C]">{meta.branding}</p>
                        <p className="mt-4 text-sm leading-relaxed text-[#C8C8CF] sm:text-base">{meta.audience}</p>
                        <p className="mt-4 text-xs text-[#9999A9]">
                          Rythme indicatif : {pub.dayLabel} — {pub.periodLabel}
                          {access === "validated" ? (
                            <span className="ml-2 text-[#D4AF37]">· Accès soumis à validation UltraBoost.</span>
                          ) : null}
                        </p>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {ULTRA_BOOTCAMP_AGENDA_MONTHS.map((row, index) => {
                          const day = agendaDayForTrack(row, activeTrack);
                          const format = agendaEventFormat(row.monthIndex, activeTrack);
                          const theme = agendaThemeLine(row.monthIndex, activeTrack);
                          return (
                            <motion.article
                              key={`${activeTrack}-${row.month}`}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.12 }}
                              transition={{ duration: 0.5, delay: index * 0.02 }}
                              className="glass-card-gold border border-[rgba(201,168,76,0.14)] p-6"
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                                <span className="text-lg font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                  {row.month}
                                </span>
                                <span className="rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C9A84C]">
                                  Jour {day}
                                </span>
                              </div>
                              <p className="mt-4 text-sm font-semibold text-[#F5F5F7]">{format}</p>
                              <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">{theme}</p>
                            </motion.article>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <SiteFooter />
    </div>
  );
}
