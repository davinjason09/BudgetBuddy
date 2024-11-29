import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MonthYearSelector from "./MonthYearSelector";
import { Colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import { months } from "@/constants/Options";
import Chip from "./Chip";
import { StyleProp } from "react-native";

type DropDownProps = {
  opened: boolean;
  year: number;
  monthID: number;
  setYear: (year: number) => void;
  setMonthID: (monthID: number) => void;
  backdropPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const DropDown = (props: DropDownProps) => {
  const animation = useSharedValue<number>(0);
  const [renderFlashList, setRenderFlashList] = useState(false);

  useEffect(() => {
    animation.value = withTiming(props.opened ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    if (props.opened) {
      const timer = setTimeout(() => {
        setRenderFlashList(true);
      }, 90);
      return () => clearTimeout(timer);
    } else {
      setRenderFlashList(false);
    }
  }, [props.opened]);

  const containerHeight = useAnimatedStyle(() => ({
    height: interpolate(animation.value, [0, 1], [0, 225]),
  }));

  const monthListHeight = useAnimatedStyle(() => ({
    height: interpolate(animation.value, [0, 1], [0, 40]),
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(animation.value, [0, 1], [0, 1]),
  }));

  return (
    <TouchableOpacity
      style={styles.backdrop}
      activeOpacity={1}
      onPress={props.backdropPress}
    >
      <TouchableWithoutFeedback>
        <Animated.View
          pointerEvents="box-none"
          style={[styles.dropdown, containerHeight, props.style]}
        >
          <Animated.View style={[opacity, monthListHeight]}>
            <MonthYearSelector
              type="year"
              arrowType="arrow"
              year={props.year}
              setYear={props.setYear}
              textStyle={{ color: Colors.dark100, fontSize: 16 }}
              arrowColor={Colors.dark100}
            />
          </Animated.View>
          {renderFlashList && (
            <FlashList
              data={months}
              extraData={props.monthID!}
              keyExtractor={(item) => item.full}
              estimatedItemSize={12}
              numColumns={3}
              renderItem={({ item }) => (
                <Chip
                  variant="default"
                  editable={true}
                  query={props.monthID!}
                  style={styles.chip}
                  text={item.full}
                  value={item.value}
                  onPress={(value) => props.setMonthID!(value)}
                />
              )}
            />
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dropdown: {
    position: "absolute",
    top: 90,
    left: 16,
    right: 0,
    backgroundColor: Colors.light100,
    borderRadius: 16,
    borderColor: Colors.light20,
    borderWidth: 1,
    width: "80%",
    paddingVertical: 8,
  },
  chip: {
    width: 83,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 6,
  },
});

export default DropDown;
