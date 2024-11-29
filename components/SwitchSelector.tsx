import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import {
  TextStyle,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { StyleProp } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type SwitchItem = {
  name?: string;
  icon?: (selected: boolean) => React.ReactNode;
  id: number;
  value: any;
};

export type SwitchSelectorProps = {
  items: SwitchItem[];
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  sliderStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
};

const SwitchSelector = (props: SwitchSelectorProps) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const sharedTranslateX = useSharedValue<number>(0);
  const selectedIndex = useMemo(
    () => props.items.findIndex((item) => item.id === props.value),
    [props.items, props.value],
  );

  useEffect(() => {
    if (selectedIndex >= 0 && containerWidth > 0) {
      sharedTranslateX.value = withTiming(
        (containerWidth / props.items.length) * selectedIndex,
      );
    }
  });

  const handleItemPress = useCallback(
    (item: SwitchItem, index: number) => {
      if (!props.disabled) {
        props.onChange(item.value);
        sharedTranslateX.value = withTiming(
          (index * containerWidth) / props.items.length,
          { duration: 150 },
        );
      }
    },
    [containerWidth, props.disabled, props.onChange, sharedTranslateX],
  );

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sharedTranslateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        props.containerStyle,
        { opacity: props.disabled ? 0.5 : 1 },
      ]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          styles.slider,
          props.sliderStyle,
          animatedSliderStyle,
          { width: `${100 / props.items.length}%` },
        ]}
      />
      {props.items.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={item.id}
          style={[styles.item, { width: `${100 / props.items.length}%` }]}
          onPress={() => handleItemPress(item, index)}
          disabled={props.disabled}
        >
          {item.icon && item.icon!(props.value === item.value)}
          {item.name && (
            <Text
              style={[
                props.textStyle,
                props.value === item.value && [props.activeTextStyle],
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BBBBBB",
    borderRadius: 10,
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  itemText: {
    textAlign: "center",
    color: "#333333",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default SwitchSelector;
