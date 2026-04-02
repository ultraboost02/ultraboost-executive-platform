import crypto from "crypto";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function getXanoServerBaseUrl(): string {
  return (env("XANO_SERVER_BASE_URL") || env("NEXT_PUBLIC_XANO_API_URL")).replace(/\/$/, "");
}

export function getXanoServerApiKey(): string {
  return env("XANO_SERVER_API_KEY") || env("XANO_API_KEY");
}

export function isXanoServerConfigured(): boolean {
  return Boolean(getXanoServerBaseUrl() && getXanoServerApiKey());
}

export function interpolatePath(pathTemplate: string, vars: Record<string, string | number>): string {
  let out = pathTemplate;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, encodeURIComponent(String(v)));
  }
  return out;
}

export async function xanoServerFetch(
  path: string,
  init: Omit<RequestInit, "headers"> & { headers?: Record<string, string> } = {},
): Promise<{ ok: true; status: number; text: string } | { ok: false; status: number; text: string }> {
  const base = getXanoServerBaseUrl();
  const key = getXanoServerApiKey();
  if (!base || !key) {
    return { ok: false, status: 500, text: "Xano serveur non configuré (XANO_SERVER_BASE_URL/XANO_SERVER_API_KEY ou XANO_API_KEY)." };
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.headers ?? {}),
      Authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });
  const text = await res.text();
  return res.ok ? { ok: true, status: res.status, text } : { ok: false, status: res.status, text };
}

export function verifyPaystackSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader || !secret) return false;
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}

export function verifyWaveSignature(rawBody: string, waveSignatureHeader: string | null, secret: string): boolean {
  if (!waveSignatureHeader || !secret) return false;

  const parts = waveSignatureHeader.split(",").map((p) => p.trim());
  const timestampPart = parts.find((p) => p.startsWith("t="));
  const timestamp = timestampPart?.split("=", 2)[1];
  const signatures = parts
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.split("=", 2)[1])
    .filter(Boolean) as string[];

  if (!timestamp || signatures.length === 0) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - ts) > 5 * 60) return false;

  const computed = crypto.createHmac("sha256", secret).update(`${timestamp}${rawBody}`).digest("hex");

  for (const sig of signatures) {
    try {
      if (crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(sig))) return true;
    } catch {
      // continue
    }
  }

  return false;
}

