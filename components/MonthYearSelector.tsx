import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { months } from "@/constants/Options";
import {
  LeftArrow,
  LeftChevron,
  RightArrow,
  RightChevron,
} from "@/constants/Icons";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { MonthYearSelectorProps } from "@/constants/Types";

const MonthYearSelector = (props: MonthYearSelectorProps) => {
  const {
    type,
    maximum,
    minimum,
    monthID,
    year,
    setMonthID,
    setYear,
    arrowType,
  } = props;

  const monthArray = months.map((month) => month.full);
  const currentYear = new Date().getFullYear();
  const monthName = monthArray[monthID!];
  const yearLabel = year === currentYear ? "" : ` ${year}`;
  const label = type === "monthYear" ? `${monthName}${yearLabel}` : `${year}`;

  const handlePrev = () => {
    if (type === "year") {
      setYear(year - 1);
    } else if (monthID === 0) {
      setMonthID!(11);
      setYear(year - 1);
    } else {
      setMonthID!(monthID! - 1);
    }
  };

  const handleNext = () => {
    if (type === "year") {
      setYear(year + 1);
    } else if (monthID === 11) {
      setMonthID!(0);
      setYear(year + 1);
    } else {
      setMonthID!(monthID! + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={handlePrev}
        activeOpacity={0.8}
      >
        {arrowType === "arrow" ? (
          <LeftArrow size={24} colors={props.arrowColor || Colors.light100} />
        ) : (
          <LeftChevron size={24} colors={props.arrowColor || Colors.light100} />
        )}
      </TouchableOpacity>
      <View style={styles.month}>
        <Text style={[styles.text, props.textStyle]}>{`${label}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.arrow}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        {arrowType === "arrow" ? (
          <RightArrow size={24} colors={props.arrowColor || Colors.light100} />
        ) : (
          <RightChevron
            size={24}
            colors={props.arrowColor || Colors.light100}
          />
        )}
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
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...defaultStyles.textTitle2,
    color: Colors.light100,
  },
});

export default MonthYearSelector;
