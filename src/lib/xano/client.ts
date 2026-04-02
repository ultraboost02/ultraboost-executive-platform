import type { XanoRegistrationPayload } from "./types";
import { getXanoApiKey, getXanoPublicBaseUrl } from "./config";

/**
 * Client HTTP minimal pour Xano (Bearer token).
 * Remplacer `REGISTER_PATH` par le chemin réel de votre endpoint Xano.
 */
const REGISTER_PATH = "/auth/register";

export async function registerWithXano(
  payload: XanoRegistrationPayload
): Promise<{ ok: true } | { ok: false; status: number; body: string }> {
  const base = getXanoPublicBaseUrl();
  const key = getXanoApiKey();
  const url = `${base}${REGISTER_PATH}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    return { ok: false, status: res.status, body };
  }

  return { ok: true };
}
