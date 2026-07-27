# EDGEX site — setup

This adds the full ALGU Co. / EDGEX site to your existing Ignite app, at `/`
(the app's home). Quantom Inc. still exists in the codebase but no longer
owns the landing page — it moved to `/quantom`.

Offline data is now **WatermelonDB** (not SQLite/expo-sqlite, not PowerSync),
synced against Supabase with a simple manual pull/push loop.

## 1. Install dependencies

Unzip this at your project root, letting it merge into your existing `app/`
folder, `package.json`, and `assets/`.

```bash
npm install
npx expo install expo-document-picker @react-native-async-storage/async-storage expo-linear-gradient
```

That resolves the Expo-managed packages to versions matching your Expo SDK
(55) — they're intentionally left unpinned in `package.json` for that reason.

## 2. WatermelonDB requires two config changes I couldn't make blind

I don't have your `babel.config.js` or `tsconfig.json` — only the `app/`
folder was uploaded, not project-root config files — so these need a manual
one-line addition each rather than a full-file overwrite that might clobber
something else in them.

**`babel.config.js`** — add the decorators plugin *before* any other plugins
(WatermelonDB's models use `@field`/`@text` decorators):
```js
plugins: [
  ["@babel/plugin-proposal-decorators", { legacy: true }],
  // ...your existing plugins
],
```

**`tsconfig.json`** — add under `compilerOptions`:
```json
"experimentalDecorators": true
```

No `app.config.ts` / Expo config plugin changes needed — WatermelonDB's
SQLite adapter auto-links like any other native module under a custom dev
client, and this project already depends on `expo-dev-client`. You will need
to rebuild the dev client once (`npx expo run:ios` / `run:android`, or a new
EAS dev build) since this is a native module — it won't work in Expo Go.

## 3. Supabase

1. Create a project at supabase.com if you don't have one yet.
2. Run `sql/edgex_schema.sql` in the Supabase SQL editor — creates `jobs`,
   `applications`, RLS policies, and the private `resumes` storage bucket.
3. Copy `.env.example` to `.env` and fill in `EXPO_PUBLIC_SUPABASE_URL` and
   `EXPO_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
4. Optionally seed a couple of rows into `jobs` — Careers falls back to the
   bundled seed list in `app/content/edgexJobs.ts` until real rows exist.

## 4. How the offline sync works (WatermelonDB layer)

- **`app/services/watermelon/schema.ts`** — table schema for `jobs` and
  `applications`.
- **`app/services/watermelon/models/`** — `JobModel` and `ApplicationModel`,
  the WatermelonDB `Model` subclasses.
- **`app/services/watermelon/database.ts`** — the `Database` instance. Uses
  the SQLite adapter (JSI) on native and the LokiJS adapter on web, since
  this project also runs via `expo start --web` and WatermelonDB's SQLite
  adapter is native-only.
- **`jobsSync.ts`** — `pullJobs()` upserts Supabase's `jobs` rows into the
  local collection; `getJobs()`/`getJob()` always read locally first, falling
  back to seed data if the collection is empty.
- **`applicationsSync.ts`** — `submitApplication()` creates a local record
  immediately (instant, offline-safe), then attempts an immediate push;
  `pushPendingApplications()` retries anything not yet synced.
- **`syncEngine.ts`** — `startBackgroundSync()` runs both on startup, every
  60s, and on app-foreground. This is a simple manual pull/push loop, *not*
  WatermelonDB's built-in `synchronize()` protocol — that protocol needs a
  backend implementing WatermelonDB's specific pull/push RPC contract, which
  is more infrastructure than this data model (two tables, no complex
  conflict resolution) needs. Worth revisiting if the schema grows.

## 5. Visual direction: metallic silver + blue reactor-core

- **`app/theme/edgexPalette.ts`** — brushed-steel surfaces with a bright
  reactor-glow blue (`signal`) as the dominant accent, plus a deep secondary
  blue (`teal`, renamed in value only — kept the key name so nothing
  downstream needed touching) and a muted metallic gold (`amber`) reserved
  for warnings, not branding.
- **`app/components/edgex/EdgexIllustration.tsx`** — a procedural
  illustration on every single page (including the landing page): a
  brushed-metal gradient panel (via `expo-linear-gradient`) with a pulsing
  reactor-core glow and a page-specific glyph. **I don't have an
  image-generation tool in this environment**, so these are built the same
  way as the earlier `ReactorCore`/`EdgexLogo` pieces — hand-drawn from
  Views and gradients rather than generated photographs/artwork. If you want
  the *illustrated* logo artwork itself used more broadly (it's currently
  shown large on Home/Login/Sign-up via `EdgexLogoImage.tsx`, and small via
  the vector `EdgexLogo.tsx` mark in nav chrome), let me know and I can swap
  more of these procedural panels for that artwork directly.
- **`EdgexLogoImage.tsx`** — wraps your uploaded logo artwork
  (`assets/images/edgex-logo.png`) for prominent hero placement.
- **`EdgexPressableScale.tsx`** — small press-to-scale feedback wrapper,
  used on Home's stat cards and nav links so the landing page has some
  tactile response rather than being fully static.

## 6. Content

Every page's copy was expanded — Products, Services, Technologies,
Industries, Departments, and About now include a "why this matters" layer
(how the products interlock, how an engagement actually moves through the
divisions, why a given industry's problem maps to a given service line) on
top of the original catalog listing, not just longer versions of the same
bullet points.

## What's where

```
app/
  content/edgexContent.ts       nav, footer, and all static page content
  content/edgexJobs.ts          seed job vacancies (fallback data)
  theme/edgexPalette.ts         metallic silver + blue reactor-core palette
  components/edgex/            header, drawer, footer, illustration, logo, shared primitives
  screens/edgex/                every EDGEX screen
  navigators/EdgexNavigator.tsx nested stack, registered as "Edgex" in AppNavigator
  services/supabase/            Supabase client + auth hook
  services/watermelon/          schema, models, database, jobs/applications sync, sync loop
sql/
  edgex_schema.sql              run this in the Supabase SQL editor
assets/
  images/edgex-logo.png         your uploaded logo artwork
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
| `/leadership`, `/legal`, `/governance`, `/documentation`, `/api-access`, `/whitepapers`, `/case-studies`, `/newsroom` | Footer-linked pages |
| `/quantom` | Quantom Inc. (moved off the root) |
