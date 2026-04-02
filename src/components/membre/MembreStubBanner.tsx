export function MembreStubBanner() {
  return (
    <div className="mb-6 rounded-xl border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.08)] px-4 py-3 text-sm text-[#E8E0C8]">
      <strong className="text-[#D4AF37]">Mode démonstration</strong> — connexion sans Xano (
      <code className="text-xs">MEMBRE_LOGIN_STUB=true</code>). Les données ci-dessous sont des placeholders ; désactivez le stub et
      configurez les endpoints pour le JWT réel.
    </div>
  );
}
