import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Montant au format français (« 7 500 »). Intl sépare les milliers par une
 * espace fine insécable (U+202F) que la police du site ne dessine pas : le
 * montant s'affichait « 7500 ». On la remplace par une espace insécable.
 */
export function formaterMontant(valeur: number): string {
  return valeur.toLocaleString('fr-FR').replace(/ /g, ' ');
}
