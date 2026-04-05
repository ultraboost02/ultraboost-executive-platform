type Props = {
  className?: string;
  /** Évite les conflits d’id si plusieurs logos sur la même page (header / footer / agenda). */
  gradientIdSuffix?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

/** Marque vectorielle embarquée — s’affiche même si `/logo.svg` est absent ou bloqué. */
export function UltraBoostLogoMark({
  className = "size-12 shrink-0",
  gradientIdSuffix = "main",
  "aria-hidden": ariaHidden = true,
}: Props) {
  const gid = `ub-logo-grad-${gradientIdSuffix}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden={ariaHidden === true || ariaHidden === "true"}
    >
      <defs>
        <linearGradient id={gid} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8D5A3" />
          <stop offset="0.45" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#9A7B2C" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="12"
        stroke={`url(#${gid})`}
        strokeWidth="1.5"
        fill="rgba(10,10,15,0.35)"
      />
      <path
        d="M15 17.5v9.5c0 3.2 2.6 5.8 6 5.8s6-2.6 6-5.8V17.5"
        stroke={`url(#${gid})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M30 15.5l5-3.2v7.8z" fill={`url(#${gid})`} />
    </svg>
  );
}
