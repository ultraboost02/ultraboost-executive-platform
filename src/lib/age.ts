/** Âge minimum pour l'accès UltraBoost Executive (UltraBoost). */
export const ELITE_MIN_AGE = 36;

/**
 * Calcule l'âge à partir d'une date de naissance (format ISO `YYYY-MM-DD`).
 */
export function ageFromBirthDate(isoDate: string): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return -1;
  const birth = new Date(y, m - 1, d);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

export function isEligibleForElite(isoBirthDate: string): boolean {
  return ageFromBirthDate(isoBirthDate) >= ELITE_MIN_AGE;
}
