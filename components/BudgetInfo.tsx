import { Colors } from "@/constants/Colors";
import { Warning } from "@/constants/Icons";
import { categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { BudgetInfoProps } from "@/constants/Types";
import { getMonthlyAmountByCategory } from "@/utils/Database";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const BudgetInfo = ({ data }: BudgetInfoProps) => {
  const { month, year, category, amount } = data;
  const { width } = useWindowDimensions();
  const { label, color } = categories.find((b) => b.value === category)!;

  console.log("data", data);

  const db = useSQLiteContext();
  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;
  const router = useRouter();
  const animation = useSharedValue<number>(0);

  const usage = getMonthlyAmountByCategory(
    db,
    userID,
    month,
    year,
    category,
    "expense",
  );
  console.log(
    db.getAllSync(
      `SELECT id, amount FROM transactions WHERE user_id = 4 AND strftime('%m', date) = '${month}' AND category = '${category}'`,
    ),
  );

  const remaining =
    amount - Math.abs(usage!.amount) > 0 ? amount - Math.abs(usage!.amount) : 0;
  const percentage = (Math.abs(usage!.amount) / amount) * 100;
  const overBudget = Math.abs(usage!.amount) > amount;

  let progressWidth = (width * 0.85 * percentage) / 100 - 32;
  if (progressWidth < 12) progressWidth = 12;
  if (progressWidth > width * 0.85 - 32) progressWidth = width * 0.85 - 32;

  console.log("progressWidth", progressWidth);

  useEffect(() => {
    animation.value = withTiming(1, { duration: 500 });
  }, [percentage]);

  const progress = useAnimatedStyle(() => ({
    width: interpolate(animation.value, [0, 1], [0, progressWidth]),
    backgroundColor: color,
  }));

  const onPress = () => {
    router.push({
      pathname: "/(auth)/(details)/budget",
      params: {
        data: JSON.stringify(data),
        info: JSON.stringify({
          remaining: remaining,
          usage: usage!.amount,
          overBudget: overBudget,
        }),
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View style={styles.icon}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.category}>{label}</Text>
        </View>
        {overBudget && <Warning size={24} colors={Colors.red100} />}
      </View>
      <View>
        <Text style={styles.remaining}>Remaining ${remaining}</Text>
        <View style={styles.progress}>
          <Animated.View
            style={[styles.progress, progress, { position: "absolute" }]}
          />
        </View>
      </View>
      <Text style={styles.usage}>
        ${Math.abs(usage!.amount)} of ${amount}
      </Text>
      {overBudget && (
        <Text style={styles.warning}>You've exceeded the limit!</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "85%",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.light100,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  category: {
    ...defaultStyles.textRegular1,
    fontWeight: "bold",
    fontSize: 14,
  },
  icon: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.light40,
    backgroundColor: Colors.light60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  info: {
    alignSelf: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  remaining: {
    ...defaultStyles.textTitle2,
    fontWeight: "bold",
    marginBottom: 4,
  },
  usage: {
    ...defaultStyles.textRegular1,
    color: "#91919F",
  },
  progress: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light60,
    borderWidth: 0.5,
    borderColor: Colors.light40,
    justifyContent: "center",
  },
  warning: {
    ...defaultStyles.textRegular3,
    color: Colors.red100,
  },
});

export default BudgetInfo;
