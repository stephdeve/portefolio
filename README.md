# Portfolio Web Professionnel — Next.js + Neon

Portfolio moderne et performant, migré de PHP vers **Next.js 14 (App Router)** avec **Neon (PostgreSQL)** via **Prisma**. Le design (Tailwind CSS, dark/light mode, animations) et toutes les fonctionnalités d'origine sont préservés.

## 🚀 Caractéristiques

- Next.js 14 — App Router, Server Components & Server Actions
- TypeScript strict
- Tailwind CSS (même palette/animations que la version PHP)
- Dark / Light mode avec persistance (site public et admin séparés)
- Base de données Neon (PostgreSQL) via Prisma
- Panneau admin complet (CRUD projets, compétences, contacts, paramètres)
- Authentification admin par cookie signé (HMAC) + middleware
- Upload & traitement d'images (sharp) vers `public/uploads`
- Envoi d'emails de contact via SMTP (Nodemailer)
- API JSON : `/api/projects`, `/api/skills`

## 📁 Structure

```
app/
  (site)/            # Site public : accueil, projets, compétences, contact
  admin/
    login/           # Connexion admin (standalone)
    (panel)/         # Dashboard + CRUD (protégé)
  api/               # Routes API JSON
components/          # Header, Footer, AdminHeader, composants partagés
lib/                 # prisma, config, auth, mailer, images, data
prisma/              # schema.prisma + seed.ts
public/uploads/      # Images uploadées (générées)
_legacy_php/         # Ancienne application PHP (référence, non utilisée)
```

## Prérequis

- Node.js 18.18+ (testé sur Node 20)
- Un projet Neon (https://neon.tech) — gratuit

## Installation

1. Installer les dépendances
```bash
npm install
```

2. Configurer l'environnement
```bash
cp .env.example .env
# Renseigne DATABASE_URL / DIRECT_URL (Neon), ADMIN_USER, ADMIN_PASS_HASH, SMTP, etc.
```

3. Générer le hash du mot de passe admin (bcrypt)
```bash
node -e "console.log(require('bcryptjs').hashSync('TON_MOT_DE_PASSE', 10))"
# Colle le résultat dans ADMIN_PASS_HASH
```

4. Créer le schéma en base et insérer les données initiales
```bash
npm run db:push      # crée les tables dans Neon (ou: npm run db:migrate)
npm run db:seed      # compétences + projets de démonstration
```

5. Lancer en développement
```bash
npm run dev
# http://localhost:3000  — admin : http://localhost:3000/admin
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (génère le client Prisma) |
| `npm run start` | Serveur de production |
| `npm run db:push` | Synchronise le schéma Prisma avec Neon |
| `npm run db:migrate` | Crée/applique une migration Prisma |
| `npm run db:seed` | Insère les données initiales |
| `npm run db:studio` | Ouvre Prisma Studio |

## Déploiement

Compatible Vercel / Node. Définir les variables d'environnement en production
et exécuter `npm run db:push` (ou `prisma migrate deploy`) sur la base Neon.

> ℹ️ Les uploads sont stockés dans `public/uploads` (système de fichiers).
> Sur un hébergement serverless éphémère (ex. Vercel), ce dossier n'est pas
> persistant : passer à un stockage objet (Vercel Blob, S3) si nécessaire.

## Licence

MIT
