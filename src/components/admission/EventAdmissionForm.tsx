"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ADMISSION_FONCTIONS,
  ADMISSION_MONTHS,
  admissionBirthYears,
  dialCodeForCountryName,
  sortedAdmissionCountries,
} from "@/data/admission-shared";
import { FormCguAcceptance } from "@/components/forms/FormCguAcceptance";
import { FormSuccessBlock } from "@/components/forms/FormSuccessBlock";
import { normalizePhoneLocalDigits, isValidPhoneLocalDigits } from "@/lib/formValidation";

const PARTICIPANT_LEVELS = [
  { value: "externe", label: "Externe" },
  { value: "ecosystem", label: "Ecosystem" },
  { value: "specialist", label: "Specialist" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "executive", label: "Executive" },
];

export type EventAdmissionFormProps = {
  eventTitle: string;
  eventDatetime: string;
  eventType: string;
  onClose: () => void;
};

export function EventAdmissionForm({ eventTitle, eventDatetime, eventType, onClose }: EventAdmissionFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [phoneDialCountry, setPhoneDialCountry] = useState("Côte d'Ivoire");
  const [whatsappDialCountry, setWhatsappDialCountry] = useState("Côte d'Ivoire");
  const [selectedCountry, setSelectedCountry] = useState("Côte d'Ivoire");
  const [selectedFonction, setSelectedFonction] = useState("");
  const [showAutreFonction, setShowAutreFonction] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [participantLevel, setParticipantLevel] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  useEffect(() => {
    if (!success) return;
    const t = window.setTimeout(() => onClose(), 5000);
    return () => window.clearTimeout(t);
  }, [success, onClose]);

  const years = useMemo(() => admissionBirthYears(), []);
  const availableDays = useMemo(() => {
    if (!birthYear || !birthMonth) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(Number(birthYear), Number(birthMonth), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  const phoneDialCode = useMemo(() => dialCodeForCountryName(phoneDialCountry), [phoneDialCountry]);
  const whatsappDialCode = useMemo(() => dialCodeForCountryName(whatsappDialCountry), [whatsappDialCountry]);

  const sortedCountries = useMemo(() => sortedAdmissionCountries(), []);
  const sortedDialCountries = sortedCountries;
  const sortedFonctions = useMemo(
    () => [...ADMISSION_FONCTIONS].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" })),
    [],
  );

  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#C9A84C]";
  const hintCls = "mt-1 block text-xs leading-relaxed text-[#888]";
  const inputCls = "glass-input w-full px-4 py-3 text-sm";
  const selectCls = "glass-input w-full px-4 py-3 text-sm appearance-none cursor-pointer";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!participantLevel) {
      setError("Veuillez indiquer votre niveau UltraBoost actuel.");
      setLoading(false);
      return;
    }
    if (!isValidPhoneLocalDigits(phone)) {
      setError("Téléphone invalide : chiffres uniquement (6 à 15), sans indicatif.");
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
    if (formData.get("terms") !== "on") {
      setError("Veuillez accepter les Conditions Générales d'Utilisation pour envoyer votre demande.");
      setLoading(false);
      return;
    }

    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`;

    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    const ageFlag = age < 36 ? "age_below_36" : "";

    const fonction =
      showAutreFonction
        ? ((formData.get("fonction_autre") as string) || "")
        : selectedFonction;

    const payload = {
      type: "event",
      civility: formData.get("civility") || "",
      first_name: formData.get("first_name") || "",
      last_name: formData.get("last_name") || "",
      date_of_birth: dateOfBirth,
      function_title: fonction,
      email: formData.get("email") || "",
      phone: `${phoneDialCode} ${phone || ""}`.trim(),
      whatsapp: `${whatsappDialCode} ${whatsapp || ""}`.trim(),
      country: selectedCountry,
      linkedin_url: formData.get("linkedin") || "",
      level_requested: participantLevel,
      ultraboost_level: "",
      program_requested: eventTitle,
      event_title: eventTitle,
      event_datetime: eventDatetime,
      event_type: eventType,
      status: ageFlag ? "flagged_for_review" : "pending",
      terms_accepted: formData.get("terms") === "on",
    };

    try {
      const res = await fetch("/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-2">
        <FormSuccessBlock />
        <p className="mt-3 text-center text-xs text-[#9999A9]">Cette fenêtre se fermera automatiquement dans quelques secondes.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-white/[0.03] px-4 py-3 text-sm text-[#C8C8CF]">
        <p className="font-medium text-[#D4AF37]">{eventTitle}</p>
        <p className="mt-1 text-xs text-[#9999A9]">{eventDatetime}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Civilité</span>
          <span className={hintCls}>Cliquez et choisissez M. ou Mme.</span>
          <select name="civility" required className={selectCls}>
            <option value="">Sélectionner</option>
            <option value="M.">Monsieur</option>
            <option value="Mme">Madame</option>
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Nom</span>
          <span className={hintCls}>Votre nom de famille.</span>
          <input name="last_name" required className={inputCls} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>Prénoms</span>
        <span className={hintCls}>Vos prénoms tels qu&apos;ils apparaîtront sur le dossier.</span>
        <input name="first_name" required className={inputCls} />
      </label>

      <div>
        <span className={labelCls}>Date de naissance</span>
        <span className={hintCls}>Sélectionnez jour, mois puis année.</span>
        <div className="grid grid-cols-3 gap-3">
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            required
            className={selectCls}
          >
            <option value="">Jour</option>
            {availableDays.map((d) => (
              <option key={d} value={String(d)}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            required
            className={selectCls}
          >
            <option value="">Mois</option>
            {ADMISSION_MONTHS.map((mon, i) => (
              <option key={mon} value={String(i + 1)}>
                {mon}
              </option>
            ))}
          </select>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
            className={selectCls}
          >
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
        <span className={labelCls}>Pays de résidence</span>
        <span className={hintCls}>Choisissez votre pays dans la liste.</span>
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
        <span className={hintCls}>Sélectionnez la catégorie la plus proche de votre poste.</span>
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
          <span className={hintCls}>Décrivez votre intitulé exact ou votre rôle.</span>
          <input name="fonction_autre" required className={inputCls} />
        </label>
      )}

      <label className="block">
        <span className={labelCls}>Email</span>
        <span className={hintCls}>Adresse à laquelle nous vous répondrons.</span>
        <input name="email" type="email" required className={inputCls} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Téléphone</span>
          <span className={hintCls}>Choisissez l&apos;indicatif pays si besoin, puis chiffres uniquement.</span>
          <div className="mt-2 flex min-w-0">
            <select
              value={phoneDialCountry}
              onChange={(e) => setPhoneDialCountry(e.target.value)}
              className="glass-input max-w-[min(48%,220px)] shrink-0 rounded-r-none border-r-0 px-2 py-3 text-[11px] sm:text-sm"
              aria-label="Indicatif téléphone"
            >
              {sortedDialCountries.map((c) => (
                <option key={`tel-${c.name}`} value={c.name}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              value={phone}
              onChange={(e) => {
                const next = normalizePhoneLocalDigits(e.target.value);
                setPhone(next);
                setPhoneError(
                  next && !isValidPhoneLocalDigits(next) ? "Chiffres uniquement (6 à 15), sans indicatif." : "",
                );
              }}
              name="phone"
              required
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel-national"
              className="glass-input min-w-0 flex-1 rounded-l-none px-4 py-3 text-sm"
            />
          </div>
          {phoneError && <p className="mt-2 text-xs text-red-400">{phoneError}</p>}
        </label>
        <label className="block">
          <span className={labelCls}>WhatsApp</span>
          <span className={hintCls}>Facultatif ; indicatif indépendant du téléphone si besoin.</span>
          <div className="mt-2 flex min-w-0">
            <select
              value={whatsappDialCountry}
              onChange={(e) => setWhatsappDialCountry(e.target.value)}
              className="glass-input max-w-[min(48%,220px)] shrink-0 rounded-r-none border-r-0 px-2 py-3 text-[11px] sm:text-sm"
              aria-label="Indicatif WhatsApp"
            >
              {sortedDialCountries.map((c) => (
                <option key={`wa-${c.name}`} value={c.name}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              value={whatsapp}
              onChange={(e) => {
                const next = normalizePhoneLocalDigits(e.target.value);
                setWhatsapp(next);
                setWhatsappError(
                  next && !isValidPhoneLocalDigits(next) ? "Chiffres uniquement (6 à 15), sans indicatif." : "",
                );
              }}
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel-national"
              className="glass-input min-w-0 flex-1 rounded-l-none px-4 py-3 text-sm"
            />
          </div>
          {whatsappError && <p className="mt-2 text-xs text-red-400">{whatsappError}</p>}
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>LinkedIn (facultatif — valorisé pour votre candidature)</span>
        <span className={hintCls}>Lien public de votre profil, si vous en avez un.</span>
        <input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className={inputCls} />
      </label>

      <label className="block">
        <span className={labelCls}>Niveau UltraBoost actuel</span>
        <span className={hintCls}>Niveau : cliquez et indiquez votre statut au sein de l&apos;écosystème.</span>
        <select
          value={participantLevel}
          onChange={(e) => setParticipantLevel(e.target.value)}
          required
          className={selectCls}
        >
          <option value="">Sélectionner</option>
          {PARTICIPANT_LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </label>

      <FormCguAcceptance id="event-admission-terms" />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-sm">
        {loading ? "Envoi…" : "Activer mon accès"}
      </button>
    </form>
  );
}
