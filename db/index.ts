import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";

// Ensure database file exists in project root
const dbPath = path.resolve(process.cwd(), "sqlite.db");
const sqlite = new Database(dbPath);

// Create table automatically if it doesn't exist yet
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL,
    link TEXT,
    repo TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export const db = drizzle(sqlite, { schema });
