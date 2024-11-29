import { LinearGradient } from "expo-linear-gradient";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Overview from "@/components/Overview";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { Bell } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import {
  getCurrentBalance,
  getMonthlyTransactionSumByType,
  getRecentTransactions,
  getUserAvatar,
} from "@/utils/Database";
import { months } from "@/constants/Options";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LineGraph from "@/components/LineGraph";
import { getGraphData } from "@/utils/GraphData";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import TransactionInfo from "@/components/TransactionInfo";

const HomePage = () => {
  const { width } = useWindowDimensions();

  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;
  const db = useSQLiteContext();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const monthID = new Date().getMonth();
  const month = months[monthID].full;
  const year = new Date().getFullYear();

  const [avatar, setAvatar] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const monthlyTransactions = getGraphData({
    monthID,
    year,
    type: "expense",
    id: 0,
  });

  useEffect(() => {
    if (isFocused) {
      const image = getUserAvatar(db, userID);
      const balance = getCurrentBalance(db, userID);
      const monthlyExpenses = getMonthlyTransactionSumByType(
        db,
        userID,
        monthID + 1,
        year,
        "expense",
      );
      const monthlyIncome = getMonthlyTransactionSumByType(
        db,
        userID,
        monthID + 1,
        year,
        "income",
      );
      const recent = getRecentTransactions(db, userID, monthID + 1, year, 3);

      setAvatar(image!.avatar);
      setBalance(balance!.balance);
      setMonthlyExpenses(monthlyExpenses!.amount);
      setMonthlyIncome(monthlyIncome!.amount);
      setRecentTransactions(recent);
    }
  }, [isFocused]);

  return (
    <TabContainer>
      <StatusBar style="dark" />
      <View style={[defaultStyles.pageContainer]}>
        <LinearGradient
          style={styles.info}
          colors={["#FFF6E5", "#FFF6E5", "#FFF6E5", Colors.light100]}
        >
          <View
            style={[styles.titleRow, styles.row, { paddingTop: inset.top }]}
          >
            <View style={styles.avatarOverlay}>
              <Image
                source={{ uri: `data:image/png;base64,${avatar}` }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.month}>
              <Text
                style={[defaultStyles.textRegular2, { fontWeight: "bold" }]}
              >
                {month}
              </Text>
            </View>
            <Bell colors={Colors.violet100} size={24} />
          </View>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <Text style={styles.balanceTitle}>Account Balance</Text>
            <Text style={styles.balance}>${balance}</Text>
          </View>
          <View style={[styles.row, { paddingTop: 27, gap: 16 }]}>
            <Overview type="income" amount={Math.abs(monthlyIncome || 0)} />
            <Overview
              type="expense"
              amount={Math.round(Math.abs(monthlyExpenses || 0))}
            />
          </View>
        </LinearGradient>
        <ScrollView
          bounces={false}
          bouncesZoom={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          <Text
            style={[
              defaultStyles.textTitle3,
              { paddingHorizontal: 16, paddingBottom: 8 },
            ]}
          >
            Spend frequency
          </Text>
          <LineGraph data={monthlyTransactions} width={width} />
          <View style={[styles.row, { width: "90%", paddingBottom: 8 }]}>
            <Text style={[defaultStyles.textTitle3]}>Recent Transaction</Text>
            <Button
              title="See all"
              onPress={() => router.navigate("/(auth)/(tabs)/transaction")}
              style={styles.button}
              textStyle={{ color: Colors.violet100, fontSize: 13 }}
              loading={false}
              disabled={false}
            />
          </View>

          {recentTransactions.map((transaction) => (
            <>
              <TransactionInfo
                key={transaction.id.toString()}
                data={transaction}
              />
              <View style={{ height: 8 }} />
            </>
          ))}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  titleRow: {
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  month: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "#E4E4ED",
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
  },
  info: {
    height: "42.5%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarOverlay: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.violet80,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  balanceTitle: {
    ...defaultStyles.textRegular1,
    fontWeight: "bold",
    color: "#91919F",
    alignSelf: "center",
    marginBottom: 9,
  },
  balance: {
    ...defaultStyles.textTitle1,
    color: Colors.dark75,
    alignSelf: "center",
    fontSize: 48,
  },
  button: {
    ...defaultStyles.secondaryButton,
    width: 75,
    height: 32,
  },
});

export default HomePage;
