import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

const SliderThumb = ({ value }: { value: number }) => (
  <View style={styles.thumb}>
    <Text style={styles.thumbText}>{value}%</Text>
  </View>
);

const styles = StyleSheet.create({
  thumb: {
    width: 54,
    height: 30,
    borderRadius: 15,
    borderColor: Colors.light100,
    borderWidth: 4,
    backgroundColor: Colors.violet100,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbText: {
    ...defaultStyles.textRegular3,
    color: Colors.light100,
  },
});

export default SliderThumb;
