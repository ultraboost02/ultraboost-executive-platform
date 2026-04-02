import { NextResponse } from "next/server";
import { requireAdminTokenOrRedirect } from "@/lib/admin/server-session";
import { fetchAdminMe } from "@/lib/xano/admin-api";
import { xanoServerFetch } from "@/lib/xano/server-client";

function isAllowedRole(role: unknown): boolean {
  const r = String(role ?? "").toLowerCase();
  return r === "super_admin" || r === "admin";
}

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export async function POST(request: Request) {
  const token = await requireAdminTokenOrRedirect();
  const me = await fetchAdminMe(token);
  if (!me.ok || !isAllowedRole(me.data.role)) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const form = await request.formData().catch(() => null);
  const body = form
    ? Object.fromEntries(form.entries())
    : ((await request.json().catch(() => ({}))) as Record<string, unknown>);

  const retrait_id = String(body.retrait_id ?? "").trim();
  if (!retrait_id) return NextResponse.json({ error: "retrait_id requis." }, { status: 400 });

  // Endpoint admin Xano à prévoir : ex. POST /admin/retraits/{id}/approve
  const approvePathTpl = env("XANO_ADMIN_RETRAIT_APPROVE_PATH") || "/admin/retraits/{id}/approve";
  const approvePath = approvePathTpl.replace("{id}", encodeURIComponent(retrait_id));
  await xanoServerFetch(approvePath, { method: "POST" });

  return NextResponse.redirect(new URL("/admin", request.url));
}

