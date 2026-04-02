export function digitsOnly(input: string): string {
  return (input || "").replace(/\D+/g, "");
}

/**
 * Normalise la partie « locale » du numéro : chiffres uniquement, gestion +225 collé sans +,
 * et 9 chiffres sans leading 0 (ex. CI) pour éviter les rejets à tort.
 */
export function normalizePhoneLocalDigits(raw: string): string {
  let d = digitsOnly(raw);
  // Numéro complet CI souvent collé : 2250710008282
  if (d.startsWith("225") && d.length >= 12 && d.length <= 13) {
    d = d.slice(3);
  }
  // 710008282 → 0710008282 (très courant copier-coller)
  if (d.length === 9 && !d.startsWith("0")) {
    d = `0${d}`;
  }
  return d;
}

export function isValidPhoneLocalDigits(raw: string): boolean {
  const d = normalizePhoneLocalDigits(raw);
  if (!d) return false;
  // Largeur permissive (E.164 NSN ~ 7–15) pour ne pas bloquer des clients valides
  return /^\d{7,15}$/.test(d);
}
