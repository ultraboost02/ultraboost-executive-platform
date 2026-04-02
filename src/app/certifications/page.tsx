"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const fundamentale = [
  { level: "Écosystème", cert: "Digital Awareness Certificate" },
  { level: "Specialist", cert: "Professional Certificate" },
  { level: "Manager", cert: "Project Lead Certificate" },
  { level: "Director", cert: "Executive Diploma" },
  { level: "Executive", cert: "Global Executive Fellowship" },
];

const professionnelle = [
  { level: "Écosystème", cert: "Elite Digital Awareness" },
  { level: "Specialist", cert: "Elite Specialty" },
  { level: "Manager", cert: "Elite Management" },
  { level: "Director", cert: "Elite Director Certificate" },
  { level: "Executive", cert: "Elite Executive Fellowship" },
];

const levelToBadge: Record<string, string> = {
  Écosystème: "ecosystem",
  Specialist: "specialist",
  Manager: "manager",
  Director: "director",
  Executive: "executive",
};

export default function CertificationsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <section className="mb-14">
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-6xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Programme de Compétences & Certifications
          </h1>
          <div className="divider-gold mt-6 max-w-2xl" />
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7"
          >
            <h2 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Certification Fondamentale & Certification Professionnelle
            </h2>
            <ul className="mt-6 space-y-4">
              {fundamentale.map((row) => (
                <li
                  key={row.level}
                  className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="badge-level w-fit" data-level={levelToBadge[row.level] ?? "executive"}>
                    {row.level}
                  </span>
                  <span className="text-sm text-[#C8C8CF]">{row.cert}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7"
          >
            <h2 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Programme Avancé & Elite
            </h2>
            <p className="mt-2 text-sm text-[#9999A9]">Parcours Elite — standards internationaux</p>
            <ul className="mt-6 space-y-4">
              {professionnelle.map((row) => (
                <li
                  key={row.level}
                  className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="badge-level w-fit" data-level={levelToBadge[row.level] ?? "executive"}>
                    {row.level}
                  </span>
                  <span className="text-sm text-[#C8C8CF]">{row.cert}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
