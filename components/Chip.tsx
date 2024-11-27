import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { ChipProps } from "@/constants/Types";

const Chip = (props: ChipProps) => {
  const { variant, editable, onPress, style, textStyle } = props;
  const [selected, setSelected] = useState(false);
  const animation = useSharedValue<number>(0);

  useEffect(() => {
    animation.value = withTiming(selected ? 1 : 0, { duration: 150 });
  }, [selected]);

  useEffect(() => {
    setSelected(props.query === props.value);
  }, [props.query]);

  const selectedChipStyle = useAnimatedStyle(() => {
    const active = props.selectedStyle as ViewStyle | undefined;
    const inactive = props.style as ViewStyle | undefined;

    const activeColors = {
      bgColor: (active?.backgroundColor as string) || Colors.violet20,
      borderColor: (active?.borderColor as string) || Colors.violet20,
    };

    const inactiveColors = {
      bgColor: (inactive?.backgroundColor as string) || Colors.light100,
      borderColor: (inactive?.borderColor as string) || Colors.light20,
    };

    return {
      backgroundColor: interpolateColor(
        animation.value,
        [0, 1],
        [inactiveColors.bgColor, activeColors.bgColor],
      ),
      borderColor: interpolateColor(
        animation.value,
        [0, 1],
        [inactiveColors.borderColor, activeColors.borderColor],
      ),
    };
  });

  const textColorStyle = useAnimatedStyle(() => {
    const activeStyle = props.selectedStyle as TextStyle | undefined;
    const inactiveStyle = props.style as TextStyle | undefined;

    const activeColor = Colors.violet100 || (activeStyle?.color as string);
    const inactiveColor = Colors.dark100 || (inactiveStyle?.color as string);

    return {
      color: interpolateColor(
        animation.value,
        [0, 1],
        [inactiveColor, activeColor],
      ),
    };
  });

  const border = {
    borderWidth: variant === "outlined" ? 1 : 0,
    borderColor: variant === "outlined" ? Colors.light20 : "transparent",
  };

  return (
    <Pressable onPress={() => editable && onPress(props.value)}>
      <Animated.View
        style={[styles.container, selectedChipStyle, border, style]}
      >
        {props.icon}
        {props.text && (
          <Animated.Text style={[styles.text, textColorStyle, textStyle]}>
            {props.text}
          </Animated.Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    maxWidth: 200,
    maxHeight: 50,
    gap: 8,
  },
  text: {
    ...defaultStyles.textRegular3,
    fontSize: 14,
  },
});

export default Chip;
