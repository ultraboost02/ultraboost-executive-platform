import { redirect } from "next/navigation";
import { MembreFetchError } from "@/components/membre/MembreFetchError";
import { MembreStubBanner } from "@/components/membre/MembreStubBanner";
import { isMembreStubToken, requireMembreTokenOrRedirect } from "@/lib/membre/server-session";
import { fetchMembreDashboard } from "@/lib/xano/membre-api";

export default async function MembreMonLienPage() {
  const token = await requireMembreTokenOrRedirect();

  if (isMembreStubToken(token)) {
    return (
      <>
        <MembreStubBanner />
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Mon lien de parrainage
          </h1>
          <p className="mt-2 text-sm text-[#C8C8CF]">
            Avec Xano : renseignez <code className="text-xs text-[#D4AF37]">referral_url</code>,{" "}
            <code className="text-xs text-[#D4AF37]">referral_code</code>,{" "}
            <code className="text-xs text-[#D4AF37]">link_clicks_count</code>,{" "}
            <code className="text-xs text-[#D4AF37]">link_signups_count</code> dans la réponse dashboard.
          </p>
        </div>
      </>
    );
  }

  const res = await fetchMembreDashboard(token);
  if (!res.ok) {
    if (res.status === 401) redirect("/membre/login");
    return <MembreFetchError title="Impossible de charger le lien de parrainage" message={res.message} />;
  }

  const d = res.data;
  const url = d.referral_url?.trim() || "";
  const code = d.referral_code?.trim() || "—";

  return (
    <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Mon lien de parrainage
      </h1>
      <p className="mt-2 text-sm text-[#C8C8CF]">
        Code : <span className="font-mono text-[#D4AF37]">{code}</span>
      </p>
      {url ? (
        <div className="mt-6 rounded-xl border border-[rgba(201,168,76,0.2)] bg-black/20 p-4">
          <p className="break-all font-mono text-sm text-[#E8E8EC]">{url}</p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-[#9999A9]">Aucune URL renvoyée — définissez referral_url dans l&apos;endpoint dashboard Xano.</p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-4 text-sm">
          <p className="text-xs uppercase tracking-wider text-[#C9A84C]">Clics (optionnel)</p>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
            {d.link_clicks_count != null ? String(d.link_clicks_count) : "—"}
          </p>
          <p className="mt-1 text-[10px] text-[#666]">link_clicks_count</p>
        </div>
        <div className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-white/[0.02] p-4 text-sm">
          <p className="text-xs uppercase tracking-wider text-[#C9A84C]">Inscriptions (optionnel)</p>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
            {d.link_signups_count != null ? String(d.link_signups_count) : "—"}
          </p>
          <p className="mt-1 text-[10px] text-[#666]">link_signups_count</p>
        </div>
      </div>
    </div>
  );
}
