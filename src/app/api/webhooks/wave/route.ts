import { NextRequest, NextResponse } from "next/server";
import { verifyWaveSignature } from "@/lib/xano/server-client";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

type WaveEvent = {
  id?: string;
  type?: string;
  data?: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("wave-signature") ?? req.headers.get("Wave-Signature");
  const secret = env("WAVE_API_KEY");

  if (!verifyWaveSignature(raw, sig, secret)) {
    return NextResponse.json({ error: "Signature invalide." }, { status: 401 });
  }

  let event: WaveEvent = {};
  try {
    event = raw ? (JSON.parse(raw) as WaveEvent) : {};
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, received: true, type: event.type ?? null, id: event.id ?? null });
}

