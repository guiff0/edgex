import { SEED_JOBS, type Job } from "@/content/edgexJobs"
import { isSupabaseConfigured, RESUME_BUCKET, supabase } from "@/services/supabase/client"

import { powersync } from "./system"

function generateId(): string {
  // Lightweight RFC4122-ish v4 UUID — avoids pulling in expo-crypto as an
  // extra dependency just for this.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Returns synced jobs if any exist locally, otherwise the bundled seed list.
 * This means Careers works immediately (offline, before Supabase/PowerSync are
 * configured) and transparently switches to live data once jobs have synced.
 */
export async function getJobs(): Promise<Job[]> {
  try {
    const rows = await powersync.getAll<{
      id: string
      title: string
      department: string
      location: string
      employment_type: string
      summary: string
      description: string
      requirements: string
      posted_at: string
      active: number
    }>("SELECT * FROM jobs WHERE active = 1 ORDER BY posted_at DESC")

    if (rows.length === 0) return SEED_JOBS

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      department: row.department,
      location: row.location,
      employment_type: row.employment_type,
      summary: row.summary,
      description: row.description,
      requirements: safeParseRequirements(row.requirements),
      posted_at: row.posted_at,
      active: !!row.active,
    }))
  } catch {
    return SEED_JOBS
  }
}

export async function getJob(jobId: string): Promise<Job | undefined> {
  const jobs = await getJobs()
  return jobs.find((j) => j.id === jobId)
}

function safeParseRequirements(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

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
 * Submits an application:
 *  1. Writes the application row to local SQLite immediately (via PowerSync),
 *     so the applicant sees success instantly, even offline.
 *  2. Attempts to upload the resume to Supabase Storage right away; if that
 *     fails (offline, Supabase not configured yet), the row is left marked
 *     "pending" and `retryResumeUpload` can be called again later.
 */
export async function submitApplication(input: ApplicationInput): Promise<{ id: string }> {
  const id = generateId()
  const createdAt = new Date().toISOString()

  await powersync.execute(
    `INSERT INTO applications
      (id, job_id, full_name, email, phone, cover_note, resume_path, upload_status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, input.jobId, input.fullName, input.email, input.phone, input.coverNote, "", "pending", createdAt],
  )

  if (input.resumeUri) {
    await tryUploadResume(id, input.resumeUri, input.resumeFileName ?? "resume")
  }

  return { id }
}

export async function retryResumeUpload(
  applicationId: string,
  resumeUri: string,
  resumeFileName: string,
): Promise<boolean> {
  return tryUploadResume(applicationId, resumeUri, resumeFileName)
}

async function tryUploadResume(
  applicationId: string,
  resumeUri: string,
  resumeFileName: string,
): Promise<boolean> {
  if (!isSupabaseConfigured) return false

  try {
    const response = await fetch(resumeUri)
    const blob = await response.blob()
    const path = `${applicationId}/${Date.now()}-${resumeFileName}`

    const { error } = await supabase.storage.from(RESUME_BUCKET).upload(path, blob, {
      upsert: true,
    })
    if (error) throw error

    await powersync.execute(`UPDATE applications SET resume_path = ?, upload_status = ? WHERE id = ?`, [
      path,
      "uploaded",
      applicationId,
    ])
    return true
  } catch {
    await powersync.execute(`UPDATE applications SET upload_status = ? WHERE id = ?`, [
      "failed",
      applicationId,
    ])
    return false
  }
}
