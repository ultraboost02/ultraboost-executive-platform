/** Écran minimal pendant le chargement des segments (réseau lent, premier rendu). */
export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0A0A0F] px-6 text-[#F5F5F7]"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-[rgba(201,168,76,0.2)] border-t-[#C9A84C]"
        aria-hidden
      />
      <p className="text-sm text-[#9999A9]">Chargement…</p>
    </div>
  );
}
