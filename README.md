# Gabon Bus

Réservation de billets de car interurbains au Gabon : recherche d'un trajet, choix du siège, paiement par mobile money et billet à présenter à l'embarquement.

**Démo en ligne : [gabon-bus.eu.cc](https://gabon-bus.eu.cc)**
Trajets, compagnies et paiements sont simulés : aucune réservation n'est réelle et aucun paiement n'est débité. La démo tourne sur une offre gratuite et met environ 50 secondes à se réveiller au premier accès.

---

## Parcours

1. **Recherche** — ville de départ, ville d'arrivée et date, entre une dizaine de villes du pays (Libreville, Port-Gentil, Franceville, Lambaréné, Oyem, Mouila, Moanda, Tchibanga, Koulamoutou, Makokou).
2. **Choix du départ** — trois horaires par jour avec compagnie, durée, prix en FCFA et places restantes. Les départs déjà passés ne sont pas proposés ; en fin de journée, ceux du lendemain le sont.
3. **Sièges et passagers** — choix des places dans le car, un passager par siège.
4. **Paiement** — Airtel Money ou Moov Money, les deux moyens de paiement mobile du pays.
5. **Billet** — confirmation avec référence, enregistrement en PDF par l'impression du navigateur, partage. Le billet reste disponible sur l'appareil après un rechargement de la page (« Mon billet »).

Un **tableau de bord transporteur** (passagers du jour, billets vendus, revenus, trajets actifs, réservations récentes) montre l'écran côté compagnie. Dans la démo publique, ses données sont fictives et ses actions désactivées.

## Pile technique

| Couche | Choix |
| --- | --- |
| Application | Next.js 15 (App Router), React 19, TypeScript |
| Interface | Tailwind CSS 4, composants Radix / shadcn, Framer Motion |
| Formulaires | React Hook Form + Zod |
| Données | client HTTP prévu pour une API REST de réservation |

### Mode démonstration

Sans variable `NEXT_PUBLIC_API_URL`, l'application ne fait **aucun appel réseau** : les horaires sont générés pour la date demandée (mêmes résultats pour la même recherche, jamais périmés) et la réservation en cours est gardée dans le navigateur. Avec la variable, le même client interroge l'API de réservation.

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL de l'API de réservation. Absente : mode démonstration. |

## Auteur

Jesse MPIGA-ODOUMBA — [portfolio](https://mpj.indevs.in) · [GitHub](https://github.com/mpigajesse)
