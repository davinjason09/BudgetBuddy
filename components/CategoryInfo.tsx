import { Colors } from "@/constants/Colors";
import { categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { useEffect } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CategoryInfo = {
  amount: number;
  category: string;
  type: string;
};

type CategoryInfoProps = {
  data: CategoryInfo;
  sum: number;
};

const CategoryInfo = (props: CategoryInfoProps) => {
  const { amount, category, type } = props.data;
  const { label, color } = categories.find((b) => b.value === category)!;
  const { width } = useWindowDimensions();
  const animation = useSharedValue<number>(0);

  const absoluteAmount = Math.abs(amount);
  const amountColor = type === "expense" ? Colors.red100 : Colors.green100;
  const amountText =
    type === "expense" ? `-$${absoluteAmount}` : `+$${absoluteAmount}`;

  const percentage = (absoluteAmount / props.sum) * 100;
  const progressWidth = (width * 0.91 * percentage) / 100;

  useEffect(() => {
    animation.value = withTiming(1, { duration: 500 });
  }, [percentage]);

  const progress = useAnimatedStyle(() => ({
    width: interpolate(animation.value, [0, 1], [0, progressWidth]),
    backgroundColor: color,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.category}>{label}</Text>
        </View>
        <Text style={[defaultStyles.textTitle3, { color: amountColor }]}>
          {amountText}
        </Text>
      </View>

      <View style={styles.progress}>
        <Animated.View
          style={[styles.progress, progress, { position: "absolute" }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "91%",
    justifyContent: "center",
    gap: 8,
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
  progress: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light60,
    borderWidth: 0.5,
    borderColor: Colors.light40,
    justifyContent: "center",
  },
});

export default CategoryInfo;
