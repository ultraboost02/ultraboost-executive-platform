/**
 * Configuration centralisée pour l'API Xano.
 * Les secrets restent côté serveur (variables sans NEXT_PUBLIC_).
 */
export function getXanoPublicBaseUrl(): string {
  return process.env.NEXT_PUBLIC_XANO_API_URL?.replace(/\/$/, "") ?? "";
}

export function getXanoApiKey(): string {
  return process.env.XANO_API_KEY ?? "";
}

export function isXanoConfigured(): boolean {
  return Boolean(getXanoPublicBaseUrl() && getXanoApiKey());
}

/** POST — body JSON { email, password } attendu par Xano Auth ; réponse avec authToken (ou token). */
export function getXanoMembreAuthLoginPath(): string {
  const p = process.env.XANO_MEMBRE_AUTH_LOGIN_PATH?.trim() || "/auth/login";
  return p.startsWith("/") ? p : `/${p}`;
}

/** GET — Bearer JWT membre ; agrège le tableau de bord (saldes, filleuls, parrainage…). */
export function getXanoMembreDashboardPath(): string {
  const p = process.env.XANO_MEMBRE_DASHBOARD_PATH?.trim() || "/membre/dashboard";
  return p.startsWith("/") ? p : `/${p}`;
}

/** GET — liste commissions (table `commission` ou vue). */
export function getXanoMembreCommissionsPath(): string {
  const p = process.env.XANO_MEMBRE_COMMISSIONS_PATH?.trim() || "/membre/commissions";
  return p.startsWith("/") ? p : `/${p}`;
}

/** GET — liste demandes de retrait (table `retrait` / `withdrawal`). */
export function getXanoMembreRetraitsPath(): string {
  const p = process.env.XANO_MEMBRE_RETRAITS_PATH?.trim() || "/membre/retraits";
  return p.startsWith("/") ? p : `/${p}`;
}

/** POST — création d'une demande de retrait (par défaut même chemin que GET retraits). */
export function getXanoMembreRetraitCreatePath(): string {
  const p = process.env.XANO_MEMBRE_RETRAITS_CREATE_PATH?.trim() || getXanoMembreRetraitsPath();
  return p.startsWith("/") ? p : `/${p}`;
}

/**
 * Si true, /api/membre/login accepte email seul (cookie stub) — développement uniquement.
 * Sinon, login réel Xano + mot de passe obligatoire.
 */
export function isMembreLoginStub(): boolean {
  return process.env.MEMBRE_LOGIN_STUB === "true";
}
