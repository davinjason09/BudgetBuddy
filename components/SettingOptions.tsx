import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet, ViewStyle } from "react-native";

type SettingOptionsProps = {
  name: string;
  top?: boolean;
  bottom?: boolean;
  icon?: React.ReactNode;
  iconBackground?: string;
};

const SettingOptions = (props: SettingOptionsProps) => {
  const { name, top, bottom, icon, iconBackground } = props;

  const topBorder: ViewStyle = {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light40,
  };

  const bottomBorder: ViewStyle = {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  };

  const separator: ViewStyle = {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light40,
  };

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(top && topBorder),
    ...(bottom && bottomBorder),
    ...(!top && !bottom && separator),
  };

  return (
    <TouchableOpacity style={containerStyle}>
      <View style={[styles.icon, { backgroundColor: iconBackground }]}>
        {icon}
      </View>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "85%",
    height: 90,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.light100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  text: {
    ...defaultStyles.textRegular2,
    color: Colors.dark100,
    fontSize: 18,
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingOptions;
