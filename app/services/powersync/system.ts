import { PowerSyncDatabase } from "@powersync/react-native"

import { isPowerSyncConfigured, SupabaseConnector } from "./connector"
import { AppSchema } from "./schema"

/**
 * The local SQLite database, present and usable immediately (offline-first)
 * regardless of whether PowerSync's cloud sync is configured yet. Reads and
 * writes against `powersync` always hit local SQLite first.
 */
export const powersync = new PowerSyncDatabase({
  schema: AppSchema,
  database: { dbFilename: "edgex.sqlite" },
})

let connectPromise: Promise<void> | null = null

/**
 * Connects to the PowerSync cloud service for background sync. Safe to call
 * multiple times — it only connects once. No-ops (logs a warning) until
 * EXPO_PUBLIC_POWERSYNC_URL / EXPO_PUBLIC_POWERSYNC_TOKEN_ENDPOINT are set,
 * so local reads/writes work throughout development regardless.
 */
export function connectPowerSync(): Promise<void> {
  if (connectPromise) return connectPromise
  connectPromise = isPowerSyncConfigured
    ? powersync.connect(new SupabaseConnector())
    : Promise.resolve()
  return connectPromise
}
