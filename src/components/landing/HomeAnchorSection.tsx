"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const playfair = { fontFamily: "Playfair Display, serif" };

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  href: string;
  linkLabel?: string;
  image?: string;
  imageAlt?: string;
};

/** Sections d'ancrage — HTML statique pour affichage fiable (sans dépendre du scroll / Framer). */
export function HomeAnchorSection({ id, title, children, href, linkLabel = "Découvrir", image, imageAlt }: Props) {
  return (
    <section
      id={id}
      className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 sm:scroll-mt-32 sm:px-8"
    >
      <div className="glass-card-gold overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.12)]">
        {image ? (
          <div className="grid lg:grid-cols-2">
            {/* Contenu texte */}
            <div className="p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center">
              <h2 className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl" style={playfair}>
                {title}
              </h2>
              <div className="mt-4 text-sm leading-relaxed text-[#C8C8CF] sm:text-base">{children}</div>
              <Link href={href} className="btn-outline-gold mt-6 inline-flex px-6 py-3 text-sm">
                {linkLabel}
              </Link>
            </div>
            {/* Image droite */}
            <div className="relative hidden lg:block">
              <Image
                src={image}
                alt={imageAlt ?? title}
                width={600}
                height={340}
                className="h-full w-full object-cover"
              />
              {/* Fondu gauche vers la card */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0) 50%)" }}
              />
              {/* Vignette haut/bas */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.4) 0%, transparent 35%, transparent 65%, rgba(10,10,15,0.4) 100%)" }}
              />
              {/* Bord doré décoratif droit */}
              <div
                className="absolute bottom-0 right-0 top-0 w-[2px]"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent)" }}
              />
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#D4AF37] sm:text-3xl" style={playfair}>
              {title}
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-[#C8C8CF] sm:text-base">{children}</div>
            <Link href={href} className="btn-outline-gold mt-6 inline-flex px-6 py-3 text-sm">
              {linkLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
