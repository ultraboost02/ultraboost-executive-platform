"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ADMISSION_COUNTRIES,
  ADMISSION_FONCTIONS,
  ADMISSION_MONTHS,
  admissionBirthYears,
} from "@/data/admission-shared";
import {
  ULTRA_BOOTCAMP_AGENDA_MONTHS,
  ULTRA_BOOTCAMP_AGENDA_YEAR,
  agendaAccessMode,
  agendaDayForTrack,
  type AgendaTrackKey,
} from "@/data/ultrabootcamps-agenda";
import { normalizePhoneLocalDigits, isValidPhoneLocalDigits } from "@/lib/formValidation";

const EVENT_LEVEL_OPTIONS: { value: AgendaTrackKey; label: string }[] = [
  { value: "general", label: "Général (Écosystème & Applications)" },
  { value: "specialist", label: "Specialist" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "executive", label: "Executive" },
];

export type EventAgendaAccessFormProps = {
  defaultTrack: AgendaTrackKey;
  defaultMonthLabel: string;
  /** Index mois (0–10) pour hints calendrier back-office uniquement */
  defaultMonthIndex: number;
  eventFormatPreview: string;
  themePreview: string;
  onSuccess: () => void;
};

export function EventAgendaAccessForm({
  defaultTrack,
  defaultMonthLabel,
  defaultMonthIndex,
  eventFormatPreview,
  themePreview,
  onSuccess,
}: EventAgendaAccessFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [eventTrack, setEventTrack] = useState<AgendaTrackKey>(defaultTrack);
  const [selectedCountry, setSelectedCountry] = useState("Côte d'Ivoire");
  const [selectedFonction, setSelectedFonction] = useState("");
  const [showAutreFonction, setShowAutreFonction] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  const years = useMemo(() => admissionBirthYears(), []);
  const availableDays = useMemo(() => {
    if (!birthYear || !birthMonth) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(Number(birthYear), Number(birthMonth), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  const phoneCode = useMemo(() => {
    const c = ADMISSION_COUNTRIES.find((x) => x.name === selectedCountry);
    return c?.code ?? "+225";
  }, [selectedCountry]);

  const sortedCountries = useMemo(
    () => [...ADMISSION_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" })),
    [],
  );
  const sortedFonctions = useMemo(
    () => [...ADMISSION_FONCTIONS].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" })),
    [],
  );

  const accessMode = agendaAccessMode(eventTrack);

  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#C9A84C]";
  const inputCls = "glass-input w-full px-4 py-3 text-sm";
  const selectCls = "glass-input w-full px-4 py-3 text-sm appearance-none cursor-pointer";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!isValidPhoneLocalDigits(phone)) {
      setError("Mobile invalide : chiffres uniquement (6 à 15).");
      setLoading(false);
      return;
    }
    if (whatsapp.trim() && !isValidPhoneLocalDigits(whatsapp)) {
      setError("WhatsApp invalide : chiffres uniquement (6 à 15).");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`;
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    const ageFlag = age < 36 ? "age_below_36" : "";

    const fonction = showAutreFonction
      ? ((formData.get("fonction_autre") as string) || "")
      : selectedFonction;

    const programRequested = `Demande date & programme — ${defaultMonthLabel} — ${eventTrack} — ${eventFormatPreview}`;

    const calendarRow = ULTRA_BOOTCAMP_AGENDA_MONTHS.find((r) => r.monthIndex === defaultMonthIndex);
    const internalDay =
      calendarRow != null ? agendaDayForTrack(calendarRow, eventTrack as AgendaTrackKey) : null;

    const payload: Record<string, unknown> = {
      type: "event_agenda",
      access_mode: accessMode,
      requires_validation: accessMode === "validated",
      civility: formData.get("civility") || "",
      first_name: formData.get("first_name") || "",
      last_name: formData.get("last_name") || "",
      date_of_birth: dateOfBirth,
      function_title: fonction,
      email: formData.get("email") || "",
      phone: `${phoneCode} ${phone || ""}`.trim(),
      whatsapp: `${phoneCode} ${whatsapp || ""}`.trim(),
      country: selectedCountry,
      linkedin_url: formData.get("linkedin") || "",
      level_requested: eventTrack,
      event_track: eventTrack,
      event_month_label: defaultMonthLabel,
      event_format_public: eventFormatPreview,
      event_theme_public: themePreview,
      program_requested: programRequested,
      message: formData.get("message") || "",
      internal_calendar_year: ULTRA_BOOTCAMP_AGENDA_YEAR,
      internal_calendar_month_index: defaultMonthIndex,
      internal_calendar_day: internalDay,
      status: ageFlag ? "flagged_for_review" : "pending",
      terms_accepted: formData.get("terms") === "on",
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_XANO_API_URL;
      if (!apiUrl) throw new Error("NEXT_PUBLIC_XANO_API_URL est manquante dans .env.local");

      const res = await fetch(`${apiUrl}/admission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Erreur serveur";
        try {
          const data = await res.json();
          msg = (data?.message as string) || msg;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }

      setSuccess(true);
      form.reset();
      setTimeout(() => onSuccess(), 2400);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
        <p className="text-green-400">
          {agendaAccessMode(eventTrack) === "validated"
            ? "Demande enregistrée. Notre équipe valide les accès Director & Executive sous 48h — vous recevrez la date exacte et le programme par canal sécurisé."
            : "Demande enregistrée. Un conseiller vous transmet la date précise, le programme détaillé et les modalités d’accès membre."}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-h-[min(78vh,640px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-white/[0.03] px-4 py-3 text-sm text-[#C8C8CF]">
        <p className="font-medium text-[#D4AF37]">{defaultMonthLabel} · {eventFormatPreview}</p>
        <p className="mt-1 text-xs leading-relaxed text-[#9999A9]">{themePreview}</p>
        <p className="mt-2 text-[11px] text-[#C9A84C]/90">
          Accès : {accessMode === "validated" ? "validation UltraBoost requise" : "accès direct ou semi-ouvert"} · Créneau
          public 18h00 – 21h00 (une fois par mois)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Civilité</span>
          <select name="civility" required className={selectCls}>
            <option value="">Sélectionner</option>
            <option value="M.">Monsieur</option>
            <option value="Mme">Madame</option>
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Nom</span>
          <input name="last_name" required autoComplete="family-name" className={inputCls} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>Prénoms</span>
        <input name="first_name" required autoComplete="given-name" className={inputCls} />
      </label>

      <div>
        <span className={labelCls}>Date de naissance</span>
        <div className="grid grid-cols-3 gap-3">
          <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} required className={selectCls}>
            <option value="">Jour</option>
            {availableDays.map((d) => (
              <option key={d} value={String(d)}>
                {d}
              </option>
            ))}
          </select>
          <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} required className={selectCls}>
            <option value="">Mois</option>
            {ADMISSION_MONTHS.map((mon, i) => (
              <option key={mon} value={String(i + 1)}>
                {mon}
              </option>
            ))}
          </select>
          <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required className={selectCls}>
            <option value="">Année</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="block">
        <span className={labelCls}>Mobile</span>
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.08)] bg-[rgba(26,26,37,0.8)] px-3 text-xs text-[#C9A84C]">
            {phoneCode}
          </span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              const next = normalizePhoneLocalDigits(e.target.value);
              setPhone(next);
              setPhoneError(
                next && !isValidPhoneLocalDigits(next)
                  ? "Numéro invalide (ex. 0710008282 ou +225 collé)."
                  : "",
              );
            }}
            className="glass-input w-full rounded-l-none px-4 py-3 text-sm"
          />
        </div>
        {phoneError && <p className="mt-2 text-xs text-red-400">{phoneError}</p>}
      </label>

      <label className="block">
        <span className={labelCls}>Email</span>
        <input name="email" type="email" required autoComplete="email" className={inputCls} />
      </label>

      <label className="block">
        <span className={labelCls}>Pays de résidence</span>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required className={selectCls}>
          {sortedCountries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelCls}>Fonction</span>
        <select
          value={selectedFonction}
          onChange={(e) => {
            setSelectedFonction(e.target.value);
            setShowAutreFonction(e.target.value === "Autre");
          }}
          required
          className={selectCls}
        >
          <option value="">Sélectionner</option>
          {sortedFonctions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>
      {showAutreFonction && (
        <label className="block">
          <span className={labelCls}>Précisez votre fonction</span>
          <input name="fonction_autre" required className={inputCls} />
        </label>
      )}

      <label className="block">
        <span className={labelCls}>Niveau (agenda)</span>
        <select
          value={eventTrack}
          onChange={(e) => setEventTrack(e.target.value as AgendaTrackKey)}
          required
          className={selectCls}
        >
          {EVENT_LEVEL_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelCls}>Message (facultatif)</span>
        <textarea name="message" rows={3} className={`${inputCls} resize-none`} placeholder="Contexte, disponibilités, invitation reçue…" />
      </label>

      <label className="block">
        <span className={labelCls}>LinkedIn (facultatif)</span>
        <input name="linkedin" type="url" className={inputCls} placeholder="https://linkedin.com/in/..." />
      </label>

      <label className="block">
        <span className={labelCls}>WhatsApp ({phoneCode})</span>
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.08)] bg-[rgba(26,26,37,0.8)] px-3 text-xs text-[#C9A84C]">
            {phoneCode}
          </span>
          <input
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            value={whatsapp}
            onChange={(e) => {
              const next = normalizePhoneLocalDigits(e.target.value);
              setWhatsapp(next);
              setWhatsappError(next && !isValidPhoneLocalDigits(next) ? "Numéro invalide." : "");
            }}
            className="glass-input w-full rounded-l-none px-4 py-3 text-sm"
          />
        </div>
        {whatsappError && <p className="mt-2 text-xs text-red-400">{whatsappError}</p>}
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-[rgba(212,175,55,0.12)] bg-white/[0.02] px-4 py-3">
        <input name="terms" required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#D4AF37]" />
        <span className="text-sm text-[#C8C8CF]">J&apos;accepte les conditions générales d&apos;UltraBoost</span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-sm">
        {loading ? "Envoi…" : "Envoyer la demande"}
      </button>
    </form>
  );
}
