import { appSchema, tableSchema } from "@nozbe/watermelondb"

// Mirrors sql/edgex_schema.sql on the Supabase side — keep both in sync
// when you change columns.
export const edgexSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "jobs",
      columns: [
        { name: "remote_id", type: "string", isIndexed: true }, // Supabase jobs.id
        { name: "title", type: "string" },
        { name: "department", type: "string" },
        { name: "location", type: "string" },
        { name: "employment_type", type: "string" },
        { name: "summary", type: "string" },
        { name: "description", type: "string" },
        { name: "requirements", type: "string" }, // JSON-encoded string array
        { name: "posted_at", type: "string" },
        { name: "active", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "applications",
      columns: [
        { name: "job_id", type: "string", isIndexed: true },
        { name: "full_name", type: "string" },
        { name: "email", type: "string" },
        { name: "phone", type: "string", isOptional: true },
        { name: "cover_note", type: "string", isOptional: true },
        { name: "resume_uri", type: "string", isOptional: true },
        { name: "resume_path", type: "string", isOptional: true },
        { name: "upload_status", type: "string" },
        { name: "sync_status", type: "string", isIndexed: true }, // "pending" | "synced" | "failed"
        { name: "created_at", type: "string" },
      ],
    }),
  ],
})
