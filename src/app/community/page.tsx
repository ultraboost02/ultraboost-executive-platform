"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UltraBoostCommunitySection } from "@/components/community/UltraBoostCommunitySection";

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <h1
            className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            UltraBoost Community
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#C8C8CF] sm:text-lg">
            Rejoignez une communauté de professionnels. Développez votre réseau, accédez à des opportunités.
          </p>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <UltraBoostCommunitySection showSectionLead={false} />
      </main>

      <SiteFooter />
    </div>
  );
}
