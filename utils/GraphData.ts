import { useSQLiteContext } from "expo-sqlite";
import {
  getDailyTransactionSumByType,
  getMonthlyTransactionSumByCategory,
} from "./Database";
import { Storage } from "expo-sqlite/kv-store";
import { daysInAMonth } from "./DateFormat";
import { categories } from "@/constants/Options";

type GetDataProps = {
  monthID: number;
  year: number;
  type: string;
  id: number;
};

export const getGraphData = (
  props: GetDataProps,
): { value: number; color?: string; category?: string }[] => {
  const db = useSQLiteContext();
  const userID = JSON.parse(Storage.getItemSync("user")!).user_id;

  let data;
  if (props.id === 0) {
    data = getDailyTransactionSumByType(
      db,
      userID,
      props.monthID + 1,
      props.year,
      props.type,
    );
  } else {
    data = getMonthlyTransactionSumByCategory(
      db,
      userID,
      props.monthID + 1,
      props.year,
      props.type,
    );
  }

  if (props.id === 0) {
    let monthLength = daysInAMonth(props.monthID, props.year);
    if (
      props.year === new Date().getFullYear() &&
      props.monthID === new Date().getMonth()
    )
      monthLength = new Date().getDate();

    return Array.from({ length: monthLength }, (_, i) => {
      const day = i + 1;
      const found = data.find((t: any) => new Date(t.date).getDate() === day);
      return {
        value: found ? Math.abs(found.amount) : 0,
      };
    });
  } else {
    return data.map((t: any) => {
      const categoryColors = categories.find(
        (c) => c.value === t.category,
      )?.color;
      return {
        value: Math.abs(t.amount),
        color: categoryColors,
      };
    });
  }
};
