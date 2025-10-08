import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("database.sqlite");
const db = new Database(dbPath);

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    name TEXT,
    mimeType TEXT,
    webViewLink TEXT,
    uploadedAt TEXT
  )
`).run();

export default db;
