CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    avatar TEXT NOT NULL,
    username TEXT NOT NULL,
    action TEXT NOT NULL,
    subject TEXT NOT NULL,
    duration REAL NOT NULL,
    date TEXT NOT NULL
)