import type { AgendaTrackKey } from "@/data/ultrabootcamps-agenda";
import { agendaTrackFromBootcampLevel } from "@/data/ultrabootcamps-agenda";

/**
 * Déduit l’onglet agenda / le calendrier communautaire à partir du champ renvoyé par Xano
 * (ex. ecosystem, specialist, director…).
 */
export function communityAgendaTrackFromProfile(raw: string | null | undefined): AgendaTrackKey {
  const s = (raw ?? "").trim().toLowerCase();
  if (!s) return "general";
  return agendaTrackFromBootcampLevel(s);
}
