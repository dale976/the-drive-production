# The Drive Touring Company

Production marketing site for The Drive Touring Company, an exclusive supercar touring company operating curated driving experiences across the UK and Europe.

## Local development

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

The development server prints its local URL. Routes are handled client-side by React Router.

## Quality checks

```bash
npm run lint
npm run build
```

Both checks run automatically for pull requests and pushes to `main`.

## Deployment

The static frontend is built by Vite and deployed to Cloudflare Workers using Wrangler:

```bash
npm run deploy
```

Cloudflare is configured to serve `index.html` for unknown asset paths so direct requests to client-side routes work correctly. Security headers are defined in `public/_headers`.

## Current routes

- `/` — company landing page
- `/about` — company story and team
- `/tours` — upcoming tour experiences
- `/fleet` — lead and support vehicles

The future member platform described in `docs/superpowers/specs/2026-06-18-tech-stack-architecture-design.md` is not part of the current static production site.
