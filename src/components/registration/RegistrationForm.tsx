"use client";

import { AdmissionFormWizard } from "@/components/admission/AdmissionFormWizard";

/** Formulaire 3 étapes — aligné sur la page Contact (POST /admission). */
export function RegistrationForm({ onSuccess }: { onSuccess?: () => void }) {
  return <AdmissionFormWizard variant="home" onSuccess={onSuccess} showStepper className="mt-1" />;
}
