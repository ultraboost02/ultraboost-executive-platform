"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AGENDA_PUBLIC_STRUCTURE,
  AGENDA_TRACK_META,
  ULTRA_BOOTCAMP_AGENDA_MONTHS,
  agendaAccessMode,
  agendaEventFormat,
  agendaThemeLine,
  agendaTrackFromBootcampLevel,
  type AgendaTrackKey,
} from "@/data/ultrabootcamps-agenda";
import { EventAgendaAccessModal } from "@/components/ultrabootcamps/EventAgendaAccessModal";

type Props = {
  activeBootcampLevelId: string;
};

export function UltraBootcampsAgendaSection({ activeBootcampLevelId }: Props) {
  const track: AgendaTrackKey = agendaTrackFromBootcampLevel(activeBootcampLevelId);
  const meta = AGENDA_TRACK_META[track];
  const structure = AGENDA_PUBLIC_STRUCTURE[track];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMonth, setModalMonth] = useState(ULTRA_BOOTCAMP_AGENDA_MONTHS[0]!);
  const [modalFormat, setModalFormat] = useState("");
  const [modalTheme, setModalTheme] = useState("");

  const accessMode = agendaAccessMode(track);

  function openRequest(row: (typeof ULTRA_BOOTCAMP_AGENDA_MONTHS)[number]) {
    setModalMonth(row);
    setModalFormat(agendaEventFormat(row.monthIndex, track));
    setModalTheme(agendaThemeLine(row.monthIndex, track));
    setModalOpen(true);
  }

  return (
    <>
      <EventAgendaAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTrack={track}
        monthLabel={modalMonth.month}
        monthIndex={modalMonth.monthIndex}
        eventFormat={modalFormat}
        themeLine={modalTheme}
      />

      <motion.section
        key={track}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="border-t border-[rgba(201,168,76,0.12)] pt-12"
        aria-labelledby="agenda-heading"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A84C]/90">Événements — Agenda</p>
            <h2
              id="agenda-heading"
              className="mt-2 text-2xl font-semibold text-[#D4AF37] sm:text-3xl md:text-4xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {meta.label}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#C8C8CF] sm:text-base">{meta.audience}</p>
          </div>
          <div className="glass-card-gold rounded-xl border border-[rgba(201,168,76,0.2)] px-4 py-3 text-right sm:min-w-[220px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9999A9]">Positionnement</p>
            <p className="mt-1 text-sm font-semibold text-[#F5F5F7]">{meta.branding}</p>
            <p className="mt-2 text-xs text-[#C9A84C]">Calendrier janv. – nov.</p>
            <p className="mt-1 text-xs text-[#C8C8CF]">18h00 — 21h00 · 1× / mois</p>
            <p className="mt-2 text-[11px] font-medium text-[#9999A9]">
              {accessMode === "validated" ? "Accès sur validation" : "Accès direct ou semi-ouvert"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] px-4 py-3 text-sm text-[#C8C8CF]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">Structure publique</p>
            <p className="mt-2">
              <span className="text-[#F5F5F7]">{structure.dayLabel}</span> — {structure.periodLabel}.
            </p>
            <p className="mt-2 text-xs text-[#9999A9]">
              La date exacte et le programme détaillé sont communiqués après votre demande ou via l&apos;espace membre.
            </p>
          </div>
          <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.06)] px-4 py-3 text-xs leading-relaxed text-[#C8C8CF]">
            <p className="font-semibold text-[#D4AF37]">Plateforme événementielle premium</p>
            <p className="mt-2">
              Prochaines étapes côté UltraBoost : validation des demandes Director & Executive, compte membre avec
              calendrier privé, rappels automatisés (J-30, J-14, J-7, J-1) et back-office pour ajuster dates & thèmes — à
              brancher sur votre API (ex. Xano) selon le schéma envoyé avec{" "}
              <span className="text-[#F5F5F7]">type: &quot;event_agenda&quot;</span>.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] px-4 py-3 text-sm text-[#C8C8CF]">
          {track === "general" ? (
            <p>
              <span className="text-[#D4AF37]">Axe éditorial :</span> veilles et échanges sur le{" "}
              <strong className="font-medium text-[#F5F5F7]">digital</strong>, l&apos;
              <strong className="font-medium text-[#F5F5F7]">IA</strong>, la{" "}
              <strong className="font-medium text-[#F5F5F7]">technologie</strong>, l&apos;
              <strong className="font-medium text-[#F5F5F7]">innovation</strong> et la{" "}
              <strong className="font-medium text-[#F5F5F7]">disruption</strong>.
            </p>
          ) : track === "director" ? (
            <p>
              <span className="text-[#D4AF37]">Focus :</span> investissement, pilotage, transformation digitale, stratégie
              IA & disruption, innovation, marchés digitaux, villes intelligentes, business digital — formats réservés
              aux profils Director (y compris « Journée des directeurs »).
            </p>
          ) : track === "executive" ? (
            <p>
              <span className="text-[#D4AF37]">Focus :</span> investissement, gouvernance, leadership, transformation,
              stratégie IA & disruption, marché digital, smart territories — cercle Executive uniquement (sans formats
              « Manager » ou « Specialist »).
            </p>
          ) : (
            <p>
              <span className="text-[#D4AF37]">Cadence :</span> {structure.dayLabel.toLowerCase()}, {structure.periodLabel}{" "}
              — formats d&apos;événements propres au niveau {track === "specialist" ? "Specialist" : "Manager"}.
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ULTRA_BOOTCAMP_AGENDA_MONTHS.map((row) => {
            const format = agendaEventFormat(row.monthIndex, track);
            const theme = agendaThemeLine(row.monthIndex, track);

            return (
              <article
                key={row.month}
                className="glass-card-gold flex flex-col border border-[rgba(201,168,76,0.10)] p-5 transition duration-200 hover:border-[rgba(201,168,76,0.35)]"
              >
                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">{row.month}</span>
                  <p className="mt-2 text-xs text-[#9999A9]">
                    {structure.dayLabel} · {structure.periodLabel}
                  </p>
                  <p className="mt-1 text-[11px] text-[#C9A84C]/90">18h00 – 21h00</p>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#C9A84C]/90">{format}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#C8C8CF]">{theme}</p>
                <button
                  type="button"
                  onClick={() => openRequest(row)}
                  className="btn-gold mt-5 w-full py-3 text-xs font-semibold uppercase tracking-wider sm:text-sm"
                >
                  Activer mon accès
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/agenda" className="btn-outline-gold inline-flex px-8 py-3 text-sm uppercase tracking-wider">
            Page Agenda
          </Link>
          <p className="text-xs text-[#9999A9]">Décembre : pause. Prochaine ouverture de calendrier en janvier.</p>
        </div>
      </motion.section>
    </>
  );
}
