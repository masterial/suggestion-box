import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./suggestions.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS suggestions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      suggestionId INTEGER NOT NULL,
      author TEXT NOT NULL,
      text TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (suggestionId) REFERENCES suggestions(id)
    );
  `);

  return db;
}