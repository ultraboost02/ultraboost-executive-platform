import {
  getXanoMembreCommissionsPath,
  getXanoMembreDashboardPath,
  getXanoMembreRetraitsPath,
  getXanoPublicBaseUrl,
} from "./config";
import type { XanoMembreCommissionRow, XanoMembreDashboard, XanoMembreRetraitRow } from "./member-types";

export type MembreFetchError = { ok: false; status: number; message: string };
export type MembreFetchOk<T> = { ok: true; data: T };

function bearerHeaders(token: string): HeadersInit {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function getJson<T>(path: string, token: string): Promise<MembreFetchOk<T> | MembreFetchError> {
  const base = getXanoPublicBaseUrl();
  if (!base) {
    return { ok: false, status: 500, message: "NEXT_PUBLIC_XANO_API_URL manquant." };
  }
  const url = `${base}${path}`;
  const res = await fetch(url, { method: "GET", headers: bearerHeaders(token), cache: "no-store" });
  const text = await res.text();
  if (!res.ok) {
    return { ok: false, status: res.status, message: text.slice(0, 300) || `HTTP ${res.status}` };
  }
  try {
    return { ok: true, data: (text ? JSON.parse(text) : {}) as T };
  } catch {
    return { ok: false, status: 502, message: "JSON invalide depuis Xano." };
  }
}

function normalizeList<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object" && "items" in raw && Array.isArray((raw as { items: unknown }).items)) {
    return (raw as { items: T[] }).items;
  }
  if (raw && typeof raw === "object" && "data" in raw && Array.isArray((raw as { data: unknown }).data)) {
    return (raw as { data: T[] }).data;
  }
  return [];
}

export async function fetchMembreDashboard(
  token: string,
): Promise<MembreFetchOk<XanoMembreDashboard> | MembreFetchError> {
  return getJson<XanoMembreDashboard>(getXanoMembreDashboardPath(), token);
}

export async function fetchMembreCommissions(
  token: string,
): Promise<MembreFetchOk<XanoMembreCommissionRow[]> | MembreFetchError> {
  const res = await getJson<unknown>(getXanoMembreCommissionsPath(), token);
  if (!res.ok) return res;
  return { ok: true, data: normalizeList<XanoMembreCommissionRow>(res.data) };
}

export async function fetchMembreRetraits(
  token: string,
): Promise<MembreFetchOk<XanoMembreRetraitRow[]> | MembreFetchError> {
  const res = await getJson<unknown>(getXanoMembreRetraitsPath(), token);
  if (!res.ok) return res;
  return { ok: true, data: normalizeList<XanoMembreRetraitRow>(res.data) };
}
