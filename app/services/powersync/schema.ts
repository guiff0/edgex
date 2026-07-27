import { column, Schema, Table } from "@powersync/common"

// Mirrors sql/edgex_schema.sql — keep the two in sync when you change columns.
const jobs = new Table({
  title: column.text,
  department: column.text,
  location: column.text,
  employment_type: column.text,
  summary: column.text,
  description: column.text,
  requirements: column.text, // JSON-encoded string array
  posted_at: column.text,
  active: column.integer, // 0 / 1
})

const applications = new Table({
  job_id: column.text,
  full_name: column.text,
  email: column.text,
  phone: column.text,
  cover_note: column.text,
  resume_path: column.text, // storage path within the `resumes` bucket, once uploaded
  upload_status: column.text, // "pending" | "uploaded" | "failed"
  created_at: column.text,
})

export const AppSchema = new Schema({ jobs, applications })

export type Database = (typeof AppSchema)["types"]
export type JobRecord = Database["jobs"]
export type ApplicationRecord = Database["applications"]
