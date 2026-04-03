import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { requireAdminTokenOrRedirect } from "@/lib/admin/server-session";
import { fetchAdminAdmissions, fetchAdminMe, fetchAdminMembres, fetchAdminRetraits } from "@/lib/xano/admin-api";

type AdmissionItem = {
  id?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  status?: unknown;
};

type RetraitItem = {
  id?: unknown;
  amount_fcfa?: unknown;
  payment_method?: unknown;
  status?: unknown;
};

type MembreItem = {
  id?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  statut?: unknown;
  status?: unknown;
  rang_label?: unknown;
  rank_label?: unknown;
};

function isAllowedRole(role: unknown): boolean {
  const r = String(role ?? "").toLowerCase();
  return r === "super_admin" || r === "admin";
}

export default async function AdminPage() {
  const token = await requireAdminTokenOrRedirect();
  const me = await fetchAdminMe(token);
  if (!me.ok) redirect("/admin/login");
  if (!isAllowedRole(me.data.role)) {
    return (
      <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
        <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
        <SiteHeader />
        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
          <h1 className="text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Accès refusé
          </h1>
          <p className="mt-4 text-sm text-[#C8C8CF]">Rôle requis : admin ou super_admin.</p>
          <Link href="/" className="btn-outline-gold mt-8 inline-flex py-3">
            Retour
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const [admissions, retraits, membres] = await Promise.all([
    fetchAdminAdmissions(token),
    fetchAdminRetraits(token),
    fetchAdminMembres(token),
  ]);

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <SiteHeader />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]/90">UltraBoost · Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Console de lancement
        </h1>
        <p className="mt-3 text-sm text-[#9999A9]">
          Connecté : {me.data.email || "—"} · rôle : <span className="text-[#D4AF37]">{String(me.data.role ?? "—")}</span>
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Admissions en attente
            </h2>
            {!admissions.ok ? (
              <p className="mt-4 text-sm text-red-400">{admissions.message}</p>
            ) : admissions.data.length === 0 ? (
              <p className="mt-4 text-sm text-[#9999A9]">Aucune admission.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
                {admissions.data.slice(0, 10).map((a: AdmissionItem) => (
                  <li key={String(a.id)} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[#F5F5F7]">
                      {a.first_name || "—"} {a.last_name || ""} <span className="text-[#9999A9]">· {a.email || "—"}</span>
                    </p>
                    <p className="mt-1 text-xs text-[#666]">id: {String(a.id)} · status: {String(a.status ?? "—")}</p>
                    <div className="mt-3 flex gap-2">
                      <form action="/api/admin/valider-admission" method="post">
                        <input type="hidden" name="admission_id" value={String(a.id)} />
                        <input type="hidden" name="candidate_email" value={String(a.email ?? "")} />
                        <input type="hidden" name="candidate_first_name" value={String(a.first_name ?? "")} />
                        <button className="btn-gold px-3 py-2 text-xs" type="submit">
                          Valider
                        </button>
                      </form>
                      <form action="/api/admin/refuser-admission" method="post">
                        <input type="hidden" name="admission_id" value={String(a.id)} />
                        <input type="hidden" name="candidate_email" value={String(a.email ?? "")} />
                        <input type="hidden" name="candidate_first_name" value={String(a.first_name ?? "")} />
                        <button className="btn-outline-gold px-3 py-2 text-xs" type="submit">
                          Refuser
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Retraits en attente
            </h2>
            {!retraits.ok ? (
              <p className="mt-4 text-sm text-red-400">{retraits.message}</p>
            ) : retraits.data.length === 0 ? (
              <p className="mt-4 text-sm text-[#9999A9]">Aucun retrait.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
              {retraits.data.slice(0, 10).map((r: RetraitItem) => (
                  <li key={String(r.id)} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[#F5F5F7]">
                      {String(r.amount_fcfa ?? "—")} FCFA <span className="text-[#9999A9]">· {String(r.payment_method ?? "—")}</span>
                    </p>
                    <p className="mt-1 text-xs text-[#666]">id: {String(r.id)} · status: {String(r.status ?? "—")}</p>
                    <form className="mt-3" action="/api/admin/approuver-retrait" method="post">
                      <input type="hidden" name="retrait_id" value={String(r.id)} />
                      <button className="btn-gold px-3 py-2 text-xs" type="submit">
                        Approuver retrait
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Membres actifs
            </h2>
            {!membres.ok ? (
              <p className="mt-4 text-sm text-red-400">{membres.message}</p>
            ) : membres.data.length === 0 ? (
              <p className="mt-4 text-sm text-[#9999A9]">Aucun membre.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
                {membres.data.slice(0, 12).map((u: MembreItem) => (
                  <li key={String(u.id)} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[#F5F5F7]">
                      {u.first_name || "—"} {u.last_name || ""} <span className="text-[#9999A9]">· {u.email || "—"}</span>
                    </p>
                    <p className="mt-1 text-xs text-[#666]">
                      id: {String(u.id)} · statut: {String(u.statut ?? u.status ?? "—")} · rang: {String(u.rang_label ?? u.rank_label ?? "—")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

