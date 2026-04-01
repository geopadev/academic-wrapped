import Database from "better-sqlite3";
import { readFileSync } from "fs";

export const db = new Database("database.db");
const migrations = readFileSync("migrations-sqlite/001-initial.sql", "utf-8");
db.exec(migrations);
