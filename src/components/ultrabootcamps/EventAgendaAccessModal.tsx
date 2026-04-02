"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EventAgendaAccessForm } from "@/components/admission/EventAgendaAccessForm";
import type { AgendaTrackKey } from "@/data/ultrabootcamps-agenda";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultTrack: AgendaTrackKey;
  monthLabel: string;
  monthIndex: number;
  eventFormat: string;
  themeLine: string;
};

export function EventAgendaAccessModal({
  open,
  onClose,
  defaultTrack,
  monthLabel,
  monthIndex,
  eventFormat,
  themeLine,
}: Props) {
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
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Fermer" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#111116] shadow-2xl sm:max-w-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-agenda-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A84C]/90">Agenda UltraBoost</p>
                <h2
                  id="event-agenda-modal-title"
                  className="mt-1.5 text-xl font-semibold text-[#F5F5F7] sm:text-2xl"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Demander la date &amp; le programme
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
            <div className="max-h-[calc(92vh-5rem)] overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <EventAgendaAccessForm
                key={`${monthLabel}-${defaultTrack}`}
                defaultTrack={defaultTrack}
                defaultMonthLabel={monthLabel}
                defaultMonthIndex={monthIndex}
                eventFormatPreview={eventFormat}
                themePreview={themeLine}
                onSuccess={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
