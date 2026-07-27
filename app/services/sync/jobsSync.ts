import { SEED_JOBS, type Job } from "@/content/edgexJobs"
import { isSupabaseConfigured, supabase } from "@/services/supabase/client"

import { getDb } from "./db"

type JobRow = {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  summary: string
  description: string
  requirements: string // JSON-encoded string array
  posted_at: string
  active: number
}

/** Pulls active jobs from Supabase and refreshes the local cache. Safe to call when offline or unconfigured — it just does nothing. */
export async function pullJobs(): Promise<void> {
  if (!isSupabaseConfigured) return

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("active", true)
    .order("posted_at", { ascending: false })

  if (error || !data) return

  const db = await getDb()
  await db.withTransactionAsync(async () => {
    for (const row of data) {
      await db.runAsync(
        `INSERT OR REPLACE INTO jobs
          (id, title, department, location, employment_type, summary, description, requirements, posted_at, active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.id,
          row.title,
          row.department,
          row.location,
          row.employment_type,
          row.summary ?? "",
          row.description ?? "",
          JSON.stringify(row.requirements ?? []),
          row.posted_at ?? "",
          row.active ? 1 : 0,
        ],
      )
    }
  })
}

/** Reads jobs from the local cache; falls back to bundled seed data if the cache is empty (first run, offline, or Supabase not configured yet). */
export async function getJobs(): Promise<Job[]> {
  try {
    const db = await getDb()
    const rows = await db.getAllAsync<JobRow>("SELECT * FROM jobs WHERE active = 1 ORDER BY posted_at DESC")
    if (rows.length === 0) return SEED_JOBS
    return rows.map(mapRow)
  } catch {
    return SEED_JOBS
  }
}

export async function getJob(jobId: string): Promise<Job | undefined> {
  const jobs = await getJobs()
  return jobs.find((j) => j.id === jobId)
}

function mapRow(row: JobRow): Job {
  return {
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
  }
}

function safeParseRequirements(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
