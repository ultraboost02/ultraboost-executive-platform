"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0A0A0F] px-6 py-16 text-center text-[#F5F5F7]">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">UltraBoost</p>
      <h1 className="max-w-md text-2xl font-semibold">Une erreur empêche l&apos;affichage de la page</h1>
      <p className="max-w-md text-sm text-[#9999A9]">
        Vous pouvez réessayer. Si le problème continue, rechargez l&apos;onglet ou videz le cache du navigateur.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-xl border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] px-6 py-3 text-sm font-semibold text-[#E4C972] transition hover:border-[rgba(201,168,76,0.5)]"
      >
        Réessayer
      </button>
    </div>
  );
}
