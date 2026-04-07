import { db } from "./db-utils.mjs";

export function getSessions() {
  return db
    .prepare(
      "SELECT id, avatar, username, action, subject, duration, date FROM sessions",
    )
    .all();
}

export function addSession(session) {
  db.prepare(
    "INSERT INTO sessions (avatar, username, action, subject, duration, date) VALUES (@avatar, @username, @action, @subject, @duration, @date)",
  ).run(session);
}
