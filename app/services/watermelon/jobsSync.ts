import { Q } from "@nozbe/watermelondb"

import { SEED_JOBS, type Job, type JobField, type JobLocation, type JobRole } from "@/content/edgexJobs"
import { isSupabaseConfigured, supabase } from "@/services/supabase/client"

import { database } from "./database"
import { JobModel } from "./models/Job"

const jobsCollection = database.get<JobModel>("jobs")

type SupabaseJobRow = {
  id: string
  title: string
  department: string
  location: string
  location_category: string
  employment_type: string
  role: string
  field: string
  summary: string | null
  description: string | null
  requirements: string[] | null
  posted_at: string | null
  active: boolean
  job_identification: string | null
  full_address: string | null
  base_pay_salary: string | null
  responsibilities: string[] | null
  preferred_qualifications: string[] | null
}

/** Pulls active jobs from Supabase and upserts them into the local WatermelonDB collection. Safe to call when offline or unconfigured — it just does nothing. */
export async function pullJobs(): Promise<void> {
  if (!isSupabaseConfigured) return

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("active", true)
    .order("posted_at", { ascending: false })

  if (error || !data) return

  await database.write(async () => {
    const remoteIds = data.map((row) => row.id)
    const existing = await jobsCollection.query(Q.where("remote_id", Q.oneOf(remoteIds))).fetch()
    const existingByRemoteId = new Map(existing.map((job) => [job.remoteId, job]))

    const operations = (data as SupabaseJobRow[]).map((row) => {
      const found = existingByRemoteId.get(row.id)
      if (found) {
        return found.prepareUpdate((job) => applyRow(job, row))
      }
      return jobsCollection.prepareCreate((job) => applyRow(job, row))
    })

    await database.batch(...operations)
  })
}

function applyRow(job: JobModel, row: SupabaseJobRow) {
  job.remoteId = row.id
  job.title = row.title
  job.department = row.department
  job.location = row.location
  job.locationCategory = row.location_category
  job.employmentType = row.employment_type
  job.role = row.role
  job.jobField = row.field
  job.summary = row.summary ?? ""
  job.description = row.description ?? ""
  job.requirementsJson = JSON.stringify(row.requirements ?? [])
  job.postedAt = row.posted_at ?? ""
  job.active = !!row.active
  job.jobIdentification = row.job_identification ?? ""
  job.fullAddress = row.full_address ?? ""
  job.basePaySalary = row.base_pay_salary ?? ""
  job.responsibilitiesJson = JSON.stringify(row.responsibilities ?? [])
  job.preferredQualificationsJson = JSON.stringify(row.preferred_qualifications ?? [])
}

/** Reads jobs from WatermelonDB; falls back to bundled seed data if the collection is empty (first run, offline, or Supabase not configured yet). */
export async function getJobs(): Promise<Job[]> {
  try {
    const rows = await jobsCollection.query(Q.where("active", true), Q.sortBy("posted_at", Q.desc)).fetch()
    if (rows.length === 0) return SEED_JOBS
    return rows.map(mapModel)
  } catch {
    return SEED_JOBS
  }
}

export async function getJob(jobId: string): Promise<Job | undefined> {
  const jobs = await getJobs()
  return jobs.find((j) => j.id === jobId)
}

function mapModel(model: JobModel): Job {
  return {
    id: model.remoteId,
    title: model.title,
    department: model.department,
    location: model.location,
    locationCategory: model.locationCategory as JobLocation,
    employment_type: model.employmentType,
    role: model.role as JobRole,
    field: model.jobField as JobField,
    summary: model.summary,
    description: model.description,
    requirements: safeParseRequirements(model.requirementsJson),
    posted_at: model.postedAt,
    active: model.active,
    jobIdentification: model.jobIdentification || undefined,
    fullAddress: model.fullAddress || undefined,
    basePaySalary: model.basePaySalary || undefined,
    responsibilities: model.responsibilitiesJson ? safeParseRequirements(model.responsibilitiesJson) : undefined,
    preferredQualifications: model.preferredQualificationsJson
      ? safeParseRequirements(model.preferredQualificationsJson)
      : undefined,
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
