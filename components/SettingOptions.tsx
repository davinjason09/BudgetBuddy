import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { RelativePathString, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type SettingOptionsProps = {
  name: string;
  top?: boolean;
  bottom?: boolean;
  icon?: React.ReactNode;
  iconBackground?: string;
  path?: string;
  params?: any;
};

const SettingOptions = (props: SettingOptionsProps) => {
  const { name, top, bottom, icon, iconBackground, path, params } = props;
  const router = useRouter();

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

  const handlePress = () => {
    if (path) {
      router.push({
        pathname: path as RelativePathString,
        params: params || {},
      });
    }
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
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
