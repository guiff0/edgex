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
"experimentalDecorators": true,
"strictPropertyInitialization": false
```
The second one is needed because WatermelonDB's decorated model fields
(`@text`, `@field`) can't carry TypeScript's `!` definite-assignment
assertion — combined with legacy decorators, Babel's TypeScript transform
throws `Definitely assigned fields cannot be initialized here, but only in
the constructor` at bundle time if you try. The models in this zip already
have `!` removed for that reason; disabling
`strictPropertyInitialization` (a sub-flag of `strict`) stops `tsc` from
separately flagging those same fields as "has no initializer" — it doesn't
affect runtime behavior, since Metro/Babel doesn't type-check at bundle
time anyway.

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

## 7. User identification & auth gating (this revision)

- **Landing page now includes an embedded sign-in panel** —
  `EdgexMiniLoginPanel.tsx`, shown directly in the Home hero (next to the
  headline on wide screens, stacked below on mobile). Returning visitors can
  identify themselves without leaving the landing page; it shows a "signed in
  as ⟨email⟩ / Sign out" state once authenticated.
- **Careers now requires sign-in.** `EdgexAuthGate.tsx` wraps the job listing
  on `/careers`, the full listing on `/careers/:jobId`, and the form on
  `/careers/:jobId/apply` — signed-out visitors see the same compact login
  panel in place of that content instead of being redirected away, so they
  don't lose their place once they sign in. The Apply form also prefills the
  email field from the signed-in session.
- This uses the same Supabase-auth-backed `useSupabaseAuth()` hook the
  Login/Sign-up screens already used — no new auth system, just applied more
  broadly.

**Bug fix, unrelated to this request but found while syncing your upload
against my last build:** `JobModel`/`ApplicationModel`'s `@text`/`@field`
decorators had been stripped out somewhere between my last delivery and your
upload (leaving plain undecorated class fields, which WatermelonDB can't map
to columns), `ApplicationModel` was also missing the `syncStatus` field
entirely, and `createdAt` was being set to `Date.now()` (a number) instead of
an ISO string. All three are restored in this zip.

**Second bug fix:** WatermelonDB reserves the exact column name `created_at`
for its own internal timestamp bookkeeping and requires it to be typed
`number` — it threw `created_at must be of type number and not optional` the
moment `applications` had any rows, since our column was a plain string. The
local WatermelonDB column/field is renamed to `submitted_at`/`submittedAt`
throughout `schema.ts`, `models/Application.ts`, and `applicationsSync.ts`.
The Supabase side is untouched — the outgoing upsert still writes to
Postgres's `created_at` column under that name, since that's a completely
unrelated column with no such reserved-name conflict.

## 8. Landing page rebuild (this revision)

- **Sticky header on web** — `EdgexScreenShell.tsx` now pins the header via
  CSS `position: sticky` on web builds specifically; native keeps the
  ordinary scrolls-with-content header, which is the expected mobile pattern
  (native `ScrollView` doesn't support CSS sticky the way react-native-web
  does).
- **"Why EDGEX" value pillars** — 6 short pillar cards (`WHY_US` in
  `edgexContent.ts`): full-stack ownership, power independence, the 5 QPU
  architectures, engagement-scoped delivery, quantum-safe security, the 7
  divisions.
- **Product/service highlight cards** — replaced the old plain-text "where
  to go next" links with actual visual card tiles linking to Products/Services.
- **Industry mapping teaser** — a 4-card preview pulled from the real
  Industries page content, with a link through to the full page.
- **Trust & compliance section** (`TRUST_SIGNALS`) — registered entity
  status, NRC-compliant partner relationship, governance oversight,
  quantum-safe security. I did **not** add fake client logos or
  testimonials — there's no real client data to draw from, and inventing
  some would misrepresent the business, so this section uses only verifiable
  facts already established elsewhere on the site (registry status, the
  Corporate Governance page, etc.).
- **Refined CTA row** — "Request a Consultation" (mailto), "Explore
  Solutions" (→ Services), "View Open Roles" (→ Careers), plus a closing CTA
  band above the footer.
- Tactile press feedback (`EdgexPressableScale`) extended to the new card
  grids.



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

## 9. .env, the Learn mega-menu, and the scientist illustration (this revision)

- **`.env`** — a real `.env` file (not just `.env.example`) is now included
  with placeholder Supabase values already in the right shape; swap in your
  actual project URL/anon key and everything else just works.
- **New "Learn" page** (`/learn`) — the specific quantum ML capabilities
  behind Services, grouped "By capability" (anomaly detection, optimization,
  Bayesian networks, reinforcement learning, Monte Carlo, complex systems)
  and "By finance use case" (derivatives pricing, time-series forecasting,
  portfolio optimization, risk modeling, worked finance examples), plus
  practical tutorials. Added to `TOP_NAV`.
- **Foldable mega-menu** (`EdgexFoldableMenu.tsx`) — modeled on the D-Wave
  reference screenshot's Solutions mega-menu (grouped columns under a nav
  item). Since there's no hover state on a touch UI, it's a tap-to-expand
  accordion in the drawer instead of a hover flyout — tapping "Learn" expands
  the same grouped columns in place. It reads directly from the Learn page's
  own `sections`, so the menu and the page content can't drift apart from
  editing one and not the other.
- **"Show the face of some scientist" — handled differently than asked, on
  purpose:** I don't have an image-generation tool available, and I won't
  pull a real person's photo from a web search to represent an unnamed
  "scientist" on a commercial site — that would imply a real, identifiable
  person endorses or works for EDGEX without their knowledge or consent,
  on top of the licensing problem of using someone else's photo. What's in
  this build instead is `EdgexIllustration.tsx`'s new `"bust"` glyph — a
  clearly abstract, anonymized head-and-shoulders silhouette in the same
  procedural style as everything else on the site — used on the Learn and
  Leadership pages. If you have real team photos you're able to use (actual
  employees, actual consent), send them over and I'll wire those in as real
  images instead — that's a straightforward swap, just needs real source
  material I don't have access to.

## 10. Running the web build over a private, local-only HTTPS URL

Two options depending on whether you actually need TLS or just want the URL
to drop the port number:

**Option A — plain HTTP on port 80, no certs needed at all:**
```bash
npm run web:port80
```
Runs `expo start --web --port 80` directly — Metro binds straight to 80, so
the URL is just `http://localhost` with nothing after it. Simplest option if
you don't specifically need HTTPS.

**Option B — HTTPS on port 443** (uses the mkcert + local-ssl-proxy setup
below): `web:https-proxy` now runs `local-ssl-proxy --source 443 --target
8081` instead of 8443, so the browsable URL is `https://localhost` with no
port suffix.

**Both options bind a privileged port (<1024)**, which needs elevated
permissions:
- **Windows:** run the terminal "as Administrator." If port 80/443 is
  already in use (IIS, Skype, and similar often grab 80 by default), you'll
  get an address-in-use error — stop whatever's holding it, or pick a
  different port.
- **macOS/Linux:** prefix the command with `sudo` (e.g. `sudo npm run
  web:port80`), since ports below 1024 require root there.

`npm run web` (plain, port 8081, no elevation needed) is still there
unchanged for everyday dev — use the port-80/443 scripts specifically when
you need the standard-port URL.

`local-ssl-proxy` is a devDependency; `mkcert` is a one-time OS tool
install, not an npm package, so that step's manual:

**One-time setup:**

A self-signed `certs/localhost.pem` + `certs/localhost-key.pem` pair is
already included in this zip (covers `localhost`, `127.0.0.1`, and `::1`,
valid until Oct 2028) — `local-ssl-proxy` will work immediately with it.
The one thing it *doesn't* do is suppress your browser's "not trusted"
warning, since it wasn't issued by a CA your machine trusts (that's what
`mkcert -install` is for). Two options:

- **Just click through the warning** ("Advanced → Proceed to localhost") —
  works fine, one-time per browser, nothing else to install.
- **Or install `mkcert` and regenerate** for a warning-free cert:
  1. Install `mkcert`: Windows `choco install mkcert` (or `scoop install
     mkcert`); macOS `brew install mkcert`; Linux via your package manager or
     the mkcert GitHub releases.
  2. `mkcert -install` — installs a local CA into your system/browser trust
     stores, once per machine.
  3. From the project root, overwrite the included pair:
     ```bash
     mkcert -cert-file certs/localhost.pem -key-file certs/localhost-key.pem localhost 127.0.0.1 ::1
     ```

Either way, `certs/` should be in `.gitignore` — these are local dev
certs, not something to commit long-term (the included pair is a
convenience to get the command running immediately, not meant to be
your permanent one).

`npm install` pulls in `local-ssl-proxy` (already added as a devDependency).

**Every time you want the HTTPS URL**, run these in two terminals:

```bash
# Terminal A
npm run web

# Terminal B — as Administrator/sudo, since 443 is privileged
npm run web:https-proxy
```

Then open `https://localhost` (no port). If you did the `mkcert -install`
step, there's no warning; if you're using the included self-signed pair
as-is, click through the one-time "not trusted" warning.

**One real limitation, not glossed over:** Metro's Fast Refresh/HMR
websocket connects back to the plain `ws://localhost:8081` origin, not
through the proxy — some browsers block that as mixed content on an
`https://` page (insecure WS from a secure page). If you notice live-reload
stop working under the proxied URL, that's why; a manual browser refresh
still picks up changes. Page loads, routing, and Supabase auth all work
fine either way — it's specifically the auto-reload-on-save convenience
that can be affected.

For a real deployment (not local dev), HTTPS is provided by whatever host
serves the exported build — Vercel, Netlify, GoDaddy Airo hosting, etc. all
terminate HTTPS automatically once you point a domain at them; there's
nothing in the app itself to configure for that. `npm run bundle:web`
produces the static `dist/` folder to deploy.

## 11. Sign-up fix + expanded Careers with dynamic filters (this revision)

**Sign-up bug fix:** `services/supabase/client.ts` had `detectSessionInUrl:
false` hardcoded. On web, that's what actually reads the session out of the
URL after a user clicks their email-confirmation link — with it off, the
account genuinely was being created in Supabase, but the app never picked up
the resulting session, so signing up looked broken from the outside even
though it technically "worked." Now `detectSessionInUrl: Platform.OS ===
"web"` (native has no URL to read a session from, so it stays `false`
there). Also added an explicit `emailRedirectTo` in `signUp()` pointing at
`window.location.origin` on web, instead of relying solely on whatever the
Supabase dashboard's Site URL is set to.

**One thing this can't fix from code, worth checking in your Supabase
dashboard if sign-up still fails after this:**
- **Authentication → Providers → Email** is enabled (new projects sometimes
  don't have it on)
- **Authentication → URL Configuration → Redirect URLs** includes wherever
  you're actually running the app (`http://localhost:8081`,
  `https://localhost`, `https://algu.net`, etc.) — Supabase rejects
  confirmation redirects to URLs not on this list
- If "Confirm email" is enabled (default), the account won't be usable until
  the confirmation link is clicked — check your spam folder / Supabase's
  Auth logs (Authentication → Logs) if the email never arrives

**Careers expanded from 4 to 13 seed job postings**, spanning exactly the
areas you asked for — quantum hardware, quantum ML, quantum finance, fraud &
anomaly detection, and error correction — each with a real description and
a technical requirements list. Every `Job` now carries a `role` (function
role: Engineering / Research / Data Science / Consulting & Delivery) and a
`field` (technical area: Quantum Hardware / Quantum Machine Learning /
Quantum Finance / Fraud & Anomaly Detection / Error Correction / Energy
Systems / Enterprise Solutions).

- **Dynamic filters on `/careers`** — two rows of tappable chips (Role,
  Field), combined with AND logic, updating the list live. `EdgexChip` now
  supports a `selected`/`onPress` toggle state (used to be display-only).
- **Threaded through the whole pipeline**, not just the seed data: WatermelonDB
  schema (`schema.ts`, bumped to version 2 with a proper migration in
  `migrations.ts` so an already-installed local database upgrades instead of
  breaking), `JobModel`, `jobsSync.ts`'s pull/map functions, and the Supabase
  side (`sql/edgex_schema.sql` has the new `role`/`field` columns).
- **`sql/edgex_jobs_seed.sql`** (new) — an upsert statement seeding the real
  Supabase `jobs` table with the same 13 postings the app falls back to
  locally, generated directly from `edgexJobs.ts` so they can't drift apart.
  Run it after `edgex_schema.sql`.
- **Also fixed while building that seed file:** both `jobs.id` and
  `applications.id` were declared `uuid` in the SQL, but the app never
  generates real UUIDs for either — job ids are readable slugs
  (`"qpu-design-engineer"`) and WatermelonDB generates its own non-UUID
  string ids for applications. Every sync push would have failed Postgres's
  UUID type validation. Both columns are now `text`.

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
| `/learn` | Learn (QML capabilities & finance use cases) |
| `/login` | Sign in |
| `/signup` | Create account |
| `/leadership`, `/legal`, `/governance`, `/documentation`, `/api-access`, `/whitepapers`, `/case-studies`, `/newsroom` | Footer-linked pages |
| `/quantom` | Quantom Inc. (moved off the root) |
