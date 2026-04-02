/**
 * Types alignés sur un futur endpoint Xano (inscription / profil).
 * Adapter les champs aux noms de colonnes de votre base Xano.
 */
export type XanoRegistrationPayload = {
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  /** Âge calculé côté serveur (doublon de contrôle côté Xano si besoin) */
  age: number;
};

export type XanoApiError = {
  message: string;
  code?: string;
};
