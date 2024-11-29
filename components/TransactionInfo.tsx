import { Colors } from "@/constants/Colors";
import { categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { TransactionInfoProps } from "@/constants/Types";
import { formatTime } from "@/utils/DateFormat";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const TransactionInfo = ({ data }: TransactionInfoProps) => {
  const { amount, created_at, type, category, description } = data;
  const { icon, background } = categories.find((c) => c.value === category)!;

  const router = useRouter();
  const label = categories.find((c) => c.value === category)!.label;
  const hasDescription = description !== "No description provided";
  const textColor = type === "income" ? Colors.green100 : Colors.red100;

  const descriptionText =
    description.length > 14
      ? `${description.substring(0, 14).trim()}..`
      : description;
  const absAmount = Math.abs(amount);
  const amountText = type === "income" ? `+$${absAmount}` : `-$${absAmount}`;
  const timeCreatedString = formatTime(new Date(created_at), "en-GB");

  const handlePress = () => {
    router.push({
      pathname: "/(auth)/(details)/action",
      params: { data: data.id },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={[styles.icon, { backgroundColor: background }]}>
        {icon!()}
      </View>
      <View style={[styles.info, { flex: 1 }]}>
        <Text style={styles.category}>{label}</Text>
        {hasDescription && (
          <Text style={styles.description}>{descriptionText}</Text>
        )}
      </View>
      <View style={[styles.info, { alignItems: "flex-end" }]}>
        <Text style={[styles.amount, { color: textColor }]}>{amountText}</Text>
        <Text style={styles.description}>{timeCreatedString}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: Colors.light60,
    height: 90,
    width: "90%",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    gap: 16,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  info: {
    alignSelf: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  category: {
    ...defaultStyles.textRegular1,
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    ...defaultStyles.textRegular3,
    fontWeight: "bold",
    fontSize: 14,
    color: "#91919F",
  },
  amount: {
    ...defaultStyles.textRegular1,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TransactionInfo;
