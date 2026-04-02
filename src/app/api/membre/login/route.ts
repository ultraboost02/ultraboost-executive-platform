import { NextResponse } from "next/server";
import { isMembreLoginStub } from "@/lib/xano/config";
import { loginMembreWithXano } from "@/lib/xano/membre-auth";

const COOKIE_NAME = "token";
const MAX_AGE_SEC = 60 * 60 * 24 * 14;

function setMembreCookie(res: NextResponse, value: string) {
  res.cookies.set(COOKIE_NAME, value, {
    path: "/",
    maxAge: MAX_AGE_SEC,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Connexion espace membre.
 * - MEMBRE_LOGIN_STUB=true : cookie `ub_stub:` (email uniquement, hors Xano).
 * - Sinon : POST Xano (XANO_MEMBRE_AUTH_LOGIN_PATH), cookie = JWT renvoyé.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email professionnel requis." }, { status: 400 });
  }

  if (isMembreLoginStub()) {
    const res = NextResponse.json({ ok: true, mode: "stub" });
    setMembreCookie(res, `ub_stub:${encodeURIComponent(email)}`);
    return res;
  }

  if (!password) {
    return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
  }

  const result = await loginMembreWithXano(email, password);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status === 401 ? 401 : 502 });
  }

  const res = NextResponse.json({ ok: true, mode: "xano" });
  setMembreCookie(res, result.authToken);
  return res;
}
