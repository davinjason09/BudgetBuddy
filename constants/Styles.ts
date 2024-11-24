import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const defaultStyles = StyleSheet.create({
  // Page Styles
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.light100,
  },

  // Back arrow
  arrowContainer: {
    width: 30,
    height: 30,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  // Button
  primaryButton: {
    width: "85%",
    backgroundColor: Colors.violet100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    borderRadius: 16,
    height: 56,
  },
  secondaryButton: {
    width: "85%",
    backgroundColor: Colors.violet20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    borderRadius: 16,
    height: 56,
  },

  // Text Styles
  textTitleX: {
    fontSize: 64,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  textTitle1: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  textTitle2: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  textTitle3: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  textRegular1: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  textRegular2: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  textRegular3: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter",
  },
  textSmall: {
    fontSize: 23,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  textTiny: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Inter",
  },
});
