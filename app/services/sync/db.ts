import * as SQLite from "expo-sqlite"

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null

/**
 * Opens (and lazily migrates) the local SQLite database. Two tables:
 *  - `jobs`: a read-only local cache of Supabase's `jobs` table, refreshed by
 *    `pullJobs()` whenever there's connectivity.
 *  - `applications`: an outbox. Every submitted application is written here
 *    first — instantly, offline-safe — then `pushPendingApplications()`
 *    flushes rows with sync_status != 'synced' up to Supabase.
 */
export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (dbPromise) return dbPromise

  dbPromise = SQLite.openDatabaseAsync("edgex.db").then(async (db) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        employment_type TEXT NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        requirements TEXT NOT NULL DEFAULT '[]',
        posted_at TEXT NOT NULL DEFAULT '',
        active INTEGER NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        cover_note TEXT,
        resume_uri TEXT,
        resume_path TEXT,
        upload_status TEXT NOT NULL DEFAULT 'pending',
        sync_status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL
      );
    `)
    return db
  })

  return dbPromise
}
