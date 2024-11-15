import { Colors } from "./Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Income, Outcome, Transfer } from "./Icons";

export const FloatingButtons = [
  ({ params }: { params?: any }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: Colors.green100 }]}
      onPress={() => console.log("income")}
    >
      <Income colors={Colors.light100} size={24} />
    </TouchableOpacity>
  ),
  ({ params }: { params?: any }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: Colors.blue100 }]}
      onPress={() => console.log("transfer")}
    >
      <Transfer colors={Colors.light100} size={24} />
    </TouchableOpacity>
  ),
  ({ params }: { params?: any }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: Colors.red100 }]}
      onPress={() => console.log("outcome")}
    >
      <Outcome colors={Colors.light100} size={24} />
    </TouchableOpacity>
  ),
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
