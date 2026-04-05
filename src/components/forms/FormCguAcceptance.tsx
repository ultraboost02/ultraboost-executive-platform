"use client";

import Link from "next/link";

type Props = {
  id: string;
  /** ex. glass-input pour alignement formulaires compacts */
  className?: string;
};

export function FormCguAcceptance({ id, className = "" }: Props) {
  return (
    <div className={`flex items-start gap-3 rounded-xl border border-[rgba(212,175,55,0.12)] bg-white/[0.02] px-4 py-3 ${className}`}>
      <input id={id} name="terms" required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#D4AF37]" />
      <label htmlFor={id} className="text-sm text-[#C8C8CF]">
        <span className="block">
          J&apos;accepte les{" "}
          <span className="text-[#D4AF37]">Conditions Générales d&apos;Utilisation (CGU)</span>
          {" "}d&apos;UltraBoost — obligatoire avant validation.
        </span>
        <span className="mt-2 block">
          <Link
            href="/cgu"
            target="_blank"
            rel="noreferrer"
            className="text-[#D4AF37] underline decoration-[rgba(212,175,55,0.45)] underline-offset-4 hover:text-[#E8D5A3]"
          >
            Lire les conditions
          </Link>
        </span>
      </label>
    </div>
  );
}
