import type {
  AbstractPowerSyncDatabase,
  PowerSyncBackendConnector,
  PowerSyncCredentials,
} from "@powersync/common"
import { UpdateType } from "@powersync/common"

import { supabase } from "../supabase/client"

const POWERSYNC_URL = process.env.EXPO_PUBLIC_POWERSYNC_URL ?? ""

// TODO(setup): this should point at a small backend endpoint — commonly a Supabase
// Edge Function — that verifies the caller's Supabase access token and mints a
// short-lived PowerSync JWT. PowerSync doesn't accept the Supabase token directly.
// See: https://docs.powersync.com/installation/authentication-setup/supabase-auth
const POWERSYNC_TOKEN_ENDPOINT = process.env.EXPO_PUBLIC_POWERSYNC_TOKEN_ENDPOINT ?? ""

export const isPowerSyncConfigured = Boolean(POWERSYNC_URL && POWERSYNC_TOKEN_ENDPOINT)

export class SupabaseConnector implements PowerSyncBackendConnector {
  async fetchCredentials(): Promise<PowerSyncCredentials | null> {
    if (!isPowerSyncConfigured) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn(
          "[PowerSync] Not configured — set EXPO_PUBLIC_POWERSYNC_URL and " +
            "EXPO_PUBLIC_POWERSYNC_TOKEN_ENDPOINT in .env once your instance is provisioned. " +
            "The app will keep working against local SQLite only until then.",
        )
      }
      return null
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return null

    const response = await fetch(POWERSYNC_TOKEN_ENDPOINT, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch PowerSync token (${response.status})`)
    }
    const { token } = (await response.json()) as { token: string }

    return { endpoint: POWERSYNC_URL, token }
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const transaction = await database.getNextCrudTransaction()
    if (!transaction) return

    try {
      for (const op of transaction.crud) {
        const table = supabase.from(op.table)

        switch (op.op) {
          case UpdateType.PUT:
            await table.upsert({ id: op.id, ...op.opData })
            break
          case UpdateType.PATCH:
            await table.update(op.opData ?? {}).eq("id", op.id)
            break
          case UpdateType.DELETE:
            await table.delete().eq("id", op.id)
            break
        }
      }

      await transaction.complete()
    } catch (error) {
      // Leave the transaction uncompleted so PowerSync retries once connectivity
      // or the underlying error condition is resolved.
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn("[PowerSync] uploadData failed, will retry:", error)
      }
      throw error
    }
  }
}
