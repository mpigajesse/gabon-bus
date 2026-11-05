# Démo publique de GabonBus (gratuite, Render)

Sans `NEXT_PUBLIC_API_URL`, l'application tourne en **mode démo** (`src/lib/api.ts`) : aucun
appel réseau, horaires fictifs générés pour la date recherchée, réservation et paiement
Airtel/Moov **simulés**. Aucune donnée réelle, aucun paiement.

Render → *New* → *Web Service* → ce dépôt, branche `demo-publique` :

| Champ | Valeur |
|---|---|
| Runtime | Node |
| Build Command | `bun install && bun run build` |
| Start Command | `bun run start -- -p $PORT` |
| Instance Type | Free |

Aucune variable d'environnement n'est nécessaire. Pour brancher une vraie API plus tard :
`NEXT_PUBLIC_API_URL=https://…/api`.
