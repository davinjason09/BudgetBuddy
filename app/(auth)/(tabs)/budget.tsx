import MonthYearSelector from "@/components/MonthYearSelector";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BudgetPage = () => {
  const inset = useSafeAreaInsets();

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [monthID, setMonthID] = useState<number>(new Date().getMonth());

  return (
    <TabContainer>
      <View
        style={[
          defaultStyles.pageContainer,
          styles.pageContainer,
          { paddingTop: inset.top },
        ]}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MonthYearSelector
            year={year}
            monthID={monthID}
            setYear={setYear}
            setMonthID={setMonthID}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.light100,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            flex: 4,
          }}
        ></View>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.violet100,
  },
});

export default BudgetPage;
