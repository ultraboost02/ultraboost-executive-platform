"use client";

/** Message de confirmation unique pour tous les formulaires d’admission / demandes. */
export function FormSuccessBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center text-sm leading-relaxed text-green-400 ${className}`}
    >
      <p className="font-medium">Votre demande a bien été prise en compte.</p>
      <p className="mt-2 text-[#C8C8CF]">Notre équipe vous recontactera dans les prochaines 24 heures.</p>
    </div>
  );
}
