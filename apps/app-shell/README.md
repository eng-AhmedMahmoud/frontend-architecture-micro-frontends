# CommerceOS Admin

CommerceOS Admin is a simple ecommerce admin panel starter app built for frontend architecture workshops. It uses a single integrated React application with mock data, MSW-backed API handlers, route-oriented screens, and straightforward state flow.

## Stack

- React
- TypeScript
- Vite
- npm
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn-style UI primitives
- MSW
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
