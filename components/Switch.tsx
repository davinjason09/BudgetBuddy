import { Colors } from "@/constants/Colors";
import { SwitchProps } from "@/constants/Types";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Switch = (props: SwitchProps) => {
  const { value, setValue, activeColor, inactiveColor } = props;
  const animation = useSharedValue<number>(0);

  useEffect(() => {
    animation.value = withTiming(value ? 1 : 0, { duration: 250 });
  }, [value]);

  const translateX = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(animation.value, [0, 1], [0, 18]) }],
  }));

  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      [inactiveColor || Colors.violet20, activeColor || Colors.violet100],
    ),
  }));

  const toggleSwitch = () => {
    setValue(!value);
  };

  return (
    <Pressable onPress={toggleSwitch}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.thumb, translateX]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 24,
    borderRadius: 16,
    justifyContent: "center",
    padding: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
});

export default Switch;
