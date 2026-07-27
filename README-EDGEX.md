# EDGEX site — setup

This adds the full ALGU Co. / EDGEX site to your existing Ignite app, now at
`/` (the app's home). Quantom Inc. still exists in the codebase but no longer
owns the landing page — it moved to `/quantom`. If you'd rather remove
Quantom entirely instead of just relocating it, say so and I'll strip it out
(delete `QuantomScreen.tsx`/`ReactorCore.tsx` and their route registrations).
EDGEX never references Quantom's components or branding either way.

Offline sync is **Supabase-only** — no PowerSync. A small local SQLite outbox
+ polling sync script handles it (see "Offline sync" below).

## 1. Install dependencies

Unzip this at your project root (`D:\dev\expo\ignite`), letting it merge into
your existing `app/` folder and `package.json`.

Then:

```bash
npm install
npx expo install expo-document-picker expo-sqlite @react-native-async-storage/async-storage
```

The second command resolves those three Expo-managed packages to versions
that match your Expo SDK (55) — they're intentionally left unpinned in
`package.json` for that reason.

## 2. Supabase

1. Create a project at supabase.com if you don't have one yet.
2. Run `sql/edgex_schema.sql` in the Supabase SQL editor — creates `jobs`,
   `applications`, RLS policies, and the private `resumes` storage bucket.
3. Copy `.env.example` to `.env` and fill in:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   (Both from Project Settings → API.)
4. Optionally seed a couple of rows into `jobs` — Careers falls back to the
   bundled seed list in `app/content/edgexJobs.ts` until real rows exist, so
   the site works either way.

Login and Sign-up (`/edgex/login`, `/edgex/signup`) work against real
Supabase Auth as soon as step 3 is done — no code changes needed.

## 3. Offline sync (how it works, no extra setup)

There's no separate service to provision — this runs entirely on your
existing Supabase project:

- **Jobs (pull):** `app/services/sync/jobsSync.ts` → `pullJobs()` fetches
  active jobs from Supabase into a local SQLite cache. `getJobs()` /
  `getJob()` always read from that local cache first, falling back to the
  bundled seed list if the cache is empty — so Careers works instantly,
  offline, before Supabase has any rows.
- **Applications (push):** `app/services/sync/applicationsSync.ts` →
  `submitApplication()` writes to a local SQLite outbox table immediately
  (instant, fully offline-safe), then makes a best-effort push to Supabase
  right away. If that fails (no connectivity), the row stays
  `sync_status = 'pending'`.
- **The loop:** `app/services/sync/syncEngine.ts` → `startBackgroundSync()`
  runs both of the above once at startup, then every 60s, and again whenever
  the app returns to the foreground. Started once in `app/app.tsx`.

Nothing here needs configuring beyond the `.env` values from step 2 — it's a
no-op (skips silently) until those are set, so the app is fully usable on
local SQLite + the seed job list the whole time.

## What's where

```
app/
  content/edgexContent.ts       nav, footer, and all static page content
  content/edgexJobs.ts          seed job vacancies (fallback data)
  theme/edgexPalette.ts         EDGEX brand colors
  components/edgex/            header, drawer menu, footer, shared primitives
  screens/edgex/                every EDGEX screen
  navigators/EdgexNavigator.tsx nested stack, registered as "Edgex" in AppNavigator
  services/supabase/            Supabase client + auth hook
  services/sync/                local SQLite db, jobs pull, applications push, sync loop
sql/
  edgex_schema.sql              run this in the Supabase SQL editor
```

## Routes

| Path | Screen |
|---|---|
| `/` | Home (EDGEX) |
| `/products` | Products |
| `/services` | Services |
| `/technologies` | Technologies |
| `/industries` | Industries |
| `/departments` | Departments |
| `/about` | About |
| `/contact` | Contact |
| `/careers` | Careers list |
| `/careers/:jobId` | Job detail |
| `/careers/:jobId/apply` | Apply |
| `/login` | Sign in |
| `/signup` | Create account |
| `/quantom` | Quantom Inc. (moved off the root) |

## Changes in this revision

- Removed PowerSync entirely — replaced with the Supabase-only sync described
  above (fewer moving parts, no separate instance/token endpoint to provision).
- Added the site footer render — `FOOTER` content existed in `edgexContent.ts`
  from the start but wasn't actually being rendered anywhere; it's now shown
  via `EdgexFooter.tsx` at the bottom of every page.
- Added `EdgexLogo.tsx` — a real logo mark (nested-diamond emblem + wordmark),
  built from plain Views so it needs no SVG library, used in the header,
  drawer menu, and footer. Not just "EDGEX" as plain text anymore.
- EDGEX now owns the root path (`/`) and is the app's `initialRouteName`;
  Quantom Inc. moved to `/quantom` instead of owning the landing page.
- Added `Status: Current Active` and `Directors / Officers: 4 officers on
  file` to the About page and footer legal column, from the registry lookup.
