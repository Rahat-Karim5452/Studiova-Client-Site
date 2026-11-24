# Studiova

Studiova is a peer-to-peer marketplace for creative workspaces. Hosts list photo
studios, sound stages, podcast rooms, music suites and art workshops. Creators
find a room, choose their hours and send a booking request.

## Features

- Responsive home page with a Swiper hero, featured studios, categories, booking
  walkthrough, host guarantee and closing CTA
- Email/password and Google sign-in with Better Auth and the MongoDB adapter
- Protected dashboard, listings, bookings and studio editor routes
- Studio CRUD with ImgBB image upload; only the host of a studio can edit it
- Booking requests with Pending, Confirmed, Completed and Cancelled states
- Overlap protection for confirmed bookings
- Sonner toasts, confirmation dialogs, skeleton loaders, empty states and a
  custom 404 page
- Centralized light/dark theme system with dark mode as the default

## Tech stack

- Next.js App Router, React and TypeScript
- Tailwind CSS v4 and shadcn/ui (`base-nova` / Base UI)
- Better Auth with MongoDB and the JWT plugin
- Swiper, Sonner and next-themes
- Separate Express + MongoDB API for studios and bookings

## Theme

All colors are defined as CSS variables in `src/app/globals.css` and exposed as
Tailwind tokens. `ThemeProvider` mounts in `src/app/layout.tsx` with
`defaultTheme="dark"` and `enableSystem={false}`. The selected theme is stored
by `next-themes` and applied before paint, so it persists across navigation and
refreshes without a flash.

## Local setup

1. Start the separate API server (see the server repository). It usually runs
   on port `8000`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` with these keys:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   MONGODB_URI=<your MongoDB connection string>
   BETTER_AUTH_SECRET=<a long random string>
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<from Google Cloud Console>
   GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
   NEXT_PUBLIC_IMGBB_KEY=<from api.imgbb.com>
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
