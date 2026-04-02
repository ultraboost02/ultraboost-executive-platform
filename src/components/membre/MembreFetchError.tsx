export function MembreFetchError({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.07] p-6 text-sm text-[#F5F5F7]">
      <p className="font-semibold text-red-300">{title}</p>
      <p className="mt-2 whitespace-pre-wrap text-[#C8C8CF]">{message}</p>
      <p className="mt-4 text-xs text-[#9999A9]">
        Vérifiez les chemins d&apos;API dans <code className="text-[#D4AF37]">.env.local</code> et que votre endpoint Xano renvoie les champs attendus (
        <code className="text-[#D4AF37]">src/lib/xano/member-types.ts</code>).
      </p>
    </div>
  );
}
