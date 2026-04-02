import { NextRequest, NextResponse } from "next/server";
import { ageFromBirthDate, isEligibleForElite } from "@/lib/age";
import { registerWithXano } from "@/lib/xano/client";
import { isXanoConfigured } from "@/lib/xano/config";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const birthDate = String(body.birthDate ?? "").trim();

  if (!email || !firstName || !lastName || !birthDate) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  if (!isEligibleForElite(birthDate)) {
    return NextResponse.json(
      { error: "L'accès est réservé aux personnes de 36 ans et plus." },
      { status: 403 }
    );
  }

  const age = ageFromBirthDate(birthDate);

  if (isXanoConfigured()) {
    const result = await registerWithXano({
      email,
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      age,
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: "Échec de synchronisation avec Xano.", detail: result.body },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true, xano: true });
  }

  return NextResponse.json({
    success: true,
    xano: false,
    message: "Inscription validée. La connexion Xano sera activée prochainement.",
  });
}
