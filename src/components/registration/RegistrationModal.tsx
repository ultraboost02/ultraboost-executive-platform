"use client";

import { useEffect, useId } from "react";
import { RegistrationForm } from "./RegistrationForm";

type RegistrationModalProps = {
  open: boolean;
  onClose: () => void;
};

export function RegistrationModal({ open, onClose }: RegistrationModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-label="Fermer"
        onClick={onClose}
      />
      <div
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-modal rounded-2xl border border-[rgba(201,168,76,0.15)] p-5 sm:p-7">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C9A84C]">
                ULTRABOOST · CANDIDATURE
              </p>
              <h2 id={titleId} className="mt-2 text-2xl font-semibold text-[#F5F5F7] sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                Rejoindre l&apos;élite
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#9999A9]">
                Accès réservé aux professionnels exigeants. Les candidats de moins de 36 ans sont soumis à validation
                manuelle.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-[#C8C8CF] transition hover:border-[#C9A84C]/40 hover:text-[#D4AF37]"
            >
              ✕
            </button>
          </div>
          <RegistrationForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
