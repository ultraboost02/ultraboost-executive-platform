import { Suspense } from "react";
import MembreLoginContent from "./MembreLoginContent";

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F] text-sm text-[#C8C8CF]">
      Chargement…
    </div>
  );
}

export default function MembreLoginPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <MembreLoginContent />
    </Suspense>
  );
}
