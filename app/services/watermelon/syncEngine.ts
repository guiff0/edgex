import { AppState, type AppStateStatus } from "react-native"

import { pushPendingApplications } from "./applicationsSync"
import { pullJobs } from "./jobsSync"

const DEFAULT_INTERVAL_MS = 60_000

let started = false

/** Runs one full sync pass: pull latest jobs, push any pending applications. Both no-op safely if Supabase isn't configured or there's no connectivity. */
export async function runSyncOnce(): Promise<void> {
  await Promise.allSettled([pullJobs(), pushPendingApplications()])
}

/**
 * Starts the background sync loop: runs immediately, then every
 * `intervalMs`, and again whenever the app comes back to the foreground.
 * Call this once at app startup — see app/app.tsx. Returns a cleanup
 * function.
 *
 * Note: this is a simple manual pull/push loop, not WatermelonDB's built-in
 * `synchronize()` protocol — that protocol needs a backend that implements
 * WatermelonDB's specific pullChanges/pushChanges RPC contract (typically a
 * custom Postgres function or Edge Function), which is more infrastructure
 * than a Supabase-only setup needs. This is simpler and sufficient for a
 * jobs + applications use case; swap in `synchronize()` later if the data
 * model grows more complex (many tables, conflict resolution, etc.).
 */
export function startBackgroundSync(intervalMs: number = DEFAULT_INTERVAL_MS): () => void {
  if (started) return () => {}
  started = true

  runSyncOnce().catch(() => {})

  const interval = setInterval(() => {
    runSyncOnce().catch(() => {})
  }, intervalMs)

  const onAppStateChange = (state: AppStateStatus) => {
    if (state === "active") runSyncOnce().catch(() => {})
  }
  const subscription = AppState.addEventListener("change", onAppStateChange)

  return () => {
    clearInterval(interval)
    subscription.remove()
    started = false
  }
}
