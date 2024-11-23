import { Colors } from "./Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Income, Expense, Transfer } from "./Icons";
import { useRouter } from "expo-router";

export const FloatingButtons = [
  () => {
    const router = useRouter();
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: Colors.green100 }]}
        onPress={() => {
          router.push({
            pathname: "/(actions)/[type]",
            params: { type: "income" },
          });
        }}
      >
        <Income colors={Colors.light100} size={24} />
      </TouchableOpacity>
    );
  },
  () => {
    const router = useRouter();
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: Colors.blue100 }]}
        onPress={() => {
          router.push({
            pathname: "/(actions)/[type]",
            params: { type: "transfer" },
          });
        }}
      >
        <Transfer colors={Colors.light100} size={24} />
      </TouchableOpacity>
    );
  },
  () => {
    const router = useRouter();
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: Colors.red100 }]}
        onPress={() => {
          router.push({
            pathname: "/(actions)/[type]",
            params: { type: "expense" },
          });
        }}
      >
        <Expense colors={Colors.light100} size={24} />
      </TouchableOpacity>
    );
  },
];

const styles = StyleSheet.create({
  item: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
