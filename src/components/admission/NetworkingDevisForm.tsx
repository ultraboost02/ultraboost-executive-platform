"use client";

import { useMemo, useState } from "react";
import { ADMISSION_FONCTIONS, dialCodeForCountryName, sortedAdmissionCountries } from "@/data/admission-shared";
import { FormCguAcceptance } from "@/components/forms/FormCguAcceptance";
import { FormSuccessBlock } from "@/components/forms/FormSuccessBlock";
import { normalizePhoneLocalDigits, isValidPhoneLocalDigits } from "@/lib/formValidation";

export type NetworkingServiceType = "recrutement_standard" | "matchmaking" | "sur_mesure";

const SERVICE_LABELS: Record<NetworkingServiceType, string> = {
  recrutement_standard: "Recrutement Standard",
  matchmaking: "Matchmaking Payant",
  sur_mesure: "Solutions Sur-Mesure",
};

type Props = {
  serviceType: NetworkingServiceType;
  onSuccess?: () => void;
};

export function NetworkingDevisForm({ serviceType, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneDialCountry, setPhoneDialCountry] = useState("Côte d'Ivoire");
  const [whatsappDialCountry, setWhatsappDialCountry] = useState("Côte d'Ivoire");
  const [selectedCountry, setSelectedCountry] = useState("Côte d'Ivoire");
  const [selectedFonction, setSelectedFonction] = useState("");
  const [showAutreFonction, setShowAutreFonction] = useState(false);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

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
    setLoading(true);
    setError("");
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

    const fonction =
      showAutreFonction ? ((formData.get("fonction_autre") as string) || "") : selectedFonction;

    const payload = {
      type: "networking",
      networking_service: SERVICE_LABELS[serviceType],
      networking_service_key: serviceType,
      civility: formData.get("civility") || "",
      first_name: formData.get("first_name") || "",
      last_name: formData.get("last_name") || "",
      email: formData.get("email") || "",
      phone: `${phoneDialCode} ${phone || ""}`.trim(),
      whatsapp: `${whatsappDialCode} ${whatsapp || ""}`.trim(),
      country: selectedCountry,
      function_title: fonction,
      request_category: formData.get("request_category") || "",
      company_name: formData.get("company_name") || "",
      description: formData.get("description") || "",
      terms_accepted: formData.get("terms") === "on",
      status: "pending",
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
      window.setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return <FormSuccessBlock />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-xl border border-[rgba(201,168,76,0.18)] bg-white/[0.03] px-4 py-3 text-sm text-[#C8C8CF]">
        <span className="text-[#D4AF37]">Service :</span> {SERVICE_LABELS[serviceType]}
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
        <span className={hintCls}>Prénoms pour le suivi du dossier.</span>
        <input name="first_name" required className={inputCls} />
      </label>

      <label className="block">
        <span className={labelCls}>Email</span>
        <span className={hintCls}>Adresse pour la réponse de l&apos;équipe commerciale.</span>
        <input name="email" type="email" required className={inputCls} />
      </label>

      <label className="block">
        <span className={labelCls}>Pays</span>
        <span className={hintCls}>Pays de résidence ou du siège selon le contexte.</span>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required className={selectCls}>
          {sortedCountries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Téléphone</span>
          <span className={hintCls}>Indicatif pays au choix, puis chiffres uniquement.</span>
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
          <span className={hintCls}>Facultatif.</span>
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
        <span className={labelCls}>Fonction</span>
        <span className={hintCls}>Sélectionnez la ligne qui correspond le mieux à votre rôle.</span>
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
          <span className={hintCls}>Indiquez le libellé exact de votre poste.</span>
          <input name="fonction_autre" required className={inputCls} />
        </label>
      )}

      <label className="block">
        <span className={labelCls}>Type de demande</span>
        <span className={hintCls}>Précisez la nature de votre besoin.</span>
        <select name="request_category" required className={selectCls}>
          <option value="">Sélectionner</option>
          <option value="recrutement">Recrutement</option>
          <option value="partenariats">Partenariats</option>
          <option value="projets_ia_digital">Projets IA & Digital</option>
        </select>
      </label>

      <label className="block">
        <span className={labelCls}>Nom de l&apos;entreprise</span>
        <span className={hintCls}>Raison sociale ou marque telle que vous souhaitez qu&apos;elle apparaisse.</span>
        <input name="company_name" required className={inputCls} />
      </label>

      <label className="block">
        <span className={labelCls}>Description du besoin</span>
        <span className={hintCls}>En quelques phrases : contexte, objectifs, délais éventuels.</span>
        <textarea name="description" required rows={4} className="glass-input w-full resize-none px-4 py-3 text-sm" />
      </label>

      <FormCguAcceptance id="networking-terms" />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-sm">
        {loading ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
