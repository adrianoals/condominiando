# Condominiando with Rafael Zanin Official Website

🇧🇷 [Leia em Português](README.pt-br.md)

Built for Condominiando with Rafael Zanin by XNAP.

Condominiando is a branded one-page website for Rafael Zanin's condominium-focused program. It presents the show, centralizes viewing options, embeds recent episodes, highlights sponsorship opportunities, and connects the audience to the project's social channels.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- PostCSS
- ESLint 9

## Features

- Responsive landing page structured around hero, program overview, episodes, sponsors, community, and footer sections
- Embedded YouTube playlist for watching episodes directly on the page
- Clear calls to action for YouTube, Nova TV Alto Tiete, and WhatsApp community access
- Branded visual system with custom typography, gradients, glassmorphism cards, and motion effects
- SEO-oriented metadata, social sharing configuration, favicon set, and web manifest
- Sponsor showcase section ready to receive partner brands and contact CTA

## Project Structure

```text
.
├── docs/                  # Content notes and page planning documents
├── public/
│   ├── images/            # Brand assets, logos, and media files
│   └── ...                # Favicons, icons, and manifest files
├── src/
│   ├── app/               # App Router entrypoints, metadata, and global styles
│   └── components/        # Reusable page sections and SVG icon components
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Getting Started

Prerequisites:

- Node.js and npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Additional commands:

```bash
npm run lint
npm run build
npm run start
```

No environment variables are required for the current version of the project.

Built with AI-assisted development using Claude Code
