"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteBrandedLogo } from "@/components/layout/SiteBrandedLogo";
import { EventAdmissionForm } from "@/components/admission/EventAdmissionForm";
import { EventAgendaAccessModal } from "@/components/ultrabootcamps/EventAgendaAccessModal";
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

const GENERAL_MONTHS_MAI_NOV = ULTRA_BOOTCAMP_AGENDA_MONTHS.filter((r) => r.monthIndex >= 4 && r.monthIndex <= 10);

type AgendaEvent = {
  month: string;
  title: string;
  datetime: string;
  description: string;
  type: string;
};

const TRACK_ORDER: AgendaTrackKey[] = ["general", "specialist", "manager", "director", "executive"];

const TAB_LABEL: Record<AgendaTrackKey, string> = {
  general: "Agenda Général",
  specialist: "Agenda SPECIALIST",
  manager: "Agenda MANAGER",
  director: "Agenda DIRECTOR",
  executive: "Agenda EXECUTIVE",
};

/** Seul événement affiché sous Agenda Général — SIP & MEET Avril */
const SIP_MEET_AVRIL: AgendaEvent = {
  month: "Avril",
  title: 'SIP & MEET Avril — Apéro « SIP & MEET »',
  datetime: "Jeudi 09 avril 2026 | 18h00 - 21h00",
  description: "Rencontre conviviale entre professionnels du digital et de l'IA.",
  type: "SIP & MEET",
};

function isTrackParam(v: string | null): v is AgendaTrackKey {
  return v === "general" || v === "specialist" || v === "manager" || v === "director" || v === "executive";
}

export default function AgendaPage() {
  const [activeTrack, setActiveTrack] = useState<AgendaTrackKey>("general");
  const [eventModal, setEventModal] = useState<AgendaEvent | null>(null);
  const [agendaModal, setAgendaModal] = useState<{
    track: AgendaTrackKey;
    row: (typeof ULTRA_BOOTCAMP_AGENDA_MONTHS)[number];
    format: string;
    theme: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = new URLSearchParams(window.location.search).get("track");
    if (isTrackParam(t)) setActiveTrack(t);
  }, []);

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

      <EventAgendaAccessModal
        open={agendaModal != null}
        onClose={() => setAgendaModal(null)}
        defaultTrack={agendaModal?.track ?? "specialist"}
        monthLabel={agendaModal?.row.month ?? ""}
        monthIndex={agendaModal?.row.monthIndex ?? 0}
        eventFormat={agendaModal?.format ?? ""}
        themeLine={agendaModal?.theme ?? ""}
      />

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
                  Réservation
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
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1
                className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Agenda
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
                Calendriers par niveau de bootcamp. Choisissez votre calendrier, consultez les créneaux indicatifs et
                inscrivez-vous. Les événements peuvent être payants ou gratuits — nous vous recontactons sous 48h pour le
                détail du programme dédié.
              </p>
            </div>
            <SiteBrandedLogo imgClassName="size-16 shrink-0 object-contain opacity-95 sm:size-20" gradientIdSuffix="agenda" />
          </div>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <div className="sticky top-16 z-[100] -mx-6 mb-10 border-b border-[rgba(201,168,76,0.18)] bg-[#0A0A0F]/92 px-4 py-4 backdrop-blur-md sm:-mx-8 sm:px-6 sm:top-[4.5rem]">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]/90">
            Calendrier
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
                    Agenda Général
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#C8C8CF]">
                    Mise en avant : apéro SIP &amp; MEET — réservation ouverte.
                  </p>
                </div>
                <div className="space-y-8">
                  <motion.article
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65 }}
                    className="relative rounded-2xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-6 pl-8 sm:pl-10"
                  >
                    <div className="absolute left-0 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_0_6px_rgba(212,175,55,0.14)] sm:left-3" />
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                        SIP &amp; MEET — Avril
                      </span>
                    </div>
                    <h3
                      className="mt-4 text-2xl font-semibold text-[#D4AF37]"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {SIP_MEET_AVRIL.title}
                    </h3>
                    <p className="mt-3 text-lg font-medium text-[#F5F5F7]">{SIP_MEET_AVRIL.datetime}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">&quot;{SIP_MEET_AVRIL.description}&quot;</p>
                    <button
                      type="button"
                      onClick={() => setEventModal(SIP_MEET_AVRIL)}
                      className="btn-gold mt-6 px-6 py-3 text-sm"
                    >
                      Réservations
                    </button>
                  </motion.article>

                  {GENERAL_MONTHS_MAI_NOV.map((row, idx) => {
                    const pub = AGENDA_PUBLIC_STRUCTURE.general;
                    const format = agendaEventFormat(row.monthIndex, "general");
                    const theme = agendaThemeLine(row.monthIndex, "general");
                    return (
                      <motion.article
                        key={`general-extra-${row.month}`}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.65, delay: (idx + 1) * 0.04 }}
                        className="relative rounded-2xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-6 pl-8 sm:pl-10"
                      >
                        <div className="absolute left-0 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_0_6px_rgba(212,175,55,0.14)] sm:left-3" />
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                            {row.month}
                          </span>
                        </div>
                        <p className="mt-4 text-sm font-medium text-[#F5F5F7]">
                          {pub.dayLabel} · {pub.periodLabel}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                          18h00 – 21h00
                        </p>
                        <p className="mt-3 text-base font-semibold text-[#F5F5F7]">{format}</p>
                        <p className="mt-3 text-sm leading-relaxed text-[#C8C8CF]">{theme}</p>
                        <button
                          type="button"
                          onClick={() =>
                            setAgendaModal({
                              track: "general",
                              row,
                              format,
                              theme,
                            })
                          }
                          className="btn-gold mt-6 w-full px-6 py-3 text-sm sm:w-auto"
                        >
                          Activer mon accès
                        </button>
                      </motion.article>
                    );
                  })}
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
                              className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.14)] p-6"
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
                              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#C8C8CF]">{theme}</p>
                              <button
                                type="button"
                                onClick={() =>
                                  setAgendaModal({
                                    track: activeTrack,
                                    row,
                                    format,
                                    theme,
                                  })
                                }
                                className="btn-gold mt-6 w-full py-3 text-sm"
                              >
                                Activer mon accès
                              </button>
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

        <p className="mt-12 text-center text-xs text-[#9999A9]">
          Besoin d&apos;un autre créneau ?{" "}
          <Link href="/contact" className="text-[#D4AF37] underline decoration-[rgba(212,175,55,0.35)] underline-offset-4 hover:text-[#E8D5A3]">
            Contact
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
