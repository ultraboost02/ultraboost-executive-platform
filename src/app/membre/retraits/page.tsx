import { redirect } from "next/navigation";
import { MembreFetchError } from "@/components/membre/MembreFetchError";
import { MembreStubBanner } from "@/components/membre/MembreStubBanner";
import { isMembreStubToken, requireMembreTokenOrRedirect } from "@/lib/membre/server-session";
import { formatDate, formatFCFA } from "@/lib/utils";
import { fetchMembreRetraits } from "@/lib/xano/membre-api";
import { RetraitRequestForm } from "./RetraitRequestForm";

function statusLabel(status: string): string {
  const s = status.toLowerCase();
  if (s === "pending" || s === "en_attente") return "En attente";
  if (s === "approved" || s === "approuve") return "Approuvé";
  if (s === "paid" || s === "paye") return "Payé";
  if (s === "rejected" || s === "refuse") return "Refusé";
  return status;
}

export default async function MembreRetraitsPage() {
  const token = await requireMembreTokenOrRedirect();

  if (isMembreStubToken(token)) {
    return (
      <>
        <MembreStubBanner />
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Retraits
          </h1>
          <p className="mt-2 text-sm text-[#C8C8CF]">
            Montant minimum de retrait : <span className="text-[#D4AF37]">15 000 FCFA</span> (paramétrez la règle côté Xano).
          </p>
          <RetraitRequestForm />
          <p className="mt-8 text-sm text-[#9999A9]">Liste des retraits : id, amount_fcfa, status, requested_at, processed_at…</p>
        </div>
      </>
    );
  }

  const res = await fetchMembreRetraits(token);
  if (!res.ok) {
    if (res.status === 401) redirect("/membre/login");
    return <MembreFetchError title="Impossible de charger les retraits" message={res.message} />;
  }

  const rows = res.data;

  return (
    <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Retraits
      </h1>
      <p className="mt-2 text-sm text-[#C8C8CF]">
        Montant minimum : <span className="text-[#D4AF37]">15 000 FCFA</span>. Champs ligne :{" "}
        <code className="text-xs text-[#D4AF37]">id</code>, <code className="text-xs text-[#D4AF37]">amount_fcfa</code>,{" "}
        <code className="text-xs text-[#D4AF37]">status</code>, <code className="text-xs text-[#D4AF37]">requested_at</code>,{" "}
        <code className="text-xs text-[#D4AF37]">processed_at</code>, <code className="text-xs text-[#D4AF37]">payment_method_label</code>.
      </p>
      <RetraitRequestForm />
      {rows.length === 0 ? (
        <p className="mt-8 rounded-lg border border-[rgba(201,168,76,0.12)] bg-white/[0.02] py-12 text-center text-sm text-[#666]">
          Aucune demande de retrait.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(201,168,76,0.2)] text-xs uppercase tracking-wider text-[#C9A84C]">
                <th className="py-3 pr-4">Demandé le</th>
                <th className="py-3 pr-4">Montant</th>
                <th className="py-3 pr-4">Moyen</th>
                <th className="py-3 pr-4">Traité le</th>
                <th className="py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} className="border-b border-white/[0.06] text-[#C8C8CF]">
                  <td className="py-3 pr-4 text-[#F5F5F7]">{formatDate(r.requested_at) || r.requested_at}</td>
                  <td className="py-3 pr-4 font-medium text-[#D4AF37]">{formatFCFA(r.amount_fcfa ?? 0)}</td>
                  <td className="py-3 pr-4">{r.payment_method_label?.trim() || "—"}</td>
                  <td className="py-3 pr-4">{r.processed_at ? formatDate(r.processed_at) : "—"}</td>
                  <td className="py-3">{statusLabel(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-6 text-xs text-[#666]">
        Remarque admin éventuelle : champ <code className="text-[#D4AF37]">admin_note</code> (non affiché dans le tableau pour
        gagner de la place — à ajouter si besoin).
      </p>
    </div>
  );
}
