import { redirect } from "next/navigation";
import { MembreFetchError } from "@/components/membre/MembreFetchError";
import { MembreStubBanner } from "@/components/membre/MembreStubBanner";
import { isMembreStubToken, requireMembreTokenOrRedirect } from "@/lib/membre/server-session";
import { formatFCFA } from "@/lib/utils";
import { fetchMembreDashboard } from "@/lib/xano/membre-api";

function commissionTierFromRank(rankLabel: string | null | undefined): { tier: string; ratePct: number } | null {
  const r = (rankLabel ?? "").toLowerCase();
  if (!r) return null;
  if (r.includes("elite")) return { tier: "Elite", ratePct: 20 };
  if (r.includes("gold") || r.includes("or")) return { tier: "Gold", ratePct: 15 };
  if (r.includes("silver") || r.includes("argent")) return { tier: "Silver", ratePct: 10 };
  return null;
}

export default async function MembreDashboardPage() {
  const token = await requireMembreTokenOrRedirect();

  if (isMembreStubToken(token)) {
    return (
      <>
        <MembreStubBanner />
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Tableau de bord
          </h1>
          <p className="mt-2 text-sm text-[#9999A9]">Données fictives — connectez Xano pour le solde, filleuls, rang et ventes.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Solde disponible", value: "— FCFA", hint: "balance_fcfa" },
              { label: "Filleuls actifs", value: "—", hint: "active_referrals_count" },
              { label: "Rang", value: "—", hint: "rank_label" },
              { label: "Taux de commission", value: "—", hint: "Silver/Gold/Elite" },
              { label: "Ventes (période)", value: "— FCFA", hint: "period_sales_fcfa" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-wider text-[#C9A84C]">{c.label}</p>
                <p className="mt-2 text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {c.value}
                </p>
                <p className="mt-1 text-[10px] text-[#666]">{c.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  const res = await fetchMembreDashboard(token);
  if (!res.ok) {
    if (res.status === 401) redirect("/membre/login");
    return <MembreFetchError title="Impossible de charger le tableau de bord" message={res.message} />;
  }

  const d = res.data;
  const tier = commissionTierFromRank(d.rank_label);
  const cards = [
    { label: "Solde disponible", value: formatFCFA(d.balance_fcfa ?? 0), hint: "balance_fcfa (Xano)" },
    { label: "Filleuls actifs", value: String(d.active_referrals_count ?? 0), hint: "active_referrals_count" },
    { label: "Rang", value: d.rank_label?.trim() || "—", hint: "rank_label" },
    { label: "Taux de commission", value: tier ? `${tier.tier} (${tier.ratePct}%)` : "—", hint: "Silver (10%) · Gold (15%) · Elite (20%)" },
    { label: "Ventes (période)", value: formatFCFA(d.period_sales_fcfa ?? 0), hint: "period_sales_fcfa" },
  ];

  return (
    <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Tableau de bord
      </h1>
      {(d.first_name || d.last_name) && (
        <p className="mt-2 text-sm text-[#C8C8CF]">
          {[d.first_name, d.last_name].filter(Boolean).join(" ")}
          {d.email ? <span className="text-[#9999A9]"> · {d.email}</span> : null}
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-5">
            <p className="text-xs uppercase tracking-wider text-[#C9A84C]">{c.label}</p>
            <p className="mt-2 text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
              {c.value}
            </p>
            <p className="mt-1 text-[10px] text-[#666]">{c.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-6">
          <p className="text-xs uppercase tracking-wider text-[#C9A84C]">Lien de parrainage</p>
          <p className="mt-3 text-sm text-[#C8C8CF]">
            Code : <span className="font-mono text-[#D4AF37]">{d.referral_code?.trim() || "—"}</span>
          </p>
          {d.referral_url?.trim() ? (
            <p className="mt-3 break-all rounded-xl border border-[rgba(201,168,76,0.18)] bg-black/20 p-3 font-mono text-xs text-[#E8E8EC]">
              {d.referral_url.trim()}
            </p>
          ) : (
            <p className="mt-3 text-sm text-[#9999A9]">Aucune URL renvoyée (champ `referral_url` côté Xano).</p>
          )}
        </div>

        <div className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-6">
          <p className="text-xs uppercase tracking-wider text-[#C9A84C]">Évolution (rôles)</p>
          <p className="mt-3 text-sm text-[#C8C8CF]">
            Parcours : <span className="text-[#D4AF37]">Closer</span> · <span className="text-[#D4AF37]">Consultant</span> ·{" "}
            <span className="text-[#D4AF37]">Formateur</span> · <span className="text-[#D4AF37]">Manager</span> ·{" "}
            <span className="text-[#D4AF37]">Conférencier</span>
          </p>
          <p className="mt-2 text-xs text-[#666]">
            (Affichage statique ici — les règles de promotion doivent être appliquées côté Xano / back-office.)
          </p>
        </div>
      </div>
    </div>
  );
}
