# PharmaSaaS

Modern pharma-focused SaaS starter built with React, TypeScript, Vite, Tailwind, and shadcn-ui.

Key features implemented:
- Authentication with local session storage
- Protected routing with a reusable `ProtectedOutlet`
- Login-first flow (root `/` shows login, then routes require auth)
- Responsive dashboard with Recharts (line, bar, pie)
- Home page hero with typewriter monologue, marquee banner, and card carousel
- Framer Motion animations on KPIs and hero

## Getting Started

There are several ways of interacting with your application's codebase.

**Use this repository**

This repository contains the full source code for the PharmaSaas application.

**Use your preferred IDE (Local Development)**

If you want to work locally using your own IDE, you can clone this repo and push changes.

**Prerequisites**:

- Node.js (v18 or higher) & npm (or yarn/bun) installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Installation Steps**:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i # Or 'yarn install' or 'bun install'

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev # Or 'yarn dev' or 'bun dev'
```

## Authentication & Routing

- Session helpers live in `src/auth/session.ts`.
- Guard routes using `src/auth/ProtectedOutlet.tsx`.
- Current routing (`src/App.tsx`):
  - Public: `/login`
  - Protected group: `/dashboard`, `/about`, `/services`, `/research`, `/contact`
  - Root `/` shows `Login` (redirects to `/dashboard` after sign-in).

To protect more routes, place them inside the protected `<Route element={<ProtectedOutlet />}>...</Route>` group.

## Pages & Components

- `src/pages/Dashboard.tsx`: Responsive charts with Recharts and animated KPI cards.
- `src/components/PharmaBanner.tsx`: Moving pharma marquee banner.
- `src/components/HomeCarousel.tsx`: 3-up card carousel with dots; 10 slides grouped in threes.
- `src/components/Hero.tsx`: Hero with typewriter monologue.

## Styling & UI

- Tailwind CSS with shadcn-ui components under `src/components/ui/*`.
- Framer Motion used for subtle hover/enter animations.

## Development Notes

- Chatbot is currently disabled in `src/App.tsx` (commented import and JSX).
- Colors and theme tokens are in `src/index.css` and component variables.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

Build and preview:

```sh
npm run build
npm run preview
```

## Custom Domain

Custom domain connection instructions will be added here.

## Styling and Theming

Primary colors are CSS variables in `src/index.css`. Update `--primary` and `--primary-foreground` in `:root`/`.dark` to re-theme.