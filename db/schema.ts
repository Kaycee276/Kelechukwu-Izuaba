import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: text("tags").notNull(), // Stored as JSON stringified array or comma-separated string
  link: text("link"),
  repo: text("repo"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
