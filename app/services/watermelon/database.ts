import { Platform } from "react-native"
import { Database } from "@nozbe/watermelondb"
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"

import { ApplicationModel } from "./models/Application"
import { JobModel } from "./models/Job"
import { edgexMigrations } from "./migrations"
import { edgexSchema } from "./schema"

// WatermelonDB's SQLite adapter is native-only (it uses JSI). Since this
// project also runs on `expo start --web` via react-native-web, we fall back
// to the LokiJS adapter there — same Model/Collection API either way, so
// nothing above this layer needs to know which one is active.
const adapter =
  Platform.OS === "web"
    ? new LokiJSAdapter({
        schema: edgexSchema,
        migrations: edgexMigrations,
        useWebWorker: false,
        useIncrementalIndexedDB: true,
      })
    : new SQLiteAdapter({
        schema: edgexSchema,
        migrations: edgexMigrations,
        jsi: true,
      })

export const database = new Database({
  adapter,
  modelClasses: [JobModel, ApplicationModel],
})
