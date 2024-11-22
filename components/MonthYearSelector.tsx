import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { months } from "@/constants/Options";
import { useState } from "react";
import { LeftChevron, RightChevron } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const MonthYearSelector = () => {
  const monthArray = months.map((month) => month.full);
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(monthArray[new Date().getMonth()]);
  const [year, setYear] = useState(currentYear);

  const handlePrev = () => {
    const index = monthArray.indexOf(month);
    if (index === 0) {
      setMonth(monthArray[11]);
      setYear(year - 1);
    } else {
      setMonth(monthArray[index - 1]);
    }
  };

  const handleNext = () => {
    const index = monthArray.indexOf(month);
    if (index === 11) {
      setMonth(monthArray[0]);
      setYear(year + 1);
    } else {
      setMonth(monthArray[index + 1]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={handlePrev}
        activeOpacity={0.8}
      >
        <LeftChevron size={24} colors={Colors.light100} />
      </TouchableOpacity>
      <View style={styles.month}>
        <Text
          style={styles.text}
        >{`${month + (year !== currentYear ? ` ${year}` : "")}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.arrow}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <RightChevron size={24} colors={Colors.light100} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  month: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...defaultStyles.textTitle2,
    color: Colors.light100,
  },
});

export default MonthYearSelector;
