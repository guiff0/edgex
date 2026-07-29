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
  ],
})
