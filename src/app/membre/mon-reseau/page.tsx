import Link from "next/link";
import { redirect } from "next/navigation";
import { MembreFetchError } from "@/components/membre/MembreFetchError";
import { MembreStubBanner } from "@/components/membre/MembreStubBanner";
import { isMembreStubToken, requireMembreTokenOrRedirect } from "@/lib/membre/server-session";
import { fetchMembreDashboard } from "@/lib/xano/membre-api";

export default async function MembreReseauPage() {
  const token = await requireMembreTokenOrRedirect();

  if (isMembreStubToken(token)) {
    return (
      <>
        <MembreStubBanner />
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Mon réseau
          </h1>
          <p className="mt-2 text-sm text-[#9999A9]">
            Ajoutez un endpoint Xano dédié (ex. GET /membre/reseau) si vous voulez lister les filleuls ; sinon la stat agrégée
            suffit sur le <Link href="/membre/dashboard">tableau de bord</Link>.
          </p>
        </div>
      </>
    );
  }

  const res = await fetchMembreDashboard(token);
  if (!res.ok) {
    if (res.status === 401) redirect("/membre/login");
    return <MembreFetchError title="Impossible de charger les infos réseau" message={res.message} />;
  }

  const count = res.data.active_referrals_count ?? 0;

  return (
    <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-white/[0.03] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-[#F5F5F7]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Mon réseau
      </h1>
      <p className="mt-4 text-sm text-[#C8C8CF]">
        Filleuls actifs (agrégé, champ <code className="text-xs text-[#D4AF37]">active_referrals_count</code>) :{" "}
        <span className="text-2xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
          {count}
        </span>
      </p>
      <p className="mt-6 text-xs text-[#666]">
        Pour un arbre ou une liste nominative, exposez un tableau depuis Xano (ex.{" "}
        <code className="text-[#D4AF37]">referrals[]</code>) et une nouvelle route front — on pourra l&apos;ajouter sur demande.
      </p>
    </div>
  );
}
