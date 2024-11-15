import { CustomTabBarPassThroughParams } from "@/constants/Types";
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import CustomTabBarOverlay from "./CustomTabBarOverlay";

type Props = Pick<CustomTabBarPassThroughParams, "params"> & {
  children: React.ReactNode;
};

const { width: screenWidth } = Dimensions.get("screen");

const CustomBottomTabWrapper = ({ children, params }: Props) => (
  <View pointerEvents="box-none" style={styles.container}>
    <CustomTabBarOverlay params={params} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: screenWidth,
    justifyContent: "flex-end",
    // backgroundColor: "green",
    flex: 1,
    height: 200,
  },
});

export default CustomBottomTabWrapper;
