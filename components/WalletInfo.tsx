import { Colors } from "@/constants/Colors";
import { banks } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { WalletInfoProps } from "@/constants/Types";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const WalletInfo = ({ data }: WalletInfoProps) => {
  const { name, balance, type } = data;

  const router = useRouter();

  const icon = banks.find((b) => b.value === type)!.icon;
  const balanceText = `${balance < 0 ? "-" : ""}$${Math.abs(balance)}`;

  const onPress = () => {
    router.push({
      pathname: "/(auth)/(details)/wallet",
      params: {
        data: JSON.stringify(data),
        balance: balanceText,
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={[styles.info, { flex: 1 }]}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={[styles.info, { alignItems: "flex-end" }]}>
        <Text style={styles.amount}>{balanceText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 16,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 16,
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
  name: {
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

export default WalletInfo;
