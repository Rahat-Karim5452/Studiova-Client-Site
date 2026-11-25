<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verify

- Single npm app (no workspaces); no tests, CI, or pre-commit hooks. Commands: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format`. Lint, typecheck, and build pass on the current tree.
- `next build` does not lint; run `npm run lint` and `npm run typecheck` explicitly.
- `npm run format` rewrites only `**/*.{ts,tsx}`. Prettier enforces LF, no semicolons, double quotes, and Tailwind class order via `cn`/`cva`.

## Setup

- Env is read from `.env` (gitignored). Required: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_KEY`. Never commit values.
- `.env` is needed even for `next build`: `src/lib/auth.ts` constructs a `MongoClient` at import time and throws without `MONGODB_URI`.
- Studios/bookings come from the sibling Express API in `../Studiova-Server-Site` (port 8000 via `NEXT_PUBLIC_API_URL`). Start it before the client; without it, pages show empty states or fail to load.
- The API verifies Bearer JWTs against this app's JWKS at `${CLIENT_URL}/api/auth/jwks`. Keep the client running and make the API's `CLIENT_URL` exactly match this app's `BETTER_AUTH_URL` (the only trusted origin), or protected calls return 401.
- Both apps must use the same MongoDB (`studiospace_db`). The API stores studios in `creative_spaces` and bookings in `reservations` despite the route/type names.

## Architecture

- App Router lives under `src/` only (`@/*` -> `src/*`); do not create a root `app/`. Root layout mounts `ThemeProvider`, `Navbar`, page content, `Footer`, `Toaster` (`sonner`); pages render their own `<main>`.
- Next 16: `params` and `searchParams` are Promises (`await` them) and `headers()` is async. `useSearchParams` needs a `<Suspense>` boundary (see `login/page.tsx`). Middleware is `src/proxy.ts`, not `middleware.ts`.
- Auth: `src/lib/auth.ts` (Better Auth + Mongo adapter, email/password with min length 6 and no auto sign-in, Google, JWT plugin) via `src/app/api/auth/[...all]/route.ts`. Browser: `authClient.useSession()`; server: `auth.api.getSession({ headers: await headers() })`.
- `src/proxy.ts` guards `/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/:path*` and redirects to `/login?redirect=<path>`; login only accepts same-site redirects. Add new private routes to its matcher.
- API calls: server components use `getTokenFromServer()` + `cache: "no-store"`; client mutations use `getTokenFromClient()` + `Authorization: Bearer`. Types: `src/lib/types/`. Routes: `POST /add-studio`, `GET /studios?search=&category=`, `GET /featured-studios`, `GET /studio/:id`, `PATCH|DELETE /studio/:id`, `GET /my-studios/:email`; `POST /booking`, `GET /my-bookings/:email`, `GET /host-bookings/:email`, `PATCH /my-bookings/:id/cancel` (creator), `PATCH /booking/:id/status` (host).
- Backend rules: whole-hour `:00` times only, no past dates, owner fields derived from the JWT (don't send `ownerName`/`ownerEmail`), and only `Confirmed` bookings block overlaps (409).
- `StudioForm` serves both add and edit; it uploads the cover to ImgBB client-side (`NEXT_PUBLIC_IMGBB_KEY`) and sends the URL. The edit page redirects non-owners to `/my-listings`.
- Styling: Tailwind v4, no `tailwind.config`; tokens/`@theme inline` live in `src/app/globals.css` via `@tailwindcss/postcss`. The four font variables (`--font-manrope`, `--font-geist-mono`, `--font-space-grotesk`, `--font-instrument-serif`) must stay in sync between `layout.tsx` and `@theme inline`. Dark is the default theme (`enableSystem={false}`).
- shadcn style is `base-nova` (Base UI, not Radix): use `render={<Link />}` + `nativeButton={false}` on `Button`; add components with `npx shadcn@latest add <name>`. `cn` is the `cn` npm package re-exported from `@/lib/utils`, not clsx + tailwind-merge.
- All user feedback uses Sonner `toast`; destructive confirmations use `AlertDialog` — never `window.alert`/`confirm`.
- `next.config.ts`: React Compiler on (keep `babel-plugin-react-compiler`); `cacheComponents`/`partialPrefetching` off; all HTTPS `next/image` hosts allowed.

## Current behavior and gaps

- Overlap protection is intentionally narrow: only `Confirmed` reservations conflict. Duplicate `Pending` requests for the same studio/slot are allowed; confirming a second overlapping one fails with 409.
- Cancelling sets the row to `Cancelled`; it is not deleted, and `GET /my-bookings/:email` returns every status, so cancelled rows stay visible. Host requests also keep cancelled entries.
- `DELETE /studio/:id` removes only the studio document. Its reservations are not cascaded, so old bookings remain and their "View Studio" link 404s.
- README covers features/stack/setup. Optional PDF invoices and the saved-studios wishlist are not implemented, though some marketing copy mentions them.
