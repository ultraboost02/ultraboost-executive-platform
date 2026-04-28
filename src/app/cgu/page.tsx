"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";

const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: "1. Présentation et objet",
    paragraphs: [
      "UltraBoost est une initiative stratégique et un programme d'excellence développé par l'IPMD (Institut Polytechnique des Métiers du Digital). Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités d'accès, d'inscription et d'utilisation des services proposés dans le cadre des programmes UltraBoost, incluant notamment les bootcamps exécutifs, les événements et les dispositifs d'accompagnement professionnel.",
    ],
  },
  {
    title: "2. Acceptation des conditions",
    paragraphs: [
      "Toute inscription ou participation à un programme UltraBoost implique l'adhésion pleine, entière et sans réserve aux présentes Conditions Générales d'Utilisation. Le participant reconnaît en avoir pris connaissance préalablement à toute validation.",
    ],
  },
  {
    title: "3. Nature des services",
    paragraphs: [
      "UltraBoost propose des programmes à forte valeur ajoutée destinés aux professionnels, dirigeants, cadres supérieurs et décideurs. Ces services incluent notamment : des bootcamps intensifs ; des sessions de mentorat stratégique ; des événements professionnels ; des dispositifs d'accompagnement à haute valeur.",
      "L'IPMD se réserve le droit d'adapter, d'enrichir ou de faire évoluer les contenus et formats à tout moment, dans une logique d'excellence continue.",
    ],
  },
  {
    title: "4. Modalités d'inscription et de paiement",
    paragraphs: [
      "L'inscription à un programme UltraBoost est considérée comme définitive après : la validation du formulaire d'inscription ; le règlement intégral des frais de participation.",
      "Les tarifs sont exprimés en francs CFA (FCFA) et peuvent être révisés sans préavis.",
    ],
  },
  {
    title: "5. Conditions financières et remboursement",
    paragraphs: [
      "Sauf disposition exceptionnelle expressément communiquée : les frais engagés sont fermes et non remboursables. En cas de situation exceptionnelle, UltraBoost pourra, à sa seule discrétion, proposer un report ou un avoir.",
    ],
  },
  {
    title: "6. Engagement du participant",
    paragraphs: [
      "Le participant s'engage à : fournir des informations exactes, complètes et à jour ; respecter les standards, règles et exigences des programmes ; adopter une posture professionnelle, respectueuse et conforme aux valeurs d'excellence portées par l'IPMD et UltraBoost.",
    ],
  },
  {
    title: "7. Propriété intellectuelle",
    paragraphs: [
      "L'ensemble des contenus, supports pédagogiques, outils et ressources diffusés dans le cadre des programmes UltraBoost demeure la propriété exclusive de l'IPMD. Toute reproduction, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite.",
    ],
  },
  {
    title: "8. Responsabilité",
    paragraphs: [
      "UltraBoost et l'IPMD s'engagent à mobiliser les meilleurs standards de qualité dans la conception et la délivrance des programmes. Toutefois, la responsabilité ne saurait être engagée quant aux résultats, performances ou impacts individuels découlant de la participation aux programmes.",
    ],
  },
  {
    title: "9. Données personnelles",
    paragraphs: [
      "Les données collectées dans le cadre des inscriptions sont strictement utilisées pour les besoins opérationnels et pédagogiques des programmes UltraBoost. Elles sont traitées avec un haut niveau de confidentialité et ne font l'objet d'aucune cession sans consentement préalable.",
    ],
  },
  {
    title: "10. Évolution des conditions",
    paragraphs: [
      "UltraBoost, sous l'égide de l'IPMD, se réserve le droit de modifier à tout moment les présentes Conditions Générales d'Utilisation afin de garantir leur adéquation avec les évolutions des services et du cadre réglementaire.",
    ],
  },
  {
    title: "11. Droit applicable",
    paragraphs: [
      "Les présentes Conditions Générales d'Utilisation sont régies par la législation en vigueur en République de Côte d'Ivoire.",
    ],
  },
  {
    title: "12. Contact",
    paragraphs: [
      "Pour toute question relative aux présentes Conditions Générales d'Utilisation ou aux services UltraBoost, vous pouvez contacter nos équipes à l'adresse suivante : infos@ultraboost.pro",
    ],
  },
];

export default function CguPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-10 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]/90">UltraBoost</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.1] text-[#D4AF37] sm:text-5xl" style={{ fontFamily: '"Playfair Display", serif' }}>
            Conditions Générales d&apos;Utilisation (CGU)
          </h1>
          <div className="divider-gold mt-8 max-w-xl" />
        </motion.section>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <motion.section
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.2) }}
            >
              <h2 className="text-lg font-semibold text-[#D4AF37]">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#C8C8CF] sm:text-base">
                {s.paragraphs.map((p, idx) => (
                  <p key={`${s.title}-${idx}`}>{p}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  );
}
