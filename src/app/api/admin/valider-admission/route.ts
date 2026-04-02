import { NextResponse } from "next/server";
import { requireAdminTokenOrRedirect } from "@/lib/admin/server-session";
import { fetchAdminMe } from "@/lib/xano/admin-api";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { interpolatePath, xanoServerFetch } from "@/lib/xano/server-client";

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

  const admission_id = body.admission_id;
  const candidate_email = String(body.candidate_email ?? "").trim();
  const candidate_first_name = String(body.candidate_first_name ?? "").trim();

  const paystackLink = String(body.paystack_payment_link ?? body.paystackLink ?? "").trim() || "LIEN PAYSTACK";

  if (!admission_id) return NextResponse.json({ error: "admission_id requis." }, { status: 400 });
  if (!candidate_email) return NextResponse.json({ error: "candidate_email requis." }, { status: 400 });

  const admissionUpdatePath = env("XANO_ADMISSION_UPDATE_PATH") || "/admissions/{id}";
  await xanoServerFetch(interpolatePath(admissionUpdatePath, { id: String(admission_id) }), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "validee", validated_at: new Date().toISOString(), paystack_payment_link: paystackLink }),
  });

  if (isEmailConfigured()) {
    const subject = "Votre demande UltraBoost est acceptée";
    const text =
      `Félicitations ${candidate_first_name || ""} ! Votre demande a été acceptée.\n\n` +
      `Voici votre lien de paiement : ${paystackLink}\n\n` +
      `Après paiement, vos accès seront activés sous 48 heures.\n`;
    try {
      await sendEmail({ to: candidate_email, subject, text });
    } catch {
      // ignore
    }
  }

  return NextResponse.redirect(new URL("/admin", request.url));
}

