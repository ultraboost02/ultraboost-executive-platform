"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const interventionDomains = [
  "Bootcamps",
  "Gestion de projets",
  "Études de marché",
  "Intermédiation",
  "Missions de consultance",
  "Développement business",
  "Recherche scientifique et technologique",
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
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
            À propos d&apos;UltraBoost
          </h1>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7"
          >
            <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Vision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#C8C8CF]">
              UltraBoost s&apos;adresse aux professionnels, cadres, décideurs et entrepreneurs qui veulent se transformer,
              monétiser leur expertise et développer leur réseau à l&apos;international.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7"
          >
            <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#C8C8CF]">
              Notre mission est d&apos;aider les participants à valoriser, structurer et monétiser leurs
              compétences à travers de réelles opportunités d&apos;affaires.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Nos domaines d&apos;intervention
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {interventionDomains.map((domain) => (
                <article
                  key={domain}
                  className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-5 transition duration-200 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.35)] hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]"
                >
                  <h3 className="text-lg text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {domain}
                  </h3>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7"
          >
            <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Deux parcours de certification
            </h2>
            <div className="mt-6 space-y-5">
              <div className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-5">
                <p className="text-sm uppercase tracking-[0.12em] text-[#D4AF37]">Programme de Compétence</p>
                <p className="mt-2 text-base text-[#C8C8CF]">
                  Ecosystem → Specialist → Manager → Director → Executive
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-5">
                <p className="text-sm uppercase tracking-[0.12em] text-[#D4AF37]">Advanced Programme</p>
                <p className="mt-2 text-base text-[#C8C8CF]">
                  Advanced Specialist → Advanced Manager → Advanced Director → Advanced Executive
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
