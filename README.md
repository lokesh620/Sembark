# Sembark E-commerce

A React + TypeScript + Vite e-commerce app built against the [Platzi Fake Store API](https://api.escuelajs.co). It supports product browsing with infinite scroll, server-side filtering by title, price, and category, client-side sorting, a cart, and shareable URL filters.

**Repository:** https://github.com/lokesh620/Sembark.git

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router DOM 7
- Bootstrap 5

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (20+ recommended)
- npm 9+ (bundled with Node)
- Git

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/lokesh620/Sembark.git
   cd Sembark
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the App

Start the development server:

```bash
npm run dev
```

Vite will print a local URL (typically http://localhost:5173). Open it in your browser.

## Available Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Type-check and produce a production build    |
| `npm run preview` | Serve the production build locally           |
| `npm run lint`    | Run ESLint over the project                  |

## Project Structure

```
src/
  components/      # Reusable UI (FilterPanel, ProductCard, Navbar, ...)
  pages/           # Route-level views (Home, ProductDetails, Cart)
  services/        # API client (productService.ts)
  hooks/           # Custom hooks (useURLParams, useProductContext, ...)
  context/         # React context providers
  types/           # Shared TypeScript types
```

## API

This app consumes the public Platzi Fake Store API — no API key or `.env` is required.

- Products: `https://api.escuelajs.co/api/v1/products`
- Categories: `https://api.escuelajs.co/api/v1/categories`

## Production Build

```bash
npm run build
npm run preview
```

The build output is emitted to `dist/`.
