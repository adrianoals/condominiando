# Site Oficial do Condominiando com Rafael Zanin

🇺🇸 [Read in English](README.md)

Desenvolvido para o Condominiando com Rafael Zanin por XNAP.

O Condominiando é um site institucional de página única para o programa de Rafael Zanin voltado ao universo condominial. Ele apresenta o programa, centraliza as opções de exibição, incorpora os episódios mais recentes, destaca oportunidades de patrocínio e conecta o público aos canais oficiais do projeto.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- PostCSS
- ESLint 9

## Funcionalidades

- Landing page responsiva organizada em seções de hero, visão geral do programa, episódios, patrocinadores, comunidade e rodapé
- Playlist do YouTube incorporada para assistir aos episódios diretamente na página
- Chamadas para ação claras para YouTube, Nova TV Alto Tietê e acesso à comunidade no WhatsApp
- Sistema visual alinhado à marca com tipografia customizada, gradientes, cards com glassmorphism e efeitos de movimento
- Metadados voltados a SEO, configuração para compartilhamento social, conjunto de favicons e web manifest
- Seção de patrocinadores pronta para receber marcas parceiras e CTA de contato

## Estrutura do Projeto

```text
.
├── docs/                  # Notas de conteúdo e documentos de planejamento da página
├── public/
│   ├── images/            # Assets de marca, logos e arquivos de mídia
│   └── ...                # Favicons, ícones e arquivos de manifesto
├── src/
│   ├── app/               # Entradas do App Router, metadados e estilos globais
│   └── components/        # Seções reutilizáveis da página e componentes SVG
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Como Começar

Pré-requisitos:

- Node.js e npm

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Comandos adicionais:

```bash
npm run lint
npm run build
npm run start
```

A versão atual do projeto não exige variáveis de ambiente.

Desenvolvido com assistência de IA usando Claude Code
