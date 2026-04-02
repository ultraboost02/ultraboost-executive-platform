import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function AuthLoginPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <SiteHeader />
      <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 py-16 sm:px-8">
        <h1 className="text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Espace réservé
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#C8C8CF]">
          L&apos;authentification administration / tableaux de bord génériques est distincte de l&apos;espace membre
          parrainage. Pour le programme affiliates et votre solde, utilisez la connexion membre dédiée.
        </p>
        <Link href="/membre/login" className="btn-gold mt-8 inline-flex justify-center py-3 text-center text-sm">
          Connexion espace membre
        </Link>
        <Link
          href="/"
          className="btn-outline-gold mt-4 inline-flex justify-center py-3 text-center text-sm no-underline"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
