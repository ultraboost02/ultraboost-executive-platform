"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RegistrationModal } from "@/components/registration/RegistrationModal";

export function LandingHero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SiteHeader />

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center px-6 pb-24 pt-12 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-gold/90">
            UltraBoost · Excellence réservée
          </p>
          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            L&apos;élite
            <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              ne se présente pas.
            </span>
            <br />
            Elle se choisit.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
            UltraBoost Executive est réservé aux leaders qui exigent performance, discrétion et
            standards irréprochables. Une expérience pensée pour ceux qui ont déjà tout — sauf
            l&apos;ordinaire.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group relative overflow-hidden rounded-xl border border-gold/50 bg-gold/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold shadow-gold-glow transition hover:border-gold hover:bg-gold/20"
            >
              <span className="relative z-10">Rejoindre l&apos;élite</span>
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition group-hover:translate-x-full"
                aria-hidden
              />
            </button>
            <span className="text-sm text-zinc-500">Candidature soumise à validation</span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-6 hidden max-w-xs rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md lg:block">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-gold/80">Signature</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Verre dépoli, anthracite profond, fil d&apos;or — l&apos;identité visuelle de votre
            prochain standard.
          </p>
        </div>
      </main>

      <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
