import { isSupabaseConfigured, RESUME_BUCKET, supabase } from "@/services/supabase/client"

import { getDb } from "./db"
import { generateId } from "./id"

export interface ApplicationInput {
  jobId: string
  fullName: string
  email: string
  phone: string
  coverNote: string
  resumeUri: string | null
  resumeFileName: string | null
}

type ApplicationRow = {
  id: string
  job_id: string
  full_name: string
  email: string
  phone: string | null
  cover_note: string | null
  resume_uri: string | null
  resume_path: string | null
  upload_status: string
  sync_status: string
  created_at: string
}

/**
 * Writes the application to the local outbox immediately (works fully
 * offline), then makes a best-effort attempt to push it to Supabase right
 * away. If that fails — no connectivity, Supabase not configured — the row
 * stays `sync_status = 'pending'` and `pushPendingApplications()` (run by the
 * sync engine on an interval and on app foreground) will retry it later.
 */
export async function submitApplication(input: ApplicationInput): Promise<{ id: string }> {
  const db = await getDb()
  const id = generateId()
  const createdAt = new Date().toISOString()

  await db.runAsync(
    `INSERT INTO applications
      (id, job_id, full_name, email, phone, cover_note, resume_uri, resume_path, upload_status, sync_status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.jobId,
      input.fullName,
      input.email,
      input.phone,
      input.coverNote,
      input.resumeUri ?? "",
      "",
      "pending",
      "pending",
      createdAt,
    ],
  )

  // Fire-and-forget — the caller shouldn't wait on network for a successful
  // local save, and this is retried by the background sync loop regardless.
  pushPendingApplications().catch(() => {})

  return { id }
}

/** Pushes every not-yet-synced application (and its resume, if any) up to Supabase. Safe to call repeatedly — already-synced rows are skipped. */
export async function pushPendingApplications(): Promise<void> {
  if (!isSupabaseConfigured) return

  const db = await getDb()
  const pending = await db.getAllAsync<ApplicationRow>(
    "SELECT * FROM applications WHERE sync_status != 'synced'",
  )

  for (const row of pending) {
    try {
      let resumePath = row.resume_path || null
      if (!resumePath && row.resume_uri) {
        resumePath = await uploadResume(row.id, row.resume_uri)
      }
      const uploadStatus = resumePath ? "uploaded" : row.resume_uri ? "failed" : "uploaded"

      const { error } = await supabase.from("applications").upsert({
        id: row.id,
        job_id: row.job_id,
        full_name: row.full_name,
        email: row.email,
        phone: row.phone,
        cover_note: row.cover_note,
        resume_path: resumePath,
        upload_status: uploadStatus,
        created_at: row.created_at,
      })
      if (error) throw error

      await db.runAsync(
        "UPDATE applications SET sync_status = 'synced', resume_path = ?, upload_status = ? WHERE id = ?",
        [resumePath ?? "", uploadStatus, row.id],
      )
    } catch {
      await db.runAsync("UPDATE applications SET sync_status = 'failed' WHERE id = ?", [row.id])
    }
  }
}

async function uploadResume(applicationId: string, resumeUri: string): Promise<string | null> {
  try {
    const response = await fetch(resumeUri)
    const blob = await response.blob()
    const path = `${applicationId}/${Date.now()}-resume`

    const { error } = await supabase.storage.from(RESUME_BUCKET).upload(path, blob, { upsert: true })
    if (error) throw error

    return path
  } catch {
    return null
  }
}
