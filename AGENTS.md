<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verify

- npm project (`package-lock.json`; no workspaces). Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`. No tests, CI, or pre-commit hooks are configured.
- Run `npm run typecheck` and `npm run lint` explicitly: Next 16 removed `next lint`, and `next build` no longer lints.
- `npm run format` only formats `**/*.{ts,tsx}`; `.prettierrc` enforces LF, no semicolons, double quotes, 2 spaces, and Tailwind class sorting.

## Setup

- `.env*` is gitignored; local `.env` supplies `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_KEY`. Never commit values.
- Auth needs MongoDB (db `studiospace_db`) and Google OAuth; `lib/auth.ts` creates the Mongo client at import time.

## Architecture

- App Router only; application code lives under `src/` (`src/app`, `src/components`, `src/lib`, `src/hooks`). `@/*` maps to `src/*`; `public/` and config files stay at the repo root. Do not recreate a root `app/` — Next ignores `src/app` when it exists. Root shell: `src/app/layout.tsx` (ThemeProvider + `suppressHydrationWarning`).
- `src/proxy.ts` holds route protection; Next 16 proxy files belong inside `src/`.
- Auth: `src/lib/auth.ts` (Better Auth + Mongo adapter, email/password, Google, JWT plugin) is exposed by catch-all `src/app/api/auth/[...all]/route.ts`; browser code uses `src/lib/auth-client.ts` / `authClient.useSession()`.
- Styling: Tailwind v4 with no `tailwind.config`; theme tokens in `src/app/globals.css`, handled by `@tailwindcss/postcss` in `postcss.config.mjs`. Turbopack has built-in CSS support — do not add a `turbopack.rules` CSS loader. shadcn `base-nova` components use Base UI primitives, not Radix; for links use `render={<Link href="..." />}` (`nativeButton={false}` on Button). Add components with `npx shadcn@latest add <name>` into `src/components/ui`.
- `next.config.ts` has React Compiler enabled, which requires the `babel-plugin-react-compiler` dev dependency; `cacheComponents`/`partialPrefetching` are disabled and all HTTPS `next/image` hosts are allowed.
- `src/app/page.tsx` is still the template placeholder; `src/components/navbar.tsx` is client-side and not mounted in the root layout, and its `/login`, `/register`, `/dashboard`, etc. links have no routes yet.
- `README.md` is still the stock template; trust `package.json`, `components.json`, and code.
