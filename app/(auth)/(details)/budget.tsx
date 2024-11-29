import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Trash, Warning } from "@/constants/Icons";
import { categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const WalletDetails = () => {
  const { data, info } = useLocalSearchParams<{ data: string; info: string }>();
  const { width } = useWindowDimensions();

  const router = useRouter();
  const animation = useSharedValue<number>(0);

  const budgetInfo = JSON.parse(info);
  const budgetData = JSON.parse(data);
  const percentage = Math.min(
    (Math.abs(budgetInfo.usage) / budgetData.amount) * 100,
    100,
  );
  const progressWidth = width * 0.85 * (percentage / 100);
  const { label, icon, background, color } = categories.find(
    (b) => b.value === budgetData!.category,
  )!;

  console.log(percentage);

  useEffect(() => {
    animation.value = withTiming(1, { duration: 500 });
  }, [percentage]);

  const progress = useAnimatedStyle(() => ({
    width: interpolate(animation.value, [0, 1], [0, progressWidth]),
    backgroundColor: color,
  }));

  const handlePress = () => {
    router.push({
      pathname: "/(auth)/(actions)/budget",
      params: { type: "edit", data: JSON.stringify(budgetData) },
    });
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {}}
              style={defaultStyles.arrowContainer}
            >
              <Trash size={20} colors={Colors.dark100} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.budgetIcon}>
        <View style={[styles.icon, { backgroundColor: background }]}>
          {icon!(18)}
        </View>
        <Text style={defaultStyles.textTitle3}>{label}</Text>
      </View>
      <View style={styles.container}>
        <View style={{ gap: 4, marginBottom: 24 }}>
          <Text style={styles.title}>Remaining</Text>
          <Text style={styles.value}>${budgetInfo.remaining}</Text>
        </View>
        <View style={styles.progress}>
          <Animated.View
            style={[styles.progress, progress, { position: "absolute" }]}
          />
        </View>
        {budgetInfo.overBudget && (
          <View style={styles.warning}>
            <Warning size={24} colors={Colors.light100} />
            <Text style={styles.warningText}>You've exceeded the limit!</Text>
          </View>
        )}
      </View>
      <View style={styles.button}>
        <Button
          title="Edit"
          onPress={handlePress}
          disabled={false}
          loading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  budgetIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.light40,
    marginBottom: 32,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    alignSelf: "center",
    width: "85%",
    justifyContent: "center",
  },
  progress: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light60,
    borderWidth: 0.5,
    borderColor: Colors.light40,
    justifyContent: "center",
  },
  title: {
    ...defaultStyles.textTitle2,
    alignSelf: "center",
  },
  value: {
    ...defaultStyles.textTitleX,
    alignSelf: "center",
  },
  warning: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.red100,
    marginTop: 32,
    borderRadius: 24,
    padding: 8,
    gap: 8,
  },
  warningText: {
    ...defaultStyles.textRegular3,
    color: Colors.light100,
  },
  button: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    width: "100%",
  },
});

export default WalletDetails;
