import BudgetInfo from "@/components/BudgetInfo";
import Button from "@/components/Button";
import MonthYearSelector from "@/components/MonthYearSelector";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { getBudgets } from "@/utils/Database";
import { useIsFocused } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BudgetPage = () => {
  const db = useSQLiteContext();
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const isFocused = useIsFocused();

  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [monthID, setMonthID] = useState<number>(new Date().getMonth());
  const [budgets, setBudgets] = useState<any[]>([]);

  console.log("budgets", budgets);
  console.log("monthID", monthID);

  useEffect(() => {
    if (isFocused) {
      const budgets = getBudgets(db, userID, monthID + 1, year);
      setBudgets(budgets);
    }
  }, [monthID, year, isFocused]);

  const handlePress = () => {
    router.push({
      pathname: "/(auth)/(actions)/budget",
      params: { type: "add", month: monthID.toString(), year: year.toString() },
    });
  };

  return (
    <TabContainer>
      <View
        style={[
          defaultStyles.pageContainer,
          { paddingTop: inset.top, backgroundColor: Colors.violet100 },
        ]}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MonthYearSelector
            type="monthYear"
            arrowType="chevron"
            year={year}
            monthID={monthID}
            setYear={setYear}
            setMonthID={setMonthID}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.light60,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingTop: 2,
            flex: 4.5,
          }}
        >
          <LinearGradient
            style={{
              position: "absolute",
              height: 32,
              top: 0,
              width: "100%",
              zIndex: 1,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            }}
            colors={[
              Colors.light80,
              Colors.light80,
              Colors.light60,
              "transparent",
              "transparent",
            ]}
          />
          <FlashList
            data={budgets}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 30 }}
            bounces={false}
            bouncesZoom={false}
            overScrollMode="never"
            estimatedItemSize={100}
            keyExtractor={(item: any) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponentStyle={{ height: 165 }}
            renderItem={({ item }) => <BudgetInfo data={item} />}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Create a Budget"
            onPress={handlePress}
            disabled={false}
            loading={false}
          />
        </View>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 95,
    alignSelf: "center",
    width: "100%",
  },
});

export default BudgetPage;
