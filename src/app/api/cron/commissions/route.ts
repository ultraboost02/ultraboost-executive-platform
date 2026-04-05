import { NextRequest, NextResponse } from "next/server";
import { interpolatePath, xanoServerFetch } from "@/lib/xano/server-client";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function isAuthorized(req: NextRequest): boolean {
  const secret = env("CRON_SECRET");
  if (!secret) return false;
  const auth = req.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

function daysSince(iso: string): number | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const listPath = env("XANO_COMMISSIONS_LIST_PENDING_PATH") || "/commissions?status=en_attente";
  const updateTpl = env("XANO_COMMISSION_UPDATE_PATH") || "/commissions/{id}";

  const listRes = await xanoServerFetch(listPath, { method: "GET" });
  if (!listRes.ok) return NextResponse.json({ error: "Xano list failed", detail: listRes.text.slice(0, 500) }, { status: 502 });

  let rows: unknown[] = [];
  try {
    const raw = listRes.text ? JSON.parse(listRes.text) : [];
    rows = Array.isArray(raw) ? raw : (raw?.items ?? raw?.data ?? []);
  } catch {
    return NextResponse.json({ error: "Bad JSON from Xano" }, { status: 502 });
  }

  const updated: Array<string | number> = [];
  for (const row of rows) {
    const r = row as Record<string, unknown>;
    const created = String(r.created_at ?? r.createdAt ?? "");
    const ageDays = daysSince(created);
    if (ageDays == null || ageDays <= 10) continue;
    const rawId = r.id;
    if (rawId == null || (typeof rawId !== "string" && typeof rawId !== "number")) continue;
    const id = rawId;
    const path = interpolatePath(updateTpl, { id });
    const upd = await xanoServerFetch(path, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "validee", validated_at: new Date().toISOString() }),
    });
    if (upd.ok) updated.push(id);
  }

  return NextResponse.json({ ok: true, scanned: rows.length, updated_count: updated.length, updated });
}
