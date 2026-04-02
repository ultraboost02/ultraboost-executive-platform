export type UltraBootcampItem = {
  title: string;
  /** `null` pour les modules logiciels (APPLICATIONS) ou tarif non communiqué */
  hours: number | null;
  priceFcfa: number | null;
};

export type UltraBootcampSection = {
  id: string;
  levelLabel: string;
  sectionTitle: string;
  sectionSummary: string;
  items: UltraBootcampItem[];
};

const ecosystemItems: UltraBootcampItem[] = [
  { title: "Automatisation vente WhatsApp", hours: 9, priceFcfa: 145_800 },
  { title: "Dactylographie", hours: 18, priceFcfa: 185_000 },
  { title: "Écosystème Digital & IA", hours: 25, priceFcfa: 385_000 },
  {
    title: "Automatisation Force de vente & Stratégie IA",
    hours: 20,
    priceFcfa: 385_000,
  },
  { title: "Vente en ligne", hours: 20, priceFcfa: 385_000 },
  { title: "Écosystème Marketing Digital", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème E-Commerce", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème Communication Digitale", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème E-Business", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème Cybersécurité", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème Développement d'Applications", hours: 25, priceFcfa: 385_000 },
  {
    title: "Écosystème Management de Projets Digitaux & IA",
    hours: 25,
    priceFcfa: 385_000,
  },
  { title: "Écosystème Graphisme & Design Digital", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème Droit du Numérique & Éthique", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème FinTech", hours: 25, priceFcfa: 385_000 },
  { title: "Écosystème InsurTech", hours: 30, priceFcfa: 485_000 },
  { title: "Écosystème AgriTech", hours: 30, priceFcfa: 485_000 },
  { title: "Écosystème EdTech", hours: 30, priceFcfa: 485_000 },
  { title: "Écosystème HealthTech", hours: 30, priceFcfa: 485_000 },
  { title: "Écosystème PropTech", hours: 30, priceFcfa: 485_000 },
  { title: "Écosystème GreenTech", hours: 30, priceFcfa: 485_000 },
  { title: "Écosystème LogTech", hours: 30, priceFcfa: 485_000 },
];

const applicationItems: UltraBootcampItem[] = [
  { title: "HubSpot", hours: 20, priceFcfa: 285_000 },
  { title: "Zoho CRM", hours: 20, priceFcfa: 285_000 },
  { title: "Salesforce", hours: 25, priceFcfa: 385_000 },
  { title: "Pipedrive", hours: 18, priceFcfa: 255_000 },
  { title: "Bitrix24", hours: 18, priceFcfa: 255_000 },
  { title: "WhatsApp Business API", hours: 12, priceFcfa: 195_000 },
  { title: "Slack", hours: 9, priceFcfa: 145_000 },
  { title: "Zoom", hours: 9, priceFcfa: 145_000 },
  { title: "Microsoft Teams", hours: 12, priceFcfa: 175_000 },
  { title: "Stripe", hours: 15, priceFcfa: 225_000 },
  { title: "Paystack", hours: 12, priceFcfa: 195_000 },
  { title: "WordPress", hours: 25, priceFcfa: 385_000 },
  { title: "Shopify", hours: 20, priceFcfa: 345_000 },
  { title: "Mailchimp", hours: 15, priceFcfa: 225_000 },
  { title: "ChatGPT", hours: 15, priceFcfa: 255_000 },
  { title: "Zapier", hours: 15, priceFcfa: 255_000 },
  { title: "Make", hours: 15, priceFcfa: 255_000 },
  { title: "Notion", hours: 12, priceFcfa: 195_000 },
  { title: "Microsoft Excel", hours: 25, priceFcfa: 285_000 },
  { title: "Google Sheets", hours: 18, priceFcfa: 225_000 },
];

const specialistTitles = [
  "Marketing Digital & Stratégie IA",
  "Marketing des IA",
  "E-Commerce & Stratégie IA",
  "Communication Digitale & Stratégie IA",
  "Design & Graphisme Digital",
  "UX/UI & Produits Numériques",
  "Développement de Sites Web",
  "Développement d'Applications Mobiles",
  "Cloud & DevOps",
  "Droit du Digital & IA",
  "Data & Analyse",
  "FinTech",
  "Cybersécurité",
  "Intelligence Artificielle",
];

const managerTitles = [
  "Management de Projet Digital & Stratégie IA",
  "Management de Projet E-business",
  "Management Fintech & InsurTech",
  "Management Disruption",
  "Management Digital Business Marketing & Communication",
  "Management Développement Technologique & Innovation",
  "Management Design & Expérience Utilisateur",
  "Management Digital IA & Conformité",
  "Management Technologies Sectorielles",
  "Management FinTech",
  "Management InsurTech",
  "Management AgriTech",
  "Management EdTech",
  "Management HealthTech",
  "Management PropTech",
  "Management GreenTech",
  "Management LogTech",
];

const directorTitles = [
  "Director Digital & Stratégie IA",
  "Director Data & IA",
  "Gouvernance Disruption & Stratégie IA",
  "Director Finance & Assurance",
  "Pilotage Digital E-Business",
  "Pilotage Sécurité & Conformité",
  "Pilotage Data & IA",
  "Pilotage Fintech & InsurTech",
  "Pilotage AgriTech",
  "Pilotage EdTech",
  "Pilotage HealthTech",
  "Pilotage PropTech",
  "Pilotage GreenTech",
];

const executiveTitles = [
  "Gouvernance Digitale & Stratégie IA",
  "Transformation Digitale & Stratégie IA",
  "Gouvernance Digital Business & Stratégie IA",
  "Gouvernance des Disruptions & Stratégies IA",
  "Gouvernance de la Cybersécurité",
  "Gouvernance du Droit du Digital IA & Éthique",
  "Gouvernance des Technologies",
  "Digital Business & Stratégie IA",
];

function mapUniform(titles: string[], hours: number, priceFcfa: number | null): UltraBootcampItem[] {
  return titles.map((title) => ({ title, hours, priceFcfa }));
}

export const ULTRA_BOOTCAMP_SECTIONS: UltraBootcampSection[] = [
  {
    id: "ecosystem",
    levelLabel: "ECOSYSTEM",
    sectionTitle: "Vision & Environnement Digital",
    sectionSummary: "22 bootcamps",
    items: ecosystemItems,
  },
  {
    id: "applications",
    levelLabel: "APPLICATIONS",
    sectionTitle: "Logiciels & Outils",
    sectionSummary: "20 logiciels",
    items: applicationItems,
  },
  {
    id: "specialist",
    levelLabel: "SPECIALIST",
    sectionTitle: "Expertise Métier",
    sectionSummary: "545 000 FCFA — 42h — 14 bootcamps",
    items: mapUniform(specialistTitles, 42, 545_000),
  },
  {
    id: "manager",
    levelLabel: "MANAGER",
    sectionTitle: "Management de Projets",
    sectionSummary: "1 345 000 FCFA — 42h — 17 bootcamps",
    items: mapUniform(managerTitles, 42, 1_345_000),
  },
  {
    id: "director",
    levelLabel: "DIRECTOR",
    sectionTitle: "Pilotage & Administration",
    sectionSummary: "1 285 000 FCFA — 42h — 13 bootcamps",
    items: mapUniform(directorTitles, 42, 1_285_000),
  },
  {
    id: "executive",
    levelLabel: "EXECUTIVE",
    sectionTitle: "Gouvernance & Vision",
    sectionSummary: "1 850 000 FCFA — 48h — 8 bootcamps",
    items: mapUniform(executiveTitles, 48, 1_850_000),
  },
];

/** Onglets Home : 6 niveaux (ECOSYSTEM → EXECUTIVE) */
export const ULTRA_BOOTCAMP_TABS = ULTRA_BOOTCAMP_SECTIONS.map((s) => ({
  id: s.id,
  label: s.levelLabel,
  sectionTitle: s.sectionTitle,
  sectionSummary: s.sectionSummary,
  items: s.items,
}));

export const ULTRA_BOOTCAMP_FORMATS = "Distance | Présentiel | Hybride | VIP";
