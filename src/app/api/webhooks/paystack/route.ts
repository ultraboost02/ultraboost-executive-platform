/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import {
  interpolatePath,
  verifyPaystackSignature,
  xanoServerFetch,
} from "@/lib/xano/server-client";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

type PaystackEvent = {
  event?: string;
  data?: {
    amount?: number;
    customer?: { email?: string };
    metadata?: Record<string, unknown>;
    reference?: string;
    paid_at?: string;
    status?: string;
  };
};

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("x-paystack-signature");
  const secret = env("PAYSTACK_SECRET_KEY");

  if (!verifyPaystackSignature(raw, sig, secret)) {
    return NextResponse.json({ error: "Signature invalide." }, { status: 401 });
  }

  let event: PaystackEvent = {};
  try {
    event = raw ? (JSON.parse(raw) as PaystackEvent) : {};
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  if (event.event !== "charge.success") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const data = event.data ?? {};
  const md = (data.metadata ?? {}) as Record<string, unknown>;

  const admissionId = md.admission_id ?? md.admissionId ?? md.admission;
  const userId = md.user_id ?? md.userId ?? md.user;
  const parrainId = md.parrain_id ?? md.sponsor_id ?? md.referrer_id ?? null;
  const firstName = String(md.first_name ?? md.firstname ?? "").trim();
  const email = String(md.email ?? data.customer?.email ?? "").trim();
  const reference = String(data.reference ?? "").trim();

  const amountKobo = Number(data.amount ?? 0);
  const amountFcfa = Math.round(amountKobo / 100);

  const commissionExists = await hasExistingCommission({ admissionId, reference });

  const admissionUpdatePath = env("XANO_ADMISSION_UPDATE_PATH") || "/admissions/{id}";
  if (admissionId != null) {
    await xanoServerFetch(
      interpolatePath(admissionUpdatePath, { id: admissionId }),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "paye",
          paystack_reference: reference || null,
          paid_at: data.paid_at ?? null,
        }),
      }
    );
  }

  const userUpdatePath = env("XANO_USER_UPDATE_PATH") || "/users/{id}";
  const lien = await getOrCreateUserReferralLink(userId);
  if (userId != null) {
    await xanoServerFetch(interpolatePath(userUpdatePath, { id: userId }), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        statut: "actif",
        lien_parrainage_unique: lien,
        rang_label: md.rang_label ?? md.rank_label ?? "silver",
        commission_rate: md.commission_rate ?? 0.1,
      }),
    });
  }

  const commissionPath = env("XANO_COMMISSION_CREATE_PATH") || "/commissions";
  const commissionAmount = Math.round(amountFcfa * 0.1);
  if (parrainId != null && commissionAmount > 0 && !commissionExists) {
    await xanoServerFetch(commissionPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parrain_id: parrainId,
        filleul_user_id: userId ?? null,
        admission_id: admissionId ?? null,
        amount_fcfa: commissionAmount,
        base_amount_fcfa: amountFcfa,
        rate: 0.1,
        status: "en_attente",
        label: "Commission de depart (10%)",
        paystack_reference: reference || null,
        created_at: new Date().toISOString(),
      }),
    });
  }

  if (email && isEmailConfigured()) {
    const subject = "Bienvenue sur UltraBoost Executive";
    const text =
      "Bienvenue " + (firstName || "") + ".\n\n" +
      "Votre paiement a ete confirme.\n" +
      "Vos acces seront actives sous 48 heures.\n\n" +
      "Connexion membre : https://ultraboost.pro/membre/login\n" +
      "Lien de parrainage : " + lien + "\n";
    try {
      await sendEmail({ to: email, subject, text });
    } catch {}
  }

  const parrainEmail = String(md.parrain_email ?? "").trim();
  if (parrainEmail && isEmailConfigured()) {
    try {
      await sendEmail({
        to: parrainEmail,
        subject: "Votre filleul vient de s inscrire",
        text: "Votre filleul " + (firstName || "-") + " vient de s inscrire.",
      });
    } catch {}
  }

  return NextResponse.json({ ok: true });
}

async function getOrCreateUserReferralLink(userId: unknown): Promise<string> {
  const fallback = createReferralCode();
  if (userId == null) return fallback;

  const getPath = env("XANO_USER_GET_PATH") || "/users/{id}";
  const res = await xanoServerFetch(
    interpolatePath(getPath, { id: String(userId) }),
    { method: "GET" }
  );
  if (!res.ok) return fallback;

  try {
    const user = JSON.parse(res.text) as { lien_parrainage_unique?: unknown };
    const existing = String(user?.lien_parrainage_unique ?? "").trim();
    return existing || fallback;
  } catch {
    return fallback;
  }
}

async function hasExistingCommission({
  admissionId,
  reference,
}: {
  admissionId: unknown;
  reference: string;
}): Promise<boolean> {
  const base = env("XANO_COMMISSION_CREATE_PATH") || "/commissions";

  const queries: string[] = [];
  if (reference) queries.push("paystack_reference=" + encodeURIComponent(reference));
  if (admissionId != null) queries.push("admission_id=" + encodeURIComponent(String(admissionId)));
  if (queries.length === 0) return false;

  const path = base + "?" + queries.join("&");
  const res = await xanoServerFetch(path, { method: "GET" });
  if (!res.ok) return false;

  try {
    const parsed = JSON.parse(res.text) as unknown;
    if (Array.isArray(parsed)) return parsed.length > 0;
    const obj = parsed as { id?: unknown };
    return Boolean(obj?.id);
  } catch {
    return false;
  }
}

function createReferralCode(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let out = "UB-";
  for (const b of bytes) {
    out += alphabet[b % alphabet.length];
  }
  return out;
}