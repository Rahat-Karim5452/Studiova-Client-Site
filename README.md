# Studiova

Studiova is a peer-to-peer marketplace for creative workspaces. Hosts list photo
studios, sound stages, podcast rooms, music suites and art workshops. Creators
find a room, choose their hours and send a booking request.

**Live site:** https://studiova-client-site.vercel.app/

## Examiner test credentials

| Role    | Email                     | Password           |
| ------- | ------------------------- | ------------------ |
| Creator | `YOUR_TEST_EMAIL_HERE`    | `YOUR_PASSWORD`    |

You can also register a new account, or continue with Google.

## Features

- Responsive home page with a Swiper hero slider, featured studios (top 6 from
  MongoDB), category cards, booking walkthrough and host guarantee section
- Email/password and Google sign-in with Better Auth and the MongoDB adapter;
  password must have an uppercase letter, a lowercase letter and 6+ characters
- Protected dashboard, listings, bookings and studio editor routes; a logged-in
  user stays logged in after a page reload
- Studio CRUD with ImgBB image upload; only the host of a studio can update or
  delete it, and deleting asks for confirmation in a modal
- Booking requests with Pending, Confirmed, Completed and Cancelled states;
  creators can cancel pending bookings and hosts can confirm or decline them
- Double-booking protection: a time that overlaps a confirmed booking is rejected
  with a clear error message
- JWT-protected server routes that return 401 for unauthorized requests
- Light and dark theme toggle that changes the whole site
- Sonner toasts, confirmation dialogs, skeleton loaders, empty states and a
  custom 404 page

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