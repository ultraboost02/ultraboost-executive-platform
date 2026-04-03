"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";

// ============================================================
// DONNÉES
// ============================================================

const countries = [
  { name: "Côte d'Ivoire", code: "+225", flag: "🇨🇮" },
  { name: "Sénégal", code: "+221", flag: "🇸🇳" },
  { name: "Cameroun", code: "+237", flag: "🇨🇲" },
  { name: "Mali", code: "+223", flag: "🇲🇱" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
  { name: "Guinée", code: "+224", flag: "🇬🇳" },
  { name: "Bénin", code: "+229", flag: "🇧🇯" },
  { name: "Togo", code: "+228", flag: "🇹🇬" },
  { name: "Niger", code: "+227", flag: "🇳🇪" },
  { name: "Gabon", code: "+241", flag: "🇬🇦" },
  { name: "Congo (RDC)", code: "+243", flag: "🇨🇩" },
  { name: "Congo (Brazzaville)", code: "+242", flag: "🇨🇬" },
  { name: "Tchad", code: "+235", flag: "🇹🇩" },
  { name: "Centrafrique", code: "+236", flag: "🇨🇫" },
  { name: "Madagascar", code: "+261", flag: "🇲🇬" },
  { name: "Rwanda", code: "+250", flag: "🇷🇼" },
  { name: "Mauritanie", code: "+222", flag: "🇲🇷" },
  { name: "Comores", code: "+269", flag: "🇰🇲" },
  { name: "Djibouti", code: "+253", flag: "🇩🇯" },
  { name: "Maroc", code: "+212", flag: "🇲🇦" },
  { name: "Tunisie", code: "+216", flag: "🇹🇳" },
  { name: "Algérie", code: "+213", flag: "🇩🇿" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "Afrique du Sud", code: "+27", flag: "🇿🇦" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Tanzanie", code: "+255", flag: "🇹🇿" },
  { name: "Éthiopie", code: "+251", flag: "🇪🇹" },
  { name: "Angola", code: "+244", flag: "🇦🇴" },
  { name: "Mozambique", code: "+258", flag: "🇲🇿" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Belgique", code: "+32", flag: "🇧🇪" },
  { name: "Suisse", code: "+41", flag: "🇨🇭" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Royaume-Uni", code: "+44", flag: "🇬🇧" },
  { name: "Allemagne", code: "+49", flag: "🇩🇪" },
  { name: "Italie", code: "+39", flag: "🇮🇹" },
  { name: "Espagne", code: "+34", flag: "🇪🇸" },
  { name: "Portugal", code: "+351", flag: "🇵🇹" },
  { name: "Pays-Bas", code: "+31", flag: "🇳🇱" },
  { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
  { name: "Monaco", code: "+377", flag: "🇲🇨" },
  { name: "États-Unis", code: "+1", flag: "🇺🇸" },
  { name: "Brésil", code: "+55", flag: "🇧🇷" },
  { name: "Haïti", code: "+509", flag: "🇭🇹" },
  { name: "Liban", code: "+961", flag: "🇱🇧" },
  { name: "Chine", code: "+86", flag: "🇨🇳" },
  { name: "Japon", code: "+81", flag: "🇯🇵" },
  { name: "Inde", code: "+91", flag: "🇮🇳" },
  { name: "Émirats Arabes Unis", code: "+971", flag: "🇦🇪" },
  { name: "Arabie Saoudite", code: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Turquie", code: "+90", flag: "🇹🇷" },
  { name: "Russie", code: "+7", flag: "🇷🇺" },
  { name: "Australie", code: "+61", flag: "🇦🇺" },
  { name: "Autre", code: "", flag: "🌍" },
];

const fonctions = [
  "Président Directeur Général (PDG / CEO)",
  "Président du Conseil d'Administration (PCA)",
  "Directeur Général (DG)",
  "Directeur Général Adjoint (DGA)",
  "Administrateur de Société",
  "Ministre",
  "Secrétaire d'État",
  "Secrétaire Général",
  "Directeur de Cabinet",
  "Ambassadeur",
  "Gouverneur",
  "Député / Sénateur",
  "Maire",
  "Préfet",
  "Directeur Financier (DAF / CFO)",
  "Directeur des Ressources Humaines (DRH)",
  "Directeur Commercial",
  "Directeur Marketing (CMO)",
  "Directeur Technique (CTO)",
  "Directeur des Opérations (COO)",
  "Directeur de la Stratégie",
  "Directeur de la Communication",
  "Directeur Juridique",
  "Directeur Informatique (DSI / CIO)",
  "Directeur de Projet",
  "Directeur de Département",
  "Directeur Régional",
  "Directeur Pays",
  "Manager / Responsable d'Équipe",
  "Chef de Service",
  "Chef de Département",
  "Chef de Projet / Project Manager",
  "Cadre Supérieur",
  "Coordinateur / Responsable de Programme",
  "Consultant Senior",
  "Consultant",
  "Expert / Spécialiste",
  "Analyste Senior",
  "Entrepreneur / Fondateur",
  "Co-fondateur / Associé",
  "Investisseur / Business Angel",
  "Business Developer",
  "Formateur / Coach professionnel",
  "Conférencier / Speaker",
  "Chercheur / Enseignant-chercheur",
  "Professeur d'Université",
  "Avocat / Juriste",
  "Médecin / Chirurgien",
  "Pharmacien",
  "Ingénieur Senior",
  "Architecte",
  "Expert-Comptable / Commissaire aux comptes",
  "Banquier / Directeur d'Agence",
  "Notaire",
  "Diplomate",
  "Officier supérieur (Armée / Gendarmerie / Police)",
  "Haut fonctionnaire (Cadre A+)",
  "Journaliste / Directeur de rédaction",
  "Artiste / Producteur",
  "Freelance / Indépendant",
  "En transition professionnelle",
  "Retraité (ancien dirigeant)",
  "Autre",
];

const domaines: Record<string, {
  label: string;
  description: string;
  niveaux: Record<string, { label: string; cert: string; programmes: string[] }>;
}> = {
  ecosystemes: {
    label: "Écosystèmes",
    description: "Vision & Environnement Digital",
    niveaux: {
      ecosystem: {
        label: "Ecosystem — Digital Awareness Certificate",
        cert: "Digital Awareness Certificate",
        programmes: [
          "Automatisation vente WhatsApp (9h — 145 800 FCFA)",
          "Dactylographie & maîtrise ordinateur (18h — 185 000 FCFA)",
          "Écosystème & Outils Digital & IA (25h — 385 000 FCFA)",
          "Automatisation Force de vente & Stratégie IA (20h — 385 000 FCFA)",
          "Vente en ligne (20h — 385 000 FCFA)",
          "Écosystème Marketing Digital (25h — 385 000 FCFA)",
          "Écosystème E-Commerce (25h — 385 000 FCFA)",
          "Écosystème Communication Digitale (25h — 385 000 FCFA)",
          "Écosystème E-Business (25h — 385 000 FCFA)",
          "Écosystème Cybersécurité (25h — 385 000 FCFA)",
          "Écosystème Développement d'Applications (25h — 385 000 FCFA)",
          "Écosystème Management de Projets Digitaux & IA (25h — 385 000 FCFA)",
          "Écosystème Graphisme & Design Digital (25h — 385 000 FCFA)",
          "Écosystème Droit du Numérique & Éthique (25h — 385 000 FCFA)",
          "Écosystème FinTech (25h — 385 000 FCFA)",
          "Écosystème InsurTech (30h — 485 000 FCFA)",
          "Écosystème AgriTech (30h — 485 000 FCFA)",
          "Écosystème EdTech (30h — 485 000 FCFA)",
          "Écosystème HealthTech (30h — 485 000 FCFA)",
          "Écosystème PropTech (30h — 485 000 FCFA)",
          "Écosystème GreenTech (30h — 485 000 FCFA)",
          "Écosystème LogTech (30h — 485 000 FCFA)",
        ],
      },
    },
  },
  applications: {
    label: "Applications",
    description: "Logiciels & Outils du marché international",
    niveaux: {
      applications: {
        label: "Applications — Maîtrise des outils",
        cert: "Application Proficiency Certificate",
        programmes: [
          "HubSpot (20h — 385 000 FCFA)",
          "Zoho CRM (20h — 585 000 FCFA)",
          "Salesforce (25h — 385 000 FCFA)",
          "Pipedrive (18h — 255 000 FCFA)",
          "Bitrix24 (18h — 255 000 FCFA)",
          "WhatsApp Business API (12h — 195 000 FCFA)",
          "Slack (9h — 245 000 FCFA)",
          "Zoom (9h — 145 000 FCFA)",
          "Microsoft Teams (12h — 175 000 FCFA)",
          "Stripe (15h — 425 000 FCFA)",
          "Paystack (12h — 395 000 FCFA)",
          "WordPress (25h — 385 000 FCFA)",
          "Shopify (20h — 385 000 FCFA)",
          "Mailchimp (15h — 225 000 FCFA)",
          "ChatGPT / OpenAI (12h — 255 000 FCFA)",
          "Zapier (15h — 255 000 FCFA)",
          "Make / Integromat (15h — 255 000 FCFA)",
          "Notion (12h — 195 000 FCFA)",
          "Microsoft Excel (25h — 185 000 FCFA)",
          "Google Sheets (18h — 125 000 FCFA)",
        ],
      },
    },
  },
  expertise: {
    label: "Expertise & Stratégie",
    description: "Bootcamps avancés par niveau de responsabilité",
    niveaux: {
      specialist: {
        label: "Specialist — Professional Certificate (545 000 FCFA — 45h)",
        cert: "Professional Certificate",
        programmes: ["Marketing Digital & Stratégie IA", "Marketing des IA", "E-Commerce & Stratégie IA", "Communication Digitale & Stratégie IA", "Design & Graphisme Digital", "UX/UI & Produits Numériques", "Développement de Sites Web", "Développement d'Applications Mobiles", "Cloud & DevOps", "Droit du Digital & IA", "Data & Analyse", "FinTech", "Cybersécurité", "Intelligence Artificielle"],
      },
      manager: {
        label: "Manager — Advanced Certification (1 345 000 FCFA — 50h)",
        cert: "Advanced Certification",
        programmes: ["Management de Projet Digital & Stratégie IA", "Management de Projet E-business", "Management de Projets Fintech & InsurTech", "Management de Projet Disruption", "Management Digital Business Marketing & Communication", "Management Développement Technologique & Innovation", "Management Design & Expérience Utilisateur", "Management Digital IA & Conformité", "Management Technologies Sectorielles", "Management FinTech", "Management InsurTech", "Management AgriTech", "Management EdTech", "Management HealthTech", "Management PropTech", "Management GreenTech", "Management LogTech"],
      },
      director: {
        label: "Director — Executive Diploma (1 850 000 FCFA — 42h)",
        cert: "Executive Diploma",
        programmes: ["Director Digital & Stratégie IA", "Director Data & IA", "Gouvernance Disruption & Stratégie IA", "Director Finance & Assurance", "Pilotage Digital E-Business & Stratégie IA", "Pilotage Sécurité & Conformité", "Pilotage Data & Intelligence Artificielle", "Pilotage Fintech & InsurTech", "Pilotage AgriTech", "Pilotage EdTech", "Pilotage HealthTech", "Pilotage PropTech", "Pilotage GreenTech"],
      },
      executive: {
        label: "Executive — Global Executive Fellowship (2 445 000 FCFA — 48h)",
        cert: "Global Executive Fellowship",
        programmes: ["Gouvernance Digitale & Stratégie IA", "Transformation Digitale & Stratégie IA", "Gouvernance Digital Business & Stratégie IA", "Gouvernance des Disruptions & Stratégies IA", "Gouvernance de la Cybersécurité", "Gouvernance du Droit du Digital IA & Éthique", "Gouvernance des Technologies", "Digital Business & Stratégie IA"],
      },
    },
  },
};

const serviceTiers = [
  { value: "premium", label: "Premium", desc: "Maximum 20 participants", icon: "★" },
  { value: "platinum", label: "Platinum", desc: "Maximum 10 participants", icon: "★★" },
  { value: "vip", label: "VIP", desc: "Maximum 5 participants", icon: "★★★" },
  { value: "vvip", label: "VVIP", desc: "1 participant — Selon les horaires UltraBoost", icon: "★★★★" },
  { value: "elite", label: "Elite", desc: "1 participant — Votre agenda est notre priorité", icon: "★★★★★" },
];

const footerLinks = ["Home", "UltraBootcamps", "Hub", "TravelBootcamps", "Agenda", "À propos", "Contact"];

// ============================================================
// COMPOSANT
// ============================================================

export default function ContactPage() {
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
  const [hubHubMode, setHubHubMode] = useState<"" | "hub_distant" | "hub_presentiel" | "hub_hybride">("");

  // Données étape 2 (gardées en state pour validation)
  const [civility, setCivility] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const phoneCode = useMemo(() => {
    const c = countries.find((c) => c.name === selectedCountry);
    return c ? c.code : "+225";
  }, [selectedCountry]);

  const availableNiveaux = useMemo(() => {
    if (!selectedDomaine || !domaines[selectedDomaine]) return {};
    return domaines[selectedDomaine].niveaux;
  }, [selectedDomaine]);

  const availableProgrammes = useMemo(() => {
    if (!selectedDomaine || !selectedNiveau) return [];
    const d = domaines[selectedDomaine];
    if (!d || !d.niveaux[selectedNiveau]) return [];
    return d.niveaux[selectedNiveau].programmes;
  }, [selectedDomaine, selectedNiveau]);

  const years = useMemo(() => {
    const arr = [];
    for (let y = 1940; y <= 1990; y++) arr.push(y);
    return arr;
  }, []);

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const availableDays = useMemo(() => {
    if (!birthYear || !birthMonth) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(Number(birthYear), Number(birthMonth), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  // ============================================================
  // VALIDATION PAR ÉTAPE
  // ============================================================

  function validateStep1(): boolean {
    setStepError("");

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

    if (selectedService === "hub") {
      if (!selectedNiveau) {
        setStepError("Veuillez choisir un niveau Hub.");
        return false;
      }
      if (!hubHubMode) {
        setStepError("Veuillez choisir le mode Hub : Présentiel, Distance ou Hybride.");
        return false;
      }
    }

    if (selectedService === "travel" && !selectedNiveau) {
      setStepError("Veuillez choisir un niveau TravelBootcamp.");
      return false;
    }

    if (selectedService !== "hub" && selectedService !== "travel" && !selectedTier) {
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
      if (!autreInput || !autreInput.value.trim()) {
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

    return true;
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

  function handleFonctionChange(value: string) {
    setSelectedFonction(value);
    setShowAutreFonction(value === "Autre");
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formEl = e.currentTarget;
    const termsAccepted = (formEl.elements.namedItem("terms") as HTMLInputElement | null)?.checked;
    if (!termsAccepted) {
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

    const formData = new FormData(formEl);

    const fonction = showAutreFonction
      ? (formData.get("fonction_autre") as string) || ""
      : selectedFonction;

    const payload = {
      type: selectedService || "bootcamp",
      civility: civility,
      first_name: prenom,
      last_name: nom,
      date_of_birth: dateOfBirth,
      function_title: fonction,
      email: email,
      phone: `${phoneCode} ${phone}`,
      whatsapp: `${phoneCode} ${formData.get("whatsapp") || ""}`,
      country: selectedCountry,
      linkedin_url: formData.get("linkedin") || "",
      level_requested: selectedNiveau,
      program_requested: selectedProgramme,
      format_preference: formData.get("format") || "",
      schedule_preference: formData.get("horaire") || "",
      certificate_language: formData.get("langue") || "",
      ultraboost_level: selectedService === "hub" || selectedService === "travel" ? "" : selectedTier,
      hub_delivery_mode: selectedService === "hub" ? hubHubMode : "",
      message: formData.get("message") || "",
      status: ageFlag ? "flagged_for_review" : "pending",
      terms_accepted: formData.get("terms") === "on",
    };

    try {
      const xanoPublic = process.env.NEXT_PUBLIC_XANO_API_URL;
      console.log("[contact/submit] NEXT_PUBLIC_XANO_API_URL =", xanoPublic ?? "(undefined)");
      console.log("[contact/submit] POST même origine → /admission (proxy serveur, clé API non exposée au navigateur)");

      const res = await fetch("/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const rawText = await res.text();
      console.log("[contact/submit] HTTP", res.status, rawText.slice(0, 800));

      if (!res.ok) {
        let msg = "Erreur serveur";
        try {
          const data = rawText ? (JSON.parse(rawText) as unknown) : null;
          if (data && typeof data === "object" && data !== null) {
            const d = data as Record<string, unknown>;
            const fromMessage = typeof d.message === "string" ? d.message : "";
            const fromError = typeof d.error === "string" ? d.error : "";
            const fromDetail = typeof d.detail === "string" ? d.detail : "";
            msg = [fromMessage, fromError, fromDetail].find((s) => s.trim().length > 0) || msg;
            if (msg === "Erreur serveur" && d.payload != null) {
              msg = typeof d.payload === "string" ? d.payload : JSON.stringify(d.payload);
            }
          }
        } catch {
          if (rawText.trim().length > 0 && rawText.length < 500) msg = rawText.trim();
        }
        console.error("[contact/submit] échec:", msg);
        throw new Error(msg);
      }

      console.log("[contact/submit] succès");

      setSuccess(true);
      formEl.reset();
      setStep(1);
      setSelectedService("");
      setSelectedDomaine("");
      setSelectedNiveau("");
      setSelectedProgramme("");
      setSelectedTier("");
      setHubHubMode("");
      setCivility("");
      setNom("");
      setPrenom("");
      setEmail("");
      setPhone("");
      setBirthYear("");
      setBirthMonth("");
      setBirthDay("");
      setSelectedFonction("");
      window.setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#C9A84C]";
  const hintCls = "mt-1 block text-xs leading-relaxed text-[#888]";
  const inputCls = "glass-input w-full px-4 py-3 text-sm";
  const selectCls = "glass-input w-full px-4 py-3 text-sm appearance-none cursor-pointer";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(92vw,920px)] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0) 70%)" }} />

      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-8">
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12">
          <h1 className="text-5xl font-semibold leading-[1.05] text-[#D4AF37] md:text-7xl" style={{ fontFamily: '"Playfair Display", serif' }}>Contactez-nous</h1>
          <div className="divider-gold mt-8 max-w-2xl" />
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-2">
          {/* COORDONNÉES */}
          <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7">
            <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>Coordonnées</h2>
            <div className="mt-5 space-y-3 text-sm text-[#C8C8CF] sm:text-base">
              <p><span className="text-[#D4AF37]">Adresse :</span> Abidjan — Côte d&apos;Ivoire</p>
              <p><span className="text-[#D4AF37]">Téléphone :</span> +225 05 01 19 55 55 (WhatsApp)</p>
              <p><span className="text-[#D4AF37]">Téléphone :</span> +225 07 08 19 07 91 (WhatsApp)</p>
              <p><span className="text-[#D4AF37]">Email :</span> hubs@ultraboost.pro</p>
              <p><span className="text-[#D4AF37]">Admission :</span> admission@ultraboost.pro</p>
              <p><span className="text-[#D4AF37]">LinkedIn :</span>{" "}<a href="https://www.linkedin.com/company/ultraboost" target="_blank" rel="noreferrer" className="underline decoration-[rgba(201,168,76,0.4)] underline-offset-4 hover:text-[#D4AF37]">linkedin.com/company/ultraboost</a></p>
              <p><span className="text-[#D4AF37]">Facebook :</span>{" "}<a href="https://www.facebook.com/UltraBoostHub" target="_blank" rel="noreferrer" className="underline decoration-[rgba(201,168,76,0.4)] underline-offset-4 hover:text-[#D4AF37]">facebook.com/UltraBoostHub</a></p>
              <p><span className="text-[#D4AF37]">YouTube :</span>{" "}<a href="https://www.youtube.com/@UltraBoostDigital" target="_blank" rel="noreferrer" className="underline decoration-[rgba(201,168,76,0.4)] underline-offset-4 hover:text-[#D4AF37]">youtube.com/@UltraBoostDigital</a></p>
            </div>
          </motion.article>

          {/* FORMULAIRE */}
          <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="glass-card-gold border border-[rgba(201,168,76,0.12)] p-7">
            <h2 className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>Demande d&apos;admission</h2>

            {/* Indicateur d'étapes */}
            <div className="mt-4 flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= s ? "bg-[#C9A84C] text-[#0A0A0F]" : "bg-white/10 text-[#666]"}`}>{s}</div>
                  {s < 3 && <div className={`h-0.5 w-8 ${step > s ? "bg-[#C9A84C]" : "bg-white/10"}`} />}
                </div>
              ))}
              <span className="ml-2 text-xs text-[#9999A9]">
                {step === 1 && "Service & Programme"}
                {step === 2 && "Informations personnelles"}
                {step === 3 && "Finalisation"}
              </span>
            </div>

            {success && (
              <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center text-sm leading-relaxed text-green-400">
                <p className="font-medium">Demande envoyée avec succès.</p>
                <p className="mt-2 text-[#C8C8CF]">Notre équipe vous contactera sous 24h.</p>
                <p className="mt-3 text-xs text-[#9999A9]">Ce message reste affiché environ 5 secondes.</p>
              </div>
            )}

            {/* Message d'erreur d'étape */}
            {stepError && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {stepError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <AnimatePresence mode="wait">

                {/* ===== ÉTAPE 1 ===== */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">

                    <label className="block">
                      <span className={labelCls}>Quel service vous intéresse ?</span>
                      <span className={hintCls}>Cliquez sur la liste et choisissez le service correspondant à votre besoin.</span>
                      <select value={selectedService} onChange={(e) => { setSelectedService(e.target.value); setSelectedDomaine(""); setSelectedNiveau(""); setSelectedProgramme(""); setHubHubMode(""); setSelectedTier(""); setStepError(""); }} required className={selectCls}>
                        <option value="">Sélectionner un service</option>
                        <option value="bootcamp">UltraBootcamps</option>
                        <option value="hub">UltraBoost Hub</option>
                        <option value="travel">TravelBootcamps</option>
                        <option value="language">Bootcamps Langues</option>
                        <option value="community">Community</option>
                        <option value="event">Événements</option>
                      </select>
                    </label>

                    {selectedService === "bootcamp" && (
                      <>
                        <label className="block">
                          <span className={labelCls}>Étape 1 — Domaine</span>
                          <span className={hintCls}>Sélectionnez d&apos;abord le domaine du bootcamp.</span>
                          <select value={selectedDomaine} onChange={(e) => { handleDomaineChange(e.target.value); setStepError(""); }} required className={selectCls}>
                            <option value="">Choisir un domaine</option>
                            {Object.entries(domaines).map(([key, d]) => (
                              <option key={key} value={key}>{d.label} — {d.description}</option>
                            ))}
                          </select>
                        </label>

                        {selectedDomaine && Object.keys(availableNiveaux).length > 1 && (
                          <label className="block">
                            <span className={labelCls}>Étape 2 — Niveau</span>
                            <span className={hintCls}>Niveau : cliquez et choisissez la ligne qui correspond à votre profil.</span>
                            <select value={selectedNiveau} onChange={(e) => { handleNiveauChange(e.target.value); setStepError(""); }} required className={selectCls}>
                              <option value="">Choisir un niveau</option>
                              {Object.entries(availableNiveaux).map(([key, n]) => (
                                <option key={key} value={key}>{n.label}</option>
                              ))}
                            </select>
                          </label>
                        )}

                        {selectedDomaine && Object.keys(availableNiveaux).length === 1 && !selectedNiveau && (() => { const k = Object.keys(availableNiveaux)[0]; setTimeout(() => setSelectedNiveau(k), 0); return null; })()}

                        {availableProgrammes.length > 0 && (
                          <label className="block">
                            <span className={labelCls}>Programme souhaité</span>
                            <span className={hintCls}>Choisissez le bootcamp précis dans la liste.</span>
                            <select value={selectedProgramme} onChange={(e) => { setSelectedProgramme(e.target.value); setStepError(""); }} required className={selectCls}>
                              <option value="">Choisir un bootcamp</option>
                              {availableProgrammes.map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </label>
                        )}
                      </>
                    )}

                    {selectedService === "hub" && (
                      <>
                        <label className="block">
                          <span className={labelCls}>Niveau Hub souhaité</span>
                          <span className={hintCls}>Niveau : cliquez et choisissez votre segment Hub dans la liste.</span>
                          <select value={selectedNiveau} onChange={(e) => { setSelectedNiveau(e.target.value); setStepError(""); }} required className={selectCls}>
                            <option value="">Choisir</option>
                            <option value="specialist">Hub Specialist — 58 250 FCFA/mois</option>
                            <option value="manager">Hub Manager — 83 250 FCFA/mois</option>
                            <option value="director">Hub Director — 133 250 FCFA/mois</option>
                            <option value="executive">Hub Executive — 245 250 FCFA/mois</option>
                          </select>
                        </label>
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
                                  name="hub_mode_contact"
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
                      </>
                    )}

                    {selectedService === "travel" && (
                      <label className="block">
                        <span className={labelCls}>Niveau TravelBootcamp</span>
                        <span className={hintCls}>Choisissez le niveau du parcours Travel aligné avec votre profil.</span>
                        <select value={selectedNiveau} onChange={(e) => { setSelectedNiveau(e.target.value); setStepError(""); }} required className={selectCls}>
                          <option value="">Choisir</option>
                          <option value="specialist">Travel Specialist — Marketing Digital & IA</option>
                          <option value="manager">Travel Manager — Management Digital & Stratégie IA</option>
                          <option value="director">Travel Director — Transformation Digital & Stratégie IA</option>
                          <option value="executive">Travel Executive — Gouvernance Digital & Stratégie IA</option>
                        </select>
                      </label>
                    )}

                    {selectedService !== "hub" && selectedService !== "travel" && (
                      <div>
                        <span className={labelCls}>Formule</span>
                        <span className={hintCls}>Formule : sélectionnez l&apos;offre d&apos;accompagnement ; le détail est validé après admission.</span>
                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {serviceTiers.map((tier) => (
                            <label key={tier.value} onClick={() => setStepError("")} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${selectedTier === tier.value ? "border-[#C9A84C] bg-[rgba(201,168,76,0.08)]" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}>
                              <input type="radio" name="tier" value={tier.value} checked={selectedTier === tier.value} onChange={() => setSelectedTier(tier.value)} className="hidden" />
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

                {/* ===== ÉTAPE 2 ===== */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelCls}>Civilité</span>
                        <span className={hintCls}>M. ou Mme — sélectionnez dans la liste.</span>
                        <select value={civility} onChange={(e) => { setCivility(e.target.value); setStepError(""); }} required className={selectCls}>
                          <option value="">Sélectionner</option>
                          <option value="M.">Monsieur</option>
                          <option value="Mme">Madame</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className={labelCls}>Nom</span>
                        <span className={hintCls}>Nom de famille.</span>
                        <input value={nom} onChange={(e) => { setNom(e.target.value); setStepError(""); }} required type="text" className={inputCls} />
                      </label>
                    </div>

                    <label className="block">
                      <span className={labelCls}>Prénoms</span>
                      <span className={hintCls}>Tous vos prénoms, comme sur une pièce d&apos;identité.</span>
                      <input value={prenom} onChange={(e) => { setPrenom(e.target.value); setStepError(""); }} required type="text" className={inputCls} />
                    </label>

                    <div>
                      <span className={labelCls}>Date de naissance</span>
                      <span className={hintCls}>Jour, mois et année complets.</span>
                      <div className="mt-2 grid grid-cols-3 gap-3">
                        <select value={birthDay} onChange={(e) => { setBirthDay(e.target.value); setStepError(""); }} required className={selectCls}>
                          <option value="">Jour</option>
                          {availableDays.map((d) => (<option key={d} value={String(d)}>{d}</option>))}
                        </select>
                        <select value={birthMonth} onChange={(e) => { setBirthMonth(e.target.value); setStepError(""); }} required className={selectCls}>
                          <option value="">Mois</option>
                          {months.map((m, i) => (<option key={m} value={String(i + 1)}>{m}</option>))}
                        </select>
                        <select value={birthYear} onChange={(e) => { setBirthYear(e.target.value); setStepError(""); }} required className={selectCls}>
                          <option value="">Année</option>
                          {years.map((y) => (<option key={y} value={String(y)}>{y}</option>))}
                        </select>
                      </div>
                    </div>

                    <label className="block">
                      <span className={labelCls}>Pays de résidence</span>
                      <span className={hintCls}>Votre pays actuel de résidence.</span>
                      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required className={selectCls}>
                        {countries.map((c) => (<option key={c.name} value={c.name}>{c.flag} {c.name}</option>))}
                      </select>
                    </label>

                    <label className="block">
                      <span className={labelCls}>Fonction</span>
                      <span className={hintCls}>Choisissez la fonction la plus proche de votre rôle.</span>
                      <select value={selectedFonction} onChange={(e) => { handleFonctionChange(e.target.value); setStepError(""); }} required className={selectCls}>
                        <option value="">Sélectionner votre fonction</option>
                        {fonctions.map((f) => (<option key={f} value={f}>{f}</option>))}
                      </select>
                    </label>
                    {showAutreFonction && (
                      <label className="block">
                        <span className={labelCls}>Précisez votre fonction</span>
                        <span className={hintCls}>Libellé exact de votre poste.</span>
                        <input name="fonction_autre" required type="text" className={inputCls} />
                      </label>
                    )}

                    <label className="block">
                      <span className={labelCls}>Email professionnel</span>
                      <span className={hintCls}>Adresse à laquelle nous pouvons vous répondre.</span>
                      <input value={email} onChange={(e) => { setEmail(e.target.value); setStepError(""); }} required type="email" className={inputCls} />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelCls}>Téléphone ({phoneCode})</span>
                        <span className={hintCls}>Numéro joignable (indicatif déjà affiché).</span>
                        <div className="flex">
                          <span className="flex items-center rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.08)] bg-[rgba(26,26,37,0.8)] px-3 text-xs text-[#C9A84C]">{phoneCode}</span>
                          <input value={phone} onChange={(e) => { setPhone(e.target.value); setStepError(""); }} required type="tel" placeholder="XX XX XX XX" className="glass-input w-full rounded-l-none px-4 py-3 text-sm" />
                        </div>
                      </label>
                      <label className="block">
                        <span className={labelCls}>WhatsApp ({phoneCode})</span>
                        <span className={hintCls}>Facultatif.</span>
                        <div className="flex">
                          <span className="flex items-center rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.08)] bg-[rgba(26,26,37,0.8)] px-3 text-xs text-[#C9A84C]">{phoneCode}</span>
                          <input name="whatsapp" type="tel" placeholder="XX XX XX XX" className="glass-input w-full rounded-l-none px-4 py-3 text-sm" />
                        </div>
                      </label>
                    </div>

                    <label className="block">
                      <span className={labelCls}>LinkedIn (facultatif — valorisé pour votre candidature)</span>
                      <span className={hintCls}>Lien complet vers votre profil public.</span>
                      <input name="linkedin" type="url" placeholder="https://linkedin.com/in/votre-profil" className={inputCls} />
                    </label>

                    <div className="flex gap-3">
                      <button type="button" onClick={() => { setStep(1); setStepError(""); }} className="btn-outline-gold w-1/3 py-3 text-sm">Retour</button>
                      <button type="button" onClick={goToStep3} className="btn-gold w-2/3 py-3 text-sm">Continuer</button>
                    </div>
                  </motion.div>
                )}

                {/* ===== ÉTAPE 3 ===== */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">

                    <label className="block">
                      <span className={labelCls}>Langue du certificat</span>
                      <span className={hintCls}>Langue d&apos;édition du certificat souhaitée.</span>
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
                        <span className={hintCls}>Distance, présentiel ou hybride selon votre préférence.</span>
                        <select name="format" className={selectCls}>
                          <option value="">Choisir</option>
                          <option value="online">Distance (en ligne)</option>
                          <option value="presential">Présentiel</option>
                          <option value="hybrid">Hybride</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className={labelCls}>Horaire souhaité</span>
                        <span className={hintCls}>Créneau de formation qui vous convient le mieux.</span>
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
                      <span className={hintCls}>Toute précision utile pour votre dossier.</span>
                      <textarea name="message" rows={3} className="glass-input w-full resize-none px-4 py-3 text-sm" />
                    </label>

                    <div className="flex items-start gap-3 rounded-xl border border-[rgba(212,175,55,0.12)] bg-white/[0.02] px-4 py-3">
                      <input id="contact-terms" name="terms" required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#D4AF37]" />
                      <label htmlFor="contact-terms" className="text-sm text-[#C8C8CF]">
                        <span className="block">
                          J&apos;accepte les{" "}
                          <span className="text-[#D4AF37]">Conditions Générales d&apos;Utilisation (CGU)</span>
                          {" "}d&apos;UltraBoost — obligatoire avant validation.
                        </span>
                        <span className="mt-2 block">
                          <Link
                            href="/cgu"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#D4AF37] underline decoration-[rgba(212,175,55,0.45)] underline-offset-4 hover:text-[#E8D5A3]"
                          >
                            Lire les conditions
                          </Link>
                        </span>
                      </label>
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <div className="flex gap-3">
                      <button type="button" onClick={() => { setStep(2); setStepError(""); }} className="btn-outline-gold w-1/3 py-3 text-sm">Retour</button>
                      <button type="submit" disabled={loading} className="btn-gold w-2/3 py-3 text-sm">
                        {loading ? "Envoi en cours..." : "Envoyer ma demande"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.article>
        </section>
      </main>

      <footer className="relative z-10 mt-8 border-t border-[rgba(201,168,76,0.10)] bg-black/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#C8C8CF]">
            {footerLinks.map((link) => (<span key={link} className="cursor-default transition hover:text-[#D4AF37]">{link}</span>))}
          </nav>
          <p className="text-sm text-[#C8C8CF]">Abidjan — Côte d&apos;Ivoire | +225 05 01 19 55 55 (WhatsApp) | +225 07 08 19 07 91 (WhatsApp) | hubs@ultraboost.pro</p>
          <p className="text-xs text-[#9696A3]">© 2026 UltraBoost. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}