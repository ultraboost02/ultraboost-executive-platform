"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ADMISSION_COUNTRIES,
  ADMISSION_DOMAINES,
  ADMISSION_FONCTIONS,
  ADMISSION_MONTHS,
  ADMISSION_SERVICE_TIERS,
  TRAVEL_DESTINATION_OPTIONS,
  TRAVEL_SESSION_OPTIONS,
  admissionBirthYears,
} from "@/data/admission-shared";
import { normalizePhoneLocalDigits, isValidPhoneLocalDigits } from "@/lib/formValidation";

export type AdmissionWizardVariant = "home" | "bootcamp" | "hub" | "travel" | "language" | "community";

export type AdmissionFormWizardProps = {
  variant: AdmissionWizardVariant;
  /** Niveau Travel pré-sélectionné (specialist | manager | director | executive) */
  travelLevelPreset?: string;
  /** Niveau Hub pré-sélectionné — mêmes clés que le select Hub */
  hubLevelPreset?: string;
  /** Programme langues / club (libellé complet) */
  languageProgramPreset?: string;
  /** Niveau community : ecosystem | specialist | manager | director | executive */
  communityLevelPreset?: string;
  /** Pré-sélections bootcamp (quand variant="bootcamp") */
  bootcampDomainePreset?: string;
  bootcampNiveauPreset?: string;
  bootcampProgrammePreset?: string;
  onSuccess?: () => void;
  /** Affiche le bandeau d’étapes (désactiver dans certains encarts si besoin) */
  showStepper?: boolean;
  className?: string;
};

export function AdmissionFormWizard({
  variant,
  travelLevelPreset,
  hubLevelPreset,
  languageProgramPreset,
  communityLevelPreset,
  bootcampDomainePreset,
  bootcampNiveauPreset,
  bootcampProgrammePreset,
  onSuccess,
  showStepper = true,
  className = "",
}: AdmissionFormWizardProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const [step, setStep] = useState(1);

  const [selectedCountry, setSelectedCountry] = useState("Côte d'Ivoire");
  const [selectedFonction, setSelectedFonction] = useState("");
  const [showAutreFonction, setShowAutreFonction] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const [selectedService, setSelectedService] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  /** Hub Distant / Présentiel / Hybride (formulaires Hub uniquement) */
  const [hubHubMode, setHubHubMode] = useState<"" | "hub_distant" | "hub_presentiel" | "hub_hybride">("");

  const [civility, setCivility] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  const [travelDestination, setTravelDestination] = useState("");
  const [travelPeriod, setTravelPeriod] = useState("");

  const phoneCode = useMemo(() => {
    const c = ADMISSION_COUNTRIES.find((x) => x.name === selectedCountry);
    if (c?.code) return c.code;
    return "+225";
  }, [selectedCountry]);

  const sortedCountries = useMemo(
    () => [...ADMISSION_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" })),
    [],
  );
  const sortedFonctions = useMemo(
    () => [...ADMISSION_FONCTIONS].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" })),
    [],
  );

  const availableNiveaux = useMemo(() => {
    if (!selectedDomaine || !ADMISSION_DOMAINES[selectedDomaine]) return {};
    return ADMISSION_DOMAINES[selectedDomaine].niveaux;
  }, [selectedDomaine]);

  const availableProgrammes = useMemo(() => {
    if (!selectedDomaine || !selectedNiveau) return [];
    const d = ADMISSION_DOMAINES[selectedDomaine];
    if (!d?.niveaux[selectedNiveau]) return [];
    return d.niveaux[selectedNiveau].programmes;
  }, [selectedDomaine, selectedNiveau]);

  const years = useMemo(() => admissionBirthYears(), []);
  const availableDays = useMemo(() => {
    if (!birthYear || !birthMonth) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(Number(birthYear), Number(birthMonth), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  useEffect(() => {
    if (variant !== "bootcamp" && variant !== "home") return;
    if (!selectedDomaine || !ADMISSION_DOMAINES[selectedDomaine]) return;
    const keys = Object.keys(ADMISSION_DOMAINES[selectedDomaine].niveaux);
    if (keys.length === 1) setSelectedNiveau(keys[0]!);
  }, [selectedDomaine, variant]);

  useEffect(() => {
    if (variant === "travel" && travelLevelPreset) {
      setSelectedNiveau(travelLevelPreset);
    }
  }, [variant, travelLevelPreset]);

  useEffect(() => {
    if (variant === "hub" && hubLevelPreset) {
      setSelectedNiveau(hubLevelPreset);
    }
  }, [variant, hubLevelPreset]);

  useEffect(() => {
    if (variant === "language" && languageProgramPreset) {
      setSelectedProgramme(languageProgramPreset);
    }
  }, [variant, languageProgramPreset]);

  useEffect(() => {
    if (variant === "community" && communityLevelPreset) {
      setSelectedNiveau(communityLevelPreset);
    }
  }, [variant, communityLevelPreset]);

  useEffect(() => {
    if (variant !== "bootcamp") return;
    if (bootcampDomainePreset) setSelectedDomaine(bootcampDomainePreset);
    if (bootcampNiveauPreset) setSelectedNiveau(bootcampNiveauPreset);
    if (bootcampProgrammePreset) setSelectedProgramme(bootcampProgrammePreset);
  }, [variant, bootcampDomainePreset, bootcampNiveauPreset, bootcampProgrammePreset]);

  function admissionType(): string {
    if (variant === "bootcamp") return "bootcamp";
    if (variant === "hub") return "hub";
    if (variant === "travel") return "travel";
    if (variant === "language") return "language";
    if (variant === "community") return "community";
    return selectedService || "bootcamp";
  }

  function validateStep1(): boolean {
    setStepError("");

    if (variant === "home") {
      if (!selectedService) {
        setStepError("Veuillez sélectionner un service.");
        return false;
      }
      if (selectedService === "bootcamp") {
        if (!selectedDomaine) {
          setStepError("Veuillez choisir un domaine.");
          return false;
        }
        if (Object.keys(availableNiveaux).length > 1 && !selectedNiveau) {
          setStepError("Veuillez choisir un niveau.");
          return false;
        }
        if (availableProgrammes.length > 0 && !selectedProgramme) {
          setStepError("Veuillez choisir un programme.");
          return false;
        }
      }
      if (selectedService === "hub" && !selectedNiveau) {
        setStepError("Veuillez choisir un niveau Hub.");
        return false;
      }
      if (selectedService === "travel" && !selectedNiveau) {
        setStepError("Veuillez choisir un niveau TravelBootcamp.");
        return false;
      }
    }

    if (variant === "bootcamp") {
      if (!selectedDomaine) {
        setStepError("Veuillez choisir un domaine.");
        return false;
      }
      if (Object.keys(availableNiveaux).length > 1 && !selectedNiveau) {
        setStepError("Veuillez choisir un niveau.");
        return false;
      }
      if (availableProgrammes.length > 0 && !selectedProgramme) {
        setStepError("Veuillez choisir un programme.");
        return false;
      }
    }

    if (variant === "hub" && !selectedNiveau) {
      setStepError("Veuillez choisir un niveau Hub.");
      return false;
    }

    if (variant === "language" && !selectedProgramme) {
      setStepError("Programme non défini.");
      return false;
    }

    if (variant === "community" && !selectedNiveau) {
      setStepError("Niveau communauté non défini.");
      return false;
    }

    if (variant === "travel" && !selectedNiveau) {
      setStepError("Veuillez choisir un niveau TravelBootcamp.");
      return false;
    }

    const isHubAdmission = variant === "hub" || (variant === "home" && selectedService === "hub");
    const isTravelAdmission = variant === "travel" || (variant === "home" && selectedService === "travel");
    if (isHubAdmission) {
      if (!hubHubMode) {
        setStepError("Veuillez choisir le mode Hub : Présentiel, Distance ou Hybride.");
        return false;
      }
    } else if (!isTravelAdmission && !selectedTier) {
      setStepError("Veuillez choisir une formule (Premium, Platinum, VIP, VVIP ou Elite).");
      return false;
    }

    return true;
  }

  function validateStep2(): boolean {
    setStepError("");
    if (!civility) {
      setStepError("Veuillez sélectionner votre civilité.");
      return false;
    }
    if (!nom.trim()) {
      setStepError("Veuillez renseigner votre nom.");
      return false;
    }
    if (!prenom.trim()) {
      setStepError("Veuillez renseigner vos prénoms.");
      return false;
    }
    if (!birthDay || !birthMonth || !birthYear) {
      setStepError("Veuillez renseigner votre date de naissance complète.");
      return false;
    }
    if (!selectedFonction) {
      setStepError("Veuillez sélectionner votre fonction.");
      return false;
    }
    if (showAutreFonction) {
      const autreInput = document.querySelector<HTMLInputElement>('input[name="fonction_autre"]');
      if (!autreInput?.value.trim()) {
        setStepError("Veuillez préciser votre fonction.");
        return false;
      }
    }
    if (!email.trim() || !email.includes("@")) {
      setStepError("Veuillez renseigner un email professionnel valide.");
      return false;
    }
    if (!phone.trim()) {
      setStepError("Veuillez renseigner votre numéro de téléphone.");
      return false;
    }
    if (!isValidPhoneLocalDigits(phone)) {
      setStepError("Veuillez saisir un numéro de téléphone valide (chiffres uniquement).");
      return false;
    }
    if (whatsapp.trim() && !isValidPhoneLocalDigits(whatsapp)) {
      setStepError("Veuillez saisir un WhatsApp valide (chiffres uniquement).");
      return false;
    }
    return true;
  }

  function handleDomaineChange(value: string) {
    setSelectedDomaine(value);
    setSelectedNiveau("");
    setSelectedProgramme("");
  }

  function handleNiveauChange(value: string) {
    setSelectedNiveau(value);
    setSelectedProgramme("");
  }

  function handleFonctionChange(value: string) {
    setSelectedFonction(value);
    setShowAutreFonction(value === "Autre");
  }

  function goToStep2() {
    if (validateStep1()) {
      setStep(2);
      setStepError("");
    }
  }

  function goToStep3() {
    if (validateStep2()) {
      setStep(3);
      setStepError("");
    }
  }

  function resetAll() {
    setStep(1);
    setSelectedService("");
    setSelectedDomaine("");
    setSelectedNiveau("");
    setSelectedProgramme("");
    setSelectedTier("");
    setCivility("");
    setNom("");
    setPrenom("");
    setEmail("");
    setPhone("");
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
    setSelectedFonction("");
    setShowAutreFonction(false);
    setTravelDestination("");
    setTravelPeriod("");
    setHubHubMode("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`;

    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    const ageFlag = age < 36 ? "age_below_36" : "";

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fonction = showAutreFonction
      ? ((formData.get("fonction_autre") as string) || "")
      : selectedFonction;

    const type = admissionType();
    const isHubAdmission = variant === "hub" || (variant === "home" && selectedService === "hub");
    const isTravelAdmission = variant === "travel" || (variant === "home" && selectedService === "travel");

    const payload: Record<string, unknown> = {
      type,
      civility,
      first_name: prenom,
      last_name: nom,
      date_of_birth: dateOfBirth,
      function_title: fonction,
      email,
      phone: `${phoneCode} ${phone}`.trim(),
      whatsapp: `${phoneCode} ${whatsapp || ""}`.trim(),
      country: selectedCountry,
      linkedin_url: formData.get("linkedin") || "",
      level_requested: selectedNiveau,
      program_requested: selectedProgramme,
      format_preference: formData.get("format") || "",
      schedule_preference: formData.get("horaire") || "",
      certificate_language: formData.get("langue") || "",
      ultraboost_level: isHubAdmission || isTravelAdmission ? "" : selectedTier,
      hub_delivery_mode: isHubAdmission ? hubHubMode : "",
      message: formData.get("message") || "",
      status: ageFlag ? "flagged_for_review" : "pending",
      terms_accepted: formData.get("terms") === "on",
    };

    if (isTravelAdmission) {
      payload.destination_preference = travelDestination || null;
      payload.period_preference = travelPeriod || null;
    }

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
      window.setTimeout(() => {
        form.reset();
        resetAll();
        setSuccess(false);
        onSuccess?.();
      }, 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#C9A84C]";
  const hintCls = "mt-1 block text-xs leading-relaxed text-[#888]";
  const inputCls = "glass-input w-full px-4 py-3 text-sm";
  const selectCls = "glass-input w-full px-4 py-3 text-sm appearance-none cursor-pointer";

  const isHubAdmission = variant === "hub" || (variant === "home" && selectedService === "hub");
  const isTravelAdmission = variant === "travel" || (variant === "home" && selectedService === "travel");

  return (
    <div className={className}>
      {showStepper && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step >= s ? "bg-[#C9A84C] text-[#0A0A0F]" : "bg-white/10 text-[#666]"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`h-0.5 w-6 sm:w-8 ${step > s ? "bg-[#C9A84C]" : "bg-white/10"}`} />}
            </div>
          ))}
          <span className="ml-1 text-xs text-[#9999A9]">
            {step === 1 &&
              (isHubAdmission ? "Programme & mode Hub" : isTravelAdmission ? "Programme & destination" : "Programme & formule")}
            {step === 2 && "Informations personnelles"}
            {step === 3 && "Finalisation"}
          </span>
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-400">
          Votre demande a bien été enregistrée. Merci — nous revenons vers vous très prochainement. (Ce message disparaît
          sous 5 secondes.)
        </div>
      )}

      {stepError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {stepError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="space-y-4"
            >
              {variant === "language" && (
                <div className="rounded-xl border border-[rgba(201,168,76,0.2)] bg-white/[0.03] px-4 py-3">
                  <span className={labelCls}>Programme sélectionné</span>
                  <p className="text-sm font-medium text-[#F5F5F7]">{selectedProgramme || languageProgramPreset}</p>
                </div>
              )}

              {variant === "community" && (
                <div className="rounded-xl border border-[rgba(201,168,76,0.2)] bg-white/[0.03] px-4 py-3">
                  <span className={labelCls}>Niveau communauté</span>
                  <p className="text-sm font-medium text-[#F5F5F7]">
                    {(
                      {
                        ecosystem: "Écosystème",
                        specialist: "Specialist",
                        manager: "Manager",
                        director: "Director",
                        executive: "Executive",
                      } as Record<string, string>
                    )[selectedNiveau] ?? selectedNiveau}
                  </p>
                </div>
              )}

              {variant === "home" && (
                <label className="block">
                  <span className={labelCls}>Quel service vous intéresse ?</span>
                  <span className={hintCls}>Cliquez dans la liste et choisissez le service qui correspond à votre demande.</span>
                  <select
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setSelectedDomaine("");
                      setSelectedNiveau("");
                      setSelectedProgramme("");
                      setHubHubMode("");
                      setTravelDestination("");
                      setTravelPeriod("");
                      setStepError("");
                    }}
                    required
                    className={selectCls}
                  >
                    <option value="">Sélectionner un service</option>
                    <option value="bootcamp">UltraBootcamps</option>
                    <option value="hub">UltraBoost Hub</option>
                    <option value="travel">TravelBootcamps</option>
                    <option value="language">Bootcamps Langues</option>
                    <option value="community">Community</option>
                    <option value="event">Événements</option>
                  </select>
                </label>
              )}

              {(variant === "bootcamp" || (variant === "home" && selectedService === "bootcamp")) && (
                <>
                  <label className="block">
                    <span className={labelCls}>Domaine</span>
                    <span className={hintCls}>Sélectionnez le domaine de formation (Écosystèmes, Applications, Expertise…).</span>
                    <select
                      value={selectedDomaine}
                      onChange={(e) => {
                        handleDomaineChange(e.target.value);
                        setStepError("");
                      }}
                      required
                      className={selectCls}
                    >
                      <option value="">Choisir un domaine</option>
                      {Object.entries(ADMISSION_DOMAINES).map(([key, d]) => (
                        <option key={key} value={key}>
                          {d.label} — {d.description}
                        </option>
                      ))}
                    </select>
                  </label>

                  {selectedDomaine && Object.keys(availableNiveaux).length > 1 && (
                    <label className="block">
                      <span className={labelCls}>Niveau</span>
                      <span className={hintCls}>Niveau : cliquez et choisissez votre niveau dans la liste.</span>
                      <select
                        value={selectedNiveau}
                        onChange={(e) => {
                          handleNiveauChange(e.target.value);
                          setStepError("");
                        }}
                        required
                        className={selectCls}
                      >
                        <option value="">Choisir un niveau</option>
                        {Object.entries(availableNiveaux).map(([key, n]) => (
                          <option key={key} value={key}>
                            {n.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}

                  {availableProgrammes.length > 0 && (
                    <label className="block">
                      <span className={labelCls}>Programme souhaité</span>
                      <span className={hintCls}>Choisissez le bootcamp ou le programme précis que vous visez.</span>
                      <select
                        value={selectedProgramme}
                        onChange={(e) => {
                          setSelectedProgramme(e.target.value);
                          setStepError("");
                        }}
                        required
                        className={selectCls}
                      >
                        <option value="">Choisir un bootcamp</option>
                        {availableProgrammes.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </>
              )}

              {variant === "home" && selectedService === "hub" && (
                <label className="block">
                  <span className={labelCls}>Niveau Hub souhaité</span>
                  <span className={hintCls}>Niveau Hub : cliquez et choisissez l&apos;offre (Specialist, Manager, Director, Executive).</span>
                  <select
                    value={selectedNiveau}
                    onChange={(e) => {
                      setSelectedNiveau(e.target.value);
                      setStepError("");
                    }}
                    required
                    className={selectCls}
                  >
                    <option value="">Choisir</option>
                    <option value="specialist">Hub Specialist — 58 250 FCFA/mois</option>
                    <option value="manager">Hub Manager — 83 250 FCFA/mois</option>
                    <option value="director">Hub Director — 133 250 FCFA/mois</option>
                    <option value="executive">Hub Executive — 245 250 FCFA/mois</option>
                  </select>
                </label>
              )}

              {variant === "hub" && (
                <label className="block">
                  <span className={labelCls}>Niveau Hub</span>
                  <span className={hintCls}>Niveau : cliquez et choisissez votre segment Hub dans la liste.</span>
                  <select
                    value={selectedNiveau}
                    onChange={(e) => {
                      setSelectedNiveau(e.target.value);
                      setStepError("");
                    }}
                    required
                    className={selectCls}
                  >
                    <option value="">Choisir</option>
                    <option value="specialist">Hub Specialist — 58 250 FCFA/mois</option>
                    <option value="manager">Hub Manager — 83 250 FCFA/mois</option>
                    <option value="director">Hub Director — 133 250 FCFA/mois</option>
                    <option value="executive">Hub Executive — 245 250 FCFA/mois</option>
                  </select>
                </label>
              )}

              {isHubAdmission && (
                <div>
                  <span className={labelCls}>Mode Hub</span>
                  <span className={hintCls}>
                    Choisissez Hub Présentiel, Hub Distance ou Hub Hybride selon votre mode de suivi.
                  </span>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {(
                      [
                        { value: "hub_presentiel" as const, label: "Hub Présentiel" },
                        { value: "hub_distant" as const, label: "Hub Distance" },
                        { value: "hub_hybride" as const, label: "Hub Hybride" },
                      ] as const
                    ).map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center text-sm font-medium transition ${
                          hubHubMode === opt.value
                            ? "border-[#C9A84C] bg-[rgba(201,168,76,0.12)] text-[#F5F5F7]"
                            : "border-white/10 bg-white/[0.02] text-[#C8C8CF] hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="hub_mode"
                          className="sr-only"
                          checked={hubHubMode === opt.value}
                          onChange={() => {
                            setHubHubMode(opt.value);
                            setStepError("");
                          }}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {variant === "home" && selectedService === "travel" && (
                <>
                  <label className="block">
                    <span className={labelCls}>Niveau TravelBootcamp</span>
                    <span className={hintCls}>Niveau : cliquez et choisissez le parcours Travel aligné avec votre profil.</span>
                    <select
                      value={selectedNiveau}
                      onChange={(e) => {
                        setSelectedNiveau(e.target.value);
                        setStepError("");
                      }}
                      required
                      className={selectCls}
                    >
                      <option value="">Choisir</option>
                      <option value="specialist">Travel Specialist — Marketing Digital & IA</option>
                      <option value="manager">Travel Manager — Management Digital & Stratégie IA</option>
                      <option value="director">Travel Director — Transformation Digital & Stratégie IA</option>
                      <option value="executive">Travel Executive — Gouvernance Digital & Stratégie IA</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelCls}>Destination souhaitée (liste)</span>
                    <select
                      value={travelDestination}
                      onChange={(e) => setTravelDestination(e.target.value)}
                      className={selectCls}
                    >
                      <option value="">— Indifférent / à définir —</option>
                      {TRAVEL_DESTINATION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelCls}>Session souhaitée (liste)</span>
                    <select
                      value={travelPeriod}
                      onChange={(e) => setTravelPeriod(e.target.value)}
                      className={selectCls}
                    >
                      <option value="">— Indifférent / à définir —</option>
                      {TRAVEL_SESSION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {variant === "travel" && (
                <>
                  <label className="block">
                    <span className={labelCls}>Niveau TravelBootcamp</span>
                    <span className={hintCls}>Choisissez le niveau du bootcamp Travel correspondant à votre ambition.</span>
                    <select
                      value={selectedNiveau}
                      onChange={(e) => {
                        setSelectedNiveau(e.target.value);
                        setStepError("");
                      }}
                      required
                      className={selectCls}
                    >
                      <option value="">Choisir</option>
                      <option value="specialist">Travel Specialist — Marketing Digital & IA</option>
                      <option value="manager">Travel Manager — Management Digital & Stratégie IA</option>
                      <option value="director">Travel Director — Transformation Digital & Stratégie IA</option>
                      <option value="executive">Travel Executive — Gouvernance Digital & Stratégie IA</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelCls}>Destination souhaitée (liste)</span>
                    <select
                      value={travelDestination}
                      onChange={(e) => setTravelDestination(e.target.value)}
                      className={selectCls}
                    >
                      <option value="">— Indifférent / à définir —</option>
                      {TRAVEL_DESTINATION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelCls}>Session souhaitée (liste)</span>
                    <select
                      value={travelPeriod}
                      onChange={(e) => setTravelPeriod(e.target.value)}
                      className={selectCls}
                    >
                      <option value="">— Indifférent / à définir —</option>
                      {TRAVEL_SESSION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {!isHubAdmission && !isTravelAdmission && (
                <div>
                  <span className={labelCls}>Formule</span>
                  <span className={hintCls}>Formule : sélectionnez l&apos;offre d&apos;accompagnement qui vous convient.</span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ADMISSION_SERVICE_TIERS.map((tier) => (
                      <label
                        key={tier.value}
                        onClick={() => setStepError("")}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          selectedTier === tier.value
                            ? "border-[#C9A84C] bg-[rgba(201,168,76,0.08)]"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tier_choice"
                          checked={selectedTier === tier.value}
                          onChange={() => setSelectedTier(tier.value)}
                          className="sr-only"
                        />
                        <span className="text-xs text-[#C9A84C]">{tier.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-[#F5F5F7]">{tier.label}</p>
                          <p className="text-xs text-[#9999A9]">{tier.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button type="button" onClick={goToStep2} className="btn-gold w-full py-3 text-sm">
                Continuer
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Civilité</span>
                  <span className={hintCls}>Indiquez comment nous devons vous adresser (M. ou Mme).</span>
                  <select
                    value={civility}
                    onChange={(e) => {
                      setCivility(e.target.value);
                      setStepError("");
                    }}
                    required
                    className={selectCls}
                  >
                    <option value="">Sélectionner</option>
                    <option value="M.">Monsieur</option>
                    <option value="Mme">Madame</option>
                  </select>
                </label>
                <label className="block">
                  <span className={labelCls}>Nom</span>
                  <span className={hintCls}>Votre nom de famille tel qu&apos;il figure sur vos documents.</span>
                  <input
                    value={nom}
                    onChange={(e) => {
                      setNom(e.target.value);
                      setStepError("");
                    }}
                    required
                    type="text"
                    className={inputCls}
                  />
                </label>
              </div>

              <label className="block">
                <span className={labelCls}>Prénoms</span>
                <span className={hintCls}>Saisissez vos prénoms complets.</span>
                <input
                  value={prenom}
                  onChange={(e) => {
                    setPrenom(e.target.value);
                    setStepError("");
                  }}
                  required
                  type="text"
                  className={inputCls}
                />
              </label>

              <div>
                <span className={labelCls}>Date de naissance</span>
                <span className={hintCls}>Jour, mois et année — utilisés pour la conformité de votre dossier.</span>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={birthDay}
                    onChange={(e) => {
                      setBirthDay(e.target.value);
                      setStepError("");
                    }}
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
                    onChange={(e) => {
                      setBirthMonth(e.target.value);
                      setStepError("");
                    }}
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
                    onChange={(e) => {
                      setBirthYear(e.target.value);
                      setStepError("");
                    }}
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
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  required
                  className={selectCls}
                >
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
                    handleFonctionChange(e.target.value);
                    setStepError("");
                  }}
                  required
                  className={selectCls}
                >
                  <option value="">Sélectionner votre fonction</option>
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
                  <input name="fonction_autre" required type="text" className={inputCls} />
                </label>
              )}

              <label className="block">
                <span className={labelCls}>Email professionnel</span>
                <span className={hintCls}>Une adresse que vous consultez régulièrement (idéalement professionnelle).</span>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStepError("");
                  }}
                  required
                  type="email"
                  className={inputCls}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Téléphone ({phoneCode || "—"})</span>
                  <div className="flex">
                    <span className="flex items-center rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.08)] bg-[rgba(26,26,37,0.8)] px-3 text-xs text-[#C9A84C]">
                      {phoneCode || "—"}
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => {
                        const next = normalizePhoneLocalDigits(e.target.value);
                        setPhone(next);
                        setPhoneError(
                          next && !isValidPhoneLocalDigits(next)
                            ? "Numéro invalide : chiffres uniquement (ex. 0710008282 ou +225 collé)."
                            : "",
                        );
                        setStepError("");
                      }}
                      required
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="07 10 00 82 82"
                      className="glass-input w-full rounded-l-none px-4 py-3 text-sm"
                    />
                  </div>
                  {phoneError && <p className="mt-2 text-xs text-red-400">{phoneError}</p>}
                </label>
                <label className="block">
                  <span className={labelCls}>WhatsApp ({phoneCode || "—"})</span>
                  <div className="flex">
                    <span className="flex items-center rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.08)] bg-[rgba(26,26,37,0.8)] px-3 text-xs text-[#C9A84C]">
                      {phoneCode || "—"}
                    </span>
                    <input
                      value={whatsapp}
                      onChange={(e) => {
                        const next = normalizePhoneLocalDigits(e.target.value);
                        setWhatsapp(next);
                        setWhatsappError(
                          next && !isValidPhoneLocalDigits(next)
                            ? "Numéro invalide : chiffres uniquement."
                            : "",
                        );
                        setStepError("");
                      }}
                      name="whatsapp"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="07 10 00 82 82"
                      className="glass-input w-full rounded-l-none px-4 py-3 text-sm"
                    />
                  </div>
                  {whatsappError && <p className="mt-2 text-xs text-red-400">{whatsappError}</p>}
                </label>
              </div>

              <label className="block">
                <span className={labelCls}>LinkedIn (facultatif — valorisé pour votre candidature)</span>
                <input
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/votre-profil"
                  className={inputCls}
                />
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setStepError("");
                  }}
                  className="btn-outline-gold w-1/3 py-3 text-sm"
                >
                  Retour
                </button>
                <button type="button" onClick={goToStep3} className="btn-gold w-2/3 py-3 text-sm">
                  Continuer
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="space-y-4"
            >
              <label className="block">
                <span className={labelCls}>Langue du certificat</span>
                <span className={hintCls}>Choisissez la langue souhaitée pour votre attestations / certification.</span>
                <select name="langue" className={selectCls}>
                  <option value="">Sélectionner</option>
                  <option value="fr_100">100% Français</option>
                  <option value="en_100">100% Anglais</option>
                  <option value="fr_50_en_50">50% Français & 50% Anglais</option>
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Format</span>
                  <span className={hintCls}>Indiquez le format de suivi et le créneau qui vous conviennent le mieux.</span>
                  <select name="format" className={selectCls}>
                    <option value="">Choisir</option>
                    <option value="online">Distance (en ligne)</option>
                    <option value="presential">Présentiel</option>
                    <option value="hybrid">Hybride</option>
                    <option value="vip">VIP</option>
                  </select>
                </label>
                <label className="block">
                  <span className={labelCls}>Horaire souhaité</span>
                  <select name="horaire" className={selectCls}>
                    <option value="">Choisir</option>
                    <option value="morning">Morning : 09h — 12h</option>
                    <option value="afternoon">Afternoon : 13h — 15h</option>
                    <option value="full_day">Full Day : 09h — 15h</option>
                    <option value="evening">Evening : 18h — 21h</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={labelCls}>Message (facultatif)</span>
                <textarea name="message" rows={3} className="glass-input w-full resize-none px-4 py-3 text-sm" />
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-[rgba(212,175,55,0.12)] bg-white/[0.02] px-4 py-3">
                <input name="terms" required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#D4AF37]" />
                <span className="text-sm text-[#C8C8CF]">
                  J&apos;accepte les conditions générales d&apos;UltraBoost
                </span>
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setStepError("");
                  }}
                  className="btn-outline-gold w-1/3 py-3 text-sm"
                >
                  Retour
                </button>
                <button type="submit" disabled={loading} className="btn-gold w-2/3 py-3 text-sm">
                  {loading ? "Envoi en cours..." : "Soumettre ma candidature"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
