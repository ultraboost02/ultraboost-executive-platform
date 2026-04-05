"use client";

import { useState } from "react";
import { UltraBoostLogoMark } from "@/components/layout/UltraBoostLogoMark";

const PNG_SRC = "/ultraboost-logo.png";

type Props = {
  className?: string;
  imgClassName?: string;
  gradientIdSuffix?: string;
};

/** Logo PNG fourni par la marque ; repli SVG si le fichier est absent. */
export function SiteBrandedLogo({ className = "", imgClassName = "size-12 object-contain", gradientIdSuffix = "brand" }: Props) {
  const [pngOk, setPngOk] = useState(true);

  if (!pngOk) {
    return <UltraBoostLogoMark className={imgClassName} gradientIdSuffix={gradientIdSuffix} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- PNG asset fourni par le client (public/ultraboost-logo.png)
    <img
      src={PNG_SRC}
      alt="UltraBoost"
      width={48}
      height={48}
      className={imgClassName}
      decoding="async"
      onError={() => setPngOk(false)}
    />
  );
}
