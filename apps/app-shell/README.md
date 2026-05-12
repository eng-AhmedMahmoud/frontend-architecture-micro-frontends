# CommerceOS Admin

This is an example e-commerce admin platform built for the [Frontend Architecture: Monoliths to Micro-Frontends](https://github.com/Charca/fem-frontend-architecture) workshop on Frontend Masters.

This repo will serve as a foundation for the exercises in the workshop, as well as providing a concrete implementation when discussing architectural concepts.

_Note:_ There is no real data persistance or authentication in this repo. Depending on which repo you're looking at, the data is stored either in memory using MSW, or in a local `db.json` file.

## Stack

- React
- TypeScript
- Vite
- npm
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn-style UI primitives
- lucide-react

## Run

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Notes

- All data is mocked in `packages/shared/mocks`.
- There is no real backend.
- Mutations update in-memory mock state through MSW handlers.
- The structure intentionally stays centralized and route-oriented to reflect an early frontend monolith.

## Standalone Analytics Routing

The `analytics` app can run independently and still be served from the same host as app-shell.

- Local development:
  - `app-shell` runs on `http://localhost:3000`
  - `analytics` runs on `http://localhost:3001`
  - app-shell dev server proxies `/analytics` requests to `http://localhost:3001`
- Production:
  - Deploy app-shell and analytics as separate builds
  - Configure your gateway to forward `/analytics` and `/analytics/*` to analytics
  - Forward all other routes to app-shell

Example Nginx routing:

```nginx
location /analytics {
  proxy_pass http://analytics_upstream;
}

location /analytics/ {
  proxy_pass http://analytics_upstream;
}

location / {
  proxy_pass http://app_shell_upstream;
}
```
