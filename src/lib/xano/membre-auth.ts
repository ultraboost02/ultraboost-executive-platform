import {
  getXanoMembreAuthLoginPath,
  getXanoPublicBaseUrl,
  isMembreLoginStub,
} from "./config";
import type { XanoMembreAuthLoginResponse } from "./member-types";

function extractJwtFromLoginBody(data: XanoMembreAuthLoginResponse): string | null {
  const direct =
    data.authToken ?? data.token ?? data.access_token ?? data.jwt ?? data.user?.authToken ?? null;
  return typeof direct === "string" && direct.length > 0 ? direct : null;
}

export type MembreLoginResult =
  | { ok: true; authToken: string }
  | { ok: false; status: number; error: string };

/**
 * Authentification membre auprès de Xano (email + mot de passe).
 */
export async function loginMembreWithXano(email: string, password: string): Promise<MembreLoginResult> {
  if (isMembreLoginStub()) {
    return { ok: false, status: 500, error: "MEMBRE_LOGIN_STUB activé : utiliser le flux stub via l'API route." };
  }

  const base = getXanoPublicBaseUrl();
  if (!base) {
    return { ok: false, status: 500, error: "NEXT_PUBLIC_XANO_API_URL manquant." };
  }

  const path = getXanoMembreAuthLoginPath();
  const url = `${base}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  let data: XanoMembreAuthLoginResponse = {};
  try {
    data = text ? (JSON.parse(text) as XanoMembreAuthLoginResponse) : {};
  } catch {
    return { ok: false, status: res.status, error: text.slice(0, 200) || "Réponse Xano invalide." };
  }

  if (!res.ok) {
    const msg =
      (data as { message?: string }).message ||
      (data as { error?: string }).error ||
      text.slice(0, 200) ||
      "Identifiants invalides.";
    return { ok: false, status: res.status, error: String(msg) };
  }

  const authToken = extractJwtFromLoginBody(data);
  if (!authToken) {
    return { ok: false, status: 502, error: "Xano n'a pas renvoyé de jeton (authToken / token)." };
  }

  return { ok: true, authToken };
}
