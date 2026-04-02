import { NextResponse } from "next/server";
import { getXanoMembreRetraitCreatePath, getXanoPublicBaseUrl } from "@/lib/xano/config";
import { getMembreTokenFromCookies, isMembreStubToken } from "@/lib/membre/server-session";

const MIN_WITHDRAWAL_FCFA = 15_000;

export async function POST(request: Request) {
  const token = await getMembreTokenFromCookies();
  if (!token) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  if (isMembreStubToken(token)) {
    return NextResponse.json({ error: "Mode démo : retraits indisponibles sans Xano." }, { status: 400 });
  }

  const base = getXanoPublicBaseUrl();
  if (!base) return NextResponse.json({ error: "NEXT_PUBLIC_XANO_API_URL manquant." }, { status: 500 });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const amount = Number(body.amount_fcfa);
  const payment_method = typeof body.payment_method === "string" ? body.payment_method.trim() : "";
  const payment_details = typeof body.payment_details === "string" ? body.payment_details.trim() : "";

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Montant invalide." }, { status: 400 });
  }
  if (amount < MIN_WITHDRAWAL_FCFA) {
    return NextResponse.json({ error: `Montant minimum : ${MIN_WITHDRAWAL_FCFA} FCFA.` }, { status: 400 });
  }
  if (!payment_method) {
    return NextResponse.json({ error: "Veuillez choisir un moyen de paiement." }, { status: 400 });
  }

  const path = getXanoMembreRetraitCreatePath();
  const url = `${base}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount_fcfa: amount,
      payment_method,
      payment_details,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json({ error: "Erreur Xano.", detail: text.slice(0, 600) }, { status: res.status === 401 ? 401 : 502 });
  }

  try {
    return NextResponse.json(text ? (JSON.parse(text) as unknown) : { ok: true });
  } catch {
    return new NextResponse(text, { status: 200, headers: { "Content-Type": res.headers.get("content-type") ?? "text/plain" } });
  }
}

