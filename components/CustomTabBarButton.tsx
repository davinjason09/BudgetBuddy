import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  rotationDegree?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  opened: boolean;
  toggleOpened: () => void;
};

const CustomTabBarButton = ({
  children,
  rotationDegree = 180,
  style,
  opened,
  toggleOpened,
}: Props) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(opened ? 1 : 0, { duration: 300 });
  }, [opened]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(rotation.value, [0, 1], [0, rotationDegree])}deg`,
      },
    ],
  }));

  return (
    <TouchableOpacity onPress={toggleOpened}>
      <Animated.View style={[styles.container, animatedStyle, style]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -10,
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
  },
});

export default CustomTabBarButton;
