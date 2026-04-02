/** Calendrier janvier → novembre (décembre exclu). Année de référence pour l’admin / rappels. */
export const ULTRA_BOOTCAMP_AGENDA_YEAR = 2026;

export type AgendaCalendarRow = {
  month: string;
  /** 0 = janvier … 10 = novembre */
  monthIndex: number;
  specialist: number;
  manager: number;
  director: number;
  executive: number;
  general: number;
};

/**
 * Dates internes (back-office / API / comptes membres).
 * Non affichées sur la vue publique — voir AGENDA_PUBLIC_STRUCTURE.
 */
export const ULTRA_BOOTCAMP_AGENDA_MONTHS: AgendaCalendarRow[] = [
  { month: "Janvier", monthIndex: 0, specialist: 13, manager: 14, director: 15, executive: 22, general: 21 },
  { month: "Février", monthIndex: 1, specialist: 17, manager: 18, director: 12, executive: 26, general: 25 },
  { month: "Mars", monthIndex: 2, specialist: 17, manager: 18, director: 12, executive: 26, general: 25 },
  { month: "Avril", monthIndex: 3, specialist: 14, manager: 15, director: 16, executive: 23, general: 22 },
  { month: "Mai", monthIndex: 4, specialist: 19, manager: 13, director: 14, executive: 28, general: 27 },
  { month: "Juin", monthIndex: 5, specialist: 16, manager: 17, director: 18, executive: 25, general: 24 },
  { month: "Juillet", monthIndex: 6, specialist: 14, manager: 15, director: 16, executive: 30, general: 29 },
  { month: "Août", monthIndex: 7, specialist: 18, manager: 19, director: 13, executive: 27, general: 26 },
  { month: "Septembre", monthIndex: 8, specialist: 15, manager: 16, director: 17, executive: 24, general: 23 },
  { month: "Octobre", monthIndex: 9, specialist: 13, manager: 14, director: 15, executive: 29, general: 21 },
  { month: "Novembre", monthIndex: 10, specialist: 17, manager: 18, director: 19, executive: 26, general: 25 },
];

export type AgendaTrackKey = "general" | "specialist" | "manager" | "director" | "executive";

/** Affichage public : jour + fenêtre du mois (sans date exacte). */
export const AGENDA_PUBLIC_STRUCTURE: Record<
  AgendaTrackKey,
  { dayLabel: string; periodLabel: string }
> = {
  general: {
    dayLabel: "Mercredi",
    periodLabel: "Entre le 20 et le 30 de chaque mois",
  },
  specialist: {
    dayLabel: "Mardi",
    periodLabel: "Entre le 10 et le 20 de chaque mois",
  },
  manager: {
    dayLabel: "Mercredi",
    periodLabel: "Entre le 11 et le 20 de chaque mois",
  },
  director: {
    dayLabel: "Jeudi",
    periodLabel: "Entre le 10 et le 19 de chaque mois",
  },
  executive: {
    dayLabel: "Jeudi",
    periodLabel: "Entre le 20 et le 30 de chaque mois",
  },
};

export const AGENDA_TRACK_META: Record<
  AgendaTrackKey,
  { label: string; branding: string; audience: string }
> = {
  general: {
    label: "Agenda général",
    branding: "Écosystème & networking massif",
    audience:
      "Ouvert à tous les professionnels, entrepreneurs, dirigeants, salariés en transition et acteurs du terrain — Écosystèmes & Applications.",
  },
  specialist: {
    label: "Agenda Specialist",
    branding: "Expertise & Tech",
    audience: "Experts métiers, ingénieurs, chefs de produit, consultants techniques et talents « hands-on ».",
  },
  manager: {
    label: "Agenda Manager",
    branding: "Leadership & opérationnel",
    audience: "Managers de projet, responsables d'équipe, opérationnels et leaders intermédiaires.",
  },
  director: {
    label: "Agenda Director",
    branding: "Stratégie & pilotage",
    audience:
      "Directions, administrateurs de programmes, pilotes de transformation et décideurs inter-pôles.",
  },
  executive: {
    label: "Agenda Executive",
    branding: "Vision & pouvoir décisionnel",
    audience: "Entrepreneurs, PDG, CEO, cadres d'État, présidents d'institutions et visionnaires.",
  },
};

/**
 * Formats d’événement STRICTEMENT par niveau — aucun débordement croisé
 * (ex. « Journée des directeurs » uniquement côté director).
 */
export const AGENDA_EVENT_FORMATS_BY_TRACK: Record<AgendaTrackKey, readonly string[]> = {
  general: [
    "Master Class",
    "Apéro « SIP & MEET »",
    "Rencontre d'intelligence",
    "Afterwork networking",
    "Journée intellectuelle",
    "Journée philosophique",
    "Journée des chercheurs",
    "Soft skills & impact",
    "Table ronde ouverte — digital & IA",
    "Session veille innovation & disruption",
    "Networking communautaire large",
  ],
  specialist: [
    "Master Class Expert & Tech",
    "Apéro « SIP & MEET » — segment Expert",
    "Lab technique & démonstration live",
    "Rencontre d'intelligence — stacks & veille",
    "Afterwork networking Expert",
    "Journée des specialist",
    "Atelier architectures, cloud & intégration",
    "Open micro — craft, qualité & industrialisation",
    "Session sécurité applicative & DevSecOps",
    "Atelier data engineering & mise en production IA",
    "Soft skills — influence équipes tech",
  ],
  manager: [
    "Master Class Leadership & opérations",
    "Apéro opérationnel « SIP & MEET »",
    "Atelier pilotage agile, OKR & delivery",
    "Rencontre d'intelligence — performance & équipes",
    "Afterwork networking Managers",
    "Journée des Managers",
    "Session conduite du changement terrain",
    "Coaching collectif opérationnel",
    "Atelier budgétisation & arbitrage achats tech",
    "Alignment marketing — ops — IT",
    "Soft skills — posture managériale",
  ],
  director: [
    "Master Class Stratégie & pilotage",
    "Conseil restreint & arbitrage digital",
    "Journée des directeurs",
    "Rencontre d'intelligence — investissement & transformation",
    "Afterwork networking Direction",
    "Table ronde marchés digitaux & disruption",
    "Session smart territories & infrastructures critiques",
    "Atelier gouvernance data, risques & conformité",
    "Pilotage de portefeuilles projets digital",
    "Veille concurrentielle & scénarios macro",
    "Networking stratégique restreint",
  ],
  executive: [
    "Sommet privé Executive",
    "Master Class Vision & pouvoir décisionnel",
    "Journée Executive",
    "Dîner stratégique — cercle restreint",
    "Rencontre d'intelligence — souveraineté numérique",
    "Afterwork cercle décisionnel",
    "Mission diplomatique & business digital global",
    "Club prospective géopolitique & tech",
    "Session boards & comités stratégiques numériques",
    "Dialogue présidents, entrepreneurs & influence",
    "Soft power, marques & réseaux d’élite",
  ],
};

export const AGENDA_GENERAL_THEMES = [
  "IA générative, automatisation & productivité responsable",
  "Innovation ouverte, startups & corporates : co-création terrain",
  "Cybersécurité, souveraineté numérique & conformité",
  "Disruption des modèles économiques & nouvelles liquidités",
  "Smart cities, infrastructures & villes intelligentes",
  "Marchés digitaux afro-globaux & scale internationale",
  "GreenTech, mesure d'impact & finance durable",
  "Culture data, décision augmentée & gouvernance des algorithmes",
  "Communication, réputation & gestion de crise numérique",
  "Platforms, écosystèmes & stratégie de partenariats",
  "Prospective : veille techno & signaux faibles",
] as const;

export const AGENDA_SPECIALIST_THEMES = [
  "Stacks métiers, craft technique & industrialisation",
  "Produit, UX et performance système",
  "Cloud, intégration & architecture logicielle",
  "Data engineering & mise en production IA",
  "Sécurité applicative & DevSecOps",
  "Automatisation marketing & growth engineering",
  "Design systems & accessibilité numérique",
  "Veille techno ciblée & expérimentation rapide",
  "Collaboration produit / tech / business",
  "Open innovation & labs internes",
  "Culture d'excellence opérationnelle",
] as const;

export const AGENDA_MANAGER_THEMES = [
  "Pilotage agile à l'échelle & OKR",
  "Management hybride & engagement d'équipe",
  "Processus, qualité & delivery sous contrainte",
  "Budgets, achats tech & arbitrage fournisseurs",
  "Conduite du changement terrain",
  "Performance commerciale & alignment marketing-ops",
  "Gestion des risques opérationnels digitaux",
  "Talents, carrières & montée en compétences",
  "Transformation lean & excellence opérationnelle",
  "Mesure de la valeur & tableaux de bord décisionnels",
  "Collaboration inter-silos & communication managériale",
] as const;

export const AGENDA_DIRECTOR_THEMES = [
  "Investissement stratégique & allocation de capital digital",
  "Pilotage de la transformation & portefeuilles de projets",
  "Stratégie IA, données et conformité",
  "Stratégie disruption & anticipation des modèles alternatifs",
  "Innovation corporate & partenariats ecosystem",
  "Marchés digitaux, expansion & intelligence concurrentielle",
  "Villes intelligentes, infrastructures critiques & smart services",
  "Business digital : monetization, plateformes & nouvelles offres",
  "Gouvernance des organisations tech-intensive",
  "Alignement ExCom / métiers / DSI",
  "Scénarios macro & résilience stratégique",
] as const;

export const AGENDA_EXECUTIVE_THEMES = [
  "Investissement souverain, M&A tech & alliances de pouvoir",
  "Gouvernance des boards & comités stratégiques numériques",
  "Leadership d'influence, conviction & légitimité",
  "Transformation digitale d'entreprise & trajectoire 360°",
  "Stratégie IA : vision long terme & éthique décisionnelle",
  "Stratégie disruption : anticiper les ruptures systémiques",
  "Innovation de rupture & capital intellectuel",
  "Marchés digitaux globaux & diplomatie économique",
  "Smart territories & souveraineté des infrastructures",
  "Business digital au sommet : marques, réseaux & soft power",
  "Agenda personnalisé dirigeants & cercles décisionnels",
] as const;

export function agendaTrackFromBootcampLevel(levelId: string): AgendaTrackKey {
  if (levelId === "ecosystem" || levelId === "applications") return "general";
  if (levelId === "specialist") return "specialist";
  if (levelId === "manager") return "manager";
  if (levelId === "director") return "director";
  if (levelId === "executive") return "executive";
  return "general";
}

/** Logique produit : filtrage des accès (back à implémenter côté API). */
export function agendaAccessMode(track: AgendaTrackKey): "open" | "validated" {
  if (track === "director" || track === "executive") return "validated";
  return "open";
}

export function agendaDayForTrack(row: AgendaCalendarRow, track: AgendaTrackKey): number {
  switch (track) {
    case "general":
      return row.general;
    case "specialist":
      return row.specialist;
    case "manager":
      return row.manager;
    case "director":
      return row.director;
    case "executive":
      return row.executive;
    default:
      return row.general;
  }
}

export function agendaEventFormat(monthIndex: number, track: AgendaTrackKey): string {
  const list = AGENDA_EVENT_FORMATS_BY_TRACK[track];
  return list[monthIndex % list.length] ?? list[0]!;
}

export function agendaThemeLine(monthIndex: number, track: AgendaTrackKey): string {
  const idx = monthIndex % 11;
  switch (track) {
    case "general":
      return AGENDA_GENERAL_THEMES[idx] ?? AGENDA_GENERAL_THEMES[0];
    case "specialist":
      return AGENDA_SPECIALIST_THEMES[idx] ?? AGENDA_SPECIALIST_THEMES[0];
    case "manager":
      return AGENDA_MANAGER_THEMES[idx] ?? AGENDA_MANAGER_THEMES[0];
    case "director":
      return AGENDA_DIRECTOR_THEMES[idx] ?? AGENDA_DIRECTOR_THEMES[0];
    case "executive":
      return AGENDA_EXECUTIVE_THEMES[idx] ?? AGENDA_EXECUTIVE_THEMES[0];
    default:
      return AGENDA_GENERAL_THEMES[0];
  }
}
