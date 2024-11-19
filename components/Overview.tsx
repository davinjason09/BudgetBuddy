import { Colors } from "@/constants/Colors";
import { Expense, Income } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { OverviewProps } from "@/constants/Types";
import { View, Text, StyleSheet } from "react-native";

const Overview = (props: OverviewProps) => {
  const { type, amount, overviewStyle } = props;
  const colors = type === "income" ? Colors.green100 : Colors.red100;
  const icon =
    type === "income" ? (
      <Income colors={colors} size={24} />
    ) : (
      <Expense colors={colors} size={24} />
    );

  return (
    <View style={[styles.overview, overviewStyle, { backgroundColor: colors }]}>
      <View style={styles.row}>
        <View style={styles.info}>{icon}</View>
        <View>
          <Text style={styles.label}>
            {type === "income" ? "Income" : "Expense"}
          </Text>
          <Text style={styles.amount}>${amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
  },
  overview: {
    justifyContent: "center",
    width: "42%",
    height: 80,
    borderRadius: 28,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light80,
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  label: {
    ...defaultStyles.textRegular1,
    color: Colors.light80,
  },
  amount: {
    ...defaultStyles.textRegular2,
    color: Colors.light80,
    fontSize: 22,
  },
});

export default Overview;
