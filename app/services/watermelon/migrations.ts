import { addColumns, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations"

export const edgexMigrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: "jobs",
          columns: [
            { name: "role", type: "string", isIndexed: true },
            { name: "field", type: "string", isIndexed: true },
          ],
        }),
      ],
    },
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: "jobs",
          columns: [
            { name: "location_category", type: "string", isIndexed: true },
            { name: "job_identification", type: "string", isOptional: true },
            { name: "full_address", type: "string", isOptional: true },
            { name: "base_pay_salary", type: "string", isOptional: true },
            { name: "responsibilities", type: "string", isOptional: true },
            { name: "preferred_qualifications", type: "string", isOptional: true },
          ],
        }),
      ],
    },
  ],
})
