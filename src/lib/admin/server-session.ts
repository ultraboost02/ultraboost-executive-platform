import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "admin_token";

export async function getAdminTokenFromCookies(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value ?? null;
}

export async function requireAdminTokenOrRedirect(): Promise<string> {
  const t = await getAdminTokenFromCookies();
  if (!t) redirect("/admin/login");
  return t;
}

