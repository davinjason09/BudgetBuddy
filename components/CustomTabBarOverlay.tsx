import { CustomTabBarOverlayProps } from "@/constants/Types";
import { useCustomTabBar } from "@/context/CustomTabBarContext";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const COMMON_DEGREES = 180;

const CustomTabBarOverlay = () => {
  const { data, opened, overlayProps, toggleOpened } = useCustomTabBar();
  const { expandingMode, iconSize, overlayRadius } = useMemo<
    Required<CustomTabBarOverlayProps>
  >(
    () => ({
      expandingMode: "staging",
      iconSize: 30,
      overlayRadius: 80,
      ...overlayProps,
    }),
    [overlayProps],
  );

  const iconSizeHalf = iconSize / 2;
  const surfaceSize = overlayRadius * 2 + iconSize;
  const surfaceSizeHalf = surfaceSize / 2;
  const angleStep = COMMON_DEGREES / data.length;
  const overlayHeight = surfaceSizeHalf * (surfaceSizeHalf / overlayRadius / 2);

  const animations = data.map(() => useSharedValue(opened ? 1 : 0));

  useEffect(() => {
    const animate = opened ? withSpring : withTiming;

    if (expandingMode === "staging") {
      animations.forEach((anim: any, idx: number) => {
        anim.value = animate(opened ? 1 : 0, { duration: 300 + idx * 50 });
      });
    } else {
      animations.forEach((anim: any) => {
        anim.value = animate(opened ? 1 : 0, { duration: 300 });
      });
    }
  }, [opened, expandingMode]);

  const itemsList = data.map((renderExtra, idx) => {
    const angle = COMMON_DEGREES + angleStep * idx + angleStep / 2;

    const x =
      overlayRadius * Math.cos((angle * Math.PI) / COMMON_DEGREES) +
      (surfaceSizeHalf - iconSizeHalf);
    const y =
      overlayRadius * Math.sin((angle * Math.PI) / COMMON_DEGREES) +
      surfaceSizeHalf;

    const animatedStyle = useAnimatedStyle(() => ({
      left: interpolate(
        animations[idx].value,
        [0, 1],
        [surfaceSizeHalf - iconSizeHalf, x],
      ),
      top: interpolate(animations[idx].value, [0, 1], [surfaceSize, y]),
      width: iconSize,
      height: iconSize,
      opacity: interpolate(animations[idx].value, [0, 1], [0, 1]),
      transform: [
        {
          rotateZ: `${interpolate(animations[idx].value, [0, 1], [90, 0])}deg`,
        },
      ],
    }));

    const handleTouchEnd = () => {
      setTimeout(() => {
        toggleOpened();
      }, 1000);
    };

    return (
      <Animated.View
        key={`extra_item_${idx}`}
        style={[styles.itemContainer, animatedStyle]}
        onTouchEnd={handleTouchEnd}
      >
        {renderExtra()}
      </Animated.View>
    );
  });

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, { width: surfaceSize, height: overlayHeight }]}
    >
      {itemsList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    flex: 1,
    alignSelf: "center",
  },
  itemContainer: {
    position: "absolute",
  },
});

export default CustomTabBarOverlay;
