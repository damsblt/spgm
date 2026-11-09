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
| `/partenaires` | Partenaires & sponsors |
| `/medias` | Galerie médias |
| `/formulaires` | Adhésion / déménagement / réadmission |
| `/contact` | Contact |
| `/mentions` | Mentions légales |

L’espace membres (authentifié) n’est pas migré.

## Déploiement (plus tard)

Compatible Vercel : importer le dossier `policemunicipale-site` (ou définir le root directory sur Vercel).

## Build

```bash
npm run build
npm start
```
