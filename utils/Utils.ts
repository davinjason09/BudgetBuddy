import { SQLiteDatabase } from "expo-sqlite";
import { getAllWallets } from "./Database";

export const getUserWallets = (db: SQLiteDatabase, userID: number) => {
  const wallets = getAllWallets(db, userID);

  return wallets.map((wallet) => ({
    label: wallet.name,
    value: wallet.id,
  }));
};

export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
};
