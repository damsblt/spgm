# SPMG — policemunicipale.ch (brouillon local)

Site brouillon du **Syndicat des Polices Municipales Genevoises**, basé sur l’export Markdown/images (hors production).

## Démarrage

```bash
cd policemunicipale-site
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Contenu Markdown dans `content/`
- Images dans `public/images/`

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil — présentation & historique |
| `/communications` | Liste des articles |
| `/communications/[slug]` | Article |
| `/comite` | Comité |
| `/partenaires` | Partenaires |
| `/medias` | Galerie médias |
| `/formulaires` | Liste des formulaires en ligne |
| `/formulaires/adhesion` | Demande d’admission SPMG/FSFP |
| `/formulaires/demenagement` | Changement d’adresse |
| `/formulaires/readmission` | Demande de réadmission |
| `/contact` | Contact |
| `/espace-membres` | Espace membres (mot de passe) |
| `/mentions` | Mentions légales |

### Formulaires en ligne (SMTP Infomaniak)

- Routes: `/formulaires/*`
- Envoi via Server Action + **nodemailer**
- Expéditeur fixe: `info@policemunicipale.ch`
- À la soumission: notification au syndicat + confirmation au demandeur
- Variables d’environnement:

| Variable | Exemple Infomaniak |
| --- | --- |
| `SMTP_HOST` | `mail.infomaniak.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `info@policemunicipale.ch` |
| `SMTP_PASSWORD` | mot de passe de la boîte |

Sans ces variables, le site build toujours ; l’envoi renvoie un message d’erreur clair.

### Espace membres

- Route: `/espace-membres`
- Env (préféré): **`MEMBERS_PASSWORD`**
- Alias accepté: **`ESPACE_MEMBRES_PASSWORD`** (si `MEMBERS_PASSWORD` est vide)
- Cookie httpOnly `spmg_members` après succès (30 jours)
- Contenu WordPress membres exporté (`content/espace-membres/` + `public/espace-membres/`) — PDF/documents derrière le gate

```bash
cp .env.example .env.local
# éditer MEMBERS_PASSWORD=...  (ou ESPACE_MEMBRES_PASSWORD=...)
# et SMTP_* pour les formulaires
```

Sur **Vercel**: Project → Settings → Environment Variables → `MEMBERS_PASSWORD` / `ESPACE_MEMBRES_PASSWORD` et `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` (Preview + Production), puis redéployer.

## Déploiement Vercel

1. Sur [vercel.com/new](https://vercel.com/new), importer le repo GitHub `damsblt/spgm`.
2. **Root Directory:** `policemunicipale-site`
3. Framework: **Next.js** (détecté via `vercel.json`)
4. Ajouter `MEMBERS_PASSWORD` (ou `ESPACE_MEMBRES_PASSWORD`) et les `SMTP_*` Infomaniak dans Environment Variables
5. Deploy — Vercel fournira une URL `*.vercel.app`.

### Domaine policemunicipale.ch (plus tard, par l’utilisateur)

Dans le projet Vercel → **Settings → Domains** → ajouter `policemunicipale.ch` / `www`, puis suivre les enregistrements DNS indiqués. **Ne pas modifier Infomaniak tant que la bascule n’est pas voulue.**

### Deploy CLI (avec compte)

```bash
cd policemunicipale-site
npx vercel login
npx vercel --yes          # preview
npx vercel --prod --yes   # production
```

Sans token local, un deploy anonyme temporaire est possible (`npx vercel deploy --temporary --yes`) puis à **claimer** sur Vercel.

## Build

```bash
npm run build
npm start
```
