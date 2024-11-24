import * as FileSystem from "expo-file-system";
import { SQLiteDatabase } from "expo-sqlite";

export const migrateDBIfNeeded = async (db: SQLiteDatabase) => {
  console.log(FileSystem.documentDirectory);

  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  let currentDBVersion = result?.user_version ?? 0;

  console.log("Current DB Version: ", currentDBVersion);

  if (currentDBVersion >= DATABASE_VERSION) {
    console.log("Database is up to date");

    return;
  }

  if (currentDBVersion === 0) {
    const initDB = await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS users (
        user_id     INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        email       TEXT       NOT NULL,
        password    TEXT       NOT NULL,
        created_at  TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_profile (
        id          INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id     INTEGER    NOT NULL,
        name        TEXT       NOT NULL,
        avatar      TEXT       NOT NULL,
        updated_at  TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id           INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER    NOT NULL,
        amount       REAL       NOT NULL,
        date         TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
        type         TEXT       NOT NULL,
        category     TEXT       NOT NULL,
        description  TEXT,
        attachment   TEXT,

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS wallets (
        id           INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER    NOT NULL,
        name         TEXT       NOT NULL,
        type         TEXT       NOT NULL,
        balance      REAL       NOT NULL,
        created_at   TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
        updated_at   TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS budgets (
        id           INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER    NOT NULL,
        amount       REAL       NOT NULL,
        category     TEXT       NOT NULL,
        month        INTEGER    NOT NULL,
        created_at   TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
        updated_at   TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);

    console.log("Database initialized: ", initDB);
    currentDBVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
