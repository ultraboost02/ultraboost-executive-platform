"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  href: string;
  linkLabel?: string;
};

/** Sections d’ancrage — HTML statique pour affichage fiable (sans dépendre du scroll / Framer). */
export function HomeAnchorSection({ id, title, children, href, linkLabel = "Découvrir" }: Props) {
  return (
    <section
      id={id}
      className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 sm:scroll-mt-32 sm:px-8"
    >
      <div className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-6 sm:p-8">
        <h2
          className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {title}
        </h2>
        <div className="mt-4 text-sm leading-relaxed text-[#C8C8CF] sm:text-base">{children}</div>
        <Link href={href} className="btn-outline-gold mt-6 inline-flex px-6 py-3 text-sm">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
