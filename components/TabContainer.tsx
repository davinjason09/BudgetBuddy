import { Colors } from "@/constants/Colors";
import { useCustomTabBar } from "@/context/CustomTabBarContext";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

const TabContainer = ({ children }: { children: ReactNode }) => {
  const { opened, toggleOpened } = useCustomTabBar();
  const animation = useSharedValue<number>(0);

  useEffect(() => {
    animation.value = withTiming(opened ? 1 : 0, { duration: 250 });
  }, [opened]);

  const handlePress = () => {
    toggleOpened();
  };

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 0.5, 1], [0, 0.2, 0.4]),
    };
  });

  return (
    <View style={styles.container}>
      {children}
      {opened && (
        <Animated.View
          style={styles.overlayWrapper}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Animated.View style={[styles.overlay, overlayStyle]}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => handlePress()}
            >
              <LinearGradient
                style={{ flex: 1 }}
                colors={["transparent", Colors.violet40, Colors.violet80]}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
  overlayWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlay: {
    flex: 1,
  },
});

export default TabContainer;
