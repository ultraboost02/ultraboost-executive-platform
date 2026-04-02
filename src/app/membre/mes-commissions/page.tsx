import { redirect } from "next/navigation";
import { MembreFetchError } from "@/components/membre/MembreFetchError";
import { MembreStubBanner } from "@/components/membre/MembreStubBanner";
import { isMembreStubToken, requireMembreTokenOrRedirect } from "@/lib/membre/server-session";
import { formatDate, formatFCFA } from "@/lib/utils";
import { fetchMembreCommissions } from "@/lib/xano/membre-api";

function statusLabel(status: string): string {
  const s = status.toLowerCase();
  if (s === "paid" || s === "payee" || s === "payée") return "Payée";
  if (s === "pending" || s === "en_attente") return "En attente";
  if (s === "cancelled" || s === "canceled" || s === "annulee") return "Annulée";
  return status;
}

export default async function MembreCommissionsPage() {
  const token = await requireMembreTokenOrRedirect();

  if (isMembreStubToken(token)) {
    return (
      <>
        <MembreStubBanner />
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Mes commissions
          </h1>
          <p className="mt-2 text-sm text-[#9999A9]">Activez Xano pour lister id, amount_fcfa, status, created_at, label…</p>
        </div>
      </>
    );
  }

  const res = await fetchMembreCommissions(token);
  if (!res.ok) {
    if (res.status === 401) redirect("/membre/login");
    return <MembreFetchError title="Impossible de charger les commissions" message={res.message} />;
  }

  const rows = res.data;

  return (
    <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Mes commissions
      </h1>
      <p className="mt-2 text-sm text-[#C8C8CF]">
        Champs attendus par ligne : <code className="text-xs text-[#D4AF37]">id</code>,{" "}
        <code className="text-xs text-[#D4AF37]">amount_fcfa</code>, <code className="text-xs text-[#D4AF37]">status</code>,{" "}
        <code className="text-xs text-[#D4AF37]">created_at</code>, <code className="text-xs text-[#D4AF37]">label</code>.
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 rounded-lg border border-[rgba(201,168,76,0.12)] bg-white/[0.02] py-12 text-center text-sm text-[#666]">
          Aucune commission pour le moment.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(201,168,76,0.2)] text-xs uppercase tracking-wider text-[#C9A84C]">
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Libellé</th>
                <th className="py-3 pr-4">Montant</th>
                <th className="py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} className="border-b border-white/[0.06] text-[#C8C8CF]">
                  <td className="py-3 pr-4 text-[#F5F5F7]">{formatDate(r.created_at) || r.created_at}</td>
                  <td className="py-3 pr-4">{r.label?.trim() || r.order_id || "—"}</td>
                  <td className="py-3 pr-4 font-medium text-[#D4AF37]">{formatFCFA(r.amount_fcfa ?? 0)}</td>
                  <td className="py-3">{statusLabel(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
