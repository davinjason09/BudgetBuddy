import { Asset } from "expo-asset";
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
        created_at  TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')), 
        updated_at  TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime'))
      );

      CREATE TABLE IF NOT EXISTS user_profile (
        id          INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id     INTEGER    NOT NULL,
        name        TEXT       NOT NULL,
        avatar      TEXT       NOT NULL,
        updated_at  TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')),

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id           INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER    NOT NULL,
        amount       REAL       NOT NULL,
        date         TIMESTAMP  NOT NULL,
        type         TEXT       NOT NULL,
        category     TEXT       NOT NULL,
        wallet_id    INTEGER    NOT NULL,
        description  TEXT       NOT NULL,
        attachment   TEXT       NOT NULL,
        created_at   TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')),
        updated_at   TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')),

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS wallets (
        id           INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER    NOT NULL,
        name         TEXT       NOT NULL,
        type         TEXT       NOT NULL,
        balance      REAL       NOT NULL,
        created_at   TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')),
        updated_at   TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')),

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS budgets (
        id           INTEGER    NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER    NOT NULL,
        amount       REAL       NOT NULL,
        category     TEXT       NOT NULL,
        month        INTEGER    NOT NULL,
        year         INTEGER    NOT NULL,
        alert        INTEGER    NOT NULL,
        percentage   INTEGER    NOT NULL,
        created_at   TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')), 
        updated_at   TIMESTAMP  NOT NULL  DEFAULT (datetime('now', 'localtime')), 

        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);

    console.log("Database initialized: ", initDB);
    currentDBVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

// GET Methods
export const getUserID = (db: SQLiteDatabase, email: string) => {
  return db.getFirstSync<{ user_id: number }>(
    "SELECT user_id FROM users WHERE email = ?",
    [email],
  );
};

export const getUserData = (db: SQLiteDatabase, email: string) => {
  return db.getFirstSync<{ user_id: number; email: string; password: string }>(
    "SELECT user_id, email, password FROM users WHERE email = ?",
    [email],
  );
};

export const getUserAvatar = (db: SQLiteDatabase, user_id: number) => {
  return db.getFirstSync<{ avatar: string }>(
    "SELECT avatar FROM user_profile WHERE user_id = ?",
    [user_id],
  );
};

export const getUserProfile = (db: SQLiteDatabase, user_id: number) => {
  return db.getFirstSync<{ name: string; avatar: string }>(
    "SELECT name FROM user_profile WHERE user_id = ?",
    [user_id],
  );
};

export const getAllProfiles = (db: SQLiteDatabase) => {
  return db.getAllSync<{ user_id: number; name: string; avatar: string }>(
    "SELECT user_id, name, avatar FROM user_profile",
};

export const getAllTransactions = (db: SQLiteDatabase, user_id: number) => {
  return db.getAllSync<{
    id: number;
    amount: number;
    date: string;
    type: string;
    category: string;
    wallet: string;
    description: string;
  }>("SELECT * FROM transactions WHERE user_id = ?", [user_id]);
};

export const getTransactionByID = (
  db: SQLiteDatabase,
  transaction_id: number,
) => {
  return db.getFirstSync<{
    id: number;
    amount: number;
    date: string;
    type: string;
    category: string;
    wallet_id: number;
    description: string;
    attachment: string;
    created_at: string;
  }>("SELECT * FROM transactions WHERE id = ?", [transaction_id]);
};

export const getTransactionsByMonth = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
) => {
  return db.getAllSync<{
    id: number;
    amount: number;
    date: string;
    type: string;
    category: string;
    wallet_id: number;
    description: string;
    created_at: string;
  }>(
    "SELECT id, amount, date, type, category, wallet_id, description, created_at FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? ORDER BY date DESC",
    [user_id, month.toString().padStart(2, "0"), year.toString()],
  );
};

export const getRecentTransactions = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
  limit: number,
) => {
  return db.getAllSync<{
    id: number;
    amount: number;
    date: string;
    type: string;
    category: string;
    wallet_id: number;
    description: string;
    created_at: string;
  }>(
    "SELECT id, amount, date, type, category, wallet_id, description, created_at FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? ORDER BY date DESC LIMIT ?",
    [user_id, month.toString().padStart(2, "0"), year.toString(), limit],
  );
};

export const getTransactionsByWallet = (
  db: SQLiteDatabase,
  user_id: number,
  wallet_id: number,
) => {
  return db.getAllSync<{
    id: number;
    amount: number;
    date: string;
    type: string;
    category: string;
    wallet_id: number;
    description: string;
  }>("SELECT * FROM transactions WHERE user_id = ? AND wallet_id = ?", [
    user_id,
    wallet_id,
  ]);
};

export const getMonthlyTransactionsByType = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
  type: string,
) => {
  return db.getAllSync<{
    id: number;
    amount: number;
    date: string;
    type: string;
    category: string;
    wallet_id: number;
    description: string;
    created_at: string;
  }>(
    "SELECT id, amount, date, type, category, wallet_id, description, created_at FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? AND type = ? ORDER BY date DESC",
    [user_id, month.toString().padStart(2, "0"), year.toString(), type],
  );
};

export const getMonthlyTransactionSumByType = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
  type: string,
) => {
  return db.getFirstSync<{ amount: number }>(
    "SELECT SUM(amount) as amount FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? AND type = ?",
    [user_id, month.toString().padStart(2, "0"), year.toString(), type],
  );
};

export const getMonthlyTransactionSumByCategory = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
  type: string,
) => {
  return db.getAllSync<{
    amount: number;
    category: string;
    type: string;
  }>(
    "SELECT type, category, SUM(amount) as amount FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? AND type = ? GROUP BY category",
    [user_id, month.toString().padStart(2, "0"), year.toString(), type],
  );
};

export const getDailyTransactionSumByType = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
  type: string,
) => {
  return db.getAllSync<{
    amount: number;
    date: string;
  }>(
    "SELECT date, SUM(amount) as amount FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? AND type = ? GROUP BY strftime('%d', date)",
    [user_id, month.toString().padStart(2, "0"), year.toString(), type],
  );
};

export const getAllWallets = (db: SQLiteDatabase, user_id: number) => {
  return db.getAllSync<{
    id: number;
    name: string;
    type: string;
    balance: number;
  }>("SELECT id, name, type, balance FROM wallets WHERE user_id = ?", [
    user_id,
  ]);
};

export const getWalletName = (db: SQLiteDatabase, wallet_id: number) => {
  return db.getFirstSync<{ name: string }>(
    "SELECT name FROM wallets WHERE id = ?",
    [wallet_id],
  );
};

export const getWalletByName = (
  db: SQLiteDatabase,
  user_id: number,
  name: string,
) => {
  return db.getFirstSync<{
    id: number;
    name: string;
    type: string;
    balance: number;
  }>(
    "SELECT id, name, type, balance FROM wallets WHERE user_id = ? AND name = ?",
    [user_id, name],
  );
};

export const getCurrentBalance = (db: SQLiteDatabase, user_id: number) => {
  return db.getFirstSync<{ balance: number }>(
    "SELECT SUM(balance) as balance FROM wallets WHERE user_id = ?",
    [user_id],
  );
};

export const getMonthlyAmountByCategory = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
  category: string,
  type: string,
) => {
  return db.getFirstSync<{ amount: number }>(
    "SELECT SUM(amount) as amount FROM transactions WHERE user_id = ? AND strftime('%m', date) = ? AND strftime('%Y', date) = ? AND category = ? AND type = ?",
    [
      user_id,
      month.toString().padStart(2, "0"),
      year.toString(),
      category,
      type,
    ],
  );
};

export const getBudgets = (
  db: SQLiteDatabase,
  user_id: number,
  month: number,
  year: number,
) => {
  return db.getAllSync<{
    id: number;
    amount: number;
    month: number;
    year: number;
    category: string;
    alert: number;
    percentage: number;
  }>("SELECT * FROM budgets WHERE user_id = ? AND month = ? AND year = ?", [
    user_id,
    month,
    year,
  ]);
};

export const getBudgetByID = (
  db: SQLiteDatabase,
  user_id: number,
  id: number,
) => {
  return db.getFirstSync<{
    id: number;
    amount: number;
    month: number;
    year: number;
    category: string;
    alert: number;
    percentage: number;
  }>("SELECT * FROM budgets WHERE user_id = ? AND id = ?", [user_id, id]);
};

// CREATE Methods
export const createUser = (
  db: SQLiteDatabase,
  email: string,
  password: string,
) => {
  return db.runSync("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    password,
  ]);
};

export const createProfile = async (
  db: SQLiteDatabase,
  user_id: number,
  name: string,
) => {
  const defaultAvatar = require("@/assets/images/Default_Avatar.png");
  const fileUri = (await Asset.fromModule(defaultAvatar).downloadAsync())
    .localUri;
  const base64 = await FileSystem.readAsStringAsync(fileUri!, {
    encoding: "base64",
  });

  return db.runSync(
    "INSERT INTO user_profile (user_id, name, avatar) VALUES (?, ?, ?)",
    [user_id, name, base64],
  );
};

// ADD Methods
export const addTransaction = async (
  db: SQLiteDatabase,
  user_id: number,
  amount: number,
  date: string,
  type: string,
  category: string,
  description: string,
  wallet_id: number,
  attachment: string,
) => {
  return db.runAsync(
    "INSERT INTO transactions (user_id, amount, date, type, category, wallet_id, description, attachment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, amount, date, type, category, wallet_id, description, attachment],
  );
};

export const addWallet = async (
  db: SQLiteDatabase,
  user_id: number,
  name: string,
  type: string,
  balance: number,
) => {
  return db.runAsync(
    "INSERT INTO wallets (user_id, name, type, balance) VALUES (?, ?, ?, ?)",
    [user_id, name, type, balance],
  );
};

export const addBudget = async (
  db: SQLiteDatabase,
  user_id: number,
  amount: number,
  category: string,
  month: number,
  year: number,
  alert: number,
  percentage: number,
) => {
  return db.runAsync(
    "INSERT INTO budgets (user_id, amount, category, month, year, alert, percentage) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [user_id, amount, category, month, year, alert, percentage],
  );
};

// UPDATE Methods
export const updateWalletBalance = async (
  db: SQLiteDatabase,
  user_id: number,
  wallet_id: number,
  amount: number,
) => {
  return db.runAsync(
    "UPDATE wallets SET balance = balance + ? WHERE user_id = ? AND id = ?",
    [amount, user_id, wallet_id],
  );
};

export const updateWallet = async (
  db: SQLiteDatabase,
  user_id: number,
  new_name: string,
  old_name: string,
  balance: number,
) => {
  return db.runAsync(
    "UPDATE wallets SET name = ?, balance = ? WHERE user_id = ? AND name = ?",
    [new_name, balance, user_id, old_name],
  );
};

export const updateBudget = async (
  db: SQLiteDatabase,
  user_id: number,
  id: number,
  amount: number,
  category: string,
  alert: number,
  percentage: number,
) => {
  return db.runAsync(
    "UPDATE budgets SET amount = ?, category = ?, alert = ?, percentage = ? WHERE user_id = ? AND id = ?",
    [amount, category, alert, percentage, user_id, id],
  );
};

export const updateTransaction = async (
  db: SQLiteDatabase,
  id: number,
  amount: number,
  date: string,
  type: string,
  category: string,
  description: string,
  attachment: string,
) => {
  return db.runAsync(
    "UPDATE transactions SET amount = ?, date = ?, type = ?, category = ?, description = ?, attachment = ? WHERE id = ?",
    [amount, date, type, category, description, attachment, id],
  );
};

