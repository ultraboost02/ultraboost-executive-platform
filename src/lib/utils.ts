import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFCFA(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount)} FCFA`;
}

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR").format(parsed);
}

export function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return -1;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();
  const dayDelta = today.getDate() - birthDate.getDate();

  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
    age -= 1;
  }

  return age;
}
