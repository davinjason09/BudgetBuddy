import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { ButtonProps } from "@/constants/Types";

const Button = (props: ButtonProps) => {
  const {
    onPress,
    onLongPress,
    title,
    iconLeft,
    iconRight,
    style,
    textStyle,
    disabled,
    activeOpacity,
    loading,
  } = props;
  return (
    <TouchableOpacity
      onPress={loading ? undefined : onPress}
      onLongPress={loading ? undefined : onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity || 0.8}
      style={[disabled ? styles.disabled : styles.button, style]}
    >
      {iconLeft}
      {loading ? (
        <ActivityIndicator color={Colors.light100} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...defaultStyles.button,
  },
  text: {
    ...defaultStyles.textTitle3,
    color: Colors.light100,
  },
  disabled: {
    ...defaultStyles.button,
    backgroundColor: Colors.dark25,
  },
});

export default Button;
