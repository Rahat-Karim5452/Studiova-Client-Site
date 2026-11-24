<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verify

- npm project (no workspaces). Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`. No tests, CI, or pre-commit hooks.
- `next build` does not lint; run `npm run lint` and `npm run typecheck` explicitly.
- `npm run format` formats only `**/*.{ts,tsx}`; `.prettierrc` enforces LF, no semicolons, double quotes, and Tailwind class sorting via `cn`/`cva`.

## Setup

- `.env*` is gitignored. Required keys: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_KEY`. Never commit values.
- Auth needs MongoDB (db `studiospace_db`) and Google OAuth; `src/lib/auth.ts` creates the Mongo client at import time.
- Studio and booking data comes from a separate backend at `NEXT_PUBLIC_API_URL`; without it, pages render empty states or fail to load.

## Architecture

- App Router under `src/` only (`@/*` -> `src/*`); do not create a root `app/`. Root layout mounts `ThemeProvider`, `Navbar`, page content, `Footer`, and `Toaster` (`sonner`); pages still render their own `<main>`.
- Auth: `src/lib/auth.ts` (Better Auth + Mongo adapter, email/password with min length 6 and no auto sign-in, Google, JWT plugin) via catch-all `src/app/api/auth/[...all]/route.ts`. Browser code uses `src/lib/auth-client.ts` / `authClient.useSession()`; server code uses `auth.api.getSession({ headers: await headers() })`.
- `src/proxy.ts` guards `/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/:path*`; unauthenticated users go to `/login?redirect=<path>`. Add new private routes to its matcher.
- External API: server components fetch with `Bearer` from `getTokenFromServer()` and `cache: "no-store"`; client mutations use `getTokenFromClient()` + `Bearer`. Shared shapes live in `src/lib/types/` (`IStudio`, `IBooking`). Backend contract is in sibling `../Studiova-Server-Site/index.js`: create is `POST /add-studio`, update is `PATCH /studio/:id` (`PATCH` also applies to booking status/cancel).
- `StudioForm` is a client component for both add and edit; it uploads the cover to ImgBB with `NEXT_PUBLIC_IMGBB_KEY` and sends the public URL to the backend. The backend derives `ownerName`/`ownerEmail` from the JWT, so don't send them.
- Styling: Tailwind v4, no `tailwind.config`; tokens in `src/app/globals.css` via `@tailwindcss/postcss` (Turbopack handles CSS; no `turbopack.rules` loader). Four Google fonts are loaded in the root layout to define `--font-manrope`, `--font-geist-mono`, `--font-space-grotesk`, `--font-instrument-serif`; keep those names in sync with `@theme inline`. shadcn style is `base-nova` (Base UI, not Radix): use `render={<Link href="..." />}` and `nativeButton={false}` on `Button`; add components with `npx shadcn@latest add <name>`.
- `next.config.ts`: React Compiler on (keep `babel-plugin-react-compiler`), `cacheComponents`/`partialPrefetching` off, any HTTPS `next/image` host allowed.

## Current state

- `README.md` is the stock shadcn template; trust config and code. Auth, studios, dashboard, listings, bookings, about, how-it-works, loading and not-found routes now exist. `npm run typecheck`, `npm run lint`, and `npm run build` pass.
