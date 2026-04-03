import { NextResponse } from "next/server";
import { getXanoPublicBaseUrl } from "@/lib/xano/config";

const COOKIE = "admin_token";
const MAX_AGE_SEC = 60 * 60 * 12;

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function pathFromEnv(name: string, fallback: string): string {
  const p = env(name) || fallback;
  return p.startsWith("/") ? p : `/${p}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });

  const base = (process.env.XANO_SERVER_BASE_URL?.trim() || getXanoPublicBaseUrl()).replace(/\/$/, "");
  if (!base) return NextResponse.json({ error: "Xano non configuré." }, { status: 500 });

  const loginPath = pathFromEnv("XANO_ADMIN_AUTH_LOGIN_PATH", "/admin/auth/login");
  const url = `${base}${loginPath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    // ignore
  }

  if (!res.ok) {
    const msg = data?.message || data?.error || "Connexion refusée.";
    return NextResponse.json({ error: String(msg) }, { status: res.status === 401 ? 401 : 502 });
  }

  const token =
    (typeof data?.authToken === "string" && data.authToken) ||
    (typeof data?.token === "string" && data.token) ||
    (typeof data?.access_token === "string" && data.access_token) ||
    (typeof data?.jwt === "string" && data.jwt) ||
    null;

  if (!token) return NextResponse.json({ error: "Xano n'a pas renvoyé de jeton admin." }, { status: 502 });

  const resp = NextResponse.json({ ok: true });
  resp.cookies.set(COOKIE, token, {
    path: "/",
    maxAge: MAX_AGE_SEC,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return resp;
}