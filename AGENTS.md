<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo shape

- Single Next.js 16.4.3 App Router app (not a monorepo): routes in `src/app` (`/`, `/all-sports`, `/add-sports`, `/my-bookings`), React 19.3, TypeScript strict, alias `@/*` → `./src/*`.
- **No test runner, no CI, no Prettier, no `typecheck` script.** Don't invent `npm test` — verify with lint + tsc + build (below).
- Next 16 docs are vendored in-repo: `node_modules/next/dist/docs/` (`01-app/` is the App Router section). Trust these over training-data knowledge of Next APIs.
- Route files take generated global props types (`LayoutProps<"/">`, `PageProps`) declared in the gitignored `.next/types`, not hand-written prop types.
- `src/data/` mixes live API data (sports) with static demo data (venues, bookings, testimonials). Components are grouped by feature under `src/components/{home,sports,venues,bookings,add-sport,layout,ui}`.

## External backend (must be running)

Sports data comes from a separate API at `http://localhost:8000` (hardcoded, not env-driven):

- `GET /all-sports` → `ISport[]` — `src/data/sportsData.ts` and an inline copy in `src/app/all-sports/page.tsx`
- `GET /get-sports/8` → first 8 sports — inline in `src/components/home/SportGrid.tsx`
- `POST /add-sports` → creates a venue — **not implemented by the backend yet**. `createSport()` in `src/data/sportsData.ts` sends the full venue shape (`SportInput`, i.e. `ISport` minus `_id`) from the Add Sports form; the form shows an inline error if the route is missing. The API is read-only today, so this POST fails until the backend adds it (with CORS/preflight for the browser origin).

These run inside server components, so `/` and `/all-sports` fail to render without the backend, and `next build` executes the same fetches during prerender. Fetch calls use `{ next: { revalidate: 30 } }` — never cache the live API indefinitely (a stale fetch cache once kept a year-old payload and crashed `formatPrice`). `ISport` lives in `src/types/sports.types.ts`. `AddSportForm.tsx` awaits sports data at module scope in a client component, so the browser hits `:8000` directly too.

## Commands

```bash
npm run dev            # dev server; Turbopack is the default bundler (--webpack opts out)
npm run lint           # runs bare `eslint` (v9 flat config) — no path arguments
npx tsc --noEmit       # typecheck; there is no npm script for this
npm run build          # production build, also regenerates route types
```

- Verify in order: `npm run lint` → `npx tsc --noEmit` → `npm run build`.
- **Gotcha:** `tsc --noEmit` fails on a fresh clone because `LayoutProps`/`PageProps` and route types are generated into gitignored `.next/types`. Run `npm run dev` or `npm run build` once first.
- A `next dev` may already be running for this repo. If port 3000 is taken, Next exits with "Another next dev server is already running" and prints the PID — reuse `:3000` (`kill <pid>` to restart) instead of spawning duplicates.
- Ignore the harmless Turbopack warning about `package-lock.json` in `/home/atik` being outside the Git repo.

## Toolchain quirks

- Tailwind v4 is wired through **Turbopack in `next.config.ts`** (a `*.css` loader rule for `@tailwindcss/turbopack`). Do not add `postcss.config.*` or `@tailwindcss/postcss`. Keep `@import "tailwindcss";` at the top of `src/app/globals.css` or styles silently vanish.
- Theme tokens and shared classes live in `src/app/globals.css` (`@theme`, `.shell`, `.section`, `.card`, `.btn-primary`/`.btn-secondary`, `.eyebrow`). **Every page section must use `className="section"`** — it owns the uniform top/bottom rhythm, and sections without it touch their neighbors. `pt-*` utilities override its top padding.
- React Compiler is enabled. ESLint enforces `react-hooks/set-state-in-effect`: never call `setState` directly in a `useEffect` body. Close menus in `onClick`, and read localStorage via `useSyncExternalStore` (`src/lib/bookings.ts`) — its snapshot must stay reference-stable between writes or React re-renders endlessly.
- `next/image` remote URLs only work for hosts in `next.config.ts` `images.remotePatterns` (currently `images.unsplash.com`). Add a host before using it, or render a fallback.
- Toasts: `ToastProvider` wraps the app in `src/app/layout.tsx`; client components call `useToast().toast({ variant: "success" | "danger" | "info", title, description? })`. The container is fixed bottom-right at `z-[150]` (above the booking modal's `z-[100]`), auto-dismisses (success 4s / info 5s / danger 6s), pauses on hover, and announces via `aria-live` (`role="alert"` for danger). Don't add a toast for things already communicated inline (e.g. search result counts/empty states).
- `AGENTS.md` is rewritten by `next dev` (block above); leave it committed instead of fighting the diff.
