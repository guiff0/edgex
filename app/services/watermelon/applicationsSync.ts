import { Q } from "@nozbe/watermelondb"

import { isSupabaseConfigured, RESUME_BUCKET, supabase } from "@/services/supabase/client"

import { database } from "./database"
import { ApplicationModel } from "./models/Application"

const applicationsCollection = database.get<ApplicationModel>("applications")

export interface ApplicationInput {
  jobId: string
  fullName: string
  email: string
  phone: string
  coverNote: string
  resumeUri: string | null
  resumeFileName: string | null
}

/**
 * Writes the application to WatermelonDB immediately (works fully offline),
 * then makes a best-effort attempt to push it to Supabase right away. If
 * that fails — no connectivity, Supabase not configured — the record stays
 * `sync_status = 'pending'` and `pushPendingApplications()` (run by the sync
 * engine on an interval and on app foreground) retries it later.
 */
export async function submitApplication(input: ApplicationInput): Promise<{ id: string }> {
  let recordId = ""

  await database.write(async () => {
    const record = await applicationsCollection.create((application) => {
      application.jobId = input.jobId
      application.fullName = input.fullName
      application.email = input.email
      application.phone = input.phone
      application.coverNote = input.coverNote
      application.resumeUri = input.resumeUri ?? ""
      application.resumePath = ""
      application.uploadStatus = "pending"
      application.syncStatus = "pending"
      application.createdAt = new Date().toISOString()
    })
    recordId = record.id
  })

  // Fire-and-forget — the caller shouldn't wait on network for a successful
  // local save, and this is retried by the background sync loop regardless.
  pushPendingApplications().catch(() => {})

  return { id: recordId }
}

/** Pushes every not-yet-synced application (and its resume, if any) up to Supabase. Safe to call repeatedly — already-synced records are skipped. */
export async function pushPendingApplications(): Promise<void> {
  if (!isSupabaseConfigured) return

  const pending = await applicationsCollection.query(Q.where("sync_status", Q.notEq("synced"))).fetch()

  for (const record of pending) {
    try {
      let resumePath = record.resumePath || null
      if (!resumePath && record.resumeUri) {
        resumePath = await uploadResume(record.id, record.resumeUri)
      }
      const uploadStatus = resumePath ? "uploaded" : record.resumeUri ? "failed" : "uploaded"

      const { error } = await supabase.from("applications").upsert({
        id: record.id,
        job_id: record.jobId,
        full_name: record.fullName,
        email: record.email,
        phone: record.phone,
        cover_note: record.coverNote,
        resume_path: resumePath,
        upload_status: uploadStatus,
        created_at: record.createdAt,
      })
      if (error) throw error

      await database.write(async () => {
        await record.update((application) => {
          application.syncStatus = "synced"
          application.resumePath = resumePath ?? ""
          application.uploadStatus = uploadStatus
        })
      })
    } catch {
      await database.write(async () => {
        await record.update((application) => {
          application.syncStatus = "failed"
        })
      })
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
