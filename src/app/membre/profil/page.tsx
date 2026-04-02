import { redirect } from "next/navigation";
import { MembreFetchError } from "@/components/membre/MembreFetchError";
import { MembreStubBanner } from "@/components/membre/MembreStubBanner";
import { isMembreStubToken, requireMembreTokenOrRedirect } from "@/lib/membre/server-session";
import { fetchMembreDashboard } from "@/lib/xano/membre-api";

export default async function MembreProfilPage() {
  const token = await requireMembreTokenOrRedirect();

  if (isMembreStubToken(token)) {
    return (
      <>
        <MembreStubBanner />
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Profil
          </h1>
          <p className="mt-2 text-sm text-[#9999A9]">Profil agrégé via GET dashboard : first_name, last_name, email.</p>
        </div>
      </>
    );
  }

  const res = await fetchMembreDashboard(token);
  if (!res.ok) {
    if (res.status === 401) redirect("/membre/login");
    return <MembreFetchError title="Impossible de charger le profil" message={res.message} />;
  }

  const d = res.data;

  return (
    <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Profil
      </h1>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wider text-[#C9A84C]">Prénom · first_name</dt>
          <dd className="mt-1 text-[#F5F5F7]">{d.first_name?.trim() || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-[#C9A84C]">Nom · last_name</dt>
          <dd className="mt-1 text-[#F5F5F7]">{d.last_name?.trim() || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-[#C9A84C]">Email · email</dt>
          <dd className="mt-1 text-[#F5F5F7]">{d.email?.trim() || "—"}</dd>
        </div>
      </dl>
      <p className="mt-8 text-xs text-[#666]">
        Pour d&apos;autres champs (téléphone, pays…), étendez l&apos;objet renvoyé par GET{" "}
        <code className="text-[#D4AF37]">XANO_MEMBRE_DASHBOARD_PATH</code> dans Xano et le type{" "}
        <code className="text-[#D4AF37]">XanoMembreDashboard</code>.
      </p>
    </div>
  );
}
