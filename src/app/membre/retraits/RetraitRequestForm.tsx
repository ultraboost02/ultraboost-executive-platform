"use client";

import { useState } from "react";
import { FormSuccessBlock } from "@/components/forms/FormSuccessBlock";

const MIN_WITHDRAWAL_FCFA = 15_000;

const METHODS = [
  { id: "paystack", label: "Paystack" },
  { id: "wave", label: "Wave" },
  { id: "bank_transfer", label: "Virement bancaire" },
] as const;

export function RetraitRequestForm() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"] | "">("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const amount_fcfa = Number(amount.replace(/[^\d]/g, ""));
      if (!Number.isFinite(amount_fcfa) || amount_fcfa <= 0) {
        setError("Montant invalide.");
        return;
      }
      if (amount_fcfa < MIN_WITHDRAWAL_FCFA) {
        setError(`Montant minimum : ${MIN_WITHDRAWAL_FCFA.toLocaleString("fr-FR")} FCFA.`);
        return;
      }
      if (!method) {
        setError("Veuillez choisir un moyen de paiement.");
        return;
      }

      const res = await fetch("/api/membre/retraits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_fcfa,
          payment_method: method,
          payment_details: details,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; detail?: string };
      if (!res.ok) {
        setError(data.error || "Demande impossible.");
        return;
      }
      setSuccess(true);
      setAmount("");
      setMethod("");
      setDetails("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-wider text-[#C9A84C]">Demander un retrait</p>
      <p className="mt-2 text-sm text-[#C8C8CF]">
        Minimum : <span className="text-[#D4AF37]">15 000 FCFA</span>.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Montant (FCFA)</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="numeric"
            placeholder="15000"
            className="glass-input mt-2 w-full px-4 py-3 text-sm"
            required
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Moyen de paiement</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as typeof method)}
            className="glass-input mt-2 w-full px-4 py-3 text-sm appearance-none cursor-pointer"
            required
          >
            <option value="">Sélectionner</option>
            {METHODS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-medium uppercase tracking-wider text-[#C9A84C]">Détails (optionnel)</span>
        <input
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Numéro Wave, IBAN, référence…"
          className="glass-input mt-2 w-full px-4 py-3 text-sm"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {success && (
        <div className="mt-3">
          <FormSuccessBlock />
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-gold mt-4 w-full py-3 text-sm">
        {loading ? "Envoi…" : "Envoyer la demande"}
      </button>
    </form>
  );
}

