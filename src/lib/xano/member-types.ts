/**
 * Schéma cible des réponses JSON Xano pour l'espace membre.
 * Les noms de propriétés doivent correspondre aux sorties de vos endpoints Xano
 * (ou à un objet construit dans Xano qui mappe vos tables).
 *
 * Tables typiques (à aligner dans Xano) :
 * - membre / user : profil + stats agrégées
 * - commission : une ligne par commission
 * - retrait : une ligne par demande de retrait
 */

/** Réponse GET /membre/dashboard (ou équivalent). */
export type XanoMembreDashboard = {
  /** Solde disponible pour retrait, FCFA */
  balance_fcfa: number;
  /** Nombre de filleuls actifs (ou comptage réseau direct) */
  active_referrals_count: number;
  /** Libellé du rang (ex. "Argent", "Gold") */
  rank_label: string | null;
  /** Volume des ventes / CA généré sur la période courante, FCFA */
  period_sales_fcfa: number;
  /** Code parrain affichable */
  referral_code: string | null;
  /** URL complète à partager (peut être construite côté Xano) */
  referral_url: string | null;
  /** Optionnel — stats lien */
  link_clicks_count?: number | null;
  link_signups_count?: number | null;
  /** Optionnel — identité pour en-tête / profil */
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  /**
   * Niveau de suivi bootcamp (ex. ecosystem, specialist, manager, director, executive).
   * À renseigner côté Xano pour afficher l’accès communautaire / agenda personnalisé sur le tableau de bord.
   */
  bootcamp_track?: string | null;
};

/** Une ligne issue de la table commission (liste pour GET /membre/commissions). */
export type XanoMembreCommissionRow = {
  id: number | string;
  amount_fcfa: number;
  /** pending | paid | cancelled — adapter à vos valeurs ENUM Xano */
  status: string;
  created_at: string;
  /** Libellé produit / programme / source */
  label?: string | null;
  order_id?: string | null;
};

/** Une ligne issue de la table retrait / withdrawal. */
export type XanoMembreRetraitRow = {
  id: number | string;
  amount_fcfa: number;
  /** pending | approved | paid | rejected */
  status: string;
  requested_at: string;
  processed_at?: string | null;
  payment_method_label?: string | null;
  admin_note?: string | null;
};

/** Réponse POST auth login membre — Xano renvoie souvent authToken. */
export type XanoMembreAuthLoginResponse = {
  authToken?: string;
  token?: string;
  access_token?: string;
  jwt?: string;
  /** Parfois Xano renvoie l'utilisateur avec le token à l'intérieur */
  user?: { authToken?: string };
};
