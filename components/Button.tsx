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

  const opacity = disabled || loading ? 1 : 0.7;

  return (
    <TouchableOpacity
      onPress={loading ? undefined : onPress}
      onLongPress={loading ? undefined : onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity || opacity}
      style={[disabled ? styles.disabled : styles.button, style]}
    >
      {iconLeft}
      {loading && (
        <ActivityIndicator
          color={Colors.light100}
          size="large"
          style={styles.loading}
        />
      )}
      {title && <Text style={[styles.text, textStyle]}>{title}</Text>}
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...defaultStyles.primaryButton,
    flexDirection: "row",
  },
  text: {
    ...defaultStyles.textTitle3,
    color: Colors.light100,
  },
  disabled: {
    ...defaultStyles.primaryButton,
    backgroundColor: Colors.dark25,
  },
  loading: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: 56,
    borderRadius: 16,
    zIndex: 1,
  },
});

export default Button;
