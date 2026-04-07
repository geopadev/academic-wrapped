import { db } from "./db-utils.mjs";
export function getUsers() {
  return db
    .prepare("SELECT id, username, email, password_hash FROM users")
    .all();
}

export function addUser(user) {
  db.prepare(
    "INSERT INTO users (username, email, password_hash) VALUES (@username, @email, @password_hash)",
  ).run(user);
}

export function getUserByUsername(username) {
  return db
    .prepare(
      "SELECT id, username, email, password_hash FROM users WHERE username = ?",
    )
    .get(username);
}
