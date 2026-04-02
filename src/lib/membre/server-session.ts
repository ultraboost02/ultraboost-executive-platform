import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "token";

/** Jetons de démo (sans appel Xano). */
export function isMembreStubToken(token: string): boolean {
  return token.startsWith("ub_stub:") || token.startsWith("membre:");
}

export async function getMembreTokenFromCookies(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

export async function requireMembreTokenOrRedirect(): Promise<string> {
  const t = await getMembreTokenFromCookies();
  if (!t) redirect("/membre/login");
  return t;
}
