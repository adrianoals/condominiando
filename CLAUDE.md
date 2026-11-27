# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page institutional site for **Condominiando com Rafael Zanin** (a TV/YouTube program about condominium life). Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript. All user-facing text is in **Brazilian Portuguese** (pt-BR).

Production: https://www.condominiando.com.br

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint
- No test framework is configured

## Architecture

- `src/app/page.tsx` renders the sections in order; `src/app/layout.tsx` holds metadata/SEO and fonts.
- Sections live in `src/components/` (`Header`, `Hero`, `Sobre`, `Assista`, `Apoiadores`, `Comunidade`, `Footer`, plus `SectionTitle` and `Icons`).
- `src/lib/episodes.ts` — episodes/playlist data shown in the "Assista" section.
- `docs/` — content notes and page structure planning.

## Deploy (read before shipping)

- The site is **not connected to Git** on Vercel: **`git push` does not deploy.** (Vercel Hobby blocks Git deploys of private repos when the commit author isn't the account owner, so all projects of this Vercel team deploy through the CLI.)
- Ship: commit + push → `npx vercel --prod --yes` from the repo root (folder linked in `.vercel/` to project `condominiando-landing`, team `novosorteionovo-7523s-projects`) → check `https://www.condominiando.com.br`.
- The GitHub repo (`adrianoals/condominiando`) can be private: deploys don't depend on it.
- Commit author: `dri.limasantos@gmail.com` (local git config); push over SSH alias `github.com-pessoal`.
