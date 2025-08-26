# PharmaSaas Project

## Project info

This is the official repository for the PharmaSaas project, a leading pharmaceutical research and development platform.
**Version**: 0.0.0

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

Deployment instructions will be added here.

## Custom Domain

Custom domain connection instructions will be added here.

## Styling and Theming

This project uses Tailwind CSS, and the primary colors are defined using CSS variables in `src/index.css`. We can customize the application's primary color by modifying the `--primary` and `--primary-foreground` HSL values within the `:root` and `.dark` blocks in `src/index.css`. The primary color has been recently updated to a modern pharma-like green.