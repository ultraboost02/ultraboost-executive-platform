import { getXanoPublicBaseUrl } from "@/lib/xano/config";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function pathFromEnv(name: string, fallback: string): string {
  const p = env(name) || fallback;
  return p.startsWith("/") ? p : `/${p}`;
}

async function adminGet(path: string, token: string): Promise<{ ok: true; text: string } | { ok: false; status: number; text: string }> {
  const base = (process.env.XANO_SERVER_BASE_URL?.trim() || getXanoPublicBaseUrl()).replace(/\/$/, "");
  if (!base) return { ok: false, status: 500, text: "Xano non configuré." };
  const url = `${base}${path}`;
  const res = await fetch(url, { method: "GET", headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, cache: "no-store" });
  const text = await res.text();
  return res.ok ? { ok: true, text } : { ok: false, status: res.status, text };
}

export type AdminMe = { role?: string; email?: string; id?: string | number };

export async function fetchAdminMe(token: string): Promise<{ ok: true; data: AdminMe } | { ok: false; status: number; message: string }> {
  const path = pathFromEnv("XANO_ADMIN_ME_PATH", "/admin/me");
  const res = await adminGet(path, token);
  if (!res.ok) return { ok: false, status: res.status, message: res.text.slice(0, 240) };
  try {
    return { ok: true, data: (res.text ? JSON.parse(res.text) : {}) as AdminMe };
  } catch {
    return { ok: false, status: 502, message: "JSON admin/me invalide." };
  }
}

export async function fetchAdminAdmissions(token: string): Promise<{ ok: true; data: unknown[] } | { ok: false; status: number; message: string }> {
  const path = pathFromEnv("XANO_ADMIN_ADMISSIONS_PATH", "/admin/admissions");
  const res = await adminGet(path, token);
  if (!res.ok) return { ok: false, status: res.status, message: res.text.slice(0, 240) };
  try {
    const raw = res.text ? JSON.parse(res.text) : [];
    return { ok: true, data: Array.isArray(raw) ? raw : (raw?.items ?? raw?.data ?? []) };
  } catch {
    return { ok: false, status: 502, message: "JSON admissions invalide." };
  }
}

export async function fetchAdminRetraits(token: string): Promise<{ ok: true; data: unknown[] } | { ok: false; status: number; message: string }> {
  const path = pathFromEnv("XANO_ADMIN_RETRAITS_PATH", "/admin/retraits");
  const res = await adminGet(path, token);
  if (!res.ok) return { ok: false, status: res.status, message: res.text.slice(0, 240) };
  try {
    const raw = res.text ? JSON.parse(res.text) : [];
    return { ok: true, data: Array.isArray(raw) ? raw : (raw?.items ?? raw?.data ?? []) };
  } catch {
    return { ok: false, status: 502, message: "JSON retraits invalide." };
  }
}

export async function fetchAdminMembres(token: string): Promise<{ ok: true; data: unknown[] } | { ok: false; status: number; message: string }> {
  const path = pathFromEnv("XANO_ADMIN_MEMBRES_PATH", "/admin/membres");
  const res = await adminGet(path, token);
  if (!res.ok) return { ok: false, status: res.status, message: res.text.slice(0, 240) };
  try {
    const raw = res.text ? JSON.parse(res.text) : [];
    return { ok: true, data: Array.isArray(raw) ? raw : (raw?.items ?? raw?.data ?? []) };
  } catch {
    return { ok: false, status: 502, message: "JSON membres invalide." };
  }
}

