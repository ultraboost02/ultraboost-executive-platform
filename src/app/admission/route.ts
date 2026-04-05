import { NextRequest, NextResponse } from "next/server";
import { getXanoApiKey, getXanoPublicBaseUrl } from "@/lib/xano/config";
import { isEmailConfigured, sendEmail } from "@/lib/email";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function normalizeStatus(raw: unknown): "en_attente" | "flagged_for_review" {
  const s = String(raw ?? "").toLowerCase();
  if (s === "flagged_for_review") return "flagged_for_review";
  return "en_attente";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const base = getXanoPublicBaseUrl();
  const key = getXanoApiKey();
  const forwardBase = env("XANO_SERVER_BASE_URL") || base;
  const forwardKey = (env("XANO_SERVER_API_KEY") || key).trim();

  if (!forwardBase) {
    return NextResponse.json(
      { error: "URL Xano manquante : définissez NEXT_PUBLIC_XANO_API_URL ou XANO_SERVER_BASE_URL sur le serveur." },
      { status: 500 },
    );
  }

  const payload: Record<string, unknown> = {
    ...body,
    status: normalizeStatus(body.status),
  };

  const xanoUrl = `${forwardBase.replace(/\/$/, "")}/admission`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (forwardKey) {
    headers.Authorization = `Bearer ${forwardKey}`;
  }

  const res = await fetch(xanoUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    if (res.status === 401 && !forwardKey) {
      return NextResponse.json(
        {
          error: "Xano a refusé la requête sans authentification.",
          detail: "Ajoutez XANO_API_KEY (ou XANO_SERVER_API_KEY) dans les variables d’environnement du serveur.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "Erreur Xano.", detail: text.slice(0, 600) }, { status: 502 });
  }

  const adminTo = env("ADMISSION_ADMIN_EMAIL");
  if (adminTo && isEmailConfigured()) {
    const firstName = String(body.first_name ?? "").trim();
    const lastName = String(body.last_name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const type = String(body.type ?? "").trim();
    const level = String(body.level_requested ?? "").trim();
    const program = String(body.program_requested ?? "").trim();

    const subject = `Nouvelle demande d'admission — ${type || "ultraboost"}`;
    const lines = [
      `Type: ${type || "—"}`,
      `Nom: ${[firstName, lastName].filter(Boolean).join(" ") || "—"}`,
      `Email: ${email || "—"}`,
      `Niveau: ${level || "—"}`,
      `Programme: ${program || "—"}`,
      `Statut: ${String(payload.status)}`,
    ];

    try {
      await sendEmail({
        to: adminTo,
        subject,
        text: lines.join("\n"),
      });
    } catch {
      // Ne bloque pas la soumission si email échoue.
    }
  }

  // Retourner la réponse Xano telle quelle (JSON ou texte)
  try {
    const json = text ? (JSON.parse(text) as unknown) : {};
    return NextResponse.json(json);
  } catch {
    return new NextResponse(text, { status: 200, headers: { "Content-Type": res.headers.get("content-type") ?? "text/plain" } });
  }
}

